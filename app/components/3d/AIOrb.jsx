import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

const SIGNAL = '#ff7a45';

function Orb() {
  const wireRef = useRef(null);
  const coreRef = useRef(null);

  useFrame((state, delta) => {
    if (wireRef.current) {
      wireRef.current.rotation.y += delta * 0.6;
      wireRef.current.rotation.x += delta * 0.18;
    }
    if (coreRef.current) {
      const t = state.clock.getElapsedTime();
      coreRef.current.material.emissiveIntensity = 1.3 + Math.sin(t * 2.4) * 0.6;
    }
  });

  return (
    <group>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial color={SIGNAL} emissive={SIGNAL} emissiveIntensity={1.4} toneMapped={false} roughness={0.35} />
      </mesh>
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[0.85, 1]} />
        <meshBasicMaterial color={SIGNAL} wireframe transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

// Decorative "analyzing" indicator — a pulsing core inside a rotating
// wireframe shell, standing in for the CSS spinner during AI processing.
// Sizes to fill whatever container it's placed in — size it via the parent.
const AIOrb = () => {
  return (
    <div className="w-full h-full" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 3], fov: 40 }} gl={{ alpha: true, antialias: true }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[2, 2, 2]} intensity={1} />
        <Orb />
      </Canvas>
    </div>
  );
};

export default AIOrb;
