export default function Card({ children, className = "", padding = "md" }) {
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-5 md:p-6",
    lg: "p-6 md:p-8",
  };

  return (
    <div
      className={`bg-white dark:bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-soft ${paddings[padding]} ${className}`}
    >
      {children}
    </div>
  );
}
