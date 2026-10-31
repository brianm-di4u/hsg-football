#!/usr/bin/env node
// Packs the Blender crowd cells (art-src/crowd-cells, from art-src/blender/crowd/build_crowd.py) into two 1024x1024
// atlases, a shaded color atlas and an ID mask atlas (R shirt, G skin, B cap/hair), and writes assets/pack-crowd.js.
// Cell index = build * 32 + pose * 2 + frame, 16 cells per row, each 64x128. Uses the test harness's Chromium for
// the canvas work (downsampling the 4x supersampled renders).
//
//   node tools/pack-crowd.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { writePack, kb } from './packs-lib.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const game = path.join(here, '..'), root = game;
const cells = path.join(game, 'art-src', 'crowd-cells');
const { chromium } = await import(pathToFileURL(path.join(root, 'shared/test-harness/node_modules/playwright/index.mjs')).href);
const BUILDS = 4, POSES = 16, CW = 64, CH = 128, COLS = 16;
const POSE_NAMES = ['sit', 'sit-clap', 'sit-lean', 'stand', 'stand-clap', 'arms-up', 'wave', 'jump', 'point', 'phone', 'band-hold', 'band-play', 'hands-mouth', 'fist-pump', 'sit-cheer', 'stand-lean'];
const list = [];
for (let b = 0; b < BUILDS; b++) for (let p = 0; p < POSES; p++) for (let f = 0; f < 2; f++) list.push(`b${b}-p${String(p).padStart(2, '0')}-f${f}`);
const url = (f) => `data:image/png;base64,${fs.readFileSync(path.join(cells, f)).toString('base64')}`;

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent('<!doctype html><body></body>');
async function atlas(kind, mime, q) {
  return page.evaluate(async ({ urls, CW, CH, COLS, mime, q, mask }) => {
    const rows = Math.ceil(urls.length / COLS);
    const c = document.createElement('canvas'); c.width = COLS * CW; c.height = rows * CH;
    const x = c.getContext('2d'); x.imageSmoothingEnabled = true; x.imageSmoothingQuality = 'high';
    for (let i = 0; i < urls.length; i++) {
      const im = new Image(); im.src = urls[i]; await im.decode();
      // two halvings keep the downsample clean (256x512 -> 128x256 -> 64x128)
      const h = document.createElement('canvas'); h.width = im.width / 2; h.height = im.height / 2;
      const hx = h.getContext('2d'); hx.imageSmoothingQuality = 'high'; hx.drawImage(im, 0, 0, h.width, h.height);
      x.drawImage(h, (i % COLS) * CW, Math.floor(i / COLS) * CH, CW, CH);
    }
    if (mask) { // un-premultiply the ID colors at soft edges so tinting doesn't darken outlines
      const d = x.getImageData(0, 0, c.width, c.height), p = d.data;
      for (let i = 0; i < p.length; i += 4) { const a = p[i + 3] / 255; if (a > 0.02) for (let k = 0; k < 3; k++) p[i + k] = Math.min(255, p[i + k] / Math.max(a, 0.5)); }
      x.putImageData(d, 0, 0);
    }
    return c.toDataURL(mime, q);
  }, { urls: list.map((n) => url(`${n}-${kind}.png`)), CW, CH, COLS, mime, q, mask: kind === 'mask' });
}
const color = await atlas('color', 'image/webp', 0.9);
const mask = await atlas('mask', 'image/webp', 1.0);
const sheet = await page.evaluate(async (u) => { const i = new Image(); i.src = u; await i.decode(); const c = document.createElement('canvas'); c.width = i.width; c.height = i.height; const x = c.getContext('2d'); x.fillStyle = '#2a3040'; x.fillRect(0, 0, c.width, c.height); x.drawImage(i, 0, 0); return c.toDataURL('image/png'); }, color);
fs.writeFileSync(path.join(game, 'art-src', 'crowd-atlas-preview.png'), Buffer.from(sheet.split(',')[1], 'base64'));
await browser.close();
const data = JSON.stringify({ color, mask, cols: COLS, cw: CW, ch: CH, builds: BUILDS, poses: POSE_NAMES });
const p = writePack('crowd', { tiers: ['medium', 'high'] }, 'data', data, 'crowd atlas rendered in Blender (art-src/blender/crowd)');
console.log(`pack-crowd.js ${kb(p.bytes)} (${list.length} cells)`);
