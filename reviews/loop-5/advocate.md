# Advocate response: loop 5 (High tier, desktop; mobile from phone captures)

Capture paths are relative to `games/football/screenshots/review-loop-5/`. I opened every capture cited below before ruling on it.

**Summary.** Most of what the two critics say is true, and I concede most of it. The new player model has real close-up defects. Tackles and catches don't show their contact beats. Phone result bands cover the play. On a few points the critics got the facts or the cause wrong:
- **The seven-segment "1" is correct rendering, not a spacing bug.** The board clock's "1" sits right in its cell, which is how real seven-segment boards draw it.
- **The ball reads in flight.** In all three R08 gameplay frames it sits against green turf. Only the close-up loses it against a jersey.
- **The "snap to prone" is a gap in the capture.** In the R09 and R10 strips, the game clock jumps two seconds between frames 5 and 6. The strip skipped the tackle, so it can't prove the motion pops.
- **The desktop result bands don't cover the action.** Neither does the portrait touchdown band.

My corrected scores stay within ±0.5 of the critics' means. Art, typography and readability come out slightly higher, and animation lands on the mean rounded up. Every category is still under its gate except authenticity, which is at its gate of 6. **Verdict: continue.**

Critic means: art 5.75, lighting 6.25, animation 4.75, ui 6.5, typography 6.75, readability 5.75, mobile 5.5, authenticity 6.0.

---

## Art (A 5.5, B 6.0; mean 5.75). Proposed: **6.0**

**Concede:**
- **Pants silhouette (A, gap 2).** The silhouette is balloon-like on every player. See `crops/high/R04-slot_QB` (#12, #44), `crops/high/R06-slot_C` (#10, #56) and `crops/high/R04-slot_C` (#69, whose seat is the largest shape in the frame).
- **Sleeve hems (A).** They are torn into sawteeth. In `crops/high/R06-slot_LG`, #20's hem and its orange/white stripe break into jagged spikes. The same spikes show on #65's hem in `crops/high/R06-slot_C-side`.
- **Gloves (A).** The gloves are rakes of long splayed tines (`crops/high/R06-slot_C-side`). A critic missed something here, and it makes the defect worse. The claws show even at gameplay distance: the raised hands in `high/desktop/R14` and `high/mobile/R14` read as black spiky crowns.
- **Facemask (A).** #65's orange bars stand off the shell with visible daylight between them and the helmet (`crops/high/R06-slot_C-side`).
- **Officials (A).** They are capsule bodies with a featureless black head, and the striped sleeve tubes float clear of the torso (`crops/high/R03-slot_QB`, foreground).
- **Ball in the pile (A).** It floats above the pile in `crops/high/R12-carrier` (also an animation fault).
- **Shoulders and folds (B).** The inflated shoulder mass and angular back folds in `crops/high/R04-slot_QB` are visible.

**Rebut or credit what the critics underweighted:**
- **The rubric's 7-anchor material criteria are met.** `crops/high/R03-slot_QB` shows glossy copper helmets with real specular hot spots next to matte brown jerseys. It also shows legible back numbers, pant stripes and sock stripes. `crops/high/R13-carrier` shows the Lakeside helmet decal, chest, back and sleeve numbers, and stripes all holding at about 3× gameplay scale. `crops/high/R04-slot_C` shows the center's hand on the ball, as the brief describes.
- **Turf and crowd.** The turf has visible grain at field level (`crops/high/R10-carrier`, `crops/high/R18-turf_26_67_40`). The crowd reads as people in school colours, many with raised arms (`crops/high/R01-crowd`). Critic A concedes both points.
- **Scope of the defects.** The failures are concentrated in hands, hems, the pants volume and the officials. They are not across the whole model, which is why I'd score above the 5 anchor ("palette-only materials, no gloss").
- **Body type and skin (A).** "Same uniform dark skin" is largely unverifiable. Arms are covered by coloured undersleeves (white in `crops/high/R06-slot_LG`, black in `crops/high/R04-slot_QB`), and no faces are visible. The one-body-type point stands.

6.0 is Critic B's score. It sits between the 5 anchor and the 7 anchor, which the close-ups fail.

## Lighting & atmosphere (A 6.0, B 6.5; mean 6.25). Proposed: **6.5**

**Concede:**
- **Rain (A).** The gameplay frame `high/desktop/R18` shows rain streaks over turf that looks dry. The splash particles in `crops/high/R18-turf_26_67_40` are hard white squares.
- **Replay smudge (A).** A dark vertical smudge rises from the bottom centre in `high/desktop/R13`, `high/desktop/R15` and frames 2–8 of `strips/high/R13`.
- **Bowl wall (A).** The wall and end-zone backdrop are a flat grey-black plane (`high/desktop/R04`, `high/desktop/R16`).
- **Corner haze (A).** The top corners of every panel in `strips/high/R07` are washed out by off-screen lamp glare.

**Rebut:**
- **Helmet highlights (A).** "No specular highlights on helmets" is true only at gameplay scale. `crops/high/R03-slot_QB` (copper helmets) and `crops/high/R06-slot_C-side` (navy helmet with a hot spot) show strong highlights.
- **Wet sheen (B).** B's "convincing wet specular" holds only for the close-up. A's "dry at gameplay" is the correct reading for `high/desktop/R18`. Both critics are describing the same rain from different distances.
- **Bloom on R19 (B).** "Painted field marks bloom into glowing patches" in `high/desktop/R19` is overstated. Only the near-edge numbers and hash marks along the bottom 10% are lifted. The rest of the field markings and the mist read coherently.
- **What the 7 anchor asks for.** These parts are present: soft per-player shadows from the light towers, lamp bloom, and believable night exposure. See `high/desktop/R04`, `high/desktop/R20` and the shadows fanning across the turf in `crops/high/R12-carrier`.

## Animation & game feel (A 5.0, B 4.5; mean 4.75). Proposed: **5.0**

**Concede:**
- **Tackle replay (A, B).** `strips/high/R13` holds the carrier and tackler wrapped and upright for all 8 replay frames, with no drive and no fall.
- **Ball and bodies in the pile (A).** In `crops/high/R12-carrier` the ball floats above the pile, separate from any hand, and #47 and #20 interpenetrate.
- **Upright carriers (A, B).** The torso is upright in `crops/high/R10-carrier` and `crops/high/R11-carrier`. No plant-and-cut reads in `strips/high/R11`.
- **Blockers (B).** B's blocking point is confirmed in the close-ups rather than in the distant strips. In `crops/high/R10-carrier` and `crops/high/R11-carrier`, linemen #66, #74, #69 and #68 hold the same half-squat pose, facing away.
- **Catch moment (A, B).** The catch itself isn't captured. `strips/high/R09` goes from ball in the air (frames 1–3) to the receiver already running with the "88 HOLLOWAY" tag (frame 4). The rubric wants a legible catch beat, so this costs points.

**Rebut (wrong cause or overstated):**
- **Clock jump (A on R09, B on R10).** A says the receiver "goes from running upright to lying flat" between frames 5 and 6 of `strips/high/R09`. B describes a "sudden pile/result transition between panels 5 and 6" in `strips/high/R10`. In both strips the scoreboard clock reads 3:20 in frames 1–5 and 3:18 in frame 6.
  - The capture skipped about 2 s of play, so these strips can't prove the motion snaps.
  - What they do prove is that the fall is never shown, which is a smaller claim.
  - Frames 6–8 being still is the dead ball after the whistle, not a freeze.
- **Hands at the catch (A).** In `crops/high/R09-slot_Z`, A says the "arms hang at his sides with no ball in hand". The close-up is from directly behind #88. His right arm is bent forward across his body and his front isn't visible, so a tucked ball can't be ruled out. The carrier tag in strip frames 4–5 shows he has possession.
- **Carrier off the ground (A).** "Airborne with both feet off the turf" in `crops/high/R10-carrier` is the flight phase of a sprint stride, which is normal. The real fault is the upright torso.
- **Celebration (A).** "One player hangs in the air" in `crops/high/R14-carrier` is #9 mid-jump with both arms up. That is a legitimate celebration pose, not a defect.

**Positives both critics accept:**
- The QB wind-up is legible, with the ball cocked behind the helmet (`crops/high/R07-slot_QB`).
- Three-point stances read (`crops/high/R06-slot_C`, `crops/high/R04-slot_C`).
- There is a punch-in on the catch (`strips/high/R09` frame 4) and a sideline replay camera.

This matches the rubric's 5 ("procedural cycles that read, with popping, floaty contact and stiff falls"). B's 4.5 rests partly on the misread clock gap.

## UI / HUD (A 6.5, B 6.5). Proposed: **6.5**

**Concede:**
- **Landscape touchdown banner (A).** It hides the celebration; only the players' feet show below it (`high/landscape/R14`).
- **Landscape scorebug (A).** The third Hot Springs timeout dot is cut off (`high/landscape/R04`).
- **Empty rail (A, B).** The desktop rail is about 28% of the width (360/1280 px) and is mostly empty at `high/desktop/R01`, `high/desktop/R16` and `high/desktop/R12`.
- **No defender IDs (A).** `high/desktop/R05` puts no defender markers on the field.

**Rebut:**
- **Bands on desktop.** A's band complaints are phone-only. On desktop the result band sits under the play: the pile in `high/desktop/R12` is at about y 550 and the band starts at about y 670. In `high/desktop/R21` the huddle is fully clear of the band.
- **Portrait touchdown band.** In `high/mobile/R14` the touchdown band sits below the end-zone celebration, and the whole celebration is visible.
- **Play list (A, B).** In `high/desktop/R03` and `high/desktop/R22`, the cut-off play list is a scrolling list whose tenth card ("0 Fountain Play-Action") runs past the fold. That is a missing scroll cue, not stale or overlapping UI.

Both critics agree on 6.5. Hold.

## Typography (A 6.5, B 7.0; mean 6.75). Proposed: **7.0**

**Plainly wrong cause (A).**
- **Claim:** A docks typography because "the board clock reads '3:5 1' because of uneven digit spacing" (`high/desktop/R14`).
- **Why it's wrong:** `crops/high/R01-board` shows a seven-segment "1" lit on the right-hand segments of its cell. The same alignment appears in the QTR "1" and DOWN "1". That is how real lamp boards draw it, and it's the authentic detail A praises in the same paragraph.

**Rebut (clipping):** A's "clipping at container edges" is not clipped type.
- In `high/landscape/R04` the cut-off element is a timeout dot, not a glyph.
- In `high/desktop/R03` the cut-off element is a scroll-list card (see UI).
- I found no truncated words or numerals in any High frame I opened.

**Concede:**
- The grey body copy on navy is low-contrast ("Lake Hamilton kicking", `high/desktop/R01`).
- The result-band subtitle is small next to its headline (`high/desktop/R12`, "E. KEMP RUN").
- B's point that the play-card descriptions are small at desktop size holds (`high/desktop/R22`).

**Credit:** The condensed display face and sans body pairing is consistent and the hierarchy is clear. See `high/desktop/R21` ("+7 YD · FIRST DOWN" over "M. DELACROIX RUN"), `high/mobile/R22` and `high/landscape/R14`. Numerals read at a glance in the scorebug on every viewport. That meets the 7 anchor's wording at the low end.

## Readability (A 5.5, B 6.0; mean 5.75). Proposed: **6.0**

**Plainly wrong (A).**
- **Claim:** A says "the ball in flight is a dark-brown blob crossing black jerseys" in `high/desktop/R08`.
- **What the frame shows:** The ball sits in open green turf at about (550, 475), to the right of the cluster and clear of every jersey. It also reads cleanly against turf in `high/landscape/R08` (about (580, 503)) and `high/mobile/R08` (about (440, 1160), where the white stripe is visible).
- **Where A is right:** Only the close-up `crops/high/R08-ball` loses the ball against #24's dark jersey. G-ball-visibility is therefore minor.

**Overstated (B).** "`high/desktop/R13` blurs the central action enough to obscure contact detail." The depth-of-field blur sits mostly in the near foreground (bottom quarter). The pile and the "20 KEMP" tag at frame centre stay legible. The pile is soft but readable.

**Concede:**
- **Bands over the play (A).** The result bands hide the play on the phone (`high/mobile/R12`, `high/mobile/R21`).
- **Route graphics (B).** They dominate the small figures in `high/mobile/R04`.
- **Edge clipping (A, B).** Receiver icons 1 and 2 are half off-screen in `high/mobile/R04`.

**Credit:**
- The carrier ring and tag work on every viewport (`high/desktop/R10`, `high/mobile/R10`, `high/desktop/R15`).
- The line of scrimmage (blue) and first-down line (yellow) are clear in every frame.
- `high/mobile/R10` frames the run from behind the carrier with large figures and a large name tag. Neither critic cited it at High.

## Mobile (A 5.5, B 5.5). Proposed: **5.5**

**Concede:**
- **Portrait dead space.** It's real: in `high/mobile/R04`, roughly the top third of the field view is stadium, scoreboard and far end zone above the HOT SPRINGS end-zone paint. In `high/mobile/R08` the line of scrimmage sits at about 82% down.
- **Icon clipping.** Receiver icons 1 and 2 are clipped (`high/mobile/R04`).
- **`high/mobile/R12` is the worst phone frame.** The camera shows open field and the pile is hidden under the band.
- **Landscape.** The side panel takes about 42% of the width (`high/landscape/R04`, `high/landscape/R08`).

**Rebut:**
- **Figure size (A).** "Figures about 10 CSS px tall (`high/mobile/R04`)" is slightly understated. Linemen measure about 25–30 device px at 2×, which is about 13–15 CSS px. That is still small.
- **Landscape R12 (A).** "The result band sits on the tackle in `high/landscape/R12`" overstates it. The pile (#73, #92, #63) sits above the band's top edge, and the band clips only the bottom of the pile.

**Credit:**
- `high/mobile/R10` and `high/mobile/R14` are well composed for a phone.
- HIKE, JUKE and CONTINUE are large thumb targets (`high/mobile/R04`, `high/mobile/R10`).
- The two-column play cards are readable (`high/mobile/R22`).
- The perf table shows the phone tier (Medium) at 89 min fps on the 4× throttle proxy, and High at 44.

The two critics agree, and the defects outweigh the credits. Hold 5.5.

## Authenticity (A 6.0, B 6.0). Proposed: **6.0**

**Concede:**
- There is no band, cheer squad or student section.
- The sideline is a row of identical standing players (`high/desktop/R13`, `high/desktop/R15`).
- The trees are black cones (`high/desktop/R15`).
- `high/desktop/R01` reads as a large, dark, empty bowl.

**Credit:**
- **Lake Hamilton (R03).** `high/desktop/R03` gives Lake Hamilton its own field house with lit windows beyond the end zone and a "WOLVES" end zone.
- **Jessieville (R20).** `high/desktop/R20` shows small 3A bleachers, pines and a purple midfield.
- **Scoreboard.** `crops/high/R01-board` is a convincing high-school lamp scoreboard.
- **Crowd.** `crops/high/R01-crowd` shows a full home crowd in school colours. The establishing camera in R01 just doesn't frame it, so the "empty bowl" is partly a framing problem rather than missing crowd.

Hold 6.0.

---

## Gaps: adjusted severity and gain (no new gaps)

| Gap | Critic | Their sev / gain | Mine | Why |
|---|---|---|---|---|
| G-catch-tackle-beats | A | 5 / 0.75 | 5 / 0.75 | Confirmed in `strips/high/R13` (no fall) and `crops/high/R12-carrier` (floating ball). The "snap to prone" evidence is a 2 s gap in the capture (clock 3:20→3:18), but the fix is still right. |
| G-tackle-progression | B | 5 / 1.0 | 5 / 0.5 | Same defect as G-catch-tackle-beats. B's R10 panel 5→6 evidence is the same gap in the capture. Gains overlap, so don't count them twice. |
| G-blocking-weight | B | 5 / 1.0 | 4 / 0.5 | Identical half-squat linemen are confirmed in `crops/high/R10-carrier` and `crops/high/R11-carrier`. The strips B cites are too far away to judge contact, and blocking is one strand of animation, not a full point on its own. |
| G-pants-silhouette | A | 4 / 0.6 | 4 / 0.5 | Confirmed in `crops/high/R04-slot_QB`, `crops/high/R06-slot_C` and `crops/high/R04-slot_C`. It overlaps G-player-shape. |
| G-player-shape | B | 4 / 0.5 | 4 / 0.3 | Mostly duplicates G-pants-silhouette and the glove fix in G-mesh-tears-gloves-facemask. |
| G-mesh-tears-gloves-facemask | A | 4 / 0.4 | 4 / 0.4 | Confirmed. The claw gloves also show at gameplay distance (`high/desktop/R14`, `high/mobile/R14`). |
| G-run-lean-contact | A | 4 / 0.4 | 3 / 0.3 | The upright torso is real. "Airborne" is the normal flight phase of a sprint stride. |
| G-bands-cover-action | A | 4 / 0.5 | 4 / 0.5 | Confirmed in `high/mobile/R12`, `high/mobile/R21` and `high/landscape/R14`. `high/landscape/R12` is only an edge clip, and the desktop and portrait R14 bands are fine. |
| G-phone-composition | B | 5 / 1.0 | 4 / 0.6 | The dead space is real in `high/mobile/R04` and `high/mobile/R08`, but `high/mobile/R10` already frames well. It overlaps G-phone-portrait-deadspace. |
| G-phone-portrait-deadspace | A | 3 / 0.4 | 3 / 0.4 | Confirmed. |
| G-officials-model | A | 3 / 0.3 | 3 / 0.3 | Confirmed (`crops/high/R03-slot_QB`). |
| G-rain-surface | A | 3 / 0.3 | 3 / 0.3 | Confirmed: dry at gameplay distance in `high/desktop/R18`, square splashes in the close-up. |
| G-highlight-control | B | 3 / 0.5 | 2 / 0.2 | The R19 bloom is confined to the near-edge marks. The R18 close-up sheen is the only place wet turf shows at all, so cutting it conflicts with G-rain-surface. |
| G-ball-visibility | A | 3 / 0.3 | 2 / 0.1 | The ball reads against turf in `high/desktop/R08`, `high/landscape/R08` and `high/mobile/R08`. Only the close-up loses it. |
| G-venue-pageantry | A | 3 / 0.5 | 3 / 0.5 | Confirmed. |
| G-school-staging | B | 3 / 0.5 | 3 / 0.4 | Overlaps G-venue-pageantry. R03 and R20 already show some venue differentiation. |
| G-desktop-rail | B | 3 / 0.5 | 3 / 0.3 | The empty rail is confirmed at R01, R12 and R16. Its main gain is reclaimed field width rather than a new UI capability. |
| G-replay-dark-smudge | A | 2 / 0.2 | 2 / 0.2 | Confirmed. |
| G-landscape-scorebug-clip | A | 2 / 0.2 | 2 / 0.2 | Confirmed (timeout dot). The play-list half of the gap is a missing scroll cue, not clipping. |

## Facts the critics got plainly wrong
1. **A, typography:** "Board clock reads '3:5 1' because of uneven digit spacing." That is correct seven-segment rendering of "1"; the QTR and DOWN "1"s are drawn the same way (`crops/high/R01-board`).
2. **A, readability:** "The ball in flight is a dark-brown blob crossing black jerseys" (`high/desktop/R08`). In that frame the ball is over open green turf. Only `crops/high/R08-ball` loses it against a jersey.
3. **A, animation (and B on R10):** Both read a snap between strip frames 5 and 6. The board clock jumps 3:20→3:18 at that point in both `strips/high/R09` and `strips/high/R10`; that's a gap in the capture, not proof of a pose snap.
4. **A, animation:** "Arms hang at his sides with no ball in hand" (`crops/high/R09-slot_Z`). It's a rear view with the right arm bent forward, and possession is confirmed by the strip's carrier tag.
5. **B, readability:** "`high/desktop/R13` blurs the central action enough to obscure contact detail." The blur is mostly in the near foreground, and the central pile and tag stay legible.

```json
{
  "loop": 5,
  "role": "advocate",
  "tier": "high",
  "scores": {
    "art": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "crops/high/R03-slot_QB", "note": "Glossy copper helmets with specular hot spots vs matte jerseys; numbers and stripes hold; official is a capsule with floating sleeve tubes (conceded)"},
        {"shot": "crops/high/R13-carrier", "note": "Decal, chest/back/sleeve numbers and stripes hold at about 3x gameplay scale"},
        {"shot": "crops/high/R06-slot_C-side", "note": "Conceded: sawtooth hem, rake gloves, facemask bars standing off the shell"},
        {"shot": "crops/high/R06-slot_LG", "note": "Conceded: sleeve hem and stripe torn into spikes"},
        {"shot": "crops/high/R04-slot_QB", "note": "Conceded: balloon pants silhouette on #12 and #44"},
        {"shot": "crops/high/R01-crowd", "note": "Crowd reads as people in school colours"}
      ]
    },
    "lighting": {
      "score": 6.5,
      "confidence": 0.65,
      "evidence": [
        {"shot": "high/desktop/R04", "note": "Believable night exposure, lamp bloom, per-player shadows; flat grey bowl wall conceded"},
        {"shot": "high/desktop/R20", "note": "Lamp bloom and shadows at the 3A venue"},
        {"shot": "crops/high/R12-carrier", "note": "Multiple soft shadows fanning across the turf"},
        {"shot": "high/desktop/R18", "note": "Conceded: turf reads dry under rain at gameplay distance"},
        {"shot": "crops/high/R18-turf_26_67_40", "note": "Wet sheen present in close-up; square splash particles conceded"},
        {"shot": "high/desktop/R13", "note": "Conceded: dark smudge at bottom centre of the replay"}
      ]
    },
    "animation": {
      "score": 5.0,
      "confidence": 0.65,
      "evidence": [
        {"shot": "strips/high/R13", "note": "Conceded: carrier and tackler stay upright and wrapped across all 8 frames"},
        {"shot": "strips/high/R09", "note": "Catch frame not captured; clock jumps 3:20 to 3:18 between frames 5 and 6, so this is a capture gap, not proof of a snap"},
        {"shot": "strips/high/R10", "note": "Same 2 s clock gap between panels 5 and 6"},
        {"shot": "crops/high/R12-carrier", "note": "Conceded: ball floats above the pile, bodies interpenetrate"},
        {"shot": "crops/high/R10-carrier", "note": "Upright carrier torso; identical half-squat blockers"},
        {"shot": "crops/high/R07-slot_QB", "note": "Legible wind-up with the ball cocked behind the helmet"}
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R12", "note": "Result band sits under the pile on desktop; hierarchy and runner name"},
        {"shot": "high/desktop/R04", "note": "Scorebug, numbered receiver icons, route art; rail about 28% of width"},
        {"shot": "high/landscape/R14", "note": "Conceded: touchdown banner hides the celebration"},
        {"shot": "high/landscape/R04", "note": "Conceded: timeout dot clipped"},
        {"shot": "high/mobile/R14", "note": "Portrait touchdown band sits below the celebration"}
      ]
    },
    "typography": {
      "score": 7.0,
      "confidence": 0.6,
      "evidence": [
        {"shot": "high/desktop/R21", "note": "Condensed headline over sans attribution; clear hierarchy"},
        {"shot": "high/mobile/R22", "note": "Consistent scale on play cards"},
        {"shot": "crops/high/R01-board", "note": "Seven-segment '1' right-aligned in its cell, consistent across clock, QTR and DOWN; authentic, not a spacing bug"},
        {"shot": "high/desktop/R01", "note": "Conceded: low-contrast grey body text"}
      ]
    },
    "readability": {
      "score": 6.0,
      "confidence": 0.65,
      "evidence": [
        {"shot": "high/desktop/R08", "note": "Ball over open green turf, clear of jerseys"},
        {"shot": "high/mobile/R08", "note": "Ball and its stripe read against turf on the phone"},
        {"shot": "high/mobile/R10", "note": "Large carrier tag and ring; figures readable"},
        {"shot": "high/mobile/R12", "note": "Conceded: band hides the pile"},
        {"shot": "high/mobile/R04", "note": "Conceded: route art dominates small figures; edge icons clipped"}
      ]
    },
    "mobile": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/mobile/R04", "note": "Conceded: about a third of the field view is dead stadium space; icons 1 and 2 clipped"},
        {"shot": "high/mobile/R12", "note": "Conceded: pile hidden under the result band"},
        {"shot": "high/mobile/R10", "note": "Well-framed run with large figures and a large JUKE target"},
        {"shot": "high/landscape/R08", "note": "Conceded: side panel takes about 42% of the width"},
        {"shot": "high/mobile/R14", "note": "Touchdown band sits below the celebration"}
      ]
    },
    "authenticity": {
      "score": 6.0,
      "confidence": 0.65,
      "evidence": [
        {"shot": "high/desktop/R03", "note": "Lake Hamilton field house with lit windows, WOLVES end zone"},
        {"shot": "high/desktop/R20", "note": "3A bleachers, pines, school colours"},
        {"shot": "crops/high/R01-board", "note": "Authentic lamp scoreboard"},
        {"shot": "high/desktop/R13", "note": "Conceded: identical sideline row; no band, cheer or student section"}
      ]
    }
  },
  "gaps": [
    {"id": "G-catch-tackle-beats", "category": "animation", "expectedGain": 0.75, "severity": 5, "effort": "L", "workstream": "WS4b", "evidence": ["strips/high/R13", "crops/high/R12-carrier", "strips/high/R09", "crops/high/R09-slot_Z"], "benchmark": "axis-3", "fix": "Catch reach keyed 6-8 ticks before ball arrival with hands to ball; 3-4 frame stumble/fall blend instead of snap to prone; keep ball attached to carrier hand bone through tackle and fall; body-separation offsets in piles; visible drive and fall on replay contact. Note: the R09/R10 frame 5-6 'snap' is a 2 s gap in the capture (clock 3:20 to 3:18); capture the strips at even intervals so the fall itself is shown."},
    {"id": "G-tackle-progression", "category": "animation", "expectedGain": 0.5, "severity": 5, "effort": "L", "workstream": "WS4b", "evidence": ["strips/high/R13", "crops/high/R12-carrier"], "benchmark": "cfb26-4.jpg", "fix": "Build approach, wrap, balance loss and grounded settling beats with momentum continuity and body separation. Overlaps G-catch-tackle-beats; do not count the gains twice."},
    {"id": "G-blocking-weight", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "L", "workstream": "WS4", "evidence": ["crops/high/R10-carrier", "crops/high/R11-carrier", "strips/high/R10"], "benchmark": "madden26-4.jpg", "fix": "Add planted contact phases, articulated hand engagement, torso response and recovery steps; synchronize stride distance with travel; vary blocker poses."},
    {"id": "G-pants-silhouette", "category": "art", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS3", "evidence": ["crops/high/R04-slot_QB", "crops/high/R06-slot_C", "crops/high/R04-slot_C"], "benchmark": "axis-3", "fix": "Cut hip/glute volume about 30%, taper into thigh, add thigh and knee pad planes, re-check deep-stance weights so the seat does not balloon; add 2-3 body-type scales (OL, skill, QB)."},
    {"id": "G-player-shape", "category": "art", "expectedGain": 0.3, "severity": 4, "effort": "L", "workstream": "WS3", "evidence": ["crops/high/R04-slot_QB", "crops/high/R06-slot_C-side"], "benchmark": "axis-3.jpg", "fix": "Refine shoulder-pad transitions, hip proportions and glove articulation; replace broad angular folds with restrained cloth detail. Largely overlaps G-pants-silhouette and G-mesh-tears-gloves-facemask."},
    {"id": "G-mesh-tears-gloves-facemask", "category": "art", "expectedGain": 0.4, "severity": 4, "effort": "S", "workstream": "WS3", "evidence": ["crops/high/R06-slot_LG", "crops/high/R06-slot_C-side", "crops/high/R12-carrier", "high/desktop/R14", "high/mobile/R14"], "benchmark": "axis-3", "fix": "Close/merge sleeve-hem and stripe geometry that renders as sawteeth; shorten finger bones and curl gloves into a relaxed fist (claws read even at gameplay distance in R14); seat facemask on the helmet shell with side clips."},
    {"id": "G-run-lean-contact", "category": "animation", "expectedGain": 0.3, "severity": 3, "effort": "M", "workstream": "WS4", "evidence": ["crops/high/R10-carrier", "crops/high/R11-carrier", "strips/high/R11"], "benchmark": "axis-3", "fix": "Forward torso lean proportional to speed, lateral lean on cuts, a plant frame on direction changes. A sprint flight phase is fine; foot-plant IK only for the contact frames."},
    {"id": "G-bands-cover-action", "category": "mobile", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS7", "evidence": ["high/mobile/R12", "high/mobile/R21", "high/landscape/R14"], "benchmark": "retrobowl-2", "fix": "On phone, frame the camera so the pile sits above the band (R12 portrait shows open field with the pile hidden), or dock result bands at the top of the field view; halve the landscape touchdown banner height."},
    {"id": "G-phone-composition", "category": "mobile", "expectedGain": 0.6, "severity": 4, "effort": "M", "workstream": "WS7", "evidence": ["high/mobile/R04", "high/mobile/R08", "high/landscape/R04"], "benchmark": "retrobowl-1.jpg", "fix": "Reduce unused sky and stadium, enlarge the formation, inset receiver markers and collapse the landscape diagram during action. Overlaps G-phone-portrait-deadspace; R10 portrait already frames well."},
    {"id": "G-phone-portrait-deadspace", "category": "mobile", "expectedGain": 0.4, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/mobile/R04", "high/mobile/R08"], "benchmark": "retrobowl-1", "fix": "Pitch camera down and crop the far field so stadium/sky/scoreboard take at most 15% of the field view; clamp receiver icons inside a safe area; scale players about 1.3x on phone."},
    {"id": "G-officials-model", "category": "art", "expectedGain": 0.3, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["crops/high/R03-slot_QB", "crops/high/R04-slot_C"], "benchmark": "axis-3", "fix": "Move officials onto the new body: striped shirt with attached sleeves, white cap and a face."},
    {"id": "G-rain-surface", "category": "lighting", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS5", "evidence": ["high/desktop/R18", "crops/high/R18-turf_26_67_40"], "benchmark": "legendbowl-1", "fix": "Darken turf albedo and lower roughness in rain so sheen reads at gameplay distance, add lamp reflection streaks on turf, replace square splash quads with round soft sprites."},
    {"id": "G-highlight-control", "category": "lighting", "expectedGain": 0.2, "severity": 2, "effort": "M", "workstream": "WS1", "evidence": ["high/desktop/R19", "crops/high/R18-turf_26_67_40"], "benchmark": "cfb26-4.jpg", "fix": "Restrict bloom on near-edge painted marks in day/mist; tune wet micro-specular together with G-rain-surface, not against it."},
    {"id": "G-ball-visibility", "category": "readability", "expectedGain": 0.1, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["crops/high/R08-ball", "high/desktop/R08"], "benchmark": "retrobowl-2", "fix": "Ball already reads against turf in all R08 gameplay frames; a faint in-flight trail would cover the case where it crosses dark jerseys (close-up only)."},
    {"id": "G-venue-pageantry", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS2", "evidence": ["high/desktop/R01", "high/desktop/R13", "high/desktop/R20"], "benchmark": "cfb26-1", "fix": "Student section block in school colours and a band block in home stands, cheerleaders on sideline, varied sideline poses, frame the R01 establishing shot on the lit home stands."},
    {"id": "G-school-staging", "category": "authenticity", "expectedGain": 0.4, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["high/desktop/R03", "high/desktop/R20"], "benchmark": "cfb26-1.jpg", "fix": "Add venue-specific perimeter dressing, sideline equipment and chain crew. Overlaps G-venue-pageantry for band and student sections."},
    {"id": "G-desktop-rail", "category": "ui", "expectedGain": 0.3, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["high/desktop/R01", "high/desktop/R16", "high/desktop/R22"], "benchmark": "madden26-3.jpg", "fix": "Use a compact contextual rail, larger play diagrams in a dedicated selection layout and more field width during live play."},
    {"id": "G-replay-dark-smudge", "category": "lighting", "expectedGain": 0.2, "severity": 2, "effort": "S", "workstream": "WS1", "evidence": ["high/desktop/R13", "high/desktop/R15", "strips/high/R13"], "fix": "Exclude the near-camera pole/occluder from the sideline replay camera or move the camera."},
    {"id": "G-landscape-scorebug-clip", "category": "ui", "expectedGain": 0.2, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/landscape/R04", "high/desktop/R03"], "benchmark": "axis-1", "fix": "Drop the HOME tag or shrink team names under 900 px so timeout dots fit; add a scroll fade to the play list instead of a hard cut."}
  ],
  "verdict": "continue"
}
```
