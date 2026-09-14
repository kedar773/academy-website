import { Canvas, useThree } from '@react-three/fiber';
import { useState, useEffect } from 'react';
import ChemistryObject from './ChemistryObject';
import MathsObject from './MathsObject';
import PhysicsObject from './PhysicsObject';
import { usePortalTheme } from '../../theme/ThemeContext';

const SUBJECT_SLOTS = [
  { id: 'chemistry', Component: ChemistryObject },
  { id: 'maths', Component: MathsObject },
  { id: 'physics', Component: PhysicsObject },
];

function getSpacing(width) {
  if (width < 4) return 1.4;   // small mobile
  if (width < 6) return 1.8;   // large mobile / small tablet
  return 2.4;                  // desktop
}

function SceneContent() {
  const { enterSubject, setPreviewSubject } = usePortalTheme();
  const [hoveredId, setHoveredId] = useState(null);
  const { viewport } = useThree();
  const spacing = getSpacing(viewport.width);
  const positions = [-spacing, 0, spacing];

  // Clean up cursor on unmount
  useEffect(() => {
    return () => { document.body.style.cursor = 'auto'; };
  }, []);

  return (
    <>
      <ambientLight intensity={0.6} />
      {SUBJECT_SLOTS.map(({ id, Component }, index) => (
        <group
          key={id}
          position={[positions[index], 0, 0]}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHoveredId(id);
            setPreviewSubject(id);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            setHoveredId((cur) => (cur === id ? null : cur));
            setPreviewSubject((cur) => (cur === id ? null : cur));
            document.body.style.cursor = 'auto';
          }}
          onClick={(e) => {
            e.stopPropagation();
            enterSubject(id);
          }}
        >
          <Component hovered={hoveredId === id} />
        </group>
      ))}
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="hero-scene" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.5]}>
        <SceneContent />
      </Canvas>
    </div>
  );
}
