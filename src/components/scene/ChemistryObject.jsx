import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const _targetScale = new THREE.Vector3();

// A simple molecule: a central atom with 4 bonded atoms, rendered as
// wireframe spheres + glowing bond lines to read "cyberpunk circuitry".
export default function ChemistryObject({ hovered }) {
  const group = useRef();

  const bondPositions = useMemo(
    () => [
      [0.9, 0.6, 0],
      [-0.9, 0.6, 0.3],
      [0, -0.7, 0.8],
      [0.2, -0.5, -0.9],
    ],
    []
  );

  useFrame((state, delta) => {
    if (!group.current) return;
    const targetSpeed = hovered ? 0.6 : 0.18;
    group.current.rotation.y += delta * targetSpeed;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    _targetScale.setScalar(hovered ? 1.12 : 1);
    group.current.scale.lerp(_targetScale, 0.08);
  });

  const glowColor = '#00F0FF';
  const coreColor = hovered ? '#FF2E63' : '#00F0FF';

  return (
    <group ref={group}>
      {/* central atom */}
      <mesh>
        <icosahedronGeometry args={[0.45, 1]} />
        <meshBasicMaterial color={coreColor} wireframe />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.46, 1]} />
        <meshBasicMaterial color={glowColor} wireframe transparent opacity={0.25} />
      </mesh>

      {/* outer atoms + bonds */}
      {bondPositions.map((pos, i) => (
        <group key={i}>
          <mesh position={pos}>
            <icosahedronGeometry args={[0.18, 0]} />
            <meshBasicMaterial color={glowColor} wireframe />
          </mesh>
          <Bond from={[0, 0, 0]} to={pos} color={glowColor} />
        </group>
      ))}
    </group>
  );
}

function Bond({ from, to, color }) {
  const geometry = useMemo(() => {
    const points = [new THREE.Vector3(...from), new THREE.Vector3(...to)];
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [from, to]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={0.6} />
    </line>
  );
}
