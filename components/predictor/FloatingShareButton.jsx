"use client";

export default function FloatingShareButton({ onShare }) {
  return (
    <button
      onClick={onShare}
      aria-label="Share predictions"
      className="md:hidden fixed bottom-24 right-4 z-30 w-14 h-14 rounded-full bg-primary-600 hover:bg-primary-700 text-white shadow-glow btn-press flex items-center justify-center"
    >
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="2"/>
        <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
        <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M8.6 10.5l6.8-4M8.6 13.5l6.8 4" stroke="currentColor" strokeWidth="2"/>
      </svg>
    </button>
  );
}
