import type { CapacitorConfig } from "@capacitor/cli";

// appId is the Android package name (reverse-domain). Change it before a
// real Play Store submission — it can't be changed later without a new
// listing — but it's fine as-is for sideloaded/debug testing.
const config: CapacitorConfig = {
  appId: "com.zei.bahaykuborush",
  appName: "Bahay Kubo Rush",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
};

export default config;
