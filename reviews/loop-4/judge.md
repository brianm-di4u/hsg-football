# Judge ruling: loop 4, High tier, desktop

Paths are relative to `games/football/screenshots/review-loop-4/`. I opened every capture cited below myself. The disputed ones were the R01, R04, R12, R15, R16, R17, R18, R20, R21 and R22 frames; `high/mobile/R04`, `R08`, `R12` and `R21`; `medium/mobile/R21`; the crops R01-board, R01-crowd, R03-slot_QB, R04-slot_C, R06-slot_C, R09-slot_Z, R11-carrier, R12-carrier, R14-carrier, R16-slot_K and R18-turf; and the strips R07, R09, R10 (panels 6 and 7 enlarged), R11 and R13. For calibration I compared against the benchmarks `axis-3` and `cfb26-3`.

No category has the two critics more than 1.0 apart. The largest spread is 0.5, in lighting, animation, UI and mobile. I still settled every factual dispute against the pixels, as listed below.

## Factual disputes settled

| # | Claim | Who was right | What the capture shows |
|---|---|---|---|
| 1 | The stands are a "black void" in R01 and R17 (A); the stands are just out of frame (Advocate) | **Both partly** | In `high/desktop/R01` and `high/desktop/R17`, an unlit ring of end-zone wall, apron and dark bowl takes up about a fifth of the frame, with only a line of specks at the top edge. Where a stand is in frame, it is lit, but as a bright box hovering over a flat grey wall (`high/desktop/R15`, `strips/high/R13`). So the defect is real, but its cause is the perimeter and the missing stand structure, not crowd exposure. |
| 2 | High has no lamp heads (A) | **Advocate** | `high/desktop/R04`, `R20`, `R21` and `R22` show lit lamp banks with bloom. |
| 3 | The shadows have a single dominant direction (B) | **Advocate** | In `high/desktop/R17`, each coverage player casts two or more soft shadow fans. |
| 4 | Officials are "featureless black mannequins" (A) | **Mostly Advocate** | `crops/high/R03-slot_QB` shows a white cap. `crops/high/R12-carrier` shows a dark-brown skin head under a black cap. A is right that there is no face and that the sleeves float with a gap at the shoulder (`crops/high/R03-slot_QB`). |
| 5 | The R16 instructions conflict (A) | **Advocate** | In `high/desktop/R16` the green zone is bracketed by the upright markers, so the two strings agree. The duplicated "FIELD GOAL · 45 YD" title is real. |
| 6 | The R12 carrier is buried under the banner (A) | **Advocate** | In `high/desktop/R12` the banner sits at y≈670–745, below the pile at y≈545. Standing bodies are what hide the carrier. |
| 7 | `strips/high/R09` shows a camera punch-in (B) | **Advocate** | The framing is constant across all 8 panels. The punch-in does exist: with `strips/high/R10` panels 6 and 7 enlarged, panel 7 is clearly tighter. |
| 8 | There is no catch beat (A) | **A on the result, Advocate on the cause** | The ball is still in flight in all 8 panels of `strips/high/R09`, so the capture fires early. `crops/high/R09-slot_Z` still shows #88 with his arms down and the defender clipped into his body. |
| 9 | Upside-down chest numbers (A) | **A, confirmed** | `crops/high/R04-slot_C` shows "53" and "90" (as "06") rotated 180°. `crops/high/R06-slot_C` shows "63" flipped. The flip appears on crouched torsos only. |
| 10 | Lake Hamilton's kit is "identical" to Hot Springs' (A) | **A in substance** | At frame scale the huddles in `high/desktop/R03` and `high/desktop/R22` read the same: near-black tops with the same orange pants. Jessieville in `high/desktop/R20` also wears dark tops with orange pants under a purple HUD. The Advocate's sampled hue difference doesn't survive at frame scale. |
| 11 | The phone result band is translucent (A, B); it is a transient fade (Advocate) | **Advocate on the cause, critics on the frame** | `high/mobile/R12` is fully opaque, and `medium/mobile/R21` is nearly so. `high/mobile/R21` is caught mid-fade: inset, grey text, with the yard lines and huddle legs showing through. The desktop "NO GAIN" banner in `strips/high/R10` panel 6 shows the same fade. |
| 12 | The celebration is one uniform pose (A) | **Advocate** | `crops/high/R14-carrier` shows one-arm, two-arm and ball-raised poses. |
| 13 | The R22 playbook is clipped (B) | **B** | In `high/desktop/R22`, card "0" is cut by the viewport, with no scroll cue. |
| 14 | The punt is staged like a kickoff (A) | **Can't be decided** | In `high/desktop/R17` the receiving team stands in three tidy rows, which looks kickoff-like, but the snap isn't in frame. I dropped it as a gap. |

## Category rulings

**Art: 5.5.** `crops/high/R04-slot_C` and `crops/high/R06-slot_C` show glossy helmets against matte jerseys, readable facemasks (the grey mask on navy helmets works) and turf grain. They also show tube limbs, mitten hands, no cleat or sock separation, no cloth folds, and chest numbers flipped 180° on crouched players. `crops/high/R01-crowd` reads as people in mixed poses. `crops/high/R03-slot_QB` shows the officials have no faces and floating sleeves. Against `axis-3`, the gear doesn't hold up in close-ups. Both critics and the Advocate agree.

**Lighting & atmosphere: 6.0.** For the 7 anchor:
- Present: lamp bloom (`high/desktop/R04`, `high/desktop/R20`), several soft shadows (`high/desktop/R17`), wet turf sheen (`crops/high/R18-turf_26_67_40`) and a good day mist (`high/desktop/R19`).
- Missing: falloff from the field to the stands. Wide frames go to an unlit ring (`high/desktop/R01`, `high/desktop/R17`, `high/desktop/R16`), and the stand is a lit box floating over a grey wall (`high/desktop/R15`). The field is evenly lit, with no pooling under the banks. In rain, the players get no wet sheen and the splashes are flat white squares (`crops/high/R18-turf_26_67_40`).

Against `cfb26-3`, the bowl isn't integrated with the field. The Advocate corrected A's facts but not the result. On balance this is a 6.0: the wide establishing shots are where lighting is judged first, and they fail.

**Animation & game feel: 5.0.**
- Cycles read and the carrier tracks his ring (`strips/high/R11`).
- The new punch-in is visible (`strips/high/R10` panels 6→7).
- The tackle pops from upright to prone across panels 5→6 of `strips/high/R10`. The clock jumps from 3:20 to 3:18 there, so part of the problem is capture spacing, but nothing on screen shows a fall.
- `strips/high/R13` shows no wrap, and `crops/high/R12-carrier` shows a helmet sunk into a torso.
- Stance poses are wrong: no hand down in `crops/high/R06-slot_C`, the ball loose at the center's feet in `crops/high/R04-slot_C`, and the holder's hand off the ball in `crops/high/R16-slot_K`.
- `crops/high/R11-carrier` freezes the carrier in a split leap.

This is exactly the 5 anchor plus one feel touch. B's 4.5 sits below an anchor the strips meet.

**UI / HUD: 6.5.**
- Meets 7-anchor items: pre-snap route art with shaped receiver tags, the LOS and the first-down line (`high/desktop/R04`), and result banners with hierarchy (`high/desktop/R12`, `high/desktop/R14`).
- Deductions:
  - The right panel takes about 28% of the width and is empty during live play (`high/desktop/R10`).
  - The playbook card is clipped with no scroll cue (`high/desktop/R22`).
  - The first-down toast and log line have no runner name (`high/desktop/R21`).
  - The FG title is duplicated (`high/desktop/R16`).
  - Banners fade in over the play (`strips/high/R10` panel 6).
- A's R16 deduction was invalid. Not yet at 7.

**Typography: 6.5.** The condensed display face and body sans are consistent on a clear scale (`high/desktop/R22`), and the banner numerals read at a glance (`high/desktop/R14`). The in-world clock is a Courier-like face with a spaced colon (`crops/high/R01-board`). The italic "1ST & 10" field paint is off-family (`high/desktop/R04`). Description text is low-contrast grey (`high/desktop/R22`). All three reviewers agree.

**Readability: 6.0.**
- What works:
  - LOS, targets and tags are instant (`high/desktop/R04`).
  - The ball is oversized and dark, with a cyan target ring (`high/mobile/R08`).
  - The carrier gets a name plate in live play (`high/desktop/R18`).
- What fails:
  - The replay ring is empty and the carrier unlabeled (`high/desktop/R15`, `strips/high/R13`).
  - The ring lags an airborne carrier (`crops/high/R11-carrier`).
  - Portrait pre-snap figures are about 12 CSS px tall, with roughly 40% of the field area empty turf (`high/mobile/R04`).
- All three reviewers agree.

**Mobile: 6.0.**
- What works: thumb targets are good (`high/mobile/R22`, `high/mobile/R04`), and the docked band works when settled (`high/mobile/R12`).
- What fails:
  - The figures, the anchor's first clause, are small: about 12 CSS px pre-snap in `high/mobile/R04`, with half the frame empty in `high/mobile/R08`.
  - The in-world scoreboard is clipped under the HUD (`high/mobile/R21`, `high/mobile/R12`).
  - The band ghosts during its fade (`high/mobile/R21`).
  - There is no landscape capture.
  - On the phone proxy, medium at 4× throttle averages 58 fps but has a 35.8 ms p95, so about 5% of frames fall below 30 fps. High wasn't throttled.
- The two critics differ by only 0.5. I side with B because the figure-size clause fails outright.
- A side note on perf.json: high/desktop "pass" reports gpuMs 226 at 410 fps. The GPU timer reading is unreliable there and should be fixed in the perf harness.

**Authenticity: 6.0.** Real Garland County schools, local play names, a Ouachita ridgeline, a high-school scoreboard (`crops/high/R01-board`) and a smaller 3A venue (`high/desktop/R20`). On the other side: kits don't match their school palettes (`high/desktop/R03`, `high/desktop/R20`), there is no band, cheer squad, chain crew or track lanes, and the sideline figures are identical in pose and spacing (`high/desktop/R15`). This meets the 6 gate. All agree.

**Total: 47.5. Verdict: continue.** Seven gates are unmet: art, lighting, animation, UI, typography, readability and mobile.

## Ranked gaps (expected gain ÷ effort; S=1, M=2, L=4; ties broken by severity)

1. **G-chest-number-flip** (art, WS3, S, +0.5, sev 4): chest numbers flip 180° on crouched torsos (`crops/high/R04-slot_C`, `crops/high/R06-slot_C`).
   - Fix: parent the number quad to the chest bone with a fixed local orientation, with no world-up lookAt.
   - Test: #90 must read "90" both upright (`crops/high/R03-slot_QB`) and in stance (`crops/high/R04-slot_C`).
2. **G-line-stance** (animation, WS4, S, +0.5, sev 3): there are no three-point stances, the center isn't holding the ball, the holder's hand is off the ball, and the cut frame is a split leap (`crops/high/R06-slot_C`, `crops/high/R04-slot_C`, `crops/high/R16-slot_K`, `crops/high/R11-carrier`).
   - Fix: author OL/DL three-point and four-point stance poses with one hand on the turf.
   - Fix: put the center's hands on the ball and the holder's hand on the ball tip.
   - Fix: replace the R11 cut frame with a planted outside foot, knee flexed, at no more than about 90° hip spread.
3. **G-carrier-tracking** (readability, WS7, S, +0.5, sev 3): the carrier marker doesn't follow the carrier everywhere.
   - Fix: lock the carrier ring to the carrier's pelvis XZ every frame, including while airborne.
   - Fix: keep the "44 DELACROIX" name plate on in replays.
   - Test: the ring is non-empty in every panel of `strips/high/R13` and in `high/desktop/R15`.
4. **G-result-band** (ui, WS7, S, +0.5, sev 3): result bands fade in over the play and drop the runner's name.
   - Fix: give the result band an opaque background from its first frame and fade only the text, on desktop and phone (`high/mobile/R21`, `strips/high/R10` panel 6).
   - Fix: always include the runner's name in the toast and log ("+7 YD · FIRST DOWN / M. DELACROIX RUN", `high/desktop/R21`).
5. **G-mobile-framing** (mobile, WS7, M, +0.75, sev 4): portrait framing leaves players tiny.
   - Fix: tighten the portrait pre-snap and pass cameras so players are at least 20 CSS px tall.
   - Fix: crop the empty turf behind the offense (`high/mobile/R04`, `high/mobile/R08`).
   - Fix: lower the camera target so the in-world scoreboard either clears the HUD or is cut out deliberately (`high/mobile/R21`).
   - Fix: add a landscape capture, and profile High at 4× throttle with p95 at or below 33 ms.
6. **G-contact-beats** (animation, WS4b, L, +1.0, sev 5): tackles pop from upright to prone, and bodies interpenetrate (`strips/high/R10`, `strips/high/R13`, `crops/high/R12-carrier`).
   - Fix: a phased tackle: wrap with arms around the carrier, a 0.25 s drive, a fall blended by impact direction, then a ground settle.
   - Fix: capsule separation, so no helmet enters a torso.
   - Fix: keep the ball in the carrier's hand, not resting on a helmet.
   - Fix: sample the R10 and R13 strips at 0.1 s or finer across the contact window, so no 2 s jump.
7. **G-mannequin-detail** (art, WS3, L, +1.0, sev 5): tube limbs, mitten hands and missing gear details (`crops/high/R06-slot_C`, `crops/high/R14-carrier`, `crops/high/R03-slot_QB`).
   - Fix: shaped knees and elbows, gloves with finger splits, sock and cleat separation, and thigh and knee pad bulges.
   - Fix: a jersey normal map with folds and mesh.
   - Fix: give the officials simple facial features and attach their sleeves to the torso. Skin tone and caps already exist.
8. **G-catch-beat** (animation, WS4, M, +0.5, sev 4): the R09 capture never reaches the catch.
   - Fix: re-time the R09 frame and strip to span ball arrival ±0.3 s.
   - Fix: add reach IK to the ball's predicted point from 0.35 s before arrival, then a hands-in secure pose.
   - Fix: separate the receiver and defender capsules (`strips/high/R09`, `crops/high/R09-slot_Z`).
9. **G-perimeter-light** (lighting, WS1, M, +0.5, sev 4): wide shots have no light falloff onto the stands and perimeter.
   - Fix: add spill from the light banks onto the end-zone wall, the apron and the stand fascia, with distance falloff.
   - Fix: model the stand risers below the crowd box, so the lit crowd sits on lit structure (`high/desktop/R15`, `high/desktop/R01`, `high/desktop/R17`).
   - Fix: in rain, raise player clearcoat and roughness wetness, and replace the square splash sprites with ring or streak sprites (`crops/high/R18-turf_26_67_40`).
10. **G-sidebar-live** (ui, WS7, M, +0.5, sev 3): the desktop side panel wastes space during live play and clips the playbook.
    - Fix: collapse the right panel to a 64 px rail during live play and give the width back to the field (`high/desktop/R10`).
    - Fix: give the playbook a scroll affordance, or 2 columns, so no card is clipped (`high/desktop/R22`).
    - Fix: remove the duplicate FG title (`high/desktop/R16`).
11. **G-scoreboard-font** (typography, WS7, S, +0.25, sev 2): the in-world type isn't part of the type system.
    - Fix: use a 7-segment or dot-matrix face for the in-world clock and digits (`crops/high/R01-board`).
    - Fix: set the field "1ST & 10" paint in the HUD condensed family (`high/desktop/R04`).
    - Fix: raise the description grey to at least 4.5:1 contrast on navy (`high/desktop/R22`).
12. **G-team-identity** (authenticity, WS3, S, +0.25, sev 2): kits don't carry their schools' colors.
    - Fix: drive jersey, pant and helmet colors from the HUD team palette: maroon Lake Hamilton, purple Jessieville, teal accents on Tufa Ridge.
    - Fix: stop sharing orange pants across schools.
    - Test: the huddles in `high/desktop/R03` and `high/desktop/R22` are distinguishable at frame scale.

I left out two gaps:
- **G-pageantry** (band, cheer squad, chain crew, track lanes): it is real, but authenticity already meets its gate, so it ranks 13th.
- **G-punt-staging**: it can't be judged from the frame.

```json
{
  "loop": 4,
  "role": "judge",
  "tier": "high",
  "scores": {
    "art": {
      "score": 5.5,
      "confidence": 0.85,
      "evidence": [
        { "shot": "crops/high/R04-slot_C", "note": "Glossy helmet vs matte jersey present; tube limbs, mitten hands; '53' and '90' flipped 180 degrees on crouched defenders." },
        { "shot": "crops/high/R06-slot_C", "note": "'63' flipped; no cloth folds or cleat detail; grey mask on navy helmets reads." },
        { "shot": "crops/high/R01-crowd", "note": "Crowd reads as people with mixed poses and shirt colours." },
        { "shot": "crops/high/R03-slot_QB", "note": "Official has a white cap but no face; striped sleeves float off the shoulder." }
      ]
    },
    "lighting": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        { "shot": "high/desktop/R04", "note": "Lit lamp banks with bloom on High; saturated dusk sky." },
        { "shot": "high/desktop/R17", "note": "Multiple soft shadow fans per player; unlit perimeter ring fills the top of the wide frame." },
        { "shot": "high/desktop/R01", "note": "Establishing shot: dark unlit bowl and wall, no field-to-stand falloff." },
        { "shot": "high/desktop/R15", "note": "Lit crowd box floats over a flat grey wall." },
        { "shot": "crops/high/R18-turf_26_67_40", "note": "Wet turf speckle sheen; no wet sheen on players; square splash sprites." },
        { "shot": "high/desktop/R19", "note": "Convincing day mist." }
      ]
    },
    "animation": {
      "score": 5.0,
      "confidence": 0.8,
      "evidence": [
        { "shot": "strips/high/R10", "note": "Defender upright in panel 5, prone in 6 (clock 3:20 to 3:18); punch-in confirmed panel 6 to 7." },
        { "shot": "strips/high/R11", "note": "Run cycle reads; carrier tracks ring." },
        { "shot": "strips/high/R09", "note": "Ball in flight in all 8 panels; no catch beat captured; framing constant." },
        { "shot": "strips/high/R13", "note": "No visible wrap or contact." },
        { "shot": "crops/high/R12-carrier", "note": "Helmet sunk into torso; ball resting on a helmet." },
        { "shot": "crops/high/R06-slot_C", "note": "No three-point stance; arms hang." },
        { "shot": "crops/high/R11-carrier", "note": "Split-leap cut pose." }
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.75,
      "evidence": [
        { "shot": "high/desktop/R04", "note": "Route art, shaped receiver tags, LOS and first-down line, matching diagram." },
        { "shot": "high/desktop/R12", "note": "Result banner with hierarchy sits below the pile; play log." },
        { "shot": "high/desktop/R16", "note": "Instruction strings agree (green zone = uprights); duplicated FG title." },
        { "shot": "high/desktop/R22", "note": "Playbook card 0 clipped with no scroll cue." },
        { "shot": "high/desktop/R21", "note": "First-down toast and log omit the runner's name." },
        { "shot": "high/desktop/R10", "note": "Right panel mostly empty during live play." }
      ]
    },
    "typography": {
      "score": 6.5,
      "confidence": 0.8,
      "evidence": [
        { "shot": "high/desktop/R22", "note": "Consistent condensed display plus sans body on a clear scale; low-contrast grey descriptions." },
        { "shot": "crops/high/R01-board", "note": "Courier-like in-world clock with spaced colon." },
        { "shot": "high/desktop/R04", "note": "Off-family italic '1ST & 10' field paint." },
        { "shot": "high/desktop/R14", "note": "Touchdown banner reads at a glance." }
      ]
    },
    "readability": {
      "score": 6.0,
      "confidence": 0.8,
      "evidence": [
        { "shot": "high/desktop/R04", "note": "LOS, first-down line and target tags instant." },
        { "shot": "high/mobile/R08", "note": "Oversized dark ball and cyan target ring; much empty field." },
        { "shot": "high/desktop/R15", "note": "Replay ring empty; carrier unlabeled." },
        { "shot": "crops/high/R11-carrier", "note": "Ring lags the airborne carrier." },
        { "shot": "high/mobile/R04", "note": "Pre-snap figures about 12 CSS px tall." }
      ]
    },
    "mobile": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        { "shot": "high/mobile/R12", "note": "Docked opaque result band works when settled." },
        { "shot": "high/mobile/R21", "note": "Band caught mid-fade, translucent; in-world board clipped under HUD." },
        { "shot": "medium/mobile/R21", "note": "Same moment, nearly opaque band: fade timing, not a failed change." },
        { "shot": "high/mobile/R04", "note": "Large HIKE/CHANGE PLAY targets; tiny figures; roughly 40% empty turf." },
        { "shot": "high/mobile/R22", "note": "Two-column play cards, thumb-friendly." }
      ]
    },
    "authenticity": {
      "score": 6.0,
      "confidence": 0.8,
      "evidence": [
        { "shot": "crops/high/R01-board", "note": "Authentic HS scoreboard (HSHS/LHHS, BALL ON)." },
        { "shot": "high/desktop/R03", "note": "Lake Hamilton maroon HUD/end zone but kit reads as Hot Springs' black/orange." },
        { "shot": "high/desktop/R20", "note": "Smaller 3A venue with tree-lined ends; purple HUD vs dark/orange kit." },
        { "shot": "high/desktop/R15", "note": "No band, cheer or chain crew; identical sideline poses." }
      ]
    }
  },
  "gaps": [
    { "id": "G-chest-number-flip", "category": "art", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS3", "evidence": ["crops/high/R04-slot_C", "crops/high/R06-slot_C", "crops/high/R03-slot_QB"], "benchmark": "axis-3", "fix": "Parent the chest-number quad to the chest bone with fixed local orientation (no world-up lookAt); test that #90 reads '90' upright (R03-slot_QB) and in stance (R04-slot_C)." },
    { "id": "G-line-stance", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS4", "evidence": ["crops/high/R06-slot_C", "crops/high/R04-slot_C", "crops/high/R16-slot_K", "crops/high/R11-carrier"], "benchmark": "axis-1", "fix": "Author OL/DL three- and four-point stances with a hand on the turf; center's hands on the ball; holder's hand on the ball tip; replace the R11 split-leap cut frame with a planted-outside-foot cut pose (hip spread <= 90 degrees)." },
    { "id": "G-carrier-tracking", "category": "readability", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["strips/high/R13", "high/desktop/R15", "crops/high/R11-carrier"], "benchmark": "legendbowl-2", "fix": "Lock the carrier ring to the carrier's pelvis XZ every frame (including airborne) and keep the name plate on in replays; ring must be occupied in all 8 panels of strips/high/R13." },
    { "id": "G-result-band", "category": "ui", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/mobile/R21", "strips/high/R10", "high/desktop/R21"], "benchmark": "madden26-3", "fix": "Result band background opaque from frame one on desktop and phone (fade text only); always include the runner's name in toast and log line." },
    { "id": "G-mobile-framing", "category": "mobile", "expectedGain": 0.75, "severity": 4, "effort": "M", "workstream": "WS7", "evidence": ["high/mobile/R04", "high/mobile/R08", "high/mobile/R21"], "benchmark": "retrobowl-1", "fix": "Tighten portrait pre-snap and pass cameras so players are >= 20 CSS px tall, crop empty turf behind the offense, keep the in-world board clear of the HUD; add a landscape capture and a High 4x-throttle perf row with p95 <= 33 ms." },
    { "id": "G-contact-beats", "category": "animation", "expectedGain": 1.0, "severity": 5, "effort": "L", "workstream": "WS4b", "evidence": ["strips/high/R10", "strips/high/R13", "crops/high/R12-carrier"], "benchmark": "madden26-4", "fix": "Phased tackle (wrap, 0.25 s drive, impact-direction fall, ground settle) with capsule separation and the ball held in the carrier's hand; sample R10/R13 strips at <= 0.1 s across the contact window." },
    { "id": "G-mannequin-detail", "category": "art", "expectedGain": 1.0, "severity": 5, "effort": "L", "workstream": "WS3", "evidence": ["crops/high/R06-slot_C", "crops/high/R14-carrier", "crops/high/R03-slot_QB"], "benchmark": "axis-3", "fix": "Shaped knees/elbows, gloves with finger splits, sock/cleat separation, thigh and knee pad bulges, jersey fold/mesh normal map; officials get simple faces and sleeves attached to the torso." },
    { "id": "G-catch-beat", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS4", "evidence": ["strips/high/R09", "crops/high/R09-slot_Z"], "benchmark": "cfb26-4", "fix": "Re-time the R09 frame and strip to span ball arrival +/-0.3 s; reach IK to the predicted ball point from 0.35 s before arrival, secure pose on arrival; receiver/defender capsule separation." },
    { "id": "G-perimeter-light", "category": "lighting", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS1", "evidence": ["high/desktop/R01", "high/desktop/R17", "high/desktop/R15", "crops/high/R18-turf_26_67_40"], "benchmark": "cfb26-3", "fix": "Spill from the light banks onto end-zone wall, apron and stand fascia with distance falloff; model lit risers under the crowd box; in rain add wetness to player materials and swap square splash sprites for ring/streak sprites." },
    { "id": "G-sidebar-live", "category": "ui", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["high/desktop/R10", "high/desktop/R22", "high/desktop/R16"], "benchmark": "axis-1", "fix": "Collapse the right panel to a 64 px rail during live play and widen the field; playbook gets a scroll affordance or two columns so no card is clipped; remove the duplicate FG title." },
    { "id": "G-scoreboard-font", "category": "typography", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["crops/high/R01-board", "high/desktop/R04", "high/desktop/R22"], "benchmark": "madden26-3", "fix": "7-segment/dot-matrix face for the in-world scoreboard; field '1ST & 10' paint in the HUD condensed family; description grey raised to >= 4.5:1 on navy." },
    { "id": "G-team-identity", "category": "authenticity", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS3", "evidence": ["high/desktop/R03", "high/desktop/R22", "high/desktop/R20"], "benchmark": "cfb26-1", "fix": "Drive jersey, pant and helmet colours from the HUD team palette (maroon Lake Hamilton, purple Jessieville, teal Tufa Ridge accents), no shared orange pants; R03 and R22 huddles must be distinguishable at frame scale." }
  ],
  "verdict": "continue"
}
```
