#!/usr/bin/env node
// Before/after sheets for the visual campaign: pairs screenshots from two milestones (default visual-before vs
// visual-final) side by side, labelled, using the harness's Chromium.
//   node tools/before-after.mjs [--from visual-before] [--to visual-final]
// Writes screenshots/<to>/before-after/<viewport>-NN.png (git-ignored, like all screenshots).
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const game = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(path.join(game, 'shared', 'test-harness', 'package.json'));
const { chromium } = require('playwright');
const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const from = opt('--from', 'visual-before'), to = opt('--to', 'visual-final');
const SHOTS = ['01-title', '06-splash-wolf', '07-kickoff', '08-call-offense', '10-presnap', '11-live-pass', '11b-ball-air', '14-run-live',
  '16-touchdown', '18-kick-meter', '19-punt', '20-halftime', '23-final', '34-champion'];
const browser = await chromium.launch();
for (const vp of ['desktop', 'mobile']) {
  const dir = path.join(game, 'screenshots', to, 'before-after');
  fs.mkdirSync(dir, { recursive: true });
  const pairs = SHOTS.filter((n) => fs.existsSync(path.join(game, 'screenshots', from, vp, `${n}.png`)) && fs.existsSync(path.join(game, 'screenshots', to, vp, `${n}.png`)));
  const per = vp === 'desktop' ? 3 : 4;
  for (let s = 0; s < pairs.length; s += per) {
    const cellW = vp === 'desktop' ? 700 : 300;
    const rows = pairs.slice(s, s + per).map((n) => {
      const img = (m) => `data:image/png;base64,${fs.readFileSync(path.join(game, 'screenshots', m, vp, `${n}.png`)).toString('base64')}`;
      return vp === 'desktop'
        ? `<div class="row"><div><img src="${img(from)}"><p>${n} · before</p></div><div><img src="${img(to)}"><p>${n} · after</p></div></div>`
        : `<div class="col"><div><img src="${img(from)}"><p>before</p></div><div><img src="${img(to)}"><p>after</p></div><h4>${n}</h4></div>`;
    }).join('');
    const html = `<!doctype html><style>body{margin:0;background:#222;color:#eee;font:600 15px system-ui;padding:8px}
      .row{display:flex;gap:8px;margin-bottom:8px}.row img{width:${cellW}px;display:block}.col{display:inline-flex;flex-wrap:wrap;width:${cellW * 2 + 12}px;gap:6px;margin:0 8px 8px 0;vertical-align:top}
      .col img{width:${cellW}px;display:block}.col h4{width:100%;margin:2px 0}p{margin:2px 0 0}</style>${rows}`;
    const page = await browser.newPage({ viewport: { width: vp === 'desktop' ? cellW * 2 + 32 : (cellW * 2 + 20) * 2 + 16, height: 600 } });
    await page.setContent(html);
    await page.waitForTimeout(200);
    const file = path.join(dir, `${vp}-${String(s / per + 1).padStart(2, '0')}.png`);
    await page.screenshot({ path: file, fullPage: true });
    await page.close();
    console.log('wrote', path.relative(game, file));
  }
}
await browser.close();
