import { useGameStore } from "../state/useGameStore";
import { NPCS } from "../data/dialogue";

export function DialogueBox() {
  const dialogue = useGameStore((s) => s.dialogue);
  const closeDialogue = useGameStore((s) => s.closeDialogue);

  if (!dialogue) return null;
  const npc = NPCS.find((n) => n.id === dialogue.npcId);

  return (
    <div className="dialogue-overlay" onClick={closeDialogue}>
      <div className="dialogue-box" onClick={(e) => e.stopPropagation()}>
        <button
          className="dialogue-close"
          onClick={closeDialogue}
          aria-label="Close"
        >
          ✕
        </button>
        <div className="dialogue-name">
          {npc?.name ?? "???"}
          <span className="dialogue-role"> · {npc?.role}</span>
        </div>
        <div className="dialogue-line">{dialogue.line}</div>
        <div className="dialogue-continue">▼</div>
      </div>
    </div>
  );
}
