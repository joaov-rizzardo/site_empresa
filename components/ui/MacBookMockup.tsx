import Image from "next/image";

interface MacBookMockupProps {
  src?: string;
  alt: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

/* Max width of the whole device (deck) per size — the component is fluid
   below this and never overflows its container. */
const sizeMap = { sm: 360, md: 500, lg: 640, xl: 800 } as const;

/* The lid is narrower than the deck; deck fans out ~14% wider */
const LID_PCT = 1 / 1.14; // ≈ 87.7% of the wrapper width

export default function MacBookMockup({
  src,
  alt,
  className = "",
  size = "md",
}: MacBookMockupProps) {
  return (
    <div
      className={`relative flex-shrink-0 w-full ${className}`}
      style={{ maxWidth: sizeMap[size] }}
    >
      {/* ── Ambient ground shadow ── */}
      <div
        aria-hidden="true"
        className="absolute -bottom-5 left-[6%] right-[6%] h-8 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.7) 0%, transparent 72%)",
          filter: "blur(16px)",
        }}
      />

      {/* ── Lid / screen assembly ── */}
      <div
        className="relative mx-auto"
        style={{
          width: `${LID_PCT * 100}%`,
          borderRadius: 16,
          padding: "3.4% 2.1% 2.1%", // extra top room for the camera
          background:
            "linear-gradient(150deg, #33333f 0%, #23232f 24%, #14141f 52%, #1c1c28 80%, #2b2b38 100%)",
          boxShadow: [
            "0 0 0 1px rgba(255,255,255,0.04)",
            "0 34px 80px rgba(0,0,0,0.9)",
            "0 14px 34px rgba(0,0,0,0.6)",
            "inset 0 1px 0 rgba(255,255,255,0.08)",
            "inset 0 -1px 0 rgba(0,0,0,0.6)",
          ].join(", "),
        }}
      >
        {/* Camera */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-1/2 rounded-full"
          style={{
            top: "1.7%",
            width: 5,
            height: 5,
            background: "radial-gradient(circle at 40% 35%, #3a3a52, #07070d 70%)",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.5)",
          }}
        />

        {/* Screen */}
        <div
          className="relative overflow-hidden"
          style={{
            aspectRatio: "16 / 10",
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
                "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, transparent 12%, transparent 88%, rgba(0,0,0,0.22) 100%)",
                "linear-gradient(to right, rgba(0,0,0,0.12) 0%, transparent 10%, transparent 90%, rgba(0,0,0,0.12) 100%)",
              ].join(", "),
            }}
          />
        </div>

        {/* Lid glass sheen */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: 16,
            background:
              "linear-gradient(125deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 20%, transparent 44%)",
          }}
        />
      </div>

      {/* ── Hinge ── */}
      <div
        aria-hidden="true"
        className="mx-auto"
        style={{
          width: `${LID_PCT * 98.5}%`,
          height: 3,
          background: "linear-gradient(to bottom, #05050a, #16161f)",
          boxShadow: "inset 0 1px 1px rgba(0,0,0,0.8)",
        }}
      />

      {/* ── Deck / base ── */}
      <div
        className="relative mx-auto w-full"
        style={{
          height: 14,
          borderRadius: "4px 4px 8px 8px",
          background: "linear-gradient(to bottom, #2a2a36 0%, #1c1c26 40%, #10101a 100%)",
          boxShadow: "0 10px 20px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.10)",
        }}
      >
        {/* Front lip notch (thumb scoop) */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -translate-x-1/2"
          style={{
            width: "14%",
            height: 6,
            borderRadius: "0 0 6px 6px",
            background: "linear-gradient(to bottom, #0c0c14, #17171f)",
            boxShadow: "inset 0 -1px 2px rgba(0,0,0,0.6)",
          }}
        />
      </div>
    </div>
  );
}
