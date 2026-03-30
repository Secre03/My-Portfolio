import { ScrollReveal } from "../ui/ScrollReveal.jsx";
import TiltedCard from "../ui/TiltedCard.jsx";
import MarkMilano from "/assets/Mark Milano.jpg";
import BlurText from "../ui/BlurText.jsx";
import { WHATIDO } from "../../data/portfolio.js";

const QUOTE = "\u201cStrong foundations create limitless futures.\u201d";

export default function WhatIDo() {
  return (
    <section className="bg-[var(--bg)] py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-10">
      <div className="max-w-[1100px] mx-auto">

        <ScrollReveal>
          <p className="text-[0.68rem] tracking-[0.18em] uppercase text-[var(--accent)] font-bold mb-3">
            About
          </p>
          <BlurText
            text="What I Do"
            delay={200}
            animateBy="words"
            direction="top"
            className="text-2xl md:text-4xl lg:text-5xl font-black mb-9"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-14 sm:mb-20">
          {WHATIDO.map(({ label, desc }, i) => (
            <ScrollReveal key={label} delay={i * 100}>
              <div className="relative overflow-hidden bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 md:p-9 h-full">
                <div className="absolute top-0 left-0 w-[3px] h-12 bg-[var(--accent)] rounded-br" />
                <h3 className="text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] font-black tracking-tight text-[var(--text)] mb-3 sm:mb-4">
                  {label}
                </h3>
                <p className="text-[var(--text-muted)] text-[0.875rem] sm:text-[0.9rem] leading-[1.78]">
                  {desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">

          <ScrollReveal>
            <p className="text-[0.68rem] tracking-[0.25em] uppercase text-[var(--accent)] font-bold mb-4">
              Who I Am
            </p>

            <h3 className="text-[clamp(1.4rem,4vw,2.4rem)] font-black tracking-tight text-[var(--text)] leading-tight mb-4 sm:mb-5">
              Mark John L. Milano
            </h3>

            <p className="text-[var(--text-muted)] text-[0.9rem] sm:text-[0.95rem] leading-[1.85] mb-5 sm:mb-6 max-w-full md:max-w-[480px]">
              I am a 3rd-year IT student at{" "}
              <span className="text-[var(--accent)] font-semibold">
                Computer Arts Technological College
              </span>
              , currently learning and developing my skills in programming and
              design. As a student, I am still exploring different areas such as
              web and mobile development, as well as UI/UX design. I am eager to
              learn new technologies, improve my abilities, and gain experience
              by working on real-world projects.
            </p>

            <blockquote className="border-l-[3px] border-[var(--accent)] pl-5 mb-6 text-[var(--text-dim)] italic text-[0.85rem] sm:text-[0.88rem] leading-[1.7]">
              {QUOTE}
            </blockquote>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="flex justify-center md:justify-end">
              <TiltedCard
                imageSrc={MarkMilano}
                altText="Mark Milano | IMG"
                captionText="Let's Work Together"
                containerHeight="clamp(280px, 50vw, 380px)"
                containerWidth="clamp(220px, 40vw, 300px)"
                imageHeight="clamp(280px, 50vw, 380px)"
                imageWidth="clamp(220px, 40vw, 300px)"
                rotateAmplitude={12}
                scaleOnHover={1.05}
                showMobileWarning={false}
                showTooltip
                displayOverlayContent
              />
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}