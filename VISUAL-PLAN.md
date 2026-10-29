# VISUAL-PLAN: Friday Night Spa City (`games/football`)

## Baseline (visual-before)

`--milestone visual-before`: 74/74 passed. The independent review against five benchmarks (EA College Football 26,
Madden NFL 26, Axis Football 2026, Legend Bowl, Retro Bowl) scored it like this:

| Category | Score | Benchmark range |
|---|---|---|
| Art | 2.5 | 7–10 |
| Lighting and atmosphere | 2 | 4–10 |
| Animation and game feel | 2 | 7–10 |
| UI / HUD | 5 | 7–10 |
| Typography | 4 | 7–9 |
| Readability | 5 desktop, 3 mobile | 7–8 |
| Mobile | 4 | 8 |
| Authenticity | 4 (writing 7, visuals 2) | 4–10 |

Its top gaps:
- No player figures (coin tokens).
- No night lighting on the field.
- Nothing beyond the field: no goalposts, sidelines, stands or scoreboard.
- 10 px players on phones.
- A weak touchdown moment, and end zones painted for the visitors.
- An empty desktop panel during plays.
- Text-only play cards, a weak scorebug and no display typeface.

## Direction: full 3D field view (three.js), 2D menus, 2D classic fallback

Football is about 22 bodies moving in space under stadium lights, so the field goes **fully 3D**:
- three.js r186, tree-shaken to about 550 KB.
- Low-poly animated players built in Blender.
- Procedural Friday-night stadiums.
- A broadcast camera director.

Menus and the HUD stay DOM, styled as broadcast graphics. The old 2D renderer stays as:
- the automatic fallback when WebGL 2 is missing;
- an opt-in "2D classic" field view in Settings;
- `?gl=0`.

The simulation, AI, rules, season and save format are unchanged. The 3D view only reads game state.

Why not 2.5D sprites (the Legend Bowl route)? 22 players × 8 facings × many poses would mean hundreds of
generated sprites. Codex couldn't keep those consistent, and the camera would stay fixed. One rigged 1,700-triangle
model, painted per team by a shader, gives every school its own uniform, any camera angle, replays and real
light for less data.

## Assets

| Asset | Tool | Status |
|---|---|---|
| Player model: helmet with facemask and stripe, shoulder pads, jersey with chest/back/shoulder number panels, pants with stripes, socks and shoes. 11 bones, rigid skin, about 1,700 tris | Blender script `art-src/blender/build_models.py` → `src/js/models-data.js` | done |
| Official (striped shirt, cap), about 970 tris | Blender, same script | done |
| Stadium light tower (pole, 3×5 fixture banks) | Blender, same script | done |
| Number textures, field markings, end zones, midfield mascot, scoreboard | runtime canvas | done |
| Stands, press box, track, goalposts, pylons, benches, gym (Wolf Arena), pines, ridges | procedural three.js geometry | done |
| Crowd and band: thousands of instanced fans in team colors, bobbing in a vertex shader, standing on big plays | instanced mesh + shader | done |
| Night sky + Ouachita ridge panorama | Codex painted image | in progress |
| Title key art (wide + tall) | Codex painted images | in progress |

Shaders:
- Palette shader: team colors per material slot, number decals and a rim light.
- Crowd bob shader.
- Sky gradient.
- Additive light-haze cones and a light-spill dome.
- Blob shadows: two per player, one from each bank of lights.

## Camera director

- Pre-snap: behind the offense, wide.
- Live: follows the ball with a lead.
- Kickoffs and punts: high and wide.
- Field goals: low, behind the kicker.
- Touchdowns: a low orbit around the scorer.
- Replays: a sideline camera at 0.55× speed (R or the Replay button after any play).

Phones get a tighter, steeper camera: about 24 yd of field across the ball versus 46 on desktop. That makes players
3–4× larger than the old 6 px dots. Receiver badges, route previews, the kick meter and the replay tag are 2D overlays
placed by projecting 3D points.

## Research additions (`research/stadiums.md`)

- Wolf Stadium: turf, track, a 3:1 home/visitor stand ratio, and Wolf Arena behind the east end.
- Holt Field at Joe C. Reese Stadium: turf, track, a press box, a large concrete grandstand, and woods on the far
  side and the west end.
- Surfaces of the generic fields.
- NFHS markings: hashes at 53'4", 9-yard marks, team boxes between the 25s, goal posts 23'4" wide.
- The white-striped high-school ball.
- East–west Ouachita ridges with pine.

Only confirmed details are drawn as "real". Light poles, scoreboard spots and stand sizes are generic. The lake
backdrop is dropped: Lake Hamilton isn't visible from Wolf Stadium.

## Performance plan

- Targets: 60 fps on a mid laptop, 30+ fps on phones.
- Draw calls: about 60 per frame. Crowd, trees, shadows and sideline teams are each one instanced draw. 22 skinned
  players and 5 officials.
- Render on demand: the loop stops when nothing moves (kept from v1). Poses and the camera settle, then it idles.
- Adaptive quality: pixel ratio steps 2 → 1.5 → 1 if frame time stays high. Phones get a smaller field texture.
- Download: `index.html` about 1.1 MB (three.js 550 KB, models 180 KB). Painted images are separate WebP files loaded
  after first paint, with the procedural sky as the fallback.
- Low end: no WebGL 2 means the 2D field. The Settings toggle lets any device pick 2D.

## Test plan

Existing suites keep passing in 3D mode at both viewports. New `tests/view3d.test.mjs` covers:
- WebGL on, the venue and weather;
- players posed (stance, run, fall);
- the projection used by taps and badges;
- replays;
- the 2D fallback with `?gl=0`;
- settings toggles;
- perf numbers (draw calls, triangles, CPU ms) logged.

The harness Chromium renders WebGL in software (SwiftShader), so fps there is a floor, not the real number. Real-GPU
fps is measured in a headed run.

Every milestone: screenshots at both viewports, all inspected, then the adversarial review re-run against the
benchmarks.
