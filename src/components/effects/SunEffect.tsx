"use client";

export default function SunEffect() {
  return (
    <>
      <style jsx>{`
        @keyframes rotateRays {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes sunFloat {
          0%,
          100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes glow {
          0%,
          100% {
            opacity: 0.45;
            transform: scale(1);
          }

          50% {
            opacity: 0.7;
            transform: scale(1.08);
          }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Outer Glow */}

        <div
          className="absolute right-12 top-12 h-56 w-56 rounded-full bg-yellow-300 blur-3xl"
          style={{
            animation: "glow 5s ease-in-out infinite",
          }}
        />

        {/* Sun Rays */}

        <div
          className="absolute right-[52px] top-[52px] flex h-48 w-48 items-center justify-center"
          style={{
            animation: "rotateRays 30s linear infinite",
          }}
        >
          {Array.from({ length: 12 }).map((_, index) => (
            <span
              key={index}
              className="absolute h-20 w-[3px] rounded-full bg-yellow-300/60"
              style={{
                transform: `rotate(${index * 30}deg) translateY(-78px)`,
              }}
            />
          ))}
        </div>

        {/* Main Sun */}

        <div
          className="absolute right-20 top-20 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-yellow-200 via-yellow-300 to-orange-300 shadow-[0_0_80px_rgba(255,220,100,0.8)]"
          style={{
            animation: "sunFloat 4s ease-in-out infinite",
          }}
        >
          <div className="h-16 w-16 rounded-full bg-yellow-100 opacity-70" />
        </div>
      </div>
    </>
  );
}