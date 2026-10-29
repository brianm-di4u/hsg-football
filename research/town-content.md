# Friday Night Spa City: town content

Every real place, school, fact, name and color the game uses, with its source. Anything not listed
here is fictional flavor (players, fictional towns, play names, the league, the trophy).

Primary sources inside the repo:
- `shared/data/schools.json` (v1): the shared school file for all three sports games. **Copied** into
  the game as `data/schools.json` by `tools/build-data.mjs`; never edited.
- `research/schools-and-athletics.md`: the sources behind `schools.json`.
- `games/trivia/data/questions.json`: the audited trivia bank (511 questions, re-verified twice).
  Halftime facts are copied from it by id, with their `source` names.
- `research/visual-style-guide.md`: P10 school-colors palette, Friday Night Spa City art hooks,
  the Arlington and Medical Arts silhouette recipes.
- `shared/design/tokens.css`: theme tokens (`deco-neon` dark, `gilded-spa` light, `school-colors`).

## 1. The seven schools (real; setting only)

All from `schools.json` → `schools[]`. Real names, cities, mascots, classifications and title years
are setting. **No real students, players or coaches appear anywhere.** Mascot art is original
geometric art drawn in code from each `mascotConcept`; no logos.

| id | Shown as | Mascot | Colors (game) | `colorsConfirmed` | Football class | Football titles shown |
|---|---|---|---|---|---|---|
| hot-springs | Hot Springs High School (Trojans) | crested helmet profile | black / gold | yes | 5A | 1934 (shared), 1970, 1972 |
| lakeside | Lakeside High School (Rams) | ram head, spiral horns | blue / gold | yes | 5A | none (see 1975 note) |
| lake-hamilton | Lake Hamilton High School (Wolves) | wolf head, wedge ears | maroon / gold | yes | 6A | 1992, 2008 |
| fountain-lake | Fountain Lake High School (Cobras) | cobra, spread hood | green / white | **no: game colors** | 4A | 2009 |
| cutter-morning-star | Cutter-Morning Star High School (Eagles) | eagle head profile | navy / silver | **no: game colors** | 3A | none |
| jessieville | Jessieville High School (Lions) | lion head, flame mane | purple / gold | **no: game colors** | 3A | 2006 |
| mountain-pine | Mountain Pine High School (Red Devils) | friendly imp shield mark | red / black | **no: game colors** | 2A | 1978, 1979 |

Rules applied in the game:
- Hex values are stand-ins from `schools.json` (P10 for the three confirmed schools). Where
  `colorsConfirmed` is false, the team card and credits label the colors **"game colors"**.
- **Venue names** appear only where `venueConfirmed` is true: *Joe C. Reese Stadium* (Hot Springs)
  and *Wolf Stadium* (Lake Hamilton, Pearcy). Every other home game says "<School> home field".
  Lakeside's "Chick Austin" listing is unconfirmed, so it is not shown.
- The state final venue is not confirmed (War Memorial Stadium is "commonly cited" only), and the
  game has no state playoffs anyway: its playoff is the invented **Spa City Cup** final, played at
  "a neutral site".
- 1934 is shown as "shared" (co-champions with Blytheville and De Queen: `schools.json` notes;
  audited trivia hs-0227). Hot Springs' 1942 title is **not** claimed (school page only).
- Lakeside: "No state football title; lost the 1975 final to Stuttgart" (schools.json notes;
  audited hs-0236). Stuttgart is a real school: it is named only in this fact text, never as a team.
- Mountain Pine's 1978–79 titles are shown as years only. `schools.json` says "likely Class B";
  the audited trivia (hs-0239) reads the champions list as Class A. Class is not shown.
- Classification badges (6A…2A) are the football classifications in `schools.json`. Jessieville's
  3A-vs-2A conflict is resolved to 3A as `schools.json` says.
- Team strength in the game is a **game invention** seeded from `tier` and classification
  (big > mid > small). It is not a ranking of the real programs.

## 2. Rivalries

From `schools.json` → `rivalries[]` and the audited trivia bank.

| Pair | What the game shows | Source |
|---|---|---|
| Lakeside vs Lake Hamilton | Season opener ("Rivalry Week" badge). Fact card: "About 15 miles apart. The series was paused after the 1999 season; Lakeside won the Aug. 25, 2023 meeting 49–42 at Wolf Stadium in Pearcy." | schools.json rivalries; audited hs-0252, hs-0253, hs-0276 |
| Hot Springs vs Lakeside | Season finale ("Rivalry Week" badge). "Both in 5A South for 2024–26; Lakeside lists the Trojans as a rival." | schools.json rivalries |
| Cutter-Morning Star vs Jessieville | "3A-4 football league mates" tag on the matchup splash | schools.json rivalries |

**Conflict found and handled:** `schools.json` says the series was "renewed in August 2023 after a
19-year break". The audited trivia bank (hs-0252, hs-0253, re-sourced to the Sentinel-Record's 2017
story "Rams, Wolves renew football series") says the series resumed in **2018**, and 1999 + 19 =
2018. The game therefore says only "paused after the 1999 season" and names the 2023 game as
a meeting, not as the renewal. It does not state the renewal year. Reported in `REPORT.md` for the
coordinator, since `schools.json` is shared.

No trophy or official game name exists. The game's names (*Spa City Cup*, *Rivalry Week*) are
invented and the credits say so.

## 3. Halftime facts (audited trivia bank, by id)

Shown one per halftime, matched to the two teams when possible, each with its source line.

| id | Fact as shown | Source shown |
|---|---|---|
| hs-0225 | Lakeside High School was founded in 1928. | Wikipedia: Lakeside High School |
| hs-0227 | Hot Springs shared the 1934 state football title with Blytheville and De Queen. | Wikipedia: List of Arkansas state HS football champions |
| hs-0236 | Lakeside lost the 1975 state football final to Stuttgart, and won the 5A South in 2019. | Wikipedia: Lakeside High School |
| hs-0237 | The Trojans won state football titles in 1934, 1970 and 1972. | Wikipedia: List of Arkansas state HS football champions |
| hs-0239 | Mountain Pine won back-to-back state football titles in 1978 and 1979. | Wikipedia: List of Arkansas state HS football champions |
| hs-0251 | Lake Hamilton won state football titles in 1992 and 2008. | Wikipedia: Lake Hamilton High School |
| hs-0252 | Lakeside beat Lake Hamilton 49–42 at Wolf Stadium in Pearcy on Aug. 25, 2023. | Sentinel-Record (Aug 2023) |
| hs-0253 | The Lakeside–Lake Hamilton series was discontinued after the 1999 season. | Sentinel-Record: Rams, Wolves renew football series |
| hs-0254 | Jessieville won the Class 2A state football title in 2006. | Wikipedia: List of Arkansas state HS football champions |
| hs-0255 | Fountain Lake won the Class 3A state football title in 2009. | Wikipedia: List of Arkansas state HS football champions |
| hs-0274 | Lake Hamilton's colors are maroon and gold. | Wikipedia: Lake Hamilton High School |
| hs-0275 | Lake Hamilton High School is in Pearcy. | Wikipedia: Lake Hamilton High School |
| hs-0273 | Lakeside's colors are blue and gold. | Wikipedia: Lakeside High School |
| hs-0278 | Hot Springs High's colors are black and gold. | Wikipedia: Hot Springs High School |

Two `schools.json` facts are also used as halftime cards, credited to it:
- "Hot Springs High's black and gold trace to 1912, when Honus Wagner bought the team black-and-gold
  basketball uniforms." (schools.json notes; research/schools-and-athletics.md → Wikipedia: Ban Johnson Park)
- "Cutter-Morning Star returned to 11-man football in a 3A-4 league." (schools.json notes; Fearless Friday)

The halftime card text is a light rewording of the audited explanation; the facts and numbers are
unchanged. Adult alumni (living people) are **not** used: the game has no need for them.

## 4. Rules context (presented as game rules, not as cited facts)

`schools.json` → `rulesContext`: NFHS defaults such as 12-minute quarters are **unconfirmed** for
Arkansas, and overtime and playoff bracket rules are not sourced. The game therefore:
- offers 3-, 6- and 12-minute quarters (Settings), labelled "game rules";
- uses its own tiebreaker overtime (each team gets a series from the 10), labelled as a game rule
  in How to Play;
- uses NFHS-style 6/3/2/1 scoring and 4 downs to gain 10 yards, which is general football, not a
  claim about Arkansas specifically.
- The season calendar "Aug–Nov, rivalry games late August" (`schools.json` → seasons, inferred) is
  used only as the season's flavor: week 1 is labelled "late August".

## 5. Art references (inferred recipes, no logos)

From `research/visual-style-guide.md`:
- **Palettes:** `school-colors` (stand-ins), `deco-neon` night sky (`#14121F`, gold `#D4AF37`,
  neon blue `#4FC3FF`), `gilded-spa` skyline (cream brick `#E6D7B5`, red tile `#A9432C`).
- **Skyline beyond the end zone (town schools):** the Arlington as a wide symmetrical block with
  twin towers (Arlington Hotel recipe) and the Medical Arts Building as a tall slab narrowing in
  setbacks with vertical piers (Medical Arts recipe). Shown on the title and pregame splash for
  Hot Springs and Lakeside home games, as generic silhouettes. Small-school games get a pine-ridge
  backdrop; Lake Hamilton and Lakeside get a lake band. (Style guide → Friday Night Spa City hooks.)
- **Crowd** as dot-matrix circles in team colors; light-tower radial glows for night games;
  split-diagonal color fields on rivalry splashes; the Spa City Cup drawn as a dome on a plinth
  (style-guide hook D15, a generic dome, not a depiction of the Quapaw).

## 6. Fictional content (labelled fictional in game)

- **Players:** every name is generated from first/last name syllable lists at runtime, seeded per
  school and season. "All players are fictional" appears on roster screens and in the credits.
- **Fictional out-of-county opponents** (`opponentsNote`): *Quartz Hollow Miners*,
  *Tufa Ridge Herons* and *Cinnabar Flats Comets*. The towns are invented; their names borrow
  rock words (quartz, tufa, cinnabar) and are not real Arkansas towns or schools.
- **League:** the *Spa City Cup* league (10 teams: the 7 real schools plus the 3 fictional ones),
  round-robin, top four into a two-round playoff. Real schools play in their AAA classes and
  conferences; this league is a game invention, and the season screen says so.
- **Play names** (e.g. "Bathhouse Dive", "Promenade Slants") are original and borrow local words;
  generic football terms (slant, sweep, blitz) appear only in descriptions.
- **Coaches:** none named. The player is "Coach".
