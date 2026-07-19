"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { getCurrentWeather } from "@/services/weatherApi";

import { useWeatherStore } from "@/store/weatherStore";
import { useHistoryStore } from "@/store/historyStore";
import { useSettingsStore } from "@/store/settingsStore";

import { WeatherData } from "@/types/weather";

interface Coordinates {
  lat: number;
  lon: number;
}

const REFRESH_INTERVAL =
  10 * 60 * 1000; // 10 minutes

export function useWeather(
  city: string,
  coords?: Coordinates | null
) {
  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /*
   * Track the last location query.
   *
   * This prevents automatic refresh
   * from creating duplicate history.
   */
  const lastQueryRef =
    useRef<string>("");

  /*
   * Global Weather Store
   */

  const weather =
    useWeatherStore(
      (state) =>
        state.weather
    );

  const setWeather =
    useWeatherStore(
      (state) =>
        state.setWeather
    );

  /*
   * Weather History Store
   */

  const addHistory =
    useHistoryStore(
      (state) =>
        state.addHistory
    );

  /*
   * Settings Store
   *
   * Controls whether weather
   * automatically refreshes.
   */

  const autoRefresh =
    useSettingsStore(
      (state) =>
        state.autoRefresh
    );

  useEffect(() => {
    /*
     * Build WeatherAPI query.
     *
     * Coordinates:
     * - Current location
     * - Map click
     *
     * City:
     * - Search
     * - Favorites
     * - Recent searches
     * - Comparison cities
     * - Weather history
     */

    const query = coords
      ? `${coords.lat},${coords.lon}`
      : city.trim();

    /*
     * Prevent empty API requests.
     */

    if (!query) {
      return;
    }

    /*
     * Check if the user selected
     * a new location.
     */

    const isNewQuery =
      lastQueryRef.current !==
      query;

    /*
     * Remember current query.
     */

    lastQueryRef.current =
      query;

    /*
     * Used to prevent state updates
     * after effect cleanup.
     */

    let active = true;

    /*
     * Fetch Weather
     */

    async function fetchWeather(
      saveToHistory = false
    ) {
      try {
        /*
         * Show loading skeleton only
         * when changing location.
         *
         * Automatic refresh should
         * happen silently.
         */

        if (saveToHistory) {
          setLoading(true);
        }

        setError("");

        /*
         * Call WeatherAPI
         */

        const result:
          WeatherData =
          await getCurrentWeather(
            query
          );

        /*
         * Stop if component/effect
         * has already been cleaned up.
         */

        if (!active) {
          return;
        }

        /*
         * Update global weather.
         */

        setWeather(
          result
        );

        /*
         * Save search history only
         * for a newly selected
         * city/location.
         *
         * Automatic refreshes are
         * NOT added to history.
         */

        if (saveToHistory) {
          addHistory({
            city:
              result.location
                .name,

            temperature:
              result.current
                .temp_c,

            condition:
              result.current
                .condition
                .text,

            time:
              new Date()
                .toLocaleString(),
          });
        }
      } catch (err) {
        console.error(
          "Weather fetch error:",
          err
        );

        if (active) {
          setError(
            "Unable to fetch weather."
          );
        }
      } finally {
        /*
         * Stop loading only for
         * user-triggered/new location
         * fetches.
         */

        if (
          active &&
          saveToHistory
        ) {
          setLoading(false);
        }
      }
    }

    /*
     * Initial / Location Fetch
     *
     * If this is a new query,
     * save it to weather history.
     */

    fetchWeather(
      isNewQuery
    );

    /*
     * AUTO REFRESH
     *
     * Only create the interval
     * when Auto Refresh is ON.
     */

    let interval:
      ReturnType<
        typeof setInterval
      > | null = null;

    if (autoRefresh) {
      interval =
        setInterval(
          () => {
            /*
             * false means:
             * Don't save refresh
             * to history.
             */

            fetchWeather(
              false
            );
          },
          REFRESH_INTERVAL
        );
    }

    /*
     * Cleanup
     *
     * Runs when:
     * - City changes
     * - Coordinates change
     * - Auto Refresh changes
     * - Component unmounts
     */

    return () => {
      active = false;

      if (interval) {
        clearInterval(
          interval
        );
      }
    };
  }, [
    city,
    coords,
    autoRefresh,
    setWeather,
    addHistory,
  ]);

  return {
    data: weather,
    loading,
    error,
  };
}