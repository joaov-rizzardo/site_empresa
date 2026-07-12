"use client";
import { siteConfig, whatsappUrl } from "@/lib/site";

const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[.06] bg-surface/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-baseline gap-1.5 mb-4 group w-fit">
              <span
                data-text="Vex"
                className="vex-mark font-display font-extrabold text-2xl tracking-tight gradient-text leading-none"
              >
                Vex
              </span>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-dim/70 group-hover:text-dim transition-colors">
                software
              </span>
            </div>
            <p className="text-dim text-sm leading-relaxed max-w-xs">
              Transformando ideias em sistemas que funcionam. Desenvolvimento web e mobile
              sob medida para empresas que querem crescer.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-semibold text-sm text-ink mb-5">Navegação</h4>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-dim hover:text-ink transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-display font-semibold text-sm text-ink mb-5">Contato</h4>
            <ul className="space-y-3 text-sm text-dim">
              <li>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-ink transition-colors">
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink transition-colors"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li className="text-dim/50 text-xs mt-4">
                {siteConfig.city}, {siteConfig.region} — Brasil
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[.05] pt-7 flex justify-center">
          <p className="text-xs text-dim/60">
            © {new Date().getFullYear()} Vex Software. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
