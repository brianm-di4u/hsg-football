# Critic A (critic-claude): loop 14, High tier

## Verdict
Friday Night Spa City is a consistent, competent stylized football game. Its HUD and type are close to shipped indie quality. The player models, venue and motion are not. The two new features show up in the captures. Defensive rush arrows draw on the turf (`high/desktop/R05`), and tackles now end in a real pile (`crops/high/R12-carrier`, `strips/high/R13` frames 7–8). Neither fixes the bigger problems, which every capture shows:
- The players are mannequins with grey-white arms, mitten hands and no faces.
- Behind every end zone is an empty, untextured slab (`high/desktop/R14`, `high/desktop/R20`).
- Post-play poses are cloned across players (identical crouches and identical arms-up celebrations).
- On the default desktop camera players are about 30 px tall.
- In portrait, the outside receivers sit at the screen edge.

High scores at or just under 7 in UI and typography and around 6–6.5 everywhere else. Not at the gate. Continue.

## Scores

### Art: 6.5
- **What holds up.** Helmets are glossy, with a specular hotspot, a decal and a cage, and they read against matte jerseys with sleeve stripes and outlined numbers (`crops/high/R06-slot_LG`, `crops/high/R06-slot_DL2-side`). The turf has visible grain at field level (`crops/high/R04-turf_26_67_42`). The crowd reads as people: boxy, but with varied poses and arms up (`crops/high/R01-crowd`).
- **Why it stops short of axis-3 (~7).**
  - In close-ups the Lakeside players' arms are flat pale grey with mitten hands and no skin or sleeve definition (`crops/high/R06-slot_C-side`, `crops/high/R06-slot_LG`).
  - No faces are visible behind any facemask.
  - Pants in stance form a single bulbous orange shell, with no cloth folds anywhere (`crops/high/R06-slot_LG`).
  - The venue is thin. Past the end line there is a flat dark plane with no track, fence or structures (`high/desktop/R14`, `high/desktop/R20`). The pines are still stacked cones and dwarf the visitor bleacher (`high/desktop/R15`).
  - The football is oversized: about 19 px long against a receiver about 44 px tall in `high/desktop/R09`, roughly 2.5× scale.
- **Benchmarks.** It matches legendbowl-1 for internal consistency. It falls below axis-3 for gear detail.

### Lighting & atmosphere: 6.5
- **What works.** The night exposure is believable. The light-tower lamps bloom (`high/landscape/R04`, `high/desktop/R20`). The field is brighter than the stands. Players cast soft directional shadows (`crops/high/R08-ball`, `high/desktop/R09`). Rain adds streaks, a specular wet hotspot near a light, and splash dots (`crops/high/R18-turf_26_67_40`, `high/desktop/R18`). The day/mist variant has its own grade (`high/desktop/R19`).
- **What is missing against axis-3 / cfb26-3.**
  - Each player has one dominant shadow, not the several soft shadows four towers would give.
  - The rain sheen is a local hotspot, not a wet field.
  - Stand faces and the area behind the end zones are flat and unlit: a uniform grey-blue slab in `high/desktop/R20` and `high/desktop/R14`.
  - The sideline replay frames are evenly lit with no pools of light (`high/desktop/R13`, `high/desktop/R15`).
  - The mist day game is a flat grey wash with little contrast in the field itself (`high/desktop/R19`).

### Animation & game feel: 6.0
- **New this loop.** Tackles end on the ground. `strips/high/R13` frames 7–8 show the carrier going down with a defender on top, and `crops/high/R12-carrier` shows three bodies down.
- **The pile itself has problems.**
  - The bodies interpenetrate: the white torso merges into the blue carrier.
  - #56 hangs airborne over the pile in a mid-stride pose.
  - Every player standing around it is in a rigid neutral stance (`high/desktop/R12`).
- **Cloned poses.**
  - In `strips/high/R10` frames 6–8 the four defenders not in the pile all hold the same hands-on-knees crouch.
  - In `crops/high/R14-carrier` nearly every celebrant does the same two-arms-up pose.
  - In `crops/high/R10-carrier` the linemen walk upfield in step rather than driving.
- **Throw and catch are not legible from the live camera.**
  - In `strips/high/R07` the QB is about 15 px tall. The wind-up is only legible in the close-up (`crops/high/R07-slot_QB`), and even there the arm is a stiff raised block.
  - In `strips/high/R09` frame 4 the reach reads only at zoom.
- **No feel touches.** I found no camera punch-in, slow motion or contact particles at the catch or the tackle in any strip.
- Gait and knee lift in `strips/high/R11` and `crops/high/R11-carrier` are acceptable.

### UI / HUD: 7.0
- **What works.**
  - The scorebug is consistent: logo roundels, team-colour bars, possession football, timeout pips, and a centre clock with down and distance (`high/desktop/R22`, `high/landscape/R04`).
  - Pre-snap identification is good. Routes are dashed white with shaped receiver badges (diamond, circle, triangle, square, star), plus a "1ST & 10" turf stencil (`high/desktop/R04`), on par with axis-1.
  - The new defensive rush arrows read in `high/desktop/R05`.
  - Result toasts have a clear two-level hierarchy (`high/desktop/R21`, `high/desktop/R14`).
  - The FG meter and the REPLAY tag are clean (`high/desktop/R16`, `high/desktop/R13`).
- **Deductions.**
  - The result toast lands on the moment it describes. Its top edge cuts the pile at about y≈640 in `high/desktop/R12`, and it covers the celebrants' feet in `high/desktop/R14`.
  - In `high/desktop/R05` the umpire stands inside the rush-arrow cluster, and the defensive diagram has no landmark labels (madden26-2 labels its zones).
  - The desktop sidebar is a plain list next to the broadcast-style top bar.

### Typography: 7.0
- **Strengths.** The type uses a consistent condensed display face (Oswald-style) for headings, scores and toasts and a humanist sans for body text (`high/desktop/R22`, `high/desktop/R21`). Numerals in the scorebug and the clock read at a glance, and the hierarchy is clear: "+7 YD · FIRST DOWN" over "M. DELACROIX RUN". Nothing is clipped in any frame I checked.
- **Weak points.**
  - Micro-labels are about 8–9 px on desktop: "HOME" in the scorebug and the "Space" key caps (`high/desktop/R04`, `high/desktop/R22`).
  - Play descriptions and the log on desktop are about 10–11 px.
- Comparable to legendbowl-4 and cfb26-1 in pairing, but less refined in scale steps.

### Readability: 6.5
- **What reads.**
  - The ball in flight reads well: an oversized ball, a white trail and a ground shadow (`high/desktop/R08`, `medium/mobile/R08`).
  - The target ring and number badge mark the receiver (`high/desktop/R09`).
  - The carrier has a ring and a name tag (`high/desktop/R10`, `medium/mobile/R10`).
  - The line of scrimmage (blue) and the first-down line (yellow) are always visible.
- **What does not.**
  - At 1280×800 the default behind-offense camera puts players at about 28–32 px tall (`high/desktop/R04`, `high/desktop/R05`).
  - The black home jerseys sit low in contrast on night turf, so in `high/desktop/R10` the carrier is only findable by his tag.
  - In portrait `medium/mobile/R04`, receiver 1's badge sits on top of the "1ST & 10" stencil, and receivers 2 and 3 are jammed against the right edge with an off-screen arrow.
- **Benchmarks.** It does not reach the at-a-glance standard of madden26-1 or retrobowl-1 in every frame.

### Mobile: 6.5
- **Strengths.**
  - The portrait HUD is thumb-friendly: full-width HIKE, JUKE and CONTINUE buttons and large play cards with diagrams (`medium/mobile/R22`, `medium/mobile/R21`).
  - Landscape is intentional: a sidebar layout with the field about 1190 of 1688 px wide and larger figures (`medium/landscape/R10`, `medium/landscape/R12`).
- **Weaknesses.**
  - In portrait, figures are about 20 CSS px tall (`medium/mobile/R04`, `medium/mobile/R10`).
  - The pre-snap framing is too wide: the outside receivers fall off the 390 px width (`medium/mobile/R04`, matched in `high/mobile/R04`).
  - Only 6 of the 10 plays fit on screen in portrait R22.
  - The Medium phone tier holds 37 fps minimum under the 4× throttle, but its worst p95 frame is 34.0 ms (below 30 fps for 5% of frames). High on the phone proxy drops to 20 fps.
- Retrobowl-1 frames the whole formation intentionally at phone width; this does not yet.

### Authenticity: 6.5
- **What lands.**
  - Spa City identity: Hot Springs vs Lakeside, plays named for local streets and landmarks (Bathhouse Dive, Central Avenue Sweep, Promenade Slants), and a Ouachita ridge backdrop.
  - A distinct 3A venue for Jessieville, with a purple end zone and smaller stands (`high/desktop/R20`).
  - H-style uprights with padded bases (`high/desktop/R14`), a high-school scoreboard (`crops/high/R01-board`), and sideline teams now in loose clusters (`high/desktop/R15`).
- **What is missing.**
  - No band, cheerleaders or student-section signage appear in any capture I reviewed (`crops/high/R01-crowd`, `high/desktop/R13`).
  - The end-zone surround is a void, with no track oval, fence, field house or parking-lot lights (`high/desktop/R14`, `high/desktop/R20`).
  - The visitor side is a single short box bleacher under a wall of oversized pines (`high/desktop/R15`).
- **Benchmarks.** Below the staging density of cfb26-1 and cfb26-3 scaled down to a high-school field.

### Low and Medium regression check
- Medium matches High in the close-ups (`crops/medium/R06-slot_C` against `crops/high/R06-slot_C`).
- Low keeps the v2 blocky look (`crops/low/R06-slot_C`, `crops/low/R12-carrier`). Its pile is smaller (`low/desktop/R12`: one or two bodies down) but nothing is broken.
- The `low/landscape/R12` I used is the representative capture and renders correctly.

## Ranked gaps
1. **G-anim-pose-variety** (WS4b, animation, severity 4, M, +0.5)
   - **Problem:** cloned post-play crouches (`strips/high/R10` frames 6–8), cloned arms-up celebrations (`crops/high/R14-carrier`), an airborne #56 over the pile, and interpenetrating pile bodies (`crops/high/R12-carrier`).
   - **Fix:** pick idle and celebration poses from a pool of 4–6, with random phase and mirroring. Snap all feet to the ground at the whistle. Separate pile bodies with capsule push-out and stack the second and third tacklers on top, not inside.
2. **G-art-limbs-faces** (WS3, art, severity 4, L, +0.5)
   - **Problem:** grey mannequin arms, mitten hands, no faces, and bulbous stance pants (`crops/high/R06-slot_LG`, `crops/high/R06-slot_C-side`).
   - **Fix:** use skin-tone forearms with sleeve and elbow-pad seams, gloves with split fingers, and a face plane with brow shadow behind the cage. Add a normal or AO map for jersey and pant folds and tighten the pants silhouette.
3. **G-venue-endzone-void** (WS2, authenticity, severity 4, M, +0.5)
   - **Problem:** flat untextured slabs behind the end zones (`high/desktop/R14`, `high/desktop/R20`, `high/desktop/R03`), and a tiny visitor stand under cone pines (`high/desktop/R15`).
   - **Fix:** add a track oval, a chain-link fence, an end-zone berm or field house, a band section and a student section with signs, and light poles in the parking lot. Texture and darken the ground beyond the fence.
4. **G-mobile-portrait-framing** (WS7, mobile, severity 4, M, +0.5)
   - **Problem:** receivers clipped at the 390 px edges and a badge over the turf stencil (`medium/mobile/R04`). Figures are about 20 CSS px.
   - **Fix:** fit the portrait pre-snap camera to the formation's width plus a margin, then pull in once the snap happens. Hide the "1ST & 10" stencil when a badge overlaps it, or move it.
5. **G-anim-feel-beats** (WS4, animation, severity 3, M, +0.5)
   - **Problem:** no punch-in, slow motion or particles at the catch or the tackle, and the throw and catch are illegible at the live camera distance (`strips/high/R07`, `strips/high/R09`).
   - **Fix:** a 0.3 s slow motion with a 10–15% dolly-in at the catch and at first tackle contact, plus turf-spray and dust particles at the contact point.
6. **G-read-camera-scale** (WS7, readability, severity 3, S, +0.5)
   - **Problem:** players are 28–32 px on desktop, and the black jerseys are hard to pick out on night turf (`high/desktop/R04`, `high/desktop/R10`).
   - **Fix:** lower and move the behind-offense camera closer so players are about 45 px, and add a subtle team-colour rim light or outline at distance.
7. **G-light-multishadow-wet** (WS1, lighting, severity 3, M, +0.5)
   - **Problem:** one shadow per player, a hotspot-only rain sheen, and unlit stand faces and backdrop (`crops/high/R18-turf_26_67_40`, `high/desktop/R20`).
   - **Fix:** add 2–3 extra faint shadow lobes or contact shadows toward the other towers, a full-field wet roughness drop with specular streaks toward each tower in rain, and tower spill on the stand fronts and fences.
8. **G-mobile-perf-p95** (WS7, mobile, severity 3, M, +0.3)
   - **Problem:** under the 4× throttle, Medium's worst p95 frame is 34.0 ms and High falls to 20 fps.
   - **Fix:** use dynamic resolution on the phone tier, instance the sideline players and crowd to cut the 88 draw calls, and lower shadow-map resolution below 30 fps.
9. **G-ui-toast-overlap** (WS7, ui, severity 2, S, +0.3)
   - **Problem:** the result toast covers the pile and the celebrants (`high/desktop/R12`, `high/desktop/R14`).
   - **Fix:** when a toast shows, frame the post-play camera so the ball spot sits in the upper 55% of the view, or dock the toast under the scorebug.

```json
{
  "loop": 14,
  "role": "critic-claude",
  "tier": "high",
  "scores": {
    "art": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "crops/high/R06-slot_LG", "note": "glossy helmets vs matte jerseys; grey mannequin arms, mitten hands, bulbous stance pants"},
        {"shot": "crops/high/R06-slot_C-side", "note": "no faces behind cages; arms untextured"},
        {"shot": "crops/high/R01-crowd", "note": "crowd reads as people, boxy low-poly"},
        {"shot": "high/desktop/R20", "note": "flat untextured slab beyond end zone"},
        {"shot": "high/desktop/R15", "note": "pines still stacked cones dwarfing a small visitor bleacher"}
      ]
    },
    "lighting": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/landscape/R04", "note": "lamp bloom, believable night exposure"},
        {"shot": "crops/high/R18-turf_26_67_40", "note": "rain sheen only a local hotspot plus splash dots"},
        {"shot": "high/desktop/R09", "note": "one dominant soft shadow per player"},
        {"shot": "high/desktop/R14", "note": "unlit flat backdrop behind end zone"}
      ]
    },
    "animation": {
      "score": 6.0,
      "confidence": 0.65,
      "evidence": [
        {"shot": "strips/high/R13", "note": "frames 7-8 carrier goes down with defender on top; pile now forms"},
        {"shot": "strips/high/R10", "note": "frames 6-8 identical hands-on-knees crouch on four defenders"},
        {"shot": "crops/high/R12-carrier", "note": "pile bodies interpenetrate; #56 airborne over pile"},
        {"shot": "crops/high/R14-carrier", "note": "near-uniform arms-up celebration"},
        {"shot": "strips/high/R07", "note": "QB ~15 px; wind-up not legible at live camera; no punch-in/slow-mo in any strip"}
      ]
    },
    "ui": {
      "score": 7.0,
      "confidence": 0.6,
      "evidence": [
        {"shot": "high/desktop/R04", "note": "dashed route art, shaped receiver badges, turf 1ST & 10 stencil"},
        {"shot": "high/desktop/R05", "note": "new rush arrows read; umpire inside arrow cluster; no landmark labels"},
        {"shot": "high/desktop/R21", "note": "toast hierarchy clear"},
        {"shot": "high/desktop/R12", "note": "toast top edge cuts across the pile"}
      ]
    },
    "typography": {
      "score": 7.0,
      "confidence": 0.65,
      "evidence": [
        {"shot": "high/desktop/R22", "note": "condensed display + sans body; 'HOME' and 'Space' micro labels ~8-9 px"},
        {"shot": "high/desktop/R21", "note": "+7 YD · FIRST DOWN over runner name, clear scale"},
        {"shot": "medium/mobile/R22", "note": "play-card names large and legible at phone width"}
      ]
    },
    "readability": {
      "score": 6.5,
      "confidence": 0.65,
      "evidence": [
        {"shot": "high/desktop/R08", "note": "ball with trail and shadow reads; target ring"},
        {"shot": "high/desktop/R10", "note": "carrier in black jersey only findable via name tag; players ~30 px"},
        {"shot": "medium/mobile/R04", "note": "receiver badge over turf stencil; receivers 2/3 crammed at right edge"},
        {"shot": "medium/mobile/R08", "note": "ball and target clear in portrait"}
      ]
    },
    "mobile": {
      "score": 6.5,
      "confidence": 0.65,
      "evidence": [
        {"shot": "medium/mobile/R04", "note": "figures ~20 CSS px; formation wider than the 390 px view"},
        {"shot": "medium/mobile/R22", "note": "thumb-friendly play cards; 6 of 10 visible"},
        {"shot": "medium/landscape/R10", "note": "intentional sidebar layout, larger figures"},
        {"shot": "medium/mobile/R21", "note": "full-width CONTINUE and toast; perf: medium 4x throttle min 37 fps, p95 34.0 ms"}
      ]
    },
    "authenticity": {
      "score": 6.5,
      "confidence": 0.6,
      "evidence": [
        {"shot": "high/desktop/R20", "note": "3A Jessieville venue distinct, but void beyond end zone"},
        {"shot": "high/desktop/R14", "note": "H-style padded uprights; no track/fence/band"},
        {"shot": "high/desktop/R15", "note": "sideline clusters of four; small visitor bleacher"},
        {"shot": "crops/high/R01-board", "note": "HS-style scoreboard"}
      ]
    }
  },
  "gaps": [
    {"id": "G-anim-pose-variety", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS4b", "evidence": ["strips/high/R10", "crops/high/R12-carrier", "crops/high/R14-carrier"], "benchmark": "cfb26-4", "fix": "Choose post-play idle and celebration poses from a 4-6 pose pool with random phase and mirroring; snap feet to the ground at the whistle; separate pile bodies with capsule push-out and stack the 2nd and 3rd tacklers on top instead of inside the carrier."},
    {"id": "G-art-limbs-faces", "category": "art", "expectedGain": 0.5, "severity": 4, "effort": "L", "workstream": "WS3", "evidence": ["crops/high/R06-slot_LG", "crops/high/R06-slot_C-side"], "benchmark": "axis-3", "fix": "Use skin-tone forearms with sleeve and elbow-pad seams, split-finger gloves, and a face plane with brow shadow behind the cage; add a normal/AO map for jersey and pant folds and tighten the stance pant silhouette."},
    {"id": "G-venue-endzone-void", "category": "authenticity", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["high/desktop/R14", "high/desktop/R20", "high/desktop/R15"], "benchmark": "cfb26-1", "fix": "Replace the flat slab beyond the end zones with a track oval, chain-link fence, berm or field house and parking-lot light poles; add a band block and a student section with signs; scale the visitor bleacher up relative to the pines."},
    {"id": "G-mobile-portrait-framing", "category": "mobile", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS7", "evidence": ["medium/mobile/R04", "high/mobile/R04"], "benchmark": "retrobowl-1", "fix": "Fit the portrait pre-snap camera to the formation width plus a margin so every receiver and badge is on screen, then pull in after the snap; move or hide the 1ST & 10 turf stencil when a receiver badge overlaps it."},
    {"id": "G-anim-feel-beats", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS4", "evidence": ["strips/high/R07", "strips/high/R09", "strips/high/R13"], "benchmark": "madden26-4", "fix": "Add a 0.3 s slow motion with a 10-15% camera dolly-in at the catch and at first tackle contact, plus turf-spray and dust particles at the contact point."},
    {"id": "G-read-camera-scale", "category": "readability", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R04", "high/desktop/R10"], "benchmark": "madden26-1", "fix": "Lower and move the default behind-offense camera closer so players are about 45 px tall at 1280x800; add a subtle team-colour rim light or outline on distant players so black jerseys separate from night turf."},
    {"id": "G-light-multishadow-wet", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["crops/high/R18-turf_26_67_40", "high/desktop/R20", "high/desktop/R09"], "benchmark": "cfb26-3", "fix": "Add 2-3 faint extra shadow lobes or contact shadows toward the other light towers; in rain, drop roughness across the whole field with specular streaks toward each tower; light stand fronts and fences with tower spill."},
    {"id": "G-mobile-perf-p95", "category": "mobile", "expectedGain": 0.3, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["medium/mobile/R10", "medium/mobile/R18"], "benchmark": "retrobowl-2", "fix": "Phone tier: use dynamic resolution, instance the sideline players and crowd to cut the 88 draw calls, and lower shadow-map resolution when the frame time exceeds 33 ms, so the 4x-throttle p95 stays under 33 ms."},
    {"id": "G-ui-toast-overlap", "category": "ui", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R12", "high/desktop/R14"], "benchmark": "madden26-3", "fix": "When a result toast is up, frame the post-play camera so the ball spot sits in the upper 55% of the view, or dock the toast under the scorebug so it never covers the pile or the celebration."}
  ],
  "verdict": "continue"
}
```
