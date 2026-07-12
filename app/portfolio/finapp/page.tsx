import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import FinAppContent from "./FinAppContent";

export const metadata: Metadata = {
  title: "FinApp — Controle Financeiro Mobile | Vex Software",
  description:
    "Case de desenvolvimento do FinApp, aplicativo mobile de controle financeiro pessoal com dashboard analítico, metas e categorização de gastos.",
  // Portfólio fora do ar por ora — não indexar.
  robots: { index: false, follow: false },
};

export default function FinAppPage() {
  return (
    <>
      <Navbar />
      <main>
        <FinAppContent />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
