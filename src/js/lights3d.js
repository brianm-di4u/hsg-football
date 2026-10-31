// Stadium lighting for the Medium/High tiers: shadow-casting key lights from the two light banks, with their
// shadow cameras fitted each frame around the players, and an image-based environment built from the venue's own
// lamp banks and sky (PMREM), so helmets and wet turf pick up the lights. Low keeps the v2 lights and blob shadows.
import { THREE } from './three-lib.js';

const tmp = new THREE.Vector3(), box = new THREE.Box3();

export function setupShadowLights(F3) {
  const r = F3.renderer;
  r.shadowMap.enabled = true;
  r.shadowMap.type = THREE.PCFShadowMap; // r186: PCF is the soft filter (PCFSoftShadowMap was removed)
  r.shadowMap.autoUpdate = true; // only rendered frames update it (render on demand)
  for (const L of [F3.keyL, F3.keyR]) {
    L.shadow.camera.near = 1; L.shadow.camera.far = 260;
    L.shadow.bias = -0.0006; L.shadow.normalBias = 0.03;
    F3.scene.add(L.target);
    L.userData.dir = L.position.clone().normalize();
  }
}

// Which lights cast at this tier, and at what resolution.
export function applyShadowTier(F3, tier) {
  const cast = { low: [false, false], medium: [true, false], high: [true, true] }[tier];
  const size = tier === 'high' ? 2048 : 1024;
  [F3.keyL, F3.keyR].forEach((L, i) => {
    if (L.castShadow !== cast[i] || L.shadow.mapSize.x !== size) {
      L.castShadow = cast[i];
      if (L.shadow.map) { L.shadow.map.dispose(); L.shadow.map = null; }
      L.shadow.mapSize.set(size, size);
    }
  });
  for (const r of [...F3.rigs, ...F3.refs]) r.mesh.castShadow = tier !== 'low';
  if (F3.ball) F3.ball.castShadow = tier !== 'low';
}

// Fit each casting light's orthographic shadow camera around the visible players (+3 yd), snapped to its texels so
// the shadows don't crawl as the camera follows the play.
export function fitShadows(F3) {
  box.makeEmpty();
  for (const r of [...F3.rigs, ...F3.refs]) if (r.group.visible) box.expandByPoint(r.group.position);
  if (box.isEmpty()) box.set(tmp.set(-10, 0, -10), new THREE.Vector3(10, 0, 10));
  const c = box.getCenter(new THREE.Vector3());
  const half = Math.min(55, Math.max(12, box.getSize(tmp).length() / 2 + 4));
  for (const L of [F3.keyL, F3.keyR]) {
    if (!L.castShadow) continue;
    const cam = L.shadow.camera, texel = (half * 2) / L.shadow.mapSize.x;
    cam.left = -half; cam.right = half; cam.top = half; cam.bottom = -half;
    cam.updateProjectionMatrix();
    // snap the center in light space
    const d = L.userData.dir, right = new THREE.Vector3(0, 1, 0).cross(d).normalize(), up = d.clone().cross(right).normalize();
    const a = Math.round(c.dot(right) / texel) * texel - c.dot(right), b = Math.round(c.dot(up) / texel) * texel - c.dot(up);
    const cc = c.clone().addScaledVector(right, a).addScaledVector(up, b);
    L.target.position.copy(cc);
    L.position.copy(cc).addScaledVector(d, 120);
    L.target.updateMatrixWorld();
  }
}

// Environment map from a tiny scene: the sky gradient plus a bright quad for every lamp bank of this venue.
export function buildEnvironment(F3, lamps, day, weather) {
  if (!F3.pmrem) F3.pmrem = new THREE.PMREMGenerator(F3.renderer);
  const es = new THREE.Scene();
  const top = new THREE.Color(day ? '#4F86C6' : '#0A1024'), hor = new THREE.Color(day ? '#D8DCD2' : weather === 'clear' ? '#3B3446' : '#3A3F4A'), ground = new THREE.Color(day ? '#3A4A2A' : '#0D140C');
  const sky = new THREE.Mesh(new THREE.SphereGeometry(400, 32, 16), new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false,
    uniforms: { top: { value: top }, hor: { value: hor }, ground: { value: ground } },
    vertexShader: 'varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: 'uniform vec3 top; uniform vec3 hor; uniform vec3 ground; varying vec3 vP; void main(){ float h = vP.y; vec3 c = h > 0.0 ? mix(hor, top, smoothstep(0.0, 0.5, h)) : mix(hor, ground, smoothstep(0.0, 0.15, -h)); gl_FragColor = vec4(c, 1.0); }',
  }));
  es.add(sky);
  // the field itself as a big dim green floor (bounce light under helmets and bodies)
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(120, 160).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: new THREE.Color(day ? '#3E7A42' : '#1E4A28').multiplyScalar(day ? 1 : 1.6) }));
  floor.position.y = -0.5; es.add(floor);
  if (!day) {
    const lampMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 0.94, 0.82).multiplyScalar(30), side: THREE.DoubleSide });
    for (const p of lamps) {
      const q = new THREE.Mesh(new THREE.PlaneGeometry(6, 4), lampMat);
      q.position.copy(p); q.lookAt(0, 0, 0); es.add(q);
    }
  }
  const rt = F3.pmrem.fromScene(es, 0.02, 1, 1000);
  es.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); });
  if (F3.envRT) F3.envRT.dispose();
  F3.envRT = rt;
  return rt.texture;
}
