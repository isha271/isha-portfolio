"use client";
import { useState, useEffect } from "react";
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 30); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
  const links = ["About","Projects","Research","Skills","Experience","Contact"];
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-ink/95 backdrop-blur-md border-b border-wire" : ""}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#hero" className="font-display text-xl tracking-widest text-paper">IS<span style={{color:"var(--crimson)"}}>.</span></a>
        <div className="hidden md:flex items-center gap-7">
          {links.map(l => <a key={l} href={`#${l.toLowerCase()}`} className="section-label hover:text-paper transition-colors hover-line">{l}</a>)}
          <a href="https://drive.google.com/file/d/1uZsGJoC6bkROxpDyP_--nHM4dQ4-bbpy/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn-primary py-2 px-4 text-xs">Resume ↗</a>
        </div>
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setOpen(!open)}>
          <span className={`block w-5 h-px bg-paper transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-px bg-paper transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-paper transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>
      {open && <div className="md:hidden bg-slate border-t border-wire px-6 py-6 flex flex-col gap-4">
        {links.map(l => <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} className="section-label hover:text-paper">{l}</a>)}
        <a href="https://drive.google.com/file/d/1uZsGJoC6bkROxpDyP_--nHM4dQ4-bbpy/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn-primary justify-center py-2">Resume ↗</a>
      </div>}
    </nav>
  );
}
