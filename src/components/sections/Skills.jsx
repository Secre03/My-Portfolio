import { useState } from "react";
import { ScrollReveal } from "../ui/ScrollReveal.jsx";
import { SKILLS } from "../../data/portfolio.js";
import BlurText from "../ui/BlurText.jsx";

SKILLS[0].skills = SKILLS.slice(1).flatMap(c => c.skills);

export default function Skills() {
  const [active, setActive] = useState("all");
  const skills = SKILLS.find(c => c.key === active);

  return (
    <section className="bg-[var(--bg)] py-24 px-6 sm:px-10">
      <div className="max-w-4xl mx-auto">

        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-[0.68rem] tracking-[0.18em] uppercase text-[var(--accent)] font-bold mb-2">
              Expertise
            </p>
            <BlurText
                text="Skills &amp; Tools"
                delay={200}
                animateBy="words"
                direction="top"
                className="text-3xl md:text-4xl lg:text-5xl font-black text-center justify-center mb-8"
              />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="flex justify-center flex-wrap gap-2 mb-12">
            {SKILLS.map(cat => {
              const Icon = cat.icon;
              const isActive = active === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActive(cat.key)}
                  className={[
                    "flex items-center gap-1.5 px-5 py-2 rounded-full text-[0.8rem] font-semibold",
                    "tracking-wide transition-all duration-200 cursor-pointer",
                    isActive
                      ? "bg-[var(--accent)] border border-[var(--accent)] text-black"
                      : "bg-white/[0.04] border border-[var(--border)] text-[var(--text-muted)] hover:bg-white/[0.07] hover:text-[var(--text)]",
                  ].join(" ")}
                >
                  <Icon size={13} strokeWidth={2.2} />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        <div
          key={active}
          className="flex flex-wrap justify-center gap-4 animate-[fadeIn_0.3s_ease]"
        >
          {skills.skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} delay={i * 40} />
          ))}
        </div>

      </div>
    </section>
  );
}

function SkillCard({ skill, delay }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={[
        "w-[120px] rounded-2xl px-4 py-6 flex flex-col items-center gap-3",
        "cursor-default transition-all duration-300 border",
        hovered
          ? "bg-[rgba(168,255,87,0.06)] border-[rgba(168,255,87,0.3)] -translate-y-1"
          : "bg-white/[0.02] border-[var(--border)] translate-y-0",
      ].join(" ")}
      style={{ animation: `fadeUp 0.5s ease ${delay}ms both` }}
    >
      <div className={[
        "w-[52px] h-[52px] flex items-center justify-center transition-transform duration-300",
        hovered ? "scale-110" : "scale-100",
      ].join(" ")}>
        {!imgError ? (
          <img
            src={skill.image}
            alt={skill.name}
            className={[
              "w-full h-full object-contain transition-all duration-300",
              hovered ? "grayscale-0 brightness-100" : "grayscale brightness-75",
            ].join(" ")}
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-2xl font-extrabold text-[var(--accent)] tracking-tight">
            {skill.name.slice(0, 2)}
          </span>
        )}
      </div>

      <span className={[
        "text-[0.78rem] font-semibold text-center tracking-[0.01em] transition-colors duration-300",
        hovered ? "text-[var(--accent)]" : "text-[var(--text-muted)]",
      ].join(" ")}>
        {skill.name}
      </span>

      <div className={[
        "h-[2px] bg-[var(--accent)] rounded-full transition-all duration-300",
        hovered ? "w-6" : "w-0",
      ].join(" ")} />
    </div>
  );
}