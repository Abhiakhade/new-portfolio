import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  XCircle,
  Loader2,
  Code2,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

// ─────────────────────────────────────────────────────────────
// EmailJS setup (all three values live in .env, never hard-coded)
//   1. Create a free account at https://www.emailjs.com
//   2. Add an Email Service (e.g. Gmail) -> copy the Service ID
//   3. Create an Email Template -> copy the Template ID
//      In the template's "To Email" field, put: {{to_email}}
//      and make sure it points at abhijitakhade8830@gmail.com
//      (or hard-code that address directly in the template's To field)
//   4. Account > General -> copy your Public Key
//   5. Create a .env file in your project root with:
//        VITE_EMAILJS_SERVICE_ID=your_service_id
//        VITE_EMAILJS_TEMPLATE_ID=your_template_id
//        VITE_EMAILJS_PUBLIC_KEY=your_public_key
//   (Using create-react-app instead of Vite? use REACT_APP_ prefixes
//    and process.env instead of import.meta.env)
// ─────────────────────────────────────────────────────────────
const SERVICE_ID = import.meta.env.service_ybbvnun;
const TEMPLATE_ID = import.meta.env.template_wt0mdya;
const PUBLIC_KEY = import.meta.env.TprPtsudSjP_QQY5f;

const RECIPIENT_EMAIL = "abhijitakhade8830@gmail.com";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "abhijitakhade8830@gmail.com",
    href: "mailto:abhijitakhade8830@gmail.com",
    color: "from-cyan-400 to-blue-500",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 9209092582",
    href: "tel:+919209092582",
    color: "from-purple-400 to-violet-600",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Shahada, Maharashtra, India",
    href: "https://maps.google.com/?q=Shahada,Maharashtra,India",
    color: "from-emerald-400 to-teal-500",
  },
];

const socials = [
  {
    icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/Abhiakhade",
    color: "hover:border-gray-400/50 hover:text-white",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/abhijitakhade/",
    color: "hover:border-blue-400/50 hover:text-blue-400",
  },
  {
    icon: FaTwitter,
    label: "Twitter",
    href: "https://twitter.com/",
    color: "hover:border-sky-400/50 hover:text-sky-400",
  },
  {
    icon: Code2,
    label: "LeetCode",
    href: "https://leetcode.com/u/Abhiakhade/",
    color: "hover:border-orange-400/50 hover:text-orange-400",
  },
];

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-all duration-300 focus:border-cyan-400/50 focus:bg-white/[0.07] focus:ring-2 focus:ring-cyan-400/10";

const errorInputClass =
  "border-red-400/60 focus:border-red-400/60 focus:ring-red-400/10";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const formRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!EMAIL_RE.test(form.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!form.message.trim()) next.message = "Please add a short message.";
    else if (form.message.trim().length < 10)
      next.message = "Message should be at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check — bots fill hidden fields, humans never see this one
    if (formRef.current?.company_website?.value) return;

    if (!validate()) return;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus("error");
      setErrorMessage(
        "Contact form isn't configured yet — missing EmailJS keys.",
      );
      setTimeout(() => setStatus("idle"), 5000);
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      });
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again in a moment.");
    }

    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#030712] py-24 sm:py-32"
    >
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/3 h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="absolute bottom-0 right-1/3 h-96 w-96 rounded-full bg-purple-500/10 blur-[130px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:72px_72px]" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-1.5 text-sm text-cyan-300">
            <Sparkles size={14} />
            Get in touch
          </p>
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            Contact{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <p className="mt-4 mx-auto max-w-xl text-gray-400">
            Have a project in mind or want to collaborate? I'm open to any
            opportunities that align with my skills and interests.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] items-start">
          {/* Left: Info panel */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-5"
          >
            <motion.p
              variants={fadeUp}
              className="text-gray-400 leading-relaxed"
            >
              If you have any questions or concerns, please don't hesitate to
              reach out. I am always open to new work opportunities, freelance
              projects, and exciting collaborations.
            </motion.p>

            {/* Contact info cards */}
            <motion.div variants={fadeUp} className="space-y-3 pt-2">
              {contactInfo.map(({ icon: Icon, label, value, href, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={label === "Location" ? "_blank" : undefined}
                  rel="noreferrer"
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.25 }}
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${color} shadow-lg`}
                  >
                    <Icon size={18} className="text-[#030712]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase tracking-wider">
                      {label}
                    </p>
                    <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-200">
                      {value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            {/* Socials */}
            <motion.div variants={fadeUp} className="pt-2">
              <p className="mb-4 text-xs uppercase tracking-widest text-gray-600">
                Find me on
              </p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, label, href, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    whileHover={{ y: -4, scale: 1.1 }}
                    transition={{ duration: 0.25 }}
                    className={`flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-gray-500 transition-colors duration-300 ${color}`}
                  >
                    <Icon size={17} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Availability badge */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-3 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 px-5 py-4"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
              <div>
                <p className="text-sm font-medium text-white">
                  Available for freelance
                </p>
                <p className="text-xs text-gray-500">
                  Currently open to new projects and collaborations
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-9 backdrop-blur-sm">
              <h3 className="mb-6 text-lg font-semibold text-white">
                Send a Message
              </h3>

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                className="space-y-5"
              >
                {/* Hidden fields consumed by the EmailJS template */}
                <input type="hidden" name="to_email" value={RECIPIENT_EMAIL} />
                {/* Honeypot — kept off-screen, real users never fill this */}
                <input
                  type="text"
                  name="company_website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {/* Name */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-gray-500">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Abhijit Akhade"
                    className={`${inputClass} ${errors.name ? errorInputClass : ""}`}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-gray-500">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`${inputClass} ${errors.email ? errorInputClass : ""}`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-gray-500">
                    Subject{" "}
                    <span className="normal-case text-gray-700">
                      (optional)
                    </span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Project inquiry, job opportunity, etc."
                    className={inputClass}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-gray-500">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Hi Abhijit, I'd love to work with you on..."
                    className={`${inputClass} resize-none ${errors.message ? errorInputClass : ""}`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 py-3.5 text-sm font-semibold text-[#030712] shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:shadow-cyan-500/40 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {status === "loading" ? (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <Loader2 size={16} className="animate-spin" />
                        Sending...
                      </motion.span>
                    ) : status === "success" ? (
                      <motion.span
                        key="success"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 size={16} />
                        Message Sent!
                      </motion.span>
                    ) : status === "error" ? (
                      <motion.span
                        key="error"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <XCircle size={16} />
                        Failed. Try Again
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <Send size={15} />
                        Send Message
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                {status === "error" && errorMessage && (
                  <p className="text-center text-xs text-red-400">
                    {errorMessage}
                  </p>
                )}

                <p className="text-center text-xs text-gray-600">
                  I typically respond within 24 hours.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
