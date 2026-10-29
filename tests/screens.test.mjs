// Title, menus, setup screens, help, settings (AC1–AC3, AC6, AC27, AC29, AC30).
import { quickGame, fresh } from './helpers.mjs';

export const tests = [
  {
    name: 'title screen and menu',
    async run(t) {
      await fresh(t); await t.reload();
      const s = await t.state();
      t.equal(s.scene, 'title', 'boots to title');
      t.equal(s.hasSave, false, 'no Continue without a save');
      t.expect(t.loadMs === undefined || t.loadMs < 2000, `interactive in under 2 s (${t.loadMs} ms)`);
      const labels = await t.page.$$eval('.menu .btn', (b) => b.map((x) => x.textContent.trim()));
      t.equal(labels, ['Exhibition', 'Season', 'Challenges', 'How to Play', 'Settings'], 'menu items');
      await t.shot('01-title');
      await t.checkLayout();
    },
  },
  {
    name: 'exhibition team select',
    async run(t) {
      await t.game('scene', 'exhibition');
      const cards = await t.page.$$eval('.team-card', (els) => els.map((e) => ({ id: e.dataset.id, text: e.textContent.replace(/\s+/g, ' ') })));
      t.equal(cards.length, 10, '10 teams');
      const ids = cards.map((c) => c.id);
      for (const id of ['hot-springs', 'lakeside', 'lake-hamilton', 'fountain-lake', 'cutter-morning-star', 'jessieville', 'mountain-pine']) t.expect(ids.includes(id), `real school ${id}`);
      const fict = cards.filter((c) => /fictional town/.test(c.text)).map((c) => c.id);
      t.equal(fict, ['quartz-hollow', 'tufa-ridge', 'cinnabar-flats'], 'three fictional towns labelled');
      const gameColors = cards.filter((c) => /game colors/.test(c.text)).map((c) => c.id).sort();
      t.equal(gameColors, ['cutter-morning-star', 'fountain-lake', 'jessieville', 'mountain-pine'], 'unconfirmed colors labelled "game colors"');
      const hs = cards.find((c) => c.id === 'hot-springs').text;
      t.expect(/1934 \(shared\), 1970, 1972/.test(hs), 'Hot Springs titles with the 1934 shared note');
      t.expect(!/1942/.test(hs), 'no 1942 claim');
      // mascots painted (non-blank canvases)
      const painted = await t.page.$$eval('.team-card canvas.mascot', (cs) => cs.map((c) => { const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 3; i < d.length; i += 4) if (d[i] > 0) n++; return n; }));
      t.expect(painted.every((n) => n > 100), 'all 10 mascots drawn');
      await t.shot('03-team-select');
      await t.page.click('[data-act="pickTeam"][data-id="lake-hamilton"]');
      await t.page.click('[data-act="pickTeam"][data-id="lakeside"]');
      const s = await t.state();
      t.equal([s.exhib.you, s.exhib.opp], ['lake-hamilton', 'lakeside'], 'you and opponent picked by click');
      const venue = await t.page.textContent('.opts');
      t.expect(/Wolf Stadium/.test(venue), 'confirmed venue named (Wolf Stadium)');
      t.expect(/Lakeside home field/.test(venue), 'unconfirmed venue shown generically');
      await t.shot('05-exhibition');
      await t.checkLayout();
    },
  },
  {
    name: 'mascots for every team',
    async run(t) {
      const n = await t.game('act', 'mascotSheet');
      t.equal(n, 10, 'ten mascots');
      const painted = await t.page.$$eval('canvas.mascot', (cs) => cs.map((c) => { const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let k = 0; for (let i = 3; i < d.length; i += 4) if (d[i] > 0) k++; return k; }));
      t.expect(painted.length === 10 && painted.every((k) => k > 500), 'all ten painted');
      await t.shot('04-mascots');
    },
  },
  {
    name: 'help and settings',
    async run(t) {
      await t.game('scene', 'help');
      await t.shot('40-help');
      await t.page.click('[data-act="helpTab"][data-id="rules"]');
      const txt = await t.page.textContent('.tab-body');
      t.expect(/game's rules/.test(txt), 'rules are presented as game rules');
      t.expect(/Overtime/.test(txt), 'overtime rule explained');
      await t.shot('40b-help-rules');
      await t.page.click('[data-act="helpTab"][data-id="credits"]');
      const cr = await t.page.textContent('.tab-body');
      t.expect(/fictional/i.test(cr) && /game colors/.test(cr) && /endorsement/.test(cr), 'credits state fictional players, game colors, no endorsement');
      await t.shot('40c-help-credits');
      await t.game('scene', 'settings');
      const s = await t.page.$$eval('[data-set]', (els) => els.map((e) => e.dataset.set));
      for (const k of ['sound', 'volume', 'autoQB', 'autoKick', 'autoContinue', 'routes']) t.expect(s.includes(k), `setting ${k}`);
      const segs = await t.page.$$eval('.seg-row .seg-label', (els) => els.map((e) => e.textContent));
      t.equal(segs, ['Motion', 'Theme', 'Field view', 'Weather', 'Graphics', 'Text size', 'Quarters', 'Difficulty', 'Play speed'], 'segmented settings');
      await t.page.click('[data-act="set:quarterMin"][data-id="8"]');
      t.equal((await t.state()).settings.quarterMin, 8, 'quarter length set to 8');
      await t.page.click('[data-act="set:quarterMin"][data-id="4"]');
      await t.shot('41-settings');
      await t.checkLayout({ allowScrollY: true });
    },
  },
];
