"use client";

import {
  Star,
  Thermometer,
  Droplets,
  Wind,
} from "lucide-react";

import { WeatherData } from "@/types/weather";

import { useSettingsStore } from "@/store/settingsStore";

import {
  formatTemperature,
  formatWindSpeed,
} from "@/utils/weatherUnits";

interface Props {
  weather: WeatherData;
  favoriteCount: number;
}

export default function DashboardOverview({
  weather,
  favoriteCount,
}: Props) {
  /*
   * Current Weather
   */
  const current = weather.current;

  /*
   * Global Settings
   */
  const {
    temperatureUnit,
    windUnit,
  } = useSettingsStore();

  /*
   * Dashboard Overview Cards
   */
  const cards = [
    {
      title: "Favorites",

      value: favoriteCount,

      icon: (
        <Star
          className="text-yellow-500"
          size={26}
        />
      ),
    },

    {
      title: "Temperature",

      value: formatTemperature(
        current.temp_c,
        temperatureUnit
      ),

      icon: (
        <Thermometer
          className="text-red-500"
          size={26}
        />
      ),
    },

    {
      title: "Humidity",

      value: `${current.humidity}%`,

      icon: (
        <Droplets
          className="text-blue-500"
          size={26}
        />
      ),
    },

    {
      title: "Wind",

      value: formatWindSpeed(
        current.wind_kph,
        windUnit
      ),

      icon: (
        <Wind
          className="text-cyan-500"
          size={26}
        />
      ),
    },
  ];

  return (
    <section className="mb-6">
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
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
              hover:border-blue-500
              hover:shadow-xl
              dark:border-slate-700
              dark:bg-[#111827]/80
              dark:shadow-xl
              dark:hover:shadow-blue-500/10
            "
          >
            <div className="flex items-center justify-between gap-4">
              {/* Card Information */}

              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {card.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
                  {card.value}
                </h2>
              </div>

              {/* Card Icon */}

              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-slate-100
                  dark:bg-slate-800
                "
              >
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}