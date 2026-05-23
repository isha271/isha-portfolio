"use client";
import { useEffect, useRef } from "react";
export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add("visible")), { threshold: 0.1 });
    ref.current?.querySelectorAll(".reveal").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <section id="about" ref={ref} className="py-28 border-t border-wire">
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal flex items-center gap-4 mb-16"><span className="section-label">01 — About</span><div className="flex-1 h-px bg-wire" /></div>
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="reveal">
            <h2 className="display-md text-paper mb-8" style={{ lineHeight: 1 }}>
              NOT JUST<br />A CODER.<br /><span style={{ color: "var(--crimson)" }}>A RESEARCHER.</span>
            </h2>
            <div className="space-y-5 text-paper/70 leading-relaxed font-light text-sm md:text-base">
              <p>I&apos;m a final-year B.Tech student in Computer Science (AI &amp; ML specialisation) at <span className="text-paper font-medium">Vellore Institute of Technology, Chennai</span> — graduating 2026. My work sits at an unusual intersection: I build systems where physical hardware talks to machine learning models in real time.</p>
              <p>My flagship project <span className="text-paper font-medium">SugarSync</span> is under IEEE review — a non-invasive glucose monitor combining custom NIR/PPG hardware with XGBoost and LightGBM, validated with SHAP, LIME, and LRP. My final-year capstone <span className="text-paper font-medium">MoE-RAG FinIntel</span> is a 5-expert AI system that decodes financial disclosures for retail investors.</p>
              <p>I believe AI without explainability is incomplete. Every model I build, I also interrogate — because in healthcare and finance, the <span className="text-paper font-medium">why matters as much as the what.</span></p>
            </div>
            <div className="flex flex-wrap gap-2 mt-8">
              <a href="mailto:ishrivastava271@gmail.com" className="tag tag-crimson cursor-pointer">ishrivastava271@gmail.com</a>
              <a href="https://www.linkedin.com/in/isha-shrivastava-0628b1355" target="_blank" rel="noopener noreferrer" className="tag cursor-pointer hover:border-paper/40 transition-colors">LinkedIn ↗</a>
              <a href="https://github.com/isha271" target="_blank" rel="noopener noreferrer" className="tag cursor-pointer hover:border-paper/40 transition-colors">GitHub ↗</a>
            </div>
          </div>
          <div className="reveal space-y-5">
            <div className="card-dark rounded-xl p-6">
              <div className="section-label mb-4" style={{ color: "var(--crimson)" }}>Education</div>
              <div className="text-paper font-medium">Vellore Institute of Technology, Chennai</div>
              <div className="text-paper/50 text-sm mt-1">B.Tech · Computer Science Engineering</div>
              <div className="text-paper/50 text-sm">Specialisation: AI &amp; Machine Learning · 2022 – 2026</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Machine Learning","Computer Vision","NLP","Signal Processing","Cryptography","Biomedical AI"].map(c => <span key={c} className="tag text-xs">{c}</span>)}
              </div>
            </div>
            <div className="card-dark rounded-xl p-6">
              <div className="section-label mb-4" style={{ color: "var(--gold)" }}>What I Build</div>
              <div className="space-y-3">
                {([["⚕️","Hardware-ML pipelines for biomedical sensing"],["🔍","Explainable AI (SHAP, LIME, LRP)"],["📄","RAG + LLM pipelines for document intelligence"],["🔐","Privacy-preserving ML with homomorphic encryption"],["📊","Full-stack AI apps (FastAPI + React + Streamlit)"]] as const).map(([icon,text]) => (
                  <div key={text} className="flex items-start gap-3 text-sm text-paper/65"><span className="flex-shrink-0 mt-0.5">{icon}</span><span>{text}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
