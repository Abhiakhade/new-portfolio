import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function FloatingObject() {
  const meshRef = useRef();

  useFrame(({ mouse }) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      mouse.x * 2,
      0.05,
    );

    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      -mouse.y * 2,
      0.05,
    );
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[3.5, 2]} />

      <meshStandardMaterial
        color="#6ac8d9"
        metalness={0.1}
        roughness={0.1}
        wireframe
      />
    </mesh>
  );
}
