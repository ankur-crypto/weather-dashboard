"use client";

import { WeatherData } from "@/types/weather";

interface Props {
  weather: WeatherData;
}

export default function HourlyForecast({ weather }: Props) {
  const hours = weather.forecast.forecastday[0].hour;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          24 Hour Forecast
        </h2>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          Temperature, rain and wind throughout the day
        </p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {hours.map((hour) => (
          <div
            key={hour.time_epoch}
            className="
              min-w-[120px]
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              p-4
              text-center
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-lg
              dark:border-slate-700
              dark:bg-slate-800
            "
          >
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
              {new Date(hour.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>

            <img
              src={
                hour.condition.icon.startsWith("//")
                  ? `https:${hour.condition.icon}`
                  : hour.condition.icon
              }
              alt={hour.condition.text}
              className="mx-auto my-3 h-14 w-14"
            />

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {hour.temp_c}°
            </h3>

            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              🌧 {hour.chance_of_rain}%
            </p>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              💨 {hour.wind_kph} km/h
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}