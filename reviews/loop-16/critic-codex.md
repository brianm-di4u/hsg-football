Friday Night Spa City has a coherent HUD, readable team identities, and a convincing small-school scale, but its players and contact still look procedural. High desktop falls short of the art, lighting, animation, and readability gates. Medium—the designated phone tier—provides large controls and clear results, but portrait framing hides receivers and spends too much space on empty field. The supplied Medium/mobile performance figures show ample reported headroom; they do not establish real handset performance or clearly document the throttled result.

Paths below are relative to `games/football/screenshots/review-loop-16/`; benchmark filenames refer to `games/football/benchmarks/`.

- **Art: 5.5/10.** `crops/high/R04-slot_QB` shows recognizable equipment, helmet gloss, and clear uniform numbers, but inflated shoulders, pinched hips, and nearly identical bodies weaken the silhouettes. `crops/high/R06-slot_C-side` exposes angular arm deformation and simplified cloth. `crops/high/R01-crowd` reads as people, though repeated bodies and raised-arm poses dominate. Against `axis-3.jpg`, anatomy and fabric remain substantially less resolved; `cfb26-4.jpg` illustrates the larger material-detail gap.

- **Lighting: 6.5/10.** `high/desktop/R01` establishes night through lamp bloom, a dark wooded horizon, and field-to-surroundings contrast. `crops/high/R18-turf_26_67_40` supplies visible wet highlights. However, `high/desktop/R05` has a large washed-out flare covering the left field, while `high/desktop/R18` retains conspicuous pools of illumination and graphic rain streaks. Compared with `cfb26-3.jpg` and `cfb26-4.jpg`, lighting feels applied in patches rather than integrated across players, turf, and venue.

- **Animation: 4.5/10.** `strips/high/R11` communicates running, but torso orientation and limb cycles convey little planted weight during the cut. `strips/high/R09` moves rapidly from approach to possession/result without a strong gather-and-secure beat. `strips/high/R13` collapses the tackle into a compact cluster; `crops/high/R12-carrier` confirms intersecting bodies and awkwardly stacked equipment. These fall well short of the readable balance and contact relationships visible in `cfb26-4.jpg` and `madden26-4.jpg`. Those benchmarks are stills, so they support pose/contact comparison, not claims about temporal smoothness.

- **UI: 7/10.** `high/desktop/R21` cleanly separates result, next situation, and primary action. `high/desktop/R16` gives the kick meter a clear instruction without repeating it in the side panel. `high/desktop/R22` has consistent selection treatment and useful play descriptions, although tiny diagrams and the permanent sidebar reduce field space. It reaches the functional broadcast hierarchy of `axis-1.jpg`, but lacks the compact integration of `madden26-3.jpg`.

- **Typography: 7/10.** `high/desktop/R21` has a strong result/subtitle hierarchy; `high/desktop/R22` consistently distinguishes play names, descriptions, and run/pass labels. The condensed display face and supporting text form a coherent system. Small descriptions and compressed secondary information remain less effortless than the key numerals in `madden26-3.jpg`; the hierarchy is nevertheless comparable in consistency to `legendbowl-4.jpg`.

- **Readability: 6/10.** `high/desktop/R08` makes the ball and intended receiver easy to locate through exaggeration and markers, and `high/desktop/R10` clearly identifies the carrier. However, `high/desktop/R04` leaves the formation small beneath extensive distant field and sky. `medium/mobile/R04` clips wide receivers and route continuations; edge numbers preserve identification but cannot reveal coverage relationships. `axis-1.jpg` and `retrobowl-1.jpg` expose the formation more completely, while `legendbowl-2.jpg` separates live targets more clearly.

- **Mobile: 6/10, scored from Medium.** `medium/mobile/R10` provides an obvious carrier label and a generous Juke button. `medium/mobile/R21` presents the result and Continue action clearly. However, `medium/mobile/R04` crops the formation, and `medium/landscape/R04` retains a large sidebar while players remain small. `medium/mobile/R22` shows only six play cards in the captured viewport, without a visible indication of the remaining choices. Compared with `retrobowl-1.jpg` and `retrobowl-2.jpg`, field use is less economical. The brief reports **488 minimum fps, 2.5 ms worst p95, 88 calls, 493k triangles, and 33.2 MB heap for Medium/mobile**. That supports reported proxy headroom, but the table does not separately identify the 4× throttled measurement; confidence in the performance portion is therefore limited.

- **Authenticity: 6/10.** `high/desktop/R01` supplies modest bleachers, a standalone scoreboard, sideline teams, and wooded surroundings. `high/desktop/R20` establishes another school through colors and field branding, but surrounding construction and sideline staging remain sparse. `crops/high/R01-crowd` lacks a clearly differentiated student or band section. Relative to the organized school spectacle of `cfb26-2.jpg` and environmental dressing in `legendbowl-4.jpg`, local names currently carry more identity than venue detail.

Ranked gaps; expected gains are category-point estimates and are not additive:

1. **Tackle intersections — WS4b, severity 5, effort L, animation +1.0.** In `strips/high/R13` and `crops/high/R12-carrier`, bodies converge into an overlapping pile. Add sustained wrap contacts, body separation, and grounded settling with distinct fall directions. Compare contact relationships with `cfb26-4.jpg`.
2. **Player anatomy and deformation — WS3, severity 4, effort L, art +1.0.** Rework shoulder-to-waist proportions, hips, elbows, and stance deformation in `crops/high/R04-slot_QB` and `crops/high/R06-slot_C-side`; add position-specific builds and restrained cloth detail. Target the anatomical clarity of `axis-3.jpg`.
3. **Portrait formation visibility — WS7, severity 4, effort M, mobile +1.0.** In `medium/mobile/R04`, preserve readable player size while exposing wide receiver/defender relationships through adaptive framing or a useful coverage overview. Reduce empty downfield space. Use `retrobowl-1.jpg` as the information-coverage reference.
4. **Weak movement beats — WS4, severity 4, effort L, animation +1.0.** Give `strips/high/R09` a visible reach, secure, and recovery sequence; give `strips/high/R11` planted cuts with pelvis and torso lean. Use `madden26-4.jpg` for balance and pose reference.
5. **Lighting spill and flare — WS1, severity 3, effort M, lighting +0.5.** Reduce the field-obscuring flare in `high/desktop/R05`, soften isolated light pools, and retain player detail against dark surrounds. Compare exposure control with `cfb26-3.jpg`.
6. **Sparse school staging — WS2, severity 3, effort M, authenticity +0.5.** Differentiate crowd sections and add a recognizable band/student grouping around the modest venue in `high/desktop/R01` and `high/desktop/R20`. Use `cfb26-2.jpg` for organization, scaled to high school.

```json
{
  "loop": 16,
  "role": "critic-codex",
  "tier": "high",
  "scores": {
    "art": {
      "score": 5.5,
      "confidence": 0.95,
      "evidence": [
        {"shot": "crops/high/R04-slot_QB", "note": "Glossy helmets and readable numbers; inflated shoulders and pinched proportions compared with axis-3.jpg."},
        {"shot": "crops/high/R06-slot_C-side", "note": "Angular arm deformation and simplified cloth compared with cfb26-4.jpg."},
        {"shot": "crops/high/R01-crowd", "note": "Human silhouettes, but conspicuous repeated bodies and poses."}
      ]
    },
    "lighting": {
      "score": 6.5,
      "confidence": 0.92,
      "evidence": [
        {"shot": "high/desktop/R01", "note": "Clear night atmosphere, lamp bloom and dark surroundings; less integrated than cfb26-3.jpg."},
        {"shot": "high/desktop/R05", "note": "Large left-side flare washes out playable field."},
        {"shot": "crops/high/R18-turf_26_67_40", "note": "Visible wet sheen; illumination remains patchy compared with cfb26-4.jpg."}
      ]
    },
    "animation": {
      "score": 4.5,
      "confidence": 0.85,
      "evidence": [
        {"shot": "strips/high/R11", "note": "Running reads, but cuts lack convincing planted weight and torso lean."},
        {"shot": "strips/high/R09", "note": "Weak gather-and-secure beat before possession/result."},
        {"shot": "strips/high/R13", "note": "Contact collapses into a compact cluster."},
        {"shot": "crops/high/R12-carrier", "note": "Intersecting bodies and stacked equipment; contact relationships weaker than cfb26-4.jpg."}
      ]
    },
    "ui": {
      "score": 7,
      "confidence": 0.94,
      "evidence": [
        {"shot": "high/desktop/R21", "note": "Clear result, next situation and action hierarchy compared with axis-1.jpg."},
        {"shot": "high/desktop/R16", "note": "Kick instruction and meter are clearly grouped."},
        {"shot": "high/desktop/R22", "note": "Consistent play selection; sidebar less compact than madden26-3.jpg."}
      ]
    },
    "typography": {
      "score": 7,
      "confidence": 0.94,
      "evidence": [
        {"shot": "high/desktop/R21", "note": "Strong display and subtitle hierarchy; comparison madden26-3.jpg."},
        {"shot": "high/desktop/R22", "note": "Consistent names, descriptions and play-type labels; comparison legendbowl-4.jpg."}
      ]
    },
    "readability": {
      "score": 6,
      "confidence": 0.93,
      "evidence": [
        {"shot": "high/desktop/R08", "note": "Ball and target marker are easy to locate."},
        {"shot": "high/desktop/R04", "note": "Formation remains small below extensive distant scenery compared with axis-1.jpg."},
        {"shot": "medium/mobile/R04", "note": "Wide receivers and routes leave the viewport; less complete formation information than retrobowl-1.jpg."}
      ]
    },
    "mobile": {
      "score": 6,
      "confidence": 0.78,
      "evidence": [
        {"shot": "medium/mobile/R10", "note": "Clear carrier and generous action button; inefficient field use compared with retrobowl-2.jpg."},
        {"shot": "medium/mobile/R04", "note": "Portrait crops wide formation relationships despite numbered edge markers."},
        {"shot": "medium/landscape/R04", "note": "Sidebar occupies substantial width while figures remain small compared with retrobowl-1.jpg."},
        {"shot": "medium/mobile/R22", "note": "Only six choices visible, with no visible continuation cue. Brief reports Medium/mobile 488 minimum fps and 2.5 ms worst p95; separately identified throttled data are unavailable."}
      ]
    },
    "authenticity": {
      "score": 6,
      "confidence": 0.87,
      "evidence": [
        {"shot": "high/desktop/R01", "note": "Modest bleachers, standalone board and wooded surroundings establish school scale."},
        {"shot": "high/desktop/R20", "note": "School branding is distinct but venue dressing remains sparse compared with legendbowl-4.jpg."},
        {"shot": "crops/high/R01-crowd", "note": "No clearly differentiated band/student grouping comparable in organization to cfb26-2.jpg."}
      ]
    }
  },
  "gaps": [
    {
      "id": "G-tackle-intersections",
      "category": "animation",
      "expectedGain": 1,
      "severity": 5,
      "effort": "L",
      "workstream": "WS4b",
      "evidence": ["strips/high/R13", "crops/high/R12-carrier"],
      "benchmark": "cfb26-4.jpg",
      "fix": "Maintain wrap contacts, separate body volumes, and settle bodies on the ground with distinct fall directions."
    },
    {
      "id": "G-player-anatomy",
      "category": "art",
      "expectedGain": 1,
      "severity": 4,
      "effort": "L",
      "workstream": "WS3",
      "evidence": ["crops/high/R04-slot_QB", "crops/high/R06-slot_C-side"],
      "benchmark": "axis-3.jpg",
      "fix": "Rework shoulder, waist, hip and elbow proportions and deformation; add position-specific builds and restrained cloth detail."
    },
    {
      "id": "G-phone-formation",
      "category": "mobile",
      "expectedGain": 1,
      "severity": 4,
      "effort": "M",
      "workstream": "WS7",
      "evidence": ["medium/mobile/R04", "medium/landscape/R04"],
      "benchmark": "retrobowl-1.jpg",
      "fix": "Use adaptive framing or a useful coverage overview to expose wide receiver/defender relationships while preserving player size; reduce empty downfield space."
    },
    {
      "id": "G-movement-beats",
      "category": "animation",
      "expectedGain": 1,
      "severity": 4,
      "effort": "L",
      "workstream": "WS4",
      "evidence": ["strips/high/R09", "strips/high/R11"],
      "benchmark": "madden26-4.jpg",
      "fix": "Add visible catch reach, secure and recovery beats, plus planted cuts with pelvis and torso lean."
    },
    {
      "id": "G-lighting-spill",
      "category": "lighting",
      "expectedGain": 0.5,
      "severity": 3,
      "effort": "M",
      "workstream": "WS1",
      "evidence": ["high/desktop/R05", "high/desktop/R18"],
      "benchmark": "cfb26-3.jpg",
      "fix": "Reduce field-obscuring flare, soften isolated light pools and retain player detail against dark surroundings."
    },
    {
      "id": "G-school-staging",
      "category": "authenticity",
      "expectedGain": 0.5,
      "severity": 3,
      "effort": "M",
      "workstream": "WS2",
      "evidence": ["high/desktop/R01", "high/desktop/R20"],
      "benchmark": "cfb26-2.jpg",
      "fix": "Differentiate crowd sections and add recognizable band and student groupings scaled to a modest high-school venue."
    }
  ],
  "verdict": "continue"
}
```
