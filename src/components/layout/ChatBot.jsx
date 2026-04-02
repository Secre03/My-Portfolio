import { useState, useRef, useEffect } from "react";
import { useTheme } from "../../context/ThemeProvider.jsx";
import { X, MessageCircle } from "lucide-react";

const SUGGESTIONS = [
  "What projects have you built?",
  "What are you currently learning?",
  "What's your tech stack?",
  "How can I reach you?",
  "Hobbies?",
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm Mark 👋 I'm an IT student still learning and building stuff. Ask me anything about my projects or skills!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const { theme } = useTheme();

  const isDark = theme === "dark";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = async (text) => {
    const content = text ?? input.trim();
    if (!content || loading) return;
    setInput("");

    const userMsg = { role: "user", content };
    const next = [...messages, userMsg];
    setMessages(next);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Something went wrong. Try again!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      <div
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[200] flex items-center gap-2 ${
          !open ? "group" : ""
        }`}
      >
        <span
          className="hidden sm:inline text-[0.72rem] font-semibold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-slide-down transition-opacity duration-200 pointer-events-none whitespace-nowrap"
          style={{
            background: "var(--bg3)",
            color: "var(--accent)",
            border: "1px solid var(--border)",
          }}
        >
          Chat with me
        </span>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle chat"
          className="rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 flex-shrink-0"
          style={{
            width: "52px",
            height: "52px",
            background: open ? "var(--bg3)" : "var(--accent)",
            border: "2px solid var(--accent)",
            color: open ? "var(--accent)" : "#000",
            boxShadow: "0 8px 32px var(--accent-glow)",
          }}
        >
          {open ? (
            <X size={20} strokeWidth={2.5} />
          ) : (
            <MessageCircle size={22} strokeWidth={2} fill="currentColor" />
          )}
        </button>
      </div>

      <div
        className="fixed z-[199] flex flex-col overflow-hidden transition-all duration-300"
        style={{
          bottom: "76px",
          right: "1rem",
          width: "calc(100vw - 2rem)",
          maxWidth: "340px",
          height: open ? "460px" : "0px",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "1.25rem",
          boxShadow: isDark
            ? "0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px var(--accent-glow)"
            : "0 32px 80px rgba(0,0,0,0.12), 0 0 0 1px var(--accent-glow)",
          animation: open ? "fadeUp 0.3s ease both" : "none",
        }}
      >
        <div
          className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <img
            src="/profile.png"
            alt="Mark Milano"
            className="w-8 h-8 rounded-full flex-shrink-0 object-cover object-top"
            style={{ border: "2px solid var(--accent)" }}
          />
          <div className="flex-1">
            <p
              className="text-[0.8rem] font-bold leading-none mb-0.5"
              style={{ color: "var(--text)" }}
            >
              Mark Milano
            </p>
            <div className="flex items-center gap-1.5">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--accent)" }}
              />
              <span
                className="text-[0.65rem]"
                style={{ color: "var(--text-muted)" }}
              >
                IT Student
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3 scrollbar-thin">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`animate-fade-up flex gap-2 ${
                m.role === "user" ? "justify-end" : "justify-start items-end"
              }`}
            >
              {m.role === "assistant" && (
                <img
                  src="/profile.png"
                  alt="Mark"
                  className="w-6 h-6 rounded-full object-cover object-top flex-shrink-0 mb-0.5"
                  style={{ border: "1px solid var(--accent)" }}
                />
              )}

              <div
                className="max-w-[75%] px-3 py-2 rounded-2xl text-[0.78rem] leading-[1.6]"
                style={
                  m.role === "user"
                    ? {
                        background: "var(--accent)",
                        color: "#000",
                        fontWeight: 600,
                        borderBottomRightRadius: "4px",
                      }
                    : {
                        background: "var(--bg3)",
                        color: "var(--text)",
                        borderBottomLeftRadius: "4px",
                      }
                }
              >
                {m.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="animate-fade-in flex gap-2 justify-start items-end">
              <img
                src="/profile.png"
                alt="Mark"
                className="w-6 h-6 rounded-full object-cover object-top flex-shrink-0 mb-0.5"
                style={{ border: "1px solid var(--accent)" }}
              />
              <div
                className="px-4 py-3 rounded-2xl flex gap-1 items-center"
                style={{
                  background: "var(--bg3)",
                  borderBottomLeftRadius: "4px",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full animate-bounce"
                    style={{
                      background: "var(--text-muted)",
                      animationDelay: `${i * 0.15}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {messages.length === 1 && !loading && (
            <div className="animate-fade-up flex flex-col gap-1.5 mt-1">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-left px-3 py-2 rounded-xl text-[0.72rem] font-medium transition-all duration-150 hover:-translate-y-0.5 badge-accent"
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
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            placeholder="Ask me anything..."
            disabled={loading}
            className="flex-1 rounded-xl px-3 py-2 text-[0.78rem] outline-none transition-colors duration-200"
            style={{
              background: "var(--bg2)",
              color: "var(--text)",
              border: "1px solid var(--border)",
              caretColor: "var(--accent)",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
          <button
            onClick={() => send()}
            disabled={!input.trim() || loading}
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-150 disabled:opacity-30 hover:scale-105 active:scale-95"
            style={{ background: "var(--accent)", color: "#000" }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3.5 h-3.5"
            >
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
