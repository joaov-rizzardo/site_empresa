"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setOpen(false);
    if (pathname === "/") {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/" + href);
    }
  };

  const handleLogoClick = () => {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-base/90 backdrop-blur-xl border-b border-white/[.06] shadow-lg shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={handleLogoClick}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Code2 size={16} className="text-white" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">
            Dev<span className="text-primary">Studio</span>
          </span>
        </button>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-sm text-dim hover:text-ink transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleNavClick("#contato")}
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium
              hover:bg-primary/90 transition-all duration-200 hover:shadow-[0_0_20px_rgba(108,99,255,0.4)]"
          >
            Solicitar Orçamento
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 hover:border-primary/50 transition-colors"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-surface/95 backdrop-blur-xl border-b border-white/[.06]"
          >
            <nav className="px-6 py-4 flex flex-col gap-1">
              {links.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-left py-3 px-4 rounded-lg text-ink/80 hover:text-ink hover:bg-white/[.04] transition-all text-sm"
                >
                  {link.label}
                </motion.button>
              ))}
              <button
                onClick={() => handleNavClick("#contato")}
                className="mt-2 w-full py-3 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Solicitar Orçamento
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
