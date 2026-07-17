"use client";

import {
  Thermometer,
  Droplets,
  Wind,
  CloudRain,
  Gauge,
  Eye,
} from "lucide-react";

import { WeatherData } from "@/types/weather";

interface Props {
  weather: WeatherData;
}

export default function WeatherStats({
  weather,
}: Props) {
  if (!weather) return null;

  const current = weather.current;

  const stats = [
    {
      title: "Temperature",
      value: `${current.temp_c}°C`,
      subtitle: `Feels like ${current.feelslike_c}°`,
      icon: Thermometer,
      color: "text-orange-500 dark:text-orange-400",
    },
    {
      title: "Humidity",
      value: `${current.humidity}%`,
      subtitle: "Current Humidity",
      icon: Droplets,
      color: "text-blue-500 dark:text-blue-400",
    },
    {
      title: "Wind Speed",
      value: `${current.wind_kph} km/h`,
      subtitle: current.wind_dir,
      icon: Wind,
      color: "text-green-500 dark:text-green-400",
    },
    {
      title: "Rain Chance",
      value: `${weather.forecast.forecastday[0].day.daily_chance_of_rain}%`,
      subtitle: "Today",
      icon: CloudRain,
      color: "text-cyan-500 dark:text-cyan-400",
    },
    {
      title: "Pressure",
      value: `${current.pressure_mb} mb`,
      subtitle: "Atmospheric",
      icon: Gauge,
      color: "text-purple-500 dark:text-purple-400",
    },
    {
      title: "Visibility",
      value: `${current.vis_km} km`,
      subtitle: "Visibility",
      icon: Eye,
      color: "text-indigo-500 dark:text-indigo-400",
    },
  ];

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
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Weather Statistics
        </h2>

        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Current weather overview
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="
                rounded-2xl
                border
                border-slate-200
                bg-slate-100
                p-5
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-blue-400
                hover:shadow-lg
                dark:border-slate-700
                dark:bg-slate-800
                dark:hover:border-blue-500
              "
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {stat.title}
                  </p>

                  <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {stat.subtitle}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-200 p-3 dark:bg-slate-700">
                  <Icon
                    size={30}
                    className={stat.color}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="
          mt-8
          rounded-2xl
          border
          border-slate-200
          bg-slate-100
          p-6
          dark:border-slate-700
          dark:bg-slate-800
        "
      >
        <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
          Summary
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-slate-600 dark:text-slate-400">
              Condition
            </p>

            <h4 className="font-semibold text-slate-900 dark:text-white">
              {current.condition.text}
            </h4>
          </div>

          <div>
            <p className="text-slate-600 dark:text-slate-400">
              UV Index
            </p>

            <h4 className="font-semibold text-slate-900 dark:text-white">
              {current.uv}
            </h4>
          </div>

          <div>
            <p className="text-slate-600 dark:text-slate-400">
              Cloud Cover
            </p>

            <h4 className="font-semibold text-slate-900 dark:text-white">
              {current.cloud}%
            </h4>
          </div>

          <div>
            <p className="text-slate-600 dark:text-slate-400">
              Precipitation
            </p>

            <h4 className="font-semibold text-slate-900 dark:text-white">
              {current.precip_mm} mm
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}