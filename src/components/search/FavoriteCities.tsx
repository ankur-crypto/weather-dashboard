"use client";

import { Star } from "lucide-react";

import FavoriteCityCard from "./FavoriteCityCard";

interface Props {
  favorites: string[];
  onSelect: (city: string) => void;
  onRemove: (city: string) => void;
}

export default function FavoriteCities({
  favorites,
  onSelect,
  onRemove,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-700 bg-[#111827]/90 p-6 shadow-xl">

      {/* Header */}

      <div className="mb-6 flex items-center gap-3">

        <Star
          className="text-yellow-400"
          size={24}
        />

        <h2 className="text-2xl font-bold text-white">
          Favorite Cities
        </h2>

      </div>

      {/* Empty State */}

      {favorites.length === 0 ? (

        <div className="rounded-2xl border border-dashed border-slate-700 p-8 text-center">

          <p className="text-slate-400">
            No favorite cities yet.
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Add a city to access it quickly.
          </p>

        </div>

      ) : (

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

          {favorites.map((city) => (

            <FavoriteCityCard
              key={city}
              city={city}
              onSelect={() => onSelect(city)}
              onRemove={() => onRemove(city)}
            />

          ))}

        </div>

      )}

    </div>
  );
}