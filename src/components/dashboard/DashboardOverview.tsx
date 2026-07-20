"use client";

import {
  Star,
  Thermometer,
  Droplets,
  Wind,
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
  favoriteCount: number;
}

interface OverviewCard {
  title: string;
  value: string | number;
  subtitle: string;
  icon: ElementType;
  iconColor: string;
  iconBackground: string;
  hoverBorder: string;
}

export default function DashboardOverview({
  weather,
  favoriteCount,
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
   * Dashboard Overview Cards
   */
  const cards: OverviewCard[] = [
    {
      title: "Favorites",

      value: favoriteCount,

      subtitle:
        favoriteCount === 1
          ? "Saved location"
          : "Saved locations",

      icon: Star,

      iconColor:
        "text-yellow-500 dark:text-yellow-400",

      iconBackground:
        "bg-yellow-100 dark:bg-yellow-900/30",

      hoverBorder:
        "hover:border-yellow-400 dark:hover:border-yellow-500",
    },

    {
      title: "Temperature",

      value:
        formatTemperature(
          current.temp_c,
          temperatureUnit
        ),

      subtitle: `Feels like ${formatTemperature(
        current.feelslike_c,
        temperatureUnit
      )}`,

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

      subtitle:
        "Current humidity",

      icon: Droplets,

      iconColor:
        "text-blue-500 dark:text-blue-400",

      iconBackground:
        "bg-blue-100 dark:bg-blue-900/30",

      hoverBorder:
        "hover:border-blue-400 dark:hover:border-blue-500",
    },

    {
      title: "Wind",

      value:
        formatWindSpeed(
          current.wind_kph,
          windUnit
        ),

      subtitle:
        current.wind_dir
          ? `Direction: ${current.wind_dir}`
          : "Current wind speed",

      icon: Wind,

      iconColor:
        "text-cyan-500 dark:text-cyan-400",

      iconBackground:
        "bg-cyan-100 dark:bg-cyan-900/30",

      hoverBorder:
        "hover:border-cyan-400 dark:hover:border-cyan-500",
    },
  ];

  return (
    <section className="mb-6">
      {/* Overview Grid */}

      <div
        className="
          grid
          items-stretch
          gap-6
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        {cards.map(
          (card) => {
            const Icon =
              card.icon;

            return (
              <div
                key={card.title}
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
                  dark:shadow-xl
                  ${card.hoverBorder}
                `}
              >
                <div className="flex h-full items-center justify-between gap-4">
                  {/* Card Information */}

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {card.title}
                    </p>

                    <h2
                      className="
                        mt-2
                        break-words
                        text-3xl
                        font-bold
                        text-slate-900
                        dark:text-white
                      "
                    >
                      {card.value}
                    </h2>

                    <p
                      className="
                        mt-2
                        text-xs
                        text-slate-500
                        dark:text-slate-400
                      "
                    >
                      {card.subtitle}
                    </p>
                  </div>

                  {/* Card Icon */}

                  <div
                    className={`
                      flex
                      h-14
                      w-14
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      transition-transform
                      duration-300
                      group-hover:scale-110
                      ${card.iconBackground}
                    `}
                  >
                    <Icon
                      size={28}
                      className={
                        card.iconColor
                      }
                    />
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </section>
  );
}