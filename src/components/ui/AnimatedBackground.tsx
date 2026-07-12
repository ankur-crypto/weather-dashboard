"use client";

export default function AnimatedBackground() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-10 top-20 h-80 w-80 rounded-full bg-cyan-500/20 blur-[120px]" />

        <div className="absolute right-10 top-40 h-96 w-96 rounded-full bg-blue-600/20 blur-[150px]" />

        <div className="absolute bottom-10 left-1/3 h-96 w-96 rounded-full bg-purple-600/20 blur-[140px]" />
      </div>
    </>
  );
}