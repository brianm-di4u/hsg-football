// Quality tiers. Low is the v2 look (Lambert shading, blob shadows, canvas light pools) and needs nothing beyond
// index.html. Medium adds physically based materials, an image-based environment and a shadow-casting light bank.
// High adds a second shadow bank and post-processing (post3d.js, from the three-hi asset pack). Within a tier,
// `detail` 0..2 is the old quality knob (pixel ratio, crowd density, haze). Tier and detail changes swap materials
// and toggle objects on the built scene: they never rebuild the stadium.
//
// Auto: software GL and phones stay Low; a hardware desktop GPU starts Low, loads the packs in the background and
// moves to High when they are ready. Slow frames step detail down, then the tier; a tier stepped down from is not
// tried again this session.
import { THREE } from './three-lib.js';
import { paletteMaterial } from './models.js';
import { requirePacks, packsOff } from './packs.js';

export const TIERS = ['low', 'medium', 'high'];
export const tierN = (t) => Math.max(0, TIERS.indexOf(t));

// ------------------------------------------------------------------ materials
// The physically based twin of a Low material (cached on it). null keeps the Low material at every tier.
function stdOf(mat) {
  if (mat.userData.std !== undefined) return mat.userData.std;
  let s = null;
  const k = mat.userData.kind;
  if (mat.userData.makeStd) s = mat.userData.makeStd();
  else if (k === 'palette') s = paletteMaterial({ std: true, shared: mat });
  else if (k === 'crowd') s = null;
  else if (mat.isMeshLambertMaterial) {
    s = new THREE.MeshStandardMaterial({ color: mat.color, map: mat.map, vertexColors: mat.vertexColors, side: mat.side, transparent: mat.transparent,
      opacity: mat.opacity, depthWrite: mat.depthWrite, polygonOffset: mat.polygonOffset, polygonOffsetFactor: mat.polygonOffsetFactor,
      polygonOffsetUnits: mat.polygonOffsetUnits, roughness: mat.userData.rough ?? 0.85, metalness: mat.userData.metal ?? 0 });
  }
  if (s) { s.userData.kind = s.userData.kind || k; s.userData.isStd = true; }
  mat.userData.std = s;
  return s;
}

// Point every mesh under `root` at its material for `tier`.
export function applyMaterials(root, tier) {
  const std = tier !== 'low';
  root.traverse((o) => {
    if (!o.isMesh || !o.material || Array.isArray(o.material)) return;
    const low = o.userData.matLow || o.material;
    o.userData.matLow = low;
    o.material = std ? stdOf(low) || low : low;
  });
}

export function disposeStd(mat) { if (mat && mat.userData.std) { mat.userData.std.dispose(); mat.userData.std = undefined; } }

// ------------------------------------------------------------------ the governor
export const tierState = { want: 'auto', tier: 'low', detail: 2, ready: { medium: false, high: false }, loading: false, banned: new Set(), slow: 0, last: 0, changed: 0 };

// Which tier the device should run when the setting is 'auto'.
export function autoTarget(F3) {
  if (F3.software) return 'low';
  const w = window.innerWidth, h = window.innerHeight, touch = navigator.maxTouchPoints > 0;
  if (Math.min(w, h) < 600 || (touch && Math.max(w, h) < 1100)) return 'low';
  for (const t of ['high', 'medium']) if (!tierState.banned.has(t)) return t;
  return 'low';
}

// Load what a tier needs. High can't run without the addon pack (post-processing); the crowd atlas is optional at
// Medium and High (the box crowd stays until it arrives, or if it fails).
const OPTIONAL = { medium: ['crowd', 'players'], high: ['crowd', 'players'] };
export function ensureTierAssets(tier, onReady) {
  if (tier === 'low') return true;
  if (!packsOff && !tierState.optional) {
    tierState.optional = true;
    requirePacks(OPTIONAL[tier]).then(() => { if (onReady) onReady(true); });
  }
  if (tier === 'medium') { tierState.ready.medium = true; return true; }
  if (tierState.ready.high) return true;
  if (packsOff || tierState.failed) return false;
  if (!tierState.loading) {
    tierState.loading = true;
    requirePacks(['three-hi']).then((r) => { tierState.loading = false; tierState.ready.high = r.ok; tierState.failed = !r.ok; if (onReady) onReady(r.ok); });
  }
  return false;
}

// Decide tier and detail for this frame (pinned by settings, or Auto). Returns true when either changed.
export function chooseTier(F3, settings, dt, now, onReady) {
  const want = settings.quality || 'auto';
  const pinnedDetail = settings.detail === 0 || settings.detail === 1 || settings.detail === 2 ? settings.detail : null;
  const prev = `${tierState.tier}:${tierState.detail}`;
  if (want !== tierState.want) { tierState.want = want; tierState.slow = 0; if (want !== 'auto') tierState.banned.clear(); }
  let target = want === 'auto' ? autoTarget(F3) : TIERS.includes(want) ? want : 'low';
  // until a tier's assets are ready, run the best one that is
  if (target === 'high' && !ensureTierAssets('high', onReady)) target = tierState.ready.high ? 'high' : 'medium';
  if (target === 'medium') ensureTierAssets('medium', onReady); // re-apply when the optional packs arrive
  tierState.tier = target;
  if (pinnedDetail !== null) tierState.detail = pinnedDetail;
  else if (want !== 'auto') tierState.detail = 2;
  else if (dt > 0 && dt <= 0.2) {
    // only judge continuous animation (not the first frame after an idle gap)
    tierState.slow = dt > 1 / 36 ? tierState.slow + dt : Math.max(0, tierState.slow - dt * 0.5);
    if (tierState.slow > 2.5 && now - tierState.last > 4000) {
      tierState.slow = 0; tierState.last = now;
      if (tierState.tier !== 'low') { tierState.banned.add(tierState.tier); if (tierState.tier === 'high') tierState.banned.add('high'); }
      else if (tierState.detail > 0) tierState.detail--;
    }
  }
  if (want === 'auto' && tierState.banned.has(tierState.tier)) tierState.tier = tierState.tier === 'high' && !tierState.banned.has('medium') ? 'medium' : 'low';
  const changed = `${tierState.tier}:${tierState.detail}` !== prev;
  if (changed) tierState.changed++;
  return changed;
}
