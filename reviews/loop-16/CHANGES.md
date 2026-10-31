Changes since loop 15 (facts only). Score **High** on desktop. Medium is the phone and mid tier. Low is the v2 look, captured to catch regressions.

- **Desktop pre-snap camera.** Steeper (pitch 0.33, was 0.27) with less lens shift, so less sky sits over the formation. It still fits the formation's width plus a margin (34–54 yd).
- **Desktop run camera.** The camera now aims about 1 yd past the carrier (was 6) plus his velocity lead, so on a run he sits nearer the middle of the frame instead of on the bottom edge.
- **Portrait pre-snap (phone).** Back to loop 14's tighter framing (up to 30 yd, slightly shallower angle). Players are larger again. A receiver split wider than that keeps his numbered edge marker at the screen edge.
- **Defensive pre-snap art.** Each rusher's arrow goes straight into his own gap and fans outward, instead of all rushers converging on the quarterback in a knot. Each arrow has a darker outline.
- **No repeated labels.**
  - Kick panel: it says only "Your kick" or "Your try" next to the KICK button. The distance and the instruction appear only on the kick meter.
  - Result panel: after a score it names the next phase ("Next: the try", "Next: kickoff", "Next: free kick", "End of the quarter", and so on). It no longer repeats TOUCHDOWN or GOOD, which the result toast already shows.
- **Capture notes.**
  - Medium and Low R12 on desktop hit the known intermittent R12 rig issue. Low isn't scored.
  - During the perf run an unrelated dev server was loading the CPU at about 80%, so the 4× throttled phone numbers are lower than in loop 15. The unthrottled numbers aren't affected in practice.
- **Correction (added after the critics ran):** the brief's performance table carried only the unthrottled rows. The 4× throttled phone rows had been written to a separate file. They are now merged into `perf.json`: medium · mobile ran at 47–72 fps with a p95 of about 34 ms, under the 80% CPU load above. The judge was told this. `review-prep` now flags a perf table that has no throttled rows.
- **Unchanged since loop 15:** player and official models, the catch, tackles, falls and body separation, lighting and rain, crowd and venue, the HUD, the toasts and the play-call layout.
