"use client";

import { useEffect, useState } from "react";

import { useComparisonCities } from "./useComparisonCities";

interface Coordinates {
  lat: number;
  lon: number;
}

export function useDashboard() {
  const [city, setCity] =
    useState("Agartala");

  const [coords, setCoords] =
    useState<Coordinates | null>(null);

  const [favorites, setFavorites] =
    useState<string[]>([]);

  const [recentSearches, setRecentSearches] =
    useState<string[]>([]);

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

    const updated = [
      ...favorites,
      city,
    ];

    setFavorites(updated);

    localStorage.setItem(
      "favoriteCities",
      JSON.stringify(updated)
    );
  };

  const removeFavorite = (
    cityName: string
  ) => {
    const updated =
      favorites.filter(
        (item) =>
          item !== cityName
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
        (item) =>
          item !== searchedCity
      ),
    ].slice(0, 10);

    setRecentSearches(updated);

    localStorage.setItem(
      "recentSearches",
      JSON.stringify(updated)
    );
  };

  const handleCurrentLocation =
    () => {
      if (!navigator.geolocation) {
        alert(
          "Geolocation is not supported."
        );
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });

          setCity("");
        },
        () =>
          alert(
            "Unable to access your location."
          ),
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
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

    comparisonCities: cities,
    addCity,
    removeCity,
  };
}