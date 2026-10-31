// Quality tiers (VISUAL-PLAN-2.md): Low needs no asset pack; Medium adds physically based materials, an environment
// map and a shadow-casting light; High loads the three-hi pack for post-processing and casts from both light banks.
// Tier and detail changes never rebuild the stadium. Frame rates are measured on a real GPU by tools/perf-gpu.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { quickGame, waitFor, offenseAt } from './helpers.mjs';

const GAME = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export const tests = [
  {
    name: 'tiers swap on the built stadium, High loads its pack and post-processing',
    viewports: ['desktop'],
    async run(t) {
      const packReqs = [];
      t.page.on('request', (r) => { if (/assets\/pack-/.test(r.url())) packReqs.push(r.url()); });
      await quickGame(t, { seed: 601 });
      let s = await t.state();
      t.equal(s.gfx.tier, 'low', 'Low tier pinned');
      t.equal(packReqs.length, 0, 'Low requests no asset pack');
      const builds = s.gfx.builds;
      await t.game('setState', { settings: { quality: 'medium' } });
      s = await waitFor(t, (x) => x.gfx.tier === 'medium', 5000, 'medium tier');
      t.equal(s.gfx.shadowCasters, 1, 'Medium casts shadows from one light bank');
      t.expect(packReqs.every((u) => /pack-(crowd|players)\.js/.test(u)), `Medium loads only the optional crowd and player packs (${packReqs.length})`);
      // players pack: the baseline player in team kits, a level of detail per player by its size on screen
      s = await waitFor(t, (x) => x.gfx.packs.players === 'ready' && x.gfx.kit && x.gfx.lods, 15000, 'kitted players at Medium');
      const [l0, l1, l2] = s.gfx.lods;
      t.equal(l0 + l1 + l2, 22, `every player has a level of detail (${s.gfx.lods})`);
      t.equal(l0, 0, 'Medium broadcast camera never uses LOD0');
      t.expect(s.gfx.tris <= 600000, `Medium triangles, shadow maps included, below the 635k of the old 11k-triangle HD player (${s.gfx.tris})`);
      await t.game('setState', { settings: { quality: 'high' } });
      s = await waitFor(t, (x) => x.gfx.tier === 'high' && x.gfx.post, 20000, 'High tier with post-processing');
      t.equal(s.gfx.packs['three-hi'], 'ready', 'three-hi pack loaded and its hash matches the manifest');
      t.equal(s.gfx.shadowCasters, 2, 'High casts shadows from both light banks');
      t.expect(s.gfx.calls <= 160, `High scene draw calls in budget (${s.gfx.calls})`);
      t.expect(s.gfx.callsTotal <= 320, `High total draw calls in budget (${s.gfx.callsTotal})`);
      t.expect(s.gfx.tris <= 1600000, `High triangles in budget, shadow maps included (${s.gfx.tris})`);
      await t.shot('70-high-tier');
      await t.game('setState', { settings: { quality: 'low', detail: 2 } });
      s = await waitFor(t, (x) => x.gfx.tier === 'low', 5000, 'back to Low');
      t.equal(s.gfx.kit, false, 'Low goes back to the palette players');
      t.equal(s.gfx.builds, builds, `no stadium rebuild across Low → Medium → High → Low (${s.gfx.builds})`);
      t.expect(s.gfx.calls > 20 && s.gfx.calls < 140, `Low draw calls back in the Low budget (${s.gfx.calls})`);
    },
  },
  {
    name: 'replay close-ups put the nearest players on LOD0 at High',
    viewports: ['desktop'],
    async run(t) {
      await quickGame(t, { seed: 604, settings: { quality: 'high' } });
      await waitFor(t, (x) => x.gfx.tier === 'high' && x.gfx.kit, 20000, 'High tier with kits');
      await offenseAt(t, { ballOn: 40 }, 'sweep');
      await t.game('pause');
      await t.game('act', 'snap');
      await t.game('act', 'finishPlay');
      await t.game('resume');
      await t.waitForStable(4000);
      t.equal(await t.game('act', 'replay', 0.6), true, 'replay starts');
      const s = await waitFor(t, (x) => x.gfx.replay && x.gfx.lods && x.gfx.lods[0] > 0, 4000, 'LOD0 in the replay');
      t.expect(s.gfx.lods[0] > 0 && s.gfx.lods[0] < 22, `replay mixes levels by distance (${s.gfx.lods})`);
      t.expect(s.gfx.tris <= 1600000, `replay triangles in budget (${s.gfx.tris})`);
      await t.shot('71-replay-lod0', { wait: false });
      await t.page.keyboard.press('Space');
    },
  },
  {
    name: 'High settles: the render loop stops when nothing moves',
    viewports: ['desktop'],
    async run(t) {
      await quickGame(t, { seed: 602, settings: { quality: 'high' } });
      await waitFor(t, (x) => x.gfx.tier === 'high' && x.gfx.post, 20000, 'High tier');
      await t.game('setState', { game: { phase: 'call', poss: 0, ballOn: 30, down: 1, toGo: 10, absX: 26.67 } });
      await t.game('act', 'call', 'curls');
      await t.waitForStable(8000);
      const s = await waitFor(t, (x) => x.loop === false, 6000, 'idle loop at High');
      t.equal(s.loop, false, 'loop stopped at High (no temporal effects keep it running)');
    },
  },
  {
    name: 'packs off (?packs=0): Auto stays playable without any pack',
    viewports: ['desktop'],
    url: 'index.html?packs=0',
    async run(t) {
      const packReqs = [];
      t.page.on('request', (r) => { if (/assets\/pack-/.test(r.url())) packReqs.push(r.url()); });
      await quickGame(t, { seed: 603, settings: { quality: 'high' } });
      const s = await waitFor(t, (x) => x.gfx.tier === 'medium', 5000, 'falls back to Medium');
      t.equal(s.gfx.post, false, 'no post-processing without its pack');
      t.equal(packReqs.length, 0, 'no pack requested');
      const html = fs.readFileSync(path.join(GAME, 'index.html'), 'utf8');
      t.expect(!/<script[^>]+src=/i.test(html), 'index.html loads no script files itself (packs are added at runtime)');
    },
  },
];
