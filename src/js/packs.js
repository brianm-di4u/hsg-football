// Optional asset packs (assets/pack-*.js). Each is a classic script that registers itself on globalThis.FNSC_PACKS,
// which works under file:// where fetch() and module imports of local files do not. Low quality never asks for a
// pack, so index.html stays fully playable on its own; `?packs=0` forces every pack off for tests.
import { PACKS } from './packs-manifest.js';

const state = {}; // name -> 'absent' | 'loading' | 'ready' | 'failed' | 'stale'
const waits = {};
export const packsOff = typeof location !== 'undefined' && /[?&]packs=0\b/.test(location.search);

export const packState = (name) => state[name] || 'absent';
export const packInfo = () => Object.fromEntries(Object.keys(PACKS).map((n) => [n, packState(n)]));
export const packData = (name) => (state[name] === 'ready' ? globalThis.FNSC_PACKS[name].data : null);
export const anyLoading = () => Object.values(state).includes('loading');

function load(name) {
  if (waits[name]) return waits[name];
  const p = PACKS[name];
  if (!p || packsOff) { state[name] = 'failed'; return (waits[name] = Promise.resolve(false)); }
  const have = globalThis.FNSC_PACKS && globalThis.FNSC_PACKS[name];
  if (have) { state[name] = have.hash === p.hash ? 'ready' : 'stale'; return (waits[name] = Promise.resolve(state[name] === 'ready')); }
  state[name] = 'loading';
  waits[name] = Promise.all((p.deps || []).map(load)).then((deps) => new Promise((resolve) => {
    if (deps.includes(false)) { state[name] = 'failed'; resolve(false); return; }
    const s = document.createElement('script');
    s.src = p.file;
    s.async = false;
    s.onload = () => {
      const got = globalThis.FNSC_PACKS && globalThis.FNSC_PACKS[name];
      state[name] = !got ? 'failed' : got.hash === p.hash ? 'ready' : 'stale';
      resolve(state[name] === 'ready');
    };
    s.onerror = () => { state[name] = 'failed'; resolve(false); };
    document.head.appendChild(s);
  }));
  return waits[name];
}

// Resolves to { ok, missing } once every named pack (and its deps) has loaded or failed.
export async function requirePacks(names) {
  const res = await Promise.all(names.map(load));
  const missing = names.filter((n, i) => !res[i]);
  return { ok: missing.length === 0, missing };
}

// Drop a pack's big strings once their contents are on the GPU (keeps the JS heap down).
export function releasePack(name, keys) {
  const p = globalThis.FNSC_PACKS && globalThis.FNSC_PACKS[name];
  if (p && p.data) for (const k of keys) delete p.data[k];
}

export function b64ToBuffer(b64) {
  const bin = atob(b64), out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out.buffer;
}
