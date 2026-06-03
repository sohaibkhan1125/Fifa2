"use client";

import Card from "@/components/ui/Card";

/**
 * Bottom action bar — matches client's redesigned mockup.
 * "Make your prediction. Share with the world!" + Download as Image button.
 */
export default function BottomActionBar({ onDownload }) {
  return (
    <Card padding="md">
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-between">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <ShieldIcon className="w-5 h-5" />
          </div>
          <p className="text-sm font-medium text-[var(--color-text)]">
            Make your prediction. Share with the world! 🌍
          </p>
        </div>

        <button
          onClick={onDownload}
          className="w-full sm:w-auto h-11 px-5 inline-flex items-center justify-center gap-2 bg-white dark:bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-primary-300 text-[var(--color-text)] text-sm font-semibold rounded-xl btn-press transition-colors"
        >
          <DownloadIcon className="w-4 h-4" />
          Download as Image
        </button>
      </div>
    </Card>
  );
}

function ShieldIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function DownloadIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
