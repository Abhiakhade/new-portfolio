import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, useTexture } from "@react-three/drei";

function FloatingCharacter() {
  const meshRef = useRef(null);
  const texture = useTexture("/spiderman.png");

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;

    meshRef.current.rotation.y = Math.sin(time * 0.6) * 0.08;
    meshRef.current.rotation.x = Math.sin(time * 0.4) * 0.025;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={2.8}>
        <planeGeometry args={[2.4, 1.2]} />

        <meshBasicMaterial
          map={texture}
          transparent
          alphaTest={0.01}
          side={2}
        />
      </mesh>
    </Float>
  );
}

function CanvasLoader() {
  return null;
}

export default function HeroCanvas() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-0 top-1/2 z-[3] hidden h-[360px] w-[360px] -translate-y-1/2 lg:block xl:h-[480px] xl:w-[480px] 2xl:right-10 2xl:h-[520px] 2xl:w-[520px]"
    >
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 40,
        }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
        }}
      >
        <ambientLight intensity={2} />

        <Suspense fallback={<CanvasLoader />}>
          <FloatingCharacter />
        </Suspense>
      </Canvas>
    </div>
  );
}
