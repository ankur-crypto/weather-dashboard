"use client";

import { useEffect, useState } from "react";
import {
  Droplets,
  Loader2,
  MapPin,
  Trash2,
  Wind,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

import { getCurrentWeather } from "@/services/weatherApi";
import { WeatherData } from "@/types/weather";

interface Props {
  city: string;
  onSelect: () => void;
  onRemove: () => void;
}

const REFRESH_INTERVAL = 10 * 60 * 1000;

export default function FavoriteCityCard({
  city,
  onSelect,
  onRemove,
}: Props) {
  const [weather, setWeather] =
    useState<WeatherData | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [updatedAt, setUpdatedAt] =
    useState("");

  useEffect(() => {
    let mounted = true;

    async function fetchWeather() {
      try {
        if (mounted) {
          setLoading(true);
          setError("");
        }

        const result =
          await getCurrentWeather(city);

        if (!mounted) return;

        setWeather(result);
        setUpdatedAt(
          new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        );
      } catch (err) {
        console.error(err);

        if (mounted) {
          setError(
            "Unable to load weather."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchWeather();

    const interval = setInterval(
      fetchWeather,
      REFRESH_INTERVAL
    );

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [city]);

  return (
    <div
      className="
        group
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white/90
        p-6
        shadow-lg
        backdrop-blur-xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-blue-400
        hover:shadow-xl
        dark:border-slate-700
        dark:bg-[#111827]/90
        dark:hover:border-blue-500
      "
    >
      {/* Header */}

      <div className="flex items-start justify-between">
        <button
          onClick={onSelect}
          className="flex flex-1 items-start gap-3 text-left"
        >
          <div className="rounded-2xl bg-blue-100 p-3 dark:bg-blue-900/30">
            <MapPin
              size={20}
              className="text-blue-600 dark:text-blue-400"
            />
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-xl font-bold text-slate-900 dark:text-white">
              {city}
            </h3>

            {weather && (
              <p className="mt-1 truncate text-sm text-slate-500 dark:text-slate-400">
                {weather.current.condition.text}
              </p>
            )}
          </div>
        </button>

        <button
          onClick={onRemove}
          className="
            rounded-xl
            p-2
            text-red-500
            transition-all
            duration-300
            hover:scale-110
            hover:bg-red-100
            dark:hover:bg-red-900/30
          "
        >
          <Trash2 size={18} />
        </button>
      </div>

      {loading && (
        <div className="flex h-56 items-center justify-center">
          <Loader2
            size={34}
            className="animate-spin text-blue-500"
          />
        </div>
      )}

      {!loading && error && (
        <div className="flex h-56 flex-col items-center justify-center gap-3 text-center">
          <AlertCircle
            size={36}
            className="text-red-500"
          />

          <p className="text-sm text-slate-500 dark:text-slate-400">
            {error}
          </p>
        </div>
      )}

      {!loading && weather && !error && (
        <>
          <div className="mt-6 flex items-center justify-between">
            <div>
              <h2 className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-5xl font-extrabold text-transparent">
                {weather.current.temp_c}°
              </h2>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Feels like{" "}
                <span className="font-semibold">
                  {weather.current.feelslike_c}°
                </span>
              </p>
            </div>

            <img
              src={
                weather.current.condition.icon.startsWith("//")
                  ? `https:${weather.current.condition.icon}`
                  : weather.current.condition.icon
              }
              alt={weather.current.condition.text}
              loading="lazy"
              className="
                h-20
                w-20
                transition-transform
                duration-500
                group-hover:scale-110
              "
            />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-100 p-4 dark:border-slate-700 dark:bg-slate-800">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Droplets
                  size={17}
                  className="text-blue-500"
                />
                <span className="text-sm">
                  Humidity
                </span>
              </div>

              <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
                {weather.current.humidity}%
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-100 p-4 dark:border-slate-700 dark:bg-slate-800">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Wind
                  size={17}
                  className="text-cyan-500"
                />
                <span className="text-sm">
                  Wind
                </span>
              </div>

              <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
                {weather.current.wind_kph} km/h
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <RefreshCw size={14} />
              Refreshes every 10 min
            </div>

            <span>
              Updated {updatedAt}
            </span>
          </div>
        </>
      )}
    </div>
  );
}