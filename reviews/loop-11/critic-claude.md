# Critic A (critic-claude): loop 11, High tier, desktop

## Verdict
Friday Night Spa City now looks like a coherent, stylised night game. The helmets are glossy and the jerseys matte, players cast several soft shadows from the light towers, a real crowd fills the home grandstand, the play names are local, and the HUD has route art, shape badges and result toasts with a clear hierarchy. Four kinds of problem keep every gated category below 7. First, the result toasts and the field-goal meter are drawn over the play itself: the R12 tackle pile, the last three frames of the R09 and R10 strips, and the R16 holder and line. Second, the line play is still mannequin-like. In pass protection the OL and DL stand upright without touching (R07), and every lineman holds the same stance (R06, R11). Third, the venue is empty beyond the end zones: a grey slab or a void in R04, R12 and R14, and no band, student section or cheer squad anywhere. Fourth, the asset close-ups still show capsule officials, mitten hands, plastic-looking pants and faceted shoulders. This loop's catch and fall work does show in the strips (hands up in R09 frame 4, the carrier going down in R13 frames 4–8), but the toast in front of the action undoes part of that gain. Verdict: **continue**.

## Scores

### Art: 6.0
- Gear holds up in close-ups. `crops/high/R07-slot_QB` and `crops/high/R14-carrier` show glossy helmets with a specular highlight, decals, a grey facemask cage, matte jerseys with sleeve stripes, and striped pants and socks. The material contrast the 7 anchor asks for is there.
- The bodies fall short of 7. `crops/high/R04-slot_C` shows a cartoonish center (#69) with oversized glutes and shoulder blobs. In `crops/high/R12-carrier` the orange pants have a plastic specular sheen, the gloves are mittens, and #47 and #20 clip into each other on the ground. `crops/high/R06-slot_DL2-side` and `crops/high/R14-carrier` (#74's shoulder) show faceted silhouettes. No capture shows a jersey fold.
- The officials are primitives. `crops/high/R03-slot_QB` has a capsule head with a white cap, blob hands and two black tube legs. The ref in `crops/high/R12-carrier` is the same model.
- The crowd reads as people (`crops/high/R01-crowd`: raised arms, mixed shirt colours), though they are block figures. The venue is thin: in `high/desktop/R04`, `R12` and `R14` the end-zone backdrop is a dark wall or void. The trees in `high/desktop/R15` and `crops/high/R13-carrier` are flat black cones. The turf has field-level grain (`crops/high/R04-turf_26_67_42`).
- Against axis-3 (about 7) and legendbowl-1 (a style-consistent 7): the style is consistent, but the officials, hands and venue dressing hold it at 6.

### Lighting & atmosphere: 6.5
- Several soft shadows per player from the towers: `high/desktop/R02` (fanned shadows on the kickoff line) and `crops/high/R18-turf_26_67_40`. Lamps bloom in `high/desktop/R01`, `R21` and `R22`. Helmet speculars show in `crops/high/R14-carrier` and `crops/high/R07-slot_QB`.
- Rain works: streaks in `high/desktop/R18`, plus a specular hotspot and splashes in `crops/high/R18-turf_26_67_40`. The day-mist grade in `high/desktop/R19` is believable, if heavy.
- Against axis-3 and cfb26-3 it falls short. The field is lit as one even, flat green with no pools under each tower (`high/desktop/R04`, `R17`). Beyond the end zone the stadium is an unlit grey slab (`high/desktop/R14`, `R12`), so there is no falloff from field to stands to structures. The painted sky is a bright orange dusk band rather than a night exposure. High R01 also has less atmospheric glow around the lights than `medium/desktop/R01`.

### Animation & game feel: 5.5
- Better than before: in `strips/high/R09` frame 4 the receiver's hands are up at the catch, with a camera punch-in. `strips/high/R13` frames 4–8 show the carrier recoil and then drop, legs splayed by frame 7–8. `crops/high/R12-carrier` shows two bodies on the ground.
- There is no contact in pass protection. In `crops/high/R07-slot_QB`, OL #74 and #68 stand upright with arms hanging while the QB winds up, and the DL behind them is also upright. `strips/high/R07` shows the same frozen line in all 8 frames.
- R07 does not show the wind-up. From frame 2 of `strips/high/R07` the ball is already in flight as a streak, and the QB sits on the bottom edge of the frame. In `high/desktop/R07` the ball can't be found near the QB.
- Poses are cloned. All the OL hold the same wide squat across `strips/high/R11` and `strips/high/R10`, and the line stance in `crops/high/R06-slot_DL2-side` is identical down the row, with #63's down hand hovering above the turf rather than planted. Bench players stand in evenly spaced, identical rows (`high/desktop/R13`, `R15`).
- The toast hides the result beats. Frames 6–8 of `strips/high/R10` ("NO GAIN") and `strips/high/R09` ("+7 YD") cover the players where the action ends.
- Against cfb26-4 and madden26-4 (stills) this is still procedural motion with stiff interactions: a 5 to 6, not 7.

### UI / HUD: 6.0
- The scorebug is clean and close to broadcast style: team bars, possession football, gold clock, down and distance (`high/desktop/R04`). Pre-snap ID is good: dashed route art with shape-coded receiver badges (`high/desktop/R04`, `R19`). The result toasts have a headline and subtitle hierarchy (`high/desktop/R21`).
- Overlap problems:
  - The `high/desktop/R12` toast (y 645–745) sits on the tackle pile at the LOS, as it does in `low/desktop/R12`.
  - The `high/desktop/R14` TOUCHDOWN toast cuts across the celebrating group's legs.
  - The `high/desktop/R16` FG meter (y ≈ 595–712) covers the line and the holder, leaving only the kicker's legs.
  - On landscape (`medium/landscape/R12`, `R21`) the toasts still fade at the edges and take about a quarter of the field height.
- The side panel is half empty. In `high/desktop/R05`, `R14` and `R16`, everything below the button (y ≈ 480–800) is blank.
- Defensive pre-snap (`high/desktop/R05`) has no on-field marking of the user's defender, and its zone art lives only in the panel. Compare madden26-2 and axis-1.
- Against axis-1, madden26-1 and madden26-3: functional and tidy, but not 7 while toasts sit on the play.

### Typography: 6.5
- One condensed display face (all-caps titles, scorebug names, toasts) and a humanist sans for body text, used consistently across `high/desktop/R22`, `R21` and `medium/mobile/R22`. Numerals read at a glance: score digits about 30 px, the clock in gold.
- The toast headline in `high/desktop/R21` measures about 28 px cap height and is a clear step above the 16 px subtitle.
- Weak spots: the "HOME" tag next to the team name is about 9 px (`high/desktop/R04`). The in-world scoreboard's "DOWN / TO GO / BALL ON" labels can't be read at frame scale (`high/desktop/R16`). The italic outlined "1ST & 10" field decal is a third style and gets occluded by players (`high/desktop/R06`, `R20`).
- Against madden26-3 and cfb26-1: close, with a weaker scale at the small end.

### Readability: 6.0
- Strong: the ball is drawn about 1.5–1.7× scale with a white trail. In my zoom of `high/desktop/R09` it is about 17 px against a 10 px helmet; see also `crops/high/R08-ball` and `medium/mobile/R08`. The carrier gets a ring and a name plate (`high/desktop/R10`, `high/desktop/R11`, `medium/mobile/R10`). The blue LOS and yellow line-to-gain are clear.
- Weak:
  - Players are small. In my 4× zoom of `high/desktop/R04`, linemen are about 20 px tall and the QB about 35 px of the 800 px frame. The view above y ≈ 300 is all sky.
  - The "4" and "5" badges now float 40–50 px above their players and land on the LB and DL: in `high/desktop/R04` the RB's star sits on the defensive front. `high/mobile/R04` and `medium/mobile/R04` repeat this, with the star on the OL.
  - Toasts hide the pile (`high/desktop/R12`, `strips/high/R10` frames 6–8).
  - Portrait results frame the offense out of view: in `high/mobile/R21` and `medium/mobile/R21` only the defense and the ball show.
- Against madden26-1, axis-1 and retrobowl-1: these are not "every frame on both viewports".

### Mobile: 6.5 (phone tier = Medium)
- Performance passes: medium · mobile · 4× throttle holds a minimum of 87 fps, p95 18.7 ms.
- Portrait HUD is thumb-friendly. In `medium/mobile/R04` the HIKE and CHANGE PLAY buttons are about 135×60 CSS px, the scorebug is abbreviated (HSHS/LHS), and the play-call 2-column grid in `medium/mobile/R22` is legible.
- Figures are small. Portrait linemen measure about 22 CSS px (`medium/mobile/R04`). Three of five receivers sit on edge badges, and the left badge overlaps the cut-off "1ST & 10" decal.
- `medium/mobile/R21` hides the offense entirely, which is unintended framing.
- Landscape (`medium/landscape/R04`, `R10`) is serviceable at about 22–30 CSS px figures, but the 250 px panel takes about 30% of the 844 px width, and toasts take the bottom quarter of the field (`medium/landscape/R12`, `R21`).
- Against retrobowl-1 and retrobowl-2: close, but neither framing is consistently deliberate.

### Authenticity: 6.0
- Local flavour is strong: Ouachita ridge backdrop, Joe C. Reese home grandstand with an orange and black crowd (`high/desktop/R01`, `crops/high/R01-crowd`), a small HS scoreboard reading HSHS/LHHS (`crops/high/R01-board`), real rivals (Lake Hamilton, Lakeside, Jessieville), Spa City play names (`high/desktop/R22`), H goalposts with pads (`high/desktop/R14`), wide NFHS-style hashes and a tan apron.
- Missing: no band, student section, cheer squad or chain crew in any frame. The visitor side is a small stand with block trees behind it (`high/desktop/R15`). The end zones open onto an empty grey backdrop (`high/desktop/R14`, `R12`). Wolf Stadium's press box faces an empty bleacher (`high/desktop/R03`).
- Against cfb26-1/2/3 and legendbowl-4: it reads as small-town Friday night, but the staging is sparse.

## Ranked gaps

1. **G-toast-occludes-play** (ui; WS7). Severity 4, effort S, expected gain +0.5 ui (+0.5 readability).
   - Problem: result toasts and the FG meter sit on the action. Evidence: `high/desktop/R12` (pile at the LOS under the toast), `strips/high/R10` and `strips/high/R09` frames 6–8, `high/desktop/R16` (meter over the holder and line), `medium/landscape/R12`.
   - Fix: dock desktop and landscape toasts to the top of the field, just under the scorebug, or frame the result camera so the ball spot sits above y ≈ 55% of the canvas. Move the FG meter to the bottom 90 px of the canvas, below the kicker.
2. **G-pass-pro-no-contact** (animation; WS4). Severity 4, effort M, expected gain +0.5–1.0 animation.
   - Problem: during passes the OL and DL stand upright, apart and still. Evidence: `crops/high/R07-slot_QB`, `strips/high/R07`.
   - Fix: pair each OL with a rusher. Kick-slide, extend both arms into the rusher's chest plate, set pad level about 15° forward, and lock the pair so the DL leans into the block and shuffles laterally. Add 2–3 rush variants (bull, swim, rip).
3. **G-venue-void-and-staging** (authenticity; WS2). Severity 4, effort L, expected gain +0.5 authenticity (+0.5 art).
   - Problem: grey or void end-zone backdrops, no band, no student section, no cheer squad. Evidence: `high/desktop/R14`, `high/desktop/R12`, `high/desktop/R15`.
   - Fix: dress both end zones (fieldhouse or fence with school banners, a lit concession or press structure, a berm with fans). Seat a uniformed band block and a student section with signs at one end of the home stand. Put cheerleaders and a chain crew on the track.
4. **G-badge-detached** (readability; WS7). Severity 3, effort S, expected gain +0.5 readability.
   - Problem: the "4" and "5" badges float 40–50 px above their owners and land on defenders. Evidence: `high/desktop/R04`, `high/mobile/R04`, `medium/mobile/R04`.
   - Fix: limit the screen-space offset to about one helmet height above the head, add a 1 px tether to the player, or put the shape inside a ground ring under the receiver.
5. **G-official-and-hand-models** (art; WS3). Severity 3, effort M, expected gain +0.5 art.
   - Problem: capsule officials, mitten gloves and faceted shoulders. Evidence: `crops/high/R03-slot_QB`, `crops/high/R12-carrier`, `crops/high/R06-slot_DL2-side`.
   - Fix: put officials on the player rig with a striped shirt, black slacks, cap and real hands. Add split-finger glove meshes. Raise shoulder-pad segment counts or smooth the normals.
6. **G-cloth-materials** (art; WS3). Severity 3, effort M, expected gain +0.5 art.
   - Problem: pants have a plastic sheen and jerseys have no folds. Evidence: `crops/high/R12-carrier`, `crops/high/R04-slot_C`.
   - Fix: raise pants roughness to about 0.85 and add a weave normal map. Add a fold or wrinkle normal map at the jersey waist and armpits.
7. **G-light-pools-and-falloff** (lighting; WS1). Severity 3, effort M, expected gain +0.5 lighting.
   - Problem: the field is lit flat and evenly, and the end-zone structures are unlit grey. Evidence: `high/desktop/R04`, `high/desktop/R17`, `high/desktop/R14`.
   - Fix: add per-tower light pools with about 20% falloff between towers. Light the near faces of the stands and end-zone structures, and let them fall to dark above. Pull the sky exposure down to a true night value.
8. **G-portrait-result-framing** (mobile; WS7). Severity 3, effort S, expected gain +0.5 mobile.
   - Problem: the portrait result camera leaves the offense out of view. Evidence: `high/mobile/R21`, `medium/mobile/R21`.
   - Fix: centre the result camera on the ball spot with about 8 yd of backfield visible above the toast.
9. **G-cloned-poses** (animation; WS4). Severity 2, effort M, expected gain +0.3 animation.
   - Problem: identical OL squats and identical bench rows. Evidence: `strips/high/R11`, `crops/high/R06-slot_DL2-side`, `high/desktop/R15`.
   - Fix: add per-player pose offsets (stance width, hand plant, head angle). Plant the down hand on the turf. Give the bench idle variants and uneven spacing.
10. **G-qb-windup-legibility** (animation; WS4). Severity 2, effort S, expected gain +0.3 animation.
    - Problem: the ball is not visible in the QB's hand, and the QB sits on the frame edge during the drop. Evidence: `high/desktop/R07`, `strips/high/R07`.
    - Fix: frame the QB at 70% of the frame height during the drop and hold a visible cocked-ball pose for 0.15 s before release.
11. **G-panel-dead-space** (ui; WS7). Severity 2, effort S, expected gain +0.3 ui.
    - Problem: the side panel is blank below its buttons. Evidence: `high/desktop/R05`, `high/desktop/R16`, `high/desktop/R14`.
    - Fix: fill it with a down-and-distance card and the drive log, or collapse the panel to the content height during pre-snap and kicks.

```json
{
  "loop": 11,
  "role": "critic-claude",
  "tier": "high",
  "scores": {
    "art": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        { "shot": "crops/high/R07-slot_QB", "note": "glossy helmet with facemask vs matte jersey: material contrast present" },
        { "shot": "crops/high/R12-carrier", "note": "plastic-sheen pants, mitten gloves, bodies clipping on the ground, capsule official" },
        { "shot": "crops/high/R03-slot_QB", "note": "official is a primitive: capsule head, blob hands, tube legs" },
        { "shot": "crops/high/R01-crowd", "note": "crowd reads as people but as block figures" },
        { "shot": "high/desktop/R14", "note": "end-zone backdrop is a grey void" }
      ]
    },
    "lighting": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/desktop/R02", "note": "several soft shadows per player" },
        { "shot": "crops/high/R18-turf_26_67_40", "note": "wet specular hotspot and splashes" },
        { "shot": "high/desktop/R04", "note": "field evenly flat-lit, no light pools" },
        { "shot": "high/desktop/R14", "note": "unlit grey slab beyond the end zone, no falloff into the structures" }
      ]
    },
    "animation": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        { "shot": "strips/high/R13", "note": "carrier recoils and drops in frames 4-8" },
        { "shot": "strips/high/R09", "note": "hands up at the catch with a punch-in; frames 6-8 hidden by the toast" },
        { "shot": "crops/high/R07-slot_QB", "note": "OL and DL standing upright, no pass-pro contact" },
        { "shot": "strips/high/R07", "note": "ball already in flight from frame 2; line frozen; QB on the frame edge" },
        { "shot": "strips/high/R11", "note": "identical OL squat poses" }
      ]
    },
    "ui": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        { "shot": "high/desktop/R04", "note": "clean scorebug, route art, shape badges" },
        { "shot": "high/desktop/R12", "note": "result toast sits on the tackle pile" },
        { "shot": "high/desktop/R16", "note": "FG meter covers the holder and line; panel empty below the button" },
        { "shot": "high/desktop/R05", "note": "no on-field defender ID; panel half empty" }
      ]
    },
    "typography": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/desktop/R21", "note": "condensed display headline, about 28 px cap height, clear hierarchy" },
        { "shot": "high/desktop/R22", "note": "consistent display/sans pair in the play list" },
        { "shot": "high/desktop/R04", "note": "HOME tag about 9 px; in-world scoreboard labels unreadable" }
      ]
    },
    "readability": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/desktop/R09", "note": "oversized ball with a trail reads well" },
        { "shot": "high/desktop/R10", "note": "carrier ring and name plate" },
        { "shot": "high/desktop/R04", "note": "linemen about 20 px; badges 4 and 5 float 40-50 px above their owners onto defenders" },
        { "shot": "medium/mobile/R21", "note": "portrait result frame shows no offense" },
        { "shot": "strips/high/R10", "note": "NO GAIN toast covers the pile in frames 6-8" }
      ]
    },
    "mobile": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        { "shot": "medium/mobile/R04", "note": "thumb-sized HIKE button; linemen about 22 CSS px; 3 of 5 receivers on edge badges" },
        { "shot": "medium/mobile/R21", "note": "offense framed out of view" },
        { "shot": "medium/landscape/R12", "note": "edge-faded toast takes the bottom quarter; panel about 30% of the width" },
        { "shot": "medium/mobile/R22", "note": "legible 2-column play-call grid" }
      ]
    },
    "authenticity": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/desktop/R01", "note": "home grandstand, light towers, ridge backdrop, HS scoreboard" },
        { "shot": "high/desktop/R22", "note": "Spa City play names, local rivals" },
        { "shot": "high/desktop/R15", "note": "sparse visitor stand, cone trees, mannequin bench row" },
        { "shot": "high/desktop/R14", "note": "no band, student section or cheer; void beyond the end zone" }
      ]
    }
  },
  "gaps": [
    {
      "id": "G-toast-occludes-play",
      "category": "ui",
      "expectedGain": 0.5,
      "severity": 4,
      "effort": "S",
      "workstream": "WS7",
      "evidence": ["high/desktop/R12", "strips/high/R10", "strips/high/R09", "high/desktop/R16", "medium/landscape/R12"],
      "benchmark": "madden26-3",
      "fix": "Dock desktop/landscape result toasts at the top of the field under the scorebug (or frame the result camera so the ball spot sits above 55% of canvas height); move the FG meter into the bottom 90 px below the kicker."
    },
    {
      "id": "G-pass-pro-no-contact",
      "category": "animation",
      "expectedGain": 0.75,
      "severity": 4,
      "effort": "M",
      "workstream": "WS4",
      "evidence": ["crops/high/R07-slot_QB", "strips/high/R07"],
      "benchmark": "axis-3",
      "fix": "Pair each OL with a rusher: kick-slide, arms extended into the chest plate, about 15 deg forward pad level, locked contact with DL lean and lateral shuffle; 2-3 rush variants (bull, swim, rip)."
    },
    {
      "id": "G-venue-void-and-staging",
      "category": "authenticity",
      "expectedGain": 0.5,
      "severity": 4,
      "effort": "L",
      "workstream": "WS2",
      "evidence": ["high/desktop/R14", "high/desktop/R12", "high/desktop/R15"],
      "benchmark": "cfb26-1",
      "fix": "Dress both end zones (fieldhouse/fence with banners, lit structure, berm fans); add a uniformed band block and a student section with signs in the home stand; cheerleaders and chain crew on the track."
    },
    {
      "id": "G-badge-detached",
      "category": "readability",
      "expectedGain": 0.5,
      "severity": 3,
      "effort": "S",
      "workstream": "WS7",
      "evidence": ["high/desktop/R04", "high/mobile/R04", "medium/mobile/R04"],
      "benchmark": "axis-1",
      "fix": "Cap the badge's screen-space offset to about one helmet height above the head and add a 1 px tether, or place the shape inside a ground ring under the receiver."
    },
    {
      "id": "G-official-and-hand-models",
      "category": "art",
      "expectedGain": 0.5,
      "severity": 3,
      "effort": "M",
      "workstream": "WS3",
      "evidence": ["crops/high/R03-slot_QB", "crops/high/R12-carrier", "crops/high/R06-slot_DL2-side"],
      "benchmark": "axis-3",
      "fix": "Put officials on the player rig with a striped shirt, slacks, cap and real hands; split-finger glove meshes; smooth shoulder-pad silhouettes (more segments or smoothed normals)."
    },
    {
      "id": "G-cloth-materials",
      "category": "art",
      "expectedGain": 0.5,
      "severity": 3,
      "effort": "M",
      "workstream": "WS3",
      "evidence": ["crops/high/R12-carrier", "crops/high/R04-slot_C"],
      "benchmark": "legendbowl-1",
      "fix": "Raise pants roughness to about 0.85 with a weave normal map; add fold/wrinkle normals at the jersey waist and armpits."
    },
    {
      "id": "G-light-pools-and-falloff",
      "category": "lighting",
      "expectedGain": 0.5,
      "severity": 3,
      "effort": "M",
      "workstream": "WS1",
      "evidence": ["high/desktop/R04", "high/desktop/R17", "high/desktop/R14"],
      "benchmark": "cfb26-3",
      "fix": "Per-tower light pools with about 20% falloff between towers; light the near faces of stands and end-zone structures, fading to dark above; lower the sky to a true night exposure."
    },
    {
      "id": "G-portrait-result-framing",
      "category": "mobile",
      "expectedGain": 0.5,
      "severity": 3,
      "effort": "S",
      "workstream": "WS7",
      "evidence": ["high/mobile/R21", "medium/mobile/R21"],
      "benchmark": "retrobowl-1",
      "fix": "Centre the portrait result camera on the ball spot with about 8 yd of backfield visible above the toast so the offense stays in frame."
    },
    {
      "id": "G-cloned-poses",
      "category": "animation",
      "expectedGain": 0.3,
      "severity": 2,
      "effort": "M",
      "workstream": "WS4",
      "evidence": ["strips/high/R11", "crops/high/R06-slot_DL2-side", "high/desktop/R15"],
      "benchmark": "madden26-4",
      "fix": "Per-player stance offsets (width, head angle), plant the down hand on the turf, bench idle variants with uneven spacing."
    },
    {
      "id": "G-qb-windup-legibility",
      "category": "animation",
      "expectedGain": 0.3,
      "severity": 2,
      "effort": "S",
      "workstream": "WS4",
      "evidence": ["high/desktop/R07", "strips/high/R07"],
      "benchmark": "axis-3",
      "fix": "Keep the QB at about 70% of frame height during the drop and hold a visible cocked-ball pose for 0.15 s before release."
    },
    {
      "id": "G-panel-dead-space",
      "category": "ui",
      "expectedGain": 0.3,
      "severity": 2,
      "effort": "S",
      "workstream": "WS7",
      "evidence": ["high/desktop/R05", "high/desktop/R16", "high/desktop/R14"],
      "benchmark": "axis-1",
      "fix": "Fill the empty lower panel with a down-and-distance card and the drive log, or collapse the panel to the content height for pre-snap and kicks."
    }
  ],
  "verdict": "continue"
}
```
