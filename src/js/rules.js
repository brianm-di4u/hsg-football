// Game flow: downs, distance, clock, scoring, kicks, tries, timeouts, halves, overtime and stats.
// Pure data (no DOM). Every rule here is a game rule (see How to Play), not a claim about Arkansas rules.
import { clamp } from './rng.js';
import { createPlay, snap, stepPlay, runToEnd, W, HASH, TICK } from './sim.js';
import { playById } from './plays.js';
import { teamDef } from './data.js';
import { generateRoster, starters } from './roster.js';
import * as AI from './ai.js';
import { fgDistance, kickTolerance, kickRange, canKneel } from './kick.js';
export { fgDistance, kickTolerance, kickRange, canKneel };

export const RUNOFF = 25;
const STAT0 = () => ({ fd: 0, yds: 0, py: 0, ry: 0, to: 0, plays: 0, top: 0 });

// cfg: { teamA, teamB, home: 0|1|null (null = neutral), user: 0|null, quarterMin, year, rosters: {id: players}, mode, difficulty, skipToss }
export function createGame(cfg, rng) {
  const mk = (id) => {
    const d = teamDef(id);
    const players = (cfg.rosters && cfg.rosters[id]) || generateRoster(id, d.base, cfg.year || 2026);
    return { id, players };
  };
  const g = {
    mode: cfg.mode || 'exhibition', teams: [mk(cfg.teamA), mk(cfg.teamB)], user: cfg.user === undefined ? 0 : cfg.user,
    home: cfg.home === undefined ? 0 : cfg.home, quarterMin: cfg.quarterMin || 4, difficulty: cfg.difficulty || 'varsity',
    quarter: 1, clock: (cfg.quarterMin || 4) * 60, score: [0, 0], qScores: [[0, 0, 0, 0], [0, 0, 0, 0]],
    poss: 0, ballOn: 25, down: 1, toGo: 10, absX: W / 2, timeouts: [3, 3], runoff: 0,
    phase: 'toss', offCall: null, defCall: null, play: null, lastResult: null, next: null, log: [],
    stats: { team: [STAT0(), STAT0()], players: {} }, ot: null, openingReceiver: null, kick: null, kickAnim: null,
    tryFor: null, freeKick: false, drive: { start: 25, plays: 0 }, over: false, plays: 0, challenge: cfg.challenge || null,
    seasonWeek: cfg.seasonWeek ?? null, rivalry: cfg.rivalry || null, neutral: cfg.home === null, halftimeShown: false,
  };
  if (g.home === null) g.home = 1;
  if (cfg.skipToss) { g.openingReceiver = cfg.receiver ?? 0; startKickoff(g, 1 - g.openingReceiver, rng); }
  return g;
}

export const userTeam = (g) => (g.user === null ? -1 : g.user);
export const isUserOffense = (g) => g.user !== null && g.poss === g.user;
const st = (g, side) => starters(g.teams[side].players);
const tdef = (g, side) => teamDef(g.teams[side].id);
export const localBx = (g) => (g.poss === 0 ? g.absX : W - g.absX);
export const toAbsX = (g, lx) => (g.poss === 0 ? lx : W - lx);

function pstat(g, side, p) {
  const s = g.stats.players;
  if (!s[p.id]) s[p.id] = { id: p.id, side, name: `${p.first[0]}. ${p.last}`, num: p.num, pos: p.pos,
    att: 0, cmp: 0, py: 0, ptd: 0, int: 0, ru: 0, ry: 0, rtd: 0, rec: 0, recy: 0, rectd: 0, tkl: 0, sk: 0, pick: 0, fg: 0, fga: 0, xp: 0, xpa: 0 };
  return s[p.id];
}
const findP = (g, side, pid) => g.teams[side].players.find((p) => p.id === pid);
const nameOf = (g, side, pid) => { const p = findP(g, side, pid); return p ? `${p.first[0]}. ${p.last}` : 'the runner'; };

// One clock format for the scorebug, the stadium board and the log: whole seconds rounded up (0.4 s left shows 0:01),
// and while a play is being called the clock already shows the run-off it will lose.
export const clockText = (s) => { s = Math.max(0, Math.ceil(s)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };
export const shownClock = (g) => clockText(g.clock - (g.phase === 'call' ? g.runoff : 0));

export function logLine(g, text) {
  g.log.push({ q: g.quarter, clock: clockText(g.clock), text });
  if (g.log.length > 60) g.log.shift();
}

export function coinToss(g, call, rng) {
  const flip = rng.chance(0.5) ? 'heads' : 'tails';
  const winner = g.user === null ? rng.int(2) : flip === call ? g.user : 1 - g.user;
  g.toss = { call, flip, winner };
  g.openingReceiver = winner;
  logLine(g, `Coin toss: ${flip}. ${tdef(g, winner).short} will receive.`);
  return g.toss;
}

// ---- Kickoffs, punts, free kicks ------------------------------------------------------------
export function startKickoff(g, kicking, rng, fromBallOn = 40, free = false) {
  const kt = st(g, kicking), rt = st(g, 1 - kicking);
  const k = kt.K.r.kck;
  const dist = 45 + k * 0.2 + rng.normal(0, 5) - (free ? 12 : 0);
  const land = fromBallOn + dist; // from the kicking team's goal
  const ret = [rt.RB, rt.X, rt.Z].sort((a, b) => b.r.spd - a.r.spd)[0];
  let res;
  if (land >= 100) res = { touchback: true, ballOn: 20, land: Math.min(land, 108), ret: 0 };
  else {
    const house = rng.chance(0.015);
    const yards = house ? 100 : Math.max(0, Math.round(rng.normal(19 + (ret.r.spd - 60) * 0.25, 8)));
    const start = Math.round(100 - land);
    res = { touchback: false, land, start, ret: yards, ballOn: clamp(start + yards, 1, 100), td: start + yards >= 100, returner: ret.id };
  }
  g.kickAnim = { kind: free ? 'free' : 'kickoff', kicking, from: fromBallOn, ...res, t: 0 };
  g.phase = 'kickoff';
  g.play = null;
  return res;
}

export function finishKickoff(g, rng) {
  const a = g.kickAnim;
  const recv = 1 - a.kicking;
  g.kickAnim = null;
  g.poss = recv; g.absX = W / 2;
  if (!g.ot && g.quarter <= 4) g.clock = Math.max(0, g.clock - 5);
  const rn = a.returner ? nameOf(g, recv, a.returner) : '';
  if (a.td) {
    logLine(g, `${tdef(g, recv).short}: ${rn} returns the kick for a touchdown!`);
    return scoreTD(g, recv, { text: 'TOUCHDOWN!', sub: `Kick return by ${rn}`, kind: 'td' });
  }
  g.ballOn = a.ballOn; g.down = 1; g.toGo = 10; g.drive = { start: g.ballOn, plays: 0 };
  const text = a.touchback ? 'Touchback' : `${rn} returns it ${a.ret} yd`;
  logLine(g, `${a.kind === 'free' ? 'Free kick' : 'Kickoff'}: ${text}. Ball on the ${yardLine(g.ballOn)}.`);
  setResult(g, { text: a.touchback ? 'TOUCHBACK' : `RETURN ${a.ret} YD`, sub: `${tdef(g, recv).short} ball on the ${yardLine(g.ballOn)}`, kind: 'kick' }, checkClockAfter(g));
}

export function yardLine(b) {
  const v = Math.round(b);
  if (v === 50) return '50';
  return v < 50 ? `own ${v}` : `opp ${100 - v}`;
}

function punt(g, rng) {
  const side = g.poss, kt = st(g, side);
  const net = 33 + kt.K.r.kck * 0.12 + rng.normal(0, 5);
  const land = g.ballOn + net;
  const other = 1 - side;
  let ballOn, text;
  if (land >= 100) { ballOn = 20; text = 'Touchback'; }
  else { const ret = Math.max(0, Math.round(rng.normal(5, 5))); ballOn = clamp(Math.round(100 - land) + ret, 1, 99); text = ret > 0 ? `returned ${ret} yd` : 'downed'; }
  if (!g.ot) g.clock = Math.max(0, g.clock - 6);
  g.kickAnim = { kind: 'punt', kicking: side, from: g.ballOn, land: Math.min(land, 105), ballOn, t: 0, touchback: land >= 100 };
  g.stats.team[side].plays++;
  g.phase = 'kickoff';
  g.pendingPunt = { side, other, ballOn, text, net }; // logged in finishPunt, once the ball is dead
}

export function finishPunt(g) {
  const p = g.pendingPunt;
  g.pendingPunt = null; g.kickAnim = null;
  logLine(g, `${tdef(g, p.side).short} punts ${Math.round(p.net)} yd, ${p.text}.`);
  changePossession(g, p.other, p.ballOn);
  setResult(g, { text: 'PUNT', sub: `${p.text[0].toUpperCase()}${p.text.slice(1)}: ${tdef(g, p.other).short} ball on the ${yardLine(p.ballOn)}`, kind: 'kick' }, checkClockAfter(g));
}

function changePossession(g, side, ballOn) {
  g.poss = side; g.ballOn = ballOn; g.down = 1; g.toGo = Math.min(10, 100 - ballOn); g.absX = W / 2;
  g.drive = { start: ballOn, plays: 0 };
}

// ---- Field goals and tries -------------------------------------------------------------------

export function startKick(g, kind) {
  const side = g.poss;
  const dist = kind === 'pat' ? 20 : fgDistance(g.ballOn);
  g.kick = { kind, side, dist, kck: st(g, side).K.r.kck, t: 0, user: g.user === side };
  g.phase = 'kick';
}

export function aiKickError(rng, kck) { return clamp(rng.normal(0, 0.26 - kck * 0.0012), -1, 1); }

export function resolveKick(g, e, rng) {
  const k = g.kick;
  if (!k) return null;
  const tol = kickTolerance(k.kck, k.dist), range = kickRange(k.kck);
  const good = Math.abs(e) <= tol && k.dist <= range;
  const why = good ? '' : k.dist > range ? 'short' : e < 0 ? 'wide left' : 'wide right';
  const kp = st(g, k.side).K, ps = pstat(g, k.side, kp);
  g.kickAnim = { kind: k.kind, side: k.side, good, e, dist: k.dist, why, t: 0, ballOn: g.ballOn };
  g.kick = null;
  g.phase = 'kickfly';
  if (k.kind === 'pat') {
    ps.xpa++; if (good) ps.xp++;
    g.pendingKick = { kind: 'pat', good, side: k.side };
  } else {
    ps.fga++; if (good) ps.fg++;
    if (!g.ot) g.clock = Math.max(0, g.clock - 5);
    g.stats.team[k.side].plays++;
    g.pendingKick = { kind: 'fg', good, side: k.side, dist: k.dist, why };
  }
  return { good, why, tol };
}

export function finishKick(g, rng) {
  const p = g.pendingKick;
  g.pendingKick = null; g.kickAnim = null;
  if (p.kind === 'pat') {
    if (p.good) addScore(g, p.side, 1);
    logLine(g, `Kick try ${p.good ? 'is good' : 'is no good'}.`);
    setResult(g, { text: p.good ? 'TRY IS GOOD' : 'NO GOOD', sub: p.good ? '+1' : 'The kick misses', kind: p.good ? 'score' : 'miss' }, afterScoreNext(g, p.side));
    return;
  }
  if (p.good) {
    addScore(g, p.side, 3);
    logLine(g, `${tdef(g, p.side).short} ${p.dist}-yd field goal is good.`);
    setResult(g, { text: 'FIELD GOAL!', sub: `${p.dist} yards: +3`, kind: 'score' }, afterScoreNext(g, p.side));
  } else {
    logLine(g, `${p.dist}-yd field goal ${p.why}.`);
    const other = 1 - p.side;
    if (g.ot) { setResult(g, { text: 'NO GOOD', sub: `${p.dist} yd, ${p.why}`, kind: 'miss' }, 'otNext'); return; }
    changePossession(g, other, Math.max(20, 100 - (g.ballOn - 7)));
    setResult(g, { text: 'NO GOOD', sub: `${p.dist} yd, ${p.why}. ${tdef(g, other).short} ball`, kind: 'miss' }, checkClockAfter(g));
  }
}

function addScore(g, side, n) {
  g.score[side] += n;
  const qi = Math.min(3, g.quarter - 1);
  if (g.quarter <= 4) g.qScores[side][qi] += n;
  else { g.qScores[side][4] = (g.qScores[side][4] || 0) + n; g.qScores[1 - side][4] = g.qScores[1 - side][4] || 0; }
}

function scoreTD(g, side, res) {
  addScore(g, side, 6);
  g.poss = side; g.tryFor = side;
  setResult(g, res, 'pat');
}

function afterScoreNext(g, side) {
  if (g.ot) return 'otNext';
  return checkClockAfter(g, { kickoffBy: side });
}

export function chooseTry(g, kind) {
  if (g.phase !== 'pat') return false;
  const side = g.tryFor;
  g.poss = side;
  if (kind === 'kick') { g.ballOn = 97; startKick(g, 'pat'); }
  else { g.ballOn = 97; g.down = 1; g.toGo = 3; g.absX = W / 2; g.twoPoint = true; g.phase = 'call'; }
  return true;
}

// ---- Calling and running plays -----------------------------------------------------------------
export function specialsFor(g) {
  const out = [];
  if (g.twoPoint) return out;
  if (g.down === 4 || g.ot && g.down >= 3) out.push('punt');
  const kck = st(g, g.poss).K.r.kck;
  if (fgDistance(g.ballOn) <= kickRange(kck) + 2 && g.ballOn >= 50) out.push('fg');
  if (canKneel(g)) out.push('kneel');
  if (g.ot) return out.filter((x) => x !== 'punt' && x !== 'kneel');
  return out;
}


export function callPlay(g, offId, defId, rng, opts = {}) {
  if (g.phase !== 'call') return false;
  // Between-play runoff applies at the next snap (a timeout cancels it).
  if (g.runoff > 0 && !g.ot) {
    g.clock -= g.runoff; g.runoff = 0;
    if (g.clock <= 0) { g.clock = 0; return endOfQuarter(g, rng), false; }
  }
  g.offCall = offId; g.defCall = defId;
  if (offId === 'punt') { punt(g, rng); return true; }
  if (offId === 'fg') { startKick(g, 'fg'); return true; }
  if (offId === 'kneel') {
    g.play = null; g.stats.team[g.poss].plays++;
    const res = { kind: 'tackle', yards: -1, elapsed: 2, clockStops: false, kneel: true, playType: 'run', carrierSide: 'O' };
    return applyResult(g, res, rng), true;
  }
  const off = st(g, g.poss), def = st(g, 1 - g.poss);
  const boost = AI.boostFor(g);
  g.play = createPlay(off, def, offId, defId, { bx: localBx(g), ballOn: g.ballOn, down: g.down, toGo: g.toGo },
    { userSide: g.user === null ? null : g.user === g.poss ? 'O' : 'D', autoQB: opts.autoQB !== false, rng, boost });
  g.play.offTeam = g.poss;
  if (g.user !== null && g.poss === g.user) { g.tend = g.tend || { run: 0, pass: 0 }; g.tend[playById(offId).type === 'run' ? 'run' : 'pass']++; }
  g.phase = 'pre';
  return true;
}

export function snapPlay(g) {
  if (g.phase !== 'pre' || !g.play) return false;
  snap(g.play);
  g.phase = 'live';
  return true;
}

export function stepLive(g, rng, inp) {
  if (g.phase !== 'live' || !g.play) return;
  stepPlay(g.play, rng, inp);
  if (g.play.phase === 'dead') applyResult(g, g.play.result, rng);
}

export function finishLive(g, rng, inp = null) {
  if (g.phase === 'pre') snapPlay(g);
  if (g.phase !== 'live') return;
  let n = 0;
  while (g.phase === 'live' && n++ < 60 * 20) stepLive(g, rng, inp);
}

function setResult(g, res, next) {
  g.lastResult = res;
  g.next = next;
  g.phase = 'result';
}

export function applyResult(g, r, rng) {
  const side = g.poss, other = 1 - side;
  const T = g.stats.team[side];
  const pd = playById(g.offCall) || {};
  g.plays++; g.drive.plays++;
  T.plays++;
  if (!g.ot) {
    g.clock -= r.elapsed;
    if (g.clock < 0) g.clock = 0;
    g.runoff = r.clockStops ? 0 : RUNOFF;
  }
  const off = g.teams[side], D = g.teams[other];
  // crafted results (tests, review captures) may name the carrier by slot
  if (!r.carrierPid && r.carrierSlot) r = { ...r, carrierPid: st(g, r.carrierSide === 'D' ? other : side)[r.carrierSlot]?.id };
  const cname =r.carrierPid ? nameOf(g, r.carrierSide === 'O' ? side : other, r.carrierPid) : '';
  const qbP = st(g, side).QB;
  // Spot of the ball (absolute x), on the nearer hash when outside them.
  if (r.x !== undefined && !['inc', 'throwaway'].includes(r.kind)) {
    const ax = toAbsX(g, r.x);
    g.absX = clamp(ax, HASH[0], HASH[1]);
  }
  // Stats
  if (r.thrown && !r.throwaway) {
    const qs = pstat(g, side, qbP); qs.att++;
    if (r.caught || r.kind === 'td' && r.caught) { qs.cmp++; }
  }
  if (r.kind === 'throwaway') pstat(g, side, qbP).att++;
  const yards = r.yards || 0;
  const gain = r.carrierSide === 'O' && !r.intReturn ? yards : 0;
  if (r.carrierSide === 'O' && r.carrierPid && !['inc', 'throwaway'].includes(r.kind) && !r.kneel) {
    const cp = findP(g, side, r.carrierPid);
    if (r.caught) {
      const rs = pstat(g, side, cp); rs.rec++; rs.recy += gain;
      pstat(g, side, qbP).py += gain; T.py += gain;
    } else if (r.kind !== 'sack') {
      const rs = pstat(g, side, cp); rs.ru++; rs.ry += gain; T.ry += gain;
    }
    T.yds += gain;
  }
  if (r.kind === 'sack') { T.yds += gain; T.py += gain; }
  if (r.tacklerPid) {
    const tp = findP(g, other, r.tacklerPid);
    if (tp) { const ts = pstat(g, other, tp); ts.tkl++; if (r.kind === 'sack') ts.sk++; }
  }

  const tryPlay = !!g.twoPoint;
  if (tryPlay) {
    g.twoPoint = false;
    const ok = r.kind === 'td' && r.scorer === 'O';
    if (ok) addScore(g, side, 2);
    logLine(g, `Two-point try ${ok ? 'is good' : 'fails'}.`);
    return setResult(g, { text: ok ? 'TWO POINTS!' : 'TRY FAILS', sub: ok ? '+2' : 'Stopped short', kind: ok ? 'score' : 'miss' }, afterScoreNext(g, side));
  }

  const desc = pd.name ? `${pd.name}: ` : '';
  switch (r.kind) {
    case 'td': {
      if (r.scorer === 'D') {
        const ip = r.carrierPid && findP(g, other, r.carrierPid);
        if (ip) pstat(g, other, ip).pick++;
        pstat(g, side, qbP).int++; T.to++;
        logLine(g, `${desc}intercepted and returned for a touchdown by ${cname}!`);
        return scoreTD(g, other, { text: 'PICK SIX!', sub: `${cname} takes it back`, kind: 'td', turnover: true });
      }
      const cp = findP(g, side, r.carrierPid);
      if (cp) { if (r.caught) { pstat(g, side, cp).rectd++; pstat(g, side, qbP).ptd++; } else pstat(g, side, cp).rtd++; }
      logLine(g, `${desc}${cname} scores from ${Math.round(100 - g.ballOn)} yd out.`);
      const tdy = Math.round(100 - g.ballOn);
      return scoreTD(g, side, { text: 'TOUCHDOWN!', sub: cname ? `${cname}, ${tdy}-yd ${r.caught ? 'catch' : 'run'}` : `${tdy}-yd ${r.caught ? 'catch' : 'run'}`, kind: 'td', yards: tdy });
    }
    case 'safety': {
      addScore(g, other, 2);
      logLine(g, `${desc}tackled in the end zone. Safety.`);
      if (g.ot) return setResult(g, { text: 'SAFETY', sub: '+2', kind: 'score' }, 'otNext');
      setResult(g, { text: 'SAFETY!', sub: `+2 ${tdef(g, other).short}. Free kick from the 20`, kind: 'score' }, checkClockAfter(g, { freeKickBy: side }));
      return;
    }
    case 'int': case 'touchback': {
      const ip = r.carrierPid && findP(g, other, r.carrierPid);
      if (ip) pstat(g, other, ip).pick++;
      pstat(g, side, qbP).int++; T.to++;
      const spot = r.kind === 'touchback' ? 20 : clamp(Math.round(r.intSpot), 1, 99);
      logLine(g, `${desc}INTERCEPTED by ${cname}${r.kind === 'touchback' ? ' in the end zone (touchback)' : ''}.`);
      if (g.ot) return setResult(g, { text: 'INTERCEPTED', sub: `${cname}`, kind: 'turnover' }, 'otNext');
      changePossession(g, other, spot);
      return setResult(g, { text: 'INTERCEPTED!', sub: `${cname}: ${tdef(g, other).short} ball on the ${yardLine(spot)}`, kind: 'turnover' }, checkClockAfter(g));
    }
    case 'fumbleLost': {
      T.to++;
      const spot = clamp(100 - (g.ballOn + gain), 1, 99);
      logLine(g, `${desc}${cname} fumbles; ${tdef(g, other).short} recovers.`);
      if (g.ot) return setResult(g, { text: 'FUMBLE!', sub: 'Recovered by the defense', kind: 'turnover' }, 'otNext');
      changePossession(g, other, spot);
      return setResult(g, { text: 'FUMBLE!', sub: `${tdef(g, other).short} recovers on the ${yardLine(spot)}`, kind: 'turnover' }, checkClockAfter(g));
    }
  }

  // Ordinary downs: tackles, sacks, out of bounds, incompletions, throwaways, kneels.
  const before = g.ballOn;
  g.ballOn = clamp(before + gain, 1, 99);
  let text, sub;
  const inc = r.kind === 'inc' || r.kind === 'throwaway';
  if (r.kneel) { text = 'KNEEL'; sub = 'Clock keeps running'; logLine(g, 'QB takes a knee.'); }
  else if (inc) {
    text = r.kind === 'throwaway' ? 'THROWN AWAY' : r.why === 'breakup' ? 'BROKEN UP' : r.why === 'drop' ? 'DROPPED' : 'INCOMPLETE';
    sub = 'Clock stops';
    logLine(g, `${desc}pass incomplete${r.why === 'breakup' ? ', broken up' : r.why === 'drop' ? ', dropped' : ''}.`);
  } else if (r.kind === 'sack') {
    text = `SACKED ${gain} YD`; sub = `${nameOf(g, other, r.tacklerPid)} gets home`;
    logLine(g, `${desc}QB sacked for ${-gain} yd by ${nameOf(g, other, r.tacklerPid)}.`);
  } else {
    text = gain > 0 ? `+${gain} YD` : gain === 0 ? 'NO GAIN' : `LOSS OF ${-gain}`;
    sub = `${cname ? cname + (r.caught ? ' catch' : ' run') : r.caught ? 'Catch' : 'Run'}${r.kind === 'oob' ? ', out of bounds' : ''}`;
    logLine(g, `${desc}${cname} ${r.caught ? 'catches it for' : 'runs for'} ${gain} yd${r.kind === 'oob' ? ' (out of bounds)' : ''}.`);
  }
  let firstDown = false, turnover = false;
  if (gain >= g.toGo) {
    firstDown = true; g.down = 1; g.toGo = Math.min(10, 100 - g.ballOn); T.fd++;
    text += ' · FIRST DOWN';
  } else {
    g.down++; g.toGo -= gain;
    if (g.down > 4) {
      turnover = true;
      logLine(g, 'Turnover on downs.');
      if (g.ot) return setResult(g, { text: 'STOPPED!', sub: 'Turnover on downs', kind: 'turnover' }, 'otNext');
      changePossession(g, other, 100 - g.ballOn);
      text = 'TURNOVER ON DOWNS'; sub = `${tdef(g, other).short} takes over`;
    }
  }
  setResult(g, { text, sub, kind: turnover ? 'turnover' : firstDown ? 'first' : gain >= 15 ? 'big' : 'play', yards: gain, firstDown }, checkClockAfter(g));
}

// What happens after a result toast: decides quarter ends using the clock and the pending runoff.
function checkClockAfter(g, after = {}) {
  g.afterScore = after;
  if (g.ot) return 'call';
  if (g.clock <= 0) return 'endQuarter';
  if (after.kickoffBy !== undefined) return 'kickoff';
  if (after.freeKickBy !== undefined) return 'freeKick';
  return 'call';
}

export function useTimeout(g, side) {
  if (g.ot || g.timeouts[side] <= 0 || !['call', 'result'].includes(g.phase) || g.runoff <= 0) return false;
  g.timeouts[side]--; g.runoff = 0;
  logLine(g, `Timeout, ${tdef(g, side).short} (${g.timeouts[side]} left).`);
  return true;
}

// Move on from a result, a quarter break or halftime.
export function advance(g, rng) {
  if (g.phase === 'result') {
    const n = g.next; g.next = null;
    const aft = g.afterScore || {};
    g.afterScore = null;
    switch (n) {
      case 'pat': g.phase = 'pat'; return;
      case 'kickoff': startKickoff(g, aft.kickoffBy, rng); return;
      case 'freeKick': startKickoff(g, aft.freeKickBy, rng, 20, true); return;
      case 'endQuarter': g.pendingAfter = aft; endOfQuarter(g, rng); return;
      case 'otNext': otNext(g, rng); return;
      case 'final': g.phase = 'final'; return;
      default:
        g.phase = 'call';
        if (g.runoff > 0) for (const s of [0, 1]) if (s !== g.user && AI.wantsTimeout(g, s)) { useTimeout(g, s); break; }
        return;
    }
  }
  if (g.phase === 'break') {
    const q = g.quarter;
    if (q === 3) {
      g.timeouts = [3, 3];
      const aft = g.pendingAfter || {};
      g.pendingAfter = null;
      startKickoff(g, g.openingReceiver, rng);
      void aft;
    } else {
      g.phase = 'call';
      const aft = g.pendingAfter || {};
      g.pendingAfter = null;
      if (aft.kickoffBy !== undefined) startKickoff(g, aft.kickoffBy, rng);
      else if (aft.freeKickBy !== undefined) startKickoff(g, aft.freeKickBy, rng, 20, true);
    }
    return;
  }
  if (g.phase === 'otStart') { otBegin(g, rng); }
}

function endOfQuarter(g, rng) {
  g.runoff = 0;
  const q = g.quarter;
  if (q < 4) {
    g.quarter = q + 1; g.clock = g.quarterMin * 60;
    g.phase = 'break';
    g.breakKind = q === 2 ? 'half' : 'quarter';
    logLine(g, q === 2 ? 'Halftime.' : `End of quarter ${q}.`);
    return;
  }
  if (g.score[0] !== g.score[1]) { g.phase = 'final'; g.over = true; logLine(g, 'Final.'); return; }
  g.phase = 'otStart';
  g.ot = { round: 0, first: null, turn: 0, startScore: null };
  g.quarter = 5; g.clock = 0;
  logLine(g, 'Tied after four quarters: overtime.');
}

// Overtime (game rule): each team gets one series from the opponent's 10.
function otBegin(g, rng) {
  const toss = rng.int(2);
  g.ot.first = 1 - toss; // the toss winner chooses to go second
  g.ot.round = 1; g.ot.turn = 0;
  otSeries(g, g.ot.first);
}

function otSeries(g, side) {
  g.poss = side; g.ballOn = 90; g.down = 1; g.toGo = 10; g.absX = W / 2; g.twoPoint = false;
  g.ot.startScore = [...g.score];
  g.phase = 'call';
  logLine(g, `Overtime round ${g.ot.round}: ${tdef(g, side).short} from the 10.`);
}

function otNext(g, rng) {
  const ot = g.ot;
  if (ot.turn === 0) { ot.turn = 1; otSeries(g, 1 - ot.first); return; }
  if (g.score[0] !== g.score[1]) { g.phase = 'final'; g.over = true; logLine(g, 'Final (overtime).'); return; }
  ot.round++; ot.turn = 0; g.quarter++;
  otSeries(g, ot.first);
}

// In OT, a series also ends without a turnover once its score is settled (TD + try, FG).
export function otSeriesDone(g) { return !!g.ot && g.phase === 'result' && g.next === 'otNext'; }

// ---- Whole-game helpers ------------------------------------------------------------------------
// AI plays both sides to the end (used by tests, Node tools and "watch the rest").
export function autoplay(g, rng, maxSteps = 5000) {
  let steps = 0, plays = 0, maxPlayT = 0;
  while (!g.over && g.phase !== 'final' && steps++ < maxSteps) {
    switch (g.phase) {
      case 'toss': coinToss(g, 'heads', rng); startKickoff(g, 1 - g.openingReceiver, rng); break;
      case 'kickoff': if (g.pendingPunt) finishPunt(g); else finishKickoff(g, rng); break;
      case 'call': {
        const o = AI.offenseCall(g, rng), d = AI.defenseCall(g, rng);
        callPlay(g, o, d, rng);
        break;
      }
      case 'pre': snapPlay(g); break;
      case 'live': finishLive(g, rng); plays++; if (g.play) maxPlayT = Math.max(maxPlayT, g.play.t); break;
      case 'result': advance(g, rng); break;
      case 'pat': chooseTry(g, AI.patChoice(g)); break;
      case 'kick': resolveKick(g, aiKickError(rng, g.kick.kck), rng); break;
      case 'kickfly': finishKick(g, rng); break;
      case 'break': case 'otStart': advance(g, rng); break;
      default: steps = maxSteps;
    }
  }
  if (g.phase === 'final') g.over = true;
  return { plays, maxPlayT, steps };
}

// Player of the Game: the best line on the winning side (fictional players).
export function playerOfGame(g) {
  const win = g.score[0] === g.score[1] ? null : g.score[0] > g.score[1] ? 0 : 1;
  let best = null, bs = -1;
  for (const id in g.stats.players) {
    const s = g.stats.players[id];
    if (win !== null && s.side !== win) continue;
    const sc = s.py * 0.04 + s.ptd * 4 - s.int * 3 + s.ry * 0.1 + s.rtd * 6 + s.recy * 0.1 + s.rectd * 6 + s.tkl + s.sk * 3 + s.pick * 5 + s.fg * 3;
    if (sc > bs) { bs = sc; best = s; }
  }
  return best;
}

export function statLine(s) {
  const parts = [];
  if (s.att) parts.push(`${s.cmp}/${s.att}, ${s.py} yd${s.ptd ? `, ${s.ptd} TD` : ''}${s.int ? `, ${s.int} INT` : ''}`);
  if (s.ru) parts.push(`${s.ru} rush, ${s.ry} yd${s.rtd ? `, ${s.rtd} TD` : ''}`);
  if (s.rec) parts.push(`${s.rec} rec, ${s.recy} yd${s.rectd ? `, ${s.rectd} TD` : ''}`);
  if (s.tkl) parts.push(`${s.tkl} tkl${s.sk ? `, ${s.sk} sack` : ''}`);
  if (s.pick) parts.push(`${s.pick} INT`);
  if (s.fga) parts.push(`FG ${s.fg}/${s.fga}`);
  return parts.join(' · ');
}

export { TICK };
