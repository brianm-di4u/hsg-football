# Critic brief: loop 16

You are an independent, deliberately harsh visual critic. You are reviewing **Friday Night Spa City**, a browser (three.js) high-school American football game, against shipped commercial and acclaimed indie football games. Your score feeds a development loop. Inflated scores waste the developer's time; deflated ones without evidence get thrown out by the judge. Be exact and cite.

You have not seen any earlier score, any other reviewer, or the developer's opinion. Don't look for them: `reviews/HISTORY.md` and other `reviews/loop-*/` folders are off limits.

## Read first
- Rubric: `games/football/reviews/RUBRIC.md`. Anchors, gates and the evidence rule.
- Output schema: `games/football/reviews/schema.json`.
- Benchmarks: `games/football/benchmarks/*.jpg` and its `README.md` (what each image shows).

## What to review
Captures were made on a real GPU (RTX 5060) in headless Chrome, at 1280×800 desktop, 390×844@2× mobile (portrait phone) and 844×390@2× landscape (phone held sideways). Root: `games/football/screenshots/review-loop-16/`.

GPU: ANGLE (NVIDIA, NVIDIA GeForce RTX 5060 (0x00002F06) Direct3D11 vs_5_0 ps_5_0, D3D11). Tiers captured: high, medium, low.

| Id | Moment | Main categories | Frames | Close-ups | Strip |
|---|---|---|---|---|---|
| R01 | Establishing wide: kickoff at Joe C. Reese Stadium, night | lighting, authenticity | `high/desktop/R01`, `low/desktop/R01`, `medium/desktop/R01` | `crops/high/R01-crowd`, `crops/high/R01-board`, `crops/low/R01-crowd`, `crops/low/R01-board`, `crops/medium/R01-crowd`, `crops/medium/R01-board` | — |
| R02 | Kickoff, ball in flight | lighting, animation | `high/desktop/R02`, `low/desktop/R02`, `medium/desktop/R02` | — | — |
| R03 | Huddle at Wolf Stadium | art, authenticity | `high/desktop/R03`, `low/desktop/R03`, `medium/desktop/R03` | `crops/high/R03-slot_QB`, `crops/low/R03-slot_QB`, `crops/medium/R03-slot_QB` | — |
| R04 | Offense pre-snap behind the QB (curls) | ui, readability, art | `high/desktop/R04`, `high/landscape/R04`, `high/mobile/R04`, `low/desktop/R04`, `low/landscape/R04`, `low/mobile/R04`, `medium/desktop/R04`, `medium/landscape/R04`, `medium/mobile/R04` | `crops/high/R04-slot_QB`, `crops/high/R04-slot_C`, `crops/high/R04-turf_26_67_42`, `crops/low/R04-slot_QB`, `crops/low/R04-slot_C`, `crops/low/R04-turf_26_67_42`, `crops/medium/R04-slot_QB`, `crops/medium/R04-slot_C`, `crops/medium/R04-turf_26_67_42` | — |
| R05 | Defense pre-snap (blitz) | ui, readability | `high/desktop/R05`, `low/desktop/R05`, `medium/desktop/R05` | — | — |
| R06 | Line stance close-up (dive) | art, animation | `high/desktop/R06`, `low/desktop/R06`, `medium/desktop/R06` | `crops/high/R06-slot_C`, `crops/high/R06-slot_LG`, `crops/high/R06-slot_C-side`, `crops/high/R06-slot_DL2-side`, `crops/low/R06-slot_C`, `crops/low/R06-slot_LG`, `crops/low/R06-slot_C-side`, `crops/low/R06-slot_DL2-side`, `crops/medium/R06-slot_C`, `crops/medium/R06-slot_LG`, `crops/medium/R06-slot_C-side`, `crops/medium/R06-slot_DL2-side` | — |
| R07 | QB drop and wind-up (slants) | animation | `high/desktop/R07`, `low/desktop/R07`, `medium/desktop/R07` | `crops/high/R07-slot_QB`, `crops/low/R07-slot_QB`, `crops/medium/R07-slot_QB` | `strips/high/R07`, `strips/low/R07`, `strips/medium/R07` |
| R08 | Ball in the air | readability, lighting | `high/desktop/R08`, `high/landscape/R08`, `high/mobile/R08`, `low/desktop/R08`, `low/landscape/R08`, `low/mobile/R08`, `medium/desktop/R08`, `medium/landscape/R08`, `medium/mobile/R08` | `crops/high/R08-ball`, `crops/low/R08-ball`, `crops/medium/R08-ball` | — |
| R09 | Catch: receiver reaching | animation | `high/desktop/R09`, `low/desktop/R09`, `medium/desktop/R09` | `crops/high/R09-slot_Z`, `crops/low/R09-slot_Z`, `crops/medium/R09-slot_Z` | `strips/high/R09`, `strips/low/R09`, `strips/medium/R09` |
| R10 | Run, live (dive) | animation, readability | `high/desktop/R10`, `high/landscape/R10`, `high/mobile/R10`, `low/desktop/R10`, `low/landscape/R10`, `low/mobile/R10`, `medium/desktop/R10`, `medium/landscape/R10`, `medium/mobile/R10` | `crops/high/R10-carrier`, `crops/low/R10-carrier`, `crops/medium/R10-carrier` | `strips/high/R10`, `strips/low/R10`, `strips/medium/R10` |
| R11 | Outside run, cutting upfield (sweep) | animation | `high/desktop/R11`, `low/desktop/R11`, `medium/desktop/R11` | `crops/high/R11-carrier`, `crops/low/R11-carrier`, `crops/medium/R11-carrier` | `strips/high/R11`, `strips/low/R11`, `strips/medium/R11` |
| R12 | Tackle result (bodies on the ground) | animation, art | `high/desktop/R12`, `high/landscape/R12`, `high/mobile/R12`, `low/desktop/R12`, `low/landscape/R12`, `low/mobile/R12`, `medium/desktop/R12`, `medium/landscape/R12`, `medium/mobile/R12` | `crops/high/R12-carrier`, `crops/low/R12-carrier`, `crops/medium/R12-carrier` | — |
| R13 | Tackle contact from the sideline replay | animation | `high/desktop/R13`, `low/desktop/R13`, `medium/desktop/R13` | `crops/high/R13-carrier`, `crops/low/R13-carrier`, `crops/medium/R13-carrier` | `strips/high/R13`, `strips/low/R13`, `strips/medium/R13` |
| R14 | Touchdown celebration | animation, authenticity | `high/desktop/R14`, `high/landscape/R14`, `high/mobile/R14`, `low/desktop/R14`, `low/landscape/R14`, `low/mobile/R14`, `medium/desktop/R14`, `medium/landscape/R14`, `medium/mobile/R14` | `crops/high/R14-carrier`, `crops/low/R14-carrier`, `crops/medium/R14-carrier` | — |
| R15 | Sideline replay (sweep) | lighting, animation | `high/desktop/R15`, `low/desktop/R15`, `medium/desktop/R15` | — | — |
| R16 | Field goal from behind the kicker | lighting | `high/desktop/R16`, `low/desktop/R16`, `medium/desktop/R16` | `crops/high/R16-slot_K`, `crops/low/R16-slot_K`, `crops/medium/R16-slot_K` | — |
| R17 | Punt | animation, lighting | `high/desktop/R17`, `low/desktop/R17`, `medium/desktop/R17` | — | — |
| R18 | Rain at night, run live | lighting | `high/desktop/R18`, `high/landscape/R18`, `high/mobile/R18`, `low/desktop/R18`, `low/landscape/R18`, `low/mobile/R18`, `medium/desktop/R18`, `medium/landscape/R18`, `medium/mobile/R18` | `crops/high/R18-turf_26_67_40`, `crops/low/R18-turf_26_67_40`, `crops/medium/R18-turf_26_67_40` | — |
| R19 | Day game with mist, pre-snap | lighting | `high/desktop/R19`, `low/desktop/R19`, `medium/desktop/R19` | — | — |
| R20 | 3A home field (Jessieville), pre-snap | authenticity, art | `high/desktop/R20`, `low/desktop/R20`, `medium/desktop/R20` | — | — |
| R21 | First-down result toast | ui, typography | `high/desktop/R21`, `high/landscape/R21`, `high/mobile/R21`, `low/desktop/R21`, `low/landscape/R21`, `low/mobile/R21`, `medium/desktop/R21`, `medium/landscape/R21`, `medium/mobile/R21` | — | — |
| R22 | Play-call screen | ui, typography | `high/desktop/R22`, `high/landscape/R22`, `high/mobile/R22`, `low/desktop/R22`, `low/landscape/R22`, `low/mobile/R22`, `medium/desktop/R22`, `medium/landscape/R22`, `medium/mobile/R22` | — | — |


- **Frames** (`<tier>/<viewport>/Rxx.png`): the game as the player sees it, with HUD.
- **Close-ups** (`crops/<tier>/…`): the same frozen moment through a close camera on one target at 2× pixels. They show asset quality the way a replay or a broadcast close-up would.
- **Strips** (`strips/<tier>/Rxx.png`): 8 consecutive moments, numbered, a few sim ticks apart. **Judge animation from these.**

Score the **high** tier on desktop. Use mobile frames for `mobile` and `readability`.

## What changed this loop (facts only)
Changes since loop 15 (facts only). Score **High** on desktop. Medium is the phone and mid tier. Low is the v2 look, captured to catch regressions.

- **Desktop pre-snap camera.** Steeper (pitch 0.33, was 0.27) with less lens shift, so less sky sits over the formation. It still fits the formation's width plus a margin (34–54 yd).
- **Desktop run camera.** The camera now aims about 1 yd past the carrier (was 6) plus his velocity lead, so on a run he sits nearer the middle of the frame instead of on the bottom edge.
- **Portrait pre-snap (phone).** Back to loop 14's tighter framing (up to 30 yd, slightly shallower angle). Players are larger again. A receiver split wider than that keeps his numbered edge marker at the screen edge.
- **Defensive pre-snap art.** Each rusher's arrow goes straight into his own gap and fans outward, instead of all rushers converging on the quarterback in a knot. Each arrow has a darker outline.
- **No repeated labels.**
  - Kick panel: it says only "Your kick" or "Your try" next to the KICK button. The distance and the instruction appear only on the kick meter.
  - Result panel: after a score it names the next phase ("Next: the try", "Next: kickoff", "Next: free kick", "End of the quarter", and so on). It no longer repeats TOUCHDOWN or GOOD, which the result toast already shows.
- **Capture notes.**
  - Medium and Low R12 on desktop hit the known intermittent R12 rig issue. Low isn't scored.
  - During the perf run an unrelated dev server was loading the CPU at about 80%, so the 4× throttled phone numbers are lower than in loop 15. The unthrottled numbers aren't affected in practice.
- **Unchanged since loop 15:** player and official models, the catch, tackles, falls and body separation, lighting and rain, crowd and venue, the HUD, the toasts and the play-call layout.

## Performance (real GPU; phone proxy is 4× CPU throttle)
| Tier · viewport | min fps | worst p95 frame (ms) | calls | triangles | heap MB |
|---|---|---|---|---|---|
| low · desktop | 661 | 2.1 | 67 | 232k | 23.3 |
| low · mobile | 655 | 1.8 | 61 | 232k | 22.7 |
| medium · desktop | 441 | 2.9 | 94 | 511k | 33.5 |
| medium · mobile | 488 | 2.5 | 88 | 493k | 33.2 |
| high · desktop | 236 | 10.1 | 118 | 722k | 46.3 |
| high · mobile | 261 | 5.6 | 114 | 695k | 41.9 |

(vsync off: fps above 60 is headroom, not what players see.)

## Write
1. A verdict in one paragraph.
2. For each of the 8 categories: the score, then why, citing captures by path (for example `high/desktop/R04`, `crops/high/R04-slot_QB`, `strips/high/R10`) and the benchmark you compared against.
3. The ranked gaps: the specific visual defects or shortfalls that cost the most points, each with a concrete fix, an expected gain, a severity (1–5) and an effort (S/M/L). Name the workstream: WS1 lighting/post, WS2 crowd, WS3 player models/materials, WS4 animation, WS4b tackle physics, WS5 turf/weather, WS7 presentation/HUD/mobile.
4. **The last thing in your reply:** one fenced ```json block per schema.json, with `"role": "critic-claude (Critic A) or critic-codex (Critic B), as assigned"`, `"loop": 16`, `"tier": "high"`.

Don't edit any file. Reply with the review only.
