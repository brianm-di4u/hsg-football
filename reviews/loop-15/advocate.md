# Advocate rebuttal: loop 15, High tier

Capture paths are relative to `games/football/screenshots/review-loop-15/`. Zoomed crops I made to check claims are in `C:\Users\brian\AppData\Local\Temp\claude\C--Video-Game-Projects-games-football\790bf3d4-42e4-4dfb-9562-ebad5fae8fb3\scratchpad\adv15\` (they are named below where they decided a claim).

## Summary
Most of what the critics say holds up. I concede the portrait framing failure, the passive block poses, the empty space behind the end zones, the poorly built officials, the duplicated FG label and the tangle of blitz arrows. There are four places where a critic is plainly wrong or overstates the case.
1. **Player hands are not mittens.** Critic A says "every hand is a mitten" and cites `crops/high/R06-slot_C-side` and `crops/high/R14-carrier`. Both show a split thumb and separate fingers. Only the officials have blob hands.
2. **Tackles are not the biggest gap.** Critic B rates tackle contact severity 5 for +1.5 animation. `strips/high/R13` frames 5–8 show a legible two-man fall, and `crops/high/R12-carrier` shows three separate downed bodies with three distinct helmets.
3. **The R15 replay does not blur the action.** Critic B says `high/desktop/R15` blurs the action itself. The focal plane sits on the carrier and the players next to him. The heavy blur is on the foreground and the treeline.
4. **Something does move in the run strip.** Critic A says nothing moves in `strips/high/R10` frames 1–5. The defenders close in and the cluster compresses. Only the edge blocking pairs stay frozen.

Proposed changes: animation 5.5 (mean 5.0) and readability 6.5 (mean 6.0). Every other category holds at the mean.

## Category by category

### Art (critics 6.0 / 6.0, mean 6.0). Proposed 6.0
- **Concede the material split, as both critics say.** `crops/high/R04-slot_C` shows glossy decal helmets with specular kicks, matte numbered jerseys and satin pants.
- **Concede that the official is a mannequin.** In `crops/high/R03-slot_QB` (my zoom `ref_arms.png`) the striped sleeves float apart from the torso with a visible gap, and the forearms are separate black blobs that end in no hand. **Critic B's "disconnected arm segments" is correct.** The same model appears again in `crops/high/R12-carrier` (zoom `r12_ref.png`): sleeves detached at the shoulder, mitten hands, a brimless skull cap, a blank face.
- **Rebut (Critic A plainly wrong): player hands.**
  - `crops/high/R06-slot_C-side`: #55's white gloves have a separated thumb and fingers, at about x 300–380, y 380–490 and x 470–530, y 530–590.
  - `crops/high/R14-carrier`: #74's raised hand is splayed, with individual fingers against the sky.
  - `crops/high/R06-slot_DL2-side` (zoom `dl2_hand.png`): the down lineman's glove has a split thumb and three to four distinct finger groups.
  - "Mittens everywhere" is false. Only the officials have blob hands.
- **Rebut (Critic A partly wrong): "no neck."** The official in `crops/high/R12-carrier` has a visible neck and black shoes. "Featureless head, no brim" is fair.
- **Concede, as Critic B says, compressed crouch anatomy and faceting.** In `crops/high/R06-slot_DL2-side` the thigh of the near DL is barely visible between hip and knee, and the shoulder line of #55 in `crops/high/R06-slot_C-side` is faceted.
- **Concede, as Critic A says, the empty space behind the end zone.** `high/desktop/R14` shows a flat grey-green plane, a dark band and then a treeline.
- **Score.** The fixed hand error removes one of Critic A's deductions, but the official and the crouch problems keep this short of the 7 anchor (axis-3: wide-based linemen, full bowl). **6.0 holds.**

### Lighting (6.5 / 6.5, mean 6.5). Proposed 6.5
- **Concede what meets the 7 anchor.**
  - Fanned multi-tower shadows under the whole kickoff line in `high/desktop/R02`.
  - Lamp bloom and falloff from the field to the stands in `high/desktop/R01`.
  - Wet specular patches in `crops/high/R18-turf_26_67_40`.
- **Concede that rain sheen is barely visible at play distance.** `high/desktop/R18` is mostly streaks over a dry-looking field.
- **Rebut Critic B: "R15 blurs the action itself."** In `high/desktop/R15` (zoom `r15_focus.png` against `r15_near.png`), #44 and the two players beside him are on the focal plane. Numbers, helmet stripes and the ring all resolve. The near-left Lakeside player and the treeline are heavily blurred. The middle ground is somewhat soft, but this is a working depth-of-field (DoF) replay, not blanket blur.
- **Partly rebut Critic A on `high/desktop/R19`.** The mist frame has layered mountain silhouettes that recede into haze, so there is aerial perspective and it isn't uniform. "No sun direction / low contrast" is fair.
- **Score.** 6.5 holds.

### Animation (critics 5.5 / 4.5, mean 5.0). Proposed 5.5
- **Concede blocks (Critic A).** In `crops/high/R10-carrier` and `crops/high/R13-carrier` the OL stand upright with their arms hanging, and blue DL arms poke out from behind #66 and #74. In `crops/high/R09-slot_Z` a defender's arm comes out from behind #88's torso. axis-3 shows extended hands and wide bases. This is the main shortfall.
- **Concede an upright runner through the cut (Critic B).** `crops/high/R11-carrier` shows #44 with only a slight forward lean.
- **Rebut Critic A: "nothing moving" in `strips/high/R10` frames 1–5.** My zoom `r10_135.png` stacks frames 1, 3 and 5.
  - The camera tracks.
  - The right-hand Lakeside defender runs in from the open field in frame 1 and joins the cluster by frame 3.
  - The interior knot tightens around #44, whose number is readable in the centre of frames 3 and 5.
  - Only the two edge blocking pairs hold identical squats. That supports the block gap, not "frozen."
- **Rebut Critic B's "below 5" reading, which ignores beats that are on screen.**
  - **Throw.** `crops/high/R07-slot_QB` is a legible wind-up with the ball behind the head and the off arm out. In `strips/high/R07` (zoom `r07_zoom.png`) a ball trail streaks out of the pocket from frame 3.
  - **Catch.** In `strips/high/R09` (zoom `r09_zoom.png`), frames 1–3 show the ball with its trail coming in to the blue target ring. Frame 4 is a punch-in, with #88 reaching one arm up and a defender trailing. In frames 7–8 the defender stumbles to the turf. That is a readable sequence of throw, reach and a secondary reaction.
  - **Tackle.** In `strips/high/R13` frames 5–8 (zoom `r13_zoom.png`), the carrier tagged "20 KEMP" goes from upright to on the ground with a tackler on top.
  - **Celebration.** `crops/high/R14-carrier` shows arms-up celebration poses across the group.
  - **Feel touches.** The catch punch-in, the replay DoF and the ball trail are all present.
- **Partly concede Critic B on the catch.** In R09 frames 6–8 #88 still holds the raised-arm pose after the "+7 YD" toast, so the secure-and-tuck beat is missing.
- **Score.** The rubric's 5 anchor ("procedural cycles … floaty contact, stiff falls") is passed by the legible throw, catch and fall beats. Passive blocks keep it well short of 7. **5.5 is within +0.5 of the mean.**

### UI / HUD (6.5 / 6.5, mean 6.5). Proposed 6.5
Everything below is conceded.
- The FG label is duplicated in `high/desktop/R16`: "FIELD GOAL · 45 YD" appears in both the meter and the side panel.
- The rail is empty below the buttons in `high/desktop/R05` and `high/desktop/R16`.
- The red blitz arrows converge into a knot over the centre in `high/desktop/R05`.
- The side diagram duplicates the on-field route art in `high/desktop/R04` (Critic B).
- Bodies sit under the toast edge: a Lakeside helmet in `medium/mobile/R14` at the toast top, and faint legs and an official behind the semi-opaque toast in `high/desktop/R12`.

What works:
- The scorebug and the badges with route art in `high/desktop/R04` and `high/desktop/R19`.
- The two-level result hierarchy in `high/desktop/R21` and `high/desktop/R14`.

**6.5 holds.**

### Typography (7 / 7, mean 7). Proposed 7.0
- **No dispute.** `high/desktop/R22` has a consistent condensed display face for play names with a sans for descriptions and RUN/PASS tags.
- `high/desktop/R14` has the tracked gold "TOUCHDOWN!" and "20-YD RUN".
- `medium/mobile/R14` holds the same scale on the phone and nothing is clipped.

### Readability (6.5 / 5.5, mean 6.0). Proposed 6.5
- **Concede portrait (both critics).** See Mobile.
- **Concede the knot of defensive arrows** in `high/desktop/R05`.
- **Rebut Critic B's desktop reading.**
  - `high/desktop/R04` does put roughly the top 45% of the frame on sky and hills. But all five eligible receivers, their numbered shape badges and their routes are in frame. Standing players are about 35–40 px, and the blue LOS and yellow line to gain are drawn.
  - The same holds in `high/desktop/R19` and `high/desktop/R20`.
  - `high/desktop/R08`: the enlarged ball with its trail and the receiver's target ring and badge read instantly.
  - The carrier gets a ground ring and a "44 DELACROIX" plate in `high/desktop/R10` and again in `high/desktop/R18` through the rain.
- **Partly rebut Critic A.** The carrier is not lost, because the ring and plate find him at a glance. He does sit near the bottom edge (ring at about y 730 of 800 in `high/desktop/R10`).
- **Score.** Desktop meets most of the 7 anchor and portrait fails it. **6.5 is +0.5 over the mean.**

### Mobile (6 / 6, mean 6). Proposed 6.0
- **Concede fully (Critic A is correct).**
  - In `high/mobile/R04` and `medium/mobile/R04` (zooms `m04_left.png`, `m04_right.png`), receivers 1 and 2 are off-screen. Only the badges clamped to the edges with yellow arrows show.
  - The only bodies at the edges are white Lakeside defenders.
  - About 45–50% of the field area above the formation is empty turf.
  - This contradicts the loop brief's statement that every receiver is on screen.
- **Critic B understates the problem.** "Receivers against the image edges" should be "receivers off the image."
- **Landscape is intentional.** `medium/landscape/R04` shows all receivers, badges and routes in frame. Critic B is fair that the sidebar diagram takes about 30% of the width.
- **Performance passes:** 98 fps minimum and a 17.8 ms p95 on medium mobile at 4× throttle.
- **Score.** 6.0 holds.

### Authenticity (6 / 6, mean 6). Proposed 6.0
- **Concede.**
  - No band, cheer squad or distinct student section anywhere. `crops/high/R01-crowd` is uniform orange, black and white individuals.
  - The space behind the end zone is empty in `high/desktop/R14` and `high/desktop/R16`.
  - Only a sliver of stand shows at Jessieville in `high/desktop/R20`.
- **Minor rebut (Critic A).** A tan track strip does run along the home sideline in `high/desktop/R01` and `high/desktop/R02`. It is the full ring that is missing.
- **Credit both critics give.** The HS scoreboard in `crops/high/R01-board`, the field house in `high/desktop/R03`, the Spa City play names in `high/desktop/R22`, and the purple Jessieville identity in `high/desktop/R20`.
- **Score.** 6.0 holds.

## Facts the critics got plainly wrong
- **Critic A: "every hand is a mitten" / "mitten blobs everywhere: `crops/high/R06-slot_C-side` … `crops/high/R14-carrier`".** Both captures show split-thumb gloves with separate fingers, as does `crops/high/R06-slot_DL2-side`. Only officials have blob hands.
- **Critic A: the official has "no neck".** `crops/high/R12-carrier` shows a neck and shoes.
- **Critic A: `strips/high/R10` frames 1–5 "show nothing moving".** Defenders close in and the knot compresses. Only the edge pairs are static.
- **Critic B: `high/desktop/R15` "blurs the action itself".** The carrier and the players beside him are on the focal plane.
- **Critic B: `crops/high/R12-carrier` "helmets compressed into the ground-level pile".** Three separate helmets (black at left, white #47 in the middle, blue #20 at right) sit on the turf, distinct from one another.
- **Critic B: `medium/mobile/R04` outside receivers "at the margins".** They are off-screen entirely. This error understates the problem.

## Gap adjustments
**Critic A's gaps**
- **G-block-engagement-poses:** keep (severity 4, +0.5).
- **G-portrait-wideouts-offscreen:** keep (severity 4, +0.5).
- **G-endzone-void-and-venue-dressing:** keep (severity 3, +0.5).
- **G-official-and-hand-models:** narrow to officials only, because player hands are already split-finger. Lower to severity 2, +0.2.
- **G-run-carrier-framing:** the ring and plate already identify the carrier, so only the framing at the bottom edge remains. Lower to severity 2, +0.2.
- **G-tackle-feel:** keep (severity 3, +0.3).
- **G-ui-redundancy-and-empty-rail:** keep (severity 2, +0.3).
- **G-closeup-camera-occlusion:** this blames the review capture rig's close-up camera, not anything the player sees in game. Fixing it improves evidence, not the art score. Lower to severity 1, +0.1.
- **G-rain-sheen-at-play-distance:** keep (severity 2, +0.2).

**Critic B's gaps**
- **G-tackle-contact:** the fall reads and bodies separate, so it is not severity 5 or +1.5. Lower to severity 3, +0.5. It overlaps G-tackle-feel.
- **G-anatomy-joints:** the official's arm gap is real. The players' hands, helmets and gear hold up, and officials are small in most frames. Lower to severity 3, +0.5.
- **G-phone-framing:** real, but landscape already works. Lower to severity 4, +0.7.
- **G-athletic-motion:** the wind-up and the catch reach are legible, so the remaining gaps are the cut lean and the secure-and-tuck. Lower to severity 3, +0.5.
- **G-assignment-clarity:** the offensive pre-snap is clean on desktop, so only the defensive knot remains. Lower to severity 3, +0.5.
- **G-replay-focus:** the blur is overstated. Lower to severity 2, +0.2.
- **G-school-crowd:** keep (severity 3, +0.5). It overlaps G-endzone-void.
- **G-rain-integration:** lower to severity 2, +0.3.

```json
{
  "loop": 15,
  "role": "advocate",
  "tier": "high",
  "verdict": "continue",
  "scores": {
    "art": {"score": 6.0, "confidence": 0.8, "evidence": [
      {"shot": "crops/high/R04-slot_C", "note": "glossy decal helmets vs matte jerseys and satin pants: real material split"},
      {"shot": "crops/high/R06-slot_C-side", "note": "player gloves have split thumb and separate fingers (Critic A's 'mittens' is wrong); shoulder faceting is real"},
      {"shot": "crops/high/R14-carrier", "note": "raised hands splayed with individual fingers"},
      {"shot": "crops/high/R03-slot_QB", "note": "official's sleeves float apart from torso; blob forearms, no hands (Critic B correct)"},
      {"shot": "crops/high/R06-slot_DL2-side", "note": "compressed crouch thigh, but finger-split glove"},
      {"shot": "high/desktop/R14", "note": "flat plane and dark band behind the end zone"}
    ]},
    "lighting": {"score": 6.5, "confidence": 0.75, "evidence": [
      {"shot": "high/desktop/R02", "note": "fanned multi-tower shadows under the whole kickoff line"},
      {"shot": "high/desktop/R01", "note": "lamp bloom, field-to-stands falloff"},
      {"shot": "crops/high/R18-turf_26_67_40", "note": "wet specular patches; faint at play distance in high/desktop/R18"},
      {"shot": "high/desktop/R15", "note": "DoF focus on carrier group; heavy blur only on foreground and treeline"}
    ]},
    "animation": {"score": 5.5, "confidence": 0.7, "evidence": [
      {"shot": "strips/high/R09", "note": "ball with trail into target ring (1-3), punch-in and reach (4), defender stumble (7-8); arm held up after the toast"},
      {"shot": "strips/high/R13", "note": "frames 5-8 carrier taken to the ground with tackler on top"},
      {"shot": "strips/high/R10", "note": "defenders close and knot compresses in 1-5; edge blocking pairs frozen in squats"},
      {"shot": "crops/high/R07-slot_QB", "note": "legible wind-up, ball behind head"},
      {"shot": "crops/high/R10-carrier", "note": "blockers upright, arms hanging, DL arms clip behind OL"},
      {"shot": "crops/high/R11-carrier", "note": "runner nearly upright through the cut"}
    ]},
    "ui": {"score": 6.5, "confidence": 0.8, "evidence": [
      {"shot": "high/desktop/R04", "note": "clean scorebug, numbered shape badges, route art; side diagram duplicates on-field routes"},
      {"shot": "high/desktop/R16", "note": "FIELD GOAL 45 YD duplicated; empty rail"},
      {"shot": "high/desktop/R05", "note": "blitz arrows converge into a knot"},
      {"shot": "high/desktop/R21", "note": "two-level result banner"},
      {"shot": "medium/mobile/R14", "note": "helmet at the toast's top edge"}
    ]},
    "typography": {"score": 7.0, "confidence": 0.75, "evidence": [
      {"shot": "high/desktop/R22", "note": "condensed display names, sans descriptions, RUN/PASS tags on a clear scale"},
      {"shot": "high/desktop/R14", "note": "tracked gold TOUCHDOWN! over 20-YD RUN"},
      {"shot": "medium/mobile/R14", "note": "scale holds on the phone, nothing clipped"}
    ]},
    "readability": {"score": 6.5, "confidence": 0.7, "evidence": [
      {"shot": "high/desktop/R04", "note": "all five eligibles, badges and routes in frame; players ~35-40 px; LOS and line to gain drawn; sky takes ~45% of frame"},
      {"shot": "high/desktop/R08", "note": "enlarged ball with trail, target ring and receiver badge"},
      {"shot": "high/desktop/R18", "note": "carrier ring and name plate read through rain"},
      {"shot": "high/desktop/R10", "note": "carrier tagged but near the bottom edge"},
      {"shot": "high/mobile/R04", "note": "receivers 1 and 2 off-screen, edge arrows only"},
      {"shot": "high/desktop/R05", "note": "defensive arrow knot"}
    ]},
    "mobile": {"score": 6.0, "confidence": 0.8, "evidence": [
      {"shot": "medium/mobile/R04", "note": "WR1 and WR2 off-screen (zoomed both edges); ~45-50% of the field above the formation empty"},
      {"shot": "medium/landscape/R04", "note": "all receivers, badges and routes in frame; sidebar ~30% of width"},
      {"shot": "medium/mobile/R14", "note": "large CONTINUE target, readable toast"},
      {"shot": "perf medium mobile 4x throttle", "note": "98 fps min, 17.8 ms p95"}
    ]},
    "authenticity": {"score": 6.0, "confidence": 0.75, "evidence": [
      {"shot": "high/desktop/R01", "note": "home grandstand, track strip on the home sideline, benches, light towers"},
      {"shot": "crops/high/R01-board", "note": "HS scoreboard"},
      {"shot": "high/desktop/R20", "note": "Jessieville purple identity, small venue, only a sliver of stand"},
      {"shot": "crops/high/R01-crowd", "note": "individual fans but no band, cheer or student section"},
      {"shot": "high/desktop/R14", "note": "nothing behind the end zone"}
    ]}
  },
  "gaps": [
    {"id": "G-block-engagement-poses", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS4", "evidence": ["crops/high/R10-carrier", "crops/high/R13-carrier", "strips/high/R10"], "benchmark": "axis-3", "fix": "Pass-pro and run-block poses: hips low, 20-30 deg lean, hands IK'd to the opponent's chest, staggered planted feet; drift the pair toward the winner each tick."},
    {"id": "G-portrait-wideouts-offscreen", "category": "mobile", "expectedGain": 0.5, "severity": 4, "effort": "S", "workstream": "WS7", "evidence": ["high/mobile/R04", "medium/mobile/R04"], "benchmark": "retrobowl-1", "fix": "Fit the portrait pre-snap camera to the widest receiver x-extent +/-3 yd in screen space, put the LOS at ~65% of viewport height and zoom into the freed space."},
    {"id": "G-endzone-void-and-venue-dressing", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["high/desktop/R14", "high/desktop/R16", "high/desktop/R04"], "benchmark": "cfb26-2", "fix": "End-zone berm or bleachers with fans, fence and track ring around the end zones, a band block and student section in the home stand, cheer squad on the home track."},
    {"id": "G-official-and-hand-models", "category": "art", "expectedGain": 0.2, "severity": 2, "effort": "M", "workstream": "WS3", "evidence": ["crops/high/R03-slot_QB", "crops/high/R12-carrier"], "benchmark": "axis-3", "fix": "Officials only (player gloves already have split fingers): attach sleeves to the torso, add hands, a brimmed cap, face detail, belt."},
    {"id": "G-run-carrier-framing", "category": "readability", "expectedGain": 0.2, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R10", "strips/high/R10"], "benchmark": "madden26-1", "fix": "Keep the carrier ~35% up from the bottom on live runs; ring and plate already identify him."},
    {"id": "G-tackle-feel", "category": "animation", "expectedGain": 0.3, "severity": 3, "effort": "M", "workstream": "WS4b", "evidence": ["strips/high/R13", "crops/high/R13-carrier"], "benchmark": "madden26-4", "fix": "2-3 frame hit-pause at first contact, turf or spray puff, camera nudge, fall direction varied by approach angle."},
    {"id": "G-ui-redundancy-and-empty-rail", "category": "ui", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R16", "high/desktop/R05", "medium/mobile/R14"], "benchmark": "madden26-3", "fix": "Remove the duplicated FG label, use the empty rail for drive or matchup info, draw blitz paths as short outlined curves, keep bodies clear of the toast edge."},
    {"id": "G-closeup-camera-occlusion", "category": "art", "expectedGain": 0.1, "severity": 1, "effort": "S", "workstream": "WS7", "evidence": ["crops/high/R03-slot_QB", "crops/high/R06-slot_C-side"], "benchmark": "cfb26-4", "fix": "Capture-rig issue rather than a player-facing defect: raycast close-up camera to target and orbit until clear."},
    {"id": "G-rain-sheen-at-play-distance", "category": "lighting", "expectedGain": 0.2, "severity": 2, "effort": "S", "workstream": "WS5", "evidence": ["high/desktop/R18", "crops/high/R18-turf_26_67_40"], "benchmark": "cfb26-3", "fix": "Lower turf roughness and raise reflection contrast in rain so tower streaks show at gameplay distance; darken and gloss wet uniforms."},
    {"id": "G-tackle-contact", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS4b", "evidence": ["strips/high/R13", "crops/high/R12-carrier"], "benchmark": "cfb26-4.jpg", "fix": "Stage initiator, wrap and momentum transfer before the (already legible) fall; vary resting poses. Overlaps G-tackle-feel."},
    {"id": "G-anatomy-joints", "category": "art", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS3", "evidence": ["crops/high/R03-slot_QB", "crops/high/R06-slot_DL2-side"], "benchmark": "axis-3.jpg", "fix": "Join official arm segments to the torso; lengthen the crouched thigh and soften faceted shoulders on players."},
    {"id": "G-phone-framing", "category": "mobile", "expectedGain": 0.7, "severity": 4, "effort": "M", "workstream": "WS7", "evidence": ["medium/mobile/R04", "medium/landscape/R04"], "benchmark": "retrobowl-1.jpg", "fix": "Keep all receivers on screen in portrait with body margins, use the empty upfield space for scale, and collapse the landscape sidebar diagram pre-snap."},
    {"id": "G-athletic-motion", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS4", "evidence": ["crops/high/R11-carrier", "strips/high/R09", "strips/high/R11"], "benchmark": "madden26-4.jpg", "fix": "Planted outside-foot cuts with torso lean; add secure-and-tuck after the reach instead of holding the arm up."},
    {"id": "G-assignment-clarity", "category": "readability", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["high/desktop/R05", "medium/mobile/R04"], "benchmark": "axis-1.jpg; madden26-2.jpg", "fix": "Untangle the defensive blitz arrows; offensive pre-snap art is already clean on desktop."},
    {"id": "G-replay-focus", "category": "lighting", "expectedGain": 0.2, "severity": 2, "effort": "M", "workstream": "WS1", "evidence": ["high/desktop/R15", "high/desktop/R13"], "benchmark": "cfb26-4.jpg", "fix": "Widen the DoF focus band slightly; add some light on surrounding structures."},
    {"id": "G-school-crowd", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["crops/high/R01-crowd", "high/desktop/R20"], "benchmark": "cfb26-1.jpg; cfb26-2.jpg", "fix": "Bleacher aisles and rails, a recognizable band and student section, school-color clustering. Overlaps G-endzone-void-and-venue-dressing."},
    {"id": "G-rain-integration", "category": "lighting", "expectedGain": 0.3, "severity": 2, "effort": "M", "workstream": "WS5", "evidence": ["high/desktop/R18", "crops/high/R18-turf_26_67_40"], "benchmark": "legendbowl-1.jpg; cfb26-4.jpg", "fix": "Finer depth-scaled rain, localized splashes and varied wet roughness."}
  ]
}
```
