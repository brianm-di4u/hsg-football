# Football visuals v3: Path A (three.js) with an adversarial review loop

## Context
`games/football` (Friday Night Spa City) has a three.js r186 3D field view. Its last independent review scored Art 5, Lighting 4, Animation 4, UI 6.5, Typography 5.5, Readability 5.5, Mobile 5.5, Authenticity 6. The benchmark minimums are 7/6/6/7/7/7/7/6 (VISUAL-REPORT.md:119-128).

Today's renderer:
- Lambert shading only, no shadows, no post-processing (field3d.js:34-50).
- About 1.7k-triangle rigid-skinned players with procedural poses (models.js, players3d.js).
- A crowd of box-shaped people (stadium.js:238-308).
- Light pools baked into a canvas turf texture (stadium.js:135-151).

The goal is to carry out every Path A recommendation. That covers PBR, shadows, an HDRI environment, post-processing, sprite-card crowds, smooth-skinned Blender glTF players with LODs, animation clips with IK, Rapier tackles, PBR turf with wet rain, and asset packs. A Presentation track for the 2D categories is added. The work is driven by a repeatable capture → adversarial review → develop loop.

**Your decisions**
- **Asset shipping:** heavy assets ship as classic-script packs in `assets/pack-*.js`. `index.html` stays ≤ 2 MB and fully playable at Low with no packs, offline and `file://`-safe. AC40 gets amended.
- **Reviewers:** a Claude critic and a Codex (GPT-6.1 Sol) critic, kept blind to each other, then a Claude advocate, then a Claude judge.
- **Animation:** clips are keyframed in Blender by script (no mocap).
- **Stop rule:** the judge scores Art, Lighting and Animation ≥ 7 and every other category ≥ its benchmark minimum, or loops in a row bring no gain: 3 with a cap of 12 through loop 9, then (user decision before loop 10) 2 in a row with no cap, looping without a pause between loops.
- **Presentation workstream:** added.
- **Downloads pre-approved:** npm tools (three@0.186.1 addons, gltf-transform/gltfpack, rapier3d-compat), MPFB2 with the MakeHuman CC0 assets, a CC0 HDRI and turf maps, and KTX-Software.

**Not pre-approved:** CFB27 and Madden 27 benchmark screenshots. I'll ask you to supply them (or approve fetching press images) at the start of Phase 0. They stay review-only and git-ignored in `benchmarks/`.

Blender 5.2 runs headless, `"C:\Program Files\Blender Foundation\Blender 5.2\blender.exe" -b --factory-startup --python …`. The Blender MCP is available for inspecting scenes and doing interactive passes.

## Target architecture
```
index.html (≤2 MB, Low playable)  three-lib.js (core + every class the addons import; sets globalThis.__FNSC_THREE)
  packs-manifest.js (generated)  packs.js (lazy <script> loader, hash check)  tiers.js (tier/detail + Auto up/down)
  lights3d.js  post3d.js  turf3d.js  crowd3d.js  players-hd.js (HDRig)  anim.js (AnimTrack)  ragdoll.js
assets/pack-three-hi.js (addons)  pack-env.js (HDRI, LUT)  pack-turf.js  pack-crowd.js  pack-players.js (GLB + textures + clips)
       pack-ktx2.js (only if spike S1 passes)  pack-rapier.js (High, loaded on demand)
```
Pack format follows basketball's `tools/pack-assets.mjs`: `FNSC_PACKS[name] = { v, hash, data: { glb: b64, tex: {dataURIs}, clips: {meta} } }`. All GPU textures are data URIs or embedded GLB images, because WebGL refuses `file://` images (shared/LESSONS.md:121,129).

## Phase 0: infrastructure (no visual change)
1. **Vendor the addons.** Copy them from `three@0.186.1` into `vendor/three/addons/`:
   - post: EffectComposer, RenderPass, ShaderPass, UnrealBloomPass, GTAOPass, SMAAPass, OutputPass, LUTPass, BokehPass, plus their shaders;
   - loaders: GLTFLoader, KTX2Loader, HDR/RGBE loader;
   - meshopt decoder, CCDIKSolver, SkeletonUtils.
2. **Rework `tools/build-three.mjs` into two outputs:**
   - core `src/js/three-lib.js`, with its NAMES list (lines 19-31) unioned with every name the addons import;
   - `assets/pack-three-hi.js`, where `'three'` resolves to `globalThis.__FNSC_THREE`.
   - Pattern to follow: `games/basketball/tools/build-vendor.mjs`.
3. **`tools/build.mjs`: one build command.** It chains build-three, fonts, art, data, optional `--blender` scripts, pack-assets and `shared/tools/inline.mjs`, then checks the budgets in the table below. Also delete `tools/before-after.mjs`; `shared/test-harness/sheets.mjs --compare` replaces it.
4. **`src/js/packs.js` (pack loader).**
   - `require(names)` adds `<script>` tags with `createElement` and checks deps and hashes. Pack states: absent, loading, ready, failed, stale.
   - `release()` frees the base64 strings after upload.
   - Low never requests a pack, and `?packs=0` forces packs off.
   - `F3.artLoading` holds `isIdle()` false while a pack is loading.
5. **New `__game` hooks** (main.js, beside `animAt`/`replay` around lines 996-1030):
   - `clock(ms)` freezes all shader, crowd and grain time.
   - `gfxTier(tier, detail)` resolves after the packs load and `compileAsync` finishes.
   - `bbox(target)` returns screen rectangles for crops.
   - `gfx()` gains tier, detail, packs, builds, `calls{scene,post,total}`, `tris`, shadowCasters.
   - Seed the rig gait phase from the player slot to replace `Math.random` (players3d.js), so frames are deterministic.
6. **`tools/shots-gpu.mjs` and `tools/review-shots.json` (GPU capture).**
   - Launches system Chrome (`channel:'chrome'`, `--enable-gpu --use-angle=d3d11`), following property-game's `shots3d.mjs`.
   - Captures 22 canonical frames, R01–R22: establishing wide, kickoff, huddle, offense/defense pre-snap, stance, QB wind-up, ball in air, catch, run, cut, tackle, bodies down, TD, replay with depth of field, field goal, punt, rain, day mist, 3A venue, result HUD, play-call screen.
   - Desktop gets all frames; mobile gets 8 key frames.
   - Crops at 2–4× from `bbox`: QB, lineman, helmet, tackle, crowd, turf, scoreboard. Captured as a re-render at higher DPR.
   - 8-frame motion strips for animation frames.
   - Covers High, Medium and Low (Low is the regression check).
   - `--verify` captures twice and diffs (< 0.5/255).
   - `--file-url` mode proves the offline path.
7. **`tools/perf-gpu.mjs` (GPU performance).** Ported from basketball `perf3d.mjs`.
   - Measures fps, frame-time p50/p95, cpuMs, per-pass and per-tag GPU ms (reuse `profile3d`, field3d.js:781), calls, tris and heap, per tier.
   - Phone proxy at 4× and 6× CPU throttle on Low and Medium.
8. **Review kit in tracked `games/football/reviews/`.**
   - `RUBRIC.md`: 8 categories, written anchors at 3/5/7/9, the benchmark images per category, and the evidence rule (≥ 2 cited shots or crops; animation must cite strips).
   - `PROTOCOL.md`.
   - `briefs/critic.md`: shared by both critics, with no prior scores.
   - `briefs/codex-wrapper.md`: runs through the `codex:codex-rescue` subagent from `C:\Video Game Projects`, read-only, `--effort medium` (high for loop 0 and the final loop), returns markdown plus JSON.
   - `briefs/advocate.md`: may rebut, with evidence and a maximum change of ±1 per category, and may not add gaps.
   - `briefs/judge.md`.
   - `schema.json`: scores, confidence, evidence, and gaps with id, category, expectedGain, severity, effort, workstream, fix.
   - `HISTORY.md`.
   - `tools/review-prep.mjs`: writes the loop brief, the shot index, perf data and CHANGES.
   - `tools/review-tally.mjs`: validates the schema, updates HISTORY, applies the stop rule and ranks the backlog.
9. **Spikes (timeboxed).** Record each go/no-go in `VISUAL-PLAN-2.md`.

| Spike | Question | Fallback if it fails |
|---|---|---|
| S1 | KTX2 under `file://` by pre-filling `THREE.Cache` with the transcoder | WebP only |
| S2 | GLB-embedded textures through `GLTFLoader.parse` | Data-URI textures |
| S3 | MPFB2 headless in Blender 5.2 | Procedural skin-modifier body |
| S4 | Composer cost on the RTX 5060 | Half-resolution GTAO or baked AO |
| S5 | Codex can view PNGs | Attach contact sheets as images |
| S6 | System-Chrome GPU on football (and the harness `--gpu` flag) | Bundled Chromium with GPU args |
| S7 | `?v=` query on `file://` script URLs | Hash-only check |

**Spike results so far (2026-10-29)**

| Spike | Result |
|---|---|
| S4 composer cost | **Pass.** At High on the RTX 5060 at 1280×800, the run reaches 215–365 fps with a worst-case p95 frame of 8.1 ms (vsync off). |
| S5 Codex sees images | **Pass.** Loop 0's Codex review cites close-up and strip details. |
| S6 real-GPU capture | **Pass.** System Chrome headless (`channel:'chrome'`, ANGLE D3D11) gets the RTX 5060. The harness `--gpu` flag also gets it, and all 87 tests run on it. |
| S7 packs under file:// | **Pass.** `assets/pack-three-hi.js` loads by a plain `<script>` from file://; a hash check replaces the `?v=` query. |
| S1 KTX2, S2 GLB textures, S3 MPFB2 | Pending, run in Phase 3/4. |

**Deviations from the plan, with reasons**
- **Turf detail normals.** These are generated procedurally at runtime, not shipped as a `pack-turf` texture. They tile once per yard, so a downloaded texture adds nothing, and this costs 0 KB.
- **Grade LUT.** It is computed at runtime in `post3d.js`, so no `pack-env` is needed yet.
- **Environment map.** It is built from the venue's own lamp banks and sky (`lights3d.js`), not from an HDRI. That makes it specific to each venue, and nothing has to be downloaded.
- **Auto quality.** A hardware desktop GPU starts at High as soon as its pack is loaded, without the offscreen probe. A tier that it steps down from (because frames are slow) is banned for the session. Headroom is about 4× even at High.
- **`PCFSoftShadowMap`.** It was removed in r186, so the game uses `PCFShadowMap`, which is now the soft filter.

10. **Tests.**
    - `tests/helpers.mjs` `quickGame` pins `quality:'low', detail:2`, which is exactly today's look, so all 87 existing tests keep their baselines.
    - New `tests/packs.test.mjs`: manifest matches files, hashes registered, `?packs=0` makes zero `pack-` requests, no `<script src=` in index.html.
11. **Loop 0 (calibration).** Run the full review on the unchanged game. This sets the new baseline and proves the protocol end to end.

## The loop (every phase ends with one or more loops)
1. `node games/football/tools/build.mjs`
2. `node shared/test-harness/run.mjs games/football --milestone loop-N` must be all green.
3. `node games/football/tools/shots-gpu.mjs review-loop-N --tiers high,medium,low --verify`, then the contact sheets plus `sheets.mjs --compare` against the previous loop.
4. `perf-gpu.mjs`, normal and throttled, writing `reviews/loop-N/perf.json`.
5. **I inspect every shot and crop myself** before review: full-size key frames, sheets for the sweep.
6. `review-prep.mjs N`.
7. **Critics in parallel.** The Claude critic subagent and the Codex critic run at the same time. Their outputs are written to disk only after both return, so neither sees the other's.
8. The advocate subagent rebuts.
9. The judge subagent writes `judge.md`, `scores.json` and `gaps.json`.
10. `review-tally.mjs N` updates HISTORY, applies the stop rule and picks the next backlog.
    - priority = expectedGain × category weight (1.5 when a gated category is below 7) ÷ effort (S=1, M=2, L=4);
    - regressions are forced to the top;
    - dependencies are respected;
    - capacity is about 8 effort points per loop.
11. Implement the selected gaps, commit the code together with `reviews/loop-N/`, and repeat.
    - A phase closes when its acceptance checks pass and the judge leaves no severity-5 gap in its workstream.
    - Every 3 loops, a blind benchmark crop is slipped in to detect reviewer drift.

## Phase 1 (WS1): lighting, post-processing, tiers, shader migration
**Tiers (`tiers.js`).** Two independent settings: `tier` low/medium/high and `detail` 0–2 (the old quality knobs). Settings gain a Medium option, and a saved `'high'` migrates to `'auto'`.
- Quality comes out of `sceneKey` (field3d.js:553), so tier swaps never rebuild the stadium. Materials swap through `userData.mats{low,std}`, crowd and rig sets swap, and the composer toggles. Everything is precompiled with `compileAsync`.
- Auto steps down (as `adaptQuality` does today) and steps up. The step-up uses an offscreen probe on the play-call screen (8 frames, p90 ≤ 9 ms), at most 2 per session, and a tier is blacklisted after it has been stepped down from.
- Allowed effects are stateless only, so idle stops still work: no TAA and no accumulation. Grain only runs while animating, and shadow maps update only on rendered frames.
- `renderer.info.autoReset=false`, with calls split into scene, post and total.

**Shader migration (stadium.js sky 413, pano 396, cone 586, dome 648; models.js palette).**
- Shaders output linear values and end with `#include <tonemapping_fragment>` and `<colorspace_fragment>`, so the same code is right both direct-to-screen (Low) and through the composer and OutputPass (High).
- New `palette-std` variant on MeshStandard: per-slot roughness and metalness, and an HDR emissive lamp slot.
- High uses Neutral tone mapping plus the grading LUT so team colours keep their hue. Low keeps ACES.

**`lights3d.js`.**
- Two shadow-casting directional lights, one per bank. Each uses a 2048² PCFSoft map with an orthographic frustum fitted to the players plus 3 yd and texel-snapped. Medium gets one 1024² caster.
- PMREM environment from the CC0 night HDRI plus the venue's lamp-bank emissive quads.
- Blob shadows stay at 35% as contact shadows. Light pools move out of the turf canvas into a Low-only overlay plane.
- Exposure is set per theme and weather.

**`post3d.js`, High only.** RenderPass (HalfFloat, MSAA×4) → GTAO at half resolution → Bloom → Bokeh during replays (focus on the carrier) → Output → LUT (32³, built by `art-src/lut/make-lut.mjs`) → grain. Glow sprites are hidden at High.

**Acceptance**
- Low captures match the loop-0 baseline (mean delta < 3/255).
- High p95 frame time < 16.7 ms at 1280×800.
- `gfx.builds` doesn't change across Low → High → Low.
- Lighting gains ≥ 1.5 from the judge.
- New `tests/tiers.test.mjs`.

## Phase 2 (WS5): turf and weather (`turf3d.js`, `pack-turf`)
- MeshStandard turf: the canvas map at 1:1, plus a tiling pellet/blade normal map and a roughness detail map.
- Mowing stripes depend on view direction (the shader flips the light and dark bands with the camera angle).
- A `wetness` uniform darkens and smooths the turf, and noise puddles reflect the lamps.
- Splash particles reuse `stepParticles`/`fx3d` (field3d.js:510-551) and fire on foot contacts.
- **Acceptance:** ≤ 1 extra draw call, and R18 shows lamp streaks.

## Phase 3 (WS2): crowd cards (`art-src/blender/crowd/build_crowd.py`, `crowd3d.js`, `pack-crowd`)
**Blender.** 4 body variants from MPFB2 (or the S3 fallback). 16 poses × 2 frames, including band and student-section poses. Rendered in Eevee to a 64×128-cell colour atlas plus a tint mask, as 2048×1024 WebP.

**Runtime.**
- One instanced mesh of Y-locked billboards, placed with the existing `bleacher()` seat generator (stadium.js:312). About 6–10k fans at High and 3–5k at Medium.
- Alpha-to-coverage, the existing `hype` uniform, and a fix for `homeHype`, which is never set today.

**Acceptance:** crowd costs 1–2 draw calls, and the crowd crops read as people at 2×.

## Phase 4 (WS3): players (`art-src/blender/players/*.py`, `players-hd.js`, `pack-players`)
**Blender pipeline.**
- `build_rig.py`: 25 deform bones, now including neck, clavicles, hands, feet and toes.
- `build_body.py`: MPFB2 athletic base plus gear shells: helmet with a swept facemask, pads, cleats, gloves, jersey, pants, socks. The official reuses the body.
- UV atlas, with UV1 for numbers and helmet decals. The decals are drawn from the game's own mascot art.
- `bake.py` (Cycles): normal, ORM and a mask texture (trim, second stripe, decal, cavity) from high-res wrinkle and stitch detail, at 1024².
- Palette slots come from a `_SLOT` vertex attribute plus the mask texture.
- LODs at about 20k, 8k and 2.5k triangles.
- 4 baked sideline poses.
- `export_players.py`: GLB, then gltf-transform (meshopt + quantization, KTX2 or WebP).

**Runtime.**
- `HDRig` implements the `Rig` interface (`group`, `yaw`, `fall`, `setLook`, `pose(s,dt,instant)`, `chestPos`, plus `handPos`). `render3d` (field3d.js:632-643) is otherwise unchanged.
- LOD is picked by projected height (LOD0 > 140 px, LOD1 > 50 px).
- Low keeps `models-data.js` and `Rig` untouched.

**Acceptance:** helmet gloss and a smooth facemask at 4×, jersey wrinkles at 3×, triangle budget held, Art ≥ 7 from the judge.

## Phase 5 (WS4): animation (`build_clips.py`, `anim.js`)
**About 30 keyframed clips, authored by script** with live IK pins, then baked to FK: idle, stances, stance-out, walk/jog/sprint, backpedal, shuffle, cut L/R, block, pass set, rush, throw, catch ×2, carry overlay, tackle, falls ×4, dive, ground idle, get-up, celebrate ×3, kick, punt, snap, handoff. Each clip carries metadata (stride, foot contacts, release/catch/plant events).

**`AnimTrack` per player slot.**
- Maps the sim flags to clip segments using the priority table: kick > throw > down > dive > celebrate > stance > engaged > locomotion. Carry and reach play as upper-body overlays.
- `evaluate(t)` is stateless. Locomotion phase = distance travelled ÷ stride, so replays rebuild the tracks from `F3.rec` and scrub deterministically.
- `AnimationMixer` runs with explicit time and weight per clip (`update(0)`), plus a manual masked layer pass.
- `CCDIKSolver` plants feet during contacts and puts hands on the ball, on LOD0 rigs taller than 140 px only.

**Acceptance:** no foot slide over 0.03 yd within a contact; replay pose equals live pose (< 0.02 rad); throw, catch and tackle beats are legible in the strips.

New `tests/anim.test.mjs`.

## Phase 6 (WS4b): Rapier tackles (High, on demand)
- `pack-rapier` loads on the first tackle. At most 2 ragdolls per play, stepped at a fixed 60 Hz on sim time.
- Blend from powered to limp over 0.25 s. Per-bone transforms are recorded into `F3.rec`, so replays play back the recording and never re-simulate.
- **Fallback, kept regardless:** authored fall variants chosen by hit direction, plus a spring hit-reaction.

## Phase 7 (WS7): Presentation (parallel from Phase 2)
- Fixes the UI, Typography, Readability and Mobile gaps the judge ranks: broadcast scorebug, pre-snap ID boxes, a type scale (Graduate/Oswald), mobile badges, ball readability and phone framing.
- Phone CPU headroom: remove per-frame allocations in `render3d` (the rig spread at line 681, per-pose objects, replay maps).
- Phone target: ≥ 30 fps at 4× throttle on Low and Medium, with a documented 24 fps floor.
- Files: `ui.js`, `field.js`, styles. It doesn't touch the 3D files, so it can run in its own session.

## Budgets
| | Low | Medium | High |
|---|---|---|---|
| index.html | ≤ 2048 KB hard, ≤ 1450 KB target (perf.test.mjs:19 changes from 1300 to 1450) | — | — |
| Packs | none | three-hi ≤ 450 KB, env ≤ 600 KB, turf ≤ 600 KB, crowd ≤ 900 KB, players ≤ 3.5 MB; total ≤ 7 MB | + rapier ≤ 2.5 MB; total ≤ 9.5 MB |
| Draw calls | scene 20–140 (unchanged) | scene ≤ 160, total ≤ 220 | scene ≤ 160, total ≤ 320 |
| Triangles | < 400k | ≤ 500k | scene ≤ 700k; ≤ 1.6M including shadows |
| fps (RTX 5060) | ≥ 55 | ≥ 55 | ≥ 55 at 1280×800 |
| Phone proxy (4× throttle) | ≥ 30 | ≥ 30 (floor 24) | n/a |
| Heap | < 64 MB | < 128 MB | < 192 MB |
| Ready | ≤ 2 s | ≤ 4 s | ≤ 5 s (Low shown until then) |

## Documentation
- `games/football/VISUAL-PLAN-2.md`: this plan plus the spike results.
- `reviews/` (rubric, protocol, briefs, and the per-loop files).
- A v3 section in `VISUAL-REPORT.md`, with scores by loop, perf per tier and remaining gaps.
- `SAMPLES.md` license rows: three addons, meshopt, Basis, Rapier, MPFB2/MakeHuman, the HDRI, gltf-transform, KTX-Software, plus the benchmark additions.
- Credits (`ui.js:244`): replace the stale line.
- Amend PRD AC40 (`PRD.md:259`) to allow optional `assets/pack-*.js`.
- Add lessons to `shared/LESSONS.md`.
- Commit at the end of each phase or loop. No pushing unless you ask.

## Risks (honest)
- **Animation ≥ 7 from scripted clips without mocap is the biggest risk.** A likely outcome is 6–6.5. The mitigations are correct foot contact, IK, overlap, varied falls, and presentation features such as slow motion, replay angles and camera punch-ins.
- **MPFB2 may fail in Blender 5.2 headless.** The fallback is a procedural body, which looks less good.
- **GTAO may be too expensive.** It drops to half resolution or baked AO.
- **Phone 30 fps is already missed today.** The fallback is a documented 24 fps floor.
- If any of these stall the loop, the stagnation rule ends it and the final report lists the remaining gaps.

## Verification (end to end)
- `node games/football/tools/build.mjs --check`: size and pack budgets, plus manifest hashes.
- `node shared/test-harness/run.mjs games/football --milestone loop-N`: all existing tests plus the new packs, tiers and anim tests, at both viewports.
- `node shared/test-harness/run.mjs games/football --gpu --file-url --only tiers`: proves the offline High path.
- `node games/football/tools/shots-gpu.mjs review-loop-N --verify` and `perf-gpu.mjs` (normal and `--throttle 4`): deterministic real-GPU frames and per-tier performance.
- I inspect every frame and crop, then run the four-role review. `review-tally.mjs` produces `HISTORY.md`; the loop finishes when the stop rule is met, and the final judge's report goes into VISUAL-REPORT v3.
