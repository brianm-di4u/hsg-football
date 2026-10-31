# Critic brief: loop 0

You are an independent, deliberately harsh visual critic. You are reviewing **Friday Night Spa City**, a browser (three.js) high-school American football game, against shipped commercial and acclaimed indie football games. Your score feeds a development loop. Inflated scores waste the developer's time; deflated ones without evidence get thrown out by the judge. Be exact and cite.

You have not seen any earlier score, any other reviewer, or the developer's opinion. Don't look for them: `reviews/HISTORY.md` and other `reviews/loop-*/` folders are off limits.

## Read first
- Rubric: `games/football/reviews/RUBRIC.md`. Anchors, gates and the evidence rule.
- Output schema: `games/football/reviews/schema.json`.
- Benchmarks: `games/football/benchmarks/*.jpg` and its `README.md` (what each image shows).

## What to review
Captures were made on a real GPU (RTX 5060) in headless Chrome, at 1280×800 desktop and 390×844@2× mobile. Root: `games/football/screenshots/review-loop-0/`.

GPU: ANGLE (NVIDIA, NVIDIA GeForce RTX 5060 (0x00002F06) Direct3D11 vs_5_0 ps_5_0, D3D11). Tiers captured: legacy.

| Id | Moment | Main categories | Frames | Close-ups | Strip |
|---|---|---|---|---|---|
| R01 | Establishing wide: kickoff at Joe C. Reese Stadium, night | lighting, authenticity | `legacy/desktop/R01` | `crops/legacy/R01-crowd`, `crops/legacy/R01-board` | — |
| R02 | Kickoff, ball in flight | lighting, animation | `legacy/desktop/R02` | — | — |
| R03 | Huddle at Wolf Stadium | art, authenticity | `legacy/desktop/R03` | `crops/legacy/R03-slot_QB` | — |
| R04 | Offense pre-snap behind the QB (curls) | ui, readability, art | `legacy/desktop/R04`, `legacy/mobile/R04` | `crops/legacy/R04-slot_QB`, `crops/legacy/R04-slot_C`, `crops/legacy/R04-turf_26_67_42` | — |
| R05 | Defense pre-snap (blitz) | ui, readability | `legacy/desktop/R05` | — | — |
| R06 | Line stance close-up (dive) | art, animation | `legacy/desktop/R06` | `crops/legacy/R06-slot_C`, `crops/legacy/R06-slot_LG` | — |
| R07 | QB drop and wind-up (slants) | animation | `legacy/desktop/R07` | `crops/legacy/R07-slot_QB` | `strips/legacy/R07` |
| R08 | Ball in the air | readability, lighting | `legacy/desktop/R08`, `legacy/mobile/R08` | `crops/legacy/R08-ball` | — |
| R09 | Catch: receiver reaching | animation | `legacy/desktop/R09` | `crops/legacy/R09-slot_Z` | `strips/legacy/R09` |
| R10 | Run, live (dive) | animation, readability | `legacy/desktop/R10`, `legacy/mobile/R10` | `crops/legacy/R10-carrier` | `strips/legacy/R10` |
| R11 | Outside run, cutting upfield (sweep) | animation | `legacy/desktop/R11` | `crops/legacy/R11-carrier` | `strips/legacy/R11` |
| R12 | Tackle result (bodies on the ground) | animation, art | `legacy/desktop/R12`, `legacy/mobile/R12` | `crops/legacy/R12-carrier` | — |
| R13 | Tackle contact from the sideline replay | animation | `legacy/desktop/R13` | `crops/legacy/R13-carrier` | `strips/legacy/R13` |
| R14 | Touchdown celebration | animation, authenticity | `legacy/desktop/R14`, `legacy/mobile/R14` | `crops/legacy/R14-carrier` | — |
| R15 | Sideline replay (sweep) | lighting, animation | `legacy/desktop/R15` | — | — |
| R16 | Field goal from behind the kicker | lighting | `legacy/desktop/R16` | `crops/legacy/R16-slot_K` | — |
| R17 | Punt | animation, lighting | `legacy/desktop/R17` | — | — |
| R18 | Rain at night, run live | lighting | `legacy/desktop/R18`, `legacy/mobile/R18` | `crops/legacy/R18-turf_26_67_40` | — |
| R19 | Day game with mist, pre-snap | lighting | `legacy/desktop/R19` | — | — |
| R20 | 3A home field (Jessieville), pre-snap | authenticity, art | `legacy/desktop/R20` | — | — |
| R21 | First-down result toast | ui, typography | `legacy/desktop/R21`, `legacy/mobile/R21` | — | — |
| R22 | Play-call screen | ui, typography | `legacy/desktop/R22`, `legacy/mobile/R22` | — | — |


- **Frames** (`<tier>/<viewport>/Rxx.png`): the game as the player sees it, with HUD.
- **Close-ups** (`crops/<tier>/…`): the same frozen moment through a close camera on one target at 2× pixels. They show asset quality the way a replay or a broadcast close-up would.
- **Strips** (`strips/<tier>/Rxx.png`): 8 consecutive moments, numbered, a few sim ticks apart. **Judge animation from these.**

Score the **legacy** tier on desktop. Use mobile frames for `mobile` and `readability`.

## What changed this loop (facts only)
Loop 0 is the calibration baseline. The game's visuals are unchanged from the v2 release (three.js r186 3D field view):
- Lambert shading, a hemisphere light plus three directional lights, no shadow maps, no post-processing beyond ACES tone mapping.
- About 1.7k-triangle players with rigid skinning and procedural poses.
- An instanced box-figure crowd.
- Canvas-painted turf with baked light pools, additive haze cones and a painted sky panorama.

Captures are the "legacy" tier: the pre-v3 best quality.

Changes in this loop are test infrastructure only: deterministic gait phase and rain seeding, a frozen render clock for captures, and close-up camera and bounding-box hooks. They have no visual effect in normal play.

## Performance (real GPU; phone proxy is 4× CPU throttle)
| Tier · viewport | min fps | worst p95 frame (ms) | calls | triangles | heap MB |
|---|---|---|---|---|---|
| legacy · desktop | 1121 | 1.3 | 71 | 221k | 32.5 |
| legacy · mobile | 1136 | 1.3 | 65 | 220k | 23 |
| legacy · mobile · 4× CPU throttle | 165 | 17.9 | 65 | 220k | 18.6 |

(vsync off: fps above 60 is headroom, not what players see.)

## Write
1. A verdict in one paragraph.
2. For each of the 8 categories: the score, then why, citing captures by path (for example `high/desktop/R04`, `crops/high/R04-slot_QB`, `strips/high/R10`) and the benchmark you compared against.
3. The ranked gaps: the specific visual defects or shortfalls that cost the most points, each with a concrete fix, an expected gain, a severity (1–5) and an effort (S/M/L). Name the workstream: WS1 lighting/post, WS2 crowd, WS3 player models/materials, WS4 animation, WS4b tackle physics, WS5 turf/weather, WS7 presentation/HUD/mobile.
4. **The last thing in your reply:** one fenced ```json block per schema.json, with `"role": "critic-claude (Critic A) or critic-codex (Critic B), as assigned"`, `"loop": 0`, `"tier": "legacy"`.

Don't edit any file. Reply with the review only.
