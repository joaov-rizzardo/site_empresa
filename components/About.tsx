"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Rocket, Users, CalendarClock, Target } from "lucide-react";

const stats = [
  { value: 20, suffix: "+", label: "Projetos entregues", icon: Rocket, accent: "#6C63FF" },
  { value: 15, suffix: "+", label: "Clientes ativos", icon: Users, accent: "#00D4AA" },
  { value: 4, suffix: "+", label: "Anos de mercado", icon: CalendarClock, accent: "#6C63FF" },
  { value: 100, suffix: "%", label: "Entregas no prazo", icon: Target, accent: "#00D4AA" },
];

const values = [
  "Código limpo, escalável e documentado",
  "Comunicação clara em todo o processo",
  "Compromisso com o resultado do negócio",
  "Suporte dedicado após a entrega",
];

// easeOutExpo — fast start, smooth settle
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1600;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            setCount(Math.round(target * easeOutExpo(p)));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function About() {
  return (
    <section id="sobre" className="py-28 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-xs font-mono text-secondary tracking-[0.2em] uppercase mb-4">
            // Sobre nós
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 break-words">
            Sobre a <span className="gradient-text">Vex Software</span>
          </h2>
          <p className="text-ink2/75 leading-relaxed">
            A Vex Software desenvolve sistemas web, aplicativos e integrações sob medida para
            empresas que precisam de tecnologia confiável. Acompanhamos cada projeto do
            planejamento à entrega, com código de qualidade, prazos respeitados e comunicação
            direta, sem intermediários.
          </p>
        </motion.div>

        {/* Metrics grid */}
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-16"
        >
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                variants={cardVariants}
                className="group relative overflow-hidden rounded-2xl border border-white/[.07] bg-surface
                  p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1.5
                  hover:shadow-[0_0_35px_rgba(108,99,255,.16),0_16px_48px_rgba(0,0,0,.45)]"
                style={{ ["--accent" as string]: s.accent }}
              >
                {/* Hover radial glow */}
                <div
                  className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `${s.accent}22` }}
                />

                {/* Icon chip */}
                <div
                  className="relative w-11 h-11 rounded-xl flex items-center justify-center mb-5
                    transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                  style={{ background: `${s.accent}18` }}
                >
                  <Icon size={20} style={{ color: s.accent }} />
                </div>

                {/* Number */}
                <div className="relative font-display font-extrabold text-4xl sm:text-5xl tracking-tight text-ink">
                  <Counter target={s.value} suffix={s.suffix} />
                </div>
                <div className="relative text-dim text-xs sm:text-sm mt-2">{s.label}</div>

                {/* Hover top accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${s.accent}, transparent)` }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Values + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="rounded-2xl border border-white/[.07] bg-surface/60 p-8 sm:p-10
            flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12"
        >
          <div className="flex-1">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-ink mb-6">
              Por que trabalhar com a <span className="gradient-text">Vex</span>
            </h3>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3.5">
              {values.map((v) => (
                <li key={v} className="flex items-start gap-3 text-ink2/80 text-sm">
                  <CheckCircle2 size={17} className="text-secondary shrink-0 mt-0.5" />
                  {v}
                </li>
              ))}
            </ul>
          </div>

          <a
            href="#contato"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="shrink-0 inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-white font-semibold
              hover:bg-primary/90 transition-all duration-200 hover:shadow-[0_0_25px_rgba(108,99,255,.4)]"
          >
            Vamos conversar
          </a>
        </motion.div>
      </div>
    </section>
  );
}
