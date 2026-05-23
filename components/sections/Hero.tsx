"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;
    const nodes = Array.from({ length: 55 }, () => ({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, r: Math.random() * 1.5 + 0.5 }));
    let id: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y, d = Math.sqrt(dx*dx+dy*dy);
          if (d < 100) { ctx.beginPath(); ctx.strokeStyle = `rgba(192,57,43,${(1-d/100)*0.18})`; ctx.lineWidth = 0.5; ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke(); }
        }
        ctx.beginPath(); ctx.arc(nodes[i].x, nodes[i].y, nodes[i].r, 0, Math.PI*2); ctx.fillStyle = "rgba(192,57,43,0.45)"; ctx.fill();
        nodes[i].x += nodes[i].vx; nodes[i].y += nodes[i].vy;
        if (nodes[i].x < 0 || nodes[i].x > canvas.width) nodes[i].vx *= -1;
        if (nodes[i].y < 0 || nodes[i].y > canvas.height) nodes[i].vy *= -1;
      }
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-end grid-lines overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span className="font-display text-center leading-none" style={{ fontSize: "clamp(5rem,20vw,20rem)", color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.035)" }}>AI/ML</span>
      </div>
      <div className="absolute top-20 right-8 md:right-16 z-10">
        <div className="relative w-24 h-24 md:w-36 md:h-36">
          <div className="absolute inset-0 rounded-full" style={{ boxShadow: "0 0 0 2px rgba(192,57,43,0.5), 0 0 30px rgba(192,57,43,0.2)" }} />
          <Image src="/profile.jpg" alt="Isha Shrivastava" fill className="rounded-full object-cover grayscale" priority />
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-ink" />
        </div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 pt-28 w-full">
        <div className="flex items-center gap-3 mb-6">
          <span className="section-label">Available for opportunities · 2026</span>
          <div className="flex-1 h-px bg-wire max-w-xs" />
          <span className="section-label">VIT Chennai · AI &amp; ML</span>
        </div>
        <h1 className="display-xl text-paper" style={{ lineHeight: 0.88 }}>
          ISHA<br /><span style={{ color: "var(--crimson)" }}>SHRI</span>VASTAVA
        </h1>
        <div className="flex flex-col md:flex-row md:items-end justify-between mt-8 gap-8">
          <div className="max-w-xl">
            <p className="text-lg md:text-xl text-paper/75 font-light leading-relaxed">
              AI/ML Engineer building intelligent systems at the intersection of{" "}
              <span className="text-paper font-medium">hardware sensing,</span>{" "}
              <span className="text-paper font-medium">NLP,</span> and{" "}
              <span className="text-paper font-medium">explainable AI.</span>
            </p>
            <div className="flex flex-wrap gap-2 mt-5">
              <span className="tag tag-crimson">XAI Research</span>
              <span className="tag tag-crimson">RAG Pipelines</span>
              <span className="tag tag-crimson">Biomedical ML</span>
              <span className="tag tag-crimson">FHE / Privacy</span>
              <span className="tag">3 Papers</span>
            </div>
          </div>
          <div className="flex gap-8 flex-shrink-0">
            {([["9.177","MAE mg/dL","SugarSync"],["F1 0.92","Hidden Cost","MoE-RAG"],["30%","Bug Detection","DigiHIRE"]] as const).map(([n,s,note]) => (
              <div key={n} className="text-center">
                <div className="font-display text-3xl md:text-4xl" style={{ color: "var(--crimson)" }}>{n}</div>
                <div className="section-label mt-1">{s}</div>
                <div className="section-label" style={{ color: "rgba(192,57,43,0.7)" }}>{note}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-10">
          <a href="#projects" className="btn-primary">View Projects →</a>
          <a href="https://drive.google.com/file/d/1uZsGJoC6bkROxpDyP_--nHM4dQ4-bbpy/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn-outline">Resume ↗</a>
          <a href="#contact" className="btn-outline">Get In Touch</a>
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center pb-4 z-10">
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-wire to-crimson" />
      </div>
    </section>
  );
}
