import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1];

const STATUS = [
  { at: 0, text: "Warming up" },
  { at: 30, text: "Loading projects" },
  { at: 60, text: "Polishing details" },
  { at: 90, text: "Almost there" },
];

const statusFor = (n) =>
  [...STATUS].reverse().find((s) => n >= s.at)?.text ?? STATUS[0].text;

export default function CountLoader({
  duration = 1500,
  onComplete,
  fullScreen = true,
}) {
  const [count, setCount] = useState(1);
  const [visible, setVisible] = useState(true);

  const startRef = useRef(null);
  const rafRef = useRef(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete; // always the latest callback, never restarts the count

  // count 1 → 100
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const total = reduce ? Math.min(duration, 600) : duration;

    const step = (timestamp) => {
      if (startRef.current === null) startRef.current = timestamp;
      const progress = Math.min((timestamp - startRef.current) / total, 1);
      // ease-out so it rushes then settles on 100
      const eased = 1 - Math.pow(1 - progress, 2.2);
      setCount(Math.max(1, Math.round(eased * 100)));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setTimeout(() => setVisible(false), 250); // brief pause on 100
      }
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [duration]);

  // no page scroll behind a full-screen loader
  useEffect(() => {
    if (!fullScreen || !visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [fullScreen, visible]);

  return (
    <AnimatePresence onExitComplete={() => onCompleteRef.current?.()}>
      {visible && (
        <motion.div
          key="count-loader"
          role="status"
          aria-live="polite"
          aria-label={`Loading, ${count} percent`}
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: EASE }}
          className={`${
            fullScreen ? "fixed" : "absolute"
          } inset-0 z-[200] flex flex-col justify-end overflow-hidden bg-[#120E06] px-6 pb-10 sm:px-12 sm:pb-14`}
        >
          {/* soft gold glow */}
          <div className="pointer-events-none absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-[#FFCB56]/15 blur-[140px]" />

          {/* top-left brand + status */}
          <div className="absolute left-6 top-8 flex items-center gap-3 sm:left-12 sm:top-12">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#FFCB56] shadow-[0_0_12px_#FFCB56]" />
            <span className="text-sm text-[#FFF7E3]/60">
              {statusFor(count)}
            </span>
          </div>

          {/* counter */}
          <div className="relative flex items-end">
            <span
              className="font-mono font-bold leading-none text-[#FFF7E3]"
              style={{
                fontVariantNumeric: "tabular-nums",
                fontSize: "clamp(5rem, 14vw, 10rem)",
              }}
            >
              {count}
            </span>
            <span
              className="mb-2 ml-2 font-mono font-bold leading-none text-[#FFCB56] sm:mb-4"
              style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}
            >
              %
            </span>
          </div>

          {/* progress rule */}
          <div className="relative mt-6 h-[3px] w-full overflow-hidden rounded-full bg-[#FFF7E3]/10">
            <div
              className="h-full origin-left rounded-full bg-gradient-to-r from-[#FFCB56] to-[#F59E0B] shadow-[0_0_16px_rgba(255,203,86,0.7)]"
              style={{ width: `${count}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
