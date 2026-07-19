"use client";

import { WeatherData } from "@/types/weather";

import { useSettingsStore } from "@/store/settingsStore";

import {
  formatTemperature,
} from "@/utils/weatherUnits";

interface Props {
  weather: WeatherData;
}

export default function WeeklyForecast({
  weather,
}: Props) {
  /*
   * Settings
   */
  const {
    temperatureUnit,
  } = useSettingsStore();

  /*
   * Forecast Days
   */
  const days =
    weather?.forecast
      ?.forecastday ?? [];

  if (days.length === 0) {
    return null;
  }

  return (
    <div
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
        dark:border-slate-700
        dark:bg-[#111827]/90
        dark:shadow-xl
      "
    >
      {/* Header */}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            7-Day Forecast
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Weather outlook for the next 7 days
          </p>
        </div>

        <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white">
          Weekly
        </span>
      </div>

      {/* Forecast */}

      <div className="space-y-4">
        {days.map(
          (day, index) => {
            /*
             * Fix WeatherAPI icon URL
             */
            const weatherIcon =
              day.day.condition.icon.startsWith(
                "//"
              )
                ? `https:${day.day.condition.icon}`
                : day.day.condition.icon;

            return (
              <div
                key={day.date}
                className="
                  flex
                  flex-col
                  gap-5
                  rounded-3xl
                  border
                  border-slate-200
                  bg-slate-100
                  p-5
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                  hover:border-blue-400
                  hover:bg-slate-200
                  dark:border-slate-700
                  dark:bg-slate-800/70
                  dark:hover:border-blue-500
                  dark:hover:bg-slate-700
                  md:flex-row
                  md:items-center
                  md:justify-between
                "
              >
                {/* Day */}

                <div className="w-28">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {index === 0
                      ? "Today"
                      : new Date(
                          day.date
                        ).toLocaleDateString(
                          "en-US",
                          {
                            weekday:
                              "long",
                          }
                        )}
                  </h3>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {new Date(
                      day.date
                    ).toLocaleDateString(
                      "en-US",
                      {
                        month:
                          "short",
                        day:
                          "numeric",
                      }
                    )}
                  </p>
                </div>

                {/* Weather */}

                <div className="flex items-center gap-4 md:flex-1">
                  <img
                    src={
                      weatherIcon
                    }
                    alt={
                      day.day
                        .condition
                        .text
                    }
                    className="h-14 w-14"
                  />

                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {
                        day.day
                          .condition
                          .text
                      }
                    </p>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Expected
                      conditions
                    </p>
                  </div>
                </div>

                {/* Temperature */}

                <div className="flex flex-wrap gap-3">
                  {/* Maximum Temperature */}

                  <span
                    className="
                      rounded-full
                      bg-red-100
                      px-4
                      py-2
                      font-semibold
                      text-red-600
                      dark:bg-red-500/20
                      dark:text-red-300
                    "
                    title="Maximum temperature"
                  >
                    ↑{" "}
                    {formatTemperature(
                      day.day
                        .maxtemp_c,
                      temperatureUnit
                    )}
                  </span>

                  {/* Minimum Temperature */}

                  <span
                    className="
                      rounded-full
                      bg-cyan-100
                      px-4
                      py-2
                      font-semibold
                      text-cyan-700
                      dark:bg-cyan-500/20
                      dark:text-cyan-300
                    "
                    title="Minimum temperature"
                  >
                    ↓{" "}
                    {formatTemperature(
                      day.day
                        .mintemp_c,
                      temperatureUnit
                    )}
                  </span>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}