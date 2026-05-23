"use client";
import { useEffect, useRef } from "react";

const PAPERS = [
  {
    num:"01",
    title:"Non-Invasive Glucose Monitoring and Prediction via Near Infrared Sensor and Machine Learning",
    nickname:"SugarSync",venue:"IEEE · Under Review · 2025",color:"var(--crimson)",
    authors:"Isha Shrivastava, Shriyansh Patnaik, Ananya Tripathi",
    supervisor:"Dr. S.A. Sajidha · SCOPE, VIT Chennai",
    abstract:"Investigates non-invasive glucose estimation using NIR photoplethysmography signals combined with gradient-boosting ML. Custom Arduino hardware acquires dual-wavelength (660nm/940nm) PPG signals. SQI-gated feature extraction yields 40+ temporal and morphological features. XGBoost regressor achieves MAE 9.177 mg/dL and R² 0.868; LightGBM classifier achieves AUC >0.95. SHAP, LIME, and LRP explainability frameworks ensure clinical transparency and physiological validity.",
    contributions:[
      "End-to-end hardware + ML pipeline: Arduino LM358 AFE → Python acquisition → ML inference",
      "SQI = max(0, 1 − σΔPeak/mean(ΔPeak)) — novel signal quality gating for PPG",
      "40+ features: AC/DC ratio, HRV_RMSSD, HR=60/RR, LF/HF ratio, pulse width, diastolic valley",
      "Dual-model: XGBoost regressor + LightGBM classifier with 70/15/15 split, no subject overlap",
      "Triple XAI: SHAP (global), LIME (local), LRP (signal domain relevance maps)",
      "Physiologically-bounded synthetic augmentation: 1,100 → 2,484 samples",
    ],
    metrics:[["MAE","9.177 mg/dL"],["R²","0.868"],["AUC",">0.95"],["Accuracy","86%+"]],
    technicalNote:"Top SHAP features: AC/DC ratio, HRV_RMSSD, spectral centroid, waveform amplitude — all physiologically validated. LRP reveals systolic upstroke as most relevant signal region.",
  },
  {
    num:"02",
    title:"AI-Powered Investment Disclosure Simplification and Red-Flag Detection Using NLP and Explainable AI",
    nickname:"MoE-RAG FinIntel",venue:"Under Review · VIT Capstone · 2026",color:"var(--gold)",
    authors:"Isha Shrivastava, Ananya Tripathi",
    supervisor:"Dr. Bhuvaneswari Amma N G · SCOPE, VIT Chennai",
    abstract:"Presents a production-grade AI Document Intelligence System for Indian financial disclosures (SEBI SIDs, IPO prospectuses, AMC reports) using a hybrid MoE-RAG architecture. Five independently deployable expert modules — Hidden Cost, Legal Risk, Fraud & Anomaly, Sentiment, Structural Complexity — each with domain-specific heuristics and ML. FinBERT FAISS RAG eliminates hallucination. Weighted scoring engine: Total = 0.25×Legal + 0.20×HiddenCost + 0.20×ProductComplexity + 0.15×DocComplexity + 0.20×FraudSignal. Evaluated on 9,503 annotated chunks; 26.8pp precision improvement over TF-IDF baseline.",
    contributions:[
      "Weighted MoE scoring: Total = 0.25×Legal + 0.20×HiddenCost + 0.20×ProductComplexity + 0.15×DocComplexity + 0.20×Fraud",
      "5 independently deployable expert modules with category-aware SID vs AMC weighting",
      "FinBERT fine-tuned on real SEBI corpus (loss 0.049, 9,503 chunks, 50+ PDFs)",
      "FAISS vector store with cosine similarity retrieval — hallucination rate ~0%",
      "SHAP-LIME dual-layer XAI with clause-level traceability for every risk flag",
      "Working Streamlit dashboard with radar chart, XAI overlays, FastAPI chatbot",
    ],
    metrics:[["Hidden Cost F1","0.922"],["Precision","1.000"],["Legal Risk F1","0.873"],["Precision ↑","26.8pp"]],
    technicalNote:"Real production codebase: FastAPI server, trained FinBERT model (loss 0.049), 50+ real HDFC/TATA/SBI AMC corpus PDFs, 5 expert Python modules, Streamlit dashboard with radar + XAI tabs.",
  },
  {
    num:"03",
    title:"Colour-Coded Self-Destructing Messages Using Homomorphic Encryption",
    nickname:"CipherMsg",venue:"Published/Submitted · VIT Chennai · 2025",color:"rgba(180,220,255,0.9)",
    authors:"Ananya Tripathi, Isha Shrivastava, Shriyansh Patnaik",
    supervisor:"SCOPE, Vellore Institute of Technology Chennai",
    abstract:"Integrates Fully Homomorphic Encryption (TenSEAL/Microsoft SEAL BFV scheme, poly_modulus_degree=16384) into ephemeral communication. RSA-2048 protects colour thresholds and 128-bit noise key. Payload encrypted as homomorphic unit, then encoded into RGB images via PRNG pixel shuffling (2¹²⁸ combinations). TTL-based cryptographic self-destruction destroys keys and overwrites data — server never decrypts. Benchmarked across 3 message sizes from 129 to 8192 words.",
    contributions:[
      "BFV FHE (TenSEAL): poly_modulus_degree=16384, plain_modulus=65537 — RLWE security",
      "RGB steganography: 3-bit pixel encoding + PRNG shuffle seeded by 128-bit noise key",
      "TTL lifecycle: key destruction + secure overwrite on expiry — irrecoverable deletion",
      "Layered security: RSA-2048 + BFV FHE + image encoding — defeats brute-force + side-channel + insider",
      "Performance benchmarks: FHE encrypt ~0.019s, full pipeline ~20s, image 61KB–1.39MB",
      "Formal threat model: adversarial capabilities, attack vectors, security goals, metadata concealment",
    ],
    metrics:[["Key Space","2¹²⁸"],["FHE Scheme","BFV"],["RSA","2048-bit"],["Plaintext Exposed","Zero"]],
    technicalNote:"Key insight: the server calls BFV.Decrypt() only for demonstration — in deployment, all operations occur on ciphertext. The RGB image is both the ciphertext carrier and the self-destruction vehicle.",
  },
];

export default function Research() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add("visible")),{ threshold: 0.05 });
    ref.current?.querySelectorAll(".reveal").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <section id="research" ref={ref} className="py-28 border-t border-wire">
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal flex items-center gap-4 mb-16"><span className="section-label">03 — Research</span><div className="flex-1 h-px bg-wire" /></div>
        <div className="reveal mb-10">
          <h2 className="display-lg text-paper">PUBLICATIONS</h2>
          <p className="text-paper/50 mt-3 font-light text-sm max-w-2xl">3 papers spanning biomedical ML, financial NLP, and applied cryptography — all co-authored at VIT Chennai with real experimental results.</p>
        </div>
        <div className="space-y-8">
          {PAPERS.map((paper,i) => (
            <div key={paper.num} className="reveal card-dark rounded-xl overflow-hidden" style={{borderLeft:`3px solid ${paper.color}`,transitionDelay:`${i*80}ms`}}>
              <div className="p-7 md:p-10">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-display text-4xl opacity-15 select-none">{paper.num}</span>
                      <span className="tag" style={{borderColor:paper.color,color:paper.color}}>{paper.venue}</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-medium text-paper leading-snug max-w-2xl">{paper.title}</h3>
                    <p className="text-paper/40 text-xs font-mono mt-2">{paper.authors}</p>
                    <p className="text-paper/30 text-xs font-mono">{paper.supervisor}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8 mb-5">
                  <div>
                    <div className="section-label mb-3" style={{color:paper.color}}>Abstract</div>
                    <p className="text-paper/60 text-sm leading-relaxed">{paper.abstract}</p>
                    {paper.technicalNote && (
                      <div className="mt-4 p-3 rounded-lg text-xs font-mono text-paper/45 leading-relaxed" style={{background:`${paper.color}08`,border:`1px solid ${paper.color}18`}}>
                        💡 {paper.technicalNote}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="section-label mb-3">Key Contributions</div>
                    <ul className="space-y-1.5">
                      {paper.contributions.map(c => (
                        <li key={c} className="flex gap-2 text-sm text-paper/55">
                          <span className="flex-shrink-0 mt-0.5" style={{color:paper.color}}>→</span><span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-5 border-t border-wire">
                  {paper.metrics.map(([label,value]) => (
                    <div key={label} className="text-center">
                      <div className="font-display text-2xl" style={{color:paper.color}}>{value}</div>
                      <div className="section-label mt-1">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="reveal mt-12 overflow-hidden border-t border-b border-wire py-3">
          <div className="marquee-track">
            {[...Array(2)].map((_,gi) => (
              <span key={gi} className="flex items-center gap-8 pr-8">
                {["XGBoost · MAE 9.177","LightGBM · AUC>0.95","NIR-PPG · SQI Gating","SHAP + LIME + LRP","MoE-RAG · 9,503 chunks","FinBERT loss=0.049","FAISS · 50+ PDFs","TenSEAL · BFV","RSA-2048","2¹²⁸ Key Space","IEEE Under Review","VIT Chennai 2026","Weighted Scoring 0.25+0.20+0.20+0.15+0.20"].map(w => (
                  <span key={w} className="section-label px-4 flex-shrink-0">{w} ·</span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
