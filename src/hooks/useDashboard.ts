"use client";

import { useEffect, useState } from "react";

import { useComparisonCities } from "./useComparisonCities";

import { getCurrentPosition } from "@/services/geolocation";

interface Coordinates {
  lat: number;
  lon: number;
}

export function useDashboard() {
  const [city, setCity] = useState("Agartala");

  const [coords, setCoords] =
    useState<Coordinates | null>(null);

  const [favorites, setFavorites] =
    useState<string[]>([]);

  const [recentSearches, setRecentSearches] =
    useState<string[]>([]);

  const [locationLoading, setLocationLoading] =
    useState(false);

  const [locationError, setLocationError] =
    useState<string | null>(null);

  const {
    cities,
    addCity,
    removeCity,
  } = useComparisonCities();

  useEffect(() => {
    const fav = localStorage.getItem(
      "favoriteCities"
    );

    if (fav) {
      setFavorites(JSON.parse(fav));
    }

    const recent = localStorage.getItem(
      "recentSearches"
    );

    if (recent) {
      setRecentSearches(JSON.parse(recent));
    }
  }, []);

  const addFavorite = () => {
    if (!city) return;

    if (favorites.includes(city)) return;

    const updated = [...favorites, city];

    setFavorites(updated);

    localStorage.setItem(
      "favoriteCities",
      JSON.stringify(updated)
    );
  };

  const removeFavorite = (
    cityName: string
  ) => {
    const updated = favorites.filter(
      (item) => item !== cityName
    );

    setFavorites(updated);

    localStorage.setItem(
      "favoriteCities",
      JSON.stringify(updated)
    );
  };

  const addRecentSearch = (
    searchedCity: string
  ) => {
    const updated = [
      searchedCity,
      ...recentSearches.filter(
        (item) => item !== searchedCity
      ),
    ].slice(0, 10);

    setRecentSearches(updated);

    localStorage.setItem(
      "recentSearches",
      JSON.stringify(updated)
    );
  };

  const handleCurrentLocation =
    async () => {
      try {
        setLocationLoading(true);
        setLocationError(null);

        const location =
          await getCurrentPosition();

        setCoords({
          lat: location.latitude,
          lon: location.longitude,
        });

        // Clear city so useWeather()
        // uses coordinates instead.
        setCity("");
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Unable to determine your location.";

        setLocationError(message);

        alert(message);
      } finally {
        setLocationLoading(false);
      }
    };

  return {
    city,
    setCity,

    coords,
    setCoords,

    favorites,
    recentSearches,

    addFavorite,
    removeFavorite,

    addRecentSearch,

    handleCurrentLocation,

    locationLoading,
    locationError,

    comparisonCities: cities,
    addCity,
    removeCity,
  };
}