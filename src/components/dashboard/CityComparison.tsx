"use client";

import { useEffect, useState } from "react";

import {
  MapPin,
  Trash2,
  Wind,
  Droplets,
  Eye,
  Gauge,
  Thermometer,
} from "lucide-react";

import { getCurrentWeather } from "@/services/weatherApi";
import { useWeatherStore } from "@/store/weatherStore";
import { WeatherData } from "@/types/weather";

interface Props {
  cities: string[];
  onSelect: (city: string) => void;
  onRemove: (city: string) => void;
}

export default function CityComparison({
  cities,
  onSelect,
  onRemove,
}: Props) {
  const [weatherData, setWeatherData] =
    useState<WeatherData[]>([]);

  const [loading, setLoading] =
    useState(true);

  const weatherCache = useWeatherStore(
    (state) => state.weatherCache
  );

  const cacheWeather = useWeatherStore(
    (state) => state.cacheWeather
  );

  useEffect(() => {
    async function fetchCities() {
      try {
        setLoading(true);

        const result = await Promise.all(
          cities.map(async (city) => {

            if (weatherCache[city]) {
              return weatherCache[city];
            }

            const weather =
              await getCurrentWeather(city);

            cacheWeather(city, weather);

            return weather;

          })
        );

        setWeatherData(result);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCities();

  }, [
    cities,
    weatherCache,
    cacheWeather,
  ]);

  if (loading) {
    return (
      <div className="mt-6 rounded-3xl border border-slate-700 bg-[#111827]/80 p-8 text-center text-slate-400">
        Loading comparison...
      </div>
    );
  }

  return (
    <div className="mt-6">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-3xl font-bold text-white">
          Compare Cities
        </h2>

        <p className="text-sm text-slate-400">
          {weatherData.length} Cities
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {weatherData.map((weather) => (

          <div
            key={weather.location.name}
            className="rounded-3xl border border-slate-700 bg-[#111827]/80 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-blue-500/20"
          >
                        {/* Header */}

            <div className="flex items-center justify-between">

              <button
                onClick={() =>
                  onSelect(weather.location.name)
                }
                className="flex items-center gap-2"
              >

                <MapPin
                  size={18}
                  className="text-blue-400"
                />

                <span className="font-semibold text-white">
                  {weather.location.name}
                </span>

              </button>

              <button
                onClick={() =>
                  onRemove(weather.location.name)
                }
                className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/10"
              >

                <Trash2 size={18} />

              </button>

            </div>

            {/* Current Weather */}

            <div className="mt-8 flex items-center justify-between">

              <div>

                <h2 className="text-6xl font-bold text-white">
                  {weather.current.temp_c}°
                </h2>

                <p className="mt-2 text-slate-400">
                  {weather.current.condition.text}
                </p>

              </div>

              <img
                src={weather.current.condition.icon}
                alt={weather.current.condition.text}
                className="h-20 w-20"
              />

            </div>

            {/* Weather Statistics */}

            <div className="mt-8 grid grid-cols-2 gap-4">

              <div className="rounded-2xl bg-slate-800 p-4">

                <div className="flex items-center gap-2 text-slate-400">

                  <Thermometer size={16} />

                  Feels Like

                </div>

                <p className="mt-2 font-semibold text-white">

                  {weather.current.feelslike_c}°C

                </p>

              </div>

              <div className="rounded-2xl bg-slate-800 p-4">

                <div className="flex items-center gap-2 text-slate-400">

                  <Droplets size={16} />

                  Humidity

                </div>

                <p className="mt-2 font-semibold text-white">

                  {weather.current.humidity}%

                </p>

              </div>

              <div className="rounded-2xl bg-slate-800 p-4">

                <div className="flex items-center gap-2 text-slate-400">

                  <Wind size={16} />

                  Wind

                </div>

                <p className="mt-2 font-semibold text-white">

                  {weather.current.wind_kph} km/h

                </p>

              </div>

              <div className="rounded-2xl bg-slate-800 p-4">

                <div className="flex items-center gap-2 text-slate-400">

                  <Gauge size={16} />

                  Pressure

                </div>

                <p className="mt-2 font-semibold text-white">

                  {weather.current.pressure_mb} mb

                </p>

              </div>

            </div>

            {/* Visibility */}

            <div className="mt-4 rounded-2xl bg-slate-800 p-4">

              <div className="flex items-center gap-2 text-slate-400">

                <Eye size={16} />

                Visibility

              </div>

              <p className="mt-2 font-semibold text-white">

                {weather.current.vis_km} km

              </p>

            </div>
                        {/* 5-Day Forecast */}

            <div className="mt-6">

              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
                Next 5 Days
              </h3>

              <div className="grid grid-cols-5 gap-2">

                {weather.forecast.forecastday
                  .slice(1, 6)
                  .map((day) => (

                    <div
                      key={day.date}
                      className="rounded-xl bg-slate-800 p-3 text-center transition hover:bg-slate-700"
                    >

                      <p className="text-xs text-slate-400">

                        {new Date(day.date).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "short",
                          }
                        )}

                      </p>

                      <img
                        src={day.day.condition.icon}
                        alt={day.day.condition.text}
                        className="mx-auto my-2 h-10 w-10"
                      />

                      <p className="text-sm font-semibold text-white">

                        {Math.round(day.day.avgtemp_c)}°

                      </p>

                    </div>

                  ))}

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}