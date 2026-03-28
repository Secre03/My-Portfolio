import { useState, useRef, useEffect } from "react";

const SUGGESTIONS = [
  "What projects has Mark built?",
  "What are his skills?",
  "How can I contact Mark?",
  "What are his hobbies?"
];

export default function ChatBot() {
  const [open,     setOpen]     = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm Mark's portfolio assistant. Ask me anything about his work, skills, or projects. 👋" }
  ]);
  const [input,    setInput]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = async (text) => {
    const content = text ?? input.trim();
    if (!content || loading) return;
    setInput("");

    const userMsg = { role: "user", content };
    const next    = [...messages, userMsg];
    setMessages(next);
    setLoading(true);

    try {
      const res  = await fetch("/api/chat", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          messages: next.map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = await res.json();
      setMessages(m => [...m, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages(m => [...m, { role: "assistant", content: "Something went wrong. Try again!" }]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <>
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle chat"
        className="fixed bottom-6 right-6 z-[200] w-13 h-13 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          width:      "52px",
          height:     "52px",
          background: open ? "rgba(20,218,60,0.15)" : "#14da3c",
          border:     open ? "1px solid #14da3c" : "none",
          color:      open ? "#14da3c" : "#000",
          boxShadow:  "0 8px 32px rgba(20,218,60,0.35)",
        }}
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.05 21.95l4.782-1.388A9.953 9.953 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
          </svg>
        )}
      </button>

      {/* chat panel */}
      <div
        className="fixed z-[199] flex flex-col overflow-hidden transition-all duration-300"
        style={{
          bottom:       "76px",
          right:        "1.5rem",
          width:        "340px",
          height:       open ? "480px" : "0px",
          opacity:      open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          background:   "rgba(10,10,10,0.96)",
          border:       "1px solid rgba(255,255,255,0.08)",
          borderRadius: "1.25rem",
          boxShadow:    "0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(20,218,60,0.08)",
        }}
      >
        <div
          className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-black font-black text-xs flex-shrink-0"
            style={{ background: "#14da3c" }}
          >
            M
          </div>
          <div>
            <p className="text-white text-[0.8rem] font-bold leading-none mb-0.5">Mark's Assistant</p>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#14da3c]" />
              <span className="text-[0.65rem] text-white/40">Online</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3 scrollbar-thin">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className="max-w-[80%] px-3 py-2 rounded-2xl text-[0.78rem] leading-[1.6]"
                style={
                  m.role === "user"
                    ? { background: "#14da3c", color: "#000", fontWeight: 600, borderBottomRightRadius: "4px" }
                    : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.85)", borderBottomLeftRadius: "4px" }
                }
              >
                {m.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div
                className="px-4 py-3 rounded-2xl flex gap-1 items-center"
                style={{ background: "rgba(255,255,255,0.06)", borderBottomLeftRadius: "4px" }}
              >
                {[0,1,2].map(i => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          )}

          {messages.length === 1 && !loading && (
            <div className="flex flex-col gap-1.5 mt-1">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-left px-3 py-2 rounded-xl text-[0.72rem] font-medium transition-all duration-150 hover:-translate-y-0.5"
                  style={{
                    background: "rgba(20,218,60,0.06)",
                    border:     "1px solid rgba(20,218,60,0.18)",
                    color:      "rgba(20,218,60,0.85)",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div
          className="flex items-center gap-2 px-3 py-3 flex-shrink-0"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKey}
            placeholder="Ask me anything..."
            disabled={loading}
            className="flex-1 bg-white/[0.05] rounded-xl px-3 py-2 text-[0.78rem] text-white placeholder-white/25 outline-none border border-white/[0.08] focus:border-[rgba(20,218,60,0.35)] transition-colors duration-200"
          />
          <button
            onClick={() => send()}
            disabled={!input.trim() || loading}
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-150 disabled:opacity-30 hover:scale-105 active:scale-95"
            style={{ background: "#14da3c", color: "#000" }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}