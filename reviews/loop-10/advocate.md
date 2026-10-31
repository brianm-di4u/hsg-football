# Advocate rebuttal: loop 10, High tier

Capture paths are relative to `games/football/screenshots/review-loop-10/`. I opened every capture cited below. Where I give luminance numbers, they are medians of 85×20 px bins taken across a horizontal band of the frame. Medians keep the white yard lines from skewing the result.

## Summary
Most of what the critics say holds up, and I concede it: there is no catch reach, the sideline replay never shows a takedown, the venue is thin, the sideline players are clones, the portrait pre-snap figures are small, and the live desktop panel is mostly empty. Four claims are plainly wrong or blame the wrong cause.
1. **"Light pools don't read" (Critic A).** This comes from how the patches were sampled. Measured across each frame, the field shows a 15–20% lateral pool/gap swing in `high/desktop/R02` and `high/desktop/R17`, and about 12–15% in `high/desktop/R04`. That is already the "±15–20%" A's own fix asks for.
2. **"Hands are mitten-like at every close-up" (Critic A).** False. Separate fingers and thumbs are visible in `crops/high/R12-carrier`, `crops/high/R14-carrier` and `crops/high/R06-slot_C-side`.
3. **"Frames 6–8 identical" in `strips/high/R09` and `strips/high/R10` (Critic A).** Overstated. Frame-to-frame mean pixel difference is 4.1–4.3/255, which is low but not zero. The play has settled; it is not a frozen frame.
4. **The phone-performance penalty in Critic A's mobile score uses the wrong tier.** The brief names Medium as the phone tier, and Medium holds a 49 fps minimum at 4× throttle.

Codex's severity-5 gaps with +1.5 gains, and its 4.5 for animation, are larger than the evidence supports.

## Art: critics 6.0 / 5.5 (mean 5.75). Proposed **6.0**
- **Concede (Codex), `crops/high/R04-slot_C`:** the center's hips and pants are inflated and bulbous, and the jersey hem has a crinkled, angular edge. This is a real construction flaw.
- **Concede (Codex), `crops/high/R06-slot_C-side`:** the Lakeside forearms are coarse and flat white.
- **Concede (both), `crops/high/R03-slot_QB`:** the foreground official is all black and faceless under a white cap, with mitten hands.
- **Rebut (Critic A, factual error): "hands are mitten-like at every close-up".**
  - `crops/high/R12-carrier`: a white-gloved hand at the left edge shows four separated fingers and a thumb, and the black-gloved hand at the right edge shows separated, curled fingers.
  - `crops/high/R14-carrier`: #74's raised hand has spread fingers.
  - `crops/high/R06-slot_C-side`: the white gloves show fingers and thumbs.
  - Only the officials have mitten hands.
- **Rebut in part (Critic A): "officials are faceless mannequins with black blob heads".** In `crops/high/R12-carrier` the back official has a brown skin-toned head and arms under a black cap. There is no facial detail, but the officials are not uniformly black blobs.
- **Rebut in part (Codex): "sleeve-to-forearm gaps".** In `crops/high/R12-carrier` the visible break is at the official's elbow joint, not along the sleeve.
- **Support for the 7-anchor items:**
  - Glossy helmets with decals and cages contrast with matte jerseys, and numbers and stripes hold at 2× (`crops/high/R04-slot_C`, `crops/high/R14-carrier`).
  - The crowd reads as people in mixed school colours with raised arms (`crops/high/R01-crowd`).
  - Turf has texture at field level (`crops/high/R18-turf_26_67_40`).
- **Concede:** the venue still mixes in primitives, with cone trees and black walls (`high/desktop/R15`, `high/desktop/R13`).
- **Score:** 6.0 sits between the 5 anchor ("no gloss, no texture detail, crowd as blocks"), which this clearly exceeds, and the 7 anchor, which the hip/arm construction and the officials miss. Codex's 0.97 confidence at 5.5 ignores that the 5 anchor's defining failures are absent.

## Lighting: critics 6.0 / 6.5 (mean 6.25). Proposed **6.5**
- **Rebut (Critic A, wrong cause): G-light-pools-invisible.**
  - A's three 180×180 patches in `high/desktop/R04` sit at x≈50–230, 370–550 and 700–880, near the bottom of the frame (y 600–780). Each side patch straddles a pool and a gap, which averages the contrast away.
  - Lateral median profiles in `high/desktop/R04` show a darker centre and brighter sides:
    - y≈540: 131 / 133 / 128 / **121 / 117 / 117** / 124 / 130 / 133
    - y≈395: 130 / 136 / … / **116 / 120** / … / 132 / 133
    - The swing is about 12–15%.
  - In `high/desktop/R02` the swing is about 20%:
    - y≈300: 123–127 at the sides against **104–105** in the centre
    - y≈420: 120 against **97**
  - In `high/desktop/R17`, y≈560 reads 121 / 115 / 105 / **97 / 99** / 108 / 117 / 121.
  - Front-to-back, the near field in `high/desktop/R04` (y≈700, median about 90) is darker than the mid field (about 125).
  - In this camera the visible towers stand at the far corners (`high/desktop/R04`), so a brighter far field is the falloff working as intended, not a failure of it.
  - The pools are visible by eye in `high/desktop/R02`: lighter green flanks and a darker centre band.
  - **What I concede:** the effect is subtle in the pre-snap behind-QB view.
- **Concede (Critic A): the sky is graded like dusk.** Orange-lit clouds appear in `high/desktop/R04`, `high/desktop/R10` and `high/desktop/R14`.
- **Concede (Critic A): the kick ribbon reads as chalk in `high/desktop/R02`.** It is a white line lying on the turf from the ball to midfield.
  - In `high/desktop/R17` it tapers and reads more like an aerial streak.
  - A cyan landing ring is visible there at the 35.
- **Concede (Codex): replay depth of field softens the carrier.** In `high/desktop/R15` "44 DELACROIX" and his blockers are visibly soft. The edge energy on the carrier (19.4) is no higher than on the background bleachers (20.2).
- **Concede (both): the wet-turf highlight is an isolated white patch.** See `crops/high/R18-turf_26_67_40`. At gameplay distance `high/desktop/R18` shows rain streaks but little turf sheen.
- **Credit both critics underweight:**
  - Several soft shadows per player from separate towers (`high/desktop/R17`, `crops/high/R18-turf_26_67_40`)
  - Lamp bloom (`high/desktop/R01`, `high/desktop/R20`)
  - Helmet specular highlights (`crops/high/R14-carrier`)
  - Dark surroundings beyond the field (`high/desktop/R02`, `high/desktop/R17`)
- **Score:** together these meet most of the 7 anchor ("several soft shadows, bloom, wet sheen, falloff field to stands"). The misses are the grade and the depth-of-field focus. 6.5.

## Animation: critics 5.5 / 4.5 (mean 5.0). Proposed **5.5**
- **Concede (Critic A): G-catch-beat.** `strips/high/R09` frames 1–3 show the ball approaching target 2. By frame 4 "88 HOLLOWAY" is already running with his arms low, and `crops/high/R09-slot_Z` shows the arms down. There is no reach. This is the strongest animation gap.
- **Rebut (Critic A): "no punch-in at the catch".** `strips/high/R09` frame 4 is visibly tighter and lower than frames 3 and 5: the players are larger and the 30-yard numerals are closer. That is a camera punch-in landing on the catch moment. A calls it a "hard camera cut". It exists; it is just not paired with a reach.
- **Concede (Critic A): `strips/high/R13`.** "26 KEMP" stays upright inside a cluster through frames 1–8, and no takedown is shown.
- **Rebut in part (Critic A): "frames 6–8 identical".** Measured frame-to-frame differences in `strips/high/R10` are 4.10 and 4.06, and in `strips/high/R09` 4.33 and 4.33, against about 0 for a true freeze. There is residual motion, though the action has settled.
- **Concede (Codex):** `strips/high/R10` jumps from an upright carrier (frame 5) to a pile (frame 6). The fall is too fast to read.
- **Concede (Codex), `crops/high/R12-carrier`:** the ball floats above the pile and does not look secured.
- **Rebut (Codex): 4.5 is below the 5 anchor ("procedural cycles that read, with popping, floaty contact, stiff falls").** The captures exceed that anchor in places:
  - `crops/high/R07-slot_QB` shows a legible cocked wind-up with the ball behind the helmet, and `strips/high/R07` carries the drop.
  - `crops/high/R11-carrier` shows a full stride with a forward lean and the ball tucked, and `strips/high/R11` shows lateral travel with the carrier ring tracking.
  - Falls vary: a prone diving defender in `strips/high/R09` frame 6 against a body-on-body pile in `crops/high/R12-carrier`.
  - Feel touches are present: the catch punch-in (`strips/high/R09` f4) and a replay camera (`strips/high/R13`).
- **Rebut in part (Critic A): "celebration poses synchronised".** In `crops/high/R14-carrier`, #12 has both arms up with the ball, #74 raises one arm and #9 is airborne mid-jump. `high/desktop/R14` shows a mix of one-arm and two-arm poses.
- **Score:** 5.5 is the 5 anchor plus some feel touches. Codex's 4.5 would put the game below "cycles that read", which `strips/high/R11` contradicts.

## UI / HUD: critics 6.5 / 6.5. Proposed **6.5**
- **Concede:**
  - The live desktop panel is about 55–60% empty (`high/desktop/R08`, `high/desktop/R10`, `high/desktop/R18`).
  - The right-hand official is drawn over the toast's gold rule (`high/desktop/R12`).
  - Edge badge "1" hides the painted "1st" (`high/mobile/R04`).
  - The star "5" badge sits on the QB (`high/mobile/R04`).
- **Rebut (Codex): "`high/desktop/R01` devotes a full-height sidebar almost entirely to Kickoff/Skip".** That is true of the content, but the brief's slimmer quiet-state panel is visible: in `high/desktop/R01`, `high/desktop/R02`, `high/desktop/R14` and `high/desktop/R17` it is 250 px (x≈1030–1280), against 360 px in `high/desktop/R04`. The criticism should target the live-state panel, which Critic A already captures as G-desktop-panel-empty.
- **Credit:**
  - Shaped and numbered receiver badges with matching route art (`high/desktop/R04`, `high/landscape/R04`)
  - Ten whole play cards with no fade (`high/desktop/R22`)
  - A carrier nameplate (`high/desktop/R10`)
  - A landing ring on punts (`high/desktop/R17`)
- **Score:** 6.5 stands.

## Typography: critics 6.5 / 7.0 (mean 6.75). Proposed **7.0**
- **Nothing is clipped anywhere:**
  - Ten whole cards with two-line descriptions wrapping cleanly (`high/desktop/R22`)
  - Whole wrapped log entries (`high/landscape/R12`, `high/desktop/R15`)
  - A clear condensed display face over a humanist sans body, with big numerals in the scorebug (`high/landscape/R12`)
- **Rebut (Critic A): "case is mixed for the same information".** The panel's "1ST & 10 · OWN 30" in `high/desktop/R08` is a section heading set in the all-caps display style used for every panel heading ("HOLLOW CURLS", "NEXT: 2ND & 5 · OWN 40"). That is a deliberate heading convention, not an inconsistency.
- **Rebut in part (Critic A): "the result banner's primary line is smaller than the scorebug team names".** In `high/desktop/R12`, "+5 YD" is about the same size as "LAKESIDE", and "TOUCHDOWN!" in `high/desktop/R14` is the largest type on screen.
- **Concede:** desktop card descriptions and log lines are small, about 11 px (`high/desktop/R22`).
- **Score:** this meets the 7 anchor's "consistent display/condensed pair… nothing clipped… numerals at a glance".

## Readability: critics 6.5 / 6.0 (mean 6.25). Proposed **6.5**
- **Concede:**
  - Portrait pre-snap linemen are about 18–20 CSS px; they measure about 38–40 image px in `high/mobile/R04`.
  - Receivers 1 and 2 are edge badges, and routes leave the frame (`medium/mobile/R04`).
  - The upper half of the portrait field is empty above the formation (`high/mobile/R04`).
- **Rebut in part (Codex): "the desktop formation occupies a narrow band beneath empty scenery".** In `high/desktop/R04` all five eligible receivers are on screen with route art and badges, and the line of scrimmage and line to gain are clear. The empty area is mostly near field below the formation, which is the space the curls run into. Codex does credit the pass and run reads in `high/desktop/R08` and `high/desktop/R10`.
- **Credit:** the portrait pass-corridor framing in `high/mobile/R08` has the ball, ribbon and target "2" mid-frame, with the receiver about 35 CSS px.
- **Score:** 6.5.

## Mobile: critics 6.5 / 6.0 (mean 6.25). Proposed **6.5**
- **Rebut (Critic A, wrong tier): G-high-phone-perf.** The brief says Medium is the phone tier, and Medium at 4× throttle holds a 49 fps minimum (perf table). High's 13 fps is not the shipped phone configuration. Codex correctly scored perf from Medium. This gap should be severity 1 with negligible gain.
- **Concede:**
  - Small portrait pre-snap figures and edge-dependent receivers (`medium/mobile/R04`)
  - Landscape figures about 15 CSS px (`high/landscape/R04`)
  - The result toast covers players at the bottom of the field (`high/landscape/R12`)
- **Credit:**
  - Large thumb buttons (`high/mobile/R04` HIKE/CHANGE PLAY, `high/mobile/R08` JUKE)
  - A compact two-bar scorebug (`high/mobile/R08`)
  - A complete landscape formation with all five badges (`high/landscape/R04`)
  - Whole log rows (`high/landscape/R12`)
- **Score:** 6.5.

## Authenticity: critics 6.0 / 6.0. Proposed **6.0**
- **Concede:** there is no band, student section or track (`high/desktop/R01`), and the sideline players are clones (`high/desktop/R13`, `high/desktop/R15`).
- **Rebut in part (both): "one bleacher block, dark walls, no press box".** Not every venue is that thin:
  - `high/desktop/R03` (Wolf Stadium) has a lit field house or press building with windows behind the end zone.
  - `high/desktop/R20` (Jessieville) has stands on both sidelines.
  - Codex cites `high/desktop/R03` for "plain perimeter surfaces", but that frame contains the building.
- **Score:** this does not lift the score above 6.0, but it lowers the severity of G-venue-dressing.

## Gap adjustments
| Gap | Critic sev / gain | Advocate sev / gain | Why |
|---|---|---|---|
| G-catch-beat | 4 / 0.5 | 4 / 0.5 | Conceded (`strips/high/R09`, `crops/high/R09-slot_Z`) |
| G-venue-dressing | 4 / 0.5 | 3 / 0.4 | `high/desktop/R03` has a building; `high/desktop/R20` has two-sided stands |
| G-mannequin-officials-hands | 3 / 0.5 | 2 / 0.3 | Player hands have fingers (`crops/high/R12-carrier`, `crops/high/R14-carrier`); only the officials are mannequins |
| G-light-pools-invisible | 3 / 0.5 | 2 / 0.2 | Pools measure 12–20% lateral swing (`high/desktop/R02`, `high/desktop/R17`, `high/desktop/R04`); the dusk sky grade remains |
| G-tackle-contact-readability | 3 / 0.5 | 3 / 0.5 | Conceded (`strips/high/R13`); frames 6–8 are not literally frozen |
| G-portrait-figure-size | 3 / 0.3 | 3 / 0.3 | Conceded |
| G-sideline-clones | 2 / 0.2 | 2 / 0.2 | Conceded |
| G-desktop-panel-empty | 2 / 0.3 | 2 / 0.3 | Conceded |
| G-toast-hierarchy | 2 / 0.3 | 2 / 0.2 | The official overlap is real; the case complaint is a heading convention |
| G-high-phone-perf | 2 / 0.2 | 1 / 0.0 | Wrong tier: Medium is the phone tier at 49 fps |
| G-kick-ribbon-chalk | 1 / 0.1 | 1 / 0.1 | Conceded for `high/desktop/R02` |
| G-player-construction | 5 / 1.5 | 4 / 0.75 | Hips and arms are real, but gloss, decals and fingers already exceed the 5 anchor |
| G-contact-resolution | 5 / 1.5 | 4 / 0.75 | Same defect as G-tackle-contact-readability; gains are not additive |
| G-locomotion-weight | 4 / 1.0 | 3 / 0.5 | `crops/high/R11-carrier` shows stride and lean |
| G-camera-space | 4 / 1.0 | 3 / 0.5 | Mobile pre-snap is conceded; the desktop shows all receivers; the panel half overlaps G-desktop-panel-empty |
| G-night-and-replay-focus | 3 / 0.5 | 3 / 0.3 | Replay softness conceded (`high/desktop/R15`) |
| G-wet-surface | 3 / 0.5 | 2 / 0.3 | Real, but limited to the rain scene |
| G-venue-life | 3 / 0.5 | 3 / 0.5 | Conceded |

```json
{
  "loop": 10,
  "role": "advocate",
  "tier": "high",
  "scores": {
    "art": { "score": 6.0, "confidence": 0.7, "evidence": [
      { "shot": "crops/high/R12-carrier", "note": "separated fingers and thumbs on white and black gloves; skin-toned official under cap; refutes 'mitten hands at every close-up'" },
      { "shot": "crops/high/R14-carrier", "note": "glossy helmets with decals and cages vs matte jerseys; #74 raised hand has spread fingers" },
      { "shot": "crops/high/R04-slot_C", "note": "conceded: inflated angular hips and crinkled jersey hem" },
      { "shot": "crops/high/R03-slot_QB", "note": "conceded: foreground official is a faceless black mannequin with mitten hands" },
      { "shot": "crops/high/R01-crowd", "note": "crowd reads as people in mixed school colours" }
    ] },
    "lighting": { "score": 6.5, "confidence": 0.65, "evidence": [
      { "shot": "high/desktop/R02", "note": "lateral turf medians 123-127 at the sides vs 104-105 in the centre (y~300): pools visible, ~20% swing" },
      { "shot": "high/desktop/R17", "note": "121/115/105/97/99/108/117/121 at y~560; several soft shadows per player; tapered kick ribbon and landing ring" },
      { "shot": "high/desktop/R04", "note": "12-15% lateral pool/gap swing; near field darker than mid; sky graded like dusk (conceded)" },
      { "shot": "high/desktop/R15", "note": "conceded: replay depth of field softens the carrier" },
      { "shot": "crops/high/R18-turf_26_67_40", "note": "wet sheen present but an isolated white patch (conceded)" }
    ] },
    "animation": { "score": 5.5, "confidence": 0.65, "evidence": [
      { "shot": "strips/high/R09", "note": "no reach at catch (conceded); frame 4 is a camera punch-in at the catch; frames 6-8 differ by ~4.3/255, not frozen" },
      { "shot": "strips/high/R13", "note": "conceded: no takedown visible in the replay" },
      { "shot": "strips/high/R10", "note": "frame 5->6 upright to pile jump (conceded); varied fall vs R09 prone dive" },
      { "shot": "crops/high/R11-carrier", "note": "full stride, forward lean, ball tucked" },
      { "shot": "crops/high/R07-slot_QB", "note": "legible cocked wind-up" }
    ] },
    "ui": { "score": 6.5, "confidence": 0.75, "evidence": [
      { "shot": "high/desktop/R04", "note": "shaped numbered badges, route art, panel diagram" },
      { "shot": "high/desktop/R14", "note": "250 px quiet-state panel; large TOUCHDOWN banner" },
      { "shot": "high/desktop/R10", "note": "conceded: live panel ~55-60% empty" },
      { "shot": "high/desktop/R12", "note": "conceded: official drawn over toast's gold rule" }
    ] },
    "typography": { "score": 7.0, "confidence": 0.65, "evidence": [
      { "shot": "high/desktop/R22", "note": "ten whole cards, clean two-line wraps, nothing clipped; descriptions small (~11 px)" },
      { "shot": "high/landscape/R12", "note": "condensed display plus sans body, big numerals, whole wrapped log entries" },
      { "shot": "high/desktop/R08", "note": "all-caps panel heading is the consistent heading convention, not mixed case" }
    ] },
    "readability": { "score": 6.5, "confidence": 0.65, "evidence": [
      { "shot": "high/desktop/R04", "note": "all five eligible receivers on screen with badges, route art, LOS and line to gain" },
      { "shot": "high/mobile/R08", "note": "ball, ribbon and target mid-frame in portrait pass corridor" },
      { "shot": "high/mobile/R04", "note": "conceded: linemen ~18-20 CSS px; star badge on QB; empty upper field" },
      { "shot": "high/desktop/R10", "note": "carrier nameplate and ring read at a glance" }
    ] },
    "mobile": { "score": 6.5, "confidence": 0.6, "evidence": [
      { "shot": "medium/mobile/R04", "note": "conceded: small pre-snap figures, edge-badge receivers; Medium is the phone tier at 49 fps min (4x throttle)" },
      { "shot": "high/mobile/R08", "note": "intentional pass-corridor framing; full-width JUKE thumb button" },
      { "shot": "high/landscape/R04", "note": "full formation with all five badges; figures ~15 CSS px (conceded)" },
      { "shot": "high/landscape/R12", "note": "whole log rows, large CONTINUE; toast covers bottom players (conceded)" }
    ] },
    "authenticity": { "score": 6.0, "confidence": 0.7, "evidence": [
      { "shot": "high/desktop/R03", "note": "Wolf Stadium has a lit field house or press building behind the end zone, plus painted WOLVES end zone" },
      { "shot": "high/desktop/R20", "note": "3A scale with stands on both sidelines" },
      { "shot": "crops/high/R01-board", "note": "HS scoreboard" },
      { "shot": "high/desktop/R13", "note": "conceded: cloned sideline, lone bleacher block, no band or student section" }
    ] }
  },
  "gaps": [
    { "id": "G-catch-beat", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS4", "evidence": ["strips/high/R09", "crops/high/R09-slot_Z"], "benchmark": "cfb26-4", "fix": "Blend to a hands-up reach 6-10 ticks before arrival, snap the ball to the hands, then tuck; keep the existing punch-in but land it on the reach." },
    { "id": "G-venue-dressing", "category": "authenticity", "expectedGain": 0.4, "severity": 3, "effort": "L", "workstream": "WS2", "evidence": ["high/desktop/R01", "high/desktop/R15", "high/desktop/R03"], "benchmark": "cfb26-2", "fix": "Add a visitor bleacher, a press box at Hot Springs, a band block, a student section, a track ring, fencing and sponsor boards; R03's field house shows the venue kit can carry built structures." },
    { "id": "G-mannequin-officials-hands", "category": "art", "expectedGain": 0.3, "severity": 2, "effort": "M", "workstream": "WS3", "evidence": ["crops/high/R03-slot_QB", "crops/high/R12-carrier"], "benchmark": "axis-3", "fix": "Officials only: face planes, brimmed cap, fingered hands, closed elbow joint. Player gloves already have fingers." },
    { "id": "G-light-pools-invisible", "category": "lighting", "expectedGain": 0.2, "severity": 2, "effort": "S", "workstream": "WS1", "evidence": ["high/desktop/R04", "high/desktop/R02", "high/desktop/R17"], "benchmark": "cfb26-3", "fix": "Pools already measure a 12-20% lateral swing; strengthen them modestly in the behind-QB view and grade the sky from dusk to night." },
    { "id": "G-tackle-contact-readability", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS4b", "evidence": ["strips/high/R13", "strips/high/R10"], "benchmark": "madden26-4", "fix": "Wrap, drive and fall sequence with a visible impact lean spread over several ticks, a short hit-stop at contact, and settle motion. Same defect as G-contact-resolution; gains are not additive." },
    { "id": "G-portrait-figure-size", "category": "mobile", "expectedGain": 0.3, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["high/mobile/R04", "medium/mobile/R04"], "benchmark": "retrobowl-1", "fix": "Tighten the portrait pre-snap lens so linemen reach about 26 CSS px, move the formation up into the empty upper field, offset badges above heads, and keep edge badges clear of painted markers." },
    { "id": "G-sideline-clones", "category": "art", "expectedGain": 0.2, "severity": 2, "effort": "S", "workstream": "WS2", "evidence": ["high/desktop/R15", "high/desktop/R13"], "benchmark": "axis-3", "fix": "Vary sideline poses, facing and idle phase; cluster players; mix in helmets off." },
    { "id": "G-desktop-panel-empty", "category": "ui", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R08", "high/desktop/R10"], "benchmark": "madden26-3", "fix": "Collapse the live-play panel to the 250 px quiet-state width or fill it with useful live info." },
    { "id": "G-toast-hierarchy", "category": "typography", "expectedGain": 0.2, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R12", "high/desktop/R21"], "benchmark": "madden26-3", "fix": "Raise the toast's primary line and draw the toast above 3D figures with a solid backing. The case convention is already consistent." },
    { "id": "G-high-phone-perf", "category": "mobile", "expectedGain": 0.0, "severity": 1, "effort": "S", "workstream": "WS7", "evidence": ["high/mobile/R10", "medium/mobile/R10"], "fix": "Ensure phones default to Medium (49 fps min at 4x throttle). High's 13 fps is not the phone tier." },
    { "id": "G-kick-ribbon-chalk", "category": "lighting", "expectedGain": 0.1, "severity": 1, "effort": "S", "workstream": "WS1", "evidence": ["high/desktop/R02", "high/desktop/R17"], "fix": "Make the kick ribbon additive and emissive and lift it off the ground plane in the high top-down kickoff view." },
    { "id": "G-player-construction", "category": "art", "expectedGain": 0.75, "severity": 4, "effort": "L", "workstream": "WS3", "evidence": ["crops/high/R04-slot_C", "crops/high/R06-slot_C-side"], "benchmark": "axis-3", "fix": "Rebuild hip, crotch and shoulder transitions, smooth forearms, add restrained fabric structure and body-type variation. Helmets, decals and gloves are already at standard." },
    { "id": "G-contact-resolution", "category": "animation", "expectedGain": 0.75, "severity": 4, "effort": "L", "workstream": "WS4b", "evidence": ["strips/high/R10", "crops/high/R12-carrier"], "benchmark": "cfb26-4", "fix": "Continuous wrap, compression and balance loss over several ticks; keep the ball attached to the carrier through the fall. Overlaps G-tackle-contact-readability." },
    { "id": "G-locomotion-weight", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS4", "evidence": ["strips/high/R11", "strips/high/R07"], "benchmark": "madden26-4", "fix": "Plant the outside foot before cuts, add hip and shoulder rotation through throws, vary blocking reactions. Stride and lean already read in crops/high/R11-carrier." },
    { "id": "G-camera-space", "category": "readability", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["medium/mobile/R04", "high/mobile/R04"], "benchmark": "retrobowl-1", "fix": "Use the empty portrait upper field to fit eligible receivers; keep the pass-corridor framing. The desktop panel half duplicates G-desktop-panel-empty." },
    { "id": "G-night-and-replay-focus", "category": "lighting", "expectedGain": 0.3, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["high/desktop/R15", "high/desktop/R13"], "benchmark": "cfb26-4", "fix": "Put the replay focal plane on the tagged carrier so he is sharp." },
    { "id": "G-wet-surface", "category": "lighting", "expectedGain": 0.3, "severity": 2, "effort": "M", "workstream": "WS5", "evidence": ["high/desktop/R18", "crops/high/R18-turf_26_67_40"], "benchmark": "cfb26-4", "fix": "Spread angle-dependent tower reflections across the wet turf instead of one white patch." },
    { "id": "G-venue-life", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["crops/high/R01-crowd", "high/desktop/R01"], "benchmark": "cfb26-2", "fix": "Add recognizable student and band groups with clustered poses scaled to high-school attendance." }
  ],
  "verdict": "continue"
}
```
