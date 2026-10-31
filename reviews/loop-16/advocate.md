# Advocate rebuttal: loop 16 (High tier, desktop)

Capture paths are relative to `games/football/screenshots/review-loop-16/`. My zoomed crops (made only to check claims) are in `C:\Users\brian\AppData\Local\Temp\claude\C--Video-Game-Projects-games-football\790bf3d4-42e4-4dfb-9562-ebad5fae8fb3\scratchpad\adv16\`.

Critic means: art 5.75, lighting 6.5, animation 5.25, ui 6.75, typography 7.0, readability 6.25, mobile 6.25, authenticity 6.25.

## Summary
Most of what the critics found is real. I checked the pants bulge in crouch, faceless officials, interpenetrating bodies in the R12 pile, the left-sideline flare in R05, the backdrop share in the desktop pre-snap, small portrait figures, the sidebar width jump and the missing band and student section. All of them are visible. I rebut five things:
- Claude's "fingerless mitt" hands: the fingers are separate.
- Claude's "no punch-in at the catch": his own R09 reading contradicts it.
- Codex's animation 4.5: it sits below the rubric's 5 anchor while Codex concedes the cycles read.
- Codex's claim that the phone throttle numbers are unidentified: the brief labels them.
- Several gap severities and gains that ignore evidence already on screen: wrap contacts, distinct fall directions, edge markers, and landscape framing.

## Plain factual errors
1. **Claude, art:** "Hands are fingerless mitts in the sleeve colour (the #55 hands in `crops/high/R06-slot_C-side`)."
   - **Wrong on "fingerless".** Zoomed, both #55 hands show four separate fingers and a split thumb. The left hand is splayed over the jersey and the right is open at the hip (scratchpad `adv16/r06side_hands.png`).
   - **True on colour.** The hand is the same cream as the arm, and the fingers are stiff and fanned.
2. **Claude, mobile:** "In `medium/mobile/R04`, receivers 1–3 sit clipped at the screen edges."
   - Receiver 3 is fully on screen at about x 710 of 780, with his △3 tag and his body both visible.
   - Only 1 and 2 are at the edges. They carry the numbered edge markers with outward arrows that the brief says are intended.
3. **Claude, animation:** "no punch-in ... at the catch."
   - His own R09 note says "the camera tightens between frames 3 and 4". `strips/high/R09` confirms it: in frame 4 the yard lines spread and the figures roughly double in size, a push toward the catch point.
   - The no-punch-in claim holds only for the R10 tackle. `strips/high/R10` frames 5–8 keep the same wide camera.
4. **Claude, UI:** the side panel "still draws every rusher's X and line converging in a knot on the QB" (`high/desktop/R05`).
   - Zoomed (`adv16/r05_panel.png`), most red rush arrows drop straight down from their X into the gap below. One is diagonal. The two long light-blue lines are coverage assignments to the RB and TE, not rush lines.
   - What is a knot is the overlapping X glyphs, five to six stacked within about 60 px. So the real defect is glyph spacing, not converging paths.
5. **Codex, mobile:** "the table does not separately identify the 4× throttled measurement."
   - The table header reads "Performance (real GPU; phone proxy is 4× CPU throttle)".
   - The capture notes say "the 4× throttled phone numbers are lower than in loop 15".
   - So medium · mobile at 488 fps min and 2.5 ms p95 is the throttled phone proxy, far above the 30 fps bar. The performance part of the mobile anchor is established, not uncertain.
6. **Codex, lighting:** the R05 flare "covers the left field" and "washes out playable field." This is overstated.
   - Zoomed (`adv16/r05_glare.png`, x 0–320, y 330–650 of `high/desktop/R05`), the bloom sits on the sideline and the outer strip inside the left boundary.
   - The wide receiver and defender on that side (about x 80 and 230) stay readable, with numbers and shadows.
   - It is a real defect but a bounded one.
7. **Codex, lighting:** "`high/desktop/R18` retains conspicuous pools of illumination."
   - In `high/desktop/R18` the field shows a smooth, gradual brightening toward midfield, the same falloff seen in R10.
   - I find no discrete pools. The graphic rain streaks are real.
8. **Codex, animation:** 4.5 is below the rubric's 5 anchor ("procedural cycles that read, but with popping, floaty contact and stiff falls"). Codex itself writes that `strips/high/R11` "communicates running".
   - Several frames show more than the 5 anchor asks for:
     - a wrap contact in `crops/high/R13-carrier`
     - a cocked throw in `crops/high/R07-slot_QB`
     - distinct fall directions in `crops/high/R12-carrier`
   - A score under 5 is not supported.

## Category by category

### Art (Claude 6.0, Codex 5.5, mean 5.75). Proposed 6.0
- **Concede:**
  - Crouch pants bulge: #69 in `crops/high/R04-slot_C`; #66 and #73 in `crops/high/R06-slot_C`.
  - Officials are blank egg heads with a hair cap and no features (`adv16/r04c_ref.png`, `adv16/r06c_ref.png`).
  - Angular elbow deformation on the white arm at upper left of `crops/high/R06-slot_C-side`.
  - No cloth folds.
  - Codex's proportion note fits `crops/high/R04-slot_QB`: big pad shoulders and a bulbous seat on #12 and #44.
- **Rebut:**
  - Hands have fingers (error 1 above).
  - Codex's "conspicuous repeated bodies" in `crops/high/R01-crowd` is overstated. The crop shows a dense, mixed crowd with several arm states (both up, one up, crossed, down) and three shirt colours. Repetition is visible only on close study.
  - Several 7-anchor items are present and both critics credit them:
    - glossy helmet against matte jersey, real facemask bars, outlined numbers and stripes (`crops/high/R04-slot_C`)
    - turf grain (`crops/high/R04-turf_26_67_42`)
    - a crowd that reads as people
    - a built scoreboard (`crops/high/R01-board`)
- **Score:** the defects keep it under 7, but it is well clear of the 5 anchor ("palette-only, crowd as blocks"). 6.0.

### Lighting (6.5 / 6.5, mean 6.5). Proposed 6.5
- **Concede:**
  - The R05 sideline flare.
  - Facemask blowout at the right edge of `crops/high/R06-slot_C-side`.
  - The flat olive surround in `high/desktop/R17` and `high/desktop/R10` (the y≈170–240 band).
- **Rebut:**
  - Codex's "pools" in R18 (error 7).
  - The flare's extent (error 6).
- **Supporting evidence:**
  - `high/desktop/R17` shows several shadows fanning from each player.
  - `high/desktop/R01` shows lamp bloom and a light pool falling off toward the stands.
- **Score:** agree with 6.5.

### Animation (Claude 6.0, Codex 4.5, mean 5.25). Proposed 5.5
- **Concede:**
  - The R12 pile interpenetrates. Zoomed (`adv16/r12_pile.png`), the #47 white torso and #20's navy body merge and orange legs vanish into torsos.
  - The R10 tackle has no punch-in, slow motion or particles (`strips/high/R10` frames 5–8).
- **Rebut Codex:**
  - `crops/high/R13-carrier` (zoom `adv16/r13_wrap.png`) shows a real wrap: the white defender's dark arm passes around the navy runner's waist, with his helmet over the runner's shoulder.
  - `crops/high/R12-carrier` shows distinct fall directions: one player on his back with cleats up at left, #20 face-down at right.
  - `crops/high/R11-carrier` shows #44 in full stride with a forward torso lean, the ball tucked and the trailing foot planted. That is weight, though there is no lateral bank into the cut.
  - `strips/high/R09` frames 6–8 show a two-arm reach, as Claude reads it.
- **Rebut Claude:** the catch does get a camera move (error 3).
- **Score:** between the two. 5.5.

### UI (Claude 6.5, Codex 7.0, mean 6.75). Proposed 6.5
- **Concede:**
  - Sidebar width jump: the 3D view is 920 px in `high/desktop/R04`, `R05`, `R12`, `R21` and `R22`, and 1030 px in `R08`, `R10`, `R14`, `R17` and `R18`.
  - Toast overlap at the bottom of `high/desktop/R12` and `high/desktop/R14`.
  - The crowded side-panel X's in `high/desktop/R05`.
  - Together these breach the 7 anchor's "nothing stale or overlapping".
- **Rebut severity:**
  - The R05 panel problem is glyph crowding, not stale converging arrows (error 4).
  - The toasts sit below the subject. The R12 pile and the R14 celebration are both fully clear. On phone, `medium/mobile/R12` puts the toast under the field and covers nothing.
- **Strengths verified:**
  - Shaped receiver tags in `high/desktop/R04`.
  - De-duplicated kick panel in `high/desktop/R16`.
  - "NEXT: THE TRY" in `high/desktop/R14`.
  - All 10 plays visible on desktop in `high/desktop/R22`.
- **Score:** 6.5. The two breaches are real but small.

### Typography (7.0 / 7.0). Proposed 7.0
- Agree.
- `high/desktop/R22` and `high/desktop/R21` show a consistent condensed display face over a sans body, with a clear scale.
- `medium/mobile/R22` scales the same pair cleanly.
- Claude's "1ST & 10" point concerns painted field graphics, not HUD type, so it should carry little weight.

### Readability (Claude 6.5, Codex 6.0, mean 6.25). Proposed 6.5
- **Concede:**
  - In `high/desktop/R04` the field begins at about y 365 in a 3D view that starts at y 72. That is about 40% backdrop.
  - QB #12 is about 45 px tall (`adv16/r04_qb.png`).
- **Rebut / weigh:** the live-play markers do the rubric's job in every live frame I checked.
  - `high/desktop/R08`: the oversized ball with a trail and the "2" ring on the target.
  - `high/desktop/R10` and `high/desktop/R18`: the "44 DELACROIX" plate and disc, with the carrier now at about y 600 rather than on the bottom edge.
  - The LOS is blue and the line to gain yellow.
  - On the phone, edge markers keep off-screen receivers identifiable (`medium/mobile/R04`).
- **Score:** 6.5.

### Mobile (Claude 6.5, Codex 6.0, mean 6.25). Proposed 6.5
- **Concede:**
  - Small portrait figures: linemen about 40–45 px at 2× in `medium/mobile/R04`.
  - The top half of that frame (y 160 to about 700) is empty downfield turf.
  - The R12 results stack takes about 35% of the screen (`medium/mobile/R12`, y 1105–1690).
  - `medium/mobile/R22` shows six of ten cards with no scroll cue.
- **Rebut:**
  - Performance is established (error 5).
  - Receiver 3 isn't clipped (error 2).
  - `medium/landscape/R04` shows the whole formation with all five route tags and routes. That is the coverage view Codex asks for in G-phone-formation, already present in landscape.
  - Controls are large: HIKE and CHANGE PLAY in `medium/mobile/R04`, a full-width JUKE in `medium/mobile/R10`, and CONTINUE, REPLAY and TIMEOUT in `medium/mobile/R12`.
- **Score:** 6.5.

### Authenticity (Claude 6.5, Codex 6.0, mean 6.25). Proposed 6.5
- **Concede:**
  - No band, cheer line or student section (`crops/high/R01-crowd` is one mixed home block).
  - Blank wall under the stand in `strips/high/R13`.
- **Supporting evidence:**
  - `high/desktop/R01`: a track apron by the home stand (also the tan strip at the bottom of `crops/high/R01-crowd`), sideline team boxes, light towers and an HSHS/LHHS segment board.
  - `high/desktop/R20`: Jessieville purple on a smaller field with pines and a small bleacher.
  - `high/desktop/R22`: Spa City play names.
  - The H goalpost in `high/desktop/R14`.
- **Score:** 6.5. It clears the gate of 6 on both critics' scores either way.

## Gap adjustments

**Claude's gaps**

| Gap | Critic | Adjusted | Reason |
|---|---|---|---|
| G-close-up-figure-defects | sev 4, +0.5 | sev 3, +0.5 | The hand claim is wrong (fingers visible in `crops/high/R06-slot_C-side`). The pants bulge and faceless officials stand. |
| G-empty-surround | sev 4, +0.5 | sev 3, +0.25 | Real in `high/desktop/R17`, `R10` and `strips/high/R13`. But the cause is unbuilt venue geometry (art and authenticity), not lighting, so the lighting gain is small. |
| G-contact-feel | sev 4, +0.5 | sev 3, +0.5 | The catch already gets a camera push (`strips/high/R09` frames 3→4). The gap is the tackle (`strips/high/R10`) and the pile layering. |
| G-presnap-backdrop-share | sev 3, +0.5 | sev 3, +0.5 | Conceded as stated. |
| G-blitz-panel-knot | sev 3, +0.25 | sev 2, +0.25 | Most panel arrows already drop straight into gaps. The fix is spacing out the X glyphs. |
| G-mobile-figure-size | sev 3, +0.5 | sev 3, +0.5 | Conceded. Receiver 3 isn't clipped, so the fix only needs edge handling for 1 and 2, which already have markers. |
| G-toast-occlusion | sev 2, +0.25 | sev 1, +0.1 | It covers only trailing players below the subject on desktop, and nothing on phone (`medium/mobile/R12`). |
| G-sidebar-width-jump | sev 2, +0.25 | sev 2, +0.25 | Conceded. |
| G-glare-and-blowout | sev 2, +0.25 | sev 2, +0.25 | Conceded. |
| G-gameday-staging | sev 3, +0.5 | sev 3, +0.5 | Conceded. |

**Codex's gaps**

| Gap | Critic | Adjusted | Reason |
|---|---|---|---|
| G-tackle-intersections | sev 5, +1.0 | sev 4, +0.5 | Interpenetration is real. But wrap contacts (`crops/high/R13-carrier`) and distinct fall directions (`crops/high/R12-carrier`) already exist, so half the proposed fix is done. |
| G-player-anatomy | sev 4, +1.0 | sev 3, +0.5 | Proportions alone won't move art a full point. The 7 anchor also wants cloth and venue. It overlaps G-close-up-figure-defects. |
| G-phone-formation | sev 4, +1.0 | sev 3, +0.5 | Edge markers already identify off-screen receivers, and landscape (`medium/landscape/R04`) shows the full formation. The empty downfield half in portrait is the real cost. |
| G-movement-beats | sev 4, +1.0 | sev 3, +0.5 | The two-arm reach (`strips/high/R09` frames 6–8) and the forward lean with a planted foot (`crops/high/R11-carrier`) are present. Missing: lateral bank in the cut and a secure beat. |
| G-lighting-spill | sev 3, +0.5 | sev 2, +0.25 | The flare is bounded to the sideline. The R18 "pools" aren't visible. It overlaps G-glare-and-blowout. |
| G-school-staging | sev 3, +0.5 | sev 3, +0.5 | Conceded. |

```json
{
  "loop": 16,
  "role": "advocate",
  "tier": "high",
  "scores": {
    "art": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "crops/high/R06-slot_C-side", "note": "#55 hands have four separate fingers and a thumb (not mitts); elbow faceting and cream hand matching arm are real"},
        {"shot": "crops/high/R04-slot_C", "note": "glossy helmets, facemask bars and outlined numbers versus pants bulge on #69 and a featureless official head"},
        {"shot": "crops/high/R01-crowd", "note": "dense mixed crowd with several arm poses; repetition not conspicuous"},
        {"shot": "crops/high/R04-turf_26_67_42", "note": "turf grain at field level"}
      ]
    },
    "lighting": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R17", "note": "several soft shadows per player; flat olive surround"},
        {"shot": "high/desktop/R05", "note": "flare limited to the sideline and outer strip; receivers at x~80 and 230 stay readable"},
        {"shot": "high/desktop/R18", "note": "smooth falloff, no discrete light pools; graphic rain streaks"},
        {"shot": "high/desktop/R01", "note": "lamp bloom and a light pool falling off toward the stands"}
      ]
    },
    "animation": {
      "score": 5.5,
      "confidence": 0.6,
      "evidence": [
        {"shot": "strips/high/R09", "note": "camera pushes in at frame 4; two-arm reach in frames 6-8"},
        {"shot": "strips/high/R10", "note": "tackle with no punch-in, slow motion or particles"},
        {"shot": "crops/high/R13-carrier", "note": "defender's arm wraps the runner's waist"},
        {"shot": "crops/high/R12-carrier", "note": "distinct fall directions but bodies interpenetrate in the pile"},
        {"shot": "crops/high/R11-carrier", "note": "forward lean, ball tucked, planted trailing foot"}
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R05", "note": "side-panel X glyphs crowded; most rush arrows drop straight into gaps"},
        {"shot": "high/desktop/R04", "note": "shaped numbered receiver tags; 3D view 920 px wide here versus 1030 px in R10"},
        {"shot": "high/desktop/R12", "note": "toast covers trailing players below the pile, not the pile itself"},
        {"shot": "high/desktop/R16", "note": "de-duplicated kick panel"}
      ]
    },
    "typography": {
      "score": 7.0,
      "confidence": 0.65,
      "evidence": [
        {"shot": "high/desktop/R22", "note": "consistent condensed display over sans body; all 10 plays legible"},
        {"shot": "high/desktop/R21", "note": "clear toast hierarchy and numerals"},
        {"shot": "medium/mobile/R22", "note": "same pair scaled up on the phone"}
      ]
    },
    "readability": {
      "score": 6.5,
      "confidence": 0.65,
      "evidence": [
        {"shot": "high/desktop/R08", "note": "oversized ball with trail; '2' ring on the target"},
        {"shot": "high/desktop/R10", "note": "carrier plate and disc at about y 600, no longer on the bottom edge"},
        {"shot": "high/desktop/R04", "note": "about 40% backdrop; QB about 45 px tall"},
        {"shot": "medium/mobile/R04", "note": "receiver 3 on screen; 1 and 2 at the edges with numbered markers"}
      ]
    },
    "mobile": {
      "score": 6.5,
      "confidence": 0.65,
      "evidence": [
        {"shot": "medium/mobile/R04", "note": "large HIKE and CHANGE PLAY buttons; small figures; empty downfield top half"},
        {"shot": "medium/landscape/R04", "note": "full formation with all five route tags visible"},
        {"shot": "medium/mobile/R12", "note": "toast below the field covers nothing; results stack takes about 35% of the screen"},
        {"shot": "medium/mobile/R22", "note": "six of ten cards with no scroll cue; perf table labels medium/mobile as the 4x throttled proxy at 488 fps min"}
      ]
    },
    "authenticity": {
      "score": 6.5,
      "confidence": 0.65,
      "evidence": [
        {"shot": "high/desktop/R01", "note": "track apron, sideline team boxes, light towers, HSHS/LHHS board"},
        {"shot": "high/desktop/R20", "note": "Jessieville purple, pines, small bleacher"},
        {"shot": "crops/high/R01-crowd", "note": "one mixed home block; no band or student section"},
        {"shot": "strips/high/R13", "note": "blank wall under the stand"}
      ]
    }
  },
  "gaps": [
    {"id": "G-close-up-figure-defects", "category": "art", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["crops/high/R04-slot_C", "crops/high/R06-slot_C", "crops/high/R06-slot_C-side"], "benchmark": "axis-3", "fix": "Fix crouch pant deformation and give officials faces. The hands already have fingers, so only a distinct glove material is needed."},
    {"id": "G-empty-surround", "category": "lighting", "expectedGain": 0.25, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["high/desktop/R17", "high/desktop/R10", "strips/high/R13"], "benchmark": "cfb26-3", "fix": "Build venue geometry (fence, track edge, visitor stands, signage). The cause is missing geometry, so the lighting gain is secondary."},
    {"id": "G-contact-feel", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS4", "evidence": ["strips/high/R10", "crops/high/R12-carrier"], "benchmark": "cfb26-4", "fix": "Add a punch-in or slow motion and turf particles at tackle contact, and layered body separation in piles. The catch already gets a camera push."},
    {"id": "G-presnap-backdrop-share", "category": "readability", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R04", "high/desktop/R05"], "benchmark": "axis-1", "fix": "Tighten the desktop pre-snap framing so players are 60-70 px and backdrop is under 25% of the 3D view."},
    {"id": "G-blitz-panel-knot", "category": "ui", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R05"], "benchmark": "madden26-2", "fix": "Space out the overlapping X glyphs in the side-panel defense diagram. Most rush arrows already drop into gaps."},
    {"id": "G-mobile-figure-size", "category": "mobile", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["medium/mobile/R04", "medium/mobile/R10"], "benchmark": "retrobowl-1", "fix": "Scale portrait players up or zoom the portrait cameras in. Receiver 3 is on screen; 1 and 2 already carry edge markers."},
    {"id": "G-toast-occlusion", "category": "ui", "expectedGain": 0.1, "severity": 1, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R12", "high/desktop/R14"], "benchmark": "madden26-3", "fix": "Nudge desktop toasts or the camera aim. Toasts sit below the subject, and on phone they cover nothing."},
    {"id": "G-sidebar-width-jump", "category": "ui", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R10", "high/desktop/R04"], "fix": "Use one sidebar width across play phases (920 vs 1030 px 3D view)."},
    {"id": "G-glare-and-blowout", "category": "lighting", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS1", "evidence": ["high/desktop/R05", "crops/high/R06-slot_C-side"], "fix": "Clamp the sideline flare and the facemask specular blowout."},
    {"id": "G-gameday-staging", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS2", "evidence": ["crops/high/R01-crowd", "high/desktop/R04"], "benchmark": "cfb26-1", "fix": "Add a band block, cheer line and student section, and populate the visitor stand."},
    {"id": "G-tackle-intersections", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "L", "workstream": "WS4b", "evidence": ["crops/high/R12-carrier", "strips/high/R13"], "benchmark": "cfb26-4.jpg", "fix": "Separate body volumes in the pile. Wrap contacts (R13-carrier) and distinct fall directions (R12-carrier) already exist."},
    {"id": "G-player-anatomy", "category": "art", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS3", "evidence": ["crops/high/R04-slot_QB", "crops/high/R06-slot_C-side"], "benchmark": "axis-3.jpg", "fix": "Rework shoulder, waist, hip and elbow proportions and deformation. This overlaps G-close-up-figure-defects."},
    {"id": "G-phone-formation", "category": "mobile", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["medium/mobile/R04", "medium/landscape/R04"], "benchmark": "retrobowl-1.jpg", "fix": "Cut the empty downfield half of the portrait pre-snap. Edge markers and landscape already cover formation identification."},
    {"id": "G-movement-beats", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS4", "evidence": ["strips/high/R09", "strips/high/R11", "crops/high/R11-carrier"], "benchmark": "madden26-4.jpg", "fix": "Add lateral bank into cuts and a secure beat after the catch. The two-arm reach and forward lean are already present."},
    {"id": "G-lighting-spill", "category": "lighting", "expectedGain": 0.25, "severity": 2, "effort": "M", "workstream": "WS1", "evidence": ["high/desktop/R05"], "benchmark": "cfb26-3.jpg", "fix": "Bound the sideline flare. No discrete pools are visible in R18. This overlaps G-glare-and-blowout."},
    {"id": "G-school-staging", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["high/desktop/R01", "high/desktop/R20"], "benchmark": "cfb26-2.jpg", "fix": "Differentiate crowd sections and add band and student groupings at high-school scale."}
  ]
}
```
