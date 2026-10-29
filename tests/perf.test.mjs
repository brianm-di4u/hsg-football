// Performance and platform: fps, heap, load time, file size, whole games end (AC40–AC42).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { quickGame, offenseAt } from './helpers.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));

export const tests = [
  {
    name: 'single file under budget, loads fast',
    viewports: ['desktop'],
    async run(t) {
      const file = path.join(here, '..', 'index.html');
      const kb = fs.statSync(file).size / 1024;
      t.log(`index.html ${kb.toFixed(1)} KB, loadMs ${t.loadMs}`);
      t.expect(kb < 2048, 'HTML ≤ 2 MB');
      t.expect(kb < 400, 'HTML under the 400 KB target');
      t.expect(t.loadMs === undefined || t.loadMs < 2000, 'interactive ≤ 2 s');
      const html = fs.readFileSync(file, 'utf8');
      t.expect(!/<script[^>]+src=/.test(html) && !/<link[^>]+href=/.test(html), 'no external scripts or styles');
    },
  },
  {
    name: 'frame rate during live plays and kicks',
    viewports: ['desktop'],
    async run(t) {
      await quickGame(t, { seed: 401, settings: { autoQB: false, playSpeed: 1 } });
      await offenseAt(t, { ballOn: 30 }, 'verts');
      await t.game('act', 'snap');
      const live = await t.fps(1500);
      await t.game('act', 'finishPlay');
      await t.game('setState', { game: { phase: 'call', poss: 0, ballOn: 30, down: 4, toGo: 9, aiOff: null } });
      await t.game('act', 'call', 'punt');
      const kick = await t.fps(1200);
      const heap = await t.memoryMB();
      t.log(`fps live ${live.toFixed(1)}, punt ${kick.toFixed(1)}; heap ${heap.toFixed(1)} MB`);
      t.expect(live >= 55, `live play ≥ 55 fps (${live.toFixed(1)})`);
      t.expect(kick >= 55, `kick animation ≥ 55 fps (${kick.toFixed(1)})`);
      t.expect(heap < 30, `heap < 30 MB (${heap.toFixed(1)})`);
    },
  },
  {
    name: 'idle screens stop the loop',
    viewports: ['desktop'],
    async run(t) {
      await quickGame(t, { seed: 402 });
      await t.page.waitForTimeout(1800);
      t.equal(await t.game('isIdle'), true, 'idle while waiting for a call');
      const frames = await t.page.evaluate(() => new Promise((r) => { let n = 0; const t0 = performance.now(); const f = () => { n++; if (performance.now() - t0 < 500) requestAnimationFrame(f); else r(n); }; requestAnimationFrame(f); }));
      t.equal((await t.state()).loop, false, 'render-on-demand: the game loop has stopped');
      void frames;
    },
  },
  {
    name: 'AI-vs-AI games always finish (no stuck plays)',
    viewports: ['desktop'],
    async run(t) {
      const pairs = [['hot-springs', 'lakeside'], ['mountain-pine', 'lake-hamilton'], ['tufa-ridge', 'jessieville'], ['fountain-lake', 'cutter-morning-star']];
      const out = [];
      for (const [a, b] of pairs) {
        await quickGame(t, { seed: 403 + out.length, you: a, opp: b, quarterMin: 8 });
        const r = await t.game('act', 'autoplay', 10000);
        out.push(`${a} ${r.score[0]}-${r.score[1]} ${b} (${r.plays} plays, longest ${r.maxPlayT.toFixed(1)} s)`);
        t.equal(r.phase, 'final', `${a} vs ${b} reaches the final`);
        t.expect(r.maxPlayT < 18, `no play hits the 18 s cap (${r.maxPlayT.toFixed(1)})`);
      }
      t.log(out.join(' | '));
    },
  },
];
