#!/usr/bin/env node
// Checks that the baseline player is a drop-in for the game and that every team's uniform reads:
//  - each LOD decodes through the game's own models.js modelGeometry (the HD pack path) with the game's skeleton;
//  - bone indices, two-bone weights, slots, regions and uv are in range; height and triangle targets hold;
//  - LOD0-2 together fit the players pack budget (tools/build.mjs);
//  - every team has a home and away design whose number and stripes have enough contrast, and every home jersey is
//    distinguishable from every opponent's away jersey.
//
//   node experiments/baseline-player/compat.test.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const GAME = path.resolve(HERE, '..', '..');
globalThis.SCHOOLS = JSON.parse(fs.readFileSync(path.join(GAME, 'data', 'schools.json'), 'utf8'));
const imp = (p) => import(pathToFileURL(path.join(GAME, p)).href);
const { modelGeometry } = await imp('src/js/models.js');
const { MODEL_DATA } = await imp('src/js/models-data.js');
const { ALL, contrast } = await imp('src/js/data.js');
const { designFor, checkLook, KITS: designs } = await import('./design.js');

const TARGET = { hero: 60000, lod0: 15000, lod1: 6000, lod2: 2000 };
const PACK_BUDGET = 3584 * 1024; // tools/build.mjs BUDGET.players
let fails = 0, passes = 0;
const ok = (cond, msg) => { if (cond) passes++; else { fails++; console.error(`✗ ${msg}`); } };

let packBytes = 0;
for (const lod of Object.keys(TARGET)) {
  const file = lod === 'hero' ? path.join(HERE, 'models', 'hero.json') : path.join(HERE, '..', '..', 'art-src', 'players-baseline', `${lod}.json`);
  const J = JSON.parse(fs.readFileSync(file, 'utf8'));
  const m = J.models.player;
  if (lod !== 'hero') packBytes += fs.statSync(file).size;
  ok(JSON.stringify(J.boneList) === JSON.stringify(MODEL_DATA.boneList), `${lod}: bone list matches models-data.js`);
  for (const [k, v] of Object.entries(MODEL_DATA.bones)) ok(v.every((c, i) => Math.abs(c - J.bones[k][i]) < 1e-6), `${lod}: bone ${k} at the game's rest position`);
  ok(JSON.stringify(J.parent) === JSON.stringify(MODEL_DATA.parent), `${lod}: bone hierarchy matches`);
  const g = modelGeometry(`test_${lod}`, 1, { models: { [`test_${lod}`]: m } });
  const pos = g.attributes.position.array, si = g.attributes.skinIndex.array, sw = g.attributes.skinWeight.array, slot = g.attributes.slot.array, uv = g.attributes.uv.array;
  const n = pos.length / 3, tris = n / 3;
  ok(Math.abs(tris - TARGET[lod]) / TARGET[lod] <= 0.05, `${lod}: ${tris} triangles within 5% of ${TARGET[lod]}`);
  let ys = [Infinity, -Infinity], badBone = 0, badW = 0, badSlot = 0, badUv = 0;
  for (let i = 0; i < n; i++) {
    ys = [Math.min(ys[0], pos[i * 3 + 1]), Math.max(ys[1], pos[i * 3 + 1])];
    if (si[i * 4] > 10 || si[i * 4 + 1] > 10) badBone++;
    const w = sw[i * 4] + sw[i * 4 + 1];
    if (Math.abs(w - 1) > 1e-3 || sw[i * 4] < 0 || sw[i * 4 + 1] < 0) badW++;
    if (slot[i] < 0 || slot[i] > 9) badSlot++;
    if (Math.abs(uv[i * 2]) > 32 || Math.abs(uv[i * 2 + 1]) > 32) badUv++;
  }
  const reg = Buffer.from(m.reg, 'base64');
  ok(reg.length === n && reg.every((r) => r < J.regions.length), `${lod}: one region per vertex, all < ${J.regions.length}`);
  ok(badBone === 0, `${lod}: bone indices < 11 (${badBone} bad)`);
  ok(badW === 0, `${lod}: two-bone weights sum to 1 (${badW} bad)`);
  ok(badSlot === 0, `${lod}: game slots 0-9 (${badSlot} bad)`);
  ok(badUv === 0, `${lod}: uv within int16/1000 range (${badUv} bad)`);
  ok(ys[1] - ys[0] > 1.85 && ys[1] - ys[0] < 1.93, `${lod}: height ${(ys[1] - ys[0]).toFixed(3)} m`);
  ok(ys[0] > -0.005, `${lod}: nothing below the turf (${ys[0].toFixed(4)})`);
  console.log(`${lod.padEnd(4)} ${String(tris).padStart(6)} tris  ${(fs.statSync(file).size / 1024).toFixed(0).padStart(5)} KB  height ${(ys[1] - ys[0]).toFixed(3)} m`);
}
ok(packBytes <= PACK_BUDGET, `LOD0-2 ${(packBytes / 1024).toFixed(0)} KB within the ${PACK_BUDGET / 1024} KB players pack budget`);

const teams = ALL.filter((t) => t.id);
ok(teams.length === 10, `10 teams in the game (${teams.length})`);
const looks = {};
for (const t of teams) {
  ok(!!designs.teams[t.id], `${t.id}: has a uniform design`);
  if (!designs.teams[t.id]) continue;
  for (const home of [true, false]) {
    const look = designFor(t, home, designs);
    looks[`${t.id}:${home}`] = look;
    const issues = checkLook(look);
    ok(issues.length === 0, `${t.id} ${home ? 'home' : 'away'}: ${issues.join('; ') || 'legible'}`);
  }
}
let worst = { c: Infinity };
for (const a of teams) for (const b of teams) {
  if (a === b || !looks[`${a.id}:true`] || !looks[`${b.id}:false`]) continue;
  const c = contrast(looks[`${a.id}:true`].colors.jersey, looks[`${b.id}:false`].colors.jersey);
  if (c < worst.c) worst = { c, a: a.id, b: b.id };
  ok(c >= 3, `${a.id} home vs ${b.id} away jerseys: ${c.toFixed(2)} >= 3`);
}
console.log(`lowest home/away jersey contrast: ${worst.c.toFixed(2)} (${worst.a} home vs ${worst.b} away)`);
console.log(`${passes} passed, ${fails} failed`);
process.exitCode = fails ? 1 : 0;
