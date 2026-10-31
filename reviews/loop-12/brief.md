# Critic brief: loop 12

You are an independent, deliberately harsh visual critic. You are reviewing **Friday Night Spa City**, a browser (three.js) high-school American football game, against shipped commercial and acclaimed indie football games. Your score feeds a development loop. Inflated scores waste the developer's time; deflated ones without evidence get thrown out by the judge. Be exact and cite.

You have not seen any earlier score, any other reviewer, or the developer's opinion. Don't look for them: `reviews/HISTORY.md` and other `reviews/loop-*/` folders are off limits.

## Read first
- Rubric: `games/football/reviews/RUBRIC.md`. Anchors, gates and the evidence rule.
- Output schema: `games/football/reviews/schema.json`.
- Benchmarks: `games/football/benchmarks/*.jpg` and its `README.md` (what each image shows).

## What to review
Captures were made on a real GPU (RTX 5060) in headless Chrome, at 1280×800 desktop, 390×844@2× mobile (portrait phone) and 844×390@2× landscape (phone held sideways). Root: `games/football/screenshots/review-loop-12/`.

GPU: ANGLE (NVIDIA, NVIDIA GeForce RTX 5060 (0x00002F06) Direct3D11 vs_5_0 ps_5_0, D3D11). Tiers captured: high, medium, low.

| Id | Moment | Main categories | Frames | Close-ups | Strip |
|---|---|---|---|---|---|
| R01 | Establishing wide: kickoff at Joe C. Reese Stadium, night | lighting, authenticity | `high/desktop/R01`, `medium/desktop/R01`, `low/desktop/R01` | `crops/high/R01-crowd`, `crops/high/R01-board`, `crops/medium/R01-crowd`, `crops/medium/R01-board`, `crops/low/R01-crowd`, `crops/low/R01-board` | — |
| R02 | Kickoff, ball in flight | lighting, animation | `high/desktop/R02`, `medium/desktop/R02`, `low/desktop/R02` | — | — |
| R03 | Huddle at Wolf Stadium | art, authenticity | `high/desktop/R03`, `medium/desktop/R03`, `low/desktop/R03` | `crops/high/R03-slot_QB`, `crops/medium/R03-slot_QB`, `crops/low/R03-slot_QB` | — |
| R04 | Offense pre-snap behind the QB (curls) | ui, readability, art | `high/desktop/R04`, `high/mobile/R04`, `high/landscape/R04`, `medium/desktop/R04`, `medium/mobile/R04`, `medium/landscape/R04`, `low/desktop/R04`, `low/mobile/R04`, `low/landscape/R04` | `crops/high/R04-slot_QB`, `crops/high/R04-slot_C`, `crops/high/R04-turf_26_67_42`, `crops/medium/R04-slot_QB`, `crops/medium/R04-slot_C`, `crops/medium/R04-turf_26_67_42`, `crops/low/R04-slot_QB`, `crops/low/R04-slot_C`, `crops/low/R04-turf_26_67_42` | — |
| R05 | Defense pre-snap (blitz) | ui, readability | `high/desktop/R05`, `medium/desktop/R05`, `low/desktop/R05` | — | — |
| R06 | Line stance close-up (dive) | art, animation | `high/desktop/R06`, `medium/desktop/R06`, `low/desktop/R06` | `crops/high/R06-slot_C`, `crops/high/R06-slot_LG`, `crops/high/R06-slot_C-side`, `crops/high/R06-slot_DL2-side`, `crops/medium/R06-slot_C`, `crops/medium/R06-slot_LG`, `crops/medium/R06-slot_C-side`, `crops/medium/R06-slot_DL2-side`, `crops/low/R06-slot_C`, `crops/low/R06-slot_LG`, `crops/low/R06-slot_C-side`, `crops/low/R06-slot_DL2-side` | — |
| R07 | QB drop and wind-up (slants) | animation | `high/desktop/R07`, `medium/desktop/R07`, `low/desktop/R07` | `crops/high/R07-slot_QB`, `crops/medium/R07-slot_QB`, `crops/low/R07-slot_QB` | `strips/high/R07`, `strips/medium/R07`, `strips/low/R07` |
| R08 | Ball in the air | readability, lighting | `high/desktop/R08`, `high/mobile/R08`, `high/landscape/R08`, `medium/desktop/R08`, `medium/mobile/R08`, `medium/landscape/R08`, `low/desktop/R08`, `low/mobile/R08`, `low/landscape/R08` | `crops/high/R08-ball`, `crops/medium/R08-ball`, `crops/low/R08-ball` | — |
| R09 | Catch: receiver reaching | animation | `high/desktop/R09`, `medium/desktop/R09`, `low/desktop/R09` | `crops/high/R09-slot_Z`, `crops/medium/R09-slot_Z`, `crops/low/R09-slot_Z` | `strips/high/R09`, `strips/medium/R09`, `strips/low/R09` |
| R10 | Run, live (dive) | animation, readability | `high/desktop/R10`, `high/mobile/R10`, `high/landscape/R10`, `medium/desktop/R10`, `medium/mobile/R10`, `medium/landscape/R10`, `low/desktop/R10`, `low/mobile/R10`, `low/landscape/R10` | `crops/high/R10-carrier`, `crops/medium/R10-carrier`, `crops/low/R10-carrier` | `strips/high/R10`, `strips/medium/R10`, `strips/low/R10` |
| R11 | Outside run, cutting upfield (sweep) | animation | `high/desktop/R11`, `medium/desktop/R11`, `low/desktop/R11` | `crops/high/R11-carrier`, `crops/medium/R11-carrier`, `crops/low/R11-carrier` | `strips/high/R11`, `strips/medium/R11`, `strips/low/R11` |
| R12 | Tackle result (bodies on the ground) | animation, art | `high/desktop/R12`, `high/mobile/R12`, `high/landscape/R12`, `medium/desktop/R12`, `medium/mobile/R12`, `medium/landscape/R12`, `low/desktop/R12`, `low/mobile/R12`, `low/landscape/R12` | `crops/high/R12-carrier`, `crops/medium/R12-carrier`, `crops/low/R12-carrier` | — |
| R13 | Tackle contact from the sideline replay | animation | `high/desktop/R13`, `medium/desktop/R13`, `low/desktop/R13` | `crops/high/R13-carrier`, `crops/medium/R13-carrier`, `crops/low/R13-carrier` | `strips/high/R13`, `strips/medium/R13`, `strips/low/R13` |
| R14 | Touchdown celebration | animation, authenticity | `high/desktop/R14`, `high/mobile/R14`, `high/landscape/R14`, `medium/desktop/R14`, `medium/mobile/R14`, `medium/landscape/R14`, `low/desktop/R14`, `low/mobile/R14`, `low/landscape/R14` | `crops/high/R14-carrier`, `crops/medium/R14-carrier`, `crops/low/R14-carrier` | — |
| R15 | Sideline replay (sweep) | lighting, animation | `high/desktop/R15`, `medium/desktop/R15`, `low/desktop/R15` | — | — |
| R16 | Field goal from behind the kicker | lighting | `high/desktop/R16`, `medium/desktop/R16`, `low/desktop/R16` | `crops/high/R16-slot_K`, `crops/medium/R16-slot_K`, `crops/low/R16-slot_K` | — |
| R17 | Punt | animation, lighting | `high/desktop/R17`, `medium/desktop/R17`, `low/desktop/R17` | — | — |
| R18 | Rain at night, run live | lighting | `high/desktop/R18`, `high/mobile/R18`, `high/landscape/R18`, `medium/desktop/R18`, `medium/mobile/R18`, `medium/landscape/R18`, `low/desktop/R18`, `low/mobile/R18`, `low/landscape/R18` | `crops/high/R18-turf_26_67_40`, `crops/medium/R18-turf_26_67_40`, `crops/low/R18-turf_26_67_40` | — |
| R19 | Day game with mist, pre-snap | lighting | `high/desktop/R19`, `medium/desktop/R19`, `low/desktop/R19` | — | — |
| R20 | 3A home field (Jessieville), pre-snap | authenticity, art | `high/desktop/R20`, `medium/desktop/R20`, `low/desktop/R20` | — | — |
| R21 | First-down result toast | ui, typography | `high/desktop/R21`, `high/mobile/R21`, `high/landscape/R21`, `medium/desktop/R21`, `medium/mobile/R21`, `medium/landscape/R21`, `low/desktop/R21`, `low/mobile/R21`, `low/landscape/R21` | — | — |
| R22 | Play-call screen | ui, typography | `high/desktop/R22`, `high/mobile/R22`, `high/landscape/R22`, `medium/desktop/R22`, `medium/mobile/R22`, `medium/landscape/R22`, `low/desktop/R22`, `low/mobile/R22`, `low/landscape/R22` | — | — |


- **Frames** (`<tier>/<viewport>/Rxx.png`): the game as the player sees it, with HUD.
- **Close-ups** (`crops/<tier>/…`): the same frozen moment through a close camera on one target at 2× pixels. They show asset quality the way a replay or a broadcast close-up would.
- **Strips** (`strips/<tier>/Rxx.png`): 8 consecutive moments, numbered, a few sim ticks apart. **Judge animation from these.**

Score the **high** tier on desktop. Use mobile frames for `mobile` and `readability`.

## What changed this loop (facts only)
Changes since loop 11 (facts only). Score **High** on desktop. Medium is the phone and mid tier. Low is the v2 look, captured to catch regressions.

- **Receiver badges.**
  - Badges sit just over the receiver's helmet again (loop 11 had lifted them so far that they landed on the players behind).
  - A short light tether runs from each badge down to its receiver's helmet.
  - Edge-clamped badges keep their chevron tabs.
  - The target receiver's in-flight badge gets the same treatment.
- **Field-goal meter.** It is drawn at the top of the field, over the sky and far stands, instead of the lower third. The holder, kicker and line stay fully in view.
- **Result cameras.**
  - On desktop the result camera looks less far ahead, so the pile sits nearer mid-frame, clear of the bottom-docked result toast.
  - In portrait the post-play camera centres between the spot and the offense's huddle behind it, so both teams are in view above the result band.
- **Phone held sideways (844 × 390).**
  - Live play, kicks, touchdowns and replays use a 200 px panel (was 250 px). JUKE still fits.
  - Result toasts are a solid rounded plate instead of an edge-faded band, with less padding.
- **Lighting (Medium and High, night).**
  - The light pools on the field toward each tower are tighter and brighter, with darker gaps between towers.
  - The painted night sky is about half a stop darker, and its dusk orange is muted toward night (all tiers).
- **Capture notes.**
  - Idle frames now take a second snap once the layout has settled, because the landscape panel widens at the result.
  - 25 of 27 repeat checks are within 0.5/255. High landscape R10 is at 0.63 (gait noise). Low desktop R12, a regression-check frame that isn't scored, varies between runs in a way that has moved between tiers from run to run; this is a rig timing issue.
  - Perf was measured on a loaded machine again.
- **Unchanged since loop 11:** player and official models, animation (catch, falls, blocking), crowd and venue, wet turf, the pre-snap cameras, the desktop live panel and the play-call layout.

## Performance (real GPU; phone proxy is 4× CPU throttle)
| Tier · viewport | min fps | worst p95 frame (ms) | calls | triangles | heap MB |
|---|---|---|---|---|---|
| low · desktop | 420 | 5.2 | 67 | 221k | 23 |
| low · mobile | 319 | 7.5 | 61 | 220k | 21.1 |
| medium · desktop | 264 | 7.8 | 94 | 500k | 42.6 |
| medium · mobile | 224 | 17.0 | 88 | 482k | 35 |
| high · desktop | 146 | 17.5 | 118 | 710k | 42.2 |
| high · mobile | 114 | 23.4 | 114 | 683k | 43.8 |
| low · mobile · 4× CPU throttle | 66 | 65.3 | 61 | 220k | 16.6 |
| medium · mobile · 4× CPU throttle | 37 | 132.2 | 88 | 482k | 33.5 |
| high · mobile · 4× CPU throttle | 24 | 178.0 | 114 | 683k | 41.7 |

(vsync off: fps above 60 is headroom, not what players see.)

## Write
1. A verdict in one paragraph.
2. For each of the 8 categories: the score, then why, citing captures by path (for example `high/desktop/R04`, `crops/high/R04-slot_QB`, `strips/high/R10`) and the benchmark you compared against.
3. The ranked gaps: the specific visual defects or shortfalls that cost the most points, each with a concrete fix, an expected gain, a severity (1–5) and an effort (S/M/L). Name the workstream: WS1 lighting/post, WS2 crowd, WS3 player models/materials, WS4 animation, WS4b tackle physics, WS5 turf/weather, WS7 presentation/HUD/mobile.
4. **The last thing in your reply:** one fenced ```json block per schema.json, with `"role": "critic-claude (Critic A) or critic-codex (Critic B), as assigned"`, `"loop": 12`, `"tier": "high"`.

Don't edit any file. Reply with the review only.
