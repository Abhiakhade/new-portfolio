import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  ExternalLink,
  Code2,
  Brain,
  Building2,
  Dumbbell,
  ShoppingCart,
  Globe,
  NotebookPen,
  LayoutDashboard,
  Briefcase,
  Users,
  Star,
  Server,
  LineChart,
  FileText,
  ChevronDown,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

const GH = "https://github.com/Abhiakhade";
const PROFILE = GH;

const preview = (repo) =>
  `https://opengraph.githubassets.com/1/Abhiakhade/${repo}`;

const filters = ["All", "Full Stack", "AI/ML", "Frontend", "Backend"];
const INITIAL_VISIBLE = 6;
const EASE = [0.22, 1, 0.36, 1];

const projects = [
  {
    id: 1,
    title: "Brain Tumor Detection",
    subtitle: "AI-Powered Medical Imaging",
    description:
      "An AI-powered brain tumor detection system using deep learning and medical image processing. Analyzes MRI scan images to identify brain tumors with high accuracy using TensorFlow and OpenCV.",
    role: "AI & Machine Learning Developer",
    category: "AI/ML",
    icon: Brain,
    tags: ["Python", "TensorFlow", "OpenCV", "NumPy", "Deep Learning"],
    github: `${GH}/brain-tumor-detection`,
    live: null,
    featured: true,
    screenshot: preview("brain-tumor-detection"),
  },
  {
    id: 2,
    title: "Dhaani Properties",
    subtitle: "Real Estate Web Platform",
    description:
      "A modern and responsive real estate web application for property listing and management. Users can explore property details, search listings, and contact property owners seamlessly.",
    role: "Full Stack Developer",
    category: "Full Stack",
    icon: Building2,
    tags: ["React", "Next.js", "Tailwind CSS", "MongoDB", "Node.js"],
    github: `${GH}/dhaani-properties`,
    live: null,
    featured: true,
    screenshot: preview("dhaani-properties"),
  },
  {
    id: 3,
    title: "Gym Website",
    subtitle: "Fitness & Wellness Platform",
    description:
      "A responsive gym and fitness website with modern UI, membership plans, trainer profiles, workout programs, and contact functionality. Focused on animations and mobile-first design.",
    role: "Frontend Developer",
    category: "Frontend",
    icon: Dumbbell,
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap", "React"],
    github: PROFILE,
    live: null,
    featured: false,
    screenshot: null,
  },
  {
    id: 4,
    title: "Java E-Commerce",
    subtitle: "Backend Commerce System",
    description:
      "A Java-based e-commerce application with user authentication, product management, shopping cart, and order processing. Integrated MySQL database with efficient backend logic.",
    role: "Backend Developer",
    category: "Backend",
    icon: ShoppingCart,
    tags: ["Java", "MySQL", "JDBC", "OOP", "Database Management"],
    github: `${GH}/Java-Ecoommerce-project`,
    live: null,
    featured: false,
    screenshot: preview("Java-Ecoommerce-project"),
  },
  {
    id: 5,
    title: "Developer Portfolio",
    subtitle: "Personal Portfolio Website",
    description:
      "A sleek and modern developer portfolio showcasing projects, experience, skills, and blogs. Features smooth animations, responsive design, and optimized performance.",
    role: "Full Stack Developer",
    category: "Full Stack",
    icon: Globe,
    tags: ["React", "Framer Motion", "Tailwind CSS", "Three.js"],
    github: `${GH}/new-portfolio`,
    live: "https://abhiakhadeport.netlify.app/",
    featured: true,
    screenshot: preview("new-portfolio"),
  },
  {
    id: 6,
    title: "REST API Service",
    subtitle: "Scalable Backend API",
    description:
      "A production-ready RESTful API built with Node.js and Express featuring JWT authentication, role-based access control, rate limiting, and full CRUD operations with MongoDB.",
    role: "Backend Developer",
    category: "Backend",
    icon: Code2,
    tags: ["Node.js", "Express", "MongoDB", "JWT", "REST API"],
    github: PROFILE,
    live: null,
    featured: false,
    screenshot: null,
  },
  {
    id: 7,
    title: "Notes Tech",
    subtitle: "Notes Management System",
    description:
      "A full-stack notes management application with Firebase authentication, an Express.js API and a MongoDB Atlas database.",
    role: "Full Stack Developer",
    category: "Full Stack",
    icon: NotebookPen,
    tags: ["React", "Firebase Auth", "Express", "MongoDB Atlas"],
    github: `${GH}/Notes-tech`,
    live: null,
    featured: true,
    screenshot: preview("Notes-tech"),
  },
  {
    id: 8,
    title: "Three D Bharat",
    subtitle: "Investor Dashboard",
    description:
      "An investor dashboard built with TypeScript, focused on presenting information clearly.",
    role: "Frontend Developer",
    category: "Frontend",
    icon: LayoutDashboard,
    tags: ["TypeScript", "React", "Dashboard"],
    github: `${GH}/three-d-bharat`,
    live: null,
    featured: false,
    screenshot: preview("three-d-bharat"),
  },
  {
    id: 9,
    title: "Dhaani Properties API",
    subtitle: "Real Estate Backend",
    description:
      "The Node.js backend that powers the Dhaani Properties website.",
    role: "Backend Developer",
    category: "Backend",
    icon: Server,
    tags: ["Node.js", "Express", "JavaScript"],
    github: `${GH}/dhaani-properties-backend`,
    live: null,
    featured: false,
    screenshot: preview("dhaani-properties-backend"),
  },
  {
    id: 10,
    title: "Job Portal",
    subtitle: "Jobs Website",
    description: "A jobs website where people can browse and find openings.",
    role: "Full Stack Developer",
    category: "Full Stack",
    icon: Briefcase,
    tags: ["JavaScript", "React"],
    github: `${GH}/job-portal`,
    live: null,
    featured: false,
    screenshot: preview("job-portal"),
  },
  {
    id: 11,
    title: "CRM AI",
    subtitle: "Customer Relationship App",
    description: "A CRM application project built in JavaScript.",
    role: "Full Stack Developer",
    category: "Full Stack",
    icon: Users,
    tags: ["JavaScript"],
    github: `${GH}/Crm-ai`,
    live: null,
    featured: false,
    screenshot: preview("Crm-ai"),
  },
  {
    id: 12,
    title: "Rating System",
    subtitle: "Ratings & Reviews",
    description: "A rating system project built in JavaScript.",
    role: "Full Stack Developer",
    category: "Full Stack",
    icon: Star,
    tags: ["JavaScript"],
    github: `${GH}/Rating-system-as`,
    live: null,
    featured: false,
    screenshot: preview("Rating-system-as"),
  },
  {
    id: 13,
    title: "End-to-End Recommender",
    subtitle: "Recommendation System",
    description: "An end-to-end recommendation system built in Python.",
    role: "AI & Machine Learning Developer",
    category: "AI/ML",
    icon: Sparkles,
    tags: ["Python", "Machine Learning"],
    github: `${GH}/end-to-end`,
    live: null,
    featured: false,
    screenshot: preview("end-to-end"),
  },
  {
    id: 14,
    title: "Churn Prediction",
    subtitle: "Customer Churn Model",
    description:
      "A machine learning project that predicts which customers are likely to churn.",
    role: "AI & Machine Learning Developer",
    category: "AI/ML",
    icon: LineChart,
    tags: ["Python", "Machine Learning"],
    github: `${GH}/churn-prediction`,
    live: null,
    featured: false,
    screenshot: preview("churn-prediction"),
  },
  {
    id: 15,
    title: "Resume Website",
    subtitle: "Online Resume",
    description: "An online resume website built with React.",
    role: "Frontend Developer",
    category: "Frontend",
    icon: FileText,
    tags: ["React", "JavaScript"],
    github: `${GH}/resume`,
    live: null,
    featured: false,
    screenshot: preview("resume"),
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
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

function ProjectCard({ project, reducedMotion }) {
  const Icon = project.icon;
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = Boolean(project.screenshot) && !imgFailed;

  return (
    <motion.article
      variants={reducedMotion ? undefined : fadeUp}
      layout={!reducedMotion}
      whileHover={reducedMotion ? undefined : { y: -5 }}
      transition={{ duration: 0.3 }}
      className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#FFF7E3]/10 bg-[#FFF7E3]/[0.03] backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-300 hover:border-[#FFCB56]/40 hover:bg-[#FFCB56]/[0.05] hover:shadow-[0_20px_60px_rgba(255,203,86,0.12)] sm:rounded-3xl"
    >
      {/* Project preview */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-[#FFCB56]/20 via-[#F59E0B]/10 to-[#120E06]">
        {showImage && (
          <img
            src={project.screenshot}
            alt={`${project.title} preview`}
            loading="lazy"
            onError={() => setImgFailed(true)}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}

        {showImage && (
          <div className="absolute inset-0 bg-gradient-to-t from-[#120E06]/80 via-[#120E06]/10 to-transparent" />
        )}

        {/* Project icon */}
        {showImage ? (
          <div className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFCB56] to-[#F59E0B] text-[#120E06] shadow-lg sm:bottom-4 sm:left-4 sm:h-10 sm:w-10">
            <Icon size={18} />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={reducedMotion ? undefined : { y: [0, -7, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
              }}
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FFCB56] to-[#F59E0B] shadow-2xl shadow-[#FFCB56]/20 sm:h-16 sm:w-16"
            >
              <Icon size={28} className="text-[#120E06]" />
            </motion.div>
          </div>
        )}

        {/* Featured label */}
        {project.featured && (
          <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
            <span className="flex items-center gap-1.5 rounded-full border border-[#FFCB56]/40 bg-[#120E06]/75 px-2.5 py-1 text-[10px] font-medium text-[#FFE29A] backdrop-blur-sm sm:text-xs">
              <Sparkles size={11} />
              Featured
            </span>
          </div>
        )}

        {/* Quick links: visible on touch and desktop */}
        <div className="absolute right-3 top-3 flex gap-2 sm:right-4 sm:top-4 sm:opacity-0 sm:transition-opacity sm:duration-300 sm:group-hover:opacity-100">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source code`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#FFF7E3]/20 bg-[#120E06]/80 text-[#FFF7E3] backdrop-blur-sm transition-colors hover:border-[#FFCB56]/70 hover:text-[#FFCB56] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FFCB56]"
            >
              <FaGithub size={15} />
            </a>
          )}

          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#FFF7E3]/20 bg-[#120E06]/80 text-[#FFF7E3] backdrop-blur-sm transition-colors hover:border-[#FFCB56]/70 hover:text-[#FFCB56] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FFCB56]"
            >
              <ExternalLink size={15} />
            </a>
          )}
        </div>
      </div>

      {/* Project details */}
      <div className="flex flex-1 flex-col p-4 sm:p-5 lg:p-6">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="mb-1 text-[11px] text-[#FFF7E3]/50 sm:text-xs">
              {project.subtitle}
            </p>

            <h3 className="break-words text-base font-bold leading-snug text-[#FFF7E3] transition-colors duration-300 group-hover:text-[#FFCB56] sm:text-lg">
              {project.title}
            </h3>
          </div>

          <span className="max-w-[40%] shrink-0 rounded-full bg-gradient-to-r from-[#FFCB56] to-[#F59E0B] px-2 py-1 text-center text-[9px] font-semibold leading-tight text-[#120E06] sm:px-2.5 sm:text-[10px]">
            {project.category}
          </span>
        </div>

        <p className="mt-3 flex-1 text-xs leading-relaxed text-[#FFF7E3]/65 sm:text-sm sm:leading-6">
          {project.description}
        </p>

        <div className="mt-4 flex min-w-0 items-center gap-2">
          <Code2 size={13} className="shrink-0 text-[#FFCB56]/70" />
          <span className="text-[10px] text-[#FFF7E3]/55 sm:text-xs">
            {project.role}
          </span>
        </div>

        {/* Technology tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#FFCB56]/20 bg-[#FFCB56]/5 px-2 py-1 text-[9px] text-[#FFE29A] sm:px-2.5 sm:text-[11px]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Project links */}
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#FFF7E3]/10 pt-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] text-[#FFF7E3]/70 transition-colors duration-200 hover:text-[#FFF7E3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FFCB56] sm:text-xs"
            >
              <FaGithub size={14} />
              Source Code
            </a>
          )}

          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] text-[#FFCB56] transition-colors duration-200 hover:text-[#FFE29A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FFCB56] sm:text-xs"
            >
              <ExternalLink size={13} />
              Live Demo
            </a>
          )}

          {!project.github && !project.live && (
            <span className="text-[11px] italic text-[#FFF7E3]/40">
              Private repository
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [visible, setVisible] = useState(INITIAL_VISIBLE);
  const shouldReduceMotion = useReducedMotion();

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  const shown = filtered.slice(0, visible);
  const hasMore = filtered.length > visible;

  const changeFilter = (filter) => {
    setActiveFilter(filter);
    setVisible(INITIAL_VISIBLE);
  };

  return (
    <section
      id="projects"
      className="relative isolate overflow-hidden bg-[#120E06] py-16 sm:py-20 lg:py-24"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-[#FFCB56]/10 blur-[100px] sm:h-96 sm:w-96 sm:blur-[140px]" />

      <div className="pointer-events-none absolute -bottom-20 -left-24 h-64 w-64 rounded-full bg-[#F59E0B]/10 blur-[100px] sm:h-96 sm:w-96 sm:blur-[130px]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-9 text-center sm:mb-12"
        >
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#FFCB56]/30 bg-[#FFCB56]/5 px-3 py-1.5 text-xs text-[#FFE29A] sm:mb-4 sm:px-4 sm:text-sm">
            <Sparkles size={14} />
            Things I&apos;ve built
          </p>

          <h2 className="bg-gradient-to-r from-[#FFF7E3] via-[#FFCB56] to-[#F59E0B] bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:text-5xl">
            My Projects
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

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#FFF7E3]/65 sm:mt-5 sm:text-base">
            A selection of real-world projects spanning AI, full-stack web apps,
            and everything in between.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          role="group"
          aria-label="Filter projects by category"
          className="mb-8 flex flex-wrap justify-center gap-2 sm:mb-12 sm:gap-3"
        >
          {filters.map((filter) => {
            const isActive = activeFilter === filter;

            const count =
              filter === "All"
                ? projects.length
                : projects.filter((project) => project.category === filter)
                    .length;

            return (
              <button
                key={filter}
                type="button"
                aria-pressed={isActive}
                onClick={() => changeFilter(filter)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-medium transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFCB56] sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm ${
                  isActive
                    ? "border-[#FFCB56] bg-gradient-to-r from-[#FFCB56] to-[#F59E0B] text-[#120E06]"
                    : "border-[#FFF7E3]/10 bg-[#FFF7E3]/5 text-[#FFF7E3]/70 hover:border-[#FFCB56]/50 hover:text-[#FFCB56]"
                }`}
              >
                {filter}

                <span
                  className={`rounded-full px-1.5 py-0.5 text-[9px] sm:text-xs ${
                    isActive ? "bg-[#120E06]/15" : "bg-[#FFF7E3]/10"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Project grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={container}
            initial="hidden"
            animate="show"
            exit={shouldReduceMotion ? undefined : "hidden"}
            className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
          >
            {shown.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                reducedMotion={shouldReduceMotion}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Show more */}
        {hasMore && (
          <div className="mt-9 text-center sm:mt-12">
            <button
              type="button"
              onClick={() => setVisible((current) => current + INITIAL_VISIBLE)}
              className="inline-flex items-center gap-2 rounded-full border border-[#FFCB56]/40 bg-[#FFCB56]/5 px-6 py-3 text-xs font-semibold text-[#FFE29A] transition-all duration-300 hover:bg-[#FFCB56]/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFCB56] sm:px-7 sm:text-sm"
            >
              Show more projects
              <ChevronDown size={16} />
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 text-center sm:mt-16"
        >
          <p className="mb-4 text-xs text-[#FFF7E3]/50 sm:mb-5 sm:text-sm">
            Want to see more of my work?
          </p>

          <a
            href={PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FFCB56] to-[#F59E0B] px-6 py-3 text-xs font-semibold text-[#120E06] shadow-lg shadow-[#FFCB56]/20 transition-all duration-300 hover:scale-105 hover:shadow-[#FFCB56]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFCB56] sm:px-8 sm:text-sm"
          >
            <FaGithub size={16} />
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
