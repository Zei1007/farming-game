# Bahay Kubo Rush 🌾

An Animal Crossing-style farming game prototype, built with **React Three
Fiber** (Three.js), flavored with Filipino internet-meme culture.

See `design-brief.md` (in the "Farming" project docs) for the full design
rationale. Quick summary below.

## Running it

```bash
npm install
npm run dev
```

Open the printed `localhost` URL. `npm run dev` also exposes the dev server
on your LAN (`--host`), so you can open the same URL on your phone to test
touch controls — check your terminal for the network address.

> **Note on how this was built:** the sandbox this was authored in has no
> access to the npm registry, so I could not run `npm install` or a dev
> server to visually test this myself. Every file was hand-written and
> syntax-checked with the TypeScript compiler (no diagnostics), but you're
> the first to actually run it — if something breaks on `npm install` /
> `npm run dev`, tell me the error and I'll fix it.

## Controls

- **Desktop:** WASD / arrow keys to move.
- **Mobile / touch:** on-screen joystick, bottom-left.
- Tap an empty farm tile to plant your selected seed.
- Tap a tile with a glowing yellow ring to harvest it.
- Tap the sari-sari store to talk to Mang Kanor.

## Project structure

```
src/
  config/buildTarget.ts   — "open" vs "store" build flag (see below)
  data/crops.ts           — all crop definitions (data-driven)
  data/dialogue.ts        — NPC lines, loading tips
  state/useGameStore.ts   — zustand store: currency, inventory, tiles, day
  controls/inputState.ts  — shared (non-React) input vector for the game loop
  three/                  — R3F scene: Character, FarmGrid, CameraRig, etc.
  ui/                     — HUD, seed bar, dialogue box, virtual joystick
capacitor.config.ts       — wraps the web build as an Android app (see below)
.github/workflows/        — CI that compiles the actual .apk (see below)
```

## Getting an installable Android APK

There's a GitHub Actions workflow (`.github/workflows/build-apk.yml`) that
builds a real, sideloadable `.apk` for you automatically — no Android
Studio required. I couldn't run this myself (this sandbox has no Android
SDK and its network policy blocks Google's package repos), but GitHub's
build servers have both, so this is the actual way to get the file:

1. Create a new repo on GitHub (public or private, either is fine) and
   push this whole folder to it:
   ```bash
   git init
   git add .
   git commit -m "Bahay Kubo Rush prototype"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. On GitHub, open the repo's **Actions** tab. The "Build Android APK"
   workflow starts automatically on that push (takes ~3-5 minutes — it's
   installing dependencies and compiling a native Android project from
   scratch each run).
3. When it finishes, click into the run → scroll to **Artifacts** →
   download `bahay-kubo-rush-open-debug-apk.zip`. Unzip it — that's your
   `.apk`.
4. To install it on an Android phone: transfer the `.apk` over (email,
   Drive, USB, whatever), open it on the phone, and allow "install from
   this source" if Android asks. It's an unsigned **debug** build, meant
   for your own testing, not the Play Store.

Want the store-safe variant (the "damo" crop reskinned to "Kalabasang
Bawal", see below) instead? Go to Actions → "Build Android APK" → **Run
workflow** → choose `store` from the dropdown.

If you'd rather I push the code and trigger this for you directly instead
of doing it by hand, connect a GitHub account/repo to this session and
I'll take it from there.

## The "damo" crop and mobile store safety

One crop (`damo`, the joke marijuana plant) is flagged `storeUnsafe` in
`src/data/crops.ts`. Run:

```bash
npm run dev:store     # or npm run build:store
```

...and that one crop auto-reskins to a fictional "Kalabasang Bawal" (forbidden
squash) — same mechanics, no drug name/iconography — so you have a
store-submittable build without touching any other code. Default `npm run
dev` / `npm run build` stays in "open" mode with the full joke intact, for
web/itch.io/sideloaded use.

## What's implemented (MVP)

- 3D farm scene: character movement (touch joystick + WASD), trailing camera
- Plant → grow (visible stages) → harvest loop, 4 crops wired end-to-end
  (kamatis, talong, kalabasa, damo)
- Currency, seed shop (buy button per seed), day counter
- One NPC (Mang Kanor) with rotating meme-flavored dialogue lines
- Cosmetic "Advanced Ako Mag-isip" speed buff on harvesting damo

## Visual style — copied from a reference site

At your request, the UI/UX chrome was rebuilt to match
[worawork.vercel.app](https://worawork.vercel.app/)'s Animal Crossing look:

- **Orthographic top-down camera** (`OrthographicCamera` in `Scene.tsx`) —
  flat "diorama" framing instead of perspective distortion, same as the
  reference's locked isometric shots.
- **Vignette frame** (`.vignette-overlay` in `App.css`) — the dark
  radial-gradient border around the play area.
- **Warm wood + cream + sage palette** — tokenized as CSS custom properties
  at the top of `src/index.css` (`--wood-mid`, `--cream`, `--sage`,
  `--terracotta`, `--gold`, etc.) and reused for the ground, hedges, roof,
  and every UI panel.
- **Circular corner buttons** (`CornerButtons.tsx`) — "?" help (opens a
  tabbed, backdrop-blurred modal, `HelpModal.tsx`) and a sound toggle,
  pinned to the top corners like the reference.
- **Speech-bubble dialogue box** with a CSS-drawn tail and a bobbing "▼"
  continue indicator (`DialogueBox.tsx`).
- **Floating "E" interact prompt** that fades in when you walk near the
  store (`InteractPrompt.tsx`, using `@react-three/drei`'s `Html`), same as
  the reference's desk prompt.
- **Fredoka / Baloo 2** rounded Google Font, loaded in `index.html`, to
  match the reference's chunky rounded lettering.
- Hedge blocks and lit lanterns (`Hedge.tsx`, `Lantern.tsx`) dressing the
  farm border.

**What this does *not* copy**: the reference's actual furniture and
character are fully modeled, textured 3D assets (a real interior-design
portfolio's models) — that's a 3D-asset-creation task, not something I can
generate as hand-written Three.js primitives. Everything here (character,
crops, store, hedges) is still built from primitive geometry recolored to
match the palette. If you want true asset parity later, the path is
sourcing/commissioning low-poly glTF models (furniture, a rigged
big-head villager) and swapping them in via `useGLTF` — the palette,
camera, and UI chrome are now already set up to receive them.

I built all of this without a live browser to check it against — I don't
have a working Chrome/browser connection in this environment right now, so
none of the above has been visually verified. Screenshot it once you run
`npm run dev` and tell me what's off (colors, camera angle/zoom, dialogue
bubble sizing are the most likely to need tuning) and I'll adjust.

## Not implemented yet (see design-brief.md §7)

Day/night visuals, more NPCs/quests, house customization, save/load,
sound (the mute button is currently cosmetic-only, no audio system is
wired up), additional crops from the data file (palay, saging, ube,
kangkong, mangga are already defined in `crops.ts`, just not yet wired
into the seed bar), minigames.

## Suggested next steps

1. `npm install && npm run dev`, then send me a screenshot — I built the
   whole visual overhaul without being able to see it render.
2. Tune the `OrthographicCamera` `zoom`/position in `Scene.tsx` and the
   `CameraRig` offset to match your taste once you can see the framing.
3. Swap the placeholder primitive shapes for real low-poly models once you
   like the mechanics (glTF via `@react-three/drei`'s `useGLTF`).
4. Add save/load (localStorage is enough for a prototype).
5. Wire the rest of the crop roster into `SeedBar`.
