import { Canvas } from '@react-three/fiber';
import SmartCaseScene from './SmartCaseScene';

export default function SmartCaseCanvas({ scrollRoot }) {
  return (
    <Canvas
      className="smart-case-canvas"
      camera={{ position: [0, 0.6, 7.2], fov: 34, near: 0.1, far: 100 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.setClearColor('#000000', 0);
      }}
    >
      <SmartCaseScene scrollRoot={scrollRoot} />
    </Canvas>
  );
}
