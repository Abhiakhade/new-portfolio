import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  SquareDot,
  ExternalLink,
  Code2,
  Brain,
  Building2,
  Dumbbell,
  ShoppingCart,
  Globe,
} from "lucide-react";

const filters = ["All", "Full Stack", "AI/ML", "Frontend", "Backend"];

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
    color: "from-pink-500 to-rose-600",
    border: "border-pink-500/20",
    glow: "hover:shadow-pink-500/10",
    tags: ["Python", "TensorFlow", "OpenCV", "NumPy", "Deep Learning"],
    SquareDot: "https://github.com/Abhiakhade",
    live: null,
    featured: true,
    screenshot: null,
  },
  {
    id: 2,
    title: "Dhanni Properties",
    subtitle: "Real Estate Web Platform",
    description:
      "A modern and responsive real estate web application for property listing and management. Users can explore property details, search listings, and contact property owners seamlessly.",
    role: "Full Stack Developer",
    category: "Full Stack",
    icon: Building2,
    color: "from-cyan-400 to-blue-500",
    border: "border-cyan-400/20",
    glow: "hover:shadow-cyan-500/10",
    tags: ["React", "Next.js", "Tailwind CSS", "MongoDB", "Node.js"],
    SquareDot: "https://github.com/Abhiakhade",
    live: "https://abhiakhadeport.netlify.app/",
    featured: true,
    screenshot: null,
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
    color: "from-orange-400 to-amber-500",
    border: "border-orange-400/20",
    glow: "hover:shadow-orange-500/10",
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap", "React"],
    SquareDot: "https://github.com/Abhiakhade",
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
    color: "from-purple-400 to-violet-600",
    border: "border-purple-400/20",
    glow: "hover:shadow-purple-500/10",
    tags: ["Java", "MySQL", "JDBC", "OOP", "Database Management"],
    SquareDot: "https://github.com/Abhiakhade",
    live: null,
    featured: false,
    screenshot: null,
  },
  {
    id: 5,
    title: "Developer Portfolio",
    subtitle: "Personal Portfolio Website",
    description:
      "A sleek and modern developer portfolio built with Next.js showcasing projects, experience, skills, and blogs. Features smooth animations, responsive design, and optimized performance.",
    role: "Full Stack Developer",
    category: "Full Stack",
    icon: Globe,
    color: "from-emerald-400 to-teal-500",
    border: "border-emerald-400/20",
    glow: "hover:shadow-emerald-500/10",
    tags: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    SquareDot: "https://github.com/Abhiakhade",
    live: "https://abhiakhadeport.netlify.app/",
    featured: true,
    screenshot: null,
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
    color: "from-slate-400 to-gray-500",
    border: "border-slate-400/20",
    glow: "hover:shadow-slate-500/10",
    tags: ["Node.js", "Express", "MongoDB", "JWT", "REST API"],
    SquareDot: "https://github.com/Abhiakhade",
    live: null,
    featured: false,
    screenshot: null,
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function ProjectCard({ project }) {
  const Icon = project.icon;

  return (
    <motion.div
      variants={fadeUp}
      layout
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className={`group relative flex flex-col rounded-3xl border ${project.border} bg-white/[0.03] overflow-hidden backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.06] hover:shadow-2xl ${project.glow}`}
    >
      {/* Screenshot / Gradient Hero */}
      <div className="relative h-48 w-full overflow-hidden">
        {project.screenshot ? (
          <img
            src={project.screenshot}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className={`h-full w-full bg-gradient-to-br ${project.color} opacity-10`}
          />
        )}

        {/* Overlay grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:28px_28px]" />

        {/* Floating icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${project.color} shadow-2xl`}
          >
            <Icon size={30} className="text-[#030712]" />
          </motion.div>
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 left-3">
            <span className="flex items-center gap-1.5 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-2.5 py-1 text-xs font-medium text-yellow-300">
              <Sparkles size={10} />
              Featured
            </span>
          </div>
        )}

        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {project.SquareDot && (
            <a
              href={project.SquareDot}
              target="_blank"
              rel="noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-sm transition-colors hover:border-cyan-400/50 hover:text-cyan-300"
            >
              <SquareDot size={14} />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-sm transition-colors hover:border-cyan-400/50 hover:text-cyan-300"
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-1 flex items-start justify-between gap-2">
          <div>
            <p className="text-xs text-gray-500 mb-0.5">{project.subtitle}</p>
            <h3 className="text-lg font-bold text-white leading-snug">
              {project.title}
            </h3>
          </div>
          <span
            className={`shrink-0 rounded-full bg-gradient-to-r ${project.color} px-2.5 py-0.5 text-[10px] font-semibold text-[#030712]`}
          >
            {project.category}
          </span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-gray-400 flex-1">
          {project.description}
        </p>

        {/* Role */}
        <div className="mt-4 flex items-center gap-2">
          <Code2 size={12} className="text-gray-600" />
          <span className="text-xs text-gray-500">{project.role}</span>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] text-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="mt-5 flex gap-3 pt-4 border-t border-white/5">
          {project.SquareDot && (
            <a
              href={project.SquareDot}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs text-gray-400 transition-colors duration-200 hover:text-white"
            >
              <SquareDot size={13} />
              Source Code
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs text-cyan-400 transition-colors duration-200 hover:text-cyan-300"
            >
              <ExternalLink size={13} />
              Live Demo
            </a>
          )}
          {!project.SquareDot && !project.live && (
            <span className="text-xs text-gray-600 italic">
              Private repository
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[#030712] py-24 sm:py-32"
    >
      {/* Ambient glows */}
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-purple-500/10 blur-[140px]" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[130px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:72px_72px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-1.5 text-sm text-cyan-300">
            <Sparkles size={14} />
            Things I've built
          </p>
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            My{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="mt-4 mx-auto max-w-xl text-gray-400">
            A selection of real-world projects spanning AI, full-stack web apps,
            and everything in between.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 flex flex-wrap justify-center gap-3"
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300 ${
                activeFilter === f
                  ? "border-cyan-400/50 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 text-white"
                  : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {f}
              {f === "All" && (
                <span className="ml-2 rounded-full bg-white/10 px-1.5 py-0.5 text-xs">
                  {projects.length}
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={container}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 mb-5 text-sm">
            Want to see more of my work?
          </p>
          <a
            href="https://github.com/Abhiakhade"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/40 hover:bg-white/10"
          >
            <SquareDot size={16} />
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
