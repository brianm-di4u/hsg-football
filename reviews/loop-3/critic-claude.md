# Critic A (critic-claude) review, loop 3, High tier

## Verdict

Friday Night Spa City on High reads as a competent stylized night game from the wide cameras. The dusk Ouachita skybox, lamp bloom, multi-shadow pools under players, real school names, end-zone wordmarks, H-style padded goalposts, a high-school scoreboard and a tidy condensed-type HUD (`high/desktop/R04`, `high/desktop/R16`, `high/desktop/R14`) all work. Every close-up breaks it. The players are faceless capsule mannequins: tube shins, mitten hands, rigid shell pants, no facemask geometry on the dark helmets, and number decals that sit on visible rectangular patches and sometimes render mirrored (`crops/high/R04-slot_C`, `crops/high/R06-slot_LG`, `crops/high/R14-carrier`). Line stances are wrong: the center isn't over the ball and the linemen squat with their arms hanging (`crops/high/R06-slot_C`). The tackle pile interpenetrates (`crops/high/R12-carrier`). The live cameras are so wide that the motion strips can't show a legible throw, catch or tackle beat (`strips/high/R07`, `strips/high/R09`), and nothing punches in to sell them. Presentation is functional, but the desktop side panel sits 70% empty during live play, result toasts cover the action, and on a phone the figures are about 12 CSS px tall. No category reaches its gate except authenticity. Verdict: **continue**.

## Scores

### Art: 5.5
- **Players.** Smooth bodies with shoulder-pad shapes and some helmet specular (`crops/high/R06-slot_LG` shows a hot highlight on the navy helmet). They still fail the "hold up in close-ups" test at the 7 anchor:
  - Heads are featureless black ovals with no face (the referee in `crops/high/R03-slot_QB` is a faceless mannequin with a white cap).
  - The home team's black helmets show no facemask bars (`crops/high/R04-slot_QB`, `crops/high/R14-carrier`).
  - Shins are uniform black tubes ending in puck feet, and hands are mittens.
  - Pants are rigid orange shells with no cloth folds (`crops/high/R06-slot_C`, `crops/high/R11-carrier`).
- **Number decals.**
  - Each decal shows a visible lighter or darker rectangle behind the digits ("12" and "44" in `crops/high/R04-slot_QB`, "10" in `crops/high/R06-slot_C`).
  - Some render mirrored: "63" reads as "E9" in `crops/high/R06-slot_LG`, and a defender's "06" in `crops/high/R04-slot_C` looks like a mirrored 90.
- **Crowd.** Reads as people up close, as flat card figures with raised arms (`crops/high/R01-crowd`), but turns into speckle at game distance (`high/desktop/R13`).
- **Venue.** The trees are flat-shaded cones (`high/desktop/R15`, `crops/high/R13-carrier`), and the bleachers and press box are untextured black boxes (`high/desktop/R03`).
- **Turf.** Fine at field level (`crops/high/R04-turf_26_67_42`).
- **Benchmarks.** Below axis-3, where faces, gloves and uniform trim read, and below the style consistency of legendbowl-1. The models sit between the 5 and 7 anchors.

### Lighting & atmosphere: 6.0
- **What meets the 7 anchor.**
  - Several soft shadows under each player from the light banks (`high/desktop/R01`, `high/desktop/R17`).
  - Lamp bloom with a believable dusk sky (`high/desktop/R04`, `high/desktop/R20`).
  - A wet speckled sheen in rain (`crops/high/R18-turf_26_67_40`).
  - Convincing day mist with depth fog (`high/desktop/R19`).
- **What falls short.**
  - From the kickoff and punt cameras the stands are a black void with no lit seating and no visible lamp heads (`high/desktop/R01`, `high/desktop/R17`). There is no falloff from field to stands, just field, then black.
  - The top-corner haze reads as a grey wash with no source (`high/desktop/R07`, upper left).
  - Players get no rim or spec separation, so the black home jerseys flatten against the dark turf (`high/desktop/R10`).
  - The replay camera shows a dark vertical smear on the foreground turf (`high/desktop/R13` at about x=520, y=690; `high/desktop/R15` at about x=700, y=700; also `strips/high/R13` frames 2 to 8).
  - Rain splashes render as white squares (`crops/high/R18-turf_26_67_40`, near #44 and #69).
- **Benchmarks.** Short of axis-3's clean exposure and far from cfb26-3's lit bowl.

### Animation & game feel: 5.5
- **What reads.**
  - The run strides look like real gait with feet near the turf (`crops/high/R11-carrier`, `crops/high/R10-carrier`).
  - The QB shows a cocked over-the-top arm with a front-foot step (`crops/high/R07-slot_QB`).
  - The tackler lies wrapped on the carrier rather than diving (`crops/high/R12-carrier`).
- **What the strips show.**
  - `strips/high/R07` and `strips/high/R09` are shot from the wide live camera. The QB and receiver are a few pixels tall, so the throw and catch beats aren't legible to a player.
  - `strips/high/R10` shows the run collapse into a cluster, then a "NO GAIN" banner with one white body on the ground. No contact beat reads.
  - `strips/high/R13` (replay) shows smooth running but no visible contact moment across 8 frames.
- **Defects.**
  - The line has no 3-point stance and the center isn't over the ball. Every lineman squats with arms hanging (`crops/high/R06-slot_C`, `crops/high/R04-slot_C`).
  - The tackle pile interpenetrates: the tackler's helmet sinks into the carrier's torso (`crops/high/R12-carrier`).
  - The celebration is stiff arms-up poses (`crops/high/R14-carrier`).
  - There is no camera punch-in, slow motion or particles at the catch, tackle or touchdown, apart from the replay's depth of field.
- **Benchmarks.** Above the 5 anchor on contact. Well short of 7, judged against cfb26-4 and madden26-4 (stills).

### UI / HUD: 6.0
- **What works.**
  - A clean two-bar scorebug with the clock and down and distance (`high/desktop/R04`).
  - Numbered, shape-coded route art on the field and a play diagram (`high/desktop/R04`).
  - A carrier name tag and ring (`high/desktop/R11`), a target ring (`high/desktop/R08`), result toasts with hierarchy (`high/desktop/R12`, `high/desktop/R21`) and a field-goal meter (`high/desktop/R16`).
- **What fails.**
  - **Wasted panel.** During live play the right panel takes about 28% of the width and holds only a greyed JUKE button and one hint line (`high/desktop/R07`, `high/desktop/R08`, `high/desktop/R09`).
  - **Toasts over the action.** The result toast sits over players and the referee (`high/desktop/R12`).
  - **Tangled route art.** The Promenade Slants arrows cross through the line and each other (`high/desktop/R19`).
  - **No defensive ID.** The defensive pre-snap view has no on-field labels, only the panel diagram (`high/desktop/R05`). Compare the WILL/MIKE/SAM boxes in madden26-1.
  - **Stale data.** A play-log line is missing its player name ("Bathhouse Dive: runs for 7 yd.", `high/desktop/R21`). The stadium board reads 3:17 while the HUD reads 3:18 (`high/desktop/R12`).
- **Benchmarks.** Roughly axis-1 minus its name tags and pre-play menu polish.

### Typography: 6.5
- **What works.**
  - A consistent condensed display face (Oswald-like) for team names, headings, buttons and toasts, over a neutral sans for body text (`high/desktop/R22`, `high/desktop/R04`).
  - Big scorebug numerals that read at a glance, and a clear toast hierarchy ("TOUCHDOWN!" over "20-YD RUN", `high/desktop/R14`).
- **What falls short.**
  - The in-world scoreboard uses a Courier-like monospace for the clock against bold sans labels (`crops/high/R01-board`).
  - Log lines wrap a lone "yd." to a new line (`high/desktop/R15`).
  - The play list is clipped at the bottom of the panel ("Fountain Play-Action", `high/desktop/R22`).
  - Tracking is undifferentiated, with no deliberate letter-spacing on the caps labels.
- **Benchmarks.** Close to legendbowl-4 in coherence, below madden26-3.

### Readability: 6.0
- **What reads.**
  - The line of scrimmage (blue) and the line to gain (yellow) are clear (`high/desktop/R04`).
  - The carrier tag and ring are excellent (`high/desktop/R10`, `high/mobile/R10`).
  - The targeted receiver gets a cyan ring (`high/desktop/R08`).
- **What doesn't.**
  - The ball in flight is a small dark-brown ellipse on dark-green turf with no shadow marker or trail (`high/desktop/R08` at about 550,476; `high/mobile/R08` at about 440,993). It takes effort to find.
  - Desktop players are about 25 px tall.
  - The black-jersey home team clusters into one dark mass at night (`high/desktop/R10`, `high/desktop/R09`).
  - Routes cross in `high/desktop/R19`.
- **Benchmarks.** Below retrobowl-1 and legendbowl-2, where every receiver and the ball pop at a glance.

### Mobile: 6.0
- **What works.**
  - The portrait layout is intentional.
  - Large thumb buttons: full-width JUKE, HIKE and CONTINUE (`high/mobile/R10`, `high/mobile/R04`).
  - A compact, readable scorebug.
  - The field starts right under the HUD.
  - The phone proxy holds frame rate (medium mobile, 4× throttle: min 48 fps).
- **What fails.**
  - Figures are about 12 CSS px tall (`high/mobile/R04`, `high/mobile/R08`).
  - The result toast sits over the huddle and players draw through its text ("+7 YD · FIRST DOWN", `high/mobile/R21`). The +5 YD toast hides the tackle pile (`high/mobile/R12`).
  - The stadium scoreboard is sliced by the HUD edge (`high/mobile/R10`, `high/mobile/R18`, `high/mobile/R21`).
  - No landscape capture was provided to judge.
- **Benchmarks.** Retrobowl-1 and retrobowl-2 keep figures and ball far larger relative to the screen.

### Authenticity: 6.5
- **What's right.**
  - Real Spa City schools with matching end-zone wordmarks and midfield logos, plus a "WOLVES" and "TROJANS" sideline banner (`high/desktop/R03`, `high/mobile/R22`).
  - Padded H-style posts, pylons and hashes at roughly thirds (`high/desktop/R14`, `high/desktop/R04`).
  - A sand track (`crops/high/R01-crowd`).
  - A high-school DOWN, TO GO, BALL ON scoreboard (`crops/high/R01-board`).
  - Small-town bleachers and ridge backdrop (`high/desktop/R20`).
- **What's off.**
  - The user's team wears the same black jersey and orange pants whether it is Hot Springs, Lake Hamilton (maroon HUD bar, `high/desktop/R03` and `crops/high/R03-slot_QB`) or Jessieville (purple HUD bar, `high/desktop/R20`).
  - No band, cheer squad or distinct student section is visible.
  - Sideline players stand evenly spaced like a lineup (`high/desktop/R13`, `high/desktop/R15`).
  - The stands are invisible from the overhead cameras (`high/desktop/R01`).
- **Benchmarks.** Clears the gate, behind cfb26-1 and cfb26-2's staging.

## Ranked gaps

1. **G-player-model-closeup** (art, WS3). Severity 5, effort L, expected gain +1.5.
   - Problem: faceless heads, no facemask on dark helmets, tube shins, mitten hands, rigid pants.
   - Fix: a skinned player mesh with a facemask cage on every helmet and a visible skin-tone face behind it, tapered calves with sock and cleat, fingered gloves, and a jersey and pants normal map for folds.
   - Evidence: `crops/high/R04-slot_QB`, `crops/high/R14-carrier`, `crops/high/R06-slot_C`. Benchmark: axis-3.
2. **G-jersey-decals** (art, WS3). Severity 4, effort S, expected gain +0.5.
   - Problem: decals show rectangular patches and some numbers render mirrored.
   - Fix: alpha-cut the decal quads so no patch shows, and fix the UV or winding flip that mirrors numbers on front and shoulder panels.
   - Evidence: `crops/high/R06-slot_LG` ("E9"), `crops/high/R04-slot_C`.
3. **G-live-camera-beats** (animation, WS7). Severity 5, effort M, expected gain +1.0.
   - Problem: from the wide live camera, the throw, catch and tackle beats aren't legible.
   - Fix: add context camera punch-ins (dolly toward the QB on release, toward the receiver on the catch, a short slow-motion hold on tackle contact) and a dust or turf-pellet burst at contact.
   - Evidence: `strips/high/R07`, `strips/high/R09`, `strips/high/R10`.
4. **G-line-stance** (animation, WS4). Severity 4, effort M, expected gain +0.5.
   - Problem: no 3-point stance, and the center isn't over the ball.
   - Fix: author 3-point and 2-point stances with a hand on the turf and weight forward, put the center's hands on the ball, and add a get-off burst at the snap.
   - Evidence: `crops/high/R06-slot_C`, `crops/high/R04-slot_C`.
5. **G-tackle-clip** (animation, WS4b). Severity 3, effort M, expected gain +0.5.
   - Problem: the tackler's helmet sinks into the carrier's torso.
   - Fix: separate the bodies' capsules in the settle pose, offset the tackler laterally, and vary the fall poses.
   - Evidence: `crops/high/R12-carrier`.
6. **G-stands-void** (lighting, WS1). Severity 4, effort M, expected gain +0.5.
   - Problem: the stands are a black void from the kickoff and punt cameras.
   - Fix: light falloff into the stands (lit seating and crowd at reduced exposure), visible lamp-bank geometry with bloom in the overhead shots, and spec or rim light on helmets so dark jerseys separate from the turf.
   - Evidence: `high/desktop/R01`, `high/desktop/R17`, `high/desktop/R10`. Benchmark: cfb26-3.
7. **G-replay-turf-smear** (lighting, WS1). Severity 3, effort S, expected gain +0.3.
   - Problem: a dark vertical smear sits on the foreground turf in replays.
   - Fix: find the occluder or shadow caster near the replay camera, likely a near-plane pole or shadow-camera artifact, and cull it or clamp its shadow.
   - Evidence: `high/desktop/R13`, `high/desktop/R15`, `strips/high/R13`.
8. **G-live-panel-space** (ui, WS7). Severity 4, effort M, expected gain +0.5.
   - Problem: the side panel stays at full width while holding almost nothing during live play.
   - Fix: on desktop, collapse it after the snap into a slim overlay (JUKE prompt, mini play diagram) and widen the 3D view.
   - Evidence: `high/desktop/R08`, `high/desktop/R09`.
9. **G-toast-placement** (mobile, WS7). Severity 4, effort S, expected gain +0.5.
   - Problem: result toasts cover the action and players draw through their text.
   - Fix: move toasts into a fixed band (top of the field view under the scorebug) with an opaque background drawn above the 3D layer, never over the ball spot.
   - Evidence: `high/mobile/R21`, `high/mobile/R12`, `high/desktop/R12`.
10. **G-mobile-figure-scale** (mobile, WS7). Severity 4, effort M, expected gain +0.5.
    - Problem: figures are about 12 CSS px tall on a phone.
    - Fix: tighten the phone live and pre-snap camera FOV or distance so players reach at least 20 CSS px, and keep the stadium scoreboard out of the clipped top band.
    - Evidence: `high/mobile/R04`, `high/mobile/R08`. Benchmark: retrobowl-1.
11. **G-ball-visibility** (readability, WS7). Severity 3, effort S, expected gain +0.5.
    - Problem: the ball in flight is a dark-brown speck on dark-green turf.
    - Fix: a ground shadow or landing marker under the ball in flight, a faint trail, and a slight emissive rim on the ball.
    - Evidence: `high/desktop/R08`, `high/mobile/R08`.
12. **G-team-uniforms** (authenticity, WS3). Severity 3, effort S, expected gain +0.5.
    - Problem: the user's team always wears Hot Springs black and orange.
    - Fix: drive jersey, pants and helmet colors from each school's palette (maroon for Lake Hamilton, purple and gold for Jessieville).
    - Evidence: `high/desktop/R03`, `crops/high/R03-slot_QB`, `high/desktop/R20`.
13. **G-friday-staging** (authenticity, WS2). Severity 3, effort M, expected gain +0.5.
    - Problem: no band, cheer squad or student section; venue props are crude.
    - Fix: add a band block in the stands, a cheer line on the track, and a dense student section in school colors. Replace the cone trees with layered pine cards and break up the evenly spaced sideline lineup.
    - Evidence: `high/desktop/R15`, `high/desktop/R13`. Benchmark: cfb26-1.
14. **G-rain-splash** (lighting, WS5). Severity 2, effort S, expected gain +0.2.
    - Problem: rain splashes render as white squares.
    - Fix: use soft round splash sprites with alpha falloff.
    - Evidence: `crops/high/R18-turf_26_67_40`.
15. **G-hud-data-and-type** (ui, WS7). Severity 2, effort S, expected gain +0.3.
    - Problem: a log line is missing its player name, the board and HUD clocks disagree by a second, and the board clock is in Courier.
    - Fix: restore the name in the log, sync the board clock to the HUD clock, and use an LED or segment face for the in-world scoreboard.
    - Evidence: `high/desktop/R21`, `high/desktop/R12`, `crops/high/R01-board`.

```json
{
  "loop": 3,
  "role": "critic-claude",
  "tier": "high",
  "scores": {
    "art": {
      "score": 5.5,
      "confidence": 0.8,
      "evidence": [
        { "shot": "crops/high/R04-slot_QB", "note": "faceless heads, no facemask on black helmets, tube shins, mitten hands, decal patches behind 12/44" },
        { "shot": "crops/high/R06-slot_LG", "note": "helmet gloss present; number 63 renders mirrored as E9; rigid shell pants" },
        { "shot": "crops/high/R14-carrier", "note": "mannequin limbs and pants shells hold up poorly in close-up" },
        { "shot": "crops/high/R01-crowd", "note": "crowd reads as people up close (card figures)" },
        { "shot": "high/desktop/R15", "note": "flat-shaded cone trees, black-box stands" }
      ]
    },
    "lighting": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        { "shot": "high/desktop/R01", "note": "multi-shadow pools under players, but stands are a black void and no lamp heads" },
        { "shot": "high/desktop/R04", "note": "lamp bloom and dusk sky work" },
        { "shot": "crops/high/R18-turf_26_67_40", "note": "wet speckled sheen present; splash sprites are white squares" },
        { "shot": "high/desktop/R13", "note": "dark vertical smear on foreground turf in replay" },
        { "shot": "high/desktop/R19", "note": "day mist convincing" }
      ]
    },
    "animation": {
      "score": 5.5,
      "confidence": 0.6,
      "evidence": [
        { "shot": "strips/high/R07", "note": "throw beat not legible from wide camera; no punch-in" },
        { "shot": "strips/high/R10", "note": "run dissolves into cluster; no readable contact beat" },
        { "shot": "crops/high/R11-carrier", "note": "stride with feet near turf reads" },
        { "shot": "crops/high/R06-slot_C", "note": "no 3-point stance, center not over ball, arms hanging" },
        { "shot": "crops/high/R12-carrier", "note": "wrap tackle but bodies interpenetrate" }
      ]
    },
    "ui": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        { "shot": "high/desktop/R04", "note": "clean scorebug, numbered shape-coded route art" },
        { "shot": "high/desktop/R08", "note": "right panel ~28% width nearly empty during live play" },
        { "shot": "high/desktop/R12", "note": "toast overlaps players; board clock 3:17 vs HUD 3:18" },
        { "shot": "high/desktop/R05", "note": "no on-field defensive ID labels" },
        { "shot": "high/desktop/R21", "note": "play log missing player name" }
      ]
    },
    "typography": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/desktop/R22", "note": "consistent condensed display + neutral sans body" },
        { "shot": "high/desktop/R14", "note": "clear TOUCHDOWN / 20-YD RUN hierarchy" },
        { "shot": "crops/high/R01-board", "note": "Courier-like clock on in-world scoreboard clashes" },
        { "shot": "high/desktop/R15", "note": "orphan 'yd.' wrap in log" }
      ]
    },
    "readability": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/desktop/R08", "note": "ball a dark speck on dark turf, no shadow marker or trail; target ring good" },
        { "shot": "high/desktop/R10", "note": "carrier tag and ring excellent; black jerseys merge into a dark mass" },
        { "shot": "high/mobile/R08", "note": "ball and players tiny on phone" },
        { "shot": "high/desktop/R19", "note": "route arrows tangle through the line" }
      ]
    },
    "mobile": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/mobile/R04", "note": "intentional portrait layout, big thumb buttons, figures ~12 CSS px" },
        { "shot": "high/mobile/R21", "note": "toast over huddle, players draw through its text" },
        { "shot": "high/mobile/R12", "note": "toast hides the tackle pile" },
        { "shot": "high/mobile/R10", "note": "full-width JUKE button; stadium board sliced at top" }
      ]
    },
    "authenticity": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/desktop/R03", "note": "Wolf Stadium, WOLVES banner, small-town stands; but Lake Hamilton wears Hot Springs black/orange" },
        { "shot": "high/desktop/R14", "note": "padded H posts, pylons, school end-zone wordmark" },
        { "shot": "crops/high/R01-board", "note": "high-school DOWN/TO GO/BALL ON scoreboard" },
        { "shot": "high/desktop/R20", "note": "3A venue reads; user team uniform does not match purple Jessieville" },
        { "shot": "high/desktop/R13", "note": "no band/cheer/student section; sideline players in an even lineup" }
      ]
    }
  },
  "gaps": [
    { "id": "G-player-model-closeup", "category": "art", "expectedGain": 1.5, "severity": 5, "effort": "L", "workstream": "WS3", "evidence": ["crops/high/R04-slot_QB", "crops/high/R14-carrier", "crops/high/R06-slot_C"], "benchmark": "axis-3", "fix": "Skinned player mesh: facemask cage on every helmet with a skin-tone face behind it, tapered calves with sock and cleat, fingered gloves, normal-mapped jersey and pants folds." },
    { "id": "G-live-camera-beats", "category": "animation", "expectedGain": 1.0, "severity": 5, "effort": "M", "workstream": "WS7", "evidence": ["strips/high/R07", "strips/high/R09", "strips/high/R10"], "benchmark": "cfb26-4", "fix": "Context camera punch-ins on release, catch and tackle, a short slow-motion hold on contact, and turf-pellet bursts at contact." },
    { "id": "G-jersey-decals", "category": "art", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS3", "evidence": ["crops/high/R06-slot_LG", "crops/high/R04-slot_C"], "fix": "Alpha-cut number decals so no rectangular patch shows; fix the UV or winding flip that mirrors numbers." },
    { "id": "G-line-stance", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS4", "evidence": ["crops/high/R06-slot_C", "crops/high/R04-slot_C"], "fix": "Author 3-point and 2-point stances with a hand on the turf, the center gripping the ball, weight forward, and a get-off burst at the snap." },
    { "id": "G-stands-void", "category": "lighting", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["high/desktop/R01", "high/desktop/R17", "high/desktop/R10"], "benchmark": "cfb26-3", "fix": "Light falloff into the stands with lit crowd, visible lamp-bank geometry with bloom in overhead shots, and rim or spec light so dark jerseys separate from the turf." },
    { "id": "G-live-panel-space", "category": "ui", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS7", "evidence": ["high/desktop/R08", "high/desktop/R09"], "benchmark": "axis-3", "fix": "On desktop, collapse the side panel after the snap into a slim overlay (JUKE prompt, mini diagram) and widen the 3D view." },
    { "id": "G-toast-placement", "category": "mobile", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS7", "evidence": ["high/mobile/R21", "high/mobile/R12", "high/desktop/R12"], "benchmark": "retrobowl-2", "fix": "Move result toasts into a fixed opaque band under the scorebug, drawn above the 3D layer and never over the ball spot." },
    { "id": "G-mobile-figure-scale", "category": "mobile", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS7", "evidence": ["high/mobile/R04", "high/mobile/R08"], "benchmark": "retrobowl-1", "fix": "Tighten the phone camera so players reach at least 20 CSS px tall; keep the stadium scoreboard out of the clipped top band." },
    { "id": "G-tackle-clip", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS4b", "evidence": ["crops/high/R12-carrier"], "fix": "Separate body capsules in the settle pose, offset the tackler laterally, and vary the fall poses." },
    { "id": "G-ball-visibility", "category": "readability", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R08", "high/mobile/R08"], "benchmark": "retrobowl-2", "fix": "Ground shadow or landing marker under the ball in flight, a faint trail, and a slight emissive rim." },
    { "id": "G-team-uniforms", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS3", "evidence": ["high/desktop/R03", "crops/high/R03-slot_QB", "high/desktop/R20"], "fix": "Drive jersey, pants and helmet colors from each school's palette instead of always using Hot Springs black and orange." },
    { "id": "G-friday-staging", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["high/desktop/R15", "high/desktop/R13"], "benchmark": "cfb26-1", "fix": "Add a band block, a cheer line on the track and a dense student section; replace cone trees with layered pine cards; break up the evenly spaced sideline lineup." },
    { "id": "G-replay-turf-smear", "category": "lighting", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["high/desktop/R13", "high/desktop/R15", "strips/high/R13"], "fix": "Find and cull or clamp the near-camera occluder or shadow caster that leaves a dark vertical smear on the replay foreground." },
    { "id": "G-hud-data-and-type", "category": "ui", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R21", "high/desktop/R12", "crops/high/R01-board"], "fix": "Restore the player name in the play log, sync the stadium board clock to the HUD clock, and use an LED or segment face on the board." },
    { "id": "G-rain-splash", "category": "lighting", "expectedGain": 0.2, "severity": 2, "effort": "S", "workstream": "WS5", "evidence": ["crops/high/R18-turf_26_67_40"], "fix": "Replace white square splash sprites with soft round ones with alpha falloff." }
  ],
  "verdict": "continue"
}
```
