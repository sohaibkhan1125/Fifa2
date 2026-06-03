export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] shadow-soft"
      style={{
        background: "linear-gradient(135deg, #fff8e7 0%, #fef3c7 50%, #fde68a 100%)",
      }}
    >
      <div className="dark:hidden absolute inset-0 confetti-bg opacity-40 pointer-events-none" />

      <div className="relative grid md:grid-cols-[1.1fr_1fr] gap-6 md:gap-8 px-6 md:px-12 py-8 md:py-12">
        {/* Left: Text content */}
        <div className="flex flex-col items-start gap-3 animate-slide-up z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/95 dark:bg-[var(--color-surface)] border border-amber-200 dark:border-amber-700/40 text-xs font-bold tracking-wider shadow-soft text-amber-700 dark:text-amber-400">
            <TrophyIcon className="w-3.5 h-3.5" />
            FIFA WORLD CUP 2026
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-slate-900 dark:text-white">
            Golden Boot
            <br />
            <span style={{
              background: "linear-gradient(135deg, #d97706 0%, #f59e0b 50%, #fbbf24 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Predictor</span>
          </h1>

          <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 font-medium max-w-md">
            Predict the top scorers and crown the Golden Boot winner!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3 w-full md:w-auto">
            <FeaturePill
              icon={<GoalIcon className="w-4 h-4" />}
              title="Predict Goals"
              subtitle="Set your predicted goal count"
            />
            <FeaturePill
              icon={<RankingIcon className="w-4 h-4" />}
              title="Auto Ranking"
              subtitle="See live ranking update instantly"
            />
            <FeaturePill
              icon={<ShareIcon className="w-4 h-4" />}
              title="Share Results"
              subtitle="Share your prediction with the world"
            />
          </div>
        </div>

        {/* Right: Golden Boot trophy illustration */}
        <div className="relative flex items-center justify-center">
          <GoldenBootIcon className="w-full max-w-[420px] drop-shadow-2xl" />
        </div>
      </div>
    </section>
  );
}

function FeaturePill({ icon, title, subtitle }) {
  return (
    <div className="flex items-start gap-2.5 px-3 py-2 rounded-xl bg-white/80 dark:bg-white/5 border border-amber-200/60 dark:border-amber-700/30 text-slate-900 dark:text-white">
      <span className="text-amber-600 dark:text-amber-400 mt-0.5">{icon}</span>
      <div className="min-w-0">
        <div className="text-[13px] font-bold leading-tight">{title}</div>
        <div className="text-[10px] text-slate-600 dark:text-slate-400 leading-tight mt-0.5">{subtitle}</div>
      </div>
    </div>
  );
}

function GoldenBootIcon({ className }) {
  return (
    <svg viewBox="0 0 500 420" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bootGold2" x1="0%" y1="0%" x2="60%" y2="100%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="20%" stopColor="#fde047" />
          <stop offset="50%" stopColor="#facc15" />
          <stop offset="80%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#854d0e" />
        </linearGradient>
        <linearGradient id="bootShine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fef9c3" stopOpacity="0" />
          <stop offset="50%" stopColor="#fef9c3" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#fef9c3" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="bootBase2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1f2937" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <radialGradient id="confettiGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#fcd34d" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#fcd34d" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Confetti background */}
      <g opacity="0.7">
        <rect x="50" y="40" width="14" height="6" rx="2" fill="#fbbf24" transform="rotate(20 57 43)" />
        <rect x="430" y="70" width="14" height="6" rx="2" fill="#f59e0b" transform="rotate(-30 437 73)" />
        <rect x="80" y="120" width="10" height="5" rx="2" fill="#fbbf24" transform="rotate(45 85 122)" />
        <rect x="400" y="180" width="12" height="5" rx="2" fill="#f59e0b" transform="rotate(-15 406 182)" />
        <rect x="60" y="200" width="10" height="5" rx="2" fill="#fcd34d" transform="rotate(60 65 202)" />
        <circle cx="450" cy="40" r="4" fill="#fbbf24" />
        <circle cx="40" cy="80" r="3" fill="#f59e0b" />
        <circle cx="450" cy="240" r="3" fill="#fbbf24" />
      </g>

      {/* Boot shape - more realistic */}
      <g transform="translate(50, 70)">
        {/* Boot body */}
        <path
          d="M 40 100
             Q 35 50, 80 40
             L 220 18
             Q 320 10, 370 50
             Q 405 80, 400 130
             Q 395 175, 360 185
             L 320 195
             L 100 200
             Q 50 198, 35 175
             Q 20 145, 30 120
             L 40 100 Z"
          fill="url(#bootGold2)"
          stroke="#78350f"
          strokeWidth="2.5"
        />

        {/* Boot top highlight */}
        <path
          d="M 50 90 Q 80 60, 150 50 Q 250 40, 340 55 Q 380 65, 390 90"
          stroke="url(#bootShine)"
          strokeWidth="4"
          fill="none"
        />

        {/* Stitching detail */}
        <path
          d="M 100 80 Q 200 70, 320 85"
          stroke="#a16207"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="3,4"
        />

        {/* Laces */}
        <g stroke="#78350f" strokeWidth="1.8" fill="none">
          <path d="M 130 95 Q 140 88, 150 95" />
          <path d="M 160 100 Q 170 93, 180 100" />
          <path d="M 190 105 Q 200 98, 210 105" />
          <path d="M 220 110 Q 230 103, 240 110" />
          <path d="M 250 115 Q 260 108, 270 115" />
        </g>

        {/* Sole shadow */}
        <ellipse cx="220" cy="195" rx="180" ry="6" fill="#854d0e" opacity="0.4" />
      </g>

      {/* Trophy base */}
      <rect x="80" y="290" width="340" height="80" rx="6" fill="url(#bootBase2)" />
      <rect x="80" y="290" width="340" height="10" fill="#374151" />
      <rect x="100" y="320" width="300" height="30" rx="4" fill="#fbbf24" stroke="#92400e" strokeWidth="2" />
      <text
        x="250"
        y="341"
        textAnchor="middle"
        fontSize="18"
        fontWeight="900"
        fill="#78350f"
        fontFamily="Inter, sans-serif"
        letterSpacing="3"
      >
        GOLDEN BOOT
      </text>
    </svg>
  );
}

function TrophyIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M7 4h10v6a5 5 0 11-10 0V4zM5 4H3v3a3 3 0 003 3M19 4h2v3a3 3 0 01-3 3M10 16h4v2h2v2H8v-2h2v-2z"/>
    </svg>
  );
}
function GoalIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 7l1.5 3.5L17 11l-2.5 2L15 17l-3-2-3 2 .5-4-2.5-2 3.5-.5L12 7z" fill="currentColor"/>
    </svg>
  );
}
function RankingIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4 19h4v-7H4v7zM10 19h4V5h-4v14zM16 19h4v-10h-4v10z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  );
}
function ShareIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="2"/>
      <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
      <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="2"/>
      <path d="M8.6 10.5l6.8-4M8.6 13.5l6.8 4" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}
