"use client";

import { useEffect, useState } from "react";
import {
  MapPin,
  Trash2,
  Wind,
  Droplets,
} from "lucide-react";

import { getCurrentWeather } from "@/services/weatherApi";
import { WeatherData } from "@/types/weather";

interface Props {
  city: string;
  onSelect: () => void;
  onRemove: () => void;
}

export default function FavoriteCityCard({
  city,
  onSelect,
  onRemove,
}: Props) {
  const [weather, setWeather] =
    useState<WeatherData | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        setLoading(true);

        const result =
          await getCurrentWeather(city);

        setWeather(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [city]);

  return (
    <div className="rounded-3xl border border-slate-700 bg-slate-800 p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-2xl">

      <div className="flex items-start justify-between">

        <button
          onClick={onSelect}
          className="flex flex-1 items-start gap-3 text-left"
        >
          <MapPin
            size={20}
            className="mt-1 text-blue-400"
          />

          <div>

            <h3 className="text-lg font-semibold text-white">
              {city}
            </h3>

            {weather && (

              <p className="text-sm text-slate-400">

                {weather.current.condition.text}

              </p>

            )}

          </div>

        </button>

        <button
          onClick={onRemove}
          className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
        >
          <Trash2 size={18} />
        </button>

      </div>

      {loading && (

        <p className="mt-5 text-sm text-slate-500">
          Loading...
        </p>

      )}

      {weather && (

        <>
          <div className="mt-6 flex items-center justify-between">

            <h2 className="text-5xl font-bold text-white">

              {weather.current.temp_c}°

            </h2>

            <img
              src={weather.current.condition.icon}
              alt={weather.current.condition.text}
              className="h-16 w-16"
            />

          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">

            <div className="rounded-xl bg-slate-700 p-3">

              <div className="flex items-center gap-2 text-slate-400">

                <Droplets size={16} />

                Humidity

              </div>

              <p className="mt-2 text-lg font-semibold text-white">

                {weather.current.humidity}%

              </p>

            </div>

            <div className="rounded-xl bg-slate-700 p-3">

              <div className="flex items-center gap-2 text-slate-400">

                <Wind size={16} />

                Wind

              </div>

              <p className="mt-2 text-lg font-semibold text-white">

                {weather.current.wind_kph} km/h

              </p>

            </div>

          </div>
        </>
      )}

    </div>
  );
}