import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, FolderGit2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import projects from "../data/projects";

/* ---------- Palette (same as Hero, Navbar & About) ----------
   gold    #FFCB56  brand colour
   amber   #F59E0B  deeper accent
   butter  #FFE29A  soft accent
   ink     #120E06  page background
   cream   #FFF7E3  main text
--------------------------------------------------------------- */

const EASE = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

/* Shows the screenshot, or a gold placeholder if it is missing / fails to load */
function ProjectImage({ src, title }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    const initials = title
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();

    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#FFCB56]/25 via-[#F59E0B]/10 to-[#120E06]">
        <span className="text-4xl font-bold text-[#FFCB56]/80">{initials}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`${title} screenshot`}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
    />
  );
}

export default function Work() {
  return (
    // id="projects" so the Navbar and Hero "View My Work" links scroll here
    <section
      id="projects"
      className="relative overflow-hidden bg-[#120E06] py-24 sm:py-28"
    >
      <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 translate-x-1/3 rounded-full bg-[#FFCB56]/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 -translate-x-1/3 rounded-full bg-[#F59E0B]/10 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-14 text-center"
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FFCB56]/30 bg-[#FFCB56]/5 px-4 py-1.5 text-sm text-[#FFE29A]">
            <FolderGit2 size={14} />
            Selected projects
          </p>
          <h2 className="bg-gradient-to-r from-[#FFF7E3] via-[#FFCB56] to-[#F59E0B] bg-clip-text text-3xl font-bold text-transparent sm:text-5xl">
            See My Work
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            className="mx-auto mt-5 h-[3px] w-20 origin-center rounded-full bg-gradient-to-r from-[#FFCB56] to-[#F59E0B]"
          />
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => {
            // optional fields: use whichever your data has
            const tags = project.tech || project.tags || project.stack || [];

            return (
              <motion.article
                key={project.title}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="group relative overflow-hidden rounded-2xl border border-[#FFF7E3]/10 bg-[#FFF7E3]/[0.04] backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-[#FFCB56]/50 hover:shadow-[0_18px_50px_rgba(255,203,86,0.14)]"
              >
                {/* gold light line on top edge */}
                <div className="absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-[#FFCB56] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Screenshot */}
                <div className="relative aspect-video overflow-hidden bg-[#FFF7E3]/5">
                  <ProjectImage src={project.image} title={project.title} />

                  {/* Hover overlay with actions */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 bg-[#120E06]/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.title} live demo`}
                        className="flex translate-y-3 items-center gap-2 rounded-full bg-gradient-to-r from-[#FFCB56] to-[#F59E0B] px-4 py-2 text-xs font-semibold text-[#120E06] transition-all duration-300 hover:scale-105 group-hover:translate-y-0"
                      >
                        <ExternalLink size={14} />
                        Live
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.title} source code`}
                        className="flex translate-y-3 items-center gap-2 rounded-full border border-[#FFF7E3]/30 bg-[#FFF7E3]/10 px-4 py-2 text-xs font-semibold text-[#FFF7E3] transition-all delay-75 duration-300 hover:border-[#FFCB56]/70 hover:text-[#FFCB56] group-hover:translate-y-0"
                      >
                        <FaGithub size={14} />
                        Code
                      </a>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="truncate text-lg font-semibold text-[#FFF7E3] transition-colors duration-300 group-hover:text-[#FFCB56]">
                    {project.title}
                  </h3>

                  {project.description && (
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#FFF7E3]/60">
                      {project.description}
                    </p>
                  )}

                  {tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[#FFCB56]/20 bg-[#FFCB56]/5 px-2.5 py-0.5 text-xs text-[#FFE29A]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
