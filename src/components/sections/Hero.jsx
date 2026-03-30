import BlurText from "../ui/BlurText.jsx";
import TrueFocus from "../ui/TrueFocus.jsx";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-[var(--bg)] px-4 pt-16 sm:pt-20">
      <div
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px)," +
            "linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",
          backgroundSize: "clamp(32px, 5vw, 64px) clamp(32px, 5vw, 64px)",
        }}
      />

      <div
        aria-hidden
        className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full"
        style={{
          width: "clamp(280px, 60vw, 650px)",
          height: "clamp(280px, 60vw, 650px)",
          background:
            "radial-gradient(circle, rgba(168,255,87,0.055) 0%, transparent 70%)",
          animation: "pulseGlow 4s ease-in-out infinite",
        }}
      />

      <div className="relative z-10 text-center w-full max-w-5xl mx-auto">
        <BlurText
          text="Mark John Milano"
          delay={200}
          animateBy="words"
          direction="top"
          className="text-[clamp(2rem,8vw,7rem)] font-black text-center justify-center mb-6 sm:mb-8 leading-tight"
        />

        <div
          className="my-4 mb-8 sm:my-5 sm:mb-10"
          style={{ animation: "fadeUp 0.8s ease 0.4s both" }}
        >
          <TrueFocus
            sentence="Future-Developer Designer"
            manualMode={false}
            blurAmount={5}
            borderColor="#14da3c"
            animationDuration={0.8}
            pauseBetweenAnimations={1}
            wordClassName="text-[clamp(1rem,3.5vw,2.25rem)] font-light text-[var(--text-muted)]"
          />
        </div>

        <div style={{ animation: "float 4s ease-in-out infinite" }}>
          <img
            src="/my-logo.png"
            alt="Logo watermark"
            className="w-[clamp(100px,18vw,180px)] mx-auto opacity-10 brightness-0 invert"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>
      </div>
    </section>
  );
}
