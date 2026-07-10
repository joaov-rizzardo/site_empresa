# Espaço Âncora — Landing Page

## O que é

Landing page de página única para o **Espaço Âncora**, um consultório de psicologia clínica conduzido pela Dra. Camila Rodrigues (CRP 06/142857, especialista em Terapia Cognitivo-Comportamental). O projeto é uma peça de portfólio freelance: todos os dados (profissional, depoimentos, contato) são fictícios, mas a página foi construída com o mesmo rigor técnico e de processo de um produto real.

## Contexto de negócio

A página existe para **converter visitantes em pacientes** via WhatsApp ou formulário de contato, seguindo a jornada:

1. **Credibilidade** — o visitante identifica rapidamente (acima da dobra) quem é a profissional, seu registro no conselho (CRP), especialização e modalidades de atendimento (presencial em SP ou online).
2. **Serviços** — o visitante confirma que seu problema (ansiedade, depressão, desenvolvimento pessoal, terapia individual) é atendido, e entende duração/formato das sessões.
3. **Objeções** — dúvidas comuns (sigilo, eficácia da terapia online, valores, duração do processo) são respondidas em uma seção de FAQ, reforçadas por depoimentos de prova social.
4. **Conversão** — o visitante entra em contato em no máximo 1 clique via WhatsApp (mensagem pré-preenchida) ou preenche um formulário validado com feedback visual.

Não há backend, CRM ou integração real com WhatsApp Business API: o "envio" do formulário é simulado (`setTimeout` + toast) e todo o conteúdo textual fica centralizado em `constants.ts`. O público principal é mobile (iOS/Android, navegadores modernos), com foco explícito em acessibilidade (navegação por teclado, `prefers-reduced-motion`) e responsividade (375px, 768px, 1280px).

Especificação completa do produto (user stories, requisitos funcionais, critérios de sucesso): [`specs/001-espaco-ancora-landing/spec.md`](specs/001-espaco-ancora-landing/spec.md).

## Contexto técnico

Aplicação Next.js 14 (App Router) com TypeScript em modo estrito, vivendo em [`espaco-ancora/`](espaco-ancora/). O projeto foi planejado e executado via workflow **speckit** (spec → plan → tasks → implementação), com forte ênfase em TDD.

### Stack principal

| Categoria | Ferramenta |
|---|---|
| Framework | Next.js 14 (App Router), React 18 |
| Linguagem | TypeScript 5.x (strict) |
| Estilização | Tailwind CSS 3.x, via CSS custom properties (sem valores hardcoded) |
| Animações | Framer Motion 12.x — todas as transições de entrada e interação; respeita `prefers-reduced-motion` |
| Ícones | Lucide React (biblioteca exclusiva) |
| Formulário | React Hook Form + Zod + `@hookform/resolvers` |
| Fontes | `next/font/google` — Playfair Display (títulos) + DM Sans (corpo) |
| Utilitários | `clsx` + `tailwind-merge` (helper `cn()`) |

### Testes

| Camada | Ferramenta | Meta |
|---|---|---|
| Unitário | Vitest (jsdom) + `@vitejs/plugin-react` | ≥80% linhas/funções/statements, ≥75% branches |
| Componente | React Testing Library + jest-dom | Mocks de `IntersectionObserver` e `matchMedia` |
| E2E | Playwright | Chromium desktop + iPhone 13 (mobile), `baseURL` local |

### Estrutura de pastas (dentro de `espaco-ancora/`)

```
src/
├── app/                  # layout, page, globals.css
├── components/
│   ├── sections/         # Navbar, Hero, Stats, About, Services, HowItWorks,
│   │                       Testimonials, Faq, Contact, Cta, Footer
│   └── ui/                # Button, Card, SectionTitle, AnimatedCounter,
│                            WhatsAppButton, Toast
├── lib/                  # constants.ts, animations.ts, utils.ts
├── types/
└── hooks/                # useIntersection, useCarousel

__tests__/
├── unit/
├── components/
└── e2e/
```

Server Components por padrão; `'use client'` restrito a componentes com estado (`useState`/`useEffect`).

### Restrições de projeto (constitution)

- Proibido: `any` em TypeScript, `console.log` em código final, bibliotecas de componentes pesadas (Bootstrap/MUI/Chakra), `localStorage`/`sessionStorage`.
- `next build` deve rodar sem erros de TypeScript/ESLint.
- Design system centralizado via CSS custom properties; conteúdo fictício centralizado em `constants.ts`.

### Comandos (dentro de `espaco-ancora/`)

```bash
npm run dev            # servidor de desenvolvimento
npm run build           # build de produção
npm run test            # testes unitários/componente (Vitest)
npm run test:coverage   # com cobertura
npm run test:e2e        # testes E2E (Playwright)
npm run typecheck       # tsc --noEmit
```

## Documentação do processo (speckit)

Toda a especificação, plano técnico, modelo de dados e tarefas de implementação estão em [`specs/001-espaco-ancora-landing/`](specs/001-espaco-ancora-landing/):

- `spec.md` — especificação funcional (user stories, requisitos, critérios de sucesso)
- `plan.md` — plano técnico e constitution check
- `data-model.md` — entidades e schemas Zod
- `contracts/` — contratos do formulário de contato e do link de WhatsApp
- `tasks.md` — tarefas de implementação
- `quickstart.md` — guia de validação end-to-end
