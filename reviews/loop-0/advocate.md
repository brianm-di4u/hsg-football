# Advocate review: loop 0, tier legacy

## Summary

Both critics are mostly right about this build. The players are rigid and faceted, there are no real cast shadows, the key contact beats are missing, the crowd is made of blocks, and the camera is too wide. I checked every disputed claim against the captures, and most of them hold up. The critics do get some things wrong, though. Several claims blame the wrong cause, a few things they call missing are actually on screen, and three scores sit below the anchor text when you compare them with the evidence:

- **Art.** Codex's 3.5 places the figures near the 3 anchor ("boxes for people"), which they are not.
- **Lighting.** The 5 anchor is fully met.
- **Authenticity.** Both critics missed several high-school-specific details that are clearly visible.

The critics also overlap heavily in their gaps (the player mesh, shadows, contact, framing and staging each appear twice). I have lowered the expected gain on the duplicates so the judge does not add the same fix together twice. No category reaches its gate after my corrections, so the verdict is still **continue**.

Paths below are relative to `screenshots/review-loop-0/`.

## Facts the critics got plainly wrong

**Critic A (critic-claude)**
1. **"TROJANS running off the screen edge in `legacy/mobile/R22`" is filed under typography clipping.** It is painted end-zone lettering in the 3D world, seen in perspective, not UI text. Desktop `legacy/desktop/R14` shows the same thing with "HOT SPRINGS". The cause is wrong.
2. **"`strips/legacy/R13`: eight frames of players running in parallel lanes."** Every frame shows players converging into a cluster right of centre. `crops/legacy/R13-carrier` shows a white defender pressed body-to-body against #20, who has the ball tucked. Contact does happen. It is upright, with no wrap and no fall, which is the real defect.
3. **"Stands and press box are black boxes."** `crops/legacy/R03-slot_QB` and `legacy/desktop/R03` show the Wolf Stadium press box and fieldhouse with lit windows and a gold trim band. The far stands in R01, R15 and R17 really are dark.
4. **"The field is lit evenly with no pools."** In `legacy/desktop/R02`, I measured turf brightness at about 95–99 (grey level) across the midfield band and about 63–66 in the near 10–20 band. That is the baked light pool. It is faint, but it is there.
5. **"The tag floats above a pile, not above an identifiable runner" (`legacy/desktop/R10`).** Zoomed in, #44 is standing inside the ring with the "44 DELACROIX" plate directly above him. The ring offset Claude describes is real only while the carrier is at full speed: `strips/legacy/R10` frames 2–4 and `crops/legacy/R11-carrier`.
6. **"No punch-in."** The touchdown cuts to a low, close end-zone camera (`legacy/desktop/R14`, `legacy/mobile/R14`). The field goal cuts to a camera behind the kicker (`legacy/desktop/R16`). Slow motion and particles cannot be judged from stills, and no particles are visible.
7. **"The result banner hides the players" (`legacy/mobile/R12`).** The banner is translucent and covers only a trailing receiver and the umpire. The tackle pile under "20 KEMP" sits clear above it.

**Critic B (critic-codex)**
1. **"Serif descriptions" and "serif logs."** Zoomed crops of the sidebars in `legacy/desktop/R15` and `legacy/desktop/R22` show a humanist sans for both the descriptions and the log text. The only slab-serif shapes are the Courier-style mono timestamps and key chips, and the result banners.
2. **"Dark airborne ball without a strong contrasting flight cue" (`legacy/mobile/R08`); "add catch-state cues."** A cyan target ring sits under the intended receiver in `legacy/mobile/R08`, `legacy/desktop/R07`, `legacy/desktop/R08` and `legacy/desktop/R09`, and in `crops/legacy/R09-slot_Z`. The punt also draws a flight line (`legacy/desktop/R17`). The ball has no trail, but a target cue already exists.
3. **"Retain the ball in the carrier's grip."** During runs the ball is held tucked: `crops/legacy/R11-carrier` and `crops/legacy/R13-carrier`. It drifts free in two places: at the tackle result (`crops/legacy/R12-carrier`) and during the QB drop (`crops/legacy/R07-slot_QB`).

**What both critics missed** (I am not adding these as gaps; they only bear on the scores):
- **In-world scoreboard.** It is synced live with the game state. `crops/legacy/R01-board` shows 4:00, down 1, 10 to go, ball on 25 at kickoff, and `legacy/desktop/R12` shows 3:17, 2nd and 5, ball on 40.
- **Hash marks.** They are high-school width, splitting the field into roughly thirds (`legacy/desktop/R01`, `legacy/desktop/R02`).
- **Goalposts.** They are H-style with padded bases (`legacy/desktop/R14`), which is right for a high-school field.
- **Day theme.** The HUD switches to a cream theme with a maroon HIKE button in the day game (`legacy/desktop/R19`), so it responds to context.
- **Mirrored numbers are worse than Critic A cited.** Besides "63" and "53", "92" and both shoulder "57"s are mirrored in `crops/legacy/R06-slot_C` and `crops/legacy/R04-slot_C`. This supports the critic.

## Category by category

### Art: critics 4.5 / 3.5 (mean 4.0). Proposed 4.5
**Conceded.** All of these are visible:
- Segmented, faceted limbs, box feet and block hands (`crops/legacy/R04-slot_QB`, `crops/legacy/R07-slot_QB`).
- A helmet with the same matte finish as the jersey, plus the "mohawk" stripe.
- A heavy rim glow (`crops/legacy/R14-carrier`).
- Mirrored numbers on visible patch rectangles (`crops/legacy/R06-slot_C`).
- A ball bigger than a torso (`crops/legacy/R08-ball`).
- A crowd of blocks with diamond heads (`crops/legacy/R01-crowd`).
- Black cone trees (`crops/legacy/R13-carrier`).

**Rebutted (Codex's 3.5).** The 3 anchor is "boxes for people, no material variety". The captures show more than that:
- Jointed bodies with a shoulder-pad silhouette.
- Facemask cages on both teams (`crops/legacy/R04-slot_C`, `crops/legacy/R03-slot_QB`).
- Pants stripes and number decals.
- Striped officials with caps.
- A believable built scoreboard (`crops/legacy/R01-board`), and a press box with windows (`legacy/desktop/R03`).
- Turf texture that holds up at field level (`crops/legacy/R04-turf_26_67_42`).
- Painted end zones and midfield logos (`legacy/desktop/R14`, `legacy/desktop/R03`).

The style is consistent across players and officials, but it is unfinished, so this sits between the 3 and 5 anchors. That gives 4.5. It is well short of axis-3.

### Lighting & atmosphere: 5.0 / 4.5 (mean 4.75). Proposed 5.0
**Conceded.**
- There is only one soft blob shadow per player (zoomed `legacy/desktop/R02`).
- The stands are unlit and the kickoff/punt bowl is empty (`legacy/desktop/R01`, `legacy/desktop/R17`).
- The sky is mirror-symmetric (`legacy/desktop/R03`, `legacy/desktop/R22`, and behind the board in `crops/legacy/R01-board`).
- The rain turf matches the dry turf (`crops/legacy/R18-turf_26_67_40` against `crops/legacy/R04-turf_26_67_42`).

**Rebutted.** Every item in the 5 anchor is on screen:
- A directional key light and blob shadows (R02).
- Haze cones and lamp glow (`legacy/desktop/R20`, `legacy/desktop/R04`).
- A believable painted dusk sky.
- Faint baked pools (R02, measured above).
- A believable flat day exposure (`legacy/desktop/R19`).

Codex's 4.5 scores below an anchor the build fully meets. None of the 7 anchor's items are met, so 5.0.

### Animation & game feel: 4.5 / 3.5 (mean 4.0). Proposed 4.5
**Conceded.**
- `strips/legacy/R07` shows no readable wind-up, and `crops/legacy/R07-slot_QB` has the ball on the turf by the QB's foot.
- `strips/legacy/R09` never reaches the catch.
- `strips/legacy/R10` jumps to "NO GAIN" with no fall.
- The tackled bodies are rigid planks that overlap, with the ball floating above them (`crops/legacy/R12-carrier`).
- All the touchdown celebrations use the same pose (`crops/legacy/R14-carrier`).

**Rebutted.**
- **Cycles read.** `crops/legacy/R11-carrier` shows a full extended stride with the arms pumping and the ball tucked. `strips/legacy/R10` and `strips/legacy/R11` show legible running cycles.
- **Too far to judge lean.** The far strip camera cannot show a lean in the cut (`strips/legacy/R11`), so Codex's "little weight transfer" is not demonstrable either way.
- **Contact exists.** `crops/legacy/R13-carrier` shows a body-to-body moment. It is just upright.
- **Camera cuts.** The context cameras (R14 touchdown, R16 field goal, R13/R15 replay) are feel touches.

The run cycles meet the 5 anchor, and the missing beats pull it below, so 4.5. Codex's 3.5 ignores the cycles that read.

### UI / HUD: 5.5 / 6.0 (mean 5.75). Proposed 6.0
**Conceded.**
- An empty sidebar during kickoff and punt (`legacy/desktop/R01`, `legacy/desktop/R17`).
- The result shown twice or three times (`legacy/desktop/R12`, `legacy/mobile/R21`).
- A tangled defensive diagram (`legacy/desktop/R05`).
- The last play card cut off (`legacy/desktop/R22`), though that is a scroll list rather than lost content.

**Rebutted (Claude).**
- The live sidebar is not just a greyed JUKE button. It carries the called play's route diagram and steering help (`legacy/desktop/R07`–`R10`).
- The result sidebars carry Timeout, Replay and the play log (`legacy/desktop/R12`, `legacy/desktop/R15`).

**Uncredited strengths.**
- Numbered receiver shapes on the field (`legacy/desktop/R04`, `legacy/desktop/R19`), close to axis-1.
- The cyan target ring on the intended receiver (R08).
- A field-goal meter with hierarchy (`legacy/desktop/R16`).
- A REPLAY tag (`legacy/desktop/R13`).
- The live in-world scoreboard and the context-aware day theme (R19).

That supports 6.0.

### Typography: 5.5 / 5.5 (mean 5.5). Proposed 5.5
**Conceded.** There are four faces, which I confirmed:
- An Oswald-style condensed face.
- A humanist sans.
- A slab-serif in the result banners (`legacy/desktop/R14`, `legacy/desktop/R21`).
- A Courier-style mono for key chips and timestamps (zoomed `legacy/desktop/R15`).

The helper text is tiny (`legacy/desktop/R16`).

**Rebutted.** Codex's "serif descriptions" is wrong, and Claude's TROJANS clip is world-space paint, not UI text. The condensed face is used consistently for the scorebug, headers, buttons and play cards on both viewports (`legacy/desktop/R04`, `legacy/mobile/R22`), and the numerals read at a glance. These corrections remove items but do not change the score.

### Readability: 5.5 / 5.0 (mean 5.25). Proposed 5.5
**Conceded.**
- Players are 30–45 px tall in the live desktop view (`legacy/desktop/R08`).
- The replay has no tag or ring (`strips/legacy/R13`).
- The ring trails the carrier at speed (`strips/legacy/R10` frames 2–4).
- The pass-rush cluster is hard to parse (`legacy/desktop/R09`).

**Rebutted.**
- In the gameplay frame the ring and plate do sit on #44 (`legacy/desktop/R10`).
- The target ring marks the receiver (`legacy/desktop/R08`, `legacy/mobile/R08`).
- The punt has a flight line (`legacy/desktop/R17`).
- The line of scrimmage and first-down lines are clear everywhere.
- The replay camera roughly doubles figure size (`legacy/desktop/R13`).

Above the 5 anchor's "takes effort to find", so 5.5.

### Mobile: 6.0 / 5.5 (mean 5.75). Proposed 6.0
**Conceded.**
- Figures are about 20–25 CSS px tall.
- About 28% of the frame is sky and stadium (`legacy/mobile/R04`, `legacy/mobile/R18`).
- The large nameplate covers bodies (`legacy/mobile/R10`).
- No landscape capture was made.

**Rebutted.**
- The banner is translucent and clears the pile (`legacy/mobile/R12`).
- The touchdown banner sits over sky, and the celebration stays visible (`legacy/mobile/R14`).
- The layout is deliberate: two-row scorebug, full-width thumb buttons, two-column play cards (`legacy/mobile/R22`).
- The 4× throttled phone proxy holds a 165 fps minimum, so the 30 fps requirement passes.

That is 6.0.

### Authenticity: 5.5 / 5.5 (mean 5.5). Proposed 6.0
**Conceded.**
- No band, cheer squad or student section (`crops/legacy/R01-crowd`).
- No convincing track.
- The kickoff camera shows a void instead of a grandstand (`legacy/desktop/R17`).

**Missed by both critics.**
- High-school-width hash marks (`legacy/desktop/R01`, `legacy/desktop/R02`).
- H-style padded goalposts (`legacy/desktop/R14`).
- The live, high-school-scale scoreboard (`crops/legacy/R01-board`).
- Mascot end zones per school: WOLVES in `legacy/desktop/R03`, TROJANS in `legacy/mobile/R22`.
- A smaller 3A venue at Jessieville (`legacy/desktop/R20`).
- Real Hot Springs place names in the playbook (`legacy/desktop/R22`).

These are the NFHS-markings and small-town-staging items in the 7 anchor that are already present. That justifies the gate value of 6.0.

## Gaps with my adjustments
- **Duplicates are not additive.** Where both critics list the same defect, I keep one entry at full gain and cut the other to its marginal gain.
- **G-cast-shadows-bloom: severity 5, gain 1.5 → 1.25.** Lamp glow and haze already exist, so the gain comes mainly from shadow maps and lighting the stands.
- **G-carrier-marker: severity 3 → 2.** The offset only appears at speed.
- **G-ball-scale: severity 3 → 2.** The oversized ball helps readability at the far camera.
- **G-mirrored-numbers: gain 0.25 → 0.5.** The defect is wider than cited and the fix is cheap.
- **G-live-action-readability: severity 4 → 3, gain 1.0 → 0.75.** The catch-state cue already exists. The real fix is camera framing and a ball trail.
- **G-weight-and-ball-coordination: severity 5 → 4, gain 1.5 → 0.75.** The run cycles read and the ball is held on runs. The throw half overlaps G-contact-beats.
- **Rain gaps: severity 3 → 2.** The defect appears only in rain games.

```json
{"loop":0,"role":"advocate","tier":"legacy","scores":{"art":{"score":4.5,"confidence":0.7,"evidence":[{"shot":"crops/legacy/R04-slot_C","note":"faceted torsos, block hands, mirrored 53/57 on patch boxes, but facemask cages, pad silhouette, pants stripes and numbers: above the 3 anchor's boxes-for-people"},{"shot":"crops/legacy/R03-slot_QB","note":"consistent style across players and striped officials; press box with lit windows and gold trim in background"},{"shot":"crops/legacy/R01-crowd","note":"crowd is blocks with diamond heads (conceded)"},{"shot":"crops/legacy/R01-board","note":"built, believable HS scoreboard object"},{"shot":"crops/legacy/R14-carrier","note":"heavy rim glow, matte helmets (conceded)"},{"shot":"crops/legacy/R04-turf_26_67_42","note":"turf texture holds at field level"}]},"lighting":{"score":5.0,"confidence":0.7,"evidence":[{"shot":"legacy/desktop/R02","note":"directional key with one soft blob per player; faint baked pool (midfield turf ~95-99 vs near band ~63-66 luminance)"},{"shot":"legacy/desktop/R20","note":"lamp glow and haze cones: 5-anchor haze/backdrop met"},{"shot":"legacy/desktop/R03","note":"attractive dusk sky but mirror-symmetric (conceded)"},{"shot":"crops/legacy/R18-turf_26_67_40","note":"rain turf identical to dry (conceded)"},{"shot":"legacy/desktop/R17","note":"dark empty bowl, unlit stands (conceded)"}]},"animation":{"score":4.5,"confidence":0.65,"evidence":[{"shot":"crops/legacy/R11-carrier","note":"full extended stride, arms pumping, ball tucked: cycles read"},{"shot":"strips/legacy/R10","note":"legible run cycles; cut to NO GAIN with a body down and no fall (conceded)"},{"shot":"strips/legacy/R07","note":"no readable wind-up at strip distance (conceded)"},{"shot":"crops/legacy/R07-slot_QB","note":"ball lying on turf beside QB foot (conceded)"},{"shot":"crops/legacy/R13-carrier","note":"defender body-to-body with ball-carrier #20: contact exists but upright, no wrap"},{"shot":"crops/legacy/R12-carrier","note":"plank falls, overlap, ball floating (conceded)"},{"shot":"legacy/desktop/R14","note":"context camera cut to low end-zone view at the TD"}]},"ui":{"score":6.0,"confidence":0.65,"evidence":[{"shot":"legacy/desktop/R04","note":"clean scorebug, numbered receiver shapes and route art close to axis-1"},{"shot":"legacy/desktop/R08","note":"cyan target ring on intended receiver; live sidebar carries play diagram"},{"shot":"legacy/desktop/R19","note":"HUD switches to a cream day theme with maroon HIKE: context-aware"},{"shot":"legacy/desktop/R16","note":"FG meter with hierarchy"},{"shot":"legacy/desktop/R12","note":"result duplicated in banner, sidebar and log (conceded)"},{"shot":"legacy/desktop/R05","note":"tangled defensive diagram (conceded)"}]},"typography":{"score":5.5,"confidence":0.65,"evidence":[{"shot":"legacy/desktop/R15","note":"condensed headers, humanist sans log (not serif), Courier-style mono timestamps and key chip"},{"shot":"legacy/desktop/R14","note":"slab-serif result banner mismatched with condensed HUD face (conceded)"},{"shot":"legacy/desktop/R16","note":"tiny helper text under the meter (conceded)"},{"shot":"legacy/mobile/R22","note":"condensed card names read well; TROJANS is world-space end-zone paint, not clipped UI type"}]},"readability":{"score":5.5,"confidence":0.6,"evidence":[{"shot":"legacy/desktop/R10","note":"ring at #44's feet with plate directly above in the gameplay frame"},{"shot":"legacy/desktop/R08","note":"LOS and first-down lines clear; target ring marks receiver; players small (conceded)"},{"shot":"legacy/desktop/R17","note":"punt flight line drawn"},{"shot":"strips/legacy/R13","note":"replay has no tag or ring (conceded)"},{"shot":"legacy/mobile/R08","note":"small figures but ball and target ring findable"}]},"mobile":{"score":6.0,"confidence":0.6,"evidence":[{"shot":"legacy/mobile/R04","note":"deliberate portrait layout, large thumb buttons; about 28% of frame is sky/stadium (conceded)"},{"shot":"legacy/mobile/R12","note":"translucent banner covers trailing players only; pile under 20 KEMP stays clear"},{"shot":"legacy/mobile/R22","note":"two-column play cards, readable"},{"shot":"legacy/mobile/R10","note":"nameplate overlaps bodies (conceded); perf 165 fps min at 4x throttle"}]},"authenticity":{"score":6.0,"confidence":0.55,"evidence":[{"shot":"legacy/desktop/R02","note":"hash marks split the field into rough thirds: HS width"},{"shot":"legacy/desktop/R14","note":"H-style goalposts with padded bases; school end-zone paint"},{"shot":"crops/legacy/R01-board","note":"HS-scale scoreboard synced with game state"},{"shot":"legacy/desktop/R20","note":"smaller 3A Jessieville venue"},{"shot":"legacy/desktop/R22","note":"Hot Springs place-name playbook, Ouachita backdrop"},{"shot":"crops/legacy/R01-crowd","note":"no band, cheer or student section (conceded)"}]}},"gaps":[{"id":"G-player-mesh-materials","category":"art","expectedGain":1.5,"severity":5,"effort":"L","workstream":"WS3","evidence":["crops/legacy/R04-slot_QB","crops/legacy/R14-carrier","crops/legacy/R16-slot_K"],"benchmark":"axis-3","fix":"Continuous skinned body (~6-10k tris) with gloves, cleats, pad silhouette and real facemask; MeshStandard/Physical materials with clearcoat helmet and normal/roughness-mapped jersey; clamp the fresnel rim term. (Advocate: conceded in full.)"},{"id":"G-cast-shadows-bloom","category":"lighting","expectedGain":1.25,"severity":5,"effort":"M","workstream":"WS1","evidence":["legacy/desktop/R02","legacy/desktop/R15","legacy/desktop/R17"],"benchmark":"cfb26-3","fix":"Shadow maps from 2-4 tower lights, lit stands with field-to-stand falloff, restrained bloom. (Advocate: lamp glow sprites and haze cones already exist in R20/R04, so the gain comes mainly from shadows and stand lighting.)"},{"id":"G-contact-beats","category":"animation","expectedGain":1.5,"severity":5,"effort":"L","workstream":"WS4b","evidence":["strips/legacy/R07","crops/legacy/R07-slot_QB","strips/legacy/R09","strips/legacy/R13","crops/legacy/R12-carrier"],"benchmark":"madden26-4","fix":"Parent ball to hand bone during drop/throw; keyed throw wind-up/release and catch reach; aligned wrap-up tackle contact; physics-blended falls with body/turf collision; varied celebrations. (Advocate: conceded; R13 does show upright contact, so the defect is missing wrap and fall, not missing contact.)"},{"id":"G-crowd-and-venue","category":"art","expectedGain":0.75,"severity":4,"effort":"M","workstream":"WS2","evidence":["crops/legacy/R01-crowd","legacy/desktop/R17","legacy/desktop/R15"],"benchmark":"cfb26-1","fix":"Replace block crowd with low-poly/impostor people with color and pose variety; bleacher geometry and railings; real trees instead of black cones. (Advocate: press box already has lit windows in R03; gain reduced.)"},{"id":"G-hs-staging","category":"authenticity","expectedGain":0.75,"severity":3,"effort":"M","workstream":"WS2","evidence":["legacy/desktop/R01","legacy/desktop/R02","crops/legacy/R01-crowd"],"benchmark":"cfb26-2","fix":"Add track ring, chain crew, cheerleaders on the track, band block and uniform-color student section; frame the home grandstand in the kickoff camera. (Advocate: conceded; HS hashes, H-posts and scoreboard already present.)"},{"id":"G-camera-framing","category":"mobile","expectedGain":0.75,"severity":4,"effort":"M","workstream":"WS7","evidence":["legacy/mobile/R08","legacy/mobile/R18","legacy/desktop/R10"],"benchmark":"retrobowl-1","fix":"Tighter, lower live-play camera; on portrait raise the horizon and follow the ball closer; design and capture a landscape layout. (Advocate: conceded.)"},{"id":"G-ui-panel-hygiene","category":"ui","expectedGain":0.75,"severity":3,"effort":"M","workstream":"WS7","evidence":["legacy/desktop/R01","legacy/desktop/R07","legacy/desktop/R22","legacy/desktop/R12","legacy/desktop/R05"],"benchmark":"madden26-1","fix":"Fill or collapse the kickoff/punt sidebar; show the result once; simplify the defense diagram; give the play list a visible scroll affordance. (Advocate: live sidebar already carries the play diagram, R07-R10; gain reduced.)"},{"id":"G-type-system","category":"typography","expectedGain":0.75,"severity":3,"effort":"S","workstream":"WS7","evidence":["legacy/desktop/R14","legacy/desktop/R12","legacy/desktop/R16"],"benchmark":"madden26-3","fix":"One condensed display face plus one text face; drop Courier (tabular numerals); restyle slab banners; 12-13 px minimum. (Advocate: mobile R22 TROJANS is world-space paint, not a type clip; gain reduced.)"},{"id":"G-rain-wet-turf","category":"lighting","expectedGain":0.5,"severity":2,"effort":"M","workstream":"WS5","evidence":["crops/legacy/R18-turf_26_67_40","legacy/desktop/R18"],"benchmark":"cfb26-4","fix":"In rain, lower turf roughness and add lamp specular streaks, splash particles and darkened jerseys. (Advocate: conceded; severity lowered because only rain games show it.)"},{"id":"G-carrier-marker","category":"readability","expectedGain":0.25,"severity":2,"effort":"S","workstream":"WS7","evidence":["crops/legacy/R10-carrier","crops/legacy/R11-carrier","strips/legacy/R13"],"benchmark":"legendbowl-2","fix":"Anchor the ring at the carrier's root without lag and keep the tag and ring in replays. (Advocate: in the gameplay frame legacy/desktop/R10 the ring and plate sit on #44; offset only at speed; the replay omission stands.)"},{"id":"G-sky-mirror","category":"lighting","expectedGain":0.25,"severity":2,"effort":"S","workstream":"WS1","evidence":["legacy/desktop/R03","legacy/desktop/R22"],"benchmark":"cfb26-3","fix":"Use a non-mirrored 360-degree sky painting, or offset and blend the seam. (Advocate: conceded.)"},{"id":"G-ball-scale","category":"readability","expectedGain":0.25,"severity":2,"effort":"S","workstream":"WS3","evidence":["crops/legacy/R08-ball","crops/legacy/R12-carrier"],"benchmark":"madden26-4","fix":"Scale the ball by camera distance (real size in close/replay cameras) and add a trail or outline at distance. (Advocate: oversize aids the far camera, legacy/desktop/R08; severity lowered.)"},{"id":"G-mirrored-numbers","category":"art","expectedGain":0.5,"severity":3,"effort":"S","workstream":"WS3","evidence":["crops/legacy/R06-slot_C","crops/legacy/R04-slot_C"],"benchmark":"axis-3","fix":"Fix chest/shoulder decal UV winding and bake numbers into the jersey texture instead of a patch quad. (Advocate: wider than cited: 63, 92, 53 and both shoulder 57s mirrored; gain raised.)"},{"id":"G-player-construction","category":"art","expectedGain":0.5,"severity":5,"effort":"L","workstream":"WS3","evidence":["crops/legacy/R04-slot_C","crops/legacy/R03-slot_QB"],"benchmark":"axis-3","fix":"Rebuild hands, shoes, joints, pad silhouettes and helmet assemblies; add body variation and distinct helmet/cloth materials. (Advocate: duplicate of G-player-mesh-materials; marginal gain only.)"},{"id":"G-contact-resolution","category":"animation","expectedGain":0.5,"severity":4,"effort":"L","workstream":"WS4b","evidence":["strips/legacy/R10","strips/legacy/R13","crops/legacy/R12-carrier"],"benchmark":"cfb26-4","fix":"Add paired approach, wrap, compression, fall and settle phases; constrain bodies above turf; keep the ball in the carrier's grip through the tackle. (Advocate: overlaps G-contact-beats; ball is already held during runs, R11-carrier/R13-carrier.)"},{"id":"G-weight-and-ball-coordination","category":"animation","expectedGain":0.75,"severity":4,"effort":"L","workstream":"WS4","evidence":["strips/legacy/R07","strips/legacy/R11","crops/legacy/R07-slot_QB"],"benchmark":"madden26-4","fix":"Add planted support phases, directional lean, torso rotation and hand-bound ball during the QB drop. (Advocate: run cycles read with extended stride, R11-carrier; strip distance cannot show lean; throw half overlaps G-contact-beats.)"},{"id":"G-stadium-light-grounding","category":"lighting","expectedGain":0.5,"severity":4,"effort":"L","workstream":"WS1","evidence":["legacy/desktop/R01","legacy/desktop/R20","crops/legacy/R04-slot_C"],"benchmark":"axis-3; cfb26-3","fix":"Directional player shadows, contact shading and exposure tuning that preserves venue structure. (Advocate: duplicate of G-cast-shadows-bloom; marginal gain only.)"},{"id":"G-live-action-readability","category":"readability","expectedGain":0.75,"severity":3,"effort":"M","workstream":"WS7","evidence":["legacy/desktop/R08","legacy/desktop/R09","legacy/desktop/R10"],"benchmark":"axis-1; legendbowl-2","fix":"Tighten live framing, narrow the persistent sidebar, add a ball-flight trail. (Advocate: a catch-target ring already exists, R08/R09, as does the punt flight line, R17.)"},{"id":"G-portrait-action-scale","category":"mobile","expectedGain":0.5,"severity":4,"effort":"M","workstream":"WS7","evidence":["legacy/mobile/R04","legacy/mobile/R08","legacy/mobile/R10"],"benchmark":"retrobowl-1; retrobowl-2","fix":"Portrait-specific camera that enlarges the formation; cap badge size and offset nameplates from bodies. (Advocate: overlaps G-camera-framing; marginal gain only.)"},{"id":"G-school-crowd-staging","category":"authenticity","expectedGain":0.75,"severity":3,"effort":"L","workstream":"WS2","evidence":["crops/legacy/R01-crowd","legacy/desktop/R15","legacy/desktop/R20"],"benchmark":"legendbowl-4; cfb26-2","fix":"Coherent seated/standing crowd silhouettes with student and band sections; bleachers with rows and aisles. (Advocate: overlaps G-hs-staging and G-crowd-and-venue; severity lowered because several HS markers already exist.)"},{"id":"G-hud-and-type-hierarchy","category":"ui","expectedGain":0.5,"severity":3,"effort":"M","workstream":"WS7","evidence":["legacy/desktop/R21","legacy/desktop/R22","legacy/mobile/R21"],"benchmark":"madden26-3","fix":"Consolidate repeated result messaging, collapse empty panels, enlarge secondary text. (Advocate: overlaps G-ui-panel-hygiene and G-type-system; descriptions/logs are sans, not serif.)"},{"id":"G-wet-surface-response","category":"lighting","expectedGain":0.25,"severity":2,"effort":"M","workstream":"WS5","evidence":["legacy/desktop/R18","crops/legacy/R18-turf_26_67_40"],"benchmark":"cfb26-4","fix":"Wet roughness/specular variation, damp regions and contact splashes. (Advocate: duplicate of G-rain-wet-turf.)"}],"verdict":"continue"}
```
