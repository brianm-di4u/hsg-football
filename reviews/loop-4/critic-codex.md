Friday Night Spa City remains below the visual pass gates: **continue**. The field markings, team colors, readable facemasks, helmet highlights and local naming establish a coherent football game, but close-ups expose primitive player construction, and the motion strips lack convincing weight and contact. Lighting and typography are nearer the target than animation or art. The phone layout has usable controls, but its distant framing sacrifices player detail, and the high-tier first-down banner still appears translucent over bodies. The supplied performance figures provide ample rendering headroom; they do not compensate for these visible shortcomings.

Paths below are relative to `games/football/screenshots/review-loop-4/`; benchmark filenames refer to `games/football/benchmarks/`.

1. **Art — 5.5/10.** `crops/high/R06-slot_C` shows legible numbers, contrasting facemasks and glossy helmets, but also cylindrical shins, mitten hands, nearly identical builds and smooth, inflated jersey shapes. `crops/high/R04-slot_QB` confirms that the number treatment is clean while the underlying uniforms lack convincing cloth construction. `crops/high/R01-crowd` contains recognizable people, but repetitive angular bodies and poses produce a noisy pattern. This exceeds the rubric’s palette-only 5 in materials, yet falls substantially short of the anatomy and uniform definition in `axis-3.jpg`, or the deliberately resolved silhouettes in `legendbowl-1.jpg`. Photorealism is unnecessary; a finished stylized model language is necessary.

2. **Lighting and atmosphere — 6.5/10.** `high/desktop/R04` has luminous stadium lamps, field-to-perimeter falloff and a strong evening backdrop. `crops/high/R18-turf_26_67_40` supplies a visible wet specular response, while `high/desktop/R19` establishes a distinct misty daylight condition. However, the night image combines a highly saturated sky with a dull, largely featureless perimeter, and the close-ups show dominant directional shadows rather than the convincing overlapping light contribution expected from multiple stadium towers. Compared with `cfb26-3.jpg` and `cfb26-4.jpg`, the lighting lacks integration between environment, people and fixtures. This is close to 7, but not consistently there.

3. **Animation and game feel — 4.5/10.** `strips/high/R11` shows the carrier moving laterally with relatively upright posture and little convincing plant-and-drive change through the cut. In `strips/high/R10`, the transition into the grounded pair is abrupt across panels 5–7, while nearby blockers retain repetitive engagement poses. `strips/high/R13` does not clearly communicate a wrap, compression and shared loss of balance; `crops/high/R12-carrier` exposes the resulting tightly overlapped bodies and awkward ball placement above the pile. Throw and catch activity is identifiable in `strips/high/R07` and `strips/high/R09`, and the latter shows camera tightening, but these presentation touches cannot supply missing body mechanics. `cfb26-4.jpg` and `madden26-4.jpg` demonstrate much stronger contact silhouettes and articulated balance. Those benchmarks are stills, so they support pose comparisons, not claims about their temporal quality.

4. **UI / HUD — 6/10.** `high/desktop/R04` clearly separates score, situation and the primary action; receiver symbols and route art are useful. But the permanent sidebar consumes roughly a quarter of the width, leaving a large empty area beneath its controls while players remain small. `high/desktop/R22` packs the playbook into a narrow column, with the final visible card cut by the lower viewport edge. `high/desktop/R10` continues to give prominent space to the play diagram during live action. Against `axis-1.jpg` and `madden26-3.jpg`, the package reads more like an application panel beside a game than a composed broadcast interface. Functional and consistent, but below 7.

5. **Typography — 6.5/10.** `high/desktop/R04` uses a consistent condensed display face, strong score numerals and recognizable action hierarchy. `high/desktop/R22` weakens that system with small, subdued descriptions and densely stacked cards; the supporting text is less comfortable than the headings. `high/mobile/R21` retains clear score and result numerals, although several secondary elements compete at similar emphasis. Compared with `cfb26-1.jpg` and `madden26-3.jpg`, the hierarchy is less disciplined; compared with `legendbowl-4.jpg`, the smaller information is less confidently sized. The type system is credible, but needs scale and contrast refinement.

6. **Readability — 6/10.** `high/desktop/R04` makes targets and the line of scrimmage easy to identify, although the heavy route outlines overlap players. `high/mobile/R08` makes the airborne ball visible and identifies its target with a cyan ring, but leaves much of the screen occupied by empty downfield turf while the active formation occupies a small lower area. `high/desktop/R10` identifies the carrier with a ring and nameplate, yet the congested cluster remains difficult to separate. `axis-1.jpg`, `legendbowl-2.jpg` and `retrobowl-1.jpg` communicate player roles and spatial relationships more immediately. The problem is inconsistent action scale and separation, rather than total absence of cues.

7. **Mobile — 6/10.** `medium/mobile/R04` has generously sized Hike and Change Play buttons and a readable scorebug, but the formation is tiny beneath oversized route symbols. `medium/mobile/R21` docks the result at the bottom of the field with a substantially darker treatment. However, `high/mobile/R21` still visibly shows turf lines and bodies through the banner, so the brief’s opaque-band claim is not uniformly demonstrated. `high/mobile/R08` likewise devotes excessive height to unused field. Against `retrobowl-1.jpg` and `retrobowl-2.jpg`, action occupies too little of the available display. The supplied medium phone proxy’s 58 minimum fps and 35.8 ms worst p95 frame support acceptable performance; landscape behavior and touch responsiveness cannot be established from these portrait stills.

8. **Authenticity — 6/10.** `high/desktop/R03` establishes Wolves branding, a modest school building and a hillside setting; `high/desktop/R20` supplies another school identity and appropriately modest bleachers. `crops/high/R01-board` reads convincingly as a simple school scoreboard. However, `high/desktop/R15` exposes an extremely sparse sideline, repetitive reserve figures, blank surroundings and oversized cone trees. The visible staging does not yet communicate a distinct band, student section or busy community event. `cfb26-1.jpg` and `cfb26-2.jpg` are college-scale analogues, not capacity targets: their relevant advantage is identifiable groups and purposeful venue dressing. Local names and small venue scale reach the authenticity gate, but the setting remains thin.

Ranked gaps follow. Expected gains are estimates in the named category and are not additive.

| Rank | Gap and evidence | Concrete fix | Expected gain | Severity | Effort | Workstream |
|---|---|---|---|---|---|---|
| 1 | Tackle contact lacks a readable progression; `strips/high/R10`, `strips/high/R13`, `crops/high/R12-carrier`. Compare `cfb26-4.jpg`. | Build paired contact sequences with an explicit wrap, shared momentum, supported descent and collision-aware settling; keep the ball attached to the carrying hand. | Animation +1.0 | 5 | L | WS4b tackle physics |
| 2 | Primitive player anatomy dominates every close-up; `crops/high/R06-slot_C`, `crops/high/R04-slot_QB`. Compare `axis-3.jpg`. | Replace tube limbs and mitten hands with shaped joints, cleats and gloves; add position-specific proportions and restrained cloth folds while retaining the stylized palette. | Art +1.0 | 5 | L | WS3 player models/materials |
| 3 | Upright locomotion and weak cutting mechanics; `strips/high/R11`, `strips/high/R07`. Compare pose balance in `madden26-4.jpg`. | Match stride to travel speed, plant the outside foot during cuts, drive the pelvis through turns and add torso counter-rotation and a clear throw follow-through. | Animation +0.5 | 4 | L | WS4 animation |
| 4 | Action is too small, particularly on phones; `medium/mobile/R04`, `high/mobile/R08`, `high/desktop/R04`. Compare `retrobowl-1.jpg`, `axis-1.jpg`. | Frame the active formation and developing play more tightly, preserving receiver coverage; shrink route symbols relative to players and collapse the desktop sidebar during live play. | Readability +1.0 | 4 | M | WS7 presentation/HUD/mobile |
| 5 | HUD space and result treatment remain uneven; `high/desktop/R22`, `high/mobile/R21`, `medium/mobile/R21`. Compare `madden26-3.jpg`. | Give play selection sufficient space, provide a clear scrolling affordance, enlarge secondary text and make the docked result band consistently opaque across tiers. | UI +0.5 | 3 | M | WS7 presentation/HUD/mobile |
| 6 | Stadium illumination lacks convincing integration; `high/desktop/R04`, `crops/high/R18-turf_26_67_40`. Compare `cfb26-3.jpg`, `cfb26-4.jpg`. | Balance sky saturation with field exposure, add softer contributions from multiple light towers and illuminate perimeter structures enough to reveal their form. | Lighting +0.5 | 3 | M | WS1 lighting/post |
| 7 | Repetitive crowd and sparse school-event staging; `crops/high/R01-crowd`, `high/desktop/R15`, `high/desktop/R20`. Compare `cfb26-1.jpg`, `cfb26-2.jpg`. | Vary spectator silhouettes and pose distribution; establish recognizable student and band sections with school-color organization and visible instruments. | Authenticity +0.5 | 3 | M | WS2 crowd |

```json
{
  "loop": 4,
  "role": "critic-codex",
  "tier": "high",
  "scores": {
    "art": {
      "score": 5.5,
      "confidence": 0.95,
      "evidence": [
        {"shot": "crops/high/R06-slot_C", "note": "Readable gear and helmet gloss, but cylindrical limbs, mitten hands and inflated uniform shapes; below axis-3.jpg."},
        {"shot": "crops/high/R04-slot_QB", "note": "Clean number treatment does not resolve primitive anatomy and cloth."},
        {"shot": "crops/high/R01-crowd", "note": "Recognizable but repetitive angular spectator figures."}
      ]
    },
    "lighting": {
      "score": 6.5,
      "confidence": 0.9,
      "evidence": [
        {"shot": "high/desktop/R04", "note": "Lamp bloom and falloff establish evening, but perimeter and saturated sky feel disconnected; compare cfb26-3.jpg."},
        {"shot": "crops/high/R18-turf_26_67_40", "note": "Wet specular response is visible; integrated stadium lighting remains below cfb26-4.jpg."},
        {"shot": "high/desktop/R19", "note": "Distinct daylight mist treatment."}
      ]
    },
    "animation": {
      "score": 4.5,
      "confidence": 0.86,
      "evidence": [
        {"shot": "strips/high/R11", "note": "Lateral travel lacks a convincing planted cut and weight transfer."},
        {"shot": "strips/high/R10", "note": "Abrupt transition into grounded contact across panels 5–7."},
        {"shot": "strips/high/R13", "note": "Wrap and shared loss of balance are poorly articulated; compare contact silhouettes in cfb26-4.jpg."},
        {"shot": "crops/high/R12-carrier", "note": "Overlapped grounded bodies and awkward ball placement."}
      ]
    },
    "ui": {
      "score": 6,
      "confidence": 0.94,
      "evidence": [
        {"shot": "high/desktop/R04", "note": "Clear actions and scorebug, but oversized sidebar and small action scale compared with axis-1.jpg."},
        {"shot": "high/desktop/R22", "note": "Dense narrow playbook with a partially visible bottom card; below madden26-3.jpg presentation polish."}
      ]
    },
    "typography": {
      "score": 6.5,
      "confidence": 0.92,
      "evidence": [
        {"shot": "high/desktop/R04", "note": "Consistent display type and strong numerals."},
        {"shot": "high/desktop/R22", "note": "Small subdued descriptions weaken hierarchy compared with cfb26-1.jpg and legendbowl-4.jpg."},
        {"shot": "high/mobile/R21", "note": "Readable result numerals, but competing secondary emphasis."}
      ]
    },
    "readability": {
      "score": 6,
      "confidence": 0.91,
      "evidence": [
        {"shot": "high/desktop/R04", "note": "Targets and scrimmage line are clear; route outlines overlap small figures."},
        {"shot": "high/mobile/R08", "note": "Visible ball and target ring, but excessive empty field reduces action scale compared with retrobowl-1.jpg."},
        {"shot": "high/desktop/R10", "note": "Carrier cue works, but the congested formation lacks separation compared with legendbowl-2.jpg."}
      ]
    },
    "mobile": {
      "score": 6,
      "confidence": 0.88,
      "evidence": [
        {"shot": "medium/mobile/R04", "note": "Large usable controls, tiny formation and disproportionately large target symbols."},
        {"shot": "medium/mobile/R21", "note": "Darker result band is docked at the field bottom."},
        {"shot": "high/mobile/R21", "note": "Field and bodies remain visible through the result band."},
        {"shot": "high/mobile/R08", "note": "Action occupies too little of the portrait display compared with retrobowl-2.jpg."}
      ]
    },
    "authenticity": {
      "score": 6,
      "confidence": 0.87,
      "evidence": [
        {"shot": "high/desktop/R03", "note": "School branding, modest building and hillside provide local character."},
        {"shot": "high/desktop/R20", "note": "Distinct school palette and small bleachers establish appropriate scale."},
        {"shot": "high/desktop/R15", "note": "Sparse sideline and primitive surroundings lack the identifiable event staging shown by college analogues cfb26-1.jpg and cfb26-2.jpg."}
      ]
    }
  },
  "gaps": [
    {
      "id": "G-tackle-contact",
      "category": "animation",
      "expectedGain": 1,
      "severity": 5,
      "effort": "L",
      "workstream": "WS4b",
      "evidence": ["strips/high/R10", "strips/high/R13", "crops/high/R12-carrier"],
      "benchmark": "cfb26-4.jpg",
      "fix": "Create paired wrap, momentum-transfer, descent and settling sequences with collision-aware bodies and a hand-attached ball."
    },
    {
      "id": "G-player-construction",
      "category": "art",
      "expectedGain": 1,
      "severity": 5,
      "effort": "L",
      "workstream": "WS3",
      "evidence": ["crops/high/R06-slot_C", "crops/high/R04-slot_QB"],
      "benchmark": "axis-3.jpg",
      "fix": "Replace tube limbs and mitten hands with shaped joints, gloves and cleats; vary position builds and add restrained cloth folds."
    },
    {
      "id": "G-locomotion-weight",
      "category": "animation",
      "expectedGain": 0.5,
      "severity": 4,
      "effort": "L",
      "workstream": "WS4",
      "evidence": ["strips/high/R11", "strips/high/R07"],
      "benchmark": "madden26-4.jpg",
      "fix": "Match stride to travel speed, plant feet through cuts, drive pelvis and torso rotation, and clarify throw follow-through."
    },
    {
      "id": "G-action-framing",
      "category": "readability",
      "expectedGain": 1,
      "severity": 4,
      "effort": "M",
      "workstream": "WS7",
      "evidence": ["medium/mobile/R04", "high/mobile/R08", "high/desktop/R04"],
      "benchmark": "retrobowl-1.jpg; axis-1.jpg",
      "fix": "Tighten framing around active play while preserving receiver coverage, reduce route-symbol scale and collapse the live desktop sidebar."
    },
    {
      "id": "G-hud-layout",
      "category": "ui",
      "expectedGain": 0.5,
      "severity": 3,
      "effort": "M",
      "workstream": "WS7",
      "evidence": ["high/desktop/R22", "high/mobile/R21", "medium/mobile/R21"],
      "benchmark": "madden26-3.jpg",
      "fix": "Expand play-selection space, clarify scrolling, enlarge secondary text and make the docked result band consistently opaque across tiers."
    },
    {
      "id": "G-light-integration",
      "category": "lighting",
      "expectedGain": 0.5,
      "severity": 3,
      "effort": "M",
      "workstream": "WS1",
      "evidence": ["high/desktop/R04", "crops/high/R18-turf_26_67_40"],
      "benchmark": "cfb26-3.jpg; cfb26-4.jpg",
      "fix": "Balance sky saturation and field exposure, add softer contributions from multiple towers and reveal perimeter structure through controlled illumination."
    },
    {
      "id": "G-school-event-crowd",
      "category": "authenticity",
      "expectedGain": 0.5,
      "severity": 3,
      "effort": "M",
      "workstream": "WS2",
      "evidence": ["crops/high/R01-crowd", "high/desktop/R15", "high/desktop/R20"],
      "benchmark": "cfb26-1.jpg; cfb26-2.jpg",
      "fix": "Vary spectator silhouettes and pose distribution, and establish recognizable student and band sections with school colors and visible instruments."
    }
  ],
  "verdict": "continue"
}
```
