// Situational play-calling for the AI coach (both sides), tries and timeouts.
// Written from scratch; the *kinds* of situational rules follow ZenGM's ideas (reference only, see SAMPLES.md).
import { starters } from './roster.js';
import { fgDistance, kickRange, canKneel } from './kick.js';

export const DIFFICULTY = {
  rookie: { label: 'Rookie', temp: 1.5, blitz: 0.08, boostUser: 4, boostAI: -2, read: 0 },
  varsity: { label: 'Varsity', temp: 1, blitz: 0.12, boostUser: 0, boostAI: 0, read: 0.5 },
  allstate: { label: 'All-State', temp: 0.7, blitz: 0.16, boostUser: 0, boostAI: 3, read: 1 },
};
const D = (g) => DIFFICULTY[g.difficulty] || DIFFICULTY.varsity;

// Rating nudges per difficulty for the current play: { O, D }.
export function boostFor(g) {
  if (g.user === null) return null;
  const d = D(g), userO = g.poss === g.user;
  return { O: userO ? d.boostUser : d.boostAI, D: userO ? d.boostAI : d.boostUser };
}

function pick(rng, weights, temp) {
  const pairs = Object.entries(weights).map(([k, w]) => [k, Math.pow(Math.max(0.001, w), 1 / temp)]);
  return rng.weighted(pairs);
}

const timeLeft = (g) => (g.quarter <= 4 ? (4 - g.quarter) * g.quarterMin * 60 + g.clock : 0);

export function offenseCall(g, rng) {
  const side = g.poss, diff = g.score[side] - g.score[1 - side];
  const q = g.quarter, clock = g.clock, t = D(g).temp;
  const k = starters(g.teams[side].players).K.r.kck;
  const fgd = fgDistance(g.ballOn), inRange = fgd <= kickRange(k) - 2 && g.ballOn >= 50;
  const late = q === 4 && clock < 180;

  if (!g.twoPoint) {
    if (canKneel(g) && q === 4 && diff > 0) return 'kneel';
    if (q === 2 && clock <= 30 && g.ballOn < 45 && rng.chance(0.7) && canKneel(g)) return 'kneel';
    // End of a half: take the points.
    if (inRange && clock <= 12 && (q === 2 || q === 4 && diff >= -3 && diff <= 0)) return 'fg';
    if (g.ot && g.down === 4) return inRange && (diff >= -3) ? 'fg' : passCall(g, rng, t, true);
    if (g.down === 4) {
      const desperate = q === 4 && diff < 0 && clock < 240 || q === 4 && diff <= -9;
      const goShort = g.toGo <= 1 && g.ballOn >= 40 && g.ballOn <= 75 || g.toGo <= 2 && g.ballOn >= 50 && g.ballOn < 62;
      if (inRange && !(desperate && diff < -3) && (g.toGo > 2 || fgd <= 30)) return 'fg';
      if (desperate || goShort) return g.toGo <= 2 ? runCall(g, rng, t, true) : passCall(g, rng, t, desperate);
      return 'punt';
    }
  }
  const desperation = q === 4 && diff < 0 && clock < 150 || q === 4 && diff <= -9 && clock < 400 || q >= 5 && g.down >= 3 && g.toGo > 4;
  if (desperation) return passCall(g, rng, t, true);
  if (late && diff > 0) return runCall(g, rng, t, false);
  if (g.twoPoint) return rng.chance(0.5) ? passCall(g, rng, t, false) : runCall(g, rng, t, true);
  const s = starters(g.teams[side].players);
  let pPass = 0.45 + (s.QB.ovr - s.RB.ovr) * 0.006;
  if (g.toGo >= 8 && g.down >= 2) pPass = 0.72;
  else if (g.toGo <= 2) pPass = 0.28;
  if (q === 2 && clock < 90 && diff <= 7) pPass += 0.2;
  return rng.chance(pPass) ? passCall(g, rng, t, false) : runCall(g, rng, t, g.toGo <= 2);
}

function runCall(g, rng, t, short) {
  const w = short ? { dive: 4, keeper: 2, sweep: 1, draw: 0.5 } : { dive: 3, sweep: 2, draw: 1.5, keeper: 1.5 };
  return pick(rng, w, t);
}

function passCall(g, rng, t, deep) {
  if (deep) return pick(rng, { verts: 3, postcorner: 3, curls: 2, slants: 1.2, playaction: 1 }, t);
  const long = g.toGo >= 8;
  const w = long ? { curls: 3, postcorner: 2, verts: 1.5, slants: 1.5, screen: 1, playaction: 1 }
    : { slants: 3, curls: 2, screen: 1.5, playaction: 2, postcorner: 1, verts: 0.8 };
  return pick(rng, w, t);
}

export function defenseCall(g, rng) {
  const d = D(g), side = 1 - g.poss;
  const diff = g.score[side] - g.score[g.poss];
  let w;
  if (g.down >= 2 && g.toGo >= 9) w = { shell: 3, man: 2, base: 2, spy: 1, blitz: 1 };
  else if (g.toGo <= 2) w = { runstuff: 4, man: 1.5, blitz: 1.5, base: 1 };
  else if (g.ballOn >= 85) w = { man: 2, runstuff: 2, blitz: 1.5, base: 1 };
  else w = { base: 3, man: 1.5, runstuff: 1.5, shell: 1, spy: 1, blitz: 1 };
  if (g.quarter === 4 && g.clock < 150 && diff > 0) w = { shell: 4, base: 2, man: 1 };
  w.blitz = (w.blitz || 0) * (d.blitz / 0.12);
  // Better coaches lean against what the user keeps calling.
  if (g.tend && d.read > 0 && g.tend.run + g.tend.pass >= 6) {
    const runRate = g.tend.run / (g.tend.run + g.tend.pass);
    if (runRate > 0.6) w.runstuff = (w.runstuff || 0) + 2 * d.read;
    if (runRate < 0.4) { w.shell = (w.shell || 0) + 1.5 * d.read; w.man = (w.man || 0) + 1 * d.read; }
  }
  return pick(rng, w, d.temp);
}

export function patChoice(g) {
  const side = g.tryFor, m = g.score[side] - g.score[1 - side];
  if (g.quarter >= 4 && (g.quarter > 4 || g.clock < 480) && [-2, -5, -10, 1, 5].includes(m)) return 'two';
  return 'kick';
}

// AI timeouts: stop the clock late when it helps.
export function wantsTimeout(g, side) {
  if (g.ot || g.timeouts[side] <= 0 || g.runoff <= 0) return false;
  const diff = g.score[side] - g.score[1 - side];
  if (g.quarter === 4 && g.clock <= 150) {
    if (g.poss === side && diff <= 0) return true;
    if (g.poss !== side && diff < 0 && diff >= -16) return true;
  }
  if (g.quarter === 2 && g.clock <= 60 && g.poss === side && g.ballOn >= 50) return true;
  return false;
}
