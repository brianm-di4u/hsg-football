# Critic A (critic-claude) review: loop 10, High tier

## Verdict
Friday Night Spa City is a clean, coherent, stylised football game. The HUD and play-call layer are close to commercial quality, and the player models hold up in close-ups. It still falls short of every gate except authenticity. The weakest areas are the ones the brief lists as unchanged this loop: officials and sideline players that read as mannequins, a venue made of flat blocks and cone trees, and animation beats that don't land on screen (no reaching catch, a sideline tackle you can't read, a frozen tail on the strips). This loop's lighting changes are hard to see in the frames. The near field in `high/desktop/R04` is the same brightness left, centre and right, so the "twice as strong" light pools don't read at gameplay distance. Their only visible trace is a specular hot spot in the rain close-up. The UI changes landed: whole play cards, whole log entries, the slimmer quiet-state panel, and badge stacking. Mobile portrait framing is more deliberate. Pre-snap figures are still small, though, and High on the phone proxy fails 30 fps. **Verdict: continue.**

## Category scores

### Art: 6.0
- **Players (passes):** smooth bodies with readable gear. Glossy helmets with facemasks, cage bars and decals show a real gloss-versus-matte contrast against the jerseys. Sleeve stripes and numbers hold at 2× (`crops/high/R04-slot_C`, `crops/high/R06-slot_C`, `crops/high/R14-carrier`).
- **No cloth detail:** the jerseys have no folds or wrinkles at all. Hands are mitten-like at every close-up (`crops/high/R14-carrier`, `crops/high/R13-carrier`). The Lakeside players' arms are flat white, so they read as mannequin limbs (`crops/high/R06-slot_LG`, `crops/high/R06-slot_DL2-side`).
- **Officials are faceless mannequins:** black blob heads, a white cap, a plain striped torso, and no face or hand detail (`crops/high/R03-slot_QB`, `crops/high/R12-carrier`).
- **Venue is built from primitives:** flat black cone trees and a dark wall behind floating bleacher blocks (`high/desktop/R15`, `high/desktop/R13`). Behind the end zones there is only a black slab and a berm (`high/desktop/R01`, `high/desktop/R02`).
- **Sideline team is identical clones:** about a dozen copies in the same standing pose, evenly spaced (`high/desktop/R15`, `high/desktop/R13`).
- **Crowd and turf are better:** the crowd reads as people with raised arms at the close-up (`crops/high/R01-crowd`), though uniformly lit with no variation between rows. The turf has field-level texture (`crops/high/R04-turf_26_67_42`).
- **Against benchmarks:** below axis-3, whose players have faces, real hands and a dressed stadium. Legendbowl-1 earns its 7 through stylistic completeness; this game mixes high-gloss helmets with primitive venue and officials.

### Lighting & atmosphere: 6.0
- **What works:** each player casts several soft shadows from the light towers (`high/desktop/R17`, `crops/high/R10-carrier`). The lamps bloom (`high/desktop/R01`, `high/landscape/R04`). Helmets carry specular highlights (`crops/high/R14-carrier`, `crops/high/R04-slot_QB`). In rain there is a wet specular hot spot on the turf (`crops/high/R18-turf_26_67_40`), and the day mist reads well (`high/desktop/R19`).
- **Light pools don't read at gameplay distance.** I measured mean luminance in three 180×180 patches across the near field of `high/desktop/R04`: left 104.1, centre 103.9, right 103.5. The near field is flat, and the far field is brighter (125.8) rather than falling off. `high/desktop/R20` is the same: 105 / 107 / 102.
- **The night sky reads as a painted dusk:** orange-lit clouds over the Ouachitas sit oddly with a "night" game (`high/desktop/R04`, `high/desktop/R14`).
- **The kick ribbon reads as a white chalk line on the turf, not a glow** (`high/desktop/R02`, `high/desktop/R17`).
- **Against benchmarks:** cfb26-3's ring lighting and stand falloff are far beyond this. Axis-3 is a day shot, but its contrast is crisper.

### Animation & game feel: 5.5
- **Running:** cycles stride and lean (`strips/high/R11`, `crops/high/R11-carrier`).
- **Throw:** the QB wind-up is legible in the close-up (`crops/high/R07-slot_QB`). In `strips/high/R07` at gameplay distance the drop is barely distinguishable from the line scrum.
- **Catch beat is missing.** In `strips/high/R09` frames 1–3 the ball and ribbon approach target 2. Frame 4 is a hard camera cut to the receiver already running with his arms down, and `crops/high/R09-slot_Z` confirms there is no reach.
- **Strips freeze on the result:** frames 6–8 are identical after the tackle in both `strips/high/R09` and `strips/high/R10`. The tackle result itself is a prone diving defender and a crouched carrier, a readable but static pose.
- **Sideline replay contact isn't readable.** In `strips/high/R13` the carrier is still upright and surrounded in frames 5–8, and no takedown appears.
- **Celebration poses are synchronised:** several players share the same two-arms-up pose (`crops/high/R14-carrier`).
- **Pile and feel touches:** the pile in `crops/high/R12-carrier` is a decent body-on-body read. The replay camera and its depth of field are feel touches, but there is no punch-in or slow motion at the catch or contact.
- **Against benchmarks:** well below the 7 anchor's "legible throw, catch and tackle beats"; cfb26-4 and madden26-4 are out of reach.

### UI / HUD: 6.5
- **Strengths:**
  - The broadcast-style scorebug has team colours, logos, a possession ball and timeout dots (`high/desktop/R04`, `high/landscape/R04`).
  - Pre-snap identification is good: shaped, numbered receiver badges (diamond, circle, triangle, square, star) and dashed route art on the field, mirrored in the panel diagram (`high/desktop/R04`, `high/mobile/R04`).
  - The carrier tag "44 DELACROIX" and target rings carry through play (`high/desktop/R10`, `high/desktop/R08`).
  - The play list now draws ten whole cards (`high/desktop/R22`, `high/desktop/R03`).
- **Desktop panel is mostly empty in live states.** In `high/desktop/R07`–`R10` and `R18` the 320 px panel holds the JUKE button and two log lines, and the bottom ~60% is empty. `high/desktop/R21` is the same.
- **Result toasts are undersized on desktop:** "+5 YD" is about 17 px cap height on a 1280 frame. In `high/desktop/R12` the right-hand official is drawn over the toast's fade and gold rule.
- **No play clock in the scorebug.**
- **Edge badge covers the painted down marker:** in portrait the "1" badge hides "1st" on the field (`high/mobile/R04`).
- **Against benchmarks:** at or above axis-1's pre-snap clarity, but short of madden26-3's integrated broadcast package.

### Typography: 6.5
- **Strengths:** a consistent condensed display face throughout, with clear numerals in the scorebug and banners (`high/landscape/R12`, `high/mobile/R21`, `high/mobile/R14`). Nothing is clipped this loop: whole log entries (`high/landscape/R14`) and whole cards (`high/desktop/R22`).
- **Weak scale on desktop:** card descriptions and log lines are about 10–11 px (`high/desktop/R22`, `high/desktop/R12`).
- **Case is mixed for the same information:** "1st & 10 · own 30" in the scorebug against "1ST & 10 · OWN 30" in the panel (`high/desktop/R08`).
- **The result banner's primary line is smaller than the scorebug team names** (`high/desktop/R12`).
- **Against benchmarks:** short of madden26-3 and legendbowl-4's deliberate hierarchy.

### Readability: 6.5
- **What reads well:** the line of scrimmage (blue) and the line to gain (yellow) are clear everywhere. The carrier ring and tag work, the ball in flight carries a ribbon, and the target ring is clear (`high/desktop/R08`, `high/mobile/R08`, `high/desktop/R10`).
- **Desktop figures are small:** in the behind-offense camera players are about 20–25 px tall at 1280 (`high/desktop/R05`, `high/desktop/R21`). The ball in flight is about 10 px (`high/desktop/R08`).
- **Portrait pre-snap linemen are about 18 CSS px.** I measured about 35 image px on the @2× capture, `high/mobile/R04`. That's smaller than the brief's ~23. The "5" star badge sits on top of the QB.
- **Portrait pass framing works:** the receiver is about 44 CSS px with the ball mid-frame (`high/mobile/R08`).
- **The run in a crowd is hard to parse** apart from the tag (`high/landscape/R10`).
- **Against benchmarks:** retrobowl-1's figures are much bigger relative to the frame; madden26-1 is clearer.

### Mobile: 6.5
- **Portrait is deliberate:** a compact two-bar scorebug, a big HIKE/JUKE/CONTINUE thumb zone, and a result panel with whole log rows (`high/mobile/R12`, `high/mobile/R21`, `high/mobile/R22`).
- **Landscape split:** a 70/30 field-to-panel split with a large scorebug (`high/landscape/R04`, `high/landscape/R22`). Landscape figures are about 15 CSS px pre-snap (`high/landscape/R04`), and the result toast covers players at the bottom of the field (`high/landscape/R12`).
- **Performance:** the brief's table gives High at 13 fps minimum and 262 ms p95 on the 4× throttle proxy, which fails the 30 fps bar. Medium, the phone tier, holds 49 fps minimum.
- **No regressions at Medium or Low:** the Medium and Low phone frames match High in layout (`medium/mobile/R08`, `low/mobile/R04`, `medium/landscape/R12`).
- **Against benchmarks:** retrobowl-1/2 have far larger figures for the screen size.

### Authenticity: 6.0
- **Strong local identity:** Hot Springs, Lakeside, Lake Hamilton, Jessieville and Tufa Ridge; plays named Bathhouse Dive, Central Avenue Sweep and Promenade Slants; painted end zones "HOT SPRINGS", "WOLVES" and "TROJANS" (`high/desktop/R03`, `high/mobile/R22`).
- **Venue details that fit:** an HS-style scoreboard with DOWN / TO GO / BALL ON (`crops/high/R01-board`), a mountain backdrop, H-frame goalposts with pads (`crops/high/R14-carrier`), and a small 3A-scale home field (`high/desktop/R20`).
- **Missing:** no band, no visible student section or cheer squad, no track ring, no press box at the Hot Springs venue, and a single bleacher block with dark walls elsewhere (`high/desktop/R01`, `high/desktop/R15`).
- **Against benchmarks:** above generic, below cfb26-1/2's staging.

## Ranked gaps
1. **G-catch-beat** (animation, WS4, severity 4, effort M, about +0.5). There is no reach or secure pose at the catch (`strips/high/R09`, `crops/high/R09-slot_Z`).
   - **Fix:** blend into a hands-up reach 6–10 ticks before the ball arrives, snap the ball to the hands, then tuck. Keep the camera on the catch instead of cutting at the moment of arrival.
2. **G-venue-dressing** (authenticity, WS2, severity 4, effort L, about +0.5 authenticity and +0.5 art). The venue is one bleacher block, flat cone trees and black walls (`high/desktop/R01`, `high/desktop/R15`).
   - **Fix:** add a visitor bleacher, a press box, a band block in uniform colours, a student section with a different shirt colour, a track ring, chain-link fencing and sponsor boards.
3. **G-mannequin-officials-hands** (art, WS3, severity 3, effort M, about +0.5). Officials are faceless, hands are mittens, and the Lakeside players' arms are plain white (`crops/high/R03-slot_QB`, `crops/high/R06-slot_LG`).
   - **Fix:** give officials skin tones with face planes, a brimmed cap, and black-and-white shoes and socks. Model separated fingers or a glove silhouette. Add skin and sleeve separation to players' arms.
4. **G-light-pools-invisible** (lighting, WS1, severity 3, effort M, about +0.5). The near field is flat at 104 / 104 / 104 luminance, and the far field is brighter than the near (`high/desktop/R04`, `high/desktop/R20`).
   - **Fix:** make the per-tower pools visible at the gameplay camera (±15–20% luminance between pool and gap) with darker gaps between towers. Grade the sky darker so it reads as night rather than dusk.
5. **G-tackle-contact-readability** (animation, WS4b, severity 3, effort M, about +0.5). The contact is unreadable in `strips/high/R13`, and `strips/high/R10` frames 6–8 are an identical freeze.
   - **Fix:** add a wrap, drive and fall sequence with a visible lean and impact, a short hit-stop or slow-motion punch-in at contact, and settle motion such as a pushing-up player after the fall.
6. **G-portrait-figure-size** (mobile, WS7, severity 3, effort M, about +0.3). Pre-snap linemen are about 18 CSS px, the star badge covers the QB, and an edge badge hides the painted "1st & 10" (`high/mobile/R04`, `high/landscape/R04`).
   - **Fix:** tighten the pre-snap lens to bring linemen to about 26 CSS px. Offset badges above the player's head, and keep edge badges clear of on-field text.
7. **G-sideline-clones** (art, WS2, severity 2, effort S, about +0.2). Identical sideline players stand in a row (`high/desktop/R15`, `high/desktop/R13`).
   - **Fix:** vary poses, facing and idle phase, cluster them around coaches, and mix in helmets off.
8. **G-desktop-panel-empty** (ui, WS7, severity 2, effort S, about +0.3). The live-play panel is about 60% empty (`high/desktop/R08`, `high/desktop/R10`).
   - **Fix:** collapse it to 250 px in live states as already done for quiet states, or fill it with a play clock and the target or read info.
9. **G-toast-hierarchy** (typography, WS7, severity 2, effort S, about +0.3). "+5 YD" is about 17 px cap height on desktop, and an official is drawn over the toast (`high/desktop/R12`, `high/desktop/R21`).
   - **Fix:** raise the primary line to about 30 px and put the toast above the 3D layer with a solid backing. Match the scorebug's case conventions.
10. **G-high-phone-perf** (mobile, WS7, severity 2, effort S, about +0.2). High runs at 13 fps on the 4× throttle proxy.
    - **Fix:** auto-select Medium on phones, or cap the High shadow and post cost when the frame time goes over budget.
11. **G-kick-ribbon-chalk** (lighting, WS1, severity 1, effort S, about +0.1). The kick ribbon reads as a white chalk line on the turf (`high/desktop/R02`, `high/desktop/R17`).
    - **Fix:** use additive, emissive, tapered alpha, and lift the ribbon off the ground plane.

```json
{
  "loop": 10,
  "role": "critic-claude",
  "tier": "high",
  "scores": {
    "art": { "score": 6.0, "confidence": 0.75, "evidence": [
      { "shot": "crops/high/R04-slot_C", "note": "glossy helmets, facemask, decals; matte jersey, no folds" },
      { "shot": "crops/high/R03-slot_QB", "note": "official is a faceless mannequin with mitten hands" },
      { "shot": "crops/high/R06-slot_LG", "note": "flat white mannequin arms" },
      { "shot": "high/desktop/R15", "note": "cone trees, block stands, cloned sideline" },
      { "shot": "crops/high/R01-crowd", "note": "crowd reads as people, uniform" }
    ] },
    "lighting": { "score": 6.0, "confidence": 0.7, "evidence": [
      { "shot": "high/desktop/R04", "note": "near field luminance 104/104/104 L/C/R; pools not visible; far field brighter" },
      { "shot": "high/desktop/R17", "note": "several soft shadows per player" },
      { "shot": "crops/high/R18-turf_26_67_40", "note": "wet specular hot spot" },
      { "shot": "high/desktop/R01", "note": "lamp bloom; dusk-painted sky at night" }
    ] },
    "animation": { "score": 5.5, "confidence": 0.75, "evidence": [
      { "shot": "strips/high/R09", "note": "no reach at catch; hard cut; frames 6-8 frozen" },
      { "shot": "crops/high/R09-slot_Z", "note": "receiver arms down at catch moment" },
      { "shot": "strips/high/R13", "note": "replay tackle contact not readable" },
      { "shot": "strips/high/R11", "note": "stride and lean in cut read" },
      { "shot": "crops/high/R07-slot_QB", "note": "legible wind-up in close-up" }
    ] },
    "ui": { "score": 6.5, "confidence": 0.7, "evidence": [
      { "shot": "high/desktop/R04", "note": "shaped numbered badges + route art + panel diagram" },
      { "shot": "high/desktop/R22", "note": "ten whole cards, no fade" },
      { "shot": "high/desktop/R08", "note": "live panel ~60% empty" },
      { "shot": "high/desktop/R12", "note": "small toast; official over toast edge" }
    ] },
    "typography": { "score": 6.5, "confidence": 0.65, "evidence": [
      { "shot": "high/mobile/R21", "note": "condensed display, clear numerals, hierarchy" },
      { "shot": "high/desktop/R22", "note": "card descriptions ~10-11px" },
      { "shot": "high/desktop/R08", "note": "mixed case for same info: scorebug vs panel" },
      { "shot": "high/landscape/R14", "note": "whole log entries, nothing clipped" }
    ] },
    "readability": { "score": 6.5, "confidence": 0.7, "evidence": [
      { "shot": "high/desktop/R10", "note": "carrier tag + ring, LOS and line to gain clear" },
      { "shot": "high/mobile/R08", "note": "ball ribbon, target ring, receiver ~44 CSS px" },
      { "shot": "high/mobile/R04", "note": "linemen ~18 CSS px; star badge over QB" },
      { "shot": "high/landscape/R10", "note": "run in a crowd hard to parse without the tag" }
    ] },
    "mobile": { "score": 6.5, "confidence": 0.65, "evidence": [
      { "shot": "high/mobile/R12", "note": "deliberate portrait layout, thumb buttons, whole log rows" },
      { "shot": "high/mobile/R04", "note": "small pre-snap figures; edge badge over painted down marker" },
      { "shot": "high/landscape/R04", "note": "70/30 split; figures ~15 CSS px" },
      { "shot": "medium/mobile/R08", "note": "medium phone tier matches; 49 fps min at 4x throttle; High 13 fps" }
    ] },
    "authenticity": { "score": 6.0, "confidence": 0.7, "evidence": [
      { "shot": "crops/high/R01-board", "note": "HS scoreboard DOWN/TO GO/BALL ON" },
      { "shot": "high/mobile/R22", "note": "local play names, painted end zone" },
      { "shot": "high/desktop/R20", "note": "3A home field reads right scale" },
      { "shot": "high/desktop/R01", "note": "one bleacher block; no band, student section, track or press box" }
    ] }
  },
  "gaps": [
    { "id": "G-catch-beat", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS4", "evidence": ["strips/high/R09", "crops/high/R09-slot_Z"], "benchmark": "cfb26-4", "fix": "Blend to a hands-up reach 6-10 ticks before arrival, snap the ball to the hands, then tuck; hold the camera through the catch instead of cutting." },
    { "id": "G-venue-dressing", "category": "authenticity", "expectedGain": 0.5, "severity": 4, "effort": "L", "workstream": "WS2", "evidence": ["high/desktop/R01", "high/desktop/R15"], "benchmark": "cfb26-2", "fix": "Add a visitor bleacher, a press box, a band block, a student section in a distinct shirt colour, a track ring, fencing and sponsor boards in place of black walls and cone trees." },
    { "id": "G-mannequin-officials-hands", "category": "art", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["crops/high/R03-slot_QB", "crops/high/R06-slot_LG", "crops/high/R14-carrier"], "benchmark": "axis-3", "fix": "Give officials skin tones with face planes, a brimmed cap, socks and shoes; give hands finger or glove silhouettes; separate skin from sleeve on player arms." },
    { "id": "G-light-pools-invisible", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["high/desktop/R04", "high/desktop/R20"], "benchmark": "cfb26-3", "fix": "Make per-tower pools visible at the gameplay camera (±15-20% luminance between pool and gap) with darker gaps between towers; grade the sky to night rather than dusk." },
    { "id": "G-tackle-contact-readability", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS4b", "evidence": ["strips/high/R13", "strips/high/R10"], "benchmark": "madden26-4", "fix": "Add a wrap, drive and fall sequence with a visible impact lean, a short hit-stop or slow-motion punch-in at contact, and post-fall settle motion instead of a frozen hold." },
    { "id": "G-portrait-figure-size", "category": "mobile", "expectedGain": 0.3, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["high/mobile/R04", "high/landscape/R04"], "benchmark": "retrobowl-1", "fix": "Tighten the pre-snap portrait lens so linemen reach about 26 CSS px; offset badges above heads; keep edge badges clear of painted down markers." },
    { "id": "G-sideline-clones", "category": "art", "expectedGain": 0.2, "severity": 2, "effort": "S", "workstream": "WS2", "evidence": ["high/desktop/R15", "high/desktop/R13"], "benchmark": "axis-3", "fix": "Vary sideline poses, facing and idle phase; cluster players around coaches; mix in helmets off." },
    { "id": "G-desktop-panel-empty", "category": "ui", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R08", "high/desktop/R10"], "benchmark": "madden26-3", "fix": "Collapse the live-play panel to 250 px as in quiet states, or fill it with a play clock and the target or read info." },
    { "id": "G-toast-hierarchy", "category": "typography", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R12", "high/desktop/R21"], "benchmark": "madden26-3", "fix": "Raise the toast's primary line to about 30 px, draw it above the 3D layer with a solid backing, and unify case with the scorebug." },
    { "id": "G-high-phone-perf", "category": "mobile", "expectedGain": 0.2, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/mobile/R10", "medium/mobile/R10"], "fix": "Auto-select Medium on phones, or cap High's shadow and post cost when over the frame budget (13 fps at 4x throttle)." },
    { "id": "G-kick-ribbon-chalk", "category": "lighting", "expectedGain": 0.1, "severity": 1, "effort": "S", "workstream": "WS1", "evidence": ["high/desktop/R02", "high/desktop/R17"], "fix": "Make the kick ribbon additive and emissive with tapered alpha, and lift it off the ground plane so it doesn't read as chalk." }
  ],
  "verdict": "continue"
}
```
