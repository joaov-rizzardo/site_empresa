import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple touch icon — reproduz o "V" da marca (roxo + teal) sobre fundo escuro.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0A0F",
        }}
      >
        <svg width="180" height="180" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <polygon points="12,14 23,14 37,50 26,50" fill="#6C63FF" />
          <polygon points="52,14 41,14 27,50 38,50" fill="#00D4AA" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
