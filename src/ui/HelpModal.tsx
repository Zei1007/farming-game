import { useState } from "react";

type TabId = "controls" | "crops" | "about";

const TABS: { id: TabId; label: string }[] = [
  { id: "controls", label: "Controls" },
  { id: "crops", label: "Crops" },
  { id: "about", label: "About" },
];

export function HelpModal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<TabId>("controls");

  return (
    <div className="help-overlay" onClick={onClose}>
      <div className="help-modal" onClick={(e) => e.stopPropagation()}>
        <button className="help-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="help-tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`help-tab${tab === t.id ? " help-tab-active" : ""}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="help-card">
          {tab === "controls" && (
            <>
              <h3>Getting around</h3>
              <p>
                Desktop: WASD or the arrow keys to move. Mobile: drag the
                joystick in the bottom-left corner.
              </p>
              <h3>Farming</h3>
              <p>
                Tap an empty soil tile to plant your selected seed. A
                glowing yellow ring means it's ready — tap it to harvest.
                Tap the sari-sari store to chat with Mang Kanor.
              </p>
            </>
          )}
          {tab === "crops" && (
            <>
              <h3>Kamatis, Talong, Kalabasa</h3>
              <p>
                Your starter crops. Cheap, quick to grow, sell for a modest
                profit — good for building up capital early.
              </p>
              <h3>Damo ni Mang Kanor 🌿</h3>
              <p>
                The special crop. Harvesting it grants a temporary
                "Advanced Ako Mag-isip" speed buff — you'll move faster for
                a few seconds.
              </p>
            </>
          )}
          {tab === "about" && (
            <>
              <h3>Bahay Kubo Rush</h3>
              <p>
                An Animal Crossing-style farming prototype with Filipino
                meme flavor, built with React Three Fiber.
              </p>
              <h3>Status</h3>
              <p>
                Early prototype — more crops, NPCs, and areas are on the
                way.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
