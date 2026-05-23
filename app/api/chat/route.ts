import { NextRequest, NextResponse } from "next/server";

const CONTEXT = `
You are Isha Shrivastava's AI portfolio assistant. Be concise (2-3 sentences max) and professional.

ABOUT: Final-year B.Tech CSE (AI & ML) at VIT Chennai (2022-2026). Researcher and engineer specialising in biomedical ML, NLP, cryptography + ML, and explainable AI.
Email: ishrivastava271@gmail.com | GitHub: github.com/isha271 | LinkedIn: linkedin.com/in/isha-shrivastava-0628b1355
Resume: https://drive.google.com/file/d/1uZsGJoC6bkROxpDyP_--nHM4dQ4-bbpy/view?usp=sharing

PROJECT 1 - SUGARSYNC (IEEE Under Review):
Non-invasive glucose monitoring via dual-wavelength NIR/PPG hardware + ML. Arduino Uno + LM358 op-amp, 660nm + 940nm LEDs. SQI gating, Butterworth bandpass filter, 40+ features. XGBoost: MAE 9.177 mg/dL, R² 0.868. LightGBM: AUC > 0.95, 86%+ accuracy. SHAP + LIME + LRP XAI.

PROJECT 2 - MOE-RAG FINANCIAL INTELLIGENCE (VIT Capstone + Under Review):
5-layer system to simplify SEBI/AMFI financial disclosures. 5 expert modules: Hidden Cost, Legal Risk, Fraud & Anomaly, Sentiment, Structural Complexity. FinBERT + FAISS RAG eliminates hallucination. Hidden Cost F1=0.922 (precision 1.000), Legal Risk F1=0.873, Complexity F1=0.937. 26.8pp precision improvement over TF-IDF baseline. 9,503 annotated chunks.

PROJECT 3 - CIPHERMSG (Published/Submitted):
Ephemeral messaging with FHE (TenSEAL BFV) + RSA-2048 + RGB image steganography. 128-bit noise key pixel shuffling. TTL-based cryptographic self-destruction. Server never decrypts. ~20s process time.

PROJECT 4 - NEURALCRYPT:
Normalising flows as cryptographic primitive. 30% lower overhead. Exact invertibility by construction. Gradient-based attack resistance. Key-conditioned transformations.

3 RESEARCH PAPERS: (1) SugarSync — IEEE under review, (2) MoE-RAG FinIntel — under review, (3) CipherMsg — published/submitted.

INTERNSHIP: ML Intern at DigiHIRE Talent Marketplace (Jun-Jul 2025). Reduced bug identification time 30%. Certified excellent.
`;

function mockResponse(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("sugarsync") || m.includes("glucose") || m.includes("ppg") || m.includes("nir")) return "SugarSync uses custom NIR/PPG hardware (Arduino + LM358) to predict blood glucose without needles. XGBoost achieved MAE 9.177 mg/dL and R² 0.868; LightGBM classifier hit AUC >0.95 with 86%+ accuracy. The IEEE paper is under review.";
  if (m.includes("financial") || m.includes("moe") || m.includes("rag") || m.includes("disclosure") || m.includes("sebi") || m.includes("finbert")) return "The MoE-RAG system analyses SEBI/AMFI financial disclosures using 5 specialised expert modules. Hidden Cost detection achieved F1=0.922 with perfect precision (1.000), beating a TF-IDF baseline by 26.8 percentage points on 9,503 annotated chunks.";
  if (m.includes("cipher") || m.includes("homomorphic") || m.includes("fhe") || m.includes("encrypt") || m.includes("message") || m.includes("ttl")) return "CipherMsg uses Fully Homomorphic Encryption (TenSEAL/BFV) + RSA-2048 + RGB image steganography for self-destructing messages. Data is never decrypted server-side. TTL-based expiry destroys keys and overwrites data cryptographically.";
  if (m.includes("neural") || m.includes("crypt") || m.includes("invertible") || m.includes("normalizing") || m.includes("normalising")) return "NeuralCrypt implements normalising flows (invertible neural networks) as a cryptographic primitive — 30% lower overhead than deeper architectures with exact mathematical invertibility and avalanche-effect resistance to gradient-based attacks.";
  if (m.includes("paper") || m.includes("research") || m.includes("publication") || m.includes("ieee")) return "Isha has 3 research papers: (1) SugarSync — IEEE under review, (2) MoE-RAG FinIntel — under review, (3) CipherMsg homomorphic encryption — published/submitted. All co-authored at VIT Chennai.";
  if (m.includes("skill") || m.includes("tech") || m.includes("stack")) return "Core: Python, PyTorch, XGBoost/LightGBM, LangChain, FinBERT, FAISS. Specialties: XAI (SHAP/LIME/LRP), signal processing, FHE (TenSEAL), RAG pipelines, FastAPI, React, Arduino/embedded systems.";
  if (m.includes("hire") || m.includes("contact") || m.includes("available") || m.includes("job") || m.includes("work")) return "Isha is actively looking for AI/ML engineering roles — graduating VIT Chennai in 2026. Reach her at ishrivastava271@gmail.com or via the contact form on this site.";
  if (m.includes("resume") || m.includes("cv")) return "Isha's resume: https://drive.google.com/file/d/1uZsGJoC6bkROxpDyP_--nHM4dQ4-bbpy/view?usp=sharing";
  if (m.includes("intern") || m.includes("digihire") || m.includes("experience")) return "Isha interned as an ML Engineer at DigiHIRE Talent Marketplace (Jun–Jul 2025, remote), reducing bug identification time by 30% and improving AI interview platform accuracy. Certified excellent by the Co-Founder.";
  if (m.includes("education") || m.includes("vit") || m.includes("degree") || m.includes("college")) return "Isha is in her final year of B.Tech CSE (AI & ML specialisation) at Vellore Institute of Technology, Chennai — graduating 2026.";
  if (m.includes("hi") || m.includes("hello") || m.includes("hey")) return "Hi! I'm Isha's AI assistant. Ask me about her projects, research papers, skills, or how to get in touch.";
  return "I can tell you about Isha's 4 projects (SugarSync, MoE-RAG FinIntel, CipherMsg, NeuralCrypt), 3 research papers, internship, or how to contact her. What would you like to know?";
}

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();
    if (!message) return NextResponse.json({ error: "Message required" }, { status: 400 });
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return NextResponse.json({ reply: mockResponse(message) });
    const messages = [
      { role: "system", content: `You are Isha's portfolio assistant. Be concise (2-3 sentences max).\n\n${CONTEXT}` },
      ...(history || []),
      { role: "user", content: message },
    ];
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model: "gpt-4o-mini", messages, max_tokens: 200 }),
    });
    if (!res.ok) return NextResponse.json({ reply: mockResponse(message) });
    const data = await res.json();
    return NextResponse.json({ reply: data.choices?.[0]?.message?.content || mockResponse(message) });
  } catch { return NextResponse.json({ reply: mockResponse("") }); }
}
