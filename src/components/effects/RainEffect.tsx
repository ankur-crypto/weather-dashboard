"use client";

import { useMemo } from "react";

export default function RainEffect() {
  const drops = useMemo(
    () =>
      Array.from({ length: 80 }, (_, index) => ({
        id: index,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 2,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {drops.map((drop) => (
        <span
          key={drop.id}
          className="absolute h-6 w-[2px] animate-pulse bg-blue-200 opacity-40"
          style={{
            left: `${drop.left}%`,
            top: `${drop.top}%`,
            animationDelay: `${drop.delay}s`,
          }}
        />
      ))}
    </div>
  );
}