// HTML screens, scorebug and play panel. Pure string builders; main.js owns state and events.
import { ALL, REAL, teamDef, onColor, rivalryText } from './data.js';
import { PLAYS, DEFS, SPECIALS, BADGES, BADGE_NAMES, SLOTS, playById } from './plays.js';
import { POSITIONS, depth, composite } from './roster.js';
import * as L from './league.js';
import { specialsFor, yardLine, fgDistance, playerOfGame, statLine, kickRange } from './rules.js';
import { starters } from './roster.js';
import { DIFFICULTY } from './ai.js';
import { canThrow } from './sim.js';
import { offenseArt, defenseArt } from './playart.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const ord = (n) => ['', '1st', '2nd', '3rd', '4th'][n] || `${n}th`;
const clockStr = (s) => { s = Math.max(0, Math.ceil(s)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };
const mascot = (id, size, cls = '') => `<canvas class="mascot ${cls}" data-team="${id}" width="${size}" height="${size}" style="width:${size}px;height:${size}px" aria-hidden="true"></canvas>`;
export const mascotTag = (id, size) => mascot(id, size);
const btn = (act, label, opts = {}) => `<button class="btn ${opts.cls || ''}" data-act="${act}"${opts.id ? ` data-id="${esc(opts.id)}"` : ''}${opts.auto ? ' data-autofocus' : ''}${opts.disabled ? ' disabled' : ''}${opts.aria ? ` aria-label="${esc(opts.aria)}"` : ''}>${label}</button>`;
const swatches = (t) => `<span class="sw" style="background:${t.colors.primary}"></span><span class="sw" style="background:${t.colors.secondary}"></span>`;
export const titleYears = (t) => t.titles.length ? t.titles.map((y) => (t.titleNote[y] ? `${y} (${t.titleNote[y]})` : String(y))).join(', ') : 'none';

function teamCard(t, sel, act, extra = '') {
  const tags = [];
  if (t.fictional) tags.push('<span class="tag">fictional town</span>');
  else if (!t.colorsConfirmed) tags.push('<span class="tag">game colors</span>');
  return `<button class="team-card${sel ? ' sel' : ''}" data-act="${act}" data-id="${t.id}" aria-pressed="${sel ? 'true' : 'false'}">
    ${mascot(t.id, 56)}
    <span class="tc-text"><span class="tc-name">${esc(t.short)}</span>
    <span class="tc-sub">${esc(t.mascot)}${t.cls ? ` · <b class="cls">${t.cls}</b>` : ''} ${swatches(t)}</span>
    ${t.fictional ? '' : `<span class="tc-sub small">State titles: ${titleYears(t)}</span>`}
    ${tags.join(' ')}${extra}</span></button>`;
}

// ---------------------------------------------------------------- screens
export function screenHTML(S) {
  switch (S.scene) {
    case 'title': return titleHTML(S);
    case 'exhibition': return exhibitionHTML(S);
    case 'seasonSetup': return seasonSetupHTML(S);
    case 'season': return seasonHTML(S);
    case 'challenges': return challengesHTML(S);
    case 'help': return helpHTML(S);
    case 'settings': return settingsHTML(S);
    case 'pregame': return pregameHTML(S);
    case 'final': return finalHTML(S);
    case 'champion': return championHTML(S);
    default: return '';
  }
}

function titleHTML(S) {
  return `<div class="title-wrap">
    <h1 class="logo"><span class="l1">Friday Night</span><span class="l2">Spa City</span></h1>
    <p class="tag-line">Garland County high school football under the lights</p>
    <nav class="menu" aria-label="Main menu">
      ${S.hasSave ? btn('continue', 'Continue', { cls: 'primary', auto: true }) : ''}
      ${btn('go', 'Exhibition', { id: 'exhibition', cls: S.hasSave ? '' : 'primary', auto: !S.hasSave })}
      ${btn('go', 'Season', { id: 'seasonSetup' })}
      ${btn('go', 'Challenges', { id: 'challenges' })}
      ${btn('go', 'How to Play', { id: 'help' })}
      ${btn('go', 'Settings', { id: 'settings' })}
    </nav>
    <p class="fine">Real schools as setting · all players fictional · not affiliated with or endorsed by any school</p>
  </div>`;
}

function back(to = 'title', label = 'Back') { return btn('go', `← ${label}`, { id: to, cls: 'ghost back' }); }

function exhibitionHTML(S) {
  const x = S.exhib;
  const pickA = x.step !== 'opp';
  const grid = ALL.map((t) => teamCard(t, pickA ? x.you === t.id : x.opp === t.id, 'pickTeam', (!pickA && t.id === x.you) ? '<span class="tag you">you</span>' : '')).join('');
  return `<div class="panel-screen">${back()}
    <h2>Exhibition</h2>
    <div class="seg" role="tablist" aria-label="Choose teams">
      <button role="tab" class="${pickA ? 'on' : ''}" aria-selected="${pickA}" data-act="exStep" data-id="you">Your team: <b>${esc(teamDef(x.you).short)}</b></button>
      <button role="tab" class="${!pickA ? 'on' : ''}" aria-selected="${!pickA}" data-act="exStep" data-id="opp">Opponent: <b>${esc(teamDef(x.opp).short)}</b></button>
    </div>
    <div class="team-grid">${grid}</div>
    <div class="opts">
      ${segRow('Venue', 'exHome', [['home', `Home (${esc(teamDef(x.you).venue)})`], ['away', `Away (${esc(teamDef(x.opp).venue)})`]], x.home ? 'home' : 'away')}
      ${segRow('Quarters', 'set:quarterMin', [[4, '4 min'], [8, '8 min'], [12, '12 min']], S.settings.quarterMin)}
      ${segRow('Difficulty', 'set:difficulty', Object.entries(DIFFICULTY).map(([k, v]) => [k, v.label]), S.settings.difficulty)}
    </div>
    <div class="actions">${btn('startExhibition', 'Kick off ▶', { cls: 'primary', auto: true, disabled: x.you === x.opp })}</div>
    ${x.you === x.opp ? '<p class="warn">Pick two different teams.</p>' : ''}
  </div>`;
}

function segRow(label, act, opts, cur) {
  return `<div class="seg-row"><span class="seg-label" id="lbl-${act.replace(/[^a-z]/gi, '')}">${label}</span><div class="seg" role="radiogroup" aria-labelledby="lbl-${act.replace(/[^a-z]/gi, '')}">${opts.map(([v, l]) =>
    `<button role="radio" aria-checked="${String(v) === String(cur)}" class="${String(v) === String(cur) ? 'on' : ''}" data-act="${act}" data-id="${v}">${l}</button>`).join('')}</div></div>`;
}

function seasonSetupHTML(S) {
  const x = S.seasonPick;
  return `<div class="panel-screen">${back()}
    <h2>Season: the Spa City Cup</h2>
    <p class="note">Coach one of Garland County's seven real high schools through a ten-team league (the 7 county schools plus 3 fictional out-of-county towns). The league, its playoff and the Spa City Cup are a game invention; real schools play in their AAA classifications.</p>
    <div class="team-grid">${REAL.map((t) => teamCard(t, x.team === t.id, 'pickSeason')).join('')}</div>
    <div class="opts">
      ${segRow('Length', 'seasonLen', [['full', 'Full (9 weeks)'], ['short', 'Short (5 weeks)']], x.short ? 'short' : 'full')}
      ${segRow('Quarters', 'set:quarterMin', [[4, '4 min'], [8, '8 min'], [12, '12 min']], S.settings.quarterMin)}
      ${segRow('Difficulty', 'set:difficulty', Object.entries(DIFFICULTY).map(([k, v]) => [k, v.label]), S.settings.difficulty)}
    </div>
    <div class="actions">${btn('startSeason', 'Start season ▶', { cls: 'primary', auto: true })}</div>
  </div>`;
}

function weekLabel(s, w) { return s.weeks.length === 9 ? `Week ${w + 1}` : `Week ${w + 1}`; }

function seasonHTML(S) {
  const s = S.season, me = teamDef(s.userTeam);
  const tab = S.ui.tab || 'schedule';
  const ug = L.userGame(s);
  let headline = '', actions = '';
  if (s.phase === 'regular' && ug) {
    const oppId = ug.home === s.userTeam ? ug.away : ug.home, opp = teamDef(oppId);
    headline = `${weekLabel(s, s.week)}${s.week === 0 ? ' (late August)' : ''}: ${ug.home === s.userTeam ? 'vs' : 'at'} ${esc(opp.short)} ${opp.mascot}${ug.rivalry ? ' <span class="tag rival">Rivalry Week</span>' : ''}`;
    actions = btn('playWeek', 'Play game ▶', { cls: 'primary', auto: true }) + btn('simWeek', 'Sim game');
  } else if (s.phase === 'playoffs' && ug) {
    const oppId = ug.home === s.userTeam ? ug.away : ug.home;
    headline = `${ug.final ? 'Spa City Cup final (neutral site)' : 'Semifinal'}: ${ug.final ? 'vs' : ug.home === s.userTeam ? 'vs' : 'at'} ${esc(teamDef(oppId).short)}`;
    actions = btn('playWeek', 'Play game ▶', { cls: 'primary', auto: true }) + btn('simWeek', 'Sim game');
  } else if (s.phase === 'playoffs') {
    headline = s.playoffs.round === 1 ? 'Playoff semifinals (you did not qualify)' : 'Spa City Cup final';
    actions = btn('simWeek', 'Sim to the end ▶', { cls: 'primary', auto: true });
  } else if (s.phase === 'done') {
    const ch = teamDef(s.champion);
    headline = `${s.year} Spa City Cup champion: ${esc(ch.short)} ${ch.mascot}`;
    actions = btn('nextSeason', `Play ${s.year + 1} season ▶`, { cls: 'primary', auto: true }) + btn('go', 'Title', { id: 'title' });
  }
  const tabs = [['schedule', 'Schedule'], ['standings', 'Standings'], ['roster', 'Roster']];
  let body = '';
  if (tab === 'schedule') body = scheduleHTML(s);
  else if (tab === 'standings') body = standingsHTML(s);
  else body = rosterHTML(s.rosters[s.userTeam], me);
  const recap = S.ui.weekRecap ? `<div class="recap" role="status">${S.ui.weekRecap}</div>` : '';
  return `<div class="panel-screen season">${btn('go', '← Title', { id: 'title', cls: 'ghost back' })}
    <div class="season-head">${mascot(me.id, 64)}<div><h2>${esc(me.short)} ${me.mascot} · ${s.year}</h2>
      <p class="sub">Record ${L.userRecord(s)}${s.phase === 'playoffs' ? ' · Playoffs' : ''}</p></div></div>
    ${recap}
    <p class="headline">${headline}</p>
    <div class="actions">${actions}</div>
    <div class="seg tabs" role="tablist">${tabs.map(([k, l]) => `<button role="tab" aria-selected="${tab === k}" class="${tab === k ? 'on' : ''}" data-act="tab" data-id="${k}">${l}</button>`).join('')}</div>
    <div class="tab-body">${body}</div>
  </div>`;
}

function scheduleHTML(s) {
  const rows = s.weeks.map((wk, w) => {
    const g = wk.find((x) => x.home === s.userTeam || x.away === s.userTeam);
    const home = g.home === s.userTeam, opp = teamDef(home ? g.away : g.home);
    let res = '—';
    if (g.result) {
      const my = home ? g.result.hs : g.result.as, th = home ? g.result.as : g.result.hs;
      res = `<b class="${my > th ? 'w' : 'l'}">${my > th ? 'W' : 'L'}</b> ${my}–${th}${g.result.ot ? ' (OT)' : ''}${g.result.simmed ? ' <span class="small">sim</span>' : ''}`;
    }
    const cur = s.phase === 'regular' && w === s.week;
    return `<tr class="${cur ? 'cur' : ''}"><td>${w + 1}</td><td>${home ? 'vs' : 'at'} ${mascot(opp.id, 22, 'inline')} ${esc(opp.short)}${g.rivalry ? ' <span class="tag rival">Rivalry</span>' : ''}${opp.fictional ? ' <span class="tag">fictional</span>' : ''}</td><td>${res}</td></tr>`;
  }).join('');
  let po = '';
  if (s.playoffs) {
    const P = s.playoffs;
    const gl = (g) => `${esc(teamDef(g.home).short)} ${g.result ? `${g.result.hs}–${g.result.as} ` : 'vs '}${esc(teamDef(g.away).short)}`;
    po = `<h3>Playoffs</h3><ul class="bracket"><li>Semifinal: ${gl(P.semis[0])}</li><li>Semifinal: ${gl(P.semis[1])}</li>${P.final ? `<li><b>Spa City Cup final</b> (a neutral site): ${gl(P.final)}</li>` : ''}</ul>`;
  }
  const Ld = Object.values(s.leaders || {});
  const top = (k, lbl) => { const p = Ld.slice().sort((a, b) => b[k] - a[k])[0]; return p && p[k] > 0 ? `<li>${lbl}: ${esc(p.name)} (${p.pos}), ${p[k]}${k === 'tkl' ? ' tackles' : k === 'td' ? ' TD' : ' yd'}</li>` : ''; };
  const lead = Ld.length ? `<h3>Season leaders <span class="small">(games you played)</span></h3><ul class="leaders">${top('py', 'Passing')}${top('ry', 'Rushing')}${top('recy', 'Receiving')}${top('td', 'Touchdowns')}${top('tkl', 'Tackles')}</ul>` : '';
  return `<table class="tbl"><thead><tr><th>Wk</th><th>Opponent</th><th>Result</th></tr></thead><tbody>${rows}</tbody></table>${po}${lead}`;
}

function standingsHTML(s) {
  const rows = L.standings(s).map((r, i) => {
    const t = teamDef(r.id);
    return `<tr class="${r.id === s.userTeam ? 'cur' : ''}"><td>${i + 1}</td><td>${mascot(t.id, 22, 'inline')} ${esc(t.short)}${t.fictional ? ' <span class="tag">fictional</span>' : ''}</td><td>${r.w}-${r.l}</td><td>${r.pf}</td><td>${r.pa}</td></tr>`;
  }).join('');
  return `<table class="tbl"><thead><tr><th>#</th><th>Team</th><th>W-L</th><th>PF</th><th>PA</th></tr></thead><tbody>${rows}</tbody></table>
    <p class="small">Top four make the playoffs. Ties: head-to-head, then point differential, then points scored.</p>`;
}

const KEY_R = { QB: ['thr', 'acc', 'awr'], RB: ['spd', 'agi', 'str'], WR: ['spd', 'hnd', 'agi'], TE: ['hnd', 'blk', 'str'], OL: ['blk', 'str', 'awr'], DL: ['str', 'tkl', 'agi'], LB: ['tkl', 'spd', 'cov'], CB: ['cov', 'spd', 'agi'], S: ['cov', 'tkl', 'spd'], K: ['kck'] };
const R_NAME = { spd: 'SPD', str: 'STR', agi: 'AGI', hnd: 'HND', thr: 'ARM', acc: 'ACC', tkl: 'TKL', cov: 'COV', blk: 'BLK', awr: 'AWR', kck: 'KICK' };
export function rosterHTML(players, team) {
  const d = depth(players), c = composite(players);
  const groups = Object.keys(POSITIONS).map((pos) => `<tr class="grp"><th colspan="5">${pos}</th></tr>` + d[pos].map((p, i) =>
    `<tr${i < startersCount(pos) ? ' class="st"' : ''}><td>#${p.num}</td><td>${esc(p.first)} ${esc(p.last)}</td><td>${p.yr}</td><td><b>${p.ovr}</b></td><td class="small">${KEY_R[pos].map((k) => `${R_NAME[k]} ${p.r[k]}`).join(' · ')}</td></tr>`).join('')).join('');
  return `<p class="note">All players are fictional. Team ratings: offense ${c.off}, defense ${c.def}. Starters are highlighted.</p>
    <table class="tbl roster"><thead><tr><th>No.</th><th>Name</th><th>Yr</th><th>OVR</th><th>Key ratings</th></tr></thead><tbody>${groups}</tbody></table>`;
}
const startersCount = (pos) => ({ QB: 1, RB: 1, WR: 3, TE: 1, OL: 5, DL: 4, LB: 3, CB: 2, S: 2, K: 1 }[pos]);

export const CHALLENGES = [
  { id: 'twoMinute', name: 'Two-Minute Drill', desc: 'Down 21–17 with 2:00 left in the fourth. Your ball at your own 30 with 2 timeouts. Score a touchdown to win.' },
  { id: 'goalLine', name: 'Goal-Line Stand', desc: 'Up 24–21 with 1:10 left. The opponent has 1st and goal at your 8. Keep them out of the end zone and win the game.' },
  { id: 'rivalry', name: 'Rivalry Renewed', desc: 'Lakeside vs Lake Hamilton at Wolf Stadium in Pearcy. Pick a side and win a full game. (A game scenario, not a recreation.)' },
];

function challengesHTML(S) {
  const cards = CHALLENGES.map((c) => `<div class="ch-card"><h3>${c.name} ${S.challenges[c.id] ? '<span class="tag done">✓ Completed</span>' : ''}</h3><p>${c.desc}</p>
    ${c.id === 'rivalry'
      ? `<div class="actions">${btn('challenge', `Play as Lakeside ${mascot('lakeside', 22, 'inline')}`, { id: 'rivalry:lakeside' })}${btn('challenge', `Play as Lake Hamilton ${mascot('lake-hamilton', 22, 'inline')}`, { id: 'rivalry:lake-hamilton' })}</div>`
      : `<div class="actions">${btn('challenge', 'Play ▶', { id: c.id, cls: 'primary' })}</div>`}</div>`).join('');
  return `<div class="panel-screen">${back()}<h2>Challenges</h2>
    <p class="note">Challenges 1 and 2 use your team from Exhibition (${esc(teamDef(S.exhib.you).short)}) against ${esc(teamDef(S.exhib.opp).short)}.</p>${cards}</div>`;
}

function helpHTML(S) {
  const tab = S.ui.helpTab || 'basics';
  const tabs = [['basics', 'Basics'], ['controls', 'Controls'], ['rules', 'Rules'], ['credits', 'Credits']];
  let body = '';
  if (tab === 'basics') body = `
    <p><b>Football in one minute.</b> Your offense has four tries (<b>downs</b>) to move the ball 10 yards. Make it and you get a fresh set (<b>first down</b>). Score a <b>touchdown</b> (6 points) by carrying or catching the ball in the end zone at the top of the screen. After a touchdown, kick the try (1 point) or run one play from the 3 for 2 points. Out of downs? On 4th down you can <b>punt</b> it away or try a <b>field goal</b> (3 points).</p>
    <p><b>Each snap:</b> call a play from the cards, see the routes, then press <b>HIKE</b>. On runs, the carrier runs on his own; steer to find a hole and <b>JUKE</b> to slip a tackle. On passes, tap a receiver (or press his number) when he's open; the auto-QB throws for you if you wait. On defense, pick a call and watch it play out.</p>
    <p><b>Reading the field:</b> the camera sits behind your team's end, so your offense always attacks up the screen. The home team wears dark jerseys, the visitors white. (In the 2D classic view, your team is the circles and the opponent the squares.) After any play, press <kbd>R</kbd> or Replay for a sideline replay. The <span class="k-blue">blue line</span> is the line of scrimmage and the <span class="k-gold">gold line</span> is the first-down marker. Receivers wear shape badges: ${BADGES.map((b, i) => `${b} ${i + 1}`).join(', ')}.</p>
    <p><b>Calls that beat calls:</b> Runs beat <i>Deep Shell</i>; deep passes beat <i>Run Stuff</i>; quick slants and screens beat <i>Fire Blitz</i>; a QB keeper beats <i>Man Press</i>. Each defensive card says what it's strong against.</p>`;
  else if (tab === 'controls') body = `<table class="tbl keys"><tbody>
    <tr><th>Choose a play</th><td>Number keys (1–9, 0), or tap a card. Specials: P punt, F field goal, K kneel</td></tr>
    <tr><th>Snap</th><td>Space, or HIKE. Backspace changes the play</td></tr>
    <tr><th>Throw</th><td>1–5 (${BADGES.join(' ')}), or tap the receiver or his badge button</td></tr>
    <tr><th>Steer the runner</th><td>Arrow keys or WASD, or drag on the field</td></tr>
    <tr><th>Juke</th><td>J or Shift, or JUKE</td></tr>
    <tr><th>Kick</th><td>Space or tap to stop the needle in the green</td></tr>
    <tr><th>Timeout</th><td>T (between plays, while the clock is running)</td></tr>
    <tr><th>Continue</th><td>Space or Enter</td></tr>
    <tr><th>Pause</th><td>Esc or P · Mute: M</td></tr></tbody></table>
    <p>Assists in Settings: Auto-QB throws on a read if you don't, Auto-kick replaces the needle, and Play speed runs plays faster.</p>`;
  else if (tab === 'rules') body = `<p>These are the <b>game's rules</b>. They follow general high-school football, but they are not a statement of Arkansas Activities Association rules, which this game doesn't claim to model.</p>
    <ul><li>11 players a side, four quarters of 4, 8 or 12 minutes (Settings).</li>
    <li>The clock runs during plays plus a 25-second runoff between plays, and stops after incompletions, out of bounds, scores, changes of possession and timeouts. Three timeouts per team per half.</li>
    <li>Kickoffs from the 40; a kick into the end zone is a touchback to the 20. After a safety, the scored-on team free-kicks from its 20.</li>
    <li>Scoring: touchdown 6, try 1 (kick) or 2 (play from the 3), field goal 3, safety 2.</li>
    <li>After a play ends outside the hash marks, the ball is spotted on the nearer hash.</li>
    <li><b>Overtime:</b> each team gets one series from the opponent's 10. The coin-toss winner goes second. Repeat until one team leads after both have had a series.</li>
    <li>No penalties, injuries or onside kicks. The field doesn't switch ends between quarters.</li></ul>`;
  else body = `<p><b>Friday Night Spa City</b> is an original game in the open-source Hot Springs Games collection (MIT).</p>
    <ul><li><b>Schools:</b> the seven Garland County high schools (names, cities, mascots, classifications, state title years, rivalries) come from the collection's shared research file (<i>shared/data/schools.json</i>, sourced to Wikipedia, the AAA-related press and the Hot Springs Sentinel-Record). Real schools are setting only. Nothing implies endorsement by any school.</li>
    <li><b>Colors:</b> hex values are stand-ins. For Fountain Lake, Cutter-Morning Star, Jessieville and Mountain Pine even the color choices are <b>game colors</b>, not confirmed school colors.</li>
    <li><b>Mascot art</b> is original geometric art drawn in code, not any school's logo.</li>
    <li><b>Players are fictional.</b> Every name is generated; no real students or coaches appear.</li>
    <li><b>Invented:</b> the Spa City Cup league, its playoff and trophy, Rivalry Week, all play names, and the towns of Quartz Hollow, Tufa Ridge and Cinnabar Flats.</li>
    <li><b>Venues</b> are named only where confirmed (Joe C. Reese Stadium; Wolf Stadium in Pearcy); others are shown as a school's home field.</li>
    <li><b>Halftime facts</b> come from the collection's audited trivia bank, each with its source.</li>
    <li>Art is procedural canvas drawing; sound is WebAudio synthesis. No network requests.</li></ul>`;
  return `<div class="panel-screen">${S.helpFromGame ? btn('closeOverlay', '← Back to game', { cls: 'ghost back' }) : back()}<h2>How to Play</h2>
    <div class="seg tabs" role="tablist">${tabs.map(([k, l]) => `<button role="tab" aria-selected="${tab === k}" class="${tab === k ? 'on' : ''}" data-act="helpTab" data-id="${k}">${l}</button>`).join('')}</div>
    <div class="tab-body prose">${body}</div></div>`;
}

function settingsHTML(S) {
  const s = S.settings;
  const tog = (k, label) => `<label class="tog"><input type="checkbox" data-set="${k}" ${s[k] ? 'checked' : ''}> <span>${label}</span></label>`;
  return `<div class="panel-screen">${S.helpFromGame ? btn('closeOverlay', '← Back to game', { cls: 'ghost back' }) : back()}<h2>Settings</h2>
    ${S.saveOk ? '' : '<p class="warn" role="status">Saving unavailable: this browser is blocking storage, so progress lasts only until you close the page.</p>'}
    <div class="opts">
      ${tog('sound', 'Sound (M)')}
      <label class="range"><span id="lbl-vol">Volume</span> <input type="range" min="0" max="100" step="5" value="${Math.round(s.volume * 100)}" data-set="volume" aria-labelledby="lbl-vol"></label>
      ${segRow('Motion', 'set:motion', [['auto', 'System'], ['full', 'Full'], ['reduced', 'Reduced']], s.motion)}
      ${segRow('Theme', 'set:theme', [['night', 'Night game'], ['day', 'Day game']], s.theme)}
      ${S.ui.has3d || S.force2d ? segRow('Field view', 'set:graphics', [['auto', '3D stadium'], ['2d', '2D classic']], S.force2d ? '2d' : s.graphics) : '<p class="small">Field view: 2D classic (this browser has no WebGL 2).</p>'}
      ${segRow('Weather', 'set:weather', [['auto', 'Varies'], ['clear', 'Clear'], ['mist', 'Mist'], ['rain', 'Rain']], s.weather)}
      ${S.ui.has3d ? segRow('Graphics', 'set:quality', [['auto', 'Auto'], ['high', 'High'], ['low', 'Low']], s.quality) : ''}
      ${segRow('Text size', 'set:textScale', [[1, '100%'], [1.15, '115%'], [1.3, '130%']], s.textScale)}
      ${segRow('Quarters', 'set:quarterMin', [[4, '4 min'], [8, '8 min'], [12, '12 min']], s.quarterMin)}
      ${segRow('Difficulty', 'set:difficulty', Object.entries(DIFFICULTY).map(([k, v]) => [k, v.label]), s.difficulty)}
      ${segRow('Play speed', 'set:playSpeed', [[1, '1×'], [1.5, '1.5×'], [2, '2×']], s.playSpeed)}
      ${tog('autoQB', 'Auto-QB: throw on a read if I wait')}
      ${tog('autoKick', 'Auto-kick (no needle)')}
      ${tog('autoContinue', 'Auto-continue after each play')}
      ${tog('routes', 'Show route previews')}
    </div></div>`;
}

function pregameHTML(S) {
  const g = S.game, A = teamDef(g.teams[0].id), B = teamDef(g.teams[1].id);
  const home = teamDef(g.teams[g.home].id);
  const venue = g.neutral ? 'a neutral site' : home.venue;
  const riv = rivalryText(A.id, B.id);
  const toss = g.toss;
  const tossHTML = !toss ? `<p class="headline">Coin toss: call it.</p><div class="actions">${btn('coin', 'Heads', { id: 'heads', cls: 'primary', auto: true })}${btn('coin', 'Tails', { id: 'tails' })}</div>`
    : `<p class="headline" role="status">It's ${toss.flip}. ${esc(teamDef(g.teams[toss.winner].id).short)} will receive.</p><div class="actions">${btn('kickoff', 'Kick off ▶', { cls: 'primary', auto: true })}</div>`;
  const label = g.challenge ? CHALLENGES.find((c) => c.id === g.challenge.id).name : g.mode === 'season' ? (g.final ? 'Spa City Cup final' : g.semi ? 'Playoff semifinal' : `Week ${g.seasonWeek + 1}`) : 'Exhibition';
  return `<div class="pregame">
    <canvas id="splash" aria-hidden="true"></canvas>
    <div class="pg-card">
      <p class="eyebrow">${esc(label)}${g.rivalry ? ' · <span class="tag rival">Rivalry Week</span>' : ''}</p>
      <div class="matchup">
        <div class="mt" style="--tc:${A.colors.primary}">${mascot(A.id, 112)}<b>${esc(A.short)}</b><span>${A.mascot}${g.home === 0 && !g.neutral ? ' · home' : ''}</span></div>
        <div class="vs">vs</div>
        <div class="mt" style="--tc:${B.colors.primary}">${mascot(B.id, 112)}<b>${esc(B.short)}</b><span>${B.mascot}${g.home === 1 && !g.neutral ? ' · home' : ''}</span></div>
      </div>
      <p class="venue">at ${esc(venue)}</p>
      ${riv ? `<p class="fact">${esc(riv)}</p>` : ''}
      ${tossHTML}
    </div></div>`;
}

function finalHTML(S) {
  const g = S.game, A = teamDef(g.teams[0].id), B = teamDef(g.teams[1].id);
  const won = g.score[0] > g.score[1];
  const ot = g.qScores[0].length > 4 || g.quarter > 4;
  const qrow = (i, t) => `<tr><th>${mascot(t.id, 22, 'inline')} ${t.abbr}</th>${[0, 1, 2, 3].map((q) => `<td>${g.qScores[i][q]}</td>`).join('')}${ot ? `<td>${g.qScores[i][4] || 0}</td>` : ''}<td><b>${g.score[i]}</b></td></tr>`;
  const T = g.stats.team;
  const sr = (l, a, b) => `<tr><th>${l}</th><td>${a}</td><td>${b}</td></tr>`;
  const pog = playerOfGame(g);
  const leaders = (side) => {
    const list = Object.values(g.stats.players).filter((p) => p.side === side);
    const top = (k) => list.sort((a, b) => b[k] - a[k])[0];
    const out = [];
    const qb = top('py'); if (qb && qb.att) out.push(`Passing: ${esc(qb.name)}, ${qb.cmp}/${qb.att} ${qb.py} yd`);
    const rb = top('ry'); if (rb && rb.ru) out.push(`Rushing: ${esc(rb.name)}, ${rb.ru} for ${rb.ry} yd`);
    const wr = top('recy'); if (wr && wr.rec) out.push(`Receiving: ${esc(wr.name)}, ${wr.rec} for ${wr.recy} yd`);
    const lb = top('tkl'); if (lb && lb.tkl) out.push(`Tackles: ${esc(lb.name)}, ${lb.tkl}`);
    return out.map((x) => `<li>${x}</li>`).join('');
  };
  let headline = won ? `${esc(A.short)} wins!` : `${esc(B.short)} wins.`;
  let chal = '';
  if (g.challenge) chal = `<p class="headline ${won ? 'w' : 'l'}" role="status">${won ? 'Challenge complete ✓' : 'Challenge failed. Try again?'}</p>`;
  const acts = g.mode === 'season' ? btn('seasonContinue', 'Continue ▶', { cls: 'primary', auto: true })
    : g.challenge ? btn('challenge', 'Retry', { id: g.challenge.key || g.challenge.id, cls: 'primary', auto: true }) + btn('go', 'Challenges', { id: 'challenges' })
      : btn('rematch', 'Rematch', { cls: 'primary', auto: true }) + btn('go', 'Title', { id: 'title' });
  const W = won ? A : B;
  const hero = `<div class="final-hero" style="--tc:${W.colors.primary};--tt:${onColor(W.colors.primary)}">${mascot(W.id, 72)}<div><p class="fh-eyebrow">Final${ot ? ' (overtime)' : ''}</p>
      <p class="fh-score"><span>${esc(A.short)} ${g.score[0]}</span><span>${esc(B.short)} ${g.score[1]}</span></p></div></div>`;
  return `<div class="panel-screen final">${hero}
    <h2 class="${won ? 'w' : 'l'}">${headline}</h2>${chal}
    <table class="tbl qs"><thead><tr><th></th><th>1</th><th>2</th><th>3</th><th>4</th>${ot ? '<th>OT</th>' : ''}<th>T</th></tr></thead><tbody>${qrow(0, A)}${qrow(1, B)}</tbody></table>
    ${pog ? `<div class="pog"><span class="eyebrow">Player of the Game</span><b>${esc(pog.name)}</b> #${pog.num} ${pog.pos}, ${esc(teamDef(g.teams[pog.side].id).short)}<br><span class="small">${statLine(pog)}</span></div>` : ''}
    <div class="cols">
      <table class="tbl"><thead><tr><th>Team stats</th><th>${A.abbr}</th><th>${B.abbr}</th></tr></thead><tbody>
      ${sr('First downs', T[0].fd, T[1].fd)}${sr('Total yards', T[0].yds, T[1].yds)}${sr('Passing', T[0].py, T[1].py)}${sr('Rushing', T[0].ry, T[1].ry)}${sr('Turnovers', T[0].to, T[1].to)}${sr('Plays', T[0].plays, T[1].plays)}</tbody></table>
      <div><h3>${esc(A.short)}</h3><ul class="leaders">${leaders(0)}</ul><h3>${esc(B.short)}</h3><ul class="leaders">${leaders(1)}</ul></div>
    </div>
    <p class="small">All players are fictional.</p>
    <div class="actions">${acts}</div></div>`;
}

function championHTML(S) {
  const s = S.season, ch = teamDef(s.champion);
  return `<div class="champion"><canvas id="cup" aria-hidden="true"></canvas>
    <div class="ch-text"><p class="eyebrow">${s.year} Spa City Cup</p><h2>${esc(ch.short)} ${ch.mascot}</h2><p>Champions! ${(() => { const r = L.standings(s).find((x) => x.id === s.champion); return r ? `${r.w}-${r.l} in the regular season, then two playoff wins.` : ''; })()}</p>
    <p class="small">The Spa City Cup is an invented trophy for this game's league.</p>
    <div class="actions">${btn('go', 'Season summary', { id: 'season', cls: 'primary', auto: true })}${btn('nextSeason', `Play ${s.year + 1} season`)}</div></div></div>`;
}

// ---------------------------------------------------------------- in-game overlays
export function overlayHTML(S) {
  const g = S.game, o = S.overlay;
  if (!o || !g) return '';
  if (o === 'pause') return `<div class="modal" role="dialog" aria-modal="true" aria-label="Paused"><h2>Paused</h2><div class="menu">
    ${btn('resume', 'Resume', { cls: 'primary', auto: true })}${btn('simRest', 'Sim to the end')}${btn('overlay', 'How to Play', { id: 'help' })}${btn('overlay', 'Settings', { id: 'settings' })}${btn('quit', 'Quit to title (saved)')}</div></div>`;
  if (o === 'break') {
    const half = g.breakKind === 'half';
    const fact = half && S.factCard;
    const A = teamDef(g.teams[0].id), B = teamDef(g.teams[1].id);
    const blk = (t, sc) => `<div class="bc-team" style="--tc:${t.colors.primary};--tt:${onColor(t.colors.primary)}">${mascot(t.id, 40)}<span class="bc-name"><span class="sb-full">${esc(t.short)}</span><span class="sb-short">${esc(t.abbr)}</span></span><span class="bc-score">${sc}</span></div>`;
    return `<div class="modal bcard${half ? ' wide' : ''}" role="dialog" aria-modal="true" aria-label="${half ? 'Halftime' : 'End of quarter'}">
      <p class="bc-head">${half ? 'Halftime' : `End of the ${ord(g.quarter - 1)} quarter`}</p>
      <h2 class="bc-row">${blk(A, g.score[0])}${blk(B, g.score[1])}</h2>
      ${fact ? `<div class="factcard"><span class="eyebrow">Halftime fact</span><p>${esc(fact.text)}</p><p class="src">Source: ${esc(fact.source)}</p></div>` : ''}
      <div class="actions">${btn('cont', 'Continue ▶', { cls: 'primary', auto: true })}</div></div>`;
  }
  if (o === 'ot') return `<div class="modal" role="dialog" aria-modal="true" aria-label="Overtime"><p class="eyebrow">Tied ${g.score[0]}–${g.score[1]}</p><h2>Overtime</h2>
    <p>Each team gets one series from the opponent's 10. Repeat until someone leads after both have had a turn.</p><div class="actions">${btn('cont', 'Start overtime ▶', { cls: 'primary', auto: true })}</div></div>`;
  return '';
}

// ---------------------------------------------------------------- scorebug and panel
export function scorebugHTML(S) {
  const g = S.game;
  const side = (i) => {
    const t = teamDef(g.teams[i].id), c = t.colors;
    const pos = g.poss === i && !['final'].includes(g.phase);
    const to = [0, 1, 2].map((k) => `<i class="${k < g.timeouts[i] ? 'on' : ''}"></i>`).join('');
    const ball = pos ? '<svg class="sb-ball" viewBox="0 0 20 12" aria-label="has the ball" role="img"><ellipse cx="10" cy="6" rx="9.2" ry="5.2" fill="#7A3E1D" stroke="#2A1408" stroke-width="0.8"/><path d="M6 6h8M8 4.6v2.8M10 4.6v2.8M12 4.6v2.8" stroke="#FFF6E0" stroke-width="0.8"/></svg>' : '';
    const long = true; // phones show school codes for both teams
    return `<div class="sb-team${pos ? ' has-ball' : ''}" style="--tc:${c.primary};--tc2:${c.secondary};--tt:${onColor(c.primary)}">
      ${mascot(t.id, 30)}<span class="sb-abbr"><span class="sb-full">${esc(t.short.toUpperCase())}</span><span class="sb-short">${esc((long ? t.abbr : t.short).toUpperCase())}</span>${ball}</span>${i === g.home && !g.neutral ? '<span class="sb-home">home</span>' : ''}<span class="sb-score">${g.score[i]}</span>
      <span class="sb-to" aria-label="${g.timeouts[i]} timeouts left">${to}</span></div>`;
  };
  const q = g.phase === 'break' ? (g.breakKind === 'half' ? 'HALFTIME' : `END Q${g.quarter - 1}`) : g.quarter > 4 ? `OT${g.quarter > 5 ? g.quarter - 4 : ''}` : `Q${g.quarter}`;
  const shown = g.ot || g.phase === 'break' ? '' : clockStr(Math.max(0, g.clock - (g.phase === 'call' ? g.runoff : 0)));
  const running = g.phase === 'call' && g.runoff > 0 && !g.ot;
  const dd = g.phase === 'break' || g.phase === 'otStart' ? '' : g.phase === 'result' && g.lastResult && g.lastResult.kind === 'td' ? 'Touchdown' : g.twoPoint ? 'Two-point try' : ['pat', 'kick'].includes(g.phase) && g.kick && g.kick.kind === 'pat' || g.phase === 'pat' ? 'Try' :
    ['kickoff'].includes(g.phase) ? (g.kickAnim && g.kickAnim.kind === 'punt' ? 'Punt' : g.kickAnim && g.kickAnim.kind === 'free' ? 'Free kick' : 'Kickoff') : `${ord(g.down)} & ${g.ballOn + g.toGo >= 100 ? 'goal' : g.toGo} · ${yardLine(g.ballOn)}`;
  return `${side(0)}<div class="sb-mid"><div class="sb-clock">${q} ${shown}${running ? ' <span class="run" title="clock running">▸</span>' : ''}</div><div class="sb-down">${dd}</div></div>${side(1)}
    <button class="icon-btn" data-act="pause" aria-label="Pause menu">❚❚</button>`;
}

export function panelHTML(S) {
  const g = S.game;
  if (!g) return '';
  const userOff = g.user !== null && g.poss === g.user;
  const T = teamDef(g.teams[g.poss].id);
  const situ = `${ord(g.down)} & ${g.ballOn + g.toGo >= 100 ? 'goal' : g.toGo} at the ${yardLine(g.ballOn)}`;
  const toBtn = g.runoff > 0 && !g.ot && g.timeouts[g.user] > 0 ? btn('timeout', `Timeout (T) · ${g.timeouts[g.user]} left`, { cls: 'small-btn' }) : '';
  switch (g.phase) {
    case 'call': {
      const willEnd = g.runoff > 0 && !g.ot && g.clock - g.runoff <= 0;
      const warn = willEnd ? `<p class="warn" role="status">The clock will run out at the snap${g.timeouts[g.user] ? ': call a timeout to stop it' : ''}.</p>` : '';
      if (userOff) {
        const sp = specialsFor(g);
        const spc = sp.map((id) => {
          const p = SPECIALS.find((x) => x.id === id), key = { punt: 'P', fg: 'F', kneel: 'K' }[id];
          const extra = id === 'fg' ? ` (${fgDistance(g.ballOn)} yd)` : '';
          return `<button class="card special" data-act="call" data-id="${id}" aria-label="${p.name}${extra}, key ${key}"><span class="k">${key}</span><span class="nm">${p.name}${extra}</span><span class="ds">${p.desc}</span></button>`;
        }).join('');
        const cards = PLAYS.map((p, i) => `<button class="card play art" data-act="call" data-id="${p.id}"${i === 0 && !sp.length ? ' data-autofocus' : ''} aria-label="${p.name}, ${p.type}, key ${p.key}"><span class="art-box">${offenseArt(p.id)}<span class="k">${p.key}</span></span><span class="nm">${p.name}</span><span class="ty ${p.type}">${p.type === 'run' ? 'RUN' : 'PASS'}</span><span class="ds">${p.desc}</span></button>`).join('');
        return `<div class="ph"><h2>${g.twoPoint ? 'Two-point try: call a play' : `Your ball: ${situ}`}</h2>${toBtn}</div>${warn}<div class="cards">${spc}${cards}</div>`;
      }
      const cards = DEFS.map((d, i) => `<button class="card def art" data-act="defCall" data-id="${d.id}"${i === 0 ? ' data-autofocus' : ''} aria-label="${d.name}, strong versus ${d.vs}, key ${d.key}"><span class="art-box">${defenseArt(d.id)}<span class="k">${d.key}</span></span><span class="nm">${d.name}</span><span class="ty">vs ${d.vs}</span><span class="ds">${d.desc}</span></button>`).join('');
      return `<div class="ph"><h2>Defense: ${esc(T.short)} has it, ${situ}</h2>${toBtn}</div>${warn}<div class="cards">${cards}</div>`;
    }
    case 'pre': {
      const pd = playById(g.offCall), dd = DEFS.find((d) => d.id === g.defCall);
      if (userOff) return `<div class="ph"><h2>${esc(pd.name)}</h2><p class="sub">${esc(pd.desc)}</p></div><div class="art-big">${offenseArt(pd.id)}</div>
        <div class="actions big">${btn('hike', 'HIKE ▶ <kbd>Space</kbd>', { cls: 'primary huge', auto: true })}${btn('changePlay', 'Change play')}</div>`;
      return `<div class="ph"><h2>Your defense: ${esc(dd.name)}</h2><p class="sub">${esc(T.short)} is lined up.</p></div><div class="art-big">${defenseArt(dd.id)}</div>
        <div class="actions big">${btn('hike', 'Ready ▶ <kbd>Space</kbd>', { cls: 'primary huge', auto: true })}</div>`;
    }
    case 'live': {
      const P = g.play;
      if (!P) return '';
      if (P.offTeam === g.user) {
        const pd = playById(g.offCall);
        const thr = pd.type === 'pass' && !P.thrown && canThrow(P);
        const recv = pd.type === 'pass' && !P.thrown ? SLOTS.map((s, k) => {
          const a = P.A[P.idx[s]];
          if (!a || a.role !== 'route' || !a.route) return '';
          return `<button class="rcv" data-act="throw" data-id="${s}"${thr ? '' : ' disabled'} aria-label="Throw to receiver ${k + 1}, ${BADGE_NAMES[k]}">${BADGES[k]}<b>${k + 1}</b></button>`;
        }).join('') : '';
        const c = P.A[P.carrier];
        const canJuke = P.ball.st === 'held' && (c.slot !== 'QB' || P.handed || P.scramble) && c.side === 'O';
        return `<div class="live-bar"><div class="ph"><h2>${esc(pd.name)}</h2></div><div class="art-big live-art">${offenseArt(pd.id)}</div>${recv ? `<div class="rcvs" role="group" aria-label="Receivers">${recv}</div>` : ''}
          ${btn('juke', 'JUKE <kbd>J</kbd>', { cls: 'juke', disabled: !canJuke })}
          <p class="hint">${pd.type === 'pass' && !P.thrown ? 'Tap an open receiver<span class="kb-only">, or press his number</span>.' : 'Steer <span class="kb-only">with arrows/WASD or </span>by dragging on the field.'}</p></div>`;
      }
      if (P.intRet) return `<div class="live-bar">${btn('juke', 'JUKE <kbd>J</kbd>', { cls: 'juke' })}<p class="hint">Interception! Steer the return.</p></div>`;
      return `<div class="live-bar"><div class="ph"><h2>Your defense: ${esc(DEFS.find((d) => d.id === g.defCall).name)}</h2><p class="sub">${esc(T.short)} runs ${esc(playById(g.offCall).name)}</p></div></div>`;
    }
    case 'result': {
      const log = g.log.slice(-4).reverse().map((l) => `<li><span class="lq">Q${Math.min(4, l.q)} ${l.clock}</span> ${esc(l.text)}</li>`).join('');
      return `<div class="ph"><h2>${esc(g.lastResult ? g.lastResult.text : '')}</h2>${toBtn}</div>
        <div class="actions">${btn('cont', 'Continue ▶ <kbd>Space</kbd>', { cls: 'primary', auto: true })}${S.ui.canReplay ? btn('replay', S.ui.replaying ? 'Replaying…' : 'Replay <kbd>R</kbd>', { disabled: !!S.ui.replaying }) : ''}</div><ul class="log">${log}</ul>`;
    }
    case 'pat': {
      if (g.tryFor !== g.user) return '<div class="ph"><h2>Try…</h2></div>';
      return `<div class="ph"><h2>Touchdown! Choose the try</h2></div><div class="cards two">
        <button class="card special" data-act="pat" data-id="kick" data-autofocus aria-label="Kick for one point, key 1"><span class="k">1</span><span class="nm">Kick (1 pt)</span><span class="ds">A 20-yard kick</span></button>
        <button class="card special" data-act="pat" data-id="two" aria-label="Go for two points, key 2"><span class="k">2</span><span class="nm">Go for 2</span><span class="ds">One play from the 3</span></button></div>`;
    }
    case 'kick': {
      if (g.kick && g.kick.user && !S.settings.autoKick) return `<div class="ph"><h2>${g.kick.kind === 'pat' ? 'Kick the try' : `Field goal: ${g.kick.dist} yd`}</h2><p class="sub">Stop the needle in the green.</p></div>
        <div class="actions big">${btn('kick', 'KICK <kbd>Space</kbd>', { cls: 'primary huge', auto: true })}</div>`;
      return `<div class="ph"><h2>${g.kick && g.kick.kind === 'pat' ? 'The try…' : 'Field goal attempt…'}</h2></div>`;
    }
    case 'kickoff': case 'kickfly': {
      const k = g.kickAnim;
      const lbl = !k ? '' : k.kind === 'punt' ? 'Punt' : k.kind === 'free' ? 'Free kick' : k.kind === 'kickoff' ? 'Kickoff' : k.kind === 'pat' ? 'The try is up…' : 'The kick is up…';
      return `<div class="ph"><h2>${lbl}</h2></div><div class="actions">${btn('skipAnim', 'Skip ▶', { auto: true })}</div>`;
    }
    default: return '';
  }
}
