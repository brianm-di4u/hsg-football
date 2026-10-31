# Critic A (critic-claude): loop 7, High tier

## Verdict
Friday Night Spa City is a clean, consistent stylized 3D football game. It has a good broadcast-style HUD, team identity that reads, and a painted Ouachita night sky. It still sits clearly below the Axis Football 2026 bar, and no category reaches its gate. This loop's pants refit doesn't change much in close-ups. Linemen and QBs in a crouch still show a ballooned orange seat (`crops/high/R04-slot_C`, `crops/high/R06-slot_C`, `crops/high/R16-slot_K`). The officials are still faceless black mannequins with mitten hands (`crops/high/R03-slot_QB`). Tackle contact is still not legible in the motion strips (`strips/high/R13`). The establishing kickoff shot shows no crowd, no light towers and no stands, only a dark box around the field (`high/desktop/R01`). The phone work helped the portrait pre-snap view, which is tighter and has big thumb buttons. But the portrait shot now spends its top ~40% on empty field while a wideout is off-screen with no badge (`high/mobile/R04`). Toast banners also leave half-rows of the stadium scoreboard peeking out in landscape (`high/landscape/R12`, `high/landscape/R21`). Scores are 6–6.5 across the board, and the loop should **continue**.

## Category scores (High, desktop unless noted)

### Art: 6.0
- **Players.** Bodies are smooth and the gear reads: glossy helmets with striping and logo decals, piped jerseys, stripes on the socks. There's a real gloss/matte contrast between helmet and jersey (`crops/high/R04-slot_QB`, `crops/high/R07-slot_QB`). That much meets the 7 anchor.
- **Body shapes.** Proportions break down in close-ups:
  - In a crouch the seat and hips still swell into a round orange "diaper" wider than the torso (`crops/high/R04-slot_C` #69, `crops/high/R06-slot_C` QB #10 and #56, `crops/high/R16-slot_K` holder #12).
  - Shoulder pads are faceted blocks, and the sleeve hem is jagged (`crops/high/R06-slot_LG`, foreground #20).
  - Hands are pale claws or mittens (`crops/high/R06-slot_C-side`).
- **Officials.** They are untextured mannequins: no face, no ears, mitten hands, a black capsule body (`crops/high/R03-slot_QB`, `crops/high/R04-slot_C`).
- **Crowd.** It reads as people up close, with arms-up poses and mixed shirts (`crops/high/R01-crowd`). Under gameplay cameras it shrinks to dots in one bleacher block (`high/desktop/R13`, `high/desktop/R15`).
- **Venue.** Mostly flat black boxes and grey walls (`high/desktop/R13`).
- **Turf.** Has texture at field level (`crops/high/R04-turf_26_67_42`).
- **Against benchmarks.** Below axis-3, which has natural proportions, dressed sidelines and sponsor boards. Comparable to legendbowl-1 for style consistency, but not for polish.

### Lighting & atmosphere: 6.0
- **What works:**
  - Bloom on the lamp heads when they're in frame (`high/desktop/R04`, `high/desktop/R20`).
  - Several soft shadow spokes under players (`high/desktop/R01`, `high/desktop/R17`).
  - A painted dusk sky.
  - A day-mist variant that reads well (`high/desktop/R19`).
- **What doesn't:**
  - The bowl is crushed to black. There's no spill or falloff from the field into the stands, and in most live frames the light towers are off-frame, so the field looks evenly lit by nothing (`high/desktop/R10`, `high/desktop/R12`).
  - The establishing shot is a dark void around a lit rectangle (`high/desktop/R01`).
  - Rain adds streaks, but the turf doesn't read as wet. The only response is one blown-out white specular blob (`crops/high/R18-turf_26_67_40`, `high/desktop/R18`).
- **Against benchmarks.** Far from cfb26-3's lit bowl and ring lights, and short of the 7 anchor's "wet sheen in rain, light falloff from field to stands".

### Animation & game feel: 5.5
- **Strips:**
  - `strips/high/R09`: the catch gets a camera punch-in at frame 4. By frames 6–8, the receiver and a defender just lie flat, rag-doll style, with no fall arc.
  - `strips/high/R10`: the dive collapses into a pile with a "NO GAIN" toast, and the bodies settle flat.
  - `strips/high/R13`: the sideline replay is meant to show tackle contact, but carrier #20 stays upright through all 8 frames. There is no wrap, stagger or fall, so the contact beat doesn't read.
  - `strips/high/R07`: at this camera distance the QB drop can't be read.
  - `strips/high/R11`: the sweep carrier shows a stride and lean that read.
- **Close-ups:**
  - The wind-up is legible (`crops/high/R07-slot_QB`).
  - The sweep stride is planted (`crops/high/R11-carrier`).
  - The TD celebration has jumps and raised arms (`crops/high/R14-carrier`).
  - The under-center QB stands upright with his hands away from the center, which is not a snap stance (`crops/high/R06-slot_C`; the same in Medium and Low).
- **Score.** This is procedural motion with flat falls: the 5 anchor plus a few feel touches.

### UI / HUD: 6.5
- **What works:**
  - The scorebug is strong and broadcast-like: team-colour bars, logo, possession ball, clock and down & distance (`high/desktop/R04`).
  - Pre-snap route art uses shaped, numbered receiver badges (`high/desktop/R04`, `high/desktop/R19`). This compares well with axis-1.
  - The result toasts have hierarchy (`high/desktop/R12`, `high/desktop/R21`).
  - The FG meter is clear (`high/desktop/R16`).
- **What doesn't:**
  - The toast's left and right ends are a smeared dark feather rather than a finished plate (`high/desktop/R12`, `high/desktop/R21`).
  - In landscape the toast sits over the stadium scoreboard and leaves a half-row of digits showing under it (`high/landscape/R12`, `high/landscape/R21`).
  - During live play the desktop side panel is about 70% empty, and a dimmed JUKE button shows while the QB is still holding the ball (`high/desktop/R07`, `high/desktop/R08`).
  - The play list is cut off at the bottom (`high/desktop/R22`).
- **Against benchmarks.** Below madden26-3 / axis-1 polish.

### Typography: 6.5
- **What works.** One condensed display face (Oswald-like) for headers, buttons, toasts and the scorebug, with a clean sans for body and log. Numerals read at a glance (`high/desktop/R22`, `high/desktop/R14`, `high/mobile/R22`).
- **What doesn't:**
  - Case is inconsistent: "1st & 10 · own 30" in the scorebug, but "1ST & 10" and "NEXT: 2ND & 5 · OWN 40" in the panel (`high/desktop/R12`).
  - The FG meter's sub-label "Stop the needle between the uprights" is about 9 px and hard to read (`high/desktop/R16`).
  - Panel body text wraps "check-/down" (`high/desktop/R22`).
- **Against benchmarks.** Short of cfb26-1 and legendbowl-4's deliberate scale and tracking.

### Readability: 6.0
- **What works.** The carrier ring plus the name plate is clear (`high/desktop/R10`, `high/desktop/R11`). The line of scrimmage (blue) and the first-down line (yellow) are always visible.
- **Size.** Players are about 20–25 px tall at 1280×800 (`high/desktop/R04`, `high/desktop/R10`), smaller than in axis-1.
- **The ball:**
  - It's dark brown against dark jerseys, with no trail or ground marker. In `high/desktop/R08` it's findable only as a small dark lozenge.
  - The dedicated ball close-up doesn't clearly show the ball at all (`crops/high/R08-ball`, the same in `crops/medium/R08-ball`).
- **Phone portrait.** Receiver 2 is off-screen with no clamped badge, and badge 1 sits over a painted yard number (`high/mobile/R04`).

### Mobile: 6.0
- **Portrait:**
  - The pre-snap view is now intentionally tight, with linemen about 26 CSS px tall.
  - HIKE and CHANGE PLAY are big thumb targets, and the 2-column play cards read well (`high/mobile/R04`, `high/mobile/R22`).
  - The live-play hint shows in full (`high/mobile/R10`).
  - But the top ~40% of the pre-snap view is empty field, while a wideout is cut off (`high/mobile/R04`).
  - On the TD, the stadium scoreboard is clipped at the right edge, which hides the LHS score (`high/mobile/R14`). The new sliver rule only covers vertical cuts.
- **Landscape:**
  - The play list now fits 6 cards (`high/landscape/R22`).
  - The field area loses about 30% of width to the panel, and figures are about 15 CSS px tall (`high/landscape/R04`).
  - Toasts leave scoreboard half-rows visible (`high/landscape/R12`, `high/landscape/R21`).
- **Performance.** Medium (the phone tier) holds 60 fps minimum under 4× throttle. High mobile at 31 fps minimum, with a 51 ms p95, does not.
- **Against benchmarks.** Below retrobowl-1 and retrobowl-2, whose figures and HUD are larger and cleaner.

### Authenticity: 6.0
- **What works:**
  - Real Spa City names: Hot Springs Trojans, Lake Hamilton Wolves, Lakeside, Jessieville, plus play names like Bathhouse Dive and Central Avenue Sweep.
  - Painted end zones, midfield logos, H-style goalposts, team sideline benches.
  - Ouachita ridgelines and pines behind the field.
  - A HS-style scoreboard with DOWN / TO GO / BALL ON (`high/desktop/R03`, `crops/high/R01-board`).
  - Jessieville gets bleachers on both sides, at the right small-school scale (`high/desktop/R20`).
- **What's missing:**
  - At Hot Springs the visitor side has no bleachers at all (`high/desktop/R04`, `high/desktop/R07`).
  - The establishing kickoff shows no stadium, crowd, band or lights (`high/desktop/R01`).
  - No band, student section, track or fence is visible in any frame.
- **Against benchmarks.** Below cfb26-1/2 and legendbowl-4 staging, but no longer generic.

## Ranked gaps

1. **G-tackle-contact-beat** (animation, WS4b, severity 4, effort L, gain +0.5)
   - Problem: the R13 replay shows no contact; the carrier is upright for 8 frames. Falls in R09 and R10 are instant flat lay-downs.
   - Fix: paired wrap-tackle animations. Lean in on contact, then a 2–3 frame stagger and a fall arc driven by hit direction, with varied landings. Add a slow-mo or punch-in on contact in replays.
2. **G-pants-seat-volume** (art, WS3, severity 4, effort M, gain +0.5)
   - Problem: the seat and hips still balloon in stances (`crops/high/R04-slot_C`, `crops/high/R06-slot_C`, `crops/high/R16-slot_K`).
   - Fix: re-weight the pelvis and glute vertices so they don't scale out under hip flexion. Cut the seat volume about 25% more. Add a cloth normal map with knee and hip folds.
3. **G-establishing-venue** (authenticity, WS2, severity 4, effort M, gain +0.5)
   - Problem: the R01 kickoff wide shows a black box around the field.
   - Fix: aim the R01 and kickoff cameras so they take in the lit home grandstand, light towers with bloom, a band block and the visitor stands. Add visitor-side bleachers at Joe C. Reese.
4. **G-bowl-light-falloff** (lighting, WS1, severity 3, effort M, gain +0.5)
   - Problem: the stands and surroundings are crushed to black, with no spill from the lamps (`high/desktop/R10`, `high/desktop/R12`, `high/desktop/R01`).
   - Fix: add lamp spill onto the stands and the track apron, plus subtle volumetric cones under the towers. Lift mid-tones in the bowl so the venue reads at night.
5. **G-portrait-presnap-composition** (mobile, WS7, severity 3, effort M, gain +0.5)
   - Problem: in `high/mobile/R04` the top ~40% is empty field, WR2 is off-screen with no badge, and badge 1 overlaps a yard number.
   - Fix: lower the camera target so the deep field is trimmed. Always render edge-clamped badges with an arrow for every eligible receiver. Keep badges off painted numbers.
6. **G-board-occlusion** (ui, WS7, severity 3, effort S, gain +0.25)
   - Problem: the toast leaves scoreboard half-rows showing in landscape (`high/landscape/R12`, `high/landscape/R21`), and the board is clipped horizontally on the portrait TD (`high/mobile/R14`).
   - Fix: extend the sliver rule to boards occluded by the toast or clipped horizontally (hide the face, or re-aim the camera).
7. **G-officials-mannequin** (art, WS3, severity 3, effort M, gain +0.25)
   - Problem: officials are faceless capsules with mitten hands (`crops/high/R03-slot_QB`).
   - Fix: give them the player head and skin shader, fingers, a cap brim and belted pants.
8. **G-ball-visibility** (readability, WS7, severity 3, effort S, gain +0.25)
   - Problem: the dark ball is lost against jerseys (`high/desktop/R08`), the R08 ball close-up doesn't frame it (`crops/high/R08-ball`), and Low's ball is oversized (`crops/low/R06-slot_C`).
   - Fix: add a faint trail and a ground shadow dot while the ball is in the air, and a brighter lace or spec highlight. Fix the crop target and the Low ball scale.
9. **G-qb-under-center** (animation, WS4, severity 3, effort S, gain +0.25)
   - Problem: the QB stands upright with his arms out behind the center (`crops/high/R06-slot_C`).
   - Fix: an under-center crouch with hands under the center, then a snap-exchange anim.
10. **G-wet-turf** (lighting, WS5, severity 3, effort M, gain +0.25)
    - Problem: the rain turf isn't wet, and there's a blown-out spec blob (`crops/high/R18-turf_26_67_40`).
    - Fix: darken the wet albedo, lower the roughness with stretched lamp reflections, add splash ripples, and clamp the hotspot.
11. **G-live-panel-dead-space** (ui, WS7, severity 2, effort M, gain +0.25)
    - Problem: during live play the desktop panel is about 70% empty, and JUKE shows during the dropback (`high/desktop/R07`, `high/desktop/R08`).
    - Fix: hide JUKE until the player holding the ball is a runner. Fill the panel with live context (targets, yards to the marker) or collapse it to widen the field.
12. **G-type-case-consistency** (typography, WS7, severity 2, effort S, gain +0.25)
    - Problem: down & distance appears in mixed case across the HUD, and the FG sub-label is tiny (`high/desktop/R12`, `high/desktop/R16`).
    - Fix: one case rule for down & distance everywhere, and a minimum 12 px for secondary labels.

```json
{
  "loop": 7,
  "role": "critic-claude",
  "tier": "high",
  "scores": {
    "art": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "crops/high/R04-slot_C", "note": "crouched center #69: seat and hips still balloon wider than torso"},
        {"shot": "crops/high/R06-slot_C", "note": "QB #10 and #56 diaper-like seat; pale claw hands"},
        {"shot": "crops/high/R03-slot_QB", "note": "official is a faceless black mannequin with mitten hands"},
        {"shot": "crops/high/R04-slot_QB", "note": "glossy helmet vs matte jersey contrast reads"},
        {"shot": "crops/high/R01-crowd", "note": "crowd reads as low-poly people up close"},
        {"shot": "high/desktop/R13", "note": "venue is flat black boxes and grey walls"}
      ]
    },
    "lighting": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R01", "note": "establishing shot: lit field in a black void, no stands or lamps"},
        {"shot": "high/desktop/R04", "note": "lamp bloom, painted dusk sky, soft player shadows"},
        {"shot": "high/desktop/R19", "note": "day mist reads well"},
        {"shot": "crops/high/R18-turf_26_67_40", "note": "rain: no wet turf, one blown-out spec blob"},
        {"shot": "high/desktop/R12", "note": "bowl crushed to black, no falloff into stands"}
      ]
    },
    "animation": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "strips/high/R13", "note": "tackle replay: carrier upright all 8 frames, no contact beat"},
        {"shot": "strips/high/R09", "note": "punch-in on catch; bodies then lie flat with no fall arc"},
        {"shot": "strips/high/R10", "note": "pile forms, flat settle"},
        {"shot": "crops/high/R07-slot_QB", "note": "wind-up legible"},
        {"shot": "crops/high/R06-slot_C", "note": "under-center QB standing upright, no snap stance"},
        {"shot": "crops/high/R14-carrier", "note": "celebration jumps and raised arms"}
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R04", "note": "broadcast scorebug, numbered shaped receiver badges, route art"},
        {"shot": "high/desktop/R21", "note": "toast with hierarchy but smeared feathered ends"},
        {"shot": "high/landscape/R12", "note": "toast leaves stadium-board half-row peeking below"},
        {"shot": "high/desktop/R07", "note": "live panel ~70% empty; dimmed JUKE during dropback"},
        {"shot": "high/desktop/R16", "note": "clear FG meter"}
      ]
    },
    "typography": {
      "score": 6.5,
      "confidence": 0.65,
      "evidence": [
        {"shot": "high/desktop/R22", "note": "consistent condensed display + sans body; check-/down wrap"},
        {"shot": "high/desktop/R12", "note": "mixed case for down & distance across HUD"},
        {"shot": "high/desktop/R16", "note": "FG sub-label ~9px"},
        {"shot": "high/mobile/R22", "note": "card titles and tags read well on phone"}
      ]
    },
    "readability": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R10", "note": "carrier ring and name plate clear; players ~20-25px"},
        {"shot": "high/desktop/R08", "note": "dark ball only findable as a small lozenge, no trail"},
        {"shot": "crops/high/R08-ball", "note": "ball close-up does not clearly show the ball"},
        {"shot": "high/mobile/R04", "note": "WR2 off-screen without badge; badge 1 over a yard number"}
      ]
    },
    "mobile": {
      "score": 6.0,
      "confidence": 0.6,
      "evidence": [
        {"shot": "high/mobile/R04", "note": "tighter box framing, big HIKE target, but top ~40% empty field"},
        {"shot": "high/mobile/R14", "note": "stadium board clipped at right edge, LHS score lost"},
        {"shot": "high/landscape/R21", "note": "toast over board leaves half-row; figures ~15 CSS px"},
        {"shot": "high/landscape/R22", "note": "6 cards fit, single-line titles"},
        {"shot": "high/mobile/R10", "note": "full Steer hint, red JUKE thumb target"}
      ]
    },
    "authenticity": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R03", "note": "Lake Hamilton Wolves end zone, H posts, Ouachita backdrop"},
        {"shot": "high/desktop/R20", "note": "Jessieville small-school bleachers both sides"},
        {"shot": "high/desktop/R01", "note": "kickoff establishing shot shows no venue, crowd, band"},
        {"shot": "high/desktop/R04", "note": "no visitor bleachers at Hot Springs"},
        {"shot": "crops/high/R01-board", "note": "HS-style scoreboard with DOWN / TO GO / BALL ON"}
      ]
    }
  },
  "gaps": [
    {"id": "G-tackle-contact-beat", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "L", "workstream": "WS4b", "evidence": ["strips/high/R13", "strips/high/R09", "strips/high/R10"], "benchmark": "cfb26-4", "fix": "Paired wrap-tackle animations: lean in on contact, 2-3 frame stagger, a fall arc driven by hit direction, varied landings; slow-mo or punch-in on contact in replays."},
    {"id": "G-pants-seat-volume", "category": "art", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS3", "evidence": ["crops/high/R04-slot_C", "crops/high/R06-slot_C", "crops/high/R16-slot_K"], "benchmark": "axis-3", "fix": "Re-weight pelvis and glute vertices so they don't scale out under hip flexion; cut seat volume ~25% more; add a cloth normal map with knee and hip folds."},
    {"id": "G-establishing-venue", "category": "authenticity", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["high/desktop/R01", "high/desktop/R04"], "benchmark": "cfb26-2", "fix": "Aim the kickoff and establishing cameras to take in the lit home grandstand, light towers, a band block and visitor stands; add visitor bleachers at Joe C. Reese."},
    {"id": "G-bowl-light-falloff", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["high/desktop/R10", "high/desktop/R12", "high/desktop/R01"], "benchmark": "cfb26-3", "fix": "Lamp spill onto the stands and track apron, subtle volumetric cones under the towers, lifted bowl mid-tones."},
    {"id": "G-portrait-presnap-composition", "category": "mobile", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["high/mobile/R04"], "benchmark": "retrobowl-1", "fix": "Lower the camera target to trim the empty deep field; always render edge-clamped badges with an arrow for every eligible receiver; keep badges off painted numbers."},
    {"id": "G-board-occlusion", "category": "ui", "expectedGain": 0.25, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/landscape/R12", "high/landscape/R21", "high/mobile/R14"], "benchmark": "madden26-3", "fix": "Extend the scoreboard sliver rule to boards occluded by the toast or clipped horizontally: hide the face or re-aim the camera."},
    {"id": "G-officials-mannequin", "category": "art", "expectedGain": 0.25, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["crops/high/R03-slot_QB", "crops/high/R04-slot_C"], "benchmark": "axis-3", "fix": "Give officials the player head and skin shader, fingers, a cap brim, belted pants and shoes."},
    {"id": "G-ball-visibility", "category": "readability", "expectedGain": 0.25, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R08", "crops/high/R08-ball", "crops/low/R06-slot_C"], "benchmark": "legendbowl-2", "fix": "Faint ball trail and ground shadow dot while in the air, a brighter lace or spec highlight; fix the R08 crop target and the Low ball scale."},
    {"id": "G-qb-under-center", "category": "animation", "expectedGain": 0.25, "severity": 3, "effort": "S", "workstream": "WS4", "evidence": ["crops/high/R06-slot_C", "crops/medium/R06-slot_C"], "benchmark": "madden26-1", "fix": "Under-center crouch with hands under the center, then a snap-exchange anim."},
    {"id": "G-wet-turf", "category": "lighting", "expectedGain": 0.25, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["crops/high/R18-turf_26_67_40", "high/desktop/R18"], "benchmark": "legendbowl-1", "fix": "Darker wet albedo, lower roughness with stretched lamp reflections, splash ripples; clamp the spec hotspot."},
    {"id": "G-live-panel-dead-space", "category": "ui", "expectedGain": 0.25, "severity": 2, "effort": "M", "workstream": "WS7", "evidence": ["high/desktop/R07", "high/desktop/R08"], "benchmark": "axis-1", "fix": "Hide JUKE until the ball carrier is a runner; fill the live panel with context (targets, yards to marker) or collapse it to widen the field."},
    {"id": "G-type-case-consistency", "category": "typography", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R12", "high/desktop/R16"], "benchmark": "madden26-3", "fix": "One case rule for down & distance everywhere; a 12px minimum for secondary labels."}
  ],
  "verdict": "continue"
}
```
