"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { faqs } from "@/lib/faqs";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-28 relative">
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
          <h2 id="faq-heading" className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight break-words">
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
