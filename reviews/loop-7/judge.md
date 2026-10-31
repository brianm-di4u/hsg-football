# Judge ruling: loop 7 (High tier)

Capture paths are relative to `games/football/screenshots/review-loop-7/`. Before ruling, I opened these captures: `high/desktop/R01, R04, R08, R12, R15, R16, R18, R20, R22`, `high/mobile/R04, R10, R14`, `high/landscape/R04, R21`, `crops/high/R01-crowd, R03-slot_QB, R04-slot_C, R04-slot_QB, R08-ball, R12-carrier, R13-carrier, R18-turf_26_67_40`, and `strips/high/R09, R11, R13`.

No category has critics more than 1.0 apart. Typography is exactly 1.0 apart (6.5 vs 7.5). I still checked every disputed fact.

## Factual disputes
- **Visitor bleachers at Hot Springs (Critic A: "none at all").** Critic A is wrong. `high/desktop/R15` shows a full bleacher block behind the Lakeside sideline, and `strips/high/R13` shows it in every panel. R04 and R07 simply don't frame them.
- **The ball in R08 (Critic A: "dark ball against dark jerseys").** Mostly wrong. In `high/desktop/R08` the ball sits alone over turf at about (548, 475), clear of the jerseys. It is small (about 12 px) and dark brown, so it takes a moment to find, but it is not lost. `crops/high/R08-ball` contains no ball at all. That is a fault in how the capture rig aims the crop, not something a player sees.
- **R13 tackle contact.** Both sides are partly right:
  - `crops/high/R13-carrier` shows a black-helmeted defender pressed into #20's flank, so contact geometry exists (the advocate is right).
  - `strips/high/R13` shows "20 KEMP" upright and running through all 8 panels, with no stagger, wrap or fall. The contact beat does not read (Critic A is right on what is visible).
- **Wet turf.** `crops/high/R18-turf_26_67_40` has small white splash dots, so "the only response is one blob" is wrong. But the dominant feature is a blown-out hotspot, and at gameplay distance (`high/desktop/R18`) the turf reads dry. Critic A's conclusion stands; Critic B's "wet sheen exists" overstates it.
- **"Bowl crushed to black."** True for the live and kickoff cameras: `high/desktop/R01`, `R08`, `R12`, `R18` and `high/mobile/R10` all show a flat dark band around the field. False for pre-snap: `high/desktop/R04` and `R20` show lamp bloom, a lit home grandstand and tree lines.
- **Portrait "top ~40% empty" (Critic A).** Overstated. In `high/mobile/R04` the empty deep field is about 30% of the field view, and it holds the deep safety. The missing WR2 badge is confirmed: badges 1, 3, 4 and 5 show, and 2 is absent.
- **Board half-row under the landscape toast.** Confirmed in `high/landscape/R21`: a row of red digits shows under the "+7 YD · FIRST DOWN" plate. The board is also clipped at the right edge in `high/mobile/R14`.
- **New finding: contradictory field-goal instructions.** In `high/desktop/R16` the panel says "Stop the needle in the green." and the meter's sub-label says "Stop the needle between the uprights". The sub-label is also about 10 px.

## Category rulings

### Art: 6.0 (A 6.0, B 6.0)
- **What works.** `crops/high/R04-slot_QB` shows a real gloss/matte split between helmet and jersey, piping, outlined numbers and helmet decals. `crops/high/R01-crowd` reads as people.
- **What holds it back:**
  - The crouched seat still balloons wider than the torso. In `crops/high/R04-slot_C`, center #69 is the clearest case in the set, and #12 and #44 in `crops/high/R04-slot_QB` show the same rounded seat standing.
  - The officials are black capsule bodies with mitten hands (`crops/high/R03-slot_QB`).
- **Shoulders.** I side with the advocate: the shoulders are a pad-width silhouette, consistent with axis-3.
- **Score.** Below axis-3. 6.0.

### Lighting & atmosphere: 6.0 (A 6.0, B 6.5)
- **What's on screen:**
  - Several soft shadows under each player, and lamp bloom when the towers are in frame (`high/desktop/R04`, `high/desktop/R20`).
  - A good day-mist variant (`high/desktop/R19`, per both critics).
- **What fails.** The two showcase lighting moments both fall short:
  - The R01 establishing shot is a lit rectangle in a dark void, with no readable towers or stands (`high/desktop/R01`).
  - R18 rain has streaks but no wet sheen at gameplay distance, and a blown hotspot in the close-up (`high/desktop/R18`, `crops/high/R18-turf_26_67_40`).
- **Falloff.** The field-to-stands falloff the 7 anchor asks for is missing in every live camera (`high/desktop/R08`, `high/desktop/R12`).
- **Score.** About three of the five 7-anchor elements are present. With R01 and R18 both failing, Critic A's 6.0 is the better-evidenced score.

### Animation & game feel: 5.5 (A 5.5, B 5.0)
- **Falls and tackles:**
  - `strips/high/R09` goes from an upright receiver in panel 5 to two bodies flat on the turf in panel 6, with no fall arc.
  - `strips/high/R13` never shows the carrier react to contact.
  - `crops/high/R12-carrier` shows #47's torso passing through #20, with the ball resting on top of the pile.
  - This is the 5 anchor's "stiff falls".
- **Blocking.** In `strips/high/R11` the engaged blocking pairs repeat the same pose. At about 15 px per figure, foot planting can't be judged.
- **Credit.** The catch punch-in (`strips/high/R09` panel 4) and the replay camera are real feel touches, and the R11 carrier strides and leans. Those lift it half a point above the bare 5 anchor.
- **Score.** 5.5.

### UI / HUD: 6.5 (A 6.5, B 7.0)
- **At or near the 7 anchor.** The scorebug and pre-snap identification (shaped, numbered badges with route art) are at the anchor (`high/desktop/R04`, `high/landscape/R04`).
- **Against it.** The 7 anchor also asks for "nothing stale or overlapping", and these miss it:
  - The board half-row under the toast (`high/landscape/R21`).
  - The board clipped at the right edge on the portrait touchdown (`high/mobile/R14`).
  - The missing WR2 badge in portrait (`high/mobile/R04`).
  - Two contradictory field-goal instructions on screen at once (`high/desktop/R16`).
  - A live panel about 70% empty (`high/desktop/R08`).
- **Rejected.** "Play list cut off" is a scroll fade, not clipping (`high/desktop/R22`, so the advocate is right). The dimmed JUKE is a legitimate disabled state.
- **Score.** 6.5.

### Typography: 7.0 (A 6.5, B 7.5)
- **What works.** One condensed display face and one clean sans run on a consistent scale across the scorebug, toasts, cards and buttons. Numerals read instantly (`high/desktop/R22`, `high/landscape/R21`, `high/mobile/R14`).
- **Case.** The case split is per component and consistent within each one: the scorebug is mixed case, panel headers are upper case (`high/desktop/R12`). The advocate is right that this is a style choice, not an error.
- **Line breaks.** "check-/down" breaks at its own hyphen (`high/desktop/R22`), which is legitimate.
- **Real defect.** The field-goal sub-label is about 10 px (`high/desktop/R16`).
- **Who was right.** Critic B's reading was closer, but the small label keeps it at 7.0, not 7.5.

### Readability: 6.5 (A 6.0, B 6.5)
- **What reads.** The carrier ring and name plate, the blue line of scrimmage and the yellow first-down line read in every frame (`high/desktop/R18`, `high/mobile/R10`). The cyan target ring on the receiver plus the ball over open turf make R08 readable (`high/desktop/R08`).
- **What doesn't:**
  - The ball itself is small and dark, with no ground marker.
  - In portrait pre-snap, WR2 has no badge and badge 1 sits on a painted yard number (`high/mobile/R04`).
  - The "44 DELACROIX" plate covers the bodies just ahead of the carrier (`high/mobile/R10`).
  - Landscape players are small under heavy route art (`high/landscape/R04`).
- **Score.** 6.5.

### Mobile: 6.5 (A 6.0, B 6.5)
- **Improvements in portrait.** It is tighter and more intentional, with large HIKE and CHANGE PLAY targets (`high/mobile/R04`), a full steer hint and a full-width JUKE (`high/mobile/R10`).
- **Landscape.** The scorebug is compact and the header fits on one line (`high/landscape/R04`, `high/landscape/R21`).
- **Defects:** the missing WR2 badge, the board clip on the touchdown (`high/mobile/R14`), the half-row under the landscape toast, and small landscape figures.
- **Performance:**
  - perf.json reports High mobile under 4× throttle at a 31.4 fps minimum (replay) with a 51.4 ms p95. That technically holds 30 fps, so Critic A's "does not" is wrong, but there is little margin.
  - Medium, the phone tier, holds 60.
- **Score.** 6.5.

### Authenticity: 6.5 (A 6.0, B 6.5)
- **What's on screen:**
  - Named local schools with distinct end zones and midfield logos.
  - An HS board with DOWN / TO GO / BALL ON.
  - Visitor stands at Hot Springs (`high/desktop/R15`).
  - Small-school bleachers on both sides plus pines at Jessieville (`high/desktop/R20`).
- **What's missing:**
  - No band and no student section in any capture.
  - The "track" is a plain tan apron (`crops/high/R01-crowd`).
  - The R01 establishing shot conveys no venue (`high/desktop/R01`).
  - The sideline in `high/desktop/R15` is regimented.
- **Score.** Critic A's two "absent" claims were partly wrong. 6.5, which clears the 6 gate.

**Total: 50.5 / 80.** Gates not met: art, lighting, animation, ui, readability and mobile. Typography (7.0) and authenticity (6.5) pass. **Verdict: continue.**

## Ranked gaps (gain ÷ effort, ties by severity)

1. **G-establishing-camera** (authenticity, WS7, S, +0.5, severity 3)
   - Problem: R01 frames a lit rectangle in a black void.
   - Fix: re-aim the R01 and kickoff camera so the top third takes in the lit home grandstand, both light towers with their lamp bloom, and the existing visitor stands (seen in R15).
   - Test: the stands and the towers are both readable in `high/desktop/R01`.
2. **G-tackle-resolution** (animation, WS4b, L, +0.75, severity 5)
   - Merges A's G-tackle-contact-beat and B's G-tackle-resolution.
   - Cause: contact geometry exists; what's missing is the reaction.
   - Fix: on contact, give the carrier 2–3 frames of stagger, then a fall arc driven by the hit direction (no instant prone pose). Keep the ball attached to the carrier's hand through the pile. Add capsule separation so no torso passes through another.
   - Test: `strips/high/R13` shows the carrier stagger and go down; `crops/high/R12-carrier` has no interpenetration and no ball resting on top.
3. **G-pants-seat-volume** (art, WS3, M, +0.5, severity 4)
   - Merges A's seat gap with the pants and sleeve part of B's anatomy gap.
   - Fix: re-weight the pelvis and glute vertices so the seat stays within the jersey width under hip flexion. Smooth the jagged sleeve hem. Add a cloth normal map with folds at the hip and knee.
   - Test: in `crops/high/R04-slot_C` the seat is no wider than the torso.
4. **G-portrait-receiver-badges** (mobile, WS7, M, +0.5, severity 3)
   - Merges A's portrait composition gap and B's phone framing gap.
   - Fix: always draw an edge-clamped badge with an arrow for every eligible receiver (WR2 is missing in `high/mobile/R04`). Nudge badges off painted yard numbers. Offset the carrier name plate above or behind the runner so it doesn't cover the defenders ahead (`high/mobile/R10`).
5. **G-bowl-spill-bloom** (lighting, WS1, M, +0.5, severity 3)
   - Merges A's bowl falloff gap and B's exposure and bloom gap.
   - Fix: add lamp spill onto the stands and the apron, so the surroundings in the live cameras (R08, R12, R18) show the grandstand as a lit gradient rather than a flat dark band. Raise the bloom threshold so only lamp heads bloom, not white field markings.
6. **G-band-student-section** (authenticity, WS2, M, +0.5, severity 3)
   - Merges B's crowd staging gap.
   - Fix: in the home grandstand, add a uniformed band block (one colour, with instruments) and a student section in a solid colour. Vary crowd activity by group (seated or standing) and loosen the evenly spaced sideline.
   - Test: both groups are visible in R01, R15 or R20.
7. **G-board-occlusion** (ui, WS7, S, +0.25, severity 3)
   - Fix: extend the scoreboard sliver rule to hide the board face when a toast covers part of it (`high/landscape/R21`), or when the board is clipped horizontally (`high/mobile/R14`).
8. **G-ball-visibility** (readability, WS7, S, +0.25, severity 2)
   - Fix: add a soft ground-shadow disc under the ball in flight and a brighter lace or stripe highlight, so the 12 px dark ball in `high/desktop/R08` pops.
   - Also fix the R08-ball crop target in the capture rig. That is not a scored defect.
9. **G-fg-copy-labels** (typography, WS7, S, +0.25, severity 2)
   - Merges A's case gap. The case split is not a defect.
   - Fix: use one field-goal instruction (the panel says "in the green", the meter says "between the uprights", `high/desktop/R16`), and set a 12 px minimum for secondary labels.
10. **G-wet-turf** (lighting, WS5, M, +0.25, severity 3)
    - Merges A's and B's wet-turf gaps.
    - Fix: darker wet albedo, multi-scale roughness and normal breakup, and stretched lamp reflections. Clamp the specular hotspot so the grass texture survives through it.
    - Test: `high/desktop/R18` reads wet at gameplay distance.
11. **G-officials-mannequin** (art, WS3, M, +0.25, severity 3)
    - Fix: give officials the player head and skin shader with a face, fingered hands, a cap brim on the existing white cap, a belt and shoes.
    - Test: `crops/high/R03-slot_QB` no longer shows a capsule.
12. **G-live-panel-dead-space** (ui, WS7, M, +0.25, severity 2)
    - Fix: during live play, fill the desktop panel with live context (the target, yards to the marker) or collapse it to widen the field (`high/desktop/R08`). Keep the dimmed-JUKE state.

**Dropped from the top 12 on gain ÷ effort:**
- G-qb-under-center (+0.1, S): only legible in close-ups.
- G-blocking-weight (+0.25, L): the strips are too low-resolution to judge foot planting. Revisit after the tackle work.

```json
{
  "loop": 7,
  "role": "judge",
  "tier": "high",
  "scores": {
    "art": {"score": 6.0, "confidence": 0.85, "evidence": [
      {"shot": "crops/high/R04-slot_C", "note": "Center #69's crouched seat balloons wider than the torso."},
      {"shot": "crops/high/R04-slot_QB", "note": "Real helmet gloss vs matte jersey, piping, outlined numbers; #12 and #44 seats still rounded."},
      {"shot": "crops/high/R03-slot_QB", "note": "Official: black capsule body, mitten hands, white cap."},
      {"shot": "crops/high/R01-crowd", "note": "Crowd reads as people up close."}]},
    "lighting": {"score": 6.0, "confidence": 0.75, "evidence": [
      {"shot": "high/desktop/R01", "note": "Establishing shot: lit rectangle in a dark void, no readable stands or towers."},
      {"shot": "high/desktop/R04", "note": "Lamp bloom, lit home grandstand, soft multi-shadows pre-snap."},
      {"shot": "high/desktop/R18", "note": "Rain streaks but turf reads dry; surroundings a flat dark band."},
      {"shot": "crops/high/R18-turf_26_67_40", "note": "Splash dots exist; dominant feature is a blown hotspot."},
      {"shot": "high/desktop/R12", "note": "No falloff from field to stands in the live camera."}]},
    "animation": {"score": 5.5, "confidence": 0.8, "evidence": [
      {"shot": "strips/high/R13", "note": "20 KEMP stays upright all 8 panels; contact beat does not read."},
      {"shot": "strips/high/R09", "note": "Punch-in at panel 4; upright to flat prone between panels 5 and 6."},
      {"shot": "crops/high/R12-carrier", "note": "#47 torso intersects #20; ball resting on top of the pile."},
      {"shot": "crops/high/R13-carrier", "note": "Defender pressed into the carrier's flank: contact geometry exists."},
      {"shot": "strips/high/R11", "note": "Carrier stride reads; engaged blocking pairs repeat one pose."}]},
    "ui": {"score": 6.5, "confidence": 0.75, "evidence": [
      {"shot": "high/desktop/R04", "note": "Broadcast scorebug, shaped numbered receiver badges and route art."},
      {"shot": "high/landscape/R21", "note": "Stadium-board digit row visible under the toast."},
      {"shot": "high/mobile/R14", "note": "Board clipped at the right edge on the touchdown."},
      {"shot": "high/desktop/R16", "note": "Panel and meter give contradictory FG instructions."},
      {"shot": "high/desktop/R08", "note": "Live panel about 70% empty."},
      {"shot": "high/desktop/R22", "note": "Last card is a scroll fade, not clipping."}]},
    "typography": {"score": 7.0, "confidence": 0.75, "evidence": [
      {"shot": "high/desktop/R22", "note": "Consistent condensed display plus sans; hyphen break is legitimate."},
      {"shot": "high/landscape/R21", "note": "Clear hierarchy in toast, header, buttons and log; numerals instant."},
      {"shot": "high/desktop/R12", "note": "Case split is per component and consistent within each."},
      {"shot": "high/desktop/R16", "note": "FG sub-label about 10 px."}]},
    "readability": {"score": 6.5, "confidence": 0.75, "evidence": [
      {"shot": "high/desktop/R08", "note": "Ball alone over turf with a target ring on the receiver; small and dark, about 12 px."},
      {"shot": "high/mobile/R04", "note": "WR2 has no clamped badge; badge 1 sits on a yard number."},
      {"shot": "high/mobile/R10", "note": "Carrier ring clear; name plate covers the defenders ahead."},
      {"shot": "high/landscape/R04", "note": "Small figures under heavy route art."}]},
    "mobile": {"score": 6.5, "confidence": 0.7, "evidence": [
      {"shot": "high/mobile/R04", "note": "Tighter box framing, large HIKE and CHANGE PLAY; WR2 badge missing."},
      {"shot": "high/mobile/R10", "note": "Full steer hint and full-width JUKE."},
      {"shot": "high/mobile/R14", "note": "Board clipped at the right edge."},
      {"shot": "high/landscape/R21", "note": "Compact scorebug; board half-row under the toast."}]},
    "authenticity": {"score": 6.5, "confidence": 0.75, "evidence": [
      {"shot": "high/desktop/R15", "note": "Visitor bleachers exist at Hot Springs, which refutes Critic A; regimented sideline."},
      {"shot": "high/desktop/R20", "note": "Jessieville small-school bleachers on both sides, HS board, pines."},
      {"shot": "high/desktop/R01", "note": "Establishing shot conveys no venue; no band or student section anywhere."},
      {"shot": "crops/high/R01-crowd", "note": "Tan apron, not a track."}]}
  },
  "gaps": [
    {"id": "G-establishing-camera", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R01", "high/desktop/R15"], "benchmark": "cfb26-2", "fix": "Re-aim the R01/kickoff camera so its top third frames the lit home grandstand, both light towers with bloom and the existing visitor stands; test: stands and towers readable in high/desktop/R01."},
    {"id": "G-tackle-resolution", "category": "animation", "expectedGain": 0.75, "severity": 5, "effort": "L", "workstream": "WS4b", "evidence": ["strips/high/R13", "strips/high/R09", "strips/high/R10", "crops/high/R12-carrier", "crops/high/R13-carrier"], "benchmark": "cfb26-4", "fix": "On contact, play a 2-3 frame carrier stagger and a fall arc driven by hit direction instead of an instant prone pose; keep the ball attached to the carrier's hand; add capsule separation so torsos can't pass through each other in the pile. Test: strips/high/R13 shows the carrier going down, crops/high/R12-carrier shows no interpenetration."},
    {"id": "G-pants-seat-volume", "category": "art", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS3", "evidence": ["crops/high/R04-slot_C", "crops/high/R04-slot_QB", "crops/high/R06-slot_C", "crops/high/R16-slot_K", "crops/high/R06-slot_LG"], "benchmark": "axis-3", "fix": "Re-weight pelvis and glute vertices so the seat stays within the jersey width under hip flexion; smooth the jagged sleeve hem; add a cloth normal map with hip and knee folds. Test: the seat is no wider than the torso in crops/high/R04-slot_C."},
    {"id": "G-portrait-receiver-badges", "category": "mobile", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["high/mobile/R04", "high/mobile/R10"], "benchmark": "retrobowl-1", "fix": "Always draw an edge-clamped badge with an arrow for every eligible receiver (WR2 is missing); nudge badges off painted yard numbers; offset the carrier name plate so it doesn't cover the defenders ahead."},
    {"id": "G-bowl-spill-bloom", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["high/desktop/R08", "high/desktop/R12", "high/desktop/R18", "high/desktop/R19"], "benchmark": "cfb26-3", "fix": "Lamp spill onto the stands and apron so live cameras show the grandstand as a lit gradient rather than a flat dark band; raise the bloom threshold so only lamp heads bloom, not white field markings."},
    {"id": "G-band-student-section", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["crops/high/R01-crowd", "high/desktop/R15", "high/desktop/R20"], "benchmark": "legendbowl-4", "fix": "Add a uniformed band block with instruments and a solid-colour student section to the home grandstand; vary crowd activity by group (seated or standing); loosen the evenly spaced sideline. Test: both groups visible in R01, R15 or R20."},
    {"id": "G-board-occlusion", "category": "ui", "expectedGain": 0.25, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/landscape/R21", "high/landscape/R12", "high/mobile/R14"], "benchmark": "madden26-3", "fix": "Extend the scoreboard sliver rule: hide the board face when a toast covers part of it or when it is clipped horizontally at the viewport edge."},
    {"id": "G-ball-visibility", "category": "readability", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R08", "crops/high/R08-ball"], "benchmark": "legendbowl-2", "fix": "Soft ground-shadow disc under the ball in flight and a brighter lace or stripe highlight on the ball; separately, fix the R08-ball crop target in the capture rig (not a scored defect)."},
    {"id": "G-fg-copy-labels", "category": "typography", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R16"], "benchmark": "madden26-3", "fix": "Use one field-goal instruction (the panel says 'in the green', the meter says 'between the uprights') and a 12px minimum for secondary labels such as the meter sub-label."},
    {"id": "G-wet-turf", "category": "lighting", "expectedGain": 0.25, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["high/desktop/R18", "crops/high/R18-turf_26_67_40"], "benchmark": "legendbowl-1", "fix": "Darker wet albedo, multi-scale roughness and normal breakup, stretched lamp reflections; clamp the specular hotspot so grass texture survives through it. Test: high/desktop/R18 reads wet at gameplay distance."},
    {"id": "G-officials-mannequin", "category": "art", "expectedGain": 0.25, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["crops/high/R03-slot_QB", "crops/high/R12-carrier"], "benchmark": "axis-3", "fix": "Give officials the player head and skin shader with a face, fingered hands, a brim on the existing white cap, a belt and shoes."},
    {"id": "G-live-panel-dead-space", "category": "ui", "expectedGain": 0.25, "severity": 2, "effort": "M", "workstream": "WS7", "evidence": ["high/desktop/R08", "high/desktop/R07"], "benchmark": "axis-1", "fix": "During live play, fill the desktop panel with live context (target, yards to the marker) or collapse it to widen the field; keep the dimmed-JUKE state."}
  ],
  "verdict": "continue"
}
```
