// Dev aid: load the game on the real GPU with given settings and print errors and the 3D state.
//   node tools/dev/probe.mjs '{"quality":"high"}'
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const GAME = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const require = createRequire(path.resolve(GAME, 'shared', 'test-harness', 'package.json'));
const { chromium } = require('playwright');
const settings = JSON.parse(process.argv[2] || '{}');
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--enable-gpu', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--allow-file-access-from-files'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
page.on('console', (m) => console.log(`[console.${m.type()}] ${m.text().slice(0, 300)}`));
page.on('pageerror', (e) => console.log(`[pageerror] ${e.message}\n${(e.stack || '').split('\n').slice(0, 4).join('\n')}`));
page.on('requestfailed', (r) => console.log(`[requestfailed] ${r.url()}`));
await page.goto(pathToFileURL(path.join(GAME, 'index.html')).href);
await page.waitForFunction(() => window.__game, null, { timeout: 10000 });
await page.evaluate((s) => { const g = window.__game; g.seed(11); g.setState({ settings: { autoContinue: false, sound: false, ...s } }); g.newGame({ mode: 'exhibition', you: 'hot-springs', opp: 'lakeside', skipToss: true, skipKickoff: true, seed: 11 }); g.setState({ game: { phase: 'call', poss: 0, ballOn: 30, down: 1, toGo: 10, absX: 26.67 } }); g.act('call', 'curls'); }, settings);
for (let i = 0; i < 6; i++) {
  await page.waitForTimeout(1000);
  const s = await page.evaluate(() => { const st = window.__game.getState(); return { idle: window.__game.isIdle(), loop: st.loop, gfx: { tier: st.gfx.tier, detail: st.gfx.detail, post: st.gfx.post, packs: st.gfx.packs, calls: st.gfx.calls, callsTotal: st.gfx.callsTotal, animating: st.gfx.animating, artLoading: st.gfx.artLoading, err: st.gfx.err, cpuMs: st.gfx.cpuMs } }; });
  console.log(JSON.stringify(s));
}
if (process.argv[3]) await page.screenshot({ path: process.argv[3] });
await browser.close();
