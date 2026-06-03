import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "PrimeTools — FIFA World Cup 2026 Sports Predictors";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #faf8ff 0%, #ede9fe 50%, #ddd6fe 100%)",
          display: "flex",
          flexDirection: "column",
          padding: "70px",
          position: "relative",
          fontFamily: "system-ui",
        }}
      >
        {/* Decorative blobs */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)",
            borderRadius: "50%",
            display: "flex",
          }}
        />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "50px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "36px",
              fontWeight: 800,
            }}
          >
            P
          </div>
          <div style={{ display: "flex", fontSize: "32px", fontWeight: 800, color: "#0f0f14" }}>
            Prime<span style={{ color: "#7c3aed", display: "flex" }}>Tools</span>
          </div>
        </div>

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            background: "#7c3aed",
            color: "white",
            padding: "10px 24px",
            borderRadius: "999px",
            fontSize: "20px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            marginBottom: "24px",
          }}
        >
          🏆 FIFA WORLD CUP 2026
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "100px",
            fontWeight: 800,
            lineHeight: 1.05,
            color: "#0f0f14",
            marginBottom: "20px",
            letterSpacing: "-0.03em",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span style={{ display: "flex" }}>Golden Boot</span>
          <span
            style={{
              display: "flex",
              background: "linear-gradient(135deg, #7c3aed 0%, #c026d3 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Predictor
          </span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "30px",
            color: "#4b4b56",
            fontWeight: 500,
            marginBottom: "40px",
            display: "flex",
          }}
        >
          Predict the top scorers and crown the Golden Boot winner!
        </div>

        {/* Feature pills */}
        <div style={{ display: "flex", gap: "12px", marginTop: "auto" }}>
          <Pill text="⚽ Predict Goals" />
          <Pill text="📈 Auto Ranking" />
          <Pill text="🔗 Share Results" />
        </div>
      </div>
    ),
    { ...size }
  );
}

function Pill({ text }) {
  return (
    <div
      style={{
        display: "flex",
        background: "rgba(255,255,255,0.9)",
        border: "2px solid #ddd6fe",
        padding: "12px 24px",
        borderRadius: "999px",
        fontSize: "22px",
        fontWeight: 700,
        color: "#0f0f14",
      }}
    >
      {text}
    </div>
  );
}
