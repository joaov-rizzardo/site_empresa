import { ImageResponse } from "next/og";

export const alt = "Vex Software — Desenvolvimento Web & Mobile Sob Medida";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0F",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* barra de gradiente superior */}
        <div
          style={{
            display: "flex",
            width: "160px",
            height: "10px",
            borderRadius: "9999px",
            background: "linear-gradient(90deg, #6C63FF 0%, #00D4AA 100%)",
          }}
        />

        {/* wordmark */}
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <div
            style={{
              fontSize: "132px",
              fontWeight: 800,
              letterSpacing: "-4px",
              color: "transparent",
              backgroundImage: "linear-gradient(135deg, #6C63FF 0%, #00D4AA 100%)",
              backgroundClip: "text",
              // @ts-expect-error -- propriedade suportada pelo Satori
              "-webkit-background-clip": "text",
            }}
          >
            Vex
          </div>
          <div
            style={{
              marginLeft: "24px",
              fontSize: "34px",
              letterSpacing: "12px",
              textTransform: "uppercase",
              color: "#8888A0",
            }}
          >
            software
          </div>
        </div>

        {/* tagline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "52px", fontWeight: 700, color: "#F0F0F8", lineHeight: 1.15 }}>
            Desenvolvimento Web &amp; Mobile Sob Medida
          </div>
          <div style={{ fontSize: "30px", color: "#C4C4D4", marginTop: "16px" }}>
            Transformamos sua ideia em um sistema que funciona.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
