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

/* ---------- Palette (same as the rest of the site) ----------
   gold    #FFCB56  brand colour
   amber   #F59E0B  deeper accent
   butter  #FFE29A  soft accent
   ink     #120E06  page background
   cream   #FFF7E3  main text
-------------------------------------------------------------- */

/*
 * EmailJS keys. Vite only exposes env vars that start with VITE_.
 * Put these in a .env file in your project root (see the note in chat):
 *   VITE_EMAILJS_SERVICE_ID=service_ybbvnun
 *   VITE_EMAILJS_TEMPLATE_ID=template_wt0mdya
 *   VITE_EMAILJS_PUBLIC_KEY=TprPtsudSjP_QQY5f
 * The fallbacks keep the form working until you add the .env file.
 */
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_ybbvnun";
const TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_wt0mdya";
const PUBLIC_KEY =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "TprPtsudSjP_QQY5f";

const RECIPIENT_EMAIL = "abhijitakhade8830@gmail.com";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "abhijitakhade8830@gmail.com",
    href: "mailto:abhijitakhade8830@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 9209092582",
    href: "tel:+919209092582",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Shahada, Maharashtra, India",
    href: "https://maps.google.com/?q=Shahada,Maharashtra,India",
  },
];

const socials = [
  { icon: FaGithub, label: "GitHub", href: "https://github.com/Abhiakhade" },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/abhijitakhade/",
  },
  { icon: FaTwitter, label: "Twitter", href: "https://twitter.com/" },
  {
    icon: Code2,
    label: "LeetCode",
    href: "https://leetcode.com/u/Abhiakhade/",
  },
];

const EASE = [0.22, 1, 0.36, 1];

const inputClass =
  "w-full rounded-xl border border-[#FFF7E3]/10 bg-[#FFF7E3]/[0.04] px-4 py-3 text-sm text-[#FFF7E3] placeholder-[#FFF7E3]/30 outline-none transition-all duration-300 focus:border-[#FFCB56]/60 focus:bg-[#FFF7E3]/[0.07] focus:ring-2 focus:ring-[#FFCB56]/15";

const errorInputClass =
  "border-red-400/60 focus:border-red-400/60 focus:ring-red-400/10";

const labelClass = "mb-1.5 block text-sm font-medium text-[#FFF7E3]/70";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
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

    // Honeypot check: bots fill hidden fields, humans never see this one
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
      className="relative overflow-hidden bg-[#120E06] py-24 sm:py-32"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute left-1/3 top-0 h-96 w-96 rounded-full bg-[#FFCB56]/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/3 h-96 w-96 rounded-full bg-[#F59E0B]/10 blur-[130px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-16 text-center"
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FFCB56]/30 bg-[#FFCB56]/5 px-4 py-1.5 text-sm text-[#FFE29A]">
            <Sparkles size={14} />
            Get in touch
          </p>
          <h2 className="bg-gradient-to-r from-[#FFF7E3] via-[#FFCB56] to-[#F59E0B] bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
            Contact Me
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            className="mx-auto mt-5 h-[3px] w-20 origin-center rounded-full bg-gradient-to-r from-[#FFCB56] to-[#F59E0B]"
          />
          <p className="mx-auto mt-5 max-w-xl text-[#FFF7E3]/65">
            Have a project in mind or want to collaborate? I&apos;m open to any
            opportunities that align with my skills and interests.
          </p>
        </motion.div>

        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.4fr]">
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
              className="leading-relaxed text-[#FFF7E3]/70"
            >
              If you have any questions or concerns, please don&apos;t hesitate
              to reach out. I am always open to new work opportunities,
              freelance projects, and exciting collaborations.
            </motion.p>

            {/* Contact info cards */}
            <motion.div variants={fadeUp} className="space-y-3 pt-2">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={label === "Location" ? "_blank" : undefined}
                  rel="noreferrer"
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.25 }}
                  className="group flex items-center gap-4 rounded-2xl border border-[#FFF7E3]/10 bg-[#FFF7E3]/[0.04] px-5 py-4 transition-[border-color,background-color,box-shadow] duration-300 hover:border-[#FFCB56]/50 hover:bg-[#FFCB56]/[0.06] hover:shadow-[0_12px_40px_rgba(255,203,86,0.12)]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFCB56] to-[#F59E0B] text-[#120E06] shadow-lg shadow-[#FFCB56]/20 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-[#FFF7E3]/45">{label}</p>
                    <p className="truncate text-sm font-medium text-[#FFF7E3]/85 transition-colors duration-200 group-hover:text-[#FFCB56]">
                      {value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            {/* Socials */}
            <motion.div variants={fadeUp} className="pt-2">
              <p className="mb-4 text-sm text-[#FFF7E3]/50">Find me on</p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, label, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    whileHover={{ y: -4, scale: 1.1 }}
                    transition={{ duration: 0.25 }}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[#FFF7E3]/15 bg-[#FFF7E3]/[0.04] text-[#FFF7E3]/70 transition-colors duration-300 hover:border-[#FFCB56]/70 hover:bg-[#FFCB56]/10 hover:text-[#FFCB56]"
                  >
                    <Icon size={17} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Availability badge */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-3 rounded-2xl border border-[#FFCB56]/30 bg-[#FFCB56]/5 px-5 py-4"
            >
              <span className="h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-[#FFCB56] shadow-[0_0_12px_#FFCB56]" />
              <div>
                <p className="text-sm font-medium text-[#FFF7E3]">
                  Available for freelance
                </p>
                <p className="text-xs text-[#FFF7E3]/55">
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
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          >
            <div className="relative overflow-hidden rounded-3xl border border-[#FFF7E3]/10 bg-[#FFF7E3]/[0.04] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-9">
              {/* gold light line on top edge */}
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#FFCB56]/70 to-transparent" />

              <h3 className="mb-6 text-lg font-semibold text-[#FFF7E3]">
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
                {/* Honeypot: kept off-screen, real users never fill this */}
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
                  <label htmlFor="contact-name" className={labelClass}>
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Abhijit Akhade"
                    aria-invalid={!!errors.name}
                    className={`${inputClass} ${errors.name ? errorInputClass : ""}`}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className={labelClass}>
                    Your email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    aria-invalid={!!errors.email}
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
                  <label htmlFor="contact-subject" className={labelClass}>
                    Subject{" "}
                    <span className="text-[#FFF7E3]/35">(optional)</span>
                  </label>
                  <input
                    id="contact-subject"
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
                  <label htmlFor="contact-message" className={labelClass}>
                    Your message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Hi Abhijit, I'd love to work with you on..."
                    aria-invalid={!!errors.message}
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
                  className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#FFCB56] to-[#F59E0B] py-3.5 text-sm font-semibold text-[#120E06] shadow-lg shadow-[#FFCB56]/20 transition-all duration-300 hover:shadow-[#FFCB56]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFE29A] disabled:cursor-not-allowed disabled:opacity-70"
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

                <p className="text-center text-xs text-[#FFF7E3]/45">
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
