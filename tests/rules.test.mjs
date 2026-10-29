// Rules: downs, scoring, kicks, punts, clock, timeouts, overtime (AC13–AC19).
import { quickGame, waitFor } from './helpers.mjs';

const call = (t, g) => t.game('setState', { game: { phase: 'call', poss: 0, runoff: 0, twoPoint: false, aiOff: null, offCall: null, ...g } });
const force = (t, r) => t.game('act', 'forceResult', r);

export const tests = [
  {
    name: 'downs, distance and first downs',
    async run(t) {
      await quickGame(t, { seed: 3 });
      await call(t, { ballOn: 30, down: 1, toGo: 10 });
      let g = await force(t, { kind: 'tackle', yards: 4 });
      t.equal([g.down, g.toGo, g.ballOn], [2, 6, 34], '+4 on 1st & 10 → 2nd & 6 at the 34');
      await t.game('act', 'advance');
      g = await force(t, { kind: 'tackle', yards: 7 });
      t.equal([g.down, g.toGo, g.ballOn], [1, 10, 41], '+7 on 2nd & 6 → 1st & 10');
      t.expect(/FIRST DOWN/.test(g.lastResult.text), 'first-down toast');
      await t.shot('15-first-down');
      await t.game('act', 'advance');
      g = await force(t, { kind: 'inc', yards: 0, clockStops: true });
      t.equal([g.down, g.toGo, g.ballOn, g.runoff], [2, 10, 41, 0], 'incompletion: next down, same spot, clock stopped');
      await call(t, { ballOn: 92, down: 1, toGo: 8 });
      g = await force(t, { kind: 'tackle', yards: 5 });
      t.equal([g.down, g.toGo], [2, 3], 'goal to go counts down');
      // turnover on downs
      await call(t, { ballOn: 55, down: 4, toGo: 3 });
      g = await force(t, { kind: 'tackle', yards: 1 });
      t.equal([g.poss, g.ballOn, g.down, g.toGo], [1, 44, 1, 10], 'turnover on downs: opponent takes over at the spot');
      t.expect(/TURNOVER ON DOWNS/.test(g.lastResult.text), 'turnover on downs toast');
    },
  },
  {
    name: 'touchdown, kicked try, two-point try, field goal, safety',
    async run(t) {
      await quickGame(t, { seed: 4, settings: { autoKick: false } });
      await call(t, { ballOn: 80, down: 1, toGo: 10 });
      let g = await force(t, { kind: 'td', yards: 20, scorer: 'O', clockStops: true });
      t.equal(g.score, [6, 0], 'touchdown is 6');
      t.equal(g.next, 'pat', 'try comes next');
      await t.shot('16-touchdown');
      await t.game('act', 'td', 250);
      await t.shot('16b-td-fx', { wait: false });
      await t.game('act', 'advance');
      g = (await t.state()).game;
      t.equal(g.phase, 'pat', 'choose the try');
      await t.shot('17-pat-choice');
      await t.page.keyboard.press('1');
      g = (await t.state()).game;
      t.equal([g.phase, g.kick && g.kick.kind, g.kick && g.kick.dist], ['kick', 'pat', 20], 'key 1 = kick; a 20-yard try');
      await t.game('act', 'kick', 0);
      await t.game('act', 'advance');
      g = (await t.state()).game;
      t.equal(g.score, [7, 0], 'kicked try is good: 7');
      t.equal(g.next, 'kickoff', 'scoring team kicks off next');
      // two-point try
      await call(t, { ballOn: 85, down: 1, toGo: 10 });
      await force(t, { kind: 'td', yards: 15, scorer: 'O', clockStops: true });
      await t.game('act', 'advance');
      await t.game('act', 'pat', 'two');
      g = (await t.state()).game;
      t.equal([g.phase, g.twoPoint, g.ballOn, g.toGo], ['call', true, 97, 3], 'two-point try from the 3');
      g = await force(t, { kind: 'td', yards: 3, scorer: 'O', clockStops: true });
      t.equal(g.score, [15, 0], 'two-point try good: 6 + 2');
      // field goal (good and missed)
      await call(t, { ballOn: 80, down: 4, toGo: 6 });
      g = (await t.state()).game;
      t.expect(g.specials.includes('fg') && g.specials.includes('punt'), `4th down in range offers FG and punt (${g.specials})`);
      await t.game('act', 'call', 'fg');
      g = (await t.state()).game;
      t.equal([g.phase, g.kick.dist], ['kick', 37], 'a 37-yard attempt from the 20');
      await t.game('act', 'animAt', 800, 0.15);
      await t.shot('18-kick-meter', { wait: false });
      await t.game('act', 'animAt', null);
      await t.game('act', 'kick', 0.02);
      await t.game('act', 'advance');
      g = (await t.state()).game;
      t.equal(g.score, [18, 0], 'field goal is 3');
      await call(t, { ballOn: 80, down: 4, toGo: 6 });
      await t.game('act', 'call', 'fg');
      await t.game('act', 'kick', 0.95);
      await t.game('act', 'advance');
      g = (await t.state()).game;
      t.equal(g.score, [18, 0], 'missed kick scores nothing');
      t.equal([g.poss, g.ballOn], [1, 27], 'missed FG: opponent takes over at the spot of the kick (their 27)');
      // safety
      await call(t, { ballOn: 3, down: 2, toGo: 10 });
      g = await force(t, { kind: 'safety', yards: -4, clockStops: true });
      t.equal(g.score, [18, 2], 'safety is 2 for the defense');
      t.equal(g.next, 'freeKick', 'free kick follows a safety');
      await t.game('act', 'advance');
      g = (await t.state()).game;
      t.equal(g.kickAnim && g.kickAnim.kind, 'free', 'free kick from the 20');
      await t.game('act', 'advance');
      g = (await t.state()).game;
      t.equal(g.poss, 1, 'the scoring team receives the free kick');
    },
  },
  {
    name: 'kickoffs and punts',
    async run(t) {
      await quickGame(t, { seed: 8, skipKickoff: false });
      let g = (await t.state()).game;
      t.equal([g.phase, g.kickAnim.kind], ['kickoff', 'kickoff'], 'game opens with a kickoff');
      await t.game('act', 'animAt', 700);
      await t.shot('07-kickoff', { wait: false });
      await t.game('act', 'animAt', null);
      await t.game('act', 'advance');
      g = (await t.state()).game;
      t.equal(g.poss, 0, 'receiving team has the ball');
      t.expect(g.ballOn >= 1 && g.ballOn <= 100, `start at ${g.ballOn}`);
      t.expect(/Touchback|returns/.test(g.log.map((l) => l.text).join(' ')), 'kickoff logged');
      await t.game('act', 'advance');
      await call(t, { ballOn: 30, down: 4, toGo: 8 });
      await t.game('act', 'call', 'punt');
      g = (await t.state()).game;
      t.equal(g.kickAnim.kind, 'punt', 'punt animates');
      await t.game('act', 'animAt', 600);
      await t.shot('19-punt', { wait: false });
      await t.game('act', 'animAt', null);
      await t.game('act', 'advance');
      g = (await t.state()).game;
      t.equal(g.poss, 1, 'punt flips possession');
      t.expect(g.ballOn >= 1 && g.ballOn <= 45, `opponent starts deep (their ${g.ballOn})`);
      // touchbacks
      let tb = 0;
      for (let i = 0; i < 12; i++) {
        await t.game('setState', { game: { phase: 'call', poss: 0, ballOn: 55, down: 4, toGo: 9, runoff: 0, aiOff: null } });
        await t.game('act', 'call', 'punt');
        g = (await t.state()).game;
        await t.game('act', 'advance');
        g = (await t.state()).game;
        if (g.ballOn === 20) tb++;
        t.expect(g.poss === 1 && g.ballOn >= 1, 'punt from midfield lands for the opponent');
      }
      t.log(`punts from the 45 into the end zone (touchback at the 20): ${tb}/12`);
    },
  },
  {
    name: 'clock, runoff and quarter ends',
    async run(t) {
      await quickGame(t, { seed: 12 });
      await call(t, { ballOn: 30, quarter: 1, clock: 100 });
      let g = await force(t, { kind: 'tackle', yards: 3, elapsed: 5 });
      t.equal([Math.round(g.clock), g.runoff], [95, 25], 'live time comes off; 25 s runoff pending');
      await t.game('act', 'advance');
      await t.game('act', 'call', 'dive');
      g = (await t.state()).game;
      t.equal(Math.round(g.clock), 70, 'runoff applied at the snap');
      await t.game('act', 'finishPlay');
      await t.game('act', 'advance');
      await call(t, { quarter: 1, clock: 8 });
      g = await force(t, { kind: 'tackle', yards: 2, elapsed: 4 });
      await t.game('act', 'advance');
      await t.game('act', 'call', 'dive');
      const s = await t.state();
      t.equal([s.game.phase, s.game.quarter, s.overlay], ['break', 2, 'break'], 'the runoff ends the 1st quarter');
      t.equal(s.game.clock, 240, 'new quarter clock (4 min)');
      await t.shot('21-quarter-break');
      await t.game('act', 'advance');
      g = (await t.state()).game;
      t.equal([g.phase, g.quarter, g.poss], ['call', 2, 0], 'same possession continues in the 2nd quarter');
      // halftime: the opening receiver kicks off the second half
      await call(t, { quarter: 2, clock: 2 });
      await t.game('setState', { game: { openingReceiver: 0 } });
      await force(t, { kind: 'tackle', yards: 2, elapsed: 4 });
      await t.game('act', 'advance');
      g = (await t.state()).game;
      t.equal([g.phase, g.breakKind, g.quarter], ['break', 'half', 3], 'halftime');
      await t.game('act', 'advance');
      g = (await t.state()).game;
      t.equal([g.phase, g.kickAnim && g.kickAnim.kicking, g.timeouts], ['kickoff', 0, [3, 3]], 'second half: opening receiver kicks; timeouts reset');
    },
  },
  {
    name: 'timeouts stop the runoff',
    async run(t) {
      await quickGame(t, { seed: 13 });
      await call(t, { quarter: 4, clock: 90, ballOn: 40 });
      await force(t, { kind: 'tackle', yards: 3, elapsed: 5 });
      let s = await t.state();
      t.equal(s.game.runoff, 25, 'clock running');
      await t.page.keyboard.press('t');
      s = await t.state();
      t.equal([s.game.timeouts[0], s.game.runoff], [2, 0], 'T calls a timeout: 2 left, runoff cancelled');
      await t.game('act', 'advance');
      await t.game('act', 'call', 'dive');
      s = await t.state();
      t.equal(Math.round(s.game.clock), 85, 'no runoff after the timeout');
      t.equal(await t.game('act', 'timeout'), false, 'no timeout while the clock is stopped');
    },
  },
  {
    name: 'overtime resolves a tie',
    async run(t) {
      await quickGame(t, { seed: 14, settings: { autoKick: false } });
      await call(t, { quarter: 4, clock: 3, score: [14, 14], ballOn: 40 });
      await force(t, { kind: 'tackle', yards: 2, elapsed: 5 });
      await t.game('act', 'advance');
      let s = await t.state();
      t.equal([s.game.phase, s.overlay], ['otStart', 'ot'], 'tied after four: overtime');
      await t.shot('22-overtime');
      await t.game('act', 'advance');
      s = await t.state();
      const first = s.game.ot.first;
      t.equal([s.game.phase, s.game.poss, s.game.ballOn, s.game.down], ['call', first, 90, 1], 'first OT series from the opponent 10');
      if (first === 0) {
        await force(t, { kind: 'td', yards: 10, scorer: 'O', clockStops: true });
        await t.game('act', 'advance');
        await t.game('act', 'pat', 'kick');
        await t.game('act', 'kick', 0);
        await t.game('act', 'advance');
        await t.game('act', 'advance');
        s = await t.state();
        t.equal([s.game.poss, s.game.ballOn, s.game.score], [1, 90, [21, 14]], 'second series for the other team');
        for (let i = 0; i < 4; i++) {
          await t.game('setState', { game: { aiOff: 'dive' } });
          await t.game('act', 'defCall', 'runstuff');
          await t.game('act', 'forceResult', { kind: 'inc', yards: 0, clockStops: true });
          s = await t.state();
          if (s.game.phase === 'final' || s.scene === 'final') break;
          await t.game('act', 'advance');
        }
      } else {
        await t.game('setState', { game: { aiOff: 'dive' } });
        for (let i = 0; i < 4; i++) {
          await t.game('setState', { game: { phase: 'call', aiOff: 'dive' } });
          await t.game('act', 'defCall', 'runstuff');
          await t.game('act', 'forceResult', { kind: 'inc', yards: 0, clockStops: true });
          await t.game('act', 'advance');
        }
        s = await t.state();
        t.equal([s.game.poss, s.game.ballOn], [0, 90], 'second series: user from the 10');
        await force(t, { kind: 'td', yards: 10, scorer: 'O', clockStops: true });
        await t.game('act', 'advance');
        await t.game('act', 'pat', 'kick');
        await t.game('act', 'kick', 0);
        await t.game('act', 'advance');
        await t.game('act', 'advance');
      }
      s = await waitFor(t, (x) => x.scene === 'final', 3000, 'final screen');
      t.equal(s.game.score[0] > s.game.score[1], true, 'user wins in overtime');
      t.expect(s.game.quarter >= 5, 'overtime recorded');
    },
  },
];
