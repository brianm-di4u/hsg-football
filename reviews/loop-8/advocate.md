# Advocate rebuttal: loop 8 (High tier, desktop)

I opened every capture cited below. All paths are relative to `games/football/screenshots/review-loop-8/`.

The critics are mostly right, and I concede most of their defects: contact beats, bulb seats, the High bloom veil, banner overlaps, no band, and the R01 crowd sliver. Where I push back, it is on these:
- **Overstated facts:** crowd poses, the officials' faces, portrait figure size, and the landscape panel.
- **Evidence they missed:** a press box and field house, a context-aware day theme, jump celebrations, and the ball visible in two close-ups.
- **Severity:** a few gaps are double-counted across the two critics or blame the capture rig rather than the game.

Critic means: art 6.0, lighting 6.5, animation 5.25, ui 6.5, typography 6.75, readability 6.5, mobile 6.5, authenticity 6.0.

## Art (A 6.0, B 6.0; proposed 6.5)

**Conceded.**
- **Lineman seats.** They are still bulbs wider than the hips: #69 in `crops/high/R04-slot_C`, and #73, #66 and #56 in `crops/high/R06-slot_C`.
- **Arms.** Lakeside's arms are solid royal blue to the fingertips (#57 in `crops/high/R04-slot_C`), and the pale arms in `crops/high/R06-slot_C-side` read as tubes.
- **Trees.** They are untextured black cones (`crops/high/R06-slot_C`, `crops/high/R13-carrier`, `high/desktop/R15`).
- **Officials' sleeves.** The striped sleeve blocks read as separate pieces, and the seat is bulbous (`crops/high/R03-slot_QB`).

**Rebutted or overstated.**
- **"Identical raised-arm poses" (A) is plainly wrong.** `crops/high/R01-crowd` shows both arms up, one arm up, arms folded and arms at the sides, across orange, white and black shirts. B's "narrow range" is fair. A's "identical" is not.
- **"Faceless black head" (A) is the wrong cause.** `crops/high/R03-slot_QB` is a rear view of the official, so it shows the back of his head under the cap. Front views show a skin-toned head under a white cap (`crops/high/R12-carrier`, `crops/high/R04-turf_26_67_42`, `crops/high/R06-slot_C`). No facial features are distinct at that size. "Primitive" is fair; "faceless black head" is not.
- **The R03 close-up being blocked by the ref** is a capture-camera problem, not an asset defect.
- **The venue has more built objects than A credits.**
  - `crops/high/R03-slot_QB` shows a field house with lit windows and a gold trim band behind the far sideline.
  - `crops/high/R06-slot_C-side` shows a full home stand with a box on top.
  - `crops/high/R07-slot_QB` shows tiered seating with a back wall.
- **Against the rubric's 7 anchor:**
  - **Met:** a glossy helmet against a matte jersey (`crops/high/R04-slot_C`, `crops/high/R14-carrier`), turf texture at field level (`crops/high/R04-turf_26_67_42`), and a crowd that reads as people (both critics concede this).
  - **Not met:** body proportions, and part of the venue.

That is closer to 6.5 than 6.0. **Proposed: 6.5** (mean 6.0 + 0.5).

## Lighting & atmosphere (A 6.5, B 6.5; proposed 6.5)

**Conceded.**
- **Lamp heads.** On High they become blobs, while Medium keeps the lamp racks (`high/desktop/R04` vs `medium/desktop/R04`).
- **Milky veil.** It washes the top corners in all 8 frames of `strips/high/R07`, in `high/desktop/R07`, and in frames 1–3 of `strips/high/R09`.
- **Rain.** It shows one specular hotspot rather than a general wet sheen (`crops/high/R18-turf_26_67_40`).

**Partly rebutted.**
- **"Flat khaki apron, then black" (A).** In `high/desktop/R01` the apron under the left tower is a brighter tan near the stand and darkens toward the right end, so there is some falloff. It is true that `high/desktop/R02` and `high/desktop/R17` read mostly flat.
- **Rubric 7 items the build meets:**
  - Several soft shadows under each player (`crops/high/R08-ball`, `crops/high/R04-turf_26_67_42`, `crops/high/R07-slot_QB`).
  - Bloom on the lamps.
  - A believable night exposure.
  - Rim light on helmets (`crops/high/R06-slot_DL2-side`).

The veil and the weak falloff hold it under 7. **Proposed: 6.5.**

## Animation & game feel (A 5.5, B 5.0; proposed 5.5)

**Conceded.**
- **Tackles.** No legible contact beat in `strips/high/R13`, and `crops/high/R13-carrier` shows no wrap.
- **Catch.** `strips/high/R09` jumps from an upright receiver in frame 5 to prone bodies in frame 6.
- **Overlaps.** The downed bodies overlap in `crops/high/R12-carrier`, and the legs cross in `crops/high/R09-slot_Z`.
- **Pile.** `strips/high/R10` frames 5→6 reach the ground pile abruptly.

**Feel touches B doesn't credit.** The rubric's 7 anchor lists camera punch-ins and particles as feel touches.
- **Catch punch-in.** `strips/high/R09` frame 4 is a clear camera punch-in on the catch, with a "+7 YD" toast in frames 6–8.
- **Celebration.** `crops/high/R14-carrier` shows players airborne in a jump celebration (#9, #88 and #12 have their feet off the turf) and arms raised, and #12 holds a visible ball. `high/desktop/R14` shows the same group.
- **QB.** The wind-up pose is good (`crops/high/R07-slot_QB`).
- **Stances.** They plant the feet and hinge through the pelvis (`crops/high/R06-slot_DL2-side`).

**Capture limitation, not a game defect.** A's "carrier slides laterally" in `strips/high/R11` can't be confirmed either way at strip scale, because the carrier is about 20 px tall. `crops/high/R11-carrier` shows a mid-stride frame with one foot planted and a slight forward lean, which is not a slide.

The contact defects stand, but B's 5.0 ignores the feel touches. **Proposed: 5.5** (mean 5.25 + 0.25).

## UI / HUD (A 6.5, B 6.5; proposed 6.5)

**Conceded.**
- **Banner overlaps.** In landscape the result banners cover the 3D scoreboard (`high/landscape/R12`, `high/landscape/R21`). On desktop the TOUCHDOWN banner sits over the uprights and the board is cut off at the top edge (`high/desktop/R14`).
- **Desktop live panel.** It is about 400 px of empty navy during live play (`high/desktop/R07`, `high/desktop/R08`).
- **Defense.** There is no on-field defender ID (`high/desktop/R05`).

**Missed by both critics.**
- **Context-aware theme.** The UI switches to a light cream panel with a rust HIKE button in the day game (`high/desktop/R19` vs `high/desktop/R04`). Context-aware graphics are a rubric 9 trait.
- **Desktop banners don't overlap.** On desktop the result banners sit at the bottom and clear the board (`high/desktop/R12`, `high/desktop/R21`).

**A's R21 "FIRST DOWN" flag.** The contradiction is real on screen:
- `high/desktop/R21` and `high/landscape/R21` show "+7 YD · FIRST DOWN" and 1st & 10 at the own 37, after a 7-yard dive from the own 30.
- The toast, the HUD and the 3D board all agree with each other.
- `high/desktop/R12` and `high/desktop/R13` show correct down logic: 2nd & 5 after a 5-yard run.

This looks like a capture-staging state. It should be checked, but it says nothing about visual quality. **Proposed: 6.5.**

## Typography (A 6.5, B 7.0; proposed 7.0)

**A's "casing drift" is a consistent heading style, not drift.** Every panel heading is set in all caps: "KICKOFF" (`high/desktop/R01`), "HOLLOW CURLS" (`high/desktop/R04`), "YOUR BALL: 1ST & 10 AT THE OWN 30" (`high/desktop/R22`) and "NEXT: 1ST & 10 · OWN 37" (`high/desktop/R21`). The scorebug centre line is always in sentence case. That is two type roles, not two casings of one role.

**The rubric 7 items are met.**
- **One type pair:** a condensed display face for the scorebug, banners and play names, with a sans for descriptions (`high/desktop/R22`, `high/mobile/R22`).
- **Numerals that read at a glance:** `high/desktop/R21`, and the 3D board in `crops/high/R01-board`.
- **Nothing clipped.** The fade on play 0 in `high/desktop/R22` is a scroll fade on a list item, not clipped type.

**Conceded.** The log and description text is small mid-grey on navy (`high/desktop/R12`). **Proposed: 7.0** (mean 6.75 + 0.25).

## Readability (A 6.5, B 6.5; proposed 6.5)

**Conceded.**
- **Ball close-up.** `crops/high/R08-ball` doesn't show the ball, and the R10 and R11 carrier close-ups show no ball in the hands (`crops/high/R10-carrier`, `crops/high/R11-carrier`).
- **Receiver tags.** They vanish after the snap (`high/desktop/R08`).
- **Landscape plate.** In `high/landscape/R10` the carrier plate covers the players above it (B).

**Rebutted.**
- **The ball does read in game frames.** It is a visible dark ellipse with a target ring at the receiver (`high/desktop/R08`; `high/mobile/R08`, where the ball and its shadow sit mid-field).
- **The ball does appear in close-ups.** It is visible in `crops/high/R12-carrier` (on the pile) and `crops/high/R14-carrier` (in #12's hand).
- **The R08 close-up miss is the rig.** A close-up camera that misses the ball is a capture-rig aim problem, not something a player sees.

**Proposed: 6.5.**

## Mobile (A 6.5, B 6.5; proposed 6.5)

**Conceded.**
- **Landscape banners** cover the board (`high/landscape/R12`, `high/landscape/R21`).
- **The TD shot** clips the board at the right edge (`high/mobile/R14`).
- **Portrait passing** leaves a lot of upfield depth (`high/mobile/R08`).

**Rebutted.**
- **"Portrait players about 15 CSS px tall" (A) is wrong.** In `high/mobile/R04` (2× capture) linemen are about 50 device px tall, which is about 25 CSS px, and the jersey numbers 74, 41, 44 and 12 are legible. In `high/mobile/R08` they are about 22 CSS px.
- **"Landscape side panel mostly empty during live play" (A) is wrong for landscape.** In `high/landscape/R10` the play diagram and a thumb-sized JUKE button fill about three quarters of the panel height. The criticism is true for desktop only.
- **The empty depth in `high/mobile/R08` contains the target.** The ring receiver at the 40 sits in that upper half, so the depth is the pass's destination, not dead space.
- **Performance.** The brief names Medium as the phone tier. It holds a 109 fps minimum and an 18.2 ms p95 at 4× throttle, which meets the 30 fps bar.

The overlaps hold the score under 7. **Proposed: 6.5.**

## Authenticity (A 6.0, B 6.0; proposed 6.0)

**Conceded.**
- No band, student section or cheer squad in any capture.
- The crowd is a sliver at the left edge in `high/desktop/R01`.
- The FG unit reads as one row (`high/desktop/R16`).

**Partly rebutted.**
- **Press box (A).** It exists: the box atop the home stand in `crops/high/R06-slot_C-side`, plus the field house with lit windows in `crops/high/R03-slot_QB`.
- **Small visitor stand.** The populated two-section visitor bleacher in `high/desktop/R13` is right for an Arkansas 3A–6A visitor side, and the rubric asks for venue scale that is right for that level. The grey wall behind it is the real defect.
- **Punt (`high/desktop/R17`).** The capture is mid-flight, so the kicking team has already released into coverage lanes. A spread line at that moment is plausible, though the frame does read like a kickoff.
- **School identity.** It is strong: TROJANS and WOLVES end zones, a HSHS/LHHS board with DOWN, TO GO and BALL ON (`crops/high/R01-board`), and the Jessieville purple venue (`high/desktop/R20`).

**Proposed: 6.0.**

## Facts the critics got plainly wrong
1. **A, crowd:** "identical raised-arm poses" (`crops/high/R01-crowd` shows at least four poses).
2. **A, officials:** "faceless black head". `crops/high/R03-slot_QB` is a rear view, and front views show a skin-toned head with a cap (`crops/high/R12-carrier`, `crops/high/R04-turf_26_67_42`).
3. **A, portrait size:** "about 15 CSS px tall". They measure about 22–25 CSS px (`high/mobile/R04`, `high/mobile/R08`).
4. **A, landscape panel:** "mostly empty during live play". It is full in `high/landscape/R10`.
5. **A, press box:** the venue fix asks for a home press box as if absent. One is visible in `crops/high/R06-slot_C-side`.

## Gap adjustments
- **Duplicates.** Several gaps cover the same defect in both critics' lists. The judge shouldn't stack their gains:
  - G-contact-beats and G-contact.
  - G-body-silhouette, G-official-model and G-anatomy.
  - G-rain-wetness and G-wet-turf.
  - G-field-to-stand-falloff, G-high-bloom-veil and G-light-depth.
  - G-band-student-section and G-venue-life.
- **G-anatomy** is cut to severity 4 and +0.5. The gear and material half of the art 7 anchor is already met, so anatomy alone can't be worth a full point.
- **G-venue-backdrop** is cut to severity 3 and +0.6, because the press box and field house already exist.
- **G-ball-visibility** is cut to severity 3 and +0.3. The ball reads in game frames, and part of the defect is close-up camera aim.
- **G-framing** is cut to severity 3 and +0.3. Pre-snap desktop identification is good, and the portrait badges solve off-screen receivers.
- **G-type-casing** is cut to severity 1 and +0.1. It is a consistent heading style.
- **Other cuts:**
  - G-field-to-stand-falloff: severity 2 and +0.2.
  - G-wet-turf: severity 2 and +0.3.
  - G-light-depth: +0.3.
  - G-special-teams-staging: +0.1.
- **Everything else stands as the critics filed it.**

```json
{
  "loop": 8,
  "role": "advocate",
  "tier": "high",
  "scores": {
    "art": { "score": 6.5, "confidence": 0.6, "evidence": [
      { "shot": "crops/high/R04-slot_C", "note": "glossy helmet vs matte jersey, facemask, stripes read (7-anchor items met); seat bulb and solid-blue arms conceded" },
      { "shot": "crops/high/R01-crowd", "note": "crowd reads as people with at least four distinct poses and varied shirts, not identical" },
      { "shot": "crops/high/R03-slot_QB", "note": "rear view of official (not faceless); field house with lit windows behind far sideline" },
      { "shot": "crops/high/R06-slot_C-side", "note": "full home stand with press box on top; rim light on helmets" },
      { "shot": "crops/high/R04-turf_26_67_42", "note": "turf texture at field level; officials seen from front have skin-toned heads under caps" },
      { "shot": "crops/high/R06-slot_C", "note": "conceded: untextured cone trees, bulb seats in stance" }
    ]},
    "lighting": { "score": 6.5, "confidence": 0.7, "evidence": [
      { "shot": "crops/high/R08-ball", "note": "several soft shadows per player from multiple towers" },
      { "shot": "high/desktop/R01", "note": "lamp bloom; apron brighter near the stand, darker toward the far end (some falloff)" },
      { "shot": "high/desktop/R04", "note": "conceded: High lamp heads are blobs (racks visible on medium/desktop/R04)" },
      { "shot": "strips/high/R07", "note": "conceded: milky corner veil in all 8 frames" },
      { "shot": "crops/high/R18-turf_26_67_40", "note": "conceded: single wet hotspot, no general sheen" }
    ]},
    "animation": { "score": 5.5, "confidence": 0.65, "evidence": [
      { "shot": "strips/high/R09", "note": "camera punch-in at frame 4 and toast (feel touch); frame 5 to 6 collapse abrupt (conceded)" },
      { "shot": "crops/high/R14-carrier", "note": "airborne jump celebration, arms raised, ball visible in #12's hand" },
      { "shot": "crops/high/R07-slot_QB", "note": "legible wind-up: ball cocked, off arm out" },
      { "shot": "strips/high/R13", "note": "conceded: no legible tackle contact beat" },
      { "shot": "crops/high/R12-carrier", "note": "conceded: overlapping downed bodies" },
      { "shot": "crops/high/R11-carrier", "note": "mid-stride, one foot planted, slight lean; not a lateral slide" }
    ]},
    "ui": { "score": 6.5, "confidence": 0.75, "evidence": [
      { "shot": "high/desktop/R04", "note": "scorebug, numbered and shaped receiver icons, route art (axis-1 class)" },
      { "shot": "high/desktop/R19", "note": "context-aware day theme: cream panel and rust HIKE button, missed by both critics" },
      { "shot": "high/desktop/R12", "note": "desktop result banner at bottom, clears the 3D board" },
      { "shot": "high/landscape/R21", "note": "conceded: landscape banner covers the 3D scoreboard" },
      { "shot": "high/desktop/R08", "note": "conceded: about 400 px of empty panel during live play" }
    ]},
    "typography": { "score": 7.0, "confidence": 0.65, "evidence": [
      { "shot": "high/desktop/R22", "note": "condensed display plus sans pair, consistent all-caps panel headings, clear scale" },
      { "shot": "high/desktop/R21", "note": "clear banner hierarchy; HUD sentence case vs panel all caps are two roles, not drift" },
      { "shot": "crops/high/R01-board", "note": "board numerals and labels read cleanly" },
      { "shot": "high/mobile/R22", "note": "type system holds at phone size, nothing clipped" }
    ]},
    "readability": { "score": 6.5, "confidence": 0.7, "evidence": [
      { "shot": "high/desktop/R08", "note": "ball visible as dark ellipse with target ring; tags vanish after snap (conceded)" },
      { "shot": "high/mobile/R10", "note": "carrier ring and under-feet plate read; defenders ahead visible" },
      { "shot": "crops/high/R12-carrier", "note": "ball visible on the pile (contradicts 'ball never shown')" },
      { "shot": "high/landscape/R10", "note": "conceded: carrier plate covers nearby players" }
    ]},
    "mobile": { "score": 6.5, "confidence": 0.7, "evidence": [
      { "shot": "high/mobile/R04", "note": "badges stack with chevrons; figures about 25 CSS px, numbers legible (not 15 px)" },
      { "shot": "high/landscape/R10", "note": "landscape panel filled by the diagram and a thumb-sized JUKE, not empty" },
      { "shot": "high/mobile/R08", "note": "upfield depth contains the ring receiver and the ball" },
      { "shot": "high/mobile/R14", "note": "conceded: 3D board clipped at right edge" },
      { "shot": "high/landscape/R12", "note": "conceded: banner covers the scoreboard" }
    ]},
    "authenticity": { "score": 6.0, "confidence": 0.75, "evidence": [
      { "shot": "crops/high/R01-board", "note": "HSHS/LHHS high-school board with DOWN/TO GO/BALL ON" },
      { "shot": "crops/high/R06-slot_C-side", "note": "press box atop home stand exists" },
      { "shot": "high/desktop/R13", "note": "small populated visitor bleacher is HS-appropriate; grey wall behind is the real defect" },
      { "shot": "high/desktop/R01", "note": "conceded: home crowd is a left-edge sliver; no band or student section" },
      { "shot": "high/desktop/R20", "note": "Jessieville purple venue with stands on both sides" }
    ]}
  },
  "gaps": [
    { "id": "G-contact-beats", "category": "animation", "expectedGain": 1.0, "severity": 5, "effort": "L", "workstream": "WS4b", "evidence": ["strips/high/R13", "strips/high/R09", "crops/high/R12-carrier", "crops/high/R09-slot_Z"], "benchmark": "cfb26-4", "fix": "Paired tackle contact poses, hit-stop plus short slow motion at contact, capsule separation so downed bodies stack, replay framed on the contact point. Same defect as G-contact; do not stack gains." },
    { "id": "G-contact", "category": "animation", "expectedGain": 1.0, "severity": 5, "effort": "L", "workstream": "WS4b", "evidence": ["strips/high/R09", "strips/high/R10", "crops/high/R12-carrier"], "benchmark": "cfb26-4", "fix": "Sustained wrap, loss of balance and momentum-directed descent; body separation; ball attached through impact. Duplicate of G-contact-beats." },
    { "id": "G-anatomy", "category": "art", "expectedGain": 0.5, "severity": 4, "effort": "L", "workstream": "WS3", "evidence": ["crops/high/R06-slot_C-side", "crops/high/R03-slot_QB", "crops/high/R04-slot_C"], "benchmark": "axis-3", "fix": "Rework shoulder, torso, pelvis and thigh transitions and join official limbs. Cut from +1.0/sev 5: the gear and material half of the art 7 anchor is already met; overlaps G-body-silhouette and G-official-model." },
    { "id": "G-venue-backdrop", "category": "authenticity", "expectedGain": 0.6, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["high/desktop/R01", "high/desktop/R13", "high/desktop/R15", "crops/high/R06-slot_C"], "benchmark": "axis-3", "fix": "Replace the grey wall planes behind the end zones and visitor side with a fence, field house and textured, lamp-rimmed tree cards. Cut: a press box (crops/high/R06-slot_C-side) and field house (crops/high/R03-slot_QB) already exist, and a small visitor stand is HS-authentic." },
    { "id": "G-band-student-section", "category": "authenticity", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["high/desktop/R01", "crops/high/R01-crowd", "high/desktop/R14"], "benchmark": "cfb26-2", "fix": "Uniformed band block, student section and cheerleaders, shown in the R01 and TD shots. Conceded in full; overlaps G-venue-life." },
    { "id": "G-venue-life", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["high/desktop/R20", "high/desktop/R15", "crops/high/R01-crowd"], "benchmark": "cfb26-1", "fix": "Band and student groups, varied spectator silhouettes, sideline dressing. Shares its gain with G-band-student-section." },
    { "id": "G-ball-visibility", "category": "readability", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS4", "evidence": ["crops/high/R10-carrier", "crops/high/R11-carrier", "crops/high/R08-ball", "high/desktop/R08"], "benchmark": "retrobowl-2", "fix": "Tuck the ball to the outside arm, light stripe on the ball, faint flight trail. Cut: the ball reads in high/desktop/R08 and high/mobile/R08 and shows in crops/high/R12-carrier and R14-carrier; the R08 close-up miss is rig aim." },
    { "id": "G-banner-overlap", "category": "ui", "expectedGain": 0.6, "severity": 3, "effort": "S", "workstream": "WS7", "evidence": ["high/landscape/R12", "high/landscape/R14", "high/landscape/R21", "high/desktop/R14", "high/mobile/R14"], "benchmark": "madden26-3", "fix": "Anchor landscape banners at the bottom; frame the TD camera so the board is fully in or out. Conceded; split 0.3 ui, 0.3 mobile." },
    { "id": "G-official-model", "category": "art", "expectedGain": 0.3, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["crops/high/R03-slot_QB", "high/desktop/R14"], "benchmark": "axis-3", "fix": "Officials on the player body with attached sleeves and facial features. 'Faceless' is overstated: R03 is a rear view; front views show a skin-toned head and cap." },
    { "id": "G-body-silhouette", "category": "art", "expectedGain": 0.3, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["crops/high/R04-slot_C", "crops/high/R06-slot_C", "crops/high/R06-slot_DL2-side"], "benchmark": "axis-3", "fix": "Seat no wider than the hips in stance, short sleeves with skin forearms and gloves, varied builds. Conceded; overlaps G-anatomy." },
    { "id": "G-framing", "category": "readability", "expectedGain": 0.3, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["high/desktop/R04", "high/landscape/R04", "high/mobile/R08"], "benchmark": "axis-1", "fix": "Collapse the live diagram and tighten formation framing. Cut: pre-snap identification is axis-1 class (high/desktop/R04), and portrait badges cover off-screen receivers (high/mobile/R04)." },
    { "id": "G-locomotion", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS4", "evidence": ["strips/high/R11", "crops/high/R11-carrier", "strips/high/R07"], "benchmark": "madden26-4", "fix": "Planted cut steps, pelvis lowering, directional lean, throw weight transfer. Severity cut: crops/high/R11-carrier shows a planted foot and slight lean, and the strips are too distant to show a slide." },
    { "id": "G-high-bloom-veil", "category": "lighting", "expectedGain": 0.3, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["high/desktop/R04", "medium/desktop/R04", "strips/high/R07", "high/desktop/R07"], "benchmark": "cfb26-3", "fix": "Clamp lamp emissive so racks survive on High, narrow the bloom radius, stop the corner veil from off-screen lamps. Conceded." },
    { "id": "G-light-depth", "category": "lighting", "expectedGain": 0.3, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["high/desktop/R01", "high/desktop/R04"], "benchmark": "cfb26-3", "fix": "Spill by surface and distance, softer illumination boundaries, scattering localized to the lamps. Gain cut: overlaps G-high-bloom-veil and G-field-to-stand-falloff." },
    { "id": "G-field-to-stand-falloff", "category": "lighting", "expectedGain": 0.2, "severity": 2, "effort": "M", "workstream": "WS1", "evidence": ["high/desktop/R02", "high/desktop/R17", "high/desktop/R13"], "benchmark": "axis-3", "fix": "Pools under each tower, radial apron falloff, spill on the front crowd rows. Cut: high/desktop/R01 already shows the apron brighter near the stand and darker toward the far end." },
    { "id": "G-rain-wetness", "category": "lighting", "expectedGain": 0.3, "severity": 2, "effort": "M", "workstream": "WS5", "evidence": ["crops/high/R18-turf_26_67_40", "high/desktop/R18"], "benchmark": "legendbowl-1", "fix": "Darker, lower-roughness turf in rain, lamp streaks, wet helmet speculars, splashes. Same defect as G-wet-turf." },
    { "id": "G-wet-turf", "category": "lighting", "expectedGain": 0.3, "severity": 2, "effort": "M", "workstream": "WS5", "evidence": ["crops/high/R18-turf_26_67_40", "high/desktop/R18"], "benchmark": "cfb26-4", "fix": "Multi-scale wet roughness, break up the hotspot. Cut: rain is 1 of 22 moments; duplicate of G-rain-wetness." },
    { "id": "G-live-panel-dead-space", "category": "ui", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R08", "high/desktop/R10"], "benchmark": "axis-3", "fix": "Collapse the desktop side panel after the snap. Desktop only: high/landscape/R10's panel is filled by the diagram and JUKE." },
    { "id": "G-r01-crowd-framing", "category": "authenticity", "expectedGain": 0.2, "severity": 2, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R01", "crops/high/R01-crowd"], "benchmark": "cfb26-1", "fix": "Turn or widen the kickoff establishing camera so the home grandstand fills the left third. Conceded." },
    { "id": "G-special-teams-staging", "category": "authenticity", "expectedGain": 0.1, "severity": 2, "effort": "M", "workstream": "WS4", "evidence": ["high/desktop/R17", "high/desktop/R16"], "benchmark": "retrobowl-3", "fix": "FG defenders set off the ball so a neutral zone reads; a punt formation pre-kick. Gain cut: the R17 frame is mid-flight with coverage already released into lanes." },
    { "id": "G-type-casing", "category": "typography", "expectedGain": 0.1, "severity": 1, "effort": "S", "workstream": "WS7", "evidence": ["high/desktop/R21", "high/mobile/R21"], "benchmark": "madden26-3", "fix": "Optionally unify down and distance casing; lift log text contrast. Cut: panel headings are consistently all caps, a deliberate heading role, not drift." },
    { "id": "G-low-mirrored-numbers", "category": "art", "expectedGain": 0.0, "severity": 1, "effort": "S", "workstream": "WS3", "evidence": ["crops/low/R04-slot_C"], "fix": "Fix the front-number UVs on the Low mesh. Low-tier regression only; no High score impact." }
  ],
  "verdict": "continue"
}
```
