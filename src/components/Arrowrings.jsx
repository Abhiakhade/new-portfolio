import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const ringVariants = {
  hidden: {
    scale: 0.65,
    opacity: 0,
  },
  show: (i) => ({
    scale: [0.65, 1.6],
    opacity: [0.45, 0],
    transition: {
      duration: 2.4,
      repeat: Infinity,
      ease: "easeOut",
      delay: i * 0.6,
    },
  }),
};

export default function ArrowRings({ href = "#about" }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <a
      href={href}
      aria-label="Scroll down to the next section"
      className="group relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-4 focus-visible:ring-offset-[#120E06] sm:h-16 sm:w-16"
    >
      {/* Animated pulse rings */}
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          custom={i}
          variants={ringVariants}
          initial="hidden"
          animate={shouldReduceMotion ? "hidden" : "show"}
          className="pointer-events-none absolute inset-0 rounded-full border border-cyan-400/40"
        />
      ))}

      {/* Static outer ring */}
      <span className="pointer-events-none absolute inset-0 rounded-full border border-white/10 transition-colors duration-300 group-hover:border-cyan-400/30" />

      {/* Hover glow */}
      <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/0 via-cyan-400/0 to-purple-500/0 opacity-0 blur-md transition-all duration-500 group-hover:from-cyan-400/30 group-hover:to-purple-500/30 group-hover:opacity-100" />

      {/* Core circle */}
      <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-cyan-300 backdrop-blur-sm transition-all duration-300 group-hover:border-cyan-400/50 group-hover:bg-white/10 group-hover:text-cyan-200 sm:h-11 sm:w-11">
        <motion.span
          animate={shouldReduceMotion ? { y: 0 } : { y: [0, 5, 0] }}
          transition={{
            repeat: shouldReduceMotion ? 0 : Infinity,
            duration: 1.8,
            ease: "easeInOut",
          }}
          className="flex items-center justify-center"
        >
          <ArrowDown size={18} strokeWidth={2} className="sm:h-5 sm:w-5" />
        </motion.span>
      </span>
    </a>
  );
}
