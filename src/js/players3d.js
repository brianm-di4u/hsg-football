// Animated 3D players and officials. Each is a rigidly skinned Blender mesh; poses are procedural, driven by the
// live sim: run cycles scale with speed, linemen sink into stances and lean into blocks, the QB winds up and
// throws, receivers reach for the ball, carriers tuck it, tackled players fall, scorers celebrate.
import { THREE } from './three-lib.js';
import { modelGeometry, makeSkeleton, paletteMaterial, setPalette, numberTexture, kitMaterial, applyKit } from './models.js';

const lerp = (a, b, t) => a + (b - a) * t;
const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
function angLerp(a, b, t) { let d = b - a; while (d > Math.PI) d -= Math.PI * 2; while (d < -Math.PI) d += Math.PI * 2; return a + d * t; }

export const SCALE = 1.0936 * 1.22; // metres -> yards, plus exaggeration so players read on phones (as arcade football does)

let rigCount = 0; // gait phases are seeded by creation order, so frames are repeatable shot to shot

// leg lengths in yards for the gait and the foot IK (Blender rest pose: hip 0.95 m, knee 0.52 m, sole 0)
const LT = 0.43 * SCALE, LS = 0.52 * SCALE, LEG = 0.95 * SCALE;
export const KNUCKLE = 0.34 * SCALE; // elbow to the knuckles of a flat hand (Blender rest pose: elbow 1.17 m, knuckles 0.83 m)
const _s = new THREE.Vector3(), _ax = new THREE.Vector3(), _u = new THREE.Vector3(), _v = new THREE.Vector3(), _c = new THREE.Vector3();

// Keyed clips: [time (s), pose] keys, eased between. Bone targets are Euler x/z radians as in pose().
// THROW starts at the release tick the sim reports (the ball leaves at t = 0): cocked, through, follow-through.
const THROW = [
  [0.0, { arR: 2.5, azR: -1.1, elR: -1.7, arL: -1.4, azL: 0.25, elL: -0.3, lean: 0.12, twist: 0.55, thL: -0.45, thR: 0.2, shL: 0.25, shR: 0.45 }],
  [0.1, { arR: -1.0, azR: -0.4, elR: -0.15, arL: -0.2, azL: 0.5, elL: -1.2, lean: 0.5, twist: -0.4, thL: -0.35, thR: 0.35, shL: 0.2, shR: 0.6 }],
  [0.3, { arR: -0.4, azR: 0.35, elR: -0.5, arL: 0.4, azL: 0.4, elL: -1.4, lean: 0.6, twist: -0.55, thL: -0.25, thR: 0.55, shL: 0.3, shR: 0.9 }],
  [0.6, { arR: -0.3, azR: 0.25, elR: -0.7, arL: 0.2, azL: 0.3, elL: -1.2, lean: 0.4, twist: -0.3, thL: -0.2, thR: 0.4, shL: 0.3, shR: 0.7 }],
];
function sampleClip(keys, t) {
  let i = 0; while (i < keys.length - 2 && keys[i + 1][0] <= t) i++;
  const [t0, a] = keys[i], [t1, b] = keys[Math.min(i + 1, keys.length - 1)];
  let u = t1 > t0 ? clamp01((t - t0) / (t1 - t0)) : 1; u = u * u * (3 - 2 * u);
  const out = {}; for (const k in a) out[k] = lerp(a[k], b[k], u);
  return out;
}

export class Rig {
  constructor(kind = 'player') {
    this.kind = kind;
    const { root, bones, skeleton } = makeSkeleton(SCALE);
    this.bones = bones;
    this.mat = paletteMaterial({ rim: kind === 'player' ? 0.45 : 0.25 });
    this.mesh = new THREE.SkinnedMesh(modelGeometry(kind, SCALE), this.mat);
    this.mesh.add(root);
    this.mesh.bind(skeleton);
    this.mesh.frustumCulled = false;
    this.group = new THREE.Group();
    this.group.add(this.mesh);
    // animation state
    this.yaw = 0; this.seed = ((rigCount * 0.618034) % 1); this.phase = (rigCount++ * 2.3999) % 6; this.bank = 0; this.lastYaw = 0; this.fall = 0; this.throwT = -1; this.reach = 0; this.celeb = 0; this.spd = 0;
    this.x = 0; this.z = 0; this.tilt = 0; this.key = '';
    this.paint = '';
  }
  setLook(colors, num, numFill, numOutline, key = null) {
    key = key || `${JSON.stringify(colors)}:${num}:${numFill}:${numOutline}`;
    if (key === this.paint) return;
    this.paint = key;
    setPalette(this.mat, colors);
    if (num !== undefined && num !== null) { this.mat.userData.u.numTex.value = numberTexture(num, numFill, numOutline); this.mat.userData.u.numOn.value = 1; }
    else this.mat.userData.u.numOn.value = 0;
  }
  // Medium/High: the baseline player's kit material (field3d.js applyTier turns it on when the players pack is ready).
  useKit(regions) {
    if (!this.kitMat) this.kitMat = kitMaterial(regions, { rim: this.mat.userData.u.rim.value });
    this.mesh.material = this.kitMat;
  }
  setKit(look, num, skin, key) {
    if (!this.kitMat || key === this.kitPaint) return;
    this.kitPaint = key;
    applyKit(this.kitMat, look, num, skin);
  }
  // s: { x, z (world), vx, vz (yd/s), face (yaw or null), stance (null | 'ol' | 'two' | 'qb' | 'db' | 'k'), eng, carry, throwing,
  //      reach, down, dive, celebrate, idle, kick, snap(t) }
  pose(s, dt, instant) {
    const B = this.bones;
    const sp = Math.hypot(s.vx, s.vz);
    this.spd = instant ? sp : lerp(this.spd, sp, clamp01(dt * 10));
    // facing
    let targetYaw = this.yaw;
    if (s.face !== null && s.face !== undefined) targetYaw = s.face;
    else if (sp > 0.6) targetYaw = Math.atan2(s.vx, s.vz);
    this.yaw = instant ? targetYaw : angLerp(this.yaw, targetYaw, clamp01(dt * 9));
    if (Math.abs(angLerp(this.yaw, targetYaw, 1) - this.yaw) < 0.004) this.yaw = targetYaw;
    const moveYaw = sp > 0.3 ? Math.atan2(s.vx, s.vz) : this.yaw;
    let back = Math.cos(moveYaw - this.yaw) < -0.2 ? -1 : 1; // backpedal
    // gait: the stride phase advances with the distance actually covered, one step per stride length matched to the
    // leg swing, so planted feet don't skate (and a replay of the same positions strides the same way)
    const run = clamp01(this.spd / 7.5);
    const A = 0.25 + run * 0.75;
    const moved = Math.hypot(s.x - this.x, s.z - this.z);
    const stepLen = Math.max(0.35, 2 * LEG * Math.sin(A) * 0.82);
    if (sp > 0.25 && moved < 3 && !instant) this.phase += (moved / stepLen) * Math.PI * back;
    else if (sp <= 0.25) this.phase += dt * 3.2;
    this.x = s.x; this.z = s.z;
    const ph = this.phase;
    const sinp = Math.sin(ph), cosp = Math.cos(ph);
    // targets
    let lean = 0.08 + run * 0.32, crouch = 0, bob = Math.abs(sinp) * 0.07 * run;
    let thL = -A * sinp * (sp > 0.25 ? 1 : 0), thR = A * sinp * (sp > 0.25 ? 1 : 0);
    let shL = 0.25 + Math.max(0, -cosp) * 1.3 * run, shR = 0.25 + Math.max(0, cosp) * 1.3 * run;
    let arL = A * 0.9 * sinp * (sp > 0.25 ? 1 : 0), arR = -A * 0.9 * sinp * (sp > 0.25 ? 1 : 0), azL = 0.12, azR = -0.12;
    let elL = -0.4 - run * 1.1, elR = -0.4 - run * 1.1;
    let headX = -lean * 0.6;
    if (sp < 0.25 && !s.stance) { // standing: weight shift, hands toward hips
      thL = 0.05; thR = -0.05; shL = 0.1; shR = 0.1; arL = 0.1; arR = 0.1; azL = 0.35; azR = -0.35; elL = -1.25; elR = -1.25; lean = 0.06;
      if (s.idle === 'hands') { arL = -0.35; arR = -0.35; elL = -0.35; elR = -0.35; azL = 0.15; azR = -0.15; }
      if (s.idle === 'hips') { lean = 0.22; headX = 0.25; }
    }
    let plant = null; // hands set on the turf (or the ball), solved once the body is placed: [[side, palm height], ...]
    if (s.stance) {
      const st = s.stance, line = st === 'ol' || st === 'c' || st === 'dl' || st === 'dl4';
      // linemen sit hips near knee height with a flat back, low enough for a hand on the turf
      crouch = line ? 1.45 : st === 'qb' ? 0.55 : st === 'k' ? 0.15 : 0.7;
      lean = st === 'dl4' ? 1.45 : line ? 1.4 : st === 'qb' ? 0.45 : st === 'k' ? 0.25 : 0.55;
      thL = -0.95 * Math.min(1, crouch); thR = -0.75 * Math.min(1, crouch); shL = 1.35 * Math.min(1, crouch); shR = 1.05 * Math.min(1, crouch);
      if (st === 'two' || st === 'db') { thL = -0.75 * crouch; thR = -0.45 * crouch; shL = 1.0 * crouch; shR = 1.25 * crouch; }
      arL = -0.55; arR = -0.55; azL = 0.25; azR = -0.25; elL = -0.7; elR = -0.7;
      if (line) {
        // three-point (the center's hand on the ball, ends mirrored) or four-point: the down hand reaches for the
        // turf, the other forearm rests across the thigh
        const down = st === 'dl4' ? 'LR' : st === 'dl' ? 'L' : 'R', hy = st === 'c' ? s.plantY ?? 0.3 : 0.03;
        plant = [...down].map((sd) => [sd, hy]);
        const free = (sd) => !down.includes(sd);
        arL = free('L') ? -lean + 0.3 : -lean - 0.3; elL = free('L') ? -1.25 : -0.12; azL = free('L') ? 0.3 : 0.12;
        arR = free('R') ? -lean + 0.3 : -lean - 0.3; elR = free('R') ? -1.25 : -0.12; azR = free('R') ? -0.3 : -0.12;
        if (st === 'dl') { thL = -0.75; thR = -0.95; shL = 1.05; shR = 1.35; } // mirrored stagger
      }
      if (st === 'qb') { arL = -0.85; arR = -0.85; elL = -0.6; elR = -0.6; azL = 0.05; azR = -0.05; }
      headX = -lean * (line ? 0.92 : 0.85); // eyes up to the defense
      bob = 0;
    }
    if (s.eng) { // engaged block: lean in, arms locked out, short choppy steps
      lean = 0.62; crouch = Math.max(crouch, 0.45);
      thL = -0.55 - 0.18 * sinp; thR = -0.55 + 0.18 * sinp; shL = 0.8; shR = 0.8;
      arL = -1.35; arR = -1.35; azL = 0.18; azR = -0.18; elL = -0.25; elR = -0.25; headX = -0.4;
    }
    if (s.carry) { arR = -0.25; azR = -0.15; elR = -1.9; }
    if (s.qbSet) { arR = -0.85; azR = -0.2; elR = -1.7; arL = -0.95; azL = 0.3; elL = -1.5; } // ball high in both hands, reading the field
    if (s.reach > 0) { // reaching for a catch: hands up and out in front
      const r = s.reach;
      arL = lerp(arL, -2.5, r); arR = lerp(arR, -2.5, r); elL = lerp(elL, -0.25, r); elR = lerp(elR, -0.25, r); azL = lerp(azL, 0.12, r); azR = lerp(azR, -0.12, r);
    }
    let twist = null; // keyed clips may drive the shoulder-hip twist
    if (s.throwing >= 0) { // keyed throw: set, load (shoulders closed, ball back), release over the top, follow-through
      const p = sampleClip(THROW, s.throwing);
      arR = p.arR; azR = p.azR; elR = p.elR; arL = p.arL; azL = p.azL; elL = p.elL; lean = p.lean; twist = p.twist; thL = p.thL; thR = p.thR; shL = p.shL; shR = p.shR; headX = -0.15;
    }
    if (s.kick >= 0) { // kicker: plant and swing the right leg through
      const t = clamp01(s.kick / 0.45);
      thR = t < 0.5 ? lerp(0, 0.9, t * 2) : lerp(0.9, -1.7, (t - 0.5) * 2); shR = t < 0.5 ? 1.4 : lerp(1.4, 0.05, (t - 0.5) * 2);
      thL = -0.15; shL = 0.3; arL = -0.6; azL = 1.0; arR = 0.4; azR = -0.8; lean = 0.15;
    }
    if (s.celebrate) { // four celebrations, picked per player: arms-up hops, fist pump, point to the sky, chest-out strut
      const h = Math.abs(Math.sin(ph * 1.4)), kind = Math.floor(this.seed * 4);
      bob = h * 0.3; lean = -0.05; thL = -0.3 * h; thR = -0.2 * h; shL = 0.6 * h; shR = 0.5 * h;
      if (kind === 0) { arL = -2.9; arR = -2.9; azL = 0.45; azR = -0.45; elL = -0.2; elR = -0.2; }
      else if (kind === 1) { arR = -2.6 + 0.4 * h; azR = -0.2; elR = -1.6; arL = -0.4; azL = 0.5; elL = -1.2; }
      else if (kind === 2) { arR = -3.0; azR = -0.15; elR = 0; arL = -0.2; azL = 0.25; elL = -0.6; headX = 0.35; bob = h * 0.12; }
      else { arL = 0.5; arR = 0.5; azL = 0.9; azR = -0.9; elL = -0.8; elR = -0.8; lean = -0.22; headX = 0.2; bob = h * 0.18; }
    }
    // falling (tackled / diving): the knees buckle first, then the body pitches forward around the feet and rolls a
    // little to a side that differs per player; arms brace (or reach, diving) and the head comes up
    const fallT = s.down ? 1 : 0;
    if (s.down && s.fallAge !== undefined) {
      // timed from the hit (loop 11): a beat of stagger, then the drop over about half a second, eased into the turf
      const x = clamp01((s.fallAge - 0.08) / 0.55);
      this.fall = 1 - (1 - x) * (1 - x);
    } else {
      this.fall = instant ? fallT : lerp(this.fall, fallT, clamp01(dt * (s.down ? 5 : 2.2)));
      if (Math.abs(this.fall - fallT) < 0.01) this.fall = fallT; // land exactly, so a settled frame is the same every time
    }
    const f = this.fall;
    if (f > 0.01) {
      const dv = s.dive ? 1 : 0, buckle = Math.sin(Math.min(1, f * 1.6) * Math.PI) * (1 - f * 0.6);
      // the tackler wraps (arms forward and closing around the carrier); the carrier braces
      arL = lerp(arL, dv ? -1.55 : -2.1, f); arR = lerp(arR, dv ? -1.55 : -1.5, f); elL = lerp(elL, dv ? -1.25 : -0.5, f); elR = lerp(elR, dv ? -1.25 : -0.7, f);
      azL = lerp(azL, dv ? -0.35 : 0.45, f); azR = lerp(azR, dv ? 0.35 : -0.45, f);
      thL = lerp(thL, 0.15, f) - buckle * 0.7; thR = lerp(thR, -0.25, f) - buckle * 0.5; shL = lerp(shL, 0.4, f) + buckle * 1.1; shR = lerp(shR, 1.1, f) + buckle * 0.6;
      crouch = Math.max(crouch, buckle * 0.6); headX = lerp(headX, 0.55, f); lean = lerp(lean, 0.2, f);
    }
    // the hit (loop 11): the ball carrier recoils for a beat, torso snapping back and arms flaring, before he goes down
    if (s.down && s.carry && s.fallAge !== undefined && s.fallAge < 0.32) {
      const h = Math.sin(Math.PI * clamp01(s.fallAge / 0.32));
      lean -= 0.45 * h; headX += 0.35 * h; arL -= 0.6 * h; azL += 0.35 * h;
    }
    // apply
    const k = instant ? 1 : clamp01(dt * 16);
    const set = (b, ax, v) => { b.rotation[ax] = lerp(b.rotation[ax], v, k); };
    const tilt = (s.stance || s.eng) && !(s.kick >= 0) ? lean * 0.2 : 0;
    set(B.thighL, 'x', thL - tilt); set(B.thighR, 'x', thR - tilt); set(B.shinL, 'x', shL); set(B.shinR, 'x', shR);
    set(B.armL, 'x', arL); set(B.armR, 'x', arR); set(B.armL, 'z', azL); set(B.armR, 'z', azR);
    set(B.foreL, 'x', elL); set(B.foreR, 'x', elR);
    // stances and blocks: the pelvis tips forward with the torso (anterior tilt) and the thighs give the angle back, so the
    // seat faces up and back instead of squarely at the camera (loop 8)
    set(B.pelvis, 'x', tilt);
    set(B.spine, 'x', lean - tilt); set(B.head, 'x', headX);
    // running: shoulders counter-rotate against the hips with each stride, the head stays level
    if (twist === null) twist = (s.stance || s.eng || f > 0.3) ? 0 : 0.2 * run * sinp;
    set(B.spine, 'y', twist); set(B.pelvis, 'y', -twist * 0.6); set(B.head, 'y', -twist * 0.7);
    const pelvisY = B.pelvis.userData.rest.y - crouch * 0.32 * SCALE + bob;
    B.pelvis.position.y = lerp(B.pelvis.position.y, pelvisY, k);
    // feet on the turf: two-bone IK for the supporting leg(s), keeping each foot's forward offset from the swing but
    // putting the sole on the ground when it would sink or hover just above it (not while falling, kicking or hopping)
    if (f < 0.05 && !(s.kick >= 0) && !s.celebrate) {
      const hipY = B.pelvis.position.y + B.thighL.userData.rest.y, pt = B.pelvis.rotation.x; // thigh angles in the upright frame
      for (const [th, sh] of [[B.thighL, B.shinL], [B.thighR, B.shinR]]) {
        const a = th.rotation.x + pt, b = sh.rotation.x;
        const soleY = hipY - LT * Math.cos(a) - LS * Math.cos(a + b);
        if (soleY > 0.16) continue; // a swinging foot stays in the air
        const fwd = LT * Math.sin(a) + LS * Math.sin(a + b);
        const d = Math.min(LT + LS - 0.002, Math.hypot(hipY, fwd));
        const kb = Math.acos(Math.max(-1, Math.min(1, (d * d - LT * LT - LS * LS) / (2 * LT * LS))));
        th.rotation.x = Math.atan2(fwd, hipY) - Math.atan2(LS * Math.sin(kb), LT + LS * Math.cos(kb)) - pt;
        sh.rotation.x = kb;
      }
    }
    // cuts: bank into the turn in proportion to speed and turn rate
    let dy = this.yaw - this.lastYaw; while (dy > Math.PI) dy -= Math.PI * 2; while (dy < -Math.PI) dy += Math.PI * 2;
    this.lastYaw = this.yaw;
    const bankT = instant || dt <= 0 ? 0 : Math.max(-0.35, Math.min(0.35, (dy / dt) * run * 0.09));
    this.bank = instant ? bankT : lerp(this.bank, bankT, clamp01(dt * 6));
    // body: position, yaw, bank, fall pitch and roll (kept above the turf)
    const roll = (this.seed < 0.5 ? -1 : 1) * (0.25 + this.seed * 0.3) * f;
    this.group.position.set(s.x, 0, s.z);
    this.group.rotation.set(0, 0, 0);
    this.group.rotation.y = this.yaw;
    this.mesh.rotation.set(f * 1.42, 0, this.bank * (1 - f) + roll);
    this.mesh.position.y = f * 0.12;
    this.mesh.position.z = f * 0.15;
    if (plant && f < 0.05) for (const [sd, y] of plant) this.plantHand(sd, y);
  }
  // Swing an arm about the shoulder (the spine's side-to-side axis, which the arm's x rotation turns about) until the
  // knuckles are `y` above the turf, as far forward as the arm reaches; the elbow keeps its bend. World space, after
  // the body is placed.
  plantHand(side, y) {
    const arm = this.bones['arm' + side], fore = this.bones['fore' + side];
    this.group.updateWorldMatrix(true, true);
    const S = _s.setFromMatrixPosition(arm.matrixWorld);
    const ax = _ax.setFromMatrixColumn(arm.parent.matrixWorld, 0).normalize();
    const u = _u.set(0, -KNUCKLE, 0).applyMatrix4(fore.matrixWorld).sub(S);
    u.addScaledVector(ax, -ax.dot(u));
    const r = u.length(), h = Math.min(r, S.y - y);
    if (h <= 0) return;
    const v = _v.set(Math.sin(this.yaw), 0, Math.cos(this.yaw));
    v.addScaledVector(ax, -ax.dot(v)).normalize().multiplyScalar(Math.sqrt(r * r - h * h));
    v.y -= h;
    v.addScaledVector(ax, -ax.dot(v));
    arm.rotation.x += Math.atan2(ax.dot(_c.crossVectors(u, v)), u.dot(v));
  }
  // World position of the right hand / chest for attaching the ball.
  handPos(out, reach = 0.285 * SCALE) {
    this.bones.foreR.updateWorldMatrix(true, false);
    return out.set(0, -reach, 0).applyMatrix4(this.bones.foreR.matrixWorld); // palm (default), a forearm's length from the elbow
  }
  chestPos(out) {
    this.bones.spine.updateWorldMatrix(true, false);
    out.setFromMatrixPosition(this.bones.spine.matrixWorld);
    out.y += 0.25;
    return out;
  }
}

// Team uniform: home teams wear dark jerseys, visitors white with team-colored trim.
export function uniformFor(team, home, contrastFn, onColorFn) {
  const c = team.colors;
  const sec = c.secondary;
  const darkSec = contrastFn(sec, '#FFFFFF') > 3;
  if (home) {
    const num = contrastFn(sec, c.primary) >= 2.4 ? sec : onColorFn(c.primary);
    return {
      colors: { jersey: c.primary, trim: sec, pants: darkSec ? '#E9E4D8' : sec, helmet: c.primary, mask: darkSec || contrastFn(c.primary, '#000000') < 3.2 ? '#C9CDD2' : '#2A2C30', skin: '#8D5524', shoes: '#141414', socks: c.primary, glove: '#1E1E1E', number: c.primary },
      numFill: num, numOutline: num === '#FFFFFF' || num === '#F4EFE6' ? '#111111' : '#FFFFFF',
    };
  }
  const trim = contrastFn(c.primary, '#F4EFE6') >= 2 ? c.primary : sec;
  return {
    colors: { jersey: '#F4EFE6', trim, pants: darkSec ? trim : '#E9E4D8', helmet: c.primary, mask: '#D9DCE0', skin: '#8D5524', shoes: '#F4F4F4', socks: trim, glove: '#F4F4F4', number: '#F4EFE6' },
    numFill: trim, numOutline: '#F4EFE6',
  };
}

export const SKIN_TONES = ['#5C3A21', '#7B4B2A', '#8D5524', '#A0673D', '#C68642', '#E0AC69', '#F1C27D'];
