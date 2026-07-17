"use client";

import { LocateFixed, Loader2, Search, X } from "lucide-react";
import { useState } from "react";

import { useCitySearch } from "@/hooks/useCitySearch";
import { City } from "@/types/city";

interface Props {
  onSearch: (city: string) => void;
  onCurrentLocation: () => Promise<void> | void;
  locationLoading?: boolean;
}

export default function SearchBar({
  onSearch,
  onCurrentLocation,
  locationLoading = false,
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

  const selectCity = (selectedCity: string) => {
    onSearch(selectedCity);
    setCity("");

    (document.activeElement as HTMLElement)?.blur();
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      {/* Search */}
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
          className="
            w-full
            rounded-2xl
            border
            border-slate-200
            bg-white/90
            py-3.5
            pl-5
            pr-24
            text-slate-900
            placeholder:text-slate-400
            shadow-lg
            backdrop-blur-xl
            outline-none
            transition-all
            duration-300
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-500/20
            dark:border-slate-700
            dark:bg-[#111827]/90
            dark:text-white
            dark:placeholder:text-slate-500
          "
        />

        {/* Clear */}
        {city && (
          <button
            type="button"
            onClick={clearSearch}
            className="
              absolute
              right-14
              top-1/2
              -translate-y-1/2
              rounded-full
              p-1
              text-slate-400
              transition
              hover:bg-slate-200
              hover:text-slate-700
              dark:hover:bg-slate-700
              dark:hover:text-white
            "
          >
            <X size={18} />
          </button>
        )}

        {/* Search Button */}
        <button
          type="button"
          onClick={handleSearch}
          disabled={!city.trim()}
          className="
            absolute
            right-2
            top-1/2
            -translate-y-1/2
            rounded-xl
            bg-blue-600
            p-2.5
            text-white
            transition-all
            duration-300
            hover:bg-blue-700
            hover:shadow-lg
            disabled:cursor-not-allowed
            disabled:bg-slate-400
            dark:disabled:bg-slate-700
          "
        >
          <Search size={18} />
        </button>

        {/* Loading */}
        {loading && (
          <div
            className="
              absolute
              left-0
              right-0
              top-full
              z-50
              mt-3
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-5
              text-center
              shadow-xl
              dark:border-slate-700
              dark:bg-[#111827]
            "
          >
            <div className="animate-pulse text-slate-600 dark:text-slate-400">
              🔍 Searching cities...
            </div>
          </div>
        )}

        {/* Suggestions */}
        {!loading && cities.length > 0 && (
          <div
            className="
              absolute
              left-0
              right-0
              top-full
              z-50
              mt-3
              max-h-80
              overflow-y-auto
              rounded-2xl
              border
              border-slate-200
              bg-white
              shadow-2xl
              backdrop-blur-xl
              dark:border-slate-700
              dark:bg-[#111827]
            "
          >
            {cities.map((item: City) => (
              <button
                key={`${item.name}-${item.lat}-${item.lon}`}
                type="button"
                onClick={() => selectCity(item.name)}
                className="
                  flex
                  w-full
                  flex-col
                  border-b
                  border-slate-200
                  px-5
                  py-4
                  text-left
                  transition-all
                  duration-200
                  hover:bg-blue-50
                  dark:border-slate-700
                  dark:hover:bg-slate-800
                  last:border-none
                "
              >
                <span className="font-semibold text-slate-900 dark:text-white">
                  {item.name}
                </span>

                <span className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {item.region}, {item.country}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Current Location */}
      <button
        type="button"
        onClick={onCurrentLocation}
        disabled={locationLoading}
        className="
          flex
          items-center
          justify-center
          gap-2
          rounded-2xl
          bg-emerald-600
          px-6
          py-3.5
          font-semibold
          text-white
          shadow-lg
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:bg-emerald-700
          hover:shadow-xl
          disabled:cursor-not-allowed
          disabled:opacity-60
          disabled:hover:translate-y-0
          disabled:hover:bg-emerald-600
        "
      >
        {locationLoading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Detecting...
          </>
        ) : (
          <>
            <LocateFixed size={18} />
            My Location
          </>
        )}
      </button>
    </div>
  );
}