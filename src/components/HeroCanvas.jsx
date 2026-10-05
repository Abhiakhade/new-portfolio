import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, useTexture } from "@react-three/drei";

function FloatingCharacter() {
  const meshRef = useRef(null);
  const texture = useTexture("/spiderman.png");

  useFrame((state) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.08;

    meshRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.4) * 0.025;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={2.8}>
        <planeGeometry args={[2.4, 1.2]} />

        <meshBasicMaterial map={texture} transparent alphaTest={0.01} />
      </mesh>
    </Float>
  );
}

export default function HeroCanvas() {
  return (
    <div className="pointer-events-none absolute right-0 top-1/2 z-20 h-[500px] w-[500px] -translate-y-1/2">
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 40,
        }}
        dpr={[1, 2]}
        gl={{
          alpha: true,
          antialias: true,
        }}
      >
        <ambientLight intensity={2} />

        <Suspense fallback={null}>
          <FloatingCharacter />
        </Suspense>
      </Canvas>
    </div>
  );
}
