import { motion } from "framer-motion";
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
  "Docker"
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

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#030712] py-24 sm:py-32"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-1.5 text-sm text-cyan-300">
            <Sparkles size={14} />
            Get to know me
          </p>
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            Who am{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              I?
            </span>
          </h2>
        </motion.div>

        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left: Visual / Avatar block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center"
          >
            {/* Rotating dashed ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-cyan-400/20"
            />
            {/* Inner gradient ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
              className="absolute inset-6 rounded-full border border-purple-500/20"
            />

            {/* Card */}
            <div className="relative flex h-[85%] w-[85%] flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
                className="mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 text-4xl font-bold text-white"
              >
                AA
              </motion.div>
              <h3 className="text-xl font-semibold text-white">
                Abhijit Akhade
              </h3>
              <p className="mt-1 text-sm text-gray-400">
                Full Stack Developer · India
              </p>
              <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-xs text-cyan-300">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
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
            <motion.p variants={item} className="leading-relaxed text-gray-400">
              Hi, I&apos;m{" "}
              <span className="font-semibold text-white">Abhijit Akhade</span>,
              a passionate Full Stack Developer and tech enthusiast from India.
              I enjoy building modern web applications, responsive user
              interfaces, and scalable backend systems.
            </motion.p>

            <motion.p
              variants={item}
              className="mt-4 leading-relaxed text-gray-400"
            >
              I mainly work with technologies like{" "}
              <span className="text-cyan-300">React.js</span>,{" "}
              <span className="text-cyan-300">Next.js</span>,{" "}
              <span className="text-cyan-300">Node.js</span>,{" "}
              <span className="text-cyan-300">Express</span>, and{" "}
              <span className="text-cyan-300">MongoDB</span>. I love solving
              real-world problems through clean and efficient code.
            </motion.p>

            <motion.p
              variants={item}
              className="mt-4 leading-relaxed text-gray-400"
            >
              Currently, I&apos;m focused on improving my development skills,
              building personal projects, and exploring new technologies in web
              development and AI.
            </motion.p>

            {/* Tech stack badges */}
            <motion.div variants={item} className="mt-2 flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-300 transition-colors duration-300 hover:border-cyan-400/40 hover:text-cyan-300"
                >
                  {tech}
                </span>
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
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[0.06]"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 text-cyan-300 transition-transform duration-300 group-hover:scale-110">
                    <Icon size={18} />
                  </div>
                  <h4 className="text-sm font-semibold text-white">{title}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-gray-500">
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
