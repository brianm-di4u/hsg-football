# Advocate rebuttal: loop 13, High tier

All capture paths are relative to `games/football/screenshots/review-loop-13/`. I opened every capture I cite. Where I measured something, the method is given. The critics' means are art 6.0, lighting 6.5, animation 5.25, UI 6.5, typography 6.75, readability 6.25, mobile 6.0, authenticity 6.25.

Summary: most of the critics' substance holds up. The players have no faces and share one build. The dive ends in a squatting cluster. Portrait wastes height. Defense pre-snap has nothing on the field. No band or student section. I concede all of that. A handful of specific claims are wrong or overstated, though: "mitts" for hands, "featureless officials in black", "identical celebration", Codex's "serif supporting text", and the claim that down-and-distance is the "smallest" and "plain" scorebug text. Two gaps also blame the wrong cause or overcount: the contact gap ignores the falls that do exist in R12 and R13, and Codex's three overlapping art and animation gaps double-count the same work.

## Plainly wrong facts

1. **Critic A, Art: "Arms are solid sleeve-color tubes ending in mitts."**
   - The hands have modeled, splayed fingers. See `crops/high/R06-slot_C-side` (#55's white hand, four separate fingers over the C's hip) and `crops/high/R14-carrier` (#74's raised right hand, fingers spread).
   - The arms aren't sleeve-colored either. Lakeside's navy jersey has white under-sleeves (`crops/high/R06-slot_C` #56). The white road jersey has blue ones (`crops/high/R04-slot_C` #57).
   - Codex correctly calls them "gloves".
2. **Critic A, Art: "The officials are featureless figures in black" (`crops/high/R03-slot_QB`).**
   - That crop shows a black-and-white striped shirt with striped sleeves and a white cap.
   - Other officials have skin-toned heads and arms: `crops/high/R04-slot_C`, `crops/high/R06-slot_C`, `crops/high/R12-carrier`.
   - What is true: the R03 official's head is an unlit dark mannequin form.
3. **Critic A, Animation: "Every Hot Springs player has the same both-arms-up pose" (`crops/high/R14-carrier`).**
   - In that crop, #74 raises one arm while the other hangs, and #68 (right) has both arms down and out.
   - #12 and #9 do share the two-arm pose. The poses are repetitive, but they aren't identical.
4. **Critic A, Typography: down and distance is "the smallest text in the scorebug: mixed case".** The fix also asks to "set it in the condensed display face."
   - Zoomed on `high/desktop/R04` (the clock cell), "1st & 10 · own 30" is already set in the bold condensed display face. It is just mixed case and smaller than the clock.
   - Critic A's next bullet says the "HOME" tag is about 10 px, which makes HOME, not down and distance, the smallest scorebug text.
   - The real issue is size and case only, and half of the proposed fix already ships.
5. **Codex, Typography: "the tightly condensed display face and serif supporting text are less cohesive."**
   - The supporting text is sans-serif. In `high/desktop/R22`, zoomed on card 1, "Quick handoff straight up the middle" is a humanist sans.
   - The same face sets the log in `high/desktop/R21` and the description in `medium/mobile/R22`.
   - No serif appears anywhere in the HUD.
6. **Codex, Animation: contact "lacks a clear wrap" (`strips/high/R13`, `crops/high/R12-carrier`).**
   - `crops/high/R13-carrier` shows a black-helmeted defender pressed against #20's side with an arm around him, which is a wrap.
   - `crops/high/R12-carrier` shows #47 laid across a face-down #20 inside the carrier ring, a grounded two-body resolution.
   - Critic A calls R13 "the best contact moment in the set" and R12 "a credible two-body pile".

## Category by category

### Art (critics: 6.0 / 6.0, mean 6.0). Proposed: **6.0**
- **Concede.**
  - No faces under the facemasks: `crops/high/R14-carrier` #9's facemask frames a black void.
  - One body build across positions: RB #44 vs OL #74/#69 in `crops/high/R11-carrier`.
  - Rigid shell jerseys with no folds, and ballooned pants in stance: `crops/high/R04-slot_C` #69.
  - Inflated shoulder shells: `crops/high/R06-slot_C-side`.
  - Codex's narrow waist and long legs on the QB: `crops/high/R07-slot_QB`.
  - Cone-spike trees: `high/desktop/R15`, `crops/high/R06-slot_C`.
- **Rebut (mitts, officials).** See facts 1 and 2.
- **Missed evidence.**
  - `crops/high/R03-slot_QB` shows a third, distinct helmet material: metallic copper with a hot specular, against matte brown jerseys and white pants.
  - Behind the visitor side of the same crop stands a lit fieldhouse/press-box structure with windows and trim, a built venue object.
  - `crops/high/R01-board` has unlit "ghost" 7-segment digits.
  - `crops/high/R04-turf_26_67_42` holds turf grain at field level.
- **Verdict.** Four of the five 7-anchor clauses are visible: smooth bodies with facemask and pads, glossy-vs-matte contrast, textured turf, a crowd that reads as people. Jersey folds and faces are missing. Two corrected factual errors don't outweigh missing faces and identical builds, so I hold at 6.0.

### Lighting & atmosphere (6.5 / 6.5, mean 6.5). Proposed: **6.5**
- **Concede.**
  - Rain at play distance reads mainly as darker turf plus a streak overlay. I measured mean luminance over the field area (y 400–780, x 0–900) at 76 in `high/desktop/R18` vs 100 in `high/desktop/R10`. The 99.5th percentile is 208 vs 221, so there are no lamp-streak highlights.
  - The sheen reads only in `crops/high/R18-turf_26_67_40`.
  - The replay backdrops are flat grey walls: `high/desktop/R13`, `high/desktop/R15`.
- **Partial rebut, Critic A's "top rows are nearly as bright as the front" (`crops/high/R01-crowd`).**
  - Banding the crowd (60 px rows, x 550–1030), the top two bands average 41 and 67, against 81, 77 and 73 for the front-middle bands.
  - That is a real, if modest, back-to-front gradient of about 20–40%. It is subtle, not absent.
- **Partial rebut, Codex on `high/desktop/R19`: "washes players and background into a similar pale haze".**
  - The black Hot Springs jerseys stay high-contrast against the pale turf, and the badges and route art stay crisp.
  - The white-jersey defenders and the background do flatten. The haze costs depth, not play legibility.
- **Missed evidence.**
  - `crops/high/R04-turf_26_67_42` shows two or three soft shadows fanning from each player, which is exactly the 7 anchor's "several soft shadows under players".
  - Helmet speculars are hot in `crops/high/R06-slot_C-side` and `crops/high/R03-slot_QB`.
- Hold at 6.5.

### Animation & game feel (5.5 / 5.0, mean 5.25). Proposed: **5.5**
- **Concede.**
  - `strips/high/R10`, enlarged over frames 5–8: the dive resolves into linemen squatting in place around a cluster, under "NO GAIN". There is no readable fall.
  - `strips/high/R09` frames 6–8 freeze next to the defender, with no run-after-catch tackle.
  - The ball isn't visible on the camera side in `crops/high/R10-carrier` or `crops/high/R11-carrier`.
  - The slow motion can't be credited from stills.
- **Rebut (Codex's "no wrap", Critic A's "identical celebration").** See facts 3 and 6. The contact system produces a wrap (`crops/high/R13-carrier`), a tip-over (`strips/high/R13` frames 6–8) and a grounded pile (`crops/high/R12-carrier`).
- **Missed evidence.**
  - `crops/high/R07-slot_QB`: a legible cocked-arm throw with the ball at the ear.
  - `crops/high/R11-carrier`: a stride with real knee lift and trailing-leg extension.
  - `crops/high/R09-slot_Z`: a reception with the receiver's arms forward toward the ball.
- **Verdict.** The rubric's 5 ("stiff falls") is accurate for the dive, but not for the replayed tackle. Falls exist; they just aren't on every stop. Proposed 5.5, which is Critic A's score and 0.25 above the mean.

### UI / HUD (6.5 / 6.5, mean 6.5). Proposed: **6.5**
- **Concede.**
  - No on-field defense art in `high/desktop/R05`; the plan lives only in the panel thumbnail.
  - Duplicate "FIELD GOAL · 45 YD" in `high/desktop/R16`.
  - The side panel is mostly empty in `high/desktop/R04`, `high/desktop/R05` and `high/desktop/R16`.
- **Rebut severity of Critic A's "the plate covers the bottom of the pile" (`high/desktop/R12`).**
  - Zoomed (x 200–780, y 540–800), the pile (#73, #92 and the downed carrier at the blue line) sits fully above the plate's top edge.
  - The plate clips the lower bodies of foreground players and an official at the frame's bottom edge.
  - In `high/desktop/R14`, the plate's top edge only touches the celebrants' cleats.
  - This is a severity-1 nit, not a 2.
- **Rebut Codex's "ten plays compressed into a narrow column" (`high/desktop/R22`).**
  - All ten cards are on screen at once, each with a hotkey number, route thumbnail, title, one-line description and a RUN/PASS tag.
  - That is density, not a defect. Critic A's narrower point about the ~67×42 px thumbnails is the fair version.
- **Missed evidence.**
  - `high/desktop/R19` re-themes the whole side panel light for the day game: cream panel, rust HIKE button. That is context-aware graphics.
  - `high/desktop/R04` shows five distinct badge shapes plus route art plus a matching panel diagram.
- Hold at 6.5.

### Typography (6.5 / 7.0, mean 6.75). Proposed: **7.0**
- **Rebut.** See facts 4 and 5. A consistent pair is visible across every frame:
  - A bold condensed display face for team names, scorebug, plate titles ("+7 YD · FIRST DOWN", "TOUCHDOWN!"), buttons and play titles.
  - One humanist sans for descriptions and the log.
  - Evidence: `high/desktop/R21`, `high/desktop/R22`, `medium/mobile/R22`.
- Score numerals and the clock read at a glance in `high/desktop/R04`. Nothing clips in any desktop or phone frame I opened (`high/mobile/R04`, `high/landscape/R12`).
- **Concede.**
  - Down and distance in mixed case at below clock size is a small hierarchy miss.
  - The 10 px "HOME" tag is tiny.
- The 7 anchor asks for "a consistent display/condensed pair on a clear type scale, nothing clipped, numerals that read at a glance". That is met. Proposed 7.0 (+0.25 over the mean), matching Codex.

### Readability (6.5 / 6.0, mean 6.25). Proposed: **6.5**
- **Concede.**
  - Small, unlabeled defenders in `high/desktop/R05`.
  - Small desktop figures in `high/desktop/R04`.
  - Portrait wastes field height above the formation (`high/mobile/R04`, `high/mobile/R10`).
- **Missed evidence across both viewports.** Every live frame gives a ring plus a name plate on the carrier and a badge plus ring on the target:
  - `high/desktop/R10`: "44 DELACROIX" plate and ring.
  - `high/mobile/R10`: same plate, with the blue LOS and yellow line-to-gain both visible.
  - `high/landscape/R10`: plate well above the bottom edge.
  - `high/desktop/R08`: an oversized ball with a trail, and target "2" badged and ringed.
  - `high/desktop/R15`: the plate on the replay.
- **Partial rebut, Codex on `medium/mobile/R04`: "wide targets remain offscreen".**
  - Badges 1 and 2 sit at the edges with direction arrows, a deliberate off-screen convention. Badges 3, 4 and 5 and their routes are fully on screen.
  - The fair complaint is that the visible bodies are small (concede).
- The anchor's "at a glance in every frame" is nearly met for ball, carrier and LOS. Defensive reads are weak. Proposed 6.5 (+0.25).

### Mobile (6.0 / 6.0, mean 6.0). Proposed: **6.0**
- **Concede.**
  - Portrait figures are small. In `high/mobile/R04` I read the linemen at about 38–42 device px (19–21 CSS) from helmet top to cleat, so Critic A's 18 is at the low end. Either way they are well under a retrobowl scale.
  - About 40–45% of the portrait field view above the formation is empty turf (`high/mobile/R04`, `high/mobile/R10`).
  - Badge 1 sits over the "1ST" field paint (`high/mobile/R04`).
  - `medium/mobile/R22` shows six of ten cards, with no scroll cue.
- **Credit both critics give.**
  - Landscape framing is now deliberate. `high/landscape/R12` has the pile above the plate, and `high/landscape/R10` has the carrier tag well up.
  - Controls are large: HIKE in `high/mobile/R04`, JUKE in `high/mobile/R10`.
- **Perf.** Medium's 40 fps minimum under 4× throttle clears the anchor's "holds 30 fps". The 71.4 ms worst p95 is a real tail, but it is one number across all scenes.
- Hold at 6.0.

### Authenticity (6.0 / 6.5, mean 6.25). Proposed: **6.5**
- **Concede.**
  - No band, student section or cheer squad (`crops/high/R01-crowd`, `high/desktop/R01`).
  - Plain track with no lanes (`high/desktop/R01`).
  - A small visitor bleacher against a flat wall (`high/desktop/R13`, `high/desktop/R15`).
  - A dark surround in `high/desktop/R17`.
- **Partial rebut, Critic A's "end zones back onto void".** `high/desktop/R14` shows a grass berm behind the end line, then a dark band with distant perimeter lights. It's sparse, but it isn't an empty plane.
- **Missed evidence: three visually distinct venues.**
  - Joe C. Reese: `high/desktop/R01`, orange/black, large home stand, Ouachita ridge.
  - Wolf Stadium: `crops/high/R03-slot_QB`, copper helmets, a separate fieldhouse building with lit windows.
  - Jessieville 3A: `high/desktop/R20`, purple end zone and midfield logo, smaller stands, closer tree line.
  - Also: an authentic HS scoreboard (HSHS/LHHS, DOWN / TO GO / BALL ON, `crops/high/R01-board`), team benches with players lining both sidelines (`high/desktop/R04`), and local play names (`high/desktop/R22`).
- Codex already passes the gate at 6.5, and the venue variety supports that. Proposed 6.5 (+0.25).

## Gaps: adjusted

- **G-anim-contact-falls / G-contact** (duplicates): severity 5 → **4**, gain 1.0 → **0.75**.
  - The cause is misattributed. Falls and wraps exist (`strips/high/R13`, `crops/high/R13-carrier`, `crops/high/R12-carrier`).
  - What is missing is that they don't fire on every stop: the inside-run stop (`strips/high/R10`) and the post-catch stop (`strips/high/R09`).
  - The fix is narrower: trigger the existing tackle and fall set on interior stops and on run-after-catch.
- **G-art-player-identity**: severity 4 holds, gain 0.75 → **0.5**. Hands and gloves are already articulated (fact 1). The remaining items are face and skin, per-position build, and jersey folds.
- **G-player-anatomy** (Codex): severity 5 → **4**, gain 1.0 → **0.75**. It overlaps G-art-player-identity (both rework body proportions), so the combined art gain shouldn't be counted as 1.75.
- **G-weight-and-catch** (Codex): severity 4 → **3**, gain 1.0 → **0.5**.
  - `crops/high/R11-carrier` shows knee lift and `crops/high/R07-slot_QB` a cocked throw.
  - The strips are too low-res to support a full point of loss on lean.
  - It overlaps the contact gap's run-after-catch item.
- **G-venue-offangle-void**: severity 4 → **3**, gain 0.75 → **0.5**.
  - `high/desktop/R14` has a berm, and `crops/high/R03-slot_QB` shows a built fieldhouse.
  - The cone trees (`high/desktop/R15`) and flat replay wall (`high/desktop/R13`) stand.
- **G-auth-band-student**: concede, severity 3, gain 0.5.
- **G-rain-sheen-readable**: concede, severity 3, gain 0.5. My luminance numbers confirm the darkening without highlights.
  - On "splash puffs at cleats": `crops/high/R18-turf_26_67_40` shows small white flecks at #44's and #71's feet. These may already be splashes, too small to read.
- **G-mobile-portrait-scale**: concede, severity 4, gain 0.5.
- **G-ui-defense-presnap**: concede, severity 3, gain 0.5.
- **G-lighting-falloff-haze**: severity 3 holds, gain 0.5 → **0.25**. The bleacher gradient exists (measured above). The flat replay backdrops and the lack of lamp-cone haze stand.
- **G-ui-plate-occludes**: severity 2 → **1**, gain **0.25**. The pile is above the plate in `high/desktop/R12`.
- **G-typo-down-distance**: severity 2 → **1**, gain **0.25**. It's already in the condensed face (fact 4); only case and size remain.
- **G-perf-phone-hitch / G-phone-frame-time** (duplicates): severity 4 (Codex) → **3**, gain 0.5 → **0.25**. The 40 fps minimum meets the anchor; the tail is a polish item.
- **G-formation-framing** (Codex): severity 4 → **3**, gain 1.0 → **0.5**.
  - On desktop (`high/desktop/R04`) all five targets are badged with routes.
  - The real problem is portrait, which overlaps G-mobile-portrait-scale.
- **G-crowd-repetition** (Codex): severity 3 holds, gain 0.5 → **0.25**. Both critics agree the crowd already reads as people (`crops/high/R01-crowd`: mixed shirt colors and arm states). Only uniform height and grid placement remain.
- **G-atmospheric-depth** (Codex): severity 3 → **2**, gain 0.5 → **0.25**. In `high/desktop/R19` the players and play art stay legible; the cost is background depth only.

```json
{
  "loop": 13,
  "role": "advocate",
  "tier": "high",
  "verdict": "continue",
  "scores": {
    "art": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "crops/high/R06-slot_C-side", "note": "articulated gloved fingers (not mitts), glossy helmet vs matte jersey; inflated shoulder shells conceded"},
        {"shot": "crops/high/R14-carrier", "note": "no faces under facemasks conceded; #74 raised hand shows modeled fingers"},
        {"shot": "crops/high/R03-slot_QB", "note": "official has striped shirt and white cap (not featureless black); copper metallic helmets; built fieldhouse"},
        {"shot": "crops/high/R11-carrier", "note": "RB and OL share one build (conceded)"},
        {"shot": "crops/high/R04-turf_26_67_42", "note": "turf grain holds at field level"}
      ]
    },
    "lighting": {
      "score": 6.5,
      "confidence": 0.75,
      "evidence": [
        {"shot": "crops/high/R04-turf_26_67_42", "note": "2-3 soft shadows fan from each player"},
        {"shot": "high/desktop/R01", "note": "lamp bloom, believable night exposure"},
        {"shot": "high/desktop/R18", "note": "rain field mean luma 76 vs 100 dry, no streak highlights (conceded)"},
        {"shot": "crops/high/R01-crowd", "note": "top bands ~41-67 vs front-middle ~73-81 luma: modest real gradient"},
        {"shot": "high/desktop/R19", "note": "mist flattens background; dark jerseys and play art stay crisp"}
      ]
    },
    "animation": {
      "score": 5.5,
      "confidence": 0.65,
      "evidence": [
        {"shot": "strips/high/R10", "note": "dive resolves in squatting cluster, no fall (conceded)"},
        {"shot": "strips/high/R13", "note": "carrier tips over with defender attached, frames 6-8"},
        {"shot": "crops/high/R13-carrier", "note": "defender wrap visible on #20"},
        {"shot": "crops/high/R12-carrier", "note": "grounded two-body pile, #47 across face-down #20"},
        {"shot": "crops/high/R14-carrier", "note": "celebration repetitive but not identical: #74 one arm, #68 arms down"},
        {"shot": "crops/high/R07-slot_QB", "note": "legible cocked-arm throw pose"}
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R04", "note": "five shaped badges, route art, matching panel diagram"},
        {"shot": "high/desktop/R05", "note": "no on-field defense identification (conceded)"},
        {"shot": "high/desktop/R12", "note": "pile sits fully above plate; plate clips foreground legs only"},
        {"shot": "high/desktop/R19", "note": "panel re-themes light for day game: context-aware"},
        {"shot": "high/desktop/R16", "note": "duplicate FG title, empty panel (conceded)"}
      ]
    },
    "typography": {
      "score": 7.0,
      "confidence": 0.65,
      "evidence": [
        {"shot": "high/desktop/R22", "note": "condensed display titles + humanist sans descriptions (no serif anywhere)"},
        {"shot": "high/desktop/R21", "note": "clear two-line plate hierarchy, sans log"},
        {"shot": "high/desktop/R04", "note": "down-and-distance already in condensed face; only case/size miss"},
        {"shot": "medium/mobile/R22", "note": "titles and tags read at phone width, nothing clipped"}
      ]
    },
    "readability": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R08", "note": "oversized ball with trail, target badged and ringed"},
        {"shot": "high/mobile/R10", "note": "carrier plate, LOS and line to gain all visible on portrait"},
        {"shot": "high/landscape/R10", "note": "carrier plate well up from bottom edge"},
        {"shot": "high/desktop/R05", "note": "defenders small and unlabeled (conceded)"},
        {"shot": "medium/mobile/R04", "note": "edge badges with arrows for 1 and 2; badges 3-5 and routes on screen"}
      ]
    },
    "mobile": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/mobile/R04", "note": "linemen ~19-21 CSS px, ~40-45% empty turf above formation (conceded)"},
        {"shot": "high/landscape/R12", "note": "pile above result plate, deliberate framing"},
        {"shot": "high/mobile/R10", "note": "large JUKE control, carrier plate readable"},
        {"shot": "medium/mobile/R22", "note": "six of ten cards visible, no scroll cue (conceded)"}
      ]
    },
    "authenticity": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "crops/high/R01-board", "note": "HS scoreboard, DOWN/TO GO/BALL ON, ghost segments"},
        {"shot": "high/desktop/R20", "note": "distinct 3A Jessieville venue and palette"},
        {"shot": "crops/high/R03-slot_QB", "note": "distinct Wolf Stadium kit and fieldhouse structure"},
        {"shot": "high/desktop/R14", "note": "grass berm behind end line, sparse but not void"},
        {"shot": "crops/high/R01-crowd", "note": "no band or student section (conceded)"}
      ]
    }
  },
  "gaps": [
    {"id": "G-anim-contact-falls", "category": "animation", "expectedGain": 0.75, "severity": 4, "effort": "L", "workstream": "WS4b", "evidence": ["strips/high/R10", "strips/high/R09", "strips/high/R13", "crops/high/R13-carrier", "crops/high/R12-carrier"], "benchmark": "madden26-4", "fix": "Falls and wraps already exist (R12, R13); trigger the tackle/fall set on interior-run stops and on run-after-catch so every stop ends grounded before the result plate."},
    {"id": "G-contact", "category": "animation", "expectedGain": 0.75, "severity": 4, "effort": "L", "workstream": "WS4b", "evidence": ["strips/high/R10", "strips/high/R13", "crops/high/R12-carrier"], "benchmark": "cfb26-4.jpg", "fix": "Duplicate of G-anim-contact-falls; count once. Add momentum-driven torso rotation and varied supported landings to the existing wrap."},
    {"id": "G-art-player-identity", "category": "art", "expectedGain": 0.5, "severity": 4, "effort": "L", "workstream": "WS3", "evidence": ["crops/high/R14-carrier", "crops/high/R06-slot_C", "crops/high/R11-carrier"], "benchmark": "axis-3", "fix": "Hands are already articulated; add simple faces/skin under facemasks, per-position body scale, and normal-mapped jersey wrinkles/tuck."},
    {"id": "G-player-anatomy", "category": "art", "expectedGain": 0.75, "severity": 4, "effort": "L", "workstream": "WS3", "evidence": ["crops/high/R06-slot_C-side", "crops/high/R07-slot_QB"], "benchmark": "axis-3.jpg", "fix": "Overlaps G-art-player-identity; rework shoulder-shell transitions, hip width and positional proportions in the same pass."},
    {"id": "G-weight-and-catch", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS4", "evidence": ["strips/high/R11", "strips/high/R09", "crops/high/R11-carrier"], "benchmark": "cfb26-4.jpg", "fix": "Add planted cut steps, torso counter-rotation and a visible catch-to-tuck; stride and throw poses already read."},
    {"id": "G-venue-offangle-void", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["high/desktop/R13", "high/desktop/R15", "high/desktop/R17", "high/desktop/R14"], "benchmark": "cfb26-2", "fix": "Dress the flat replay wall and visitor side, rescale the cone trees behind the venue, add fence/track bend at end zones (berm already present)."},
    {"id": "G-auth-band-student", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["crops/high/R01-crowd", "high/desktop/R01"], "benchmark": "cfb26-1", "fix": "Add a uniformed band block, a student section with signs, and cheer squad plus mascot on the track."},
    {"id": "G-rain-sheen-readable", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["high/desktop/R18", "high/desktop/R10", "crops/high/R18-turf_26_67_40"], "benchmark": "legendbowl-1", "fix": "View-dependent elongated lamp reflections toward camera and lit rain streaks in lamp cones; enlarge the existing small cleat flecks so splashes read."},
    {"id": "G-mobile-portrait-scale", "category": "mobile", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS7", "evidence": ["high/mobile/R04", "high/mobile/R10"], "benchmark": "retrobowl-1", "fix": "Tilt/close the portrait camera so LOS sits at ~55-60% of field-view height and OL reach >=26 CSS px; keep edge badges for wide receivers."},
    {"id": "G-ui-defense-presnap", "category": "ui", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R05", "medium/desktop/R05"], "benchmark": "madden26-2", "fix": "Draw blitz arrows and coverage zones on the turf, ring the user defender, tag key offensive threats."},
    {"id": "G-lighting-falloff-haze", "category": "lighting", "expectedGain": 0.25, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["high/desktop/R13", "high/desktop/R15", "crops/high/R01-crowd"], "benchmark": "cfb26-3", "fix": "Bleacher gradient already exists; add lamp-cone haze and spill light on the flat walls behind the stands."},
    {"id": "G-ui-plate-occludes", "category": "ui", "expectedGain": 0.25, "severity": 1, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R12", "high/desktop/R14"], "fix": "Pile is already above the plate; optionally slim the desktop plate to a <=60 px lower-third so foreground legs stay visible."},
    {"id": "G-typo-down-distance", "category": "typography", "expectedGain": 0.25, "severity": 1, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R04", "high/desktop/R07"], "benchmark": "axis-1", "fix": "Already in the condensed face; set it all caps at clock size in its own cell."},
    {"id": "G-perf-phone-hitch", "category": "mobile", "expectedGain": 0.25, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["medium/mobile/R10", "medium/mobile/R04"], "fix": "40 fps minimum meets the anchor; profile the 71 ms p95 tail (crowd updates, GC, shader warm-up) and LOD the crowd on the phone tier."},
    {"id": "G-phone-frame-time", "category": "mobile", "expectedGain": 0.25, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["medium/mobile/R10", "medium/landscape/R10"], "benchmark": "retrobowl-2.jpg", "fix": "Duplicate of G-perf-phone-hitch; count once."},
    {"id": "G-formation-framing", "category": "readability", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["medium/mobile/R04", "high/mobile/R04", "high/desktop/R04"], "benchmark": "axis-1.jpg; retrobowl-1.jpg", "fix": "Desktop already badges all targets with routes; the fix is the portrait camera fit, overlapping G-mobile-portrait-scale."},
    {"id": "G-crowd-repetition", "category": "art", "expectedGain": 0.25, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["crops/high/R01-crowd", "high/desktop/R01"], "benchmark": "cfb26-3.jpg", "fix": "Crowd already reads as people; vary height/build, break the grid with seated clusters and grouped reactions."},
    {"id": "G-atmospheric-depth", "category": "lighting", "expectedGain": 0.25, "severity": 2, "effort": "M", "workstream": "WS1", "evidence": ["high/desktop/R19", "high/desktop/R01"], "benchmark": "cfb26-3.jpg", "fix": "Make day haze depth-dependent so the background keeps structure; player and play-art contrast already holds."}
  ]
}
```
