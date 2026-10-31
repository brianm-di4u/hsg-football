# Critic A (critic-claude): loop 8, High tier, desktop

## Verdict
This is a competent, consistent stylised football game, and it still sits clearly below the Axis 2026 bar the rubric anchors at 7. The HUD family, pre-snap route art, real school identities (Trojans and Wolves end zones, HSHS/LHHS scoreboard) and the night sky all hold up. The phone portrait layout is the most finished part of the game: edge-clamped receiver badges with chevrons, and a carrier plate that sits under the feet. These problems cap the score:
- **Players.** Up close they are still smooth mannequins: rounded seats, tube arms and faceless officials.
- **Venue.** Behind the end zones and the visitor side it is a flat grey wall with black cone trees.
- **Animation beats.** Contact, catch and ball-in-hand don't read in any strip or carrier close-up.
- **Lighting.** It is pleasant but even, and on High the lamps become shapeless bloom blobs with a milky veil.

This loop's headline changes land only partly:
- **R01 kickoff shot.** The crowd is a 14% sliver at the left edge, not the top third.
- **Lamp spill.** It reads as a flat khaki band, not a gradient.
- **Phone badges and carrier plate.** These work as described.

Nothing gates except authenticity (6.0). **Continue.**

## Scores

### Art: 6.0
- **Players.** In close-ups the gear reads: helmet sheen against matte jerseys, sleeve stripes, numbers and facemasks (`crops/high/R04-slot_C`, `crops/high/R06-slot_C`, `crops/high/R07-slot_QB`). But the bodies are inflated mannequins.
  - The lineman seat is still a large orange bulb that is wider than the hips in a stance (`crops/high/R04-slot_C` #69, `crops/high/R06-slot_C` #66/#73/#56), even after this loop's narrowing.
  - Lakeside's arms are solid royal blue from shoulder to fingertip and read as rubber gloves (`crops/high/R04-slot_C` #57). The home team's are pale grey-white tubes (`crops/high/R06-slot_DL2-side`, `crops/high/R06-slot_C-side`).
- **Officials.** They are primitive: a faceless black head, a striped box torso with sleeve blocks that read as separate pieces, and a bulbous seat (`crops/high/R03-slot_QB`, which is also blocked by the ref and so shows nothing of the QB).
- **Crowd.** It reads as people at close range, but as low-poly mannequins with identical raised-arm poses (`crops/high/R01-crowd`).
- **Venue.** It is thin:
  - A blank grey wall or plane fills the space behind the far end zone (`high/desktop/R01`, `high/desktop/R07`, `high/desktop/R13`).
  - Trees are untextured black cones (`crops/high/R06-slot_C`, `crops/high/R13-carrier`, `high/desktop/R15`).
  - The visitor side is a single low bleacher box against a grey void (`high/desktop/R13`).
- **Turf.** It has fine texture at field level (`crops/high/R04-turf_26_67_42`).
- **Benchmark.** axis-3 has realistic proportions, a full bowl, sponsor boards and dugout dressing. This is a notch below it, and below legendbowl-1's style-consistent 7, because the officials and the backdrop break the style.

### Lighting & atmosphere: 6.5
- **What works.**
  - A good dusk sky with lamp halos (`high/desktop/R03`, `high/desktop/R04`, `high/desktop/R22`).
  - Doubled soft shadows under players from several towers (`crops/high/R08-ball`, `crops/high/R04-turf_26_67_42`).
  - Rim light on helmets in close-ups (`crops/high/R06-slot_DL2-side`).
  - A believable day-mist variant (`high/desktop/R19`).
- **Bloom.** On High the lamps bloom into featureless white blobs, while Medium still shows the lamp racks (`high/desktop/R04` vs `medium/desktop/R04`). With a tower just off-frame, a large milky veil washes the top corners and greys out the sky and the wall (`high/desktop/R07`, `strips/high/R07` all 8 frames, `strips/high/R09` frames 1–3).
- **New lamp spill.** It reads as a uniformly lit khaki apron that then cuts to black, not a falloff (`high/desktop/R02`, `high/desktop/R17`, `high/desktop/R01`).
- **Field and stands.** The field is evenly lit edge to edge, with no hot pools under towers, and the stands are dark boxes with no light catching the crowd (`high/desktop/R13`).
- **Rain.** It shows streaks and one specular hotspot, but the turf, helmets and jerseys don't look wet (`high/desktop/R18`, `crops/high/R18-turf_26_67_40`).
- **Benchmark.** It falls short of axis-3 / cfb26-3 on falloff from field to stands and on wet sheen.

### Animation & game feel: 5.5
- **Catch (`strips/high/R09`).** There is a camera punch-in at frame 4 and a "+7 YD" toast at frames 6–8. But the catch itself is not legible:
  - Frames 1–3 are a distant cluster.
  - Frames 6–8 are near-identical frames of two bodies lying flat.
  - The close-up shows the defender's legs passing through the receiver's (`crops/high/R09-slot_Z`).
- **Tackle replay (`strips/high/R13`).** There is no visible contact beat. "20 KEMP" just merges into a cluster and the frames barely differ.
- **Tackle result (`crops/high/R12-carrier`).** The downed bodies interpenetrate (white #47 fused through blue #20).
- **Runs.** In `strips/high/R10` and `strips/high/R11` the carrier slides laterally at broadcast distance, with no readable plant-and-cut or lean. The carrier close-ups show no ball in the runner's hands (`crops/high/R10-carrier`, `crops/high/R11-carrier`).
- **QB.** The wind-up pose is good: ball cocked, off arm out (`crops/high/R07-slot_QB`). But at chase distance the drop is a few pixels and can't be judged (`strips/high/R07`).
- **Stances.** They plant feet and hinge at the hips (`crops/high/R06-slot_DL2-side`).
- **Benchmark.** This is rubric 5–6: cycles read, contact is floaty, falls are stiff and clip. It is far from the planted, contact-driven motion in cfb26-4 / madden26-4.

### UI / HUD: 6.5
- **What works.**
  - A broadcast-style scorebug with team colours, possession football and down/distance (`high/desktop/R04`).
  - Numbered and shaped receiver icons on the field match the panel diagram, which is close to axis-1 (`high/desktop/R04`, `high/desktop/R19`).
  - Result banners have a clear two-line hierarchy (`high/desktop/R12`, `high/desktop/R21`).
- **Banner overlaps.** On desktop the TOUCHDOWN banner sits over the goalpost and the 3D scoreboard, and the board is cut by the top edge (`high/desktop/R14`). In landscape every top banner covers the 3D scoreboard (`high/landscape/R12`, `high/landscape/R21`, `high/landscape/R14`).
- **Dead space during live play.** The right panel takes 28% of the desktop width with just a JUKE button and a hint line over about 400 px of empty navy (`high/desktop/R08`, `high/desktop/R10`, `high/desktop/R11`).
- **Defense.** There is no on-field defender ID or coverage art, only a panel diagram, against madden26-1's WILL/MIKE/SAM boxes (`high/desktop/R05`).
- **Play list.** It fades item 0 at the bottom with no visible scroll affordance (`high/desktop/R22`).
- **Possible rules or display bug, worth a check.** `high/desktop/R21` shows "+7 YD · FIRST DOWN" and "Next: 1st & 10 · own 37" after a 7-yard dive from the own 30. `high/desktop/R22`, with the same drive state, shows 1st & 10 at the own 30. If that capture didn't stage a later down, the toast is wrong.

### Typography: 6.5
- **What works.** A consistent condensed display face (Oswald-like) for the scorebug, banners and play names, with a sans for body text. Numerals in the scorebug and clock read at a glance (`high/desktop/R04`, `high/desktop/R21`).
- **Casing and scale drift.**
  - The HUD centre reads "1st & 10 · own 37" while the panel reads "1ST & 10 · OWN 37" for the same fact (`high/desktop/R21`, `high/mobile/R21`).
  - Panel body and log text is about 13–14 px in mid-grey on navy, which is low hierarchy and low contrast (`high/desktop/R12` log).
- **3D scoreboard.** Its label type is unreadably small at play distance (`high/desktop/R04`), though it is fine in `crops/high/R01-board`.
- **Field-goal meter.** Fine, now duplicated in panel and meter (`high/desktop/R16`).
- **Benchmark.** Short of madden26-3 / cfb26-1 type-scale discipline.

### Readability: 6.5
- **Line of scrimmage and line to gain.** Both read in every frame (blue and yellow lines).
- **Carrier.** The ring and name plate are clear on desktop and phone (`high/desktop/R10`, `high/mobile/R10`).
- **Ball in flight.** It is a dark ellipse with a target ring under the receiver (`high/desktop/R08`, `high/mobile/R08`). But it is small, untrailed and dark against dark-jerseyed players, and the ball close-up doesn't show the ball at all (`crops/high/R08-ball`).
- **Player size and contrast.** At the desktop chase distance players are about 30 px tall. The black home jerseys merge into their own shadows in a pile (`strips/high/R10` frames 6–8, `high/desktop/R07`).
- **Live play.** Pre-snap receiver tags disappear after the snap, so in `high/desktop/R08` you cannot tell which slant runner is the intended target until the ring appears.
- **Benchmark.** Near retrobowl-1 / axis-1 pre-snap, short of them live.

### Mobile: 6.5
- **Portrait framing is intentional.**
  - A tall chase view with big HIKE and JUKE buttons (`high/mobile/R04`, `high/mobile/R10`).
  - Edge-clamped badges #2 and #3 stack, with chevrons that separate them from the yard numbers (`high/mobile/R04`).
  - The plate under the feet clears the defenders (`high/mobile/R10`).
  - The two-column play cards are thumb-sized (`high/mobile/R22`).
- **Defects.**
  - The TD shot clips the 3D scoreboard at the right edge ("L…", "BALL 2…") (`high/mobile/R14`).
  - Landscape top banners cover the scoreboard and posts (`high/landscape/R12`, `high/landscape/R14`, `high/landscape/R21`).
  - The landscape side panel uses about 30% of the width, mostly empty during live play (`high/landscape/R08`, `high/landscape/R10`).
  - Portrait players are about 15 CSS px tall, so jersey numbers are unreadable (`high/mobile/R08`).
- **Performance.** Medium (the phone tier) holds 109 fps minimum at 4× throttle. High phone p95 is 34.1 ms, just over 30 fps p95.
- **Benchmark.** Close to retrobowl-1/2 in intent. It needs the overlaps fixed.

### Authenticity: 6.0
- **What works.**
  - Real Spa City programmes: Hot Springs "TROJANS" end zone (`high/mobile/R22`), Lake Hamilton "WOLVES" (`high/desktop/R03`), Lakeside rams logo, Jessieville purple (`high/desktop/R20`).
  - A high-school style board (`crops/high/R01-board`).
  - Light towers, team benches on both sidelines, a pine-and-ridge backdrop, and capped officials.
- **What's missing or wrong.**
  - No band, student section or cheer squad in any capture.
  - The visitor stands are one small box against a grey wall (`high/desktop/R13`, `high/desktop/R15`).
  - The new establishing shot shows the home crowd as a sliver clipped at the left edge, not the "top third" (`high/desktop/R01`).
  - The punt is staged as a kickoff, with an 11-man line spread across the field (`high/desktop/R17` vs `high/desktop/R02`).
  - The FG unit reads as one interleaved row of offense and defense with no neutral zone (`high/desktop/R16`).
- **Benchmark.** cfb26-1/2 and legendbowl-4 sell the occasion. Here the venue reads as a generic lit field.

## Low and Medium regression check
- **Medium** matches High in content. It loses the High bloom blobs: lamp racks are visible (`medium/desktop/R01`, `medium/desktop/R04`). No new regressions in `medium/mobile/R04`, `medium/mobile/R10`, `medium/desktop/R18` or `strips/medium/R13`.
- **Low:**
  - It now gets the low R01 camera too (`low/desktop/R01`).
  - The defenders' chest numbers render mirrored ("06" and "53" where High shows 90 and 53 the right way round) (`crops/low/R04-slot_C`).
  - The ball is a near-spherical black ball (`crops/low/R04-slot_C`).
  - Otherwise it is the v2 look with no new breakage (`low/desktop/R04`, `low/mobile/R04`, `low/landscape/R12`).

## Ranked gaps
1. **G-contact-beats** (animation, WS4b, severity 5, effort L, +1.0).
   - **Problem.** Tackle, catch and pile contact are illegible and bodies interpenetrate (`strips/high/R13`, `strips/high/R09`, `crops/high/R12-carrier`, `crops/high/R09-slot_Z`).
   - **Fix.**
     - Paired contact poses: wrap and drive for the tackler, absorb and fall for the carrier.
     - A 3–4 frame hit-stop plus 0.3 s slow motion at contact.
     - A capsule separation pass so downed bodies stack instead of fusing.
     - Replay camera framing tightened on the contact point.
2. **G-venue-backdrop** (authenticity/art, WS2, severity 4, effort M, +0.5 authenticity, +0.5 art).
   - **Problem.** Grey wall planes behind both end zones, black cone trees and a single tiny visitor bleacher (`high/desktop/R01`, `high/desktop/R13`, `high/desktop/R15`, `crops/high/R06-slot_C`).
   - **Fix.**
     - A real visitor bleacher with crowd, a press box on the home side, and a chain-link fence and field house behind the end zones.
     - Textured tree cards with lamp rim light.
3. **G-band-student-section** (authenticity, WS2, severity 4, effort M, +0.5).
   - **Problem.** None visible anywhere.
   - **Fix.** A uniformed band block in the home stands, a student-section block with a uniform shirt colour and props, and cheerleaders on the track. Show them in the R01 establishing shot and the TD shot.
4. **G-ball-visibility** (readability, WS4, severity 4, effort S, +0.4).
   - **Problem.** The ball doesn't appear in the carrier and ball close-ups (`crops/high/R10-carrier`, `crops/high/R11-carrier`, `crops/high/R08-ball`) and is dark and small in flight (`high/desktop/R08`).
   - **Fix.**
     - Tuck the ball to the outside arm.
     - Add a subtle light rim or white stripe to the ball material.
     - Add a short faint trail in flight.
     - Aim the ball close-up camera at the ball's world position.
5. **G-banner-overlap** (ui/mobile, WS7, severity 3, effort S, +0.3 ui, +0.3 mobile).
   - **Problem.** Top banners cover the 3D scoreboard and posts (`high/landscape/R12`, `high/landscape/R14`, `high/landscape/R21`, `high/desktop/R14`), and the TD camera clips the board (`high/mobile/R14`).
   - **Fix.**
     - In landscape, anchor result banners at the bottom of the field view as on desktop.
     - Frame the TD camera so the board is either fully in or fully out.
6. **G-official-model** (art, WS3, severity 3, effort M, +0.3).
   - **Problem.** Faceless primitive officials (`crops/high/R03-slot_QB`).
   - **Fix.** Put the official on the player body with a face, a cap brim, sleeves attached to the shirt, black knickers or pants, a whistle and a flag.
7. **G-body-silhouette** (art, WS3, severity 3, effort M, +0.3).
   - **Problem.** Bulb seats in stance (`crops/high/R04-slot_C`, `crops/high/R06-slot_C`) and full-length coloured arms.
   - **Fix.**
     - Cut the seat volume further so it is no wider than the hips.
     - Give all players short sleeves with skin-tone forearms and separate gloves.
     - Vary body types by position.
8. **G-high-bloom-veil** (lighting, WS1, severity 3, effort S, +0.3).
   - **Problem.** The lamp heads become blobs on High (`high/desktop/R04` vs `medium/desktop/R04`), and a milky veil washes the frame when a tower is just off-screen (`strips/high/R07`).
   - **Fix.**
     - Clamp lamp emissive so the rack geometry survives.
     - Narrow the bloom radius.
     - Fade the fog in-scatter toward off-screen lamps.
9. **G-field-to-stand-falloff** (lighting, WS1, severity 3, effort M, +0.3).
   - **Problem.** An even field and a flat khaki apron (`high/desktop/R02`, `high/desktop/R17`).
   - **Fix.**
     - Pools of light under each tower on the field.
     - A true radial falloff on the apron and track.
     - Spill on the front rows of the crowd.
10. **G-rain-wetness** (lighting, WS5, severity 2, effort M, +0.3).
    - **Problem.** One hotspot and no general sheen (`crops/high/R18-turf_26_67_40`).
    - **Fix.**
      - Darken the turf albedo and lower its roughness in rain, with elongated lamp streaks.
      - Wet speculars on helmets.
      - Splash particles at the players' feet.
11. **G-live-panel-dead-space** (ui/readability, WS7, severity 2, effort S, +0.3 ui).
    - **Problem.** About 400 px of empty panel during live play (`high/desktop/R08`, `high/desktop/R10`).
    - **Fix.**
      - Collapse the panel after the snap so the field is full width.
      - Move JUKE to an on-field pill.
      - Keep the receiver numbers after the snap.
12. **G-r01-crowd-framing** (authenticity, WS7, severity 2, effort S, +0.2).
    - **Problem.** The home crowd is a 14% sliver (`high/desktop/R01`).
    - **Fix.** Turn the camera about 30° or move it wider so the grandstand and tower fill the left third.
13. **G-special-teams-staging** (authenticity, WS4, severity 2, effort M, +0.2).
    - **Problem.** The punt looks like a kickoff (`high/desktop/R17`), and the FG unit has no neutral zone (`high/desktop/R16`).
    - **Fix.**
      - A spread punt formation with the punter 13–15 yd deep and gunners released.
      - FG defenders set 1 yd off the ball.
14. **G-type-casing** (typography, WS7, severity 2, effort S, +0.2).
    - **Problem.** "1st & 10 · own 37" vs "1ST & 10 · OWN 37" (`high/desktop/R21`).
    - **Fix.**
      - One casing rule for down and distance.
      - Lift the body and log text to 15 px with brighter grey.
15. **G-low-mirrored-numbers** (art, WS3, severity 1, effort S, +0).
    - **Problem.** Mirrored chest numbers on Low (`crops/low/R04-slot_C`).
    - **Fix.** Flip the front-number UVs on the Low mesh.

```json
{
  "loop": 8,
  "role": "critic-claude",
  "tier": "high",
  "scores": {
    "art": { "score": 6.0, "confidence": 0.75, "evidence": [
      { "shot": "crops/high/R04-slot_C", "note": "glossy helmet vs matte jersey reads; lineman seat still a bulb wider than hips; Lakeside arms solid blue to fingertips" },
      { "shot": "crops/high/R03-slot_QB", "note": "official is a faceless primitive with detached-looking sleeve blocks; blocks the QB target" },
      { "shot": "crops/high/R01-crowd", "note": "crowd reads as people but identical low-poly raised-arm figures" },
      { "shot": "high/desktop/R13", "note": "visitor side is a single low bleacher box against a flat grey wall" },
      { "shot": "crops/high/R06-slot_C", "note": "untextured black cone trees; inflated rounded seats in stance" },
      { "shot": "crops/high/R04-turf_26_67_42", "note": "turf texture holds at field level" }
    ]},
    "lighting": { "score": 6.5, "confidence": 0.7, "evidence": [
      { "shot": "high/desktop/R04", "note": "lamp halos on dusk sky, but High lamp heads are shapeless blobs (racks visible on medium/desktop/R04)" },
      { "shot": "strips/high/R07", "note": "milky veil washes top corners in all 8 frames when a tower is just off-screen" },
      { "shot": "crops/high/R08-ball", "note": "multiple soft shadows per player from several towers" },
      { "shot": "high/desktop/R02", "note": "lamp spill reads as a flat uniform khaki apron, not a falloff; field evenly lit" },
      { "shot": "crops/high/R18-turf_26_67_40", "note": "rain: one specular hotspot, no general wet sheen" },
      { "shot": "high/desktop/R19", "note": "day mist variant believable" }
    ]},
    "animation": { "score": 5.5, "confidence": 0.7, "evidence": [
      { "shot": "strips/high/R13", "note": "no legible tackle contact beat; carrier merges into a cluster" },
      { "shot": "strips/high/R09", "note": "camera punch-in at frame 4 and toast, but catch not readable; frames 6-8 near-static bodies" },
      { "shot": "crops/high/R12-carrier", "note": "downed bodies interpenetrate" },
      { "shot": "crops/high/R09-slot_Z", "note": "defender legs pass through receiver" },
      { "shot": "strips/high/R11", "note": "sweep carrier slides laterally, no readable plant-and-cut or lean" },
      { "shot": "crops/high/R07-slot_QB", "note": "wind-up pose good: ball cocked, off arm out" }
    ]},
    "ui": { "score": 6.5, "confidence": 0.75, "evidence": [
      { "shot": "high/desktop/R04", "note": "clean scorebug, numbered and shaped receiver icons with route art (axis-1 class)" },
      { "shot": "high/desktop/R14", "note": "TOUCHDOWN banner overlaps goalpost and 3D scoreboard; board clipped by top edge" },
      { "shot": "high/landscape/R12", "note": "result banner covers the 3D scoreboard" },
      { "shot": "high/desktop/R10", "note": "right panel is ~400px of dead space during live play" },
      { "shot": "high/desktop/R05", "note": "no on-field defender ID or coverage art vs madden26-1" },
      { "shot": "high/desktop/R21", "note": "+7 YD shown as FIRST DOWN from a 1st & 10 drive state seen in R22; check" }
    ]},
    "typography": { "score": 6.5, "confidence": 0.7, "evidence": [
      { "shot": "high/desktop/R21", "note": "HUD '1st & 10 · own 37' vs panel '1ST & 10 · OWN 37' casing mismatch" },
      { "shot": "high/desktop/R12", "note": "clear banner hierarchy; log/body text small mid-grey on navy" },
      { "shot": "high/mobile/R22", "note": "condensed display face consistent across cards; numerals read" }
    ]},
    "readability": { "score": 6.5, "confidence": 0.7, "evidence": [
      { "shot": "high/desktop/R08", "note": "ball is a small dark untrailed ellipse; receivers untagged after snap" },
      { "shot": "crops/high/R08-ball", "note": "ball not visible in its own close-up" },
      { "shot": "high/mobile/R10", "note": "carrier ring and under-feet name plate read clearly" },
      { "shot": "crops/high/R10-carrier", "note": "no ball visible in the carrier's hands" },
      { "shot": "strips/high/R10", "note": "black home jerseys merge with shadows in the pile at chase distance" }
    ]},
    "mobile": { "score": 6.5, "confidence": 0.7, "evidence": [
      { "shot": "high/mobile/R04", "note": "edge-clamped badges stack with gold chevrons; big HIKE button" },
      { "shot": "high/mobile/R22", "note": "thumb-sized two-column play cards" },
      { "shot": "high/mobile/R14", "note": "3D scoreboard clipped at right edge" },
      { "shot": "high/landscape/R21", "note": "top banner covers the scoreboard; side panel ~30% width" },
      { "shot": "high/mobile/R08", "note": "players ~15 CSS px tall, numbers unreadable" }
    ]},
    "authenticity": { "score": 6.0, "confidence": 0.7, "evidence": [
      { "shot": "high/mobile/R22", "note": "TROJANS end zone; real Spa City identities" },
      { "shot": "crops/high/R01-board", "note": "high-school scoreboard HSHS/LHHS with DOWN/TO GO/BALL ON" },
      { "shot": "high/desktop/R01", "note": "establishing shot shows home crowd only as a clipped 14% sliver; no band or student section" },
      { "shot": "high/desktop/R17", "note": "punt staged like a kickoff line" },
      { "shot": "high/desktop/R15", "note": "visitor side: one small bleacher, cone-tree wall" }
    ]}
  },
  "gaps": [
    { "id": "G-contact-beats", "category": "animation", "expectedGain": 1.0, "severity": 5, "effort": "L", "workstream": "WS4b", "evidence": ["strips/high/R13", "strips/high/R09", "crops/high/R12-carrier", "crops/high/R09-slot_Z"], "benchmark": "cfb26-4", "fix": "Paired tackle contact poses (wrap/drive vs absorb/fall), 3-4 frame hit-stop plus 0.3 s slow motion at contact, capsule separation so downed bodies stack rather than fuse, replay camera framed tight on the contact point." },
    { "id": "G-venue-backdrop", "category": "authenticity", "expectedGain": 1.0, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["high/desktop/R01", "high/desktop/R13", "high/desktop/R15", "crops/high/R06-slot_C"], "benchmark": "axis-3", "fix": "Replace grey wall planes with a real visitor bleacher and crowd, a home press box, and a fence and field house behind the end zones; textured, lamp-rimmed tree cards instead of black cones. Gain split about 0.5 authenticity, 0.5 art." },
    { "id": "G-band-student-section", "category": "authenticity", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["high/desktop/R01", "crops/high/R01-crowd", "high/desktop/R14"], "benchmark": "cfb26-2", "fix": "A uniformed band block and a student section (shared shirt colour, props) in the home stands, cheerleaders on the track; feature them in the R01 and TD shots." },
    { "id": "G-ball-visibility", "category": "readability", "expectedGain": 0.4, "severity": 4, "effort": "S", "workstream": "WS4", "evidence": ["crops/high/R10-carrier", "crops/high/R11-carrier", "crops/high/R08-ball", "high/desktop/R08"], "benchmark": "retrobowl-2", "fix": "Tuck the ball on the carrier's outside arm so it shows; give the ball a light stripe or rim; add a faint flight trail; aim the ball close-up at the ball's world position." },
    { "id": "G-banner-overlap", "category": "ui", "expectedGain": 0.6, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/landscape/R12", "high/landscape/R14", "high/landscape/R21", "high/desktop/R14", "high/mobile/R14"], "benchmark": "madden26-3", "fix": "Anchor landscape result banners at the bottom of the field view; frame the TD camera so the 3D scoreboard is fully in or fully out. Gain split 0.3 ui, 0.3 mobile." },
    { "id": "G-official-model", "category": "art", "expectedGain": 0.3, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["crops/high/R03-slot_QB", "high/desktop/R14"], "benchmark": "axis-3", "fix": "Build officials on the player body with a face, cap brim, sleeves attached to the shirt, black pants, whistle and flag." },
    { "id": "G-body-silhouette", "category": "art", "expectedGain": 0.3, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["crops/high/R04-slot_C", "crops/high/R06-slot_C", "crops/high/R06-slot_DL2-side"], "benchmark": "axis-3", "fix": "Cut stance seat volume to no wider than the hips; short sleeves with skin-tone forearms and separate gloves instead of solid-colour arms; body types varied by position." },
    { "id": "G-high-bloom-veil", "category": "lighting", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["high/desktop/R04", "medium/desktop/R04", "strips/high/R07", "high/desktop/R07"], "benchmark": "cfb26-3", "fix": "Clamp lamp emissive so rack geometry survives on High, narrow the bloom radius, and fade fog in-scatter toward off-screen lamps to stop the milky corner veil." },
    { "id": "G-field-to-stand-falloff", "category": "lighting", "expectedGain": 0.3, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["high/desktop/R02", "high/desktop/R17", "high/desktop/R13"], "benchmark": "axis-3", "fix": "Light pools under each tower on the field, a true radial falloff across the apron and track instead of a flat band, and spill on the front rows of the crowd." },
    { "id": "G-rain-wetness", "category": "lighting", "expectedGain": 0.3, "severity": 2, "effort": "M", "workstream": "WS5", "evidence": ["crops/high/R18-turf_26_67_40", "high/desktop/R18"], "benchmark": "legendbowl-1", "fix": "In rain, darken turf albedo and lower its roughness with elongated lamp streaks; wet speculars on helmets; splash particles at the feet." },
    { "id": "G-live-panel-dead-space", "category": "ui", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R08", "high/desktop/R10", "high/landscape/R10"], "benchmark": "axis-3", "fix": "Collapse the side panel after the snap so the field is full width; JUKE as an on-field pill; keep receiver numbers visible after the snap." },
    { "id": "G-r01-crowd-framing", "category": "authenticity", "expectedGain": 0.2, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R01", "crops/high/R01-crowd"], "benchmark": "cfb26-1", "fix": "Turn the kickoff establishing camera about 30 degrees or move it wider so the home grandstand and tower fill the left third instead of a clipped sliver." },
    { "id": "G-special-teams-staging", "category": "authenticity", "expectedGain": 0.2, "severity": 2, "effort": "M", "workstream": "WS4", "evidence": ["high/desktop/R17", "high/desktop/R02", "high/desktop/R16"], "benchmark": "retrobowl-3", "fix": "A spread punt formation with the punter 13-15 yd deep and gunners released; FG defenders set 1 yd off the ball so a neutral zone reads." },
    { "id": "G-type-casing", "category": "typography", "expectedGain": 0.2, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R21", "high/mobile/R21"], "benchmark": "madden26-3", "fix": "One casing rule for down and distance across the HUD and panel; lift panel body and log text to 15 px in brighter grey." },
    { "id": "G-low-mirrored-numbers", "category": "art", "expectedGain": 0.0, "severity": 1, "effort": "S", "workstream": "WS3", "evidence": ["crops/low/R04-slot_C"], "fix": "Flip the front-number UVs on the Low mesh (chest numbers render mirrored)." }
  ],
  "verdict": "continue"
}
```
