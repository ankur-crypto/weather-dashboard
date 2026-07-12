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
      color: "text-red-400",
    },
    {
      title: "Humidity",
      value: `${current.humidity}%`,
      icon: Droplets,
      color: "text-blue-400",
    },
    {
      title: "Visibility",
      value: `${current.vis_km} km`,
      icon: Eye,
      color: "text-cyan-400",
    },
    {
      title: "Pressure",
      value: `${current.pressure_mb} mb`,
      icon: Gauge,
      color: "text-yellow-400",
    },
    {
      title: "Wind",
      value: `${current.wind_kph} km/h`,
      icon: Wind,
      color: "text-green-400",
    },
    {
      title: "Rain",
      value: `${current.precip_mm} mm`,
      icon: CloudRain,
      color: "text-indigo-400",
    },
    {
      title: "UV Index",
      value: current.uv,
      icon: Sun,
      color: "text-orange-400",
    },
    {
      title: "Condition",
      value: current.condition.text,
      icon: Cloud,
      color: "text-sky-400",
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-700 bg-[#111827]/90 p-6 backdrop-blur-md shadow-xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">
          Weather Details
        </h2>

        <p className="text-slate-400">
          Live atmospheric conditions
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {details.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl bg-slate-800 p-5 transition duration-300 hover:scale-105 hover:bg-slate-700"
            >
              <div className="mb-4 flex items-center justify-between">
                <Icon
                  size={28}
                  className={item.color}
                />

                <span className="text-xs uppercase text-slate-500">
                  Live
                </span>
              </div>

              <p className="text-sm text-slate-400">
                {item.title}
              </p>

              <h3 className="mt-2 text-2xl font-bold text-white">
                {item.value}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}