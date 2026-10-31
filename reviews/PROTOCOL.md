# Adversarial review loop: protocol

The v3 visual work (VISUAL-PLAN-2.md) runs as a loop: **build → test → capture → independent critiques → advocate → judge → tally → develop**. This file is the procedure. RUBRIC.md defines the scores and schema.json the output shape.

## Roles

| Role | Who | Sees | Must not see |
|---|---|---|---|
| Critic A | Claude subagent, brief `briefs/critic.md` | this loop's captures, the rubric, the benchmarks, the loop brief | any prior score, the other critic, the advocate and judge files |
| Critic B | Codex (GPT-6.1 Sol) through the `codex:codex-rescue` subagent, brief `briefs/critic.md` plus `briefs/codex-wrapper.md` | same as Critic A | same as Critic A |
| Advocate | Claude subagent, `briefs/advocate.md` | both critiques, the captures, CHANGES.md | HISTORY.md |
| Judge | Claude subagent, `briefs/judge.md` | everything above, plus HISTORY.md and perf.json | — |

The developer (the main session) writes CHANGES.md and inspects every capture before the review. It never edits a reviewer's output.

## Blindness
- The critics run in parallel. Their outputs are held outside the repo (the developer's scratch folder) and copied to `loop-N/critic-claude.md` and `loop-N/critic-codex.md` only after both have returned, so neither can read the other's. The advocate and the judge run one after another and write their own `advocate.md` / `judge.md`.
- The critic brief carries no prior score and no developer opinion of quality. CHANGES.md lists what changed, never how good it is.
- Every third loop, the judge's brief includes one unlabeled benchmark close-up mixed in with the captures, to detect reviewer drift. A judge who scores it more than 1 point away from its anchor sets `"drift": true`, and the loop's scores carry a warning.

## The loop (N = loop number)
1. `node tools/build.mjs`
2. `node shared/test-harness/run.mjs . --milestone loop-N`, which must be all green.
3. `node tools/shots-gpu.mjs review-loop-N --tiers=high,medium,low --verify`
4. `node tools/perf-gpu.mjs --out=reviews/loop-N/perf.json`, then again with `--throttle=4 --tiers=low,medium --viewports=mobile` and the **same** `--out` (it merges rows; a separate file never reaches the brief).
5. The developer opens every frame, close-up and strip, and writes `loop-N/CHANGES.md`.
6. `node tools/review-prep.mjs N` writes `loop-N/brief.md`.
7. Critics A and B in parallel (blind), then the advocate, then the judge (judge.md, with the final JSON block).
8. `node tools/review-tally.mjs N` validates every JSON block, writes `scores.json` and `gaps.json`, updates HISTORY.md, applies the stop rule and prints the ranked backlog for the next loop.
9. Develop the backlog, commit the code together with `reviews/loop-N/`, then go to step 1 with N+1.

## Backlog selection
- **Priority** = expectedGain × weight ÷ effort cost.
  - Weight: 1.5 for a gated category below its gate, 1.0 otherwise, 0.3 once the category is 1 above its gate.
  - Effort cost: S = 1, M = 2, L = 4.
- A category that drops by 0.5 or more since the last loop forces a regression gap to the top.
- A loop takes about 8 effort points. Workstreams whose prerequisite phase isn't done wait (VISUAL-PLAN-2.md, "Order").

## Stop rule
- **Pass:** every gate in RUBRIC.md is met.
- **Stagnation:** from loop 13, a loop whose total doesn't beat the best total so far (the scores have plateaued); before that, a loop where no category rose by 0.5 or more and the total didn't rise. Stop after 2 stagnant loops in a row (from loop 10; was 3).
- **No loop cap** (from loop 10; was 12). Loops run back to back without a pause between them until the pass or stagnation rule fires.

On stop, VISUAL-REPORT.md gets the final scores and the remaining ranked gaps.

## Effects allowed in the renderer (keeps the render-on-demand loop and determinism)
Only stateless effects are allowed: no TAA, no temporal accumulation and no history buffers. Grain is seeded from the frame clock. Captures freeze the clock (`__game.act('clock', ms)`).
