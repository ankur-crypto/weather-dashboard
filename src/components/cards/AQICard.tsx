"use client";

import { Wind } from "lucide-react";
import { WeatherData } from "@/types/weather";

interface Props {
  weather: WeatherData;
}

export default function AQICard({
  weather,
}: Props) {
  /*
   * Air Quality Data
   *
   * AQI may be unavailable if
   * WeatherAPI does not return it.
   */
  const aqi =
    weather.current
      .air_quality?.[
      "us-epa-index"
    ];

  /*
   * Get AQI Status
   */
  const getAQIStatus = (
    value?: number
  ) => {
    switch (value) {
      case 1:
        return {
          text: "Good",
          description:
            "Air quality is satisfactory.",
          border:
            "border-green-400",
          color:
            "text-green-500 dark:text-green-400",
        };

      case 2:
        return {
          text: "Moderate",
          description:
            "Air quality is acceptable for most people.",
          border:
            "border-yellow-400",
          color:
            "text-yellow-500 dark:text-yellow-400",
        };

      case 3:
        return {
          text:
            "Unhealthy (Sensitive)",
          description:
            "Sensitive groups may experience health effects.",
          border:
            "border-orange-400",
          color:
            "text-orange-500 dark:text-orange-400",
        };

      case 4:
        return {
          text: "Unhealthy",
          description:
            "Some people may experience health effects.",
          border:
            "border-red-400",
          color:
            "text-red-500 dark:text-red-400",
        };

      case 5:
        return {
          text:
            "Very Unhealthy",
          description:
            "Health risk is increased for everyone.",
          border:
            "border-purple-400",
          color:
            "text-purple-500 dark:text-purple-400",
        };

      case 6:
        return {
          text: "Hazardous",
          description:
            "Air quality conditions are hazardous.",
          border:
            "border-red-700",
          color:
            "text-red-700 dark:text-red-500",
        };

      default:
        return {
          text: "Unavailable",
          description:
            "Air quality information is currently unavailable.",
          border:
            "border-slate-400",
          color:
            "text-slate-500 dark:text-slate-400",
        };
    }
  };

  const status =
    getAQIStatus(aqi);

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
        hover:-translate-y-1
        hover:shadow-xl
        dark:border-slate-700
        dark:bg-[#111827]/80
      "
    >
      {/* Header */}

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        Air Quality
      </h2>

      {/* AQI Circle */}

      <div className="flex justify-center py-6">
        <div
          className={`
            flex
            h-36
            w-36
            items-center
            justify-center
            rounded-full
            border-[12px]
            ${status.border}
          `}
        >
          <div className="text-center">
            <Wind
              size={30}
              className={`
                mx-auto
                ${status.color}
              `}
            />

            {/* AQI Index */}

            <h1 className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">
              {aqi ?? "--"}
            </h1>

            {/* AQI Status */}

            <p
              className={`
                mt-2
                text-xs
                font-semibold
                ${status.color}
              `}
            >
              {status.text}
            </p>
          </div>
        </div>
      </div>

      {/* AQI Description */}

      <p className="text-center text-sm text-slate-600 dark:text-slate-400">
        {status.description}
      </p>
    </div>
  );
}