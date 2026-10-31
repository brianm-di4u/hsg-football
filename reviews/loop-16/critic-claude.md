# Critic A (critic-claude): loop 16, High tier, desktop

## Verdict
Friday Night Spa City is a consistent, stylized night game with solid basics. Helmets are glossy and jerseys matte, players cast several stadium shadows, the lamps bloom, the pre-snap receiver tags are clear, the result toasts are clean and the venue and team identity are real Spa City. Its ceiling is still set by three things. First, the figures fall apart in close-ups: hands are mittens, officials have no faces, and crouched pants deform into blobs. Second, the space around the field is an empty olive-grey wall that takes up a third or more of every desktop frame. Third, the game feel is thin: no punch-ins, particles or slow motion at contact or catch. This loop's changes show on screen: the desktop run framing is better, the portrait pre-snap is tighter, and the field blitz arrows now fan out. But the matching blitz diagram in the side panel still shows the old knot of X's all converging on the QB. Nothing here reaches a 9-level benchmark, and art, lighting, animation, UI, readability and mobile all stay under their gate of 7. Verdict: **continue**.

## Scores

### Art: 6.0
- `crops/high/R04-slot_C` and `crops/high/R06-slot_C`: the helmet/jersey material contrast works. Helmets show a specular hotspot, stripe and decal, and facemasks are real bars. Jersey numbers are outlined, and sleeve, pant and sock stripes are present. That clears the 5 anchor.
- The same crops fail the 7 anchor ("holds up in close-ups"):
  - Crouched linemen's pants turn into lumpy orange "diaper" bulges: #69 in `crops/high/R04-slot_C`; #66 and #73 in `crops/high/R06-slot_C`.
  - Hands are fingerless mitts in the sleeve colour (the #55 hands in `crops/high/R06-slot_C-side`).
  - Officials have no faces: the bald dark heads in `crops/high/R04-slot_C` and `crops/high/R12-carrier`.
  - Cloth has no folds or texture anywhere.
- `crops/high/R01-crowd`: the crowd reads as people, with raised arms and varied shirts. That is good for this style.
- `crops/high/R01-board`: the scoreboard is the best asset, with unlit ghost segments on the 7-segment digits.
- `crops/high/R16-slot_K` and `crops/high/R04-turf_26_67_42`: the turf has grain at field level.
- The venue is sparse. In `high/desktop/R04`, `R10` and `R17` a featureless curved grey wall surrounds the field. The `strips/high/R13` replay shows a blank wall under the stand.
- Benchmarks: well short of axis-3 (faces, cloth, a dressed stadium). Below legendbowl-1's style-consistent 7, because the close-up defects break the style.

### Lighting & atmosphere: 6.5
- What works:
  - `high/desktop/R17` and `crops/high/R08-ball`: each player casts several soft shadows fanning from the light towers.
  - `high/desktop/R01`, `R20`, `R21`: the lamp heads bloom.
  - `high/desktop/R17` and `R01`: there is a pool of light on the field with falloff toward the stands.
  - `crops/high/R14-carrier`: helmets carry specular highlights.
  - `crops/high/R18-turf_26_67_40`: rain gives a wet sheen patch and splash dots at the players' feet.
  - `high/desktop/R19`: the mist reads as day fog.
- What holds it under 7:
  - The surround is a muddy olive/grey plane with no light structure. In `high/desktop/R04` and `R10`, the band from y≈230 to 360 is a flat wall.
  - `high/desktop/R05`: a large flat white glare smear washes out the left sideline (zoomed from x 0–320, y 330–650). It reads as a bug, not as volumetric light.
  - `crops/high/R06-slot_C-side`: the facemask on the right edge blows out to a white glow.
- Benchmarks: approaching axis-3; nowhere near cfb26-3's ring lighting and grade.

### Animation & game feel: 6.0
- `strips/high/R09`: the catch beat is legible. The receiver reaches up with both arms (frames 6–8) and the defender goes to the turf in frame 8. The camera tightens between frames 3 and 4.
- `crops/high/R07-slot_QB`: the wind-up is clear, with the ball cocked behind the helmet and the front shoulder closed.
- `strips/high/R11`: the sweep carrier leans forward and strides as he turns upfield (frames 1–5).
- `strips/high/R10` frames 6–8: the dive is stopped in a scrum. A white defender wraps and the bodies tilt.
- `strips/high/R13` frames 6–8: bodies go horizontal into a pile.
- But:
  - `crops/high/R12-carrier`: the pile on the ground interpenetrates. A white leg passes through the blue player and there is no clear layering.
  - Contact has no feel touches: no punch-in, slow motion or turf particles at the R10 tackle (`strips/high/R10` frames 5–8 keep the same wide camera) or at the catch.
  - The run strips show uniform procedural strides. The carrier crops (`crops/high/R10-carrier`, `crops/high/R13-carrier`) look stiff, with no secondary motion.
- Benchmarks: in the 5–7 band, far below cfb26-4 and madden26-4.

### UI / HUD: 6.5
- Strengths:
  - `high/desktop/R04`: the pre-snap route art carries shaped, numbered receiver tags (◇1, ○2, △3, □4, ☆5). This is comparable to axis-1.
  - `high/desktop/R21` and `R12`: the result toasts have hierarchy ("+7 YD · FIRST DOWN" over "M. DELACROIX RUN").
  - `high/desktop/R16`: the kick panel is de-duplicated, with "YOUR KICK" beside the button and distance and instruction only on the meter.
  - `high/desktop/R14`: "NEXT: THE TRY" correctly avoids repeating TOUCHDOWN.
  - `high/desktop/R22`: the play-call list is well organized.
- Problems:
  - (1) Stale diagram. On the field in `high/desktop/R05`, the blitz arrows now fan into gaps. The side-panel diagram in the same frame (and in `medium/desktop/R05`) still draws every rusher's X and line converging in a knot on the QB.
  - (2) Toasts overlap players. In `high/desktop/R12` the toast covers a Lakeside player and the umpire. In `high/desktop/R14` it cuts across players at the bottom.
  - (3) The sidebar width jumps between states. The 3D field is 1030 px wide in `R08`, `R10`, `R17` and `R18`, but 920 px in `R04`, `R05`, `R21` and `R22`.
  - (4) The scorebug is a plain flat bar, not a broadcast package. The `R17` punt panel is mostly empty.
- Benchmarks: below the polish of madden26-1 and madden26-3.

### Typography: 7.0
- `high/desktop/R22` and `high/desktop/R21`: the condensed display face (Oswald-style) is used consistently for titles, buttons, scores and toasts, over a plain sans for descriptions and the log. The scale is clear (toast > panel title > play name > description).
- Scorebug numerals read at a glance, and nothing is clipped.
- `medium/mobile/R22`: the play cards keep the same pair at a larger scale.
- Weak points:
  - The "HOME" tag in the scorebug is about 9 px.
  - Log text is low-contrast grey.
  - The on-field "1ST & 10" uses a different italic slab face (`high/desktop/R04`).
- Benchmarks: approaches madden26-3 and legendbowl-4 for discipline, not flair.

### Readability: 6.5
- What reads:
  - `high/desktop/R08`: the ball reads, with a trail, and the target has a "2" tag plus a cyan ring.
  - `high/desktop/R10` and `R18`: the carrier has a ground disc and a "44 DELACROIX" plate.
  - The LOS is blue and the line to gain yellow.
  - Black against white jerseys separates the teams.
- What doesn't:
  - Desktop pre-snap `high/desktop/R04`: the formation sits between y≈545 and 650 of 800, and the field only begins at about y=365. That leaves roughly 40% of the 3D view as backdrop. QB #12 measures about 44 px tall (zoomed crop), and jersey numbers can't be read at native size.
  - `high/desktop/R05`: the rush arrows are about 20–30 px and partly hidden by the umpire standing in the defense.
  - `high/desktop/R10` and `R18`: a near-camera official at the bottom edge takes the eye.
  - Black Hot Springs jerseys lose their edges against the dark-green shadowed turf (`medium/mobile/R04` zoom).
- Benchmarks: below axis-1 and madden26-1 for player size, at about legendbowl-2 for marker clarity.

### Mobile: 6.5
- Phone tier is Medium. Performance passes easily: medium · mobile holds a 488 fps minimum and a 2.5 ms p95 at 4× throttle.
- Portrait:
  - `medium/mobile/R04`: the tighter framing is intentional.
  - The HIKE and CHANGE PLAY buttons and the full-width JUKE button (`medium/mobile/R10`) are thumb-sized.
  - `medium/mobile/R22`: the two-column play cards are large.
- Landscape: `medium/landscape/R04` and `medium/landscape/R10` show the full formation with routes plus a usable side panel.
- Problems:
  - Portrait figures are still small. Linemen in `medium/mobile/R04` are about 45 px tall at 2× (about 22 CSS px) and run-play figures in `medium/mobile/R10` about 27 CSS px, so numbers are unreadable.
  - In `medium/mobile/R04`, receivers 1–3 sit clipped at the screen edges, with their routes running off-screen.
  - `medium/mobile/R12` and `R21`: the toast, next-panel and log stack takes about 35% of the screen.
  - `medium/mobile/R22`: only 6 of 10 plays fit without scrolling.
- Benchmarks: below retrobowl-1 and retrobowl-2 for figure size.

### Authenticity: 6.5
- Real local identity:
  - Joe C. Reese / Hot Springs in black and gold.
  - Lake Hamilton (`high/desktop/R01`), Lakeside in blue and gold, Jessieville in purple at its piney 3A home field (`high/desktop/R20`).
  - Spa City play names (Bathhouse Dive, Central Avenue Sweep, Tufa Screen in `high/desktop/R22`).
  - An HSHS/LHHS segment scoreboard (`crops/high/R01-board`).
  - Ouachita ridgelines, NFHS-width hashes, an H goalpost (`high/desktop/R14`), end-zone wordmarks, and sideline team boxes.
- Missing: there is no band, cheer squad or distinct student section anywhere in the captures. The home stand is one block of seating (`crops/high/R01-crowd`), and the visitor side and end zones are bare walls (`high/desktop/R04`, `strips/high/R13`).
- Benchmarks: well below cfb26-1/2 staging, though better than generic.

## Ranked gaps
1. **G-close-up-figure-defects** (art, WS3, severity 4, effort M, +0.5). Fix the crouch pants deformation with a better hip/pant skin weight or corrective shape. Give hands a glove mesh with a finger break and a glove material distinct from the sleeve. Give officials a basic face, using the same normal or albedo trick as the players' faces under the facemask. Evidence: `crops/high/R04-slot_C`, `crops/high/R06-slot_C`, `crops/high/R06-slot_C-side`, `crops/high/R12-carrier`. Benchmark: axis-3.
2. **G-empty-surround** (lighting, WS1/WS2, severity 4, effort M, +0.5, also helps authenticity). Replace the flat olive wall with built objects: a chain-link fence and track edge, visitor bleachers with crowd, end-zone signage and a light gradient from field to stands. Evidence: `high/desktop/R04`, `high/desktop/R10`, `strips/high/R13`. Benchmark: axis-3, cfb26-3.
3. **G-contact-feel** (animation, WS4, severity 4, effort M, +0.5). Add a 0.3–0.5 s camera punch-in or slow motion at tackle contact and on the catch, turf and pellet kick particles at contact, and body-separation layering in piles. Evidence: `strips/high/R10`, `strips/high/R09`, `crops/high/R12-carrier`. Benchmark: cfb26-4.
4. **G-presnap-backdrop-share** (readability, WS7, severity 3, effort S, +0.5). The desktop pre-snap still spends about 40% of the view on backdrop. Narrow the FOV or pull in on the formation so players reach about 60–70 px, and drop the horizon above y≈200. Evidence: `high/desktop/R04`, `high/desktop/R05`. Benchmark: axis-1, madden26-1.
5. **G-blitz-panel-knot** (ui, WS7, severity 3, effort S, +0.25). Generate the side-panel defense diagram from the same gap-fanned arrows as the field, and spread the X's apart. Evidence: `high/desktop/R05`, `medium/desktop/R05`. Benchmark: madden26-2.
6. **G-mobile-figure-size** (mobile, WS7, severity 3, effort M, +0.5). In portrait, scale the players up on phones (about 1.2×) or zoom the camera in on the run and pre-snap shots. Show off-screen receivers as edge chevrons with route stubs instead of clipped tags. Evidence: `medium/mobile/R04`, `medium/mobile/R10`. Benchmark: retrobowl-1.
7. **G-toast-occlusion** (ui, WS7, severity 2, effort S, +0.25). Anchor result toasts in the top band or the sidebar, or shift the camera aim so they don't cover the players. Evidence: `high/desktop/R12`, `high/desktop/R14`. Benchmark: madden26-3.
8. **G-sidebar-width-jump** (ui, WS7, severity 2, effort S, +0.25). Use one sidebar width so the 3D view doesn't resize between play phases (1030 px vs 920 px). Evidence: `high/desktop/R10`, `high/desktop/R04`.
9. **G-glare-and-blowout** (lighting, WS1, severity 2, effort S, +0.25). Clamp the light-volume or haze sprite on the left sideline and the facemask specular. Evidence: `high/desktop/R05`, `crops/high/R06-slot_C-side`.
10. **G-gameday-staging** (authenticity, WS2, severity 3, effort L, +0.5). Add a band block, cheer line and student section to the home stand and fill the visitor stand. Evidence: `crops/high/R01-crowd`, `high/desktop/R04`. Benchmark: cfb26-1, cfb26-2.

```json
{
  "loop": 16,
  "role": "critic-claude",
  "tier": "high",
  "scores": {
    "art": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "crops/high/R04-slot_C", "note": "glossy helmets vs matte jerseys, but center #69 pants deform into lumpy blobs; faceless referee"},
        {"shot": "crops/high/R06-slot_C-side", "note": "mitten hands in sleeve colour, no cloth detail"},
        {"shot": "crops/high/R01-crowd", "note": "crowd reads as people"},
        {"shot": "high/desktop/R04", "note": "featureless curved grey wall around the field"}
      ]
    },
    "lighting": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R17", "note": "several soft shadows per player, light pool on field"},
        {"shot": "high/desktop/R01", "note": "lamp bloom, falloff to stands"},
        {"shot": "crops/high/R18-turf_26_67_40", "note": "wet sheen and splashes in rain"},
        {"shot": "high/desktop/R05", "note": "flat white glare smear on left sideline; muddy olive surround"}
      ]
    },
    "animation": {
      "score": 6.0,
      "confidence": 0.6,
      "evidence": [
        {"shot": "strips/high/R09", "note": "two-arm reach catch, defender falls; legible"},
        {"shot": "strips/high/R10", "note": "tackle in scrum with no punch-in, slow-mo or particles"},
        {"shot": "strips/high/R13", "note": "bodies go to ground in a pile"},
        {"shot": "crops/high/R12-carrier", "note": "pile limbs interpenetrate"},
        {"shot": "crops/high/R07-slot_QB", "note": "clear wind-up pose"}
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R04", "note": "shaped numbered receiver tags and route art"},
        {"shot": "high/desktop/R05", "note": "side-panel blitz diagram still a converging knot while field arrows fan"},
        {"shot": "high/desktop/R12", "note": "result toast covers a player and the umpire"},
        {"shot": "high/desktop/R16", "note": "de-duplicated kick panel and clean meter"}
      ]
    },
    "typography": {
      "score": 7.0,
      "confidence": 0.6,
      "evidence": [
        {"shot": "high/desktop/R22", "note": "consistent condensed display plus sans body, clear scale"},
        {"shot": "high/desktop/R21", "note": "toast hierarchy, numerals read at a glance"},
        {"shot": "medium/mobile/R22", "note": "same pair scales up on phone"}
      ]
    },
    "readability": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R08", "note": "ball trail and target ring read"},
        {"shot": "high/desktop/R10", "note": "carrier plate and disc read; near-camera official at bottom edge"},
        {"shot": "high/desktop/R04", "note": "about 40% of 3D view is backdrop; QB about 44 px tall"},
        {"shot": "medium/mobile/R04", "note": "small figures, receivers clipped at edges"}
      ]
    },
    "mobile": {
      "score": 6.5,
      "confidence": 0.65,
      "evidence": [
        {"shot": "medium/mobile/R04", "note": "intentional tight portrait framing, big HIKE buttons; figures about 22 CSS px"},
        {"shot": "medium/mobile/R10", "note": "full-width JUKE button; run figures about 27 CSS px"},
        {"shot": "medium/landscape/R04", "note": "landscape shows full formation and routes"},
        {"shot": "medium/mobile/R22", "note": "large two-column play cards; 6 of 10 visible"}
      ]
    },
    "authenticity": {
      "score": 6.5,
      "confidence": 0.65,
      "evidence": [
        {"shot": "high/desktop/R20", "note": "Jessieville purple, pines, small 3A field"},
        {"shot": "crops/high/R01-board", "note": "HSHS/LHHS segment scoreboard"},
        {"shot": "high/desktop/R22", "note": "Spa City play names"},
        {"shot": "crops/high/R01-crowd", "note": "single home stand block, no band or student section"}
      ]
    }
  },
  "gaps": [
    {"id": "G-close-up-figure-defects", "category": "art", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS3", "evidence": ["crops/high/R04-slot_C", "crops/high/R06-slot_C", "crops/high/R06-slot_C-side", "crops/high/R12-carrier"], "benchmark": "axis-3", "fix": "Fix crouch pant deformation (hip weights or corrective shape), add glove meshes with finger break and a distinct glove material, and give officials faces."},
    {"id": "G-empty-surround", "category": "lighting", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["high/desktop/R04", "high/desktop/R10", "strips/high/R13"], "benchmark": "cfb26-3", "fix": "Replace the flat olive wall with fence, track edge, visitor stands, end-zone signage and a lit gradient from field to stands."},
    {"id": "G-contact-feel", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS4", "evidence": ["strips/high/R10", "strips/high/R09", "crops/high/R12-carrier"], "benchmark": "cfb26-4", "fix": "Add a camera punch-in or brief slow motion at tackle and catch, turf particles on contact, and layered body separation in piles."},
    {"id": "G-presnap-backdrop-share", "category": "readability", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R04", "high/desktop/R05"], "benchmark": "axis-1", "fix": "Tighten FOV or distance on the desktop pre-snap so players are 60-70 px and backdrop is under 25% of the 3D view."},
    {"id": "G-blitz-panel-knot", "category": "ui", "expectedGain": 0.25, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R05", "medium/desktop/R05"], "benchmark": "madden26-2", "fix": "Draw the side-panel defense diagram from the same gap-fanned rush arrows as the field and space out the X's."},
    {"id": "G-mobile-figure-size", "category": "mobile", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["medium/mobile/R04", "medium/mobile/R10"], "benchmark": "retrobowl-1", "fix": "Scale players about 1.2x on phones or zoom portrait cameras in; replace clipped receiver tags with edge chevrons and route stubs."},
    {"id": "G-toast-occlusion", "category": "ui", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R12", "high/desktop/R14"], "benchmark": "madden26-3", "fix": "Anchor result toasts in the top band or the sidebar, or offset the camera so toasts do not cover players."},
    {"id": "G-sidebar-width-jump", "category": "ui", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R10", "high/desktop/R04"], "fix": "Use one sidebar width across play phases so the 3D view does not resize (1030 px vs 920 px)."},
    {"id": "G-glare-and-blowout", "category": "lighting", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS1", "evidence": ["high/desktop/R05", "crops/high/R06-slot_C-side"], "fix": "Clamp the haze or light-volume sprite over the left sideline and the facemask specular blowout."},
    {"id": "G-gameday-staging", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS2", "evidence": ["crops/high/R01-crowd", "high/desktop/R04"], "benchmark": "cfb26-1", "fix": "Add a band block, cheer line and student section to the home stand and populate the visitor stand."}
  ],
  "verdict": "continue"
}
```
