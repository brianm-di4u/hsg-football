# Advocate rebuttal: loop 7 (High tier)

Capture paths are relative to `games/football/screenshots/review-loop-7/`. I opened every capture cited below before ruling on the claim it supports.

## Summary
Both critics agree on the core picture, and most of their claims hold up against the captures. I concede the pants seat, the faceless officials, abrupt falls, the missing portrait badge for WR2, the toast/board half-rows in landscape and the weak R01 establishing shot. A handful of factual claims are wrong or overstated, and they push lighting, readability, authenticity and mobile down:

- **Critic A says Hot Springs has "no visitor bleachers at all".** False. `high/desktop/R15` is a Hot Springs home replay (gold midfield logo, "HOT SPRINGS HOME" in the scorebug). It shows a full bleacher block of blue/orange/white fans behind the white-jerseyed Lakeside sideline.
- **Critic A says the ball is "dark brown against dark jerseys … only findable as a small lozenge".** False on the frames. In `high/desktop/R08` the ball sits alone against bright turf at about (548, 475), and a cyan target ring marks the receiver. In `high/mobile/R08` it reads just as clearly at about (440, 993). The empty `crops/high/R08-ball` is a capture-rig aiming fault, not something a player sees.
- **Critic A says "the bowl is crushed to black" and there's "no spill or falloff".** Overstated. The lit home stands, a tan apron, haze around the lamp heads, the lit field house and tree lines are all visible in `high/desktop/R03`, `R04`, `R07`, `R20` and `R22`. It holds for the live cameras (`high/desktop/R10`, `R12`) and for R01.
- **Critic A says "no track … visible in any frame".** Overstated. A tan apron runs between the field and the home stands in `high/desktop/R03`, `R04`, `R07`, `R17` and `crops/high/R01-crowd` (bottom band). It isn't a striped rubber track, but it isn't absent either.
- **Critic A says High mobile "does not" hold 30 fps.** The brief's table says min 31 fps for high · mobile · 4× throttle. The 51.4 ms p95 is a fair concern, but "does not hold" contradicts the number. The brief also says Medium is the phone tier, and Medium's minimum is 60.
- **Critic A says there's no wrap and no contact in R13.** Overstated. `crops/high/R13-carrier` shows a black-helmeted defender pressed against carrier #20's back with an arm across him. Contact exists. What's missing is any reaction or fall.

## Category by category

### Art: critics 6.0 / 6.0 (mean 6.0). Proposed 6.0
- **Concede: the pants seat (A, B).** It's plainly visible and is the worst art defect in the set:
  - `crops/high/R04-slot_C`: center #69's orange seat is wider than his torso.
  - `crops/high/R06-slot_C`: QB #10 and DL #56 show the same.
  - `crops/high/R16-slot_K`: holder #12 and kicker #7.
  - `crops/high/R14-carrier`: #74 and #12.
  - This loop's refit hasn't fixed the silhouette under hip flexion.
- **Concede: officials are faceless (A).** `crops/high/R03-slot_QB` shows a black capsule body, no facial features and mitten hands. Correction: they do wear a white cap, also visible in `high/desktop/R14` and `R10`. The fix's "cap brim" is partly there already.
- **Concede: jagged sleeve hem (A, B).** `crops/high/R06-slot_LG`, foreground #20's sleeve shows spiky geometry at the bottom-left.
- **Partly rebut "hands are pale claws or mittens" (A).** `crops/high/R06-slot_C-side` shows separated fingers on #55's hands. They're simplified, not mittens. The mitten description fits the officials, not the players.
- **Rebut "inflated shoulders" (B).** In `crops/high/R04-slot_QB` and `crops/high/R13-carrier`, the shoulder line is a pad-width silhouette. That's genre-correct: the players in `axis-3` carry the same broad pad line. The defect B correctly names is in the pants, not the shoulders.
- **Evidence both critics underweight.** `crops/high/R04-slot_QB` shows a real gloss/matte split between helmet and jersey, with piping, numbers with outlines, sock stripes and helmet decals. `crops/high/R01-crowd` reads as people, with mixed shirts and both arms-up and arms-crossed poses.
- **Verdict.** Both critics are at 6 and the captures support 6. The seat and the officials keep it from 6.5.

### Lighting: critics 6.0 / 6.5 (mean 6.25). Proposed 6.5
- **Concede: R01 is a lit rectangle in a dark surround (A).** True of `high/desktop/R01`. Correction: light-tower poles and a crowd silhouette are faintly visible along the top edge (about x 580 and 655, y 75–140). They're not absent, just unreadable.
- **Rebut "bowl crushed to black, no falloff" as a general claim (A).**
  - `high/desktop/R04` and `R20`: bloom on both lamp heads, a lit home grandstand and lit tree lines.
  - `high/desktop/R03`: a lit field house behind the end zone.
  - `high/desktop/R07`: hazy lamp falloff across the top third.
  - `high/desktop/R17`: brighter center turf falling off to darker sidelines, plus multi-spoke soft shadows under every player, which is the 7 anchor's "several soft shadows".
  - The claim holds for the live cameras only (`high/desktop/R10`, `R12`).
- **Wet turf: both critics are half right.** `crops/high/R18-turf_26_67_40` shows a blown-out specular hotspot, as A says, but also splash droplets around the feet at about (310, 400), (380, 450), (630, 335) and (800, 275). So the "only response is one blob" part is wrong. At gameplay distance in `high/desktop/R18`, the turf doesn't read as wet, as A says. B's "wet sheen exists" overstates it.
- **Bloom (B).** Concede it's broad in `strips/high/R07`, where the top corners are hazed. It's mild in `high/desktop/R19`: there's a slight glow on the bottom yard line, not "excessive". In `high/desktop/R04`, the halos are within range of `cfb26-3`'s lamp bloom.
- **Verdict.** Shadows, lamp bloom, night exposure and a distinct mist variant (`high/desktop/R19`) are all on screen. Missing are wet sheen and spill in live cameras. That's 6.5, not 6.

### Animation: critics 5.5 / 5.0 (mean 5.25). Proposed 5.5
- **Concede: abrupt falls (A, B).** `strips/high/R09` goes from an upright run in panel 5 to two bodies flat in panel 6 and stays there. `strips/high/R10` collapses into a pile in panels 5–6.
- **Concede: intersecting bodies in the pile (B).** `crops/high/R12-carrier` shows the ball resting on top of the pile above #20, and #47's torso passing through #20.
- **Correct "no wrap" in R13 (A).** `crops/high/R13-carrier` shows a defender in contact behind #20 with an arm across his back. The beat that's missing is the carrier's reaction and fall, not the contact itself.
- **Concede: QB drop can't be read in R07 (A).** At the `strips/high/R07` camera distance, it can't.
- **Concede the blocking repetition partly (B).** In `strips/high/R11`, the engaged pairs repeat similar poses. But at this strip resolution (blockers about 15 px tall), stride-to-translation matching can't be judged. `crops/high/R11-carrier` shows a full-extension stride with a forward lean.
- **Evidence for the feel touches the 7 anchor asks for, which B doesn't credit:**
  - The camera punch-in on the catch: `strips/high/R09` panel 4.
  - The replay camera: `strips/high/R13`.
  - Jumps with feet clear of the ground and raised arms in the celebration: `crops/high/R14-carrier`, #9 and #88.
  - A legible wind-up: `crops/high/R07-slot_QB`.
- **Verdict.** These lift the score above the bare 5 anchor ("procedural cycles that read … stiff falls"). 5.5 fits.

### UI / HUD: critics 6.5 / 7.0 (mean 6.75). Proposed 7.0
- **Concede: board half-rows under toasts in landscape (A).** In `high/landscape/R12` and `high/landscape/R21`, a sliver of board digits shows under the toast.
- **Concede: board clipped at the right edge on the portrait TD (A).** In `high/mobile/R14`, the "LHS" score is cut off. It's also shown in the HUD bar, so no information is lost.
- **Concede, minor: feathered toast ends.** Visible in `high/desktop/R21` and `R12`.
- **Rebut "play list is cut off" (A).** `high/desktop/R22` shows ten cards with a scroll fade on the last (play 0, whose title is fully legible). That's a scroll affordance, not clipping.
- **Rebut "dimmed JUKE during the dropback" as a defect (A).** In `high/desktop/R07` and `R08`, JUKE is rendered in a disabled state while the QB holds the ball, and it turns red once there's a runner (`high/desktop/R10`, `high/mobile/R10`). That's a correct state preview. The dead space below it is real.
- **What sits at the 7 anchor:**
  - The broadcast scorebug, and shaped, numbered receiver badges with route art, comparable to `axis-1`: `high/desktop/R04`, `high/landscape/R04`.
  - A result toast whose log agrees with the next spot: `high/desktop/R21`.
  - A clear FG meter: `high/desktop/R16`.
  - Defensive call art: `high/desktop/R05`.
- **Verdict.** The board slivers are a 3D object behind the HUD, not HUD elements overlapping each other. 7.0.

### Typography: critics 6.5 / 7.5 (mean 7.0). Proposed 7.0
- **Rebut "case is inconsistent" (A).** Each component follows its own consistent rule:
  - Panel headers are uniformly upper case: `high/desktop/R03` "YOUR BALL: 1ST & 10 AT THE OWN 20", `high/desktop/R12` "NEXT: 2ND & 5 · OWN 40", `high/desktop/R16` "FIELD GOAL: 45 YD", `high/desktop/R05` "YOUR DEFENSE: FIRE BLITZ".
  - The scorebug data line is uniformly mixed case on every viewport (`high/desktop/R04`, `high/mobile/R04`, `high/landscape/R12`).
  - It's a style choice. One could argue for unifying it, but it isn't a mistake.
- **Rebut the "check-/down" wrap (A).** In `high/desktop/R22`, "check-down" is a hyphenated compound breaking at its own hyphen. That's typographically legitimate, not clipping.
- **Concede: the FG meter sub-label is small (A).** In `high/desktop/R16`, it's about 10 px.
- **Verdict.** One condensed display face and a clean sans run across scorebug, toasts, cards and buttons. Single-line titles in `high/landscape/R22`, and the hierarchy on the phone cards in `high/mobile/R22`, support B's reading. 7.0 is the mean and the captures support it.

### Readability: critics 6.0 / 6.5 (mean 6.25). Proposed 6.5
- **Rebut A's ball claim** (see the summary).
  - `high/desktop/R08`: the ball is a distinct oblong against turf, not jerseys, and the receiver carries a cyan target ring.
  - `high/mobile/R08`: equally clear. A small dark spot on the turf ahead of the ball, at about (500, 1045), looks like its ground shadow.
  - The `crops/high/R08-ball` miss is a crop-targeting fault in the rig, so it shouldn't score against on-screen readability.
- **Concede: WR2 off-screen with no badge (A).** In `high/mobile/R04`, badges 1, 3, 4 and 5 are present and 2 is absent. That contradicts the brief's "badges clamp" for at least one receiver.
- **Concede: badge 1 overlaps a painted yard number.** Also in `high/mobile/R04`.
- **Concede: the carrier nameplate covers bodies just ahead (B).** In `high/mobile/R10`, "44 DELACROIX" sits over the defenders in front of the carrier.
- **What already reads at a glance:**
  - Carrier ring and plate: `high/desktop/R10`, `R11`.
  - LOS and first-down lines in every frame.
  - Target ring on the intended receiver: `high/desktop/R08`.
- **Verdict.** 6.5.

### Mobile: critics 6.0 / 6.5 (mean 6.25). Proposed 6.5
- **Concede: the missing WR2 badge, and the TD board clip (A).** In `high/mobile/R04` and `high/mobile/R14` respectively.
- **Partly rebut "top ~40% empty" (A).** In `high/mobile/R04`, the upper field holds the deep safety at about (260, 575), an official and the midfield logo. That's about 27% of the screen height, and the deep safety is part of a pre-snap read. Trimming more would cut him.
- **Partly rebut "empty downfield region" in R10 (B).** In `high/mobile/R10`, the open field above the pile is the run lane the player is steering into. That is gameplay information, not wasted space.
- **Rebut the performance claim (A).** See the summary: the brief reports min 31 fps for High mobile under 4× throttle and 60 fps for Medium, the phone tier.
- **What sits at the 7 anchor:**
  - Large HIKE and CHANGE PLAY targets: `high/mobile/R04`.
  - The full steer hint and a full-width JUKE: `high/mobile/R10`.
  - Readable two-column cards: `high/mobile/R22`.
  - Six cards on one screen, single-line titles and a compact scorebug in landscape: `high/landscape/R22`.
  - Linemen visibly larger in portrait pre-snap (`high/mobile/R04`) than in landscape (`high/landscape/R04`).
- **Verdict.** 6.5.

### Authenticity: critics 6.0 / 6.5 (mean 6.25). Proposed 6.5
- **Rebut "no visitor bleachers at Hot Springs" (A).** Plainly wrong per `high/desktop/R15`. R04 and R07 just don't frame them.
- **Rebut "no track … in any frame" (A).** Overstated: the tan apron is visible in `high/desktop/R03`, `R04`, `R17` and `crops/high/R01-crowd`.
- **Concede: no band and no student section visible (A).** I found neither in any capture.
- **Concede: R01 doesn't work as an establishing shot (A).**
- **Concede: regimented sideline spacing and repetitive cone trees (B).** In `high/desktop/R15`.
- **What's on screen:**
  - Named local schools with distinct end zones and midfield logos: `high/desktop/R03` "WOLVES", `high/mobile/R22` "TROJANS", `high/desktop/R20` Jessieville.
  - An HS board with DOWN / TO GO / BALL ON: `crops/high/R01-board`.
  - H posts and the Ouachita ridgeline.
  - Small-school bleachers on both sides at Jessieville: `high/desktop/R20`.
  - Visitor stands at Hot Springs: `high/desktop/R15`.
- **Verdict.** B's 6.5 is the better-evidenced score.

## Gap adjustments
- **Critic A:**
  - G-tackle-contact-beat: keep severity 4, gain +0.5. Reworded cause: contact exists (`crops/high/R13-carrier`); the missing beats are the reaction and fall.
  - G-pants-seat-volume: concede, unchanged (severity 4, +0.5).
  - G-establishing-venue: severity 4 → 3. The "add visitor bleachers" half of the fix is moot, since they exist (`high/desktop/R15`). The real fix is the R01 camera aim.
  - G-bowl-light-falloff: gain 0.5 → 0.25. The defect is limited to live cameras and R01.
  - G-portrait-presnap-composition: unchanged (severity 3, +0.5). The missing badge is the core of it; trimming the deep field should keep the safety in frame.
  - G-board-occlusion: severity 3 → 2. It's a one-row sliver; effort S.
  - G-officials-mannequin: unchanged (severity 3, +0.25).
  - G-ball-visibility: severity 3 → 2, gain → 0.1. The ball reads in both R08 frames; only the crop rig fails.
  - G-qb-under-center: severity 3 → 2, gain → 0.1. At the gameplay camera (`high/desktop/R06`) the QB is about 15 px and the stance isn't legible.
  - G-wet-turf: unchanged (severity 3, +0.25). Splash droplets already exist.
  - G-live-panel-dead-space: gain → 0.1. The JUKE state is correct behavior.
  - G-type-case-consistency: gain → 0.1. Only the small FG sub-label is a real defect.
- **Critic B:**
  - G-tackle-resolution: severity 5 → 4, gain 1.0 → 0.5. It duplicates A's tackle gap, and animation gains aren't additive.
  - G-player-anatomy-cloth: gain 1.0 → 0.5. The shoulder component is disputed; the pants overlap A's seat gap.
  - G-blocking-weight: severity 4 → 3, gain 1.0 → 0.5. The strip resolution limits the evidence.
  - G-phone-framing: severity 4 → 3. The R10 run lane is purposeful.
  - G-exposure-bloom: severity 3 → 2, gain 0.5 → 0.25.
  - G-wet-turf: gain 0.5 → 0.25. It duplicates A's.
  - G-crowd-staging: gain 0.5 → 0.25. The larger authenticity gains need a band and a student section, not crowd-pose variety alone.

```json
{
  "loop": 7,
  "role": "advocate",
  "tier": "high",
  "scores": {
    "art": {"score": 6.0, "confidence": 0.8, "evidence": [
      {"shot": "crops/high/R04-slot_C", "note": "Concede: center #69 seat balloons wider than torso."},
      {"shot": "crops/high/R16-slot_K", "note": "Concede: holder #12 and kicker #7 show the same rounded seat."},
      {"shot": "crops/high/R03-slot_QB", "note": "Concede: faceless capsule official (white cap present)."},
      {"shot": "crops/high/R04-slot_QB", "note": "Glossy helmet vs matte jersey, piping, outlined numbers; shoulder width is pad-correct."},
      {"shot": "crops/high/R06-slot_C-side", "note": "Player hands have separated fingers, not mittens."}]},
    "lighting": {"score": 6.5, "confidence": 0.65, "evidence": [
      {"shot": "high/desktop/R04", "note": "Lamp bloom, lit home grandstand, lit tree lines: surroundings not crushed to black pre-snap."},
      {"shot": "high/desktop/R17", "note": "Multi-spoke soft shadows under every player; center-to-sideline falloff."},
      {"shot": "high/desktop/R03", "note": "Lit field house behind the end zone."},
      {"shot": "crops/high/R18-turf_26_67_40", "note": "Splash droplets plus a blown hotspot; wet sheen not convincing."},
      {"shot": "high/desktop/R01", "note": "Concede: establishing shot is a lit rectangle in a dark surround."},
      {"shot": "high/desktop/R19", "note": "Distinct day-mist grade; only mild line bloom."}]},
    "animation": {"score": 5.5, "confidence": 0.7, "evidence": [
      {"shot": "strips/high/R09", "note": "Punch-in on the catch at panel 4; concede abrupt fall panels 5-6."},
      {"shot": "strips/high/R10", "note": "Concede: pile collapses quickly."},
      {"shot": "crops/high/R13-carrier", "note": "Defender in contact with an arm across #20; missing reaction, not contact."},
      {"shot": "crops/high/R12-carrier", "note": "Concede: intersecting bodies, ball resting on the pile."},
      {"shot": "crops/high/R14-carrier", "note": "Celebration jumps with feet clear and raised arms."}]},
    "ui": {"score": 7.0, "confidence": 0.6, "evidence": [
      {"shot": "high/desktop/R04", "note": "Broadcast scorebug, shaped numbered receiver badges, route art (axis-1 class)."},
      {"shot": "high/desktop/R21", "note": "Result toast with hierarchy; log agrees with next spot; feathered ends minor."},
      {"shot": "high/landscape/R12", "note": "Concede: board half-row under the toast."},
      {"shot": "high/desktop/R22", "note": "Last card is a scroll fade, not clipping."},
      {"shot": "high/desktop/R10", "note": "JUKE activates for the runner; dimmed in R07 is a correct state."}]},
    "typography": {"score": 7.0, "confidence": 0.7, "evidence": [
      {"shot": "high/desktop/R12", "note": "Panel headers uniformly uppercase, scorebug line uniformly mixed case: consistent per component."},
      {"shot": "high/landscape/R22", "note": "Single-line titles and header."},
      {"shot": "high/mobile/R22", "note": "Clear card hierarchy at phone width."},
      {"shot": "high/desktop/R16", "note": "Concede: FG sub-label ~10px."}]},
    "readability": {"score": 6.5, "confidence": 0.7, "evidence": [
      {"shot": "high/desktop/R08", "note": "Ball clearly visible against turf; cyan target ring on the receiver."},
      {"shot": "high/mobile/R08", "note": "Ball and target ring readable on phone; apparent ground shadow."},
      {"shot": "high/desktop/R10", "note": "Carrier ring and name plate; LOS and first-down lines."},
      {"shot": "high/mobile/R04", "note": "Concede: WR2 has no clamped badge; badge 1 over a yard number."}]},
    "mobile": {"score": 6.5, "confidence": 0.65, "evidence": [
      {"shot": "high/mobile/R04", "note": "Big thumb targets, larger linemen; deep safety occupies the upper field; WR2 badge missing."},
      {"shot": "high/mobile/R10", "note": "Full steer hint, full-width JUKE; open field is the run lane."},
      {"shot": "high/landscape/R22", "note": "Six cards, single-line titles, compact scorebug."},
      {"shot": "high/mobile/R14", "note": "Concede: board clipped at the right edge."}]},
    "authenticity": {"score": 6.5, "confidence": 0.7, "evidence": [
      {"shot": "high/desktop/R15", "note": "Visitor bleachers exist at Hot Springs behind the Lakeside sideline (contradicts Critic A); regimented sideline spacing."},
      {"shot": "high/desktop/R20", "note": "Small-school bleachers both sides, HS board, trees."},
      {"shot": "high/desktop/R03", "note": "Wolves end zone, field house, tan apron, Ouachita ridge."},
      {"shot": "crops/high/R01-board", "note": "HS scoreboard with DOWN / TO GO / BALL ON."},
      {"shot": "high/desktop/R01", "note": "Concede: kickoff establishing shot shows no venue character."}]}
  },
  "gaps": [
    {"id": "G-tackle-contact-beat", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "L", "workstream": "WS4b", "evidence": ["strips/high/R09", "strips/high/R10", "crops/high/R13-carrier"], "benchmark": "cfb26-4", "fix": "Contact already happens (R13 crop); add the carrier's stagger and directional fall arc, varied landings, and a replay punch-in on contact."},
    {"id": "G-pants-seat-volume", "category": "art", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS3", "evidence": ["crops/high/R04-slot_C", "crops/high/R06-slot_C", "crops/high/R16-slot_K", "crops/high/R14-carrier"], "benchmark": "axis-3", "fix": "Re-weight pelvis and glute vertices so they don't swell under hip flexion; cut seat volume further; add cloth folds via normal map."},
    {"id": "G-establishing-venue", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS2", "evidence": ["high/desktop/R01", "high/desktop/R15"], "benchmark": "cfb26-2", "fix": "Re-aim the R01 and kickoff cameras to take in the lit home grandstand, towers and the existing visitor stands (they exist, see R15); a band block would add more."},
    {"id": "G-bowl-light-falloff", "category": "lighting", "expectedGain": 0.25, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["high/desktop/R10", "high/desktop/R12", "high/desktop/R01"], "benchmark": "cfb26-3", "fix": "Lamp spill onto the stands and apron in live and kickoff cameras; pre-snap cameras already show lit stands."},
    {"id": "G-portrait-presnap-composition", "category": "mobile", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["high/mobile/R04"], "benchmark": "retrobowl-1", "fix": "Always render an edge-clamped badge with an arrow for every eligible receiver (WR2 has none); keep badges off painted numbers; trim the deep field only as far as the deep safety allows."},
    {"id": "G-board-occlusion", "category": "ui", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/landscape/R12", "high/landscape/R21", "high/mobile/R14"], "benchmark": "madden26-3", "fix": "Extend the sliver rule to boards occluded by the toast or clipped horizontally."},
    {"id": "G-officials-mannequin", "category": "art", "expectedGain": 0.25, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["crops/high/R03-slot_QB", "crops/high/R04-slot_C"], "benchmark": "axis-3", "fix": "Player head and skin shader, fingers and belted pants for officials; keep the existing white cap and add a brim."},
    {"id": "G-ball-visibility", "category": "readability", "expectedGain": 0.1, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R08", "high/mobile/R08", "crops/high/R08-ball"], "benchmark": "legendbowl-2", "fix": "The ball already reads in both R08 frames; fix the R08 crop target in the capture rig; an optional faint trail."},
    {"id": "G-qb-under-center", "category": "animation", "expectedGain": 0.1, "severity": 2, "effort": "S", "workstream": "WS4", "evidence": ["crops/high/R06-slot_C", "high/desktop/R06"], "benchmark": "madden26-1", "fix": "Under-center crouch with hands under the center; only visible in close-ups."},
    {"id": "G-wet-turf", "category": "lighting", "expectedGain": 0.25, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["crops/high/R18-turf_26_67_40", "high/desktop/R18"], "benchmark": "legendbowl-1", "fix": "Splashes already exist; darken wet albedo, lower roughness with stretched lamp reflections, clamp the hotspot."},
    {"id": "G-live-panel-dead-space", "category": "ui", "expectedGain": 0.1, "severity": 2, "effort": "M", "workstream": "WS7", "evidence": ["high/desktop/R07", "high/desktop/R08"], "benchmark": "axis-1", "fix": "Fill or collapse the empty live panel; the dimmed JUKE state is correct and can stay."},
    {"id": "G-type-case-consistency", "category": "typography", "expectedGain": 0.1, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R16", "high/desktop/R12"], "benchmark": "madden26-3", "fix": "Raise the FG sub-label to a 12px minimum; the case split is per-component and optional to unify."},
    {"id": "G-tackle-resolution", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "L", "workstream": "WS4b", "evidence": ["strips/high/R09", "strips/high/R10", "crops/high/R12-carrier"], "benchmark": "cfb26-4", "fix": "Duplicates G-tackle-contact-beat: imbalance, fall and settle phases; keep the ball in the carrier's grasp; stop torso intersections in the pile."},
    {"id": "G-player-anatomy-cloth", "category": "art", "expectedGain": 0.5, "severity": 4, "effort": "L", "workstream": "WS3", "evidence": ["crops/high/R04-slot_QB", "crops/high/R06-slot_C-side", "crops/high/R06-slot_LG"], "benchmark": "axis-3", "fix": "Overlaps G-pants-seat-volume: soften the pants, fix the jagged sleeve hem, add cloth folds; pad-width shoulders are genre-correct and don't need shrinking."},
    {"id": "G-blocking-weight", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS4", "evidence": ["strips/high/R11", "strips/high/R13"], "benchmark": "madden26-4", "fix": "Vary engaged blocking poses with push/recoil and release beats; strip resolution limits the stride-matching evidence."},
    {"id": "G-phone-framing", "category": "mobile", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["high/mobile/R04", "high/mobile/R10"], "benchmark": "retrobowl-1", "fix": "Clamp badges for every receiver pre-snap; offset the carrier nameplate from bodies ahead; keep the run lane visible during live runs."},
    {"id": "G-exposure-bloom", "category": "lighting", "expectedGain": 0.25, "severity": 2, "effort": "M", "workstream": "WS1", "evidence": ["strips/high/R07", "high/desktop/R19"], "benchmark": "cfb26-4", "fix": "Tighten lamp halos in the R07 camera; mild threshold raise for white markings in mist."},
    {"id": "G-wet-turf-b", "category": "lighting", "expectedGain": 0.25, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["crops/high/R18-turf_26_67_40", "high/desktop/R18"], "benchmark": "cfb26-4", "fix": "Critic B's G-wet-turf, which duplicates Critic A's: multiscale roughness and normal breakup, keep grass texture through the highlight."},
    {"id": "G-crowd-staging", "category": "authenticity", "expectedGain": 0.25, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["crops/high/R01-crowd", "high/desktop/R15"], "benchmark": "legendbowl-4", "fix": "Vary spectator activity by group and loosen the regimented sideline spacing; the larger authenticity gain needs a band and a student section."}
  ],
  "verdict": "continue"
}
```
