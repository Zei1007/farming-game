import { useEffect } from "react";
import { initKeyboardControls } from "../controls/inputState";

/** Wires WASD / arrow keys into the shared input state. Desktop dev fallback. */
export function useKeyboardControls() {
  useEffect(() => initKeyboardControls(), []);
}
