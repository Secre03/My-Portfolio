// ─── components/layout/Navbar.jsx ────────────────────────────────────────────
import { useState, useEffect } from "react";

const NAV_LINKS = [
  ["home",    "Home"],
  ["about",   "About"],
  ["contact", "Contact"],
];

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);

      // highlight active section based on scroll position
      const offsets = NAV_LINKS.map(([id]) => {
        const el = document.getElementById(id);
        return { id, top: el ? el.getBoundingClientRect().top : Infinity };
      });
      const current = offsets.filter(({ top }) => top <= 120).at(-1);
      if (current) setActive(current.id);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id) => {
    setActive(id);
    scrollTo(id);
  };

  return (
    <nav
      className={`animate-slide-down fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-10 py-5 transition-all duration-400 ${
        scrolled
          ? "bg-[rgba(10,10,10,0.88)] backdrop-blur-[18px] border-b border-[var(--border)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* Logo */}
      <button
        onClick={() => handleNav("home")}
        className="bg-none border-none cursor-pointer flex items-center"
        aria-label="Go home"
      >
        <img
          src="/my-logo.png"
          alt="Logo"
          className="h-10 brightness-0 invert"
        />
      </button>

      {/* Links */}
      <div className="flex gap-9">
        {NAV_LINKS.map(([id, label]) => (
          <button
            key={id}
            onClick={() => handleNav(id)}
            className={`bg-transparent border-none cursor-pointer text-[0.75rem] tracking-[0.1em] uppercase font-semibold pb-[0.2rem] transition-colors duration-200 ${
              active === id
                ? "text-[var(--accent)] border-b border-[var(--accent)]"
                : "text-[var(--text-muted)] border-b border-transparent"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}