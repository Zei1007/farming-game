import { forwardRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getMoveVector } from "../controls/inputState";
import { useGameStore } from "../state/useGameStore";
import { setCharacterPosition } from "./characterState";

const BASE_SPEED = 3.2; // units/sec
const BUFF_SPEED_MULT = 1.6;
const FARM_BOUND = 6.4;
const TURN_SPEED = 12; // higher = snappier turning

function shortestAngleLerp(from: number, to: number, t: number) {
  let diff = (to - from) % (Math.PI * 2);
  if (diff > Math.PI) diff -= Math.PI * 2;
  if (diff < -Math.PI) diff += Math.PI * 2;
  return from + diff * t;
}

/** Player character: salakot-hat farmer. Reads shared input state each frame. */
export const Character = forwardRef<THREE.Group>(function Character(_, ref) {
  useFrame((_state, delta) => {
    const group = (ref as MutableRefObject<THREE.Group | null> | null)
      ?.current;
    if (!group) return;

    const move = getMoveVector();
    const moving = move.x !== 0 || move.z !== 0;
    const hasBuff = useGameStore.getState().activeBuff !== null;
    const speed = BASE_SPEED * (hasBuff ? BUFF_SPEED_MULT : 1);

    if (moving) {
      group.position.x += move.x * speed * delta;
      group.position.z += move.z * speed * delta;
      group.position.x = THREE.MathUtils.clamp(
        group.position.x,
        -FARM_BOUND,
        FARM_BOUND
      );
      group.position.z = THREE.MathUtils.clamp(
        group.position.z,
        -FARM_BOUND,
        FARM_BOUND
      );
      const targetAngle = Math.atan2(move.x, move.z);
      group.rotation.y = shortestAngleLerp(
        group.rotation.y,
        targetAngle,
        Math.min(1, TURN_SPEED * delta)
      );
    }

    setCharacterPosition(group.position.x, group.position.z);
  });

  // Big-head, small-body proportions — Animal Crossing villager silhouette.
  return (
    <group ref={ref} position={[0, 0, 3]}>
      <mesh position={[0, 0.32, 0]} castShadow>
        <capsuleGeometry args={[0.2, 0.24, 4, 8]} />
        <meshStandardMaterial color="#4f8a5c" />
      </mesh>
      <mesh position={[0, 0.78, 0]} castShadow>
        <sphereGeometry args={[0.32, 20, 20]} />
        <meshStandardMaterial color="#f6cfa6" />
      </mesh>
      {/* salakot — traditional wide-brimmed Filipino farmer hat */}
      <mesh position={[0, 1.02, 0]} castShadow>
        <coneGeometry args={[0.44, 0.24, 16]} />
        <meshStandardMaterial color="#c9a15a" />
      </mesh>
      <mesh position={[0, 0.93, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.04, 16]} />
        <meshStandardMaterial color="#dcb772" />
      </mesh>
    </group>
  );
});
