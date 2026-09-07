import { getCrop } from "../data/crops";

/** Stylized low-poly crop representation — no textures needed, just shape + color per growth stage. */
export function CropPlant({
  cropId,
  stage,
}: {
  cropId: string;
  stage: number;
}) {
  const crop = getCrop(cropId);
  const color = crop.stageColors[Math.max(0, Math.min(3, stage))];

  if (stage <= 0) {
    return (
      <mesh position={[0, 0.04, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
    );
  }

  const height = 0.16 + stage * 0.16;

  return (
    <group>
      <mesh position={[0, height / 2, 0]} castShadow>
        <coneGeometry args={[height * 0.5, height, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {stage === 3 && (
        <mesh position={[0, height + 0.07, 0]}>
          <sphereGeometry args={[0.09, 8, 8]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
          />
        </mesh>
      )}
    </group>
  );
}
