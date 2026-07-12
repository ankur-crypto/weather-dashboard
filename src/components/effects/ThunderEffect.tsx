"use client";

export default function ThunderEffect() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 animate-pulse bg-white opacity-5" />
    </div>
  );
}