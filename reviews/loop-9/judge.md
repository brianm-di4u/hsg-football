# Judge ruling: loop 9, High tier

Capture paths are relative to `games/football/screenshots/review-loop-9/`. I opened the following before ruling: `high/desktop/R01`, `R04`, `R10`, `R14`, `R17`, `R18`, `R20`, `R22`; `high/mobile/R04`, `R08`; `high/landscape/R12`; `strips/high/R07`, `R09`, `R10`, `R11`, `R13`; `crops/high/R03-slot_QB`, `R04-slot_QB`, `R07-slot_QB`, `R12-carrier`, `R13-carrier`, `R16-slot_K`, `R18-turf_26_67_40`; and `reviews/loop-9/calibration.jpg`.

No category has critics more than 1.0 apart (the widest is mobile at 6.5 vs 5.5). I still checked every disputed fact.

## Disputed facts, ruled
- **Multi-source shadows (Critic B vs the advocate): the advocate is right.**
  - `high/desktop/R17`: every player casts 3–4 radiating shadows.
  - `crops/high/R16-slot_K`: the kicker casts two shadows in clearly different directions.
  - Critic B's "one common shadow direction" holds only for some framings (`strips/high/R13`), so it is not a rig-wide fault. G-light-integration loses its shadow cause.
- **Catch punch-in (Critic A vs the advocate): the advocate is right.** In `strips/high/R09` the camera pushes in at frame 4 and eases out by frame 5. There is no slow motion and no contact particles.
- **Clipping (Critic A said nothing was clipped): Critic A is wrong.**
  - `high/desktop/R22`: the 10th card ("Fountain Play-Action") is faded out by a mask, with about 55 px of empty panel below it.
  - `high/landscape/R12`: the log is cut at "Ball on".
- **Official skin and caps: the advocate is right.**
  - `crops/high/R12-carrier`: the official has brown skin and a black cap.
  - `crops/high/R03-slot_QB`: the official has a white cap. The striped sleeves float off the torso, the forearms are mitts, and there is no face.
- **Portrait receiver badges: the advocate is right on the drawing, Critic B on the cost.** In `high/mobile/R04` the badges are whole, chevroned pointers, not clipped. But receivers 1, 2 and 3 are off-screen, badges 2 and 3 overlap, and the top half of the view is empty midfield turf.
- **Mobile performance tier: the advocate is right.** The brief names Medium as the phone tier. Under 4× throttle it holds 106 min fps with an 18.2 ms worst p95.
- **Rain sheen: Critic A is mostly right.**
  - `crops/high/R18-turf_26_67_40`: one blown white hotspot, plus small splash dots at players' feet.
  - `high/desktop/R18`: rain streaks, but the turf reads dry.
- **QB throw: the advocate is right that the beat exists.** `crops/high/R07-slot_QB` shows the ball cocked behind the helmet. Critic A is right that `strips/high/R07` frames the QB at about 20 px, so the beat is lost in play.
- **Ball above the pile: confirmed.** In `crops/high/R12-carrier` the ball floats over the downed carrier with no securing hand.

## Category rulings

### Art: 6.0
- **What meets the 7 anchor.** `crops/high/R04-slot_QB` and `crops/high/R13-carrier` show glossy helmets over matte jerseys, outlined numbers, stripes and facemasks, and the crowd behind reads as people.
- **What pulls it down.**
  - Bulbous shoulders and pinched hips over thin shins (`crops/high/R04-slot_QB`).
  - The officials are built from disconnected pieces with no face (`crops/high/R03-slot_QB`).
  - The venue is flats: a floating bleacher box against a grey wall and black cone trees (`strips/high/R13`, `crops/high/R13-carrier`), and an empty green plane behind the end zone (`high/desktop/R14`).
- Critic A's 6.0 stands. Critic B's 5.5 underrates gear and materials that already pass.

### Lighting & atmosphere: 6.5
- **Three 7-anchor items are met.**
  - Several soft shadows per player (`high/desktop/R17`, `crops/high/R16-slot_K`).
  - Contained lamp bloom with no frame wash (`high/desktop/R01`, `high/desktop/R20`).
  - Believable night exposure.
- **Two are not.**
  - No wet sheen from the game camera (`high/desktop/R18`, `crops/high/R18-turf_26_67_40`).
  - Weak falloff from field to perimeter: the apron and walls are one flat value (`high/desktop/R17`, `high/desktop/R14`).
- Critic B's 6.5 holds, but not for his stated reason.

### Animation & game feel: 5.5
- **What reads.**
  - The cut and stride (`strips/high/R11`).
  - The catch push-in (`strips/high/R09` frame 4).
  - The wind-up in `crops/high/R07-slot_QB`.
- **What doesn't.**
  - Upright to grounded in one step (`strips/high/R10` 5→6).
  - A rigid plank dive held through `strips/high/R09` 6–8.
  - No visible wrap in `strips/high/R13`.
  - The ball floats over the pile (`crops/high/R12-carrier`).
  - No slow motion or contact particles.
- Between the 5 and 7 anchors: 5.5.

### UI / HUD: 6.5
- **Strong pieces.**
  - Route art with shape-coded tags and an on-field "1ST & 10" (`high/desktop/R04`).
  - Bottom-docked result banners with hierarchy (`high/desktop/R14`, `crops/high/R12-carrier`).
- **Against them.**
  - The 360 px panel is about 70% empty in `high/desktop/R14` and `R17`.
  - The play list fades out with room to spare (`high/desktop/R22`).
  - The landscape log overflows (`high/landscape/R12`).
- Both critics' 6.5 holds.

### Typography: 6.5
- **The pairing passes.** The condensed display and sans body pair is consistent (`high/desktop/R22`, `high/landscape/R12`).
- **"Nothing clipped" fails twice**: the 10th play card in `high/desktop/R22` and the log line in `high/landscape/R12`.
- Critic B's 7.0 missed both. The fix is cheap, but the score is 6.5.

### Readability: 6.5
- **What reads at a glance.**
  - The carrier ring and plate (`high/desktop/R10`, `high/desktop/R18`).
  - The line of scrimmage and line to gain.
- **What doesn't.**
  - Kicked balls are unmarked dots (`high/desktop/R17`).
  - Portrait pass figures are small, with half the view empty turf (`high/mobile/R08`).
  - The QB is about 20 px in the throw strip (`strips/high/R07`).

### Mobile: 6.0
- **What works.**
  - Phone-tier performance passes.
  - Portrait HUD and touch targets are big (`high/mobile/R04` HIKE and CHANGE PLAY, `high/mobile/R08` JUKE).
- **What doesn't.** Portrait framing is not yet intentional for the action:
  - In `high/mobile/R04`, three receivers are off-screen while the top half of the view is empty midfield.
  - In `high/mobile/R08`, figures are about 25–30 CSS px in the lower third.
  - Landscape clips its log and the banner sits over the pile (`high/landscape/R12`).
- I split the critics: Critic B leaned on the wrong performance tier, and Critic A under-weighted the wasted portrait space.

### Authenticity: 6.0
- **Gate met (6.0) on school identity.**
  - Jessieville purple midfield, two-sided small stands and towers (`high/desktop/R20`).
  - HOT SPRINGS end zone and local board (`high/desktop/R01`).
- **Not higher.**
  - No band, student section, cheer squad or chain crew.
  - Peg-row sidelines and cone trees (`strips/high/R13`).
  - Empty end-zone backdrop (`high/desktop/R14`).

## Calibration
`calibration.jpg` is a top-down pixel-art frame scored on the anchors alone.
- **Art: 6.5.**
  - For: style-consistent sprites with readable helmets, facemasks, numbers and varied skin and hair, and turf grain.
  - Against: no gloss/matte material split, and no crowd or venue in frame.
- **Lighting: 4.0.**
  - For: blob shadows and rain streaks.
  - Against: no key light direction, no lamps, no sky and no time of day. That puts it between the 3 and 5 anchors.

## Ranked gaps (by expected gain ÷ effort; top 12)
1. **G-text-clipping** (typography, WS7, S, +0.5). Remove the play-list fade mask whenever the list fits. Otherwise make the list scroll with an explicit "more" cue. Clamp the landscape log to whole entries. The typography gate fails only on these.
2. **G-desktop-panel-deadspace** (ui, WS7, S, +0.5; merges G-desktop-field-space). Narrow the panel to about 260 px, or collapse it, in kickoff, punt, field-goal, touchdown and replay states. Give the field the width. The cause is the fixed panel width, not the diagram.
3. **G-midground-flat** (lighting, WS1, S, +0.5; absorbs G-light-integration). Raise the lamp-pool contrast to 25–35%. Darken the apron and walls beyond the pools by about 30%. Add a mild vignette and a fill term on dark jerseys. Shadows are already multi-source, so leave them alone.
4. **G-kick-ball-readability** (readability, WS7, S, +0.3). Reuse the pass ribbon on kickoffs, punts and field goals, and add a landing ring.
5. **G-phone-framing** (mobile, WS7, M, +0.6; merges G-mobile-pass-cam).
   - The portrait pre-snap camera fits all eligible receivers, with the formation in the lower 60%, and drops the empty midfield.
   - The portrait pass camera tracks the ball-to-target corridor so receivers are at least 40 CSS px.
   - Separate overlapping edge pointers.
   - In landscape, the banner clears the pile.
6. **G-player-construction** (art, WS3, M, +0.6; merges G-officials).
   - Officials: attach the sleeves to the torso, add face shading and fingered hands, and keep the existing caps and skin.
   - Players: reduce the shoulder bulb by about 15%, widen the hips, and thicken the shins.
   - Keep the helmet and jersey materials.
7. **G-sideline-staging** (authenticity, WS2, M, +0.5; merges G-school-staging).
   - Cluster and jitter sideline teams with varied idles, and add coaches with headsets.
   - Add a band block and a student section in the home stands.
   - Add cheerleaders on the track and a chain crew.
8. **G-contact-resolution** (animation, WS4b, L, +0.7; merges G-post-contact-freeze).
   - At least two intermediate falling poses between upright and grounded.
   - A visible wrap.
   - A bent-limb ground pose in place of the plank dive.
   - A post-whistle settle and roll.
   - The ball attached to the carrier's hand on the ground.
9. **G-wet-turf** (lighting, WS5, M, +0.4; merges G-wet-grass). In rain, lower turf roughness across the whole field. Add stretched lamp reflections that are visible from the game camera, and break up the highlight with grass-scale roughness noise. Clamp the single blown hotspot. Keep the splashes.
10. **G-venue-voids** (authenticity, WS2, L, +0.5).
    - A structured visitor stand in place of the floating box.
    - An end-zone fence and a field house in place of the empty plane.
    - Textured tree cards in place of black cones.
    - A tan or red track with lane lines.
11. **G-locomotion-weight** (animation, WS4, L, +0.5). Planted outside-foot cuts with pelvis drop on direction changes. Blocking pairs that shift under pressure in place of a fixed embrace. Stride, lean and arm swing already exist.
12. **G-feel-camera** (animation, WS4, M, +0.3).
    - Keep the catch push-in.
    - Add a 0.25–0.4 s time-scale dip to about 0.35× at first contact, with turf-spray particles.
    - Frame the QB larger through the throw beat.

Just missing the cut: G-defense-presnap-id (ui, +0.3, M) and G-closeup-clipping (art, +0.2, S; the slot_LG shot is over-the-shoulder, not inside the mesh).

## Verdict
**Continue.** Only authenticity (6.0 against a gate of 6) meets its gate. The other seven categories are below 7.

```json
{
  "loop": 9,
  "role": "judge",
  "tier": "high",
  "scores": {
    "art": {
      "score": 6.0,
      "confidence": 0.8,
      "evidence": [
        {"shot": "crops/high/R04-slot_QB", "note": "glossy helmets over matte jerseys, readable numbers and stripes; bulbous shoulders, pinched hips, thin shins"},
        {"shot": "crops/high/R03-slot_QB", "note": "official: floating sleeves, mitt forearms, no face (white cap present)"},
        {"shot": "crops/high/R13-carrier", "note": "good gear and material split; black cone trees and box stand behind"},
        {"shot": "high/desktop/R14", "note": "empty green plane behind the end zone"}
      ]
    },
    "lighting": {
      "score": 6.5,
      "confidence": 0.75,
      "evidence": [
        {"shot": "high/desktop/R17", "note": "3-4 radiating soft shadows per player; flat dark apron beyond the field"},
        {"shot": "crops/high/R16-slot_K", "note": "kicker casts two shadows in different directions"},
        {"shot": "high/desktop/R01", "note": "contained lamp bloom, believable night exposure"},
        {"shot": "crops/high/R18-turf_26_67_40", "note": "single blown wet hotspot plus foot splashes; no field-wide sheen"},
        {"shot": "high/desktop/R18", "note": "rain streaks but turf reads dry from the game camera"}
      ]
    },
    "animation": {
      "score": 5.5,
      "confidence": 0.75,
      "evidence": [
        {"shot": "strips/high/R09", "note": "catch push-in at frame 4; rigid plank dive held frames 6-8"},
        {"shot": "strips/high/R10", "note": "upright to grounded pile in one step 5 to 6; little settle 6-8"},
        {"shot": "strips/high/R11", "note": "stride and cut read"},
        {"shot": "crops/high/R07-slot_QB", "note": "wind-up exists with ball cocked; too small in strips/high/R07"},
        {"shot": "crops/high/R12-carrier", "note": "ball floats above the pile, no securing hand"}
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.8,
      "evidence": [
        {"shot": "high/desktop/R04", "note": "route art, shape-coded tags, on-field 1ST & 10"},
        {"shot": "high/desktop/R14", "note": "bottom-docked TOUCHDOWN banner with hierarchy; panel about 70% empty"},
        {"shot": "high/desktop/R22", "note": "10th play card faded out with about 55 px spare"},
        {"shot": "high/landscape/R12", "note": "log overflows the bottom edge"}
      ]
    },
    "typography": {
      "score": 6.5,
      "confidence": 0.8,
      "evidence": [
        {"shot": "high/desktop/R22", "note": "consistent condensed and sans pair; last card clipped by a fade"},
        {"shot": "high/landscape/R12", "note": "clear banner numerals; log entry cut at 'Ball on'"},
        {"shot": "high/desktop/R10", "note": "panel down and distance hierarchy reads; small HOME tag"}
      ]
    },
    "readability": {
      "score": 6.5,
      "confidence": 0.75,
      "evidence": [
        {"shot": "high/desktop/R10", "note": "carrier ring and plate, LOS and line to gain clear"},
        {"shot": "high/desktop/R17", "note": "kicked ball is an unmarked dot"},
        {"shot": "high/mobile/R08", "note": "small portrait pass figures; half the view is empty turf"},
        {"shot": "strips/high/R07", "note": "QB about 20 px through the throw"}
      ]
    },
    "mobile": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "high/mobile/R04", "note": "big HIKE target; receivers 1-3 off-screen, pointers 2 and 3 overlap, empty top half"},
        {"shot": "high/mobile/R08", "note": "figures about 25-30 CSS px in the lower third"},
        {"shot": "high/landscape/R12", "note": "log clipped; banner over the pile; Medium phone tier holds 106 fps / 18.2 ms p95 at 4x throttle"}
      ]
    },
    "authenticity": {
      "score": 6.0,
      "confidence": 0.8,
      "evidence": [
        {"shot": "high/desktop/R20", "note": "Jessieville purple midfield, small two-sided stands, towers"},
        {"shot": "high/desktop/R01", "note": "HOT SPRINGS end zone, local scoreboard, single home grandstand"},
        {"shot": "strips/high/R13", "note": "peg-row sideline, floating box stand, no band or student section"},
        {"shot": "high/desktop/R14", "note": "empty end-zone backdrop"}
      ]
    }
  },
  "gaps": [
    {"id": "G-text-clipping", "category": "typography", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R22", "high/landscape/R12"], "benchmark": "madden26-3", "fix": "Remove the play-list fade mask when the list fits, or make it scroll with an explicit 'more' cue; clamp the landscape log to whole entries so no text is cut."},
    {"id": "G-desktop-panel-deadspace", "category": "ui", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R14", "high/desktop/R17", "high/desktop/R01"], "benchmark": "axis-1", "fix": "Narrow the 360 px panel to about 260 px or collapse it in kickoff, punt, field-goal, touchdown and replay states, and give the field the recovered width."},
    {"id": "G-midground-flat", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["high/desktop/R17", "high/desktop/R14", "high/desktop/R10"], "benchmark": "cfb26-3", "fix": "Raise lamp-pool contrast to 25-35%, darken the apron and walls beyond the pools by about 30%, add a mild vignette and fill light on dark jerseys; keep the existing multi-source shadows."},
    {"id": "G-kick-ball-readability", "category": "readability", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R17", "high/desktop/R02"], "benchmark": "retrobowl-1", "fix": "Reuse the pass ribbon on kickoffs, punts and field goals and draw a landing ring under the ball."},
    {"id": "G-phone-framing", "category": "mobile", "expectedGain": 0.6, "severity": 4, "effort": "M", "workstream": "WS7", "evidence": ["high/mobile/R04", "high/mobile/R08", "high/landscape/R12"], "benchmark": "retrobowl-1", "fix": "Portrait pre-snap camera fits all eligible receivers with the formation in the lower 60%; portrait pass camera tracks the ball-to-target corridor so receivers are at least 40 CSS px; separate overlapping edge pointers; landscape banner clears the pile."},
    {"id": "G-player-construction", "category": "art", "expectedGain": 0.6, "severity": 4, "effort": "M", "workstream": "WS3", "evidence": ["crops/high/R03-slot_QB", "crops/high/R04-slot_QB", "crops/high/R12-carrier"], "benchmark": "axis-3", "fix": "Officials: attach sleeves to the torso, add face shading and fingered hands, keep the existing caps and skin. Players: reduce the shoulder bulb by about 15%, widen the hips and thicken the shins; keep the helmet and jersey materials."},
    {"id": "G-sideline-staging", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["strips/high/R13", "high/desktop/R01", "high/desktop/R20"], "benchmark": "cfb26-1", "fix": "Cluster and jitter sideline teams with varied idles and coaches with headsets; add a band block and a student section in the home stands, cheerleaders on the track and a chain crew."},
    {"id": "G-contact-resolution", "category": "animation", "expectedGain": 0.7, "severity": 4, "effort": "L", "workstream": "WS4b", "evidence": ["strips/high/R10", "strips/high/R09", "crops/high/R12-carrier"], "benchmark": "cfb26-4", "fix": "At least two intermediate falling poses between upright and grounded, a visible wrap, a bent-limb ground pose in place of the plank dive, a post-whistle settle and roll, and the ball attached to the carrier's hand on the ground."},
    {"id": "G-wet-turf", "category": "lighting", "expectedGain": 0.4, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["high/desktop/R18", "crops/high/R18-turf_26_67_40"], "benchmark": "axis-3", "fix": "In rain, lower turf roughness across the whole field with stretched lamp reflections visible from the game camera, break the highlight with grass-scale roughness noise, clamp the single blown hotspot, keep the splashes."},
    {"id": "G-venue-voids", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS2", "evidence": ["strips/high/R13", "high/desktop/R14", "crops/high/R13-carrier"], "benchmark": "cfb26-2", "fix": "Replace the floating visitor box with a structured stand, the empty end-zone plane with a fence and field house, black cones with textured tree cards, and add a tan or red track with lane lines."},
    {"id": "G-locomotion-weight", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS4", "evidence": ["strips/high/R11", "strips/high/R13"], "benchmark": "madden26-4", "fix": "Planted outside-foot cuts with pelvis drop on direction changes; blocking pairs that shift under pressure instead of a fixed embrace."},
    {"id": "G-feel-camera", "category": "animation", "expectedGain": 0.3, "severity": 2, "effort": "M", "workstream": "WS4", "evidence": ["strips/high/R09", "strips/high/R13", "strips/high/R07"], "benchmark": "madden26-4", "fix": "Keep the catch push-in; add a 0.25-0.4 s time-scale dip to about 0.35x and turf-spray particles at first contact, and frame the QB larger through the throw beat."}
  ],
  "verdict": "continue",
  "calibration": {"art": 6.5, "lighting": 4.0}
}
```
