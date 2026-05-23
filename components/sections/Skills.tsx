"use client";
import { useEffect, useRef } from "react";

const SKILL_GROUPS = [
  {
    label: "AI / ML",
    color: "var(--crimson)",
    bg: "rgba(192,57,43,0.08)",
    border: "rgba(192,57,43,0.25)",
    skills: ["PyTorch","TensorFlow","XGBoost","LightGBM","scikit-learn","Transformers","FinBERT","Normalising Flows","Gradient Boosting","Random Forests","SVM","Logistic Regression"],
  },
  {
    label: "Applied AI & NLP",
    color: "var(--gold)",
    bg: "rgba(212,160,23,0.08)",
    border: "rgba(212,160,23,0.25)",
    skills: ["LangChain","Llama Index","RAG Pipelines","FAISS","Prompt Engineering","MoE Architecture","Semantic Chunking","FinBERT Embeddings","Hybrid Summarisation","Document Intelligence"],
  },
  {
    label: "Explainable AI",
    color: "rgba(100,200,255,0.9)",
    bg: "rgba(100,200,255,0.06)",
    border: "rgba(100,200,255,0.2)",
    skills: ["SHAP","LIME","LRP","Shapley Values","Feature Importance","Clause-level XAI","Global Interpretability","Local Interpretability","XAI Validation"],
  },
  {
    label: "Signal Processing & Hardware",
    color: "rgba(180,255,180,0.85)",
    bg: "rgba(180,255,180,0.05)",
    border: "rgba(180,255,180,0.18)",
    skills: ["NIR-PPG Sensing","Arduino","SQI Gating","Butterworth Filter","AC/DC Ratio","HRV / RMSSD","Spectral Analysis","LF/HF Ratio","Peak Detection","Biomedical Signal Processing"],
  },
  {
    label: "Cryptography & Security",
    color: "rgba(220,180,255,0.9)",
    bg: "rgba(220,180,255,0.05)",
    border: "rgba(220,180,255,0.18)",
    skills: ["Fully Homomorphic Encryption","TenSEAL","Microsoft SEAL","BFV Scheme","RSA-2048","RLWE","Normalising Flows","Image Steganography","TTL-based Deletion","Side-channel Hardening"],
  },
  {
    label: "Backend & Full-Stack",
    color: "var(--mist)",
    bg: "rgba(138,138,154,0.07)",
    border: "rgba(138,138,154,0.2)",
    skills: ["Python","FastAPI","Flask","Node.js","React","Next.js","MongoDB","PostgreSQL","Streamlit","REST APIs","Docker","Git"],
  },
  {
    label: "Languages",
    color: "var(--paper)",
    bg: "rgba(244,241,235,0.04)",
    border: "rgba(244,241,235,0.12)",
    skills: ["Python","Java","C++","C","JavaScript","TypeScript","HTML/CSS","SQL","Bash"],
  },
  {
    label: "Tools & Platforms",
    color: "var(--mist)",
    bg: "rgba(138,138,154,0.07)",
    border: "rgba(138,138,154,0.2)",
    skills: ["Jupyter","Google Colab","Weights & Biases","Hugging Face","PyMuPDF","pdfplumber","Tesseract OCR","Vercel","GitHub Actions","VS Code"],
  },
];

export default function Skills() {
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
    <section id="skills" ref={ref} className="py-28 border-t border-wire">
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal flex items-center gap-4 mb-16">
          <span className="section-label">04 — Skills</span>
          <div className="flex-1 h-px bg-wire" />
        </div>

        <div className="reveal mb-10">
          <h2 className="display-lg text-paper">TECHNICAL<br />ARSENAL</h2>
          <p className="text-paper/50 mt-3 font-light text-sm max-w-lg">
            Every skill below has been used in a real project or paper — not just listed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {SKILL_GROUPS.map((group, gi) => (
            <div
              key={group.label}
              className="reveal card-dark rounded-xl p-6"
              style={{ borderLeft: `3px solid ${group.color}`, transitionDelay: `${gi * 60}ms` }}
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: group.color }} />
                <span className="font-display text-xl tracking-widest" style={{ color: group.color }}>
                  {group.label.toUpperCase()}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map(skill => (
                  <span
                    key={skill}
                    className="skill-tag text-xs"
                    style={{ background: group.bg, color: group.color, border: `1px solid ${group.border}` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
