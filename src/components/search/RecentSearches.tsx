"use client";

import { Clock3 } from "lucide-react";

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
    <div className="rounded-2xl border border-slate-700 bg-[#111827] p-5">
      <div className="mb-4 flex items-center gap-2">
        <Clock3
          size={20}
          className="text-blue-400"
        />

        <h2 className="text-lg font-semibold text-white">
          Recent Searches
        </h2>
      </div>

      <div className="flex flex-wrap gap-3">
        {searches.map((city) => (
          <button
            key={city}
            onClick={() => onSelect(city)}
            className="rounded-full bg-slate-800 px-4 py-2 text-sm text-white transition hover:bg-blue-600"
          >
            📍 {city}
          </button>
        ))}
      </div>
    </div>
  );
}