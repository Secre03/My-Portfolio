import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeProvider.jsx";

const NAV_LINKS = [
  ["home", "Home"],
  ["about", "About"],
  ["contact", "Contact"],
];

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNav = (id) => {
    setActive(id);
    scrollTo(id);
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`animate-slide-down fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 sm:px-10 py-4 sm:py-5 transition-all duration-400 ${
          scrolled || menuOpen
            ? "bg-[rgba(var(--nav-bg),0.88)] backdrop-blur-[18px] border-b border-[var(--border)]"
            : "bg-transparent border-b border-transparent"
        }`}
        style={{
          "--nav-bg":
            theme === "dark" ? "10,10,10" : "245,245,240",
        }}
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
            className={`h-9 sm:h-10 transition-all duration-300 ${
              theme === "dark" ? "brightness-0 invert" : "brightness-0"
            }`}
          />
        </button>

        <div className="hidden sm:flex items-center gap-9">
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

          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-8 h-8 rounded-full border border-[var(--border)] bg-[var(--bg2)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-200"
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={14} />}
          </button>
        </div>

        <div className="sm:hidden flex items-center gap-3">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-8 h-8 rounded-full border border-[var(--border)] bg-[var(--bg2)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-200"
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={14} />}
          </button>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex flex-col justify-center items-center w-8 h-8 gap-[5px] bg-transparent border-none cursor-pointer"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              className="block w-5 h-[2px] bg-[var(--text)] rounded-full transition-all duration-300"
              style={{
                transform: menuOpen
                  ? "translateY(7px) rotate(45deg)"
                  : "none",
              }}
            />
            <span
              className="block w-5 h-[2px] bg-[var(--text)] rounded-full transition-all duration-300"
              style={{
                opacity: menuOpen ? 0 : 1,
                transform: menuOpen ? "scaleX(0)" : "none",
              }}
            />
            <span
              className="block w-5 h-[2px] bg-[var(--text)] rounded-full transition-all duration-300"
              style={{
                transform: menuOpen
                  ? "translateY(-7px) rotate(-45deg)"
                  : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-[99] sm:hidden flex flex-col items-center justify-center gap-10 backdrop-blur-[24px] transition-all duration-300 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{
          background:
            theme === "dark"
              ? "rgba(10,10,10,0.97)"
              : "rgba(245,245,240,0.97)",
        }}
      >
        {NAV_LINKS.map(([id, label], i) => (
          <button
            key={id}
            onClick={() => handleNav(id)}
            className={`bg-transparent border-none cursor-pointer text-[1.6rem] font-black tracking-[0.08em] uppercase transition-all duration-200 ${
              active === id
                ? "text-[var(--accent)]"
                : "text-[var(--text-muted)]"
            }`}
            style={{
              transitionDelay: menuOpen ? `${i * 60}ms` : "0ms",
              transform: menuOpen ? "translateY(0)" : "translateY(16px)",
              opacity: menuOpen ? 1 : 0,
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </>
  );
}