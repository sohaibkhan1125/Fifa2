"use client";

import PlayerAvatar from "@/components/ui/PlayerAvatar";

/**
 * Hidden, branded share card rendered off-screen.
 * Captured by html2canvas to produce a viral-friendly PNG.
 */
export default function ShareableCard({ winner, top5, bonus }) {
  return (
    <div
      id="shareable-card"
      style={{
        position: "absolute",
        left: "-99999px",
        top: 0,
        width: "1080px",
        height: "1080px",
      }}
      aria-hidden="true"
    >
      <div
        style={{
          width: "1080px",
          height: "1080px",
          background: "linear-gradient(135deg, #faf8ff 0%, #f5f3ff 50%, #ede9fe 100%)",
          padding: "60px",
          fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative blobs */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-100px",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(192,38,211,0.15) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "40px",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 800,
                fontSize: "24px",
              }}
            >
              P
            </div>
            <div>
              <div style={{ fontSize: "22px", fontWeight: 800, color: "#0f0f14" }}>
                Prime<span style={{ color: "#7c3aed" }}>Tools</span>
              </div>
              <div style={{ fontSize: "13px", color: "#6b6b76", fontWeight: 500 }}>
                FIFA World Cup 2026
              </div>
            </div>
          </div>

          <div
            style={{
              background: "#7c3aed",
              color: "white",
              padding: "8px 16px",
              borderRadius: "999px",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            🏆 GOLDEN BOOT PREDICTION
          </div>
        </div>

        {/* Winner showcase */}
        <div
          style={{
            background: "white",
            borderRadius: "32px",
            padding: "48px",
            marginBottom: "32px",
            boxShadow: "0 20px 60px rgba(124, 58, 237, 0.15)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ fontSize: "14px", fontWeight: 700, color: "#7c3aed", letterSpacing: "0.1em", marginBottom: "16px" }}>
            ⭐ MY PREDICTED WINNER
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            {/* Big avatar */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div
                style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "50%",
                  background: getGradientStyle(winner?.avatarColor),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "56px",
                  fontWeight: 800,
                  color: "white",
                  border: "8px solid #fef3c7",
                  boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
                }}
              >
                {winner?.initials}
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "-6px",
                  right: "-6px",
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #fbbf24, #d97706)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  fontWeight: 800,
                  color: "white",
                  border: "4px solid white",
                }}
              >
                #1
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "48px", fontWeight: 800, lineHeight: 1.1, color: "#0f0f14", marginBottom: "8px" }}>
                {winner?.name}
              </div>
              <div style={{ fontSize: "20px", color: "#6b6b76", marginBottom: "20px" }}>
                {winner?.flag} {winner?.country}
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                <span
                  style={{
                    fontSize: "72px",
                    fontWeight: 800,
                    background: "linear-gradient(135deg, #7c3aed, #c026d3)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    lineHeight: 1,
                  }}
                >
                  {winner?.predictedGoals}
                </span>
                <span style={{ fontSize: "16px", fontWeight: 700, color: "#6b6b76", letterSpacing: "0.08em" }}>
                  PREDICTED GOALS
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Top 5 list */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "#0f0f14", marginBottom: "16px", letterSpacing: "0.05em" }}>
            🥇 TOP 5 SCORERS
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {top5?.slice(0, 5).map((p, idx) => (
              <div
                key={p.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "white",
                  borderRadius: "16px",
                  padding: "16px 20px",
                  gap: "16px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: idx === 0 ? "linear-gradient(135deg,#fbbf24,#d97706)" : "#f3f4f6",
                    color: idx === 0 ? "white" : "#6b6b76",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    fontWeight: 800,
                  }}
                >
                  {idx + 1}
                </div>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: getGradientStyle(p.avatarColor),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    fontWeight: 800,
                    color: "white",
                  }}
                >
                  {p.initials}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "18px", fontWeight: 700, color: "#0f0f14" }}>{p.name}</div>
                  <div style={{ fontSize: "13px", color: "#6b6b76" }}>{p.flag} {p.country}</div>
                </div>
                <div style={{ fontSize: "28px", fontWeight: 800, color: "#7c3aed" }}>
                  {p.predictedGoals}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bonus predictions strip */}
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "20px 24px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px 32px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
            marginBottom: "20px",
          }}
        >
          <BonusItem icon="🏆" label="World Cup Winner" value={bonus?.worldCupWinner?.name} />
          <BonusItem icon="🐎" label="Dark Horse" value={bonus?.darkHorse?.name} />
          <BonusItem icon="⚡" label="Biggest Upset" value={bonus?.biggestUpset?.label} />
          <BonusItem icon="⭐" label="Best Young Player" value={bonus?.bestYoungPlayer?.name} />
        </div>

        {/* Footer CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#6b6b76",
            fontSize: "14px",
            fontWeight: 600,
          }}
        >
          <span>Make your prediction at <span style={{ color: "#7c3aed", fontWeight: 800 }}>primetools.com</span></span>
          <span>#GoldenBoot2026</span>
        </div>
      </div>
    </div>
  );
}

function BonusItem({ icon, label, value }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <span style={{ fontSize: "20px" }}>{icon}</span>
      <div>
        <div style={{ fontSize: "11px", color: "#6b6b76", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {label}
        </div>
        <div style={{ fontSize: "15px", color: "#0f0f14", fontWeight: 700 }}>
          {value || "—"}
        </div>
      </div>
    </div>
  );
}

function getGradientStyle(colorClass) {
  const map = {
    "avatar-gradient-1": "linear-gradient(135deg, #fb923c, #f59e0b)",
    "avatar-gradient-2": "linear-gradient(135deg, #60a5fa, #3b82f6)",
    "avatar-gradient-3": "linear-gradient(135deg, #34d399, #10b981)",
    "avatar-gradient-4": "linear-gradient(135deg, #f87171, #ef4444)",
    "avatar-gradient-5": "linear-gradient(135deg, #a78bfa, #8b5cf6)",
    "avatar-gradient-6": "linear-gradient(135deg, #fbbf24, #f59e0b)",
    "avatar-gradient-7": "linear-gradient(135deg, #f472b6, #ec4899)",
    "avatar-gradient-8": "linear-gradient(135deg, #2dd4bf, #14b8a6)",
  };
  return map[colorClass] || map["avatar-gradient-5"];
}
