import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGameStore } from "../state/useGameStore";

const TICK_INTERVAL = 0.25; // seconds — throttled so growth updates don't re-render every frame

/** Drives crop-growth time. Renders nothing; lives inside <Canvas>. */
export function GameClock() {
  const acc = useRef(0);
  useFrame((_, delta) => {
    acc.current += delta;
    if (acc.current >= TICK_INTERVAL) {
      acc.current = 0;
      useGameStore.getState().tick(Date.now());
    }
  });
  return null;
}
