import { motion } from "framer-motion";
import { Code2, Sparkles, Rocket, Database } from "lucide-react";

/* ---------- Palette (same as Hero & Navbar) ----------
   gold    #FFCB56  brand colour
   amber   #F59E0B  deeper accent
   butter  #FFE29A  soft accent
   ink     #120E06  page background
   cream   #FFF7E3  main text
------------------------------------------------------ */

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
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

const badgeContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035 } },
};

const badge = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE } },
};

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#120E06] py-24 sm:py-32"
    >
      {/* Background glows */}
      <div className="pointer-events-none absolute left-0 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-[#FFCB56]/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 translate-x-1/3 rounded-full bg-[#F59E0B]/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-16 text-center"
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FFCB56]/30 bg-[#FFCB56]/5 px-4 py-1.5 text-sm text-[#FFE29A]">
            <Sparkles size={14} />
            Get to know me
          </p>
          <h2 className="bg-gradient-to-r from-[#FFF7E3] via-[#FFCB56] to-[#F59E0B] bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
            Who am I?
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            className="mx-auto mt-5 h-[3px] w-20 origin-center rounded-full bg-gradient-to-r from-[#FFCB56] to-[#F59E0B]"
          />
        </motion.div>

        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left: Visual / Avatar block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center"
          >
            {/* Outer rotating dashed ring with orbiting dot */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-[#FFCB56]/30"
            >
              <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#FFCB56] shadow-[0_0_20px_#FFCB56]" />
            </motion.div>

            {/* Inner counter-rotating ring with orbiting dot */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
              className="absolute inset-6 rounded-full border border-[#F59E0B]/25"
            >
              <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#F59E0B] shadow-[0_0_14px_#F59E0B]" />
            </motion.div>

            {/* Glow behind card */}
            <div className="absolute h-2/3 w-2/3 rounded-full bg-[#FFCB56]/15 blur-[80px]" />

            {/* Card */}
            <div className="relative flex h-[85%] w-[85%] flex-col items-center justify-center rounded-3xl border border-[#FFF7E3]/10 bg-[#FFF7E3]/[0.05] p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-md">
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#FFCB56]/60 to-transparent" />

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
                className="mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FFCB56] to-[#F59E0B] text-4xl font-bold text-[#120E06] shadow-lg shadow-[#FFCB56]/30"
              >
                AA
              </motion.div>
              <h3 className="text-xl font-semibold text-[#FFF7E3]">
                Abhijit Akhade
              </h3>
              <p className="mt-1 text-sm text-[#FFF7E3]/60">
                Full Stack Developer · India
              </p>
              <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#FFCB56]/30 bg-[#FFCB56]/5 px-3 py-1 text-xs text-[#FFE29A]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FFCB56]" />
                Open to opportunities
              </span>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.p
              variants={item}
              className="leading-relaxed text-[#FFF7E3]/70"
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
              variants={item}
              className="mt-4 leading-relaxed text-[#FFF7E3]/70"
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
              variants={item}
              className="mt-4 leading-relaxed text-[#FFF7E3]/70"
            >
              Currently, I&apos;m focused on improving my development skills,
              building personal projects, and exploring new technologies in web
              development and AI.
            </motion.p>

            {/* Tech stack badges */}
            <motion.div
              variants={badgeContainer}
              className="mt-6 flex flex-wrap gap-2"
            >
              {techStack.map((tech) => (
                <motion.span
                  key={tech}
                  variants={badge}
                  whileHover={{ y: -3 }}
                  className="cursor-default rounded-full border border-[#FFF7E3]/10 bg-[#FFF7E3]/5 px-4 py-1.5 text-sm text-[#FFF7E3]/80 transition-colors duration-300 hover:border-[#FFCB56]/60 hover:bg-[#FFCB56]/10 hover:text-[#FFCB56]"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            {/* Highlight cards */}
            <motion.div
              variants={item}
              className="mt-10 grid gap-4 sm:grid-cols-3"
            >
              {highlights.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="group relative overflow-hidden rounded-2xl border border-[#FFF7E3]/10 bg-[#FFF7E3]/[0.03] p-4 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#FFCB56]/40 hover:bg-[#FFCB56]/[0.06] hover:shadow-[0_12px_40px_rgba(255,203,86,0.12)]"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFCB56] to-[#F59E0B] text-[#120E06] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <Icon size={18} />
                  </div>
                  <h4 className="text-sm font-semibold text-[#FFF7E3]">
                    {title}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-[#FFF7E3]/55">
                    {desc}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
