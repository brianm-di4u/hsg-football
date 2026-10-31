Continue. Friday Night Spa City has a coherent, readable presentation package, but the football itself remains visibly below the supplied commercial and polished indie benchmarks. Glossy helmets, numbered uniforms, textured turf and local school identities establish a credible foundation. Close cameras expose swollen pants, angular jersey construction and disconnected official anatomy; motion strips expose repetitive blocking and abrupt transitions into grounded bodies. Portrait framing preserves formation width but spends too much space on empty field. UI and typography reach their gates; art, lighting, animation, readability and mobile do not. Authenticity clears its lower gate.

All capture paths below are relative to `games/football/screenshots/review-loop-6/`; benchmarks are in `games/football/benchmarks/`. Scores assess High desktop, with phone captures informing readability and mobile. Medium and Low observations are spot checks.

1. **Art — 5.5/10.** `crops/high/R04-slot_QB` and `crops/high/R06-slot_DL2-side` show readable helmets, stripes, numbers and cleats, with convincing helmet gloss relative to jerseys. However, exaggerated seat volumes dominate the silhouettes, and angular shoulder/back panels look assembled rather than clothed. `crops/high/R03-slot_QB` exposes an official with separated shoulder and elbow forms. `crops/high/R01-crowd` reads as people, but repeats primitive bodies and clothing. This exceeds the palette-only 5 anchor in equipment and materials, yet falls substantially below the anatomical and garment coherence of `axis-3.jpg`. It also lacks the deliberate consistency that makes `legendbowl-1.jpg` successful despite much simpler assets.

2. **Lighting & atmosphere — 6.5/10.** `high/desktop/R04` has lamp bloom, field-to-surroundings falloff and directional player shadows; `crops/high/R18-turf_26_67_40` clearly shows wet specular response. These are meaningful strengths. Nevertheless, the night scene combines a saturated photographic-looking sky with flat, nearly featureless terrain and cone trees. The rain close-up produces a concentrated white hotspot, while `high/desktop/R19` makes foreground field markings glow excessively through the mist. Compared with `cfb26-3.jpg` and `cfb26-4.jpg`, illumination lacks the integrated exposure, material response and environmental depth needed for 7.

3. **Animation & game feel — 4.5/10.** `strips/high/R11` shows a readable lateral run, but the carrier remains comparatively upright and blocking pairs preserve almost identical crouched arrangements while the play advances. In `strips/high/R09`, frames 5–6 jump from upright engagement to prone bodies without a clearly represented wrap, balance loss and descent. `strips/high/R10` similarly ends in a compact pile while surrounding blockers retain their poses. `strips/high/R13` supplies approach and engagement, but does not establish a convincing completed tackle within its sampled interval. `crops/high/R12-carrier` reinforces the compressed, overlapping result. The weight distribution and purposeful contact visible in `cfb26-4.jpg` and `madden26-4.jpg` are absent; those benchmarks are stills, so they support pose/contact comparison, not claims about their animation quality. The supplied strips do not justify the 7 anchor’s planted contact and smooth transitions.

4. **UI / HUD — 7/10.** `high/desktop/R04` provides clear possession, clock, down, receiver identifiers, route art and a dominant HIKE action. `high/desktop/R21` gives the result a strong headline/subtitle hierarchy while retaining the next action. The package compares credibly with `axis-1.jpg`, although `madden26-3.jpg` uses space more economically. The persistent desktop side panel leaves substantial unused space during live play (`high/desktop/R10`). Also, the bottom play card in `high/desktop/R22` is technically present but its description fades into near invisibility. These limit polish without invalidating the functional 7.

5. **Typography — 7/10.** `high/desktop/R21` and `high/desktop/R04` demonstrate a consistent condensed display face, clear clock numerals and a sensible distinction between headings and explanatory text. The result subtitle is comfortably legible. Against `cfb26-1.jpg` and `madden26-3.jpg`, the hierarchy is competent but less compact and refined. `high/desktop/R22` weakens the claim that all ten cards fit cleanly: the last description is obscured by the fade. The steering hint in `high/desktop/R10` is also conspicuously dim. These are localized deficiencies rather than a generally broken type system.

6. **Readability — 6/10.** `high/desktop/R08` makes the enlarged airborne ball identifiable, and `high/desktop/R10` clearly marks the carrier with a ring and nameplate. The limitation is formation and target scale: `high/mobile/R04` presents tiny players beneath large route symbols, with outside players against the screen edges. `high/landscape/R04` also lets thick route graphics compete with bodies. The clean separation of player, target and route in `retrobowl-1.jpg`, and differentiated receiver identification in `legendbowl-2.jpg`, communicate the play more immediately. The “at a glance in every frame” requirement for 7 is unmet.

7. **Mobile — 6/10.** `high/mobile/R12` and `high/mobile/R21` successfully keep the pile/huddle above the result band and provide large CONTINUE controls. `high/landscape/R04` fits both pre-snap actions, and `high/landscape/R14` keeps the celebration visible beneath its banner. However, `high/mobile/R04` devotes much of the field view to unoccupied downfield space while shrinking the formation; `high/mobile/R08` retains similar spatial waste. The steering instruction falls below the visible capture edge in portrait live play. Compared with `retrobowl-1.jpg` and `retrobowl-2.jpg`, actionable football occupies too little of the available display. The brief’s supplied proxy figures clear 30 fps, including High’s reported minimum of 50 fps; performance does not resolve the framing deficit. Medium phone spot checks show the same layout problem.

8. **Authenticity — 6.5/10.** `high/desktop/R03` and `high/desktop/R20` establish distinct school colors, named end zones, modest bleachers, local surroundings and appropriately small stadium staging. `crops/high/R01-board` is a strong recognizable high-school scoreboard. Relative to the school identity and event staging in `cfb26-1.jpg` and `cfb26-2.jpg`, the environment still feels sparsely populated outside the playing surface: sideline figures form regular rows, buildings are minimally dressed, and band/student-section identity is not clearly communicated in these views. The college benchmarks are references for specificity and staging, not a demand for college stadium scale. This clears the authenticity gate of 6 but falls short of the fuller 7 anchor.

Ranked gaps follow. Expected gains are estimates in category points, not additive guarantees.

1. **G-player-silhouette — WS3 player models/materials.** The inflated seat, narrow lower legs and angular jersey/back construction are the largest persistent art defects (`crops/high/R04-slot_QB`, `crops/high/R06-slot_DL2-side`). Rebuild the pelvis-to-thigh transition, reduce seat protrusion, smooth shoulder/torso joins and establish restrained cloth folds with matte roughness. Repair official shoulder/elbow continuity at the same asset-quality standard. Benchmark: `axis-3.jpg`. **Expected gain: +1.0 art; severity 5; effort L.**

2. **G-tackle-transition — WS4b tackle physics.** Upright contact becomes a flattened result too abruptly (`strips/high/R09`, `strips/high/R10`, `crops/high/R12-carrier`). Add an explicit wrap and balance-loss phase, directional descent, body separation and a grounded settle; keep the ball attached to a credible carrying hand throughout. Benchmark: `cfb26-4.jpg` for contact anatomy. **Expected gain: +1.0 animation; severity 5; effort L.**

3. **G-contact-locomotion — WS4 animation.** Blocking pairs remain locked in repetitive crouches, and the sweep lacks convincing plant-and-cut weight transfer (`strips/high/R11`, `strips/high/R10`). Synchronize foot plants with movement, add opposing force and recovery to blocks, and blend torso lean and hip rotation into cuts. Benchmark: `madden26-4.jpg` for athletic pose and balance. **Expected gain: +1.0 animation; severity 5; effort L.**

4. **G-phone-framing — WS7 presentation/HUD/mobile.** Portrait pre-snap and pass views allocate excessive height to empty field while keeping players small (`high/mobile/R04`, `high/mobile/R08`). Fit the camera to the active formation and receiving area, with phase-specific distance and target framing; preserve outside-player margins and keep live instructions inside the visible layout. Benchmark: `retrobowl-1.jpg`. **Expected gain: +1.0 mobile, with readability benefit; severity 4; effort M.**

5. **G-exposure-integration — WS1 lighting/post.** Bloom and exposure do not integrate field, lights and surroundings convincingly (`high/desktop/R19`, `high/desktop/R04`). Reduce bloom on painted markings, retain lamp glow, and tune ambient fill and terrain response so the background has depth without becoming a flat gray band. Benchmark: `cfb26-3.jpg`. **Expected gain: +0.5 lighting; severity 3; effort M.**

6. **G-wet-surface — WS5 turf/weather.** The wet close-up contains a dominant white reflection and fine granular sparkle; the normal gameplay view communicates much less surface wetness (`crops/high/R18-turf_26_67_40`, `high/desktop/R18`). Broaden and soften lamp reflections, vary wetness at yard scale, and make puddle boundaries readable from the gameplay camera. Benchmark: `cfb26-4.jpg` for controlled night material highlights. **Expected gain: +0.5 lighting; severity 3; effort M.**

7. **G-venue-life — WS2 crowd.** Repeated spectator bodies and generic crowd distribution weaken the local-event impression (`crops/high/R01-crowd`, `high/desktop/R20`). Introduce a recognizable student section and band grouping, vary spectator silhouettes and poses, and organize those groups around venue-specific seating. Benchmark: `cfb26-1.jpg` and `cfb26-2.jpg`. **Expected gain: +0.5 authenticity; severity 3; effort M.**

8. **G-panel-fade — WS7 presentation/HUD/mobile.** The desktop play list fades away useful content, and live steering hints remain too dim (`high/desktop/R22`, `high/desktop/R10`). Fit the final card’s full text above the fade or give an explicit scroll affordance; raise hint contrast to match other secondary text. Benchmark: `axis-4.jpg`. **Expected gain: +0.5 typography; severity 2; effort S.**

```json
{
  "loop": 6,
  "role": "critic-codex",
  "tier": "high",
  "scores": {
    "art": {
      "score": 5.5,
      "confidence": 0.96,
      "evidence": [
        {"shot": "crops/high/R04-slot_QB", "note": "Readable gear and gloss, but inflated seat and angular jersey construction."},
        {"shot": "crops/high/R06-slot_DL2-side", "note": "Repeated swollen pelvis silhouettes and rigid torso transitions."},
        {"shot": "crops/high/R03-slot_QB", "note": "Official shoulder and elbow forms visibly lack anatomical continuity."}
      ]
    },
    "lighting": {
      "score": 6.5,
      "confidence": 0.92,
      "evidence": [
        {"shot": "high/desktop/R04", "note": "Lamp bloom, shadows and falloff, but flat environmental integration."},
        {"shot": "crops/high/R18-turf_26_67_40", "note": "Visible wet response with an excessively concentrated white reflection."},
        {"shot": "high/desktop/R19", "note": "Mist and depth present; foreground markings bloom excessively."}
      ]
    },
    "animation": {
      "score": 4.5,
      "confidence": 0.87,
      "evidence": [
        {"shot": "strips/high/R09", "note": "Upright engagement transitions abruptly to grounded bodies between samples 5 and 6."},
        {"shot": "strips/high/R10", "note": "Repetitive blocking arrangements persist around an abrupt pile result."},
        {"shot": "strips/high/R11", "note": "Lateral travel reads, but plant, lean and blocking weight transfer are weak."},
        {"shot": "crops/high/R12-carrier", "note": "Compressed overlapping tackle result."}
      ]
    },
    "ui": {
      "score": 7,
      "confidence": 0.94,
      "evidence": [
        {"shot": "high/desktop/R04", "note": "Clear scorebug, receiver identifiers and dominant pre-snap action."},
        {"shot": "high/desktop/R21", "note": "Strong result hierarchy and clear next action."},
        {"shot": "high/desktop/R22", "note": "Final card description is obscured by the bottom fade."}
      ]
    },
    "typography": {
      "score": 7,
      "confidence": 0.94,
      "evidence": [
        {"shot": "high/desktop/R21", "note": "Consistent condensed display treatment and readable result subtitle."},
        {"shot": "high/desktop/R04", "note": "Clear clock numerals and heading/body hierarchy."},
        {"shot": "high/desktop/R10", "note": "Steering hint is much dimmer than other secondary text."}
      ]
    },
    "readability": {
      "score": 6,
      "confidence": 0.93,
      "evidence": [
        {"shot": "high/desktop/R08", "note": "Airborne ball is identifiable."},
        {"shot": "high/desktop/R10", "note": "Carrier ring and nameplate communicate possession."},
        {"shot": "high/mobile/R04", "note": "Tiny formation competes with large route symbols and edge placement."},
        {"shot": "high/landscape/R04", "note": "Heavy route graphics compete with player silhouettes."}
      ]
    },
    "mobile": {
      "score": 6,
      "confidence": 0.92,
      "evidence": [
        {"shot": "high/mobile/R04", "note": "Large amount of empty downfield space leaves the formation small."},
        {"shot": "high/mobile/R08", "note": "Pass framing retains excessive empty field; steering hint extends below capture."},
        {"shot": "high/mobile/R12", "note": "Pile remains above docked result band with large controls."},
        {"shot": "high/landscape/R14", "note": "Celebration remains visible beneath the reduced banner."}
      ]
    },
    "authenticity": {
      "score": 6.5,
      "confidence": 0.88,
      "evidence": [
        {"shot": "high/desktop/R03", "note": "School colors, named end zones and modest venue staging."},
        {"shot": "high/desktop/R20", "note": "Distinct Jessieville identity, but sparse generic surroundings."},
        {"shot": "crops/high/R01-board", "note": "Recognizable high-school scoreboard treatment."}
      ]
    }
  },
  "gaps": [
    {
      "id": "G-player-silhouette",
      "category": "art",
      "expectedGain": 1,
      "severity": 5,
      "effort": "L",
      "workstream": "WS3",
      "evidence": ["crops/high/R04-slot_QB", "crops/high/R06-slot_DL2-side", "crops/high/R03-slot_QB"],
      "benchmark": "axis-3.jpg",
      "fix": "Rebuild pelvis-to-thigh proportions, reduce seat protrusion, smooth jersey and shoulder transitions, improve matte cloth response, and repair official joint continuity."
    },
    {
      "id": "G-tackle-transition",
      "category": "animation",
      "expectedGain": 1,
      "severity": 5,
      "effort": "L",
      "workstream": "WS4b",
      "evidence": ["strips/high/R09", "strips/high/R10", "crops/high/R12-carrier"],
      "benchmark": "cfb26-4.jpg",
      "fix": "Add wrap, balance loss, directional descent, collision separation and grounded settling while preserving credible hand-to-ball attachment."
    },
    {
      "id": "G-contact-locomotion",
      "category": "animation",
      "expectedGain": 1,
      "severity": 5,
      "effort": "L",
      "workstream": "WS4",
      "evidence": ["strips/high/R11", "strips/high/R10"],
      "benchmark": "madden26-4.jpg",
      "fix": "Synchronize foot plants with movement, add force and recovery to blocks, and blend hip rotation and torso lean into cuts."
    },
    {
      "id": "G-phone-framing",
      "category": "mobile",
      "expectedGain": 1,
      "severity": 4,
      "effort": "M",
      "workstream": "WS7",
      "evidence": ["high/mobile/R04", "high/mobile/R08"],
      "benchmark": "retrobowl-1.jpg",
      "fix": "Fit phase-specific cameras to the active formation and receiving area, preserve outside-player margins, and keep live instructions within the visible layout."
    },
    {
      "id": "G-exposure-integration",
      "category": "lighting",
      "expectedGain": 0.5,
      "severity": 3,
      "effort": "M",
      "workstream": "WS1",
      "evidence": ["high/desktop/R19", "high/desktop/R04"],
      "benchmark": "cfb26-3.jpg",
      "fix": "Reduce bloom on painted markings and tune ambient fill, exposure and terrain response to integrate the field and surroundings."
    },
    {
      "id": "G-wet-surface",
      "category": "lighting",
      "expectedGain": 0.5,
      "severity": 3,
      "effort": "M",
      "workstream": "WS5",
      "evidence": ["crops/high/R18-turf_26_67_40", "high/desktop/R18"],
      "benchmark": "cfb26-4.jpg",
      "fix": "Broaden and soften wet reflections, vary wetness at yard scale, and make puddle boundaries visible from gameplay distance."
    },
    {
      "id": "G-venue-life",
      "category": "authenticity",
      "expectedGain": 0.5,
      "severity": 3,
      "effort": "M",
      "workstream": "WS2",
      "evidence": ["crops/high/R01-crowd", "high/desktop/R20"],
      "benchmark": "cfb26-1.jpg; cfb26-2.jpg",
      "fix": "Create recognizable student and band sections, vary spectator silhouettes and poses, and organize groups around venue-specific seating."
    },
    {
      "id": "G-panel-fade",
      "category": "typography",
      "expectedGain": 0.5,
      "severity": 2,
      "effort": "S",
      "workstream": "WS7",
      "evidence": ["high/desktop/R22", "high/desktop/R10"],
      "benchmark": "axis-4.jpg",
      "fix": "Keep the final card text above the fade or expose explicit scrolling, and raise live steering-hint contrast."
    }
  ],
  "verdict": "continue"
}
```
