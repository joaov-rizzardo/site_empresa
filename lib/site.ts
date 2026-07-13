/**
 * Configuração central do site — fonte única de verdade para dados de
 * contato e URL. Atualize o WhatsApp/telefone/CNPJ aqui e todos os links,
 * botões e JSON-LD passam a usar o valor correto.
 */
export const siteConfig = {
  name: "Vex Software",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://vexsoftware.com.br",
  email: "contato@vexsoftware.com.br",
  whatsapp: "5512997096351",
  phoneDisplay: "(12) 99709-6351",
  phoneE164: "+5512997096351",
  city: "São Paulo",
  region: "SP",
  country: "BR",
} as const;

/** Mensagem padrão pré-preenchida no WhatsApp. */
export const whatsappMessage = "Olá, gostaria de solicitar um orçamento";

/** Monta um link wa.me, opcionalmente com texto pré-preenchido. */
export function whatsappUrl(text?: string): string {
  const base = `https://wa.me/${siteConfig.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
