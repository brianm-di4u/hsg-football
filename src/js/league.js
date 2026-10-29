// The Spa City Cup league (an invented format): 10 teams, round robin, top-four playoff, Cup final.
import { clamp, makeRng, hashStr } from './rng.js';
import { ALL, teamDef } from './data.js';
import { generateRoster, composite, progressRoster } from './roster.js';

export const RIVAL_OPENER = ['lakeside', 'lake-hamilton'];
export const RIVAL_FINALE = ['hot-springs', 'lakeside'];
const same = (g, pair) => (g[0] === pair[0] && g[1] === pair[1]) || (g[0] === pair[1] && g[1] === pair[0]);

// Circle method: n teams (even) → n−1 rounds of n/2 pairs.
export function roundRobin(ids) {
  const t = [...ids], n = t.length, rounds = [];
  for (let r = 0; r < n - 1; r++) {
    const pairs = [];
    for (let i = 0; i < n / 2; i++) pairs.push([t[i], t[n - 1 - i]]);
    rounds.push(pairs);
    t.splice(1, 0, t.pop());
  }
  return rounds;
}

export function buildSchedule(ids, year, short) {
  const rr = roundRobin(ids);
  const iOpen = rr.findIndex((r) => r.some((g) => same(g, RIVAL_OPENER)));
  const opener = rr.splice(iOpen, 1)[0];
  const iFin = rr.findIndex((r) => r.some((g) => same(g, RIVAL_FINALE)));
  const finale = rr.splice(iFin, 1)[0];
  const rng = makeRng(hashStr(`sched:${year}`));
  for (let i = rr.length - 1; i > 0; i--) { const j = rng.int(i + 1); [rr[i], rr[j]] = [rr[j], rr[i]]; }
  let rounds = [opener, ...rr, finale];
  if (short) rounds = [opener, ...rr.slice(0, 3), finale];
  return rounds.map((pairs, w) => pairs.map(([a, b], i) => {
    let home = (w + i + year) % 2 ? a : b, away = home === a ? b : a;
    if (same([a, b], RIVAL_OPENER)) { home = 'lake-hamilton'; away = 'lakeside'; }
    if (same([a, b], RIVAL_FINALE)) { home = 'hot-springs'; away = 'lakeside'; }
    const rivalry = same([a, b], RIVAL_OPENER) || same([a, b], RIVAL_FINALE);
    return { home, away, rivalry, result: null };
  }));
}

export function createSeason(userTeam, year = 2026, short = false) {
  const ids = ALL.map((t) => t.id);
  const rosters = {};
  for (const id of ids) rosters[id] = generateRoster(id, teamDef(id).base, year);
  return { year, userTeam, short, ids, rosters, weeks: buildSchedule(ids, year, short), week: 0, phase: 'regular', playoffs: null, champion: null, history: [], leaders: {} };
}

// Fast score model for games nobody watches (and for "Sim game").
export function quickSim(homeId, awayId, rosters, rng, neutral = false) {
  const H = composite(rosters[homeId]), A = composite(rosters[awayId]);
  const drive = (off, def, edge) => {
    const diff = off - def + edge;
    const pTD = clamp(0.26 + 0.011 * diff, 0.07, 0.6), pFG = 0.12;
    const r = rng.next();
    if (r < pTD) { const x = rng.next(); return x < 0.05 ? 6 : x < 0.08 ? 8 : 7; }
    return r < pTD + pFG ? 3 : 0;
  };
  const n = 10 + rng.int(3);
  let hs = 0, as = 0;
  for (let i = 0; i < n; i++) { hs += drive(H.off, A.def, neutral ? 0 : 1.5); as += drive(A.off, H.def, 0); }
  let ot = 0;
  while (hs === as && ot < 6) {
    ot++;
    const otd = (o, d) => { const p = clamp(0.45 + 0.01 * (o - d), 0.2, 0.75), r = rng.next(); return r < p ? 7 : r < p + 0.25 ? 3 : 0; };
    hs += otd(H.off, A.def); as += otd(A.off, H.def);
  }
  if (hs === as) hs += 3;
  return { hs, as, ot: ot > 0 };
}

export function standings(season) {
  const rows = {};
  for (const id of season.ids) rows[id] = { id, w: 0, l: 0, pf: 0, pa: 0, h2h: {} };
  for (const wk of season.weeks) for (const g of wk) {
    if (!g.result) continue;
    const { hs, as } = g.result, H = rows[g.home], A = rows[g.away];
    H.pf += hs; H.pa += as; A.pf += as; A.pa += hs;
    if (hs > as) { H.w++; A.l++; H.h2h[g.away] = (H.h2h[g.away] || 0) + 1; }
    else { A.w++; H.l++; A.h2h[g.home] = (A.h2h[g.home] || 0) + 1; }
  }
  const list = Object.values(rows);
  const coin = (id) => hashStr(`${id}:${season.year}`);
  list.sort((a, b) => {
    if (b.w - b.l !== a.w - a.l) return (b.w - b.l) - (a.w - a.l);
    const hb = b.h2h[a.id] || 0, ha = a.h2h[b.id] || 0;
    if (hb !== ha) return hb - ha;
    if ((b.pf - b.pa) !== (a.pf - a.pa)) return (b.pf - b.pa) - (a.pf - a.pa);
    if (b.pf !== a.pf) return b.pf - a.pf;
    return coin(b.id) - coin(a.id);
  });
  return list;
}

export function currentGames(season) {
  if (season.phase === 'regular') return season.weeks[season.week] || [];
  if (season.phase === 'playoffs') return season.playoffs.round === 1 ? season.playoffs.semis : [season.playoffs.final];
  return [];
}

export function userGame(season) {
  return currentGames(season).find((g) => g.home === season.userTeam || g.away === season.userTeam) || null;
}

// Sim every unplayed game in the current round except the user's (unless includeUser).
export function simRound(season, rng, includeUser = false) {
  for (const g of currentGames(season)) {
    if (g.result) continue;
    const isUser = g.home === season.userTeam || g.away === season.userTeam;
    if (isUser && !includeUser) continue;
    g.result = quickSim(g.home, g.away, season.rosters, rng, !!g.neutral);
    g.result.simmed = true;
  }
}

export function roundDone(season) { return currentGames(season).every((g) => g.result); }

export function advanceRound(season) {
  if (!roundDone(season)) return false;
  if (season.phase === 'regular') {
    season.week++;
    if (season.week >= season.weeks.length) startPlayoffs(season);
    return true;
  }
  if (season.phase === 'playoffs') {
    const P = season.playoffs;
    if (P.round === 1) {
      const win = (g) => (g.result.hs > g.result.as ? g.home : g.away);
      const [a, b] = P.semis.map(win);
      const sa = P.seeds.indexOf(a), sb = P.seeds.indexOf(b);
      P.final = { home: sa < sb ? a : b, away: sa < sb ? b : a, neutral: true, final: true, result: null };
      P.round = 2;
    } else {
      const f = P.final;
      season.champion = f.result.hs > f.result.as ? f.home : f.away;
      season.phase = 'done';
      season.history.push({ year: season.year, champion: season.champion });
    }
    return true;
  }
  return false;
}

export function startPlayoffs(season) {
  const st = standings(season).slice(0, 4).map((r) => r.id);
  season.phase = 'playoffs';
  season.playoffs = {
    seeds: st, round: 1, final: null,
    semis: [{ home: st[0], away: st[3], semi: true, result: null }, { home: st[1], away: st[2], semi: true, result: null }],
  };
}

export function userInPlayoffs(season) {
  return season.playoffs && season.playoffs.seeds.includes(season.userTeam);
}

export function nextSeason(season) {
  const year = season.year + 1;
  const rosters = {};
  for (const id of season.ids) rosters[id] = progressRoster(id, teamDef(id).base, season.rosters[id], year);
  return { ...season, year, rosters, weeks: buildSchedule(season.ids, year, season.short), week: 0, phase: 'regular', playoffs: null, champion: null, leaders: {} };
}

export function userRecord(season) {
  const r = standings(season).find((x) => x.id === season.userTeam);
  return r ? `${r.w}-${r.l}` : '0-0';
}
