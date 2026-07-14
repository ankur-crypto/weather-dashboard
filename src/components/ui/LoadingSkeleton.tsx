"use client";

interface Props {
  className?: string;
}

export default function LoadingSkeleton({
  className = "",
}: Props) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-slate-700/60 ${className}`}
    />
  );
}