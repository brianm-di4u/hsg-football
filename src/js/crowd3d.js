// The Medium/High crowd: camera-facing cards cut from the Blender crowd atlas (assets/pack-crowd.js), one instanced
// draw for every fan in the venue. Each card is tinted from the ID mask (shirt in the section's school colors, skin,
// hair or cap) and picks its pose and clap frame in the vertex shader from the crowd's excitement: seated fans sit,
// clap and lean; on big plays a growing share stand, raise their arms, wave and jump. The band plays in uniform and
// the student section stands all game. Low keeps the box crowd (stadium.js).
import { THREE } from './three-lib.js';
import { packData } from './packs.js';
import { crowdUniforms } from './stadium.js';

const tex = { color: null, mask: null, loading: null };
export const cardsReady = () => !!(tex.color && tex.mask);

// Decode the atlases once (data URIs, so they work under file://). onReady runs when they are on hand.
export function loadCrowdAtlas(onReady) {
  if (cardsReady() || tex.loading) return;
  const d = packData('crowd');
  if (!d) return;
  const load = (url, srgb) => { const im = new Image(); im.src = url; return im.decode().then(() => {
    const t = new THREE.Texture(im); t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
    t.minFilter = THREE.LinearMipmapLinearFilter; t.anisotropy = 4; t.needsUpdate = true; return t; }); };
  tex.loading = Promise.all([load(d.color, true), load(d.mask, false)]).then(([c, m]) => { tex.color = c; tex.mask = m; tex.meta = d; if (onReady) onReady(); });
}

const hash = (n) => { const s = Math.sin(n * 127.1) * 43758.5453; return s - Math.floor(s); };
const SKINS = ['#8D5524', '#C68642', '#E0AC69', '#F1C27D', '#FFDBAC', '#5C3A21', '#A0673D'];
const HAIR = ['#1E1712', '#2E2118', '#4A3423', '#151313', '#6B4A2E', '#2A2A2E'];

// sets: [{ seats: [{x, y, z, home}], palette: [hex...], kind: 0 fans | 1 band | 2 students }]
export function crowdCards(sets) {
  const all = sets.flatMap((s) => s.seats.map((st) => ({ st, s })));
  const n = all.length;
  const geo = new THREE.PlaneGeometry(1.258, 2.515); geo.translate(0, 2.515 / 2, 0); // one atlas cell is 1.15 x 2.3 m
  const info = new Float32Array(n * 4), shirt = new Float32Array(n * 3), skin = new Float32Array(n * 3), cap = new Float32Array(n * 3);
  const mesh = new THREE.InstancedMesh(geo, null, n);
  const M = new THREE.Matrix4(), c = new THREE.Color();
  all.forEach(({ st, s }, i) => {
    const k = 0.9 + hash(i * 5.7) * 0.2;
    M.makeScale(k, k, k).setPosition(st.x, st.y, st.z); mesh.setMatrixAt(i, M);
    info.set([hash(i * 9.1), Math.floor(hash(i * 3.3) * 4), s.kind, st.home ? 1 : 0], i * 4);
    c.set(s.kind === 1 ? s.palette[0] : s.palette[Math.floor(hash(i * 1.37) * s.palette.length)]).convertSRGBToLinear(); shirt.set([c.r, c.g, c.b], i * 3);
    c.set(SKINS[Math.floor(hash(i * 2.3) * SKINS.length)]).convertSRGBToLinear(); skin.set([c.r, c.g, c.b], i * 3);
    c.set(s.kind === 1 ? s.palette[1] || '#111111' : hash(i * 6.1) < 0.35 ? s.palette[Math.floor(hash(i * 8.9) * s.palette.length)] : HAIR[Math.floor(hash(i * 4.4) * HAIR.length)]).convertSRGBToLinear();
    cap.set([c.r, c.g, c.b], i * 3);
  });
  geo.setAttribute('aInfo', new THREE.InstancedBufferAttribute(info, 4));
  geo.setAttribute('aShirt', new THREE.InstancedBufferAttribute(shirt, 3));
  geo.setAttribute('aSkin', new THREE.InstancedBufferAttribute(skin, 3));
  geo.setAttribute('aCap', new THREE.InstancedBufferAttribute(cap, 3));
  mesh.material = cardMaterial();
  mesh.frustumCulled = false;
  mesh.userData.tag = 'cards';
  mesh.userData.fullCount = n;
  return mesh;
}

export const cardUniforms = { light: { value: 1 } };

function cardMaterial() {
  const m = new THREE.MeshBasicMaterial({ map: tex.color, alphaTest: 0.5, alphaToCoverage: true });
  m.userData.kind = 'cards';
  m.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, { time: crowdUniforms.time, hype: crowdUniforms.hype, homeHype: crowdUniforms.homeHype, maskMap: { value: tex.mask }, light: cardUniforms.light });
    sh.vertexShader = sh.vertexShader.replace('#include <common>', `#include <common>
      attribute vec4 aInfo; attribute vec3 aShirt; attribute vec3 aSkin; attribute vec3 aCap;
      uniform float time; uniform float hype; uniform float homeHype;
      varying vec3 vShirt; varying vec3 vSkin; varying vec3 vCap; varying vec2 vCell; varying float vShade;
      int pick4(float r, int a, int b, int c, int d) { int k = int(r * 4.0); return k == 0 ? a : k == 1 ? b : k == 2 ? c : d; }
      int pick6(float r, int a, int b, int c, int d, int e, int f) { int k = int(r * 6.0); return k == 0 ? a : k == 1 ? b : k == 2 ? c : k == 3 ? d : k == 4 ? e : f; }`)
      .replace('#include <uv_vertex>', `#include <uv_vertex>
      float seed = aInfo.x, kind = aInfo.z;
      float h = clamp(hype + homeHype * aInfo.w, 0.0, 1.0);
      bool excited = fract(seed * 3.7) < h * 0.95;
      int pose = kind > 1.5 ? pick4(fract(seed * 11.3), 3, 4, 15, 12)                    // students stand all game
               : kind > 0.5 ? (h > 0.3 ? 11 : 10)                                         // band: hold, then play
               : pick4(fract(seed * 7.1), 0, 1, 2, 14);                                    // seated fans
      if (excited && kind < 0.5) pose = pick6(fract(seed * 5.3), 5, 4, 6, 7, 13, 8);
      if (excited && kind > 1.5) pose = pick4(fract(seed * 2.9), 5, 7, 13, 6);
      float rate = 1.1 + h * 3.0 + fract(seed * 17.0);
      float frame = floor(fract(time * rate * 0.5 + seed) * 2.0);
      float cell = aInfo.y * 32.0 + float(pose) * 2.0 + frame;
      vCell = vec2(mod(cell, 16.0), floor(cell / 16.0));
      vShirt = aShirt; vSkin = aSkin; vCap = aCap;
      bool seated = pose == 0 || pose == 1 || pose == 2 || pose == 14;
      vShade = 0.72 + 0.28 * fract(seed * 23.0);`)
      .replace('#include <project_vertex>', `
      vec3 ctr = (modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
      float sc = length(instanceMatrix[0].xyz);
      vec3 rgt = normalize(vec3(viewMatrix[0][0], 0.0, viewMatrix[2][0]));
      // the bench is at the render's knee height for seated poses; standing fans stand on the plank
      float yOff = seated ? -0.656 : -0.164;
      vec3 wp = ctr + rgt * position.x * sc + vec3(0.0, position.y * sc + yOff * sc, 0.0);
      vec4 mvPosition = viewMatrix * vec4(wp, 1.0);
      gl_Position = projectionMatrix * mvPosition;`);
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', `#include <common>
      uniform sampler2D maskMap; uniform float light;
      varying vec3 vShirt; varying vec3 vSkin; varying vec3 vCap; varying vec2 vCell; varying float vShade;`)
      .replace('#include <map_fragment>', `
      vec2 cuv = vec2((vCell.x + vMapUv.x) / 16.0, 1.0 - (vCell.y + 1.0 - vMapUv.y) / 8.0);
      vec4 col = texture2D(map, cuv);
      vec3 id = texture2D(maskMap, cuv).rgb;
      float lum = clamp(dot(col.rgb, vec3(0.333)) / 0.62, 0.0, 1.6);
      vec3 c = col.rgb;
      c = mix(c, vShirt * lum, id.r);
      c = mix(c, vSkin * lum, id.g);
      c = mix(c, vCap * lum, id.b);
      diffuseColor = vec4(c * light * vShade, col.a);`);
  };
  m.customProgramCacheKey = () => 'cards1';
  return m;
}
