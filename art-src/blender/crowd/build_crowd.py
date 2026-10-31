# Crowd sprite cells for the Medium/High crowd (src/js/crowd3d.js). Builds simple smooth people (a vertex skeleton
# with a Skin modifier, subdivided), poses them, and renders each pose to a 64x128 cell from a slightly raised
# front camera, twice: a shaded color pass (light from the field) and a flat ID mask pass (R shirt, G skin, B cap or
# hair, A coverage). tools/pack-crowd.mjs packs the cells into atlases and assets/pack-crowd.js.
#
#   "C:\Program Files\Blender Foundation\Blender 5.2\blender.exe" -b --factory-startup --python art-src/blender/crowd/build_crowd.py
#
# Bodies: 4 builds (slim, broad, short, tall). Poses (2 frames each): sit, sit-clap, sit-lean, stand, stand-clap,
# arms-up, wave, jump, point, phone, band-hold, band-play, hands-mouth, fist-pump, sit-cheer, stand-lean.
import bpy, bmesh, math, os
from mathutils import Vector

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', '..', 'crowd-cells')
os.makedirs(OUT, exist_ok=True)
CW, CH = 64, 128

def clear():
    bpy.ops.wm.read_factory_settings(use_empty=True)

# A pose is a dict of joint positions (metres, figure facing -Y toward the camera, feet at z=0 when standing).
# Seated poses sit on a bench at z=0.45 with thighs forward.
def joints(pose, frame, build):
    h, w = build['h'], build['w']
    s = h / 1.75
    up = lambda z: z * s
    stand = pose in ('stand', 'stand-clap', 'arms-up', 'wave', 'jump', 'point', 'phone', 'hands-mouth', 'fist-pump', 'stand-lean', 'band-hold', 'band-play')
    lift = 0.12 * s if pose == 'jump' and frame == 1 else 0.0
    J = {}
    if stand:
        J['pelvis'] = (0, 0, up(0.95) + lift)
        J['kneeL'], J['kneeR'] = (-0.1 * w, -0.02, up(0.5) + lift), (0.1 * w, -0.02, up(0.5) + lift)
        J['footL'], J['footR'] = (-0.11 * w, -0.04, 0.04 + lift), (0.11 * w, -0.04, 0.04 + lift)
    else:
        J['pelvis'] = (0, 0.05, up(0.5))
        J['kneeL'], J['kneeR'] = (-0.11 * w, -0.38, up(0.5)), (0.11 * w, -0.38, up(0.5))
        J['footL'], J['footR'] = (-0.12 * w, -0.42, 0.04), (0.12 * w, -0.42, 0.04)
    px, py, pz = J['pelvis']
    lean = {'sit-lean': 0.12, 'stand-lean': 0.1, 'sit-cheer': -0.04}.get(pose, 0.0)
    J['chest'] = (px, py - lean, pz + up(0.42))
    J['neck'] = (px, py - lean * 1.3, pz + up(0.56))
    J['head'] = (px, py - lean * 1.5, pz + up(0.68))
    cx, cy, cz = J['chest']
    sh = 0.19 * w
    J['shL'], J['shR'] = (cx - sh, cy, cz + up(0.06)), (cx + sh, cy, cz + up(0.06))
    def arm(side, elbow, hand):
        sx, sy, sz = J['sh' + side]
        J['el' + side] = (sx + elbow[0], sy + elbow[1], sz + up(elbow[2]))
        J['ha' + side] = (sx + hand[0], sy + hand[1], sz + up(hand[2]))
    f = frame
    clap = (0.02 if f else 0.09)
    A = {
        'rest': ((-0.06, -0.05, -0.26), (-0.04, -0.2, -0.42)),
        'lap': ((-0.04, -0.18, -0.24), (0.06, -0.32, -0.34)),
        'clapL': ((0.02, -0.2, -0.18), (sh - clap, -0.35, -0.02)),
        'clapR': ((-0.02, -0.2, -0.18), (-(sh - clap), -0.35, -0.02)),
        'up': ((-0.08, 0, 0.22), (-0.12 - 0.05 * f, -0.05, 0.5)),
        'upR': ((0.08, 0, 0.22), (0.12 + 0.05 * f, -0.05, 0.5)),
        'wave': ((0.16, 0, 0.12), (0.24 + (0.1 if f else -0.02), -0.04, 0.42)),
        'point': ((0.05, -0.25, 0.08), (0.1, -0.55, 0.2)),
        'phone': ((0.0, -0.22, -0.12), (sh * 0.6, -0.3, 0.12)),
        'mouthL': ((-0.02, -0.2, 0.0), (sh - 0.03, -0.18, 0.2)),
        'mouthR': ((0.02, -0.2, 0.0), (-(sh - 0.03), -0.18, 0.2)),
        'fist': ((0.1, -0.05, 0.18 + 0.08 * f), (0.08, -0.08, 0.42 + 0.1 * f)),
        'hold': ((-0.02, -0.22, -0.1), (0.1, -0.3, 0.05)),
        'holdR': ((0.02, -0.22, -0.1), (-0.1, -0.3, 0.05 + (0.05 if f else 0))),
    }
    mirror = lambda v: (-v[0], v[1], v[2])
    L, R = A['rest'], tuple(mirror(v) for v in A['rest'])
    if pose in ('sit', 'sit-lean'): L = A['lap']; R = tuple(mirror(v) for v in A['lap'])
    if pose in ('sit-clap', 'stand-clap'): L, R = A['clapL'], A['clapR']
    if pose in ('arms-up', 'jump', 'sit-cheer'): L, R = A['up'], A['upR']
    if pose == 'wave': R = A['wave']
    if pose == 'point': R = A['point']
    if pose == 'phone': R = A['phone']
    if pose == 'hands-mouth': L, R = A['mouthL'], A['mouthR']
    if pose == 'fist-pump': R = A['fist']
    if pose in ('band-hold', 'band-play'): L, R = A['hold'], A['holdR']
    if pose == 'stand-lean': L = A['lap']
    arm('L', *L); arm('R', *R)
    return J

EDGES = [('pelvis', 'kneeL'), ('kneeL', 'footL'), ('pelvis', 'kneeR'), ('kneeR', 'footR'), ('pelvis', 'chest'), ('chest', 'neck'),
         ('neck', 'head'), ('chest', 'shL'), ('chest', 'shR'), ('shL', 'elL'), ('elL', 'haL'), ('shR', 'elR'), ('elR', 'haR')]
RADIUS = {'pelvis': 0.16, 'kneeL': 0.075, 'kneeR': 0.075, 'footL': 0.06, 'footR': 0.06, 'chest': 0.17, 'neck': 0.06, 'head': 0.105,
          'shL': 0.075, 'shR': 0.075, 'elL': 0.05, 'elR': 0.05, 'haL': 0.045, 'haR': 0.045}
# which material each joint's skin takes (by nearest joint): 0 shirt, 1 skin, 2 pants, 3 cap/hair
PART = {'pelvis': 2, 'kneeL': 2, 'kneeR': 2, 'footL': 2, 'footR': 2, 'chest': 0, 'neck': 1, 'head': 1, 'shL': 0, 'shR': 0, 'elL': 0, 'elR': 0, 'haL': 1, 'haR': 1}

def mat(name, rgb, emit=False):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    for n in list(nt.nodes): nt.nodes.remove(n)
    out = nt.nodes.new('ShaderNodeOutputMaterial')
    if emit:
        e = nt.nodes.new('ShaderNodeEmission'); e.inputs['Color'].default_value = (*rgb, 1); e.inputs['Strength'].default_value = 1
        nt.links.new(e.outputs[0], out.inputs[0])
    else:
        b = nt.nodes.new('ShaderNodeBsdfPrincipled'); b.inputs['Base Color'].default_value = (*rgb, 1); b.inputs['Roughness'].default_value = 0.8
        nt.links.new(b.outputs[0], out.inputs[0])
    return m

def figure(J, build, cap):
    me = bpy.data.meshes.new('fig')
    names = list(J.keys())
    me.from_pydata([J[n] for n in names], [(names.index(a), names.index(b)) for a, b in EDGES], [])
    ob = bpy.data.objects.new('fig', me)
    bpy.context.scene.collection.objects.link(ob)
    sk = ob.modifiers.new('skin', 'SKIN')
    ob.data.skin_vertices[0].data[names.index('pelvis')].use_root = True
    for i, n in enumerate(names):
        r = RADIUS[n] * build['w'] * (1.15 if n in ('chest', 'pelvis') and build['w'] > 1 else 1)
        ob.data.skin_vertices[0].data[i].radius = (r, r * (0.8 if n in ('chest', 'pelvis') else 1))
    sub = ob.modifiers.new('sub', 'SUBSURF'); sub.levels = 2; sub.render_levels = 2
    bpy.context.view_layer.objects.active = ob
    for m in list(ob.modifiers): bpy.ops.object.modifier_apply(modifier=m.name)
    # material per face by nearest bone segment: legs pants, torso and upper arms shirt (tucked just below the
    # waist), forearms, hands and neck skin
    for mname in ('shirt', 'skin', 'pants', 'cap'):
        ob.data.materials.append(bpy.data.materials[mname])
    SEG = {('pelvis', 'kneeL'): 2, ('kneeL', 'footL'): 2, ('pelvis', 'kneeR'): 2, ('kneeR', 'footR'): 2, ('pelvis', 'chest'): 0, ('chest', 'neck'): 0,
           ('neck', 'head'): 1, ('chest', 'shL'): 0, ('chest', 'shR'): 0, ('shL', 'elL'): 0, ('elL', 'haL'): 1, ('shR', 'elR'): 0, ('elR', 'haR'): 1}
    segs = [(Vector(J[a]), Vector(J[b]), p) for (a, b), p in SEG.items()]
    def dseg(c, a, b):
        ab = b - a; t = max(0.0, min(1.0, (c - a).dot(ab) / max(ab.length_squared, 1e-9)))
        return (a + ab * t - c).length
    waist = J['pelvis'][2] + 0.1
    for poly in ob.data.polygons:
        c = poly.center
        a, b, part = min(segs, key=lambda s_: dseg(c, s_[0], s_[1]))
        if part == 0 and c.z < waist and (a - Vector(J['pelvis'])).length < 1e-6: part = 2
        poly.material_index = part
    # a real head (the skin modifier only leaves a nub), with hair or a cap
    hx, hy, hz = J['head']
    s = build['h'] / 1.75
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.105 * s, location=(hx, hy, hz + 0.05 * s), segments=20, ring_count=12)
    head = bpy.context.active_object; head.scale = (0.9, 0.95, 1.08); head.data.materials.append(bpy.data.materials['skin'])
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.112 * s, location=(hx, hy + 0.012, hz + 0.075 * s), segments=20, ring_count=12)
    top = bpy.context.active_object; top.scale = (0.95, 1.0, 0.8 if cap else 0.72)
    top.data.materials.append(bpy.data.materials['cap'])
    bm = bmesh.new(); bm.from_mesh(top.data)  # keep the upper part only: a hair cap or a ball cap
    bmesh.ops.delete(bm, geom=[v for v in bm.verts if v.co.z < (-0.02 if cap else 0.01)], context='VERTS'); bm.to_mesh(top.data); bm.free()
    if cap:
        bpy.ops.mesh.primitive_cylinder_add(radius=0.07 * s, depth=0.012, location=(hx, hy - 0.11 * s, hz + 0.075 * s))
        brim = bpy.context.active_object; brim.scale = (1.3, 1.0, 1.0); brim.data.materials.append(bpy.data.materials['cap'])
    return ob

POSES = ['sit', 'sit-clap', 'sit-lean', 'stand', 'stand-clap', 'arms-up', 'wave', 'jump', 'point', 'phone', 'band-hold', 'band-play', 'hands-mouth', 'fist-pump', 'sit-cheer', 'stand-lean']
BUILDS = [dict(h=1.72, w=0.95), dict(h=1.80, w=1.18), dict(h=1.55, w=0.88), dict(h=1.88, w=1.02)]

def setup_scene():
    sc = bpy.context.scene
    sc.render.engine = 'BLENDER_EEVEE'
    sc.render.resolution_x, sc.render.resolution_y = CW * 4, CH * 4  # supersampled, packed down by the packer
    sc.render.film_transparent = True
    sc.render.image_settings.file_format = 'PNG'
    sc.render.image_settings.color_mode = 'RGBA'
    sc.view_settings.view_transform = 'Standard'
    cam = bpy.data.objects.new('cam', bpy.data.cameras.new('cam'))
    cam.data.type = 'ORTHO'; cam.data.ortho_scale = 2.3
    sc.collection.objects.link(cam); sc.camera = cam
    el = math.radians(10)
    cam.location = (0, -6 * math.cos(el), 1.0 + 6 * math.sin(el))
    cam.rotation_euler = (math.radians(90) - el, 0, 0)
    key = bpy.data.objects.new('key', bpy.data.lights.new('key', 'SUN')); key.data.energy = 3.2
    key.rotation_euler = (math.radians(55), 0, math.radians(-20)); sc.collection.objects.link(key)
    fill = bpy.data.objects.new('fill', bpy.data.lights.new('fill', 'SUN')); fill.data.energy = 0.8
    fill.rotation_euler = (math.radians(70), 0, math.radians(160)); sc.collection.objects.link(fill)
    w = bpy.data.worlds.new('w'); w.use_nodes = True
    w.node_tree.nodes['Background'].inputs['Color'].default_value = (0.08, 0.09, 0.12, 1)
    sc.world = w

def render(path):
    bpy.context.scene.render.filepath = path
    bpy.ops.render.render(write_still=True)

clear()
setup_scene()
shade = {'shirt': (0.85, 0.85, 0.85), 'skin': (0.85, 0.85, 0.85), 'pants': (0.11, 0.12, 0.15), 'cap': (0.1, 0.09, 0.08)}
idc = {'shirt': (1, 0, 0), 'skin': (0, 1, 0), 'pants': (0, 0, 0), 'cap': (0, 0, 1)}
for k, v in shade.items(): mat(k, v)
for k, v in idc.items(): mat('id_' + k, v, emit=True)
n = 0
for bi, build in enumerate(BUILDS):
    for pi, pose in enumerate(POSES):
        for f in (0, 1):
            ob = figure(joints(pose, f, build), build, cap=(bi + pi) % 3 == 0)
            if pose in ('band-hold', 'band-play'):  # a horn in front of the chest
                bpy.ops.mesh.primitive_cylinder_add(radius=0.05, depth=0.35, location=(0, -0.3, J := joints(pose, f, build)['chest'][2]), rotation=(math.radians(80), 0, 0))
                horn = bpy.context.active_object; horn.data.materials.append(bpy.data.materials['cap'])
            base = os.path.join(OUT, f'b{bi}-p{pi:02d}-f{f}')
            render(base + '-color.png')
            for o in [o for o in bpy.context.scene.objects if o.type == 'MESH']:
                for i, s in enumerate(o.material_slots):
                    s.material = bpy.data.materials['id_' + s.material.name] if not s.material.name.startswith('id_') else s.material
            render(base + '-mask.png')
            for o in [o for o in bpy.context.scene.objects if o.type == 'MESH']:
                bpy.data.objects.remove(o, do_unlink=True)
            n += 1
print(f'crowd cells: {n} ({len(BUILDS)} builds x {len(POSES)} poses x 2 frames) -> {OUT}')
