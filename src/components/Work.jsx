import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import projects from "../data/projects";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Work() {
  return (
    <section id="work" className="relative bg-[#030712] py-16">
      <div className="relative max-w-5xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            See My{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Work
            </span>
          </h2>
        </motion.div>

        {/* Compact grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-colors duration-300 hover:border-cyan-400/30"
            >
              {/* Screenshot */}
              <div className="relative aspect-video overflow-hidden bg-white/5">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-[#030712]/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400 text-[#030712] transition-transform duration-200 hover:scale-110"
                    >
                      <ExternalLink size={13} />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-transform duration-200 hover:scale-110"
                    >
                      <FaGithub size={13} />
                    </a>
                  )}
                </div>
              </div>

              {/* Title only */}
              <div className="p-3">
                <h3 className="truncate text-sm font-semibold text-white">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}