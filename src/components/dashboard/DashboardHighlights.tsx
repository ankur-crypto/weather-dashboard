"use client";

import { WeatherData } from "@/types/weather";

import { useSettingsStore } from "@/store/settingsStore";

import {
  formatTemperature,
} from "@/utils/weatherUnits";

interface Props {
  weather: WeatherData;
}

export default function DashboardHighlights({
  weather,
}: Props) {
  /*
   * Current Weather
   */
  const current =
    weather.current;

  /*
   * Global Settings
   */
  const {
    temperatureUnit,
  } = useSettingsStore();

  return (
    <section className="mt-6">
      {/* Header */}

      <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
        Today's Highlights
      </h2>

      {/* Highlights Grid */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {/* Feels Like */}

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
            hover:-translate-y-1
            hover:border-orange-400
            hover:shadow-xl
            dark:border-slate-700
            dark:bg-[#111827]/80
          "
        >
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Feels Like
          </p>

          <h3 className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">
            {formatTemperature(
              current.feelslike_c,
              temperatureUnit
            )}
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Apparent Temperature
          </p>
        </div>

        {/* Visibility */}

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
            hover:-translate-y-1
            hover:border-cyan-400
            hover:shadow-xl
            dark:border-slate-700
            dark:bg-[#111827]/80
          "
        >
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Visibility
          </p>

          <h3 className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">
            {current.vis_km} km
          </h3>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Current Visibility
          </p>
        </div>

        {/* Pressure */}

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
            hover:-translate-y-1
            hover:border-purple-400
            hover:shadow-xl
            dark:border-slate-700
            dark:bg-[#111827]/80
          "
        >
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Pressure
          </p>

          <h3 className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">
            {current.pressure_mb} hPa
          </h3>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Atmospheric Pressure
          </p>
        </div>

        {/* Weather Condition */}

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
            hover:-translate-y-1
            hover:border-blue-400
            hover:shadow-xl
            dark:border-slate-700
            dark:bg-[#111827]/80
          "
        >
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Weather
          </p>

          <h3 className="mt-3 break-words text-2xl font-bold text-slate-900 dark:text-white">
            {current.condition.text}
          </h3>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Live Weather
          </p>
        </div>
      </div>
    </section>
  );
}