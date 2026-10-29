# PRD: Friday Night Spa City

## 1. Vision

Friday night under the lights in Garland County. You coach one of the county's seven real high
schools, with an all-fictional roster. You call every play, then live it: thread the runner through
the hole, pick the open receiver, and kick the winner with the clock at zero. It's quick to learn
and readable at a glance, and a game fits in a sitting. A season gives you a reason to come back.

### Pillars
1. **Call it, then play it.** Every snap is a decision (the call) plus a few seconds of skill (the run,
   the throw, the kick). Assist options make every skill part optional.
2. **Readable at phone size.** A top-down field drawn in code, shapes plus colors, one glance to know
   the down, distance and score.
3. **Hometown real, people fictional.** Real schools, colors, mascot concepts, title years and rivalries,
   each sourced. Every player is invented. Nothing implies endorsement.
4. **Friday-night juice.** Light towers, crowd swells, a band stinger on touchdowns, a satisfying cup
   ceremony.

### Target players
Casual sports fans and local players on laptop or phone, including people who don't know football
deeply (How to Play explains downs in one screen). It should also suit kids playing with parents:
no violence beyond tackles, and nothing mean-spirited.

## 2. Modes

| Mode | What | Length |
|---|---|---|
| **Exhibition** | Any two of the 10 teams, home/away, quarter length | 6–15 min |
| **Season** | Pick one of the 7 real schools. A 9-week (or 5-week short) round robin in the 10-team *Spa City Cup* league (invented), then a top-4 playoff and the Cup final. Play or quick-sim each game, view standings and roster, carry on to the next season | 1–2 h (short: 40 min) |
| **Challenges** | *Two-Minute Drill* (down 4, 2:00 left, own 30), *Goal-Line Stand* (up 3, opponent 1st & goal at your 8), *Rivalry Renewed* (Lakeside vs Lake Hamilton at Wolf Stadium, pick a side) | 2–10 min |

## 3. Rules (all are game rules; see How to Play)

- 11 per side, 4 quarters of 4 / 8 / 12 minutes (default 4). The game clock runs on live plays plus a
  25-second runoff between plays when the clock is running. It stops after incompletions, out of
  bounds, scores, changes of possession and timeouts.
- 3 timeouts per team per half.
- 4 downs to gain 10 yards. Touchdown 6, kicked try 1 or a try from the 3 for 2, field goal 3, safety 2.
- Kickoffs from the 40. A touchback (into the end zone) comes out to the 20. Punts are resolved and
  animated.
- The ball is spotted on the nearer hash after a play that ends outside the hashes.
- **Overtime:** each team gets one series from the opponent's 10. The coin-toss winner chooses to go
  second. It repeats until one team leads after both have had a series.
- Fumbles happen rarely on tackles and are resolved instantly. Interceptions can be returned.
  There are **no penalties** (out of scope).

### Offense playbook (original names)
| # | Name | Type | What it does |
|---|---|---|---|
| 1 | Bathhouse Dive | Run | Quick handoff straight up the middle |
| 2 | Central Avenue Sweep | Run | Toss wide; the guard pulls to lead |
| 3 | Steam Vent Draw | Run | Shows pass, then a delayed handoff up the middle |
| 4 | Ridge Keeper | Run | Fake handoff, QB keeps off tackle |
| 5 | Promenade Slants | Pass | Quick three-step slants, ball out fast |
| 6 | Arlington Verticals | Pass | Four deep routes; needs time |
| 7 | Hollow Curls | Pass | Curls at 10–12 yards, TE in the flat, RB check-down |
| 8 | Gorge Post-Corner | Pass | Post and corner to stretch a safety, slot dig underneath |
| 9 | Tufa Screen | Pass | Line releases; RB screen behind blockers |
| 10 | Fountain Play-Action | Pass | Fake the dive, TE drag and a deep crosser |
| — | Punt / Field Goal / Kneel | Special | Offered on 4th down, in range, or when leading late |

### Defensive calls
| Name | Idea | Strong vs | Weak vs |
|---|---|---|---|
| Base Zone | 4 rush, three deep, four under | balanced | nothing extreme |
| Man Press | Man on every receiver, one deep safety | quick passes | double moves, QB runs |
| Deep Shell | Two deep plus deep corners, soft underneath | deep passes | runs, short passes |
| Run Stuff | Eight in the box, quick run fits | runs | play-action, deep |
| Fire Blitz | Six to seven rush, zero coverage | slow-developing plays | quick slants, screens |
| Spy Squeeze | QB spy, zone underneath | QB keeper, screens | deep shots |

## 4. Hot Springs content map

| Where | Content | Source |
|---|---|---|
| Team select, season hub | 7 real schools: name, city, mascot, classification badge, game colors (labelled "game colors" when unconfirmed), football title years ("1934 shared") | `schools.json` |
| Mascot art | Original geometric mascots per `mascotConcept`, and fictional mascots for the 3 invented teams | `schools.json`; our art |
| Matchup splash | Venue: "Joe C. Reese Stadium" / "Wolf Stadium" where confirmed, else "<School> home field"; skyline (Arlington twin towers, Medical Arts setbacks) for Hot Springs & Lakeside home games; pine ridge for small schools; lake band for Lake Hamilton | `schools.json`; style guide |
| Rivalry Week | Lakeside–Lake Hamilton opens the season; Hot Springs–Lakeside closes it; split-diagonal color splash, rivalry fact card | `schools.json`; audited trivia |
| Halftime | One fact card per halftime from the audited bank or `schools.json`, with its source | `research/town-content.md` §3 |
| Credits | Data sources, "game colors", "all players fictional", invented league/cup/teams, no endorsement | — |

## 5. Screens and UX flow

```
Title ─┬─ Continue (if saved) ───────────────────────────────┐
       ├─ Exhibition → Team pick (you, opponent, home/away) → Pregame ─→ Game ─→ Final ─→ Title
       ├─ Season → School pick → Season hub (Schedule | Standings | Roster)
       │            └ Play week → Pregame → Game → Final → hub … → Playoffs → Champion / Season over
       ├─ Challenges → Challenge card → Game (starts mid-situation) → Result
       ├─ How to Play (tabs: Basics · Controls · Rules · Credits)
       └─ Settings
Game: Toss → Kickoff → [Call → Pre-snap → Live → Result] … Halftime (fact) … Final (box score, Player of the Game)
Pause (Esc): Resume · How to Play · Settings · Quit to title (game autosaved)
```

- **Game screen:** the scorebug at the top (both abbreviations and scores, quarter, clock, down & distance,
  ball spot, possession arrow and text, timeouts as pips). The field canvas fills the rest. When the
  user calls a play, a **play panel** docks right on desktop and bottom on mobile: a card grid with
  name, type icon and one-line description, with special cards first when relevant. On defense the
  panel shows the defensive calls.
- **Pre-snap:** route preview lines for your play (offense) and a HIKE button. On defense, the AI snaps
  after a short beat.
- **Live:** the action bar shows the receiver badges ◆1 ●2 ▲3 ■4 ★5 (pass plays, before the throw) and
  JUKE (once someone has the ball).
- **Result:** a toast (e.g. "+12 · FIRST DOWN", "TOUCHDOWN!", "INTERCEPTED"), a log line, and
  auto-continue after 1.6 s (or a tap; the Continue setting can turn auto off).

## 6. Art direction

- **Palettes:** UI chrome uses `deco-neon` (dark, default "Night") and `gilded-spa` (light, "Day"), from
  `shared/design/tokens.css`. Teams use `schools.json` colors. The field is deep green with 5-yard
  stripes; at night it gets light-tower glows from the four corners.
- **Typography:** `--font-neon` for the scorebug digits and big toasts, `--font-deco` for headings,
  `--font-sans` for body. System stacks only.
- **Mascots:** flat geometric shapes in team colors, built from the `mascotConcept` recipe. Never logos.
- **Stadium:** stands with dot-matrix crowd in both teams' colors, pennant strings, light towers. On the
  title and splash: night sky, stars, the skyline or pine ridge or lake, and the field glow.
- **Cup:** a stepped plinth with a dome cup. Confetti in the champion's colors.
- **Juice:** camera ease, a hit flash and small shake on big tackles (off under reduced motion), a ball
  arc with shadow, juke streaks, crowd shimmer on TDs, scoreboard pulses.

## 7. Audio direction

WebAudio synthesis only, short and quiet by default (master gain 0.5 of the slider, slider default
60%), with a mute toggle (M). Cues:
- referee whistle (on dead balls)
- hike call (a short noise burst)
- pad thump on tackles
- kick thump
- crowd swell on gains over 15 yd and on scores
- a band stinger (a brassy saw-wave arpeggio) on touchdowns
- an air horn at the end of quarters
- a groan on turnovers
- UI ticks

Audio is created on the first user gesture.

## 8. Accessibility

- **Keyboard-only play** for every screen and action (MECHANICS §10). Visible focus rings. Play cards
  answer to number keys.
- **Assists:**
  - *Auto-QB* throws if you haven't by the read time.
  - The carrier auto-runs whenever you're not steering.
  - *Auto-kick* replaces the needle.
  - Defensive plays need no real-time input.
- **Contrast:** all text is ≥ 4.5:1 on its background in both themes, checked by an automated DOM
  contrast walk.
- **Colorblind-safe:** offense is circles and defense is squares. Receivers carry shape badges plus
  numbers. Toasts carry words, never color alone. The possession indicator is an arrow plus the word "ball".
- **Reduced motion** (media query or setting): no shake, flash or confetti; instant camera; screens
  appear without fades. Play motion stays, since it is the game, and *Play speed* can be raised.
- **Text size** 100 / 115 / 130%.
- **Screen readers:** the scorebug and result toasts are `aria-live="polite"` regions, and buttons have labels.

## 9. Mobile and touch

Portrait-first at 390×844:
- the scorebug is two rows;
- the play panel is a bottom sheet with 2-column cards;
- the action bar's buttons are ≥ 44 px;
- you steer by dragging on the field and throw by tapping a receiver or its badge.

There's no horizontal scroll, and nothing is off-screen (`checkLayout`). Desktop at 1280×800: a
right-docked panel and a larger field.

## 10. Performance budgets

60 fps during live plays on a mid-range laptop (≥ 55 in the harness), HTML ≤ 2 MB (target < 400 KB),
`window.__game` ready in ≤ 2 s (target < 300 ms), JS heap < 30 MB. Render on demand when idle.

## 11. Save / load

Autosave after every dead ball and screen change. *Continue* resumes the exact situation, the
season, settings and challenge marks. The game works when `localStorage` throws, and Settings says
"Saving unavailable".

## 12. Acceptance criteria

**Content and data**
- **AC1** The game uses exactly the 7 schools from `schools.json` (names, mascots, classification, title
  years) plus 3 fictional teams labelled fictional. No other real school appears as a team.
- **AC2** Colors from `schools.json`; teams with `colorsConfirmed: false` show a "game colors" label on
  their team card.
- **AC3** Venue names only where `venueConfirmed: true`; otherwise "<School> home field". The final is
  at "a neutral site".
- **AC4** Every player name is generated (no fixed real names). Roster screens say "All players are
  fictional". The roster generator is deterministic per seed, school and year.
- **AC5** Halftime shows a fact with its source line, from the set in `town-content.md` §3.
- **AC6** Original mascot art is drawn in code for all 10 teams (no images, no network).

**Core play**
- **AC7** The offensive playbook shows 10 plays plus the specials that apply (Punt and FG on 4th
  down, FG when in range, Kneel when leading late). Defense shows 6 calls.
- **AC8** Calling a play aligns 22 players in the right formation. HIKE (Space or button) starts the play.
- **AC9** On pass plays the user can throw to any eligible receiver by key, badge button, or tapping the
  receiver on the field. The ball flies with lead and arc, and results in a catch, incompletion or
  interception decided by separation and ratings.
- **AC10** Auto-QB (on by default) throws on a read if the user doesn't; with it off, the QB holds
  until sacked or the user throws.
- **AC11** The carrier auto-runs; arrow keys / WASD / touch-drag steer them; JUKE gives a short
  burst that lowers tackle chances, with a cooldown.
- **AC12** Blockers engage and can be shed; rushers can sack the QB; defenders pursue and tackle with
  rating-based odds; missed tackles happen.
- **AC13** Downs, distance and the first-down marker update correctly; turnover on downs works.
- **AC14** Scoring: TD 6, PAT kick 1 or try for 2 (choice offered), FG 3, safety 2 (then a free kick).
- **AC15** Field goals and PATs use the needle meter (one press), and the result depends on accuracy,
  distance and the kicker. Auto-kick works.
- **AC16** Kickoffs (touchback at the 20, returns) and punts resolve with animation and correct
  field position.
- **AC17** The clock runs and stops per §3. Quarters end; halftime switches the kickoff; the game ends
  after Q4 if not tied.
- **AC18** Timeouts: 3 per half, usable by T or button between plays, stop the runoff.
- **AC19** Overtime per §3 resolves a tie.
- **AC20** Opponent AI calls situational plays on both sides (punts or kicks on 4th down, passes when
  desperate, runs and kneels when protecting a lead).
- **AC21** The final screen shows the score by quarter, team stats, a box score and the Player of the
  Game (fictional).

**Season**
- **AC22** Season setup: pick one of the 7 schools and Full (9) or Short (5) weeks. The schedule is a
  valid round robin; week 1 is Lakeside–Lake Hamilton, the last week of a full season is Hot
  Springs–Lakeside, and both are badged "Rivalry Week".
- **AC23** Each week the user can play or quick-sim their game. All other games sim. Standings update
  with W-L, PF, PA and tiebreaks.
- **AC24** Playoffs: the top 4 play semis and the Spa City Cup final. Users not qualified can sim to the
  end. The champion screen shows the cup and confetti (static under reduced motion).
- **AC25** The roster screen lists starters by position with ratings and class year.
- **AC26** Next season: seniors graduate, players improve, new sophomores arrive, and the schedule regenerates.

**Other modes**
- **AC27** Exhibition: pick any two different teams (of 10), home/away and quarter length.
- **AC28** The three challenges start in their exact situations, have a clear win or lose condition, and
  record completion.

**Presentation**
- **AC29** The title screen has the night-stadium art, the game name and the menu; Continue appears
  only when a save exists.
- **AC30** How to Play covers the basics, controls, rules (including the game-rule notes) and credits;
  Settings covers sound, volume, motion, theme, text size, quarter length, difficulty, assists,
  auto-continue and play speed.
- **AC31** The field renders yard lines, numbers, hashes, end zones in team colors, the line of
  scrimmage and first-down line; offense circles and defense squares; home dark and away light jerseys.
- **AC32** Juice: camera follow, ball arc and shadow, tackle hit effect, TD celebration, toast animations.
- **AC33** Synthesized audio for the cues in §7, M mutes, the volume slider works, and no audio is
  created before a gesture.

**Accessibility, platform**
- **AC34** The full game can be played by keyboard only, from title to final.
- **AC35** Text contrast is ≥ 4.5:1 in both themes (automated check).
- **AC36** Reduced motion removes shake, flash, confetti and fades.
- **AC37** Text size 130% has no clipping or overflow at either viewport.
- **AC38** Mobile 390×844: no horizontal overflow, controls ≥ 44 px, steering by touch drag and
  throwing by tap work with real touch input.
- **AC39** Autosave and Continue restore the exact game situation and season; with `localStorage`
  throwing, the game plays and says saving is unavailable.
- **AC40** A single `index.html`, zero network requests, zero console errors.
- **AC41** Performance meets §10.
- **AC42** A Node balance tool shows plausible outcomes: run average 3–6 yd, completion 50–70%,
  sack 3–10%, INT 1.5–5%. AI-vs-AI games average 14–40 points per team at 12-minute quarters
  (scaled for shorter games), with no stuck plays (every play ends under the 18 s safety cap).

## 13. Out of scope

Penalties and flags, injuries, player substitution and depth-chart editing, weather, onside kicks,
fake punts or FGs, audibles, a play editor, multiplayer (hot-seat or online), recruiting, player
control on defense, side switches by quarter, a real state playoff structure, real coaches or
players, alumni "legends" (living people), and voice commentary.
