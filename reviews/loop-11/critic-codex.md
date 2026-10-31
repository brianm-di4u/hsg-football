Friday Night Spa City should **continue**: its desktop HUD and typography reach the rubric's functional broadcast standard, but the football itself remains below it. Glossy helmets, readable uniforms, textured turf and stadium lighting provide a coherent foundation; inflated player anatomy, repetitive contact poses and sparse venue dressing still expose the procedural construction. Medium—the designated phone tier—comfortably meets the supplied 30 fps proxy requirement, but portrait framing sacrifices formation coverage and landscape spends too much space on secondary information. Art, lighting, animation, readability and mobile remain below their gates.

All capture paths below are relative to `games/football/screenshots/review-loop-11/`; benchmark filenames refer to `games/football/benchmarks/`.

1. **Art — 6/10.** `crops/high/R04-slot_QB` shows meaningful helmet/jersey material contrast, clear numbers, stripes and equipment. However, shoulders look inflated, hips and legs look molded, and cloth lacks convincing folds. `crops/high/R06-slot_C-side` exposes angular deformation around the bent torso and oversized, simplified facemask bars. `crops/high/R01-crowd` reads as people, but repeated rectangular bodies and raised-arm silhouettes dominate. Compared with `axis-3.jpg`, the players lack anatomical and uniform definition; compared with `legendbowl-1.jpg`, the simplification is less completely resolved into a deliberate visual style. Above the palette-only 5 anchor, below the close-up-ready 7.

2. **Lighting & atmosphere — 6.5/10.** `high/desktop/R01` has a convincing illuminated field, dark surroundings, lamp bloom and visible player shadows. `crops/high/R18-turf_26_67_40` confirms an actual wet highlight rather than rain particles alone. The remaining weakness is integration: the dramatic sky, broad featureless perimeter and uniformly exposed players feel like separate layers. `high/desktop/R15` adds heavy blur without making the replay subject particularly crisp. Against `cfb26-3.jpg` and `cfb26-4.jpg`, illumination has less spatial variation and less convincing material response. Night atmosphere is established, but the finish falls short of 7.

3. **Animation & game feel — 5/10.** `strips/high/R09` contains a readable receiving gesture and subsequent contact, supported by raised arms in `crops/high/R09-slot_Z`. `strips/high/R10` and `strips/high/R11` still show repeated crouching blocker silhouettes and upright running bodies with limited visible loading or directional weight transfer. In `strips/high/R13`, contact becomes a compact cluster; the sampled takedown does not communicate a strong wrap, drive and collapse sequence. `crops/high/R12-carrier` confirms grounded bodies, but their overlapping arrangement remains mechanically assembled. The contact relationships in `cfb26-4.jpg` and the runner's asymmetrical balance in `madden26-4.jpg` are substantially stronger. Those benchmarks are stills, so they support pose comparison only; timing judgments come from the supplied strips. The evidence fits the procedural-cycle 5 anchor.

4. **UI / HUD — 7/10.** `high/desktop/R04` provides clear possession, score, situation, receiver identification, route art and a dominant hike action. `high/desktop/R21` has an immediately readable result headline and a clear continuation action. `high/desktop/R22` makes plays distinguishable through diagrams and run/pass labels. Compared with `axis-1.jpg` and `madden26-3.jpg`, the information hierarchy is competent, although the large sidebar and repeated situation information consume excessive space. This clears the 7 anchor, without establishing premium broadcast polish.

5. **Typography — 7/10.** `high/desktop/R21` gives the result and player credit distinct scales, with strong contrast and readable numerals. `high/desktop/R22` consistently separates play titles, explanations and category labels. The condensed display face works with the football presentation, although tightly packed explanatory text and small diagram key numbers remain weaker than the major headings. Against `madden26-3.jpg` and `legendbowl-4.jpg`, the hierarchy is sufficiently deliberate for 7, but lacks their more distinctive graphic composition.

6. **Readability — 6/10.** `high/desktop/R08` makes the airborne ball and intended receiver identifiable through enlargement, a badge and a ground marker. `medium/mobile/R10` clearly labels the carrier. However, `medium/mobile/R04` puts outside receivers beyond the viewport and crowds the right edge with badges and route fragments; the badges preserve identity but cannot show coverage relationships. `medium/landscape/R08` retains a large diagram while the live formation occupies a relatively shallow band. `axis-1.jpg`, `legendbowl-2.jpg` and `retrobowl-1.jpg` communicate more of the relevant football geometry at once. Useful assistance is present, but the "at a glance in every frame" requirement is unmet.

7. **Mobile — 6/10, using Medium.** `medium/mobile/R04` has large primary buttons and readable situation text, but roughly 24 CSS px linemen and offscreen receivers limit comfortable inspection. `medium/mobile/R22` offers substantial play cards, while only six choices are visible and the continuation below the viewport is poorly signaled. `medium/landscape/R08` devotes nearly 30% of its width to a diagram and juke panel, reducing the short viewport's field space. Compared with `retrobowl-1.jpg` and `retrobowl-2.jpg`, the action receives less effective screen allocation. Performance passes: the brief reports **87 minimum fps and 18.7 ms worst p95 frame time for Medium mobile at 4× CPU throttle**, with 88 calls, 482k triangles and 40.3 MB heap. That is ample for the rubric's 30 fps proxy gate; it does not remove the framing shortcomings.

8. **Authenticity — 6.5/10.** `high/desktop/R01` supplies modest bleachers, a freestanding scoreboard, sideline teams, local identity and a wooded horizon. `high/desktop/R20` establishes a smaller Jessieville setting, while `high/desktop/R03` adds a school building behind the end zone. These choices communicate school football beyond generic team names. Nevertheless, broad empty perimeter surfaces and thin sideline dressing leave the venue feeling assembled rather than inhabited; a band or distinct student section is not clearly established in these views. Compared with the school identity and crowd staging of `cfb26-1.jpg` and the coherent venue presentation of `legendbowl-4.jpg`, local atmosphere remains incomplete. The authenticity gate of 6 passes.

Ranked gaps follow. Expected gains are category points, estimated independently and not additive.

1. **Contact lacks weight and causal structure — WS4b tackle physics.** Severity **5**, effort **L**, expected animation gain **+1.0**. `strips/high/R13` and `crops/high/R12-carrier` show clustered contact and overlapping grounded bodies. Build paired tackle sequences with visible shoulder engagement, hand placement, momentum transfer and distinct supported landing poses. Compare contact silhouettes with `cfb26-4.jpg`.

2. **Player anatomy and uniform surfaces fail close inspection — WS3 player models/materials.** Severity **4**, effort **L**, expected art gain **+1.0**. In `crops/high/R04-slot_QB` and `crops/high/R06-slot_C-side`, rounded pads and molded pants overwhelm anatomical structure. Refine shoulder-to-torso transitions, pelvis and knee deformation, facemask thickness, and restrained cloth folds. Target the readable equipment and body structure of `axis-3.jpg` before pursuing EA-level texture detail.

3. **Phone cameras waste space and omit relevant coverage — WS7 presentation/HUD/mobile.** Severity **4**, effort **M**, expected mobile gain **+1.0**. `medium/mobile/R04` clips outside receivers; `medium/landscape/R08` spends substantial width on a secondary diagram. Frame the formation and target corridor by play phase, compact the landscape panel during live action, and provide a small formation overview when portrait cannot include both sidelines. Use `retrobowl-1.jpg` as the screen-allocation comparison.

4. **Running and blocking share stiff, repetitive poses — WS4 animation.** Severity **4**, effort **L**, expected animation gain **+0.5**. `strips/high/R10` and `strips/high/R11` show recurring squat silhouettes and little visible cutting load. Add planted contact feet, staggered blocking bases, hip rotation, deceleration and an outside-foot plant before a cut. Compare balance and asymmetry with `madden26-4.jpg`.

5. **Venue surroundings look unfinished — WS2 crowd.** Severity **3**, effort **M**, expected authenticity gain **+0.5**. `crops/high/R01-crowd` repeats spectator construction, while `high/desktop/R20` exposes sparse surroundings. Vary spectator proportions and poses, establish a student/band section, and dress bleacher access and sidelines with school-scale equipment. Use `cfb26-1.jpg` for differentiated spectators and school identity.

6. **Wet-field and night lighting lack spatial nuance — WS1 lighting/post.** Severity **3**, effort **M**, expected lighting gain **+0.5**. `high/desktop/R01` and `crops/high/R18-turf_26_67_40` have the necessary effects, but broad exposure and concentrated wet glare remain synthetic. Tune overlapping light pools, shadow softness, background exposure and wet roughness variation; preserve a sharper replay subject in `high/desktop/R15`. Compare material separation with `cfb26-4.jpg`.

```json
{
  "loop": 11,
  "role": "critic-codex",
  "tier": "high",
  "scores": {
    "art": {"score": 6, "confidence": 0.95, "evidence": [
      {"shot": "crops/high/R04-slot_QB", "note": "Readable equipment and gloss contrast; inflated anatomy and molded cloth."},
      {"shot": "crops/high/R06-slot_C-side", "note": "Angular bent-torso deformation and simplified facemask."},
      {"shot": "crops/high/R01-crowd", "note": "Human silhouettes with conspicuous repeated construction."}
    ]},
    "lighting": {"score": 6.5, "confidence": 0.9, "evidence": [
      {"shot": "high/desktop/R01", "note": "Lamp bloom, shadows and field-to-surroundings contrast; weak perimeter integration."},
      {"shot": "crops/high/R18-turf_26_67_40", "note": "Visible wet specular response, but concentrated synthetic glare."}
    ]},
    "animation": {"score": 5, "confidence": 0.8, "evidence": [
      {"shot": "strips/high/R09", "note": "Readable receiving gesture and subsequent contact."},
      {"shot": "strips/high/R10", "note": "Repeated crouched blocker silhouettes and limited visible weight transfer."},
      {"shot": "strips/high/R13", "note": "Contact clusters without a strong readable wrap-drive-collapse sequence."},
      {"shot": "crops/high/R12-carrier", "note": "Grounded bodies remain mechanically overlapped."}
    ]},
    "ui": {"score": 7, "confidence": 0.95, "evidence": [
      {"shot": "high/desktop/R04", "note": "Clear situation, receiver identification and primary action."},
      {"shot": "high/desktop/R21", "note": "Strong result hierarchy and continuation action."},
      {"shot": "high/desktop/R22", "note": "Consistent play diagrams and run/pass classification."}
    ]},
    "typography": {"score": 7, "confidence": 0.95, "evidence": [
      {"shot": "high/desktop/R21", "note": "Distinct result headline and player-credit scales."},
      {"shot": "high/desktop/R22", "note": "Consistent title, explanation and category hierarchy."}
    ]},
    "readability": {"score": 6, "confidence": 0.95, "evidence": [
      {"shot": "high/desktop/R08", "note": "Airborne ball and receiver identifiable."},
      {"shot": "medium/mobile/R04", "note": "Outside receivers clipped; edge badges cannot communicate coverage geometry."},
      {"shot": "medium/landscape/R08", "note": "Large secondary panel reduces space for live action."}
    ]},
    "mobile": {"score": 6, "confidence": 0.95, "evidence": [
      {"shot": "medium/mobile/R04", "note": "Large controls, small linemen and offscreen outside receivers."},
      {"shot": "medium/mobile/R22", "note": "Readable cards; choices continue below the viewport with weak continuation cue."},
      {"shot": "medium/landscape/R08", "note": "Secondary panel occupies nearly 30 percent of width. Medium phone proxy passes at 87 minimum fps and 18.7 ms worst p95."}
    ]},
    "authenticity": {"score": 6.5, "confidence": 0.85, "evidence": [
      {"shot": "high/desktop/R01", "note": "Modest bleachers, scoreboard, sideline teams and wooded horizon establish school football."},
      {"shot": "high/desktop/R20", "note": "Smaller venue identity is visible, but perimeter dressing is sparse."},
      {"shot": "high/desktop/R03", "note": "School building adds venue specificity."}
    ]}
  },
  "gaps": [
    {"id": "G-contact-weight", "category": "animation", "expectedGain": 1, "severity": 5, "effort": "L", "workstream": "WS4b", "evidence": ["strips/high/R13", "crops/high/R12-carrier"], "benchmark": "cfb26-4.jpg", "fix": "Build paired tackle sequences with shoulder engagement, hand placement, momentum transfer and distinct supported landing poses."},
    {"id": "G-player-anatomy", "category": "art", "expectedGain": 1, "severity": 4, "effort": "L", "workstream": "WS3", "evidence": ["crops/high/R04-slot_QB", "crops/high/R06-slot_C-side"], "benchmark": "axis-3.jpg", "fix": "Refine shoulder, pelvis and knee structure and deformation; reduce facemask thickness and add restrained uniform folds."},
    {"id": "G-phone-framing", "category": "mobile", "expectedGain": 1, "severity": 4, "effort": "M", "workstream": "WS7", "evidence": ["medium/mobile/R04", "medium/landscape/R08"], "benchmark": "retrobowl-1.jpg", "fix": "Use phase-specific formation and target-corridor framing, compact the live landscape panel, and show a formation overview when portrait clips outside receivers."},
    {"id": "G-run-block-weight", "category": "animation", "expectedGain": 0.5, "severity": 4, "effort": "L", "workstream": "WS4", "evidence": ["strips/high/R10", "strips/high/R11"], "benchmark": "madden26-4.jpg", "fix": "Add planted contact feet, staggered blocking bases, hip rotation, deceleration and outside-foot loading before cuts."},
    {"id": "G-venue-life", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["crops/high/R01-crowd", "high/desktop/R20"], "benchmark": "cfb26-1.jpg", "fix": "Vary spectator proportions and poses, establish a student and band section, and dress bleacher access and sidelines with school-scale equipment."},
    {"id": "G-light-integration", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS1", "evidence": ["high/desktop/R01", "crops/high/R18-turf_26_67_40", "high/desktop/R15"], "benchmark": "cfb26-4.jpg", "fix": "Tune overlapping light pools, shadow softness, background exposure and wet roughness variation; preserve a sharper replay subject."}
  ],
  "verdict": "continue"
}
```
