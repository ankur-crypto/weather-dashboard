"use client";

import {
  ArrowUp,
  Gauge,
  Navigation,
  Wind,
} from "lucide-react";

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
  const current = weather.current;

  /*
   * Global Settings
   */
  const windUnit = useSettingsStore(
    (state) => state.windUnit
  );

  /*
   * Wind Direction
   *
   * WeatherAPI returns wind_degree
   * as degrees from 0 - 360.
   */
  const windDegree =
    current.wind_degree ?? 0;

  /*
   * Wind Gust
   */
  const windGust =
    current.gust_kph ?? 0;

  return (
    <div
      className="
        h-full
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
        dark:hover:border-cyan-500
      "
    >
      {/* Header */}

      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Wind
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Current wind conditions
          </p>
        </div>

        <div
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-cyan-100
            dark:bg-cyan-900/30
          "
        >
          <Wind
            size={24}
            className="text-cyan-500 dark:text-cyan-400"
          />
        </div>
      </div>

      {/* Wind Compass */}

      <div className="flex justify-center py-3">
        <div
          className="
            relative
            flex
            h-44
            w-44
            items-center
            justify-center
            rounded-full
            border-4
            border-cyan-400
            bg-cyan-50
            shadow-inner
            dark:bg-slate-800
          "
        >
          {/* Compass Labels */}

          <span className="absolute top-2 text-xs font-bold text-slate-500 dark:text-slate-400">
            N
          </span>

          <span className="absolute bottom-2 text-xs font-bold text-slate-500 dark:text-slate-400">
            S
          </span>

          <span className="absolute right-3 text-xs font-bold text-slate-500 dark:text-slate-400">
            E
          </span>

          <span className="absolute left-3 text-xs font-bold text-slate-500 dark:text-slate-400">
            W
          </span>

          {/* Rotating Direction Arrow */}

          <div
            className="
              flex
              items-center
              justify-center
              transition-transform
              duration-700
            "
            style={{
              transform: `rotate(${windDegree}deg)`,
            }}
          >
            <ArrowUp
              size={65}
              className="text-cyan-500 dark:text-cyan-400"
            />
          </div>

          {/* Direction Badge */}

          <div
            className="
              absolute
              -bottom-3
              rounded-full
              bg-cyan-600
              px-4
              py-1.5
              text-xs
              font-bold
              text-white
              shadow-md
            "
          >
            {current.wind_dir || "--"}
          </div>
        </div>
      </div>

      {/* Wind Speed */}

      <div className="mt-8 text-center">
        <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
          {formatWindSpeed(
            current.wind_kph,
            windUnit
          )}
        </h3>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Current Wind Speed
        </p>
      </div>

      {/* Wind Details */}

      <div className="mt-6 space-y-3">
        {/* Direction */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-3
            rounded-xl
            bg-slate-100
            px-4
            py-3
            dark:bg-slate-800
          "
        >
          <div className="flex items-center gap-2">
            <Navigation
              size={18}
              className="shrink-0 text-cyan-500"
            />

            <span className="text-sm text-slate-600 dark:text-slate-400">
              Direction
            </span>
          </div>

          <span className="text-right font-semibold text-slate-900 dark:text-white">
            {current.wind_dir || "--"}{" "}
            ({windDegree}°)
          </span>
        </div>

        {/* Wind Gust */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-3
            rounded-xl
            bg-slate-100
            px-4
            py-3
            dark:bg-slate-800
          "
        >
          <div className="flex items-center gap-2">
            <Wind
              size={18}
              className="shrink-0 text-blue-500"
            />

            <span className="text-sm text-slate-600 dark:text-slate-400">
              Wind Gust
            </span>
          </div>

          <span className="text-right font-semibold text-slate-900 dark:text-white">
            {formatWindSpeed(
              windGust,
              windUnit
            )}
          </span>
        </div>

        {/* Pressure */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-3
            rounded-xl
            bg-slate-100
            px-4
            py-3
            dark:bg-slate-800
          "
        >
          <div className="flex items-center gap-2">
            <Gauge
              size={18}
              className="shrink-0 text-purple-500"
            />

            <span className="text-sm text-slate-600 dark:text-slate-400">
              Pressure
            </span>
          </div>

          <span className="text-right font-semibold text-slate-900 dark:text-white">
            {current.pressure_mb} hPa
          </span>
        </div>
      </div>
    </div>
  );
}