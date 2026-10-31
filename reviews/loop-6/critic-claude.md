# Critic A (critic-claude): loop 6, High tier

## Verdict

Friday Night Spa City is a clean, coherent stylized 3D football game. The broadcast-style HUD, route art and painted local end zones give it real identity. It still falls clearly short of the Axis Football 2026 bar the rubric anchors at 7, and no gate passes. Up close, the players are toy-like. Their pants and seat are inflated balloons on tube arms, and the officials are featureless mannequins. Outside the lit field the venue is often a black or grey void. Contact animation (catch, cut, tackle) can't be read in any strip; the pile simply appears between frames. Rain, the headline lighting change this loop, reads as dry turf with one blown-out hotspot. On a portrait phone the pre-snap camera shrinks the formation to a thin strip of 8-CSS-px figures with most of the screen showing empty downfield turf. The loop-6 UI work is real: one game clock everywhere, a docked result band on the phone, and landscape bands that fit. But stale or contradictory log lines, clipped hint text and slivers of the 3D board under the HUD keep UI and mobile below 7. **Continue.**

## Scores (High, desktop; mobile from mobile frames)

### Art: 5.5
- **Players have materials but the wrong shapes.** Close-ups show glossy helmets with specular highlights, facemask bars, readable numbers and stripes against matte jerseys (`crops/high/R04-slot_C`, `crops/high/R14-carrier`). That material contrast is a 7-level trait. The silhouettes undo it:
  - Pants and seat swell into orange balloons wider than the shoulders (`crops/high/R04-slot_QB` #12 and #44, `crops/high/R06-slot_C` #66 and #56, `crops/high/R16-slot_K` holder #12).
  - Arms are uniform black or white tubes ending in mitten hands (`crops/high/R06-slot_C-side`).
- **Sleeves are still faceted.** In `crops/high/R06-slot_LG` the camera sits inside #20's sleeve. The outline is faceted, and the white hem stripe still has a notch under the number, despite the claimed full-round stripes.
- **Officials are primitive.** They are capsule mannequins with blank heads and ball fists (`crops/high/R03-slot_QB`, foreground referee). That is a 3-to-5 anchor feature in frame after frame.
- **The crowd works up close but the venue doesn't hold at play distance.**
  - Up close the crowd reads as people, with varied shirts and raised arms (`crops/high/R01-crowd`).
  - At gameplay distance the kickoff and punt cameras show a black bowl with no visible crowd (`high/desktop/R01`, `high/desktop/R17`).
  - The replay cameras show one small floating bleacher block against a blank grey wall (`high/desktop/R13`, `high/desktop/R15`).
- **Turf grain is good at field level** (`crops/high/R04-turf_26_67_42`).
- **Benchmark:** axis-3 (about 7) has believable proportions, a full crowd bowl and sponsor-board dressing. This sits between the 5 and 7 anchors.

### Lighting & atmosphere: 6.0
- **The night grade is good on the field.**
  - The lamps bloom (`high/desktop/R04`, `high/desktop/R03`).
  - Players cast several soft shadows (`crops/high/R09-slot_Z`, `crops/high/R04-turf_26_67_42`).
  - Helmets carry real highlights, and the dusk sky over the Ouachita silhouettes sells time of day.
- **Falloff from the field to the stands collapses into black.** The far stands at kickoff are invisible (`high/desktop/R01`, `high/desktop/R02`). On replays the area behind the near bleachers is flat grey (`high/desktop/R13`).
- **A flat grey lamp-glare veil washes out the top-left of the frame** in `high/desktop/R07`, `high/desktop/R08` and frames 1–3 of `strips/high/R09`.
- **Rain doesn't read as wet.** At gameplay distance the turf in `high/desktop/R18` looks the same as dry turf in `high/desktop/R10`, with no darker or broad standing-water patches. The close-up `crops/high/R18-turf_26_67_40` shows one blown-out white hotspot beside #66, not a soft sheen across water. Medium matches (`crops/medium/R18-turf_26_67_40`).
- **The day-mist frame is believable but flat** (`high/desktop/R19`).
- **Benchmarks:** axis-3 and cfb26-3. The rain sheen and field-to-stand falloff in the 7 anchor are missing.

### Animation & game feel: 5.0
- **Strips.**
  - `strips/high/R07`: the camera is too wide to read the drop or the wind-up at all.
  - `strips/high/R09`: the camera cuts at frame 4. The receiver is upright with no reach, and by frames 6–8 bodies are already lying still. The catch beat never shows.
  - `strips/high/R10`: the carrier walks into traffic in frames 1–5, and a pile with a man down simply appears at frame 6 with no visible wrap or contact frame. `strips/medium/R10` is identical.
  - `strips/high/R11`: the carrier slides laterally with no visible plant or lean.
  - `strips/high/R13`: the replay shows bunching, but the carrier never visibly goes down in 8 frames.
- **Close-ups.**
  - `crops/high/R09-slot_Z`: #88 is upright with arms low, no hands to the ball, and a defender's leg passes through his legs (interpenetration).
  - `crops/high/R11-carrier`: upright torso, no lean into the cut.
- **Positives.**
  - The QB wind-up with the ball cocked is legible (`crops/high/R07-slot_QB`).
  - Bodies on the ground read as a tackle result (`crops/high/R12-carrier`).
  - The TD celebration has jumps and raised arms (`crops/high/R14-carrier`).
  - Planted feet in the line stances (`crops/high/R06-slot_DL2-side`).
- **Missing feel touches.** There are no punch-ins or slow-motion at contact.
- **Fit to the anchors:** this is the 5 anchor, procedural cycles that read but with popping into piles and no contact beats.

### UI / HUD: 6.0
- **Strong parts.**
  - The scorebug is consistent and broadcast-like, with the possession football, timeout dots and down and distance. The clock agrees across the scorebug, board and log (`high/desktop/R21`: 3:51 in all three).
  - Pre-snap identification is good: numbered shape badges on route art, an on-field "1ST & 10" and a matching diagram (`high/desktop/R04`).
  - Result bands have clear hierarchy (`high/desktop/R21`, `high/desktop/R12`), and the kick meter is clear (`high/desktop/R16`).
- **The side panel is mostly empty.** During R04, R07–R11 and R18, about 60% of the panel below the buttons is dead space.
- **The log is stale or contradictory.**
  - `high/desktop/R17` already logs "Hot Springs punts 42 yd, downed" while the ball is still in the air.
  - `high/desktop/R21` logs "Touchback. Ball on the own 20", then a 7-yard run that ends at the own 37.
  - `high/desktop/R14` logs a return to the own 32, then "scores from 20 yd out".
- **The 3D board is cut off** by the top HUD in `high/desktop/R14`.
- **The controls hint is near-invisible.** "Steer with arrows/WASD…" under JUKE is dim grey (`high/desktop/R07`), even after the muted-text contrast change.
- **Benchmarks:** axis-1 and madden26-3. Close on parts, but "nothing stale" fails.

### Typography: 6.5
- **The type system is consistent.** A condensed display face is used for the scorebug, buttons and headlines, with a humanist sans for descriptions. The scale is consistent, and the numerals read at a glance (`high/desktop/R22`, `high/landscape/R21`). The play-card titles and descriptions on desktop are tidy (`high/desktop/R22`).
- **The tenth play card is faded out** rather than fitting cleanly, and its description is unreadable (`high/desktop/R22`).
- **Landscape play cards wrap badly.** "Bathhouse / Dive" and the header "…AT THE / OWN 30" each break onto two lines, so only 2.5 cards are visible (`high/landscape/R22`, `medium/landscape/R22`).
- **The hint text is low-contrast and clipped** (`high/mobile/R10`, `high/landscape/R10`).
- **The board's seven-segment clock spaces oddly** as "3:5 1" (`high/mobile/R14`).
- **Benchmarks:** madden26-3 and legendbowl-4. Not yet a deliberate 7-level type scale everywhere.

### Readability: 6.0
- **Desktop reads well.**
  - The line of scrimmage (blue) and first-down line (yellow) are clear.
  - The carrier has a white ring and a name tag (`high/desktop/R10`, `high/desktop/R11`), and the pass target has a cyan disc.
  - The ball in flight can be found at 1280 px (`high/desktop/R08`).
- **Players are small at the default camera, about 25 px tall** (`high/desktop/R04`). The runner disappears inside the scrum without his tag (`strips/high/R10` frames 6–8).
- **The ball close-up has no ball in it.** `crops/high/R08-ball` shows receivers but no visible ball, so the ball's own read is weak (no trail, no highlight).
- **Portrait pre-snap is the weak point.** In `high/mobile/R04` the whole formation occupies about 6% of the field area, at roughly 8 CSS px per player, while about 55% of the view is empty turf down to the far end zone. In `high/mobile/R08` the ball is about 5 CSS px.
- **Benchmarks:** madden26-1, axis-1 and retrobowl-1. Retro Bowl's figures are 3–4× larger on the same phone.

### Mobile: 6.0
- **What works.**
  - Buttons are thumb-friendly: HIKE and CHANGE PLAY are full height, and JUKE is full width (`high/mobile/R04`, `high/mobile/R10`).
  - In the result phase the camera centres the pile above the docked band, which is good (`high/mobile/R12`, `high/mobile/R21`).
  - The landscape scorebug fits all timeout dots, and the bands fit (`high/landscape/R04`, `high/landscape/R12`).
  - The phone proxy holds 50 fps minimum on High at 4× CPU throttle.
- **Portrait problems.**
  - Pre-snap figures are tiny (`high/mobile/R04`, `medium/mobile/R04`).
  - The hint line is cut off at the bottom edge in `high/mobile/R08`, `high/mobile/R10` and `high/mobile/R18`.
  - A sliver of the 3D board ("DOWN TO GO BALL ON") is cut off under the HUD in `high/mobile/R10` and `high/mobile/R18`.
  - The board is clipped at the right edge in `high/mobile/R14`.
- **Landscape problems.**
  - The scorebug takes about 18% of the screen height.
  - The play list shows only 2.5 oversized cards (`high/landscape/R22`).
  - A sliver of the board peeks out under the touchdown band (`high/landscape/R14`).
- **Benchmarks:** retrobowl-1 and retrobowl-2. Intentional now, but figures aren't yet "readable" at 390 px pre-snap.

### Authenticity: 6.0
- **Strong local identity.**
  - Painted end zones: HOT SPRINGS, TROJANS, WOLVES and LAKESIDE (`high/mobile/R22`, `high/desktop/R03`).
  - Midfield logos, an HSHS/LHHS seven-segment scoreboard (`crops/high/R01-board`), Spa City play names, a mountain-and-pine backdrop, and small 3A bleachers at Jessieville (`high/desktop/R20`).
  - Officials in stripes, team benches with players standing along the sideline.
- **The small-town crowd staging is missing.** There is no band, no student section, and no lit home grandstand at kickoff (`high/desktop/R01`). Replays show a single bleacher block in a void (`high/desktop/R15`).
- **The punt shows a kickoff-style line of 11** across the 50, not a punt formation and coverage lanes (`high/desktop/R17`).
- **Benchmarks:** legendbowl-4 and cfb26-1. At the gate, not above it.

## Ranked gaps

| # | Gap | Category | Expected gain | Severity | Effort | Workstream | Evidence |
|---|---|---|---|---|---|---|---|
| 1 | `G-portrait-presnap-scale` | mobile, readability | +0.5 mobile, +0.3 readability | 4 | M | WS7 | `high/mobile/R04`, `high/mobile/R08` |
| 2 | `G-player-silhouette` | art | +0.5 | 4 | M | WS3 | `crops/high/R04-slot_QB`, `crops/high/R06-slot_C`, `crops/high/R06-slot_LG` |
| 3 | `G-venue-void` | authenticity, art | +0.5 authenticity, +0.3 art | 4 | L | WS2 | `high/desktop/R01`, `high/desktop/R13`, `high/desktop/R15`, `high/desktop/R17` |
| 4 | `G-contact-beats` | animation | +0.7 | 4 | L | WS4b | `strips/high/R10`, `strips/high/R13`, `crops/high/R09-slot_Z` |
| 5 | `G-catch-cut-poses` | animation | +0.4 | 3 | M | WS4 | `crops/high/R09-slot_Z`, `crops/high/R11-carrier`, `strips/high/R09`, `strips/high/R11` |
| 6 | `G-rain-reads-dry` | lighting | +0.4 | 3 | M | WS5 | `high/desktop/R18`, `crops/high/R18-turf_26_67_40` |
| 7 | `G-mobile-clipping` | mobile | +0.3 | 3 | S | WS7 | `high/mobile/R10`, `high/mobile/R14`, `high/landscape/R22` |
| 8 | `G-log-coherence` | ui | +0.3 | 2 | S | WS7 | `high/desktop/R17`, `high/desktop/R21`, `high/desktop/R14` |
| 9 | `G-officials-mannequin` | art | +0.2 | 2 | M | WS3 | `crops/high/R03-slot_QB` |
| 10 | `G-stand-falloff-veil` | lighting | +0.3 | 3 | M | WS1 | `high/desktop/R01`, `high/desktop/R07`, `strips/high/R09` |
| 11 | `G-empty-panel-hint` | ui | +0.2 | 2 | S | WS7 | `high/desktop/R04`, `high/desktop/R07` |

Fixes:

1. **`G-portrait-presnap-scale`.** Frame the portrait pre-snap and QB-hold cameras on the formation box (line of scrimmage ± 12 yards), not on the far end zone. Put the line of scrimmage at about 60% of the screen height. Set the field of view so a lineman is at least 22 CSS px tall and the outside receivers sit at about 8% of the width.
2. **`G-player-silhouette`.** Deflate the pants and seat volume by 25–35%: taper the thighs into the knee, and narrow the hips so they stay inside the shoulder line. Give the arms a deltoid and forearm taper with a defined glove and fingers. Add more segments to the sleeve outline, and remove the hem-stripe notch under the sleeve number.
3. **`G-venue-void`.** Put a lit home grandstand and press box behind the camera-facing sideline for the kickoff, punt and replay cameras. Add the band block and a student section with a distinct colour or waving pattern. Fill the grey wall behind the replay bleachers with stands, a fence and lit concourse props.
4. **`G-contact-beats`.** Give tackles a 2–3 frame wrap or contact pose (tackler's arms around the carrier, carrier's torso jolting) before the fall. Add a camera punch-in and 0.3 s of slow motion at first contact. Stagger the fall so the pile builds visibly across frames instead of appearing.
5. **`G-catch-cut-poses`.** Use inverse kinematics on the receiver's hands toward the ball for 0.3 s before the catch, with a head turn. On cuts, lean the carrier's torso 15–20° into the turn with a plant foot. Keep the ball visible tucked on the outside arm. Add capsule separation so players don't interpenetrate.
6. **`G-rain-reads-dry`.** Darken the wet turf colour by 20–30% across the whole field. Make puddle masks visible at the gameplay camera, several yards wide and low-frequency. Clamp the specular peak so lamp reflections streak and spread instead of blowing out to white. Add a wet sheen to helmets and jerseys.
7. **`G-mobile-clipping`.**
   - Reserve safe-area padding so the hint line isn't cut off.
   - Hide or reposition the 3D board when less than 60% of it would show under the HUD.
   - On landscape, cut the scorebug to 64 px high and use a one-line card layout with 2-column play cards so 4–6 cards show.
8. **`G-log-coherence`.** Write the punt or kick result to the log only once the ball is dead. Make staged scenarios produce consistent prior log entries (the spot after a touchback must match the next snap).
9. **`G-officials-mannequin`.** Build the officials on the player base body (non-padded variant) with a cap, face, belt, white knickers and black shoes.
10. **`G-stand-falloff-veil`.** Add field-spill light to the stands with distance falloff so the kickoff wide shot shows lit crowds. Remove or clamp the lamp glare that paints a flat grey veil across the sky.
11. **`G-empty-panel-hint`.** Use the empty panel for personnel and formation, the defensive look, and the hot-receiver read. Raise the hint contrast to at least 7:1.

```json
{
  "loop": 6,
  "role": "critic-claude",
  "tier": "high",
  "scores": {
    "art": {
      "score": 5.5,
      "confidence": 0.75,
      "evidence": [
        { "shot": "crops/high/R04-slot_QB", "note": "Balloon pants/seat on QB #12 and RB #44, wider than the shoulders" },
        { "shot": "crops/high/R06-slot_C", "note": "Inflated orange seats on the linemen; tube arms" },
        { "shot": "crops/high/R06-slot_LG", "note": "Faceted sleeve outline; hem stripe still has a notch under the number" },
        { "shot": "crops/high/R03-slot_QB", "note": "Referee is a capsule mannequin with a blank head and ball fists" },
        { "shot": "crops/high/R01-crowd", "note": "Crowd reads as people up close" },
        { "shot": "high/desktop/R15", "note": "Single bleacher block in a grey void behind the replay" },
        { "shot": "crops/high/R04-turf_26_67_42", "note": "Turf grain and glossy helmets vs matte jerseys are good" }
      ]
    },
    "lighting": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/desktop/R04", "note": "Lamp bloom, dusk sky, multiple soft shadows" },
        { "shot": "high/desktop/R01", "note": "Stands fall to black; no field-to-stand falloff" },
        { "shot": "high/desktop/R18", "note": "Rain turf reads dry at gameplay distance" },
        { "shot": "crops/high/R18-turf_26_67_40", "note": "Single blown-out hotspot, not broad standing water" },
        { "shot": "high/desktop/R07", "note": "Flat grey glare veil over the top-left sky" },
        { "shot": "crops/high/R09-slot_Z", "note": "Several soft player shadows" }
      ]
    },
    "animation": {
      "score": 5.0,
      "confidence": 0.75,
      "evidence": [
        { "shot": "strips/high/R10", "note": "Pile appears between frames 5 and 6; no contact or wrap frames" },
        { "shot": "strips/high/R09", "note": "Camera cut at frame 4; no reach or catch beat; static bodies in frames 6-8" },
        { "shot": "strips/high/R11", "note": "Carrier slides laterally; no plant or lean" },
        { "shot": "strips/high/R13", "note": "Carrier never visibly goes down in 8 frames" },
        { "shot": "crops/high/R09-slot_Z", "note": "Receiver upright with arms low; a defender's leg passes through him" },
        { "shot": "crops/high/R07-slot_QB", "note": "Wind-up with the ball cocked is legible" },
        { "shot": "crops/high/R14-carrier", "note": "Celebration jumps and raised arms read" }
      ]
    },
    "ui": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/desktop/R04", "note": "Good route art with numbered badges; side panel 60% empty" },
        { "shot": "high/desktop/R21", "note": "Clock consistent across scorebug, board and log; result band hierarchy; log touchback-at-20 contradicts the own-30 snap" },
        { "shot": "high/desktop/R17", "note": "Punt result logged while the ball is still in the air" },
        { "shot": "high/desktop/R14", "note": "3D board cut off by the HUD; log return-to-32 vs 20-yd TD" },
        { "shot": "high/desktop/R16", "note": "Clear kick meter" }
      ]
    },
    "typography": {
      "score": 6.5,
      "confidence": 0.65,
      "evidence": [
        { "shot": "high/desktop/R22", "note": "Consistent condensed display plus sans body; tenth card faded and unreadable" },
        { "shot": "high/landscape/R22", "note": "Titles and header wrap to two lines; 2.5 cards visible" },
        { "shot": "high/landscape/R10", "note": "Hint text low contrast" },
        { "shot": "high/mobile/R14", "note": "Board seven-segment clock spaced as '3:5 1'" }
      ]
    },
    "readability": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/desktop/R10", "note": "Carrier ring and name tag, LOS and first-down lines clear" },
        { "shot": "high/desktop/R08", "note": "Ball in flight findable; cyan target disc" },
        { "shot": "high/mobile/R04", "note": "Formation is a thin strip of ~8 CSS px figures; 55% of the view is empty turf" },
        { "shot": "high/mobile/R08", "note": "Ball about 5 CSS px on the phone" },
        { "shot": "crops/high/R08-ball", "note": "Ball not visible in its own close-up" }
      ]
    },
    "mobile": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/mobile/R04", "note": "Big thumb buttons, but tiny pre-snap figures" },
        { "shot": "high/mobile/R12", "note": "Result phase centres the pile above the docked band" },
        { "shot": "high/mobile/R10", "note": "Hint text cut at the bottom; board sliver under the HUD" },
        { "shot": "high/mobile/R14", "note": "3D board clipped at the right edge" },
        { "shot": "high/landscape/R22", "note": "Scorebug ~18% of height; only 2.5 play cards" },
        { "shot": "high/landscape/R04", "note": "Landscape scorebug fits; HIKE and CHANGE PLAY both visible" }
      ]
    },
    "authenticity": {
      "score": 6.0,
      "confidence": 0.65,
      "evidence": [
        { "shot": "high/mobile/R22", "note": "TROJANS / HOT SPRINGS painted end zones" },
        { "shot": "crops/high/R01-board", "note": "HSHS/LHHS seven-segment high-school board" },
        { "shot": "high/desktop/R20", "note": "Jessieville 3A bleachers, mountain and pine backdrop" },
        { "shot": "high/desktop/R01", "note": "No band, no student section, no visible home crowd at kickoff" },
        { "shot": "high/desktop/R17", "note": "Punt shown with a kickoff-style line of 11, not a punt formation" }
      ]
    }
  },
  "gaps": [
    {
      "id": "G-portrait-presnap-scale",
      "category": "mobile",
      "expectedGain": 0.8,
      "severity": 4,
      "effort": "M",
      "workstream": "WS7",
      "evidence": ["high/mobile/R04", "high/mobile/R08", "medium/mobile/R04"],
      "benchmark": "retrobowl-1",
      "fix": "Frame the portrait pre-snap and QB-hold cameras on the formation box (LOS +/- 12 yd) with the LOS at ~60% of screen height. Set FOV so a lineman is at least 22 CSS px tall and the outside receivers sit at ~8% of the width; stop showing the far end zone."
    },
    {
      "id": "G-player-silhouette",
      "category": "art",
      "expectedGain": 0.5,
      "severity": 4,
      "effort": "M",
      "workstream": "WS3",
      "evidence": ["crops/high/R04-slot_QB", "crops/high/R06-slot_C", "crops/high/R06-slot_LG", "crops/high/R16-slot_K"],
      "benchmark": "axis-3",
      "fix": "Cut the pants and seat volume by 25-35%: taper the thighs into the knee and keep the hips inside the shoulder line. Taper the arms (deltoid and forearm) with defined gloves. Add segments to the sleeve outline and remove the hem-stripe notch under the sleeve number."
    },
    {
      "id": "G-venue-void",
      "category": "authenticity",
      "expectedGain": 0.8,
      "severity": 4,
      "effort": "L",
      "workstream": "WS2",
      "evidence": ["high/desktop/R01", "high/desktop/R13", "high/desktop/R15", "high/desktop/R17"],
      "benchmark": "cfb26-1",
      "fix": "Add a lit home grandstand, press box, band block and student section in view of the kickoff, punt and replay cameras. Replace the grey wall behind the replay bleachers with stands, a fence and lit concourse props."
    },
    {
      "id": "G-contact-beats",
      "category": "animation",
      "expectedGain": 0.7,
      "severity": 4,
      "effort": "L",
      "workstream": "WS4b",
      "evidence": ["strips/high/R10", "strips/high/R13", "strips/medium/R10"],
      "benchmark": "madden26-4",
      "fix": "Add a 2-3 frame wrap and contact pose (tackler's arms around the carrier, carrier's torso jolting) before the fall. Punch the camera in and add 0.3 s of slow motion at first contact. Stagger the falls so the pile builds visibly instead of appearing between frames."
    },
    {
      "id": "G-catch-cut-poses",
      "category": "animation",
      "expectedGain": 0.4,
      "severity": 3,
      "effort": "M",
      "workstream": "WS4",
      "evidence": ["crops/high/R09-slot_Z", "crops/high/R11-carrier", "strips/high/R09", "strips/high/R11"],
      "benchmark": "cfb26-4",
      "fix": "IK the receiver's hands to the ball for 0.3 s before the catch, with a head turn. Lean the carrier's torso 15-20 degrees into cuts with a plant foot, keep the ball visible on the outside arm, and add capsule separation to stop interpenetration."
    },
    {
      "id": "G-rain-reads-dry",
      "category": "lighting",
      "expectedGain": 0.4,
      "severity": 3,
      "effort": "M",
      "workstream": "WS5",
      "evidence": ["high/desktop/R18", "crops/high/R18-turf_26_67_40", "crops/medium/R18-turf_26_67_40"],
      "benchmark": "axis-3",
      "fix": "Darken the wet turf colour 20-30% across the whole field. Make low-frequency puddle masks visible from the gameplay camera, and clamp the specular peak so lamp reflections streak and spread instead of blowing out. Add a wet sheen to helmets and jerseys."
    },
    {
      "id": "G-mobile-clipping",
      "category": "mobile",
      "expectedGain": 0.3,
      "severity": 3,
      "effort": "S",
      "workstream": "WS7",
      "evidence": ["high/mobile/R10", "high/mobile/R18", "high/mobile/R14", "high/landscape/R22", "high/landscape/R14"],
      "benchmark": "retrobowl-2",
      "fix": "Add bottom safe-area padding so the hint isn't cut off. Hide the 3D board when less than 60% of it is visible under the HUD. On landscape, cut the scorebug to about 64 px and use compact 2-column play cards so 4-6 show."
    },
    {
      "id": "G-log-coherence",
      "category": "ui",
      "expectedGain": 0.3,
      "severity": 2,
      "effort": "S",
      "workstream": "WS7",
      "evidence": ["high/desktop/R17", "high/desktop/R21", "high/desktop/R14"],
      "benchmark": "madden26-3",
      "fix": "Write kick and punt results to the log only when the ball is dead. Make staged scenarios produce prior log entries that match the current spot (touchback at the 20 must lead to a snap at the 20)."
    },
    {
      "id": "G-stand-falloff-veil",
      "category": "lighting",
      "expectedGain": 0.3,
      "severity": 3,
      "effort": "M",
      "workstream": "WS1",
      "evidence": ["high/desktop/R01", "high/desktop/R02", "high/desktop/R07", "strips/high/R09"],
      "benchmark": "cfb26-3",
      "fix": "Light the stands with field-spill light and distance falloff so the kickoff wide shot shows lit crowds. Clamp the off-screen lamp glare that paints a flat grey veil over the sky."
    },
    {
      "id": "G-officials-mannequin",
      "category": "art",
      "expectedGain": 0.2,
      "severity": 2,
      "effort": "M",
      "workstream": "WS3",
      "evidence": ["crops/high/R03-slot_QB", "high/desktop/R14"],
      "benchmark": "axis-3",
      "fix": "Build the officials on the player base body (non-padded variant) with a cap, a face, a belt, white knickers and black shoes, replacing the capsule mannequin."
    },
    {
      "id": "G-empty-panel-hint",
      "category": "ui",
      "expectedGain": 0.2,
      "severity": 2,
      "effort": "S",
      "workstream": "WS7",
      "evidence": ["high/desktop/R04", "high/desktop/R07", "high/landscape/R10"],
      "benchmark": "axis-1",
      "fix": "Fill the empty side panel with personnel and formation, the defensive look and the hot-receiver read. Raise the steer-hint contrast to at least 7:1."
    }
  ],
  "verdict": "continue"
}
```
