# Critic A (critic-claude): loop 12, High tier

## Verdict
Friday Night Spa City now looks like a coherent, stylised night game. The presentation layer is close to broadcast grade: a two-bar scorebug, shape-coded receiver badges with tethers, route art, a carrier ring and name tag, and result toasts with clear hierarchy. The turf, glossy helmets, multi-shadow lighting and the local naming all hold up. What still falls short of the 7 anchors sits in the 3D content and the phone framing. The officials are faceless mannequins and player hands are claws. Behind the end zones there is only a dark slab, and the treeline is grey cones. The animation strips show legible but small beats, with no slow-motion or punch-in at the catch or tackle. On the phone, three of five receivers are off-screen pre-snap in portrait, and in landscape the result toast covers the tackle pile. None of the 7-gated categories except UI and typography reaches 7, so the loop should continue.

## Scores

### Art: 6.0
- `crops/high/R03-slot_QB`: the referee in the foreground is a black, featureless mannequin. He has no face, mitten-ball hands, and striped sleeve panels that float off the torso. The far officials in `crops/high/R04-slot_C`, `crops/high/R12-carrier` and `crops/high/R13-carrier` are the same black silhouettes, so the problem shows in every close-up.
- Players hold up at mid-distance. Helmets read as glossy, with specular highlights and facemasks, against matte jerseys with sleeve stripes and numbers (`crops/high/R10-carrier`, `crops/high/R14-carrier`). Close up they break down:
  - claw or mitten hands with no glove detail (`crops/high/R06-slot_C-side`, `crops/high/R06-slot_DL2-side`);
  - rubber-tube arms, which read as bare white skin on the Lakeside road whites (`crops/high/R06-slot_LG`);
  - no jersey folds, and identical body types.
- The crowd now reads as people: individual figures with raised arms and varied orange, white and black shirts (`crops/high/R01-crowd`). Up close they are blocky.
- The venue is thin away from the home stands:
  - the backdrop behind the end zone is a flat dark slab with nothing on it (`high/desktop/R14`, `high/desktop/R16`);
  - the treeline in the replay is grey flat-shaded cones (`high/desktop/R15`);
  - the berm around the punt view is empty (`high/desktop/R17`).
- The turf is good at field level, with grain and noise (`crops/high/R04-turf_26_67_42`).
- Against axis-3 (about 7, a dressed stadium with sponsor boards and detailed players) this sits a step below. Against legendbowl-1 (a style-consistent 7) it lacks the same consistency, because the mannequin officials break the style.

### Lighting & atmosphere: 6.5
What works:
- Several soft shadows fan out under each player from the towers (`high/desktop/R02`, `high/desktop/R17`, `crops/high/R04-turf_26_67_42`).
- The lamps bloom (`high/desktop/R01`, `high/desktop/R21`).
- The light pools toward each tower are visible, with darker gaps between them (`high/desktop/R17`, `high/desktop/R01`).
- Helmets show specular highlights (`crops/high/R14-carrier`, `crops/high/R11-carrier`).
- Rain has streaks, splash dots and one strong specular hotspot on the turf (`crops/high/R18-turf_26_67_40`).
- Day mist gives real depth haze (`high/desktop/R19`).

What falls short:
- The full rain frame `high/desktop/R18` reads as dry turf. The wet sheen only shows in the close-up.
- The stands and the area behind the end zones go to near-black flat planes with no falloff gradient (`high/desktop/R14`, `high/desktop/R13`).
- There is no volumetric light from the towers.

Compared with cfb26-3, the ring lighting and the crowd glow are missing. This is better than the 5 anchor but not yet the 7 benchmark look of axis-3 or cfb26-3.

### Animation & game feel: 6.0
- **Catch (`strips/high/R09`).** The receiver turns and reaches (frames 4–5). After the catch, frames 6–8 hold both arms straight overhead, which reads as celebrating, not securing and tucking the ball.
- **Tackle (`strips/high/R13`).** A legible wrap and lean appears over frames 3–8, but it is small in frame and the fall to the ground resolves outside the strip.
- **Dive (`strips/high/R10`).** The line engages, then the carrier disappears into the pile with no readable fall, and the strip cuts straight to the result camera.
- **Sweep (`strips/high/R11`).** Cut and lean are hard to read at this framing, though the runner's stride is good in `crops/high/R11-carrier`.
- **Throw.** The QB wind-up is legible in `crops/high/R07-slot_QB`, with the ball cocked by the ear, but it is tiny in `strips/high/R07`.
- **Results.** Falls exist (`crops/high/R12-carrier`, with the carrier down and the tackler on top). Celebrations vary arm poses (`crops/high/R14-carrier`).
- **Under-center pose.** The QB stands upright half a step behind the center instead of crouching with his hands at the snap (`crops/high/R06-slot_C`, `crops/high/R04-slot_QB`).
- **Feel touches.** The ball has a trail (`crops/high/R08-ball`) and replays carry a tag. The strips show no slow-motion, no camera punch-in at contact, and no turf or impact particles.

These are procedural cycles that read, with legible beats. That is between the 5 and 7 anchors.

### UI / HUD: 7.0
- The scorebug is broadcast-grade: team bars with logos, possession football, timeout pips, and a centre clock with down and distance (`high/desktop/R04`, `high/desktop/R21`).
- Pre-snap identification is clear:
  - receivers carry shape badges (diamond, circle, triangle, square, star) with short tethers to the helmet;
  - dashed route art and an on-field 1ST & 10 graphic sit on the field;
  - the side panel shows the play diagram (`high/desktop/R04`, `high/desktop/R19`).
- The badges now sit just above the helmets instead of on the players behind.
- The result toast has hierarchy, with a large yardage or result line over a smaller runner line (`high/desktop/R21`, `high/desktop/R12`).
- The play-call list is tidy: number, mini diagram, name, one-line description, RUN/PASS tag (`high/desktop/R22`).
- Small blemishes:
  - The field-goal meter panel clips the top-left corner of the scoreboard, and its text repeats the side panel word for word (`high/desktop/R16`, `medium/desktop/R16`).
  - On `high/desktop/R04` the route 3 and route 2 arrows overlap near the right hash.

This matches axis-1 and madden26-1 in function, but not yet in motion or context-aware polish.

### Typography: 7.0
- One condensed display face (Oswald-like) is used for team names, scores, clock, play names and the toast headline. Body text is a humanist sans for descriptions and the log (`high/desktop/R22`, `high/desktop/R04`).
- The scale is clear: about 30 px score numerals, 20 px headline in the toast, 13 px log text (`high/desktop/R21`).
- The toast tracking is deliberate, and nothing is clipped.
- Numerals read at a glance on both the scorebug and the in-world scoreboard (`crops/high/R01-board`).
- The weakest point is the tiny HOME tag (about 8 px cap height) beside the team name on `high/desktop/R01`.

This is at the level of madden26-3 and legendbowl-4.

### Readability: 6.5
Desktop is good:
- The ball in flight has a trail and a ground shadow (`high/desktop/R08`).
- The target has a blue ring and badge (`high/desktop/R09`).
- The carrier has a ring and name tag (`high/desktop/R10`, `high/desktop/R11`).
- The line of scrimmage is blue and the line to gain is yellow throughout.
- Desktop player height at the pre-snap camera is only about 30–35 px (`high/desktop/R04`, `high/desktop/R05`). That is readable but small next to madden26-1.

The phone is weaker:
- In portrait pre-snap (`high/mobile/R04`, `medium/mobile/R04`), three of five eligible receivers are off-screen. Badge 1 sits on the painted "10" at the left edge. Badges 2 and 3 are clamped and stacked at the right edge, with their routes cut off.
- In landscape, the result toast covers the pile and the downed carrier; only helmets show above it (`high/landscape/R12`, `medium/landscape/R12`).
- In landscape live play, the carrier sits on the bottom edge with his ring cropped and no visible name tag (`high/landscape/R10`).

Against axis-1, legendbowl-2 and retrobowl-1, it does not yet read "at a glance in every frame, on both viewports".

### Mobile: 6.5
Medium is the phone tier, and I scored it from the Medium captures plus High for framing.

Strengths:
- The portrait HUD is clean, with two compact team bars and a down and distance line (`medium/mobile/R10`).
- Thumb targets are large: a full-width JUKE button, and HIKE and CHANGE PLAY at about 130 px tall in device pixels (`medium/mobile/R04`).
- The 2×3 card grid on the play-call screen is very good (`high/mobile/R22`).
- The post-play portrait framing now holds the spot and the huddle above the result band (`medium/mobile/R12`, `high/mobile/R21`).
- The landscape 200 px panel still fits JUKE (`high/landscape/R10`).

Weaknesses:
- Figures are small. A lineman is about 25 CSS px tall in `medium/mobile/R04`, and the carrier about 45 CSS px in `medium/mobile/R10`. The top 40 % of the portrait live frame is empty field.
- The portrait pre-snap frame loses three receivers (`medium/mobile/R04`).
- The landscape result toast hides the pile (`medium/landscape/R12`).
- The 4× throttle phone proxy holds a 37 fps minimum, but the worst p95 frame is 132 ms, which means visible hitches.

It is not yet "readable, thumb-friendly figures and both framings intentional" at the level of retrobowl-1 or retrobowl-2.

### Authenticity: 6.5
What is right:
- Real Garland County opponents (Lake Hamilton, Lakeside, Jessieville) and local play names (Bathhouse Dive, Central Avenue Sweep, Tufa Screen) (`high/desktop/R22`, `high/desktop/R20`).
- A high-school scoreboard with HSHS/LHHS and DOWN / TO GO / BALL ON (`crops/high/R01-board`).
- NFHS-width hashes: they sit at about one third of the field width in `high/desktop/R02`.
- A tan track, benches with teams on both sidelines, Ouachita ridgelines (`high/desktop/R01`).
- A field house at Wolf Stadium (`high/desktop/R03`) and a 3A purple Jessieville variant (`high/desktop/R20`).

What is missing:
- No band and no distinct student section (`crops/high/R01-crowd` is one uniform mixed block).
- The visitor side is a short dark bleacher box (`high/desktop/R13`, `high/desktop/R15`).
- The end-zone surrounds are bare: no fence, no fans, no field house (`high/desktop/R14`).

This clears the gate. Against cfb26-1/2 and legendbowl-4 it lacks the small-town staging.

## Ranked gaps
1. **G-portrait-presnap-receivers-offscreen** (readability, WS7, sev 4, effort M, gain +0.5).
   - **Problem.** In `high/mobile/R04` and `medium/mobile/R04`, three of five receivers are off-screen, and badges 2 and 3 stack at the right edge.
   - **Fix.** Fit the portrait pre-snap camera to the bounds of all eligible receivers plus a 2-yard margin, raising or pulling back as needed, so every badge sits on its receiver.
2. **G-landscape-toast-hides-pile** (mobile, WS7, sev 4, effort S, gain +0.4).
   - **Problem.** `high/landscape/R12` and `medium/landscape/R12` show the toast covering the downed carrier.
   - **Fix.** Aim the landscape result camera so the spot sits at about 40 % from the top, or move the toast into the result panel, which already widens at the result.
3. **G-catch-tackle-feel** (animation, WS4, sev 4, effort M, gain +0.5).
   - **Problem.** `strips/high/R09` ends with arms overhead and no tuck. `strips/high/R13` and `strips/high/R10` show no punch-in or slow-motion.
   - **Fix.** Blend the catch into a tuck. Add a 0.3 s slow-motion and a camera punch-in on catch and contact, and a turf-spray particle burst at the tackle.
4. **G-officials-mannequins** (art, WS3, sev 3, effort M, gain +0.3).
   - **Problem.** `crops/high/R03-slot_QB` and `crops/high/R12-carrier` show faceless black officials with floating sleeve panels.
   - **Fix.** Give officials skin-toned heads with features, a white cap, attached striped sleeves, black trousers with a belt, and hands with fingers.
5. **G-player-hands-cloth** (art, WS3, sev 3, effort L, gain +0.4).
   - **Problem.** `crops/high/R06-slot_C-side` and `crops/high/R06-slot_DL2-side` show claw hands, tube arms and no folds.
   - **Fix.** Add glove meshes with grouped fingers, arm sleeves and elbow pads, a jersey normal map with folds and seams, and two or three body-type variants for linemen and skill players.
6. **G-venue-surrounds-empty** (authenticity, WS2, sev 3, effort M, gain +0.4).
   - **Problem.** `high/desktop/R14`, `high/desktop/R16` and `high/desktop/R17` show bare dark slabs behind the end zones. `high/desktop/R15` shows cone trees.
   - **Fix.** Add an end-zone chain-link fence with fans, a concession or field house, and a lit visitor bleacher. Replace the cones with card-foliage trees.
7. **G-band-student-section** (authenticity, WS2, sev 2, effort M, gain +0.3).
   - **Problem.** `crops/high/R01-crowd` is one uniform block.
   - **Fix.** Add a uniformed band block with instruments at one end of the home stands, and a themed student section (white-out or orange-out) in the front rows near the 50.
8. **G-wet-turf-full-frame** (lighting, WS5, sev 2, effort S, gain +0.3).
   - **Problem.** `high/desktop/R18` reads as dry, while the close-up `crops/high/R18-turf_26_67_40` shows sheen.
   - **Fix.** Lower turf roughness field-wide in rain and add streaked tower reflections toward the camera, so the gameplay camera sees the wet surface.
9. **G-landscape-live-carrier-edge** (mobile, WS7, sev 3, effort S, gain +0.2).
   - **Problem.** In `high/landscape/R10` the carrier's ring is cropped at the bottom edge and there is no tag.
   - **Fix.** Aim the landscape live camera so the carrier sits at about 60 % of the frame height.
10. **G-phone-frame-spikes** (mobile, WS1, sev 3, effort M, gain +0.2).
    - **Problem.** The Medium 4× throttle run has a p95 of 132 ms.
    - **Fix.** On the phone tier, cut the shadow-map resolution and the number of casters, lower crowd LOD and instance it, and cap the bloom passes.
11. **G-qb-under-center** (animation, WS4, sev 2, effort S, gain +0.1).
    - **Problem.** `crops/high/R06-slot_C` shows the QB upright behind the center.
    - **Fix.** Use a crouched under-center pose with the hands at the center's seat.
12. **G-fg-meter-overlap** (ui, WS7, sev 1, effort S, gain +0.1).
    - **Problem.** In `high/desktop/R16` the meter panel clips the scoreboard and its text repeats the side panel.
    - **Fix.** Shift or narrow the meter, and remove the duplicate side-panel copy.

```json
{
  "loop": 12,
  "role": "critic-claude",
  "tier": "high",
  "scores": {
    "art": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "crops/high/R03-slot_QB", "note": "Referee is a faceless black mannequin with floating striped sleeve panels"},
        {"shot": "crops/high/R06-slot_C-side", "note": "Claw hands, tube arms, no jersey folds"},
        {"shot": "crops/high/R14-carrier", "note": "Glossy helmets with facemasks against matte jerseys; holds up at mid range"},
        {"shot": "crops/high/R01-crowd", "note": "Crowd reads as people, blocky up close"},
        {"shot": "high/desktop/R15", "note": "Grey cone treeline"},
        {"shot": "high/desktop/R14", "note": "Flat dark slab behind the end zone"},
        {"shot": "crops/high/R04-turf_26_67_42", "note": "Turf grain holds up at field level"}
      ]
    },
    "lighting": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R02", "note": "Several soft shadows per player from the towers"},
        {"shot": "high/desktop/R17", "note": "Tighter light pools with darker gaps"},
        {"shot": "high/desktop/R01", "note": "Lamp bloom, believable night exposure"},
        {"shot": "crops/high/R18-turf_26_67_40", "note": "Wet specular hotspot and splashes"},
        {"shot": "high/desktop/R18", "note": "Full rain frame still reads as dry turf"},
        {"shot": "high/desktop/R14", "note": "No falloff past the field: flat black surrounds"},
        {"shot": "high/desktop/R19", "note": "Good day mist depth haze"}
      ]
    },
    "animation": {
      "score": 6.0,
      "confidence": 0.65,
      "evidence": [
        {"shot": "strips/high/R09", "note": "Reach is legible; ends with arms overhead and no tuck"},
        {"shot": "strips/high/R13", "note": "Wrap and lean are legible but small; the fall resolves off-strip"},
        {"shot": "strips/high/R10", "note": "Carrier vanishes into the pile, no readable fall"},
        {"shot": "strips/high/R11", "note": "Cut and lean hard to read at this framing"},
        {"shot": "crops/high/R07-slot_QB", "note": "Legible wind-up with the ball cocked"},
        {"shot": "crops/high/R12-carrier", "note": "Carrier down with the tackler on top"},
        {"shot": "crops/high/R06-slot_C", "note": "QB upright, not under center"}
      ]
    },
    "ui": {
      "score": 7.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R04", "note": "Shape badges with tethers, route art, on-field 1ST & 10, panel diagram"},
        {"shot": "high/desktop/R21", "note": "Toast with hierarchy, clean scorebug"},
        {"shot": "high/desktop/R22", "note": "Tidy play-call cards"},
        {"shot": "high/desktop/R16", "note": "FG meter clips the scoreboard corner; text duplicated in the panel"}
      ]
    },
    "typography": {
      "score": 7.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R22", "note": "Condensed display plus sans body on a consistent scale"},
        {"shot": "high/desktop/R21", "note": "Large numerals, deliberate tracking in the toast"},
        {"shot": "crops/high/R01-board", "note": "In-world scoreboard numerals legible"},
        {"shot": "high/desktop/R01", "note": "Tiny HOME tag is the weakest size"}
      ]
    },
    "readability": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R08", "note": "Ball trail and shadow, target ring and badge"},
        {"shot": "high/desktop/R10", "note": "Carrier ring and name tag, LOS and line to gain"},
        {"shot": "high/mobile/R04", "note": "3 of 5 receivers off-screen in portrait pre-snap"},
        {"shot": "high/landscape/R12", "note": "Result toast hides the pile and downed carrier"},
        {"shot": "high/landscape/R10", "note": "Carrier on the bottom edge, ring cropped, no tag"}
      ]
    },
    "mobile": {
      "score": 6.5,
      "confidence": 0.65,
      "evidence": [
        {"shot": "medium/mobile/R04", "note": "Big thumb buttons, but receivers off-screen and linemen about 25 CSS px tall"},
        {"shot": "medium/mobile/R12", "note": "Good portrait post-play framing above the result band"},
        {"shot": "high/mobile/R22", "note": "Strong 2x3 play-call grid"},
        {"shot": "medium/landscape/R12", "note": "Toast covers the pile"},
        {"shot": "medium/mobile/R10", "note": "Top 40 percent of the live frame is empty field; small figures"}
      ]
    },
    "authenticity": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "crops/high/R01-board", "note": "HS scoreboard with DOWN / TO GO / BALL ON"},
        {"shot": "high/desktop/R02", "note": "NFHS-width hashes, track, benches"},
        {"shot": "high/desktop/R20", "note": "3A Jessieville venue variant with local opponents"},
        {"shot": "crops/high/R01-crowd", "note": "No band and no distinct student section"},
        {"shot": "high/desktop/R14", "note": "Bare end-zone surrounds"}
      ]
    }
  },
  "gaps": [
    {"id": "G-portrait-presnap-receivers-offscreen", "category": "readability", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS7", "evidence": ["high/mobile/R04", "medium/mobile/R04"], "benchmark": "retrobowl-1", "fix": "Fit the portrait pre-snap camera to the bounds of all eligible receivers plus a 2 yd margin (raise or pull back) so every badge sits on its receiver."},
    {"id": "G-landscape-toast-hides-pile", "category": "mobile", "expectedGain": 0.4, "severity": 4, "effort": "S", "workstream": "WS7", "evidence": ["high/landscape/R12", "medium/landscape/R12"], "benchmark": "retrobowl-2", "fix": "Aim the landscape result camera so the spot sits about 40 percent from the top, or move the toast into the widened result panel."},
    {"id": "G-catch-tackle-feel", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS4", "evidence": ["strips/high/R09", "strips/high/R13", "strips/high/R10"], "benchmark": "madden26-4", "fix": "Blend the catch into a tuck; add a 0.3 s slow-motion and camera punch-in on catch and contact, plus a turf-spray particle burst at the tackle."},
    {"id": "G-officials-mannequins", "category": "art", "expectedGain": 0.3, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["crops/high/R03-slot_QB", "crops/high/R12-carrier"], "benchmark": "axis-3", "fix": "Officials get skin-toned heads with features, a white cap, attached striped sleeves, black trousers with a belt, and fingered hands."},
    {"id": "G-player-hands-cloth", "category": "art", "expectedGain": 0.4, "severity": 3, "effort": "L", "workstream": "WS3", "evidence": ["crops/high/R06-slot_C-side", "crops/high/R06-slot_DL2-side", "crops/high/R06-slot_LG"], "benchmark": "axis-3", "fix": "Glove meshes with grouped fingers, arm sleeves and elbow pads, a jersey normal map with folds and seams, and 2-3 body-type variants for linemen versus skill players."},
    {"id": "G-venue-surrounds-empty", "category": "authenticity", "expectedGain": 0.4, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["high/desktop/R14", "high/desktop/R16", "high/desktop/R15", "high/desktop/R17"], "benchmark": "cfb26-2", "fix": "Add an end-zone chain-link fence with fans, a concession or field house, and a lit visitor bleacher; replace the cone trees with card-foliage trees."},
    {"id": "G-band-student-section", "category": "authenticity", "expectedGain": 0.3, "severity": 2, "effort": "M", "workstream": "WS2", "evidence": ["crops/high/R01-crowd", "high/desktop/R01"], "benchmark": "cfb26-1", "fix": "Add a uniformed band block with instruments at one end of the home stands and a themed student section in the front rows near the 50."},
    {"id": "G-wet-turf-full-frame", "category": "lighting", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS5", "evidence": ["high/desktop/R18", "crops/high/R18-turf_26_67_40"], "benchmark": "cfb26-3", "fix": "Lower turf roughness field-wide in rain and add streaked tower reflections toward the camera so the gameplay camera reads the wet surface."},
    {"id": "G-landscape-live-carrier-edge", "category": "mobile", "expectedGain": 0.2, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/landscape/R10"], "benchmark": "retrobowl-2", "fix": "Aim the landscape live camera so the carrier sits at about 60 percent of the frame height, keeping the ring and name tag in view."},
    {"id": "G-phone-frame-spikes", "category": "mobile", "expectedGain": 0.2, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["medium/mobile/R10", "medium/mobile/R12"], "fix": "On the phone tier, cut shadow-map resolution and caster count, lower and instance crowd LOD, and cap bloom passes to bring the 4x throttle p95 (132 ms) down."},
    {"id": "G-qb-under-center", "category": "animation", "expectedGain": 0.1, "severity": 2, "effort": "S", "workstream": "WS4", "evidence": ["crops/high/R06-slot_C", "crops/high/R04-slot_QB"], "fix": "Use a crouched under-center QB pose with the hands at the center's seat."},
    {"id": "G-fg-meter-overlap", "category": "ui", "expectedGain": 0.1, "severity": 1, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R16", "medium/desktop/R16"], "benchmark": "retrobowl-3", "fix": "Shift or narrow the FG meter so it clears the scoreboard, and drop the duplicate side-panel copy."}
  ],
  "verdict": "continue"
}
```
