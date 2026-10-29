#!/usr/bin/env node
// Balance checker: runs the real play sim (src/js/sim.js) headless and prints outcome distributions,
// then plays whole AI-vs-AI games through rules.js. PRD AC42.
//   node tools/balance.mjs [--plays 300] [--games 40] [--quarter 12] [--matrix]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
globalThis.SCHOOLS = JSON.parse(fs.readFileSync(path.join(here, '../data/schools.json'), 'utf8'));
globalThis.FACTS = JSON.parse(fs.readFileSync(path.join(here, '../data/facts.json'), 'utf8'));
const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? Number(process.argv[i + 1]) : d; };

const { makeRng } = await import('../src/js/rng.js');
const { generateRoster, starters } = await import('../src/js/roster.js');
const { PLAYS, DEFS } = await import('../src/js/plays.js');
const { createPlay, runToEnd, HASH } = await import('../src/js/sim.js');

const rng = makeRng(12345);
const A = starters(generateRoster('bal-a', 66, 2026));
const B = starters(generateRoster('bal-b', 66, 2026));
const N = arg('--plays', 300);

function runPlays(offId, defId, n) {
  const s = { n: 0, yds: 0, comp: 0, att: 0, sack: 0, int: 0, td: 0, t: 0, capped: 0, fum: 0, neg: 0, big: 0, inc: 0 };
  for (let i = 0; i < n; i++) {
    const spot = { bx: rng.pick([HASH[0], HASH[1], 160 / 6]), ballOn: 25 + rng.int(40), down: 1 + rng.int(3), toGo: 10 };
    const P = createPlay(A, B, offId, defId, spot, { autoQB: true, rng });
    const r = runToEnd(P, rng);
    s.n++; s.t += r.elapsed;
    if (r.capped) s.capped++;
    if (r.kind === 'int' || r.kind === 'touchback' || r.intReturn) s.int++;
    if (r.kind === 'sack') s.sack++;
    if (r.thrown && !r.intReturn) { s.att++; if (r.caught) s.comp++; }
    if (r.fumble) s.fum++;
    if (r.kind === 'td' && r.scorer === 'O') s.td++;
    if (!r.intReturn) { s.yds += r.yards; if (r.yards < 0) s.neg++; if (r.yards >= 20) s.big++; }
  }
  return s;
}

const fmt = (s) => `yds ${(s.yds / s.n).toFixed(1).padStart(5)}  comp ${s.att ? ((100 * s.comp) / s.att).toFixed(0).padStart(3) : '  -'}%  sack ${((100 * s.sack) / s.n).toFixed(1).padStart(4)}%  int ${((100 * s.int) / s.n).toFixed(1).padStart(4)}%  td ${((100 * s.td) / s.n).toFixed(1).padStart(4)}%  neg ${((100 * s.neg) / s.n).toFixed(0).padStart(3)}%  20+ ${((100 * s.big) / s.n).toFixed(0).padStart(3)}%  t ${(s.t / s.n).toFixed(1)}s  cap ${s.capped}`;

const tot = { run: null, pass: null };
const add = (a, b) => { if (!a) return { ...b }; for (const k in b) a[k] += b[k]; return a; };
console.log(`== Plays vs a mixed defense (${N} each, equal teams) ==`);
for (const p of PLAYS) {
  let s = null;
  for (const d of DEFS) s = add(s, runPlays(p.id, d.id, Math.ceil(N / DEFS.length)));
  tot[p.type] = add(tot[p.type], s);
  console.log(`${p.id.padEnd(11)} ${fmt(s)}`);
}
console.log(`RUN  total  ${fmt(tot.run)}`);
console.log(`PASS total  ${fmt(tot.pass)}`);

if (process.argv.includes('--matrix')) {
  console.log('\n== Yards per play: offense (rows) x defense (cols) ==');
  console.log(''.padEnd(11) + DEFS.map((d) => d.id.padStart(9)).join(''));
  for (const p of PLAYS) {
    console.log(p.id.padEnd(11) + DEFS.map((d) => { const s = runPlays(p.id, d.id, 120); return (s.yds / s.n).toFixed(1).padStart(9); }).join(''));
  }
}

const G = arg('--games', 0);
if (G > 0) {
  const { createGame, autoplay } = await import('../src/js/rules.js');
  const { ALL } = await import('../src/js/data.js');
  const qm = arg('--quarter', 12);
  let pts = 0, plays = 0, n = 0, ot = 0, maxPlay = 0, ties = 0;
  const scores = [];
  for (let g = 0; g < G; g++) {
    const a = ALL[g % ALL.length], b = ALL[(g * 3 + 1) % ALL.length];
    if (a.id === b.id) continue;
    const grng = makeRng(1000 + g);
    const game = createGame({ teamA: a.id, teamB: b.id, home: 0, quarterMin: qm, year: 2026, user: null }, grng);
    const res = autoplay(game, grng, 4000);
    pts += game.score[0] + game.score[1]; plays += res.plays; n++;
    if (game.quarter > 4) ot++;
    if (game.score[0] === game.score[1]) ties++;
    maxPlay = Math.max(maxPlay, res.maxPlayT);
    scores.push(`${a.abbr} ${game.score[0]}-${game.score[1]} ${b.abbr}`);
  }
  console.log(`\n== ${n} AI-vs-AI games, ${qm}-minute quarters ==`);
  console.log(`points per team ${(pts / n / 2).toFixed(1)}, plays per game ${(plays / n).toFixed(0)}, OT games ${ot}, ties ${ties}, longest play ${maxPlay.toFixed(1)} s`);
  console.log(scores.slice(0, 12).join(' | '));
}
