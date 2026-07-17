"use client";

import { useMemo } from "react";

interface Snowflake {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function SnowEffect() {
  const snowflakes = useMemo<Snowflake[]>(
    () =>
      Array.from({ length: 70 }, (_, index) => ({
        id: index,
        left: Math.random() * 100,
        size: 4 + Math.random() * 8,
        duration: 6 + Math.random() * 6,
        delay: Math.random() * 8,
        opacity: 0.4 + Math.random() * 0.6,
      })),
    []
  );

  return (
    <>
      <style jsx>{`
        @keyframes snowfall {
          0% {
            transform: translate3d(0, -10vh, 0) translateX(0);
          }

          25% {
            transform: translate3d(8px, 25vh, 0) translateX(4px);
          }

          50% {
            transform: translate3d(-8px, 50vh, 0) translateX(-4px);
          }

          75% {
            transform: translate3d(8px, 75vh, 0) translateX(4px);
          }

          100% {
            transform: translate3d(0, 110vh, 0);
          }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {snowflakes.map((flake) => (
          <span
            key={flake.id}
            className="absolute top-0 rounded-full bg-white"
            style={{
              left: `${flake.left}%`,
              width: `${flake.size}px`,
              height: `${flake.size}px`,
              opacity: flake.opacity,
              animation: `snowfall ${flake.duration}s linear infinite`,
              animationDelay: `${flake.delay}s`,
              willChange: "transform",
            }}
          />
        ))}
      </div>
    </>
  );
}