# Judge ruling: loop 10, High tier

Capture paths are relative to `games/football/screenshots/review-loop-10/`. I opened every capture cited below. Luminance figures are my own: medians of 90×20 px bins across a horizontal band of the frame.

## Disputed facts, checked
- **Light pools (A says invisible, advocate says 12–20% swing).** Both are partly right.
  - Mid-field, the pools are real. In `high/desktop/R04` at y≈540 I read 110 / 121 / 117 / 108 / **98 / 103** / 115 / 120 / 115. In `high/desktop/R02` at y≈420 it is 118–123 at the flanks against **102** in the centre. In `high/desktop/R17` at y≈560 it is 135 against **115**. You can see the lighter flanks by eye in `R02` and `R17`.
  - The near field of the gameplay camera is flat. `high/desktop/R04` at y≈700 reads 88–95 all the way across, which is where Critic A sampled.
  - **Ruling:** the pools exist but read as a broad bright-flanks, dark-centre gradient across mid-field, not as per-tower pools, and they don't reach the near field. A's "invisible" is wrong; so is the advocate's claim that the pools are already sufficient.
- **Player hands (A says mittens everywhere).** The advocate is right. `crops/high/R12-carrier` shows separated gloved fingers on both the white and the black hand. `crops/high/R14-carrier` (#74) and `crops/high/R06-slot_C-side` show fingers and thumbs. Only the officials have mitten hands (`crops/high/R03-slot_QB`).
- **Officials.** Critic A and Codex are right about the foreground official in `crops/high/R03-slot_QB`. The head is a black, featureless blob. The striped sleeves float apart from the torso with a visible gap at the shoulder. The hands are mittens. The back official in `crops/high/R12-carrier` is skin-toned but still has no face.
- **Strips freezing (A says frames 6–8 are identical).** The advocate is right on the letter. Bodies shift slightly between frames 6, 7 and 8 in `strips/high/R09` and `strips/high/R10`. But the play has settled and the tail adds no readable motion.
- **Phone tier.** The advocate is right. The brief says "Medium is the phone and mid tier". Medium holds a 49 fps minimum at 4× throttle, so High's 13 fps does not count against mobile. Codex's point about Medium's worst p95 of 42 ms (above a 33 ms budget) is valid, but it was measured on a loaded machine.
- **Desktop pre-snap space (Codex vs advocate).** Codex is right. In `high/desktop/R04` and `high/desktop/R20` the camera sits behind the offense and the routes run upfield, away from the camera. The near field below the formation (y≈560–800, about 30% of the field view) is behind the play and holds only an official. The advocate's claim that "the curls run into" it is wrong.
- **Venue thinness.** The advocate is right in part. `high/desktop/R03` has a lit field house behind the end zone, and `high/desktop/R20` has stands on both sidelines. `high/desktop/R01` and `high/desktop/R15` are still one bleacher block, black slabs and cone trees.

## Category rulings

### Art: 6.0 (critics 6.0 / 5.5, advocate 6.0)
- **What reaches the 7 anchor:**
  - Glossy helmets with decals and cages contrast with matte jerseys (`crops/high/R14-carrier`, `crops/high/R04-slot_C`).
  - Gloved hands have fingers (`crops/high/R12-carrier`).
  - The crowd reads as people (`crops/high/R03-slot_QB` background).
- **What holds it below 7:**
  - The center's pants balloon into bulbous, angular hips, and his jersey hem is crinkled (`crops/high/R04-slot_C`).
  - Forearms are coarse, flat white (`crops/high/R06-slot_C-side`).
  - The foreground official is a faceless mannequin with detached sleeves (`crops/high/R03-slot_QB`).
  - The venue has cone trees, and the sideline players are identical, evenly spaced clones (`high/desktop/R15`).
- **Ruling:** Codex's 5.5 ignores that the 5 anchor's defining failures (no gloss, crowd as blocks) are absent. 6.0.

### Lighting & atmosphere: 6.5 (critics 6.0 / 6.5, advocate 6.5)
- **What works:**
  - Several soft shadows fall under each player, one from each tower (`high/desktop/R17`, `crops/high/R18-turf_26_67_40`).
  - The lamps bloom (`high/desktop/R01`, `high/desktop/R20`).
  - Helmets carry specular highlights (`crops/high/R14-carrier`).
  - The bowl around the field is dark, and the mid-field pools measure 15–20% (see above).
- **What misses:**
  - The sky is graded as dusk, with orange clouds (`high/desktop/R04`).
  - The near field is flat (`high/desktop/R04`, y≈700).
  - At gameplay distance the rain frame has streaks but no turf sheen (`high/desktop/R18`). The only wet cue is one isolated white hot spot in the close-up (`crops/high/R18-turf_26_67_40`).
  - Replay depth of field softens the tagged carrier (`high/desktop/R15`).
- **Ruling:** most of the 7 anchor's ingredients are present, but the rain sheen and night grade are not. 6.5.

### Animation & game feel: 5.0 (critics 5.5 / 4.5, advocate 5.5; spread 1.0)
- **What reads:**
  - Run cycles with stride and lean (`strips/high/R11`, `crops/high/R11-carrier`).
  - The QB wind-up in the close-up (`crops/high/R07-slot_QB`).
  - The `strips/high/R09` frame 4 cut is tighter, so there is a punch-in.
- **The three beats the 7 anchor names are not legible:**
  - **Catch:** in `strips/high/R09` frames 3→4 the ball arrives at a receiver running with his arms down, and `crops/high/R09-slot_Z` shows no reach.
  - **Tackle:** in `strips/high/R10` frames 5→6 the carrier goes from upright to a finished pile in one step. In `strips/high/R13` "26 KEMP" stays upright through all 8 frames and no takedown is shown.
  - **Ball security:** in `crops/high/R12-carrier` the ball floats above the pile.
- **Ruling:** this is the 5 anchor exactly, "cycles that read, with popping, floaty contact, stiff falls". The few feel touches don't offset three missing beats. Codex's 4.5 undersells the cycles; the advocate's 5.5 oversells the touches. 5.0.

### UI / HUD: 6.5 (critics 6.5 / 6.5)
- **Strengths:**
  - Shaped, numbered receiver badges with route art, mirrored in the panel (`high/desktop/R04`).
  - Ten whole play cards (`high/desktop/R03`).
  - The carrier nameplate (`high/desktop/R10`).
  - The quiet-state panel is 250 px (`high/desktop/R02`, `high/desktop/R17`).
- **Weaknesses:**
  - The live panel is about 45–55% empty (`high/desktop/R10`, `high/desktop/R18`).
  - The right official shows through the toast's faded edge and gold rule (`high/desktop/R12`).
  - In portrait, edge badge "1" covers the painted "1st & 10" (`medium/mobile/R04`).
- **Ruling:** 6.5.

### Typography: 7.0 (critics 6.5 / 7.0, advocate 7.0)
- **What meets the anchor:**
  - One condensed display face over a sans body, used throughout.
  - Big scorebug numerals.
  - Ten whole cards with clean two-line wraps (`high/desktop/R03`).
  - Whole log entries, and a strong two-line result hierarchy on the phone (`high/mobile/R21`).
- **Case:** the all-caps panel heading ("1ST & 10 · OWN 30") is a consistent heading style, not a case error.
- **Weaknesses, refinement level:**
  - The desktop result toast's primary line is small for the frame, about 20 px caps on 1280 (`high/desktop/R21`, `high/desktop/R12`).
  - Card descriptions are about 12 px.
- **Ruling:** meets the 7 anchor, narrowly. Gate met.

### Readability: 6.5 (critics 6.5 / 6.0, advocate 6.5)
- **What reads at a glance:**
  - The line of scrimmage and line to gain, the carrier ring and tag, and the target ring with the ball ribbon (`high/desktop/R10`, `medium/mobile/R08`).
  - The portrait pass corridor puts the receiver at about 35 CSS px with the ball mid-frame (`medium/mobile/R08`).
- **What takes effort:**
  - Desktop gameplay figures are about 20–25 px.
  - The desktop pre-snap formation is a thin band with empty near field behind it (`high/desktop/R04`).
  - Portrait pre-snap linemen are about 16–18 CSS px, and receivers 1 and 2 are edge badges (`medium/mobile/R04`). That is smaller than the brief's ~23.
- **Ruling:** 6.5.

### Mobile: 6.5 (critics 6.5 / 6.0, advocate 6.5)
- **What works:**
  - Big thumb buttons and a compact two-bar scorebug (`medium/mobile/R10`, `high/mobile/R21`).
  - Live-run figures at about 25 CSS px with a large carrier tag (`medium/mobile/R10`).
  - A deliberate pass corridor (`medium/mobile/R08`).
  - A landscape 70/30 split with a legible run (`medium/landscape/R10`).
- **What misses:** small portrait pre-snap figures with edge-badge receivers (`medium/mobile/R04`).
- **Performance:** I dropped A's High-tier perf penalty (wrong tier). Medium's 42 ms worst p95 stays an open check.
- **Ruling:** 6.5.

### Authenticity: 6.0 (critics 6.0 / 6.0)
- **What's right:**
  - The HS scoreboard and painted local end zones (`crops/high/R01-board`, `high/desktop/R03`).
  - The field house at Wolf Stadium (`high/desktop/R03`).
  - Stands on both sides at Jessieville (`high/desktop/R20`).
  - Local play names.
- **What's missing:** a band, a student section, a track ring and a press box at Reese. The sideline players are clones (`high/desktop/R01`, `high/desktop/R15`).
- **Ruling:** 6.0. Gate met.

**Gates met:** typography (7.0 ≥ 7) and authenticity (6.0 ≥ 6). **Gates failed:** art, lighting, animation, UI, readability and mobile. **Verdict: continue.**

## Ranked gaps (gain ÷ effort; duplicates merged)
1. **G-catch-beat** (animation, WS4, severity 4, effort M, +0.5).
   - **Problem:** at arrival the receiver runs with his arms down, and the punch-in lands on nothing (`strips/high/R09` f3–4, `crops/high/R09-slot_Z`).
   - **Fix:** blend to a hands-up reach 6–10 ticks before arrival, attach the ball to the hands on contact, then tuck within 4 ticks. Time the existing punch-in to the reach frame.
   - **Test:** in `strips/high/R09`, the strip frame at arrival shows both hands above the shoulders.
2. **G-tackle-contact** (animation, WS4b, severity 4, effort M, +0.5). Merges G-contact-resolution and G-tackle-contact-readability.
   - **Problem:** the carrier goes from upright to pile in one strip step, the replay never shows a takedown, and the ball floats above the pile (`strips/high/R10` f5–6, `strips/high/R13`, `crops/high/R12-carrier`).
   - **Fix:** spread the wrap, drive and fall over at least 3 strip frames (about 12+ ticks) with a visible impact lean. Add a 3–4 tick hit-stop at first contact. Keep the ball attached to the carrier's hand bone through the fall. Make the R13 replay window include the takedown. Add post-fall settle motion (pushing up, rolling off).
3. **G-camera-space** (readability, WS7, severity 3, effort M, +0.5). Merges G-camera-space, G-portrait-figure-size and G-desktop-panel-empty. Also lifts mobile and UI.
   - **Problem:** see `high/desktop/R04`, `high/desktop/R10`, `medium/mobile/R04`.
   - **Fix, desktop pre-snap:** lower the look-at point so the formation sits at about 60% frame height and the empty near field behind the offense shrinks to under 15%.
   - **Fix, desktop live play:** collapse the side panel to the 250 px quiet width.
   - **Fix, portrait pre-snap:** bring linemen to at least 24 CSS px.
   - **Fix, badges:** offset badges above heads, and keep edge badges clear of painted down markers.
   - **Keep** the portrait pass-corridor framing as it is.
4. **G-player-construction** (art, WS3, severity 4, effort M, +0.5). Merges G-player-construction and G-mannequin-officials-hands.
   - **Officials first:** a skin-toned head with face planes, sleeves joined to the shoulder with no gap, fingered hands, and a brimmed cap (`crops/high/R03-slot_QB`).
   - **Players:** slim the pants and hip volume in stance, smooth the jersey hem, and model forearm and sleeve separation (`crops/high/R04-slot_C`, `crops/high/R06-slot_C-side`).
   - **Leave alone:** player gloves already have fingers (`crops/high/R12-carrier`).
5. **G-night-lighting** (lighting, WS1, severity 3, effort M, +0.5). Merges G-light-pools-invisible, G-night-and-replay-focus and G-wet-surface. The turf part of the fix is WS5 work.
   - **Problem:** see `high/desktop/R04`, `high/desktop/R18`, `high/desktop/R15`, `crops/high/R18-turf_26_67_40`.
   - **Fix, near field:** extend the tower pools so the near-field band shows at least a 12% lateral swing (y≈700 in `R04` is flat at 88–95 today).
   - **Fix, sky:** grade it from dusk orange to a night blue-black.
   - **Fix, replay focus:** put the depth-of-field plane on the tagged carrier.
   - **Fix, rain turf (WS5):** spread angle-dependent tower reflections across the wet turf so sheen is visible in the gameplay frame, not one hot spot.
6. **G-toast-hierarchy** (typography, WS7, severity 2, effort S, +0.2).
   - **Problem:** see `high/desktop/R12`, `high/desktop/R21`.
   - **Fix:** raise the desktop toast's primary line to about 28–30 px cap height, and give the toast a solid, unfaded backing so figures don't show through its edges and rules.
7. **G-venue-dressing** (authenticity, WS2, severity 3, effort L, +0.5 authenticity, +0.2 art). Merges G-venue-dressing, G-venue-life and G-sideline-clones.
   - **Problem:** see `high/desktop/R01`, `high/desktop/R15`, `high/desktop/R13`.
   - **Cheap step first (S):** vary sideline pose, facing, idle phase and spacing, and add helmets-off players.
   - **Then:** a band block in uniform colour, a student section in a distinct shirt colour, a visitor bleacher and press box at Reese, a track ring, and chain-link fencing in place of the black slabs and cone trees.
8. **G-locomotion-weight** (animation, WS4, severity 3, effort L, +0.5).
   - **Problem:** see `strips/high/R11`, `strips/high/R07`, `strips/high/R10`.
   - **Fix:** plant the outside foot one tick before a cut, add hip and shoulder rotation through the throw, vary blocking reactions instead of holding identical crouches, and desynchronise celebration poses.
9. **G-kick-ribbon-chalk** (lighting, WS1, severity 1, effort S, +0.1).
   - **Problem:** see `high/desktop/R02`, `high/desktop/R17`.
   - **Fix:** make the kick ribbon additive and emissive with tapered alpha, and lift it off the ground plane so the top-down kickoff view doesn't read it as a painted line.
10. **G-phone-frame-pacing** (mobile, WS7, severity 1, effort S, +0.1). Replaces Critic A's wrong-tier G-high-phone-perf.
    - **Fix:** make phones auto-select Medium. Re-run the 4× throttle proxy on an unloaded machine and confirm Medium's worst p95 is at most 33 ms (it reads 42 ms today).

```json
{
  "loop": 10,
  "role": "judge",
  "tier": "high",
  "scores": {
    "art": { "score": 6.0, "confidence": 0.75, "evidence": [
      { "shot": "crops/high/R14-carrier", "note": "glossy helmets with decals and cages vs matte jerseys; #74 hand has fingers" },
      { "shot": "crops/high/R12-carrier", "note": "gloved hands with separated fingers; refutes 'mittens everywhere'" },
      { "shot": "crops/high/R04-slot_C", "note": "bulbous angular hips and crinkled jersey hem on the center" },
      { "shot": "crops/high/R03-slot_QB", "note": "foreground official: faceless black head, detached sleeves, mitten hands" },
      { "shot": "high/desktop/R15", "note": "cone trees and cloned, evenly spaced sideline players" }
    ] },
    "lighting": { "score": 6.5, "confidence": 0.7, "evidence": [
      { "shot": "high/desktop/R17", "note": "several soft shadows per player; mid-field pool swing 135 vs 115" },
      { "shot": "high/desktop/R04", "note": "mid-field swing 121 vs 98 at y~540, but the near field is flat at 88-95 (y~700); dusk-orange sky" },
      { "shot": "high/desktop/R18", "note": "rain streaks but no turf sheen at gameplay distance" },
      { "shot": "crops/high/R18-turf_26_67_40", "note": "wet cue is a single isolated white hot spot" },
      { "shot": "high/desktop/R15", "note": "replay depth of field softens the tagged carrier" }
    ] },
    "animation": { "score": 5.0, "confidence": 0.75, "evidence": [
      { "shot": "strips/high/R09", "note": "no reach at the catch; f4 punch-in lands on a receiver with arms down; settled tail f6-8" },
      { "shot": "strips/high/R10", "note": "f5 to f6 jumps from an upright carrier to a finished pile" },
      { "shot": "strips/high/R13", "note": "replay shows no takedown; carrier upright through f1-8" },
      { "shot": "strips/high/R11", "note": "run cycle with stride and lean reads" },
      { "shot": "crops/high/R12-carrier", "note": "ball floats above the pile" }
    ] },
    "ui": { "score": 6.5, "confidence": 0.75, "evidence": [
      { "shot": "high/desktop/R04", "note": "shaped, numbered badges, route art, panel diagram" },
      { "shot": "high/desktop/R03", "note": "ten whole play cards" },
      { "shot": "high/desktop/R10", "note": "live panel about half empty" },
      { "shot": "high/desktop/R12", "note": "official shows through the toast's faded edge and gold rule" },
      { "shot": "medium/mobile/R04", "note": "edge badge 1 covers the painted 1st & 10" }
    ] },
    "typography": { "score": 7.0, "confidence": 0.6, "evidence": [
      { "shot": "high/mobile/R21", "note": "clear two-line result hierarchy, condensed display plus sans body, whole log rows" },
      { "shot": "high/desktop/R03", "note": "ten cards with clean wraps, nothing clipped; descriptions about 12 px" },
      { "shot": "high/desktop/R21", "note": "desktop toast primary line only about 20 px caps" }
    ] },
    "readability": { "score": 6.5, "confidence": 0.7, "evidence": [
      { "shot": "high/desktop/R10", "note": "carrier ring and tag, LOS and line to gain clear" },
      { "shot": "medium/mobile/R08", "note": "pass corridor: ball, ribbon and target mid-frame, receiver about 35 CSS px" },
      { "shot": "high/desktop/R04", "note": "formation is a thin band; near field behind the offense empty" },
      { "shot": "medium/mobile/R04", "note": "linemen about 16-18 CSS px; receivers 1 and 2 are edge badges" }
    ] },
    "mobile": { "score": 6.5, "confidence": 0.65, "evidence": [
      { "shot": "medium/mobile/R10", "note": "figures about 25 CSS px, large carrier tag, full-width JUKE" },
      { "shot": "medium/mobile/R08", "note": "intentional pass-corridor framing" },
      { "shot": "medium/landscape/R10", "note": "70/30 split, legible run, large scorebug" },
      { "shot": "medium/mobile/R04", "note": "small pre-snap figures; Medium phone tier 49 fps min, worst p95 42 ms (loaded machine)" }
    ] },
    "authenticity": { "score": 6.0, "confidence": 0.7, "evidence": [
      { "shot": "crops/high/R01-board", "note": "HS scoreboard: DOWN / TO GO / BALL ON" },
      { "shot": "high/desktop/R03", "note": "field house behind the WOLVES end zone; local play names" },
      { "shot": "high/desktop/R20", "note": "3A scale with stands on both sidelines" },
      { "shot": "high/desktop/R01", "note": "one bleacher block, black slabs; no band, student section, track or press box" }
    ] }
  },
  "gaps": [
    { "id": "G-catch-beat", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS4", "evidence": ["strips/high/R09", "crops/high/R09-slot_Z"], "benchmark": "cfb26-4", "fix": "Blend to a hands-up reach 6-10 ticks before arrival, attach the ball to the hands on contact, tuck within 4 ticks, and time the existing punch-in to the reach frame. Test: the arrival frame in strips/high/R09 shows both hands above the shoulders." },
    { "id": "G-tackle-contact", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS4b", "evidence": ["strips/high/R10", "strips/high/R13", "crops/high/R12-carrier"], "benchmark": "madden26-4", "fix": "Spread the wrap, drive and fall over at least 3 strip frames (12+ ticks) with a visible impact lean; add a 3-4 tick hit-stop at first contact; keep the ball attached to the carrier's hand through the fall; make the R13 replay window include the takedown; add post-fall settle motion." },
    { "id": "G-camera-space", "category": "readability", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["high/desktop/R04", "high/desktop/R10", "medium/mobile/R04"], "benchmark": "retrobowl-1; axis-1", "fix": "Desktop pre-snap: lower the look-at so the formation sits at about 60% frame height and the empty near field behind the offense is under 15%. Desktop live play: collapse the panel to the 250 px quiet width. Portrait pre-snap: linemen at least 24 CSS px. Offset badges above heads and keep edge badges clear of painted down markers. Keep the pass-corridor framing." },
    { "id": "G-player-construction", "category": "art", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS3", "evidence": ["crops/high/R03-slot_QB", "crops/high/R04-slot_C", "crops/high/R06-slot_C-side"], "benchmark": "axis-3", "fix": "Officials first: skin-toned head with face planes, sleeves joined to the shoulder with no gap, fingered hands, brimmed cap. Players: slim the stance pants and hip volume, smooth the jersey hem, model forearm and sleeve separation. Player gloves already have fingers." },
    { "id": "G-night-lighting", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["high/desktop/R04", "high/desktop/R18", "high/desktop/R15", "crops/high/R18-turf_26_67_40"], "benchmark": "cfb26-3", "fix": "Extend the tower pools so the near-field band (y~700 in R04, flat at 88-95 today) shows at least a 12% lateral swing; grade the sky from dusk orange to night blue-black; put the replay focus plane on the tagged carrier; spread angle-dependent tower reflections across the wet turf so sheen shows in the gameplay frame (WS5 part)." },
    { "id": "G-toast-hierarchy", "category": "typography", "expectedGain": 0.2, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R12", "high/desktop/R21"], "benchmark": "madden26-3", "fix": "Raise the desktop toast's primary line to about 28-30 px cap height and give the toast a solid, unfaded backing so 3D figures don't show through its edges and rules." },
    { "id": "G-venue-dressing", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS2", "evidence": ["high/desktop/R01", "high/desktop/R15", "high/desktop/R13"], "benchmark": "cfb26-2", "fix": "First (S): vary sideline pose, facing, idle phase and spacing, and add helmets-off players. Then: a band block, a student section in a distinct shirt colour, a visitor bleacher and press box at Reese, a track ring, and chain-link fencing in place of black slabs and cone trees." },
    { "id": "G-locomotion-weight", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS4", "evidence": ["strips/high/R11", "strips/high/R07", "strips/high/R10"], "benchmark": "madden26-4", "fix": "Plant the outside foot one tick before a cut, add hip and shoulder rotation through the throw, vary blocking reactions instead of identical crouches, and desynchronise celebration poses." },
    { "id": "G-kick-ribbon-chalk", "category": "lighting", "expectedGain": 0.1, "severity": 1, "effort": "S", "workstream": "WS1", "evidence": ["high/desktop/R02", "high/desktop/R17"], "fix": "Make the kick ribbon additive and emissive with tapered alpha, and lift it off the ground plane so it doesn't read as a painted line in the top-down kickoff view." },
    { "id": "G-phone-frame-pacing", "category": "mobile", "expectedGain": 0.1, "severity": 1, "effort": "S", "workstream": "WS7", "evidence": ["medium/mobile/R10", "medium/mobile/R04"], "fix": "Make phones auto-select Medium; re-run the 4x throttle proxy on an unloaded machine and confirm Medium's worst p95 is at most 33 ms (42 ms today). High's 13 fps is not the phone tier." }
  ],
  "verdict": "continue"
}
```
