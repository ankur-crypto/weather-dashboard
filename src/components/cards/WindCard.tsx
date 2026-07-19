"use client";

import { Wind } from "lucide-react";

import { WeatherData } from "@/types/weather";
import { useSettingsStore } from "@/store/settingsStore";
import { formatWindSpeed } from "@/utils/weatherUnits";

interface Props {
  weather: WeatherData;
}

export default function WindCard({
  weather,
}: Props) {
  /*
   * Current Weather
   */
  const current =
    weather.current;

  /*
   * Settings
   */
  const {
    windUnit,
  } = useSettingsStore();

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
        hover:shadow-xl
        dark:border-slate-700
        dark:bg-[#111827]/80
      "
    >
      {/* Header */}

      <h2 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white">
        Wind
      </h2>

      {/* Wind Icon */}

      <div className="flex items-center justify-center">
        <div className="rounded-full border-4 border-cyan-400 p-8">
          <Wind
            size={60}
            className="text-cyan-500 dark:text-cyan-400"
          />
        </div>
      </div>

      {/* Wind Information */}

      <div className="mt-8 space-y-4">
        {/* Speed */}

        <div className="flex items-center justify-between">
          <span className="text-slate-600 dark:text-slate-400">
            Speed
          </span>

          <span className="font-semibold text-slate-900 dark:text-white">
            {formatWindSpeed(
              current.wind_kph,
              windUnit
            )}
          </span>
        </div>

        {/* Direction */}

        <div className="flex items-center justify-between">
          <span className="text-slate-600 dark:text-slate-400">
            Direction
          </span>

          <span className="font-semibold text-slate-900 dark:text-white">
            {current.wind_dir}
          </span>
        </div>

        {/* Pressure */}

        <div className="flex items-center justify-between">
          <span className="text-slate-600 dark:text-slate-400">
            Pressure
          </span>

          <span className="font-semibold text-slate-900 dark:text-white">
            {current.pressure_mb} hPa
          </span>
        </div>
      </div>
    </div>
  );
}