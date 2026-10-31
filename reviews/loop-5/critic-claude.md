# Critic A review: Friday Night Spa City, loop 5 (High tier, desktop)

## Verdict
The new Medium/High player model is a real improvement. Helmets are glossy with real facemask cages and mascot decals, and each school's kit carries numbers, stripes and contrasting undersleeves. At gameplay distance the field now resembles axis-3. Close-ups still undo much of that gain. Every player has the same balloon-shaped pants silhouette. Sleeve hems are torn into sawteeth, gloves look like rakes, facemasks float off the helmet, and the officials are still featureless capsules with detached sleeves. Motion is weaker than the art. The catch has no reach, a runner snaps from upright to prone between two strip frames, the ball hovers above the tackle pile, and carriers float with upright torsos. On the phone, the new framing still spends about a third of the portrait screen on dark stadium. Result and touchdown bands land on top of the play they report in portrait (R12, R21) and landscape (R12, R14). The HUD and type are the strongest areas and are close to the gate, but no category is at 7 yet. **Verdict: continue.**

## Scores

### Art: 5.5
- **Improvements.** Glossy helmets contrast clearly with matte jerseys, and facemask cages, decals, chest, back and sleeve numbers, and sock and pant stripes all read in `crops/high/R03-slot_QB`, `crops/high/R04-slot_C` and `crops/high/R13-carrier`. Kits differ by school (Lakeside blue/orange, Hot Springs black/orange, visitors in white).
- **Pants silhouette.** Every player has huge rounded glutes and thighs, so stances look like squats rather than athletic. See `crops/high/R04-slot_QB` (#12 and #44), `crops/high/R06-slot_C` (#10 and #56) and `crops/high/R16-slot_K` (#7 and #12). Nothing like it appears in axis-3 or legendbowl-1.
- **Broken geometry.** In `crops/high/R06-slot_LG` the sleeve hem and stripe on #20 are torn into jagged spikes. In `crops/high/R06-slot_C-side` the same sawtooth hem shows on #65, the glove fingers are long splayed tines, and #65's orange facemask bars hang off the helmet shell. Black claw hands also appear in `crops/high/R12-carrier` and `crops/high/R14-carrier`.
- **Officials.** The officials still use the old model: a black capsule body, a featureless black head under a white cap, and striped sleeve tubes floating clear of the shoulders (`crops/high/R03-slot_QB`, foreground). They are on screen in nearly every frame.
- **Bodies.** Every player has the same body type and the same uniform dark skin, with no faces visible.
- **Crowd.** The crowd reads as people, with raised arms and coloured shirts, but the figures are low-poly blocks (`crops/high/R01-crowd`).
- **Venue.** The stands are black boxes and the trees are flat cones (`high/desktop/R13`, `high/desktop/R15`). The establishing frame `high/desktop/R01` shows an empty dark bowl.
- **Benchmark.** The field reads at about axis-3's level at gameplay distance. The close-ups do not hold up the way the rubric's 7 requires.

### Lighting & atmosphere: 6.0
- **Night grade.** The night grade is believable: a sunset-to-indigo sky over the Ouachita ridgeline, bloom on the light banks, and per-player shadows (`high/desktop/R03`, `high/desktop/R04`, `high/desktop/R22`).
- **Day and mist.** The day-and-mist frame `high/desktop/R19` is coherent.
- **Rain.** The gameplay frame `high/desktop/R18` shows rain streaks over turf that looks dry, with no visible sheen. The close-up `crops/high/R18-turf_26_67_40` has some glint, but the splash particles are hard-edged white squares.
- **Light falloff.** There is little falloff from field to stands. The bowl wall and end-zone backdrop are a flat grey-black plane (`high/desktop/R04`, `high/desktop/R16`).
- **Haze.** Corner haze washes out the top of the frame in `strips/high/R07`.
- **Sideline replay artifact.** A dark vertical smudge rises from the bottom centre of the sideline replays (`high/desktop/R13`, `high/desktop/R15`, frames 2–8 of `strips/high/R13`).
- **Benchmark.** Against cfb26-3 and axis-3: there are no specular highlights on helmets at gameplay scale and no believable rain surface.

### Animation & game feel: 5.0
- **Catch (`strips/high/R09`).** Frames 1–3 are the ball in the air. Frame 4 is a camera cut, the only punch-in in the set. No reaching pose is visible at the catch. Between frames 5 and 6 the receiver goes from running upright to lying flat, and frames 6–8 are frozen. In `crops/high/R09-slot_Z` the receiver's arms hang at his sides with no ball in hand.
- **Ball carriers.** Carriers are airborne with both feet off the turf and an upright torso, with no lean into a cut (`crops/high/R10-carrier`, `crops/high/R11-carrier`). `strips/high/R11` shows no readable plant-and-cut upfield.
- **Tackle.** In `crops/high/R12-carrier` the ball floats above the pile, separate from the carrier, and the two bodies pass through each other. `strips/high/R13` shows the carrier and tackler wrapped up and still standing, with no visible drive or fall.
- **Celebration.** `crops/high/R14-carrier` uses generic raised-arm poses, and one player hangs in the air.
- **Positives.** The QB wind-up is legible (`crops/high/R07-slot_QB`). Line stances read as three-point, with the center's hand on the ball (`crops/high/R06-slot_DL2-side`, `crops/high/R04-slot_C`).
- **Strip scale.** All five strips are at gameplay distance, so footplant quality cannot be confirmed from them.

### UI / HUD: 6.5
- **Strengths.** The scorebug has team bars with logos, a possession football, timeout dots, the clock and down-and-distance. Pre-snap shows numbered, shape-coded receiver icons with dashed route art, and there is an on-field "1ST & 10" (`high/desktop/R04`). The carrier tag "44 DELACROIX" (`high/desktop/R10`), the two-line result band (`high/desktop/R12`, `high/desktop/R21`) and the field-goal meter (`high/desktop/R16`) are all clean. This compares well with axis-1.
- **Bands covering play.** The result band sits on the tackle in `high/landscape/R12` and `high/mobile/R12`. The touchdown banner hides the whole celebration in `high/landscape/R14`.
- **Clipping.** The Hot Springs timeout dots are cut off in `high/landscape/R04`. The play list is cut at its last row in `high/desktop/R03` and `high/desktop/R22`.
- **Empty panel.** The side panel is mostly empty at kickoff, punt and field goal (`high/desktop/R01`, `high/desktop/R17`, `high/desktop/R16`).
- **No defensive ID.** There are no defender ID boxes like madden26-1's.

### Typography: 6.5
- **Strengths.** A condensed display face is paired consistently with a sans body face, the scale is clear and the numerals are strong (`high/desktop/R14`, `high/mobile/R22`, `high/landscape/R21`). The stadium board's lamp-style seven-segment digits with faint unlit segments are a nice authentic touch (`crops/high/R01-board`).
- **Small, low-contrast text.** The result-band subtitle is small next to its headline (`high/desktop/R12`, "E. KEMP RUN"). Grey panel body text is low-contrast on the navy panel (`high/desktop/R01`, "Lake Hamilton kicking").
- **Clipping.** Clipping at container edges remains (`high/desktop/R03`, `high/landscape/R04`).
- **Board clock.** The board clock reads "3:5 1" because of uneven digit spacing (`high/desktop/R14`).
- **Benchmark.** Close to legendbowl-4 and madden26-3, but not yet "nothing clipped".

### Readability: 5.5
- **Desktop.** Players are about 25 px tall in the 920 px field view. The ball in flight is a dark-brown blob crossing black jerseys (`high/desktop/R08`, `crops/high/R08-ball`). The carrier ring and tag do their job (`high/desktop/R10`, `high/desktop/R11`). The line of scrimmage (blue) and the first-down line (yellow) are clear.
- **Phone.** Figures are about 10 CSS px tall (`high/mobile/R04`), and the result band hides the play it reports (`high/mobile/R12`, `high/mobile/R21`).
- **Benchmark.** Behind retrobowl-1 and legendbowl-2, which read at a glance.

### Mobile: 5.5
- **Portrait.** Pre-snap fits the formation's width and puts the line of scrimmage at about 75% down the field view. The top ~35% of the field view, though, is dark stadium wall, the scoreboard and the far end zone, and receiver icons 1 and 2 are clipped at the screen edges (`high/mobile/R04`).
- **Bands over the play.** The tackle sits under the band in `high/mobile/R12`, and the whole offense is hidden by the band in `high/mobile/R21`.
- **Landscape.** HIKE fits on screen, but the side panel takes about 43% of the width, so players are tiny (`high/landscape/R08`). The touchdown banner covers the celebration (`high/landscape/R14`) and the scorebug clips (`high/landscape/R04`).
- **Positives.** HIKE, JUKE and CONTINUE are large thumb targets. The perf table shows Medium (the phone tier) at 89 min fps on the 4× throttle proxy, which passes. High on the throttled phone is 44 min fps with a 34.4 ms p95.
- **Benchmark.** Behind retrobowl-1 and retrobowl-2.

### Authenticity: 6.0
- **Strengths.** Real Garland County schools, school-specific end zones and midfield logos, small home bleachers, an H-post goalpost, the pine-and-ridge setting and a lamp-digit high-school scoreboard (`high/desktop/R20`, `high/desktop/R03`, `crops/high/R01-board`) give it a real Friday-night feel.
- **Missing staging.** There is no band, cheer squad or student section. The sideline is a row of identical standing players (`high/desktop/R13`, `high/desktop/R15`).
- **Establishing shot.** `high/desktop/R01` shows an empty, dark, oversized bowl rather than a 5A town stadium.
- **Benchmark.** Behind cfb26-1/2 for pageantry and legendbowl-4 for presentation.

## Ranked gaps
1. **G-catch-tackle-beats** (animation, WS4/WS4b). Severity 5, effort L, expected gain +0.75. Evidence: `strips/high/R09`, `crops/high/R09-slot_Z`, `crops/high/R12-carrier`, `strips/high/R13`.
   - Add a catch reach keyed 6–8 ticks before the ball arrives, with hands to the ball.
   - Blend 3–4 frames of stumble and fall instead of snapping to prone.
   - Keep the ball attached to the carrier's hand bone through the tackle and the fall.
   - Add body-separation offsets in piles.
   - Show a visible drive-and-fall on sideline-replay contact.
2. **G-pants-silhouette** (art, WS3). Severity 4, effort M, expected gain +0.6. Evidence: `crops/high/R04-slot_QB`, `crops/high/R06-slot_C`, `crops/high/R16-slot_K`.
   - Cut the hip and glute volume by about 30% and taper into the thigh.
   - Add thigh and knee pad planes.
   - Check the deep-stance skin weights so the seat does not balloon.
   - Add 2–3 body-type scales (OL, skill, QB).
3. **G-mesh-tears-gloves-facemask** (art, WS3). Severity 4, effort S, expected gain +0.4. Evidence: `crops/high/R06-slot_LG`, `crops/high/R06-slot_C-side`, `crops/high/R12-carrier`.
   - Close or merge the sleeve-hem and stripe geometry that renders as sawteeth.
   - Shorten the finger bones and curl gloves into a relaxed fist.
   - Seat the facemask on the helmet shell with side clips.
4. **G-run-lean-contact** (animation, WS4). Severity 4, effort M, expected gain +0.4. Evidence: `crops/high/R10-carrier`, `crops/high/R11-carrier`, `strips/high/R11`.
   - Lean the torso forward in proportion to speed and sideways on cuts.
   - Add a plant frame on direction changes.
   - Add foot-plant IK so at least one foot touches the turf for most of the cycle.
5. **G-bands-cover-action** (mobile, WS7). Severity 4, effort S, expected gain +0.5 (also helps readability). Evidence: `high/mobile/R12`, `high/mobile/R21`, `high/landscape/R12`, `high/landscape/R14`.
   - On phone, dock result and touchdown bands at the top of the field view, or frame the camera so the pile sits above the band.
   - In landscape, make the touchdown banner half its current height.
6. **G-phone-portrait-deadspace** (mobile, WS7). Severity 3, effort S, expected gain +0.4. Evidence: `high/mobile/R04`, `high/mobile/R08`.
   - Pitch the camera down and crop the far field so stadium, sky and scoreboard take at most 15% of the field view.
   - Keep receiver icons inside a safe area.
   - Scale players up about 1.3× on phone.
7. **G-officials-model** (art, WS3). Severity 3, effort M, expected gain +0.3. Evidence: `crops/high/R03-slot_QB`, `crops/high/R04-slot_C`.
   - Move officials onto the new body: a striped shirt with attached sleeves, a white cap and a face.
8. **G-rain-surface** (lighting, WS5). Severity 3, effort S, expected gain +0.3. Evidence: `high/desktop/R18`, `crops/high/R18-turf_26_67_40`.
   - Darken the turf albedo and lower its roughness in rain.
   - Add lamp-reflection streaks on the turf.
   - Replace the square splash quads with round, soft sprites.
9. **G-ball-visibility** (readability, WS7). Severity 3, effort S, expected gain +0.3. Evidence: `high/desktop/R08`, `crops/high/R08-ball`.
   - Lighten the ball's leather tone.
   - Add white stripes and a faint trail in flight.
10. **G-venue-pageantry** (authenticity, WS2). Severity 3, effort L, expected gain +0.5. Evidence: `high/desktop/R01`, `high/desktop/R13`, `high/desktop/R20`.
    - Add a student section block in school colours and a band block in the home stands.
    - Put cheerleaders on the sideline and vary the sideline players' poses.
    - Dress the bowl in R01 with a press box, fence and lit stands.
11. **G-replay-dark-smudge** (lighting, WS1). Severity 2, effort S, expected gain +0.2. Evidence: `high/desktop/R13`, `high/desktop/R15`, `strips/high/R13`.
    - Exclude the near-camera pole or occluder from the replay camera, or move the camera.
12. **G-landscape-scorebug-clip** (ui, WS7). Severity 2, effort S, expected gain +0.2. Evidence: `high/landscape/R04`, `high/desktop/R03`.
    - Drop the HOME tag or shrink team names under 900 px so the timeout dots fit.
    - Add a scroll fade to the play list instead of a hard cut.

**Low and Medium regression check.** Medium matches High at every point checked (`medium/desktop/R04`, `crops/medium/R04-slot_QB`, `crops/medium/R06-slot_C-side`, `medium/landscape/R12`, `strips/medium/R09`), including the same hem tears and pants silhouette. Low keeps the v2 box look with blob shadows and shows no new breakage (`low/desktop/R04`, `low/desktop/R14`, `low/desktop/R18`, `crops/low/R06-slot_C-side`, `crops/low/R12-carrier`).

```json
{
  "loop": 5,
  "role": "critic-claude",
  "tier": "high",
  "scores": {
    "art": {
      "score": 5.5,
      "confidence": 0.75,
      "evidence": [
        {"shot": "crops/high/R04-slot_QB", "note": "Bulbous balloon-pants silhouette on #12 and #44; glossy helmets do contrast with matte jerseys"},
        {"shot": "crops/high/R06-slot_LG", "note": "Sleeve hem and stripe torn into sawtooth spikes"},
        {"shot": "crops/high/R06-slot_C-side", "note": "Rake-like glove fingers, facemask floating off shell, jagged hem"},
        {"shot": "crops/high/R03-slot_QB", "note": "Official is a featureless capsule with detached sleeves; kits and numbers read well"},
        {"shot": "crops/high/R01-crowd", "note": "Crowd reads as people but low-poly"},
        {"shot": "high/desktop/R15", "note": "Black-box stands, cone trees"}
      ]
    },
    "lighting": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R04", "note": "Believable night grade, lamp bloom, per-player shadows; flat grey bowl wall"},
        {"shot": "high/desktop/R18", "note": "Rain over turf that looks dry in the gameplay frame"},
        {"shot": "crops/high/R18-turf_26_67_40", "note": "Some glint but square splash particles"},
        {"shot": "high/desktop/R13", "note": "Dark vertical smudge at bottom centre of sideline replay"},
        {"shot": "high/desktop/R19", "note": "Day mist is coherent"}
      ]
    },
    "animation": {
      "score": 5.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "strips/high/R09", "note": "No reach at catch; runner snaps to prone between frames 5 and 6; frames 6-8 frozen"},
        {"shot": "strips/high/R13", "note": "Tackle contact stays upright; no visible drive or fall"},
        {"shot": "strips/high/R11", "note": "No readable plant-and-cut"},
        {"shot": "crops/high/R12-carrier", "note": "Ball floats above pile; bodies interpenetrate"},
        {"shot": "crops/high/R10-carrier", "note": "Carrier airborne, upright torso"},
        {"shot": "crops/high/R07-slot_QB", "note": "Wind-up legible"}
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R04", "note": "Scorebug, numbered receiver icons, route art, on-field 1ST & 10"},
        {"shot": "high/desktop/R12", "note": "Result band has hierarchy and names the runner"},
        {"shot": "high/landscape/R14", "note": "Touchdown banner hides the entire celebration"},
        {"shot": "high/landscape/R04", "note": "Timeout dots clipped in team bar"},
        {"shot": "high/desktop/R16", "note": "Clean FG meter; side panel mostly empty"}
      ]
    },
    "typography": {
      "score": 6.5,
      "confidence": 0.65,
      "evidence": [
        {"shot": "high/desktop/R14", "note": "Strong condensed display headline; board clock reads 3:5 1"},
        {"shot": "high/mobile/R22", "note": "Consistent scale on play cards"},
        {"shot": "high/desktop/R01", "note": "Low-contrast grey body text in panel"},
        {"shot": "high/desktop/R03", "note": "Play list text clipped at bottom edge"},
        {"shot": "crops/high/R01-board", "note": "Lamp-style seven-segment numerals with unlit segments"}
      ]
    },
    "readability": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R08", "note": "Dark ball over black jerseys; players about 25 px tall"},
        {"shot": "crops/high/R08-ball", "note": "Ball blends with leather-dark kits"},
        {"shot": "high/desktop/R10", "note": "Carrier ring and tag work"},
        {"shot": "high/mobile/R12", "note": "Result band covers the tackle"},
        {"shot": "high/mobile/R04", "note": "Figures about 10 CSS px tall"}
      ]
    },
    "mobile": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/mobile/R04", "note": "About 35% dead stadium space at top; route icons clipped at edges"},
        {"shot": "high/mobile/R21", "note": "Band hides the whole offense"},
        {"shot": "high/landscape/R14", "note": "TD banner covers celebration"},
        {"shot": "high/landscape/R08", "note": "Side panel takes about 43% of width; tiny figures"},
        {"shot": "medium/mobile/R10", "note": "Phone tier frames match High; buttons thumb-friendly; 89 min fps on throttle"}
      ]
    },
    "authenticity": {
      "score": 6.0,
      "confidence": 0.65,
      "evidence": [
        {"shot": "high/desktop/R20", "note": "3A home field, small bleachers, pines and ridge, school end zone"},
        {"shot": "crops/high/R01-board", "note": "Authentic high-school lamp scoreboard"},
        {"shot": "high/desktop/R01", "note": "Establishing shot is an empty dark oversized bowl"},
        {"shot": "high/desktop/R13", "note": "Identical standing sideline row; no band, cheer or student section"}
      ]
    }
  },
  "gaps": [
    {"id": "G-catch-tackle-beats", "category": "animation", "expectedGain": 0.75, "severity": 5, "effort": "L", "workstream": "WS4b", "evidence": ["strips/high/R09", "crops/high/R09-slot_Z", "crops/high/R12-carrier", "strips/high/R13"], "benchmark": "axis-3", "fix": "Catch reach keyed 6-8 ticks before ball arrival with hands to ball; 3-4 frame stumble/fall blend instead of snap to prone; keep ball attached to carrier hand bone through tackle and fall; body-separation offsets in piles; visible drive and fall on replay contact."},
    {"id": "G-pants-silhouette", "category": "art", "expectedGain": 0.6, "severity": 4, "effort": "M", "workstream": "WS3", "evidence": ["crops/high/R04-slot_QB", "crops/high/R06-slot_C", "crops/high/R16-slot_K"], "benchmark": "axis-3", "fix": "Cut hip/glute volume about 30%, taper into thigh, add thigh and knee pad planes, re-check deep-stance weights so the seat does not balloon; add 2-3 body-type scales (OL, skill, QB)."},
    {"id": "G-mesh-tears-gloves-facemask", "category": "art", "expectedGain": 0.4, "severity": 4, "effort": "S", "workstream": "WS3", "evidence": ["crops/high/R06-slot_LG", "crops/high/R06-slot_C-side", "crops/high/R12-carrier"], "benchmark": "axis-3", "fix": "Close/merge sleeve-hem and stripe geometry that renders as sawteeth; shorten finger bones and curl gloves into a relaxed fist; seat facemask on the helmet shell with side clips."},
    {"id": "G-run-lean-contact", "category": "animation", "expectedGain": 0.4, "severity": 4, "effort": "M", "workstream": "WS4", "evidence": ["crops/high/R10-carrier", "crops/high/R11-carrier", "strips/high/R11"], "benchmark": "axis-3", "fix": "Forward torso lean proportional to speed, lateral lean on cuts, a plant frame on direction changes, foot-plant IK so one foot contacts turf for most of the cycle."},
    {"id": "G-bands-cover-action", "category": "mobile", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS7", "evidence": ["high/mobile/R12", "high/mobile/R21", "high/landscape/R12", "high/landscape/R14"], "benchmark": "retrobowl-2", "fix": "On phone dock result/TD bands at the top of the field view or frame the camera so the pile sits above the band; halve the landscape touchdown banner height."},
    {"id": "G-phone-portrait-deadspace", "category": "mobile", "expectedGain": 0.4, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/mobile/R04", "high/mobile/R08"], "benchmark": "retrobowl-1", "fix": "Pitch camera down and crop the far field so stadium/sky/scoreboard take at most 15% of the field view; clamp receiver icons inside a safe area; scale players about 1.3x on phone."},
    {"id": "G-officials-model", "category": "art", "expectedGain": 0.3, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["crops/high/R03-slot_QB", "crops/high/R04-slot_C"], "benchmark": "axis-3", "fix": "Move officials onto the new body: striped shirt with attached sleeves, white cap and a face."},
    {"id": "G-rain-surface", "category": "lighting", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS5", "evidence": ["high/desktop/R18", "crops/high/R18-turf_26_67_40"], "benchmark": "legendbowl-1", "fix": "Darken turf albedo and lower roughness in rain, add lamp reflection streaks on turf, replace square splash quads with round soft sprites."},
    {"id": "G-ball-visibility", "category": "readability", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R08", "crops/high/R08-ball"], "benchmark": "retrobowl-2", "fix": "Lighten the ball's leather tone, add white stripes and a faint trail in flight."},
    {"id": "G-venue-pageantry", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS2", "evidence": ["high/desktop/R01", "high/desktop/R13", "high/desktop/R20"], "benchmark": "cfb26-1", "fix": "Student section block in school colours and a band block in home stands, cheerleaders on sideline, varied sideline poses, dress the R01 bowl with press box, fence and lit stands."},
    {"id": "G-replay-dark-smudge", "category": "lighting", "expectedGain": 0.2, "severity": 2, "effort": "S", "workstream": "WS1", "evidence": ["high/desktop/R13", "high/desktop/R15", "strips/high/R13"], "fix": "Exclude the near-camera pole/occluder from the sideline replay camera or move the camera."},
    {"id": "G-landscape-scorebug-clip", "category": "ui", "expectedGain": 0.2, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/landscape/R04", "high/desktop/R03"], "benchmark": "axis-1", "fix": "Drop the HOME tag or shrink team names under 900 px so timeout dots fit; add a scroll fade to the play list instead of a hard cut."}
  ],
  "verdict": "continue"
}
```
