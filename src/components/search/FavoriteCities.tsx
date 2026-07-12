"use client";

interface Props {
  favorites: string[];
  onSelect: (city: string) => void;
}

export default function FavoriteCities({
  favorites,
  onSelect,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-700 bg-[#111827] p-6">
      <h2 className="mb-5 text-xl font-semibold text-white">
        Favorite Cities
      </h2>

      {favorites.length === 0 ? (
        <p className="text-slate-400">
          No favorite cities yet.
        </p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {favorites.map((city) => (
            <button
              key={city}
              onClick={() => onSelect(city)}
              className="rounded-full bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-500"
            >
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}