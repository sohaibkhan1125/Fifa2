import Card from "@/components/ui/Card";

export default function ShareCard({ onShare }) {
  return (
    <Card padding="md" className="relative overflow-hidden bg-gradient-to-br from-[var(--color-primary-soft)] to-white dark:from-primary-900/20 dark:to-[var(--color-surface)] border-primary-200 dark:border-primary-800/40">
      <div className="absolute -top-6 -right-6 w-20 h-20 bg-primary-400/20 rounded-full blur-xl pointer-events-none" />

      <div className="relative flex items-start gap-3 mb-3">
        <div className="w-9 h-9 rounded-lg bg-primary-600 text-white flex items-center justify-center flex-shrink-0 shadow-glow">
          <ShareIcon className="w-4.5 h-4.5" />
        </div>
        <div>
          <h3 className="font-display font-bold text-sm mb-1">
            Share Your Predictions
          </h3>
          <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
            Share your Golden Boot predictions with friends and challenge them!
          </p>
        </div>
      </div>

      <button
        onClick={onShare}
        className="w-full mt-2 h-10 inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl btn-press transition-colors shadow-soft hover:shadow-glow"
      >
        Share Now
        <ShareIcon className="w-3.5 h-3.5" />
      </button>
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
