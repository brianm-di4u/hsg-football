// Animated 3D players and officials. Each is a rigidly skinned Blender mesh; poses are procedural, driven by the
// live sim: run cycles scale with speed, linemen sink into stances and lean into blocks, the QB winds up and
// throws, receivers reach for the ball, carriers tuck it, tackled players fall, scorers celebrate.
import { THREE } from './three-lib.js';
import { modelGeometry, makeSkeleton, paletteMaterial, setPalette, numberTexture } from './models.js';

const lerp = (a, b, t) => a + (b - a) * t;
const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
function angLerp(a, b, t) { let d = b - a; while (d > Math.PI) d -= Math.PI * 2; while (d < -Math.PI) d += Math.PI * 2; return a + d * t; }

export const SCALE = 1.0936 * 1.22; // metres -> yards, plus exaggeration so players read on phones (as arcade football does)

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
    this.yaw = 0; this.phase = Math.random() * 6; this.fall = 0; this.throwT = -1; this.reach = 0; this.celeb = 0; this.spd = 0;
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
    const moveYaw = sp > 0.3 ? Math.atan2(s.vx, s.vz) : this.yaw;
    let back = Math.cos(moveYaw - this.yaw) < -0.2 ? -1 : 1; // backpedal
    // gait
    const run = clamp01(this.spd / 7.5);
    this.phase += dt * (3.2 + this.spd * 1.25) * back;
    const ph = this.phase;
    const A = 0.25 + run * 0.75;
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
    if (s.stance) {
      const st = s.stance;
      crouch = st === 'ol' ? 1 : st === 'qb' ? 0.55 : st === 'k' ? 0.15 : 0.7;
      lean = st === 'ol' ? 1.05 : st === 'qb' ? 0.45 : st === 'k' ? 0.25 : 0.55;
      thL = -0.95 * crouch; thR = -0.75 * crouch; shL = 1.35 * crouch; shR = 1.05 * crouch;
      if (st === 'two' || st === 'db') { thL = -0.75 * crouch; thR = -0.45 * crouch; shL = 1.0 * crouch; shR = 1.25 * crouch; }
      arL = st === 'ol' ? -0.9 : -0.55; arR = st === 'ol' ? -1.45 : -0.55; azL = 0.25; azR = -0.25; elL = st === 'ol' ? -0.25 : -0.7; elR = st === 'ol' ? 0 : -0.7;
      if (st === 'qb') { arL = -0.85; arR = -0.85; elL = -0.6; elR = -0.6; azL = 0.05; azR = -0.05; }
      headX = -lean * 0.85;
      bob = 0;
    }
    if (s.eng) { // engaged block: lean in, arms locked out, short choppy steps
      lean = 0.62; crouch = Math.max(crouch, 0.45);
      thL = -0.55 - 0.18 * sinp; thR = -0.55 + 0.18 * sinp; shL = 0.8; shR = 0.8;
      arL = -1.35; arR = -1.35; azL = 0.18; azR = -0.18; elL = -0.25; elR = -0.25; headX = -0.4;
    }
    if (s.carry) { arR = -0.25; azR = -0.15; elR = -1.9; }
    if (s.reach > 0) { // reaching for a catch: hands up and out in front
      const r = s.reach;
      arL = lerp(arL, -2.5, r); arR = lerp(arR, -2.5, r); elL = lerp(elL, -0.25, r); elR = lerp(elR, -0.25, r); azL = lerp(azL, 0.12, r); azR = lerp(azR, -0.12, r);
    }
    if (s.throwing >= 0) { // throw: wind up then whip over the top (right arm)
      const t = s.throwing;
      if (t < 0.18) { const k = t / 0.18; arR = lerp(arR, 2.4, k); azR = lerp(azR, -0.9, k); elR = lerp(elR, -1.6, k); arL = lerp(arL, -1.2, k); }
      else { const k = clamp01((t - 0.18) / 0.22); arR = lerp(2.4, -1.4, k); azR = lerp(-0.9, -0.3, k); elR = lerp(-1.6, -0.2, k); arL = lerp(-1.2, 0.4, k); lean = lerp(lean, 0.45, k); }
    }
    if (s.kick >= 0) { // kicker: plant and swing the right leg through
      const t = clamp01(s.kick / 0.45);
      thR = t < 0.5 ? lerp(0, 0.9, t * 2) : lerp(0.9, -1.7, (t - 0.5) * 2); shR = t < 0.5 ? 1.4 : lerp(1.4, 0.05, (t - 0.5) * 2);
      thL = -0.15; shL = 0.3; arL = -0.6; azL = 1.0; arR = 0.4; azR = -0.8; lean = 0.15;
    }
    if (s.celebrate) { // arms up, little hops
      const h = Math.abs(Math.sin(ph * 1.4));
      arL = -2.9; arR = -2.9; azL = 0.45; azR = -0.45; elL = -0.2; elR = -0.2; bob = h * 0.35; lean = -0.05; thL = -0.3 * h; thR = -0.2 * h; shL = 0.6 * h; shR = 0.5 * h;
    }
    // falling (tackled / diving): rotate the whole body forward around the feet
    const fallT = s.down ? 1 : 0;
    this.fall = instant ? fallT : lerp(this.fall, fallT, clamp01(dt * (s.down ? 6 : 2.2)));
    const f = this.fall;
    if (f > 0.01) {
      const dv = s.dive ? 1 : 0;
      arL = lerp(arL, dv ? -2.9 : -1.6, f); arR = lerp(arR, dv ? -2.9 : -1.2, f); elL = lerp(elL, -0.2, f); elR = lerp(elR, -0.4, f);
      thL = lerp(thL, 0.25, f); thR = lerp(thR, -0.1, f); shL = lerp(shL, 0.5, f); shR = lerp(shR, 0.9, f);
    }
    // apply
    const k = instant ? 1 : clamp01(dt * 16);
    const set = (b, ax, v) => { b.rotation[ax] = lerp(b.rotation[ax], v, k); };
    set(B.thighL, 'x', thL); set(B.thighR, 'x', thR); set(B.shinL, 'x', shL); set(B.shinR, 'x', shR);
    set(B.armL, 'x', arL); set(B.armR, 'x', arR); set(B.armL, 'z', azL); set(B.armR, 'z', azR);
    set(B.foreL, 'x', elL); set(B.foreR, 'x', elR);
    set(B.spine, 'x', lean); set(B.head, 'x', headX);
    const pelvisY = B.pelvis.userData.rest.y - crouch * 0.32 * SCALE + bob;
    B.pelvis.position.y = lerp(B.pelvis.position.y, pelvisY, k);
    // body: position, yaw, fall pitch
    this.group.position.set(s.x, 0, s.z);
    this.group.rotation.set(0, 0, 0);
    this.group.rotation.y = this.yaw;
    this.mesh.rotation.x = f * 1.42;
    this.mesh.position.y = -f * 0.05;
    this.mesh.position.z = f * 0.15;
  }
  // World position of the right hand / chest for attaching the ball.
  handPos(out) {
    this.bones.foreR.updateWorldMatrix(true, false);
    return out.setFromMatrixPosition(this.bones.foreR.matrixWorld);
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
      colors: { jersey: c.primary, trim: sec, pants: darkSec ? '#E9E4D8' : sec, helmet: c.primary, mask: darkSec ? '#D9DCE0' : '#2A2C30', skin: '#8D5524', shoes: '#141414', socks: c.primary, glove: '#1E1E1E', number: c.primary },
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
