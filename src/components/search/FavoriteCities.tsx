"use client";

import { MapPinned, Star } from "lucide-react";

import FavoriteCityCard from "./FavoriteCityCard";
import { useFavoriteStore } from "@/store/favoriteStore";

interface Props {
  onSelect: (city: string) => void;
}

export default function FavoriteCities({
  onSelect,
}: Props) {
  const favorites = useFavoriteStore(
    (state) => state.favorites
  );

  const removeFavorite = useFavoriteStore(
    (state) => state.removeFavorite
  );

  return (
    <section
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

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-yellow-100 p-3 dark:bg-yellow-500/20">
            <Star
              size={24}
              className="text-yellow-500 dark:text-yellow-400"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Favorite Cities
            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Quickly access your saved weather locations
            </p>
          </div>
        </div>

        <div
          className="
            self-start
            rounded-full
            border
            border-blue-200
            bg-blue-50
            px-4
            py-2
            text-sm
            font-semibold
            text-blue-700
            dark:border-blue-800
            dark:bg-blue-900/30
            dark:text-blue-300
          "
        >
          {favorites.length} Saved
        </div>
      </div>

      {favorites.length === 0 ? (
        <div
          className="
            flex
            flex-col
            items-center
            justify-center
            rounded-3xl
            border-2
            border-dashed
            border-slate-300
            bg-slate-50
            px-6
            py-16
            text-center
            dark:border-slate-700
            dark:bg-slate-800/40
          "
        >
          <div className="mb-5 rounded-full bg-slate-100 p-5 dark:bg-slate-700">
            <MapPinned
              size={48}
              className="text-slate-500 dark:text-slate-400"
            />
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            No Favorite Cities
          </h3>

          <p className="mt-3 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
            Save cities from the weather card using the ⭐ button.
          </p>
        </div>
      ) : (
        <div
          className="
            grid
            gap-5
            sm:grid-cols-2
            xl:grid-cols-3
            2xl:grid-cols-4
          "
        >
          {favorites.map((city) => (
            <FavoriteCityCard
              key={city}
              city={city}
              onSelect={() => onSelect(city)}
              onRemove={() => removeFavorite(city)}
            />
          ))}
        </div>
      )}
    </section>
  );
}