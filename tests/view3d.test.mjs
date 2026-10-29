// The 3D field view: WebGL on, venues, posed players, projection for taps and badges, replays, settings, and the
// 2D fallback. (The harness Chromium renders WebGL in software, so frame rates here are a floor; see perf.)
import { quickGame, offenseAt, defenseAt } from './helpers.mjs';

export const tests = [
  {
    name: '3D stadium view is on, with a sourced venue layout',
    async run(t) {
      await quickGame(t, { seed: 501, you: 'lake-hamilton', opp: 'lakeside' });
      let s = await t.state();
      t.equal(s.view3d, true, '3D view is active');
      t.equal(s.gfx.on, true, 'WebGL renderer initialised');
      t.equal(s.gfx.venue, 'wolf', 'Lake Hamilton home game uses the Wolf Stadium layout');
      t.expect(s.gfx.calls > 20 && s.gfx.calls < 140, `draw calls in budget (${s.gfx.calls})`);
      t.expect(s.gfx.tris < 400000, `triangles in budget (${s.gfx.tris})`);
      t.log(`renderer ${s.gfx.renderer}; ${s.gfx.calls} calls, ${s.gfx.tris} tris, cpu ${s.gfx.cpuMs} ms, venue ${s.gfx.venue}, weather ${s.gfx.weather}`);
      await t.shot('50-wolf-huddle');
      await quickGame(t, { seed: 502, you: 'hot-springs', opp: 'lake-hamilton' });
      s = await t.state();
      t.equal(s.gfx.venue, 'reese', 'Hot Springs home game uses the Joe C. Reese Stadium layout');
      await t.shot('51-reese-huddle');
      await quickGame(t, { seed: 503, you: 'jessieville', opp: 'tufa-ridge' });
      s = await t.state();
      t.equal(s.gfx.venue, 'small', 'a 3A home field is a generic small stadium');
      await t.checkLayout();
    },
  },
  {
    name: 'pre-snap stances, live run cycle, tackle fall',
    async run(t) {
      await quickGame(t, { seed: 504, you: 'lakeside', opp: 'hot-springs' });
      await offenseAt(t, { ballOn: 35 }, 'dive');
      await t.shot('52-stance');
      await t.game('pause');
      await t.game('act', 'snap');
      await t.game('step', 45);
      const live = await t.state();
      t.equal(live.game.phase, 'live', 'play is live');
      await t.shot('53-run-3d', { wait: false });
      await t.game('act', 'finishPlay');
      await t.game('resume');
      await t.waitForStable(4000);
      const s = await t.state();
      t.equal(s.game.phase, 'result', 'result after the play');
      await t.shot('54-tackle');
    },
  },
  {
    name: 'receiver badges and taps follow the 3D projection',
    async run(t) {
      await quickGame(t, { seed: 505, settings: { autoQB: false } });
      await offenseAt(t, { ballOn: 30 }, 'slants');
      await t.game('pause');
      await t.game('act', 'snap');
      await t.game('step', 40);
      const lay = await t.game('act', 'layout');
      const f = lay.field;
      t.equal(lay.receivers.length, 5, 'five throwable receivers projected');
      const inside = lay.receivers.filter((r) => r.x > f.x && r.x < f.x + f.w && r.y > f.y && r.y < f.y + f.h);
      t.expect(inside.length >= 4, `receivers on screen (${inside.length}/5)`);
      const target = lay.receivers.find((r) => r.slot === 'Z') || inside[0];
      // tap while paused: the tap queues the throw and the next tick releases it
      if (t.viewport === 'mobile') await t.tap([target.x, target.y]); else await t.page.mouse.click(target.x, target.y);
      await t.game('step', 2);
      const s = await t.state();
      t.equal(s.game.live && s.game.live.thrown, true, `tapping receiver ${target.slot} in 3D throws to him`);
      await t.game('step', 30);
      await t.shot('55-ball-air-3d', { wait: false });
      await t.game('act', 'finishPlay');
      await t.game('resume');
    },
  },
  {
    name: 'replay plays back the last play from the sideline',
    async run(t) {
      await quickGame(t, { seed: 506 });
      await offenseAt(t, { ballOn: 40 }, 'sweep');
      await t.game('pause');
      await t.game('act', 'snap');
      await t.game('act', 'finishPlay');
      await t.game('resume');
      await t.waitForStable(4000);
      let s = await t.state();
      t.equal(s.game.phase, 'result', 'result phase');
      const lay = await t.game('act', 'layout');
      t.expect(!!lay.replay, 'Replay button shown after a play');
      t.equal(await t.game('act', 'replay', 0.6), true, 'replay starts');
      s = await t.state();
      t.equal(s.gfx.replay, true, 'replay running');
      t.expect(Math.abs(s.gfx.cam.yaw) > 1, `sideline camera angle (yaw ${s.gfx.cam.yaw})`);
      await t.shot('56-replay', { wait: false });
      await t.page.keyboard.press('Space');
      s = await t.state();
      t.equal(s.gfx.replay, false, 'Space ends the replay and continues');
    },
  },
  {
    name: 'kickoff, field goal and defense cameras',
    async run(t) {
      await quickGame(t, { seed: 507, skipKickoff: false });
      await t.game('act', 'animAt', 700);
      await t.shot('57-kickoff-3d');
      await t.game('act', 'animAt', null);
      await t.game('act', 'advance');
      await t.game('setState', { game: { phase: 'call', poss: 0, ballOn: 72, down: 4, toGo: 6, aiOff: null } });
      await t.game('act', 'call', 'fg');
      const s = await t.state();
      t.equal(s.game.phase, 'kick', 'field goal set up');
      await t.shot('58-fg-3d');
      await defenseAt(t, { ballOn: 45 }, 'blitz');
      await t.shot('59-defense-presnap');
    },
  },
  {
    name: 'weather and theme rebuild the stadium',
    viewports: ['desktop'],
    async run(t) {
      await quickGame(t, { seed: 508, settings: { weather: 'rain' } });
      let s = await t.state();
      t.equal(s.gfx.weather, 'rain', 'rain weather');
      await t.shot('60-rain');
      await t.game('setState', { settings: { weather: 'mist', theme: 'day' } });
      s = await t.state();
      t.equal(s.gfx.weather, 'mist', 'mist weather');
      await t.shot('61-day-mist');
      await t.game('setState', { settings: { weather: 'auto', theme: 'night' } });
    },
  },
  {
    name: '2D classic fallback with ?gl=0 and via Settings',
    url: 'index.html?gl=0',
    async run(t) {
      await quickGame(t, { seed: 509 });
      let s = await t.state();
      t.equal(s.view3d, false, '?gl=0 uses the 2D field');
      await offenseAt(t, { ballOn: 30 }, 'slants');
      await t.shot('62-fallback-2d');
      await t.game('setState', { settings: { graphics: 'auto' } });
      s = await t.state();
      t.equal(s.view3d, true, 'switching Field view back to 3D in Settings');
      await t.game('setState', { settings: { graphics: '2d' } });
      s = await t.state();
      t.equal(s.view3d, false, 'and back to 2D classic');
    },
  },
];
