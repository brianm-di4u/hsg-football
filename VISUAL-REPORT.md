# VISUAL-REPORT: Friday Night Spa City (`games/football`)

The visual enhancement campaign moved the field from a flat top-down token board to a **3D Friday-night stadium**
(three.js r186). It has:
- animated, Blender-built players in school colors;
- a broadcast camera with replays;
- painted key art.

The simulation, AI, rules, season and save format are unchanged: the 3D view only reads game state. The old 2D field
remains the fallback when WebGL 2 is missing, a "2D classic" choice in Settings, and `?gl=0`.

## What changed

### The field view (new: `src/js/field3d.js`, `stadium.js`, `players3d.js`, `models.js`, `venues.js`)

**Players and officials.**
- Low-poly players built in Blender (`art-src/blender/build_models.py` → `src/js/models-data.js`): helmet with
  facemask and stripe, shoulder pads, chest/back/shoulder number panels, striped pants, socks, shoes. About 1,700 triangles,
  11 bones with rigid skinning.
- A palette shader paints every school's home (dark) and away (white) uniform and the jersey numbers. It also adds a
  rim light, which is stronger on dark jerseys.
- Poses are procedural and driven by the live sim:
  - three-point and two-point stances, the QB set, and DB crouches;
  - run cycles scaled by speed, and backpedals;
  - blocks with locked-out arms;
  - the QB's wind-up and throw, and receivers reaching for the catch;
  - carriers tucking the ball;
  - tackled players and divers falling, and a missed-tackle dive;
  - kickers swinging through;
  - scorers celebrating.
- Five officials in stripes (Blender), plus instanced sideline teams.

**Stadium.**
- Turf or grass by venue, with painted NFHS markings: 5-yard lines, inbound and hash ticks 53'4" from each sideline,
  the try line, and coaching boxes between the 25s.
- Both end zones in the home school's colors (school name at one end, mascot at the other) and a midfield mascot.
- Yard numbers with direction arrows, H goalposts 23'4" wide (slingshot at the neutral site), and pylons.
- Bleachers: aluminum, or concrete for Hot Springs' main grandstand. An instanced crowd of 2,000–2,500 in team colors
  bobs and stands up on big plays.
- A band block, fans along the end fences, a press box, windscreen fences, an optional track, Blender light towers,
  a scoreboard that shows the live score, clock, down and ball-on, benches, and chain-crew rods with the down box.

**Night.**
- A painted Ouachita-ridge sky panorama (Codex).
- Additive haze beams from every light bank, lamp halos, and a light-spill dome.
- Light pools and falloff baked into the turf texture.
- Two soft blob shadows per player, one from each bank of lights.
- A broadcast vignette.
- Weather: clear, mist or rain, varying by matchup. Rain adds streaks and darker skies; mist adds heavier fog.
- A day theme with daylight.

**Venues (`research/stadiums.md`).** Only confirmed or imagery-supported details are drawn:
- **Wolf Stadium:** turf, a track, a 3:1 home/visitor stand ratio, and Wolf Arena behind the east end. From imagery
  ("likely"): grey track lanes and white end-zone lettering on maroon.
- **Joe C. Reese Stadium / Tommy J. Holt Memorial Field:** turf, a track, a press box, the big open concrete
  grandstand, and woods on the far side. From imagery ("likely"): a tan track.
- **Other schools:** generic home fields sized by classification, using the surface the research found (Jessieville and
  Mountain Pine grass; Fountain Lake, Cutter-Morning Star and Lakeside turf, Lakeside with a dark track). These are
  never named as real.
- **Cup final:** a generic neutral site.

Light-pole counts, scoreboard spots and stand sizes are generic, and the lake backdrop was dropped (the lake isn't
visible from Wolf Stadium).

**Camera director.**
- Pre-snap: a low broadcast angle behind the offense.
- Quarterback's view: wide enough to see every receiver.
- Ball-carrier follow: tight, with the action low in frame.
- Kickoffs and punts: high and wide.
- Field goals and tries: behind the kicker, flipping ends for the opponent.
- Touchdowns: a low orbit around the scorers.
- **Replays:** R or the Replay button, from the sideline at 0.55× speed. Recorded from the simulation ticks, so every
  play can be replayed.

Phones get a steeper, tighter framing. Players went from 6 px dots to about 25–45 CSS px when the ball is in hand.

**Broadcast overlays (2D, placed by 3D projection).**
- Receiver shape badges.
- Route previews, outlined and with runs in gold.
- A "1st & 10" decal on the turf.
- An ID tag over the ball carrier (#, name).
- A larger kick meter drawn as goalposts.
- A "REPLAY" bug.

**Effects.**
- Turf-pellet bursts and camera shake on tackles.
- Confetti, a crowd surge and fireworks over the scoreboard end on touchdowns.
- The touchdown celebration even when no play is on the field.

### Menus and HUD

- **Type:** Graduate (varsity) and Oswald (condensed), both OFL and embedded as base64 so they work under `file://`.
- **Scorebug:** a broadcast bar with school-color blocks, full names on desktop and school codes on phones, a
  possession football and a gold underline. "Touchdown" and "Halftime" states.
- **Play-call cards:** SVG diagrams drawn from the playbook data itself (formations, routes, run paths, zones, blitzes,
  man coverage), with large diagrams pre-snap and during the play.
- **Painted key art (Codex):**
  - the title (wide and tall versions);
  - the pregame matchup over the stadium, with 112 px mascot medallions;
  - menu, season and final screens on the blurred stadium;
  - the champion screen with the painted Spa City Cup (Art-Deco bathhouse motifs, blank plaque).
- **Halftime and quarter cards:** broadcast cards with school-color score blocks over the live stadium.
- **Final screen:** a hero banner in the winner's colors.
- **Result banners:** a lower-third strip for ordinary plays; touchdowns get a school-color top banner.
- Keyboard hints are hidden on touch devices, and the JUKE disabled state is clearer.

### Settings

- **Field view:** 3D stadium / 2D classic.
- **Weather:** varies / clear / mist / rain.
- **Graphics:** Auto / High / Low. Auto steps the pixel ratio down 2 → 1.5 → 1 and drops haze and crowd density when
  frames stay slow.

## Review scores (independent adversarial reviewer vs. benchmarks)

Benchmarks were screenshots from EA College Football 26, Madden NFL 26, Axis Football 2026, Legend Bowl and
Retro Bowl. They were review-only and git-ignored.

| Category | visual-before | m3d-3 | m3d-5 | final | Benchmark range |
|---|---|---|---|---|---|
| Art | 2.5 | 4 | 4 | 5 | 7–10 |
| Lighting & atmosphere | 2 | 4 | 4 | 4 | 6–10 |
| Animation & game feel | 2 | 3 | 4 | 4 | 6–10 |
| UI / HUD | 5 | 6 | 6 | 6.5 | 7–10 |
| Typography | 4 | 6 | 6 | 5.5 | 7–9 |
| Readability | 5 / 3 mobile | 5 | 4 | 5.5 | 7–10 |
| Mobile | 4 | 5 | 5 | 5.5 | 7–9 |
| Authenticity | 4 | 5 | 5 | 6 | 6–10 |

The "final" column is the last independent review, run on the second `visual-final` run.

The reviewer's verdict:
- **Menus and season screens** now look "like a coherent, near-shippable product, roughly on par with Retro Bowl's hub".
- **Authenticity** improved most (3 → 6).
- **In-game**, the 3D view "drops below Axis Football".

After that review, one more batch fixed the issues it called major or bugs:
- the touchdown celebration: dark jerseys no longer wash out to silver-blue, the scorers spread out instead of clipping
  into each other, and the defenders stand scattered with hands on hips;
- the near goalposts no longer cut through the formation (each set hides when the camera sits behind it);
- the near end-zone word reads upright from the main camera;
- solid grandstand bodies under the seating rows, so fans no longer appear to float;
- a cooler night sky;
- a tighter desktop follow camera;
- a ball trail;
- break scorebugs show no stale down and distance;
- fireworks no longer linger into a field goal;
- the kick-meter caption no longer sits under the needle.

These fixes are in the final tested build, but no review re-scored them.

Over the campaign, the reviewer's top gaps were addressed in turn:
- **Player figures** (m3d-1).
- **Night lighting and the stadium:** the painted sky, haze beams, light pools, crowds and fences (m3d-3 to final).
- **Phone readability:** players went from 6 px dots to about 25–45 px. The phone camera widens to the whole
  formation while the QB holds the ball, then tightens on the carrier.
- **Field markings:** painted lines, so they hold at a distance.
- **Touchdown payoff.**
- **Scorebug and typography.**
- **Play-art cards.**

## Tests

`node shared/test-harness/run.mjs games/football --milestone visual-final`: **87/87 passed** at desktop 1280×800 and mobile 390×844. There were no console errors and no external requests; `loadMs` was 119.

The run saved **117 screenshots** (59 desktop, 58 mobile). Every one was inspected through the 18 contact sheets and the before/after pairs, and the key 3D shots were opened at full size.

- Before/after: `node games/football/tools/before-after.mjs` → `screenshots/visual-final/before-after/`.
- Gallery: `screenshots/index.html`.

| Suite | What it covers in v2 |
|---|---|
| screens, play, rules, modes, season, a11y, touch, perf | all v1 checks, now running in 3D. Taps and badges use the 3D projection; touch steering is set up while paused and held for 0.9 s of game time; the perf budget is 1.3 MB of HTML with a per-frame JS check under software WebGL |
| **view3d** (new, 13 tests across both viewports) | WebGL on, Wolf / Reese / generic venue layouts, draw-call and triangle budgets, stances, run, tackle, receiver projection and tap-to-throw in 3D, replay from the sideline (Space ends it), kickoff / field-goal / defense cameras, rain / mist / day rebuilds, the `?gl=0` fallback and toggling Field view both ways |

Milestones:
- m3d-1: 66/74.
- m3d-3: 82/87. Fixed: replays now record from sim ticks; reduced motion snaps instantly; touch tests are robust to slow
  frames.
- m3d-5: 85/87. Fixed: day-theme contrast on the title art; camera snap after the test-only kickoff skip.
- visual-final: 86/87 → 83/87 → 87/87 → 85/87 → 87/87. The intermediate failures were timing under a loaded, GPU-less test machine (reduced-motion idle, the idle loop, and the stadium built before the first frame) plus one regression, all fixed in code.

There are no console errors and no external requests. The `file://` constraints are handled:
- three.js, the meshes, the fonts and the sky are inlined;
- the title, trophy and pregame art load as plain images.

## Performance

| Measure | Value |
|---|---|
| `index.html` | ≈1.22 MB: three.js tree-shaken to 555 KB, meshes 180 KB, fonts 42 KB, sky panorama 67 KB, game ≈380 KB |
| Painted art files (`assets/`) | 3 WebP files, 342 KB, loaded after first paint, with vector fallbacks |
| Draw calls / triangles (night, Reese) | ≈65–73 calls, ≈190 k triangles (crowd ≈2,500 instanced fans) |
| Game JS per 3D frame | ≈1.5–2.2 ms median on this desktop |
| fps, real GPU (RTX 5060, system Chrome headless, machine at 54% load) | desktop: 58 live / 60 punt. Phone viewport: 61 / 60 |
| fps with the CPU throttled 4× (mid-phone proxy, machine at 100% load) | ≈20 live / 42–60 kicks; render JS ≈10 ms at 4× |
| fps in the harness (SwiftShader, software WebGL) | ≈5. The harness has no GPU, so the perf test checks the JS cost instead |
| JS heap | 13–17 MB |
| Idle | the loop still stops when nothing moves; poses, camera, crowd and particles settle first |

Low end:
- Auto quality drops the pixel ratio, haze beams and crowd density.
- "Graphics: Low" pins it low.
- No WebGL 2 means the 2D field.
- Painted art is optional (`?art=0`).

## Known gaps

These are the remaining gaps from the final review, after the last fix batch.

- **The in-game stadium still reads emptier than the title painting.** At the track venues, Wolf and Reese, the stands
  sit beyond the track, more than 25 yd off the sideline. The behind-the-play camera sees them only at the top corners,
  in wide kick shots and in replays. Lakeside is the same, though it is generic and not named as real. The real
  fields are laid out this way, but the bowl looks emptier than in benchmark games.
  - Lever: a broadcast sideline camera option for desktop (input would need screen-relative steering), or taller,
    denser crowd geometry.
- **Lighting is good for a browser game, not AAA.** It has haze beams, halos and light pools, but no real-time
  shadows or bloom post-processing (both skipped for phone performance).
- **Players read smaller than in Axis, Legend Bowl or Retro Bowl.** On phones they are about 25–45 px when the ball
  is in hand, and smaller in the quarterback's wide view. Readability is about 5.5/10 against benchmarks of 6.5–9.
- **Animation is procedural:** readable poses, no motion capture, no tackle-contact physics.
- **Weather is light.** Rain has streaks but no wet sheen or splashes; mist is fog density only.
- **No play clock in the scorebug.** The game has a 25-second runoff, not a play clock.
- **Lookalike school codes.** "LHS" (Lakeside) vs "LHHS" (Lake Hamilton) come from shared data.
- **Desktop panel.** It is mostly empty during kickoffs, punts and replays.

- **Phone CPU.** The 4× CPU-throttle proxy reaches about 20 fps during live plays: below the 30 fps phone target.
  That proxy measured on a machine already at 100% load from other sessions. On an unloaded run at real speed, the
  phone viewport holds 60. Re-measure on real mid-range phones. Levers: the Low setting, fewer crowd instances, and
  skipping pose updates for off-screen players.
- **Stands at track venues.** Stands sit beyond the track, 25+ yd from the sideline, so the behind-the-play camera
  mostly sees them only at the top corners, in replays and in wide kick shots. This is realistic for those venues
  (Wolf, Reese, Lakeside), but the bowl reads emptier than a college stadium.
- **Animation is procedural.** There is no motion capture, so poses are readable but not fluid at the AAA level.
- **The 2D classic fallback** keeps its v1 look.
- **Sound** is unchanged and still not listened to by a human.

## New research (`research/stadiums.md`, with sources)

- **Wolf Stadium** (Pearcy):
  - the name (not the sponsor name);
  - turf;
  - a track;
  - separate home and visitor stands with 2020 caps of 831 and 300;
  - Wolf Arena right behind the east end;
  - a west–east field;
  - an elevation of 552 ft (USGS);
  - capacity ≈2,926 ("likely").
- **Tommy J. Holt Memorial Field at Joe C. Reese Stadium:** the naming (the field honors principal Tommy J. Holt; the
  stadium honors coach Joe C. Reese, 1970–98), turf (replaced around 2018), a track, a press box, a west–east field,
  476 ft elevation, and capacity ≈6,588 ("likely").
- **Lakeside:** the stadium honors coach J. W. "Chick" Austin; turf; a track; a north–south field; capacity ≈3,060
  ("likely"). The 16,000 in shared data is wrong.
- **Field names ("likely"):** Jessieville (Don Phillips Field, grass), Mountain Pine (Stanley May Field, grass), Fountain
  Lake (Larry Beckham Memorial Field, turf), Cutter-Morning Star (Eagle Field, turf).
- **NFHS:**
  - hashes 53'4" from each sideline;
  - 4-inch lines;
  - 9-yard marks;
  - team boxes between the 25s;
  - a 2-yard restricted area (not the 6-ft college limit line);
  - goal posts 23'4" wide with a 10 ft crossbar;
  - a white-striped ball.
- **Setting:** east–west Ouachita ridges, with pine on south slopes and hardwoods on north slopes. Lake Hamilton is not
  visible from Wolf Stadium. Hot Springs Mountain Tower is 5.3 km NNE of Holt Field (visibility unconfirmed).

## Requests for the coordinator

**Shared data (`shared/data/schools.json`):**
- Hot Springs venue: the sources write "Tommy J. Holt Memorial Field at Joe C. Reese Stadium".
- Lakeside: the venue honors "Chick Austin"; the full official name is still unconfirmed. Remove the 16,000-capacity
  note.
- Add the confirmed field names and surfaces for the other schools, as "likely".

**Shared research (`research/`):** copy the NFHS field-marking facts and the stadium facts above.

**Harness:**
1. The harness Chromium has no GPU, so WebGL games render in software at about 5 fps and a full football run takes
   about 50 minutes. Options: an opt-in `--gpu` flag that launches the system Chrome (`channel: 'chrome'` with
   `--enable-gpu --use-angle=d3d11`, which worked here and measured 60 fps), or a per-test `gpu: true`.
2. `t.fps()` under software WebGL measures the rasterizer, not the game. The perf test now checks the game's own
   per-frame JS (`getState().gfx.cpuMs`) instead.
3. A `t.cpuThrottle(rate)` helper (CDP `Emulation.setCPUThrottlingRate`) would make "mid-phone" performance checks
   repeatable.
