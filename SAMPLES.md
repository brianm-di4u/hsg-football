# Code-sample survey: Friday Night Spa City

The core mechanics here are (1) a fixed-timestep real-time simulation of one football play with 22
moving players, (2) steering for runners, blockers, rushers and coverage, (3) a ratings-driven
resolution of contact, catches and kicks, (4) situational AI play-calling and (5) a seeded RNG for
reproducible plays. There's no permissively licensed JS football *play* simulator worth adapting.
The search found soccer engines, Retro-Bowl "clone" tutorials (excluded on principle) and
statistical sims. So the foundation combines a permissive steering library, a permissive game loop,
a public-domain PRNG, and two reference-only football sims for situational logic.

Downloaded code lives in `reference-samples/` (gitignored). Nothing was installed, built, run or
opened in a browser.

| # | Sample | URL | License | Version read | Verdict |
|---|---|---|---|---|---|
| 1 | js-steering-behaviors (Raoul Harel) | https://github.com/rharel/js-steering-behaviors | **MIT** (LICENSE.txt, © 2015 Raoul Harel) | commit `c019302668bd19185f20dc5617baa650317d2b7a` (2017-05-30) | **Adapt** the seek and pursue formulas (a few lines) |
| 2 | MDN "Anatomy of a video game" | https://developer.mozilla.org/en-US/docs/Games/Anatomy | MDN code samples: CC0 (per MDN's attribution page; prose is CC-BY-SA) | page as of 2026-10-28 | **Adapt** the fixed-tick accumulator pattern |
| 3 | bryc/code PRNGs (mulberry32) | https://github.com/bryc/code/blob/master/jshash/PRNGs.md | **Public domain** (file header) | master, 2026-10-28 | **Adapt** mulberry32 verbatim |
| 4 | ZenGM Football GM game sim | https://github.com/zengm-games/zengm/tree/master/src/worker/core/GameSim.football | **Not open source** (LICENSE.md: "This project is not open source!"; view/run-locally only) | commit `8bacad3401453e8bf03babf729cf7b1242cc7771` (2026-10-28), `index.ts` | **Reference only**: ideas for situational play-calling |
| 5 | fbsim-core | https://github.com/whatsacomputertho/fbsim-core | **GPL-3.0** | commit `3a726317f4c2d9890e70bfc1abfbacff7a4cfe71` (2026-02-13), README only | **Reference only**: the two-tier sim idea |
| 6 | Craig Reynolds, "Steering Behaviors For Autonomous Characters" (GDC 1999) | https://www.red3d.com/cwr/steer/ | paper (no code license) | n/a | **Concepts only**: seek, pursuit, evasion, arrival, separation |

## 1. js-steering-behaviors (MIT): adapt

**What it does well.** Each behavior is a tiny "drive" that returns a steering force. `Seek` is
`desired = unit(target - pos) * speed; force = (desired - velocity) * mass / dt`. `Pursue` seeks a
*predicted* target position (linear extrapolation by a look-ahead time). `Separate` steers toward the
average of nearby repulsion sites, `Arrive` eases to a stop inside a braking radius. That's exactly
what a ball carrier, a pursuing tackler and a route runner need.

**What it does badly here.** It's an object-heavy CommonJS library with a custom vector class and
spatial index. That's too much machinery for 22 agents, and it allocates per call. No "avoid
obstacles ahead" behavior suited to a runner threading defenders.

**Verdict.** Re-implement `seek` and `pursue` as two allocation-free functions on plain `{x,y,vx,vy}`
objects in `src/js/steer.js`, with an attribution comment. Pursuit uses the same "predict, then seek"
idea, with a look-ahead proportional to distance (Reynolds). The runner's evasion (weighted repulsion
from defenders in a forward cone plus a goal-line pull) is our own.

## 2. MDN game loop (CC0): adapt

**Does well.** Schedule rAF first, then run `numTicks = floor((now - lastTick) / tickLength)` fixed
updates, and render once. Updates are the authority on state. It also discusses tab-hidden gaps.

**Does badly.** It renders every frame even when nothing changes, and it doesn't clamp huge gaps
(it only notes them).

**Verdict.** Use the accumulator with a 1/60 s tick, clamp gaps to 0.25 s (a hidden tab just pauses
the play), and add wave 1's **render-on-demand** rule: the rAF loop runs only while a play, camera
pan or effect is live. `step(n)` in the test hooks calls the same `update()` n times.

## 3. mulberry32 (public domain): adapt verbatim

Tiny, fast, seedable 32-bit generator. The author notes it skips some 32-bit values. That doesn't
matter for gameplay. Wrapped as `makeRng(seed)` with `next()`, `int(n)`, `pick(arr)`, `normal()` and
a serializable `state`, so a mid-game save resumes the same sequence.

## 4. ZenGM Football GM (source-available): reference only

**Does well.** Very thorough situational logic in `GameSim.football/index.ts`:
- `probPass()` raises the pass rate in "desperation" (down by N points with little time left).
- `getPlayType()` covers 4th-down decisions, field-goal range, "never punt when losing late",
  kneeling out the clock, and a 2-point decision chart by score margin.

Its ratings → composite factors → outcome pipeline is a good model for a quick sim.

**Does badly (for us).** No spatial simulation: plays are dice rolls over composite ratings, so
there's nothing to watch or steer. It's large (3,100 lines in one file), and its license forbids
reuse.

**Verdict.** No code copied. Our play-caller is written from scratch with the same *kinds* of
situational rules (desperation passing, 4th-down go/kick by field position and score, a simple
2-point rule when down by 2, kneel when leading late). The thresholds are our own.

## 5. fbsim-core (GPL-3.0): reference only

**Does well.** Two tiers: a full play-by-play simulator, and a fast "final score from two team
ratings" simulator for leagues.

**Does badly (for us).** Rust/WASM, statistics fitted to NFL data, GPL.

**Verdict.** Idea only: our season has the same two tiers. The user's games run the spatial sim
(or the user can quick-sim them), and every other league game uses a fast drive-based score model.
No code read beyond the README.

## 6. Reynolds' steering paper: concepts

The vocabulary and the "predict then seek" pursuit, offset pursuit (blockers fitting between rusher
and QB), and separation. Concepts only.

## Side-by-side: what becomes the foundation

| Concern | Taken from | Our version |
|---|---|---|
| Main loop | MDN (2) | fixed 60 Hz tick, render-on-demand, `step(n)` for tests |
| RNG | bryc (3) | mulberry32 with saved state |
| Movement | rharel (1) + Reynolds (6) | `seek`/`pursue` on plain objects, capped acceleration and speed per rating |
| Runner AI | ours | forward pull + repulsion from defenders in a cone + sideline avoidance; the player can steer instead |
| Blocking | Reynolds offset pursuit (6) | blocker seeks a point between the rusher and the protected spot; engaged pairs resolve shed rolls |
| Coverage | ours | man (trail with a lag by coverage rating) and zone (drop to landmark, then pursue the nearest receiver in zone) |
| Play-calling AI | ZenGM ideas (4) | our situational table plus tendencies by difficulty |
| League sim | fbsim idea (5) | drive-based quick sim from team ratings |

## v2 visual overhaul: vendored libraries, fonts, tools and art

| What | Version / source | License | Where | How it ships |
|---|---|---|---|---|
| three.js | `three@0.186.1` from npm (`build/three.module.js`, `build/three.core.js`) | MIT, © 2010-2026 Three.js Authors (`vendor/three/LICENSE`) | `vendor/three/` | `tools/build-three.mjs` tree-shakes it to the classes we use into `src/js/three-lib.js` (≈555 KB), which is inlined |
| Graduate (varsity display face) | `@fontsource/graduate@5.2.5` from npm, latin 400 | SIL OFL 1.1 (`vendor/fonts/LICENSE-graduate.txt`) | `vendor/fonts/` | `tools/build-fonts.mjs` embeds it as base64 in `src/styles/fonts.css` (file:// can't load font files) |
| Oswald (condensed UI face) | `@fontsource/oswald@5.2.5` from npm, latin 500 and 700 | SIL OFL 1.1 (`vendor/fonts/LICENSE-oswald.txt`) | `vendor/fonts/` | same |
| esbuild | `esbuild@0.25.10` from npm | MIT | `tools/dev/` (git-ignored `node_modules`) | build-time only, never shipped |
| Blender 5.2 | local install | GPL (tool only) | `art-src/blender/build_models.py` → `models.blend`, `src/js/models-data.js` | our own meshes, exported as quantized vertex data |
| Painted art | Codex (OpenAI image generation), original prompts, no references | ours | `art-src/*.png` (git-ignored) → `assets/*.webp` (`art-pack.mjs`) | title and pregame art as WebP files; the sky panorama is embedded as a data URL (`tools/build-art.mjs`, because WebGL can't upload file:// images) |

Benchmark screenshots of other games (EA College Football 26, Madden NFL 26, Axis Football 2026, Legend Bowl,
Retro Bowl) were used for the review only. They live in the git-ignored `benchmarks/` folder, and nothing from them
(art, layouts, code) is in the game.
