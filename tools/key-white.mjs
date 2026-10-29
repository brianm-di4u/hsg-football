#!/usr/bin/env node
// Keys out ALL near-white, low-saturation pixels of a painted motif (art-pack's keyWhite only removes white that
// touches the edge, which leaves enclosed gaps such as the space inside a trophy's handles). Uses the harness's
// Chromium canvas, so no image libraries are needed.
//   node tools/key-white.mjs art-src/trophy.png art-src/trophy-keyed.png [threshold=232]
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const game = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(path.join(game, 'shared', 'test-harness', 'package.json'));
const { chromium } = require('playwright');
const [src, dst, thr = '232'] = process.argv.slice(2);
const b64 = fs.readFileSync(path.join(game, src)).toString('base64');
const browser = await chromium.launch();
const page = await browser.newPage();
const out = await page.evaluate(async ([b64, thr]) => {
  const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode();
  const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
  const x = c.getContext('2d'); x.drawImage(img, 0, 0);
  const d = x.getImageData(0, 0, c.width, c.height), p = d.data;
  for (let i = 0; i < p.length; i += 4) {
    const mn = Math.min(p[i], p[i + 1], p[i + 2]), mx = Math.max(p[i], p[i + 1], p[i + 2]);
    if (mn >= thr && mx - mn < 18) p[i + 3] = 0;
    else if (mn >= thr - 18 && mx - mn < 22) p[i + 3] = Math.round(255 * (thr - mn) / 18); // soft edge
  }
  x.putImageData(d, 0, 0);
  return c.toDataURL('image/png').split(',')[1];
}, [b64, Number(thr)]);
fs.writeFileSync(path.join(game, dst), Buffer.from(out, 'base64'));
await browser.close();
console.log('wrote', dst);
