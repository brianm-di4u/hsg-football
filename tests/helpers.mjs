// Shared helpers for the football tests (imported by *.test.mjs; not a test file itself).

export async function waitFor(t, pred, ms = 8000, label = 'condition') {
  const end = Date.now() + ms;
  let s;
  while (Date.now() < end) {
    s = await t.state();
    if (pred(s)) return s;
    await t.page.waitForTimeout(50);
  }
  t.fail(`timed out waiting for ${label}`);
  return s;
}

// Deterministic exhibition: user team is teams[0], no auto-continue, kickoff already done.
// Graphics pinned to the Low tier at full detail (the v2 look) so screenshots don't depend on the adaptive quality of
// the (software) test GPU or on the optional asset packs; tiers.test.mjs covers Medium and High.
export async function quickGame(t, { seed = 7, you = 'hot-springs', opp = 'lakeside', settings = {}, skipKickoff = true, receiver = 0, quarterMin = 4 } = {}) {
  await t.seed(seed);
  await t.game('setState', { settings: { autoContinue: false, sound: false, quality: 'low', detail: 2, ...settings } });
  await t.game('newGame', { mode: 'exhibition', you, opp, skipToss: true, skipKickoff, receiver, quarterMin, seed });
  return t.state();
}

// Put the user's offense in a situation and call a play (phase becomes 'pre').
export async function offenseAt(t, { ballOn = 30, down = 1, toGo = 10, absX = 26.67, quarter = 1, clock = 200 } = {}, play = 'dive') {
  await t.game('setState', { game: { phase: 'call', poss: 0, ballOn, down, toGo, absX, quarter, clock, runoff: 0, twoPoint: false, aiOff: null } });
  await t.game('act', 'call', play);
  return t.state();
}

export async function defenseAt(t, { ballOn = 30, down = 1, toGo = 10, absX = 26.67, quarter = 1, clock = 200 } = {}, call = 'base') {
  await t.game('setState', { game: { phase: 'call', poss: 1, ballOn, down, toGo, absX, quarter, clock, runoff: 0, twoPoint: false, aiOff: null } });
  await t.game('act', 'defCall', call);
  return t.state();
}

export const fresh = (t) => t.page.evaluate(() => { try { localStorage.clear(); } catch (e) { /* blocked */ } });
