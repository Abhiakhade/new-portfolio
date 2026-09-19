import React, { useEffect, useRef, useState } from "react";

/**
 * CountLoader
 * A full-black loading screen where a counter climbs 1 → 100,
 * pinned to the left edge at a medium size, with a thin progress
 * rule that fills beneath it and a quiet status line beside it.
 */
export function CountLoader({
  duration = 1500,
  onComplete,
  fullScreen = true,
}) {
  const [count, setCount] = useState(1);
  const startRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const step = (timestamp) => {
      if (startRef.current === null) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const next = Math.max(1, Math.round(progress * 100));
      setCount(next);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else if (onComplete) {
        onComplete();
      }
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [duration, onComplete]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`Loading, ${count} percent`}
      className={`${fullScreen ? "fixed" : "absolute"} inset-0 bg-black flex items-center`}
    >
      <span
        className="font-mono text-white tabular-nums leading-none"
        style={{ fontVariantNumeric: "tabular-nums", fontSize: "8rem" }}
      >
        {count}
      </span>
    </div>
  );
}

export default function CountLoaderDemo() {
  return (
    <div className="relative w-full h-screen bg-black">
      <CountLoader duration={1500} />
    </div>
  );
}
