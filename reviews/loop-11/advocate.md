# Advocate rebuttal: loop 11 (High tier, desktop)

Capture paths are relative to `games/football/screenshots/review-loop-11/`. I opened every capture cited below. Critic means: art 6.0, lighting 6.5, animation 5.25, ui 6.5, typography 6.75, readability 6.0, mobile 6.25, authenticity 6.25.

## Summary
Most of what the critics say holds up. The pass-protection line doesn't touch (`crops/high/R07-slot_QB`). The officials are capsule figures (`crops/high/R03-slot_QB`). Badges "4" and "5" float over defenders (`high/desktop/R04`, which I zoomed to 4×). The portrait result camera hides the offense (`medium/mobile/R21`). There is no band or student section. The FG meter covers the holder (`high/desktop/R16`). I concede all of these.

Three things are overstated:
- **Toasts.** They cover the play in some captures, not across the board. They are clear of the action in `high/desktop/R21`, `medium/landscape/R21` and `medium/landscape/R12`, and nearly clear in `high/desktop/R14`.
- **The fall.** It does read: in `strips/high/R13` the carrier's "20 KEMP" plate drops and his legs splay in frames 6–8.
- **The QB wind-up.** The ball is visibly cocked in `crops/high/R07-slot_QB`.

A few facts are plainly wrong (see the last section). Their effect on scores is small. I propose +0.25 on UI, typography, mobile and authenticity, and match the mean or concede everywhere else.

## Category by category

### Art (critics 6.0 / 6.0, proposed 6.0): mostly conceded
- **Concede (Claude, Codex): officials are primitives.** `crops/high/R03-slot_QB` shows a capsule head, blob hands and tube legs.
- **Concede: shoulders are faceted.** `crops/high/R14-carrier` shows angular facets on #74's shoulder.
- **Concede: bodies clip on the ground.** In `crops/high/R12-carrier`, #47 and #20 interpenetrate.
- **Concede: pants have a plastic sheen.** It shows on the orange pants in both `crops/high/R12-carrier` and `crops/high/R04-slot_QB`.
- **Concede (Codex): the bent torso deforms angularly.** `crops/high/R06-slot_C-side` shows #55's back creasing.
- **Rebut (Claude): "the gloves are mittens".** This is wrong for players. In `crops/high/R06-slot_C-side`, #55's white gloves have a separate thumb and split fingers, and the black glove at the right edge of `crops/high/R12-carrier` also shows fingers. The mitten hands belong to the officials only (`crops/high/R03-slot_QB`).
- **Rebut (Claude): the "faceted silhouettes" in `crops/high/R06-slot_DL2-side`.** The DL row there has rounded shoulders and helmets. The faceting shows in `crops/high/R14-carrier`, not in this crop.
- **Partial rebut (both): the crowd.** `crops/high/R01-crowd` shows varied shirt colours (orange, white, black), mixed arm poses and visible heads. "Rectangular" (Codex) and "block figures" (Claude) are fair about the construction, but it reads as people, which is what the 7 anchor asks for.
- **Score.** Against axis-3 (`benchmarks/axis-3.jpg`, with its realistic bodies and pass-pro contact), 6.0 is right. I make no change.

### Lighting & atmosphere (6.5 / 6.5, proposed 6.5): conceded, with one overstatement
- **Concede: the venue is lit only on the field.** In `high/desktop/R14` and `high/desktop/R17`, the end-zone structures and upper stadium are unlit grey or dark slabs.
- **Concede: the sky is orange dusk.** It reads as dusk rather than a night exposure (`high/desktop/R04`).
- **Concede (Codex): the wet hotspot is a single concentrated blob.** It sits beside #66 in `crops/high/R18-turf_26_67_40`.
- **Rebut (Claude): the field is "lit as one even, flat green with no pools".** This is overstated:
  - `high/desktop/R02` and `high/desktop/R17` show uneven field luminance, with brighter patches toward the near sideline and around the 30–40 and darker bands toward the far end and the corners.
  - `high/desktop/R01` shows the field falling off toward the dark perimeter at the bottom right.
  - The pools are weak, but they are there.
- **Partial rebut (Codex): R15 "adds heavy blur without making the replay subject crisp".** In `high/desktop/R15`, the carrier with the "44 DELACROIX" plate sits in the focal plane and is reasonably sharp. The blur falls on the stand and trees behind him, which is the intended depth of field.
- **Score.** Multiple fanned shadows (`high/desktop/R02`), lamp bloom (`high/desktop/R01`) and a wet specular (`crops/high/R18-turf_26_67_40`) support the mean. I keep 6.5.

### Animation & game feel (5.5 / 5.0, proposed 5.5)
- **Concede (Claude): pass protection has no contact.** In `crops/high/R07-slot_QB`, OL #74 and #68 stand upright with their arms hanging, and the DL behind them are upright too. `high/desktop/R08` shows the same upright line mid-play. This is the biggest animation hole.
- **Concede: poses are cloned.** In `crops/high/R06-slot_DL2-side` the whole DL row holds the same stance, and #63's down hand hovers just above the turf. The bench rows in `high/desktop/R13` and `high/desktop/R15` are identical and evenly spaced.
- **Rebut (Codex): `strips/high/R13` "does not communicate a strong ... collapse".** I enlarged frames 1–8:
  - From frame 5, the "20 KEMP" plate steps down each frame (about 50 px over frames 5–8 at 2× zoom).
  - By frames 7–8, the carrier's orange legs are splayed beneath the plate.
  - The collapse is legible. What does not read is the wrap and drive, and I concede that part.
- **Partial rebut (Claude): "ball not visible in the QB's hand".** `crops/high/R07-slot_QB` shows #12 with the ball cocked beside his helmet, a clear wind-up pose. In `high/desktop/R07` the QB is at about y 665 of 800, which is low but not on the edge. Ball legibility at frame scale is a fair point.
- **Overstated in the build's favour (Codex): "raised arms" in `crops/high/R09-slot_Z`.** #88 has one forearm raised to shoulder height, not both arms up. `strips/high/R09` frame 4 (enlarged) likewise shows one arm reaching, with the punch-in. I don't count it as more than that.
- **Partial rebut (Claude): toasts hide the result beats in `strips/high/R09` and `strips/high/R10` frames 6–8.** The toast covers roughly the bottom 30 px of each strip frame. Players' heads and torsos stay visible above it, and the ball carrier and the result are readable. Legs are cut off, which is a UI issue rather than an animation one.
- **Score.** The fall (`strips/high/R13`), the catch punch-in (`strips/high/R09`) and grounded bodies (`crops/high/R12-carrier`) put this above Codex's flat procedural 5. Against axis-3 and cfb26-4, the no-contact line keeps it well below 7. 5.5 (mean +0.25).

### UI / HUD (6.0 / 7.0, proposed 6.5)
- **Concede: three overlaps are real.**
  - The FG meter in `high/desktop/R16` covers the holder and the line; only the kicker's legs and the ball show.
  - The `high/desktop/R12` toast (y about 645–745) covers the lower half of the pile area.
  - Panel dead space below the button in `high/desktop/R05` and `high/desktop/R16`.
- **Rebut (Claude): toasts sit "on the play" as a pattern.**
  - In `high/desktop/R21` the toast sits well below the huddle and defense.
  - In `medium/landscape/R21` the huddle sits entirely above the toast.
  - In `medium/landscape/R12`, which Claude cites as occlusion evidence, the tackle bodies around x 600–670, y 520–600 are fully above the toast's top edge (y about 620). That capture shows no occlusion.
  - In `high/desktop/R14`, the celebrants' feet end at about y 615–620 and the toast begins at about y 628. "Cuts across the group's legs" is wrong; at most it grazes the bottom of the feet.
- **Rebut (Claude): "everything below the button is blank" in `high/desktop/R14`.** That panel carries a three-entry drive log down to about y 330.
- **Concede (Claude): no on-field marker for the user's defender in `high/desktop/R05`.**
- **Strengths both critics accept.** A clean scorebug, dashed route art and shape badges (`high/desktop/R04`), headline and subtitle toasts (`high/desktop/R21`), and the play list with diagrams (`high/desktop/R22`).
- **Score.** The FG meter and the R12 occlusion are real and specific, which argues against Codex's 7. The pattern is narrower than Claude says. 6.5, the mean.

### Typography (6.5 / 7.0, proposed 7.0)
- **Concede: the "HOME" tag is small.** It is about 9 px in `high/desktop/R04`.
- **Rebut (Claude): two of the three "weak spots" aren't HUD typography.**
  - The in-world scoreboard's "DOWN / TO GO / BALL ON" labels (`high/desktop/R16`) are an in-world asset seen at stadium distance, as on a real HS board. Its digits read.
  - The "1ST & 10" field decal (`high/desktop/R06`, `high/desktop/R20`) is field paint, not a HUD style, and occlusion by players is normal for paint.
- **What's visible.** One condensed display face for titles, toasts, scorebug names and buttons, and a humanist sans for body text:
  - `high/desktop/R21`: a toast headline about 28 px cap height over a 16 px subtitle.
  - `high/desktop/R22`: play titles, descriptions and RUN/PASS tags.
  - `medium/mobile/R22`: the same pair scaled up for the phone.
  - Score numerals are about 30 px. Nothing is clipped in any frame I opened.
- **Score.** Against madden26-3 and legendbowl-4, this meets the 7 anchor's "consistent display/condensed pair, clear scale, numerals at a glance". 7.0 (mean +0.25).

### Readability (6.0 / 6.0, proposed 6.0): conceded
- **Concede: badges float off their players.** In my 4× zoom of `high/desktop/R04`, the "5" star sits about 42 px above the RB, over the LB/DL row, and "4" floats between the TE and a defender. In `medium/mobile/R04` the star lands on the OL.
- **Concede: portrait results hide the offense.** In `medium/mobile/R21` only the defense, the ball and an official are in view.
- **Strengths are real.** In `high/desktop/R08` the ball is enlarged, with a "2" badge and a ground ring on the target. The carrier plate reads in `high/desktop/R10` and `medium/mobile/R10`.
- **Partial rebut (Claude): "the view above y ≈ 300 is all sky" in `high/desktop/R04`.** About y 75–300 is sky and ridge, but the stadium and scoreboard fill y 300–440. The brief's lens shift is visible. Players are still small.
- **Score.** 6.0, no change.

### Mobile (6.5 / 6.0, proposed 6.5)
- **Concede: portrait results hide the offense** (`medium/mobile/R21`).
- **Concede: three of five receivers sit on edge badges in portrait** (`medium/mobile/R04`).
- **Concede (Codex): weak scroll cue on the play-call screen.** `medium/mobile/R22` shows six cards with no sign that more follow.
- **Concede (Codex): the landscape panel takes about 30% of the width** (`medium/landscape/R08`).
- **Rebut (Codex): "the secondary diagram" framing.** In `medium/landscape/R08` the panel also holds JUKE, the primary live control.
- **Rebut (both): landscape framing is deliberate.**
  - `medium/landscape/R04` shows all five receivers on screen, each with a badge and route art, with linemen at about 25–30 CSS px.
  - `medium/landscape/R21` and `medium/landscape/R12` keep the action above the toast.
- **Performance passes with a large margin.** The phone proxy runs at 87 fps minimum against the 30 fps bar.
- **Thumb-sized controls.** HIKE, CONTINUE and JUKE are thumb-sized in `medium/mobile/R04`, `medium/mobile/R21` and `medium/mobile/R10`.
- **Score.** Codex's 6.0 discounts the intentional landscape framing. 6.5 (mean +0.25).

### Authenticity (6.0 / 6.5, proposed 6.5)
- **Concede: no band, student section, cheer squad or chain crew** in any capture I opened.
- **Concede: thin backdrops.** The end-zone backdrops at Hot Springs are grey or dark slabs (`high/desktop/R14`, `high/desktop/R12`), the trees are flat cones (`high/desktop/R15`), and Jessieville is sparse (`high/desktop/R20`).
- **Rebut (Claude): "Wolf Stadium's press box faces an empty bleacher" (`high/desktop/R03`).** No empty bleacher is visible.
  - In `high/desktop/R03`, the building with lit windows and a gold trim band sits behind the end zone, not facing a stand.
  - `crops/high/R03-slot_QB`, the same moment, shows a filled stand on the left.
  - Codex reads this correctly ("school building behind the end zone").
- **Rebut (Claude): "the visitor side is a small stand".** It is a populated stand: `high/desktop/R13` and `high/desktop/R15` show a filled, mixed-colour visitor crowd. The block trees behind it are a fair point.
- **Local identity is strong.**
  - Joe C. Reese home grandstand with an orange and black crowd (`high/desktop/R01`, `crops/high/R01-crowd`).
  - A small HS scoreboard reading HSHS/LHHS.
  - Spa City play names (`high/desktop/R22`).
  - Home end-zone wordmarks (Hot Springs, Lake Hamilton, Lakeside, Jessieville) and H goalposts with pads.
- **Score.** The gate is 6 and both critics pass it. 6.5 (mean +0.25).

## Plain factual errors
- **Claude: the empty bleacher at Wolf Stadium.** `high/desktop/R03` and `crops/high/R03-slot_QB` show the building behind the end zone and a filled stand.
- **Claude: players' gloves are mittens.** Split fingers are visible in `crops/high/R06-slot_C-side` and `crops/high/R12-carrier`; only the officials have blob hands.
- **Claude: the R14 toast "cuts across the group's legs".** In `high/desktop/R14` the feet end above the toast's top edge.
- **Claude: `medium/landscape/R12` as evidence that the toast covers the play.** The pile sits fully above the toast.
- **Claude: the panel is blank below the button in R14.** `high/desktop/R14` has a drive log.
- **Claude: the field is lit "flat, with no pools".** `high/desktop/R02` and `high/desktop/R17` show uneven field luminance.
- **Codex: R13 shows no readable collapse.** In `strips/high/R13` frames 5–8 the plate drops and the legs splay.
- **Codex (in the build's favour): "raised arms" in `crops/high/R09-slot_Z`.** Only one forearm is raised.

## Gaps: adjusted severity and gain
Gains overlap and are not additive. Several Codex and Claude gaps are duplicates: G-contact-weight overlaps G-pass-pro-no-contact; G-player-anatomy overlaps G-cloth-materials and G-official-and-hand-models; G-light-integration duplicates G-light-pools-and-falloff; G-venue-life duplicates G-venue-void-and-staging.

### Claude's gaps

| Gap | Severity | Gain | Reason |
|---|---|---|---|
| G-toast-occludes-play | 4 → 3 | 0.5 → 0.3 | Real in `high/desktop/R12` and `high/desktop/R16` and partly in the strips. Absent in `high/desktop/R21`, `medium/landscape/R12` and `medium/landscape/R21`. |
| G-pass-pro-no-contact | 4 (kept) | 0.75 (kept) | Conceded in full. |
| G-venue-void-and-staging | 4 → 3 | 0.5 (kept) | Missing band and students conceded. "Void" is not universal: R03 has a building. |
| G-badge-detached | 3 (kept) | 0.5 → 0.3 | Real, but small players also cap readability. |
| G-official-and-hand-models | 3 → 2 | 0.5 → 0.3 | Player gloves already have fingers, and officials already have striped shirts and caps. What remains is the official body. |
| G-cloth-materials | 3 (kept) | 0.5 → 0.3 | Overlaps G-player-anatomy. |
| G-light-pools-and-falloff | 3 (kept) | 0.5 → 0.3 | Pools exist but are weak. Unlit structures conceded. |
| G-portrait-result-framing | 3 (kept) | 0.5 (kept) | Conceded. |
| G-cloned-poses | 2 (kept) | 0.3 (kept) | Conceded. |
| G-qb-windup-legibility | 2 → 1 | 0.3 → 0.1 | The cocked ball is visible in `crops/high/R07-slot_QB`. |
| G-panel-dead-space | 2 (kept) | 0.3 → 0.2 | R14 and R12 have drive logs. |

### Codex's gaps

| Gap | Severity | Gain | Reason |
|---|---|---|---|
| G-contact-weight | 5 → 4 | 1.0 → 0.5 | The collapse reads in `strips/high/R13`. Wrap and drive are missing. |
| G-player-anatomy | 4 (kept) | 1.0 → 0.5 | Anatomy alone won't lift art by a full point while the officials and venue dressing hold it back. |
| G-phone-framing | 4 → 3 | 1.0 → 0.5 | Landscape framing (`medium/landscape/R04`) is deliberate. Portrait edge badges are by design. Performance passes. |
| G-run-block-weight | 4 → 3 | 0.5 → 0.3 | Overlaps G-cloned-poses. |
| G-venue-life | 3 (kept) | 0.5 (kept) | Conceded. |
| G-light-integration | 3 (kept) | 0.5 → 0.3 | Duplicates G-light-pools-and-falloff. |

```json
{
  "loop": 11,
  "role": "advocate",
  "tier": "high",
  "scores": {
    "art": {
      "score": 6.0,
      "confidence": 0.8,
      "evidence": [
        { "shot": "crops/high/R03-slot_QB", "note": "official is a capsule figure with blob hands (conceded)" },
        { "shot": "crops/high/R06-slot_C-side", "note": "player gloves have separate thumb and fingers; Claude's 'mitten gloves' is wrong for players; angular torso crease conceded" },
        { "shot": "crops/high/R14-carrier", "note": "glossy helmets vs matte jersey; faceted shoulder on #74 (conceded)" },
        { "shot": "crops/high/R12-carrier", "note": "bodies clip; orange pants have plastic sheen (conceded)" },
        { "shot": "crops/high/R01-crowd", "note": "varied shirts and poses; reads as people" }
      ]
    },
    "lighting": {
      "score": 6.5,
      "confidence": 0.75,
      "evidence": [
        { "shot": "high/desktop/R02", "note": "fanned multi-shadows; uneven field luminance contradicts 'no pools'" },
        { "shot": "high/desktop/R17", "note": "field brightness varies; end-zone structures unlit (conceded)" },
        { "shot": "crops/high/R18-turf_26_67_40", "note": "wet specular present, concentrated in one hotspot" },
        { "shot": "high/desktop/R15", "note": "carrier in focus; blur falls on the background (DOF), not the subject" }
      ]
    },
    "animation": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        { "shot": "strips/high/R13", "note": "carrier plate drops from frame 5 and legs splay in frames 7-8; collapse is legible, wrap/drive is not" },
        { "shot": "strips/high/R09", "note": "frame 4 punch-in with one arm reaching; toast covers only the bottom of frames 6-8" },
        { "shot": "crops/high/R07-slot_QB", "note": "ball visibly cocked at the helmet; OL/DL upright with no contact (conceded)" },
        { "shot": "crops/high/R06-slot_DL2-side", "note": "cloned DL stance, hovering down hand (conceded)" }
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.75,
      "evidence": [
        { "shot": "high/desktop/R16", "note": "FG meter covers holder and line (conceded)" },
        { "shot": "high/desktop/R12", "note": "toast covers lower pile area (conceded)" },
        { "shot": "high/desktop/R21", "note": "toast clear of the action, strong hierarchy" },
        { "shot": "medium/landscape/R12", "note": "pile fully above the toast; does not support the occlusion claim" },
        { "shot": "high/desktop/R14", "note": "feet end above the toast; panel carries a drive log" }
      ]
    },
    "typography": {
      "score": 7.0,
      "confidence": 0.7,
      "evidence": [
        { "shot": "high/desktop/R21", "note": "condensed headline about 28 px cap height over a 16 px subtitle" },
        { "shot": "high/desktop/R22", "note": "consistent display/sans pair, run/pass tags, nothing clipped" },
        { "shot": "medium/mobile/R22", "note": "same pair scales cleanly to phone" },
        { "shot": "high/desktop/R04", "note": "small HOME tag conceded; field decal and in-world board are not HUD type" }
      ]
    },
    "readability": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        { "shot": "high/desktop/R04", "note": "star and 4 badges float over defenders (conceded, verified at 4x)" },
        { "shot": "high/desktop/R08", "note": "enlarged ball, target badge and ground ring" },
        { "shot": "medium/mobile/R10", "note": "carrier plate reads clearly" },
        { "shot": "medium/mobile/R21", "note": "offense out of view (conceded)" }
      ]
    },
    "mobile": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        { "shot": "medium/landscape/R04", "note": "all five receivers in view with badges and routes; deliberate framing" },
        { "shot": "medium/landscape/R21", "note": "huddle fully above the toast" },
        { "shot": "medium/mobile/R04", "note": "thumb-sized HIKE; 3 of 5 receivers on edge badges (conceded)" },
        { "shot": "medium/mobile/R21", "note": "portrait result hides the offense (conceded)" },
        { "shot": "medium/landscape/R08", "note": "panel about 30% of width (conceded) but holds the primary JUKE control; phone proxy 87 fps minimum" }
      ]
    },
    "authenticity": {
      "score": 6.5,
      "confidence": 0.65,
      "evidence": [
        { "shot": "high/desktop/R03", "note": "school building with lit windows behind the end zone; no empty bleacher visible" },
        { "shot": "crops/high/R03-slot_QB", "note": "filled stand at Wolf Stadium" },
        { "shot": "high/desktop/R01", "note": "home grandstand, towers, ridge backdrop, HS scoreboard" },
        { "shot": "high/desktop/R13", "note": "populated visitor stand; identical bench row" },
        { "shot": "high/desktop/R14", "note": "dark slab behind the end zone; no band or students (conceded)" }
      ]
    }
  },
  "gaps": [
    { "id": "G-toast-occludes-play", "category": "ui", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R12", "high/desktop/R16", "strips/high/R10", "high/desktop/R21", "medium/landscape/R12"], "benchmark": "madden26-3", "fix": "Move the FG meter below the kicker and push the R12-type result toast up or reframe the result camera; toasts are already clear in R21 and landscape R12/R21, so target the tackle-pile and kick cases specifically." },
    { "id": "G-pass-pro-no-contact", "category": "animation", "expectedGain": 0.75, "severity": 4, "effort": "M", "workstream": "WS4", "evidence": ["crops/high/R07-slot_QB", "strips/high/R07", "high/desktop/R08"], "benchmark": "axis-3", "fix": "Pair each OL with a rusher: kick-slide, arms extended into the chest plate, about 15 deg forward pad level, locked contact with DL lean and lateral shuffle; 2-3 rush variants (bull, swim, rip)." },
    { "id": "G-venue-void-and-staging", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS2", "evidence": ["high/desktop/R14", "high/desktop/R12", "high/desktop/R15"], "benchmark": "cfb26-1", "fix": "Dress the Hot Springs end zones (fieldhouse/fence with banners, lit structure); add a band block and a student section in the home stand; cheerleaders and chain crew on the track. R03 already has an end-zone building to model on." },
    { "id": "G-badge-detached", "category": "readability", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R04", "high/mobile/R04", "medium/mobile/R04"], "benchmark": "axis-1", "fix": "Cap the badge's screen-space offset to about one helmet height above the head and add a 1 px tether, or place the shape inside a ground ring under the receiver." },
    { "id": "G-official-and-hand-models", "category": "art", "expectedGain": 0.3, "severity": 2, "effort": "M", "workstream": "WS3", "evidence": ["crops/high/R03-slot_QB", "crops/high/R14-carrier"], "benchmark": "axis-3", "fix": "Put officials on the player body rig with real hands (they already have striped shirts and caps); smooth faceted shoulder-pad silhouettes. Player gloves already have fingers (crops/high/R06-slot_C-side)." },
    { "id": "G-cloth-materials", "category": "art", "expectedGain": 0.3, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["crops/high/R12-carrier", "crops/high/R04-slot_QB"], "benchmark": "legendbowl-1", "fix": "Raise pants roughness to about 0.85 with a weave normal map; add fold/wrinkle normals at the jersey waist and armpits." },
    { "id": "G-light-pools-and-falloff", "category": "lighting", "expectedGain": 0.3, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["high/desktop/R14", "high/desktop/R17", "high/desktop/R02"], "benchmark": "cfb26-3", "fix": "Strengthen the existing per-tower pools (variation is visible in R02/R17 but weak); light the near faces of stands and end-zone structures, fading to dark above; lower the sky toward a night exposure." },
    { "id": "G-portrait-result-framing", "category": "mobile", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/mobile/R21", "medium/mobile/R21"], "benchmark": "retrobowl-1", "fix": "Centre the portrait result camera on the ball spot with about 8 yd of backfield visible above the toast so the offense stays in frame." },
    { "id": "G-cloned-poses", "category": "animation", "expectedGain": 0.3, "severity": 2, "effort": "M", "workstream": "WS4", "evidence": ["strips/high/R11", "crops/high/R06-slot_DL2-side", "high/desktop/R15"], "benchmark": "madden26-4", "fix": "Per-player stance offsets (width, head angle), plant the down hand on the turf, bench idle variants with uneven spacing." },
    { "id": "G-qb-windup-legibility", "category": "animation", "expectedGain": 0.1, "severity": 1, "effort": "S", "workstream": "WS4", "evidence": ["high/desktop/R07", "crops/high/R07-slot_QB"], "benchmark": "axis-3", "fix": "The cocked-ball pose already exists (crops/high/R07-slot_QB); at most raise the QB slightly in frame during the drop so the ball reads at frame scale." },
    { "id": "G-panel-dead-space", "category": "ui", "expectedGain": 0.2, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R05", "high/desktop/R16"], "benchmark": "axis-1", "fix": "Show the drive log (already present on result screens such as R14) during pre-snap defense and kicks, or collapse the panel to content height." },
    { "id": "G-contact-weight", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "L", "workstream": "WS4b", "evidence": ["strips/high/R13", "crops/high/R12-carrier"], "benchmark": "cfb26-4.jpg", "fix": "The recoil and drop already read in R13 frames 5-8; add the missing wrap and drive (shoulder engagement, hand placement on the carrier) and resolve body interpenetration on the ground." },
    { "id": "G-player-anatomy", "category": "art", "expectedGain": 0.5, "severity": 4, "effort": "L", "workstream": "WS3", "evidence": ["crops/high/R04-slot_QB", "crops/high/R06-slot_C-side"], "benchmark": "axis-3.jpg", "fix": "Refine shoulder, pelvis and knee structure and deformation; reduce facemask thickness and add restrained uniform folds." },
    { "id": "G-phone-framing", "category": "mobile", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["medium/mobile/R04", "medium/landscape/R08", "medium/landscape/R04"], "benchmark": "retrobowl-1.jpg", "fix": "Narrow the landscape live panel (keep JUKE), and add a scroll cue to the portrait play-call grid; landscape pre-snap framing (R04) is already deliberate and need not change." },
    { "id": "G-run-block-weight", "category": "animation", "expectedGain": 0.3, "severity": 3, "effort": "L", "workstream": "WS4", "evidence": ["strips/high/R10", "strips/high/R11"], "benchmark": "madden26-4.jpg", "fix": "Add planted contact feet, staggered blocking bases, hip rotation, deceleration and outside-foot loading before cuts." },
    { "id": "G-venue-life", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["crops/high/R01-crowd", "high/desktop/R20"], "benchmark": "cfb26-1.jpg", "fix": "Vary spectator proportions and poses, establish a student and band section, and dress bleacher access and sidelines with school-scale equipment." },
    { "id": "G-light-integration", "category": "lighting", "expectedGain": 0.3, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["high/desktop/R01", "crops/high/R18-turf_26_67_40"], "benchmark": "cfb26-4.jpg", "fix": "Duplicate of G-light-pools-and-falloff: tune pool overlap, background exposure and wet roughness variation so the hotspot spreads; R15 replay focus is already on the subject." }
  ],
  "verdict": "continue"
}
```
