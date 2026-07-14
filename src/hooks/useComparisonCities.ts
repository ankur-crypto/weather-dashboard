"use client";

import { useEffect, useState } from "react";

export function useComparisonCities() {
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(
      "comparisonCities"
    );

    if (saved) {
      setCities(JSON.parse(saved));
    } else {
      setCities([
        "Agartala",
        "Delhi",
        "Mumbai",
      ]);
    }
  }, []);

  const save = (updated: string[]) => {
    setCities(updated);

    localStorage.setItem(
      "comparisonCities",
      JSON.stringify(updated)
    );
  };

  const addCity = (city: string) => {
    if (cities.includes(city)) return;

    save([...cities, city]);
  };

  const removeCity = (city: string) => {
    save(
      cities.filter((c) => c !== city)
    );
  };

  return {
    cities,
    addCity,
    removeCity,
  };
}