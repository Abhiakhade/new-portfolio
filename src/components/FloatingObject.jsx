import { useFrame } from "@react-three/fiber";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as THREE from "three";

/* =========================================================
   TECHNOLOGIES
========================================================= */

const TOOLS = [
  // Frontend
  "react",
  "javascript",
  "typescript",
  "html5",
  "css3",
  "nextjs",
  "vuejs",
  "angularjs",
  "redux",
  "tailwindcss",
  "bootstrap",

  // Backend
  "nodejs",
  "express",
  "java",
  "spring",
  "python",
  "fastapi",
  "go",
  "rust",

  // Database
  "mongodb",
  "mysql",
  "postgresql",
  "redis",
  "firebase",

  // DevOps
  "docker",
  "git",
  "github",
  "gitlab",
  "linux",
  "nginx",

  // Cloud
  "amazonwebservices",
  "googlecloud",
  "azure",

  // Tools
  "graphql",
  "postman",
  "figma",

  // AI
  "openai",
  "tensorflow",
];

/* =========================================================
   DEVICON CONFIG
========================================================= */

const DEVICON_BASE =
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

/*
 * Some Devicons use a different variant.
 */
const VARIANT_OVERRIDES = {
  rust: "plain",
  go: "original",
};

/*
 * Generates the Devicon URL.
 */
const getLogoUrl = (name) => {
  const variant =
    VARIANT_OVERRIDES[name] || "original";

  return `${DEVICON_BASE}/${name}/${name}-${variant}.svg`;
};

/* =========================================================
   SVG TEXTURE HOOK
========================================================= */

function useSvgTexture(
  url,
  size = 256
) {
  const [texture, setTexture] =
    useState(null);

  useEffect(() => {
    let disposed = false;
    let createdTexture = null;

    const image = new Image();

    image.crossOrigin = "anonymous";

    image.onload = () => {
      if (disposed) return;

      const canvas =
        document.createElement("canvas");

      canvas.width = size;
      canvas.height = size;

      const context =
        canvas.getContext("2d");

      if (!context) return;

      context.clearRect(
        0,
        0,
        size,
        size
      );

      /*
       * Preserve aspect ratio and leave
       * enough breathing room around the icon.
       */
      const scale =
        Math.min(
          size / image.width,
          size / image.height
        ) * 0.74;

      const width =
        image.width * scale;

      const height =
        image.height * scale;

      context.drawImage(
        image,
        (size - width) / 2,
        (size - height) / 2,
        width,
        height
      );

      createdTexture =
        new THREE.CanvasTexture(canvas);

      createdTexture.colorSpace =
        THREE.SRGBColorSpace;

      createdTexture.minFilter =
        THREE.LinearMipmapLinearFilter;

      createdTexture.magFilter =
        THREE.LinearFilter;

      createdTexture.anisotropy = 4;

      createdTexture.generateMipmaps =
        true;

      createdTexture.needsUpdate =
        true;

      setTexture(createdTexture);
    };

    image.onerror = () => {
      console.warn(
        `Failed to load technology logo: ${url}`
      );
    };

    image.src = url;

    return () => {
      disposed = true;

      if (createdTexture) {
        createdTexture.dispose();
      }
    };
  }, [url, size]);

  return texture;
}

/* =========================================================
   DETERMINISTIC RANDOM
========================================================= */

/*
 * Math.random() changes every time the component mounts.
 *
 * This small seeded function keeps the layout stable
 * between renders and page refreshes.
 */
function seededRandom(seed) {
  const value =
    Math.sin(seed * 12.9898) *
    43758.5453;

  return value -
    Math.floor(value);
}

/* =========================================================
   FLOATING LOGO
========================================================= */

function LogoMarker({
  name,
  index,
  total,
  bounds,
}) {
  const groupRef = useRef(null);
  const meshRef = useRef(null);

  const texture =
    useSvgTexture(getLogoUrl(name));

  /*
   * Generate all motion values once.
   */
  const motion = useMemo(() => {
    /*
     * Fibonacci sphere distribution.
     *
     * This creates a much more natural
     * 3D cloud than placing everything
     * around a flat circle.
     */
    const goldenAngle =
      Math.PI *
      (3 - Math.sqrt(5));

    const normalized =
      total <= 1
        ? 0
        : index / (total - 1);

    const y =
      1 -
      normalized * 2;

    const radius =
      Math.sqrt(
        Math.max(0, 1 - y * y)
      );

    const theta =
      goldenAngle * index;

    const x =
      Math.cos(theta) * radius;

    const z =
      Math.sin(theta) * radius;

    /*
     * Stable per-logo variation.
     */
    const randomA =
      seededRandom(index + 1);

    const randomB =
      seededRandom(index + 50);

    const randomC =
      seededRandom(index + 100);

    return {
      baseX:
        x *
        bounds *
        (0.72 + randomA * 0.2),

      baseY:
        y *
        bounds *
        0.62,

      baseZ:
        z *
        bounds *
        (0.72 + randomB * 0.2),

      speed:
        0.16 +
        randomA * 0.12,

      amplitude:
        0.25 +
        randomB * 0.55,

      phase:
        randomC *
        Math.PI *
        2,

      rotationSpeed:
        (randomA - 0.5) *
        0.08,

      scale:
        0.72 +
        randomB * 0.32,

      mouseStrength:
        0.08 +
        randomC * 0.08,
    };
  }, [
    index,
    total,
    bounds,
  ]);

  /* =======================================================
     ANIMATION
  ======================================================= */

  useFrame(
    ({
      clock,
      camera,
      mouse,
    }) => {
      if (!groupRef.current) {
        return;
      }

      const time =
        clock.elapsedTime;

      const t =
        time * motion.speed +
        motion.phase;

      /* ---------------------------------------------------
         Natural floating motion
      --------------------------------------------------- */

      const targetX =
        motion.baseX +
        Math.sin(t) *
          motion.amplitude *
          0.45;

      const targetY =
        motion.baseY +
        Math.sin(t * 1.17) *
          motion.amplitude;

      const targetZ =
        motion.baseZ +
        Math.cos(t * 0.82) *
          motion.amplitude *
          0.4;

      /* ---------------------------------------------------
         Mouse parallax
      --------------------------------------------------- */

      const parallaxX =
        mouse.x *
        motion.mouseStrength;

      const parallaxY =
        mouse.y *
        motion.mouseStrength;

      /* ---------------------------------------------------
         Smooth position
      --------------------------------------------------- */

      groupRef.current.position.x =
        THREE.MathUtils.lerp(
          groupRef.current.position.x,
          targetX + parallaxX,
          0.035
        );

      groupRef.current.position.y =
        THREE.MathUtils.lerp(
          groupRef.current.position.y,
          targetY + parallaxY,
          0.035
        );

      groupRef.current.position.z =
        THREE.MathUtils.lerp(
          groupRef.current.position.z,
          targetZ,
          0.035
        );

      /* ---------------------------------------------------
         Billboard
         
         Keep the logo facing the camera.
      --------------------------------------------------- */

      groupRef.current.quaternion.copy(
        camera.quaternion
      );

      /* ---------------------------------------------------
         Subtle rotation
      --------------------------------------------------- */

      if (meshRef.current) {
        meshRef.current.rotation.z =
          Math.sin(t * 0.55) *
          0.06 +
          time *
          motion.rotationSpeed;

        /*
         * Very subtle mouse tilt.
         */
        meshRef.current.rotation.x =
          mouse.y * 0.025;

        meshRef.current.rotation.y =
          mouse.x * 0.025;
      }

      /* ---------------------------------------------------
         Subtle scale breathing
      --------------------------------------------------- */

      const targetScale =
        motion.scale *
        (1 +
          Math.sin(t * 1.15) *
            0.018);

      const scale =
        THREE.MathUtils.lerp(
          groupRef.current.scale.x,
          targetScale,
          0.035
        );

      groupRef.current.scale.setScalar(
        scale
      );
    }
  );

  if (!texture) {
    return null;
  }

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <planeGeometry
          args={[1.65, 1.65]}
        />

        <meshBasicMaterial
          map={texture}
          transparent
          alphaTest={0.02}
          depthWrite={false}
          depthTest
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function FloatingObject({
  bounds = 6,
}) {
  const groupRef = useRef(null);

  /*
   * Slow movement of the entire technology cloud.
   */
  useFrame(({ clock, mouse }) => {
    if (!groupRef.current) {
      return;
    }

    const time =
      clock.elapsedTime;

    const targetRotationY =
      time * 0.018 +
      mouse.x * 0.035;

    const targetRotationX =
      mouse.y * 0.025;

    groupRef.current.rotation.y =
      THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotationY,
        1
      );

    groupRef.current.rotation.x =
      THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotationX,
        1
      );
  });

  return (
    <group ref={groupRef}>
      {TOOLS.map(
        (name, index) => (
          <LogoMarker
            key={name}
            name={name}
            index={index}
            total={TOOLS.length}
            bounds={bounds}
          />
        )
      )}
    </group>
  );
}