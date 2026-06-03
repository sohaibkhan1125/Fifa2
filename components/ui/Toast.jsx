"use client";

import { useEffect } from "react";

export default function Toast({ message, type = "success", onClose, duration = 2500 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [message, onClose, duration]);

  if (!message) return null;

  const colors = {
    success: "bg-emerald-600 text-white",
    error: "bg-red-600 text-white",
    info: "bg-primary-600 text-white",
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
      <div className={`${colors[type]} px-4 py-3 rounded-xl shadow-card text-sm font-semibold flex items-center gap-2`}>
        {type === "success" && (
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
            <path d="M5 12l5 5 9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        {message}
      </div>
    </div>
  );
}
