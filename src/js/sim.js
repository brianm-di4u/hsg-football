// One live play: 22 agents in offense-local yards (x: 0..W from the offense's left; y: yards past the line of
// scrimmage). Pure data in, pure data out (no DOM), so tools/balance.mjs can run it in Node.
import { clamp } from './rng.js';
import { FORMATIONS, OL_X, OL_Y, ROUTES, ZONES, OL, SLOTS, playById, defById } from './plays.js';
import { seekVel, predictPos, integrate, dist } from './steer.js';

export const W = 160 / 3;
export const TICK = 1 / 60;
export const HASH = [W / 3, (2 * W) / 3];
const MAX_T = 18;

const maxVof = (r) => 5.6 + r.spd * 0.033;
const accOf = (r) => 9 + r.agi * 0.06;
const clampX = (x) => clamp(x, 0.9, W - 0.9);
const BLOCK_ROLES = new Set(['passPro', 'runBlock', 'lead', 'pull']);

// o: offense starters (slot → player), d: defense starters. spot: { bx, ballOn, down, toGo }.
// opts: { userSide: 'O'|'D'|null, autoQB: bool, aiBoost: {O: n, D: n} }
export function createPlay(o, d, offId, defId, spot, opts = {}) {
  const pd = playById(offId), dd = defById(defId);
  const bx = spot.bx, toGoal = 100 - spot.ballOn;
  const F = FORMATIONS[pd.form || 'gun'];
  const A = [], idx = {};
  const capY = (y) => Math.min(y, toGoal + 9);
  const jr = opts.rng || null;
  const jit = (v) => (jr ? v * (jr.next() * 2 - 1) : 0);
  const boost = (side) => (opts.boost && opts.boost[side]) || 0;
  const add = (side, slot, p, x, y, role) => {
    const r = { ...p.r };
    const b = boost(side);
    if (b) for (const k in r) r[k] = clamp(r[k] + b, 25, 99);
    const a = { i: A.length, side, slot, pid: p.id, num: p.num, last: p.last, r, x: clampX(x), y, x0: clampX(x), y0: y, vx: 0, vy: 0,
      maxV: maxVof(r) * (1 + jit(0.03)), acc: accOf(r), role, route: null, wp: 0, settle: false, breakT: 0, assign: null, tgt: -1, eng: -1,
      beaten: 0, cd: 0, slow: 0, pursueAt: -1, ballAt: -1, jukeT: 0, jukeCD: 0, dvx: 0, dvy: 0, gx: 0, gy: 0, bite: false };
    if (side === 'D') { a.x += jit(0.6); a.y = Math.max(0.8, a.y + jit(0.6)); a.x0 = a.x; a.y0 = a.y; }
    idx[slot] = a.i;
    A.push(a);
    return a;
  };

  const run = pd.type === 'run';
  // Offense
  OL.forEach((s, k) => add('O', s, o[s], bx + OL_X[k], OL_Y, run ? 'runBlock' : 'passPro'));
  const qbRole = run ? (pd.carrier === 'QB' ? 'qbKeep' : 'qbHand') : 'qbPass';
  add('O', 'QB', o.QB, bx + F.QB[0], F.QB[1], qbRole);
  add('O', 'RB', o.RB, bx + F.RB[0], F.RB[1], 'route');
  for (const s of ['X', 'Z', 'SL', 'TE']) add('O', s, o[s], bx + F[s][0], F[s][1], 'route');
  if (pd.pull) A[idx[pd.pull]].role = 'pull';

  for (const s of SLOTS) {
    const a = A[idx[s]];
    let rn = pd.routes && pd.routes[s];
    if (s === 'RB') {
      if (run && pd.carrier === 'RB') { a.role = 'carrierPath'; continue; }
      if (pd.fake || (run && pd.carrier === 'QB')) { a.role = 'rbFake'; continue; }
    }
    if (!rn || rn === 'block') { a.role = run ? 'runBlock' : 'passPro'; continue; }
    const R = ROUTES[rn];
    const dx = a.x - bx, oo = dx === 0 ? 1 : Math.sign(dx);
    a.route = R.pts(oo).map(([px, py]) => [clampX(a.x + px), capY(a.y + py)]);
    a.settle = !!R.settle; a.breakT = R.breakT; a.rname = rn;
    a.role = R.blocker ? 'stalk' : 'route';
  }

  // Defense alignment
  const al = dd.align;
  const dlX = [-5.6, -1.7, 1.7, 5.6];
  ['DL1', 'DL2', 'DL3', 'DL4'].forEach((s, k) => add('D', s, d[s], bx + dlX[k], 1.0, 'rush'));
  ['LB1', 'LB2', 'LB3'].forEach((s, k) => add('D', s, d[s], bx + [-4.5, 0, 4.5][k], al.LB, dd.roles[s]));
  const X = A[idx.X], Z = A[idx.Z];
  add('D', 'CB1', d.CB1, X.x + 0.5, Math.min(al.CB, toGoal + 2), dd.roles.CB1);
  add('D', 'CB2', d.CB2, Z.x - 0.5, Math.min(al.CB, toGoal + 2), dd.roles.CB2);
  add('D', 'S1', d.S1, bx - 3, Math.min(al.S1, toGoal + 4), dd.roles.S1);
  add('D', 'S2', d.S2, bx + 7, Math.min(al.S2, toGoal + 3), dd.roles.S2);
  for (const a of A) {
    if (a.side !== 'D') continue;
    const [kind, arg] = a.role.split(':');
    a.role = kind; a.assign = arg || null;
    if (kind === 'man') { const m = A[idx[arg]]; a.x = a.x0 = clampX(m.x + (m.x < bx ? 0.6 : -0.6)); }
  }

  return {
    phase: 'pre', t: 0, offId, defId, bx, ballOn: spot.ballOn, toGoal, down: spot.down || 1, toGo: spot.toGo || 10,
    A, idx, carrier: idx.QB, handed: false, thrown: false, caught: false, scramble: false, runRec: -1,
    ball: { st: 'held', h: idx.C, x: bx, y: 0, z: 0, fx: 0, fy: 0, tx: 0, ty: 0, t: 0, T: 0, hgt: 0, to: -1, away: false },
    userSide: opts.userSide || null, autoQB: opts.autoQB !== false, result: null, ev: [], stats: { pressure: 0 },
  };
}

export function snap(P) {
  if (P.phase !== 'pre') return false;
  P.phase = 'live'; P.t = 0;
  P.ball.h = P.idx.QB; P.ball.st = 'held';
  P.ev.push({ k: 'hike' });
  return true;
}

const opp = (P, side) => P.A.filter((a) => a.side !== side);

function setPursuit(P, mult = 1, run = true) {
  for (const a of P.A) {
    if (a.side === P.A[P.carrier].side || a.pursueAt >= 0) continue;
    let r = clamp(0.5 - a.r.awr * 0.004, 0.12, 0.45) * mult;
    if (a.role === 'fit' || a.role === 'spy') r *= 0.5;
    else if (run && a.role === 'zone') r += (ZONES[a.assign] && ZONES[a.assign][1] >= 12) ? 0.4 : 0.15;
    else if (run && a.role === 'man') r += 0.2;
    if (a.bite) r += 0.25;
    a.pursueAt = P.t + r;
  }
}

function pressureOn(P, qb) {
  let best = 99;
  for (const a of P.A) if (a.side === 'D' && a.eng < 0) best = Math.min(best, dist(a, qb));
  return best;
}

// Where a receiver will be in T seconds if it keeps running its route.
export function predictRoute(r, T) {
  let x = r.x, y = r.y, left = T;
  const v = Math.max(Math.hypot(r.vx, r.vy), r.maxV * 0.75);
  if (r.route && r.role === 'route') {
    for (let k = r.wp; k < r.route.length && left > 0; k++) {
      const [wx, wy] = r.route[k], d = Math.hypot(wx - x, wy - y), step = v * left;
      if (step <= d) return [x + ((wx - x) / d) * step, y + ((wy - y) / d) * step];
      x = wx; y = wy; left -= d / v;
    }
    if (left <= 0 || r.settle) return [x, y];
    const n = r.route.length, a = n > 1 ? r.route[n - 2] : [r.x0, r.y0], b = r.route[n - 1];
    const dx = b[0] - a[0], dy = b[1] - a[1], m = Math.hypot(dx, dy) || 1;
    return [x + (dx / m) * v * 0.85 * left, y + (dy / m) * v * 0.85 * left];
  }
  return [x + r.vx * left, y + r.vy * left];
}

// Separation at the predicted catch point.
function openness(P, r, qb) {
  const spd = 17 + qb.r.thr * 0.08;
  let T = Math.hypot(r.x - qb.x, r.y - qb.y) / spd;
  let [px, py] = predictRoute(r, T);
  T = Math.hypot(px - qb.x, py - qb.y) / spd;
  [px, py] = predictRoute(r, T);
  let best = 99;
  for (const a of P.A) {
    if (a.side !== 'D' || a.eng >= 0) continue;
    best = Math.min(best, Math.hypot(a.x + a.vx * T * 0.6 - px, a.y + a.vy * T * 0.6 - py));
  }
  if (px < 0.5 || px > W - 0.5) best -= 1.5;
  if (P.down >= 3 && py >= P.toGo) best += 0.4;
  return best - Math.max(0, py - 12) * 0.06;
}

export function eligible(P) {
  return SLOTS.map((s) => P.A[P.idx[s]]).filter((a) => a.role === 'route' && a.route);
}

export function canThrow(P) {
  const qb = P.A[P.idx.QB];
  const pd = playById(P.offId);
  return P.phase === 'live' && pd.type === 'pass' && !P.thrown && P.carrier === qb.i && P.ball.st === 'held' &&
    qb.y <= 0.5 && !P.scramble && P.t >= (pd.fake ? 0.6 : 0.25);
}

export function throwTo(P, rng, slot) {
  if (!canThrow(P)) return false;
  const r = P.A[P.idx[slot]];
  if (!r || r.role !== 'route' || !r.route) return false;
  doThrow(P, rng, r);
  return true;
}

function doThrow(P, rng, r, away = false) {
  const qb = P.A[P.idx.QB], b = P.ball;
  const spd = 17 + qb.r.thr * 0.08;
  let px, py;
  if (away) { px = qb.x < W / 2 ? -2.5 : W + 2.5; py = qb.y + 9; }
  else {
    let T = Math.hypot(r.x - qb.x, r.y - qb.y) / spd;
    for (let k = 0; k < 3; k++) { [px, py] = predictRoute(r, T); T = Math.hypot(px - qb.x, py - qb.y) / spd; }
    px = clamp(px, 0.6, W - 0.6);
    py = Math.min(py, P.toGoal + 9.4);
    const pres = clamp((3 - pressureOn(P, qb)) / 3, 0, 1);
    const air = Math.hypot(px - qb.x, py - qb.y);
    const sd = 0.35 + (100 - qb.r.acc) / 70 + pres * 0.7 + air / 32;
    px += rng.normal(0, sd); py += rng.normal(0, sd * 0.8);
    P.stats.pressure = pres;
  }
  const d = Math.hypot(px - qb.x, py - qb.y);
  Object.assign(b, { st: 'air', fx: qb.x, fy: qb.y, tx: px, ty: py, t: 0, T: Math.max(0.25, d / spd), hgt: clamp(d * 0.11, 0.8, 6), to: away ? -1 : r.i, away });
  P.thrown = true; P.throwT = P.t; P.airYards = Math.round(py);
  P.ev.push({ k: 'throw', to: away ? null : r.slot });
  // Defenders near the landing point break on the ball.
  for (const a of P.A) {
    if (a.side !== 'D' || a.role === 'rush' || a.eng >= 0) continue;
    if (Math.hypot(a.x - px, a.y - py) < 9) a.ballAt = P.t + clamp(0.42 - a.r.awr * 0.003, 0.1, 0.35);
  }
}

function autoRead(P, rng, qb, pd) {
  const press = pressureOn(P, qb);
  P.pressT = press < 2.2 ? (P.pressT || 0) + TICK : 0;
  const hurried = P.pressT > 0.62 - qb.r.awr * 0.004;
  const readT = pd.readT * (1 + (70 - qb.r.awr) * 0.006);
  if (press < 1.05 && !rng.chance(qb.r.awr / 900)) return;
  if (P.t < readT && !(hurried && P.t > 0.45)) return;
  const order = (pd.read || []).map((s) => P.A[P.idx[s]]).filter((a) => a && a.role === 'route' && a.route);
  if (!order.length) return;
  const need = Math.max(1.4, 2.6 - (P.t - readT) * 0.8);
  for (const r of order) {
    if (P.t >= r.breakT && openness(P, r, qb) >= need) { doThrow(P, rng, r); return; }
  }
  if (hurried || P.t > pd.maxHold) {
    let best = null, bs = -99;
    for (const r of order) { const s = openness(P, r, qb) - (P.t >= r.breakT ? 0 : 0.8); if (s > bs) { bs = s; best = r; } }
    if (bs > 1.1) doThrow(P, rng, best);
    else if (P.t > pd.maxHold + 0.4 || rng.chance(0.03)) doThrow(P, rng, null, true);
  }
}

function followPath(a, speed) {
  const pts = a.route;
  while (a.wp < pts.length && Math.hypot(pts[a.wp][0] - a.x, pts[a.wp][1] - a.y) < 0.8) a.wp++;
  if (a.wp < pts.length) return seekVel(a, pts[a.wp][0], pts[a.wp][1], speed);
  return null;
}

function carrierAuto(P, c) {
  const f = c.side === 'O' ? 1 : -1;
  let sx = 0, sy = f;
  for (const a of P.A) {
    if (a.side === c.side || a.eng >= 0) continue;
    const dx = c.x - a.x, dy = c.y - a.y, d = Math.hypot(dx, dy);
    if (d > 7) continue;
    const ahead = -dy * f;
    if (ahead < -2) continue;
    const w = 1.2 / (d * d * 0.35 + 0.6);
    const side = Math.abs(dx) > 0.05 ? Math.sign(dx) : c.x < W / 2 ? 1 : -1;
    sx += side * w * (ahead > 0 ? 1.4 : 0.8);
    if (ahead > 0 && Math.abs(dx) < 1.5) sy -= f * w * 0.25;
  }
  if (c.x < 3) sx += (3 - c.x) * 0.5;
  if (c.x > W - 3) sx -= (c.x - (W - 3)) * 0.5;
  if (sy * f < 0.25) sy = 0.25 * f;
  const m = Math.hypot(sx, sy);
  sx /= m; sy /= m;
  c.sx = c.sx === undefined ? sx : c.sx * 0.75 + sx * 0.25;
  c.sy = c.sy === undefined ? sy : c.sy * 0.75 + sy * 0.25;
  const n = Math.hypot(c.sx, c.sy) || 1;
  return [(c.sx / n) * c.maxV, (c.sy / n) * c.maxV];
}

function nearestThreat(P, from, protect, side, pred) {
  let best = -1, bd = 99;
  for (const a of P.A) {
    if (a.side === side || a.i === P.carrier || !pred(a)) continue;
    const d = Math.hypot(a.x - protect.x, a.y - protect.y) * 0.6 + dist(a, from) * 0.4;
    if (d < bd) { bd = d; best = a.i; }
  }
  return best;
}

function think(P, a, rng, inp) {
  const A = P.A, c = A[P.carrier], qb = A[P.idx.QB], pd = playById(P.offId);
  const bx = P.bx, t = P.t;
  let v = null;
  const sp = a.maxV;
  const isCarrier = a.i === P.carrier && P.ball.st === 'held';

  // The ball carrier (once running).
  if (isCarrier && (a.slot !== 'QB' || P.scramble || pd.carrier === 'QB' && P.handed || P.intRet)) {
    const user = P.userSide && P.userSide === a.side;
    if (user && inp && Math.hypot(inp.sx, inp.sy) > 0.15) {
      const m = Math.hypot(inp.sx, inp.sy);
      a.wp = a.route ? a.route.length : 0; // the player took over: drop the designed path
      return [(inp.sx / m) * sp, (inp.sy / m) * sp];
    }
    if (a.role === 'carrierPath' && a.route && a.wp < a.route.length && a.y * (a.side === 'O' ? 1 : -1) < 0.3) {
      v = followPath(a, sp);
      if (v) return v;
    }
    return carrierAuto(P, a);
  }

  if (a.side === 'O' || P.intRet) {
    const friendly = c.side === a.side;
    switch (friendly ? a.role : 'pursue') {
      case 'qbPass': {
        if (pd.fake && t < 0.6) return seekVel(a, bx + pd.mesh[0], pd.mesh[1], sp * 0.8, 1);
        if (P.thrown) return [0, 0];
        if (P.userSide === 'O' && inp && Math.hypot(inp.sx, inp.sy) > 0.15) {
          const m = Math.hypot(inp.sx, inp.sy);
          return [(inp.sx / m) * sp * 0.75, (inp.sy / m) * sp * 0.75];
        }
        return seekVel(a, bx, pd.drop || -6.5, sp * 0.8, 1.5);
      }
      case 'qbHand': {
        if (pd.qbDrop && t < pd.delay) return seekVel(a, bx, pd.qbDrop, sp * 0.8, 1.2);
        if (!P.handed) return seekVel(a, bx + pd.mesh[0] * 0.4, pd.mesh[1] + 0.8, sp * 0.6, 1);
        return seekVel(a, a.x - 1.5, a.y - 2, sp * 0.4, 1);
      }
      case 'qbKeep': {
        if (t < pd.meshT) return seekVel(a, bx + pd.mesh[0] * 0.4, pd.mesh[1] + 0.6, sp * 0.6, 1);
        return seekVel(a, bx + pd.hole[0], pd.hole[1] + 3, sp);
      }
      case 'carrierPath': {
        if (!a.route) a.route = pd.path ? pd.path.map(([dx, y]) => [clampX(bx + dx), y]) : [[bx + pd.mesh[0], pd.mesh[1]], [clampX(bx + pd.hole[0]), pd.hole[1]], [clampX(bx + pd.hole[0] * 1.15), pd.hole[1] + 4]];
        if (pd.delay && t < pd.delay) return [0, 0];
        return followPath(a, sp * (P.handed ? 1 : 0.85)) || [0, sp];
      }
      case 'rbFake': {
        const tEnd = pd.fake && pd.type === 'pass' ? 0.75 : 0.9;
        if (t < tEnd) return seekVel(a, bx + (pd.mesh ? pd.mesh[0] : 0) + 0.8, (pd.mesh ? pd.mesh[1] : -3) + 2.5, sp * 0.9);
        a.role = pd.type === 'pass' ? 'passPro' : 'lead';
        return [0, 0];
      }
      case 'route': {
        const b = P.ball;
        if (b.st === 'air' && b.to === a.i && b.T - b.t < 1.1) return seekVel(a, b.tx, b.ty, sp);
        if (P.ball.st === 'held' && c !== qb && c.side === a.side) { a.role = 'lead'; return [0, 0]; }
        if (pd.type === 'run' && P.handed) { a.role = 'lead'; return [0, 0]; }
        const fv = followPath(a, sp);
        if (fv) return fv;
        if (a.settle) return [0, 0];
        const last = a.route[a.route.length - 1], prev = a.route.length > 1 ? a.route[a.route.length - 2] : [a.x0, a.y0];
        const dx = last[0] - prev[0], dy = last[1] - prev[1], m = Math.hypot(dx, dy) || 1;
        return [(dx / m) * sp * 0.85, (dy / m) * sp * 0.85];
      }
      case 'stalk': {
        const fv = followPath(a, sp * 0.7);
        if (fv && t < 1.2) return fv;
        a.role = 'lead';
        return [0, 0];
      }
      case 'pull': {
        if (t < 0.9 && !P.handed) return seekVel(a, bx + 9, -1.6, sp);
        a.role = 'lead';
        return [0, 0];
      }
      case 'passPro': {
        const prot = c;
        if (!(t % 0.2 < TICK) && a.tgt >= 0 && A[a.tgt].eng < 0) { /* keep target */ } else {
          a.tgt = nearestThreat(P, a, prot, a.side, (d) => d.eng < 0 && (d.role === 'rush' || d.pursueAt >= 0 && t >= d.pursueAt) && Math.abs(d.x - a.x) < 6);
        }
        if (a.tgt >= 0) {
          const d = A[a.tgt];
          const ux = prot.x - d.x, uy = prot.y - d.y, m = Math.hypot(ux, uy) || 1;
          return seekVel(a, d.x + (ux / m) * 0.9, d.y + (uy / m) * 0.9, sp);
        }
        return seekVel(a, a.x0 + (prot.x - a.x0) * 0.2, Math.min(a.y0, -1.2), sp * 0.5, 1);
      }
      case 'runBlock': {
        if (a.tgt < 0 || A[a.tgt].eng >= 0 && A[a.tgt].eng !== a.i || t % 0.25 < TICK) {
          a.tgt = nearestThreat(P, a, a, a.side, (d) => (d.eng < 0 || d.eng === a.i) && d.y > a.y - 1.5 && Math.abs(d.x - a.x) < 5 && d.y - a.y < 7);
        }
        if (a.tgt >= 0) {
          const d = A[a.tgt];
          const ux = c.x - d.x, uy = c.y - d.y, m = Math.hypot(ux, uy) || 1;
          return seekVel(a, d.x + (ux / m) * 0.9, d.y + (uy / m) * 0.9, sp);
        }
        return seekVel(a, a.x, a.y + 2, sp * 0.5);
      }
      case 'lead': {
        const f = c.side === 'O' ? 1 : -1;
        if (a.tgt < 0 || A[a.tgt].eng >= 0 || t % 0.25 < TICK) {
          a.tgt = nearestThreat(P, a, c, a.side, (d) => d.eng < 0 && (d.y - c.y) * f > -1 && dist(d, c) < 10);
        }
        if (a.tgt >= 0) {
          const d = A[a.tgt];
          const ux = c.x - d.x, uy = c.y - d.y, m = Math.hypot(ux, uy) || 1;
          return seekVel(a, d.x + (ux / m) * 0.9, d.y + (uy / m) * 0.9, sp * 0.95);
        }
        return seekVel(a, c.x + (a.x - c.x) * 0.5, c.y + 3 * f, sp * 0.8);
      }
      case 'pursue':
      default: {
        if (c.side === a.side) return [0, 0];
        const [px, py] = predictPos(a, c, sp);
        return seekVel(a, px, py, sp);
      }
    }
  }

  // Defense
  const b = P.ball;
  if (P.caught || P.handed && pd.type === 'run' || P.scramble || pd.carrier === 'QB' && P.handed) {
    if (a.pursueAt >= 0 && t >= a.pursueAt) a.role = 'pursue';
  }
  if (b.st === 'air' && a.ballAt >= 0 && t >= a.ballAt && a.role !== 'rush') return seekVel(a, b.tx, b.ty, sp);
  switch (a.role) {
    case 'rush': {
      const [px, py] = predictPos(a, c, sp, 1.6, 0.6);
      a.gx = px; a.gy = py;
      return seekVel(a, px, py, sp);
    }
    case 'pursue': {
      const [px, py] = predictPos(a, c, sp);
      a.gx = px; a.gy = py;
      return seekVel(a, px, py, sp);
    }
    case 'spy': {
      if (qb.y > 0.3 && P.carrier === qb.i) { a.role = 'pursue'; return [0, 0]; }
      a.gx = qb.x; a.gy = qb.y + 5.5;
      return seekVel(a, qb.x, Math.max(qb.y + 5.5, 3), sp * 0.9, 1.5);
    }
    case 'fit': {
      if (pd.fake && t < 0.7) {
        if (a.bite === false && t < TICK * 1.5) a.bite = rng.chance(0.75 - a.r.awr * 0.005);
        if (a.bite) return seekVel(a, a.x0 + (bx - a.x0) * 0.3, 1.5, sp * 0.7);
      }
      if (t > 0.75 && pd.type === 'pass' && !P.scramble) {
        a.role = 'zone'; a.assign = a.x0 < bx - 2 ? 'hookL' : a.x0 > bx + 2 ? 'hookR' : 'hookM';
        return [0, 0];
      }
      const cx = (c ? c.x : bx);
      a.gx = a.x0 + (cx - a.x0) * 0.6; a.gy = Math.max(1.2, a.y0 - t * 1.5);
      return seekVel(a, a.gx, a.gy, sp * 0.6, 1);
    }
    case 'man': {
      const m = A[P.idx[a.assign]];
      if (!m || m.role !== 'route') {
        a.gx = m ? m.x : bx; a.gy = 4;
        return seekVel(a, a.gx, a.gy, sp * 0.6, 1.5);
      }
      const lag = clamp(0.32 - a.r.cov * 0.0025, 0.07, 0.25);
      if (a.nextLook === undefined || t >= a.nextLook) {
        const cushion = Math.max(0.6, (a.y0 - m.y0) - t * 2.2);
        a.gx = m.x + m.vx * 0.3; a.gy = m.y + m.vy * 0.3 + cushion;
        a.nextLook = t + lag;
      }
      if (pd.fake && t < 0.6 && rng.chance(0.01)) a.nextLook += 0.2;
      return seekVel(a, a.gx, a.gy, sp);
    }
    case 'zone': {
      const z = ZONES[a.assign] || ZONES.hookM;
      const deep = z[1] >= 12;
      const lx = clampX(bx + z[0]), ly = Math.min(z[1], P.toGoal + (deep ? 6 : 3));
      if (pd.fake && t < 0.6 && !deep) {
        if (t < TICK * 1.5) a.bite = rng.chance(0.7 - a.r.awr * 0.005);
        if (a.bite) return seekVel(a, a.x, 2, sp * 0.6);
      }
      let thr = null, score = -99;
      for (const s of SLOTS) {
        const r = A[P.idx[s]];
        if (r.role !== 'route') continue;
        const d = Math.hypot(r.x - lx, r.y - ly);
        if (d > z[2]) continue;
        const sc = deep ? r.y * 0.5 - d : -d;
        if (sc > score) { score = sc; thr = r; }
      }
      if (thr) {
        if (deep) { a.gx = lx + (thr.x - lx) * 0.8; a.gy = Math.max(ly, thr.y + 4 + Math.max(0, thr.vy) * 0.6); }
        else { a.gx = lx + (thr.x - lx) * 0.7; a.gy = ly + (thr.y - ly) * 0.7; }
        return seekVel(a, a.gx, a.gy, sp, 0.8);
      }
      a.gx = lx; a.gy = ly;
      return seekVel(a, lx, ly, sp * 0.9, 2);
    }
  }
  return [0, 0];
}

function endPlay(P, kind, extra = {}) {
  if (P.result) return;
  const c = P.A[P.carrier];
  const pd = playById(P.offId);
  let y = c.y;
  if (kind === 'tackle' || kind === 'sack' || kind === 'fumble') y += c.side === 'O' ? 0.5 : -0.5;
  let yards = 0;
  if (c.side === 'O' && !['inc', 'throwaway'].includes(kind)) yards = Math.round(clamp(y, -P.ballOn, P.toGoal));
  const res = {
    kind, yards, elapsed: Math.max(1, P.t), x: c.x, y,
    playType: pd.type, carrierSide: c.side, carrierPid: c.pid, carrierSlot: c.slot,
    thrown: P.thrown, caught: P.caught, airYards: P.airYards || 0,
    passerPid: P.thrown ? P.A[P.idx.QB].pid : null,
    targetPid: P.ball.to >= 0 ? P.A[P.ball.to].pid : null,
    ...extra,
  };
  res.clockStops = ['inc', 'oob', 'td', 'safety', 'int', 'throwaway', 'fumbleLost', 'touchback'].includes(kind) || !!extra.turnover;
  P.result = res;
  P.phase = 'dead';
  P.ev.push({ k: 'dead', kind });
}

export function stepPlay(P, rng, inp) {
  if (P.phase !== 'live') return;
  const dt = TICK;
  P.t += dt;
  const A = P.A, qb = A[P.idx.QB], pd = playById(P.offId), b = P.ball;

  // Handoffs
  if (pd.type === 'run' && !P.handed && P.t >= pd.meshT) {
    if (pd.carrier === 'QB') {
      P.handed = true; P.runRec = P.t; setPursuit(P, 1.25);
      qb.role = 'carrierPath'; qb.wp = 0;
      qb.route = [[clampX(P.bx + pd.hole[0]), pd.hole[1]], [clampX(P.bx + pd.hole[0] * 1.15), pd.hole[1] + 4]];
      P.ev.push({ k: 'keep' });
    } else {
      const rb = A[P.idx.RB];
      if (dist(rb, qb) < (pd.id === 'sweep' ? 3.5 : 2.2) || P.t > pd.meshT + 0.7) {
        P.handed = true; P.carrier = rb.i; b.h = rb.i; P.runRec = P.t; setPursuit(P);
        P.ev.push({ k: 'handoff' });
      }
    }
  }

  // QB decisions
  if (pd.type === 'pass' && !P.thrown && P.carrier === qb.i) {
    if (!P.scramble && qb.y > 0.5) { P.scramble = true; setPursuit(P, 1); P.ev.push({ k: 'scramble' }); }
    if (inp && inp.throwSlot && P.userSide === 'O') throwTo(P, rng, inp.throwSlot);
    else if (canThrow(P) && (P.userSide !== 'O' || P.autoQB)) autoRead(P, rng, qb, pd);
  }

  // Screens: the line lets its rushers go and releases downfield to lead.
  if (pd.screen && !P.released && P.t >= 0.85) {
    P.released = true;
    for (const s of OL) {
      const o = A[P.idx[s]];
      if (o.eng >= 0) { A[o.eng].eng = -1; o.eng = -1; }
      o.role = 'lead'; o.tgt = -1; o.beaten = 0.25;
    }
  }

  // Juke
  const c = A[P.carrier];
  if (b.st === 'held' && (c.slot !== 'QB' || P.scramble || P.handed || P.intRet)) {
    const user = P.userSide && P.userSide === c.side;
    let want = user && inp && inp.juke;
    if (!user && c.jukeCD <= 0) {
      for (const a of A) {
        if (a.side === c.side || a.eng >= 0) continue;
        if (dist(a, c) < 1.7 && rng.chance(c.r.agi / 250 * dt * 6)) { want = true; break; }
      }
    }
    if (want && c.jukeCD <= 0) {
      let near = null, nd = 99;
      for (const a of A) if (a.side !== c.side) { const d = dist(a, c); if (d < nd) { nd = d; near = a; } }
      const side = near && Math.abs(c.x - near.x) > 0.05 ? Math.sign(c.x - near.x) : 1;
      c.vx += side * 2.6; c.jukeT = 0.45; c.jukeCD = 1.4;
      P.ev.push({ k: 'juke', i: c.i });
    }
  }

  // Desired velocities
  for (const a of A) {
    if (a.eng >= 0) continue;
    const v = think(P, a, rng, inp) || [0, 0];
    a.dvx = v[0]; a.dvy = v[1];
  }
  for (const a of A) {
    if (a.eng >= 0) continue;
    let mult = 1;
    if (a.i === P.carrier && b.st === 'held' && (a.slot !== 'QB' || P.scramble || P.handed)) mult *= 0.94;
    else if (a.role === 'pursue' && dist(a, A[P.carrier]) < 5) mult *= 1.06;
    if (a.slow > 0) mult *= 0.4;
    if (a.beaten > 0) mult *= 0.6;
    integrate(a, a.dvx, a.dvy, dt, a.maxV * mult, a.acc * (a.jukeT > 0 ? 1.6 : 1));
  }

  // Engagements: blockers latch onto their target.
  for (const a of A) {
    if (!BLOCK_ROLES.has(a.role) || a.eng >= 0 || a.beaten > 0 || a.tgt < 0) continue;
    if (a.side !== A[P.carrier].side) continue;
    const d = A[a.tgt];
    if (d.eng < 0 && d.i !== P.carrier && d.side !== a.side && dist(a, d) < 1.15) { a.eng = d.i; d.eng = a.i; }
  }
  for (const bl of A) {
    if (bl.eng < 0 || !BLOCK_ROLES.has(bl.role)) continue;
    const d = A[bl.eng];
    const cc = A[P.carrier];
    let gx = d.gx, gy = d.gy;
    if (!gx && !gy || d.role === 'rush' || d.role === 'pursue') { gx = cc.x; gy = cc.y; }
    const ux = gx - d.x, uy = gy - d.y, m = Math.hypot(ux, uy) || 1;
    const drive = bl.role === 'runBlock' ? 1.42 : 1.3;
    const net = (d.r.str + d.r.agi * 0.3) - bl.r.blk * drive;
    const vp = clamp(0.4 + net * 0.03, -0.8, 1.6);
    d.vx = (ux / m) * vp; d.vy = (uy / m) * vp;
    d.x += d.vx * dt; d.y += d.vy * dt;
    bl.vx = d.vx; bl.vy = d.vy;
    bl.x = d.x + (ux / m) * 0.95; bl.y = d.y + (uy / m) * 0.95;
    let h = clamp(0.3 + ((d.r.str + d.r.agi) / 2 + 7 - bl.r.blk) / 110, 0.05, 0.9);
    if (bl.role === 'lead') h *= 1.6;
    else if (bl.role === 'runBlock') h *= 0.75;
    if (dist(d, cc) < 1.6 && cc.i !== P.idx.QB) h *= 2.5;
    if (rng.next() < h * dt) {
      d.eng = -1; bl.eng = -1; bl.beaten = 0.9; bl.tgt = -1;
      P.ev.push({ k: 'shed', i: d.i });
    }
  }

  // Ball
  if (b.st === 'held') { const h = A[b.h]; b.x = h.x; b.y = h.y; b.z = 0; }
  else if (b.st === 'air') {
    b.t += dt;
    const u = Math.min(1, b.t / b.T);
    b.x = b.fx + (b.tx - b.fx) * u; b.y = b.fy + (b.ty - b.fy) * u; b.z = 4 * b.hgt * u * (1 - u);
    if (u >= 1) resolveCatch(P, rng);
    if (P.result) return;
  }

  // Timers
  for (const a of A) {
    if (a.cd > 0) a.cd -= dt;
    if (a.slow > 0) a.slow -= dt;
    if (a.beaten > 0) a.beaten -= dt;
    if (a.jukeT > 0) a.jukeT -= dt;
    if (a.jukeCD > 0) a.jukeCD -= dt;
  }

  // Tackles, boundaries, scores
  if (b.st === 'held') {
    const cc = A[P.carrier];
    const f = cc.side === 'O' ? 1 : -1;
    if (cc.side === 'O' && cc.y >= P.toGoal) return endPlay(P, 'td', { scorer: 'O' });
    if (cc.side === 'D' && cc.y <= -P.ballOn) return endPlay(P, 'td', { scorer: 'D', turnover: true, intReturn: true });
    if (cc.x < 0.3 || cc.x > W - 0.3) return endWhere(P, 'oob');
    const near = [];
    for (const a of A) if (a.side !== cc.side && dist(a, cc) < 1.5) near.push(a);
    const immune = pd.type === 'run' && !P.handed && pd.carrier !== 'QB';
    for (const a of near) {
      if (a.cd > 0 || immune) continue;
      const d = dist(a, cc);
      const behind0 = (a.y - cc.y) * f < 0;
      if (d >= (behind0 ? 1.35 : 0.95)) continue; // trailing chasers can dive from a little farther
      let p = (d >= 0.95 ? 0.6 : 1) * 0.55 + (a.r.tkl - (cc.r.str + cc.r.agi) / 2) / 200 + 0.14 * (near.length - 1);
      if (cc.jukeT > 0) p -= 0.35;
      if (a.eng >= 0) p *= 0.35;
      const behind = (a.y - cc.y) * f < 0;
      if (behind && Math.hypot(cc.vx, cc.vy) > cc.maxV * 0.85) p -= 0.08;
      if (cc.slot === 'QB' && !P.thrown && !P.scramble && pd.type === 'pass') p += 0.12;
      p = clamp(p, d >= 0.95 ? 0.1 : 0.15, 0.95);
      a.cd = 0.7;
      if (rng.next() < p) {
        const fumP = 0.012 + (near.length > 1 ? 0.01 : 0);
        const sack = cc.slot === 'QB' && pd.type === 'pass' && !P.thrown && cc.y < 0 && !P.scramble;
        if (rng.next() < fumP && !P.intRet) {
          const lost = rng.next() >= 0.55;
          return endWhere(P, lost ? 'fumbleLost' : 'tackle', { tacklerPid: a.pid, fumble: true, turnover: lost, sack });
        }
        return endWhere(P, sack ? 'sack' : 'tackle', { tacklerPid: a.pid });
      }
      a.slow = d >= 0.95 ? 0.3 : 0.6;
      P.ev.push({ k: 'miss', i: a.i });
    }
  }

  // Keep players from stacking on top of each other.
  for (let i = 0; i < A.length; i++) {
    const p = A[i];
    for (let j = i + 1; j < A.length; j++) {
      const q = A[j];
      if (p.eng === j || (i === P.carrier || j === P.carrier) && p.side !== q.side) continue;
      const dx = q.x - p.x, dy = q.y - p.y, d2 = dx * dx + dy * dy;
      if (d2 > 0.81 || d2 < 1e-6) continue;
      const d = Math.sqrt(d2), push = (0.9 - d) * 0.25;
      p.x -= (dx / d) * push; p.y -= (dy / d) * push; q.x += (dx / d) * push; q.y += (dy / d) * push;
    }
  }

  if (P.t >= MAX_T) endWhere(P, 'tackle', { capped: true });
}

function endWhere(P, kind, extra = {}) {
  const c = P.A[P.carrier];
  // Safety: an offensive carrier downed in their own end zone. Touchback: an interception downed in the end zone.
  if (c.side === 'O' && c.y + (kind === 'oob' ? 0 : 0.5) <= -P.ballOn && kind !== 'fumbleLost') return endPlay(P, 'safety', extra);
  if (c.side === 'D' && c.y >= P.toGoal) return endPlay(P, 'touchback', { ...extra, intReturn: true, turnover: true });
  if (P.intRet) return endPlay(P, 'int', { ...extra, intReturn: true, turnover: true, intSpot: P.toGoal - c.y + (kind === 'oob' ? 0 : 0.5) });
  endPlay(P, kind, extra);
}

function resolveCatch(P, rng) {
  const A = P.A, b = P.ball, qb = A[P.idx.QB];
  if (b.away) return endPlay(P, 'throwaway', { incomplete: true });
  if (b.tx < 0 || b.tx > W || b.ty > P.toGoal + 10) return endPlay(P, 'inc', { incomplete: true, why: 'out' });
  const r = A[b.to];
  const dR = Math.hypot(r.x - b.tx, r.y - b.ty);
  let def = null, dD = 99;
  for (const a of A) {
    if (a.side !== 'D' || a.eng >= 0) continue;
    const d = Math.hypot(a.x - b.tx, a.y - b.ty);
    if (d < dD) { dD = d; def = a; }
  }
  if (def && dD < 1.2 && (dD < dR - 0.2 || dR > 1.45)) {
    if (rng.next() < 0.04 + def.r.cov * 0.0016) {
      P.carrier = def.i; b.st = 'held'; b.h = def.i; P.intRet = true; P.intBy = def.pid;
      for (const a of A) { a.eng = -1; a.tgt = -1; if (a.side === 'O') a.role = 'pursue'; else if (a !== def) a.role = 'lead'; }
      P.ev.push({ k: 'int', i: def.i });
      // A pick in the end zone can't be returned out by the AI if it's deep; it's a touchback if it stays there.
      return;
    }
    if (rng.next() < 0.5) return endPlay(P, 'inc', { incomplete: true, why: 'breakup', defenderPid: def.pid });
  }
  if (dR < 1.45) {
    const contested = def && dD < 1.6 ? 0.25 : 0;
    const deep = Math.max(0, Math.hypot(b.tx - b.fx, b.ty - b.fy) - 15) * 0.011;
    if (rng.next() < 0.6 + r.r.hnd * 0.0035 - contested - deep) {
      P.carrier = r.i; b.st = 'held'; b.h = r.i; P.caught = true; P.catchT = P.t;
      r.role = 'carrier';
      setPursuit(P, 0.6, false);
      P.ev.push({ k: 'catch', i: r.i });
      if (r.y >= P.toGoal) endPlay(P, 'td', { scorer: 'O' });
      return;
    }
    return endPlay(P, 'inc', { incomplete: true, why: 'drop' });
  }
  endPlay(P, 'inc', { incomplete: true, why: 'miss' });
}

// Offense-local → absolute field yards (user team defends the bottom end zone, y = 0..10).
export function toAbs(lx, ly, losY, dir) {
  return dir === 1 ? [lx, losY + ly] : [W - lx, losY - ly];
}

// Run a play to completion with AI on both sides (Node tools and the "finish" hook).
export function runToEnd(P, rng, inp = null) {
  if (P.phase === 'pre') snap(P);
  let n = 0;
  while (P.phase === 'live' && n++ < 60 * 20) stepPlay(P, rng, inp);
  return P.result;
}
