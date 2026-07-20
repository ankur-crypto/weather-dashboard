"use client";

import {
  Sun,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react";

import { WeatherData } from "@/types/weather";

interface Props {
  weather: WeatherData;
}

export default function UVCard({
  weather,
}: Props) {
  /*
   * Current UV Index
   */
  const uv =
    weather.current?.uv;

  /*
   * Handle unavailable UV data
   */
  const hasUV =
    typeof uv === "number";

  /*
   * UV Status
   */
  const getUVStatus = (
    value: number
  ) => {
    if (value <= 2) {
      return {
        text: "Low",

        color:
          "text-green-500 dark:text-green-400",

        background:
          "bg-green-100 dark:bg-green-900/30",

        progress:
          "bg-green-500",

        advice:
          "Minimal protection is required. You can safely enjoy outdoor activities.",

        icon:
          ShieldCheck,
      };
    }

    if (value <= 5) {
      return {
        text: "Moderate",

        color:
          "text-yellow-600 dark:text-yellow-400",

        background:
          "bg-yellow-100 dark:bg-yellow-900/30",

        progress:
          "bg-yellow-500",

        advice:
          "Use sunscreen and consider wearing sunglasses when spending time outdoors.",

        icon:
          ShieldCheck,
      };
    }

    if (value <= 7) {
      return {
        text: "High",

        color:
          "text-orange-500 dark:text-orange-400",

        background:
          "bg-orange-100 dark:bg-orange-900/30",

        progress:
          "bg-orange-500",

        advice:
          "Use sun protection and reduce prolonged exposure to direct sunlight.",

        icon:
          ShieldAlert,
      };
    }

    if (value <= 10) {
      return {
        text: "Very High",

        color:
          "text-red-500 dark:text-red-400",

        background:
          "bg-red-100 dark:bg-red-900/30",

        progress:
          "bg-red-500",

        advice:
          "Extra protection is required. Limit direct sun exposure, especially around midday.",

        icon:
          ShieldAlert,
      };
    }

    return {
      text: "Extreme",

      color:
        "text-purple-500 dark:text-purple-400",

      background:
        "bg-purple-100 dark:bg-purple-900/30",

      progress:
        "bg-purple-500",

      advice:
        "Avoid prolonged direct sun exposure and use maximum sun protection when outdoors.",

      icon:
        ShieldAlert,
    };
  };

  /*
   * Default Status
   */
  const status =
    hasUV
      ? getUVStatus(uv)
      : {
          text: "Unavailable",

          color:
            "text-slate-500 dark:text-slate-400",

          background:
            "bg-slate-100 dark:bg-slate-800",

          progress:
            "bg-slate-400",

          advice:
            "UV index information is currently unavailable.",

          icon:
            ShieldCheck,
        };

  /*
   * Protection Icon
   */
  const StatusIcon =
    status.icon;

  /*
   * Progress Percentage
   *
   * UV scale displayed from
   * 0 to 11+.
   */
  const progress =
    hasUV
      ? Math.min(
          Math.max(
            (uv / 11) *
              100,
            0
          ),
          100
        )
      : 0;

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
        hover:shadow-xl
        dark:border-slate-700
        dark:bg-[#111827]/80
      "
    >
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            UV Index
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Sun exposure level
          </p>
        </div>

        <div
          className={`
            rounded-xl
            p-3
            ${status.background}
          `}
        >
          <Sun
            size={26}
            className={
              status.color
            }
          />
        </div>
      </div>

      {/* UV Display */}

      <div className="flex flex-col items-center justify-center">
        <div
          className={`
            flex
            h-32
            w-32
            items-center
            justify-center
            rounded-full
            ${status.background}
          `}
        >
          <Sun
            size={65}
            className={
              status.color
            }
          />
        </div>

        {/* UV Value */}

        <h1 className="mt-5 text-5xl font-bold text-slate-900 dark:text-white">
          {hasUV
            ? uv
            : "--"}
        </h1>

        {/* UV Status */}

        <p
          className={`
            mt-2
            text-lg
            font-semibold
            ${status.color}
          `}
        >
          {status.text}
        </p>
      </div>

      {/* UV Progress */}

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Low</span>

          <span>Extreme</span>
        </div>

        <div
          className="
            h-3
            overflow-hidden
            rounded-full
            bg-slate-200
            dark:bg-slate-700
          "
        >
          <div
            className={`
              h-full
              rounded-full
              transition-all
              duration-700
              ${status.progress}
            `}
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      {/* Protection Advice */}

      <div
        className={`
          mt-6
          rounded-2xl
          p-4
          ${status.background}
        `}
      >
        <div className="flex items-start gap-3">
          <StatusIcon
            size={20}
            className={`
              mt-0.5
              shrink-0
              ${status.color}
            `}
          />

          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              Sun Protection
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
              {status.advice}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}