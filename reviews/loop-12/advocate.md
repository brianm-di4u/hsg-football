# Advocate rebuttal: loop 12, High tier

## Summary
Both critics agree on art (6), lighting (6.5) and typography (7), and on most of the phone framing defects. I checked those claims against the captures and they hold, so I concede them. The disagreements that matter are in four places.

- **Animation.** Codex's 4.5 rests on strips where the figures are 10–20 px tall. It ignores close-ups that show a forward running lean (`crops/high/R11-carrier`) and a resolved fall with the tackler on top (`crops/high/R12-carrier`).
- **UI.** Codex says the desktop result plate covers the contact. That is wrong for `high/desktop/R12`, where the pile and the downed carrier sit above the plate.
- **Readability.** Codex's 5.5 treats a few phone frames as the whole category. The desktop frames meet the 7 anchor.
- **Mobile performance.** The 132 ms p95 comes from a single scene (rain) on a machine under load. The cheap Low tier shows the same kind of tail.

Claude got three facts plainly wrong:
- It says the officials are "faceless black silhouettes" in every close-up. Four close-ups show skin-toned heads, and the frame it leans on (`crops/high/R03-slot_QB`) is a rear view.
- It calls the visitor stand a "dark bleacher box". In `high/desktop/R13` and `high/desktop/R15` it is a lit, filled stand.
- It cites `crops/high/R04-slot_QB` as an under-center fault. That frame is a shotgun alignment.

## Category by category

### Art: critics 6.0 / 6.0 (mean 6.0). Proposed 6.0

**Concede**
- Claude is right that the officials have floating sleeve panels and mitten hands. In `crops/high/R03-slot_QB` the striped sleeves hang visibly apart from the torso and the hands are black balls.
- Claw and mitten hands, tube arms and no jersey folds are real in `crops/high/R06-slot_C-side`: the white-sleeved arm has a three-lobed mitten hand and faceted elbow geometry.
- Codex's "angular sleeve deformation" is real in `crops/high/R14-carrier`, on the sleeve of #74.
- The end-zone slab is real (`high/desktop/R14`), and so are the cone trees (`high/desktop/R15`).

**Rebut (fact error)**
- Claude says the far officials in `crops/high/R04-slot_C`, `crops/high/R12-carrier` and `crops/high/R13-carrier` are "the same black silhouettes", with "no face".
  - In `crops/high/R04-slot_C` the official behind #69 has a brown, skin-toned head and neck above the striped shirt.
  - In `crops/high/R12-carrier` the official at centre-right has a brown head and forearms.
  - `crops/high/R06-slot_C`, `crops/high/R09-slot_Z` and `crops/high/R11-carrier` show the same skin-toned heads.
- `crops/high/R03-slot_QB` is shot from **behind** the huddle (we see the backs of #64 and #65, with numbers on their backs), so the referee in front of the camera is also seen from behind. A missing face cannot be judged from that frame.
- The defect is **attached sleeves and hands**, not "faceless mannequins".

**Credit the critics gave correctly**
- The glossy helmet against the matte jersey is clear (`crops/high/R14-carrier`, `crops/high/R11-carrier`).
- The turf has grain (`crops/high/R04-turf_26_67_42`).
- The crowd reads as people (`crops/high/R01-crowd`).

6.0 is fair. Folds and hands are what stand between this and axis-3.

### Lighting & atmosphere: critics 6.5 / 6.5 (mean 6.5). Proposed 6.5

**Concede**
- `high/desktop/R18` reads as dry turf at gameplay distance. The wet response appears only as a single hard hotspot in `crops/high/R18-turf_26_67_40`.
- The surrounds behind the end zones fall to flat dark planes (`high/desktop/R14`, `high/desktop/R16`).

**Evidence Codex did not cite**
Codex cited only two captures.
- `high/desktop/R17` is the clearest proof of the 7 anchor's "several soft shadows under players from the stadium lights": every player on the punt casts three or four fanned shadows.
- In the same frame the light pools toward each tower read, with darker gaps between them.
- `high/desktop/R01` has lamp bloom and believable night exposure.
- `high/desktop/R15` and `high/desktop/R13` show a broadcast-style depth-of-field falloff in the replay camera.
- `high/desktop/R19` has real depth haze.

These items keep 6.5 safe. The wet sheen and the dark surrounds keep it below 7.

### Animation & game feel: critics 6.0 / 4.5 (mean 5.25). Proposed 5.5

**Concede**
- `strips/high/R09` cuts from the reception (frames 1–5) straight to the result camera (frames 6–8). No tuck or securing beat is visible.
- `strips/high/R10` loses the carrier in the pile, then cuts to NO GAIN.
- No slow-motion or punch-in at live contact appears in any strip.
- `crops/high/R06-slot_C` shows QB #10 upright behind the center on the dive, not crouched under center.

**Rebut Codex (overstated)**
- *"Sweep advances with little convincing torso lean or planted cutting motion."* In `strips/high/R11` the players are about 10–15 px tall, so neither lean nor its absence can be read from it. The close-up of the same play, `crops/high/R11-carrier`, shows #44 in a clear forward-leaning stride, with the trail leg extended and the lead knee driven, against the upright linemen behind him.
- *"Contact bunches bodies without a convincing wrap and descent," and "prone bodies and limbs intersect."*
  - `high/desktop/R13` shows the defender wrapping 20 KEMP at the tagged spot.
  - `crops/high/R12-carrier` shows the result: carrier #20 face-down, tackler #47 lying across him, and both bodies resting on the turf at the spot ring. That is a resolved descent.
  - There is minor overlap where #47's torso meets #20's legs. It reads as a pile, not as a clipping failure.
- The 5 anchor reads "procedural cycles that read, but with popping, floaty contact and stiff falls." Falls exist and are varied:
  - prone carrier and tackler on top (`crops/high/R12-carrier`);
  - a varied arm-up celebration (`crops/high/R14-carrier`);
  - a legible cocked wind-up (`crops/high/R07-slot_QB`);
  - a ball trail (`crops/high/R08-ball`).

  All of this sits above the 5 anchor, not below it.

**Rebut Claude (one fact)**
- The under-center complaint also cites `crops/high/R04-slot_QB`. There, QB #12 stands several yards off the ball in a crouched shotgun stance on a pass play (curls). That is correct staging, not a fault. Only R06 supports the gap.

Proposed 5.5: above the 5 anchor on the close-up evidence, held well short of 7 by the missing feel touches and the hard cuts in `strips/high/R09` and `strips/high/R10`.

### UI / HUD: critics 7.0 / 6.5 (mean 6.75). Proposed 7.0

**Rebut Codex (fact error)**
- *"`high/desktop/R12` still places the result plate over the central contact area."* In `high/desktop/R12` the pile (#73, #92, #63) and the downed blue carrier are all visible above the plate's top edge, at about y≈640 of 800. Only the feet of the nearest two players touch the plate. This frame is exactly the case this loop's desktop result camera fixed.
- The real occlusion is in **landscape**: in `medium/landscape/R12` only the helmets show above the plate. That is a mobile framing defect, already covered by Claude's G-landscape-toast-hides-pile.
- *"The sidebar repeats information."* In `high/desktop/R21` the sidebar holds NEXT, TIMEOUT, CONTINUE and a three-line play log. None of that repeats the scorebug or the toast. In `high/desktop/R22` it is the play-call list.
  - The one real duplication is the field-goal copy: "FIELD GOAL · 45 YD / Stop the needle in the green" appears in both the meter and the panel (`high/desktop/R16`). I concede that, at severity 1.

**Concede (Claude, minor)**
- The meter panel's bottom-right corner touches the top-left of the *in-world* scoreboard in `high/desktop/R16`, so it does not collide with any HUD element.
- The route-3 and route-2 arrows overlap near the right hash in `high/desktop/R04`.

**Support for 7**
- `high/desktop/R04` has shape badges sitting directly on each receiver, route art, the 1ST & 10 graphic and a panel diagram.
- `high/desktop/R21` has a toast with hierarchy.
- `high/desktop/R08` has the target badge plus a ring.

### Typography: critics 7.0 / 7.0 (mean 7.0). Proposed 7.0
Both critics agree, and I found no counter-evidence:
- the condensed display face plus sans body in `high/desktop/R22`;
- the toast hierarchy in `high/desktop/R21`;
- scoreboard numerals that read at a glance in `medium/mobile/R12`.

I concede the small HOME tag (`high/desktop/R01`) as the weakest size.

### Readability: critics 6.5 / 5.5 (mean 6.0). Proposed 6.5

**Concede**
- `medium/mobile/R04`: badges 1, 2 and 3 are clamped to the edges with chevrons, and their receivers are cut off.
- `medium/landscape/R10`: the carrier's ring is cut by the bottom edge.
- `medium/landscape/R12`: the plate covers the pile.

**Rebut Codex's 5.5 (overstated)**
The 5 anchor reads "the ball, carrier and receivers take effort to find." That does not describe the desktop frames:
- `high/desktop/R08`: the ball in flight has a trail, and the target has the "2" badge and a blue ring.
- `high/desktop/R18` and `high/desktop/R10`: the carrier has a ring and a "44 DELACROIX" tag, with blue scrimmage and yellow line to gain.
- `high/desktop/R13`: the replay carrier is tagged "20 KEMP".

The portrait phone also works outside pre-snap:
- `medium/mobile/R10` has the carrier centred, with a large "44 DELACROIX" tag and both lines visible.
- `medium/mobile/R12` shows the whole pile above the result band.

Even in `medium/mobile/R04`, the clamped badges keep direction chevrons, so the player can tell where receivers 2 and 3 are.

Three phone frames fail. Every desktop frame and most portrait frames pass. That is 6.5, not 5.5.

### Mobile: critics 6.5 / 5.5 (mean 6.0). Proposed 6.0

**Concede**
- The receivers are lost in portrait pre-snap (`medium/mobile/R04`).
- The landscape plate covers the pile (`medium/landscape/R12`).
- The carrier sits on the landscape bottom edge, with a lot of sky above (`medium/landscape/R10`, `high/landscape/R10`).
- Figures are small: linemen are about 25 CSS px tall in `medium/mobile/R04`.

**Rebut (wrong cause)**
- The performance case is overstated. Codex treats "37 fps min, 132.2 ms p95" as proof of "severe" hitching (severity 5).
- The per-scene rows in `reviews/loop-12/perf.json` show that the 132.2 ms p95 is **only the rain scene**. The other Medium 4× scenes sit at 54–69 ms p95, with 47–56 fps averages in run, punt and replay.
- The **Low** tier, at 220k triangles and 61 calls, shows the same kind of tail under 4× throttle: 65.3 ms p95 on run, with a p50 of only 4.8 ms. A wide gap between p50 and p95 even at the cheapest tier points to scheduling jitter, not render cost. The capture rig itself notes that the machine was under heavy unrelated load.
- The minimum frame rate clears the rubric's 30 fps test.

**Rebut Claude, "top 40 % is empty field"**
- In `medium/mobile/R10` that space is the runner's open lane ahead, which is useful during a live run.
- The real waste is in landscape (`medium/landscape/R10`), where sky and stands take about 40 % of the frame.

**Strengths both critics noted**
- The play-call grid (`high/mobile/R22`, `medium/mobile/R22`).
- Large HIKE, CONTINUE and JUKE targets (`medium/mobile/R04`, `medium/mobile/R12`).
- Good portrait post-play framing (`medium/mobile/R12`).

Proposed 6.0: the framing defects are real, so I hold the mean.

### Authenticity: critics 6.5 / 6.0 (mean 6.25). Proposed 6.5

**Concede**
- There is no band and no distinct student section (`crops/high/R01-crowd`).
- The end-zone surrounds are bare (`high/desktop/R14`), and the berm is bare (`high/desktop/R17`).
- The crowd repeats raised-arm poses.
- Codex is right that the sideline team figures stand evenly spaced in a row (`high/desktop/R13`, `high/desktop/R15`).

**Rebut Claude (fact error)**
- *"The visitor side is a short dark bleacher box (`high/desktop/R13`, `high/desktop/R15`)."* In both frames the visitor stand is filled with blue, white and orange spectators and lit from the front. A smaller visitor stand is correct for a 5A high-school venue, not a defect.

**Credit for local staging**
- The HS scoreboard reads DOWN / TO GO / BALL ON (`crops/high/R01-board`).
- The 3A Jessieville purple variant has its own end-zone wordmark and midfield logo (`high/desktop/R20`).
- There is a field house at Wolf Stadium (`high/desktop/R03`).
- The track, team benches and Ouachita ridgeline are visible (`high/desktop/R01`).
- Local play names include Bathhouse Dive, Central Avenue Sweep and Tufa Screen (`high/desktop/R22`).

6.5 is supported.

## Gaps: severity and gain adjustments

**Claude's gaps**

| Gap | Ruling | Change | Reason |
|---|---|---|---|
| G-portrait-presnap-receivers-offscreen | Concede | none | `medium/mobile/R04` |
| G-landscape-toast-hides-pile | Concede | none | `medium/landscape/R12` |
| G-catch-tackle-feel | Partly rebut | severity 4→3, gain 0.5→0.4 | The replay depth-of-field and REPLAY tag already exist (`high/desktop/R13`, `high/desktop/R15`). The live slow-motion, punch-in and tuck are missing. |
| G-officials-mannequins | Rebut the stated cause | severity 3→2, gain 0.3→0.2 | Heads are skin-toned in `crops/high/R04-slot_C` and `crops/high/R12-carrier`. Only the sleeves and hands are wrong. |
| G-player-hands-cloth | Concede | none | |
| G-venue-surrounds-empty | Mostly concede | gain 0.4→0.3 | The "lit visitor bleacher" part of the fix already exists (`high/desktop/R15`). |
| G-band-student-section | Concede | none | |
| G-wet-turf-full-frame | Concede | none | |
| G-landscape-live-carrier-edge | Concede | none | |
| G-phone-frame-spikes | Rebut the cause | severity 3→2, gain 0.2→0.1 | One scene, on a loaded machine. Re-measure on an idle machine before spending effort. |
| G-qb-under-center | Concede for R06 only | none | R04 is shotgun. |
| G-fg-meter-overlap | Concede | none | |

**Codex's gaps**

| Gap | Ruling | Change | Reason |
|---|---|---|---|
| G-contact | Partly rebut | severity 5→4, gain 1.5→0.6 | A resolved fall exists (`crops/high/R12-carrier`). The wrap is visible in `high/desktop/R13`. |
| G-weight | Rebut | severity 5→3, gain 1.0→0.4 | The strip is too small to judge. `crops/high/R11-carrier` shows the lean. |
| G-phone-framing | Concede | severity 5→4, gain 1.0→0.6 | It overlaps Claude's two framing gaps, and portrait live and result frames work (`medium/mobile/R10`, `medium/mobile/R12`). |
| G-phone-hitches | Rebut the cause | severity 5→2, gain 1.0→0.2 | See Mobile above. |
| G-player-construction | Concede | severity 4→3, gain 1.0→0.5 | It duplicates G-player-hands-cloth. |
| G-result-occlusion | Rebut the desktop half (`high/desktop/R12` is clear) | severity 4→2, gain 0.5→0.2 | The landscape half duplicates G-landscape-toast-hides-pile. |
| G-wet-surface | Concede | gain 0.5→0.3 | It duplicates G-wet-turf-full-frame. |
| G-school-crowd | Concede | gain 0.5→0.4 | It overlaps G-band-student-section. |

```json
{
  "loop": 12,
  "role": "advocate",
  "tier": "high",
  "scores": {
    "art": {"score": 6.0, "confidence": 0.8, "evidence": [
      {"shot": "crops/high/R03-slot_QB", "note": "Official sleeves float off the torso, mitten hands; rear view, so 'faceless' cannot be judged here"},
      {"shot": "crops/high/R04-slot_C", "note": "Official has a skin-toned head, contradicting the 'black silhouette' claim"},
      {"shot": "crops/high/R06-slot_C-side", "note": "Mitten hands, tube arms, no folds: conceded"},
      {"shot": "crops/high/R14-carrier", "note": "Glossy helmets against matte jerseys; faceted sleeve on #74"},
      {"shot": "high/desktop/R15", "note": "Cone treeline conceded"}
    ]},
    "lighting": {"score": 6.5, "confidence": 0.8, "evidence": [
      {"shot": "high/desktop/R17", "note": "Three to four fanned tower shadows per player; tight light pools with dark gaps"},
      {"shot": "high/desktop/R01", "note": "Lamp bloom, believable night exposure"},
      {"shot": "high/desktop/R15", "note": "Replay depth-of-field falloff"},
      {"shot": "high/desktop/R18", "note": "Full rain frame reads dry: conceded"},
      {"shot": "crops/high/R18-turf_26_67_40", "note": "Single hard specular hotspot"}
    ]},
    "animation": {"score": 5.5, "confidence": 0.65, "evidence": [
      {"shot": "crops/high/R11-carrier", "note": "Clear forward-leaning stride on the sweep; strips/high/R11 is too small to show lean"},
      {"shot": "crops/high/R12-carrier", "note": "Resolved fall: carrier prone, tackler lying across him on the spot"},
      {"shot": "high/desktop/R13", "note": "Defender wraps the tagged carrier"},
      {"shot": "strips/high/R09", "note": "Reach, then a hard cut to the result camera with no tuck beat: conceded"},
      {"shot": "strips/high/R10", "note": "Carrier lost in the pile, then a cut: conceded"},
      {"shot": "crops/high/R04-slot_QB", "note": "Shotgun crouch, correct for a pass play; not an under-center fault"}
    ]},
    "ui": {"score": 7.0, "confidence": 0.75, "evidence": [
      {"shot": "high/desktop/R12", "note": "Pile and downed carrier sit above the plate; only feet touch it"},
      {"shot": "high/desktop/R04", "note": "Badges on receivers, route art, 1ST & 10, panel diagram"},
      {"shot": "high/desktop/R21", "note": "Toast hierarchy; sidebar holds actions and log, no repetition"},
      {"shot": "high/desktop/R16", "note": "FG copy duplicated in meter and panel: conceded, severity 1"}
    ]},
    "typography": {"score": 7.0, "confidence": 0.8, "evidence": [
      {"shot": "high/desktop/R22", "note": "Condensed display plus sans body on a consistent scale"},
      {"shot": "high/desktop/R21", "note": "Clear gain/result/runner hierarchy"},
      {"shot": "medium/mobile/R12", "note": "Numerals read at a glance on the phone"}
    ]},
    "readability": {"score": 6.5, "confidence": 0.7, "evidence": [
      {"shot": "high/desktop/R08", "note": "Ball trail, target badge and ring"},
      {"shot": "high/desktop/R18", "note": "Carrier ring and name tag, scrimmage and line to gain"},
      {"shot": "medium/mobile/R10", "note": "Portrait carrier centred with a large name tag"},
      {"shot": "medium/mobile/R04", "note": "Three receivers clamped to the edges: conceded"},
      {"shot": "medium/landscape/R12", "note": "Plate hides the pile: conceded"}
    ]},
    "mobile": {"score": 6.0, "confidence": 0.7, "evidence": [
      {"shot": "medium/mobile/R12", "note": "Whole pile above the result band; large controls"},
      {"shot": "medium/mobile/R22", "note": "Strong play-call grid"},
      {"shot": "medium/mobile/R04", "note": "Pre-snap width lost: conceded"},
      {"shot": "medium/landscape/R10", "note": "Carrier on the bottom edge, heavy sky: conceded"},
      {"shot": "medium/landscape/R12", "note": "Plate hides the pile; perf tail is one scene (rain 132 ms), Low tier shows the same jitter under load"}
    ]},
    "authenticity": {"score": 6.5, "confidence": 0.7, "evidence": [
      {"shot": "high/desktop/R15", "note": "Visitor stand is filled and lit, at the right scale for high school, not a dark box"},
      {"shot": "high/desktop/R20", "note": "3A Jessieville variant with its own wordmark and logo"},
      {"shot": "crops/high/R01-board", "note": "HS scoreboard with DOWN / TO GO / BALL ON"},
      {"shot": "high/desktop/R14", "note": "Bare end-zone surround: conceded"},
      {"shot": "crops/high/R01-crowd", "note": "No band or student section: conceded"}
    ]}
  },
  "gaps": [
    {"id": "G-portrait-presnap-receivers-offscreen", "category": "readability", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS7", "evidence": ["medium/mobile/R04", "high/mobile/R04"], "benchmark": "retrobowl-1", "fix": "Fit the portrait pre-snap camera to all eligible receivers plus a 2 yd margin."},
    {"id": "G-landscape-toast-hides-pile", "category": "mobile", "expectedGain": 0.4, "severity": 4, "effort": "S", "workstream": "WS7", "evidence": ["medium/landscape/R12", "high/landscape/R12"], "benchmark": "retrobowl-2", "fix": "Aim the landscape result camera so the spot sits about 40 percent from the top, or move the toast into the widened result panel."},
    {"id": "G-catch-tackle-feel", "category": "animation", "expectedGain": 0.4, "severity": 3, "effort": "M", "workstream": "WS4", "evidence": ["strips/high/R09", "strips/high/R10", "high/desktop/R13"], "benchmark": "madden26-4", "fix": "Blend the catch into a tuck; add a 0.3 s slow-motion and punch-in at live catch and contact, plus a turf-spray burst. Replay DOF already exists."},
    {"id": "G-officials-mannequins", "category": "art", "expectedGain": 0.2, "severity": 2, "effort": "M", "workstream": "WS3", "evidence": ["crops/high/R03-slot_QB", "crops/high/R04-slot_C", "crops/high/R12-carrier"], "benchmark": "axis-3", "fix": "Attach the striped sleeves to the torso and give officials fingered hands; heads are already skin-toned."},
    {"id": "G-player-hands-cloth", "category": "art", "expectedGain": 0.4, "severity": 3, "effort": "L", "workstream": "WS3", "evidence": ["crops/high/R06-slot_C-side", "crops/high/R06-slot_DL2-side", "crops/high/R06-slot_LG"], "benchmark": "axis-3", "fix": "Glove meshes with grouped fingers, arm sleeves and elbow pads, a jersey normal map with folds, and 2-3 body types."},
    {"id": "G-venue-surrounds-empty", "category": "authenticity", "expectedGain": 0.3, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["high/desktop/R14", "high/desktop/R16", "high/desktop/R17", "high/desktop/R15"], "benchmark": "cfb26-2", "fix": "Add an end-zone fence with fans and a concession or field house, and replace the cone trees with card-foliage trees. The visitor stand is already filled and lit."},
    {"id": "G-band-student-section", "category": "authenticity", "expectedGain": 0.3, "severity": 2, "effort": "M", "workstream": "WS2", "evidence": ["crops/high/R01-crowd", "high/desktop/R01"], "benchmark": "cfb26-1", "fix": "Add a uniformed band block and a themed student section near the 50."},
    {"id": "G-wet-turf-full-frame", "category": "lighting", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS5", "evidence": ["high/desktop/R18", "crops/high/R18-turf_26_67_40"], "benchmark": "cfb26-3", "fix": "Lower turf roughness field-wide in rain and add streaked tower reflections visible from the gameplay camera."},
    {"id": "G-landscape-live-carrier-edge", "category": "mobile", "expectedGain": 0.2, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/landscape/R10", "medium/landscape/R10"], "benchmark": "retrobowl-2", "fix": "Aim the landscape live camera so the carrier sits at about 60 percent of frame height."},
    {"id": "G-phone-frame-spikes", "category": "mobile", "expectedGain": 0.1, "severity": 2, "effort": "M", "workstream": "WS1", "evidence": ["medium/mobile/R10", "medium/mobile/R12"], "fix": "First re-measure on an idle machine: the 132 ms p95 is the rain scene only, and Low shows the same jitter under load. Then trim phone-tier shadow and bloom cost if the tail persists."},
    {"id": "G-qb-under-center", "category": "animation", "expectedGain": 0.1, "severity": 2, "effort": "S", "workstream": "WS4", "evidence": ["crops/high/R06-slot_C"], "fix": "Use a crouched under-center QB pose on under-center plays (R06). R04 is shotgun and correct."},
    {"id": "G-fg-meter-overlap", "category": "ui", "expectedGain": 0.1, "severity": 1, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R16"], "benchmark": "retrobowl-3", "fix": "Narrow the meter to clear the in-world scoreboard and drop the duplicate side-panel copy."},
    {"id": "G-contact", "category": "animation", "expectedGain": 0.6, "severity": 4, "effort": "L", "workstream": "WS4b", "evidence": ["strips/high/R13", "crops/high/R12-carrier", "high/desktop/R13"], "benchmark": "cfb26-4", "fix": "Make the wrap-to-ground descent visible inside the strip window and add collision separation for the minor pile overlap. A resolved fall already exists."},
    {"id": "G-weight", "category": "animation", "expectedGain": 0.4, "severity": 3, "effort": "L", "workstream": "WS4", "evidence": ["strips/high/R11", "crops/high/R11-carrier"], "benchmark": "madden26-4", "fix": "Strengthen the plant foot and hip shift at cuts and give blockers distinct brace and push phases. The runner's forward lean already exists."},
    {"id": "G-phone-framing", "category": "readability", "expectedGain": 0.6, "severity": 4, "effort": "M", "workstream": "WS7", "evidence": ["medium/mobile/R04", "medium/landscape/R10"], "benchmark": "retrobowl-1", "fix": "Fit pre-snap width to eligible receivers and keep a safe margin around the landscape live carrier. Overlaps the two Claude framing gaps."},
    {"id": "G-phone-hitches", "category": "mobile", "expectedGain": 0.2, "severity": 2, "effort": "L", "workstream": "WS7", "evidence": ["medium/mobile/R08", "medium/landscape/R10"], "benchmark": "retrobowl-2", "fix": "Re-run the 4x proxy on an unloaded machine before profiling: the tail is one scene, and Low (220k tris) shows the same p50/p95 split."},
    {"id": "G-player-construction", "category": "art", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS3", "evidence": ["crops/high/R04-slot_QB", "crops/high/R06-slot_C-side", "crops/high/R14-carrier"], "benchmark": "axis-3", "fix": "Rebalance shoulder and waist proportions, fix sleeve and hip deformation, and add cloth folds. Duplicates G-player-hands-cloth."},
    {"id": "G-result-occlusion", "category": "ui", "expectedGain": 0.2, "severity": 2, "effort": "M", "workstream": "WS7", "evidence": ["medium/landscape/R12", "high/desktop/R12"], "benchmark": "madden26-3", "fix": "Landscape only (desktop R12 is clear): keep the pile inside an overlay-safe region. Duplicates G-landscape-toast-hides-pile."},
    {"id": "G-wet-surface", "category": "lighting", "expectedGain": 0.3, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["high/desktop/R18", "crops/high/R18-turf_26_67_40"], "benchmark": "cfb26-4", "fix": "Vary wetness spatially and broaden the specular response. Duplicates G-wet-turf-full-frame."},
    {"id": "G-school-crowd", "category": "authenticity", "expectedGain": 0.4, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["crops/high/R01-crowd", "high/desktop/R20"], "benchmark": "cfb26-1", "fix": "Vary spectator silhouettes and poses, and stage a modest band and student section with school banners."}
  ],
  "verdict": "continue"
}
```
