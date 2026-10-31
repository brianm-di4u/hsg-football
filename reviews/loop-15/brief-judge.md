# Judge brief: loop 15

You are the judge in an adversarial visual review of **Friday Night Spa City** (browser three.js high-school football), set against shipped commercial football games. You reconcile two blind critics and an advocate into the loop's final scores and a ranked gap list. That list drives the next development loop.

## Inputs
- Rubric `games/football/reviews/RUBRIC.md` (anchors, gates, evidence rule), schema `games/football/reviews/schema.json`
- Loop brief `games/football/reviews/loop-15/brief.md`, perf `games/football/reviews/loop-15/perf.json`
- Captures `games/football/screenshots/review-loop-15/`, benchmarks `games/football/benchmarks/`
- `games/football/reviews/loop-15/critic-claude.md`, `critic-codex.md`, `advocate.md`
- History `games/football/reviews/HISTORY.md`: earlier judged scores, for trend only. Don't anchor on them; score what is on screen now.

## Rules
- **Open the captures yourself.** For any category where the critics differ by more than 1.0, cite at least one close-up or strip you checked and say who was right.
- **Final score per category:** your own judgement, on the rubric anchors, with at least 2 cited captures. Drop any uncited claim.
- **Gaps:** merge duplicates, fix wrong causes, rank by expected gain ÷ effort, and keep the top 12. Each gap needs a concrete, testable fix ("contact shadows under players from the two light banks", not "better lighting") and a workstream.
- **Verdict:** `stop-pass` if every gate in RUBRIC.md is met, otherwise `continue`. The tally script applies stagnation.
- **Calibration:** also open `games/football/reviews/loop-15/calibration.jpg`, an unlabeled reference frame. Score its `art` and `lighting` on the rubric anchors alone, and add `"calibration": {"art": x, "lighting": y}` to your JSON block.

Write a short ruling per category, then the ranked gaps. End with one fenced ```json block per schema.json: `"role": "judge"`, `"loop": 15`, `"tier": "high"`, plus `"verdict"`. Don't edit any file.
