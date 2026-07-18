import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  CalendarDays,
  MapPin,
  Sparkles,
  ArrowUpRight,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import experiences from "../data/experience";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

function WorkGallery({ work }) {
  if (!work || work.length === 0) return null;

  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {work.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
          className="group/card relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
        >
          {/* Screenshot */}
          <div className="relative aspect-video overflow-hidden bg-white/5">
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-110"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 flex items-center justify-center gap-3 bg-[#030712]/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover/card:opacity-100">
              {item.liveUrl && (
                <a
                  href={item.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 rounded-full bg-cyan-400 px-4 py-2 text-xs font-semibold text-[#030712] transition-transform duration-200 hover:scale-105"
                >
                  <ExternalLink size={13} />
                  Live
                </a>
              )}
              {item.githubUrl && (
                <a
                  href={item.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-transform duration-200 hover:scale-105"
                >
                  <Github size={13} />
                  Code
                </a>
              )}
            </div>
          </div>

          {/* Caption */}
          <div className="p-4">
            <h4 className="text-sm font-semibold text-white">{item.title}</h4>
            {item.description && (
              <p className="mt-1 text-xs text-gray-400 leading-relaxed">
                {item.description}
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Experience() {
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (id) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-[#030712] py-24 sm:py-32"
    >
      {/* Ambient glows */}
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-purple-500/10 blur-[140px]" />
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:72px_72px]" />

      <div className="relative max-w-5xl mx-auto px-6">
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
            My Journey
          </p>
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            Work{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="mt-4 mx-auto max-w-xl text-gray-400">
            Every project has sharpened my skills. Here's where I've put them to
            work.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ originY: 0 }}
            className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/60 via-purple-500/40 to-transparent sm:left-8"
          />

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-10"
          >
            {experiences.map((exp) => {
              const Icon = exp.icon;
              const isOpen = expanded === exp.id;

              return (
                <motion.div
                  key={exp.id}
                  variants={fadeUp}
                  className="relative pl-16 sm:pl-20"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 sm:left-2 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#030712] shadow-xl">
                    <div
                      className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-br ${exp.color}`}
                    >
                      <Icon size={18} className="text-[#030712]" />
                    </div>
                  </div>

                  {/* Card */}
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    className={`group rounded-3xl border ${exp.border} bg-white/[0.03] p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.06] hover:shadow-xl ${exp.glow}`}
                  >
                    {/* Card top row */}
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-bold text-white sm:text-2xl">
                            {exp.role}
                          </h3>
                          <span
                            className={`rounded-full bg-gradient-to-r ${exp.color} px-3 py-0.5 text-xs font-semibold text-[#030712]`}
                          >
                            {exp.duration}
                          </span>
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1.5">
                            <Briefcase size={14} className="text-cyan-400" />
                            {exp.company} · {exp.type}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin size={14} className="text-purple-400" />
                            {exp.location}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <CalendarDays size={14} className="text-gray-500" />
                            {exp.period}
                          </span>
                        </div>
                      </div>

                      <ArrowUpRight
                        size={20}
                        className="text-gray-600 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan-400"
                      />
                    </div>

                    {/* Divider */}
                    <div className="my-5 h-px w-full bg-white/5" />

                    {/* Description */}
                    <p className="leading-relaxed text-gray-400">
                      {exp.description}
                    </p>

                    {/* Responsibilities */}
                    <ul className="mt-5 space-y-2.5">
                      {exp.responsibilities.map((r, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.15 * i, duration: 0.5 }}
                          className="flex items-start gap-3 text-sm text-gray-400"
                        >
                          <span
                            className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${exp.dot}`}
                          />
                          {r}
                        </motion.li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400 transition-colors duration-300 hover:border-cyan-400/30 hover:text-cyan-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* See My Work toggle */}
                    {exp.work && exp.work.length > 0 && (
                      <div className="mt-6 pt-5 border-t border-white/5">
                        <button
                          onClick={() => toggleExpand(exp.id)}
                          className="flex w-full items-center justify-between text-sm font-semibold text-cyan-300 transition-colors duration-300 hover:text-cyan-200"
                        >
                          <span className="flex items-center gap-2">
                            See My Work
                            <span className="rounded-full bg-cyan-400/10 px-2 py-0.5 text-[11px] text-cyan-400">
                              {exp.work.length}
                            </span>
                          </span>
                          <motion.span
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown size={16} />
                          </motion.span>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <WorkGallery work={exp.work} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
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
            transition={{ delay: 0.6, duration: 0.4 }}
            className="absolute -bottom-3 left-[18px] sm:left-[26px] flex h-4 w-4 items-center justify-center rounded-full border border-purple-400/40 bg-[#030712]"
          >
            <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <p className="text-gray-500 mb-5 text-sm">
            Interested in working together?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 px-8 py-3 text-sm font-semibold text-[#030712] shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/40"
          >
            Let&apos;s Work Together
            <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}