# Judge ruling: loop 12, High tier

## Verdict
**Continue.** UI and typography meet their gates at 7.0, and authenticity clears its gate of 6 at 6.5. Five gated categories are still short: art 6.0, lighting 6.5, animation 5.5, readability 6.0 and mobile 6.0. This loop's fixes landed. The desktop result camera now keeps the pile clear of the toast, and the field-goal meter keeps the formation in view. What holds the score down is unchanged content: player and official construction, bare surrounds behind the end zones, tackle and catch beats with no feel touches, and two phone framings (portrait pre-snap and landscape live and result).

## Fact disputes (checked on the captures)
- **Officials' heads.** The advocate is right. `crops/high/R12-carrier`, `crops/high/R11-carrier`, `crops/high/R09-slot_Z` and `crops/high/R06-slot_C` all show brown, skin-toned heads. `crops/high/R03-slot_QB` is a rear view, so it cannot show a missing face. Claude's "faceless black silhouettes in every close-up" is wrong. The construction problems are real, though: the striped sleeves float apart from the torso, the hands are black mitten balls and the legs are tubes (`crops/high/R03-slot_QB`). The heads also have no readable features at close-up scale. The defect is construction, not head colour.
- **Visitor stand.** The advocate is mostly right. In `high/desktop/R13` and `high/desktop/R15` the visitor bleacher is filled with blue, white and orange fans and lit from the front, so it is not an empty dark box. It is a small block set against a flat, untextured grey wall (`high/desktop/R13`) and grey cone trees (`high/desktop/R15`), so Claude's underlying point about bare surrounds stands.
- **R12 desktop toast.** The advocate is right and Codex is wrong. In `high/desktop/R12` the pile (#63, #73, #92) and the downed carrier sit above the toast's top edge. Only the lower legs of the two nearest players touch it. The occlusion is real only in landscape (`medium/landscape/R12`), where just the helmets show above the plate.
- **R04 QB alignment.** The advocate is right. In `crops/high/R04-slot_QB`, #12 is in shotgun several yards off the ball, which is correct for curls. The under-center fault is real only on the dive: in `crops/high/R06-slot_C`, #10 stands upright behind the center and the ball sits untouched on the turf.
- **Phone perf tail.** The advocate is right on the cause, though not fully. The 132.2 ms p95 is the Medium 4× rain row only. The other Medium 4× scenes sit at 54–69 ms p95. Low 4× (220k triangles, 61 calls) also has 42–65 ms p95 tails, and its run scene has a p50 of only 4.8 ms. The capture rig was under heavy unrelated load. The tail therefore cannot be attributed to render cost this loop and is unverified, not proven. The Medium minimum of 37 fps clears the 30 fps bar. I apply only a light deduction and make re-measuring idle the first step of the gap.

## Category rulings

### Art: 6.0 (critics 6.0 / 6.0)
Both critics agree, and the captures support them. Helmets are glossy against matte jerseys and numbers read (`crops/high/R14-carrier`, `crops/high/R11-carrier`). Turf grain holds up (`crops/high/R04-turf_26_67_42`). The crowd reads as people (`crops/high/R01-crowd`).

Close-ups fall below the 7 anchor's "holds up in close-ups":
- three-lobed mitten hands, faceted tube arms and no jersey folds (`crops/high/R06-slot_C-side`);
- inflated shoulders on uniform body types (`crops/high/R04-slot_QB`);
- floating official sleeves and mitten hands (`crops/high/R03-slot_QB`);
- a crowd made of repeated blocky raised-arm figures (`crops/high/R01-crowd`);
- grey cone trees (`high/desktop/R15`) and a flat slab behind the end zone (`high/desktop/R14`).

This is below axis-3 (about 7) and less consistent in style than legendbowl-1.

### Lighting & atmosphere: 6.5 (critics 6.5 / 6.5)
Several fanned soft shadows sit under every player, and the light pools toward the towers are tight, with darker gaps between them (`high/desktop/R17`). The towers bloom and the night exposure is believable (`high/desktop/R01`). The day mist adds depth haze (`high/desktop/R19`).

Three things keep it below 7:
- The full rain frame reads as dry turf (`high/desktop/R18`). The wet response is a single hard white hotspot (`crops/high/R18-turf_26_67_40`).
- Past the field, everything drops to flat unlit planes with no falloff: the grey wall behind the visitor stand (`high/desktop/R13`), the olive slab behind the end zone (`high/desktop/R14`) and the empty berm (`high/desktop/R17`).
- There is no volumetric light from the towers.

This is short of the axis-3 and cfb26-3 benchmarks.

### Animation & game feel: 5.5 (critics 6.0 / 4.5; the gap is over 1.0, so I checked the strips and close-ups)
I opened `strips/high/R07`, `R09`, `R10`, `R11` and `R13`, plus `crops/high/R07-slot_QB`, `R09-slot_Z`, `R11-carrier` and `R12-carrier`. **Neither critic was fully right.**

Against Codex's 4.5, which is below the "procedural cycles that read" anchor:
- The running cycles read across the frames of `strips/high/R07` and `strips/high/R11`, with no visible popping.
- `crops/high/R07-slot_QB` shows a legible wind-up with the ball cocked by the ear.
- `crops/high/R09-slot_Z` shows the receiver reaching with both hands.
- `crops/high/R12-carrier` shows a resolved fall: the carrier prone, the tackler draped across him on the spot. The bodies overlap a little at #47's torso, but it reads as a pile, not a failure.

Against Claude's 6.0:
- `strips/high/R13` shows the defenders bunching around 20 KEMP over 8 frames, but neither the wrap nor the fall is legible, and the figures are about 20 px tall.
- `strips/high/R10` loses the carrier in the pile and cuts to NO GAIN.
- `strips/high/R09` hard-cuts from the reach (frames 1–5) to the result camera, with no securing beat.
- No strip shows slow motion, a punch-in at live contact or impact particles. The only feel touches are the ball trail and the replay tag and depth of field.

That is the 5 anchor with clean cycles and a few legible poses: 5.5.

### UI / HUD: 7.0 (critics 7.0 / 6.5)
In `high/desktop/R04`:
- shape badges sit on the receivers with tethers;
- dashed route art and an on-field 1ST & 10 graphic;
- a play diagram in the panel;
- a two-bar scorebug with possession and timeouts.

The toast in `high/desktop/R21` has clear hierarchy. Codex's central objection fails: the desktop R12 toast clears the pile (see above), and the sidebar in `high/desktop/R21` holds actions and the log, not repeats. The real blemishes are small:
- The field-goal copy appears in both the meter and the side panel, and the meter's corner touches the in-world scoreboard (`high/desktop/R16`).
- The route 2 and route 3 arrows overlap near the right hash (`high/desktop/R04`).

This meets the 7 anchor (axis-1, madden26-1) without the motion polish of a 9.

### Typography: 7.0 (critics 7.0 / 7.0)
A condensed display face is paired with a sans body face on a clear scale, and the RUN/PASS tags are consistent (`high/desktop/R22`). The gain, result and runner lines form a clear hierarchy, and the numerals are large (`high/desktop/R21`). Phone numerals read at a glance (`medium/mobile/R12`). The weakest size is the small HOME tag (`high/desktop/R01`).

### Readability: 6.0 (critics 6.5 / 5.5)
Desktop is close to 7:
- the ball has a trail and the target has a badge and ring (`high/desktop/R08`);
- the carrier has a ring and a "44 DELACROIX" tag, with the blue line of scrimmage and the yellow line to gain (`high/desktop/R18`);
- figures are small at pre-snap, about 30 px (`high/desktop/R04`).

The rubric asks for "every frame, on both viewports", and three phone frames fail:
- In portrait pre-snap, receivers 1, 2 and 3 are off-screen. Badge 1 sits on the painted 10 and badges 2 and 3 are clamped at the right edge (`medium/mobile/R04`).
- In landscape live play, the carrier's ring is cut by the bottom edge, there is no name tag, and about 40 % of the frame is sky and backdrop (`medium/landscape/R10`).
- In landscape, the result plate hides the pile (`medium/landscape/R12`).

Portrait live play is good (`medium/mobile/R10`). Claude's 6.5 is too generous for three failed phone frames, and Codex's 5.5 understates desktop, so 6.0.

### Mobile: 6.0 (critics 6.5 / 5.5)
What works:
- portrait live framing with a large name tag and a full-width JUKE button (`medium/mobile/R10`);
- post-play framing that keeps both teams above the band, with large CONTINUE and REPLAY buttons (`medium/mobile/R12`);
- a strong play-call grid (`medium/mobile/R22`);
- HIKE and CHANGE PLAY are thumb-sized (`medium/mobile/R04`).

What fails:
- portrait pre-snap loses three receivers (`medium/mobile/R04`);
- landscape live and result framing (`medium/landscape/R10`, `medium/landscape/R12`);
- linemen are about 25 CSS px tall.

The perf tail is unverified because of the rig load. The 37 fps minimum passes. I deducted lightly and did not deduct the severity-5 amount Codex applied.

### Authenticity: 6.5 (critics 6.5 / 6.0)
What is right:
- the HS scoreboard reads DOWN / TO GO / BALL ON (`crops/high/R01-board`);
- track, benches, Ouachita ridgeline and modest home bleachers (`high/desktop/R01`);
- a 3A Jessieville variant with its own wordmark (`high/desktop/R20`);
- a field house at Wolf Stadium (`high/desktop/R03`);
- local play names (`high/desktop/R22`);
- a filled, lit visitor stand at sensible high-school scale (`high/desktop/R15`).

What is missing: a band, a student section and end-zone staging. The surrounds are bare (`high/desktop/R14`, `high/desktop/R17`), and the sideline teams stand in evenly spaced rows (`high/desktop/R13`). This clears the gate but is short of the 7 staging anchor (cfb26-1/2, legendbowl-4).

### Calibration (unlabeled frame, rubric anchors only)
- **Art 7.0.** Smooth bodies with readable gear and facemasks, jerseys with numbers and trim, textured turf, a crowd that reads as people, and a venue of built objects (boards, video panels, a tunnel). The cloth is not near-photoreal.
- **Lighting 6.0.** A believable day exposure with one hard sun shadow per player and a clear sky. There are no multiple soft shadows, no lamp bloom, little specular on the turf and no falloff or atmosphere. That is above the 5 anchor and short of 7.

## Ranked gaps (merged; ranked by gain ÷ effort, weighted by severity)
1. **G-result-occlusion** (mobile, WS7, S). The landscape result plate hides the pile (`medium/landscape/R12`, `high/landscape/R12`). Desktop is already clear (`high/desktop/R12`).
   - **Fix:** at 844×390, aim the result camera so the spot sits about 40 % from the top of the 3D viewport, or render the result line inside the side panel, which widens at the result, instead of over the field.
   - **Test:** the downed carrier's full body is visible above any overlay in landscape R12.
2. **G-phone-framing** (readability, WS7, M). In portrait pre-snap, receivers 1–3 are off-screen (`medium/mobile/R04`). In landscape live play the carrier sits on the bottom edge under about 40 % sky (`medium/landscape/R10`, `high/landscape/R10`).
   - **Fix:** fit the portrait pre-snap camera to the bounding box of all eligible receivers plus a 2 yd margin. Aim the landscape live camera so the carrier sits at about 55–60 % of the viewport height, with the horizon no higher than 25 % from the top.
   - **Test:** no clamped badge in portrait R04. The carrier ring and tag are fully visible in landscape R10.
3. **G-wet-surface** (lighting, WS5, S). The rain frame reads dry (`high/desktop/R18`), with a single hard hotspot in the close-up (`crops/high/R18-turf_26_67_40`).
   - **Fix:** in rain, lower turf roughness across the whole field with a noise-broken wetness mask, and add stretched tower reflection streaks toward the gameplay camera. Clamp the peak specular so the hotspot spreads rather than clips to white.
4. **G-contact** (animation, WS4b, M). The tackle and catch beats do not resolve in the strips (`strips/high/R13`, `strips/high/R10`, `strips/high/R09`). There is a slight body overlap in the pile (`crops/high/R12-carrier`).
   - **Fix:** a 0.3 s slow motion plus a camera punch-in on live catch and tackle contact, with a turf-spray particle burst. A wrap-then-fall that reaches the ground within the 8-frame strip window. A catch-to-tuck blend before the result cut. Capsule separation between bodies in the pile.
5. **G-venue-surrounds-empty** (authenticity, WS2, M). Flat slabs behind the end zone (`high/desktop/R14`, `high/desktop/R16`), an empty berm (`high/desktop/R17`), grey cone trees (`high/desktop/R15`) and a flat grey wall behind the visitor stand (`high/desktop/R13`).
   - **Fix:** an end-zone chain-link fence with standing fans, a concession stand or field house at the open end, a textured berm with grass and a walkway, and card-foliage trees in place of the cones.
6. **G-player-construction** (art, WS3, L). This merges player hands and cloth with the officials.
   - **Evidence:** mitten hands, tube arms and no folds (`crops/high/R06-slot_C-side`); inflated shoulders and uniform bodies (`crops/high/R04-slot_QB`); official sleeves floating off the torso with black ball hands (`crops/high/R03-slot_QB`).
   - **Fix:** glove meshes with grouped fingers for players and officials, and officials' striped sleeves skinned to the torso with simple facial features. A jersey normal map with folds and seams, plus 2–3 body-type variants (lineman versus skill player).
7. **G-stand-falloff** (lighting, WS1, M). Past the field, the stands, walls and berm drop to flat unlit planes (`high/desktop/R13`, `high/desktop/R14`, `high/desktop/R17`).
   - **Fix:** a falloff gradient from the tower pools onto the stand fronts, berm and backdrop wall, using vertex colour or light-map ramps darkening with distance from the field. Add a faint additive cone under each tower head.
8. **G-school-crowd** (authenticity, WS2, M). This merges the band and student section. The crowd is one mixed block with repeated raised-arm poses (`crops/high/R01-crowd`, `high/desktop/R01`).
   - **Fix:** a uniformed band block with instrument silhouettes at one end of the home stands, and a themed student section (an orange-out) in the front rows near the 50, with 3+ pose variants and banners.
9. **G-weight** (animation, WS4, L). Cut lean and blocker phases cannot be read (`strips/high/R11`). The carrier is fairly upright mid-stride (`crops/high/R11-carrier`).
   - **Fix:** a lean of 10° or more into cuts, with the hips over the plant foot. Distinct brace, push and release phases for blockers.
10. **G-qb-under-center** (animation, WS4, S). QB #10 stands upright behind the center on the dive, and the ball sits untouched on the turf (`crops/high/R06-slot_C`). R04 is shotgun and is correct.
    - **Fix:** a crouched under-center pose with the hands at the center's seat, and the ball in the center's hand.
11. **G-fg-meter-overlap** (ui, WS7, S). The meter's corner touches the in-world scoreboard, and the copy is duplicated in the side panel (`high/desktop/R16`). The route 2 and route 3 arrows overlap (`high/desktop/R04`).
    - **Fix:** narrow the meter by about 60 px or shift it left to clear the scoreboard, and drop the duplicate panel copy. Offset overlapping route arrows by 6 px.
12. **G-phone-hitches** (mobile, WS1, M). This merges the frame spikes. The p95 tail (132 ms in rain, 54–69 ms elsewhere on Medium 4×) was measured on a loaded rig, and Low shows a similar tail.
    - **Fix:** re-run the 4× proxy on an idle machine first. If Medium p95 is still above 50 ms, halve the phone-tier shadow-map size and caster count, and cap bloom at one mip chain.

```json
{
  "loop": 12,
  "role": "judge",
  "tier": "high",
  "verdict": "continue",
  "calibration": {"art": 7.0, "lighting": 6.0},
  "scores": {
    "art": {
      "score": 6.0,
      "confidence": 0.8,
      "evidence": [
        {"shot": "crops/high/R06-slot_C-side", "note": "Mitten hands, faceted tube arms, no jersey folds"},
        {"shot": "crops/high/R03-slot_QB", "note": "Official: floating striped sleeves, black ball hands (rear view; head colour not judgeable here)"},
        {"shot": "crops/high/R12-carrier", "note": "Officials have skin-toned heads but no readable features; glossy helmets vs matte jerseys"},
        {"shot": "crops/high/R01-crowd", "note": "Crowd reads as people; repeated blocky raised-arm figures"},
        {"shot": "high/desktop/R15", "note": "Grey cone treeline"},
        {"shot": "high/desktop/R14", "note": "Flat slab behind the end zone"}
      ]
    },
    "lighting": {
      "score": 6.5,
      "confidence": 0.8,
      "evidence": [
        {"shot": "high/desktop/R17", "note": "Fanned multi-shadows, tight tower pools with dark gaps"},
        {"shot": "high/desktop/R01", "note": "Tower bloom, believable night exposure"},
        {"shot": "high/desktop/R18", "note": "Rain frame reads dry"},
        {"shot": "crops/high/R18-turf_26_67_40", "note": "Single hard white hotspot"},
        {"shot": "high/desktop/R13", "note": "Flat unlit grey wall behind the visitor stand: no falloff"}
      ]
    },
    "animation": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "strips/high/R13", "note": "Bodies bunch at contact; wrap and fall not legible in 8 frames"},
        {"shot": "strips/high/R09", "note": "Reach then hard cut to result camera, no securing beat"},
        {"shot": "strips/high/R10", "note": "Carrier lost in pile, cut to NO GAIN"},
        {"shot": "strips/high/R11", "note": "Running cycles read without popping; cut lean unreadable at this scale"},
        {"shot": "crops/high/R12-carrier", "note": "Resolved fall: carrier prone, tackler across him; minor overlap"},
        {"shot": "crops/high/R07-slot_QB", "note": "Legible wind-up, ball cocked"}
      ]
    },
    "ui": {
      "score": 7.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "high/desktop/R04", "note": "Tethered shape badges, route art, 1ST & 10, panel diagram; route 2/3 arrows overlap"},
        {"shot": "high/desktop/R12", "note": "Pile and downed carrier above the toast; only nearest players' feet touch it"},
        {"shot": "high/desktop/R21", "note": "Toast hierarchy; sidebar holds actions and log, not repeats"},
        {"shot": "high/desktop/R16", "note": "FG copy duplicated; meter corner touches in-world scoreboard"}
      ]
    },
    "typography": {
      "score": 7.0,
      "confidence": 0.8,
      "evidence": [
        {"shot": "high/desktop/R22", "note": "Condensed display plus sans body on a clear scale"},
        {"shot": "high/desktop/R21", "note": "Gain/result/runner hierarchy, large numerals"},
        {"shot": "medium/mobile/R12", "note": "Phone numerals read at a glance"},
        {"shot": "high/desktop/R01", "note": "Small HOME tag is the weakest size"}
      ]
    },
    "readability": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "high/desktop/R08", "note": "Ball trail, target badge and ring"},
        {"shot": "high/desktop/R18", "note": "Carrier ring and tag, LOS and line to gain"},
        {"shot": "medium/mobile/R04", "note": "Receivers 1-3 off-screen; badges clamped at edges"},
        {"shot": "medium/landscape/R10", "note": "Carrier ring cut by bottom edge, no tag, ~40% sky"},
        {"shot": "medium/landscape/R12", "note": "Result plate hides the pile"},
        {"shot": "medium/mobile/R10", "note": "Portrait live framing good, large name tag"}
      ]
    },
    "mobile": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "medium/mobile/R12", "note": "Both teams above the result band; large controls"},
        {"shot": "medium/mobile/R22", "note": "Strong play-call grid"},
        {"shot": "medium/mobile/R04", "note": "Pre-snap width lost; linemen ~25 CSS px"},
        {"shot": "medium/landscape/R10", "note": "Carrier on bottom edge under heavy sky"},
        {"shot": "medium/landscape/R12", "note": "Plate hides pile; perf tail measured on a loaded rig (37 fps min passes)"}
      ]
    },
    "authenticity": {
      "score": 6.5,
      "confidence": 0.75,
      "evidence": [
        {"shot": "crops/high/R01-board", "note": "HS scoreboard DOWN / TO GO / BALL ON"},
        {"shot": "high/desktop/R15", "note": "Visitor stand filled and lit at HS scale; cone trees behind"},
        {"shot": "high/desktop/R20", "note": "3A Jessieville variant with its own wordmark"},
        {"shot": "high/desktop/R14", "note": "Bare end-zone surround"},
        {"shot": "crops/high/R01-crowd", "note": "No band, no student section"}
      ]
    }
  },
  "gaps": [
    {"id": "G-result-occlusion", "category": "mobile", "expectedGain": 0.4, "severity": 4, "effort": "S", "workstream": "WS7", "evidence": ["medium/landscape/R12", "high/landscape/R12", "high/desktop/R12"], "benchmark": "retrobowl-2", "fix": "At 844x390 aim the result camera so the spot sits ~40% from the top of the 3D viewport, or render the result line inside the widened side panel instead of over the field; test: downed carrier's full body visible above any overlay in landscape R12. Desktop already clear."},
    {"id": "G-phone-framing", "category": "readability", "expectedGain": 0.6, "severity": 4, "effort": "M", "workstream": "WS7", "evidence": ["medium/mobile/R04", "high/mobile/R04", "medium/landscape/R10", "high/landscape/R10"], "benchmark": "retrobowl-1", "fix": "Fit the portrait pre-snap camera to the bounding box of all eligible receivers plus a 2 yd margin; aim the landscape live camera so the carrier sits at 55-60% of viewport height with the horizon no higher than 25% from the top; test: no clamped badges in portrait R04, carrier ring and tag fully visible in landscape R10."},
    {"id": "G-wet-surface", "category": "lighting", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS5", "evidence": ["high/desktop/R18", "crops/high/R18-turf_26_67_40"], "benchmark": "cfb26-3", "fix": "In rain, lower turf roughness field-wide through a noise-broken wetness mask, add stretched tower reflection streaks toward the gameplay camera, and clamp peak specular so the hotspot spreads instead of clipping white."},
    {"id": "G-contact", "category": "animation", "expectedGain": 0.6, "severity": 4, "effort": "M", "workstream": "WS4b", "evidence": ["strips/high/R13", "strips/high/R10", "strips/high/R09", "crops/high/R12-carrier"], "benchmark": "madden26-4", "fix": "0.3 s slow-motion plus camera punch-in on live catch and tackle contact with a turf-spray particle burst; wrap-then-fall reaching the ground inside the 8-frame strip window; catch-to-tuck blend before the result cut; capsule separation between piled bodies."},
    {"id": "G-venue-surrounds-empty", "category": "authenticity", "expectedGain": 0.4, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["high/desktop/R14", "high/desktop/R16", "high/desktop/R17", "high/desktop/R15", "high/desktop/R13"], "benchmark": "cfb26-2", "fix": "End-zone chain-link fence with standing fans, a concession stand or field house at the open end, a textured grass berm with walkway, and card-foliage trees replacing the grey cones; texture the flat wall behind the visitor stand."},
    {"id": "G-player-construction", "category": "art", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS3", "evidence": ["crops/high/R06-slot_C-side", "crops/high/R04-slot_QB", "crops/high/R03-slot_QB", "crops/high/R12-carrier"], "benchmark": "axis-3", "fix": "Glove meshes with grouped fingers for players and officials; officials' striped sleeves skinned to the torso and simple facial features on the existing skin-toned heads; jersey normal map with folds and seams; 2-3 body-type variants (lineman vs skill)."},
    {"id": "G-stand-falloff", "category": "lighting", "expectedGain": 0.3, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["high/desktop/R13", "high/desktop/R14", "high/desktop/R17"], "benchmark": "axis-3", "fix": "Bake or vertex-colour a light falloff gradient from the tower pools onto stand fronts, berm and backdrop wall, darkening with distance from the field, and add a faint additive light cone under each tower head."},
    {"id": "G-school-crowd", "category": "authenticity", "expectedGain": 0.3, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["crops/high/R01-crowd", "high/desktop/R01"], "benchmark": "cfb26-1", "fix": "Uniformed band block with instrument silhouettes at one end of the home stands and a themed student section (orange-out) in the front rows near the 50, with 3+ crowd pose variants and school banners."},
    {"id": "G-weight", "category": "animation", "expectedGain": 0.4, "severity": 3, "effort": "L", "workstream": "WS4", "evidence": ["strips/high/R11", "crops/high/R11-carrier"], "benchmark": "madden26-4", "fix": "Lean the carrier 10 degrees or more into cuts with the hips over the plant foot, and give blockers distinct brace, push and release phases."},
    {"id": "G-qb-under-center", "category": "animation", "expectedGain": 0.1, "severity": 2, "effort": "S", "workstream": "WS4", "evidence": ["crops/high/R06-slot_C"], "fix": "Crouched under-center QB pose with hands at the center's seat and the ball in the center's hand on under-center plays; R04 shotgun is correct."},
    {"id": "G-fg-meter-overlap", "category": "ui", "expectedGain": 0.1, "severity": 1, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R16", "high/desktop/R04"], "benchmark": "retrobowl-3", "fix": "Narrow the FG meter ~60 px or shift it left to clear the in-world scoreboard, drop the duplicate side-panel copy, and offset overlapping route arrows by 6 px."},
    {"id": "G-phone-hitches", "category": "mobile", "expectedGain": 0.2, "severity": 2, "effort": "M", "workstream": "WS1", "evidence": ["medium/mobile/R10", "medium/landscape/R10"], "benchmark": "retrobowl-2", "fix": "Re-run the 4x CPU proxy on an idle machine first (this loop's rig was loaded and Low shows a similar tail); if Medium p95 stays above 50 ms, halve phone-tier shadow-map size and caster count and cap bloom to one mip chain."}
  ]
}
```
