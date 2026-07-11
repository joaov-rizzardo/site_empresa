"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle, Mail, CheckCircle2, Loader2 } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulated form submission — replace with Formspree/EmailJS endpoint
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("sent");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contato" className="py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/40 to-surface/60" />
      <div className="absolute inset-0 dot-grid opacity-25" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-64 bg-primary/6 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — CTA */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-mono text-secondary tracking-[0.2em] uppercase mb-5">
              // Contato
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-5 break-words">
              Pronto para transformar{" "}
              <span className="gradient-text">sua ideia</span>?
            </h2>
            <p className="text-ink2/75 leading-relaxed mb-10">
              Entre em contato e receba uma resposta rápida, sem compromisso. A primeira
              conversa é gratuita e já traz clareza sobre o que o seu projeto precisa.
            </p>

            <div className="space-y-4">
              <a
                href="https://wa.me/5521XXXXXXXXX?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20or%C3%A7amento"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-white/[.07] bg-surface hover:border-[#25D366]/40 hover:bg-[#25D366]/5 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#25D366]/15 flex items-center justify-center group-hover:bg-[#25D366]/25 transition-colors">
                  <MessageCircle size={18} className="text-[#25D366]" />
                </div>
                <div>
                  <div className="text-sm font-medium text-ink">WhatsApp</div>
                  <div className="text-xs text-dim">Chamar agora — resposta imediata</div>
                </div>
              </a>

              <a
                href="mailto:contato@vexsoftware.com.br"
                className="flex items-center gap-4 p-4 rounded-xl border border-white/[.07] bg-surface hover:border-primary/40 hover:bg-primary/5 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail size={18} className="text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium text-ink">E-mail</div>
                  <div className="text-xs text-dim">contato@vexsoftware.com.br</div>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="rounded-2xl border border-white/[.08] bg-surface p-8 shadow-2xl">
              {status === "sent" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle2 size={52} className="text-secondary mx-auto mb-4" />
                  <h3 className="font-display font-bold text-2xl text-ink mb-2">
                    Mensagem enviada!
                  </h3>
                  <p className="text-dim text-sm">
                    Retornarei em breve com uma resposta personalizada.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs text-dim mb-2 font-mono">
                        Nome *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Seu nome"
                        className="w-full px-4 py-3 rounded-xl bg-surface2 border border-white/[.08] text-ink text-sm
                          placeholder:text-dim/50 focus:outline-none focus:border-primary/60 focus:bg-surface2/80
                          transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-dim mb-2 font-mono">
                        E-mail *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="seu@email.com"
                        className="w-full px-4 py-3 rounded-xl bg-surface2 border border-white/[.08] text-ink text-sm
                          placeholder:text-dim/50 focus:outline-none focus:border-primary/60 focus:bg-surface2/80
                          transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-dim mb-2 font-mono">
                      Telefone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="(21) 99999-9999"
                      className="w-full px-4 py-3 rounded-xl bg-surface2 border border-white/[.08] text-ink text-sm
                        placeholder:text-dim/50 focus:outline-none focus:border-primary/60 focus:bg-surface2/80
                        transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-dim mb-2 font-mono">
                      Descreva seu projeto *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="O que você precisa desenvolver? Qual problema quer resolver?"
                      className="w-full px-4 py-3 rounded-xl bg-surface2 border border-white/[.08] text-ink text-sm
                        placeholder:text-dim/50 focus:outline-none focus:border-primary/60 focus:bg-surface2/80
                        transition-all duration-200 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-primary text-white font-semibold
                      hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed
                      transition-all duration-200 hover:shadow-[0_0_25px_rgba(108,99,255,.4)]"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Enviar mensagem
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-dim/60">
                    Sem spam. Resposta garantida.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
