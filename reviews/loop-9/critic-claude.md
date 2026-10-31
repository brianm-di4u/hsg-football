# Critic A (critic-claude): loop 9, High tier

## Verdict
Friday Night Spa City now looks like a coherent, stylised indie football game. The players are smooth and readable, with glossy helmets on matte jerseys. Route art and receiver tags are clean, the scorebug and bottom-docked result banners have real hierarchy, and the tighter bloom no longer washes the frame. The gap to the benchmarks is everything around the play. Officials are faceless black mannequins. Sideline teams stand in evenly spaced peg rows. Behind the stands and end zones are flat grey-green walls and cone trees, and there is no band, student section or cheer squad. In motion, the last three panels of the catch and run strips are frozen. Night lighting is clean but flat in the middle distance, and rain barely changes the turf. The desktop right panel takes 28% of the screen and is a third to two thirds empty in most states. No category clears its gate convincingly except authenticity, which sits right on it. Verdict: **continue**.

Method: I opened every High desktop frame, every High close-up and strip, all High portrait and landscape frames, and Medium/Low frames, crops and phone frames through contact sheets. I zoomed and measured at pixel level where a claim depends on size.

## Scores (High, desktop unless noted)

### Art: 6.0
- **Players hold up well.** Bodies are smooth, with readable shoulder pads, facemasks, sleeve stripes and outlined numbers. Helmets clearly catch a specular highlight against matte jerseys (`crops/high/R13-carrier`, `crops/high/R14-carrier`, the bronze Lake Hamilton helmets in `crops/high/R03-slot_QB`). That meets the 7 anchor for gear and the gloss/matte split, and is style-consistent the way legendbowl-1 is.
- **Officials are unfinished.** They are featureless black mannequins: no face, tube arms, mitten hands (`crops/high/R03-slot_QB` foreground ref; the ref in `crops/high/R12-carrier`).
- **Venue reads as stage flats, not built objects.**
  - `high/desktop/R13` and `R15`: the visitor stand is one floating bleacher box against a flat grey wall, under black cone trees.
  - `high/desktop/R14`: the end-zone backdrop is an empty dark-green plane running up to a wall.
  - `high/desktop/R02` and `R17`: a large, featureless dark apron beyond the field.
- **Crowd.** It reads as people up close (`crops/high/R01-crowd`, with varied arm raises), but as orange and white speckle at the broadcast distance.
- **Turf** has grain at field level but no blade or seam detail (`crops/high/R04-turf_26_67_42`).
- **Close-up cameras clip.** `crops/high/R06-slot_LG` is inside a shoulder, and `crops/high/R06-slot_C-side` is a tangle of intersecting arms.
- Against axis-3 (about 7): the players are there, but the officials and venue pull this down to 6.

### Lighting & atmosphere: 6.0
- **Bloom is now correct.** Lamp heads glow with a tight halo and no frame wash (`high/desktop/R01`, zoomed; `high/desktop/R22`).
- **Shadows.** Several soft shadows show under players (`crops/high/R08-ball`, `crops/high/R12-carrier`, `crops/high/R16-slot_K`), and the exposure is a believable night.
- **The middle distance is flat.** Field, apron and walls are one low-contrast green-grey, and the new light pools are barely perceptible (`high/desktop/R04`, `R10`, `R13`). The 10–15% lift doesn't register.
- **Rain barely touches the turf.** `high/desktop/R18` keeps essentially the dry look apart from thin rain streaks. `crops/high/R18-turf_26_67_40` shows one blown white specular blob at the left rather than a wet sheen across the field.
- **Day mist** (`high/desktop/R19`) is a flat grey wash with no depth gradient.
- Against cfb26-3 and axis-3 (falloff, ring light, contrast): about a 6.

### Animation & game feel: 5.5
- **The beats are legible.**
  - Catch: ball arriving at #2 in `strips/high/R09` frames 3→4.
  - Carrier stride and lean: `crops/high/R11-carrier`, `strips/high/R11` frames 1–8 with the cut to the right.
  - Pile-up: `strips/high/R10` frame 6.
- **But motion stops dead after contact.**
  - `strips/high/R10` frames 6, 7 and 8 are pose-identical (checked zoomed).
  - In `strips/high/R09` frames 6–8, the diving defender lies as a rigid horizontal plank in all three frames.
- **No feel touches.** No punch-in or slow motion at the catch or the tackle (`strips/high/R09`, `strips/high/R13`).
- **The QB throw can't be read.** `strips/high/R07` shows him at about 20 px tall in a wide shot, so the wind-up and release don't read.
- **Celebration poses are cloned.** Several celebrating players share one arms-up pose (`crops/high/R14-carrier`), though the jumping #9 is a nice touch.
- This sits between the 5 and 7 anchors, below 7 because falls are stiff and there are no feel touches.

### UI / HUD: 6.5
- **What works.**
  - A broadcast-style top scorebug: logo chips, possession ball, timeout pips, clock and down (`high/desktop/R10`, zoomed).
  - Route art with shape-coded receiver tags, plus an on-field "1ST & 10" marker (`high/desktop/R04`).
  - The targeted receiver keeps his badge and landing ring in flight (`high/desktop/R08`).
  - Bottom-docked result banners with title/subtitle hierarchy (`high/desktop/R12`, `R14`, `R21`).
  - The desktop panel now carries down, line to gain and the log (`high/desktop/R10`).
- **The right panel is dead space.** It is 360 px of 1280 (28%). In `high/desktop/R10` the content ends at y=525 of 800, so the bottom 34% is empty. In `R14`, `R16`, `R17` and `R01` the panel is about 70–80% empty.
- **Defense pre-snap** (`high/desktop/R05`) gives no on-field identification of receivers or your blitzers. All of it lives in the panel diagram, against madden26-1's defender ID boxes.
- Against axis-1 and madden26-1: close, but not 7.

### Typography: 6.5
- **The pairing is consistent.** A condensed display face for scorebug, banners and buttons, with a humanist sans for body text (`high/desktop/R10` panel, `high/desktop/R22` play list). Numerals read at a glance on the scorebug and banners (`high/desktop/R21` "+7 YD · FIRST DOWN").
- **The scale has weak spots.**
  - The "HOME" tag and the "Space" key chips are about 9 px cap height (zoomed `high/desktop/R10` scorebug; `high/desktop/R16` KICK button).
  - Body text in the panel is about 12 px (measured).
  - Mixed-case "1st & 10 · own 30" sits under an all-caps clock in the bug.
- **Nothing is clipped.** I checked the 10th play-list card in `high/desktop/R22`.
- Against madden26-3 and legendbowl-4: good but not deliberate enough in tracking and scale for 7.

### Readability: 6.5
- **What reads.**
  - The carrier plate trails under his feet on every layout (`high/desktop/R10`, `high/landscape/R10`, `high/mobile/R10`).
  - The line of scrimmage (blue) and line to gain (yellow) are always visible.
  - The ball in the air is unmistakable with its ribbon and the target ring (`high/desktop/R08`). The ball is oversized, about 15 px long against a 43 px receiver.
- **What doesn't.**
  - At the snap and the throw, the line is a muddle of black and orange figures about 40 px tall, and the QB can't be picked out (`high/desktop/R07`, `R08`).
  - On kicks the ball is a 6–8 px dot with no trail or landing marker (`high/desktop/R02`, `R17`, zoomed).
- **Phone portrait.** The pass camera gives receivers about 27 CSS px (`high/mobile/R08`, measured about 55 px at 2×).
- Against madden26-1 and retrobowl-1: a 6.5.

### Mobile: 6.5
- **Portrait is intentional.** The scorebug fits, the HIKE, JUKE and CONTINUE targets are big, and the banner sits in flow below the field (`high/mobile/R04`, `R12`, `R21`). The play-call grid is a readable 2×3 with route thumbnails (`high/mobile/R22`).
- **Landscape is intentional** too: a field-plus-side-panel split, with banners now docked at the bottom (`high/landscape/R12`, `R14`, `R21`).
- **Problems.**
  - Figures are small in the portrait pass camera (`high/mobile/R08`, about 27 CSS px).
  - Portrait receiver tags 1, 2 and 3 sit as half-clipped edge markers (`high/mobile/R04`).
  - In landscape the field is only about 595 CSS px wide, with figures about 25 CSS px (`high/landscape/R08`).
- **Performance.** Medium (the phone tier) holds 106 min fps with an 18.2 ms p95 under 4× throttle. High on a phone dips to a 34.3 ms p95.
- Against retrobowl-1/2: close to 7, held back by figure size.

### Authenticity: 6.0
- **Strong local identity.**
  - "HOT SPRINGS" and "TROJANS" end zones and the Lake Hamilton "WOLVES" end zone (`high/desktop/R03`).
  - Ouachita ridge and pine backdrop, Jessieville purple midfield (`high/desktop/R20`), Spa City play names.
  - Small single-side home stands with light towers (`high/desktop/R01`), and the scoreboard reads HSHS/LHHS DOWN/TO GO/BALL ON (`crops/high/R01-board`).
- **Missing the Friday-night staging.**
  - No band, student section, cheerleaders or chain crew.
  - The track isn't legible as a track (tan apron only, `high/desktop/R02`).
  - Sideline teams stand in perfectly even peg rows of identical figures (`high/desktop/R13`, `R15`; the line in `crops/high/R16-slot_K`).
  - End-zone backdrops are empty (`high/desktop/R14`).
- Against cfb26-1 and cfb26-2 (student section, band): right at the 6 gate.

## Medium and Low regression check
- **Medium** matches High in framing, HUD and the ball ribbon (`medium/desktop/R08`, `crops/medium/R08-ball`). It shows the same R18 specular blob (`crops/medium/R18-turf_26_67_40`). No regressions found.
- **Low** keeps the v2 look as expected: faceted figures (`crops/low/R03-slot_QB`) and block crowd (`crops/low/R01-crowd`). The HUD and banners are identical to High on all three viewports (`low/landscape/R14`, `low/mobile/R12`). No regressions found.

## Ranked gaps
1. **G-post-contact-freeze** (animation, WS4b, severity 4, effort M, about +0.5).
   - Problem: bodies freeze after the whistle (`strips/high/R10` 6–8, `strips/high/R09` 6–8), and the plank dive is rigid.
   - Fix: add a settle/roll on landing, a staggered get-up, a ref signal and idle breathing, and blend the dive into a bent-limb ground pose.
2. **G-feel-camera** (animation, WS4, severity 3, effort M, about +0.5).
   - Problem: no punch-in or slow motion on catch or contact (`strips/high/R09`, `strips/high/R13`).
   - Fix: a 0.25–0.4 s time-scale dip to about 0.35×, plus a 10–15% FOV push on catch and first contact, with turf-spray particles at contact.
3. **G-venue-voids** (authenticity, WS2, severity 3, effort L, about +0.5).
   - Problem: flat walls and empty planes behind the stands and end zones (`high/desktop/R13`, `R14`, `R02`, `R17`).
   - Fix:
     - A visitor stand with structure.
     - An end-zone fence, field house and concession stand.
     - Textured tree cards instead of black cones.
     - A legible red or tan track with lane lines.
4. **G-sideline-staging** (authenticity, WS2, severity 3, effort M, about +0.5).
   - Problem: peg-row sidelines (`high/desktop/R13`, `R15`) and no band or student section.
   - Fix:
     - Cluster and jitter sideline players with varied idles, and add coaches with headsets.
     - Add a band block and a student section in the home stands.
     - Add cheerleaders on the track and a chain crew.
5. **G-desktop-panel-deadspace** (ui, WS7, severity 3, effort S, about +0.5).
   - Problem: 28% of desktop width with 34–80% empty (`high/desktop/R10`, `R14`, `R16`, `R17`).
   - Fix: fill it with a drive chart, matchup card or key-player stats, or narrow the panel during kicks and celebrations and give the field the space.
6. **G-midground-flat** (lighting, WS1, severity 3, effort S, about +0.5).
   - Problem: light pools aren't perceptible, and the mid-field and walls are one flat value (`high/desktop/R04`, `R10`, `R13`).
   - Fix:
     - Raise pool contrast to about 25–35%.
     - Darken the apron and walls beyond the pools.
     - Add a mild vignette and a cooler shadow grade.
7. **G-wet-turf** (lighting, WS5, severity 3, effort M, about +0.5).
   - Problem: `high/desktop/R18` is barely different from dry, and `crops/high/R18-turf_26_67_40` has a single blown hotspot.
   - Fix: lower roughness across the whole field with stretched lamp reflections, puddle normal patches, foot splashes, and clamp the hotspot.
8. **G-officials** (art, WS3, severity 2, effort S, about +0.3).
   - Problem: faceless black mannequins (`crops/high/R03-slot_QB`, `crops/high/R12-carrier`).
   - Fix: skin and face shading, a white cap, belt, flag, separate black trousers, and hands with fingers like the players have.
9. **G-defense-presnap-id** (ui, WS7, severity 3, effort M, about +0.4).
   - Problem: `high/desktop/R05` has no on-field ID.
   - Fix: on-field receiver tags and your blitz lanes drawn on the turf, in the madden26-1 style.
10. **G-kick-ball-readability** (readability, WS7, severity 2, effort S, about +0.3).
    - Problem: on kicks the ball is a 6–8 px dot (`high/desktop/R02`, `R17`).
    - Fix: reuse the pass ribbon on kicks and add a landing ring.
11. **G-mobile-pass-cam** (mobile, WS7, severity 2, effort M, about +0.3).
    - Problem: receivers are about 27 CSS px in `high/mobile/R08`, and edge tags are clipped in `high/mobile/R04`.
    - Fix: tighten the portrait pass camera to the ball and target corridor, and keep tags inset 12 px from the edge.
12. **G-closeup-clipping** (art, WS7, severity 1, effort S, about +0.2).
    - Problem: close-up cameras clip into bodies (`crops/high/R06-slot_LG`, `crops/high/R06-slot_C-side`).
    - Fix: occlusion-aware close and replay cameras with a ray check that pulls back.

```json
{
  "loop": 9,
  "role": "critic-claude",
  "tier": "high",
  "scores": {
    "art": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "crops/high/R13-carrier", "note": "smooth stylised bodies, glossy helmet vs matte jersey, readable pads and numbers"},
        {"shot": "crops/high/R03-slot_QB", "note": "official is a faceless black mannequin with mitten hands"},
        {"shot": "high/desktop/R13", "note": "single floating bleacher box, flat grey wall, peg-row sideline"},
        {"shot": "high/desktop/R14", "note": "empty dark-green plane and wall behind the end zone"},
        {"shot": "crops/high/R06-slot_LG", "note": "close-up camera inside a player's shoulder"}
      ]
    },
    "lighting": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R01", "note": "tight lamp bloom, no frame wash"},
        {"shot": "crops/high/R12-carrier", "note": "multiple soft player shadows"},
        {"shot": "high/desktop/R10", "note": "light pools imperceptible; flat low-contrast midground"},
        {"shot": "crops/high/R18-turf_26_67_40", "note": "rain turf: one blown specular blob, no field-wide sheen"},
        {"shot": "high/desktop/R19", "note": "day mist is a flat grey wash"}
      ]
    },
    "animation": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "strips/high/R09", "note": "catch legible in frames 3-4; frames 6-8 frozen, diving defender a rigid plank"},
        {"shot": "strips/high/R10", "note": "frames 6, 7, 8 pose-identical after the tackle"},
        {"shot": "strips/high/R11", "note": "carrier stride and cut read"},
        {"shot": "strips/high/R07", "note": "QB about 20 px tall; wind-up and release unreadable"},
        {"shot": "crops/high/R14-carrier", "note": "cloned arms-up celebration poses"}
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.75,
      "evidence": [
        {"shot": "high/desktop/R04", "note": "route art, shape-coded receiver tags, on-field 1ST & 10"},
        {"shot": "high/desktop/R21", "note": "bottom-docked banner with hierarchy"},
        {"shot": "high/desktop/R10", "note": "panel content ends at y=525 of 800; 28% width panel"},
        {"shot": "high/desktop/R17", "note": "panel about 80% empty during punt"},
        {"shot": "high/desktop/R05", "note": "no on-field identification on defense pre-snap"}
      ]
    },
    "typography": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R22", "note": "consistent condensed display plus sans body; nothing clipped"},
        {"shot": "high/desktop/R10", "note": "HOME tag about 9 px cap height; panel body about 12 px; mixed-case bug sub-line"},
        {"shot": "high/desktop/R21", "note": "numerals on banner read at a glance"},
        {"shot": "high/mobile/R12", "note": "portrait type scale clean and legible"}
      ]
    },
    "readability": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R08", "note": "ball with ribbon and target ring unmistakable"},
        {"shot": "high/desktop/R10", "note": "carrier plate under feet; LOS and line to gain visible"},
        {"shot": "high/desktop/R07", "note": "QB lost in black/orange cluster at the line"},
        {"shot": "high/desktop/R17", "note": "kicked ball a 6-8 px dot with no trail or landing marker"},
        {"shot": "high/mobile/R08", "note": "receivers about 27 CSS px in portrait pass camera"}
      ]
    },
    "mobile": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/mobile/R22", "note": "readable 2x3 play-call grid, thumb-sized cards"},
        {"shot": "high/mobile/R12", "note": "in-flow banner, big CONTINUE and REPLAY targets"},
        {"shot": "high/landscape/R12", "note": "banner docked at bottom; field only about 595 CSS px wide"},
        {"shot": "high/mobile/R08", "note": "small figures in portrait pass camera"},
        {"shot": "high/mobile/R04", "note": "receiver tags clipped at screen edges"}
      ]
    },
    "authenticity": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R03", "note": "Lake Hamilton WOLVES end zone, press box"},
        {"shot": "high/desktop/R20", "note": "Jessieville purple midfield, small 3A stands"},
        {"shot": "crops/high/R01-board", "note": "HSHS/LHHS board with DOWN/TO GO/BALL ON"},
        {"shot": "high/desktop/R15", "note": "peg-row sideline, single visitor bleacher, no band or student section"},
        {"shot": "high/desktop/R14", "note": "empty end-zone backdrop"}
      ]
    }
  },
  "gaps": [
    {"id": "G-post-contact-freeze", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS4b", "evidence": ["strips/high/R10", "strips/high/R09"], "benchmark": "cfb26-4", "fix": "Add post-contact settle and roll, staggered get-ups, ref signal and idle breathing so frames after the tackle are never pose-identical; blend dives into bent-limb ground poses instead of a rigid plank."},
    {"id": "G-feel-camera", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS4", "evidence": ["strips/high/R09", "strips/high/R13"], "benchmark": "madden26-4", "fix": "On catch and first contact: 0.25-0.4 s time-scale dip to about 0.35x, 10-15% FOV push-in, turf-spray particles at contact."},
    {"id": "G-venue-voids", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS2", "evidence": ["high/desktop/R13", "high/desktop/R14", "high/desktop/R02", "high/desktop/R17"], "benchmark": "cfb26-2", "fix": "Replace flat walls and empty planes with a structured visitor stand, end-zone fence, field house and concessions, textured tree cards instead of black cones, and a legible track with lane lines."},
    {"id": "G-sideline-staging", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["high/desktop/R13", "high/desktop/R15", "crops/high/R16-slot_K"], "benchmark": "cfb26-1", "fix": "Cluster and jitter sideline players with varied idles and coaches with headsets; add a band block, a student section, cheerleaders on the track and a chain crew."},
    {"id": "G-desktop-panel-deadspace", "category": "ui", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R10", "high/desktop/R14", "high/desktop/R16", "high/desktop/R17"], "benchmark": "axis-1", "fix": "Fill the 360 px panel with a drive chart, matchup card or key-player stat line, or collapse or narrow it during kicks, celebrations and replays so the field gets the width."},
    {"id": "G-midground-flat", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["high/desktop/R04", "high/desktop/R10", "high/desktop/R13"], "benchmark": "cfb26-3", "fix": "Raise lamp-pool contrast to about 25-35%, darken apron and walls beyond the pools, add a mild vignette and a cooler shadow grade so the field pops from the surroundings."},
    {"id": "G-wet-turf", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["high/desktop/R18", "crops/high/R18-turf_26_67_40"], "benchmark": "axis-3", "fix": "Lower turf roughness field-wide in rain with stretched lamp reflections, puddle normal patches and foot splashes; clamp the single blown specular hotspot."},
    {"id": "G-defense-presnap-id", "category": "ui", "expectedGain": 0.4, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["high/desktop/R05", "medium/desktop/R05"], "benchmark": "madden26-1", "fix": "Draw on-field tags for offensive receivers and the user's blitz and coverage assignments on defense pre-snap, not only in the panel diagram."},
    {"id": "G-officials", "category": "art", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS3", "evidence": ["crops/high/R03-slot_QB", "crops/high/R12-carrier"], "benchmark": "axis-3", "fix": "Give officials skin and face shading, a white cap, belt, flag, separate black trousers and fingered hands matching the player rig."},
    {"id": "G-kick-ball-readability", "category": "readability", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R02", "high/desktop/R17"], "benchmark": "retrobowl-3", "fix": "Reuse the pass ribbon on kicks and punts and add a landing ring under the ball."},
    {"id": "G-mobile-pass-cam", "category": "mobile", "expectedGain": 0.3, "severity": 2, "effort": "M", "workstream": "WS7", "evidence": ["high/mobile/R08", "high/mobile/R04"], "benchmark": "retrobowl-1", "fix": "Tighten the portrait pass camera to the ball-to-target corridor so receivers exceed 40 CSS px; inset edge receiver tags at least 12 px."},
    {"id": "G-closeup-clipping", "category": "art", "expectedGain": 0.2, "severity": 1, "effort": "S", "workstream": "WS7", "evidence": ["crops/high/R06-slot_LG", "crops/high/R06-slot_C-side"], "benchmark": "madden26-4", "fix": "Make close-up and replay cameras occlusion-aware: ray-check to the target and pull back or orbit when a body intersects."}
  ],
  "verdict": "continue"
}
```
