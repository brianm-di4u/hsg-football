# Critic A (critic-claude): loop 13, High tier

## Verdict
Friday Night Spa City is a well-staged, coherent night-game diorama. The scorebug, route art, the in-world HS scoreboard and the local naming hold up. It still sits about a point below shipped indie 3D football (Axis 2026) on every gate. Three things hold it back. (1) The players are smooth but generic mannequins: no faces, the same build for every position, and shell jerseys with no cloth. (2) Motion is the weakest link: piles without falls, canned synchronized celebrations, and a ball you rarely see in the carrier's arms. (3) The venue drops off into dark, empty planes and cone-spike trees as soon as the camera leaves the home-side wide shot. This loop's changes are real but small on screen. Rain on High desktop mostly darkens the turf, with no visible sheen at play distance. The back-row darkening in the bleachers is hard to see. The landscape chase-cam change works. No category reaches its gate this loop. Verdict: **continue**.

## Scores

### Art: 6.0
- `crops/high/R04-slot_C`, `crops/high/R06-slot_C-side`, `crops/high/R14-carrier`: glossy helmets with hot specular highlights and modeled facemasks against matte jerseys and pants. Stripe trim on sleeves, pants and socks is clean. That material contrast meets the 7 anchor.
- Against that, nobody has a face or skin. Under the facemask the head is a black void (`crops/high/R14-carrier` #12 and #9, `crops/high/R07-slot_QB`). Arms are solid sleeve-color tubes ending in mitts: white on the Lakeside home kit (`crops/high/R06-slot_C` #56 and #66), blue on the road kit (`crops/high/R04-slot_C` #57). Jerseys are rigid shells with no folds or tuck. In a 3-point stance the pants balloon into one rounded mass (`crops/high/R04-slot_C` #69, `crops/high/R06-slot_DL2-side`). Body types are uniform: the RB #44 and OL #74/#69 share one build (`crops/high/R10-carrier`, `crops/high/R11-carrier`). The officials are featureless figures in black (`crops/high/R03-slot_QB`).
- Crowd: it reads as people, with varied shirts and raised arms (`crops/high/R01-crowd`). Every fan has the same height and build, and the poses repeat in a grid.
- Venue: the scoreboard is excellent (`crops/high/R01-board`). Off the hero angle the build-out runs thin. The sideline replay shows a small two-section bleacher in front of a bare grey wall (`high/desktop/R13`). Giant black cone trees tower over the stands (`high/desktop/R15`). Behind the end zone is an empty dark plane (`high/desktop/R14`, `high/desktop/R17`).
- Turf grain holds up at field level (`crops/high/R04-turf_26_67_42`).
- Compared with axis-3 (players with faces, gloves and skin, sponsor-boarded venue): this is below a 7. It is clearly above the "palette-only" 5.

### Lighting & atmosphere: 6.5
- Lamp bloom and believable night exposure: `high/desktop/R01`, `high/desktop/R07`, `high/desktop/R20`. Several soft shadows fan out under each player (`crops/high/R04-turf_26_67_42`, `high/desktop/R02`). Helmet speculars show in `crops/high/R06-slot_C-side` and `crops/high/R14-carrier`. That is most of the 7 anchor.
- Rain (`high/desktop/R18` vs `high/desktop/R10`): at play distance the wet field is only darker. I measured mean turf luminance about 25/255 lower over the same region, with no lamp-streak reflections. The satin sheen shows only as one soft lit patch in the close-up (`crops/high/R18-turf_26_67_40`). The rain streaks are a uniform overlay with no light catching them in the lamp cones. The 7 anchor asks for "wet sheen in rain", and it is not readable in the frame a player sees.
- Field-to-stands falloff: the bleacher back-row darkening is barely there. In `crops/high/R01-crowd` the top rows are nearly as bright as the front. The sideline-replay backdrops are flat, unlit grey walls (`high/desktop/R13`, `high/desktop/R15`). There is no volumetric haze in the lamp cones at night.
- Day mist (`high/desktop/R19`) is a believable atmospheric wash but flattens all contrast.
- Compared with axis-3 and cfb26-3: close to the 7 bar, not over it.

### Animation & game feel: 5.5
- `strips/high/R09`: the ball's flight to the ringed receiver is legible, and he gets an arm up at the catch (frame 4). Frames 6–8 freeze in a one-arm-raised idle next to the defender, with no tackle or run-after-catch.
- `strips/high/R10` (dive): the carrier runs into a crowd of upright bodies. By frames 6–8 ("NO GAIN") the linemen squat in place and nobody goes to the ground. The contact beat is unreadable.
- `strips/high/R13`: the replay tackle does show the carrier tipping over with a defender attached (frames 6–8). `crops/high/R12-carrier` shows a credible two-body pile (#20 under #47). This is the best contact moment in the set.
- `strips/high/R07` (QB drop): at strip resolution the drop and wind-up cannot be followed; the camera follows and the QB sits at the bottom edge. The close-up `crops/high/R07-slot_QB` shows a good cocked-arm pose.
- `strips/high/R11`: a good running stride with knee lift (`crops/high/R11-carrier`). In this strip the carrier's ring is visible only in frames 1–2, at the bottom edge.
- Celebration: every Hot Springs player has the same both-arms-up pose at the same moment (`crops/high/R14-carrier`, `high/desktop/R14`, `high/mobile/R14`).
- No carrier close-up shows the ball tucked on the camera side (`crops/high/R10-carrier`, `crops/high/R11-carrier`, `crops/high/R13-carrier`).
- The catch slow-motion is claimed but cannot be seen in stills. Feel touches I can see: the ball trail, the replay cam and the result plates.
- Rubric 5 is "procedural cycles that read, but with popping, floaty contact and stiff falls". That describes this.

### UI / HUD: 6.5
- Pre-snap offense is close to axis-1. `high/desktop/R04` and `high/landscape/R04` show numbered, shaped receiver badges (diamond, circle, triangle, square, star) with dashed route art on the field, plus a matching panel diagram. The live carrier gets a ring and a name plate (`high/desktop/R10`, `high/desktop/R15`). Result plates have a clear two-line hierarchy (`high/desktop/R21`, `high/desktop/R12`).
- Defense pre-snap (`high/desktop/R05`, `medium/desktop/R05`) has nothing on the field: no user-defender ring and no blitz or coverage art. The plan exists only in the panel thumbnail.
- On desktop the result plate covers the bottom of the pile and an official (`high/desktop/R12`) and the celebrating players' feet (`high/desktop/R14`).
- The side panel takes about 22–25% of the 1280 width and is mostly empty below its buttons (`high/desktop/R04`, `high/desktop/R05`, `high/desktop/R16`).
- `high/desktop/R16` repeats "FIELD GOAL · 45 YD" in both the meter and the panel.
- The scorebug is clean (team color bars, possession football, timeout dots). It reads as a web-app header rather than a broadcast package; compare madden26-3.

### Typography: 6.5
- A consistent condensed display face (team names, "TOUCHDOWN!", button labels) is paired with a plain sans for body and log text (`high/desktop/R22`, `high/desktop/R21`). Score numerals read at a glance. Nothing clips in the desktop HUD.
- Hierarchy weak spots:
  - Down and distance, the most important pre-snap fact, is the smallest text in the scorebug: "1st & 10 · own 30", mixed case, about 15px under the gold clock (`high/desktop/R04`, `high/desktop/R07`).
  - The "HOME" tag is about 10px (`high/desktop/R01`).
  - The play-call thumbnails are about 70×42px. That is too small for their route linework (`high/desktop/R22`, `high/desktop/R03`).
- No deliberate tracking or weight system beyond bold-condensed vs regular. Compared with madden26-3 and legendbowl-4: competent, not yet a designed type scale.

### Readability: 6.5
- Readable:
  - The target receiver has a numbered badge and ring, and the ball is oversized with a trail (`high/desktop/R08`, `crops/high/R08-ball`, `high/mobile/R08`).
  - The LOS (blue) and line to gain (yellow) are present in every live frame (`high/desktop/R10`, `high/desktop/R11`).
  - The carrier's name plate stands out (`high/desktop/R10`, `high/landscape/R10`).
- Hard to read:
  - Desktop figures are small: a wide receiver is about 37px tall in `high/desktop/R04` (axis-1 scales to about 47px at 1280).
  - On the dive, the carrier is buried in a cluster of black jerseys, readable only through the ring and tag (`high/desktop/R10`, `high/desktop/R18`).
  - In `high/desktop/R05` defenders are about 25px with no labels.
  - At the end of a play the plates cover the action (`high/desktop/R12`).
- Compared with axis-1 and legendbowl-2: near, not at, the 7.

### Mobile: 6.0
- Landscape now looks deliberate. The carrier and tag sit well up from the bottom in `high/landscape/R10` and `high/landscape/R18`, and the pile sits above the plate in `high/landscape/R12`. Buttons are large.
- Portrait:
  - The controls are thumb-friendly: HIKE is about 135×62 CSS px (`high/mobile/R04`) and the play cards are big (`high/mobile/R22`).
  - Figures remain small. I measured offensive linemen at about 36 device px, roughly 18 CSS px from helmet top to cleat, in `high/mobile/R04`. That is below the stated ~21.
  - About 40% of the field view above the formation is empty downfield turf (`high/mobile/R04`, `high/mobile/R10`).
  - Badge "1" covers the "1ST & 10" field paint at the left edge (`high/mobile/R04`).
- Perf: per the brief, Medium is the phone tier. Under 4× throttle it holds a 40 fps minimum but has a 71.4 ms worst p95, which means visible hitches. High under throttle drops to 19 fps.
- Compared with retrobowl-1 and retrobowl-2, whose figures are far larger in portrait-equivalent framing: a 6.

### Authenticity: 6.0
- What lands:
  - Real Arkansas opponents (Lake Hamilton, Lakeside, Jessieville) and Spa City play names.
  - A properly HS-styled scoreboard (HSHS/LHHS, DOWN / TO GO / BALL ON; `crops/high/R01-board`).
  - Ouachita ridge backdrop, home bleachers, team benches lining the sidelines, end-zone wordmarks and a 3A variant (`high/desktop/R20`).
- Not seen in any capture:
  - No band, cheer squad or student-section block (`high/desktop/R01`, `crops/high/R01-crowd`, `high/desktop/R13`).
  - The track is a plain tan strip with no lanes (`high/desktop/R01`).
  - End zones back onto void (`high/desktop/R14`, `high/desktop/R17`).
  - The visitor side is a small floating bleacher against a wall (`high/desktop/R15`).
- Compared with cfb26-1 and cfb26-2 (band and student-section staging): at the gate, not beyond it.

### Regression check (Medium / Low)
- Medium matches High closely on the turf, shadows and play art (`medium/desktop/R18`, `medium/mobile/R04`, `medium/landscape/R10`, `crops/medium/R06-slot_C`). Medium R01 shows more lamp haze than High (`medium/desktop/R01` vs `high/desktop/R01`).
- Low is the faceted v2 look as expected (`crops/low/R04-slot_C`, `crops/low/R01-crowd` with block crowd). No new regressions found.

## Ranked gaps
1. **G-anim-contact-falls** (animation, WS4b, severity 5, effort L, +1.0). Dives end in upright clusters with nobody falling (`strips/high/R10`). Catches go straight to a static idle (`strips/high/R09`). Fix: a wrap-and-drive tackle with two or three varied falls (forward, side twist, pile-on) triggered on every stop, plus defenders finishing on the ground. The run-after-catch tackle should play out before the result plate. Benchmark: madden26-4.
2. **G-art-player-identity** (art, WS3, severity 4, effort L, +0.75). No faces or skin. Sleeve-color mitts. Shell jerseys. One body for every position (`crops/high/R14-carrier`, `crops/high/R06-slot_C`, `crops/high/R10-carrier`). Fix: a simple face and skin under the facemask; bare forearms or skin between sleeve and glove; separate glove geometry; a normal-mapped jersey wrinkle and tuck layer; per-position body scale (OL wider and heavier, WR and DB leaner). Benchmark: axis-3.
3. **G-venue-offangle-void** (authenticity, WS2, severity 4, effort M, +0.75). End zones open onto empty planes (`high/desktop/R14`, `high/desktop/R17`). Replay angles show a tiny bleacher against a grey wall with towering cone trees (`high/desktop/R13`, `high/desktop/R15`). Fix: an end-zone fence or berm with a track bend, a press box, a full visitor bleacher run, and properly scaled trees behind. Benchmark: cfb26-2.
4. **G-auth-band-student** (authenticity, WS2, severity 3, effort M, +0.5). No band block, no student section and no cheer squad on the track (`crops/high/R01-crowd`, `high/desktop/R01`). Fix: a uniformed band block in a home-stand section, a student section in team shirts with signs, a cheer squad and a mascot on the track. Benchmark: cfb26-1.
5. **G-rain-sheen-readable** (lighting, WS5, severity 3, effort M, +0.5). High desktop rain differs from dry mostly by being darker. There are no specular lamp streaks at play distance (`high/desktop/R18` vs `high/desktop/R10`; the sheen shows only in `crops/high/R18-turf_26_67_40`). Fix: view-dependent elongated lamp reflections on the turf toward the camera, brighter rain streaks inside the lamp cones, and splash puffs at cleats. Benchmark: legendbowl-1 (rain).
6. **G-mobile-portrait-scale** (mobile, WS7, severity 4, effort M, +0.5). Portrait linemen are about 18 CSS px, and roughly 40% of the field view is empty turf above the formation (`high/mobile/R04`, `high/mobile/R10`). Fix: tilt the camera down or move it closer so the LOS sits at about 55–60% of the field-view height, and zoom until OL are at least 26 CSS px. Use edge badges for anything wider. Benchmark: retrobowl-1.
7. **G-ui-defense-presnap** (ui, WS7, severity 3, effort S, +0.5). The defense has no on-field identification (`high/desktop/R05`, `medium/desktop/R05`). Fix: a ring on the user defender, red blitz arrows and coverage zones on the turf, and key-offensive-threat tags. Benchmark: madden26-2.
8. **G-lighting-falloff-haze** (lighting, WS1, severity 3, effort M, +0.5). The stands barely fall off with depth (`crops/high/R01-crowd`). There is no haze in the lamp cones, and the replay backdrops are flat (`high/desktop/R13`). Fix: a stronger vertical light gradient on the bleachers, a light-shaft or fog cone per lamp bank, and spill light on the walls behind the stands. Benchmark: cfb26-3.
9. **G-ui-plate-occludes** (ui, WS7, severity 2, effort S, +0.25). On desktop the result plate covers the pile and players (`high/desktop/R12`, `high/desktop/R14`). Fix: on desktop, move the plate to a lower-third strip of at most 60px, or into the empty side panel.
10. **G-typo-down-distance** (typography, WS7, severity 2, effort S, +0.25). Down and distance is the smallest scorebug text (`high/desktop/R04`). Fix: set it in the condensed display face, all caps, at the clock's size, as its own scorebug cell. Benchmark: axis-1.
11. **G-perf-phone-hitch** (mobile, WS7, severity 3, effort M, +0.25). The phone tier under 4× throttle has a 71.4 ms worst p95. Fix: profile the frame spikes (crowd matrix updates, GC, shader warm-up) and LOD or impostor the crowd on the phone tier.

```json
{
  "loop": 13,
  "role": "critic-claude",
  "tier": "high",
  "verdict": "continue",
  "scores": {
    "art": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "crops/high/R14-carrier", "note": "glossy helmets vs matte jerseys good; no faces under facemasks, mitt hands"},
        {"shot": "crops/high/R06-slot_C", "note": "sleeve-colored arm tubes, shell jerseys without folds, uniform builds"},
        {"shot": "crops/high/R04-slot_C", "note": "ballooned pants in 3-point stance"},
        {"shot": "crops/high/R01-crowd", "note": "crowd reads as people but identical heights/builds"},
        {"shot": "high/desktop/R15", "note": "giant cone-spike trees, small bleacher against bare wall"}
      ]
    },
    "lighting": {
      "score": 6.5,
      "confidence": 0.75,
      "evidence": [
        {"shot": "high/desktop/R01", "note": "lamp bloom, believable night exposure"},
        {"shot": "crops/high/R04-turf_26_67_42", "note": "multiple soft shadows per player"},
        {"shot": "high/desktop/R18", "note": "rain mostly darkens turf; no readable sheen at play distance"},
        {"shot": "crops/high/R18-turf_26_67_40", "note": "satin sheen visible only as one soft patch in close-up"},
        {"shot": "high/desktop/R13", "note": "flat unlit grey backdrop behind stands"}
      ]
    },
    "animation": {
      "score": 5.5,
      "confidence": 0.65,
      "evidence": [
        {"shot": "strips/high/R10", "note": "dive ends in upright cluster, no falls"},
        {"shot": "strips/high/R09", "note": "catch arm-up legible, then static idle, no tackle"},
        {"shot": "strips/high/R13", "note": "replay tackle shows carrier tipping over; best contact beat"},
        {"shot": "crops/high/R14-carrier", "note": "identical synchronized arms-up celebration"},
        {"shot": "crops/high/R11-carrier", "note": "good stride, ball not visible on camera side"}
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R04", "note": "numbered shaped badges and dashed route art, axis-1 class"},
        {"shot": "high/desktop/R05", "note": "defense pre-snap has no on-field identification"},
        {"shot": "high/desktop/R12", "note": "result plate covers pile and official"},
        {"shot": "high/desktop/R16", "note": "duplicate FG title in meter and panel; mostly empty side panel"}
      ]
    },
    "typography": {
      "score": 6.5,
      "confidence": 0.6,
      "evidence": [
        {"shot": "high/desktop/R21", "note": "clear two-line plate hierarchy in condensed display"},
        {"shot": "high/desktop/R04", "note": "down-and-distance is smallest scorebug text"},
        {"shot": "high/desktop/R22", "note": "play thumbnails ~70x42 px too small for route art"}
      ]
    },
    "readability": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R08", "note": "target badge + ring, oversized ball with trail"},
        {"shot": "high/desktop/R10", "note": "carrier buried in black-jersey cluster, found only by ring/tag"},
        {"shot": "high/desktop/R05", "note": "defenders ~25 px, unlabeled"},
        {"shot": "high/mobile/R08", "note": "ball and target readable on portrait"}
      ]
    },
    "mobile": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/mobile/R04", "note": "OL ~36 device px (~18 CSS); 40% of view empty downfield"},
        {"shot": "high/mobile/R10", "note": "carrier tag readable; large empty field above"},
        {"shot": "high/landscape/R10", "note": "landscape chase framing intentional, carrier well up"},
        {"shot": "high/mobile/R22", "note": "thumb-friendly play cards"},
        {"shot": "medium/mobile/R04", "note": "phone tier matches High framing; perf 40 fps min, 71 ms p95 under throttle"}
      ]
    },
    "authenticity": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "crops/high/R01-board", "note": "authentic HS scoreboard with DOWN/TO GO/BALL ON"},
        {"shot": "high/desktop/R20", "note": "3A Jessieville variant, ridge backdrop"},
        {"shot": "high/desktop/R14", "note": "end zone backs onto empty void"},
        {"shot": "crops/high/R01-crowd", "note": "no band, student section or cheer"}
      ]
    }
  },
  "gaps": [
    {"id": "G-anim-contact-falls", "category": "animation", "expectedGain": 1.0, "severity": 5, "effort": "L", "workstream": "WS4b", "evidence": ["strips/high/R10", "strips/high/R09", "strips/high/R13"], "benchmark": "madden26-4", "fix": "Add wrap-and-drive tackles with 2-3 varied falls (forward, side twist, pile-on) on every stop; defenders finish on the ground; play out the run-after-catch tackle before the result plate."},
    {"id": "G-art-player-identity", "category": "art", "expectedGain": 0.75, "severity": 4, "effort": "L", "workstream": "WS3", "evidence": ["crops/high/R14-carrier", "crops/high/R06-slot_C", "crops/high/R10-carrier"], "benchmark": "axis-3", "fix": "Add simple faces/skin under facemasks, skin or bare forearm between sleeve and separate glove geometry, normal-mapped jersey wrinkles/tuck, and per-position body scale (heavier OL/DL, leaner WR/DB)."},
    {"id": "G-venue-offangle-void", "category": "authenticity", "expectedGain": 0.75, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["high/desktop/R14", "high/desktop/R17", "high/desktop/R13", "high/desktop/R15"], "benchmark": "cfb26-2", "fix": "Dress end zones with fence/berm and track bend, add press box and a full visitor bleacher run, scale down the cone trees and push them behind the venue."},
    {"id": "G-auth-band-student", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["crops/high/R01-crowd", "high/desktop/R01"], "benchmark": "cfb26-1", "fix": "Add a uniformed band block, a student section in team shirts with signs, and cheer squad plus mascot on the track."},
    {"id": "G-rain-sheen-readable", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["high/desktop/R18", "high/desktop/R10", "crops/high/R18-turf_26_67_40"], "benchmark": "legendbowl-1", "fix": "View-dependent elongated lamp reflections on turf toward camera, brighter rain streaks inside lamp cones, splash puffs at cleats so wet reads at play distance."},
    {"id": "G-mobile-portrait-scale", "category": "mobile", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS7", "evidence": ["high/mobile/R04", "high/mobile/R10"], "benchmark": "retrobowl-1", "fix": "Tilt/close the portrait camera so LOS sits at ~55-60% of field-view height and OL reach >=26 CSS px; rely on edge badges for wide receivers."},
    {"id": "G-ui-defense-presnap", "category": "ui", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R05", "medium/desktop/R05"], "benchmark": "madden26-2", "fix": "Draw blitz arrows and coverage zones on the turf, ring the user-controlled defender, tag key offensive threats."},
    {"id": "G-lighting-falloff-haze", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R01-crowd", "high/desktop/R13"], "benchmark": "cfb26-3", "fix": "Stronger vertical light gradient on bleachers, haze/fog cone per lamp bank, spill light on walls behind stands."},
    {"id": "G-ui-plate-occludes", "category": "ui", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R12", "high/desktop/R14"], "fix": "On desktop move the result plate to a <=60 px lower-third strip or into the empty side panel so the pile stays visible."},
    {"id": "G-typo-down-distance", "category": "typography", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R04", "high/desktop/R07"], "benchmark": "axis-1", "fix": "Promote down-and-distance to its own scorebug cell in the condensed display face, all caps, at clock size."},
    {"id": "G-perf-phone-hitch", "category": "mobile", "expectedGain": 0.25, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["medium/mobile/R10", "medium/mobile/R04"], "fix": "Profile the 71 ms p95 spikes on the phone tier under 4x throttle (crowd matrix updates, GC, shader warm-up) and LOD/impostor the crowd."}
  ]
}
```
