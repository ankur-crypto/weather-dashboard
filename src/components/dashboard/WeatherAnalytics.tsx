"use client";

import {
  Thermometer,
  Droplets,
  Wind,
  CloudRain,
} from "lucide-react";

import { WeatherData } from "@/types/weather";

import { useSettingsStore } from "@/store/settingsStore";

import {
  formatTemperature,
  formatWindSpeed,
} from "@/utils/weatherUnits";

interface Props {
  weather: WeatherData;
}

export default function WeatherAnalytics({
  weather,
}: Props) {
  /*
   * Settings
   */
  const {
    temperatureUnit,
    windUnit,
  } = useSettingsStore();

  /*
   * Forecast Data
   */
  const forecast =
    weather.forecast?.forecastday ?? [];

  /*
   * Don't render analytics
   * when forecast is unavailable.
   */
  if (forecast.length === 0) {
    return null;
  }

  /*
   * Average Temperature
   *
   * WeatherAPI gives Celsius,
   * so calculate using Celsius first.
   * Convert only when displaying.
   */
  const averageTemp =
    forecast.reduce(
      (sum, day) =>
        sum +
        day.day.avgtemp_c,
      0
    ) / forecast.length;

  /*
   * Highest Temperature
   */
  const maxTemp = Math.max(
    ...forecast.map(
      (day) =>
        day.day.maxtemp_c
    )
  );

  /*
   * Lowest Temperature
   */
  const minTemp = Math.min(
    ...forecast.map(
      (day) =>
        day.day.mintemp_c
    )
  );

  /*
   * Average Humidity
   */
  const avgHumidity =
    Math.round(
      forecast.reduce(
        (sum, day) =>
          sum +
          day.day.avghumidity,
        0
      ) / forecast.length
    );

  /*
   * Average Wind Speed
   *
   * WeatherAPI provides kph.
   * Convert when displaying.
   */
  const avgWind =
    forecast.reduce(
      (sum, day) =>
        sum +
        day.day.maxwind_kph,
      0
    ) / forecast.length;

  /*
   * Rainy Days
   *
   * Use rain chance as well as
   * condition text for better
   * detection.
   */
  const rainDays =
    forecast.filter(
      (day) =>
        day.day
          .daily_chance_of_rain >
          0 ||
        day.day.condition.text
          .toLowerCase()
          .includes("rain")
    ).length;

  /*
   * Average Rain Chance
   */
  const averageRainChance =
    Math.round(
      forecast.reduce(
        (sum, day) =>
          sum +
          day.day
            .daily_chance_of_rain,
        0
      ) / forecast.length
    );

  /*
   * Analytics Cards
   */
  const cards = [
    {
      title:
        "Average Temp",

      value:
        formatTemperature(
          averageTemp,
          temperatureUnit
        ),

      icon:
        Thermometer,

      color:
        "text-orange-500 dark:text-orange-400",
    },

    {
      title:
        "Highest Temp",

      value:
        formatTemperature(
          maxTemp,
          temperatureUnit
        ),

      icon:
        Thermometer,

      color:
        "text-red-500 dark:text-red-400",
    },

    {
      title:
        "Lowest Temp",

      value:
        formatTemperature(
          minTemp,
          temperatureUnit
        ),

      icon:
        Thermometer,

      color:
        "text-cyan-500 dark:text-cyan-400",
    },

    {
      title:
        "Humidity",

      value:
        `${avgHumidity}%`,

      icon:
        Droplets,

      color:
        "text-blue-500 dark:text-blue-400",
    },

    {
      title:
        "Wind Speed",

      value:
        formatWindSpeed(
          avgWind,
          windUnit
        ),

      icon:
        Wind,

      color:
        "text-green-500 dark:text-green-400",
    },

    {
      title:
        "Rainy Days",

      value:
        `${rainDays}`,

      icon:
        CloudRain,

      color:
        "text-indigo-500 dark:text-indigo-400",
    },

    {
      title:
        "Rain Chance",

      value:
        `${averageRainChance}%`,

      icon:
        CloudRain,

      color:
        "text-sky-500 dark:text-sky-400",
    },
  ];

  return (
    <section
      className="
        mt-8
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
          Weather Analytics
        </h2>

        <p className="text-slate-500 dark:text-slate-400">
          Weekly weather insights
        </p>
      </div>

      {/* Analytics Cards */}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {cards.map(
          (card) => {
            const Icon =
              card.icon;

            return (
              <div
                key={
                  card.title
                }
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
                  <h3 className="text-slate-600 dark:text-slate-400">
                    {
                      card.title
                    }
                  </h3>

                  <Icon
                    size={24}
                    className={
                      card.color
                    }
                  />
                </div>

                <h2 className="mt-5 text-3xl font-bold text-slate-900 dark:text-white">
                  {
                    card.value
                  }
                </h2>
              </div>
            );
          }
        )}
      </div>

      {/* Weekly Summary */}

      <div
        className="
          mt-8
          rounded-2xl
          border
          border-slate-200
          bg-slate-100
          p-6
          transition-all
          duration-300
          dark:border-slate-700
          dark:bg-slate-800
        "
      >
        <h3 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
          Weekly Summary
        </h3>

        <div className="space-y-3 text-slate-700 dark:text-slate-300">
          {/* Temperature */}

          <p>
            🌡 Average
            temperature:{" "}

            <span className="font-semibold text-slate-900 dark:text-white">
              {formatTemperature(
                averageTemp,
                temperatureUnit
              )}
            </span>
          </p>

          {/* Wind */}

          <p>
            💨 Average wind
            speed:{" "}

            <span className="font-semibold text-slate-900 dark:text-white">
              {formatWindSpeed(
                avgWind,
                windUnit
              )}
            </span>
          </p>

          {/* Humidity */}

          <p>
            💧 Average
            humidity:{" "}

            <span className="font-semibold text-slate-900 dark:text-white">
              {avgHumidity}%
            </span>
          </p>

          {/* Rain Days */}

          <p>
            🌧 Rain expected
            on{" "}

            <span className="font-semibold text-slate-900 dark:text-white">
              {rainDays}
            </span>{" "}

            day(s) this week.
          </p>

          {/* Rain Chance */}

          <p>
            ☔ Average chance
            of rain:{" "}

            <span className="font-semibold text-slate-900 dark:text-white">
              {
                averageRainChance
              }
              %
            </span>
          </p>

          {/* Temperature Range */}

          <p>
            📈 Temperatures
            this week range
            from{" "}

            <span className="font-semibold text-slate-900 dark:text-white">
              {formatTemperature(
                minTemp,
                temperatureUnit
              )}
            </span>{" "}

            to{" "}

            <span className="font-semibold text-slate-900 dark:text-white">
              {formatTemperature(
                maxTemp,
                temperatureUnit
              )}
            </span>
            .
          </p>
        </div>
      </div>
    </section>
  );
}