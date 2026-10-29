// Stadium layouts for the 3D view. research/stadiums.md has the sources.
// Only Wolf Stadium and Joe C. Reese Stadium are *named* in the game as real venues (venueConfirmed in schools.json),
// and only their sourced details are drawn: turf, a track, the home/visitor stand ratio, Wolf Arena behind the
// east end (Wolf Stadium), the big open concrete grandstand and the woods (Hot Springs). Light poles, scoreboard
// spots and stand sizes are not sourced; they use generic choices. Every other school gets a generic home field,
// using only the surface where research found it (never named as real). The Cup final is a generic neutral site.
// Stands: rows, length along the sideline (yd), front gap from the sideline (yd), z0 center.
const towers = (xs, zs) => xs.flatMap((x) => zs.map((z) => [x, z]));
const base = { surface: 'turf', track: false, trackColor: '#7A3A2C', goalposts: 'h', homeSide: -1, fill: 0.8, visFill: 0.8, concrete: false,
  trees: [], arena: null, scoreboardEnd: -1, scoreboardBack: 14 };

export const VENUES = {
  small: { ...base, key: 'small', surface: 'grass', fill: 0.55, visFill: 0.7,
    homeStands: [{ rows: 10, len: 46, front: 8, pressBox: 14 }], visStands: [{ rows: 7, len: 30, front: 8 }],
    towers: towers([-40, 40], [-38, 0, 38]), trees: ['vis', 'far'] },
  medium: { ...base, key: 'medium',
    homeStands: [{ rows: 14, len: 64, front: 8, pressBox: 20 }], visStands: [{ rows: 9, len: 44, front: 8 }],
    towers: towers([-44, 44], [-40, 0, 40]), trees: ['far'] },
  neutral: { ...base, key: 'neutral', goalposts: 'slingshot', fill: 0.72, visFill: 0.95,
    homeStands: [{ rows: 22, len: 96, front: 9, pressBox: 34 }], visStands: [{ rows: 22, len: 96, front: 9 }],
    towers: towers([-56, 56], [-46, 0, 46]), scoreboardBack: 16 },
};

// Wolf Stadium (Lake Hamilton, Pearcy): synthetic turf, a running track, a large home grandstand facing a
// visitor stand about a third its size, and Wolf Arena right behind the east end zone (drawn at the far end).
// Imagery (research/stadiums.md, "likely"): light-grey track lanes, maroon end zones with white lettering.
VENUES['lake-hamilton'] = { ...base, key: 'wolf', track: true, trackColor: '#666B72', endzoneText: '#FFFFFF', fill: 0.85, visFill: 0.85,
  homeStands: [{ rows: 15, len: 72, front: 26, pressBox: 22 }], visStands: [{ rows: 8, len: 40, front: 26 }],
  towers: towers([-47, 47], [-42, 0, 42]), arena: { end: -1 }, scoreboardEnd: 1, scoreboardBack: 34, trees: ['vis'] };

// Tommy J. Holt Memorial Field at Joe C. Reese Stadium (Hot Springs): synthetic turf, a track, a press box,
// a big open concrete main grandstand on one sideline, woods wrapping the opposite side and the west end.
// Imagery ("likely"): a tan track.
VENUES['hot-springs'] = { ...base, key: 'reese', track: true, trackColor: '#A8916F', concrete: true, fill: 0.85, visFill: 0.8,
  homeStands: [{ rows: 22, len: 92, front: 25, pressBox: 30 }], visStands: [{ rows: 7, len: 36, front: 26 }],
  towers: towers([-47, 47], [-44, 0, 44]), scoreboardBack: 34, trees: ['vis', 'near'] };

// Generic home fields that use only the surface (and track) the research found; not presented as real venues.
VENUES.lakeside = { ...VENUES.medium, key: 'medium-track', track: true, trackColor: '#2C2A2E',
  homeStands: [{ rows: 13, len: 64, front: 26, pressBox: 20 }], visStands: [{ rows: 8, len: 40, front: 26 }], towers: towers([-47, 47], [-42, 0, 42]), scoreboardBack: 34 };
VENUES.jessieville = { ...VENUES.small };
VENUES['mountain-pine'] = { ...VENUES.small };
VENUES['fountain-lake'] = { ...VENUES.small, surface: 'turf' };
VENUES['cutter-morning-star'] = { ...VENUES.small, surface: 'turf' };
