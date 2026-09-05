# Asset provenance

MISSING: PUN ships as one HTML file plus a handful of support files. Nothing in
the estate vertical slice is downloaded at runtime and nothing is licensed from
a third party except the fonts listed below.

## Geometry, textures and lighting

Everything you see is generated in code at load time from a seed:

- The estate layout (courtyard, undercroft, two stairwells, first-floor walkway,
  lift landing, bin store, service yard, tower blocks beyond) is a template laid
  out on the game's cell grid in `generateEstate()` and dressed in
  `placeEstateContents()`.
- All models are boxes and quads built in `buildLevelMesh()` and the dynamic
  draw functions. There are no imported meshes.
- All surface detail (paving joints, puddles, brick courses and mortar, plaster
  grime and damp, wired glass, terrazzo speckle, standing water) is procedural
  noise in the fragment shader, keyed by a per-vertex material index. There are
  no image textures.
- Flat numbers are drawn as seven-segment numerals from boxes; the numbers
  themselves are random and change during play.
- Signage is deliberately blank: green boards with cream bars where text would
  be, so that no real borough, estate, council or brand is depicted. The
  fictional block has no name in the game.
- Rain, dust, tube flicker, sodium glow and CCTV motion are code.

## Sound

- Ambience, footsteps, rain, mains hum, tube buzz, lift hum, door slams,
  stingers and the music bed are synthesised with the Web Audio API at runtime
  (`initAudio()` and the functions after it).
- Pun's voice lines and the girl's lines are recordings supplied by the project
  owner's friends for this game, embedded as base64 MP3 in `index.html`
  (`VO_SRC`). They pre-date this branch and are used with their permission.
  They are only ever triggered by game events, never by a button, and are never
  replaced by browser speech synthesis.

## Images

- The poster photograph on the title screen is the project owner's own
  photograph of Pun, embedded as base64, unchanged on this branch.
- App icons under `assets/` are the project's own artwork, unchanged.

## Fonts

`fonts/` contains Anton, EB Garamond, Pirata One, Space Mono and Special Elite,
all under the SIL Open Font License 1.1 (see `fonts/OFL.txt`). They are the
same files the previous build shipped.

## Libraries

`supabase-js` v2 is inlined at the top of `index.html` (MIT licence) for the
multiplayer lobby. No other library is used; the renderer is hand-written
WebGL 1.

## What is not here

No adverts, no analytics, no tracking, no payments, no external requests other
than the Supabase realtime channel used for multiplayer and the TURN relay used
for voice chat, both of which existed before this branch.
