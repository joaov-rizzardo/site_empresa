"use client";
import { motion } from "framer-motion";
import { Monitor, Smartphone, Layout, Wrench, Lightbulb, Plug } from "lucide-react";

const services = [
  {
    icon: Monitor,
    title: "Sistemas Web",
    description:
      "Plataformas, dashboards, ERPs, CRMs e aplicações web completas com foco em performance, escalabilidade e experiência de usuário.",
    accent: "#6C63FF",
  },
  {
    icon: Smartphone,
    title: "Aplicativos Mobile",
    description:
      "Criamos aplicativos nativos e multiplataforma para iOS e Android, prontos para o mercado.",
    accent: "#00D4AA",
  },
  {
    icon: Layout,
    title: "Landing Pages e Sites",
    description:
      "Sites institucionais e landing pages que carregam rápido, aparecem no Google e transformam visitas em resultado.",
    accent: "#6C63FF",
  },
  {
    icon: Wrench,
    title: "Manutenção e Evolução",
    description:
      "Correção de bugs, refatoração e novas funcionalidades em sistemas já existentes, sem travar a operação do seu negócio.",
    accent: "#00D4AA",
  },
  {
    icon: Lightbulb,
    title: "Consultoria Técnica",
    description:
      "Diagnóstico de arquitetura, escolha de stack e planejamento técnico para tirar seu projeto do papel com as decisões certas.",
    accent: "#6C63FF",
  },
  {
    icon: Plug,
    title: "APIs e Integrações",
    description:
      "Conectamos seus sistemas a ERPs, CRMs, gateways de pagamento e outras plataformas, automatizando processos e eliminando retrabalho.",
    accent: "#00D4AA",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-heading" className="py-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-primary/5 rounded-full blur-3xl" />

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
            // Serviços
          </span>
          <h2 id="servicos-heading" className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight break-words">
            O que podemos{" "}
            <span className="gradient-text">construir juntos</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                variants={cardVariants}
                className="group relative rounded-2xl border border-white/[.07] bg-surface p-7
                  transition-all duration-300 hover:border-primary/45 hover:-translate-y-1
                  hover:shadow-[0_0_30px_rgba(108,99,255,.18),0_12px_40px_rgba(0,0,0,.4)]"
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
                  style={{ background: `${s.accent}18` }}
                >
                  <Icon
                    size={22}
                    style={{ color: s.accent }}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <h3 className="font-display font-bold text-lg text-ink mb-3">{s.title}</h3>
                <p className="text-dim text-sm leading-relaxed">{s.description}</p>

                {/* Hover top border accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${s.accent}, transparent)` }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
