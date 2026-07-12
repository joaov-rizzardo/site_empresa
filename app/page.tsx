import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import TechStack from "@/components/TechStack";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/lib/site";
import { faqs } from "@/lib/faqs";

// Só emitimos telefone quando for um número real (não o placeholder com "X").
const hasRealPhone = !siteConfig.phoneE164.includes("X");

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.name,
  description:
    "Desenvolvimento web e mobile sob medida para empresas, startups e empreendedores.",
  url: siteConfig.url,
  logo: `${siteConfig.url}/icon.svg`,
  image: `${siteConfig.url}/opengraph-image`,
  email: siteConfig.email,
  ...(hasRealPhone && { telephone: siteConfig.phoneE164 }),
  areaServed: siteConfig.country,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: siteConfig.email,
    ...(hasRealPhone && { telephone: siteConfig.phoneE164 }),
    areaServed: siteConfig.country,
    availableLanguage: "pt-BR",
  },
  sameAs: [],
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function Home() {
  return (
    <>
      <JsonLd data={organizationLd} />
      <JsonLd data={faqLd} />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <TechStack />
        <About />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
