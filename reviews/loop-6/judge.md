# Judge ruling: loop 6, High tier

All capture paths are relative to `games/football/screenshots/review-loop-6/`. Before ruling I opened these myself:
- Desktop frames: `high/desktop/R01`, `R04`, `R08`, `R10`, `R14`, `R15`, `R17`, `R18`, `R19`, `R20`, `R21` and `R22`.
- Phone frames: `high/mobile/R04`, `high/mobile/R10`, `high/mobile/R12`, `high/landscape/R04` and `high/landscape/R22`.
- Close-ups: `crops/high/R01-crowd`, `R03-slot_QB`, `R04-slot_QB`, `R06-slot_C-side`, `R06-slot_LG`, `R07-slot_QB`, `R09-slot_Z`, `R12-carrier` and `R18-turf_26_67_40`.
- Motion strips: `strips/high/R09`, `R10`, `R11` and `R13`.
- For regressions and comparison: `low/desktop/R04` and the benchmark `axis-3`.

No category has critics more than 1.0 apart. UI is exactly 1.0 apart, so I settled it from the captures below.

**Verdict: continue.** Authenticity is the only gate met. Art, lighting, animation, UI, typography, readability and mobile are all below 7. Low shows no regression: `low/desktop/R04` matches its earlier look.

## Rulings on the advocate's factual challenges

| # | Claim | Ruling | What I checked |
|---|---|---|---|
| F1 | Rain "looks the same as dry" (A) | **Advocate is right.** | `high/desktop/R18` is visibly darker than `high/desktop/R10` across the whole field. A's other point stands: no standing water shows at gameplay distance. |
| F2 | "Mitten hands" (A) | **Advocate is right.** | `crops/high/R06-slot_C-side` shows separate, curled fingers on #55. The arms are still untapered. |
| F3 | Tenth play card "unreadable" (A) or "near invisible" (B) | **Advocate is right.** | In `high/desktop/R22`, "Fountain Play-Action / Fake the dive; TE drag and a deep crosser" can be read, though it is dimmed. |
| F6 | R15 "blank grey wall" (A) | **Advocate is right.** | `high/desktop/R15` has a pine treeline behind the bleacher. The flat grey wall is in `strips/high/R13`. |
| F7 | Interpenetration in R09 (A) | **Unproven.** | `crops/high/R09-slot_Z` reads as one player hiding the other. |
| F9 | Ball close-up has no ball (A) | **Advocate is right.** | That crop missed its target. In `high/desktop/R08` the ball is clearly in the air at about (550,475). |

## Category rulings

### Art: 5.5 (A 5.5, B 5.5, advocate 5.5)
- **The 7-level material traits are present.** `crops/high/R04-slot_QB` has glossy helmets with specular hits against matte jerseys. `crops/high/R01-crowd` reads as people with varied shirts and raised arms. Turf grain holds at field level.
- **The silhouettes undo them.** The orange pants and seat balloon wider than the shoulders on #12 and #44 (`crops/high/R04-slot_QB`), and on #66 and #10 in `crops/high/R06-slot_LG`.
- **The sleeve hem still has a V-notch** under the "20", and the sleeve cut is faceted (`crops/high/R06-slot_LG`).
- **The officials are mannequins.** In `crops/high/R03-slot_QB` the referee has a blank head, ball fists and striped sleeves floating off the arm.
- **Against `axis-3`:** its bodies are proportioned like athletes and its venue is dressed. This build sits between the 5 and 7 anchors. **5.5.**

### Lighting & atmosphere: 6.5 (A 6.0, B 6.5, advocate 6.5)
**What meets the 7 anchor:**
- Several soft shadows per player (`crops/high/R09-slot_Z`, `crops/high/R12-carrier`).
- Lamp bloom and a believable night exposure under the dusk ridge sky (`high/desktop/R04`, `high/desktop/R20`).
- Visibly darker turf in rain (`high/desktop/R18` against `high/desktop/R10`, F1).

**What fails it:**
- **Falloff from field to stands.** The kickoff and punt cameras show a black bowl (`high/desktop/R01`, `high/desktop/R17`). The replay shows a flat grey wall behind the bleacher (`strips/high/R13`).
- **The wet sheen is one over-bright hotspot,** not a broad reflection (`crops/high/R18-turf_26_67_40`).
- **An off-screen lamp lays a grey veil over the top-right sky** in `strips/high/R09` frames 1–3 and `high/desktop/R08`.

About half of the 7 anchor is met, which puts this at **6.5**. A's 6.0 rested partly on the false "no darker" rain reading.

### Animation & game feel: 5.0 (A 5.0, B 4.5, advocate 5.0)
- **The pile appears with no contact.** In `strips/high/R10`, frame 5 is upright traffic and frame 6 is a pile with a man down. No wrap or contact frame comes between them.
- **The catch beat never shows.** In `strips/high/R09`, frames 5 to 6 go from #88 running to prone bodies. `crops/high/R09-slot_Z` shows #88 upright with no reach toward the ball.
- **No plant or lean.** In `strips/high/R11` the sweep carrier glides laterally, and the blocking pairs hold the same crouch in all eight frames.
- **The replay tackle never completes.** In `strips/high/R13` the carrier is still up at frame 8.
- **Positives:**
  - The QB wind-up with the ball cocked is legible (`crops/high/R07-slot_QB`).
  - The tackle result reads, with the tackler draped over the carrier and the ball popping loose (`crops/high/R12-carrier`).
  - The camera cuts in at the catch (`strips/high/R09` frame 4).
- **Fit to the anchors:** this is the 5 anchor exactly: cycles that read, with popping into piles. B's 4.5 under-credits the wind-up and the result poses. **5.0.**

### UI / HUD: 6.5 (A 6.0, B 7.0, advocate 6.5)
I checked the two cases the critics split on:
- **The log contradicts the play, and that is real.**
  - `high/desktop/R17` logs "punts 42 yd, downed" with the ball still in the air.
  - `high/desktop/R21` logs "Touchback. Ball on the own 20", then a 7-yard run ending at the own 37.
  - `high/desktop/R15` has the same touchback line before a snap at the own 41.
  - `high/desktop/R14` logs a return to the own 32, then "scores from 20 yd out".

  The 7 anchor's "nothing stale" fails, so B's 7.0 is too high.
- **The strengths are equally real, so A's 6.0 is too low.**
  - A broadcast-style scorebug.
  - Numbered shape badges on the route art.
  - An on-field "1ST & 10" marker (`high/desktop/R04`).
  - A clear headline and subtitle in the result band, and a clean "NEXT: 1ST & 10 · OWN 37" line (`high/desktop/R21`).
  - A day-game light theme on the side panel (`high/desktop/R19`).
- **The side panel stays about 60% empty during live play** (`high/desktop/R10`).

**6.5.**

### Typography: 6.5 (A 6.5, B 7.0, advocate 7.0)
- **The system is consistent.** A condensed display face is used for the scorebug, buttons and play titles, with a humanist sans for descriptions. Numerals read at a glance (`high/desktop/R22`, `high/desktop/R21`). The tenth card is legible (F3), and the seven-segment "1" is an in-world scoreboard prop, not a type defect (F4 accepted).
- **The 7 anchor's "nothing clipped" still fails:**
  - In `high/landscape/R22` the header breaks as "…AT THE / OWN 30", "Bathhouse / Dive" and "Central / Avenue Sweep" each wrap, and only 2.5 cards fit.
  - In `high/mobile/R10` the steering hint is cut off at the bottom edge.
  - The hint is dim on desktop (`high/desktop/R10`).

**6.5.** One layout fix takes this to 7.

### Readability: 6.0 (A 6.0, B 6.0, advocate 6.0)
- **Desktop reads.** The carrier has a ring and name tag, the scrimmage line is blue, the first-down line is yellow, and the target has a cyan disc. The ball is visible in the air (`high/desktop/R10`, `high/desktop/R08`).
- **Portrait pre-snap fails.** In `high/mobile/R04` the formation is a thin band of figures about 10 CSS px tall at roughly 57% of the screen height. Everything above it, about half the field view, is empty turf up to the far end zone. The route badges are larger than the players.
- **The runner is lost in the scrum** in `strips/high/R10` frames 6–8.

**6.0.**

### Mobile: 6.0 (A 6.0, B 6.0, advocate 6.0)
- **What works:**
  - Thumb-sized HIKE, CHANGE PLAY, JUKE and CONTINUE buttons.
  - A docked result band, with the pile above it (`high/mobile/R12`).
  - Landscape HIKE and CHANGE PLAY both fit (`high/landscape/R04`).
  - The High phone proxy holds a 50 fps minimum at 4× throttle (perf.json), which clears the 30 fps bar.
- **What fails:**
  - Portrait pre-snap framing (`high/mobile/R04`).
  - The hint cut off at the bottom, and a sliver of the 3D board ("DOWN TO GO BALL ON") under the HUD (`high/mobile/R10`).
  - The landscape scorebug takes about 17% of the height, and the play list has oversized cards (`high/landscape/R22`).

**6.0.**

### Authenticity: 6.5 (A 6.0, B 6.5, advocate 6.5)
- **Strong local identity.**
  - Painted end zones: HOT SPRINGS, LAKESIDE and JESSIEVILLE.
  - A tan track, two-side 3A bleachers in a pine setting, and a JHS/TR seven-segment board (`high/desktop/R20`).
  - A home crowd that reads as people (`crops/high/R01-crowd`).
  - Spa City play names (`high/desktop/R22`).
- **What's missing.**
  - No band and no student section in any frame.
  - The kickoff and punt cameras show a black bowl (`high/desktop/R01`).
  - The punt is staged as an even line of 11 across the 45–50, like kickoff coverage (`high/desktop/R17`).

More than half of the 7 anchor is on screen. **6.5. The gate is met.**

## Ranked gaps (top 12, by expected gain ÷ effort)

These merge duplicates:
- `G-portrait-presnap-scale` with `G-phone-framing`.
- `G-contact-beats` with `G-tackle-transition`.
- `G-rain-reads-dry` with `G-wet-surface`.
- The cut and block halves of `G-contact-locomotion` into `G-catch-cut-block`.

They also correct three causes:
- **Rain is already darker.** Don't darken it further.
- **The venue void is not a missing crowd (WS2).** It is missing stand lighting and an unfilled backdrop.
- **Hands already have fingers.**

1. **G-log-coherence** (ui, +0.4, sev 3, S, WS7)
   - Write kick and punt results to the log only when the ball is declared dead.
   - Make each staged scenario seed log entries that end at the current spot. A touchback at the 20 must lead to a snap at the 20, and a TD "from 20 yd out" must follow a drive that reached the 20.
   - Test: in `R14`, `R15`, `R17` and `R21`, no log line contradicts the scorebug spot or the ball state.
2. **G-portrait-presnap-scale** (mobile, +0.8 mobile and about +0.3 readability, sev 4, M, WS7)
   - Frame the portrait pre-snap and QB-hold cameras on the formation box (line of scrimmage ±12 yd) with the line of scrimmage at about 60% of the screen height.
   - Choose the field of view so a lineman is at least 22 CSS px tall and the outside receivers sit within 8% of the edges.
   - The far end zone must leave the shot.
   - Test: `high/mobile/R04` and `high/mobile/R08`.
3. **G-portrait-safe-area** (mobile, +0.3, sev 3, S, WS7)
   - Add bottom safe-area padding so the steering hint renders fully above the screen edge.
   - Hide the 3D board's lower rows whenever less than 60% of the board is visible under the HUD.
   - Test: `high/mobile/R10`, `high/mobile/R18` and `high/landscape/R14`.
4. **G-landscape-playlist** (typography, +0.4, sev 3, S, WS7)
   - In the 844 × 390 landscape panel, set play titles on one line (condensed, about 15 px, ellipsis as a fallback).
   - Shorten the header to "1ST & 10 · OWN 30".
   - Compact the cards so at least 4 show, and cut the scorebug to about 56–64 px tall.
   - Test: `high/landscape/R22` with no wrapped title or header.
5. **G-player-silhouette** (art, +0.6, sev 4, M, WS3)
   - Cut the pants and seat volume 25–35% and taper the thighs into the knee, keeping the hips inside the shoulder line.
   - Add a deltoid and forearm taper to the arms.
   - Remove the hem-stripe V-notch under the sleeve number and add sleeve-outline segments.
   - Leave the fingers alone; they already exist.
   - Test: `crops/high/R04-slot_QB`, `crops/high/R06-slot_LG` and `crops/high/R16-slot_K`.
6. **G-hint-panel** (ui, +0.2, sev 2, S, WS7)
   - Raise the steering-hint contrast to at least 7:1, matching the other muted text.
   - Fill the empty live-play panel with personnel, the defensive look and the hot read.
   - Test: `high/desktop/R07` and `high/desktop/R10`.
7. **G-lamp-veil** (lighting, +0.2, sev 2, S, WS1)
   - Clamp the bloom and glare from off-screen lamps: fade the flare sprite by its on-screen distance, or cap the bloom threshold contribution, so no grey veil covers the top-right sky.
   - Cut the bloom on the nearest painted yard lines in the day-mist frame.
   - Test: `strips/high/R09` frames 1–3, `high/desktop/R08` and `high/desktop/R19`.
8. **G-stand-falloff** (lighting, +0.3 lighting and +0.2 authenticity, sev 3, M, WS1)
   - Add field-spill light to the near and far grandstands, falling off with distance from the light banks, so the kickoff and punt wide shots show lit seating rather than a black bowl.
   - Replace the flat grey wall behind the replay bleacher with a dressed backdrop: a fence, the concourse and a treeline continuing the R15 pines.
   - Test: `high/desktop/R01`, `high/desktop/R17` and `strips/high/R13`.
9. **G-band-student-section** (authenticity, +0.4, sev 3, M, WS2)
   - Add a marching-band block in uniform colour with instrument silhouettes.
   - Add a student section with a distinct colour or "white-out" and its own waving pattern, in the home stands.
   - Both must be visible in the R01 and R03 framings and in `crops/high/R01-crowd`.
10. **G-catch-cut-block** (animation, +0.4, sev 3, M, WS4)
    - Before the catch, reach the receiver's hands toward the ball with IK for about 0.3 s, with a head turn.
    - Lean the carrier's torso 15–20° into cuts, with a visible plant foot.
    - Give blocking pairs a push-back and recovery cycle instead of a frozen crouch.
    - Test: `strips/high/R09` and `strips/high/R11`, and `crops/high/R09-slot_Z`.
11. **G-tackle-contact** (animation, +0.7, sev 4, L, WS4b)
    - Insert a 2–3 sample wrap and contact pose before every fall: tackler's arms around the carrier, carrier's torso jolting.
    - Stagger the descents so the pile builds across frames.
    - Complete the replay tackle inside the strip window.
    - Add a short punch-in or slow motion at first contact.
    - Test: `strips/high/R10` frames 5–6 and `strips/high/R13`.
12. **G-wet-surface** (lighting, +0.3, sev 3, M, WS5)
    - Keep the current wet-turf darkening.
    - Make the low-frequency puddle masks (several yards across) visible from the gameplay camera.
    - Clamp the specular peak and widen the lobe, so lamp reflections streak and spread instead of blowing out to one white hotspot.
    - Test: `high/desktop/R18` and `crops/high/R18-turf_26_67_40`.

Just outside the top 12:
- Officials built on the player base body (WS3, about +0.2 art).
- Punt staging with a deep punter and gunners (WS4, about +0.2 authenticity).

## Calibration
The unlabeled frame `reviews/loop-6/calibration.jpg` shows:
- Smooth, proportioned bodies with readable gear.
- A full crowd that reads as people.
- A dressed venue with signage, sideline benches and a goalpost.
- Hard cast shadows from a directional key light.
- Little bloom and a flat exposure.

On the anchors, I score it **art 7** and **lighting 6.5**.

```json
{
  "loop": 6,
  "role": "judge",
  "tier": "high",
  "scores": {
    "art": {
      "score": 5.5,
      "confidence": 0.8,
      "evidence": [
        { "shot": "crops/high/R04-slot_QB", "note": "Glossy helmets vs matte jerseys, but the orange seats balloon wider than the shoulders" },
        { "shot": "crops/high/R06-slot_LG", "note": "Faceted sleeve and a hem-stripe V-notch under the number" },
        { "shot": "crops/high/R06-slot_C-side", "note": "Separate curled fingers (A's mitten claim rejected); untapered arms" },
        { "shot": "crops/high/R03-slot_QB", "note": "Official: blank head, ball fists, floating sleeves" },
        { "shot": "crops/high/R01-crowd", "note": "Crowd reads as people up close" }
      ]
    },
    "lighting": {
      "score": 6.5,
      "confidence": 0.65,
      "evidence": [
        { "shot": "high/desktop/R04", "note": "Lamp bloom, night exposure, dusk sky, several soft shadows" },
        { "shot": "high/desktop/R18", "note": "Rain turf visibly darker than dry high/desktop/R10; no puddle shapes at gameplay distance" },
        { "shot": "crops/high/R18-turf_26_67_40", "note": "Wet response is one over-bright hotspot" },
        { "shot": "high/desktop/R01", "note": "Stands fall to black at the kickoff camera" },
        { "shot": "strips/high/R09", "note": "Off-screen lamp veil over the sky, frames 1-3" },
        { "shot": "strips/high/R13", "note": "Flat grey wall behind the replay bleacher" }
      ]
    },
    "animation": {
      "score": 5.0,
      "confidence": 0.8,
      "evidence": [
        { "shot": "strips/high/R10", "note": "Pile appears between frames 5 and 6 with no wrap or contact frame" },
        { "shot": "strips/high/R09", "note": "No reach or catch beat; prone bodies appear by frame 6; camera cut-in at frame 4" },
        { "shot": "strips/high/R11", "note": "Carrier glides with no plant or lean; blockers frozen in identical crouches" },
        { "shot": "strips/high/R13", "note": "Carrier never goes down in 8 frames" },
        { "shot": "crops/high/R07-slot_QB", "note": "Legible wind-up with the ball cocked" },
        { "shot": "crops/high/R12-carrier", "note": "Legible tackle result: tackler draped over the carrier, ball loose" }
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.75,
      "evidence": [
        { "shot": "high/desktop/R04", "note": "Broadcast scorebug, numbered route badges, on-field down marker" },
        { "shot": "high/desktop/R21", "note": "Clear result hierarchy; log touchback-at-20 contradicts the own-37 spot" },
        { "shot": "high/desktop/R17", "note": "Punt logged as downed while the ball is in the air" },
        { "shot": "high/desktop/R14", "note": "Log return-to-32 then TD from 20 yd out" },
        { "shot": "high/desktop/R10", "note": "Side panel ~60% empty during live play; dim hint" }
      ]
    },
    "typography": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/desktop/R22", "note": "Consistent condensed display plus sans body; tenth card legible though dimmed" },
        { "shot": "high/desktop/R21", "note": "Clear headline/subtitle scale, glanceable numerals" },
        { "shot": "high/landscape/R22", "note": "Header and play titles wrap to two lines; only 2.5 cards" },
        { "shot": "high/mobile/R10", "note": "Steering hint clipped at the bottom edge" }
      ]
    },
    "readability": {
      "score": 6.0,
      "confidence": 0.8,
      "evidence": [
        { "shot": "high/desktop/R10", "note": "Carrier ring and tag, blue LOS and yellow first-down line read" },
        { "shot": "high/desktop/R08", "note": "Ball visible mid-air with the cyan target disc" },
        { "shot": "high/mobile/R04", "note": "Formation ~10 CSS px figures in a thin band; about half the view empty downfield turf" },
        { "shot": "strips/high/R10", "note": "Runner lost in the scrum in frames 6-8" }
      ]
    },
    "mobile": {
      "score": 6.0,
      "confidence": 0.8,
      "evidence": [
        { "shot": "high/mobile/R04", "note": "Thumb-sized HIKE/CHANGE PLAY but tiny pre-snap figures" },
        { "shot": "high/mobile/R10", "note": "Hint cut off at the bottom; 3D board sliver under the HUD" },
        { "shot": "high/mobile/R12", "note": "Docked result band with the pile above; large CONTINUE and REPLAY" },
        { "shot": "high/landscape/R04", "note": "Landscape HIKE and CHANGE PLAY fit" },
        { "shot": "high/landscape/R22", "note": "Scorebug ~17% of height; oversized wrapped play cards" }
      ]
    },
    "authenticity": {
      "score": 6.5,
      "confidence": 0.65,
      "evidence": [
        { "shot": "high/desktop/R20", "note": "Jessieville: two-side 3A bleachers, track, pines, JHS board" },
        { "shot": "crops/high/R01-crowd", "note": "Home crowd reads as people" },
        { "shot": "high/desktop/R22", "note": "Spa City play names, painted HOT SPRINGS end zone" },
        { "shot": "high/desktop/R01", "note": "Black bowl at kickoff; no band or student section anywhere" },
        { "shot": "high/desktop/R17", "note": "Punt staged as a kickoff-style line of 11" }
      ]
    }
  },
  "gaps": [
    {
      "id": "G-log-coherence",
      "category": "ui",
      "expectedGain": 0.4,
      "severity": 3,
      "effort": "S",
      "workstream": "WS7",
      "evidence": ["high/desktop/R17", "high/desktop/R21", "high/desktop/R15", "high/desktop/R14"],
      "benchmark": "madden26-3",
      "fix": "Write kick and punt results to the log only when the ball is dead, and seed each staged scenario's log so its entries end at the current spot (touchback at the 20 leads to a snap at the 20; a TD from 20 yd out follows a drive that reached the 20). Test: no log line in R14, R15, R17 or R21 contradicts the scorebug spot or the ball state."
    },
    {
      "id": "G-portrait-presnap-scale",
      "category": "mobile",
      "expectedGain": 0.8,
      "severity": 4,
      "effort": "M",
      "workstream": "WS7",
      "evidence": ["high/mobile/R04", "high/mobile/R08"],
      "benchmark": "retrobowl-1",
      "fix": "Frame the portrait pre-snap and QB-hold cameras on the formation box (LOS +/-12 yd) with the LOS at about 60% of screen height. Set the FOV so a lineman is at least 22 CSS px tall and the outside receivers sit within 8% of the edges; the far end zone leaves the shot. Also lifts readability about +0.3. Merges G-phone-framing."
    },
    {
      "id": "G-portrait-safe-area",
      "category": "mobile",
      "expectedGain": 0.3,
      "severity": 3,
      "effort": "S",
      "workstream": "WS7",
      "evidence": ["high/mobile/R10", "high/mobile/R18", "high/landscape/R14"],
      "benchmark": "retrobowl-2",
      "fix": "Add bottom safe-area padding so the steering hint renders fully on portrait. Hide the 3D board's lower rows whenever less than 60% of the board is visible under the HUD."
    },
    {
      "id": "G-landscape-playlist",
      "category": "typography",
      "expectedGain": 0.4,
      "severity": 3,
      "effort": "S",
      "workstream": "WS7",
      "evidence": ["high/landscape/R22", "medium/landscape/R22"],
      "benchmark": "madden26-3",
      "fix": "At 844x390, set play titles on one line (condensed, about 15 px, with an ellipsis fallback), shorten the header to '1ST & 10 · OWN 30', compact the cards so at least 4 show, and cut the scorebug to about 56-64 px tall. Test: no wrapped title or header in high/landscape/R22."
    },
    {
      "id": "G-player-silhouette",
      "category": "art",
      "expectedGain": 0.6,
      "severity": 4,
      "effort": "M",
      "workstream": "WS3",
      "evidence": ["crops/high/R04-slot_QB", "crops/high/R06-slot_LG", "crops/high/R16-slot_K"],
      "benchmark": "axis-3",
      "fix": "Cut the pants and seat volume 25-35%, tapering the thighs into the knee and keeping the hips inside the shoulder line. Add a deltoid and forearm taper to the arms. Remove the hem-stripe V-notch under the sleeve number and add sleeve-outline segments. The fingers already exist; leave them out of scope."
    },
    {
      "id": "G-hint-panel",
      "category": "ui",
      "expectedGain": 0.2,
      "severity": 2,
      "effort": "S",
      "workstream": "WS7",
      "evidence": ["high/desktop/R07", "high/desktop/R10"],
      "benchmark": "axis-1",
      "fix": "Raise the steering-hint contrast to at least 7:1 to match the other muted text, and fill the empty live-play side panel with personnel, the defensive look and the hot read."
    },
    {
      "id": "G-lamp-veil",
      "category": "lighting",
      "expectedGain": 0.2,
      "severity": 2,
      "effort": "S",
      "workstream": "WS1",
      "evidence": ["strips/high/R09", "high/desktop/R08", "high/desktop/R19"],
      "benchmark": "cfb26-3",
      "fix": "Fade the off-screen lamp flare by its on-screen distance (or cap its bloom contribution) so no grey veil covers the sky in R08 and R09 frames 1-3. Cut the bloom on the nearest painted yard lines in the day-mist frame."
    },
    {
      "id": "G-stand-falloff",
      "category": "lighting",
      "expectedGain": 0.3,
      "severity": 3,
      "effort": "M",
      "workstream": "WS1",
      "evidence": ["high/desktop/R01", "high/desktop/R17", "strips/high/R13"],
      "benchmark": "cfb26-3",
      "fix": "Add field-spill light to the near and far grandstands, falling off with distance from the light banks, so the kickoff and punt wide shots show lit seating instead of a black bowl. Replace the flat grey wall behind the replay bleacher with a dressed backdrop (fence, concourse, the R15 treeline). Also about +0.2 authenticity. The cause is lighting and an unfilled backdrop, not a missing crowd."
    },
    {
      "id": "G-band-student-section",
      "category": "authenticity",
      "expectedGain": 0.4,
      "severity": 3,
      "effort": "M",
      "workstream": "WS2",
      "evidence": ["high/desktop/R01", "crops/high/R01-crowd", "high/desktop/R20"],
      "benchmark": "cfb26-1",
      "fix": "Add a marching-band block in uniform colour with instrument silhouettes, and a student section with a distinct colour (or white-out) and its own waving pattern, in the home stands. Both must be visible in the R01 and R03 framings and in crops/high/R01-crowd."
    },
    {
      "id": "G-catch-cut-block",
      "category": "animation",
      "expectedGain": 0.4,
      "severity": 3,
      "effort": "M",
      "workstream": "WS4",
      "evidence": ["strips/high/R09", "strips/high/R11", "crops/high/R09-slot_Z"],
      "benchmark": "madden26-4",
      "fix": "Reach the receiver's hands toward the ball with IK for about 0.3 s before the catch, with a head turn. Lean the carrier's torso 15-20 degrees into cuts with a visible plant foot. Give blocking pairs a push-back and recovery cycle instead of a frozen crouch. Merges G-catch-cut-poses and G-contact-locomotion."
    },
    {
      "id": "G-tackle-contact",
      "category": "animation",
      "expectedGain": 0.7,
      "severity": 4,
      "effort": "L",
      "workstream": "WS4b",
      "evidence": ["strips/high/R10", "strips/high/R13", "strips/high/R09"],
      "benchmark": "cfb26-4",
      "fix": "Insert a 2-3 sample wrap and contact pose before every fall (tackler's arms around the carrier, carrier's torso jolting). Stagger the descents so the pile builds across frames, complete the replay tackle within the strip window, and add a short punch-in or slow motion at first contact. Merges G-contact-beats and G-tackle-transition."
    },
    {
      "id": "G-wet-surface",
      "category": "lighting",
      "expectedGain": 0.3,
      "severity": 3,
      "effort": "M",
      "workstream": "WS5",
      "evidence": ["high/desktop/R18", "crops/high/R18-turf_26_67_40"],
      "benchmark": "cfb26-4",
      "fix": "Keep the current wet-turf darkening (already visibly darker than dry). Make the low-frequency puddle masks, several yards across, visible from the gameplay camera. Clamp the specular peak and widen the lobe so lamp reflections streak and spread instead of blowing out to one white hotspot. Merges G-rain-reads-dry."
    }
  ],
  "verdict": "continue",
  "calibration": { "art": 7, "lighting": 6.5 }
}
```
