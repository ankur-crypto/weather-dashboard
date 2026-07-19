"use client";

import {
  AlertTriangle,
  Thermometer,
  Wind,
  CloudRain,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";

import type { ElementType } from "react";

import { WeatherData } from "@/types/weather";

interface Props {
  weather: WeatherData;
}

interface LocalAlert {
  title: string;
  message: string;
  borderColor: string;
  iconColor: string;
  iconBackground: string;
  icon: ElementType;
}

export default function WeatherAlerts({
  weather,
}: Props) {
  if (!weather) return null;

  const current = weather.current;

  /*
   * Real alerts returned by WeatherAPI.
   *
   * This requires:
   * alerts=yes
   *
   * in the WeatherAPI forecast request.
   */
  const officialAlerts =
    weather.alerts?.alert ?? [];

  /*
   * Local alerts generated from
   * current weather conditions.
   */
  const localAlerts: LocalAlert[] = [];

  /*
   * High Temperature
   */
  if (current.temp_c >= 35) {
    localAlerts.push({
      title: "Heat Advisory",

      message:
        "High temperatures are expected. Stay hydrated and avoid prolonged exposure to direct sunlight.",

      borderColor:
        "border-l-red-500",

      iconColor:
        "text-red-500",

      iconBackground:
        "bg-red-100 dark:bg-red-900/30",

      icon: Thermometer,
    });
  }

  /*
   * Strong Wind
   */
  if (current.wind_kph >= 30) {
    localAlerts.push({
      title: "Strong Wind",

      message:
        "Strong winds are expected. Secure loose objects and exercise caution while travelling.",

      borderColor:
        "border-l-amber-500",

      iconColor:
        "text-amber-500",

      iconBackground:
        "bg-amber-100 dark:bg-amber-900/30",

      icon: Wind,
    });
  }

  /*
   * Rain
   */
  if (current.precip_mm > 0) {
    localAlerts.push({
      title: "Rain Alert",

      message:
        "Rain is currently occurring. Carry an umbrella and exercise caution while travelling.",

      borderColor:
        "border-l-blue-500",

      iconColor:
        "text-blue-500",

      iconBackground:
        "bg-blue-100 dark:bg-blue-900/30",

      icon: CloudRain,
    });
  }

  const hasAlerts =
    officialAlerts.length > 0 ||
    localAlerts.length > 0;

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
        dark:border-slate-700
        dark:bg-[#111827]/90
        dark:shadow-xl
      "
    >
      {/* Header */}

      <div className="mb-6 flex items-center gap-3">
        <div
          className="
            rounded-2xl
            bg-amber-100
            p-3
            dark:bg-amber-900/30
          "
        >
          <AlertTriangle
            className="text-amber-500"
            size={26}
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Weather Alerts
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Current warnings for{" "}
            {weather.location.name}
          </p>
        </div>
      </div>

      {/* No Alerts */}

      {!hasAlerts && (
        <div
          className="
            flex
            items-center
            gap-4
            rounded-2xl
            border
            border-green-200
            bg-green-50
            p-5
            dark:border-green-700/50
            dark:bg-green-900/20
          "
        >
          <CheckCircle2
            className="shrink-0 text-green-500"
            size={30}
          />

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">
              All Clear
            </h3>

            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              No active weather alerts
              for your current location.
            </p>
          </div>
        </div>
      )}

      {/* Alerts */}

      {hasAlerts && (
        <div className="space-y-4">
          {/* Official WeatherAPI Alerts */}

          {officialAlerts.map(
            (alert, index) => (
              <div
                key={`official-${index}`}
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  border-l-4
                  border-l-red-500
                  bg-red-50
                  p-5
                  transition-all
                  duration-300
                  hover:shadow-lg
                  dark:border-slate-700
                  dark:border-l-red-500
                  dark:bg-red-900/10
                "
              >
                <div className="flex items-start gap-4">
                  <div
                    className="
                      shrink-0
                      rounded-xl
                      bg-red-100
                      p-3
                      dark:bg-red-900/30
                    "
                  >
                    <ShieldAlert
                      size={24}
                      className="text-red-500"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {alert.headline ||
                          alert.event ||
                          "Weather Alert"}
                      </h3>

                      {alert.severity && (
                        <span
                          className="
                            rounded-full
                            bg-red-100
                            px-2.5
                            py-1
                            text-xs
                            font-semibold
                            text-red-600
                            dark:bg-red-900/30
                            dark:text-red-400
                          "
                        >
                          {alert.severity}
                        </span>
                      )}
                    </div>

                    {alert.event && (
                      <p className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                        {alert.event}
                      </p>
                    )}

                    {alert.desc && (
                      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                        {alert.desc}
                      </p>
                    )}

                    {alert.instruction && (
                      <div
                        className="
                          mt-4
                          rounded-xl
                          bg-white/70
                          p-3
                          dark:bg-slate-800/70
                        "
                      >
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                          Safety Instructions
                        </p>

                        <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-300">
                          {alert.instruction}
                        </p>
                      </div>
                    )}

                    {alert.expires && (
                      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                        Expires:{" "}
                        {alert.expires}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )
          )}

          {/* Local Weather Alerts */}

          {localAlerts.map(
            (alert, index) => {
              const Icon =
                alert.icon;

              return (
                <div
                  key={`local-${index}`}
                  className={`
                    ${alert.borderColor}
                    rounded-2xl
                    border
                    border-slate-200
                    border-l-4
                    bg-slate-50
                    p-5
                    transition-all
                    duration-300
                    hover:shadow-lg
                    dark:border-slate-700
                    dark:bg-slate-800/70
                  `}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`
                        ${alert.iconBackground}
                        shrink-0
                        rounded-xl
                        p-3
                      `}
                    >
                      <Icon
                        size={24}
                        className={
                          alert.iconColor
                        }
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {alert.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                        {alert.message}
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}