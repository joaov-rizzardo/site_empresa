"use client";
import { motion } from "framer-motion";

const techs = [
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#F0F0F8" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "Node.js", color: "#68A063" },
  { name: "React Native", color: "#61DAFB" },
  { name: "Flutter", color: "#54C5F8" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "MongoDB", color: "#47A248" },
  { name: "Firebase", color: "#FFA000" },
  { name: "Docker", color: "#2496ED" },
  { name: "AWS", color: "#FF9900" },
  { name: "Prisma", color: "#5A67D8" },
  { name: "GraphQL", color: "#E535AB" },
  { name: "Redis", color: "#DC382D" },
  { name: "Git", color: "#F05032" },
  { name: "Tailwind", color: "#06B6D4" },
];

const doubled = [...techs, ...techs];

export default function TechStack() {
  return (
    <section className="py-24 relative overflow-hidden bg-surface/30">
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-base to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-base to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="text-center mb-12 px-6"
      >
        <span className="inline-block text-xs font-mono text-secondary tracking-[0.2em] uppercase mb-4">
          // Nossa stack
        </span>
        <h2 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tight">
          Tecnologias que{" "}
          <span className="gradient-text">dominamos</span>
        </h2>
      </motion.div>

      {/* Marquee row 1 */}
      <div className="overflow-hidden mb-4">
        <div className="flex animate-marquee w-max">
          {doubled.map((tech, i) => (
            <div
              key={`r1-${i}`}
              className="group flex items-center gap-3 mx-4 px-5 py-3 rounded-xl border border-white/[.07]
                bg-surface hover:border-primary/40 transition-all duration-300 cursor-default shrink-0"
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: tech.color, boxShadow: `0 0 8px ${tech.color}60` }}
              />
              <span className="text-ink2/70 group-hover:text-ink text-sm font-medium transition-colors font-mono">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee row 2 — reverse */}
      <div className="overflow-hidden">
        <div
          className="flex w-max"
          style={{ animation: "marquee 28s linear infinite reverse" }}
        >
          {[...doubled].reverse().map((tech, i) => (
            <div
              key={`r2-${i}`}
              className="group flex items-center gap-3 mx-4 px-5 py-3 rounded-xl border border-white/[.07]
                bg-surface hover:border-secondary/40 transition-all duration-300 cursor-default shrink-0"
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: tech.color, boxShadow: `0 0 8px ${tech.color}60` }}
              />
              <span className="text-ink2/70 group-hover:text-ink text-sm font-medium transition-colors font-mono">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
