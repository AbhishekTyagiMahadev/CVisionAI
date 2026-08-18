import { Canvas } from '@react-three/fiber';
import { Float } from '@react-three/drei';

// Real paper tones so the pages actually read against the dark UI,
// instead of a dark shape lost against a dark background.
const PAGE_FRONT = '#F2EFE6';
const PAGE_MID = '#E4E0D2';
const PAGE_BACK = '#D6D2C2';
const LINE_COLOR = '#ff7a45';
const TEXT_COLOR = '#8a8776';
const TEXT_COLOR_STRONG = '#4a483d';

const textLines = [
  { y: 0.38, w: 0.9, strong: true },
  { y: 0.15, w: 0.7, strong: false },
  { y: -0.08, w: 0.85, strong: false },
  { y: -0.31, w: 0.6, strong: false },
  { y: -0.54, w: 0.78, strong: false },
];

function Pages() {
  const pageColors = [PAGE_FRONT, PAGE_MID, PAGE_BACK];

  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.8}>
      <group rotation={[0.3, -0.55, 0.06]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[i * 0.06, -i * 0.07, -i * 0.07]}>
            <boxGeometry args={[1.4, 1.8, 0.035]} />
            <meshStandardMaterial color={pageColors[i]} roughness={0.75} metalness={0} />
          </mesh>
        ))}

        {/* scan-line accent near the top of the front page */}
        <mesh position={[0, 0.66, 0.02]}>
          <boxGeometry args={[1.3, 0.04, 0.012]} />
          <meshStandardMaterial color={LINE_COLOR} emissive={LINE_COLOR} emissiveIntensity={2.2} toneMapped={false} />
        </mesh>

        {/* paragraph lines — dark ink on light paper */}
        {textLines.map((line, idx) => (
          <mesh key={idx} position={[-0.15 + (0.9 - line.w) / 2, line.y, 0.019]}>
            <boxGeometry args={[line.w, line.strong ? 0.065 : 0.045, 0.005]} />
            <meshStandardMaterial color={line.strong ? TEXT_COLOR_STRONG : TEXT_COLOR} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

// Decorative only — a slowly floating, rotating stack of "resume pages"
// with a glowing scan-line accent, echoing the app's scanner motif in 3D.
// Pages use real paper tones so they read clearly against the dark UI.
const FloatingDocument = () => {
  return (
    <div className="relative w-full h-full" aria-hidden="true">
      {/* soft stage glow so the object doesn't float in a flat void */}
      <div
        className="absolute inset-0 -z-10 rounded-full blur-3xl opacity-70"
        style={{ background: 'radial-gradient(circle, rgba(255,122,69,0.16), transparent 70%)' }}
      />
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 35 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[3, 4, 5]} intensity={1.6} />
        <directionalLight position={[-3, 1, 3]} intensity={0.6} />
        <pointLight position={[-2, -2, 2.5]} intensity={0.7} color="#ff7a45" />
        <Pages />
      </Canvas>
    </div>
  );
};

export default FloatingDocument;
