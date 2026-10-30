import { motion, useReducedMotion } from "framer-motion";

const NAME = "ABHIJIT AKHADE";

const ROLES = [
  "Full Stack Developer",
  "React",
  "Node.js",
  "MongoDB",
  "Next.js",
  "Three.js",
];

const HOVER_COLORS = ["#FFCB56", "#F59E0B", "#FFE29A"];

const EASE = [0.22, 1, 0.36, 1];

const fade = {
  maskImage:
    "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
  WebkitMaskImage:
    "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
};

/* Diamond separator */
function Diamond({ className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 rotate-45 rounded-[2px] bg-gradient-to-br from-[#FFCB56] to-[#F59E0B] shadow-[0_0_20px_rgba(255,203,86,0.5)] ${className}`}
    />
  );
}

/* Individual animated letters */
function BigName({ interactive = true }) {
  return (
    <span
      className="flex shrink-0 items-center whitespace-nowrap text-[clamp(3.5rem,12vw,11rem)] font-black uppercase leading-none tracking-tight"
      aria-label={NAME}
    >
      {Array.from(NAME).map((ch, i) =>
        ch === " " ? (
          <span key={i} className="w-[0.3em]" />
        ) : (
          <span
            key={i}
            style={{
              "--letter-color": HOVER_COLORS[i % HOVER_COLORS.length],
            }}
            className={`inline-block select-none text-transparent [-webkit-text-stroke:1.5px_rgba(255,247,227,0.35)] transition-[transform,color,filter] duration-300 ease-out sm:[-webkit-text-stroke-width:2px] ${
              interactive
                ? "cursor-default hover:-translate-y-2 hover:scale-110 hover:[color:var(--letter-color)] hover:[-webkit-text-stroke-color:var(--letter-color)] hover:drop-shadow-[0_0_24px_rgba(255,203,86,0.55)] sm:hover:-translate-y-3 sm:hover:scale-[1.15]"
                : ""
            }`}
          >
            {ch}
          </span>
        ),
      )}
    </span>
  );
}

/* Role / skill label */
function RoleWord({ children }) {
  return (
    <span className="inline-block cursor-default select-none whitespace-nowrap text-[clamp(0.85rem,2.5vw,1.875rem)] font-semibold uppercase tracking-[0.12em] text-[#FFF7E3]/45 transition-colors duration-300 hover:text-[#FFCB56] sm:tracking-[0.2em] sm:hover:scale-105">
      {children}
    </span>
  );
}

/* Repeated name row */
function NameTrack({ reducedMotion }) {
  const items = [0, 1];

  return (
    <div className="group/name overflow-hidden py-3 sm:py-5" style={fade}>
      <motion.div
        className="flex w-max items-center"
        animate={reducedMotion ? { x: 0 } : { x: ["-50%", "0%"] }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : {
                duration: 45,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
              }
        }
      >
        {items.map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center gap-8 pr-8 sm:gap-16 sm:pr-16 lg:gap-20 lg:pr-20"
          >
            {[0, 1].map((item) => (
              <div
                key={item}
                className="flex shrink-0 items-center gap-8 sm:gap-16 lg:gap-20"
              >
                <BigName interactive={copy === 0} />
                <Diamond className="h-3 w-3 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* Repeated role row */
function RoleTrack({ reducedMotion }) {
  const repeatedRoles = [...ROLES, ...ROLES];

  return (
    <div className="group/roles overflow-hidden py-2 sm:py-3" style={fade}>
      <motion.div
        className="flex w-max items-center"
        animate={reducedMotion ? { x: 0 } : { x: ["0%", "-50%"] }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : {
                duration: 35,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
              }
        }
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center gap-6 pr-6 sm:gap-10 sm:pr-10 lg:gap-12 lg:pr-12"
          >
            {repeatedRoles.map((role, index) => (
              <div
                key={`${role}-${index}`}
                className="flex shrink-0 items-center gap-6 sm:gap-10 lg:gap-12"
              >
                <RoleWord>{role}</RoleWord>
                <Diamond className="h-2 w-2 sm:h-2.5 sm:w-2.5" />
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Name() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-label={`${NAME} — ${ROLES[0]}`}
      className="relative isolate w-full overflow-hidden bg-[#120E06] py-12 sm:py-16 md:py-20 lg:py-24"
    >
      {/* Top and bottom decorative lines */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FFCB56]/40 to-transparent" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#FFCB56]/40 to-transparent" />

      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFCB56]/10 blur-[90px] sm:h-72 sm:w-[60%] sm:blur-[140px]" />

      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: reducedMotion ? 0 : 1,
          ease: EASE,
        }}
        className="relative flex w-full flex-col gap-6 sm:gap-9 md:gap-12"
      >
        {/* Row 1: Name */}
        <NameTrack reducedMotion={reducedMotion} />

        {/* Row 2: Roles and technologies */}
        <RoleTrack reducedMotion={reducedMotion} />
      </motion.div>
    </section>
  );
}
