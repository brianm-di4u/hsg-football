// Accessibility and platform: keyboard-only play, contrast in both themes, reduced motion, text size,
// audio, save/continue, blocked storage (AC33–AC37, AC39).
import { quickGame, offenseAt, waitFor, fresh } from './helpers.mjs';

async function contrastReport(t, selectors) {
  return t.page.evaluate((sels) => {
    const parse = (c) => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(',').map((x) => parseFloat(x)); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
    const lum = (c) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b); };
    const blend = (top, under) => ({ r: top.r * top.a + under.r * (1 - top.a), g: top.g * top.a + under.g * (1 - top.a), b: top.b * top.a + under.b * (1 - top.a), a: 1 });
    // Nearest background, compositing translucent layers over the next opaque one.
    const bgOf = (el) => {
      const stack = [];
      for (let e = el; e; e = e.parentElement) {
        const c = parse(getComputedStyle(e).backgroundColor);
        if (c && c.a > 0) { stack.push(c); if (c.a >= 0.99) break; }
      }
      let base = stack.length && stack[stack.length - 1].a >= 0.99 ? stack.pop() : parse(getComputedStyle(document.body).backgroundColor);
      while (stack.length) base = blend(stack.pop(), base);
      return base;
    };
    const out = [];
    for (const s of sels) for (const el of document.querySelectorAll(s)) {
      const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
      if (!r.width || cs.visibility === 'hidden' || cs.display === 'none' || el.closest('[hidden]') || !el.textContent.trim() || el.disabled || el.closest('[disabled]')) continue;
      const fg = parse(cs.color), bg = bgOf(el); if (!fg || !bg) continue;
      const a = lum(fg), b = lum(bg); const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
      out.push({ s, text: el.textContent.trim().slice(0, 28), ratio: +ratio.toFixed(2) });
    }
    return out;
  }, selectors);
}
const TEXT = ['.btn', '.card .nm', '.card .ds', '.card .ty', '.card .k', '.tc-name', '.tc-sub', '.tag', '.note', '.small', 'h2', 'h3', '.eyebrow', '.tbl td', '.tbl th', '.sb-abbr', '.sb-score', '.sb-clock', '.sb-down', '.hint', '.log li', '.fact', '.factcard p', '.seg button', '.headline', '.sub', '.prose p', '.prose li', '.recap', '.venue', '.mt b', '.mt span', '.tog span', '.seg-label', '.warn', '.tag-line', '.fine', '.logo span'];

async function screensContrast(t) {
  const bad = [];
  const check = async (label) => { for (const r of await contrastReport(t, TEXT)) if (r.ratio < 4.5) bad.push(`${label}: ${r.s} "${r.text}" ${r.ratio}`); };
  await t.game('scene', 'title'); await check('title');
  await t.game('scene', 'exhibition'); await check('exhibition');
  await t.game('scene', 'help'); for (const tab of ['basics', 'controls', 'rules', 'credits']) { await t.page.click(`[data-act="helpTab"][data-id="${tab}"]`); await check(`help-${tab}`); }
  await t.game('scene', 'settings'); await check('settings');
  await t.game('scene', 'challenges'); await check('challenges');
  await quickGame(t, { seed: 5 });
  await check('call');
  await t.game('act', 'call', 'curls'); await check('pre');
  await t.game('act', 'finishPlay'); await check('result');
  await t.game('setState', { game: { phase: 'call', poss: 1, aiOff: null, ballOn: 30, down: 1, toGo: 10 } }); await check('defense');
  await t.game('scene', 'halftime'); await check('halftime');
  await t.game('act', 'autoplay', 8000); await waitFor(t, (s) => s.scene === 'final', 3000, 'final'); await check('final');
  await t.game('newGame', { mode: 'season', team: 'mountain-pine' });
  for (const tab of ['schedule', 'standings', 'roster']) { await t.game('setState', { ui: { tab } }); await check(`season-${tab}`); }
  return bad;
}

export const tests = [
  {
    name: 'keyboard only: title to plays to pause and quit',
    async run(t) {
      await fresh(t); await t.reload();
      await t.seed(201);
      await t.game('setState', { settings: { sound: false, autoContinue: false } });
      await t.game('scene', 'title');
      const focused = () => t.page.evaluate(() => (document.activeElement && (document.activeElement.dataset.act + ':' + (document.activeElement.dataset.id || ''))) || '');
      t.equal(await focused(), 'go:exhibition', 'Exhibition has focus on the title');
      await t.page.keyboard.press('Enter');
      t.equal((await t.state()).scene, 'exhibition', 'Enter opens Exhibition');
      t.equal(await focused(), 'startExhibition:', 'Kick off has focus');
      await t.page.keyboard.press('Enter');
      let s = await t.state();
      t.equal(s.scene, 'pregame', 'Enter starts the game');
      await t.page.keyboard.press('Enter');
      s = await t.state();
      t.expect(!!s.game.toss, 'Enter calls the toss (Heads)');
      await t.page.keyboard.press('Enter');
      s = await t.state();
      t.equal([s.scene, s.game.phase], ['game', 'kickoff'], 'Enter kicks off');
      await t.page.keyboard.press('Space');
      s = await t.state();
      t.equal(s.game.phase, 'result', 'Space skips the kick animation');
      await t.page.keyboard.press('Space');
      s = await waitFor(t, (x) => x.game.phase === 'call' || x.game.phase === 'pre', 4000, 'a call');
      // play three snaps by keyboard on whichever side we're on
      for (let i = 0; i < 3; i++) {
        s = await waitFor(t, (x) => ['call', 'pre', 'result', 'pat', 'kick', 'kickoff'].includes(x.game.phase) && !x.overlay, 15000, 'ready');
        if (s.game.phase === 'call') await t.page.keyboard.press(s.game.userOffense ? '1' : '4');
        s = await t.state();
        if (s.game.phase === 'pre') await t.page.keyboard.press('Space');
        if (s.game.phase === 'kick') await t.page.keyboard.press('Space');
        if (s.game.phase === 'kickoff') await t.page.keyboard.press('Space');
        if (s.game.phase === 'pat') await t.page.keyboard.press('1');
        s = await waitFor(t, (x) => x.game.phase !== 'live', 15000, 'play over');
        if (s.game.phase === 'result') await t.page.keyboard.press('Space');
      }
      s = await t.state();
      t.expect(s.game.plays >= 2, `played ${s.game.plays} snaps by keyboard`);
      await t.shot('42-keyboard');
      await t.page.keyboard.press('Escape');
      s = await t.state();
      t.equal(s.overlay, 'pause', 'Esc pauses');
      const order = [];
      for (let i = 0; i < 5; i++) { order.push(await focused()); await t.page.keyboard.press('Tab'); }
      t.expect(order.includes('quit:'), `Tab reaches Quit (${order.join(', ')})`);
      await t.page.focus('[data-act="quit"]');
      await t.page.keyboard.press('Enter');
      t.equal((await t.state()).scene, 'title', 'Quit to title');
    },
  },
  {
    name: 'contrast ≥ 4.5 in the night theme',
    viewports: ['desktop'],
    async run(t) {
      await t.game('setState', { settings: { theme: 'night', sound: false, autoContinue: false } });
      const bad = await screensContrast(t);
      t.equal(bad, [], 'all text pairs pass in night theme');
    },
  },
  {
    name: 'contrast ≥ 4.5 in the day theme',
    viewports: ['desktop'],
    async run(t) {
      await t.game('setState', { settings: { theme: 'day', sound: false, autoContinue: false } });
      const bad = await screensContrast(t);
      t.equal(bad, [], 'all text pairs pass in day theme');
      await t.game('setState', { settings: { theme: 'night' } });
    },
  },
  {
    name: 'day theme screens',
    async run(t) {
      await t.game('setState', { settings: { theme: 'day', sound: false, autoContinue: false } });
      await t.game('scene', 'title');
      await t.shot('43-day-title');
      await quickGame(t, { seed: 6, settings: { theme: 'day' } });
      await offenseAt(t, { ballOn: 30 }, 'postcorner');
      await t.shot('43b-day-presnap');
      await t.checkLayout();
      await t.game('setState', { settings: { theme: 'night' } });
    },
  },
  {
    name: 'reduced motion',
    reducedMotion: true,
    async run(t) {
      await quickGame(t, { seed: 7, settings: { motion: 'auto' } });
      let s = await t.state();
      t.equal(s.reduced, true, 'prefers-reduced-motion is honored');
      await t.game('setState', { game: { ballOn: 80 } });
      await t.game('act', 'forceResult', { kind: 'td', yards: 20, scorer: 'O', clockStops: true });
      const anim = await t.page.evaluate(() => { const el = document.querySelector('.toast-in'); return el ? getComputedStyle(el).animationName : 'none'; });
      t.equal(anim, 'none', 'toast has no animation');
      await t.page.waitForTimeout(150);
      s = await t.state();
      t.equal(s.fx, 0, 'no TD burst under reduced motion');
      t.equal(await t.game('isIdle'), true, 'nothing to wait on (instant camera, no shake)');
      await t.shot('44-reduced-motion');
    },
  },
  {
    name: 'text size 130%',
    async run(t) {
      await quickGame(t, { seed: 8, settings: { textScale: 1.3 } });
      await t.shot('45-text-130');
      await t.checkLayout();
      await t.game('act', 'call', 'slants');
      await t.checkLayout();
      await t.game('newGame', { mode: 'season', team: 'cutter-morning-star' });
      await t.shot('45b-text-130-season');
      await t.checkLayout({ allowScrollY: true });
      await t.game('setState', { settings: { textScale: 1 } });
    },
  },
  {
    name: 'audio after a gesture; M mutes',
    async run(t) {
      await t.game('setState', { settings: { sound: true } });
      await t.game('scene', 'title');
      await t.page.click('[data-act="go"][data-id="help"]');
      const a = await t.game('act', 'audio');
      t.equal(a.ready, true, 'audio context created after a click');
      await t.page.keyboard.press('m');
      t.equal((await t.state()).settings.sound, false, 'M mutes');
      await t.page.keyboard.press('m');
      t.equal((await t.state()).settings.sound, true, 'M unmutes');
      await t.game('scene', 'settings');
      await t.page.fill('[data-set="volume"]', '30');
      await t.page.dispatchEvent('[data-set="volume"]', 'change');
      t.equal((await t.state()).settings.volume, 0.3, 'volume slider');
    },
  },
  {
    name: 'autosave and continue',
    async run(t) {
      await fresh(t); await t.reload();
      await quickGame(t, { seed: 9 });
      await offenseAt(t, { ballOn: 47, down: 3, toGo: 4, quarter: 2, clock: 75 }, 'dive');
      await t.game('act', 'finishPlay');
      const before = (await t.state()).game;
      t.equal(await t.game('act', 'save'), true, 'saved');
      await t.reload();
      let s = await t.state();
      t.equal([s.scene, s.hasSave], ['title', true], 'Continue appears');
      await t.shot('01b-title-continue');
      await t.page.click('[data-act="continue"]');
      s = await t.state();
      t.equal(s.scene, 'game', 'continued into the game');
      t.equal([s.game.score, s.game.ballOn, s.game.down, s.game.toGo, s.game.quarter, s.game.poss], [before.score, before.ballOn, before.down, before.toGo, before.quarter, before.poss], 'exact situation restored');
      // season persists too
      await t.game('newGame', { mode: 'season', team: 'fountain-lake' });
      await t.game('act', 'simWeek');
      await t.game('act', 'save');
      await t.reload();
      s = await t.state();
      await t.page.click('[data-act="continue"]');
      s = await t.state();
      t.equal([s.scene, s.season.userTeam, s.season.week], ['season', 'fountain-lake', 1], 'season restored');
    },
  },
  {
    name: 'plays with localStorage blocked',
    initScript: () => { Object.defineProperty(window, 'localStorage', { get() { throw new Error('blocked'); } }); },
    async run(t) {
      const s0 = await t.state();
      t.equal(s0.saveOk, false, 'reports storage unavailable');
      await quickGame(t, { seed: 10 });
      await t.game('act', 'call', 'dive');
      await t.game('act', 'finishPlay');
      t.equal((await t.state()).game.phase, 'result', 'game plays without storage');
      await t.game('scene', 'settings');
      t.expect(/Saving unavailable/.test(await t.page.textContent('#screen')), 'Settings says saving is unavailable');
      await t.shot('47-storage-blocked');
    },
  },
];
