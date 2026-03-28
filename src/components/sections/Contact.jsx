import { useState } from "react";
import { ScrollReveal } from "../ui/ScrollReveal.jsx";
import BlurText from "../ui/BlurText.jsx";
import { FIELDS } from "../../data/portfolio.js";




export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(null);

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const inputClass = (key) =>
    `w-full px-4 py-[0.875rem] bg-white/[0.03] rounded-xl text-[var(--text)] text-[0.9rem] outline-none font-[inherit] transition-colors duration-200 border ${
      focused === key
        ? "border-[rgba(168,255,87,0.38)]"
        : "border-[var(--border)]"
    }`;

  return (
    <section className="relative min-h-screen bg-[var(--bg)] px-10 pt-32 pb-20 overflow-hidden">

      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse at bottom, rgba(168,255,87,0.055), transparent 70%)" }}
      />

      <div className="relative z-[1] max-w-[660px] mx-auto">

        <ScrollReveal>
          <p className="text-[0.68rem] tracking-[0.18em] uppercase text-[var(--accent)] font-bold mb-2">
            Get in touch
          </p>
          <BlurText
          text="Let's Connect."
          delay={200}
          animateBy="words"
          direction="top"
          className="text-4xl md:text-6xl lg:text-7xl font-black mb-9"
        />
          <p className="text-[var(--text-muted)] mb-10 leading-[1.75]">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
        </ScrollReveal>

        {!sent ? (
          <ScrollReveal delay={100}>
            <div className="flex flex-col gap-4">

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

              <button
                onClick={() => setSent(true)}
                className="mt-2 self-start px-9 py-[0.875rem] rounded-full bg-[var(--accent)] text-black font-extrabold text-[0.875rem] tracking-[0.04em] border-none cursor-pointer transition-opacity duration-200 hover:opacity-[0.88] font-[inherit]"
              >
                Send Message →
              </button>
            </div>
          </ScrollReveal>
        ) : (
          <ScrollReveal>
            <div className="bg-[rgba(168,255,87,0.06)] border border-[rgba(168,255,87,0.22)] rounded-[1.25rem] p-12 text-center">
              <div className="text-[2.5rem] mb-4">✓</div>
              <h3 className="text-[1.4rem] font-extrabold text-[var(--accent)] mb-2">
                Message Sent!
              </h3>
              <p className="text-[var(--text-muted)]">
                Thanks for reaching out. I'll get back to you soon.
              </p>
            </div>
          </ScrollReveal>
        )}

      </div>
    </section>
  );
}
