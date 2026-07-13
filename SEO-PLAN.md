# Plano de Melhoria de SEO — Página Inicial

> Escopo: **home** (`app/page.tsx` + `app/layout.tsx` e componentes renderizados nela) + higiene mínima das sub-rotas de portfólio para evitar páginas órfãs.
> Stack: Next.js 16 (App Router), Tailwind v4, framer-motion.
> Objetivo: melhorar rastreabilidade, indexação, compartilhamento social e Core Web Vitals sem alterar o design.
>
> **Ordem real das seções na home** (`app/page.tsx`): Navbar → Hero → Services → Process → TechStack → About → Testimonials → FAQ → Contact → Footer. **`Portfolio` NÃO é renderizado na home** (o componente existe, mas não é usado em `page.tsx`) — ver lacuna #11.

---

## Diagnóstico atual

O que **já está bom**:

- `metadata` definido em `app/layout.tsx` com `title`, `description`, `openGraph`, `twitter`, `robots` e `keywords`.
- `<html lang="pt-BR">` correto.
- Um único `<h1>` na home (no `Hero`), com `<h2>` por seção — hierarquia semântica coerente.
- `<main>` presente em `app/page.tsx`; imagens de conteúdo usam `next/image` com `alt`.
- Favicon SVG (`app/icon.svg`).

Lacunas encontradas:

| # | Lacuna | Impacto |
|---|--------|---------|
| 1 | `metadataBase` cai para `http://localhost:3000` (falta `NEXT_PUBLIC_SITE_URL` de produção) | URLs absolutas/canonical erradas |
| 2 | Sem `alternates.canonical` | Risco de conteúdo duplicado |
| 3 | OpenGraph/Twitter sem `images` (og:image), `url` e `siteName` | Compartilhamento sem preview visual |
| 4 | Sem `app/sitemap.ts` | Descoberta de URLs mais lenta |
| 5 | Sem `app/robots.ts` | Sem diretriz de crawl nem apontar sitemap |
| 6 | Sem JSON-LD (dados estruturados) | Perde rich results (Organization, FAQ) |
| 7 | `<h1>` do Hero inicia com `opacity:0` + `delay:0.35` (framer-motion) | Prejudica **LCP** / Core Web Vitals |
| 8 | Sem `apple-touch-icon`, `theme-color`, manifest | Aparência em mobile/PWA |
| 9 | Placeholders reais no HTML: `wa.me/5521XXXXXXXXX` (4 arquivos) + telefone em texto `(21) XXXXX-XXXX` | Links quebrados, ruim p/ confiança/SEO local |
| 10 | Sem `aria-labelledby`/`aria-label` nas `<section>`; **4 seções sem `id`** e `<h2>` sem `id` | Acessibilidade (sinal indireto de qualidade) |
| 11 | `Portfolio` não é renderizado na home → `/portfolio/finapp` e `/portfolio/ancora` são **páginas órfãs** (sem link interno) | Sub-rotas quase não indexáveis |
| 12 | `app/sitemap.ts` precisa incluir **as duas** sub-rotas (`finapp` **e** `ancora`) | Descoberta das sub-rotas |

---

## Ações priorizadas

### Prioridade 1 — Fundamentos de indexação (rápido, alto impacto)

**1.1 Definir a URL de produção**
Criar `.env` (e configurar na hospedagem):
```
NEXT_PUBLIC_SITE_URL=https://vexsoftware.com.br
```
Isso conserta `metadataBase` (`app/layout.tsx:26`) automaticamente.

**1.2 Adicionar canonical + reforçar metadata** em `app/layout.tsx`:
```ts
export const metadata: Metadata = {
  // ...já existente...
  alternates: { canonical: "/" },
  applicationName: "Vex Software",
  authors: [{ name: "Vex Software" }],
  creator: "Vex Software",
  openGraph: {
    // ...já existente...
    url: "/",
    siteName: "Vex Software",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Vex Software — Desenvolvimento Web & Mobile" }],
  },
  twitter: {
    // ...já existente...
    images: ["/og.png"],
  },
};
```

**1.3 Criar `app/robots.ts`**
```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vexsoftware.com.br";
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
```

**1.4 Criar `app/sitemap.ts`**
```ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vexsoftware.com.br";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/portfolio/finapp`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
    { url: `${base}/portfolio/ancora`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
  ];
}
```
> Existem **duas** sub-rotas de portfólio (`app/portfolio/finapp/` e `app/portfolio/ancora/`), não só finapp. Como são páginas órfãs hoje (lacuna #11), incluí-las no sitemap é o mínimo para que sejam descobertas — mas o ideal é também dar um link interno a partir da home (ver 4.5).
>
> **Reuso de padrão:** `app/portfolio/ancora/page.tsx` **já implementa** `alternates.canonical`, `openGraph.url` e JSON-LD `BreadcrumbList`. Use esse arquivo como referência ao aplicar canonical/OG na home e em `finapp`, mantendo consistência.

### Prioridade 2 — Dados estruturados (JSON-LD)

Adicionar um `<script type="application/ld+json">` (via componente server que injeta o JSON) na home. Dois schemas de maior retorno:

**2.1 `Organization` / `ProfessionalService`** — usa o e-mail e WhatsApp já presentes. Incluir `logo`, `telephone`/`contactPoint` (campos que alimentam o knowledge panel do Google):
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Vex Software",
  "description": "Desenvolvimento web e mobile sob medida.",
  "url": "https://vexsoftware.com.br",
  "logo": "https://vexsoftware.com.br/og.png",
  "email": "contato@vexsoftware.com.br",
  "telephone": "+5521XXXXXXXXX",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "telephone": "+5521XXXXXXXXX",
    "email": "contato@vexsoftware.com.br",
    "areaServed": "BR",
    "availableLanguage": "pt-BR"
  },
  "areaServed": "BR",
  "sameAs": []
}
```
> `telephone` deve usar o número real (mesmo do WhatsApp, ver 4.1). Se a empresa **tiver endereço físico**, adicionar `address` (`PostalAddress`) habilita SEO local com `LocalBusiness`; sem endereço, manter `Organization`/`ProfessionalService` sem `address` (mais honesto e sem erro de dados incompletos).

**2.2 `FAQPage`** — o componente `FAQ` já tem 5 perguntas/respostas prontas (`components/FAQ.tsx`). Mapear o mesmo array para `mainEntity` (`Question` → `acceptedAnswer`). É o candidato mais forte a rich result nesta página.

**2.3 ⚠️ NÃO marcar `Review`/`AggregateRating` nos Testimonials.** O componente `Testimonials` existe e é tentador marcá-lo, mas o Google **proíbe** review markup "self-serving" (a própria empresa marcando avaliações sobre si mesma) — pode gerar ação manual/penalização. Deixar os depoimentos apenas como conteúdo visível, sem structured data.

> Implementação sugerida: um componente `components/JsonLd.tsx` (server) que recebe o objeto e renderiza `<script dangerouslySetInnerHTML>`; incluí-lo em `app/page.tsx`. Reaproveitar o mesmo array de FAQ para não duplicar conteúdo. Para `BreadcrumbList` nas sub-rotas, seguir o padrão já existente em `app/portfolio/ancora/page.tsx`.

### Prioridade 3 — Core Web Vitals (LCP)

**3.1 Não esconder o `<h1>` no carregamento.** Em `components/Hero.tsx:223-226`, o `<h1>` usa `initial={{ opacity: 0, y: 24 }}` + `transition={{ delay: 0.35 }}`. O maior elemento de texto (provável LCP) só aparece após o JS hidratar. Opções:
- Renderizar o `<h1>`/subtítulo **sem** animação de entrada (ou animar só `y` com `opacity:1`), ou
- Usar CSS animation com estado inicial visível para SSR.

**3.2 Avaliar o `ParticleCanvas` e o glow.** O canvas anima 60 partículas em `requestAnimationFrame` desde o load, competindo por main-thread no início. Considerar iniciar após `requestIdleCallback`/interseção, e respeitar `prefers-reduced-motion`.

**3.3 Custo de hidratação do framer-motion (JS na home inteira).** Praticamente **toda seção** é client component por causa de `whileInView`/`motion` (Services, Process, TechStack, About, Testimonials, FAQ, Contact…). Isso infla o TBT/JS bem além do canvas. Sem refatorar o design:
- Aplicar `prefers-reduced-motion` de forma **global** (não só no `ParticleCanvas`) — corta animação para quem pede menos movimento e reduz trabalho de main-thread.
- (Maior esforço, fora do escopo imediato) avaliar substituir animações de entrada simples por CSS puro em seções que não precisam de estado interativo, permitindo que voltem a ser server components.

**3.4 Imagem OG** (`public/og.png`, 1200×630) — criar o asset (itens 1.2 e o `logo` do 2.1 dependem dele).

### Prioridade 4 — Higiene e ativos

- **4.1** Substituir placeholders reais de WhatsApp `wa.me/5521XXXXXXXXX` — em **4 arquivos**: `Hero.tsx:252`, `Contact.tsx:52`, `Footer.tsx:66` e **`WhatsAppButton.tsx:26`** (botão flutuante, faltava no diagnóstico original). Substituir também o **telefone em texto** `(21) XXXXX-XXXX` em `Footer.tsx:71`. Links/números quebrados prejudicam UX e sinais de qualidade.
- **4.2** Adicionar `app/apple-icon.png` (180×180) e `theme-color` (via `export const viewport = { themeColor: "#0A0A0F" }` em `layout.tsx`).
- **4.3** Adicionar `aria-labelledby` nas `<section>` (associar ao `id` do `<h2>` de cada seção). **Pré-requisito:** 4 seções não têm `id` e nenhum `<h2>` tem `id` hoje — só `Hero` (`#inicio`), `Services` (`#servicos`), `About` (`#sobre`) e `Contact` (`#contato`) têm id na `<section>`. É preciso primeiro dar `id` a cada `<h2>` (FAQ, TechStack, Testimonials, Process) para então referenciá-lo.
- **4.4** Opcional: `app/manifest.ts` para PWA básico (nome, cores, ícones).
- **4.5** **Resolver as páginas órfãs de portfólio (lacuna #11).** `/portfolio/finapp` e `/portfolio/ancora` não recebem link interno porque `Portfolio` não é renderizado em `app/page.tsx`. Opções: (a) renderizar `<Portfolio />` na home (recupera links + seção `#portfolio` que o design previa); (b) ao menos linkar os cases a partir de outra seção. Incluí-las só no sitemap (item 1.4) ajuda na descoberta, mas link interno é o que dá contexto e "juice" de indexação.

---

## Checklist de execução

- [ ] 1.1 `NEXT_PUBLIC_SITE_URL` em produção *(configurar na hospedagem; fallback já é `https://vexsoftware.com.br`)*
- [x] 1.2 `canonical` + `siteName`/`url` + `og:image` em `layout.tsx`
- [x] 1.3 `app/robots.ts`
- [x] 1.4 `app/sitemap.ts` (só a home; portfólio descopado — ver 4.5)
- [x] 2.1 JSON-LD `Organization`/`ProfessionalService` (com `logo`, `contactPoint`; `telephone` entra quando houver número real)
- [x] 2.2 JSON-LD `FAQPage` (array compartilhado em `lib/faqs.ts`)
- [x] 2.3 ⚠️ Testimonials **sem** `Review`/`AggregateRating` (mantido só como conteúdo)
- [x] 3.1 `<h1>` visível no SSR (LCP)
- [x] 3.2 Otimizar `ParticleCanvas` (idle + reduced-motion)
- [x] 3.3 `prefers-reduced-motion` global (CSS + `<MotionConfig reducedMotion="user">`)
- [x] 3.4 OG image 1200×630 via `app/opengraph-image.tsx` (gerada por código, sem binário)
- [x] 4.1 Número de WhatsApp/telefone reais — `lib/site.ts` atualizado com `+5512997096351` (WhatsApp, Footer e JSON-LD já refletem)
- [x] 4.2 `apple-icon` (`app/apple-icon.tsx`) + `theme-color` (viewport)
- [x] 4.3 `id` nos `<h2>` + `aria-labelledby` nas 9 seções
- [x] 4.4 `app/manifest.ts`
- [~] 4.5 Portfólio **descopado por ora** — `<Portfolio />` removido da home e rotas fora do sitemap. Reativar (renderizar na home ou noindex nas páginas) quando o portfólio voltar ao ar.

## Como validar

- `npm run build` e inspecionar `/robots.txt`, `/sitemap.xml` (confirmar as 3 URLs: home + `finapp` + `ancora`), `/` (view-source: metatags + JSON-LD).
- **Rich Results Test** (Google) para o `FAQPage` e o `Organization`.
- **Lighthouse** (aba SEO + Performance) antes/depois — foco em LCP.
- Compartilhar a URL no WhatsApp/LinkedIn e conferir o preview (og:image).
- **Google Search Console:** verificar a propriedade (via `verification: { google: "..." }` no metadata ou registro DNS) e submeter o sitemap — fecha o loop de medição/indexação.
- Confirmar que as sub-rotas de portfólio deixaram de ser órfãs: rastrear a home e checar que há link interno para `finapp`/`ancora` (ou que estão no sitemap).
