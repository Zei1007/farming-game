import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// `mode` is "development" (npm run dev), "production" (npm run build),
// or "store" (npm run dev:store / build:store) — see src/config/buildTarget.ts
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // expose on LAN so you can test on a phone during dev
  },
});
