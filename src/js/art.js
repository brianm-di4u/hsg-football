// Procedural art: original geometric mascots (from schools.json mascotConcept text; no logos), backdrops
// (skyline / pine ridge / lake), the Spa City Cup and confetti. Sprites are cached per size.
import { teamDef, onColor } from './data.js';

const cache = new Map();
export function clearArtCache() { cache.clear(); }

function mk(w, h) { const c = document.createElement('canvas'); c.width = Math.max(1, Math.round(w)); c.height = Math.max(1, Math.round(h)); return c; }
const P = (ctx, pts, fill, stroke, lw) => {
  ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath();
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw || 2; ctx.lineJoin = 'round'; ctx.stroke(); }
};

// Mascot on a 100×100 unit badge. fg = main shape color, bg = badge color, ln = outline.
const MASCOTS = {
  helmet(ctx, fg, bg, ln) { // crested helmet in profile: a half-dome with a tall arched crest of stacked chevrons
    // crest: an arched band over the dome, notched into chevrons
    ctx.beginPath(); ctx.arc(46, 64, 40, Math.PI * 1.02, Math.PI * 1.9); ctx.arc(46, 64, 30, Math.PI * 1.9, Math.PI * 1.02, true); ctx.closePath();
    ctx.fillStyle = fg; ctx.fill(); ctx.strokeStyle = ln; ctx.lineWidth = 2; ctx.stroke();
    for (let i = 1; i < 7; i++) {
      const a = Math.PI * (1.02 + i * 0.125);
      const ox = 46 + Math.cos(a) * 41, oy = 64 + Math.sin(a) * 41, mx = 46 + Math.cos(a + 0.06) * 35, my = 64 + Math.sin(a + 0.06) * 35;
      const ix = 46 + Math.cos(a) * 29, iy = 64 + Math.sin(a) * 29;
      ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(mx, my); ctx.lineTo(ix, iy); ctx.strokeStyle = bg; ctx.lineWidth = 3; ctx.stroke();
    }
    // dome with a face opening and a cheek guard
    ctx.beginPath(); ctx.moveTo(24, 70); ctx.arc(46, 70, 22, Math.PI, 0); ctx.lineTo(74, 70); ctx.lineTo(74, 84); ctx.lineTo(60, 84); ctx.lineTo(58, 74); ctx.lineTo(24, 74); ctx.closePath();
    ctx.fillStyle = fg; ctx.fill(); ctx.strokeStyle = ln; ctx.lineWidth = 2.5; ctx.stroke();
    P(ctx, [[56, 60], [70, 60], [70, 66], [56, 66]], bg);
  },
  ram(ctx, fg, bg, ln) { // shield face + two spiral horns from concentric arcs
    P(ctx, [[38, 30], [62, 30], [66, 52], [50, 82], [34, 52]], fg, ln, 2.5);
    for (const s of [-1, 1]) {
      const cx = 50 + s * 22, cy = 38;
      ctx.strokeStyle = fg; ctx.lineCap = 'round';
      for (let k = 0; k < 3; k++) { ctx.lineWidth = 6 - k * 1.5; ctx.beginPath(); ctx.arc(cx, cy, 14 - k * 4.5, s > 0 ? -Math.PI * 0.9 : -Math.PI * 0.1, s > 0 ? Math.PI * 0.9 : Math.PI * 1.1, s < 0); ctx.stroke(); }
      ctx.strokeStyle = ln; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(cx, cy, 16.5, 0, Math.PI * 2); ctx.stroke();
    }
    P(ctx, [[42, 48], [47, 50], [42, 52]], bg); P(ctx, [[58, 48], [53, 50], [58, 52]], bg);
    P(ctx, [[45, 70], [55, 70], [50, 76]], bg);
  },
  wolf(ctx, fg, bg, ln) { // three-quarter wolf from wedges: two ears, long muzzle, notch eye
    P(ctx, [[30, 44], [36, 14], [48, 38]], fg, ln, 2);
    P(ctx, [[48, 36], [60, 12], [64, 40]], fg, ln, 2);
    P(ctx, [[26, 50], [46, 34], [70, 40], [86, 62], [60, 66], [46, 82], [32, 70]], fg, ln, 2.5);
    P(ctx, [[48, 50], [58, 48], [54, 53]], bg);
    P(ctx, [[80, 60], [87, 63], [81, 66]], ln);
  },
  cobra(ctx, fg, bg, ln) { // raised cobra: teardrop hood, diamond head, forked tongue
    ctx.beginPath(); ctx.moveTo(50, 20); ctx.bezierCurveTo(82, 34, 78, 76, 50, 86); ctx.bezierCurveTo(22, 76, 18, 34, 50, 20); ctx.closePath();
    ctx.fillStyle = fg; ctx.fill(); ctx.strokeStyle = ln; ctx.lineWidth = 2.5; ctx.stroke();
    P(ctx, [[50, 30], [62, 44], [50, 58], [38, 44]], bg, ln, 1.5);
    P(ctx, [[45, 42], [48, 44], [45, 46]], fg); P(ctx, [[55, 42], [52, 44], [55, 46]], fg);
    ctx.strokeStyle = ln; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(50, 58); ctx.lineTo(50, 66); ctx.moveTo(50, 66); ctx.lineTo(46, 71); ctx.moveTo(50, 66); ctx.lineTo(54, 71); ctx.stroke();
    for (let i = 0; i < 3; i++) P(ctx, [[50, 66 + i * 6], [56, 69 + i * 6], [50, 72 + i * 6], [44, 69 + i * 6]], bg);
  },
  eagle(ctx, fg, bg, ln) { // eagle head in profile: hooked beak, swept crest of three blades, round eye
    ctx.beginPath(); ctx.moveTo(26, 78); ctx.bezierCurveTo(24, 48, 40, 28, 62, 30); ctx.lineTo(80, 40); ctx.lineTo(84, 54); ctx.lineTo(74, 50); ctx.lineTo(64, 58); ctx.bezierCurveTo(60, 70, 52, 78, 26, 78); ctx.closePath();
    ctx.fillStyle = fg; ctx.fill(); ctx.strokeStyle = ln; ctx.lineWidth = 2.5; ctx.stroke();
    P(ctx, [[66, 38], [86, 44], [82, 58], [74, 50]], bg, ln, 1.5);
    for (let i = 0; i < 3; i++) P(ctx, [[34 - i * 3, 46 + i * 8], [12 - i * 2, 40 + i * 12], [30 - i * 3, 54 + i * 8]], fg, ln, 1.5);
    ctx.beginPath(); ctx.arc(60, 42, 4, 0, Math.PI * 2); ctx.fillStyle = bg; ctx.fill();
    ctx.beginPath(); ctx.arc(61, 42, 1.8, 0, Math.PI * 2); ctx.fillStyle = ln; ctx.fill();
  },
  lion(ctx, fg, bg, ln) { // hexagon face inside a ring of twelve flame points
    const pts = [];
    for (let i = 0; i < 24; i++) { const a = (i / 24) * Math.PI * 2 - Math.PI / 2, r = i % 2 ? 30 : 42; pts.push([50 + Math.cos(a) * r, 52 + Math.sin(a) * r]); }
    P(ctx, pts, fg, ln, 2);
    const hex = []; for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2 + Math.PI / 6; hex.push([50 + Math.cos(a) * 22, 52 + Math.sin(a) * 22]); }
    P(ctx, hex, bg, ln, 2);
    P(ctx, [[40, 46], [46, 48], [40, 50]], fg); P(ctx, [[60, 46], [54, 48], [60, 50]], fg);
    P(ctx, [[44, 58], [56, 58], [50, 64]], fg);
  },
  imp(ctx, fg, bg, ln) { // friendly imp mark: pointed-ear shield, two short horn wedges, pitchfork-tail swash; no face
    P(ctx, [[28, 30], [40, 38], [60, 38], [72, 30], [70, 56], [50, 80], [30, 56]], fg, ln, 2.5);
    P(ctx, [[38, 38], [34, 20], [46, 36]], fg, ln, 1.5); P(ctx, [[62, 38], [66, 20], [54, 36]], fg, ln, 1.5);
    ctx.strokeStyle = fg; ctx.lineWidth = 4; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(60, 74); ctx.bezierCurveTo(78, 86, 88, 72, 82, 60); ctx.stroke();
    P(ctx, [[82, 52], [88, 62], [76, 62]], fg);
    P(ctx, [[40, 50], [60, 50], [56, 60], [44, 60]], bg);
  },
  miner(ctx, fg, bg, ln) { // fictional Miners: crossed pickaxes over a hexagonal crystal
    for (const s of [-1, 1]) {
      ctx.save(); ctx.translate(50, 54); ctx.rotate(s * 0.75);
      P(ctx, [[-3, -30], [3, -30], [3, 32], [-3, 32]], fg, ln, 1.5);
      P(ctx, [[-22, -26], [0, -36], [22, -26], [0, -30]], fg, ln, 1.5);
      ctx.restore();
    }
    P(ctx, [[50, 34], [62, 44], [62, 62], [50, 72], [38, 62], [38, 44]], bg, ln, 2);
    P(ctx, [[50, 34], [56, 52], [50, 72], [44, 52]], fg);
  },
  heron(ctx, fg, bg, ln) { // fictional Herons: an S-curved neck, a long beak, a teardrop body
    ctx.strokeStyle = fg; ctx.lineWidth = 7; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(44, 64); ctx.bezierCurveTo(30, 44, 64, 40, 50, 22); ctx.stroke();
    P(ctx, [[50, 18], [80, 24], [52, 26]], fg, ln, 1.5);
    ctx.beginPath(); ctx.ellipse(50, 70, 22, 12, -0.3, 0, Math.PI * 2); ctx.fillStyle = fg; ctx.fill(); ctx.strokeStyle = ln; ctx.lineWidth = 2; ctx.stroke();
    ctx.strokeStyle = fg; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(50, 80); ctx.lineTo(48, 94); ctx.stroke();
    ctx.beginPath(); ctx.arc(52, 22, 2, 0, Math.PI * 2); ctx.fillStyle = bg; ctx.fill();
  },
  comet(ctx, fg, bg, ln) { // fictional Comets: a bright head with three swept tail streaks
    for (let i = 0; i < 3; i++) P(ctx, [[60, 34 + i * 8], [14, 18 + i * 24], [58, 46 + i * 6]], i === 1 ? bg : fg, ln, 1.2);
    ctx.beginPath(); ctx.arc(64, 46, 18, 0, Math.PI * 2); ctx.fillStyle = fg; ctx.fill(); ctx.strokeStyle = ln; ctx.lineWidth = 2.5; ctx.stroke();
    P(ctx, [[64, 34], [67, 43], [76, 46], [67, 49], [64, 58], [61, 49], [52, 46], [61, 43]], bg);
  },
};

// A round badge with the mascot: team primary background, secondary shapes.
export function mascotSprite(teamId, size, opts = {}) {
  const t = teamDef(teamId);
  const key = `m:${teamId}:${size}:${opts.plain ? 1 : 0}`;
  if (cache.has(key)) return cache.get(key);
  const c = mk(size, size), ctx = c.getContext('2d');
  ctx.scale(size / 100, size / 100);
  const { primary, secondary, accent } = t.colors;
  if (!opts.plain) {
    ctx.beginPath(); ctx.arc(50, 50, 48, 0, Math.PI * 2); ctx.fillStyle = primary; ctx.fill();
    ctx.lineWidth = 3; ctx.strokeStyle = secondary; ctx.stroke();
  }
  const fg = opts.plain ? primary : secondary;
  const ln = opts.plain ? secondary : (onColor(secondary) === '#111111' ? '#111111' : accent);
  ctx.save(); ctx.translate(50, 50); ctx.scale(0.8, 0.8); ctx.translate(-50, -50);
  (MASCOTS[t.mascotKind] || MASCOTS.comet)(ctx, fg, opts.plain ? '#FFFFFF' : primary, ln);
  ctx.restore();
  cache.set(key, c);
  return c;
}

export function mascotDataURL(teamId, size) { return mascotSprite(teamId, size).toDataURL(); }

// ---- Backdrops ------------------------------------------------------------------------------
// Generic silhouettes (style-guide recipes): the Arlington's twin towers, the Medical Arts setbacks.
function skyline(ctx, w, h, base, col, win) {
  ctx.fillStyle = col;
  const u = Math.min(w / 40, h / 10);
  const x0 = w * 0.5 - u * 16;
  // Arlington: a wide symmetrical block with two taller towers.
  ctx.fillRect(x0, base - u * 4, u * 14, u * 4);
  for (const tx of [x0 + u * 2, x0 + u * 10]) {
    ctx.fillRect(tx, base - u * 7, u * 2.2, u * 7);
    ctx.beginPath(); ctx.moveTo(tx - u * 0.2, base - u * 7); ctx.lineTo(tx + u * 1.1, base - u * 8.4); ctx.lineTo(tx + u * 2.4, base - u * 7); ctx.fill();
  }
  // Medical Arts: a tall slab narrowing in setbacks.
  const mx = x0 + u * 19;
  ctx.fillRect(mx, base - u * 6, u * 5, u * 6); ctx.fillRect(mx + u * 0.6, base - u * 8.5, u * 3.8, u * 2.6); ctx.fillRect(mx + u * 1.2, base - u * 10, u * 2.6, u * 1.6);
  ctx.fillRect(mx + u * 2.2, base - u * 11, u * 0.6, u * 1);
  // low town blocks
  for (let i = 0; i < 9; i++) { const bw = u * (2 + (i * 7) % 3), bh = u * (1.4 + ((i * 5) % 4) * 0.5); ctx.fillRect(x0 - u * 12 + i * u * 2.6, base - bh, bw, bh); ctx.fillRect(mx + u * 6 + i * u * 2.2, base - bh * 0.8, bw * 0.8, bh * 0.8); }
  ctx.fillStyle = win;
  for (let y = base - u * 6.5; y < base - u * 0.5; y += u * 0.9) for (let x = mx + u * 0.6; x < mx + u * 4.6; x += u * 0.9) if (((x * 7 + y * 3) | 0) % 3) ctx.fillRect(x, y, u * 0.3, u * 0.4);
}
function pines(ctx, w, h, base, col) {
  ctx.fillStyle = col;
  ctx.beginPath(); ctx.moveTo(0, base);
  for (let x = 0; x <= w; x += w / 60) ctx.lineTo(x, base - h * (0.05 + 0.04 * Math.sin(x / w * 7) + 0.03 * Math.sin(x / w * 19)));
  ctx.lineTo(w, base); ctx.fill();
  for (let i = 0; i < 70; i++) {
    const x = (i * 97.3) % w, s = h * (0.04 + ((i * 13) % 7) * 0.008), y = base - h * (0.05 + 0.04 * Math.sin(x / w * 7));
    ctx.beginPath(); ctx.moveTo(x, y - s * 2.2); ctx.lineTo(x + s * 0.6, y); ctx.lineTo(x - s * 0.6, y); ctx.fill();
  }
}

// Night stadium scene for the title, splash and champion screens.
export function drawBackdrop(ctx, w, h, opts = {}) {
  const night = opts.theme !== 'day';
  const kind = opts.kind || 'skyline';
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  if (night) { sky.addColorStop(0, '#0B0A14'); sky.addColorStop(0.6, '#1F1C2E'); sky.addColorStop(1, '#2A2440'); }
  else { sky.addColorStop(0, '#8FB9D9'); sky.addColorStop(0.7, '#E6D7B5'); sky.addColorStop(1, '#E6D7B5'); }
  ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h);
  if (night) {
    ctx.fillStyle = 'rgba(216,207,189,0.8)';
    for (let i = 0; i < 90; i++) { const x = (i * 211.7) % w, y = ((i * 97.1) % (h * 0.45)); ctx.fillRect(x, y, i % 7 ? 1 : 2, i % 7 ? 1 : 2); }
  }
  const base = h * 0.66;
  const far = night ? '#2B2740' : '#B8A98A', near = night ? '#191624' : '#8C7B5E';
  if (kind === 'skyline') skyline(ctx, w, h, base, far, night ? 'rgba(212,175,55,0.55)' : 'rgba(255,255,255,0.4)');
  else pines(ctx, w, h, base, far);
  if (kind === 'lake' || opts.lake) {
    const lg = ctx.createLinearGradient(0, base - h * 0.02, 0, base + h * 0.05);
    lg.addColorStop(0, night ? '#1E3550' : '#4C8FA8'); lg.addColorStop(1, night ? '#141E30' : '#1E4E79');
    ctx.fillStyle = lg; ctx.fillRect(0, base - h * 0.02, w, h * 0.06);
    ctx.fillStyle = night ? 'rgba(79,195,255,0.25)' : 'rgba(255,255,255,0.35)';
    for (let i = 0; i < 30; i++) ctx.fillRect((i * 133) % w, base + ((i * 17) % 20) / 20 * h * 0.03, w * 0.03, 1.5);
  }
  pines(ctx, w, h * 0.7, base + h * 0.02, near);
  // stadium: bleachers + light towers
  const sb = h * 0.72;
  ctx.fillStyle = night ? '#24202F' : '#6E6250';
  ctx.beginPath(); ctx.moveTo(w * 0.04, h); ctx.lineTo(w * 0.12, sb); ctx.lineTo(w * 0.88, sb); ctx.lineTo(w * 0.96, h); ctx.fill();
  const cols = opts.colors || ['#D4AF37', '#4FC3FF'];
  for (let r = 0; r < 7; r++) {
    const y = sb + (r + 0.6) * (h - sb) / 8, x0 = w * 0.12 - (w * 0.08) * (r / 7), x1 = w * 0.88 + (w * 0.08) * (r / 7);
    for (let x = x0 + 4; x < x1 - 4; x += Math.max(5, w / 140)) {
      const k = ((x * 13 + r * 31) | 0) % 5;
      ctx.fillStyle = k < 2 ? cols[0] : k < 4 ? cols[1] : (night ? '#3A3550' : '#F5F1E6');
      ctx.globalAlpha = 0.85; ctx.fillRect(x, y, 2.5, 2.5);
    }
  }
  ctx.globalAlpha = 1;
  for (const tx of [w * 0.1, w * 0.9]) {
    ctx.fillStyle = night ? '#3A3550' : '#5A4C38';
    ctx.fillRect(tx - 2, h * 0.3, 4, h * 0.45);
    ctx.fillRect(tx - 18, h * 0.28, 36, 10);
    if (night) {
      const g = ctx.createRadialGradient(tx, h * 0.29, 2, tx, h * 0.29, h * 0.5);
      g.addColorStop(0, 'rgba(255,246,224,0.55)'); g.addColorStop(0.2, 'rgba(255,246,224,0.12)'); g.addColorStop(1, 'rgba(255,246,224,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#FFF6E0'; for (let i = 0; i < 4; i++) ctx.fillRect(tx - 15 + i * 8, h * 0.28 + 2, 6, 5);
    }
  }
  // field glow
  const fg = ctx.createLinearGradient(0, h * 0.86, 0, h);
  fg.addColorStop(0, night ? '#1E5B3A' : '#3E8A4F'); fg.addColorStop(1, night ? '#123A25' : '#2E6A3C');
  ctx.fillStyle = fg;
  ctx.beginPath(); ctx.moveTo(w * 0.16, h); ctx.lineTo(w * 0.24, h * 0.88); ctx.lineTo(w * 0.76, h * 0.88); ctx.lineTo(w * 0.84, h); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 1;
  for (let i = 1; i < 10; i++) { const u = i / 10; ctx.beginPath(); ctx.moveTo(w * (0.16 + 0.68 * u), h); ctx.lineTo(w * (0.24 + 0.52 * u), h * 0.88); ctx.stroke(); }
}

// Split-diagonal rivalry field (style guide D14).
export function drawSplit(ctx, w, h, a, b) {
  const A = teamDef(a).colors, B = teamDef(b).colors;
  ctx.fillStyle = A.primary; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(w * 0.62, 0); ctx.lineTo(w * 0.38, h); ctx.lineTo(0, h); ctx.fill();
  ctx.fillStyle = B.primary; ctx.beginPath(); ctx.moveTo(w * 0.62, 0); ctx.lineTo(w, 0); ctx.lineTo(w, h); ctx.lineTo(w * 0.38, h); ctx.fill();
  ctx.strokeStyle = A.secondary; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(w * 0.6, 0); ctx.lineTo(w * 0.36, h); ctx.stroke();
  ctx.strokeStyle = B.secondary; ctx.beginPath(); ctx.moveTo(w * 0.64, 0); ctx.lineTo(w * 0.4, h); ctx.stroke();
}

// The Spa City Cup (invented): a stepped plinth and a dome cup (style-guide hook D15, generic dome).
export function drawCup(ctx, cx, base, s, col = '#D4AF37') {
  const dark = '#7C5A2E';
  ctx.fillStyle = dark; ctx.fillRect(cx - s * 0.5, base - s * 0.14, s, s * 0.14);
  ctx.fillStyle = '#5E4B3C'; ctx.fillRect(cx - s * 0.4, base - s * 0.26, s * 0.8, s * 0.12);
  ctx.fillStyle = col;
  ctx.fillRect(cx - s * 0.08, base - s * 0.5, s * 0.16, s * 0.24);
  ctx.beginPath(); ctx.moveTo(cx - s * 0.32, base - s * 0.86); ctx.quadraticCurveTo(cx - s * 0.3, base - s * 0.5, cx, base - s * 0.5); ctx.quadraticCurveTo(cx + s * 0.3, base - s * 0.5, cx + s * 0.32, base - s * 0.86); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.arc(cx, base - s * 0.86, s * 0.2, Math.PI, 0); ctx.fill();
  ctx.fillRect(cx - s * 0.02, base - s * 1.12, s * 0.04, s * 0.08);
  ctx.strokeStyle = dark; ctx.lineWidth = Math.max(1, s * 0.012);
  for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(cx + i * s * 0.05, base - s * 1.04); ctx.lineTo(cx + i * s * 0.1, base - s * 0.86); ctx.stroke(); }
  ctx.lineWidth = s * 0.03; ctx.strokeStyle = col;
  for (const sgn of [-1, 1]) { ctx.beginPath(); ctx.arc(cx + sgn * s * 0.34, base - s * 0.72, s * 0.08, -Math.PI / 2, Math.PI / 2, sgn < 0); ctx.stroke(); }
  ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.fillRect(cx - s * 0.2, base - s * 0.8, s * 0.04, s * 0.2);
}

export function makeConfetti(n, w, colors, seed = 1) {
  const out = []; let s = seed;
  const r = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < n; i++) out.push({ x: r() * w, y: -r() * 300, vx: (r() - 0.5) * 40, vy: 60 + r() * 120, rot: r() * 6, vr: (r() - 0.5) * 8, c: colors[i % colors.length], s: 4 + r() * 5 });
  return out;
}
export function drawConfetti(ctx, parts, t) {
  for (const p of parts) {
    const y = p.y + p.vy * t, x = p.x + p.vx * t + Math.sin(t * 2 + p.rot) * 10;
    ctx.save(); ctx.translate(x, y); ctx.rotate(p.rot + p.vr * t); ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); ctx.restore();
  }
}
