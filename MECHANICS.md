# MECHANICS: Friday Night Spa City

The core-mechanics foundation, synthesized from `SAMPLES.md`. The PRD says *what*; this says *how*.

## 1. Module map (`src/js/`)

| Module | DOM? | Role |
|---|---|---|
| `rng.js` | no | mulberry32 (public domain, bryc) with saved state: `next, int, range, pick, normal, chance` |
| `data.js` | no | school records from the inlined `SCHOOLS` (a copy of `shared/data/schools.json`), the three fictional teams, halftime facts, venue text |
| `roster.js` | no | fictional name generator, player ratings, depth chart, overall ratings, season progression |
| `plays.js` | no | offensive playbook, defensive calls, formations (pure data) |
| `steer.js` | no | `seek` / `pursue` helpers (adapted from rharel/js-steering-behaviors, MIT) |
| `sim.js` | no | one live play: 22 agents, blocking, coverage, throws, catches, tackles, result |
| `rules.js` | no | the game flow: downs, distance, clock, scoring, kicks, PAT, timeouts, halves, overtime, stats |
| `ai.js` | no | situational offensive and defensive play-calling, kick and timeout decisions |
| `league.js` | no | round-robin schedule, quick sim, standings and tiebreaks, playoffs, next season |
| `art.js` | yes | mascots, uniforms, skyline and pine-ridge backdrops, trophy, cached sprites |
| `field.js` | yes | field layer cache, camera, players, ball, overlays (routes, receiver shapes, kick meter) |
| `audio.js` | yes | WebAudio synth cues |
| `ui.js` | yes | HTML screens and panels |
| `main.js` | yes | the single state object, loop, input, save/load, `window.__game` |

Everything marked "no DOM" also runs in Node: `tools/balance.mjs` imports `sim.js`, `rules.js`,
`ai.js` and `league.js` directly (via `src/package.json` `{"type":"module"}`) to check outcome
distributions and play whole AI-vs-AI games headless.

## 2. Game loop and timing

- Fixed tick **1/60 s**, MDN accumulator pattern: `ticks = floor((now - last) / TICK)`, clamped to 15
  ticks per frame (a hidden tab pauses the play rather than fast-forwarding it).
- **Render on demand.** `requestAnimationFrame` runs only while something moves (a live play, the
  camera easing, a kick animation, toasts, confetti). Otherwise the canvas is static and the loop stops.
  `wake()` restarts it.
- `step(n)` runs `update()` n times synchronously; `pause()` / `resume()` gate the accumulator.
- **Play speed** setting scales sim ticks per real second (1×, 1.5×, 2×). The sim itself always steps at
  1/60 s, so results are identical at every speed.
- Defensive plays (the AI has the ball) run at 1.5× by default.

## 3. State model (one serializable object)

```js
S = {
  v: 1, scene: 'title', rng: <uint32>,             // rng state is saved and restored
  settings: { sound, volume, motion, theme, textScale, quarterMin, difficulty,
              autoQB, autoKick, autoContinue, playSpeed },
  game: null | {
    mode: 'exhibition'|'season'|'challenge', teams: [teamA, teamB],  // teams[0] is the user's
    home: 0|1, venue, rivalry, quarter: 1..4 (5+ = OT), clock: seconds,
    score: [a, b], poss: 0|1, ballOn: 0..100 (from the offense's own goal), down, toGo,
    timeouts: [3, 3], phase: 'toss'|'kickoff'|'call'|'pre'|'live'|'result'|'pat'|'kick'|'break'|'final',
    offCall, defCall, play: null | <sim state>, lastResult, log: [...], stats: {...},
    ot: null | { round, first, turn }, challenge: null | {...},
    kickoffTo, secondHalfReceiver, drive: {...}
  },
  season: null | { year, userTeam, teams: [...10], schedule: [[...weeks]], week, results,
                   standings, playoffs, champion, history },
  challenges: { twoMinute: false, goalLine: false },
  ui: { tab, focus, toast, fx }                     // not saved
}
```

Teams carry their roster: `{ id, name, short, abbr, mascot, colors, tier, cls, fictional, players: [...] }`.
A player is `{ id, first, last, num, pos, yr, r: { spd, str, agi, hnd, thr, acc, tkl, cov, blk, awr, kck } }`.

## 4. Coordinates

- The field is **53.33 × 120 yd** (two 10-yd end zones). Absolute frame: `x` from the left sideline,
  `y` from the back of the *bottom* end zone. **The user's team always defends the bottom end zone and
  attacks up the screen** (there is no side switch by quarter; this is a game simplification).
- `ballOn` is yards from the offense's own goal line. When team 0 has the ball, `losY = 10 + ballOn`
  and forward is +y. When team 1 has the ball, `losY = 110 − ballOn` and forward is −y.
- `sim.js` works in **offense-local** coordinates: `lx` (0..53.33 from the offense's left) and `ly`
  (yards past the line of scrimmage). `toAbs()` mirrors both axes when the offense attacks down, so a
  play design looks the same from behind the offense either way.
- Hash marks: the ball spots on the nearer hash (`x = 17.8` or `35.5`) after a play that ends outside
  them, otherwise where it was downed. This is a game rule, written in How to Play.

## 5. One play (`sim.js`)

`createPlay(offTeam, defTeam, offCall, defCall, spot, rng, opts)` returns a plain object.
`stepPlay(play, dt, input)` advances it, and `play.result` is set once the ball is dead.

### Agents
22 agents `{ side, pos, slot, x, y, vx, vy, maxV, acc, role, state, target, engaged, cd, ... }`.
- Top speed `maxV = 5.6 + spd × 0.033` yd/s (7.3 at 50, 8.6 at 90). Acceleration 10–14 yd/s² by agility.
- Carrying the ball costs 6% of top speed; a pursuer within 5 yd of the carrier gets +6%.
- Movement splits the velocity change into speed-up (capped at `acc`), braking (2.2 `acc`) and sideways cuts (2.4 `acc`), so routes and jukes cut sharply.

### Offensive roles
- **Line (5 OL).** Pass pro: offset-pursue a point 1 yd in front of the assigned rusher on the
  rusher→QB line (Reynolds offset pursuit). Run: drive the defender across from them toward the
  play side. Screens: release downfield after 1.0 s.
- **Routes.** Each eligible receiver (`WR1, WR2, WR3, TE, RB`) follows waypoints in local yards
  (`[[dx,dy],…]`, mirrored for the left side), then keeps its last heading at 85% speed. Route types:
  go, slant, out, in/dig, curl, post, corner, flat, drag, seam, wheel, check, block.
- **QB.** Drops 3/5/7 yd (by play), or takes the mesh for a run or fake. Holds until a throw. A
  throw comes from the user, or from the **auto-QB** read: after `readT = 1.1 + (70 − awr) × 0.01` s,
  throw to the most open developed route. Openness is the gap to the nearest defender at the predicted catch
  point (the receiver is projected **along his route**, `predictRoute`), plus a bonus when the throw reaches the
  sticks on 3rd down, minus 0.06 per yard beyond 12. Pressure must last `0.62 − awr × 0.004` s (a free rusher
  inside 2.2 yd) before the QB hurries a throw to the best target or throws it away. A QB wrapped up inside
  1.05 yd usually can't get the ball off.
- **Runs.** The RB's path runs through the mesh point; the ball transfers when the RB is within 1 yd
  of the QB after `meshT`. The aim point is the hole (`gap −3…3` → x offset), then open field.

### Defensive roles (per call)
- **Rush.** Seek the QB (or the carrier) around blockers; shed rolls while engaged.
- **Man.** Trail an assigned receiver with a reaction lag of `0.35 − cov × 0.003` s and a cushion by call
  (press 1 yd, off 5 yd).
- **Zone.** Drop to a landmark (deep third, deep half, hook, flat), then pursue the most dangerous
  receiver inside the zone radius.
- **Spy.** Mirror the QB at 5 yd depth.
- **Run fit.** Read for `0.45 − awr × 0.004` s (faster on *Run Stuff*), then pursue the carrier.
- After a handoff, catch or QB scramble, every unengaged defender switches to **pursue**: predict the
  carrier's position `d / (v × 1.6)` s ahead, then seek it.

### Blocking
A blocker engages when within 1.1 yd of its target. While engaged, the pair moves together. The
defender drifts toward its goal at `0.4 + (dStr + 0.3 dAgi − k × oBlk) × 0.03` yd/s (k = 1.42 for run blocks,
1.3 otherwise; negative values drive it back). It sheds with a per-second hazard
`0.3 + ((dStr + dAgi)/2 + 7 − oBlk) / 110` (×0.75 on run blocks, ×1.6 for lead blocks in space, ×2.5 next to the
carrier). After a shed, the blocker is beaten for 0.9 s.

### Ball carrier
- **Auto-run (default when no input):** the steering sum is
  - a forward pull,
  - repulsion from each defender within 7 yd in the forward 200° cone (weight `1/d²`, pushed sideways
    away from it),
  - a mild pull toward the blocker in front,
  - and a sideline push inside 2 yd.
  The result is normalized and seeked at top speed.
- **Steering:** arrow keys / WASD, or a touch drag on the field (the vector from touch start).
  Input is in screen space, so "up" is always toward the goal the user attacks.
- **Juke** (J / Shift / button): once every 1.4 s, a 0.45 s window with a lateral burst of 2.5 yd/s
  that cuts tackle chance by 0.35. The AI carrier jukes with probability `agi / 250` when contact is near.

### Throws and catches
- Ball speed `17 + thr × 0.08` yd/s. Lead: iterate three times on `T = dist / speed`, projecting the receiver
  along his remaining route waypoints. Inaccuracy: Gaussian offset with σ = `0.35 + (100 − acc)/70 + pressure × 0.7 + air/32` yd.
- The ball is drawn with a height arc `z = 4 h t (1 − t)`, where `h` grows with distance.
- **On arrival:**
  - Out of bounds or past the end line: incomplete.
  - Otherwise the closest defender within 1.2 yd may intercept (`0.04 + cov × 0.0016`) or break it up
    (`0.35`).
  - Else a receiver within 1.4 yd catches with `0.60 + hnd × 0.0035 − 0.25 × contested − 0.011 × (air − 15)⁺`.
  - Else incomplete.
- A catch makes the receiver the carrier.

### Tackles
- An unengaged defender within 0.95 yd of the carrier (1.35 yd for a diving chaser from behind, at 0.6×), with
  its cooldown done, rolls `p = 0.55 + (tkl − (str + agi)/2) / 200`. Then:
  - +0.14 per extra defender within 1.5 yd;
  - −0.35 during a juke;
  - −0.08 if the carrier is at top speed and the tackler is approaching from behind;
  - clamped to [0.15, 0.95].
- A miss gives a 0.7 s cooldown at 40% speed.
- A made tackle ends the play at the carrier's spot plus 0.5 yd of forward fall.
- **Fumble** on a made tackle: 1.2% (+1% for gang tackles), and 55% of fumbles are recovered by the
  offense. Fumbles resolve on the spot, without loose-ball physics.

### Ends of plays
- Tackle (or sack, if the QB holds the ball behind the line on a pass play).
- Out of bounds (|x| within 0.3 yd of a sideline).
- Touchdown (`ly ≥ yardsToGoal`) or safety (downed in the offense's own end zone).
- Incomplete or interception. An interception return is simulated, with the defender as carrier and
  everyone pursuing.
- 18 s safety cap (long breakaways need about 13 s).

`play.result = { kind: 'tackle'|'oob'|'td'|'safety'|'inc'|'int'|'sack'|'fumble'|'throwaway', yards,
carrierPos, passer, target, airYards, defender, elapsed, clockStops }`.

## 6. Game rules (`rules.js`)

- 4 quarters of `quarterMin` (4/8/12; default 4). The clock runs during live plays (sim time).
  - **Runoff between plays:** 25 s if the clock was running.
  - **No runoff** after an incompletion, out of bounds, a score, a change of possession, or a timeout.
- 3 timeouts per team per half. The AI uses them late when trailing.
- 4 downs to gain 10. A first down resets. Turnover on downs.
- **Scoring:** TD 6, PAT kick 1 / try from the 3 for 2, FG 3, safety 2 (the scored-on team then kicks).
- **Kickoff** from the kicking team's 40.
  - Distance `45 + kck × 0.2 ± N(0, 5)`.
  - Into the end zone: touchback at the 20.
  - Otherwise the return is `max(0, N(19 + (spd − 60) × 0.25, 8))`, with a 1.5% house call.
  - It animates: ball arc, then the returner's dash.
- **Punt:** net `33 + kck × 0.12 ± N(0, 5)`, then a return of `max(0, N(5, 5))`. A punt into the end zone
  is a touchback at the 20.
- **Field goals and PATs:**
  - The user kicks through a sweeping accuracy needle: one press, error `e ∈ [−1, 1]`.
  - The kick is good if `|e| ≤ tol` and the distance ≤ `range`, with `tol = 0.30 + kck × 0.004 − (dist − 20) × 0.006`
    and `range = 38 + kck × 0.22`.
  - AI kicks and **Auto-kick** draw `e ~ N(0, 0.24 − kck × 0.0012)`.
  - Kick distance = 100 − ballOn + 17 (10 for the end zone plus a 7-yd hold).
- **Halftime:** the team that received the opening kickoff kicks off to start the second half.
- **Overtime (game rule):** each team gets one series from the opponent's 10, with 1st-and-goal and
  normal downs. The team that won the coin toss chooses to go second. Tries after OT touchdowns are
  normal. Rounds repeat until one team leads after both have had a series. There's no clock in OT.
- **Stats** per player (attempts, completions, pass yards, TD, INT, rushes, rush yards, receptions,
  receiving yards, tackles, sacks, kicking) and per team (first downs, total yards, turnovers).
  They feed the box score and Player of the Game.

## 7. AI (`ai.js`)

- **Offense** picks a play by situation, then by weighted tendencies:
  - 4th down: FG when in range and (toGo > 2, or the end of the half or game), go for it on 4th-and-≤2
    between the 40s, or when desperate. Otherwise punt.
  - *Desperation* (down late, or down 9+ in the 4th): 85% passes, deep-weighted.
  - *Protect lead* (up in the 4th, under 2:30): runs, then kneel when the clock can be run out.
  - 3rd/4th & long: passes. Short yardage: dive, keeper, sweep.
  - Otherwise 55% run / 45% pass, shifted by the team's QB vs RB ratings.
  - Difficulty adds or removes randomness (temperature).
- **Defense** reads the situation, not the call: long yardage → *Deep Shell* or *Man Press*; short →
  *Run Stuff*; red zone → *Man Press* or *Run Stuff*; plus a *Fire Blitz* rate of 8% / 12% / 16% by
  difficulty.
- **PAT:** go for 2 when down 2 late, or when the score margin chart says so; otherwise kick.
- **Timeouts:** in the 4th when trailing and the clock would run, and before the half when in field-goal range.

## 8. League (`league.js`)

- 10 teams (7 real + 3 fictional). Circle-method round robin of 9 rounds, then rounds are permuted
  so that **week 1 holds Lakeside–Lake Hamilton** and the **last regular week holds Hot Springs–Lakeside**
  whenever both can be satisfied (always, for this pairing set). A "Short season" plays rounds 1–5.
- **Quick sim:** each team gets `10 + int(rng, 3)` possessions. Each possession rolls TD / FG / punt /
  turnover from `diff = off − def` (team composite ratings) with `pTD = 0.26 + 0.011 × diff` and `pFG = 0.12`,
  plus a home edge of +1.5. A tie goes to OT, decided by alternate rolls.
- **Standings:** W, L, PF, PA. Tiebreaks: head-to-head among the tied, point differential, points for,
  then a seeded coin.
- **Playoffs:** the top four. Semis are 1v4 and 2v3 at the higher seed; the Spa City Cup final is at a
  neutral site.
- **Next season:** seniors graduate, the rest grow `+N(3, 2)` per rating, and sophomores are generated
  to refill the depth chart. Team identity and tier stay the same.

## 9. Rendering and layers

1. **Field layer** (offscreen canvas per size/DPR/theme): stands and crowd dots beyond the sidelines,
   grass stripes every 5 yd, yard lines, numbers, hashes, end zones in team colors with school short
   names, the home mascot at midfield. Built once per resize or theme change.
2. **Dynamic layer** (main canvas each frame): camera-translated blit of the field, line of
   scrimmage (blue) and first-down line (gold), route previews during "pre", players, ball and shadow,
   receiver shape badges, the juke trail and the kick needle.
3. **HTML overlays:** scorebug, play-call panel, action bar, toasts, modal screens. Each region is
   rewritten only when its HTML string changes.
4. **Title and splash art** are drawn to their own canvases: night sky, light towers, the skyline or
   pine ridge or lake band, and mascots cached per school and size.

Players are drawn as **circles (offense)** and **rounded squares (defense)**, so shape never depends on
color. Home teams wear their primary jersey; away teams wear the light jersey (accent) with primary
trim. Numbers are drawn on desktop; on narrow screens, where a player is under 7 px, only the shapes
and the eligible-receiver badges are drawn.

**Camera:** the vertical window is set by pixels per yard (`fit 57 yd of width`, capped at 15 px/yd).
The camera eases toward the ball (`k = 6/s`, instant under reduced motion). While the play-call
sheet covers the lower screen on mobile, the line of scrimmage is kept in the uncovered part.

## 10. Input

| Action | Keyboard | Mouse / touch |
|---|---|---|
| Move focus through play cards | arrows / Tab | — |
| Choose play | 1–9, 0, Enter | tap card |
| Snap | Space | HIKE button |
| Throw to receiver | 1–5 (◆ ● ▲ ■ ★) | tap the receiver, or its badge button |
| Steer the carrier | arrows / WASD | drag on the field |
| Juke | J or Shift | JUKE button |
| Kick needle | Space | tap anywhere or KICK |
| Timeout | T | Timeout button |
| Pause / menu | Esc / P | ⏸ button |
| Mute | M | sound button |

Pointer events are used throughout. `setPointerCapture` is wrapped in try/catch, because synthetic
pointers throw.

## 11. RNG

One `rng` drives everything: rosters, play outcomes, AI choices and the quick sim. Its 32-bit state is
in `S.rng` and is saved. `seed(n)` resets it. Rosters derive a sub-seed from `hash(schoolId + year)`,
so a school's roster is stable for a season regardless of play order.

## 12. Save format

`localStorage['hsg.football.v1'] = JSON.stringify({ v: 1, settings, season, game, challenges, rng })`.
It is written after every dead ball, kick, scene change and settings change. Each read and write is
wrapped in try/catch. If storage is missing or throws, the game runs from memory and Settings says
"Saving unavailable". A bad or old version is ignored.

## 13. `window.__game` (summary; full spec in DEV-PLAN §3)

`seed, getState, setState, isIdle, step, pause, resume, scene, newGame, act`. `act` covers every
player action (`call`, `defCall`, `snap`, `throw`, `steer`, `juke`, `kick`, `pat`, `timeout`,
`advance`, `coin`, `simGame`, `simWeek`, `finishPlay`, `autoplay`, `layout`, `animAt`).
`isIdle()` is false during a live play, kick animations, the camera ease, toasts entering, and screen
transitions. It ignores the ambient title light sweep and crowd shimmer.
