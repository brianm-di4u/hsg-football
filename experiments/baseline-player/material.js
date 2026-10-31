// three.js side of the baseline player: geometry through the game's own decoder (models.js modelGeometry) plus the
// region attribute, and the uniform material: per-region colour, roughness and metalness, anti-aliased stripe bands
// on the pattern uv, number decals and the helmet's mascot badge (drawn by the game's art.js). Uses the game's three
// build so it works with the real Rig from players3d.js.
import { THREE } from '../../src/js/three-lib.js';
import { modelGeometry } from '../../src/js/models.js';
import { mascotSprite } from '../../src/js/art.js';

const MAX_BANDS = 16;
const b64 = (s) => { const bin = atob(s); const u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return u; };

export function baselineGeometry(json, scale) {
  const name = `baseline_${json.lod}`;
  const g = modelGeometry(name, scale, { models: { [name]: json.models.player } });
  if (!g.getAttribute('reg')) g.setAttribute('reg', new THREE.BufferAttribute(Float32Array.from(b64(json.models.player.reg)), 1));
  return g;
}

// per-region surface: [roughness, metalness]; the helmet entries come from the design's finish
const SURF = { skin: [0.5, 0], eyeWhite: [0.18, 0], iris: [0.2, 0], brow: [0.9, 0], jersey: [0.8, 0], sleeve: [0.8, 0], collar: [0.7, 0],
  numFront: [0.62, 0], numBack: [0.62, 0], numTV: [0.62, 0], undersleeve: [0.42, 0], hands: [0.55, 0], belt: [0.5, 0], buckle: [0.28, 0.85],
  pants: [0.48, 0], socks: [0.86, 0], cleat: [0.32, 0], sole: [0.6, 0], laces: [0.85, 0], studs: [0.5, 0.1], helmet: [0.2, 0], helmetDecal: [0.2, 0],
  rim: [0.7, 0], jawpad: [0.85, 0], mask: [0.32, 0.35], strap: [0.6, 0], chincup: [0.3, 0] };

export function uniformMaterial(regions) {
  const NR = regions.length, id = (n) => regions.indexOf(n);
  const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, metalness: 0 });
  const blank = new THREE.DataTexture(new Uint8Array(4), 1, 1); blank.needsUpdate = true;
  const u = {
    regCol: { value: regions.map(() => new THREE.Color(0.5, 0.5, 0.5)) },
    regRough: { value: regions.map((r) => (SURF[r] || [0.6, 0])[0]) }, regMetal: { value: regions.map((r) => (SURF[r] || [0.6, 0])[1]) },
    bands: { value: Array.from({ length: MAX_BANDS }, () => new THREE.Vector4(-1, 0, 0, 0)) },
    bandCol: { value: Array.from({ length: MAX_BANDS }, () => new THREE.Color()) },
    numTex: { value: blank }, decalTex: { value: blank }, numOn: { value: 0 }, decalOn: { value: 0 },
    ids: { value: new THREE.Vector4(id('numFront'), id('numBack'), id('numTV'), id('helmetDecal')) },
  };
  mat.userData.u = u; mat.userData.regions = regions;
  mat.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, u);
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nattribute float reg;\nvarying float vReg;\nvarying vec2 vPat;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvReg = reg; vPat = uv;');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', `#include <common>
        uniform vec3 regCol[${NR}]; uniform float regRough[${NR}]; uniform float regMetal[${NR}];
        uniform vec4 bands[${MAX_BANDS}]; uniform vec3 bandCol[${MAX_BANDS}];
        uniform sampler2D numTex; uniform sampler2D decalTex; uniform float numOn; uniform float decalOn; uniform vec4 ids;
        varying float vReg; varying vec2 vPat;`)
      .replace('vec4 diffuseColor = vec4( diffuse, opacity );', `
        int ri = int(vReg + 0.5);
        vec3 base = regCol[0];
        for (int k = 0; k < ${NR}; k++) { if (k == ri) base = regCol[k]; }
        for (int b = 0; b < ${MAX_BANDS}; b++) {
          vec4 B = bands[b];
          if (B.x < -0.5 || int(B.x + 0.5) != ri) continue;  // unused slots hold -1 (int() truncates it to 0, the skin)
          float c = B.y < 0.5 ? vPat.x : vPat.y;
          float aa = clamp(fwidth(c) * 0.75, 1e-5, max(B.w, 1e-5));   // soften stripes thinner than a pixel instead of shimmering
          float m = 1.0 - smoothstep(-aa, aa, abs(c - B.z) - B.w);
          base = mix(base, bandCol[b], m);
        }
        float fr = float(ri);
        vec2 inBox = step(vec2(0.0), vPat) * step(vPat, vec2(1.0));
        if (numOn > 0.5 && (fr == ids.x || fr == ids.y || fr == ids.z)) { vec4 t = texture2D(numTex, vPat); base = mix(base, t.rgb, t.a * inBox.x * inBox.y); }
        if (decalOn > 0.5 && fr == ids.w) { vec4 t = texture2D(decalTex, vPat); base = mix(base, t.rgb, t.a * inBox.x * inBox.y); }
        vec4 diffuseColor = vec4( base, opacity );`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>\n{ for (int k = 0; k < ${NR}; k++) { if (k == ri) roughnessFactor = regRough[k]; } }`)
      .replace('#include <metalnessmap_fragment>', `#include <metalnessmap_fragment>\n{ for (int k = 0; k < ${NR}; k++) { if (k == ri) metalnessFactor = regMetal[k]; } }`);
  };
  mat.customProgramCacheKey = () => `baseline-uniform-${NR}`;
  return mat;
}

// A jersey number: digits filled, outlined, optionally with a second outer outline. Transparent border so uv
// outside the decal box shows the jersey.
const numCache = new Map();
export function numberTexture(num, fill, outline, outline2 = null) {
  const key = `${num}:${fill}:${outline}:${outline2}`;
  if (numCache.has(key)) return numCache.get(key);
  const c = document.createElement('canvas'); c.width = 256; c.height = 224;
  const x = c.getContext('2d');
  x.font = '900 178px "Arial Black", Impact, "Helvetica Neue", sans-serif';
  x.textAlign = 'center'; x.textBaseline = 'middle';
  const s = String(num), w = x.measureText(s).width;
  x.save(); x.translate(128, 120); if (w > 222) x.scale(222 / w, 1);
  x.lineJoin = 'round';
  if (outline2) { x.lineWidth = 34; x.strokeStyle = outline2; x.strokeText(s, 0, 0); }
  x.lineWidth = 20; x.strokeStyle = outline; x.strokeText(s, 0, 0);
  x.fillStyle = fill; x.fillText(s, 0, 0);
  x.restore();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  numCache.set(key, t);
  return t;
}

const decalCache = new Map();
export function decalTexture(teamId) {
  if (decalCache.has(teamId)) return decalCache.get(teamId);
  const t = new THREE.CanvasTexture(mascotSprite(teamId, 256));
  t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  decalCache.set(teamId, t);
  return t;
}

// Paint one look (design.js designFor) and a jersey number onto a material from uniformMaterial().
export function applyLook(mat, look, num) {
  const u = mat.userData.u, regions = mat.userData.regions;
  regions.forEach((r, i) => { u.regCol.value[i].set(look.colors[r] || '#808080').convertSRGBToLinear(); });
  const hi = regions.indexOf('helmet'), hd = regions.indexOf('helmetDecal');
  for (const i of [hi, hd]) { u.regRough.value[i] = look.finish[0]; u.regMetal.value[i] = look.finish[1]; }
  u.regMetal.value[regions.indexOf('mask')] = look.maskMetal ? 0.6 : 0.15;
  u.bands.value.forEach((b, i) => {
    const B = look.bands[i];
    if (!B) { b.set(-1, 0, 0, 0); return; }
    b.set(regions.indexOf(B.reg), B.axis, B.centre, B.half);
    u.bandCol.value[i].set(B.color).convertSRGBToLinear();
  });
  u.numTex.value = numberTexture(num, look.number.fill, look.number.outline, look.number.outline2); u.numOn.value = 1;
  if (look.decal !== 'none') { u.decalTex.value = decalTexture(look.team); u.decalOn.value = 1; } else u.decalOn.value = 0;
}
