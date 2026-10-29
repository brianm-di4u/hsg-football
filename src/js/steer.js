// Steering helpers on plain {x, y, vx, vy} agents.
// Seek and pursue adapted from rharel/js-steering-behaviors (MIT, © 2015 Raoul Harel):
// desired = unit(target − position) × speed; pursuit seeks a predicted target position.

export function seekVel(a, tx, ty, speed, brake = 0) {
  const dx = tx - a.x, dy = ty - a.y;
  const d = Math.hypot(dx, dy);
  if (d < 1e-4) return [0, 0];
  const s = brake > 0 && d < brake ? speed * (d / brake) : speed; // arrive
  return [(dx / d) * s, (dy / d) * s];
}

// Predict `t`'s position, with a look-ahead proportional to distance (Reynolds' pursuit).
export function predictPos(a, t, chaserSpeed, k = 1.6, cap = 1.2) {
  const d = Math.hypot(t.x - a.x, t.y - a.y);
  const look = Math.min(cap, d / Math.max(1, chaserSpeed * k));
  return [t.x + t.vx * look, t.y + t.vy * look];
}

// Move with an acceleration cap toward a desired velocity, then clamp to top speed.
// Players cut and brake much harder than they speed up: the change is split into a component along the
// current heading (speed-up capped at acc, braking at 2.2 acc) and a sideways component (cuts, 2.4 acc).
export function integrate(a, dvx, dvy, dt, maxV, acc) {
  let cx = dvx - a.vx, cy = dvy - a.vy;
  const v = Math.hypot(a.vx, a.vy);
  if (v < 0.5) {
    const c = Math.hypot(cx, cy), lim = acc * 1.5 * dt;
    if (c > lim) { cx *= lim / c; cy *= lim / c; }
  } else {
    const ux = a.vx / v, uy = a.vy / v;
    let par = cx * ux + cy * uy;
    let px = cx - par * ux, py = cy - par * uy;
    const lp = (par > 0 ? acc : acc * 2.2) * dt;
    if (Math.abs(par) > lp) par = Math.sign(par) * lp;
    const pm = Math.hypot(px, py), lq = acc * 2.4 * dt;
    if (pm > lq) { px *= lq / pm; py *= lq / pm; }
    cx = par * ux + px; cy = par * uy + py;
  }
  a.vx += cx; a.vy += cy;
  const sp = Math.hypot(a.vx, a.vy);
  if (sp > maxV) { a.vx *= maxV / sp; a.vy *= maxV / sp; }
  a.x += a.vx * dt; a.y += a.vy * dt;
}

export const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
