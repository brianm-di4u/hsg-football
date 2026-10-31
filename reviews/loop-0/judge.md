# Judge ruling: loop 0, tier legacy (calibration baseline)

Paths are relative to `games/football/screenshots/review-loop-0/`. Benchmarks are in `games/football/benchmarks/`. I opened every close-up and strip, the four desktop sheets, the mobile sheet, and the full frames R01, R02, R14 and R20. No HISTORY.md exists yet, so there is no trend to apply.

**Verdict: continue.** Only authenticity reaches its gate (6.0, a marginal pass). The other seven categories are 1 to 3 points short.

## Disputed facts: who was right

| Claim | Ruling | Capture checked |
|---|---|---|
| Claude: the tackle replay shows "no contact in any frame" | **Advocate is right.** The white defender is chest-to-chest with #20, who has the ball tucked. Contact happens, but it stays upright, with no wrap, compression or fall. The defect is the missing wrap and fall. | `crops/legacy/R13-carrier`, `strips/legacy/R13` |
| Claude: "TROJANS" runs off the edge as a type clip | **Advocate is right.** It is end-zone paint in the 3D world, not UI type. Removed from typography. | `legacy/mobile/R22` |
| Claude: the press box and stands are black boxes | **Split.** The Wolf Stadium press box has lit windows and a gold trim band. The far stands and the kickoff bowl really are an unlit void. | `crops/legacy/R03-slot_QB`, `legacy/desktop/R01`, `legacy/desktop/R02` |
| Claude: the carrier tag floats over a pile / the ring is offset | **Both partly right.** In the gameplay frame of R10 the ring and plate sit on #44. At speed the ring trails or leads the carrier by about a body length. | `crops/legacy/R11-carrier`, `crops/legacy/R18-turf_26_67_40`, `strips/legacy/R10` frames 2–4 |
| Claude: "no punch-in" | **Advocate is right on the cuts.** There are context cameras for the touchdown and the field goal. No slow motion or particles are visible anywhere. | `legacy/desktop/R14`, `legacy/desktop/R16` |
| Claude: the mobile result banner hides the players | **Advocate is right.** The banner is translucent and covers only trailing players. The pile under "20 KEMP" stays clear. | `legacy/mobile/R12` |
| Codex: "serif descriptions / serif logs" | **Advocate is right.** The descriptions and logs are a humanist sans. The serif and slab shapes are the Courier-style key chips and timestamps, and the result banners. | `legacy/desktop/R14`, `legacy/desktop/R20` |
| Codex: no flight or catch cue | **Advocate is right on the target cue.** A cyan ring marks the intended receiver. The ball itself has no trail. | `legacy/desktop/R08`, `strips/legacy/R09` |
| Codex: keep the ball in the carrier's grip | **Mostly right.** The ball is tucked on runs. It is detached in two places: on the turf at the QB's feet during the drop, and floating above the pile after the tackle. | `crops/legacy/R11-carrier`, `crops/legacy/R07-slot_QB`, `crops/legacy/R12-carrier` |
| Advocate: high-school hashes and padded H-posts | **Confirmed.** The hashes sit at roughly the thirds of the field width, and the H-style posts have black padded bases. | `legacy/desktop/R02`, `legacy/desktop/R14` |

**New finding of my own.** At the line, the center has no hand on the ball: it lies loose under him (#69 in `crops/legacy/R04-slot_C`, and `crops/legacy/R06-slot_C`). The ball is about torso-sized in every close-up. The center snap grip and the QB's hold share one root cause: nothing binds the ball to a hand.

**Capture note (not a gap).** The R07 and R09 strips are shot from the far broadcast camera. The R09 strip also ends before the catch. Neither can show a wind-up, release or catch even if one is animated. From loop 1, review-prep should add a close strip of the QB and receiver and extend R09 to the catch event.

## Category rulings

### Art: 4.0 (Claude 4.5, Codex 3.5; difference 1.0)

The figures are more than the 3 anchor's "boxes for people":
- jointed bodies with a pad silhouette,
- facemask cages,
- pant stripes and numbers,
- striped officials,
- a built scoreboard (`crops/legacy/R01-board`) and a lit press box (`crops/legacy/R03-slot_QB`).

So Codex's 3.5 is too low. They also don't reach the 5 anchor's "clean low-poly":
- **Bodies:** faceted segment joints, box feet and block hands (`crops/legacy/R04-slot_QB`, `crops/legacy/R07-slot_QB`).
- **Rim glow:** a grey fresnel halo washes every body (`crops/legacy/R14-carrier`).
- **Helmet:** as matte as the jersey.
- **Numbers:** mirrored "53", "57", "63" and "92" on visible patch rectangles (`crops/legacy/R04-slot_C`, `crops/legacy/R06-slot_C`).
- **Ball:** larger than a torso.
- **Crowd:** blocks with diamond heads (`crops/legacy/R01-crowd`).

The turf texture and the end-zone paint are good (`crops/legacy/R04-turf_26_67_42`, `legacy/desktop/R14`). That puts art between the anchors but below the midpoint, because the defects are visible in every close-up. Next to axis-3 (about a 7) the gap is large. Claude's 4.5 overweights the turf and paint.

### Lighting & atmosphere: 5.0 (Claude 5.0, Codex 4.5)

The 5 anchor is met:
- a directional key with one soft blob per player (`legacy/desktop/R02`),
- lamp glow and haze cones (`legacy/desktop/R20`),
- a believable painted dusk sky,
- a flat but believable day exposure (`legacy/desktop/R19`).

None of the 7 anchor's items are on screen:
- no cast shadows from the towers,
- no bloom beyond the sprites,
- unlit black stands and an empty kickoff bowl (`legacy/desktop/R01`, `legacy/desktop/R17`),
- dry turf in rain (`crops/legacy/R18-turf_26_67_40` against `crops/legacy/R04-turf_26_67_42`).

The sky is visibly mirror-symmetric (`legacy/desktop/R03`). Codex's 4.5 scores below an anchor the build meets. Against cfb26-3, the missing pieces are the lit bowl and the grounded players.

### Animation & game feel: 4.0 (Claude 4.5, Codex 3.5; difference 1.0)

**What works.** The run cycles read: an extended stride, pumping arms and the ball tucked (`crops/legacy/R11-carrier`, `strips/legacy/R11`). Contact does occur (`crops/legacy/R13-carrier`). Context camera cuts exist (R14, R16). So Codex's 3.5, which sits near the 3 anchor's "no contact", is too low.

**What fails.** Every key beat is missing or broken:
- **Throw:** the ball lies on the turf beside the QB's foot, and he stands straight-legged with no wind-up (`crops/legacy/R07-slot_QB`, `strips/legacy/R07`).
- **Catch:** never shown. The ball is still in the air in frame 8 of `strips/legacy/R09`.
- **Run:** pops from upright straight to a body flat on the turf, with no fall in between (`strips/legacy/R10` frames 5→6).
- **Tackle result:** rigid planks with limbs through other bodies and the ball hanging in the air (`crops/legacy/R12-carrier`).
- **Touchdown:** every player uses the same arms-up pose (`crops/legacy/R14-carrier`).
- **Feel touches:** no slow motion and no particles.

The 5 anchor allows floaty contact and stiff falls. It does not cover a ball detached from the hands or a fall that is skipped entirely. Claude's 4.5 is slightly generous. I score 4.0.

### UI / HUD: 6.0 (Claude 5.5, Codex 6.0)

**Near the 7 anchor:**
- a clean team-colored scorebug,
- numbered receiver shapes with route art, close to axis-1 (`legacy/desktop/R04`, `legacy/desktop/R19`),
- a cyan target ring (`legacy/desktop/R08`),
- a field-goal meter with hierarchy (`legacy/desktop/R16`),
- a context-aware day theme (R19).

**Holding it at 6:**
- **Empty sidebar.** About 28% of the screen holds only SKIP during the kickoff and punt (`legacy/desktop/R01`, `legacy/desktop/R17`).
- **Repeated result.** It appears in the banner, the sidebar header and the log (`legacy/desktop/R12`, `legacy/mobile/R21`).
- **Defensive diagram.** It is a tangle of overlapping red Xs (`legacy/desktop/R05`).
- **Play list.** It is cut off with no scroll affordance (`legacy/desktop/R22`).

The live sidebar does carry the play diagram (R07–R10), as the advocate says.

### Typography: 5.5 (both critics 5.5)

**Faces.** There are four:
- a condensed display face (used consistently in the scorebug, headers, buttons and cards),
- a humanist sans,
- a wide serif in the result banners (`legacy/desktop/R14`, `legacy/desktop/R21`),
- a Courier-style mono for the "Space" chips and timestamps (`legacy/desktop/R20`, `legacy/desktop/R14` sidebar).

**What works.** The numerals read at a glance (`legacy/desktop/R04`).

**What fails.** The helper text under the kick meter is tiny (`legacy/desktop/R16`).

Short of the madden26-3 and legendbowl-4 pairing. The corrections to the critics (sans, not serif; world paint, not a type clip) remove items but do not move the score.

### Readability: 5.5 (Claude 5.5, Codex 5.0)

**What works.**
- The line of scrimmage and first-down lines are always clear.
- The carrier plate and ring find the runner in the gameplay frame (`legacy/desktop/R10`).
- The cyan target ring marks the receiver (`legacy/desktop/R08`).
- The oversized ball is findable at the far camera.

**What fails.**
- Players are only about 30–45 px tall on desktop and about 20 CSS px on mobile (`legacy/mobile/R08`).
- The ring detaches from the carrier at speed (`crops/legacy/R11-carrier`).
- The replay has no tag or ring (`strips/legacy/R13`).
- The pass-rush cluster is a knot (`legacy/desktop/R09`).

Only the "players small" half of the 5 anchor applies, so 5.5.

### Mobile: 6.0 (Claude 6.0, Codex 5.5)

**Above the 5 anchor.** The HUD is not cramped:
- a deliberate two-row scorebug,
- full-width thumb buttons (`legacy/mobile/R04`, `legacy/mobile/R10`),
- two-column play cards (`legacy/mobile/R22`).

The phone proxy holds a 165 fps minimum and a 17.9 ms worst p95 at 4× throttle (perf.json), so the 30 fps requirement passes.

**Below the 7 anchor.**
- Figures are about 18–25 CSS px.
- About 28% of the frame is sky and stadium (`legacy/mobile/R04`, `legacy/mobile/R08`).
- The nameplate sits over bodies (`legacy/mobile/R10`).
- No landscape capture exists, so landscape framing earns no credit.

Interpolating gives 6.0. Figure size is the binding item.

### Authenticity: 6.0 (both critics 5.5; advocate 6.0)

This is clearly past "generic football":
- Hot Springs play names and the Ouachita backdrop (`legacy/desktop/R22`, `legacy/desktop/R03`),
- a live high-school scoreboard (`crops/legacy/R01-board`),
- per-school mascot end zones,
- a smaller 3A Jessieville venue with low bleachers (`legacy/desktop/R20`),
- high-school-width hashes (`legacy/desktop/R02`),
- padded H-posts (`legacy/desktop/R14`).

Missing:
- a band,
- a student section,
- cheerleaders,
- a full track ring (only a beige slab at the frame edge in `legacy/desktop/R02`),
- the home grandstand in the kickoff framing (`legacy/desktop/R01`).

About half of the 7 anchor's checklist is on screen, so 6.0. The critics did not cite the hashes and posts. The gate is met, but only just (confidence 0.55).

## Ranked gaps (top 12, merged; ranked by expected gain ÷ effort, with S=1, M=2, L=4)

1. **G-type-system** (typography, WS7, S, +0.75, severity 3).
   - Problem: four faces with no system (`legacy/desktop/R14`, `legacy/desktop/R20`, `legacy/desktop/R16`).
   - Fix: keep the condensed display face for all banners ("TOUCHDOWN!", "+7 YD · FIRST DOWN"), keep the sans for body and log text, and remove the Courier-style mono. Key chips and timestamps use the sans with `font-variant-numeric: tabular-nums`. Set a 12 px minimum for helper text.
   - Test: R14, R21 and R15 render exactly 2 font families, and no text measures under 12 px.
   - Merges Codex G-hud-and-type-hierarchy (type half).
2. **G-cast-shadows-bloom** (lighting, WS1, M, +1.25, severity 5).
   - Problem: blob shadows only, an unlit bowl, no bloom (`legacy/desktop/R02`, `legacy/desktop/R01`, `legacy/desktop/R20`).
   - Fix:
     - shadow maps from 2 tower lights, so every player in R02 shows 2 soft shadows in distinct directions plus a dark contact core at the feet;
     - a restrained UnrealBloom (threshold set so only the lamp heads and white lines bloom);
     - a second light zone for the stands, so the bowl in R01 and R17 shows seat rows instead of near-black.
   - Merges Codex G-stadium-light-grounding.
3. **G-camera-framing** (mobile, WS7, M, +1.0 split mobile/readability, severity 4).
   - Problem: action is small and the mobile frame is spent on scenery (`legacy/mobile/R04`, `legacy/mobile/R08`, `legacy/desktop/R10`).
   - Fix:
     - lower and tighten the live camera so the median player height is ≥ 60 px on desktop and ≥ 40 CSS px on 390 px portrait;
     - keep sky and stadium to ≤ 15% of the portrait frame;
     - cap nameplate size and offset it above the head;
     - add an authored landscape layout and a landscape capture.
   - Merges Claude G-camera-framing, Codex G-live-action-readability and Codex G-portrait-action-scale.
4. **G-helmet-gloss-rim** (art, WS3, S, +0.5, severity 4).
   - Problem: a matte helmet the same finish as the jersey, and a grey fresnel halo washing every body (`crops/legacy/R14-carrier`, `crops/legacy/R04-slot_QB`).
   - Fix:
     - clamp the rim term (rim contribution ≤ 15% of albedo);
     - give the helmet a glossy specular material (roughness ≤ 0.25, clearcoat if Physical) with a lamp highlight;
     - keep the jersey at roughness ≥ 0.8.
   - Test: in `crops/legacy/R04-slot_QB`, the helmet shows a specular highlight and the jersey shoulders keep their team color instead of grey-white.
   - Split out of G-player-mesh-materials as the cheap part of the axis-3 gloss-against-matte item.
5. **G-decal-ball-fixes** (art, WS3, S, +0.5, severity 3).
   - Problem: mirrored numbers on visible patch quads, and a ball about the size of a torso (`crops/legacy/R06-slot_C`, `crops/legacy/R04-slot_C`, `crops/legacy/R12-carrier`).
   - Fix: correct the decal UV winding on the chest and shoulders, and bake the numbers into the jersey texture so no patch rectangle shows. Render the ball at regulation size (about 0.28 m long) in all close and replay cameras, with any far-camera enlargement limited to the broadcast camera.
   - Test: "63" and "92" read correctly in R06-slot_C, and the ball is under a forearm in length in R04-slot_C.
   - Merges Claude G-mirrored-numbers and G-ball-scale.
6. **G-play-markers** (readability, WS7, S, +0.5, severity 3).
   - Problem: the carrier ring detaches at speed, the replay has no markers, and the ball has no trail (`crops/legacy/R11-carrier`, `crops/legacy/R18-turf_26_67_40`, `strips/legacy/R13`).
   - Fix: update the ring from the carrier's root each render frame, not each sim tick, so the ring center sits within 0.3 m of the pelvis. Keep the ring and plate during replays. Add a short light trail on the ball in flight at the broadcast camera.
   - Test: across every frame of the R10 and R11 strips the ring contains the carrier's feet, and the R13 strip shows the plate.
7. **G-ball-hand-throw-catch** (animation, WS4, M, +0.75, severity 5).
   - Problem: the ball is on the turf beside the QB during the drop, the center has no hand on the ball, there is no wind-up, and no catch is shown (`crops/legacy/R07-slot_QB`, `crops/legacy/R04-slot_C`, `strips/legacy/R07`, `strips/legacy/R09`).
   - Fix:
     - attach the ball to a hand socket for the snap grip, the QB's two-hand hold through the drop, the throw and the receiver's catch;
     - add keyed poses for set, wind-up (elbow back, torso turned), release and follow-through;
     - add a catch reach and secure;
     - add a planted lean on cuts;
     - vary the touchdown celebrations (at least 3 poses).
   - Test: in `crops/legacy/R07-slot_QB` the ball is within 0.15 m of a hand, and a close QB strip shows the wind-up and release frames.
   - Merges Claude G-contact-beats (throw/catch half) and Codex G-weight-and-ball-coordination.
8. **G-ui-panel-hygiene** (ui, WS7, M, +0.75, severity 3).
   - Problem: an empty kickoff and punt sidebar, the result shown 2–3 times, a tangled defensive diagram, a clipped play list (`legacy/desktop/R01`, `legacy/desktop/R12`, `legacy/desktop/R05`, `legacy/desktop/R22`).
   - Fix:
     - collapse the sidebar during the kickoff and punt so the field takes the full width, or fill it with a drive summary;
     - show the result in the field banner only and drop the duplicate sidebar header;
     - draw the defensive diagram as one assignment per defender with no overlapping glyphs;
     - fit 10 plays in two columns, or show a visible scroll affordance.
   - Merges Codex G-hud-and-type-hierarchy (layout half).
9. **G-hs-staging** (authenticity, WS2, M, +0.75, severity 3).
   - Problem: no band, student section, cheerleaders or track, and the kickoff framing is a void (`legacy/desktop/R01`, `legacy/desktop/R02`, `crops/legacy/R01-crowd`).
   - Fix:
     - add a full red or tan running track ring with lane lines around the field;
     - add a uniformed band block (one shirt color plus instrument glints) and a student section in school color at the 50 of the home side;
     - add 6–8 cheerleaders on the track and a chain crew on the visitor sideline;
     - aim the kickoff and punt camera so the home grandstand fills the upper third.
   - Merges Codex G-school-crowd-staging (staging half).
10. **G-tackle-contact-falls** (animation, WS4b, L, +1.0, severity 5).
    - Problem: contact stays upright, the fall is skipped and bodies interpenetrate (`crops/legacy/R13-carrier`, `strips/legacy/R10`, `crops/legacy/R12-carrier`).
    - Fix:
      - a paired wrap pose at contact (the defender's arms around the carrier's waist);
      - a 3–5-frame fall blended through ragdoll or a physics-driven pose, with turf collision (no vertex below y=0) and capsule separation between bodies;
      - the ball stays in the carrier's arm until whistle and settle.
    - Test: the R10 strip shows at least 2 falling frames between contact and "NO GAIN", and R12-carrier shows no limb inside another body and no floating ball.
    - Merges Claude G-contact-beats (tackle half) and Codex G-contact-resolution.
11. **G-player-mesh** (art, WS3, L, +1.0, severity 5).
    - Problem: segmented faceted limbs, box feet, block hands, a "mohawk" helmet stripe and identical builds (`crops/legacy/R04-slot_QB`, `crops/legacy/R03-slot_QB`, `crops/legacy/R16-slot_K`).
    - Fix: a continuous skinned body (6–10k triangles) with gloves, cleats, a shoulder-pad shell and a modelled facemask, plus 3 body types (line, skill, QB/K). Use a MeshStandard jersey with a normal map for folds, and flatten the helmet stripe onto the shell.
    - Test: no visible segment seams at the shoulders, elbows or knees in R04-slot_QB.
    - Merges Claude G-player-mesh-materials (minus item 4) and Codex G-player-construction.
12. **G-crowd-figures** (art, WS2, M, +0.5, severity 4).
    - Problem: the crowd is orange, white and black blocks with diamond heads, the trees are black cones, and the bleachers have no rows (`crops/legacy/R01-crowd`, `crops/legacy/R13-carrier`, `legacy/desktop/R15`).
    - Fix: replace the box crowd with instanced low-poly or impostor people (a head, torso and arms silhouette, skin-tone variety, 4+ poses), give the bleachers visible rows, aisles and railings, and swap the black cones for textured tree cards.
    - Test: individual heads and shoulders read in R01-crowd.
    - Merges Claude G-crowd-and-venue.

**Below the cut line**, valid but lower gain ÷ effort:
- **G-rain-wet-turf** (WS5, M, +0.5, severity 2). Rain shows only in rain games.
- **G-sky-mirror** (WS1, S, +0.25, severity 2). Replace the mirrored panorama with a non-mirrored 360° painting.

```json
{"loop":0,"role":"judge","tier":"legacy","scores":{"art":{"score":4.0,"confidence":0.75,"evidence":[{"shot":"crops/legacy/R04-slot_C","note":"faceted segment joints, block hands, mirrored 53/57 on patch boxes, torso-sized ball; facemask cages and pad silhouette lift it above the 3 anchor"},{"shot":"crops/legacy/R14-carrier","note":"grey fresnel halo on every body; helmet as matte as the jersey"},{"shot":"crops/legacy/R06-slot_C","note":"mirrored 63 and 92"},{"shot":"crops/legacy/R01-crowd","note":"crowd is blocks with diamond heads"},{"shot":"crops/legacy/R03-slot_QB","note":"consistent style across players and officials; press box with lit windows"},{"shot":"crops/legacy/R04-turf_26_67_42","note":"turf texture holds at field level"}]},"lighting":{"score":5.0,"confidence":0.75,"evidence":[{"shot":"legacy/desktop/R02","note":"directional key with one soft blob per player; no tower shadows; dark bowl"},{"shot":"legacy/desktop/R20","note":"lamp glow and haze cones meet the 5 anchor; stands unlit"},{"shot":"legacy/desktop/R01","note":"kickoff camera shows an unlit green-black void instead of stands"},{"shot":"crops/legacy/R18-turf_26_67_40","note":"rain turf identical to dry turf"},{"shot":"legacy/desktop/R19","note":"flat but believable day exposure"}]},"animation":{"score":4.0,"confidence":0.7,"evidence":[{"shot":"strips/legacy/R11","note":"run cycle reads; cut has no visible plant or lean"},{"shot":"crops/legacy/R11-carrier","note":"extended stride, arms pumping, ball tucked"},{"shot":"crops/legacy/R07-slot_QB","note":"ball on the turf beside the QB's foot during the drop; no wind-up"},{"shot":"strips/legacy/R09","note":"ball still in flight at frame 8; catch never shown"},{"shot":"strips/legacy/R10","note":"pops from upright to a body flat on the turf between frames 5 and 6"},{"shot":"crops/legacy/R13-carrier","note":"upright body-to-body contact with no wrap or fall"},{"shot":"crops/legacy/R12-carrier","note":"plank falls, limb interpenetration, floating ball"}]},"ui":{"score":6.0,"confidence":0.7,"evidence":[{"shot":"legacy/desktop/R04","note":"clean scorebug; numbered receiver shapes and route art close to axis-1"},{"shot":"legacy/desktop/R16","note":"field-goal meter with hierarchy"},{"shot":"legacy/desktop/R01","note":"sidebar empty apart from SKIP during the kickoff"},{"shot":"legacy/desktop/R12","note":"result repeated in banner, sidebar and log"},{"shot":"legacy/desktop/R05","note":"tangled defensive diagram"},{"shot":"legacy/desktop/R22","note":"play list cut off with no scroll affordance"}]},"typography":{"score":5.5,"confidence":0.7,"evidence":[{"shot":"legacy/desktop/R14","note":"wide serif TOUCHDOWN! banner against the condensed HUD face; Courier-style Space chip"},{"shot":"legacy/desktop/R20","note":"condensed headers and sans description; Courier-style key chip"},{"shot":"legacy/desktop/R16","note":"tiny helper text under the kick meter"},{"shot":"legacy/desktop/R04","note":"scorebug numerals read at a glance"}]},"readability":{"score":5.5,"confidence":0.65,"evidence":[{"shot":"legacy/desktop/R10","note":"carrier plate and ring on #44 in the gameplay frame; players about 30-45 px"},{"shot":"legacy/desktop/R08","note":"LOS and first-down lines clear; cyan target ring on the receiver"},{"shot":"crops/legacy/R11-carrier","note":"ring a body-length off the carrier at speed"},{"shot":"strips/legacy/R13","note":"replay has no tag or ring"},{"shot":"legacy/mobile/R08","note":"figures about 20 CSS px"}]},"mobile":{"score":6.0,"confidence":0.6,"evidence":[{"shot":"legacy/mobile/R04","note":"deliberate portrait layout with large thumb buttons; about 28% of frame is sky/stadium"},{"shot":"legacy/mobile/R22","note":"two-column play cards readable"},{"shot":"legacy/mobile/R10","note":"nameplate over bodies; figures small"},{"shot":"legacy/mobile/R12","note":"translucent banner clears the pile"}]},"authenticity":{"score":6.0,"confidence":0.55,"evidence":[{"shot":"legacy/desktop/R02","note":"high-school-width hashes; beige slab is the only hint of a track"},{"shot":"legacy/desktop/R14","note":"padded H-style goalposts; school end-zone paint"},{"shot":"crops/legacy/R01-board","note":"live high-school-scale scoreboard"},{"shot":"legacy/desktop/R20","note":"smaller 3A Jessieville venue with low bleachers"},{"shot":"legacy/desktop/R22","note":"Hot Springs place-name playbook"},{"shot":"crops/legacy/R01-crowd","note":"no band, student section or cheer"}]}},"gaps":[{"id":"G-type-system","category":"typography","expectedGain":0.75,"severity":3,"effort":"S","workstream":"WS7","evidence":["legacy/desktop/R14","legacy/desktop/R20","legacy/desktop/R16"],"benchmark":"madden26-3","fix":"Condensed display face for all banners, sans for body/log, remove the Courier-style mono (key chips and timestamps in the sans with tabular-nums), 12 px minimum. Test: R14/R21/R15 render exactly 2 font families and no text under 12 px."},{"id":"G-cast-shadows-bloom","category":"lighting","expectedGain":1.25,"severity":5,"effort":"M","workstream":"WS1","evidence":["legacy/desktop/R02","legacy/desktop/R01","legacy/desktop/R20"],"benchmark":"cfb26-3","fix":"Shadow maps from 2 tower lights so each player in R02 shows 2 soft shadows in distinct directions plus a contact core; restrained UnrealBloom (lamp heads and lines only); a second light zone for the stands so the R01/R17 bowl shows seat rows instead of near-black."},{"id":"G-camera-framing","category":"mobile","expectedGain":1.0,"severity":4,"effort":"M","workstream":"WS7","evidence":["legacy/mobile/R04","legacy/mobile/R08","legacy/desktop/R10"],"benchmark":"retrobowl-1","fix":"Lower/tighten the live camera to a median player height of >=60 px desktop and >=40 CSS px at 390 px portrait; sky/stadium <=15% of the portrait frame; cap and offset nameplates above heads; author a landscape layout and add a landscape capture."},{"id":"G-helmet-gloss-rim","category":"art","expectedGain":0.5,"severity":4,"effort":"S","workstream":"WS3","evidence":["crops/legacy/R14-carrier","crops/legacy/R04-slot_QB"],"benchmark":"axis-3","fix":"Clamp the fresnel rim term to <=15% of albedo; helmet material roughness <=0.25 (clearcoat if Physical) with a lamp highlight; jersey roughness >=0.8. Test: R04-slot_QB helmet shows a specular highlight and shoulders keep team color."},{"id":"G-decal-ball-fixes","category":"art","expectedGain":0.5,"severity":3,"effort":"S","workstream":"WS3","evidence":["crops/legacy/R06-slot_C","crops/legacy/R04-slot_C","crops/legacy/R12-carrier"],"benchmark":"axis-3","fix":"Fix chest/shoulder decal UV winding and bake numbers into the jersey texture (no patch quad); regulation-size ball (~0.28 m) in close and replay cameras, enlargement only at the broadcast camera. Test: 63 and 92 read correctly in R06-slot_C; ball shorter than a forearm in R04-slot_C."},{"id":"G-play-markers","category":"readability","expectedGain":0.5,"severity":3,"effort":"S","workstream":"WS7","evidence":["crops/legacy/R11-carrier","crops/legacy/R18-turf_26_67_40","strips/legacy/R13"],"benchmark":"legendbowl-2","fix":"Update the carrier ring from the carrier's root every render frame (center within 0.3 m of pelvis); keep ring and plate in replays; short light trail on the ball in flight. Test: ring contains the carrier's feet in every R10/R11 strip frame; R13 strip shows the plate."},{"id":"G-ball-hand-throw-catch","category":"animation","expectedGain":0.75,"severity":5,"effort":"M","workstream":"WS4","evidence":["crops/legacy/R07-slot_QB","crops/legacy/R04-slot_C","strips/legacy/R07","strips/legacy/R09"],"benchmark":"madden26-4","fix":"Bind the ball to a hand socket for snap grip, QB hold through the drop, throw and catch; keyed set/wind-up/release/follow-through poses; catch reach and secure; planted lean on cuts; at least 3 touchdown celebration poses. Test: ball within 0.15 m of a hand in R07-slot_QB; close QB strip shows wind-up and release."},{"id":"G-ui-panel-hygiene","category":"ui","expectedGain":0.75,"severity":3,"effort":"M","workstream":"WS7","evidence":["legacy/desktop/R01","legacy/desktop/R12","legacy/desktop/R05","legacy/desktop/R22"],"benchmark":"madden26-1","fix":"Collapse the sidebar during kickoff/punt (full-width field) or fill it with a drive summary; show the result only in the field banner; one assignment glyph per defender with no overlap in the defense diagram; fit 10 plays in two columns or show a visible scroll affordance."},{"id":"G-hs-staging","category":"authenticity","expectedGain":0.75,"severity":3,"effort":"M","workstream":"WS2","evidence":["legacy/desktop/R01","legacy/desktop/R02","crops/legacy/R01-crowd"],"benchmark":"cfb26-2","fix":"Full running-track ring with lane lines; uniformed band block and school-color student section at the home 50; 6-8 cheerleaders on the track and a chain crew; aim the kickoff/punt camera so the home grandstand fills the upper third."},{"id":"G-tackle-contact-falls","category":"animation","expectedGain":1.0,"severity":5,"effort":"L","workstream":"WS4b","evidence":["crops/legacy/R13-carrier","strips/legacy/R10","crops/legacy/R12-carrier"],"benchmark":"cfb26-4","fix":"Paired wrap pose at contact; 3-5 frame fall via ragdoll/physics blend with turf collision (no vertex below y=0) and capsule separation between bodies; ball stays in the carrier's arm through settle. Test: R10 strip shows >=2 falling frames before NO GAIN; R12-carrier has no interpenetration or floating ball."},{"id":"G-player-mesh","category":"art","expectedGain":1.0,"severity":5,"effort":"L","workstream":"WS3","evidence":["crops/legacy/R04-slot_QB","crops/legacy/R03-slot_QB","crops/legacy/R16-slot_K"],"benchmark":"axis-3","fix":"Continuous skinned body (6-10k tris) with gloves, cleats, shoulder-pad shell and modelled facemask; 3 body types (line, skill, QB/K); MeshStandard jersey with fold normal map; helmet stripe flattened onto the shell. Test: no segment seams at shoulders, elbows or knees in R04-slot_QB."},{"id":"G-crowd-figures","category":"art","expectedGain":0.5,"severity":4,"effort":"M","workstream":"WS2","evidence":["crops/legacy/R01-crowd","crops/legacy/R13-carrier","legacy/desktop/R15"],"benchmark":"cfb26-1","fix":"Instanced low-poly or impostor people (head/torso/arms silhouette, skin-tone variety, 4+ poses) in place of box figures; bleacher rows, aisles and railings; textured tree cards in place of black cones. Test: individual heads and shoulders read in R01-crowd."}],"verdict":"continue"}
```
