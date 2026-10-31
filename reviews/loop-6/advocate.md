# Advocate: loop 6, High tier

All capture paths are relative to `games/football/screenshots/review-loop-6/`. I opened every capture cited below. I also measured mean field colour on the rain and dry frames, zoomed the R06 sleeve and the tenth play card, and checked them against the benchmarks.

## Summary

Most of what both critics said holds up. The pants and seat are inflated, the tackle pile appears between strip frames, the kickoff and punt cameras show a black bowl, the portrait pre-snap formation is tiny, and stale log lines show up in five desktop frames. I concede all of these, and the build doesn't clear any 7 gate on this evidence.

Several specific claims are wrong or blame the wrong cause, though:
- Critic A's headline lighting finding, that rain "looks the same as dry turf", is measurably false.
- Critic A's "mitten hands" are not in the cited crop.
- Critic A calls the tenth play card "unreadable", and Critic B says it "fades into near invisibility". The card is legible.
- The venue-void gap blames a missing crowd (WS2). The crowd is modelled and lit up close and shows at the frame edges. What fails is the kickoff and punt camera framing and the stand light falloff.

I propose small upward corrections to lighting, typography and authenticity. Every other category stays at the critic mean.

## Facts the critics got plainly wrong

| # | Critic | Claim | What the capture shows |
|---|---|---|---|
| F1 | A | Rain: "the turf in `high/desktop/R18` looks the same as dry turf in `high/desktop/R10`… no darker" | Mean RGB of the lower field (x 0–920, y 560–800) is **(56,102,60) dry vs (26,71,39) rain**. The upper field (y 330–560) is (76,114,72) vs (46,82,54). Medium shows the same: (63,102,65) vs (33,73,42). Side by side, the rain field is visibly darker. Visible standing-water patches really are missing; the "no darker" part is wrong. |
| F2 | A | "Arms are uniform black or white tubes ending in mitten hands (`crops/high/R06-slot_C-side`)" | In that crop, #55's right hand has separated fingers curled toward the palm, and so does his left hand on the line. #63 in `crops/high/R06-slot_DL2-side` also has separate fingers on the down hand. The arms are untapered tubes (true). The mitten claim is false. |
| F3 | A | "The tenth play card is faded… its description is unreadable" (`high/desktop/R22`) | At 3× zoom the card reads in full: "Fountain Play-Action / PASS / Fake the dive; TE drag and a deep crosser". The card border closes above the fade. It is dimmed, not unreadable. Critic B's "near invisibility" overstates it the same way. |
| F4 | A | Typography: the board's seven-segment clock "spaces oddly as '3:5 1'" (`high/mobile/R14`) | This is how a seven-segment "1" lights: only the right-hand segments, in a full-width cell. `crops/high/R01-board` shows the unlit ghost segments, so this is a faithful in-world scoreboard prop, not a UI type defect. |
| F5 | A | "Hint text is low-contrast and clipped (`high/mobile/R10`, `high/landscape/R10`)" | In `high/landscape/R10` the hint "Steer by dragging on the field." sits whole under JUKE. It is dim but not clipped. Clipping is a portrait-only problem (`high/mobile/R08`, `high/mobile/R10`). |
| F6 | A | `high/desktop/R15` shows "one small floating bleacher block against a blank grey wall" | R15 shows a dense pine treeline and a sky band above the bleacher. The flat grey wall is in `high/desktop/R13`, not R15. |
| F7 | A | `crops/high/R09-slot_Z`: "a defender's leg passes through his legs (interpenetration)" | The defender's helmet shows over #88's left shoulder, directly behind him. The blue sock and white cleat between #88's legs read as that defender's leg seen past #88: occlusion. One frozen view can't prove interpenetration. |
| F8 | A | "No punch-ins" | `strips/high/R09` frame 4 cuts to a much tighter, lower camera on #88 HOLLOWAY at the catch, then eases to a medium framing for 5–8. It's a camera move at the right moment, but abrupt (a cut, not a push). Partial credit only. |
| F9 | A | `crops/high/R08-ball` "has no ball in it, so the ball's own read is weak" | The crop really has no ball, but that is the capture rig's camera missing its target. The same moment at gameplay scale, `high/desktop/R08`, shows the brown ball clearly mid-air at about (550,475), with the cyan target disc under the receiver. `high/mobile/R08` shows it too. This can't count against in-game readability. |

## Category by category

### Art: critics 5.5 / 5.5 (mean 5.5). Proposed **5.5**
- **Concede: balloon pants and seat.** `crops/high/R04-slot_QB` (#12, #44), `crops/high/R06-slot_C` (#10, #56) and `crops/high/R16-slot_K` (holder #12) all show orange seats wider than the shoulders. This is the single biggest art defect. Against `axis-3.jpg` the proportions are clearly toy-like.
- **Concede: sleeve notch.** Zoomed, `crops/high/R06-slot_LG` shows a V-notch cut into the top white hem stripe under the "20". There is also a visible shading crease across the stripe. The hem stripe itself runs all the way round.
- **Concede: officials.** `crops/high/R03-slot_QB` shows a blank-headed referee with floating striped sleeves detached from the arm (B's "separated shoulder and elbow" is accurate) and ball fists.
- **Rebut: hands (F2).** Fingers are modelled and visible in `crops/high/R06-slot_C-side` and `crops/high/R06-slot_DL2-side`.
- **Missed evidence on the 7-anchor traits.**
  - Glossy helmets with specular hits against matte jerseys: `crops/high/R04-slot_C`, and the bronze shells in `crops/high/R03-slot_QB`.
  - Turf grain at field level: `crops/high/R04-turf_26_67_42`.
  - The crowd reads as people with varied shirts and raised arms: `crops/high/R01-crowd`.
  - Built venue objects: the Wolf Stadium press box with lit windows in `high/desktop/R03`, and two-side bleachers at Jessieville in `high/desktop/R20`.

  These put art above a flat 5. The silhouette holds it below 6. **5.5 is fair.**

### Lighting: critics 6.0 / 6.5 (mean 6.25). Proposed **6.5**
- **Rebut A's rain finding (F1).** The turf is clearly darkened in rain, and `crops/high/R18-turf_26_67_40` shows a wet specular response (B agrees). What remains true:
  - No yard-scale puddle shapes read from the gameplay camera (`high/desktop/R18`).
  - The close-up highlight beside #66 is soft-edged but over-bright.
- **Concede: the stands fall to black** at the kickoff and punt cameras (`high/desktop/R01`, `high/desktop/R02`, `high/desktop/R17`).
- **Concede: the flat grey band** behind the replay bleacher (`high/desktop/R13`).
- **Partly concede: the "grey veil"** in `high/desktop/R07` and `strips/high/R09` frames 1–3. It is bloom from a lamp just out of frame. It reads as haze and is heavier than it should be, but it is the same lamp bloom the 7 anchor asks for, seen in-frame in `high/desktop/R04` and `high/desktop/R22`.
- **Strengths both critics confirm.**
  - Several soft player shadows: `crops/high/R04-turf_26_67_42`, `crops/high/R09-slot_Z`.
  - Night exposure with a dusk sky.
  - A coherent day-mist grade: `high/desktop/R19`. B is right that the nearest yard lines glow slightly there.
- **Verdict.** A's 6.0 rests partly on a false rain reading. With the rain darkening credited, **6.5** matches the visible evidence. It is still short of 7 because of the falloff into the stands and the missing puddles.

### Animation: critics 5.0 / 4.5 (mean 4.75). Proposed **5.0**
- **Concede: abrupt piles.**
  - `strips/high/R10` goes from upright traffic in frame 5 to a pile with a man down in frame 6, with no wrap frame.
  - `strips/high/R09` goes from running in frame 5 to prone bodies in frame 6.
  - `strips/high/R13`: the carrier never goes down in 8 frames.
  - `strips/high/R07` is too wide to read the drop.
  - Blocking pairs hold near-identical crouches across `strips/high/R11` and `strips/high/R10` (B's claim holds).
- **Concede: little lean in the cut.** `crops/high/R11-carrier` shows #44 in a real running stride with a slight forward lean but no lateral lean into the cut.
- **Positives the 4.5 under-weights.**
  - The QB wind-up with the ball cocked behind the helmet is legible: `crops/high/R07-slot_QB`.
  - Three-point stances with weight on the down hand and feet planted: `crops/high/R06-slot_DL2-side`.
  - A tackle result with the tackler (#47) draped over the carrier (#20) and the ball popped up: `crops/high/R12-carrier`. That reads as a tackle, not merely "compressed overlap".
  - Celebration jumps and raised arms: `crops/high/R14-carrier`.
  - A camera cut-in at the catch: `strips/high/R09` frame 4 (F8).
- **Verdict.** That matches the 5 anchor ("procedural cycles that read, but with popping") exactly. **5.0.**

### UI / HUD: critics 6.0 / 7.0 (mean 6.5). Proposed **6.5**
- **Concede: stale or contradictory log lines.** They are on screen in five frames:
  - `high/desktop/R17`: the punt is logged as downed while the ball is in the air.
  - `high/desktop/R21`, `high/desktop/R13`, `high/desktop/R15`: a touchback at the 20, then a snap at the own 37, 40 or 41.
  - `high/desktop/R14`: a return to the own 32, then a TD "from 20 yd out".

  The rubric's "nothing stale" fails. These are probably artifacts of capture scenarios that jump to fixed spots, but they are visible and they count.
- **Concede: the side panel is mostly empty** during live play (`high/desktop/R07`, `high/desktop/R10`).
- **Rebut: the R14 board.** The board in `high/desktop/R14` is a world object partly out of frame. "HSHS 6 / LHS 0 / 3:51 / DOWN 1 / TO GO 10 / BALL ON 20" all read. That is camera framing, not a HUD overlap.
- **Missed evidence.**
  - Context-aware HUD theming: in `high/desktop/R19` (day game) the side panel switches to a light theme with a burgundy HIKE button. That trait sits in the 9 anchor.
  - The defensive pre-snap `high/desktop/R05` gives "YOUR DEFENSE: FIRE BLITZ" with a coloured blitz-path diagram. Neither critic cited R05, which is a primary UI capture.
- **Verdict.** Strengths and the log failures balance. **6.5.**

### Typography: critics 6.5 / 7.0 (mean 6.75). Proposed **7.0**
- **Rebut F3 (the card is readable) and F4 (seven-segment "1").** Together they remove two of A's four typography demerits.
- **Concede: landscape wrapping.**
  - `high/landscape/R22` breaks "Bathhouse / Dive", "Central / Avenue Sweep" and "…AT THE / OWN 30" onto two lines each.
  - The steer hint is dim on desktop and landscape (`high/desktop/R10`, `high/landscape/R10`).
- **What remains is a consistent system.**
  - A condensed display face for the scorebug, buttons, headlines and play titles, plus a humanist sans for descriptions: `high/desktop/R22`, `high/desktop/R21`.
  - A clear headline/subtitle scale in the bands: "+7 YD · FIRST DOWN / M. DELACROIX RUN" in `high/desktop/R21`, "TOUCHDOWN! / 20-YD RUN" in `high/mobile/R14`.
  - Numerals that read at a glance.
  - The phone play-call grid in `high/mobile/R22` sets every title on one line.
- **Verdict.** Against `madden26-3.jpg` this is a competent 7, with one landscape layout flaw. **7.0.**

### Readability: critics 6.0 / 6.0 (mean 6.0). Proposed **6.0**
- **Concede: portrait pre-snap.** `high/mobile/R04` puts the formation in a thin band at about 20 device px (about 10 CSS px) per player, with roughly half the field view empty turf to the far end zone. The brief's "far stands take about a tenth" is true, but the empty field is now the waste.
- **Concede: small figures at the desktop pre-snap**, about 25 px (`high/desktop/R04`).
- **Rebut A's ball claim (F9).** The ball is visible in `high/desktop/R08` and `high/mobile/R08`.
- **Desktop reads well.** The carrier ring and name tag, the cyan target disc, and the blue scrimmage and yellow first-down lines all read clearly (`high/desktop/R10`, `high/desktop/R08`).
- **Verdict.** The portrait failure keeps this at **6.0**.

### Mobile: critics 6.0 / 6.0 (mean 6.0). Proposed **6.0**
- **Concede.**
  - Tiny portrait pre-snap figures: `high/mobile/R04`.
  - The hint is cut off at the bottom in portrait: `high/mobile/R08`, `high/mobile/R10`.
  - A board sliver ("DOWN TO GO BALL ON") shows under the HUD: `high/mobile/R10`.
  - The landscape scorebug takes about 17% of the height, and only 2.5 cards show: `high/landscape/R22`.
  - A board sliver peeks above the TD band in landscape: `high/landscape/R14`.
- **Missed evidence.**
  - `high/mobile/R22`'s two-column play grid shows six cards with full titles and is thumb-sized.
  - `high/mobile/R12` docks the result band with large CONTINUE and REPLAY buttons.
  - The High phone proxy's 50 fps minimum clears the 30 fps bar.
- **Verdict.** Still **6.0**. The framing fault outweighs these.

### Authenticity: critics 6.0 / 6.5 (mean 6.25). Proposed **6.5**
- **Concede.**
  - No band and no identifiable student section in any frame.
  - The punt in `high/desktop/R17` shows the coverage team as a straight 10-man line at about the 45, which looks like kickoff coverage, with no punter visible.
- **Partly rebut A's "venue void".**
  - The Wolf Stadium press box sits behind the end zone in `high/desktop/R03`.
  - Jessieville has bleachers on both sidelines in a pine setting: `high/desktop/R20`.
  - The home crowd sits at the left edge of `high/desktop/R04`, `high/desktop/R22` and `high/landscape/R22`, and is full and lit in `crops/high/R01-crowd`.
- **Strengths.**
  - Painted end zones: HOT SPRINGS, WOLVES, TROJANS, LAKESIDE, JESSIEVILLE.
  - Midfield logos and the HSHS/LHHS seven-segment board (`crops/high/R01-board`).
  - Spa City play names, Ouachita ridgelines and team benches.
- **Verdict.** That is above "generic" and at least the gate. **6.5.**

## Gap adjustments

- **Duplicates.** `G-portrait-presnap-scale` and `G-phone-framing` are the same fix, as are `G-contact-beats` and `G-tackle-transition`, and `G-rain-reads-dry` and `G-wet-surface`. Their gains shouldn't be summed.
- **`G-player-silhouette`.** I lower it to severity 4 and +0.6 for both critics' versions. Fingers already exist (F2), so the fix scope is the pants and seat, the arm taper, the sleeve notch and the shoulder blocking. That is M, not L.
- **`G-venue-void`.** I lower it to severity 3 and +0.5. The cause is kickoff and punt camera framing plus stand falloff, not an absent crowd (WS2). Wolf already has a press box.
- **Animation gaps at +1.0 each.** Two of them (+2.0 on one category) is not credible when the remaining 7-anchor items (catch, cut, falls, feel) are separate gaps. I set the tackle gaps to +0.7, severity 4, and contact-locomotion to +0.5, severity 4.
- **Rain gaps.** The claimed cause, "reads dry", is wrong (F1). The darkening fix would over-darken an already-dark field. What remains is puddle visibility and clamping the hotspot: +0.3, severity 3.
- **`G-panel-fade`.** The card is readable (F3); only the hint-contrast half stands: +0.2, severity 1.
- **`G-stand-falloff-veil`.** It overlaps the venue framing gap: +0.2, severity 2.
- **`G-exposure-integration`.** I lower it to +0.3, severity 2.

```json
{
  "loop": 6,
  "role": "advocate",
  "tier": "high",
  "scores": {
    "art": {
      "score": 5.5,
      "confidence": 0.75,
      "evidence": [
        { "shot": "crops/high/R04-slot_QB", "note": "Conceded: inflated orange seats wider than the shoulders on #12 and #44" },
        { "shot": "crops/high/R06-slot_C-side", "note": "Separate curled fingers on #55's hands; A's 'mitten hands' is false" },
        { "shot": "crops/high/R06-slot_LG", "note": "Hem stripe runs fully round, but a V-notch under the number and a shading crease remain" },
        { "shot": "crops/high/R03-slot_QB", "note": "Official: floating sleeves, blank head (conceded); glossy bronze helmets vs matte jerseys" },
        { "shot": "crops/high/R01-crowd", "note": "Crowd reads as people with varied shirts and raised arms" },
        { "shot": "high/desktop/R03", "note": "Wolf Stadium press box with lit windows: built venue object" }
      ]
    },
    "lighting": {
      "score": 6.5,
      "confidence": 0.65,
      "evidence": [
        { "shot": "high/desktop/R18", "note": "Rain field measurably darker than dry (lower-field mean RGB 26,71,39 vs 56,102,60); no yard-scale puddles visible" },
        { "shot": "high/desktop/R10", "note": "Dry reference for the rain comparison" },
        { "shot": "crops/high/R18-turf_26_67_40", "note": "Wet specular response; the hotspot is soft-edged but over-bright" },
        { "shot": "high/desktop/R04", "note": "Lamp bloom in frame, dusk sky, believable night exposure" },
        { "shot": "crops/high/R04-turf_26_67_42", "note": "Several soft shadows per player" },
        { "shot": "high/desktop/R01", "note": "Conceded: stands fall to black at the kickoff camera" }
      ]
    },
    "animation": {
      "score": 5.0,
      "confidence": 0.75,
      "evidence": [
        { "shot": "strips/high/R10", "note": "Conceded: pile appears between frames 5 and 6 with no wrap" },
        { "shot": "strips/high/R09", "note": "Frame 4 camera cut-in at the catch (abrupt); prone bodies appear by frame 6" },
        { "shot": "strips/high/R13", "note": "Conceded: carrier never goes down in 8 frames" },
        { "shot": "crops/high/R07-slot_QB", "note": "Legible wind-up with the ball cocked" },
        { "shot": "crops/high/R12-carrier", "note": "Tackler draped over the carrier, ball popped up: a legible tackle result" },
        { "shot": "crops/high/R06-slot_DL2-side", "note": "Planted three-point stances with weight on the down hand" }
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/desktop/R04", "note": "Broadcast scorebug, numbered shape badges, route art, dominant HIKE" },
        { "shot": "high/desktop/R05", "note": "Defensive pre-snap: FIRE BLITZ panel with coloured blitz diagram (uncited by both critics)" },
        { "shot": "high/desktop/R19", "note": "Context-aware light panel theme for the day game" },
        { "shot": "high/desktop/R17", "note": "Conceded: punt logged as downed while the ball is in the air" },
        { "shot": "high/desktop/R21", "note": "Clock agrees across scorebug, board and log; log touchback-at-20 contradicts the own-37 spot" }
      ]
    },
    "typography": {
      "score": 7.0,
      "confidence": 0.65,
      "evidence": [
        { "shot": "high/desktop/R22", "note": "Condensed display plus sans body on a clear scale; tenth card fully legible above the fade" },
        { "shot": "high/desktop/R21", "note": "Clear headline/subtitle hierarchy in the result band" },
        { "shot": "high/mobile/R22", "note": "Phone play-call grid with single-line titles" },
        { "shot": "high/landscape/R22", "note": "Conceded: titles and header wrap to two lines" },
        { "shot": "crops/high/R01-board", "note": "Seven-segment board with ghost segments; the '1' spacing is authentic, not a type defect" }
      ]
    },
    "readability": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/desktop/R08", "note": "Ball clearly visible mid-air with the cyan target disc; the empty ball crop is a capture-rig miss" },
        { "shot": "high/desktop/R10", "note": "Carrier ring and name tag; blue scrimmage and yellow first-down lines" },
        { "shot": "high/mobile/R04", "note": "Conceded: formation about 10 CSS px per player, half the view empty turf" },
        { "shot": "high/mobile/R08", "note": "Ball visible but small on the phone" }
      ]
    },
    "mobile": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/mobile/R04", "note": "Conceded: tiny pre-snap figures" },
        { "shot": "high/mobile/R10", "note": "Conceded: hint cut off at the bottom; board sliver under the HUD" },
        { "shot": "high/mobile/R22", "note": "Two-column thumb-sized play grid, six cards visible" },
        { "shot": "high/mobile/R12", "note": "Docked result band with large CONTINUE and REPLAY" },
        { "shot": "high/landscape/R22", "note": "Conceded: scorebug about 17% of the height, 2.5 cards" }
      ]
    },
    "authenticity": {
      "score": 6.5,
      "confidence": 0.6,
      "evidence": [
        { "shot": "high/desktop/R03", "note": "WOLVES end zone, Wolf Stadium press box" },
        { "shot": "high/desktop/R20", "note": "Jessieville bleachers on both sidelines in a pine setting" },
        { "shot": "crops/high/R01-board", "note": "HSHS/LHHS seven-segment high-school board" },
        { "shot": "high/desktop/R17", "note": "Conceded: punt coverage looks like a kickoff line" },
        { "shot": "high/desktop/R01", "note": "Conceded: no band or student section; dark bowl at kickoff" }
      ]
    }
  },
  "gaps": [
    {
      "id": "G-portrait-presnap-scale",
      "category": "mobile",
      "expectedGain": 0.8,
      "severity": 4,
      "effort": "M",
      "workstream": "WS7",
      "evidence": ["high/mobile/R04", "high/mobile/R08", "medium/mobile/R04"],
      "benchmark": "retrobowl-1",
      "fix": "Conceded as stated. Frame the portrait pre-snap and QB-hold cameras on the formation box (LOS +/- 12 yd), LOS at about 60% of the screen height, lineman at least 22 CSS px tall. Duplicate of G-phone-framing: gains are not additive."
    },
    {
      "id": "G-player-silhouette",
      "category": "art",
      "expectedGain": 0.6,
      "severity": 4,
      "effort": "M",
      "workstream": "WS3",
      "evidence": ["crops/high/R04-slot_QB", "crops/high/R06-slot_C", "crops/high/R06-slot_LG", "crops/high/R16-slot_K"],
      "benchmark": "axis-3",
      "fix": "Cut the pants and seat volume 25-35% and keep the hips inside the shoulder line; taper the arms (deltoid, forearm); remove the hem-stripe V-notch under the sleeve number. Fingers already exist (crops/high/R06-slot_C-side), so drop the glove and finger work from scope."
    },
    {
      "id": "G-venue-void",
      "category": "authenticity",
      "expectedGain": 0.5,
      "severity": 3,
      "effort": "M",
      "workstream": "WS2",
      "evidence": ["high/desktop/R01", "high/desktop/R13", "high/desktop/R17"],
      "benchmark": "cfb26-1",
      "fix": "Cause challenged: the crowd exists and is lit (crops/high/R01-crowd, left edge of high/desktop/R04), and Wolf has a press box (high/desktop/R03). Frame the kickoff and punt cameras to include the home stands, add spill light so they don't fall to black, and fill the grey wall behind the replay bleacher (high/desktop/R13)."
    },
    {
      "id": "G-contact-beats",
      "category": "animation",
      "expectedGain": 0.7,
      "severity": 4,
      "effort": "L",
      "workstream": "WS4b",
      "evidence": ["strips/high/R10", "strips/high/R13", "strips/medium/R10"],
      "benchmark": "madden26-4",
      "fix": "Conceded. Add a 2-3 frame wrap and contact pose before the fall, stagger the falls so the pile builds visibly, and punch in at first contact. Duplicate of G-tackle-transition: gains are not additive."
    },
    {
      "id": "G-catch-cut-poses",
      "category": "animation",
      "expectedGain": 0.4,
      "severity": 3,
      "effort": "M",
      "workstream": "WS4",
      "evidence": ["crops/high/R09-slot_Z", "crops/high/R11-carrier", "strips/high/R09", "strips/high/R11"],
      "benchmark": "cfb26-4",
      "fix": "Conceded for the reach and the cut lean. The interpenetration claim is unproven (the defender is behind #88, so it reads as occlusion). IK the hands to the ball before the catch; lean the torso 15-20 degrees into cuts."
    },
    {
      "id": "G-rain-reads-dry",
      "category": "lighting",
      "expectedGain": 0.3,
      "severity": 3,
      "effort": "M",
      "workstream": "WS5",
      "evidence": ["high/desktop/R18", "high/desktop/R10", "crops/high/R18-turf_26_67_40"],
      "benchmark": "axis-3",
      "fix": "Cause challenged: the rain turf is already much darker than dry (lower-field mean RGB 26,71,39 vs 56,102,60), so don't darken further. Make the puddle masks read at the gameplay camera and clamp the specular peak. Duplicate of G-wet-surface."
    },
    {
      "id": "G-mobile-clipping",
      "category": "mobile",
      "expectedGain": 0.3,
      "severity": 3,
      "effort": "S",
      "workstream": "WS7",
      "evidence": ["high/mobile/R10", "high/mobile/R08", "high/landscape/R22", "high/landscape/R14"],
      "benchmark": "retrobowl-2",
      "fix": "Conceded, except that landscape R10's hint is not clipped. Add bottom safe-area padding in portrait, hide board slivers under the HUD, and compact the landscape scorebug and play cards."
    },
    {
      "id": "G-log-coherence",
      "category": "ui",
      "expectedGain": 0.3,
      "severity": 2,
      "effort": "S",
      "workstream": "WS7",
      "evidence": ["high/desktop/R17", "high/desktop/R21", "high/desktop/R14", "high/desktop/R13"],
      "benchmark": "madden26-3",
      "fix": "Conceded. Log kick results only when the ball is dead, and make staged scenarios produce prior entries that match the current spot."
    },
    {
      "id": "G-stand-falloff-veil",
      "category": "lighting",
      "expectedGain": 0.2,
      "severity": 2,
      "effort": "M",
      "workstream": "WS1",
      "evidence": ["high/desktop/R07", "strips/high/R09"],
      "benchmark": "cfb26-3",
      "fix": "The veil is bloom from a lamp just off-frame: clamp off-screen glare intensity. The stand-falloff half overlaps G-venue-void."
    },
    {
      "id": "G-officials-mannequin",
      "category": "art",
      "expectedGain": 0.2,
      "severity": 2,
      "effort": "M",
      "workstream": "WS3",
      "evidence": ["crops/high/R03-slot_QB"],
      "benchmark": "axis-3",
      "fix": "Conceded. Build the officials on the player base body with a cap, face, belt and joined sleeves."
    },
    {
      "id": "G-empty-panel-hint",
      "category": "ui",
      "expectedGain": 0.2,
      "severity": 2,
      "effort": "S",
      "workstream": "WS7",
      "evidence": ["high/desktop/R07", "high/desktop/R10", "high/landscape/R10"],
      "benchmark": "axis-1",
      "fix": "Conceded. Use the empty live-play panel for personnel and defensive-look info; raise the steer-hint contrast."
    },
    {
      "id": "G-tackle-transition",
      "category": "animation",
      "expectedGain": 0.7,
      "severity": 4,
      "effort": "L",
      "workstream": "WS4b",
      "evidence": ["strips/high/R09", "strips/high/R10", "crops/high/R12-carrier"],
      "benchmark": "cfb26-4",
      "fix": "Same defect as G-contact-beats. A +1.0 gain is overstated because the R12 result pose already reads as a tackle (crops/high/R12-carrier). Add wrap, balance loss and staggered descent."
    },
    {
      "id": "G-contact-locomotion",
      "category": "animation",
      "expectedGain": 0.5,
      "severity": 4,
      "effort": "L",
      "workstream": "WS4",
      "evidence": ["strips/high/R11", "strips/high/R10"],
      "benchmark": "madden26-4",
      "fix": "Conceded: the blocking crouches repeat. No foot sliding is shown in the cited strips at that scale, so the fix is to add force and recovery to blocks and hip and torso lean into cuts. +1.0 on top of the tackle gaps is not credible."
    },
    {
      "id": "G-phone-framing",
      "category": "mobile",
      "expectedGain": 0.8,
      "severity": 4,
      "effort": "M",
      "workstream": "WS7",
      "evidence": ["high/mobile/R04", "high/mobile/R08"],
      "benchmark": "retrobowl-1",
      "fix": "Same defect as G-portrait-presnap-scale. Fit phase-specific portrait cameras to the formation and receiving area."
    },
    {
      "id": "G-exposure-integration",
      "category": "lighting",
      "expectedGain": 0.3,
      "severity": 2,
      "effort": "M",
      "workstream": "WS1",
      "evidence": ["high/desktop/R19", "high/desktop/R13"],
      "benchmark": "cfb26-3",
      "fix": "Minor glow on the nearest yard lines in R19; the flat grey background band is in R13. Reduce bloom on painted markings and add depth to the grey surround."
    },
    {
      "id": "G-wet-surface",
      "category": "lighting",
      "expectedGain": 0.3,
      "severity": 3,
      "effort": "M",
      "workstream": "WS5",
      "evidence": ["crops/high/R18-turf_26_67_40", "high/desktop/R18"],
      "benchmark": "cfb26-4",
      "fix": "Same defect as G-rain-reads-dry. Soften and broaden the hotspot and make yard-scale puddle boundaries visible at the gameplay camera."
    },
    {
      "id": "G-venue-life",
      "category": "authenticity",
      "expectedGain": 0.5,
      "severity": 3,
      "effort": "M",
      "workstream": "WS2",
      "evidence": ["crops/high/R01-crowd", "high/desktop/R20"],
      "benchmark": "cfb26-1; cfb26-2",
      "fix": "Conceded: no band or student section is visible. Add them as distinct groups in venue-specific seating."
    },
    {
      "id": "G-panel-fade",
      "category": "typography",
      "expectedGain": 0.2,
      "severity": 1,
      "effort": "S",
      "workstream": "WS7",
      "evidence": ["high/desktop/R22", "high/desktop/R10"],
      "benchmark": "axis-4",
      "fix": "The tenth card's description is legible above the fade ('Fake the dive; TE drag and a deep crosser'). Only the steer-hint contrast stands: raise it."
    }
  ],
  "verdict": "continue"
}
```
