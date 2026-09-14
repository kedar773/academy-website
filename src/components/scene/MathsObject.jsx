import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const _targetScale = new THREE.Vector3();

// A geometric solid (icosahedron) rendered as chalky white-on-dark strokes,
// evoking a hand-sketched diagram on a blackboard/whiteboard.
export default function MathsObject({ hovered }) {
  const group = useRef();

  useFrame((state, delta) => {
    if (!group.current) return;
    const targetSpeed = hovered ? 0.45 : 0.12;
    group.current.rotation.y += delta * targetSpeed;
    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    _targetScale.setScalar(hovered ? 1.12 : 1);
    group.current.scale.lerp(_targetScale, 0.08);
  });

  const strokeColor = hovered ? '#D8232A' : '#2E5EAA';

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[0.7, 0]} />
        <meshBasicMaterial color={strokeColor} wireframe />
      </mesh>
      {/* faint fill so it doesn't look like a wire skeleton floating in void */}
      <mesh>
        <icosahedronGeometry args={[0.68, 0]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.04} />
      </mesh>
    </group>
  );
}
