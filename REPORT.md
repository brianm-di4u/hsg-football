# REPORT: Friday Night Spa City (`games/football`)

## What was built

An original high-school football game set in Garland County, Arkansas, shipped as one self-contained
`index.html` (≈250 KB). It is built from `src/` with `node shared/tools/inline.mjs games/football`, after
`node games/football/tools/build-data.mjs` copies `shared/data/schools.json` and the halftime facts into `data/`.

- **Call it, then play it.** Every snap starts with a call from an original 10-play playbook (four runs, six
  passes) plus Punt, Field Goal and Kneel when they apply. Then the play runs as a real-time top-down simulation
  of all 22 players:
  - routes, zone and man coverage, a run fit and a QB spy;
  - pass and run blocking with sheds;
  - throws led along the receiver's route, then catches, drops, break-ups and returnable interceptions;
  - pursuit angles, missed and diving tackles, sacks, fumbles, safeties and pick-sixes.

  The player steers the ball carrier (arrows/WASD or a touch drag), jukes (J / button), and throws by number key,
  badge button or tapping the receiver. Assists cover every skill: auto-run, auto-QB and auto-kick.
- **Defense.** Six original calls, each with a "strong vs" line, against a situational AI offense. The AI punts,
  kicks, goes for it, passes when desperate and kneels with a late lead.
- **Kicks.** Kickoffs (touchback at the 20) and punts are resolved, then animated with coverage and return units.
  Field goals and tries use a one-press accuracy needle whose green zone narrows with distance and the kicker's
  rating.
- **Full game rules (presented as game rules).**
  - 4 downs, a 25-second runoff, clock stops, 3 timeouts per half and halftime kickoffs.
  - 2-point tries, safeties with a free kick.
  - Tiebreaker overtime from the 10.
  - Quarter length 4, 8 or 12 minutes.
- **Modes.**
  - *Exhibition* (any 2 of the 10 teams, home/away).
  - *Season*: the invented 10-team **Spa City Cup** league (the 7 real schools plus 3 fictional towns), 9 or 5
    weeks. It has a valid round robin with Rivalry Week bookends (Lakeside at Lake Hamilton in week 1, Lakeside at
    Hot Springs last), play or quick-sim each week, standings with tiebreaks, a top-4 playoff, the Cup final at a
    neutral site, a champion ceremony and the next season with graduation and progression.
  - Three *Challenges*: Two-Minute Drill, Goal-Line Stand, and Rivalry Renewed at Wolf Stadium.
- **Hot Springs content.** These come from `schools.json` and the audited trivia bank:
  - real school names, mascots, classifications, title years ("1934 (shared)"; 1942 not claimed), and
    "game colors" labels where colors are unconfirmed;
  - venues named only where confirmed (Joe C. Reese Stadium, Wolf Stadium);
  - rivalry fact lines and 16 halftime fact cards with sources.

  Original geometric mascots are drawn in code for all 10 teams. Every player is a generated fictional name.
- **Presentation.**
  - Night-stadium title and splash art: light towers, the Arlington/Medical Arts silhouette skyline, pine
    ridges, lake bands, and a split-diagonal rivalry splash.
  - On the field: a cached field layer with team end zones, stands with crowd dots and light-tower glows; offense
    circles and defense squares; home dark and away light jerseys.
  - Effects: a ball arc with shadow and trail, hit rings, a TD burst, toasts, and the Cup with confetti.
  - WebAudio cues: whistle, hike, pads, kick, crowd, band stinger, horn, groan.
  - Day and Night themes, text size 100/115/130%, reduced motion, keyboard-only play, and autosave/continue.

## Acceptance criteria (PRD §12)

| AC | Status | Evidence / note |
|---|---|---|
| AC1 seven real schools + 3 fictional | **Met** | screens › exhibition team select (03): 10 cards, fictional towns labelled. No other real school is a team; Stuttgart, Blytheville and De Queen appear only in fact text |
| AC2 colors, "game colors" label | **Met** | the four unconfirmed schools carry the tag (03, 29) |
| AC3 venues | **Met** | "Wolf Stadium", "Jessieville home field", "Lakeside home field"; the Cup final is at "a neutral site" (05, 06, 06b) |
| AC4 generated, deterministic rosters | **Met** | season › roster: 34 players, same names on regeneration, "All players are fictional" (31) |
| AC5 halftime fact with source | **Met** | modes › halftime fact matches a team on the field and shows "Source: …" (20) |
| AC6 mascots for all 10 | **Met** | 04-mascots; every canvas painted |
| AC7 playbook + specials | **Met** | 10 plays on 1st down (08); punt/FG offered on 4th down in range; Kneel when leading late (AI test) |
| AC8 formation + snap | **Met** | 22 players, route previews, HIKE / Space (10) |
| AC9 throws | **Met** | key 2, the badge button and a tap on the receiver all throw; catch / drop / break-up / INT outcomes (11, 11b, 12) |
| AC10 auto-QB on/off | **Met** | on: throws on a read; off: the QB holds until the sack |
| AC11 steering + juke | **Met** | arrow keys move the runner; a real CDP touch drag moves him left on mobile; J jukes (14, 46) |
| AC12 blocks, sheds, sacks, tackles | **Met** | blocks on 24/24 plays; balance tool (below) |
| AC13 downs | **Met** | rules › downs, goal-to-go, turnover on downs (15) |
| AC14 scoring | **Met** | TD 6, kick 1, two-point 2, FG 3, safety 2 + free kick (16, 17) |
| AC15 kick needle | **Met** | 37-yd FG good at e=0.02, missed at 0.95, miss spot rule; auto-kick (18) |
| AC16 kickoffs and punts | **Met** | animated with coverage and return units (07, 19); touchbacks at the 20 |
| AC17 clock and quarters | **Met** | live time + 25 s runoff at the snap, quarter breaks, halftime kickoff by the opening receiver, timeouts reset (21) |
| AC18 timeouts | **Met** | T cancels the runoff; no timeout while the clock is stopped |
| AC19 overtime | **Met** | series from the 10, a winner after both sides (22) |
| AC20 AI situational calls | **Met** | 30/30 punts on 4th & 9 at own 25, 30/30 FGs on 4th & 6 at opp 15, 30/30 kneels when leading late |
| AC21 final screen | **Met** | quarter-by-quarter score, team stats, leaders for both teams, Player of the Game (23) |
| AC22 season setup and schedule | **Met** | 45 distinct pairs, everyone plays once a week, Rivalry Week bookends (29, 30) |
| AC23 weeks and standings | **Met** | played game recorded, the other 4 games simmed, recap, standings, "Sim game" (32) |
| AC24 playoffs and champion | **Met** | top-4 seeds follow standings, Cup final, champion screen with cup and confetti (33, 34) |
| AC25 roster screen | **Met** | starters highlighted, class year, key ratings (31) |
| AC26 next season | **Met** | seniors graduate, 34 players, 2027 schedule (35) |
| AC27 exhibition setup | **Met** | any two teams, home/away, quarters, difficulty (05) |
| AC28 challenges | **Met** | exact situations for Two-Minute Drill and Goal-Line Stand; completion recorded on a win (24–26) |
| AC29 title + Continue | **Met** | Continue appears only with a save (01, 01b) |
| AC30 help + settings | **Met** | four help tabs, all settings (40–41) |
| AC31 field render | **Met** | lines, numbers, hashes, team end zones, LOS and first-down lines, circles vs squares, home dark / away light |
| AC32 juice | **Met** | camera follow, ball arc, shadow and trail, hit rings, TD burst (16b), toasts. Motion was checked on stills and by state only |
| AC33 audio | **Met** | context created on a gesture; M mutes; volume slider. **Not listened to** (headless) |
| AC34 keyboard only | **Met** | title → exhibition → toss → kickoff → 3 snaps → pause → quit, all by keyboard (42). A full game to the final by keyboard is the same loop but is not automated end to end |
| AC35 contrast | **Met** | DOM contrast walk over 20 screens in both themes: no pair under 4.5:1 |
| AC36 reduced motion | **Met** | no toast animation, no TD burst, no shake, instant camera (44) |
| AC37 text 130% | **Met** | no overflow on game, panel or season screens (45, 45b). The phone scorebug keeps fixed sizes so it never clips |
| AC38 mobile | **Met** | `checkLayout` in every test; every visible control ≥ 44 px; touch drag and tap tested with real touch |
| AC39 save / continue / blocked storage | **Met** | exact situation restored after reload; season restored; with `localStorage` throwing the game plays and Settings says saving is unavailable (47) |
| AC40 single file, no requests, no errors | **Met** | 249 KB; the harness blocks external requests and fails on console errors: none |
| AC41 performance | **Met** | see Performance |
| AC42 balance | **Met** | see Balance |

## Test results

`node shared/test-harness/run.mjs games/football --milestone final`: **74/74 passed** (desktop 1280×800 and
mobile 390×844), with no console errors and no external requests.

- 9 test files cover the matrix in `DEV-PLAN.md` §4: screens, play, rules, modes, season, a11y, touch, perf.
- **93 screenshots** are in `screenshots/final/` (46 desktop, 47 mobile). Every one was inspected through the 14
  contact sheets, with full-size checks of the field, mascot and kick shots. The shots changed by the last fixes
  (18, 19, 45, 46) were re-checked after the last run.
- `screenshots/index.html` is the current gallery.
- **30 defects** were found and fixed: in tests, the balance tool and screenshot review (`DEV-PLAN.md` §5).
  - Bugs: a save overwritten at boot, focus lost after a re-render, touch steering ignored on designed run paths,
    and an import cycle.
  - Sim realism: receivers unable to cut, no sacks, deep balls averaging 28 yd.
  - Visuals: an upside-down end zone, a clipped phone scorebug.
- Milestone runs: m1 6/8 → 8/8, m2 49/52 → 52/52, m3 64/74 → 74/74, m4 74/74, final 74/74.

## Performance

| Metric | Value | Budget |
|---|---|---|
| `index.html` | 249 KB (data ≈ 18 KB) | ≤ 2 MB (target < 400 KB) |
| Interactive (`loadMs`) | ≈ 52 ms | ≤ 2 s |
| FPS during a live play / a punt (desktop) | 60.4 / 60.8 | ≥ 55 |
| JS heap | 9.5 MB | < 30 MB |
| Idle | the render loop stops when nothing moves (`getState().loop === false`) | render on demand |

The field is drawn once per size, DPR, theme and matchup into an offscreen layer. Each frame blits that layer and
draws 22 players, the ball and effects. HTML regions are rewritten only when their markup changes, and the live
panel at most every 100 ms.

## Balance (tools/balance.mjs, PRD AC42)

`node games/football/tools/balance.mjs --plays 400 --games 40 --quarter 12` runs the real sim in Node.

| | Result | PRD target |
|---|---|---|
| Run average (4 runs vs a mix of the 6 defenses) | 3.2 yd | 3–6 |
| Completion | 54% | 50–70% |
| Sack rate | 3.4% of pass plays | 3–10% |
| Interception rate | 2.4% | 1.5–5% |
| AI-vs-AI points per team, 12-min quarters | 34.7 (146 plays/game) | 14–40 |
| AI-vs-AI points per team, 4-min quarters (default) | 12.1 (55 plays/game) | scaled |
| Plays hitting the 18 s safety cap | 0 (longest 17.1 s) | none |

The `--matrix` view shows real counters between calls. For example, Bathhouse Dive gets 7.7 yd vs Deep Shell but
0.2 vs Fire Blitz, and Promenade Slants gets 19.6 yd vs Run Stuff.

## Known gaps

- **Arlington Verticals is the strongest call** (17 yd/play on average, 48% completions, 13% TDs). Deep Shell
  holds it to about 12 and Fire Blitz to about 8, but players can lean on it. The AI doesn't overuse it. A future pass could add a
  free-safety "robber" or make deep shots more arm-dependent.
- **Steam Vent Draw (2.2 yd) and Ridge Keeper (2.8 yd) are weak** outside their counters (Deep Shell / Base Zone).
- **Sound was not listened to.** The cues are short, quiet synth presets and need a human ear.
- **No screen-reader pass.** The scorebug and toasts are live regions and buttons are labelled, but nobody has
  played it with a screen reader. The field itself is a canvas.
- **Phone field scale.** At 390 px wide, players are 6 px dots without numbers. Shapes and badges keep them
  readable, but it's tight.
- **Quick sim vs played games.** "Sim game" and every other league game use a separate drive model tuned to
  similar scores. Player season stats count only games the user played.
- **Game simplifications** (by design, PRD §13): no penalties, onside kicks, injuries or substitutions; no side
  switch; kickoff and punt returns are resolved and animated, not simulated player by player; the user doesn't
  control a defender (except on interception returns).
- **Fictional names** are random combinations of common first and last names. A combination could match a real
  person by chance; every roster screen says all players are fictional.
- **Data conflict reported, not fixed (outside this folder):** `shared/data/schools.json` says the Lakeside–Lake
  Hamilton series was "renewed in August 2023 after a 19-year break". The audited trivia bank (hs-0252, hs-0253;
  Sentinel-Record 2017) says it resumed in **2018**, which fits 1999 + 19. The game avoids stating a renewal
  year. The coordinator should correct `schools.json` (details in `research/town-content.md` §2). **Resolved by the coordinator:** `schools.json` now says the series resumed in 2018 (announced June 2017), and the game was rebuilt.

## Harness requests

1. **`t.touchDrag` can't hold at the end.** `holdMs` waits after `touchStart` and before the moves. Any
   "drag and keep the finger down" interaction (steering, aiming) needs a hold after the last move. Football drives
   CDP from the test instead (`tests/touch.test.mjs`). Suggest `{holdEndMs}`.
2. **Camera settling and `isIdle()`.** Shots taken right after state hooks need the game loop to run once. A
   `t.waitFrames(n)` helper would make that explicit instead of relying on `waitForStable`.
3. **`--only` matches test names, not files.** A `--file` filter would make re-running one suite easier.
