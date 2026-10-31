#!/usr/bin/env node
// Packs the Medium/High body meshes into assets/pack-players.js:
//  - player_lod0|1|2: the baseline player (art-src/players-baseline, from experiments/baseline-player/build_baseline.py),
//    with a uniform region per vertex for the kit material (models.js kitMaterial, kits.js);
//  - official: the HD official (art-src/players-hd.json, from art-src/blender/players/build_hd.py).
// All share the game's 11-bone skeleton and rest pose (models-data.js).
//
//   node tools/pack-players.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { writePack, kb } from './packs-lib.mjs';

const game = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (...p) => JSON.parse(fs.readFileSync(path.join(game, 'art-src', ...p), 'utf8'));
const hd = read('players-hd.json');
const lods = ['lod0', 'lod1', 'lod2'].map((l) => read('players-baseline', `${l}.json`));
for (const j of lods) {
  if (JSON.stringify(j.boneList) !== JSON.stringify(hd.boneList)) throw new Error(`${j.lod}: bone list differs from players-hd.json`);
  if (JSON.stringify(j.regions) !== JSON.stringify(lods[0].regions)) throw new Error(`${j.lod}: regions differ from lod0`);
}
const models = { official: hd.models.official };
for (const j of lods) models[`player_${j.lod}`] = j.models.player;
const data = JSON.stringify({ boneList: hd.boneList, regions: lods[0].regions, boxes: lods[0].boxes, models });
const p = writePack('players', { tiers: ['medium', 'high'] }, 'data', data, 'baseline player LOD0-2 and HD official, built in Blender');
const tris = lods.map((j) => `${j.lod} ${j.models.player.count / 3}`).join(', ');
console.log(`pack-players.js ${kb(p.bytes)} (${tris} tris; official ${hd.models.official.count / 3})`);
