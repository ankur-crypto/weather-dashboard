"use client";

import { useState } from "react";

import CityAutocomplete from "../search/CityAutocomplete";

interface Props {
  onAdd: (city: string) => void;
}

export default function AddComparisonCity({
  onAdd,
}: Props) {
  const [city, setCity] = useState("");

  return (
    <div
      className="
        mb-6
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
        dark:bg-[#111827]/80
        dark:shadow-xl
      "
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Compare Cities
        </h2>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Search and compare weather across multiple cities.
        </p>
      </div>

      {/* Search */}
      <CityAutocomplete
        value={city}
        onChange={setCity}
        onSelect={(selectedCity) => {
          onAdd(selectedCity);
          setCity("");
        }}
      />
    </div>
  );
}