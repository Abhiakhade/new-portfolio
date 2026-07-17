import { motion } from "framer-motion";
import { Sparkles, Layers, Server, Database, Terminal } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend",
    icon: Layers,
    color: "from-cyan-400 to-blue-500",
    border: "border-cyan-400/20",
    glow: "hover:shadow-cyan-500/10",
    skills: [
      { name: "HTML", level: 95, icon: "🌐" },
      { name: "CSS", level: 90, icon: "🎨" },
      { name: "JavaScript", level: 88, icon: "⚡" },
      { name: "React.js", level: 85, icon: "⚛️" },
      { name: "Next.js", level: 80, icon: "▲" },
      { name: "Tailwind CSS", level: 92, icon: "🌊" },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    color: "from-purple-400 to-pink-500",
    border: "border-purple-400/20",
    glow: "hover:shadow-purple-500/10",
    skills: [
      { name: "Node.js", level: 82, icon: "🟢" },
      { name: "Express", level: 80, icon: "🚀" },
      { name: "Java", level: 72, icon: "☕" },
      { name: "Python", level: 70, icon: "🐍" },
      { name: "C++", level: 65, icon: "⚙️" },
    ],
  },
  {
    title: "Database & DevOps",
    icon: Database,
    color: "from-emerald-400 to-cyan-500",
    border: "border-emerald-400/20",
    glow: "hover:shadow-emerald-500/10",
    skills: [
      { name: "MongoDB", level: 82, icon: "🍃" },
      { name: "MySQL", level: 75, icon: "🐬" },
      { name: "Linux", level: 70, icon: "🐧" },
      { name: "Docker", level: 60, icon: "🐳" },
    ],
  },
];

const allSkills = [
  { name: "HTML", icon: "🌐" },
  { name: "CSS", icon: "🎨" },
  { name: "JavaScript", icon: "⚡" },
  { name: "React.js", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "Node.js", icon: "🟢" },
  { name: "Express", icon: "🚀" },
  { name: "MongoDB", icon: "🍃" },
  { name: "Tailwind CSS", icon: "🌊" },
  { name: "MySQL", icon: "🐬" },
  { name: "Java", icon: "☕" },
  { name: "Python", icon: "🐍" },
  { name: "C++", icon: "⚙️" },
  { name: "Linux", icon: "🐧" },
  { name: "Docker", icon: "🐳" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

function SkillBar({ name, level, icon, color }) {
  return (
    <motion.div variants={fadeUp} className="group">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base leading-none">{icon}</span>
          <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-200">
            {name}
          </span>
        </div>
        <span className="text-xs font-mono text-gray-500 group-hover:text-cyan-400 transition-colors duration-200">
          {level}%
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
        />
      </div>
    </motion.div>
  );
}

function FloatingOrb({ className }) {
  return (
    <motion.div
      animate={{ y: [0, -18, 0], rotate: [0, 5, 0] }}
      transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
      className={className}
    />
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-[#030712] py-24 sm:py-32"
    >
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 h-80 w-80 rounded-full bg-cyan-500/10 blur-[130px]" />
      <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-purple-500/10 blur-[130px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:72px_72px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-1.5 text-sm text-cyan-300">
            <Sparkles size={14} />
            What I work with
          </p>
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            My{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <p className="mt-4 mx-auto max-w-xl text-gray-400">
            A toolkit built through hands-on projects and continuous learning —
            from pixel-perfect frontends to scalable backend systems.
          </p>
        </motion.div>

        {/* Floating skill bubble belt */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex flex-wrap justify-center gap-3"
        >
          {allSkills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.4, ease: "easeOut" }}
              whileHover={{ y: -6, scale: 1.08 }}
              className="flex cursor-default items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-gray-300 backdrop-blur-sm transition-colors duration-300 hover:border-cyan-400/40 hover:text-white"
            >
              <span className="text-base leading-none">{skill.icon}</span>
              {skill.name}
            </motion.div>
          ))}
        </motion.div>

        {/* Category cards with skill bars */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {skillCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className={`group rounded-3xl border ${cat.border} bg-white/[0.03] p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.05] hover:shadow-2xl ${cat.glow}`}
              >
                {/* Card header */}
                <div className="mb-6 flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${cat.color} shadow-lg`}
                  >
                    <Icon size={20} className="text-[#030712]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{cat.title}</h3>
                    <p className="text-xs text-gray-500">
                      {cat.skills.length} technologies
                    </p>
                  </div>
                </div>

                {/* Skill bars */}
                <motion.div
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  {cat.skills.map((skill) => (
                    <SkillBar key={skill.name} {...skill} color={cat.color} />
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {[
            { label: "Technologies", value: "15+" },
            { label: "Projects Built", value: "12+" },
            { label: "Working Ability", value: "100%" },
            { label: "Learning", value: "∞" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5 text-center"
            >
              <p className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
