import { motion, useReducedMotion } from "framer-motion";

const education = [
  {
    id: 1,
    degree: "B.Tech in Computer Science Engineering",
    institution: "Dr. Babasaheb Ambedkar Technological University",
    period: "2021 — 2025",
    location: "Maharashtra, India",
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
  },
  {
    id: 2,
    degree: "Maharashtra Board — XII (HSC)",
    institution: "Kai. Sau. G. F. Patil Junior College, Shahada",
    period: "2020 — 2021",
    location: "Shahada, Maharashtra",
    description:
      "Completed higher secondary education with a focus on Science stream. Built analytical and problem-solving skills that laid the groundwork for a career in technology.",
    highlights: ["Physics", "Chemistry", "Mathematics", "Biology"],
  },
  {
    id: 3,
    degree: "Maharashtra Board — X (SSC)",
    institution: "Kai. Sau. G. F. Patil Junior College, Shahada",
    period: "2018 — 2019",
    location: "Shahada, Maharashtra",
    description:
      "Completed secondary school education with strong academic foundation. Developed curiosity for mathematics and computers that sparked an interest in programming.",
    highlights: ["Mathematics", "Science", "English"],
  },
];

const EASE = [0.22, 1, 0.36, 1];

export default function Education() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="education"
      className="relative isolate w-full overflow-hidden bg-[#120E06] py-16 sm:py-20 md:py-28 lg:py-32"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute -right-32 -top-20 h-64 w-64 rounded-full bg-[#FFCB56]/10 blur-[100px] sm:h-80 sm:w-80 sm:blur-[140px]" />

      <div className="relative mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: reduceMotion ? 0 : 0.7,
            ease: EASE,
          }}
          className="mb-10 sm:mb-14 md:mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-[#FFF7E3] sm:text-4xl md:text-5xl">
            Education
          </h2>

          <motion.div
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: reduceMotion ? 0 : 0.9,
              delay: 0.2,
              ease: EASE,
            }}
            className="mt-4 h-[3px] w-14 origin-left rounded-full bg-[#FFCB56] sm:mt-5 sm:w-16"
          />

          <p className="mt-4 max-w-lg text-sm leading-7 text-[#FFF7E3]/60 sm:mt-5 sm:text-base">
            From school to a degree in Computer Science Engineering.
          </p>
        </motion.div>

        {/* Education entries */}
        <div>
          {education.map((edu, index) => (
            <motion.article
              key={edu.id}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: reduceMotion ? 0 : 0.7,
                delay: reduceMotion ? 0 : index * 0.08,
                ease: EASE,
              }}
              className="group relative grid min-w-0 gap-5 border-t border-[#FFF7E3]/10 py-7 sm:py-9 md:grid-cols-[160px_minmax(0,1fr)] md:gap-8 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-10 lg:py-10"
            >
              {/* Hover line */}
              <span className="absolute left-0 top-0 h-px w-0 bg-[#FFCB56] transition-all duration-700 ease-out group-hover:w-full" />

              {/* Date and location */}
              <div className="flex flex-wrap items-center justify-between gap-2 md:block">
                <p className="text-sm font-semibold tracking-wide text-[#FFCB56] sm:text-base">
                  {edu.period}
                </p>

                <p className="text-xs text-[#FFF7E3]/45 sm:text-sm md:mt-2">
                  {edu.location}
                </p>
              </div>

              {/* Education details */}
              <div className="min-w-0">
                <h3 className="break-words text-lg font-semibold leading-snug text-[#FFF7E3] transition-colors duration-300 group-hover:text-[#FFCB56] sm:text-xl md:text-2xl">
                  {edu.degree}
                </h3>

                <p className="mt-2 break-words text-sm leading-relaxed text-[#FFF7E3]/60 sm:text-base">
                  {edu.institution}
                </p>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#FFF7E3]/65 sm:mt-5 sm:text-[15px] sm:leading-8">
                  {edu.description}
                </p>

                {/* Subject tags */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {edu.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="inline-flex max-w-full items-center rounded-full border border-[#FFCB56]/15 bg-[#FFCB56]/[0.05] px-3 py-1.5 text-xs leading-relaxed text-[#FFE29A]/80 transition-colors duration-300 hover:border-[#FFCB56]/40 hover:bg-[#FFCB56]/10 sm:text-sm"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}

          <div className="border-t border-[#FFF7E3]/10" />
        </div>
      </div>
    </section>
  );
}
