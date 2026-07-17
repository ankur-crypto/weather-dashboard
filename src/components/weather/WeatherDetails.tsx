"use client";

import {
  Thermometer,
  Droplets,
  Eye,
  Gauge,
  Wind,
  CloudRain,
  Sun,
  Cloud,
} from "lucide-react";

import { WeatherData } from "@/types/weather";

interface Props {
  weather: WeatherData;
}

export default function WeatherDetails({ weather }: Props) {
  if (!weather) return null;

  const current = weather.current;

  const details = [
    {
      title: "Feels Like",
      value: `${current.feelslike_c}°C`,
      icon: Thermometer,
      color: "text-red-500 dark:text-red-400",
    },
    {
      title: "Humidity",
      value: `${current.humidity}%`,
      icon: Droplets,
      color: "text-blue-500 dark:text-blue-400",
    },
    {
      title: "Visibility",
      value: `${current.vis_km} km`,
      icon: Eye,
      color: "text-cyan-500 dark:text-cyan-400",
    },
    {
      title: "Pressure",
      value: `${current.pressure_mb} mb`,
      icon: Gauge,
      color: "text-yellow-500 dark:text-yellow-400",
    },
    {
      title: "Wind",
      value: `${current.wind_kph} km/h`,
      icon: Wind,
      color: "text-green-500 dark:text-green-400",
    },
    {
      title: "Rain",
      value: `${current.precip_mm} mm`,
      icon: CloudRain,
      color: "text-indigo-500 dark:text-indigo-400",
    },
    {
      title: "UV Index",
      value: current.uv,
      icon: Sun,
      color: "text-orange-500 dark:text-orange-400",
    },
    {
      title: "Condition",
      value: current.condition.text,
      icon: Cloud,
      color: "text-sky-500 dark:text-sky-400",
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
          Weather Details
        </h2>

        <p className="text-slate-500 dark:text-slate-400">
          Live atmospheric conditions
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {details.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
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
              <div className="mb-4 flex items-center justify-between">
                <Icon
                  size={28}
                  className={item.color}
                />

                <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
                  Live
                </span>
              </div>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                {item.title}
              </p>

              <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white break-words">
                {item.value}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}