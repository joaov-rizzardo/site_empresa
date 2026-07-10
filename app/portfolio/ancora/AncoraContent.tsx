"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  LayoutTemplate,
  ShieldCheck,
  HeartHandshake,
  MessagesSquare,
  Quote,
  ClipboardCheck,
  MessageCircle,
  MonitorSmartphone,
  FlaskConical,
  Zap,
  ChevronDown,
  X,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  GitFork,
} from "lucide-react";
import PhoneMockup from "@/components/ui/PhoneMockup";
import MonitorMockup from "@/components/ui/MonitorMockup";
import MacBookMockup from "@/components/ui/MacBookMockup";

/* ─── Project accent — sage green, echoing the Espaço Âncora brand ─── */
const SAGE = "#8FA98D";
const SAGE_BG = "rgba(143,169,141,0.12)";
const SAGE_SOFT = "rgba(143,169,141,0.08)";

const stack = [
  "Next.js 14",
  "React 18",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "React Hook Form",
  "Zod",
];

const features = [
  {
    icon: ShieldCheck,
    label: "Credibilidade imediata",
    desc: "Acima da dobra, o visitante já vê quem é a profissional, seu registro no CRP, especialização e as modalidades de atendimento.",
    color: SAGE,
    bg: SAGE_BG,
  },
  {
    icon: HeartHandshake,
    label: "Áreas de atendimento",
    desc: "Ansiedade, depressão, terapia individual e desenvolvimento pessoal — cada área explicada com duração e formato da sessão.",
    color: "#6C63FF",
    bg: "rgba(108,99,255,0.12)",
  },
  {
    icon: MessagesSquare,
    label: "FAQ que quebra objeções",
    desc: "Sigilo, eficácia da terapia online, valores e duração do processo respondidos antes que virem motivo de desistência.",
    color: "#00D4AA",
    bg: "rgba(0,212,170,0.12)",
  },
  {
    icon: Quote,
    label: "Prova social",
    desc: "Depoimentos em carrossel reforçam confiança no momento exato em que o visitante avalia dar o primeiro passo.",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.12)",
  },
  {
    icon: ClipboardCheck,
    label: "Formulário validado",
    desc: "React Hook Form + Zod com feedback visual em tempo real e confirmação por toast — sem envios silenciosos ou frustrantes.",
    color: "#3B82F6",
    bg: "rgba(59,130,246,0.12)",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp em 1 clique",
    desc: "Botão flutuante com mensagem pré-preenchida leva o contato ao canal favorito do público em um único toque.",
    color: "#00BFA6",
    bg: "rgba(0,191,166,0.12)",
  },
];

/* Gallery — the shots shown as device mockups, also driving the lightbox */
type Device = "desktop" | "mobile";
type Shot = { src: string; label: string; desc: string; device: Device };

const shots: Shot[] = [
  {
    src: "/images/ancora/hero-desktop.png",
    label: "Página inicial",
    desc: "Hero com credibilidade e chamada para ação",
    device: "desktop",
  },
  {
    src: "/images/ancora/areas-desktop.png",
    label: "Áreas de atendimento",
    desc: "Serviços em cards, com duração e formato",
    device: "desktop",
  },
  {
    src: "/images/ancora/footer-desktop.png",
    label: "Contato & rodapé",
    desc: "Convite final e canais de contato",
    device: "desktop",
  },
  {
    src: "/images/ancora/hero-mobile.png",
    label: "Início — mobile",
    desc: "Layout mobile-first",
    device: "mobile",
  },
  {
    src: "/images/ancora/areas-mobile.png",
    label: "Serviços — mobile",
    desc: "Cards empilhados",
    device: "mobile",
  },
  {
    src: "/images/ancora/footer-mobile.png",
    label: "Contato — mobile",
    desc: "Ação em um toque",
    device: "mobile",
  },
];

const metrics = [
  {
    value: "1",
    label: "Página única",
    desc: "Single-page focada em conversão",
    icon: LayoutTemplate,
  },
  {
    value: "3",
    label: "Breakpoints",
    desc: "375 · 768 · 1280 px",
    icon: MonitorSmartphone,
  },
  {
    value: "≥80%",
    label: "Cobertura de testes",
    desc: "Vitest + Playwright (E2E)",
    icon: FlaskConical,
  },
  {
    value: "0",
    label: "Backend",
    desc: "100% estático e veloz",
    icon: Zap,
  },
];

const decisions = [
  {
    title: "Next.js 14 App Router + Server Components",
    body: "Server Components por padrão mantêm o JavaScript enviado ao navegador no mínimo; 'use client' fica restrito a componentes com estado (formulário, carrossel, menu). Resultado: carregamento rápido e HTML pronto para indexação — decisivo para SEO de uma landing page.",
    color: SAGE,
  },
  {
    title: "Framer Motion com prefers-reduced-motion",
    body: "Todas as transições de entrada e microinterações passam pelo Framer Motion, mas respeitam a preferência de movimento reduzido do sistema. Quem sente desconforto com animação recebe a página estática — acessibilidade tratada como requisito, não como enfeite.",
    color: "#6C63FF",
  },
  {
    title: "React Hook Form + Zod",
    body: "O schema Zod é a fonte única de verdade da validação: mensagens claras, feedback em tempo real e tipagem derivada automaticamente. O envio é simulado com toast de confirmação, pronto para plugar em uma API real sem reescrever a camada de formulário.",
    color: "#3B82F6",
  },
  {
    title: "Design system em CSS custom properties",
    body: "Cores, espaçamentos e tipografia vivem em variáveis CSS — nada de valores hardcoded espalhados. Trocar um tom da paleta é editar uma linha, e o Tailwind consome esses tokens mantendo a consistência visual em toda a página.",
    color: "#00D4AA",
  },
  {
    title: "Processo speckit + TDD",
    body: "Spec → plano → tarefas → implementação, com testes escritos antes do código. Vitest cobre unidades e componentes (mocks de IntersectionObserver e matchMedia) e o Playwright valida o fluxo real em Chromium e iPhone 13. next build roda sem erros de TypeScript ou ESLint.",
    color: "#F97316",
  },
];

/* ─── Lightbox ─── */
function ShotLightbox({
  initialIndex,
  onClose,
}: {
  initialIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(initialIndex);

  const prev = () => setCurrent((c) => (c - 1 + shots.length) % shots.length);
  const next = () => setCurrent((c) => (c + 1) % shots.length);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  const shot = shots[current];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/88 backdrop-blur-2xl" />

      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full border border-white/10 bg-white/[.06] hover:bg-white/[.12] flex items-center justify-center transition-colors"
        aria-label="Fechar"
      >
        <X size={17} className="text-white/80" />
      </button>

      <div
        className="relative z-10 flex items-center gap-4 sm:gap-8 w-full max-w-6xl px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={prev}
          className="w-11 h-11 rounded-full border border-white/10 bg-white/[.06] hover:bg-white/[.14] flex items-center justify-center transition-colors flex-shrink-0"
          aria-label="Anterior"
        >
          <ChevronLeft size={20} className="text-white/80" />
        </button>

        <div className="flex-1 flex flex-col items-center gap-7 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -6 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-full flex justify-center"
            >
              {shot.device === "desktop" ? (
                <MonitorMockup src={shot.src} alt={shot.label} size="xl" />
              ) : (
                <PhoneMockup src={shot.src} alt={shot.label} size="xl" />
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-col items-center gap-3">
            <div className="text-center">
              <p className="font-display font-bold text-base text-white">{shot.label}</p>
              <p className="text-white/45 text-sm mt-0.5">{shot.desc}</p>
            </div>
            <div className="flex gap-2 items-center">
              {shots.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 h-1.5"
                      : "w-1.5 h-1.5 bg-white/25 hover:bg-white/40"
                  }`}
                  style={i === current ? { background: SAGE } : undefined}
                  aria-label={`Ver tela ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={next}
          className="w-11 h-11 rounded-full border border-white/10 bg-white/[.06] hover:bg-white/[.14] flex items-center justify-center transition-colors flex-shrink-0"
          aria-label="Próximo"
        >
          <ChevronRight size={20} className="text-white/80" />
        </button>
      </div>
    </motion.div>
  );
}

/* ─── Accordion ─── */
function AccordionItem({
  title,
  body,
  color,
}: {
  title: string;
  body: string;
  color: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden bg-surface transition-all duration-300"
      style={{
        border: `1px solid ${open ? `${color}35` : "rgba(255,255,255,0.07)"}`,
        boxShadow: open ? `0 0 20px ${color}12` : "none",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-white/[.02] transition-colors"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3.5">
          <div
            className="w-[3px] rounded-full flex-shrink-0 transition-all duration-300"
            style={{ height: 18, background: open ? color : "rgba(255,255,255,0.12)" }}
          />
          <span className="font-display font-semibold text-sm text-ink">{title}</span>
        </div>
        <ChevronDown
          size={15}
          className={`flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          style={{ color: open ? color : "rgba(255,255,255,0.35)" }}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-6 pb-5 pl-[52px]">
              <p className="text-dim text-sm leading-relaxed">{body}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Fade-in wrapper ─── */
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Clickable device card ─── */
function ShotCard({
  shot,
  index,
  onOpen,
  children,
}: {
  shot: Shot;
  index: number;
  onOpen: (i: number) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-5">
      <div
        className="relative group cursor-pointer w-full flex justify-center"
        onClick={() => onOpen(index)}
        role="button"
        tabIndex={0}
        aria-label={`Expandir tela ${shot.label}`}
        onKeyDown={(e) => e.key === "Enter" && onOpen(index)}
      >
        {children}
        {/* Hover zoom hint */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: SAGE }}
          >
            <ZoomIn size={22} className="text-[#0A0A0F]" />
          </div>
        </div>
      </div>
      <div className="text-center">
        <h3 className="font-display font-semibold text-base text-ink mb-1">{shot.label}</h3>
        <p className="text-dim text-sm">{shot.desc}</p>
      </div>
    </div>
  );
}

/* ─── Main ─── */
export default function AncoraContent() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-base text-ink">
      {/* ── Hero ── */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div
          className="absolute top-0 right-1/4 w-[500px] h-72 rounded-full blur-3xl pointer-events-none"
          style={{ background: "rgba(143,169,141,0.10)" }}
        />
        <div className="absolute bottom-0 left-1/4 w-80 h-64 bg-primary/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">
            {/* Left */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-dim text-sm hover:text-ink transition-colors mb-8 group"
                >
                  <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
                  Início
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <div
                  className="inline-flex items-center gap-2 mb-5 px-3.5 py-1.5 rounded-full text-xs font-medium font-mono"
                  style={{ border: `1px solid ${SAGE}55`, background: SAGE_BG, color: SAGE }}
                >
                  <LayoutTemplate size={12} />
                  Landing Page · Web
                </div>

                <h1 className="font-display text-5xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight mb-4">
                  Espaço{" "}
                  <span
                    style={{
                      background: `linear-gradient(135deg, ${SAGE} 0%, #00D4AA 100%)`,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Âncora
                  </span>
                </h1>

                <p className="text-ink2/80 text-lg leading-relaxed mb-8 max-w-lg">
                  Landing page de página única para um consultório de psicologia clínica,
                  desenhada para transformar visitantes em pacientes com credibilidade,
                  acessibilidade e conversão em um clique.
                </p>

                <div className="flex flex-wrap gap-6 mb-8 text-sm">
                  {[
                    { label: "Ano", value: "2026" },
                    { label: "Tipo", value: "Landing page" },
                    { label: "Segmento", value: "Psicologia clínica" },
                  ].map((m) => (
                    <div key={m.label}>
                      <span className="text-dim text-xs font-mono block mb-0.5">{m.label}</span>
                      <span className="text-ink font-medium">{m.value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {stack.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono"
                      style={{ background: SAGE_SOFT, color: SAGE }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right — responsive showcase (MacBook + phone) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="relative flex justify-center lg:justify-end pb-6"
            >
              <div className="relative w-full max-w-[560px]">
                <MacBookMockup
                  src="/images/ancora/hero-desktop.png"
                  alt="Página inicial do Espaço Âncora em desktop"
                  size="xl"
                />
                <div className="absolute -bottom-6 -left-3 sm:left-0 drop-shadow-2xl">
                  <PhoneMockup
                    src="/images/ancora/hero-mobile.png"
                    alt="Página inicial do Espaço Âncora em mobile"
                    size="md"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── O desafio ── */}
      <section className="py-24 border-t border-white/[.05]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-2xl">
            <FadeIn>
              <span
                className="inline-block text-xs font-mono tracking-[0.2em] uppercase mb-4"
                style={{ color: SAGE }}
              >
                // O desafio
              </span>
              <h2 className="font-display text-3xl lg:text-4xl font-extrabold tracking-tight mb-6">
                Converter visitantes em pacientes
              </h2>
              <p className="text-ink2/75 text-lg leading-relaxed">
                Escolher um psicólogo é uma decisão sensível e cheia de dúvidas. A página precisava
                conduzir o visitante por uma jornada clara — credibilidade, serviços, quebra de
                objeções e conversão — sem fricção e sem backend, entregando o contato ao WhatsApp ou
                ao formulário em no máximo um clique. Tudo isso com foco explícito em acessibilidade e
                em um público majoritariamente mobile.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── O que a página entrega ── */}
      <section className="py-24 border-t border-white/[.05]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <FadeIn className="mb-12">
            <span
              className="inline-block text-xs font-mono tracking-[0.2em] uppercase mb-4"
              style={{ color: SAGE }}
            >
              // A jornada
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-extrabold tracking-tight">
              O que a página entrega
            </h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <FadeIn key={f.label} delay={i * 0.07}>
                  <div
                    className="group rounded-2xl border border-white/[.07] bg-surface p-6 transition-all duration-300 hover:-translate-y-1 h-full"
                    style={{ borderColor: undefined }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${f.color}55`)}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")
                    }
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: f.bg }}
                    >
                      <Icon size={20} style={{ color: f.color }} />
                    </div>
                    <h3 className="font-display font-semibold text-base text-ink mb-2">{f.label}</h3>
                    <p className="text-dim text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Preview / Telas ── */}
      <section className="py-24 border-t border-white/[.05]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <FadeIn className="mb-14">
            <span
              className="inline-block text-xs font-mono tracking-[0.2em] uppercase mb-4"
              style={{ color: SAGE }}
            >
              // Preview
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-extrabold tracking-tight">
              Do desktop ao bolso
            </h2>
            <p className="text-dim text-sm mt-2">Clique em qualquer tela para ampliar</p>
          </FadeIn>

          {/* Desktop — hero on a monitor */}
          <FadeIn className="mb-16 flex justify-center">
            <div className="w-full max-w-3xl">
              <ShotCard shot={shots[0]} index={0} onOpen={setExpanded}>
                <MonitorMockup src={shots[0].src} alt={shots[0].label} size="xl" />
              </ShotCard>
            </div>
          </FadeIn>

          {/* Desktop — two laptops */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 mb-20">
            {[1, 2].map((idx) => (
              <FadeIn key={shots[idx].src} delay={(idx - 1) * 0.1}>
                <ShotCard shot={shots[idx]} index={idx} onOpen={setExpanded}>
                  <MacBookMockup src={shots[idx].src} alt={shots[idx].label} size="lg" />
                </ShotCard>
              </FadeIn>
            ))}
          </div>

          {/* Mobile — three phones */}
          <FadeIn className="mb-2">
            <div className="flex items-center gap-3 mb-10">
              <span className="font-display font-semibold text-sm text-ink2">Versão mobile</span>
              <span className="h-px flex-1 bg-white/[.07]" />
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-14 justify-items-center">
            {[3, 4, 5].map((idx, i) => (
              <FadeIn key={shots[idx].src} delay={i * 0.1} className="w-full flex justify-center">
                <ShotCard shot={shots[idx]} index={idx} onOpen={setExpanded}>
                  <PhoneMockup src={shots[idx].src} alt={shots[idx].label} size="lg" />
                </ShotCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {expanded !== null && (
          <ShotLightbox initialIndex={expanded} onClose={() => setExpanded(null)} />
        )}
      </AnimatePresence>

      {/* ── Números ── */}
      <section className="py-24 border-t border-white/[.05]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <FadeIn className="mb-12">
            <span
              className="inline-block text-xs font-mono tracking-[0.2em] uppercase mb-4"
              style={{ color: SAGE }}
            >
              // Números
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-extrabold tracking-tight">
              O projeto em dados
            </h2>
          </FadeIn>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {metrics.map((m, i) => {
              const Icon = m.icon;
              return (
                <FadeIn key={m.label} delay={i * 0.08}>
                  <div
                    className="group relative rounded-2xl border border-white/[.07] bg-surface p-6 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${SAGE}55`)}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")
                    }
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `linear-gradient(90deg, transparent, ${SAGE}, transparent)` }}
                    />
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: SAGE_BG }}
                    >
                      <Icon size={20} style={{ color: SAGE }} />
                    </div>
                    <div
                      className="font-display font-extrabold text-3xl leading-none mb-2 whitespace-nowrap"
                      style={{
                        background: `linear-gradient(135deg, ${SAGE} 0%, #00D4AA 100%)`,
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {m.value}
                    </div>
                    <div className="font-display font-semibold text-sm text-ink mb-1">{m.label}</div>
                    <div className="text-dim text-xs font-mono">{m.desc}</div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Decisões técnicas ── */}
      <section className="py-24 border-t border-white/[.05]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <FadeIn>
              <span
                className="inline-block text-xs font-mono tracking-[0.2em] uppercase mb-4"
                style={{ color: SAGE }}
              >
                // Stack
              </span>
              <h2 className="font-display text-3xl lg:text-4xl font-extrabold tracking-tight mb-4">
                Decisões técnicas
              </h2>
              <p className="text-ink2/70 leading-relaxed mb-8">
                Cada escolha foi guiada por três prioridades: uma página que carrega rápido e indexa
                bem, um formulário confiável e acessível, e um processo disciplinado que chega ao
                deploy sem surpresas.
              </p>

              <div className="flex flex-col gap-3">
                {[
                  { name: "Next.js 14 (App Router)", role: "SSR + Server Components", color: SAGE },
                  { name: "TypeScript strict", role: "Tipagem estática completa", color: "#3B82F6" },
                  { name: "Tailwind CSS", role: "Design system em tokens", color: "#00D4AA" },
                  { name: "Framer Motion 12", role: "Animação acessível", color: "#6C63FF" },
                  { name: "React Hook Form + Zod", role: "Formulário validado", color: "#F97316" },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-3 p-3.5 rounded-xl border border-white/[.06] bg-white/[.02]"
                  >
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: item.color }}
                    />
                    <span className="font-mono text-sm font-medium text-ink">{item.name}</span>
                    <span className="text-dim text-xs ml-auto text-right">{item.role}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.1} className="space-y-3">
              {decisions.map((d) => (
                <AccordionItem key={d.title} title={d.title} body={d.body} color={d.color} />
              ))}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 border-t border-white/[.05] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/40 to-surface/60" />
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-48 rounded-full blur-3xl"
          style={{ background: "rgba(143,169,141,0.10)" }}
        />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <span
              className="inline-block text-xs font-mono tracking-[0.2em] uppercase mb-5"
              style={{ color: SAGE }}
            >
              // Próximo passo
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
              Precisa de uma página que converte?
            </h2>
            <p className="text-ink2/75 text-lg mb-10">Vamos conversar sobre o seu projeto</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/#contato"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-all duration-200 hover:shadow-[0_0_30px_rgba(108,99,255,0.45)] group"
              >
                Solicitar orçamento
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/12 bg-white/[.04] text-ink/80 font-semibold transition-all duration-200"
                style={{ borderColor: undefined }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${SAGE}80`;
                  e.currentTarget.style.color = SAGE;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                  e.currentTarget.style.color = "";
                }}
              >
                <GitFork size={16} />
                Ver no GitHub
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
