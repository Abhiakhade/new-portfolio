import { motion } from "framer-motion";

/* ---------- Palette (same as the rest of the site) ----------
   gold    #FFCB56  brand colour
   amber   #F59E0B  deeper accent
   ink     #120E06  page background
   cream   #FFF7E3  main text
-------------------------------------------------------------- */

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
  return (
    <section id="education" className="relative bg-[#120E06] py-24 sm:py-32">
      {/* one soft glow, nothing else */}
      <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 translate-x-1/3 rounded-full bg-[#FFCB56]/10 blur-[140px]" />

      <div className="relative mx-auto max-w-4xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight text-[#FFF7E3] sm:text-5xl">
            Education
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            className="mt-5 h-[3px] w-16 origin-left rounded-full bg-[#FFCB56]"
          />
          <p className="mt-5 max-w-lg text-[#FFF7E3]/60">
            From school to a degree in Computer Science Engineering.
          </p>
        </motion.div>

        {/* Entries */}
        <div>
          {education.map((edu) => (
            <motion.article
              key={edu.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="group relative grid gap-4 border-t border-[#FFF7E3]/10 py-10 md:grid-cols-[180px_1fr] md:gap-10"
            >
              {/* gold marker that grows on hover */}
              <span className="absolute left-0 top-0 h-px w-0 bg-[#FFCB56] transition-all duration-700 ease-out group-hover:w-full" />

              {/* Left: when + where */}
              <div>
                <p className="text-sm font-semibold text-[#FFCB56]">
                  {edu.period}
                </p>
                <p className="mt-1 text-sm text-[#FFF7E3]/45">{edu.location}</p>
              </div>

              {/* Right: what */}
              <div>
                <h3 className="text-xl font-semibold text-[#FFF7E3] transition-colors duration-300 group-hover:text-[#FFCB56] sm:text-2xl">
                  {edu.degree}
                </h3>
                <p className="mt-1 text-[#FFF7E3]/60">{edu.institution}</p>

                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#FFF7E3]/65">
                  {edu.description}
                </p>

                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#FFE29A]/80">
                  {edu.highlights.join(", ")}
                </p>
              </div>
            </motion.article>
          ))}
          <div className="border-t border-[#FFF7E3]/10" />
        </div>
      </div>
    </section>
  );
}
