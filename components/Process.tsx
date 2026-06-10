"use client";
import { motion } from "framer-motion";
import { Search, Map, Code2, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Descoberta",
    description:
      "Mergulhamos no seu negócio, entendemos objetivos, dores e contexto para construir a solução certa — não apenas a mais rápida.",
  },
  {
    number: "02",
    icon: Map,
    title: "Planejamento",
    description:
      "Definimos escopo, arquitetura, tecnologias e cronograma. Sem surpresas no meio do caminho.",
  },
  {
    number: "03",
    icon: Code2,
    title: "Desenvolvimento",
    description:
      "Entregas iterativas com atualizações semanais. Você acompanha cada etapa do projeto em tempo real.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Lançamento",
    description:
      "Deploy, testes de qualidade, documentação e suporte pós-entrega para garantir uma estreia impecável.",
  },
];

export default function Process() {
  return (
    <section className="py-28 bg-surface/40 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-25" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-mono text-secondary tracking-[0.2em] uppercase mb-4">
            // Como trabalhamos
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tight">
            Um processo{" "}
            <span className="gradient-text">transparente</span>
          </h2>
        </motion.div>

        {/* Steps container */}
        <div className="relative">
          {/* Connector line — desktop */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />

          <div className="grid lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.14, duration: 0.5 }}
                  className="relative flex flex-col items-center lg:items-center text-center"
                >
                  {/* Step circle */}
                  <div className="relative mb-6">
                    <div
                      className="w-20 h-20 rounded-2xl border border-primary/30 bg-primary/10 flex items-center justify-center
                        group-hover:bg-primary/20 transition-colors shadow-[0_0_20px_rgba(108,99,255,.15)]"
                    >
                      <Icon size={26} className="text-primary" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-white text-xs font-mono font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-ink mb-3">{step.title}</h3>
                  <p className="text-dim text-sm leading-relaxed">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
