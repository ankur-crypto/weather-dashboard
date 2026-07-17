"use client";

import { useEffect, useState } from "react";

import { getCurrentWeather } from "@/services/weatherApi";
import { useWeatherStore } from "@/store/weatherStore";
import { useHistoryStore } from "@/store/historyStore";
import { WeatherData } from "@/types/weather";

interface Coordinates {
  lat: number;
  lon: number;
}

const REFRESH_INTERVAL = 10 * 60 * 1000; // 10 minutes

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

  const addHistory = useHistoryStore(
    (state) => state.addHistory
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

        // Save search history
        addHistory({
          city: result.location.name,
          temperature: result.current.temp_c,
          condition: result.current.condition.text,
          time: new Date().toLocaleString(),
        });
      } catch (err) {
        console.error(err);
        setError("Unable to fetch weather.");
      } finally {
        setLoading(false);
      }
    }

    // Initial fetch
    fetchWeather();

    // Auto refresh every 10 minutes
    const interval = setInterval(() => {
      fetchWeather();
    }, REFRESH_INTERVAL);

    // Cleanup
    return () => {
      clearInterval(interval);
    };
  }, [city, coords, setWeather, addHistory]);

  return {
    data: weather,
    loading,
    error,
  };
}