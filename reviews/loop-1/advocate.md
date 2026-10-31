# Advocate, loop 1, High tier

Capture paths are relative to `games/football/screenshots/review-loop-1/`; benchmark names refer to `games/football/benchmarks/`. I opened every capture and benchmark cited below. Where a claim was disputed, I zoomed in (an R19 and R04 lower-field crop at 2×).

Critic means: art 4.75 · lighting 6.25 · animation 4.25 · ui 6.0 · typography 6.5 · readability 6.0 · mobile 5.75 · authenticity 5.75.

## Summary

Most of what the critics say holds up. The v2 bodies are faceted, with block hands and box feet. The crowd is cuboids with diamond heads. Tackles end in planks, and the celebration is one pose, cloned. The aerial kick cameras look into a dark bowl. I concede all of that.

The critics do make five kinds of error:
- **Rebuttable occlusion examples.** Several cited result-banner "occlusions" don't occlude anything: `high/mobile/R21`, `high/desktop/R21` and `high/desktop/R16`.
- **A strip sampling gap read as animation.** Codex reads a jump in `strips/high/R10` as a missing fall, but the scoreboard clock shows the strip skipped time there.
- **Wrong cause.** The "empty" establishing shot is a lighting and camera problem. The crowd exists in the same frozen moment (`crops/high/R01-crowd`).
- **A deliberate atmosphere penalized.** The mist in `high/desktop/R19` is intended, and the frame is the best-lit in the set.
- **Uncredited strengths.** Neither critic credits the defensive play art (`high/desktop/R05`), the sideline down marker, or that touch builds already hide keyboard hints on every primary button except TIMEOUT.

None of this lifts any category to its gate. It does justify a half point on lighting, UI, mobile and authenticity, and the higher of the two critics on art and animation.

---

## Art (Claude 5.0, Codex 4.5) → proposed 5.0

**Concede.**
- **Player bodies.** `crops/high/R03-slot_QB`, `crops/high/R04-slot_C`, `crops/high/R06-slot_LG` and `crops/high/R16-slot_K` all show faceted torsos, straight cylinder shins, mitten-block hands and rectangular feet.
- **Official.** The official in `crops/high/R03-slot_QB` has a featureless black head.
- **Crowd.** `crops/high/R01-crowd` is orange, white and black cuboids topped with diamonds. That is the 5 anchor's "colored blocks" verbatim.
- **Garbled numerals.** These are real and widespread:
  - "06" for 90 on the DT in `crops/high/R04-slot_C`.
  - "oe" and "ae" on the white fronts in `crops/high/R03-slot_QB`.
  - A mirrored "63" in `crops/high/R06-slot_C`.
  - An inverted "47" on the downed tackler in `crops/high/R12-carrier`.
  - A lone "e" in `crops/high/R14-carrier`.
- **Trees.** The tree line is flat-shaded cones (`crops/high/R13-carrier`, `high/desktop/R15`).

**Partial rebuttals.**
- **Claude says the numerals are "away (white) jersey numbers."** That is over-scoped in both directions. Some white fronts read correctly ("57" on the right DT in `crops/high/R04-slot_C`). Home backs are also hit ("08" on a black back in `crops/high/R03-slot_QB`). The defect is per-decal orientation, not per-kit.
- **Codex at 4.5 doesn't credit three items from the 7 anchor that are visible.**
  - **Glossy helmet against matte jersey.** Clear clearcoat highlights on the black helmets in `crops/high/R14-carrier` and `crops/high/R04-slot_QB`.
  - **Turf texture at field level.** Grain and mowing bands in `crops/high/R04-turf_26_67_42`.
  - **A venue that reads as built objects.** The fieldhouse/press box with lit windows in `high/desktop/R03`, the light towers, and the scoreboard on posts in `crops/high/R01-board`.

  The 5 anchor explicitly says "no gloss, no texture detail". This build has both, so it can't sit below 5.
- **At the mid-distance gameplay scale the style is consistent and clean.** See `crops/high/R04-turf_26_67_42`, where silhouettes, helmet stripes, numbers and shadows read well. This is legendbowl-1's "style-consistent" argument at small scale, though the close-ups break it.

**Score.** 5.0. Body and crowd geometry hold the score at 5. Material, turf and venue keep it from 4.5. axis-3 (smooth bodies, a crowd of people) remains well ahead.

## Lighting & atmosphere (Claude 6.0, Codex 6.5) → proposed 6.5

**Concede.**
- **Aerial cameras.** These look into an unlit bowl with tower silhouettes and no bloom (`high/desktop/R01`, `high/desktop/R02`, `high/desktop/R17`).
- **Haze veil.** `high/desktop/R07` and `strips/high/R07` carry a tan veil over the upper left.
- **Rain at the gameplay camera.** Rain doesn't read wet from there: no lamp streaks, the same green (`high/desktop/R18`). In the close-up, the puddles glitter, and the spray is visible white squares at the players' feet (`crops/high/R18-turf_26_67_40`).
- **Replay focus.** Replays are soft across the whole frame, the carrier included (`high/desktop/R13`, `high/desktop/R15`, `strips/high/R13`).
- **Codex: field paint blooms in R19.** Confirmed at 2× zoom on the lower field of `high/desktop/R19`. The near "20" numeral and the bottom hash marks carry a halo that the same region of `high/desktop/R04` doesn't.

**Rebuttals.**
- **Claude makes the void sound frame-wide. It is camera-specific.** At every lower camera the lamp banks bloom and the field-to-stand falloff is right:
  - `high/desktop/R03`, `high/desktop/R04`, `high/desktop/R20` and `high/desktop/R22`.
  - In `high/desktop/R04`, the left bleacher picks up warm light while the outfield wall falls off to dark.

  So of the 7 anchor's five items, three are met at the gameplay cameras: several soft shadows per player (`high/desktop/R02`, `crops/high/R16-slot_K`), bloom on the lamps, and falloff from field to stands. Wet sheen is partial: it's there in the close-up, not at the broadcast camera.
- **Codex calls R19's background "washed-out."** That is the intended mist. The ridge layers recede in aerial perspective and the towers glow through the fog. Claude independently calls `high/desktop/R19` "the best-looking capture in the set." Only the paint bloom is a defect there.

**Score.** 6.5. The real shadows and lamp bloom at the cameras the player uses most put this above the 5 anchor and near the 7. The aerial void, the rain read and the replay focus keep it off 7. Benchmark: cfb26-3 remains far ahead in bowl light.

## Animation & game feel (Claude 4.5, Codex 4.0) → proposed 4.5

**Concede.**
- **QB.** The QB stands upright with the ball on the turf beside him during the "wind-up" (`crops/high/R07-slot_QB`). That is a real handling defect.
- **Receiver.** The receiver's arms are down as the ball arrives (`crops/high/R09-slot_Z`).
- **Tackle.** The tackle ends in two rigid planks with a third player straddling them (`crops/high/R12-carrier`).
- **Celebration.** Every celebrant shares one arms-up pose (`crops/high/R14-carrier`).
- **Feel accents.** There is no punch-in or slow motion in any strip.

**Rebuttals.**
- **Codex: R10 "becomes prone between panels 5 and 6 without wrap, loss of balance, descent."** The strip doesn't support that claim.
  - The in-world scoreboard reads 3:20 in panels 1–5 and 3:18 in panels 6–8 of `strips/high/R10`. The "NO GAIN" banner first appears in panel 6.
  - At least a second of game time passed across that one gap, against fractions of a second between the others. The strip skipped the descent; it doesn't show a pose pop.
  - The plank end-state is still confirmed by `crops/high/R12-carrier`, so the gap stands. Its evidence is weaker than claimed.
- **Claude: the R11 carrier is in a "split leap … floaty, not a planted cut" (`crops/high/R11-carrier`).** A sprinter at full speed has a flight phase with both feet off the ground, so airborne alone isn't a defect. What is visibly wrong is the over-long stride and the upright, unleaned torso.
- **Claude: the R09 receiver "has his back to the ball."** The close-up camera sits behind the receiver, who runs his route away from the QB. The visible defect is no head turn and no arm reach, not his facing.
- **Neither critic credits what does read.**
  - **Locomotion.** The live run cycle has knee lift and opposite arm–leg swing (`crops/high/R10-carrier`).
  - **Stances.** These are distinct per role: three-point line stances in `crops/high/R04-slot_C` and `crops/high/R06-slot_C`, and the kneeling holder with the kicker set in `crops/high/R16-slot_K`.
  - **Pass flight.** At broadcast scale, the ball's flight from the pocket to the target ring is legible across panels 3–8 of `strips/high/R09`.

  That is the 5 anchor's "procedural cycles that read". The defects (stiff falls, floaty contact, cloned celebration) are the 5 anchor's own list, plus one handling bug.

**Score.** 4.5. It is below 5 because of the R07 ball-on-turf bug and the plank falls. It isn't 4, because the 3 anchor's "rigid pose swaps, no contact" isn't what the strips show. Benchmarks: madden26-4 and cfb26-4 (stills) remain far ahead.

## UI / HUD (Claude 6.0, Codex 6.0) → proposed 6.5

**Concede.**
- **Carrier tag.** "20 KEMP" floats over the standing official while Kemp is down in the pile below (`high/desktop/R12`).
- **Duplicated result text.** The heading is repeated in the side panel (`high/desktop/R12`, `high/desktop/R21`, `high/desktop/R14`).
- **Panel dead space.** The panel is nearly empty during kicks (`high/desktop/R01`, `high/desktop/R17`).
- **Clipped play list.** Card 0 is cut at the bottom of the play list (`high/desktop/R03`, `high/desktop/R22`).
- **No play clock.** axis-1 shows ":22".

**Rebuttals and factual errors.**
- **Claude cites `high/mobile/R21` as the lower-third "covering the play." That is wrong.** In that frame the banner sits over empty turf below the huddle; no player is under it. The same holds on desktop `high/desktop/R21`.
- **Claude cites `high/desktop/R16` in the banner gap. That is the wrong element.** It is the interactive kick meter. It sits below the holder and kicker and occludes no one.
- **On desktop `high/desktop/R12` the banner overlaps the legs of one trailing player, not the pile.** Only `high/mobile/R12` covers the pile.
- **Neither critic credits the defensive pre-snap card in `high/desktop/R05`.** It shows the blitz in red X's with rush lanes against the offense's set. Along with the shape-coded receiver tags and route art (`high/desktop/R04`, `high/desktop/R19`) and the painted "1ST & 10" on the turf, this meets the 7 anchor's "clear pre-snap identification" on both sides of the ball. axis-1 has numbered icons. These have numbered, shape-coded icons; they lack name tags.
- **Two more of the 7 anchor's items are met.**
  - **Scorebug.** It carries the possession ball, timeout dots, clock and down-and-distance, in team-color bars (`high/desktop/R04`).
  - **Result banners with hierarchy.** "TOUCHDOWN!" over "20-YD RUN" in `high/desktop/R14`.
  - **Still failing.** "Nothing stale or overlapping" fails on R12.

**Score.** 6.5. Three of the 7 anchor's four items are met. One frame's overlap plus the panel's dead space keep it off 7. Benchmarks: axis-1, madden26-3.

## Typography (Claude 6.5, Codex 6.5) → proposed 6.5

**Concede.**
- **Scoreboard face.** The in-world scoreboard digits are a slab monospace ("4:00", "1", "10", "25" in `crops/high/R01-board`).
- **Clipped play name.** "Fountain Play-Action" is clipped at the panel bottom (`high/desktop/R03`).
- **Orphan line on mobile.** A lone "32." wraps onto its own line (`high/mobile/R14`).
- **Shallow scale.** The heading-to-log scale is shallow in the side panel (`high/desktop/R12`).

**Partial rebuttal.**
- **The scoreboard is a 3D prop.** At gameplay scale it is about 100 px wide (`high/desktop/R04`), and its team labels are a clean bold sans.
- **The rubric's typography anchor is the UI type system.** That system is one condensed display face throughout: `high/desktop/R14`, `high/desktop/R21`, `high/mobile/R22`, and clock and score numerals that read at a glance in `high/desktop/R04`.

Low severity, as Claude rated it. Score held at 6.5. Benchmarks: madden26-3, cfb26-1.

## Readability (Claude 6.0, Codex 6.0) → proposed 6.0

**Concede.**
- **Replays.** These are soft enough that the carrier takes effort to find (`high/desktop/R13`, `high/desktop/R15`). The carrier ring is visible in both, but it sits slightly off the carrier, as Claude also notes in `crops/high/R11-carrier`.
- **Mobile.** The edge receivers clip in `high/mobile/R04`, and the banner covers the pile in `high/mobile/R12`.

**Credit.**
- **Desktop live frames read at a glance.**
  - **Ball and target.** The enlarged dark ball and cyan target ring in `high/desktop/R08`.
  - **Carrier.** Ring plus name tag in `high/desktop/R10`, `high/desktop/R11` and `high/desktop/R18`.
  - **Lines.** The blue line of scrimmage and the yellow first-down line are present in every gameplay frame.
- **Mobile live frames are good.** In `high/mobile/R10` and `high/mobile/R18`, "44 DELACROIX" is large and the ring is clear. In `high/mobile/R08` the ball and target ring are obvious.

**Score.** 6.0 is accurate. The 7 anchor asks for "every frame, both viewports", and replays plus two mobile frames fail it. Benchmarks: retrobowl-1, axis-1.

## Mobile (Claude 5.5, Codex 6.0) → proposed 6.0

**Concede.**
- **Dark band.** The top 14–16% of the viewport is a dark band (`high/mobile/R04` from y≈160 to y≈400 of 1688; `high/mobile/R08`).
- **Edge clipping.** Receivers 1 and 2 clip at the edges (`high/mobile/R04`).
- **Banner over the pile** (`high/mobile/R12`).
- **Keyboard hint.** "TIMEOUT (T)" on touch (`high/mobile/R12`, `high/mobile/R21`).
- **No landscape capture.**

**Rebuttals.**
- **Claude says the lower-third covers the play in `high/mobile/R21`. That is wrong.** It lies over empty turf below the huddle.
- **Claude says "figures are about 20 CSS px."** That's true at the pre-snap camera (`high/mobile/R04`). At the live camera the pile figures are about 30 CSS px, and the carrier tag is roughly button-sized text (`high/mobile/R10`, `high/mobile/R18`).
- **The keyboard-hint problem is one leak, not a pattern.** HIKE, CONTINUE and JUKE already drop their key chips on touch (`high/mobile/R04`, `high/mobile/R12`, `high/mobile/R10`); desktop shows "Space" and "J".
- **Performance meets the rubric.** Codex is right that no throttled High phone run exists. The brief names Medium as the phone tier, and `perf.json` shows Medium mobile at a 54.7 fps minimum under 4× CPU throttle, against the rubric's 30.

**Score.** 6.0. The thumb targets (`high/mobile/R04`, `high/mobile/R10`), the two-column play grid (`high/mobile/R22`) and the performance are all in place. The framing defects keep it from 7. Benchmarks: retrobowl-1, retrobowl-2.

## Authenticity (Claude 5.5, Codex 6.0) → proposed 6.0

**Concede.**
- **No band, no cheer line, and no lane-marked track.**
- **The sideline team is a cloned standing row** (`high/desktop/R13`).
- **Tree line.** The pines are cones (`high/desktop/R15`).

**Rebuttals.**
- **Claude: the establishing shot shows "a dark generic bowl with no visible people" (`high/desktop/R01`).** The people are there. `crops/high/R01-crowd`, the same frozen moment, shows a packed home stand in school colors. The R01 failure is lighting and camera (WS1), not missing staging.
- **Claude: "In the 3A Jessieville frame, the stands are sparse."** That is overstated. Both sideline bleachers in `high/desktop/R20` are populated, the left one densely, under two blooming light towers, with purple Jessieville end-zone lettering.
- **Uncredited small-town detail.**
  - An orange down-marker box on a pole at the far sideline (`high/desktop/R03`, `high/desktop/R04`, `high/desktop/R19`).
  - Team benches with players along both sidelines (`high/desktop/R02`, `high/desktop/R03`).
  - The fieldhouse building (`high/desktop/R03`).
  - The HSHS/LHHS scoreboard (`crops/high/R01-board`).
  - The Ouachita ridge backdrop.
  - Garland County opponents and Spa City play names.

**Score.** 6.0, which meets the gate. The occasion (band, cheer, students as people) is what cfb26-2 and legendbowl-4 add and this lacks.

---

## Gap adjustments

| Gap | Critic sev / gain | Advocate sev / gain | Reason |
|---|---|---|---|
| G-player-mesh-v3 | 5 / 1.5 | 5 / 1.5 | Agree. Confirmed in four close-ups. |
| G-anim-key-beats | 5 / 1.5 | 5 / 1.5 | Agree. The R07 ball-on-turf bug and the R09 missing reach are confirmed. |
| G-stadium-wide-void | 4 / 0.75 | 3 / 0.5 | Limited to the aerial kick cameras (R01, R02, R17). The lower cameras bloom and fall off correctly (R03, R04, R20). |
| G-crowd-people | 4 / 0.5 | 4 / 0.5 | Agree. |
| G-hs-staging | 3 / 1.0 | 3 / 0.75 | The R01 evidence is a lighting cause (the crowd exists in R01-crowd). Benches and a down marker exist. Band, cheer and track are missing. |
| G-jersey-numerals-flipped | 3 / 0.5 | 3 / 0.3 | Confirmed, but it affects both kits and only some decals. On its own it moves art little while the bodies are blocky. |
| G-replay-dof-focus | 3 / 0.5 | 3 / 0.5 | Agree. The whole frame is soft in R13 and R15. |
| G-carrier-tag-anchor | 3 / 0.3 | 3 / 0.3 | Agree (R12). |
| G-result-banner-occlusion | 3 / 0.5 | 2 / 0.3 | R21 (both viewports) and R16 don't occlude. Only mobile R12 covers the pile. Duplication is real. |
| G-mobile-framing | 3 / 0.75 | 3 / 0.5 | Agree on the band and the clipping. Keyboard hints are already hidden except TIMEOUT. |
| G-rain-wet-read | 2 / 0.3 | 2 / 0.3 | Agree. |
| G-desktop-panel-dead-space | 2 / 0.3 | 2 / 0.3 | Agree. |
| G-board-font | 2 / 0.3 | 1 / 0.2 | It's an in-world prop at about 100 px in play. The UI type system is consistent. |
| G-tackle-grounding | 5 / 1.5 | 4 / 1.0 | The R10 strip evidence is a sampling gap (clock 3:20→3:18). The plank end state is confirmed by R12-carrier. It overlaps G-anim-key-beats. |
| G-player-construction | 5 / 1.5 | 5 / 1.5 | Duplicate of G-player-mesh-v3. Agree. |
| G-locomotion-handling | 4 / 1.0 | 4 / 0.75 | Handling is confirmed (R07 ball on the turf). The R11 flight phase isn't a defect by itself; the missing lean is. |
| G-camera-overlay-readability | 4 / 1.0 | 3 / 0.5 | Desktop live frames already read (R08, R10, R11). The failures are concentrated in replays and in mobile R04 and R12. |
| G-crowd-staging | 4 / 1.0 | 4 / 0.75 | Overlaps G-crowd-people and G-hs-staging. |
| G-post-control | 3 / 0.5 | 3 / 0.5 | The paint bloom in R19 is confirmed at zoom. The replay focus is confirmed. |
| G-presentation-density | 3 / 0.5 | 2 / 0.3 | The R22 list is legible with clear RUN/PASS tags; only the last card clips. The mobile R12 banner depth is moderate. |

```json
{
  "loop": 1,
  "role": "advocate",
  "tier": "high",
  "verdict": "continue",
  "scores": {
    "art": {
      "score": 5.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "crops/high/R14-carrier", "note": "Glossy clearcoat helmets against matte jerseys: the material contrast in the 7 anchor is present, so this can't sit below the 5 anchor's 'no gloss'."},
        {"shot": "crops/high/R04-turf_26_67_42", "note": "Turf grain and mowing bands at field level; style is consistent at mid distance."},
        {"shot": "high/desktop/R03", "note": "Fieldhouse with lit windows, towers and goalposts read as built objects."},
        {"shot": "crops/high/R04-slot_C", "note": "Conceded: faceted bodies, block hands, box feet; '06' for 90 rotated."},
        {"shot": "crops/high/R01-crowd", "note": "Conceded: crowd is cuboids with diamond heads."}
      ]
    },
    "lighting": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R04", "note": "Lamp bloom, warm light on the bleacher, falloff from field to wall at the gameplay camera."},
        {"shot": "high/desktop/R02", "note": "Several soft shadows per player; the aerial bowl is dark (conceded)."},
        {"shot": "crops/high/R16-slot_K", "note": "Long double lamp shadows."},
        {"shot": "high/desktop/R19", "note": "Deliberate mist with good aerial perspective; the paint bloom halo is real (zoomed)."},
        {"shot": "high/desktop/R18", "note": "Conceded: rain not wet at the gameplay camera."},
        {"shot": "high/desktop/R13", "note": "Conceded: whole replay frame soft."}
      ]
    },
    "animation": {
      "score": 4.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "strips/high/R10", "note": "Clock 3:20 in panels 1-5, 3:18 in 6-8: the 5-to-6 jump is a sampling gap, not proof of a pose pop."},
        {"shot": "strips/high/R09", "note": "Ball flight to the target ring legible across panels 3-8; no catch reach."},
        {"shot": "crops/high/R10-carrier", "note": "Run cycle with knee lift and opposite arm-leg swing reads."},
        {"shot": "crops/high/R07-slot_QB", "note": "Conceded: QB upright with the ball on the turf."},
        {"shot": "crops/high/R12-carrier", "note": "Conceded: plank-flat stiff falls."},
        {"shot": "crops/high/R14-carrier", "note": "Conceded: cloned celebration pose."}
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.65,
      "evidence": [
        {"shot": "high/desktop/R04", "note": "Scorebug with possession, timeouts, clock, down-and-distance; shape-coded receiver tags; route art; painted 1ST & 10."},
        {"shot": "high/desktop/R05", "note": "Uncredited defensive pre-snap card with blitz lanes."},
        {"shot": "high/desktop/R14", "note": "Result banner with clear hierarchy."},
        {"shot": "high/mobile/R21", "note": "Banner over empty turf, not the play (Claude's occlusion claim is wrong here)."},
        {"shot": "high/desktop/R12", "note": "Conceded: carrier tag over the official; duplicated heading."}
      ]
    },
    "typography": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R14", "note": "Consistent condensed display face with deliberate weight."},
        {"shot": "high/mobile/R22", "note": "Card titles and RUN/PASS labels legible at 390 px."},
        {"shot": "crops/high/R01-board", "note": "Conceded: slab monospace digits on the in-world prop."},
        {"shot": "high/desktop/R03", "note": "Conceded: last play name clipped."}
      ]
    },
    "readability": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R08", "note": "Ball and cyan target ring read at a glance."},
        {"shot": "high/mobile/R10", "note": "Large carrier tag and ring on the phone live camera."},
        {"shot": "high/desktop/R15", "note": "Conceded: replay blur; ring slightly off the carrier."},
        {"shot": "high/mobile/R04", "note": "Conceded: edge receivers clipped."}
      ]
    },
    "mobile": {
      "score": 6.0,
      "confidence": 0.65,
      "evidence": [
        {"shot": "high/mobile/R10", "note": "Pile figures about 30 CSS px at the live camera; full-width JUKE; key chips hidden on touch."},
        {"shot": "high/mobile/R22", "note": "Two-column play grid with large targets."},
        {"shot": "high/mobile/R21", "note": "Banner clear of the huddle; TIMEOUT (T) hint leaks (conceded)."},
        {"shot": "high/mobile/R04", "note": "Conceded: about 14% dark band at the top; receivers 1 and 2 clipped."},
        {"shot": "high/mobile/R12", "note": "Conceded: banner covers the pile."}
      ]
    },
    "authenticity": {
      "score": 6.0,
      "confidence": 0.65,
      "evidence": [
        {"shot": "high/desktop/R20", "note": "Both Jessieville bleachers populated under blooming towers; purple end zone; not sparse."},
        {"shot": "crops/high/R01-crowd", "note": "Packed home stand in school colors exists in the same moment as the 'empty' R01 wide: the cause is lighting."},
        {"shot": "high/desktop/R03", "note": "Fieldhouse, benches on both sidelines, sideline down marker, ridge backdrop, Wolves end zone."},
        {"shot": "crops/high/R01-board", "note": "HSHS/LHHS small-school scoreboard."},
        {"shot": "high/desktop/R13", "note": "Conceded: cloned sideline row; no band, cheer or track."}
      ]
    }
  },
  "gaps": [
    {"id": "G-player-mesh-v3", "category": "art", "expectedGain": 1.5, "severity": 5, "effort": "L", "workstream": "WS3", "evidence": ["crops/high/R03-slot_QB", "crops/high/R04-slot_QB", "crops/high/R16-slot_K"], "benchmark": "axis-3", "fix": "Replace v2 figures with a smooth skinned body: modeled gloves/fingers, cleats, face under facemask, rolled shoulder-pad edges, jersey normal map with folds and seams; give officials faces and caps."},
    {"id": "G-anim-key-beats", "category": "animation", "expectedGain": 1.5, "severity": 5, "effort": "L", "workstream": "WS4", "evidence": ["crops/high/R07-slot_QB", "crops/high/R09-slot_Z", "strips/high/R09", "crops/high/R11-carrier", "crops/high/R12-carrier", "crops/high/R14-carrier"], "benchmark": "madden26-4", "fix": "Author blended key poses: QB set/load/release/follow-through tied to the release tick (ball stays in hand), receiver head turn and arm extension before arrival, torso lean and shorter strides on cuts, tackle wrap and fall variants, 4+ celebration poses; 0.6 s punch-in/slow-mo on catch and tackle contact."},
    {"id": "G-stadium-wide-void", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["high/desktop/R01", "high/desktop/R02", "high/desktop/R17"], "benchmark": "cfb26-3", "fix": "Limited to aerial kick cameras: light the bleacher geometry and crowd with lamp falloff and make lamp heads emissive with bloom from those cameras; lift the sky so the bowl silhouettes."},
    {"id": "G-crowd-people", "category": "art", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["crops/high/R01-crowd", "high/desktop/R15"], "benchmark": "axis-3", "fix": "Replace cuboid/diamond crowd with instanced impostor cards or low-poly people with heads, shoulders and raised arms, per-instance shirt colors, and a dense student section in school colors."},
    {"id": "G-hs-staging", "category": "authenticity", "expectedGain": 0.75, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["high/desktop/R13", "high/desktop/R20"], "benchmark": "cfb26-2", "fix": "Add a uniformed band block, cheer line, a lane-marked track ring, and varied sideline poses (helmets off, kneeling). R01's empty look is a lighting cause covered by G-stadium-wide-void."},
    {"id": "G-jersey-numerals-flipped", "category": "art", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS3", "evidence": ["crops/high/R04-slot_C", "crops/high/R03-slot_QB", "crops/high/R06-slot_C", "crops/high/R12-carrier", "crops/high/R14-carrier"], "benchmark": "madden26-4", "fix": "Fix per-decal UV orientation on both kits, front and back (some white fronts read correctly, some home backs do not); add a render test per kit and side."},
    {"id": "G-replay-dof-focus", "category": "readability", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["high/desktop/R13", "high/desktop/R15", "strips/high/R13"], "benchmark": "cfb26-4", "fix": "Focus replay DOF on the carrier distance, cap the circle of confusion so midground players stay sharp, blur only far stands."},
    {"id": "G-carrier-tag-anchor", "category": "ui", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R12", "high/mobile/R12"], "benchmark": "legendbowl-2", "fix": "Anchor the carrier tag to the carrier's current bounding-box top; drop it to the ring when the carrier is down."},
    {"id": "G-result-banner-occlusion", "category": "ui", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/mobile/R12", "high/desktop/R12"], "benchmark": "madden26-3", "fix": "Place the result banner away from the carrier's screen position (only mobile R12 actually covers the pile; R21 and R16 do not); replace the duplicate panel heading with drive context."},
    {"id": "G-mobile-framing", "category": "mobile", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["high/mobile/R04", "high/mobile/R08", "high/mobile/R12"], "benchmark": "retrobowl-1", "fix": "Fit the phone pre-snap camera to formation width plus margin and tilt out the dark top band; hide the remaining TIMEOUT (T) hint on touch (other buttons already hide keys); capture a landscape layout."},
    {"id": "G-rain-wet-read", "category": "lighting", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS5", "evidence": ["high/desktop/R18", "crops/high/R18-turf_26_67_40"], "benchmark": "cfb26-4", "fix": "Darken wet albedo, add lamp streak reflections visible from the broadcast camera, filter puddle normals to remove glitter, soft alpha splash sprites instead of white squares."},
    {"id": "G-desktop-panel-dead-space", "category": "ui", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R01", "high/desktop/R17", "high/desktop/R03"], "benchmark": "axis-1", "fix": "Collapse the side panel to an overlay chip during kickoff and punt; paginate or two-column the play list so no card clips."},
    {"id": "G-board-font", "category": "typography", "expectedGain": 0.2, "severity": 1, "effort": "S", "workstream": "WS7", "evidence": ["crops/high/R01-board"], "benchmark": "cfb26-1", "fix": "Render the in-world scoreboard digits in a 7-segment or dot-matrix LED face with emissive glow."},
    {"id": "G-tackle-grounding", "category": "animation", "expectedGain": 1.0, "severity": 4, "effort": "L", "workstream": "WS4b", "evidence": ["crops/high/R12-carrier", "strips/high/R10"], "benchmark": "cfb26-4", "fix": "Connected wrap, momentum, balance-loss and descent with body separation and turf contact. Note: the strips/high/R10 panel 5-to-6 jump spans a clock change (3:20 to 3:18), so verify with a denser strip."},
    {"id": "G-player-construction", "category": "art", "expectedGain": 1.5, "severity": 5, "effort": "L", "workstream": "WS3", "evidence": ["crops/high/R04-slot_C", "crops/high/R06-slot_LG"], "benchmark": "axis-3", "fix": "Duplicate of G-player-mesh-v3: coherent joints, gloves, cleats, fitted pads, cloth shaping, positional body variation."},
    {"id": "G-locomotion-handling", "category": "animation", "expectedGain": 0.75, "severity": 4, "effort": "L", "workstream": "WS4", "evidence": ["crops/high/R07-slot_QB", "strips/high/R11", "crops/high/R11-carrier"], "benchmark": "madden26-4", "fix": "Bind the ball to the hands through possession transitions; add directional lean, hip/shoulder rotation and speed-dependent stride length (a sprint flight phase alone is not a defect)."},
    {"id": "G-camera-overlay-readability", "category": "readability", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["high/mobile/R04", "high/mobile/R12", "high/desktop/R15"], "benchmark": "axis-1", "fix": "Keep phone formation edges in frame and banners off the carrier; desktop live frames already read (R08, R10, R11)."},
    {"id": "G-crowd-staging", "category": "art", "expectedGain": 0.75, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["crops/high/R01-crowd", "high/desktop/R20"], "benchmark": "legendbowl-4", "fix": "Overlaps G-crowd-people and G-hs-staging: human silhouettes with varied clothing and poses, aisles, student and band groupings."},
    {"id": "G-post-control", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["high/desktop/R19", "high/desktop/R15", "high/desktop/R07"], "benchmark": "cfb26-4", "fix": "Raise the bloom threshold so field paint does not halo in day/mist, keep lamp-bank structure, remove the tan haze veil in R07, widen replay focus."},
    {"id": "G-presentation-density", "category": "ui", "expectedGain": 0.3, "severity": 2, "effort": "M", "workstream": "WS7", "evidence": ["high/desktop/R22", "high/mobile/R12"], "benchmark": "madden26-3", "fix": "Stop the last play card clipping and remove redundant result text; the list itself is legible with clear RUN/PASS tags."}
  ]
}
```
