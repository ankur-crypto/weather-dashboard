"use client";

import { WeatherData } from "@/types/weather";

interface Props {
  weather: WeatherData;
}

export default function WeatherTimeline({
  weather,
}: Props) {
  const hours = weather.forecast.forecastday[0].hour;

  return (
    <div
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

      <div className="mb-6 flex items-center justify-between">
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
        {hours.map((hour) => (
          <div
            key={hour.time_epoch}
            className="
              min-w-[120px]
              rounded-2xl
              bg-slate-100
              p-4
              text-center
              transition-all
              duration-300
              hover:bg-slate-200
              dark:bg-slate-800
              dark:hover:bg-slate-700
            "
          >
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {new Date(hour.time).toLocaleTimeString([], {
                hour: "numeric",
              })}
            </p>

            <img
              src={hour.condition.icon}
              alt={hour.condition.text}
              className="mx-auto my-3 h-12 w-12"
            />

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {Math.round(hour.temp_c)}°
            </h3>

            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
              Rain {hour.chance_of_rain}%
            </p>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
              {Math.round(hour.wind_kph)} km/h
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}