# Judge: loop 2, High tier

## Summary
The critics agree closely: no category differs by more than 0.5. The advocate disputed eight facts, so I opened the captures behind each one. I checked:
- frames: `high/desktop/R01`, `R07`, `R12`, `R15`, `R18`, `R20`, `R22`; `high/mobile/R04`, `R08`, `R12`, `R21`
- close-ups: `crops/high/R04-slot_C`, `R07-slot_QB`, `R10-carrier`, `R11-carrier`, `R14-carrier`, `R01-crowd`
- strips: `strips/high/R09`, `R10`, `R13`
- before/after sheet: `sheets/compare-01`

The heavy defects hold:
- Chest numbers are rotated 180°.
- The ball lies on the turf at the QB's cleat.
- Linemen's hands hover above the turf.
- The sweep carrier is frozen mid-air in a split leap.
- The carrier name tag labels the wrong body.
- A haze veil washes the upper frame.
- Rain does not read at game distance.

Several of Critic A's supporting claims are wrong, so the critic means move up 0.5 on UI and mobile and hold on readability. Art and lighting stay at the critic means. Only authenticity clears its gate, so the verdict is **continue**.

## Fact rulings (advocate disputes)
| Claim | Ruling | Capture checked |
|---|---|---|
| A: the result banner covers the tackle (R12) | **Advocate right on desktop.** The pile sits at y≈540; the banner (y≈668–745) covers only a foreground lineman and an official. On mobile the banner clips the feet of the pile's front row, but the pile reads. | `high/desktop/R12`, `high/mobile/R12` |
| A: the carrier ring sits empty beside the carrier | **Split.** The ring is under #44's planted foot at R10 and under the pile at R12. It is a yard off the airborne sweep carrier (R11), and it sits empty several yards from the players in the replay (R15). The bug is lag or interpolation, not a wrong anchor. | `crops/high/R10-carrier`, `crops/high/R11-carrier`, `high/desktop/R15` |
| A: the "20 KEMP" / "44 DELACROIX" tag is detached | **Critic A right.** In R12 the tag sits on the standing official. In R18 it floats about 2 yd above #44. In the R10 strip, panels 6–8, it stays parked over the official after the whistle. | `high/desktop/R12`, `high/desktop/R18`, `strips/high/R10` |
| A: the mobile R08 target is jammed at the right edge | **Advocate right.** The cyan ring is at x≈600 of 780, with the receiver fully in frame. | `high/mobile/R08` |
| A: stale JUKE panel, no target identification | **Advocate right.** The sidebar keeps the Promenade Slants route art, and the target is ringed in cyan on the turf. | `high/desktop/R07` |
| A: dark, empty stands (R01/R02/R17) | **Both partly right.** The sideline crowd is lit and school-colored whenever it is in frame (R20, R15, `crops/high/R01-crowd`). But the end-zone and perimeter bowl that the kickoff camera and every phone camera *do* show is an unlit, empty grey-black band (R01; mobile R04, R21). R01 is unchanged from loop 1 (`sheets/compare-01`). The cause is lighting and population of the perimeter plus camera choice, not unlit crowd cards. | `high/desktop/R01`, `high/mobile/R04`, `high/desktop/R20` |
| B: the shoulder numbers are inverted too | **Advocate right.** The shoulders read "57" correctly. Only the chests are wrong ("LS", "06"). A light decal patch also shows behind back numbers ("69", "12", "74"). | `crops/high/R04-slot_C`, `crops/high/R07-slot_QB`, `crops/high/R14-carrier` |
| B: lamp glare obscures the lamp structures | **Advocate mostly right.** Poles and heads are visible (R20, R22); the heads blow out to flat white discs. The real glare defect is the beige veil in R07 and in every panel of the R09 strip. | `high/desktop/R20`, `high/desktop/R07`, `strips/high/R09` |

## Category rulings

### Art: 5.5 (critics 5.5 / 5.5; advocate 6.0)
**What earns credit.** The advocate is right that three 5-anchor descriptors are exceeded:
- glossy helmets against matte jerseys (`crops/high/R14-carrier`)
- a crowd that reads as people (`crops/high/R01-crowd`)
- turf grain at field level

**What holds it at 5.5.** The 7 anchor's core test is gear that "holds up in close-ups", and every player close-up fails it:
- The bodies are untapered tubes with ball-joint seams and mitten hands, and the cleats are lozenges (`crops/high/R04-slot_C`, `crops/high/R07-slot_QB`).
- The jerseys have no folds.
- The chest numbers are upside down, and back numbers sit on visible light patches.
- The crowd is one arms-up pose with blown-out white cards.
- The venue is black box stands, cone trees and a flat beige track slab (`high/desktop/R15`).

**Benchmark.** Clearly below axis-3. Below legendbowl-1, whose stylization has no rendering errors. The new meshes added triangles but not anatomy or cloth. **5.5.**

### Lighting & atmosphere: 6.0 (critics 6.0 / 6.0; advocate 6.5)
**What works.**
- Multiple soft shadows fan from each player (`high/desktop/R12`, `crops/high/R11-carrier`).
- The lamp heads bloom (`high/desktop/R20`).
- The dusk grade is attractive, and the wet sparkle is convincing up close.

**What counters it.**
- The beige veil flattens the upper third of R07 and of every panel in `strips/high/R09`.
- The perimeter is an unlit void in R01 and the phone views.
- R18 reads as dry turf with rain streaks over it (`high/desktop/R18`).
- There is a dark vertical smear on the near turf in replay views (bottom center of `high/desktop/R15` and of `strips/high/R13`).

**Rebuttals.** The advocate's falloff point holds only for sideline stands. The lighting setup is unchanged since loop 1, and nothing on screen justifies a rise. **6.0.**

### Animation & game feel: 4.5 (critics 4.5 / 4.5; advocate 4.5)
All three agree, and the captures confirm it:
- **Ball control.** The ball lies on the turf by the QB's foot (`crops/high/R07-slot_QB`).
- **Contact with the turf.** Linemen's hands hover (`crops/high/R04-slot_C`). The sweep carrier hangs in a split leap with both cleats well off the ground (`crops/high/R11-carrier`).
- **Beats.** `strips/high/R09` ends before any catch. `strips/high/R13` never shows contact.
- **Falls.** `strips/high/R10` goes from upright (panel 5) to a body flat on the turf (panel 6) with no captured buckle.

**Credit.** The braced end pose (`crops/high/R12-carrier`) and the varied celebrations (`crops/high/R14-carrier`) are real, but they don't offset ball and contact errors at the 5 anchor's own level. **4.5.**

### UI / HUD: 6.5 (critics 6.0 / 6.5; advocate 6.5)
**What works.**
- A clean broadcast scorebug.
- Numbered, shaped receiver icons with route art (`high/mobile/R04`).
- A result banner with hierarchy, and a "NEXT" panel (`high/desktop/R12`, `high/mobile/R21`).
- A cyan target ring on passes (`high/desktop/R07`).

Three of Critic A's defects were disproven (banner, stale panel, missing target).

**Remaining violations of "nothing stale or overlapping".**
- The carrier tag binds to the wrong body or lags behind (`high/desktop/R12`, `high/desktop/R18`).
- The last play card is cut off with no scroll cue (`high/desktop/R22`).
- There is no play clock.

**6.5.**

### Typography: 6.5 (all 6.5)
- **What works.** A consistent condensed display face with large numerals, and nothing clipped in the HUD (`high/mobile/R21`, `high/desktop/R22`).
- **Contrast.** The advocate's contrast sampling stands.
- **What misses the 7 anchor.** Secondary text is about 13 px (the R22 descriptions and the drive log), tracking is default, and the step from heading to body is shallow. **6.5.**

### Readability: 6.0 (critics 5.5 / 6.0; advocate 6.0)
**What reads.**
- The ball, the line of scrimmage, the first-down line and the throw target all read (`high/desktop/R07`, `high/mobile/R08`).
- The orange pants keep the black home kits legible in R07. Critic A's "sinks into turf" claim is overstated.

**What doesn't.**
- The carrier tag points at the wrong body in the run captures (`high/desktop/R12`, `high/desktop/R18`, `strips/high/R10`). Of the four 7-anchor elements, the carrier is the one most likely to be misread.
- Players are about 25 px tall at 1280 and about 20 CSS px on the phone.

**6.0.**

### Mobile: 6.0 (critics 5.5 / 6.0; advocate 6.0)
**What works.**
- Thumb-sized controls and an intentional portrait layout (`high/mobile/R04`, `high/mobile/R21`).
- Outside receivers stay in frame, and the R08 target is inside the frame.
- Medium at 4× throttle holds a minimum of 58 fps (`perf.json`).

**What doesn't.**
- About 16–20% of the field viewport is an empty, dark bowl above the end zone (`high/mobile/R04`, `high/mobile/R21`).
- The figures are tiny.
- The banner covers the bottom half of the huddle (`high/mobile/R21`) and the pile's feet (`high/mobile/R12`).

**6.0.**

### Authenticity: 6.5 (critics 6.0 / 6.5; advocate 6.5)
**What works.**
- A 3A venue with crowds on both sidelines and pines (`high/desktop/R20`).
- A high-school scoreboard with DOWN / TO GO / BALL ON.
- School-colored crowds, painted end zones and goalposts.

**What's missing.**
- No band and no distinguishable student section in any capture.
- The sideline team stands as a row of identical, evenly spaced clones (`high/desktop/R15`).
- The track is a featureless slab.

The gate (6) is met. **6.5.**

## Ranked gaps (top 12, by expected gain ÷ effort)

1. **G-carrier-tag-binding** (readability, WS7, S, severity 5, +0.5 across readability and UI)
   - Evidence: `high/desktop/R12`, `high/desktop/R18`, `strips/high/R10`, `high/desktop/R15`.
   - Fix: drive the name tag from the current ball-carrier entity's head-bone world position after animation interpolation, every rendered frame. Hide it on the dead-ball whistle. Place the ring at the same interpolated hip XZ, in replays too.
   - Test: in R12, R18, R10 and R15 the tag's anchor lies within 0.5 yd of the carrier's head and the ring center within 0.3 yd of his hips.
2. **G-front-number-decals** (art, WS3, S, severity 5, +0.4)
   - Evidence: `crops/high/R04-slot_C`, `crops/high/R07-slot_QB`, `crops/high/R14-carrier`.
   - Fix: rotate the chest-number decal 180° on every tier and leave the shoulders as they are. Make every number decal's background fully transparent so no light patch shows on chest or back.
   - Test: a front-view render test with asymmetric numbers (57, 12, 69) reads correctly on all tiers.
3. **G-ball-stance-foot-contact** (animation, WS4, M, severity 5, +0.7)
   - Evidence: `crops/high/R07-slot_QB`, `crops/high/R04-slot_C`, `crops/high/R06-slot_C`, `crops/high/R11-carrier`.
   - Merges Critic A's runner-airborne-and-stances gap with Critic B's ball-and-foot-plants gap.
   - Fixes:
     - Parent the ball to the center's hand bones until the snap, then to the QB's throwing-hand bone until release.
     - Build a three-point stance with the down hand IK-pinned to the turf.
     - Clamp stride amplitude in cuts and foot-IK the plant foot.
   - Test: in R07 the ball is in the QB's hand; in R04/R06 the linemen's down hands touch the turf; in R11 at least one cleat is within 5 cm of the turf.
4. **G-post-veil-and-smear** (lighting, WS1, S, severity 3, +0.3)
   - Evidence: `high/desktop/R07`, `strips/high/R09`, `high/desktop/R15`.
   - Fix: cut the height-fog and lamp-glare sprite density on the drop/pass and huddle cameras so the upper third keeps black level. Find and remove the dark vertical smear on the near turf in replay views (likely the depth-of-field or field-limited ambient occlusion edge).
   - Test: the R07 upper third has no beige wash, and the bottom of R15 has no smear.
5. **G-playlist-and-secondary-type** (ui, WS7, S, severity 3, +0.3)
   - Evidence: `high/desktop/R22`, `high/desktop/R12`.
   - Fix: size the play list so complete cards end at the panel edge, or add a fade-and-chevron scroll cue. Raise secondary text from about 13 to 15 px. Add +2–4% tracking on the condensed display caps. Add a play clock to the scorebug.
6. **G-mobile-portrait-framing** (mobile, WS7, M, severity 4, +0.5)
   - Evidence: `high/mobile/R04`, `high/mobile/R21`, `high/mobile/R12`.
   - Merges Critic A's mobile-framing gap with Critic B's phone-player-scale gap.
   - Fix: lower and tilt the portrait camera so the field begins right under the HUD with no empty bowl band. Fit the formation box to at least 85% of the width at about 1.3× the current zoom. Move the result banner to the top edge of the field view.
   - Test: in R04/R08 players are at least 24 CSS px tall; in R21/R12 the banner covers no player.
7. **G-feel-beats** (animation, WS4, M, severity 4, +0.4)
   - Evidence: `strips/high/R09`, `strips/high/R13`, `strips/high/R10`.
   - Fix: a 0.3 s camera punch-in and 0.4× slow motion on the catch and on tackle contact, plus a turf-spray particle burst at contact. Stretch the buckle phase to at least 6 sim ticks so the strip captures it.
   - Test: R09 shows the catch frame, and R10 shows a mid-buckle panel.
8. **G-lit-populated-perimeter** (lighting, WS2, M, severity 4, +0.4 across lighting and authenticity)
   - Evidence: `high/desktop/R01`, `high/mobile/R04`, `high/mobile/R21`, `sheets/compare-01`.
   - Fix: fill the end-zone berms with lamp-lit crowd cards. Add lamp spill onto the track and apron, falling off into the bowl. Reframe the kickoff camera to include one lit sideline stand.
   - Test: R01 and the mobile R04/R21 show lit people beyond the end line.
9. **G-rain-reads-dry** (lighting, WS5, S, severity 3, +0.2)
   - Evidence: `high/desktop/R18`, `high/mobile/R18`.
   - Fix: raise turf specular and lower albedo at grazing angles. Add streaked lamp reflections in the puddles. Use round, alpha-faded splash sprites.
   - Test: R18 reads wet at the gameplay camera without the streaks.
10. **G-player-construction** (art, WS3, L, severity 4, +0.8)
    - Evidence: `crops/high/R04-slot_C`, `crops/high/R06-slot_LG`, `crops/high/R14-carrier`.
    - Merges Critic A's mannequin-bodies gap with Critic B's player-construction gap.
    - Fix: taper the limbs (calf and forearm mass, narrow ankles and wrists) and blend the joints without ball seams. Add five-finger glove silhouettes, sleeve hems, socks and tape. Add jersey normal and roughness maps with mesh, folds and stitching, plus a satin pants sheen.
11. **G-band-student-staging** (authenticity, WS2, M, severity 3, +0.4)
    - Evidence: `high/desktop/R15`, `crops/high/R01-crowd`, `high/desktop/R13`.
    - Fix:
      - Make the band block visible on a captured camera (R01, R13 or R15) with distinct uniform color and instrument silhouettes, and a standing student section.
      - Mix the idle poses per section and clamp card brightness.
      - Break the sideline clone row with varied spacing and poses.
12. **G-paired-tackle-contact** (animation, WS4b, L, severity 4, +0.5)
    - Evidence: `strips/high/R13`, `strips/high/R10`, `crops/high/R12-carrier`.
    - Fix: tackles as paired beats: the defender reaches and wraps, both bodies compress, the carrier loses balance, then they fall together into the existing tangled end pose.
    - Test: a strip panel shows arms wrapped before the fall.

## Verdict
Gates met: authenticity only. Art (5.5), lighting (6.0), animation (4.5), UI (6.5), typography (6.5), readability (6.0) and mobile (6.0) are below 7. **continue.**

```json
{
  "loop": 2,
  "role": "judge",
  "tier": "high",
  "scores": {
    "art": { "score": 5.5, "confidence": 0.85, "evidence": [
      { "shot": "crops/high/R04-slot_C", "note": "chest numbers rotated 180 (57 reads LS); tube limbs, mitten hands; shoulders correct" },
      { "shot": "crops/high/R07-slot_QB", "note": "light decal patch behind back number; lozenge cleats" },
      { "shot": "crops/high/R14-carrier", "note": "glossy helmet vs matte jersey reads (7-anchor trait)" },
      { "shot": "crops/high/R01-crowd", "note": "crowd reads as people; one arms-up pose, blown white cards" },
      { "shot": "high/desktop/R15", "note": "box stand, cone trees, cloned sideline row" }
    ] },
    "lighting": { "score": 6.0, "confidence": 0.8, "evidence": [
      { "shot": "high/desktop/R20", "note": "lamp bloom, lit sideline crowds, dusk grade" },
      { "shot": "high/desktop/R12", "note": "multiple soft shadows per player" },
      { "shot": "high/desktop/R07", "note": "beige haze veil over upper third" },
      { "shot": "high/desktop/R01", "note": "unlit, empty perimeter bowl; unchanged from loop 1 per sheets/compare-01" },
      { "shot": "high/desktop/R18", "note": "rain reads only through streaks; turf looks dry" },
      { "shot": "high/desktop/R15", "note": "dark smear on near turf in replay" }
    ] },
    "animation": { "score": 4.5, "confidence": 0.85, "evidence": [
      { "shot": "strips/high/R10", "note": "panel 5 to 6 upright to flat with no captured buckle; tag parked after whistle" },
      { "shot": "strips/high/R09", "note": "ends before the catch" },
      { "shot": "strips/high/R13", "note": "no legible contact; cluster around an empty ring" },
      { "shot": "crops/high/R07-slot_QB", "note": "ball on turf at QB's cleat" },
      { "shot": "crops/high/R11-carrier", "note": "carrier frozen in mid-air split leap" },
      { "shot": "crops/high/R12-carrier", "note": "braced end pose works" }
    ] },
    "ui": { "score": 6.5, "confidence": 0.75, "evidence": [
      { "shot": "high/desktop/R12", "note": "banner clear of pile; 20 KEMP tag on the official" },
      { "shot": "high/desktop/R07", "note": "route art kept in sidebar; cyan target ring on field" },
      { "shot": "high/desktop/R22", "note": "last play card cut with no scroll cue" },
      { "shot": "high/mobile/R21", "note": "result banner hierarchy plus NEXT panel" }
    ] },
    "typography": { "score": 6.5, "confidence": 0.8, "evidence": [
      { "shot": "high/mobile/R21", "note": "consistent condensed display face, strong numerals" },
      { "shot": "high/desktop/R22", "note": "secondary descriptions about 13 px, default tracking, shallow scale step" }
    ] },
    "readability": { "score": 6.0, "confidence": 0.7, "evidence": [
      { "shot": "high/desktop/R07", "note": "LOS, first-down line, target ring read; orange pants carry home silhouettes" },
      { "shot": "high/mobile/R08", "note": "ball and ringed target visible and in frame" },
      { "shot": "high/desktop/R18", "note": "carrier tag floats 2 yd above carrier near official" },
      { "shot": "high/desktop/R12", "note": "tag labels the official" }
    ] },
    "mobile": { "score": 6.0, "confidence": 0.75, "evidence": [
      { "shot": "high/mobile/R04", "note": "receivers in frame, big buttons; dark empty bowl band and tiny figures" },
      { "shot": "high/mobile/R08", "note": "target ring at x~600/780, not at edge" },
      { "shot": "high/mobile/R21", "note": "banner covers lower half of the huddle" },
      { "shot": "high/mobile/R12", "note": "pile mostly above banner; front-row feet clipped" }
    ] },
    "authenticity": { "score": 6.5, "confidence": 0.75, "evidence": [
      { "shot": "high/desktop/R20", "note": "3A venue, crowds both sidelines, pines, scoreboard" },
      { "shot": "crops/high/R01-crowd", "note": "school-colored crowd" },
      { "shot": "high/desktop/R15", "note": "cloned evenly spaced sideline; no band or student section visible" }
    ] }
  },
  "gaps": [
    { "id": "G-carrier-tag-binding", "category": "readability", "expectedGain": 0.5, "severity": 5, "effort": "S", "workstream": "WS7",
      "evidence": ["high/desktop/R12", "high/desktop/R18", "strips/high/R10", "high/desktop/R15"], "benchmark": "madden26-1",
      "fix": "Drive the name tag from the current ball-carrier entity's head-bone world position after animation interpolation every rendered frame, hide it on the dead-ball whistle, and place the ring at the same interpolated hip XZ (replays too). Test: in R12/R18/R10/R15 the tag anchor is within 0.5 yd of the carrier's head and the ring centre within 0.3 yd of his hips." },
    { "id": "G-front-number-decals", "category": "art", "expectedGain": 0.4, "severity": 5, "effort": "S", "workstream": "WS3",
      "evidence": ["crops/high/R04-slot_C", "crops/high/R07-slot_QB", "crops/high/R14-carrier"], "benchmark": "legendbowl-1",
      "fix": "Rotate chest-number decals 180 degrees on all tiers (shoulders already correct) and make every number decal background fully transparent so no light patch shows on chest or back; add an asymmetric-number (57, 12, 69) front/back render test per tier." },
    { "id": "G-ball-stance-foot-contact", "category": "animation", "expectedGain": 0.7, "severity": 5, "effort": "M", "workstream": "WS4",
      "evidence": ["crops/high/R07-slot_QB", "crops/high/R04-slot_C", "crops/high/R06-slot_C", "crops/high/R11-carrier"], "benchmark": "axis-3",
      "fix": "Parent the ball to the center's hand bones until the snap and to the QB's throwing-hand bone until release; three-point stance with the down hand IK-pinned to the turf; clamp stride amplitude in cuts and foot-IK the plant foot. Test: R07 ball in hand, R04/R06 down hands touching turf, R11 at least one cleat within 5 cm of turf." },
    { "id": "G-post-veil-and-smear", "category": "lighting", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS1",
      "evidence": ["high/desktop/R07", "strips/high/R09", "high/desktop/R15"], "benchmark": "cfb26-3",
      "fix": "Cut height-fog and lamp-glare sprite density on the drop/pass and huddle cameras so the upper third keeps black level; remove the dark vertical smear on the near turf in replay views (DOF or field-limited AO edge). Test: no beige wash in R07 upper third, no smear at bottom of R15." },
    { "id": "G-playlist-and-secondary-type", "category": "ui", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS7",
      "evidence": ["high/desktop/R22", "high/desktop/R12"], "benchmark": "madden26-3",
      "fix": "Size the play list so complete cards end at the panel edge or add a fade-and-chevron scroll cue; raise secondary text from about 13 to 15 px; add +2-4% tracking on condensed display caps; add a play clock to the scorebug." },
    { "id": "G-mobile-portrait-framing", "category": "mobile", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS7",
      "evidence": ["high/mobile/R04", "high/mobile/R21", "high/mobile/R12"], "benchmark": "retrobowl-1",
      "fix": "Lower and tilt the portrait camera so the field starts right under the HUD with no empty bowl band, fit the formation box to at least 85% of width (about 1.3x current zoom), and move the result banner to the top edge of the field view. Test: players at least 24 CSS px tall in R04/R08; banner covers no player in R21/R12." },
    { "id": "G-feel-beats", "category": "animation", "expectedGain": 0.4, "severity": 4, "effort": "M", "workstream": "WS4",
      "evidence": ["strips/high/R09", "strips/high/R13", "strips/high/R10"], "benchmark": "madden26-4",
      "fix": "0.3 s camera punch-in and 0.4x slow motion on the catch and on tackle contact, turf-spray particle burst at contact, and a buckle phase of at least 6 sim ticks. Test: R09 strip shows the catch frame and R10 strip shows a mid-buckle panel." },
    { "id": "G-lit-populated-perimeter", "category": "lighting", "expectedGain": 0.4, "severity": 4, "effort": "M", "workstream": "WS2",
      "evidence": ["high/desktop/R01", "high/mobile/R04", "high/mobile/R21", "sheets/compare-01"], "benchmark": "cfb26-3",
      "fix": "Fill the end-zone berms with lamp-lit crowd cards, add lamp spill on the track and apron falling off into the bowl, and reframe the kickoff camera to include one lit sideline stand. Test: R01 and mobile R04/R21 show lit people beyond the end line." },
    { "id": "G-rain-reads-dry", "category": "lighting", "expectedGain": 0.2, "severity": 3, "effort": "S", "workstream": "WS5",
      "evidence": ["high/desktop/R18", "high/mobile/R18"], "benchmark": "legendbowl-1",
      "fix": "Raise turf specular and lower albedo at grazing angles, add streaked lamp reflections in puddles, use round alpha-faded splash sprites. Test: R18 reads wet at the gameplay camera with rain streaks hidden." },
    { "id": "G-player-construction", "category": "art", "expectedGain": 0.8, "severity": 4, "effort": "L", "workstream": "WS3",
      "evidence": ["crops/high/R04-slot_C", "crops/high/R06-slot_LG", "crops/high/R14-carrier"], "benchmark": "axis-3",
      "fix": "Taper limbs (calf and forearm mass, narrow ankles and wrists) and blend joints without ball seams; five-finger glove silhouettes, sleeve hems, socks and tape; jersey normal and roughness maps with mesh, folds and stitching; satin pants sheen." },
    { "id": "G-band-student-staging", "category": "authenticity", "expectedGain": 0.4, "severity": 3, "effort": "M", "workstream": "WS2",
      "evidence": ["high/desktop/R15", "crops/high/R01-crowd", "high/desktop/R13"], "benchmark": "cfb26-2",
      "fix": "Put the band block (distinct uniform colour, instrument silhouettes) and a standing student section in a captured camera (R01, R13 or R15); mix idle poses per section and clamp card brightness; break the sideline clone row with varied spacing and poses." },
    { "id": "G-paired-tackle-contact", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "L", "workstream": "WS4b",
      "evidence": ["strips/high/R13", "strips/high/R10", "crops/high/R12-carrier"], "benchmark": "cfb26-4",
      "fix": "Tackles as paired beats: defender reach and wrap, shared compression, carrier imbalance, then a coordinated fall into the existing tangled end pose. Test: a strip panel shows arms wrapped before the fall." }
  ],
  "verdict": "continue"
}
```
