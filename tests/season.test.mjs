// Season: schedule, quick sim, standings, playoffs, champion, roster, next season (AC4, AC22–AC26).
import { waitFor } from './helpers.mjs';

export const tests = [
  {
    name: 'season setup and schedule',
    async run(t) {
      await t.seed(101);
      await t.game('setState', { settings: { autoContinue: false, sound: false } });
      await t.game('scene', 'seasonSetup');
      t.equal(await t.page.locator('.team-card').count(), 7, 'seven real schools to coach');
      await t.shot('29-season-setup');
      await t.page.click('[data-act="pickSeason"][data-id="hot-springs"]');
      await t.page.click('[data-act="startSeason"]');
      const s = await t.state();
      t.equal([s.scene, s.season.weeks, s.season.userTeam], ['season', 9, 'hot-springs'], 'nine-week season for Hot Springs');
      // valid round robin: 45 distinct pairs, everyone once per week
      const pairs = new Set();
      let ok = true;
      for (const wk of s.season.weekGames) {
        const teams = new Set();
        for (const g of wk) { const [h, a] = g.split('|'); teams.add(h); teams.add(a); pairs.add([h, a].sort().join('|')); }
        if (teams.size !== 10) ok = false;
      }
      t.expect(ok, 'every team plays once each week');
      t.equal(pairs.size, 45, 'every pair meets exactly once');
      t.expect(s.season.weekGames[0].includes('lake-hamilton|lakeside'), 'week 1: Lakeside at Lake Hamilton');
      t.expect(s.season.weekGames[8].includes('hot-springs|lakeside'), 'last week: Lakeside at Hot Springs');
      t.equal(s.season.schedule[8].rivalry, true, 'Hot Springs–Lakeside is Rivalry Week');
      const txt = await t.page.textContent('.tab-body');
      t.expect(/Rivalry/.test(txt), 'schedule shows the Rivalry badge');
      await t.shot('30-season-schedule');
      await t.checkLayout({ allowScrollY: true });
    },
  },
  {
    name: 'roster is generated and deterministic',
    async run(t) {
      await t.seed(102);
      await t.game('newGame', { mode: 'season', team: 'jessieville' });
      const a = (await t.state()).season.roster;
      t.equal(a.length, 34, '34 players');
      await t.game('newGame', { mode: 'season', team: 'jessieville' });
      const b = (await t.state()).season.roster;
      t.equal(a.map((p) => p.name), b.map((p) => p.name), 'same school + year → same roster');
      await t.game('setState', { ui: { tab: 'roster' } });
      const txt = await t.page.textContent('.tab-body');
      t.expect(/All players are fictional/.test(txt), 'fictional-players note');
      t.expect(new Set(a.map((p) => p.pos)).size === 10, 'all ten positions');
      await t.shot('31-roster');
      await t.checkLayout({ allowScrollY: true });
    },
  },
  {
    name: 'play a season week through the real game, sim the rest',
    async run(t) {
      await t.seed(103);
      await t.game('setState', { settings: { autoContinue: false, sound: false, quarterMin: 4 } });
      await t.game('newGame', { mode: 'season', team: 'lakeside', play: true });
      let s = await t.state();
      t.equal(s.scene, 'pregame', 'week 1 splash');
      t.equal([s.game.venue, s.game.rivalry], ['Wolf Stadium', true], 'week 1 at Wolf Stadium, Rivalry Week');
      await t.game('act', 'coin', 'tails');
      await t.game('act', 'kickoffGo');
      await t.game('act', 'autoplay', 8000);
      s = await waitFor(t, (x) => x.scene === 'final', 3000, 'final');
      await t.page.click('[data-act="seasonContinue"]');
      s = await t.state();
      t.equal([s.scene, s.season.week], ['season', 1], 'back to the hub, week 2');
      t.expect(!!s.season.schedule[0].result && !s.season.schedule[0].result.simmed, 'played result recorded');
      const games = s.season.standings.reduce((n, r) => n + r.w + r.l, 0);
      t.equal(games, 10, 'all five week-1 games counted in standings');
      t.expect(/Around the league/.test(await t.page.textContent('.recap')), 'week recap');
      await t.page.click('[data-act="tab"][data-id="standings"]');
      await t.shot('32-standings');
      await t.page.click('[data-act="simWeek"]');
      s = await t.state();
      t.equal(s.season.week, 2, 'sim game advances a week');
      t.expect(!!s.season.schedule[1].result.simmed, 'simmed result marked');
    },
  },
  {
    name: 'playoffs, champion and next season',
    async run(t) {
      await t.seed(104);
      await t.game('setState', { settings: { autoContinue: false, sound: false } });
      await t.game('newGame', { mode: 'season', team: 'lake-hamilton', short: true });
      let s = await t.state();
      t.equal(s.season.weeks, 5, 'short season: 5 weeks');
      for (let i = 0; i < 5; i++) await t.game('act', 'simWeek');
      s = await t.state();
      t.equal(s.season.phase, 'playoffs', 'playoffs after the regular season');
      t.equal(s.season.playoffs.seeds.length, 4, 'top four seeded');
      const st = s.season.standings.slice(0, 4).map((r) => r.id);
      t.equal(s.season.playoffs.seeds, st, 'seeds follow the standings');
      if (s.scene === 'season') {
        await t.page.click('[data-act="tab"][data-id="schedule"]');
        await t.shot('33-playoffs');
      }
      s = await t.game('act', 'simSeason');
      t.equal(s.phase, 'done', 'season complete');
      t.expect(!!s.champion, `champion: ${s.champion}`);
      await t.game('setState', { season: { champion: 'lake-hamilton' } });
      await t.game('scene', 'champion');
      s = await t.state();
      t.equal(s.scene, 'champion', 'champion screen');
      await t.shot('34-champion');
      const before = s.season.roster;
      const ns = await t.game('act', 'nextSeason');
      t.equal([ns.year, ns.week, ns.phase], [2027, 0, 'regular'], 'next season starts');
      const seniors = before.filter((p) => p.yr === 'Sr').map((p) => p.name);
      const after = ns.roster.map((p) => p.name);
      t.expect(seniors.every((n) => !after.includes(n)) || seniors.length === 0, 'seniors graduated');
      t.equal(ns.roster.length, 34, 'roster refilled to 34');
      await t.shot('35-next-season');
    },
  },
];
