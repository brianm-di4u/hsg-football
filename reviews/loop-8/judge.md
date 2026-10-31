# Judge ruling: loop 8 (High tier, desktop)

All capture paths are relative to `games/football/screenshots/review-loop-8/`. I opened every capture cited below. No category had critics more than 1.0 apart; the largest split was animation (A 5.5, B 5.0). I still checked each disputed fact against the PNGs.

**Totals:** art 6.0, lighting 6.5, animation 5.5, ui 6.5, typography 7.0, readability 6.5, mobile 6.5, authenticity 6.0 = **50.5 / 80**.

**Gates:** typography (7.0) and authenticity (6.0) pass. Art, lighting, animation, ui, readability and mobile miss. **Verdict: continue.**

## Rulings on disputed facts
| Claim | Ruling | What I saw |
|---|---|---|
| A: crowd has "identical raised-arm poses" | **Advocate is right** | `crops/high/R01-crowd` shows both arms up, one arm up, folded arms and arms down, in orange, white and black shirts. B's "narrow range" is fair. |
| A: official has a "faceless black head" | **Advocate is right on the cause** | `crops/high/R03-slot_QB` is a rear view. The front view in `crops/high/R12-carrier` shows a head with a cap. The segmented sleeve blocks and bulbous seat in R03 are real (both critics). |
| A: no press box | **Advocate is right** | There is a box on top of the home stand in `crops/high/R06-slot_C-side`, and a field house with lit windows in `crops/high/R03-slot_QB`. The flat grey wall behind the visitor stand and end zones is real (`high/desktop/R13`, `high/desktop/R01`). |
| A: portrait players are about 15 CSS px | **Advocate is right** | In `high/mobile/R04` linemen are about 50 device px (about 25 CSS px) and 74, 44 and 12 are legible. In `high/mobile/R08` they are about 22 CSS px. |
| A: landscape panel is empty in live play | **Advocate is right** | `high/landscape/R10` has the diagram plus a large JUKE button. The desktop panel is empty (`high/desktop/R08`, `high/desktop/R18`). |
| A: R21 "FIRST DOWN" is a rules bug | **Both A and the advocate are wrong** | The test rig stages R21 from 2nd & 6 at the own 30, so a 7-yard gain to the own 37 is a real first down. The toast, HUD, panel and 3D board in `high/desktop/R21` are all correct. R22 is staged separately. This is not a defect. |
| Advocate: R11 carrier "planted foot, slight lean, not a slide" | **Partly right** | `crops/high/R11-carrier` has one foot planted, but the torso is upright with no lean into the cut, which supports B's "upright sweep". The strip is too distant to show a lateral slide either way. |
| Advocate: R08 ball close-up miss is a rig aim problem | **Not proven** | `crops/high/R08-ball` shows no ball. `crops/high/R10-carrier` and `crops/high/R11-carrier` show no ball either, though both are rear or side views. The ball is visible as a dark ellipse in `high/desktop/R08` and `high/mobile/R08`, on the pile in `crops/high/R12-carrier`, and in #12's hand in `crops/high/R14-carrier`. The gap stands, with a smaller gain. |
| Advocate: R17 punt line is "released into coverage" | **A is right** | `high/desktop/R17` shows 11 kickers in a level line across the 45 and a spread return team. It reads exactly like a kickoff. It is low value, so it drops out of the top 12. |
| Interpenetration (A and B) | **Confirmed** | White #47 is fused through blue #20 in `crops/high/R12-carrier`. Defender legs pass through #88's legs in `crops/high/R09-slot_Z`. |
| High bloom blobs and veil (A, conceded) | **Confirmed** | Lamp heads are shapeless blobs in `high/desktop/R04`, while `medium/desktop/R04` shows the racks. The milky wash covers most of the top half in all 8 frames of `strips/high/R07`, and the top-right corner in `strips/high/R09` frames 1–3. |

## Category rulings

### Art: 6.0
- **Advocate corrections accepted:** crowd variety, the official seen from behind, and the press box and field house.
- **Why they don't move the score:** both critics' 6.0 rested on anatomy and backdrop, and I confirm both.
  - The #69 seat is an orange bulb wider than the hips (`crops/high/R04-slot_C`).
  - Arms are pale or royal-blue tubes ending in mitten hands (`crops/high/R06-slot_C-side`).
  - The official's sleeves are separate striped blocks (`crops/high/R03-slot_QB`).
  - Trees are untextured black cones (`crops/high/R13-carrier`, `crops/high/R12-carrier`).
- **What meets the 7 anchor:** a glossy helmet against a matte jersey (`crops/high/R04-slot_C`), turf texture at field level, and a crowd that reads as people.
- **What misses it:** the anchor's "smooth bodies … that hold up in close-ups" is not met, and the officials break the style that keeps legendbowl-1 at a style-consistent 7. **6.0.**

### Lighting & atmosphere: 6.5
- **Agreed by all three.**
- **What works:** several soft shadows per player (`crops/high/R08-ball`), lamp bloom, believable dusk exposure, and a distinct day-mist look (`high/desktop/R19`).
- **What holds it below 7:**
  - High lamp blobs and the off-screen-lamp veil (`high/desktop/R04` vs `medium/desktop/R04`; `strips/high/R07`).
  - The apron spill is mostly a flat khaki band (`high/desktop/R01`, `high/desktop/R17`). The advocate is right that R01 shows slight darkening toward the right.
  - Rain shows one specular hotspot on otherwise dry-looking turf (`crops/high/R18-turf_26_67_40`, `high/desktop/R18`).
- **Benchmark:** short of axis-3 and cfb26-3. **6.5.**

### Animation & game feel: 5.5
- **A is closer than B.** The feel touches are real and B doesn't credit them:
  - A camera punch-in at frame 4 and a "+7 YD" toast (`strips/high/R09`).
  - An airborne jump celebration with the ball visible (`crops/high/R14-carrier`).
  - A good wind-up pose (`crops/high/R07-slot_QB`).
- **The core beats fail:**
  - The catch jumps from upright to prone between frames 5 and 6 (`strips/high/R09`), and so does the pile (`strips/high/R10`, frames 5→6).
  - There is no wrap or contact beat in `strips/high/R13` or `crops/high/R13-carrier`.
  - Bodies interpenetrate (`crops/high/R12-carrier`, `crops/high/R09-slot_Z`).
  - The sweep carrier is upright (`crops/high/R11-carrier`).
- **Benchmark:** rubric 5–6. **5.5.**

### UI / HUD: 6.5
- **Agreed by all three.**
- **What works:** a broadcast-style scorebug and axis-1 class pre-snap route art with shaped, numbered receiver icons (`high/desktop/R04`), and a clean two-line result banner on desktop (`high/desktop/R21`). The day-game cream theme (`high/desktop/R19`) is a real context-aware touch, but it is small.
- **Defects:**
  - The TOUCHDOWN banner covers the uprights, and the 3D board is cut by the top edge (`high/desktop/R14`).
  - Landscape banners cover the 3D board (`high/landscape/R12`, `high/landscape/R21`).
  - About 400 px of dead panel during live play on desktop (`high/desktop/R08`, `high/desktop/R18`).
  - No on-field defensive ID (`high/desktop/R05`, per A, uncontested).
- **Not a defect:** the R21 first-down flag (see the dispute table). **6.5.**

### Typography: 7.0
- **B and the advocate are right.**
- **Casing is two roles, not drift:** all-caps panel headings ("NEXT: 1ST & 10 · OWN 37") against the sentence-case scorebug status line (`high/desktop/R21`).
- **The 7 anchor is met:**
  - A consistent condensed display face with a sans body.
  - A clear scale from banner to play name to description (`high/desktop/R22`, `high/mobile/R22`).
  - Numerals that read at a glance (`high/desktop/R21`, `high/desktop/R16`).
  - Nothing clipped. The play-0 fade in R22 is a scroll fade.
- **Minor ding:** small mid-grey log text (`high/desktop/R12`). **7.0, gate met.**

### Readability: 6.5
- **What works:** the line of scrimmage and line to gain read everywhere. The carrier ring and plate read on desktop and portrait (`high/desktop/R10`, `high/mobile/R10`). The ball in flight is findable as a dark ellipse with a target ring (`high/desktop/R08`).
- **Defects:**
  - Receiver tags vanish after the snap (`high/desktop/R08`).
  - The ball is small, dark and has no trail, and the close-ups don't show it (`crops/high/R08-ball`, `crops/high/R11-carrier`).
  - Black home jerseys merge in piles (`strips/high/R10` frames 6–8).
  - The landscape carrier plate sits over the players above it (`high/landscape/R10`, B is right).
- **Benchmark:** axis-1 and retrobowl-1 pre-snap, short of them live. **6.5.**

### Mobile: 6.5
- **The advocate's two factual corrections stand:** portrait figure size and the landscape panel. They don't lift the score past the confirmed defects.
- **What works:** portrait is the most deliberate layout. Stacked edge badges with chevrons, big HIKE and CHANGE PLAY buttons (`high/mobile/R04`), the plate under the feet (`high/mobile/R10`), and thumb-sized play cards (`high/mobile/R22`).
- **Defects:**
  - The TD shot cuts the 3D board at the right edge and a helmet at the bottom (`high/mobile/R14`).
  - Landscape banners cover the board (`high/landscape/R12`, `high/landscape/R21`).
  - The landscape carrier plate covers players (`high/landscape/R10`).
  - About the top third of `high/mobile/R08` is end zone and backdrop.
- **Performance:** fine on Medium, the phone tier (109 fps minimum, 18.2 ms p95 at 4× throttle).
- **Benchmark:** retrobowl-1/2 in intent. **6.5.**

### Authenticity: 6.0
- **Agreed by all three. Gate met.**
- **What works:** strong local identity. HOT SPRINGS and JESSIEVILLE end zones, a HSHS/LHHS board with DOWN, TO GO and BALL ON (`crops/high/R01-board`), the Jessieville purple venue (`high/desktop/R20`), and a press box and field house.
- **What's missing or wrong:**
  - No band, student section or cheerleaders in any capture.
  - The establishing shot shows the home crowd as a left-edge sliver (`high/desktop/R01`).
  - The visitor stand sits against a flat grey wall (`high/desktop/R13`).
  - Special teams staging is off: the punt reads as a kickoff (`high/desktop/R17`), and the FG has offense and defense in one interleaved row (`high/desktop/R16`).
- **Benchmark:** short of the occasion in cfb26-1/2 and legendbowl-4. **6.0.**

### Low and Medium
No new regressions found by either critic or me. Medium keeps the lamp racks that High loses. A's mirrored Low chest numbers (`crops/low/R04-slot_C`) are noted but don't affect the High score.

## Ranked gaps
Ranked by expected gain ÷ effort, with effort S=1, M=2, L=3.

**Merges:**
- G-contact-beats and G-contact became **G-contact**.
- G-anatomy, G-body-silhouette and G-official-model became **G-anatomy**.
- G-high-bloom-veil and the scattering half of G-light-depth became **G-bloom-veil**.
- G-field-to-stand-falloff and the spill half of G-light-depth became **G-falloff**.
- G-rain-wetness and G-wet-turf became **G-wet-turf**.
- G-band-student-section and G-venue-life became **G-venue-life**.
- G-live-panel-dead-space and G-framing became **G-live-panel**.
- B's landscape-plate point is folded into **G-banner-overlap**.

**Dropped from the top 12:**
- G-special-teams-staging (0.2 / M).
- G-type-casing (the typography gate is met).
- G-low-mirrored-numbers (no High gain).

| Rank | Gap | Category | Gain | Effort | Ratio |
|---|---|---|---|---|---|
| 1 | G-banner-overlap | ui (+mobile) | 0.5 | S | 0.50 |
| 2 | G-contact | animation | 1.0 | L | 0.33 |
| 3 | G-bloom-veil | lighting | 0.3 | S | 0.30 |
| 4 | G-ball-visibility | readability | 0.3 | S | 0.30 |
| 5 | G-live-panel | ui (+readability) | 0.3 | S | 0.30 |
| 6 | G-venue-life | authenticity | 0.5 | M | 0.25 |
| 7 | G-venue-backdrop | authenticity (+art) | 0.5 | M | 0.25 |
| 8 | G-anatomy | art | 0.7 | L | 0.23 |
| 9 | G-falloff | lighting | 0.4 | M | 0.20 |
| 10 | G-r01-crowd-framing | authenticity | 0.2 | S | 0.20 |
| 11 | G-locomotion | animation | 0.5 | L | 0.17 |
| 12 | G-wet-turf | lighting | 0.3 | M | 0.15 |

G-contact is the highest-severity gap and the largest lever on the furthest-from-gate category (animation at 5.5). Treat it as the loop's anchor task even though the cheap S fixes rank above it on ratio.

```json
{
  "loop": 8,
  "role": "judge",
  "tier": "high",
  "scores": {
    "art": { "score": 6.0, "confidence": 0.8, "evidence": [
      { "shot": "crops/high/R04-slot_C", "note": "glossy helmet vs matte jersey reads; #69 stance seat is an orange bulb wider than the hips" },
      { "shot": "crops/high/R06-slot_C-side", "note": "tube arms with mitten hands; press box atop home stand exists (advocate right)" },
      { "shot": "crops/high/R03-slot_QB", "note": "rear view of official (not faceless) but segmented striped sleeve blocks and bulbous seat; field house with lit windows" },
      { "shot": "crops/high/R01-crowd", "note": "crowd reads as people with several poses and shirt colours (A's 'identical' is wrong)" },
      { "shot": "crops/high/R13-carrier", "note": "untextured black cone trees behind the field" },
      { "shot": "high/desktop/R13", "note": "visitor stand against a flat grey wall" }
    ]},
    "lighting": { "score": 6.5, "confidence": 0.8, "evidence": [
      { "shot": "high/desktop/R04", "note": "High lamp heads are shapeless bloom blobs; medium/desktop/R04 keeps the racks" },
      { "shot": "strips/high/R07", "note": "milky veil over most of the top half in all 8 frames" },
      { "shot": "crops/high/R08-ball", "note": "several soft shadows per player from multiple towers" },
      { "shot": "high/desktop/R17", "note": "apron spill reads as a flat khaki band, no tower pools on the field" },
      { "shot": "crops/high/R18-turf_26_67_40", "note": "rain: a single specular hotspot on otherwise dry-looking turf" },
      { "shot": "high/desktop/R19", "note": "day-mist variant is believable" }
    ]},
    "animation": { "score": 5.5, "confidence": 0.8, "evidence": [
      { "shot": "strips/high/R09", "note": "punch-in at frame 4 and toast, but upright to prone between frames 5 and 6 with no fall" },
      { "shot": "strips/high/R13", "note": "no legible wrap or contact beat in the tackle replay" },
      { "shot": "strips/high/R10", "note": "pile forms abruptly at frames 5 to 6" },
      { "shot": "crops/high/R12-carrier", "note": "white #47 fused through blue #20 on the ground" },
      { "shot": "crops/high/R09-slot_Z", "note": "defender legs pass through the receiver's legs" },
      { "shot": "crops/high/R14-carrier", "note": "airborne jump celebration with the ball in hand (feel touch)" },
      { "shot": "crops/high/R11-carrier", "note": "planted foot but upright torso, no lean into the cut" }
    ]},
    "ui": { "score": 6.5, "confidence": 0.8, "evidence": [
      { "shot": "high/desktop/R04", "note": "broadcast-style scorebug and axis-1 class route art with shaped, numbered receiver icons" },
      { "shot": "high/desktop/R21", "note": "correct first-down toast (staged from 2nd & 6) with clear two-line hierarchy" },
      { "shot": "high/desktop/R14", "note": "TOUCHDOWN banner covers the uprights; 3D board cut by the top edge" },
      { "shot": "high/landscape/R12", "note": "result banner covers the 3D scoreboard" },
      { "shot": "high/desktop/R08", "note": "about 400 px of empty panel during live play" },
      { "shot": "high/desktop/R19", "note": "context-aware cream day theme" }
    ]},
    "typography": { "score": 7.0, "confidence": 0.75, "evidence": [
      { "shot": "high/desktop/R22", "note": "condensed display plus sans body on a clear scale; scroll fade, not clipping" },
      { "shot": "high/desktop/R21", "note": "all-caps panel heading vs sentence-case status line are two roles; numerals read" },
      { "shot": "high/desktop/R16", "note": "meter title and instruction readable and consistent with the panel" },
      { "shot": "high/mobile/R22", "note": "type system holds at phone size" }
    ]},
    "readability": { "score": 6.5, "confidence": 0.75, "evidence": [
      { "shot": "high/desktop/R08", "note": "ball findable as a dark ellipse with target ring; receiver tags gone after the snap" },
      { "shot": "high/mobile/R10", "note": "carrier ring and under-feet plate read; defenders ahead visible" },
      { "shot": "high/landscape/R10", "note": "landscape carrier plate sits over the players above it" },
      { "shot": "crops/high/R08-ball", "note": "no ball visible in the ball close-up" },
      { "shot": "strips/high/R10", "note": "black home jerseys merge in the pile at chase distance" }
    ]},
    "mobile": { "score": 6.5, "confidence": 0.75, "evidence": [
      { "shot": "high/mobile/R04", "note": "stacked edge badges with chevrons; figures about 25 CSS px with legible numbers; big HIKE" },
      { "shot": "high/mobile/R22", "note": "thumb-sized play cards" },
      { "shot": "high/mobile/R14", "note": "3D board cut at the right edge; helmet cut at the bottom" },
      { "shot": "high/landscape/R21", "note": "top banner covers the 3D scoreboard" },
      { "shot": "high/landscape/R10", "note": "panel is used (diagram plus JUKE), but the carrier plate covers players" }
    ]},
    "authenticity": { "score": 6.0, "confidence": 0.8, "evidence": [
      { "shot": "crops/high/R01-board", "note": "HSHS/LHHS high-school board with DOWN, TO GO, BALL ON" },
      { "shot": "high/desktop/R20", "note": "Jessieville purple venue and end zone, small stands" },
      { "shot": "high/desktop/R01", "note": "home crowd only a left-edge sliver; no band, student section or cheer" },
      { "shot": "high/desktop/R13", "note": "small visitor stand against a flat grey wall" },
      { "shot": "high/desktop/R17", "note": "punt staged as a level kickoff-style line" },
      { "shot": "high/desktop/R16", "note": "FG offense and defense in one interleaved row, no neutral zone" }
    ]}
  },
  "gaps": [
    { "id": "G-banner-overlap", "category": "ui", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/landscape/R12", "high/landscape/R21", "high/landscape/R14", "high/desktop/R14", "high/mobile/R14", "high/landscape/R10"], "benchmark": "madden26-3", "fix": "In landscape (844x390) put result banners in the bottom slot of the field view as desktop does in high/desktop/R21. Move the desktop TOUCHDOWN banner to the same bottom slot so it clears the uprights and board. Frame the TD camera so the 3D scoreboard is fully inside or fully outside the frame. Trail the landscape carrier plate below the feet as on portrait. Test: no banner pixel overlaps the 3D board's screen rect in high/landscape/R12, R14, R21 and high/desktop/R14, and the board is not cut by a frame edge in high/mobile/R14. Gain split 0.25 ui, 0.25 mobile." },
    { "id": "G-contact", "category": "animation", "expectedGain": 1.0, "severity": 5, "effort": "L", "workstream": "WS4b", "evidence": ["strips/high/R13", "strips/high/R09", "strips/high/R10", "crops/high/R12-carrier", "crops/high/R09-slot_Z", "crops/high/R13-carrier"], "benchmark": "cfb26-4", "fix": "Add paired contact poses: the tackler wraps and drives, and the carrier absorbs, loses balance and falls in the direction of momentum over at least 3 strip frames. Add a 3-4 frame hit-stop plus about 0.3 s of slow motion at contact. Run a capsule separation pass so downed bodies stack instead of fusing. Keep the ball attached to the carrying hand through impact. Test: strips/high/R13 shows a wrap frame; strips/high/R09 and R10 show an intermediate falling frame between upright and prone; no limb passes through another body in crops/high/R12-carrier or R09-slot_Z." },
    { "id": "G-bloom-veil", "category": "lighting", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["high/desktop/R04", "medium/desktop/R04", "strips/high/R07", "strips/high/R09", "high/desktop/R08"], "benchmark": "cfb26-3", "fix": "On High, clamp lamp-head emissive (or bloom only above the clamp) so the lamp rack grid survives as it does on Medium. Cap the bloom radius and fog in-scatter from lamps outside the frustum so they can't wash the frame. Test: the racks are resolvable in high/desktop/R04 as in medium/desktop/R04, and the top-corner sky luminance in strips/high/R07 is within 10% of strips/medium/R07." },
    { "id": "G-ball-visibility", "category": "readability", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS4", "evidence": ["crops/high/R08-ball", "crops/high/R10-carrier", "crops/high/R11-carrier", "high/desktop/R08"], "benchmark": "retrobowl-2", "fix": "Carry the ball on the carrier's sideline-side (outside) arm so it shows from behind and the side. Give the ball a light stripe or rim and a short faint flight trail. Aim the ball close-up camera at the ball's world position. Test: the ball is visible in crops/high/R08-ball, R10-carrier and R11-carrier, and a trail shows in high/desktop/R08." },
    { "id": "G-live-panel", "category": "ui", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R08", "high/desktop/R18", "high/desktop/R10"], "benchmark": "axis-1", "fix": "On desktop, collapse the right panel to a slim strip after the snap so the 3D view widens, and show JUKE as an on-field pill. Keep the numbered receiver tags on receivers through pass plays. Test: the field view is at least 90% of the width in high/desktop/R08 and R10, and numbered tags are visible on receivers in high/desktop/R08. Gain split 0.15 ui, 0.15 readability." },
    { "id": "G-venue-life", "category": "authenticity", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["high/desktop/R01", "crops/high/R01-crowd", "high/desktop/R14", "high/desktop/R20"], "benchmark": "cfb26-2", "fix": "Add a uniformed band block (one uniform colour, with instrument glints) and a student-section block (a shared shirt colour, with props) to the home stand, and cheerleaders on the track in front of it. Make sure they appear in the R01 establishing shot and the TD shot. Test: band and student section are identifiable in crops/high/R01-crowd and high/desktop/R01, and cheerleaders are visible in high/desktop/R14." },
    { "id": "G-venue-backdrop", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["high/desktop/R13", "high/desktop/R01", "high/desktop/R07", "crops/high/R13-carrier", "crops/high/R12-carrier"], "benchmark": "axis-3", "fix": "Replace the flat grey wall planes behind the end zones and the visitor stand with a modelled chain-link fence and a lamp-rimmed tree-line card. Swap the black cone trees for textured tree cards. The press box and field house already exist. Test: no untextured flat grey plane covers more than 10% of the frame in high/desktop/R01, R13 and R15. Gain split 0.3 authenticity, 0.2 art." },
    { "id": "G-anatomy", "category": "art", "expectedGain": 0.7, "severity": 4, "effort": "L", "workstream": "WS3", "evidence": ["crops/high/R04-slot_C", "crops/high/R06-slot_C-side", "crops/high/R03-slot_QB", "crops/high/R06-slot_C"], "benchmark": "axis-3", "fix": "Cut the stance seat volume to no wider than the hips. Replace solid-colour arms with short sleeves, skin-tone forearms and separate gloves. Blend the shoulder-torso and pelvis-thigh transitions. Rebuild officials on the player body with continuous striped sleeves, black pants and a face. Test: the #69 seat is narrower than his hip width in crops/high/R04-slot_C, forearms and gloves read in crops/high/R06-slot_C-side, and the official's sleeves are continuous in crops/high/R03-slot_QB." },
    { "id": "G-falloff", "category": "lighting", "expectedGain": 0.4, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["high/desktop/R17", "high/desktop/R02", "high/desktop/R01", "high/desktop/R13"], "benchmark": "axis-3", "fix": "Add light pools under each tower on the field (10-15% luminance variation). Make the apron and track fall off radially from each tower base instead of a uniform khaki band. Add lamp spill on the front crowd rows. Test: apron luminance drops steadily away from the tower bases in high/desktop/R02 and R17, and visible brighter pools sit under the towers on the field." },
    { "id": "G-r01-crowd-framing", "category": "authenticity", "expectedGain": 0.2, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R01", "crops/high/R01-crowd"], "benchmark": "cfb26-1", "fix": "Turn the pre-boot kickoff establishing camera a further 10-15 degrees toward the home grandstand, or widen its FOV, so the stand and tower fill the left third as the brief intended. Test: the crowd covers at least 25% of the frame width in high/desktop/R01." },
    { "id": "G-locomotion", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS4", "evidence": ["crops/high/R11-carrier", "strips/high/R11", "strips/high/R07"], "benchmark": "madden26-4", "fix": "Add planted cut steps for the carrier: drop the pelvis, lean the torso at least 15 degrees into the cut, and keep the plant foot fixed for the plant frame. Add a forward weight transfer on the QB release. Test: crops/high/R11-carrier shows a visible lean toward the cut, and strips/high/R11 shows a plant frame." },
    { "id": "G-wet-turf", "category": "lighting", "expectedGain": 0.3, "severity": 2, "effort": "M", "workstream": "WS5", "evidence": ["crops/high/R18-turf_26_67_40", "high/desktop/R18"], "benchmark": "cfb26-4", "fix": "In rain, darken the turf albedo and lower its roughness with multi-scale variation, so lamp reflections become elongated streaks across the field instead of one hotspot. Add wet helmet speculars and splash particles at players' feet. Test: crops/high/R18-turf_26_67_40 shows specular streaks in at least three separate turf regions, and helmet highlights are brighter than in dry R04." }
  ],
  "verdict": "continue"
}
```
