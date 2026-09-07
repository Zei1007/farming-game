/** Small warm-glow lantern post — dresses paths, matches the reference's lit lanterns. */
export function Lantern({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.06, 0.6, 8]} />
        <meshStandardMaterial color="#6b4826" />
      </mesh>
      <mesh position={[0, 0.66, 0]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial
          color="#f2c464"
          emissive="#f2c464"
          emissiveIntensity={0.9}
        />
      </mesh>
      <pointLight
        position={[0, 0.66, 0]}
        intensity={0.4}
        distance={2.5}
        color="#f2c464"
      />
    </group>
  );
}
