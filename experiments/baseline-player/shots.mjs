#!/usr/bin/env node
// Captures the baseline-player showroom on the real GPU (installed Chrome, ANGLE/D3D11, as tools/shots-gpu.mjs) and
// measures each LOD against a 16x-supersampled hero at in-game distances.
//
//   node experiments/baseline-player/shots.mjs [--only=hero,lineup,teams,poses,lods,glb]
//
// Output in shots/: hero-front.png, hero-back.png, hero-face.png, hero-hands.png, lineup.png, poses.png,
// lods.png, lods-wire.png, game-<d>m.png, team-<id>-home|away.png, glb.png and metrics.json.
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { serve } from './serve.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
let harness = path.resolve(HERE, '..', '..');
for (let d = HERE; path.dirname(d) !== d; d = path.dirname(d)) {
  if (fs.existsSync(path.join(d, 'shared', 'test-harness', 'node_modules', 'playwright'))) { harness = d; break; }
}
const { chromium } = createRequire(path.resolve(harness, 'shared', 'test-harness', 'package.json'))('playwright');
const OUT = path.join(HERE, 'shots');
fs.mkdirSync(OUT, { recursive: true });
const only = (process.argv.find((a) => a.startsWith('--only=')) || '').slice(7).split(',').filter(Boolean);
const want = (k) => !only.length || only.includes(k);

const server = await serve(0);
const base = `http://127.0.0.1:${server.address().port}/experiments/baseline-player/`;
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--enable-gpu', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--enable-unsafe-swiftshader=false'] });
const problems = [];
const metrics = { made: new Date().toISOString(), gpu: null, game: {} };

async function open(query, viewport) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  page.on('console', (m) => { if ((m.type() === 'error' || m.type() === 'warning') && !/warning X4122|GPU stall due to ReadPixels/.test(m.text())) problems.push(`console ${m.type()}: ${m.text()}`); });
  page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`));
  page.on('response', (r) => { if (r.status() >= 400) problems.push(`${r.status()} ${r.url()}`); });
  await page.goto(base + query);
  await page.waitForFunction(() => window.__bp && window.__bp.ready, null, { timeout: 90000 });
  if (!metrics.gpu) {
    metrics.gpu = await page.evaluate(() => window.__bp.gpu());
    if (/swiftshader|software/i.test(metrics.gpu)) problems.push(`software renderer: ${metrics.gpu}`);
  }
  return page;
}
const settle = (page) => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
async function shot(page, set, file, clip) { await page.evaluate((v) => window.__bp.set(v), set); await settle(page); await page.screenshot({ path: path.join(OUT, file), clip }); }

if (want('hero')) {
  const page = await open('?view=hero&still', { width: 1100, height: 1400 });
  await shot(page, { state: { lod: 'hero', pose: 'idle' }, az: -0.5, el: 0.1, dist: 6.0, target: [0, 0.98, 0] }, 'hero-front.png');
  await shot(page, { az: Math.PI - 0.45 }, 'hero-back.png');
  await shot(page, { state: { pose: 'apose' }, az: 0.0, el: 0.05, dist: 6.4 }, 'hero-apose.png');
  await shot(page, { state: { pose: 'idle' }, az: -0.55, el: 0.06, dist: 1.25, target: [0, 1.66, 0] }, 'hero-face.png');
  await shot(page, { state: { pose: 'rest' }, az: -1.15, el: 0.05, dist: 1.6, target: [0.25, 0.92, 0] }, 'hero-hands.png');
  await shot(page, { state: { pose: 'rest' }, az: -0.6, el: 0.2, dist: 1.5, target: [0.1, 0.12, 0] }, 'hero-cleats.png');
  await page.close();
}
if (want('lineup')) {
  const page = await open('?view=lineup&still', { width: 1800, height: 1500 });
  await shot(page, { state: { lod: 'hero', pose: 'idle' }, az: -0.4, el: 0.08, dist: 6.0, target: [0, 0.98, 0] }, 'lineup.png');
  await page.close();
}
if (want('teams')) {
  const page = await open('?view=hero&still', { width: 900, height: 1100 });
  const teams = await page.evaluate(() => window.__bp.teams());
  for (const t of teams) for (const home of [true, false]) {
    await shot(page, { state: { team: t, home, lod: 'hero', pose: 'idle' }, az: home ? -0.55 : 0.55, el: 0.1, dist: 3.4, target: [0, 1.3, 0] }, `team-${t}-${home ? 'home' : 'away'}.png`);
  }
  await page.close();
}
if (want('poses')) {
  const page = await open('?view=poses&still', { width: 1800, height: 1400 });
  await shot(page, { state: { lod: 'hero' }, az: -0.7, el: 0.12, dist: 6.4, target: [0, 0.9, 0] }, 'poses.png');
  await page.close();
}
if (want('lods')) {
  const page = await open('?view=lods&still', { width: 1600, height: 1000 });
  await shot(page, { state: { pose: 'idle', game: -1, wire: false }, az: -0.5, el: 0.1, dist: 6.0, target: [0, 0.98, 0] }, 'lods.png');
  await shot(page, { state: { wire: true } }, 'lods-wire.png');
  await page.evaluate(() => window.__bp.set({ state: { wire: false } }));
  for (const [g, d] of [[0, 3], [1, 8], [2, 20], [3, 45]]) {
    await page.evaluate(([g, el]) => window.__bp.set({ state: { game: g }, el, az: -0.5 }), [g, g >= 2 ? 0.3 : 0.1]);
    const m = await page.evaluate(() => window.__bp.measure());
    metrics.game[`${d}m`] = m;
    await settle(page);
    await page.screenshot({ path: path.join(OUT, `game-${d}m.png`) });
    console.log(`${String(d).padStart(2)} m: ` + m.map((x) => `${x.lod} ${x.changedPct}%`).join('  '));
  }
  await page.close();
}
if (want('glb')) {
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
  page.on('pageerror', (e) => problems.push(`glb pageerror: ${e.message}`));
  page.on('console', (m) => { if (m.type() === 'error') problems.push(`glb console: ${m.text()}`); });
  await page.goto(base + 'glb.html');
  await page.waitForFunction(() => window.__glb && window.__glb.ready, null, { timeout: 60000 });
  metrics.glb = await page.evaluate(() => ({ tris: window.__glb.tris, restRot: window.__glb.restRot }));
  if (!metrics.glb.restRot.every((q) => Math.abs(q[3] - 1) < 1e-3)) problems.push(`glb bones have non-identity rest rotations: ${JSON.stringify(metrics.glb.restRot)}`);
  await page.screenshot({ path: path.join(OUT, 'glb.png') });
  await page.close();
}
const prev = fs.existsSync(path.join(OUT, 'metrics.json')) ? JSON.parse(fs.readFileSync(path.join(OUT, 'metrics.json'), 'utf8')) : {};
fs.writeFileSync(path.join(OUT, 'metrics.json'), JSON.stringify({ ...prev, ...metrics, game: Object.keys(metrics.game).length ? metrics.game : prev.game, problems }, null, 1));
await browser.close(); server.close();
console.log(`GPU: ${metrics.gpu}`);
if (problems.length) { console.error(`${problems.length} problem(s):\n  ${problems.slice(0, 20).join('\n  ')}`); process.exitCode = 1; }
else console.log('✓ shots →', path.relative(harness, OUT));
