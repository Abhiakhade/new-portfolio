import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1];

const STATUS = [
  { at: 0, text: "Warming up" },
  { at: 30, text: "Loading projects" },
  { at: 60, text: "Polishing details" },
  { at: 90, text: "Almost there" },
];

const statusFor = (value) =>
  [...STATUS].reverse().find((status) => value >= status.at)?.text ??
  STATUS[0].text;

export default function CountLoader({
  duration = 1500,
  onComplete,
  fullScreen = true,
}) {
  const [count, setCount] = useState(1);
  const [visible, setVisible] = useState(true);

  const startRef = useRef(null);
  const rafRef = useRef(null);
  const timeoutRef = useRef(null);
  const onCompleteRef = useRef(onComplete);

  const shouldReduceMotion = useReducedMotion();

  // Always use the latest callback without restarting the loader.
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Progress animation: 1 → 100
  useEffect(() => {
    let cancelled = false;

    const totalDuration = shouldReduceMotion
      ? Math.min(Math.max(duration, 0), 600)
      : Math.max(duration, 0);

    const complete = () => {
      if (cancelled) return;

      setCount(100);

      timeoutRef.current = window.setTimeout(
        () => {
          if (!cancelled) {
            setVisible(false);
          }
        },
        shouldReduceMotion ? 0 : 250,
      );
    };

    if (totalDuration === 0) {
      complete();
    } else {
      const step = (timestamp) => {
        if (cancelled) return;

        if (startRef.current === null) {
          startRef.current = timestamp;
        }

        const progress = Math.min(
          (timestamp - startRef.current) / totalDuration,
          1,
        );

        const eased = 1 - Math.pow(1 - progress, 2.2);
        const nextCount = Math.min(100, Math.max(1, Math.round(eased * 100)));

        setCount(nextCount);

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          complete();
        }
      };

      rafRef.current = requestAnimationFrame(step);
    }

    return () => {
      cancelled = true;

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [duration, shouldReduceMotion]);

  // Prevent background scrolling during full-screen loading.
  useEffect(() => {
    if (!fullScreen || !visible) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
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
          initial={shouldReduceMotion ? false : { y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { y: "-100%" }}
          transition={{
            duration: shouldReduceMotion ? 0.15 : 0.9,
            ease: EASE,
          }}
          className={`${
            fullScreen ? "fixed" : "absolute"
          } inset-0 z-[200] flex flex-col justify-end overflow-hidden bg-[#120E06] px-4 pb-[max(2rem,env(safe-area-inset-bottom))] pt-20 sm:px-8 sm:pb-12 md:px-12 md:pb-14`}
        >
          {/* Background glow */}
          <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-[#FFCB56]/15 blur-[100px] sm:h-96 sm:w-96 sm:blur-[140px]" />

          <div className="pointer-events-none absolute -right-32 top-0 h-56 w-56 rounded-full bg-[#F59E0B]/10 blur-[100px] sm:h-80 sm:w-80 sm:blur-[130px]" />

          {/* Brand and status */}
          <div className="absolute left-4 top-[max(1.5rem,env(safe-area-inset-top))] flex items-center gap-3 sm:left-8 sm:top-10 md:left-12 md:top-12">
            <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-[#FFCB56] shadow-[0_0_12px_#FFCB56]" />

            <AnimatePresence mode="wait">
              <motion.span
                key={statusFor(count)}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="text-xs text-[#FFF7E3]/60 sm:text-sm"
              >
                {statusFor(count)}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Counter */}
          <div className="relative flex items-end">
            <span className="font-mono text-[clamp(5rem,18vw,10rem)] font-bold leading-none tabular-nums text-[#FFF7E3]">
              {count}
            </span>

            <span className="mb-2 ml-1.5 font-mono text-[clamp(1.5rem,5vw,3rem)] font-bold leading-none text-[#FFCB56] sm:mb-4 sm:ml-2">
              %
            </span>
          </div>

          {/* Progress bar */}
          <div
            className="relative mt-5 h-[3px] w-full overflow-hidden rounded-full bg-[#FFF7E3]/10 sm:mt-6"
            role="progressbar"
            aria-label="Loading progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={count}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#FFCB56] to-[#F59E0B] shadow-[0_0_16px_rgba(255,203,86,0.7)]"
              style={{ width: `${count}%` }}
            />
          </div>

          {/* Footer */}
          <div className="relative mt-4 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#FFF7E3]/30 sm:text-xs">
              Abhijit Akhade
            </span>

            <span className="text-[10px] text-[#FFF7E3]/40 sm:text-xs">
              Please wait...
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
