import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { setJoystickActive, setJoystickVector } from "../controls/inputState";

const BASE_RADIUS = 46; // px
const KNOB_RADIUS = 22; // px

/**
 * On-screen thumbstick for mobile. Renders bottom-left, fixed position.
 * Desktop players can ignore it and use WASD instead.
 */
export function VirtualJoystick() {
  const baseRef = useRef<HTMLDivElement>(null);
  const [knob, setKnob] = useState({ x: 0, z: 0 });
  const pointerId = useRef<number | null>(null);

  const updateFromEvent = (clientX: number, clientY: number) => {
    const base = baseRef.current;
    if (!base) return;
    const rect = base.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    let dx = (clientX - cx) / BASE_RADIUS;
    let dz = (clientY - cy) / BASE_RADIUS;
    const len = Math.hypot(dx, dz);
    if (len > 1) {
      dx /= len;
      dz /= len;
    }
    setKnob({ x: dx, z: dz });
    setJoystickVector(dx, dz);
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    (e.target as Element).setPointerCapture(e.pointerId);
    pointerId.current = e.pointerId;
    setJoystickActive(true);
    updateFromEvent(e.clientX, e.clientY);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerId.current !== e.pointerId) return;
    updateFromEvent(e.clientX, e.clientY);
  };

  const endTouch = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerId.current !== e.pointerId) return;
    pointerId.current = null;
    setJoystickActive(false);
    setKnob({ x: 0, z: 0 });
  };

  return (
    <div
      ref={baseRef}
      className="joystick-base"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endTouch}
      onPointerCancel={endTouch}
      style={{ touchAction: "none" }}
    >
      <div
        className="joystick-knob"
        style={{
          transform: `translate(${knob.x * (BASE_RADIUS - KNOB_RADIUS)}px, ${
            knob.z * (BASE_RADIUS - KNOB_RADIUS)
          }px)`,
        }}
      />
    </div>
  );
}
