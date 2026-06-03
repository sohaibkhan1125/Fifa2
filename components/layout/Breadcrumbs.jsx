import Link from "next/link";

export default function Breadcrumbs({ items = [] }) {
  if (!items.length) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] flex-wrap">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-1.5">
            {idx > 0 && (
              <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 text-[var(--color-text-muted)]/60">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
            {item.href && idx !== items.length - 1 ? (
              <Link
                href={item.href}
                className="hover:text-[var(--color-text)] transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-[var(--color-text)]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
