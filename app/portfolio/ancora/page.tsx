import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AncoraContent from "./AncoraContent";

const title = "Espaço Âncora — Landing Page de Psicologia Clínica | Vex Software";
const description =
  "Case de desenvolvimento da landing page do Espaço Âncora: página única em Next.js 14, focada em converter visitantes em pacientes com acessibilidade, performance e formulário validado.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "landing page psicólogo",
    "site para psicólogo",
    "desenvolvimento landing page",
    "Next.js 14",
    "React",
    "Tailwind CSS",
    "acessibilidade web",
    "conversão WhatsApp",
    "case de portfólio",
  ],
  alternates: { canonical: "/portfolio/ancora" },
  openGraph: {
    title,
    description,
    type: "article",
    locale: "pt_BR",
    url: "/portfolio/ancora",
    images: [
      {
        url: "/images/ancora/hero-desktop.png",
        width: 1907,
        height: 920,
        alt: "Landing page do Espaço Âncora exibida em desktop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/ancora/hero-desktop.png"],
  },
  robots: { index: true, follow: true },
};

/* JSON-LD — helps search engines understand this as a project/case study */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "Espaço Âncora — Landing Page de Psicologia Clínica",
  description,
  inLanguage: "pt-BR",
  genre: "Web Design & Development",
  keywords:
    "landing page, psicologia, Next.js, React, Tailwind CSS, acessibilidade",
  creator: { "@type": "Organization", name: "Vex Software" },
  about: {
    "@type": "Service",
    serviceType: "Desenvolvimento de landing page",
    provider: { "@type": "Organization", name: "Vex Software" },
  },
  keywordsList: [
    "Next.js 14",
    "React 18",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
  ],
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: "/" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Espaço Âncora",
      item: "/portfolio/ancora",
    },
  ],
};

export default function AncoraPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Navbar />
      <main>
        <AncoraContent />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
