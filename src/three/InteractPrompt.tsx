import { useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { distanceToCharacter } from "./characterState";

const NEAR_RADIUS = 3;

/**
 * Floating "E" chip that appears when the character is near a tappable
 * prop — mirrors the reference site's proximity interact prompt. Position
 * is relative to the parent group (place inside the prop you want it to
 * hover above, e.g. <SariSariStore>).
 */
export function InteractPrompt({
  worldX,
  worldZ,
  label = "E",
}: {
  worldX: number;
  worldZ: number;
  label?: string;
}) {
  const [near, setNear] = useState(false);

  useFrame(() => {
    const isNear = distanceToCharacter(worldX, worldZ) < NEAR_RADIUS;
    if (isNear !== near) setNear(isNear);
  });

  if (!near) return null;

  return (
    <Html center position={[0, 1.6, 0]} occlude={false}>
      <div className="interact-prompt">{label}</div>
    </Html>
  );
}
