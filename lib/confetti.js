"use client";

// Pure-CSS / vanilla JS confetti — no external dependency
export function fireConfetti(originElement) {
  if (typeof window === "undefined") return;

  const container = document.createElement("div");
  container.style.cssText = `
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9999;
    overflow: hidden;
  `;
  document.body.appendChild(container);

  // Get origin point (default to top center if no element)
  let originX = window.innerWidth / 2;
  let originY = window.innerHeight / 3;
  if (originElement) {
    const rect = originElement.getBoundingClientRect();
    originX = rect.left + rect.width / 2;
    originY = rect.top + rect.height / 2;
  }

  const colors = ["#7c3aed", "#a78bfa", "#c026d3", "#fbbf24", "#34d399", "#60a5fa", "#f472b6"];
  const pieces = 60;

  for (let i = 0; i < pieces; i++) {
    const piece = document.createElement("div");
    const size = Math.random() * 8 + 4;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 280 + 120;
    const dx = Math.cos(angle) * velocity;
    const dy = Math.sin(angle) * velocity - 200; // bias upward
    const rotation = Math.random() * 720 - 360;
    const duration = Math.random() * 800 + 1200;
    const isSquare = Math.random() > 0.5;

    piece.style.cssText = `
      position: absolute;
      left: ${originX}px;
      top: ${originY}px;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: ${isSquare ? "2px" : "50%"};
      transform: translate(-50%, -50%);
      opacity: 1;
      will-change: transform, opacity;
    `;

    container.appendChild(piece);

    // Animate using Web Animations API
    piece.animate(
      [
        { transform: `translate(-50%, -50%) rotate(0deg)`, opacity: 1 },
        {
          transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy + 600}px)) rotate(${rotation}deg)`,
          opacity: 0,
        },
      ],
      {
        duration,
        easing: "cubic-bezier(0.2, 0.6, 0.4, 1)",
        fill: "forwards",
      }
    );
  }

  // Cleanup
  setTimeout(() => container.remove(), 2400);
}
