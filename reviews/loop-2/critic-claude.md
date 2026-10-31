# Critic A (critic-claude): loop 2, High tier

## Verdict
Friday Night Spa City now has a real frame. It has a coherent night grade, a sunset sky over the Ouachita ridge, a clean broadcast-style scorebug, readable route art and a convincing small-town scoreboard. Up close it still does not hold. The new "HD" players read as smooth inflatable mannequins: tube limbs, mitten hands and no cloth. The front jersey numbers are still wrong: they render rotated or mirrored on chest decals whose light backing patch shows (`crops/high/R04-slot_C`, `crops/high/R03-slot_QB`). This loop's HUD fix has regressed. The carrier name tag and ring separate from the carrier: the tag "20 KEMP" hangs over an official (`high/desktop/R12`), and the ring sits empty a yard away (`crops/high/R10-carrier`, `crops/high/R11-carrier`). Animation is the weakest category. The strips are shot from too far to show any beat, the sweep carrier is frozen mid-air in a split leap, linemen "stances" hover with their hands off the turf, and the passer's ball lies on the ground at his feet. The establishing shots still show dark, empty-looking stands. No category reaches its 7 gate except possibly typography's trajectory, so the loop should continue.

## Scores

### Art: 5.5
- **Players.** The close-ups show a consistent, clean style, but the bodies are capsules. Arms and legs are untapered tubes, hands are black blobs with no readable thumbs, and cleats are plain black lozenges (`crops/high/R06-slot_C`, `crops/high/R06-slot_LG`, `crops/high/R07-slot_QB`). The jerseys have no cloth folds, seams or texture.
- **Gear.** There is a material contrast: glossy helmets against matte jerseys (`crops/high/R14-carrier`). The away facemask cage and the shoulder-pad rims read (`crops/high/R04-slot_C`). Both are 7-anchor traits.
- **Front numbers.** They are broken. #57 shows "57" correctly on the shoulders but "LS" (rotated 180°) on the chest. Other chests read "ae" and "06". Each sits on a visible light-grey decal rectangle (`crops/high/R04-slot_C`, `crops/high/R03-slot_QB`, `crops/high/R04-turf_26_67_42`).
- **Crowd.** The cards read as people in close-up, but they are blocky and nearly every fan holds the same arms-up pose. A scatter of white shirts blow out to glowing cards (`crops/high/R01-crowd`).
- **Venue.** The venue is simple: a flat beige slab for the track, black box stands, and cone trees (`high/desktop/R15`, `crops/high/R01-crowd`).
- **Turf.** The turf has fine grain at field level (`crops/high/R04-turf_26_67_42`).
- **Benchmark.** axis-3 (about a 7) has proportioned bodies with real hands and textured uniforms. This is clearly below it, and below legendbowl-1's style-consistent 7, which has no rendering errors in its jersey numbers.

### Lighting & atmosphere: 6.0
- **What works.** The night is well established. Lamp heads bloom (`high/desktop/R04`, `high/desktop/R20`), and players cast several soft shadows (`high/desktop/R01`, `high/desktop/R17`). The sunset sky gives a strong time of day, and the day-mist variant has convincing aerial perspective (`high/desktop/R19`).
- **Establishing shots.** There is almost no falloff from field to stands. The stands in `high/desktop/R01`, `high/desktop/R02` and `high/desktop/R17` are black voids with no lit crowd, so the bowl looks empty. Compare the bright, populated bowl in cfb26-3.
- **Haze.** A milky grey veil washes the upper third of `high/desktop/R07`, `high/desktop/R08` and `high/desktop/R21` and flattens contrast.
- **Rain.** The wet look is good in the close-up (glossy puddle, sparkle: `crops/high/R18-turf_26_67_40`). From the game camera it barely reads: `high/desktop/R18` looks like dry turf with streaks. The splashes render as small flat white squares at the players' feet (`crops/high/R18-turf_26_67_40`).
- **Helmets.** Specular highlights exist (`crops/high/R14-carrier`).
- **Benchmark.** Between the 5 and 7 anchors. axis-3 and cfb26-3 both light the crowd.

### Animation & game feel: 4.5
- **Strips.** From `strips/high/R07`, `strips/high/R09`, `strips/high/R10`, `strips/high/R11` and `strips/high/R13`: the camera is so wide that players are about 15 px tall and no throw, catch or contact beat is legible. `strips/high/R09` ends with the ball still yards from the receiver: no reach and no catch. `strips/high/R13`, the sideline tackle replay, shows a moving cluster around an empty ring and never shows contact.
- **Falls.** In `strips/high/R10`, panels 5→6, the bodies go from upright to flat on the turf with no buckle in between: a pop. The final pile pose is acceptable (`crops/high/R12-carrier`: the carrier braced on the ground holding the ball).
- **Contact.** The sweep carrier is frozen in a full split leap well above the turf, with his shadow far away. That reads as hurdling, not banking into a cut (`crops/high/R11-carrier`). The runners' cleats float in `crops/high/R10-carrier`.
- **Line.** The pre-snap stances are wrong. The linemen's hands hang beside their knees instead of touching the turf, and the center isn't holding the ball (it lies behind his heels) (`crops/high/R04-slot_C`, `crops/high/R06-slot_C`).
- **Throw.** The passer stands upright with the ball on the turf beside his cleat (`crops/high/R07-slot_QB`). That contradicts "holds the ball through the wind-up".
- **Feel.** There are no camera punch-ins, slow-motion or particles on the catch or tackle beats in any strip. The touchdown hop poses do read (`crops/high/R14-carrier`).
- **Benchmark.** At the 5 anchor ("procedural cycles that read, with popping and stiff falls") or below it.

### UI / HUD: 6.0
- **What works.** The scorebug is clean and consistent: team-colored bars, possession football, down and distance with field position (`high/desktop/R04`, `high/desktop/R12`). Pre-snap route art uses shaped receiver icons and dashed routes (`high/desktop/R04`, `high/desktop/R19`). The result banner has hierarchy ("+7 YD · FIRST DOWN / RUN", `high/desktop/R21`). The drive log and the "NEXT: 2ND & 5" panel work. The field-goal meter is clear (`high/desktop/R16`).
- **Defects.**
  - The "20 KEMP" carrier tag floats over an official while the real carrier lies on the ground below (`high/desktop/R12`, `high/mobile/R12`).
  - The "44 DELACROIX" tag hangs one to two yards from its player (`strips/high/R10`, `strips/high/R11`).
  - The carrier ring sits empty next to the carrier (`crops/high/R10-carrier`, `crops/high/R11-carrier`, `crops/high/R13-carrier`).
  - A stale, disabled JUKE panel fills the sidebar during the drop and while the ball is in the air (`high/desktop/R07`, `high/desktop/R08`). It should show the target and throw state.
  - The result banner sits on top of the tackle it reports (`high/desktop/R12`).
  - There are no receiver or defender ID tags and no play clock.
- **Benchmark.** Below axis-1 and madden26-1 (ID boxes, tags, play clock).

### Typography: 6.5
- **What works.** The type is a consistent condensed display face (titles, scorebug, banners, buttons) over a plain sans for body text, and the numerals are large and clear (`high/desktop/R21`, `high/desktop/R22`, `high/mobile/R22`). Nothing is clipped.
- **Weak spots.** The sidebar descriptions and drive log are small, low-contrast grey (`high/desktop/R04`, `high/desktop/R12`). The stadium scoreboard mixes a monospace clock with a heavy grotesque, and its labels are tiny (`crops/high/R01-board`). Tracking is default throughout, and there is little scale contrast between the panel title and the body.
- **Benchmark.** Close to cfb26-1 and madden26-3 in discipline, without their deliberate tracking or tiered scale.

### Readability: 5.5
- **What works.** The line of scrimmage (blue) and first-down line (yellow) read well. The ball is oversized and dark, so it is easy to find in flight (`high/desktop/R08`).
- **What doesn't.**
  - Players are small at 1280×800, about 25–30 px.
  - The home team's black jerseys and helmets sink into the dark night turf (`high/desktop/R07`, `high/desktop/R10`).
  - The tag and ring mislead about who has the ball (`high/desktop/R12`, `strips/high/R10`).
  - The foreground official repeatedly sits large in frame, pulling the eye from the carrier (`high/desktop/R10`, `high/desktop/R18`).
- **Mobile.** Figures are about 10 CSS px tall in `high/mobile/R04` and `high/mobile/R08`.
- **Benchmark.** madden26-1, axis-1 and retrobowl-1 all identify targets at a glance. This frame doesn't.

### Mobile: 5.5
- **What works.** The portrait layout is intentional: compact scorebug, a down-and-distance line, large thumb-sized HIKE/CONTINUE/JUKE buttons and a two-column play-call grid (`high/mobile/R22`, `high/mobile/R12`).
- **What doesn't.**
  - The pre-snap camera spends the top quarter of the viewport on a dark void above the field, and players stay tiny (`high/mobile/R04`).
  - In `high/mobile/R08` the target is jammed against the right edge.
  - The result banner covers the pile (`high/mobile/R12`) and the huddle (`high/mobile/R21`).
  - On the rain frame the turf reads dry (`high/mobile/R18`).
- **Performance.** The phone proxy holds frame rate (Medium mobile at 4× throttle: min 58 fps).
- **Benchmark.** Behind retrobowl-1 and retrobowl-2, where the figures are big and the action fills the screen.

### Authenticity: 6.0
- **What works.** Real Spa City staging: Hot Springs, Lakeside, Lake Hamilton and Jessieville names and colors, painted end zones, midfield logos, a high-school-style scoreboard with DOWN / TO GO / BALL ON (`crops/high/R01-board`), a ridge backdrop, and a 3A venue with smaller stands and pines (`high/desktop/R20`). The touchdown has striped officials and a padded gooseneck post (`high/desktop/R14`).
- **What doesn't.**
  - The establishing shots show dark, empty stands. No band or student section is visible in `high/desktop/R01`, `high/desktop/R02` or `high/desktop/R17`.
  - The visible bleacher is one short block (`high/desktop/R13`, `high/desktop/R15`).
  - The sideline team stands in an evenly spaced row of clones (`high/desktop/R13`).
  - The track is a featureless beige slab (`crops/high/R01-crowd`).
- **Benchmark.** Below cfb26-2 and cfb26-3 (band and crowd bowl as the centerpiece). Above generic football.

## Ranked gaps

1. **G-front-numbers-rotated** (art, WS3). Severity 5, effort S, about +0.5 art and +0.2 authenticity.
   - Defect: chest numbers render rotated 180° or mirrored on a visible light decal patch (`crops/high/R04-slot_C`, `crops/high/R03-slot_QB`, `crops/high/R04-turf_26_67_42`).
   - Fix: flip the front-number UVs on both axes (or rotate the decal 180°) per mesh. Make the decal background transparent or exactly the jersey color. Add a test that renders a front view of each tier.
2. **G-carrier-tag-ring-detached** (readability, WS7). Severity 5, effort S, about +0.5 readability and +0.5 ui.
   - Defect: the tag attaches to the wrong person or a stale position, and the ring sits off the carrier (`high/desktop/R12`, `strips/high/R10`, `strips/high/R11`, `crops/high/R10-carrier`, `crops/high/R11-carrier`).
   - Fix: every frame, project the tag from the carrier's head bone. Parent the ring to the carrier's root or hip in world XZ, not the play's spot. Hide the tag once the play is dead.
3. **G-runner-airborne-and-stances** (animation, WS4). Severity 5, effort M, about +0.7 animation.
   - Defect: the sweep carrier is frozen in a split leap, cleats float, the linemen's hands hover, the center isn't holding the ball, and the ball lies on the turf at the QB's feet (`crops/high/R11-carrier`, `crops/high/R10-carrier`, `crops/high/R04-slot_C`, `crops/high/R06-slot_C`, `crops/high/R07-slot_QB`).
   - Fix: clamp the stride amplitude and foot height during cuts, with foot IK to the turf. Build a real 3-point stance with the down hand planted. Attach the ball to the center's hands until the snap and to the QB's hand bone until release.
4. **G-mannequin-bodies** (art, WS3). Severity 4, effort L, about +0.8 art.
   - Defect: tube limbs, mitten hands, no cloth (`crops/high/R06-slot_LG`, `crops/high/R07-slot_QB`, `crops/high/R14-carrier`).
   - Fix: taper the limbs (calf and forearm mass, narrower ankles and wrists), add sleeve hems, socks and tape, and five-finger glove silhouettes. Add a jersey normal or roughness map (mesh, folds, stitching), tight-cloth pants with a sheen, and visible knee pads and cleat soles. Make the materials use roughness, not flat color.
5. **G-no-feel-beats** (animation, WS4). Severity 4, effort M, about +0.5 animation.
   - Defect: the strips show no legible throw, catch or contact. `strips/high/R09` never reaches the catch, and `strips/high/R13` never shows contact.
   - Fix: add a short camera punch-in and 0.3–0.5× slow-motion on the catch and the tackle, a turf-spray particle on contact, and a buckle-then-fall blend that lasts at least 6 ticks instead of the pop in `strips/high/R10` panels 5→6.
6. **G-empty-dark-stands** (lighting, WS2). Severity 4, effort M, about +0.4 lighting and +0.5 authenticity.
   - Defect: the establishing and kickoff shots show unlit, empty-looking stands (`high/desktop/R01`, `high/desktop/R02`, `high/desktop/R17`).
   - Fix: light the crowd cards from the lamp banks, fill both sideline stands, and put the band and student section in view on the kickoff and punt cameras. Add a bright rim on the front row and spill light on the track.
7. **G-stale-juke-panel** (ui, WS7). Severity 3, effort S, about +0.3 ui.
   - Defect: a disabled JUKE panel shows during the drop and the pass (`high/desktop/R07`, `high/desktop/R08`).
   - Fix: replace it with throw-state UI (target name and number, route) until a catch or scramble.
8. **G-mobile-framing** (mobile, WS7). Severity 4, effort S, about +0.5 mobile.
   - Defect: dark void above the field, tiny figures, the target cut off at the edge, and the banner covering the action (`high/mobile/R04`, `high/mobile/R08`, `high/mobile/R12`, `high/mobile/R21`).
   - Fix: lower and tilt the portrait camera so the field starts under the HUD, zoom about 1.4× on the formation box, and move the result banner to the top of the field or make it translucent and short.
9. **G-home-dark-on-turf** (readability, WS1). Severity 3, effort S, about +0.3 readability.
   - Defect: black home jerseys merge into the night turf (`high/desktop/R07`, `high/desktop/R10`).
   - Fix: add a subtle rim or fresnel light on players and lift player exposure relative to the turf. Add optional team-color base rings for the receivers.
10. **G-rain-reads-dry** (lighting, WS5). Severity 3, effort S, about +0.2 lighting.
    - Defect: the wet look disappears at the gameplay camera, and the splashes are square sprites (`high/desktop/R18`, `high/mobile/R18`, `crops/high/R18-turf_26_67_40`).
    - Fix: raise turf specular and lower albedo at grazing angles, add streaked lamp reflections in the puddles, and use round, alpha-faded splash sprites.
11. **G-haze-veil** (lighting, WS1). Severity 2, effort S, about +0.2 lighting.
    - Defect: a grey fog washes the upper frame (`high/desktop/R07`, `high/desktop/R21`).
    - Fix: reduce the height-fog density near the lamps and keep the black level in the stands.
12. **G-crowd-card-variety** (art, WS2). Severity 2, effort M, about +0.2 art.
    - Defect: a uniform arms-up pose and blown-out white cards (`crops/high/R01-crowd`).
    - Fix: mix poses per section when idle, clamp card brightness, and add a dim-to-bright gradient by row.

```json
{
  "loop": 2,
  "role": "critic-claude",
  "tier": "high",
  "scores": {
    "art": { "score": 5.5, "confidence": 0.8, "evidence": [
      { "shot": "crops/high/R04-slot_C", "note": "front numbers rotated 180° (57 reads LS) on visible decal patch; tube limbs" },
      { "shot": "crops/high/R03-slot_QB", "note": "chest numbers mirrored/rotated; mannequin limbs and mitten hands" },
      { "shot": "crops/high/R06-slot_LG", "note": "no cloth detail, capsule arms, blob gloves" },
      { "shot": "crops/high/R14-carrier", "note": "glossy helmet vs matte jersey contrast does read" },
      { "shot": "crops/high/R01-crowd", "note": "crowd reads as people but uniform poses and blown-out cards" },
      { "shot": "high/desktop/R15", "note": "simple venue: black box stand, cone trees" }
    ] },
    "lighting": { "score": 6.0, "confidence": 0.75, "evidence": [
      { "shot": "high/desktop/R04", "note": "lamp bloom, night sky grade, soft player shadows" },
      { "shot": "high/desktop/R01", "note": "stands are dark voids, no falloff to a lit crowd" },
      { "shot": "high/desktop/R07", "note": "grey haze veil flattens upper frame" },
      { "shot": "high/desktop/R18", "note": "rain turf barely reads wet at game camera" },
      { "shot": "crops/high/R18-turf_26_67_40", "note": "puddle gloss good up close; square splash sprites" },
      { "shot": "high/desktop/R19", "note": "day mist aerial perspective works" }
    ] },
    "animation": { "score": 4.5, "confidence": 0.7, "evidence": [
      { "shot": "strips/high/R09", "note": "strip ends before the catch; no reach beat legible" },
      { "shot": "strips/high/R10", "note": "panels 5-6 bodies pop from upright to flat; tag detached" },
      { "shot": "strips/high/R13", "note": "sideline replay never shows contact; empty ring" },
      { "shot": "crops/high/R11-carrier", "note": "carrier frozen in mid-air split leap during cut" },
      { "shot": "crops/high/R07-slot_QB", "note": "ball lies on turf at passer's feet" },
      { "shot": "crops/high/R04-slot_C", "note": "linemen hands hover, center not holding ball" },
      { "shot": "crops/high/R12-carrier", "note": "tackled carrier braced with ball: acceptable end pose" }
    ] },
    "ui": { "score": 6.0, "confidence": 0.8, "evidence": [
      { "shot": "high/desktop/R04", "note": "clean scorebug, shaped receiver icons and route art" },
      { "shot": "high/desktop/R12", "note": "20 KEMP tag hovers over an official; banner covers tackle" },
      { "shot": "high/desktop/R08", "note": "stale disabled JUKE panel while ball in air" },
      { "shot": "high/desktop/R21", "note": "result banner with hierarchy, next down panel" },
      { "shot": "crops/high/R10-carrier", "note": "carrier ring empty beside the carrier" }
    ] },
    "typography": { "score": 6.5, "confidence": 0.7, "evidence": [
      { "shot": "high/desktop/R22", "note": "consistent condensed display over sans body" },
      { "shot": "high/mobile/R22", "note": "clear numerals and titles at phone size" },
      { "shot": "high/desktop/R12", "note": "drive log small low-contrast grey" },
      { "shot": "crops/high/R01-board", "note": "stadium board mixes monospace and grotesque, tiny labels" }
    ] },
    "readability": { "score": 5.5, "confidence": 0.75, "evidence": [
      { "shot": "high/desktop/R08", "note": "oversized ball easy to find; LOS and first-down lines clear" },
      { "shot": "high/desktop/R10", "note": "black home jerseys sink into night turf; official dominates foreground" },
      { "shot": "high/desktop/R12", "note": "carrier tag labels the official" },
      { "shot": "strips/high/R11", "note": "tag and ring offset from carrier throughout" },
      { "shot": "high/mobile/R04", "note": "figures about 10 CSS px" }
    ] },
    "mobile": { "score": 5.5, "confidence": 0.75, "evidence": [
      { "shot": "high/mobile/R22", "note": "intentional portrait layout, thumb-sized cards" },
      { "shot": "high/mobile/R04", "note": "top quarter wasted on dark void, tiny players" },
      { "shot": "high/mobile/R08", "note": "target jammed at right edge" },
      { "shot": "high/mobile/R12", "note": "result banner covers the pile; tag misplaced" },
      { "shot": "high/mobile/R21", "note": "banner covers huddle" }
    ] },
    "authenticity": { "score": 6.0, "confidence": 0.7, "evidence": [
      { "shot": "crops/high/R01-board", "note": "high-school scoreboard with DOWN/TO GO/BALL ON" },
      { "shot": "high/desktop/R20", "note": "3A Jessieville venue, end zone and logo" },
      { "shot": "high/desktop/R14", "note": "painted end zone, gooseneck post, officials" },
      { "shot": "high/desktop/R01", "note": "establishing shot shows empty dark stands, no band or students" },
      { "shot": "high/desktop/R13", "note": "single short bleacher, cloned evenly spaced sideline" }
    ] }
  },
  "gaps": [
    { "id": "G-front-numbers-rotated", "category": "art", "expectedGain": 0.5, "severity": 5, "effort": "S", "workstream": "WS3",
      "evidence": ["crops/high/R04-slot_C", "crops/high/R03-slot_QB", "crops/high/R04-turf_26_67_42"], "benchmark": "axis-3",
      "fix": "Flip front-number UVs on both axes (or rotate the decal 180°) per mesh; make the decal background transparent or exactly the jersey color; add a front-view render test per tier." },
    { "id": "G-carrier-tag-ring-detached", "category": "readability", "expectedGain": 0.5, "severity": 5, "effort": "S", "workstream": "WS7",
      "evidence": ["high/desktop/R12", "strips/high/R10", "strips/high/R11", "crops/high/R10-carrier", "crops/high/R11-carrier"], "benchmark": "madden26-1",
      "fix": "Project the name tag from the carrier's head bone every frame; parent the ring to the carrier hip/root in world XZ; hide the tag when the play is dead." },
    { "id": "G-runner-airborne-and-stances", "category": "animation", "expectedGain": 0.7, "severity": 5, "effort": "M", "workstream": "WS4",
      "evidence": ["crops/high/R11-carrier", "crops/high/R10-carrier", "crops/high/R04-slot_C", "crops/high/R06-slot_C", "crops/high/R07-slot_QB"], "benchmark": "axis-3",
      "fix": "Clamp stride amplitude and foot height in cuts with foot IK to turf; real 3-point stance with planted hand; ball attached to center's hands until snap and to QB hand bone until release." },
    { "id": "G-mannequin-bodies", "category": "art", "expectedGain": 0.8, "severity": 4, "effort": "L", "workstream": "WS3",
      "evidence": ["crops/high/R06-slot_LG", "crops/high/R07-slot_QB", "crops/high/R14-carrier"], "benchmark": "axis-3",
      "fix": "Taper limbs (calf/forearm mass, narrow ankles and wrists), sleeve hems, socks, five-finger glove silhouettes; jersey normal/roughness maps with mesh, folds and stitching; tight-cloth pants with sheen; visible knee pads and cleat soles." },
    { "id": "G-no-feel-beats", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS4",
      "evidence": ["strips/high/R09", "strips/high/R13", "strips/high/R10"], "benchmark": "madden26-4",
      "fix": "Camera punch-in plus 0.3–0.5× slow-motion on catch and tackle; turf-spray particles on contact; buckle-then-fall blend over at least 6 ticks instead of the pop in R10 panels 5→6." },
    { "id": "G-empty-dark-stands", "category": "lighting", "expectedGain": 0.4, "severity": 4, "effort": "M", "workstream": "WS2",
      "evidence": ["high/desktop/R01", "high/desktop/R02", "high/desktop/R17"], "benchmark": "cfb26-3",
      "fix": "Light crowd cards from the lamp banks, fill both sideline stands, put band and student section in view on kickoff and punt cameras, add spill light on track and front rows." },
    { "id": "G-mobile-framing", "category": "mobile", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS7",
      "evidence": ["high/mobile/R04", "high/mobile/R08", "high/mobile/R12", "high/mobile/R21"], "benchmark": "retrobowl-1",
      "fix": "Lower and tilt the portrait camera so the field starts under the HUD, zoom about 1.4× on the formation box, keep the target inside a safe margin, and move the result banner to the top of the field or make it translucent and short." },
    { "id": "G-stale-juke-panel", "category": "ui", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS7",
      "evidence": ["high/desktop/R07", "high/desktop/R08"], "benchmark": "axis-1",
      "fix": "Replace the disabled JUKE panel during the drop and the pass with throw-state UI (target name and number, route) until a catch or scramble." },
    { "id": "G-home-dark-on-turf", "category": "readability", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS1",
      "evidence": ["high/desktop/R07", "high/desktop/R10"], "benchmark": "madden26-1",
      "fix": "Add a subtle rim or fresnel light on players and lift player exposure relative to the turf; optional team-color base rings for receivers." },
    { "id": "G-rain-reads-dry", "category": "lighting", "expectedGain": 0.2, "severity": 3, "effort": "S", "workstream": "WS5",
      "evidence": ["high/desktop/R18", "high/mobile/R18", "crops/high/R18-turf_26_67_40"], "benchmark": "legendbowl-1",
      "fix": "Raise turf specular and lower albedo at grazing angles, add streaked lamp reflections in puddles, use round alpha-faded splash sprites instead of white squares." },
    { "id": "G-haze-veil", "category": "lighting", "expectedGain": 0.2, "severity": 2, "effort": "S", "workstream": "WS1",
      "evidence": ["high/desktop/R07", "high/desktop/R21"], "benchmark": "cfb26-3",
      "fix": "Reduce height-fog density near the lamps and keep the black level in the stands." },
    { "id": "G-crowd-card-variety", "category": "art", "expectedGain": 0.2, "severity": 2, "effort": "M", "workstream": "WS2",
      "evidence": ["crops/high/R01-crowd"], "benchmark": "cfb26-1",
      "fix": "Mix poses per section when idle, clamp card brightness to stop white blow-outs, add a dim-to-bright gradient by row." }
  ],
  "verdict": "continue"
}
```
