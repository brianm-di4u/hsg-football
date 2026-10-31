# Critic A (critic-claude), loop 15, High tier

## Verdict
Friday Night Spa City is now a coherent, well-lit night game. Glossy decal helmets, satin pants and numbered matte jerseys hold up in close-ups. Multi-shadow stadium lighting and a strong condensed-type HUD put the desktop presentation near the Axis Football tier. The separation pass works: the `crops/high/R12-carrier` pile reads as separate bodies. What still stops it short of the gates is the same set of shortfalls in motion and staging.

- **Blocks.** Engaged linemen stand upright with their arms hanging, so a block reads as two players standing chest to back (`crops/high/R10-carrier`, `crops/high/R11-carrier`, `crops/high/R13-carrier`).
- **Run readability.** The dive carrier disappears into a static knot for most of `strips/high/R10`.
- **Officials and hands.** The officials are featureless mannequins, and every hand is a mitten.
- **Venue.** The background behind the end zones is a flat grey void, and no band, student section or cheer squad shows up in any capture.
- **Portrait framing.** It still loses the two wideouts. In `high/mobile/R04` and `medium/mobile/R04` receivers 1 and 2 are off-screen, shown only as edge-clamped badges with arrows. That contradicts the stated fix while the top ~55% of the portrait field is empty turf.

Verdict: **continue**.

## Scores

### Art: 6.0
- **Close-ups are the strength.** `crops/high/R04-slot_C` and `crops/high/R06-slot_DL2-side` show glossy helmets with stripe, decal and coloured facemask. The specular contrast against the matte jersey and the satin sheen on the pants is a real material split, and number/stripe trim is readable. Turf has grain and mow variation at field level (`crops/high/R04-turf_26_67_42`). The crowd reads as individual low-poly people with varied arm poses and two-tone shirts (`crops/high/R01-crowd`). The scoreboard is a credible built object (`crops/high/R01-board`).
- **Officials are crude.** In `crops/high/R03-slot_QB` (the ref fills the frame) the official is a tube-limbed mannequin. He has a featureless black head, no neck, no ears, no hands and a cap with no brim. The same model appears in `crops/high/R12-carrier`.
- **Hands are paddles.** Hands are mitten blobs everywhere: `crops/high/R06-slot_C-side` and the raised hands in `crops/high/R14-carrier`.
- **Visible faceting and one build.** The sleeve silhouette in `crops/high/R06-slot_C-side` is visibly faceted. All players share one body type (linemen and the kicker have identical builds in `crops/high/R16-slot_K`).
- **Thin venue at frame distance.** Behind the end zone there is a flat grey band and dark wall (`high/desktop/R14`, `high/desktop/R16`, `high/desktop/R04`).
- **Comparison.** Against axis-3, which has a full bowl, sideline dressing and sponsor boards, the close-up assets are on par but the frames are emptier. That is short of 7.

### Lighting & atmosphere: 6.5
- **What meets the 7 anchor:**
  - Real multi-directional soft shadows from the four light towers: fanned shadows under every player in `high/desktop/R02` and `high/desktop/R17`.
  - Lamp bloom (`high/desktop/R01`, `high/desktop/R07`).
  - Pooled light that falls off from the field centre to darker edges (`high/desktop/R17`).
  - Helmet specular kicks (`crops/high/R04-slot_C`).
  - Visible wet specular patches and splash dots on the turf in rain (`crops/high/R18-turf_26_67_40`).
  - Depth-of-field on the replay camera (`high/desktop/R15`).
- **What falls short:**
  - Rain at play distance (`high/desktop/R18`) is mostly streaks. The turf sheen is barely visible in the game frame.
  - Everything beyond the field is a flat, unlit grey plane or wall (`high/desktop/R14` behind the posts, `high/desktop/R16`). There is no light falloff into stands at the end zones because nothing is there.
  - The day-mist frame (`high/desktop/R19`) is washed to a uniform low-contrast grey-green with no sun direction.
- **Comparison.** Against axis-3 and cfb26-3: close to 7, but the void backgrounds and flat day grade keep it at 6.5.

### Animation & game feel: 5.5
- **Throw.** The wind-up in `crops/high/R07-slot_QB` is a legible ball-behind-head pose. In `strips/high/R07` the ball is already released by frame 2 and flies with a trail through frame 8. The drop itself cannot be read at strip scale.
- **Catch.** `strips/high/R09` frame 4 shows a punch-in and the receiver reaching with arms up, then the defender stumbling in frames 6–8. That is a legible beat. `crops/high/R09-slot_Z`, however, shows the defender's arm and helmet emerging directly behind #88's torso.
- **Tackle.** `strips/high/R13` frames 5–8 is a real two-man fall to the ground with the tackler on top. `crops/high/R12-carrier` shows the downed bodies now separated. Both are improvements.
- **Run play.** `strips/high/R10` frames 1–5 show nothing moving. OL and DL hold identical squats and the carrier is lost in the knot until the "NO GAIN" toast. In frames 6–8 the edge blockers are still in their squats.
- **Blocking poses.** In the close-ups (`crops/high/R10-carrier`, `crops/high/R11-carrier`) blockers are upright with their arms at their sides. The defenders' blue arms poke out from behind them, so there is no hand fighting, lean or leg drive.
- **Feel touches.** Rain splash, the catch punch-in and replay DoF are present. There is no slow-mo or impact particles at the tackle.
- **Comparison.** Against the 7 anchor, contact and blocks are the shortfall.

### UI / HUD: 6.5
- **What works:**
  - The scorebug is consistent and clean, with team colour bars, a possession football and a centred clock and down (`high/desktop/R04`).
  - Pre-snap ID is good: numbered shape badges, dashed route art, a painted "1ST & 10" and blue LOS / yellow line-to-gain (`high/desktop/R04`, `high/desktop/R19`). The badges are comparable to axis-1.
  - Result banners have a two-level hierarchy (`high/desktop/R21`, `high/desktop/R14`).
- **What falls short:**
  - The blitz arrows in `high/desktop/R05` are a red tangle over the line and are hard to parse.
  - `high/desktop/R16` duplicates "FIELD GOAL · 45 YD" in the on-field meter and the side panel.
  - The right panel is mostly empty dark space in `high/desktop/R05`, `high/desktop/R16` and `high/desktop/R14`.
  - Timeouts are three dots with no label.
  - The result toast sits over live bodies. A helmet peeks over the toast edge in `medium/mobile/R14`, and figures show through the toast in `high/desktop/R12`.
- **Comparison.** Against madden26-1 and axis-1: good but not broadcast-grade.

### Typography: 7.0
- One consistent condensed display face for headings, team names, toasts and buttons, paired with a clean sans for body copy (`high/desktop/R22`, `high/desktop/R04`).
- Numerals in the scorebug and clock read instantly. "TOUCHDOWN!" has deliberate tracking and a gold accent (`high/desktop/R14`).
- Play cards have a clear name / description / RUN-PASS tag scale (`high/desktop/R22`, `medium/mobile/R22`). Nothing is clipped in any frame I checked.
- Minor issues: the "HOME" tag is tiny, the play log runs to 3 lines at small size, and the in-world scoreboard labels are illegible at frame scale.
- Meets the madden26-3 / legendbowl-4 bar at a basic level.

### Readability: 6.5
- **Desktop works.** At 1280 × 800, standing players measure about 40 px and crouched linemen about 27 px (measured from `high/desktop/R04`). The ball is drawn enlarged with a white trail: about 17 px against about 45 px players in `high/desktop/R08`, which is oversized but easy to find. The carrier gets a ground ring and name tag (`high/desktop/R10`), and the LOS and line to gain are always drawn.
- **Runs are hard to follow.** The dive carrier sits at the very bottom of the frame and inside the pile through `strips/high/R10` frames 1–5.
- **Phone portrait is the weak point.** Linemen measure about 30 device px (about 15 CSS px) in `medium/mobile/R04`, and the two outside receivers are not on screen at all (`high/mobile/R04`).
- **Comparison.** retrobowl-1 shows every route and player at the same time.

### Mobile: 6.0
- **Phone-tier performance passes.** Medium (the phone tier) holds 98 fps minimum with a 17.8 ms worst p95 under 4× CPU throttle, comfortably above 30.
- **Landscape is intentional.** Players are about 30–40 CSS px in `medium/landscape/R10`, receivers and badges are all in frame (`medium/landscape/R04`), and thumb-sized buttons sit in the side rail. The huddle is cropped at the bottom edge in `medium/landscape/R22`.
- **Portrait fails the framing test.**
  - In `medium/mobile/R04` and `high/mobile/R04`, receivers 1 and 2 are off the left and right edges. Only clamped badges with arrows show (I zoomed both edges: the only bodies there are white Lakeside defenders).
  - Receiver 1's route is not drawn at all.
  - The top ~55% of the viewport is empty turf between the 10 and the 50.
  - Linemen are about 15 CSS px.
- **Portrait positives.** Buttons are large and the play-call grid is clean (`medium/mobile/R22`). The run view (`medium/mobile/R10`, `medium/mobile/R18`) is acceptable.
- **Comparison.** Against retrobowl-1, portrait pre-snap is not intentional framing.

### Authenticity: 6.0
- **What is right:**
  - Strong Spa City identity: Bathhouse Dive, Central Avenue Sweep, Promenade Slants, Arlington Verticals, Tufa Ridge (`high/desktop/R22`, `high/desktop/R20`).
  - Ouachita-style hills and pines (`high/desktop/R15`, `high/desktop/R06`).
  - A field house behind the Wolf Stadium end zone (`high/desktop/R03`).
  - An HS-style scoreboard with HSHS/LHHS and DOWN / TO GO / BALL ON (`crops/high/R01-board`).
  - Wide NFHS hashes, H-goalposts, end-zone wordmarks, a team bench row on each sideline, and a single home grandstand plus a small visitor stand (`high/desktop/R01`, `high/desktop/R13`).
- **What is missing:** Nowhere in any capture is there a band, cheerleaders, a distinct student section, a fence or track ring around the whole field, or anything behind the end zones (`high/desktop/R14`, `high/desktop/R04`).
- **Comparison.** cfb26-1/2 show the band and student section as the signature of the night. On the 3A Jessieville frame (`high/desktop/R20`) only a sliver of stand is visible.

## Ranked gaps

1. **G-block-engagement-poses** (animation, WS4, severity 4, effort M, expected gain +0.5 animation, +0.2 readability)
   - Problem: engaged OL/DL are upright with arms down and DL arms clip out behind OL torsos (`crops/high/R10-carrier`, `crops/high/R11-carrier`, `crops/high/R13-carrier`). `strips/high/R10` is a frozen squat knot for 5 frames.
   - Fix: add pass-pro and run-block poses (hips low, torso lean of 20–30°, both hands extended to the opponent's chest plate, feet staggered and planted). Drive the pair a few inches per tick toward the winner and IK the hands to the opponent's chest.
2. **G-portrait-wideouts-offscreen** (mobile, WS7, severity 4, effort S, expected gain +0.5 mobile, +0.3 readability)
   - Problem: in portrait pre-snap, receivers 1 and 2 are off-screen and only edge arrows show (`high/mobile/R04`, `medium/mobile/R04`), while the upper ~55% of the frame is empty turf.
   - Fix: fit the camera to the formation's x-extent (widest receiver ± 3 yd) in screen space, not only by distance cap. Shift the look-at target downfield so the LOS sits at about 65% of the viewport height, and use the freed vertical space to zoom in. Linemen should reach 22+ CSS px.
3. **G-endzone-void-and-venue-dressing** (authenticity, WS2, severity 3, effort M, expected gain +0.5 authenticity, +0.2 lighting, +0.2 art)
   - Problem: the background behind both end zones is a flat grey plane and wall (`high/desktop/R14`, `high/desktop/R16`, `high/desktop/R04`).
   - Fix: add an end-zone berm or bleacher with standing fans, a chain-link fence and a track ring that wraps the end zones. Add lit concessions or a field house per venue, and a band block plus a student section in the home stand (with a different shirt colour and density). Add a cheer squad on the track at the home sideline.
4. **G-official-and-hand-models** (art, WS3, severity 3, effort M, expected gain +0.4 art)
   - Problem: officials are featureless mannequins with no hands, neck or cap brim (`crops/high/R03-slot_QB`, `crops/high/R12-carrier`). Player hands are mittens (`crops/high/R14-carrier`, `crops/high/R06-slot_C-side`).
   - Fix: give the official a head with ears and neck, a cap with a brim, a black belt and white shoes. Give everyone simple gloved hands with a split thumb and grouped fingers, and smooth-shade or add loops to the upper-arm and sleeve geometry.
5. **G-run-carrier-framing** (readability, WS7, severity 3, effort S, expected gain +0.3 readability, +0.2 animation)
   - Problem: during the dive the carrier sits on the bottom edge and inside the cluster (`strips/high/R10` frames 1–5, `high/desktop/R10`).
   - Fix: on live runs, keep the carrier at about 35% from the bottom with a slightly higher camera. Add a short carrier silhouette outline or rim when he is occluded by more than 50%.
6. **G-tackle-feel** (animation, WS4b, severity 3, effort M, expected gain +0.3 animation)
   - Problem: the tackle fall in `strips/high/R13` reads, but the impact has no accent.
   - Fix: on first contact, add a 2–3 frame hit-pause, a small dust or turf puff at the feet (rain spray in wet games), and a camera nudge. Vary the fall direction by approach angle.
7. **G-ui-redundancy-and-empty-rail** (ui, WS7, severity 2, effort S, expected gain +0.3 ui)
   - Problem: the FG meter and the side panel both say "FIELD GOAL · 45 YD" (`high/desktop/R16`). The rail is empty below the buttons (`high/desktop/R05`, `high/desktop/R14`). The blitz arrows are a red tangle (`high/desktop/R05`). Toasts cut through bodies (`medium/mobile/R14` helmet over the toast edge).
   - Fix: drop the panel duplicate and use the rail for drive summary or matchup info. Draw blitz paths as short curved arrows with an outlined stroke and fade the overlapping ones. Raise the result camera a little more on portrait, or fade the toast background to opaque.
8. **G-closeup-camera-occlusion** (art, WS7, severity 2, effort S, expected gain +0.2 art)
   - Problem: replay and close-up cameras land inside or behind other bodies. `crops/high/R03-slot_QB` is fully blocked by the ref, `crops/high/R06-slot_C-side` has a blown-out helmet clipping the near plane, and in `crops/high/R06-slot_LG` a shoulder fills a third of the frame.
   - Fix: raycast from the camera to the target, push the camera along an orbit until the line is clear, and set a near-plane fade on bodies within 1 m.
9. **G-rain-sheen-at-play-distance** (lighting, WS5, severity 2, effort S, expected gain +0.2 lighting)
   - Problem: the wet sheen is visible in `crops/high/R18-turf_26_67_40` but barely in `high/desktop/R18`.
   - Fix: raise turf roughness contrast in rain so the light-tower reflections streak across the field at gameplay distance, and add darker wet jersey and helmet highlights.

```json
{
  "loop": 15,
  "role": "critic-claude",
  "tier": "high",
  "scores": {
    "art": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "crops/high/R04-slot_C", "note": "glossy decal helmets, coloured facemasks, satin pants vs matte jersey: real material split"},
        {"shot": "crops/high/R03-slot_QB", "note": "official is a featureless tube mannequin: no hands, neck, ears or cap brim"},
        {"shot": "crops/high/R06-slot_C-side", "note": "mitten hands, faceted sleeve silhouette"},
        {"shot": "crops/high/R01-crowd", "note": "crowd reads as individual people"},
        {"shot": "high/desktop/R14", "note": "flat grey void behind the end zone"}
      ]
    },
    "lighting": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R02", "note": "multi-directional soft shadows from four towers"},
        {"shot": "high/desktop/R01", "note": "lamp bloom, field falloff"},
        {"shot": "crops/high/R18-turf_26_67_40", "note": "wet specular patches and splash dots, but faint in high/desktop/R18"},
        {"shot": "high/desktop/R19", "note": "day mist washes to flat low contrast"},
        {"shot": "high/desktop/R16", "note": "unlit grey plane and wall beyond the end zone"}
      ]
    },
    "animation": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "strips/high/R10", "note": "frames 1-5 static squat knot, carrier lost; edge blockers still squatting in 6-8"},
        {"shot": "strips/high/R13", "note": "frames 5-8 legible two-man fall to the ground"},
        {"shot": "strips/high/R09", "note": "frame 4 punch-in, receiver reaches; defender stumble 6-8"},
        {"shot": "crops/high/R10-carrier", "note": "blockers upright, arms hanging, DL arms poke from behind OL"},
        {"shot": "crops/high/R07-slot_QB", "note": "legible wind-up pose"}
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R04", "note": "clean scorebug, numbered shape badges, route art, painted down and distance"},
        {"shot": "high/desktop/R05", "note": "blitz arrows tangle; empty rail"},
        {"shot": "high/desktop/R16", "note": "FIELD GOAL 45 YD duplicated in meter and panel"},
        {"shot": "high/desktop/R21", "note": "result banner with hierarchy"},
        {"shot": "medium/mobile/R14", "note": "helmet peeks over the toast edge"}
      ]
    },
    "typography": {
      "score": 7.0,
      "confidence": 0.65,
      "evidence": [
        {"shot": "high/desktop/R22", "note": "condensed display plus sans body, clear name/desc/tag scale"},
        {"shot": "high/desktop/R14", "note": "tracked gold TOUCHDOWN! display, readable numerals"},
        {"shot": "medium/mobile/R22", "note": "scale holds on phone, nothing clipped"}
      ]
    },
    "readability": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R08", "note": "enlarged ball with trail, target ring, receiver badge"},
        {"shot": "high/desktop/R04", "note": "standing players ~40 px, crouched linemen ~27 px; LOS and line to gain clear"},
        {"shot": "strips/high/R10", "note": "carrier on the bottom edge and buried in the cluster"},
        {"shot": "high/mobile/R04", "note": "receivers 1 and 2 off-screen, edge arrows only"}
      ]
    },
    "mobile": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "medium/mobile/R04", "note": "WR1/WR2 off-screen; top ~55% empty turf; linemen ~15 CSS px"},
        {"shot": "medium/landscape/R10", "note": "landscape framing intentional, players ~30-40 CSS px"},
        {"shot": "medium/mobile/R22", "note": "thumb-sized play cards and buttons"},
        {"shot": "medium/landscape/R22", "note": "huddle cropped at the bottom edge"},
        {"shot": "perf medium mobile 4x throttle", "note": "98 fps min, 17.8 ms p95: passes 30 fps"}
      ]
    },
    "authenticity": {
      "score": 6.0,
      "confidence": 0.65,
      "evidence": [
        {"shot": "high/desktop/R22", "note": "Spa City play names and local flavour"},
        {"shot": "crops/high/R01-board", "note": "HS-style scoreboard"},
        {"shot": "high/desktop/R03", "note": "field house behind the end zone, H posts, wide hashes"},
        {"shot": "high/desktop/R14", "note": "nothing behind the end zone; no band, students or cheer anywhere"},
        {"shot": "high/desktop/R20", "note": "3A venue shows only a sliver of stands"}
      ]
    }
  },
  "gaps": [
    {"id": "G-block-engagement-poses", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS4", "evidence": ["crops/high/R10-carrier", "crops/high/R11-carrier", "strips/high/R10"], "benchmark": "axis-3", "fix": "Pass-pro and run-block poses: hips low, 20-30 deg lean, hands IK'd to the opponent's chest, staggered planted feet; drift the pair toward the winner each tick."},
    {"id": "G-portrait-wideouts-offscreen", "category": "mobile", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS7", "evidence": ["high/mobile/R04", "medium/mobile/R04"], "benchmark": "retrobowl-1", "fix": "Fit the portrait pre-snap camera to the widest receiver x-extent +/-3 yd in screen space, put the LOS at ~65% of viewport height and zoom into the freed space so linemen reach 22+ CSS px."},
    {"id": "G-endzone-void-and-venue-dressing", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["high/desktop/R14", "high/desktop/R16", "high/desktop/R04"], "benchmark": "cfb26-2", "fix": "End-zone berm or bleachers with fans, fence and track ring around the end zones, a band block and a student section in the home stand, a cheer squad on the home track."},
    {"id": "G-official-and-hand-models", "category": "art", "expectedGain": 0.4, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["crops/high/R03-slot_QB", "crops/high/R12-carrier", "crops/high/R14-carrier"], "benchmark": "axis-3", "fix": "Official head with neck and ears, a brimmed cap, belt and shoes; gloved hands with a split thumb for all; smooth or add loops to the upper-arm and sleeve geometry."},
    {"id": "G-run-carrier-framing", "category": "readability", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["strips/high/R10", "high/desktop/R10"], "benchmark": "madden26-1", "fix": "Keep the carrier ~35% up from the bottom on live runs with a slightly higher camera; outline the carrier when occluded >50%."},
    {"id": "G-tackle-feel", "category": "animation", "expectedGain": 0.3, "severity": 3, "effort": "M", "workstream": "WS4b", "evidence": ["strips/high/R13", "crops/high/R13-carrier"], "benchmark": "madden26-4", "fix": "2-3 frame hit-pause at first contact, turf or spray puff, camera nudge, fall direction varied by approach angle."},
    {"id": "G-ui-redundancy-and-empty-rail", "category": "ui", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R16", "high/desktop/R05", "medium/mobile/R14"], "benchmark": "madden26-3", "fix": "Remove the duplicated FG label, use the empty rail for drive or matchup info, draw blitz paths as short outlined curves, keep bodies clear of the toast edge."},
    {"id": "G-closeup-camera-occlusion", "category": "art", "expectedGain": 0.2, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["crops/high/R03-slot_QB", "crops/high/R06-slot_C-side", "crops/high/R06-slot_LG"], "benchmark": "cfb26-4", "fix": "Raycast camera to target and orbit until clear; fade bodies within 1 m of the near plane."},
    {"id": "G-rain-sheen-at-play-distance", "category": "lighting", "expectedGain": 0.2, "severity": 2, "effort": "S", "workstream": "WS5", "evidence": ["high/desktop/R18", "crops/high/R18-turf_26_67_40"], "benchmark": "cfb26-3", "fix": "Lower turf roughness and increase reflection contrast in rain so tower streaks show at gameplay distance; darken and gloss wet jerseys and helmets."}
  ],
  "verdict": "continue"
}
```
