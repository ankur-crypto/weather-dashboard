"use client";

import { useCallback, useState } from "react";

import { getCurrentPosition } from "@/services/geolocation";
import { getCurrentWeather } from "@/services/weatherApi";
import { useLocationStore } from "@/store/locationStore";
import { WeatherData } from "@/types/weather";

export function useCurrentLocation() {
  const {
    coordinates,
    setCoordinates,
    loading,
    setLoading,
    error,
    setError,
  } = useLocationStore();

  const [weather, setWeather] =
    useState<WeatherData | null>(null);

  const getLocationWeather =
    useCallback(async () => {
      try {
        setLoading(true);
        setError(null);

        // Get GPS coordinates
        const location =
          await getCurrentPosition();

        setCoordinates(location);

        // Fetch weather using latitude & longitude
        const result =
          await getCurrentWeather(
            `${location.latitude},${location.longitude}`
          );

        setWeather(result);

        return result;
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Unable to get current location.";

        setError(message);

        return null;
      } finally {
        setLoading(false);
      }
    }, [
      setCoordinates,
      setLoading,
      setError,
    ]);

  return {
    weather,
    coordinates,
    loading,
    error,
    getLocationWeather,
  };
}