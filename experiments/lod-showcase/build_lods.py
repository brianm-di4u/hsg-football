# LOD showcase: the same Friday Night Spa City player (Hot Springs home uniform) at six levels of detail, from about 300
# to 100k+ triangles, exported as plain glTF (GLB with PBR materials) that three.js GLTFLoader shows directly.
# Proportions, rest pose and colour slots come from art-src/blender/players/build_hd.py (metres, front = -Y, Z up).
# Detail rises in two ways per level: the same control rings and paths are re-tessellated more finely (Catmull-Rom
# resampling, so the silhouette never drifts between levels), and each level adds parts the one below can't afford.
#
#   "C:\Program Files\Blender Foundation\Blender 5.2\blender.exe" -b --factory-startup --python experiments/lod-showcase/build_lods.py [-- 2 5]
#
# Writes models/L1.glb ... models/L6.glb and models/stats.json (triangles, vertices, primitives, bytes measured from the
# GLB files themselves, plus a per-group triangle breakdown).
import bpy, bmesh, math, os, sys, json, struct
from mathutils import Vector, noise
from mathutils.bvhtree import BVHTree

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, 'models')
NUMBER = '27'

# colour slots: hex (sRGB), roughness, metallic, coat, sheen. Hot Springs home uniform from players3d.js uniformFor()
# (jersey #111111, trim/pants = secondary #D4A017, number fill secondary with a light outline); the facemask is light grey.
COL = {
    'jersey': ('#111111', 0.72, 0.0, 0.0, 0.2), 'trim': ('#D4A017', 0.55, 0.0, 0.0, 0.0), 'pants': ('#D4A017', 0.5, 0.0, 0.0, 0.08),
    'helmet': ('#111111', 0.3, 0.0, 1.0, 0.0), 'mask': ('#D9DCE0', 0.28, 0.65, 0.0, 0.0), 'skin': ('#8D5524', 0.5, 0.0, 0.0, 0.0),
    'shoes': ('#141414', 0.38, 0.0, 0.3, 0.0), 'socks': ('#111111', 0.85, 0.0, 0.0, 0.12), 'glove': ('#1E1E1E', 0.55, 0.0, 0.0, 0.0),
    'number': ('#D4A017', 0.6, 0.0, 0.0, 0.0), 'outline': ('#F4EFE6', 0.6, 0.0, 0.0, 0.0), 'white': ('#F4EFE6', 0.55, 0.0, 0.0, 0.0),
    'stripe': ('#111111', 0.6, 0.0, 0.0, 0.0), 'dark': ('#0A0A0A', 0.7, 0.0, 0.0, 0.0), 'sole': ('#D9DCE0', 0.6, 0.0, 0.0, 0.0),
    'stud': ('#3A3C40', 0.45, 0.2, 0.0, 0.0), 'sclera': ('#D9CFC2', 0.35, 0.0, 0.0, 0.0),
}

# m: segment multiplier on the HD player's segment counts; rpm: loft rings per metre (0 = control rings only);
# cap: dome rings on rounded ends (0 = flat caps); tseg/tpm: tube sides and path points per metre; nres: number curve
# resolution; box: L1 renders every round part as a flat-shaded four-sided prism.
LEVELS = {
    1: dict(m=0.2, rpm=0, cap=0, tseg=3, tpm=0, nres=0, box=True),
    2: dict(m=0.42, rpm=0, cap=0, tseg=4, tpm=10, nres=1, box=False),
    3: dict(m=0.7, rpm=9, cap=1, tseg=5, tpm=22, nres=2, box=False),
    4: dict(m=1.05, rpm=19, cap=2, tseg=6, tpm=36, nres=3, box=False),
    5: dict(m=1.5, rpm=34, cap=3, tseg=8, tpm=55, nres=4, box=False),
    6: dict(m=2.8, rpm=100, cap=5, tseg=12, tpm=110, nres=6, box=False),
}
L, Q, PARTS, MATS = 0, {}, [], {}


def smoothstep(e0, e1, x):
    t = max(0.0, min(1.0, (x - e0) / (e1 - e0)))
    return t * t * (3 - 2 * t)


def srgb_to_linear(h):
    c = [int(h[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    return [x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c]


def material(slot):
    if slot in MATS: return MATS[slot]
    hexc, rough, metal, coat, sheen = COL[slot]
    m = bpy.data.materials.new(slot)
    try: m.use_nodes = True
    except Exception: pass
    b = m.node_tree.nodes.get('Principled BSDF')
    def put(name, v):
        if name in b.inputs: b.inputs[name].default_value = v
    put('Base Color', (*srgb_to_linear(hexc), 1.0)); put('Roughness', rough); put('Metallic', metal)
    if coat: put('Coat Weight', coat); put('Coat Roughness', 0.06)
    # the glTF exporter writes Sheen Tint as sheenColorFactor and drops the weight, so the weight goes into the tint
    if sheen: put('Sheen Weight', 1.0); put('Sheen Roughness', 0.5); put('Sheen Tint', (sheen, sheen, sheen, 1))
    MATS[slot] = m
    return m


# ------------------------------------------------------------------ geometry core
def add(name, bm, slot, group, smooth=True):
    """Store a finished part: vertices, faces (index tuples), per-face smooth flag, sharp edges."""
    bm.verts.index_update()
    rec = dict(name=name, slot=slot, group=group,
               verts=[v.co.copy() for v in bm.verts],
               faces=[tuple(v.index for v in f.verts) for f in bm.faces],
               smooth=[smooth] * len(bm.faces),
               sharp=[(e.verts[0].index, e.verts[1].index) for e in bm.edges if not e.smooth])
    bm.free()
    PARTS.append(rec)
    return rec


def bvh(*recs):
    V, F = [], []
    for r in recs:
        o = len(V); V += r['verts']; F += [tuple(i + o for i in f) for f in r['faces']]
    return BVHTree.FromPolygons(V, F)


def skin(rings, pole0=None, pole1=None, cap0=False, cap1=False, closed=False, disp=None):
    """Bridge rings of equal size (each counter-clockwise around the direction of travel) into a quad surface."""
    bm = bmesh.new()
    loops = [[bm.verts.new(p) for p in r] for r in rings]
    seg = len(rings[0])
    pairs = list(zip(loops, loops[1:])) + ([(loops[-1], loops[0])] if closed else [])
    for a, b in pairs:
        for k in range(seg): bm.faces.new((a[k], a[(k + 1) % seg], b[(k + 1) % seg], b[k]))
    def flat(loop, rev):
        f = bm.faces.new(list(reversed(loop)) if rev else loop)
        for e in f.edges: e.smooth = False
    if not closed:
        if pole0 is not None:
            p = bm.verts.new(pole0)
            for k in range(seg): bm.faces.new((loops[0][(k + 1) % seg], loops[0][k], p))
        elif cap0: flat(loops[0], True)
        if pole1 is not None:
            p = bm.verts.new(pole1)
            for k in range(seg): bm.faces.new((loops[-1][k], loops[-1][(k + 1) % seg], p))
        elif cap1: flat(loops[-1], False)
    if disp:
        bm.normal_update()
        moves = [(v, v.normal.copy() * disp(v.co, v.normal)) for v in bm.verts]
        for v, d in moves: v.co += d
    return bm


def seg_of(k, lo=4):
    if Q['box']: return 6 if k >= 24 else 4
    return max(lo, int(round(k * Q['m'])))


def catmull(p0, p1, p2, p3, t):
    t2, t3 = t * t, t * t * t
    return tuple(0.5 * ((2 * b) + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3)
                 for a, b, c, d in zip(p0, p1, p2, p3))


def resample_rings(R, rpm):
    if rpm <= 0: return list(R)
    out = []
    for i in range(len(R) - 1):
        a, b = R[i], R[i + 1]
        p0 = R[i - 1] if i > 0 else tuple(2 * x - y for x, y in zip(a, b))
        p3 = R[i + 2] if i + 2 < len(R) else tuple(2 * y - x for x, y in zip(a, b))
        n = max(1, int(round(math.dist(a[:3], b[:3]) * rpm)))
        out += [catmull(p0, a, b, p3, s / n) for s in range(n)]
    return out + [R[-1]]


def ellipse(cx, cy, cz, rx, ry, seg):
    ph = math.pi / 4 if Q['box'] else 0.0
    s = 1.25 if Q['box'] else 1.0
    return [Vector((cx + s * rx * math.cos(2 * math.pi * k / seg + ph), cy + s * ry * math.sin(2 * math.pi * k / seg + ph), cz)) for k in range(seg)]


def loft(name, rings, slot, group, k=16, caps=(True, True), dome=(0.0, 0.0), disp=None):
    """rings [(cx, cy, cz, rx, ry)] bottom to top; dome = end-cap heights as a fraction of the end radius (0 = flat)."""
    seg = seg_of(k)
    if Q['box'] and len(rings) > 2:  # L1: first, widest, last
        w = max(range(len(rings)), key=lambda i: rings[i][3] * rings[i][4])
        rings = [rings[i] for i in sorted({0, w, len(rings) - 1})]
    R = resample_rings(rings, Q['rpm'])
    poles = [None, None]
    for end, (i, sgn) in enumerate(((0, -1), (-1, 1))):
        if not caps[end] or not dome[end] or not Q['cap']: continue
        cx, cy, cz, rx, ry = R[i]
        h, n, extra = dome[end] * min(rx, ry), Q['cap'], []
        for j in range(1, n + 1):
            a = j / (n + 1) * math.pi / 2
            extra.append((cx, cy, cz + sgn * h * math.sin(a), rx * math.cos(a), ry * math.cos(a)))
        R = (list(reversed(extra)) + R) if end == 0 else (R + extra)
        poles[end] = Vector((cx, cy, cz + sgn * h))
    bm = skin([ellipse(*r, seg) for r in R], poles[0], poles[1], caps[0], caps[1], disp=disp)
    return add(name, bm, slot, group, smooth=not Q['box'])


def ellipsoid(name, c, r, slot, group, kr=10, ks=18, z0=-1.0, z1=1.0, disp=None):
    n, seg = max(2, int(round(kr * Q['m']))), seg_of(ks)
    if Q['box']: n = 3 if ks >= 24 else 2
    fa, fb = math.acos(-z0), math.acos(-z1)
    rings, pole0, pole1 = [], None, None
    for i in range(n + 1):
        f = fa + (fb - fa) * i / n
        if f < 1e-6: pole0 = Vector((c[0], c[1], c[2] - r[2])); continue
        if f > math.pi - 1e-6: pole1 = Vector((c[0], c[1], c[2] + r[2])); continue
        rings.append(ellipse(c[0], c[1], c[2] - r[2] * math.cos(f), r[0] * math.sin(f), r[1] * math.sin(f), seg))
    bm = skin(rings, pole0, pole1, pole0 is None, pole1 is None, disp=disp)
    return add(name, bm, slot, group, smooth=not Q['box'])


def resample_path(P, n, closed=False):
    P = [tuple(p) for p in P]
    m = len(P)
    if closed:
        pts = []
        for s in range(n):
            u = s / n * m; i = int(u) % m; t = u - int(u)
            pts.append(catmull(P[(i - 1) % m], P[i], P[(i + 1) % m], P[(i + 2) % m], t))
        return [Vector(p) for p in pts]
    pts = []
    for s in range(n):
        u = s / (n - 1) * (m - 1); i = min(int(u), m - 2); t = u - i
        p0 = P[i - 1] if i > 0 else tuple(2 * a - b for a, b in zip(P[0], P[1]))
        p3 = P[i + 2] if i + 2 < m else tuple(2 * b - a for a, b in zip(P[-2], P[-1]))
        pts.append(catmull(p0, P[i], P[i + 1], p3, t))
    return [Vector(p) for p in pts]


def tube(name, pts, r, slot, group, closed=False, ends='flat', seg=None, n=None, lo=2):
    """A round tube along a path (facemask bars, stripes, piping, fingers). r is a radius or a function of t in [0, 1]."""
    length = sum((Vector(b) - Vector(a)).length for a, b in zip(pts, pts[1:])) + ((Vector(pts[0]) - Vector(pts[-1])).length if closed else 0)
    if n is None: n = len(pts) if not Q['tpm'] else max(lo, len(pts) if L >= 4 else 2, int(round(length * Q['tpm'])))
    P = resample_path(pts, max(3 if closed else 2, n), closed)
    seg = seg or Q['tseg']
    rad = r if callable(r) else (lambda t, r=r: r)
    N = len(P)
    T = [(P[(i + 1) % N] - P[(i - 1) % N]).normalized() if closed else (P[min(i + 1, N - 1)] - P[max(i - 1, 0)]).normalized() for i in range(N)]
    if closed:  # roughly horizontal loops: a fixed up vector keeps the seam untwisted
        U = [(t.cross(Vector((0, 0, 1)))).normalized() for t in T]
    else:  # parallel transport
        u = T[0].cross(Vector((0, 0, 1)))
        if u.length < 1e-3: u = T[0].cross(Vector((1, 0, 0)))
        U = [u.normalized()]
        for i in range(1, N):
            u = T[i - 1].rotation_difference(T[i]) @ U[-1]
            U.append((u - T[i] * u.dot(T[i])).normalized())
    def ring(p, t, u, rr):
        v = t.cross(u)
        return [p + (u * math.cos(2 * math.pi * k / seg) + v * math.sin(2 * math.pi * k / seg)) * rr for k in range(seg)]
    rings = [ring(P[i], T[i], U[i], rad(i / max(1, N - 1))) for i in range(N)]
    pole0 = pole1 = None
    if not closed and ends == 'dome' and Q['cap']:
        k = max(1, Q['cap'] // 2)
        for end in (0, 1):
            i = 0 if end == 0 else N - 1
            sgn = -1 if end == 0 else 1
            rr, extra = rad(0 if end == 0 else 1), []
            for j in range(1, k + 1):
                a = j / (k + 1) * math.pi / 2
                extra.append(ring(P[i] + T[i] * sgn * rr * math.sin(a), T[i], U[i], rr * math.cos(a)))
            if end == 0: rings = list(reversed(extra)) + rings; pole0 = P[i] - T[i] * rr
            else: rings = rings + extra; pole1 = P[i] + T[i] * rr
    bm = skin(rings, pole0, pole1, True, True, closed=closed)
    return add(name, bm, slot, group, smooth=not Q['box'])


def number(name, slot, size, mode, centre, tree, off, bold=0.0, ext=0.0, width=0.86):
    """The jersey number as real geometry: Blender's built-in font, filled, projected onto the surface it sits on."""
    cu = bpy.data.curves.new(name, 'FONT')
    cu.body = NUMBER; cu.align_x = 'CENTER'; cu.align_y = 'CENTER'; cu.size = size
    cu.resolution_u = max(1, Q['nres']); cu.offset = bold; cu.extrude = ext; cu.space_character = 0.92
    if ext == 0: cu.fill_mode = 'BOTH'
    ob = bpy.data.objects.new(name, cu); bpy.context.scene.collection.objects.link(ob)
    dg = bpy.context.evaluated_depsgraph_get()
    me = bpy.data.meshes.new_from_object(ob.evaluated_get(dg))
    bm = bmesh.new(); bm.from_mesh(me)
    bpy.data.objects.remove(ob); bpy.data.curves.remove(cu); bpy.data.meshes.remove(me)
    bmesh.ops.triangulate(bm, faces=bm.faces[:])
    if L >= 5:  # long sliver triangles would cut into the curved chest: split them so the projection can follow it
        bmesh.ops.subdivide_edges(bm, edges=bm.edges[:], cuts=1, use_grid_fill=True)
        bmesh.ops.triangulate(bm, faces=bm.faces[:])
    cx, cy, cz = centre
    for v in bm.verts:
        tx, ty, tz = v.co.x * width, v.co.y, v.co.z
        d = tz + ext
        if mode == 'front':
            x, z = cx + tx, cz + ty
            hit = tree.ray_cast(Vector((x, -1.0, z)), Vector((0, 1, 0)))[0]
            v.co = Vector((x, (hit.y if hit else cy) - off - d, z))
        elif mode == 'back':
            x, z = cx - tx, cz + ty
            hit = tree.ray_cast(Vector((x, 1.0, z)), Vector((0, -1, 0)))[0]
            v.co = Vector((x, (hit.y if hit else cy) + off + d, z))
        else:  # top of a shoulder pad, readable from behind
            x, y = cx - tx, cy - ty
            hit = tree.ray_cast(Vector((x, y, 3.0)), Vector((0, 0, -1)))[0]
            v.co = Vector((x, y, (hit.z if hit else cz) + off + d))
    for e in bm.edges:
        if len(e.link_faces) == 2 and e.calc_face_angle(0) > 0.8: e.smooth = False
    return add(name, bm, slot, 'numbers', smooth=L >= 5)


# ------------------------------------------------------------------ surface detail (L6): cloth folds, sock ribs, face sculpt
def ridged(p, sx, sy, sz):
    n = noise.noise(Vector((p.x * sx, p.y * sy, p.z * sz)))
    return 1.0 - 2.0 * abs(n)  # sharp crest along the zero set: a crease rather than a blob


def folds_torso(p, n):
    waist = 0.35 + 0.65 * smoothstep(1.3, 1.06, p.z)
    return 0.0032 * waist * ridged(p, 14, 14, 4) + 0.0008 * noise.noise(Vector((p.x * 45, p.y * 45, p.z * 45)))


def folds_sleeve(p, n):
    return smoothstep(1.315, 1.36, p.z) * (0.0024 * ridged(p, 9, 9, 40) + 0.0006 * noise.noise(Vector((p.x * 50, p.y * 50, p.z * 50))))


def folds_pants(p, n):
    knee = 0.45 + 0.55 * math.exp(-((p.z - 0.55) / 0.09) ** 2) + 0.4 * math.exp(-((p.z - 0.92) / 0.08) ** 2)
    return 0.0024 * knee * ridged(Vector((p.x, p.y, p.z + 0.35 * p.y)), 11, 11, 36) + 0.0005 * noise.noise(Vector((p.x * 50, p.y * 50, p.z * 50)))


def sock_ribs(cx, cy):
    return lambda p, n: 0.00045 * math.sin(math.atan2(p.y - cy, p.x - cx) * 64)


def face_sculpt(p, n):
    g = lambda c, s: math.exp(-((p - Vector(c)).length / s) ** 2)
    return (0.006 * (g((0.048, -0.15, 1.69), 0.02) + g((-0.048, -0.15, 1.69), 0.02))   # cheekbones
            + 0.005 * g((0, -0.165, 1.742), 0.025)                                       # brow
            - 0.006 * (g((0.032, -0.16, 1.724), 0.014) + g((-0.032, -0.16, 1.724), 0.014))  # eye sockets
            + 0.004 * g((0, -0.15, 1.628), 0.025))                                      # chin


# ------------------------------------------------------------------ the player
HC, HR, HZ0 = (0.0, 0.012, 1.735), (0.15, 0.168, 0.154), -0.6   # helmet shell centre, radii, bottom cut
FC, FR = (0.0, -0.078, 1.705), (0.083, 0.088, 0.1)              # face
MASK_R = 0.182


def mask_bar_y(x): return HC[1] - MASK_R * 0.98 * math.cos(math.asin(max(-1, min(1, x / MASK_R))))


def build():
    six = L >= 6
    # ---- legs: pants, knee pads, socks, cleats
    for s, sx in (('L', 1), ('R', -1)):
        tx = 0.105 * sx
        thigh = [(0.116 * sx, 0, 0.47, 0.06, 0.064), (0.114 * sx, -0.004, 0.56, 0.072, 0.078), (0.112 * sx, 0, 0.68, 0.088, 0.094), (tx, 0.004, 0.83, 0.105, 0.112), (tx * 0.9, 0, 0.98, 0.088, 0.1)]
        loft(f'thigh{s}', thigh, 'pants', 'body', k=16, dome=(0.3, 0), disp=folds_pants if six else None)
        if L >= 4: ellipsoid(f'kneepad{s}', (0.116 * sx, -0.05, 0.53), (0.055, 0.03, 0.06), 'pants', 'body', kr=6, ks=12, z0=-0.9, z1=0.9)
        if L >= 5: loft(f'cuff{s}', [(0.116 * sx, 0, 0.462, 0.063, 0.067), (0.116 * sx, 0, 0.488, 0.065, 0.069)], 'pants', 'trim', k=16, caps=(True, False))
        if L >= 3:
            stripe = [(0.116 * sx + 0.064 * sx, 0, 0.5), (0.112 * sx + 0.09 * sx, 0, 0.68), (tx + 0.106 * sx, 0, 0.83), (tx * 0.9 + 0.11 * sx, 0, 0.97)]
            offs = (-0.014, 0.014) if L >= 5 else (0.0,)
            for o in offs:
                tube(f'pantstripe{s}{o}', [(x + 0.002 * sx, y + o, z) for (x, y, z) in stripe], 0.0085 if L >= 5 else 0.011, 'stripe', 'trim')
        shin = [(0.12 * sx, 0.006, 0.1, 0.038, 0.042), (0.121 * sx, 0.004, 0.2, 0.046, 0.054), (0.12 * sx, 0, 0.32, 0.054, 0.064), (0.117 * sx, 0, 0.45, 0.054, 0.06), (0.116 * sx, 0, 0.52, 0.06, 0.064)]
        loft(f'shin{s}', shin, 'socks', 'body', k=14, disp=sock_ribs(0.12 * sx, 0.0) if six else None)
        if L >= 5:  # sock bands
            for z in (0.385, 0.415):
                loft(f'sockband{s}{z}', [(0.1185 * sx, 0, z, 0.0565, 0.0645), (0.1185 * sx, 0, z + 0.016, 0.0565, 0.0640)], 'white', 'trim', k=14, caps=(False, False))
        # cleat: upper, sole, studs, laces
        sole_z = (0.010, 0.032) if L >= 5 else (0.0, 0.028)
        if L <= 1:
            loft(f'shoe{s}', [(0.12 * sx, -0.045, 0.0, 0.055, 0.15), (0.12 * sx, -0.04, 0.09, 0.045, 0.11)], 'shoes', 'feet')
        else:
            ellipsoid(f'shoe{s}', (0.12 * sx, -0.05, 0.055), (0.05, 0.13, 0.05), 'shoes', 'feet', kr=8, ks=16, z0=-0.55)
        if L >= 3:
            loft(f'sole{s}', [(0.12 * sx, -0.05, sole_z[0], 0.052, 0.135), (0.12 * sx, -0.05, sole_z[1], 0.052, 0.135)], 'sole', 'feet', k=16)
        if L >= 5:
            for dx, dy in ((0.028, -0.10), (-0.028, -0.10), (0, -0.142), (0.03, -0.045), (-0.03, -0.045), (0.026, 0.035), (-0.026, 0.035), (0, 0.062)):
                loft(f'stud{s}{dx}{dy}', [(0.12 * sx + dx, dy, 0.0, 0.0055, 0.0055), (0.12 * sx + dx, dy, 0.0105, 0.0085, 0.0085)], 'stud', 'feet', k=4)
            # side trim along the upper
            for side in (1, -1):
                pts = []
                for i in range(9):
                    y = -0.13 + 0.15 * i / 8; z = 0.048
                    q = 1 - ((y + 0.05) / 0.13) ** 2 - ((z - 0.055) / 0.05) ** 2
                    pts.append((0.12 * sx + side * (0.05 * math.sqrt(max(q, 0)) + 0.0015), y, z))
                tube(f'shoetrim{s}{side}', pts, 0.0045, 'trim', 'feet')
        if six:  # laces across the throat of the cleat
            for i in range(6):
                y = -0.108 + 0.017 * i
                pts = []
                for j in range(5):
                    x = -0.017 + 0.0085 * j
                    q = 1 - (x / 0.05) ** 2 - ((y + 0.05) / 0.13) ** 2
                    pts.append((0.12 * sx + x, y, 0.055 + 0.05 * math.sqrt(max(q, 0)) + 0.0022))
                tube(f'lace{s}{i}', pts, 0.0022, 'white', 'feet', seg=8)
            loft(f'tongue{s}', [(0.12 * sx, -0.06, 0.088, 0.019, 0.05), (0.12 * sx, -0.065, 0.104, 0.017, 0.045)], 'shoes', 'feet', k=14, dome=(0, 0.3))

    # ---- hips, belt, torso, pads, neck, collar
    loft('hips', [(0, 0.004, 0.84, 0.196, 0.108), (0, 0.005, 0.92, 0.2, 0.138), (0, 0.004, 1.0, 0.182, 0.132), (0, 0, 1.07, 0.168, 0.124)], 'pants', 'body', k=20, dome=(0.35, 0), disp=folds_pants if six else None)
    if L >= 3: loft('belt', [(0, 0, 1.03, 0.178, 0.133), (0, 0, 1.062, 0.176, 0.131)], 'stripe', 'trim', k=20, caps=(False, False))
    if L >= 5:
        loft('buckle', [(0, -0.133, 1.034, 0.02, 0.004), (0, -0.133, 1.058, 0.02, 0.004)], 'mask', 'trim', k=6)
        for a in (0.55, -0.55, 1.35, -1.35, 2.4, -2.4):
            x, y = 0.181 * math.sin(a), -0.135 * math.cos(a)
            tube(f'beltloop{a}', [(x, y, 1.024), (x * 1.025, y * 1.03, 1.046), (x, y, 1.068)], 0.004, 'pants', 'trim', seg=5)
    torso_rings = [(0, 0, 1.03, 0.164, 0.12), (0, -0.004, 1.14, 0.18, 0.134), (0, -0.006, 1.25, 0.21, 0.152), (0, -0.004, 1.35, 0.258, 0.168), (0, 0, 1.43, 0.318, 0.18), (0, 0, 1.5, 0.3, 0.172), (0, 0, 1.56, 0.17, 0.12)]
    torso = loft('torso', torso_rings, 'jersey', 'body', k=30 if L >= 6 else 22, dome=(0, 0.25), disp=folds_torso if six else None)
    pads = {}
    for s, sx in (('L', 1), ('R', -1)):
        pads[s] = ellipsoid(f'pad{s}', (0.205 * sx, 0, 1.485), (0.152, 0.18, 0.088), 'jersey', 'body', kr=8, ks=18, z0=-0.25)
        if L >= 4:
            tube(f'padrim{s}', [((0.205 + 0.15 * math.cos(a)) * sx, 0.178 * math.sin(a) * 0.98, 1.47) for a in [math.pi * (0.05 + 0.9 * i / 12) for i in range(13)]], 0.009, 'trim', 'trim')
    if L >= 2: loft('neck', [(0, 0.0, 1.5, 0.062, 0.06), (0, 0.004, 1.63, 0.058, 0.056)], 'skin', 'body', k=12)
    tree_torso = bvh(torso)
    if L in (3, 4):
        loft('collar', [(0, 0, 1.545, 0.105, 0.088), (0, 0, 1.585, 0.098, 0.082)], 'trim', 'trim', k=18, caps=(False, False))
    if L >= 5:  # V-neck collar laid on the jersey surface
        pts = []
        for i in range(48):
            a = 2 * math.pi * i / 48
            ry = 0.08 + 0.05 * max(0.0, math.cos(a)) ** 8
            x, y = 0.088 * math.sin(a), -ry * math.cos(a)
            hit = tree_torso.ray_cast(Vector((x, y, 3.0)), Vector((0, 0, -1)))[0]
            pts.append((x, y, (hit.z if hit else 1.56) + 0.004))
        tube('collar', pts, 0.0085, 'trim', 'trim', closed=True)

    # ---- numbers
    if L >= 2:
        if L >= 5:
            number('numFrontOut', 'outline', 0.205, 'front', (0, -0.17, 1.27), tree_torso, 0.0025, bold=0.0075, ext=0.0008)
            number('numFront', 'number', 0.205, 'front', (0, -0.17, 1.27), tree_torso, 0.0045, bold=0.002, ext=0.0008)
        else:
            number('numFront', 'number', 0.205, 'front', (0, -0.17, 1.27), tree_torso, 0.006 if L <= 3 else 0.004, bold=0.003, ext=0.0 if L <= 3 else 0.0008)
    if L >= 3:
        if L >= 5:
            number('numBackOut', 'outline', 0.25, 'back', (0, 0.17, 1.28), tree_torso, 0.0025, bold=0.0085, ext=0.0008)
            number('numBack', 'number', 0.25, 'back', (0, 0.17, 1.28), tree_torso, 0.0045, bold=0.0025, ext=0.0008)
        else:
            number('numBack', 'number', 0.25, 'back', (0, 0.17, 1.28), tree_torso, 0.006, bold=0.003)
    if L >= 4:
        for s, sx in (('L', 1), ('R', -1)):
            number(f'numTop{s}', 'number', 0.095, 'top', (0.215 * sx, 0.01, 1.57), bvh(pads[s]), 0.004, bold=0.002, ext=0.0006 if L >= 5 else 0.0)

    # ---- arms and gloves
    for s, sx in (('L', 1), ('R', -1)):
        x0 = 0.27 * sx
        sleeve = [(x0 + 0.022 * sx, 0, 1.27, 0.07, 0.068), (x0 + 0.012 * sx, 0, 1.36, 0.082, 0.078), (x0 + 0.004 * sx, 0, 1.44, 0.084, 0.08), (x0, 0, 1.5, 0.06, 0.06)]
        loft(f'sleeve{s}', sleeve, 'jersey', 'body', k=14, caps=(False, True), disp=folds_sleeve if six else None)
        if L >= 3: loft(f'band{s}', [(x0 + 0.022 * sx, 0, 1.255, 0.073, 0.071), (x0 + 0.022 * sx, 0, 1.29, 0.074, 0.072)], 'trim', 'trim', k=14, caps=(False, False))
        if L >= 5: loft(f'band2{s}', [(x0 + 0.02 * sx, 0, 1.298, 0.0768, 0.0748), (x0 + 0.019 * sx, 0, 1.311, 0.0782, 0.0762)], 'white', 'trim', k=14, caps=(False, False))
        if six: tube(f'hem{s}', [(x0 + 0.022 * sx + 0.0715 * math.cos(a), 0.0695 * math.sin(a), 1.256) for a in [2 * math.pi * i / 24 for i in range(24)]], 0.0035, 'trim', 'trim', closed=True)
        if L >= 2:
            # one continuous arm (build_hd.py splits it at the elbow for skinning; a static mesh doesn't need the seam)
            loft(f'arm{s}', [(0.302 * sx, 0, 0.95, 0.034, 0.03), (0.3 * sx, -0.003, 1.02, 0.042, 0.04), (0.296 * sx, 0, 1.1, 0.048, 0.046), (0.293 * sx, 0.002, 1.16, 0.049, 0.049),
                             (0.288 * sx, 0.004, 1.22, 0.056, 0.058), (x0 + 0.022 * sx, 0, 1.3, 0.06, 0.06)], 'skin', 'body', k=12, dome=(0.3, 0))
        else:
            loft(f'fore{s}', [(0.302 * sx, 0, 0.95, 0.034, 0.03), (0.29 * sx, 0, 1.29, 0.055, 0.055)], 'skin', 'body')
        if L >= 5:
            loft(f'wristband{s}', [(0.301 * sx, 0, 0.962, 0.039, 0.036), (0.3 * sx, -0.001, 1.0, 0.043, 0.041)], 'white', 'hands', k=12)
            loft(f'gcuff{s}', [(0.302 * sx, -0.004, 0.932, 0.03, 0.045), (0.302 * sx, -0.003, 0.966, 0.036, 0.037)], 'glove', 'hands', k=12)
        # glove
        if L <= 1:
            loft(f'hand{s}', [(0.303 * sx, -0.004, 0.81, 0.03, 0.05), (0.303 * sx, -0.004, 0.96, 0.03, 0.05)], 'glove', 'hands')
        elif L <= 4:
            ellipsoid(f'palm{s}', (0.303 * sx, -0.004, 0.885), (0.03, 0.05, 0.075), 'glove', 'hands', kr=8, ks=12)
            if L >= 3: ellipsoid(f'thumb{s}', (0.296 * sx, -0.05, 0.905), (0.016, 0.016, 0.034), 'glove', 'hands', kr=6, ks=8)
        else:
            ellipsoid(f'palm{s}', (0.301 * sx, -0.004, 0.905), (0.025, 0.046, 0.052), 'glove', 'hands', kr=8, ks=14)
            for i, (y, ln) in enumerate(((-0.031, 0.066), (-0.0105, 0.074), (0.0105, 0.069), (0.03, 0.056))):
                pts = [((0.302 - 0.016 * t * t) * sx, y * (1 + 0.15 * t), 0.872 - ln * t) for t in (0, 0.33, 0.66, 1.0)]
                if six:
                    r = lambda t: 0.0098 * (1 - 0.15 * t) * (1 + 0.09 * math.exp(-((t - 0.36) / 0.07) ** 2) + 0.07 * math.exp(-((t - 0.68) / 0.06) ** 2))
                else:
                    r = lambda t: 0.0098 * (1 - 0.15 * t)
                tube(f'finger{s}{i}', pts, r, 'glove', 'hands', ends='dome', lo=6)
            tube(f'thumbF{s}', [(0.3 * sx, -0.032, 0.925), (0.296 * sx, -0.053, 0.9), (0.289 * sx, -0.063, 0.872), (0.282 * sx, -0.065, 0.85)], lambda t: 0.0115 * (1 - 0.18 * t), 'glove', 'hands', ends='dome', lo=6)
            if six:  # knuckle ridge and palm seam
                tube(f'knuckle{s}', [(0.302 * sx + 0.016 * sx, y, 0.874) for y in (-0.04, -0.013, 0.013, 0.038)], 0.0045, 'glove', 'hands', ends='dome')
                tube(f'gseam{s}', [(0.302 * sx + 0.0245 * sx, -0.03, 0.935), (0.302 * sx + 0.0255 * sx, -0.006, 0.9), (0.302 * sx + 0.0245 * sx, 0.02, 0.87)], 0.0018, 'dark', 'hands', seg=6)

    # ---- head: face, helmet, facemask
    face_disp = face_sculpt if six else None
    ellipsoid('face', FC, FR, 'skin', 'face', kr=8, ks=14, disp=face_disp)
    if L >= 5:
        ellipsoid('nose', (0, -0.164, 1.7), (0.013, 0.014, 0.022), 'skin', 'face', kr=5, ks=8)
        for sx in (1, -1):
            ellipsoid(f'eye{sx}', (0.031 * sx, -0.155, 1.725), (0.009, 0.004, 0.005), 'sclera', 'face', kr=4, ks=8)
            ellipsoid(f'iris{sx}', (0.031 * sx, -0.1585, 1.725), (0.0045, 0.0018, 0.0045), 'dark', 'face', kr=3, ks=8)
            ellipsoid(f'eyeblack{sx}', (0.034 * sx, -0.156, 1.707), (0.016, 0.004, 0.0055), 'dark', 'face', kr=3, ks=8)
        if six: ellipsoid('lips', (0, -0.158, 1.664), (0.021, 0.006, 0.006), 'skin', 'face', kr=4, ks=10)
    ellipsoid('helmet', HC, HR, 'helmet', 'helmet', kr=14, ks=28, z0=HZ0)
    if L >= 2:
        # centre stripe over the crown, front to back (same path as build_hd.py)
        stripe = [(0, HC[1] + 0.171 * math.sin(a), HC[2] + 0.158 * math.cos(a)) for a in [-1.25 + 2.6 * i / 16 for i in range(17)]]
        tube('stripe', stripe, 0.018, 'trim', 'helmet', seg=max(Q['tseg'], 6))
        if six:  # white pinstripes either side, pulled in to the narrower shell off the centre line
            for sx in (1, -1):
                tube(f'pin{sx}', [(0.028 * sx, HC[1] + (y - HC[1]) * 0.983, HC[2] + (z - HC[2]) * 0.983) for (_, y, z) in stripe], 0.0042, 'white', 'helmet')
    if L >= 3:
        for s, sx in (('L', 1), ('R', -1)):
            ellipsoid(f'jaw{s}', (0.1 * sx, -0.05, 1.668), (0.031, 0.074, 0.054), 'helmet', 'helmet', kr=8, ks=12)
    if L >= 4:
        for s, sx in (('L', 1), ('R', -1)):
            ellipsoid(f'ear{s}', (0.149 * sx, 0.015, 1.715), (0.008, 0.022, 0.022), 'dark', 'helmet', kr=4, ks=8)
        tube('strap', [(0.12, -0.03, 1.66), (0.06, -0.11, 1.6), (0, -0.125, 1.59), (-0.06, -0.11, 1.6), (-0.12, -0.03, 1.66)], 0.008, 'white' if L >= 5 else 'mask', 'helmet', seg=5 if L == 4 else None)
    if L >= 5:
        ellipsoid('chincup', (0, -0.126, 1.594), (0.027, 0.012, 0.02), 'white', 'helmet', kr=6, ks=12)
        for sx in (1, -1):
            ellipsoid(f'buckle{sx}', (0.121 * sx, -0.03, 1.662), (0.006, 0.014, 0.01), 'mask', 'helmet', kr=3, ks=8)
        # rubber edge along the bottom of the shell
        k = math.sqrt(1 - HZ0 * HZ0)
        tube('rimB', [(HR[0] * k * 1.01 * math.cos(a), HC[1] + HR[1] * k * 1.01 * math.sin(a), HC[2] + HZ0 * HR[2]) for a in [2 * math.pi * i / 40 for i in range(40)]], 0.0065, 'dark', 'helmet', closed=True)
        # rubber edge around the face opening: where the face pokes through the shell
        rim = []
        for i in range(73):
            psi = -math.pi / 2 + 2 * math.pi * i / 72
            def shell_y(x, z):
                q = 1 - (x / HR[0]) ** 2 - ((z - HC[2]) / HR[2]) ** 2
                return None if q < 0 else HC[1] - HR[1] * math.sqrt(q)
            def F(r):
                x, z = r * math.cos(psi), FC[2] + r * math.sin(psi)
                y = shell_y(x, z)
                if y is None: return None
                return (x / FR[0]) ** 2 + ((y - FC[1]) / FR[1]) ** 2 + ((z - FC[2]) / FR[2]) ** 2 - 1
            lo, hi = 0.0, 0.0
            while hi < 0.2 and F(hi) is not None and F(hi) < 0: lo, hi = hi, hi + 0.004
            if F(hi) is None or hi >= 0.2: continue
            for _ in range(30):
                mid = (lo + hi) / 2
                v = F(mid)
                if v is not None and v < 0: lo = mid
                else: hi = mid
            x, z = lo * math.cos(psi), FC[2] + lo * math.sin(psi)
            if z < HC[2] + HZ0 * HR[2] + 0.01: continue
            rim.append((x, shell_y(x, z) - 0.001, z))
        if len(rim) > 4: tube('rimFace', rim, 0.006, 'dark', 'helmet')
    # facemask bars
    bars = {1: [(1.69, -1.1, 1.1)], 2: [(1.712, -1.25, 1.25), (1.655, -0.95, 0.95)], 3: [(1.712, -1.25, 1.25), (1.668, -1.05, 1.05), (1.755, -1.3, 1.3)]}.get(L,
           [(1.712, -1.25, 1.25), (1.668, -1.05, 1.05), (1.628, -0.75, 0.75), (1.755, -1.3, 1.3)])
    verts_x = {1: [], 2: [0.0], 3: [0.0]}.get(L, [-0.05, 0.0, 0.05])
    br = 0.0085 if L <= 3 else 0.0075
    for z, a0, a1 in bars:
        tube(f'mask{z}', [(MASK_R * math.sin(a), HC[1] - MASK_R * math.cos(a) * 0.98, z) for a in [a0 + (a1 - a0) * i / 12 for i in range(13)]], br, 'mask', 'mask', lo=3)
    for x in verts_x:
        tube(f'maskV{x}', [(x, mask_bar_y(x), 1.62 if L >= 4 else 1.64), (x, mask_bar_y(x), 1.76 if L >= 4 else 1.75)], br, 'mask', 'mask')
    if L >= 5:
        for z, a0, a1 in bars:  # side struts into the shell with mounting clips, welds at every crossing
            for a in (a0, a1):
                e = Vector((MASK_R * math.sin(a), HC[1] - MASK_R * math.cos(a) * 0.98, z))
                d = Vector((e.x - HC[0], e.y - HC[1], 0)).normalized()
                q = 1 - ((z - HC[2]) / HR[2]) ** 2
                rr = 1 / math.sqrt((d.x / HR[0]) ** 2 + (d.y / HR[1]) ** 2) * math.sqrt(max(q, 0.05))
                sp = Vector((HC[0], HC[1], z)) + d * rr
                if (sp - e).length > 0.004: tube(f'strut{z}{a}', [e, sp], br, 'mask', 'mask', n=2)
                ellipsoid(f'clip{z}{a}', tuple(sp + d * 0.002), (0.011, 0.011, 0.011), 'dark', 'mask', kr=4, ks=8)
            for x in verts_x:
                if abs(x) <= MASK_R * math.sin(min(abs(a0), abs(a1))) and 1.62 <= z <= 1.76:
                    ellipsoid(f'weld{z}{x}', (x, mask_bar_y(x), z), (br * 1.35,) * 3, 'mask', 'mask', kr=4, ks=8)


# ------------------------------------------------------------------ assemble, export, measure
def assemble(name):
    slots = sorted({p['slot'] for p in PARTS}, key=list(COL).index)
    V, F, M, S, SH, groups = [], [], [], [], [], {}
    for p in PARTS:
        o = len(V)
        V += [tuple(v) for v in p['verts']]
        for f, sm in zip(p['faces'], p['smooth']):
            F.append(tuple(i + o for i in f)); M.append(slots.index(p['slot'])); S.append(sm)
        SH += [(a + o, b + o) for a, b in p['sharp']]
        groups[p['group']] = groups.get(p['group'], 0) + sum(len(f) - 2 for f in p['faces'])
    me = bpy.data.meshes.new(name)
    me.from_pydata(V, [], F)
    me.update(calc_edges=True)
    for sl in slots: me.materials.append(material(sl))
    me.polygons.foreach_set('material_index', M)
    sharp_face = me.attributes.get('sharp_face') or me.attributes.new('sharp_face', 'BOOLEAN', 'FACE')
    sharp_face.data.foreach_set('value', [not x for x in S])
    if SH:
        key = {tuple(sorted(e.vertices)): e.index for e in me.edges}
        flags = [False] * len(me.edges)
        for a, b in SH:
            i = key.get((min(a, b), max(a, b)))
            if i is not None: flags[i] = True
        attr = me.attributes.get('sharp_edge') or me.attributes.new('sharp_edge', 'BOOLEAN', 'EDGE')
        attr.data.foreach_set('value', flags)
    me.update()
    ob = bpy.data.objects.new(name, me)
    bpy.context.scene.collection.objects.link(ob)
    me.calc_loop_triangles()
    return ob, len(me.loop_triangles), len(me.vertices), groups


def glb_stats(path):
    b = open(path, 'rb').read()
    jl = struct.unpack_from('<I', b, 12)[0]
    J = json.loads(b[20:20 + jl])
    verts = tris = prims = 0
    for m in J['meshes']:
        for p in m['primitives']:
            prims += 1
            verts += J['accessors'][p['attributes']['POSITION']]['count']
            tris += J['accessors'][p['indices']]['count'] // 3
    return dict(bytes=len(b), tris=tris, verts=verts, primitives=prims, materials=len(J.get('materials', [])),
                extensions=sorted(J.get('extensionsUsed', [])))


def export(ob, path):
    for o in bpy.context.scene.objects: o.select_set(o == ob)
    bpy.context.view_layer.objects.active = ob
    kw = dict(filepath=path, export_format='GLB', use_selection=True, export_yup=True, export_apply=True,
              export_texcoords=False, export_normals=True, export_materials='EXPORT', export_animations=False,
              export_skins=False, export_morph=False, export_cameras=False, export_lights=False)
    try: bpy.ops.export_scene.gltf(**kw)
    except TypeError:
        for k in ('export_animations', 'export_skins', 'export_morph', 'export_cameras', 'export_lights', 'export_texcoords'): kw.pop(k, None)
        bpy.ops.export_scene.gltf(**kw)


def main():
    global L, Q, PARTS, MATS
    argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
    todo = [int(a) for a in argv] or sorted(LEVELS)
    os.makedirs(OUT, exist_ok=True)
    stats_path = os.path.join(OUT, 'stats.json')
    stats = json.load(open(stats_path)) if os.path.exists(stats_path) else {}
    for lv in todo:
        bpy.ops.wm.read_factory_settings(use_empty=True)
        L, Q, PARTS, MATS = lv, LEVELS[lv], [], {}
        build()
        ob, tris, verts, groups = assemble(f'player_L{lv}')
        path = os.path.join(OUT, f'L{lv}.glb')
        export(ob, path)
        g = glb_stats(path)
        stats[f'L{lv}'] = dict(level=lv, parts=len(PARTS), blenderTris=tris, blenderVerts=verts, groups=groups, **g)
        print(f'L{lv}: {g["tris"]} tris, {g["verts"]} glTF verts ({verts} Blender verts), {len(PARTS)} parts, {g["bytes"] / 1024:.1f} KB, groups {groups}')
    with open(stats_path, 'w', newline='\n') as fh: json.dump(dict(sorted(stats.items())), fh, indent=1)


main()
