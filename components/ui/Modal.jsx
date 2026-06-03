"use client";

import { useEffect } from "react";

export default function Modal({
  open,
  onClose,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  variant = "primary",
  icon,
}) {
  useEffect(() => {
    if (!open) return;
    const handleEsc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const variants = {
    primary: "bg-primary-600 hover:bg-primary-700",
    danger: "bg-red-600 hover:bg-red-700",
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-md bg-white dark:bg-[var(--color-surface)] rounded-2xl shadow-card border border-[var(--color-border)] p-6 animate-scale-in">
        {icon && (
          <div className="w-12 h-12 rounded-xl bg-[var(--color-primary-soft)] text-primary-600 flex items-center justify-center mb-4">
            {icon}
          </div>
        )}

        <h2
          id="modal-title"
          className="font-display font-bold text-lg mb-1.5"
        >
          {title}
        </h2>

        {description && (
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-5">
            {description}
          </p>
        )}

        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={onClose}
            className="h-10 px-4 rounded-xl border border-[var(--color-border)] text-sm font-semibold text-[var(--color-text)] hover:bg-[var(--color-bg)] btn-press transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`h-10 px-4 rounded-xl text-white text-sm font-semibold btn-press transition-colors shadow-soft ${variants[variant]}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
