"use client";

export default function CloudEffect() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
      <div className="absolute left-10 top-10 h-24 w-48 rounded-full bg-white blur-3xl" />

      <div className="absolute right-20 top-28 h-20 w-56 rounded-full bg-white blur-3xl" />

      <div className="absolute bottom-20 left-1/3 h-24 w-52 rounded-full bg-white blur-3xl" />
    </div>
  );
}