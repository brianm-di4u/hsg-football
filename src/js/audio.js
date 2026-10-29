// WebAudio synthesis only. The context is created on the first user gesture; everything is short and quiet.
let ac = null, master = null, noiseBuf = null;
export const audio = { on: true, volume: 0.6 };

export function initAudio() {
  if (ac) return true;
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    ac = new AC();
    master = ac.createGain(); master.gain.value = audio.volume * 0.5; master.connect(ac.destination);
    noiseBuf = ac.createBuffer(1, ac.sampleRate, ac.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return true;
  } catch (e) { ac = null; return false; }
}
export const audioReady = () => !!ac;
export function setVolume(v) { audio.volume = v; if (master) master.gain.value = v * 0.5; }

function tone(type, f0, f1, dur, gain = 0.3, t0 = 0) {
  const t = ac.currentTime + t0, o = ac.createOscillator(), g = ac.createGain();
  o.type = type; o.frequency.setValueAtTime(f0, t); if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(gain, t + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g); g.connect(master); o.start(t); o.stop(t + dur + 0.05);
  return o;
}
function noise(dur, gain, f = 1200, q = 0.8, t0 = 0, attack = 0.01) {
  const t = ac.currentTime + t0, s = ac.createBufferSource(), bp = ac.createBiquadFilter(), g = ac.createGain();
  s.buffer = noiseBuf; bp.type = 'bandpass'; bp.frequency.value = f; bp.Q.value = q;
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(gain, t + attack); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  s.connect(bp); bp.connect(g); g.connect(master); s.start(t); s.stop(t + dur + 0.05);
}

const SOUNDS = {
  click: () => tone('triangle', 660, 660, 0.05, 0.12),
  hike: () => { noise(0.12, 0.25, 900, 1.2); tone('square', 180, 140, 0.08, 0.06); },
  whistle: () => { const o = tone('sine', 2650, 2600, 0.35, 0.12); const lfo = ac.createOscillator(), lg = ac.createGain(); lfo.frequency.value = 30; lg.gain.value = 60; lfo.connect(lg); lg.connect(o.frequency); lfo.start(); lfo.stop(ac.currentTime + 0.4); },
  hit: () => { tone('sine', 120, 50, 0.16, 0.45); noise(0.08, 0.3, 500, 0.7); },
  kick: () => { tone('sine', 90, 40, 0.12, 0.5); noise(0.05, 0.25, 2000, 1); },
  catch: () => noise(0.05, 0.2, 1500, 2),
  crowd: () => noise(1.4, 0.18, 700, 0.4, 0, 0.35),
  groan: () => { noise(0.9, 0.12, 400, 0.5, 0, 0.2); tone('sawtooth', 220, 150, 0.6, 0.03); },
  horn: () => { tone('sawtooth', 233, 233, 0.7, 0.08); tone('sawtooth', 311, 311, 0.7, 0.06); },
  band: () => { [0, 4, 7, 12].forEach((s, i) => { tone('sawtooth', 233 * 2 ** (s / 12), 233 * 2 ** (s / 12), 0.22, 0.07, i * 0.11); tone('square', 116.5 * 2 ** (s / 12), 116.5 * 2 ** (s / 12), 0.2, 0.03, i * 0.11); }); tone('sawtooth', 466, 466, 0.5, 0.08, 0.45); SOUNDS.crowd(); },
  good: () => { tone('triangle', 523, 523, 0.12, 0.12); tone('triangle', 784, 784, 0.2, 0.12, 0.1); },
  bad: () => tone('triangle', 300, 200, 0.25, 0.1),
};

export function sfx(name) {
  if (!audio.on || !ac || !SOUNDS[name]) return;
  try { if (ac.state === 'suspended') ac.resume(); SOUNDS[name](); } catch (e) { /* audio is optional */ }
}
