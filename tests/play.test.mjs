// Core play: calls, formations, snap, throws, runs, juke, tackles, field render (AC7–AC12, AC31, AC32).
import { quickGame, offenseAt, defenseAt, waitFor } from './helpers.mjs';

export const tests = [
  {
    name: 'offense playbook and pre-snap',
    async run(t) {
      await quickGame(t, { seed: 11 });
      let s = await t.state();
      t.equal(s.game.phase, 'call', 'kickoff done, calling a play');
      t.equal(s.game.userOffense, true, 'user receives the opening kickoff');
      await t.game('setState', { game: { ballOn: 30, down: 1, toGo: 10, absX: 26.67 } });
      const cards = await t.page.$$eval('#panel .card', (els) => els.map((e) => e.dataset.id));
      t.equal(cards, ['dive', 'sweep', 'draw', 'keeper', 'slants', 'verts', 'curls', 'postcorner', 'screen', 'playaction'], '10 plays on 1st down');
      await t.shot('08-call-offense');
      await t.page.keyboard.press('7');
      s = await t.state();
      t.equal(s.game.phase, 'pre', 'number key calls a play');
      t.equal(s.game.offCall, 'curls', 'key 7 = Hollow Curls');
      t.equal(s.game.live.agents, 22, '22 players on the field');
      t.equal(s.game.live.receivers.length, 5, 'five receiver badges before the snap');
      await t.shot('10-presnap');
      await t.checkLayout();
    },
  },
  {
    name: 'pass by key with a live frame and a catch',
    async run(t) {
      await quickGame(t, { seed: 21, settings: { autoQB: false } });
      await offenseAt(t, { ballOn: 35 }, 'slants');
      await t.game('pause');
      await t.game('act', 'snap');
      await t.game('step', 50);
      let s = await t.state();
      t.equal(s.game.phase, 'live', 'play is live');
      t.expect(s.game.live.canThrow, 'QB can throw');
      await t.shot('11-live-pass', { wait: false });
      await t.page.keyboard.press('2');
      await t.game('step', 2);
      s = await t.state();
      t.expect(s.game.live.thrown, 'key 2 throws');
      await t.game('step', 14);
      await t.shot('11b-ball-air', { wait: false });
      await t.game('act', 'finishPlay');
      s = await t.state();
      t.equal(s.game.phase, 'result', 'play over');
      t.expect(['inc', 'tackle', 'oob', 'td', 'int', 'touchback', 'fumbleLost'].includes(s.game.live.result.kind), `pass result ${s.game.live.result.kind}`);
      await t.game('resume');
      await t.shot('12-result');
      await t.checkLayout();
    },
  },
  {
    name: 'throw by tapping the receiver badge button and on the field',
    async run(t) {
      await quickGame(t, { seed: 5, settings: { autoQB: false } });
      await offenseAt(t, { ballOn: 40 }, 'curls');
      await t.game('pause');
      await t.game('act', 'snap');
      await t.game('step', 90);
      let lay = await t.game('act', 'layout');
      t.expect(!!lay['throw:Z'], 'badge button for receiver 2');
      await t.page.mouse.click(lay['throw:Z'].cx, lay['throw:Z'].cy);
      await t.game('step', 2);
      let s = await t.state();
      t.expect(s.game.live.thrown, 'badge button throws');
      await t.game('act', 'finishPlay');
      // on-field tap
      await t.game('act', 'advance');
      await offenseAt(t, { ballOn: 40 }, 'curls');
      await t.game('act', 'snap');
      await t.game('step', 90);
      lay = await t.game('act', 'layout');
      const r = lay.receivers.find((x) => x.slot === 'X') || lay.receivers[0];
      t.expect(!!r, 'receiver target on the field');
      if (t.viewport === 'mobile') await t.tap([r.x, r.y]); else await t.page.mouse.click(r.x, r.y);
      await t.game('step', 2);
      s = await t.state();
      t.expect(s.game.live.thrown, 'tapping the receiver on the field throws');
      await t.game('act', 'finishPlay');
      await t.game('resume');
    },
  },
  {
    name: 'auto-QB throws on a read; off holds the ball',
    async run(t) {
      await quickGame(t, { seed: 9, settings: { autoQB: true } });
      await offenseAt(t, { ballOn: 30 }, 'slants');
      await t.game('pause');
      await t.game('act', 'snap');
      await t.game('step', 200);
      let s = await t.state();
      t.expect(s.game.live.thrown || s.game.phase !== 'live', 'auto-QB threw (or the play ended)');
      await t.game('act', 'finishPlay');
      await t.game('act', 'advance');
      await t.game('setState', { settings: { autoQB: false } });
      await offenseAt(t, { ballOn: 30 }, 'verts');
      await t.game('act', 'snap');
      await t.game('step', 200);
      s = await t.state();
      t.expect(!s.game.live.thrown, 'with auto-QB off the QB holds');
      await t.game('act', 'finishPlay');
      s = await t.state();
      t.expect(s.game.live.thrown === false, 'no throw happened');
      t.expect(['sack', 'tackle', 'safety', 'fumbleLost'].includes(s.game.live.result.kind), `held ball ends in ${s.game.live.result.kind}`);
      await t.game('resume');
    },
  },
  {
    name: 'run with steering and juke',
    async run(t) {
      await quickGame(t, { seed: 33 });
      await offenseAt(t, { ballOn: 30 }, 'dive');
      await t.game('pause');
      await t.game('act', 'snap');
      await t.game('step', 45);
      let s = await t.state();
      t.equal(s.game.live.carrierSlot, 'RB', 'handoff to the RB');
      await t.shot('14-run-live', { wait: false });
      const x0 = s.game.live.ballX;
      await t.page.keyboard.down('ArrowRight');
      await t.game('step', 30);
      await t.page.keyboard.up('ArrowRight');
      s = await t.state();
      t.expect(s.game.live.ballX > x0 + 1.5 || s.game.phase !== 'live', `steering right moves the runner right (${x0.toFixed(1)} → ${s.game.live.ballX.toFixed(1)})`);
      await t.page.keyboard.press('j');
      await t.game('step', 3);
      await t.game('act', 'finishPlay');
      s = await t.state();
      t.equal(s.game.phase, 'result', 'run ends');
      await t.game('resume');
    },
  },
  {
    name: 'defense calls and AI offense',
    async run(t) {
      await quickGame(t, { seed: 41 });
      await t.game('setState', { game: { phase: 'call', poss: 1, ballOn: 30, down: 2, toGo: 7, absX: 26.67, aiOff: null } });
      const cards = await t.page.$$eval('#panel .card', (els) => els.map((e) => e.dataset.id));
      t.equal(cards, ['base', 'man', 'shell', 'runstuff', 'blitz', 'spy'], 'six defensive calls');
      await t.shot('09-call-defense');
      await t.page.keyboard.press('5');
      let s = await t.state();
      t.equal(s.game.defCall, 'blitz', 'key 5 = Fire Blitz');
      t.equal(s.game.phase, 'pre', 'offense lined up');
      t.expect(!!s.game.offCall, `AI called ${s.game.offCall}`);
      await t.game('act', 'finishPlay');
      s = await t.state();
      t.equal(s.game.phase, 'result', 'defensive play resolves');
    },
  },
  {
    name: 'sim stats: blocks, sheds, tackles over many plays',
    viewports: ['desktop'],
    async run(t) {
      await quickGame(t, { seed: 77 });
      let sacks = 0, tackles = 0, inc = 0, engagedSeen = 0, n = 0;
      for (let i = 0; i < 24; i++) {
        await offenseAt(t, { ballOn: 30 }, ['verts', 'dive', 'curls', 'sweep'][i % 4]);
        await t.game('pause');
        await t.game('act', 'snap');
        await t.game('step', 30);
        const mid = await t.state();
        if (mid.game.live && mid.game.live.engaged > 0) engagedSeen++;
        await t.game('act', 'finishPlay');
        const s = await t.state();
        const k = s.game.live ? s.game.live.result.kind : s.game.lastResult.kind;
        n++;
        if (k === 'sack') sacks++; if (k === 'tackle' || k === 'oob') tackles++; if (k === 'inc') inc++;
        await t.game('act', 'advance');
      }
      t.log(`24 plays: tackles ${tackles}, sacks ${sacks}, incompletions ${inc}, blocks seen on ${engagedSeen}`);
      t.expect(engagedSeen >= 20, 'blockers engage on most plays');
      t.expect(tackles >= 8, 'tackles happen');
      await t.game('resume');
    },
  },
];
