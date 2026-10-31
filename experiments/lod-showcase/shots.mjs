#!/usr/bin/env node
// Captures the LOD showcase on the real GPU (installed Chrome, ANGLE/D3D11, like tools/shots-gpu.mjs) and measures how
// many of the player's pixels each level changes against L6 at the in-game distances.
//
//   node experiments/lod-showcase/shots.mjs
//
// Output in shots/: L1.png ... L6.png (front three-quarter close-ups), row.png (all six), row-wire.png,
// game-3m.png ... game-45m.png (the in-game distance rows) and metrics.json.
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { serve } from './serve.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..');
// the repo's test harness owns Playwright; a git worktree has no node_modules, so walk up to the checkout that does
let harness = ROOT;
for (let d = HERE; path.dirname(d) !== d; d = path.dirname(d)) {
  if (fs.existsSync(path.join(d, 'shared', 'test-harness', 'node_modules', 'playwright'))) { harness = d; break; }
}
const require = createRequire(path.resolve(harness, 'shared', 'test-harness', 'package.json'));
const { chromium } = require('playwright');
const OUT = path.join(HERE, 'shots');
fs.mkdirSync(OUT, { recursive: true });

const server = await serve(0);
const base = `http://127.0.0.1:${server.address().port}/experiments/lod-showcase/`;
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--enable-gpu', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--enable-unsafe-swiftshader=false'] });
const problems = [];
const ROW_VIEW = { az: -0.55, el: 0.1, dist: 4.4, fov: 30, target: [0, 0.95, 0], spin: false };
const CLOSE_VIEW = { az: -0.6, el: 0.12, dist: 2.2, fov: 30, target: [0, 1.32, 0], spin: false };
const GAMES = ['3m', '8m', '20m', '45m'];

async function open(query, viewport) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  page.on('console', (m) => { if ((m.type() === 'error' || m.type() === 'warning') && !/warning X4122/.test(m.text())) problems.push(`console ${m.type()}: ${m.text()}`); });
  page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`));
  page.on('response', (r) => { if (r.status() >= 400) problems.push(`${r.status()} ${r.url()}`); });
  await page.goto(base + query);
  await page.waitForFunction(() => window.__lod && window.__lod.ready, null, { timeout: 60000 });
  return page;
}
const settle = (page) => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));

const metrics = { made: new Date().toISOString(), gpu: null, stats: null, sceneTris: null, closeView: CLOSE_VIEW, rowView: ROW_VIEW, game: {} };

// the full row, shaded and wireframe, then each in-game distance with its pixel comparison
{
  const page = await open('?still', { width: 1680, height: 900 });
  metrics.gpu = await page.evaluate(() => window.__lod.gpu());
  metrics.stats = await page.evaluate(() => window.__lod.stats());
  metrics.sceneTris = await page.evaluate(() => window.__lod.sceneTris());
  if (/swiftshader|software/i.test(metrics.gpu)) problems.push(`software renderer: ${metrics.gpu}`);
  await page.evaluate((v) => window.__lod.setView(v), ROW_VIEW); await settle(page);
  await page.screenshot({ path: path.join(OUT, 'row.png') });
  await page.evaluate(() => window.__lod.setView({ wire: true })); await settle(page);
  await page.screenshot({ path: path.join(OUT, 'row-wire.png') });
  await page.evaluate(() => window.__lod.setView({ wire: false })); await settle(page);
  for (let g = 0; g < GAMES.length; g++) {
    // broadcast-style elevation for the far views
    await page.evaluate(([v, g]) => window.__lod.setView({ ...v, game: g, el: g >= 2 ? 0.3 : 0.1 }), [ROW_VIEW, g]);
    const m = await page.evaluate(() => window.__lod.measure());
    await settle(page);
    await page.screenshot({ path: path.join(OUT, `game-${GAMES[g]}.png`) });
    metrics.game[GAMES[g]] = m.map((x) => ({ ...x, changedPct: +x.changedPct.toFixed(2), meanDiff: +x.meanDiff.toFixed(2) }));
    console.log(`${GAMES[g].padStart(3)}: ` + m.map((x) => `L${x.level} ${x.changedPct.toFixed(1)}%`).join('  ') + `  (${m[5].playerPixels} px)`);
  }
  await page.close();
}

// front three-quarter close-ups, one per level
for (let l = 1; l <= 6; l++) {
  const page = await open(`?solo=${l}&still`, { width: 1000, height: 1250 });
  await page.evaluate((v) => window.__lod.setView(v), CLOSE_VIEW); await settle(page);
  await page.screenshot({ path: path.join(OUT, `L${l}.png`) });
  await page.close();
}

fs.writeFileSync(path.join(OUT, 'metrics.json'), JSON.stringify({ ...metrics, problems }, null, 1));
await browser.close(); server.close();
console.log(`GPU: ${metrics.gpu}`);
if (problems.length) { console.error(`${problems.length} problem(s):\n  ${problems.slice(0, 20).join('\n  ')}`); process.exitCode = 1; }
else console.log(`✓ shots → ${path.relative(ROOT, OUT)}`);
