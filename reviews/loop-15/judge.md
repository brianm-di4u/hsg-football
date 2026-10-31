# Judge ruling: loop 15, High tier

Capture paths are relative to `games/football/screenshots/review-loop-15/`. I opened every capture cited below myself. The zoomed crops I made are in `C:\Users\brian\AppData\Local\Temp\claude\C--Video-Game-Projects-games-football\790bf3d4-42e4-4dfb-9562-ebad5fae8fb3\scratchpad\judge15\` (`r10_f1to5.png`, `r15_focus.png`, `m04_edges.png`, `r13_f5to8.png`, `r11_zoom.png`).

## Calibration
I scored `reviews/loop-15/calibration.jpg` on the anchors alone.
- **Art 7.0.** The bodies are smooth, with readable gear and numbers. The turf has grain at field level. The crowd fills a full bowl and reads as people at distance, and the venue is built objects: boards, benches, sideline dressing. That matches the 7 anchor.
- **Lighting 6.5.** It has real cast shadows (hard truss shadows across the field, and shadows under players) and a believable exposure. There is no bloom, no night falloff, and no specular or filmic grade, so it sits just under 7.

## Disputed facts (checked)
| Claim | Ruling | Capture checked |
|---|---|---|
| Critic A: "every hand is a mitten" | **Advocate right.** Player gloves have a split thumb and grouped fingers (#55 in `crops/high/R06-slot_C-side`; #74's raised, splayed hand in `crops/high/R14-carrier`). They are simplified but not mittens. Only the officials have blob hands. | `crops/high/R06-slot_C-side`, `crops/high/R14-carrier` |
| The officials | **Critic B right on construction; Critic A partly wrong.** In `crops/high/R03-slot_QB`, the striped sleeves float apart from the torso and the forearms end in black paddles with no hand. The cap is a brimless dome. In `crops/high/R12-carrier` the official does have a neck and shoes, so "no neck" is wrong; "featureless head" stands. | `crops/high/R03-slot_QB`, `crops/high/R12-carrier` |
| Critic A: nothing moves in `strips/high/R10` frames 1–5 | **Advocate right.** In my stack of frames 1–5 (`r10_f1to5.png`), the right-side Lakeside defender runs into the cluster and the knot tightens around #44. Only the two edge blocking pairs hold identical squats. Movement is real but minimal, and the carrier is clipped at the bottom edge in frame 5. | `strips/high/R10` |
| Critic B: R15 replay "blurs the action itself" | **Advocate right.** #44, the DELACROIX plate, the ring and his neighbour sit on the focal plane, and the number reads. The heavy blur is on the near-left foreground and the treeline. The middle-ground cluster is only slightly soft. | `high/desktop/R15` (`r15_focus.png`) |
| The R12 pile | **Split.** Three distinct helmets lie on the turf (black at left, white #47 in the middle, blue #20 at right), so the separation pass works and Critic B's "helmets compressed" overstates it. But the limbs and white torsos still overlap into an ambiguous heap, so B's "tangled" holds for the limbs. | `crops/high/R12-carrier`, `high/desktop/R12` |
| Portrait receivers on screen | **Critic A right; the loop brief's claim is false.** In `high/mobile/R04` and `medium/mobile/R04`, receivers 1 and 2 are off-screen. Only edge-clamped badges with outward arrows show, and the only bodies at the edges are white Lakeside defenders (`m04_edges.png`). Critic B's "at the margins" understates it. | `high/mobile/R04`, `medium/mobile/R04` |

## Category rulings

### Art: 6.0
- **Toward 7:**
  - Close-ups show a real material split: glossy decal helmets with specular kicks, matte numbered jerseys and satin pants (`crops/high/R04-slot_C`).
  - Player gloves are split-finger (`crops/high/R14-carrier`).
  - The crowd reads as individual people (`crops/high/R01-crowd`).
- **What holds it under 7:**
  - The official model is broken: detached sleeves and paddle forearms (`crops/high/R03-slot_QB`).
  - Lineman crouches collapse the thigh into the torso (`crops/high/R06-slot_DL2-side`).
  - Behind the end zone the frame is a flat plane and a dark band (`high/desktop/R14`).
- **Comparison.** Against axis-3, the frames are much emptier.
- **Both critics agree on 6.0, and it stands.** Critic A's hand deduction is void, but it never moved the number.

### Lighting & atmosphere: 6.5
- **Meets the 7 anchor:**
  - Fanned multi-tower shadows under the whole kickoff line (`high/desktop/R02`).
  - Lamp bloom and falloff from the field into the stands (`high/desktop/R01`).
  - Wet specular pools in the rain close-up (`crops/high/R18-turf_26_67_40`).
  - Working DoF in the replay (`high/desktop/R15`).
- **Falls short:**
  - At play distance in `high/desktop/R18`, the rain is streaks over a field that reads dry.
  - Beyond the end zones nothing is lit (`high/desktop/R14`, `high/desktop/R16`).
  - The day-mist frame is a flat grey-green with no sun direction (`high/desktop/R19`).
- **Unanimous 6.5, confirmed.**

### Animation & game feel: 5.0
The critics are 1.0 apart (5.5 / 4.5). I checked the strips.
- **What is on screen:**
  - **Throw.** A legible wind-up (`crops/high/R07-slot_QB`) and a ball trail leaving the pocket (`strips/high/R07`).
  - **Catch.** A punch-in and a reach (`strips/high/R09` frame 4). But #88 holds the raised arm through the toast in frames 6–8 (no secure or tuck).
  - **Tackle.** A legible upright-to-ground fall with the tackler on top (`strips/high/R13` frames 5–8, `r13_zoom`). There is no staged wrap and no hit accent.
- **What drags it down: contact is floaty on every snap.**
  - In `crops/high/R10-carrier`, `crops/high/R11-carrier`, `crops/high/R13-carrier` and `crops/high/R18-turf_26_67_40`, engaged pairs stand upright, arms down, stacked chest-to-back. The defender's blue arms poke out from behind the blocker.
  - In `crops/high/R09-slot_Z` the defender's arm emerges from inside #88's torso.
  - The sweep carrier runs nearly upright through the cut (`crops/high/R11-carrier`, `r11_zoom`).
- **Ruling.** This is the rubric's 5 anchor almost word for word: cycles read, contact is floaty. The legible throw, fall and catch beats and the punch-in are only a few of the 7-anchor items.
  - Critic A's 5.5 rests partly on a factual error in his own disfavour ("nothing moving"), but the blocks he rightly flags weigh more than the beats.
  - Critic B's 4.5 ignores the fall and catch beats that are on screen, and misreads the R12 helmets.
  - **5.0.**

### UI / HUD: 6.5
- **Works:**
  - Clean scorebug, numbered shape badges, dashed route art, painted down-and-distance, LOS and line to gain (`high/desktop/R04`).
  - A two-level result banner (`high/desktop/R21`).
- **Defects, all confirmed:**
  - "FIELD GOAL · 45 YD" appears twice (`high/desktop/R16`).
  - Red blitz arrows knot over the centre, and the rail is empty below READY (`high/desktop/R05`).
  - A Lakeside helmet is cut by the toast's top edge, and "TOUCHDOWN!" is repeated in the toast and the panel heading below it (`medium/mobile/R14`).
  - The side diagram duplicates the on-field routes (`high/desktop/R04`).
- **Unanimous 6.5, confirmed.**

### Typography: 7.0
- A consistent condensed display face with a clean sans on a clear name/description/tag scale (`high/desktop/R22`).
- Strong gain/result/attribution hierarchy (`high/desktop/R21`). Tracked gold "TOUCHDOWN!" over "20-YD RUN" (`high/desktop/R14`).
- The scale holds on the phone with nothing clipped (`medium/mobile/R14`).
- Small log copy and the in-world scoreboard legends are the only weak points.
- **Unanimous 7.0. Gate met.**

### Readability: 6.0
The critics are 1.0 apart (6.5 / 5.5). Checked:
- **Desktop is close to 7:**
  - All five eligibles, their badges and routes are in frame, with standing players about 35–40 px (`high/desktop/R04`). About 45% of that frame is sky and hills, which is Critic B's fair point.
  - The enlarged ball with its trail and the target ring read instantly (`high/desktop/R08`).
- **Run carrier.** He is tagged, but his ring sits at about y 735 of 800 (`high/desktop/R10`), and he is clipped at the bottom of `strips/high/R10` frame 5.
- **Portrait fails.** The rubric requires both viewports, and in portrait two of five receivers are off-screen (`high/mobile/R04`, `m04_edges.png`).
- **Defensive pre-snap.** The arrow knot hides assignments (`high/desktop/R05`).
- **Ruling.** Desktop passes, portrait fails. 6.5 ignores how badly the portrait failure misses an explicit anchor term; 5.5 undersells desktop. **6.0.**

### Mobile: 6.0
- **Performance passes.** Medium (the phone tier) holds a 98 fps minimum with a 17.8 ms worst p95 under 4× throttle (perf.json).
- **Landscape is intentional.** All receivers and badges are in frame (`medium/landscape/R04`), and players are large in `medium/landscape/R10`. The sidebar diagram takes about 30% of the width.
- **Portrait pre-snap is not intentional framing.** WR1 and WR2 are off-screen while the top half is empty turf, and linemen are tiny (`medium/mobile/R04`). The live run view also leaves the top 40% as empty field (`medium/mobile/R10`).
- **Unanimous 6.0, confirmed.**

### Authenticity: 6.0
- **Present:**
  - A HS scoreboard (`crops/high/R01-board`).
  - A field house behind the Wolf Stadium end zone (`high/desktop/R03`).
  - Spa City play names (`high/desktop/R22`).
  - Distinct purple Jessieville branding at a small venue (`high/desktop/R20`).
  - A track strip, benches and a grandstand on the home side (`high/desktop/R01`).
- **Missing:**
  - Nothing behind the end zones (`high/desktop/R14`).
  - The crowd is a uniform orange/black/white mass with no band block, student section or cheer squad (`crops/high/R01-crowd`).
- **Unanimous 6.0. Gate (≥ 6) met.**

## Verdict
**Continue.** Typography (7.0) and authenticity (6.0, gate 6) meet their gates. Art, lighting, animation, UI, readability and mobile are all below 7.

## Ranked gaps (by expected gain ÷ effort)
I merged these duplicates:
- G-phone-framing into G-portrait-wideouts-offscreen.
- G-school-crowd into G-endzone-void-and-venue-dressing.
- G-tackle-feel into G-tackle-contact.
- G-anatomy-joints and G-official-and-hand-models into G-official-and-anatomy. Player hands are dropped from scope, because they are already split-finger.
- The defensive-arrow half of G-ui-redundancy-and-empty-rail into G-assignment-clarity.
- G-rain-sheen-at-play-distance into G-rain-integration.
- The planted-feet and lean overlap from G-athletic-motion into G-block-engagement-poses. G-athletic-motion keeps only the cut lean and the catch secure-and-tuck.

G-replay-focus is dropped, because the claim behind it was wrong.

1. **G-portrait-wideouts-offscreen** (mobile, WS7, S, sev 4, +0.6 mobile, +0.3 readability)
   - Problem: the portrait pre-snap camera still loses WR1 and WR2 (`high/mobile/R04`, `medium/mobile/R04`).
   - Fix: fit the camera by projecting every offensive player's bounding sphere to screen space and solve for a distance where all of them land inside 6% side margins. Place the LOS at about 62% of the field viewport height and use the freed upfield space to zoom in.
   - Test: no edge-clamped badge arrows in mobile R04, and linemen at 20+ CSS px.
2. **G-endzone-void-and-venue-dressing** (authenticity, WS2, M, sev 3, +0.5 authenticity, +0.2 art, +0.2 lighting)
   - Problem: the flat plane behind the end zones (`high/desktop/R14`, `high/desktop/R16`) and an undifferentiated crowd (`crops/high/R01-crowd`).
   - Fix, per venue:
     - Behind each end zone, a berm or small bleacher with standing fans, a chain-link fence and the track ring closing around it, lit by the nearest tower.
     - In the home stand, a uniformed band block (one shirt colour plus instrument glints) and a denser student section in school colour.
     - A 6–8 member cheer squad on the home track.
3. **G-block-engagement-poses** (animation, WS4, M, sev 4, +0.5 animation, +0.2 readability)
   - Problem: engaged pairs stand upright, arms down, stacked chest-to-back, with defender arms showing through (`crops/high/R10-carrier`, `crops/high/R13-carrier`, `crops/high/R09-slot_Z`). Edge pairs are frozen in `strips/high/R10`.
   - Fix:
     - Orient each engaged pair face-to-face along the engagement axis, 0.6–0.8 m apart.
     - Hips low, 20–30° forward lean, both hands IK'd to the opponent's chest plate, feet staggered and planted.
     - Drift the pair 5–15 cm per tick toward the winner.
4. **G-run-carrier-framing** (readability, WS7, S, sev 3, +0.3 readability)
   - Problem: the carrier ring sits at about y 735 of 800 on desktop (`high/desktop/R10`, `high/desktop/R18`) and is clipped in `strips/high/R10` frame 5.
   - Fix: on live runs, raise the camera and offset the look-at so the carrier stays between 55% and 70% of the field viewport height. Draw a 2 px team-colour outline on the carrier when he is more than 50% occluded.
5. **G-assignment-clarity** (readability, WS7, S, sev 3, +0.3 readability)
   - Problem: the blitz arrows knot over the centre (`high/desktop/R05`).
   - Fix: draw one short curved arrow per rusher to its gap, fanned with a lateral offset so no two strokes overlap. Give each a dark outline, and draw coverage drops as thin dashed lines at 50% opacity.
6. **G-ui-redundancy-and-empty-rail** (ui, WS7, S, sev 2, +0.3 ui)
   - Problems:
     - "FIELD GOAL · 45 YD" in both the meter and the panel (`high/desktop/R16`).
     - "TOUCHDOWN!" in both the toast and the panel heading (`medium/mobile/R14`).
     - An empty rail below the buttons (`high/desktop/R05`).
     - A body cut by the toast edge (`medium/mobile/R14`).
     - Unlabelled timeout dots.
   - Fix: delete the duplicates, put a drive summary (plays, yards, time of possession) in the rail, make the toast background fully opaque with a 12 px top fade, and label the timeouts "TO".
7. **G-tackle-contact** (animation, WS4b, M, sev 3, +0.4 animation)
   - Problem: the fall reads (`strips/high/R13` frames 5–8), but there is no initiator wrap or impact accent, and the pile limbs stay ambiguous (`crops/high/R12-carrier`).
   - Fix:
     - On first contact, a 2–3 frame hit-pause and a 0.15 s wrap pose (tackler's arms IK'd around the carrier's waist) before the fall.
     - A turf puff (spray in rain) and a small camera nudge.
     - Fall direction from the approach vector, and per-body resting poses chosen so limbs don't overlap.
8. **G-official-and-anatomy** (art, WS3, M, sev 3, +0.4 art)
   - Problem: official sleeves detached from the torso, paddle forearms with no hands, and a brimless dome cap (`crops/high/R03-slot_QB`, `crops/high/R12-carrier`). The lineman thigh collapses in the crouch, and the shoulders are faceted (`crops/high/R06-slot_DL2-side`, `crops/high/R06-slot_C-side`).
   - Fix:
     - Officials: weld the sleeves to the shoulders, give them the players' split-thumb hand, a cap with a brim, a face, a belt and white shoes.
     - Players: lengthen the crouched thigh segment and smooth the shoulder normals.
9. **G-rain-integration** (lighting, WS5, S, sev 2, +0.2 lighting)
   - Problem: the wet sheen shows in `crops/high/R18-turf_26_67_40` but barely in `high/desktop/R18`, where the rain is mostly sky streaks.
   - Fix: in rain, lower turf roughness so tower reflections streak at gameplay distance, scale streak length and opacity by depth, add splash dots at players' feet, and darken and gloss the jerseys.
10. **G-desktop-presnap-pitch** (readability, WS7, S, sev 2, +0.2 readability)
    - Problem: about 45% of `high/desktop/R04` and `high/desktop/R05` is sky and hills above the field.
    - Fix: tilt the desktop pre-snap camera down so the far goalposts sit at about 25% of the viewport height, then use the extra width fit to enlarge the players.
11. **G-athletic-motion** (animation, WS4, L, sev 3, +0.3 animation)
    - Problem: the sweep carrier runs upright through the cut (`crops/high/R11-carrier`, `strips/high/R11`), and #88 holds his arm up after the catch (`strips/high/R09` frames 6–8).
    - Fix: a 10–20° torso and pelvis lean into cuts, with a planted outside foot on the cut frame. After the catch, a reach, a secure to the chest and a tuck under the outside arm within 0.3 s.
12. **G-closeup-camera-occlusion** (art, WS7, S, sev 1, +0.1 art)
    - Problem: close and replay cameras land behind other bodies. The ref fills `crops/high/R03-slot_QB`, and a helmet clips the near plane in `crops/high/R06-slot_C-side`.
    - Fix: raycast from the camera to the target, orbit until the line is clear, and fade bodies within 1 m of the near plane.

```json
{
  "loop": 15,
  "role": "judge",
  "tier": "high",
  "verdict": "continue",
  "calibration": {"art": 7.0, "lighting": 6.5},
  "scores": {
    "art": {"score": 6.0, "confidence": 0.85, "evidence": [
      {"shot": "crops/high/R04-slot_C", "note": "glossy decal helmets vs matte jerseys and satin pants: real material split"},
      {"shot": "crops/high/R14-carrier", "note": "player gloves split-thumb with separate fingers; Critic A's 'mittens' is wrong"},
      {"shot": "crops/high/R03-slot_QB", "note": "official sleeves float off the torso, paddle forearms, no hands, brimless cap"},
      {"shot": "crops/high/R06-slot_DL2-side", "note": "crouched thigh collapses into torso"},
      {"shot": "high/desktop/R14", "note": "flat plane and dark band behind the end zone"}
    ]},
    "lighting": {"score": 6.5, "confidence": 0.85, "evidence": [
      {"shot": "high/desktop/R02", "note": "fanned multi-tower shadows under the kickoff line"},
      {"shot": "high/desktop/R01", "note": "lamp bloom, field-to-stands falloff"},
      {"shot": "crops/high/R18-turf_26_67_40", "note": "wet specular pools; barely visible at play distance in high/desktop/R18"},
      {"shot": "high/desktop/R15", "note": "DoF focal plane on carrier group; blur on foreground and treeline only"},
      {"shot": "high/desktop/R19", "note": "day mist flat, no sun direction"}
    ]},
    "animation": {"score": 5.0, "confidence": 0.75, "evidence": [
      {"shot": "strips/high/R10", "note": "defender closes and knot compresses in 1-5 (not frozen); edge blocking pairs static; carrier clipped at bottom in 5"},
      {"shot": "strips/high/R13", "note": "frames 5-8 legible fall with tackler on top; no staged wrap or hit accent"},
      {"shot": "strips/high/R09", "note": "frame 4 punch-in and reach; arm held up through toast in 6-8, no tuck"},
      {"shot": "crops/high/R10-carrier", "note": "engaged pairs upright, arms down, stacked chest-to-back; DL arms poke from behind OL"},
      {"shot": "crops/high/R09-slot_Z", "note": "defender arm emerges from inside #88's torso"},
      {"shot": "crops/high/R11-carrier", "note": "carrier nearly upright through the cut"}
    ]},
    "ui": {"score": 6.5, "confidence": 0.85, "evidence": [
      {"shot": "high/desktop/R04", "note": "clean scorebug, shape badges, route art, painted down-and-distance; side diagram duplicates field routes"},
      {"shot": "high/desktop/R21", "note": "two-level result banner"},
      {"shot": "high/desktop/R16", "note": "FIELD GOAL 45 YD duplicated in meter and panel"},
      {"shot": "high/desktop/R05", "note": "blitz arrow knot; empty rail"},
      {"shot": "medium/mobile/R14", "note": "helmet cut by toast edge; TOUCHDOWN! repeated in toast and panel"}
    ]},
    "typography": {"score": 7.0, "confidence": 0.8, "evidence": [
      {"shot": "high/desktop/R22", "note": "condensed display names, sans descriptions, RUN/PASS tags on a clear scale"},
      {"shot": "high/desktop/R21", "note": "gain/result/attribution hierarchy, numerals read at a glance"},
      {"shot": "medium/mobile/R14", "note": "scale holds on phone, nothing clipped"}
    ]},
    "readability": {"score": 6.0, "confidence": 0.8, "evidence": [
      {"shot": "high/desktop/R04", "note": "all five eligibles, badges, routes, LOS and line to gain in frame; ~45% of frame sky"},
      {"shot": "high/desktop/R08", "note": "enlarged ball with trail and target ring read instantly"},
      {"shot": "high/desktop/R10", "note": "carrier tagged but ring at ~y735 of 800"},
      {"shot": "high/mobile/R04", "note": "WR1 and WR2 off-screen; edge-clamped badges only (zoom m04_edges.png)"},
      {"shot": "high/desktop/R05", "note": "blitz arrow knot obscures assignments"}
    ]},
    "mobile": {"score": 6.0, "confidence": 0.85, "evidence": [
      {"shot": "medium/mobile/R04", "note": "WR1/WR2 off-screen, top half empty turf, tiny linemen"},
      {"shot": "medium/landscape/R04", "note": "all receivers and badges in frame; sidebar ~30% of width"},
      {"shot": "medium/landscape/R10", "note": "large, readable figures and juke control"},
      {"shot": "medium/mobile/R10", "note": "top ~40% empty field during the live run"},
      {"shot": "perf medium mobile 4x throttle", "note": "98 fps min, 17.8 ms worst p95: passes 30 fps"}
    ]},
    "authenticity": {"score": 6.0, "confidence": 0.8, "evidence": [
      {"shot": "crops/high/R01-board", "note": "HS scoreboard with DOWN / TO GO / BALL ON"},
      {"shot": "high/desktop/R03", "note": "field house behind the end zone, H posts, wide hashes"},
      {"shot": "high/desktop/R20", "note": "Jessieville purple identity at a small venue"},
      {"shot": "crops/high/R01-crowd", "note": "uniform crowd: no band, student section or cheer"},
      {"shot": "high/desktop/R14", "note": "nothing behind the end zone"}
    ]}
  },
  "gaps": [
    {"id": "G-portrait-wideouts-offscreen", "category": "mobile", "expectedGain": 0.6, "severity": 4, "effort": "S", "workstream": "WS7", "evidence": ["high/mobile/R04", "medium/mobile/R04", "medium/landscape/R04"], "benchmark": "retrobowl-1", "fix": "Fit the portrait pre-snap camera by projecting every offensive player's bounding sphere to screen space and solving for a distance with all inside 6% side margins; LOS at ~62% of field-viewport height; zoom into the freed upfield space. Test: no edge-clamped badge arrows in mobile R04 and linemen >= 20 CSS px. Also +0.3 readability."},
    {"id": "G-endzone-void-and-venue-dressing", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["high/desktop/R14", "high/desktop/R16", "crops/high/R01-crowd", "high/desktop/R20"], "benchmark": "cfb26-2", "fix": "Per venue: an end-zone berm or small bleacher with standing fans, chain-link fence and a track ring closing behind both end zones, lit by the nearest tower; a uniformed band block and a denser school-colour student section in the home stand; a 6-8 member cheer squad on the home track. Also +0.2 art, +0.2 lighting."},
    {"id": "G-block-engagement-poses", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS4", "evidence": ["crops/high/R10-carrier", "crops/high/R13-carrier", "crops/high/R09-slot_Z", "strips/high/R10"], "benchmark": "axis-3", "fix": "Orient engaged pairs face-to-face along the engagement axis 0.6-0.8 m apart (not chest-to-back); hips low, 20-30 deg lean, both hands IK'd to the opponent's chest plate, staggered planted feet; drift the pair 5-15 cm per tick toward the winner. Also +0.2 readability."},
    {"id": "G-run-carrier-framing", "category": "readability", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R10", "high/desktop/R18", "strips/high/R10"], "benchmark": "madden26-1", "fix": "On live runs, raise the camera and offset the look-at so the carrier ring stays between 55% and 70% of field-viewport height (currently ~y735/800); 2 px team-colour outline on the carrier when >50% occluded."},
    {"id": "G-assignment-clarity", "category": "readability", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R05"], "benchmark": "axis-1", "fix": "One short curved, dark-outlined arrow per rusher to its gap, fanned with lateral offsets so no two strokes overlap; coverage drops as thin dashed lines at 50% opacity."},
    {"id": "G-ui-redundancy-and-empty-rail", "category": "ui", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R16", "medium/mobile/R14", "high/desktop/R05"], "benchmark": "madden26-3", "fix": "Remove the duplicate FIELD GOAL 45 YD panel title and the duplicate TOUCHDOWN! panel heading; fill the empty rail with a drive summary (plays, yards, time of possession); fully opaque toast with a 12 px top fade so bodies don't cut its edge; label timeouts 'TO'."},
    {"id": "G-tackle-contact", "category": "animation", "expectedGain": 0.4, "severity": 3, "effort": "M", "workstream": "WS4b", "evidence": ["strips/high/R13", "crops/high/R12-carrier"], "benchmark": "madden26-4", "fix": "At first contact a 2-3 frame hit-pause and a 0.15 s wrap pose (tackler arms IK'd around the carrier's waist) before the fall; turf or spray puff and a small camera nudge; fall direction from the approach vector; per-body resting poses chosen so limbs don't overlap in the pile."},
    {"id": "G-official-and-anatomy", "category": "art", "expectedGain": 0.4, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["crops/high/R03-slot_QB", "crops/high/R12-carrier", "crops/high/R06-slot_DL2-side"], "benchmark": "axis-3", "fix": "Officials: weld sleeves to the shoulders, use the players' split-thumb hand, add a brimmed cap, face, belt and white shoes. Players: lengthen the crouched thigh segment and smooth shoulder normals. Player hands are already fine."},
    {"id": "G-rain-integration", "category": "lighting", "expectedGain": 0.2, "severity": 2, "effort": "S", "workstream": "WS5", "evidence": ["high/desktop/R18", "crops/high/R18-turf_26_67_40"], "benchmark": "cfb26-3", "fix": "In rain lower turf roughness so tower reflections streak at gameplay distance, scale streak length and opacity by depth, add splash dots at players' feet, darken and gloss jerseys."},
    {"id": "G-desktop-presnap-pitch", "category": "readability", "expectedGain": 0.2, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R04", "high/desktop/R05"], "benchmark": "axis-1", "fix": "Tilt the desktop pre-snap camera down so the far goalposts sit at ~25% of viewport height (sky currently ~45%), then use the width fit to enlarge players."},
    {"id": "G-athletic-motion", "category": "animation", "expectedGain": 0.3, "severity": 3, "effort": "L", "workstream": "WS4", "evidence": ["crops/high/R11-carrier", "strips/high/R11", "strips/high/R09"], "benchmark": "madden26-4", "fix": "10-20 deg torso and pelvis lean into cuts with a planted outside foot on the cut frame; after the catch, reach, secure to the chest and tuck under the outside arm within 0.3 s instead of holding the arm up."},
    {"id": "G-closeup-camera-occlusion", "category": "art", "expectedGain": 0.1, "severity": 1, "effort": "S", "workstream": "WS7", "evidence": ["crops/high/R03-slot_QB", "crops/high/R06-slot_C-side"], "benchmark": "cfb26-4", "fix": "Raycast from close and replay cameras to the target, orbit until the line is clear, fade bodies within 1 m of the near plane."}
  ]
}
```
