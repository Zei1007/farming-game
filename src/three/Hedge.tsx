import { RoundedBox } from "@react-three/drei";

/** Trimmed hedge block — soft rounded edges, sage green, matches the reference's topiary border. */
export function Hedge({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  return (
    <RoundedBox
      args={[1.1 * scale, 1.1 * scale, 1.1 * scale]}
      radius={0.18}
      smoothness={2}
      position={position}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial color="#5f7a45" />
    </RoundedBox>
  );
}
