"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const stats = [
  { value: 20, suffix: "+", label: "Projetos entregues" },
  { value: 15, suffix: "+", label: "Clientes ativos" },
  { value: 4, suffix: "+", label: "Anos de experiência" },
  { value: 100, suffix: "%", label: "Entregas no prazo" },
];

const values = [
  "Código limpo, escalável e documentado",
  "Comunicação clara em todo o processo",
  "Compromisso com o resultado do negócio",
  "Suporte dedicado após a entrega",
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1400;
          const step = 16;
          const total = Math.ceil(duration / step);
          let i = 0;
          const t = setInterval(() => {
            i++;
            setCount(Math.round((target * i) / total));
            if (i >= total) clearInterval(t);
          }, step);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="font-display font-extrabold text-4xl text-primary">
      {count}
      {suffix}
    </div>
  );
}

export default function About() {
  return (
    <section id="sobre" className="py-28 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16 lg:hidden"
        >
          <span className="inline-block text-xs font-mono text-secondary tracking-[0.2em] uppercase mb-4">
            // Sobre nós
          </span>
          <h2 className="font-display text-4xl font-extrabold tracking-tight">
            Quem está por <span className="gradient-text">trás disso</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="hidden lg:inline-block text-xs font-mono text-secondary tracking-[0.2em] uppercase mb-5">
              // Sobre nós
            </span>
            <h2 className="hidden lg:block font-display text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">
              Quem está por <span className="gradient-text">trás disso</span>
            </h2>

            <p className="text-ink2/75 leading-relaxed mb-5">
              A DevStudio é operada por um desenvolvedor full stack apaixonado por transformar
              problemas reais em soluções digitais elegantes. Com mais de 4 anos de experiência,
              atendemos desde startups em fase inicial até empresas que precisam modernizar
              sistemas legados.
            </p>
            <p className="text-ink2/75 leading-relaxed mb-8">
              Nossa missão é simples: entregar tecnologia de qualidade que gere resultado real
              para o seu negócio — sem burocracia, sem enrolação, com transparência total
              do primeiro ao último dia do projeto.
            </p>

            <ul className="space-y-3 mb-10">
              {values.map((v) => (
                <li key={v} className="flex items-center gap-3 text-ink2/80 text-sm">
                  <CheckCircle2 size={16} className="text-secondary shrink-0" />
                  {v}
                </li>
              ))}
            </ul>

            <a
              href="#contato"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-white font-semibold
                hover:bg-primary/90 transition-all duration-200 hover:shadow-[0_0_25px_rgba(108,99,255,.4)]"
            >
              Vamos conversar
            </a>
          </motion.div>

          {/* Right — card + stats */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Founder card */}
            <div className="rounded-2xl border border-white/[.08] bg-surface p-6 flex gap-5 items-center">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/40 to-secondary/30 flex items-center justify-center font-display font-bold text-2xl text-white shrink-0">
                JS
              </div>
              <div>
                <div className="font-display font-bold text-lg text-ink">João Silva</div>
                <div className="text-secondary text-sm font-mono mb-1">Fundador & Dev Full Stack</div>
                <div className="text-dim text-xs">React · Node.js · React Native · AWS</div>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/[.07] bg-surface p-5 text-center
                    hover:border-primary/30 transition-colors"
                >
                  <Counter target={s.value} suffix={s.suffix} />
                  <div className="text-dim text-xs mt-1.5">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
