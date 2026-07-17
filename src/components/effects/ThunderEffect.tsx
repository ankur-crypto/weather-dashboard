"use client";

export default function ThunderEffect() {
  return (
    <>
      <style jsx>{`
        @keyframes lightningFlash {
          0%,
          85%,
          100% {
            opacity: 0;
          }

          86% {
            opacity: 0.15;
          }

          87% {
            opacity: 0.9;
          }

          88% {
            opacity: 0.2;
          }

          89% {
            opacity: 1;
          }

          90% {
            opacity: 0;
          }
        }

        @keyframes boltFlash {
          0%,
          85%,
          100% {
            opacity: 0;
            transform: scaleY(0.8);
          }

          87% {
            opacity: 1;
            transform: scaleY(1);
          }

          89% {
            opacity: 0.8;
          }

          90% {
            opacity: 0;
          }
        }

        @keyframes glowPulse {
          0%,
          100% {
            opacity: 0.08;
          }

          50% {
            opacity: 0.18;
          }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Ambient storm glow */}

        <div
          className="absolute inset-0 bg-slate-900/20"
          style={{
            animation: "glowPulse 4s ease-in-out infinite",
          }}
        />

        {/* Screen flash */}

        <div
          className="absolute inset-0 bg-white"
          style={{
            animation: "lightningFlash 5s linear infinite",
          }}
        />

        {/* Lightning bolt */}

        <div
          className="absolute left-1/2 top-0 -translate-x-1/2"
          style={{
            animation: "boltFlash 5s linear infinite",
          }}
        >
          <svg
            width="80"
            height="320"
            viewBox="0 0 80 320"
            fill="none"
          >
            <path
              d="M42 0
                 L20 120
                 H42
                 L28 220
                 L60 110
                 H38
                 L42 0Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </div>
    </>
  );
}