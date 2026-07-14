"use client";

import { useEffect, useState } from "react";

import { searchCities } from "@/services/weatherApi";

interface City {
  id: number;
  name: string;
  region: string;
  country: string;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSelect: (city: string) => void;
}

export default function CityAutocomplete({
  value,
  onChange,
  onSelect,
}: Props) {
  const [results, setResults] = useState<City[]>([]);

  useEffect(() => {
    if (!value.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const cities = await searchCities(value);

        setResults(cities);
      } catch (error) {
        console.error(error);

        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="relative">

      <input
        type="text"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder="Search city..."
        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-blue-500"
      />

      {results.length > 0 && (

        <div className="absolute z-50 mt-2 max-h-64 w-full overflow-y-auto rounded-xl border border-slate-700 bg-slate-900 shadow-2xl">

          {results.map((city) => (

            <button
              key={`${city.name}-${city.region}-${city.country}`}
              type="button"
              onClick={() => {
                onSelect(city.name);

                onChange("");

                setResults([]);
              }}
              className="block w-full border-b border-slate-700 px-4 py-3 text-left transition hover:bg-slate-800 last:border-b-0"
            >

              <p className="font-medium text-white">
                {city.name}
              </p>

              <p className="text-sm text-slate-400">
                {city.region}, {city.country}
              </p>

            </button>

          ))}

        </div>

      )}

    </div>
  );
}