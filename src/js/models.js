// Turns the Blender-built meshes (models-data.js) into three.js geometry, and makes the materials that paint
// them in team colors. Players and officials are rigidly skinned: every vertex follows one bone, and
// players3d.js poses the bones each frame.
import { THREE } from './three-lib.js';
import { MODEL_DATA } from './models-data.js';

const b64 = (s) => { const bin = atob(s); const u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return u; };
const YD = 1.0936; // metres to yards

export const SLOTS = MODEL_DATA.slots;
export const BONE_LIST = MODEL_DATA.boneList;

const geoCache = {};
// scale: model units (metres) to world units (yards), times an exaggeration for readability.
export function modelGeometry(name, scale = YD) {
  const key = `${name}:${scale}`;
  if (geoCache[key]) return geoCache[key];
  const m = MODEL_DATA.models[name];
  const n = m.count;
  const P = new Int16Array(b64(m.pos).buffer), N = new Int8Array(b64(m.nrm).buffer), U = new Int16Array(b64(m.uv).buffer);
  const S = b64(m.slot), B = b64(m.bone);
  const pos = new Float32Array(n * 3), nrm = new Float32Array(n * 3), uv = new Float32Array(n * 2), slot = new Float32Array(n);
  const si = new Uint16Array(n * 4), sw = new Float32Array(n * 4);
  for (let i = 0; i < n * 3; i++) { pos[i] = P[i] * m.qs * scale; nrm[i] = N[i] / 127; }
  for (let i = 0; i < n * 2; i++) uv[i] = U[i] / 1000;
  for (let i = 0; i < n; i++) { slot[i] = S[i]; si[i * 4] = B[i]; sw[i * 4] = 1; }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.BufferAttribute(nrm, 3));
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  g.setAttribute('slot', new THREE.BufferAttribute(slot, 1));
  if (name !== 'tower') { g.setAttribute('skinIndex', new THREE.BufferAttribute(si, 4)); g.setAttribute('skinWeight', new THREE.BufferAttribute(sw, 4)); }
  g.computeBoundingSphere();
  g.boundingSphere.radius += 2 * scale; // bones move limbs outside the rest pose
  geoCache[key] = g;
  return g;
}

// A skeleton matching the Blender rest pose. Returns { root, bones: {name: Bone}, skeleton }.
export function makeSkeleton(scale = YD) {
  const bones = {};
  for (const name of BONE_LIST) {
    const b = new THREE.Bone(); b.name = name;
    const p = MODEL_DATA.bones[name], par = MODEL_DATA.parent[name];
    const pp = par ? MODEL_DATA.bones[par] : [0, 0, 0];
    b.position.set((p[0] - pp[0]) * scale, (p[1] - pp[1]) * scale, (p[2] - pp[2]) * scale);
    b.userData.rest = b.position.clone();
    bones[name] = b;
    if (par) bones[par].add(b);
  }
  const list = BONE_LIST.map((n) => bones[n]);
  return { root: bones.pelvis, bones, skeleton: new THREE.Skeleton(list) };
}

// Palette shader: each vertex picks its color by slot. Number panels sample a per-player number texture.
// Slots: 0 jersey, 1 trim, 2 pants, 3 helmet, 4 mask, 5 skin, 6 shoes, 7 socks, 8 glove, 9 number,
//        10 steel, 11 housing, 12 lamp, 13 stripe shirt, 14 cap.
const PAL_N = 15;
export function paletteMaterial(opts = {}) {
  const mat = new THREE.MeshLambertMaterial({ color: 0xffffff });
  mat.toneMapped = opts.toneMapped ?? false; // team colors read as the school's colors, not filmic-shifted
  const pal = [];
  for (let i = 0; i < PAL_N; i++) pal.push(new THREE.Color(0.5, 0.5, 0.5));
  const u = { pal: { value: pal }, numTex: { value: opts.numTex || null }, numOn: { value: opts.numTex ? 1 : 0 }, rim: { value: opts.rim ?? 0.35 },
    rimColor: { value: new THREE.Color(opts.rimColor || 0xffe9c8) }, glow: { value: 0 } };
  mat.userData.u = u;
  mat.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, u);
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nattribute float slot;\nvarying float vSlot;\nvarying vec2 vUv2;\nvarying vec3 vObj;\nvarying vec3 vViewN;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvSlot = slot; vUv2 = uv; vObj = position;')
      .replace('#include <defaultnormal_vertex>', '#include <defaultnormal_vertex>\nvViewN = normalize(transformedNormal);');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', `#include <common>\nuniform vec3 pal[${PAL_N}];\nuniform sampler2D numTex;\nuniform float numOn;\nuniform float rim;\nuniform vec3 rimColor;\nuniform float glow;\nvarying float vSlot;\nvarying vec2 vUv2;\nvarying vec3 vObj;\nvarying vec3 vViewN;`)
      .replace('vec4 diffuseColor = vec4( diffuse, opacity );', `
        int si = int(vSlot + 0.5);
        vec3 base = pal[0];
        for (int k = 0; k < ${PAL_N}; k++) { if (k == si) base = pal[k]; }
        if (si == 9) {
          base = pal[0];
          if (numOn > 0.5 && vUv2.x >= 0.0) { vec4 nt = texture2D(numTex, vUv2); base = mix(base, nt.rgb, nt.a); }
        }
        if (si == 13) { float st = step(0.5, fract(vObj.x * 9.0 + 0.25)); base = mix(vec3(0.03), vec3(0.95), st); }
        vec4 diffuseColor = vec4( base, opacity );`)
      .replace('#include <opaque_fragment>', `
        float rf = pow(1.0 - clamp(abs(vViewN.z), 0.0, 1.0), 2.5);
        outgoingLight += rimColor * rf * rim;
        if (int(vSlot + 0.5) == 12) outgoingLight = pal[12] * (1.6 + glow);
        #include <opaque_fragment>`);
  };
  mat.customProgramCacheKey = () => 'palette1';
  return mat;
}

export function setPalette(mat, colors) {
  const pal = mat.userData.u.pal.value;
  for (const k in colors) {
    const i = SLOTS[k];
    if (i !== undefined) pal[i].set(colors[k]).convertSRGBToLinear();
  }
}

// A jersey number texture (white/colored digits with an outline) for the number panels.
const numCache = new Map();
export function numberTexture(num, fill, outline) {
  const key = `${num}:${fill}:${outline}`;
  if (numCache.has(key)) return numCache.get(key);
  const c = document.createElement('canvas'); c.width = 128; c.height = 112;
  const x = c.getContext('2d');
  x.font = '900 92px "Arial Black", Impact, "Helvetica Neue", sans-serif';
  x.textAlign = 'center'; x.textBaseline = 'middle';
  const s = String(num);
  const w = x.measureText(s).width;
  x.save(); x.translate(64, 60); if (w > 116) x.scale(116 / w, 1);
  x.lineJoin = 'round'; x.lineWidth = 12; x.strokeStyle = outline; x.strokeText(s, 0, 0);
  x.fillStyle = fill; x.fillText(s, 0, 0);
  x.restore();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
  numCache.set(key, t);
  return t;
}

export function disposeCaches() {
  for (const t of numCache.values()) t.dispose();
  numCache.clear();
}
