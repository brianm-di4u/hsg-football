// Fictional roster generator. Every name is a random first + last combination; no real players.
import { makeRng, hashStr, clamp } from './rng.js';

const FIRST = ('Aaron Abel Adrian Alex Andre Arlo Asa Austin Beau Ben Blake Brady Brooks Bryce Caleb Cam Carter Cash Cole Colt Cooper Dalton Damon ' +
  'Dane Darius Davis Deacon Dean Desmond Drew Eli Elijah Emmett Ethan Evan Ezra Finn Gage Gavin Grady Grant Hayes Hudson Isaac Isaiah Jace Jalen ' +
  'Jamal Jasper Javon Jett Jonah Jude Kade Keegan Kendrick Knox Lane Landry Levi Logan Luca Malik Marcus Mason Miles Nash Nate Noah Omar Owen ' +
  'Pierce Quinn Reed Reid Rhett Rowan Ryder Sawyer Silas Tate Theo Trace Tristan Tucker Wade Weston Wyatt Xavier Zane').split(' ');
const LAST = ('Abbott Alder Ashby Bailey Barlow Beckett Bellamy Birch Bishop Blackwell Boone Bowen Brandt Briggs Burke Calloway Carver Chandler Clay ' +
  'Colter Conley Crane Cross Dawson Delacroix Dorsey Drummond Easley Ellison Emery Farrow Fenwick Fletcher Ford Frost Garrett Gentry Greer Hadley ' +
  'Hale Harlan Hartley Hayden Holloway Hood Ingram Jarvis Kellar Kemp Kincaid Knox Lambert Larkin Lowell Maddox Marlow Mercer Merritt Monroe Nolan ' +
  'Oakley Orr Parrish Pace Pruitt Quarles Radford Ramsey Redding Rhodes Ridley Rowe Sawyer Shelton Sinclair Slade Stroud Sutter Talley Thorne Tolliver ' +
  'Vance Vaughn Wakefield Walsh Warrick Webb Whitlock Wilder Winslow Woodard Yates York').split(' ');

// position: count on the roster, rating offsets from the player's base, number ranges
export const POSITIONS = {
  QB: { n: 2, off: { thr: 9, acc: 7, awr: 5, spd: -5, str: -10, agi: -1, hnd: -12, tkl: -30, cov: -30, blk: -25 }, nums: [[1, 19]] },
  RB: { n: 2, off: { spd: 8, agi: 9, str: 1, hnd: -3, thr: -30, acc: -30, tkl: -20, cov: -25, blk: -6 }, nums: [[20, 49]] },
  WR: { n: 4, off: { spd: 10, agi: 7, hnd: 9, str: -10, thr: -30, acc: -30, tkl: -25, cov: -15, blk: -10 }, nums: [[1, 19], [80, 89]] },
  TE: { n: 2, off: { hnd: 3, blk: 3, str: 5, spd: -4, agi: -4, thr: -30, acc: -30, tkl: -15, cov: -20 }, nums: [[80, 89], [40, 49]] },
  OL: { n: 7, off: { str: 11, blk: 11, spd: -18, agi: -13, hnd: -30, thr: -30, acc: -30, tkl: -10, cov: -30 }, nums: [[50, 79]] },
  DL: { n: 6, off: { str: 11, tkl: 4, spd: -9, agi: -3, hnd: -25, thr: -30, acc: -30, cov: -20, blk: -10 }, nums: [[90, 99], [50, 79]] },
  LB: { n: 4, off: { tkl: 9, str: 3, spd: -2, cov: -4, awr: 4, hnd: -18, thr: -30, acc: -30, blk: -10 }, nums: [[30, 59]] },
  CB: { n: 3, off: { spd: 10, cov: 10, agi: 7, tkl: -7, str: -9, hnd: -6, thr: -30, acc: -30, blk: -20 }, nums: [[20, 39], [1, 19]] },
  S:  { n: 3, off: { spd: 5, cov: 7, tkl: 3, awr: 5, str: -4, hnd: -8, thr: -30, acc: -30, blk: -20 }, nums: [[20, 49]] },
  K:  { n: 1, off: { kck: 14, spd: -14, str: -18, agi: -12, hnd: -25, thr: -25, acc: -25, tkl: -30, cov: -30, blk: -30 }, nums: [[1, 19], [30, 49]] },
};
const ATTRS = ['spd', 'str', 'agi', 'hnd', 'thr', 'acc', 'tkl', 'cov', 'blk', 'awr', 'kck'];
const OVR_W = {
  QB: { thr: 3, acc: 4, awr: 2, spd: 1 }, RB: { spd: 3, agi: 3, str: 2, hnd: 1 }, WR: { spd: 3, hnd: 3, agi: 2 },
  TE: { hnd: 2, blk: 2, str: 1, spd: 1 }, OL: { blk: 3, str: 3, awr: 1 }, DL: { str: 3, tkl: 2, agi: 1, spd: 1 },
  LB: { tkl: 3, spd: 2, cov: 1, awr: 2, str: 1 }, CB: { cov: 3, spd: 3, agi: 1 }, S: { cov: 2, spd: 2, tkl: 2, awr: 1 }, K: { kck: 1 },
};
const YR_ADJ = { So: -4, Jr: 0, Sr: 4 };
const YEARS = ['So', 'Jr', 'Sr'];

export function ovr(p) {
  const w = OVR_W[p.pos]; let s = 0, n = 0;
  for (const k in w) { s += p.r[k] * w[k]; n += w[k]; }
  return Math.round(s / n);
}

function makePlayer(rng, pos, base, yr, used) {
  const spec = POSITIONS[pos];
  const b = base + YR_ADJ[yr] + rng.normal(0, 4.5);
  const r = {};
  for (const a of ATTRS) r[a] = Math.round(clamp(b + (spec.off[a] || 0) + rng.normal(0, 5), 25, 97));
  let num = 0;
  for (let i = 0; i < 40 && (!num || used.has(num)); i++) { const [lo, hi] = rng.pick(spec.nums); num = lo + rng.int(hi - lo + 1); }
  used.add(num);
  const p = { id: '', first: rng.pick(FIRST), last: rng.pick(LAST), num, pos, yr, r };
  p.ovr = ovr(p);
  return p;
}

// Deterministic per team id, base and year.
export function generateRoster(teamId, base, year) {
  const rng = makeRng(hashStr(`${teamId}:${year}`));
  const used = new Set();
  const players = [];
  for (const pos in POSITIONS) {
    for (let i = 0; i < POSITIONS[pos].n; i++) players.push(makePlayer(rng, pos, base, rng.pick(YEARS), used));
  }
  players.forEach((p, i) => { p.id = `${teamId}-${year}-${i}`; });
  return players;
}

// Starters by position, best overall first.
export function depth(players) {
  const d = {};
  for (const pos in POSITIONS) d[pos] = players.filter((p) => p.pos === pos).sort((a, b) => b.ovr - a.ovr);
  return d;
}

export function starters(players) {
  const d = depth(players);
  const pick = (pos, i) => d[pos][i] || d[pos][d[pos].length - 1];
  return {
    QB: pick('QB', 0), RB: pick('RB', 0), X: pick('WR', 0), Z: pick('WR', 1), SL: pick('WR', 2), TE: pick('TE', 0),
    LT: pick('OL', 0), LG: pick('OL', 1), C: pick('OL', 2), RG: pick('OL', 3), RT: pick('OL', 4),
    DL1: pick('DL', 0), DL2: pick('DL', 1), DL3: pick('DL', 2), DL4: pick('DL', 3),
    LB1: pick('LB', 0), LB2: pick('LB', 1), LB3: pick('LB', 2),
    CB1: pick('CB', 0), CB2: pick('CB', 1), S1: pick('S', 0), S2: pick('S', 1), K: pick('K', 0),
  };
}

const avg = (arr) => arr.reduce((s, x) => s + x, 0) / arr.length;
export function composite(players) {
  const s = starters(players);
  const off = s.QB.ovr * 0.3 + s.RB.ovr * 0.12 + avg([s.X.ovr, s.Z.ovr, s.SL.ovr]) * 0.25 + s.TE.ovr * 0.08 + avg([s.LT, s.LG, s.C, s.RG, s.RT].map((p) => p.ovr)) * 0.25;
  const def = avg([s.DL1, s.DL2, s.DL3, s.DL4].map((p) => p.ovr)) * 0.3 + avg([s.LB1, s.LB2, s.LB3].map((p) => p.ovr)) * 0.25 + avg([s.CB1.ovr, s.CB2.ovr]) * 0.25 + avg([s.S1.ovr, s.S2.ovr]) * 0.2;
  return { off: Math.round(off), def: Math.round(def), ovr: Math.round((off + def) / 2) };
}

// Next season: seniors graduate, the rest grow, new sophomores refill each position.
export function progressRoster(teamId, base, players, year) {
  const rng = makeRng(hashStr(`${teamId}:grow:${year}`));
  const kept = players.filter((p) => p.yr !== 'Sr').map((p) => {
    const r = {};
    for (const a of ATTRS) r[a] = Math.round(clamp(p.r[a] + rng.normal(3, 2), 25, 97));
    const np = { ...p, yr: p.yr === 'So' ? 'Jr' : 'Sr', r };
    np.ovr = ovr(np);
    return np;
  });
  const used = new Set(kept.map((p) => p.num));
  const out = [...kept];
  for (const pos in POSITIONS) {
    let have = out.filter((p) => p.pos === pos).length;
    while (have < POSITIONS[pos].n) { out.push(makePlayer(rng, pos, base, 'So', used)); have++; }
  }
  out.forEach((p, i) => { p.id = `${teamId}-${year}-${i}`; });
  return out;
}
