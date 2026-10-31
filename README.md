# Friday Night Spa City

High school football. Part of **Hot Springs Games**, an open-source (MIT) collection of browser games set in
Hot Springs, Arkansas. The game ships as a self-contained `index.html`: art is drawn in code or painted into
`assets/`, sound is synthesized with WebAudio, and nothing loads from the network.

**Visual v3** adds three quality tiers to the 3D stadium:
- **Low** is the original look and needs only `index.html`.
- **Medium** and **High** add physically based lighting, shadows, post-processing, HD Blender players and a card crowd.
- Medium and High load optional classic-script packs from `assets/pack-*.js`, which work from `file://` too.

The visual campaign's scores and remaining gaps are in `VISUAL-REPORT.md` (v3 section).

All games in the collection are original designs. Real places, schools and businesses appear as setting and
history only; no logos are reproduced and nothing implies endorsement. School rosters are fictional.

## Play

Open `index.html` in a browser, or serve the folder (`python -m http.server 8765`) and open http://127.0.0.1:8765/.

## Develop

```bash
npm run setup   # installs Playwright and Chromium for the test harness
npm run build   # regenerates data/, rebuilds index.html from src/ and checks size budgets (edit src/, not index.html)
npm test        # runs tests/*.test.mjs; screenshots land in screenshots/
```

**Build.** `node tools/build.mjs` is the full build:
- three.js core plus the addon pack (needs `cd tools/dev && npm install` once);
- fonts, art, data and packs;
- the inline step and the budget check.

`--blender` also rebuilds the Blender models first.

**Visual review tools.**
- `tools/shots-gpu.mjs`: captures the 22 review moments on a real GPU.
- `tools/perf-gpu.mjs`: measures performance per tier, including a 4× CPU-throttled phone proxy.
- `tools/review-prep.mjs` and `tools/review-tally.mjs`: run the adversarial review loop described in `reviews/PROTOCOL.md`.

The benchmark screenshots that the reviews compare against are of other games. They stay local (`benchmarks/` is git-ignored).

Design docs: `PRD.md`, `MECHANICS.md`, `DEV-PLAN.md`, `REPORT.md`, `VISUAL-PLAN.md`, `VISUAL-PLAN-2.md`, `VISUAL-REPORT.md`.

## Vendored from the collection

This repo was split out of the original Hot Springs Games monorepo (kept offline), which holds the full research
corpus, `LESSONS.md` and the session brief. Copies kept here so the game builds and tests on its own:

- `shared/test-harness/`: the Playwright screenshot test runner (`run.mjs`, `art-pack.mjs`, `sheets.mjs`, `gallery.mjs`).
- `shared/tools/inline.mjs`: bundles `src/` into the single-file `index.html`.
- `shared/data/schools.json`: Garland County school facts (fictional rosters).
- `shared/data/trivia-questions.json`: snapshot of the audited trivia bank (`data/questions.json` in [hsg-trivia](https://github.com/brianm-di4u/hsg-trivia)), read by the fact-check tools.

Older docs in this repo refer to monorepo paths such as `games/football/` and `shared/...`; here the game
folder is the repo root.

## License

MIT (see `LICENSE`). Third-party code in `vendor/` keeps its own license.
