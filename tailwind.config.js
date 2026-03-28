/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Colours that match our CSS variables
      colors: {
        bg: "var(--bg)",
        bg2: "var(--bg2)",
        bg3: "var(--bg3)",
        card: "var(--card)",
        accent: "var(--accent)",
        border: "var(--border)",
        "text-muted": "var(--text-muted)",
        "text-dim": "var(--text-dim)",
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },

      //Font sizes (mirrors clamp values for hero/headings)
      fontSize: {
        hero: [
          "clamp(3.2rem, 9vw, 8rem)",
          { lineHeight: "1", fontWeight: "900" },
        ],
        h2: [
          "clamp(2rem, 5vw, 3.5rem)",
          { lineHeight: "1.1", fontWeight: "900" },
        ],
        "h2-lg": [
          "clamp(2.5rem, 6vw, 5rem)",
          { lineHeight: "1.1", fontWeight: "900" },
        ],
        overline: ["0.68rem", { letterSpacing: "0.18em", fontWeight: "700" }],
        label: ["0.73rem", { letterSpacing: "0.05em" }],
        tiny: ["0.67rem", {}],
      },

      letterSpacing: {
        tighter2: "-0.04em",
        tighter3: "-0.03em",
        wide2: "0.18em",
        wide3: "0.22em",
        wide4: "0.25em",
      },

      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.25rem",
      },

      boxShadow: {
        preview: "0 24px 64px rgba(0,0,0,0.75)",
        card: "0 4px 32px rgba(0,0,0,0.5)",
      },

      backgroundSize: {
        grid: "64px 64px",
      },

      //animations
      keyframes: {
        "marquee-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        slideDown: {
          from: { opacity: "0", transform: "translateY(-12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
        blink: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0" } },
        float: {
          "0%,100%": { transform: "translateY(0) rotate(-4deg)" },
          "50%": { transform: "translateY(-14px) rotate(-4deg)" },
        },
        spinSlow: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        pulseGlow: { "0%,100%": { opacity: "0.3" }, "50%": { opacity: "0.7" } },
        grain: {
          "0%,100%": { transform: "translate(0,0)" },
          "10%": { transform: "translate(-2%,-3%)" },
          "20%": { transform: "translate(3%,2%)" },
          "30%": { transform: "translate(-1%,3%)" },
          "40%": { transform: "translate(2%,-1%)" },
          "50%": { transform: "translate(-3%,1%)" },
          "60%": { transform: "translate(1%,2%)" },
          "70%": { transform: "translate(-2%,-2%)" },
          "80%": { transform: "translate(3%,3%)" },
          "90%": { transform: "translate(-1%,-1%)" },
        },
      },

      animation: {
        "marquee-l": "marquee-left 30s linear infinite",
        "marquee-r": "marquee-right 25s linear infinite",
        "fade-up": "fadeUp 0.8s ease both",
        "fade-in": "fadeIn 0.35s ease",
        "slide-down": "slideDown 0.5s ease",
        "scale-in": "scaleIn 0.4s ease",
        blink: "blink 1s step-end infinite",
        float: "float 4s ease-in-out infinite",
        "spin-slow": "spinSlow 24s linear infinite",
        "spin-slow-rev": "spinSlow 36s linear infinite reverse",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        grain: "grain 0.45s steps(1) infinite",
      },
    },
  },
  plugins: [],
};
