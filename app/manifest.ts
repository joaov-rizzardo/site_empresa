import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — Desenvolvimento Web & Mobile`,
    short_name: siteConfig.name,
    description:
      "Desenvolvimento web e mobile sob medida para empresas que querem crescer com tecnologia.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0A0F",
    theme_color: "#0A0A0F",
    lang: "pt-BR",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon", type: "image/png", sizes: "180x180" },
    ],
  };
}
