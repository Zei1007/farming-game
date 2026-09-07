import { create } from "zustand";
import { CROPS, STARTER_CROP_IDS, getCrop } from "../data/crops";

export const GRID_SIZE = 5; // 5x5 farm plot for the prototype

export interface Tile {
  id: string;
  x: number;
  z: number;
  cropId: string | null;
  plantedAt: number | null; // ms timestamp, null = empty
}

export interface ActiveBuff {
  label: string;
  expiresAt: number; // ms timestamp
}

export interface DialogueState {
  npcId: string;
  line: string;
}

export interface ToastMsg {
  id: number;
  text: string;
}

interface GameState {
  now: number;
  currency: number;
  day: number;
  inventory: Record<string, number>;
  selectedCropId: string;
  tiles: Tile[];
  activeBuff: ActiveBuff | null;
  dialogue: DialogueState | null;
  toasts: ToastMsg[];

  tick: (nowMs: number) => void;
  selectCrop: (cropId: string) => void;
  buySeed: (cropId: string) => void;
  plantTile: (tileId: string) => void;
  harvestTile: (tileId: string) => void;
  openDialogue: (npcId: string, line: string) => void;
  closeDialogue: () => void;
  pushToast: (text: string) => void;
}

function makeTiles(): Tile[] {
  const tiles: Tile[] = [];
  const offset = (GRID_SIZE - 1) / 2;
  for (let x = 0; x < GRID_SIZE; x++) {
    for (let z = 0; z < GRID_SIZE; z++) {
      tiles.push({
        id: `${x}-${z}`,
        x: x - offset,
        z: z - offset,
        cropId: null,
        plantedAt: null,
      });
    }
  }
  return tiles;
}

/** 0 = just planted, 1 = sprout, 2 = growing, 3 = ready to harvest. */
export function tileStage(tile: Tile, now: number): number {
  if (!tile.cropId || tile.plantedAt === null) return -1;
  const crop = getCrop(tile.cropId);
  const elapsedSec = (now - tile.plantedAt) / 1000;
  const pct = Math.min(1, elapsedSec / crop.growSeconds);
  if (pct >= 1) return 3;
  if (pct >= 0.66) return 2;
  if (pct >= 0.33) return 1;
  return 0;
}

let toastId = 0;

export const useGameStore = create<GameState>((set, get) => ({
  now: Date.now(),
  currency: 60,
  day: 1,
  inventory: Object.fromEntries(STARTER_CROP_IDS.map((id) => [id, 3])),
  selectedCropId: STARTER_CROP_IDS[0],
  tiles: makeTiles(),
  activeBuff: null,
  dialogue: null,
  toasts: [],

  tick: (nowMs) => {
    const { activeBuff } = get();
    set({ now: nowMs });
    if (activeBuff && nowMs > activeBuff.expiresAt) {
      set({ activeBuff: null });
    }
  },

  selectCrop: (cropId) => set({ selectedCropId: cropId }),

  buySeed: (cropId) => {
    const crop = getCrop(cropId);
    const { currency } = get();
    if (currency < crop.buyPrice) {
      get().pushToast("Kulang ang pera mo!");
      return;
    }
    set((s) => ({
      currency: s.currency - crop.buyPrice,
      inventory: { ...s.inventory, [cropId]: (s.inventory[cropId] ?? 0) + 1 },
    }));
  },

  plantTile: (tileId) => {
    const { tiles, selectedCropId, inventory, now } = get();
    const tile = tiles.find((t) => t.id === tileId);
    if (!tile || tile.cropId) return;
    const owned = inventory[selectedCropId] ?? 0;
    if (owned <= 0) {
      get().pushToast("Wala ka nang binhi nito — bumili ka muna!");
      return;
    }
    set({
      tiles: tiles.map((t) =>
        t.id === tileId ? { ...t, cropId: selectedCropId, plantedAt: now } : t
      ),
      inventory: { ...inventory, [selectedCropId]: owned - 1 },
    });
  },

  harvestTile: (tileId) => {
    const { tiles, now } = get();
    const tile = tiles.find((t) => t.id === tileId);
    if (!tile || !tile.cropId) return;
    if (tileStage(tile, now) < 3) return;

    const crop = getCrop(tile.cropId);
    const line =
      crop.harvestLines[Math.floor(Math.random() * crop.harvestLines.length)];

    set((s) => ({
      currency: s.currency + crop.sellPrice,
      tiles: s.tiles.map((t) =>
        t.id === tileId ? { ...t, cropId: null, plantedAt: null } : t
      ),
      activeBuff: crop.buff
        ? { label: crop.buff.label, expiresAt: now + 10_000 }
        : s.activeBuff,
    }));

    get().pushToast(`+₱${crop.sellPrice} — ${line}`);
    if (crop.buff) get().pushToast(crop.buff.line);
  },

  openDialogue: (npcId, line) => set({ dialogue: { npcId, line } }),
  closeDialogue: () => set({ dialogue: null }),

  pushToast: (text) => {
    const id = ++toastId;
    set((s) => ({ toasts: [...s.toasts, { id, text }] }));
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, 3200);
  },
}));

export const ALL_CROPS = CROPS;
