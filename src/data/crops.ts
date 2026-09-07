import { BUILD_TARGET } from "../config/buildTarget";

export interface CropDef {
  id: string;
  /** Display name shown in the open (web) build. */
  name: string;
  emoji: string;
  /** Seconds from planting to harvest-ready (tuned short for a playable prototype). */
  growSeconds: number;
  buyPrice: number;
  sellPrice: number;
  /** Low-poly stage color ramp: seed -> sprout -> growing -> ready. */
  stageColors: [string, string, string, string];
  /** Flavor text bank shown when this crop is harvested. */
  harvestLines: string[];
  /** Special one-off effect when harvested (purely cosmetic buff). */
  buff?: {
    label: string;
    /** Flavor line shown when the buff triggers. */
    line: string;
  };
  /**
   * If true, this crop is reskinned entirely for the "store" build target —
   * see storeSafeAlt below and src/config/buildTarget.ts.
   */
  storeUnsafe?: boolean;
  storeSafeAlt?: {
    name: string;
    emoji: string;
    harvestLines: string[];
  };
}

const RAW_CROPS: CropDef[] = [
  {
    id: "kamatis",
    name: "Kamatis",
    emoji: "🍅",
    growSeconds: 12,
    buyPrice: 5,
    sellPrice: 12,
    stageColors: ["#7a5230", "#8fbf5a", "#e0a63a", "#d1432a"],
    harvestLines: [
      "Ang sarap gawing sawsawan!",
      "Segurista crop, laging may bili.",
    ],
  },
  {
    id: "talong",
    name: "Talong",
    emoji: "🍆",
    growSeconds: 14,
    buyPrice: 6,
    sellPrice: 13,
    stageColors: ["#7a5230", "#6f9c4f", "#3d6b3d", "#4a2a5c"],
    harvestLines: ["Ayoko ng may sabaw!", "Pang-tortang talong, chef's kiss."],
  },
  {
    id: "kalabasa",
    name: "Kalabasa",
    emoji: "🎃",
    growSeconds: 20,
    buyPrice: 8,
    sellPrice: 22,
    stageColors: ["#7a5230", "#8fbf5a", "#d99a2b", "#e8862a"],
    harvestLines: [
      "Ulam or dessert? Bahala ka.",
      "Mabigat 'to, pang-negosyo!",
    ],
  },
  {
    id: "palay",
    name: "Palay",
    emoji: "🌾",
    growSeconds: 30,
    buyPrice: 4,
    sellPrice: 9,
    stageColors: ["#7a5230", "#8fbf5a", "#cdbb52", "#e8d27a"],
    harvestLines: ["Sabi ni Nanay, huwag sasayangin ang bigas.", "Staple na staple."],
  },
  {
    id: "saging",
    name: "Saging",
    emoji: "🍌",
    growSeconds: 22,
    buyPrice: 7,
    sellPrice: 16,
    stageColors: ["#7a5230", "#6f9c4f", "#8fbf5a", "#e8d24a"],
    harvestLines: ["Banana cue time!", "Turon later, promise."],
  },
  {
    id: "ube",
    name: "Ube",
    emoji: "🟣",
    growSeconds: 32,
    buyPrice: 12,
    sellPrice: 30,
    stageColors: ["#7a5230", "#6f9c4f", "#7a4fa3", "#5c2d82"],
    harvestLines: ["Trending crop 'to, pangmayaman!", "Ube overload incoming."],
  },
  {
    id: "kangkong",
    name: "Kangkong",
    emoji: "🥬",
    growSeconds: 8,
    buyPrice: 2,
    sellPrice: 5,
    stageColors: ["#7a5230", "#6f9c4f", "#5aa14e", "#3f8a3f"],
    harvestLines: ["Ang bilis, parang batas sa Pilipinas — sunud-sunuran lang.", "Grow ka ulit agad, sipag mo!"],
  },
  {
    id: "mangga",
    name: "Mangga",
    emoji: "🥭",
    growSeconds: 40,
    buyPrice: 15,
    sellPrice: 38,
    stageColors: ["#7a5230", "#6f9c4f", "#8fbf5a", "#e8c23a"],
    harvestLines: ["Manggang hilaw + bagoong = the dream.", "Panahon na ng mangga, cha-ching!"],
  },
  {
    id: "damo",
    name: 'Damo ni Mang Kanor 🌿',
    emoji: "🌿",
    growSeconds: 25,
    buyPrice: 20,
    sellPrice: 45,
    stageColors: ["#7a5230", "#4a7c3a", "#2f5c2a", "#274a24"],
    harvestLines: [
      "Advanced ako mag-isip ngayon...",
      "Wisdom level: barangay elder.",
    ],
    buff: {
      label: "Advanced Ako Mag-isip",
      line: "*thought bubble intensifies* — mas mabilis ka maglakad for a bit!",
    },
    storeUnsafe: true,
    storeSafeAlt: {
      name: "Kalabasang Bawal",
      emoji: "🎃",
      harvestLines: [
        "Bawal daw 'to, pero ang sarap...ng usapan lang!",
        "Special squash, secret family recipe.",
      ],
    },
  },
];

/** Crops resolved for the active build target — the only export other modules should use. */
export const CROPS: CropDef[] = RAW_CROPS.map((crop) => {
  if (BUILD_TARGET === "store" && crop.storeUnsafe && crop.storeSafeAlt) {
    return {
      ...crop,
      name: crop.storeSafeAlt.name,
      emoji: crop.storeSafeAlt.emoji,
      harvestLines: crop.storeSafeAlt.harvestLines,
      // buff mechanic stays (it's just a gameplay effect), flavor line is genericized
      buff: crop.buff
        ? { label: "Malikhaing Ideya", line: "Parang may sumagi lang na magandang ideya!" }
        : undefined,
    };
  }
  return crop;
});

/** Crops actually wired into the MVP planting loop (see design brief §6). */
export const STARTER_CROP_IDS = ["kamatis", "talong", "kalabasa", "damo"];

export function getCrop(id: string): CropDef {
  const crop = CROPS.find((c) => c.id === id);
  if (!crop) throw new Error(`Unknown crop id: ${id}`);
  return crop;
}
