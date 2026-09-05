# MISSING: PUN — estate vertical slice

Branch `estate-vertical-slice`. One complete 8 to 10 minute loop through a
fictional early-2000s South London council estate, built on the existing
single-file WebGL game without a framework.

## The loop

1. **Courtyard** (start). Sodium lamp posts, paving, a football cage, bins, a
   skip you can climb into, an estate board with no name on it, a CCTV pole
   that turns to follow you. Boundary walls are brown brick with a concrete
   coping. Rain the whole time.
2. **Undercroft** along the block's ground floor: columns, sodium bulkheads,
   a lift door that should not be on this side of the building. Chain-link
   between you and the service yard.
3. **Stairwells**, one at each end. Concrete, municipal green to the dado line
   and dirty cream above, tube lighting, wired-glass door and intercom at the
   bottom, a cupboard under the stairs to hide in, wired-glass windows over
   the yard. The stairs really climb: the deck is one storey up and the
   camera follows.
4. **First-floor walkway**: flats on one side (green and oxblood doors with
   seven-segment numbers, meter cupboards you can hide in, tubes every third
   bay, plates by the stair doors), a black railing over the drop on the
   other. The lift landing sits half way along: vinyl floor, notice board,
   call button, cleaner's cupboard, and the lift, which is the way out once
   the case is complete.

Evidence (3, or 4 on nightmare) is spread with at least one item up top and
one at ground level, so the loop is: courtyard, up one stair, along the deck,
down the other, bin store and undercroft, back up, lift.

## What the estate does

All of this is either seeded, sent over the wire as an existing shift spec,
or purely local to the player's own screen, so multiplayer cannot desync.

- **Lights answer to Pun.** Every fixture has a health value. The nearer he is,
  the more a tube stutters; now and then it dies for a few seconds with a buzz
  (panned), and sodium lamps dim and hum. The nearest fixture is the third
  light in the shader, so the ground goes dark around you when he is near.
- **Flat numbers change.** When a tube on the walkway blacks out, the doors in
  that stretch renumber. First time it happens on the deck you get a line.
- **The walkway gets longer.** Walking the deck with nobody hunting you, your
  speed eases down to 74% over a few seconds and the fog closes in, so it takes
  longer than it looks. Sprinting or a chase snaps it back.
- **The stairs loop.** Reaching the top of a stair (not during a chase, not in
  the endgame, at most twice a round, 45 s apart) can put you back on the
  bottom landing with the light out and a sting.
- **The lift opens somewhere impossible.** Calling it without the full case:
  either OUT OF ORDER, or the doors close, the light goes, and they open on
  the bin store, the far stair top, or the undercroft. If Pun is close it
  always refuses, so it can never dump you into him unfairly.
- **The block rewrites itself** (existing shift engine, new moves): an
  undercroft bay bricks up while a recess opens in the flats, a bay opens over
  the yard, an alcove under the deck, a hole in the bin store wall. Every
  rewrite still passes the connectivity test and pinned rooms are never
  touched.

## Systems kept as they were

Evidence collection and the case card, hiding and Pun's remembered hiding
places, detection, the girl, the watcher and knocks, traps (now loose drain
grates), stamina, the compass, difficulty tiers, the title poster, lobby,
co-op and vs modes, host takeover, voice chat, mobile stick and USE button,
settings, the ending overlays and the service worker.

## Technical notes

- `generateEstate()` lays the template on the grid (`zone[r][c]` tags every
  cell), `placeEstateContents()` dresses it, `buildTopology()` now also turns
  fence edges into collision and pathing blocks.
- `floorAt(x,z)` returns the floor height; `player.fy` and `creature.fy` ease
  toward it; every dynamic draw sets `DRAW_Y` so boxes sit on the right floor.
- The level mesh carries a per-vertex material float (`aMat`); the fragment
  shader does brick, plaster, wet concrete, glass, metal, terrazzo and water
  procedurally, with a `uWet` uniform for specular outdoors.
- Fog colour and range, ambient and rain follow the player's zone.
- `sw.js` VERSION is `missing-pun-preview-estate-1`; the menu shows
  `estate slice 1`.

## Testing performed (Playwright, headless Chromium, swiftshader)

- Solo run: start, teleport tour of all eleven landmarks with screenshots,
  keyboard walk, hide in the skip and step out, collect all evidence (three
  shifts applied, grid stays connected), endgame, reach the lift, win overlay.
- Horror module: a tube near Pun dies; stair loop fires; walkway stretch
  settles at 0.75; lift misdelivery moves the player and lights go out at the
  destination; door renumbering changes numbers.
- Determinism: the same seed builds the same evidence layout twice; a
  different seed differs.
- Shift planner: eight consecutive shifts, connectivity held every time.
- Multiplayer (mock Supabase over BroadcastChannel, two tabs): both tabs build
  the same grid and zones from the host's seed; evidence pickup and its shift
  replicate; positions replicate. No page errors.

Not tested here: real Supabase, WebRTC voice, iOS Safari on a device
(swiftshader only), Capacitor.

## Known issues

- Wall-mounted numerals are boxes, so at a distance they read as marks rather
  than digits; they are legible within about two bays.
- The service yard is only ever seen from the walkway edge or through the
  chain-link; it is dressed lightly.
- Pun spawns at the far end of the grid, which is the lift landing; he starts
  by the exit as he did in the house.
- No ceilings: the fixed camera never sees them, but the stairwell and lift
  landing read as open-topped from very high camera angles.
- The tower blocks beyond the estate are silhouettes with lit windows; there
  is no skyline geometry beyond that.
- Manifest orientation is still landscape, as before.
