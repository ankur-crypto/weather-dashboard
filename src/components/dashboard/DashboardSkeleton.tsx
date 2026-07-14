"use client";

import LoadingSkeleton from "../ui/LoadingSkeleton";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-6">

      <LoadingSkeleton className="h-14 w-full rounded-2xl" />

      <div className="grid gap-6 lg:grid-cols-3">

        <LoadingSkeleton className="h-80 rounded-3xl" />

        <div className="space-y-6 lg:col-span-2">

          <LoadingSkeleton className="h-36 rounded-3xl" />

          <LoadingSkeleton className="h-36 rounded-3xl" />

        </div>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <LoadingSkeleton className="h-44 rounded-3xl" />
        <LoadingSkeleton className="h-44 rounded-3xl" />
        <LoadingSkeleton className="h-44 rounded-3xl" />
        <LoadingSkeleton className="h-44 rounded-3xl" />

      </div>

    </div>
  );
}