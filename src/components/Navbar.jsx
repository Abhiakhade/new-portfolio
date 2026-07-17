import { useEffect, useState } from "react";
import { Menu, X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const navLinks = [
{ name: "About", href: "#about" },
{ name: "Skills", href: "#skills" },
{ name: "Projects", href: "#projects" },
{ name: "Experience", href: "#experience" },
{ name: "Contact", href: "#contact" },
];

export default function Navbar() {
const [scrolled, setScrolled] = useState(false);
const [mobileMenu, setMobileMenu] = useState(false);
const [active, setActive] = useState("About");
const [showNav, setShowNav] = useState(true);

useEffect(() => {
let lastScroll = 0;

const handleScroll = () => {
  const currentScroll = window.scrollY;

  setScrolled(currentScroll > 30);
  setShowNav(currentScroll < lastScroll || currentScroll < 50);

  navLinks.forEach((link) => {
    const section = document.querySelector(link.href);

    if (
      section &&
      currentScroll >= section.offsetTop - 150 &&
      currentScroll < section.offsetTop + section.offsetHeight
    ) {
      setActive(link.name);
    }
  });

  lastScroll = currentScroll;
};

window.addEventListener("scroll", handleScroll);

return () => {
  window.removeEventListener("scroll", handleScroll);
};

}, []);

useEffect(() => {
document.body.style.overflow = mobileMenu ? "hidden" : "";

return () => {
  document.body.style.overflow = "";
};

}, [mobileMenu]);

const handleResumeDownload = () => {
toast.success("Resume downloaded successfully!");
};

return (
  <motion.header
    initial={{ y: -100 }}
    animate={{ y: showNav ? 0 : -100 }}
    transition={{ duration: 0.4 }}
    className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      scrolled
        ? "bg-[#030712]/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/30"
        : "bg-transparent"
    }`}
  >
    {" "}
    <div className="max-w-5xl mx-auto px-3 lg:px-6">
      <div className="flex items-center justify-between h-14">
        {/* Logo */}
        <a
          href="#"
          className="group flex items-center text-2xl font-bold text-white tracking-wide"
        >
          <span className="text-cyan-400 group-hover:text-purple-500 transition-colors">
            &lt;
          </span>

          <span className="mx-1">Abhi</span>

          <span className="text-cyan-400 group-hover:text-purple-400 transition-colors">
            /&gt;
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`relative text-sm font-medium transition-all duration-300 ${
                active === link.name
                  ? "text-cyan-400"
                  : "text-gray-300 hover:text-cyan-400"
              }`}
            >
              {link.name}

              <span
                className={`absolute -bottom-2 left-0 h-[2px] rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 ${
                  active === link.name ? "w-full" : "w-0"
                }`}
              />
            </a>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/full-stack.pdf"
            download="Abhi_Akhade_Resume.pdf"
            onClick={handleResumeDownload}
            className="flex items-center gap-2 rounded-full border border-cyan-400/30 px-5 py-2.5 text-sm font-semibold text-cyan-400 transition-all duration-300 hover:bg-cyan-400 hover:text-black"
          >
            <Download size={16} />
            Resume
          </a>

          <a
            href="#contact"
            className="rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 px-6 py-2.5 text-sm font-semibold text-[#030712] shadow-lg transition-all duration-300 hover:scale-105"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Toggle menu"
          className="relative z-50 md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={mobileMenu ? "close" : "open"}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              {mobileMenu ? <X size={20} /> : <Menu size={20} />}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>
    </div>
    {/* Mobile Menu */}
    <AnimatePresence>
      {mobileMenu && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.35 }}
          className="overflow-hidden border-t border-white/10 bg-[#030712]/95 backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col gap-2 p-6">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenu(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.05,
                }}
                className="rounded-lg px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-cyan-400 transition-colors"
              >
                {link.name}
              </motion.a>
            ))}

            <a
              href="/full-stack.pdf"
              download="Abhi_Akhade_Resume.pdf"
              onClick={() => {
                handleResumeDownload();
                setMobileMenu(false);
              }}
              className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-cyan-400/30 py-3 text-cyan-400"
            >
              <Download size={18} />
              Download Resume
            </a>

            <a
              href="#contact"
              onClick={() => setMobileMenu(false)}
              className="rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 py-3 text-center font-semibold text-[#030712]"
            >
              Hire Me
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.header>
);
}
