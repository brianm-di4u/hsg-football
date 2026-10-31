#!/usr/bin/env node
// Builds three.js (vendor/three, r186, MIT) in two parts:
//   src/js/three-lib.js       core, tree-shaken to the classes the game and the addons use; inlined into index.html.
//                             Also sets globalThis.__FNSC_THREE so the addon pack can share the same classes.
//   assets/pack-three-hi.js   the addons from vendor/three/addons (post-processing, glTF/KTX2/HDR loaders, meshopt,
//                             IK, SkeletonUtils), loaded only at Medium/High. `import … from 'three'` resolves to the
//                             core above, so `instanceof` and `isTexture` checks hold across the two.
//
//   cd tools/dev && npm install   (once: esbuild, build-time only)
//   node tools/build-three.mjs
//
// Add a name to NAMES when the game starts using another three.js export, and to ADDONS for another addon.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { writePack, kb } from './packs-lib.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const game = path.join(here, '..');
const require = createRequire(path.join(here, 'dev', 'package.json'));
const esbuild = require('esbuild');
const fwd = (p) => p.split(path.sep).join('/');
const vendor = path.join(game, 'vendor', 'three');

const NAMES = [
  'WebGLRenderer', 'Scene', 'PerspectiveCamera', 'OrthographicCamera', 'Group', 'Object3D', 'Mesh', 'InstancedMesh', 'SkinnedMesh', 'Skeleton', 'Bone',
  'Points', 'LineSegments', 'Sprite',
  'BufferGeometry', 'BufferAttribute', 'Float32BufferAttribute', 'InstancedBufferAttribute', 'InstancedBufferGeometry', 'PlaneGeometry', 'BoxGeometry', 'CylinderGeometry',
  'SphereGeometry', 'ConeGeometry', 'CircleGeometry', 'RingGeometry', 'OctahedronGeometry',
  'MeshLambertMaterial', 'MeshBasicMaterial', 'MeshStandardMaterial', 'ShaderMaterial', 'PointsMaterial', 'SpriteMaterial', 'LineBasicMaterial',
  'CanvasTexture', 'DataTexture', 'Data3DTexture', 'Texture', 'WebGLRenderTarget', 'PMREMGenerator', 'Cache',
  'HemisphereLight', 'DirectionalLight', 'AmbientLight', 'Fog', 'FogExp2',
  'AnimationMixer', 'AnimationClip', 'LoopRepeat', 'LoopOnce',
  'Color', 'Vector2', 'Vector3', 'Vector4', 'Matrix4', 'Quaternion', 'Euler', 'Box3', 'Sphere', 'MathUtils',
  'SRGBColorSpace', 'LinearSRGBColorSpace', 'NoColorSpace', 'ACESFilmicToneMapping', 'AgXToneMapping', 'NeutralToneMapping', 'NoToneMapping',
  'AdditiveBlending', 'NormalBlending', 'DoubleSide', 'BackSide', 'FrontSide', 'PCFSoftShadowMap', 'PCFShadowMap',
  'RepeatWrapping', 'ClampToEdgeWrapping', 'LinearFilter', 'LinearMipmapLinearFilter', 'NearestFilter', 'RGBAFormat', 'UnsignedByteType', 'HalfFloatType', 'FloatType', 'DynamicDrawUsage',
  'REVISION',
];

// [file under vendor/three/addons, exported names]
const ADDONS = [
  ['postprocessing/EffectComposer.js', ['EffectComposer']],
  ['postprocessing/RenderPass.js', ['RenderPass']],
  ['postprocessing/ShaderPass.js', ['ShaderPass']],
  ['postprocessing/UnrealBloomPass.js', ['UnrealBloomPass']],
  ['postprocessing/GTAOPass.js', ['GTAOPass']],
  ['postprocessing/SMAAPass.js', ['SMAAPass']],
  ['postprocessing/OutputPass.js', ['OutputPass']],
  ['postprocessing/LUTPass.js', ['LUTPass']],
  ['postprocessing/BokehPass.js', ['BokehPass']],
  ['loaders/GLTFLoader.js', ['GLTFLoader']],
  ['loaders/KTX2Loader.js', ['KTX2Loader']],
  ['loaders/HDRLoader.js', ['HDRLoader']],
  ['libs/meshopt_decoder.module.js', ['MeshoptDecoder']],
  ['animation/CCDIKSolver.js', ['CCDIKSolver']],
  ['utils/SkeletonUtils.js', ['clone as cloneSkinned']],
];
const addonEntry = ADDONS.map(([f, n]) => `export { ${n.join(', ')} } from ${JSON.stringify(fwd(path.join(vendor, 'addons', f)))};`).join('\n');

// 1. Which core names do the addons import? Bundle them with 'three' external and read the import lines back.
const probe = await esbuild.build({
  stdin: { contents: addonEntry, resolveDir: game, loader: 'js' }, bundle: true, write: false, format: 'esm', external: ['three'], logLevel: 'error',
});
const used = new Set();
for (const m of probe.outputFiles[0].text.matchAll(/import\s*\{([^}]*)\}\s*from\s*["']three["']/g)) {
  for (const s of m[1].split(',')) { const n = s.trim().split(/\s+as\s+/)[0]; if (n) used.add(n); }
}
const all = [...new Set([...NAMES, ...used])];

// 2. Core.
const coreEntry = `export { ${all.join(', ')} } from ${JSON.stringify(fwd(path.join(vendor, 'three.module.js')))};`;
const core = await esbuild.build({
  stdin: { contents: coreEntry, resolveDir: game, loader: 'js' },
  bundle: true, minify: true, format: 'iife', globalName: '__THREE', write: false, target: 'es2020', legalComments: 'none',
  define: { 'process.env.NODE_ENV': '"production"' },
});
let code = core.outputFiles[0].text.trim();
// The inliner scans for `import`/`export` at line starts; make sure the minified bundle has none of its own.
code = code.replace(/^(\s*)(import|export)\b/gm, '$1;$2');
const out = `// GENERATED by tools/build-three.mjs from vendor/three (three.js r186, MIT, Copyright 2010-2026 Three.js Authors).\n` +
  `// Tree-shaken and minified with esbuild. Do not edit by hand.\n${code}\nglobalThis.__FNSC_THREE = __THREE;\nexport const THREE = __THREE;\n`;
fs.writeFileSync(path.join(game, 'src', 'js', 'three-lib.js'), out);
console.log(`three-lib.js ${kb(out.length)} (${all.length} exports, ${used.size} used by addons)`);

// 3. Addon pack. 'three' becomes the core that index.html already loaded.
const shim = {
  name: 'three-global',
  setup(b) {
    b.onResolve({ filter: /^three$/ }, () => ({ path: 'three', namespace: 'fnsc' }));
    b.onLoad({ filter: /.*/, namespace: 'fnsc' }, () => ({ contents: 'module.exports = globalThis.__FNSC_THREE;', loader: 'js' }));
  },
};
const hi = await esbuild.build({
  stdin: { contents: addonEntry, resolveDir: game, loader: 'js' }, plugins: [shim],
  bundle: true, minify: true, format: 'iife', globalName: '__FNSC_ADDONS', write: false, target: 'es2020', legalComments: 'none', logLevel: 'error',
  // KTX2Loader resolves its transcoder next to itself at load time; a classic script has no import.meta, so give it a
  // fixed virtual base (the transcoder is served from THREE.Cache under these URLs, never fetched)
  define: { 'import.meta.url': '"https://fnsc.invalid/addons/loaders/KTX2Loader.js"' },
});
const body = `${hi.outputFiles[0].text.trim()}\nreturn __FNSC_ADDONS;`;
const p = writePack('three-hi', { tiers: ['medium', 'high'], deps: [] }, 'code', body, 'three.js r186 addons, MIT, Copyright 2010-2026 Three.js Authors');
console.log(`pack-three-hi.js ${kb(p.bytes)} (${ADDONS.length} addons)`);
