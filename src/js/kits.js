// Team kits for the Medium/High player (the baseline player from experiments/baseline-player, packed as
// player_lod0..2): one original design per team, home and away, compiled into what models.js kitMaterial needs: a
// colour per uniform region, stripe bands on the pattern uv, number colours and the helmet finish. Pure data (no
// three.js), so the Node tests share it. Low keeps the palette look (players3d.js uniformFor).
import { contrast } from './data.js';

export const FIXED = { W: '#F4EFE6', K: '#111111', G: '#D9DCE0', D: '#2A2C30' };
export const FINISH = { gloss: [0.2, 0.0], matte: [0.62, 0.0], metal: [0.3, 0.55] };
export const MAX_BANDS = 16;

export function resolve(c, team) {
  if (!c) return null;
  if (c[0] === '#') return c;
  if (c === 'P') return team.colors.primary;
  if (c === 'S') return team.colors.secondary;
  if (c === 'A') return team.colors.accent;
  if (FIXED[c]) return FIXED[c];
  throw new Error(`unknown colour role ${c}`);
}

// A stripe group: colours side by side, each w wide with g between, centred on `at`.
function group(regions, axis, at, g, team) {
  if (!g || !g.colors || !g.colors.length) return [];
  const n = g.colors.length, w = g.w, gap = g.g || 0, total = n * w + (n - 1) * gap;
  return g.colors.flatMap((c, i) => regions.map((reg) => ({ reg, axis, centre: at - total / 2 + w / 2 + i * (w + gap), half: w / 2, color: resolve(c, team) })));
}

// One team's look. Neutral-site games dress both teams in away kits (the caller passes home = false).
export function designFor(team, home, designs = KITS, opts = {}) {
  const d = designs.teams[team.id];
  if (!d) throw new Error(`no uniform design for ${team.id}`);
  const k = home ? d.home : d.away, h = d.helmet;
  const C = (x) => resolve(x, team);
  const skin = opts.skin || '#8D5524';
  const cleat = C(k.cleats);
  const colors = {
    skin, eyeWhite: '#E6DED2', iris: '#2B1B12', brow: '#17110D',
    jersey: C(k.jersey), sleeve: C(k.jersey), collar: C(k.collar), numFront: C(k.jersey), numBack: C(k.jersey), numTV: C(k.jersey),
    undersleeve: C(k.undersleeve), hands: k.gloves === 'skin' ? skin : C(k.gloves), belt: C(k.belt), buckle: '#B9BDC3',
    pants: C(k.pants), socks: C(k.socks), cleat, sole: contrast(cleat, '#F4F4F4') > 3 ? '#E4E4E2' : '#2A2C30',
    laces: contrast(cleat, '#F4F4F4') > 3 ? '#F2F2F0' : '#1C1C1C', studs: '#3A3C40',
    helmet: C(h.shell), helmetDecal: C(h.shell), rim: '#141414', jawpad: '#1C1C1E', mask: C(h.mask), strap: '#ECECEC', chincup: '#F4F4F4',
  };
  const bands = [];
  if (h.stripe) {
    const xs = h.stripe.flank ? [-h.stripe.flank, h.stripe.flank] : [0];
    for (const x of xs) bands.push(...group(['helmet', 'helmetDecal'], 0, x, h.stripe, team));
  }
  bands.push(...group(['sleeve'], 1, k.sleeve ? k.sleeve.at : 0, k.sleeve, team));
  bands.push(...group(['pants'], 0, 0, k.pantStripe, team));
  bands.push(...group(['socks'], 1, k.sockBands ? k.sockBands.at : 0, k.sockBands, team));
  if (bands.length > MAX_BANDS) throw new Error(`${team.id} ${home ? 'home' : 'away'}: ${bands.length} bands > ${MAX_BANDS}`);
  const number = { fill: C(k.number.fill), outline: C(k.number.outline), outline2: k.number.outline2 ? C(k.number.outline2) : null };
  return { team: team.id, home, colors, bands, number, decal: h.decal || 'none', finish: FINISH[h.finish] || FINISH.gloss, maskMetal: h.mask === 'G', handsSkin: k.gloves === 'skin' };
}

// Legibility rules for one look: the number reads against the jersey, every stripe group shows against its base.
export function checkLook(look) {
  const issues = [];
  const j = look.colors.jersey, n = look.number;
  const numC = Math.max(contrast(n.fill, j), contrast(n.outline, j));
  if (numC < 3) issues.push(`number ${n.fill}/${n.outline} on ${j}: ${numC.toFixed(2)} < 3`);
  if (contrast(n.fill, n.outline) < 1.5) issues.push(`number fill ${n.fill} vs outline ${n.outline}: ${contrast(n.fill, n.outline).toFixed(2)} < 1.5`);
  const byGroup = {};
  for (const b of look.bands) (byGroup[b.reg] = byGroup[b.reg] || []).push(b);
  for (const [reg, bs] of Object.entries(byGroup)) {
    if (reg === 'helmetDecal') continue;
    const best = Math.max(...bs.map((b) => contrast(b.color, look.colors[reg])));
    if (best < 1.4) issues.push(`${reg} stripes vs ${look.colors[reg]}: ${best.toFixed(2)} < 1.4`);
  }
  return issues;
}

// The designs. Colours are role letters resolved against the team's colours (data/schools.json, or FICTIONAL in
// data.js): P primary, S secondary, A accent, W white, K black, G light grey, D dark grey (FIXED), or a hex value.
// Stripe groups: colours side by side, each w metres wide with gap g between them, centred at 'at' (sleeves: metres
// down the arm from the shoulder joint; socks: height in metres; pants and helmet: centred on the outer seam / crown
// line). All designs are original; helmet art is the game's own geometric mascot badge (art.js), never a school logo.
export const KITS = {
 "teams": {
  "hot-springs": {
   "helmet": { "shell": "P", "finish": "gloss", "mask": "G", "stripe": { "colors": ["S"], "w": 0.03 }, "decal": "badge" },
   "home": { "jersey": "P", "collar": "S", "sleeve": { "colors": ["S", "W", "S"], "w": 0.011, "g": 0.004, "at": 0.165 }, "undersleeve": "K",
             "pants": "S", "pantStripe": { "colors": ["K", "W", "K"], "w": 0.011, "g": 0.0 }, "belt": "K", "socks": "P", "sockBands": { "colors": ["S", "S"], "w": 0.014, "g": 0.012, "at": 0.4 },
             "cleats": "K", "gloves": "K", "number": { "fill": "S", "outline": "W" } },
   "away": { "jersey": "W", "collar": "K", "sleeve": { "colors": ["K", "S", "K"], "w": 0.011, "g": 0.004, "at": 0.165 }, "undersleeve": "K",
             "pants": "S", "pantStripe": { "colors": ["K", "W", "K"], "w": 0.011, "g": 0.0 }, "belt": "K", "socks": "P", "sockBands": { "colors": ["S", "S"], "w": 0.014, "g": 0.012, "at": 0.4 },
             "cleats": "K", "gloves": "K", "number": { "fill": "K", "outline": "S" } }
  },
  "lakeside": {
   "helmet": { "shell": "P", "finish": "gloss", "mask": "S", "stripe": { "colors": ["S", "W", "S"], "w": 0.01, "g": 0.0 }, "decal": "badge" },
   "home": { "jersey": "P", "collar": "S", "sleeve": { "colors": ["W", "S", "W"], "w": 0.012, "g": 0.0, "at": 0.16 }, "undersleeve": "W",
             "pants": "S", "pantStripe": { "colors": ["P", "W", "P"], "w": 0.009, "g": 0.0 }, "belt": "P", "socks": "P", "sockBands": { "colors": ["W", "S", "W"], "w": 0.01, "g": 0.0, "at": 0.4 },
             "cleats": "W", "gloves": "W", "number": { "fill": "W", "outline": "S" } },
   "away": { "jersey": "W", "collar": "P", "sleeve": { "colors": ["P", "S", "P"], "w": 0.012, "g": 0.0, "at": 0.16 }, "undersleeve": "P",
             "pants": "S", "pantStripe": { "colors": ["P", "W", "P"], "w": 0.009, "g": 0.0 }, "belt": "P", "socks": "P", "sockBands": { "colors": ["W", "S", "W"], "w": 0.01, "g": 0.0, "at": 0.4 },
             "cleats": "W", "gloves": "P", "number": { "fill": "P", "outline": "S" } }
  },
  "lake-hamilton": {
   "helmet": { "shell": "S", "finish": "metal", "mask": "P", "stripe": { "colors": ["P", "P"], "w": 0.012, "g": 0.008 }, "decal": "badge" },
   "home": { "jersey": "P", "collar": "S", "sleeve": { "colors": ["S"], "w": 0.03, "g": 0.0, "at": 0.16 }, "undersleeve": "P",
             "pants": "W", "pantStripe": { "colors": ["S", "P", "S"], "w": 0.009, "g": 0.0 }, "belt": "P", "socks": "P", "sockBands": { "colors": ["S"], "w": 0.024, "g": 0.0, "at": 0.41 },
             "cleats": "K", "gloves": "P", "number": { "fill": "S", "outline": "W" } },
   "away": { "jersey": "W", "collar": "P", "sleeve": { "colors": ["P"], "w": 0.03, "g": 0.0, "at": 0.16 }, "undersleeve": "P",
             "pants": "S", "pantStripe": { "colors": ["P", "W", "P"], "w": 0.009, "g": 0.0 }, "belt": "P", "socks": "P", "sockBands": { "colors": ["S"], "w": 0.024, "g": 0.0, "at": 0.41 },
             "cleats": "K", "gloves": "P", "number": { "fill": "P", "outline": "S" } }
  },
  "fountain-lake": {
   "helmet": { "shell": "P", "finish": "matte", "mask": "W", "stripe": { "colors": ["W", "A", "W"], "w": 0.008, "g": 0.0 }, "decal": "badge" },
   "home": { "jersey": "P", "collar": "W", "sleeve": { "colors": ["W", "W"], "w": 0.01, "g": 0.008, "at": 0.165 }, "undersleeve": "W",
             "pants": "W", "pantStripe": { "colors": ["P"], "w": 0.026, "g": 0.0 }, "belt": "P", "socks": "P", "sockBands": { "colors": ["W", "W", "W"], "w": 0.008, "g": 0.008, "at": 0.4 },
             "cleats": "W", "gloves": "W", "number": { "fill": "W", "outline": "A" } },
   "away": { "jersey": "W", "collar": "P", "sleeve": { "colors": ["P", "P"], "w": 0.01, "g": 0.008, "at": 0.165 }, "undersleeve": "P",
             "pants": "P", "pantStripe": { "colors": ["W"], "w": 0.026, "g": 0.0 }, "belt": "W", "socks": "W", "sockBands": { "colors": ["P", "P", "P"], "w": 0.008, "g": 0.008, "at": 0.4 },
             "cleats": "W", "gloves": "P", "number": { "fill": "P", "outline": "A" } }
  },
  "cutter-morning-star": {
   "helmet": { "shell": "S", "finish": "metal", "mask": "P", "stripe": { "colors": ["P", "A", "P"], "w": 0.008, "g": 0.0 }, "decal": "badge" },
   "home": { "jersey": "P", "collar": "S", "sleeve": { "colors": ["S", "A", "S"], "w": 0.008, "g": 0.0, "at": 0.17 }, "undersleeve": "P",
             "pants": "S", "pantStripe": { "colors": ["P", "A", "P"], "w": 0.008, "g": 0.0 }, "belt": "P", "socks": "P", "sockBands": { "colors": ["S", "S"], "w": 0.012, "g": 0.01, "at": 0.4 },
             "cleats": "K", "gloves": "P", "number": { "fill": "S", "outline": "P", "outline2": "A" } },
   "away": { "jersey": "W", "collar": "P", "sleeve": { "colors": ["P", "A", "P"], "w": 0.008, "g": 0.0, "at": 0.17 }, "undersleeve": "P",
             "pants": "S", "pantStripe": { "colors": ["P", "A", "P"], "w": 0.008, "g": 0.0 }, "belt": "P", "socks": "P", "sockBands": { "colors": ["S", "S"], "w": 0.012, "g": 0.01, "at": 0.4 },
             "cleats": "K", "gloves": "P", "number": { "fill": "P", "outline": "S" } }
  },
  "jessieville": {
   "helmet": { "shell": "P", "finish": "gloss", "mask": "S", "stripe": null, "decal": "badge" },
   "home": { "jersey": "P", "collar": "S", "sleeve": { "colors": ["S", "S"], "w": 0.014, "g": 0.008, "at": 0.16 }, "undersleeve": "S",
             "pants": "S", "pantStripe": { "colors": ["P", "P"], "w": 0.01, "g": 0.006 }, "belt": "P", "socks": "P", "sockBands": { "colors": ["S"], "w": 0.02, "g": 0.0, "at": 0.42 },
             "cleats": "K", "gloves": "S", "number": { "fill": "S", "outline": "W" } },
   "away": { "jersey": "W", "collar": "P", "sleeve": { "colors": ["P", "P"], "w": 0.014, "g": 0.008, "at": 0.16 }, "undersleeve": "P",
             "pants": "S", "pantStripe": { "colors": ["P", "P"], "w": 0.01, "g": 0.006 }, "belt": "P", "socks": "P", "sockBands": { "colors": ["S"], "w": 0.02, "g": 0.0, "at": 0.42 },
             "cleats": "K", "gloves": "P", "number": { "fill": "P", "outline": "S" } }
  },
  "mountain-pine": {
   "helmet": { "shell": "P", "finish": "gloss", "mask": "K", "stripe": { "colors": ["K", "W", "K"], "w": 0.009, "g": 0.0 }, "decal": "badge" },
   "home": { "jersey": "P", "collar": "K", "sleeve": { "colors": ["K", "W", "K"], "w": 0.01, "g": 0.0, "at": 0.165 }, "undersleeve": "K",
             "pants": "W", "pantStripe": { "colors": ["P", "K", "P"], "w": 0.009, "g": 0.0 }, "belt": "K", "socks": "P", "sockBands": { "colors": ["K", "W", "K"], "w": 0.01, "g": 0.0, "at": 0.4 },
             "cleats": "K", "gloves": "K", "number": { "fill": "W", "outline": "K" } },
   "away": { "jersey": "W", "collar": "P", "sleeve": { "colors": ["P", "K", "P"], "w": 0.01, "g": 0.0, "at": 0.165 }, "undersleeve": "K",
             "pants": "K", "pantStripe": { "colors": ["P"], "w": 0.02, "g": 0.0 }, "belt": "K", "socks": "P", "sockBands": { "colors": ["K", "W", "K"], "w": 0.01, "g": 0.0, "at": 0.4 },
             "cleats": "K", "gloves": "K", "number": { "fill": "P", "outline": "K" } }
  },
  "quartz-hollow": {
   "helmet": { "shell": "P", "finish": "matte", "mask": "S", "stripe": { "colors": ["S"], "w": 0.012, "g": 0.0, "flank": 0.05 }, "decal": "badge" },
   "home": { "jersey": "P", "collar": "S", "sleeve": { "colors": ["S"], "w": 0.022, "g": 0.0, "at": 0.165 }, "undersleeve": "K",
             "pants": "A", "pantStripe": { "colors": ["P", "S"], "w": 0.011, "g": 0.0 }, "belt": "P", "socks": "P", "sockBands": { "colors": ["S", "S"], "w": 0.01, "g": 0.014, "at": 0.4 },
             "cleats": "K", "gloves": "K", "number": { "fill": "S", "outline": "W" } },
   "away": { "jersey": "W", "collar": "S", "sleeve": { "colors": ["P", "S"], "w": 0.012, "g": 0.0, "at": 0.165 }, "undersleeve": "P",
             "pants": "P", "pantStripe": { "colors": ["S"], "w": 0.018, "g": 0.0 }, "belt": "K", "socks": "P", "sockBands": { "colors": ["S", "S"], "w": 0.01, "g": 0.014, "at": 0.4 },
             "cleats": "K", "gloves": "P", "number": { "fill": "P", "outline": "S" } }
  },
  "tufa-ridge": {
   "helmet": { "shell": "S", "finish": "gloss", "mask": "P", "stripe": { "colors": ["A", "P", "A"], "w": 0.008, "g": 0.002 }, "decal": "badge" },
   "home": { "jersey": "P", "collar": "S", "sleeve": { "colors": ["S", "A", "S"], "w": 0.01, "g": 0.0, "at": 0.165 }, "undersleeve": "S",
             "pants": "S", "pantStripe": { "colors": ["P", "A", "P"], "w": 0.008, "g": 0.0 }, "belt": "P", "socks": "P", "sockBands": { "colors": ["S", "A"], "w": 0.012, "g": 0.0, "at": 0.4 },
             "cleats": "W", "gloves": "S", "number": { "fill": "S", "outline": "D", "outline2": "A" } },
   "away": { "jersey": "W", "collar": "P", "sleeve": { "colors": ["P", "A", "P"], "w": 0.01, "g": 0.0, "at": 0.165 }, "undersleeve": "P",
             "pants": "P", "pantStripe": { "colors": ["S", "A", "S"], "w": 0.008, "g": 0.0 }, "belt": "S", "socks": "P", "sockBands": { "colors": ["S", "A"], "w": 0.012, "g": 0.0, "at": 0.4 },
             "cleats": "W", "gloves": "P", "number": { "fill": "P", "outline": "A" } }
  },
  "cinnabar-flats": {
   "helmet": { "shell": "S", "finish": "gloss", "mask": "P", "stripe": { "colors": ["P", "W", "P"], "w": 0.01, "g": 0.0 }, "decal": "badge" },
   "home": { "jersey": "P", "collar": "S", "sleeve": { "colors": ["S", "W"], "w": 0.012, "g": 0.0, "at": 0.165 }, "undersleeve": "S",
             "pants": "S", "pantStripe": { "colors": ["P", "W", "P"], "w": 0.008, "g": 0.0 }, "belt": "S", "socks": "P", "sockBands": { "colors": ["S", "W", "S"], "w": 0.009, "g": 0.0, "at": 0.4 },
             "cleats": "K", "gloves": "S", "number": { "fill": "S", "outline": "W" } },
   "away": { "jersey": "W", "collar": "P", "sleeve": { "colors": ["P", "S"], "w": 0.012, "g": 0.0, "at": 0.165 }, "undersleeve": "S",
             "pants": "S", "pantStripe": { "colors": ["P", "W", "P"], "w": 0.008, "g": 0.0 }, "belt": "S", "socks": "S", "sockBands": { "colors": ["P", "W", "P"], "w": 0.009, "g": 0.0, "at": 0.4 },
             "cleats": "K", "gloves": "S", "number": { "fill": "P", "outline": "S" } }
  }
 }
};
