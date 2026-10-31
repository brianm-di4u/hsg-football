# Critic A (critic-claude): loop 4, High tier, desktop

## Verdict

Friday Night Spa City has a clean, consistent broadcast-style HUD, a believable Arkansas setting (Ouachita ridgeline, HS H-goalposts, a real HS scoreboard, local play names) and a crowd that now reads as people. Up close it is still a mannequin game. Players are capsule-limbed figures with mitten hands. The officials are faceless black dolls. Several defenders wear chest numbers rendered **upside down** (on every tier). Bodies interpenetrate in contact, and linemen "in stance" stand with their hands hanging. The motion strips never actually show the two beats they are meant to show: the R09 catch strip ends with the ball still yards short, and the R13 "tackle contact" strip shows no contact and an empty carrier ring. The new camera punch-in is visible (`strips/high/R10` panel 7), but it can't hide a tackle that pops from upright to prone between two panels. Wide shots leave the stands as a black void (`high/desktop/R01`, `high/desktop/R17`). Mobile works, with good thumb targets and a docked result band, but figures are tiny in portrait. This is a solid 5–6.5 product across the board, and no category except possibly typography is near its gate. **Continue.**

---

## Scores

### Art: 5.5
- `crops/high/R04-slot_C`, `crops/high/R06-slot_C`: bodies are smooth capsules with tube legs, mitten hands and no glove, cleat or sock detail. Jerseys are plain shells with no folds or mesh. Pants have a seam panel and nothing else. Helmets do have a glossy clearcoat against matte jerseys, and the light-grey mask on dark helmets (new this loop) reads well on the navy Lakeside helmets (`crops/high/R06-slot_LG`). That material contrast is the main thing keeping this above 5.
- **Upside-down chest numbers.** In `crops/high/R06-slot_C` the crouched white defender's "63" reads as "Ɛ9". In `crops/high/R04-slot_C` the "53" and "90" (shown as "06") are both rotated 180°. Standing players read correctly (`crops/high/R03-slot_QB` "90", "96"), so the decal flips when the torso pitches forward. The same flip shows in `crops/low/R04-slot_C`, so it's systemic.
- `crops/high/R03-slot_QB`: the official is a featureless black mannequin with no face, and his striped sleeves are separate floating boxes at the shoulder.
- `crops/high/R12-carrier`: the tackler's helmet is sunk into the carrier's torso, and the bodies merge on the ground.
- Crowd: `crops/high/R01-crowd` now reads as low-poly people with raised arms in school colors, a real step up from blocks. Turf has grain at field level (`crops/high/R04-turf_26_67_42`).
- Venue: boxy grey walls with no dressing (no fences, signage, press box detail or track lanes), and pine trees as flat black cones (`high/desktop/R15`).
- Against legendbowl-1 (a style-consistent 7) and axis-3 (about 7, with real gear detail), the players fall short of "readable gear that holds up in close-ups".

### Lighting & atmosphere: 6.0
- `high/desktop/R03`, `high/desktop/R04`: light banks bloom against a painted dusk sky. Players cast several soft shadows (the cross-shadows under the kickoff line in `high/desktop/R01`), and helmets catch speculars (`crops/high/R06-slot_LG`).
- `crops/high/R18-turf_26_67_40`: rain gives a speckled wet sheen with puddle patches on the turf, and rain streaks fall in `high/desktop/R18`. Players get no wet sheen, though, and splash particles render as floating white squares at knee height. `high/desktop/R19` is a convincing day mist, with an atmospheric wash on the far hills and structures.
- Shortfalls: the stands are under-lit to the point of disappearing. In `high/desktop/R01` and `high/desktop/R17` the bowl is a near-black band with no visible crowd, and in the replay (`high/desktop/R15`) the stand is a small lit box floating over a grey wall. There is no falloff from field to stands, just a cutoff. The field reads as an evenly lit green stage, with no pooling under the light banks and no turf specular.
- Against cfb26-3, where the bowl glows and the crowd is lit by the field spill, this misses the 7 anchor's "light falloff from field to stands".

### Animation & game feel: 5.0
- `strips/high/R11`: the sweep run cycle reads, legs alternate, and the carrier stays under his ring from panel 2 onward. But `crops/high/R11-carrier` freezes him in a near-180° airborne split leap, a pose no ball carrier makes.
- `crops/high/R07-slot_QB`: the wind-up is legible (ball cocked behind the ear, stride foot forward). The legs are stiff tubes with no knee flex.
- `strips/high/R09`: the catch strip ends at panel 8 with the ball still several yards short of the receiver, so there is no reach and no catch beat. `crops/high/R09-slot_Z` shows #88 with arms at his sides and the defender clipped into his body.
- `strips/high/R10`: in panels 1–5 the carrier is stuck in the pile. Between panels 5 and 6 a defender goes from upright to flat on the ground with no fall in between (a pop). Panel 7 shows the new punch-in, which helps feel. The carrier is lost in the pile after contact.
- `strips/high/R13` (sideline replay "tackle contact"): no contact is visible in any panel. From panel 3 on, the carrier ring is empty, with a white defender standing beside it.
- `crops/high/R06-slot_C`: the "line stance close-up" has no three-point stance. Linemen bend at the hip with their arms hanging, and nobody has a hand on the turf. `crops/high/R04-slot_C`: the center's hands aren't on the ball, which lies loose between his feet.
- `crops/high/R14-carrier`: the celebration is everyone doing the same arms-up pose, and #9's feet hover above the turf.
- Rubric 5 ("procedural cycles that read, but with popping, floaty contact and stiff falls") fits exactly. The punch-in is the only 7-anchor feel touch present.

### UI / HUD: 6.5
- `high/desktop/R04`: route art with shaped receiver tags (diamond, circle, triangle, square, star), a blue LOS, a yellow first-down line, and a matching diagram in the side panel. It is clear pre-snap identification, close to axis-1. There are no defender ID tags (madden26-1 has them).
- `high/desktop/R12`: the result banner has hierarchy ("+5 YD" / "E. KEMP RUN"), and the play log on the right is useful. `high/desktop/R14`: the touchdown banner is bold and clear.
- Problems:
  - The right panel takes about 28% of the desktop width and is mostly empty during live play (`high/desktop/R10`, `high/desktop/R16`).
  - `high/desktop/R16`: the side panel says "Stop the needle in the green" while the meter says "Stop the needle between the uprights", and "FIELD GOAL · 45 YD" appears twice.
  - `high/desktop/R21`: the toast reads "+7 YD · FIRST DOWN / RUN" with no runner name, and the log line "Bathhouse Dive: runs for 7 yd." also drops the name. This is inconsistent with R12.
  - The scorebug is clean but static, with no timeouts as pips (the "•••" reads ambiguously) and no play clock.
- Against madden26-3 and axis-1, it is a competent scorebug and pre-snap layer without broadcast-package density or motion.

### Typography: 6.5
- `high/desktop/R22`: a consistent condensed display face (Oswald-like) for play names, buttons and headers, with a humanist sans for descriptions. The scale is clear (title, name, description, RUN/PASS tag), and the tracking on the uppercase headers is deliberate.
- `high/desktop/R12`, `high/desktop/R14`: banner numerals read at a glance.
- Weak spots:
  - `crops/high/R01-board`: the in-world scoreboard clock "4:00" is set in a Courier-like monospace with a spaced colon, which reads as a fallback font and not a scoreboard LED face. The tiny "QTR/DOWN/TO GO" labels on the jumbotron are illegible at frame scale (`high/desktop/R04`).
  - The on-field "1ST & 10" paint is a heavy italic slab that doesn't belong to the HUD family (`high/desktop/R04`).
  - Small description text in the side panel is low-contrast grey on navy (`high/desktop/R05`, "Lakeside is lined up.").
- Close to madden26-3 and cfb26-1 in discipline, but the in-world type isn't part of the system.

### Readability: 6.0
- Good:
  - `high/desktop/R04`: LOS, first-down line and receiver tags are instant.
  - `high/desktop/R08`: the ball is (deliberately) oversized and dark, readable mid-air, with a cyan landing ring on the target.
  - `high/desktop/R10`: the "44 DELACROIX" label and ground ring mark the carrier.
  - Black/orange vs white/blue gives high team contrast.
- Bad:
  - `high/desktop/R13` and `crops/high/R13-carrier`: in replay the carrier ring is empty and the carrier is a navy body among navy bodies, with no label.
  - `crops/high/R10-carrier`: the ring trails behind the carrier.
  - `high/desktop/R12`: the downed carrier is buried in a pile under the banner.
  - `high/mobile/R04`: players are roughly 12 CSS px tall, and jersey numbers are unreadable smudges at frame scale (`high/desktop/R20`).
- Against legendbowl-2 and retrobowl-1, the targets read but the carrier doesn't stay found in every frame.

### Mobile: 6.5
- Good:
  - `high/mobile/R22`: a two-column play-card grid with large thumb targets and a clear type scale.
  - `high/mobile/R10`: a full-width JUKE button, with the carrier label large and legible.
  - `high/mobile/R12`: the new docked result band is opaque and sits below the action without covering the play, which works as intended.
  - On the throttled phone proxy, medium holds 58 fps min (above 30), per the brief's table.
- Bad:
  - `high/mobile/R21`: the docked band is captured translucent and ghosted ("+7 YD · FIRST DOWN" in grey), with the huddle's legs showing through. It is not opaque in this frame.
  - `high/mobile/R04`: pre-snap figures are tiny, and the top roughly 15% of the viewport is a black stadium void.
  - The in-world scoreboard is clipped under the HUD bar in `high/mobile/R10`, `high/mobile/R12`, `high/mobile/R18` and `high/mobile/R21`.
  - No landscape capture, so "landscape and portrait both intentional" is unproven.
  - High tier was not profiled under throttle.
- Against retrobowl-1 and retrobowl-2 it is functional and thumb-friendly, but figures are small.

### Authenticity: 6.0
- Strong: real Garland County schools (Hot Springs, Lake Hamilton, Lakeside, Jessieville) and Spa City play names ("Bathhouse Dive", "Central Avenue Sweep", "Tufa Screen"). There is a Ouachita ridgeline backdrop. The HS scoreboard reads "HSHS / LHHS / BALL ON" (`crops/high/R01-board`). H-style HS goalposts appear in `high/desktop/R04`, and the home bleacher is full of school colors (`crops/high/R01-crowd`). The 3A venue in `high/desktop/R20` is smaller, with tree-lined ends.
- Weak:
  - **Uniform/HUD mismatch.** In `high/desktop/R03`, Lake Hamilton's HUD bar and "WOLVES" end zone are maroon, but the team wears black/orange kits identical to Hot Springs' home look (`high/desktop/R04`). In `high/desktop/R20`, Jessieville's HUD is purple but the uniforms are navy/orange, and Tufa Ridge's teal appears nowhere on its white kits. Two schools sharing one uniform reads as generic.
  - No band, cheerleaders, student-section banners, chain crew or track lane lines are visible in any frame (`high/desktop/R01`, `high/desktop/R15`).
  - Sidelines are evenly spaced identical figures in identical poses (`high/desktop/R13`).
  - The punt (`high/desktop/R17`) is staged as a kickoff-style line across midfield, not a punt formation.
- Against cfb26-1 and cfb26-2 (band, mascot, student section) and legendbowl-4, it gets the place right but not the Friday-night pageantry.

---

## Ranked gaps

1. **G-chest-number-flip** (art, WS3, severity 4, effort S, expected gain +0.5): chest number panels render rotated 180° on crouched players (`crops/high/R06-slot_C`, `crops/high/R04-slot_C`, `crops/low/R04-slot_C`). Fix: parent the number quad to the chest bone with a fixed local orientation (no world-up lookAt or billboard) and test at a 90° torso pitch. Add a capture-time assert that renders the number atlas UV orientation per stance.
2. **G-contact-beats** (animation, WS4b, severity 5, effort L, expected gain +1.0): tackles pop from upright to prone, and bodies interpenetrate (`strips/high/R10` panels 5→6, `crops/high/R12-carrier`, `strips/high/R13`). Fix:
   - Add a 3–4 phase tackle: wrap with arms around the carrier, a 0.25 s drive, a fall blended by impact direction, and a ground settle.
   - Add capsule separation between tacklers and carrier so helmets don't enter torsos.
   - Keep the carrier ring locked to the carrier's pelvis and show his label in replays.
3. **G-catch-beat** (animation, WS4, severity 4, effort M, expected gain +0.5): `strips/high/R09` never reaches the catch, and the receiver's arms stay at his sides with the defender clipped into him (`crops/high/R09-slot_Z`). Fix:
   - Trigger a reach IK about 0.35 s before arrival (hands to the ball's predicted point) and a hands-in "secure" pose on arrival.
   - Separate receiver and defender capsules.
   - Re-time the capture so the strip spans the throw-to-catch window.
4. **G-stands-void** (lighting, WS1, severity 4, effort M, expected gain +0.5): the stands go black in wide and establishing shots (`high/desktop/R01`, `high/desktop/R17`, `high/mobile/R04`). Fix: add a spill-light term from the light banks onto the bleacher crowd and structure (a cheap hemispheric fill with distance falloff), raise the crowd emissive floor about 15%, and add visible lamp heads on the poles in High (Medium already shows them in `medium/desktop/R04`).
5. **G-line-stance** (animation, WS4, severity 3, effort S, expected gain +0.5): there is no three-point stance, and the center doesn't hold the ball (`crops/high/R06-slot_C`, `crops/high/R04-slot_C`). Fix: author OL/DL three-point and four-point stance poses with a hand planted on the turf, put the center's hands on the ball, and give the holder's hand the ball tip in `crops/high/R16-slot_K`.
6. **G-team-identity** (authenticity, WS3, severity 3, effort S, expected gain +0.5): uniform colors don't match the HUD or end-zone identity, and Lake Hamilton and Hot Springs share a kit (`high/desktop/R03`, `high/desktop/R04`, `high/desktop/R20`). Fix: drive jersey, pant and helmet colors from the same team palette as the HUD bar (maroon Wolves, purple Jessieville, teal accents for Tufa Ridge), and give each school a distinct helmet stripe or decal.
7. **G-mannequin-detail** (art, WS3, severity 4, effort L, expected gain +0.5–1.0): mitten hands, tube limbs, and faceless black officials (`crops/high/R03-slot_QB`, `crops/high/R14-carrier`). Fix:
   - Add gloves with finger splits, sock/cleat separation and visible knee/thigh pad bulges.
   - Add a jersey normal map with folds and mesh.
   - Give officials skin-tone faces, white caps and attached sleeves, and give skin a separate material from black clothing.
8. **G-pageantry** (authenticity, WS2, severity 3, effort M, expected gain +0.5): no band, cheer squad, chain crew or track (`high/desktop/R01`, `high/desktop/R15`). Fix: add a band block in the home stands (uniform color plus instruments as cards), 6–8 cheer figures on the track, a 3-person chain crew, and lane lines on the existing tan apron. Break up the identical sideline figures with pose and spacing jitter (`high/desktop/R13`).
9. **G-mobile-band-ghost** (mobile, WS7, severity 3, effort S, expected gain +0.5): the result band is translucent in `high/mobile/R21`, and the scoreboard is clipped under the HUD (`high/mobile/R10`). Fix: make the docked band fully opaque from its first frame (fade only the text) and lower the mobile camera target so the in-world board clears the HUD, or crop it out deliberately. Raise the portrait pre-snap camera so figures reach about 20 CSS px (`high/mobile/R04`).
10. **G-panel-copy** (ui, WS7, severity 2, effort S, expected gain +0.5): conflicting FG instructions and a duplicate title (`high/desktop/R16`), a nameless first-down toast and log line (`high/desktop/R21`), and an empty right panel during live play (`high/desktop/R10`). Fix: use a single instruction string, always include the runner's name, and fill the live-play panel with the down/distance, the carrier's stat line and a mini play diagram, or collapse it.
11. **G-scoreboard-font** (typography, WS7, severity 2, effort S, expected gain +0.5): the in-world clock uses a Courier-like fallback, and the field "1ST & 10" paint font is off-family (`crops/high/R01-board`, `high/desktop/R04`). Fix: use a 7-segment or dot-matrix LED face for the in-world scoreboard, and set field paint in the HUD condensed family.
12. **G-punt-staging** (authenticity, WS4, severity 2, effort S, expected gain +0.25): the punt is staged like a kickoff (`high/desktop/R17`). Fix: use a punt formation (shield, gunners split wide, punter 14 yd deep) and show the snap and punt from behind the shield.

```json
{
  "loop": 4,
  "role": "critic-claude",
  "tier": "high",
  "scores": {
    "art": {
      "score": 5.5,
      "confidence": 0.8,
      "evidence": [
        { "shot": "crops/high/R06-slot_C", "note": "Crouched defender's chest number '63' renders upside down; capsule limbs, mitten hands, no gear detail." },
        { "shot": "crops/high/R04-slot_C", "note": "'53' and '90' upside down on crouched defenders; glossy helmet vs matte jersey contrast present." },
        { "shot": "crops/high/R03-slot_QB", "note": "Official is a faceless black mannequin with floating sleeve boxes." },
        { "shot": "crops/high/R12-carrier", "note": "Tackler helmet sunk into carrier torso; bodies merge." },
        { "shot": "crops/high/R01-crowd", "note": "Crowd now reads as low-poly people in school colors." },
        { "shot": "high/desktop/R15", "note": "Flat black cone trees, boxy grey walls, no venue dressing." }
      ]
    },
    "lighting": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        { "shot": "high/desktop/R04", "note": "Bloom on light banks, multiple soft player shadows, painted dusk sky." },
        { "shot": "crops/high/R18-turf_26_67_40", "note": "Wet speckle sheen and puddle patches on turf; no wet sheen on players; splash particles are floating white squares." },
        { "shot": "high/desktop/R01", "note": "Stands fall to a near-black band; no field-to-stands falloff." },
        { "shot": "high/desktop/R17", "note": "Bowl invisible in the wide punt shot; field reads as an evenly lit stage." },
        { "shot": "high/desktop/R19", "note": "Convincing day mist with atmospheric depth." }
      ]
    },
    "animation": {
      "score": 5.0,
      "confidence": 0.8,
      "evidence": [
        { "shot": "strips/high/R10", "note": "Defender pops from upright to prone between panels 5 and 6; punch-in visible in panel 7; carrier lost in the pile." },
        { "shot": "strips/high/R09", "note": "Strip ends with the ball still yards short; no reach or catch beat." },
        { "shot": "strips/high/R13", "note": "No visible contact; carrier ring empty from panel 3." },
        { "shot": "strips/high/R11", "note": "Run cycle reads and stays on its ring." },
        { "shot": "crops/high/R11-carrier", "note": "Carrier frozen in a near-180-degree split leap." },
        { "shot": "crops/high/R06-slot_C", "note": "Linemen have no three-point stance; arms hang." },
        { "shot": "crops/high/R07-slot_QB", "note": "Wind-up legible but legs are stiff tubes." }
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.75,
      "evidence": [
        { "shot": "high/desktop/R04", "note": "Route art, shaped receiver tags, LOS and first-down line, side-panel diagram; no defender IDs." },
        { "shot": "high/desktop/R12", "note": "Result banner with hierarchy plus play log." },
        { "shot": "high/desktop/R16", "note": "Conflicting FG instructions and duplicated title." },
        { "shot": "high/desktop/R21", "note": "First-down toast and log omit the runner's name." },
        { "shot": "high/desktop/R10", "note": "Right panel mostly empty during live play." }
      ]
    },
    "typography": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/desktop/R22", "note": "Consistent condensed display plus sans body on a clear scale." },
        { "shot": "crops/high/R01-board", "note": "In-world clock uses a Courier-like fallback with a spaced colon." },
        { "shot": "high/desktop/R04", "note": "Field paint '1ST & 10' italic slab is off-family; jumbotron labels illegible." },
        { "shot": "high/desktop/R14", "note": "Touchdown banner numerals and title read at a glance." }
      ]
    },
    "readability": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        { "shot": "high/desktop/R08", "note": "Oversized ball and cyan target ring read clearly." },
        { "shot": "high/desktop/R04", "note": "LOS, first-down line and receiver tags instant." },
        { "shot": "high/desktop/R13", "note": "Replay carrier unlabeled; ring empty." },
        { "shot": "crops/high/R10-carrier", "note": "Carrier ring trails behind the carrier." },
        { "shot": "high/mobile/R04", "note": "Figures about 12 CSS px tall in portrait pre-snap." }
      ]
    },
    "mobile": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/mobile/R22", "note": "Two-column play cards, large thumb targets." },
        { "shot": "high/mobile/R12", "note": "Docked opaque result band works as intended." },
        { "shot": "high/mobile/R21", "note": "Band captured translucent/ghosted over the huddle; scoreboard clipped under HUD." },
        { "shot": "high/mobile/R04", "note": "Tiny figures; top of viewport is a black stadium void." },
        { "shot": "high/mobile/R10", "note": "Full-width JUKE button and large carrier label." }
      ]
    },
    "authenticity": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        { "shot": "crops/high/R01-board", "note": "Authentic HS scoreboard with HSHS/LHHS and BALL ON." },
        { "shot": "high/desktop/R03", "note": "Lake Hamilton maroon HUD and end zone, but black/orange kit identical to Hot Springs'." },
        { "shot": "high/desktop/R20", "note": "Jessieville purple HUD vs navy/orange uniforms; Tufa Ridge teal absent." },
        { "shot": "high/desktop/R01", "note": "Local backdrop and H-posts; no band, cheer, chain crew or track lanes." },
        { "shot": "high/desktop/R17", "note": "Punt staged like a kickoff line." }
      ]
    }
  },
  "gaps": [
    { "id": "G-chest-number-flip", "category": "art", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS3", "evidence": ["crops/high/R06-slot_C", "crops/high/R04-slot_C", "crops/low/R04-slot_C"], "benchmark": "axis-3", "fix": "Parent number quads to the chest bone with a fixed local orientation (no world-up lookAt); verify at 90-degree torso pitch in stance poses." },
    { "id": "G-contact-beats", "category": "animation", "expectedGain": 1.0, "severity": 5, "effort": "L", "workstream": "WS4b", "evidence": ["strips/high/R10", "strips/high/R13", "crops/high/R12-carrier"], "benchmark": "madden26-4", "fix": "Phased tackle (wrap, drive, directional fall, settle) with capsule separation; lock the carrier ring to the pelvis and keep the carrier label in replays." },
    { "id": "G-catch-beat", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS4", "evidence": ["strips/high/R09", "crops/high/R09-slot_Z"], "benchmark": "cfb26-4", "fix": "Reach IK to the ball's predicted point 0.35 s before arrival, secure pose on arrival, receiver/defender capsule separation; time the strip to include the catch." },
    { "id": "G-stands-void", "category": "lighting", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["high/desktop/R01", "high/desktop/R17", "high/mobile/R04"], "benchmark": "cfb26-3", "fix": "Spill-light fill from the light banks onto bleachers and crowd with distance falloff, raise crowd emissive floor, show lamp heads on High." },
    { "id": "G-line-stance", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS4", "evidence": ["crops/high/R06-slot_C", "crops/high/R04-slot_C", "crops/high/R16-slot_K"], "benchmark": "axis-1", "fix": "Author three-point and four-point OL/DL stances with a hand on the turf; center's hands on the ball; holder's hand on the ball tip." },
    { "id": "G-team-identity", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS3", "evidence": ["high/desktop/R03", "high/desktop/R04", "high/desktop/R20"], "benchmark": "cfb26-1", "fix": "Drive uniform colors from the same team palette as the HUD and end zone; give each school a distinct helmet stripe or decal." },
    { "id": "G-mannequin-detail", "category": "art", "expectedGain": 0.75, "severity": 4, "effort": "L", "workstream": "WS3", "evidence": ["crops/high/R03-slot_QB", "crops/high/R14-carrier", "crops/high/R06-slot_LG"], "benchmark": "axis-3", "fix": "Gloves with finger splits, sock/cleat separation, pad bulges, jersey fold/mesh normal map; officials get faces, caps and attached sleeves." },
    { "id": "G-pageantry", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["high/desktop/R01", "high/desktop/R15", "high/desktop/R13"], "benchmark": "cfb26-2", "fix": "Band block in home stands, cheer squad on the track, chain crew, lane lines on the tan apron; jitter sideline poses and spacing." },
    { "id": "G-mobile-band-ghost", "category": "mobile", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/mobile/R21", "high/mobile/R10", "high/mobile/R04"], "benchmark": "retrobowl-2", "fix": "Docked band opaque from the first frame (fade text only); keep the in-world board clear of the HUD; tighten portrait pre-snap camera so figures reach about 20 CSS px." },
    { "id": "G-panel-copy", "category": "ui", "expectedGain": 0.5, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R16", "high/desktop/R21", "high/desktop/R10"], "benchmark": "madden26-1", "fix": "Single FG instruction string, runner name in every result toast and log line, fill or collapse the right panel during live play." },
    { "id": "G-scoreboard-font", "category": "typography", "expectedGain": 0.5, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["crops/high/R01-board", "high/desktop/R04"], "benchmark": "madden26-3", "fix": "LED/7-segment face for the in-world scoreboard; field paint in the HUD condensed family." },
    { "id": "G-punt-staging", "category": "authenticity", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS4", "evidence": ["high/desktop/R17"], "benchmark": "axis-3", "fix": "Real punt formation (shield, gunners, punter 14 yd deep) and a camera that shows snap and punt." }
  ],
  "verdict": "continue"
}
```
