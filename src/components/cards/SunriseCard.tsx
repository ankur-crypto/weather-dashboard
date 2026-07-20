"use client";

import {
  Sunrise,
  Sunset,
  Sun,
  Moon,
} from "lucide-react";

import { WeatherData } from "@/types/weather";

interface Props {
  weather: WeatherData;
}

export default function SunriseCard({
  weather,
}: Props) {
  /*
   * Today's Astronomy Data
   */
  const astro =
    weather.forecast
      ?.forecastday?.[0]
      ?.astro;

  /*
   * Location Local Time
   */
  const localTime =
    weather.location.localtime;

  /*
   * Return nothing if astronomy
   * data is unavailable.
   */
  if (!astro) {
    return null;
  }

  /*
   * Convert WeatherAPI 12-hour
   * time string to minutes.
   *
   * Example:
   * "06:15 AM" -> 375
   */
  const timeToMinutes = (
    time: string
  ) => {
    const [timePart, period] =
      time.trim().split(" ");

    const [
      hourString,
      minuteString,
    ] = timePart.split(":");

    let hour =
      Number(hourString);

    const minute =
      Number(minuteString);

    if (
      period?.toUpperCase() ===
        "PM" &&
      hour !== 12
    ) {
      hour += 12;
    }

    if (
      period?.toUpperCase() ===
        "AM" &&
      hour === 12
    ) {
      hour = 0;
    }

    return (
      hour * 60 +
      minute
    );
  };

  /*
   * Sunrise / Sunset
   */
  const sunriseMinutes =
    timeToMinutes(
      astro.sunrise
    );

  const sunsetMinutes =
    timeToMinutes(
      astro.sunset
    );

  /*
   * Current Local Time
   *
   * WeatherAPI:
   * YYYY-MM-DD HH:mm
   */
  const currentTimePart =
    localTime?.split(" ")[1];

  const [
    currentHour = "0",
    currentMinute = "0",
  ] =
    currentTimePart?.split(
      ":"
    ) ?? [];

  const currentMinutes =
    Number(currentHour) *
      60 +
    Number(currentMinute);

  /*
   * Daylight Duration
   */
  const daylightMinutes =
    Math.max(
      sunsetMinutes -
        sunriseMinutes,
      0
    );

  const daylightHours =
    Math.floor(
      daylightMinutes / 60
    );

  const daylightRemainingMinutes =
    daylightMinutes % 60;

  /*
   * Calculate Sun Progress
   */
  let sunProgress = 0;

  if (
    daylightMinutes <= 0 ||
    currentMinutes <=
      sunriseMinutes
  ) {
    sunProgress = 0;
  } else if (
    currentMinutes >=
    sunsetMinutes
  ) {
    sunProgress = 100;
  } else {
    sunProgress =
      ((currentMinutes -
        sunriseMinutes) /
        daylightMinutes) *
      100;
  }

  /*
   * Ensure progress remains
   * between 0 and 100.
   */
  sunProgress = Math.min(
    Math.max(
      sunProgress,
      0
    ),
    100
  );

  /*
   * Is Day
   */
  const isDay =
    weather.current.is_day ===
    1;

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
        hover:border-yellow-400
        hover:shadow-xl
        dark:border-slate-700
        dark:bg-[#111827]/80
        dark:hover:border-yellow-500
      "
    >
      {/* Header */}

      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Sunrise & Sunset
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Today&apos;s sun cycle
          </p>
        </div>

        <div
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-yellow-100
            dark:bg-yellow-900/30
          "
        >
          {isDay ? (
            <Sun
              size={24}
              className="text-yellow-500 dark:text-yellow-400"
            />
          ) : (
            <Moon
              size={24}
              className="text-indigo-500 dark:text-indigo-400"
            />
          )}
        </div>
      </div>

      {/* Sunrise */}

      <div
        className="
          flex
          items-center
          justify-between
          rounded-2xl
          bg-slate-100
          p-4
          dark:bg-slate-800
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              rounded-full
              bg-yellow-500/20
              p-3
            "
          >
            <Sunrise
              size={26}
              className="text-yellow-500 dark:text-yellow-400"
            />
          </div>

          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Sunrise
            </p>

            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              {astro.sunrise}
            </h3>
          </div>
        </div>
      </div>

      {/* Sunset */}

      <div
        className="
          mt-4
          flex
          items-center
          justify-between
          rounded-2xl
          bg-slate-100
          p-4
          dark:bg-slate-800
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              rounded-full
              bg-orange-500/20
              p-3
            "
          >
            <Sunset
              size={26}
              className="text-orange-500 dark:text-orange-400"
            />
          </div>

          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Sunset
            </p>

            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              {astro.sunset}
            </h3>
          </div>
        </div>
      </div>

      {/* Sun Cycle */}

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Sun Cycle
          </span>

          <span className="text-sm font-semibold text-slate-900 dark:text-white">
            {Math.round(
              sunProgress
            )}
            %
          </span>
        </div>

        {/* Progress Bar */}

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
            className="
              h-full
              rounded-full
              bg-gradient-to-r
              from-yellow-400
              via-orange-400
              to-red-500
              transition-all
              duration-700
            "
            style={{
              width: `${sunProgress}%`,
            }}
          />
        </div>

        {/* Daylight Duration */}

        <div
          className="
            mt-5
            rounded-xl
            bg-yellow-50
            px-4
            py-3
            text-center
            dark:bg-yellow-900/10
          "
        >
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Total Daylight
          </p>

          <p className="mt-1 font-semibold text-slate-900 dark:text-white">
            {daylightHours}h{" "}
            {daylightRemainingMinutes}m
          </p>
        </div>

        {/* Current Status */}

        <div className="mt-4 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {isDay
              ? "☀️ The sun is currently above the horizon"
              : "🌙 It is currently nighttime"}
          </p>
        </div>
      </div>
    </div>
  );
}