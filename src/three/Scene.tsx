import { useRef } from "react";
import * as THREE from "three";
import { Ground } from "./Ground";
import { FarmGrid } from "./FarmGrid";
import { Character } from "./Character";
import { CameraRig } from "./CameraRig";
import { SariSariStore } from "./SariSariStore";
import { GameClock } from "./GameClock";

export function Scene() {
  const characterRef = useRef<THREE.Group>(null);

  return (
    <>
      <color attach="background" args={["#bfe8ff"]} />
      <fog attach="fog" args={["#bfe8ff", 18, 40]} />

      <ambientLight intensity={0.75} />
      <directionalLight
        position={[8, 12, 6]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      <GameClock />
      <Ground />
      <FarmGrid />
      <SariSariStore />
      <Character ref={characterRef} />
      <CameraRig targetRef={characterRef} />
    </>
  );
}
