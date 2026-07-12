"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick?: () => void;
}

export default function GradientButton({
  children,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="
        rounded-xl
        bg-gradient-to-r
        from-blue-500
        via-cyan-500
        to-indigo-600
        px-5
        py-3
        font-semibold
        text-white
        shadow-lg
        transition
        duration-300
        hover:scale-105
      "
    >
      {children}
    </button>
  );
}