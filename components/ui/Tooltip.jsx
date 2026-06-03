"use client";

import { useState } from "react";

export default function Tooltip({ children, content, side = "top" }) {
  const [visible, setVisible] = useState(false);

  const positions = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span
          role="tooltip"
          className={`absolute z-50 ${positions[side]} px-2.5 py-1.5 bg-[var(--color-text)] text-[var(--color-bg)] text-xs font-medium rounded-lg whitespace-nowrap shadow-card animate-fade-in pointer-events-none`}
        >
          {content}
        </span>
      )}
    </span>
  );
}
