#!/usr/bin/env node
// Review captures on the real GPU: the canonical frames in tools/review-shots.json, rendered by the installed Chrome
// (headless, ANGLE/D3D11) over http from the repo like the harness. The harness's bundled Chromium only has software
// GL, so its screenshots can't judge lighting or materials; these can. Also writes zoomed crops (desktop) and
// 8-frame motion strips, and an index (shots.json) for the review brief.
//
//   node tools/shots-gpu.mjs <out=review-loop-0> [--tiers=low,medium,high] [--only=R04,R10]
//        [--viewports=desktop,mobile,landscape] [--no-crops] [--no-strips] [--verify] [--file-url]
//
// Output: screenshots/<out>/<tier>/<viewport>/<id>.png, crops/<tier>/<id>-<target>.png,
// strips/<tier>/<id>.png, shots.json. --verify captures R04, R10 and R12 twice and fails if they differ.
// Tiers: 'legacy' is the pre-v3 look (quality 'high'); low/medium/high are the v3 tiers.
import { createRequire } from 'node:module';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const GAME = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROOT = GAME;
const require = createRequire(path.resolve(ROOT, 'shared', 'test-harness', 'package.json'));
const { chromium } = require('playwright');
const args = process.argv.slice(2);
const opt = (k, d) => { const a = args.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3) : d; };
const out = args.find((a) => !a.startsWith('--')) || 'review-loop-0';
const TIERS = opt('tiers', 'low,medium,high').split(',');
const ONLY = opt('only', '') ? opt('only', '').split(',') : null;
const VPS = opt('viewports', 'desktop,mobile,landscape').split(',');
const CROPS = !args.includes('--no-crops'), STRIPS = !args.includes('--no-strips'), VERIFY = args.includes('--verify'), FILEURL = args.includes('--file-url');
const SPEC = JSON.parse(fs.readFileSync(path.join(GAME, 'tools', 'review-shots.json'), 'utf8'));
const TIER_SETTINGS = { legacy: { quality: 'high' }, low: { quality: 'low', detail: 2 }, medium: { quality: 'medium' }, high: { quality: 'high' } };
// landscape: a phone turned sideways (the shots marked mobile)
const VIEW = { desktop: [{ width: 1280, height: 800 }, 1], mobile: [{ width: 390, height: 844 }, 2], landscape: [{ width: 844, height: 390 }, 2] };
const dirOut = path.join(GAME, 'screenshots', out);

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png' };
const server = http.createServer((req, res) => {
  const f = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res);
}).listen(0);
const base = (FILEURL ? pathToFileURL(path.join(GAME, 'index.html')).href : `http://127.0.0.1:${server.address().port}/index.html`) + opt('query', '');
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--enable-gpu', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--enable-unsafe-swiftshader=false'] });

const problems = [];
const index = { out, made: new Date().toISOString(), tiers: TIERS, gpu: null, shots: [] };
const save = (file, buf) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, buf); return path.relative(dirOut, file).split(path.sep).join('/'); };

async function idle(page, ms = 20000) {
  await page.waitForFunction(() => window.__game && window.__game.isIdle(), null, { timeout: ms }).catch(() => problems.push(`idle timeout ${page.url()}`));
}
const frames = (page, n = 3) => page.evaluate((n) => new Promise((r) => { let k = 0; const f = () => (++k >= n ? r() : requestAnimationFrame(f)); requestAnimationFrame(f); }), n);

// Runs one setup step inside the page.
async function op(page, step, tierSet) {
  const [name, ...a] = step;
  if (name === 'idle') return idle(page);
  if (name === 'wait') return page.waitForTimeout(a[0]);
  await page.evaluate(({ name, a, tierSet }) => {
    const g = window.__game;
    const sit = (poss, s) => ({ phase: 'call', poss, ballOn: 30, down: 1, toGo: 10, absX: 26.67, quarter: 1, clock: 200, runoff: 0, twoPoint: false, aiOff: null, ...s });
    switch (name) {
      case 'quick': { const o = a[0] || {}; g.seed(o.seed ?? 7);
        g.setState({ settings: { autoContinue: false, sound: false, weather: 'auto', theme: 'night', ...tierSet, ...(o.settings || {}) } });
        g.newGame({ mode: 'exhibition', you: o.you || 'hot-springs', opp: o.opp || 'lakeside', skipToss: true, skipKickoff: o.skipKickoff !== false, receiver: 0, quarterMin: 4, seed: o.seed ?? 7 });
        return; }
      case 'offense': g.setState({ game: sit(0, a[0]) }); g.act('call', a[1] || 'dive'); return;
      case 'defense': g.setState({ game: sit(1, a[0]) }); g.act('defCall', a[1] || 'base'); return;
      case 'set': g.setState(a[0]); return;
      case 'act': g.act(...a); return;
      case 'step': g.step(a[0]); return;
      case 'pause': g.pause(); return;
      case 'resume': g.resume(); return;
      case 'snap': g.setState({ ui: {} }); return;
      default: throw new Error(`unknown op ${name}`);
    }
  }, { name, a, tierSet });
}

async function settle(page, wait) {
  await page.evaluate((c) => window.__game.act('clock', c), SPEC.clock);
  if (wait === 'idle') await idle(page);
  // a settled moment is shown 2 s after the setup: effects timed from the whistle (falls) have finished (loop 11)
  if (wait === 'idle') { // render once at the base clock first, so queued effects (a hit's punch-in) start before the jump
    await op(page, ['snap']); await frames(page, 2);
    await page.evaluate((c) => window.__game.act('clock', c), SPEC.clock + 2000);
  }
  await op(page, ['snap']);
  await frames(page, 4);
  if (wait === 'idle') {
    await idle(page, 5000);
    // a layout change at the result (the side panel widening after live play) resizes the canvas a frame later:
    // snap again once it has, so the camera is placed for the final size (loop 12)
    await op(page, ['snap']); await frames(page, 4);
  }
}

async function fieldClip(page) {
  return page.evaluate(() => { const r = document.getElementById('field3d').getBoundingClientRect(); return { x: r.left, y: r.top, width: r.width, height: r.height }; });
}

async function tile(page, pngs, cols) {
  return page.evaluate(async ({ urls, cols }) => {
    const ims = await Promise.all(urls.map((u) => { const i = new Image(); i.src = u; return i.decode().then(() => i); }));
    const w = 480, h = Math.round(w * ims[0].height / ims[0].width), rows = Math.ceil(ims.length / cols);
    const c = document.createElement('canvas'); c.width = cols * w + (cols - 1) * 4; c.height = rows * h + (rows - 1) * 4;
    const x = c.getContext('2d'); x.fillStyle = '#000'; x.fillRect(0, 0, c.width, c.height);
    ims.forEach((im, i) => { const cx = (i % cols) * (w + 4), cy = Math.floor(i / cols) * (h + 4); x.drawImage(im, cx, cy, w, h);
      x.font = '700 18px sans-serif'; x.fillStyle = '#ffd21f'; x.fillText(`${i + 1}`, cx + 8, cy + 22); });
    return c.toDataURL('image/png');
  }, { urls: pngs.map((b) => `data:image/png;base64,${b.toString('base64')}`), cols });
}

async function diff(page, a, b) {
  return page.evaluate(async ([a, b]) => {
    const load = (u) => { const i = new Image(); i.src = u; return i.decode().then(() => i); };
    const [ia, ib] = await Promise.all([load(a), load(b)]);
    const px = (im) => { const c = document.createElement('canvas'); c.width = im.width; c.height = im.height; const x = c.getContext('2d'); x.drawImage(im, 0, 0); return x.getImageData(0, 0, im.width, im.height).data; };
    const da = px(ia), db = px(ib); let s = 0;
    for (let i = 0; i < da.length; i += 4) s += Math.abs(da[i] - db[i]) + Math.abs(da[i + 1] - db[i + 1]) + Math.abs(da[i + 2] - db[i + 2]);
    return s / (da.length / 4 * 3);
  }, [`data:image/png;base64,${a.toString('base64')}`, `data:image/png;base64,${b.toString('base64')}`]);
}

const shots = SPEC.shots.filter((s) => !ONLY || ONLY.includes(s.id));
for (const tier of TIERS) {
  const tierSet = TIER_SETTINGS[tier];
  if (!tierSet) throw new Error(`unknown tier ${tier}`);
  for (const vp of VPS) {
    const [viewport, scale] = VIEW[vp];
    const phone = vp !== 'desktop';
    const ctx = await browser.newContext({ viewport, deviceScaleFactor: scale, hasTouch: phone, isMobile: phone });
    const page = await ctx.newPage();
    const cdp = await ctx.newCDPSession(page);
    page.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) problems.push(`[${tier}/${vp}] console: ${m.text()}`); });
    page.on('response', (r) => { if (r.status() >= 400 && !/favicon/.test(r.url())) problems.push(`[${tier}/${vp}] ${r.status()} ${r.url()}`); });
    page.on('pageerror', (e) => problems.push(`[${tier}/${vp}] pageerror: ${e.message}`));
    page.on('request', (r) => { const u = r.url(); if (!u.startsWith('http://127.0.0.1') && !u.startsWith('data:') && !u.startsWith('blob:') && !u.startsWith('file:')) problems.push(`external request ${u}`); });
    for (const s of shots) {
      if (phone && !s.mobile) continue;
      const run = async () => {
        await page.goto(base);
        await page.waitForFunction(() => window.__game && window.__game.isIdle(), null, { timeout: 30000 });
        // freeze the clock before the setup too: effects started by its plays (dust, punch-ins) then repeat exactly
        await page.evaluate((c) => window.__game.act('clock', c), SPEC.clock);
        for (const st of s.setup) await op(page, st, tierSet);
        await settle(page, s.wait);
        return page.screenshot();
      };
      const t0 = Date.now();
      const png = await run();
      const rec = { id: s.id, title: s.title, cats: s.cats, tier, viewport: vp, file: save(path.join(dirOut, tier, vp, `${s.id}.png`), png), crops: [], strip: null };
      if (!index.gpu) index.gpu = await page.evaluate(() => window.__game.act('gfx'));
      rec.gfx = await page.evaluate(() => { const x = window.__game.act('gfx'); return { calls: x.calls, tris: x.tris, cpuMs: x.cpuMs, quality: x.quality, tier: x.tier, venue: x.venue, weather: x.weather }; });
      if (VERIFY && ['R04', 'R10', 'R12'].includes(s.id)) {
        const again = await run();
        const d = await diff(page, png, again);
        rec.verifyDiff = Math.round(d * 1000) / 1000;
        if (d > 0.5) { problems.push(`[${tier}/${vp}] ${s.id} not deterministic: mean diff ${d.toFixed(3)}/255`); save(path.join(dirOut, tier, vp, `${s.id}.again.png`), again); }
      }
      // close-ups: the same frozen frame through a close camera on the target, rendered at 2x pixels
      if (CROPS && vp === 'desktop' && s.crops) {
        await cdp.send('Emulation.setDeviceMetricsOverride', { width: viewport.width, height: viewport.height, deviceScaleFactor: 2, mobile: false });
        await page.evaluate(() => { window.dispatchEvent(new Event('resize')); document.getElementById('field').style.visibility = 'hidden'; });
        for (const c of s.crops) {
          const width = c.width || { 2: 14, 3: 6, 4: 3.5 }[c.zoom] || 6;
          const ok = await page.evaluate(([t, w, p, y]) => window.__game.act('camLook', t, w, p, y), [c.target, width, c.pitch ?? (c.target === 'crowd' || c.target === 'board' ? 0.05 : c.target.startsWith('turf') ? 0.5 : 0.16), c.yaw ?? 0.5]);
          if (!ok) { problems.push(`[${tier}] ${s.id} close-up ${c.target}: target not found`); continue; }
          await op(page, ['snap']); await frames(page, 4);
          const buf = await page.screenshot({ clip: await fieldClip(page), scale: 'device' });
          rec.crops.push({ target: c.target, width, file: save(path.join(dirOut, 'crops', tier, `${s.id}-${c.target.replace(/[:,.]/g, '_')}${c.tag ? `-${c.tag}` : ''}.png`), buf) });
        }
        await page.evaluate(() => { window.__game.act('camLook', null); document.getElementById('field').style.visibility = ''; });
        await cdp.send('Emulation.clearDeviceMetricsOverride');
        await page.evaluate(() => window.dispatchEvent(new Event('resize')));
      }
      // motion strip: 8 frames of the field view, stepping the sim (or the frozen replay) between them
      if (STRIPS && vp === 'desktop' && s.strip) {
        const bufs = [];
        const clip = await fieldClip(page);
        for (let k = 0; k < (s.strip.frames || 8); k++) {
          if (s.strip.replayFrom !== undefined) await page.evaluate((at) => window.__game.act('replay', at, true), s.strip.replayFrom + k * s.strip.step);
          else if (k) {
            await page.evaluate((n) => window.__game.step(n), s.strip.every);
            // the test clock moves with the sim, so effects timed from the whistle (falls, punch-ins) play out across the strip
            await page.evaluate((c) => window.__game.act('clock', c), SPEC.clock + Math.round((k * s.strip.every * 1000) / 60));
          }
          await op(page, ['snap']); await frames(page, 3);
          bufs.push(await page.screenshot({ clip }));
        }
        const url = await tile(page, bufs, 4);
        rec.strip = save(path.join(dirOut, 'strips', tier, `${s.id}.png`), Buffer.from(url.split(',')[1], 'base64'));
      }
      index.shots.push(rec);
      console.log(`${tier}/${vp} ${s.id} ${((Date.now() - t0) / 1000).toFixed(1)} s · ${rec.gfx.calls} calls${rec.verifyDiff !== undefined ? ` · verify ${rec.verifyDiff}` : ''}${rec.crops.length ? ` · ${rec.crops.length} crops` : ''}${rec.strip ? ' · strip' : ''}`);
    }
    await ctx.close();
  }
}
// a partial run (--only, fewer tiers or viewports) merges into the existing index
let prevIdx = null;
try { prevIdx = JSON.parse(fs.readFileSync(path.join(dirOut, 'shots.json'), 'utf8')); } catch { /* first run */ }
if (prevIdx) {
  const key = (s) => `${s.id}|${s.tier}|${s.viewport}`, fresh = new Set(index.shots.map(key));
  for (const s of index.shots) { const o = prevIdx.shots.find((p) => key(p) === key(s)); if (o && !s.strip && o.strip && !STRIPS) s.strip = o.strip; }
  index.shots = [...prevIdx.shots.filter((p) => !fresh.has(key(p))), ...index.shots].sort((a, b) => key(a).localeCompare(key(b)));
  index.tiers = [...new Set([...prevIdx.tiers, ...index.tiers])];
}
fs.writeFileSync(path.join(dirOut, 'shots.json'), JSON.stringify({ ...index, problems }, null, 2));
await browser.close(); server.close();
console.log(`GPU: ${index.gpu ? index.gpu.renderer : '?'} (software: ${index.gpu ? index.gpu.software : '?'})`);
if (problems.length) { console.error(`${problems.length} problem(s):\n  ${problems.slice(0, 20).join('\n  ')}`); process.exitCode = 1; }
else console.log(`✓ ${index.shots.length} captures → screenshots/${out}/`);
