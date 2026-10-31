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
// hd: the Medium/High meshes from the players asset pack (same skeleton, two blended bones per vertex): the baseline
// player's player_lod0..2, which also carry a kit region per vertex, and the official.
export function modelGeometry(name, scale = YD, hd = null) {
  const key = `${name}:${scale}:${hd ? 'hd' : 'lo'}`;
  if (geoCache[key]) return geoCache[key];
  const m = hd ? hd.models[name] : MODEL_DATA.models[name];
  const n = m.count;
  const P = new Int16Array(b64(m.pos).buffer), N = new Int8Array(b64(m.nrm).buffer), U = new Int16Array(b64(m.uv).buffer);
  const S = b64(m.slot), B = b64(m.bone), B2 = m.bone2 ? b64(m.bone2) : null, Wt = m.w ? b64(m.w) : null;
  const pos = new Float32Array(n * 3), nrm = new Float32Array(n * 3), uv = new Float32Array(n * 2), slot = new Float32Array(n);
  const si = new Uint16Array(n * 4), sw = new Float32Array(n * 4);
  for (let i = 0; i < n * 3; i++) { pos[i] = P[i] * m.qs * scale; nrm[i] = N[i] / 127; }
  for (let i = 0; i < n * 2; i++) uv[i] = U[i] / 1000;
  for (let i = 0; i < n; i++) {
    slot[i] = S[i]; si[i * 4] = B[i]; sw[i * 4] = 1;
    if (B2) { const w = Wt[i] / 255; si[i * 4 + 1] = B2[i]; sw[i * 4] = w; sw[i * 4 + 1] = 1 - w; }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.BufferAttribute(nrm, 3));
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  g.setAttribute('slot', new THREE.BufferAttribute(slot, 1));
  if (m.reg) g.setAttribute('reg', new THREE.BufferAttribute(Float32Array.from(b64(m.reg)), 1)); // kit region (player_lod*); uv is then the pattern uv
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
// Medium/High (physically based) surface per slot: [roughness, metalness]. Helmets are glossy shells, the facemask
// and tower steel metallic, jerseys and socks matte knit, pants a shinier stretch fabric.
const SLOT_PBR = [[0.82, 0], [0.7, 0], [0.55, 0], [0.24, 0.05], [0.32, 0.75], [0.6, 0], [0.45, 0], [0.88, 0], [0.62, 0], [0.7, 0],
  [0.45, 0.7], [0.55, 0.35], [0.4, 0], [0.82, 0], [0.8, 0]];
export function paletteMaterial(opts = {}) {
  const std = !!opts.std;
  const mat = std ? new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, metalness: 0 }) : new THREE.MeshLambertMaterial({ color: 0xffffff });
  mat.toneMapped = std ? true : opts.toneMapped ?? false; // Low: team colors read as the school's colors, not filmic-shifted
  const pal = [];
  for (let i = 0; i < PAL_N; i++) pal.push(new THREE.Color(0.5, 0.5, 0.5));
  // the physically based twin shares the Low material's uniforms, so setPalette and number textures reach both
  const u = opts.shared ? opts.shared.userData.u : { pal: { value: pal }, numTex: { value: opts.numTex || null }, numOn: { value: opts.numTex ? 1 : 0 }, rim: { value: opts.rim ?? 0.35 },
    rimColor: { value: new THREE.Color(opts.rimColor || 0xffe9c8) }, glow: { value: 0 }, lampHDR: { value: 1 } };
  mat.userData.u = u;
  mat.userData.kind = 'palette';
  const pbr = { rough: { value: SLOT_PBR.map((p) => p[0]) }, metal: { value: SLOT_PBR.map((p) => p[1]) }, rimK: { value: 0.12 } }; // real light and the environment shape the bodies at Medium/High: keep only a hint of rim
  mat.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, u);
    if (std) Object.assign(sh.uniforms, pbr);
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
          if (numOn > 0.5 && vUv2.x >= 0.0) { vec4 nt = texture2D(numTex, vUv2); if (nt.a < 0.45) discard; base = mix(base, nt.rgb, nt.a); } // digits only: no patch rectangle
        }
        if (si == 13) { float st = step(0.5, fract(vObj.x * 9.0 + 0.25)); base = mix(vec3(0.03), vec3(0.95), st); }
        vec4 diffuseColor = vec4( base, opacity );`)
      .replace('#include <opaque_fragment>', `
        float rf = pow(1.0 - clamp(abs(vViewN.z), 0.0, 1.0), 2.5);
        outgoingLight += rimColor * rf * rim${std ? ' * rimK' : ''};
        if (int(vSlot + 0.5) == 12) outgoingLight = pal[12] * (1.6 + glow) * ${std ? 'lampHDR' : '1.0'};
        #include <opaque_fragment>`);
    if (std) {
      sh.fragmentShader = sh.fragmentShader
        .replace('#include <common>', `#include <common>\nuniform float rough[${PAL_N}];\nuniform float metal[${PAL_N}];\nuniform float rimK;\nuniform float lampHDR;`)
        .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>\n{ int sj = int(vSlot + 0.5); for (int k = 0; k < ${PAL_N}; k++) { if (k == sj) { roughnessFactor = rough[k]; } } }`)
        .replace('#include <metalnessmap_fragment>', `#include <metalnessmap_fragment>\n{ int sj = int(vSlot + 0.5); for (int k = 0; k < ${PAL_N}; k++) { if (k == sj) { metalnessFactor = metal[k]; } } }`);
    }
  };
  mat.customProgramCacheKey = () => (std ? 'palette2-std' : 'palette1');
  return mat;
}

export function setPalette(mat, colors) {
  const pal = mat.userData.u.pal.value;
  for (const k in colors) {
    const i = SLOTS[k];
    if (i !== undefined) pal[i].set(colors[k]).convertSRGBToLinear();
  }
}

// A jersey number texture (white/colored digits with an outline) for the number panels. The kit material uses the
// large version, with an optional second, outer outline.
const numCache = new Map();
export function numberTexture(num, fill, outline, outline2 = null, big = false) {
  const key = `${num}:${fill}:${outline}:${outline2}:${big}`;
  if (numCache.has(key)) return numCache.get(key);
  const k = big ? 2 : 1;
  const c = document.createElement('canvas'); c.width = 128 * k; c.height = 112 * k;
  const x = c.getContext('2d');
  x.font = `900 ${big ? 178 : 92}px "Arial Black", Impact, "Helvetica Neue", sans-serif`;
  x.textAlign = 'center'; x.textBaseline = 'middle';
  const s = String(num);
  const w = x.measureText(s).width, maxW = big ? 222 : 116;
  x.save(); x.translate(64 * k, 60 * k); if (w > maxW) x.scale(maxW / w, 1);
  x.lineJoin = 'round';
  if (outline2) { x.lineWidth = 34; x.strokeStyle = outline2; x.strokeText(s, 0, 0); }
  x.lineWidth = big ? 20 : 12; x.strokeStyle = outline; x.strokeText(s, 0, 0);
  x.fillStyle = fill; x.fillText(s, 0, 0);
  x.restore();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = big ? 8 : 4;
  numCache.set(key, t);
  return t;
}

// ------------------------------------------------------------------ kits (Medium/High players)
// The baseline player's kit material: a colour, roughness and metalness per uniform region (the `reg` attribute),
// up to 16 anti-aliased stripe bands on the pattern uv, the number on the three number regions and the team's badge
// on the helmet. Looks come from kits.js designFor; applyKit paints one. Physically based only: the Low tier keeps the
// palette material, and makeStd keeps tiers.js from building a twin.
const MAX_BANDS = 16;
// per-region surface: [roughness, metalness]; the helmet entries come from the design's finish
const KIT_SURF = { skin: [0.5, 0], eyeWhite: [0.18, 0], iris: [0.2, 0], brow: [0.9, 0], jersey: [0.8, 0], sleeve: [0.8, 0], collar: [0.7, 0],
  numFront: [0.62, 0], numBack: [0.62, 0], numTV: [0.62, 0], undersleeve: [0.42, 0], hands: [0.55, 0], belt: [0.5, 0], buckle: [0.28, 0.85],
  pants: [0.66, 0], socks: [0.86, 0], cleat: [0.32, 0], sole: [0.6, 0], laces: [0.85, 0], studs: [0.5, 0.1], helmet: [0.2, 0], helmetDecal: [0.2, 0],
  rim: [0.7, 0], jawpad: [0.85, 0], mask: [0.32, 0.35], strap: [0.6, 0], chincup: [0.3, 0] };
let blankTex = null;
export function kitMaterial(regions, opts = {}) {
  const NR = regions.length, id = (n) => regions.indexOf(n);
  const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, metalness: 0 });
  if (!blankTex) { blankTex = new THREE.DataTexture(new Uint8Array(4), 1, 1); blankTex.needsUpdate = true; }
  const u = {
    regCol: { value: regions.map(() => new THREE.Color(0.5, 0.5, 0.5)) },
    regRough: { value: regions.map((r) => (KIT_SURF[r] || [0.6, 0])[0]) }, regMetal: { value: regions.map((r) => (KIT_SURF[r] || [0.6, 0])[1]) },
    bands: { value: Array.from({ length: MAX_BANDS }, () => new THREE.Vector4(-1, 0, 0, 0)) },
    bandCol: { value: Array.from({ length: MAX_BANDS }, () => new THREE.Color()) },
    numTex: { value: blankTex }, decalTex: { value: blankTex }, numOn: { value: 0 }, decalOn: { value: 0 },
    ids: { value: new THREE.Vector4(id('numFront'), id('numBack'), id('numTV'), id('helmetDecal')) },
    rim: { value: opts.rim ?? 0.45 }, rimColor: { value: new THREE.Color(opts.rimColor || 0xffe9c8) },
  };
  mat.userData.u = u; mat.userData.regions = regions; mat.userData.kind = 'kit';
  mat.userData.makeStd = () => mat;
  mat.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, u);
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nattribute float reg;\nvarying float vReg;\nvarying vec2 vPat;\nvarying vec3 vViewN;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvReg = reg; vPat = uv;')
      .replace('#include <defaultnormal_vertex>', '#include <defaultnormal_vertex>\nvViewN = normalize(transformedNormal);');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', `#include <common>
        uniform vec3 regCol[${NR}]; uniform float regRough[${NR}]; uniform float regMetal[${NR}];
        uniform vec4 bands[${MAX_BANDS}]; uniform vec3 bandCol[${MAX_BANDS}];
        uniform sampler2D numTex; uniform sampler2D decalTex; uniform float numOn; uniform float decalOn; uniform vec4 ids;
        uniform float rim; uniform vec3 rimColor;
        varying float vReg; varying vec2 vPat; varying vec3 vViewN;`)
      .replace('vec4 diffuseColor = vec4( diffuse, opacity );', `
        int ri = int(vReg + 0.5);
        vec3 base = regCol[0];
        for (int k = 0; k < ${NR}; k++) { if (k == ri) base = regCol[k]; }
        for (int b = 0; b < ${MAX_BANDS}; b++) {
          vec4 B = bands[b];
          if (B.x < -0.5 || int(B.x + 0.5) != ri) continue; // unused slots hold -1 (int() would truncate it to region 0)
          float c = B.y < 0.5 ? vPat.x : vPat.y;
          float aa = clamp(fwidth(c) * 0.75, 1e-5, max(B.w, 1e-5)); // stripes thinner than a pixel soften instead of shimmering
          base = mix(base, bandCol[b], 1.0 - smoothstep(-aa, aa, abs(c - B.z) - B.w));
        }
        float fr = float(ri);
        vec2 inBox = step(vec2(0.0), vPat) * step(vPat, vec2(1.0));
        if (numOn > 0.5 && (fr == ids.x || fr == ids.y || fr == ids.z)) { vec4 t = texture2D(numTex, vPat); base = mix(base, t.rgb, t.a * inBox.x * inBox.y); }
        if (decalOn > 0.5 && fr == ids.w) { vec4 t = texture2D(decalTex, vPat); base = mix(base, t.rgb, t.a * inBox.x * inBox.y); }
        vec4 diffuseColor = vec4( base, opacity );`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>\n{ for (int k = 0; k < ${NR}; k++) { if (k == ri) roughnessFactor = regRough[k]; } }`)
      .replace('#include <metalnessmap_fragment>', `#include <metalnessmap_fragment>\n{ for (int k = 0; k < ${NR}; k++) { if (k == ri) metalnessFactor = regMetal[k]; } }`)
      .replace('#include <opaque_fragment>', `
        outgoingLight += rimColor * pow(1.0 - clamp(abs(vViewN.z), 0.0, 1.0), 2.5) * rim * 0.12; // as the palette material: a hint of rim against the turf
        #include <opaque_fragment>`);
  };
  mat.customProgramCacheKey = () => `kit-${NR}`;
  return mat;
}

// The helmet badge for a team, drawn once from a canvas (art.js mascotSprite, passed in by the caller).
const decalCache = new Map();
export function decalTexture(teamId, canvas) {
  if (decalCache.has(teamId)) return decalCache.get(teamId);
  const t = new THREE.CanvasTexture(canvas);
  t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  decalCache.set(teamId, t);
  return t;
}

// Paint one look (kits.js designFor, plus look.decalArt: the badge canvas) with this player's number and skin.
export function applyKit(mat, look, num, skin) {
  const u = mat.userData.u, regions = mat.userData.regions;
  regions.forEach((r, i) => {
    const c = r === 'skin' || (r === 'hands' && look.handsSkin) ? skin || look.colors.skin : look.colors[r];
    u.regCol.value[i].set(c || '#808080').convertSRGBToLinear();
  });
  for (const r of ['helmet', 'helmetDecal']) { const i = regions.indexOf(r); u.regRough.value[i] = look.finish[0]; u.regMetal.value[i] = look.finish[1]; }
  u.regMetal.value[regions.indexOf('mask')] = look.maskMetal ? 0.6 : 0.15;
  u.bands.value.forEach((b, i) => {
    const B = look.bands[i];
    if (!B) { b.set(-1, 0, 0, 0); return; }
    b.set(regions.indexOf(B.reg), B.axis, B.centre, B.half);
    u.bandCol.value[i].set(B.color).convertSRGBToLinear();
  });
  if (num !== undefined && num !== null) { u.numTex.value = numberTexture(num, look.number.fill, look.number.outline, look.number.outline2, true); u.numOn.value = 1; }
  else u.numOn.value = 0;
  if (look.decal !== 'none' && look.decalArt) { u.decalTex.value = decalTexture(look.team, look.decalArt); u.decalOn.value = 1; } else u.decalOn.value = 0;
}

export function disposeCaches() {
  for (const t of numCache.values()) t.dispose();
  numCache.clear();
  for (const t of decalCache.values()) t.dispose();
  decalCache.clear();
}
