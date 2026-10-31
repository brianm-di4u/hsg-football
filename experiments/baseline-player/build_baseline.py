# Baseline player: an original, realistic American football player for Friday Night Spa City, one mesh dressed by
# data in every team's uniform. Built from scratch in Blender (no imported assets): a metaball athlete defines the
# body; garments are offset fields of that body cut at real hems; the helmet, facemask and cleats are hard-surface
# lofts and tubes. Same 11-bone skeleton and arms-down rest pose as art-src/blender/players/build_hd.py, so the game's
# procedural Rig.pose() drives it unchanged.
#
#   "C:\Program Files\Blender Foundation\Blender 5.2\blender.exe" -b --factory-startup --python experiments/baseline-player/build_baseline.py [-- hero lod1]
#
# Output: models/hero.json and art-src/players-baseline/lod0|1|2.json (packed into the game by tools/pack-players.mjs) in the game's HD pack encoding (players-hd.json: int16 positions, int8 normals, slot,
# two-bone skin, uv) plus two fields the game ignores: reg (uniform region per vertex) and a pattern uv on every
# vertex. hero.glb (skinned glTF) and stats.json. Each vertex keeps a game slot, so the old palette shader still
# renders it; designFor.js reads reg + uv to paint stripes, numbers and the helmet decal per team.
import bpy, bmesh, math, os, sys, json, struct, base64
from mathutils import Vector, Quaternion, noise
from mathutils.bvhtree import BVHTree

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, 'models')
GAME_OUT = os.path.join(HERE, '..', '..', 'art-src', 'players-baseline')  # lod0-2 ship in the game's players pack (tools/pack-players.mjs)

# ------------------------------------------------------------------ skeleton (build_hd.py; metres, Z up, front = -Y, left = +X)
BONES = {
    'pelvis': (0, 0, 0.98), 'spine': (0, 0, 1.05), 'head': (0, 0, 1.57),
    'armL': (0.27, 0, 1.45), 'foreL': (0.29, 0, 1.17), 'armR': (-0.27, 0, 1.45), 'foreR': (-0.29, 0, 1.17),
    'thighL': (0.105, 0, 0.95), 'shinL': (0.115, 0, 0.52), 'thighR': (-0.105, 0, 0.95), 'shinR': (-0.115, 0, 0.52),
}
PARENT = {'pelvis': None, 'spine': 'pelvis', 'head': 'spine', 'armL': 'spine', 'foreL': 'armL', 'armR': 'spine', 'foreR': 'armR',
          'thighL': 'pelvis', 'shinL': 'thighL', 'thighR': 'pelvis', 'shinR': 'thighR'}
BONE_LIST = list(BONES)
HEAD_B = ('head', 'spine')
TOP_B = ('pelvis', 'spine', 'armL', 'armR')
ARM_B = ('armL', 'armR', 'foreL', 'foreR')
LEG_B = ('pelvis', 'thighL', 'thighR', 'shinL', 'shinR')
# capsule each bone owns (start, end, typical radius): a vertex belongs to the bone it is deepest inside
SEGS = {'pelvis': ((0, 0, 0.88), (0, 0, 1.06), 0.15), 'spine': ((0, 0, 1.06), (0, 0, 1.5), 0.16), 'head': ((0, 0, 1.57), (0, 0, 1.86), 0.1)}
for s, sx in (('L', 1), ('R', -1)):
    SEGS['arm' + s] = ((0.27 * sx, 0, 1.45), (0.29 * sx, 0, 1.17), 0.055)
    SEGS['fore' + s] = ((0.29 * sx, 0, 1.17), (0.30 * sx, 0, 0.8), 0.045)
    SEGS['thigh' + s] = ((0.105 * sx, 0, 0.95), (0.115 * sx, 0, 0.52), 0.08)
    SEGS['shin' + s] = ((0.115 * sx, 0, 0.52), (0.12 * sx, -0.05, 0.0), 0.05)
# blend radius around each bone's own joint (toward its parent)
BLEND = {'spine': 0.12, 'head': 0.07, 'armL': 0.1, 'armR': 0.1, 'foreL': 0.075, 'foreR': 0.075, 'thighL': 0.11, 'thighR': 0.11, 'shinL': 0.085, 'shinR': 0.085}

# ------------------------------------------------------------------ uniform regions -> game slot fallback
REGIONS = ['skin', 'eyeWhite', 'iris', 'brow', 'jersey', 'sleeve', 'collar', 'numFront', 'numBack', 'numTV', 'undersleeve', 'hands',
           'belt', 'buckle', 'pants', 'socks', 'cleat', 'sole', 'laces', 'studs', 'helmet', 'helmetDecal', 'rim', 'jawpad', 'mask', 'strap', 'chincup']
R = {n: i for i, n in enumerate(REGIONS)}
SLOT = dict(jersey=0, trim=1, pants=2, helmet=3, mask=4, skin=5, shoes=6, socks=7, glove=8, number=9)
SLOT_OF = {'skin': 'skin', 'eyeWhite': 'skin', 'iris': 'shoes', 'brow': 'shoes', 'jersey': 'jersey', 'sleeve': 'jersey', 'collar': 'trim',
           'numFront': 'number', 'numBack': 'number', 'numTV': 'number', 'undersleeve': 'jersey', 'hands': 'glove', 'belt': 'shoes',
           'buckle': 'mask', 'pants': 'pants', 'socks': 'socks', 'cleat': 'shoes', 'sole': 'shoes', 'laces': 'shoes', 'studs': 'shoes',
           'helmet': 'helmet', 'helmetDecal': 'helmet', 'rim': 'shoes', 'jawpad': 'helmet', 'mask': 'mask', 'strap': 'mask', 'chincup': 'mask'}
# decal boxes (planar uv 0..1): centre, half extents, projection
NUM_FRONT = dict(c=(0, 1.275), w=0.24, h=0.21)          # x, z on the chest
NUM_BACK = dict(c=(0, 1.29), w=0.30, h=0.26)            # x, z on the back
NUM_TV = dict(c=(0.0, 1.355), w=0.1, h=0.088)           # y, z on the outside of each sleeve
DECAL = dict(c=(0.0, 1.758), w=0.13, h=0.13)            # y, z on each side of the helmet

# ------------------------------------------------------------------ levels of detail
# dec: share of the hero's triangle budget for organic (decimated) parts; m: hard-surface segment multiplier;
# tseg/tpm: tube sides and path points per metre; cap: dome rings on rounded ends.
LODS = {
    'hero': dict(dec=1.0, m=2.2, rpm=70, tseg=10, tpm=110, cap=4, folds=True, fingers=True, laces=True, studs=True, struts=True, bars=4, eyes=True),
    'lod0': dict(dec=0.23, m=1.0, rpm=30, tseg=7, tpm=45, cap=2, folds=False, fingers=True, laces=True, studs=True, struts=True, bars=4, eyes=True),
    'lod1': dict(dec=0.095, m=0.56, rpm=14, tseg=5, tpm=22, cap=1, folds=False, fingers=True, laces=False, studs=False, struts=True, bars=4, eyes=True),
    'lod2': dict(dec=0.028, m=0.34, rpm=0, tseg=4, tpm=10, cap=0, folds=False, fingers=False, laces=False, studs=False, struts=False, bars=2, eyes=False),
}
HERO_TRIS = {'head': 6500, 'jersey': 11500, 'undersleeve': 1800, 'hand': 1300, 'pants': 8500, 'sock': 1200}
L, Q, PARTS = None, {}, []
MB_RATIO = 0.574  # visible radius / metaball radius at threshold 0.6, stiffness 2 (calibrated at start-up)


# ------------------------------------------------------------------ small helpers
def smoothstep(e0, e1, x):
    t = max(0.0, min(1.0, (x - e0) / (e1 - e0)))
    return t * t * (3 - 2 * t)


def seg_dist(p, a, b):
    a, b = Vector(a), Vector(b)
    ab = b - a
    t = max(0.0, min(1.0, (p - a).dot(ab) / ab.length_squared))
    return (p - (a + ab * t)).length, t


def part(name, bm, region, rigid=None, smooth=True, bones=None):
    """A finished piece of the player: a bmesh with a per-face 'reg' layer. rigid: one bone for every vertex;
    otherwise skinned by weights_for() restricted to `bones` (a garment never follows a limb it doesn't cover)."""
    lay = bm.faces.layers.int.get('reg') or bm.faces.layers.int.new('reg')
    for f in bm.faces:
        if f[lay] == 0 and region != 'skin': f[lay] = R[region]
        f.smooth = smooth
    PARTS.append(dict(name=name, bm=bm, rigid=rigid, bones=bones))
    return bm


def bm_to_object(bm, name='tmp'):
    me = bpy.data.meshes.new(name); bm.to_mesh(me)
    ob = bpy.data.objects.new(name, me); bpy.context.scene.collection.objects.link(ob)
    return ob


def object_to_bm(ob):
    dg = bpy.context.evaluated_depsgraph_get()
    me = bpy.data.meshes.new_from_object(ob.evaluated_get(dg))
    bm = bmesh.new(); bm.from_mesh(me)
    data = ob.data
    bpy.data.objects.remove(ob); bpy.data.meshes.remove(me)
    if isinstance(data, bpy.types.Mesh) and data.users == 0: bpy.data.meshes.remove(data)
    return bm


def decimate(bm, target, symmetric=True):
    tris = sum(len(f.verts) - 2 for f in bm.faces)
    if tris <= target: return bm
    ob = bm_to_object(bm); bm.free()
    m = ob.modifiers.new('d', 'DECIMATE'); m.ratio = target / tris; m.use_collapse_triangulate = True
    if symmetric: m.use_symmetry = True; m.symmetry_axis = 'X'
    return object_to_bm(ob)


def tri_count(bm): return sum(len(f.verts) - 2 for f in bm.faces)


# ------------------------------------------------------------------ metaball fields (the anatomy)
def calibrate():
    global MB_RATIO
    mb = bpy.data.metaballs.new('cal'); mb.resolution = mb.render_resolution = 0.004; mb.threshold = 0.6
    e = mb.elements.new(type='BALL'); e.radius = 0.1; e.stiffness = 2.0
    ob = bpy.data.objects.new('cal', mb); bpy.context.scene.collection.objects.link(ob)
    dg = bpy.context.evaluated_depsgraph_get(); me = bpy.data.meshes.new_from_object(ob.evaluated_get(dg))
    MB_RATIO = max(v.co.x for v in me.vertices) / 0.1
    bpy.data.objects.remove(ob); bpy.data.metaballs.remove(mb); bpy.data.meshes.remove(me)


def ball(c, r, neg=False): return ('E', Vector(c), (r, r, r), None, neg)
def ell(c, r, rot=None, neg=False): return ('E', Vector(c), tuple(r), rot, neg)
def cap(a, b, r): return ('C', Vector(a), Vector(b), r, False)


def field(name, elems, res, ease=0.0):
    """Polygonize metaball elements given by their *visible* sizes; ease inflates every element (garment fit)."""
    mb = bpy.data.metaballs.new(name); mb.resolution = mb.render_resolution = res; mb.threshold = 0.6
    for el in elems:
        if el[0] == 'C':
            _, a, b, r, _n = el
            e = mb.elements.new(type='CAPSULE')
            r = r + ease
            e.co = (a + b) / 2; e.radius = r / MB_RATIO; e.size_x = (b - a).length / 2  # absolute half-length (calibrated)
            e.rotation = Vector((1, 0, 0)).rotation_difference((b - a).normalized())
        else:
            _, c, rr, rot, neg = el
            e = mb.elements.new(type='ELLIPSOID')
            rr = [x + (0 if neg else ease) for x in rr]
            base = max(rr)
            e.co = c; e.radius = base / MB_RATIO; e.size_x, e.size_y, e.size_z = rr[0] / base, rr[1] / base, rr[2] / base
            if rot: e.rotation = rot
            e.use_negative = neg
        e.stiffness = 2.0
    ob = bpy.data.objects.new(name, mb); bpy.context.scene.collection.objects.link(ob)
    dg = bpy.context.evaluated_depsgraph_get()
    me = bpy.data.meshes.new_from_object(ob.evaluated_get(dg))
    bm = bmesh.new(); bm.from_mesh(me)
    bpy.data.objects.remove(ob); bpy.data.metaballs.remove(mb); bpy.data.meshes.remove(me)
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=res * 0.05)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    return bm


def sym(fn):
    """Mirror a list of element builders over X."""
    out = []
    for sx in (1, -1): out += fn(sx)
    return out


def torso_elems(sx):
    return [ell((0.075 * sx, -0.075, 1.335), (0.078, 0.04, 0.065)),               # pecs
            ell((0.115 * sx, 0.03, 1.27), (0.065, 0.075, 0.13)),                  # lats
            ell((0.085 * sx, 0.03, 1.47), (0.085, 0.05, 0.045)),                   # traps
            ell((0.245 * sx, 0.0, 1.44), (0.065, 0.07, 0.07)),                     # deltoids
            ell((0.075 * sx, -0.06, 1.12), (0.05, 0.035, 0.08)),                   # obliques / abs side
            ell((0.07 * sx, 0.054, 0.915), (0.06, 0.038, 0.066))]                  # glutes (loop 8: shallower again, the seat in a stance faces the camera)


def torso_core():
    return [ell((0, 0.0, 0.96), (0.15, 0.1, 0.1)),                                 # pelvis
            ell((0, -0.005, 1.1), (0.135, 0.095, 0.12)),                            # abdomen
            ell((0, 0.005, 1.3), (0.165, 0.11, 0.15)),                              # rib cage
            ell((0, 0.035, 1.42), (0.15, 0.07, 0.07)),                              # upper back
            cap((0, 0.0, 1.46), (0, 0.004, 1.6), 0.06)]                             # neck base


def arm_elems(sx, upper=True, fore=True):
    S, E, W = Vector((0.27 * sx, 0, 1.43)), Vector((0.29 * sx, 0, 1.17)), Vector((0.30 * sx, -0.004, 0.96))
    out = []
    if upper:
        out += [cap(S, E, 0.045), ell((0.284 * sx, -0.028, 1.29), (0.04, 0.042, 0.085)), ell((0.282 * sx, 0.03, 1.31), (0.042, 0.042, 0.095))]
    if fore:
        M = E.lerp(W, 0.45)  # loop 7: the forearm tapers from the muscle belly to a slim wrist
        out += [cap(E, M, 0.034), cap(M, W, 0.025), ell((0.295 * sx, -0.012, 1.11), (0.044, 0.042, 0.07)), ball((0.29 * sx, 0.018, 1.17), 0.036)]
    return out


def leg_elems(sx, thigh=True, shin=True):
    H, K, A = Vector((0.1 * sx, 0, 0.93)), Vector((0.115 * sx, -0.005, 0.52)), Vector((0.12 * sx, 0.005, 0.09))
    out = []
    if thigh:
        # loop 7: slimmer and tapering into the knee (hips inside the shoulder line)
        out += [cap(H, K, 0.052), ell((0.11 * sx, -0.026, 0.77), (0.058, 0.05, 0.15)), ell((0.11 * sx, 0.026, 0.78), (0.05, 0.04, 0.13)),
                ell((0.128 * sx, 0.0, 0.82), (0.024, 0.036, 0.085)), ball((0.115 * sx, -0.018, 0.52), 0.046)]
    if shin:
        out += [cap(K, A, 0.04), ell((0.12 * sx, 0.03, 0.37), (0.055, 0.055, 0.1)), ell((0.13 * sx, 0.02, 0.38), (0.04, 0.05, 0.085)),
                ball((0.12 * sx, 0.005, 0.09), 0.037)]
    return out


# ------------------------------------------------------------------ bmesh surgery
def cut_plane(bm, co, no, region=None):
    """Delete everything behind a plane (opposite its normal), optionally only within faces passing region(centroid)."""
    faces = [f for f in bm.faces if region is None or region(f.calc_center_median())]
    if not faces: return
    geom = list({v for f in faces for v in f.verts}) + list({e for f in faces for e in f.edges}) + faces
    res = bmesh.ops.bisect_plane(bm, geom=geom, plane_co=co, plane_no=no, dist=1e-6)
    co, no = Vector(co), Vector(no)
    kill = [f for f in bm.faces if (region is None or region(f.calc_center_median())) and (f.calc_center_median() - co).dot(no) < 0]
    bmesh.ops.delete(bm, geom=kill, context='FACES')


def delete_faces(bm, pred):
    bmesh.ops.delete(bm, geom=[f for f in bm.faces if pred(f.calc_center_median())], context='FACES')


def boundary_loops(bm, pred):
    """Ordered vertex positions of each boundary loop whose vertices satisfy pred."""
    bm.verts.index_update()
    edges = sorted((e for e in bm.edges if e.is_boundary and pred(e.verts[0].co) and pred(e.verts[1].co)), key=lambda e: (e.verts[0].index, e.verts[1].index))
    adj = {}
    for e in edges:  # in index order, so the loops (and the triangle count) are the same every build
        a, b = e.verts
        adj.setdefault(a, []).append(b); adj.setdefault(b, []).append(a)
    loops, seen = [], set()
    for start in sorted(adj, key=lambda v: v.index):
        if start in seen: continue
        loop, prev, cur = [start], None, start
        seen.add(start)
        while True:
            nxt = sorted((v for v in adj[cur] if v is not prev and v not in seen), key=lambda v: v.index)
            if not nxt: break
            prev, cur = cur, nxt[0]; seen.add(cur); loop.append(cur)
        if len(loop) > 8: loops.append([v.co.copy() for v in loop])
    return loops


def smooth_loop(pts, n=24, iters=6):
    """Evenly resample a closed loop to n points and relax it, so trim laid on a decimated edge runs smooth."""
    P = [Vector(p) for p in pts]
    seglen = [(P[(i + 1) % len(P)] - P[i]).length for i in range(len(P))]
    total, out, acc, i = sum(seglen), [], 0.0, 0
    for k in range(n):
        target = total * k / n
        while acc + seglen[i] < target: acc += seglen[i]; i += 1
        t = (target - acc) / max(seglen[i], 1e-9)
        out.append(P[i].lerp(P[(i + 1) % len(P)], t))
    for _ in range(iters):
        out = [out[j] * 0.5 + (out[j - 1] + out[(j + 1) % n]) * 0.25 for j in range(n)]
    return out


def displace(bm, fn):
    bm.normal_update()
    moves = [(v, v.normal * fn(v.co)) for v in bm.verts]
    for v, d in moves: v.co += d


def ridged(p, sx, sy, sz):
    return 1.0 - 2.0 * abs(noise.noise(Vector((p.x * sx, p.y * sy, p.z * sz))))


# ------------------------------------------------------------------ parametric surfaces (from experiments/lod-showcase/build_lods.py)
def catmull(p0, p1, p2, p3, t):
    t2, t3 = t * t, t * t * t
    return tuple(0.5 * ((2 * b) + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3) for a, b, c, d in zip(p0, p1, p2, p3))


def resample_rings(Rg, rpm):
    if rpm <= 0: return list(Rg)
    out = []
    for i in range(len(Rg) - 1):
        a, b = Rg[i], Rg[i + 1]
        p0 = Rg[i - 1] if i > 0 else tuple(2 * x - y for x, y in zip(a, b))
        p3 = Rg[i + 2] if i + 2 < len(Rg) else tuple(2 * y - x for x, y in zip(a, b))
        n = max(1, int(round(math.dist(a[:3], b[:3]) * rpm)))
        out += [catmull(p0, a, b, p3, s / n) for s in range(n)]
    return out + [Rg[-1]]


def skin(rings, pole0=None, pole1=None, cap0=False, cap1=False, closed=False):
    bm = bmesh.new()
    loops = [[bm.verts.new(p) for p in r] for r in rings]
    seg = len(rings[0])
    pairs = list(zip(loops, loops[1:])) + ([(loops[-1], loops[0])] if closed else [])
    for a, b in pairs:
        for k in range(seg): bm.faces.new((a[k], a[(k + 1) % seg], b[(k + 1) % seg], b[k]))
    if not closed:
        if pole0 is not None:
            p = bm.verts.new(pole0)
            for k in range(seg): bm.faces.new((loops[0][(k + 1) % seg], loops[0][k], p))
        elif cap0: bm.faces.new(list(reversed(loops[0])))
        if pole1 is not None:
            p = bm.verts.new(pole1)
            for k in range(seg): bm.faces.new((loops[-1][k], loops[-1][(k + 1) % seg], p))
        elif cap1: bm.faces.new(loops[-1])
    return bm


def segs(k, lo=4): return max(lo, int(round(k * Q['m'])))


def ring(cx, cy, cz, rx, ry, seg, ph=0.0):
    return [Vector((cx + rx * math.cos(2 * math.pi * k / seg + ph), cy + ry * math.sin(2 * math.pi * k / seg + ph), cz)) for k in range(seg)]


def loft(rings, k=16, caps=(True, True), dome=(0.0, 0.0), rpm=None):
    seg = segs(k)
    Rg = resample_rings(rings, Q['rpm'] if rpm is None else rpm)
    poles = [None, None]
    for end, (i, sgn) in enumerate(((0, -1), (-1, 1))):
        if not caps[end] or not dome[end] or not Q['cap']: continue
        cx, cy, cz, rx, ry = Rg[i]
        h, n, extra = dome[end] * min(rx, ry), Q['cap'], []
        for j in range(1, n + 1):
            a = j / (n + 1) * math.pi / 2
            extra.append((cx, cy, cz + sgn * h * math.sin(a), rx * math.cos(a), ry * math.cos(a)))
        Rg = (list(reversed(extra)) + Rg) if end == 0 else (Rg + extra)
        poles[end] = Vector((cx, cy, cz + sgn * h))
    return skin([ring(*r, seg) for r in Rg], poles[0], poles[1], caps[0], caps[1])


def ellipsoid(c, r, kr=10, ks=18, z0=-1.0, z1=1.0):
    n, seg = max(2, int(round(kr * Q['m']))), segs(ks)
    fa, fb = math.acos(-z0), math.acos(-z1)
    rings, p0, p1 = [], None, None
    for i in range(n + 1):
        f = fa + (fb - fa) * i / n
        if f < 1e-6: p0 = Vector((c[0], c[1], c[2] - r[2])); continue
        if f > math.pi - 1e-6: p1 = Vector((c[0], c[1], c[2] + r[2])); continue
        rings.append(ring(c[0], c[1], c[2] - r[2] * math.cos(f), r[0] * math.sin(f), r[1] * math.sin(f), seg))
    return skin(rings, p0, p1, p0 is None, p1 is None)


def resample_path(P, n, closed=False):
    P = [tuple(p) for p in P]; m = len(P); pts = []
    for s in range(n):
        if closed:
            u = s / n * m; i = int(u) % m; t = u - int(u)
            pts.append(catmull(P[(i - 1) % m], P[i], P[(i + 1) % m], P[(i + 2) % m], t))
        else:
            u = s / (n - 1) * (m - 1); i = min(int(u), m - 2); t = u - i
            p0 = P[i - 1] if i > 0 else tuple(2 * a - b for a, b in zip(P[0], P[1]))
            p3 = P[i + 2] if i + 2 < m else tuple(2 * b - a for a, b in zip(P[-2], P[-1]))
            pts.append(catmull(p0, P[i], P[i + 1], p3, t))
    return [Vector(p) for p in pts]


def tube(pts, r, closed=False, ends='flat', seg=None, n=None, lo=2):
    length = sum((Vector(b) - Vector(a)).length for a, b in zip(pts, pts[1:])) + ((Vector(pts[0]) - Vector(pts[-1])).length if closed else 0)
    if n is None: n = max(lo, int(round(length * Q['tpm'])))
    P = resample_path(pts, max(3 if closed else 2, n), closed)
    seg = seg or Q['tseg']
    rad = r if callable(r) else (lambda t, r=r: r)
    N = len(P)
    T = [((P[(i + 1) % N] - P[(i - 1) % N]) if closed else (P[min(i + 1, N - 1)] - P[max(i - 1, 0)])).normalized() for i in range(N)]
    if closed:
        U = [t.cross(Vector((0, 0, 1))).normalized() if abs(t.z) < 0.95 else t.cross(Vector((1, 0, 0))).normalized() for t in T]
    else:
        u = T[0].cross(Vector((0, 0, 1)))
        if u.length < 1e-3: u = T[0].cross(Vector((1, 0, 0)))
        U = [u.normalized()]
        for i in range(1, N):
            u = T[i - 1].rotation_difference(T[i]) @ U[-1]
            U.append((u - T[i] * u.dot(T[i])).normalized())
    def rg(p, t, u, rr):
        v = t.cross(u)
        return [p + (u * math.cos(2 * math.pi * k / seg) + v * math.sin(2 * math.pi * k / seg)) * rr for k in range(seg)]
    rings = [rg(P[i], T[i], U[i], rad(i / max(1, N - 1))) for i in range(N)]
    p0 = p1 = None
    if not closed and ends == 'dome' and Q['cap']:
        k = max(1, Q['cap'] // 2)
        for end in (0, 1):
            i = 0 if end == 0 else N - 1
            sgn = -1 if end == 0 else 1
            rr, extra = rad(0 if end == 0 else 1), []
            for j in range(1, k + 1):
                a = j / (k + 1) * math.pi / 2
                extra.append(rg(P[i] + T[i] * sgn * rr * math.sin(a), T[i], U[i], rr * math.cos(a)))
            if end == 0: rings = list(reversed(extra)) + rings; p0 = P[i] - T[i] * rr
            else: rings = rings + extra; p1 = P[i] + T[i] * rr
    return skin(rings, p0, p1, True, True, closed=closed)


def merge(*bms):
    out = bmesh.new()
    for b in bms:
        me = bpy.data.meshes.new('m'); b.to_mesh(me); out.from_mesh(me); bpy.data.meshes.remove(me); b.free()
    return out


# ------------------------------------------------------------------ the player
HC = (0.0, 0.012, 1.735)


def build():
    dec = Q['dec']
    # ---- head and neck (only skin that shows, with the hands)
    head_el = [ell((0, 0.014, 1.748), (0.079, 0.098, 0.101)),                         # cranium
               ell((0, -0.036, 1.69), (0.066, 0.062, 0.068)),                         # mid face
               ell((0, -0.055, 1.628), (0.048, 0.042, 0.034)),                        # mouth / jaw front
               ball((0, -0.082, 1.612), 0.019),                                       # chin
               cap((0.062, 0.0, 1.66), (0.03, -0.07, 1.615), 0.022),                  # jaw line L
               cap((-0.062, 0.0, 1.66), (-0.03, -0.07, 1.615), 0.022),                # jaw line R
               ell((0.047, -0.07, 1.703), (0.024, 0.02, 0.017)), ell((-0.047, -0.07, 1.703), (0.024, 0.02, 0.017)),  # cheekbones
               cap((-0.042, -0.086, 1.742), (0.042, -0.086, 1.742), 0.0135),          # brow ridge
               cap((0, -0.093, 1.728), (0, -0.108, 1.69), 0.0085),                    # nose bridge
               ball((0, -0.109, 1.684), 0.0125), ball((0.0135, -0.1, 1.679), 0.0085), ball((-0.0135, -0.1, 1.679), 0.0085),  # nose tip, wings
               ell((0, -0.0925, 1.656), (0.022, 0.009, 0.0065)), ell((0, -0.09, 1.643), (0.02, 0.009, 0.0075)),  # lips
               ell((0.032, -0.083, 1.716), (0.019, 0.014, 0.012), neg=True), ell((-0.032, -0.083, 1.716), (0.019, 0.014, 0.012), neg=True),  # eye sockets
               cap((0, 0.004, 1.47), (0, 0.0, 1.66), 0.058),                          # neck
               ell((0.035, -0.02, 1.56), (0.02, 0.05, 0.05)), ell((-0.035, -0.02, 1.56), (0.02, 0.05, 0.05))]  # neck muscles
    hb = field('head', head_el, 0.0028)
    cut_plane(hb, (0, 0, 1.49), (0, 0, 1))
    delete_faces(hb, lambda c: c.y > 0.0 and c.z > 1.66)  # hidden inside the helmet shell
    hb = decimate(hb, int(HERO_TRIS['head'] * dec))
    part('head', hb, 'skin', bones=HEAD_B)
    if Q['eyes']:
        for sx in (1, -1):
            e = ellipsoid((0.032 * sx, -0.077, 1.716), (0.0118, 0.0118, 0.0118), kr=5, ks=10)
            lay = e.faces.layers.int.new('reg')
            for f in e.faces:
                n = (f.calc_center_median() - Vector((0.032 * sx, -0.077, 1.716))).normalized()
                f[lay] = R['iris'] if n.y < -0.86 else R['eyeWhite']
            part(f'eye{sx}', e, 'eyeWhite', rigid='head')
            part(f'lid{sx}', ellipsoid((0.032 * sx, -0.079, 1.7255), (0.016, 0.011, 0.0065), kr=3, ks=8, z0=-0.2), 'skin', rigid='head')
            part(f'brow{sx}', tube([(0.014 * sx, -0.099, 1.738), (0.034 * sx, -0.1, 1.743), (0.052 * sx, -0.093, 1.738)], 0.0035, ends='dome'), 'brow', rigid='head')
    # ---- pants first: the jersey tucks into them
    pants_el = [ell((0, 0.004, 0.96), (0.128, 0.084, 0.09)), ell((0, -0.005, 1.06), (0.14, 0.1, 0.05)),
                ell((0, -0.005, 1.09), (0.138, 0.1, 0.04))] + sym(lambda sx: torso_elems(sx)[-1:] + leg_elems(sx, shin=False) + [
                ell((0.116 * sx, -0.058, 0.535), (0.05, 0.03, 0.058)), ell((0.11 * sx, -0.068, 0.75), (0.05, 0.024, 0.09)), ell((0.13 * sx, 0.0, 0.93), (0.02, 0.04, 0.04))])
    pb = field('pants', pants_el, 0.0055, ease=0.004)  # loop 7: a closer fit (was 6 mm)
    cut_plane(pb, (0, 0, 1.092), (0, 0, -1))
    cut_plane(pb, (0, 0, 0.445), (0, 0, 1))
    pants_tree = BVHTree.FromBMesh(pb)
    # ---- jersey over shoulder pads: one offset field, cut at the waist, sleeves and neck
    pads = sym(lambda sx: [ell((0.185 * sx, 0.0, 1.475), (0.15, 0.175, 0.085)), ell((0.275 * sx, 0.0, 1.43), (0.075, 0.1, 0.085)),
                           ell((0.12 * sx, -0.105, 1.38), (0.085, 0.04, 0.07)), ell((0.12 * sx, 0.11, 1.38), (0.085, 0.04, 0.07))])
    jersey_el = torso_core() + sym(torso_elems) + pads + sym(lambda sx: arm_elems(sx, fore=False))
    jb = field('jersey', jersey_el, 0.0055, ease=0.012)
    cut_plane(jb, (0, 0, 1.02), (0, 0, 1))
    for sx in (1, -1):
        S, E = Vector(BONES['armL' if sx > 0 else 'armR']), Vector(BONES['foreL' if sx > 0 else 'foreR'])
        d = (S - E).normalized()
        cut_plane(jb, S - d * 0.2, d, region=lambda c, sx=sx: c.x * sx > 0.2 and c.z < 1.42)  # sleeve hem 20 cm down the arm
    delete_faces(jb, lambda c: c.z > 1.47 and (c.x / 0.078) ** 2 + ((c.y + 0.012) / 0.072) ** 2 < 1)
    jb = decimate(jb, int(HERO_TRIS['jersey'] * dec))
    for sx in (1, -1):  # sleeve hems: decimation leaves the opening zig-zagging off its cut; relax it along the edge, back onto the plane
        S, E = Vector(BONES['armL' if sx > 0 else 'armR']), Vector(BONES['foreL' if sx > 0 else 'foreR'])
        d = (S - E).normalized(); P = S - d * 0.2
        rim = [v for v in jb.verts if v.is_boundary and v.co.x * sx > 0.2 and v.co.z < 1.42]
        nb = {v: [e.other_vert(v) for e in v.link_edges if e.is_boundary] for v in rim}
        for _ in range(4):
            new = {v: (v.co * 0.5 + (nb[v][0].co + nb[v][1].co) * 0.25) if len(nb[v]) == 2 else v.co.copy() for v in rim}
            for v, c in new.items(): v.co = c - d * (c - P).dot(d)
    for v in jb.verts:  # tuck: below the waistband the jersey goes 4 mm inside the pants, easing out above it
        if v.co.z > 1.13: continue
        hit = pants_tree.find_nearest(v.co)
        if not hit[0]: continue
        loc, nrm = hit[0], hit[1]
        out = (v.co - loc).dot(nrm)
        k = smoothstep(1.13, 1.085, v.co.z)
        if out > -0.004: v.co -= nrm * (out + 0.004) * k
    if Q['folds']:
        displace(jb, lambda p: 0.003 * (0.3 + 0.7 * smoothstep(1.28, 1.05, p.z)) * ridged(p, 14, 14, 4) * (1 - smoothstep(1.4, 1.5, p.z)))
    tag_jersey(jb)
    part('jersey', jb, 'jersey', bones=TOP_B)
    collar = boundary_loops(jb, lambda co: co.z > 1.42)
    for i, lp in enumerate(collar):
        pts = smooth_loop(lp, 28, 8)
        part(f'collar{i}', tube(pts, 0.0095, closed=True, n=max(12, int(Q['tpm'] * 0.5))), 'collar', bones=TOP_B)
    for i, lp in enumerate(boundary_loops(jb, lambda co: abs(co.x) > 0.2 and 1.15 < co.z < 1.4) if Q['cap'] else []):
        pts = smooth_loop(lp, 24, 4)
        part(f'hem{i}', tube(pts, 0.004, closed=True, seg=max(4, Q['tseg'] - 4), n=max(10, int(Q['tpm'] * 0.4))), 'sleeve', bones=TOP_B)
    # ---- compression undersleeves to the wrist
    ub = field('under', sym(arm_elems), 0.0045, ease=0.003)
    cut_plane(ub, (0, 0, 0.958), (0, 0, 1))
    cut_plane(ub, (0, 0, 1.4), (0, 0, -1))
    part('undersleeve', decimate(ub, int(HERO_TRIS['undersleeve'] * 2 * dec)), 'undersleeve', bones=ARM_B)
    # ---- hands
    for sx in (1, -1):
        hand_el = [ell((0.302 * sx, -0.004, 0.9), (0.019, 0.043, 0.047)), ell((0.296 * sx, -0.03, 0.912), (0.017, 0.02, 0.03)),
                   cap((0.301 * sx, -0.002, 0.93), (0.30 * sx, -0.003, 0.985), 0.026)]
        if not Q['fingers']:
            hand_el.append(ell((0.304 * sx, -0.002, 0.835), (0.017, 0.042, 0.04)))
        hb2 = decimate(field('hand', hand_el, 0.003), max(80, int(HERO_TRIS['hand'] * dec)))
        part(f'palm{sx}', hb2, 'hands', rigid='fore' + ('L' if sx > 0 else 'R'))
        if Q['fingers']:
            for i, (y, ln) in enumerate(((-0.031, 0.07), (-0.0105, 0.078), (0.0105, 0.073), (0.03, 0.06))):
                # a relaxed hand: fingers close together and curl toward the palm (the thigh side), not straight tines
                ln *= 0.88
                pts = [((0.303 - 0.05 * t ** 1.6) * sx, y * (0.92 - 0.12 * t), 0.862 - ln * (t - 0.28 * t * t)) for t in (0, 0.36, 0.68, 1.0)]
                rf = lambda t: 0.0092 * (1 - 0.16 * t) * (1 + 0.08 * math.exp(-((t - 0.36) / 0.07) ** 2) + 0.06 * math.exp(-((t - 0.68) / 0.06) ** 2))
                part(f'finger{sx}{i}', tube(pts, rf, ends='dome', lo=6), 'hands', rigid='fore' + ('L' if sx > 0 else 'R'))
            part(f'thumb{sx}', tube([(0.3 * sx, -0.03, 0.925), (0.296 * sx, -0.053, 0.9), (0.289 * sx, -0.064, 0.872), (0.282 * sx, -0.066, 0.85)],
                                    lambda t: 0.0108 * (1 - 0.18 * t), ends='dome', lo=6), 'hands', rigid='fore' + ('L' if sx > 0 else 'R'))
    # ---- pants with knee and thigh pads, cut at the waist and below the knee
    pb = decimate(pb, int(HERO_TRIS['pants'] * dec))
    if Q['folds']:
        displace(pb, lambda p: 0.0022 * (0.45 + 0.55 * math.exp(-((p.z - 0.6) / 0.08) ** 2) + 0.4 * math.exp(-((p.z - 0.93) / 0.07) ** 2)) * ridged(Vector((p.x, p.y, p.z + 0.35 * p.y)), 11, 11, 34))
    part('pants', pb, 'pants', bones=LEG_B + ('spine',))  # the waistband bends with the jersey tucked into it
    # belt: a band laid on the pants surface
    tree = BVHTree.FromBMesh(pb)
    def around(z, off):
        pts = []
        for i in range(segs(28, 10)):
            a = 2 * math.pi * i / segs(28, 10)
            d = Vector((math.sin(a), -math.cos(a), 0))
            hit = tree.ray_cast(Vector((0, 0, z)) + d * 0.5, -d)[0]
            pts.append((hit if hit else Vector((0, 0, z)) + d * 0.17) + d * off)
        return pts
    rings = [around(1.04, 0.003), around(1.04, 0.007), around(1.078, 0.007), around(1.078, 0.003)]
    part('belt', skin(rings, closed=False), 'belt', bones=('pelvis', 'spine'))
    if Q['studs']:
        part('buckle', loft([(0, -0.142, 1.044, 0.022, 0.004), (0, -0.142, 1.074, 0.022, 0.004)], k=6, rpm=0), 'buckle', bones=('pelvis', 'spine'))
    # ---- socks
    sb = field('socks', sym(lambda sx: leg_elems(sx, thigh=False)), 0.0045, ease=0.003)
    cut_plane(sb, (0, 0, 0.48), (0, 0, -1))
    cut_plane(sb, (0, 0, 0.1), (0, 0, 1))
    part('socks', decimate(sb, int(HERO_TRIS['sock'] * 2 * dec)), 'socks', bones=LEG_B)
    # ---- cleats
    for sx in (1, -1):
        shin = 'shin' + ('L' if sx > 0 else 'R')
        cx = 0.12 * sx
        up = loft([(cx, -0.04, 0.012, 0.047, 0.125), (cx, -0.042, 0.04, 0.05, 0.13), (cx, -0.035, 0.07, 0.046, 0.115), (cx, -0.01, 0.1, 0.04, 0.075), (cx, 0.0, 0.125, 0.043, 0.055)],
                  k=20, caps=(True, False))
        part(f'cleat{sx}', up, 'cleat', rigid=shin)
        part(f'sole{sx}', loft([(cx, -0.042, 0.0 if not Q['studs'] else 0.009, 0.05, 0.134), (cx, -0.042, 0.02, 0.052, 0.137)], k=20, rpm=0), 'sole', rigid=shin)
        part(f'heel{sx}', ellipsoid((cx, 0.06, 0.06), (0.046, 0.03, 0.05), kr=4, ks=10, z0=-0.6, z1=0.85), 'cleat', rigid=shin)
        if Q['cap']: part(f'collarC{sx}', tube([(cx + 0.044 * math.cos(a), 0.003 + 0.056 * math.sin(a), 0.125) for a in [2 * math.pi * i / 16 for i in range(16)]], 0.006, closed=True, seg=max(4, Q['tseg'] - 4), n=max(8, int(Q['tpm'] * 0.3))), 'cleat', rigid=shin)
        if Q['studs']:
            for dx, dy in ((0.028, -0.1), (-0.028, -0.1), (0, -0.143), (0.03, -0.045), (-0.03, -0.045), (0.026, 0.035), (-0.026, 0.035), (0, 0.062)):
                part(f'stud{sx}{dx}{dy}', loft([(cx + dx, dy, 0.0, 0.0055, 0.0055), (cx + dx, dy, 0.0105, 0.0085, 0.0085)], k=5, rpm=0), 'studs', rigid=shin)
        if Q['laces']:
            part(f'tongue{sx}', loft([(cx, -0.07, 0.07, 0.022, 0.05), (cx, -0.06, 0.1, 0.02, 0.04)], k=14, dome=(0, 0.3)), 'cleat', rigid=shin)
            for i in range(6):
                y = -0.112 + 0.016 * i
                z = 0.068 + 0.006 * i
                part(f'lace{sx}{i}', tube([(cx - 0.02, y, z), (cx, y - 0.002, z + 0.004), (cx + 0.02, y, z)], 0.0024, seg=max(4, Q['tseg'] - 4), lo=3), 'laces', rigid=shin)
    # ---- helmet
    helmet(dec)


def tag_jersey(bm):
    """Split the jersey into torso / sleeve regions and the number decal boxes."""
    lay = bm.faces.layers.int.get('reg') or bm.faces.layers.int.new('reg')
    for f in bm.faces:
        c = f.calc_center_median()
        sx = 1 if c.x > 0 else -1
        d, t = seg_dist(c, SEGS['arm' + ('L' if sx > 0 else 'R')][0], SEGS['arm' + ('L' if sx > 0 else 'R')][1])
        # the sleeve: the outer arm below the deltoid, plus the whole ring around the arm further down (so the hem
        # stripes go all the way round instead of stopping in teeth where the inner arm faces the torso)
        reg = 'sleeve' if (abs(c.x) > 0.25 and c.z < 1.4) or (t > 0.4 and d < 0.085) else 'jersey'
        fc, bc = NUM_FRONT, NUM_BACK
        if c.y < -0.05 and abs(c.x - fc['c'][0]) < fc['w'] / 2 + 0.01 and abs(c.z - fc['c'][1]) < fc['h'] / 2 + 0.01: reg = 'numFront'
        if c.y > 0.05 and abs(c.x - bc['c'][0]) < bc['w'] / 2 + 0.01 and abs(c.z - bc['c'][1]) < bc['h'] / 2 + 0.01: reg = 'numBack'
        # sleeve number: only triangles wholly inside its box, so none reach down and cut wedges out of the hem stripes
        if abs(c.x) > 0.3 and f.normal.x * sx > 0.5 and all(abs(v.co.y - NUM_TV['c'][0]) < NUM_TV['w'] / 2 + 0.012 and abs(v.co.z - NUM_TV['c'][1]) < NUM_TV['h'] / 2 + 0.012 for v in f.verts): reg = 'numTV'
        f[lay] = R[reg]


def helmet(dec):
    # shell: a loft (narrower jaw line, fuller crown) with a real face opening and ear holes, then given thickness;
    # Solidify's rim faces become the rubber edge.
    rings = [(0, 0.028, 1.6, 0.118, 0.134), (0, 0.02, 1.64, 0.134, 0.154), (0, 0.015, 1.69, 0.148, 0.166), (0, 0.012, 1.735, 0.152, 0.17),
             (0, 0.012, 1.78, 0.146, 0.165), (0, 0.01, 1.83, 0.12, 0.139), (0, 0.008, 1.866, 0.078, 0.094)]
    sh = loft(rings, k=30, caps=(False, True), dome=(0, 0.32))
    ref = BVHTree.FromBMesh(sh)
    def top(x): return 1.768 - max(0.0, abs(x) - 0.05) ** 2 * 9.0
    def side(z): return 0.086 + 0.12 * max(0.0, 1.66 - z) ** 1.0 * 2.0
    def inside(c): return c.y < -0.02 and c.z < top(c.x) and abs(c.x) < side(c.z)
    delete_faces(sh, inside)
    for s in (1, -1):  # ear holes
        delete_faces(sh, lambda c, s=s: c.x * s > 0.1 and (c.y - 0.012) ** 2 + (c.z - 1.712) ** 2 < 0.013 ** 2)
    for v in sh.verts:  # pull the jagged opening edge onto the true outline
        if not v.is_boundary or v.co.y > -0.01 or v.co.z < 1.605: continue
        x, z = v.co.x, v.co.z
        dz, dx = abs(z - top(x)), abs(abs(x) - side(z))
        if dz < dx: z = top(x)
        else: x = math.copysign(side(z), x)
        hit = ref.ray_cast(Vector((x, -1.0, z)), Vector((0, 1, 0)))[0]
        if hit: v.co = hit
    ob = bm_to_object(sh); sh.free()
    sol = ob.modifiers.new('s', 'SOLIDIFY'); sol.thickness = 0.007; sol.offset = -1; sol.use_rim = True; sol.use_even_offset = True; sol.material_offset_rim = 1
    ob.data.materials.append(bpy.data.materials.new('shell')); ob.data.materials.append(bpy.data.materials.new('rimm'))
    sh = object_to_bm(ob)
    lay = sh.faces.layers.int.new('reg')
    for f in sh.faces:
        c = f.calc_center_median()
        reg = 'rim' if f.material_index == 1 else 'helmet'
        if reg == 'helmet' and abs(c.x) > 0.09 and abs(c.y - DECAL['c'][0]) < DECAL['w'] / 2 + 0.01 and abs(c.z - DECAL['c'][1]) < DECAL['h'] / 2 + 0.01 and f.normal.x * c.x > 0: reg = 'helmetDecal'
        f[lay] = R[reg]
    part('helmet', sh, 'helmet', rigid='head')
    for sx in (1, -1):
        part(f'jaw{sx}', ellipsoid((0.087 * sx, -0.05, 1.655), (0.03, 0.06, 0.048), kr=5, ks=9), 'jawpad', rigid='head')
    # facemask: four bars, three uprights, side struts into the shell with clips, welds at crossings
    MR = 0.182
    def bar_y(x): return HC[1] - MR * 0.98 * math.cos(math.asin(max(-1, min(1, x / MR))))
    bars = [(1.712, -1.25, 1.25), (1.668, -1.05, 1.05), (1.628, -0.75, 0.75), (1.755, -1.3, 1.3)][:Q['bars']]
    ups = [-0.05, 0.0, 0.05] if Q['bars'] >= 4 else [0.0]
    br = 0.0075
    for z, a0, a1 in bars:
        part(f'bar{z}', tube([(MR * math.sin(a), HC[1] - MR * math.cos(a) * 0.98, z) for a in [a0 + (a1 - a0) * i / 12 for i in range(13)]], br, lo=3), 'mask', rigid='head')
    for x in ups:
        part(f'up{x}', tube([(x, bar_y(x), 1.62), (x, bar_y(x), 1.76)], br), 'mask', rigid='head')
    if Q['struts']:
        for z, a0, a1 in bars:
            for a in (a0, a1):
                e = Vector((MR * math.sin(a), HC[1] - MR * math.cos(a) * 0.98, z))
                d = Vector((e.x - HC[0], e.y - HC[1], 0)).normalized()
                hit = ref.ray_cast(e + d * 0.1, -d)[0]
                sp = hit if hit else e - d * 0.02
                if (sp - e).length > 0.004: part(f'strut{z}{a}', tube([e, sp], br, n=2), 'mask', rigid='head')
                part(f'clip{z}{a}', ellipsoid(tuple(sp + d * 0.003), (0.011, 0.011, 0.011), kr=2.5, ks=5), 'rim', rigid='head')
            for x in ups:
                if abs(x) <= MR * math.sin(min(abs(a0), abs(a1))): part(f'weld{z}{x}', ellipsoid((x, bar_y(x), z), (br * 1.35,) * 3, kr=2, ks=4), 'mask', rigid='head')
    # chin strap and cup
    part('strap', tube([(0.128, -0.03, 1.665), (0.07, -0.098, 1.6), (0, -0.112, 1.585), (-0.07, -0.098, 1.6), (-0.128, -0.03, 1.665)], 0.0065, seg=max(5, Q['tseg'] - 3)), 'strap', rigid='head')
    if Q['struts']: part('chincup', ellipsoid((0, -0.104, 1.594), (0.027, 0.012, 0.021), kr=4, ks=9), 'chincup', rigid='head')


# ------------------------------------------------------------------ skinning, uv, export
WAIST = (0.97, 1.17)  # pelvis -> spine share rises over this height
HIPS = (0.97, 0.80)   # pelvis -> thigh share rises over this height


def weights_for(p, allowed=None):
    """Primary bone = the allowed capsule the point is deepest inside; blend toward the parent / child across each
    joint (two influences, as players-hd.json). The waist and hips are thicker than their blend radius, so there the
    share goes by height instead: the jersey, belt and pants (the same rule for all three) bend smoothly together in a
    deep stance instead of splitting along the capsule boundary."""
    best, bone = 1e9, 'spine'
    for b, (a, e, r) in SEGS.items():
        if allowed and b not in allowed: continue
        d, _ = seg_dist(p, a, e)
        if d - r < best: best, bone = d - r, b
    ok = lambda *bs: all(not allowed or b in allowed for b in bs)
    thigh = 'thighL' if p.x >= 0 else 'thighR'
    if bone in ('pelvis', 'spine', thigh) and 0.62 <= p.z < WAIST[1]:
        if p.z >= WAIST[0]:
            w = smoothstep(*WAIST, p.z) if ok('spine') else 0.0
            return ('spine', 'pelvis', w) if w > 0.004 else ('pelvis', 'pelvis', 1.0)
        if ok('pelvis', thigh):
            seam = smoothstep(0.0, 0.06, abs(p.x))  # the crotch seam stays on the pelvis, the inner thighs below it don't
            w = smoothstep(*HIPS, p.z) * (seam + (1 - seam) * smoothstep(0.88, 0.76, p.z))
            return (thigh, 'pelvis', w) if w > 0.004 else ('pelvis', 'pelvis', 1.0)
    if PARENT[bone] and bone in BLEND and (not allowed or PARENT[bone] in allowed):
        d = (p - Vector(BONES[bone])).length
        k = 0.5 * (1 - smoothstep(0, BLEND[bone], d))
        if k > 0.004: return bone, PARENT[bone], 1 - k
    for child, par in PARENT.items():
        if par == bone and child in BLEND and (not allowed or child in allowed):
            d = (p - Vector(BONES[child])).length
            k = 0.5 * (1 - smoothstep(0, BLEND[child], d))
            if k > 0.004: return bone, child, 1 - k
    return bone, bone, 1.0


def around_axis(p, a, b, outer):
    """Arc-length coordinate around a limb axis (0 on the outer side, positive toward the front) and distance along it."""
    a, b = Vector(a), Vector(b)
    ax = (b - a).normalized()
    rel = p - a
    t = rel.dot(ax)
    radial = rel - ax * t
    o = (Vector(outer) - ax * Vector(outer).dot(ax)).normalized()
    f = ax.cross(o)
    if f.y > 0: f = -f
    ang = math.atan2(radial.dot(f), radial.dot(o))
    return ang * radial.length, t


def uv_for(reg, p, n):
    sx = 1 if p.x >= 0 else -1
    s = 'L' if sx > 0 else 'R'
    name = REGIONS[reg]
    if name in ('jersey', 'collar', 'belt'):
        ang = math.atan2(p.x, -p.y)
        return ang * math.hypot(p.x, p.y), p.z
    if name == 'sleeve':
        a, b, _ = SEGS['arm' + s]
        return around_axis(p, a, b, (sx, 0, 0))
    if name == 'undersleeve':
        a, b, _ = SEGS['arm' + s]
        u, t = around_axis(p, a, b, (sx, 0, 0))
        if t > (Vector(b) - Vector(a)).length:
            u, t2 = around_axis(p, SEGS['fore' + s][0], SEGS['fore' + s][1], (sx, 0, 0))
            t = (Vector(b) - Vector(a)).length + t2
        return u, t
    if name in ('pants', 'socks'):
        a, b, _ = SEGS['thigh' + s] if name == 'pants' else SEGS['shin' + s]
        u, _t = around_axis(p, a, b, (sx, 0, 0))
        return u, p.z
    if name == 'numFront':
        return (p.x - NUM_FRONT['c'][0]) / NUM_FRONT['w'] + 0.5, (p.z - NUM_FRONT['c'][1]) / NUM_FRONT['h'] + 0.5
    if name == 'numBack':
        return (NUM_BACK['c'][0] - p.x) / NUM_BACK['w'] + 0.5, (p.z - NUM_BACK['c'][1]) / NUM_BACK['h'] + 0.5
    if name == 'numTV':
        return sx * (p.y - NUM_TV['c'][0]) / NUM_TV['w'] + 0.5, (p.z - NUM_TV['c'][1]) / NUM_TV['h'] + 0.5
    if name == 'helmetDecal':
        return -sx * (p.y - DECAL['c'][0]) / DECAL['w'] + 0.5, (p.z - DECAL['c'][1]) / DECAL['h'] + 0.5
    if name in ('helmet', 'rim'):
        return p.x, p.z
    return 0.0, 0.0


def export_lod(name):
    pos, nrm, slot, b1, b2, ww, uv, rg = [], [], [], [], [], [], [], []
    groups = {}
    cosT = math.cos(math.radians(40))
    for prt in PARTS:
        bm = prt['bm']
        bmesh.ops.triangulate(bm, faces=bm.faces[:])
        bm.normal_update()
        lay = bm.faces.layers.int.get('reg')
        wcache = {}
        groups[prt['name'].rstrip('-0123456789.LR')] = groups.get(prt['name'].rstrip('-0123456789.LR'), 0) + len(bm.faces)
        for f in bm.faces:
            reg = f[lay] if lay else 0
            for loop in f.loops:
                v = loop.vert
                if f.smooth:
                    n = Vector()
                    for g in v.link_faces:
                        if g.normal.dot(f.normal) > cosT: n += g.normal * g.calc_area()
                    n = n.normalized() if n.length > 1e-12 else f.normal
                else:
                    n = f.normal
                x, y, z = v.co
                pos += [x, z, -y]; nrm += [n.x, n.z, -n.y]
                slot.append(SLOT[SLOT_OF[REGIONS[reg]]]); rg.append(reg)
                if prt['rigid']: a, b, w = prt['rigid'], prt['rigid'], 1.0
                else:
                    if v.index not in wcache: wcache[v.index] = weights_for(v.co, prt['bones'])
                    a, b, w = wcache[v.index]
                b1.append(BONE_LIST.index(a)); b2.append(BONE_LIST.index(b)); ww.append(int(round(w * 255)))
                uv += list(uv_for(reg, v.co, n))
    ext = max(abs(c) for c in pos)
    qs = ext / 32000.0
    enc = lambda b: base64.b64encode(b).decode('ascii')
    m = {'count': len(slot), 'qs': qs,
         'pos': enc(struct.pack('<%dh' % len(pos), *[int(round(c / qs)) for c in pos])),
         'nrm': enc(struct.pack('<%db' % len(nrm), *[max(-127, min(127, int(round(c * 127)))) for c in nrm])),
         'slot': enc(bytes(slot)), 'bone': enc(bytes(b1)), 'bone2': enc(bytes(b2)), 'w': enc(bytes(ww)),
         'uv': enc(struct.pack('<%dh' % len(uv), *[max(-32767, min(32767, int(round(c * 1000)))) for c in uv])),
         'reg': enc(bytes(rg))}
    data = {'boneList': BONE_LIST, 'bones': {k: [v[0], v[2], -v[1]] for k, v in BONES.items()}, 'parent': PARENT, 'regions': REGIONS, 'slots': SLOT, 'lod': name,
            'boxes': {'numFront': NUM_FRONT, 'numBack': NUM_BACK, 'numTV': NUM_TV, 'decal': DECAL}, 'models': {'player': m}}
    path = os.path.join(OUT if name == 'hero' else GAME_OUT, f'{name}.json')
    with open(path, 'w', newline='\n') as fh: json.dump(data, fh, separators=(',', ':'))
    zs = pos[1::3]
    return dict(tris=len(slot) // 3, bytes=os.path.getsize(path), height=max(zs) - min(zs), parts=len(PARTS), groups=groups)


# preview colours for the GLB's per-region materials (Hot Springs home); the showroom and the game paint real kits from src/js/kits.js
PREVIEW = {'skin': '#8D5524', 'eyeWhite': '#E6DED2', 'iris': '#2B1B12', 'brow': '#17110D', 'jersey': '#111111', 'sleeve': '#111111', 'collar': '#D4A017',
           'numFront': '#D4A017', 'numBack': '#D4A017', 'numTV': '#D4A017', 'undersleeve': '#111111', 'hands': '#1E1E1E', 'belt': '#111111',
           'buckle': '#B9BDC3', 'pants': '#D4A017', 'socks': '#111111', 'cleat': '#141414', 'sole': '#E4E4E2', 'laces': '#F2F2F0', 'studs': '#3A3C40',
           'helmet': '#111111', 'helmetDecal': '#111111', 'rim': '#141414', 'jawpad': '#1C1C1E', 'mask': '#D9DCE0', 'strap': '#ECECEC', 'chincup': '#F4F4F4'}


def export_glb(path):
    """Skinned glTF of the same mesh: an armature whose bones point +Z with roll 0 (identity rest rotations in
    three.js, like models.js makeSkeleton), two-bone vertex groups, one PBR material per region, the pattern uv."""
    arm_data = bpy.data.armatures.new('rig')
    arm = bpy.data.objects.new('rig', arm_data); bpy.context.scene.collection.objects.link(arm)
    bpy.context.view_layer.objects.active = arm; arm.select_set(True)
    bpy.ops.object.mode_set(mode='EDIT')
    for name in BONE_LIST:
        eb = arm_data.edit_bones.new(name); eb.head = BONES[name]; eb.tail = Vector(BONES[name]) + Vector((0, 0, 0.06)); eb.roll = 0
    for name in BONE_LIST:
        if PARENT[name]: arm_data.edit_bones[name].parent = arm_data.edit_bones[PARENT[name]]
    bpy.ops.object.mode_set(mode='OBJECT')
    V, F, M, UV, W = [], [], [], [], []
    for prt in PARTS:
        bm = prt['bm']; lay = bm.faces.layers.int.get('reg'); bm.verts.index_update()
        o = len(V)
        for v in bm.verts:
            V.append(v.co.copy())
            W.append((prt['rigid'], prt['rigid'], 1.0) if prt['rigid'] else weights_for(v.co, prt['bones']))
        for f in bm.faces:
            reg = f[lay] if lay else 0
            F.append([v.index + o for v in f.verts]); M.append(reg)
            UV.append([uv_for(reg, v.co, f.normal) for v in f.verts])
    me = bpy.data.meshes.new('player'); me.from_pydata(V, [], F); me.update()
    for name in REGIONS:
        m = bpy.data.materials.new(name)
        try: m.use_nodes = True
        except Exception: pass
        b = m.node_tree.nodes.get('Principled BSDF')
        h = PREVIEW[name]; c = [int(h[i:i + 2], 16) / 255 for i in (1, 3, 5)]
        b.inputs['Base Color'].default_value = (*[x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c], 1)
        b.inputs['Roughness'].default_value = 0.25 if name in ('helmet', 'helmetDecal') else 0.6
        me.materials.append(m)
    me.polygons.foreach_set('material_index', M)
    me.shade_smooth()
    uvl = me.uv_layers.new(name='pattern')
    k = 0
    for poly, uvs in zip(me.polygons, UV):
        for li, uv in zip(poly.loop_indices, uvs): uvl.data[li].uv = uv
    ob = bpy.data.objects.new('player', me); bpy.context.scene.collection.objects.link(ob)
    groups = {n: ob.vertex_groups.new(name=n) for n in BONE_LIST}
    for i, (a, b, w) in enumerate(W):
        groups[a].add([i], w, 'REPLACE')
        if b != a: groups[b].add([i], 1 - w, 'REPLACE')
    ob.parent = arm
    mod = ob.modifiers.new('arm', 'ARMATURE'); mod.object = arm
    bpy.ops.export_scene.gltf(filepath=path, export_format='GLB', use_selection=False, export_yup=True, export_skins=True,
                              export_animations=False, export_apply=False, export_texcoords=True, export_normals=True)
    return os.path.getsize(path)


def main():
    global L, Q, PARTS
    argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
    todo = argv or list(LODS)
    os.makedirs(OUT, exist_ok=True); os.makedirs(GAME_OUT, exist_ok=True)
    sp = os.path.join(OUT, 'stats.json')
    stats = json.load(open(sp)) if os.path.exists(sp) else {}
    for lod in todo:
        bpy.ops.wm.read_factory_settings(use_empty=True)
        calibrate()
        L, Q, PARTS = lod, LODS[lod], []
        build()
        st = export_lod(lod)
        if lod == 'hero': st['glbBytes'] = export_glb(os.path.join(OUT, 'hero.glb'))
        stats[lod] = st
        print(f'{lod}: {st["tris"]} tris, {st["bytes"] / 1024:.0f} KB json, height {st["height"]:.3f} m, {st["parts"]} parts, {st["groups"]}')
    with open(sp, 'w', newline='\n') as fh: json.dump(stats, fh, indent=1)


main() if "--debug" not in sys.argv else None
