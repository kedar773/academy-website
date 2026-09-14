import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const _targetScale = new THREE.Vector3();

// A simple orbiting-spheres system (evokes a solar-system / pendulum
// diagram) rendered as thin ink-line strokes, evoking a notebook sketch.
export default function PhysicsObject({ hovered }) {
  const group = useRef();
  const orbiterA = useRef();
  const orbiterB = useRef();

  useFrame((state, delta) => {
    if (!group.current) return;
    const speedMul = hovered ? 2.2 : 1;
    const t = state.clock.elapsedTime * speedMul;

    if (orbiterA.current) {
      orbiterA.current.position.set(Math.cos(t * 0.8) * 0.9, Math.sin(t * 0.8) * 0.9, 0);
    }
    if (orbiterB.current) {
      orbiterB.current.position.set(
        Math.cos(t * 1.3 + 2) * 0.55,
        0,
        Math.sin(t * 1.3 + 2) * 0.55
      );
    }
    group.current.rotation.y += delta * (hovered ? 0.3 : 0.1);
    _targetScale.setScalar(hovered ? 1.12 : 1);
    group.current.scale.lerp(_targetScale, 0.08);
  });

  const inkColor = hovered ? '#5B3A29' : '#1E4620';

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[0.28, 12, 12]} />
        <meshBasicMaterial color={inkColor} wireframe />
      </mesh>
      <mesh ref={orbiterA}>
        <sphereGeometry args={[0.14, 10, 10]} />
        <meshBasicMaterial color={inkColor} wireframe />
      </mesh>
      <mesh ref={orbiterB}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial color={inkColor} wireframe />
      </mesh>
      {/* faint orbit rings for context */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.88, 0.9, 48]} />
        <meshBasicMaterial color={inkColor} transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
