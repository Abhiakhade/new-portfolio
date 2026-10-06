import { motion } from "framer-motion";

/* ---------- Palette (same as the rest of the site) ----------
   gold    #FFCB56  brand colour
   amber   #F59E0B  deeper accent
   butter  #FFE29A  soft accent
   ink     #120E06  page background
   cream   #FFF7E3  main text
-------------------------------------------------------------- */

const NAME = "ABHIJIT AKHADE";
const ROLES = [
  "Full Stack Developer",
  "React",
  "Node.js",
  "MongoDB",
  "Next.js",
  "Three.js",
];

// each hovered letter lights up in one of these (cycles through)
const HOVER_COLORS = ["#FFCB56", "#F59E0B", "#FFE29A"];

const css = `
@keyframes nameRight { from { transform: translateX(-50%) } to { transform: translateX(0) } }
@keyframes nameLeft  { from { transform: translateX(0) }    to { transform: translateX(-50%) } }
@media (prefers-reduced-motion: reduce) { .name-track { animation: none !important } }
`;

const fade = {
  maskImage:
    "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
  WebkitMaskImage:
    "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
};

/* small gold diamond between repeats */
function Diamond({ className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 rotate-45 bg-gradient-to-br from-[#FFCB56] to-[#F59E0B] shadow-[0_0_24px_rgba(255,203,86,0.6)] ${className}`}
    />
  );
}

/* One big name: every letter reacts on its own */
function BigName() {
  return (
    <span className="flex shrink-0 items-center whitespace-nowrap font-black uppercase leading-none tracking-tight text-[clamp(4.5rem,13vw,11rem)]">
      {Array.from(NAME).map((ch, i) =>
        ch === " " ? (
          <span key={i} className="w-[0.3em]" />
        ) : (
          <span
            key={i}
            style={{ "--c": HOVER_COLORS[i % HOVER_COLORS.length] }}
            className="inline-block cursor-default select-none text-transparent [-webkit-text-stroke:2px_rgba(255,247,227,0.35)] transition-all duration-300 ease-out hover:-translate-y-3 hover:scale-[1.15] hover:[color:var(--c)] hover:[-webkit-text-stroke-color:var(--c)] hover:drop-shadow-[0_0_28px_rgba(255,203,86,0.55)] max-sm:[-webkit-text-stroke-width:1.5px]"
          >
            {ch}
          </span>
        ),
      )}
    </span>
  );
}

function RoleWord({ children }) {
  return (
    <span className="inline-block cursor-default select-none whitespace-nowrap text-2xl font-semibold uppercase tracking-[0.2em] text-[#FFF7E3]/45 transition-all duration-300 ease-out hover:scale-110 hover:text-[#FFCB56] sm:text-3xl">
      {children}
    </span>
  );
}

export default function Name() {
  return (
    <section
      aria-label={`${NAME.toLowerCase()} — ${ROLES[0]}`}
      className="relative overflow-hidden bg-[#120E06] py-16 sm:py-24"
    >
      <style>{css}</style>

      {/* hairlines + soft glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FFCB56]/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#FFCB56]/40 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFCB56]/10 blur-[140px]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative space-y-8 sm:space-y-12"
      >
        {/* Row 1: the name, sliding left → right. Pauses while you hover. */}
        <div className="group/row overflow-hidden py-4" style={fade}>
          <div
            className="name-track flex w-max items-center gap-12 pr-12 group-hover/row:[animation-play-state:paused] sm:gap-20 sm:pr-20"
            style={{
              animationName: "nameRight",
              animationDuration: "50s",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
            }}
          >
            {/* the group appears twice = seamless loop */}
            {[0, 1].map((copy) => (
              <div
                key={copy}
                aria-hidden={copy === 1}
                className="flex shrink-0 items-center gap-12 sm:gap-20"
              >
                {[0, 1].map((n) => (
                  <div
                    key={n}
                    className="flex shrink-0 items-center gap-12 sm:gap-20"
                  >
                    <BigName />
                    <Diamond className="h-4 w-4 sm:h-6 sm:w-6" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: skills / role, sliding the other way, smaller */}
        <div className="group/row2 overflow-hidden" style={fade}>
          <div
            className="name-track flex w-max items-center gap-8 pr-8 group-hover/row2:[animation-play-state:paused] sm:gap-12 sm:pr-12"
            style={{
              animationName: "nameLeft",
              animationDuration: "40s",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
            }}
          >
            {[0, 1].map((copy) => (
              <div
                key={copy}
                aria-hidden={copy === 1}
                className="flex shrink-0 items-center gap-8 sm:gap-12"
              >
                {[...ROLES, ...ROLES].map((role, i) => (
                  <div
                    key={`${role}-${i}`}
                    className="flex items-center gap-8 sm:gap-12"
                  >
                    <RoleWord>{role}</RoleWord>
                    <Diamond className="h-2 w-2" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
