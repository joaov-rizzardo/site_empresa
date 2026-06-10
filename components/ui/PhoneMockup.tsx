import Image from "next/image";

interface PhoneMockupProps {
  src?: string;
  alt: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = { sm: 220, md: 300, lg: 380, xl: 460 } as const;
const ASPECT = 390 / 844;

const FRAME_RADIUS = 44;
const BORDER_W = 6;
const SCREEN_RADIUS = FRAME_RADIUS - BORDER_W;

/* Gradient for the metallic frame border — lighter at top-left (light source),
   deepest in the middle, slightly lighter at bottom-right (reflected light) */
const FRAME_GRADIENT =
  "linear-gradient(145deg, #2c2c40 0%, #1e1e2e 22%, #0d0d1a 50%, #171726 78%, #24243a 100%)";

export default function PhoneMockup({ src, alt, className = "", size = "md" }: PhoneMockupProps) {
  const h = sizeMap[size];
  const w = Math.round(h * ASPECT);

  const volumeButtons = [
    { top: "21%", height: Math.round(h * 0.062) },
    { top: "31%", height: Math.round(h * 0.105) },
    { top: "45%", height: Math.round(h * 0.105) },
  ];

  return (
    <div
      className={`relative flex-shrink-0 ${className}`}
      style={{ width: w, height: h }}
    >
      {/* ── Ambient ground shadow ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: -18,
          left: "12%",
          right: "12%",
          height: 30,
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.65) 0%, transparent 72%)",
          filter: "blur(12px)",
          pointerEvents: "none",
        }}
      />

      {/* ── Volume buttons (left) — thin slabs flush with the frame ── */}
      {volumeButtons.map((btn, i) => (
        <div
          key={i}
          aria-hidden="true"
          style={{
            position: "absolute",
            left: -3,
            top: btn.top,
            width: 3,
            height: btn.height,
            borderRadius: "2px 0 0 2px",
            background: "linear-gradient(to right, #181826, #222236)",
            boxShadow: "-1px 0 4px rgba(0,0,0,0.55)",
          }}
        />
      ))}

      {/* ── Power button (right) ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: -3,
          top: "33%",
          width: 3,
          height: Math.round(h * 0.15),
          borderRadius: "0 2px 2px 0",
          background: "linear-gradient(to left, #181826, #222236)",
          boxShadow: "1px 0 4px rgba(0,0,0,0.55)",
        }}
      />

      {/* ── Frame — gradient metallic border via padding technique ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: FRAME_RADIUS,
          padding: BORDER_W,
          background: FRAME_GRADIENT,
          boxShadow: [
            /* outer rim */
            "0 0 0 1px rgba(255,255,255,0.05)",
            /* depth layers */
            "0 36px 90px rgba(0,0,0,0.95)",
            "0 16px 40px rgba(0,0,0,0.65)",
            "0 6px 12px rgba(0,0,0,0.45)",
            /* top edge specular */
            "inset 0 1px 0 rgba(255,255,255,0.09)",
            /* bottom inner darkening */
            "inset 0 -1px 0 rgba(0,0,0,0.6)",
          ].join(", "),
        }}
      >
        {/* ── Screen container ── */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: SCREEN_RADIUS,
            overflow: "hidden",
            position: "relative",
            backgroundColor: "#07070e",
            /* deep inner shadow on the screen recessed area */
            boxShadow:
              "inset 0 0 40px rgba(0,0,0,0.8), inset 0 3px 8px rgba(0,0,0,0.6)",
          }}
        >

          {/* ── App screenshot ── */}
          {src ? (
            <div style={{ position: "absolute", inset: 0 }}>
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                sizes={`${w}px`}
              />
            </div>
          ) : (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "linear-gradient(160deg, #0e0e1c 0%, #07070e 50%, #0b0b18 100%)",
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  color: "#34344a",
                  textAlign: "center",
                  padding: "0 16px",
                  lineHeight: 1.6,
                  fontFamily: "monospace",
                }}
              >
                {alt}
              </span>
            </div>
          )}

          {/* ── Screen vignette & depth overlays ── */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: [
                /* primary brand glow at top — ties phone to design system */
                "radial-gradient(ellipse at 50% -10%, rgba(108,99,255,0.08) 0%, transparent 60%)",
                /* top/bottom edge darkening — simulates curved glass */
                "linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, transparent 14%, transparent 86%, rgba(0,0,0,0.28) 100%)",
                /* left/right edge darkening */
                "linear-gradient(to right, rgba(0,0,0,0.14) 0%, transparent 12%, transparent 88%, rgba(0,0,0,0.14) 100%)",
              ].join(", "),
              pointerEvents: "none",
              zIndex: 10,
            }}
          />
        </div>

        {/* ── Frame glass sheen — diagonal specular highlight ── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: FRAME_RADIUS,
            background:
              "linear-gradient(130deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.025) 18%, transparent 42%)",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}
