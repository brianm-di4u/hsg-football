Changes since loop 0 (facts only). Captures now cover three quality tiers. Score **High** on desktop; Medium is the phone/mid tier; Low is the v2 look and is captured for regressions.

- **Quality tiers.** Low (v2 look), Medium and High swap materials and features on the built stadium.
  - Medium and High use physically based materials. Per-slot roughness and metalness: glossy helmets, metallic facemasks, matte knit jerseys. The rim glow is reduced.
  - They also get an environment map built from the venue's lamp banks and sky.
- **Shadows.** Real shadow maps: one light bank at Medium, two at High (2048² maps fitted around the players). Blob shadows stay faint as contact shadows.
- **High post-processing.** HDR render with 4× MSAA, ground-contact ambient occlusion (GTAO), bloom on lamps and highlights, depth of field in replays focused on the ball, a 3D-LUT color grade, and fine film grain. The lamp glow sprites are replaced by bloom.
- **Turf (Medium/High).** Detail normal map (blades and infill), mowing stripes that change with view direction, and the night light falloff.
  - In rain: wet turf (darker, lower roughness, puddles that reflect the lamps) and spray at running players' feet.
- **Ball.** Real size in close and replay cameras (Medium/High); still enlarged for the far broadcast cameras.
- **Jersey numbers.** Front numbers are no longer mirrored (all tiers).
- **Type.** One condensed display face (Oswald) for every in-game headline, number, key chip and log timestamp. No monospace and no slab banner face; Graduate remains only on the title logo. Secondary text is 12 px minimum.
- **Cameras.** Live follow is tighter and lower (desktop 37 → 30 yd wide, phone 26 → 21 yd), and the phone pre-snap and live cameras are pitched down for less sky.
- **Replays.** The carrier ring stays on in replays.
- **Unchanged since loop 0** (still the v2 assets): player and official meshes, crowd figures, animation, HUD layout and panels.
