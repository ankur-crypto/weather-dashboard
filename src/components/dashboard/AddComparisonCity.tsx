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
    <div className="mb-6 rounded-3xl border border-slate-700 bg-[#111827]/80 p-6 shadow-xl">

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-white">
          Compare Cities
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Search and compare weather across multiple cities.
        </p>

      </div>

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