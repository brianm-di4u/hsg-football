// The 3D field view (three.js): builds a frame of 22 players + ball from the game state (live play, pre-snap,
// huddles, kick units), poses the animated rigs, directs a broadcast camera (pre-snap, follow, kicks, field
// goals, touchdown orbit, sideline replays), and projects field points to screen pixels for the 2D overlay
// (receiver badges, route previews, kick meter). field.js keeps the 2D renderer as the fallback.
import { THREE } from './three-lib.js';
import { W, toAbs } from './sim.js';
import { teamDef, contrast, onColor, lum } from './data.js';
import { shownClock } from './rules.js';
import { starters } from './roster.js';
import { playById } from './plays.js';
import { buildStadium, crowdUniforms, blobTexture, skyArt, wx, wz } from './stadium.js';
import { SKY_RIDGE } from './sky-data.js';
import { Rig, uniformFor, SKIN_TONES, SCALE, KNUCKLE } from './players3d.js';
import { kickBallPos, kickDur, losY } from './field.js';
import { paletteMaterial, setPalette, modelGeometry } from './models.js';
import { applyDetail } from './stadium.js';
import { tierState, chooseTier, applyMaterials, disposeStd } from './tiers.js';
import { setupShadowLights, applyShadowTier, fitShadows, buildEnvironment } from './lights3d.js';
import { POST, initPost, resizePost, renderPost } from './post3d.js';
import { packInfo, packData } from './packs.js';
import { designFor } from './kits.js';
import { mascotSprite } from './art.js';
import { loadCrowdAtlas, cardsReady, crowdCards, cardUniforms } from './crowd3d.js';

export const F3 = {
  on: false, renderer: null, scene: null, camera: null, canvas: null, stadium: null, stadiumKey: '',
  rigs: [], refs: [], ball: null, ballShadow: null, shadows: null, lines: null, fx: [], cam: null, instant: true,
  replay: null, rec: null, animating: false, w: 300, h: 300, dpr: 1, quality: 2, tier: 'low', builds: 0, frameMs: [], err: null, renderer3dInfo: '',
};

const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const OL = new Set(['LT', 'LG', 'C', 'RG', 'RT']);
const DL = new Set(['DL1', 'DL2', 'DL3', 'DL4']);
const DB = new Set(['CB1', 'CB2', 'S1', 'S2', 'LB1', 'LB2', 'LB3']);

export function webglAvailable() {
  try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2')); } catch (e) { return false; }
}

export function init3d(canvas) {
  try {
    const r = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance', alpha: false, preserveDrawingBuffer: false });
    r.outputColorSpace = THREE.SRGBColorSpace;
    r.toneMapping = THREE.ACESFilmicToneMapping;
    r.toneMappingExposure = 1.0;
    F3.renderer = r; F3.canvas = canvas;
    F3.scene = new THREE.Scene();
    F3.camera = new THREE.PerspectiveCamera(40, 1, 0.5, 2000);
    const gl = r.getContext();
    const dbg = gl.getExtension('WEBGL_debug_renderer_info');
    F3.renderer3dInfo = dbg ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)) : 'webgl2';
    F3.software = /swiftshader|llvmpipe|software/i.test(F3.renderer3dInfo);
    // lights
    F3.hemi = new THREE.HemisphereLight(0x8a9ad0, 0x22301e, 0.7);
    F3.keyL = new THREE.DirectionalLight(0xfff0d8, 2.0); F3.keyL.position.set(-60, 55, -10);
    F3.keyR = new THREE.DirectionalLight(0xfff4e2, 1.5); F3.keyR.position.set(60, 55, 25);
    F3.fill = new THREE.DirectionalLight(0xc8d4ff, 0.7); F3.fill.position.set(0, 25, 90);
    F3.scene.add(F3.hemi, F3.keyL, F3.keyR, F3.fill);
    setupShadowLights(F3);
    r.info.autoReset = false; // render3d resets it once per frame, so post passes and shadow maps are counted too
    buildDynamic();
    loadSkyArt();
    F3.on = true;
    return true;
  } catch (e) {
    F3.err = String(e && e.message || e);
    F3.on = false;
    return false;
  }
}

export function resize3d() {
  if (!F3.on) return;
  const c = F3.canvas, r = c.parentElement.getBoundingClientRect();
  const w = Math.max(200, Math.round(r.width)), h = Math.max(160, Math.round(r.height));
  const dprMax = F3.quality >= 2 ? 2 : F3.quality === 1 ? 1.5 : 1;
  const dpr = Math.min(dprMax, window.devicePixelRatio || 1);
  if (w !== F3.w || h !== F3.h || dpr !== F3.dpr) {
    F3.w = w; F3.h = h; F3.dpr = dpr;
    F3.renderer.setPixelRatio(dpr);
    F3.renderer.setSize(w, h, false);
    F3.camera.aspect = w / h;
    F3.camera.updateProjectionMatrix();
    F3.instant = true;
    resizePost(F3);
  }
}

// Painted sky: decoded after first paint; the procedural ridges show until then (and with ?art=0).
function loadSkyArt() {
  if (/[?&]art=0\b/.test(location.search)) return;
  F3.artLoading = true;
  const img = new Image();
  img.src = SKY_RIDGE;
  img.decode().then(() => {
    const t = new THREE.Texture(img);
    t.colorSpace = THREE.NoColorSpace; t.wrapS = THREE.RepeatWrapping; t.needsUpdate = true;
    skyArt.tex = t; F3.stadiumKey = ''; F3.artLoading = false;
    if (F3.onArt) F3.onArt();
  }).catch(() => { F3.artLoading = false; });
}

// ------------------------------------------------------------------ dynamic objects (players, ball, fx)
function ballGeometry() {
  const g = new THREE.SphereGeometry(1, 16, 24); // enough rings along the long axis for the tip stripes to land on vertices
  g.scale(0.15, 0.15, 0.27);
  const n = g.attributes.position.count, col = new Float32Array(n * 3);
  const brown = new THREE.Color('#6B3518').convertSRGBToLinear(), white = new THREE.Color('#F2F2EE').convertSRGBToLinear();
  for (let i = 0; i < n; i++) {
    const z = g.attributes.position.getZ(i) / 0.27, y = g.attributes.position.getY(i), x = g.attributes.position.getX(i);
    const stripe = Math.abs(Math.abs(z) - 0.62) < 0.09; // white stripes near the tips (high-school balls)
    const lace = y > 0.12 && Math.abs(x) < 0.03 && Math.abs(z) < 0.35;
    const c = stripe || lace ? white : brown;
    col.set([c.r, c.g, c.b], i * 3);
  }
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  return g;
}

function ringTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const x = c.getContext('2d');
  x.strokeStyle = '#FFFFFF'; x.lineWidth = 12; x.beginPath(); x.arc(64, 64, 50, 0, Math.PI * 2); x.stroke();
  x.globalAlpha = 0.25; x.fillStyle = '#FFFFFF'; x.beginPath(); x.arc(64, 64, 46, 0, Math.PI * 2); x.fill();
  return new THREE.CanvasTexture(c);
}

function buildDynamic() {
  const S = F3.scene;
  for (let i = 0; i < 22; i++) { const r = new Rig('player'); F3.rigs.push(r); S.add(r.group); }
  for (let i = 0; i < 5; i++) { const r = new Rig('official'); r.setLook({ pants: '#141414', skin: SKIN_TONES[(i * 3) % SKIN_TONES.length], shoes: '#111111', cap: i === 0 ? '#F4F4F4' : '#141414', glove: '#8D5524' }); F3.refs.push(r); S.add(r.group); }
  F3.ball = new THREE.Mesh(ballGeometry(), new THREE.MeshLambertMaterial({ vertexColors: true }));
  F3.ball.scale.setScalar(1.35);
  S.add(F3.ball);
  // blob shadows: two per player (left and right tower banks) + the ball
  const blob = new THREE.MeshBasicMaterial({ map: blobTexture(), transparent: true, depthWrite: false, opacity: 0.85 });
  F3.shadows = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2), blob, 64);
  F3.shadows.frustumCulled = false; F3.shadows.renderOrder = 1;
  S.add(F3.shadows);
  // scrimmage and first-down lines
  const mk = (color) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(W, 0.3).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4 })); m.position.y = 0.03; m.renderOrder = 2; S.add(m); return m; };
  F3.los = mk(0x3fb8ff); F3.fd = mk(0xffd21f);
  // chain crew gear on the visitors' sideline: rods at the line to gain and the series start, the down box at the ball
  const orange = new THREE.MeshLambertMaterial({ color: 0xff7a1a }), black = new THREE.MeshLambertMaterial({ color: 0x15161a });
  const rod = () => { const gg = new THREE.Group(); const p = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 2.6, 6), black); p.position.y = 1.3; const t = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.35, 0.12), orange); t.position.y = 2.55; gg.add(p, t); S.add(gg); return gg; };
  F3.chains = [rod(), rod()];
  F3.downBox = rod(); F3.downBox.children[1].scale.set(1.3, 1.6, 1.6);
  const chain = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1, 4), black); chain.rotation.x = Math.PI / 2; S.add(chain); F3.chain = chain;
  // down-and-distance painted on the turf just past the line of scrimmage (between plays)
  const dc = document.createElement('canvas'); dc.width = 512; dc.height = 128;
  F3.ddCanvas = dc; F3.ddTex = new THREE.CanvasTexture(dc); F3.ddTex.colorSpace = THREE.SRGBColorSpace; F3.ddTex.anisotropy = 4;
  F3.dd = new THREE.Mesh(new THREE.PlaneGeometry(12, 3).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ map: F3.ddTex, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -5 }));
  F3.dd.position.y = 0.05; F3.dd.renderOrder = 3; S.add(F3.dd);
  // ring under the user's player and the pass target
  F3.ring = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 2.4).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ map: ringTexture(), color: 0xfff6e0, transparent: true, depthWrite: false }));
  F3.ring.position.y = 0.04; F3.ring.renderOrder = 3; S.add(F3.ring);
  F3.target = F3.ring.clone(); F3.target.material = F3.ring.material.clone(); F3.target.material.color.set(0x4fc3ff); S.add(F3.target);
  // particles: turf bits on hits, confetti on touchdowns
  const N = 400;
  const pg = new THREE.BufferGeometry();
  pg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 3), 3).setUsage(THREE.DynamicDrawUsage));
  pg.setAttribute('color', new THREE.BufferAttribute(new Float32Array(N * 3), 3).setUsage(THREE.DynamicDrawUsage));
  // round, soft-edged sprites (dust, spray, confetti), not hard squares
  const dot = document.createElement('canvas'); dot.width = dot.height = 32;
  { const x = dot.getContext('2d'), gr = x.createRadialGradient(16, 16, 0, 16, 16, 16); gr.addColorStop(0, '#fff'); gr.addColorStop(0.45, 'rgba(255,255,255,0.75)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = gr; x.fillRect(0, 0, 32, 32); }
  F3.parts = new THREE.Points(pg, new THREE.PointsMaterial({ size: 0.45, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, map: new THREE.CanvasTexture(dot), alphaTest: 0.01 }));
  F3.parts.frustumCulled = false; S.add(F3.parts);
  F3.pdata = []; // {x,y,z,vx,vy,vz,life,c}
  // rain
  const RN = 900, rg = new THREE.BufferGeometry(), rp = new Float32Array(RN * 6);
  rg.setAttribute('position', new THREE.BufferAttribute(rp, 3).setUsage(THREE.DynamicDrawUsage));
  F3.rain = new THREE.LineSegments(rg, new THREE.LineBasicMaterial({ color: 0xaab8d0, transparent: true, opacity: 0.35, depthWrite: false }));
  F3.rain.frustumCulled = false; F3.rain.visible = false; S.add(F3.rain);
  const h = (n) => { const s = Math.sin(n * 12.9898) * 43758.5453; return s - Math.floor(s); }; // seeded, so rain frames repeat
  F3.rainSeed = Array.from({ length: RN }, (_, i) => [h(i * 3 + 1), h(i * 3 + 2), h(i * 3 + 3)]);
}

// Sideline teammates: the player mesh in its rest pose, painted per team and instanced along the bench area.
function sidelineMesh(team, home, side, count) {
  const u = uniformFor(team, home, contrast, onColor);
  const base = modelGeometry('player', 1.0936 * 1.12);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', base.attributes.position);
  g.setAttribute('normal', base.attributes.normal);
  g.setAttribute('uv', base.attributes.uv);
  g.setAttribute('slot', base.attributes.slot);
  const mat = paletteMaterial({ rim: 0.2 });
  setPalette(mat, u.colors);
  const m = new THREE.InstancedMesh(g, mat, count);
  const M = new THREE.Matrix4(), q = new THREE.Quaternion(), p = new THREE.Vector3(), s = new THREE.Vector3(1, 1, 1);
  for (let i = 0; i < count; i++) {
    // loose clusters of four along the team area instead of an evenly spaced row (loop 14)
    const cl = Math.floor(i / 4), z = -22 + cl * (44 / Math.ceil(count / 4)) + (i % 4) * 1.5 + Math.sin(i * 12.9) * 1.1;
    const x = side * (W / 2 + 4.2 + ((i * 7) % 4) * 0.75 + Math.sin(i * 3.1) * 0.35);
    q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), -side * Math.PI / 2 + Math.sin(i * 7.3) * 0.5);
    p.set(x, 0, z); M.compose(p, q, s); m.setMatrixAt(i, M);
  }
  m.frustumCulled = false;
  return m;
}

// ------------------------------------------------------------------ frames
// A frame is everything the renderer draws for one instant, in field coordinates (x 0..W, y 0..120):
// { ps: [{team, num, x, y, vx, vy, face, stance, eng, carry, throwing, reach, down, dive, celebrate, kick, slot}],
//   ball: {x, y, z, held: index|-1}, los, fd, user: index|-1, target: [x, y]|null }
const st = { prevPlay: null, throwT: -1, missT: {}, lastT: 0, deadAt: 0 };
// Time and chance for effects: the test clock (F3.clockMs) when one is set, so frozen review captures repeat exactly
// (punch-in, celebration and touchdown timers, dust, fireworks and camera shake).
const clockNow = (now = performance.now()) => F3.clockMs ?? now;
let rngSeed = 1;
const rand = () => { if (F3.clockMs == null) return Math.random(); rngSeed = (rngSeed * 16807) % 2147483647; return (rngSeed - 1) / 2147483646; };

function playFrame(g, S, now) {
  const P = g.play, dir = P.offTeam === 0 ? 1 : -1, los = P.offTeam === 0 ? 10 + P.ballOn : 110 - P.ballOn;
  if (st.prevPlay !== P) { st.prevPlay = P; st.throwT = -1; st.missT = {}; st.deadAt = 0; F3.rec = { P, frames: [], g }; }
  if (P.thrown && st.throwT < 0) st.throwT = P.t;
  // broadcast feel: the camera punches in for a beat on a catch (the ball goes from the air to a pair of hands)
  if (st.ballSt === 'air' && P.ball.st === 'held') st.punchAt = clockNow(now);
  st.ballSt = P.ball.st;
  for (const e of P.ev) if (e.k === 'miss') st.missT[e.i] = P.t;
  if (P.phase === 'dead' && !st.deadAt) st.deadAt = clockNow(now);
  const res = P.result;
  const falls = res && ['tackle', 'sack', 'fumble', 'fumbleLost', 'safety', 'int', 'touchback'].includes(res.kind) && !res.capped;
  const td = res && res.kind === 'td';
  const b = P.ball;
  const qb = P.A[P.idx.QB];
  const ps = [];
  let tackler = -1;
  if (falls && res.tacklerPid) tackler = P.A.findIndex((a) => a.pid === res.tacklerPid && a.side !== P.A[P.carrier].side);
  // the pile (loop 14): up to two more defenders who were on the carrier at the whistle go down with him, a beat apart
  const pile = new Map();
  if (falls) {
    const c = P.A[P.carrier];
    P.A.filter((a) => a.side !== c.side && a.i !== tackler && Math.hypot(a.x - c.x, a.y - c.y) < 2.4)
      .sort((u, v) => Math.hypot(u.x - c.x, u.y - c.y) - Math.hypot(v.x - c.x, v.y - c.y)).slice(0, 2)
      .forEach((a, k) => pile.set(a.i, 0.12 * (k + 1)));
  }
  for (const a of P.A) {
    const [x, y] = toAbs(a.x, a.y, los, dir);
    const team = a.side === 'O' ? P.offTeam : 1 - P.offTeam;
    let stance = null, face = null;
    if (P.phase === 'pre') {
      // line: three-point stances, the center over the ball, tackles inside on all fours, ends mirrored
      stance = a.slot === 'C' ? 'c' : OL.has(a.slot) ? 'ol' : a.slot === 'DL2' || a.slot === 'DL3' ? 'dl4' : DL.has(a.slot) ? 'dl' : a.slot === 'QB' ? 'qb' : DB.has(a.slot) ? 'db' : 'two';
      face = a.side === 'O' ? (dir > 0 ? Math.PI : 0) : (dir > 0 ? 0 : Math.PI);
    } else if (a.eng >= 0) {
      const o = P.A[a.eng], [ox, oy] = toAbs(o.x, o.y, los, dir);
      face = Math.atan2(ox - x, -(oy - y));
    } else if (a.side === 'D' && !P.thrown && P.phase === 'live' && ['zone', 'man', 'spy', 'fit'].includes(a.role) && P.carrier === qb.i) {
      const [qx, qy] = toAbs(qb.x, qb.y, los, dir);
      face = Math.atan2(qx - x, -(qy - y));
    } else if (P.phase === 'dead' && !(falls && a.i === P.carrier)) {
      const c = P.A[P.carrier], [cx, cy] = toAbs(c.x, c.y, los, dir);
      if (Math.hypot(a.vx, a.vy) < 1.5) face = Math.atan2(cx - x, -(cy - y));
    }
    const isCarrier = a.i === P.carrier && b.st === 'held';
    const missAge = st.missT[a.i] !== undefined ? P.t - st.missT[a.i] : 99;
    const deadAge = st.deadAt ? (clockNow(now) - st.deadAt) / 1000 : 0;
    const rest = P.phase === 'dead' && deadAge > 0.5 ? 0 : 1; // half a second after the whistle nobody runs in place (loop 11)
    ps.push({
      team, num: a.num, slot: a.slot, side: a.side, x, y, vx: a.vx * dir * rest, vy: a.vy * dir * rest, face, stance,
      eng: a.eng >= 0 && !(P.phase === 'dead' && deadAge > 0.3), carry: isCarrier && P.phase !== 'pre' && !(a.slot === 'QB' && b.h === a.i && !P.handed && !P.scramble && P.carrier === qb.i && false),
      throwing: a.slot === 'QB' && st.throwT >= 0 && P.t - st.throwT < 0.6 ? P.t - st.throwT : -1,
      // the catch: hands up from 0.6 s before the ball arrives, held for 0.3 s after it lands in them, then the tuck (loop 11)
      reach: b.st === 'air' && b.to === a.i ? clamp(1 - (b.T - b.t) / 0.6, 0, 1) : P.caught && a.i === P.carrier && P.catchT !== undefined ? clamp(1 - (P.t - P.catchT) / 0.3, 0, 1) : 0,
      down: (falls && (a.i === P.carrier || a.i === tackler || pile.has(a.i))) || missAge < 0.9, dive: a.i === tackler || pile.has(a.i) || missAge < 0.9,
      // seconds since this body started going down: the rig poses the fall from it, so the fall is the same live, in
      // paused captures and in replays (loop 11)
      fallAge: missAge < 0.9 ? missAge : falls && (a.i === P.carrier || a.i === tackler) ? deadAge : pile.has(a.i) ? Math.max(0, deadAge - pile.get(a.i)) : undefined,
      celebrate: td && a.side === P.A[P.carrier].side && (a.i === P.carrier || Math.hypot(a.x - P.A[P.carrier].x, a.y - P.A[P.carrier].y) < 9) && deadAge > 0.15,
      kick: -1,
    });
  }
  // bodies never share volume (loop 15): push overlapping players apart, standing pairs to about shoulder width (an
  // engaged block ends up face to face), downed bodies to a pile rather than one merged shape. Done on the frame data,
  // so live play, replays and captures agree.
  for (let pass = 0; pass < 3; pass++) {
    for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) {
      const u = ps[i], v = ps[j], dn = (u.down ? 1 : 0) + (v.down ? 1 : 0);
      const min = dn === 2 ? 0.55 : dn === 1 ? 0.6 : 0.68;
      let dx = v.x - u.x, dy = v.y - u.y, d = Math.hypot(dx, dy);
      if (d >= min) continue;
      if (d < 1e-4) { dx = Math.cos(i * 2.4 + j); dy = Math.sin(i * 2.4 + j); d = 1; }
      const push = (min - d) / 2 / d;
      u.x -= dx * push; u.y -= dy * push; v.x += dx * push; v.y += dy * push;
    }
  }
  let ball;
  if (b.st === 'air') { const [bx, by] = toAbs(b.x, b.y, los, dir); ball = { x: bx, y: by, z: b.z, held: -1, vx: (b.tx - b.fx) * dir, vy: (b.ty - b.fy) * dir, rel: b.T > 0 ? b.t / b.T : 1 }; }
  else if (b.st === 'held' && P.phase !== 'pre') ball = { held: b.h, x: ps[b.h].x, y: ps[b.h].y, z: 1 };
  else { const [bx, by] = toAbs(b.x, b.y, los, dir); ball = { x: bx, y: by, z: 0.15, held: -1, snap: P.phase === 'pre' }; }
  if (P.phase === 'pre') { const c = P.A[P.idx.C]; const [cx, cy] = toAbs(c.x, c.y, los, dir); ball = { x: cx, y: cy + dir * 0.55, z: 0.15, held: -1, snap: true }; }
  let user = -1;
  if (g.user !== null && P.phase !== 'pre') {
    const c = P.A[P.carrier];
    const userTeam = c.side === 'O' ? P.offTeam : 1 - P.offTeam;
    if (userTeam === g.user && b.st === 'held') user = P.carrier;
  }
  const userOff = g.user !== null && P.offTeam === g.user;
  const target = b.st === 'air' && userOff ? toAbs(b.tx, b.ty, los, dir) : null;
  const fd = g.ballOn + g.toGo < 100 && !g.twoPoint ? losY(g) + (g.poss === 0 ? 1 : -1) * g.toGo : null;
  const qbHold = P.phase === 'live' && P.carrier === qb.i && b.st === 'held' && !P.handed && !P.scramble && playById(P.offId).type === 'pass';
  const fr = { ps, ball, los: losY(g), fd, user, target, t: P.t, live: true, carrier: P.carrier, dir, qbHold };
  return fr;
}

// Replays are recorded from the simulation ticks (not from rendered frames), so every play can be replayed even
// when it ran without being drawn (quick finishes, slow devices). One frame per ~1/30 s of play time.
export function recordTick(g, S) {
  const P = g && g.play;
  if (!F3.on || !P || P.phase === 'pre') return;
  if (F3.rec && F3.rec.P === P) {
    const fs = F3.rec.frames, last = fs[fs.length - 1];
    if (last && P.t - last.t < 1 / 30 && !(P.phase === 'dead' && !last.dead)) return;
  }
  const fr = playFrame(g, S, performance.now());
  F3.rec.frames.push({ ...fr, dead: P.phase === 'dead', ps: fr.ps.map((p) => ({ ...p })), ball: { ...fr.ball } });
}

// Huddles between plays: the offense circles up behind the ball, the defense mills around past the line.
function huddleFrame(g) {
  const los = losY(g), dir = g.poss === 0 ? 1 : -1;
  const bx = g.absX ?? W / 2;
  const ps = [];
  const off = starters(g.teams[g.poss].players), def = starters(g.teams[1 - g.poss].players);
  const oSlots = ['QB', 'RB', 'X', 'Z', 'SL', 'TE', 'LT', 'LG', 'C', 'RG', 'RT'];
  const dSlots = ['DL1', 'DL2', 'DL3', 'DL4', 'LB1', 'LB2', 'LB3', 'CB1', 'CB2', 'S1', 'S2'];
  const hx = clamp(bx, 8, W - 8), hy = los - dir * 8;
  oSlots.forEach((s, i) => {
    const a = (i / 11) * Math.PI * 2;
    const x = hx + Math.cos(a) * 2.3, y = hy + Math.sin(a) * 2.3;
    ps.push({ team: g.poss, num: off[s].num, slot: s, side: 'O', x, y, vx: 0, vy: 0, face: Math.atan2(hx - x, -(hy - y)), stance: null, idle: 'hands' });
  });
  dSlots.forEach((s, i) => {
    const row = DL.has(s) ? 2.5 : s.startsWith('LB') ? 6 : 11;
    const k = DL.has(s) ? i : s.startsWith('LB') ? i - 4 : i - 7;
    const n = DL.has(s) ? 4 : s.startsWith('LB') ? 3 : 4;
    const x = clamp(hx + (k - (n - 1) / 2) * (DL.has(s) ? 2.6 : 7) + Math.sin(i * 4.1) * 0.8, 2, W - 2), y = los + dir * (row + Math.cos(i * 2.7) * 0.8);
    ps.push({ team: 1 - g.poss, num: def[s].num, slot: s, side: 'D', x, y, vx: 0, vy: 0, face: dir > 0 ? 0 : Math.PI, stance: null });
  });
  const fd = g.ballOn + g.toGo < 100 && !g.twoPoint ? los + dir * g.toGo : null;
  return { ps, ball: { x: bx, y: los, z: 0.15, held: -1, snap: true }, los, fd, user: -1, target: null, live: false, dir };
}

// Field goal / try formation (phase 'kick', and the kick itself while the ball flies).
function kickFrame(g) {
  const side = g.kick ? g.kick.side : g.kickAnim.side, dir = side === 0 ? 1 : -1;
  const ballOn = g.kick ? g.ballOn : g.kickAnim.ballOn;
  const los = side === 0 ? 10 + ballOn : 110 - ballOn;
  const off = starters(g.teams[side].players), def = starters(g.teams[1 - side].players);
  const ps = [];
  const cx = W / 2;
  const line = ['TE', 'LT', 'LG', 'C', 'RG', 'RT', 'SL'];
  const kt = g.phase === 'kickfly' && g.kickAnim ? g.kickAnim.t : -1;
  const rush = kt > 0 ? Math.min(1, kt / 0.8) : 0;
  line.forEach((s, i) => ps.push({ team: side, num: off[s].num, slot: s, side: 'O', x: cx + (i - 3) * 1.25, y: los - dir * 0.6 - dir * rush * 0.6, vx: 0, vy: 0, face: dir > 0 ? Math.PI : 0, stance: kt < 0 ? 'ol' : null, eng: kt > 0 }));
  ps.push({ team: side, num: off.X.num, slot: 'X', side: 'O', x: cx - 5.4, y: los - dir * 1.6, vx: 0, vy: 0, face: dir > 0 ? Math.PI : 0, stance: kt < 0 ? 'two' : null, eng: kt > 0 });
  ps.push({ team: side, num: off.Z.num, slot: 'Z', side: 'O', x: cx + 5.4, y: los - dir * 1.6, vx: 0, vy: 0, face: dir > 0 ? Math.PI : 0, stance: kt < 0 ? 'two' : null, eng: kt > 0 });
  ps.push({ team: side, num: off.QB.num, slot: 'QB', side: 'O', x: cx - 0.6, y: los - dir * 7, vx: 0, vy: 0, face: dir > 0 ? Math.PI * 0.85 : -Math.PI * 0.15, stance: 'ol' });
  ps.push({ team: side, num: off.K.num, slot: 'K', side: 'O', x: cx - 2.2, y: los - dir * 9.2 + dir * (kt > 0 ? Math.min(kt, 0.3) * 6 : 0), vx: 0, vy: 0, face: dir > 0 ? Math.PI * 0.92 : -Math.PI * 0.08, stance: kt < 0 ? 'k' : null, kick: kt });
  const dl = ['DL1', 'DL2', 'DL3', 'DL4', 'LB1', 'LB2', 'LB3', 'CB1'];
  dl.forEach((s, i) => ps.push({ team: 1 - side, num: def[s].num, slot: s, side: 'D', x: cx + (i - 3.5) * 1.35, y: los + dir * (1.0 - rush * 1.1), vx: 0, vy: -dir * rush * 3, face: dir > 0 ? 0 : Math.PI, stance: kt < 0 ? 'ol' : null, eng: kt > 0 && i > 0 && i < 7, dive: false }));
  ['CB2', 'S1', 'S2'].forEach((s, i) => ps.push({ team: 1 - side, num: def[s].num, slot: s, side: 'D', x: cx + (i - 1) * 9, y: los + dir * 7, vx: 0, vy: 0, face: dir > 0 ? 0 : Math.PI, stance: kt < 0 ? 'db' : null }));
  let ball;
  if (kt >= 0.12 && g.kickAnim) { const [bx, by, bz] = kickBallPos(g, g.kickAnim); ball = { x: bx, y: by, z: bz + 0.3, held: -1, spin: true, trail: kickTrail(g, g.kickAnim, 0.3) }; }
  else ball = { x: cx - 0.6, y: los - dir * 7.2, z: 0.25, held: -1 };
  return { ps, ball, los: null, fd: null, user: -1, target: null, live: false, dir, kicking: side };
}

// Kickoffs and punts: coverage and return units (the kick itself is resolved by the rules; positions are procedural).
// The kicked ball's recent path (field x, y and height), sampled back from its pure flight curve: the trail ribbon is the
// same in a paused capture as live (loop 10).
function kickTrail(g, ka, lift) {
  const pts = [];
  for (let i = 0; i < 10; i++) { const t = ka.t - i * 0.035; if (t < 0) break; const [x, y, z] = kickBallPos(g, { ...ka, t }); pts.push([x, y, z + lift]); }
  return pts;
}
function kickUnitsFrame(g) {
  const ka = g.kickAnim, dur = kickDur(ka), k = ka.kicking, dir = k === 0 ? 1 : -1;
  const from = k === 0 ? 10 + ka.from : 110 - ka.from;
  const land = k === 0 ? 10 + Math.min(ka.land, 118) : 110 - Math.min(ka.land, 118);
  const u = Math.min(1, ka.t / dur.total);
  const [bxA, byA, bz] = kickBallPos(g, ka);
  const kt = starters(g.teams[k].players), rt = starters(g.teams[1 - k].players);
  const kSlots = ['K', 'LB1', 'LB2', 'LB3', 'S1', 'S2', 'CB1', 'CB2', 'TE', 'DL1', 'SL'];
  const rSlots = ['RB', 'X', 'Z', 'LT', 'LG', 'C', 'RG', 'RT', 'TE', 'SL', 'QB'];
  const ps = [];
  const pre = ka.t <= 0;
  for (let i = 0; i < 11; i++) {
    let x, y, vy;
    if (i === 0) { x = W / 2 - 1.5; y = from - dir * (pre ? 7 : Math.max(0, 7 - ka.t * 18)) + dir * Math.max(0, ka.t - 0.35) * 6; vy = dir * (ka.t < 0.4 ? 9 : 4); }
    else {
      const j = i - 1, lane = 3 + j * (W - 6) / 9;
      const y0 = from - dir * 1, y1 = land - dir * (ka.touchback ? 12 : 5 + (j % 3) * 2);
      x = lane + (bxA - lane) * u * 0.55; y = y0 + (y1 - y0) * Math.min(1, u * 1.15); vy = pre ? 0 : dir * 8;
    }
    const s = kSlots[i];
    ps.push({ team: k, num: (kt[s] || kt.K).num, slot: s, side: 'D', x, y, vx: 0, vy, face: dir > 0 ? Math.PI : 0, stance: pre ? (i === 0 ? 'k' : 'two') : null, kick: i === 0 && ka.kind !== 'punt' ? ka.t - 0.38 : -1 });
  }
  for (let i = 0; i < 11; i++) {
    let x, y, vy = 0;
    const returner = i === 0;
    if (returner) {
      if (ka.t > dur.fly && !ka.touchback) { x = bxA; y = byA; vy = -dir * 7; }
      else { x = W / 2 + Math.sin(i) * 2; y = land + dir * 1; }
    } else {
      const j = i - 1, lane = 6 + j * (W - 12) / 9;
      const y0 = land - dir * (8 + (j % 3) * 7);
      x = lane + (bxA - lane) * u * 0.35; y = y0 + (byA - y0) * Math.max(0, u - 0.5) * 0.8; vy = u > 0.5 ? dir * 4 : 0;
    }
    const s = rSlots[i];
    ps.push({ team: 1 - k, num: rt[s].num, slot: s, side: 'O', x, y, vx: 0, vy, face: dir > 0 ? 0 : Math.PI, stance: null, carry: returner && ka.t > dur.fly && !ka.touchback, reach: returner && ka.t > dur.fly - 0.35 && ka.t <= dur.fly ? 1 : 0 });
  }
  if (ka.kind === 'punt') { ps[0].y = from - dir * 13 + (pre ? 0 : 0); ps[0].kick = ka.t > 0 ? ka.t + 0.25 : -1; ps[0].stance = null; }
  const held = ka.t > dur.fly && !ka.touchback;
  const ball = held ? { held: 11, x: bxA, y: byA, z: 1 } : { x: bxA, y: byA, z: bz + 0.2, held: -1, spin: true, trail: kickTrail(g, ka, 0.2) };
  // a landing ring under a kick in the air (loop 10)
  const flying = !pre && ka.t < dur.fly;
  return { ps, ball, los: null, fd: null, user: -1, target: flying ? kickBallPos(g, { ...ka, t: dur.fly }).slice(0, 2) : null, live: false, dir, kicking: k };
}

// Touchdown celebration when no play is on the field: the scorers mob each other in the end zone.
function tdFrame(g) {
  const f = huddleFrame(g);
  const scorer = g.tryFor ?? g.poss, endY = scorer === 0 ? 114 : 6;
  f.ps.forEach((p, i) => {
    const k = i % 11;
    if (p.team === scorer) { const a = (k / 10) * Math.PI * 2 + 0.3, r = k ? 2.4 + (k % 3) * 1.3 : 0; p.x = W / 2 + 4 + Math.cos(a) * r; p.y = endY + Math.sin(a) * r * 0.7; p.celebrate = true; p.face = Math.atan2(W / 2 + 4 - p.x, -(endY - p.y)); p.idle = null; }
    else { p.y = endY + (scorer === 0 ? -1 : 1) * (10 + (k % 4) * 4 + Math.sin(k * 3.7) * 2); p.x = 6 + k * 4.2 + Math.cos(k * 5.1) * 2; p.face = scorer === 0 ? Math.PI * 0.8 + k * 0.1 : k * 0.1; p.idle = 'hips'; }
  });
  f.ball = { held: f.ps.findIndex((p) => p.team === scorer), x: 0, y: 0, z: 1 };
  f.los = null; f.fd = null; f.td = true; f.dir = scorer === 0 ? 1 : -1;
  return f;
}

function frameFor(g, S, now) {
  if (F3.replay) return replayFrame(now);
  if (g.phase === 'result' && g.lastResult && g.lastResult.kind === 'td' && !g.play) return tdFrame(g);
  const P = g.play;
  if (P && ['pre', 'live', 'result'].includes(g.phase) && (g.phase !== 'result' || P.phase === 'dead')) return playFrame(g, S, now);
  if ((g.phase === 'kickoff' || g.phase === 'kickfly') && g.kickAnim && (g.kickAnim.kind === 'kickoff' || g.kickAnim.kind === 'free' || g.kickAnim.kind === 'punt')) return kickUnitsFrame(g);
  if ((g.phase === 'kick' && g.kick) || (g.phase === 'kickfly' && g.kickAnim)) return kickFrame(g);
  return huddleFrame(g);
}

// ------------------------------------------------------------------ replays
export function canReplay() { return !!(F3.on && F3.rec && F3.rec.frames.length > 10); }
export function startReplay(now) {
  if (!canReplay()) return false;
  F3.replay = { frames: F3.rec.frames, t0: now, speed: 0.55, dur: F3.rec.frames[F3.rec.frames.length - 1].t, frozen: null };
  F3.instant = true;
  return true;
}
export function stopReplay() { F3.replay = null; F3.instant = true; }
function replayFrame(now) {
  const R = F3.replay, fs = R.frames;
  const t = R.frozen !== null ? R.frozen : Math.min(R.dur + 0.8, ((now - R.t0) / 1000) * R.speed);
  R.t = t;
  let i = 0; while (i < fs.length - 2 && fs[i + 1].t < t) i++;
  const a = fs[i], b = fs[Math.min(i + 1, fs.length - 1)];
  const u = b.t > a.t ? clamp((t - a.t) / (b.t - a.t), 0, 1) : 0;
  const over = Math.max(0, t - fs[fs.length - 1].t); // after the whistle the replay holds the last frame: falls keep playing
  const base = u >= 1 ? b : a; // flags (down, reach...) from the nearer recorded frame, so the whistle frame's falls show
  const ps = base.ps.map((p, k) => ({ ...p, x: lerp(a.ps[k].x, b.ps[k].x, u), y: lerp(a.ps[k].y, b.ps[k].y, u), fallAge: p.fallAge === undefined ? undefined : p.fallAge + over }));
  const ball = { ...base.ball, x: lerp(a.ball.x, b.ball.x, u), y: lerp(a.ball.y, b.ball.y, u), z: lerp(a.ball.z, b.ball.z, u) };
  return { ...base, ps, ball, user: ball.held >= 0 ? ball.held : -1, target: null, replay: true }; // ring stays on the carrier
}
export function replayDone() { return !F3.replay || F3.replay.t >= F3.replay.dur + 0.8; }

// ------------------------------------------------------------------ camera director
// The camera orbits a focus point F on the field: distance comes from the width of field to show at F,
// pitch is the elevation angle, yaw 0 sits behind the user's end zone (yaw pi behind the other end),
// and `ahead` aims past F so the action sits low in the frame with room to see downfield.
// shift: lens shift as a share of the view height (the picture slides down without changing perspective or scale);
// fov: vertical field of view in degrees (a narrower one shows less depth at the same width, not bigger players)
const cam = { fx: W / 2, fy: 40, width: 50, pitch: 0.5, yaw: 0, ahead: 6, shift: 0, fov: 40 };
const want = { fx: W / 2, fy: 40, width: 50, pitch: 0.5, yaw: 0, ahead: 6, shift: 0, fov: 40 };
const baseFov = () => (portrait() ? 50 : 40);
let shake = 0;

function portrait() { return F3.h > F3.w * 1.15; }

function cameraWant(g, fr, S, now) {
  if (F3.camOverride) return F3.camOverride;
  const por = portrait();
  const lr = g.lastResult;
  const ballX = fr.ball.held >= 0 ? fr.ps[fr.ball.held].x : fr.ball.x;
  const ballY = fr.ball.held >= 0 ? fr.ps[fr.ball.held].y : fr.ball.y;
  if (fr.replay) { // sideline replay: low and close, looking across the field at the ball
    return { fx: ballX, fy: ballY, width: por ? 24 : 32, pitch: 0.28, yaw: -Math.PI / 2, ahead: 0 };
  }
  if (fr.kicking !== undefined && (g.phase === 'kick' || g.phase === 'kickfly' && g.kickAnim && (g.kickAnim.kind === 'fg' || g.kickAnim.kind === 'pat'))) {
    const d = fr.kicking === 0 ? 1 : -1;
    const spot = fr.ps.find((p) => p.slot === 'K');
    const fly = g.phase === 'kickfly';
    return { fx: W / 2, fy: fly ? lerp(spot.y + d * 6, fr.ball.y, 0.55) : spot.y + d * 4, width: por ? 22 : 30, pitch: fly ? 0.3 : 0.26, yaw: d > 0 ? 0 : Math.PI, ahead: por ? 10 : fly ? 12 : 6 }; // loop 12: before the kick the holder and line sit higher, clear of the meter
  }
  if (fr.kicking !== undefined) { // kickoff / punt: high and wide, chasing the ball
    // until the boot (about 0.4 s), a low establishing shot from behind the kicking team: the far stands, both tower
    // banks and the board fill the top third (loop 8); the director then cranes up into the chase
    if (g.kickAnim && g.kickAnim.kind !== 'punt' && g.kickAnim.t < 0.4) {
      const hs = (F3.stadium && F3.stadium.userData.homeSide) || -1; // turned a little toward the home grandstand
      return { fx: W / 2 - hs * 6, fy: ballY + (fr.dir > 0 ? 8 : -8), width: por ? 44 : 72, pitch: por ? 0.45 : 0.22, yaw: por ? 0 : -hs * 0.48, ahead: por ? 14 : 30 };
    }
    return { fx: lerp(ballX, W / 2, 0.5), fy: ballY - (fr.dir > 0 ? 6 : -6), width: por ? 40 : 60, pitch: 0.6, yaw: 0, ahead: 6 };
  }
  const dir = fr.dir || (g.poss === 0 ? 1 : -1);
  if (fr.td) {
    const c = fr.ps[fr.ball.held];
    const age = (clockNow(now) - (st.tdAt || clockNow(now))) / 1000;
    return { fx: c.x, fy: c.y, width: por ? 20 : 26, pitch: 0.28, yaw: S.reduced ? 0 : Math.min(age, 2.4) * 0.5, ahead: 0 };
  }
  if (!fr.live || g.phase === 'pre') {
    const los = fr.los ?? ballY;
    // phones: fit the formation's width (the outside receivers just inside the 390 px frame) from a lower camera, so
    // standing players are about 20 CSS px tall and little turf shows behind the offense (review loop 4); a steeper,
    // narrower view keeps the far stands to about a tenth of the frame (loop 5). After the play the ball sits mid-frame, above the result band.
    const res = g.phase === 'result';
    let pw = 44, mid = W / 2;
    // loop 7: frame the box (the tackles to the ends, ~LOS +/-12 yd) so linemen read at 22+ CSS px; wide receivers may sit at the edge, where their badges clamp
    // loop 10: every eligible receiver in frame (the offense within 3 yd of the line, plus the backfield), the formation
    // low in the view where it is nearest the camera, and less empty midfield above it
    let fw = 54, fmid = lerp(fr.ball.x, W / 2, 0.75);
    if (fr.ps.length && !res) {
      let x0 = Infinity, x1 = -Infinity; for (const p of fr.ps) if (Math.abs(p.y - los) < 9) { x0 = Math.min(x0, p.x); x1 = Math.max(x1, p.x); }
      if (por) { pw = clamp((x1 - x0) + 2, 21, 30); mid = lerp(fr.ball.x, (x0 + x1) / 2, 0.6); } // loops 13/16: up to 30 yd (38 in loop 15 made players too small); wideouts beyond keep edge badges
      else { fw = clamp((x1 - x0) + 8, 34, 54); fmid = lerp(fr.ball.x, (x0 + x1) / 2, 0.8); } // desktop (loop 15): fit the formation, so players read larger
    } // loop 13: up to 30 yd, so slot and tight receivers are in frame (linemen about 21 CSS px)
    if (por && res && fr.ps.length) { let x0 = Infinity, x1 = -Infinity; for (const p of fr.ps) if (Math.abs(p.x - fr.ball.x) < 12) { x0 = Math.min(x0, p.x); x1 = Math.max(x1, p.x); } pw = clamp((x1 - x0) + 5, 21, 25); mid = lerp(fr.ball.x, (x0 + x1) / 2, 0.5); }
    // after the play (portrait): centre between the spot and the offense's huddle behind it, so both stay in view (loop 12)
    return { fx: por ? mid : fmid, fy: los + (por && res ? -dir * 6 : dir > 0 ? 1 : -1), width: por ? pw : fw, pitch: por ? (res ? 0.8 : 0.74) : 0.33, yaw: 0, ahead: por ? (res ? 2 : 7) : 16, shift: por || res ? 0 : 0.2, fov: por && !res ? 26 : 40 }; // loop 16: steeper with less lens shift, so far less sky over the formation // desktop pre-snap: a lens shift drops the formation lower in the view, less empty turf behind it (loop 11)
  }
  // live: follow the ball with a little lead
  const c = fr.ball.held >= 0 ? fr.ps[fr.ball.held] : null;
  const vy = c ? c.vy : fr.ball.vy ? fr.ball.vy * 0.4 : 0;
  const fy = ballY + clamp(vy * 0.3, -5, 5) + (fr.ball.held < 0 && fr.target ? (fr.target[1] - ballY) * 0.35 : 0);
  // tight on the ball: players about 60 px tall on desktop and 40 CSS px on a portrait phone (review loop 0)
  // a phone held sideways: a steeper, less forward-looking chase keeps the carrier and his tag up off the bottom edge and
  // trims the sky (loop 13)
  const land = !por && F3.h < 460 && F3.w > F3.h * 1.6;
  const out = { fx: lerp(ballX, W / 2, por ? 0.2 : 0.45), fy, width: por ? 21 : 30, pitch: por ? 0.68 : land ? 0.4 : 0.3, yaw: 0, ahead: por ? 10 : land ? 0 : 1 }; // desktop (loop 16): aim just past the carrier (with the velocity lead) so he sits about 60–65% down the frame, not on the bottom edge
  // the quarterback's view: wide enough to see every receiver; tighten on the ball once it's out
  if (fr.qbHold) Object.assign(out, { fx: lerp(ballX, W / 2, 0.75), fy: ballY + (dir > 0 ? 7 : -7), width: por ? 46 : 54, ahead: por ? 16 : 15, shift: por ? 0.1 : 0, pitch: por ? 0.8 : out.pitch, fov: 40 });
  else if (fr.ball.held < 0 && fr.target) {
    // ball in the air: on a portrait phone, frame the ball-to-target corridor tightly (loop 10)
    if (por) Object.assign(out, { fx: lerp(ballX, fr.target[0], 0.5), fy: lerp(ballY, fr.target[1], 0.55), width: clamp(Math.abs(ballX - fr.target[0]) + 10, 22, 32), ahead: 3 });
    else Object.assign(out, { width: 48 });
  }
  // punch-in: about 25% tighter for 0.9 s after a catch or a hit, easing back out
  const pa = st.punchAt ? (clockNow(now) - st.punchAt) / 900 : 9;
  if (pa >= 0 && pa < 1 && !S.reduced && g.phase !== 'result') out.width *= 1 - 0.25 * Math.sin(Math.PI * Math.min(1, pa * 1.6)) * (1 - pa * 0.4); // live beats only: the result framing takes over at the whistle
  if (g.phase === 'result' && lr) {
    out.width *= 0.85;
    out.ahead = por ? 2 : land ? -2 : 0; // the pile mid-frame, clear of the result band docked at the bottom (desktop: loop 12; phone held sideways: loop 13)
    if (lr.kind === 'td' && !S.reduced) { // touchdown: swing low around the scorer
      const age = (clockNow(now) - (st.deadAt || clockNow(now))) / 1000;
      Object.assign(out, { yaw: Math.min(age, 2.4) * 0.5 * (dir > 0 ? 1 : -1), pitch: 0.26, width: por ? 20 : 28, ahead: 0 });
    }
  }
  return out;
}

function placeCamera() {
  const c = F3.camera;
  const por = portrait();
  const fov = Math.round(cam.fov * 10) / 10;
  // lens shift: project as if the view were (1 + shift) times taller and show its top part
  const fullH = Math.round(F3.h * (1 + cam.shift)), asp = F3.w / fullH;
  if (c.fov !== fov || c.aspect !== asp) {
    c.fov = fov; c.aspect = asp;
    if (fullH > F3.h) c.setViewOffset(F3.w, fullH, 0, 0, F3.w, F3.h); else c.clearViewOffset();
    c.updateProjectionMatrix();
  }
  const hh = Math.atan(Math.tan((c.fov * Math.PI) / 360) * c.aspect);
  const d = cam.width / 2 / Math.tan(hh);
  const X = wx(cam.fx), Z = wz(cam.fy);
  const sx = shake > 0 && F3.clockMs == null ? (Math.random() - 0.5) * shake : 0, sy = shake > 0 && F3.clockMs == null ? (Math.random() - 0.5) * shake : 0;
  const fwdX = -Math.sin(cam.yaw), fwdZ = -Math.cos(cam.yaw), ly = F3.camOverride ? F3.camOverride.lookY : 1.0;
  c.position.set(X - fwdX * Math.cos(cam.pitch) * d + sx, Math.sin(cam.pitch) * d + sy + ly, Z - fwdZ * Math.cos(cam.pitch) * d);
  c.lookAt(X + fwdX * cam.ahead, ly, Z + fwdZ * cam.ahead);
}

// Hide the scoreboard face when the top or a side of the view cuts it (loop 7: slivers under the phone HUD; loop 9:
// any cut over 4%), so the board is either whole or absent.
const cbBox = new THREE.Box3(), cbV = new THREE.Vector3();
function clipBoard() {
  const b = F3.stadium && F3.stadium.userData.board;
  if (!b) return;
  b.visible = true;
  if (b.userData.frame) b.userData.frame.visible = true;
  cbBox.setFromObject(b);
  let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
  for (let k = 0; k < 8; k++) {
    cbV.set(k & 1 ? cbBox.max.x : cbBox.min.x, k & 2 ? cbBox.max.y : cbBox.min.y, k & 4 ? cbBox.max.z : cbBox.min.z).project(F3.camera);
    if (cbV.z > 1) return;
    x0 = Math.min(x0, cbV.x); x1 = Math.max(x1, cbV.x); y0 = Math.min(y0, -cbV.y); y1 = Math.max(y1, -cbV.y);
  }
  // loop 9: any real cut by the top or a side edge (a board missing its top row or its away score reads as broken)
  const top = Math.max(0, -1 - y0) / (y1 - y0), side = (Math.max(0, -1 - x0) + Math.max(0, x1 - 1)) / (x1 - x0);
  if (x1 > -1 && x0 < 1 && y1 > -1 && (top > 0.04 || side > 0.04)) { b.visible = false; if (b.userData.frame) b.userData.frame.visible = false; }
}

// Advance the camera toward its target; returns true while it is still moving.
export function stepCamera3d(g, S, dt, now) {
  if (!F3.on || !g) return false;
  const fr = F3.lastFrame || frameFor(g, S, now);
  Object.assign(want, { shift: 0, fov: baseFov() }, cameraWant(g, fr, S, now));
  const inst = F3.instant || S.reduced || (S.paused && F3.clockMs != null); // review captures: no easing on a paused sim
  const k = inst ? 1 : clamp(dt * 3.2, 0, 1), kw = inst ? 1 : clamp(dt * 2.2, 0, 1);
  let dyaw = want.yaw - cam.yaw; while (dyaw > Math.PI) dyaw -= Math.PI * 2; while (dyaw < -Math.PI) dyaw += Math.PI * 2;
  const far = Math.abs(dyaw) > 2;
  cam.fx = lerp(cam.fx, want.fx, far ? 1 : k); cam.fy = lerp(cam.fy, want.fy, far ? 1 : k);
  cam.width = lerp(cam.width, want.width, far ? 1 : kw); cam.pitch = lerp(cam.pitch, want.pitch, far ? 1 : kw); cam.yaw += dyaw * (far ? 1 : kw);
  cam.ahead = lerp(cam.ahead, want.ahead, far ? 1 : kw);
  cam.shift = lerp(cam.shift, want.shift, far ? 1 : kw); if (Math.abs(cam.shift - want.shift) < 0.002) cam.shift = want.shift;
  cam.fov = lerp(cam.fov, want.fov, far ? 1 : kw); if (Math.abs(cam.fov - want.fov) < 0.05) cam.fov = want.fov;
  if (shake > 0) shake = Math.max(0, shake - dt * 3);
  F3.camMoving = Math.abs(cam.fx - want.fx) > 0.05 || Math.abs(cam.fy - want.fy) > 0.05 || Math.abs(cam.width - want.width) > 0.08 || Math.abs(cam.pitch - want.pitch) > 0.003 || Math.abs(dyaw) > 0.003 || Math.abs(cam.ahead - want.ahead) > 0.05 || cam.shift !== want.shift || cam.fov !== want.fov || shake > 0;
  return F3.camMoving;
}
export function cameraSettled3d(g, S) {
  if (!F3.on || !g) return true;
  const w = cameraWant(g, F3.lastFrame || frameFor(g, S, performance.now()), S, performance.now());
  return Math.abs(cam.fx - w.fx) < 0.06 && Math.abs(cam.fy - w.fy) < 0.06 && Math.abs(cam.width - w.width) < 0.1 && Math.abs(cam.pitch - w.pitch) < 0.004 && Math.abs(cam.ahead - w.ahead) < 0.06 && cam.shift === (w.shift || 0) && cam.fov === (w.fov || baseFov()) && shake <= 0;
}
export function shake3d(a) { shake = Math.max(shake, a); }

// ------------------------------------------------------------------ projection for the 2D overlay
const v3 = new THREE.Vector3();
export function project3d(fx, fy, h = 0) {
  v3.set(wx(fx), h, wz(fy)).project(F3.camera);
  return [(v3.x * 0.5 + 0.5) * F3.w, (-v3.y * 0.5 + 0.5) * F3.h, v3.z];
}
// Screen point just above a rig's helmet (for the carrier ID tag), or null when it isn't drawn.
export function headScreen3d(i) {
  const r = F3.rigs[i];
  if (!r || !r.group.visible) return null;
  r.bones.head.updateWorldMatrix(true, false);
  v3.setFromMatrixPosition(r.bones.head.matrixWorld); v3.y += 0.75;
  v3.project(F3.camera);
  return [(v3.x * 0.5 + 0.5) * F3.w, (-v3.y * 0.5 + 0.5) * F3.h];
}
// Pixels per yard at a field point (for overlay sizes).
export function ppyAt(fx, fy) {
  const [x0, y0] = project3d(fx - 0.5, fy, 0), [x1, y1] = project3d(fx + 0.5, fy, 0);
  return Math.hypot(x1 - x0, y1 - y0);
}

// ------------------------------------------------------------------ fx
export function fx3d(kind, fx, fy, c1, c2) {
  if (!F3.on) return;
  const X = wx(fx), Z = wz(fy);
  const add = (n, sp, up, life, cols, size) => {
    for (let i = 0; i < n; i++) {
      const a = rand() * Math.PI * 2, s = sp * (0.4 + rand() * 0.8);
      F3.pdata.push({ x: X, y: 0.3, z: Z, vx: Math.cos(a) * s, vy: up * (0.5 + rand()), vz: Math.sin(a) * s, life, max: life, c: new THREE.Color(cols[i % cols.length]).convertSRGBToLinear(), g: size });
    }
  };
  if (kind === 'hit') { add(36, 3.5, 3.2, 0.7, ['#2E6B3A', '#3B7D44', '#1A1A1A', '#556B2F'], 1); shake = Math.max(shake, 0.35); st.punchAt = clockNow(); }
  if (kind === 'td') {
    add(180, 6, 9, 2.2, [c1, c2, '#FFFFFF', '#D4AF37'], 0.4); crowdUniforms.hype.value = 1;
    st.tdAt = clockNow();
    if (!F3.dayTheme) for (let b = 0; b < 3; b++) { // fireworks above the scoreboard end
      const bx = (b - 1) * 18, by = 34 + b * 5, bz = -70 - b * 6;
      for (let i = 0; i < 60; i++) {
        const a = rand() * Math.PI * 2, e = rand() * Math.PI - Math.PI / 2, sp = 7 + rand() * 3;
        F3.pdata.push({ x: bx, y: by, z: bz, vx: Math.cos(a) * Math.cos(e) * sp, vy: Math.sin(e) * sp, vz: Math.sin(a) * Math.cos(e) * sp, life: 1.8 + b * 0.3, max: 1.8 + b * 0.3, c: new THREE.Color([c1, c2, '#FFD27A'][b % 3]).convertSRGBToLinear(), g: 0.12 });
      }
    }
  }
  if (kind === 'big') crowdUniforms.hype.value = Math.max(crowdUniforms.hype.value, 0.6);
  if (F3.pdata.length > 400) F3.pdata.splice(0, F3.pdata.length - 400);
}

function stepParticles(dt) {
  const arr = F3.parts.geometry.attributes.position.array, col = F3.parts.geometry.attributes.color.array;
  let n = 0;
  F3.pdata = F3.pdata.filter((p) => (p.life -= dt) > 0);
  for (const p of F3.pdata) {
    p.vy -= 9.8 * p.g * dt; p.x += p.vx * dt; p.y = Math.max(0.02, p.y + p.vy * dt); p.z += p.vz * dt;
    if (p.y <= 0.02) { p.vx *= 0.8; p.vz *= 0.8; }
    arr[n * 3] = p.x; arr[n * 3 + 1] = p.y; arr[n * 3 + 2] = p.z;
    const a = Math.min(1, p.life / p.max * 2);
    col[n * 3] = p.c.r * a; col[n * 3 + 1] = p.c.g * a; col[n * 3 + 2] = p.c.b * a;
    n++;
  }
  F3.parts.geometry.setDrawRange(0, n);
  F3.parts.geometry.attributes.position.needsUpdate = true; F3.parts.geometry.attributes.color.needsUpdate = true;
  return n > 0;
}

// ------------------------------------------------------------------ main render
// Tier and detail are not part of the key: they swap materials and toggle objects on the built stadium (applyTier).
// Only the big (32 px/yd) turf texture depends on detail, so the key carries that flag.
const bigTurf = () => F3.quality >= 2 && !portrait() && F3.renderer.capabilities.maxTextureSize >= 8192;
function sceneKey(g, S) {
  return `${g.teams[0].id}:${g.teams[1].id}:${g.home}:${g.neutral ? 1 : 0}:${S.settings.theme}:${weatherOf(g, S)}:${bigTurf() ? 'big' : 'std'}`;
}
export function weatherOf(g, S) {
  const w = S.settings.weather || 'auto';
  if (w !== 'auto') return w;
  // seeded per matchup and week so a game keeps its weather
  const h = [...`${g.teams[0].id}${g.teams[1].id}${g.seasonWeek ?? ''}${g.year ?? ''}`].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  const r = (h % 100) / 100;
  return r < 0.72 ? 'clear' : r < 0.9 ? 'mist' : 'rain';
}

function disposeTree(o) {
  o.traverse((m) => {
    if (m.geometry && !m.geometry.userData.keep) m.geometry.dispose();
    const mat = m.userData.matLow || m.material;
    if (mat) { const mats = Array.isArray(mat) ? mat : [mat]; for (const mt of mats) { if (mt.map) mt.map.dispose(); disposeStd(mt); mt.dispose(); } }
  });
}

function ensureStadium(g, S) {
  const key = sceneKey(g, S);
  if (key === F3.stadiumKey) return;
  if (F3.stadium) { F3.scene.remove(F3.stadium); disposeTree(F3.stadium); }
  if (F3.sideline) for (const m of F3.sideline) { F3.scene.remove(m); const lm = m.userData.matLow || m.material; disposeStd(lm); lm.dispose(); }
  const theme = S.settings.theme === 'day' ? 'day' : 'night', weather = weatherOf(g, S);
  F3.builds++;
  F3.env = null; // the environment map is per venue, theme and weather
  F3.stadium = buildStadium(g, { theme, weather, big: bigTurf() });
  F3.sbKey = ''; // the new scoreboard texture must be drawn
  F3.scene.add(F3.stadium);
  F3.stadiumKey = key;
  // sideline teams on their team areas
  const hs = F3.stadium.userData.homeSide, home = g.home ?? 0;
  F3.sideline = [sidelineMesh(teamDef(g.teams[home].id), true, hs, 16), sidelineMesh(teamDef(g.teams[1 - home].id), false, -hs, 14)];
  for (const m of F3.sideline) F3.scene.add(m);
  // uniforms
  F3.uni = [0, 1].map((side) => uniformFor(teamDef(g.teams[side].id), side === home && !g.neutralAway, contrast, onColor));
  // Medium/High kits for the baseline player (kits.js); a team without a design keeps everyone on the palette look
  try {
    F3.kit = [0, 1].map((side) => { const t = teamDef(g.teams[side].id); return { ...designFor(t, side === home && !g.neutralAway), decalArt: mascotSprite(t.id, 256) }; });
  } catch { F3.kit = null; }
  // lighting by theme / weather
  const day = theme === 'day';
  F3.hemi.color.set(day ? 0xbfd8ff : 0x8a9ad0); F3.hemi.groundColor.set(day ? 0x5a6a3a : 0x22301e); F3.hemi.intensity = day ? 1.6 : 0.7;
  F3.keyL.intensity = day ? 2.6 : 2.0; F3.keyR.intensity = day ? 0.8 : 1.5; F3.fill.intensity = day ? 0.6 : 0.65;
  F3.keyL.color.set(day ? 0xfff2dc : 0xfff0d8);
  const fogC = day ? 0xb8c8d8 : weather === 'rain' ? 0x1a1f2a : weather === 'mist' ? 0x2a3045 : 0x121630;
  F3.scene.fog = new THREE.FogExp2(fogC, weather === 'mist' ? 0.0042 : weather === 'rain' ? 0.0036 : day ? 0.0012 : 0.0019);
  F3.renderer.setClearColor(fogC);
  F3.rain.visible = weather === 'rain';
  F3.weather = weather; F3.dayTheme = day;
  F3.hemiBase = F3.hemi.intensity; F3.keyBase = [F3.keyL.intensity, F3.keyR.intensity, F3.fill.intensity];
  F3.appliedTier = ''; // re-apply materials and tier settings to the new stadium
  F3.instant = true;
}

// Apply the current tier and detail to everything in the scene (materials, shadows, environment, post, haze,
// crowd density). Called when they change and after every stadium build; never rebuilds geometry.
function applyTier(g, S) {
  const tier = F3.tier, std = tier !== 'low', day = F3.dayTheme;
  const key = `${tier}:${F3.quality}:${F3.stadiumKey}`;
  if (key === F3.appliedTier) return;
  F3.appliedTier = key;
  applyDetail(F3.stadium, F3.quality);
  applyMaterials(F3.scene, tier);
  applyShadowTier(F3, tier);
  if (std && !F3.env) F3.env = buildEnvironment(F3, F3.stadium.userData.lamps, day, F3.weather);
  F3.scene.environment = std ? F3.env : null;
  F3.scene.environmentIntensity = day ? 0.6 : 0.85;
  // the environment carries part of the ambient light the hemisphere light fakes at Low
  F3.hemi.intensity = F3.hemiBase * (std ? 0.55 : 1);
  [F3.keyL, F3.keyR, F3.fill].forEach((L, i) => { L.intensity = F3.keyBase[i] * (std ? [1.25, 1.2, 0.8][i] : 1); });
  F3.shadows.material.opacity = std ? 0.32 : 0.85;
  const ud = F3.stadium.userData;
  if (ud.towerMat) ud.towerMat.userData.u.lampHDR.value = tier === 'high' ? 3.2 : 1.6; // High: bright enough to bloom, not to wash the frame (loop 9)
  if (ud.spill) ud.spill.visible = std;
  if (ud.pools) ud.pools.visible = std;
  for (const m of ud.hazeMats || []) m.uniforms.hdr.value = tier === 'high' ? 0.36 : 1; // High: bloom carries the glare, keep the night black (loop 10: darker beyond the field)
  F3.stadium.traverse((o) => { if (o.userData.tag === 'glow') o.visible = tier !== 'high'; });
  // Medium/High bodies from the players pack (same skeleton: the procedural poses drive them unchanged). Players wear
  // the baseline player in their team's kit, at a level of detail picked each frame (pickLods); officials keep the HD
  // official. Low, or until the pack is ready, keeps the models-data.js meshes and the palette material.
  const hd = std ? packData('players') : null;
  F3.kitHd = hd && hd.regions && F3.kit ? hd : null;
  for (const r of F3.refs) { const gm = modelGeometry(r.kind, SCALE, hd); if (r.mesh.geometry !== gm) r.mesh.geometry = gm; }
  for (const r of F3.rigs) {
    if (F3.kitHd) { r.useKit(F3.kitHd.regions); r.lod = r.lod ?? 1; }
    else r.lod = null;
    const gm = F3.kitHd ? modelGeometry(`player_lod${r.lod}`, SCALE, F3.kitHd) : modelGeometry('player', SCALE, null);
    if (r.mesh.geometry !== gm) r.mesh.geometry = gm;
  }
  F3.lods = null;
  // card crowd from the Blender atlas at Medium/High (the box crowd stays at Low, or until the atlas is decoded)
  if (std) loadCrowdAtlas(() => { F3.appliedTier = ''; if (F3.onArt) F3.onArt(); });
  if (std && cardsReady() && !ud.cards) { ud.cards = crowdCards(ud.seatSets); F3.stadium.add(ud.cards); applyDetail(F3.stadium, F3.quality); }
  const cards = std && !!ud.cards;
  if (ud.cards) ud.cards.visible = cards;
  F3.stadium.traverse((o) => { if (o.userData.tag === 'crowd') o.visible = !cards; });
  cardUniforms.light.value = day ? 1.05 : 1.0; // the stands sit inside the lamps' spill
  if (tier === 'high' && !POST.composer) initPost(F3);
  F3.renderer.toneMapping = THREE.ACESFilmicToneMapping;
  F3.instant = true;
}

// Pick the tier for this frame (settings or the Auto governor).
function syncTier(S, now, dt) {
  chooseTier(F3, S.settings, dt, now, () => { F3.appliedTier = ''; if (F3.onArt) F3.onArt(); });
  F3.tier = tierState.tier;
  F3.quality = tierState.detail;
}
export const tierBusy = () => tierState.loading;

function updateScoreboard(g) {
  const sb = F3.stadium.userData.scoreboard;
  const home = g.home ?? 0;
  const state = { homeName: teamDef(g.teams[home].id).abbr, awayName: teamDef(g.teams[1 - home].id).abbr, home: g.score[home], away: g.score[1 - home],
    clock: shownClock(g), qtr: g.quarter > 4 ? 'OT' : g.quarter, down: g.down, toGo: g.toGo, ballOn: g.ballOn > 50 ? 100 - g.ballOn : g.ballOn, poss: g.poss === home ? 0 : 1 };
  const key = JSON.stringify(state);
  if (key !== F3.sbKey) { F3.sbKey = key; sb.draw(state); }
}

const tmpV = new THREE.Vector3(), tmpV2 = new THREE.Vector3(), M4 = new THREE.Matrix4(), Q = new THREE.Quaternion(), SC = new THREE.Vector3(), UP = new THREE.Vector3(0, 1, 0);
let lastNow = 0;

// Draw one frame. Returns true while something is still animating (poses settling, particles, replay).
export function render3d(g, S, now) {
  if (!F3.on || !g) return false;
  const t0 = performance.now();
  const dt = lastNow ? Math.min(0.1, (now - lastNow) / 1000) : 0.016;
  lastNow = now;
  syncTier(S, now, dt);
  resize3d();
  ensureStadium(g, S);
  applyTier(g, S);
  updateScoreboard(g);
  const fr = frameFor(g, S, now);
  F3.lastFrame = fr;
  // review captures freeze the clock on a paused sim: pose straight to the targets, so a still doesn't depend on how
  // many frames rendered before it
  const inst = F3.instant || S.reduced || (S.paused && F3.clockMs != null);
  if (F3.instant || S.reduced) stepCamera3d(g, S, dt, now);
  // ball: oversized for the far broadcast cameras, real size (about 11 in) in close and replay shots
  const B = F3.ball;
  const bk = F3.tier === 'low' ? 1 : clamp(F3.camera.position.distanceTo(B.position) / 42, 0.42, 1);
  const snapR = 0.15 * 1.35 * bk; // the ball's half height on the turf before the snap (the center's hand rests on top)
  // players
  let animating = false;
  for (let i = 0; i < 22; i++) {
    const r = F3.rigs[i], p = fr.ps[i];
    if (!p) { r.group.visible = false; continue; }
    r.group.visible = true;
    const u = F3.uni[p.team];
    const lk = `${F3.stadiumKey}:${p.team}:${p.num}`;
    const skin = SKIN_TONES[(p.num * 7 + p.team * 3) % SKIN_TONES.length];
    if (r.paint !== lk) { r.setLook({ ...u.colors, skin }, p.num, u.numFill, u.numOutline, lk); r.mat.userData.u.rim.value = lum(u.colors.jersey) < 0.05 ? 0.6 : 0.4; }
    if (F3.kitHd && r.kitPaint !== lk) { r.setKit(F3.kit[p.team], p.num, skin, lk); r.kitMat.userData.u.rim.value = lum(F3.kit[p.team].colors.jersey) < 0.05 ? 0.6 : 0.4; }
    const prevF = r.fall, prevYaw = r.yaw;
    r.pose({ x: wx(p.x), z: wz(p.y), vx: p.vx, vz: -p.vy, face: p.face === null || p.face === undefined ? null : p.face, stance: p.stance, eng: p.eng, carry: p.carry,
      throwing: p.throwing ?? -1, reach: p.reach || 0, down: p.down, dive: p.dive, fallAge: p.fallAge, celebrate: p.celebrate, idle: p.idle, kick: p.kick ?? -1,
      qbSet: !!(fr.qbHold && p.slot === 'QB' && fr.ball.held === i), plantY: snapR * 2 }, dt, inst);
    if (Math.abs(r.fall - prevF) > 0.002 || Math.abs(r.yaw - prevYaw) > 0.002) animating = true;
  }
  // rain: running players kick up spray from the wet turf (Medium/High)
  if (F3.weather === 'rain' && F3.tier !== 'low' && !S.reduced && dt > 0) {
    for (const r of F3.rigs) {
      if (!r.group.visible || r.spd < 2.5 || rand() > r.spd * dt * 0.9) continue;
      const a = rand() * Math.PI * 2;
      F3.pdata.push({ x: r.group.position.x + Math.cos(a) * 0.3, y: 0.05, z: r.group.position.z + Math.sin(a) * 0.3, vx: Math.cos(a) * 1.2, vy: 1.6 + rand() * 1.4, vz: Math.sin(a) * 1.2,
        life: 0.35, max: 0.35, c: new THREE.Color(0.55, 0.62, 0.72), g: 0.5 });
    }
    if (F3.pdata.length > 400) F3.pdata.splice(0, F3.pdata.length - 400);
  }
  // officials: referee behind the offense, umpire behind the defensive line, wing officials on the sidelines,
  // back judge deep; they drift with the ball.
  const bx = fr.ball.held >= 0 ? fr.ps[fr.ball.held].x : fr.ball.x, by = fr.ball.held >= 0 ? fr.ps[fr.ball.held].y : fr.ball.y;
  const los = fr.los ?? by, d = fr.dir || 1;
  const spots = [[W / 2 + 4, los - d * 11], [W / 2 - 1, los + d * 6], [-1.6, los], [W + 1.6, los], [W / 2 + 2, los + d * 22]];
  F3.refs.forEach((r, i) => {
    const [tx, ty] = spots[i];
    const ty2 = fr.live && i >= 2 && i < 4 ? lerp(ty, by, 0.8) : ty;
    r.tx = inst || r.tx === undefined ? tx : lerp(r.tx, tx, clamp(dt * 1.5, 0, 1));
    r.ty = inst || r.ty === undefined ? ty2 : lerp(r.ty, ty2, clamp(dt * 1.5, 0, 1));
    const vx = (tx - r.tx) * 1.5, vy = (ty2 - r.ty) * 1.5;
    r.pose({ x: wx(r.tx), z: wz(r.ty), vx, vz: -vy, face: Math.atan2(wx(bx) - wx(r.tx), wz(by) - wz(r.ty)), stance: null }, dt, inst);
    r.group.visible = fr.kicking === undefined ? true : (i === 2 || i === 3);
  });
  const ci = fr.ball.snap ? fr.ps.findIndex((p) => p && p.stance === 'c') : -1;
  if (ci >= 0) { // before the snap: on the turf under the center's hand
    F3.rigs[ci].handPos(B.position, KNUCKLE);
    B.position.y = snapR; B.rotation.set(0, F3.rigs[ci].yaw, 0); B.scale.setScalar(1.35 * bk);
  } else if (fr.ball.held >= 0 && F3.rigs[fr.ball.held]) {
    const r = F3.rigs[fr.ball.held], hp = fr.ps[fr.ball.held];
    if (hp && hp.throwing >= 0) { r.handPos(B.position); B.rotation.set(0, r.yaw, 0); B.rotateX(-1.1); } // passer: ball in the throwing hand
    else if (r.fall > 0.25 || (hp && hp.reach > 0.3)) { r.handPos(B.position); B.rotation.set(0, r.yaw, 0); B.rotateX(-0.6); } // going down or catching: in the hands, not floating at the chest
    else {
      r.chestPos(tmpV); r.group.getWorldDirection(tmpV2);
      B.position.copy(tmpV).addScaledVector(tmpV2, 0.32);
      B.position.x += Math.cos(r.yaw) * -0.22; B.position.z += Math.sin(r.yaw) * 0.22;
      B.rotation.set(0, r.yaw, 0); B.rotateX(-0.6);
    }
    B.scale.setScalar(1.35 * bk);
  } else {
    // a pass leaves the passer's hand about 2 yd up (the sim's flight height starts at the turf), easing out early
    const lift = fr.ball.rel !== undefined ? 2.0 * Math.max(0, 1 - fr.ball.rel * 2.2) : 0;
    B.position.set(wx(fr.ball.x), Math.max(0.12, fr.ball.z * 0.9 + 0.12 + lift), wz(fr.ball.y));
    B.scale.setScalar((fr.ball.z > 0.6 ? 1.9 : 1.35) * bk);
    if (fr.ball.vx !== undefined || fr.ball.spin) {
      const vx = fr.ball.vx || 0, vy = fr.ball.vy || (fr.dir || 1) * 10;
      B.rotation.set(0, Math.atan2(vx, -vy), 0); B.rotateX(-0.25); B.rotateZ((F3.clockMs ?? now) * 0.03);
    } else B.rotation.set(0, Math.PI / 2, 0);
  }
  // a short tapered ribbon behind a ball in the air, traced back along the flight from the sim's displacement (no
  // frame history, so it is the same in a paused capture as live: loop 9)
  if (!F3.trail) {
    const tg = new THREE.BufferGeometry(), N = 10;
    tg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 2 * 3), 3).setUsage(THREE.DynamicDrawUsage));
    tg.setAttribute('color', new THREE.BufferAttribute(new Float32Array(N * 2 * 4), 4).setUsage(THREE.DynamicDrawUsage));
    const idx = []; for (let i = 0; i < N - 1; i++) idx.push(i * 2, i * 2 + 1, i * 2 + 2, i * 2 + 1, i * 2 + 3, i * 2 + 2);
    tg.setIndex(idx);
    F3.trail = new THREE.Mesh(tg, new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, depthWrite: false, side: THREE.DoubleSide, fog: false }));
    F3.trail.frustumCulled = false; F3.trail.renderOrder = 3; F3.scene.add(F3.trail); F3.trailN = N;
  }
  const kt = fr.ball.trail && fr.ball.trail.length > 2 ? fr.ball.trail : null; // kicks: sampled path (field x, y, height)
  F3.trail.visible = fr.ball.held < 0 && fr.ball.z > 0.6 && (fr.ball.vx !== undefined || !!kt);
  if (F3.trail.visible) {
    const N = F3.trailN, pa = F3.trail.geometry.attributes.position.array, ca = F3.trail.geometry.attributes.color.array;
    const cam = F3.camera.position, len = Math.min(0.12, fr.ball.rel || 0.12);
    const at = (u) => { // a point on the trail, u = 0 at the ball
      if (!kt) return tmpV.set(B.position.x - fr.ball.vx * u * len, B.position.y - u * 0.25, B.position.z + fr.ball.vy * u * len);
      const f = u * (kt.length - 1), i = Math.min(kt.length - 2, Math.floor(f)), w = f - i, p = kt[i], q = kt[i + 1];
      return tmpV.set(wx(p[0] + (q[0] - p[0]) * w), Math.max(0.12, (p[2] + (q[2] - p[2]) * w) * 0.9 + 0.12), wz(p[1] + (q[1] - p[1]) * w));
    };
    for (let i = 0; i < N; i++) {
      const u = i / (N - 1);
      const nx = at(Math.min(1, u + 0.05)).clone(), cur = at(u);
      tmpV2.copy(nx).sub(cur);
      if (tmpV2.lengthSq() < 1e-8) tmpV2.set(-(fr.ball.vx || 0), 0, fr.ball.vy || 1);
      tmpV2.normalize().cross(cur.clone().sub(cam)).normalize().multiplyScalar((kt ? 0.16 : 0.11) * bk * (1 - u * 0.85));
      pa.set([tmpV.x + tmpV2.x, tmpV.y + tmpV2.y, tmpV.z + tmpV2.z, tmpV.x - tmpV2.x, tmpV.y - tmpV2.y, tmpV.z - tmpV2.z], i * 6);
      const al = 0.7 * (1 - u) ** 1.5;
      ca.set([1, 0.96, 0.86, al, 1, 0.96, 0.86, al], i * 8);
    }
    F3.trail.geometry.attributes.position.needsUpdate = true; F3.trail.geometry.attributes.color.needsUpdate = true;
  }
  // shadows
  let si = 0;
  const shadowAt = (x, z, sx, sz, rot, op) => {
    Q.setFromAxisAngle(UP, rot); SC.set(sx, 1, sz); tmpV.set(x, 0.02, z);
    M4.compose(tmpV, Q, SC); F3.shadows.setMatrixAt(si++, M4); void op;
  };
  for (const r of [...F3.rigs, ...F3.refs]) {
    if (!r.group.visible) continue;
    const x = r.group.position.x, z = r.group.position.z;
    if (si > 60) break;
    if (F3.weather === 'day' || S.settings.theme === 'day') shadowAt(x + 0.5, z - 0.3, 1.6, 3.2, 0.9, 1);
    else { shadowAt(x + 0.9, z, 2.8, 1.1, 0.12, 1); shadowAt(x - 0.9, z, 2.8, 1.1, -0.12, 1); }
  }
  shadowAt(B.position.x, B.position.z, 0.7 / (1 + B.position.y * 0.1), 0.7 / (1 + B.position.y * 0.1), 0, 1);
  F3.shadows.count = si; F3.shadows.instanceMatrix.needsUpdate = true;
  // down & distance decal: only while the teams set up (call / pre-snap), not during the play
  const showDD = !fr.replay && fr.los !== null && fr.los !== undefined && (g.phase === 'call' || g.phase === 'pre');
  F3.dd.visible = showDD;
  if (showDD) {
    const txt = g.twoPoint ? 'TWO-POINT TRY' : `${['', '1ST', '2ND', '3RD', '4TH'][g.down] || g.down + 'TH'} & ${g.ballOn + g.toGo >= 100 ? 'GOAL' : g.toGo}`;
    if (txt !== F3.ddTxt) {
      F3.ddTxt = txt;
      const x = F3.ddCanvas.getContext('2d');
      x.clearRect(0, 0, 512, 128);
      x.font = '700 92px Oswald, "Arial Narrow", Impact, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
      x.lineJoin = 'round'; x.lineWidth = 10; x.strokeStyle = 'rgba(10,12,20,0.55)'; x.strokeText(txt, 256, 66);
      x.fillStyle = 'rgba(255,246,224,0.92)'; x.fillText(txt, 256, 66);
      F3.ddTex.needsUpdate = true;
    }
    const d = g.poss === 0 ? 1 : -1;
    // on the far side of the ball from the offense's backfield, off the hash, readable from the camera
    F3.dd.position.set(wx(clamp((g.absX ?? W / 2) < W / 2 ? W * 0.72 : W * 0.28, 8, W - 8)), 0.05, wz(fr.los + d * 3.2));
  }
  // chain crew (on the visitors' sideline, away from the home stands)
  const cside = F3.stadium ? -F3.stadium.userData.homeSide : 1, cx = cside * (W / 2 + 1.6);
  const showChains = fr.los !== null && fr.los !== undefined && fr.fd !== null && fr.fd !== undefined && !fr.replay;
  for (const o of [...F3.chains, F3.downBox, F3.chain]) o.visible = showChains;
  if (showChains) {
    const z0 = wz(fr.fd - (g.poss === 0 ? 10 : -10)), z1 = wz(fr.fd);
    F3.chains[0].position.set(cx, 0, z0); F3.chains[1].position.set(cx, 0, z1);
    F3.downBox.position.set(cx + cside * 0.6, 0, wz(fr.los));
    F3.chain.position.set(cx, 0.6, (z0 + z1) / 2); F3.chain.scale.set(1, Math.abs(z1 - z0), 1);
  }
  // goalposts: hide the set between the camera and the field
  for (const m of F3.stadium.userData.posts || []) m.visible = !(Math.sign(F3.camera.position.z) === Math.sign(m.userData.endZ) && Math.abs(F3.camera.position.z) > Math.abs(m.userData.endZ) + 2);
  // markers
  F3.los.visible = fr.los !== null && fr.los !== undefined && !fr.replay; if (F3.los.visible) F3.los.position.set(0, 0.03, wz(fr.los));
  F3.fd.visible = fr.fd !== null && fr.fd !== undefined && !fr.replay; if (F3.fd.visible) F3.fd.position.set(0, 0.031, wz(fr.fd));
  F3.ring.visible = fr.user >= 0;
  if (fr.user >= 0) { // between the carrier's hips and feet (the body leans and strides ahead of its root at speed); hips alone once he goes down
    const r = F3.rigs[fr.user]; r.group.updateWorldMatrix(true, true);
    tmpV.setFromMatrixPosition(r.bones.pelvis.matrixWorld);
    tmpV2.set(0, -0.52 * SCALE, 0).applyMatrix4(r.bones.shinL.matrixWorld);
    tmpV2.add(F3.ring.position.set(0, -0.52 * SCALE, 0).applyMatrix4(r.bones.shinR.matrixWorld)).multiplyScalar(0.5);
    tmpV.lerp(tmpV2, 0.4 * (1 - r.fall));
    F3.ring.position.set(tmpV.x, 0.04, tmpV.z); F3.ring.rotation.y = (F3.clockMs ?? now) * 0.002;
  }
  F3.target.visible = !!fr.target;
  if (fr.target) F3.target.position.set(wx(fr.target[0]), 0.045, wz(fr.target[1]));
  // crowd + particles + rain (clockMs, set by tests, freezes everything that moves with wall time)
  // (and a paused sim under the test clock holds them still, so a capture doesn't depend on wall-clock frame times: loop 9)
  const fxDt = S.paused && F3.clockMs != null ? 0 : dt;
  crowdUniforms.time.value = (F3.clockMs ?? now) / 1000;
  crowdUniforms.hype.value = Math.max(0, crowdUniforms.hype.value - fxDt * 0.35);
  if (stepParticles(fxDt)) animating = true;
  if (crowdUniforms.hype.value > 0.01) animating = true;
  if (F3.rain.visible) stepRain(fxDt);
  // camera (the main loop also steps it; when instant, already placed)
  placeCamera();
  clipBoard();
  pickLods(fr, S);
  F3.instant = false;
  const R = F3.renderer;
  R.info.reset();
  if (F3.tier !== 'low') fitShadows(F3);
  if (F3.tier === 'high' && POST.composer) {
    // replays get a shallow depth of field focused on the ball
    const focus = fr.replay ? F3.camera.position.distanceTo(B.position) : null;
    renderPost(F3, { focusDist: focus, grainSeed: Math.floor((F3.clockMs ?? now) / 41), animating });
    F3.callsTotal = R.info.render.calls; F3.trisTotal = R.info.render.triangles;
  } else {
    R.render(F3.scene, F3.camera);
    F3.sceneCalls = F3.callsTotal = R.info.render.calls; F3.sceneTris = F3.trisTotal = R.info.render.triangles;
  }
  if (fr.replay) animating = true;
  F3.animating = animating;
  // adaptive quality: drop resolution if frames are slow on real hardware
  const ms = performance.now() - t0;
  F3.frameMs.push(ms); if (F3.frameMs.length > 90) F3.frameMs.shift();
  return animating;
}

// Level of detail per player (with the kit, Medium/High): by the player's height on screen in pixels, with a 10% band
// around each threshold so nobody flickers between levels. LOD0 only at High, or in replays and close-ups, where a
// single player can fill the frame. Geometry is swapped only when a level changes; the skeleton is shared.
const LOD_PX = [120, 40]; // from experiments/baseline-player's pixel check: LOD2 trails LOD1 even at 45 m, LOD0 pulls ahead of LOD1 above ~120 px
function pickLods(fr, S) {
  if (!F3.kitHd) return;
  const c = F3.camera, k = (F3.renderer.domElement.height * 1.89 * SCALE) / (2 * Math.tan((c.fov * Math.PI) / 360));
  const lod0 = F3.tier === 'high' || !!fr.replay || !!F3.camOverride;
  const n = [0, 0, 0];
  let top = 0;
  for (const r of F3.rigs) {
    if (!r.group.visible) continue;
    const h = k / Math.max(0.5, c.position.distanceTo(tmpV.set(r.group.position.x, 1.2, r.group.position.z)));
    top = Math.max(top, h);
    // while the camera moves, stay at the finer level until clearly below its threshold (no flicker); once it settles,
    // (or while paused) the plain thresholds, so a still frame doesn't depend on how the camera got there
    const at = (i) => LOD_PX[i] * (!F3.camMoving || S.paused ? 1 : r.lod <= i ? 0.9 : 1.1);
    const lod = lod0 && h > at(0) ? 0 : h > at(1) ? 1 : 2;
    if (lod !== r.lod) { r.lod = lod; r.mesh.geometry = modelGeometry(`player_lod${lod}`, SCALE, F3.kitHd); }
    n[lod]++;
  }
  F3.lods = n; F3.lodTop = Math.round(top);
}

function stepRain(dt) {
  const arr = F3.rain.geometry.attributes.position.array, c = F3.camera.position;
  const t = (F3.clockMs ?? performance.now()) / 1000;
  F3.rainSeed.forEach((s, i) => {
    const x = c.x + (s[0] - 0.5) * 120, z = c.z - 10 - s[1] * 110;
    const y = 40 - ((t * 32 + s[2] * 40) % 40);
    arr.set([x, y, z, x + 0.15, y - 1.1, z + 0.1], i * 6);
  });
  F3.rain.geometry.attributes.position.needsUpdate = true;
  void dt;
}

export function snap3d() { F3.instant = true; }
export function clearFx3d() { if (F3.pdata) F3.pdata.length = 0; }
// Dev/test aid: average render time with each tagged layer hidden in turn (finds what a GPU struggles with).
export function profile3d(n = 6) {
  if (!F3.on || !F3.stadium) return null;
  const time = () => { const gl = F3.renderer.getContext(); const t0 = performance.now(); for (let i = 0; i < n; i++) F3.renderer.render(F3.scene, F3.camera); gl.finish(); return (performance.now() - t0) / n; };
  const out = { all: time() };
  const tags = new Set(); F3.stadium.traverse((o) => { if (o.userData.tag) tags.add(o.userData.tag); });
  for (const tg of tags) {
    const hid = []; F3.stadium.traverse((o) => { if (o.userData.tag === tg && o.visible) { o.visible = false; hid.push(o); } });
    out[tg] = Math.round((out.all - time()) * 10) / 10;
    for (const o of hid) o.visible = true;
  }
  out.all = Math.round(out.all * 10) / 10;
  return out;
}
// Test aid: a player's pose by slot, in yards above the turf: knuckles of each hand, shoulders, and the back's pitch
// from upright in radians.
// 'carrier' is the ringed player; ring: how far the carrier ring's centre sits from the hips, if it is showing.
export function rigProbe3d(slot) {
  const fr = F3.lastFrame, i = !fr ? -1 : slot === 'carrier' ? fr.user : fr.ps.findIndex((p) => p && p.slot === slot), r = F3.rigs[i];
  if (!r) return null;
  r.group.updateWorldMatrix(true, true);
  const B = r.bones, y = (o, len = 0) => Math.round(tmpV.set(0, -len, 0).applyMatrix4(o.matrixWorld).y * 1000) / 1000;
  const hips = new THREE.Vector3().setFromMatrixPosition(B.pelvis.matrixWorld);
  const sh = tmpV2.setFromMatrixPosition(B.head.matrixWorld).sub(tmpV.setFromMatrixPosition(B.spine.matrixWorld));
  return { slot: fr.ps[i].slot, stance: fr.ps[i].stance, handL: y(B.foreL, KNUCKLE), handR: y(B.foreR, KNUCKLE), shoulderL: y(B.armL), shoulderR: y(B.armR),
    back: Math.round(Math.acos(sh.normalize().y) * 100) / 100,
    ring: F3.ring.visible && fr.user === i ? Math.round(Math.hypot(F3.ring.position.x - hips.x, F3.ring.position.z - hips.z) * 1000) / 1000 : null };
}
// Test aid: the page-space rectangle of a 3D object, for zoomed review crops. target: 'rig:<i>', 'ref:<i>',
// 'slot:<QB|RB|...>', 'carrier', 'ball', 'board' (scoreboard), 'crowd' (all crowd meshes), 'turf:<fx>,<fy>'.
const bbV = new THREE.Vector3(), bbBox = new THREE.Box3();
export function bbox3d(target) {
  if (!F3.on || !F3.lastFrame) return null;
  const fr = F3.lastFrame, [kind, arg] = String(target).split(':');
  bbBox.makeEmpty();
  if (kind === 'rig' || kind === 'slot' || kind === 'carrier') {
    const i = kind === 'rig' ? +arg : kind === 'carrier' ? (fr.ball.held >= 0 ? fr.ball.held : fr.user) : fr.ps.findIndex((p) => p.slot === arg);
    if (!(i >= 0) || !F3.rigs[i]) return null;
    bbBox.setFromObject(F3.rigs[i].group);
  } else if (kind === 'ref') bbBox.setFromObject(F3.refs[+arg].group);
  else if (kind === 'ball') bbBox.setFromObject(F3.ball).expandByScalar(0.4);
  else if (kind === 'board' && F3.stadium) bbBox.setFromObject(F3.stadium.userData.board);
  else if (kind === 'crowd' && F3.stadium) F3.stadium.traverse((o) => { if (o.userData.tag === 'crowd') bbBox.expandByObject(o); });
  else if (kind === 'turf') { const [fx, fy] = arg.split(',').map(Number); bbBox.set(bbV.set(wx(fx) - 3, 0, wz(fy) - 3).clone(), bbV.set(wx(fx) + 3, 0.2, wz(fy) + 3).clone()); }
  if (bbBox.isEmpty()) return null;
  const cr = F3.canvas.getBoundingClientRect();
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (let k = 0; k < 8; k++) {
    bbV.set(k & 1 ? bbBox.max.x : bbBox.min.x, k & 2 ? bbBox.max.y : bbBox.min.y, k & 4 ? bbBox.max.z : bbBox.min.z).project(F3.camera);
    const px = (bbV.x * 0.5 + 0.5) * F3.w, py = (-bbV.y * 0.5 + 0.5) * F3.h;
    x0 = Math.min(x0, px); y0 = Math.min(y0, py); x1 = Math.max(x1, px); y1 = Math.max(y1, py);
  }
  x0 = clamp(x0, 0, F3.w); x1 = clamp(x1, 0, F3.w); y0 = clamp(y0, 0, F3.h); y1 = clamp(y1, 0, F3.h);
  if (x1 - x0 < 1 || y1 - y0 < 1) return null;
  return { x: cr.left + x0, y: cr.top + y0, w: x1 - x0, h: y1 - y0 };
}

// Test aid: a close-up camera on a bbox3d target (`width` yards across, from `yaw`/`pitch`), for review close-ups
// of the actual assets at the game's render quality. camLook3d(null) hands the camera back to the director.
export function camLook3d(target, width = 6, pitch = 0.18, yaw = 0.5) {
  if (!target) { F3.camOverride = null; F3.instant = true; return true; }
  const [kind, arg] = String(target).split(':');
  bbBox.makeEmpty();
  const fr = F3.lastFrame;
  if (!fr) return false;
  if (kind === 'rig' || kind === 'slot' || kind === 'carrier') {
    const i = kind === 'rig' ? +arg : kind === 'carrier' ? (fr.ball.held >= 0 ? fr.ball.held : fr.user) : fr.ps.findIndex((p) => p.slot === arg);
    if (!(i >= 0) || !F3.rigs[i]) return false;
    bbBox.setFromObject(F3.rigs[i].group);
  } else if (kind === 'ball') bbBox.setFromObject(F3.ball);
  else if (kind === 'board' && F3.stadium) bbBox.setFromObject(F3.stadium.userData.board);
  else if (kind === 'crowd' && F3.stadium) { const ud = F3.stadium.userData; bbBox.set(bbV.set(ud.homeBack - ud.homeSide * 8, 4, -12).clone(), bbV.set(ud.homeBack - ud.homeSide * 8, 4, 12).clone()); }
  else if (kind === 'turf') { const [fx, fy] = arg.split(',').map(Number); bbBox.set(bbV.set(wx(fx), 0, wz(fy)).clone(), bbV.set(wx(fx), 0, wz(fy)).clone()); }
  if (bbBox.isEmpty()) return false;
  const c = bbBox.getCenter(new THREE.Vector3());
  // stands and the scoreboard are seen from the field
  if (kind === 'crowd') { yaw = -F3.stadium.userData.homeSide * Math.PI / 2; width = Math.max(width, 30); }
  if (kind === 'board') { yaw = c.z < 0 ? 0 : Math.PI; width = Math.max(width, 24); }
  F3.camOverride = { fx: c.x + W / 2, fy: 60 - c.z, width, pitch, yaw, ahead: 0, lookY: c.y };
  F3.instant = true;
  return true;
}

export function info3d() {
  const sorted = [...F3.frameMs].sort((a, b) => a - b), fm = sorted.length ? sorted[sorted.length >> 1] : 0; // median
  return { on: F3.on, renderer: F3.renderer3dInfo, software: !!F3.software, quality: F3.quality, tier: F3.tier, detail: F3.quality, builds: F3.builds, packs: packInfo(), post: !!(F3.tier === 'high' && POST.composer),
    venue: F3.stadium ? F3.stadium.userData.venue.key : null, weather: F3.weather || null,
    animating: !!F3.animating, artLoading: !!F3.artLoading, hype: Math.round(crowdUniforms.hype.value * 100) / 100, parts: F3.pdata ? F3.pdata.length : 0,
    // calls/tris: the scene render (shadow maps included); *Total adds the post-processing passes
    calls: F3.sceneCalls || 0, tris: F3.sceneTris || 0, callsTotal: F3.callsTotal || 0, trisTotal: F3.trisTotal || 0,
    shadowCasters: [F3.keyL, F3.keyR].filter((L) => L && L.castShadow).length, cpuMs: Math.round(fm * 100) / 100, replay: !!F3.replay, err: F3.err, kit: !!F3.kitHd, lods: F3.lods || null, lodTop: F3.lodTop || 0,
    cam: { fx: Math.round(cam.fx * 10) / 10, fy: Math.round(cam.fy * 10) / 10, width: Math.round(cam.width * 10) / 10, yaw: Math.round(cam.yaw * 100) / 100 } };
}
