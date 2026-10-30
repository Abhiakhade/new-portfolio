import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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

/* EmailJS configuration
   Recommended: add these variables to your project's .env file.
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
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
  {
    icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/Abhiakhade",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/abhijitakhade/",
  },
  {
    icon: FaTwitter,
    label: "Twitter",
    href: "https://twitter.com/",
  },
  {
    icon: Code2,
    label: "LeetCode",
    href: "https://leetcode.com/u/Abhiakhade/",
  },
];

const EASE = [0.22, 1, 0.36, 1];

const inputClass =
  "w-full min-w-0 rounded-xl border border-[#FFF7E3]/10 bg-[#FFF7E3]/[0.04] px-4 py-3 text-base text-[#FFF7E3] placeholder-[#FFF7E3]/30 outline-none transition-all duration-300 focus:border-[#FFCB56]/60 focus:bg-[#FFF7E3]/[0.07] focus:ring-2 focus:ring-[#FFCB56]/15 sm:text-sm";

const errorInputClass =
  "border-red-400/60 focus:border-red-400/60 focus:ring-red-400/10";

const labelClass = "mb-2 block text-sm font-medium text-[#FFF7E3]/75";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
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
  const statusTimerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Clear pending timers when the component unmounts.
  useEffect(() => {
    return () => {
      if (statusTimerRef.current) {
        window.clearTimeout(statusTimerRef.current);
      }
    };
  }, []);

  const resetStatusLater = useCallback(() => {
    if (statusTimerRef.current) {
      window.clearTimeout(statusTimerRef.current);
    }

    statusTimerRef.current = window.setTimeout(() => {
      setStatus("idle");
      setErrorMessage("");
      statusTimerRef.current = null;
    }, 5000);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validate = () => {
    const next = {};

    if (!form.name.trim()) {
      next.name = "Please enter your name.";
    }

    if (!form.email.trim()) {
      next.email = "Please enter your email.";
    } else if (!EMAIL_RE.test(form.email.trim())) {
      next.email = "Please enter a valid email address.";
    }

    if (!form.message.trim()) {
      next.message = "Please add a short message.";
    } else if (form.message.trim().length < 10) {
      next.message = "Message should be at least 10 characters.";
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (status === "loading") return;

    // Honeypot check for basic bot protection.
    const honeypot = formRef.current?.elements?.namedItem("company_website");

    if (honeypot?.value) return;

    if (!validate()) return;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus("error");
      setErrorMessage(
        "Contact form isn't configured yet. Please check your EmailJS keys.",
      );
      resetStatusLater();
      return;
    }

    if (statusTimerRef.current) {
      window.clearTimeout(statusTimerRef.current);
      statusTimerRef.current = null;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      });

      setStatus("success");

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setErrors({});
      formRef.current?.reset();
    } catch (err) {
      console.error("EmailJS error:", err);

      setStatus("error");
      setErrorMessage(
        "Something went wrong. Please try again or contact me directly by email.",
      );
    }

    resetStatusLater();
  };

  const revealProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.7, ease: EASE },
      };

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-[#120E06] py-16 sm:py-20 lg:py-28"
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -left-32 top-0 h-64 w-64 rounded-full bg-[#FFCB56]/10 blur-[100px] sm:h-96 sm:w-96 sm:blur-[140px]" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-64 w-64 rounded-full bg-[#F59E0B]/10 blur-[100px] sm:h-96 sm:w-96 sm:blur-[140px]" />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          {...revealProps}
          className="mx-auto mb-10 max-w-2xl text-center sm:mb-14 lg:mb-16"
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FFCB56]/30 bg-[#FFCB56]/5 px-3 py-1.5 text-xs text-[#FFE29A] sm:px-4 sm:text-sm">
            <Sparkles size={14} />
            Get in touch
          </p>

          <h2 className="bg-gradient-to-r from-[#FFF7E3] via-[#FFCB56] to-[#F59E0B] bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:text-5xl lg:text-6xl">
            Contact Me
          </h2>

          <motion.div
            initial={shouldReduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.9,
              delay: 0.3,
              ease: EASE,
            }}
            className="mx-auto mt-4 h-[3px] w-16 origin-center rounded-full bg-gradient-to-r from-[#FFCB56] to-[#F59E0B] sm:mt-5 sm:w-20"
          />

          <p className="mx-auto mt-4 max-w-xl px-2 text-sm leading-relaxed text-[#FFF7E3]/65 sm:mt-5 sm:text-base">
            Have a project in mind or want to collaborate? I&apos;m open to
            opportunities that align with my skills and interests.
          </p>
        </motion.div>

        {/* Main content */}
        <div className="grid min-w-0 items-start gap-8 sm:gap-10 lg:grid-cols-[0.9fr_1.3fr] lg:gap-12">
          {/* Left: Contact information */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="min-w-0 space-y-5 sm:space-y-6"
          >
            <motion.p
              variants={shouldReduceMotion ? {} : fadeUp}
              className="text-sm leading-relaxed text-[#FFF7E3]/70 sm:text-base"
            >
              If you have any questions or concerns, please don&apos;t hesitate
              to reach out. I am always open to new work opportunities,
              freelance projects, and exciting collaborations.
            </motion.p>

            {/* Contact cards */}
            <motion.div
              variants={shouldReduceMotion ? {} : fadeUp}
              className="space-y-3"
            >
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={label === "Location" ? "_blank" : undefined}
                  rel={label === "Location" ? "noreferrer" : undefined}
                  whileHover={shouldReduceMotion ? undefined : { x: 5 }}
                  transition={{ duration: 0.25 }}
                  className="group flex min-w-0 items-center gap-3 rounded-2xl border border-[#FFF7E3]/10 bg-[#FFF7E3]/[0.04] px-3 py-3.5 transition-colors duration-300 hover:border-[#FFCB56]/50 hover:bg-[#FFCB56]/[0.06] sm:gap-4 sm:px-5 sm:py-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFCB56] to-[#F59E0B] text-[#120E06] shadow-lg shadow-[#FFCB56]/20 sm:h-11 sm:w-11">
                    <Icon size={18} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-[#FFF7E3]/45">{label}</p>
                    <p className="break-words text-sm font-medium text-[#FFF7E3]/85 transition-colors group-hover:text-[#FFCB56]">
                      {value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={shouldReduceMotion ? {} : fadeUp}
              className="pt-1"
            >
              <p className="mb-3 text-sm text-[#FFF7E3]/50">Find me on</p>

              <div className="flex flex-wrap gap-3">
                {socials.map(({ icon: Icon, label, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    whileHover={
                      shouldReduceMotion ? undefined : { y: -4, scale: 1.08 }
                    }
                    transition={{ duration: 0.25 }}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[#FFF7E3]/15 bg-[#FFF7E3]/[0.04] text-[#FFF7E3]/70 transition-colors duration-300 hover:border-[#FFCB56]/70 hover:bg-[#FFCB56]/10 hover:text-[#FFCB56] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFCB56]"
                  >
                    <Icon size={17} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div
              variants={shouldReduceMotion ? {} : fadeUp}
              className="flex items-start gap-3 rounded-2xl border border-[#FFCB56]/30 bg-[#FFCB56]/5 px-4 py-4 sm:items-center sm:px-5"
            >
              <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#FFCB56] shadow-[0_0_12px_#FFCB56] sm:mt-0">
                <span className="block h-full w-full animate-ping rounded-full bg-[#FFCB56]/50" />
              </span>

              <div className="min-w-0">
                <p className="text-sm font-medium text-[#FFF7E3]">
                  Available for freelance
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#FFF7E3]/55">
                  Currently open to new projects and collaborations.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            {...revealProps}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.8,
              delay: shouldReduceMotion ? 0 : 0.15,
              ease: EASE,
            }}
            className="min-w-0"
          >
            <div className="relative overflow-hidden rounded-2xl border border-[#FFF7E3]/10 bg-[#FFF7E3]/[0.04] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:rounded-3xl sm:p-7 lg:p-9">
              <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#FFCB56]/70 to-transparent sm:inset-x-8" />

              <h3 className="mb-5 text-lg font-semibold text-[#FFF7E3] sm:mb-6 sm:text-xl">
                Send a Message
              </h3>

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                className="space-y-4 sm:space-y-5"
              >
                <input type="hidden" name="to_email" value={RECIPIENT_EMAIL} />

                {/* Honeypot field */}
                <div
                  className="absolute -left-[10000px] h-px w-px overflow-hidden"
                  aria-hidden="true"
                >
                  <label htmlFor="company-website">
                    Leave this field empty
                  </label>
                  <input
                    id="company-website"
                    type="text"
                    name="company_website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className={labelClass}>
                    Your name
                  </label>

                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    required
                    maxLength={100}
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Abhijit Akhade"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={`${inputClass} ${
                      errors.name ? errorInputClass : ""
                    }`}
                  />

                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-xs text-red-400">
                      {errors.name}
                    </p>
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
                    autoComplete="email"
                    required
                    maxLength={150}
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={`${inputClass} ${
                      errors.email ? errorInputClass : ""
                    }`}
                  />

                  {errors.email && (
                    <p id="email-error" className="mt-1.5 text-xs text-red-400">
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
                    maxLength={150}
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
                    required
                    minLength={10}
                    maxLength={5000}
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Hi Abhijit, I'd love to work with you on..."
                    aria-invalid={!!errors.message}
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                    className={`${inputClass} min-h-32 resize-y ${
                      errors.message ? errorInputClass : ""
                    }`}
                  />

                  {errors.message && (
                    <p
                      id="message-error"
                      className="mt-1.5 text-xs text-red-400"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  whileHover={
                    shouldReduceMotion || status === "loading"
                      ? undefined
                      : { scale: 1.015 }
                  }
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                  className="relative flex min-h-12 w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-[#FFCB56] to-[#F59E0B] px-4 py-3.5 text-sm font-semibold text-[#120E06] shadow-lg shadow-[#FFCB56]/20 transition-shadow duration-300 hover:shadow-[#FFCB56]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFE29A] disabled:cursor-not-allowed disabled:opacity-70"
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
                        initial={{ opacity: 0, y: 8 }}
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
                        initial={{ opacity: 0, y: 8 }}
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

                {/* Submission feedback */}
                <div aria-live="polite" aria-atomic="true" className="min-h-5">
                  {status === "success" && (
                    <p className="text-center text-xs text-green-400">
                      Your message has been sent successfully. Thank you!
                    </p>
                  )}

                  {status === "error" && errorMessage && (
                    <p className="text-center text-xs leading-relaxed text-red-400">
                      {errorMessage}
                    </p>
                  )}
                </div>

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
