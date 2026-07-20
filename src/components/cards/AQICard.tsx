"use client";

import {
  Wind,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react";

import { WeatherData } from "@/types/weather";

interface Props {
  weather: WeatherData;
}

export default function AQICard({
  weather,
}: Props) {
  /*
   * Air Quality Data
   */
  const airQuality =
    weather.current
      ?.air_quality;

  /*
   * US EPA AQI Index
   */
  const aqi =
    airQuality?.[
      "us-epa-index"
    ];

  /*
   * AQI Status
   */
  const getAQIStatus = (
    value?: number
  ) => {
    switch (value) {
      case 1:
        return {
          text: "Good",

          description:
            "Air quality is satisfactory and poses little or no health risk.",

          border:
            "border-green-400",

          color:
            "text-green-500 dark:text-green-400",

          background:
            "bg-green-100 dark:bg-green-900/30",

          progress:
            "bg-green-500",

          icon:
            ShieldCheck,
        };

      case 2:
        return {
          text: "Moderate",

          description:
            "Air quality is acceptable for most people.",

          border:
            "border-yellow-400",

          color:
            "text-yellow-600 dark:text-yellow-400",

          background:
            "bg-yellow-100 dark:bg-yellow-900/30",

          progress:
            "bg-yellow-500",

          icon:
            ShieldCheck,
        };

      case 3:
        return {
          text:
            "Unhealthy for Sensitive Groups",

          description:
            "Sensitive groups may experience health effects.",

          border:
            "border-orange-400",

          color:
            "text-orange-500 dark:text-orange-400",

          background:
            "bg-orange-100 dark:bg-orange-900/30",

          progress:
            "bg-orange-500",

          icon:
            ShieldAlert,
        };

      case 4:
        return {
          text: "Unhealthy",

          description:
            "Some members of the general public may experience health effects.",

          border:
            "border-red-400",

          color:
            "text-red-500 dark:text-red-400",

          background:
            "bg-red-100 dark:bg-red-900/30",

          progress:
            "bg-red-500",

          icon:
            ShieldAlert,
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

          background:
            "bg-purple-100 dark:bg-purple-900/30",

          progress:
            "bg-purple-500",

          icon:
            ShieldAlert,
        };

      case 6:
        return {
          text: "Hazardous",

          description:
            "Air quality conditions are hazardous and may affect everyone.",

          border:
            "border-red-700",

          color:
            "text-red-700 dark:text-red-500",

          background:
            "bg-red-100 dark:bg-red-950/40",

          progress:
            "bg-red-700",

          icon:
            ShieldAlert,
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

          background:
            "bg-slate-100 dark:bg-slate-800",

          progress:
            "bg-slate-400",

          icon:
            ShieldCheck,
        };
    }
  };

  const status =
    getAQIStatus(aqi);

  const StatusIcon =
    status.icon;

  /*
   * EPA Index ranges
   * from 1 to 6.
   */
  const progress =
    aqi !== undefined
      ? Math.min(
          Math.max(
            (aqi / 6) *
              100,
            0
          ),
          100
        )
      : 0;

  /*
   * Pollutant Data
   */
  const pollutants = [
    {
      name: "PM2.5",

      value:
        airQuality?.pm2_5,
    },

    {
      name: "PM10",

      value:
        airQuality?.pm10,
    },

    {
      name: "CO",

      value:
        airQuality?.co,
    },

    {
      name: "NO₂",

      value:
        airQuality?.no2,
    },

    {
      name: "SO₂",

      value:
        airQuality?.so2,
    },

    {
      name: "O₃",

      value:
        airQuality?.o3,
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
            Air Quality
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            US EPA Air Quality Index
          </p>
        </div>

        <div
          className={`
            rounded-xl
            p-3
            ${status.background}
          `}
        >
          <Wind
            size={25}
            className={
              status.color
            }
          />
        </div>
      </div>

      {/* AQI Circle */}

      <div className="flex justify-center">
        <div
          className={`
            flex
            h-40
            w-40
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

            <h1 className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">
              {aqi ?? "--"}
            </h1>

            <p
              className={`
                mt-1
                max-w-[110px]
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

      {/* AQI Progress */}

      <div className="mt-6">
        <div className="mb-2 flex justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Good</span>

          <span>Hazardous</span>
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

      {/* AQI Description */}

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

          <p className="text-xs leading-5 text-slate-600 dark:text-slate-300">
            {status.description}
          </p>
        </div>
      </div>

      {/* Pollutants */}

      {airQuality && (
        <div className="mt-6">
          <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
            Air Pollutants
          </h3>

          <div className="grid grid-cols-2 gap-2">
            {pollutants.map(
              (pollutant) => (
                <div
                  key={
                    pollutant.name
                  }
                  className="
                    rounded-xl
                    bg-slate-100
                    px-3
                    py-2.5
                    dark:bg-slate-800
                  "
                >
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {
                      pollutant.name
                    }
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                    {pollutant.value !==
                    undefined
                      ? pollutant.value.toFixed(
                          1
                        )
                      : "--"}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}