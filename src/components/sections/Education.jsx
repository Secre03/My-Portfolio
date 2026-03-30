import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ScrollReveal } from "../ui/ScrollReveal.jsx";
import { EDUCATION } from "../../data/portfolio.js";
import BlurText from "../ui/BlurText.jsx";

export default function Education() {
  const lineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start center", "end center"],
  });

  const spring = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const scaleY = spring;
  const dotTop = useTransform(spring, [0, 1], ["0%", "100%"]);

  return (
    <section className="bg-[var(--bg2)] py-20 sm:py-28 md:py-36 px-4 sm:px-8 md:px-10">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="mb-14 sm:mb-20 md:mb-24">
            <p className="text-[0.68rem] tracking-[0.18em] uppercase text-[var(--accent)] font-bold mb-2">
              Background
            </p>
            <BlurText
              text="Educational Background"
              delay={200}
              animateBy="words"
              direction="top"
              className="text-4xl md:text-5xl lg:text-6xl font-black mb-8"
            />
          </div>
        </ScrollReveal>

        <div ref={lineRef} className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 bg-white/[0.06] hidden md:block rounded-full" />

          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 origin-top hidden md:block rounded-full"
            style={{
              scaleY,
              background:
                "linear-gradient(to bottom, var(--accent), rgba(168,255,87,0.15))",
              boxShadow: "0 0 6px 1px rgba(168,255,87,0.18)",
            }}
          />

          <motion.div
            className="absolute hidden md:block w-4 h-4 rounded-full z-20"
            style={{
              top: dotTop,
              left: "50%",
              marginLeft: "-8px",
              marginTop: "-8px",
              background: "var(--accent)",
              boxShadow: "0 0 8px 3px rgba(168,255,87,0.3)",
            }}
          />

          <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-white/[0.06] block md:hidden rounded-full" />

          <motion.div
            className="absolute left-4 top-0 bottom-0 w-[2px] origin-top block md:hidden rounded-full"
            style={{
              scaleY,
              background:
                "linear-gradient(to bottom, var(--accent), rgba(168,255,87,0.12))",
              boxShadow: "0 0 4px 1px rgba(168,255,87,0.15)",
            }}
          />

          <div className="relative flex flex-col gap-20 sm:gap-36 md:gap-56 py-10 md:py-16">
            {EDUCATION.map((edu, index) => (
              <EducationRow
                key={index}
                edu={edu}
                index={index}
                isEven={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EducationRow({ edu, isEven }) {
  const rowRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start 90%", "start 35%"],
  });

  const opacity = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  const xDesktop = useTransform(
    scrollYProgress,
    [0, 1],
    [isEven ? -60 : 60, 0],
  );
  const xMobile = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <motion.div ref={rowRef} style={{ opacity }} className="relative">
      <motion.div
        style={{ x: xMobile }}
        className="flex flex-col gap-4 pl-10 md:hidden"
      >
        <div className="absolute left-[9px] top-1 w-3 h-3 rounded-full bg-[var(--accent)] ring-[3px] ring-[var(--bg2)] shadow-[0_0_8px_3px_rgba(168,255,87,0.35)] z-10" />

        <MobileInfoBlock edu={edu} />
        <MobileDescBlock edu={edu} />
      </motion.div>

      <motion.div
        style={{ x: xDesktop }}
        className="hidden md:grid md:grid-cols-2 items-center gap-x-16"
      >
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-3 h-3 rounded-full bg-[var(--accent)] ring-[3px] ring-[var(--bg2)] shadow-[0_0_8px_3px_rgba(168,255,87,0.35)]" />
        </div>

        <div
          className={`flex flex-col gap-2 ${isEven ? "md:items-end md:text-right" : "md:order-2 md:items-start md:text-left"}`}
        >
          {isEven ? (
            <InfoBlock edu={edu} align="right" />
          ) : (
            <DescBlock edu={edu} align="left" />
          )}
        </div>

        <div
          className={`flex flex-col gap-2 ${isEven ? "md:items-start md:text-left" : "md:order-1 md:items-end md:text-right"}`}
        >
          {isEven ? (
            <DescBlock edu={edu} align="left" />
          ) : (
            <InfoBlock edu={edu} align="left" />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function MobileInfoBlock({ edu }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center flex-shrink-0">
        <img
          src={edu.logo}
          alt={edu.school}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentNode.innerHTML = `
              <span style="font-size:0.9rem;font-weight:900;color:var(--accent);letter-spacing:-0.03em">
                ${edu.school?.slice(0, 2).toUpperCase() ?? "??"}
              </span>`;
          }}
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <h3 className="text-sm sm:text-base font-extrabold text-[var(--text)] leading-snug">
          {edu.school}
        </h3>
        {edu.address && (
          <p className="text-xs font-semibold text-[var(--accent)]">
            {edu.address}
          </p>
        )}
        <span className="text-[0.65rem] font-medium text-[var(--text-muted)] tracking-[0.25em] uppercase">
          {edu.year}
        </span>
      </div>
    </div>
  );
}

function MobileDescBlock({ edu }) {
  return (
    <div className="relative rounded-xl border border-[var(--border)] bg-[var(--card)] px-5 py-5 text-[var(--text-muted)] text-[0.9rem] leading-relaxed">
      <div className="absolute top-0 left-4 h-[2px] w-8 bg-[var(--accent)] rounded-full" />
      <p className="mt-1">{edu.desc}</p>
    </div>
  );
}

function InfoBlock({ edu, align }) {
  const right = align === "right";
  return (
    <div
      className={`flex flex-col gap-2 ${right ? "items-end text-right" : "items-start text-left"}`}
    >
      <div className="w-28 h-28 rounded-full overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center mb-2">
        <img
          src={edu.logo}
          alt={edu.school}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentNode.innerHTML = `
              <span style="font-size:1.1rem;font-weight:900;color:var(--accent);letter-spacing:-0.03em">
                ${edu.school?.slice(0, 2).toUpperCase() ?? "??"}
              </span>`;
          }}
        />
      </div>
      <h3 className="text-base sm:text-lg font-extrabold text-[var(--text)] leading-snug max-w-[200px]">
        {edu.school}
      </h3>
      {edu.address && (
        <p className="text-sm font-semibold text-[var(--accent)]">
          {edu.address}
        </p>
      )}
      <span className="text-xs font-medium text-[var(--text-muted)] tracking-[0.3em] uppercase">
        {edu.year}
      </span>
    </div>
  );
}

function DescBlock({ edu, align }) {
  const right = align === "right";
  return (
    <div
      className={[
        "relative rounded-2xl border border-[var(--border)] bg-[var(--card)] px-8 py-8",
        "text-[var(--text-muted)] text-[0.95rem] leading-relaxed",
        right ? "text-right" : "text-left",
      ].join(" ")}
    >
      <div
        className={`absolute top-0 h-[2px] w-10 bg-[var(--accent)] rounded-full ${right ? "right-6" : "left-6"}`}
      />
      <p className="mt-1">{edu.desc}</p>
    </div>
  );
}
