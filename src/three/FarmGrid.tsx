import type { ThreeEvent } from "@react-three/fiber";
import { useGameStore, tileStage } from "../state/useGameStore";
import { CropPlant } from "./CropPlant";

const TILE_SIZE = 1;
const GAP = 0.08;
const STEP = TILE_SIZE + GAP;

export function FarmGrid() {
  const tiles = useGameStore((s) => s.tiles);
  const now = useGameStore((s) => s.now);
  const plantTile = useGameStore((s) => s.plantTile);
  const harvestTile = useGameStore((s) => s.harvestTile);

  return (
    <group>
      {tiles.map((tile) => {
        const stage = tileStage(tile, now);
        const ready = stage === 3;

        const onClick = (e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation();
          if (!tile.cropId) {
            plantTile(tile.id);
          } else if (ready) {
            harvestTile(tile.id);
          }
        };

        return (
          <group key={tile.id} position={[tile.x * STEP, 0, tile.z * STEP]}>
            <mesh receiveShadow onClick={onClick}>
              <boxGeometry args={[TILE_SIZE, 0.12, TILE_SIZE]} />
              <meshStandardMaterial
                color={tile.cropId ? "#5b3a24" : "#7a5230"}
              />
            </mesh>
            {ready && (
              <mesh position={[0, 0.13, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.4, 0.47, 24]} />
                <meshBasicMaterial color="#ffe066" />
              </mesh>
            )}
            {tile.cropId && stage >= 0 && (
              <group position={[0, 0.06, 0]}>
                <CropPlant cropId={tile.cropId} stage={stage} />
              </group>
            )}
          </group>
        );
      })}
    </group>
  );
}
