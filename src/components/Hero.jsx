import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { Mail, ArrowDown } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useRef } from "react";
import FloatingObject from "./FloatingObject";
import DistortedImage from "./DistortedImage";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const HERO_IMAGE = "/spiderman.png";

export default function Hero() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const glowX = useSpring(mouseX, {
    stiffness: 120,
    damping: 25,
    mass: 0.5,
  });

  const glowY = useSpring(mouseY, {
    stiffness: 120,
    damping: 25,
    mass: 0.5,
  });

  const handleMouseMove = (e) => {
    if (!sectionRef.current || reduceMotion) return;

    const rect = sectionRef.current.getBoundingClientRect();

    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const socialLinks = [
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
  ];

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative isolate mt-4 min-h-[100svh] w-full overflow-hidden bg-[#120E06] sm:mt-6"
    >
      {/* Background image */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: reduceMotion ? 0 : 1.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute inset-0"
      >
        <DistortedImage src={HERO_IMAGE} className="h-full w-full" />
      </motion.div>

      {/* Background overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#120E06] via-[#120E06]/85 to-[#120E06]/30 sm:via-[#120E06]/75 md:via-[#120E06]/60 md:to-transparent" />

      <div className="absolute inset-0 bg-[#120E06]/30 md:bg-transparent" />

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#120E06] to-transparent sm:h-56" />

      {/* Floating objects */}
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        <FloatingObject />
      </div>

      {/* Mouse glow */}
      {!reduceMotion && (
        <motion.div
          className="pointer-events-none absolute z-[2] hidden rounded-full mix-blend-screen md:block"
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
      )}

      {/* Main content */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl items-center px-4 pb-24 pt-28 sm:px-6 sm:pb-28 sm:pt-32 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full max-w-xl"
        >
          {/* Availability */}
          <motion.div
            variants={item}
            className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-[#FFCB56]/40 bg-[#120E06]/60 px-3 py-2 backdrop-blur-md sm:mb-6 sm:px-4"
          >
            <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-[#FFCB56]" />

            <p className="text-xs font-medium tracking-wide text-[#FFE29A] sm:text-sm">
              Hello, I'm available for work
            </p>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={item}
            className="bg-gradient-to-r from-[#FFF7E3] via-[#FFCB56] to-[#F59E0B] bg-clip-text text-[clamp(2.8rem,9vw,5.5rem)] font-bold leading-[1.08] tracking-tight text-transparent"
          >
            Abhi Akhade
          </motion.h1>

          {/* Profession */}
          <motion.h2
            variants={item}
            className="mt-3 text-xl font-medium leading-tight text-[#FFF7E3]/90 sm:mt-4 sm:text-3xl md:text-4xl"
          >
            Full Stack Developer
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={item}
            className="mt-5 max-w-lg text-sm leading-7 text-[#FFF7E3]/75 sm:mt-6 sm:text-base sm:leading-8"
          >
            Building immersive digital experiences using React, Three.js and
            modern web technologies. I turn ideas into fast, polished, and
            scalable products.
          </motion.p>

          {/* Action buttons */}
          <motion.div
            variants={item}
            className="mt-7 flex w-full flex-col gap-3 min-[400px]:flex-row sm:mt-10 sm:gap-4"
          >
            <a
              href="#projects"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#FFCB56] to-[#F59E0B] px-6 py-3 text-sm font-semibold text-[#120E06] shadow-lg shadow-[#FFCB56]/30 transition-all duration-300 hover:scale-105 hover:shadow-[#FFCB56]/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFCB56] sm:px-7"
            >
              View My Work
            </a>

            <a
              href="#contact"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#FFF7E3]/25 bg-[#120E06]/50 px-6 py-3 text-sm font-semibold text-[#FFF7E3] backdrop-blur-md transition-all duration-300 hover:border-[#FFCB56]/70 hover:bg-[#FFCB56]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFCB56] sm:px-7"
            >
              Get In Touch
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={item}
            className="mt-8 flex items-center gap-4 sm:mt-10 sm:gap-5"
          >
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={label === "Email" ? undefined : "_blank"}
                rel={label === "Email" ? undefined : "noopener noreferrer"}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#FFF7E3]/20 bg-[#120E06]/50 text-[#FFF7E3]/80 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#FFCB56]/70 hover:text-[#FFCB56] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFCB56]"
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduceMotion ? 0 : 1.5, duration: 1 }}
        className="pointer-events-none absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[#FFF7E3]/60 sm:bottom-8"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] sm:text-xs">
          Scroll
        </span>

        <motion.div
          animate={reduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
            ease: "easeInOut",
          }}
        >
          <ArrowDown
            size={23}
            className="text-[#FFCB56] sm:h-[25px] sm:w-[25px]"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
