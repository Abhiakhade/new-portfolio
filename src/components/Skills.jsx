import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Layers, Server, Database } from "lucide-react";

/* ---------- Palette (same as the rest of the site) ----------
   gold    #FFCB56  brand colour
   amber   #F59E0B  deeper accent
   butter  #FFE29A  soft accent
   ink     #120E06  page background
   cream   #FFF7E3  main text
-------------------------------------------------------------- */

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

const allSkills = skillCategories.flatMap((c) => c.skills);

const stats = [
  { label: "Technologies", value: "15+" },
  { label: "Projects Built", value: "12+" },
  { label: "Working Ability", value: "100%" },
  { label: "Learning", value: "∞" },
];

const EASE = [0.22, 1, 0.36, 1];

const marqueeCSS = `@keyframes skillsMarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.skills-marquee{animation:skillsMarquee 38s linear infinite}
.skills-marquee-wrap:hover .skills-marquee{animation-play-state:paused}
@media (prefers-reduced-motion: reduce){.skills-marquee{animation:none}}`;

/* White-ish chip so dark logos (Next.js, Express) stay visible */
function LogoChip({ slug, name, size = 44 }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-xl bg-[#FFF7E3] shadow-md shadow-black/30"
      style={{ width: size, height: size }}
    >
      <img
        src={logo(slug)}
        alt={name}
        draggable={false}
        className="h-[58%] w-[58%] select-none object-contain"
      />
    </span>
  );
}

/* Circular progress ring */
function Ring({ level }) {
  const r = 22;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-14 w-14 shrink-0">
      <svg
        viewBox="0 0 56 56"
        className="h-full w-full -rotate-90"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="skill-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFCB56" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>
        <circle
          cx="28"
          cy="28"
          r={r}
          fill="none"
          stroke="rgba(255,247,227,0.1)"
          strokeWidth="4"
        />
        <motion.circle
          cx="28"
          cy="28"
          r={r}
          fill="none"
          stroke="url(#skill-ring)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - level / 100) }}
          transition={{ duration: 1.2, delay: 0.25, ease: EASE }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold text-[#FFE29A]">
        {level}%
      </span>
    </div>
  );
}

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const tile = {
  hidden: { opacity: 0, y: 22, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EASE },
  },
};

export default function Skills() {
  const [active, setActive] = useState(0);
  const category = skillCategories[active];

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-[#120E06] py-24 sm:py-32"
    >
      <style>{marqueeCSS}</style>

      {/* Ambient glows */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-80 w-80 rounded-full bg-[#FFCB56]/10 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-[#F59E0B]/10 blur-[130px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-14 text-center"
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FFCB56]/30 bg-[#FFCB56]/5 px-4 py-1.5 text-sm text-[#FFE29A]">
            <Sparkles size={14} />
            What I work with
          </p>
          <h2 className="bg-gradient-to-r from-[#FFF7E3] via-[#FFCB56] to-[#F59E0B] bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
            My Skills
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            className="mx-auto mt-5 h-[3px] w-20 origin-center rounded-full bg-gradient-to-r from-[#FFCB56] to-[#F59E0B]"
          />
          <p className="mx-auto mt-5 max-w-xl text-[#FFF7E3]/65">
            A toolkit built through hands-on projects and continuous learning —
            from pixel-perfect frontends to scalable backend systems.
          </p>
        </motion.div>
      </div>

      {/* Logo marquee (full width, pauses on hover) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="skills-marquee-wrap relative mb-16 overflow-hidden py-2"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        }}
      >
        <div className="skills-marquee flex w-max gap-4">
          {[...allSkills, ...allSkills].map((s, i) => (
            <div
              key={`${s.name}-${i}`}
              className="flex items-center gap-3 rounded-2xl border border-[#FFF7E3]/10 bg-[#FFF7E3]/[0.04] py-2.5 pl-2.5 pr-5 backdrop-blur-sm transition-colors duration-300 hover:border-[#FFCB56]/50 hover:bg-[#FFCB56]/10"
            >
              <LogoChip slug={s.slug} name={s.name} size={40} />
              <span className="whitespace-nowrap text-sm font-medium text-[#FFF7E3]/85">
                {s.name}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          role="tablist"
          aria-label="Skill categories"
          className="mx-auto mb-10 flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-full border border-[#FFF7E3]/10 bg-[#FFF7E3]/[0.04] p-1.5 backdrop-blur-md"
        >
          {skillCategories.map((cat, i) => {
            const Icon = cat.icon;
            const isActive = active === i;
            return (
              <button
                key={cat.title}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(i)}
                className="relative rounded-full px-5 py-2.5 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFCB56]"
              >
                {isActive && (
                  <motion.span
                    layoutId="skill-tab"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FFCB56] to-[#F59E0B]"
                  />
                )}
                <span
                  className={`relative flex items-center gap-2 transition-colors duration-300 ${
                    isActive
                      ? "text-[#120E06]"
                      : "text-[#FFF7E3]/70 hover:text-[#FFCB56]"
                  }`}
                >
                  <Icon size={16} />
                  {cat.title}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Skill panel */}
        <div className="rounded-3xl border border-[#FFF7E3]/10 bg-[#FFF7E3]/[0.03] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={category.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-8 flex flex-wrap items-end justify-between gap-2">
                <div>
                  <h3 className="text-xl font-semibold text-[#FFF7E3]">
                    {category.title}
                  </h3>
                  <p className="mt-1 text-sm text-[#FFF7E3]/55">
                    {category.blurb}
                  </p>
                </div>
                <span className="rounded-full border border-[#FFCB56]/30 bg-[#FFCB56]/5 px-3 py-1 text-xs text-[#FFE29A]">
                  {category.skills.length} technologies
                </span>
              </div>

              <motion.div
                variants={grid}
                initial="hidden"
                animate="show"
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={tile}
                    whileHover={{ y: -6 }}
                    className="group flex items-center gap-4 rounded-2xl border border-[#FFF7E3]/10 bg-[#FFF7E3]/[0.04] p-4 transition-[border-color,background-color,box-shadow] duration-300 hover:border-[#FFCB56]/50 hover:bg-[#FFCB56]/[0.07] hover:shadow-[0_14px_40px_rgba(255,203,86,0.14)]"
                  >
                    <LogoChip slug={skill.slug} name={skill.name} size={48} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-[#FFF7E3] transition-colors duration-300 group-hover:text-[#FFCB56]">
                        {skill.name}
                      </p>
                      <p className="mt-0.5 text-xs text-[#FFF7E3]/50">
                        {skill.level >= 85
                          ? "Strong"
                          : skill.level >= 70
                            ? "Confident"
                            : "Growing"}
                      </p>
                    </div>
                    <Ring level={skill.level} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-[#FFF7E3]/10 bg-[#FFF7E3]/[0.03] px-4 py-5 text-center transition-colors duration-300 hover:border-[#FFCB56]/40"
            >
              <p className="bg-gradient-to-r from-[#FFCB56] to-[#F59E0B] bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-[#FFF7E3]/55">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
