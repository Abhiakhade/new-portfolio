import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * CustomCursor
 *
 * A dot + trailing ring that inverts whatever is underneath it
 * (white-on-dark, dark-on-white, and every colour in between) using
 * `mix-blend-mode: difference`. Because the blend happens against the page
 * itself, the cursor stays visible on any background while scrolling.
 *
 * Usage: render once near the root of your app.
 *   <CustomCursor />
 * Mark extra hover targets with `data-cursor-hover`.
 */

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

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const lastPos = useRef({ x: -100, y: -100 });

  const ringX = useSpring(mouseX, { damping: 28, stiffness: 320, mass: 0.5 });
  const ringY = useSpring(mouseY, { damping: 28, stiffness: 320, mass: 0.5 });

  // Only enable for devices with a real mouse (not touch), so we never
  // render a phantom cursor on phones or tablets.
  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // Hide the native cursor while ours is active.
  useEffect(() => {
    if (!enabled) return;
    const style = document.createElement("style");
    style.setAttribute("data-custom-cursor", "");
    style.textContent = "html, html * { cursor: none !important; }";
    document.head.appendChild(style);
    return () => style.remove();
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    let frame = 0;

    const detectInteractive = (x, y) => {
      const el = document.elementFromPoint(x, y);
      setIsPointer(Boolean(el && el.closest(INTERACTIVE_SELECTOR)));
    };

    const onMove = (e) => {
      lastPos.current = { x: e.clientX, y: e.clientY };
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);

      const target = e.target;
      setIsPointer(
        target instanceof Element &&
          Boolean(target.closest(INTERACTIVE_SELECTOR)),
      );
    };

    // mousemove does not fire while scrolling, so re-check what is under the
    // cursor on scroll; otherwise the hover state goes stale.
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() =>
        detectInteractive(lastPos.current.x, lastPos.current.y),
      );
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);
    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, {
      passive: true,
      capture: true,
    });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [enabled, mouseX, mouseY]);

  if (!enabled) return null;

  return (
    // The blend mode lives on the fixed container, and the container has no
    // opacity of its own, so its children blend against the real page.
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] mix-blend-difference"
    >
      {/* Ring: outlined by default, becomes a filled inverting disc on hover */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          width: RING_SIZE,
          height: RING_SIZE,
          marginLeft: -RING_SIZE / 2,
          marginTop: -RING_SIZE / 2,
        }}
        animate={{
          scale: isClicking ? 0.85 : isPointer ? 1.6 : 1,
          opacity: isVisible ? 1 : 0,
          backgroundColor: isPointer
            ? "rgba(255,255,255,1)"
            : "rgba(255,255,255,0)",
        }}
        transition={{
          scale: { type: "spring", stiffness: 400, damping: 28 },
          backgroundColor: { duration: 0.2 },
          opacity: { duration: 0.25 },
        }}
        className="absolute left-0 top-0 rounded-full border border-white will-change-transform"
      />

      {/* Dot: follows the pointer exactly */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          width: DOT_SIZE,
          height: DOT_SIZE,
          marginLeft: -DOT_SIZE / 2,
          marginTop: -DOT_SIZE / 2,
        }}
        animate={{
          scale: isClicking ? 0.6 : isPointer ? 0 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="absolute left-0 top-0 rounded-full bg-white will-change-transform"
      />
    </div>
  );
}
