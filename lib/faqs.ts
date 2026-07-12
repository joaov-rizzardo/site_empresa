/**
 * Perguntas frequentes — fonte única usada tanto pelo componente visual
 * (`components/FAQ.tsx`) quanto pelo JSON-LD `FAQPage` da home, para não
 * duplicar conteúdo entre a UI e os dados estruturados.
 */
export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Quanto tempo leva para desenvolver um sistema?",
    a: "Depende da complexidade. Uma landing page ou site institucional leva de 2 a 3 semanas. Um MVP de SaaS ou app mobile costuma levar de 2 a 4 meses. Sistemas mais robustos como ERPs e plataformas completas levam de 4 a 8 meses. Tudo é definido com precisão durante o planejamento.",
  },
  {
    q: "Preciso já ter tudo definido para começar um projeto?",
    a: "Não. Muitos clientes chegam só com uma ideia. É justamente na etapa de descoberta que ajudamos a transformar essa ideia em um escopo claro e viável.",
  },
  {
    q: "Como funciona o processo de orçamento?",
    a: "É simples e sem compromisso: você descreve o projeto pelo formulário ou WhatsApp. Depois, fazemos uma reunião de descoberta gratuita (~45 min) para entender os requisitos. Em até 24 horas, você recebe uma proposta detalhada com escopo, prazo e investimento.",
  },
  {
    q: "O código e o sistema são meus depois da entrega?",
    a: "Sim. Todo o código-fonte e a propriedade intelectual do projeto são transferidos para você após a entrega. Você não fica refém de nenhuma dependência conosco para manter ou evoluir o sistema.",
  },
  {
    q: "Vocês oferecem suporte após a entrega?",
    a: "Sim. Após a entrega, você tem 30 dias de suporte gratuito para correções e pequenos ajustes. Caso surjam demandas maiores, como novas funcionalidades, elas são orçadas separadamente.",
  },
];
