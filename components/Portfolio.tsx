"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  X, ExternalLink, Calendar, Users, ArrowRight,
  Layers, Globe2, Shield, RefreshCw,
} from "lucide-react";

const projects = [
  {
    id: 1,
    title: "FinApp",
    category: "Mobile iOS & Android",
    description:
      "Aplicativo de controle financeiro pessoal com dashboard analítico, categorização de gastos, metas de poupança e controle de cartão de crédito.",
    stack: ["React Native", "Expo SDK 54", "Firebase", "NativeWind", "TypeScript"],
    color: "#00D4AA",
    bg: "from-secondary/20 to-surface2",
    caseUrl: "/portfolio/finapp",
    stats: { duration: "2026", users: "iOS & Android", result: "100% TypeScript" },
    details:
      "App mobile completo com dashboard analítico, categorização automática de gastos, metas financeiras com progresso visual, controle de cartão de crédito e dark mode nativo. Desenvolvido com React Native + Expo SDK 54, Firebase Firestore e NativeWind.",
  },
  {
    id: 2,
    title: "SaaS de Agendamento",
    category: "Plataforma Web",
    description:
      "Plataforma de agendamento online para clínicas com painel administrativo, notificações por e-mail, gestão de pacientes e relatórios analíticos.",
    stack: ["React", "Node.js", "PostgreSQL"],
    color: "#6C63FF",
    bg: "from-primary/20 to-surface2",
    caseUrl: null,
    stats: { duration: "3 meses", users: "2.400+ usuários", result: "+60% eficiência" },
    details:
      "Sistema completo de agendamento com múltiplas clínicas, controle de agenda por especialidade, notificações automáticas por WhatsApp e e-mail, prontuário digital simplificado e dashboard com métricas de ocupação.",
  },
  {
    id: 3,
    title: "App de Delivery",
    category: "Mobile iOS & Android",
    description:
      "Aplicativo de delivery com rastreamento em tempo real, pagamento integrado, sistema de avaliações e painel para restaurantes.",
    stack: ["React Native", "Firebase"],
    color: "#00D4AA",
    bg: "from-secondary/20 to-surface2",
    caseUrl: null,
    stats: { duration: "4 meses", users: "8.000+ downloads", result: "+40% em vendas" },
    details:
      "App nativo para iOS e Android com tracking GPS em tempo real, integração com múltiplos meios de pagamento, chat entre entregador e cliente, sistema de fidelidade e painel web para restaurantes gerenciarem pedidos.",
  },
  {
    id: 4,
    title: "ERP Financeiro",
    category: "Sistema Web",
    description:
      "Sistema de gestão financeira para PMEs com controle de fluxo de caixa, emissão de boletos, conciliação bancária e dashboard analítico.",
    stack: ["Next.js", "Prisma", "PostgreSQL"],
    color: "#6C63FF",
    bg: "from-primary/15 via-surface2 to-secondary/10",
    caseUrl: null,
    stats: { duration: "5 meses", users: "150+ empresas", result: "100% no prazo" },
    details:
      "ERP financeiro completo com plano de contas, centros de custo, emissão de boletos via API bancária, relatórios DRE/fluxo de caixa, multi-empresa e controle de acessos por perfil.",
  },
];

const finappMetrics = [
  { value: "7", label: "Módulos", icon: Layers },
  { value: "2", label: "Plataformas", icon: Globe2 },
  { value: "100%", label: "TypeScript", icon: Shield },
  { value: "Realtime", label: "Firebase", icon: RefreshCw },
];

type Project = (typeof projects)[0];

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-base/80 backdrop-blur-xl" />
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 16 }}
          transition={{ type: "spring", damping: 22, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-surface shadow-2xl overflow-hidden"
        >
          <div className={`h-36 bg-gradient-to-br ${project.bg} relative flex items-end p-6`}>
            <div className="absolute inset-0 dot-grid opacity-30" />
            <span
              className="px-3 py-1 rounded-full text-xs font-mono font-medium"
              style={{ background: `${project.color}25`, color: project.color }}
            >
              {project.category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X size={14} />
          </button>
          <div className="p-6">
            <h3 className="font-display font-bold text-2xl mb-3">{project.title}</h3>
            <p className="text-dim text-sm leading-relaxed mb-5">{project.details}</p>
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { icon: Calendar, label: "Prazo", value: project.stats.duration },
                { icon: Users, label: "Alcance", value: project.stats.users },
                { icon: ExternalLink, label: "Resultado", value: project.stats.result },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-xl bg-surface2 p-3 text-center">
                  <Icon size={13} className="mx-auto mb-1 text-dim" />
                  <div className="text-xs text-dim mb-1">{label}</div>
                  <div className="text-xs font-mono font-medium" style={{ color: project.color }}>
                    {value}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono"
                  style={{ background: `${project.color}15`, color: project.color }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Portfolio() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [finapp, ...others] = projects;

  return (
    <section id="portfolio" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-mono text-secondary tracking-[0.2em] uppercase mb-4">
            // Portfólio
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tight">
            Projetos em{" "}
            <span className="gradient-text">destaque</span>
          </h2>
          <p className="mt-4 text-dim max-w-lg mx-auto">
            Cada projeto é construído com atenção obsessiva aos detalhes e ao impacto real no negócio.
          </p>
        </motion.div>

        {/* ── Featured FinApp card ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl border border-white/[.07] bg-surface overflow-hidden mb-6 group
            hover:border-secondary/25 transition-all duration-500
            hover:shadow-[0_0_70px_rgba(0,212,170,0.07),0_28px_80px_rgba(0,0,0,0.55)]"
        >
          {/* Background layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/[0.06] via-transparent to-primary/[0.04] pointer-events-none" />
          <div className="absolute inset-0 dot-grid opacity-[0.12] pointer-events-none" />
          <div className="absolute -top-40 -right-40 w-[480px] h-[480px] bg-secondary/[0.06] rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="relative grid lg:grid-cols-[1fr_260px] items-stretch">

            {/* Left — content */}
            <div className="p-8 lg:p-10">

              {/* Badge row */}
              <div className="flex flex-wrap items-center gap-2.5 mb-6">
                <span
                  className="px-3 py-1 rounded-full text-xs font-mono font-medium"
                  style={{ background: "rgba(0,212,170,0.12)", color: "#00D4AA" }}
                >
                  {finapp.category}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-primary/10 border border-primary/20 text-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Case completo disponível
                </span>
              </div>

              <h3 className="font-display font-extrabold text-5xl lg:text-6xl tracking-tight mb-3">
                Fin<span className="gradient-text">App</span>
              </h3>

              <p className="text-dim leading-relaxed mb-6 max-w-lg">
                {finapp.description}
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
                {finappMetrics.map(({ value, label, icon: Icon }) => (
                  <div
                    key={label}
                    className="rounded-xl bg-surface2/60 border border-white/[.05] p-3.5"
                  >
                    <Icon size={13} className="text-secondary mb-2" />
                    <div className="font-display font-bold text-xl gradient-text leading-none mb-1">
                      {value}
                    </div>
                    <div className="text-dim text-xs font-mono">{label}</div>
                  </div>
                ))}
              </div>

              {/* Stack */}
              <div className="flex flex-wrap gap-2 mb-8">
                {finapp.stack.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono"
                    style={{ background: "rgba(0,212,170,0.08)", color: "#00D4AA" }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Prominent CTA */}
              <Link
                href={finapp.caseUrl!}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-primary text-white text-sm font-semibold
                  hover:bg-primary/90 transition-all duration-200
                  hover:shadow-[0_0_28px_rgba(108,99,255,0.5)] group/btn"
              >
                Ver case completo
                <ArrowRight
                  size={15}
                  className="group-hover/btn:translate-x-1 transition-transform duration-200"
                />
              </Link>
            </div>

            {/* Right — phone visual */}
            <div className="hidden lg:flex items-center justify-center px-6 py-8 relative">
              {/* Ambient glow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-44 h-60 bg-secondary/10 rounded-full blur-3xl" />
              </div>

              {/* Phone frame */}
              <div
                className="relative z-10 w-[138px] h-[284px] rounded-[28px] overflow-hidden flex-shrink-0"
                style={{
                  boxShadow:
                    "0 24px 64px rgba(0,0,0,0.7), 0 0 0 1.5px rgba(255,255,255,0.09), 0 0 0 3px rgba(0,0,0,0.5)",
                }}
              >
                {/* Notch bar */}
                <div className="absolute top-0 left-0 right-0 h-6 bg-[#0A0A0F]/95 z-10 flex items-center justify-center">
                  <div className="w-12 h-[5px] bg-[#16161F] rounded-full" />
                </div>
                <Image
                  src="/images/finapp/relatorios.jpeg"
                  alt="FinApp — tela de relatórios"
                  fill
                  className="object-cover object-top"
                  sizes="138px"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Other projects ── */}
        <div className="grid md:grid-cols-3 gap-5">
          {others.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group rounded-2xl border border-white/[.07] bg-surface overflow-hidden
                cursor-pointer transition-all duration-300 hover:border-primary/40 hover:-translate-y-1
                hover:shadow-[0_0_30px_rgba(108,99,255,.15),0_16px_50px_rgba(0,0,0,.4)]"
              onClick={() => setSelected(p)}
            >
              {/* Card visual */}
              <div className={`h-40 bg-gradient-to-br ${p.bg} relative overflow-hidden`}>
                <div className="absolute inset-0 dot-grid opacity-30" />

                {/* Mock screen */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-24 rounded-t-xl bg-surface2/80 border border-white/10 overflow-hidden shadow-2xl">
                  <div className="h-4 bg-base/60 flex items-center gap-1.5 px-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                    <span className="h-1.5 rounded-full bg-white/10 flex-1" />
                  </div>
                  <div className="p-2 space-y-1.5">
                    {[80, 60, 90].map((w, j) => (
                      <div
                        key={j}
                        className="h-1.5 rounded-full"
                        style={{
                          width: `${w}%`,
                          background: j % 2 === 0 ? `${p.color}40` : "rgba(255,255,255,.07)",
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="absolute top-4 left-4">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-mono font-medium backdrop-blur-sm"
                    style={{ background: `${p.color}25`, color: p.color }}
                  >
                    {p.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="p-5">
                <h3 className="font-display font-bold text-lg text-ink mb-2">{p.title}</h3>
                <p className="text-dim text-sm leading-relaxed mb-4">{p.description}</p>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-xs font-mono"
                        style={{ background: `${p.color}14`, color: p.color }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <button
                    className="text-xs font-medium flex items-center gap-1 flex-shrink-0 transition-colors"
                    style={{ color: p.color }}
                  >
                    Detalhes <ExternalLink size={11} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
