# Friday Night Spa City: low-poly 3D models built in Blender and exported for the three.js field view.
#
#   "C:\Program Files\Blender Foundation\Blender 5.2\blender.exe" -b --factory-startup --python art-src/blender/build_models.py
#
# Builds the player (helmet, facemask, shoulder pads, jersey number panels), the game official and the
# stadium light tower from lofted rings and tubes, saves art-src/blender/models.blend, renders previews to
# art-src/blender/renders/ (git-ignored) and writes src/js/models-data.js: compact, quantized vertex data
# (position, normal, color slot, bone, uv) that src/js/models.js turns into three.js geometry.
# Every part carries a "bone" (rigid skinning; the game animates the bones in code) and a "slot" (which team
# color the shader paints it). No textures, logos or third-party assets.
import bpy, bmesh, math, os, json, base64, struct
from mathutils import Vector, Matrix

HERE = os.path.dirname(os.path.abspath(__file__))
GAME = os.path.normpath(os.path.join(HERE, '..', '..'))
OUT_JS = os.path.join(GAME, 'src', 'js', 'models-data.js')
RENDERS = os.path.join(HERE, 'renders')

SLOT = dict(jersey=0, trim=1, pants=2, helmet=3, mask=4, skin=5, shoes=6, socks=7, glove=8, number=9,
            steel=10, housing=11, lamp=12, stripe=13, cap=14)
PREVIEW = {0: (0.55, 0.08, 0.10), 1: (0.95, 0.80, 0.25), 2: (0.92, 0.90, 0.85), 3: (0.55, 0.08, 0.10), 4: (0.85, 0.85, 0.85),
           5: (0.62, 0.42, 0.30), 6: (0.08, 0.08, 0.08), 7: (0.55, 0.08, 0.10), 8: (0.15, 0.15, 0.15), 9: (1, 1, 1),
           10: (0.55, 0.57, 0.6), 11: (0.25, 0.26, 0.28), 12: (1.0, 0.97, 0.85), 13: (0.9, 0.9, 0.9), 14: (0.05, 0.05, 0.05)}

# ------------------------------------------------------------------ scene
bpy.ops.wm.read_factory_settings(use_empty=True)
COLL = {}
def collection(name):
    if name not in COLL:
        c = bpy.data.collections.new(name); bpy.context.scene.collection.children.link(c); COLL[name] = c
    return COLL[name]

def new_obj(name, bm, model, bone, slot, smooth=True):
    me = bpy.data.meshes.new(name)
    for f in bm.faces: f.smooth = smooth
    bm.to_mesh(me); bm.free()
    ob = bpy.data.objects.new(name, me)
    collection(model).objects.link(ob)
    ob['bone'] = bone; ob['slot'] = slot; ob['model'] = model
    mat = bpy.data.materials.get('slot%d' % slot)
    if not mat:
        mat = bpy.data.materials.new('slot%d' % slot); mat.diffuse_color = (*PREVIEW[slot], 1)
    me.materials.append(mat)
    return ob

def loft(name, rings, model, bone, slot, seg=10, caps=(True, True), smooth=True, phase=0.0):
    """rings: [(cx, cy, cz, rx, ry)] stacked bottom to top, each an ellipse in the XY plane."""
    bm = bmesh.new(); loops = []
    for (cx, cy, cz, rx, ry) in rings:
        loops.append([bm.verts.new((cx + rx * math.cos(2 * math.pi * k / seg + phase), cy + ry * math.sin(2 * math.pi * k / seg + phase), cz)) for k in range(seg)])
    for a, b in zip(loops, loops[1:]):
        for k in range(seg):
            bm.faces.new((a[k], a[(k + 1) % seg], b[(k + 1) % seg], b[k]))
    if caps[0]: bm.faces.new(list(reversed(loops[0])))
    if caps[1]: bm.faces.new(loops[-1])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    return new_obj(name, bm, model, bone, slot, smooth)

def tube(name, pts, r, model, bone, slot, seg=5, smooth=True):
    """A tube along a polyline (for facemask bars, stripes, cap brims)."""
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
    return new_obj(name, bm, model, bone, slot, smooth)

def box(name, c, s, model, bone, slot, rot=None, taper=None):
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1.0)
    for v in bm.verts:
        x, y, z = v.co
        if taper and z > 0: x *= taper[0]; y *= taper[1]
        v.co = Vector((x * s[0], y * s[1], z * s[2]))
    if rot: bmesh.ops.rotate(bm, verts=bm.verts, cent=(0, 0, 0), matrix=rot)
    bmesh.ops.translate(bm, verts=bm.verts, vec=Vector(c))
    return new_obj(name, bm, model, bone, slot, smooth=False)

def quad(name, c, w, h, normal_sign, model, bone, slot, up=False):
    """A flat number panel. Front panels face -Y, back panels +Y, top panels +Z. UVs read correctly from outside."""
    bm = bmesh.new()
    if up:  # lying flat on the shoulder, readable from behind the player (+Y side)
        vs = [(c[0] - w / 2, c[1] - h / 2, c[2]), (c[0] + w / 2, c[1] - h / 2, c[2]), (c[0] + w / 2, c[1] + h / 2, c[2]), (c[0] - w / 2, c[1] + h / 2, c[2])]
        uvs = [(1, 1), (0, 1), (0, 0), (1, 0)]
    elif normal_sign < 0:  # front
        vs = [(c[0] - w / 2, c[1], c[2] - h / 2), (c[0] + w / 2, c[1], c[2] - h / 2), (c[0] + w / 2, c[1], c[2] + h / 2), (c[0] - w / 2, c[1], c[2] + h / 2)]
        uvs = [(0, 0), (1, 0), (1, 1), (0, 1)]
    else:  # back, seen from +Y: left/right swap
        vs = [(c[0] + w / 2, c[1], c[2] - h / 2), (c[0] - w / 2, c[1], c[2] - h / 2), (c[0] - w / 2, c[1], c[2] + h / 2), (c[0] + w / 2, c[1], c[2] + h / 2)]
        uvs = [(0, 0), (1, 0), (1, 1), (0, 1)]
    vv = [bm.verts.new(v) for v in vs]
    f = bm.faces.new(vv)
    uvl = bm.loops.layers.uv.new('UVMap')
    for loop, uv in zip(f.loops, uvs): loop[uvl].uv = uv
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    if (f.normal.y > 0) != (normal_sign > 0) and not up: f.normal_flip()
    if up and f.normal.z < 0: f.normal_flip()
    return new_obj(name, bm, model, bone, slot, smooth=False)

def ellipsoid(name, c, r, model, bone, slot, rings=6, seg=10, z0=-1.0, z1=1.0):
    pts = []
    for i in range(rings + 1):
        t = z0 + (z1 - z0) * i / rings
        k = math.sqrt(max(0.0, 1 - t * t))
        pts.append((c[0], c[1], c[2] + t * r[2], max(1e-3, r[0] * k), max(1e-3, r[1] * k)))
    return loft(name, pts, model, bone, slot, seg=seg, caps=(z0 > -0.999, z1 < 0.999))

# ------------------------------------------------------------------ bones (rest pose, metres, front = -Y)
BONES = {
    'pelvis': (0, 0, 0.98), 'spine': (0, 0, 1.05), 'head': (0, 0, 1.57),
    'armL': (0.27, 0, 1.45), 'foreL': (0.29, 0, 1.17), 'armR': (-0.27, 0, 1.45), 'foreR': (-0.29, 0, 1.17),
    'thighL': (0.105, 0, 0.95), 'shinL': (0.115, 0, 0.52), 'thighR': (-0.105, 0, 0.95), 'shinR': (-0.115, 0, 0.52),
}
PARENT = {'pelvis': None, 'spine': 'pelvis', 'head': 'spine', 'armL': 'spine', 'foreL': 'armL', 'armR': 'spine', 'foreR': 'armR',
          'thighL': 'pelvis', 'shinL': 'thighL', 'thighR': 'pelvis', 'shinR': 'thighR'}

def limbs(model, sleeve=True, pads=True):
    for s, sx in (('L', 1), ('R', -1)):
        x0 = 0.27 * sx
        # upper arm: jersey sleeve over the top, a trim band, then skin
        loft(f'{model}_sleeve{s}', [(x0 + 0.02 * sx, 0, 1.28, 0.068, 0.066), (x0 + 0.01 * sx, 0, 1.40, 0.078, 0.074), (x0, 0, 1.47, 0.07, 0.07)], model, 'arm' + s, SLOT['jersey'] if sleeve else SLOT['stripe'], seg=8)
        if sleeve: loft(f'{model}_band{s}', [(x0 + 0.02 * sx, 0, 1.265, 0.07, 0.068), (x0 + 0.02 * sx, 0, 1.30, 0.071, 0.069)], model, 'arm' + s, SLOT['trim'], seg=8, caps=(False, False))
        loft(f'{model}_bicep{s}', [(x0 + 0.025 * sx, 0, 1.16, 0.05, 0.05), (x0 + 0.02 * sx, 0, 1.29, 0.058, 0.058)], model, 'arm' + s, SLOT['skin'], seg=8)
        # forearm + glove
        loft(f'{model}_fore{s}', [(0.30 * sx, 0, 0.95, 0.036, 0.036), (0.295 * sx, 0, 1.06, 0.046, 0.046), (0.29 * sx, 0, 1.18, 0.05, 0.05)], model, 'fore' + s, SLOT['skin'], seg=8)
        box(f'{model}_hand{s}', (0.302 * sx, -0.005, 0.895), (0.05, 0.085, 0.11), model, 'fore' + s, SLOT['glove'] if pads else SLOT['skin'])
        # thigh (pants), knee, shin (sock), shoe
        tx = 0.105 * sx
        loft(f'{model}_thigh{s}', [(0.115 * sx, 0, 0.50, 0.066, 0.07), (0.112 * sx, 0, 0.62, 0.078, 0.082), (tx, 0, 0.82, 0.105, 0.11), (tx * 0.9, 0, 0.98, 0.11, 0.115)], model, 'thigh' + s, SLOT['pants'], seg=9)
        if pads: tube(f'{model}_pantstripe{s}', [((0.115 * sx + 0.072 * sx), 0, 0.52), ((tx + 0.1 * sx), 0, 0.82), ((tx * 0.9 + 0.1 * sx), 0, 0.97)], 0.012, model, 'thigh' + s, SLOT['trim'], seg=4)
        loft(f'{model}_shin{s}', [(0.12 * sx, 0.01, 0.09, 0.042, 0.046), (0.12 * sx, 0, 0.30, 0.055, 0.062), (0.116 * sx, 0, 0.46, 0.055, 0.06), (0.115 * sx, 0, 0.53, 0.062, 0.066)], model, 'shin' + s, SLOT['socks'] if pads else SLOT['pants'], seg=8)
        box(f'{model}_shoe{s}', (0.12 * sx, -0.045, 0.045), (0.1, 0.27, 0.09), model, 'shin' + s, SLOT['shoes'], taper=(0.9, 0.8))

def build_player():
    m = 'player'
    # pants: hips
    loft('player_hips', [(0, 0, 0.84, 0.17, 0.125), (0, 0, 0.95, 0.185, 0.135), (0, 0.0, 1.06, 0.17, 0.125)], m, 'pelvis', SLOT['pants'], seg=12)
    # jersey torso with the shoulder-pad flare
    loft('player_torso', [(0, 0, 1.03, 0.165, 0.12), (0, 0, 1.18, 0.19, 0.14), (0, 0, 1.33, 0.25, 0.165), (0, 0, 1.43, 0.325, 0.18), (0, 0, 1.5, 0.31, 0.175), (0, 0, 1.565, 0.18, 0.125)], m, 'spine', SLOT['jersey'], seg=12)
    for s, sx in (('L', 1), ('R', -1)):  # shoulder pad caps
        ellipsoid(f'player_pad{s}', (0.21 * sx, 0, 1.48), (0.15, 0.175, 0.085), m, 'spine', SLOT['jersey'], rings=4, seg=10, z0=-0.2)
    loft('player_neck', [(0, 0.0, 1.5, 0.062, 0.062), (0, 0.0, 1.63, 0.058, 0.058)], m, 'head', SLOT['skin'], seg=8)
    # number panels: chest, back, and "TV numbers" on the shoulders
    quad('player_numFront', (0, -0.168, 1.27), 0.2, 0.17, -1, m, 'spine', SLOT['number'])
    quad('player_numBack', (0, 0.174, 1.27), 0.24, 0.2, 1, m, 'spine', SLOT['number'])
    for s, sx in (('L', 1), ('R', -1)):
        quad(f'player_numTop{s}', (0.215 * sx, 0.0, 1.568), 0.11, 0.11, 1, m, 'spine', SLOT['number'], up=True)
    # helmet shell, face, facemask, center stripe
    hc = (0, 0.012, 1.735)
    ellipsoid('player_helmet', hc, (0.148, 0.165, 0.152), m, 'head', SLOT['helmet'], rings=7, seg=14, z0=-0.62)
    ellipsoid('player_face', (0, -0.075, 1.705), (0.085, 0.09, 0.1), m, 'head', SLOT['skin'], rings=5, seg=10)
    R = 0.178
    for z, a0, a1 in ((1.70, -1.1, 1.1), (1.655, -0.9, 0.9), (1.745, -1.2, 1.2)):
        pts = [(R * math.sin(a), hc[1] - R * math.cos(a) * 0.98, z) for a in [a0 + (a1 - a0) * i / 8 for i in range(9)]]
        tube(f'player_mask{z}', pts, 0.0085, m, 'head', SLOT['mask'], seg=4)
    tube('player_maskV', [(0, hc[1] - R * 0.98, 1.64), (0, hc[1] - R * 0.98, 1.75)], 0.0085, m, 'head', SLOT['mask'], seg=4)
    stripe = [(0, hc[1] + 0.168 * math.sin(a) * -1, hc[2] + 0.156 * math.cos(a)) for a in [-1.25 + 2.6 * i / 10 for i in range(11)]]
    tube('player_stripe', [(x, -y + 2 * hc[1], z) for (x, y, z) in stripe], 0.022, m, 'head', SLOT['trim'], seg=6)
    limbs(m, sleeve=True, pads=True)

def build_official():
    m = 'official'
    loft('official_hips', [(0, 0, 0.84, 0.16, 0.12), (0, 0, 0.95, 0.17, 0.125), (0, 0, 1.06, 0.16, 0.12)], m, 'pelvis', SLOT['pants'], seg=12)
    loft('official_torso', [(0, 0, 1.03, 0.16, 0.12), (0, 0, 1.2, 0.175, 0.13), (0, 0, 1.36, 0.19, 0.135), (0, 0, 1.45, 0.2, 0.13), (0, 0, 1.52, 0.12, 0.09)], m, 'spine', SLOT['stripe'], seg=12)
    loft('official_neck', [(0, 0.0, 1.48, 0.055, 0.055), (0, 0.0, 1.6, 0.052, 0.052)], m, 'head', SLOT['skin'], seg=8)
    ellipsoid('official_head', (0, 0.0, 1.69), (0.085, 0.1, 0.11), m, 'head', SLOT['skin'], rings=6, seg=10)
    ellipsoid('official_cap', (0, 0.01, 1.73), (0.095, 0.105, 0.09), m, 'head', SLOT['cap'], rings=4, seg=10, z0=0.0)
    box('official_brim', (0, -0.1, 1.735), (0.15, 0.09, 0.012), m, 'head', SLOT['cap'])
    limbs(m, sleeve=False, pads=False)

def build_tower():
    m = 'tower'
    H = 24.0
    loft('tower_pole', [(0, 0, 0, 0.36, 0.36), (0, 0, H * 0.5, 0.27, 0.27), (0, 0, H, 0.19, 0.19)], m, 'root', SLOT['steel'], seg=8)
    box('tower_base', (0, 0, 0.4), (1.1, 1.1, 0.8), m, 'root', SLOT['steel'])
    # crossarm frame with three rows of fixtures aimed down at the field (field is toward -Y)
    for r in range(3):
        z = H + 0.6 + r * 1.15
        box(f'tower_arm{r}', (0, 0.1, z - 0.5), (6.2, 0.16, 0.16), m, 'root', SLOT['steel'])
        for k in range(5):
            x = -2.4 + k * 1.2
            tilt = Matrix.Rotation(math.radians(38), 3, 'X')
            box(f'tower_fix{r}_{k}', (x, -0.12, z), (0.78, 0.42, 0.7), m, 'root', SLOT['housing'], rot=tilt)
            # the lamp face: a flat panel on the field side of the housing
            bm = bmesh.new()
            vs = [Vector((-0.34, 0, -0.3)), Vector((0.34, 0, -0.3)), Vector((0.34, 0, 0.3)), Vector((-0.34, 0, 0.3))]
            vv = [bm.verts.new(tilt @ (v + Vector((0, -0.215, 0))) + Vector((x, -0.12, z))) for v in vs]
            f = bm.faces.new(vv)
            bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
            if f.normal.y > 0: f.normal_flip()
            new_obj(f'tower_lamp{r}_{k}', bm, m, 'root', SLOT['lamp'], smooth=False)
    box('tower_cage', (0, 0.25, H - 1.0), (0.9, 0.9, 1.6), m, 'root', SLOT['housing'])

build_player(); build_official(); build_tower()

# ------------------------------------------------------------------ export
def export_model(model, bone_names):
    pos, nrm, slot, bone, uv = [], [], [], [], []
    for ob in collection(model).objects:
        me = ob.data
        bm = bmesh.new(); bm.from_mesh(me)
        bmesh.ops.triangulate(bm, faces=bm.faces)
        uvl = bm.loops.layers.uv.active
        b = bone_names.index(ob['bone'])
        for f in bm.faces:
            for loop in f.loops:
                v = loop.vert
                n = v.normal if f.smooth else f.normal
                x, y, z = v.co
                pos += [x, z, -y]           # Blender (Z up, front -Y) -> three.js (Y up, front +Z)
                nrm += [n.x, n.z, -n.y]
                slot.append(int(ob['slot'])); bone.append(b)
                if uvl: uv += [loop[uvl].uv.x, loop[uvl].uv.y]
                else: uv += [-1.0, -1.0]
        bm.free()
    ext = max(abs(c) for c in pos) or 1.0
    qs = ext / 32000.0
    P = struct.pack('<%dh' % len(pos), *[int(round(c / qs)) for c in pos])
    N = struct.pack('<%db' % len(nrm), *[max(-127, min(127, int(round(c * 127)))) for c in nrm])
    S = bytes(slot); B = bytes(bone)
    U = struct.pack('<%dh' % len(uv), *[int(round(c * 1000)) for c in uv])
    enc = lambda b: base64.b64encode(b).decode('ascii')
    return {'count': len(slot), 'qs': qs, 'pos': enc(P), 'nrm': enc(N), 'slot': enc(S), 'bone': enc(B), 'uv': enc(U)}

BONE_LIST = list(BONES.keys())
models = {
    'player': export_model('player', BONE_LIST),
    'official': export_model('official', BONE_LIST),
    'tower': export_model('tower', ['root']),
}
bones = {k: [v[0], v[2], -v[1]] for k, v in BONES.items()}
with open(OUT_JS, 'w', newline='\n') as fh:
    fh.write('// GENERATED by art-src/blender/build_models.py (Blender). Do not edit by hand.\n')
    fh.write('// Quantized low-poly meshes: int16 positions (x qs), int8 normals, uint8 color slot + bone, int16 uv (/1000).\n')
    fh.write('export const MODEL_DATA = ' + json.dumps({'slots': SLOT, 'bones': bones, 'parent': PARENT, 'boneList': BONE_LIST, 'models': models}) + ';\n')
print('tris', {k: v['count'] // 3 for k, v in models.items()})

bpy.ops.wm.save_as_mainfile(filepath=os.path.join(HERE, 'models.blend'))

# ------------------------------------------------------------------ preview renders (git-ignored)
os.makedirs(RENDERS, exist_ok=True)
scene = bpy.context.scene
scene.render.engine = 'BLENDER_WORKBENCH'
scene.display.shading.light = 'STUDIO'
scene.display.shading.color_type = 'MATERIAL'
scene.render.resolution_x = 900; scene.render.resolution_y = 900
cam = bpy.data.objects.new('cam', bpy.data.cameras.new('cam')); scene.collection.objects.link(cam); scene.camera = cam
def shoot(model, target, dist, fname, az=-35, el=12, lens=50):
    for name, c in COLL.items(): c.hide_render = name != model
    a, e = math.radians(az), math.radians(el)
    cam.location = Vector(target) + Vector((math.sin(a) * dist * -1, -math.cos(a) * dist, math.sin(e) * dist))
    d = Vector(target) - cam.location
    cam.rotation_euler = d.to_track_quat('-Z', 'Y').to_euler()
    cam.data.lens = lens
    scene.render.filepath = os.path.join(RENDERS, fname)
    bpy.ops.render.render(write_still=True)
shoot('player', (0, 0, 1.0), 4.2, 'player-front.png')
shoot('player', (0, 0, 1.0), 4.2, 'player-back.png', az=150)
shoot('official', (0, 0, 1.0), 4.2, 'official.png')
shoot('tower', (0, 0, 20), 40, 'tower.png', az=-20, el=5)
