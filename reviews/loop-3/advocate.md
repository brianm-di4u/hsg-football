# Advocate review, loop 3, High tier

All capture paths are relative to `games/football/screenshots/review-loop-3/`. I opened every capture cited below. Where a claim needed more than eyeballing, I zoomed, brightened or sampled pixels in a scratch copy; no project file was changed.

Critic means, which bound my proposals to ±1: art 5.25, lighting 6.0, animation 5.0, ui 6.0, typography 6.5, readability 5.75, mobile 5.75, authenticity 6.25.

## Summary

Most of what the critics say is true. The bodies are mannequins: tube limbs, mitten hands, shell pants. The decals show patches and some numbers are mirrored. Line stances are wrong. The live camera is too wide to sell the throw, catch and tackle beats. The desktop panel is underused, and a few toasts and log lines are sloppy. I concede all of that.

But several specific claims are wrong when checked against the captures, and some of them drive the scores and gap weights. Four matter most:

- **Facemasks.** The dark helmets do have facemask cages. They are black on black, which is a contrast problem, not missing geometry.
- **Uniforms.** The user's team does not always wear Hot Springs black and orange.
- **Tackle pile.** It is not hovering "well above the turf".
- **R10 strip.** The "abrupt collapse" there is a gap in the capture sampling, not an animation pop.
- **Smaller corrections.** The mobile figure-size complaint is true pre-snap but not during live play. The ball in flight is larger and more legible than "a dark speck".

My net proposals are small upward corrections in lighting, animation, readability, mobile and authenticity. No category reaches its gate except authenticity. **Continue.**

## Claims each critic got plainly wrong

### Critic A (critic-claude)
1. **"No facemask geometry on the dark helmets" / "featureless black ovals with no face."**
   - The black helmets worn by the white-jersey team show clear grey cages, with a face behind them: #92 in `crops/high/R06-slot_C` at about (700,255), and the tackler in `crops/high/R12-carrier`.
   - The home team's black helmets also carry a cage, but it is black. Brightening the helmet in `crops/high/R11-carrier` (about 480–620 × 170–270) and in `crops/high/R07-slot_QB` shows horizontal facemask bars, an ear hole and a jaw pad.
   - The navy-team defender #57 in `crops/high/R04-slot_C` shows a skin-tone face behind a grey cage.
   - The defect is low-contrast facemask material, not absent geometry.
2. **"Faceless mannequin referee" in `crops/high/R03-slot_QB`.** The referee is shot from directly behind. We are looking at the back of his head and cap, so this capture can't show a face.
3. **"The user's team always wears Hot Springs black and orange, whether Hot Springs, Lake Hamilton or Jessieville."**
   - Jessieville in `high/desktop/R20`: the jersey pixels sample at about (21,18,44), a dark purple. Hot Springs in `crops/high/R04-slot_QB` samples at about (5,8,14).
   - Lakeside as the home team is royal blue with gold pants (`high/desktop/R06`, `crops/high/R06-slot_C`, `crops/high/R13-carrier`).
   - Only the Lake Hamilton part holds: its jersey samples at about (15,7,14), effectively black, in `crops/high/R03-slot_QB`.
   - The real issue is that the dark palettes are crushed at night, not that the uniform is hard-coded.
4. **"During live play the right panel holds only a greyed JUKE button and one hint line."** `high/desktop/R07`, `high/desktop/R08` and `high/desktop/R10` also show the play name and its route diagram. In `high/desktop/R10` and `high/desktop/R18` JUKE is active and red, not greyed. The panel is still about 60% empty, so I concede that part.
5. **"Figures are about 12 CSS px tall (`high/mobile/R04`, `high/mobile/R08`)."**
   - True for the pre-snap `high/mobile/R04`: about 27 device px, so about 13–14 CSS px.
   - False for `high/mobile/R08`. A zoom of the foreground receiver at (100–320, 1100–1220) gives about 70 device px, so about 35 CSS px.
   - Live figures in `high/mobile/R10` and `high/mobile/R12` are about 30–37 CSS px.
6. **"The +5 YD toast hides the tackle pile" (`high/mobile/R12`).** The pile and carrier ring sit at y ≈ 1000–1030, above the toast's top rule at about 1075. The toast covers the lower bodies of nearby players (#73), not the pile.
7. **"The ball in flight is a small dark-brown ellipse … takes effort to find" (`high/desktop/R08`).** A zoom at (500–720, 440–510) shows a ball about 16 × 12 px with white lace and specular highlights, larger than a helmet at that depth. It has no shadow marker, but it is not a speck. Critic B agrees the ball is "identifiable" in `high/mobile/R08`.

### Critic B (critic-codex)
1. **"Intersecting prone bodies apparently hovering well above the turf, with a detached shadow below" (`crops/high/R12-carrier`).**
   - A 3× zoom of (250–680, 270–430) shows the lowest points of the pile inside the footprint of the carrier ring, which is painted on the turf: the tackler's elbow at about y 370 and the facemask at about y 360. No strip of turf shows between body and ring.
   - The interpenetration is real: the tackler's helmet sinks into the carrier's chest. The "hovering well above" part is not supported.
   - The ring hides any contact shadow, so grounding is hard to read. That is a legitimate but smaller issue.
2. **"In `strips/high/R10`, the standing cluster becomes a prone pile between samples 5 and 6 without a clearly readable weight-transfer sequence."** The in-world scoreboard in the strip reads **3:20, down 1** in frames 1–5 and **3:18, down 2** in frames 6–8 (zoomed clock crop). The capture skipped about 2 game seconds, including the contact and the whistle. The strip shows no contact beat, but it also gives no evidence of an animation pop: the cause is the capture cadence.

## Category by category

### Art: critics 5.5 / 5.0 → propose **5.5**
- **Concede.**
  - Tube shins, puck feet, mitten hands and rigid shell pants (`crops/high/R04-slot_QB`, `crops/high/R14-carrier`, `crops/high/R04-slot_C`).
  - Decal patches behind "12", "44" and "69" (`crops/high/R04-slot_QB`, `crops/high/R04-slot_C`).
  - Mirrored numbers: "63" reads as "Ɛ9" in both `crops/high/R06-slot_LG` and `crops/high/R06-slot_C`, and the tackler's sleeve "47" in `crops/high/R12-carrier` is also flipped.
  - Cone trees (`high/desktop/R15`, `crops/high/R13-carrier`).
  - Repeated crowd poses (`crops/high/R01-crowd`).
- **Rebut.**
  - Helmets have cages, faces show behind them on the light-jersey teams, and the glossy helmet against the matte jersey is a clear material contrast (hot specular on the navy helmet in `crops/high/R06-slot_LG`).
  - Pads have trim piping, and team palettes really vary (`crops/high/R13-carrier`).
  - The crowd reads as people and is coloured by venue: orange, black and white at Hot Springs in `crops/high/R01-crowd`; blue, gold and white at Lakeside in `crops/high/R13-carrier`.
  - That is more than the 5 anchor's "palette-only, crowd reads as colored blocks", but the bodies keep it well short of axis-3.
- **Score.** 5.5, the critic mean +0.25.

### Lighting & atmosphere: critics 6.0 / 6.0 → propose **6.5**
- **Concede.**
  - The dark vertical smear on the replay foreground is real (`high/desktop/R13` at about (520,690), `high/desktop/R15` at about (700,700), `strips/high/R13` frames 2–8).
  - The grey haze in the upper corners is real (`high/desktop/R07`).
  - The rain splashes are white squares (`crops/high/R18-turf_26_67_40`).
  - The overhead kickoff and punt cameras frame the stands as a dark band (`high/desktop/R01`, `high/desktop/R17`).
- **Rebut.** Critic A says there is no falloff from field to stands. That holds only for the two overhead cameras. Elsewhere the stands are lit:
  - The stands carry a lit, coloured crowd under the lamps in `crops/high/R01-crowd` and in the sideline replays `high/desktop/R13` and `high/desktop/R15`. The lit field falls off to a dimmer crowd, then a dark ridge.
  - Several soft shadows fan out under every player (`high/desktop/R17`, `high/desktop/R01`), with two distinct shadows per receiver in `crops/high/R09-slot_Z`.
  - Lamp bloom is present (`high/desktop/R04`, `high/desktop/R22`).
  - A wet speckled specular sheen shows on the turf (`crops/high/R18-turf_26_67_40`), with rain streaks (`high/desktop/R18`).
  - The day-mist depth fog is convincing (`high/desktop/R19`).
  - Most of the elements in the 7 anchor are visibly present. What holds the score down is defects (smear, haze, splash sprites), not missing features.
- **Score.** 6.5 (+0.5), still below axis-3's clean exposure and far below cfb26-3's lit bowl.

### Animation & game feel: critics 5.5 / 4.5 → propose **5.5**
- **Concede.**
  - From the live camera, the throw, catch and tackle beats are not legible (`strips/high/R07`, `strips/high/R09`). In `strips/high/R09` the ball is still short of the receiver in frame 8, so no catch is shown.
  - There is no punch-in, slow motion or particles.
  - The linemen squat with arms hanging, and the center's hands are not on the ball (`crops/high/R06-slot_C`, `crops/high/R04-slot_C`).
  - The tackler's helmet interpenetrates the carrier (`crops/high/R12-carrier`).
  - The celebration poses are stiff (`crops/high/R14-carrier`).
- **Rebut Critic B's 4.5.** It rests on two claims that don't hold:
  - The pile is not "suspended well above the turf" (see above).
  - The R10 "collapse" is a sampling gap (scoreboard 3:20 → 3:18 between frames 5 and 6 of `strips/high/R10`).
- **What the close-ups show.**
  - A legible coiled throw: ball cocked behind the helmet, front foot stepping, shoulders closed (`crops/high/R07-slot_QB`).
  - Real stride phases with planted feet: `crops/high/R11-carrier`, and `crops/high/R10-carrier`, where the carrier crosses over with his support foot on the turf.
  - A held step on the sweep (`crops/high/R13-carrier`).
  - Strides change phase frame to frame across `strips/high/R11`.
  - On contact this sits above the 5 anchor ("sliding, floaty"). The missing feel touches keep it far from 7.
- **Score.** 5.5 (+0.5).

### UI / HUD: critics 6.0 / 6.0 → propose **6.0**
- **Concede.**
  - The desktop panel is mostly empty after the snap (`high/desktop/R08`, `high/desktop/R10`).
  - There are no on-field defensive labels (`high/desktop/R05`).
  - Log lines drop the player name ("Bathhouse Dive: runs for 7 yd." in `high/desktop/R21`; "scores from 20 yd out." in `high/desktop/R14`).
  - The board reads 3:17 while the HUD reads 3:18 (`high/desktop/R12`).
  - The bottom play card is cut off (`high/desktop/R22`). It sits in a scrolling list, so this is minor.
- **Rebut in part.**
  - The panel keeps the play name and route diagram during live play (`high/desktop/R08`).
  - Desktop toasts mostly sit over empty turf or sky (`high/desktop/R21`, `high/desktop/R14`). Only `high/desktop/R12` brushes a player and the referee.
  - The day theme re-skins the panel (`high/desktop/R19`).
  - Route art is numbered and shape-coded (`high/desktop/R04`). The tangle in `high/desktop/R19` is partly inherent to a converging slants concept.
- **Score.** Hold at 6.0.

### Typography: critics 6.5 / 6.5 → propose **6.5**
- **Concede.**
  - The board clock is in a Courier-like face (`crops/high/R01-board`).
  - A lone "yd." wraps to its own line (`high/desktop/R15`).
  - The last play card is clipped (`high/desktop/R22`).
- **What works.**
  - A consistent condensed display face over a neutral sans (`high/desktop/R22`, `high/mobile/R22`).
  - Clear "TOUCHDOWN! / 20-YD RUN" hierarchy (`high/desktop/R14`).
- **Score.** Hold at 6.5.

### Readability: critics 6.0 / 5.5 → propose **6.0**
- **Concede.**
  - Desktop formation figures are about 25–30 px tall (`high/desktop/R04`).
  - Dark jerseys lose value against dark turf at night (`high/desktop/R10`).
  - The ball has no ground marker.
- **Rebut.**
  - The ball reads as a laced football at desktop scale (`high/desktop/R08` zoom) and on the phone (`high/mobile/R08` at about (440,993)).
  - Orange pants and shoulder trim split the home team from the turf in close and mid shots (`crops/high/R18-turf_26_67_40`).
  - The carrier tag and ring are excellent (`high/mobile/R10`, `high/desktop/R11`).
  - The line of scrimmage and line to gain are unambiguous (`high/desktop/R04`).
- **Score.** 6.0 (+0.25).

### Mobile: critics 6.0 / 5.5 → propose **6.0**
- **Concede.**
  - Pre-snap figures are about 13–14 CSS px (`high/mobile/R04`), with much dead field above the formation.
  - Players draw through the "+7 YD · FIRST DOWN" toast (`high/mobile/R21`).
  - The stadium board is sliced at the top (`high/mobile/R10`, `high/mobile/R21`).
  - No landscape capture was provided.
- **Rebut.**
  - Live figures are about 30–37 CSS px (`high/mobile/R10`, `high/mobile/R12`, `high/mobile/R08`).
  - The portrait layout is intentional: full-width JUKE, a two-column card grid (`high/mobile/R22`), and HIKE / CONTINUE at thumb size.
  - The medium phone proxy holds 48 fps minimum at 4× throttle.
- **Score.** 6.0 (+0.25).

### Authenticity: critics 6.5 / 6.0 → propose **6.5**
- **Concede.**
  - There is no visible band, cheer line or distinct student section.
  - The sideline lineup is evenly spaced (`high/desktop/R13`, `high/desktop/R15`).
  - The trees are cones.
- **Rebut.**
  - Per-school identity goes further than Critic A credits: home uniforms differ by school (`high/desktop/R06` Lakeside royal and gold; `high/desktop/R20` Jessieville purple), and the crowd takes the home colours (`crops/high/R13-carrier` against `crops/high/R01-crowd`).
  - Each school has its end-zone wordmark and midfield logo (`high/desktop/R03`, `high/desktop/R06`, `high/desktop/R20`).
  - The high-school scoreboard is right (`crops/high/R01-board`), and so are the padded H posts and the track (`high/desktop/R14`, `high/desktop/R01`).
- **Score.** 6.5 (+0.25).

## Gaps, restated with adjusted severity and gain

Duplicates between the critics are marked. Their gains are not additive.

| Gap | Critic | Original sev/gain | Advocate sev/gain | Reason |
|---|---|---|---|---|
| G-player-model-closeup | A | 5 / 1.5 | 4 / 1.0 | Cages exist; the cheap win is a contrasting facemask colour. Limbs, hands and pants remain the real cost. |
| G-player-construction | B (dup of above) | 5 / 1.5 | 4 / 1.0 | Same defect. |
| G-live-camera-beats | A | 5 / 1.0 | 4 / 1.0 | Valid. Part of the R10 strip's illegibility is capture cadence (3:20 → 3:18 skip). |
| G-tackle-grounding | B | 5 / 1.5 | 3 / 0.5 | The pile is at turf level inside the ring; only the interpenetration and the hidden contact shadow hold. The strip "collapse" is a sampling gap. |
| G-action-poses | B | 4 / 1.0 | 3 / 0.5 | The close-ups show a coiled throw and planted strides; legibility is mostly camera scale (overlaps G-live-camera-beats). |
| G-jersey-decals | A | 4 / 0.5 | 3 / 0.5 | Confirmed: patches, and mirrored "63" and "47". |
| G-line-stance | A | 4 / 0.5 | 4 / 0.5 | Confirmed. |
| G-tackle-clip | A | 3 / 0.5 | 3 / 0.5 | Confirmed. |
| G-stands-void | A | 4 / 0.5 | 3 / 0.3 | Stands are lit in the sideline replays and the crowd close-up; this is overhead-camera framing only. |
| G-light-horizon | B | 3 / 0.5 | 2 / 0.3 | Corner haze is real (R07); the R19 horizon mist is soft and plausible. |
| G-replay-turf-smear | A | 3 / 0.3 | 3 / 0.3 | Confirmed. |
| G-rain-splash | A | 2 / 0.2 | 2 / 0.2 | Confirmed. |
| G-live-panel-space | A | 4 / 0.5 | 3 / 0.5 | The panel does hold the diagram; still about 60% empty. |
| G-desktop-panel | B (dup) | 3 / 1.0 | 3 / 0.5 | Same defect. |
| G-toast-placement | A | 4 / 0.5 | 3 / 0.5 | Desktop toasts mostly over empty turf; mobile R21 overlap is real; R12 doesn't hide the pile. |
| G-mobile-figure-scale | A | 4 / 0.5 | 3 / 0.5 | Pre-snap only; live figures are about 30–37 CSS px. |
| G-phone-action-scale | B (dup) | 4 / 1.0 | 3 / 0.5 | Same. |
| G-ball-visibility | A | 3 / 0.5 | 2 / 0.3 | The ball is a laced 16 × 12 px football; a shadow marker is polish. |
| G-team-uniforms | A | 3 / 0.5 | 2 / 0.2 | Uniforms already vary by school; the fix is lifting dark palette values at night. |
| G-friday-staging | A | 3 / 0.5 | 3 / 0.5 | Confirmed. |
| G-school-crowd | B (dup) | 3 / 0.5 | 3 / 0.5 | Same, minus venue-coloured crowds, which already exist. |
| G-hud-data-and-type | A | 2 / 0.3 | 2 / 0.3 | Confirmed (R21 and R14 logs, R12 clock, R01 board font). |

```json
{
  "loop": 3,
  "role": "advocate",
  "tier": "high",
  "scores": {
    "art": {
      "score": 5.5,
      "confidence": 0.75,
      "evidence": [
        { "shot": "crops/high/R04-slot_QB", "note": "mannequin limbs, mitten hands, decal patches behind 12/44 (conceded)" },
        { "shot": "crops/high/R06-slot_C", "note": "black helmets on the white team show grey facemask cages with faces; mirrored 63 decal" },
        { "shot": "crops/high/R11-carrier", "note": "home black helmet carries a black facemask cage (visible when brightened): contrast, not missing geometry" },
        { "shot": "crops/high/R06-slot_LG", "note": "glossy helmet specular against matte jersey; per-team palette (navy/gold)" },
        { "shot": "crops/high/R01-crowd", "note": "crowd reads as people in venue colours; repeated poses" }
      ]
    },
    "lighting": {
      "score": 6.5,
      "confidence": 0.65,
      "evidence": [
        { "shot": "high/desktop/R17", "note": "several soft shadows fanned under every player" },
        { "shot": "high/desktop/R13", "note": "lit crowd in the stands with falloff from the field (rebuts the 'no falloff' claim); dark smear on the foreground turf (conceded)" },
        { "shot": "crops/high/R18-turf_26_67_40", "note": "wet speckled specular sheen; square splash sprites (conceded)" },
        { "shot": "high/desktop/R19", "note": "convincing day mist and depth fog" },
        { "shot": "high/desktop/R07", "note": "grey corner haze (conceded)" }
      ]
    },
    "animation": {
      "score": 5.5,
      "confidence": 0.6,
      "evidence": [
        { "shot": "strips/high/R10", "note": "board reads 3:20 down 1 in frames 1-5 and 3:18 down 2 in 6-8: capture skipped the contact; not evidence of a pop" },
        { "shot": "strips/high/R07", "note": "throw beat not legible from the wide live camera (conceded)" },
        { "shot": "crops/high/R07-slot_QB", "note": "coiled throw: ball cocked behind the helmet, front-foot step" },
        { "shot": "crops/high/R12-carrier", "note": "wrap tackle at turf level inside the ring; helmet interpenetrates the carrier (conceded)" },
        { "shot": "crops/high/R06-slot_C", "note": "no 3-point stance, center not on the ball (conceded)" }
      ]
    },
    "ui": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/desktop/R08", "note": "panel keeps the play name and route diagram but is ~60% empty in live play" },
        { "shot": "high/desktop/R21", "note": "toast over empty turf; log line missing the player name" },
        { "shot": "high/desktop/R04", "note": "clean scorebug; numbered, shape-coded route art" },
        { "shot": "high/desktop/R05", "note": "no on-field defensive labels (conceded)" }
      ]
    },
    "typography": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/desktop/R22", "note": "consistent condensed display face over a neutral sans; last card clipped" },
        { "shot": "high/desktop/R14", "note": "clear TOUCHDOWN / 20-YD RUN hierarchy" },
        { "shot": "crops/high/R01-board", "note": "Courier-like board clock (conceded)" }
      ]
    },
    "readability": {
      "score": 6.0,
      "confidence": 0.65,
      "evidence": [
        { "shot": "high/desktop/R08", "note": "ball is a ~16x12 px laced football with highlights, not a speck; no ground marker" },
        { "shot": "high/mobile/R10", "note": "carrier tag and ring read instantly" },
        { "shot": "high/desktop/R10", "note": "dark jerseys against dark turf; small figures (conceded)" },
        { "shot": "high/desktop/R04", "note": "line of scrimmage and line to gain unambiguous" }
      ]
    },
    "mobile": {
      "score": 6.0,
      "confidence": 0.65,
      "evidence": [
        { "shot": "high/mobile/R04", "note": "pre-snap figures ~13-14 CSS px with dead field above (conceded)" },
        { "shot": "high/mobile/R08", "note": "live foreground figures ~35 CSS px; ball visible" },
        { "shot": "high/mobile/R21", "note": "players draw through the toast; board sliced at top (conceded)" },
        { "shot": "high/mobile/R22", "note": "intentional two-column card grid, thumb-size buttons" }
      ]
    },
    "authenticity": {
      "score": 6.5,
      "confidence": 0.65,
      "evidence": [
        { "shot": "high/desktop/R06", "note": "Lakeside home in royal and gold: uniforms vary by school" },
        { "shot": "high/desktop/R20", "note": "Jessieville dark purple jerseys, purple end zone and logo; 3A venue scale" },
        { "shot": "crops/high/R13-carrier", "note": "crowd in Lakeside colours" },
        { "shot": "crops/high/R01-board", "note": "high-school DOWN / TO GO / BALL ON board" },
        { "shot": "high/desktop/R15", "note": "no band or cheer; even sideline lineup; cone trees (conceded)" }
      ]
    }
  },
  "gaps": [
    { "id": "G-player-model-closeup", "category": "art", "expectedGain": 1.0, "severity": 4, "effort": "L", "workstream": "WS3", "evidence": ["crops/high/R04-slot_QB", "crops/high/R14-carrier", "crops/high/R11-carrier"], "benchmark": "axis-3", "fix": "Tapered limbs with sock and cleat, fingered gloves, normal-mapped jersey and pants folds; give the home team's facemask cage a contrasting colour (it already exists but is black on black)." },
    { "id": "G-player-construction", "category": "art", "expectedGain": 1.0, "severity": 4, "effort": "L", "workstream": "WS3", "evidence": ["crops/high/R04-slot_C", "crops/high/R06-slot_LG"], "benchmark": "axis-3", "fix": "Duplicate of G-player-model-closeup: continuous joint silhouettes, shaped gloves and cleats, varied proportions, cloth folds." },
    { "id": "G-live-camera-beats", "category": "animation", "expectedGain": 1.0, "severity": 4, "effort": "M", "workstream": "WS7", "evidence": ["strips/high/R07", "strips/high/R09", "strips/high/R10"], "benchmark": "cfb26-4", "fix": "Punch in on release, catch and contact with a short slow-motion hold and a turf burst; also sample strips across the contact window (R10 skipped from 3:20 to 3:18)." },
    { "id": "G-tackle-grounding", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS4b", "evidence": ["crops/high/R12-carrier"], "benchmark": "cfb26-4", "fix": "Resolve the helmet-into-torso intersection and add a contact shadow or AO under the pile; the pile is already at turf level." },
    { "id": "G-action-poses", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS4", "evidence": ["strips/high/R11", "strips/high/R09", "crops/high/R07-slot_QB"], "benchmark": "cfb26-4", "fix": "Add cut lean and hand-to-ball sync at the catch; the throw coil already reads in close-up, so the gain overlaps with camera punch-ins." },
    { "id": "G-jersey-decals", "category": "art", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS3", "evidence": ["crops/high/R06-slot_LG", "crops/high/R04-slot_C", "crops/high/R12-carrier"], "fix": "Alpha-cut the decal quads and fix the UV or winding flip that mirrors 63 and 47." },
    { "id": "G-line-stance", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS4", "evidence": ["crops/high/R06-slot_C", "crops/high/R04-slot_C"], "fix": "Author 3-point and 2-point stances with a hand down; put the center's hands on the ball; add a get-off burst at the snap." },
    { "id": "G-tackle-clip", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS4b", "evidence": ["crops/high/R12-carrier"], "fix": "Separate the body capsules in the settle pose, offset the tackler laterally, and vary the falls." },
    { "id": "G-stands-void", "category": "lighting", "expectedGain": 0.3, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["high/desktop/R01", "high/desktop/R17"], "benchmark": "cfb26-3", "fix": "Frame or lift the stands in the overhead kickoff and punt cameras; the stands are already lit in the replay and close-up shots." },
    { "id": "G-light-horizon", "category": "lighting", "expectedGain": 0.3, "severity": 2, "effort": "M", "workstream": "WS1", "evidence": ["high/desktop/R07", "high/desktop/R04"], "benchmark": "cfb26-3", "fix": "Localize the lamp scattering so the corner haze doesn't wash the sky." },
    { "id": "G-replay-turf-smear", "category": "lighting", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["high/desktop/R13", "high/desktop/R15", "strips/high/R13"], "fix": "Cull or clamp the near-camera occluder or shadow caster in the replay camera." },
    { "id": "G-rain-splash", "category": "lighting", "expectedGain": 0.2, "severity": 2, "effort": "S", "workstream": "WS5", "evidence": ["crops/high/R18-turf_26_67_40"], "fix": "Use soft round splash sprites with alpha falloff." },
    { "id": "G-live-panel-space", "category": "ui", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["high/desktop/R08", "high/desktop/R10"], "benchmark": "axis-1", "fix": "Collapse the panel after the snap into a slim overlay (JUKE plus mini diagram) and widen the 3D view." },
    { "id": "G-desktop-panel", "category": "ui", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["high/desktop/R10", "high/desktop/R22"], "benchmark": "axis-1", "fix": "Duplicate of G-live-panel-space; also give the play list a clearly bounded scroll area." },
    { "id": "G-toast-placement", "category": "mobile", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/mobile/R21", "high/desktop/R12"], "benchmark": "retrobowl-2", "fix": "Use an opaque, fixed toast band above the 3D layer on mobile; desktop placement is mostly fine already." },
    { "id": "G-mobile-figure-scale", "category": "mobile", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["high/mobile/R04"], "benchmark": "retrobowl-1", "fix": "Tighten the pre-snap phone camera; live cameras already give ~30-37 CSS px figures." },
    { "id": "G-phone-action-scale", "category": "mobile", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["high/mobile/R04", "high/mobile/R08"], "benchmark": "retrobowl-1", "fix": "Duplicate of G-mobile-figure-scale: cut the dead field above the formation pre-snap." },
    { "id": "G-ball-visibility", "category": "readability", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R08", "high/mobile/R08"], "benchmark": "retrobowl-2", "fix": "Add a ground shadow or landing marker; the ball itself already reads." },
    { "id": "G-team-uniforms", "category": "authenticity", "expectedGain": 0.2, "severity": 2, "effort": "S", "workstream": "WS3", "evidence": ["crops/high/R03-slot_QB", "high/desktop/R20"], "fix": "Lift the dark palette values (Lake Hamilton maroon, Jessieville purple) so they read at night; per-school uniforms already exist." },
    { "id": "G-friday-staging", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["high/desktop/R15", "high/desktop/R13"], "benchmark": "cfb26-1", "fix": "Add a band block, a cheer line and a student section; layered pine cards; break up the even sideline lineup." },
    { "id": "G-school-crowd", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["crops/high/R01-crowd", "high/desktop/R20"], "benchmark": "cfb26-1", "fix": "Duplicate of G-friday-staging: vary spectator poses and add student and band sections (venue-coloured crowds already exist)." },
    { "id": "G-hud-data-and-type", "category": "ui", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R21", "high/desktop/R14", "high/desktop/R12", "crops/high/R01-board"], "fix": "Restore player names in the log, sync the board and HUD clocks, and use an LED face on the board." }
  ],
  "verdict": "continue"
}
```
