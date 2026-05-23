export default function Footer() {
  return (
    <footer className="border-t border-wire py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="font-display text-2xl tracking-widest text-paper">
            IS<span style={{ color: "var(--crimson)" }}>.</span>
          </div>
          <div className="section-label mt-1">Isha Shrivastava · AI/ML Engineer · VIT Chennai 2026</div>
        </div>
        <div className="flex items-center gap-8">
          {[
            { label: "GitHub", href: "https://github.com/isha271" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/isha-shrivastava-0628b1355" },
            { label: "Email", href: "mailto:ishrivastava271@gmail.com" },
            { label: "Resume", href: "https://drive.google.com/file/d/1uZsGJoC6bkROxpDyP_--nHM4dQ4-bbpy/view?usp=sharing" },
          ].map(l => (
            <a key={l.label} href={l.href}
              target={l.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="section-label hover:text-paper transition-colors hover-line">
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="section-label">Open to opportunities · 2026</span>
        </div>
      </div>
    </footer>
  );
}
