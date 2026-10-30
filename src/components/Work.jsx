import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, FolderGit2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import projects from "../data/projects";

const EASE = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

/* Project screenshot with fallback */
function ProjectImage({ src, title, reducedMotion }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    const initials = (title || "Project")
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();

    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#FFCB56]/25 via-[#F59E0B]/10 to-[#120E06]">
        <span className="text-3xl font-bold text-[#FFCB56]/80 sm:text-4xl">
          {initials}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`${title} screenshot`}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`h-full w-full object-cover ${
        reducedMotion
          ? ""
          : "transition-transform duration-700 ease-out group-hover:scale-105"
      }`}
    />
  );
}

export default function Work() {
  const shouldReduceMotion = useReducedMotion();

  const projectList = Array.isArray(projects) ? projects : [];

  return (
    <section
      id="work"
      className="relative isolate overflow-hidden bg-[#120E06] py-16 sm:py-20 lg:py-28"
    >
      {/* Background glows */}
      <div className="pointer-events-none absolute -right-24 top-1/3 h-64 w-64 rounded-full bg-[#FFCB56]/10 blur-[100px] sm:h-96 sm:w-96 sm:blur-[140px]" />

      <div className="pointer-events-none absolute -bottom-20 -left-24 h-64 w-64 rounded-full bg-[#F59E0B]/10 blur-[100px] sm:h-80 sm:w-80 sm:blur-[140px]" />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-9 text-center sm:mb-12 lg:mb-14"
        >
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#FFCB56]/30 bg-[#FFCB56]/5 px-3 py-1.5 text-xs text-[#FFE29A] sm:mb-4 sm:px-4 sm:text-sm">
            <FolderGit2 size={14} />
            Selected projects
          </p>

          <h2 className="bg-gradient-to-r from-[#FFF7E3] via-[#FFCB56] to-[#F59E0B] bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:text-5xl">
            See My Work
          </h2>

          {!shouldReduceMotion && (
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
              className="mx-auto mt-4 h-[3px] w-16 origin-center rounded-full bg-gradient-to-r from-[#FFCB56] to-[#F59E0B] sm:mt-5 sm:w-20"
            />
          )}

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#FFF7E3]/60 sm:mt-5 sm:text-base">
            A collection of projects built with creativity, problem-solving, and
            modern technologies.
          </p>
        </motion.div>

        {/* Project grid */}
        {projectList.length > 0 ? (
          <motion.div
            variants={shouldReduceMotion ? undefined : container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.08 }}
            className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
          >
            {projectList.map((project, index) => {
              const tags = Array.isArray(project.tech)
                ? project.tech
                : Array.isArray(project.tags)
                  ? project.tags
                  : Array.isArray(project.stack)
                    ? project.stack
                    : [];

              const projectKey = project.id ?? project.title ?? index;

              return (
                <motion.article
                  key={projectKey}
                  variants={shouldReduceMotion ? undefined : fadeUp}
                  whileHover={shouldReduceMotion ? undefined : { y: -5 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#FFF7E3]/10 bg-[#FFF7E3]/[0.04] backdrop-blur-sm transition-[border-color,box-shadow,background-color] duration-300 hover:border-[#FFCB56]/50 hover:bg-[#FFF7E3]/[0.06] hover:shadow-[0_18px_50px_rgba(255,203,86,0.14)]"
                >
                  {/* Top gold line */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-[#FFCB56] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Screenshot */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#FFF7E3]/5">
                    <ProjectImage
                      src={project.image}
                      title={project.title || "Project"}
                      reducedMotion={shouldReduceMotion}
                    />

                    {/* Action overlay: visible on mobile, hover on desktop */}
                    <div className="absolute inset-0 flex items-center justify-center gap-3 bg-[#120E06]/65 opacity-100 backdrop-blur-[2px] transition-all duration-300 sm:bg-[#120E06]/80 sm:opacity-0 sm:backdrop-blur-sm sm:group-hover:opacity-100">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} live demo`}
                          className="inline-flex min-h-9 items-center gap-2 rounded-full bg-gradient-to-r from-[#FFCB56] to-[#F59E0B] px-4 py-2 text-xs font-semibold text-[#120E06] transition-transform duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFCB56] sm:translate-y-3 sm:group-hover:translate-y-0"
                        >
                          <ExternalLink size={14} />
                          Live
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} source code`}
                          className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[#FFF7E3]/30 bg-[#FFF7E3]/10 px-4 py-2 text-xs font-semibold text-[#FFF7E3] transition-all duration-300 hover:border-[#FFCB56]/70 hover:text-[#FFCB56] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFCB56] sm:translate-y-3 sm:group-hover:translate-y-0"
                        >
                          <FaGithub size={14} />
                          Code
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Project information */}
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <h3 className="break-words text-base font-semibold leading-snug text-[#FFF7E3] transition-colors duration-300 group-hover:text-[#FFCB56] sm:text-lg">
                      {project.title}
                    </h3>

                    {project.description && (
                      <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-[#FFF7E3]/60 sm:text-sm sm:leading-6">
                        {project.description}
                      </p>
                    )}

                    {/* Technology tags */}
                    {tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                        {tags.slice(0, 4).map((tag, tagIndex) => (
                          <span
                            key={`${tag}-${tagIndex}`}
                            className="max-w-full break-words rounded-full border border-[#FFCB56]/20 bg-[#FFCB56]/5 px-2 py-1 text-[10px] text-[#FFE29A] sm:px-2.5 sm:text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Bottom links */}
                    <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#FFF7E3]/10 pt-4">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-[#FFCB56] transition-colors hover:text-[#FFE29A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FFCB56]"
                        >
                          <ExternalLink size={13} />
                          Live Demo
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-[#FFF7E3]/70 transition-colors hover:text-[#FFF7E3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FFCB56]"
                        >
                          <FaGithub size={14} />
                          Source Code
                        </a>
                      )}

                      {!project.liveUrl && !project.githubUrl && (
                        <span className="text-xs italic text-[#FFF7E3]/40">
                          Details coming soon
                        </span>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        ) : (
          <div className="rounded-2xl border border-[#FFF7E3]/10 bg-[#FFF7E3]/[0.03] px-4 py-12 text-center">
            <FolderGit2 size={30} className="mx-auto text-[#FFCB56]/60" />
            <p className="mt-3 text-sm text-[#FFF7E3]/60">
              No projects available yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
