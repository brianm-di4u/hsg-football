# Judge ruling: loop 1, High tier (desktop; mobile from the mobile captures)

Capture paths are relative to `games/football/screenshots/review-loop-1/`. Benchmarks are in `games/football/benchmarks/`.

## What I opened

The critics are within 1.0 of each other in every category. The largest spread is 0.5, in art, lighting, animation, mobile and authenticity. So no category triggers the mandatory spread check. The advocate did dispute facts, so I opened every capture those disputes rest on:
- Full frames: `high/desktop/R01`, `R04`, `R12`, `R15`, `R16`; `high/mobile/R04`, `R12`, `R21`.
- Strips: `strips/high/R09`, `R10`, `R11`.
- Contact sheets: all three close-up sheets, all four high-desktop sheets, the high-mobile sheet and `sheets/compare-01`. These cover every `crops/high/*` close-up.
- Benchmark: `axis-3`, for calibration.

### Disputed facts and who was right

| Dispute | Ruling | What I checked |
|---|---|---|
| Result banner "covers the play" in `high/mobile/R21`, `high/desktop/R21` (Claude) | **Advocate right.** The banner lies over empty turf below the huddle. | `high/mobile/R21` |
| Banner occlusion in `high/desktop/R16` (Claude) | **Advocate right.** It is the kick meter, below the holder and kicker. The panel does repeat "FIELD GOAL: 45 YD", though. | `high/desktop/R16` |
| Desktop R12 banner covers the pile (Claude) | **Advocate right.** On desktop it covers only one trailing player's legs. On mobile it covers the lower bodies of the pile (#63, #73). | `high/desktop/R12`, `high/mobile/R12` |
| "20 KEMP" tag floats over the official (Claude) | **Claude right, on desktop.** On mobile the tag sits just above the pile. | `high/desktop/R12` |
| R10 strip shows a pose pop between panels 5 and 6 (Codex) | **Advocate right.** The in-world clock reads 3:20 in panels 1–5 and 3:18 in panels 6–8, so the strip skipped the descent. The plank end state is still real (`crops/high/R12-carrier`). | `strips/high/R10` |
| R01 bowl is "empty, no people" (Claude) | **Advocate right on the cause.** `crops/high/R01-crowd` shows a packed stand in the same moment. The emptiness is lighting and camera, not staging. | `high/desktop/R01`, `crops/high/R01-crowd` |
| Away numerals are upside down (Claude) or per-decal (advocate) | **Mostly a white-kit defect, not purely per-kit.** "06" for 90, "53", "47" and "63" are all on white jerseys. "08" on a black back and the stray "e" on a black jersey also appear. | Close-up sheets 01 and 03: `R03-slot_QB`, `R04-slot_C`, `R12-carrier`, `R14-carrier` |
| R11 carrier "split leap" is floaty (Claude) | **Split.** The flight phase is not a defect in itself. The real faults are an unleaned torso and a carrier ring that sits *off* the carrier. The ring is empty in `crops/high/R11-carrier` and in `high/desktop/R15`. | `crops/high/R11-carrier`, `strips/high/R11` |
| R07 QB has the ball on the turf (Claude) | **Confirmed.** #12 stands upright and the ball lies beside his feet. | `crops/high/R07-slot_QB` |
| Replay DOF blurs the whole frame (Claude) | **Confirmed.** The carrier, the ring, near players and far stands are all equally soft. | `high/desktop/R15` |
| R19 is "washed out" (Codex) | **Advocate right.** That is the intended mist. The field-paint halo is real. | `high/desktop/R19` (sheet 04) |

**Process note.** The capture tool should keep strip panels evenly spaced in sim time. If a panel jumps more than 0.5 s, it should flag the jump or insert the missing panel. `strips/high/R10` panels 5 to 6 is one such jump.

## Per-category rulings

### Art: 5.0 (Claude 5.0, Codex 4.5, advocate 5.0)

What earns the 5:
- **Material contrast.** The glossy-helmet against matte-jersey contrast is real (`crops/high/R14-carrier`, `crops/high/R04-slot_QB`).
- **Turf.** It has texture at field level (`crops/high/R04-turf_26_67_42`).
- **Venue.** The fieldhouse, towers and scoreboard read as built objects (`high/desktop/R03`, `crops/high/R01-board`).

The 5 anchor's "no gloss, no texture" therefore no longer applies.

What holds it at 5:
- **Bodies.** Faceted, with tube shins, mitten-block hands and box feet (`crops/high/R04-slot_C`, `crops/high/R06-slot_LG`, `crops/high/R03-slot_QB`).
- **Official.** Faceless (`crops/high/R03-slot_QB`).
- **Crowd.** Cuboids with diamond heads, the 5 anchor verbatim (`crops/high/R01-crowd`).
- **Numerals.** Rotated or garbled numerals are widespread.

`axis-3` (about 7) has smooth bodies, gloves, cleats and a crowd of people. That is two clear steps away.

### Lighting & atmosphere: 6.0 (Claude 6.0, Codex 6.5, advocate 6.5)

At the gameplay cameras the High tier delivers:
- Several soft shadows per player (`high/desktop/R04`, `crops/high/R16-slot_K`).
- Lamp bloom, and warm light falling on the near bleacher (`high/desktop/R04`).
- A convincing dusk sky (`high/desktop/R12`).
- Good mist (`high/desktop/R19`).

I hold it at 6.0, not 6.5, because several defects come from the new post stack itself:
- The replay DOF softens the entire frame (`high/desktop/R15`).
- A tan haze veil sits in the upper corner of the pass camera in all eight panels (`strips/high/R09`).
- Field paint halos in the day mist (`high/desktop/R19`).
- The aerial kick cameras show an unlit bowl with no visible lamp banks (`high/desktop/R01`, and R02 and R17 on sheet 01).
- Rain does not read as wet at the gameplay camera (R18 on sheet 03). Up close, the puddles glitter (`crops/high/R18-turf_26_67_40`).

Against the 7 anchor, shadows and bloom are met, while exposure and falloff are met at some cameras only and wet sheen is not met. `cfb26-3` remains well ahead in bowl light.

### Animation & game feel: 4.5 (Claude 4.5, Codex 4.0, advocate 4.5)

- **What reads.** The run cycle has knee lift and opposite arm–leg swing (`crops/high/R10-carrier`). Stances differ by role (`crops/high/R06-slot_C`, `crops/high/R16-slot_K`). The ball's flight to the target ring is legible (`strips/high/R09`, panels 3–8).
- **Throw.** The QB has the ball on the turf during the wind-up (`crops/high/R07-slot_QB`).
- **Catch.** There is no head turn or reach (`crops/high/R09-slot_Z`, `strips/high/R09`).
- **Tackle.** It ends in rigid planks (`crops/high/R12-carrier`).
- **Celebration.** One pose is cloned across every player (`crops/high/R14-carrier`).
- **Cuts.** There is no torso lean on the cut (`strips/high/R11`).
- **Feel accents.** No punch-in, slow motion or particle accent appears in any strip.

This sits between the 3 and 5 anchors: the cycles read, but there is a ball-handling bug and the falls are stiff.

The animation assets are unchanged since loop 0. The half point over loop 0 reflects the tighter live camera making the cycles more legible. It is not new animation work.

### UI / HUD: 6.0 (Claude 6.0, Codex 6.0, advocate 6.5)

The advocate's factual corrections hold (R21, R16, desktop R12), and the defensive pre-snap card in `high/desktop/R05` deserves credit. Pre-snap identification and banner hierarchy meet the 7 anchor (`high/desktop/R04`, `high/desktop/R14`).

"Nothing stale or overlapping" still fails:
- **Carrier tag.** It sits on the standing official (`high/desktop/R12`).
- **Carrier ring.** It is empty, off the carrier, in replay and live (`high/desktop/R15`, `crops/high/R11-carrier`).
- **Banner.** It covers the pile on the phone (`high/mobile/R12`).
- **Duplicate headings.** Result headings repeat in the panel (`high/desktop/R12`, `high/desktop/R16`).
- **Play list.** It clips the last card (`high/desktop/R22`).

The persistent 28% panel is empty during kicks (`high/desktop/R01`). There is no play clock. The scorebug is clean but is not a broadcast package like `axis-1` or `madden26-3`.

I hold 6.0 because the remaining defects are enough without the two wrong citations.

### Typography: 6.5 (all three 6.5)

- **One display face.** A single condensed face is used consistently, with numerals that read at a glance (`high/desktop/R04`, `high/desktop/R14`). Card type is legible at 390 px (`high/mobile/R22`).
- **Shallow scale.** The panel heading barely outweighs the log (`high/desktop/R12`).
- **Clipping and orphans.** A play name is clipped at the panel bottom (`high/desktop/R22`), and a lone "32." wraps onto its own line on mobile (`high/mobile/R14`, mobile sheet).
- **Scoreboard prop.** Its digits use a slab monospace (`crops/high/R01-board`).

This is minor next to the UI system, but it is a stated one-face violation. Benchmarks: `madden26-3`, `cfb26-1`.

### Readability: 6.0 (all three 6.0)

- **Desktop live.** It reads well: the enlarged ball and cyan target ring in `high/desktop/R08` and `strips/high/R09`, and the carrier tag plus ring in `strips/high/R10`. The line of scrimmage and the first-down line are always shown.
- **Replays.** Blurred, with the ring off the carrier (`high/desktop/R15`).
- **Desktop pre-snap.** The formation sits in a thin band, with the bottom 30% of the frame empty turf (`high/desktop/R04`).
- **Mobile.** Edge receivers are clipped (`high/mobile/R04`) and the banner covers the pile (`high/mobile/R12`).

The 7 anchor asks for "every frame, both viewports", and these frames fail it.

### Mobile: 6.0 (Claude 5.5, Codex 6.0, advocate 6.0)

What meets the anchor:
- Thumb targets are large and the key chips are hidden on touch (`high/mobile/R04`, `high/mobile/R10`).
- The two-column play grid is good (`high/mobile/R22`).
- The live-camera carrier tag is big (`high/mobile/R10`, `high/mobile/R18`).
- Medium under 4× throttle holds 54.7 fps minimum (`perf.json`), above the 30 fps line.

What keeps it off 7:
- About 14% of the viewport is a dark wall band (`high/mobile/R04`, y≈160–400 of 1688).
- Receivers 1 and 2 clip at the edges (`high/mobile/R04`).
- Pre-snap figures are about 20 CSS px tall.
- The banner sits over the pile (`high/mobile/R12`).
- "TIMEOUT (T)" still shows on touch (`high/mobile/R21`).
- No landscape capture exists, so landscape framing can't be credited.

Claude's R21 claim was wrong. That moves me to 6.0 rather than 5.5.

### Authenticity: 6.0 (Claude 5.5, Codex 6.0, advocate 6.0); gate met

What is right:
- The local layer: Garland County opponents, Spa City play names, the HSHS/LHHS board (`crops/high/R01-board`), "WOLVES" and Jessieville end zones (`high/desktop/R03`, `high/desktop/R20`).
- A packed home stand in school colors (`crops/high/R01-crowd`).
- A down-marker box, benches, the fieldhouse and the ridge backdrop (`high/desktop/R04`).
- A tan apron in front of the stands (`crops/high/R01-crowd`), though with no lane lines.

What is missing:
- No band, cheer line or distinct student section.
- The sideline team is a cloned row (`high/desktop/R15`).
- The trees are cones (`high/desktop/R15`).

This meets the ≥6 gate. The 7 anchor (`cfb26-2`, `legendbowl-4`) needs the occasion staged with people.

## Final scores

| Category | Score | Gate | Met |
|---|---|---|---|
| Art | 5.0 | ≥7 | no |
| Lighting | 6.0 | ≥7 | no |
| Animation | 4.5 | ≥7 | no |
| UI | 6.0 | ≥7 | no |
| Typography | 6.5 | ≥7 | no |
| Readability | 6.0 | ≥7 | no |
| Mobile | 6.0 | ≥7 | no |
| Authenticity | 6.0 | ≥6 | yes |

Total 46.0 (loop 0: 42.0). **Verdict: continue.** Seven of eight gates are unmet.

## Ranked gaps (top 12, by expected gain ÷ effort; S=1, M=2, L=4)

I made these merges:
- Claude's G-carrier-tag-anchor and G-result-banner-occlusion become **G-overlay-anchoring**. The carrier-ring offset and the play-list clipping are folded in.
- G-player-construction becomes G-player-mesh-v3.
- G-crowd-staging is split between G-crowd-people (art) and G-hs-staging (authenticity).
- G-stadium-wide-void and G-post-control become **G-bowl-light-bloom**. The replay-focus half of G-post-control goes to G-replay-dof-focus.
- G-locomotion-handling is split. Its ball-binding bug becomes its own S gap (**G-qb-ball-in-hand**) and the rest goes into G-anim-key-beats.
- G-camera-overlay-readability is folded into G-mobile-framing (camera) and G-overlay-anchoring (overlays).

These dropped below the cut: G-desktop-panel-dead-space, G-board-font and G-presentation-density.

Wrong causes I corrected:
- The R01 "empty bowl" is lighting (WS1), not staging.
- The R10 strip "pop" is a sampling gap, so the tackle gap rests on `crops/high/R12-carrier`.

1. **G-overlay-anchoring** (ui, WS7). Severity 3, effort S, gain +0.6.
   - Fix:
     - Project the carrier tag from the carrier's head bone every frame, and drop it to the ring when he is down.
     - Lock the carrier ring to the carrier's root, within 0.3 yd every rendered frame, live and replay.
     - When the result banner's screen box intersects any player within 3 yd of the ball, dock it under the scorebug.
     - Replace the panel's duplicate result heading with drive context.
     - Make the 10-card play list fit or show a scroll affordance, so no card clips at 1280×800.
   - Test: in R12 the tag is over Kemp; in R11 and R15 the ring is under the carrier; in mobile R12 no player is under the banner.
   - Evidence: `high/desktop/R12`, `high/mobile/R12`, `high/desktop/R15`, `crops/high/R11-carrier`, `high/desktop/R22`.
2. **G-replay-dof-focus** (readability, WS1). Severity 3, effort S, gain +0.5.
   - Fix: set the replay focus distance to the camera-to-carrier distance, not the ball. Keep an in-focus band of at least ±5 yd and cap the maximum circle of confusion, so only the far stands blur.
   - Test: the carrier and the contacting defender are as sharp in R13 and R15 as in a live frame.
   - Evidence: `high/desktop/R15`, `high/desktop/R13`.
3. **G-qb-ball-in-hand** (animation, WS4). Severity 4, effort S, gain +0.4.
   - Fix: parent the ball to the QB's throwing-hand socket from snap through the drop and wind-up, until the release tick.
   - Test: `crops/high/R07-slot_QB` shows the ball inside the hand's bounding box, and nothing on the turf.
   - Evidence: `crops/high/R07-slot_QB`.
4. **G-jersey-numerals** (art, WS3). Severity 3, effort S, gain +0.4.
   - Fix: correct the per-decal UV orientation on both kits, front and back. The white kit is worst; the black backs are also affected.
   - Test: render every kit × side × numbers 0–99 and compare each against the glyph.
   - Evidence: `crops/high/R04-slot_C`, `crops/high/R03-slot_QB`, `crops/high/R12-carrier`, `crops/high/R14-carrier`.
5. **G-anim-key-beats** (animation, WS4). Severity 5, effort L, gain +1.5.
   - Fix:
     - Blended key poses: a QB set, load, release and follow-through tied to the release tick.
     - Receiver head turn and arm extension starting at least 6 ticks before the ball arrives.
     - A planted cut foot with at least 10° of torso lean into cuts.
     - Four or more celebration variants assigned per player.
     - A 0.6 s punch-in with slow motion on catch and tackle contact.
   - Test: new R07, R09 and R11 strips show each beat.
   - Evidence: `strips/high/R09`, `crops/high/R09-slot_Z`, `strips/high/R11`, `crops/high/R14-carrier`.
6. **G-player-mesh-v3** (art, WS3). Severity 5, effort L, gain +1.5.
   - Fix:
     - A smooth skinned body with modeled gloves and fingers, shaped cleats and rolled shoulder-pad edges.
     - A face under the facemask.
     - A jersey normal map with folds and seams.
     - Two or three positional builds.
     - Officials with faces and caps.
   - Test: the R03, R04 and R16 close-ups show no faceted torso, block hand or box foot.
   - Evidence: `crops/high/R04-slot_C`, `crops/high/R06-slot_LG`, `crops/high/R03-slot_QB`, `crops/high/R16-slot_K`.
7. **G-mobile-framing** (mobile, WS7). Severity 4, effort M, gain +0.75.
   - Fix:
     - Fit the phone pre-snap camera to the formation width plus an 8% margin, so receivers 1 and 2 are fully inside 390 px.
     - Pitch it so the field reaches within 5% of the top of the viewport (no dark band).
     - Hide "(T)" on TIMEOUT for touch.
     - Add and tune a landscape (844×390) capture.
     - On desktop, lower the pre-snap camera target so the formation sits in the middle third rather than over 30% empty foreground.
   - Evidence: `high/mobile/R04`, `high/mobile/R21`, `high/desktop/R04`.
8. **G-hs-staging** (authenticity, WS2). Severity 3, effort M, gain +0.75.
   - Fix:
     - A uniformed band block in the visitor or end-zone bleacher.
     - A cheer line on the apron.
     - Lane lines on the existing tan apron so it reads as a track.
     - A student-section block in school colors.
     - Varied sideline poses: helmets off, kneeling, coaches with headsets.
   - Evidence: `high/desktop/R15`, `high/desktop/R20`, `crops/high/R01-crowd`.
9. **G-crowd-people** (art, WS2). Severity 4, effort M, gain +0.6.
   - Fix: replace the cuboid-and-diamond figures with instanced impostor cards or low-poly people with heads, shoulders and arms. Give each instance its own shirt and pose, and add aisles.
   - Test: `crops/high/R01-crowd` reads as seated people.
   - Evidence: `crops/high/R01-crowd`, `high/desktop/R15`.
10. **G-rain-wet-read** (lighting, WS5). Severity 2, effort S, gain +0.3.
    - Fix:
      - Darken the wet albedo and lower the roughness until lamp streaks show from the broadcast camera.
      - Prefilter the puddle normals to remove the glitter.
      - Replace the white-cube spray with soft alpha splash sprites.
    - Evidence: R18 on sheet `high-desktop-03`, `crops/high/R18-turf_26_67_40`.
11. **G-tackle-falls** (animation, WS4b). Severity 4, effort L, gain +1.0.
    - Fix:
      - On contact, a wrap pose and shared momentum, then balance loss and a descent of at least 0.4 s.
      - The torso rolls and settles; there are 3–4 fall variants.
      - No body interpenetration.
    - Test: re-capture R10 and R13 with dense, evenly spaced strips.
    - Evidence: `crops/high/R12-carrier`, `strips/high/R10`.
12. **G-bowl-light-bloom** (lighting, WS1). Severity 3, effort M, gain +0.5.
    - Fix:
      - Light the bleacher geometry and crowd from the lamp banks so the stands are lit from the aerial kick cameras.
      - Make the lamp heads emissive and visible from above.
      - Raise the bloom threshold above field-paint luminance.
      - Remove the haze sheet in the pass camera's upper corner.
    - Test: R01, R02 and R17 show a lit crowd and lamp heads; R19 paint has no halo; R07 and R09 have no veil.
    - Evidence: `high/desktop/R01`, `strips/high/R09`, `high/desktop/R19`.

```json
{
  "loop": 1,
  "role": "judge",
  "tier": "high",
  "verdict": "continue",
  "scores": {
    "art": {
      "score": 5.0,
      "confidence": 0.8,
      "evidence": [
        {"shot": "crops/high/R04-slot_C", "note": "Faceted bodies, tube shins, block hands; '06' for 90 on a white jersey."},
        {"shot": "crops/high/R14-carrier", "note": "Glossy helmet vs matte jersey contrast is real; stray 'e' numeral."},
        {"shot": "crops/high/R01-crowd", "note": "Crowd is cuboids with diamond heads (5 anchor verbatim)."},
        {"shot": "crops/high/R04-turf_26_67_42", "note": "Turf texture and mowing bands hold at field level."}
      ]
    },
    "lighting": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "high/desktop/R04", "note": "Lamp bloom, multi-direction soft shadows, warm light on near bleacher."},
        {"shot": "high/desktop/R15", "note": "Replay DOF softens the whole frame including the carrier."},
        {"shot": "high/desktop/R01", "note": "Aerial kick camera looks into an unlit bowl; crowd exists but is unlit."},
        {"shot": "strips/high/R09", "note": "Tan haze veil in the upper corner across all panels."},
        {"shot": "crops/high/R18-turf_26_67_40", "note": "Wet sheen only up close; puddles glitter, cube spray."}
      ]
    },
    "animation": {
      "score": 4.5,
      "confidence": 0.75,
      "evidence": [
        {"shot": "strips/high/R09", "note": "Ball flight legible; no receiver head turn or reach."},
        {"shot": "strips/high/R10", "note": "Panel 5-6 jump spans clock 3:20 to 3:18, a sampling gap, not proof of a pop."},
        {"shot": "crops/high/R07-slot_QB", "note": "QB upright with the ball on the turf during the wind-up."},
        {"shot": "crops/high/R12-carrier", "note": "Plank-flat stiff falls."},
        {"shot": "crops/high/R14-carrier", "note": "Single cloned arms-up celebration."},
        {"shot": "crops/high/R10-carrier", "note": "Run cycle with knee lift and arm-leg swing reads."}
      ]
    },
    "ui": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "high/desktop/R04", "note": "Clean scorebug, shape-coded receiver tags, route art, painted 1ST & 10."},
        {"shot": "high/desktop/R05", "note": "Defensive pre-snap card with blitz lanes."},
        {"shot": "high/desktop/R12", "note": "Carrier tag on the official; duplicate result heading in panel."},
        {"shot": "high/mobile/R12", "note": "Banner covers the lower bodies of the pile."},
        {"shot": "high/mobile/R21", "note": "Banner over empty turf: Claude's occlusion claim here was wrong."},
        {"shot": "high/desktop/R22", "note": "Play list clips the last card."}
      ]
    },
    "typography": {
      "score": 6.5,
      "confidence": 0.75,
      "evidence": [
        {"shot": "high/desktop/R14", "note": "Consistent condensed display face with deliberate weight."},
        {"shot": "high/mobile/R22", "note": "Card titles and RUN/PASS legible at 390 px."},
        {"shot": "high/desktop/R12", "note": "Shallow scale between panel heading and log."},
        {"shot": "crops/high/R01-board", "note": "In-world scoreboard digits in slab monospace."}
      ]
    },
    "readability": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "high/desktop/R08", "note": "Enlarged ball and cyan target ring read at a glance."},
        {"shot": "strips/high/R10", "note": "Carrier tag and ring readable live."},
        {"shot": "high/desktop/R15", "note": "Replay blur; ring empty, off the carrier."},
        {"shot": "high/mobile/R04", "note": "Receivers 1 and 2 clipped at the frame edges; small figures."}
      ]
    },
    "mobile": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/mobile/R04", "note": "Large thumb targets; ~14% dark band at top; edge receivers clipped."},
        {"shot": "high/mobile/R10", "note": "Live camera carrier tag large; full-width JUKE; key chips hidden on touch."},
        {"shot": "high/mobile/R22", "note": "Two-column play grid with large targets."},
        {"shot": "high/mobile/R21", "note": "TIMEOUT (T) keyboard hint leaks on touch."},
        {"shot": "high/mobile/R12", "note": "Banner over the pile."}
      ]
    },
    "authenticity": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "crops/high/R01-crowd", "note": "Packed home stand in school colors exists; R01 emptiness is lighting."},
        {"shot": "high/desktop/R20", "note": "Jessieville end zone, populated small bleachers, light towers."},
        {"shot": "crops/high/R01-board", "note": "HSHS/LHHS small-school scoreboard."},
        {"shot": "high/desktop/R15", "note": "Cloned sideline row, cone trees; no band, cheer or student section."}
      ]
    }
  },
  "gaps": [
    {"id": "G-overlay-anchoring", "category": "ui", "expectedGain": 0.6, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R12", "high/mobile/R12", "high/desktop/R15", "crops/high/R11-carrier", "high/desktop/R22"], "benchmark": "madden26-3", "fix": "Project the carrier tag from the carrier's head bone each frame (drop to ring when down); lock the carrier ring to the carrier root within 0.3 yd every rendered frame, live and replay; dock the result banner under the scorebug whenever its screen box intersects a player within 3 yd of the ball; replace the duplicate panel result heading with drive context; fit or scroll the play list so no card clips at 1280x800."},
    {"id": "G-replay-dof-focus", "category": "readability", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["high/desktop/R15", "high/desktop/R13"], "benchmark": "cfb26-4", "fix": "Set replay focus distance to camera-to-carrier distance, keep an in-focus band of at least +/-5 yd and cap max circle of confusion so only far stands blur; carrier and contacting defender must be as sharp in R13/R15 as in a live frame."},
    {"id": "G-qb-ball-in-hand", "category": "animation", "expectedGain": 0.4, "severity": 4, "effort": "S", "workstream": "WS4", "evidence": ["crops/high/R07-slot_QB"], "benchmark": "madden26-4", "fix": "Parent the ball to the QB throwing-hand socket from snap through drop and wind-up until the release tick; R07-slot_QB must show the ball inside the hand bounding box, never on the turf."},
    {"id": "G-jersey-numerals", "category": "art", "expectedGain": 0.4, "severity": 3, "effort": "S", "workstream": "WS3", "evidence": ["crops/high/R04-slot_C", "crops/high/R03-slot_QB", "crops/high/R12-carrier", "crops/high/R14-carrier"], "benchmark": "madden26-4", "fix": "Correct per-decal UV orientation on both kits front and back (white kit worst, some black backs too); add a render test over every kit x side x number 0-99 compared against the glyph."},
    {"id": "G-anim-key-beats", "category": "animation", "expectedGain": 1.5, "severity": 5, "effort": "L", "workstream": "WS4", "evidence": ["strips/high/R09", "crops/high/R09-slot_Z", "strips/high/R11", "crops/high/R14-carrier"], "benchmark": "madden26-4", "fix": "Blended key poses: QB set/load/release/follow-through tied to the release tick; receiver head turn and arm extension starting >=6 ticks before arrival; planted cut foot with >=10 deg torso lean; 4+ celebration variants per player; 0.6 s punch-in with slow-mo on catch and tackle contact. Verify in new R07/R09/R11 strips."},
    {"id": "G-player-mesh-v3", "category": "art", "expectedGain": 1.5, "severity": 5, "effort": "L", "workstream": "WS3", "evidence": ["crops/high/R04-slot_C", "crops/high/R06-slot_LG", "crops/high/R03-slot_QB", "crops/high/R16-slot_K"], "benchmark": "axis-3", "fix": "Smooth skinned body with modeled gloves/fingers, shaped cleats, rolled shoulder-pad edges, face under the facemask, jersey normal map with folds and seams, 2-3 positional builds; officials get faces and caps. Close-ups must show no faceted torso, block hand or box foot."},
    {"id": "G-mobile-framing", "category": "mobile", "expectedGain": 0.75, "severity": 4, "effort": "M", "workstream": "WS7", "evidence": ["high/mobile/R04", "high/mobile/R21", "high/desktop/R04"], "benchmark": "retrobowl-1", "fix": "Fit the phone pre-snap camera to formation width plus 8% so receivers 1 and 2 sit fully inside 390 px; pitch so the field reaches within 5% of the viewport top (no dark band); hide '(T)' on TIMEOUT for touch; add and tune a landscape 844x390 capture; on desktop lower the pre-snap target so the formation sits in the middle third instead of over 30% empty foreground."},
    {"id": "G-hs-staging", "category": "authenticity", "expectedGain": 0.75, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["high/desktop/R15", "high/desktop/R20", "crops/high/R01-crowd"], "benchmark": "cfb26-2", "fix": "Add a uniformed band block in the visitor or end-zone bleacher, a cheer line on the apron, lane lines on the existing tan apron so it reads as a track, a student-section block in school colors, and varied sideline poses (helmets off, kneeling, coaches with headsets) instead of a cloned row."},
    {"id": "G-crowd-people", "category": "art", "expectedGain": 0.6, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["crops/high/R01-crowd", "high/desktop/R15"], "benchmark": "axis-3", "fix": "Replace cuboid/diamond crowd with instanced impostor cards or low-poly people with heads, shoulders and arms, per-instance shirt color and pose, and aisles; crops/high/R01-crowd must read as seated people."},
    {"id": "G-rain-wet-read", "category": "lighting", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS5", "evidence": ["high/desktop/R18", "crops/high/R18-turf_26_67_40"], "benchmark": "cfb26-4", "fix": "Darken wet albedo and lower roughness until lamp streaks are visible from the broadcast camera in R18; prefilter puddle normals to remove glitter; replace white-cube spray with soft alpha splash sprites."},
    {"id": "G-tackle-falls", "category": "animation", "expectedGain": 1.0, "severity": 4, "effort": "L", "workstream": "WS4b", "evidence": ["crops/high/R12-carrier", "strips/high/R10"], "benchmark": "cfb26-4", "fix": "On contact: wrap pose and shared momentum, balance loss and a descent of >=0.4 s, torso roll and settle, 3-4 fall variants, no body interpenetration. Re-capture R10/R13 with evenly spaced dense strips (current R10 skips 3:20 to 3:18 between panels 5 and 6)."},
    {"id": "G-bowl-light-bloom", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["high/desktop/R01", "strips/high/R09", "high/desktop/R19"], "benchmark": "cfb26-3", "fix": "Light bleacher geometry and crowd from the lamp banks so the stands are lit from the aerial kick cameras (R01/R02/R17), make lamp heads emissive and visible from above, raise the bloom threshold above field-paint luminance (no halo in R19), and remove the haze sheet in the pass camera's upper corner (R07/R09)."}
  ]
}
```
