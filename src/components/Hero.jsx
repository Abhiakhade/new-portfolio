import { motion, useMotionValue, useSpring } from "framer-motion";
import { Mail, ArrowDown } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useRef } from "react";
import FloatingObject from "./FloatingObject";
import DistortedImage from "./DistortedImage";


const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const item = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

/* Put your image in the /public folder (or change this path) */
const HERO_IMAGE = "/spiderman.png";

const shimmerCSS = `@keyframes heroShimmer{0%{background-position:0% 0}100%{background-position:250% 0}}
@media (prefers-reduced-motion: reduce){h1{animation:none!important}}`;

export default function Hero() {
  const sectionRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { stiffness: 120, damping: 25, mass: 0.5 });
  const glowY = useSpring(mouseY, { stiffness: 120, damping: 25, mass: 0.5 });

  const handleMouseMove = (e) => {
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <>
      <style>{shimmerCSS}</style>

      <section
        id="home"
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        className="relative mt-8 min-h-screen overflow-hidden bg-[#120E06]"
      >
        {/* ---------- Full-screen background image, aligned to the end (right) ---------- */}
        <motion.div
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {/* Move the mouse: the photo splits into red/green ghosts and wobbles */}
          <DistortedImage src={HERO_IMAGE} className="h-full w-full" />
        </motion.div>

        {/* ---------- Overlays so text stays readable ---------- */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#120E06] via-[#120E06]/80 to-transparent md:via-[#120E06]/55" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#120E06] to-transparent" />
        <div className="absolute inset-0 bg-[#120E06]/40 md:hidden" />

        {/* ---------- Floating tech logos (above the image, below the text) ---------- */}
        <FloatingObject />

        {/* mouse-tracking gold glow */}
        <motion.div
          className="pointer-events-none absolute rounded-full mix-blend-screen"
          style={{
            left: glowX,
            top: glowY,
            x: "-50%",
            y: "-50%",
            width: 520,
            height: 520,
            background:
              "radial-gradient(circle, rgba(255,203,86,0.18) 0%, rgba(245,158,11,0.10) 40%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* ---------- Text overlay ---------- */}
        <div className="pointer-events-none relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="pointer-events-auto max-w-xl"
          >
            <motion.div
              variants={item}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FFCB56]/40 bg-[#120E06]/50 px-4 py-1.5 backdrop-blur-md"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#FFCB56]" />
              <p className="text-sm tracking-wide text-[#FFE29A]">
                Hello, I&apos;m available for work
              </p>
            </motion.div>

            <motion.h1
              variants={item}
              className="bg-clip-text text-5xl font-bold leading-tight text-transparent md:text-7xl"
              style={{
                backgroundImage:
                  "linear-gradient(90deg,#FFF7E3,#FFCB56,#F59E0B,#FFCB56,#FFF7E3)",
                backgroundSize: "250% 100%",
                animation: "heroShimmer 6s linear infinite",
              }}
            >
              Abhi Akhade
            </motion.h1>

            <motion.h2
              variants={item}
              className="mt-4 text-2xl font-medium text-[#FFF7E3]/80 md:text-4xl"
            >
              Full Stack Developer
            </motion.h2>

            <motion.p
              variants={item}
              className="mt-6 max-w-lg leading-relaxed text-[#FFF7E3]/75"
            >
              Building immersive digital experiences using React, Three.js and
              modern web technologies. I turn ideas into fast, polished, and
              scalable products.
            </motion.p>

            <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="rounded-full bg-gradient-to-r from-[#FFCB56] to-[#F59E0B] px-7 py-3 text-sm font-semibold text-[#120E06] shadow-lg shadow-[#FFCB56]/30 transition-all duration-300 hover:scale-105 hover:shadow-[#FFCB56]/60"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="rounded-full border border-[#FFF7E3]/25 bg-[#120E06]/40 px-7 py-3 text-sm font-semibold text-[#FFF7E3] backdrop-blur-md transition-colors duration-300 hover:border-[#FFCB56]/70 hover:bg-[#FFCB56]/10"
              >
                Get In Touch
              </a>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-10 flex items-center gap-5"
            >
              {[
                {
                  icon: FaGithub,
                  href: "https://github.com/Abhiakhade",
                  label: "GitHub",
                },
                {
                  icon: FaLinkedin,
                  href: "https://linkedin.com/in/abhijitakhade/",
                  label: "LinkedIn",
                },
                {
                  icon: Mail,
                  href: "mailto:abhijitakhade8830@gmail.com",
                  label: "Email",
                },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#FFF7E3]/20 bg-[#120E06]/40 text-[#FFF7E3]/80 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#FFCB56]/70 hover:text-[#FFCB56]"
                >
                  <Icon size={18} />
                </a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[#FFF7E3]/60"
        >
          <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ArrowDown size={25} className="text-[#FFCB56]" />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
