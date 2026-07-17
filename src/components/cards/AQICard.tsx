"use client";

import { Wind } from "lucide-react";
import { WeatherData } from "@/types/weather";

interface Props {
  weather: WeatherData;
}

export default function AQICard({ weather }: Props) {
  const aqi = weather.current.air_quality["us-epa-index"];

  const getAQI = () => {
    switch (aqi) {
      case 1:
        return { text: "Good", color: "text-green-500 dark:text-green-400" };
      case 2:
        return {
          text: "Moderate",
          color: "text-yellow-500 dark:text-yellow-400",
        };
      case 3:
        return {
          text: "Unhealthy (Sensitive)",
          color: "text-orange-500 dark:text-orange-400",
        };
      case 4:
        return {
          text: "Unhealthy",
          color: "text-red-500 dark:text-red-400",
        };
      case 5:
        return {
          text: "Very Unhealthy",
          color: "text-purple-500 dark:text-purple-400",
        };
      case 6:
        return {
          text: "Hazardous",
          color: "text-red-700 dark:text-red-600",
        };
      default:
        return {
          text: "Unknown",
          color: "text-slate-500 dark:text-slate-400",
        };
    }
  };

  const status = getAQI();

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
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        Air Quality
      </h2>

      <div className="flex justify-center py-6">
        <div className="flex h-36 w-36 items-center justify-center rounded-full border-[12px] border-green-400">
          <div className="text-center">
            <Wind
              className="mx-auto text-green-500 dark:text-green-400"
              size={30}
            />

            <h1 className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">
              {aqi}
            </h1>

            <p className={`mt-2 text-sm font-semibold ${status.color}`}>
              {status.text}
            </p>
          </div>
        </div>
      </div>

      <p className="text-center text-sm text-slate-600 dark:text-slate-400">
        Air quality is satisfactory.
      </p>
    </div>
  );
}