# Judge ruling, loop 3, High tier (desktop)

All capture paths are relative to `games/football/screenshots/review-loop-3/`, and benchmarks are in `games/football/benchmarks/`.

## Calibration (scored blind, before I read any review)

I scored `reviews/loop-3/calibration.jpg` on the rubric anchors alone: **art 7.0, lighting 6.0**.
- **Art 7.0.** Smooth bodies with readable gear, visible faces behind facemasks, jersey trim and numbers that hold up at mid-distance. The crowd reads as people and the venue as built objects.
- **Lighting 6.0.** A clean daylight key with real directional shadows, but only one sun direction and little specular or bounce light, and none of the 7-anchor night features (bloom, multi-shadow, falloff).

Afterwards I recognised the frame as benchmark axis-3, which the rubric places at about 7 for art. My art score matches. My lighting score sits about a point below the rubric's implied anchor, so if anything I am on the harsh side for lighting, not the generous one.

## Disputed facts (I opened the captures)

| Claim | Who was right | What I checked |
|---|---|---|
| Tackle pile "hovering well above the turf" (Critic B) | **Advocate** | `crops/high/R12-carrier`: the pile lies on the carrier ring painted on the turf. The helmet-into-chest interpenetration (Critic A) is real. |
| `strips/high/R10` frames 5→6 show an abrupt collapse (Critic B) | **Advocate** | The board clock reads 3:20 in frames 1–5 and 3:18 in frames 6–8. The capture skipped the contact, so the strip shows no beat but no pop either. |
| No facemask geometry on the dark helmets (Critic A) | **Split** | The cage exists (grey cages on the white team's black helmets in `crops/high/R06-slot_C`), but on the home black helmets it is black on black. At play scale (`crops/high/R04-slot_QB`, `crops/high/R11-carrier`) the head reads as a faceless shell, so the visual defect stands and the cause is contrast. |
| The user's team always wears Hot Springs black and orange (Critic A) | **Mostly the advocate** | Lakeside is royal and gold (`high/desktop/R13`, `strips/high/R13`), and Hot Springs wears white on the road. Jessieville reads purple in `sheets/compare-07` (R20). Lake Hamilton at home (`sheets/compare-01`, R03) does render as black and orange, which is a palette-value problem. |
| Mobile figures about 12 CSS px (Critic A) | **Split** | Pre-snap `high/mobile/R04` figures are about 26–30 device px (13–15 CSS px), with the top half of the field view empty. Live `high/mobile/R08` and `high/mobile/R12` figures are about 20–40 CSS px. |
| The +5 YD toast hides the tackle pile (Critic A) | **Advocate** | In `high/mobile/R12` the pile sits above the toast's top rule. But `high/mobile/R21` does put the toast squarely over the huddle, with bodies visible through the text. |
| The ball is a dark speck (Critic A) | **Advocate, partly** | In `high/desktop/R08` it reads as a laced ball about 12–16 px across at (550,476). It is findable but has no ground marker, so it takes a look rather than a glance. |

## Per-category ruling

### Art: **5.5** (critics 5.5 / 5.0, advocate 5.5)
- **Below the 7 anchor.**
  - The bodies don't hold up in close-up. `crops/high/R06-slot_C` and `crops/high/R04-slot_QB` show tube shins on puck feet, mitten hands and rigid shell pants.
  - Number decals sit on visible rectangles (the "10" in `crops/high/R06-slot_C`, the "12" and "44" in `crops/high/R04-slot_QB`). The "63" and "47" render mirrored (`crops/high/R06-slot_C`).
  - The cone trees are crude (`crops/high/R06-slot_C`, `crops/high/R12-carrier`).
- **Clear of the 5 anchor.**
  - Glossy helmets contrast with matte jerseys.
  - Cages and faces read on light kits (`crops/high/R12-carrier`, #92).
  - Venue-coloured crowd cards read as people (`crops/high/R04-slot_QB` stands).
- Assets are unchanged this loop. Critic B's 5.0 underrates the helmet and crowd work. **5.5.**

### Lighting & atmosphere: **6.0** (critics 6.0 / 6.0, advocate 6.5)
- **What works.**
  - Two or more soft shadows under each player (`crops/high/R09-slot_Z`, `crops/high/R18-turf_26_67_40`).
  - Lamp bloom (`high/desktop/R04`) and a wet speckled sheen in rain (`crops/high/R18-turf_26_67_40`).
- **What holds it at 6.**
  - The overhead kickoff camera frames the stands as a black void with no lamp heads (`high/desktop/R01`).
  - A beige haze still washes the upper corners (`high/desktop/R04`, every frame of `strips/high/R07`).
  - The replay foreground has a dark vertical smear (`high/desktop/R13` at about (520,690), and `strips/high/R13` frames 2–8).
  - Rain splashes are white squares (`crops/high/R18-turf_26_67_40`).
  - Black kits crush at night.
- **The advocate's 6.5.** It rests on the stands being lit in the replays, and they are (`high/desktop/R13`). But the 7 anchor asks for believable night exposure and falloff on every camera, and the defects are on screen. Against axis-3, which I independently scored 6 for lighting, this matches rather than exceeds it. **6.0.**

### Animation & game feel: **5.0** (critics 5.5 / 4.5, advocate 5.5)
The critics differ by exactly 1.0, so I examined every High strip.
- **What improved.**
  - The gait reads, with alternating support feet and no foot slide visible (`strips/high/R11`, `strips/high/R13`).
  - Close-ups show the new IK and throw work: a planted foot on the sweep (`crops/high/R11-carrier`), and a coiled throw with the ball cocked by the helmet and the front foot stepping (`crops/high/R07-slot_QB`).
  - Both of Critic B's main charges (hovering pile, R10 pop) are wrong. I drop them.
- **What the strips can't show.** The rubric judges animation from the strips first, and they still show no legible beat:
  - `strips/high/R07`: the QB is a few pixels tall, so the throw can't be read.
  - `strips/high/R09`: the ball is still short of the receiver in frame 8, and the receiver is upright with his arms down (`crops/high/R09-slot_Z`). No catch is shown.
  - `strips/high/R10`: the contact was skipped by the capture.
  - `strips/high/R13`: smooth running, no contact.
- **Remaining defects.**
  - The tackle pile interpenetrates (`crops/high/R12-carrier`).
  - The linemen squat with their arms hanging and no hand down (`crops/high/R06-slot_C`).
  - The celebration is a block of stiff arms-up poses (`high/desktop/R14`).
  - No camera punch-in, slow motion or particles appear anywhere.
- **Score.** This sits just above the 5 anchor on contact, because the feet are planted and nothing pops. The 7 anchor's beats and feel touches aren't evidenced. Critic A's 5.5 credits close-ups the strips don't support. **5.0.**

### UI / HUD: **6.0** (critics 6.0 / 6.0, advocate 6.0)
- **What works.**
  - A clean scorebug with possession, down and distance (`high/desktop/R04`).
  - Numbered, shape-coded route art with a matching diagram (`high/desktop/R04`).
  - A carrier tag and ring (`strips/high/R11`).
  - A toast hierarchy (`high/desktop/R14`).
- **What holds it at 6.**
  - About 28% of the desktop width is a panel that sits mostly empty during the kickoff (`high/desktop/R01`) and live play (`high/desktop/R08`).
  - The defensive pre-snap view has no on-field ID labels.
  - Log lines drop the player name ("runs for 7 yd." in `high/mobile/R21`).
  - The bottom play card is clipped (`high/desktop/R22`, per both critics).
- The critics and advocate agree. **6.0.**

### Typography: **6.5** (6.5 / 6.5, advocate 6.5)
- **What works.** One condensed display face over a neutral sans, applied consistently (`high/desktop/R14`, `high/mobile/R21`), with scorebug numerals that read at a glance (`high/desktop/R04`).
- **What falls short.**
  - The board clock is in a Courier-like face (`crops/high/R01-board`, per both critics).
  - A translucent toast loses its text over bodies (`high/mobile/R21`).
  - A lone "yd." wraps to its own line (`high/desktop/R15`).
- **6.5.**

### Readability: **6.0** (6.0 / 5.5, advocate 6.0)
- **What reads.**
  - The line of scrimmage and line to gain are unambiguous (`high/desktop/R04`).
  - The carrier tag and ring read instantly (`strips/high/R10` frames 1–5).
  - A target ring marks the receiver (`high/desktop/R08`).
  - The ball is findable (`high/desktop/R08`, `high/mobile/R08`).
- **What doesn't.**
  - Desktop formation figures are about 25–30 px tall (`high/desktop/R04`).
  - Black kits merge into one mass at night (`strips/high/R10`, `strips/high/R11`).
  - The ball has no ground marker.
- **6.0.**

### Mobile: **6.0** (6.0 / 5.5, advocate 6.0)
- **What works.**
  - An intentional portrait layout with thumb-size HIKE, JUKE and CONTINUE buttons (`high/mobile/R04`, `high/mobile/R08`).
  - Live figures at a workable 20–40 CSS px (`high/mobile/R12`).
  - The medium phone proxy holds a 48 fps minimum at 4× throttle (`perf.json`), which is at least 30.
- **What fails.**
  - Pre-snap, the formation is 13–15 CSS px figures in the lower middle, with the upper half of the view spent on empty field (`high/mobile/R04`).
  - The toast sits over the huddle, with players visible through its text (`high/mobile/R21`).
  - The stadium board is sliced by the HUD edge (`high/mobile/R21`, `high/mobile/R12`).
  - No landscape capture was provided.
- **6.0.**

### Authenticity: **6.5** (6.5 / 6.0, advocate 6.5)
- **What's right.**
  - Per-school kits, end zones and midfield logos: Lakeside royal and gold (`high/desktop/R13`, `high/mobile/R12`), Jessieville purple (`sheets/compare-07`).
  - Crowds in venue colours (orange at Hot Springs in `crops/high/R04-slot_QB`, blue and gold at Lakeside in `high/desktop/R13`).
  - Padded H posts and a school end-zone wordmark (`high/desktop/R14`).
  - A high-school DOWN, TO GO, BALL ON board (`high/mobile/R08`).
- **What's off.**
  - No band, cheer line or student section.
  - An evenly spaced sideline lineup (`high/desktop/R13`).
  - Lake Hamilton's maroon crushes to black (`sheets/compare-01`, R03).
- **6.5. The gate (6) is met.**

### Totals and verdict
- **Totals.** 5.5 + 6.0 + 5.0 + 6.0 + 6.5 + 6.0 + 6.0 + 6.5 = **47.5**.
- **Gates.** Seven of eight are unmet: art, lighting, animation, ui, typography, readability and mobile. Only authenticity passes.
- **Verdict: `continue`.** The tally script applies stagnation.

## Ranked gaps (top 12, by expected gain ÷ effort)

1. **G-live-camera-beats** (animation, WS7, M, severity 5, +1.0)
   - **Problem.** The throw, catch and tackle are never legible at gameplay scale (`strips/high/R07`, `strips/high/R09`, `strips/high/R10`).
   - **Fix.**
     - On pass release, catch and tackle contact, dolly the live camera so the involved player is at least 60 px tall at 1280×800 for 0.6–0.8 s.
     - Hold 0.4× time scale for 0.3 s at contact, and emit a turf-pellet burst of 12 or more particles.
     - Make the strip capture sample within ±0.2 s of catch and contact, so R09 and R10 actually show the beat.
2. **G-jersey-decals** (art, WS3, S, severity 4, +0.5)
   - **Problem.** Rectangular patches behind the numbers, and mirrored "63" and "47" (`crops/high/R06-slot_C`, `crops/high/R04-slot_QB`).
   - **Fix.** Alpha-test the number decals (discard below 0.5 alpha) so no rectangle shows. Flip U on decal instances whose transform has a negative determinant, so every number reads correctly in `crops/high/R06-slot_C`, `crops/high/R06-slot_LG` and `crops/high/R12-carrier`.
3. **G-dark-kit-contrast** (art, WS3, S, severity 4, +0.5)
   - **Problem.** Home black helmets read as faceless shells, and dark school colours crush at night (`crops/high/R04-slot_QB`, `crops/high/R11-carrier`, `sheets/compare-01` R03).
   - **Fix.**
     - Give the facemask cage on dark-shell helmets a light-grey or accent material (relative luminance at least 0.45) so the cage and face read.
     - Raise the base value of near-black school kits, for example Lake Hamilton maroon, until each reads as its hue under the night grade.
4. **G-toast-band** (mobile, WS7, S, severity 4, +0.5)
   - **Problem.** Result toasts sit over the action, with players visible through the text (`high/mobile/R21`, `high/mobile/R12`).
   - **Fix.** Draw toasts in a band at least 90% opaque, docked to the top or bottom edge of the 3D view. Move it to the other edge whenever its rect intersects the projected bounding box of the ball spot or the huddle.
5. **G-player-model-closeup** (art, WS3, L, severity 5, +1.5)
   - **Problem.** Mannequin construction: tube shins, puck feet, mitten hands, shell pants, uniform builds (`crops/high/R06-slot_C`, `crops/high/R11-carrier`, `crops/high/R04-slot_QB`). Benchmark: axis-3.
   - **Fix.** Tapered calves with a sock line and a shaped cleat, gloves with a thumb and finger split, pants with knee breaks and a fold normal map, continuous shoulder-to-arm joints, and two or three body builds by position (OL wider, WR and DB slimmer).
6. **G-replay-turf-smear** (lighting, WS1, S, severity 3, +0.3)
   - **Problem.** A dark vertical streak on the replay foreground (`high/desktop/R13` at about (520,690), `strips/high/R13` frames 2–8).
   - **Fix.** Find the near-camera caster (likely a light pole or the camera rig in the shadow frustum). Exclude it from shadow casting or clamp the shadow camera's near plane, so the R13 and R15 foreground is clean.
7. **G-ball-flight-marker** (readability, WS7, S, severity 3, +0.3)
   - **Problem.** The ball in flight is findable but not glanceable (`high/desktop/R08`, `high/mobile/R08`).
   - **Fix.** Add a soft ground-shadow disc under the ball, scaled and faded by height, plus a landing ring at the predicted catch point, and lift the ball's rim and lace highlight.
8. **G-line-stance** (animation, WS4, M, severity 4, +0.5)
   - **Problem.** Linemen squat with their arms hanging, and the center isn't on the ball (`crops/high/R06-slot_C`, `crops/high/R04-slot_QB`).
   - **Fix.**
     - A 3-point stance for OL and DL: one hand on the turf, back flat, weight forward.
     - A 2-point stance for skill players.
     - The center's hands on the ball.
     - A get-off burst within 3 ticks of the snap.
9. **G-tackle-clip** (animation, WS4b, M, severity 3, +0.5)
   - **Problem.** The tackler's helmet sinks into the carrier's chest, and every fall uses one pose (`crops/high/R12-carrier`).
   - **Fix.** Resolve capsules in the settle pose so no body part intersects another, offset the tackler laterally, add a contact AO or shadow visible outside the carrier ring, and author at least 3 fall variants (forward, side, back).
10. **G-phone-presnap-framing** (mobile, WS7, M, severity 4, +0.5)
    - **Problem.** Pre-snap phone figures are 13–15 CSS px, and the top half of the view is empty field (`high/mobile/R04`).
    - **Fix.** Tighten the phone pre-snap camera so the formation and wide receivers span at least 70% of the width, figures reach at least 20 CSS px, and the line of scrimmage sits near the vertical middle. Keep the stadium board fully in view or fully out of it.
11. **G-desktop-live-panel** (ui, WS7, M, severity 3, +0.5)
    - **Problem.** The 28%-width panel sits mostly empty during the kickoff and live play, the log drops names, and the clocks disagree (`high/desktop/R01`, `high/desktop/R08`, `high/mobile/R21`).
    - **Fix.**
      - During the kickoff and live play, collapse the panel into an overlay no wider than 200 px (JUKE plus a mini diagram) and widen the 3D view.
      - Bound the play list in a scroll area with whole rows.
      - Always print the player name in log lines.
      - Drive the stadium board clock from the HUD clock.
12. **G-stands-falloff-haze** (lighting, WS1, M, severity 3, +0.5)
    - **Problem.** The overhead cameras frame the stands as a black void, and a corner haze washes the sky (`high/desktop/R01`, `high/desktop/R04`, `strips/high/R07`). Benchmark: cfb26-3.
    - **Fix.** Light the stand seating and crowd to about 25–35% of field luminance in the kickoff and punt cameras, with visible lamp-bank heads and bloom. Confine lamp scattering to the light cones so the upper-corner haze in R04 and R07 goes away.

**Below the cut.**
- G-friday-staging (WS2): band, student section, cheer line, pine cards. Authenticity already clears its gate.
- G-rain-splash (WS5): round, soft splash sprites in place of the white squares.
- Defensive pre-snap ID tags (WS7).

```json
{
  "loop": 3,
  "role": "judge",
  "tier": "high",
  "scores": {
    "art": {
      "score": 5.5,
      "confidence": 0.8,
      "evidence": [
        { "shot": "crops/high/R06-slot_C", "note": "tube shins, puck feet, shell pants; decal patch behind 10; mirrored 63 and 47; grey cages on light kit" },
        { "shot": "crops/high/R04-slot_QB", "note": "black facemask on black shell reads faceless; decal patches behind 12/44; venue-coloured crowd reads as people" },
        { "shot": "crops/high/R12-carrier", "note": "glossy helmets vs matte jerseys; cone trees" }
      ]
    },
    "lighting": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        { "shot": "crops/high/R18-turf_26_67_40", "note": "multi-shadow and wet speckled sheen; white square splash sprites" },
        { "shot": "high/desktop/R01", "note": "overhead kickoff camera: stands a black void, no lamp heads" },
        { "shot": "high/desktop/R04", "note": "lamp bloom present; beige haze still washes upper corners" },
        { "shot": "high/desktop/R13", "note": "lit crowd in replay, but dark vertical smear on foreground turf" },
        { "shot": "crops/high/R09-slot_Z", "note": "two distinct soft shadows per player" }
      ]
    },
    "animation": {
      "score": 5.0,
      "confidence": 0.7,
      "evidence": [
        { "shot": "strips/high/R07", "note": "QB a few px tall; throw beat not legible" },
        { "shot": "strips/high/R09", "note": "ball still short of receiver in frame 8; no catch shown" },
        { "shot": "strips/high/R10", "note": "board 3:20 -> 3:18 between frames 5 and 6: capture skipped contact, no pop" },
        { "shot": "strips/high/R11", "note": "alternating gait, no foot slide visible" },
        { "shot": "crops/high/R07-slot_QB", "note": "coiled throw, front-foot step reads in close-up" },
        { "shot": "crops/high/R12-carrier", "note": "pile on the turf, but tackler helmet interpenetrates carrier" },
        { "shot": "crops/high/R06-slot_C", "note": "linemen squat, arms hanging, no hand down" }
      ]
    },
    "ui": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        { "shot": "high/desktop/R04", "note": "clean scorebug, numbered shape-coded routes and diagram" },
        { "shot": "high/desktop/R08", "note": "panel mostly empty during live play" },
        { "shot": "high/desktop/R01", "note": "kickoff panel ~70% empty" },
        { "shot": "high/mobile/R21", "note": "log line missing player name" }
      ]
    },
    "typography": {
      "score": 6.5,
      "confidence": 0.75,
      "evidence": [
        { "shot": "high/desktop/R14", "note": "TOUCHDOWN! / 20-YD RUN hierarchy, consistent condensed display face" },
        { "shot": "high/mobile/R21", "note": "strong headline scale; translucent toast text lost over bodies" },
        { "shot": "high/desktop/R04", "note": "scorebug numerals read at a glance" }
      ]
    },
    "readability": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        { "shot": "high/desktop/R08", "note": "ball ~12-16 px, findable but no ground marker; target ring clear" },
        { "shot": "high/desktop/R04", "note": "LOS and line to gain unambiguous; figures ~25-30 px" },
        { "shot": "strips/high/R10", "note": "carrier tag and ring read instantly; black kits merge into one mass" },
        { "shot": "high/mobile/R08", "note": "ball visible on phone; action low in a tall field view" }
      ]
    },
    "mobile": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        { "shot": "high/mobile/R04", "note": "pre-snap figures 13-15 CSS px; top half of view empty field" },
        { "shot": "high/mobile/R12", "note": "live figures 20-40 CSS px; pile clear of toast; board sliced" },
        { "shot": "high/mobile/R21", "note": "toast over huddle, bodies visible through text" },
        { "shot": "high/mobile/R08", "note": "full-width thumb JUKE; medium phone proxy min 48 fps at 4x throttle (perf.json)" }
      ]
    },
    "authenticity": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/desktop/R13", "note": "Lakeside royal/gold home kit and venue-coloured crowd; even sideline lineup" },
        { "shot": "high/desktop/R14", "note": "padded H posts, school end-zone wordmark" },
        { "shot": "sheets/compare-07", "note": "Jessieville purple kit, end zone and logo at a 3A venue" },
        { "shot": "sheets/compare-01", "note": "Lake Hamilton home kit crushes to black/orange; no band or student section" }
      ]
    }
  },
  "gaps": [
    { "id": "G-live-camera-beats", "category": "animation", "expectedGain": 1.0, "severity": 5, "effort": "M", "workstream": "WS7", "evidence": ["strips/high/R07", "strips/high/R09", "strips/high/R10"], "benchmark": "cfb26-4", "fix": "On release, catch and tackle contact, dolly the live camera so the involved player is at least 60 px tall at 1280x800 for 0.6-0.8 s; 0.4x time-scale hold for 0.3 s at contact plus a turf-pellet burst of 12 or more particles; capture strips within +/-0.2 s of catch and contact." },
    { "id": "G-jersey-decals", "category": "art", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS3", "evidence": ["crops/high/R06-slot_C", "crops/high/R04-slot_QB", "crops/high/R12-carrier"], "fix": "Alpha-test number decals (discard below 0.5 alpha) so no rectangle shows; flip U on decal instances with a negative-determinant transform so 63 and 47 read correctly." },
    { "id": "G-dark-kit-contrast", "category": "art", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS3", "evidence": ["crops/high/R04-slot_QB", "crops/high/R11-carrier", "sheets/compare-01"], "benchmark": "axis-3", "fix": "Light-grey or accent facemask material (relative luminance at least 0.45) on dark-shell helmets so cage and face read; raise base value of near-black school kits (Lake Hamilton maroon) until the hue reads under the night grade." },
    { "id": "G-toast-band", "category": "mobile", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS7", "evidence": ["high/mobile/R21", "high/mobile/R12"], "benchmark": "retrobowl-2", "fix": "Draw result toasts in a band at least 90% opaque docked to the top or bottom edge of the 3D view, and switch edges whenever the rect intersects the projected ball-spot or huddle bounding box." },
    { "id": "G-player-model-closeup", "category": "art", "expectedGain": 1.5, "severity": 5, "effort": "L", "workstream": "WS3", "evidence": ["crops/high/R06-slot_C", "crops/high/R11-carrier", "crops/high/R04-slot_QB"], "benchmark": "axis-3", "fix": "Tapered calves with a sock line and shaped cleat, gloves with a thumb and finger split, pants with knee breaks and a fold normal map, continuous shoulder-arm joints, and 2-3 body builds by position." },
    { "id": "G-replay-turf-smear", "category": "lighting", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["high/desktop/R13", "strips/high/R13"], "fix": "Find the near-camera shadow caster (pole or camera rig) in the replay shadow frustum and exclude it from casting or clamp the shadow near plane so the R13/R15 foreground is clean." },
    { "id": "G-ball-flight-marker", "category": "readability", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R08", "high/mobile/R08"], "benchmark": "retrobowl-2", "fix": "Soft ground-shadow disc under the ball scaled and faded by height, a landing ring at the predicted catch point, and a lifted rim and lace highlight." },
    { "id": "G-line-stance", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS4", "evidence": ["crops/high/R06-slot_C", "crops/high/R04-slot_QB"], "fix": "3-point stance for OL and DL (hand on turf, flat back, weight forward), 2-point for skill players, center's hands on the ball, and a get-off burst within 3 ticks of the snap." },
    { "id": "G-tackle-clip", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS4b", "evidence": ["crops/high/R12-carrier"], "benchmark": "cfb26-4", "fix": "Resolve capsules in the settle pose so no body part intersects another, offset the tackler laterally, add contact AO or shadow visible outside the carrier ring, and author at least 3 fall variants." },
    { "id": "G-phone-presnap-framing", "category": "mobile", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS7", "evidence": ["high/mobile/R04"], "benchmark": "retrobowl-1", "fix": "Tighten the phone pre-snap camera so the formation and wideouts span at least 70% of the width, figures reach at least 20 CSS px, the LOS sits near the vertical middle, and the stadium board is fully in or fully out of view." },
    { "id": "G-desktop-live-panel", "category": "ui", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["high/desktop/R01", "high/desktop/R08", "high/mobile/R21"], "benchmark": "axis-1", "fix": "During kickoff and live play collapse the side panel into an overlay no wider than 200 px and widen the 3D view; bound the play list with whole rows; always print the player name in log lines; drive the board clock from the HUD clock." },
    { "id": "G-stands-falloff-haze", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["high/desktop/R01", "high/desktop/R04", "strips/high/R07"], "benchmark": "cfb26-3", "fix": "Light the stand seating and crowd to about 25-35% of field luminance in the kickoff and punt cameras with visible lamp-bank heads and bloom; confine lamp scattering to the light cones so the upper-corner haze disappears." }
  ],
  "verdict": "continue",
  "calibration": { "art": 7.0, "lighting": 6.0 }
}
```
