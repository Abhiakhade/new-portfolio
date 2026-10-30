import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const LOGOS = [
  {
    name: "React",
    slug: "react",
    x: 82,
    y: 18,
    size: 76,
    depth: 1,
    dur: 6.5,
    amp: -14,
  },
  {
    name: "Tailwind CSS",
    slug: "tailwindcss",
    x: 88,
    y: 45,
    size: 68,
    depth: 1.1,
    dur: 7.5,
    amp: 12,
  },
  {
    name: "TypeScript",
    slug: "typescript",
    x: 65,
    y: 58,
    size: 62,
    depth: 0.9,
    dur: 6,
    amp: -12,
  },
  {
    name: "Node.js",
    slug: "nodejs",
    x: 93,
    y: 30,
    size: 62,
    depth: 0.7,
    dur: 8,
    amp: 12,
  },
  {
    name: "Python",
    slug: "python",
    x: 85,
    y: 75,
    size: 58,
    depth: 0.6,
    dur: 7,
    amp: -10,
  },
  {
    name: "Docker",
    slug: "docker",
    x: 70,
    y: 85,
    size: 58,
    depth: 0.8,
    dur: 6.8,
    amp: 12,
  },
  {
    name: "JavaScript",
    slug: "javascript",
    x: 58,
    y: 22,
    size: 54,
    depth: 0.6,
    dur: 7.2,
    amp: 10,
  },
  {
    name: "MongoDB",
    slug: "mongodb",
    x: 95,
    y: 12,
    size: 50,
    depth: 0.5,
    dur: 8.5,
    amp: -10,
  },
  {
    name: "Git",
    slug: "git",
    x: 96,
    y: 57,
    size: 48,
    depth: 0.4,
    dur: 9,
    amp: 10,
  },
  {
    name: "PostgreSQL",
    slug: "postgresql",
    x: 90,
    y: 89,
    size: 52,
    depth: 0.5,
    dur: 7.8,
    amp: -10,
  },
  {
    name: "HTML5",
    slug: "html5",
    x: 68,
    y: 8,
    size: 46,
    depth: 0.5,
    dur: 8.2,
    amp: 10,
  },
  {
    name: "CSS3",
    slug: "css3",
    x: 83,
    y: 7,
    size: 44,
    depth: 0.4,
    dur: 9.2,
    amp: -10,
  },
  {
    name: "Java",
    slug: "java",
    x: 48,
    y: 82,
    size: 48,
    depth: 0.4,
    dur: 8.6,
    amp: 12,
    desktop: true,
  },
  {
    name: "Figma",
    slug: "figma",
    x: 52,
    y: 44,
    size: 46,
    depth: 0.5,
    dur: 7.4,
    amp: -12,
    desktop: true,
  },
  {
    name: "Redis",
    slug: "redis",
    x: 73,
    y: 93,
    size: 42,
    depth: 0.4,
    dur: 9.5,
    amp: 10,
    desktop: true,
  },
  {
    name: "Firebase",
    slug: "firebase",
    x: 97,
    y: 36,
    size: 40,
    depth: 0.3,
    dur: 10,
    amp: -8,
    desktop: true,
  },
];

function FloatingLogo({ logo, index, nx, ny, reduceMotion }) {
  const { name, slug, x, y, size, depth, dur, amp, desktop } = logo;

  const hover = useMotionValue(0);

  const hoverSpring = useSpring(hover, {
    stiffness: 140,
    damping: 20,
  });

  const px = useTransform(
    [nx, hoverSpring],
    ([n, h]) => n * depth * 28 * (1 - h),
  );

  const py = useTransform(
    [ny, hoverSpring],
    ([n, h]) => n * depth * 28 * (1 - h),
  );

  return (
    <div
      className={`pointer-events-auto absolute hidden -translate-x-1/2 -translate-y-1/2 sm:block ${
        desktop ? "lg:block" : ""
      }`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
      }}
    >
      <motion.div style={{ x: px, y: py }}>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 14,
            delay: reduceMotion ? 0 : 0.4 + index * 0.06,
          }}
        >
          <motion.div
            animate={
              reduceMotion
                ? {}
                : {
                    y: [0, amp, 0],
                    rotate: [0, amp > 0 ? 3 : -3, 0],
                  }
            }
            transition={{
              duration: dur,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * -0.4,
            }}
            onHoverStart={() => hover.set(1)}
            onHoverEnd={() => hover.set(0)}
            className="group relative flex cursor-pointer items-center justify-center rounded-2xl border border-[#FFF7E3]/15 bg-[#FFF7E3]/[0.07] opacity-50 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#FFCB56]/70 hover:bg-[#FFCB56]/10 hover:opacity-100 hover:shadow-[0_0_35px_rgba(255,203,86,0.3)] sm:opacity-60 lg:opacity-100"
            style={{
              width: `clamp(${size * 0.65}px, ${size}px, ${size}px)`,
              height: `clamp(${size * 0.65}px, ${size}px, ${size}px)`,
            }}
          >
            <img
              src={`${DEVICON}/${slug}/${slug}-original.svg`}
              alt={name}
              draggable="false"
              loading="lazy"
              className="h-1/2 w-1/2 select-none object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />

            <span className="pointer-events-none absolute -bottom-8 hidden whitespace-nowrap rounded-full bg-[#120E06]/90 px-3 py-1 text-xs text-[#FFE29A] opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:block">
              {name}
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function FloatingObject({ logos = LOGOS }) {
  const wrapRef = useRef(null);

  const reduceMotion = useReducedMotion();

  const nxRaw = useMotionValue(0);
  const nyRaw = useMotionValue(0);

  const nx = useSpring(nxRaw, {
    stiffness: 60,
    damping: 20,
  });

  const ny = useSpring(nyRaw, {
    stiffness: 60,
    damping: 20,
  });

  useEffect(() => {
    if (reduceMotion) return;

    const onMove = (e) => {
      if (e.pointerType === "touch") return;

      const el = wrapRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();

      if (!rect.width || !rect.height) return;

      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      nxRaw.set(Math.max(-1, Math.min(1, x)));
      nyRaw.set(Math.max(-1, Math.min(1, y)));
    };

    const onLeave = () => {
      nxRaw.set(0);
      nyRaw.set(0);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerout", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onLeave);
    };
  }, [nxRaw, nyRaw, reduceMotion]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[5] hidden overflow-hidden sm:block"
    >
      {logos.map((logo, index) => (
        <FloatingLogo
          key={logo.slug}
          logo={logo}
          index={index}
          nx={nx}
          ny={ny}
          reduceMotion={reduceMotion}
        />
      ))}
    </div>
  );
}
