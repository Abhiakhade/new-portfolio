import { motion, useReducedMotion } from "framer-motion";
import { Code2, Sparkles, Rocket, Database } from "lucide-react";

const techStack = [
  "HTML",
  "CSS",
  "JavaScript",
  "React.js",
  "Next.js",
  "Node.js",
  "Express",
  "MongoDB",
  "Tailwind CSS",
  "MySql",
  "Java",
  "Python",
  "C++",
  "Linux",
  "Docker",
];

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    desc: "Writing efficient, maintainable code that solves real-world problems.",
  },
  {
    icon: Database,
    title: "Full Stack",
    desc: "Comfortable across the stack — from databases to pixel-perfect UI.",
  },
  {
    icon: Rocket,
    title: "Always Learning",
    desc: "Constantly exploring new tools, frameworks, and AI technologies.",
  },
];

const EASE = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

const badgeContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.025 },
  },
};

const badge = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: EASE },
  },
};

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  const reveal = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.7, ease: EASE },
      };

  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-[#120E06] py-16 sm:py-20 lg:py-24"
    >
      {/* Background glows */}
      <div className="pointer-events-none absolute -left-32 top-1/4 h-64 w-64 rounded-full bg-[#FFCB56]/10 blur-[100px] sm:h-96 sm:w-96 sm:blur-[140px]" />

      <div className="pointer-events-none absolute -bottom-20 -right-32 h-64 w-64 rounded-full bg-[#F59E0B]/10 blur-[100px] sm:h-96 sm:w-96 sm:blur-[140px]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div {...reveal} className="mb-10 text-center sm:mb-14 lg:mb-16">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#FFCB56]/30 bg-[#FFCB56]/5 px-3 py-1.5 text-xs text-[#FFE29A] sm:mb-4 sm:px-4 sm:text-sm">
            <Sparkles size={14} />
            Get to know me
          </p>

          <h2 className="bg-gradient-to-r from-[#FFF7E3] via-[#FFCB56] to-[#F59E0B] bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:text-5xl">
            Who am I?
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
        </motion.div>

        {/* Main content */}
        <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          {/* Left: Avatar */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative mx-auto flex aspect-square w-full max-w-[280px] items-center justify-center sm:max-w-sm lg:max-w-md"
          >
            {/* Outer rotating ring */}
            <motion.div
              animate={shouldReduceMotion ? undefined : { rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 30,
                ease: "linear",
              }}
              className="absolute inset-0 rounded-full border border-dashed border-[#FFCB56]/30"
            >
              <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#FFCB56] shadow-[0_0_20px_#FFCB56]" />
            </motion.div>

            {/* Inner ring */}
            <motion.div
              animate={shouldReduceMotion ? undefined : { rotate: -360 }}
              transition={{
                repeat: Infinity,
                duration: 22,
                ease: "linear",
              }}
              className="absolute inset-[6%] rounded-full border border-[#F59E0B]/25"
            >
              <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#F59E0B] shadow-[0_0_14px_#F59E0B]" />
            </motion.div>

            {/* Glow */}
            <div className="pointer-events-none absolute h-2/3 w-2/3 rounded-full bg-[#FFCB56]/15 blur-[60px] sm:blur-[80px]" />

            {/* Profile card */}
            <div className="relative flex h-[82%] w-[82%] flex-col items-center justify-center rounded-2xl border border-[#FFF7E3]/10 bg-[#FFF7E3]/[0.05] p-4 text-center shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-md sm:rounded-3xl sm:p-6 md:p-8">
              <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#FFCB56]/60 to-transparent sm:inset-x-8" />

              <motion.div
                animate={shouldReduceMotion ? undefined : { y: [0, -7, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFCB56] to-[#F59E0B] text-2xl font-bold text-[#120E06] shadow-lg shadow-[#FFCB56]/30 sm:mb-5 sm:h-20 sm:w-20 sm:rounded-2xl sm:text-3xl md:h-24 md:w-24 md:text-4xl"
              >
                AA
              </motion.div>

              <h3 className="text-base font-semibold text-[#FFF7E3] sm:text-lg md:text-xl">
                Abhijit Akhade
              </h3>

              <p className="mt-1 text-xs text-[#FFF7E3]/60 sm:text-sm">
                Full Stack Developer · India
              </p>

              <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#FFCB56]/30 bg-[#FFCB56]/5 px-2.5 py-1 text-[10px] text-[#FFE29A] sm:mt-4 sm:px-3 sm:text-xs">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FFCB56]" />
                Open to opportunities
              </span>
            </div>
          </motion.div>

          {/* Right: About content */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.p
              variants={shouldReduceMotion ? undefined : item}
              className="text-sm leading-7 text-[#FFF7E3]/70 sm:text-base sm:leading-8"
            >
              Hi, I&apos;m{" "}
              <span className="font-semibold text-[#FFF7E3]">
                Abhijit Akhade
              </span>
              , a passionate Full Stack Developer and tech enthusiast from
              India. I enjoy building modern web applications, responsive user
              interfaces, and scalable backend systems.
            </motion.p>

            <motion.p
              variants={shouldReduceMotion ? undefined : item}
              className="mt-4 text-sm leading-7 text-[#FFF7E3]/70 sm:text-base sm:leading-8"
            >
              I mainly work with technologies like{" "}
              <span className="text-[#FFCB56]">React.js</span>,{" "}
              <span className="text-[#FFCB56]">Next.js</span>,{" "}
              <span className="text-[#FFCB56]">Node.js</span>,{" "}
              <span className="text-[#FFCB56]">Express</span>, and{" "}
              <span className="text-[#FFCB56]">MongoDB</span>. I love solving
              real-world problems through clean and efficient code.
            </motion.p>

            <motion.p
              variants={shouldReduceMotion ? undefined : item}
              className="mt-4 text-sm leading-7 text-[#FFF7E3]/70 sm:text-base sm:leading-8"
            >
              Currently, I&apos;m focused on improving my development skills,
              building personal projects, and exploring new technologies in web
              development and AI.
            </motion.p>

            {/* Tech stack */}
            <motion.div
              variants={shouldReduceMotion ? undefined : badgeContainer}
              className="mt-6 flex flex-wrap gap-2"
            >
              {techStack.map((tech) => (
                <motion.span
                  key={tech}
                  variants={shouldReduceMotion ? undefined : badge}
                  whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                  className="cursor-default rounded-full border border-[#FFF7E3]/10 bg-[#FFF7E3]/5 px-3 py-1.5 text-xs text-[#FFF7E3]/80 transition-colors duration-300 hover:border-[#FFCB56]/60 hover:bg-[#FFCB56]/10 hover:text-[#FFCB56] sm:px-4 sm:text-sm"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            {/* Highlight cards */}
            <motion.div
              variants={shouldReduceMotion ? undefined : item}
              className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3"
            >
              {highlights.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="group relative flex gap-3 overflow-hidden rounded-2xl border border-[#FFF7E3]/10 bg-[#FFF7E3]/[0.03] p-4 transition-all duration-300 hover:border-[#FFCB56]/40 hover:bg-[#FFCB56]/[0.06] hover:shadow-[0_12px_40px_rgba(255,203,86,0.12)] sm:flex-col sm:gap-0"
                >
                  <div className="mb-0 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFCB56] to-[#F59E0B] text-[#120E06] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 sm:mb-3">
                    <Icon size={18} />
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-[#FFF7E3]">
                      {title}
                    </h4>

                    <p className="mt-1 text-xs leading-relaxed text-[#FFF7E3]/55">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
