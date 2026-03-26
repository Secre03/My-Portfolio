import { useState, useEffect } from "react";

export function Noise() {
  return (
    <div
      className="fixed pointer-events-none z-[9999] opacity-[0.028] animate-[grain_0.45s_steps(1)_infinite]"
      style={{
        inset: "-50%",
        width: "200%",
        height: "200%",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

export function Spotlight() {
  const [pos, setPos] = useState({ x: -999, y: -999 });

  useEffect(() => {
    const h = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: `radial-gradient(550px circle at ${pos.x}px ${pos.y}px, rgba(168,255,87,0.045), transparent 60%)`,
      }}
    />
  );
}