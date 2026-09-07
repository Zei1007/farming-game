import { STARTER_CROP_IDS, getCrop } from "../data/crops";
import { useGameStore } from "../state/useGameStore";

export function SeedBar() {
  const inventory = useGameStore((s) => s.inventory);
  const selectedCropId = useGameStore((s) => s.selectedCropId);
  const selectCrop = useGameStore((s) => s.selectCrop);
  const buySeed = useGameStore((s) => s.buySeed);

  return (
    <div className="seed-bar">
      {STARTER_CROP_IDS.map((id) => {
        const crop = getCrop(id);
        const owned = inventory[id] ?? 0;
        const selected = selectedCropId === id;
        return (
          <div
            key={id}
            className={`seed-slot${selected ? " seed-slot-selected" : ""}`}
          >
            <button
              className="seed-slot-main"
              onClick={() => selectCrop(id)}
              aria-label={`Piliin ang ${crop.name}`}
            >
              <span className="seed-emoji">{crop.emoji}</span>
              <span className="seed-count">{owned}</span>
            </button>
            <button
              className="seed-buy-btn"
              onClick={() => buySeed(id)}
              aria-label={`Bumili ng ${crop.name} — ₱${crop.buyPrice}`}
            >
              +₱{crop.buyPrice}
            </button>
          </div>
        );
      })}
    </div>
  );
}
