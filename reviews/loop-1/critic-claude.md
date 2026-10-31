# Critic A (critic-claude), loop 1, High tier

## Verdict

The High tier is a real step up in the frame-wide image. Players cast soft shadows in two directions (`high/desktop/R01`, `high/desktop/R02`), the lamp banks bloom (`high/desktop/R03`, `high/desktop/R20`), the turf has blade texture and mowing stripes (`crops/high/R04-turf_26_67_42`), and helmets now show a glossy specular highlight against matte knit (`crops/high/R14-carrier`, `crops/high/R04-slot_QB`). The day-mist scene (`high/desktop/R19`) is the best-looking capture in the set. None of that reaches the assets the camera is looking at, though. Every close-up shows the v2 figures: faceted torsos, cylinder limbs, box feet and block hands, faceless officials, and away-jersey numerals rendered upside down. The crowd is orange, white and black boxes with diamond heads. The animation beats the rubric weights most are missing or wrong: the QB stands upright with the ball on the turf at his feet in the "drop and wind-up" close-up, the receiver doesn't reach in the catch close-up, tackled players lie flat as planks, and the celebration is one cloned arms-up pose. The wide establishing shots show a black void where the Friday-night bowl should be. This is a lighting and post upgrade on a 5-grade model and animation base. No category clears its gate. Verdict: **continue**.

## Scores

### Art: 5.0
- **Players.** `crops/high/R03-slot_QB`, `crops/high/R04-slot_QB`, `crops/high/R06-slot_C` and `crops/high/R16-slot_K` all show the same faceted low-poly body: rectangular feet with no cleat shape, mitten blocks for hands, straight cylinder shins, and shoulder pads that are flat slabs with no edge roll or jersey folds. The official in `crops/high/R03-slot_QB` has a featureless black head and the same block hands.
- **Numerals.** Away (white) jersey numbers are rotated 180°. "53" on the DT reads upside down in `crops/high/R04-slot_C`, "90"/"96" read as "06"/"96"-flipped on the facing DBs in `crops/high/R03-slot_QB`, "63" is flipped in `crops/high/R06-slot_C`, and a lone "e" glyph sits on a celebrating player in `crops/high/R14-carrier`.
- **Materials.** This part is real and visible: helmet clearcoat highlights and a dull jersey (`crops/high/R14-carrier`, `crops/high/R10-carrier`).
- **Turf.** It holds up at field level (`crops/high/R04-turf_26_67_42`).
- **Crowd.** `crops/high/R01-crowd` is rows of colored cuboids topped with diamond sprites. That is exactly the rubric's "crowd reads as colored blocks" line at 5.
- **Venue.** The press box, bleachers and light towers read as built objects (`high/desktop/R03`, `high/desktop/R20`). The tree line, though, is flat cone cut-outs (`high/desktop/R15`, `crops/high/R13-carrier`).
- **Against the benchmarks.** axis-3 (about 7) has smooth bodies with readable gloves, cleats, faces and a crowd of people. legendbowl-1 is stylized but internally consistent and detailed per sprite. Here the gloss and turf earn the half point above 4.5 that the boxy bodies and block crowd would otherwise get.

### Lighting & atmosphere: 6.0
- **Shadows and bloom.** Several soft shadows per player are present (two directions in `high/desktop/R02` and `high/desktop/R17`, long lamp shadows in `crops/high/R07-slot_QB` and `crops/high/R16-slot_K`). Bloom on the lamp heads is convincing in `high/desktop/R03`, `high/desktop/R06` and `high/desktop/R22`. The underlit sunset sky gives a real time of day.
- **Mist.** `high/desktop/R19` is a genuinely good atmospheric frame.
- **Falloff and exposure.** Light falloff from field to stands is the failure. In the establishing wide `high/desktop/R01`, the kickoff `high/desktop/R02` and the punt `high/desktop/R17`, the bowl is an unlit charcoal void: no visible lamp banks, no lit crowd, a grey band for sky. Compare cfb26-3, where the bowl glows and the lamps are the composition.
- **Haze.** `strips/high/R07` and `high/desktop/R07` have a flat grey-tan haze sheet over the upper-left third that reads as a veil, not volumetric light.
- **Rain.** The rain in `high/desktop/R18` doesn't read as wet at the gameplay camera: no lamp streaks on the turf, same green as dry. Only the close-up `crops/high/R18-turf_26_67_40` shows puddles, and those sparkle like glitter noise. The "spray" there is opaque white cubes.
- **Replay depth of field.** Focus is wrong in `high/desktop/R13` and `high/desktop/R15`: the entire frame, carrier included, is soft.

That clears the 5 anchor on shadows and bloom but misses three of the 7 anchor's items (exposure into the stands, wet sheen, falloff). Benchmarks: axis-3, cfb26-3.

### Animation & game feel: 4.5
- **Strips.** `strips/high/R07`, `strips/high/R09`, `strips/high/R10` and `strips/high/R11` are all at the far broadcast camera, where limbs are 10–15 px. No throw, catch or cut beat is legible in any of the 8 frames. In `strips/high/R09` the ball arrives at the receiver while his silhouette doesn't change (zoomed: no arm extension frames 5–8). `strips/high/R13` (sideline replay) is blurred by depth of field and the contact happens inside a clump. No punch-in, slow motion or particle accent marks the catch or the tackle in any strip.
- **Close-ups confirm the gaps.**
  - `crops/high/R07-slot_QB` ("QB drop and wind-up"): #12 stands square and upright, arms at his sides, and the ball lies on the turf next to his feet.
  - `crops/high/R09-slot_Z`: the target receiver has his back to the ball and both arms down.
  - `crops/high/R11-carrier`: the sweep carrier is mid-air with both feet off the ground in a split leap, well off his ring. That's floaty, not a planted cut.
  - `crops/high/R12-carrier`: the tackled pair lie rigid and straight, one plank on another, with a standing player straddling them.
  - `crops/high/R14-carrier`: every player has the same arms-up pose.
- **Against the anchors.** These are procedural cycles that partly read (the running gait in `crops/high/R10-carrier` has some knee lift) with stiff falls and floaty contact. The key beats the 7 anchor requires are absent, so this lands below 5. Benchmark contrast: madden26-4 and cfb26-4 show the weight shift, stiff-arm and dive that this lacks entirely.

### UI / HUD: 6.0
- **What works.** The scorebug is clean and consistent: team bars, the possession football, timeout dots, clock and down-and-distance (`high/desktop/R04`, `high/desktop/R12`). Pre-snap route art with shape-coded receiver tags (◇1, ○2, △3, □4, ☆5) is clear (`high/desktop/R04`, `high/desktop/R19`). The painted "1ST & 10" on the turf is a nice broadcast touch. The play-call cards have diagrams and run/pass tags (`high/desktop/R22`). Result banners have hierarchy (`high/desktop/R14`, `high/desktop/R21`).
- **Banners and duplication.** The "+5 YD" lower-third sits on top of live players in `high/desktop/R12` and is duplicated verbatim in the side panel. The same applies to "+7 YD · FIRST DOWN" in `high/desktop/R21` and "FIELD GOAL · 45 YD" in `high/desktop/R16`.
- **Carrier tag.** In `high/desktop/R12` the "20 KEMP" tag floats over the standing official while Kemp is on the ground two figures lower.
- **Side panel.** It takes 28% of the desktop width and is almost empty during kickoff and punt (`high/desktop/R01`, `high/desktop/R17`: a single SKIP button). Meanwhile the play list overflows and cuts off card 0 at the bottom (`high/desktop/R03`, `high/desktop/R22`).
- **Missing elements.** There are no pre-snap name or position tags on receivers like axis-1's "WR 11 NELSON", and no play clock.

Benchmarks: axis-1, madden26-1, madden26-3.

### Typography: 6.5
- **What works.** One condensed display face (Oswald) drives the scorebug, banners, chips and timestamps consistently (`high/desktop/R14`, `high/desktop/R21`, `high/mobile/R22`). Numerals in the score and clock read at a glance (`high/desktop/R04`). The secondary text is a readable humanist sans. "TOUCHDOWN!" in `high/desktop/R14` has deliberate weight and tracking.
- **In-world scoreboard.** It still uses a slab-serif monospace (Courier-style "4:00", "1", "10", "25" in `crops/high/R01-board`). That contradicts the one-face rule and looks like a default font.
- **Scale and clipping.** The type scale is shallow in the side panel: the "+5 YD" heading in `high/desktop/R12` is barely larger than the log entries beneath it. The play list clips "Fountain Play-Action" mid-glyph at the frame bottom (`high/desktop/R03`). On mobile, "Kickoff: M. Delacroix returns it 29 yd. Ball on the own 32." wraps a lone "32." onto its own line (`high/mobile/R14`).

Benchmarks: madden26-3, cfb26-1 and legendbowl-4 have tighter scale contrast.

### Readability: 6.0
- **Desktop, live.** At the desktop live cameras, the oversized dark ball against green turf is easy to find (`high/desktop/R08`), the blue target ring marks the receiver, and the carrier ring plus "44 DELACROIX" tag work in `high/desktop/R10` and `high/desktop/R11`. The line of scrimmage (blue) and the first-down line (yellow) are always present.
- **Figures are small.** Players are about 35–45 px tall at 1280×800, and the black home jerseys melt into each other in the pile (`high/desktop/R09`, `high/desktop/R18`).
- **Replays and kicks.** The replays (`high/desktop/R13`, `high/desktop/R15`) are blurred enough that the carrier takes effort to find, even with the ring. The aerial kick cameras (`high/desktop/R02`, `high/desktop/R17`) shrink players to about 15 px.
- **Mobile.** Figures are about 20 CSS px. The edge receivers 1 and 2 are cut by the frame edges in `high/mobile/R04`. The "+5 YD" banner covers the pile and the downed carrier in `high/mobile/R12`. The wrong-body tag noted under UI also appears there (`high/desktop/R12`).

The benchmarks retrobowl-1 and legendbowl-2 keep every target unmistakable on every frame. Here it holds in about two-thirds of the frames.

### Mobile: 5.5
- **What works.** The portrait layout is intentional. HIKE, CHANGE PLAY and a full-width JUKE are large thumb targets (`high/mobile/R04`, `high/mobile/R10`). The play-call grid is legible at 390 px (`high/mobile/R22`). Performance holds: 55 fps worst case for Medium under 4× CPU throttle.
- **Framing.**
  - The 3D viewport wastes its top 15–20% on an unlit dark wall (`high/mobile/R04`, `high/mobile/R08`, `high/mobile/R21`).
  - Players are tiny.
  - Formation edges clip (`high/mobile/R04`).
  - The result lower-third covers the play (`high/mobile/R12`, `high/mobile/R21`).
- **Keyboard hints on touch.** The TIMEOUT button still advertises a keyboard key, "(T)" (`high/mobile/R12`, `high/mobile/R21`).
- **Landscape.** No landscape capture exists, so "both framings intentional" can't be credited.

Benchmarks: retrobowl-1 and retrobowl-2 fill the phone with big readable figures.

### Authenticity: 5.5
- **What's right.** The local layer is right and specific:
  - Garland County opponents (Lake Hamilton, Lakeside, Jessieville).
  - Spa City play names (Bathhouse Dive, Central Avenue Sweep, Tufa Screen).
  - A small HS scoreboard with HSHS/LHHS abbreviations (`crops/high/R01-board`).
  - Painted end zones and midfield logos (`high/desktop/R14`, `high/desktop/R20`).
  - Two-post goalposts, the Ouachita ridge backdrop and a press box (`high/desktop/R03`).
  - A small home bleacher behind a fence in `high/desktop/R15` and `high/desktop/R20`.
- **What's missing.** The staging is missing: no band, no cheer line, no student section, no track around the field. The "Joe C. Reese Stadium" establishing shot (`high/desktop/R01`) shows a dark generic bowl with no visible people. The sideline team is a row of identical white figures (`high/desktop/R13`). In the 3A Jessieville frame, the stands are sparse and the trees are cones.

The scene says "football at night," and the names do the rest. cfb26-1, cfb26-2 and legendbowl-4 sell the occasion with people.

## Ranked gaps

1. **G-player-mesh-v3** (art, WS3), severity 5, effort L, expected gain +1.5.
   - Problem: faceted bodies, box feet, block hands, faceless officials (`crops/high/R03-slot_QB`, `crops/high/R04-slot_QB`, `crops/high/R16-slot_K`).
   - Fix: a single smooth skinned body with modeled gloves/fingers, cleats, a face under the facemask, and rolled shoulder-pad edges. Add a jersey normal map with folds and seams. Give officials a face and cap.
   - Benchmark: axis-3.
2. **G-anim-key-beats** (animation, WS4), severity 5, effort L, expected gain +1.5.
   - Problem: the QB stands with the ball on the turf in the wind-up (`crops/high/R07-slot_QB`). There's no catch reach (`crops/high/R09-slot_Z`, `strips/high/R09`), the cut is floaty and airborne (`crops/high/R11-carrier`), falls are plank-flat (`crops/high/R12-carrier`), and the celebration is cloned (`crops/high/R14-carrier`).
   - Fix:
     - Author key poses with blends: a QB set and load, release and follow-through tied to the ball's release tick; a receiver arm extension starting about 6 ticks before arrival; a tackle wrap; 3–4 fall variants with a rolled torso.
     - Plant the cut foot and lean the torso into cuts.
     - Randomize the celebration among 4 or more poses.
     - Add a 0.6 s punch-in and slow motion on catch and tackle contact.
   - Benchmark: madden26-4.
3. **G-stadium-wide-void** (lighting, WS1), severity 4, effort M, expected gain +0.75.
   - Problem: the establishing, kickoff and punt wides have unlit black stands with no visible lamp banks (`high/desktop/R01`, `high/desktop/R02`, `high/desktop/R17`).
   - Fix: light the stands with lamp falloff (a spot or area contribution onto the bleacher geometry), render lamp heads as emissive with bloom in aerial cameras, and lift the sky gradient so the bowl silhouettes.
   - Benchmark: cfb26-3.
4. **G-crowd-people** (art, WS2), severity 4, effort M, expected gain +0.5 art and +0.5 authenticity.
   - Problem: the crowd is cuboids with diamond heads (`crops/high/R01-crowd`, `high/desktop/R15`).
   - Fix: instanced crowd impostor cards or low-poly people with heads, shoulders and raised arms; per-instance shirt colors; a dense student section block in school colors.
   - Benchmark: axis-3.
5. **G-hs-staging** (authenticity, WS2), severity 3, effort M, expected gain +1.0.
   - Problem: no band, cheer line, student section or track. The sideline team is a row of clones (`high/desktop/R13`), and the establishing shot is empty (`high/desktop/R01`).
   - Fix: add a band block in uniforms in the end-zone or visitor bleacher, cheerleaders on the track, and a track ring with a tan surface. Vary sideline poses and give helmets-off variants.
   - Benchmark: cfb26-2.
6. **G-jersey-numerals-flipped** (art, WS3), severity 3, effort S, expected gain +0.5.
   - Problem: away numbers are rotated 180° or garbled (`crops/high/R04-slot_C`, `crops/high/R03-slot_QB`, `crops/high/R06-slot_C`, `crops/high/R14-carrier`).
   - Fix: correct the UV orientation of the away kit's number decals front and back, and add a test that renders each kit's number front and back and compares against the glyph.
   - Benchmark: madden26-4.
7. **G-replay-dof-focus** (readability, WS1), severity 3, effort S, expected gain +0.5.
   - Problem: the whole replay frame is soft (`high/desktop/R13`, `high/desktop/R15`, `strips/high/R13`).
   - Fix: set the focus distance to the carrier (not the ball, if that's lagging), cap the circle of confusion so midground players stay sharp, and blur only the far stands.
   - Benchmark: cfb26-4.
8. **G-carrier-tag-anchor** (ui, WS7), severity 3, effort S, expected gain +0.3.
   - Problem: the "20 KEMP" tag floats over the official while the carrier is down (`high/desktop/R12`, `high/mobile/R12`).
   - Fix: anchor the tag to the carrier's current bounding-box top, not a fixed standing height. Drop it to the ring when the carrier is down.
   - Benchmark: legendbowl-2.
9. **G-result-banner-occlusion** (ui, WS7), severity 3, effort S, expected gain +0.5 UI and +0.3 mobile.
   - Problem: the lower-third covers players and the pile, and the side panel repeats the same text (`high/desktop/R12`, `high/mobile/R12`, `high/mobile/R21`, `high/desktop/R16`).
   - Fix: dock result banners under the scorebug, or place them by the carrier's screen-space position so they never cover him. Drop the duplicate heading in the panel or replace it with drive context.
   - Benchmark: madden26-3.
10. **G-mobile-framing** (mobile, WS7), severity 3, effort M, expected gain +0.75.
    - Problem: the top 15–20% of the viewport is a dark wall, edge receivers are clipped, and there are keyboard hints on touch (`high/mobile/R04`, `high/mobile/R08`, `high/mobile/R21`, `high/mobile/R12`).
    - Fix: fit the pre-snap camera to the formation width plus an 8% margin, tilt so the far 30 yards sit near the top, hide "(T)" and "Space" hints on touch, and capture a landscape layout.
    - Benchmark: retrobowl-1.
11. **G-rain-wet-read** (lighting, WS5), severity 2, effort S, expected gain +0.3.
    - Problem: rain doesn't read wet at the gameplay camera, puddles sparkle like noise, and the spray is opaque white cubes (`high/desktop/R18`, `crops/high/R18-turf_26_67_40`).
    - Fix: darken turf albedo more, add view-dependent lamp streak reflections visible from the broadcast camera, filter the puddle normals to kill the sparkle, and use soft round splash sprites with alpha.
    - Benchmark: cfb26-4.
12. **G-desktop-panel-dead-space** (ui, WS7), severity 2, effort S, expected gain +0.3.
    - Problem: the 28% side panel is nearly empty during kicks, while the play list clips at the bottom (`high/desktop/R01`, `high/desktop/R17`, `high/desktop/R03`).
    - Fix: collapse the panel to an overlay chip in non-decision states, and paginate or two-column the play list.
    - Benchmark: axis-1.
13. **G-board-font** (typography, WS7), severity 2, effort S, expected gain +0.3.
    - Problem: the in-world scoreboard uses a Courier-style monospace (`crops/high/R01-board`).
    - Fix: render the board in a 7-segment or dot-matrix LED face with emissive glow, and use Oswald for its labels.
    - Benchmark: cfb26-1.

```json
{
  "loop": 1,
  "role": "critic-claude",
  "tier": "high",
  "verdict": "continue",
  "scores": {
    "art": {
      "score": 5.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "crops/high/R03-slot_QB", "note": "faceted bodies, box feet, block hands, faceless official; away numbers upside down"},
        {"shot": "crops/high/R04-slot_C", "note": "'53' rendered rotated 180 degrees"},
        {"shot": "crops/high/R01-crowd", "note": "crowd is colored cuboids with diamond heads"},
        {"shot": "crops/high/R14-carrier", "note": "glossy helmet vs matte jersey contrast is real; cloned pose; garbled 'e' numeral"},
        {"shot": "crops/high/R04-turf_26_67_42", "note": "turf blade texture and mowing stripes hold at field level"}
      ]
    },
    "lighting": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R02", "note": "multiple soft shadows per player"},
        {"shot": "high/desktop/R03", "note": "lamp bloom and lit sunset sky"},
        {"shot": "high/desktop/R01", "note": "stands are an unlit void, no falloff into the bowl"},
        {"shot": "high/desktop/R18", "note": "rain does not read wet at gameplay camera"},
        {"shot": "high/desktop/R13", "note": "replay DOF blurs entire frame"},
        {"shot": "high/desktop/R19", "note": "strong day-mist atmosphere"}
      ]
    },
    "animation": {
      "score": 4.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "strips/high/R09", "note": "no visible reach or catch beat across 8 frames"},
        {"shot": "strips/high/R13", "note": "contact hidden in a blurred clump; no punch-in or slow-mo"},
        {"shot": "crops/high/R07-slot_QB", "note": "QB upright, ball on the turf at his feet during wind-up"},
        {"shot": "crops/high/R11-carrier", "note": "airborne split leap instead of planted cut"},
        {"shot": "crops/high/R12-carrier", "note": "plank-flat stiff falls"},
        {"shot": "crops/high/R14-carrier", "note": "identical arms-up celebration"}
      ]
    },
    "ui": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R04", "note": "clean scorebug, shape-coded route art, painted 1ST & 10"},
        {"shot": "high/desktop/R12", "note": "banner over live players, duplicated in panel; carrier tag floats over official"},
        {"shot": "high/desktop/R17", "note": "28% side panel nearly empty during punt"},
        {"shot": "high/desktop/R03", "note": "play list clips card 0 at bottom"}
      ]
    },
    "typography": {
      "score": 6.5,
      "confidence": 0.65,
      "evidence": [
        {"shot": "high/desktop/R14", "note": "consistent Oswald display headline with good weight"},
        {"shot": "crops/high/R01-board", "note": "in-world scoreboard uses Courier-style monospace"},
        {"shot": "high/desktop/R12", "note": "shallow scale between panel heading and log"},
        {"shot": "high/mobile/R22", "note": "card titles legible at 390 px"}
      ]
    },
    "readability": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R08", "note": "ball and target ring easy to find"},
        {"shot": "high/desktop/R10", "note": "carrier ring and name tag work"},
        {"shot": "high/desktop/R15", "note": "replay blur makes carrier hard to find"},
        {"shot": "high/mobile/R04", "note": "edge receivers clipped at frame edges, players ~20 css px"},
        {"shot": "high/mobile/R12", "note": "result banner covers the pile and downed carrier"}
      ]
    },
    "mobile": {
      "score": 5.5,
      "confidence": 0.65,
      "evidence": [
        {"shot": "high/mobile/R04", "note": "big thumb buttons; dark dead band above field; edge clipping"},
        {"shot": "high/mobile/R08", "note": "top ~15% of viewport is unlit wall; figures tiny"},
        {"shot": "high/mobile/R21", "note": "lower-third over play; 'TIMEOUT (T)' keyboard hint on touch"},
        {"shot": "high/mobile/R22", "note": "play-call grid legible and well-sized"}
      ]
    },
    "authenticity": {
      "score": 5.5,
      "confidence": 0.65,
      "evidence": [
        {"shot": "high/desktop/R20", "note": "small bleachers, light poles, Jessieville end zone; sparse staging"},
        {"shot": "high/desktop/R01", "note": "Joe C. Reese establishing shot shows a dark generic bowl, no people"},
        {"shot": "high/desktop/R13", "note": "sideline team is a row of identical figures; no band/cheer/track"},
        {"shot": "crops/high/R01-board", "note": "HSHS/LHHS small-town scoreboard is right"}
      ]
    }
  },
  "gaps": [
    {"id": "G-player-mesh-v3", "category": "art", "expectedGain": 1.5, "severity": 5, "effort": "L", "workstream": "WS3", "evidence": ["crops/high/R03-slot_QB", "crops/high/R04-slot_QB", "crops/high/R16-slot_K"], "benchmark": "axis-3", "fix": "Replace v2 figures with a smooth skinned body: modeled gloves/fingers, cleats, face under facemask, rolled shoulder-pad edges, jersey normal map with folds and seams; give officials faces and caps."},
    {"id": "G-anim-key-beats", "category": "animation", "expectedGain": 1.5, "severity": 5, "effort": "L", "workstream": "WS4", "evidence": ["crops/high/R07-slot_QB", "crops/high/R09-slot_Z", "strips/high/R09", "crops/high/R11-carrier", "crops/high/R12-carrier", "crops/high/R14-carrier"], "benchmark": "madden26-4", "fix": "Author blended key poses: QB set/load/release/follow-through tied to the ball release tick (ball must stay in hand), receiver arm extension ~6 ticks before arrival, planted plant-foot plus torso lean on cuts, tackle wrap and 3-4 fall variants, 4+ celebration poses; add 0.6 s punch-in/slow-mo on catch and tackle contact."},
    {"id": "G-stadium-wide-void", "category": "lighting", "expectedGain": 0.75, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["high/desktop/R01", "high/desktop/R02", "high/desktop/R17"], "benchmark": "cfb26-3", "fix": "Light the stands with lamp falloff onto bleacher geometry, render emissive lamp heads with bloom visible from aerial kick cameras, and lift the sky gradient so the bowl silhouettes."},
    {"id": "G-crowd-people", "category": "art", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["crops/high/R01-crowd", "high/desktop/R15"], "benchmark": "axis-3", "fix": "Replace cuboid/diamond crowd with instanced impostor cards or low-poly people with heads, shoulders and raised arms, per-instance shirt colors, and a dense student section in school colors."},
    {"id": "G-hs-staging", "category": "authenticity", "expectedGain": 1.0, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["high/desktop/R01", "high/desktop/R13", "high/desktop/R20"], "benchmark": "cfb26-2", "fix": "Add a uniformed band block, cheer line on the track, a tan track ring around the field, and varied sideline team poses (helmets off, kneeling) instead of a cloned row."},
    {"id": "G-jersey-numerals-flipped", "category": "art", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS3", "evidence": ["crops/high/R04-slot_C", "crops/high/R03-slot_QB", "crops/high/R06-slot_C", "crops/high/R14-carrier"], "benchmark": "madden26-4", "fix": "Fix UV orientation of away-kit number decals front and back; add a render test that checks each kit's numerals front and back against the glyph."},
    {"id": "G-replay-dof-focus", "category": "readability", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["high/desktop/R13", "high/desktop/R15", "strips/high/R13"], "benchmark": "cfb26-4", "fix": "Focus replay DOF on the carrier distance, cap max circle of confusion so midground players stay sharp, blur only far stands."},
    {"id": "G-carrier-tag-anchor", "category": "ui", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R12", "high/mobile/R12"], "benchmark": "legendbowl-2", "fix": "Anchor the carrier name tag to the carrier's current bounding-box top rather than a fixed standing height; drop it to the ring when the carrier is down."},
    {"id": "G-result-banner-occlusion", "category": "ui", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R12", "high/mobile/R12", "high/mobile/R21", "high/desktop/R16"], "benchmark": "madden26-3", "fix": "Dock result banners under the scorebug or position them away from the carrier's screen position; remove the duplicate panel heading or replace it with drive context."},
    {"id": "G-mobile-framing", "category": "mobile", "expectedGain": 0.75, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["high/mobile/R04", "high/mobile/R08", "high/mobile/R21", "high/mobile/R12"], "benchmark": "retrobowl-1", "fix": "Fit the phone pre-snap/live camera to formation width plus 8% margin and tilt to remove the dark band above the field; hide keyboard hints like '(T)' and 'Space' on touch; capture and tune a landscape layout."},
    {"id": "G-rain-wet-read", "category": "lighting", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS5", "evidence": ["high/desktop/R18", "crops/high/R18-turf_26_67_40"], "benchmark": "cfb26-4", "fix": "Darken wet albedo further, add view-dependent lamp streak reflections visible from the broadcast camera, filter puddle normals to remove glitter, use soft round alpha splash sprites instead of white cubes."},
    {"id": "G-desktop-panel-dead-space", "category": "ui", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R01", "high/desktop/R17", "high/desktop/R03"], "benchmark": "axis-1", "fix": "Collapse the side panel to an overlay chip during non-decision states (kickoff, punt) and paginate or two-column the play list so no card clips."},
    {"id": "G-board-font", "category": "typography", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["crops/high/R01-board"], "benchmark": "cfb26-1", "fix": "Render the in-world scoreboard digits in a 7-segment/dot-matrix LED face with emissive glow and labels in Oswald, replacing the Courier-style monospace."}
  ]
}
```
