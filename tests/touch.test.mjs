// Mobile touch: drag to steer, tap to throw, tap targets ≥ 44 px (AC38).
import { quickGame, offenseAt } from './helpers.mjs';

async function smallTargets(t) {
  return t.page.evaluate(() => [...document.querySelectorAll('button, input, [data-act]')].filter((el) => {
    const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
    if (el.type === 'checkbox' && el.closest('label') && el.closest('label').getBoundingClientRect().height >= 44) return false; // the whole label row is the target
    return r.width && r.height && cs.visibility !== 'hidden' && cs.display !== 'none' && r.bottom > 0 && r.top < innerHeight && !el.closest('[hidden]');
  }).map((el) => { const r = el.getBoundingClientRect(); return { label: (el.textContent || el.getAttribute('aria-label') || el.dataset.act || '').trim().slice(0, 22), w: Math.round(r.width), h: Math.round(r.height) }; })
    .filter((b) => b.h < 44 || b.w < 44));
}

export const tests = [
  {
    name: 'drag on the field steers the runner',
    viewports: ['mobile'],
    async run(t) {
      await quickGame(t, { seed: 301 });
      await offenseAt(t, { ballOn: 30 }, 'sweep');
      await t.game('pause');
      await t.game('act', 'snap');
      await t.game('step', 50);
      let s = await t.state();
      t.equal(s.game.live.carrierSlot, 'RB', 'RB has the ball');
      const x0 = s.game.live.ballX, y0 = s.game.live.ballY;
      // set the touch up while paused, then let the play run with the finger down (frames can be slow under
      // software WebGL, and the play must not end before the drag lands)
      const lay = await t.game('act', 'layout');
      const f = lay.field;
      // drag straight up-left: the vector from the touch start is the steering direction
      const start = [f.cx, f.cy];
      // t.touchDrag holds before moving; steering needs the finger held after the move, so drive CDP directly.
      const cdp = await t.page.context().newCDPSession(t.page);
      const pt = ([x, y]) => [{ x, y, id: 1, radiusX: 4, radiusY: 4, force: 1 }];
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: pt(start) });
      for (let i = 1; i <= 6; i++) await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: pt([start[0] - 90 * i / 6, start[1] - 40 * i / 6]) });
      await t.game('resume');
      // hold until about 0.9 s of game time has passed (real frames can be slow under software WebGL)
      const t0 = s.game.live.t;
      let mid = await t.state();
      for (let k = 0; k < 100 && mid.game.phase === 'live' && mid.game.live.t - t0 < 0.9; k++) { await t.page.waitForTimeout(100); mid = await t.state(); }
      await t.shot('46-touch-steer', { wait: false });
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
      await cdp.detach();
      s = mid;
      t.log(`pointer events: ${JSON.stringify(s.ptr)}`);
      const dx = s.game.live.ballX - x0, dy = s.game.live.ballY - y0;
      t.expect(dx < 0, `touch drag up-left moves the runner left (dx ${dx.toFixed(1)}, dy ${dy.toFixed(1)})`);
      await t.game('act', 'finishPlay');
    },
  },
  {
    name: 'tap targets are at least 44 px',
    viewports: ['mobile'],
    async run(t) {
      const fails = [];
      const check = async (label) => { for (const b of await smallTargets(t)) fails.push(`${label}: "${b.label}" ${b.w}×${b.h}`); };
      await t.game('scene', 'title'); await check('title');
      await t.game('scene', 'exhibition'); await check('exhibition');
      await t.game('scene', 'settings'); await check('settings');
      await t.game('scene', 'help'); await check('help');
      await quickGame(t, { seed: 302 }); await check('call');
      await t.game('act', 'call', 'curls'); await check('pre');
      await t.game('pause'); await t.game('act', 'snap'); await t.game('step', 60); await check('live');
      await t.game('act', 'finishPlay'); await t.game('resume'); await check('result');
      await t.game('setState', { game: { phase: 'call', poss: 1, aiOff: null, ballOn: 40, down: 1, toGo: 10 } }); await check('defense');
      await t.game('newGame', { mode: 'season', team: 'hot-springs' }); await check('season');
      t.equal(fails, [], 'no tap target under 44 px');
    },
  },
];
