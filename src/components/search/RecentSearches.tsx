"use client";

import { Clock3, MapPin } from "lucide-react";

interface Props {
  searches: string[];
  onSelect: (city: string) => void;
}

export default function RecentSearches({
  searches,
  onSelect,
}: Props) {
  if (searches.length === 0) return null;

  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white/90
        p-6
        shadow-lg
        backdrop-blur-xl
        transition-all
        duration-300
        dark:border-slate-700
        dark:bg-[#111827]/90
      "
    >
      {/* Header */}

      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-xl bg-blue-100 p-3 dark:bg-blue-900/30">
          <Clock3
            size={22}
            className="text-blue-600 dark:text-blue-400"
          />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Recent Searches
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Quickly search your recently viewed cities
          </p>
        </div>
      </div>

      {/* Search Chips */}

      <div className="flex flex-wrap gap-3">
        {searches.map((city) => (
          <button
            key={city}
            onClick={() => onSelect(city)}
            className="
              flex
              items-center
              gap-2
              rounded-full
              border
              border-slate-200
              bg-slate-100
              px-4
              py-2.5
              text-sm
              font-medium
              text-slate-700
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:border-blue-400
              hover:bg-blue-50
              hover:text-blue-700
              hover:shadow-md
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-slate-300
              dark:hover:border-blue-500
              dark:hover:bg-slate-700
              dark:hover:text-white
            "
          >
            <MapPin
              size={16}
              className="text-blue-500 dark:text-blue-400"
            />

            <span>{city}</span>
          </button>
        ))}
      </div>
    </div>
  );
}