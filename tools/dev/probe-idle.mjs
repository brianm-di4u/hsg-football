// Dev aid: reproduce the reduced-motion idle check and print what keeps the game busy.
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const GAME = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const require = createRequire(path.resolve(GAME, 'shared', 'test-harness', 'package.json'));
const { chromium } = require('playwright');
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--enable-gpu', '--use-angle=d3d11'] });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' });
const page = await ctx.newPage();
page.on('pageerror', (e) => console.log('[pageerror]', e.message));
await page.goto(pathToFileURL(path.join(GAME, 'index.html')).href);
await page.waitForFunction(() => window.__game);
await page.evaluate(() => { const g = window.__game; g.seed(7); g.setState({ settings: { autoContinue: false, sound: false, quality: 'low', detail: 2, motion: 'auto' } });
  g.newGame({ mode: 'exhibition', you: 'hot-springs', opp: 'lakeside', skipToss: true, skipKickoff: true, seed: 7 });
  g.setState({ game: { ballOn: 80 } }); g.act('forceResult', { kind: 'td', yards: 20, scorer: 'O', clockStops: true }); });
for (const ms of [150, 400, 1000]) {
  await page.waitForTimeout(ms);
  console.log(ms, JSON.stringify(await page.evaluate(() => { const s = window.__game.getState(); return { idle: window.__game.isIdle(), loop: s.loop, phase: s.game.phase, overlay: s.overlay, fx: s.fx, gfx: { animating: s.gfx.animating, artLoading: s.gfx.artLoading, tier: s.gfx.tier, replay: s.gfx.replay, parts: s.gfx.parts, hype: s.gfx.hype } }; })));
}
await browser.close();
