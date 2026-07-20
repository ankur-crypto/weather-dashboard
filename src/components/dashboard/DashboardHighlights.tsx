"use client";

import {
  Thermometer,
  Eye,
  Gauge,
  CloudSun,
} from "lucide-react";

import type { ElementType } from "react";

import { WeatherData } from "@/types/weather";
import { useSettingsStore } from "@/store/settingsStore";

import {
  formatTemperature,
} from "@/utils/weatherUnits";

interface Props {
  weather: WeatherData;
}

interface HighlightCard {
  title: string;
  value: string;
  subtitle: string;
  icon: ElementType;
  iconColor: string;
  iconBackground: string;
  hoverBorder: string;
}

export default function DashboardHighlights({
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
  const temperatureUnit =
    useSettingsStore(
      (state) =>
        state.temperatureUnit
    );

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

    if (visibility <= 10) {
      return "Moderate visibility";
    }

    return "Good visibility";
  };

  /*
   * Pressure Status
   */
  const getPressureStatus = (
    pressure: number
  ) => {
    if (pressure < 1000) {
      return "Low atmospheric pressure";
    }

    if (pressure > 1020) {
      return "High atmospheric pressure";
    }

    return "Normal atmospheric pressure";
  };

  /*
   * Highlight Cards
   */
  const highlights: HighlightCard[] = [
    {
      title: "Feels Like",

      value:
        formatTemperature(
          current.feelslike_c,
          temperatureUnit
        ),

      subtitle:
        "Apparent temperature",

      icon: Thermometer,

      iconColor:
        "text-orange-500 dark:text-orange-400",

      iconBackground:
        "bg-orange-100 dark:bg-orange-900/30",

      hoverBorder:
        "hover:border-orange-400 dark:hover:border-orange-500",
    },

    {
      title: "Visibility",

      value:
        `${current.vis_km} km`,

      subtitle:
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

      subtitle:
        getPressureStatus(
          current.pressure_mb
        ),

      icon: Gauge,

      iconColor:
        "text-purple-500 dark:text-purple-400",

      iconBackground:
        "bg-purple-100 dark:bg-purple-900/30",

      hoverBorder:
        "hover:border-purple-400 dark:hover:border-purple-500",
    },

    {
      title: "Weather",

      value:
        current.condition.text,

      subtitle:
        "Live weather condition",

      icon: CloudSun,

      iconColor:
        "text-blue-500 dark:text-blue-400",

      iconBackground:
        "bg-blue-100 dark:bg-blue-900/30",

      hoverBorder:
        "hover:border-blue-400 dark:hover:border-blue-500",
    },
  ];

  return (
    <section className="mt-6">
      {/* Header */}

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Today's Highlights
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Current weather conditions at a glance
        </p>
      </div>

      {/* Highlights Grid */}

      <div
        className="
          grid
          items-stretch
          gap-6
          md:grid-cols-2
          xl:grid-cols-4
        "
      >
        {highlights.map(
          (item) => {
            const Icon =
              item.icon;

            return (
              <div
                key={item.title}
                className={`
                  group
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
                  ${item.hoverBorder}
                `}
              >
                {/* Top */}

                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {item.title}
                    </p>

                    <h3
                      className="
                        mt-3
                        break-words
                        text-3xl
                        font-bold
                        text-slate-900
                        dark:text-white
                      "
                    >
                      {item.value}
                    </h3>
                  </div>

                  {/* Icon */}

                  <div
                    className={`
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
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
                </div>

                {/* Subtitle */}

                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                  {item.subtitle}
                </p>
              </div>
            );
          }
        )}
      </div>
    </section>
  );
}