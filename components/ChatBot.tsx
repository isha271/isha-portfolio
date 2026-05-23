"use client";
import { useState, useRef, useEffect } from "react";

interface Msg { role: "user" | "ai"; content: string; }

const SUGGESTED = [
  "Tell me about SugarSync",
  "What's the MoE-RAG project?",
  "How does CipherMsg work?",
  "Is she available to hire?",
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "ai", content: "Hi! I'm Isha's AI assistant. Ask me about her projects, research papers, or how to get in touch." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const send = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    setMsgs(m => [...m, { role: "user", content: msg }]);
    setInput(""); setLoading(true);
    const history = msgs.map(m => ({ role: m.role === "user" ? "user" : "assistant", content: m.content }));
    try {
      const res = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, history }),
      });
      const data = await res.json();
      setMsgs(m => [...m, { role: "ai", content: data.reply || "Sorry, try again." }]);
    } catch {
      setMsgs(m => [...m, { role: "ai", content: "Connection error. Try again." }]);
    } finally { setLoading(false); }
  };

  return (
    <>
      {/* Toggle */}
      <button onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
        style={{ background: open ? "var(--slate)" : "var(--crimson)", border: `1px solid ${open ? "var(--wire)" : "var(--crimson)"}`, boxShadow: open ? "none" : "0 0 20px rgba(192,57,43,0.4)" }}
      >
        {open
          ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--paper)" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        }
      </button>

      {/* Window */}
      {open && (
        <div className="fixed z-50 w-80 md:w-96 rounded-xl overflow-hidden"
          style={{ bottom: "5rem", right: "1.5rem", background: "var(--slate)", border: "1px solid var(--wire)", boxShadow: "0 25px 60px rgba(0,0,0,0.7)" }}>
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-wire">
            <div className="w-7 h-7 rounded-sm flex items-center justify-center text-sm" style={{ background: "rgba(192,57,43,0.2)" }}>🤖</div>
            <div>
              <div className="text-sm font-medium text-paper">Ask My AI</div>
              <div className="text-xs font-mono" style={{ color: "var(--crimson)" }}>Portfolio Assistant · RAG</div>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-xs text-paper/30">Online</span>
            </div>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] text-sm px-3 py-2 leading-relaxed ${m.role === "user" ? "chat-user" : "chat-ai"}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="chat-ai px-3 py-2 flex gap-1">
                  {[0,1,2].map(d => (
                    <div key={d} className="w-1.5 h-1.5 rounded-full animate-bounce"
                      style={{ background: "var(--crimson)", animationDelay: `${d*150}ms` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          {msgs.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {SUGGESTED.map(s => (
                <button key={s} onClick={() => send(s)}
                  className="text-xs font-mono px-2 py-1 rounded border border-wire text-paper/40 hover:text-paper hover:border-paper/30 transition-all">
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-4 py-3 border-t border-wire flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Ask about Isha's work…"
              className="flex-1 bg-transparent text-sm text-paper placeholder-mist font-light focus:outline-none" />
            <button onClick={() => send()} disabled={loading || !input.trim()}
              className="w-7 h-7 rounded-sm flex items-center justify-center disabled:opacity-30 transition-opacity flex-shrink-0"
              style={{ background: "var(--crimson)" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
