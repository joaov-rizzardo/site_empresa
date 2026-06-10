"use client";
import { useState } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";
import PhoneMockup from "@/components/ui/PhoneMockup";

/* ─── Data ─── */

const stack = ["React Native", "TypeScript", "SQLite", "Recharts", "Expo"];

const features = [
  {
    icon: PieChart,
    label: "Dashboard analítico",
    desc: "Visão geral das finanças com gráficos interativos por período.",
    color: "#00D4AA",
    bg: "rgba(0,212,170,0.12)",
  },
  {
    icon: Tag,
    label: "Categorização",
    desc: "Classifique gastos automaticamente por categorias personalizáveis.",
    color: "#6C63FF",
    bg: "rgba(108,99,255,0.12)",
  },
  {
    icon: Target,
    label: "Metas financeiras",
    desc: "Defina objetivos de poupança e acompanhe o progresso em tempo real.",
    color: "#00BCD4",
    bg: "rgba(0,188,212,0.12)",
  },
  {
    icon: ArrowLeftRight,
    label: "Lançamentos",
    desc: "Registro rápido de receitas e despesas com histórico completo.",
    color: "#EF4444",
    bg: "rgba(239,68,68,0.12)",
  },
  {
    icon: CreditCard,
    label: "Controle de cartão",
    desc: "Acompanhe faturas e gastos no cartão de crédito por categoria.",
    color: "#3B82F6",
    bg: "rgba(59,130,246,0.12)",
  },
  {
    icon: Moon,
    label: "Dark mode nativo",
    desc: "Interface adaptada ao sistema com dark mode completo e nativo.",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.12)",
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
    label: "Lançamentos",
    desc: "Histórico completo de receitas e despesas",
  },
  {
    src: "/images/finapp/cartao.jpeg",
    label: "Cartão",
    desc: "Controle de fatura e gastos por categoria",
  },
];

const metrics = [
  { value: "6", label: "telas desenvolvidas" },
  { value: "iOS & Android", label: "plataformas" },
  { value: "100%", label: "offline first" },
  { value: "Dark mode", label: "nativo" },
];

const decisions = [
  {
    title: "Por que React Native?",
    body: "Uma única base de código para iOS e Android sem abrir mão de performance nativa. Com Expo, o ciclo de desenvolvimento é significativamente mais rápido — ideal para projetos pessoais onde agilidade importa tanto quanto o resultado.",
  },
  {
    title: "Por que SQLite (offline first)?",
    body: "Dados financeiros precisam estar disponíveis mesmo sem internet. O SQLite garante persistência local imediata, sem latência de rede e sem depender de um backend — reduzindo custo de infraestrutura a zero na fase de MVP.",
  },
  {
    title: "Gerenciamento de estado",
    body: "Context API para estado global de sessão e preferências, combinado com Zustand para os dados financeiros que precisam de reatividade entre telas. A separação evita re-renders desnecessários e mantém o código previsível.",
  },
];

/* ─── Accordion item ─── */
function AccordionItem({ title, body }: { title: string; body: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/[.07] rounded-2xl overflow-hidden bg-surface">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-white/[.02] transition-colors"
      >
        <span className="font-display font-semibold text-sm text-ink">{title}</span>
        <ChevronDown
          size={16}
          className={`text-dim flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-5">
          <p className="text-dim text-sm leading-relaxed">{body}</p>
        </div>
      )}
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
                {/* Badge */}
                <div className="inline-flex items-center gap-2 mb-5 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-xs text-primary font-medium font-mono">
                  <Smartphone size={12} />
                  App Mobile
                </div>

                <h1 className="font-display text-5xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight mb-4">
                  Fin<span className="gradient-text">App</span>
                </h1>

                <p className="text-ink2/80 text-lg leading-relaxed mb-8 max-w-lg">
                  Controle financeiro pessoal com dashboard analítico, categorização de gastos e
                  metas de poupança.
                </p>

                {/* Meta */}
                <div className="flex flex-wrap gap-6 mb-8 text-sm">
                  {[
                    { label: "Ano", value: "2026" },
                    { label: "Plataforma", value: "iOS & Android" },
                    { label: "Tipo", value: "Projeto pessoal" },
                  ].map((m) => (
                    <div key={m.label}>
                      <span className="text-dim text-xs font-mono block mb-0.5">{m.label}</span>
                      <span className="text-ink font-medium">{m.value}</span>
                    </div>
                  ))}
                </div>

                {/* Stack */}
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
                alt="Tela de lançamentos do FinApp"
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
          </FadeIn>

          <div className="grid sm:grid-cols-3 gap-12">
            {screens.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.1} className="flex flex-col items-center">
                <PhoneMockup src={s.src} alt={s.label} size="lg" className="mb-6" />
                <h3 className="font-display font-semibold text-lg text-ink mb-1">{s.label}</h3>
                <p className="text-dim text-sm text-center">{s.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

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
            {metrics.map((m, i) => (
              <FadeIn key={m.label} delay={i * 0.08}>
                <div className="rounded-2xl border border-white/[.07] bg-surface p-6 h-28 flex flex-col items-center justify-center text-center gap-2">
                  <div className="font-display font-extrabold text-xl lg:text-2xl gradient-text leading-tight whitespace-nowrap">
                    {m.value}
                  </div>
                  <div className="text-dim text-xs font-mono">{m.label}</div>
                </div>
              </FadeIn>
            ))}
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
              <p className="text-ink2/70 leading-relaxed">
                Cada escolha de tecnologia foi guiada por duas prioridades: experiência offline
                confiável e velocidade de desenvolvimento sem sacrificar qualidade.
              </p>
            </FadeIn>

            <FadeIn delay={0.1} className="space-y-3">
              {decisions.map((d) => (
                <AccordionItem key={d.title} title={d.title} body={d.body} />
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
