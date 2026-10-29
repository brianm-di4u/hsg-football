// Kicking and clock-situation helpers shared by rules.js and ai.js (kept apart to avoid an import cycle).
export function fgDistance(ballOn) { return Math.round(100 - ballOn + 17); }
export function kickTolerance(kck, dist) { return 0.18 + kck * 0.004 - (dist - 20) * 0.009; }
export function kickRange(kck) { return 38 + kck * 0.22; }

export function canKneel(g) {
  if (g.ot || g.twoPoint || g.quarter < 4 && g.quarter !== 2) return false;
  const lead = g.score[g.poss] - g.score[1 - g.poss];
  if (g.quarter === 2) return g.clock <= 40;
  return lead > 0 && g.clock <= 120;
}
