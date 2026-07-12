import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans, DM_Mono } from "next/font/google";
import { siteConfig } from "@/lib/site";
import MotionProvider from "@/components/MotionProvider";
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

const title = "Vex Software — Desenvolvimento Web & Mobile Sob Medida";
const description =
  "Transformamos suas ideias em sistemas que funcionam. Desenvolvimento web e mobile para empresas que querem crescer com tecnologia.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title,
  description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: { canonical: "/" },
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
    title,
    description,
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: siteConfig.name,
    // og:image é injetado automaticamente por app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "Desenvolvimento web e mobile para empresas que querem crescer com tecnologia.",
    // twitter:image cai para o og:image gerado por app/opengraph-image.tsx
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0F",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${syne.variable} ${dmSans.variable} ${dmMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-base text-ink antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
