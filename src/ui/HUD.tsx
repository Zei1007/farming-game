import { useGameStore } from "../state/useGameStore";

export function HUD() {
  const currency = useGameStore((s) => s.currency);
  const day = useGameStore((s) => s.day);
  const activeBuff = useGameStore((s) => s.activeBuff);

  return (
    <div className="hud-top">
      <div className="hud-pill">
        <span className="hud-pill-icon">₱</span>
        <span>{currency}</span>
      </div>
      <div className="hud-pill">
        <span className="hud-pill-icon">☀️</span>
        <span>Araw {day}</span>
      </div>
      {activeBuff && (
        <div className="hud-pill hud-buff">
          <span className="hud-pill-icon">🧠</span>
          <span>{activeBuff.label}</span>
        </div>
      )}
    </div>
  );
}
