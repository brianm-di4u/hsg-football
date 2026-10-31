# Advocate: loop 2, High tier

I opened every capture cited below, plus the benchmarks axis-3, cfb26-3, retrobowl-1 and legendbowl-1. Where a claim depended on pixel detail, I zoomed it (high/desktop/R12 tag region; strips/high/R10 panels 1 and 6; strips/high/R11 panels 1 and 8) or sampled colours (sidebar text in high/desktop/R04 and high/desktop/R12).

Most of the critics' heavy claims hold. The front numbers are rotated, the passer's ball lies on the turf, line stances hover, the sweep carrier is mid-air, the carrier tag sits on an official, the haze veil is real and rain does not read at game distance. I concede all of these.

A cluster of claims is wrong or blames the wrong cause:
- **Ring.** The ring is correct at rest and only leads the carrier while he moves.
- **Banner.** The desktop result banner does not cover the tackle.
- **Mobile R08.** The target is not at the screen edge.
- **"Dark empty stands".** The kickoff camera frames the stands out. The crowd is lit wherever it is in frame.
- **Drive log.** It is not low-contrast.
- **Shoulder numbers.** They are not inverted.
- **Throw target.** It is marked on the field, which neither critic credited.

Those corrections move UI, readability, mobile, authenticity, lighting and art by half a point. Animation does not move.

## Facts the critics got plainly wrong

1. **Critic A: "The result banner sits on top of the tackle it reports" (`high/desktop/R12`).** It does not. The pile, with the ring under the downed blue carrier, is at about y=545. The banner spans y≈668–745 and overlaps only a foreground lineman and an official. On `high/mobile/R12` the pile (y≈960–1060) sits fully above the banner (top edge y≈1075). Only the feet of the foreground players are covered.
2. **Critic A: "carrier ring sits empty next to the carrier" (`crops/high/R10-carrier`).** In that crop, #44's planted right cleat is on the ring's rim and his hips are over its centre. In `crops/high/R12-carrier` the ring is exactly under the tackled carrier. The empty-ring claim is true only while the carrier is moving fast: in `crops/high/R11-carrier` and `crops/high/R13-carrier` the ring leads the runner by about a yard.
3. **Critic A: the target in `high/mobile/R08` is "jammed against the right edge".** The cyan target ring is at x≈600 of 780 px, about 90 physical px (45 CSS px) from the edge, with the receiver fully in frame.
4. **Critic A: the sidebar descriptions and drive log are "low-contrast grey" (`high/desktop/R04`, `high/desktop/R12`).** Sampled pixels give:
   - Drive log body text: #d8cfbd on #14121f, about 11:1.
   - Play description text: #9a95a0, about 6.5:1.

   Both pass WCAG AA. The real problem is size (about 13 px), not contrast.
5. **Critic A: "no receiver ... ID tags" and the JUKE panel "should show the target".**
   - Pre-snap, every eligible receiver has a numbered, shaped icon (1–5) with route art (`high/desktop/R04`, `high/mobile/R04`). Critic A credits these elsewhere.
   - During the pass, the intended receiver has a cyan target ring on the turf (`high/desktop/R07`, `high/desktop/R08`, `strips/high/R09`, `crops/high/R09-slot_Z`).
   - The "stale" panel in `high/desktop/R07` and `high/desktop/R08` still shows the play diagram (Promenade Slants route art) above a correctly greyed-out JUKE.
6. **Critic A: the stands in `high/desktop/R01`, `R02` and `R17` are "black voids with no lit crowd".**
   - These are high overhead kickoff and punt framings that crop the stands almost entirely out. `high/desktop/R02` still shows a lit crowd sliver at the left edge.
   - Wherever the camera includes a stand, the crowd is lit and school-coloured: `high/desktop/R13`, `high/desktop/R15`, `high/desktop/R14` (top left), `high/desktop/R20` (both sidelines), `high/desktop/R04` (left edge) and `crops/high/R01-crowd`.
   - The defect is real, but its cause is camera composition and the unlit perimeter, not unlit crowd cards.
7. **Critic B: "inverted front/shoulder numerals".** The shoulder numbers read correctly ("57" on both shoulders in `crops/high/R04-slot_C`). Only the chest numbers are inverted. The light decal patch shows on back numbers too ("10" in `crops/high/R06-slot_LG`), which bears on Critic A's fix.
8. **Critic B: "broad beige glare obscures the lamp structures" (`high/desktop/R04`).** Lamp heads and poles are visible top-left and top-right in `high/desktop/R04`, `high/desktop/R20` and `high/desktop/R22`. The heads are blown to flat white rectangles rather than individual lamps. The genuine glare problem is the haze veil in `high/desktop/R07`, `high/desktop/R21` and `strips/high/R07`.

## Category by category

### Art: critics 5.5 / 5.5, mean 5.5. Proposed 6.0
**Conceded:**
- The chest numbers are rotated 180°: "57" reads "LS" in `crops/high/R04-slot_C`, "ae" in `crops/high/R03-slot_QB` and "E9" in `crops/high/R06-slot_LG`.
- Limbs are untapered tubes, hands read as mitts, and there are no cloth folds (`crops/high/R06-slot_LG`, `crops/high/R07-slot_QB`).
- Nearly every fan in `crops/high/R01-crowd` holds the same arms-up pose, and several white shirts blow out.
- The cone trees and black stand boxes are crude (`high/desktop/R15`).

**Rebutted (the score ignores 7-anchor traits that are on screen):**
- The glossy helmet against the matte jersey is plain in `crops/high/R14-carrier`. Facemask cages and shoulder-pad rims read in `crops/high/R04-slot_C`.
- The turf has grain at field level (`crops/high/R04-turf_26_67_42`).
- The crowd reads as people, not blocks (`crops/high/R01-crowd`). The venue has built objects: a press box with windows, a high-school scoreboard and a "WOLVES" end-zone wordmark (`high/desktop/R03`, `crops/high/R01-board`).

The 5 anchor ("no gloss, crowd as colored blocks") is clearly exceeded on three counts. The 7 anchor is missed on cloth and on close-up integrity: the numbers and limbs. That puts the score between them, not on 5.5. Against legendbowl-1, the style is consistent but less resolved; against axis-3, the bodies are clearly weaker. **6.0.**

### Lighting & atmosphere: critics 6.0 / 6.0, mean 6.0. Proposed 6.5
**Conceded:**
- A milky veil washes the upper third of `high/desktop/R07`, `high/desktop/R21` and all eight panels of `strips/high/R07`. It is more severe than Critic A's severity 2 allows.
- Rain reads at game distance only through the streaks (`high/desktop/R18`, `high/mobile/R18`).
- The splashes are square sprites (`crops/high/R18-turf_26_67_40`).

**Rebutted:**
- Several soft shadows fan from every player in `high/desktop/R02`, `high/desktop/R17` and `crops/high/R11-carrier`.
- Lamp bloom shows over visible lamp heads (`high/desktop/R04`, `high/desktop/R20`).
- Wet sheen and sparkle are convincing at close range (`crops/high/R18-turf_26_67_40`).
- Daytime aerial perspective works (`high/desktop/R19`).
- Field-to-stand falloff to a lit crowd is visible whenever a stand is in frame (`high/desktop/R13`, `high/desktop/R20`). The "empty bowl" comes from the kickoff camera framing, not from the lighting.

That covers 4 of the 5 items in the 7 anchor, with the wet sheen holding only up close. cfb26-3 still beats it on luminous accents and depth. **6.5.**

### Animation & game feel: critics 4.5 / 4.5, mean 4.5. Proposed 4.5
**Conceded in full:**
- The ball lies on the turf at the passer's cleat (`crops/high/R07-slot_QB`).
- Linemen's hands hover and the center isn't holding the ball (`crops/high/R04-slot_C`, `crops/high/R06-slot_LG`).
- The sweep carrier is in a mid-air split leap (`crops/high/R11-carrier`).
- `strips/high/R09` ends before the catch, and `strips/high/R13` never shows contact.
- There are no punch-ins, slow motion or particles.

**Credit the critics under-weighted:**
- The end pose is good: the carrier is braced on the turf holding the ball, tangled with the tackler, and the ring is correctly under him (`crops/high/R12-carrier`).
- The celebrations vary: arms-up hops, a carrier holding the ball at the hip, a jumping teammate (`crops/high/R14-carrier`).
- Running strides change and read in `strips/high/R11`.

**Caveat on Critic A's "pop" in `strips/high/R10` panels 5→6.** The panels are "a few sim ticks apart", so a short buckle could fall between captures. The strip proves no buckle was captured, not that none exists. The stance and ball-attachment errors alone keep this below the 5 anchor's "cycles that read". **4.5 stands.**

### UI / HUD: critics 6.0 / 6.5, mean 6.25. Proposed 6.5
**Conceded:**
- "20 KEMP" sits over an official while the real carrier lies in the pile (`high/desktop/R12`, zoomed; `high/mobile/R12`).
- "44 DELACROIX" stays parked over an official after the play is dead (`strips/high/R10` panels 6–8).
- The last card in `high/desktop/R22` is cut off.
- There is no play clock.

**Rebutted:**
- The banner does not cover the tackle (fact 1).
- The target is marked on the field during the pass (`high/desktop/R08`).
- The JUKE panel keeps the play's route art, so it is not stale (`high/desktop/R07`).
- On the moving play the tag sits directly over the carrier in `high/mobile/R10` and in `strips/high/R11` panel 8.
- The scorebug, the receiver icons with route art, the result banner with a "NEXT" panel and the field-goal meter (`high/desktop/R04`, `high/desktop/R21`, `high/desktop/R16`) cover most of the 7 anchor.

The tag bug is the one real "stale or overlapping" violation. **6.5.**

### Typography: critics 6.5 / 6.5, mean 6.5. Proposed 6.5
- **Strengths.** A consistent condensed display face, large numerals and nothing clipped in the HUD (`high/desktop/R21`, `high/mobile/R22`).
- **Rebutted.** The contrast complaint is wrong (fact 4). Critic A's monospace clock on the in-world board (`crops/high/R01-board`) imitates an LED board, which is authentic for a stadium scoreboard; it is not a type-system lapse.
- **Conceded.** Secondary text is small (about 13 px) in `high/desktop/R22`. Tracking is default, and the step from heading to body is shallow.

The 7 anchor's "deliberate tracking" and "clear type scale" are not met. **6.5 stands.**

### Readability: critics 5.5 / 6.0, mean 5.75. Proposed 6.0
**Conceded:**
- The tag mislabels an official (`high/desktop/R12`).
- Figures are tiny on the phone (`high/mobile/R04`, about 12–15 CSS px).
- The foreground official is prominent (`high/desktop/R10`).

**Rebutted or partly rebutted:**
- **Lines and ball.** The line of scrimmage and the first-down line read at a glance (`high/desktop/R04`). The ball is easy to find in flight (`high/desktop/R08`).
- **Target.** The throw target is ringed in cyan (`high/desktop/R08`, `strips/high/R09`).
- **Carrier ring.** It is on or near the carrier in `high/mobile/R10` and `crops/high/R10-carrier`.
- **Home kit.** The black home jerseys do not "sink": the orange pants carry every home silhouette in `high/desktop/R07` and `high/desktop/R10`.

retrobowl-1's star markers and arrows are still more legible. **6.0.**

### Mobile: critics 5.5 / 6.0, mean 5.75. Proposed 6.0
**Conceded:**
- The portrait pre-snap spends y≈160–400 of 1688 on a dark band above the field, and the figures are tiny (`high/mobile/R04`).
- The banner covers the huddle's feet (`high/mobile/R21`).
- Rain reads dry (`high/mobile/R18`).
- As Critic B notes, the 30 fps proxy covers only Medium. There is no throttled High run.

**Rebutted:**
- The R08 target is inside the frame (fact 3).
- The R12 pile is above the banner (fact 1).
- The live-run framing is good: tag and ring sit on the carrier, and the JUKE button spans the full width (`high/mobile/R10`).
- The two-column play grid with thumb-sized cards is deliberate (`high/mobile/R22`).

Landscape is not captured, so it can't be credited. **6.0.**

### Authenticity: critics 6.0 / 6.5, mean 6.25. Proposed 6.5
**Credited:**
- The "WOLVES" end zone, a press box and Lake Hamilton colours (`high/desktop/R03`).
- A 3A venue with crowds on both sidelines and a ring of pines (`high/desktop/R20`).
- A high-school scoreboard with DOWN / TO GO / BALL ON (`crops/high/R01-board`).
- A gooseneck post, a painted end zone and officials (`high/desktop/R14`).

**Conceded:**
- No band or student section is distinguishable in any capture.
- The sideline team stands as evenly spaced clones (`high/desktop/R13`, `high/desktop/R15`).
- The track is a plain beige slab.

This clears the gate of 6 with margin; it falls short of 7 on the band and the students. **6.5.**

## Gaps (critics' gaps with adjusted severity and gain)

**Critic A's gaps:**

| Gap | Adjustment |
|---|---|
| G-front-numbers-rotated | Kept at severity 5, gain +0.4. The patch also shows on back numbers (`crops/high/R06-slot_LG`), so the decal-background fix applies to every number. |
| G-carrier-tag-ring-detached | Severity 5 → 4, gain +0.4. The tag defect is confirmed. The ring is correct at rest (`crops/high/R12-carrier`, `crops/high/R10-carrier`) and leads only during fast motion (`crops/high/R11-carrier`, `crops/high/R13-carrier`): a lag or interpolation offset, not a wrong anchor. |
| G-runner-airborne-and-stances | Kept at severity 5, gain +0.6. |
| G-mannequin-bodies | Kept at severity 4, gain +0.8 → +0.6. It overlaps Critic B's player-construction gap, so the two gains are not additive. |
| G-no-feel-beats | Kept at severity 4, gain +0.5. |
| G-empty-dark-stands | Severity 4 → 3, gain +0.3. The cause is redirected to camera framing (WS7): the kickoff and punt cameras exclude stands that are lit and populated elsewhere (`high/desktop/R13`, `high/desktop/R20`). |
| G-stale-juke-panel | Severity 3 → 2, gain +0.2. The panel keeps the route art, and the target is ringed on the field. |
| G-mobile-framing | Kept at severity 4, gain +0.5 → +0.4. The R08 edge and R12 banner evidence is wrong; the dark band and figure size stand. |
| G-home-dark-on-turf | Severity 3 → 2, gain +0.2. The orange pants carry the silhouettes. |
| G-rain-reads-dry | Kept at severity 3, gain +0.2. |
| G-haze-veil | Severity 2 → 3, gain +0.2 → +0.3. The veil is in all eight panels of `strips/high/R07`. |
| G-crowd-card-variety | Kept at severity 2, gain +0.2. |

**Critic B's gaps:**

| Gap | Adjustment |
|---|---|
| G-player-construction | Kept at severity 5, gain +1.5 → +0.8. The shoulder numbers are fine, and the number fix is S effort inside an L gap. |
| G-ball-and-foot-plants | Kept at severity 5, gain +1.0 → +0.7. It overlaps G-runner-airborne-and-stances. |
| G-paired-contact | Severity 5 → 4, gain +1.0 → +0.5. The end pose already shows a tangled carrier and tackler (`crops/high/R12-carrier`). |
| G-phone-player-scale | Kept at severity 4, gain +1.0 → +0.5. It overlaps G-mobile-framing. |
| G-light-grounding | Severity 4 → 3, gain +1.0 → +0.4. The lamp arrays are visible; the real lever is the veil and the perimeter grade. |
| G-panel-density | Severity 3 → 2, gain +0.3. Contrast already passes; the issues are text size and the cut card. |
| G-school-crowd-staging | Kept at severity 3, gain +0.4. |

```json
{
  "loop": 2,
  "role": "advocate",
  "tier": "high",
  "scores": {
    "art": { "score": 6.0, "confidence": 0.7, "evidence": [
      { "shot": "crops/high/R14-carrier", "note": "glossy helmet vs matte jersey contrast clearly present (7-anchor trait)" },
      { "shot": "crops/high/R01-crowd", "note": "crowd reads as people, not blocks; uniform arms-up pose and blown whites conceded" },
      { "shot": "crops/high/R04-turf_26_67_42", "note": "turf grain at field level" },
      { "shot": "crops/high/R04-slot_C", "note": "chest numbers rotated 180 (57 reads LS); shoulder numbers correct; tube limbs conceded" },
      { "shot": "high/desktop/R03", "note": "built venue objects: press box, WOLVES end zone" }
    ] },
    "lighting": { "score": 6.5, "confidence": 0.65, "evidence": [
      { "shot": "high/desktop/R02", "note": "multiple soft shadows fan from every player" },
      { "shot": "high/desktop/R20", "note": "lamp heads with bloom; lit crowd on both sidelines shows field-to-stand falloff" },
      { "shot": "high/desktop/R13", "note": "stand crowd lit and school-coloured when in frame" },
      { "shot": "crops/high/R18-turf_26_67_40", "note": "convincing wet sheen up close; square splashes conceded" },
      { "shot": "high/desktop/R07", "note": "haze veil over upper third conceded" },
      { "shot": "high/desktop/R18", "note": "rain wet look weak at game distance conceded" }
    ] },
    "animation": { "score": 4.5, "confidence": 0.75, "evidence": [
      { "shot": "crops/high/R07-slot_QB", "note": "ball on turf at passer's feet: conceded" },
      { "shot": "crops/high/R11-carrier", "note": "mid-air split leap during cut: conceded" },
      { "shot": "strips/high/R09", "note": "strip ends before catch; no reach beat" },
      { "shot": "strips/high/R11", "note": "stride changes read" },
      { "shot": "crops/high/R12-carrier", "note": "good braced end pose tangled with tackler" },
      { "shot": "crops/high/R14-carrier", "note": "varied celebration poses" }
    ] },
    "ui": { "score": 6.5, "confidence": 0.7, "evidence": [
      { "shot": "high/desktop/R04", "note": "scorebug, shaped numbered receiver icons, route art" },
      { "shot": "high/desktop/R08", "note": "cyan target ring marks throw target; JUKE panel keeps play diagram" },
      { "shot": "high/desktop/R12", "note": "tag over official conceded; banner does NOT cover the pile (pile y~545, banner y>=668)" },
      { "shot": "high/desktop/R21", "note": "result banner with hierarchy plus NEXT panel" },
      { "shot": "strips/high/R10", "note": "tag parked over official after whistle (panels 6-8) conceded" }
    ] },
    "typography": { "score": 6.5, "confidence": 0.7, "evidence": [
      { "shot": "high/desktop/R21", "note": "consistent condensed display face, large numerals" },
      { "shot": "high/mobile/R22", "note": "clear titles and numerals at phone size" },
      { "shot": "high/desktop/R12", "note": "drive log #d8cfbd on #14121f (~11:1): not low contrast, but small" },
      { "shot": "high/desktop/R22", "note": "small secondary descriptions, default tracking" }
    ] },
    "readability": { "score": 6.0, "confidence": 0.65, "evidence": [
      { "shot": "high/desktop/R08", "note": "ball easy to find; target ringed; LOS and first-down lines clear" },
      { "shot": "high/desktop/R07", "note": "orange pants keep black home kits readable" },
      { "shot": "high/mobile/R10", "note": "tag and ring sit on the carrier during live run" },
      { "shot": "high/desktop/R12", "note": "tag mislabels an official: conceded" },
      { "shot": "high/mobile/R04", "note": "tiny figures conceded" }
    ] },
    "mobile": { "score": 6.0, "confidence": 0.65, "evidence": [
      { "shot": "high/mobile/R22", "note": "intentional two-column play grid, thumb-sized cards" },
      { "shot": "high/mobile/R10", "note": "full-width JUKE, carrier tag/ring on carrier" },
      { "shot": "high/mobile/R08", "note": "target ring at x~600/780, not at the edge" },
      { "shot": "high/mobile/R12", "note": "pile sits above the banner" },
      { "shot": "high/mobile/R04", "note": "dark band above field and tiny figures conceded" }
    ] },
    "authenticity": { "score": 6.5, "confidence": 0.7, "evidence": [
      { "shot": "high/desktop/R03", "note": "WOLVES end zone, press box, Lake Hamilton colours" },
      { "shot": "high/desktop/R20", "note": "3A Jessieville venue, crowds both sidelines, pines" },
      { "shot": "crops/high/R01-board", "note": "high-school scoreboard DOWN/TO GO/BALL ON" },
      { "shot": "high/desktop/R14", "note": "gooseneck post, painted end zone, officials" },
      { "shot": "high/desktop/R13", "note": "cloned evenly spaced sideline; no band or student section: conceded" }
    ] }
  },
  "gaps": [
    { "id": "G-front-numbers-rotated", "category": "art", "expectedGain": 0.4, "severity": 5, "effort": "S", "workstream": "WS3",
      "evidence": ["crops/high/R04-slot_C", "crops/high/R03-slot_QB", "crops/high/R06-slot_LG"], "benchmark": "axis-3",
      "fix": "Rotate chest-number decals 180 degrees (shoulders are already correct); make every number decal background transparent or exactly jersey colour (patch also visible on back numbers); add an asymmetric-number front-view render test." },
    { "id": "G-carrier-tag-ring-detached", "category": "readability", "expectedGain": 0.4, "severity": 4, "effort": "S", "workstream": "WS7",
      "evidence": ["high/desktop/R12", "strips/high/R10", "crops/high/R11-carrier", "crops/high/R13-carrier"], "benchmark": "madden26-1",
      "fix": "Bind the tag to the carrier entity (not a play-spot or a stale id) and hide it when the play is dead; remove the ring's lead during fast motion by sampling the rendered hip position after interpolation. Ring is already correct at rest (crops/high/R12-carrier)." },
    { "id": "G-runner-airborne-and-stances", "category": "animation", "expectedGain": 0.6, "severity": 5, "effort": "M", "workstream": "WS4",
      "evidence": ["crops/high/R11-carrier", "crops/high/R04-slot_C", "crops/high/R06-slot_LG", "crops/high/R07-slot_QB"], "benchmark": "axis-3",
      "fix": "Clamp stride amplitude and foot height in cuts with foot IK to turf; real 3-point stance with planted hand; ball attached to center until snap and to QB hand bone until release." },
    { "id": "G-mannequin-bodies", "category": "art", "expectedGain": 0.6, "severity": 4, "effort": "L", "workstream": "WS3",
      "evidence": ["crops/high/R06-slot_LG", "crops/high/R07-slot_QB", "crops/high/R14-carrier"], "benchmark": "axis-3",
      "fix": "Taper limbs, sleeve hems, socks, readable glove fingers; jersey normal/roughness with folds and stitching; tight-cloth pants with sheen. Overlaps G-player-construction; gains not additive." },
    { "id": "G-no-feel-beats", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS4",
      "evidence": ["strips/high/R09", "strips/high/R13", "strips/high/R10"], "benchmark": "madden26-4",
      "fix": "Camera punch-in and 0.3-0.5x slow motion on catch and tackle; turf-spray particles on contact; a buckle-then-fall blend long enough to be captured between strip panels." },
    { "id": "G-empty-dark-stands", "category": "lighting", "expectedGain": 0.3, "severity": 3, "effort": "M", "workstream": "WS7",
      "evidence": ["high/desktop/R01", "high/desktop/R02", "high/desktop/R17", "high/desktop/R13", "high/desktop/R20"], "benchmark": "cfb26-3",
      "fix": "Cause is framing: reframe kickoff/punt cameras to include a lit sideline stand (crowd is already lit when in frame), then grade the dark perimeter and add track spill light." },
    { "id": "G-stale-juke-panel", "category": "ui", "expectedGain": 0.2, "severity": 2, "effort": "S", "workstream": "WS7",
      "evidence": ["high/desktop/R07", "high/desktop/R08"], "benchmark": "axis-1",
      "fix": "Panel already keeps the route diagram and the field rings the target; replace the disabled JUKE with target name/number until catch or scramble." },
    { "id": "G-mobile-framing", "category": "mobile", "expectedGain": 0.4, "severity": 4, "effort": "S", "workstream": "WS7",
      "evidence": ["high/mobile/R04", "high/mobile/R21"], "benchmark": "retrobowl-1",
      "fix": "Lower and tilt the portrait camera so the field starts under the HUD and zoom about 1.4x on the formation; keep the banner clear of the huddle. (R08 target and R12 pile are already in frame and unobscured.)" },
    { "id": "G-home-dark-on-turf", "category": "readability", "expectedGain": 0.2, "severity": 2, "effort": "S", "workstream": "WS1",
      "evidence": ["high/desktop/R07", "high/desktop/R10"], "benchmark": "madden26-1",
      "fix": "Subtle rim/fresnel on players; orange pants already carry silhouettes, so this is polish." },
    { "id": "G-rain-reads-dry", "category": "lighting", "expectedGain": 0.2, "severity": 3, "effort": "S", "workstream": "WS5",
      "evidence": ["high/desktop/R18", "high/mobile/R18", "crops/high/R18-turf_26_67_40"], "benchmark": "legendbowl-1",
      "fix": "Raise turf specular at grazing angles, streaked lamp reflections in puddles, round alpha-faded splash sprites." },
    { "id": "G-haze-veil", "category": "lighting", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS1",
      "evidence": ["high/desktop/R07", "high/desktop/R21", "strips/high/R07"], "benchmark": "cfb26-3",
      "fix": "Reduce height-fog/glare density near the lamps on the drop and huddle cameras and keep black level in the upper frame." },
    { "id": "G-crowd-card-variety", "category": "art", "expectedGain": 0.2, "severity": 2, "effort": "M", "workstream": "WS2",
      "evidence": ["crops/high/R01-crowd"], "benchmark": "cfb26-1",
      "fix": "Mix idle poses per section, clamp card brightness, dim-to-bright row gradient." },
    { "id": "G-player-construction", "category": "art", "expectedGain": 0.8, "severity": 5, "effort": "L", "workstream": "WS3",
      "evidence": ["crops/high/R04-slot_C", "crops/high/R06-slot_LG"], "benchmark": "axis-3",
      "fix": "Integrate limb and shoe silhouettes, position-specific proportions, restrained cloth folds; correct chest (not shoulder) numerals. Overlaps G-mannequin-bodies and G-front-numbers-rotated." },
    { "id": "G-ball-and-foot-plants", "category": "animation", "expectedGain": 0.7, "severity": 5, "effort": "L", "workstream": "WS4",
      "evidence": ["crops/high/R07-slot_QB", "strips/high/R07", "strips/high/R11"], "benchmark": "cfb26-4",
      "fix": "Ball attachment through snap and wind-up, planted throw and follow-through, planted cutting foot. Overlaps G-runner-airborne-and-stances." },
    { "id": "G-paired-contact", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "L", "workstream": "WS4b",
      "evidence": ["strips/high/R10", "strips/high/R13", "crops/high/R12-carrier"], "benchmark": "cfb26-4",
      "fix": "Add the wrap/compression/imbalance beats before the fall; the end pose (tangled carrier and tackler) already works." },
    { "id": "G-phone-player-scale", "category": "mobile", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS7",
      "evidence": ["high/mobile/R04", "high/mobile/R08"], "benchmark": "retrobowl-1",
      "fix": "Reframe around formation depth, scale route icons to bodies, keep live-play figures larger. Overlaps G-mobile-framing." },
    { "id": "G-light-grounding", "category": "lighting", "expectedGain": 0.4, "severity": 3, "effort": "M", "workstream": "WS1",
      "evidence": ["high/desktop/R04", "high/desktop/R07", "high/desktop/R15"], "benchmark": "cfb26-3",
      "fix": "Lamp arrays are visible; break the blown heads into individual lamps, cut the haze veil, grade the perimeter." },
    { "id": "G-panel-density", "category": "ui", "expectedGain": 0.3, "severity": 2, "effort": "M", "workstream": "WS7",
      "evidence": ["high/desktop/R22", "high/desktop/R04"], "benchmark": "madden26-3",
      "fix": "Enlarge secondary text (contrast already passes) and keep complete cards in view or add an explicit scroll cue." },
    { "id": "G-school-crowd-staging", "category": "authenticity", "expectedGain": 0.4, "severity": 3, "effort": "M", "workstream": "WS2",
      "evidence": ["crops/high/R01-crowd", "high/desktop/R03", "high/desktop/R13"], "benchmark": "cfb26-2",
      "fix": "Make the band block and student section distinct (instruments, uniforms, standing density) and put them in a captured camera; vary sideline spacing and poses." }
  ],
  "verdict": "continue"
}
```
