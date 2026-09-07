import { useState } from "react";
import { HelpModal } from "./HelpModal";

/** Top-left "?" help button and top-right sound toggle — matches the
 * reference site's fixed corner icon buttons. Sound is a visual toggle
 * only for now; no audio system is wired up yet (see README). */
export function CornerButtons() {
  const [helpOpen, setHelpOpen] = useState(false);
  const [muted, setMuted] = useState(false);

  return (
    <>
      <button
        className="corner-btn corner-btn-help"
        onClick={() => setHelpOpen(true)}
        aria-label="Help"
      >
        ?
      </button>
      <button
        className="corner-btn corner-btn-sound"
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "Unmute" : "Mute"}
      >
        {muted ? "🔇" : "🔊"}
      </button>
      {helpOpen && <HelpModal onClose={() => setHelpOpen(false)} />}
    </>
  );
}
