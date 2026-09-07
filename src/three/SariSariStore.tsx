import type { ThreeEvent } from "@react-three/fiber";
import { useGameStore } from "../state/useGameStore";
import { NPCS } from "../data/dialogue";
import { InteractPrompt } from "./InteractPrompt";

const MANG_KANOR = NPCS[0];
const STORE_X = -4.6;
const STORE_Z = -5.4;

/** Simple low-poly sari-sari store prop. Tap (or walk up + tap) to greet Mang Kanor. */
export function SariSariStore() {
  const openDialogue = useGameStore((s) => s.openDialogue);

  const onClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const line =
      MANG_KANOR.greetingLines[
        Math.floor(Math.random() * MANG_KANOR.greetingLines.length)
      ];
    openDialogue(MANG_KANOR.id, line);
  };

  return (
    <group position={[STORE_X, 0, STORE_Z]} onClick={onClick}>
      {/* base */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 1.2, 1.8]} />
        <meshStandardMaterial color="#e3c793" />
      </mesh>
      {/* roof — terracotta tile, matches the reference palette */}
      <mesh position={[0, 1.35, 0]} castShadow>
        <coneGeometry args={[1.7, 0.7, 4]} />
        <meshStandardMaterial color="#c1573e" />
      </mesh>
      {/* awning */}
      <mesh position={[0, 0.95, 1.0]}>
        <boxGeometry args={[1.8, 0.3, 0.06]} />
        <meshStandardMaterial color="#f2a33c" />
      </mesh>
      {/* hanging shop sign */}
      <group position={[0, 1.6, 1.0]}>
        <mesh position={[-0.5, 0.15, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.3, 6]} />
          <meshStandardMaterial color="#6b4826" />
        </mesh>
        <mesh position={[0.5, 0.15, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.3, 6]} />
          <meshStandardMaterial color="#6b4826" />
        </mesh>
        <mesh>
          <boxGeometry args={[1.2, 0.32, 0.06]} />
          <meshStandardMaterial color="#8b6239" />
        </mesh>
      </group>
      <InteractPrompt worldX={STORE_X} worldZ={STORE_Z + 1.4} />
    </group>
  );
}
