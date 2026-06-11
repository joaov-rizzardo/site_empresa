# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build
npm run lint     # ESLint
npx tsc --noEmit # type-check without emitting
```

There are no tests in this project.

## Architecture

**Next.js 16 App Router** — `app/` holds routes, `components/` holds all UI.

- `app/page.tsx` — home page: stacks every section component in order (Navbar → Hero → Services → Process → Portfolio → TechStack → About → Testimonials → FAQ → Contact → Footer)
- `app/portfolio/finapp/` — only sub-route; has a server page (`page.tsx`) that renders `FinAppContent.tsx` (client) with the full case study

All section components are client components only when they need interactivity (e.g. `"use client"` for Navbar, Portfolio, FAQ). Server components are the default for pages.

## Design System

**Tailwind v4** via `@import "tailwindcss"` — no `tailwind.config`. All tokens live in `app/globals.css` under `@theme`:

| Token | Value |
|---|---|
| `base` | `#0A0A0F` |
| `surface` / `surface2` | `#111118` / `#16161F` |
| `primary` | `#6C63FF` (purple) |
| `secondary` | `#00D4AA` (teal) |
| `ink` / `ink2` / `dim` | `#F0F0F8` / `#C4C4D4` / `#8888A0` |
| `font-display` | Syne |
| `font-mono` | DM Mono |

Global CSS utility classes: `.gradient-text`, `.dot-grid`, `.glass`, `.glow-primary`, `.glow-secondary`, `.card-hover`, `.terminal-scan`, `.animate-float`, `.animate-marquee`, `.animate-pulse-glow`.

## Navigation Pattern

`Navbar` uses `usePathname` + `useRouter` from `next/navigation`. When the user is on `/`, nav links smooth-scroll to anchor IDs (`#inicio`, `#servicos`, etc.). When on any other page (e.g. `/portfolio/finapp`), clicking a nav link calls `router.push("/" + href)` to navigate back to the home page at the correct anchor.

## Key Components

- `components/ui/PhoneMockup.tsx` — reusable phone frame component. Accepts `size: "sm" | "md" | "lg" | "xl"` (heights 220–460px) and an optional `src` for a screenshot. Used in `FinAppContent` and inline in `Portfolio` (featured card uses a simpler inline frame, not this component).
- `components/Portfolio.tsx` — featured FinApp card (full-width, real screenshot, prominent CTA) + 3 compact project cards. Modal for non-case projects is defined inline.

## Assets

FinApp screenshots live at `public/images/finapp/`: `relatorios.jpeg`, `lancamentos.jpeg`, `cartao.jpeg`.

The `@/*` path alias maps to the repo root.
