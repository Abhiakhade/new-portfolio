import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sparkles, Layers, Server, Database } from "lucide-react";

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const logo = (slug) => `${DEVICON}/${slug}/${slug}-original.svg`;

const skillCategories = [
  {
    title: "Frontend",
    icon: Layers,
    blurb: "Fast, responsive interfaces with smooth motion.",
    skills: [
      { name: "HTML", level: 95, slug: "html5" },
      { name: "CSS", level: 90, slug: "css3" },
      { name: "JavaScript", level: 88, slug: "javascript" },
      { name: "React.js", level: 85, slug: "react" },
      { name: "Next.js", level: 80, slug: "nextjs" },
      { name: "Tailwind CSS", level: 92, slug: "tailwindcss" },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    blurb: "APIs and server logic that scale.",
    skills: [
      { name: "Node.js", level: 82, slug: "nodejs" },
      { name: "Express", level: 80, slug: "express" },
      { name: "Java", level: 72, slug: "java" },
      { name: "Python", level: 70, slug: "python" },
      { name: "C++", level: 65, slug: "cplusplus" },
    ],
  },
  {
    title: "Database & DevOps",
    icon: Database,
    blurb: "Storing data and shipping it reliably.",
    skills: [
      { name: "MongoDB", level: 82, slug: "mongodb" },
      { name: "MySQL", level: 75, slug: "mysql" },
      { name: "Linux", level: 70, slug: "linux" },
      { name: "Docker", level: 60, slug: "docker" },
    ],
  },
];

const allSkills = skillCategories.flatMap((category) => category.skills);

const stats = [
  { label: "Technologies", value: "15+" },
  { label: "Projects Built", value: "12+" },
  { label: "Working Ability", value: "100%" },
  { label: "Learning", value: "∞" },
];

const EASE = [0.22, 1, 0.36, 1];

const grid = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
};

const tile = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

/* Technology logo */
function LogoChip({ slug, name, size = 44 }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-xl bg-[#FFF7E3] shadow-md shadow-black/30"
      style={{ width: size, height: size }}
    >
      <img
        src={logo(slug)}
        alt={`${name} logo`}
        loading="lazy"
        draggable={false}
        className="h-[58%] w-[58%] select-none object-contain"
      />
    </span>
  );
}

/* Circular progress ring */
function Ring({ level, reducedMotion, ringId }) {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative h-12 w-12 shrink-0 sm:h-14 sm:w-14">
      <svg
        viewBox="0 0 56 56"
        className="h-full w-full -rotate-90"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={ringId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFCB56" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>

        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="rgba(255,247,227,0.1)"
          strokeWidth="4"
        />

        <motion.circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke={`url(#${ringId})`}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={reducedMotion ? false : { strokeDashoffset: circumference }}
          animate={{
            strokeDashoffset: circumference * (1 - level / 100),
          }}
          transition={{
            duration: reducedMotion ? 0 : 1.2,
            delay: reducedMotion ? 0 : 0.2,
            ease: EASE,
          }}
        />
      </svg>

      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-[#FFE29A] sm:text-[11px]">
        {level}%
      </span>
    </div>
  );
}

export default function Skills() {
  const [active, setActive] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const category = skillCategories[active] ?? skillCategories[0];

  return (
    <section
      id="skills"
      className="relative isolate overflow-hidden bg-[#120E06] py-16 sm:py-20 lg:py-24"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-[#FFCB56]/10 blur-[100px] sm:h-80 sm:w-80 sm:blur-[130px]" />

      <div className="pointer-events-none absolute -bottom-20 -right-24 h-64 w-64 rounded-full bg-[#F59E0B]/10 blur-[100px] sm:h-80 sm:w-80 sm:blur-[130px]" />

      {/* Heading */}
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-10 text-center sm:mb-14"
        >
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#FFCB56]/30 bg-[#FFCB56]/5 px-3 py-1.5 text-xs text-[#FFE29A] sm:mb-4 sm:px-4 sm:text-sm">
            <Sparkles size={14} />
            What I work with
          </p>

          <h2 className="bg-gradient-to-r from-[#FFF7E3] via-[#FFCB56] to-[#F59E0B] bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:text-5xl">
            My Skills
          </h2>

          {!shouldReduceMotion && (
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
              className="mx-auto mt-4 h-[3px] w-16 origin-center rounded-full bg-gradient-to-r from-[#FFCB56] to-[#F59E0B] sm:mt-5 sm:w-20"
            />
          )}

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#FFF7E3]/65 sm:mt-5 sm:text-base">
            A toolkit built through hands-on projects and continuous learning —
            from pixel-perfect frontends to scalable backend systems.
          </p>
        </motion.div>
      </div>

      {/* Technology logo marquee */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative mb-10 overflow-hidden py-2 sm:mb-14"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        <motion.div
          className="flex w-max gap-3 sm:gap-4"
          animate={shouldReduceMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={{
            duration: 38,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[...allSkills, ...allSkills].map((skill, index) => (
            <div
              key={`${skill.name}-${index}`}
              className="flex items-center gap-2 rounded-xl border border-[#FFF7E3]/10 bg-[#FFF7E3]/[0.04] py-2 pl-2 pr-3 backdrop-blur-sm transition-colors duration-300 hover:border-[#FFCB56]/50 hover:bg-[#FFCB56]/10 sm:gap-3 sm:rounded-2xl sm:py-2.5 sm:pl-2.5 sm:pr-5"
            >
              <LogoChip slug={skill.slug} name={skill.name} size={36} />

              <span className="whitespace-nowrap text-xs font-medium text-[#FFF7E3]/85 sm:text-sm">
                {skill.name}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Skill categories and panels */}
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Category tabs */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          role="tablist"
          aria-label="Skill categories"
          className="mx-auto mb-7 flex w-full max-w-full flex-wrap justify-center gap-1.5 rounded-2xl border border-[#FFF7E3]/10 bg-[#FFF7E3]/[0.04] p-1.5 backdrop-blur-md sm:mb-10 sm:w-fit sm:rounded-full sm:gap-1"
        >
          {skillCategories.map((cat, index) => {
            const Icon = cat.icon;
            const isActive = active === index;

            return (
              <button
                key={cat.title}
                id={`skill-tab-${index}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="skill-panel"
                onClick={() => setActive(index)}
                className={`relative flex min-w-0 flex-1 items-center justify-center rounded-full px-2 py-3 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFCB56] sm:flex-none sm:px-5 sm:py-2.5 sm:text-sm ${
                  isActive
                    ? "text-[#120E06]"
                    : "text-[#FFF7E3]/70 hover:text-[#FFCB56]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="skill-tab"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 34,
                    }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FFCB56] to-[#F59E0B]"
                  />
                )}

                <span className="relative flex items-center gap-1.5 sm:gap-2">
                  <Icon size={15} />
                  <span className="whitespace-nowrap">{cat.title}</span>
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Skill panel */}
        <div
          id="skill-panel"
          role="tabpanel"
          aria-labelledby={`skill-tab-${active}`}
          className="rounded-2xl border border-[#FFF7E3]/10 bg-[#FFF7E3]/[0.03] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:rounded-3xl sm:p-6 md:p-8"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={category.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
            >
              {/* Panel heading */}
              <div className="mb-6 flex flex-wrap items-start justify-between gap-3 sm:mb-8 sm:items-end">
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-[#FFF7E3] sm:text-xl">
                    {category.title}
                  </h3>

                  <p className="mt-1 text-xs leading-relaxed text-[#FFF7E3]/55 sm:text-sm">
                    {category.blurb}
                  </p>
                </div>

                <span className="shrink-0 rounded-full border border-[#FFCB56]/30 bg-[#FFCB56]/5 px-2.5 py-1 text-[10px] text-[#FFE29A] sm:px-3 sm:text-xs">
                  {category.skills.length} technologies
                </span>
              </div>

              {/* Skill cards */}
              <motion.div
                variants={grid}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
              >
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={shouldReduceMotion ? undefined : tile}
                    whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                    className="group flex min-w-0 items-center gap-3 rounded-xl border border-[#FFF7E3]/10 bg-[#FFF7E3]/[0.04] p-3 transition-[border-color,background-color,box-shadow] duration-300 hover:border-[#FFCB56]/50 hover:bg-[#FFCB56]/[0.07] hover:shadow-[0_14px_40px_rgba(255,203,86,0.12)] sm:gap-4 sm:rounded-2xl sm:p-4"
                  >
                    <LogoChip slug={skill.slug} name={skill.name} size={42} />

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-[#FFF7E3] transition-colors duration-300 group-hover:text-[#FFCB56] sm:text-base">
                        {skill.name}
                      </p>

                      <p className="mt-0.5 text-[10px] text-[#FFF7E3]/50 sm:text-xs">
                        {skill.level >= 85
                          ? "Strong"
                          : skill.level >= 70
                            ? "Confident"
                            : "Growing"}
                      </p>
                    </div>

                    <Ring
                      level={skill.level}
                      reducedMotion={shouldReduceMotion}
                      ringId={`skill-ring-${active}-${skill.slug}`}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Stats */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-4 sm:gap-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-[#FFF7E3]/10 bg-[#FFF7E3]/[0.03] px-3 py-4 text-center transition-colors duration-300 hover:border-[#FFCB56]/40 sm:rounded-2xl sm:px-4 sm:py-5"
            >
              <p className="bg-gradient-to-r from-[#FFCB56] to-[#F59E0B] bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
                {stat.value}
              </p>

              <p className="mt-1 text-[10px] text-[#FFF7E3]/55 sm:text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
