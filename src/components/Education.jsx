import { motion } from "framer-motion";
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  Award,
  Calendar,
  MapPin,
} from "lucide-react";

const education = [
  {
    id: 1,
    degree: "B.Tech in Computer Science Engineering",
    institution: "Dr. Babasaheb Ambedkar Technological University",
    period: "2021 — 2025",
    location: "Maharashtra, India",
    grade: "B.Tech Graduate",
    description:
      "Studied core computer science fundamentals including Data Structures, Algorithms, Operating Systems, Database Management, and Software Engineering. Built strong foundations in full-stack development and AI/ML.",
    highlights: [
      "Data Structures & Algorithms",
      "Operating Systems",
      "Object oriented Programming",
      "Database Management Systems",
      "Software Engineering",
      "Machine Learning",
      "Computer Networks",
    ],
    icon: GraduationCap,
    color: "from-cyan-400 to-blue-500",
    border: "border-cyan-400/25",
    glow: "hover:shadow-cyan-500/10",
    dot: "bg-cyan-400",
    badge: "B.Tech",
    badgeColor: "from-cyan-400 to-blue-500",
    featured: true,
  },
  {
    id: 2,
    degree: "Maharashtra Board — XII (HSC)",
    institution: "Kai. Sau. G. F. Patil Junior College, Shahada",
    period: "2020 — 2021",
    location: "Shahada, Maharashtra",
    grade: "Higher Secondary",
    description:
      "Completed higher secondary education with a focus on Science stream. Built analytical and problem-solving skills that laid the groundwork for a career in technology.",
    highlights: ["Physics", "Chemistry", "Mathematics","Biology"],
    icon: BookOpen,
    color: "from-purple-400 to-violet-600",
    border: "border-purple-400/25",
    glow: "hover:shadow-purple-500/10",
    dot: "bg-purple-400",
    badge: "HSC",
    badgeColor: "from-purple-400 to-violet-600",
    featured: false,
  },
  {
    id: 3,
    degree: "Maharashtra Board — X (SSC)",
    institution: "Kai. Sau. G. F. Patil Junior College, Shahada",
    period: "2018 — 2019",
    location: "Shahada, Maharashtra",
    grade: "Secondary School",
    description:
      "Completed secondary school education with strong academic foundation. Developed curiosity for mathematics and computers that sparked an interest in programming.",
    highlights: ["Mathematics", "Science", "English"],
    icon: Award,
    color: "from-emerald-400 to-teal-500",
    border: "border-emerald-400/25",
    glow: "hover:shadow-emerald-500/10",
    dot: "bg-emerald-400",
    badge: "SSC",
    badgeColor: "from-emerald-400 to-teal-500",
    featured: false,
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

export default function Education() {
  return (
    <section
      id="education"
      className="relative overflow-hidden bg-[#030712] py-24 sm:py-32"
    >
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-[130px]" />
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:72px_72px]" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-1.5 text-sm text-cyan-300">
            <Sparkles size={14} />
            Academic Background
          </p>
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            My{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Education
            </span>
          </h2>
          <p className="mt-4 mx-auto max-w-xl text-gray-400">
            A journey of continuous learning — from foundational schooling to a
            degree in Computer Science Engineering.
          </p>
        </motion.div>

        <div className="grid items-start gap-12 lg:grid-cols-[1fr_2fr]">
          {/* Left: Decorative Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="sticky top-32 hidden lg:flex flex-col items-center gap-6"
          >
            {/* Central glow orb */}
            <div className="relative flex h-64 w-64 items-center justify-center">
              {/* Rotating rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-cyan-400/15"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
                className="absolute inset-6 rounded-full border border-purple-400/15"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                className="absolute inset-12 rounded-full border border-dashed border-emerald-400/20"
              />

              {/* Center card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                }}
                className="relative flex h-28 w-28 flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl"
              >
                <GraduationCap size={36} className="text-cyan-400 mb-1" />
                <span className="text-xs text-gray-400 font-medium">
                  B.Tech
                </span>
                <span className="text-[10px] text-gray-600">
                  Computer Science Engineering
                </span>
              </motion.div>

              {/* Orbiting dots */}
              {[
                { color: "bg-cyan-400", top: "top-2", left: "left-1/2" },
                {
                  color: "bg-purple-400",
                  bottom: "bottom-2",
                  right: "right-8",
                },
                { color: "bg-emerald-400", top: "top-1/2", left: "left-2" },
              ].map((dot, i) => (
                <motion.span
                  key={i}
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    delay: i * 0.6,
                    ease: "easeInOut",
                  }}
                  className={`absolute h-2.5 w-2.5 rounded-full ${dot.color} ${dot.top || ""} ${dot.bottom || ""} ${dot.left || ""} ${dot.right || ""} shadow-lg`}
                />
              ))}
            </div>

            {/* Quick stats */}
            <div className="w-full space-y-3">
              {[
                { label: "Study", value: "Fulltime" },
                { label: "Degree Level", value: "B.Tech" },
                { label: "Graduation", value: "2025" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
                >
                  <span className="text-xs text-gray-500">{stat.label}</span>
                  <span className="text-sm font-semibold text-white">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              style={{ originY: 0 }}
              className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/50 via-purple-500/40 via-emerald-400/30 to-transparent sm:left-6"
            />

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="space-y-8"
            >
              {education.map((edu) => {
                const Icon = edu.icon;
                return (
                  <motion.div
                    key={edu.id}
                    variants={fadeUp}
                    className="relative pl-14 sm:pl-16"
                  >
                    {/* Timeline icon node */}
                    <div className="absolute left-0 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-white/10 bg-[#030712] shadow-xl">
                      <div
                        className={`flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-gradient-to-br ${edu.color}`}
                      >
                        <Icon size={15} className="text-[#030712]" />
                      </div>
                    </div>

                    {/* Card */}
                    <motion.div
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                      className={`group rounded-3xl border ${edu.border} bg-white/[0.03] p-6 sm:p-7 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.055] hover:shadow-2xl ${edu.glow}`}
                    >
                      {/* Card top */}
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                        <div className="flex-1">
                          {/* Period */}
                          <div className="flex items-center gap-1.5 mb-2">
                            <Calendar size={12} className="text-gray-500" />
                            <span
                              className={`text-xs font-semibold bg-gradient-to-r ${edu.badgeColor} bg-clip-text text-transparent`}
                            >
                              {edu.period}
                            </span>
                          </div>

                          <h3 className="text-lg font-bold text-white leading-snug sm:text-xl">
                            {edu.degree}
                          </h3>

                          <div className="mt-1.5 flex flex-wrap items-center gap-3 text-sm text-gray-400">
                            <span className="flex items-center gap-1.5">
                              <BookOpen size={13} className="text-gray-600" />
                              {edu.institution}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <MapPin size={12} className="text-gray-600" />
                              {edu.location}
                            </span>
                          </div>
                        </div>

                        {/* Badge */}
                        <span
                          className={`rounded-full bg-gradient-to-r ${edu.badgeColor} px-3 py-1 text-xs font-bold text-[#030712] shrink-0`}
                        >
                          {edu.badge}
                        </span>
                      </div>

                      {/* Divider */}
                      <div className="my-4 h-px w-full bg-white/5" />

                      {/* Description */}
                      <p className="text-sm leading-relaxed text-gray-400">
                        {edu.description}
                      </p>

                      {/* Subjects/Highlights */}
                      <div className="mt-5">
                        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-600">
                          Key Subjects
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {edu.highlights.map((h, i) => (
                            <motion.span
                              key={h}
                              initial={{ opacity: 0, scale: 0.85 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.05 * i, duration: 0.35 }}
                              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400 transition-colors duration-200 hover:border-cyan-400/30 hover:text-cyan-300"
                            >
                              {h}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Timeline end dot */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="absolute -bottom-3 left-[14px] sm:left-[18px] flex h-4 w-4 items-center justify-center rounded-full border border-emerald-400/30 bg-[#030712]"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
