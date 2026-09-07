import type { ThreeEvent } from "@react-three/fiber";
import { useGameStore } from "../state/useGameStore";
import { NPCS } from "../data/dialogue";

const MANG_KANOR = NPCS[0];

/** Simple low-poly sari-sari store prop. Tap to greet Mang Kanor. */
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
    <group position={[-4.6, 0, -5.4]} onClick={onClick}>
      {/* base */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 1.2, 1.8]} />
        <meshStandardMaterial color="#e3c793" />
      </mesh>
      {/* roof */}
      <mesh position={[0, 1.35, 0]} castShadow>
        <coneGeometry args={[1.7, 0.7, 4]} />
        <meshStandardMaterial color="#b23b3b" />
      </mesh>
      {/* awning sign */}
      <mesh position={[0, 0.95, 1.0]}>
        <boxGeometry args={[1.8, 0.3, 0.06]} />
        <meshStandardMaterial color="#f2a33c" />
      </mesh>
    </group>
  );
}
