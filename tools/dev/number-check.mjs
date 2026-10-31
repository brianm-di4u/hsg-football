// Dev aid: photograph one player's chest and back numbers (front and rear close-ups) to check decal orientation.
//   node tools/dev/number-check.mjs <quality> <out-prefix>
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const GAME = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const require = createRequire(path.resolve(GAME, 'shared', 'test-harness', 'package.json'));
const { chromium } = require('playwright');
const [quality = 'high', out = 'num'] = process.argv.slice(2);
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--enable-gpu', '--use-angle=d3d11'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto(pathToFileURL(path.join(GAME, 'index.html')).href);
await page.waitForFunction(() => window.__game);
await page.evaluate((q) => { const g = window.__game; g.seed(11); g.setState({ settings: { autoContinue: false, sound: false, quality: q, detail: 2 } });
  g.newGame({ mode: 'exhibition', you: 'hot-springs', opp: 'lakeside', skipToss: true, skipKickoff: true, seed: 11 });
  g.setState({ game: { phase: 'call', poss: 0, ballOn: 30, down: 1, toGo: 10, absX: 26.67 } }); g.act('call', 'curls'); }, quality);
await page.waitForFunction(() => window.__game.isIdle(), null, { timeout: 20000 });
document: for (const [name, yaw] of [['back', 0.0], ['front', Math.PI]]) {
  await page.evaluate((y) => { document.getElementById('field').style.visibility = 'hidden'; window.__game.act('camLook', 'slot:C', 3.2, 0.12, y); }, yaw);
  await page.waitForTimeout(400);
  const r = await page.evaluate(() => { const b = document.getElementById('field3d').getBoundingClientRect(); return { x: b.left, y: b.top, width: b.width, height: b.height }; });
  await page.screenshot({ path: `${out}-${name}.png`, clip: r });
}
await browser.close();
