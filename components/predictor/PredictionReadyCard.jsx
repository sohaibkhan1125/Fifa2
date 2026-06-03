"use client";

import Card from "@/components/ui/Card";

/**
 * Big horizontal share CTA card matching the new client mockup.
 * "Your prediction is ready!" with shoe illustration on the right.
 */
export default function PredictionReadyCard({ onShare }) {
  return (
    <Card padding="md" className="relative overflow-hidden bg-gradient-to-br from-[var(--color-primary-soft)] via-white to-[var(--color-primary-soft)]/40 dark:from-primary-900/20 dark:via-[var(--color-surface)] dark:to-primary-900/10 border-primary-200/60 dark:border-primary-800/40">
      <div className="absolute -top-12 -left-12 w-40 h-40 bg-primary-400/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative grid grid-cols-1 md:grid-cols-[auto_1fr_auto_auto] items-center gap-4 md:gap-6">
        {/* Share icon circle */}
        <div className="w-14 h-14 rounded-2xl bg-primary-600 text-white flex items-center justify-center flex-shrink-0 shadow-glow mx-auto md:mx-0">
          <ShareIcon className="w-6 h-6" />
        </div>

        {/* Text */}
        <div className="text-center md:text-left min-w-0">
          <h3 className="font-display font-bold text-lg md:text-xl mb-1">
            Your prediction is ready!
          </h3>
          <p className="text-sm text-[var(--color-text-muted)]">
            Share your Golden Boot prediction and challenge your friends.
          </p>
        </div>

        {/* CTA button */}
        <div className="flex flex-col items-center gap-1.5">
          <button
            onClick={onShare}
            className="h-12 px-6 inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl btn-press transition-colors shadow-soft hover:shadow-glow"
          >
            <ShareIcon className="w-4 h-4" />
            Share My Prediction
          </button>
          <p className="text-[10px] text-[var(--color-text-muted)] font-medium">
            Show the world who you think will win!
          </p>
        </div>

        {/* Shoe illustration */}
        <div className="hidden md:flex justify-end flex-shrink-0">
          <RunningShoeIcon className="w-28 lg:w-32" />
        </div>
      </div>
    </Card>
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

function RunningShoeIcon({ className }) {
  return (
    <svg viewBox="0 0 200 140" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shoePurple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c4b5fd" />
          <stop offset="50%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="shoeSole" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
      </defs>

      {/* Speed lines */}
      <g stroke="#c4b5fd" strokeWidth="2.5" strokeLinecap="round" opacity="0.5">
        <line x1="10" y1="55" x2="35" y2="55" />
        <line x1="5" y1="70" x2="40" y2="70" />
        <line x1="15" y1="85" x2="35" y2="85" />
      </g>

      {/* Shoe body */}
      <path
        d="M 50 60
           Q 55 45, 75 42
           L 130 45
           Q 160 50, 175 65
           Q 185 80, 175 95
           L 60 100
           Q 45 95, 45 80
           Q 45 70, 50 60 Z"
        fill="url(#shoePurple)"
        stroke="#5b21b6"
        strokeWidth="1.5"
      />

      {/* Toe cap detail */}
      <path
        d="M 130 50 Q 155 55, 170 70"
        stroke="#5b21b6"
        strokeWidth="1.5"
        fill="none"
      />

      {/* Laces */}
      <g stroke="#ffffff" strokeWidth="1.8" fill="none" opacity="0.9">
        <path d="M 80 55 Q 85 50, 90 55" />
        <path d="M 95 60 Q 100 55, 105 60" />
        <path d="M 110 65 Q 115 60, 120 65" />
      </g>

      {/* Stripes */}
      <path
        d="M 90 75 L 130 78"
        stroke="#ffffff"
        strokeWidth="3"
        opacity="0.8"
        strokeLinecap="round"
      />
      <path
        d="M 95 85 L 135 88"
        stroke="#ffffff"
        strokeWidth="2"
        opacity="0.6"
        strokeLinecap="round"
      />

      {/* Sole */}
      <path
        d="M 45 100 L 175 100 Q 180 105, 175 112 L 50 115 Q 42 110, 45 100 Z"
        fill="url(#shoeSole)"
        stroke="#0f172a"
        strokeWidth="1"
      />

      {/* Heel */}
      <path
        d="M 45 80 Q 35 85, 38 100"
        stroke="#5b21b6"
        strokeWidth="2"
        fill="none"
      />

      {/* Sparkle particles */}
      <g fill="#fbbf24">
        <circle cx="180" cy="40" r="2.5" />
        <circle cx="160" cy="25" r="1.5" />
        <circle cx="20" cy="115" r="2" />
      </g>
    </svg>
  );
}
