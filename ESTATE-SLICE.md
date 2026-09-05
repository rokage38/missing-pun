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

## Pass 2: the loop has a shape now

- **The case is a route.** Only one piece of evidence exists at a time and
  each points to the next: Pun's door-entry fob in the bin store, the intercom
  tape inside a stairwell, the CCTV still on the walkway, and on nightmare the
  watch by the lift door that should not be in the undercroft.
- **The stairwell doors start locked.** Act one is the courtyard, undercroft and
  bin store with Pun patrolling the walkway above you, calling down when he
  sees you. The fob unlocks both doors (a shift spec on the wire, so every
  client opens them together) and he can come down.
- **Bagging takes 1.5 seconds** standing still on the item; moving resets it.
- **Completing the case calls the lift**, which takes 35 / 50 / 65 seconds by
  difficulty to arrive. The HUD counts it down, a light dies every few seconds,
  Pun is relentless, and the doors only open when it is there. Calling early
  shoves you back out.
- Sodium ambient lifted, fog opened up outdoors, flat numbers larger, header
  status line moved clear of the menu button.
- Dressing: satellite dishes, fly-tipped mattress and fridge, cardboard, more
  bins in the undercroft, a camera over each stair top landing.
- Sound: distant sirens, a dog, a television through a wall on the walkway,
  hollow deck footsteps and clattering stair footsteps for Pun, a lift ding.

## Pass 3: Pun's games

- **Every piece bagged starts a minigame** for everyone still alive, on their
  own phone, at the same time, from the same seed. The world holds still while
  it runs (Pun included; a human Pun is told to wait).
- **Intercom**: the door-entry panel lights buttons in Pun's order and you press
  them back; one mistake locks the panel. Score is rounds completed in 22 s.
- **Dead Tube**: the tube stutters; tap only while it is lit. Hits minus misses
  in 20 s, so spamming scores nothing.
- **Stakes**: highest score wins and gets a breath (dead lights come back near
  them, lanterns full, ten seconds off the lift when it is called). Lowest
  score is marked for thirty seconds: Pun reads them as three times nearer,
  sees them from three times further, and everyone's HUD says PUN IS AFTER
  [name]. All equal means nobody is marked. Solo, you play against Pun's par
  (3 / 4 / 5 rounds, 9 / 12 / 15 hits by difficulty).
- **Scoreboard** on both ending screens: evidence bagged, games won, times
  caught, who got out, with titles (bagged the most, won Pun's games, Pun's
  favourite, always last, left the others).
- Results are exchanged as plain numbers and every client ranks them the same
  way, so there is no referee to disagree with. Live scores tick during play.
- `sw.js` cache `estate-3`; the menu shows `estate slice 3`.

## Pass 4: fixes from the three-phone test

- **Voice chat rebuilt**: one connection per friend, the lower id always
  offers, ICE gathered in full before a single reliable offer/answer message,
  no re-dial while a handshake is in flight, a watchdog that re-dials anyone
  stuck or dropped, playback through plain audio elements with a tap-to-unlock
  fallback. Tested with three tabs and fake microphones: all linked in two
  seconds, and a leave/rejoin relinks.
- **Messaging hardened**: the Supabase client now allows 50 events a second
  (the default 10 silently dropped messages while positions went out at 15 a
  second); important events (evidence, shifts, deaths, results, signalling)
  are sent twice with an id and deduplicated; the host repeats the world
  state every four seconds and a peer that missed a pickup catches up,
  minigame included.
- **Pun stays in the block.** The courtyard and bin store are outside for
  him: he paths to the nearest place inside and waits (undercroft, stair door),
  cannot catch you outside, and says so once. He starts at a walkway end, not
  by the lift.
- **Hiding places fixed**: the meter cupboards and stair cupboards had their
  wall normals reversed, so stepping out put you inside the wall; stepping out
  now searches for a clear spot (the skip is deeper than a cupboard).
- **Minigames teach themselves**: a three-line card with a countdown before
  each game, WATCH / YOUR TURN / TAP / WAIT cues in the top band, keyboard
  hints on desktop; input moved to captured pointer events on the whole card
  so the floating stick cannot swallow a tap; canvas sized after layout.
- `sw.js` cache `estate-4`; the menu shows `estate slice 4`.

## Pass 5: the cage

Two games that take everyone somewhere else. When one starts the picture cuts
to the estate's football cage at night: sodium lamp, wet tarmac, chain-link,
wheelie bins in the way, rain, and everyone's actual character in it, seen from
a high fixed camera so the whole cage fits a phone (the cage shrinks a little
in portrait). Steer with the stick or WASD. Positions go out ten times a
second; anything that scores is a reliable message settled by one authority.

- **Scramble**: a light comes on somewhere in the cage; first to stand in it
  takes it, then it moves (or moves on its own after five seconds). The host
  places the lights and awards claims. Solo, you race Pun himself, and you
  must beat his count.
- **Chase**: one of you is Pun for twenty seconds, chosen from the seed so
  every phone agrees, drawn as Pun. The catcher's phone decides catches and
  tells everyone. Survivors score seconds alive; Pun scores seven a catch.
  Needs at least two players, otherwise Scramble runs instead.
- Rotation is intercom, scramble, tube, chase by seed. New scoreboard titles:
  "first to the light" and "a natural Pun".
- `sw.js` cache `estate-5`; the menu shows `estate slice 5`.

## Pass 6: friends on screen, Chase that lasts

- **Teammate markers**: a name tag over each friend's head while they are on
  screen; when they are off screen an arrow sits on the edge of the frame
  pointing at them with their distance, dimmed if they are hiding and red if
  Pun is after them. Never shown to a human Pun, never during the cage.
- **Dead Tube** is out of the rotation (still in the code). Rotation is now
  Scramble, Intercom, Chase.
- **Chase** lasts 32 s in a bigger cage; runners are faster than Pun, so he
  has to corner them; anyone caught is stunned for a beat and then joins the
  chase, drawn as Pun, until one runner is left. The original Pun scores six
  for every catch the pack makes, the catcher three, runners their seconds.
- `sw.js` cache `estate-6`; the menu shows `estate slice 6`.

## Pass 7: last one standing

- **Last One Standing** is a mode of its own, solo (the OUTLAST HIM stamp next
  to GO IN) and in the lobby. No case, no locked doors, no lift, no minigames:
  ten seconds of grace and then he comes, straight into the courtyard if that
  is where you are. Every forty seconds he gets quicker, sharper-eared and
  keener-eyed, and a light in the block dies for good ("He is getting
  quicker." … "Nowhere left."). The HUD counts STANDING and the compass points
  at the nearest living friend. Together, the round ends the moment one player
  is left alive: the host names the winner in the round message so every phone
  agrees, the winner gets LAST ONE STANDING with their time, everyone else sees
  who outlasted them, and the scoreboard ranks by time lasted. When only you are
  left you hear "Get over 'ere!" and a toast says so. Solo, the lose screen
  shows how long you lasted and your best on that difficulty (kept on the
  phone). Try Again replays the same mode.
- **The case mode gets him out sooner**: if nobody has found the fob within
  fifty seconds the stair doors buzz open on their own ("The door buzzes.
  Someone let him out.").
- **Voice diagnostics**: the settings panel shows a line per friend (no link,
  connecting, linked and hearing them, or linked but sound blocked) and the
  last voice event, so a phone that cannot hear can say why.
- `sw.js` cache `estate-7`; the menu shows `estate slice 7`.

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
- `sw.js` VERSION carries the pass number (`estate-7`); the menu build tag
  matches it.

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
- Minigames: intercom played well beats par and grants the perk; played badly
  marks the player; tube likewise; a bagged piece starts a game on its own;
  two tabs play the same game, exchange results, the winner is announced and
  the loser marked on both screens; the board renders with titles.
- Last one standing: solo start shows STANDING 1, no evidence and no locked
  doors, the ratchet fires at 40 and 80 s and kills two lamps, death shows the
  lasted line and stores a best, Try Again keeps the mode and GO IN returns to
  the case; case mode auto-unlocks at 50 s; three tabs in last mode agree on
  the mode, the HUD drops to STANDING 2 on the first death, the round ends on
  the second with the survivor named on all three screens and ranked first.
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
- No ceilings: the fixed camera never sees them, but the stairwell and lift
  landing read as open-topped from very high camera angles.
- The tower blocks beyond the estate are silhouettes with lit windows; there
  is no skyline geometry beyond that.
- Manifest orientation is still landscape, as before.
