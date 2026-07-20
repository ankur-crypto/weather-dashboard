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

import type { ElementType } from "react";

import { WeatherData } from "@/types/weather";
import { useSettingsStore } from "@/store/settingsStore";

import {
  formatTemperature,
  formatWindSpeed,
} from "@/utils/weatherUnits";

interface Props {
  weather: WeatherData;
}

interface WeatherDetail {
  title: string;
  value: string;
  description: string;
  icon: ElementType;
  iconColor: string;
  iconBackground: string;
  hoverBorder: string;
}

export default function WeatherDetails({
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
    windUnit,
  } = useSettingsStore();

  /*
   * Humidity Status
   */
  const getHumidityStatus = (
    humidity: number
  ) => {
    if (humidity >= 80) {
      return "High humidity";
    }

    if (humidity >= 40) {
      return "Comfortable humidity";
    }

    return "Low humidity";
  };

  /*
   * Visibility Status
   */
  const getVisibilityStatus = (
    visibility: number
  ) => {
    if (visibility <= 1) {
      return "Very low visibility";
    }

    if (visibility <= 5) {
      return "Reduced visibility";
    }

    return "Good visibility";
  };

  /*
   * UV Status
   */
  const getUVStatus = (
    uv: number
  ) => {
    if (uv <= 2) {
      return "Low UV exposure";
    }

    if (uv <= 5) {
      return "Moderate UV exposure";
    }

    if (uv <= 7) {
      return "High UV exposure";
    }

    if (uv <= 10) {
      return "Very high UV exposure";
    }

    return "Extreme UV exposure";
  };

  /*
   * Rain Status
   */
  const getRainStatus = (
    precipitation: number
  ) => {
    if (precipitation === 0) {
      return "No current precipitation";
    }

    if (precipitation < 2.5) {
      return "Light precipitation";
    }

    if (precipitation < 10) {
      return "Moderate precipitation";
    }

    return "Heavy precipitation";
  };

  /*
   * Weather Details
   */
  const details: WeatherDetail[] = [
    {
      title: "Feels Like",

      value:
        formatTemperature(
          current.feelslike_c,
          temperatureUnit
        ),

      description:
        "Apparent temperature",

      icon: Thermometer,

      iconColor:
        "text-red-500 dark:text-red-400",

      iconBackground:
        "bg-red-100 dark:bg-red-900/30",

      hoverBorder:
        "hover:border-red-400 dark:hover:border-red-500",
    },

    {
      title: "Humidity",

      value:
        `${current.humidity}%`,

      description:
        getHumidityStatus(
          current.humidity
        ),

      icon: Droplets,

      iconColor:
        "text-blue-500 dark:text-blue-400",

      iconBackground:
        "bg-blue-100 dark:bg-blue-900/30",

      hoverBorder:
        "hover:border-blue-400 dark:hover:border-blue-500",
    },

    {
      title: "Visibility",

      value:
        `${current.vis_km} km`,

      description:
        getVisibilityStatus(
          current.vis_km
        ),

      icon: Eye,

      iconColor:
        "text-cyan-500 dark:text-cyan-400",

      iconBackground:
        "bg-cyan-100 dark:bg-cyan-900/30",

      hoverBorder:
        "hover:border-cyan-400 dark:hover:border-cyan-500",
    },

    {
      title: "Pressure",

      value:
        `${current.pressure_mb} hPa`,

      description:
        "Atmospheric pressure",

      icon: Gauge,

      iconColor:
        "text-yellow-500 dark:text-yellow-400",

      iconBackground:
        "bg-yellow-100 dark:bg-yellow-900/30",

      hoverBorder:
        "hover:border-yellow-400 dark:hover:border-yellow-500",
    },

    {
      title: "Wind",

      value:
        formatWindSpeed(
          current.wind_kph,
          windUnit
        ),

      description:
        current.wind_dir
          ? `Direction: ${current.wind_dir}`
          : "Current wind speed",

      icon: Wind,

      iconColor:
        "text-green-500 dark:text-green-400",

      iconBackground:
        "bg-green-100 dark:bg-green-900/30",

      hoverBorder:
        "hover:border-green-400 dark:hover:border-green-500",
    },

    {
      title: "Rain",

      value:
        `${current.precip_mm} mm`,

      description:
        getRainStatus(
          current.precip_mm
        ),

      icon: CloudRain,

      iconColor:
        "text-indigo-500 dark:text-indigo-400",

      iconBackground:
        "bg-indigo-100 dark:bg-indigo-900/30",

      hoverBorder:
        "hover:border-indigo-400 dark:hover:border-indigo-500",
    },

    {
      title: "UV Index",

      value:
        `${current.uv}`,

      description:
        getUVStatus(
          current.uv
        ),

      icon: Sun,

      iconColor:
        "text-orange-500 dark:text-orange-400",

      iconBackground:
        "bg-orange-100 dark:bg-orange-900/30",

      hoverBorder:
        "hover:border-orange-400 dark:hover:border-orange-500",
    },

    {
      title: "Condition",

      value:
        current.condition.text,

      description:
        "Current weather condition",

      icon: Cloud,

      iconColor:
        "text-sky-500 dark:text-sky-400",

      iconBackground:
        "bg-sky-100 dark:bg-sky-900/30",

      hoverBorder:
        "hover:border-sky-400 dark:hover:border-sky-500",
    },
  ];

  return (
    <section
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
      {/* Header */}

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Weather Details
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Live atmospheric conditions for{" "}
          {weather.location.name}
        </p>
      </div>

      {/* Weather Details Grid */}

      <div
        className="
          grid
          items-stretch
          gap-5
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        {details.map(
          (item) => {
            const Icon =
              item.icon;

            return (
              <div
                key={item.title}
                className={`
                  group
                  h-full
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50
                  p-5
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                  dark:border-slate-700
                  dark:bg-slate-800
                  ${item.hoverBorder}
                `}
              >
                {/* Icon + Live Badge */}

                <div className="mb-5 flex items-center justify-between">
                  <div
                    className={`
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-xl
                      transition-transform
                      duration-300
                      group-hover:scale-110
                      ${item.iconBackground}
                    `}
                  >
                    <Icon
                      size={25}
                      className={
                        item.iconColor
                      }
                    />
                  </div>

                  <span
                    className="
                      rounded-full
                      bg-blue-100
                      px-2.5
                      py-1
                      text-xs
                      font-medium
                      text-blue-600
                      dark:bg-blue-900/40
                      dark:text-blue-300
                    "
                  >
                    Live
                  </span>
                </div>

                {/* Title */}

                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {item.title}
                </p>

                {/* Value */}

                <h3
                  className="
                    mt-2
                    break-words
                    text-2xl
                    font-bold
                    text-slate-900
                    dark:text-white
                  "
                >
                  {item.value}
                </h3>

                {/* Description */}

                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  {item.description}
                </p>
              </div>
            );
          }
        )}
      </div>
    </section>
  );
}