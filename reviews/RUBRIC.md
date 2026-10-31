# Visual review rubric: Friday Night Spa City (football), v3

Each review scores 8 categories from 1 to 10 in 0.5 steps, against the benchmark set in `benchmarks/` (git-ignored; see its README). The anchors below say what a 3, 5, 7 and 9 look like. Scores in between interpolate. Score what is **on screen in the captures**: intent, plans and code don't count.

**Evidence rule.** Every category score cites at least 2 captures (a frame, a close-up or a strip). Animation must cite at least one motion strip. An uncited score is invalid and the judge drops it.

**Tier.** Unless the brief says otherwise, the score is for the **High** tier on desktop. Mobile is scored from the mobile captures. Low is checked only for regressions.

## Gates (the loop's stop rule)

| Category | key | Gate |
|---|---|---|
| Art | `art` | ≥ 7 |
| Lighting & atmosphere | `lighting` | ≥ 7 |
| Animation & game feel | `animation` | ≥ 7 |
| UI / HUD | `ui` | ≥ 7 |
| Typography | `typography` | ≥ 7 |
| Readability | `readability` | ≥ 7 |
| Mobile | `mobile` | ≥ 7 |
| Authenticity | `authenticity` | ≥ 6 |

## Anchors

### Art (`art`): models, materials and textures of players, officials, stadium, crowd and turf
- **3**: primitive or faceted figures, flat colors, boxes for people, no material variety.
- **5**: clean low-poly with a consistent style. Palette-only materials: no gloss, no cloth, no texture detail. Crowd reads as colored blocks at any distance.
- **7**: smooth bodies with readable gear (pads, facemask, jersey folds) that hold up in close-ups. A visible material contrast between the glossy helmet and the matte jersey. Turf has texture at field level, the crowd reads as people, and the venue reads as built objects. Benchmarks: axis-3 (about 7), legendbowl-1 (a style-consistent 7).
- **9**: near-photoreal cloth, stitching and wear, varied body types, detailed stadium dressing. Benchmarks: cfb26-4, madden26-4.

### Lighting & atmosphere (`lighting`)
- **3**: flat ambient light, no shadows, no sense of time of day.
- **5**: a directional key light, blob shadows, light haze, a believable sky backdrop.
- **7**: real shadows from the stadium lights (several soft shadows under players), bloom on the lamps, believable night exposure and contrast, wet sheen in rain, light falloff from field to stands. Benchmarks: axis-3, cfb26-3.
- **9**: a filmic broadcast grade: specular highlights on helmets and turf, volumetric light, bounce light. Benchmarks: cfb26-3, cfb26-4, madden26-4.

### Animation & game feel (`animation`): judged from the motion strips first, then frames
- **3**: sliding feet, rigid pose swaps, no contact.
- **5**: procedural cycles that read, but with popping, floaty contact and stiff falls.
- **7**: feet planted while in contact, weight shifts and leans in cuts, legible throw, catch and tackle beats, smooth blends, varied falls, plus feel touches: camera punch-ins, slow motion and particles at the right moments.
- **9**: motion-capture-grade contact and secondary motion. Benchmarks: cfb26-4 and madden26-4 (stills only).

### UI / HUD (`ui`)
- **5**: functional overlays with an inconsistent style, some clutter or empty panels.
- **7**: a broadcast-grade scorebug, clear pre-snap identification (route art, receiver tags), result banners with hierarchy, nothing stale or overlapping. Benchmarks: axis-1, madden26-1, madden26-3.
- **9**: EA broadcast-package polish, with motion and context-aware graphics.

### Typography (`typography`)
- **5**: readable, but mixed scales and weak hierarchy.
- **7**: a consistent display/condensed pair on a clear type scale, deliberate tracking, nothing clipped, numerals that read at a glance. Benchmarks: madden26-3, cfb26-1, legendbowl-4.

### Readability (`readability`)
- **5**: the ball, the carrier and the receivers take effort to find, and players are small.
- **7**: the ball, carrier, targets and line of scrimmage read at a glance in every frame, on both viewports. Benchmarks: madden26-1, axis-1, legendbowl-2, retrobowl-1.

### Mobile (`mobile`)
- **5**: it works on a phone, but figures are small and the HUD is cramped.
- **7**: readable, thumb-friendly figures and HUD at 390 px wide; landscape and portrait framing both intentional; holds 30 fps on the phone proxy (perf.json, 4× CPU throttle). Benchmarks: retrobowl-1, retrobowl-2.

### Authenticity (`authenticity`): high-school Friday night in the Spa City
- **5**: generic football.
- **7**: venue scale, track, bleachers, band, student section, small-town staging, NFHS markings and goalposts all right for a 3A–6A Arkansas Friday night. Benchmarks: cfb26-1/2/3 (college analogues), legendbowl-4.

## Output

Each reviewer ends their review with one fenced `json` block that follows `reviews/schema.json`.
