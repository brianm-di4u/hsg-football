// Team kits and the players pack (Medium/High): every team has a legible home and away kit (kits.js), every home
// jersey stands apart from every visitor's away jersey, and the packed baseline player LODs decode through the
// game's own models.js with its skeleton, regions in range and triangle counts that fall level by level.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const GAME = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const imp = (p) => import(pathToFileURL(path.join(GAME, p)).href);
async function load() {
  globalThis.SCHOOLS = globalThis.SCHOOLS || JSON.parse(fs.readFileSync(path.join(GAME, 'data', 'schools.json'), 'utf8'));
  const [{ ALL, contrast }, kits] = await Promise.all([imp('src/js/data.js'), imp('src/js/kits.js')]);
  return { teams: ALL.filter((t) => t.id), contrast, ...kits };
}
// assets/pack-players.js is a classic script that assigns globalThis.FNSC_PACKS.players
function readPack() {
  const src = fs.readFileSync(path.join(GAME, 'assets', 'pack-players.js'), 'utf8');
  const g = {}; new Function('globalThis', src)(g);
  return g.FNSC_PACKS.players.data;
}

export const tests = [
  {
    name: 'every team has a legible home and away kit',
    node: true,
    async run(t) {
      const { teams, contrast, KITS, designFor, checkLook, MAX_BANDS } = await load();
      t.equal(teams.length, 10, 'ten teams');
      const looks = {};
      for (const tm of teams) {
        t.expect(!!KITS.teams[tm.id], `${tm.id} has a kit design`);
        if (!KITS.teams[tm.id]) continue;
        for (const home of [true, false]) {
          const look = designFor(tm, home);
          looks[`${tm.id}:${home}`] = look;
          const issues = checkLook(look);
          t.expect(issues.length === 0, `${tm.id} ${home ? 'home' : 'away'}: ${issues.join('; ') || 'legible'}`);
          t.expect(look.bands.length <= MAX_BANDS, `${tm.id} ${home ? 'home' : 'away'}: ${look.bands.length} stripe bands fit the shader`);
        }
      }
      let worst = Infinity;
      for (const a of teams) for (const b of teams) {
        if (a === b || !looks[`${a.id}:true`] || !looks[`${b.id}:false`]) continue;
        worst = Math.min(worst, contrast(looks[`${a.id}:true`].colors.jersey, looks[`${b.id}:false`].colors.jersey));
      }
      t.expect(worst >= 3, `every home jersey vs every away jersey has contrast >= 3 (lowest ${worst.toFixed(2)})`);
    },
  },
  {
    name: 'players pack LODs decode with the game skeleton',
    node: true,
    async run(t) {
      const [{ modelGeometry }, { MODEL_DATA }] = await Promise.all([imp('src/js/models.js'), imp('src/js/models-data.js')]);
      const hd = readPack();
      t.equal(hd.boneList, MODEL_DATA.boneList, 'pack bone list matches models-data.js');
      t.expect(!!hd.models.official, 'the HD official is in the pack');
      const NR = hd.regions.length;
      const tris = [];
      for (const lod of [0, 1, 2]) {
        const g = modelGeometry(`player_lod${lod}`, 1, hd);
        const n = g.getAttribute('position').count, reg = g.getAttribute('reg'), si = g.getAttribute('skinIndex').array, pos = g.getAttribute('position').array;
        tris.push(n / 3);
        t.expect(!!reg, `LOD${lod} has a kit region per vertex`);
        let badReg = 0, badBone = 0, minY = Infinity, maxY = -Infinity;
        for (let i = 0; i < n; i++) {
          if (reg && !(reg.array[i] >= 0 && reg.array[i] < NR)) badReg++;
          if (si[i * 4] >= MODEL_DATA.boneList.length || si[i * 4 + 1] >= MODEL_DATA.boneList.length) badBone++;
          minY = Math.min(minY, pos[i * 3 + 1]); maxY = Math.max(maxY, pos[i * 3 + 1]);
        }
        t.equal(badReg, 0, `LOD${lod} regions in range`);
        t.equal(badBone, 0, `LOD${lod} bone indices in range`);
        t.expect(minY > -0.02 && maxY > 1.8 && maxY < 1.95, `LOD${lod} stands on the turf at about 1.89 m (${minY.toFixed(3)}..${maxY.toFixed(3)})`);
      }
      t.expect(tris[0] > tris[1] && tris[1] > tris[2] && tris[2] >= 1500, `triangles fall level by level (${tris.join(', ')})`);
    },
  },
];
