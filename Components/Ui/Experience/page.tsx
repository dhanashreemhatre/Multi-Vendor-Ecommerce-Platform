// components/Experience.tsx
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import Models from '../Laptop/page';

interface Light {
  position: [number, number, number];
  intensity: number;
  color: string;
}

interface RotatingGroupProps {
  lights: Light[];
}

const RotatingGroup: React.FC<RotatingGroupProps> = ({ lights }) => {
  const groupRef = useRef<THREE.Group>(null); // Type the ref as THREE.Group

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta; // Rotate the group
    }
  });

  return (
    <group scale={[700, 700, 700]} position={[0, -60, 0]} rotation={[0, Math.PI, 0]} ref={groupRef}>
      {lights.map((light, index) => (
        <directionalLight
          key={index}
          position={light.position}
          intensity={light.intensity}
          color={light.color}
        />
      ))}
      <Models />
    </group>
  );
};

interface ExperienceProps {
  lights: Light[];
}

const Experience: React.FC<ExperienceProps> = ({ lights }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 100], near: 0.1, far: 1000 }}
      style={{ height: '35vh', width: '100vw' }}
    >
      <RotatingGroup lights={lights} />
    </Canvas>
  );
};

export default Experience;
