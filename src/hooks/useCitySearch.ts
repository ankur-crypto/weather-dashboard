"use client";

import { useEffect, useState } from "react";
import { searchCities } from "@/services/weatherApi";
import { City } from "@/types/city";

export function useCitySearch(query: string) {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
if (query.trim().length < 2) {
    setCities([]);
    return;
}

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const result = await searchCities(query);

        setCities(result);
      } catch (error) {
        console.error(error);
        setCities([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return {
    cities,
    loading,
  };
}