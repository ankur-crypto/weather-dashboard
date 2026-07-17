"use client";

import { useMemo } from "react";

interface Cloud {
  id: number;
  top: number;
  width: number;
  height: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function CloudEffect() {
  const clouds = useMemo<Cloud[]>(
    () =>
      Array.from({ length: 6 }, (_, index) => ({
        id: index,
        top: 5 + Math.random() * 70,
        width: 180 + Math.random() * 180,
        height: 70 + Math.random() * 60,
        duration: 40 + Math.random() * 40,
        delay: Math.random() * 20,
        opacity: 0.12 + Math.random() * 0.12,
      })),
    []
  );

  return (
    <>
      <style jsx>{`
        @keyframes cloudFloat {
          from {
            transform: translateX(-30vw);
          }

          to {
            transform: translateX(130vw);
          }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {clouds.map((cloud) => (
          <div
            key={cloud.id}
            className="absolute"
            style={{
              top: `${cloud.top}%`,
              animation: `cloudFloat ${cloud.duration}s linear infinite`,
              animationDelay: `${cloud.delay}s`,
              opacity: cloud.opacity,
              willChange: "transform",
            }}
          >
            {/* Main Cloud */}

            <div
              className="relative rounded-full bg-white blur-3xl"
              style={{
                width: `${cloud.width}px`,
                height: `${cloud.height}px`,
              }}
            >
              <div
                className="absolute rounded-full bg-white blur-2xl"
                style={{
                  width: `${cloud.width * 0.55}px`,
                  height: `${cloud.height * 0.8}px`,
                  top: "-18px",
                  left: "18%",
                }}
              />

              <div
                className="absolute rounded-full bg-white blur-2xl"
                style={{
                  width: `${cloud.width * 0.4}px`,
                  height: `${cloud.height * 0.7}px`,
                  top: "-10px",
                  right: "15%",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}