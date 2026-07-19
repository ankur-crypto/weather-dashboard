"use client";

import {
  useEffect,
  useState,
} from "react";

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
import { useSettingsStore } from "@/store/settingsStore";

import { WeatherData } from "@/types/weather";

import {
  formatTemperature,
  formatWindSpeed,
} from "@/utils/weatherUnits";

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
  /*
   * Comparison Weather Data
   */
  const [
    weatherData,
    setWeatherData,
  ] = useState<WeatherData[]>(
    []
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  /*
   * Weather Cache
   */
  const weatherCache =
    useWeatherStore(
      (state) =>
        state.weatherCache
    );

  const cacheWeather =
    useWeatherStore(
      (state) =>
        state.cacheWeather
    );

  /*
   * Settings
   */
  const {
    temperatureUnit,
    windUnit,
  } = useSettingsStore();

  /*
   * Fetch Comparison Cities
   */
  useEffect(() => {
    let active = true;

    async function fetchCities() {
      /*
       * If there are no cities,
       * clear comparison data.
       */
      if (cities.length === 0) {
        setWeatherData([]);
        setLoading(false);

        return;
      }

      try {
        setLoading(true);

        const result =
          await Promise.all(
            cities.map(
              async (city) => {
                /*
                 * Use cached weather
                 * when available.
                 */
                if (
                  weatherCache[
                    city
                  ]
                ) {
                  return weatherCache[
                    city
                  ];
                }

                /*
                 * Fetch WeatherAPI
                 */
                const weather =
                  await getCurrentWeather(
                    city
                  );

                /*
                 * Save weather
                 * to cache.
                 */
                cacheWeather(
                  city,
                  weather
                );

                return weather;
              }
            )
          );

        if (active) {
          setWeatherData(
            result
          );
        }
      } catch (error) {
        console.error(
          "City comparison error:",
          error
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchCities();

    return () => {
      active = false;
    };
  }, [
    cities,
    weatherCache,
    cacheWeather,
  ]);

  /*
   * Loading
   */
  if (loading) {
    return (
      <div
        className="
          mt-6
          rounded-3xl
          border
          border-slate-200
          bg-white/90
          p-8
          text-center
          text-slate-500
          shadow-lg
          dark:border-slate-700
          dark:bg-[#111827]/80
          dark:text-slate-400
          dark:shadow-xl
        "
      >
        Loading comparison...
      </div>
    );
  }

  /*
   * Don't show comparison
   * when no cities exist.
   */
  if (
    weatherData.length === 0
  ) {
    return null;
  }

  return (
    <section className="mt-6">
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Compare Cities
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Compare weather conditions
            across different locations
          </p>
        </div>

        <span
          className="
            rounded-full
            bg-blue-100
            px-4
            py-2
            text-sm
            font-semibold
            text-blue-600
            dark:bg-blue-900/30
            dark:text-blue-400
          "
        >
          {weatherData.length}{" "}
          {weatherData.length === 1
            ? "City"
            : "Cities"}
        </span>
      </div>

      {/* City Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {weatherData.map(
          (weather) => {
            const current =
              weather.current;

            const location =
              weather.location;

            /*
             * WeatherAPI Icon
             */
            const currentIcon =
              current.condition.icon.startsWith(
                "//"
              )
                ? `https:${current.condition.icon}`
                : current.condition.icon;

            return (
              <article
                key={
                  location.name
                }
                className="
                  rounded-3xl
                  border
                  border-slate-200
                  bg-white/90
                  p-6
                  shadow-lg
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-blue-500
                  hover:shadow-xl
                  dark:border-slate-700
                  dark:bg-[#111827]/80
                  dark:shadow-xl
                  dark:hover:shadow-blue-500/20
                "
              >
                {/* Header */}

                <div className="flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      onSelect(
                        location.name
                      )
                    }
                    className="
                      flex
                      min-w-0
                      items-center
                      gap-2
                      text-left
                      transition-colors
                      hover:text-blue-500
                    "
                  >
                    <MapPin
                      size={18}
                      className="shrink-0 text-blue-500"
                    />

                    <span className="truncate font-semibold text-slate-900 dark:text-white">
                      {
                        location.name
                      }
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onRemove(
                        location.name
                      )
                    }
                    aria-label={`Remove ${location.name} from comparison`}
                    className="
                      shrink-0
                      rounded-lg
                      p-2
                      text-red-500
                      transition-all
                      hover:bg-red-500/10
                    "
                  >
                    <Trash2
                      size={18}
                    />
                  </button>
                </div>

                {/* Current Weather */}

                <div className="mt-8 flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-5xl font-bold text-slate-900 dark:text-white sm:text-6xl">
                      {formatTemperature(
                        current.temp_c,
                        temperatureUnit
                      )}
                    </h2>

                    <p className="mt-2 text-slate-500 dark:text-slate-400">
                      {
                        current
                          .condition
                          .text
                      }
                    </p>
                  </div>

                  <img
                    src={
                      currentIcon
                    }
                    alt={
                      current
                        .condition
                        .text
                    }
                    className="h-20 w-20"
                  />
                </div>

                {/* Weather Statistics */}

                <div className="mt-8 grid grid-cols-2 gap-4">
                  {/* Feels Like */}

                  <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <Thermometer
                        size={16}
                      />

                      Feels Like
                    </div>

                    <p className="mt-2 font-semibold text-slate-900 dark:text-white">
                      {formatTemperature(
                        current.feelslike_c,
                        temperatureUnit
                      )}
                    </p>
                  </div>

                  {/* Humidity */}

                  <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <Droplets
                        size={16}
                      />

                      Humidity
                    </div>

                    <p className="mt-2 font-semibold text-slate-900 dark:text-white">
                      {
                        current.humidity
                      }
                      %
                    </p>
                  </div>

                  {/* Wind */}

                  <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <Wind
                        size={16}
                      />

                      Wind
                    </div>

                    <p className="mt-2 font-semibold text-slate-900 dark:text-white">
                      {formatWindSpeed(
                        current.wind_kph,
                        windUnit
                      )}
                    </p>
                  </div>

                  {/* Pressure */}

                  <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <Gauge
                        size={16}
                      />

                      Pressure
                    </div>

                    <p className="mt-2 font-semibold text-slate-900 dark:text-white">
                      {
                        current.pressure_mb
                      }{" "}
                      hPa
                    </p>
                  </div>
                </div>

                {/* Visibility */}

                <div className="mt-4 rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <Eye
                      size={16}
                    />

                    Visibility
                  </div>

                  <p className="mt-2 font-semibold text-slate-900 dark:text-white">
                    {
                      current.vis_km
                    }{" "}
                    km
                  </p>
                </div>

                {/* 5-Day Forecast */}

                <div className="mt-6">
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Next 5 Days
                  </h3>

                  <div className="grid grid-cols-5 gap-2">
                    {weather.forecast.forecastday
                      .slice(
                        1,
                        6
                      )
                      .map(
                        (day) => {
                          const dayIcon =
                            day.day.condition.icon.startsWith(
                              "//"
                            )
                              ? `https:${day.day.condition.icon}`
                              : day.day.condition.icon;

                          return (
                            <div
                              key={
                                day.date
                              }
                              className="
                                rounded-xl
                                bg-slate-100
                                p-3
                                text-center
                                transition
                                hover:bg-slate-200
                                dark:bg-slate-800
                                dark:hover:bg-slate-700
                              "
                            >
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                {new Date(
                                  day.date
                                ).toLocaleDateString(
                                  "en-US",
                                  {
                                    weekday:
                                      "short",
                                  }
                                )}
                              </p>

                              <img
                                src={
                                  dayIcon
                                }
                                alt={
                                  day
                                    .day
                                    .condition
                                    .text
                                }
                                className="mx-auto my-2 h-10 w-10"
                              />

                              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                {formatTemperature(
                                  day
                                    .day
                                    .avgtemp_c,
                                  temperatureUnit
                                )}
                              </p>
                            </div>
                          );
                        }
                      )}
                  </div>
                </div>
              </article>
            );
          }
        )}
      </div>
    </section>
  );
}