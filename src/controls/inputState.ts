/**
 * Mutable, non-React input state.
 *
 * We deliberately keep this OUTSIDE React/zustand state: the character
 * controller reads it every frame inside useFrame, and funneling per-frame
 * updates through React state would cause a re-render per frame. Movement
 * doesn't need to be reactive — only read.
 */
export interface Vec2 {
  x: number;
  z: number;
}

const keyboard: Vec2 = { x: 0, z: 0 };
const joystick: Vec2 = { x: 0, z: 0 };
let joystickActive = false;

const KEY_MAP: Record<string, [keyof Vec2, number]> = {
  KeyW: ["z", -1],
  ArrowUp: ["z", -1],
  KeyS: ["z", 1],
  ArrowDown: ["z", 1],
  KeyA: ["x", -1],
  ArrowLeft: ["x", -1],
  KeyD: ["x", 1],
  ArrowRight: ["x", 1],
};

const heldKeys = new Set<string>();

function recomputeKeyboardVector() {
  let x = 0;
  let z = 0;
  for (const code of heldKeys) {
    const mapping = KEY_MAP[code];
    if (!mapping) continue;
    const [axis, dir] = mapping;
    if (axis === "x") x += dir;
    else z += dir;
  }
  const len = Math.hypot(x, z);
  keyboard.x = len > 0 ? x / len : 0;
  keyboard.z = len > 0 ? z / len : 0;
}

export function initKeyboardControls(): () => void {
  const onKeyDown = (e: KeyboardEvent) => {
    if (!(e.code in KEY_MAP)) return;
    heldKeys.add(e.code);
    recomputeKeyboardVector();
  };
  const onKeyUp = (e: KeyboardEvent) => {
    heldKeys.delete(e.code);
    recomputeKeyboardVector();
  };
  const onBlur = () => {
    heldKeys.clear();
    recomputeKeyboardVector();
  };
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  window.addEventListener("blur", onBlur);
  return () => {
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("keyup", onKeyUp);
    window.removeEventListener("blur", onBlur);
  };
}

export function setJoystickVector(x: number, z: number) {
  joystick.x = x;
  joystick.z = z;
}

export function setJoystickActive(active: boolean) {
  joystickActive = active;
  if (!active) {
    joystick.x = 0;
    joystick.z = 0;
  }
}

/** Returns a shared vector (do not mutate) with x/z each in [-1, 1]. */
export function getMoveVector(): Vec2 {
  return joystickActive ? joystick : keyboard;
}
