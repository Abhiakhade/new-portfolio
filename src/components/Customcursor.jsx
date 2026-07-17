import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth, slightly lagged ring follow
  const ringX = useSpring(mouseX, { damping: 25, stiffness: 300, mass: 0.5 });
  const ringY = useSpring(mouseY, { damping: 25, stiffness: 300, mass: 0.5 });

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      const interactive = target.closest(
        "a, button, input, textarea, select, [data-cursor-hover]",
      );
      setIsPointer(Boolean(interactive));
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
      style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.3s" }}
    >
      {/* Outer ring - smooth trailing */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: isClicking ? 0.8 : isPointer ? 1.8 : 1,
          opacity: isPointer ? 0.6 : 0.35,
        }}
        transition={{ scale: { duration: 0.25, ease: "easeOut" } }}
        className="absolute left-0 top-0 -ml-5 -mt-5 h-10 w-10 rounded-full border border-cyan-400 mix-blend-difference"
      />

      {/* Inner dot - instant follow */}
      <motion.div
        style={{ x: mouseX, y: mouseY }}
        animate={{
          scale: isClicking ? 0.6 : isPointer ? 0 : 1,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute left-0 top-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-cyan-400"
      />

      {/* Glow that appears on interactive elements */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: isPointer ? 1 : 0,
          opacity: isPointer ? 1 : 0,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="absolute left-0 top-0 -ml-5 -mt-5 h-10 w-10 rounded-full bg-gradient-to-r from-cyan-400/30 to-purple-500/30 blur-md"
      />
    </div>
  );
}
