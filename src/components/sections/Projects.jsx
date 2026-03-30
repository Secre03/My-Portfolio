import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "../ui/ScrollReveal.jsx";
import { PROJECTS } from "../../data/portfolio";
import BlurText from "../ui/BlurText.jsx";

export default function Projects() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="relative bg-[var(--bg)] px-4 sm:px-6 md:px-10 py-16 sm:py-20 md:py-24 overflow-x-hidden">
      <div className="max-w-[1100px] mx-auto">
        <ScrollReveal>
          <p className="text-[0.68rem] tracking-[0.18em] uppercase text-[var(--accent)] font-bold mb-7">
            Projects
          </p>
          <BlurText
            text="My Projects"
            delay={200}
            animateBy="words"
            direction="top"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-10"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {PROJECTS.map((p, i) => {
            const isHov = hovered === i;
            return (
              <ScrollReveal key={i} delay={i * 60}>
                <div
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className="group relative rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--bg-card,rgba(255,255,255,0.03))] cursor-pointer transition-all duration-300 hover:border-[var(--accent)] hover:shadow-[0_0_0_1px_var(--accent),0_16px_48px_rgba(0,0,0,0.5)]"
                >
                  <div className="relative w-full h-[190px] overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className={`absolute inset-0 transition-opacity duration-300 bg-gradient-to-t from-[var(--bg)] via-[rgba(0,0,0,0.35)] to-transparent ${
                        isHov ? "opacity-80" : "opacity-60"
                      }`}
                    />

                    <span
                      className={`absolute top-3 left-3 text-[0.7rem] font-black tabular-nums px-2 py-0.5 rounded-full border transition-all duration-300 ${
                        isHov
                          ? "border-[var(--accent)] text-[var(--accent)] bg-[rgba(168,255,87,0.1)]"
                          : "border-[var(--border)] text-[var(--text-dim)] bg-[rgba(0,0,0,0.4)]"
                      }`}
                    >
                      {p.num}
                    </span>
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={`absolute top-3 right-3 w-[32px] h-[32px] rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isHov
                          ? "border-[var(--accent)] text-[var(--accent)] bg-[rgba(168,255,87,0.1)] scale-110"
                          : "border-[var(--border)] text-[var(--text-dim)] bg-[rgba(0,0,0,0.4)]"
                      }`}
                    >
                      <ArrowUpRight size={14} />
                    </a>
                  </div>

                  <div className="px-4 py-4">
                    <div className="flex gap-[0.4rem] items-center mb-3">
                      {p.techIcons.map((icon) => (
                        <img
                          key={icon}
                          src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}/${icon}-original.svg`}
                          alt={icon}
                          className={`w-[18px] h-[18px] object-contain transition-all duration-300 ${
                            isHov ? "opacity-90" : "opacity-30 brightness-0 invert"
                          }`}
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      ))}
                    </div>

                    <h3
                      className={`text-[1rem] font-bold tracking-[-0.01em] mb-0.5 transition-colors duration-300 ${
                        isHov ? "text-[var(--text)]" : "text-[var(--text-muted)]"
                      }`}
                    >
                      {p.title}
                    </h3>
                    <p className="text-[0.7rem] text-[var(--text-dim)] font-medium mb-3">
                      {p.role}
                    </p>

                    <div className="flex gap-[0.3rem] flex-wrap">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className={`px-[0.5rem] py-[0.15rem] rounded-full text-[0.63rem] font-medium transition-all duration-300 border ${
                            isHov
                              ? "bg-[rgba(168,255,87,0.08)] border-[rgba(168,255,87,0.25)] text-[var(--accent)]"
                              : "bg-transparent border-[var(--border)] text-[var(--text-dim)]"
                          }`}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}