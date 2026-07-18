import { motion, useMotionValue, useSpring } from "framer-motion";
import { Mail, ArrowDown } from "lucide-react";
import HeroCanvas from "./HeroCanvas";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useRef } from "react";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Hero() {
  const sectionRef = useRef(null);

  // raw mouse position within the section
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // spring-smoothed so the glow eases toward the cursor instead of snapping
  const glowX = useSpring(mouseX, { stiffness: 120, damping: 25, mass: 0.5 });
  const glowY = useSpring(mouseY, { stiffness: 120, damping: 25, mass: 0.5 });

  const handleMouseMove = (e) => {
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="mt-8 relative min-h-screen overflow-hidden bg-[#030712]"
    >
      {/* Ambient background glow (static, subtle base layer) */}
      <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="absolute bottom-20 right-20 w-72 h-72 rounded-full bg-purple-500/10 blur-[120px]" />

      {/* Mouse-tracking glow */}
      <motion.div
        className="pointer-events-none absolute rounded-full"
        style={{
          left: glowX,
          top: glowY,
          x: "-50%",
          y: "-50%",
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle, rgba(56,189,248,0.15) 0%, rgba(168,85,247,0.10) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative max-w-7xl mx-auto px-6 min-h-screen grid lg:grid-cols-2 items-center gap-12">
        {/* Content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="z-10 order-2 lg:order-1"
        >
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-1.5 mb-6"
          >
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <p className="text-sm text-cyan-300 tracking-wide">
              Hello, I&apos;m available for work
            </p>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-5xl md:text-7xl font-bold leading-tight text-white"
          >
            Abhi{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Akhade
            </span>
          </motion.h1>

          <motion.h2
            variants={item}
            className="text-2xl md:text-4xl font-medium text-gray-400 mt-4"
          >
            Full Stack Developer
          </motion.h2>

          <motion.p
            variants={item}
            className="mt-6 max-w-lg text-gray-400 leading-relaxed"
          >
            Building immersive digital experiences using React, Three.js and
            modern web technologies. I turn ideas into fast, polished, and
            scalable products.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 px-7 py-3 text-sm font-semibold text-[#030712] shadow-lg shadow-cyan-500/20 transition-transform duration-300 hover:scale-105 hover:shadow-cyan-500/40"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:border-cyan-400/50 hover:bg-white/10"
            >
              Get In Touch
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-10 flex items-center gap-5">
            {[
              { icon: FaGithub, href: "https://github.com/Abhiakhade" },
              { icon: FaLinkedin, href: "https://linkedin.com/in/abhijitakhade/" },
              { icon: Mail, href: "mailto:abhijitakhade8830@gmail.com" },
            ].map(({ icon: Icon, href }, idx) => (
              <a
                key={idx}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:text-cyan-300"
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* 3D Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="order-1 lg:order-2 h-[500px] sm:h-[500px] lg:h-[600px]"
        >
          <HeroCanvas />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
      >
        <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown size={25} className="text-cyan-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}