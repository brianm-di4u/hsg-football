# HD player and official for the Medium/High tiers (VISUAL-PLAN-2.md, Phase 4). Same 11-bone skeleton and rest pose
# as art-src/blender/build_models.py, so the procedural poses in players3d.js drive it unchanged, but a far finer body:
# subdivided smooth parts, two-bone skin weights blended across every joint (no rigid segments), a helmet with jaw
# pads and a multi-bar facemask, shoulder-pad rims, gloves with thumbs, cleats with soles, knee pads.
# Writes art-src/players-hd.json; tools/pack-players.mjs turns it into assets/pack-players.js.
#
#   "C:\Program Files\Blender Foundation\Blender 5.2\blender.exe" -b --factory-startup --python art-src/blender/players/build_hd.py
import bpy, bmesh, math, os, json, struct, base64
from mathutils import Vector

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', '..', 'players-hd.json')
SLOT = dict(jersey=0, trim=1, pants=2, helmet=3, mask=4, skin=5, shoes=6, socks=7, glove=8, number=9, steel=10, housing=11, lamp=12, stripe=13, cap=14)
BONES = {
    'pelvis': (0, 0, 0.98), 'spine': (0, 0, 1.05), 'head': (0, 0, 1.57),
    'armL': (0.27, 0, 1.45), 'foreL': (0.29, 0, 1.17), 'armR': (-0.27, 0, 1.45), 'foreR': (-0.29, 0, 1.17),
    'thighL': (0.105, 0, 0.95), 'shinL': (0.115, 0, 0.52), 'thighR': (-0.105, 0, 0.95), 'shinR': (-0.115, 0, 0.52),
}
PARENT = {'pelvis': None, 'spine': 'pelvis', 'head': 'spine', 'armL': 'spine', 'foreL': 'armL', 'armR': 'spine', 'foreR': 'armR',
          'thighL': 'pelvis', 'shinL': 'thighL', 'thighR': 'pelvis', 'shinR': 'thighR'}
BONE_LIST = list(BONES.keys())
# blend radius (m) around each child joint
BLEND = {'spine': 0.07, 'head': 0.05, 'armL': 0.07, 'armR': 0.07, 'foreL': 0.06, 'foreR': 0.06, 'thighL': 0.07, 'thighR': 0.07, 'shinL': 0.065, 'shinR': 0.065}

bpy.ops.wm.read_factory_settings(use_empty=True)
PARTS = {}  # model -> [(obj, bone, slot)]

def add(model, name, bm, bone, slot, subdiv=0, smooth=True):
    me = bpy.data.meshes.new(name)
    for f in bm.faces: f.smooth = smooth
    bm.to_mesh(me); bm.free()
    ob = bpy.data.objects.new(name, me)
    bpy.context.scene.collection.objects.link(ob)
    if subdiv:
        m = ob.modifiers.new('sub', 'SUBSURF'); m.levels = subdiv; m.render_levels = subdiv
        bpy.context.view_layer.objects.active = ob
        bpy.ops.object.modifier_apply(modifier='sub')
    PARTS.setdefault(model, []).append((ob, bone, slot))
    return ob

def loft(model, name, rings, bone, slot, seg=16, caps=(True, True), subdiv=1, phase=0.0):
    bm = bmesh.new(); loops = []
    for (cx, cy, cz, rx, ry) in rings:
        loops.append([bm.verts.new((cx + rx * math.cos(2 * math.pi * k / seg + phase), cy + ry * math.sin(2 * math.pi * k / seg + phase), cz)) for k in range(seg)])
    for a, b in zip(loops, loops[1:]):
        for k in range(seg): bm.faces.new((a[k], a[(k + 1) % seg], b[(k + 1) % seg], b[k]))
    if caps[0]: bm.faces.new(list(reversed(loops[0])))
    if caps[1]: bm.faces.new(loops[-1])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    return add(model, name, bm, bone, slot, subdiv)

def ellipsoid(model, name, c, r, bone, slot, rings=10, seg=18, z0=-1.0, z1=1.0, subdiv=0):
    pts = []
    for i in range(rings + 1):
        t = z0 + (z1 - z0) * i / rings
        k = math.sqrt(max(0.0, 1 - t * t))
        pts.append((c[0], c[1], c[2] + t * r[2], max(1e-3, r[0] * k), max(1e-3, r[1] * k)))
    return loft(model, name, pts, bone, slot, seg=seg, caps=(z0 > -0.999, z1 < 0.999), subdiv=subdiv)

def tube(model, name, pts, r, bone, slot, seg=7):
    bm = bmesh.new(); loops = []
    P = [Vector(p) for p in pts]
    for i, p in enumerate(P):
        d = (P[min(i + 1, len(P) - 1)] - P[max(i - 1, 0)]).normalized()
        up = Vector((0, 0, 1)) if abs(d.z) < 0.9 else Vector((1, 0, 0))
        u = d.cross(up).normalized(); v = d.cross(u).normalized()
        loops.append([bm.verts.new(p + (u * math.cos(2 * math.pi * k / seg) + v * math.sin(2 * math.pi * k / seg)) * r) for k in range(seg)])
    for a, b in zip(loops, loops[1:]):
        for k in range(seg): bm.faces.new((a[k], a[(k + 1) % seg], b[(k + 1) % seg], b[k]))
    bm.faces.new(list(reversed(loops[0]))); bm.faces.new(loops[-1])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    return add(model, name, bm, bone, slot)

def quad(model, name, c, w, h, normal_sign, bone, slot, up=False):
    bm = bmesh.new()
    if up:
        vs = [(c[0] - w / 2, c[1] - h / 2, c[2]), (c[0] + w / 2, c[1] - h / 2, c[2]), (c[0] + w / 2, c[1] + h / 2, c[2]), (c[0] - w / 2, c[1] + h / 2, c[2])]
        uvs = [(1, 1), (0, 1), (0, 0), (1, 0)]
    elif normal_sign < 0:  # front (verified in-game with tools/dev/number-check.mjs)
        vs = [(c[0] - w / 2, c[1], c[2] - h / 2), (c[0] + w / 2, c[1], c[2] - h / 2), (c[0] + w / 2, c[1], c[2] + h / 2), (c[0] - w / 2, c[1], c[2] + h / 2)]
        uvs = [(0, 0), (1, 0), (1, 1), (0, 1)]
    else:
        vs = [(c[0] + w / 2, c[1], c[2] - h / 2), (c[0] - w / 2, c[1], c[2] - h / 2), (c[0] - w / 2, c[1], c[2] + h / 2), (c[0] + w / 2, c[1], c[2] + h / 2)]
        uvs = [(0, 0), (1, 0), (1, 1), (0, 1)]
    f = bm.faces.new([bm.verts.new(v) for v in vs])
    uvl = bm.loops.layers.uv.new('UVMap')
    for loop, uv in zip(f.loops, uvs): loop[uvl].uv = uv
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    if not up and (f.normal.y > 0) != (normal_sign > 0): f.normal_flip()
    if up and f.normal.z < 0: f.normal_flip()
    return add(model, name, bm, bone, slot, smooth=False)

def limbs(m, sleeve=True, pads=True):
    for s, sx in (('L', 1), ('R', -1)):
        x0 = 0.27 * sx
        if sleeve:
            loft(m, f'sleeve{s}', [(x0 + 0.022 * sx, 0, 1.27, 0.07, 0.068), (x0 + 0.012 * sx, 0, 1.36, 0.082, 0.078), (x0 + 0.004 * sx, 0, 1.44, 0.084, 0.08), (x0, 0, 1.5, 0.06, 0.06)], 'arm' + s, SLOT['jersey'], seg=14, caps=(False, True))
            loft(m, f'band{s}', [(x0 + 0.022 * sx, 0, 1.255, 0.073, 0.071), (x0 + 0.022 * sx, 0, 1.29, 0.074, 0.072)], 'arm' + s, SLOT['trim'], seg=14, caps=(False, False), subdiv=0)
        else:
            loft(m, f'sleeve{s}', [(x0 + 0.02 * sx, 0, 1.3, 0.066, 0.064), (x0 + 0.01 * sx, 0, 1.4, 0.07, 0.068), (x0, 0, 1.47, 0.064, 0.064)], 'arm' + s, SLOT['stripe'], seg=14, caps=(False, True))
        loft(m, f'bicep{s}', [(0.292 * sx, 0, 1.13, 0.046, 0.046), (0.288 * sx, 0.004, 1.2, 0.055, 0.057), (x0 + 0.022 * sx, 0, 1.3, 0.06, 0.06)], 'arm' + s, SLOT['skin'], seg=12)
        loft(m, f'fore{s}', [(0.302 * sx, 0, 0.95, 0.034, 0.03), (0.3 * sx, -0.003, 1.02, 0.042, 0.04), (0.296 * sx, 0, 1.1, 0.048, 0.046), (0.292 * sx, 0, 1.19, 0.05, 0.05)], 'fore' + s, SLOT['skin'], seg=12)
        # glove: palm mitten plus a thumb
        hand = SLOT['glove'] if pads else SLOT['skin']
        ellipsoid(m, f'palm{s}', (0.303 * sx, -0.004, 0.885), (0.03, 0.05, 0.075), 'fore' + s, hand, rings=8, seg=12)
        ellipsoid(m, f'thumb{s}', (0.296 * sx, -0.05, 0.905), (0.016, 0.016, 0.034), 'fore' + s, hand, rings=6, seg=8)
        # legs: pants with a knee pad, sock, cleat
        tx = 0.105 * sx
        loft(m, f'thigh{s}', [(0.116 * sx, 0, 0.47, 0.06, 0.064), (0.114 * sx, -0.004, 0.56, 0.072, 0.078), (0.112 * sx, 0, 0.68, 0.088, 0.094), (tx, 0.004, 0.83, 0.105, 0.112), (tx * 0.9, 0, 0.98, 0.11, 0.116)], 'thigh' + s, SLOT['pants'], seg=16)
        if pads:
            ellipsoid(m, f'kneepad{s}', (0.116 * sx, -0.05, 0.53), (0.055, 0.03, 0.06), 'shin' + s, SLOT['pants'], rings=6, seg=12, z0=-0.9, z1=0.9)
            tube(m, f'pantstripe{s}', [((0.116 * sx + 0.064 * sx), 0, 0.5), ((0.112 * sx + 0.09 * sx), 0, 0.68), ((tx + 0.106 * sx), 0, 0.83), ((tx * 0.9 + 0.11 * sx), 0, 0.97)], 0.011, 'thigh' + s, SLOT['trim'], seg=6)
        loft(m, f'shin{s}', [(0.12 * sx, 0.006, 0.1, 0.038, 0.042), (0.121 * sx, 0.004, 0.2, 0.046, 0.054), (0.12 * sx, 0, 0.32, 0.054, 0.064), (0.117 * sx, 0, 0.45, 0.054, 0.06), (0.116 * sx, 0, 0.52, 0.06, 0.064)], 'shin' + s, SLOT['socks'] if pads else SLOT['pants'], seg=14)
        ellipsoid(m, f'shoe{s}', (0.12 * sx, -0.05, 0.055), (0.05, 0.13, 0.05), 'shin' + s, SLOT['shoes'], rings=8, seg=16, z0=-0.55)
        loft(m, f'sole{s}', [(0.12 * sx, -0.05, 0.0, 0.052, 0.135), (0.12 * sx, -0.05, 0.028, 0.052, 0.135)], 'shin' + s, SLOT['mask'] if pads else SLOT['shoes'], seg=16, subdiv=0)

def player():
    m = 'player'
    loft(m, 'hips', [(0, 0, 0.84, 0.17, 0.126), (0, 0.005, 0.92, 0.186, 0.138), (0, 0.004, 1.0, 0.182, 0.132), (0, 0, 1.07, 0.168, 0.124)], 'pelvis', SLOT['pants'], seg=20)
    loft(m, 'belt', [(0, 0, 1.03, 0.172, 0.128), (0, 0, 1.06, 0.172, 0.128)], 'pelvis', SLOT['trim'], seg=20, caps=(False, False), subdiv=0)
    loft(m, 'torso', [(0, 0, 1.03, 0.164, 0.12), (0, -0.004, 1.14, 0.18, 0.134), (0, -0.006, 1.25, 0.21, 0.152), (0, -0.004, 1.35, 0.258, 0.168), (0, 0, 1.43, 0.318, 0.18), (0, 0, 1.5, 0.3, 0.172), (0, 0, 1.56, 0.17, 0.12)], 'spine', SLOT['jersey'], seg=22)
    for s, sx in (('L', 1), ('R', -1)):
        ellipsoid(m, f'pad{s}', (0.205 * sx, 0, 1.485), (0.152, 0.18, 0.088), 'spine', SLOT['jersey'], rings=8, seg=18, z0=-0.25)
        tube(m, f'padrim{s}', [((0.205 + 0.15 * math.cos(a)) * sx, 0.178 * math.sin(a) * 0.98, 1.47) for a in [math.pi * (0.05 + 0.9 * i / 12) for i in range(13)]], 0.009, 'spine', SLOT['trim'], seg=5)
    loft(m, 'collar', [(0, 0, 1.545, 0.105, 0.088), (0, 0, 1.575, 0.098, 0.082)], 'spine', SLOT['trim'], seg=18, caps=(False, False), subdiv=0)
    loft(m, 'neck', [(0, 0.0, 1.5, 0.062, 0.06), (0, 0.004, 1.63, 0.058, 0.056)], 'head', SLOT['skin'], seg=12)
    quad(m, 'numFront', (0, -0.174, 1.27), 0.2, 0.17, -1, 'spine', SLOT['number'])
    quad(m, 'numBack', (0, 0.18, 1.27), 0.24, 0.2, 1, 'spine', SLOT['number'])
    for s, sx in (('L', 1), ('R', -1)):
        quad(m, f'numTop{s}', (0.21 * sx, 0.0, 1.576), 0.11, 0.11, 1, 'spine', SLOT['number'], up=True)
    # helmet: shell, jaw pads, ear holes, facemask cage, chin strap, center stripe
    hc = (0, 0.012, 1.735)
    ellipsoid(m, 'helmet', hc, (0.15, 0.168, 0.154), 'head', SLOT['helmet'], rings=14, seg=28, z0=-0.6)
    for s, sx in (('L', 1), ('R', -1)):
        ellipsoid(m, f'jaw{s}', (0.112 * sx, -0.045, 1.66), (0.05, 0.08, 0.06), 'head', SLOT['helmet'], rings=8, seg=12)
        ellipsoid(m, f'ear{s}', (0.149 * sx, 0.015, 1.715), (0.008, 0.022, 0.022), 'head', SLOT['mask'], rings=4, seg=8)
    ellipsoid(m, 'face', (0, -0.078, 1.705), (0.083, 0.088, 0.1), 'head', SLOT['skin'], rings=8, seg=14)
    R = 0.182
    for z, a0, a1 in ((1.712, -1.25, 1.25), (1.668, -1.05, 1.05), (1.628, -0.75, 0.75), (1.755, -1.3, 1.3)):
        tube(m, f'mask{z}', [(R * math.sin(a), hc[1] - R * math.cos(a) * 0.98, z) for a in [a0 + (a1 - a0) * i / 12 for i in range(13)]], 0.0075, 'head', SLOT['mask'], seg=6)
    for x in (-0.05, 0.0, 0.05):
        tube(m, f'maskV{x}', [(x, hc[1] - R * 0.98 * math.cos(math.asin(x / R)), 1.62), (x, hc[1] - R * 0.98 * math.cos(math.asin(x / R)), 1.76)], 0.0072, 'head', SLOT['mask'], seg=6)
    tube(m, 'strap', [(0.12, -0.03, 1.66), (0.06, -0.11, 1.6), (0, -0.125, 1.59), (-0.06, -0.11, 1.6), (-0.12, -0.03, 1.66)], 0.008, 'head', SLOT['mask'], seg=5)
    stripe = [(0, hc[1] + 0.171 * math.sin(a) * -1, hc[2] + 0.158 * math.cos(a)) for a in [-1.25 + 2.6 * i / 16 for i in range(17)]]
    tube(m, 'stripe', [(x, -y + 2 * hc[1], z) for (x, y, z) in stripe], 0.018, 'head', SLOT['trim'], seg=8)
    limbs(m, sleeve=True, pads=True)

def official():
    m = 'official'
    loft(m, 'hips', [(0, 0, 0.84, 0.16, 0.12), (0, 0, 0.95, 0.17, 0.126), (0, 0, 1.06, 0.16, 0.12)], 'pelvis', SLOT['pants'], seg=18)
    loft(m, 'torso', [(0, 0, 1.03, 0.16, 0.12), (0, -0.004, 1.2, 0.175, 0.13), (0, -0.004, 1.36, 0.19, 0.136), (0, 0, 1.45, 0.2, 0.13), (0, 0, 1.52, 0.12, 0.09)], 'spine', SLOT['stripe'], seg=20)
    loft(m, 'neck', [(0, 0.0, 1.48, 0.055, 0.055), (0, 0.0, 1.6, 0.052, 0.052)], 'head', SLOT['skin'], seg=12)
    ellipsoid(m, 'head', (0, 0.0, 1.69), (0.085, 0.1, 0.11), 'head', SLOT['skin'], rings=10, seg=16)
    ellipsoid(m, 'cap', (0, 0.01, 1.735), (0.095, 0.105, 0.088), 'head', SLOT['cap'], rings=6, seg=16, z0=0.0)
    loft(m, 'brim', [(0, -0.105, 1.73, 0.075, 0.05), (0, -0.105, 1.742, 0.075, 0.05)], 'head', SLOT['cap'], seg=14, subdiv=0)
    limbs(m, sleeve=False, pads=False)

player(); official()

def smoothstep(e0, e1, x):
    t = max(0.0, min(1.0, (x - e0) / (e1 - e0)))
    return t * t * (3 - 2 * t)

def weights_for(p, bone):
    """Two-bone weights: blend toward the parent near this bone's own joint, toward a child near the child's joint."""
    b1, b2, w = bone, bone, 1.0
    if PARENT[bone] and bone in BLEND:
        d = (p - Vector(BONES[bone])).length
        k = 0.5 * (1 - smoothstep(0, BLEND[bone], d))
        if k > 0.001: return bone, PARENT[bone], 1 - k
    for child, par in PARENT.items():
        if par == bone and child in BLEND:
            d = (p - Vector(BONES[child])).length
            k = 0.5 * (1 - smoothstep(0, BLEND[child], d))
            if k > 0.001: return bone, child, 1 - k
    return b1, b2, w

def export(model):
    pos, nrm, slot, b1, b2, ww, uv = [], [], [], [], [], [], []
    for ob, bone, sl in PARTS[model]:
        bm = bmesh.new(); bm.from_mesh(ob.data)
        bmesh.ops.triangulate(bm, faces=bm.faces)
        uvl = bm.loops.layers.uv.active
        for f in bm.faces:
            for loop in f.loops:
                v = loop.vert
                n = v.normal if f.smooth else f.normal
                x, y, z = v.co
                pos += [x, z, -y]; nrm += [n.x, n.z, -n.y]
                slot.append(sl)
                a, b, w = weights_for(v.co, bone)
                b1.append(BONE_LIST.index(a)); b2.append(BONE_LIST.index(b)); ww.append(int(round(w * 255)))
                uv += [loop[uvl].uv.x, loop[uvl].uv.y] if uvl else [-1.0, -1.0]
        bm.free()
    ext = max(abs(c) for c in pos)
    qs = ext / 32000.0
    enc = lambda b: base64.b64encode(b).decode('ascii')
    return {'count': len(slot), 'qs': qs,
            'pos': enc(struct.pack('<%dh' % len(pos), *[int(round(c / qs)) for c in pos])),
            'nrm': enc(struct.pack('<%db' % len(nrm), *[max(-127, min(127, int(round(c * 127)))) for c in nrm])),
            'slot': enc(bytes(slot)), 'bone': enc(bytes(b1)), 'bone2': enc(bytes(b2)), 'w': enc(bytes(ww)),
            'uv': enc(struct.pack('<%dh' % len(uv), *[int(round(c * 1000)) for c in uv]))}

data = {'boneList': BONE_LIST, 'models': {'player': export('player'), 'official': export('official')}}
with open(OUT, 'w') as fh: json.dump(data, fh)
print('hd tris', {k: v['count'] // 3 for k, v in data['models'].items()})
