export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  icon,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-xl btn-press transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-primary-600 hover:bg-primary-700 text-white shadow-soft hover:shadow-glow",
    secondary:
      "bg-white dark:bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] hover:border-primary-300 dark:hover:border-primary-700",
    ghost:
      "text-[var(--color-text-muted)] hover:bg-[var(--color-primary-soft)] hover:text-primary-600",
    outline:
      "border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-bg)]",
  };

  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
