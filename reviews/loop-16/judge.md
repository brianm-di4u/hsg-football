# Judge ruling: loop 16 (High tier, desktop)

Paths are relative to `games/football/screenshots/review-loop-16/`. My zoomed checks are in `C:\Users\brian\AppData\Local\Temp\claude\C--Video-Game-Projects-games-football\790bf3d4-42e4-4dfb-9562-ebad5fae8fb3\scratchpad\judge16\`. The brief has no calibration step and no calibration image, so I scored straight from the rubric anchors.

## Factual disputes (each one checked in the captures)

1. **Hands in `crops/high/R06-slot_C-side`.** The advocate is right. Both #55 hands have separate fingers. Claude's "fingerless mitts" is wrong. Claude is right that the hand is the same cream as the arm, so there is no glove material.
2. **Catch camera in `strips/high/R09`.** The advocate is right on the fact. Between frames 3 and 4 the camera drops lower and moves closer, and the figures roughly double in size (`judge16/r09_f3.png`, `r09_f4.png`). It works as a cut to the carrier camera, not as a timed punch-in: there is no hold and no slow motion. Codex's "weak gather-and-secure" also stands. The ball arrives in frames 1–3 and the "+7 YD" result is up by frame 6. The arms-up pose in frames 6–8 comes after the result, so it is not a reach for the ball (`judge16/r09_catchzone.png`).
3. **Side-panel blitz diagram in `high/desktop/R05`.** Both critics are partly right. In `judge16/r05_panel.png`, most rush arrows drop straight down into the line. Two still run to the QB dot: one diagonal and one long centre arrow. Six or seven X glyphs overlap within about 80 px. So Claude's "every rusher converging on the QB in a knot" overstates it, and the advocate's "only glyph crowding" understates it. Either way the panel doesn't show the outward fan now drawn on the field in the same frame, so it is inconsistent (stale) art. The gap stands.
4. **Receiver 3 in `medium/mobile/R04`.** The advocate is right. The △3 receiver's body and tag are on screen at x≈710 of 780. Only his route runs off the right edge. Receivers 1 and 2 sit at the edges with their numbered markers. Marker 1 overlaps the painted "1ST & 10".
5. **R05 flare extent.** The advocate is right. In `judge16/r05_glare.png` the white bloom covers the left sideline, the stands corner and the outer few yards of the field. The receiver and defender at x≈80 and x≈230 stay readable. It is a real defect, but a bounded one. Codex's "covers the left field / washes out playable field" overstates it.
6. **Light pools in `high/desktop/R18`.** The advocate is right. The field brightens smoothly toward midfield and darkens near the camera, and I see no discrete pools. The rain streaks are graphic and long. The wet sheen is hard to see at this distance (it shows in `crops/high/R18-turf_26_67_40`).
7. **R12 pile (`crops/high/R12-carrier`).** Both are right on different points. The bodies interpenetrate: the white #47 torso merges into navy #20 and the orange legs vanish into torsos. The fall directions are distinct: one player is on his back with cleats up at left, and #20 is face-down at right.
8. **R13 wrap (`crops/high/R13-carrier`).** The advocate is right. The black-helmet defender's dark arm passes around the navy runner's waist. In `strips/high/R13` frames 5–8 the contact still reads as a compact cluster at replay distance.
9. **Mobile performance (operator correction).** The table in the brief is the unthrottled run. The 4× CPU-throttled medium · mobile rows in `reviews/loop-16/perf.json` are 47 fps (pass), 51.6 (run), 72.1 (punt), 56.3 (replay) and 53.4 (rain), each with a p95 of 33.7–34.3 ms. They were measured under about 80% background CPU load.
   - Claude's "488 fps at 4× throttle" and the advocate's error 5 are both wrong.
   - Codex was right to doubt the label.
   - Ruling: average frame rate holds 30 fps on the phone proxy with margin. The slowest 5% of frames sit at about 29 fps, right on the line, even allowing that the load inflates them. The perf clause of the mobile anchor is met only marginally. It is not "ample headroom" and it adds no credit. The High tier at 4× is 26–41 fps, so High must never be auto-selected on phones.

## Category rulings

**Art: 6.0** (Claude 6.0, Codex 5.5)
- The 7-anchor material contrast is there: glossy helmets with hotspots and decals, real facemask bars, outlined numbers and stripes (`crops/high/R04-slot_C`). The turf has grain (`crops/high/R04-turf_26_67_42`) and the crowd reads as people (`crops/high/R01-crowd`).
- The close-ups don't hold up:
  - the crouch pants on #69 balloon into lumpy blobs (`crops/high/R04-slot_C`)
  - the elbow on the upper-left white arm is faceted, and the hands are the same cream as the arm (`crops/high/R06-slot_C-side`)
  - officials have featureless dark heads (`crops/high/R12-carrier`)
  - there are no cloth folds
  - Codex's note on oversized seats and pads is fair (`crops/high/R04-slot_QB`)
- The venue around the field is an empty curved wall (`high/desktop/R17`, `strips/high/R13`).
- Well above the 5 anchor and well below axis-3. The hand correction doesn't lift it past 6.

**Lighting & atmosphere: 6.5** (both 6.5)
- What works:
  - several fanned soft shadows per player (`high/desktop/R17`)
  - lamp bloom and falloff from the field to the stands (`high/desktop/R01`)
  - wet sheen in rain (`crops/high/R18-turf_26_67_40`)
- What holds it under 7:
  - a bounded but bug-like sideline flare (`high/desktop/R05`)
  - facemask blowout (`crops/high/R06-slot_C-side`)
  - a flat, unlit olive surround (`high/desktop/R17`, `high/desktop/R14`)
- Short of axis-3 and cfb26-3.

**Animation & game feel: 5.5** (Claude 6.0, Codex 4.5: a 1.5 split, checked in `strips/high/R09`, `strips/high/R10`, `crops/high/R12-carrier` and `crops/high/R13-carrier`)
- Codex's 4.5 is below the 5 anchor, which the captures beat:
  - the cycles read (`strips/high/R11`)
  - the wind-up is clear (`crops/high/R07-slot_QB`)
  - a real wrap (`crops/high/R13-carrier`)
  - distinct fall directions (`crops/high/R12-carrier`)
  - a camera move at possession (`strips/high/R09` frames 3→4)
- Claude's 6.0 is too generous:
  - the catch has no secure beat, and the arms-up pose comes after the result (`strips/high/R09` frames 6–8)
  - the tackle keeps the same wide camera with no punch-in, slow motion or particles (`strips/high/R10` frames 5–8)
  - the pile interpenetrates (`crops/high/R12-carrier`)
- That is between the 5 and 7 anchors, nearer 5 on contact. 5.5.

**UI / HUD: 6.5** (Claude 6.5, Codex 7.0)
- Strengths:
  - shaped, numbered receiver tags and route art (`high/desktop/R04`)
  - a clean result hierarchy (`high/desktop/R21`)
  - a de-duplicated kick panel (`high/desktop/R16`)
  - "NEXT: THE TRY" (`high/desktop/R14`)
- The 7 anchor's "nothing stale or overlapping" is breached three times:
  - the side-panel blitz diagram contradicts the field art (`high/desktop/R05`, ruling 3)
  - the 3D view jumps between 920 px (`high/desktop/R04`, `R12`) and 1030 px (`high/desktop/R14`, `R18`)
  - the desktop toasts cover near players and an official (`high/desktop/R12`, `high/desktop/R14`)
- The scorebug is a flat bar, short of madden26-3.

**Typography: 7.0** (both 7.0)
- A consistent condensed display face over a sans body, with a clear scale (`high/desktop/R22`, `high/desktop/R21`). It scales cleanly to the phone (`medium/mobile/R22`).
- Minor issues: the roughly 9 px "HOME" tag and small description text on desktop. Nothing is clipped. Gate met.

**Readability: 6.5** (Claude 6.5, Codex 6.0)
- In live play the markers do the job:
  - an oversized ball with a trail and a ringed, numbered target (`high/desktop/R08`)
  - a carrier plate and disc near mid-frame (`high/desktop/R18`)
  - a blue LOS and a yellow line to gain
- What holds it under 7:
  - the desktop pre-snap is still about 40% backdrop (the field starts at y≈365 of a 3D view from y 72), with a QB about 45 px tall (`high/desktop/R04`)
  - a near-camera official dominates the bottom of `high/desktop/R18`
  - phone figures are small (`medium/mobile/R04`)

**Mobile: 6.0** (Claude 6.5, Codex 6.0)
- Strengths:
  - thumb-sized controls (HIKE and CHANGE PLAY in `medium/mobile/R04`, a full-width JUKE in `medium/mobile/R10`)
  - the full formation with all five tags in landscape (`medium/landscape/R04`)
- Weaknesses:
  - The portrait pre-snap leaves the top 40% (y 160–680) as empty downfield turf, while linemen are about 20–22 CSS px (`medium/mobile/R04`).
  - The result stack takes about 35% of the screen (`medium/mobile/R12`).
  - The play list shows 6 of 10 with no scroll cue (`medium/mobile/R22`).
- Claude's 6.5 rested partly on the mislabelled 488 fps. The real throttled figure only just meets the 30 fps clause (ruling 9), so that support goes.

**Authenticity: 6.5** (Claude 6.5, Codex 6.0)
- Strong local identity:
  - Hot Springs, Lake Hamilton and Lakeside, plus Jessieville's purple, piney 3A field (`high/desktop/R20`)
  - the HSHS/LHHS segment board (`crops/high/R01-board`)
  - Spa City play names (`high/desktop/R22`)
  - a track apron, team boxes and light towers (`high/desktop/R01`)
- Missing for a 7:
  - no band, cheer line or student section (`crops/high/R01-crowd`)
  - no visitor stands, and blank walls under and around the stands (`strips/high/R13`, `high/desktop/R14`)
- Gate (6) met.

**Total 50.5/80.** Gates missed: art, lighting, animation, UI, readability and mobile. Verdict: **continue**.

## Ranked gaps (expected gain ÷ effort, ties by severity)

1. **G-presnap-backdrop-share** (readability, WS7, S, +0.5). Tighten the desktop pre-snap so the 3D view is at most 25% backdrop and the QB is at least 60 px tall at 1280×800. Check in `high/desktop/R04` and `R05`.
2. **G-contact-feel**, merged with G-tackle-intersections and G-movement-beats (animation, WS4b, L, +1.0):
   - a 0.3–0.5 s punch-in or 0.5× slow motion at tackle contact, with turf and pellet particles
   - collision capsules between grounded bodies, so no torso or leg passes through another in a pile (`crops/high/R12-carrier`)
   - a catch secure beat: the ball goes to the chest with the arms closing for at least 6 ticks before the result toast (`strips/high/R09`)
   - lateral pelvis and torso bank into sweep cuts (`strips/high/R11`)
3. **G-mobile-figure-size**, merged with G-phone-formation (mobile, WS7, M, +0.5):
   - aim the portrait pre-snap so the LOS sits at about 65% of the 3D height and crop the empty downfield half
   - scale portrait figures about 1.2×, so linemen are at least 28 CSS px
   - add a scroll cue to the play list
   - compact the results stack to at most 25% of the screen
   - Check in `medium/mobile/R04`, `R12` and `R22`.
4. **G-close-up-figure-defects**, merged with G-player-anatomy (art, WS3, M, +0.5):
   - a corrective shape or hip weights so crouched pants keep their silhouette (#69 in `crops/high/R04-slot_C`)
   - basic facial features on officials
   - a glove material distinct from the arm
   - rounder elbow topology
   - trim the seat and pad proportions
5. **G-empty-surround** (art, WS2, M, +0.5; it also helps lighting and authenticity). Replace the flat curved olive wall with built venue: a chain-link fence and track edge, visitor bleachers, end-zone signage, a lit facade under the stands, and a light gradient from the field to the walls. Check in `high/desktop/R17`, `high/desktop/R14` and `strips/high/R13`. I keep this separate from staging because it is venue geometry and lighting, not crowd content.
6. **G-gameday-staging**, merged with G-school-staging (authenticity, WS2, M, +0.5). Add a uniformed band block, a cheer line on the track and a student section in a distinct colour to the home stand, and fill the visitor stand. Check in `crops/high/R01-crowd` and `high/desktop/R01`.
7. **G-blitz-panel-knot** (ui, WS7, S, +0.25). Draw the side-panel defense from the same per-rusher gap targets as the field, so the arrows fan outward and none ends on the QB, and keep at least 14 px between X glyphs. Check in `high/desktop/R05`.
8. **G-sidebar-width-jump** (ui, WS7, S, +0.25). Use one sidebar width for every play phase, so the 3D view stays the same width in R04 and R10.
9. **G-glare-and-blowout**, merged with G-lighting-spill (lighting, WS1, S, +0.25). Clamp or occlude the left-sideline haze sprite in `high/desktop/R05` so field pixels inside the boundary stay under about 85% luminance, and cap the facemask specular in `crops/high/R06-slot_C-side`. R18 needs no pool fix.
10. **G-near-camera-official** (readability, WS7, S, +0.25). Fade or cull officials within about 8 m of the camera during live plays and replays (`high/desktop/R18`, `high/desktop/R10`).
11. **G-toast-occlusion** (ui, WS7, S, +0.15). Raise the desktop result toast into the top band, or re-aim the camera, so it covers no player or official (`high/desktop/R12`, `high/desktop/R14`).
12. **G-phone-perf-headroom** (mobile, WS7, M, +0.25). Bring the 4× throttled medium · mobile p95 under 25 ms on an idle machine:
   - crowd and tree LOD
   - trim medium triangles from about 440k toward 300k
   - re-measure with no background load and publish the throttled rows in the brief
   - keep the High tier off phones (26 fps at 4×)

```json
{
  "loop": 16,
  "role": "judge",
  "tier": "high",
  "verdict": "continue",
  "scores": {
    "art": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "crops/high/R04-slot_C", "note": "glossy helmets, facemask bars, outlined numbers; #69 crouch pants balloon into blobs"},
        {"shot": "crops/high/R06-slot_C-side", "note": "fingers present (Claude wrong), but hand same cream as arm, faceted elbow, no cloth folds"},
        {"shot": "crops/high/R12-carrier", "note": "official head featureless"},
        {"shot": "crops/high/R01-crowd", "note": "crowd reads as people"},
        {"shot": "high/desktop/R17", "note": "venue surround is an empty curved wall"}
      ]
    },
    "lighting": {
      "score": 6.5,
      "confidence": 0.75,
      "evidence": [
        {"shot": "high/desktop/R17", "note": "several fanned soft shadows per player; flat olive surround"},
        {"shot": "high/desktop/R01", "note": "lamp bloom, falloff to stands"},
        {"shot": "high/desktop/R05", "note": "bounded but bug-like left-sideline flare; players at x~80/230 readable"},
        {"shot": "high/desktop/R18", "note": "smooth falloff, no discrete pools; graphic rain streaks"},
        {"shot": "crops/high/R18-turf_26_67_40", "note": "wet sheen"}
      ]
    },
    "animation": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "strips/high/R09", "note": "camera tightens frames 3->4 at possession; no secure beat, arms-up only after result toast"},
        {"shot": "strips/high/R10", "note": "tackle with same wide camera, no punch-in, slow motion or particles"},
        {"shot": "crops/high/R12-carrier", "note": "distinct fall directions but bodies interpenetrate"},
        {"shot": "crops/high/R13-carrier", "note": "real arm wrap at the runner's waist"},
        {"shot": "crops/high/R07-slot_QB", "note": "legible cocked wind-up"}
      ]
    },
    "ui": {
      "score": 6.5,
      "confidence": 0.75,
      "evidence": [
        {"shot": "high/desktop/R04", "note": "shaped numbered receiver tags and route art; 920 px 3D view"},
        {"shot": "high/desktop/R05", "note": "side-panel diagram contradicts field fan: two arrows end on QB, X glyphs overlap"},
        {"shot": "high/desktop/R12", "note": "toast covers near player and official"},
        {"shot": "high/desktop/R14", "note": "NEXT: THE TRY; 1030 px 3D view (width jump)"},
        {"shot": "high/desktop/R16", "note": "de-duplicated kick panel"}
      ]
    },
    "typography": {
      "score": 7.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R22", "note": "condensed display over sans body, clear scale"},
        {"shot": "high/desktop/R21", "note": "toast hierarchy, numerals read at a glance"},
        {"shot": "medium/mobile/R22", "note": "same pair scales up on phone"}
      ]
    },
    "readability": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "high/desktop/R08", "note": "ball trail and ringed numbered target"},
        {"shot": "high/desktop/R18", "note": "carrier plate near mid-frame; near-camera official dominates bottom"},
        {"shot": "high/desktop/R04", "note": "about 40% backdrop, QB about 45 px"},
        {"shot": "medium/mobile/R04", "note": "small figures; receiver 3 on screen, 1 and 2 as edge markers"}
      ]
    },
    "mobile": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "medium/mobile/R04", "note": "big HIKE/CHANGE PLAY; top 40% empty downfield; linemen about 20-22 CSS px"},
        {"shot": "medium/landscape/R04", "note": "full formation with all five tags"},
        {"shot": "medium/mobile/R12", "note": "results stack about 35% of screen"},
        {"shot": "medium/mobile/R22", "note": "6 of 10 plays, no scroll cue; perf.json throttle 4 medium/mobile 47-72 fps, p95 about 34 ms: marginal"}
      ]
    },
    "authenticity": {
      "score": 6.5,
      "confidence": 0.65,
      "evidence": [
        {"shot": "high/desktop/R20", "note": "Jessieville purple, pines, small 3A field"},
        {"shot": "crops/high/R01-board", "note": "HSHS/LHHS segment board"},
        {"shot": "high/desktop/R01", "note": "track apron, team boxes, light towers; no visitor stand"},
        {"shot": "crops/high/R01-crowd", "note": "one mixed home block, no band or student section"},
        {"shot": "strips/high/R13", "note": "blank wall under the stand"}
      ]
    }
  },
  "gaps": [
    {"id": "G-presnap-backdrop-share", "category": "readability", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R04", "high/desktop/R05"], "benchmark": "axis-1", "fix": "Tighten the desktop pre-snap camera so backdrop is at most 25% of the 3D view and the QB is at least 60 px tall at 1280x800."},
    {"id": "G-contact-feel", "category": "animation", "expectedGain": 1.0, "severity": 5, "effort": "L", "workstream": "WS4b", "evidence": ["strips/high/R10", "crops/high/R12-carrier", "strips/high/R09", "strips/high/R11"], "benchmark": "cfb26-4", "fix": "Add a 0.3-0.5 s punch-in or 0.5x slow motion plus turf particles at tackle contact; collision capsules so grounded bodies never interpenetrate in piles; a catch secure beat (ball to chest, arms closing, at least 6 ticks before the result toast); lateral pelvis and torso bank into sweep cuts."},
    {"id": "G-mobile-figure-size", "category": "mobile", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS7", "evidence": ["medium/mobile/R04", "medium/mobile/R12", "medium/mobile/R22"], "benchmark": "retrobowl-1", "fix": "Aim the portrait pre-snap so the LOS sits at about 65% of 3D height and the empty downfield half is cropped; scale portrait figures about 1.2x (linemen at least 28 CSS px); add a scroll cue to the play list; compact the results stack to at most 25% of the screen."},
    {"id": "G-close-up-figure-defects", "category": "art", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS3", "evidence": ["crops/high/R04-slot_C", "crops/high/R06-slot_C-side", "crops/high/R12-carrier", "crops/high/R04-slot_QB"], "benchmark": "axis-3", "fix": "Corrective shape or hip weights so crouched pants keep their silhouette; basic facial features on officials; a glove material distinct from the arm; rounder elbow topology; trim seat and pad proportions."},
    {"id": "G-empty-surround", "category": "art", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["high/desktop/R17", "high/desktop/R14", "strips/high/R13"], "benchmark": "axis-3", "fix": "Replace the flat curved olive wall with built venue: chain-link fence and track edge, visitor bleachers, end-zone signage, a lit facade under the stands, and a light gradient from field to walls."},
    {"id": "G-gameday-staging", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["crops/high/R01-crowd", "high/desktop/R01", "high/desktop/R20"], "benchmark": "cfb26-2", "fix": "Add a uniformed band block, a cheer line on the track and a student section in a distinct colour to the home stand, and populate the visitor stand."},
    {"id": "G-blitz-panel-knot", "category": "ui", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R05"], "benchmark": "madden26-2", "fix": "Draw the side-panel defense from the same per-rusher gap targets as the field so arrows fan outward and none ends on the QB; keep at least 14 px between X glyphs."},
    {"id": "G-sidebar-width-jump", "category": "ui", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R04", "high/desktop/R14"], "fix": "Use one sidebar width across all play phases so the 3D view stays the same width (now 920 vs 1030 px)."},
    {"id": "G-glare-and-blowout", "category": "lighting", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS1", "evidence": ["high/desktop/R05", "crops/high/R06-slot_C-side"], "benchmark": "cfb26-3", "fix": "Clamp or occlude the left-sideline haze sprite so field pixels inside the boundary stay under about 85% luminance, and cap the facemask specular. No R18 pool fix is needed."},
    {"id": "G-near-camera-official", "category": "readability", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R18", "high/desktop/R10"], "benchmark": "madden26-1", "fix": "Fade or cull officials within about 8 m of the camera during live plays and replays."},
    {"id": "G-toast-occlusion", "category": "ui", "expectedGain": 0.15, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R12", "high/desktop/R14"], "benchmark": "madden26-3", "fix": "Raise the desktop result toast into the top band or re-aim the camera so the toast covers no player or official."},
    {"id": "G-phone-perf-headroom", "category": "mobile", "expectedGain": 0.25, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["medium/mobile/R10", "medium/mobile/R04"], "benchmark": "retrobowl-1", "fix": "Bring 4x-throttled medium/mobile p95 under 25 ms on an idle machine (crowd and tree LOD, trim medium triangles from about 440k toward 300k), publish the throttled rows in the brief, and never auto-select High on phones (26 fps at 4x)."}
  ]
}
```
