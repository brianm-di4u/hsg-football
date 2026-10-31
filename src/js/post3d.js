// High-tier post-processing (three.js addons from the three-hi asset pack): an HDR (half-float, 4x MSAA) scene render,
// ground-contact ambient occlusion (GTAO), bloom on the lamps and highlights, depth of field during replays, then
// tone mapping and sRGB output, a broadcast color grade (3D LUT) and fine film grain.
// Only stateless effects: no temporal accumulation, so a still scene renders the same frame twice and the
// render-on-demand loop can stop (grain moves only while something animates).
import { THREE } from './three-lib.js';
import { packData } from './packs.js';

export const POST = { composer: null, on: false, passes: {}, w: 0, h: 0, dpr: 0 };

// A 32^3 grade: slightly cooler shadows, warmer highlights, a gentle S-curve and a touch more saturation, with
// team primaries kept close to their hue.
function gradeLUT() {
  const N = 32, data = new Uint8Array(N * N * N * 4);
  const s = (x) => x * x * (3 - 2 * x);
  for (let b = 0; b < N; b++) for (let g = 0; g < N; g++) for (let r = 0; r < N; r++) {
    let c = [r / (N - 1), g / (N - 1), b / (N - 1)];
    const l = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    c = c.map((v) => v * 0.8 + s(v) * 0.2);                              // contrast
    c = c.map((v, i) => v + (v - l) * 0.12);                             // saturation
    const sh = Math.max(0, 1 - l * 2.2), hi = Math.max(0, l * 1.6 - 0.6);  // split tone
    c[0] += hi * 0.025 - sh * 0.012; c[1] += hi * 0.012; c[2] += sh * 0.03 - hi * 0.02;
    const i = (r + g * N + b * N * N) * 4;
    for (let k = 0; k < 3; k++) data[i + k] = Math.round(Math.min(1, Math.max(0, c[k])) * 255);
    data[i + 3] = 255;
  }
  const t = new THREE.Data3DTexture(data, N, N, N);
  t.format = THREE.RGBAFormat; t.type = THREE.UnsignedByteType; t.minFilter = t.magFilter = THREE.LinearFilter;
  t.unpackAlignment = 1; t.needsUpdate = true;
  return t;
}

const grainShader = {
  uniforms: { tDiffuse: { value: null }, seed: { value: 0 }, amount: { value: 0.028 } },
  vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
  fragmentShader: `uniform sampler2D tDiffuse; uniform float seed; uniform float amount; varying vec2 vUv;
    float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233)) + seed) * 43758.5453); }
    void main(){ vec4 c = texture2D(tDiffuse, vUv); float n = h(gl_FragCoord.xy) - 0.5; float l = dot(c.rgb, vec3(0.299, 0.587, 0.114));
      c.rgb += n * amount * (1.0 - l * 0.7); gl_FragColor = c; }`,
};

export function postAvailable() { return !!packData('three-hi'); }

export function initPost(F3) {
  const A = packData('three-hi');
  if (!A) return false;
  const r = F3.renderer, w = Math.max(1, Math.round(F3.w * F3.dpr)), h = Math.max(1, Math.round(F3.h * F3.dpr));
  const rt = new THREE.WebGLRenderTarget(w, h, { type: THREE.HalfFloatType, samples: 4 });
  const composer = new A.EffectComposer(r, rt);
  const render = new A.RenderPass(F3.scene, F3.camera);
  // count the scene's own draw calls (shadow maps included) before the post passes add theirs
  const baseRender = render.render.bind(render);
  render.render = (...a) => { baseRender(...a); F3.sceneCalls = r.info.render.calls; F3.sceneTris = r.info.render.triangles; };
  const gtao = new A.GTAOPass(F3.scene, F3.camera, Math.round(w / 2), Math.round(h / 2));
  gtao.output = A.GTAOPass.OUTPUT.Default;
  // contact AO on the field only: tall far geometry (light poles, trees) otherwise smears dark bands across the turf
  gtao.setSceneClipBox(new THREE.Box3(new THREE.Vector3(-45, -1, -75), new THREE.Vector3(45, 5, 75)));
  gtao.blendIntensity = 0.85;
  gtao.updateGtaoMaterial({ radius: 0.9, distanceExponent: 1.4, thickness: 1.2, scale: 1.0, samples: 12 });
  gtao.updatePdMaterial({ lumaPhi: 10, depthPhi: 2, normalPhi: 3, radius: 6, rings: 2, samples: 12 });
  // threshold above lit white paint (about 1.0-1.3 in linear HDR) so only the lamp heads (about 5) bloom (loop 8); a
  // tight radius keeps the halo on the lamp racks instead of a veil over the frame corners (loop 9)
  const bloom = new A.UnrealBloomPass(new THREE.Vector2(w / 2, h / 2), 0.55, 0.18, 1.5);
  // replay depth of field: a broadcast-lens hint, with the play itself (about ±5 yd around the ball) kept sharp
  const bokeh = new A.BokehPass(F3.scene, F3.camera, { focus: 30, aperture: 0.00045, maxblur: 0.0045 });
  bokeh.enabled = false;
  const output = new A.OutputPass();
  const lut = new A.LUTPass({ lut: gradeLUT(), intensity: 0.85 });
  const grain = new A.ShaderPass(grainShader);
  for (const p of [render, gtao, bloom, bokeh, output, lut, grain]) composer.addPass(p);
  // dev aid: ?nopass=gtao,bloom switches passes off to isolate an artifact
  const off = (/[?&]nopass=([\w,]+)/.exec(location.search) || [])[1];
  if (off) for (const k of off.split(',')) if ({ gtao, bloom, bokeh, lut, grain }[k]) ({ gtao, bloom, bokeh, lut, grain })[k].enabled = false;
  POST.composer = composer; POST.passes = { render, gtao, bloom, bokeh, output, lut, grain };
  POST.w = w; POST.h = h; POST.dpr = F3.dpr;
  return true;
}

export function resizePost(F3) {
  if (!POST.composer) return;
  POST.composer.setPixelRatio(F3.dpr);
  POST.composer.setSize(F3.w, F3.h);
  POST.passes.gtao.setSize(Math.round(F3.w * F3.dpr / 2), Math.round(F3.h * F3.dpr / 2));
}

// One High frame. focusDist: camera-to-subject distance for replay depth of field (null = off).
export function renderPost(F3, { focusDist = null, grainSeed = 0, animating = false } = {}) {
  const P = POST.passes;
  P.bokeh.enabled = focusDist !== null;
  if (focusDist !== null) P.bokeh.uniforms.focus.value = focusDist;
  P.grain.enabled = true;
  P.grain.uniforms.seed.value = animating ? grainSeed % 1000 : 0;
  POST.composer.render();
}
