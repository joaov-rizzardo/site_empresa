"use client";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    text: "A equipe entendeu exatamente o que precisávamos. O sistema foi entregue antes do prazo e superou nossas expectativas em todos os aspectos.",
    name: "Carlos Mendes",
    role: "CEO",
    company: "MedClinic",
    initials: "CM",
    accent: "#6C63FF",
  },
  {
    text: "Profissionalismo e qualidade técnica impecáveis. O app mobile que desenvolveram aumentou nossas vendas em 40% no primeiro mês.",
    name: "Ana Paula Rodrigues",
    role: "Diretora",
    company: "DeliveryRapido",
    initials: "AP",
    accent: "#00D4AA",
  },
  {
    text: "Comunicação clara durante todo o processo e código limpo e documentado. Recomendo para qualquer empresa que queira um sistema robusto.",
    name: "Ricardo Torres",
    role: "CTO",
    company: "FinanceHub",
    initials: "RT",
    accent: "#6C63FF",
  },
];

export default function Testimonials() {
  return (
    <section className="py-28 bg-surface/30 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-secondary/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-mono text-secondary tracking-[0.2em] uppercase mb-4">
            // Depoimentos
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tight">
            O que nossos{" "}
            <span className="gradient-text">clientes dizem</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="group relative rounded-2xl border border-white/[.07] bg-surface p-7
                hover:border-primary/35 transition-all duration-300 hover:-translate-y-1
                hover:shadow-[0_0_25px_rgba(108,99,255,.12),0_12px_40px_rgba(0,0,0,.3)]"
            >
              {/* Quote icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                style={{ background: `${t.accent}15` }}
              >
                <Quote size={18} style={{ color: t.accent }} />
              </div>

              <p className="text-ink2/75 text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-white/[.06]">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm text-white shrink-0"
                  style={{ background: `linear-gradient(135deg, ${t.accent}, ${t.accent}80)` }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-medium text-ink">{t.name}</div>
                  <div className="text-xs text-dim">
                    {t.role} · {t.company}
                  </div>
                </div>

                {/* Stars */}
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span key={j} className="text-xs" style={{ color: t.accent }}>
                      ★
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-px rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(90deg, transparent, ${t.accent}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
