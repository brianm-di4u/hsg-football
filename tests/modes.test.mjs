// Exhibition flow, pregame splash and venues, halftime facts, final screen, challenges, AI (AC3, AC5, AC20, AC21, AC27, AC28).
import { quickGame, waitFor } from './helpers.mjs';

export const tests = [
  {
    name: 'pregame splash at Wolf Stadium (rivalry) and coin toss',
    async run(t) {
      await t.seed(31);
      await t.game('setState', { settings: { autoContinue: false, sound: false } });
      await t.game('newGame', { mode: 'challenge', id: 'rivalry:lakeside' });
      let s = await t.state();
      t.equal(s.scene, 'pregame', 'pregame splash');
      t.equal(s.game.venue, 'Wolf Stadium', 'Lake Hamilton home: confirmed venue named');
      t.equal(s.game.rivalry, true, 'rivalry flagged');
      const txt = await t.page.textContent('.pg-card');
      t.expect(/Rivalry Week/.test(txt), 'Rivalry Week badge');
      t.expect(/paused after the 1999 season/.test(txt) && /49–42/.test(txt), 'sourced rivalry fact (no renewal year claimed)');
      t.expect(!/renewed in (August )?2023/.test(txt), 'does not claim a 2023 renewal');
      await t.shot('06-splash-wolf');
      await t.checkLayout();
      await t.page.click('[data-act="coin"][data-id="heads"]');
      s = await t.state();
      t.expect(!!s.game.toss && ['heads', 'tails'].includes(s.game.toss.flip), `coin: ${s.game.toss && s.game.toss.flip}`);
      await t.page.click('[data-act="kickoff"]');
      s = await t.state();
      t.equal([s.scene, s.game.phase], ['game', 'kickoff'], 'kickoff after the toss');
      t.equal(s.game.kickAnim.kicking, 1 - s.game.toss.winner, 'toss winner receives');
    },
  },
  {
    name: 'generic venue for unconfirmed fields',
    async run(t) {
      await t.seed(32);
      await t.game('setState', { settings: { autoContinue: false, sound: false }, exhib: { you: 'jessieville', opp: 'tufa-ridge', home: true } });
      await t.game('scene', 'exhibition');
      await t.page.click('[data-act="startExhibition"]');
      const s = await t.state();
      t.equal(s.game.venue, 'Jessieville home field', 'unconfirmed venue shown generically');
      t.expect(/Jessieville home field/.test(await t.page.textContent('.pg-card')), 'splash shows the generic venue');
      await t.shot('06b-splash-generic');
    },
  },
  {
    name: 'halftime fact with source',
    async run(t) {
      await quickGame(t, { seed: 41, you: 'mountain-pine', opp: 'hot-springs' });
      await t.game('scene', 'halftime');
      const s = await t.state();
      t.equal(s.overlay, 'break', 'halftime overlay');
      t.expect(!!s.game.halftimeFact, 'a fact was chosen');
      t.expect(['hs-0239', 'hs-0227', 'hs-0237', 'hs-0278', 'schools-wagner'].includes(s.game.halftimeFact.id), `fact matches a team on the field (${s.game.halftimeFact.id})`);
      const txt = await t.page.textContent('.factcard');
      t.expect(/Source:/.test(txt), 'fact card shows its source');
      await t.shot('20-halftime');
    },
  },
  {
    name: 'AI plays a whole game; final screen',
    async run(t) {
      await quickGame(t, { seed: 51, you: 'lake-hamilton', opp: 'cinnabar-flats' });
      const r = await t.game('act', 'autoplay', 8000);
      t.equal(r.phase, 'final', `game reaches the final (${r.score.join('-')}, ${r.plays} plays)`);
      const s = await waitFor(t, (x) => x.scene === 'final', 3000, 'final scene');
      t.expect(s.game.score[0] !== s.game.score[1], 'no ties');
      t.expect(!!s.game.stats.pog, 'Player of the Game named');
      const txt = await t.page.textContent('.final');
      t.expect(/Player of the Game/.test(txt) && /Team stats/.test(txt) && /fictional/.test(txt), 'final screen sections');
      await t.shot('23-final');
      await t.checkLayout({ allowScrollY: true });
      await t.page.click('[data-act="rematch"]');
      t.equal((await t.state()).scene, 'pregame', 'rematch goes back to the splash');
    },
  },
  {
    name: 'AI situational calls',
    viewports: ['desktop'],
    async run(t) {
      await quickGame(t, { seed: 61 });
      const calls = {};
      const tally = async (label, g, n = 30) => {
        const c = {};
        for (let i = 0; i < n; i++) {
          await t.game('setState', { game: { phase: 'call', poss: 1, runoff: 0, aiOff: null, twoPoint: false, ...g } });
          const s = await t.state();
          const k = s.game.phase !== 'call' ? (s.game.kickAnim ? s.game.kickAnim.kind : s.game.kick ? 'fg' : s.game.lastResult && s.game.lastResult.text === 'KNEEL' ? 'kneel' : s.game.phase) : 'play';
          c[k] = (c[k] || 0) + 1;
        }
        calls[label] = c;
        return c;
      };
      const punt = await tally('4th & 9 own 25', { down: 4, toGo: 9, ballOn: 25, quarter: 2, clock: 200, score: [7, 7] });
      t.expect((punt.punt || 0) >= 25, `punts on 4th & long deep (${JSON.stringify(punt)})`);
      const fg = await tally('4th & 6 opp 15', { down: 4, toGo: 6, ballOn: 85, quarter: 2, clock: 200, score: [7, 7] });
      t.expect((fg.fg || 0) >= 25, `field goal in range (${JSON.stringify(fg)})`);
      const kneel = await tally('leading late', { down: 1, toGo: 10, ballOn: 40, quarter: 4, clock: 60, score: [7, 14] });
      t.expect((kneel.kneel || 0) >= 25, `kneels to protect a late lead (${JSON.stringify(kneel)})`);
      t.log(JSON.stringify(calls));
    },
  },
  {
    name: 'challenges start in their situations',
    async run(t) {
      await t.seed(71);
      await t.game('setState', { settings: { autoContinue: false, sound: false } });
      await t.game('scene', 'challenges');
      t.equal(await t.page.locator('.ch-card').count(), 3, 'three challenges');
      await t.shot('24-challenges');
      await t.page.click('[data-act="challenge"][data-id="twoMinute"]');
      let s = await t.state();
      t.equal([s.game.quarter, s.game.clock, s.game.score, s.game.poss, s.game.ballOn, s.game.timeouts[0]], [4, 120, [17, 21], 0, 30, 2], 'two-minute drill situation');
      await t.shot('25-two-minute');
      // win it: force a touchdown then let the clock run out
      await t.game('act', 'forceResult', { kind: 'td', yards: 70, scorer: 'O', clockStops: true, elapsed: 8 });
      await t.game('act', 'advance');
      await t.game('act', 'pat', 'kick');
      await t.game('setState', { settings: { autoKick: true } });
      await waitFor(t, (x) => x.game && x.game.phase === 'kickfly' || x.game.phase === 'result', 3000, 'kick');
      await t.game('act', 'advance');
      await t.game('setState', { game: { clock: 0 } });
      await t.game('act', 'advance');
      s = await waitFor(t, (x) => x.game.phase === 'kickoff' || x.scene === 'final', 3000, 'after the try');
      if (s.scene !== 'final') { await t.game('act', 'autoplay', 4000); s = await waitFor(t, (x) => x.scene === 'final', 3000, 'final'); }
      t.expect(s.game.score[0] > s.game.score[1] ? s.challenges.twoMinute === true : true, 'a win marks the challenge complete');
      await t.game('setState', { settings: { autoKick: false } });
      await t.game('newGame', { mode: 'challenge', id: 'goalLine' });
      s = await t.state();
      t.equal([s.game.poss, s.game.ballOn, s.game.down, s.game.toGo, s.game.score, s.game.clock], [1, 92, 1, 8, [24, 21], 70], 'goal-line stand situation');
      t.equal(s.game.userOffense, false, 'user is on defense');
      await t.shot('26-goal-line');
    },
  },
];
