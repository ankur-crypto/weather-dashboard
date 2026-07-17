"use client";

import { useMemo } from "react";

interface RainDrop {
  id: number;
  left: number;
  duration: number;
  delay: number;
  opacity: number;
  height: number;
}

export default function RainEffect() {
  const drops = useMemo<RainDrop[]>(
    () =>
      Array.from({ length: 120 }, (_, index) => ({
        id: index,
        left: Math.random() * 100,
        duration: 0.6 + Math.random() * 0.8,
        delay: Math.random() * 2,
        opacity: 0.25 + Math.random() * 0.5,
        height: 12 + Math.random() * 18,
      })),
    []
  );

  return (
    <>
      <style jsx>{`
        @keyframes rainfall {
          from {
            transform: translate3d(0, -120vh, 0);
          }

          to {
            transform: translate3d(0, 120vh, 0);
          }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {drops.map((drop) => (
          <span
            key={drop.id}
            className="absolute top-0 w-[2px] rounded-full bg-gradient-to-b from-blue-200/20 via-blue-300/70 to-blue-400"
            style={{
              left: `${drop.left}%`,
              height: `${drop.height}px`,
              opacity: drop.opacity,
              animation: `rainfall ${drop.duration}s linear infinite`,
              animationDelay: `${drop.delay}s`,
              willChange: "transform",
            }}
          />
        ))}
      </div>
    </>
  );
}