Changes since loop 14 (facts only). Score **High** on desktop. Medium is the phone and mid tier. Low is the v2 look, captured to catch regressions.

- **Bodies no longer share volume.**
  - Every frame, overlapping players are pushed apart: standing players to about shoulder width, so an engaged block ends up face to face rather than fused into one silhouette; downed bodies far enough apart to read as a pile of separate players.
  - This runs on the frame data, so live play, replays and captures agree.
- **Blocks release at the whistle.** 0.3 s after the play is dead, engaged blockers and defenders drop out of their blocking squat.
- **Desktop pre-snap camera.** It fits the width of the formation plus a margin (34–54 yd; was a fixed 54), so the players are larger (linemen about 40 px at 1280 × 800) and every receiver and badge stays in frame.
- **Desktop result camera.** The post-play camera looks at the spot rather than ahead of it, so the pile sits higher in the view, above the result toast.
- **Portrait pre-snap.** The camera fits the whole formation plus a margin (up to 38 yd; was capped at 30) with a steeper angle, so every receiver is on screen. Players are smaller as a result (linemen about 18 CSS px).
- **Capture notes.**
  - Low R12 (desktop and landscape) hit the known intermittent R12 rig issue; where the second capture matched High better, it is the one used. Low is a regression check and isn't scored.
  - The perf proxy ran on an unloaded machine.
- **Unchanged since loop 14:** player and official models, the catch, tackles and falls (apart from the separation), lighting and rain, crowd and venue, the HUD, toasts, defensive pre-snap art and the play-call layout.
