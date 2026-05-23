"use client";
import { useState, useRef, useEffect } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [err, setErr] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.05 }
    );
    ref.current?.querySelectorAll(".reveal").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading"); setErr("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) { setStatus("success"); setForm({ name: "", email: "", message: "" }); }
      else { setStatus("error"); setErr(data.error || "Something went wrong."); }
    } catch { setStatus("error"); setErr("Network error. Please try again."); }
  };

  return (
    <section id="contact" ref={ref} className="py-28 border-t border-wire">
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal flex items-center gap-4 mb-16">
          <span className="section-label">06 — Contact</span>
          <div className="flex-1 h-px bg-wire" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left */}
          <div className="reveal">
            <h2 className="display-lg text-paper mb-6" style={{ lineHeight: 0.95 }}>
              LET&apos;S<br />
              <span style={{ color: "var(--crimson)" }}>WORK</span><br />
              TOGETHER.
            </h2>
            <p className="text-paper/55 leading-relaxed font-light mb-10 max-w-sm text-sm">
              I&apos;m actively looking for AI/ML engineering roles and research collaborations.
              Final-year student at VIT Chennai, graduating 2026.
            </p>

            <div className="space-y-3">
              {[
                { label: "Email", value: "ishrivastava271@gmail.com", href: "mailto:ishrivastava271@gmail.com", icon: "✉" },
                { label: "LinkedIn", value: "isha-shrivastava-0628b1355", href: "https://www.linkedin.com/in/isha-shrivastava-0628b1355", icon: "in" },
                { label: "GitHub", value: "github.com/isha271", href: "https://github.com/isha271", icon: "⌥" },
                { label: "Resume", value: "View / Download PDF", href: "https://drive.google.com/file/d/1uZsGJoC6bkROxpDyP_--nHM4dQ4-bbpy/view?usp=sharing", icon: "↗" },
              ].map(c => (
                <a key={c.label} href={c.href}
                  target={c.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 card-dark rounded-lg hover:border-paper/20 transition-all group"
                >
                  <div className="w-8 h-8 rounded-sm flex items-center justify-center font-mono text-sm flex-shrink-0"
                    style={{ background: "rgba(192,57,43,0.12)", color: "var(--crimson)" }}>
                    {c.icon}
                  </div>
                  <div>
                    <div className="section-label">{c.label}</div>
                    <div className="text-sm text-paper/60 group-hover:text-paper transition-colors mt-0.5">{c.value}</div>
                  </div>
                  <span className="ml-auto text-paper/20 group-hover:text-paper/50 transition-colors text-sm">↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="reveal">
            {status === "success" ? (
              <div className="card-dark rounded-xl p-12 text-center flex flex-col items-center justify-center gap-4 min-h-[400px]">
                <div className="font-display text-5xl" style={{ color: "var(--crimson)" }}>SENT.</div>
                <p className="text-paper/55 text-sm">Message received. I&apos;ll reply within 24 hours.</p>
                <button onClick={() => setStatus("idle")} className="btn-outline mt-4 text-xs py-2">Send another</button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                {[
                  { field: "name", type: "text", placeholder: "Your name" },
                  { field: "email", type: "email", placeholder: "your@email.com" },
                ].map(({ field, type, placeholder }) => (
                  <div key={field}>
                    <label className="section-label block mb-2">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                    <input type={type} className="input-dark" placeholder={placeholder}
                      value={form[field as "name" | "email"]}
                      onChange={e => setForm({ ...form, [field]: e.target.value })} required />
                  </div>
                ))}
                <div>
                  <label className="section-label block mb-2">Message</label>
                  <textarea className="input-dark resize-none" rows={6}
                    placeholder="Tell me about the role, project, or collaboration…"
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })} required />
                </div>
                {status === "error" && (
                  <div className="text-sm font-mono p-3 rounded" style={{ background: "rgba(192,57,43,0.1)", color: "var(--crimson)", border: "1px solid rgba(192,57,43,0.3)" }}>{err}</div>
                )}
                <button type="submit" disabled={status === "loading"} className="btn-primary w-full justify-center disabled:opacity-50">
                  {status === "loading" ? "Sending…" : "Send Message →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
