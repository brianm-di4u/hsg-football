Loop 0 is the calibration baseline. The game's visuals are unchanged from the v2 release (three.js r186 3D field view):
- Lambert shading, a hemisphere light plus three directional lights, no shadow maps, no post-processing beyond ACES tone mapping.
- About 1.7k-triangle players with rigid skinning and procedural poses.
- An instanced box-figure crowd.
- Canvas-painted turf with baked light pools, additive haze cones and a painted sky panorama.

Captures are the "legacy" tier: the pre-v3 best quality.

Changes in this loop are test infrastructure only: deterministic gait phase and rain seeding, a frozen render clock for captures, and close-up camera and bounding-box hooks. They have no visual effect in normal play.
