#!/usr/bin/env node
// One build command for the football game. Runs the generators in order, inlines src/ into index.html and checks
// the size budgets (VISUAL-PLAN-2.md, "Budgets").
//
//   node tools/build.mjs              three, fonts, art, data, packs, inline, check
//   node tools/build.mjs --blender    also rebuilds the Blender models first (slow)
//   node tools/build.mjs --only=inline,check
//   node tools/build.mjs --check      budgets only
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const game = path.join(here, '..');
const root = game;
const BLENDER = process.env.BLENDER || 'C:\\Program Files\\Blender Foundation\\Blender 5.2\\blender.exe';
const args = process.argv.slice(2);
const only = (args.find((a) => a.startsWith('--only=')) || '').slice(7).split(',').filter(Boolean);
const want = (s) => (args.includes('--check') ? s === 'check' : only.length ? only.includes(s) : s !== 'blender' || args.includes('--blender'));

const KB = 1024;
// Pack budgets in bytes. A pack missing from this list fails the check, so new packs get a budget on purpose.
export const BUDGET = {
  html: 2048 * KB, htmlTarget: 1450 * KB,
  packs: { 'three-hi': 450 * KB, ktx2: 750 * KB, env: 600 * KB, turf: 600 * KB, crowd: 900 * KB, players: 3584 * KB, rapier: 2560 * KB },
  medium: 7 * KB * KB, high: 9.5 * KB * KB,
};

function run(label, cmd, argv, opts = {}) {
  const t = Date.now();
  const r = spawnSync(cmd, argv, { cwd: root, stdio: 'inherit', ...opts });
  if (r.status !== 0) { console.error(`\n✗ ${label} failed (exit ${r.status})`); process.exit(1); }
  console.log(`✓ ${label} (${((Date.now() - t) / 1000).toFixed(1)} s)`);
}
const node = (label, file, ...a) => run(label, process.execPath, [path.join(game, file), ...a]);
const blender = (label, script) => run(label, BLENDER, ['-b', '--factory-startup', '--python', path.join(game, script)]);

if (want('blender')) {
  blender('blender: low-poly models', 'art-src/blender/build_models.py');
  for (const s of ['art-src/blender/players/build_all.py', 'art-src/blender/crowd/build_crowd.py']) {
    if (fs.existsSync(path.join(game, s))) blender(`blender: ${s}`, s);
  }
}
if (want('three')) node('three.js core + addon pack', 'tools/build-three.mjs');
if (want('fonts')) node('fonts', 'tools/build-fonts.mjs');
if (want('art')) node('sky art', 'tools/build-art.mjs');
if (want('data')) node('data', 'tools/build-data.mjs');
// asset packs whose sources are present (the Blender renders are git-ignored; the committed packs stay otherwise)
if (want('packs') && fs.existsSync(path.join(game, 'art-src', 'crowd-cells', 'b0-p00-f0-color.png'))) node('crowd pack', 'tools/pack-crowd.mjs');
if (want('inline')) run('inline index.html', process.execPath, [path.join(root, 'shared', 'tools', 'inline.mjs'), path.join(game)]);

if (want('check')) {
  const fails = [];
  const size = (f) => fs.statSync(path.join(game, f)).size;
  const html = size('index.html');
  const rows = [['index.html', html, BUDGET.html]];
  if (html > BUDGET.html) fails.push(`index.html ${html} > ${BUDGET.html}`);
  if (html > BUDGET.htmlTarget) console.warn(`! index.html ${(html / KB).toFixed(0)} KB is over the ${(BUDGET.htmlTarget / KB).toFixed(0)} KB target`);
  if (/<script[^>]+src=/i.test(fs.readFileSync(path.join(game, 'index.html'), 'utf8'))) fails.push('index.html has a <script src=>');
  let man = {};
  try { man = JSON.parse(fs.readFileSync(path.join(game, 'assets', 'packs.json'), 'utf8')); } catch { /* no packs yet */ }
  const tierTotal = { medium: 0, high: 0 };
  for (const [name, p] of Object.entries(man)) {
    const file = path.join(game, p.file);
    if (!fs.existsSync(file)) { fails.push(`${p.file} missing`); continue; }
    const text = fs.readFileSync(file, 'utf8');
    const b = Buffer.byteLength(text);
    const m = text.match(/^\/\* .*? v(\d+) · ([0-9a-f]{16}) ·/);
    if (!m || m[2] !== p.hash || +m[1] !== p.v) fails.push(`${p.file} header does not match packs.json`);
    const budget = BUDGET.packs[name];
    if (!budget) fails.push(`pack ${name} has no budget in tools/build.mjs`);
    else if (b > budget) fails.push(`${p.file} ${b} > ${budget}`);
    if (b !== p.bytes) fails.push(`${p.file} size ${b} differs from packs.json ${p.bytes}`);
    for (const t of ['medium', 'high']) if (p.tiers.includes(t)) tierTotal[t] += b;
    rows.push([p.file, b, budget]);
  }
  const mod = fs.readFileSync(path.join(game, 'src', 'js', 'packs-manifest.js'), 'utf8');
  const sorted = Object.fromEntries(Object.keys(man).sort().map((k) => [k, man[k]]));
  if (!mod.includes(JSON.stringify(sorted))) fails.push('src/js/packs-manifest.js is out of date with assets/packs.json');
  for (const t of ['medium', 'high']) {
    rows.push([`total ${t} download`, tierTotal[t], BUDGET[t]]);
    if (tierTotal[t] > BUDGET[t]) fails.push(`${t} packs ${tierTotal[t]} > ${BUDGET[t]}`);
  }
  console.log('\n' + rows.map(([f, b, lim]) => `  ${f.padEnd(28)} ${(b / KB).toFixed(0).padStart(6)} KB${lim ? ` / ${(lim / KB).toFixed(0)} KB` : ''}`).join('\n'));
  const h = crypto.createHash('sha256').update(fs.readFileSync(path.join(game, 'index.html'))).digest('hex').slice(0, 12);
  console.log(`  index.html sha256 ${h}`);
  if (fails.length) { console.error('\n✗ budget check:\n  ' + fails.join('\n  ')); process.exit(1); }
  console.log('✓ budgets');
}
