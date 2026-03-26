import { ScrollReveal } from "../ui/ScrollReveal.jsx";
import TiltedCard from "../ui/TiltedCard.jsx";
import MarkMilano from "/assets/Mark Milano.jpg";
import BlurText from "../ui/BlurText.jsx";

const CARDS = [
  {
    label: "DEVELOP",
    desc: "I am a student who is currently learning how to build web applications using React, Tailwind CSS, and PHP. I am still improving my skills and continuously exploring new technologies to grow as a developer.",
  },
  {
    label: "Design",
    desc: "I am currently learning the basics of design and improving my creativity through practice. As a student, I am open to feedback and eager to explore new ideas to enhance my design skills.",
  },
];

const QUOTE = "\u201cStrong foundations create limitless futures.\u201d";

export default function WhatIDo() {
  return (
    <section className="bg-[var(--bg)] py-24 px-10">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {CARDS.map(({ label, desc }, i) => (
            <ScrollReveal key={label} delay={i * 100}>
              <div className="relative overflow-hidden bg-[var(--card)] border border-[var(--border)] rounded-2xl p-9 h-full">
                {/* Accent bar */}
                <div className="absolute top-0 left-0 w-[3px] h-12 bg-[var(--accent)] rounded-br" />
                <h3 className="text-[2rem] font-black tracking-tight text-[var(--text)] mb-4">
                  {label}
                </h3>
                <p className="text-[var(--text-muted)] text-[0.9rem] leading-[1.78]">
                  {desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

          <ScrollReveal>
            <p className="text-[0.68rem] tracking-[0.25em] uppercase text-[var(--accent)] font-bold mb-4">
                Who I Am
              </p>

              <h3 className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-black tracking-tight text-[var(--text)] leading-tight mb-5">
                Mark John L. Milano
              </h3>

              <p className="text-[var(--text-muted)] text-[0.95rem] leading-[1.85] mb-6 max-w-[480px]">
                I am a 3rd-year IT student at{" "}
                <span className="text-[var(--accent)] font-semibold">
                  Computer Arts Technological College
                </span>
                , currently learning and developing my skills in programming and design. As a student, I am still exploring different areas such as web and mobile development, as well as UI/UX design. I am eager to learn new technologies, improve my abilities, and gain experience by working on real-world projects.
              </p>
            <blockquote className="border-l-[3px] border-[var(--accent)] pl-5 mb-6 text-[var(--text-dim)] italic text-[0.88rem] leading-[1.7]">
              {QUOTE}
            </blockquote>

         
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="flex justify-end">
             

            <TiltedCard
              imageSrc={MarkMilano}
              altText="Mark Milano | IMG"
              captionText="Let's Work Together"
              containerHeight="380px"
              containerWidth="300px"
              imageHeight="380px"
              imageWidth="300px"
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