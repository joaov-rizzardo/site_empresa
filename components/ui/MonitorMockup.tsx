import Image from "next/image";

interface MonitorMockupProps {
  src?: string;
  alt: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

/* Max width of the display per size — fluid below this, never overflows. */
const sizeMap = { sm: 360, md: 500, lg: 640, xl: 800 } as const;

export default function MonitorMockup({
  src,
  alt,
  className = "",
  size = "md",
}: MonitorMockupProps) {
  return (
    <div
      className={`relative flex-shrink-0 w-full ${className}`}
      style={{ maxWidth: sizeMap[size] }}
    >
      {/* ── Ambient ground shadow ── */}
      <div
        aria-hidden="true"
        className="absolute -bottom-3 left-[14%] right-[14%] h-7 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.65) 0%, transparent 72%)",
          filter: "blur(14px)",
        }}
      />

      {/* ── Frame / panel ── */}
      <div
        className="relative"
        style={{
          borderRadius: 14,
          padding: "1.9% 1.9% 4%", // wider chin at the bottom
          background:
            "linear-gradient(150deg, #2c2c3a 0%, #1d1d29 26%, #101019 54%, #191924 80%, #26263400 100%)",
          boxShadow: [
            "0 0 0 1px rgba(255,255,255,0.04)",
            "0 30px 70px rgba(0,0,0,0.85)",
            "0 12px 28px rgba(0,0,0,0.55)",
            "inset 0 1px 0 rgba(255,255,255,0.07)",
            "inset 0 -1px 0 rgba(0,0,0,0.55)",
          ].join(", "),
        }}
      >
        {/* Screen */}
        <div
          className="relative overflow-hidden"
          style={{
            aspectRatio: "16 / 9",
            borderRadius: 4,
            backgroundColor: "#07070e",
            boxShadow:
              "inset 0 0 30px rgba(0,0,0,0.7), inset 0 2px 6px rgba(0,0,0,0.6)",
          }}
        >
          {src ? (
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover object-top"
              sizes={`${sizeMap[size]}px`}
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-[#34344a]"
              style={{
                background:
                  "linear-gradient(160deg, #0e0e1c 0%, #07070e 50%, #0b0b18 100%)",
              }}
            >
              {alt}
            </div>
          )}

          {/* Screen vignette + sage brand glow */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: [
                "radial-gradient(ellipse at 50% -12%, rgba(143,169,141,0.10) 0%, transparent 60%)",
                "linear-gradient(to bottom, rgba(0,0,0,0.16) 0%, transparent 12%, transparent 88%, rgba(0,0,0,0.2) 100%)",
                "linear-gradient(to right, rgba(0,0,0,0.10) 0%, transparent 9%, transparent 91%, rgba(0,0,0,0.10) 100%)",
              ].join(", "),
            }}
          />
        </div>

        {/* Chin logo dot */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-1/2 rounded-full"
          style={{
            bottom: "1.4%",
            width: 6,
            height: 6,
            background: "radial-gradient(circle at 40% 35%, #4a4a62, #101019 75%)",
          }}
        />

        {/* Panel sheen */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: 14,
            background:
              "linear-gradient(125deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 20%, transparent 44%)",
          }}
        />
      </div>

      {/* ── Stand neck ── */}
      <div
        aria-hidden="true"
        className="mx-auto"
        style={{
          width: "14%",
          height: 32,
          background: "linear-gradient(to bottom, #2a2a36 0%, #1a1a24 100%)",
          clipPath: "polygon(24% 0, 76% 0, 100% 100%, 0 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      />

      {/* ── Stand foot ── */}
      <div
        aria-hidden="true"
        className="mx-auto"
        style={{
          width: "42%",
          height: 8,
          borderRadius: 8,
          background: "linear-gradient(to bottom, #303040 0%, #1a1a24 60%, #111119 100%)",
          boxShadow: "0 8px 16px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      />
    </div>
  );
}
