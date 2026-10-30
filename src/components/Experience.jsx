import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useReducedMotion,
} from "framer-motion";
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

const EASE = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

/* Work image */
function WorkImage({ src, title }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#FFCB56]/25 via-[#F59E0B]/10 to-[#120E06]">
        <span className="text-3xl font-bold text-[#FFCB56]/80">
          {(title || "PR").slice(0, 2).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={title || "Project preview"}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-110"
    />
  );
}

/* Project gallery */
function WorkGallery({ work = [] }) {
  if (!work.length) return null;

  return (
    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {work.map((item, i) => (
        <motion.div
          key={item.title || i}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: i * 0.08,
            duration: 0.45,
            ease: EASE,
          }}
          className="group/card relative min-w-0 overflow-hidden rounded-2xl border border-[#FFF7E3]/10 bg-[#FFF7E3]/[0.03] transition-all duration-300 hover:border-[#FFCB56]/40 hover:shadow-[0_12px_40px_rgba(255,203,86,0.12)]"
        >
          <div className="relative aspect-video overflow-hidden bg-[#FFF7E3]/5">
            <WorkImage src={item.image} title={item.title} />

            {/* Always usable on mobile; hover overlay on desktop */}
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-3 bg-[#120E06]/85 p-3 backdrop-blur-sm transition-all duration-300 sm:inset-0 sm:bg-[#120E06]/80 sm:opacity-0 sm:group-hover/card:opacity-100">
              {item.liveUrl && (
                <a
                  href={item.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${item.title} live`}
                  className="flex min-h-9 items-center gap-1.5 rounded-full bg-gradient-to-r from-[#FFCB56] to-[#F59E0B] px-4 py-2 text-xs font-semibold text-[#120E06] transition-transform hover:scale-105"
                >
                  <ExternalLink size={13} />
                  Live
                </a>
              )}

              {item.githubUrl && (
                <a
                  href={item.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${item.title} source code`}
                  className="flex min-h-9 items-center gap-1.5 rounded-full border border-[#FFF7E3]/30 bg-[#FFF7E3]/10 px-4 py-2 text-xs font-semibold text-[#FFF7E3] transition-all hover:border-[#FFCB56]/70 hover:text-[#FFCB56]"
                >
                  <FaGithub size={13} />
                  Code
                </a>
              )}
            </div>
          </div>

          <div className="p-4">
            <h4 className="break-words text-sm font-semibold text-[#FFF7E3]">
              {item.title}
            </h4>

            {item.description && (
              <p className="mt-2 break-words text-xs leading-relaxed text-[#FFF7E3]/60">
                {item.description}
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* Experience section */
export default function Experience() {
  const [expanded, setExpanded] = useState(null);

  const timelineRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 60%"],
  });

  const fill = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  const toggleExpand = (id) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="experience"
      className="relative isolate w-full overflow-hidden bg-[#120E06] py-16 sm:py-20 md:py-28 lg:py-32"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute -right-32 top-0 h-72 w-72 rounded-full bg-[#FFCB56]/10 blur-[100px] sm:h-96 sm:w-96 sm:blur-[140px]" />

      <div className="pointer-events-none absolute -bottom-20 -left-32 h-72 w-72 rounded-full bg-[#F59E0B]/10 blur-[100px] sm:h-96 sm:w-96 sm:blur-[140px]" />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: reduceMotion ? 0 : 0.7,
            ease: EASE,
          }}
          className="mb-12 text-center sm:mb-16 md:mb-20"
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FFCB56]/30 bg-[#FFCB56]/5 px-4 py-1.5 text-xs text-[#FFE29A] sm:text-sm">
            <Sparkles size={14} />
            My Journey
          </p>

          <h2 className="bg-gradient-to-r from-[#FFF7E3] via-[#FFCB56] to-[#F59E0B] bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl md:text-5xl">
            Work Experience
          </h2>

          <motion.div
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: reduceMotion ? 0 : 0.9,
              delay: 0.3,
              ease: EASE,
            }}
            className="mx-auto mt-5 h-[3px] w-16 origin-center rounded-full bg-gradient-to-r from-[#FFCB56] to-[#F59E0B] sm:w-20"
          />

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#FFF7E3]/65 sm:text-base">
            Every project has sharpened my skills. Here&apos;s where I&apos;ve
            put them to work.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Timeline track */}
          <div className="absolute bottom-0 left-5 top-0 w-px -translate-x-1/2 bg-[#FFF7E3]/10 sm:left-6 md:left-1/2" />

          {/* Animated timeline */}
          <motion.div
            style={{ scaleY: fill, originY: 0 }}
            className="absolute bottom-0 left-5 top-0 w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#FFCB56] via-[#F59E0B] to-[#F59E0B]/40 shadow-[0_0_16px_rgba(255,203,86,0.6)] sm:left-6 md:left-1/2"
          />

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="space-y-10 sm:space-y-12 md:space-y-16"
          >
            {(experiences || []).map((exp, index) => {
              const Icon = exp.icon || Briefcase;
              const isOpen = expanded === exp.id;
              const onRight = index % 2 === 1;

              return (
                <div
                  key={exp.id}
                  className="relative min-w-0 pl-14 sm:pl-16 md:grid md:grid-cols-2 md:gap-x-12 md:pl-0 lg:gap-x-20"
                >
                  {/* Timeline node */}
                  <motion.div
                    initial={reduceMotion ? false : { scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 18,
                    }}
                    className="absolute left-0 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-xl border border-[#FFCB56]/40 bg-[#120E06] shadow-[0_0_25px_rgba(255,203,86,0.25)] sm:left-1 sm:h-12 sm:w-12 sm:rounded-2xl md:left-1/2 md:-translate-x-1/2"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#FFCB56] to-[#F59E0B] text-[#120E06] sm:h-9 sm:w-9 sm:rounded-xl">
                      <Icon size={17} />
                    </div>
                  </motion.div>

                  {/* Experience card */}
                  <motion.div
                    variants={{
                      hidden: {
                        opacity: 0,
                        x: reduceMotion ? 0 : onRight ? 30 : -30,
                        y: 20,
                        filter: "blur(6px)",
                      },
                      show: {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        filter: "blur(0px)",
                        transition: {
                          duration: reduceMotion ? 0 : 0.8,
                          ease: EASE,
                        },
                      },
                    }}
                    whileHover={reduceMotion ? {} : { y: -4 }}
                    className={`group min-w-0 rounded-2xl border border-[#FFF7E3]/10 bg-[#FFF7E3]/[0.04] p-4 backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-300 hover:border-[#FFCB56]/40 hover:bg-[#FFCB56]/[0.05] hover:shadow-[0_20px_60px_rgba(255,203,86,0.12)] sm:rounded-3xl sm:p-6 lg:p-8 ${
                      onRight ? "md:col-start-2" : "md:col-start-1"
                    }`}
                  >
                    {/* Card heading */}
                    <div className="flex min-w-0 items-start justify-between gap-3">
                      <div className="min-w-0">
                        <span className="inline-block max-w-full break-words rounded-full bg-gradient-to-r from-[#FFCB56] to-[#F59E0B] px-3 py-1 text-[11px] font-semibold text-[#120E06] sm:text-xs">
                          {exp.duration}
                        </span>

                        <h3 className="mt-3 break-words text-lg font-bold leading-snug text-[#FFF7E3] transition-colors duration-300 group-hover:text-[#FFCB56] sm:text-xl md:text-2xl">
                          {exp.role}
                        </h3>
                      </div>

                      <ArrowUpRight
                        size={19}
                        className="mt-1 shrink-0 text-[#FFF7E3]/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#FFCB56]"
                      />
                    </div>

                    {/* Company details */}
                    <div className="mt-4 flex flex-col gap-2 text-xs leading-relaxed text-[#FFF7E3]/65 sm:text-sm">
                      <span className="flex min-w-0 items-start gap-2">
                        <Briefcase
                          size={15}
                          className="mt-0.5 shrink-0 text-[#FFCB56]"
                        />
                        <span className="break-words">
                          {exp.company} · {exp.type}
                        </span>
                      </span>

                      <span className="flex min-w-0 items-start gap-2">
                        <MapPin
                          size={15}
                          className="mt-0.5 shrink-0 text-[#F59E0B]"
                        />
                        <span className="break-words">{exp.location}</span>
                      </span>

                      <span className="flex min-w-0 items-start gap-2">
                        <CalendarDays
                          size={15}
                          className="mt-0.5 shrink-0 text-[#FFE29A]"
                        />
                        <span>{exp.period}</span>
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="my-5 h-px w-full bg-gradient-to-r from-[#FFCB56]/40 via-[#FFF7E3]/10 to-transparent" />

                    {/* Description */}
                    <p className="text-sm leading-7 text-[#FFF7E3]/70 sm:text-[15px]">
                      {exp.description}
                    </p>

                    {/* Responsibilities */}
                    {!!exp.responsibilities?.length && (
                      <ul className="mt-5 space-y-3">
                        {exp.responsibilities.map((responsibility, i) => (
                          <motion.li
                            key={`${exp.id}-responsibility-${i}`}
                            initial={
                              reduceMotion ? false : { opacity: 0, x: -12 }
                            }
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              delay: reduceMotion ? 0 : 0.1 * i,
                              duration: reduceMotion ? 0 : 0.5,
                            }}
                            className="flex items-start gap-3 text-xs leading-6 text-[#FFF7E3]/65 sm:text-sm"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFCB56] shadow-[0_0_8px_#FFCB56]" />
                            <span className="min-w-0 break-words">
                              {responsibility}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    )}

                    {/* Skills tags */}
                    {!!exp.tags?.length && (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="max-w-full break-words rounded-full border border-[#FFCB56]/20 bg-[#FFCB56]/5 px-3 py-1.5 text-[11px] text-[#FFE29A] transition-colors duration-300 hover:border-[#FFCB56]/60 hover:bg-[#FFCB56]/10 sm:text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* See My Work */}
                    {!!exp.work?.length && (
                      <div className="mt-6 border-t border-[#FFF7E3]/10 pt-5">
                        <button
                          type="button"
                          onClick={() => toggleExpand(exp.id)}
                          aria-expanded={isOpen}
                          aria-controls={`experience-work-${exp.id}`}
                          className="flex min-h-11 w-full items-center justify-between gap-3 text-left text-sm font-semibold text-[#FFCB56] transition-colors duration-300 hover:text-[#FFE29A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFCB56]"
                        >
                          <span className="flex items-center gap-2">
                            See My Work
                            <span className="rounded-full bg-[#FFCB56]/10 px-2 py-0.5 text-[11px] text-[#FFE29A]">
                              {exp.work.length}
                            </span>
                          </span>

                          <motion.span
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{
                              duration: reduceMotion ? 0 : 0.3,
                            }}
                          >
                            <ChevronDown size={17} />
                          </motion.span>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              id={`experience-work-${exp.id}`}
                              key="gallery"
                              initial={
                                reduceMotion ? false : { height: 0, opacity: 0 }
                              }
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{
                                duration: reduceMotion ? 0 : 0.4,
                                ease: "easeInOut",
                              }}
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

          {/* Timeline end */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="absolute -bottom-3 left-5 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border border-[#FFCB56]/50 bg-[#120E06] sm:left-6 md:left-1/2"
          >
            <span className="h-2 w-2 rounded-full bg-[#FFCB56]" />
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: reduceMotion ? 0 : 0.6,
            delay: 0.3,
          }}
          className="mt-16 text-center sm:mt-20 md:mt-24"
        >
          <p className="mb-5 text-sm text-[#FFF7E3]/50">
            Interested in working together?
          </p>

          <a
            href="#contact"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FFCB56] to-[#F59E0B] px-6 py-3 text-sm font-semibold text-[#120E06] shadow-lg shadow-[#FFCB56]/20 transition-all duration-300 hover:scale-105 hover:shadow-[#FFCB56]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFCB56] sm:px-8"
          >
            Let&apos;s Work Together
            <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
