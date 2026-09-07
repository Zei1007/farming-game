import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./three/Scene";
import { HUD } from "./ui/HUD";
import { SeedBar } from "./ui/SeedBar";
import { DialogueBox } from "./ui/DialogueBox";
import { ToastLayer } from "./ui/ToastLayer";
import { VirtualJoystick } from "./ui/VirtualJoystick";
import { useKeyboardControls } from "./hooks/useKeyboardControls";
import { useGameStore } from "./state/useGameStore";
import "./App.css";

const DAY_LENGTH_MS = 120_000; // 2 real minutes per in-game day (prototype pacing)

export default function App() {
  useKeyboardControls();

  useEffect(() => {
    const id = setInterval(() => {
      useGameStore.setState((s) => ({ day: s.day + 1 }));
    }, DAY_LENGTH_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="app-root">
      <Canvas shadows camera={{ position: [6, 8, 9], fov: 42 }}>
        <Scene />
      </Canvas>

      <HUD />
      <SeedBar />
      <VirtualJoystick />
      <DialogueBox />
      <ToastLayer />

      <div className="hint-text">
        Tap an empty tile to plant · glowing tile = ready to harvest · tap the
        store to chat
      </div>
    </div>
  );
}
