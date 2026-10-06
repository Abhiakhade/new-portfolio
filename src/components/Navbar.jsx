import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X, Download } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import toast from "react-hot-toast";

/* ---------- Palette (same as Hero) ----------
   gold    #FFCB56  brand colour
   amber   #F59E0B  deeper accent
   butter  #FFE29A  soft accent
   ink     #120E06  page background / dark text
   cream   #FFF7E3  light text / light glass
   bronze  #B45309  accent used on the light (scrolled) bar for contrast
---------------------------------------------- */

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
  // { name: "Gallary", href: "#gallary" },
];

const NAV_OFFSET = 96;
const RESUME_URL = "/full-stack.pdf";
const RESUME_FILENAME = "Abhijit_Akhade_Resume.pdf";

const EASE = [0.76, 0, 0.24, 1];
const STAGGER = 0.03;

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFCB56]";

/* ------------------------------------------------------------------ */
/* Monogram with scroll-progress ring                                 */
/* ------------------------------------------------------------------ */

function Monogram({ progress, onClick, light }) {
  return (
    <a
      href="#"
      onClick={onClick}
      aria-label="Abhi — back to top"
      className={`relative grid h-11 w-11 shrink-0 place-items-center rounded-full text-lg font-bold transition-colors duration-500 ${FOCUS} ${
        light ? "text-[#120E06]" : "text-[#FFF7E3]"
      }`}
    >
      <svg
        viewBox="0 0 44 44"
        className="absolute inset-0 h-full w-full -rotate-90"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ring-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFCB56" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>

        <circle
          cx="22"
          cy="22"
          r="20"
          fill="none"
          stroke={light ? "rgba(18,14,6,0.12)" : "rgba(255,247,227,0.12)"}
          strokeWidth="2"
        />

        <motion.circle
          cx="22"
          cy="22"
          r="20"
          fill="none"
          stroke="url(#ring-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ pathLength: progress }}
        />
      </svg>

      <span aria-hidden="true">A</span>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Letter-by-letter roll                                              */
/* ------------------------------------------------------------------ */

const letterVariants = {
  rest: (i) => ({
    y: "0%",
    transition: {
      duration: 0.4,
      ease: EASE,
      delay: i * STAGGER,
    },
  }),

  hover: (i) => ({
    y: "-50%",
    transition: {
      duration: 0.9,
      ease: EASE,
      delay: i * STAGGER,
    },
  }),
};

function RollingLabel({ text, isActive, reduceMotion, light, className = "" }) {
  const base = light
    ? isActive
      ? "text-[#120E06]"
      : "text-[#120E06]/55"
    : isActive
      ? "text-[#FFF7E3]"
      : "text-[#FFF7E3]/60";

  const twin = light ? "text-[#B45309]" : "text-[#FFCB56]";

  if (reduceMotion) {
    return <span className={`${className} ${base}`}>{text}</span>;
  }

  return (
    <span className={`flex ${className}`} aria-hidden="true">
      {Array.from(text).map((char, i) => (
        <span
          key={`${char}-${i}`}
          className="inline-block h-[1.3em] overflow-hidden leading-[1.3em]"
        >
          <motion.span
            custom={i}
            variants={letterVariants}
            className="flex flex-col"
          >
            <span className={base}>{char}</span>
            <span className={twin}>{char}</span>
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Live Date + Time                                                   */
/* ------------------------------------------------------------------ */

function LiveDateTime({ light, mobile = false }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const timeText = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const dateText = now.toLocaleDateString([], {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  if (mobile) {
    return (
      <div
        className="relative mt-6 flex flex-col items-start select-none"
        aria-label={`Current local time ${timeText}, ${dateText}`}
      >
        <time className="text-3xl font-bold tracking-tight text-[#FFCB56] tabular-nums">
          {timeText}
        </time>

        <time className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-[#FFF7E3]/55">
          {dateText}
        </time>
      </div>
    );
  }

  return (
    <div
      className={`hidden md:flex flex-col justify-center select-none ${
        light ? "text-[#120E06]" : "text-[#FFF7E3]"
      }`}
      aria-label={`Current local time ${timeText}, ${dateText}`}
    >
      <time className="text-base font-bold tracking-tight leading-none tabular-nums">
        {timeText}
      </time>

      <time
        className={`mt-1 text-[9px] font-medium uppercase tracking-[0.15em] leading-none ${
          light ? "text-[#120E06]/55" : "text-[#FFF7E3]/55"
        }`}
      >
        {dateText}
      </time>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Navbar                                                              */
/* ------------------------------------------------------------------ */

export default function NavbarIsland() {
  const reduceMotion = useReducedMotion();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(NAV_LINKS[0].name);
  const [hovered, setHovered] = useState(null);

  const isNavigating = useRef(false);
  const navTimer = useRef(0);

  const { scrollY, scrollYProgress } = useScroll();

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 20);
  });

  /* -------------------------------------------------------------- */
  /* Scroll spy                                                     */
  /* -------------------------------------------------------------- */

  useEffect(() => {
    const sections = NAV_LINKS.map((l) =>
      document.querySelector(l.href),
    ).filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isNavigating.current) return;

        const hit = entries.find((e) => e.isIntersecting);

        const link =
          hit && NAV_LINKS.find((l) => l.href === `#${hit.target.id}`);

        if (link) {
          setActive(link.name);
        }
      },
      {
        rootMargin: "-45% 0px -50% 0px",
        threshold: 0,
      },
    );

    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, []);

  /* -------------------------------------------------------------- */
  /* Menu: scroll lock + Escape                                     */
  /* -------------------------------------------------------------- */

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    const onKey = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    return () => window.clearTimeout(navTimer.current);
  }, []);

  /* -------------------------------------------------------------- */
  /* Navigation                                                     */
  /* -------------------------------------------------------------- */

  const goTo = useCallback(
    (e, link) => {
      e.preventDefault();

      const section = document.querySelector(link.href);

      if (!section) return;

      isNavigating.current = true;

      window.clearTimeout(navTimer.current);

      navTimer.current = window.setTimeout(() => {
        isNavigating.current = false;
      }, 900);

      const top =
        section.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;

      window.scrollTo({
        top,
        behavior: reduceMotion ? "auto" : "smooth",
      });

      window.history.pushState(null, "", link.href);

      setActive(link.name);
      setMenuOpen(false);
    },
    [reduceMotion],
  );

  /* -------------------------------------------------------------- */
  /* Go top                                                         */
  /* -------------------------------------------------------------- */

  const goTop = (e) => {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });

    setActive(NAV_LINKS[0].name);
    setMenuOpen(false);
  };

  /* -------------------------------------------------------------- */
  /* Resume                                                         */
  /* -------------------------------------------------------------- */

  const onResume = () => {
    toast.success("Resume download started");
    setMenuOpen(false);
  };

  const contact = NAV_LINKS.find((l) => l.name === "Contact");

  /*
   * Light cream frosted-glass theme once the page is scrolled.
   * Dark while the mobile menu is open.
   */
  const light = scrolled && !menuOpen;

  return (
    <>
      {/* ========================================================== */}
      {/* DESKTOP / MAIN NAVBAR                                      */}
      {/* ========================================================== */}

      <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`pointer-events-auto flex w-full items-center justify-between gap-2 rounded-full border p-1.5 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-500 ease-out md:w-auto md:justify-start md:gap-3 ${
            light
              ? "border-[#120E06]/10 bg-[#FFF7E3]/70 shadow-[0_8px_32px_rgba(18,14,6,0.18)] backdrop-saturate-150"
              : menuOpen
                ? "border-[#FFCB56]/20 bg-[#1C1509]/85 shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
                : "border-[#FFF7E3]/10 bg-[#FFF7E3]/[0.04] shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
          }`}
        >
          {/* Logo */}
          <Monogram progress={progress} onClick={goTop} light={light} />

          {/* ====================================================== */}
          {/* DESKTOP LINKS                                           */}
          {/* ====================================================== */}

          <nav aria-label="Primary" className="hidden md:block">
            <ul
              className="flex items-center"
              onMouseLeave={() => setHovered(null)}
            >
              {NAV_LINKS.map((link) => {
                const isActive = active === link.name;

                return (
                  <li
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setHovered(link.name)}
                    onFocus={() => setHovered(link.name)}
                    onBlur={() => setHovered(null)}
                  >
                    {hovered === link.name && (
                      <motion.span
                        layoutId="hover-pill"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 38,
                        }}
                        className={`absolute inset-0 rounded-full ${
                          light ? "bg-[#FFCB56]/30" : "bg-[#FFCB56]/10"
                        }`}
                      />
                    )}

                    <motion.a
                      href={link.href}
                      onClick={(e) => goTo(e, link)}
                      aria-label={link.name}
                      aria-current={isActive ? "true" : undefined}
                      initial="rest"
                      whileHover="hover"
                      whileFocus="hover"
                      className={`relative z-10 block rounded-full px-4 py-2.5 text-sm font-medium ${FOCUS}`}
                    >
                      <RollingLabel
                        text={link.name}
                        isActive={isActive}
                        reduceMotion={reduceMotion}
                        light={light}
                      />

                      {isActive && (
                        <span
                          className={`absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full ${
                            light ? "bg-[#B45309]" : "bg-[#FFCB56]"
                          }`}
                        />
                      )}
                    </motion.a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* ====================================================== */}
          {/* LIVE TIME + DATE — DESKTOP                             */}
          {/* Appears after Contact                                  */}
          {/* ====================================================== */}

          <LiveDateTime light={light} />

          {/* ====================================================== */}
          {/* DESKTOP ACTIONS                                        */}
          {/* ====================================================== */}

          <div className="hidden items-center gap-1.5 md:flex">
            <a
              href={RESUME_URL}
              download={RESUME_FILENAME}
              onClick={onResume}
              aria-label="Download resume"
              className={`grid h-11 w-11 place-items-center rounded-full transition-colors ${FOCUS} ${
                light
                  ? "text-[#120E06]/70 hover:bg-[#FFCB56]/30 hover:text-[#B45309]"
                  : "text-[#FFF7E3]/75 hover:bg-[#FFCB56]/10 hover:text-[#FFCB56]"
              }`}
            >
              <Download size={18} aria-hidden="true" />
            </a>

            <a
              href={contact.href}
              onClick={(e) => goTo(e, contact)}
              className={`rounded-full bg-gradient-to-r from-[#FFCB56] to-[#F59E0B] px-5 py-3 text-sm font-semibold text-[#120E06] shadow-md shadow-[#FFCB56]/20 transition-all duration-300 hover:scale-[1.04] hover:shadow-[#FFCB56]/50 ${FOCUS}`}
            >
              Hire me
            </a>
          </div>

          {/* ====================================================== */}
          {/* MOBILE TOGGLE                                           */}
          {/* ====================================================== */}

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={`grid h-11 w-11 place-items-center rounded-full transition-colors md:hidden ${FOCUS} ${
              light
                ? "bg-[#FFCB56]/30 text-[#120E06]"
                : "bg-[#FFCB56]/10 text-[#FFF7E3]"
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? "x" : "menu"}
                initial={{
                  opacity: 0,
                  rotate: -90,
                }}
                animate={{
                  opacity: 1,
                  rotate: 0,
                }}
                exit={{
                  opacity: 0,
                  rotate: 90,
                }}
                transition={{
                  duration: 0.18,
                }}
                className="flex"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </motion.div>
      </header>

      {/* ========================================================== */}
      {/* FULL-SCREEN MOBILE MENU                                    */}
      {/* ========================================================== */}

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-[#120E06]/95 px-8 pb-10 pt-28 backdrop-blur-2xl md:hidden"
          >
            {/* Soft gold glow */}
            <div className="pointer-events-none absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-[#FFCB56]/10 blur-[120px]" />

            {/* ==================================================== */}
            {/* MOBILE NAVIGATION                                     */}
            {/* ==================================================== */}

            <div className="relative">
              <nav aria-label="Mobile" className="relative flex flex-col gap-2">
                {NAV_LINKS.map((link, i) => {
                  const isActive = active === link.name;

                  return (
                    <div key={link.name} className="overflow-hidden">
                      <motion.a
                        href={link.href}
                        onClick={(e) => goTo(e, link)}
                        aria-current={isActive ? "true" : undefined}
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{
                          duration: 0.5,
                          ease: EASE,
                          delay: 0.08 + i * 0.06,
                        }}
                        className={`block py-1 text-4xl font-semibold tracking-tight transition-colors ${
                          isActive
                            ? "text-[#FFCB56]"
                            : "text-[#FFF7E3]/80 hover:text-[#FFE29A]"
                        }`}
                      >
                        {link.name}
                      </motion.a>
                    </div>
                  );
                })}
              </nav>

              {/* ================================================== */}
              {/* LIVE TIME + DATE — MOBILE                         */}
              {/* ================================================== */}

              <LiveDateTime light={false} mobile />
            </div>

            {/* ==================================================== */}
            {/* MOBILE ACTIONS                                       */}
            {/* ==================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 16,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.45,
                duration: 0.4,
              }}
              className="relative flex flex-col gap-3"
            >
              <a
                href={RESUME_URL}
                download={RESUME_FILENAME}
                onClick={onResume}
                className="flex items-center justify-center gap-2 rounded-full border border-[#FFF7E3]/20 py-3.5 text-[#FFF7E3] transition-colors hover:border-[#FFCB56]/60 hover:text-[#FFE29A]"
              >
                <Download size={18} aria-hidden="true" />
                Download resume
              </a>

              <a
                href={contact.href}
                onClick={(e) => goTo(e, contact)}
                className="rounded-full bg-gradient-to-r from-[#FFCB56] to-[#F59E0B] py-3.5 text-center font-semibold text-[#120E06]"
              >
                Hire me
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
