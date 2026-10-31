#!/usr/bin/env node
// Frame rate and frame cost on the real GPU (installed Chrome, headless, ANGLE/D3D11, vsync off so headroom shows),
// per quality tier and viewport, over scenes that keep the field busy: a live pass, a live run, a punt, a replay and
// a run in the rain. --throttle=N adds CDP CPU throttling (4 ~ a mid-range phone).
//
//   node tools/perf-gpu.mjs [--tiers=low,medium,high] [--viewports=desktop,mobile] [--throttle=4]
//        [--out=reviews/loop-0/perf.json]
import { createRequire } from 'node:module';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const GAME = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROOT = GAME;
const require = createRequire(path.resolve(ROOT, 'shared', 'test-harness', 'package.json'));
const { chromium } = require('playwright');
const args = process.argv.slice(2);
const opt = (k, d) => { const a = args.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3) : d; };
const TIERS = opt('tiers', 'low,medium,high').split(','), VPS = opt('viewports', 'desktop,mobile').split(',');
const THROTTLE = +opt('throttle', '1'), OUT = opt('out', '');
const TIER_SETTINGS = { legacy: { quality: 'high' }, low: { quality: 'low', detail: 2 }, medium: { quality: 'medium' }, high: { quality: 'high' } };
const VIEW = { desktop: [{ width: 1280, height: 800 }, 1], mobile: [{ width: 390, height: 844 }, 2] };

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.webp': 'image/webp', '.json': 'application/json' };
const server = http.createServer((req, res) => {
  const f = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res);
}).listen(0);
const base = `http://127.0.0.1:${server.address().port}/index.html`;
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--enable-gpu', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--disable-gpu-vsync', '--disable-frame-rate-limit'] });

// scene setups run in the page; each leaves the game animating in real time
const SCENES = {
  pass: (g, T) => { g.seed(21); g.setState({ settings: { autoContinue: false, sound: false, autoQB: true, ...T } }); g.newGame({ mode: 'exhibition', you: 'hot-springs', opp: 'lakeside', skipToss: true, skipKickoff: true, seed: 21 });
    g.setState({ game: { phase: 'call', poss: 0, ballOn: 35, down: 1, toGo: 10, absX: 26.67, runoff: 0, twoPoint: false, aiOff: null } }); g.act('call', 'verts'); g.act('snap'); },
  run: (g, T) => { g.seed(33); g.setState({ settings: { autoContinue: false, sound: false, ...T } }); g.newGame({ mode: 'exhibition', you: 'hot-springs', opp: 'lake-hamilton', skipToss: true, skipKickoff: true, seed: 33 });
    g.setState({ game: { phase: 'call', poss: 0, ballOn: 30, down: 1, toGo: 10, absX: 26.67, runoff: 0, twoPoint: false, aiOff: null } }); g.act('call', 'sweep'); g.act('snap'); },
  punt: (g, T) => { g.seed(3); g.setState({ settings: { autoContinue: false, sound: false, ...T } }); g.newGame({ mode: 'exhibition', you: 'hot-springs', opp: 'lakeside', skipToss: true, skipKickoff: true, seed: 3 });
    g.setState({ game: { phase: 'call', poss: 0, ballOn: 30, down: 4, toGo: 8, absX: 26.67, runoff: 0, twoPoint: false, aiOff: null } }); g.act('call', 'punt'); },
  replay: (g, T) => { g.seed(506); g.setState({ settings: { autoContinue: false, sound: false, ...T } }); g.newGame({ mode: 'exhibition', you: 'hot-springs', opp: 'lakeside', skipToss: true, skipKickoff: true, seed: 506 });
    g.setState({ game: { phase: 'call', poss: 0, ballOn: 40, down: 1, toGo: 10, absX: 26.67, runoff: 0, twoPoint: false, aiOff: null } }); g.act('call', 'sweep'); g.act('finishPlay'); g.act('replay'); },
  rain: (g, T) => { g.seed(508); g.setState({ settings: { autoContinue: false, sound: false, weather: 'rain', ...T } }); g.newGame({ mode: 'exhibition', you: 'hot-springs', opp: 'lakeside', skipToss: true, skipKickoff: true, seed: 508 });
    g.setState({ game: { phase: 'call', poss: 0, ballOn: 30, down: 1, toGo: 10, absX: 26.67, runoff: 0, twoPoint: false, aiOff: null } }); g.act('call', 'dive'); g.act('snap'); },
};

const rows = [];
for (const tier of TIERS) for (const vp of VPS) {
  const [viewport, scale] = VIEW[vp];
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: scale, hasTouch: vp === 'mobile', isMobile: vp === 'mobile' });
  const page = await ctx.newPage();
  const errs = [];
  page.on('pageerror', (e) => errs.push(e.message));
  const t0 = Date.now();
  await page.goto(base);
  await page.waitForFunction(() => window.__game && window.__game.isIdle(), null, { timeout: 30000 });
  const loadMs = Date.now() - t0;
  const cdp = await ctx.newCDPSession(page);
  if (THROTTLE > 1) await cdp.send('Emulation.setCPUThrottlingRate', { rate: THROTTLE });
  for (const [name, fn] of Object.entries(SCENES)) {
    // warm up (packs, shader compiles) on a first pass of the scene, then measure a fresh one
    await page.evaluate(`(${fn})(window.__game, ${JSON.stringify(TIER_SETTINGS[tier])})`);
    await page.waitForTimeout(1500);
    await page.evaluate(`(${fn})(window.__game, ${JSON.stringify(TIER_SETTINGS[tier])})`);
    const r = await page.evaluate(() => new Promise((res) => {
      const d = []; let last = performance.now(); const t0 = last;
      const f = (now) => { d.push(now - last); last = now; if (now - t0 < 2500) requestAnimationFrame(f); else {
        d.sort((a, b) => a - b); const q = (p) => d[Math.min(d.length - 1, Math.floor(d.length * p))];
        res({ fps: d.length / ((now - t0) / 1000), p50: q(0.5), p95: q(0.95) }); } };
      requestAnimationFrame(f);
    }));
    const gfx = await page.evaluate(() => window.__game.act('gfx'));
    const prof = await page.evaluate(() => window.__game.act('gfxProfile', 6));
    const heap = await page.evaluate(() => (performance.memory ? performance.memory.usedJSHeapSize / 1048576 : 0));
    const row = { tier, viewport: vp, scene: name, throttle: THROTTLE, fps: +r.fps.toFixed(1), p50: +r.p50.toFixed(2), p95: +r.p95.toFixed(2), cpuMs: gfx.cpuMs, calls: gfx.calls, tris: gfx.tris,
      gpuMs: prof ? prof.all : null, profile: prof, heapMB: +heap.toFixed(1), loadMs, quality: gfx.quality, tierNow: gfx.tier ?? null, renderer: gfx.renderer };
    rows.push(row);
    console.log(`${tier.padEnd(6)} ${vp.padEnd(7)} ${name.padEnd(6)} ${String(row.fps).padStart(6)} fps  p95 ${String(row.p95).padStart(6)} ms  cpu ${row.cpuMs} ms  gpu ${row.gpuMs} ms  ${row.calls} calls  ${(row.tris / 1000).toFixed(0)}k tris  heap ${row.heapMB} MB`);
  }
  if (errs.length) console.error(`  errors: ${errs.slice(0, 3).join(' | ')}`);
  await ctx.close();
}
await browser.close(); server.close();
if (OUT) {
  const f = path.resolve(OUT);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  let prev = []; try { prev = JSON.parse(fs.readFileSync(f, 'utf8')).rows || []; } catch { /* new file */ }
  const keep = prev.filter((p) => p.throttle !== THROTTLE || !TIERS.includes(p.tier));
  fs.writeFileSync(f, JSON.stringify({ made: new Date().toISOString(), rows: [...keep, ...rows] }, null, 2));
  console.log(`→ ${path.relative(process.cwd(), f)}`);
}
