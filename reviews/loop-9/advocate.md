# Advocate rebuttal: loop 9, High tier

Capture paths are relative to `games/football/screenshots/review-loop-9/`. I opened every capture cited below before ruling on the claim it supports. Critic means are: art 5.75, lighting 6.25, animation 5.25, ui 6.5, typography 6.75, readability 6.5, mobile 6.0, authenticity 6.0.

## Facts the critics got plainly wrong

**Critic A (critic-claude)**
1. **"Nothing is clipped. I checked the 10th play-list card in `high/desktop/R22`."** This is wrong, and the error counts against the build. In `high/desktop/R22` (zoomed to x 925–1280, y 640–800), the tenth card, "Fountain Play-Action", is cut by a fade mask. Its bottom border is never drawn and its description is faded, yet about 60 px of empty panel sits below it. `high/desktop/R03` shows the same.
2. **"No punch-in or slow motion at the catch (`strips/high/R09`)."** The punch-in half is wrong. Between frames 3 and 4 of `strips/high/R09` the camera pushes in at the catch: figures grow about 1.5× and "88 HOLLOWAY" fills the frame. In frame 5 the camera eases back out. I see no evidence of slow motion.
3. **Officials as "faceless black mannequins" in `crops/high/R12-carrier`.** That official has brown skin on his head and arms and wears a black cap. The official in `crops/high/R03-slot_QB` has a white cap. So the "white cap" in the G-officials fix already exists. "Faceless", "mitten hands" and the stiff limbs are correct.
4. **"Portrait receiver tags 1, 2 and 3 sit as half-clipped edge markers" (`high/mobile/R04`).** At pixel zoom, all three badges are drawn whole, each with an outward chevron. They are deliberate off-screen pointers, not clipping. The real problem is that the receivers themselves are off-screen.
5. **"`high/desktop/R18` keeps essentially the dry look apart from thin rain streaks."** This is partly wrong. `crops/high/R18-turf_26_67_40` shows white splash particles at players' feet (around #44, #69 and #68) as well as the specular blob.
6. **"Day mist is a flat grey wash with no depth gradient" (`high/desktop/R19`).** This is partly wrong. Three ridge layers lighten with distance, and the right-hand tree line fades into the haze. The field itself does show little near-to-far grading.

**Critic B (critic-codex)**
1. **Lighting: "a strong common shadow direction rather than a convincing arrangement of several stadium lights" (`high/desktop/R10`, `crops/high/R04-turf_26_67_42`).** The captures contradict this.
   - `high/desktop/R17` and `high/desktop/R02`: every player casts 3–4 radiating shadows.
   - `crops/high/R16-slot_K`: kicker #7 casts two shadows in opposite directions, one to the left and one to the lower right.
   - `crops/high/R08-ball` and `crops/high/R09-slot_Z`: players cast shadows in at least two directions.
   - `crops/high/R04-turf_26_67_42` does have one dominant direction, but it is one framing and does not represent the rig.
2. **Mobile performance is cited from the wrong tier.** Critic B scores phone performance from the High phone proxy (60 min fps, 34.3 ms p95). The brief says Medium is the phone tier. Under 4× throttle, Medium holds 106 min fps with an 18.2 ms worst p95, well clear of 30 fps.
3. **"In `high/desktop/R08` a large static play diagram competes with the live field for space."** The diagram sits inside the right panel (about x 935–1193, y 137–295) and never overlaps the field. The cost is the fixed width of the panel, not the diagram.

## Category by category

### Art: critics 6.0 / 5.5 (mean 5.75). Proposed 6.0
- **Concede the officials.** In `crops/high/R03-slot_QB` the striped sleeves float off the shoulders, the forearms read as separate pieces, the hands are mitts, and there is no face. `crops/high/R12-carrier` shows the same build, though the skin and cap there are correct.
- **Concede Critic B on proportions, in part.** The shoulders are bulbous and the hips pinched over thin shins (`crops/high/R04-slot_QB`). Bent-hip creasing shows in `crops/high/R06-slot_C-side`.
- **Rebut "5.5" as the overall level.** The 7-anchor items hold in several close-ups:
  - `crops/high/R13-carrier`, `crops/high/R14-carrier` and `crops/high/R04-slot_C`: glossy helmets with clear highlights over matte jerseys, outlined numbers, sleeve and pant stripes, readable facemasks.
  - `crops/high/R06-slot_DL2-side`: a clean line of 3-point stances with a planted hand.
  - `crops/high/R01-crowd`: the crowd reads as individual people with varied arm poses and clothing.
  
  This is a style-consistent chunky look in the legendbowl-1 lane. It is not the "primitive" 5 anchor.
- **Concede the venue as flats.** `high/desktop/R13` and `R15` show a floating bleacher box against a flat wall, and `high/desktop/R14` an empty plane behind the end zone.
- **R06 close-ups.** `crops/high/R06-slot_LG` is an over-the-shoulder shot from behind the guard's helmet: the shoulder is shaded, so the camera is not inside the mesh. `crops/high/R06-slot_C-side` does have foreground bodies blocking the shot.
- **Verdict.** 6.0 is supported by the evidence. Critic B's +1.5/severity-5 for player construction overstates a stylisation issue when gear and materials already pass.

### Lighting & atmosphere: critics 6.0 / 6.5 (mean 6.25). Proposed 6.5
- **Rebut the shadow claim** (see the facts section). Several soft shadows per player from different towers are exactly the 7-anchor item: `high/desktop/R17`, `high/desktop/R02`, `crops/high/R16-slot_K`, `crops/high/R08-ball`.
- **Bloom is contained** on the lamp heads with no frame wash (`high/desktop/R01`, `high/desktop/R04`, `high/desktop/R20`). Both critics agree.
- **Night exposure is believable** and the field is brighter than the perimeter (`high/desktop/R01`).
- **Concede the flat midground.** The new light pools are barely visible in `high/desktop/R10` and `R04`.
- **Concede weak wet sheen.** `crops/high/R18-turf_26_67_40` has one blown blob. Splashes exist, but the sheen does not read from the game camera in `high/desktop/R18`.
- **Mist has aerial layering** in `high/desktop/R19`.
- **Verdict.** Multi-source shadows plus contained bloom put this at the upper end of Critic A's range, short of 7 because of wet turf and the flat midground.

### Animation & game feel: critics 5.5 / 5.0 (mean 5.25). Proposed 5.5
- **Concede after contact.**
  - `strips/high/R10` frames 6–8 hold the same pose. These are dead-ball frames with the banner up, and the strip is only a few sim ticks apart, so near-stillness alone does not prove a hard freeze. Even so, no settle is visible.
  - In `strips/high/R09` frames 6–8 the diving defender is a rigid horizontal plank. That is a real defect.
  - `strips/high/R10` frames 5 to 6 jump from an upright cluster to a grounded pile (Critic B is right).
  - In `crops/high/R12-carrier` the ball floats above the pile.
- **Rebut "the QB throw can't be read" (Critic A).** `crops/high/R07-slot_QB` shows a clear wind-up: ball cocked behind the helmet, off arm out, a step into the throw. The beat exists. It is small in `strips/high/R07` because the wide framing makes the QB about 20 px tall. That is a camera problem, not missing animation.
- **Rebut "no feel touches".** There is a camera push-in at the catch in `strips/high/R09` frames 3–4–5.
- **Running and celebrations.**
  - `crops/high/R11-carrier` and `crops/high/R10-carrier` show stride with knee lift, arm swing and forward lean. That supports a 5.5, not a 5.
  - `crops/high/R14-carrier` shows varied poses: #9 jumping, #12 with the ball in one raised hand, #74 with one arm bent. They are not identical clones.
- **Verdict.** Between the 5 and 7 anchors. 5.5.

### UI / HUD: critics 6.5 / 6.5. Proposed 6.5
- **Strengths.**
  - Route art with shape-coded tags (`high/desktop/R04`, `high/landscape/R04`).
  - The targeted receiver's badge and ring stay in flight (`high/desktop/R08`).
  - Bottom-docked banners with a title/subtitle hierarchy (`high/desktop/R14`, `R21`, `R12`).
  - The field-goal meter integrates into the result dock (`high/desktop/R16`).
- **Concede the panel dead space.** The panel is 28% of the width, with its lower third empty in `high/desktop/R10` and about 75% empty in `R01`, `R16` and `R17`.
- **Concede the cut 10th card** in `high/desktop/R22`.
- **Concede the log overflow** off the bottom in `high/landscape/R12` (Critic B is right).
- **Concede no on-field ID** on defense (`high/desktop/R05`).
- Critic B blames the cost on the wrong cause (the diagram rather than the panel). The score holds at 6.5.

### Typography: critics 6.5 / 7.0 (mean 6.75). Proposed 6.5
- **The pairing is consistent.** A condensed display face with a quiet sans body (`high/desktop/R22`, `high/mobile/R22`). Banner numerals read at a glance (`high/desktop/R21` "+7 YD · FIRST DOWN").
- **The 7 anchor also requires "nothing clipped", and that fails twice.**
  - The tenth card fades out with room to spare in `high/desktop/R22`. Critic A missed this.
  - In `high/landscape/R12` the log entry is cut mid-sentence at the bottom edge ("Ball on").
- **Critic A's scale points hold.** The 9 px "HOME" tag (`high/desktop/R10`) and the small key chips (`high/desktop/R16`) are weak spots.
- I won't advocate a pass the captures don't support. 6.5.

### Readability: critics 6.5 / 6.5. Proposed 6.5
- **What reads.**
  - Ball, ribbon and target ring in flight (`high/desktop/R08`, `crops/high/R08-ball`).
  - The carrier plate under his feet in all three layouts (`high/desktop/R10`, `high/mobile/R10`, `high/landscape/R10`).
  - The line of scrimmage and line to gain are visible.
  - The whole formation with tags is visible in landscape (`high/landscape/R04`).
- **Rebut "the QB can't be picked out" (Critic A).** In `high/desktop/R07` and `R08` he is the deepest black figure, standing alone behind the line (about x 455 y 505 in R07, about x 330 y 545 in R08).
- **Concede the kick ball** is an unmarked dot of about 8 px (`high/desktop/R02`, `R17`).
- **Concede small portrait pass figures** (`high/mobile/R08`).
- **Concede the obscured carrier** in `high/desktop/R12`.
- Holds at 6.5.

### Mobile: critics 6.5 / 5.5 (mean 6.0). Proposed 6.5
- **Rebut Critic B's performance basis** (wrong tier; see the facts section). The phone tier, Medium, meets the 30 fps requirement with headroom.
- **Rebut "edge badges substitute for seeing receivers" as poor design.** They are deliberate pointers with chevrons (`high/mobile/R04`, zoomed). The off-screen receivers are a real gap, but a moderate one.
- **Portrait is intentional and readable.**
  - `high/mobile/R10`: figures about 30–35 CSS px, a large JUKE button, a clear plate.
  - `high/mobile/R12`: an in-flow banner, big CONTINUE and REPLAY targets, a readable log.
  - `high/mobile/R22`: a 2×3 grid of cards with route thumbnails.
- **Landscape keeps the full formation** (`high/landscape/R04`).
- **Concede the remaining problems.**
  - Small figures in the portrait pass camera (`high/mobile/R08`).
  - About 595 CSS px of landscape field.
  - Landscape log overflow (`high/landscape/R12`).
- Critic A's 6.5 matches the evidence. Critic B's 5.5 leans on the wrong-tier performance figures.

### Authenticity: critics 6.0 / 6.0. Proposed 6.0
- **Concede both critics.** There is no band, student section, cheer squad or chain crew. Sidelines are peg rows (`high/desktop/R13`, `R15`). The end-zone backdrop is empty (`high/desktop/R14`). The track has no lane lines (`high/desktop/R01`).
- **Strengths.**
  - School-specific end zones and midfields (`high/desktop/R03` WOLVES, `high/desktop/R20` purple Jessieville).
  - Two-sided small stands at Jessieville (`high/desktop/R20`).
  - A local scoreboard (`crops/high/R01-board`).
- **One minor overstatement.** Critic B calls the R03 building "nearly featureless", but `high/desktop/R03` shows a field house with five lit windows and gold trim.
- Holds at 6.0.

## Gap adjustments (summary)
- **G-player-construction**: severity 5→4, gain 1.5→0.8. Gear and materials already meet 7. The real defects are the official's disconnected sleeves and the bent-hip creasing.
- **G-officials**: keep severity 2 and +0.3, but correct the fix. The cap and skin tone already exist. What's needed is to attach the sleeves to the torso, add face features and add fingered hands.
- **G-contact-resolution** and **G-post-contact-freeze** overlap. Contact-resolution goes 5→4 and +1.0→+0.6. Freeze goes 4→3 and +0.5→+0.4, because dead-ball stillness across a few ticks is weak evidence; the plank dive is the real defect.
- **G-locomotion-weight**: 4→3, +1.0→+0.5. Stride, lean and arm swing are already present in `crops/high/R11-carrier`.
- **G-feel-camera**: 3→2, +0.5→+0.3. A catch push-in already exists in `strips/high/R09`. Slow motion and contact particles are still missing.
- **G-light-integration**: 3→2, +0.5→+0.3. The shadow-direction cause is wrong; only fill and perimeter integration remain.
- **G-midground-flat**: kept.
- **G-wet-turf** and **G-wet-grass**: kept, with gain trimmed slightly because splashes exist.
- **G-phone-framing**: 4→3, +1.0→+0.5. The performance basis is wrong, the pointers are deliberate, and landscape already fits the formation.
- **G-mobile-pass-cam**: kept. The tags are pointers, not clipped.
- **G-desktop-panel-deadspace** and **G-desktop-field-space**: kept, with the cause corrected to the panel width rather than the diagram.
- **G-defense-presnap-id**: gain 0.4→0.3.
- **Kept as is**: G-venue-voids, G-sideline-staging, G-school-staging, G-kick-ball-readability. G-closeup-clipping is kept at severity 1.

```json
{
  "loop": 9,
  "role": "advocate",
  "tier": "high",
  "scores": {
    "art": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "crops/high/R13-carrier", "note": "glossy helmets with highlights over matte jerseys, outlined numbers, stripes: 7-anchor gear and material split holds"},
        {"shot": "crops/high/R06-slot_DL2-side", "note": "clean 3-point stance line with planted hands; bodies hold up in close-up"},
        {"shot": "crops/high/R03-slot_QB", "note": "conceded: official has floating sleeves, mitten hands, no face (but does have a white cap)"},
        {"shot": "crops/high/R04-slot_QB", "note": "conceded in part: bulbous shoulders, pinched hips, thin shins"},
        {"shot": "high/desktop/R13", "note": "conceded: floating bleacher box against flat wall"}
      ]
    },
    "lighting": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R17", "note": "3-4 radiating shadows under every player from multiple towers; refutes 'common shadow direction'"},
        {"shot": "crops/high/R16-slot_K", "note": "kicker casts two shadows in opposite directions"},
        {"shot": "high/desktop/R01", "note": "contained lamp bloom, believable night exposure, field brighter than perimeter"},
        {"shot": "crops/high/R18-turf_26_67_40", "note": "conceded: wet sheen is one blown blob, though splash particles are present"},
        {"shot": "high/desktop/R19", "note": "ridge layers lighten with distance: aerial depth exists"}
      ]
    },
    "animation": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "strips/high/R09", "note": "camera push-in at the catch, frames 3-4-5; conceded: rigid plank dive in frames 6-8"},
        {"shot": "crops/high/R07-slot_QB", "note": "legible wind-up with ball cocked behind the helmet; the strip's wide framing hides it"},
        {"shot": "strips/high/R10", "note": "conceded: abrupt 5 to 6 drop into pile, still frames 6-8"},
        {"shot": "crops/high/R11-carrier", "note": "stride with knee lift, arm swing and forward lean"},
        {"shot": "crops/high/R12-carrier", "note": "conceded: ball floats above the pile"}
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.75,
      "evidence": [
        {"shot": "high/desktop/R04", "note": "route art, shape-coded receiver tags, on-field 1ST & 10"},
        {"shot": "high/desktop/R21", "note": "bottom-docked banner with title/subtitle hierarchy"},
        {"shot": "high/desktop/R10", "note": "conceded: 28% panel with its lower third empty"},
        {"shot": "high/landscape/R12", "note": "conceded: log overflows the bottom edge"}
      ]
    },
    "typography": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R22", "note": "consistent condensed and sans pair; the 10th card is cut by a fade with 60 px spare (critic A missed this)"},
        {"shot": "high/landscape/R12", "note": "log entry clipped mid-sentence at the bottom"},
        {"shot": "high/desktop/R21", "note": "banner numerals read at a glance"},
        {"shot": "high/mobile/R22", "note": "legible titles and RUN/PASS tags at phone width"}
      ]
    },
    "readability": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R08", "note": "ball, ribbon, retained badge and ring; QB is the lone deep black figure"},
        {"shot": "high/landscape/R04", "note": "whole formation with all five tags visible"},
        {"shot": "high/mobile/R10", "note": "carrier plate and ring clear in portrait"},
        {"shot": "high/desktop/R17", "note": "conceded: kicked ball is an unmarked dot"},
        {"shot": "high/mobile/R08", "note": "conceded: small figures in the portrait pass camera"}
      ]
    },
    "mobile": {
      "score": 6.5,
      "confidence": 0.65,
      "evidence": [
        {"shot": "high/mobile/R12", "note": "in-flow banner, large CONTINUE and REPLAY targets, readable log"},
        {"shot": "high/mobile/R04", "note": "edge badges are whole pointers with chevrons; conceded that the receivers are off-screen"},
        {"shot": "high/landscape/R04", "note": "landscape fits the full formation"},
        {"shot": "high/mobile/R08", "note": "conceded: small pass-camera figures"},
        {"shot": "high/landscape/R12", "note": "conceded: log overflow; phone tier (Medium) perf is 106 min fps and 18.2 ms p95 under 4x throttle"}
      ]
    },
    "authenticity": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "high/desktop/R20", "note": "Jessieville purple midfield, two-sided small stands"},
        {"shot": "high/desktop/R03", "note": "WOLVES end zone; field house with lit windows and trim"},
        {"shot": "crops/high/R01-board", "note": "local HSHS/LHHS board"},
        {"shot": "high/desktop/R15", "note": "conceded: peg-row sideline, cone trees, no band or student section"},
        {"shot": "high/desktop/R14", "note": "conceded: empty end-zone backdrop"}
      ]
    }
  },
  "gaps": [
    {"id": "G-player-construction", "category": "art", "expectedGain": 0.8, "severity": 4, "effort": "L", "workstream": "WS3", "evidence": ["crops/high/R03-slot_QB", "crops/high/R04-slot_QB", "crops/high/R06-slot_C-side"], "benchmark": "axis-3", "fix": "Tame shoulder bulb and hip pinch, fix bent-hip creasing; keep the existing helmet and jersey material split, which already meets the 7 anchor."},
    {"id": "G-contact-resolution", "category": "animation", "expectedGain": 0.6, "severity": 4, "effort": "L", "workstream": "WS4b", "evidence": ["strips/high/R10", "crops/high/R12-carrier", "crops/high/R13-carrier"], "benchmark": "cfb26-4", "fix": "Visible wrap and momentum-driven descent with intermediate falling poses, separated body volumes, and the ball held in the carrier's hand on the ground."},
    {"id": "G-post-contact-freeze", "category": "animation", "expectedGain": 0.4, "severity": 3, "effort": "M", "workstream": "WS4b", "evidence": ["strips/high/R09", "strips/high/R10"], "benchmark": "cfb26-4", "fix": "Replace the rigid plank dive with a bent-limb ground pose and settle; add a small post-whistle settle and roll and staggered get-ups."},
    {"id": "G-locomotion-weight", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS4", "evidence": ["strips/high/R11", "crops/high/R11-carrier"], "benchmark": "madden26-4", "fix": "Add planted outside-foot cuts and pelvis loading on direction changes; vary blocking embraces under pressure. Stride, lean and arm swing already exist."},
    {"id": "G-feel-camera", "category": "animation", "expectedGain": 0.3, "severity": 2, "effort": "M", "workstream": "WS4", "evidence": ["strips/high/R09", "strips/high/R13"], "benchmark": "madden26-4", "fix": "Keep the existing catch push-in; add a brief time-scale dip and turf-spray particles at first contact."},
    {"id": "G-phone-framing", "category": "mobile", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["high/mobile/R04", "high/mobile/R08", "high/landscape/R12"], "benchmark": "retrobowl-1", "fix": "Fit the eligible receivers in the portrait pre-snap camera and tighten the pass camera; stop the landscape log from overflowing. Phone-tier perf already passes."},
    {"id": "G-mobile-pass-cam", "category": "mobile", "expectedGain": 0.3, "severity": 2, "effort": "M", "workstream": "WS7", "evidence": ["high/mobile/R08", "high/mobile/R04"], "benchmark": "retrobowl-1", "fix": "Tighten the portrait pass camera so receivers exceed 40 CSS px; the edge pointers are already whole, but stop badges 2 and 3 overlapping."},
    {"id": "G-desktop-panel-deadspace", "category": "ui", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R10", "high/desktop/R16", "high/desktop/R17", "high/desktop/R01"], "benchmark": "axis-1", "fix": "Fill or narrow the 360 px panel in kick, celebration and replay states; give the field the width."},
    {"id": "G-desktop-field-space", "category": "ui", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["high/desktop/R08", "high/desktop/R22"], "benchmark": "madden26-3", "fix": "The cost is the fixed panel width, not the diagram (which sits in the panel). Compact the panel and let the play list use its full height so the 10th card is not faded with 60 px spare."},
    {"id": "G-defense-presnap-id", "category": "ui", "expectedGain": 0.3, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["high/desktop/R05"], "benchmark": "madden26-1", "fix": "Draw on-field receiver tags and blitz lanes on defense pre-snap."},
    {"id": "G-midground-flat", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["high/desktop/R04", "high/desktop/R10"], "benchmark": "cfb26-3", "fix": "Raise lamp-pool contrast and darken the apron and walls beyond the pools."},
    {"id": "G-light-integration", "category": "lighting", "expectedGain": 0.3, "severity": 2, "effort": "M", "workstream": "WS1", "evidence": ["high/desktop/R01", "high/desktop/R10"], "benchmark": "cfb26-4", "fix": "Shadows already come from several towers (R17, R16-slot_K); remaining work is fill on dark uniforms and perimeter integration."},
    {"id": "G-wet-turf", "category": "lighting", "expectedGain": 0.4, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["high/desktop/R18", "crops/high/R18-turf_26_67_40"], "benchmark": "axis-3", "fix": "Field-wide lower roughness with stretched lamp reflections visible from the game camera; clamp the single hotspot. Splash particles already exist."},
    {"id": "G-wet-grass", "category": "lighting", "expectedGain": 0.4, "severity": 2, "effort": "M", "workstream": "WS5", "evidence": ["crops/high/R18-turf_26_67_40", "high/desktop/R18"], "benchmark": "cfb26-4", "fix": "Break the concentrated wet highlight into grass-scale roughness variation and broader, subdued reflections."},
    {"id": "G-venue-voids", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS2", "evidence": ["high/desktop/R13", "high/desktop/R14", "high/desktop/R02"], "benchmark": "cfb26-2", "fix": "A structured visitor stand, end-zone fence and buildings, textured tree cards, and a track with lane lines."},
    {"id": "G-sideline-staging", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["high/desktop/R13", "high/desktop/R15"], "benchmark": "cfb26-1", "fix": "Cluster and jitter sideline players, add coaches, a band block, a student section, cheerleaders and a chain crew."},
    {"id": "G-school-staging", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS2", "evidence": ["crops/high/R01-crowd", "high/desktop/R15"], "benchmark": "cfb26-2", "fix": "Readable student and band groups and varied silhouettes; overlaps with G-sideline-staging."},
    {"id": "G-officials", "category": "art", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS3", "evidence": ["crops/high/R03-slot_QB", "crops/high/R12-carrier"], "benchmark": "axis-3", "fix": "Attach the sleeves to the torso, add face features and fingered hands. The cap and skin tone already exist."},
    {"id": "G-kick-ball-readability", "category": "readability", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R02", "high/desktop/R17"], "benchmark": "retrobowl-3", "fix": "Reuse the pass ribbon on kicks and add a landing ring."},
    {"id": "G-closeup-clipping", "category": "art", "expectedGain": 0.2, "severity": 1, "effort": "S", "workstream": "WS7", "evidence": ["crops/high/R06-slot_C-side", "crops/high/R06-slot_LG"], "benchmark": "madden26-4", "fix": "Occlusion-aware close-up cameras. R06-slot_LG is an over-the-shoulder shot, not inside the mesh; R06-slot_C-side has bodies blocking the foreground."}
  ],
  "verdict": "continue"
}
```
