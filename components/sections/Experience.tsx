"use client";
import { useEffect, useRef } from "react";

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.05 }
    );
    ref.current?.querySelectorAll(".reveal").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="experience" ref={ref} className="py-28 border-t border-wire">
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal flex items-center gap-4 mb-16">
          <span className="section-label">05 — Experience</span>
          <div className="flex-1 h-px bg-wire" />
        </div>

        <div className="reveal mb-10">
          <h2 className="display-lg text-paper">EXPERIENCE</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main internship */}
          <div className="reveal lg:col-span-2 card-dark rounded-xl p-8 md:p-10" style={{ borderLeft: "3px solid var(--crimson)" }}>
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <span className="tag tag-crimson mb-3 inline-block">Machine Learning Intern</span>
                <h3 className="text-xl font-medium text-paper">DigiHIRE | Talent Marketplace</h3>
                <p className="text-paper/40 text-sm font-mono mt-1">A Unit of Celebratinglife InfoTech Pvt. Ltd. · Remote, Bengaluru</p>
              </div>
              <div className="text-right">
                <div className="font-mono text-xs text-paper/40">Jun 9 – Jul 7, 2025</div>
                <div className="font-mono text-xs text-paper/40 mt-1">Remote · 4 weeks</div>
                <div className="mt-2">
                  <span className="tag tag-green">✓ Certified Excellent</span>
                </div>
              </div>
            </div>

            <p className="text-paper/60 text-sm leading-relaxed mb-7">
              Embedded in the Technology Team to validate and improve an AI-powered interview assessment platform —
              working at the intersection of ML testing, QA engineering, and product UX.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { metric: "30%", desc: "Reduction in bug identification time through streamlined testing workflows and systematic test case design", color: "var(--crimson)" },
                { metric: "↑ Accuracy", desc: "Improved AI interview platform decision-making accuracy by designing and executing edge-case interview scenarios", color: "var(--gold)" },
                { metric: "Robustness", desc: "Simulated real-time interview environments, testing platform robustness under diverse user conditions pre-launch", color: "var(--mist)" },
              ].map(({ metric, desc, color }) => (
                <div key={metric} className="flex gap-5 items-start">
                  <div className="font-display text-2xl flex-shrink-0 w-24 text-right leading-none pt-0.5" style={{ color }}>{metric}</div>
                  <p className="text-sm text-paper/50 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-wire">
              <div className="section-label mb-3">Full Responsibilities</div>
              <ul className="grid md:grid-cols-2 gap-2">
                {[
                  "Functional testing of AI interview platform",
                  "Designed AI interview test cases & scenarios",
                  "Identified and reported critical bugs pre-launch",
                  "Simulated real-time interview environments",
                  "Feedback on AI behaviour and UX flows",
                  "Enhanced assessment logic via edge-case testing",
                  "Collaborated with dev team on workflow optimisations",
                  "Contributed to platform robustness under diverse conditions",
                ].map(r => (
                  <li key={r} className="flex gap-2 text-sm text-paper/45">
                    <span style={{ color: "var(--crimson)" }} className="flex-shrink-0">→</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column */}
          <div className="reveal space-y-5">
            {/* Education */}
            <div className="card-dark rounded-xl p-6" style={{ borderLeft: "3px solid var(--gold)" }}>
              <span className="tag tag-gold mb-4 inline-block">Education</span>
              <h3 className="text-lg font-medium text-paper">Vellore Institute of Technology</h3>
              <p className="text-paper/45 text-sm mt-1">Chennai, Tamil Nadu</p>
              <div className="mt-4 space-y-2 text-sm text-paper/55">
                <div>B.Tech · Computer Science Engineering</div>
                <div>Specialisation: AI & Machine Learning</div>
                <div className="font-mono text-xs text-paper/35 mt-2">2022 – 2026 · Final Year</div>
              </div>
            </div>

            {/* Currently */}
            <div className="card-dark rounded-xl p-6">
              <div className="section-label mb-4">Currently</div>
              <div className="space-y-3 text-sm text-paper/55">
                {[
                  ["📄", "3 research papers (2 under review, 1 published)"],
                  ["🎓", "Final year — graduating 2026"],
                  ["🔍", "Actively seeking AI/ML roles"],
                  ["📍", "Chennai, Tamil Nadu"],
                  ["✉", "ishrivastava271@gmail.com"],
                ].map(([icon, text]) => (
                  <div key={String(text)} className="flex gap-3">
                    <span>{icon}</span><span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="card-dark rounded-xl p-5">
              <div className="section-label mb-3">Programming Languages</div>
              <div className="flex flex-wrap gap-2">
                {["Python", "Java", "C++", "C", "JavaScript", "HTML/CSS"].map(l => (
                  <span key={l} className="tag text-xs">{l}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
