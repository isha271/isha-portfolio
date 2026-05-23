"use client";
import { useEffect, useRef, useState } from "react";

const PROJECTS = [
  {
    id: "sugarsync",
    num: "01",
    name: "SugarSync",
    subtitle: "Non-Invasive Glucose Monitoring via NIR-PPG & ML",
    tag: "Biomedical AI · Hardware · IEEE",
    tagColor: "crimson" as const,
    status: "📄 IEEE Under Review",
    problem:
      "Standard continuous glucose monitors require subcutaneous needle sensors implanted under the skin — painful, expensive, prone to infection, and needing replacement every 7–14 days. Over 537 million diabetics globally are affected. Finger-prick glucometers are accurate but impractical for continuous monitoring, meaning dangerous glucose spikes go undetected between readings.",
    solution:
      "Built a complete end-to-end non-invasive system: custom dual-wavelength NIR/PPG hardware (Arduino Uno + LM358 op-amp analog front end, 660nm red + 940nm NIR LEDs, clip-type fingertip sensor) feeds a Python acquisition pipeline. Real-time signal quality gating, Butterworth filtering, and 40+ feature extraction feed XGBoost regression and LightGBM classification models. SHAP, LIME, and LRP explainability ensure every prediction is clinically interpretable.",
    methodology: [
      "Hardware: clip-type reflective sensor houses 660nm red LED (superficial vascular) + 940nm NIR LED (subdermal, glucose-sensitive C-H/O-H absorption) + photodiode → LM358 dual op-amp AFE (transimpedance + gain stage) → Arduino ATmega328P 10-bit ADC → 115200 baud USB serial to Python",
      "Signal Quality Index: SQI = max(0, 1 − σ(ΔPeak)/mean(ΔPeak)) — segments below 0.6 discarded entirely; clean signals windowed into 600-sample (6s) blocks with 300-sample (3s) overlapping sub-windows",
      "Preprocessing: mean-detrending to eliminate low-frequency baseline drift → 4th-order Butterworth bandpass (0.5–5 Hz), zero-phase forward-backward filtering → adaptive peak detection via scipy.signal.find_peaks() with amplitude-adaptive elevation and min inter-peak distance = 0.4×Fs",
      "40+ features extracted: time-domain (mean, std, skewness, kurtosis, Q25), morphological (AC/DC ratio, ACPP, pulse width, diastolic valley, systolic peak), frequency (spectral centroid, LF power, HF power, LF/HF ratio), HRV metrics (HR = 60/RR, RMSSD = √(1/(N-1)·Σ(RR[i+1]−RR[i])²))",
      "Dataset: 1,100 real PPG segments from healthy + diabetic volunteers (sessions paired with Dr. Morepen BG-03 glucometer ground truth) → expanded to 2,484 via GPT-based synthetic augmentation with physiological bounds (glucose 70–300 mg/dL, SQI 0.6–0.98, meal gap 15–360 min)",
      "Models: XGBoost regressor (L1+L2 regularisation, sparsity-aware split finding, SHAP-native support) + LightGBM classifier (histogram-based leaf-wise growth, categorical native handling) — 70/15/15 train/val/test split with no subject overlap across partitions",
      "XAI: SHAP global analysis ranked AC/DC ratio, HRV_RMSSD, spectral centroid, waveform amplitude as top predictors — physiologically valid. LIME local analysis confirmed low HRV + widened pulse width → positive glucose contribution. LRP revealed systolic upstroke region as most relevant signal domain",
    ],
    metrics: [
      ["MAE", "9.177 mg/dL"],
      ["R² Score", "0.868"],
      ["AUC", ">0.95"],
      ["Accuracy", "86%+"],
      ["Features", "40+"],
      ["Dataset", "2,484 samples"],
    ],
    skills: [
      "Python", "XGBoost", "LightGBM", "Arduino (ATmega328P)",
      "SciPy", "scikit-learn", "SHAP", "LIME",
      "LRP (Layer-wise Relevance Propagation)", "NumPy", "Pandas",
      "NIR-PPG Signal Processing", "Butterworth Filter",
      "SQI Gating", "HRV Analysis", "PPG Morphology",
    ],
    impact:
      "Clinically significant proof-of-concept for needle-free continuous glucose monitoring. Demonstrates that 940nm NIR optical signals encode glucose-related hemodynamic cues detectable by ML — a foundation for wearable, consumer-grade monitoring devices that could transform diabetes management for 537M+ patients.",
    codeSnippet: `# SQI gating + feature extraction (real pipeline)
SQI = max(0, 1 - (σ_ΔPeak / mean_ΔPeak))
if SQI < 0.6:
    discard_segment()  # noisy window rejected

# HRV features from PPI peaks
HR     = 60 / mean(RR_intervals)
RMSSD  = sqrt(mean((RR[i+1] - RR[i])**2))
AC_DC  = peak_amplitude / baseline_amplitude

# XGBoost with SHAP explainability
model  = XGBRegressor(reg_alpha=0.1, reg_lambda=1.0)
explainer = shap.TreeExplainer(model)
shap_vals = explainer.shap_values(X_test)`,
    color: "var(--crimson)",
    accentBg: "rgba(192,57,43,0.04)",
    borderColor: "rgba(192,57,43,0.2)",
  },

  {
    id: "moerage",
    num: "02",
    name: "MoE-RAG FinIntel",
    subtitle: "AI-Powered Investment Disclosure Simplification & Red-Flag Detection",
    tag: "NLP · RAG · XAI · Production System",
    tagColor: "gold" as const,
    status: "📄 Paper Under Review · VIT Capstone 2026 · Working Deployed System",
    problem:
      "SEBI/AMFI financial disclosures — IPO prospectuses, Scheme Information Documents (SIDs), and AMC annual reports — are legally mandated but practically impenetrable for retail investors. A typical IPO prospectus exceeds 400 pages; an SID spans 50–100 pages of clause-dense legalese. Strategic obfuscation buries hidden costs (exit loads, TER), liability-shifting clauses, and fraud signals inside boilerplate. Bounded rationality means investors sign away rights they never understood.",
    solution:
      "Production-grade 5-layer MoE-RAG system with real working codebase: PDF parsing (PyMuPDF + pdfplumber + Tesseract OCR) → 5 independently deployable expert modules with domain-specific heuristics → FinBERT FAISS RAG (zero hallucination) → dual-layer XAI (SHAP global + LIME local) → Streamlit dashboard with radar chart, XAI overlays, and FastAPI-powered grounded chatbot. Trained FinBERT model (loss 0.049). Real corpus of 50+ HDFC, TATA, SBI AMC PDFs. Evaluated on 9,503 annotated chunks.",
    methodology: [
      "Layer 1 — Parsing: PyMuPDF (fast text extraction) + pdfplumber (table preservation) + Tesseract OCR (scanned PDFs fallback) → semantic chunking by section headers (Risk Factors, Fees & Expenses, Legal Disclosures) NOT fixed-length splits, preserving contextual clause relationships",
      "Layer 2 — Expert 1, HiddenCostExpert: regex pattern matching for exit loads (r'exit load.*(\\d+\\.\\d+%)'), TER detection, penalty interest clauses, compulsory reinvestment provisions, Direct vs Regular plan complexity flags — each flag increments risk score by 0.20–0.30",
      "Layer 2 — Expert 2, LegalRiskExpert: detects 4 critical categories — No Assurance Clause ('no assurance' keyword), Broad Discretionary Powers ('at its discretion'), Side-Pocketing Provisions ('segregated portfolio'/'side pocket'), Redemption Suspension Rights ('exceptional circumstances') — with sentence-level snippet extraction and plain-English explanations",
      "Layer 2 — Expert 3, FraudSignalExpert: auditor/trustee change detection in text + metadata, related-party transaction frequency analysis (>5 mentions = Medium flag), missing financial tables detection, NAV price divergence analysis (>1% for 3+ consecutive days = High), investor concentration >30% flows = High severity",
      "Layer 2 — Expert 4 & 5, Complexity Experts: DocumentStructuralComplexityExpert (sentence length, nested clause count, legal term density, cross-reference count — SID vs AMC category-aware weighting) + ProductStructuralComplexityExpert (fund structure complexity, mandate scope, multi-asset configuration scoring)",
      "Weighted Scoring Engine: Total_Risk = 0.25×Legal + 0.20×HiddenCost + 0.20×ProductComplexity + 0.15×DocComplexity + 0.20×FraudSignal — weights reflect retail investor harm potential of each risk dimension",
      "Layer 3 — RAG: FinBERT fine-tuned on SEBI corpus (loss 0.049, tokenizer saved to models/finbert_model/) → chunk embeddings stored in FAISS vector index → cosine similarity retrieval of top-k relevant passages → hybrid extractive-abstractive summarisation anchored in retrieved evidence — hallucination rate ~0%",
      "Layer 4 — XAI: SHAP global (cost vocabulary: 'risk','expenses','fees','redemption' highest for hidden cost; 'subject','liability','discretion' for legal risk) + LIME local (clause-level trigger phrase highlighting) — low SHAP-LIME Jaccard overlap (0.11 hidden cost, 0.00 legal/complexity) is correct: they answer fundamentally different questions",
      "Layer 5 — Streamlit dashboard + FastAPI: overall radar chart showing all 5 expert scores, per-expert tabs with severity-coded metric bars (green/yellow/red), XAI explain buttons, feature importance graphs, document chatbot (chat_service.py + llm_service.py) with RAG-grounded responses",
    ],
    metrics: [
      ["Hidden Cost F1", "0.922"],
      ["HC Precision", "1.000"],
      ["Legal Risk F1", "0.873"],
      ["Complexity F1", "0.937"],
      ["Precision ↑", "+26.8pp vs baseline"],
      ["Corpus", "9,503 chunks · 50+ PDFs"],
    ],
    skills: [
      "Python", "FinBERT (fine-tuned, loss 0.049)", "FAISS",
      "LangChain", "SHAP", "LIME", "PyMuPDF", "pdfplumber",
      "Tesseract OCR", "Streamlit", "FastAPI", "scikit-learn",
      "Transformers", "Regex", "pandas", "openpyxl",
      "TF-IDF", "Logistic Regression", "Semantic Chunking",
    ],
    impact:
      "Production-grade system with real code, real trained models, and real SEBI corpus. Turns 100-page financial disclosures into structured risk profiles in seconds — every flag traceable to exact source clause. 26.8 percentage-point precision improvement over TF-IDF baseline ensures alerts investors can actually trust.",
    codeSnippet: `# Actual weighted scoring engine (main.py)
weights = {
    "Legal Risk Analysis":          0.25,
    "Hidden Cost Analysis":         0.20,
    "Product Structural Complexity":0.20,
    "Document Structural Complexity":0.15,
    "Fraud Signal Analysis":        0.20,
}
Total_Risk = Σ(score_i × weight_i) / Σ(weight_i)

# LegalRiskExpert — real detection logic
def analyze_section(self, section):
    if "no assurance" in section.lower():
        snippet = self.extract_snippet(section, "no assurance")
        self.detected_categories["No Assurance Clause"] = snippet

    if "at its discretion" in section.lower():
        self.detected_categories["Broad Discretionary Powers"] = ...

    if "segregated portfolio" in section.lower():
        self.detected_categories["Side-Pocketing Provision"] = ...`,
    color: "var(--gold)",
    accentBg: "rgba(212,160,23,0.04)",
    borderColor: "rgba(212,160,23,0.2)",
  },

  {
    id: "ciphermsg",
    num: "03",
    name: "CipherMsg",
    subtitle: "Colour-Coded Self-Destructing Messages via Homomorphic Encryption",
    tag: "Cryptography · FHE · Privacy",
    tagColor: "paper" as const,
    status: "✅ Published / Submitted",
    problem:
      "Standard encrypted messaging decrypts data server-side for processing — creating a fundamental trust boundary. Even platforms like Snapchat and Signal's disappearing messages protect content but not metadata (timestamps, communication patterns, user identity). This metadata leakage exposes critical contextual information even when message content is encrypted. No existing ephemeral platform achieves true zero-knowledge server processing.",
    solution:
      "Layered cryptographic framework combining three independent security primitives: RSA-2048 key protection + BFV-scheme Fully Homomorphic Encryption (TenSEAL/Microsoft SEAL, poly_modulus_degree=16384) + RGB image steganography with PRNG pixel shuffling. Entire payload — message text + all metadata (TTL, colour thresholds, noise key) — encrypted as a single homomorphic unit. Server performs all operations directly on ciphertext, never decrypting. TTL-based cryptographic self-destruction irreversibly destroys encryption keys and overwrites data on expiry.",
    methodology: [
      "RSA-2048 key generation: choose primes p,q (2048-bit each) → n=p×q, φ(n)=(p-1)(q-1), public exponent e=65537, private d: e·d≡1(mod φ(n)) → encrypt colour thresholds (R,G,B) and 128-bit noise key: c = mᵉ mod n",
      "BFV FHE setup (TenSEAL/Microsoft SEAL): context with poly_modulus_degree=16384, plain_modulus=65537 → plaintext space R = Z_t[x]/(f(x)), security based on RLWE hardness → payload string converted to character ordinal vector → ct = BFV.Encrypt(vector)",
      "Payload construction: CK:<RSA-encrypted thresholds>; NK:<RSA-encrypted noise key>; NS:<noise suffix> → entire string encrypted as one homomorphic unit, concealing all metadata alongside content",
      "RGB encoding: payload → 8-bit ASCII binary string → triple-repetition error correction (redundancy for transmission resilience) → groups of 3 bits mapped to R,G,B channels: bit=0 → random ∈ [0, threshold], bit=1 → random ∈ [threshold+1, 250]",
      "PRNG pixel shuffling: perm = get_permutation(total_pixels, rng(noise_key)) seeded by 128-bit noise key — 2¹²⁸ ≈ 3.4×10³⁸ possible permutations — shuffled pixel list padded to square image",
      "Decryption pipeline: load RGB image → unshuffle via perm⁻¹ → extract 3 bits per pixel via threshold comparison → majority-vote error correction → binary-to-ASCII → optional RSA decrypt thresholds/noise key",
      "TTL lifecycle management: message creation → BFV encryption → encrypted storage with KMS (keys separated from payloads) → automated monitoring of TTL expiry → key destruction (secure key erasure) + data overwrite (prevent residual fragment recovery)",
      "Security analysis: RSA-2048 (GNFS factoring infeasible), BFV RLWE hardness, 128-bit noise key (2¹²⁸ combinations, TTL further constrains brute-force window), constant-time algorithms + noise injection (side-channel hardening), multi-layer obfuscation defeats statistical pattern recognition and known-plaintext attacks",
    ],
    metrics: [
      ["Key Space", "2¹²⁸"],
      ["FHE Scheme", "BFV (RLWE)"],
      ["RSA Key", "2048-bit"],
      ["FHE Encrypt", "~0.019s"],
      ["Full Pipeline", "~20s"],
      ["Server Plaintext", "Zero"],
    ],
    skills: [
      "Python", "TenSEAL", "Microsoft SEAL", "BFV Scheme",
      "RSA-2048", "RLWE", "Flask", "JavaScript",
      "NumPy", "OpenCV", "Triple Repetition Error Correction",
      "PRNG Pixel Shuffling", "Image Steganography",
      "Key Management System (KMS)", "Homomorphic Operations",
    ],
    impact:
      "First practical demonstration that ephemeral messaging can achieve genuine zero-knowledge server guarantees using FHE — the server cannot read messages even under full compromise. Closes the metadata gap that all existing ephemeral platforms leave open. Published research contributing to practical FHE deployment in consumer communication.",
    codeSnippet: `# BFV FHE setup and encryption (TenSEAL)
context = ts.context(
    ts.SCHEME_TYPE.BFV,
    poly_modulus_degree=16384,
    plain_modulus=65537
)
payload = f"CK:{rsa_enc_thresholds}; NK:{rsa_enc_key}; NS:{noise}"
payload_vec = [ord(c) for c in payload]
ct = ts.bfv_vector(context, payload_vec)
# ct is stored and processed — never decrypted server-side

# RGB steganography with PRNG shuffle
perm = get_permutation(total_pixels, rng(noise_key))
shuffled = [pixels[perm[i]] for i in range(total_pixels)]
image = pixels_to_square_image(shuffled)`,
    color: "rgba(200,220,255,0.88)",
    accentBg: "rgba(200,220,255,0.03)",
    borderColor: "rgba(200,220,255,0.12)",
  },

  {
    id: "neuralcrypt",
    num: "04",
    name: "NeuralCrypt",
    subtitle: "Cryptographic Encryption Using Invertible Neural Networks",
    tag: "Neural Nets · Cryptography",
    tagColor: "paper" as const,
    status: "✅ Completed",
    problem:
      "Traditional encryption algorithms (AES, RSA) are mathematically rigid and non-differentiable — integrating them into neural network pipelines breaks end-to-end gradient flow and prevents joint training. Standard deep networks are not invertible by construction, meaning they cannot serve as cryptographic primitives where exact data recovery is mandatory. No existing framework allows encryption to be a learnable, differentiable operation.",
    solution:
      "Lightweight cryptographic framework using normalising flows — a class of invertible neural networks (INNs) where every forward pass has an exact mathematical inverse by construction. Key-conditioned affine coupling layers allow the encryption key to modulate the transformation parameters, making the same architecture behave as encryption or decryption depending on the key. Controlled randomness injection produces a cryptographic avalanche effect. Achieved 30% lower computational overhead compared to deeper non-invertible architectures while maintaining 100% structural invertibility.",
    methodology: [
      "Normalising flows architecture: stack of bijective layers where z = f(x) and x = f⁻¹(z) exactly — forward and inverse passes are both analytically defined, no approximation",
      "Affine coupling layers: split input x into [x₁, x₂] → compute scale s(x₁, key) and shift t(x₁, key) from key-conditioned networks → output z₂ = x₂ ⊙ exp(s) + t → log-determinant = Σs for exact likelihood computation",
      "Key conditioning: encryption key k fed as additional input to scale and shift networks — same weights, different key → completely different transformation → key acts as the cryptographic secret",
      "Avalanche effect: controlled randomness injection via key-dependent noise schedule ensures small change in input or key → large, unpredictable change in output — critical cryptographic property",
      "Gradient-based attack resistance: non-smooth activation functions (leaky-ReLU variants) in scale/shift networks prevent gradient signal from revealing key structure through adversarial queries",
      "Computational efficiency: 30% fewer FLOPs vs equivalent-depth non-invertible architectures because invertibility eliminates the need for separate encoder + decoder networks — one network does both",
    ],
    metrics: [
      ["Overhead Reduction", "−30%"],
      ["Architecture", "Normalising Flows"],
      ["Invertibility", "100% Exact"],
      ["Attack Resistance", "Gradient-based"],
      ["Key Mechanism", "Conditioned affine"],
      ["Framework", "PyTorch"],
    ],
    skills: [
      "PyTorch", "Normalising Flows", "Affine Coupling Layers",
      "Invertible Neural Networks (INN)", "Python",
      "NumPy", "Matplotlib", "Neural Cryptography",
      "Jacobian Computation", "Key-conditioned Networks",
    ],
    impact:
      "Opens a fundamentally new design space where encryption and machine learning coexist in a single differentiable pipeline — enabling gradient-based training through encrypted representations. Directly applicable to privacy-preserving federated learning (encrypt gradients before aggregation) and on-device secure inference (encrypt model weights with INNs).",
    codeSnippet: `# Key-conditioned affine coupling layer (PyTorch)
class KeyConditionedCoupling(nn.Module):
    def forward(self, x, key):
        x1, x2 = x.chunk(2, dim=1)
        # Key modulates scale and shift
        s = self.scale_net(torch.cat([x1, key], dim=1))
        t = self.shift_net(torch.cat([x1, key], dim=1))
        # Exact inverse: x2 = (z2 - t) / exp(s)
        z2 = x2 * torch.exp(s) + t
        log_det = s.sum(dim=1)  # exact log-det
        return torch.cat([x1, z2], dim=1), log_det

    def inverse(self, z, key):
        z1, z2 = z.chunk(2, dim=1)
        s = self.scale_net(torch.cat([z1, key], dim=1))
        t = self.shift_net(torch.cat([z1, key], dim=1))
        x2 = (z2 - t) * torch.exp(-s)  # exact recovery
        return torch.cat([z1, x2], dim=1)`,
    color: "rgba(100,180,255,0.85)",
    accentBg: "rgba(100,180,255,0.03)",
    borderColor: "rgba(100,180,255,0.14)",
  },
];

export default function Projects() {
  const [active, setActive] = useState(0);
  const [showCode, setShowCode] = useState(false);
  const [cardVisible, setCardVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.05 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [active]);

  useEffect(() => {
    setShowCode(false);
    setCardVisible(false);
    const t = setTimeout(() => setCardVisible(true), 20);
    return () => clearTimeout(t);
  }, [active]);

  const p = PROJECTS[active];

  return (
    <section id="projects" ref={ref} className="py-28 border-t border-wire">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="reveal flex items-center gap-4 mb-16">
          <span className="section-label">02 — Projects</span>
          <div className="flex-1 h-px bg-wire" />
        </div>

        <div className="reveal mb-10">
          <h2 className="display-lg text-paper">CASE STUDIES</h2>
          <p className="text-paper/50 mt-3 font-light text-sm max-w-lg">
            Every project is a research problem. Real code, real data, real results.
          </p>
        </div>

        {/* Tab selector */}
        <div className="reveal flex flex-wrap gap-2 mb-10 pb-6 border-b border-wire">
          {PROJECTS.map((proj, i) => (
            <button
              key={proj.id}
              onClick={() => setActive(i)}
              className="font-mono text-xs px-4 py-2 rounded-sm border transition-all duration-200"
              style={
                active === i
                  ? {
                      background: "rgba(192,57,43,0.12)",
                      borderColor: "var(--crimson)",
                      color: "var(--paper)",
                    }
                  : {
                      background: "transparent",
                      borderColor: "var(--wire)",
                      color: "var(--mist)",
                    }
              }
            >
              {proj.num} {proj.name}
            </button>
          ))}
        </div>

        {/* Active project — key forces full remount on tab change */}
        <div
          key={p.id}
          className={`reveal${cardVisible ? " visible" : ""}`}
          style={{
            background: p.accentBg,
            border: `1px solid ${p.borderColor}`,
            borderRadius: "12px",
            padding: "clamp(1.5rem,4vw,3rem)",
          }}
        >
          {/* Project header */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-display text-5xl opacity-15 select-none">{p.num}</span>
                <span
                  className={`tag ${
                    p.tagColor === "crimson"
                      ? "tag-crimson"
                      : p.tagColor === "gold"
                      ? "tag-gold"
                      : ""
                  }`}
                >
                  {p.tag}
                </span>
              </div>
              <h3 className="display-md text-paper">{p.name}</h3>
              <p className="text-paper/45 font-light mt-1 text-sm">{p.subtitle}</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-mono text-xs text-paper/35">{p.status}</span>
              <a
                href="https://github.com/isha271"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline py-2 px-4 text-xs"
              >
                GitHub ↗
              </a>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left: narrative + methodology */}
            <div className="lg:col-span-2 space-y-8">
              {/* Problem / Solution / Impact */}
              {(
                [
                  ["⚠ The Problem", p.problem],
                  ["💡 The Solution", p.solution],
                  ["🚀 The Impact", p.impact],
                ] as const
              ).map(([label, content]) => (
                <div key={label}>
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-0.5 h-4 rounded-full"
                      style={{ background: p.color }}
                    />
                    <span className="section-label" style={{ color: p.color }}>
                      {label}
                    </span>
                  </div>
                  <p className="text-paper/65 text-sm leading-relaxed pl-4">{content}</p>
                </div>
              ))}

              {/* Methodology */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-0.5 h-4 rounded-full bg-mist" />
                  <span className="section-label">Technical Methodology</span>
                </div>
                <ol className="space-y-3 pl-4">
                  {p.methodology.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm text-paper/58">
                      <span
                        className="font-mono flex-shrink-0 mt-0.5"
                        style={{ color: p.color }}
                      >
                        {String(i + 1).padStart(2, "0")}.
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Code snippet toggle */}
              <div>
                <button
                  onClick={() => setShowCode(!showCode)}
                  className="flex items-center gap-2 section-label hover:text-paper transition-colors mb-3 cursor-pointer"
                >
                  <span style={{ color: p.color }}>{showCode ? "▼" : "▶"}</span>
                  {showCode ? "Hide" : "Show"} Code Snippet
                </button>
                {showCode && (
                  <pre
                    className="card-dark rounded-lg p-5 text-xs font-mono text-paper/75 overflow-x-auto leading-relaxed"
                    style={{ borderLeft: `2px solid ${p.color}` }}
                  >
                    {p.codeSnippet}
                  </pre>
                )}
              </div>

              {/* Skills */}
              <div>
                <div className="section-label mb-3">Skills &amp; Tools Used</div>
                <div className="flex flex-wrap gap-2">
                  {p.skills.map((s) => (
                    <span
                      key={s}
                      className="skill-tag"
                      style={{
                        background: `${p.color}12`,
                        color: p.color,
                        border: `1px solid ${p.color}28`,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: metrics */}
            <div className="space-y-3">
              <div className="section-label mb-4">Key Results</div>
              {p.metrics.map(([label, value]) => (
                <div key={label} className="card-dark rounded-lg p-4">
                  <div
                    className="font-display text-2xl md:text-3xl"
                    style={{ color: p.color }}
                  >
                    {value}
                  </div>
                  <div className="section-label mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
