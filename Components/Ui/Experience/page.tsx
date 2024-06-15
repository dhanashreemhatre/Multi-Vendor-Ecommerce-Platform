// components/Experience.js
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import Models from '../Laptop/page';

const RotatingGroup = ({ lights }) => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta;
    }
  });

  return (
    <group scale={[200, 200, 200]} position={[0, 37, 0]} rotation={[0, Math.PI, 0]} ref={groupRef}>
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

const Experience = ({ lights }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 100], near: 0.1, far: 1000 }}
      style={{ height: '100vh', width: '100vw' }}
    >
      <RotatingGroup lights={lights} />
    </Canvas>
  );
};

export default Experience;
