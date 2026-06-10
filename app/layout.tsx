import type { Metadata } from "next";
import { Syne, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "DevStudio — Desenvolvimento Web & Mobile Sob Medida",
  description:
    "Transformamos suas ideias em sistemas que funcionam. Desenvolvimento web e mobile para empresas que querem crescer com tecnologia.",
  keywords: [
    "desenvolvimento web",
    "desenvolvimento mobile",
    "React",
    "Next.js",
    "Node.js",
    "aplicativo",
    "sistema",
    "software sob medida",
  ],
  openGraph: {
    title: "DevStudio — Desenvolvimento Web & Mobile Sob Medida",
    description:
      "Transformamos suas ideias em sistemas que funcionam. Desenvolvimento web e mobile para empresas que querem crescer com tecnologia.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevStudio — Desenvolvimento Web & Mobile Sob Medida",
    description: "Desenvolvimento web e mobile para empresas que querem crescer com tecnologia.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${syne.variable} ${dmSans.variable} ${dmMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-base text-ink antialiased">{children}</body>
    </html>
  );
}
