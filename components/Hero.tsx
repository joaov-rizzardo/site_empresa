"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Star, Zap } from "lucide-react";

/* ─── Typing terminal ─── */
const CODE_LINES = [
  "const startup = {",
  "  client: 'SuaEmpresa',",
  "  stack: ['React', 'Next.js', 'Node.js'],",
  "  mobile: ['React Native', 'Flutter'],",
  "  quality: 'premium',",
  "  delivery: 'on-time',",
  "}",
  "",
  "const result = await DevStudio",
  "  .transformIdea(startup)",
  "",
  "// ✓ Projeto entregue com sucesso!",
  "// ✓ 100% no prazo · cliente satisfeito",
];

function TypingTerminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (done) return;
    if (currentLine >= CODE_LINES.length) {
      setDone(true);
      return;
    }
    const line = CODE_LINES[currentLine];
    if (currentChar <= line.length) {
      const delay = currentChar === 0 ? 120 : line[currentChar - 1] === " " ? 30 : 45;
      const t = setTimeout(() => {
        setLines((prev) => {
          const next = [...prev];
          next[currentLine] = line.slice(0, currentChar);
          return next;
        });
        setCurrentChar((c) => c + 1);
      }, delay);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, 90);
      return () => clearTimeout(t);
    }
  }, [currentLine, currentChar, done]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  const getLineColor = (line: string) => {
    if (line.startsWith("//")) return "text-dim";
    if (line.startsWith("const ") || line.startsWith("  const ")) return "text-primary";
    if (line.includes(":") && !line.startsWith("//")) {
      return line.includes("'") ? "text-secondary" : "text-ink2";
    }
    if (line.startsWith("}") || line.startsWith("]")) return "text-ink2";
    return "text-ink/80";
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Terminal glow */}
      <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-2xl scale-105" />

      <div className="relative rounded-2xl border border-white/10 bg-surface overflow-hidden shadow-2xl terminal-scan">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[.07] bg-surface2/60">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <span className="w-3 h-3 rounded-full bg-[#28CA41]" />
          </div>
          <span className="ml-2 text-xs text-dim font-mono">~/devstudio/project.ts</span>
        </div>

        {/* Code area */}
        <div
          ref={containerRef}
          className="p-5 h-72 overflow-y-hidden font-mono text-sm leading-relaxed"
        >
          {/* Line numbers + code */}
          {CODE_LINES.slice(0, currentLine + 1).map((_, lineIdx) => (
            <div key={lineIdx} className="flex gap-4 min-h-[1.5rem]">
              <span className="text-dim/40 select-none text-xs pt-0.5 w-4 text-right shrink-0">
                {lineIdx + 1}
              </span>
              <span className={`${getLineColor(CODE_LINES[lineIdx])}`}>
                {lines[lineIdx] ?? ""}
                {lineIdx === currentLine && !done && (
                  <span className="inline-block w-2 h-4 bg-primary/80 ml-0.5 animate-blink" />
                )}
              </span>
            </div>
          ))}
          {done && (
            <div className="flex gap-4 mt-1">
              <span className="text-dim/40 select-none text-xs pt-0.5 w-4 text-right shrink-0" />
              <span className="text-secondary/70">▊</span>
            </div>
          )}
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-white/[.05] bg-base/60 text-xs text-dim/60 font-mono">
          <span>TypeScript · UTF-8</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            {done ? "Compilado com sucesso" : "Digitando..."}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Particle canvas ─── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type P = { x: number; y: number; vx: number; vy: number; r: number };
    const COUNT = 60;
    const particles: P[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(108,99,255,0.5)";
        ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(108,99,255,${0.15 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
    />
  );
}

/* ─── Hero ─── */
export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
    >
      {/* Background layers */}
      <div className="absolute inset-0 dot-grid opacity-60" />
      <ParticleCanvas />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-base/80" />

      {/* Radial glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-secondary/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-7 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-sm text-primary font-medium"
            >
              <Star size={13} fill="currentColor" />
              <span>+20 projetos entregues · Desde 2020</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="font-display text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6"
            >
              Transformamos{" "}
              <span className="gradient-text">suas ideias</span>{" "}
              em sistemas que funcionam
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-ink2/80 text-lg leading-relaxed mb-10 max-w-lg"
            >
              Desenvolvimento web e mobile sob medida para empresas que querem
              crescer com tecnologia de verdade — desde o MVP até o escalonamento.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-white font-semibold
                  hover:bg-primary/90 transition-all duration-200 hover:shadow-[0_0_30px_rgba(108,99,255,0.45)] group"
              >
                Ver Projetos
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="https://wa.me/5521XXXXXXXXX?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20or%C3%A7amento"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/12 bg-white/[.04]
                  text-ink/80 font-semibold hover:border-secondary/50 hover:text-secondary hover:bg-secondary/5 transition-all duration-200"
              >
                <MessageCircle size={16} />
                Falar Conosco
              </a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-white/[.06]"
            >
              {[
                { value: "+20", label: "Projetos entregues" },
                { value: "+15", label: "Clientes satisfeitos" },
                { value: "4+", label: "Anos de experiência" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display font-bold text-2xl text-primary">{s.value}</div>
                  <div className="text-xs text-dim mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="animate-float"
          >
            <TypingTerminal />

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute -bottom-4 left-6 flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm shadow-xl"
            >
              <Zap size={14} className="text-secondary" fill="currentColor" />
              <span className="text-ink2 text-xs">Deploy em produção</span>
              <span className="text-secondary font-mono text-xs">✓</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-dim/60 tracking-widest uppercase">scroll</span>
        <div className="w-5 h-8 rounded-full border border-white/15 flex justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="w-1 h-1.5 rounded-full bg-primary/60"
          />
        </div>
      </motion.div>
    </section>
  );
}
