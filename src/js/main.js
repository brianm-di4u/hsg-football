// Friday Night Spa City: state, loop, input, save/load, flow between screens, and window.__game.
import { makeRng } from './rng.js';
import { ALL, REAL, teamDef, contrast, onColor, FACT_LIST as FACTS } from './data.js';
import * as R from './rules.js';
import * as AI from './ai.js';
import * as L from './league.js';
import { TICK, canThrow } from './sim.js';
import { PLAYS, DEFS, SLOTS, playById } from './plays.js';
import { view, resize, render, renderOverlay, proj, fieldToScreen, cameraTarget, stepCamera, receiverTargets, badgeSpots, screenToField, agentAbs, ballAbs, kickDur, needleAt } from './field.js';
import { F3, init3d, render3d, recordTick, clearFx3d, stepCamera3d, cameraSettled3d, project3d, fx3d, shake3d, snap3d, info3d, profile3d, bbox3d, rigProbe3d, camLook3d, tierBusy, headScreen3d, canReplay, startReplay, stopReplay, replayDone, webglAvailable } from './field3d.js';
import { mascotSprite, drawBackdrop, drawSplit, drawCup, makeConfetti, drawConfetti, clearArtCache } from './art.js';
import { initAudio, sfx, audio, setVolume } from './audio.js';
import * as UI from './ui.js';

const SAVE_KEY = 'hsg.football.v1';
const DEFAULTS = { sound: true, volume: 0.6, motion: 'auto', theme: 'night', textScale: 1, quarterMin: 4, difficulty: 'varsity',
  autoQB: true, autoKick: false, autoContinue: true, playSpeed: 1, routes: true, graphics: 'auto', weather: 'auto', quality: 'auto' };

let rng = makeRng((Date.now() ^ 0x9e3779b9) >>> 0);
const S = {
  scene: 'title', settings: { ...DEFAULTS }, game: null, season: null, challenges: {}, overlay: null,
  exhib: { you: 'hot-springs', opp: 'lakeside', home: true, step: 'you' }, seasonPick: { team: 'hot-springs', short: false },
  ui: { tab: 'schedule', helpTab: 'basics', resultT: 9, preT: 0, aiKickT: -1, confT: 0, weekRecap: '' },
  fx: [], perf: { upd: 0, draw: 0 }, reduced: false, saveOk: true, hasSave: false, helpFromGame: false, factCard: null, paused: false, frozen: null,
};
const inp = { keys: new Set(), drag: null, juke: false, throwSlot: null };
const $ = (id) => document.getElementById(id);
let els = {};

// ------------------------------------------------------------------ storage
function storage() { try { const ls = window.localStorage; return ls || null; } catch (e) { return null; } }
function save() {
  const ls = storage();
  if (!ls) { S.saveOk = false; return false; }
  try {
    const game = S.game && !['final'].includes(S.game.phase) && S.scene === 'game' ? { ...S.game, play: S.game.phase === 'pre' || S.game.phase === 'live' ? null : S.game.play } : null;
    if (game && (game.phase === 'pre' || game.phase === 'live')) { game.phase = 'call'; game.offCall = null; game.defCall = null; game.aiOff = null; }
    // Keep what's already saved unless this session replaced or finished it.
    let prev = null;
    try { prev = JSON.parse(ls.getItem(SAVE_KEY) || 'null'); } catch (e) { prev = null; }
    const keepGame = !game && !S.dropGame && prev && prev.game ? prev.game : game;
    const keepSeason = S.season || (S.dropSeason ? null : prev && prev.season) || null;
    ls.setItem(SAVE_KEY, JSON.stringify({ v: 1, settings: S.settings, season: keepSeason, game: keepGame, challenges: S.challenges, exhib: S.exhib, rng: rng.s }));
    S.saveOk = true;
    return true;
  } catch (e) { S.saveOk = false; return false; }
}
function load() {
  const ls = storage();
  if (!ls) { S.saveOk = false; return null; }
  try {
    const raw = ls.getItem(SAVE_KEY);
    if (!raw) return null;
    const d = JSON.parse(raw);
    if (!d || d.v !== 1) return null;
    return d;
  } catch (e) { S.saveOk = false; return null; }
}

// ------------------------------------------------------------------ settings
function applySettings() {
  const st = S.settings;
  const mq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
  S.reduced = st.motion === 'reduced' || (st.motion === 'auto' && mq);
  document.documentElement.dataset.theme = st.theme === 'day' ? 'light' : 'dark';
  document.documentElement.dataset.motion = S.reduced ? 'reduced' : 'full';
  document.documentElement.style.setProperty('--ts', String(st.textScale));
  audio.on = !!st.sound;
  setVolume(st.volume);
}

// ------------------------------------------------------------------ rendering
let lastScreenKey = '', lastPanelKey = '';
function setHTML(el, html) { if (el._html !== html) { el.innerHTML = html; el._html = html; return true; } return false; }

function paintMascots(root) {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  for (const c of root.querySelectorAll('canvas.mascot[data-team]')) {
    const size = parseInt(c.getAttribute('width'), 10);
    const px = Math.round(size * dpr);
    if (c.width !== px) { c.width = px; c.height = px; }
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, px, px);
    ctx.drawImage(mascotSprite(c.dataset.team, px), 0, 0, px, px);
  }
}

function renderAll() {
  const inGame = S.scene === 'game';
  els.game.hidden = !inGame;
  const showScreen = !inGame || !!S.overlay;
  els.screen.hidden = !showScreen;
  els.screen.classList.toggle('overlay', inGame && !!S.overlay);
  let html;
  if (inGame) html = S.overlay === 'help' ? UI.screenHTML({ ...S, scene: 'help' }) : S.overlay === 'settings' ? UI.screenHTML({ ...S, scene: 'settings' }) : UI.overlayHTML(S);
  else html = UI.screenHTML(S);
  const changedScreen = setHTML(els.screen, html);
  if (changedScreen) paintMascots(els.screen);
  const key = `${S.scene}:${S.overlay}:${S.ui.tab}:${S.ui.helpTab}:${S.exhib.step}`;
  const lost = !document.activeElement || document.activeElement === document.body || !document.activeElement.isConnected;
  if (showScreen && (key !== lastScreenKey || changedScreen && lost)) {
    lastScreenKey = key;
    const f = els.screen.querySelector('[data-autofocus]');
    if (f) f.focus({ preventScroll: true });
    if (!inGame) els.screen.scrollTop = 0;
  }
  if (!showScreen) lastScreenKey = '';
  if (inGame && S.game) {
    S.ui.canReplay = use3d() && S.game.phase === 'result' && canReplay();
    if (setHTML(els.scorebug, UI.scorebugHTML(S))) paintMascots(els.scorebug);
    const ph = UI.panelHTML(S);
    // desktop: a slimmer panel while it holds little (kicks, live play, a touchdown, a replay), so the field takes the width (loops 10-11)
    const g0 = S.game, slim = ['kickoff', 'kickfly', 'kick', 'live'].includes(g0.phase) || (g0.phase === 'result' && (S.ui.replaying || (g0.lastResult && g0.lastResult.kind === 'td')));
    const slimChanged = els.game.classList.contains('slim') !== !!slim;
    if (slimChanged) els.game.classList.toggle('slim', !!slim);
    if (setHTML(els.panel, ph) || slimChanged || panelFitDirty) { panelFitDirty = false; fitPanel(); } // layout reads only when it changed
    const pk = `${S.game.phase}:${S.game.poss}:${S.game.down}:${S.game.plays}`;
    const lostP = !document.activeElement || document.activeElement === document.body || !document.activeElement.isConnected;
    if ((pk !== lastPanelKey || lostP) && !S.overlay) {
      lastPanelKey = pk;
      const f = els.panel.querySelector('[data-autofocus]');
      if (f && document.activeElement !== f && (!document.activeElement || document.activeElement === document.body || els.panel.contains(document.activeElement) || els.game.contains(document.activeElement))) f.focus({ preventScroll: true });
    }
    renderToast();
    resize(els.field);
    if (!running) drawField(performance.now()); // the running loop draws this frame anyway (one 3D render per frame)
    wake();
  }
  drawBackground();
  if (S.scene === 'pregame') drawSplash();
  if (S.scene === 'champion') drawChampion(performance.now());
}

function replayAct(at, fromEnd) {
  const g = S.game;
  if (!g || g.phase !== 'result' || !use3d()) return false;
  if (!startReplay(performance.now())) return false;
  // negative (or fromEnd): seconds relative to the end, up to the 0.8 s the replay holds after the whistle
  if (at !== undefined && at !== null) F3.replay.frozen = at < 0 || fromEnd ? Math.min(F3.replay.dur + 0.8, Math.max(0, F3.replay.dur + at)) : at;
  S.ui.replaying = true;
  renderToast(); renderAll(); wake();
  return true;
}

function renderToast() {
  const g = S.game;
  const show = g && g.phase === 'result' && g.lastResult && !F3.replay;
  let style = '';
  if (show && g.lastResult.kind === 'td') { // the scoring school's colors
    const c = teamDef(g.teams[g.tryFor ?? g.poss].id).colors;
    style = ` style="--td1:${c.primary};--td2:${contrast(c.secondary, c.primary) >= 3 ? c.secondary : onColor(c.primary)}"`;
  }
  const html = show ? `<div class="toast-in k-${g.lastResult.kind}"${style}><b>${g.lastResult.text}</b><span>${g.lastResult.sub || ''}</span></div>` : '';
  setHTML(els.toast, html);
  els.toast.className = show && g.lastResult.kind !== 'td' ? 'low' : '';
}

// 3D stadium view (WebGL) with a 2D overlay canvas on top, or the classic 2D field as the fallback.
const use3d = () => F3.on && !S.force2d && S.settings.graphics !== '2d';
function drawField(now) {
  const ctx = els.field.getContext('2d');
  if (!F3.on && !F3.err && !S.force2d && S.settings.graphics !== '2d' && webglAvailable()) { init3d(els.field3d); S.ui.has3d = F3.on; }
  const on3d = use3d();
  if (els.field3d.hidden === on3d) { els.field3d.hidden = !on3d; els.field.classList.toggle('overlay2d', on3d); els.field.parentElement.classList.toggle('v3d', on3d); snap3d(); }
  proj.fn = on3d ? project3d : null;
  proj.head = on3d ? headScreen3d : null;
  if (on3d) {
    const anim = render3d(S.game, S, now);
    renderOverlay(ctx, S.game, S, now, { replay: !!F3.replay, replayPlay: F3.replay && F3.rec ? F3.rec.P : null, replayUser: F3.replay && F3.lastFrame ? F3.lastFrame.user : -1 });
    return anim;
  }
  render(ctx, S.game, S, now);
  return false;
}

function drawBackground() {
  const c = els.bg;
  if (S.scene === 'game' && !S.overlay) return;
  const w = window.innerWidth, h = window.innerHeight, dpr = Math.min(2, window.devicePixelRatio || 1);
  const key = `${w}:${h}:${dpr}:${S.scene}:${S.settings.theme}:${S.season ? S.season.userTeam : ''}`;
  if (c._key === key) return;
  c._key = key;
  c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
  const ctx = c.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  let kind = 'skyline', colors = ['#D4AF37', '#1F4E9C'];
  if (S.scene === 'season' && S.season) { const t = teamDef(S.season.userTeam); kind = t.backdrop; colors = [t.colors.primary, t.colors.secondary]; }
  drawBackdrop(ctx, w, h, { theme: S.settings.theme, kind, colors });
}

function drawSplash() {
  const c = $('splash');
  if (!c || !S.game) return;
  const r = c.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
  if (r.width < 2 || r.height < 2) return; // hidden behind the painted title art
  c.width = Math.round(r.width * dpr); c.height = Math.round(r.height * dpr);
  const ctx = c.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const g = S.game, home = teamDef(g.teams[g.home].id);
  const colors = [teamDef(g.teams[0].id).colors.primary, teamDef(g.teams[1].id).colors.primary];
  drawBackdrop(ctx, r.width, r.height, { theme: S.settings.theme, kind: g.neutral ? 'skyline' : home.backdrop, colors, lake: home.id === 'lakeside' });
  if (g.rivalry) { ctx.globalAlpha = 0.35; drawSplit(ctx, r.width, r.height * 0.5, g.teams[0].id, g.teams[1].id); ctx.globalAlpha = 1; }
}

let confetti = null, trophyImg = null;
// painted trophy (assets/trophy.webp); the vector cup is the fallback
function loadTrophy() {
  if (/[?&]art=0/.test(location.search)) return;
  const im = new Image(); im.src = 'assets/trophy.webp';
  S.ui.transT = (S.ui.transT || 0) + 1;
  im.decode().then(() => { trophyImg = im; }).catch(() => {}).finally(() => { S.ui.transT = Math.max(0, S.ui.transT - 1); if (S.scene === 'champion') drawChampion(performance.now()); });
}
function drawChampion(now) {
  const c = $('cup');
  if (!c || !S.season) return;
  const r = c.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
  if (c.width !== Math.round(r.width * dpr)) { c.width = Math.round(r.width * dpr); c.height = Math.round(r.height * dpr); }
  const ctx = c.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const t = teamDef(S.season.champion);
  if (S.titleArt) { // the painted stadium shows through (CSS); a glow in the champion's colors behind the cup
    ctx.clearRect(0, 0, r.width, r.height);
    const gl = ctx.createRadialGradient(r.width / 2, r.height * 0.4, 0, r.width / 2, r.height * 0.4, Math.max(r.width, r.height) * 0.5);
    gl.addColorStop(0, t.colors.primary + 'AA'); gl.addColorStop(1, t.colors.primary + '00');
    ctx.fillStyle = gl; ctx.fillRect(0, 0, r.width, r.height);
  } else drawBackdrop(ctx, r.width, r.height, { theme: S.settings.theme, kind: t.backdrop, colors: [t.colors.primary, t.colors.secondary] });
  const s = Math.min(r.width * 0.35, r.height * 0.42);
  if (trophyImg) { const h = Math.min(r.height * 0.6, r.width * 0.9), w = h * trophyImg.width / trophyImg.height; ctx.drawImage(trophyImg, r.width / 2 - w / 2, r.height * 0.06, w, h); }
  else drawCup(ctx, r.width / 2, r.height * 0.62, s);
  if (!confetti) confetti = makeConfetti(120, r.width, [t.colors.primary, t.colors.secondary, '#D4AF37', '#F4EFE6'], 7);
  const ct = S.frozen !== null ? S.frozen / 1000 : S.reduced ? 1.6 : S.ui.confT;
  drawConfetti(ctx, confetti, Math.min(ct, 6));
}

// ------------------------------------------------------------------ loop
let running = false, last = 0, acc = 0;
function wake() { if (!running) { running = true; last = performance.now(); requestAnimationFrame(frame); } }
function frame(now) {
  const dt = Math.min(0.25, (now - last) / 1000); last = now;
  const t0 = performance.now();
  const busy = update(dt, now);
  const t1 = performance.now();
  let anim = false;
  if (S.scene === 'game' && S.game) anim = drawField(now);
  const t2 = performance.now(); // frame cost profile (EMA, ms), reported by getState().perf
  S.perf.upd = S.perf.upd * 0.95 + (t1 - t0) * 0.05; S.perf.draw = S.perf.draw * 0.95 + (t2 - t1) * 0.05;
  if (S.scene === 'champion') drawChampion(now);
  if (busy || anim && !S.overlay) requestAnimationFrame(frame); else running = false;
}

function liveInput(g) {
  const P = g.play, dir = P.offTeam === 0 ? 1 : -1;
  let ix = 0, iy = 0;
  const k = inp.keys;
  if (k.has('ArrowLeft') || k.has('a')) ix -= 1;
  if (k.has('ArrowRight') || k.has('d')) ix += 1;
  if (k.has('ArrowUp') || k.has('w')) iy += 1;
  if (k.has('ArrowDown') || k.has('s')) iy -= 1;
  if (inp.drag && inp.drag.active) { ix = inp.drag.dx; iy = inp.drag.dy; }
  if (S.steer) { ix = S.steer[0]; iy = S.steer[1]; }
  const o = { sx: dir * ix, sy: dir * iy, juke: inp.juke, throwSlot: inp.throwSlot };
  inp.juke = false; inp.throwSlot = null;
  return o;
}

function drainEvents(g) {
  const P = g.play;
  if (!P) return;
  for (const e of P.ev.splice(0)) {
    if (e.k === 'hike') sfx('hike');
    else if (e.k === 'throw') sfx('click');
    else if (e.k === 'catch') { sfx('catch'); if (!S.reduced) S.slowUntil = performance.now() + 380; } // a beat of slow motion on the catch (loop 13)
    else if (e.k === 'int') sfx('groan');
    else if (e.k === 'dead') {
      sfx('whistle');
      if (['tackle', 'sack', 'fumbleLost', 'int', 'safety'].includes(e.kind) && P.result && P.result.x !== undefined) {
        const c = P.A[P.carrier];
        const [x, y] = agentAbs(P, c);
        S.fx.push({ kind: 'hit', x, y, t0: performance.now() });
        if (!S.reduced) fx3d('hit', x, y);
        sfx('hit');
        if ((e.kind === 'sack' || e.kind === 'fumbleLost') && !S.reduced) { view.shake = 4; shake3d(0.9); }
      }
    }
  }
}

function onResult() {
  const g = S.game, r = g.lastResult;
  S.ui.resultT = 0;
  if (!r) return;
  if (r.kind === 'td') {
    sfx('band');
    const scorer = g.tryFor ?? g.poss;
    const t = teamDef(g.teams[scorer].id);
    let x = 26.7, y = scorer === 0 ? 112 : 8;
    if (g.play && g.play.phase === 'dead') [x, y] = agentAbs(g.play, g.play.A[g.play.carrier]);
    if (!S.reduced) { S.fx.push({ kind: 'td', x, y, t0: performance.now(), c1: t.colors.primary, c2: t.colors.secondary }); fx3d('td', x, y, t.colors.primary, t.colors.secondary); }
  } else if (r.kind === 'score') sfx('good');
  else if (r.kind === 'miss') sfx('bad');
  else if (r.kind === 'turnover') sfx('groan');
  else if (r.kind === 'big') { sfx('crowd'); fx3d('big'); }
  save();
}

function update(dt, now) {
  let busy = false;
  const g = S.game;
  if (S.scene === 'champion') { S.ui.confT += dt; busy = !S.reduced && S.ui.confT < 6 && S.frozen === null; }
  if (S.scene !== 'game' || !g) return busy;
  if (S.overlay) return busy;
  const prevPhase = g.phase;
  if (g.phase === 'live') {
    busy = true;
    if (!S.paused) {
      const userOff = g.play && g.play.offTeam === g.user;
      const speed = S.settings.playSpeed * (userOff || g.play.intRet ? 1 : 1.5) * (performance.now() < (S.slowUntil || 0) ? 0.35 : 1);
      acc += dt * speed;
      let n = Math.min(Math.floor(acc / TICK), 30);
      acc -= n * TICK;
      while (n-- > 0 && g.phase === 'live') { R.stepLive(g, rng, liveInput(g)); recordTick(g, S); drainEvents(g); }
      if (acc > TICK * 4) acc = 0;
    }
  } else if ((g.phase === 'kickoff' || g.phase === 'kickfly') && g.kickAnim) {
    busy = true;
    if (!S.paused && S.frozen === null) {
      if (g.kickAnim.t === 0) sfx('kick');
      g.kickAnim.t += dt * (S.reduced ? 2.5 : 1) * S.settings.playSpeed;
      if (g.kickAnim.t >= kickDur(g.kickAnim).total) finishAnim();
    }
  } else if (g.phase === 'kick' && g.kick) {
    if (S.frozen === null) g.kick.t += dt;
    if (S.ui.aiKickT >= 0) {
      busy = true;
      S.ui.aiKickT -= dt;
      if (S.ui.aiKickT < 0) { S.ui.aiKickT = -1; doKick(R.aiKickError(rng, g.kick.kck)); }
    } else if (g.kick && g.kick.user && !S.settings.autoKick && S.frozen === null) busy = true;
  } else if (g.phase === 'result' && F3.replay) {
    busy = true;
    if (replayDone()) { stopReplay(); S.ui.replaying = false; renderAll(); }
  } else if (g.phase === 'result') {
    S.ui.resultT += dt;
    if (S.ui.resultT < (S.reduced ? 0 : 0.3)) busy = true;
    else if (S.settings.autoContinue && !S.paused) { busy = true; if (S.ui.resultT >= (g.lastResult && g.lastResult.kind === 'td' ? 2.4 : 1.6)) cont(); }
  } else if (g.phase === 'pre' && g.user !== null && g.poss !== g.user && S.settings.autoContinue) {
    busy = true;
    S.ui.preT += dt;
    if (S.ui.preT > 0.9) hike();
  }
  if (use3d()) { if (stepCamera3d(g, S, dt, now)) busy = true; }
  else if (stepCamera(cameraTarget(g), dt, S.reduced)) busy = true;
  if (F3.replay && g.phase !== 'result') { stopReplay(); S.ui.replaying = false; }
  if (view.shake > 0) { view.shake = Math.max(0, view.shake - dt * 14); busy = true; }
  if (S.fx.length) { S.fx = S.fx.filter((f) => now - f.t0 < 1300); if (S.fx.length) busy = true; }
  if (g.phase !== prevPhase || g.phase === 'live') renderPanelOnly(prevPhase);
  return busy;
}

let lastLivePanel = 0;
function renderPanelOnly(prevPhase) {
  const g = S.game;
  if (g.phase === 'live' && prevPhase === 'live') {
    const now = performance.now();
    if (now - lastLivePanel < 100) return;
    lastLivePanel = now;
  }
  if (prevPhase === 'live' && g.phase !== 'live') onResultMaybe();
  renderAll();
}
function onResultMaybe() { if (S.game.phase === 'result') onResult(); else flow(); }

function finishAnim() {
  const g = S.game;
  if (g.phase === 'kickfly') R.finishKick(g, rng);
  else if (g.pendingPunt) R.finishPunt(g);
  else R.finishKickoff(g, rng);
  sfx('whistle');
  if (g.phase === 'result') onResult();
  flow();
  renderAll();
}

// After any state change: let the AI take its automatic steps.
function flow() {
  const g = S.game;
  if (!g || S.scene !== 'game') return;
  for (let guard = 0; guard < 8; guard++) {
    if (g.phase === 'call' && g.user !== null && g.poss !== g.user && !g.aiOff) {
      g.aiOff = AI.offenseCall(g, rng);
      if (['punt', 'fg', 'kneel'].includes(g.aiOff)) { const o = g.aiOff; g.aiOff = null; R.callPlay(g, o, 'base', rng); if (g.phase === 'result') onResult(); continue; }
    }
    if (g.phase === 'pat' && g.tryFor !== g.user) { R.chooseTry(g, AI.patChoice(g)); continue; }
    if (g.phase === 'call' && g.twoPoint && g.poss !== g.user && !g.aiOff) continue;
    break;
  }
  if (g.phase === 'kick') { S.fx = []; clearFx3d(); }
  if (g.phase === 'kick' && g.kick && (!g.kick.user || S.settings.autoKick) && S.ui.aiKickT < 0) S.ui.aiKickT = 0.7;
  if (g.phase === 'break') { S.overlay = 'break'; if (g.breakKind === 'half') pickFact(); sfx('horn'); }
  if (g.phase === 'otStart') { S.overlay = 'ot'; sfx('horn'); }
  if (g.phase === 'final') { onFinal(); return; }
  if (g.phase === 'pre') S.ui.preT = 0;
  wake();
}

function pickFact() {
  const g = S.game;
  const ids = [g.teams[0].id, g.teams[1].id];
  const pool = FACTS.filter((f) => f.teams.some((t) => ids.includes(t)));
  S.factCard = rng.pick(pool.length ? pool : FACTS);
  g.halftimeFact = S.factCard.id;
}

// ------------------------------------------------------------------ actions
function callOffense(id) {
  const g = S.game;
  if (!g || g.phase !== 'call' || g.poss !== g.user) return false;
  if (['punt', 'fg', 'kneel'].includes(id) && !R.specialsFor(g).includes(id)) return false;
  const def = AI.defenseCall(g, rng);
  const ok = R.callPlay(g, id, def, rng, { autoQB: S.settings.autoQB });
  sfx('click');
  if (g.phase === 'result') onResult();
  flow(); renderAll();
  return ok;
}
function callDefense(id) {
  const g = S.game;
  if (!g || g.phase !== 'call' || g.poss === g.user) return false;
  const off = g.aiOff || AI.offenseCall(g, rng);
  g.aiOff = null;
  const ok = R.callPlay(g, off, id, rng);
  sfx('click');
  if (g.phase === 'result') onResult();
  flow(); renderAll();
  return ok;
}
function hike() {
  const g = S.game;
  if (!g || g.phase !== 'pre') return false;
  acc = 0;
  R.snapPlay(g);
  renderAll(); wake();
  return true;
}
function changePlay() {
  const g = S.game;
  if (!g || g.phase !== 'pre' || g.poss !== g.user) return false;
  if (g.tend) g.tend[playById(g.offCall).type === 'run' ? 'run' : 'pass']--;
  g.phase = 'call'; g.play = null; g.offCall = null;
  renderAll();
  return true;
}
function doKick(e) {
  const g = S.game;
  if (!g || g.phase !== 'kick') return null;
  const r = R.resolveKick(g, e, rng);
  sfx('kick');
  renderAll(); wake();
  return r;
}
function kickPress() {
  const g = S.game;
  if (!g || g.phase !== 'kick' || !g.kick || !g.kick.user || S.settings.autoKick) return null;
  return doKick(g.kick.frozen !== undefined ? g.kick.frozen : needleAt(g.kick.t));
}
function cont() {
  const g = S.game;
  if (!g) return;
  if (S.overlay === 'break' || S.overlay === 'ot') { S.overlay = null; R.advance(g, rng); flow(); renderAll(); return; }
  if (g.phase === 'result') { R.advance(g, rng); if (g.phase === 'result') onResult(); flow(); renderAll(); }
}
function skipAnim() {
  const g = S.game;
  if (g && (g.phase === 'kickoff' || g.phase === 'kickfly') && g.kickAnim) { g.kickAnim.t = 99; finishAnim(); }
}
function timeout() {
  const g = S.game;
  if (g && R.useTimeout(g, g.user)) { sfx('whistle'); renderAll(); return true; }
  return false;
}

function newSeed() { return (Math.random() * 2 ** 32) >>> 0; }

function startGame(cfg) {
  const g = R.createGame({ quarterMin: S.settings.quarterMin, difficulty: S.settings.difficulty, ...cfg }, rng);
  S.game = g; S.overlay = null; S.fx = []; S.factCard = null; S.dropGame = false;
  view.camY = cameraTarget(g); snap3d();
  if (g.phase === 'toss') go('pregame'); else { go('game'); flow(); drawField(performance.now()); } // build the stadium now
  return g;
}

function startExhibition() {
  const x = S.exhib;
  if (x.you === x.opp) return null;
  return startGame({ mode: 'exhibition', teamA: x.you, teamB: x.opp, home: x.home ? 0 : 1, user: 0, year: 2026, rivalry: !!L.RIVAL_OPENER.includes(x.you) && L.RIVAL_OPENER.includes(x.opp) || L.RIVAL_FINALE.includes(x.you) && L.RIVAL_FINALE.includes(x.opp) });
}

function startChallenge(key) {
  const [id, side] = key.split(':');
  const x = S.exhib;
  if (id === 'rivalry') {
    const you = side || 'lakeside', opp = you === 'lakeside' ? 'lake-hamilton' : 'lakeside';
    const g = startGame({ mode: 'exhibition', teamA: you, teamB: opp, home: you === 'lake-hamilton' ? 0 : 1, user: 0, rivalry: true, challenge: { id, key } });
    return g;
  }
  const opp = x.opp === x.you ? ALL.find((t) => t.id !== x.you).id : x.opp;
  const g = R.createGame({ mode: 'exhibition', teamA: x.you, teamB: opp, home: 0, user: 0, quarterMin: S.settings.quarterMin, difficulty: S.settings.difficulty, skipToss: true, challenge: { id, key } }, rng);
  g.kickAnim = null;
  if (id === 'twoMinute') Object.assign(g, { quarter: 4, clock: 120, score: [17, 21], qScores: [[7, 3, 0, 7], [7, 7, 0, 7]], poss: 0, ballOn: 30, down: 1, toGo: 10, timeouts: [2, 3], phase: 'call', openingReceiver: 1 });
  if (id === 'goalLine') Object.assign(g, { quarter: 4, clock: 70, score: [24, 21], qScores: [[7, 10, 0, 7], [7, 7, 7, 0]], poss: 1, ballOn: 92, down: 1, toGo: 8, timeouts: [3, 2], phase: 'call', openingReceiver: 0 });
  S.game = g; S.overlay = null; S.fx = []; S.dropGame = false;
  view.camY = cameraTarget(g);
  go('game'); flow();
  return g;
}

function startSeason() {
  S.season = L.createSeason(S.seasonPick.team, 2026, S.seasonPick.short);
  S.game = null; S.dropGame = true; // a new season replaces any unfinished exhibition
  S.ui.tab = 'schedule'; S.ui.weekRecap = '';
  go('season'); save();
}

function startSeasonGame() {
  const s = S.season, ug = s && L.userGame(s);
  if (!ug || ug.result) return null;
  const userHome = ug.home === s.userTeam, opp = userHome ? ug.away : ug.home;
  const g = startGame({ mode: 'season', teamA: s.userTeam, teamB: opp, home: ug.neutral ? null : userHome ? 0 : 1, user: 0, year: s.year,
    rosters: s.rosters, seasonWeek: s.phase === 'regular' ? s.week : null, rivalry: !!ug.rivalry });
  g.final = !!ug.final; g.semi = !!ug.semi;
  return g;
}

function recapLine(s, idxBefore) {
  const games = idxBefore;
  const mine = games.find((g) => g.home === s.userTeam || g.away === s.userTeam);
  const parts = [];
  if (mine && mine.result) {
    const home = mine.home === s.userTeam, my = home ? mine.result.hs : mine.result.as, th = home ? mine.result.as : mine.result.hs;
    parts.push(`<b>${my > th ? 'Win' : 'Loss'}</b> ${my}–${th} ${home ? 'vs' : 'at'} ${teamDef(home ? mine.away : mine.home).short}.`);
  }
  const others = games.filter((g) => g !== mine && g.result).map((g) => `${teamDef(g.home).abbr} ${g.result.hs}–${g.result.as} ${teamDef(g.away).abbr}`);
  if (others.length) parts.push(`Around the league: ${others.join(' · ')}`);
  return parts.join(' ');
}

function finishSeasonRound() {
  const s = S.season;
  const games = L.currentGames(s);
  L.simRound(s, rng, false);
  S.ui.weekRecap = recapLine(s, games);
  L.advanceRound(s);
  // If the user is out of the playoffs, the hub offers "Sim to the end".
}

function onFinal() {
  const g = S.game;
  S.dropGame = true;
  sfx('horn');
  if (g.challenge && g.score[0] > g.score[1]) S.challenges[g.challenge.id] = true;
  if (g.mode === 'season' && S.season && !g.recorded) {
    const s = S.season, ug = L.userGame(s);
    if (ug && !ug.result) {
      const userHome = ug.home === s.userTeam;
      ug.result = { hs: userHome ? g.score[0] : g.score[1], as: userHome ? g.score[1] : g.score[0], ot: g.quarter > 4 };
      for (const id in g.stats.players) {
        const p = g.stats.players[id];
        if (p.side !== 0) continue;
        const L2 = s.leaders[id] || (s.leaders[id] = { name: p.name, pos: p.pos, py: 0, ry: 0, recy: 0, td: 0, tkl: 0 });
        L2.py += p.py; L2.ry += p.ry; L2.recy += p.recy; L2.td += p.ptd + p.rtd + p.rectd; L2.tkl += p.tkl;
      }
    }
    g.recorded = true;
  }
  go('final');
  save();
}

function seasonContinue() {
  const s = S.season;
  if (!s) return go('title');
  finishSeasonRound();
  S.game = null;
  if (s.phase === 'done' && s.champion === s.userTeam) { confetti = null; S.ui.confT = 0; go('champion'); }
  else go('season');
  save();
}

function simWeek() {
  const s = S.season;
  if (!s) return;
  if (L.userGame(s) && !L.userGame(s).result) {
    const games = L.currentGames(s);
    L.simRound(s, rng, true);
    S.ui.weekRecap = recapLine(s, games);
    L.advanceRound(s);
  } else {
    // user eliminated: sim the remaining rounds
    let guard = 0;
    while (s.phase !== 'done' && !(L.userGame(s) && !L.userGame(s).result) && guard++ < 20) { const games = L.currentGames(s); L.simRound(s, rng, true); S.ui.weekRecap = recapLine(s, games); L.advanceRound(s); }
  }
  if (s.phase === 'done' && s.champion === s.userTeam) { confetti = null; S.ui.confT = 0; go('champion'); }
  else go('season');
  save();
}

function nextSeasonAct() {
  if (!S.season) return;
  S.season = L.nextSeason(S.season);
  S.ui.weekRecap = `${S.season.year} season: seniors graduated, returning players improved, and new sophomores joined.`;
  S.ui.tab = 'roster';
  go('season'); save();
}

function go(scene) {
  if (scene === 'game' && !S.game) scene = 'title';
  S.scene = scene;
  if (scene !== 'help' && scene !== 'settings') S.helpFromGame = false;
  if (scene === 'title') S.hasSave = hasSave();
  if (scene === 'season' && !S.season) S.scene = 'seasonSetup';
  if (scene === 'champion' && (!S.season || !S.season.champion)) S.scene = 'season';
  if (S.scene !== 'game') S.overlay = null;
  renderAll();
  if (S.scene === 'game' || S.scene === 'champion') wake();
  if (S.scene !== 'game' && S.scene !== 'final' && S.scene !== 'pregame') save();
  return S.scene;
}

function hasSave() { const d = load(); return !!(d && (d.game || d.season)); }

function continueSaved() {
  const d = load();
  if (!d) return go('title');
  if (d.season) S.season = d.season;
  if (d.game) {
    S.game = d.game; S.overlay = null;
    view.camY = cameraTarget(S.game);
    go('game'); flow();
    if (S.game.phase === 'result') S.ui.resultT = 9;
    renderAll();
    return 'game';
  }
  return go('season');
}

function setSetting(k, v) {
  const s = S.settings;
  if (k === 'quarterMin' || k === 'textScale' || k === 'playSpeed') v = Number(v);
  if (k === 'volume') v = Number(v) / 100;
  s[k] = v;
  applySettings();
  if (k === 'theme') { view.layerKey = ''; clearArtCache(); els.bg._key = ''; }
  if (k === 'graphics') S.force2d = false;
  if (k === 'graphics' && v !== '2d' && !F3.on && webglAvailable()) { init3d(els.field3d); S.ui.has3d = F3.on; }
  if (k === 'graphics' || k === 'weather' || k === 'theme' || k === 'quality') snap3d();
  if (S.game && k === 'difficulty') S.game.difficulty = v;
  save(); renderAll();
}

const ACTIONS = {
  go: (id) => go(id),
  continue: () => continueSaved(),
  pickTeam: (id) => { const x = S.exhib; if (x.step === 'opp') x.opp = id; else { x.you = id; if (x.opp === id) x.opp = ALL.find((t) => t.id !== id).id; x.step = 'opp'; } renderAll(); },
  exStep: (id) => { S.exhib.step = id; renderAll(); },
  exHome: (id) => { S.exhib.home = id === 'home'; renderAll(); },
  startExhibition: () => startExhibition(),
  pickSeason: (id) => { S.seasonPick.team = id; renderAll(); },
  seasonLen: (id) => { S.seasonPick.short = id === 'short'; renderAll(); },
  startSeason: () => startSeason(),
  tab: (id) => { S.ui.tab = id; renderAll(); },
  helpTab: (id) => { S.ui.helpTab = id; renderAll(); },
  playWeek: () => startSeasonGame(),
  simWeek: () => simWeek(),
  nextSeason: () => nextSeasonAct(),
  seasonContinue: () => seasonContinue(),
  challenge: (id) => startChallenge(id),
  coin: (id) => { R.coinToss(S.game, id, rng); sfx('click'); renderAll(); },
  kickoff: () => { const g = S.game; R.startKickoff(g, 1 - g.openingReceiver, rng); go('game'); flow(); },
  call: (id) => callOffense(id),
  defCall: (id) => callDefense(id),
  hike: () => hike(),
  changePlay: () => changePlay(),
  throw: (id) => { inp.throwSlot = id; wake(); },
  juke: () => { inp.juke = true; },
  kick: () => kickPress(),
  pat: (id) => { if (S.game && S.game.phase === 'pat' && S.game.tryFor === S.game.user) { R.chooseTry(S.game, id); sfx('click'); flow(); renderAll(); } },
  timeout: () => timeout(),
  cont: () => cont(),
  skipAnim: () => skipAnim(),
  pause: () => { if (S.scene === 'game') { S.overlay = 'pause'; renderAll(); } },
  replay: () => replayAct(),
  resume: () => { S.overlay = null; renderAll(); wake(); },
  overlay: (id) => { S.overlay = id; S.helpFromGame = true; renderAll(); },
  closeOverlay: () => { S.overlay = S.scene === 'game' ? 'pause' : null; S.helpFromGame = false; if (S.scene !== 'game') go('title'); else renderAll(); },
  quit: () => { save(); S.overlay = null; go('title'); },
  simRest: () => { const g = S.game; S.overlay = null; R.autoplay(g, rng, 6000); flow(); renderAll(); },
  rematch: () => { const g = S.game; startGame({ mode: 'exhibition', teamA: g.teams[0].id, teamB: g.teams[1].id, home: g.home, user: 0, rivalry: g.rivalry, challenge: g.challenge }); },
};
for (const k of Object.keys(DEFAULTS)) ACTIONS[`set:${k}`] = (v) => setSetting(k, v === 'true' ? true : v === 'false' ? false : v);

function onClick(e) {
  const b = e.target.closest('[data-act]');
  if (!b || b.disabled) return;
  initAudio();
  const fn = ACTIONS[b.dataset.act];
  if (fn) { e.preventDefault(); fn(b.dataset.id); }
}
function onChange(e) {
  const t = e.target;
  if (!t.dataset || !t.dataset.set) return;
  setSetting(t.dataset.set, t.type === 'checkbox' ? t.checked : t.value);
}

// ------------------------------------------------------------------ keyboard
const STEER_KEYS = new Set(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'a', 'd', 'w', 's']);
function onKeyDown(e) {
  initAudio();
  const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  if (k === 'm' && !e.ctrlKey && !e.metaKey) { setSetting('sound', !S.settings.sound); return; }
  if (S.scene !== 'game') {
    if (k === 'Escape' && S.scene !== 'title') { e.preventDefault(); go(S.scene === 'season' || S.scene === 'final' ? 'title' : S.scene === 'pregame' ? 'title' : 'title'); }
    return;
  }
  const g = S.game;
  if (S.overlay) {
    if (k === 'Escape' || k === 'p') { e.preventDefault(); if (S.overlay === 'pause') ACTIONS.resume(); else if (S.overlay === 'help' || S.overlay === 'settings') ACTIONS.closeOverlay(); }
    else if ((k === ' ' || k === 'Enter') && (S.overlay === 'break' || S.overlay === 'ot') && !(e.target && e.target.closest && e.target.closest('button'))) { e.preventDefault(); cont(); }
    return;
  }
  if (k === 'Escape' || k === 'p') { e.preventDefault(); ACTIONS.pause(); return; }
  if (k === 't') { timeout(); return; }
  const onBtn = e.target && e.target.closest && e.target.closest('button');
  switch (g.phase) {
    case 'call': {
      if (g.poss === g.user) {
        const p = PLAYS.find((x) => String(x.key) === k);
        if (p) { e.preventDefault(); callOffense(p.id); return; }
        const sp = { p: 'punt', f: 'fg', k: 'kneel' }[k];
        if (sp) { e.preventDefault(); callOffense(sp); return; }
      } else {
        const d = DEFS.find((x) => String(x.key) === k);
        if (d) { e.preventDefault(); callDefense(d.id); return; }
      }
      if (STEER_KEYS.has(k) && k.startsWith('Arrow')) { e.preventDefault(); moveFocus(k === 'ArrowRight' || k === 'ArrowDown' ? 1 : -1); }
      return;
    }
    case 'pre':
      if (k === ' ' || k === 'Enter' && !onBtn) { e.preventDefault(); hike(); }
      else if (k === 'Backspace') { e.preventDefault(); changePlay(); }
      return;
    case 'live':
      if (STEER_KEYS.has(k)) { e.preventDefault(); inp.keys.add(k); return; }
      if (k === 'j' || k === 'Shift') { e.preventDefault(); inp.juke = true; return; }
      if (/^[1-5]$/.test(k)) { e.preventDefault(); inp.throwSlot = SLOTS[Number(k) - 1]; return; }
      if (k === ' ') e.preventDefault();
      return;
    case 'result':
      if (k === ' ' || k === 'Enter' && !onBtn) { e.preventDefault(); if (F3.replay) { stopReplay(); S.ui.replaying = false; } cont(); }
      else if (k === 'r') { e.preventDefault(); replayAct(); }
      return;
    case 'pat':
      if (k === '1') ACTIONS.pat('kick'); else if (k === '2') ACTIONS.pat('two');
      return;
    case 'kick':
      if (k === ' ' || k === 'Enter' && !onBtn) { e.preventDefault(); kickPress(); }
      return;
    case 'kickoff': case 'kickfly':
      if (k === ' ' || k === 'Enter' && !onBtn) { e.preventDefault(); skipAnim(); }
  }
}
function onKeyUp(e) { const k = e.key.length === 1 ? e.key.toLowerCase() : e.key; inp.keys.delete(k); }
function moveFocus(d) {
  const list = [...els.panel.querySelectorAll('button.card:not([disabled])')];
  if (!list.length) return;
  const i = list.indexOf(document.activeElement);
  list[(i + d + list.length) % list.length].focus();
}

// ------------------------------------------------------------------ pointer (field)
function onPointerDown(e) {
  S.ptr = (S.ptr || 0) + 1;
  initAudio();
  const g = S.game;
  if (!g || S.overlay) return;
  const r = els.field.getBoundingClientRect(), px = e.clientX - r.left, py = e.clientY - r.top;
  if (g.phase === 'kick') { kickPress(); return; }
  if (g.phase === 'result') { cont(); return; }
  if (g.phase !== 'live') return;
  // tap a receiver to throw
  if (g.play && canThrow(g.play) && g.play.offTeam === g.user) {
    let best = null, bd = Math.max(26, view.ppy * 2.2);
    for (const t of (use3d() ? badgeSpots(g) : receiverTargets(g))) { const d = Math.min(Math.hypot(t.x - px, t.y - py), t.bx === undefined ? 1e9 : Math.hypot(t.bx - px, t.by - py)); if (d < bd) { bd = d; best = t; } }
    if (best) { inp.throwSlot = best.slot; return; }
  }
  inp.drag = { x0: px, y0: py, dx: 0, dy: 0, active: false, id: e.pointerId };
  try { els.field.setPointerCapture(e.pointerId); } catch (err) { /* synthetic pointers */ }
}
// Loop 9 review (G-text-clipping): the play list's bottom fade only when the panel really scrolls, and a log never shows
// an entry cut by the panel's bottom edge (whole entries only; the panel's own controls are never hidden).
let panelFitDirty = true;
function fitPanel() {
  const p = els.panel;
  for (const li of p.querySelectorAll('.log li')) li.hidden = false;
  const bottom = p.getBoundingClientRect().bottom - parseFloat(getComputedStyle(p).paddingBottom || 0);
  const lis = [...p.querySelectorAll('.log li')];
  for (let i = lis.length - 1; i > 0 && lis[i].getBoundingClientRect().bottom > bottom + 1; i--) lis[i].hidden = true;
  p.classList.toggle('scrolls', p.scrollHeight > p.clientHeight + 1);
}
function onPointerMove(e) {
  S.ptrMove = (S.ptrMove || 0) + 1;
  const d = inp.drag;
  if (!d || d.id !== e.pointerId) return;
  const r = els.field.getBoundingClientRect(), px = e.clientX - r.left, py = e.clientY - r.top;
  const vx = px - d.x0, vy = d.y0 - py, m = Math.hypot(vx, vy);
  if (m > 12) { d.active = true; d.dx = vx / m; d.dy = vy / m; }
}
function onPointerUp(e) { if (inp.drag && inp.drag.id === e.pointerId) inp.drag = null; }

// ------------------------------------------------------------------ test hooks
function deepMerge(t, s) {
  for (const k in s) {
    const v = s[k];
    if (v && typeof v === 'object' && !Array.isArray(v) && t[k] && typeof t[k] === 'object' && !Array.isArray(t[k])) deepMerge(t[k], v);
    else t[k] = v;
  }
  return t;
}

function snapshot() {
  const g = S.game;
  let game = null;
  if (g) {
    const P = g.play;
    let live = null;
    if (P) {
      const c = P.A[P.carrier];
      const [bx, by] = ballAbs(P);
      live = { phase: P.phase, t: Math.round(P.t * 100) / 100, carrierSlot: c.slot, carrierSide: c.side, ballState: P.ball.st, ballX: bx, ballY: by, thrown: P.thrown, caught: !!P.caught,
        canThrow: canThrow(P), intRet: !!P.intRet, offId: P.offId, defId: P.defId, offTeam: P.offTeam, result: P.result,
        receivers: receiverTargets(g).map((r) => ({ slot: r.slot, x: Math.round(r.x), y: Math.round(r.y) })), agents: P.A.length,
        engaged: P.A.filter((a) => a.eng >= 0).length / 2 };
    }
    game = {
      mode: g.mode, teams: g.teams.map((t) => ({ id: t.id, abbr: teamDef(t.id).abbr, name: teamDef(t.id).name })), user: g.user, home: g.home, neutral: g.neutral,
      quarter: g.quarter, clock: g.clock, runoff: g.runoff, score: g.score, qScores: g.qScores, poss: g.poss, ballOn: g.ballOn, down: g.down, toGo: g.toGo, absX: g.absX,
      timeouts: g.timeouts, phase: g.phase, offCall: g.offCall, defCall: g.defCall, userOffense: g.user !== null && g.poss === g.user,
      live, lastResult: g.lastResult, next: g.next, log: g.log.slice(-5), ot: g.ot, challenge: g.challenge, twoPoint: !!g.twoPoint, tryFor: g.tryFor,
      kick: g.kick ? { kind: g.kick.kind, dist: g.kick.dist, user: g.kick.user } : null, kickAnim: g.kickAnim ? { kind: g.kickAnim.kind, t: g.kickAnim.t, kicking: g.kickAnim.kicking } : null, breakKind: g.breakKind || null,
      specials: g.phase === 'call' ? R.specialsFor(g) : [], venue: g.neutral ? 'a neutral site' : teamDef(g.teams[g.home].id).venue, rivalry: g.rivalry,
      halftimeFact: S.factCard ? { id: S.factCard.id, text: S.factCard.text, source: S.factCard.source } : null, toss: g.toss || null, plays: g.plays,
      stats: { team: g.stats.team, pog: R.playerOfGame(g), players: Object.keys(g.stats.players).length }, rosterNames: g.teams.map((t) => t.players.slice(0, 3).map((p) => `${p.first} ${p.last}`)),
    };
  }
  let season = null;
  const s = S.season;
  if (s) {
    const ug = L.userGame(s);
    season = { year: s.year, userTeam: s.userTeam, short: s.short, week: s.week, weeks: s.weeks.length, phase: s.phase, champion: s.champion,
      schedule: s.weeks.map((wk) => { const x = wk.find((q) => q.home === s.userTeam || q.away === s.userTeam); return { home: x.home, away: x.away, rivalry: x.rivalry, result: x.result }; }),
      weekGames: s.weeks.map((wk) => wk.map((q) => `${q.home}|${q.away}`)),
      standings: L.standings(s).map((r) => ({ id: r.id, w: r.w, l: r.l, pf: r.pf, pa: r.pa })),
      playoffs: s.playoffs ? { seeds: s.playoffs.seeds, round: s.playoffs.round, semis: s.playoffs.semis, final: s.playoffs.final } : null,
      userGame: ug ? { home: ug.home, away: ug.away, result: ug.result } : null,
      roster: s.rosters[s.userTeam].map((p) => ({ name: `${p.first} ${p.last}`, pos: p.pos, yr: p.yr, ovr: p.ovr, num: p.num })) };
  }
  return { loop: running, perf: { upd: Math.round(S.perf.upd * 100) / 100, draw: Math.round(S.perf.draw * 100) / 100 }, gfx: info3d(), view3d: use3d(), ptr: [S.ptr || 0, S.ptrMove || 0], fx: S.fx.length, scene: S.scene, overlay: S.overlay, settings: { ...S.settings }, reduced: S.reduced, saveOk: S.saveOk, hasSave: S.hasSave, game, season, challenges: { ...S.challenges }, exhib: { ...S.exhib }, rng: rng.s };
}

function isIdle() {
  const g = S.game;
  if (S.ui.transT > 0) return false;
  if (S.scene === 'champion') return S.reduced || S.frozen !== null || S.ui.confT >= 6;
  if (S.scene !== 'game' || !g || S.overlay) return true;
  if ((F3.artLoading || tierBusy()) && use3d()) return false;
  if (S.frozen !== null) return true;
  if (g.phase === 'live') return false;
  if ((g.phase === 'kickoff' || g.phase === 'kickfly') && g.kickAnim) return false;
  if (g.phase === 'kick' && S.ui.aiKickT >= 0) return false;
  if (g.phase === 'result' && S.ui.resultT < (S.reduced ? 0 : 0.3)) return false;
  if (F3.replay || F3.artLoading && use3d()) return false;
  // (reduced motion never animates the camera: it snaps on the next frame, so there is nothing to wait for)
  if (use3d() ? (!S.reduced && !cameraSettled3d(g, S)) || F3.animating : Math.abs(cameraTarget(g) - view.camY) > 0.05) return false;
  if (view.shake > 0 || S.fx.length) return false;
  return true;
}

function stepN(n) {
  const g = S.game;
  for (let i = 0; i < n; i++) {
    if (!g) break;
    if (g.phase === 'live') { R.stepLive(g, rng, liveInput(g)); recordTick(g, S); drainEvents(g); if (g.phase !== 'live') { onResultMaybe(); } }
    else update(TICK, performance.now());
  }
  renderAll();
  return snapshot().game;
}

function layoutRects() {
  const out = {};
  const rect = (el) => { const r = el.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height, cx: r.left + r.width / 2, cy: r.top + r.height / 2 }; };
  for (const b of document.querySelectorAll('[data-act]')) {
    if (b.offsetParent === null && b.getClientRects().length === 0) continue;
    const key = b.dataset.id ? `${b.dataset.act}:${b.dataset.id}` : b.dataset.act;
    if (!out[key]) out[key] = rect(b);
  }
  if (els.field && S.scene === 'game') {
    const fr = els.field.getBoundingClientRect();
    out.field = rect(els.field);
    out.receivers = S.game ? receiverTargets(S.game).map((t) => ({ slot: t.slot, x: fr.left + t.x, y: fr.top + t.y })) : [];
    const P = S.game && S.game.play;
    if (P) { const [x, y] = agentAbs(P, P.A[P.carrier]); const [sx, sy] = fieldToScreen(x, y, 1); out.carrier = { x: fr.left + sx, y: fr.top + sy }; }
  }
  return out;
}

const HOOKS = {
  seed(n) { rng = makeRng(n >>> 0); return n; },
  getState: () => snapshot(),
  setState(p) {
    if (!p) return snapshot();
    if (p.settings) {
      deepMerge(S.settings, p.settings); applySettings(); view.layerKey = '';
      if (p.settings.graphics !== undefined) { S.force2d = false; if (p.settings.graphics !== '2d' && !F3.on && webglAvailable()) { init3d(els.field3d); S.ui.has3d = F3.on; } }
    }
    if (p.game && S.game) {
      const gp = { ...p.game };
      if (gp.phase && gp.phase !== S.game.phase) Object.assign(S.game, { kickAnim: null, kick: null, pendingPunt: null, pendingKick: null, aiOff: null });
      deepMerge(S.game, gp);
      if (gp.phase && gp.phase !== 'pre' && gp.phase !== 'live') S.game.play = null;
      if (gp.ballOn !== undefined && !gp.log) { // staged spot: end the log where the ball now is
        const sg = S.game;
        R.logLine(sg, `${teamDef(sg.teams[sg.poss].id).short} drive reaches the ${R.yardLine(sg.ballOn)}.`);
      }
    }
    if (p.season && S.season) deepMerge(S.season, p.season);
    if (p.exhib) deepMerge(S.exhib, p.exhib);
    if (p.challenges) deepMerge(S.challenges, p.challenges);
    if (p.ui) deepMerge(S.ui, p.ui);
    if (p.overlay !== undefined) S.overlay = p.overlay;
    if (S.game) { view.camY = cameraTarget(S.game); snap3d(); }
    if ((p.game || p.settings) && S.game && S.scene === 'game' && !S.overlay) flow();
    renderAll();
    if (p.settings && S.game && S.scene === 'game') drawField(performance.now()); // apply view changes now (weather, theme)
    return snapshot();
  },
  isIdle,
  step: (n = 1) => stepN(n),
  pause() { S.paused = true; return true; },
  resume() { S.paused = false; wake(); return true; },
  scene(name) {
    if (name === 'game' && !S.game) startExhibition();
    if (name === 'halftime') { if (!S.game) startExhibition(); S.scene = 'game'; Object.assign(S.game, { phase: 'break', breakKind: 'half', quarter: 3 }); S.game.play = null; flow(); renderAll(); return S.scene; }
    if (name === 'final' && S.game) { S.game.phase = 'final'; S.game.over = true; S.scene = 'game'; flow(); return S.scene; }
    if (name === 'champion' && S.season && !S.season.champion) { S.season.champion = S.season.userTeam; S.season.phase = 'done'; confetti = null; S.ui.confT = 0; }
    if (name === 'pause') { S.scene = 'game'; S.overlay = 'pause'; renderAll(); return 'pause'; }
    return go(name);
  },
  newGame(opts = {}) {
    if (opts.seed !== undefined) rng = makeRng(opts.seed >>> 0);
    if (opts.settings) { deepMerge(S.settings, opts.settings); applySettings(); }
    if (opts.mode === 'season') {
      S.seasonPick = { team: opts.team || 'hot-springs', short: !!opts.short };
      startSeason();
      if (opts.play) startSeasonGame();
      return snapshot();
    }
    if (opts.mode === 'challenge') { startChallenge(opts.id); return snapshot(); }
    S.exhib.you = opts.home || opts.you || S.exhib.you; S.exhib.opp = opts.away || opts.opp || S.exhib.opp;
    S.exhib.home = opts.userHome !== false;
    const g = startGame({ mode: 'exhibition', teamA: S.exhib.you, teamB: S.exhib.opp, home: S.exhib.home ? 0 : 1, user: opts.user === null ? null : 0,
      quarterMin: opts.quarterMin || S.settings.quarterMin, skipToss: !!opts.skipToss, receiver: opts.receiver ?? 0, rivalry: !!opts.rivalry });
    if (opts.skipKickoff && g.phase === 'kickoff') { R.finishKickoff(g, rng); R.advance(g, rng); snap3d(); flow(); renderAll(); }
    return snapshot();
  },
  act(name, ...a) {
    const g = S.game;
    switch (name) {
      case 'call': return callOffense(a[0]);
      case 'defCall': return callDefense(a[0]);
      case 'snap': return hike();
      case 'changePlay': return changePlay();
      case 'throw': {
        if (!g || !g.play) return false;
        inp.throwSlot = a[0];
        if (S.paused || a[1] === 'now') { R.stepLive(g, rng, liveInput(g)); recordTick(g, S); drainEvents(g); renderAll(); }
        return g.play.thrown;
      }
      case 'steer': S.steer = (a[0] || a[1]) ? [a[0], a[1]] : null; return true;
      case 'juke': inp.juke = true; return true;
      case 'finishPlay': {
        if (!g) return null;
        if (g.phase === 'pre') hike();
        let n = 0;
        while (g.phase === 'live' && n++ < 60 * 20) { R.stepLive(g, rng, liveInput(g)); recordTick(g, S); drainEvents(g); }
        onResultMaybe(); renderAll();
        return g.lastResult;
      }
      case 'kick': {
        if (!g || g.phase !== 'kick') return null;
        if (a[0] === undefined) return kickPress();
        return doKick(a[0]);
      }
      case 'pat': ACTIONS.pat(a[0]); return g && g.phase;
      case 'timeout': return timeout();
      case 'advance': {
        if (!g) return null;
        if (S.overlay === 'break' || S.overlay === 'ot') { cont(); return g.phase; }
        if (g.phase === 'kickoff' || g.phase === 'kickfly') { skipAnim(); return g.phase; }
        if (g.phase === 'result') cont();
        return g.phase;
      }
      case 'coin': ACTIONS.coin(a[0]); return g && g.toss;
      case 'kickoffGo': ACTIONS.kickoff(); return g && g.phase;
      case 'simGame': case 'simRest': ACTIONS.simRest(); return snapshot().game;
      case 'autoplay': { if (!g) return null; const r = R.autoplay(g, rng, a[0] || 6000); flow(); renderAll(); return { ...r, score: g.score, phase: g.phase, quarter: g.quarter }; }
      case 'simWeek': simWeek(); return snapshot().season;
      case 'seasonContinue': seasonContinue(); return S.scene;
      case 'simSeason': { let guard = 0; while (S.season && S.season.phase !== 'done' && guard++ < 30) simWeek(); return snapshot().season; }
      case 'nextSeason': nextSeasonAct(); return snapshot().season;
      case 'layout': return layoutRects();
      case 'animAt': {
        S.frozen = a[0] === null ? null : a[0];
        if (g && g.phase === 'kick' && g.kick) { if (a[0] === null) delete g.kick.frozen; else g.kick.frozen = Math.max(-1, Math.min(1, a[1] ?? 0)); }
        if (g && g.kickAnim && a[0] !== null) g.kickAnim.t = a[0] / 1000;
        if (g && a[0] !== null && g.phase === 'result') S.ui.resultT = Math.max(S.ui.resultT, 0.31);
        if (a[0] !== null) { view.camY = cameraTarget(g || {}); view.shake = 0; snap3d(); }
        renderAll();
        if (g && S.scene === 'game') drawField(performance.now());
        return true;
      }
      case 'td': { // freeze a touchdown celebration frame
        if (!g) return false;
        const ly = g.poss === 0 ? 10 + g.ballOn : 110 - g.ballOn;
        S.fx = [{ kind: 'td', x: g.absX, y: ly, t0: performance.now() - (a[0] || 300), c1: teamDef(g.teams[0].id).colors.primary, c2: teamDef(g.teams[0].id).colors.secondary }];
        drawField(performance.now());
        return true;
      }
      case 'mascotSheet': {
        go('title');
        const html = `<div class="panel-screen"><h2>Mascots (original geometric art)</h2><div class="team-grid">${ALL.map((t) => `<div class="team-card">${UI.mascotTag(t.id, 96)}<span class="tc-text"><span class="tc-name">${t.short}</span><span class="tc-sub">${t.mascot}</span></span></div>`).join('')}</div></div>`;
        els.screen.innerHTML = html; els.screen._html = html; paintMascots(els.screen);
        return ALL.length;
      }
      case 'forceResult': { // rules tests: apply a crafted play result through the real rules
        if (!g || !['call', 'pre', 'live'].includes(g.phase)) return null;
        if (!g.offCall) g.offCall = a[1] || 'dive';
        g.play = null; g.phase = 'live';
        R.applyResult(g, { elapsed: 4, clockStops: false, carrierSide: 'O', playType: 'run', yards: 0, ...a[0] }, rng);
        onResultMaybe(); renderAll();
        return snapshot().game;
      }
      case 'replay': return replayAct(a[0], a[1]);
      case 'clock': { F3.clockMs = a[0] === null || a[0] === undefined ? null : a[0]; if (g && S.scene === 'game') drawField(performance.now()); return F3.clockMs; }
      case 'bbox': return bbox3d(a[0]);
      case 'rigProbe': return rigProbe3d(a[0]);
      case 'camLook': { const ok = camLook3d(a[0], a[1], a[2], a[3]); if (g && S.scene === 'game') drawField(performance.now()); return ok; }
      case 'gfx': return info3d();
      case 'gfxProfile': return profile3d(a[0]);
      case 'save': return save();
      case 'hasSave': return hasSave();
      case 'audio': return { ready: !!initAudio(), on: audio.on, volume: audio.volume };
      case 'contrast': return null;
      default: return undefined;
    }
  },
};

// ------------------------------------------------------------------ boot
function boot() {
  els = { bg: $('bg'), game: $('game'), scorebug: $('scorebug'), field: $('field'), field3d: $('field3d'), panel: $('panel'), toast: $('toast'), screen: $('screen') };
  const d = load();
  if (d) {
    if (d.settings) S.settings = { ...DEFAULTS, ...d.settings };
    if (d.challenges) S.challenges = d.challenges;
    if (d.exhib) S.exhib = { ...S.exhib, ...d.exhib, step: 'you' };
  }
  S.hasSave = !!(d && (d.game || d.season));
  if (!storage()) S.saveOk = false;
  applySettings();
  // ?gl=0 starts on the 2D field without touching WebGL (until the player picks 3D in Settings)
  S.force2d = new URLSearchParams(location.search).get('gl') === '0';
  if (!S.force2d && S.settings.graphics !== '2d' && webglAvailable()) init3d(els.field3d);
  S.ui.has3d = F3.on;
  F3.onArt = () => { if (S.scene === 'game' && S.game) { drawField(performance.now()); wake(); } };
  // title art: preload so screenshots never catch the plain backdrop mid-load
  S.titleArt = false;
  if (!/[?&]art=0\b/.test(location.search)) {
    const im = new Image(); im.src = window.innerWidth < window.innerHeight ? 'assets/title-night-tall.webp' : 'assets/title-night.webp';
    S.ui.transT = 1;
    im.decode().then(() => { S.titleArt = true; document.documentElement.classList.add('title-art'); }).catch(() => {}).finally(() => { S.ui.transT = Math.max(0, S.ui.transT - 1); });
    loadTrophy();
  }
  els.field3d.hidden = !use3d(); els.field.classList.toggle('overlay2d', use3d()); els.field.parentElement.classList.toggle('v3d', use3d());
  document.addEventListener('click', onClick);
  document.addEventListener('change', onChange);
  document.addEventListener('input', (e) => { if (e.target.dataset && e.target.dataset.set === 'volume') onChange(e); });
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  window.addEventListener('blur', () => inp.keys.clear());
  els.field.addEventListener('pointerdown', onPointerDown);
  els.field.addEventListener('pointermove', onPointerMove);
  els.field.addEventListener('pointerup', onPointerUp);
  els.field.addEventListener('pointercancel', onPointerUp);
  window.addEventListener('resize', () => { view.layerKey = ''; panelFitDirty = true; renderAll(); });
  if (window.matchMedia) { try { window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', () => { applySettings(); renderAll(); }); } catch (e) { /* old browsers */ } }
  window.__game = HOOKS;
  go('title');
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
