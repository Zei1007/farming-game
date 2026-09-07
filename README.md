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

## Not implemented yet (see design-brief.md §7)

Day/night visuals, more NPCs/quests, house customization, save/load,
sound, additional crops from the data file (palay, saging, ube, kangkong,
mangga are already defined in `crops.ts`, just not yet wired into the seed
bar), minigames.

## Suggested next steps

1. `npm install && npm run dev` and tell me what breaks (there will likely
   be something small — I built this without a live test loop).
2. Swap the placeholder primitive shapes for real low-poly models once you
   like the mechanics (glTF via `@react-three/drei`'s `useGLTF`).
3. Add save/load (localStorage is enough for a prototype).
4. Wire the rest of the crop roster into `SeedBar`.
