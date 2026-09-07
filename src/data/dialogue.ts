export interface NpcDef {
  id: string;
  name: string;
  role: string;
  greetingLines: string[];
}

export const NPCS: NpcDef[] = [
  {
    id: "mang-kanor",
    name: "Mang Kanor",
    role: "Sari-Sari Store",
    greetingLines: [
      "Uy! Bagong ani? Advanced ako mag-isip kanina, gutom ako.",
      "Tingi lang? Kahit isang seed, bili ka!",
      "Bawal ang tamad dito, ha. Charot lang, mag-harvest ka na.",
    ],
  },
  {
    id: "aling-nena",
    name: "Aling Nena",
    role: "Palengke Stall",
    greetingLines: [
      "Ay ang sariwa naman ng ani mo, sana all magtanim.",
      "Wais ka talaga sa negosyo, ah!",
      "May tsismis ako pero bawal sabihin. Charot, wala namang tsismis.",
    ],
  },
  {
    id: "kapitan",
    name: "Kapitan",
    role: "Barangay Captain",
    greetingLines: [
      "Mag-ingat ka sa bukid, mamimitas! Basta't legal, go lang.",
      "Petmalu itong ani mo this season, ha!",
      "May proyekto ako para sa'yo... balikbayan box galing sa kapitbahay.",
    ],
  },
];

/** Rotating loading-screen / idle tips — Pinoy-internet-meme flavored. */
export const LOADING_TIPS = [
  "Advanced ako mag-isip...",
  "Sabi ni Nanay, magtanim ka ng marunggay.",
  "Bawal ang tamad dito.",
  "Sana all magtanim ng kalabasa.",
  "Charot lang, mag-water ka na ng halaman mo.",
  "Wais mode: on.",
];
