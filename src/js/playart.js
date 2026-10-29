// Play-call diagrams as small inline SVGs, drawn from the playbook data itself (formations, routes, zones), so
// the art always matches what the sim runs. Offense: circles, routes with arrowheads, the run path in gold.
// Defense: X marks, zone drops as dashed ovals, blitz arrows, man lines.
import { FORMATIONS, ROUTES, OL_X, OL_Y, ZONES, PLAYS, DEFS } from './plays.js';

const VB = { x0: -25, x1: 25, y0: -8.5, y1: 22 };
const sx = (x) => (x - VB.x0).toFixed(1);
const sy = (y) => (VB.y1 - y).toFixed(1);
const pts = (arr) => arr.map(([x, y]) => `${sx(x)},${sy(y)}`).join(' ');

function arrowHead([x0, y0], [x1, y1], col, s = 1.8) {
  const a = Math.atan2(y1 - y0, x1 - x0);
  const p = (ang) => [x1 - Math.cos(ang) * s, y1 - Math.sin(ang) * s];
  return `<polygon points="${pts([[x1, y1], p(a - 0.45), p(a + 0.45)])}" fill="${col}"/>`;
}
function path(arr, col, dash = '', w = 0.9) {
  return `<polyline points="${pts(arr)}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>` + arrowHead(arr[arr.length - 2], arr[arr.length - 1], col);
}
const svg = (body, label) => `<svg class="pa" viewBox="0 0 ${VB.x1 - VB.x0} ${VB.y1 - VB.y0}" role="img" aria-label="${label}" focusable="false"><rect class="pa-bg" x="0" y="0" width="${VB.x1 - VB.x0}" height="${VB.y1 - VB.y0}" rx="2"/><line x1="0" x2="${VB.x1 - VB.x0}" y1="${sy(0)}" y2="${sy(0)}" class="pa-los"/>${body}</svg>`;

const cache = new Map();

export function offenseArt(id) {
  if (cache.has(id)) return cache.get(id);
  const pd = PLAYS.find((p) => p.id === id);
  if (!pd) return '';
  const F = FORMATIONS[pd.form || 'gun'];
  let body = '';
  const ROUTE = 'var(--pa-route)', RUN = 'var(--pa-run)', DOT = 'var(--pa-off)';
  // routes first, players on top
  for (const s of ['X', 'Z', 'SL', 'TE', 'RB']) {
    const r = pd.routes && pd.routes[s];
    const [x, y] = F[s];
    if (s === 'RB' && pd.type === 'run' && pd.carrier === 'RB') continue;
    if (!r || r === 'block') { if (s === 'TE' || s === 'RB') body += `<line x1="${sx(x)}" y1="${sy(y)}" x2="${sx(x)}" y2="${sy(y + 1.6)}" stroke="${ROUTE}" stroke-width="0.8"/><line x1="${sx(x - 0.9)}" y1="${sy(y + 1.6)}" x2="${sx(x + 0.9)}" y2="${sy(y + 1.6)}" stroke="${ROUTE}" stroke-width="0.8"/>`; continue; }
    const R = ROUTES[r];
    const o = x === 0 ? 1 : Math.sign(x);
    const line = [[x, y], ...R.pts(o).map(([dx, dy]) => [x + dx, Math.min(y + dy, 21)])];
    body += path(line, ROUTE, R.blocker ? '1.2 1.2' : '', 0.9);
  }
  if (pd.type === 'run') {
    const c = pd.carrier === 'QB' ? F.QB : F.RB;
    const p = pd.carrier === 'QB' ? [[c[0], c[1]], [pd.hole[0], pd.hole[1]], [pd.hole[0] * 1.15, pd.hole[1] + 5]]
      : pd.path ? [[c[0], c[1]], ...pd.path.map(([dx, y]) => [dx, y])] : [[c[0], c[1]], pd.mesh, pd.hole, [pd.hole[0] * 1.15, pd.hole[1] + 5]];
    body += path(p, RUN, '', 1.3);
    if (pd.pull) { const k = ['LT', 'LG', 'C', 'RG', 'RT'].indexOf(pd.pull); body += path([[OL_X[k], OL_Y], [OL_X[k] + 1, -2.2], [OL_X[k] + 7, -1.6], [OL_X[k] + 9, 0.6]], ROUTE, '1 1', 0.7); }
  }
  if (pd.fake) body += path([[F.RB[0], F.RB[1]], [(pd.mesh || [0, -3])[0] + 1.5, (pd.mesh || [0, -3])[1] + 1.5]], ROUTE, '0.8 0.8', 0.6);
  for (const x of OL_X) body += `<rect x="${(+sx(x) - 0.9).toFixed(1)}" y="${(+sy(OL_Y) - 0.9).toFixed(1)}" width="1.8" height="1.8" rx="0.3" fill="${DOT}"/>`;
  for (const s of ['QB', 'RB', 'X', 'Z', 'SL', 'TE']) { const [x, y] = F[s]; body += `<circle cx="${sx(x)}" cy="${sy(y)}" r="1.15" fill="${s === 'QB' ? 'var(--pa-qb)' : DOT}"/>`; }
  const out = svg(body, `Diagram: ${pd.name}`);
  cache.set(id, out);
  return out;
}

export function defenseArt(id) {
  const key = `d:${id}`;
  if (cache.has(key)) return cache.get(key);
  const dd = DEFS.find((d) => d.id === id);
  if (!dd) return '';
  const F = FORMATIONS.gun, al = dd.align;
  const spots = {
    DL1: [-5.6, 1], DL2: [-1.7, 1], DL3: [1.7, 1], DL4: [5.6, 1], LB1: [-4.5, al.LB], LB2: [0, al.LB], LB3: [4.5, al.LB],
    CB1: [F.X[0] + 0.5, al.CB], CB2: [F.Z[0] - 0.5, al.CB], S1: [-3, al.S1], S2: [7, al.S2],
  };
  const COV = 'var(--pa-cov)', BLITZ = 'var(--pa-blitz)';
  let body = '';
  for (const s in dd.roles) {
    const [kind, arg] = dd.roles[s].split(':');
    const [x, y] = spots[s];
    if (kind === 'zone') { const [zx, zy, r] = ZONES[arg]; body += `<ellipse cx="${sx(zx)}" cy="${sy(zy)}" rx="${(r * 0.62).toFixed(1)}" ry="${(r * 0.38).toFixed(1)}" class="pa-zone"/><line x1="${sx(x)}" y1="${sy(y)}" x2="${sx(zx)}" y2="${sy(zy)}" stroke="${COV}" stroke-width="0.5" stroke-dasharray="0.8 0.8"/>`; }
    else if (kind === 'rush') body += path([[x, y], [x * 0.6, -1.5], [x * 0.3, -4]], BLITZ, '', 0.9);
    else if (kind === 'man') { const t = F[arg] || F.RB; body += `<line x1="${sx(x)}" y1="${sy(y)}" x2="${sx(t[0])}" y2="${sy(t[1] + 0.6)}" stroke="${COV}" stroke-width="0.6"/>`; }
    else if (kind === 'spy') body += path([[x, y], [x * 0.5, y * 0.4]], COV, '0.6 0.6', 0.7);
    else if (kind === 'fit') body += path([[x, y], [x * 0.85, 0.8]], BLITZ, '', 0.8);
  }
  for (const s of ['DL1', 'DL2', 'DL3', 'DL4']) body += path([[spots[s][0], 1], [spots[s][0], -1.6]], BLITZ, '', 0.7);
  // a ghost offense for reference
  for (const x of OL_X) body += `<rect x="${(+sx(x) - 0.7).toFixed(1)}" y="${(+sy(OL_Y) - 0.7).toFixed(1)}" width="1.4" height="1.4" rx="0.3" class="pa-ghost"/>`;
  for (const s of ['QB', 'RB', 'X', 'Z', 'SL', 'TE']) { const [x, y] = F[s]; body += `<circle cx="${sx(x)}" cy="${sy(y)}" r="0.8" class="pa-ghost"/>`; }
  for (const s in spots) { const [x, y] = spots[s]; body += `<g transform="translate(${sx(x)},${sy(y)})"><path d="M-1.1,-1.1L1.1,1.1M1.1,-1.1L-1.1,1.1" stroke="var(--pa-def)" stroke-width="0.75" stroke-linecap="round"/></g>`; }
  const out = svg(body, `Diagram: ${dd.name}`);
  cache.set(key, out);
  return out;
}
