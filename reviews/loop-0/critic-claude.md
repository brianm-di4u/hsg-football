# Critic A (critic-claude): loop 0, tier legacy

## Verdict

Friday Night Spa City has a good HUD shell, strong local flavour in its names and field art, and a clean painted field. The 3D content under that is a generation behind every benchmark. The players are built from separate rigid limb segments, with box feet, no hands, matte helmets and a heavy rim glow that makes them look like X-rays. Some jersey numbers are mirrored. The crowd is coloured blocks with diamond heads, and the stands and press box are black boxes. There are no cast shadows apart from soft blobs, and the rain leaves the turf completely dry. The animation has running cycles that read, but none of the key beats does: the QB stands upright with the ball on the ground next to him during the drop and wind-up, the catch strip ends with the ball still in the air, the tackle replay never shows any contact, and tackled players lie flat and pass through each other. The UI and typography are the strongest areas, but they still have large empty panels, clipped lists and four mismatched typefaces. No category reaches its gate. Next step: **continue**. The biggest wins are player models and materials (WS3), real shadows and bloom (WS1), and authored contact beats (WS4/WS4b).

## Category scores

### Art: 4.5
- **Players.** In `crops/legacy/R04-slot_QB`, `crops/legacy/R07-slot_QB` and `crops/legacy/R16-slot_K`, every player is cylinder limbs on rectangular box feet with no hands (block wrists). The helmet is a ball with an orange stripe that reads as a mohawk, and the helmet is as matte as the jersey, so the axis-3 anchor's glossy-helmet against matte-jersey contrast is missing.
- **Rim light.** A strong edge glow washes the shoulders and thighs to white-grey in `crops/legacy/R14-carrier` and `crops/legacy/R10-carrier`.
- **Number decals.**
  - Number patches show as visible rectangles: the grey box behind "57" in `crops/legacy/R04-slot_C`.
  - Front numbers are **mirrored**: "63" renders as "Ɛ9" in `crops/legacy/R06-slot_C`, and "53" is reversed in `crops/legacy/R04-slot_C`.
- **Ball.** The ball is roughly the size of a torso in `crops/legacy/R08-ball` and `crops/legacy/R12-carrier`.
- **Crowd.** In `crops/legacy/R01-crowd` it is orange, white and black blocks with diamond heads under a black roof slab. That is the 5 anchor's "crowd reads as colored blocks", seen even in a close-up.
- **Venue and turf.**
  - The stands and press box are black boxes, and the treeline is black cones (`crops/legacy/R06-slot_C`, `legacy/desktop/R15`).
  - The turf noise texture is fine at field level (`crops/legacy/R04-turf_26_67_42`).
  - The end-zone and midfield paint is good (`legacy/desktop/R14`, `legacy/desktop/R03`).
- **Against the benchmarks.** axis-3 (about a 7) has continuous bodies, pads and gloss, so this is well short of it. Next to legendbowl-1, which is a consistent 2D style, this reads as low-poly that has not been finished rather than a deliberate style. The figures sit between the 3 and 5 anchors.

### Lighting & atmosphere: 5.0
- **Shadows.** Only soft blobs: one oval per player in `legacy/desktop/R02` and `legacy/desktop/R13`. The 7 anchor's several soft shadows from the stadium lights are missing.
- **What works.**
  - The lamp heads have glow sprites (`legacy/desktop/R03`, `legacy/desktop/R20`).
  - R20 has visible haze cones.
  - The painted dusk sky is attractive.
- **Sky panorama.** It is visibly mirror-symmetric around the centre, with the same mountain and cloud shapes left and right (`legacy/desktop/R03`, `legacy/desktop/R22`).
- **Exposure and falloff.**
  - The field is lit evenly with no pools.
  - The stands fall to unlit black instead of a lit bowl (`legacy/desktop/R15`).
  - The kickoff and punt camera shows an empty, dark green-black bowl wall (`legacy/desktop/R01`, `legacy/desktop/R17`).
- **Rain.** Streaks only. The turf in `crops/legacy/R18-turf_26_67_40` looks identical to the dry `crops/legacy/R04-turf_26_67_42`: no wet sheen, specular or puddles.
- **Day.** `legacy/desktop/R19` is flat and washed out but believable.
- **Against the benchmarks.** cfb26-3 and axis-3 have real shadows, ring lighting and a lit crowd. This meets most of the 5 anchor and none of the 7 anchor's specific items.

### Animation & game feel: 4.5
- **Throw (`strips/legacy/R07`).** The legs cycle and the ball moves away to the right. No arm wind-up or release can be read in any frame. In the matching close-up `crops/legacy/R07-slot_QB`, the QB stands straight-legged with the ball **lying on the turf next to his foot**.
- **Catch (`strips/legacy/R09`).** The ball is still in flight in frame 8, so the catch beat never appears. In frames 5–8 the receiver and the defender overlap and pass through each other at the ring.
- **Run (`strips/legacy/R10`).**
  - The carrier disappears into the cluster.
  - Frames 6–8 jump to a "NO GAIN" banner with a body flat on the turf, and no visible contact or fall between them.
- **Sweep (`strips/legacy/R11`).** The cut reads only as a position change. There is no lean or plant visible.
- **Tackle replay (`strips/legacy/R13`).** Eight frames of players running in parallel lanes; no frame shows a hit.
- **Tackle result (`crops/legacy/R12-carrier`).** Rigid planks lie face down, and a limb passes through another body.
- **Touchdown (`crops/legacy/R14-carrier`).** Every player has the identical arms-up pose.
- **Feel touches.** There is a replay camera (`legacy/desktop/R13`, `legacy/desktop/R15`), but no punch-in, slow motion or particles at the key moments.
- This sits at the 5 anchor ("procedural cycles that read, but with popping, floaty contact and stiff falls") or slightly below it, because the contact beats are missing outright rather than just weak.

### UI / HUD: 5.5
- **What works.**
  - The scorebug is clean and consistent: team bars, score, timeout dots, clock and down & distance (`legacy/desktop/R04`, `legacy/desktop/R12`).
  - The pre-snap route art with numbered shape icons (`legacy/desktop/R04`, `legacy/desktop/R19`) is genuinely close to axis-1.
  - The result banners and the field-goal meter have hierarchy (`legacy/desktop/R12`, `legacy/desktop/R16`).
- **Empty panels.** About 360 px of empty sidebar holding only a SKIP button (`legacy/desktop/R01`, `legacy/desktop/R17`), or a greyed JUKE button (`legacy/desktop/R07` to `R09`). This is the 5 anchor's "empty panels".
- **Clipped and duplicated content.**
  - The play list is cut off at the bottom: item "0 Fountain Play-Action" in `legacy/desktop/R22` and `legacy/desktop/R03`.
  - The result text appears twice, in the sidebar header and in the field banner (`legacy/desktop/R12`, `legacy/desktop/R21`).
- **Occlusion and clutter.**
  - The banner covers players in `legacy/desktop/R12`.
  - The defensive diagram in `legacy/desktop/R05` is a tangle of overlapping red Xs.
  - The field-painted "1ST & 10" is occluded by players (`legacy/desktop/R06`).
- **Against the benchmarks.** It does not reach the integrated packages of madden26-1 and madden26-3.

### Typography: 5.5
- **Typefaces.** At least four, with no clear system:
  - Oswald-style condensed for headers and the scorebug.
  - A humanist sans for descriptions.
  - A wide-tracked slab/serif for the "+5 YD", "+7 YD · FIRST DOWN" and "TOUCHDOWN!" banners (`legacy/desktop/R14`, `legacy/desktop/R21`).
  - A browser-default-looking Courier mono for the "Space" key chips and the log timestamps (`legacy/desktop/R12`, `legacy/mobile/R12`).
- **Numerals.** The scorebug digits read at a glance (`legacy/desktop/R04`).
- **Scale.** Tiny 10–11 px helper text: "Stop the needle between the uprights" (`legacy/desktop/R16`), and the italic field paint "1ST & 10".
- **Clipping.** The play list in `legacy/desktop/R22`, and "TROJANS" running off the screen edge in `legacy/mobile/R22`.
- **Against the benchmarks.** madden26-3 and legendbowl-4 use one display/condensed pair throughout; this is short of that.

### Readability: 5.5
- **What works.**
  - White against black-and-orange team contrast is strong.
  - The LOS (blue) and first-down (yellow) lines are clear (`legacy/desktop/R04`, `legacy/desktop/R08`).
  - The oversized black ball is easy to find in the far view (`legacy/desktop/R08`, `legacy/mobile/R08`).
  - The "44 DELACROIX" carrier tag helps.
- **Player size.** Players are only about 30–45 px tall on desktop and smaller on mobile. Compare madden26-1, axis-1 and legendbowl-2.
- **Carrier ring offset.** The ring is drawn away from the carrier's feet. It is empty in `crops/legacy/R10-carrier` and `crops/legacy/R11-carrier`, with the carrier a body-length away.
- **Carrier tag.** In `legacy/desktop/R10` and `strips/legacy/R10` the tag floats above a pile, not above an identifiable runner.
- **Replay.** No tag or ring, so the carrier cannot be found (`strips/legacy/R13`).

### Mobile: 6.0
- **What works.**
  - The portrait layout is deliberate: a compact two-row scorebug, the field in the middle, and full-width thumb buttons for HIKE, JUKE and CONTINUE (`legacy/mobile/R04`, `legacy/mobile/R10`).
  - The play-call screen is a two-column card grid with readable names (`legacy/mobile/R22`).
  - Performance holds 165 fps minimum and a 17.9 ms worst p95 under 4× CPU throttle, so 30 fps passes.
- **Figure size.** About 35–50 device px, i.e. 18–25 CSS px (`legacy/mobile/R08`, `legacy/mobile/R18`), with about 30% of the viewport spent on empty sky and backdrop above the goalposts.
- **Banner occlusion.** The result banner hides the players in the lower third of `legacy/mobile/R12`.
- **Landscape.** No landscape capture was made, so the rubric's "landscape and portrait framing both intentional" cannot be credited.
- **Against the benchmarks.** retrobowl-1 and retrobowl-2 have far larger figures in their frame.

### Authenticity: 5.5
- **What works.**
  - Strong local voice: Bathhouse Dive, Central Avenue Sweep, Promenade, Arlington, Tufa, Gorge, plus the Ouachita mountain backdrop (`legacy/desktop/R03`, `legacy/desktop/R22`).
  - A believable high-school scoreboard (`crops/legacy/R01-board`).
  - Painted school end zones and midfield logos, and teams lined up on the sidelines (`legacy/desktop/R02`, `legacy/desktop/R14`).
  - Officials in stripes.
  - The 3A Jessieville venue is visibly smaller, with low bleachers on both sides (`legacy/desktop/R20`).
- **Missing staging.**
  - No band, cheer squad or distinct student section; the crowd is block noise (`crops/legacy/R01-crowd`).
  - No visible running track ring. Only a beige slab is visible at the left edge (`legacy/desktop/R01`, `legacy/desktop/R02`).
  - The kickoff camera shows a void instead of a home grandstand (`legacy/desktop/R17`).
- **Against the benchmarks.** The cfb26-1/2 crowd and band staging, and the legendbowl-4 presentation card, are both missing.

## Ranked gaps

1. **G-player-mesh-materials** (art, WS3, severity 5, effort L, expected gain +1.5)
   - Problem: segmented rigid limbs, box feet, no hands, matte helmet, mohawk stripe and a rim halo (`crops/legacy/R04-slot_QB`, `crops/legacy/R14-carrier`).
   - Fix: replace them with a continuous skinned body of about 6–10k triangles, with gloves, cleats, a pad silhouette and a real facemask. Move to `MeshStandardMaterial`/`MeshPhysicalMaterial` with clearcoat on the helmet, and give the jersey a normal and roughness map. Clamp the fresnel rim term.
2. **G-cast-shadows-bloom** (lighting, WS1, severity 5, effort M, expected gain +1.5)
   - Problem: only blob shadows, an evenly lit field, and black stands (`legacy/desktop/R02`, `legacy/desktop/R15`).
   - Fix: shadow maps from two to four tower lights, either one cascaded light plus cheap secondary contact shadows, or several low-resolution maps. Add an UnrealBloom pass on the lamp heads and light pools on the turf, and light the stands with a falloff.
3. **G-contact-beats** (animation, WS4/WS4b, severity 5, effort L, expected gain +1.5)
   - Problem: no throw wind-up, the ball on the ground at the QB's feet, a catch that never lands in the strip, tackles with no contact, and flat planks that pass through each other (`strips/legacy/R07`, `crops/legacy/R07-slot_QB`, `strips/legacy/R09`, `strips/legacy/R13`, `crops/legacy/R12-carrier`).
   - Fix: parent the ball to the hand bone, add keyed throw and catch poses, and align contact with a wrap-up pose. Make falls physics-blended with collision against the turf and other bodies, and vary the celebrations.
4. **G-crowd-and-venue** (art and authenticity, WS2, severity 4, effort M, expected gain +0.5 art, +0.5 authenticity)
   - Problem: block-and-diamond crowd, black-box stands, cone trees, an empty kickoff bowl (`crops/legacy/R01-crowd`, `legacy/desktop/R17`).
   - Fix: low-poly or impostor people with skin, shirt and pose variety; a student section and a band block in uniform colours; bleacher geometry and railings; a lit press box.
5. **G-hs-staging** (authenticity, WS2, severity 3, effort M, expected gain +0.75)
   - Fix: add a track ring around the field, a chain crew, cheerleaders on the track and a band in the stands. Make sure the kickoff camera frames the home grandstand (`legacy/desktop/R01`, `legacy/desktop/R02`).
6. **G-camera-framing** (readability and mobile, WS7, severity 4, effort M, expected gain +0.5 readability, +0.75 mobile)
   - Problem: players are 30–45 px tall, and the mobile frame wastes about 30% on sky (`legacy/mobile/R08`, `legacy/desktop/R10`).
   - Fix: tighten and lower the live-play camera. On mobile portrait, raise the horizon line, follow the ball more closely, and capture and design a landscape layout.
7. **G-ui-panel-hygiene** (ui, WS7, severity 3, effort M, expected gain +1.0)
   - Problem: empty sidebars, the clipped play list, the duplicated result text, the banner covering action, the cluttered defensive diagram (`legacy/desktop/R01`, `legacy/desktop/R07`, `legacy/desktop/R22`, `legacy/desktop/R12`, `legacy/desktop/R05`).
   - Fix: collapse or fill the sidebar during live play (drive summary, mini-map), fit or scroll the play list visibly, show the result in one place, place the banner clear of the pile, and simplify the defence art.
8. **G-type-system** (typography, WS7, severity 3, effort S, expected gain +1.0)
   - Fix: pick one condensed display face plus one text face. Drop the default Courier for the key chips and timestamps (use tabular numerals in the text face), restyle the slab banners in the display face, and set a minimum size of 12–13 px (`legacy/desktop/R14`, `legacy/desktop/R12`, `legacy/desktop/R16`).
9. **G-rain-wet-turf** (lighting, WS5, severity 3, effort M, expected gain +0.5)
   - Problem: rain leaves the turf dry (`crops/legacy/R18-turf_26_67_40` against `crops/legacy/R04-turf_26_67_42`, `legacy/desktop/R18`).
   - Fix: lower turf roughness and add specular streaks from the lamps, splash particles and darker jerseys.
10. **G-sky-mirror** (lighting, WS1, severity 2, effort S, expected gain +0.25)
    - Problem: the mirror-symmetric panorama (`legacy/desktop/R03`, `legacy/desktop/R22`).
    - Fix: use a non-tiled 360° painting or offset and blend the seam.
11. **G-carrier-marker** (readability, WS7, severity 3, effort S, expected gain +0.5)
    - Problem: the ring sits offset from the carrier, and the replay has no tag (`crops/legacy/R10-carrier`, `crops/legacy/R11-carrier`, `strips/legacy/R13`).
    - Fix: anchor the ring at the carrier's root, and keep the tag and ring in replays.
12. **G-ball-scale** (art and readability, WS3, severity 3, effort S, expected gain +0.25)
    - Problem: the ball is torso-sized in close-ups (`crops/legacy/R08-ball`, `crops/legacy/R12-carrier`).
    - Fix: scale the ball by camera distance, real size in close and replay cameras, and add a trail or outline at distance instead.
13. **G-mirrored-numbers** (art, WS3, severity 3, effort S, expected gain +0.25)
    - Problem: mirrored front numbers and visible patch boxes (`crops/legacy/R06-slot_C`, `crops/legacy/R04-slot_C`).
    - Fix: correct the chest-decal UV winding, and bake the numbers into the jersey texture instead of using a patch quad.

```json
{"loop":0,"role":"critic-claude","tier":"legacy","scores":{"art":{"score":4.5,"confidence":0.8,"evidence":[{"shot":"crops/legacy/R04-slot_QB","note":"segmented cylinder limbs, box feet, no hands, matte helmet with mohawk-like stripe"},{"shot":"crops/legacy/R14-carrier","note":"heavy rim/fresnel halo washes bodies; identical rigid figures"},{"shot":"crops/legacy/R06-slot_C","note":"front number 63 rendered mirrored; decal patch boxes"},{"shot":"crops/legacy/R01-crowd","note":"crowd is colored blocks with diamond heads under a black slab"},{"shot":"crops/legacy/R08-ball","note":"ball roughly torso-sized in close-up"},{"shot":"crops/legacy/R04-turf_26_67_42","note":"turf texture acceptable at field level"}]},"lighting":{"score":5.0,"confidence":0.75,"evidence":[{"shot":"legacy/desktop/R02","note":"blob shadows only, evenly lit field, no light pools"},{"shot":"legacy/desktop/R03","note":"lamp glow sprites and nice dusk sky, but panorama visibly mirror-symmetric"},{"shot":"crops/legacy/R18-turf_26_67_40","note":"rain turf identical to dry turf; no wet sheen"},{"shot":"legacy/desktop/R17","note":"kickoff/punt camera shows dark empty bowl; stands unlit"},{"shot":"legacy/desktop/R20","note":"haze cones present; best night frame"}]},"animation":{"score":4.5,"confidence":0.75,"evidence":[{"shot":"strips/legacy/R07","note":"no readable wind-up or release; ball just moves away"},{"shot":"crops/legacy/R07-slot_QB","note":"QB upright with ball lying on turf beside foot during drop/wind-up"},{"shot":"strips/legacy/R09","note":"ball still in flight at frame 8; receiver and defender interpenetrate; no catch beat"},{"shot":"strips/legacy/R13","note":"tackle replay shows no contact in any frame"},{"shot":"strips/legacy/R10","note":"run cycles read, then a cut straight to a body flat on turf with no fall"},{"shot":"crops/legacy/R12-carrier","note":"plank-stiff falls with limb interpenetration"}]},"ui":{"score":5.5,"confidence":0.7,"evidence":[{"shot":"legacy/desktop/R04","note":"clean scorebug and numbered route art close to axis-1"},{"shot":"legacy/desktop/R01","note":"sidebar nearly empty apart from a SKIP button"},{"shot":"legacy/desktop/R22","note":"play list clipped at bottom"},{"shot":"legacy/desktop/R12","note":"result shown twice; banner overlaps players"},{"shot":"legacy/desktop/R05","note":"defensive diagram is a tangle of overlapping Xs"}]},"typography":{"score":5.5,"confidence":0.65,"evidence":[{"shot":"legacy/desktop/R14","note":"slab-serif banner face mismatched with condensed HUD face"},{"shot":"legacy/desktop/R12","note":"default-looking Courier mono for key chips and log timestamps; four faces total"},{"shot":"legacy/desktop/R16","note":"tiny helper text under the kick meter"},{"shot":"legacy/mobile/R22","note":"TROJANS banner runs off the edge; card names readable"}]},"readability":{"score":5.5,"confidence":0.7,"evidence":[{"shot":"legacy/desktop/R08","note":"ball, LOS and first-down lines clear; players small"},{"shot":"crops/legacy/R10-carrier","note":"carrier ring empty and offset from the runner"},{"shot":"legacy/desktop/R10","note":"carrier tag floats over a pile; runner hard to isolate"},{"shot":"strips/legacy/R13","note":"replay has no tag or ring; carrier unfindable"},{"shot":"legacy/mobile/R08","note":"figures about 20 CSS px tall"}]},"mobile":{"score":6.0,"confidence":0.6,"evidence":[{"shot":"legacy/mobile/R04","note":"intentional portrait layout, large HIKE / CHANGE PLAY thumb targets"},{"shot":"legacy/mobile/R18","note":"figures small; about 30% of viewport is sky/backdrop"},{"shot":"legacy/mobile/R12","note":"result banner covers the players in the lower third"},{"shot":"legacy/mobile/R22","note":"two-column play cards readable; perf 165 fps min at 4x throttle; no landscape capture"}]},"authenticity":{"score":5.5,"confidence":0.65,"evidence":[{"shot":"legacy/desktop/R03","note":"Hot Springs play names, Ouachita backdrop, painted end zone"},{"shot":"crops/legacy/R01-board","note":"believable high-school scoreboard"},{"shot":"legacy/desktop/R20","note":"smaller 3A venue with low bleachers"},{"shot":"crops/legacy/R01-crowd","note":"no band, cheer or student section; block crowd"},{"shot":"legacy/desktop/R17","note":"no track ring or grandstand in the kickoff framing"}]}},"gaps":[{"id":"G-player-mesh-materials","category":"art","expectedGain":1.5,"severity":5,"effort":"L","workstream":"WS3","evidence":["crops/legacy/R04-slot_QB","crops/legacy/R14-carrier","crops/legacy/R16-slot_K"],"benchmark":"axis-3","fix":"Continuous skinned body (~6-10k tris) with gloves, cleats, pad silhouette and real facemask; MeshStandard/Physical materials with clearcoat helmet and normal/roughness-mapped jersey; clamp the fresnel rim term."},{"id":"G-cast-shadows-bloom","category":"lighting","expectedGain":1.5,"severity":5,"effort":"M","workstream":"WS1","evidence":["legacy/desktop/R02","legacy/desktop/R15","legacy/desktop/R17"],"benchmark":"cfb26-3","fix":"Shadow maps from 2-4 tower lights (cascaded key plus cheap secondaries), UnrealBloom on lamp heads, turf light pools, and lit stands with field-to-stand falloff."},{"id":"G-contact-beats","category":"animation","expectedGain":1.5,"severity":5,"effort":"L","workstream":"WS4b","evidence":["strips/legacy/R07","crops/legacy/R07-slot_QB","strips/legacy/R09","strips/legacy/R13","crops/legacy/R12-carrier"],"benchmark":"madden26-4","fix":"Parent ball to hand bone; keyed throw wind-up/release and catch reach; aligned wrap-up tackle contact; physics-blended falls with body/turf collision; varied celebrations."},{"id":"G-crowd-and-venue","category":"art","expectedGain":1.0,"severity":4,"effort":"M","workstream":"WS2","evidence":["crops/legacy/R01-crowd","legacy/desktop/R17","legacy/desktop/R15"],"benchmark":"cfb26-1","fix":"Replace block crowd with low-poly/impostor people with color and pose variety; bleacher geometry and railings; lit press box; real trees instead of black cones."},{"id":"G-hs-staging","category":"authenticity","expectedGain":0.75,"severity":3,"effort":"M","workstream":"WS2","evidence":["legacy/desktop/R01","legacy/desktop/R02","crops/legacy/R01-crowd"],"benchmark":"cfb26-2","fix":"Add track ring, chain crew, cheerleaders on the track, band block and uniform-color student section; frame the home grandstand in the kickoff camera."},{"id":"G-camera-framing","category":"mobile","expectedGain":0.75,"severity":4,"effort":"M","workstream":"WS7","evidence":["legacy/mobile/R08","legacy/mobile/R18","legacy/desktop/R10"],"benchmark":"retrobowl-1","fix":"Tighter, lower live-play camera; on portrait raise the horizon and follow the ball closer to roughly double figure height; design and capture a landscape layout."},{"id":"G-ui-panel-hygiene","category":"ui","expectedGain":1.0,"severity":3,"effort":"M","workstream":"WS7","evidence":["legacy/desktop/R01","legacy/desktop/R07","legacy/desktop/R22","legacy/desktop/R12","legacy/desktop/R05"],"benchmark":"madden26-1","fix":"Collapse or fill the sidebar during live play; make the play list fit or scroll visibly; show the result once; keep banners clear of the pile; simplify the defense diagram."},{"id":"G-type-system","category":"typography","expectedGain":1.0,"severity":3,"effort":"S","workstream":"WS7","evidence":["legacy/desktop/R14","legacy/desktop/R12","legacy/desktop/R16"],"benchmark":"madden26-3","fix":"One condensed display face plus one text face; drop Courier (use tabular numerals); restyle slab banners in the display face; 12-13 px minimum."},{"id":"G-rain-wet-turf","category":"lighting","expectedGain":0.5,"severity":3,"effort":"M","workstream":"WS5","evidence":["crops/legacy/R18-turf_26_67_40","legacy/desktop/R18"],"benchmark":"cfb26-4","fix":"In rain lower turf roughness and add lamp specular streaks, splash particles and darkened jerseys."},{"id":"G-carrier-marker","category":"readability","expectedGain":0.5,"severity":3,"effort":"S","workstream":"WS7","evidence":["crops/legacy/R10-carrier","crops/legacy/R11-carrier","strips/legacy/R13"],"benchmark":"legendbowl-2","fix":"Anchor the carrier ring at the carrier's root position and keep the tag and ring in replays."},{"id":"G-sky-mirror","category":"lighting","expectedGain":0.25,"severity":2,"effort":"S","workstream":"WS1","evidence":["legacy/desktop/R03","legacy/desktop/R22"],"benchmark":"cfb26-3","fix":"Use a non-mirrored 360-degree sky painting, or offset and blend the seam."},{"id":"G-ball-scale","category":"readability","expectedGain":0.25,"severity":3,"effort":"S","workstream":"WS3","evidence":["crops/legacy/R08-ball","crops/legacy/R12-carrier"],"benchmark":"madden26-4","fix":"Scale the ball by camera distance (real size in close/replay cameras) and add a trail or outline at distance."},{"id":"G-mirrored-numbers","category":"art","expectedGain":0.25,"severity":3,"effort":"S","workstream":"WS3","evidence":["crops/legacy/R06-slot_C","crops/legacy/R04-slot_C"],"benchmark":"axis-3","fix":"Fix chest-decal UV winding and bake numbers into the jersey texture instead of a patch quad."}],"verdict":"continue"}
```
