import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const ring = {
  hidden: { scale: 0.6, opacity: 0 },
  show: (i) => ({
    scale: [0.6, 1.6],
    opacity: [0.5, 0],
    transition: {
      duration: 2.4,
      repeat: Infinity,
      ease: "easeOut",
      delay: i * 0.6,
    },
  }),
};

export default function ArrowRings({ href = "#about" }) {
  return (
    <a
      href={href}
      aria-label="Scroll down"
      className="group relative flex h-16 w-16 items-center justify-center"
    >
      {/* Animated pulse rings */}
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          custom={i}
          variants={ring}
          initial="hidden"
          animate="show"
          className="absolute inset-0 rounded-full border border-cyan-400/40"
        />
      ))}

      {/* Static outer ring */}
      <span className="absolute inset-0 rounded-full border border-white/10" />

      {/* Gradient glow on hover */}
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/0 via-cyan-400/0 to-purple-500/0 opacity-0 blur-md transition-opacity duration-500 group-hover:from-cyan-400/30 group-hover:to-purple-500/30 group-hover:opacity-100" />

      {/* Core circle */}
      <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur-sm transition-all duration-300 group-hover:border-cyan-400/50 group-hover:bg-white/10">
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="flex items-center justify-center text-cyan-300 transition-colors duration-300 group-hover:text-cyan-200"
        >
          <ArrowDown size={20} />
        </motion.span>
      </span>
    </a>
  );
}
