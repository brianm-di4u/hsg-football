// The 3D stadium: turf and markings, goalposts, stands with an instanced crowd and band, press box, light towers
// with haze, scoreboard, sideline teams, the ridge backdrop and sky. World units are yards: x across the field
// (0 = center), y up, z along it (z = 60 - field y, so the user's end zone is at +z, nearest the camera).
import { THREE } from './three-lib.js';
import { W, HASH } from './sim.js';
import { teamDef, contrast, onColor } from './data.js';
import { mascotSprite } from './art.js';
import { modelGeometry, paletteMaterial, setPalette } from './models.js';
import { VENUES } from './venues.js';

export const wx = (fx) => fx - W / 2;
export const wz = (fy) => 60 - fy;

// Seeded hash noise for procedural detail (stable across rebuilds).
function hash(n) { const s = Math.sin(n * 127.1) * 43758.5453; return s - Math.floor(s); }
function noise1(x) { const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f); return hash(i) * (1 - u) + hash(i + 1) * u; }

export function venueFor(g) {
  if (g.neutral) return VENUES.neutral;
  const t = teamDef(g.teams[g.home].id);
  if (VENUES[t.id]) return VENUES[t.id];
  return t.fictional || ['3A', '2A'].includes(t.cls) ? VENUES.small : VENUES.medium;
}

// Team color helpers: a readable accent for a given base.
function readable(fg, bg, min = 2) { return contrast(fg, bg) >= min ? fg : onColor(bg); }

// ------------------------------------------------------------------ field surface texture
function fieldTexture(g, venue, theme, big) {
  const PX = big ? 32 : 16;               // pixels per yard
  const X0 = -W / 2 - 8, X1 = W / 2 + 8, Z0 = -68, Z1 = 68;
  const c = document.createElement('canvas');
  c.width = Math.round((X1 - X0) * PX); c.height = Math.round((Z1 - Z0) * PX);
  const x = c.getContext('2d');
  const turf = venue.surface === 'turf';
  const day = theme === 'day';
  const px = (wx_) => (wx_ - X0) * PX, pz = (wz_) => (wz_ - Z0) * PX;
  // apron / sideline area
  x.fillStyle = turf ? '#2C6B3E' : '#355F2F'; x.fillRect(0, 0, c.width, c.height);
  // field of play + end zones: 5-yard mowing (or manufactured) stripes
  for (let fy = 0; fy < 120; fy += 5) {
    const dark = (fy / 5) % 2 === 1;
    x.fillStyle = turf ? (dark ? '#295E37' : '#2F6C3F') : (dark ? '#37612F' : '#406F36');
    x.fillRect(px(wx(0)), pz(wz(fy + 5)), W * PX, 5 * PX + 1);
  }
  // fine grain: blades / rubber infill speckle
  const tile = document.createElement('canvas'); tile.width = tile.height = 256;
  const tx = tile.getContext('2d'), ti = tx.createImageData(256, 256), td = ti.data;
  let seed = 7;
  for (let i = 0; i < td.length; i += 4) {
    seed = (seed * 16807) % 2147483647;
    const n = seed / 2147483647;
    const v = n < 0.5 ? 0 : 255;
    td[i] = v; td[i + 1] = v; td[i + 2] = v; td[i + 3] = Math.abs(n - 0.5) * (turf ? 40 : 70);
  }
  tx.putImageData(ti, 0, 0);
  x.fillStyle = x.createPattern(tile, 'repeat'); x.fillRect(0, 0, c.width, c.height);
  if (!turf) { // natural grass wears between the hashes
    const gr = x.createLinearGradient(px(wx(HASH[0]) - 4), 0, px(wx(HASH[1]) + 4), 0);
    gr.addColorStop(0, 'rgba(110,90,40,0)'); gr.addColorStop(0.5, 'rgba(110,90,40,0.16)'); gr.addColorStop(1, 'rgba(110,90,40,0)');
    x.fillStyle = gr; x.fillRect(px(wx(HASH[0]) - 4), pz(wz(110)), (HASH[1] - HASH[0] + 8) * PX, 100 * PX);
  }
  // end zones in team colors with the school name
  // a home field paints both end zones in the home school's colors: the school name at one end, the mascot at the other
  const homeT = teamDef(g.teams[g.home ?? 0].id);
  for (const [side, fy0] of [[0, 0], [1, 110]]) {
    const t = homeT, col = t.colors;
    x.fillStyle = col.primary; x.globalAlpha = 0.92;
    x.fillRect(px(wx(0)), pz(wz(fy0 + 10)), W * PX, 10 * PX);
    x.globalAlpha = 1;
    // diagonal hash stripes along the inside border
    x.save(); x.beginPath(); x.rect(px(wx(0)), pz(wz(fy0 + 10)), W * PX, 10 * PX); x.clip();
    x.strokeStyle = 'rgba(255,255,255,0.10)'; x.lineWidth = PX * 0.5;
    for (let k = -12; k < 70; k += 2.2) { x.beginPath(); x.moveTo(px(wx(k)), pz(wz(fy0))); x.lineTo(px(wx(k + 10)), pz(wz(fy0 + 10))); x.stroke(); }
    x.restore();
    const label = (side === 1 ? t.short : t.mascot).toUpperCase();
    const fill = venue.endzoneText || (col.secondary === col.primary ? '#FFFFFF' : readable(col.secondary, col.primary, 2));
    x.save();
    x.translate(px(0), pz(wz(fy0 + 5)));
    // readable from the field of play: the top end zone upright for a viewer facing it, the bottom one rotated
    // both end zones read upright from the main camera behind the user's end
    x.font = `900 ${Math.round(PX * 6.2)}px "Arial Black", Impact, "Helvetica Neue", sans-serif`;
    x.textAlign = 'center'; x.textBaseline = 'middle';
    const mw = x.measureText(label).width, maxW = W * PX * 0.86;
    if (mw > maxW) x.scale(maxW / mw, 1);
    x.lineJoin = 'round'; x.lineWidth = PX * 0.7; x.strokeStyle = fill === '#FFFFFF' || fill === '#F4EFE6' ? '#111111' : '#FFFFFF';
    x.strokeText(label, 0, 0); x.fillStyle = fill; x.fillText(label, 0, 0);
    x.restore();
  }
  // midfield mascot (original geometric art from art.js)
  const msz = Math.round(PX * 11);
  const m = mascotSprite(g.teams[g.home].id, msz);
  x.globalAlpha = 0.9; x.drawImage(m, px(0) - msz / 2, pz(0) - msz / 2, msz, msz); x.globalAlpha = 1;
  // field markings, painted (mipmaps keep them visible at any distance): border, goal lines, 5-yard lines,
  // inbounds and hash ticks (NFHS hashes 53'4" from each sideline = W/3), 9-yard marks, the try line
  x.fillStyle = '#F6F6F2';
  const lw = Math.max(2, PX * 0.16);
  const hx = (fx0, fx1, fy) => x.fillRect(px(wx(fx0)), pz(wz(fy)) - lw / 2, (fx1 - fx0) * PX, lw);
  x.fillRect(px(wx(0)) - lw * 1.4, pz(wz(120)) - lw, lw * 1.4, 120 * PX + lw * 2); x.fillRect(px(wx(W)), pz(wz(120)) - lw, lw * 1.4, 120 * PX + lw * 2);
  hx(0, W, 0); hx(0, W, 120);
  for (let fy = 10; fy <= 110; fy += 5) { hx(0, W, fy); if (fy === 10 || fy === 110) { x.fillRect(px(wx(0)), pz(wz(fy)) - lw * 1.2, W * PX, lw * 2.4); } }
  for (let fy = 11; fy < 110; fy++) {
    if (fy % 5 === 0) continue;
    for (const [a, b] of [[0.11, 0.78], [HASH[0] - 0.33, HASH[0] + 0.33], [HASH[1] - 0.33, HASH[1] + 0.33], [W - 0.78, W - 0.11], [8.7, 9.3], [W - 9.3, W - 8.7]]) {
      if ((a === 8.7 || a === W - 9.3) && fy % 10 !== 0 && fy % 5 !== 0) { if (fy % 10 !== 0) continue; }
      hx(a, b, fy);
    }
  }
  hx(W / 2 - 0.5, W / 2 + 0.5, 13); hx(W / 2 - 0.5, W / 2 + 0.5, 107);
  // yard numbers with direction arrows, bottoms toward the sideline
  x.fillStyle = 'rgba(255,255,255,0.93)';
  x.font = `700 ${Math.round(PX * 2.0)}px "Arial Black", Impact, "Helvetica Neue", sans-serif`;
  x.textAlign = 'center'; x.textBaseline = 'middle';
  for (let fy = 20; fy <= 100; fy += 10) {
    const n = fy <= 60 ? fy - 10 : 110 - fy;
    for (const [fx, rot] of [[9, Math.PI / 2], [W - 9, -Math.PI / 2]]) {
      x.save(); x.translate(px(wx(fx)), pz(wz(fy))); x.rotate(rot);
      x.fillText(String(n), 0, 0);
      if (n !== 50) { // arrow toward the nearer goal
        const toward = fy < 60 ? -1 : 1, s = PX * 0.45;
        const ax = (rot > 0 ? -1 : 1) * toward * PX * 1.9;
        x.beginPath(); x.moveTo(ax + Math.sign(ax) * s, 0); x.lineTo(ax, -s * 0.8); x.lineTo(ax, s * 0.8); x.closePath(); x.fill();
      }
      x.restore();
    }
  }
  // NFHS coaching boxes / team areas: a dashed outline between the 25-yard lines outside each sideline
  x.strokeStyle = 'rgba(255,255,255,0.55)'; x.lineWidth = PX * 0.12; x.setLineDash([PX * 0.8, PX * 0.8]);
  for (const s of [-1, 1]) {
    const xs = s * (W / 2 + 2), xe = s * (W / 2 + 6);
    x.strokeRect(px(Math.min(xs, xe)), pz(wz(85)), 4 * PX, 50 * PX);
  }
  x.setLineDash([]);
  // light falloff: the lights pool on the field; the aprons and the corners of the end zones fall off
  if (!day) {
    x.save(); x.globalCompositeOperation = 'multiply';
    const cx = px(0), cy = pz(0), rx = (W / 2 + 9) * PX, rz = 70 * PX;
    x.translate(cx, cy); x.scale(rx / rz, 1);
    const gr = x.createRadialGradient(0, 0, rz * 0.35, 0, 0, rz * 1.05);
    gr.addColorStop(0, '#FFFFFF'); gr.addColorStop(0.62, '#D0D0D0'); gr.addColorStop(0.86, '#8A8A8A'); gr.addColorStop(1, '#5E5E5E');
    x.fillStyle = gr; x.fillRect(-rz * 2, -rz * 2, rz * 4, rz * 4);
    x.restore();
    // brighter pools under each bank of lights
    x.save(); x.globalCompositeOperation = 'screen';
    for (const s of [-1, 1]) for (const fz of [-38, 0, 38]) {
      const gx = px(s * (W / 2 - 6)), gz = pz(fz);
      const pg = x.createRadialGradient(gx, gz, 0, gx, gz, 26 * PX);
      pg.addColorStop(0, 'rgba(255,244,215,0.16)'); pg.addColorStop(1, 'rgba(255,244,215,0)');
      x.fillStyle = pg; x.fillRect(gx - 26 * PX, gz - 26 * PX, 52 * PX, 52 * PX);
    }
    x.restore();
  }
  if (day) { x.fillStyle = 'rgba(255,250,230,0.05)'; x.fillRect(0, 0, c.width, c.height); }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = big ? 8 : 4;
  return { tex, X0, X1, Z0, Z1 };
}

// Field lines as geometry (crisp at any distance): sidelines, end lines, goal lines, 5-yard lines, hashes, ticks.
function lineGeometry() {
  const pos = [];
  const quad = (x0, z0, x1, z1) => { pos.push(x0, 0, z0, x1, 0, z0, x1, 0, z1, x0, 0, z0, x1, 0, z1, x0, 0, z1); };
  const lw = 0.13, hw = W / 2;
  quad(-hw - lw, -60 - lw, -hw, 60 + lw); quad(hw, -60 - lw, hw + lw, 60 + lw);    // sidelines
  quad(-hw, -60 - lw, hw, -60); quad(-hw, 60, hw, 60 + lw);                          // end lines
  for (let fy = 10; fy <= 110; fy += 5) quad(-hw, wz(fy) - lw / 2, hw, wz(fy) + lw / 2);
  quad(-hw, wz(10) - lw * 1.5, hw, wz(10) + lw * 1.5); quad(-hw, wz(110) - lw * 1.5, hw, wz(110) + lw * 1.5); // goal lines (8 in)
  for (let fy = 11; fy < 110; fy++) {
    if (fy % 5 === 0) continue;
    const z = wz(fy);
    for (const fx of [0.11, HASH[0], HASH[1], W - 0.11]) {
      const len = 0.67, cx = wx(fx);
      const x0 = fx < 1 ? cx : fx > W - 1 ? cx - len : cx - len / 2;
      quad(x0, z - 0.055, x0 + len, z + 0.055);
    }
  }
  // try line (3-yard line for NFHS tries): a 1-yard mark at the center
  for (const fy of [13, 107]) quad(-0.5, wz(fy) - 0.055, 0.5, wz(fy) + 0.055);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.computeVertexNormals();
  return g;
}

// ------------------------------------------------------------------ helpers
function merge(geos) {
  let n = 0; for (const g of geos) n += g.attributes.position.count;
  const pos = new Float32Array(n * 3), nrm = new Float32Array(n * 3), col = new Float32Array(n * 3);
  let o = 0;
  for (const g of geos) {
    const gg = g.index ? g.toNonIndexed() : g;
    pos.set(gg.attributes.position.array, o * 3);
    nrm.set(gg.attributes.normal.array, o * 3);
    const c = gg.userData.color || [1, 1, 1];
    for (let i = 0; i < gg.attributes.position.count; i++) col.set(c, (o + i) * 3);
    o += gg.attributes.position.count;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.BufferAttribute(nrm, 3));
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  return g;
}
function boxAt(w, h, d, x, y, z, color, ry = 0) {
  const g = new THREE.BoxGeometry(w, h, d).toNonIndexed();
  if (ry) g.rotateY(ry);
  g.translate(x, y, z);
  g.userData.color = new THREE.Color(color).convertSRGBToLinear().toArray();
  return g;
}
function cylAt(r0, r1, h, x, y, z, color, seg = 8) {
  const g = new THREE.CylinderGeometry(r0, r1, h, seg).toNonIndexed();
  g.translate(x, y + h / 2, z);
  g.userData.color = new THREE.Color(color).convertSRGBToLinear().toArray();
  return g;
}
function glowTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const x = c.getContext('2d');
  const gr = x.createRadialGradient(64, 64, 0, 64, 64, 64);
  gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.18, 'rgba(255,248,225,0.55)'); gr.addColorStop(0.5, 'rgba(255,240,210,0.12)'); gr.addColorStop(1, 'rgba(255,240,210,0)');
  x.fillStyle = gr; x.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
export function blobTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const x = c.getContext('2d');
  const gr = x.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(0,0,0,0.55)'); gr.addColorStop(0.6, 'rgba(0,0,0,0.25)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
  x.fillStyle = gr; x.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

// ------------------------------------------------------------------ crowd
// One instanced mesh for every fan: a seated torso and a head. A vertex shader bobs them (time, excitement).
function personGeometry(band) {
  const parts = [];
  const torso = new THREE.BoxGeometry(0.46, 0.62, 0.3).toNonIndexed(); torso.translate(0, 0.62, 0); parts.push([torso, 0]);
  const legs = new THREE.BoxGeometry(0.42, 0.22, 0.42).toNonIndexed(); legs.translate(0, 0.25, -0.12); parts.push([legs, 2]);
  const head = new THREE.OctahedronGeometry(0.17, 0); head.scale(1, 1.15, 1); head.translate(0, 1.08, 0); parts.push([head, 1]);
  if (band) { const hat = new THREE.CylinderGeometry(0.13, 0.14, 0.26, 6).toNonIndexed(); hat.translate(0, 1.3, 0); parts.push([hat, 3]); }
  let n = 0; for (const [g] of parts) n += g.attributes.position.count;
  const pos = new Float32Array(n * 3), nrm = new Float32Array(n * 3), part = new Float32Array(n);
  let o = 0;
  for (const [g, k] of parts) {
    pos.set(g.attributes.position.array, o * 3); nrm.set(g.attributes.normal.array, o * 3);
    part.fill(k, o, o + g.attributes.position.count); o += g.attributes.position.count;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.BufferAttribute(nrm, 3));
  g.setAttribute('part', new THREE.BufferAttribute(part, 1));
  return g;
}

export const crowdUniforms = { time: { value: 0 }, hype: { value: 0 }, homeHype: { value: 0 } };

function crowdMaterial() {
  const mat = new THREE.MeshLambertMaterial({ color: 0xffffff });
  mat.onBeforeCompile = (sh) => {
    sh.uniforms.time = crowdUniforms.time; sh.uniforms.hype = crowdUniforms.hype; sh.uniforms.homeHype = crowdUniforms.homeHype;
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nattribute float part;\nattribute float aPhase;\nattribute vec3 aSkin;\nattribute vec3 aPants;\nuniform float time;\nuniform float hype;\nuniform float homeHype;\nvarying vec3 vTint;')
      .replace('#include <begin_vertex>', `#include <begin_vertex>
        float home = step(0.5, fract(aPhase * 7.0));
        float h = hype + homeHype * home;
        float bob = sin(time * (2.0 + fract(aPhase * 13.0) * 2.0) + aPhase * 40.0) * (0.03 + h * 0.18);
        float stand = h * step(0.35, fract(aPhase * 3.7)) * 0.35;
        transformed.y += max(0.0, bob) + stand;
        vTint = part > 0.5 && part < 1.5 ? aSkin : part > 1.5 && part < 2.5 ? aPants : part > 2.5 ? vec3(0.9) : vec3(1.0);`);
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vTint;')
      .replace('vec4 diffuseColor = vec4( diffuse, opacity );', 'vec4 diffuseColor = vec4( diffuse, opacity );\n#ifdef USE_INSTANCING_COLOR\n#endif');
    sh.fragmentShader = sh.fragmentShader.replace('#include <color_fragment>', '#include <color_fragment>\n diffuseColor.rgb = (vTint.r < 0.99 || vTint.g < 0.99 || vTint.b < 0.99) ? vTint : diffuseColor.rgb;').replace('#include <opaque_fragment>', 'outgoingLight += diffuseColor.rgb * 0.35;\n#include <opaque_fragment>');
  };
  mat.customProgramCacheKey = () => 'crowd1';
  return mat;
}

const SKINS = ['#8D5524', '#C68642', '#E0AC69', '#F1C27D', '#FFDBAC', '#5C3A21', '#A0673D'];
function crowdMesh(seats, palette, band) {
  const geo = personGeometry(band);
  const n = seats.length;
  const mesh = new THREE.InstancedMesh(geo, crowdMaterial(), n);
  const phase = new Float32Array(n), skin = new Float32Array(n * 3), pants = new Float32Array(n * 3);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3(), col = new THREE.Color();
  for (let i = 0; i < n; i++) {
    const st = seats[i];
    q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), st.ry + (hash(i * 3.1) - 0.5) * 0.5);
    const k = 0.92 + hash(i * 5.7) * 0.16;
    s.set(k, k, k); p.set(st.x, st.y, st.z);
    m.compose(p, q, s); mesh.setMatrixAt(i, m);
    col.set(band ? palette[0] : palette[Math.floor(hash(i * 1.37) * palette.length)]).convertSRGBToLinear();
    mesh.setColorAt(i, col);
    phase[i] = (st.home ? 0.0 : 0.5) / 7 + Math.floor(hash(i * 9.1) * 1000) / 7; // fract(phase*7) encodes the side
    phase[i] = (Math.floor(hash(i * 9.1) * 997) + (st.home ? 0.6 : 0.1)) / 7;
    col.set(SKINS[Math.floor(hash(i * 2.3) * SKINS.length)]).convertSRGBToLinear(); skin.set([col.r, col.g, col.b], i * 3);
    col.set(band ? palette[1] || '#111111' : ['#2B3A55', '#3B3B3B', '#5A4A3A', '#22252B'][Math.floor(hash(i * 4.1) * 4)]).convertSRGBToLinear(); pants.set([col.r, col.g, col.b], i * 3);
  }
  geo.setAttribute('aPhase', new THREE.InstancedBufferAttribute(phase, 1));
  geo.setAttribute('aSkin', new THREE.InstancedBufferAttribute(skin, 3));
  geo.setAttribute('aPants', new THREE.InstancedBufferAttribute(pants, 3));
  mesh.instanceMatrix.needsUpdate = true;
  mesh.frustumCulled = false;
  return mesh;
}

// ------------------------------------------------------------------ bleachers
// A stand along one sideline: rows rising away from the field. side: -1 (x < 0) or +1.
function bleacher(side, cfg, seats, home, fill, rng) {
  const geos = [];
  const { rows, len, front, rise = 0.45, depth = 0.95, z0 = 0, base = 1.1 } = cfg;
  const alu = cfg.concrete ? '#A49E92' : '#8C939C', riser = cfg.concrete ? '#7D776C' : '#3C424B';
  for (let r = 0; r < rows; r++) {
    const d = front + r * depth, y = base + r * rise;
    const xc = side * (W / 2 + d);
    geos.push(boxAt(depth, 0.08, len, xc, y, z0, alu));             // seat plank / walkway
    geos.push(boxAt(0.06, rise, len, xc - side * depth / 2, y - rise / 2, z0, riser)); // riser
    for (let k = 0; k < len / 0.62; k++) {
      if (rng() > fill) continue;
      const z = z0 - len / 2 + 0.31 + k * 0.62;
      seats.push({ x: xc + side * 0.05, y: y + 0.04, z, ry: side > 0 ? -Math.PI / 2 : Math.PI / 2, home });
    }
  }
  // back wall, front wall with pads, end walls
  const back = side * (W / 2 + front + rows * depth);
  const topY = base + rows * rise;
  geos.push(prism(side * (W / 2 + front - depth / 2), back, base, topY, z0, len, cfg.concrete ? '#6E695F' : '#2B3038'));
  geos.push(boxAt(0.3, topY + 1.2, len, back, (topY + 1.2) / 2, z0, '#2A2F37'));
  geos.push(boxAt(0.25, base + 0.9, len, side * (W / 2 + front - depth / 2), (base + 0.9) / 2, z0, '#1D2533'));
  for (const e of [-1, 1]) {
    const pts = [];
    geos.push(boxAt(rows * depth, topY, 0.25, side * (W / 2 + front + rows * depth / 2 - depth / 2), topY / 2, z0 + e * len / 2, '#30353D'));
    void pts;
  }
  return { geos, back, topY };
}

// A solid sloped body (front low, back high) under a stand, extruded along the sideline.
function prism(xf, xb, yf, yb, z0, len, color) {
  const z1 = z0 - len / 2, z2 = z0 + len / 2;
  const P = { a: [xf, 0, z1], b: [xb, 0, z1], c: [xb, yb, z1], d: [xf, yf, z1], e: [xf, 0, z2], f: [xb, 0, z2], g: [xb, yb, z2], h: [xf, yf, z2] };
  const quads = [['a', 'b', 'c', 'd'], ['f', 'e', 'h', 'g'], ['e', 'a', 'd', 'h'], ['b', 'f', 'g', 'c'], ['d', 'c', 'g', 'h']];
  const pos = [];
  for (const [p, q, r, s] of quads) pos.push(...P[p], ...P[q], ...P[r], ...P[p], ...P[r], ...P[s]);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.computeVertexNormals();
  g.userData.color = new THREE.Color(color).convertSRGBToLinear().toArray();
  return g;
}

// ------------------------------------------------------------------ backdrop
function ridgeMesh(theme) {
  // Pine-covered Ouachita ridgelines: three rings of noisy hills with a sawtooth treeline, darkest nearest.
  const geos = [];
  const day = theme === 'day';
  const rings = [
    { r: 520, h: 70, k: 0.012, c: day ? '#6F8F8A' : '#1A2333', seg: 260 },
    { r: 380, h: 46, k: 0.02, c: day ? '#4E6E57' : '#121A26', seg: 300 },
    { r: 250, h: 26, k: 0.035, c: day ? '#36523A' : '#0B111A', seg: 360 },
  ];
  for (const [ri, R] of rings.entries()) {
    const pos = [], col = [];
    const cc = new THREE.Color(R.c).convertSRGBToLinear();
    for (let i = 0; i < R.seg; i++) {
      const a0 = (i / R.seg) * Math.PI * 2, a1 = ((i + 1) / R.seg) * Math.PI * 2;
      const hAt = (a) => {
        const t = a * R.r;
        let h = R.h * (0.35 + 0.65 * noise1(t * R.k + ri * 17)) + R.h * 0.25 * noise1(t * R.k * 3.1 + 5);
        h += (hash(Math.floor(t * 0.45) + ri * 1000) * 0.9) * (4 - ri); // tree crowns
        return h;
      };
      const h0 = hAt(a0), h1 = hAt(a1);
      const p = (a, r, y) => [Math.cos(a) * r, y, Math.sin(a) * r];
      const v = [p(a0, R.r, -5), p(a1, R.r, -5), p(a1, R.r, h1), p(a0, R.r, h0)];
      for (const t of [[0, 1, 2], [0, 2, 3]]) for (const j of t) { pos.push(...v[j]); col.push(cc.r, cc.g, cc.b); }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
    geos.push(g);
  }
  const mat = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide, fog: true });
  return geos.map((g) => new THREE.Mesh(g, mat));
}

// The painted night panorama (art-src/sky-ridge.png, via sky-data.js): a cylinder wrapped twice (mirrored),
// fading into the sky dome at the top. field3d.js decodes the image and sets skyArt.tex.
export const skyArt = { tex: null };
function panoMesh(weather) {
  const R = 600, H = (2 * Math.PI * R) / 6;
  const g = new THREE.CylinderGeometry(R, R, H, 64, 1, true);
  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide, transparent: true, depthWrite: false, fog: false,
    uniforms: { map: { value: skyArt.tex }, dim: { value: weather === 'rain' ? 0.55 : weather === 'mist' ? 0.75 : 1.0 } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: 'uniform sampler2D map; uniform float dim; varying vec2 vUv; void main(){ float u = fract(vUv.x * 2.0); u = u < 0.5 ? u * 2.0 : 2.0 - u * 2.0; vec4 c = texture2D(map, vec2(u, vUv.y)); float a = smoothstep(1.0, 0.82, vUv.y); vec3 n = c.rgb * vec3(0.72, 0.78, 1.0); gl_FragColor = vec4(n * dim, a); }',
  });
  const m = new THREE.Mesh(g, mat);
  m.position.y = H / 2 - 268; // the painted ridgeline (mid-image) lands just above the horizon
  m.renderOrder = -2;
  return m;
}

function skyMesh(theme, weather) {
  const day = theme === 'day';
  const top = new THREE.Color(day ? '#4F86C6' : weather === 'rain' ? '#0B0E16' : '#060A1A');
  const mid = new THREE.Color(day ? '#A9C9E8' : weather === 'rain' ? '#1C2230' : '#1B2348');
  const hor = new THREE.Color(day ? '#E8E2CF' : weather === 'rain' ? '#3A3F4A' : '#6A5470');
  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    // a raw shader writes its output unconverted, so hand it sRGB values (THREE.Color stores linear)
    uniforms: { top: { value: top.convertLinearToSRGB() }, mid: { value: mid.convertLinearToSRGB() }, hor: { value: hor.convertLinearToSRGB() } },
    vertexShader: 'varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: 'uniform vec3 top; uniform vec3 mid; uniform vec3 hor; varying vec3 vP; void main(){ float h = clamp(vP.y, -0.1, 1.0); vec3 c = h < 0.12 ? mix(hor, mid, smoothstep(-0.02, 0.12, h)) : mix(mid, top, smoothstep(0.12, 0.6, h)); gl_FragColor = vec4(c, 1.0); }',
  });
  return new THREE.Mesh(new THREE.SphereGeometry(900, 24, 12), mat);
}

function stars() {
  const pos = [];
  for (let i = 0; i < 700; i++) {
    const a = hash(i * 1.7) * Math.PI * 2, e = 0.12 + Math.pow(hash(i * 3.3), 0.8) * 1.3;
    pos.push(Math.cos(a) * Math.cos(e) * 850, Math.sin(e) * 850, Math.sin(a) * Math.cos(e) * 850);
  }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  return new THREE.Points(g, new THREE.PointsMaterial({ color: 0xcfd8ff, size: 1.6, sizeAttenuation: false, fog: false, transparent: true, opacity: 0.8 }));
}

function townLights() {
  // A scatter of warm house and street lights along the lower ridges.
  const pos = [], col = [];
  for (let i = 0; i < 260; i++) {
    const a = hash(i * 7.7) * Math.PI * 2, r = 230 + hash(i * 2.9) * 120;
    pos.push(Math.cos(a) * r, 2 + hash(i * 5.1) * 14, Math.sin(a) * r);
    const w = hash(i * 8.3);
    col.push(1, 0.75 + w * 0.2, 0.45 + w * 0.3);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  return new THREE.Points(g, new THREE.PointsMaterial({ size: 2.2, sizeAttenuation: false, vertexColors: true, fog: false, transparent: true, opacity: 0.85 }));
}

// ------------------------------------------------------------------ scoreboard
export function makeScoreboard() {
  const c = document.createElement('canvas'); c.width = 512; c.height = 224;
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
  const draw = (s) => {
    const x = c.getContext('2d');
    x.fillStyle = '#0B0C10'; x.fillRect(0, 0, 512, 224);
    x.strokeStyle = '#3A3F4A'; x.lineWidth = 6; x.strokeRect(3, 3, 506, 218);
    x.textAlign = 'center'; x.textBaseline = 'middle';
    x.fillStyle = '#F4EFE6'; x.font = '800 30px "Arial Black", Impact, sans-serif';
    x.fillText(s.homeName, 110, 34); x.fillText(s.awayName, 402, 34);
    x.fillStyle = '#FF3B2F'; x.font = '900 92px "Courier New", ui-monospace, monospace';
    x.fillText(String(s.home).padStart(2, ' '), 110, 108); x.fillText(String(s.away).padStart(2, ' '), 402, 108);
    x.fillStyle = '#FFC233'; x.font = '900 52px "Courier New", ui-monospace, monospace';
    x.fillText(s.clock, 256, 70);
    x.font = '800 22px "Arial Black", Impact, sans-serif'; x.fillStyle = '#F4EFE6';
    x.font = '800 18px "Arial Black", Impact, sans-serif';
    x.fillText('QTR', 256, 120); x.fillText('DOWN', 120, 176); x.fillText('TO GO', 256, 176); x.fillText('BALL ON', 392, 176);
    x.fillStyle = '#FFC233'; x.font = '900 34px "Courier New", ui-monospace, monospace';
    x.fillText(String(s.qtr), 256, 148); x.fillText(String(s.down || '-'), 120, 204); x.fillText(String(s.toGo || '-'), 256, 204); x.fillText(String(s.ballOn || '-'), 392, 204);
    x.fillStyle = '#FFC233';
    if (s.poss === 0) { x.beginPath(); x.arc(28, 108, 8, 0, 7); x.fill(); }
    if (s.poss === 1) { x.beginPath(); x.arc(484, 108, 8, 0, 7); x.fill(); }
    tex.needsUpdate = true;
  };
  return { tex, draw };
}

// ------------------------------------------------------------------ build
export function buildStadium(g, opts) {
  const { theme, weather, big, quality = 2 } = opts;
  const day = theme === 'day';
  const venue = venueFor(g);
  const root = new THREE.Group();
  const tag = (o, t) => { o.userData.tag = t; return o; };
  let s = 1234567;
  const rng = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const homeT = teamDef(g.teams[g.home ?? 0].id), awayT = teamDef(g.teams[1 - (g.home ?? 0)].id);
  const homeSide = venue.homeSide; // -1: home stands on the left (x < 0) from the camera, +1 right

  // ground plane well beyond the stands (dark)
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(1400, 1400), new THREE.MeshLambertMaterial({ color: day ? 0x4C5E3C : 0x1C2819 }));
  ground.rotation.x = -Math.PI / 2; ground.position.y = -0.05; root.add(ground);

  // running track (optional) and the field surface
  if (venue.track) {
    const tr = new THREE.Mesh(trackGeometry(), new THREE.MeshLambertMaterial({ color: new THREE.Color(venue.trackColor).multiplyScalar(day ? 1.25 : 1), side: THREE.DoubleSide }));
    tr.position.y = -0.02; root.add(tr);
  }
  const ft = fieldTexture(g, venue, theme, big);
  const fplane = new THREE.Mesh(new THREE.PlaneGeometry(ft.X1 - ft.X0, ft.Z1 - ft.Z0), new THREE.MeshLambertMaterial({ map: ft.tex }));
  fplane.rotation.x = -Math.PI / 2; fplane.position.set((ft.X0 + ft.X1) / 2, 0, (ft.Z0 + ft.Z1) / 2);
  root.add(fplane);
  // crisp geometry lines on top for close-ups; the painted ones carry them at a distance
  const lines = new THREE.Mesh(lineGeometry(), new THREE.MeshLambertMaterial({ color: 0xf6f6f2, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }));
  lines.position.y = 0.012; root.add(lines);

  // goalposts on the end lines
  const yel = '#E8C21C';
  const staticMat = new THREE.MeshLambertMaterial({ vertexColors: true });
  root.userData.posts = [];
  for (const zEnd of [-60.4, 60.4]) {
    const gp = [];
    const out = Math.sign(zEnd);
    if (venue.goalposts === 'h') {
      for (const x of [-3.89, 3.89]) gp.push(cylAt(0.09, 0.09, 3.33, x, 0, zEnd, yel, 8), boxAt(0.5, 2, 0.5, x, 1, zEnd, '#1D2533'));
      gp.push(boxAt(7.78, 0.16, 0.16, 0, 3.33, zEnd, yel));
      for (const x of [-3.89, 3.89]) gp.push(cylAt(0.07, 0.07, 6.5, x, 3.33, zEnd, yel, 8));
    } else { // slingshot
      gp.push(cylAt(0.16, 0.16, 3.0, 0, 0, zEnd + out * 1.8, yel, 10), boxAt(0.6, 2.2, 0.6, 0, 1.1, zEnd + out * 1.8, '#1D2533'));
      gp.push(boxAt(0.18, 0.18, 1.9, 0, 3.0, zEnd + out * 0.95, yel));
      gp.push(boxAt(7.78, 0.16, 0.16, 0, 3.33, zEnd, yel), cylAt(0.1, 0.1, 0.33, 0, 3.0, zEnd, yel, 6));
      for (const x of [-3.89, 3.89]) gp.push(cylAt(0.07, 0.07, 6.7, x, 3.33, zEnd, yel, 8));
    }
    // pylons at the four corners of each end zone
    for (const x of [-W / 2 - 0.15, W / 2 + 0.15]) for (const fz of [zEnd - out * 0.4, zEnd - out * 10.4]) gp.push(boxAt(0.12, 0.5, 0.12, x, 0.25, fz, '#FF6A13'));
    const m = new THREE.Mesh(merge(gp), staticMat); m.userData.endZ = zEnd;
    root.add(m); root.userData.posts.push(m);
  }

  // stands, crowd and band
  const seats = [], bandSeats = [];
  const standGeos = [];
  const sideCfg = (home) => (home ? venue.homeStands : venue.visStands);
  for (const home of [true, false]) {
    const side = home ? homeSide : -homeSide;
    for (const cfg of sideCfg(home)) {
      const dens = quality >= 2 ? 1 : quality === 1 ? 0.75 : 0.45;
      const b = bleacher(side, { ...cfg, concrete: venue.concrete && home }, seats, home, venue.fill * dens * (home ? 1 : venue.visFill ?? 0.8), rng);
      if (home) root.userData.homeBack = b.back; else root.userData.visBack = b.back;
      standGeos.push(...b.geos);
      if (home && cfg.pressBox) {
        const pbx = b.back - side * 2.2, pby = b.topY + 1.6;
        standGeos.push(boxAt(4.4, 3.2, cfg.pressBox, pbx, pby + 1.6, cfg.z0 || 0, '#2E3440'));
        standGeos.push(boxAt(5.0, 0.3, cfg.pressBox + 1, pbx, pby + 3.35, cfg.z0 || 0, '#1A1E25'));
        root.userData.pressBox = { x: pbx - side * 2.21, y: pby + 1.9, z: cfg.z0 || 0, len: cfg.pressBox, side };
      }
    }
  }
  // band block: a few rows near the end of the home stand
  for (let i = seats.length - 1; i >= 0; i--) {
    const st = seats[i];
    if (st.home && st.z > 22 && st.z < 34 && st.y < 4.5) { bandSeats.push(st); seats.splice(i, 1); }
  }
  root.add(tag(new THREE.Mesh(merge(standGeos), staticMat), 'stands'));
  const hc = homeT.colors, ac = awayT.colors;
  const homePal = [hc.primary, hc.secondary, hc.primary, hc.secondary, '#F4EFE6', '#1E2430', hc.primary, '#4A4F5A'];
  const awayPal = [ac.primary, ac.secondary, ac.primary, '#F4EFE6', '#1E2430', '#4A4F5A'];
  const homeSeats = seats.filter((q) => q.home), awaySeats = seats.filter((q) => !q.home);
  if (homeSeats.length) root.add(tag(crowdMesh(homeSeats, homePal, false), 'crowd'));
  if (awaySeats.length) root.add(tag(crowdMesh(awaySeats, awayPal, false), 'crowd'));
  if (bandSeats.length) root.add(tag(crowdMesh(bandSeats, [hc.primary, hc.secondary === '#111111' ? '#F4EFE6' : hc.secondary], true), 'crowd'));

  // light towers: Blender model, lamps facing the field
  const towerGeo = modelGeometry('tower', 1.0936);
  const towerMat = paletteMaterial({ rim: 0 });
  setPalette(towerMat, { steel: day ? '#9AA3AD' : '#5B636D', housing: '#2B2F35', lamp: day ? '#E9EEF2' : '#FFF4DC' });
  const glowTex = glowTexture();
  const lamps = [];
  for (const t of venue.towers) {
    const m = new THREE.Mesh(towerGeo, towerMat);
    m.position.set(t[0], 0, t[1]);
    m.rotation.y = Math.atan2(-t[0], -t[1] * 0.4); // the lamps face the model's +Z: aim them at the field
    root.add(m);
    m.updateMatrixWorld();
    const top = new THREE.Vector3(0, 28.4, 0.6).applyMatrix4(m.matrixWorld);
    lamps.push(top);
    if (!day) {
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: 0xfff1d0, transparent: true, opacity: 0.95, depthWrite: false, blending: THREE.AdditiveBlending, fog: false }));
      sp.position.copy(top); sp.scale.set(40, 30, 1); sp.userData.tag = 'glow'; root.add(sp);
      const core = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: 0xffffff, transparent: true, opacity: 1, depthWrite: false, blending: THREE.AdditiveBlending, fog: false }));
      core.position.copy(top); core.scale.set(12, 9, 1); core.userData.tag = 'glow'; root.add(core);
    }
  }
  root.userData.lamps = lamps;

  // haze cones from each tower toward the field (night only)
  if (!day && quality >= 2) {
    const coneMat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, fog: false,
      uniforms: { k: { value: weather === 'rain' ? 0.12 : weather === 'mist' ? 0.15 : 0.085 } },
      vertexShader: 'varying float vY; varying vec3 vN; varying vec3 vV; void main(){ vY = uv.y; vec4 mv = modelViewMatrix * vec4(position,1.0); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }',
      fragmentShader: 'uniform float k; varying float vY; varying vec3 vN; varying vec3 vV; void main(){ float f = pow(abs(dot(vN, vV)), 1.5); gl_FragColor = vec4(vec3(1.0,0.96,0.86) * k * f * smoothstep(0.0, 1.0, vY), 1.0); }',
    });
    for (const top of lamps) {
      const target = new THREE.Vector3(top.x * 0.25, 0, top.z * 0.75);
      const len = top.distanceTo(target);
      const cone = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 22, len, 20, 1, true), coneMat);
      cone.position.copy(top).add(target).multiplyScalar(0.5);
      cone.lookAt(target); cone.rotateX(-Math.PI / 2);
      cone.userData.tag = 'cone'; root.add(cone);
    }
  }

  // scoreboard behind the far end zone
  const sb = makeScoreboard();
  const se = venue.scoreboardEnd, sbz = se * (60 + venue.scoreboardBack);
  const board = new THREE.Mesh(new THREE.PlaneGeometry(16, 7), new THREE.MeshBasicMaterial({ map: sb.tex, fog: false, toneMapped: false }));
  const sbx = 22;
  board.position.set(sbx, 10.5, sbz); if (se > 0) board.rotation.y = Math.PI; root.add(board);
  const frame = merge([boxAt(17, 8, 0.6, sbx, 10.5, sbz + se * 0.35, '#1B1E24'), boxAt(0.5, 7, 0.5, sbx - 5, 3.5, sbz + se * 0.4, '#3A3F48'), boxAt(0.5, 7, 0.5, sbx + 5, 3.5, sbz + se * 0.4, '#3A3F48'),
    boxAt(17, 1.6, 0.4, sbx, 15.3, sbz + se * 0.3, homeT.colors.primary)]);
  root.add(new THREE.Mesh(frame, staticMat));
  // a big gym behind one end zone (Wolf Arena at Wolf Stadium)
  if (venue.arena) {
    const az = venue.arena.end * 112;
    const fz = az - venue.arena.end * 22.1;
    const ag = [boxAt(70, 15, 44, 0, 7.5, az, day ? '#9A8E80' : '#5E5650'), boxAt(72, 1.2, 46, 0, 15.4, az, '#2B2E35'), boxAt(70, 0.9, 0.3, 0, 12.6, fz, '#E9D9A8'),
      boxAt(18, 5, 0.3, 0, 2.5, fz, '#2A2F38'), boxAt(16, 3.6, 0.35, 0, 2.0, fz, '#3B4A5C'), boxAt(16.4, 0.3, 0.4, 0, 3.9, fz, '#F2D9A0')];
    for (let k = -3; k <= 3; k++) if (k) ag.push(boxAt(3, 1.6, 0.32, k * 9, 8.5, fz, '#E8C98A'));
    root.add(new THREE.Mesh(merge(ag), staticMat));
  }
  // pine woods around the grounds
  if (venue.trees.length) root.add(tag(pines(venue, root.userData, rng, day), 'trees'));

  // windscreen fences behind both end zones (beyond the track bends where there is one), closing the bowl
  const fz = venue.track ? 88 : 72, fenceG = [];
  for (const e of [-1, 1]) {
    fenceG.push(boxAt(150, 2.2, 0.15, 0, 1.1, e * fz, day ? '#2F4F3A' : '#18301F'));
    for (let k = -7; k <= 7; k++) fenceG.push(boxAt(0.12, 2.5, 0.12, k * 10.5, 1.25, e * fz, '#5A6068'));
  }
  root.add(new THREE.Mesh(merge(fenceG), staticMat));
  const berm = [];
  for (const e of [-1, 1]) for (let i = 0; i < 70 * (quality >= 1 ? 1 : 0.5); i++) {
    const xx = -60 + rng() * 120;
    if (Math.abs(xx) < 10 && e < 0 && venue.scoreboardEnd < 0) continue;
    berm.push({ x: xx, y: 0.35, z: e * (fz + 1.2 + rng() * 2.5), ry: e > 0 ? Math.PI : 0, home: rng() < 0.6 });
  }
  if (berm.length) root.add(tag(crowdMesh(berm, [homeT.colors.primary, homeT.colors.secondary, '#F4EFE6', '#2B3A55', awayT.colors.primary], false), 'crowd'));
  // sideline benches
  const benchGeos = [];
  for (const home of [true, false]) {
    const side = home ? homeSide : -homeSide;
    for (let k = 0; k < 3; k++) benchGeos.push(boxAt(0.6, 0.5, 6, side * (W / 2 + 5.2), 0.25, -10 + k * 7, '#30363F'));
  }
  // down box / chains on the visitors' sideline: two rods and the down marker
  root.add(new THREE.Mesh(merge(benchGeos), staticMat));

  // light spill in the humid night air: a soft additive dome over the field
  if (!day && quality >= 1) {
    const domeMat = new THREE.ShaderMaterial({ transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.BackSide, fog: false,
      uniforms: { k: { value: weather === 'clear' ? 0.10 : 0.18 } },
      vertexShader: 'varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: 'uniform float k; varying vec3 vP; void main(){ float h = clamp(vP.y / 160.0, 0.0, 1.0); float r = length(vP.xz) / 260.0; float a = k * (1.0 - h) * (1.0 - h) * smoothstep(1.2, 0.2, r); gl_FragColor = vec4(vec3(0.85, 0.82, 0.9) * a, 1.0); }' });
    const dome = new THREE.Mesh(new THREE.SphereGeometry(240, 24, 10, 0, Math.PI * 2, 0, Math.PI / 2), domeMat);
    dome.scale.set(1, 0.6, 1.3); dome.renderOrder = -1;
    dome.userData.tag = 'dome'; root.add(dome);
  }
  // backdrop
  root.add(tag(skyMesh(theme, weather), 'sky'));
  if (!day && skyArt.tex) root.add(tag(panoMesh(weather), 'pano'));
  else for (const r of ridgeMesh(theme)) root.add(tag(r, 'ridge'));
  // the painted sky has its own stars and town glow; the procedural ones only back up the procedural ridges
  if (!day && !skyArt.tex) { const st = stars(); st.renderOrder = -3; root.add(st); root.add(townLights()); }

  root.userData.scoreboard = sb;
  root.userData.venue = venue;
  root.userData.homeSide = homeSide;
  return root;
}

// Shortleaf pines (instanced cones on trunks) behind the visitor stands and around the ends.
function pines(venue, ud, rng, day) {
  const spots = [];
  const hs = venue.homeSide;
  for (const where of venue.trees) {
    for (let i = 0; i < 260; i++) {
      let x, z;
      if (where === 'vis') { const back = Math.abs(ud.visBack ?? W / 2 + 20); x = -hs * (back + 6 + rng() * 34); z = -110 + rng() * 220; }
      else if (where === 'far') { x = (rng() < 0.5 ? -1 : 1) * (62 + rng() * 40); z = -(80 + rng() * 60); }
      else { x = (rng() < 0.5 ? -1 : 1) * (62 + rng() * 40); z = 84 + rng() * 60; }
      if (Math.abs(x) < W / 2 + 8 && Math.abs(z) < 75) continue;
      spots.push([x, z, 0.7 + rng() * 0.6]);
    }
  }
  const geo = new THREE.ConeGeometry(2.6, 11, 7).toNonIndexed(); geo.translate(0, 8.5, 0);
  const trunk = new THREE.CylinderGeometry(0.3, 0.4, 3.2, 5).toNonIndexed(); trunk.translate(0, 1.6, 0);
  const tg = merge([Object.assign(geo, { userData: { color: new THREE.Color(day ? '#2F5233' : '#0F1F16').convertSRGBToLinear().toArray() } }),
    Object.assign(trunk, { userData: { color: new THREE.Color('#3A2A1E').convertSRGBToLinear().toArray() } })]);
  const m = new THREE.InstancedMesh(tg, new THREE.MeshLambertMaterial({ vertexColors: true }), spots.length);
  const M = new THREE.Matrix4(), q = new THREE.Quaternion(), p = new THREE.Vector3(), sc = new THREE.Vector3();
  spots.forEach(([x, z, k], i) => { sc.set(k, k * (0.85 + hash(i) * 0.4), k); p.set(x, 0, z); M.compose(p, q, sc); m.setMatrixAt(i, M); });
  return m;
}

function trackGeometry() {
  // A 400 m, 8-lane track around the field: two 84.4 m straights and two bends (inner radius 36.5 m).
  const inner = 40.0, wdt = 10.5, seg = 36, half = 46.15;
  const pos = [];
  const ring = (r, a, cz) => [Math.cos(a) * r, 0, cz + Math.sin(a) * r];
  for (const [cz, a0] of [[-half, Math.PI], [half, 0]]) {
    for (let i = 0; i < seg; i++) {
      const a = a0 + (i / seg) * Math.PI, b = a0 + ((i + 1) / seg) * Math.PI;
      const p0 = ring(inner, a, cz), p1 = ring(inner + wdt, a, cz), p2 = ring(inner + wdt, b, cz), p3 = ring(inner, b, cz);
      pos.push(...p0, ...p1, ...p2, ...p0, ...p2, ...p3);
    }
  }
  for (const s of [-1, 1]) {
    const x0 = s * inner, x1 = s * (inner + wdt);
    pos.push(x0, 0, -half, x1, 0, -half, x1, 0, half, x0, 0, -half, x1, 0, half, x0, 0, half);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  const n = new Float32Array(pos.length); for (let i = 1; i < n.length; i += 3) n[i] = 1;
  g.setAttribute('normal', new THREE.BufferAttribute(n, 3));
  return g;
}
