# Judge ruling: loop 11 (High tier, desktop)

Capture paths are relative to `games/football/screenshots/review-loop-11/`. No category has critics more than 1.0 apart (the widest is UI at 6.0 against 7.0). I still opened the captures behind every disputed fact before ruling: `high/desktop/R01`, `R03`, `R04`, `R12`, `R14`, `R15`, `R16`, `R17`, `R21`, `medium/mobile/R04`, `medium/mobile/R21`, `medium/landscape/R12`, `crops/high/R06-slot_C-side`, `crops/high/R07-slot_QB`, `crops/high/R12-carrier`, and `strips/high/R09`, `R10`, `R13`.

## Rulings on disputed facts
- **Do toasts cover the action? Partly; both sides are half right.**
  - Real occlusion:
    - The FG meter in `high/desktop/R16` hides the line and the holder. Only the kicker's legs and the ball show.
    - The `high/desktop/R12` toast (y about 645–745) sits on the lower edge of the pile at the LOS.
    - In `strips/high/R10` frames 6–8, "NO GAIN" cuts off the legs of the group at the LOS.
  - Claude overstated it in three places:
    - In `medium/landscape/R12` the pile sits fully above the toast.
    - In `high/desktop/R14` the feet end just above the toast. It grazes them; it does not cut the legs.
    - `high/desktop/R21` is clear.
  - The deeper cause is camera framing. Live and result cameras put the ball spot in the bottom 25–30% of the canvas (`strips/high/R10` frames 1–5 already crop the line at the bottom edge), so any bottom-docked toast lands on it.
  - Claude is right that the landscape toast still fades at its left and right edges and takes about a quarter of the field height (`medium/landscape/R12`).
- **Does the fall read in R13? Yes, modestly. Advocate mostly right.**
  - In `strips/high/R13`, the "20 KEMP" plate and the carrier step down across frames 5–8, and the cluster lowers.
  - At strip scale the wrap and drive do not read, so Codex is right on that part.
- **Do player gloves have fingers? Yes. Advocate right; Claude wrong.**
  - #55's white gloves in `crops/high/R06-slot_C-side` have a separate thumb and split fingers, and so does the black glove at the right of `crops/high/R12-carrier`.
  - Only the officials have simplified hands. The official in `crops/high/R12-carrier` does have a striped shirt and black slacks.
- **Does the field have light pools? Weakly. Advocate right that "none" is overstated.**
  - `high/desktop/R17` shows a brighter centre and darker corners and far end. `high/desktop/R01` falls off toward the dark perimeter.
  - `high/desktop/R04` is close to even.
  - The structures beyond the end zone are unlit slabs in `high/desktop/R14` and `R17`, as Claude says.
- **Does the QB wind-up show? Yes, in the close-up. Advocate right.**
  - The ball is cocked beside the helmet in `crops/high/R07-slot_QB`.
  - The same crop confirms the pass-protection line is upright and not engaged (#74 and #68 with arms hanging, the DL upright behind them).
- **Is there an empty bleacher at Wolf Stadium? No. Advocate right.**
  - `high/desktop/R03` shows a lit-window building behind the end zone and no bleacher facing it.
- **R15 replay focus: advocate mostly right.** The "44 DELACROIX" carrier is acceptably sharp, and the blur falls on the foreground and background. `high/desktop/R15` also shows the identical, evenly spaced bench row and the cone-silhouette trees.
- **Portrait result frame: confirmed.** `medium/mobile/R21` shows only the defense, the ball and an official. The offense is out of frame.
- **Badges: confirmed.** In `high/desktop/R04` the "5" star sits on the interior line and the "4" sits over a defender. `medium/mobile/R04` repeats this. The same portrait frame also leaves about 40% of the canvas as empty turf above the defense while receivers 2 and 3 are clipped onto edge badges.

## Category rulings

### Art: 6.0
Both critics agree, and the captures support it. `crops/high/R07-slot_QB` has glossy helmets with a specular highlight and facemask cages against matte jerseys, which is the material contrast the 7 anchor asks for. Several things hold it below 7:
- Molded, plasticky orange pants and inflated shoulders (`crops/high/R12-carrier`, `crops/high/R04-slot_QB`).
- An angular crease where the torso bends (`crops/high/R06-slot_C-side`).
- Simplified officials.
- Cone trees and unlit slab structures in the venue (`high/desktop/R15`, `high/desktop/R14`).

The crowd reads as people (`crops/high/R01-crowd`). Claude's "mitten gloves" point is struck. Against axis-3 (about 7) and legendbowl-1, this is a solid 6.

### Lighting & atmosphere: 6.5
Both critics agree. In its favour:
- Fanned multi-shadows under players (`high/desktop/R17`) and lamp bloom (`high/desktop/R01`).
- A wet specular (`crops/high/R18-turf_26_67_40`, cited by both critics).

Against it:
- Light pools are weak. They show in R17 and R01 but are close to even in R04.
- The structures beyond the end zones are unlit grey slabs (`high/desktop/R14`).
- The sky is an orange dusk band, not a night exposure.

Short of the cfb26-3 and axis-3 anchor.

### Animation & game feel: 5.5
Claude 5.5, Codex 5.0. What lifts it above 5:
- The fall now reads (`strips/high/R13` frames 5–8).
- The catch punch-in with one arm reaching (`strips/high/R09` frame 4).
- Bodies settle on the ground (`crops/high/R12-carrier`).

What keeps it well short of 7:
- No pass-protection contact (`crops/high/R07-slot_QB`).
- No visible wrap or drive in the tackle (`strips/high/R13`).
- Bodies interpenetrate on the ground (`crops/high/R12-carrier`, #47 and #20).
- Cloned line stances and an identical bench row (`strips/high/R10`, `high/desktop/R15`).

### UI / HUD: 6.5
Claude 6.0, Codex 7.0. The scorebug, route art, shape badges, the toast's headline and subtitle hierarchy, and the play list are all broadcast-grade enough (`high/desktop/R04`, `high/desktop/R21`). But the 7 anchor requires "nothing stale or overlapping":
- The FG meter covers the holder and line (`high/desktop/R16`).
- The R12 toast sits on the pile (`high/desktop/R12`).
- The badges overlap defenders (`high/desktop/R04`).
- The defensive pre-snap frame has no on-field defender marker, and its lower panel is empty (`high/desktop/R05`, cited by Claude and conceded by the advocate).

Codex's 7 ignores the overlaps. Claude's 6 counts several non-overlaps. **6.5.**

### Typography: 7.0
Claude 6.5, Codex 7.0. One condensed display face carries the scorebug, toasts, buttons and titles, with a humanist sans for body text. The scale is clear:
- About 28 px cap height on the toast headline over the subtitle (`high/desktop/R21`).
- The same pair holds on the phone (`medium/mobile/R21`, `medium/mobile/R04`).
- Score numerals and the gold clock read at a glance, and nothing is clipped.

The 9 px "HOME" tag is a real but minor flaw. The in-world scoreboard labels and the painted "1ST & 10" decal are not HUD typography, so the advocate's rebuttal stands. Meets the 7 anchor (madden26-3, legendbowl-4) at the low end.

### Readability: 6.0
Both critics agree. In its favour:
- The enlarged ball with a trail and the target ring (`high/desktop/R08`, cited by Codex and the advocate).
- The carrier plate (`high/desktop/R15`, `strips/high/R13`).

Against it:
- Linemen are about 20 px tall on desktop (`high/desktop/R04`).
- Badges float onto defenders (`high/desktop/R04`, `medium/mobile/R04`).
- The portrait result frame drops the offense (`medium/mobile/R21`).
- Toasts and the frame bottom crop the pile (`strips/high/R10` frames 6–8).

The anchor's "every frame, both viewports" is not met.

### Mobile: 6.0
Claude 6.5, Codex 6.0. Performance passes easily: Medium mobile at 4× throttle holds a minimum of 87 fps and p95 18.7 ms (perf.json). Controls are thumb-sized (`medium/mobile/R04`), and landscape keeps the pile above the toast (`medium/landscape/R12`). But "portrait framing intentional" fails in two of the three portrait captures I checked:
- In `medium/mobile/R04`, about 40% of the field view is empty turf above the defense while two receivers are clipped to edge badges. Linemen are about 24 CSS px.
- `medium/mobile/R21` frames the offense out entirely.

Landscape also gives about 30% of its width to the panel (`medium/landscape/R12`). Against retrobowl-1 and retrobowl-2, this is a 6.

### Authenticity: 6.5
Claude 6.0, Codex 6.5. Two of Claude's deductions are factually wrong: R03 has no empty bleacher, and the visitor stand is populated (`high/desktop/R15`). What is present:
- A home grandstand, light towers and the Ouachita ridge (`high/desktop/R01`).
- A school building behind the end zone at Wolf Stadium (`high/desktop/R03`).
- A small HS scoreboard, H goalposts and local end-zone wordmarks (`high/desktop/R14`).

There is still no band, student section, cheer squad or chain crew in any capture, and the Hot Springs end zones open onto dark slabs (`high/desktop/R14`). It clears the gate of 6, short of the cfb26-1 and legendbowl-4 anchor of 7.

## Verdict
Gates met: typography (7.0 ≥ 7) and authenticity (6.5 ≥ 6). Gates missed: art 6.0, lighting 6.5, animation 5.5, UI 6.5, readability 6.0 and mobile 6.0, all against 7. **continue.**

## Ranked gaps (merged; ranked by expected gain ÷ effort, then severity)

1. **G-toast-occludes-play** (ui, WS7, S, severity 3, +0.4).
   - Evidence: the FG meter over the holder and line (`high/desktop/R16`), the R12 toast on the pile (`high/desktop/R12`), and "NO GAIN" cropping the LOS group (`strips/high/R10` frames 6–8). The landscape toast fades at its edges (`medium/landscape/R12`).
   - Fix:
     - Move the FG meter into a bar in the bottom 80 px of the canvas, below the kicker's feet, or dock it top-left under the scorebug.
     - Frame the desktop result camera so the ball spot sits at or above 55% of canvas height, and check that no player's bounding box intersects the toast rect.
     - Give the landscape toast a solid, rounded backing like desktop, at most 18% of the field height.
   - Test: in R12, R16 and the R10 strip frames 6–8, no player pixel falls under an overlay.
2. **G-badge-detached** (readability, WS7, S, severity 3, +0.4).
   - Evidence: the "5" star on the interior line and the "4" over a defender (`high/desktop/R04`, `medium/mobile/R04`).
   - Fix: cap the badge offset at one helmet height above the owner's head, and draw a 1 px tether to the helmet. Alternatively, put the shape in a ground ring under the receiver.
   - Test: in R04 on all viewports, each badge's nearest player is its owner.
3. **G-contact-weight** (animation, WS4b, L, severity 4, +0.75). Merges G-pass-pro-no-contact.
   - Evidence: an upright, unengaged OL and DL during the drop (`crops/high/R07-slot_QB`, `strips/high/R07`), a tackle with no readable wrap or drive (`strips/high/R13`), and interpenetrating bodies on the ground (`crops/high/R12-carrier`).
   - Fix, pass protection:
     - Pair each OL with a rusher: a kick-slide, both arms extended into the chest plate, and pads about 15° forward.
     - The DL leans into the block and shuffles laterally, with 2–3 rush variants (bull, swim, rip).
   - Fix, tackles:
     - The tackler's shoulder meets the carrier's hip or torso, with both arms wrapping for 0.15 s before the existing recoil and drop, and his legs drive for 2–3 steps.
     - Resolve ground overlap with a minimum capsule separation between downed bodies.
4. **G-phone-framing** (mobile, WS7, M, severity 3, +0.5). Merges G-portrait-result-framing.
   - Evidence: the portrait result frame shows no offense (`medium/mobile/R21`). Portrait pre-snap leaves about 40% empty turf above the defense while receivers 2 and 3 are clipped (`medium/mobile/R04`). The landscape panel takes about 30% of the width (`medium/landscape/R12`).
   - Fix:
     - Centre the portrait result camera on the ball spot with about 8 yd of backfield visible above the toast.
     - In portrait pre-snap, place the LOS at about 45% of the field-view height and trim the empty downfield turf, so the camera can widen to keep all five receivers on screen.
     - Narrow the landscape live panel to about 200 px, keeping JUKE.
     - Add a scroll cue (a peeking seventh card or a fade) to `medium/mobile/R22`.
5. **G-light-pools-and-falloff** (lighting, WS1, M, severity 3, +0.4). Merges G-light-integration.
   - Evidence: weak pools (`high/desktop/R17`, close to even in `high/desktop/R04`), unlit structures beyond the end zone (`high/desktop/R14`), and an orange dusk sky.
   - Fix:
     - Strengthen the per-tower pools so the field varies about 20% in luminance between pool centres and the gaps between towers.
     - Light the near faces of the stands and end-zone structures, falling to dark above.
     - Drop the sky band to a night exposure (about 1 stop darker, less saturated orange).
     - Vary wet-turf roughness so the rain specular spreads into streaks rather than one blob (`crops/high/R18-turf_26_67_40`).
6. **G-panel-dead-space** (ui, WS7, S, severity 2, +0.2).
   - Evidence: the panel is blank below the button in `high/desktop/R05` and `high/desktop/R16`. Result screens already show a drive log (`high/desktop/R14`).
   - Fix: show the drive log, or a down-and-distance and field-position card, under the controls for defensive pre-snap and kicks. Alternatively, collapse the panel to its content height.
7. **G-defense-presnap-id** (ui, WS7, S, severity 2, +0.2).
   - Evidence: the defensive pre-snap frame has no on-field marker for the user's defender, and its zone art exists only in the panel (`high/desktop/R05`, conceded by the advocate).
   - Fix: a ground ring and shape badge under the user-controlled defender, plus translucent zone-drop shapes on the turf, matching the offensive route-art style.
8. **G-player-anatomy** (art, WS3, L, severity 4, +0.5). Merges G-cloth-materials and G-official-and-hand-models.
   - Evidence: molded, plastic-sheen pants and inflated shoulders (`crops/high/R12-carrier`, `crops/high/R04-slot_QB`), an angular crease where the torso bends (`crops/high/R06-slot_C-side`), a faceted shoulder on #74 (`crops/high/R14-carrier`, per the advocate), and simplified officials.
   - Fix:
     - Pants: roughness about 0.85 plus a weave normal map.
     - Jersey: fold and wrinkle normals at the waist and armpits.
     - Shoulder pads: more segments or smoothed normals.
     - Torso: extra edge loops or skin weights at the bend.
     - Officials: move them onto the player body rig with split-finger hands (they already have striped shirts and slacks).
   - Player gloves already have fingers; no work is needed there.
9. **G-venue-life** (authenticity, WS2, L, severity 4, +0.5). Merges G-venue-void-and-staging.
   - Evidence: no band, student section, cheer squad or chain crew anywhere. Dark slabs beyond the Hot Springs end zones (`high/desktop/R14`), cone trees (`high/desktop/R15`), and a sparse Jessieville venue (`high/desktop/R20`, cited by Codex).
   - Fix:
     - Seat a uniformed band block with instrument silhouettes, and a student section in matching shirts with signs, at one end of the home stand.
     - Put cheerleaders and a chain crew on the track.
     - Dress the Hot Springs end zones with a fieldhouse or fence and banners, lit like the R03 building.
     - Replace the cone trees with layered tree cards.
10. **G-run-block-weight** (animation, WS4, M, severity 3, +0.3). Merges G-cloned-poses.
    - Evidence: an identical OL squat (`strips/high/R10`, `strips/high/R11`), an identical DL stance with #63's down hand hovering (`crops/high/R06-slot_DL2-side`, per both Claude and the advocate), and an identical, evenly spaced bench row (`high/desktop/R15`).
    - Fix:
      - Per-player stance offsets (width ±15%, head angle, stagger), with the down hand planted on the turf.
      - Staggered run-block bases with planted feet, and an outside-foot plant before cuts.
      - Bench idle variants and uneven spacing.
11. **G-qb-windup-legibility** (animation, WS4, S, severity 1, +0.1).
    - Evidence: the cocked ball is visible in `crops/high/R07-slot_QB` but is lost at frame scale, with the QB low in frame (`high/desktop/R07`).
    - Fix: raise the QB to about 65–70% of frame height during the drop.

```json
{
  "loop": 11,
  "role": "judge",
  "tier": "high",
  "scores": {
    "art": {
      "score": 6.0,
      "confidence": 0.85,
      "evidence": [
        { "shot": "crops/high/R07-slot_QB", "note": "glossy helmet and facemask vs matte jersey: material contrast present" },
        { "shot": "crops/high/R12-carrier", "note": "molded plastic-sheen pants, inflated shoulders, bodies interpenetrate; player gloves do have fingers" },
        { "shot": "crops/high/R06-slot_C-side", "note": "angular torso crease; split-finger gloves (Claude's mitten claim struck)" },
        { "shot": "high/desktop/R14", "note": "unlit slab structures beyond the end zone" }
      ]
    },
    "lighting": {
      "score": 6.5,
      "confidence": 0.8,
      "evidence": [
        { "shot": "high/desktop/R17", "note": "fanned multi-shadows; weak pools (brighter centre, darker corners); unlit structures" },
        { "shot": "high/desktop/R01", "note": "lamp bloom, falloff to the dark perimeter, orange dusk sky band" },
        { "shot": "high/desktop/R04", "note": "field near-even in luminance" }
      ]
    },
    "animation": {
      "score": 5.5,
      "confidence": 0.8,
      "evidence": [
        { "shot": "strips/high/R13", "note": "carrier plate and body drop across frames 5-8; wrap and drive not readable" },
        { "shot": "strips/high/R09", "note": "frame 4 punch-in with one arm reaching" },
        { "shot": "crops/high/R07-slot_QB", "note": "ball cocked at the helmet; OL and DL upright, no pass-pro contact" },
        { "shot": "strips/high/R10", "note": "cloned OL squats; frames 6-8 cropped by the toast" }
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.8,
      "evidence": [
        { "shot": "high/desktop/R16", "note": "FG meter covers the holder and line" },
        { "shot": "high/desktop/R12", "note": "result toast sits on the lower edge of the pile" },
        { "shot": "high/desktop/R21", "note": "clean scorebug, toast headline/subtitle hierarchy, clear of the action" },
        { "shot": "high/desktop/R04", "note": "route art and shape badges; badges overlap defenders" },
        { "shot": "medium/landscape/R12", "note": "pile clear of the toast (Claude's occlusion claim wrong here), but the toast fades at its edges" }
      ]
    },
    "typography": {
      "score": 7.0,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/desktop/R21", "note": "condensed display headline about 28 px cap height over the subtitle; numerals read" },
        { "shot": "medium/mobile/R21", "note": "same display/sans pair scales cleanly to the phone" },
        { "shot": "high/desktop/R04", "note": "consistent scorebug type; 9 px HOME tag is the one weak spot" }
      ]
    },
    "readability": {
      "score": 6.0,
      "confidence": 0.8,
      "evidence": [
        { "shot": "high/desktop/R04", "note": "linemen about 20 px; star and 4 badges float onto the line and defenders" },
        { "shot": "medium/mobile/R21", "note": "portrait result frame drops the offense" },
        { "shot": "high/desktop/R15", "note": "carrier plate and ring read clearly" },
        { "shot": "strips/high/R10", "note": "LOS group at the frame bottom, cropped by the toast in frames 6-8" }
      ]
    },
    "mobile": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        { "shot": "medium/mobile/R04", "note": "thumb-sized HIKE; about 40% empty turf above the defense while receivers 2-3 are clipped to edge badges" },
        { "shot": "medium/mobile/R21", "note": "offense framed out of the result view" },
        { "shot": "medium/landscape/R12", "note": "pile above the toast; panel about 30% of the width. Medium phone proxy 87 fps minimum passes" }
      ]
    },
    "authenticity": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/desktop/R01", "note": "home grandstand, towers, ridge backdrop, HS scoreboard" },
        { "shot": "high/desktop/R03", "note": "school building behind the end zone; no empty bleacher (Claude wrong)" },
        { "shot": "high/desktop/R15", "note": "populated visitor stand; cone trees; mannequin bench row" },
        { "shot": "high/desktop/R14", "note": "dark slab beyond the end zone; no band, students or cheer" }
      ]
    }
  },
  "gaps": [
    {
      "id": "G-toast-occludes-play",
      "category": "ui",
      "expectedGain": 0.4,
      "severity": 3,
      "effort": "S",
      "workstream": "WS7",
      "evidence": ["high/desktop/R16", "high/desktop/R12", "strips/high/R10", "medium/landscape/R12"],
      "benchmark": "madden26-3",
      "fix": "Move the FG meter into a bar in the bottom 80 px below the kicker's feet (or top-left under the scorebug); frame the desktop result camera so the ball spot sits at or above 55% of canvas height and no player's box intersects the toast rect; give the landscape toast a solid rounded backing at most 18% of field height. Test: no player pixel under an overlay in R12, R16 and R10 frames 6-8."
    },
    {
      "id": "G-badge-detached",
      "category": "readability",
      "expectedGain": 0.4,
      "severity": 3,
      "effort": "S",
      "workstream": "WS7",
      "evidence": ["high/desktop/R04", "medium/mobile/R04"],
      "benchmark": "axis-1",
      "fix": "Cap the badge offset at one helmet height above the owner's head and draw a 1 px tether to the helmet (or put the shape in a ground ring under the receiver). Test: in R04 on every viewport, each badge's nearest player is its owner."
    },
    {
      "id": "G-contact-weight",
      "category": "animation",
      "expectedGain": 0.75,
      "severity": 4,
      "effort": "L",
      "workstream": "WS4b",
      "evidence": ["crops/high/R07-slot_QB", "strips/high/R07", "strips/high/R13", "crops/high/R12-carrier"],
      "benchmark": "cfb26-4",
      "fix": "Pass pro: pair each OL with a rusher (kick-slide, both arms into the chest plate, pads about 15 deg forward; the DL leans and shuffles, with bull/swim/rip variants). Tackles: shoulder meets the carrier's hip or torso, both arms wrap for 0.15 s before the existing recoil and drop, and the tackler's legs drive 2-3 steps. Enforce a minimum capsule separation between downed bodies."
    },
    {
      "id": "G-phone-framing",
      "category": "mobile",
      "expectedGain": 0.5,
      "severity": 3,
      "effort": "M",
      "workstream": "WS7",
      "evidence": ["medium/mobile/R21", "medium/mobile/R04", "medium/landscape/R12"],
      "benchmark": "retrobowl-1",
      "fix": "Centre the portrait result camera on the ball spot with about 8 yd of backfield visible above the toast; in portrait pre-snap put the LOS at about 45% of field-view height and trim the empty downfield turf so all five receivers fit; narrow the landscape live panel to about 200 px (keep JUKE); add a scroll cue to the portrait play-call grid."
    },
    {
      "id": "G-light-pools-and-falloff",
      "category": "lighting",
      "expectedGain": 0.4,
      "severity": 3,
      "effort": "M",
      "workstream": "WS1",
      "evidence": ["high/desktop/R17", "high/desktop/R04", "high/desktop/R14", "high/desktop/R01"],
      "benchmark": "cfb26-3",
      "fix": "Strengthen the per-tower pools to about 20% luminance variation between pool centres and the gaps; light the near faces of stands and end-zone structures, falling to dark above; drop the sky band about 1 stop and desaturate the orange; vary wet-turf roughness so the rain specular streaks rather than forming one blob."
    },
    {
      "id": "G-panel-dead-space",
      "category": "ui",
      "expectedGain": 0.2,
      "severity": 2,
      "effort": "S",
      "workstream": "WS7",
      "evidence": ["high/desktop/R05", "high/desktop/R16"],
      "benchmark": "axis-1",
      "fix": "Show the drive log (as on R14) or a down-and-distance and field-position card under the controls on defensive pre-snap and kicks, or collapse the panel to its content height."
    },
    {
      "id": "G-defense-presnap-id",
      "category": "ui",
      "expectedGain": 0.2,
      "severity": 2,
      "effort": "S",
      "workstream": "WS7",
      "evidence": ["high/desktop/R05"],
      "benchmark": "madden26-2",
      "fix": "Draw a ground ring and shape badge under the user-controlled defender and translucent zone-drop shapes on the turf pre-snap, in the same style as the offensive route art."
    },
    {
      "id": "G-player-anatomy",
      "category": "art",
      "expectedGain": 0.5,
      "severity": 4,
      "effort": "L",
      "workstream": "WS3",
      "evidence": ["crops/high/R12-carrier", "crops/high/R04-slot_QB", "crops/high/R06-slot_C-side", "crops/high/R14-carrier"],
      "benchmark": "axis-3",
      "fix": "Pants roughness about 0.85 with a weave normal map; jersey fold/wrinkle normals at the waist and armpits; more segments or smoothed normals on the shoulder pads; extra edge loops or weights at the torso bend; move officials onto the player rig with split-finger hands (player gloves already have fingers)."
    },
    {
      "id": "G-venue-life",
      "category": "authenticity",
      "expectedGain": 0.5,
      "severity": 4,
      "effort": "L",
      "workstream": "WS2",
      "evidence": ["high/desktop/R14", "high/desktop/R15", "high/desktop/R20", "crops/high/R01-crowd"],
      "benchmark": "cfb26-1",
      "fix": "Seat a uniformed band block with instrument silhouettes and a matching-shirt student section with signs at one end of the home stand; put cheerleaders and a chain crew on the track; dress the Hot Springs end zones with a lit fieldhouse or fence and banners (like the R03 building); replace the cone trees with layered tree cards."
    },
    {
      "id": "G-run-block-weight",
      "category": "animation",
      "expectedGain": 0.3,
      "severity": 3,
      "effort": "M",
      "workstream": "WS4",
      "evidence": ["strips/high/R10", "strips/high/R11", "crops/high/R06-slot_DL2-side", "high/desktop/R15"],
      "benchmark": "madden26-4",
      "fix": "Per-player stance offsets (width +/-15%, head angle, stagger) with the down hand planted on the turf; staggered run-block bases with planted feet and an outside-foot plant before cuts; bench idle variants with uneven spacing."
    },
    {
      "id": "G-qb-windup-legibility",
      "category": "animation",
      "expectedGain": 0.1,
      "severity": 1,
      "effort": "S",
      "workstream": "WS4",
      "evidence": ["high/desktop/R07", "crops/high/R07-slot_QB"],
      "benchmark": "axis-3",
      "fix": "The cocked-ball pose exists; raise the QB to about 65-70% of frame height during the drop so it reads at frame scale."
    }
  ],
  "verdict": "continue"
}
```
