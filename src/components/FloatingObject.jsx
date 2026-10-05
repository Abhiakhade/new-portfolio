import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const LOGOS = [
  {
    name: "React",
    slug: "react",
    x: 70,
    y: 22,
    size: 84,
    depth: 1.0,
    dur: 6.5,
    amp: -16,
  },
  {
    name: "Tailwind CSS",
    slug: "tailwindcss",
    x: 77,
    y: 46,
    size: 76,
    depth: 1.1,
    dur: 7.5,
    amp: 14,
  },
  {
    name: "TypeScript",
    slug: "typescript",
    x: 60,
    y: 52,
    size: 70,
    depth: 0.9,
    dur: 6,
    amp: -14,
  },
  {
    name: "Node.js",
    slug: "nodejs",
    x: 89,
    y: 36,
    size: 66,
    depth: 0.7,
    dur: 8,
    amp: 12,
  },
  {
    name: "Python",
    slug: "python",
    x: 84,
    y: 68,
    size: 64,
    depth: 0.6,
    dur: 7,
    amp: -12,
  },
  {
    name: "Docker",
    slug: "docker",
    x: 66,
    y: 79,
    size: 64,
    depth: 0.8,
    dur: 6.8,
    amp: 14,
  },
  {
    name: "JavaScript",
    slug: "javascript",
    x: 55,
    y: 24,
    size: 58,
    depth: 0.6,
    dur: 7.2,
    amp: 12,
  },
  {
    name: "MongoDB",
    slug: "mongodb",
    x: 93,
    y: 16,
    size: 54,
    depth: 0.5,
    dur: 8.5,
    amp: -10,
  },
  {
    name: "Git",
    slug: "git",
    x: 95,
    y: 56,
    size: 50,
    depth: 0.4,
    dur: 9,
    amp: 10,
  },
  {
    name: "PostgreSQL",
    slug: "postgresql",
    x: 88,
    y: 86,
    size: 56,
    depth: 0.5,
    dur: 7.8,
    amp: -12,
  },
  {
    name: "HTML5",
    slug: "html5",
    x: 64,
    y: 8,
    size: 50,
    depth: 0.5,
    dur: 8.2,
    amp: 10,
  },
  {
    name: "CSS3",
    slug: "css3",
    x: 81,
    y: 7,
    size: 48,
    depth: 0.4,
    dur: 9.2,
    amp: -10,
  },
  {
    name: "Java",
    slug: "java",
    x: 48,
    y: 82,
    size: 52,
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
    size: 50,
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
    size: 46,
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
    size: 44,
    depth: 0.3,
    dur: 10,
    amp: -8,
    desktop: true,
  },
];

const floatCSS = `@keyframes logoFloat{0%,100%{translate:0 0;rotate:0deg}50%{translate:0 var(--amp);rotate:var(--rot)}}
.logo-float{animation:logoFloat 7s ease-in-out infinite}
.logo-float:hover{animation-play-state:paused}
@media (prefers-reduced-motion: reduce){.logo-float{animation:none!important}}`;

function FloatingLogo({ logo, index, nx, ny }) {
  const { name, slug, x, y, size, depth, dur, amp, desktop } = logo;

  // 0 = floating, 1 = hovered (parallax eases to a stop)
  const hover = useMotionValue(0);
  const hoverSpring = useSpring(hover, { stiffness: 140, damping: 20 });

  const px = useTransform(
    [nx, hoverSpring],
    ([n, h]) => n * depth * 34 * (1 - h),
  );
  const py = useTransform(
    [ny, hoverSpring],
    ([n, h]) => n * depth * 34 * (1 - h),
  );

  return (
    <div
      className={`pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 ${
        desktop ? "hidden sm:block" : "opacity-40 sm:opacity-100"
      }`}
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <motion.div style={{ x: px, y: py }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 14,
            delay: 0.5 + index * 0.07,
          }}
        >
          <div
            className="logo-float group relative flex cursor-pointer items-center justify-center rounded-2xl border border-[#FFF7E3]/15 bg-[#FFF7E3]/[0.07] backdrop-blur-md transition-[box-shadow,border-color,background-color,transform] duration-300 hover:scale-110 hover:border-[#FFCB56]/70 hover:bg-[#FFCB56]/10 hover:shadow-[0_0_40px_rgba(255,203,86,0.35)]"
            style={{
              width: size,
              height: size,
              "--amp": `${amp}px`,
              "--rot": `${amp > 0 ? 3 : -3}deg`,
              animationDuration: `${dur}s`,
              animationDelay: `${-index * 0.9}s`,
            }}
            onMouseEnter={() => hover.set(1)}
            onMouseLeave={() => hover.set(0)}
          >
            <img
              src={`${DEVICON}/${slug}/${slug}-original.svg`}
              alt={name}
              draggable={false}
              className="h-1/2 w-1/2 select-none object-contain"
            />
            <span className="pointer-events-none absolute -bottom-8 whitespace-nowrap rounded-full bg-[#120E06]/90 px-3 py-1 text-xs text-[#FFE29A] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {name}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/**
 * Floating tech logos.
 * Drop <FloatingObject /> inside any `relative` section. It fills the section,
 * lets clicks/hover pass through the empty space, and reacts to the mouse.
 */
export default function FloatingObject({ logos = LOGOS }) {
  const wrapRef = useRef(null);

  // normalised mouse position (-1 … 1), smoothed
  const nxRaw = useMotionValue(0);
  const nyRaw = useMotionValue(0);
  const nx = useSpring(nxRaw, { stiffness: 60, damping: 20 });
  const ny = useSpring(nyRaw, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const onMove = (e) => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 2 - 1;
      const y = ((e.clientY - r.top) / r.height) * 2 - 1;
      nxRaw.set(Math.max(-1, Math.min(1, x)));
      nyRaw.set(Math.max(-1, Math.min(1, y)));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [nxRaw, nyRaw]);

  return (
    <div ref={wrapRef} className="pointer-events-none absolute inset-0 z-[5]">
      <style>{floatCSS}</style>
      {logos.map((logo, i) => (
        <FloatingLogo key={logo.slug} logo={logo} index={i} nx={nx} ny={ny} />
      ))}
    </div>
  );
}
