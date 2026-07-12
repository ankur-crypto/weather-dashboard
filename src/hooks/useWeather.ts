"use client";

import { useEffect, useState } from "react";

import { getCurrentWeather } from "@/services/weatherApi";
import { useWeatherStore } from "@/store/weatherStore";
import { WeatherData } from "@/types/weather";

interface Coordinates {
  lat: number;
  lon: number;
}

export function useWeather(
  city: string,
  coords?: Coordinates | null
) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const weather = useWeatherStore(
    (state) => state.weather
  );

  const setWeather = useWeatherStore(
    (state) => state.setWeather
  );

  useEffect(() => {
    async function fetchWeather() {
      try {
        setLoading(true);
        setError("");

        const query = coords
          ? `${coords.lat},${coords.lon}`
          : city;

        const result: WeatherData =
          await getCurrentWeather(query);

        setWeather(result);
      } catch (err) {
        console.error(err);

        setError("Unable to fetch weather.");
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [city, coords, setWeather]);

  return {
    data: weather,
    loading,
    error,
  };
}