// School data. SCHOOLS is the inlined copy of shared/data/schools.json (data/schools.json), FACTS the
// halftime facts (data/facts.json). Node tools set globalThis.SCHOOLS / FACTS before importing.

/* global SCHOOLS, FACTS */
const SRC = typeof SCHOOLS !== 'undefined' ? SCHOOLS : null;
const FACT_SRC = typeof FACTS !== 'undefined' ? FACTS : null;

// Team strength is a game invention seeded from classification and tier, not a ranking of real programs.
const CLASS_BASE = { '6A': 72, '5A': 70, '4A': 65, '3A': 61, '2A': 57 };
const MASCOT_KIND = {
  'hot-springs': 'helmet', lakeside: 'ram', 'lake-hamilton': 'wolf', 'fountain-lake': 'cobra',
  'cutter-morning-star': 'eagle', jessieville: 'lion', 'mountain-pine': 'imp',
};
const BACKDROP = { 'hot-springs': 'skyline', lakeside: 'skyline', 'lake-hamilton': 'lake' };

// Fictional out-of-county opponents (schools.json opponentsNote): invented towns.
const FICTIONAL = [
  { id: 'quartz-hollow', name: 'Quartz Hollow High School', short: 'Quartz Hollow', abbr: 'QH', city: 'Quartz Hollow (fictional town)',
    mascot: 'Miners', mascotKind: 'miner', colorNames: ['slate', 'orange'], colors: { primary: '#454B55', secondary: '#E07B2A', accent: '#F4EFE6' }, base: 64 },
  { id: 'tufa-ridge', name: 'Tufa Ridge High School', short: 'Tufa Ridge', abbr: 'TR', city: 'Tufa Ridge (fictional town)',
    mascot: 'Herons', mascotKind: 'heron', colorNames: ['teal', 'cream'], colors: { primary: '#0F6E6E', secondary: '#E9E2CF', accent: '#E6B422' }, base: 60 },
  { id: 'cinnabar-flats', name: 'Cinnabar Flats High School', short: 'Cinnabar Flats', abbr: 'CF', city: 'Cinnabar Flats (fictional town)',
    mascot: 'Comets', mascotKind: 'comet', colorNames: ['burnt orange', 'navy'], colors: { primary: '#B4531A', secondary: '#1B2440', accent: '#F4EFE6' }, base: 67 },
];

function fromSchool(s) {
  const v = s.venues && s.venues.football;
  const cls = s.classification.football;
  return {
    id: s.id, name: s.name, short: s.short, abbr: s.abbr, city: s.city, mascot: s.mascot,
    mascotKind: MASCOT_KIND[s.id], mascotConcept: s.mascotConcept,
    colorNames: s.colorNames, colors: { ...s.colors }, colorsConfirmed: !!s.colorsConfirmed,
    cls, tier: s.tier, base: CLASS_BASE[cls] ?? 60, fictional: false,
    titles: (s.titles && s.titles.football) || [],
    titleNote: s.id === 'hot-springs' ? { 1934: 'shared' } : {},
    venue: v && v.venueConfirmed ? v.name : `${s.short} home field`,
    venueConfirmed: !!(v && v.venueConfirmed),
    backdrop: BACKDROP[s.id] || 'pines',
    conference: s.conference && s.conference.football,
  };
}

export const REAL = SRC ? SRC.schools.map(fromSchool) : [];
export const FAKE = FICTIONAL.map((f) => ({
  ...f, cls: null, tier: 'mid', fictional: true, colorsConfirmed: false, titles: [], titleNote: {},
  venue: `${f.short} home field`, venueConfirmed: false, backdrop: 'pines',
}));
export const ALL = [...REAL, ...FAKE];
export const teamDef = (id) => ALL.find((t) => t.id === id);

export const RIVALRIES = SRC ? SRC.rivalries : [];
export function rivalryOf(a, b) {
  return RIVALRIES.find((r) => r.teams.includes(a) && r.teams.includes(b)) || null;
}
// Rivalry-week fact lines (see research/town-content.md §2; the renewal year is deliberately not stated).
export const RIVALRY_TEXT = {
  'lakeside|lake-hamilton': 'About 15 miles apart. The series was paused after the 1999 season; Lakeside won the Aug. 25, 2023 meeting 49–42 at Wolf Stadium in Pearcy.',
  'hot-springs|lakeside': 'Both in 5A South for 2024–26; Lakeside lists the Trojans as a rival.',
  'cutter-morning-star|jessieville': '3A-4 football league mates.',
};
export function rivalryText(a, b) {
  return RIVALRY_TEXT[`${a}|${b}`] || RIVALRY_TEXT[`${b}|${a}`] || null;
}

export const FACT_LIST = FACT_SRC ? FACT_SRC.facts : [];

// Text color (#111 or #fff) with the better contrast on a hex background.
export function lum(hex) {
  const n = parseInt(hex.slice(1), 16);
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
export const contrast = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
export const onColor = (hex) => (contrast(hex, '#111111') >= contrast(hex, '#FFFFFF') ? '#111111' : '#FFFFFF');
