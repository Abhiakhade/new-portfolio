import { Canvas } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import FloatingObject from "./FloatingObject";

export default function HeroCanvas() {
  return (
    <Canvas camera={{ position: [1, 0, 8] }}>
      <ambientLight intensity={2} />

      <directionalLight position={[2, 1, 2]} intensity={3} />

      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <FloatingObject />
      </Float>

      <Environment preset="city" />
    </Canvas>
  );
}
