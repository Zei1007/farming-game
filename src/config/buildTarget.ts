/**
 * Which build we're compiling for.
 *
 * - "open"  → web build (itch.io, your own site, sideloaded APK). Full joke
 *             content allowed — this is the default for local dev.
 * - "store" → Google Play / Apple App Store build. Content flagged as
 *             `storeUnsafe` in src/data/crops.ts auto-reskins to a
 *             store-safe alternative (see Crop.storeSafeAlt). Nothing else
 *             about the game needs to change — same code, same mechanics.
 *
 * Run `npm run dev:store` / `npm run build:store` to compile the store
 * variant. See package.json.
 */
export type BuildTarget = "open" | "store";

export const BUILD_TARGET: BuildTarget =
  import.meta.env.MODE === "store" ? "store" : "open";
