// The 3D field view (three.js): builds a frame of 22 players + ball from the game state (live play, pre-snap,
// huddles, kick units), poses the animated rigs, directs a broadcast camera (pre-snap, follow, kicks, field
// goals, touchdown orbit, sideline replays), and projects field points to screen pixels for the 2D overlay
// (receiver badges, route previews, kick meter). field.js keeps the 2D renderer as the fallback.
import { THREE } from './three-lib.js';
import { W, toAbs } from './sim.js';
import { teamDef, contrast, onColor, lum } from './data.js';
import { starters } from './roster.js';
import { playById } from './plays.js';
import { buildStadium, crowdUniforms, blobTexture, skyArt, wx, wz } from './stadium.js';
import { SKY_RIDGE } from './sky-data.js';
import { Rig, uniformFor, SKIN_TONES } from './players3d.js';
import { kickBallPos, kickDur, losY } from './field.js';
import { paletteMaterial, setPalette, modelGeometry } from './models.js';

export const F3 = {
  on: false, renderer: null, scene: null, camera: null, canvas: null, stadium: null, stadiumKey: '',
  rigs: [], refs: [], ball: null, ballShadow: null, shadows: null, lines: null, fx: [], cam: null, instant: true,
  replay: null, rec: null, animating: false, w: 300, h: 300, dpr: 1, quality: 2, frameMs: [], err: null, renderer3dInfo: '',
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
  const g = new THREE.SphereGeometry(1, 14, 10);
  g.scale(0.15, 0.15, 0.27);
  const n = g.attributes.position.count, col = new Float32Array(n * 3);
  const brown = new THREE.Color('#6B3518').convertSRGBToLinear(), white = new THREE.Color('#F2F2EE').convertSRGBToLinear();
  for (let i = 0; i < n; i++) {
    const z = g.attributes.position.getZ(i) / 0.27, y = g.attributes.position.getY(i), x = g.attributes.position.getX(i);
    const stripe = Math.abs(Math.abs(z) - 0.62) < 0.07; // white stripes near the tips (high-school balls)
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
  F3.parts = new THREE.Points(pg, new THREE.PointsMaterial({ size: 0.45, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
  F3.parts.frustumCulled = false; S.add(F3.parts);
  F3.pdata = []; // {x,y,z,vx,vy,vz,life,c}
  // rain
  const RN = 900, rg = new THREE.BufferGeometry(), rp = new Float32Array(RN * 6);
  rg.setAttribute('position', new THREE.BufferAttribute(rp, 3).setUsage(THREE.DynamicDrawUsage));
  F3.rain = new THREE.LineSegments(rg, new THREE.LineBasicMaterial({ color: 0xaab8d0, transparent: true, opacity: 0.35, depthWrite: false }));
  F3.rain.frustumCulled = false; F3.rain.visible = false; S.add(F3.rain);
  F3.rainSeed = Array.from({ length: RN }, (_, i) => [Math.random(), Math.random(), Math.random()]);
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
    const z = -22 + (i / count) * 44 + Math.sin(i * 12.9) * 0.8, x = side * (W / 2 + 4.2 + (i % 3) * 0.9);
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

function playFrame(g, S, now) {
  const P = g.play, dir = P.offTeam === 0 ? 1 : -1, los = P.offTeam === 0 ? 10 + P.ballOn : 110 - P.ballOn;
  if (st.prevPlay !== P) { st.prevPlay = P; st.throwT = -1; st.missT = {}; st.deadAt = 0; F3.rec = { P, frames: [], g }; }
  if (P.thrown && st.throwT < 0) st.throwT = P.t;
  for (const e of P.ev) if (e.k === 'miss') st.missT[e.i] = P.t;
  if (P.phase === 'dead' && !st.deadAt) st.deadAt = now;
  const res = P.result;
  const falls = res && ['tackle', 'sack', 'fumble', 'fumbleLost', 'safety', 'int', 'touchback'].includes(res.kind) && !res.capped;
  const td = res && res.kind === 'td';
  const b = P.ball;
  const qb = P.A[P.idx.QB];
  const ps = [];
  let tackler = -1;
  if (falls && res.tacklerPid) tackler = P.A.findIndex((a) => a.pid === res.tacklerPid && a.side !== P.A[P.carrier].side);
  for (const a of P.A) {
    const [x, y] = toAbs(a.x, a.y, los, dir);
    const team = a.side === 'O' ? P.offTeam : 1 - P.offTeam;
    let stance = null, face = null;
    if (P.phase === 'pre') {
      stance = OL.has(a.slot) || DL.has(a.slot) ? 'ol' : a.slot === 'QB' ? 'qb' : DB.has(a.slot) ? 'db' : 'two';
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
    const deadAge = st.deadAt ? (now - st.deadAt) / 1000 : 0;
    ps.push({
      team, num: a.num, slot: a.slot, side: a.side, x, y, vx: a.vx * dir, vy: a.vy * dir, face, stance,
      eng: a.eng >= 0, carry: isCarrier && P.phase !== 'pre' && !(a.slot === 'QB' && b.h === a.i && !P.handed && !P.scramble && P.carrier === qb.i && false),
      throwing: a.slot === 'QB' && st.throwT >= 0 && P.t - st.throwT < 0.6 ? P.t - st.throwT : -1,
      reach: b.st === 'air' && b.to === a.i ? clamp(1 - (b.T - b.t) / 0.45, 0, 1) : 0,
      down: (falls && (a.i === P.carrier || a.i === tackler)) || missAge < 0.9, dive: a.i === tackler || missAge < 0.9,
      celebrate: td && a.side === P.A[P.carrier].side && (a.i === P.carrier || Math.hypot(a.x - P.A[P.carrier].x, a.y - P.A[P.carrier].y) < 9) && deadAge > 0.15,
      kick: -1,
    });
  }
  let ball;
  if (b.st === 'air') { const [bx, by] = toAbs(b.x, b.y, los, dir); ball = { x: bx, y: by, z: b.z, held: -1, vx: (b.tx - b.fx) * dir, vy: (b.ty - b.fy) * dir }; }
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
  if (kt >= 0.12 && g.kickAnim) { const [bx, by, bz] = kickBallPos(g, g.kickAnim); ball = { x: bx, y: by, z: bz + 0.3, held: -1, spin: true }; }
  else ball = { x: cx - 0.6, y: los - dir * 7.2, z: 0.25, held: -1 };
  return { ps, ball, los: null, fd: null, user: -1, target: null, live: false, dir, kicking: side };
}

// Kickoffs and punts: coverage and return units (the kick itself is resolved by the rules; positions are procedural).
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
  const ball = held ? { held: 11, x: bxA, y: byA, z: 1 } : { x: bxA, y: byA, z: bz + 0.2, held: -1, spin: true };
  return { ps, ball, los: null, fd: null, user: -1, target: null, live: false, dir, kicking: k };
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
  const ps = a.ps.map((p, k) => ({ ...p, x: lerp(p.x, b.ps[k].x, u), y: lerp(p.y, b.ps[k].y, u) }));
  const ball = { ...a.ball, x: lerp(a.ball.x, b.ball.x, u), y: lerp(a.ball.y, b.ball.y, u), z: lerp(a.ball.z, b.ball.z, u) };
  return { ...a, ps, ball, user: -1, target: null, replay: true };
}
export function replayDone() { return !F3.replay || F3.replay.t >= F3.replay.dur + 0.8; }

// ------------------------------------------------------------------ camera director
// The camera orbits a focus point F on the field: distance comes from the width of field to show at F,
// pitch is the elevation angle, yaw 0 sits behind the user's end zone (yaw pi behind the other end),
// and `ahead` aims past F so the action sits low in the frame with room to see downfield.
const cam = { fx: W / 2, fy: 40, width: 50, pitch: 0.5, yaw: 0, ahead: 6 };
const want = { fx: W / 2, fy: 40, width: 50, pitch: 0.5, yaw: 0, ahead: 6 };
let shake = 0;

function portrait() { return F3.h > F3.w * 1.15; }

function cameraWant(g, fr, S, now) {
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
    return { fx: W / 2, fy: fly ? lerp(spot.y + d * 6, fr.ball.y, 0.55) : spot.y + d * 4, width: por ? 22 : 30, pitch: fly ? 0.3 : 0.26, yaw: d > 0 ? 0 : Math.PI, ahead: por ? 10 : 12 };
  }
  if (fr.kicking !== undefined) { // kickoff / punt: high and wide, chasing the ball
    return { fx: lerp(ballX, W / 2, 0.5), fy: ballY - (fr.dir > 0 ? 6 : -6), width: por ? 40 : 60, pitch: 0.6, yaw: 0, ahead: 6 };
  }
  const dir = fr.dir || (g.poss === 0 ? 1 : -1);
  if (fr.td) {
    const c = fr.ps[fr.ball.held];
    const age = (now - (st.tdAt || now)) / 1000;
    return { fx: c.x, fy: c.y, width: por ? 20 : 26, pitch: 0.28, yaw: S.reduced ? 0 : Math.min(age, 2.4) * 0.5, ahead: 0 };
  }
  if (!fr.live || g.phase === 'pre') {
    const los = fr.los ?? ballY;
    return { fx: lerp(fr.ball.x, W / 2, por ? 0.75 : 0.75), fy: los + (dir > 0 ? 2 : -3), width: por ? 46 : 56, pitch: por ? 0.5 : 0.25, yaw: 0, ahead: por ? 14 : 16 };
  }
  // live: follow the ball with a little lead
  const c = fr.ball.held >= 0 ? fr.ps[fr.ball.held] : null;
  const vy = c ? c.vy : fr.ball.vy ? fr.ball.vy * 0.4 : 0;
  const fy = ballY + clamp(vy * 0.3, -5, 5) + (fr.ball.held < 0 && fr.target ? (fr.target[1] - ballY) * 0.35 : 0);
  const out = { fx: lerp(ballX, W / 2, por ? 0.2 : 0.45), fy, width: por ? 26 : 37, pitch: por ? 0.5 : 0.27, yaw: 0, ahead: por ? 15 : 14 };
  // the quarterback's view: wide enough to see every receiver; tighten on the ball once it's out
  if (fr.qbHold) Object.assign(out, { fx: lerp(ballX, W / 2, 0.75), fy: ballY + (dir > 0 ? 7 : -7), width: por ? 46 : 54, ahead: por ? 16 : 15 });
  else if (fr.ball.held < 0 && fr.target) Object.assign(out, { width: por ? 32 : 48 });
  if (g.phase === 'result' && lr) {
    out.width *= 0.85;
    if (lr.kind === 'td' && !S.reduced) { // touchdown: swing low around the scorer
      const age = (now - (st.deadAt || now)) / 1000;
      Object.assign(out, { yaw: Math.min(age, 2.4) * 0.5 * (dir > 0 ? 1 : -1), pitch: 0.26, width: por ? 20 : 28, ahead: 0 });
    }
  }
  return out;
}

function placeCamera() {
  const c = F3.camera;
  const por = portrait();
  const fov = por ? 50 : 40;
  if (c.fov !== fov) { c.fov = fov; c.updateProjectionMatrix(); }
  const hh = Math.atan(Math.tan((c.fov * Math.PI) / 360) * c.aspect);
  const d = cam.width / 2 / Math.tan(hh);
  const X = wx(cam.fx), Z = wz(cam.fy);
  const sx = shake > 0 ? (Math.random() - 0.5) * shake : 0, sy = shake > 0 ? (Math.random() - 0.5) * shake : 0;
  const fwdX = -Math.sin(cam.yaw), fwdZ = -Math.cos(cam.yaw);
  c.position.set(X - fwdX * Math.cos(cam.pitch) * d + sx, Math.sin(cam.pitch) * d + sy + 1, Z - fwdZ * Math.cos(cam.pitch) * d);
  c.lookAt(X + fwdX * cam.ahead, 1.0, Z + fwdZ * cam.ahead);
}

// Advance the camera toward its target; returns true while it is still moving.
export function stepCamera3d(g, S, dt, now) {
  if (!F3.on || !g) return false;
  const fr = F3.lastFrame || frameFor(g, S, now);
  Object.assign(want, cameraWant(g, fr, S, now));
  const inst = F3.instant || S.reduced;
  const k = inst ? 1 : clamp(dt * 3.2, 0, 1), kw = inst ? 1 : clamp(dt * 2.2, 0, 1);
  let dyaw = want.yaw - cam.yaw; while (dyaw > Math.PI) dyaw -= Math.PI * 2; while (dyaw < -Math.PI) dyaw += Math.PI * 2;
  const far = Math.abs(dyaw) > 2;
  cam.fx = lerp(cam.fx, want.fx, far ? 1 : k); cam.fy = lerp(cam.fy, want.fy, far ? 1 : k);
  cam.width = lerp(cam.width, want.width, far ? 1 : kw); cam.pitch = lerp(cam.pitch, want.pitch, far ? 1 : kw); cam.yaw += dyaw * (far ? 1 : kw);
  cam.ahead = lerp(cam.ahead, want.ahead, far ? 1 : kw);
  if (shake > 0) shake = Math.max(0, shake - dt * 3);
  return Math.abs(cam.fx - want.fx) > 0.05 || Math.abs(cam.fy - want.fy) > 0.05 || Math.abs(cam.width - want.width) > 0.08 || Math.abs(cam.pitch - want.pitch) > 0.003 || Math.abs(dyaw) > 0.003 || Math.abs(cam.ahead - want.ahead) > 0.05 || shake > 0;
}
export function cameraSettled3d(g, S) {
  if (!F3.on || !g) return true;
  const w = cameraWant(g, F3.lastFrame || frameFor(g, S, performance.now()), S, performance.now());
  return Math.abs(cam.fx - w.fx) < 0.06 && Math.abs(cam.fy - w.fy) < 0.06 && Math.abs(cam.width - w.width) < 0.1 && Math.abs(cam.pitch - w.pitch) < 0.004 && Math.abs(cam.ahead - w.ahead) < 0.06 && shake <= 0;
}
export function shake3d(a) { shake = Math.max(shake, a); }

// ------------------------------------------------------------------ projection for the 2D overlay
const v3 = new THREE.Vector3();
export function project3d(fx, fy, h = 0) {
  v3.set(wx(fx), h, wz(fy)).project(F3.camera);
  return [(v3.x * 0.5 + 0.5) * F3.w, (-v3.y * 0.5 + 0.5) * F3.h, v3.z];
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
      const a = Math.random() * Math.PI * 2, s = sp * (0.4 + Math.random() * 0.8);
      F3.pdata.push({ x: X, y: 0.3, z: Z, vx: Math.cos(a) * s, vy: up * (0.5 + Math.random()), vz: Math.sin(a) * s, life, max: life, c: new THREE.Color(cols[i % cols.length]).convertSRGBToLinear(), g: size });
    }
  };
  if (kind === 'hit') { add(36, 3.5, 3.2, 0.7, ['#2E6B3A', '#3B7D44', '#1A1A1A', '#556B2F'], 1); shake = Math.max(shake, 0.35); }
  if (kind === 'td') {
    add(180, 6, 9, 2.2, [c1, c2, '#FFFFFF', '#D4AF37'], 0.4); crowdUniforms.hype.value = 1;
    st.tdAt = performance.now();
    if (!F3.dayTheme) for (let b = 0; b < 3; b++) { // fireworks above the scoreboard end
      const bx = (b - 1) * 18, by = 34 + b * 5, bz = -70 - b * 6;
      for (let i = 0; i < 60; i++) {
        const a = Math.random() * Math.PI * 2, e = Math.random() * Math.PI - Math.PI / 2, sp = 7 + Math.random() * 3;
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
function sceneKey(g, S) {
  return `${g.teams[0].id}:${g.teams[1].id}:${g.home}:${g.neutral ? 1 : 0}:${S.settings.theme}:${weatherOf(g, S)}:${F3.quality}`;
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
    if (m.material) { const mats = Array.isArray(m.material) ? m.material : [m.material]; for (const mt of mats) { if (mt.map) mt.map.dispose(); mt.dispose(); } }
  });
}

function ensureStadium(g, S) {
  const key = sceneKey(g, S);
  if (key === F3.stadiumKey) return;
  if (F3.stadium) { F3.scene.remove(F3.stadium); disposeTree(F3.stadium); }
  if (F3.sideline) for (const m of F3.sideline) { F3.scene.remove(m); m.material.dispose(); }
  const theme = S.settings.theme === 'day' ? 'day' : 'night', weather = weatherOf(g, S);
  const big = F3.quality >= 2 && !portrait() && F3.renderer.capabilities.maxTextureSize >= 8192;
  F3.stadium = buildStadium(g, { theme, weather, big, quality: F3.quality });
  F3.sbKey = ''; // the new scoreboard texture must be drawn
  F3.scene.add(F3.stadium);
  F3.stadiumKey = key;
  // sideline teams on their team areas
  const hs = F3.stadium.userData.homeSide, home = g.home ?? 0;
  F3.sideline = [sidelineMesh(teamDef(g.teams[home].id), true, hs, 16), sidelineMesh(teamDef(g.teams[1 - home].id), false, -hs, 14)];
  for (const m of F3.sideline) F3.scene.add(m);
  // uniforms
  F3.uni = [0, 1].map((side) => uniformFor(teamDef(g.teams[side].id), side === home && !g.neutralAway, contrast, onColor));
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
  F3.instant = true;
}

function updateScoreboard(g) {
  const sb = F3.stadium.userData.scoreboard;
  const home = g.home ?? 0;
  const m = Math.floor(g.clock / 60), s = Math.floor(g.clock % 60);
  const state = { homeName: teamDef(g.teams[home].id).abbr, awayName: teamDef(g.teams[1 - home].id).abbr, home: g.score[home], away: g.score[1 - home],
    clock: `${m}:${String(s).padStart(2, '0')}`, qtr: g.quarter > 4 ? 'OT' : g.quarter, down: g.down, toGo: g.toGo, ballOn: g.ballOn > 50 ? 100 - g.ballOn : g.ballOn, poss: g.poss === home ? 0 : 1 };
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
  resize3d();
  ensureStadium(g, S);
  updateScoreboard(g);
  const fr = frameFor(g, S, now);
  F3.lastFrame = fr;
  const inst = F3.instant || S.reduced;
  if (F3.instant || S.reduced) stepCamera3d(g, S, dt, now);
  adaptQuality(S, now, dt);
  // players
  let animating = false;
  for (let i = 0; i < 22; i++) {
    const r = F3.rigs[i], p = fr.ps[i];
    if (!p) { r.group.visible = false; continue; }
    r.group.visible = true;
    const u = F3.uni[p.team];
    const lk = `${F3.stadiumKey}:${p.team}:${p.num}`;
    if (r.paint !== lk) { r.setLook({ ...u.colors, skin: SKIN_TONES[(p.num * 7 + p.team * 3) % SKIN_TONES.length] }, p.num, u.numFill, u.numOutline, lk); r.mat.userData.u.rim.value = lum(u.colors.jersey) < 0.05 ? 0.6 : 0.4; }
    const prevF = r.fall, prevYaw = r.yaw;
    r.pose({ x: wx(p.x), z: wz(p.y), vx: p.vx, vz: -p.vy, face: p.face === null || p.face === undefined ? null : p.face, stance: p.stance, eng: p.eng, carry: p.carry,
      throwing: p.throwing ?? -1, reach: p.reach || 0, down: p.down, dive: p.dive, celebrate: p.celebrate, idle: p.idle, kick: p.kick ?? -1 }, dt, inst);
    if (Math.abs(r.fall - prevF) > 0.002 || Math.abs(r.yaw - prevYaw) > 0.002) animating = true;
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
  // ball
  const B = F3.ball;
  if (fr.ball.held >= 0 && F3.rigs[fr.ball.held]) {
    const r = F3.rigs[fr.ball.held];
    r.chestPos(tmpV); r.group.getWorldDirection(tmpV2);
    B.position.copy(tmpV).addScaledVector(tmpV2, 0.32);
    B.position.x += Math.cos(r.yaw) * -0.22; B.position.z += Math.sin(r.yaw) * 0.22;
    B.rotation.set(0, r.yaw, 0); B.rotateX(-0.6); B.scale.setScalar(1.35);
  } else {
    B.position.set(wx(fr.ball.x), Math.max(0.12, fr.ball.z * 0.9 + 0.12), wz(fr.ball.y));
    B.scale.setScalar(fr.ball.z > 0.6 ? 1.9 : 1.35);
    if (fr.ball.vx !== undefined || fr.ball.spin) {
      const vx = fr.ball.vx || 0, vy = fr.ball.vy || (fr.dir || 1) * 10;
      B.rotation.set(0, Math.atan2(vx, -vy), 0); B.rotateX(-0.25); B.rotateZ(now * 0.03);
    } else B.rotation.set(0, Math.PI / 2, 0);
  }
  // a short trail behind a ball in the air
  if (!F3.trail) {
    const tg = new THREE.BufferGeometry(); tg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(16 * 3), 3).setUsage(THREE.DynamicDrawUsage));
    F3.trail = new THREE.LineSegments(tg, new THREE.LineBasicMaterial({ color: 0xfff6e0, transparent: true, opacity: 0.55, depthWrite: false })); F3.trail.frustumCulled = false; F3.scene.add(F3.trail); F3.trailPts = [];
  }
  if (fr.ball.held < 0 && fr.ball.z > 0.6) { F3.trailPts.push(B.position.clone()); if (F3.trailPts.length > 9) F3.trailPts.shift(); } else F3.trailPts.length = 0;
  { const a = F3.trail.geometry.attributes.position.array; let n = 0; for (let i = 1; i < F3.trailPts.length; i++) { a.set(F3.trailPts[i - 1].toArray(), n * 3); a.set(F3.trailPts[i].toArray(), n * 3 + 3); n += 2; } F3.trail.geometry.setDrawRange(0, n); F3.trail.geometry.attributes.position.needsUpdate = true; }
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
  if (fr.user >= 0) { const r = F3.rigs[fr.user]; F3.ring.position.set(r.group.position.x, 0.04, r.group.position.z); F3.ring.rotation.y = now * 0.002; }
  F3.target.visible = !!fr.target;
  if (fr.target) F3.target.position.set(wx(fr.target[0]), 0.045, wz(fr.target[1]));
  // crowd + particles + rain
  crowdUniforms.time.value = now / 1000;
  crowdUniforms.hype.value = Math.max(0, crowdUniforms.hype.value - dt * 0.35);
  if (stepParticles(dt)) animating = true;
  if (crowdUniforms.hype.value > 0.01) animating = true;
  if (F3.rain.visible) stepRain(dt);
  // camera (the main loop also steps it; when instant, already placed)
  placeCamera();
  F3.instant = false;
  F3.renderer.render(F3.scene, F3.camera);
  if (fr.replay) animating = true;
  F3.animating = animating;
  // adaptive quality: drop resolution if frames are slow on real hardware
  const ms = performance.now() - t0;
  F3.frameMs.push(ms); if (F3.frameMs.length > 90) F3.frameMs.shift();
  return animating;
}

// Quality: 2 full (cones, dome, 2x pixels), 1 (1.5x pixels, no haze cones, lighter crowd), 0 (1x pixels, no haze,
// half crowd). 'auto' starts high and steps down when frames stay slow; 'high' / 'low' pin it.
const qa = { slow: 0, last: 0 };
function adaptQuality(S, now, dt) {
  const want = S.settings.quality || 'auto';
  const fixed = want === 'high' ? 2 : want === 'low' ? 0 : null;
  if (fixed !== null) { if (F3.quality !== fixed) { F3.quality = fixed; F3.stadiumKey = ''; } return; }
  if (F3.pinned !== 'auto') { F3.pinned = 'auto'; }
  // only judge continuous animation (not the first frame after an idle gap)
  if (dt > 0.2 || dt <= 0) return;
  qa.slow = dt > 1 / 36 ? qa.slow + dt : Math.max(0, qa.slow - dt * 0.5);
  if (qa.slow > 2.5 && F3.quality > 0 && now - qa.last > 4000) {
    F3.quality--; F3.stadiumKey = ''; qa.slow = 0; qa.last = now;
  }
}

function stepRain(dt) {
  const arr = F3.rain.geometry.attributes.position.array, c = F3.camera.position;
  const t = performance.now() / 1000;
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
export function info3d() {
  const sorted = [...F3.frameMs].sort((a, b) => a - b), fm = sorted.length ? sorted[sorted.length >> 1] : 0; // median
  return { on: F3.on, renderer: F3.renderer3dInfo, software: !!F3.software, quality: F3.quality, venue: F3.stadium ? F3.stadium.userData.venue.key : null, weather: F3.weather || null,
    animating: !!F3.animating, artLoading: !!F3.artLoading, hype: Math.round(crowdUniforms.hype.value * 100) / 100, parts: F3.pdata ? F3.pdata.length : 0,
    calls: F3.renderer ? F3.renderer.info.render.calls : 0, tris: F3.renderer ? F3.renderer.info.render.triangles : 0, cpuMs: Math.round(fm * 100) / 100, replay: !!F3.replay, err: F3.err,
    cam: { fx: Math.round(cam.fx * 10) / 10, fy: Math.round(cam.fy * 10) / 10, width: Math.round(cam.width * 10) / 10, yaw: Math.round(cam.yaw * 100) / 100 } };
}
