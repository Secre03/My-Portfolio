import { useState, useEffect, useCallback } from "react";
import { ScrollReveal } from "../ui/ScrollReveal.jsx";
import { PROJECTS } from "../../data/portfolio";
import BlurText from "../ui/BlurText.jsx";

export default function Projects() {
  const [hovered, setHovered] = useState(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const onMove = useCallback(
    (e) => setMouse({ x: e.clientX, y: e.clientY }),
    [],
  );

  useEffect(() => {
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [onMove]);

  return (
    <section className="relative bg-[var(--bg)] px-10 py-24">
      {hovered !== null && (
        <div
          aria-hidden
          className="fixed z-[200] pointer-events-none w-[270px] h-[170px] rounded-xl overflow-hidden border border-[var(--border)] shadow-[0_24px_64px_rgba(0,0,0,0.75)] animate-[fadeIn_0.18s_ease]"
          style={{ top: mouse.y + 18, left: mouse.x + 18 }}
        >
          <img
            src={PROJECTS[hovered].img}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      )}

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
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-8"
          />
        </ScrollReveal>

        <div className="border-t border-[var(--border)]">
          {PROJECTS.map((p, i) => {
            const isHov = hovered === i;
            return (
              <ScrollReveal key={i} delay={i * 45}>
                <div
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className={`border-b border-[var(--border)] py-6 flex items-center gap-6 cursor-pointer transition-all duration-300 ${
                    isHov ? "pl-3" : "pl-0"
                  }`}
                >
                  <span
                    className={`text-[clamp(2rem,4vw,3.5rem)] font-black leading-none transition-colors duration-300 min-w-[70px] tabular-nums ${
                      isHov ? "text-[var(--accent)]" : "text-[var(--text-dim)]"
                    }`}
                  >
                    {p.num}
                  </span>

                  {/* Title + role */}
                  <div className="flex-1">
                    <h3
                      className={`text-[clamp(0.95rem,1.8vw,1.25rem)] font-bold tracking-[-0.01em] mb-1 transition-colors duration-300 ${
                        isHov
                          ? "text-[var(--text)]"
                          : "text-[var(--text-muted)]"
                      }`}
                    >
                      {p.title}
                    </h3>
                    <p className="text-[0.75rem] text-[var(--text-dim)] font-medium">
                      {p.role}
                    </p>
                  </div>

                  {/* Tech icons */}
                  <div className="flex gap-[0.45rem] items-center flex-wrap">
                    {p.techIcons.map((icon) => (
                      <img
                        key={icon}
                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}/${icon}-original.svg`}
                        alt={icon}
                        className={`w-5 h-5 object-contain transition-all duration-300 ${
                          isHov
                            ? "opacity-90"
                            : "opacity-25 brightness-0 invert"
                        }`}
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ))}
                  </div>

                  <div className="flex gap-[0.35rem] flex-wrap max-w-[180px]">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className={`px-[0.55rem] py-[0.18rem] rounded-full text-[0.67rem] font-medium transition-all duration-300 border ${
                          isHov
                            ? "bg-[rgba(168,255,87,0.08)] border-[rgba(168,255,87,0.25)] text-[var(--accent)]"
                            : "bg-transparent border-[var(--border)] text-[var(--text-dim)]"
                        }`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={`w-[34px] h-[34px] rounded-full border flex items-center justify-center text-[0.95rem] flex-shrink-0 transition-all duration-300 ${
                      isHov
                        ? "border-[var(--accent)] text-[var(--accent)] rotate-45"
                        : "border-[var(--border)] text-[var(--text-dim)] rotate-0"
                    }`}
                  >
                    ↗
                  </a>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
