# Garland County stadium research (Friday Night Spa City)

Researched 2026-10-28. This file covers the real high-school football venues in Garland County, Arkansas, and the NFHS field rules the 3D stadium needs. Every row cites a source. Fictional players only, and no logos or wordmarks.

**Confidence labels**
- **confirmed**: two or more independent sources, or one authoritative source (school district, AAA, NPS, USGS, NOAA, NFHS, the Hot Springs *Sentinel-Record*).
- **likely**: one decent source, such as a stadium database, a single news story, OpenStreetMap, or our own reading of satellite imagery.
- **unconfirmed**: a guess or inference with no direct source.

**Imagery note.** Several rows say "imagery". These come from our own visual reading of Esri World Imagery tiles, viewed in a browser through the ArcGIS REST `export` endpoint. The capture dates are unknown:
- The Lake Hamilton tile was taken in leaf-off season.
- The Hot Springs and Lakeside tiles were taken in leaf-on season.

Imagery can be several years old, so newer renovations may not appear.

**Orientation note.** Field bearings come from principal-axis fits of OpenStreetMap polygons, queried through the Overpass API on 2026-10-29 (UTC). "Long axis about 96°/276°" means the field runs roughly west to east, about 6° off true east-west.

---

## 1. Wolf Stadium, Lake Hamilton High School (Pearcy)

| Fact | Value | Confidence | Source |
|---|---|---|---|
| Name in common use | "Wolf Stadium" or "LH Wolf Stadium" (district); "Summit Bank Field at Wolf Stadium" (database, which suggests a field-sponsorship name) | Wolf Stadium: **confirmed**. Summit Bank Field: **likely** | [LHSD 2020][lh2020], [LHSD 2023][lh2023], [Sentinel-Record 2026][hsr-lh-oct26], [StadiumConnection][sc-lh] |
| Address | Wolf St., Pearcy, AR 71964. The high school is at 280 Wolf St.; the arena is at 250 Wolf St. | **confirmed** | [Wikipedia LHHS][wiki-lhhs], [StadiumConnection][sc-lh], OSM ways 1284112163 and 1269035583 |
| Field centre coordinates | about **34.4421 N, -93.2143 W**. OSM polygon 461379541, tagged "Lake Hamilton School Wolf Stadium", measures about 117 m × 57 m | **likely** | [OSM way 461379541][osm-lh] |
| Field orientation | Long axis runs **roughly west–east** (OSM bearing about 96°/276°). The sidelines face north and south. | **confirmed** (OSM + imagery agree) | [OSM way 461379541][osm-lh], [Esri imagery][img-lh] |
| Playing surface | **Artificial turf** with dark maroon end zones carrying white "WOLVES" lettering and a mid-field logo. The field is uniformly green in a leaf-off image while surrounding lawns are brown. | **confirmed** (database + imagery). Install year is **unconfirmed**; no source found. | [StadiumConnection][sc-lh], [Esri imagery][img-lh] |
| Running track | **Yes.** The district tells fans not to "stand, climb, or play on the track or retaining walls". In imagery the lanes look light grey, with reddish-rust field-event areas inside the curves. | Track: **confirmed**. Colours: **likely** (imagery) | [LHSD 2023][lh2023], [StadiumConnection][sc-lh], [Esri imagery][img-lh] |
| Seating capacity (total) | **2,926** | **likely** (database only, updated 10/24/2024) | [StadiumConnection][sc-lh] |
| Home vs visitor stands | Separate home and visitor sides. During the 2020 COVID reduction, the district capped them at **831 home and 300 visitor**, so the home side is much larger. | **confirmed** (district) | [LHSD 2020][lh2020] |
| Which sideline is home / press box | **South sideline.** Imagery shows the larger stands on the south, with a central press-box structure and ramps down to a plaza and parking. The north side has a smaller stand with a building behind it. | **likely** (imagery inference only) | [Esri imagery][img-lh] |
| Other stadium features | Ramps, walkways and retaining walls; a student section; concessions and restrooms | **confirmed** (district) | [LHSD 2023][lh2023] |
| Neighbours | Wolf Arena, a large red-roofed gym, sits right against the **east** end of the stadium. Baseball and softball fields are north, past a parking lot. The high-school buildings are south and southeast. | **likely** (imagery + OSM) | [Esri imagery][img-lh], OSM way 1269035583 |
| Light poles | Tall light poles are visible from their shadows along both sidelines, at least 2 per side. The exact count is not determinable. | **unconfirmed** | [Esri imagery][img-lh] |
| Scoreboard | A dark rectangular object sits just outside the track at the **west / north-west** end and may be the scoreboard. The database says it is not a video board. | Location: **unconfirmed**. "Not video": **likely** | [Esri imagery][img-lh], [StadiumConnection][sc-lh] |
| Elevation | about **552 ft** (168 m) at the field centre | **confirmed** (USGS) | [USGS EPQS][usgs-lh] |
| Surroundings | Rural Pearcy/Royal area west of Hot Springs, with pine-hardwood forest and small farms. Lake Hamilton's nearest water is several km to the **north-east**, so the lake is not beside the stadium and probably not visible from the stands. The Ouachita ridges to the south run east–west. | Lake distance: **likely** (imagery). Ridge orientation: **confirmed** | [Esri wide imagery][img-region], [Encyclopedia of Arkansas][eoa-ouachita] |
| Recent game-night info | Aug 25, 2023: gates opened 6:45 p.m. and kickoff was **8:00 p.m.** "due to the projected heat". Tickets were $5. | **confirmed** (district) | [LHSD 2023][lh2023] |
| Renovations / expansions | No source found that names a turf, press-box, or seating project or its year. | **unconfirmed** | none |

## 2. Tommy J. Holt Memorial Field at Joe Reese Stadium, Hot Springs High School

| Fact | Value | Confidence | Source |
|---|---|---|---|
| Naming | The **field** is *Tommy J. Holt Memorial Field*, named for the late Tommy J. Holt, a longtime principal. The **stadium** is *Joe (C.) Reese Stadium*, named for Joe C. Reese, the Trojans coach from 1970 to 1998 and a school-board member from 2007 to 2013. The standard form is **"Tommy J. Holt Memorial Field at Joe Reese Stadium"**. The school site just says "Trojan Football Stadium". | **confirmed** | [SI/SBLive 2025][si-holt], [Sentinel-Record 2022 column][hsr-names], [Sentinel-Record 2018 (plaque)][pr-plaque], [NWA 2026][nwa-holt], [HS Trojans facilities][hst-fac] |
| Our data | `schools.json` has "Joe C. Reese Stadium (Tommy J. Holt Memorial Field)". The order is fine, but sources write it as "Tommy J. Holt Memorial Field at Joe Reese Stadium". | — | — |
| Address | 701 Emory St., Hot Springs, AR 71913, on the high-school campus | **confirmed** | [HS Trojans facilities][hst-fac], [StadiumConnection][sc-hs] |
| Field centre coordinates | about **34.4744 N, -93.0712 W** (OSM pitch 134051155 inside track relation 3804043) | **likely** | [OSM way 134051155][osm-hs] |
| Field orientation | Long axis runs **roughly west–east** (OSM about 97°/277°) | **confirmed** (OSM + imagery) | [OSM][osm-hs], [Esri imagery][img-hs] |
| Playing surface | **Artificial turf.** In 2010 the coach said "we're getting new field turf, new scoreboard". A May 2018 Sporturf case study says the district replaced a football field that "was seven years old" with PowerHouse 46 oz turf, about 81,000 sq ft. Imagery shows black end zones lettered "TROJANS" and "HOT SPRINGS" along the sidelines. | Artificial: **confirmed**. About 2010 first turf and about 2018 replacement: **likely** | [StadiumConnection][sc-hs], [501 Life 2010][501], [Sporturf 2018][sporturf], [Esri imagery][img-hs] |
| Running track | **Yes.** In imagery the track looks tan/beige, which may be weathering. | Track: **confirmed**. Colour: **likely** | [StadiumConnection][sc-hs], [OSM relation 3804043][osm-hs], [Esri imagery][img-hs] |
| Seating capacity | **6,588** | **likely** (database only, updated 3/26/2022) | [StadiumConnection][sc-hs] |
| Home stands / press box | A plaque honouring Reese is "beside the stadium press box". Imagery shows one large open concrete grandstand on the **north** sideline with small structures along its top rail, probably the press box. The south sideline shows only a thin strip with light-pole shadows and is backed by woods. | Press box exists: **confirmed**. North = home/main stand: **likely** (imagery) | [Sentinel-Record 2018 (plaque)][pr-plaque], [Esri imagery][img-hs] |
| Visitor stands | Not identifiable in imagery. They may be small bleachers on the south side hidden by trees, or on the north. | **unconfirmed** | — |
| Light poles | Pole shadows are visible along the south sideline. The count is not determinable. | **unconfirmed** | [Esri imagery][img-hs] |
| Scoreboard | A new scoreboard was mentioned in 2010; its location is unknown. The database says it is not a video board. | **unconfirmed** / **likely** | [501 Life 2010][501], [StadiumConnection][sc-hs] |
| Elevation | about **476 ft** (145 m) | **confirmed** (USGS) | [USGS EPQS][usgs-hs] |
| Surroundings | Dense woods (pine and hardwood) on the **west and south**. The school buildings and parking are north. A baseball/softball complex is south-east. Emory and Panama streets are nearby. | **likely** (imagery + OSM) | [Esri imagery][img-hs] |
| Hot Springs Mountain Tower | The tower is **5.3 km (3.3 mi) NNE** of the field (bearing about 26°), stands 216 ft tall, and has its deck at 1,256 ft. It would sit about 2–3° above the horizon, so it is geometrically plausible from the stands. Trees and buildings may block it. | Geometry: **confirmed**. Actually visible: **unconfirmed** | [NPS][nps-tower], [Wikipedia coords][wiki-tower] |
| Other uses | Also used for soccer, the Joe Reese Memorial Relays (a AAA-certified state-qualifying track meet), and a family movie night | **confirmed** | [Sentinel-Record soccer 2026][hsr-soccer], [MileSplit][milesplit], [HSSD][hssd-movie] |

## 3. Lakeside High School (Hot Springs) football field

| Fact | Value | Confidence | Source |
|---|---|---|---|
| Namesake | **J. W. "Chick" Austin**, Lakeside head football coach for 19 years. The Hendrix College Hall of Honor says "The Lakeside stadium is named in his honor." | **confirmed** | [Hendrix Hall of Honor][hendrix], [StadiumConnection][sc-lk], [Sentinel-Record 2022 column][hsr-names] |
| Name forms | "Chick Austin Stadium" (database), "Chick Austin Field" (Sentinel-Record junior-high coverage, 2021), and "Austin Field" (Sentinel-Record 2017 and 2022). A 2022 column says the district "now calls" it **"Lakeside Stadium"**. | Austin naming: **confirmed**. Current official name: **unconfirmed** (Lakeside Stadium vs Chick Austin Stadium/Field) | [StadiumConnection][sc-lk], [Sentinel-Record 2022][hsr-names], [Sentinel-Record 2017 via PressReader][pr-lk17] |
| Address / coordinates | 2871 Malvern Ave., Hot Springs, AR 71901. The field centre is about **34.4738 N, -92.9951 W** (OSM pitch "Lakeside Rams"). | Address: **confirmed**. Coordinates: **likely** | [Wikipedia][wiki-lk], [StadiumConnection][sc-lk], [OSM way 288068084][osm-lk] |
| Orientation | Long axis runs **roughly north–south** (OSM about 171°) | **confirmed** (OSM + imagery) | [OSM][osm-lk], [Esri imagery][img-lk] |
| Surface | **Artificial turf** with navy end zones lettered "LAKESIDE" (north) and "RAMS" (south) | **confirmed** (database + imagery) | [StadiumConnection][sc-lk], [Esri imagery][img-lk] |
| Track | **Yes**, dark-coloured | **confirmed** | [StadiumConnection][sc-lk], [Esri imagery][img-lk] |
| Capacity | **3,060.** The "16,000" figure in our notes is wrong. | **likely** (database only) | [StadiumConnection][sc-lk] |
| Stands | Larger stands on the **west** sideline and a smaller stand on the east | **likely** (imagery) | [Esri imagery][img-lk] |
| Elevation | about **366 ft** | **confirmed** (USGS) | [USGS EPQS][usgs-lk] |

## 4. Other Garland County fields (quick pass)

All figures except the namesakes come from one database, last updated 3/26/2022, so they are rated **likely**. The namesakes are also attested by the [Sentinel-Record 2022 column][hsr-names].

| School | Field name | Surface | Capacity | Track | Source |
|---|---|---|---|---|---|
| Jessieville Lions | **Don Phillips Field**, 7900 N Hwy 7 | Grass | 1,308 | Yes | [SC 4254][sc-jv] |
| Mountain Pine Red Devils | **Stanley May Field**, 726 Blakely Dam Rd | Grass | 794 | Yes | [SC 4256][sc-mp] |
| Fountain Lake Cobras | **Larry Beckham Memorial Field**, 4207 Park Ave (named for a former principal) | Artificial | 1,332 | Yes | [SC 4253][sc-fl] |
| Cutter-Morning Star Eagles | **Eagle Field**, 2801 Spring St | Artificial | 846 | No | [SC 4255][sc-cms] |

From OSM, the Mountain Pine field's long axis is at about 63° (ENE–WSW). The Fountain Lake "Cobras" pitch is at about 177° (N–S). Both are **likely**.

## 5. Setting and backdrop

| Fact | Value | Confidence | Source |
|---|---|---|---|
| Terrain | Ouachita Mountains. The ridges run **east–west**, which is unusual in North America. South-facing slopes carry **pine** forest or woodland; north-facing slopes carry **hardwoods**. The vegetation forms east–west bands. | **confirmed** | [Encyclopedia of Arkansas][eoa-ouachita] |
| Forest type | Mostly loblolly and **shortleaf pine** today, with commercial forestry | **likely** | [USGS ecoregion summary][usgs-eco] |
| Garland County relief | Steep ridges up to about 1,400 ft, in parallel or zig-zag patterns | **likely** | [Bird-list paper summary][biostor] |
| Hot Springs Mountain Tower | 216 ft tower with its deck at 1,256 ft. It overlooks about 140 sq mi, including part of the Ouachitas. From Pearcy it is 17.5 km ENE, too far to read as more than a speck. | **confirmed** | [NPS][nps-tower] |
| Lake Hamilton | An Ouachita River impoundment. Hot Springs lies north across the lake; Lake Hamilton CDP is on its south shore. Wolf Stadium is several km **south-west** of the nearest water. | **confirmed** (geography), **likely** (distance) | [Wikipedia: Lake Hamilton, AR][wiki-lhcdp], [Esri wide imagery][img-region] |
| Elevations | Wolf Stadium about 552 ft; Holt Field about 476 ft; Lakeside about 366 ft; Hot Springs Mtn Tower deck 1,256 ft | **confirmed** | USGS EPQS, NPS |
| Climate, Sept | Average high about 87 °F, low about 65 °F, precipitation about 4.0 in | **likely** | [Climate-Charts, Hot Springs ASOS (NOAA normals)][cc] |
| Climate, Oct | Average high about 75 °F, low about 52 °F, precipitation about 4.3 in | **likely** (two secondary sites agree) | [Climate-Charts][cc], [Current Results][cr-oct] |
| Climate, Nov | Average high about 63–64 °F, low about 42 °F, precipitation about 3.6 in | **likely** | [Climate-Charts][cc], [Current Results][cr-nov] |
| Kickoff temperature | Typical 7 p.m. kickoff: about 80 °F in early Sept, about 65 °F in mid-Oct, about 50 °F in mid-Nov. This is interpolated between the high and low. | **unconfirmed** (derived) | derived from the rows above |
| First fall frost | Median around early November (30% probability by Nov 6) | **likely** | [Almanac (1991–2020)][almanac] |
| Fog or haze on Lake Hamilton | No NWS or news source found | **unconfirmed** | — |

Note on the climate rows: Climate-Charts labels its table "NOAA Monthly Normals 2006-2020". For the official 1991–2020 normals for station USW00003962, check NOAA NCEI before quoting exact numbers.

## 6. NFHS / Arkansas field and equipment conventions

The Arkansas Activities Association plays under NFHS rules. No Arkansas-specific field-marking rule was found.

| Item | NFHS value | Confidence | Source |
|---|---|---|---|
| Field size | 360 ft × 160 ft (120 yd × 53⅓ yd), with 10-yd end zones | **confirmed** | NFHS Rule 1-2 ([2017 book][nfhs17], [2020 book][nfhs20]), [CoverSports][cover] |
| Hash marks | **53 ft 4 in from each sideline**, so the field is split into thirds and the hashes are 53'4" apart. Each hash is 24 in long and 4 in wide; each 5-yd line bisects a hash. College hashes are 60 ft from the sideline, so do not copy them. | **confirmed** | NFHS 1-2-3 ([2017][nfhs17], [2020][nfhs20]), [Hash mark (Wikipedia)][wiki-hash] |
| Sidelines and end lines | Continuous lines **at least 4 in wide**. Field lines are white. | **confirmed** | NFHS 1-2-3 ([2017][nfhs17]) |
| Yard lines | Every 5 yd, starting and ending **4 in inside** each sideline | **confirmed** | NFHS 1-2-3 ([2017][nfhs17]) |
| 9-yard marks | 12 in × 4 in marks every 10 yd, **9 yd from each sideline**. If yard numbers are painted, the **tops of the numbers** must be 9 yd from the sideline. | **confirmed** | NFHS 1-2-3 ([2017][nfhs17]), [StencilEase guide][stencil] |
| Yard numbers | Recommended maximum **6 ft tall × 4 ft wide**. The tops sit 27 ft (9 yd) from the sideline. | **likely** (secondary guides) | [CoverSports][cover], [StencilEase][stencil] |
| Restraining line / restricted area | A 4-in line **at least 2 yd outside** the sidelines and end lines. The restricted area is the 2-yd band inside it, sometimes marked with 12-in dashes at 24-in intervals. Up to 3 coaches may stand in it during dead balls, and nobody while the ball is live. | **confirmed** (NFHS POE + state guide) | [NFHS 2017 POE via NMAA][poe17], [NSAA notes][nsaa] |
| "6-foot limit line" | This is a **college/NFL** convention. NFHS uses the 2-yd restricted area, not a 6-ft line. | **confirmed** | as above |
| Team box | Behind the restricted area, **between the 25-yard lines** on each side | **confirmed** | [NFHS 2017 POE][poe17], [NSAA][nsaa] |
| Coaching box | NFHS has no separate coaching box. Coaches use the restricted area in front of the team box during dead balls. Some states vary this, e.g. Maryland's coaches' box at the 10. | **likely** | [MPSSAA clarification][mpssaa] |
| Goal posts | **23 ft 4 in** inside width (wider than college/NFL at 18 ft 6 in). Crossbar top **10 ft** high. Uprights extend at least 10 ft above the crossbar. Centred on the end line. | **likely** (secondary summaries of NFHS 1-2-4) | [CoverSports][cover], [Wikipedia: American football field][wiki-field] |
| Goal-post style | Many high-school fields use **H-style** posts (two supports under the crossbar). Slingshots are typical in the NFL and college. No Arkansas-specific rule was found. | **likely** | [Wikipedia: American football field][wiki-field] |
| Field crown | NFHS recommends about 1.2° of fall from centre to each sideline | **likely** | [Wikipedia: American football field][wiki-field] |
| Ball stripes | A **1-in white (or yellow) stripe** centred 3 to 3¼ in from each end on the two panels next to the laces. No logos on the stripe. The NFHS authenticating mark is required. Commercial ads are barred since 2017. | **likely** (older rulebook text plus WIAA and 2017 rule-change summaries) | [balls.com (NFHS 2007 text)][balls], [WIAA][wiaa], [NMAA 2017 changes][nfhs17chg] |

---

## Use in the game

### Can be depicted as real

**Wolf Stadium (Pearcy)**
- The name "Wolf Stadium". Do not use the sponsor name "Summit Bank Field".
- Synthetic turf.
- A field running roughly west–east.
- A running track around the field.
- A large home grandstand facing a much smaller visitor stand, roughly a 3:1 ratio.
- Ramps and retaining walls.
- A big gym (Wolf Arena) right behind the east end zone.
- Pine and hardwood rural surroundings with east–west ridgelines.
- Ground elevation of about 550 ft.
- Optional: an 8:00 p.m. hot-August kickoff.

**Hot Springs**
- The full name "Tommy J. Holt Memorial Field at Joe Reese Stadium".
- Synthetic turf.
- A field running roughly west–east.
- A track.
- A press box.
- A big open concrete main grandstand on one sideline.
- Woods wrapping the opposite side and the west end.

**Lakeside**
- Honour of Chick Austin, as "Chick Austin Stadium/Field".
- Synthetic turf.
- A field running roughly north–south.
- A dark track.
- Larger stands on the west side.
- Capacity of about 3,000.

**Region**
- East–west Ouachita ridges.
- Pine forest on south-facing slopes and hardwoods on north-facing slopes.
- A cooling Sept→Nov progression: Sept nights about 70s °F, Oct about 60s, Nov about 40s–50s.
- Roughly 4 in of rain a month, so occasional wet games.

**Rules**
- NFHS markings:
  - 53'4" hashes.
  - 4-in lines.
  - 9-yd marks or number tops at 9 yd.
  - A 2-yd restricted area with a restraining line.
  - Team boxes between the 25s.
  - Goal posts 23'4" wide with a 10-ft crossbar, H-style.
- Footballs with white stripes.

### Must stay generic or unconfirmed
- **Which compass side is home** at each stadium. Imagery suggests south at Wolf Stadium and north at Holt Field. Present it as "home side" with no real-world claim.
- **Light-pole count and placement, scoreboard position and type, press-box shape, and visitor-stand size at Hot Springs.**
- **Capacities.** These come from a single database (2,926, 6,588, 3,060). Do not print them in-game as facts, or label them "about".
- **Turf install years** at Lake Hamilton (none found). The Hot Springs dates (about 2010 / 2018) are only "likely".
- **End-zone wordmarks, mid-field logos, school colours painted on the turf, and sponsor names.** These are school branding. The no-logos rule applies, so use plain end zones or generic colour.
- **A lake view from Wolf Stadium.** The lake is km away and the stadium sits among trees and buildings. The PRD's "lake band for Lake Hamilton" should be a distant hint at most, not a lakeside setting.
- **Hot Springs Mountain Tower on the Holt Field skyline.** It is geometrically plausible (5.3 km NNE, about 2–3° up) but not verified. Treat it as a stylised hint if used.
- **Fog or haze on Lake Hamilton.** No source; it is fine as generic autumn atmosphere.
- **Lakeside's current official stadium name** ("Lakeside Stadium" vs "Chick Austin Stadium/Field"). Keep `venueConfirmed: false`, or show "Chick Austin Stadium" only with a "named for coach J. W. 'Chick' Austin" note.

### Suggested data updates (not applied)
These are for the owner to decide; no other files were edited.
- `schools.json` for Hot Springs: rename the venue to "Tommy J. Holt Memorial Field at Joe Reese Stadium".
- `schools.json` for Lakeside: the venue is honoured as Chick Austin, per the Hendrix College and Sentinel-Record sources. The capacity is about 3,060, not 16,000.

---

## Sources

[lh2020]: https://lhwolves.net/article/289600 "LHSD, 7-12th Grade Athletic Event Information (Aug 18 2020)"
[lh2023]: https://lhwolves.net/article/1207626 "LHSD, Wolves host Rams | Football 2023 (Aug 18 2023)"
[hsr-lh-oct26]: https://www.hotsr.com/news/2026/oct/17/watch-leaders-of-the-pack-wolves-hunt-down/
[sc-lh]: https://stadiumconnection.com/ar/stadium.php?id=4251
[wiki-lhhs]: https://en.wikipedia.org/wiki/Lake_Hamilton_High_School
[osm-lh]: https://www.openstreetmap.org/way/461379541
[img-lh]: https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/export?bbox=-93.2158,34.4413,-93.2128,34.4430&bboxSR=4326&imageSR=3857&size=1000,700&format=jpg&f=image
[img-region]: https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/export?bbox=-93.30,34.38,-93.04,34.52&bboxSR=4326&imageSR=3857&size=1000,700&format=jpg&f=image
[usgs-lh]: https://epqs.nationalmap.gov/v1/json?x=-93.21434&y=34.44211&units=Feet&wkid=4326
[si-holt]: https://www.si.com/high-school/stats/arkansas/football/games/5405903-lakeside-vs-hot-springs/preview
[hsr-names]: https://www.hotsr.com/news/2022/aug/19/all-in-a-name-check-local-playing-fields/
[pr-plaque]: https://www.pressreader.com/usa/the-sentinel-record/20180919/281479277326239
[nwa-holt]: https://www.nwaonline.com/news/2026/sep/26/bulldogs-hang-on-in-flag-fest-to-win/
[hst-fac]: https://www.hotspringstrojans.com/facilities
[sc-hs]: https://stadiumconnection.com/ar/stadium.php?id=4192
[osm-hs]: https://www.openstreetmap.org/way/134051155
[img-hs]: https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/export?bbox=-93.0732,34.4734,-93.0692,34.4756&bboxSR=4326&imageSR=3857&size=1000,700&format=jpg&f=image
[501]: https://501lifemag.com/501-football-extra-hot-springs-trojans/
[sporturf]: https://sporturf.com/hot-spring-chooses-sporturf/
[usgs-hs]: https://epqs.nationalmap.gov/v1/json?x=-93.07132&y=34.47442&units=Feet&wkid=4326
[nps-tower]: https://www.nps.gov/places/hot-springs-mountain-tower.htm
[wiki-tower]: https://en.wikipedia.org/wiki/Hot_Springs_Mountain_Tower
[hsr-soccer]: https://www.hotsr.com/news/2026/apr/18/soccer-rams-put-down-trojans-at-joe-reese/
[milesplit]: https://ar.milesplit.com/meets/513862
[hssd-movie]: https://hssd.net/
[hendrix]: https://hendrixwarriors.com/honors/hall-of-honor/j-w-chick-austin/21/kiosk
[sc-lk]: https://stadiumconnection.com/ar/stadium.php?id=4252
[pr-lk17]: https://www.pressreader.com/usa/the-sentinel-record/20170820/281745564503802
[wiki-lk]: https://en.wikipedia.org/wiki/Lakeside_High_School_(Hot_Springs,_Arkansas)
[osm-lk]: https://www.openstreetmap.org/way/288068084
[img-lk]: https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/export?bbox=-92.9967,34.4723,-92.9935,34.4752&bboxSR=4326&imageSR=3857&size=800,900&format=jpg&f=image
[usgs-lk]: https://epqs.nationalmap.gov/v1/json?x=-92.99507&y=34.47376&units=Feet&wkid=4326
[sc-jv]: https://stadiumconnection.com/ar/stadium.php?id=4254
[sc-mp]: https://stadiumconnection.com/ar/stadium.php?id=4256
[sc-fl]: https://stadiumconnection.com/ar/stadium.php?id=4253
[sc-cms]: https://stadiumconnection.com/ar/stadium.php?id=4255
[eoa-ouachita]: https://encyclopediaofarkansas.net/entries/ouachita-mountains-442/
[usgs-eco]: https://sciencebase.gov/catalog/item/55c77fc2e4b08400b1fd833c
[biostor]: https://archive.org/details/biostor-201490
[wiki-lhcdp]: https://en.wikipedia.org/wiki/Lake_Hamilton,_Arkansas
[cc]: https://climate-charts.com/USA-Stations/AR/USW00003962.html
[cr-oct]: https://www.currentresults.com/Weather/Arkansas/temperature-october.php
[cr-nov]: https://www.currentresults.com/Weather/Arkansas/temperature-november.php
[almanac]: https://www.almanac.com/gardening/frostdates/AR/Hot%20Springs
[nfhs17]: https://www.sunshineofficials.com/wp-content/uploads/2017/06/2017-NFHS-Football-Rules-Book.pdf
[nfhs20]: https://cdn3.sportngin.com/attachments/document/2b15-2773405/NFHS-FB-Rule_2020.pdf
[cover]: https://coversports.com/resources/field-guides/high-school-football-field-dimensions-guide
[stencil]: https://www.stencilease.com/pages/how-to-line-and-mark-football-field-ncaa-high-school
[wiki-hash]: https://en.wikipedia.org/wiki/Hash_mark_(sports)
[wiki-field]: https://en.wikipedia.org/wiki/American_football_field
[poe17]: https://www.nmact.org/files/2017%20NFHS%20FOOTBALL%20POINTS%20OF%20EMPHASIS%20-%20June%202017.pdf
[nsaa]: https://secure.nsaahome.org/textfile/fbl/fbnotes.pdf
[mpssaa]: https://www.mpssaa.org/assets/1/6/Clarification_on_the_Restricted_Zopne-Team_Box_2025.pdf
[balls]: https://balls.com/?p=61
[wiaa]: https://www.wiaawi.org/about-wiaa/news/nfhs-logo-legal-football
[nfhs17chg]: https://www.nmact.org/files/2017%20NFHS%20Football%20Rules%20Changes%20-%20June%202017.pdf

The reference-style links above do not render as visible text in most viewers, so here is the full list.

**Lake Hamilton / Wolf Stadium**
- LHSD athletic event information, 2020: https://lhwolves.net/article/289600
- LHSD "Wolves host Rams", 2023: https://lhwolves.net/article/1207626
- StadiumConnection entry 4251: https://stadiumconnection.com/ar/stadium.php?id=4251
- Wikipedia, Lake Hamilton High School: https://en.wikipedia.org/wiki/Lake_Hamilton_High_School
- OpenStreetMap way 461379541: https://www.openstreetmap.org/way/461379541
- Sentinel-Record, Oct 17 2026: https://www.hotsr.com/news/2026/oct/17/watch-leaders-of-the-pack-wolves-hunt-down/

**Hot Springs / Joe Reese Stadium**
- SI/SBLive game preview, 2025: https://www.si.com/high-school/stats/arkansas/football/games/5405903-lakeside-vs-hot-springs/preview
- Sentinel-Record column on field names, 2022: https://www.hotsr.com/news/2022/aug/19/all-in-a-name-check-local-playing-fields/
- Sentinel-Record plaque story, 2018: https://www.pressreader.com/usa/the-sentinel-record/20180919/281479277326239
- NWA Democrat-Gazette, Sept 26 2026: https://www.nwaonline.com/news/2026/sep/26/bulldogs-hang-on-in-flag-fest-to-win/
- Hot Springs Trojans facilities page: https://www.hotspringstrojans.com/facilities
- StadiumConnection entry 4192: https://stadiumconnection.com/ar/stadium.php?id=4192
- 501 Life, 2010: https://501lifemag.com/501-football-extra-hot-springs-trojans/
- Sporturf case study, 2018: https://sporturf.com/hot-spring-chooses-sporturf/
- OpenStreetMap way 134051155: https://www.openstreetmap.org/way/134051155
- MileSplit, Joe Reese Memorial Relays 2023: https://ar.milesplit.com/meets/513862

**Lakeside**
- Hendrix College Hall of Honor: https://hendrixwarriors.com/honors/hall-of-honor/j-w-chick-austin/21/kiosk
- StadiumConnection entry 4252: https://stadiumconnection.com/ar/stadium.php?id=4252
- Wikipedia, Lakeside High School (Hot Springs): https://en.wikipedia.org/wiki/Lakeside_High_School_(Hot_Springs,_Arkansas)
- OpenStreetMap way 288068084: https://www.openstreetmap.org/way/288068084

**Other Garland County fields**
- StadiumConnection entry 4253: https://stadiumconnection.com/ar/stadium.php?id=4253
- StadiumConnection entry 4254: https://stadiumconnection.com/ar/stadium.php?id=4254
- StadiumConnection entry 4255: https://stadiumconnection.com/ar/stadium.php?id=4255
- StadiumConnection entry 4256: https://stadiumconnection.com/ar/stadium.php?id=4256

**Setting**
- NPS, Hot Springs Mountain Tower: https://www.nps.gov/places/hot-springs-mountain-tower.htm
- Encyclopedia of Arkansas, Ouachita Mountains: https://encyclopediaofarkansas.net/entries/ouachita-mountains-442/
- Climate-Charts, Hot Springs ASOS: https://climate-charts.com/USA-Stations/AR/USW00003962.html
- Almanac frost dates, Hot Springs: https://www.almanac.com/gardening/frostdates/AR/Hot%20Springs
- USGS Elevation Point Query Service: https://epqs.nationalmap.gov/
- Esri World Imagery: https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer

**NFHS rules**
- 2017 NFHS Football Rules Book: https://www.sunshineofficials.com/wp-content/uploads/2017/06/2017-NFHS-Football-Rules-Book.pdf
- 2020 NFHS Football Rules Book: https://cdn3.sportngin.com/attachments/document/2b15-2773405/NFHS-FB-Rule_2020.pdf
- CoverSports field guide: https://coversports.com/resources/field-guides/high-school-football-field-dimensions-guide
- NSAA football notes: https://secure.nsaahome.org/textfile/fbl/fbnotes.pdf
- 2017 NFHS points of emphasis (NMAA): https://www.nmact.org/files/2017%20NFHS%20FOOTBALL%20POINTS%20OF%20EMPHASIS%20-%20June%202017.pdf
- Wikipedia, American football field: https://en.wikipedia.org/wiki/American_football_field
- WIAA, NFHS logo on legal football: https://www.wiaawi.org/about-wiaa/news/nfhs-logo-legal-football
- balls.com (NFHS 2007 ball text): https://balls.com/?p=61

**Source caveats**
- The NFHS rulebook PDFs were cited from search-result excerpts and were not downloaded.
- The StencilEase guide returned HTTP 429 when fetched, so its figures come from search excerpts.
- The PressReader pages returned HTTP 403, so their facts come from search-result excerpts.
