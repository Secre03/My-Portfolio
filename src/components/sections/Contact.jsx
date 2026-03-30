import { useState } from "react";
import emailjs from "@emailjs/browser";
import { ScrollReveal } from "../ui/ScrollReveal.jsx";
import BlurText from "../ui/BlurText.jsx";
import { FIELDS } from "../../data/portfolio.js";

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function Contact() {
  const [form, setForm]       = useState({ name: "", email: "", message: "" });
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const [focused, setFocused] = useState(null);

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSend = async () => {
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { name: form.name, email: form.email, message: form.message },
        PUBLIC_KEY
      );
      setSent(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (key) =>
    `w-full px-4 py-[0.875rem] bg-white/[0.03] rounded-xl text-[var(--text)] text-[0.9rem] outline-none font-[inherit] transition-colors duration-200 border ${
      focused === key
        ? "border-[rgba(168,255,87,0.38)]"
        : "border-[var(--border)]"
    }`;

  return (
    <section className="relative min-h-[100svh] bg-[var(--bg)] px-4 sm:px-6 md:px-10 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 overflow-hidden">

      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none z-0"
        style={{
          width: "clamp(320px, 80vw, 900px)",
          height: "clamp(160px, 40vw, 450px)",
          background: "radial-gradient(ellipse at bottom, rgba(168,255,87,0.055), transparent 70%)",
        }}
      />

      <div className="relative z-[1] w-full max-w-[660px] mx-auto">
        <ScrollReveal>
          <p className="text-[0.68rem] tracking-[0.18em] uppercase text-[var(--accent)] font-bold mb-2">
            Get in touch
          </p>
          <BlurText
            text="Let's Connect."
            delay={200}
            animateBy="words"
            direction="top"
            className="text-[clamp(2rem,8vw,4.5rem)] font-black mb-6 sm:mb-9 leading-tight"
          />
          <p className="text-[var(--text-muted)] text-[0.9rem] sm:text-base mb-8 sm:mb-10 leading-[1.75] max-w-[520px]">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
        </ScrollReveal>

        {!sent ? (
          <ScrollReveal delay={100}>
            <div className="flex flex-col gap-3 sm:gap-4">

              {FIELDS.map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-[0.73rem] text-[var(--text-muted)] mb-[0.4rem] tracking-[0.05em]">
                    {label}
                  </label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={set(key)}
                    onFocus={() => setFocused(key)}
                    onBlur={() => setFocused(null)}
                    className={inputClass(key)}
                  />
                </div>
              ))}

              <div>
                <label className="block text-[0.73rem] text-[var(--text-muted)] mb-[0.4rem] tracking-[0.05em]">
                  Message
                </label>
                <textarea
                  placeholder="Tell me about your project..."
                  rows={5}
                  value={form.message}
                  onChange={set("message")}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  className={`${inputClass("message")} resize-y`}
                />
              </div>

              {error && (
                <p className="text-red-400 text-[0.8rem]">{error}</p>
              )}

              <button
                onClick={handleSend}
                disabled={loading}
                className="mt-2 w-full sm:w-auto self-start px-8 sm:px-9 py-[0.875rem] rounded-full bg-[var(--accent)] text-black font-extrabold text-[0.875rem] tracking-[0.04em] border-none cursor-pointer transition-opacity duration-200 hover:opacity-[0.88] font-[inherit] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Message →"}
              </button>
            </div>
          </ScrollReveal>
        ) : (
          <ScrollReveal>
            <div className="bg-[rgba(168,255,87,0.06)] border border-[rgba(168,255,87,0.22)] rounded-[1.25rem] p-8 sm:p-12 text-center">
              <div className="text-[2rem] sm:text-[2.5rem] mb-4">✓</div>
              <h3 className="text-[1.2rem] sm:text-[1.4rem] font-extrabold text-[var(--accent)] mb-2">
                Message Sent!
              </h3>
              <p className="text-[var(--text-muted)] text-[0.9rem] sm:text-base">
                Thanks for reaching out. I'll get back to you soon.
              </p>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}