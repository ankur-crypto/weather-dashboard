"use client";

import { LocateFixed, Search, X } from "lucide-react";
import { useState } from "react";

import { useCitySearch } from "@/hooks/useCitySearch";
import { City } from "@/types/city";

interface Props {
  onSearch: (city: string) => void;
  onCurrentLocation: () => void;
}

export default function SearchBar({
  onSearch,
  onCurrentLocation,
}: Props) {
  const [city, setCity] = useState("");

  const { cities, loading } = useCitySearch(city);

  const handleSearch = () => {
    const value = city.trim();

    if (!value) return;

    onSearch(value);
  };

  const clearSearch = () => {
    setCity("");
  };

  return (
    <div className="flex flex-col gap-3 md:flex-row">
      <div className="relative flex-1">
        <input
          type="text"
          value={city}
          placeholder="Search any city..."
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-5 pr-24 text-white placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />

        {city && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-14 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-white"
          >
            <X size={18} />
          </button>
        )}

        <button
          type="button"
          onClick={handleSearch}
          disabled={!city.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-blue-600 p-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-700"
        >
          <Search size={18} />
        </button>

        {loading && (
          <div className="absolute left-4 top-full mt-2 text-sm text-slate-400">
            Searching...
          </div>
        )}

        {cities.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-72 overflow-y-auto rounded-xl border border-slate-700 bg-slate-900 shadow-xl">
            {cities.map((item: City) => (
              <button
                key={`${item.name}-${item.lat}-${item.lon}`}
                type="button"
                onClick={() => {
                  setCity(item.name);
                  onSearch(item.name);
                }}
                className="flex w-full flex-col border-b border-slate-800 px-4 py-3 text-left transition hover:bg-slate-800 last:border-none"
              >
                <span className="font-medium text-white">
                  {item.name}
                </span>

                <span className="text-sm text-slate-400">
                  {item.region}, {item.country}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onCurrentLocation}
        className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-medium text-white transition hover:bg-emerald-700"
      >
        <LocateFixed size={18} />
        My Location
      </button>
    </div>
  );
}