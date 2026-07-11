"use client";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  text: string;
  name: string;
  sector: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    text: "A equipe entendeu exatamente o que precisávamos. O sistema foi entregue antes do prazo e superou nossas expectativas em todos os aspectos.",
    name: "Carlos Mendes",
    sector: "Saúde",
    initials: "CM",
  },
  {
    text: "Profissionalismo e qualidade técnica impecáveis. O app mobile que desenvolveram aumentou nossas entregas em 40% no primeiro mês.",
    name: "Ana Paula Rodrigues",
    sector: "Delivery & Logística",
    initials: "AP",
  },
  {
    text: "Comunicação clara durante todo o processo e código limpo e documentado. Recomendo para qualquer empresa que queira um sistema robusto.",
    name: "Ricardo Torres",
    sector: "Fintech",
    initials: "RT",
  },
  {
    text: "Nossa loja virtual ficou muito mais rápida depois da migração. O time acompanhou cada etapa e resolveu qualquer imprevisto na hora.",
    name: "Fernanda Lima",
    sector: "E-commerce",
    initials: "FL",
  },
  {
    text: "A plataforma de ensino que construíram suporta milhares de alunos simultâneos sem travar. Suporte ágil mesmo fora do horário comercial.",
    name: "Bruno Castro",
    sector: "Educação",
    initials: "BC",
  },
  {
    text: "O sistema de pedidos online reduziu os erros na cozinha e agilizou o atendimento. Voltamos a fechar com essa equipe sem pensar duas vezes.",
    name: "Juliana Prado",
    sector: "Alimentação",
    initials: "JP",
  },
  {
    text: "O portal de imóveis ficou intuitivo e rápido para os corretores usarem. Entrega dentro do prazo combinado, sem surpresas no orçamento.",
    name: "Marcos Ferraz",
    sector: "Imobiliário",
    initials: "MF",
  },
  {
    text: "O sistema de reservas integrou perfeitamente com nossos canais de venda. Hoje temos muito menos overbooking e mais controle operacional.",
    name: "Patrícia Nogueira",
    sector: "Turismo & Hotelaria",
    initials: "PN",
  },
  {
    text: "Arquitetura sólida e escalável desde o primeiro dia. Conseguimos dobrar nossa base de clientes sem precisar reescrever o produto.",
    name: "Eduardo Salviano",
    sector: "SaaS B2B",
    initials: "ES",
  },
  {
    text: "O aplicativo de fidelidade aumentou o retorno dos clientes nas lojas físicas. Design bonito e fácil de usar, exatamente o que pedimos.",
    name: "Camila Duarte",
    sector: "Varejo & Beleza",
    initials: "CD",
  },
];

const AUTOPLAY_INTERVAL = 5000;

// Entrance animation is triggered once on the track (tied to the section
// scrolling into the page's vertical viewport), not per-card — cards must
// not replay the rise-in animation as they're scrolled into the carousel's
// horizontal viewport later.
const trackVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface Stop {
  /** index into `testimonials` that this stop scrolls to */
  index: number;
  /** clamped scrollLeft this stop resolves to */
  target: number;
}

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  // Seeded with one stop per testimonial so SSR/first paint renders a dot
  // per card; corrected to the deduped set before paint via useLayoutEffect.
  const [stops, setStops] = useState<Stop[]>(() =>
    testimonials.map((_, i) => ({ index: i, target: 0 }))
  );
  const [stopPos, setStopPos] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const scrollToTarget = useCallback((target: number) => {
    trackRef.current?.scrollTo({ left: target, behavior: "smooth" });
  }, []);

  const goTo = useCallback(
    (pos: number) => {
      if (stops.length === 0) return;
      const next = (pos + stops.length) % stops.length;
      setStopPos(next);
      scrollToTarget(stops[next].target);
    },
    [stops, scrollToTarget]
  );

  // Multiple cards are visible at once on wider screens, so scrolling to the
  // last few individual cards can clamp to the same max scrollLeft as an
  // earlier one — dedupe those so every dot maps to a visually distinct spot.
  const computeStops = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const children = Array.from(track.children) as HTMLElement[];
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    const next: Stop[] = [];
    let lastTarget = -1;
    children.forEach((child, i) => {
      const target = Math.min(child.offsetLeft, maxScroll);
      if (target !== lastTarget) {
        next.push({ index: i, target });
        lastTarget = target;
      }
    });
    setStops(next);
    setStopPos((prev) => Math.min(prev, next.length - 1));
  }, []);

  useLayoutEffect(() => {
    computeStops();
    window.addEventListener("resize", computeStops);
    return () => window.removeEventListener("resize", computeStops);
  }, [computeStops]);

  // Autoplay
  useEffect(() => {
    if (isPaused || stops.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      setStopPos((prev) => {
        const next = (prev + 1) % stops.length;
        scrollToTarget(stops[next].target);
        return next;
      });
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(id);
  }, [isPaused, stops, scrollToTarget]);

  // Keep active dot in sync with manual swipe/drag scrolling
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        let closest = 0;
        let minDiff = Infinity;
        stops.forEach((s, i) => {
          const diff = Math.abs(s.target - track.scrollLeft);
          if (diff < minDiff) {
            minDiff = diff;
            closest = i;
          }
        });
        setStopPos(closest);
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [stops]);

  return (
    <section
      className="py-28 bg-surface/30 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
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
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight break-words">
            O que nossos{" "}
            <span className="gradient-text">clientes dizem</span>
          </h2>
        </motion.div>

        <div className="relative md:px-16">
          <motion.div
            ref={trackRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={trackVariants}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pt-3 pb-8
              [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {testimonials.map((t, i) => {
              const accent = i % 2 === 0 ? "#6C63FF" : "#00D4AA";
              return (
                <div
                  key={t.name}
                  className="snap-start shrink-0 w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
                >
                  <motion.div
                    variants={cardVariants}
                    className="group relative h-full flex flex-col rounded-2xl border border-white/[.07] bg-surface p-7
                      hover:border-primary/35 transition-all duration-300 hover:-translate-y-1
                      hover:shadow-[0_0_25px_rgba(108,99,255,.12),0_12px_40px_rgba(0,0,0,.3)]"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                      style={{ background: `${accent}15` }}
                    >
                      <Quote size={18} style={{ color: accent }} />
                    </div>

                    <p className="flex-1 text-ink2/75 text-sm leading-relaxed mb-6 italic">
                      &ldquo;{t.text}&rdquo;
                    </p>

                    <div className="flex items-center gap-3 pt-4 border-t border-white/[.06]">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm text-white shrink-0"
                        style={{ background: `linear-gradient(135deg, ${accent}, ${accent}80)` }}
                      >
                        {t.initials}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-ink">{t.name}</div>
                        <div className="text-xs text-dim">{t.sector}</div>
                      </div>

                      <div className="ml-auto flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <span key={j} className="text-xs" style={{ color: accent }}>
                            ★
                          </span>
                        ))}
                      </div>
                    </div>

                    <div
                      className="absolute top-0 left-0 right-0 h-px rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                    />
                  </motion.div>
                </div>
              );
            })}
          </motion.div>

          <button
            onClick={() => goTo(stopPos - 1)}
            aria-label="Depoimento anterior"
            className="hidden md:flex absolute top-1/2 left-2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center
              bg-surface border border-white/10 text-ink2 hover:bg-white/10 hover:text-ink transition-colors shadow-lg"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => goTo(stopPos + 1)}
            aria-label="Próximo depoimento"
            className="hidden md:flex absolute top-1/2 right-2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center
              bg-surface border border-white/10 text-ink2 hover:bg-white/10 hover:text-ink transition-colors shadow-lg"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {stops.map((s, pos) => (
            <button
              key={testimonials[s.index].name}
              onClick={() => goTo(pos)}
              aria-label={`Ir para depoimento de ${testimonials[s.index].name}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                pos === stopPos ? "w-6 bg-primary" : "w-1.5 bg-white/15 hover:bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
