import { useGameStore } from "../state/useGameStore";

export function ToastLayer() {
  const toasts = useGameStore((s) => s.toasts);

  return (
    <div className="toast-layer">
      {toasts.map((t) => (
        <div key={t.id} className="toast">
          {t.text}
        </div>
      ))}
    </div>
  );
}
