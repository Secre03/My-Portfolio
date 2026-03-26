// src/components/sections/Hero.jsx
import BlurText from "../ui/BlurText.jsx";
import TrueFocus from "../ui/TrueFocus.jsx";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[var(--bg)] pt-20">
      <div
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px)," +
            "linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div
        aria-hidden
        className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] pointer-events-none rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(168,255,87,0.055) 0%, transparent 70%)",
          animation: "pulseGlow 4s ease-in-out infinite",
        }}
      />

      <div
        aria-hidden
        className="absolute w-[480px] h-[480px] rounded-full border border-white/[0.10]"
        style={{ animation: "spinSlow 24s linear infinite" }}
      />
      <div
        aria-hidden
        className="absolute w-[700px] h-[700px] rounded-full border border-white/[0.12]"
        style={{ animation: "spinSlow 36s linear infinite reverse" }}
      />
      <div className="relative z-10 text-center px-6">

       <BlurText
          text="Mark John Milano"
          delay={200}
          animateBy="words"
          direction="top"
          className="text-4xl md:text-6xl lg:text-7xl font-black text-center justify-center mb-8"
        />

        <div
          className="my-5 mb-10" 
          style={{ animation: "fadeUp 0.8s ease 0.4s both" }}
        >
          <TrueFocus
          sentence="Future-Developer Designer"
          manualMode={false}
          blurAmount={5}
          borderColor="#14da3c"
          animationDuration={0.8}
          pauseBetweenAnimations={1}
          wordClassName="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-[var(--text-muted)]"
        />
        </div>

        <div style={{ animation: "float 4s ease-in-out infinite" }}>
          <img
            src="/my-logo.png"
            alt="Logo watermark"
            className="w-[180px] mx-auto opacity-10 brightness-0 invert"
            onError={e => { e.target.style.display = "none"; }}
          />
        </div>
      </div>
    </section>
  );
}