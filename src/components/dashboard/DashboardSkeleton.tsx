"use client";

import LoadingSkeleton from "../ui/LoadingSkeleton";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <LoadingSkeleton className="h-12 w-60 rounded-2xl" />

        <LoadingSkeleton className="h-12 w-40 rounded-2xl" />
      </div>

      {/* Search Section */}

      <div
        className="
          rounded-3xl
          border
          border-slate-200
          bg-white/80
          p-6
          shadow-lg
          backdrop-blur-xl
          dark:border-slate-700
          dark:bg-[#111827]/80
        "
      >
        <LoadingSkeleton className="h-14 w-full rounded-2xl" />

        <div className="mt-6 flex flex-wrap gap-3">
          <LoadingSkeleton className="h-10 w-28 rounded-full" />
          <LoadingSkeleton className="h-10 w-32 rounded-full" />
          <LoadingSkeleton className="h-10 w-24 rounded-full" />
          <LoadingSkeleton className="h-10 w-36 rounded-full" />
        </div>
      </div>

      {/* Main Dashboard */}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Card */}

        <LoadingSkeleton className="h-[420px] rounded-3xl" />

        {/* Right Content */}

        <div className="space-y-6 lg:col-span-2">
          <LoadingSkeleton className="h-48 rounded-3xl" />

          <LoadingSkeleton className="h-48 rounded-3xl" />
        </div>
      </div>

      {/* Weather Cards */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <LoadingSkeleton className="h-48 rounded-3xl" />
        <LoadingSkeleton className="h-48 rounded-3xl" />
        <LoadingSkeleton className="h-48 rounded-3xl" />
        <LoadingSkeleton className="h-48 rounded-3xl" />
      </div>

      {/* Bottom Section */}

      <div className="grid gap-6 lg:grid-cols-2">
        <LoadingSkeleton className="h-80 rounded-3xl" />

        <LoadingSkeleton className="h-80 rounded-3xl" />
      </div>

      {/* Footer */}

      <LoadingSkeleton className="h-44 rounded-3xl" />
    </div>
  );
}