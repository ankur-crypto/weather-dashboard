"use client";

import { WeatherData } from "@/types/weather";

import { useSettingsStore } from "@/store/settingsStore";

import {
  formatTemperature,
  formatWindSpeed,
} from "@/utils/weatherUnits";

interface Props {
  weather: WeatherData;
}

export default function WeatherTimeline({
  weather,
}: Props) {
  /*
   * Global Settings
   */
  const {
    temperatureUnit,
    windUnit,
  } = useSettingsStore();

  /*
   * Today's hourly forecast
   */
  const hours =
    weather.forecast
      .forecastday[0]?.hour ?? [];

  if (hours.length === 0) {
    return null;
  }

  return (
    <section
      className="
        mt-8
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

      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Weather Timeline
          </h2>

          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Hourly forecast for today
          </p>
        </div>

        <span
          className="
            shrink-0
            rounded-full
            bg-blue-600
            px-4
            py-2
            text-sm
            font-semibold
            text-white
          "
        >
          24 Hours
        </span>
      </div>

      {/* Timeline */}

      <div className="flex gap-4 overflow-x-auto pb-2">
        {hours.map((hour) => {
          /*
           * Fix WeatherAPI icon URL
           */
          const icon =
            hour.condition.icon.startsWith(
              "//"
            )
              ? `https:${hour.condition.icon}`
              : hour.condition.icon;

          return (
            <div
              key={hour.time_epoch}
              className="
                min-w-[120px]
                rounded-2xl
                border
                border-slate-200
                bg-slate-100
                p-4
                text-center
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-blue-400
                hover:bg-slate-200
                hover:shadow-md
                dark:border-slate-700
                dark:bg-slate-800
                dark:hover:border-blue-500
                dark:hover:bg-slate-700
              "
            >
              {/* Time */}

              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {new Date(
                  hour.time
                ).toLocaleTimeString(
                  [],
                  {
                    hour:
                      "numeric",
                  }
                )}
              </p>

              {/* Weather Icon */}

              <img
                src={icon}
                alt={
                  hour.condition
                    .text
                }
                className="mx-auto my-3 h-12 w-12"
              />

              {/* Temperature */}

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                {formatTemperature(
                  hour.temp_c,
                  temperatureUnit
                )}
              </h3>

              {/* Rain */}

              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                🌧 Rain{" "}
                {
                  hour.chance_of_rain
                }
                %
              </p>

              {/* Wind */}

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                💨{" "}
                {formatWindSpeed(
                  hour.wind_kph,
                  windUnit
                )}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}