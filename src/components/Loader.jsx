import { motion } from "framer-motion";

export default function Loader() {
const dots = [0, 1, 2];

return ( <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#030712]">
{/* Logo / Name */}
<motion.h1
initial={{ opacity: 0, y: 10 }}
animate={{ opacity: 1, y: 0 }}
className="mb-8 text-2xl font-bold tracking-wider text-white"
> <span className="text-cyan-400"></span>
Abhi <span className="text-cyan-400"></span>
</motion.h1>


  {/* Animated Dots */}
  <div className="flex items-center gap-3">
    {dots.map((dot) => (
      <motion.div
        key={dot}
        className="h-3 w-3 rounded-full bg-cyan-400"
        animate={{
          y: [0, -10, 0],
          scale: [1, 1.4, 1],
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          delay: dot * 0.15,
          ease: "easeInOut",
        }}
        style={{
          boxShadow: "0 0 15px rgba(34,211,238,0.8)",
        }}
      />
    ))}
  </div>

  {/* Loading Text */}
  <motion.p
    className="mt-6 text-sm tracking-[0.25em] text-gray-400 uppercase"
    animate={{
      opacity: [0.4, 1, 0.4],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
    }}
  >
    Loading Portfolio
  </motion.p>
</div>


);
}
