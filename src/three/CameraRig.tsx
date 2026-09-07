import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { RefObject } from "react";

const OFFSET = new THREE.Vector3(6, 11, 6);
const _desired = new THREE.Vector3();
const _lookAt = new THREE.Vector3();

/** Animal Crossing-style trailing camera: fixed angle, follows the character with damping. */
export function CameraRig({
  targetRef,
}: {
  targetRef: RefObject<THREE.Group>;
}) {
  const { camera } = useThree();

  useFrame((_, delta) => {
    const target = targetRef.current;
    if (!target) return;
    _desired.copy(target.position).add(OFFSET);
    const damping = 1 - Math.pow(0.001, delta);
    camera.position.lerp(_desired, damping);
    _lookAt.set(target.position.x, target.position.y + 0.6, target.position.z);
    camera.lookAt(_lookAt);
  });

  return null;
}
