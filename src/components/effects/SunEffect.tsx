"use client";

export default function SunEffect() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute right-10 top-10 h-40 w-40 rounded-full bg-yellow-300 opacity-30 blur-3xl animate-pulse" />

      <div className="absolute right-20 top-20 h-24 w-24 rounded-full bg-yellow-200 opacity-80" />
    </div>
  );
}