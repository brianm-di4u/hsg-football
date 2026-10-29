// Field renderer: a cached field layer (grass, lines, numbers, end zones, stands) plus per-frame players, ball,
// markers, route previews, receiver badges, kick animations and effects. Absolute yards: x 0..W, y 0..120,
// the user's team defends the bottom end zone and attacks up the screen.
import { W, HASH, toAbs, canThrow, predictRoute } from './sim.js';
import { teamDef, onColor, contrast } from './data.js';
import { mascotSprite } from './art.js';
import { playById, SLOTS, BADGES } from './plays.js';
import { kickTolerance } from './kick.js';

export const view = { cssW: 300, cssH: 300, dpr: 1, ppy: 8, ox: 0, camY: 35, shake: 0, layer: null, layerKey: '' };
const Y0 = -10, Y1 = 130;

export function resize(canvas) {
  const r = canvas.parentElement.getBoundingClientRect();
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const w = Math.max(200, Math.round(r.width)), h = Math.max(160, Math.round(r.height));
  if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
  }
  view.cssW = w; view.cssH = h; view.dpr = dpr;
  view.ppy = Math.min(15, w / 57.3);
  view.ox = (w - W * view.ppy) / 2;
}

const sx = (x) => view.ox + x * view.ppy;
const sy = (y) => view.cssH / 2 - (y - view.camY) * view.ppy;
// When the 3D view is on, proj.fn(x, y, h) projects field yards (h: height in yards) to canvas pixels.
export const proj = { fn: null };
export const fieldToScreen = (x, y, h = 0) => (proj.fn ? proj.fn(x, y, h) : [sx(x), sy(y)]);
export const screenToField = (px, py) => [(px - view.ox) / view.ppy, view.camY + (view.cssH / 2 - py) / view.ppy];

export function jersey(g, side) {
  const t = teamDef(g.teams[side].id), c = t.colors;
  if (side === g.home && !g.neutralAway) {
    const num = contrast(c.secondary, c.primary) >= 2.6 ? c.secondary : onColor(c.primary);
    return { fill: c.primary, trim: c.secondary, num };
  }
  return { fill: '#F4EFE6', trim: c.primary, num: contrast(c.primary, '#F4EFE6') >= 3 ? c.primary : '#111111' };
}

function buildLayer(g, theme) {
  const { cssW, ppy, dpr } = view;
  const key = `${cssW}:${ppy}:${dpr}:${theme}:${g.teams[0].id}:${g.teams[1].id}:${g.home}`;
  if (view.layerKey === key && view.layer) return view.layer;
  const H = (Y1 - Y0) * ppy;
  const c = document.createElement('canvas');
  c.width = Math.round(cssW * dpr); c.height = Math.round(H * dpr);
  const ctx = c.getContext('2d');
  ctx.scale(dpr, dpr);
  const night = theme !== 'day';
  const ly = (y) => (Y1 - y) * ppy, lx = sx;
  // stands beyond the sidelines
  ctx.fillStyle = night ? '#16141F' : '#5E5444';
  ctx.fillRect(0, 0, cssW, H);
  const crowd = (x0, x1, team) => {
    const col = teamDef(g.teams[team].id).colors;
    const step = Math.max(4, ppy * 0.55);
    for (let y = 0; y < H; y += step) for (let x = x0 + 2; x < x1 - 2; x += step) {
      const k = ((x * 7.3 + y * 3.1) | 0) % 6;
      ctx.fillStyle = k < 2 ? col.primary : k < 4 ? col.secondary : night ? '#3A3550' : '#CDBF9F';
      ctx.globalAlpha = 0.75; ctx.fillRect(x, y, step * 0.5, step * 0.5);
    }
    ctx.globalAlpha = 1;
  };
  const sideW = Math.max(0, lx(0) - 3 * ppy);
  if (sideW > 6) { crowd(0, sideW, g.home); crowd(cssW - sideW, cssW, 1 - g.home); }
  // apron (sideline area)
  ctx.fillStyle = night ? '#173F2A' : '#3B7A4A';
  ctx.fillRect(Math.max(0, lx(-3)), ly(Y1 - 2), W * ppy + 6 * ppy, (Y1 - Y0 - 4) * ppy);
  // grass with 5-yard stripes
  for (let y = 0; y < 120; y += 5) {
    ctx.fillStyle = (y / 5) % 2 ? (night ? '#1E5B3A' : '#3E8A4F') : (night ? '#22663F' : '#459656');
    ctx.fillRect(lx(0), ly(y + 5), W * ppy, 5 * ppy + 0.5);
  }
  // end zones in team colors (user team defends the bottom)
  for (const [side, y0] of [[0, 0], [1, 110]]) {
    const t = teamDef(g.teams[side].id);
    ctx.fillStyle = t.colors.primary; ctx.fillRect(lx(0), ly(y0 + 10), W * ppy, 10 * ppy);
    ctx.save();
    ctx.translate(lx(W / 2), ly(y0 + 5));
    ctx.fillStyle = t.colors.secondary === t.colors.primary ? '#FFFFFF' : (contrast(t.colors.secondary, t.colors.primary) >= 2 ? t.colors.secondary : onColor(t.colors.primary));
    ctx.font = `900 ${Math.round(ppy * 5)}px "Arial Black", Impact, sans-serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const label = t.short.toUpperCase();
    const maxW = W * ppy * 0.9;
    const mw = ctx.measureText(label).width;
    if (mw > maxW) ctx.scale(maxW / mw, 1);
    ctx.fillText(label, 0, 0);
    ctx.restore();
  }
  // lines
  ctx.strokeStyle = 'rgba(255,255,255,0.92)'; ctx.lineWidth = Math.max(1, ppy * 0.12);
  ctx.strokeRect(lx(0), ly(120), W * ppy, 120 * ppy);
  for (let y = 10; y <= 110; y += 5) { ctx.beginPath(); ctx.moveTo(lx(0), ly(y)); ctx.lineTo(lx(W), ly(y)); ctx.stroke(); }
  ctx.lineWidth = Math.max(1, ppy * 0.08);
  for (let y = 11; y < 110; y++) {
    if (y % 5 === 0) continue;
    for (const hx of [0, HASH[0], HASH[1], W]) {
      const x = hx === 0 ? 0.3 : hx === W ? W - 0.3 : hx;
      ctx.beginPath(); ctx.moveTo(lx(x - 0.33), ly(y)); ctx.lineTo(lx(x + 0.33), ly(y)); ctx.stroke();
    }
  }
  // yard numbers
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  ctx.font = `700 ${Math.max(8, Math.round(ppy * 1.9))}px "Arial Black", Impact, sans-serif`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  for (let y = 20; y <= 100; y += 10) {
    const n = y <= 60 ? y - 10 : 110 - y;
    for (const [x, rot] of [[9, -Math.PI / 2], [W - 9, Math.PI / 2]]) {
      ctx.save(); ctx.translate(lx(x), ly(y)); ctx.rotate(rot); ctx.fillText(String(n), 0, 0); ctx.restore();
    }
  }
  // midfield mascot
  const m = mascotSprite(g.teams[g.home].id, Math.round(ppy * 9 * dpr));
  ctx.globalAlpha = 0.5; ctx.drawImage(m, lx(W / 2) - ppy * 4.5, ly(60) - ppy * 4.5, ppy * 9, ppy * 9); ctx.globalAlpha = 1;
  // goalposts (top-down): a crossbar beyond each end line
  ctx.strokeStyle = '#E6B422'; ctx.lineWidth = Math.max(2, ppy * 0.25);
  for (const y of [-0.6, 120.6]) { ctx.beginPath(); ctx.moveTo(lx(W / 2 - 3.9), ly(y)); ctx.lineTo(lx(W / 2 + 3.9), ly(y)); ctx.stroke(); }
  // night: light-tower glows from the four corners
  if (night) {
    for (const [x, y] of [[-6, -6], [W + 6, -6], [-6, 126], [W + 6, 126]]) {
      const gr = ctx.createRadialGradient(lx(x), ly(y), 4, lx(x), ly(y), ppy * 70);
      gr.addColorStop(0, 'rgba(255,246,224,0.20)'); gr.addColorStop(1, 'rgba(255,246,224,0)');
      ctx.fillStyle = gr; ctx.fillRect(0, 0, cssW, H);
    }
  }
  view.layer = c; view.layerKey = key;
  return c;
}

export const losY = (g) => (g.poss === 0 ? 10 + g.ballOn : 110 - g.ballOn);
const playDir = (P) => (P.offTeam === 0 ? 1 : -1);
const playLos = (P) => (P.offTeam === 0 ? 10 + P.ballOn : 110 - P.ballOn);

export function agentAbs(P, a) { return toAbs(a.x, a.y, playLos(P), playDir(P)); }
export function ballAbs(P) { return toAbs(P.ball.x, P.ball.y, playLos(P), playDir(P)); }

// Where the camera wants to be. coverPx: pixels of the canvas hidden by an overlay at the bottom.
export function cameraTarget(g, coverPx = 0) {
  const vh = view.cssH / view.ppy;
  let y;
  const P = g.play;
  const ka = g.kickAnim;
  if (ka && (g.phase === 'kickoff' || g.phase === 'kickfly')) y = kickBallPos(g, ka)[1];
  else if (P && (g.phase === 'live' || g.phase === 'result' && P.phase === 'dead')) {
    const [, by] = ballAbs(P);
    y = by + playDir(P) * vh * 0.1;
  } else {
    const dir = g.poss === 0 ? 1 : -1;
    y = losY(g) + dir * vh * 0.14;
  }
  y -= (coverPx / view.ppy) * 0.5;
  return Math.max(Y0 + vh / 2, Math.min(Y1 - vh / 2, y));
}

export function stepCamera(target, dt, instant) {
  const d = target - view.camY;
  if (instant || Math.abs(d) < 0.02) { view.camY = target; return false; }
  view.camY += d * Math.min(1, dt * 6);
  return Math.abs(target - view.camY) > 0.05;
}

// Kick animation positions (absolute yards).
export function kickBallPos(g, ka) {
  const dur = kickDur(ka);
  const u = Math.min(1, ka.t / dur.fly);
  if (ka.kind === 'kickoff' || ka.kind === 'free' || ka.kind === 'punt') {
    const k = ka.kicking, from = k === 0 ? 10 + ka.from : 110 - ka.from;
    const land = k === 0 ? 10 + Math.min(ka.land, 118) : 110 - Math.min(ka.land, 118);
    if (ka.t <= dur.fly) return [W / 2 + Math.sin(u * 3) * 2, from + (land - from) * u, 4 * 9 * u * (1 - u)];
    const end = ka.touchback ? land : (k === 0 ? 110 - ka.ballOn : 10 + ka.ballOn);
    const r = Math.min(1, (ka.t - dur.fly) / Math.max(0.01, dur.ret));
    return [W / 2 + Math.sin(r * 4) * 3, land + (end - land) * r, 0];
  }
  // field goal / try: from the hold spot to the posts
  const side = ka.side, dir = side === 0 ? 1 : -1;
  const spot = (side === 0 ? 10 + ka.ballOn : 110 - ka.ballOn) - dir * 7;
  const goal = side === 0 ? 120.6 : -0.6;
  const miss = ka.good ? 0 : ka.why === 'short' ? 0 : Math.sign(ka.e || 1) * 6;
  const endY = ka.why === 'short' ? spot + (goal - spot) * 0.85 : goal + dir * 3;
  return [W / 2 + miss * u * u * dir, spot + (endY - spot) * u, 4 * 6 * u * (1 - u)];
}
export function kickDur(ka) {
  if (ka.kind === 'kickoff' || ka.kind === 'free') return { fly: 1.3, ret: ka.touchback ? 0.3 : 0.9, total: ka.touchback ? 1.6 : 2.2 };
  if (ka.kind === 'punt') return { fly: 1.2, ret: 0.5, total: 1.7 };
  return { fly: 1.1, ret: 0, total: 1.4 };
}

function drawPlayer(ctx, x, y, r, side, jer, num, opts = {}) {
  ctx.beginPath();
  if (side === 'O') ctx.arc(x, y, r, 0, Math.PI * 2);
  else { const q = r * 0.92; roundRect(ctx, x - q, y - q, q * 2, q * 2, r * 0.35); }
  ctx.fillStyle = jer.fill; ctx.fill();
  ctx.lineWidth = Math.max(1.5, r * 0.28); ctx.strokeStyle = jer.trim; ctx.stroke();
  if (opts.ring) { ctx.beginPath(); ctx.arc(x, y, r + 3.5, 0, Math.PI * 2); ctx.lineWidth = 2.5; ctx.strokeStyle = '#FFFFFF'; ctx.stroke(); }
  if (r >= 7 && num !== undefined) {
    ctx.fillStyle = jer.num; ctx.font = `800 ${Math.round(r * 1.05)}px system-ui, sans-serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(String(num), x, y + 0.5);
  }
}
function roundRect(ctx, x, y, w, h, r) {
  ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}

function drawBadge(ctx, x, y, k, size) {
  const shape = k;
  ctx.save(); ctx.translate(x, y);
  ctx.fillStyle = '#FFF6E0'; ctx.strokeStyle = '#111111'; ctx.lineWidth = 2;
  ctx.beginPath();
  const s = size;
  if (shape === 0) { ctx.moveTo(0, -s); ctx.lineTo(s, 0); ctx.lineTo(0, s); ctx.lineTo(-s, 0); ctx.closePath(); }
  else if (shape === 1) ctx.arc(0, 0, s * 0.85, 0, Math.PI * 2);
  else if (shape === 2) { ctx.moveTo(0, -s); ctx.lineTo(s, s * 0.8); ctx.lineTo(-s, s * 0.8); ctx.closePath(); }
  else if (shape === 3) ctx.rect(-s * 0.8, -s * 0.8, s * 1.6, s * 1.6);
  else { for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? s * 0.45 : s; ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } ctx.closePath(); }
  ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#111111'; ctx.font = `800 ${Math.round(s * 0.95)}px system-ui, sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(String(k + 1), 0, shape === 2 ? s * 0.25 : 0.5);
  ctx.restore();
}

// Screen positions of throwable receivers: [{slot, k, x, y}]
export function receiverTargets(g) {
  const P = g.play;
  if (!P || g.user === null || g.poss !== g.user && P.offTeam !== g.user) return [];
  const pd = playById(P.offId);
  if (!pd || pd.type !== 'pass') return [];
  if (!(P.phase === 'pre' || canThrow(P) || P.phase === 'live' && !P.thrown && P.t < 0.6)) return [];
  const out = [];
  SLOTS.forEach((s, k) => {
    const a = P.A[P.idx[s]];
    if (!a || a.role !== 'route' || !a.route) return;
    const [x, y] = agentAbs(P, a);
    const [px, py] = fieldToScreen(x, y, proj.fn ? 2.9 : 0);
    out.push({ slot: s, k, x: px, y: py });
  });
  return out;
}

export function render(ctx, g, S, now) {
  const { cssW, cssH, dpr, ppy } = view;
  const theme = S.settings.theme === 'day' ? 'day' : 'night';
  const layer = buildLayer(g, theme);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const shake = view.shake > 0 && !S.reduced ? (Math.sin(now * 0.09) * view.shake) : 0;
  ctx.fillStyle = theme === 'day' ? '#5E5444' : '#16141F';
  ctx.fillRect(0, 0, cssW, cssH);
  const top = view.camY + cssH / 2 / ppy;
  ctx.drawImage(layer, 0, (Y1 - top) * ppy * dpr, cssW * dpr, cssH * dpr, shake, 0, cssW, cssH);
  ctx.save(); ctx.translate(shake, 0);

  const P = g.play;
  const showPlay = P && ['pre', 'live', 'result'].includes(g.phase) && (g.phase !== 'result' || P.phase === 'dead');
  // markers: line of scrimmage (blue) and first-down line (gold)
  if (!showPlay || g.phase === 'pre') {
    if (!['kickoff', 'kickfly', 'kick'].includes(g.phase) || g.phase === 'kick') {
      const l = losY(g), dir = g.poss === 0 ? 1 : -1;
      line(ctx, l, '#4FC3FF', 3);
      if (g.ballOn + g.toGo < 100 && !g.twoPoint) line(ctx, l + dir * g.toGo, '#E6B422', 3);
      if (!showPlay) drawBall(ctx, sx(g.absX), sy(l), ppy, 0);
    }
  }
  if (showPlay) {
    const offSide = P.offTeam, jO = jersey(g, offSide), jD = jersey(g, 1 - offSide);
    const r = Math.max(6, ppy * 0.75);
    // route previews for the user's own call
    const userOff = g.user !== null && offSide === g.user;
    if (P.phase === 'pre' && userOff && S.settings.routes !== false) {
      ctx.save(); ctx.setLineDash([5, 5]); ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(255,246,224,0.7)';
      for (const a of P.A) {
        if (a.side !== 'O') continue;
        let pts = a.route;
        const pd = playById(P.offId);
        if (a.role === 'carrierPath') pts = pd.path ? pd.path.map(([dx, y]) => [P.bx + dx, y]) : [[P.bx + pd.mesh[0], pd.mesh[1]], [P.bx + pd.hole[0], pd.hole[1]], [P.bx + pd.hole[0] * 1.15, pd.hole[1] + 4]];
        if (a.role === 'qbKeep') pts = [[P.bx + pd.hole[0], pd.hole[1]], [P.bx + pd.hole[0] * 1.15, pd.hole[1] + 4]];
        if (!pts || a.role === 'stalk') continue;
        ctx.beginPath();
        const [x0, y0] = toAbs(a.x, a.y, playLos(P), playDir(P)); ctx.moveTo(sx(x0), sy(y0));
        for (const [px, py] of pts) { const [ax, ay] = toAbs(px, py, playLos(P), playDir(P)); ctx.lineTo(sx(ax), sy(ay)); }
        ctx.stroke();
        const last = pts[pts.length - 1], prev = pts.length > 1 ? pts[pts.length - 2] : [a.x, a.y];
        const [ex, ey] = toAbs(last[0], last[1], playLos(P), playDir(P)), [qx, qy] = toAbs(prev[0], prev[1], playLos(P), playDir(P));
        arrow(ctx, sx(qx), sy(qy), sx(ex), sy(ey));
      }
      ctx.restore();
    }
    const carrier = P.A[P.carrier];
    for (const a of P.A) {
      const [x, y] = agentAbs(P, a);
      const jer = a.side === 'O' ? jO : jD;
      // in an interception return the defense carries the ball; colors still follow the team
      drawPlayer(ctx, sx(x), sy(y), r, a.side, jer, a.num, { ring: a === carrier && P.ball.st === 'held' && (P.phase === 'live' || P.phase === 'dead') && !(a.slot === 'QB' && !P.thrown && !P.handed && !P.scramble && playById(P.offId).type === 'pass') && P.phase !== 'pre' });
      if (a.jukeT > 0 && !S.reduced) { ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = 2; for (let i = 1; i <= 3; i++) { ctx.beginPath(); ctx.moveTo(sx(x) - a.vx * i * 2, sy(y) + a.vy * i * 2 * playDir(P)); ctx.lineTo(sx(x) - a.vx * i * 3.5, sy(y) + a.vy * i * 3.5 * playDir(P)); ctx.stroke(); } }
    }
    // ball
    const [bx, by] = ballAbs(P);
    if (P.ball.st === 'air') {
      ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.beginPath(); ctx.ellipse(sx(bx), sy(by), ppy * 0.45, ppy * 0.25, 0, 0, Math.PI * 2); ctx.fill();
      const b = P.ball, u0 = Math.max(0, b.t / b.T - 0.12);
      const [tx0, ty0] = toAbs(b.fx + (b.tx - b.fx) * u0, b.fy + (b.ty - b.fy) * u0, playLos(P), playDir(P));
      ctx.strokeStyle = 'rgba(255,246,224,0.55)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(sx(tx0), sy(ty0) - 4 * b.hgt * u0 * (1 - u0) * ppy * 0.6); ctx.lineTo(sx(bx), sy(by) - P.ball.z * ppy * 0.6); ctx.stroke();
      drawBall(ctx, sx(bx), sy(by) - P.ball.z * ppy * 0.6, Math.max(ppy, 11), P.ball.z);
      if (userOff) { const [tx, ty] = toAbs(P.ball.tx, P.ball.ty, playLos(P), playDir(P)); ctx.strokeStyle = 'rgba(255,246,224,0.5)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(sx(tx), sy(ty), ppy * 0.9, 0, Math.PI * 2); ctx.stroke(); }
    } else if (P.phase !== 'pre') {
      const [cx, cy] = agentAbs(P, carrier);
      drawBall(ctx, sx(cx) + r * 0.7, sy(cy) - r * 0.7, ppy * 0.8, 0);
    } else drawBall(ctx, sx(bx), sy(by), ppy, 0);
    // receiver badges
    for (const t of receiverTargets(g)) drawBadge(ctx, t.x, t.y - r - Math.max(9, ppy * 0.9), t.k, Math.max(8, ppy * 0.75));
  }
  // kick animation
  if (g.kickAnim && (g.phase === 'kickoff' || g.phase === 'kickfly')) {
    const ka = g.kickAnim;
    const [x, y, z] = kickBallPos(g, ka);
    ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.beginPath(); ctx.ellipse(sx(x), sy(y), ppy * 0.45, ppy * 0.25, 0, 0, Math.PI * 2); ctx.fill();
    if (ka.kind === 'kickoff' || ka.kind === 'free' || ka.kind === 'punt') drawKickUnits(ctx, g, ka, x, y);
    drawBall(ctx, sx(x), sy(y) - z * ppy * 0.6, ppy * (1 + z * 0.04), z);
  }
  // kick meter
  if (g.phase === 'kick' && g.kick && g.kick.user && !S.settings.autoKick) drawMeter(ctx, g, now);
  // effects
  for (const f of S.fx) {
    const age = (now - f.t0) / 1000;
    if (f.kind === 'hit' && age < 0.35) {
      const [x, y] = [sx(f.x), sy(f.y)];
      ctx.strokeStyle = `rgba(255,246,224,${1 - age / 0.35})`; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(x, y, ppy * (0.8 + age * 6), 0, Math.PI * 2); ctx.stroke();
    }
    if (f.kind === 'td' && age < 1.2) {
      const [x, y] = [sx(f.x), sy(f.y)];
      ctx.strokeStyle = f.c2; ctx.globalAlpha = Math.max(0, 1 - age / 1.2); ctx.lineWidth = 4;
      ctx.beginPath(); ctx.arc(x, y, ppy * (1.5 + age * 14), 0, Math.PI * 2); ctx.stroke();
      for (let i = 0; i < 24; i++) {
        const a = (i / 24) * Math.PI * 2, d = ppy * (1 + age * 11);
        ctx.fillStyle = i % 2 ? f.c1 : f.c2; ctx.globalAlpha = 1 - age / 1.2;
        ctx.fillRect(x + Math.cos(a) * d - 3, y + Math.sin(a) * d - 3, 6, 6);
      }
      ctx.globalAlpha = 1;
    }
  }
  ctx.restore();
}

// Coverage and return units for kicks: the kicking team runs down in a lane; the receiving team sets up, then
// converges with the returner. Positions are procedural (the kick itself is resolved by the rules).
function drawKickUnits(ctx, g, ka, bxA, byA) {
  const dur = kickDur(ka), k = ka.kicking, dir = k === 0 ? 1 : -1;
  const from = k === 0 ? 10 + ka.from : 110 - ka.from;
  const land = k === 0 ? 10 + Math.min(ka.land, 118) : 110 - Math.min(ka.land, 118);
  const u = Math.min(1, ka.t / dur.total);
  const r = Math.max(6, view.ppy * 0.75);
  const jK = jersey(g, k), jR = jersey(g, 1 - k);
  for (let i = 0; i < 10; i++) {
    const lane = 3 + i * (W - 6) / 9;
    const y0 = from - dir * 1, y1 = land - dir * (ka.touchback ? 12 : 5 + (i % 3) * 2);
    const x = lane + (bxA - lane) * u * 0.55, y = y0 + (y1 - y0) * Math.min(1, u * 1.15);
    drawPlayer(ctx, sx(x), sy(y), r, 'D', jK, undefined);
  }
  for (let i = 0; i < 9; i++) {
    const lane = 6 + i * (W - 12) / 8;
    const y0 = land - dir * (8 + (i % 3) * 7);
    const x = lane + (bxA - lane) * u * 0.35, y = y0 + (byA - y0) * Math.max(0, u - 0.5) * 0.8;
    drawPlayer(ctx, sx(x), sy(y), r, 'O', jR, undefined);
  }
  if (ka.t > dur.fly && !ka.touchback) drawPlayer(ctx, sx(bxA), sy(byA), r, 'O', jR, undefined, { ring: true });
}

function line(ctx, y, col, w) {
  ctx.strokeStyle = col; ctx.lineWidth = w; ctx.globalAlpha = 0.9;
  ctx.beginPath(); ctx.moveTo(sx(0), sy(y)); ctx.lineTo(sx(W), sy(y)); ctx.stroke(); ctx.globalAlpha = 1;
}
function arrow(ctx, x0, y0, x1, y1) {
  const a = Math.atan2(y1 - y0, x1 - x0), s = 7;
  ctx.save(); ctx.setLineDash([]); ctx.beginPath();
  ctx.moveTo(x1, y1); ctx.lineTo(x1 - Math.cos(a - 0.5) * s, y1 - Math.sin(a - 0.5) * s);
  ctx.moveTo(x1, y1); ctx.lineTo(x1 - Math.cos(a + 0.5) * s, y1 - Math.sin(a + 0.5) * s); ctx.stroke(); ctx.restore();
}
function drawBall(ctx, x, y, ppy, z) {
  const s = Math.max(3.5, ppy * 0.42) * (1 + z * 0.03);
  ctx.fillStyle = '#7A3E1D'; ctx.strokeStyle = '#2A1408'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.ellipse(x, y, s, s * 0.62, -0.5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.strokeStyle = '#FFF6E0'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x - s * 0.4, y + s * 0.2); ctx.lineTo(x + s * 0.4, y - s * 0.2); ctx.stroke();
}

export function needleAt(t) { return Math.sin(t * 3.6); }

function drawMeter(ctx, g, now) {
  const k = g.kick;
  const w = Math.min(view.cssW - 32, 560), h = 40, x = (view.cssW - w) / 2, y = Math.min(view.cssH - 70, view.cssH * 0.78);
  const tol = Math.max(0.03, kickTolerance(k.kck, k.dist));
  ctx.save();
  ctx.fillStyle = 'rgba(11,10,20,0.88)'; ctx.fillRect(x - 12, y - 46, w + 24, h + 78);
  ctx.fillStyle = '#D4AF37'; ctx.fillRect(x - 12, y - 46, w + 24, 4);
  ctx.fillStyle = '#FFF6E0'; ctx.font = '700 20px Oswald, "Arial Narrow", sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
  ctx.fillText(`${k.kind === 'pat' ? 'TRY' : 'FIELD GOAL'} · ${k.dist} YD`, x + w / 2, y - 18);
  ctx.font = '500 13px Oswald, "Arial Narrow", sans-serif'; ctx.fillStyle = '#D8CFBD';
  ctx.fillText('Stop the needle between the uprights', x + w / 2, y + h + 25);
  const gr = ctx.createLinearGradient(x, 0, x + w, 0);
  gr.addColorStop(0, '#7A2020'); gr.addColorStop(0.5, '#A8862A'); gr.addColorStop(1, '#7A2020');
  ctx.fillStyle = gr; ctx.fillRect(x, y, w, h);
  const gx = x + w / 2 - (tol * w) / 2, gw = tol * w;
  ctx.fillStyle = '#2E8A48'; ctx.fillRect(gx, y, gw, h);
  // goalpost icon: uprights at the edges of the green zone
  ctx.strokeStyle = '#E8C21C'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(gx, y - 8); ctx.lineTo(gx, y + h * 0.55); ctx.lineTo(gx + gw, y + h * 0.55); ctx.lineTo(gx + gw, y - 8); ctx.moveTo(x + w / 2, y + h * 0.55); ctx.lineTo(x + w / 2, y + h); ctx.stroke();
  ctx.strokeStyle = '#FFF6E0'; ctx.lineWidth = 1.5; ctx.strokeRect(x, y, w, h);
  const e = k.frozen !== undefined ? k.frozen : needleAt(k.t);
  const nx = x + w / 2 + (e * w) / 2;
  ctx.fillStyle = '#111111'; ctx.fillRect(nx - 4, y - 10, 8, h + 20);
  ctx.fillStyle = '#FFFFFF'; ctx.fillRect(nx - 2.5, y - 9, 5, h + 18);
  ctx.restore();
}

// 3D mode: the 2D canvas sits on top of the WebGL view and draws only overlays, placed by projection:
// route previews, receiver badges, the kick meter and the replay tag.
export function renderOverlay(ctx, g, S, now, extra = {}) {
  const { cssW, cssH, dpr } = view;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cssW, cssH);
  const P = g.play;
  const showPlay = P && ['pre', 'live', 'result'].includes(g.phase) && (g.phase !== 'result' || P.phase === 'dead');
  if (showPlay && !extra.replay) {
    const userOff = g.user !== null && P.offTeam === g.user;
    if (P.phase === 'pre' && userOff && S.settings.routes !== false) {
      ctx.save(); ctx.setLineDash([7, 6]); ctx.lineWidth = 3; ctx.lineCap = 'round';
      for (const a of P.A) {
        if (a.side !== 'O') continue;
        let pts = a.route;
        const pd = playById(P.offId);
        if (a.role === 'carrierPath') pts = pd.path ? pd.path.map(([dx, y]) => [P.bx + dx, y]) : [[P.bx + pd.mesh[0], pd.mesh[1]], [P.bx + pd.hole[0], pd.hole[1]], [P.bx + pd.hole[0] * 1.15, pd.hole[1] + 4]];
        if (a.role === 'qbKeep') pts = [[P.bx + pd.hole[0], pd.hole[1]], [P.bx + pd.hole[0] * 1.15, pd.hole[1] + 4]];
        if (!pts || a.role === 'stalk') continue;
        const run = a.role === 'carrierPath' || a.role === 'qbKeep';
        const toS = (px, py) => { const [ax, ay] = toAbs(px, py, playLos(P), playDir(P)); return fieldToScreen(ax, ay, 0.05); };
        const sp = [toS(a.x, a.y), ...pts.map(([px, py]) => toS(px, py))];
        for (const [col, w] of [['rgba(10,12,20,0.55)', 6], [run ? 'rgba(255,214,90,0.95)' : 'rgba(255,246,224,0.95)', 3]]) {
          ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(sp[0][0], sp[0][1]);
          for (const q of sp.slice(1)) ctx.lineTo(q[0], q[1]);
          ctx.stroke();
          const e = sp[sp.length - 1], q = sp[sp.length - 2];
          arrow(ctx, q[0], q[1], e[0], e[1]);
        }
      }
      ctx.restore();
    }
    const size = cssW < 500 ? 13 : 12;
    for (const t of receiverTargets(g)) drawBadge(ctx, t.x, t.y - size * 0.6, t.k, size);
    // broadcast ID tag over the ball carrier (fictional players)
    const c = P.A[P.carrier];
    if (c && P.ball.st === 'held' && P.phase !== 'pre' && (P.handed || P.thrown || P.scramble || P.intRet || c.slot !== 'QB')) {
      const [ax, ay] = agentAbs(P, c);
      const [px, py] = fieldToScreen(ax, ay, 3.1);
      const label = `${c.num}  ${String(c.last || '').toUpperCase()}`;
      ctx.save();
      ctx.font = '700 12px Oswald, "Arial Narrow", sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      const w = ctx.measureText(label).width + 14;
      ctx.fillStyle = 'rgba(11,10,20,0.82)'; ctx.fillRect(px - w / 2, py - 9, w, 18);
      ctx.fillStyle = '#FFC233'; ctx.fillRect(px - w / 2, py + 7, w, 2);
      ctx.fillStyle = '#FFF6E0'; ctx.fillText(label, px, py + 0.5);
      ctx.restore();
    }
  }
  if (g.phase === 'kick' && g.kick && g.kick.user && !S.settings.autoKick) drawMeter(ctx, g, now);
  if (extra.replay) {
    ctx.save();
    ctx.font = '900 20px "Arial Black", Impact, sans-serif'; ctx.textBaseline = 'middle';
    const w = ctx.measureText('REPLAY').width + 34;
    ctx.fillStyle = 'rgba(11,10,20,0.85)'; ctx.fillRect(14, 14, w, 36);
    ctx.fillStyle = '#FF3B2F'; ctx.beginPath(); ctx.arc(30, 32, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#FFF6E0'; ctx.fillText('REPLAY', 42, 33);
    ctx.restore();
  }
}
