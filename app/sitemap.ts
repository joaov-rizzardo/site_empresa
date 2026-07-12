import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();
  return [
    { url: base, lastModified: now, changeFrequency: "monthly", priority: 1 },
    // As rotas de portfólio (/portfolio/finapp e /portfolio/ancora) estão fora
    // do sitemap por enquanto — a seção Portfolio não é exibida na home.
  ];
}
