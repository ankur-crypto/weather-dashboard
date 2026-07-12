"use client";

import { ReactNode } from "react";

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function PageContainer({
  title,
  subtitle,
  children,
}: Props) {
  return (
    <section className="flex-1 overflow-y-auto p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-2 text-slate-400">
            {subtitle}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}