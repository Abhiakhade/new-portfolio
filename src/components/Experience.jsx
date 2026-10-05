import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  Briefcase,
  CalendarDays,
  MapPin,
  Sparkles,
  ArrowUpRight,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import experiences from "../data/experience";

/* ---------- Palette (same as the rest of the site) ----------
   gold    #FFCB56  brand colour
   amber   #F59E0B  deeper accent
   butter  #FFE29A  soft accent
   ink     #120E06  page background
   cream   #FFF7E3  main text
-------------------------------------------------------------- */

const EASE = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

/* ---------- "See my work" gallery ---------- */

function WorkImage({ src, title }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#FFCB56]/25 via-[#F59E0B]/10 to-[#120E06]">
        <span className="text-3xl font-bold text-[#FFCB56]/80">
          {title.slice(0, 2).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={title}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-110"
    />
  );
}

function WorkGallery({ work }) {
  if (!work || work.length === 0) return null;

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {work.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.45, ease: EASE }}
          className="group/card relative overflow-hidden rounded-2xl border border-[#FFF7E3]/10 bg-[#FFF7E3]/[0.03] transition-[border-color,box-shadow] duration-300 hover:border-[#FFCB56]/40 hover:shadow-[0_12px_40px_rgba(255,203,86,0.12)]"
        >
          <div className="relative aspect-video overflow-hidden bg-[#FFF7E3]/5">
            <WorkImage src={item.image} title={item.title} />

            <div className="absolute inset-0 flex items-center justify-center gap-3 bg-[#120E06]/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover/card:opacity-100">
              {item.liveUrl && (
                <a
                  href={item.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#FFCB56] to-[#F59E0B] px-4 py-2 text-xs font-semibold text-[#120E06] transition-transform duration-200 hover:scale-105"
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
                  className="flex items-center gap-1.5 rounded-full border border-[#FFF7E3]/30 bg-[#FFF7E3]/10 px-4 py-2 text-xs font-semibold text-[#FFF7E3] transition-all duration-200 hover:scale-105 hover:border-[#FFCB56]/70 hover:text-[#FFCB56]"
                >
                  <FaGithub size={13} />
                  Code
                </a>
              )}
            </div>
          </div>

          <div className="p-4">
            <h4 className="text-sm font-semibold text-[#FFF7E3]">
              {item.title}
            </h4>
            {item.description && (
              <p className="mt-1 text-xs leading-relaxed text-[#FFF7E3]/60">
                {item.description}
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ---------- Section ---------- */

export default function Experience() {
  const [expanded, setExpanded] = useState(null);
  const timelineRef = useRef(null);

  // the gold line fills as you scroll down the timeline
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 60%"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  const toggleExpand = (id) => setExpanded((prev) => (prev === id ? null : id));

  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-[#120E06] py-24 sm:py-32"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 translate-x-1/3 rounded-full bg-[#FFCB56]/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 -translate-x-1/3 rounded-full bg-[#F59E0B]/10 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-20 text-center"
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FFCB56]/30 bg-[#FFCB56]/5 px-4 py-1.5 text-sm text-[#FFE29A]">
            <Sparkles size={14} />
            My Journey
          </p>
          <h2 className="bg-gradient-to-r from-[#FFF7E3] via-[#FFCB56] to-[#F59E0B] bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
            Work Experience
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            className="mx-auto mt-5 h-[3px] w-20 origin-center rounded-full bg-gradient-to-r from-[#FFCB56] to-[#F59E0B]"
          />
          <p className="mx-auto mt-5 max-w-xl text-[#FFF7E3]/65">
            Every project has sharpened my skills. Here&apos;s where I&apos;ve
            put them to work.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* track */}
          <div className="absolute bottom-0 left-6 top-0 w-px -translate-x-1/2 bg-[#FFF7E3]/10 md:left-1/2" />
          {/* gold fill that follows scroll */}
          <motion.div
            style={{ scaleY: fill, originY: 0 }}
            className="absolute bottom-0 left-6 top-0 w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#FFCB56] via-[#F59E0B] to-[#F59E0B]/40 shadow-[0_0_16px_rgba(255,203,86,0.6)] md:left-1/2"
          />

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="space-y-12 md:space-y-16"
          >
            {experiences.map((exp, index) => {
              const Icon = exp.icon || Briefcase;
              const isOpen = expanded === exp.id;
              const onRight = index % 2 === 1;

              return (
                <div
                  key={exp.id}
                  className="relative pl-16 md:grid md:grid-cols-2 md:gap-x-20 md:pl-0"
                >
                  {/* Timeline node */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="absolute left-0 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#FFCB56]/40 bg-[#120E06] shadow-[0_0_30px_rgba(255,203,86,0.25)] md:left-1/2 md:-translate-x-1/2"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFCB56] to-[#F59E0B] text-[#120E06]">
                      <Icon size={18} />
                    </div>
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    variants={{
                      hidden: {
                        opacity: 0,
                        x: onRight ? 50 : -50,
                        y: 20,
                        filter: "blur(6px)",
                      },
                      show: {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        filter: "blur(0px)",
                        transition: { duration: 0.8, ease: EASE },
                      },
                    }}
                    whileHover={{ y: -4 }}
                    className={`group rounded-3xl border border-[#FFF7E3]/10 bg-[#FFF7E3]/[0.04] p-6 backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-300 hover:border-[#FFCB56]/40 hover:bg-[#FFCB56]/[0.05] hover:shadow-[0_20px_60px_rgba(255,203,86,0.12)] sm:p-8 ${
                      onRight ? "md:col-start-2" : "md:col-start-1"
                    }`}
                  >
                    {/* top row */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="inline-block rounded-full bg-gradient-to-r from-[#FFCB56] to-[#F59E0B] px-3 py-0.5 text-xs font-semibold text-[#120E06]">
                          {exp.duration}
                        </span>
                        <h3 className="mt-3 text-xl font-bold text-[#FFF7E3] transition-colors duration-300 group-hover:text-[#FFCB56] sm:text-2xl">
                          {exp.role}
                        </h3>
                      </div>
                      <ArrowUpRight
                        size={20}
                        className="shrink-0 text-[#FFF7E3]/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#FFCB56]"
                      />
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#FFF7E3]/65">
                      <span className="flex items-center gap-1.5">
                        <Briefcase size={14} className="text-[#FFCB56]" />
                        {exp.company} · {exp.type}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-[#F59E0B]" />
                        {exp.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <CalendarDays size={14} className="text-[#FFE29A]" />
                        {exp.period}
                      </span>
                    </div>

                    <div className="my-5 h-px w-full bg-gradient-to-r from-[#FFCB56]/40 via-[#FFF7E3]/10 to-transparent" />

                    <p className="leading-relaxed text-[#FFF7E3]/70">
                      {exp.description}
                    </p>

                    <ul className="mt-5 space-y-2.5">
                      {exp.responsibilities.map((r, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 * i, duration: 0.5 }}
                          className="flex items-start gap-3 text-sm text-[#FFF7E3]/65"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFCB56] shadow-[0_0_8px_#FFCB56]" />
                          {r}
                        </motion.li>
                      ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[#FFCB56]/20 bg-[#FFCB56]/5 px-3 py-1 text-xs text-[#FFE29A] transition-colors duration-300 hover:border-[#FFCB56]/60 hover:bg-[#FFCB56]/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* See My Work toggle */}
                    {exp.work && exp.work.length > 0 && (
                      <div className="mt-6 border-t border-[#FFF7E3]/10 pt-5">
                        <button
                          type="button"
                          onClick={() => toggleExpand(exp.id)}
                          aria-expanded={isOpen}
                          className="flex w-full items-center justify-between text-sm font-semibold text-[#FFCB56] transition-colors duration-300 hover:text-[#FFE29A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFCB56]"
                        >
                          <span className="flex items-center gap-2">
                            See My Work
                            <span className="rounded-full bg-[#FFCB56]/10 px-2 py-0.5 text-[11px] text-[#FFE29A]">
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

                        <AnimatePresence initial={false}>
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
                </div>
              );
            })}
          </motion.div>

          {/* Timeline end dot */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="absolute -bottom-3 left-6 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border border-[#FFCB56]/50 bg-[#120E06] md:left-1/2"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#FFCB56]" />
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-24 text-center"
        >
          <p className="mb-5 text-sm text-[#FFF7E3]/50">
            Interested in working together?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FFCB56] to-[#F59E0B] px-8 py-3 text-sm font-semibold text-[#120E06] shadow-lg shadow-[#FFCB56]/20 transition-all duration-300 hover:scale-105 hover:shadow-[#FFCB56]/50"
          >
            Let&apos;s Work Together
            <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
