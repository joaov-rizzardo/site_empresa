"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Quanto tempo leva para desenvolver um sistema?",
    a: "Depende da complexidade. Uma landing page ou site institucional leva de 2 a 3 semanas. Um MVP de SaaS ou app mobile costuma levar de 2 a 4 meses. Sistemas mais robustos como ERPs e plataformas completas levam de 4 a 8 meses. Tudo é definido com precisão durante o planejamento.",
  },
  {
    q: "Como funciona o processo de orçamento?",
    a: "É simples e sem compromisso: você descreve o projeto pelo formulário ou WhatsApp, fazemos uma reunião de descoberta (gratuita, ~45 min) para entender os requisitos, e em até 24 horas enviamos uma proposta detalhada com escopo, prazo e investimento.",
  },
  {
    q: "Vocês oferecem suporte após a entrega?",
    a: "Sim. Todo projeto inclui 30 dias de suporte gratuito pós-entrega para correção de eventuais bugs. Para continuidade, oferecemos planos mensais de manutenção, evolução do sistema e suporte técnico dedicado.",
  },
  {
    q: "Quais formas de pagamento aceitam?",
    a: "Trabalhamos com parcelamento por milestone: uma entrada no início do projeto, pagamentos intermediários nas entregas e o saldo final na entrega completa. Aceitamos PIX, transferência bancária e cartão de crédito em projetos acima de determinado valor.",
  },
  {
    q: "É possível começar com um MVP e expandir depois?",
    a: "Absolutamente — é nossa abordagem favorita. Construímos o MVP com a arquitetura certa para crescer, evitando reescritas futuras. Depois do lançamento e validação, evoluímos o produto em ciclos iterativos com base em dados e feedback real dos usuários.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-28 relative">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-mono text-secondary tracking-[0.2em] uppercase mb-4">
            // FAQ
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tight">
            Perguntas{" "}
            <span className="gradient-text">frequentes</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden
                ${open === i
                  ? "border-primary/40 bg-surface shadow-[0_0_20px_rgba(108,99,255,.12)]"
                  : "border-white/[.07] bg-surface hover:border-white/15"
                }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className={`font-medium text-sm transition-colors ${open === i ? "text-ink" : "text-ink2/80"}`}>
                  {faq.q}
                </span>
                <div
                  className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200
                    ${open === i ? "bg-primary text-white" : "bg-white/[.07] text-dim"}`}
                >
                  {open === i ? <Minus size={13} /> : <Plus size={13} />}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                  >
                    <p className="px-6 pb-5 text-sm text-dim leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
