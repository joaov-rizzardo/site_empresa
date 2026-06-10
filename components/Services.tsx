"use client";
import { motion } from "framer-motion";
import { Monitor, Smartphone, Plug, Layout } from "lucide-react";

const services = [
  {
    icon: Monitor,
    title: "Sistemas Web",
    description:
      "Plataformas, dashboards, ERPs, CRMs e aplicações web completas com foco em performance, escalabilidade e experiência de usuário.",
    tags: ["React", "Next.js", "Node.js"],
    accent: "#6C63FF",
  },
  {
    icon: Smartphone,
    title: "Aplicativos Mobile",
    description:
      "Apps nativos e multiplataforma para iOS e Android — do protótipo ao lançamento nas lojas, com design nativo e performance real.",
    tags: ["React Native", "Flutter"],
    accent: "#00D4AA",
  },
  {
    icon: Plug,
    title: "APIs & Integrações",
    description:
      "APIs RESTful e GraphQL robustas, conectando sistemas, ERPs, gateways de pagamento e serviços externos com segurança e velocidade.",
    tags: ["Node.js", "PostgreSQL", "REST"],
    accent: "#6C63FF",
  },
  {
    icon: Layout,
    title: "Landing Pages & Sites",
    description:
      "Sites institucionais e landing pages de alta conversão, otimizadas para SEO, Core Web Vitals e performance máxima.",
    tags: ["Next.js", "Tailwind", "SEO"],
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
    <section id="servicos" className="py-28 relative overflow-hidden">
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
            // O que entregamos
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tight">
            Soluções feitas para{" "}
            <span className="gradient-text">escalar</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
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
                <p className="text-dim text-sm leading-relaxed mb-5">{s.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-xs font-mono"
                      style={{
                        background: `${s.accent}14`,
                        color: s.accent,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

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
