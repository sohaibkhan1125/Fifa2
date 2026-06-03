export default function Footer() {
  return (
    <footer className="mt-12 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-primary-600 to-primary-400 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white">
              <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-display font-bold text-sm">
            Prime<span className="text-primary-600">Tools</span>
          </span>
          <span className="text-xs text-[var(--color-text-muted)] ml-2">
            © {new Date().getFullYear()} All rights reserved
          </span>
        </div>
        <div className="flex items-center gap-5 text-xs text-[var(--color-text-muted)]">
          <a href="#" className="hover:text-[var(--color-text)]">Privacy</a>
          <a href="#" className="hover:text-[var(--color-text)]">Terms</a>
          <a href="#" className="hover:text-[var(--color-text)]">Contact</a>
        </div>
      </div>
    </footer>
  );
}
