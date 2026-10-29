// Playbook data (original names). Coordinates are offense-local yards:
// dx from the ball (+ = offense's right), ly from the line of scrimmage (+ = downfield).
// Route waypoints use `o` = the receiver's outside direction (+1 right side, −1 left side).

export const SLOTS = ['X', 'Z', 'SL', 'TE', 'RB']; // eligible receivers, badge order 1–5
export const BADGES = ['◆', '●', '▲', '■', '★'];
export const BADGE_NAMES = ['diamond', 'circle', 'triangle', 'square', 'star'];
export const OL = ['LT', 'LG', 'C', 'RG', 'RT'];

export const FORMATIONS = {
  gun:   { QB: [0, -5], RB: [2, -5], X: [-20, -0.4], Z: [20, -1.2], SL: [12, -1.2], TE: [5.6, -0.8] },
  pro:   { QB: [0, -1.2], RB: [0, -5.6], X: [-20, -0.4], Z: [19, -1.2], SL: [-11, -1.2], TE: [5.6, -0.8] },
  tight: { QB: [0, -1.2], RB: [0, -5.5], X: [-9, -0.4], Z: [10, -1.2], SL: [-7, -1.6], TE: [5.6, -0.8] },
};
export const OL_X = [-4.2, -2.1, 0, 2.1, 4.2];
export const OL_Y = -0.7;

// Route library. Each entry: { pts: [[dx, dy] relative to the receiver's start, using o], settle?, breakT }
// breakT: seconds after the snap when the route is "developed" (the auto-QB looks after this).
export const ROUTES = {
  go:     { pts: (o) => [[0, 45]], breakT: 1.8 },
  seam:   { pts: (o) => [[0, 8], [-o * 1.5, 40]], breakT: 1.6 },
  slant:  { pts: (o) => [[0, 2], [-o * 6, 8], [-o * 18, 18]], breakT: 0.6 },
  out:    { pts: (o) => [[0, 8], [o * 10, 8.5]], breakT: 1.2 },
  stick:  { pts: (o) => [[0, 5], [o * 1, 5]], settle: true, breakT: 0.9 },
  curl:   { pts: (o) => [[0, 12], [-o * 1, 10.5]], settle: true, breakT: 1.5 },
  dig:    { pts: (o) => [[0, 11], [-o * 16, 11.5]], breakT: 1.5 },
  deepX:  { pts: (o) => [[0, 12], [-o * 8, 20], [-o * 24, 26]], breakT: 2.0 },
  post:   { pts: (o) => [[0, 11], [-o * 9, 32]], breakT: 1.8 },
  corner: { pts: (o) => [[0, 11], [o * 9, 26]], breakT: 1.9 },
  flat:   { pts: (o) => [[o * 4, 0.5], [o * 12, 2]], breakT: 0.8 },
  drag:   { pts: (o) => [[-o * 3, 2.5], [-o * 22, 4]], breakT: 1.2 },
  check:  { pts: (o) => [[o * 3, -0.5], [o * 5, 4]], settle: true, breakT: 1.6 },
  wheel:  { pts: (o) => [[o * 5, 0], [o * 8, 6], [o * 8, 34]], breakT: 2.1 },
  screen: { pts: (o) => [[o * 3.5, 0.2], [o * 7.5, 1.2]], settle: true, breakT: 0.9 },
  stalk:  { pts: (o) => [[0, 5]], settle: true, breakT: 99, blocker: true }, // run plays: release then block
};

// Offensive plays. type: 'run' | 'pass'. read: auto-QB progression (slot names).
export const PLAYS = [
  { id: 'dive', key: 1, name: 'Bathhouse Dive', type: 'run', form: 'pro', desc: 'Quick handoff straight up the middle',
    carrier: 'RB', mesh: [0, -2.8], hole: [0.5, 0.5], meshT: 0.3, routes: { X: 'stalk', Z: 'stalk', SL: 'stalk', TE: 'block' } },
  { id: 'sweep', key: 2, name: 'Central Avenue Sweep', type: 'run', form: 'pro', desc: 'Toss wide right; the guard pulls to lead',
    carrier: 'RB', mesh: [2.4, -4], hole: [11, 1], path: [[2.4, -4], [8.5, -2.2], [11.5, 1.2], [12.5, 5]], meshT: 0.4, pull: 'RG', routes: { X: 'stalk', Z: 'stalk', SL: 'stalk', TE: 'block' } },
  { id: 'draw', key: 3, name: 'Steam Vent Draw', type: 'run', form: 'gun', desc: 'Shows pass, then a delayed handoff up the middle',
    carrier: 'RB', mesh: [0.8, -6.2], hole: [-1, 0.5], meshT: 0.85, qbDrop: -6.5, delay: 0.55, routes: { X: 'go', Z: 'go', SL: 'stalk', TE: 'block' } },
  { id: 'keeper', key: 4, name: 'Ridge Keeper', type: 'run', form: 'gun', desc: 'Fake the handoff; the QB keeps off tackle',
    carrier: 'QB', fake: true, mesh: [1.2, -4.8], hole: [5.5, 0.5], meshT: 0.5, routes: { X: 'stalk', Z: 'stalk', SL: 'stalk', TE: 'block' } },
  { id: 'slants', key: 5, name: 'Promenade Slants', type: 'pass', form: 'gun', desc: 'Quick three-step slants; ball out fast',
    drop: -6.3, readT: 0.6, maxHold: 2.2, routes: { X: 'slant', Z: 'slant', SL: 'slant', TE: 'stick', RB: 'check' }, read: ['SL', 'Z', 'X', 'TE', 'RB'] },
  { id: 'verts', key: 6, name: 'Arlington Verticals', type: 'pass', form: 'gun', desc: 'Four deep routes; needs time to throw',
    drop: -7.5, readT: 1.8, maxHold: 3.6, routes: { X: 'go', Z: 'go', SL: 'seam', TE: 'seam', RB: 'block' }, read: ['SL', 'TE', 'Z', 'X'] },
  { id: 'curls', key: 7, name: 'Hollow Curls', type: 'pass', form: 'gun', desc: 'Curls at 10–12 yards, TE flat, RB check-down',
    drop: -7, readT: 1.3, maxHold: 3.0, routes: { X: 'curl', Z: 'curl', SL: 'out', TE: 'flat', RB: 'check' }, read: ['Z', 'X', 'SL', 'TE', 'RB'] },
  { id: 'postcorner', key: 8, name: 'Gorge Post-Corner', type: 'pass', form: 'pro', desc: 'Post and corner stretch a safety; slot dig underneath',
    drop: -7.5, readT: 1.7, maxHold: 3.4, routes: { X: 'post', Z: 'corner', SL: 'dig', TE: 'block', RB: 'check' }, read: ['X', 'Z', 'SL', 'RB'] },
  { id: 'screen', key: 9, name: 'Tufa Screen', type: 'pass', form: 'gun', desc: 'Line releases; RB screen behind blockers',
    drop: -7, readT: 0.95, maxHold: 2.2, screen: true, routes: { X: 'go', Z: 'go', SL: 'go', TE: 'block', RB: 'screen' }, read: ['RB', 'SL', 'TE'] },
  { id: 'playaction', key: 0, name: 'Fountain Play-Action', type: 'pass', form: 'pro', desc: 'Fake the dive; TE drag and a deep crosser',
    drop: -8, readT: 1.9, maxHold: 3.6, fake: true, mesh: [0, -3.2], routes: { X: 'deepX', Z: 'go', SL: 'out', TE: 'drag', RB: 'block' }, read: ['X', 'TE', 'Z', 'SL'] },
];

export const SPECIALS = [
  { id: 'punt', name: 'Punt', type: 'special', desc: 'Kick it away and flip the field' },
  { id: 'fg', name: 'Field Goal', type: 'special', desc: 'Three points if it splits the uprights' },
  { id: 'kneel', name: 'Victory Kneel', type: 'special', desc: 'QB takes a knee; the clock keeps running' },
];

// Defensive calls. Roles by position: DL1–4, LB1–3 (L, M, R), CB1 (left), CB2 (right), S1 (free), S2 (strong).
// role: rush | man:<slot> | zone:<landmark> | fit | spy
export const DEFS = [
  { id: 'base', key: 1, name: 'Base Zone', desc: 'Four rush, three deep, four under', vs: 'Balanced',
    roles: { LB1: 'zone:curlL', LB2: 'zone:hookM', LB3: 'zone:hookR', CB1: 'zone:deepL', CB2: 'zone:deepR', S1: 'zone:deepM', S2: 'zone:flatR' },
    align: { LB: 4.5, CB: 6, S1: 12, S2: 8 } },
  { id: 'man', key: 2, name: 'Man Press', desc: 'Man on every receiver, one deep safety', vs: 'Quick passes',
    roles: { LB1: 'man:RB', LB2: 'spy', LB3: 'man:TE', CB1: 'man:X', CB2: 'man:Z', S1: 'zone:deepM', S2: 'man:SL' },
    align: { LB: 4.5, CB: 1.5, S1: 13, S2: 6 } },
  { id: 'shell', key: 3, name: 'Deep Shell', desc: 'Two deep and deep corners; soft underneath', vs: 'Deep passes',
    roles: { LB1: 'zone:curlL', LB2: 'zone:hookM', LB3: 'zone:curlR', CB1: 'zone:qtrL', CB2: 'zone:qtrR', S1: 'zone:halfL', S2: 'zone:halfR' },
    align: { LB: 5.5, CB: 9, S1: 16, S2: 16 } },
  { id: 'runstuff', key: 4, name: 'Run Stuff', desc: 'Eight in the box with quick run fits', vs: 'Runs',
    roles: { LB1: 'fit', LB2: 'fit', LB3: 'fit', CB1: 'man:X', CB2: 'man:Z', S1: 'zone:deepM', S2: 'fit' },
    align: { LB: 3.5, CB: 4, S1: 12, S2: 5 } },
  { id: 'blitz', key: 5, name: 'Fire Blitz', desc: 'Six rush with zero coverage behind it', vs: 'Slow plays',
    roles: { LB1: 'rush', LB2: 'rush', LB3: 'man:RB', CB1: 'man:X', CB2: 'man:Z', S1: 'man:SL', S2: 'man:TE' },
    align: { LB: 3, CB: 2, S1: 8, S2: 6 } },
  { id: 'spy', key: 6, name: 'Spy Squeeze', desc: 'A linebacker spies the QB; zone underneath', vs: 'QB runs, screens',
    roles: { LB1: 'zone:flatL', LB2: 'spy', LB3: 'zone:flatR', CB1: 'zone:deepL', CB2: 'zone:deepR', S1: 'zone:deepM', S2: 'zone:hookR' },
    align: { LB: 4.5, CB: 6, S1: 13, S2: 7 } },
];

// Zone landmarks: [dx from ball, ly, radius]
export const ZONES = {
  deepL: [-17, 17, 11], deepM: [0, 19, 12], deepR: [17, 17, 11],
  halfL: [-8, 18, 12], halfR: [8, 18, 12], qtrL: [-20, 14, 9], qtrR: [20, 14, 9],
  hookM: [0, 7, 7], hookR: [7, 7, 7], hookL: [-7, 7, 7],
  curlL: [-12, 7, 8], curlR: [12, 7, 8], flatL: [-16, 3.5, 7], flatR: [16, 3.5, 7],
};

export const playById = (id) => PLAYS.find((p) => p.id === id) || SPECIALS.find((p) => p.id === id);
export const defById = (id) => DEFS.find((d) => d.id === id);
