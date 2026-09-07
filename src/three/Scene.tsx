import { useRef } from "react";
import * as THREE from "three";
import { OrthographicCamera } from "@react-three/drei";
import { Ground } from "./Ground";
import { FarmGrid } from "./FarmGrid";
import { Character } from "./Character";
import { CameraRig } from "./CameraRig";
import { SariSariStore } from "./SariSariStore";
import { GameClock } from "./GameClock";
import { Hedge } from "./Hedge";
import { Lantern } from "./Lantern";

// Hedge border positions — frames the farm the way the reference site's
// topiary blocks frame its garden scene.
const HEDGE_RING: [number, number, number][] = [
  [-7.5, 0.55, -7.5],
  [-6.2, 0.55, -7.5],
  [-4.9, 0.55, -7.5],
  [4.9, 0.55, -7.5],
  [6.2, 0.55, -7.5],
  [7.5, 0.55, -7.5],
  [-7.5, 0.55, 7.5],
  [-6.2, 0.55, 7.5],
  [7.5, 0.55, 7.5],
  [6.2, 0.55, 7.5],
  [-7.5, 0.55, -4.9],
  [-7.5, 0.55, 4.9],
  [7.5, 0.55, -4.9],
  [7.5, 0.55, 4.9],
];

const LANTERNS: [number, number, number][] = [
  [-2.6, 0, -5.6],
  [2.6, 0, -5.6],
];

export function Scene() {
  const characterRef = useRef<THREE.Group>(null);

  return (
    <>
      {/* Orthographic, fixed-angle isometric camera — the flat "diorama"
          look from the reference (no perspective distortion). CameraRig
          keeps it centered on the character as they roam. */}
      <OrthographicCamera makeDefault position={[6, 11, 6]} zoom={62} near={0.1} far={60} />

      <color attach="background" args={["#140b06"]} />
      <fog attach="fog" args={["#140b06", 16, 30]} />

      <ambientLight intensity={0.8} />
      <directionalLight
        position={[8, 12, 6]}
        intensity={1.15}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      <GameClock />
      <Ground />
      <FarmGrid />
      <SariSariStore />
      <Character ref={characterRef} />
      <CameraRig targetRef={characterRef} />

      {HEDGE_RING.map((pos, i) => (
        <Hedge key={i} position={pos} />
      ))}
      {LANTERNS.map((pos, i) => (
        <Lantern key={i} position={pos} />
      ))}
    </>
  );
}
