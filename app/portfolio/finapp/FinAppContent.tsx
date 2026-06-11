"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Smartphone,
  PieChart,
  Tag,
  Target,
  ArrowLeftRight,
  CreditCard,
  Moon,
  ChevronDown,
  GitFork,
  ArrowRight,
  X,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  Globe2,
  Shield,
  Layers,
  RefreshCw,
} from "lucide-react";
import PhoneMockup from "@/components/ui/PhoneMockup";

/* ─── Data ─── */

const stack = ["React Native", "Expo SDK 54", "Firebase", "NativeWind", "TypeScript"];

const features = [
  {
    icon: PieChart,
    label: "Dashboard",
    desc: "Visão consolidada do saldo, receitas e despesas com gráficos por período.",
    color: "#00D4AA",
    bg: "rgba(0,212,170,0.12)",
  },
  {
    icon: ArrowLeftRight,
    label: "Lançamentos",
    desc: "Receitas e despesas com suporte a recorrência semanal/mensal e parcelamento.",
    color: "#6C63FF",
    bg: "rgba(108,99,255,0.12)",
  },
  {
    icon: CreditCard,
    label: "Cartão de crédito",
    desc: "Gestão de fatura com ciclo de fechamento e vencimento configuráveis por cartão.",
    color: "#3B82F6",
    bg: "rgba(59,130,246,0.12)",
  },
  {
    icon: Tag,
    label: "Orçamentos",
    desc: "Defina limites de gasto por categoria e acompanhe o consumo em tempo real.",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.12)",
  },
  {
    icon: Target,
    label: "Metas financeiras",
    desc: "Crie objetivos de poupança e acompanhe a evolução com indicador de progresso.",
    color: "#00BCD4",
    bg: "rgba(0,188,212,0.12)",
  },
  {
    icon: Moon,
    label: "Relatórios",
    desc: "Visualizações de gastos por categoria, período e comparativos mensais.",
    color: "#EF4444",
    bg: "rgba(239,68,68,0.12)",
  },
];

const screens = [
  {
    src: "/images/finapp/relatorios.jpeg",
    label: "Relatórios",
    desc: "Dashboard com gráfico de gastos por categoria",
  },
  {
    src: "/images/finapp/lancamentos.jpeg",
    label: "Início",
    desc: "Visão geral das finanças e saldo consolidado",
  },
  {
    src: "/images/finapp/cartao.jpeg",
    label: "Cartão",
    desc: "Controle de fatura e gastos por categoria",
  },
];

const metrics = [
  {
    value: "7",
    label: "Módulos",
    desc: "Telas no menu de navegação",
    icon: Layers,
  },
  {
    value: "2",
    label: "Plataformas",
    desc: "iOS e Android com 1 codebase",
    icon: Globe2,
  },
  {
    value: "100%",
    label: "TypeScript",
    desc: "Strict mode — TypeScript ~5.9",
    icon: Shield,
  },
  {
    value: "Realtime",
    label: "Sincronização",
    desc: "Firebase Firestore v12",
    icon: RefreshCw,
  },
];

const decisions = [
  {
    title: "Por que React Native + Expo SDK 54?",
    body: "Codebase único para iOS e Android sem abrir mão de performance nativa. O Expo SDK 54 simplifica o processo de build e atualizações, mantendo consistência visual entre plataformas. A nova arquitetura do React Native garante animações fluidas e resposta imediata a interações.",
    color: "#6C63FF",
  },
  {
    title: "Firebase Firestore como backend",
    body: "O Firestore (Web SDK v12) elimina a necessidade de um servidor próprio ao oferecer banco de dados em tempo real, autenticação e storage como serviços gerenciados. As Security Rules garantem que cada usuário acesse exclusivamente seus próprios dados — segurança declarada no banco, não só no cliente.",
    color: "#F97316",
  },
  {
    title: "NativeWind v4 — Tailwind no React Native",
    body: "NativeWind v4 traz a sintaxe de classes do Tailwind CSS diretamente para componentes React Native, eliminando StyleSheet.create e tornando a estilização consistente e declarativa. Combinado com class-variance-authority (cva), os componentes ganham variantes tipadas sem boilerplate.",
    color: "#3B82F6",
  },
  {
    title: "React Query para cache e sincronização",
    body: "React Query gerencia cache, revalidação e estado de loading de todas as queries ao Firestore. Cada módulo — lançamentos, cartão, orçamentos, metas — tem seu próprio hook (useTransactions, useCreditCardExpenses…) com query key isolada, evitando re-renders desnecessários e mantendo o código previsível.",
    color: "#00D4AA",
  },
];

/* ─── Lightbox Modal ─── */
function ScreenLightbox({
  initialIndex,
  onClose,
}: {
  initialIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(initialIndex);

  const prev = () => setCurrent((c) => (c - 1 + screens.length) % screens.length);
  const next = () => setCurrent((c) => (c + 1) % screens.length);

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

  const screen = screens[current];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/88 backdrop-blur-2xl" />

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full border border-white/10 bg-white/[.06] hover:bg-white/[.12] flex items-center justify-center transition-colors"
        aria-label="Fechar"
      >
        <X size={17} className="text-white/80" />
      </button>

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center gap-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-6 sm:gap-10 px-4">
          <button
            onClick={prev}
            className="w-11 h-11 rounded-full border border-white/10 bg-white/[.06] hover:bg-white/[.14] flex items-center justify-center transition-colors flex-shrink-0"
            aria-label="Anterior"
          >
            <ChevronLeft size={20} className="text-white/80" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 0.9, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -6 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <PhoneMockup src={screen.src} alt={screen.label} size="xl" />
            </motion.div>
          </AnimatePresence>

          <button
            onClick={next}
            className="w-11 h-11 rounded-full border border-white/10 bg-white/[.06] hover:bg-white/[.14] flex items-center justify-center transition-colors flex-shrink-0"
            aria-label="Próximo"
          >
            <ChevronRight size={20} className="text-white/80" />
          </button>
        </div>

        {/* Label + dots */}
        <div className="flex flex-col items-center gap-3">
          <div className="text-center">
            <p className="font-display font-bold text-base text-white">{screen.label}</p>
            <p className="text-white/45 text-sm mt-0.5">{screen.desc}</p>
          </div>
          <div className="flex gap-2 items-center">
            {screens.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current ? "w-6 h-1.5 bg-primary" : "w-1.5 h-1.5 bg-white/25 hover:bg-white/40"
                }`}
                aria-label={`Ver tela ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Accordion item ─── */
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
      >
        <div className="flex items-center gap-3.5">
          <div
            className="w-[3px] rounded-full flex-shrink-0 transition-all duration-300"
            style={{
              height: 18,
              background: open ? color : "rgba(255,255,255,0.12)",
            }}
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

/* ─── Main ─── */
export default function FinAppContent() {
  const [expandedScreen, setExpandedScreen] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-base text-ink">
      {/* ── Hero ── */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="absolute top-0 right-1/4 w-[500px] h-72 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-64 bg-secondary/6 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Left */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Link
                  href="/#portfolio"
                  className="inline-flex items-center gap-2 text-dim text-sm hover:text-ink transition-colors mb-8 group"
                >
                  <ArrowLeft
                    size={15}
                    className="group-hover:-translate-x-1 transition-transform"
                  />
                  Portfólio
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-2 mb-5 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-xs text-primary font-medium font-mono">
                  <Smartphone size={12} />
                  App Mobile
                </div>

                <h1 className="font-display text-5xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight mb-4">
                  Fin<span className="gradient-text">App</span>
                </h1>

                <p className="text-ink2/80 text-lg leading-relaxed mb-8 max-w-lg">
                  Aplicativo financeiro com 7 módulos — lançamentos, cartão de crédito, orçamentos,
                  metas e relatórios — construído com React Native, Expo e Firebase.
                </p>

                <div className="flex flex-wrap gap-6 mb-8 text-sm">
                  {[
                    { label: "Ano", value: "2026" },
                    { label: "Plataforma", value: "iOS & Android" },
                    { label: "Tecnologia", value: "React Native" },
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
                      style={{ background: "rgba(108,99,255,0.12)", color: "#6C63FF" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right — phones */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="flex items-end justify-center gap-2"
            >
              <PhoneMockup
                src="/images/finapp/lancamentos.jpeg"
                alt="Tela inicial do FinApp"
                size="lg"
              />
              <PhoneMockup
                src="/images/finapp/relatorios.jpeg"
                alt="Tela de relatórios do FinApp"
                size="xl"
                className="-mb-6"
              />
              <PhoneMockup
                src="/images/finapp/cartao.jpeg"
                alt="Tela de cartão do FinApp"
                size="md"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── O Problema ── */}
      <section className="py-24 border-t border-white/[.05]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-2xl">
            <FadeIn>
              <span className="inline-block text-xs font-mono text-secondary tracking-[0.2em] uppercase mb-4">
                // O problema
              </span>
              <h2 className="font-display text-3xl lg:text-4xl font-extrabold tracking-tight mb-6">
                Por que o app foi criado
              </h2>
              <p className="text-ink2/75 text-lg leading-relaxed">
                A maioria das pessoas perde o controle financeiro por falta de visibilidade sobre
                seus gastos. O FinApp foi desenvolvido para transformar dados financeiros em insights
                visuais simples e acionáveis, permitindo que qualquer pessoa entenda para onde seu
                dinheiro vai em segundos.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Funcionalidades ── */}
      <section className="py-24 border-t border-white/[.05]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <FadeIn className="mb-12">
            <span className="inline-block text-xs font-mono text-secondary tracking-[0.2em] uppercase mb-4">
              // Funcionalidades
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-extrabold tracking-tight">
              O que o app entrega
            </h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <FadeIn key={f.label} delay={i * 0.07}>
                  <div className="group rounded-2xl border border-white/[.07] bg-surface p-6 transition-all duration-300 hover:border-primary/40 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(108,99,255,.15),0_12px_40px_rgba(0,0,0,.4)] h-full">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: f.bg }}
                    >
                      <Icon size={20} style={{ color: f.color }} />
                    </div>
                    <h3 className="font-display font-semibold text-base text-ink mb-2">
                      {f.label}
                    </h3>
                    <p className="text-dim text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Telas do App ── */}
      <section className="py-24 border-t border-white/[.05]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <FadeIn className="mb-14">
            <span className="inline-block text-xs font-mono text-secondary tracking-[0.2em] uppercase mb-4">
              // Telas
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-extrabold tracking-tight">
              Telas do app
            </h2>
            <p className="text-dim text-sm mt-2">Clique em qualquer tela para expandir</p>
          </FadeIn>

          <div className="grid sm:grid-cols-3 gap-10 lg:gap-14">
            {screens.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.1} className="flex flex-col items-center gap-5">
                {/* Clickable phone card */}
                <div
                  className="relative group cursor-pointer"
                  onClick={() => setExpandedScreen(i)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Expandir tela ${s.label}`}
                  onKeyDown={(e) => e.key === "Enter" && setExpandedScreen(i)}
                >
                  <PhoneMockup src={s.src} alt={s.label} size="lg" />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 rounded-[44px] flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-250 pointer-events-none"
                    style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(2px)" }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(108,99,255,0.9)" }}
                    >
                      <ZoomIn size={22} className="text-white" />
                    </div>
                    <span className="text-white font-medium text-sm">Expandir</span>
                  </div>

                  {/* Glow on hover */}
                  <div
                    className="absolute -inset-2 rounded-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10"
                    style={{
                      background: "radial-gradient(ellipse at 50% 80%, rgba(108,99,255,0.2) 0%, transparent 70%)",
                      filter: "blur(8px)",
                    }}
                  />
                </div>

                {/* Label */}
                <div className="text-center">
                  <h3 className="font-display font-semibold text-base text-ink mb-1">{s.label}</h3>
                  <p className="text-dim text-sm">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {expandedScreen !== null && (
          <ScreenLightbox
            initialIndex={expandedScreen}
            onClose={() => setExpandedScreen(null)}
          />
        )}
      </AnimatePresence>

      {/* ── Números ── */}
      <section className="py-24 border-t border-white/[.05]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <FadeIn className="mb-12">
            <span className="inline-block text-xs font-mono text-secondary tracking-[0.2em] uppercase mb-4">
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
                  <div className="group relative rounded-2xl border border-white/[.07] bg-surface p-6 transition-all duration-300 hover:border-primary/40 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(108,99,255,.15),0_12px_40px_rgba(0,0,0,.4)] overflow-hidden">
                    {/* Top accent on hover */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "linear-gradient(90deg, transparent, #6C63FF, transparent)" }}
                    />

                    {/* Icon */}
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                      <Icon size={20} className="text-primary" />
                    </div>

                    {/* Value */}
                    <div className="font-display font-extrabold text-3xl gradient-text leading-none mb-2 whitespace-nowrap">
                      {m.value}
                    </div>

                    {/* Label */}
                    <div className="font-display font-semibold text-sm text-ink mb-1">{m.label}</div>

                    {/* Desc */}
                    <div className="text-dim text-xs font-mono">{m.desc}</div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Decisões Técnicas ── */}
      <section className="py-24 border-t border-white/[.05]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <FadeIn>
              <span className="inline-block text-xs font-mono text-secondary tracking-[0.2em] uppercase mb-4">
                // Stack
              </span>
              <h2 className="font-display text-3xl lg:text-4xl font-extrabold tracking-tight mb-4">
                Decisões técnicas
              </h2>
              <p className="text-ink2/70 leading-relaxed mb-8">
                Cada escolha de tecnologia foi guiada por três prioridades: experiência fluida em
                ambas as plataformas, sincronização confiável na nuvem e velocidade de
                desenvolvimento sem abrir mão de qualidade.
              </p>

              {/* Stack pills */}
              <div className="flex flex-col gap-3">
                {[
                  { name: "React Native + Expo SDK 54", role: "Build multiplataforma", color: "#6C63FF" },
                  { name: "Firebase Firestore v12", role: "Backend e sincronização", color: "#F97316" },
                  { name: "NativeWind v4", role: "Tailwind CSS no React Native", color: "#06B6D4" },
                  { name: "React Query", role: "Cache e estado assíncrono", color: "#00D4AA" },
                  { name: "TypeScript strict ~5.9", role: "Tipagem estática completa", color: "#3B82F6" },
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

      {/* ── CTA Final ── */}
      <section className="py-28 border-t border-white/[.05] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/40 to-surface/60" />
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-48 bg-primary/8 rounded-full blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <span className="inline-block text-xs font-mono text-secondary tracking-[0.2em] uppercase mb-5">
              // Próximo passo
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
              Gostou do que viu?
            </h2>
            <p className="text-ink2/75 text-lg mb-10">
              Vamos conversar sobre o seu projeto
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/#contato"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-white font-semibold
                  hover:bg-primary/90 transition-all duration-200 hover:shadow-[0_0_30px_rgba(108,99,255,0.45)] group"
              >
                Solicitar orçamento
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/12 bg-white/[.04]
                  text-ink/80 font-semibold hover:border-secondary/50 hover:text-secondary hover:bg-secondary/5 transition-all duration-200"
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
