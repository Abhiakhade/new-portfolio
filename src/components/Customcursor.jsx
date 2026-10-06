import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";


const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  "input",
  "textarea",
  "select",
  "label",
  "summary",
  "[role='button']",
  "[role='link']",
  "[data-cursor-hover]",
].join(",");

const RING_SIZE = 36;
const DOT_SIZE = 6;

const PARTICLES = Array.from({ length: 10 }, (_, index) => {
  const angle = (index / 10) * Math.PI * 2;

  return {
    angle,
    distance: index % 2 === 0 ? 48 : 36,
    size: index % 3 === 0 ? 5 : 3,
  };
});

/* -------------------------------------------------------------- */
/* Custom Cursor                                                  */
/* -------------------------------------------------------------- */

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [clickBursts, setClickBursts] = useState([]);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const lastPos = useRef({
    x: -100,
    y: -100,
  });

  const ringX = useSpring(mouseX, {
    damping: 28,
    stiffness: 320,
    mass: 0.5,
  });

  const ringY = useSpring(mouseY, {
    damping: 28,
    stiffness: 320,
    mass: 0.5,
  });

  /* ------------------------------------------------------------ */
  /* Enable only for real mouse devices                          */
  /* ------------------------------------------------------------ */

  useEffect(() => {
    const query = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );

    const update = () => {
      setEnabled(query.matches);
    };

    update();

    query.addEventListener("change", update);

    return () => {
      query.removeEventListener("change", update);
    };
  }, []);

  /* ------------------------------------------------------------ */
  /* Hide native cursor                                            */
  /* ------------------------------------------------------------ */

  useEffect(() => {
    if (!enabled) return;

    const style = document.createElement("style");

    style.setAttribute("data-custom-cursor", "");

    style.textContent =
      "html, html * { cursor: none !important; }";

    document.head.appendChild(style);

    return () => {
      style.remove();
    };
  }, [enabled]);

  /* ------------------------------------------------------------ */
  /* Mouse tracking                                                */
  /* ------------------------------------------------------------ */

  useEffect(() => {
    if (!enabled) return;

    let frame = 0;

    const detectInteractive = (x, y) => {
      const el = document.elementFromPoint(x, y);

      setIsPointer(
        Boolean(
          el &&
            el.closest(INTERACTIVE_SELECTOR),
        ),
      );
    };

    const onMove = (e) => {
      lastPos.current = {
        x: e.clientX,
        y: e.clientY,
      };

      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      setIsVisible(true);

      const target = e.target;

      setIsPointer(
        target instanceof Element &&
          Boolean(
            target.closest(
              INTERACTIVE_SELECTOR,
            ),
          ),
      );
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        detectInteractive(
          lastPos.current.x,
          lastPos.current.y,
        );
      });
    };

    /* ---------------------------------------------------------- */
    /* Mouse down                                                  */
    /* ---------------------------------------------------------- */

    const onDown = (e) => {
      setIsClicking(true);

      const id =
        Date.now() +
        Math.random();

      setClickBursts((prev) => [
        ...prev,
        {
          id,
          x: e.clientX,
          y: e.clientY,
        },
      ]);

      /*
       * Remove the burst after animation completes.
       */
      window.setTimeout(() => {
        setClickBursts((prev) =>
          prev.filter(
            (burst) =>
              burst.id !== id,
          ),
        );
      }, 850);
    };

    const onUp = () => {
      setIsClicking(false);
    };

    const onLeave = () => {
      setIsVisible(false);
    };

    const onEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener(
      "mousemove",
      onMove,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "scroll",
      onScroll,
      {
        passive: true,
        capture: true,
      },
    );

    window.addEventListener(
      "mousedown",
      onDown,
    );

    window.addEventListener(
      "mouseup",
      onUp,
    );

    document.documentElement.addEventListener(
      "mouseleave",
      onLeave,
    );

    document.documentElement.addEventListener(
      "mouseenter",
      onEnter,
    );

    return () => {
      cancelAnimationFrame(frame);

      window.removeEventListener(
        "mousemove",
        onMove,
      );

      window.removeEventListener(
        "scroll",
        onScroll,
        { capture: true },
      );

      window.removeEventListener(
        "mousedown",
        onDown,
      );

      window.removeEventListener(
        "mouseup",
        onUp,
      );

      document.documentElement.removeEventListener(
        "mouseleave",
        onLeave,
      );

      document.documentElement.removeEventListener(
        "mouseenter",
        onEnter,
      );
    };
  }, [
    enabled,
    mouseX,
    mouseY,
  ]);

  if (!enabled) return null;

  return (
    <>
      {/* ======================================================== */}
      {/* CUSTOM CURSOR                                            */}
      {/* ======================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9999] mix-blend-difference"
      >
        {/* ------------------------------------------------------ */}
        {/* Trailing Ring                                           */}
        {/* ------------------------------------------------------ */}

        <motion.div
          style={{
            x: ringX,
            y: ringY,
            width: RING_SIZE,
            height: RING_SIZE,
            marginLeft:
              -RING_SIZE / 2,
            marginTop:
              -RING_SIZE / 2,
          }}
          animate={{
            scale: isClicking
              ? 0.85
              : isPointer
                ? 1.6
                : 1,

            opacity: isVisible
              ? 1
              : 0,

            backgroundColor:
              isPointer
                ? "rgba(255,255,255,1)"
                : "rgba(255,255,255,0)",
          }}
          transition={{
            scale: {
              type: "spring",
              stiffness: 400,
              damping: 28,
            },

            backgroundColor: {
              duration: 0.2,
            },

            opacity: {
              duration: 0.25,
            },
          }}
          className="absolute left-0 top-0 rounded-full border border-white will-change-transform"
        />

        {/* ------------------------------------------------------ */}
        {/* Cursor Dot                                               */}
        {/* ------------------------------------------------------ */}

        <motion.div
          style={{
            x: mouseX,
            y: mouseY,
            width: DOT_SIZE,
            height: DOT_SIZE,
            marginLeft:
              -DOT_SIZE / 2,
            marginTop:
              -DOT_SIZE / 2,
          }}
          animate={{
            scale: isClicking
              ? 0.6
              : isPointer
                ? 0
                : 1,

            opacity: isVisible
              ? 1
              : 0,
          }}
          transition={{
            duration: 0.15,
            ease: "easeOut",
          }}
          className="absolute left-0 top-0 rounded-full bg-white will-change-transform"
        />
      </div>

      {/* ======================================================== */}
      {/* CLICK BURST                                             */}
      {/* ======================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9998] overflow-hidden"
      >
        <AnimatePresence>
          {clickBursts.map((burst) => (
            <div
              key={burst.id}
              className="absolute"
              style={{
                left: burst.x,
                top: burst.y,
              }}
            >
              {/* ------------------------------------------------ */}
              {/* Main Ripple                                       */}
              {/* ------------------------------------------------ */}

              <motion.div
                initial={{
                  scale: 0.2,
                  opacity: 0.9,
                }}
                animate={{
                  scale: 3.8,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.7,
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-7
                  w-7
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  border-2
                  border-[#FFCB56]
                  shadow-[0_0_25px_rgba(255,203,86,0.7)]
                "
              />

              {/* ------------------------------------------------ */}
              {/* Secondary Ripple                                  */}
              {/* ------------------------------------------------ */}

              <motion.div
                initial={{
                  scale: 0.3,
                  opacity: 0.7,
                }}
                animate={{
                  scale: 2.4,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.08,
                  ease: "easeOut",
                }}
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-3
                  w-3
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  border
                  border-[#FFE29A]
                "
              />

              {/* ------------------------------------------------ */}
              {/* Center Glow                                       */}
              {/* ------------------------------------------------ */}

              <motion.div
                initial={{
                  scale: 0.2,
                  opacity: 1,
                }}
                animate={{
                  scale: 1.8,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.35,
                  ease: "easeOut",
                }}
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-3
                  w-3
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-[#FFCB56]
                  shadow-[0_0_22px_8px_rgba(255,203,86,0.4)]
                "
              />

              {/* ------------------------------------------------ */}
              {/* Main Particles                                    */}
              {/* ------------------------------------------------ */}

              {PARTICLES.map(
                (
                  particle,
                  index,
                ) => {
                  const x =
                    Math.cos(
                      particle.angle,
                    ) *
                    particle.distance;

                  const y =
                    Math.sin(
                      particle.angle,
                    ) *
                    particle.distance;

                  return (
                    <motion.span
                      key={index}
                      initial={{
                        x: 0,
                        y: 0,
                        scale: 1,
                        opacity: 1,
                      }}
                      animate={{
                        x,
                        y,
                        scale: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration:
                          0.65,
                        delay:
                          index *
                          0.015,
                        ease: [
                          0.22,
                          1,
                          0.36,
                          1,
                        ],
                      }}
                      style={{
                        width:
                          particle.size,
                        height:
                          particle.size,
                      }}
                      className="
                        absolute
                        left-1/2
                        top-1/2
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        bg-[#FFCB56]
                        shadow-[0_0_10px_3px_rgba(255,203,86,0.55)]
                      "
                    />
                  );
                },
              )}

              {/* ------------------------------------------------ */}
              {/* Small Particles                                  */}
              {/* ------------------------------------------------ */}

              {[...Array(6)].map(
                (_, index) => {
                  const angle =
                    (index / 6) *
                    Math.PI *
                    2;

                  const distance =
                    22 +
                    index * 3;

                  const x =
                    Math.cos(angle) *
                    distance;

                  const y =
                    Math.sin(angle) *
                    distance;

                  return (
                    <motion.span
                      key={`small-${index}`}
                      initial={{
                        x: 0,
                        y: 0,
                        scale: 1,
                        opacity: 0.9,
                      }}
                      animate={{
                        x,
                        y,
                        scale: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration:
                          0.45,
                        delay:
                          0.02,
                        ease: "easeOut",
                      }}
                      className="
                        absolute
                        left-1/2
                        top-1/2
                        h-1
                        w-1
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        bg-[#FFE29A]
                      "
                    />
                  );
                },
              )}
            </div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
