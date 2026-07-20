"use client";

import {
  Bell,
  AlertTriangle,
  ShieldAlert,
  Info,
  Clock,
} from "lucide-react";

import { WeatherData } from "@/types/weather";

import {
  getWeatherNotifications,
} from "@/utils/weatherNotifications";

import {
  useSettingsStore,
} from "@/store/settingsStore";

interface Props {
  weather: WeatherData;
}

export default function WeatherNotifications({
  weather,
}: Props) {
  /*
   * Global Settings
   */
  const {
    temperatureUnit,
    windUnit,
  } = useSettingsStore();

  /*
   * Generate Weather Notifications
   *
   * Temperature and wind values
   * inside notification messages
   * now follow global settings.
   */
  const notifications =
    getWeatherNotifications(
      weather,
      temperatureUnit,
      windUnit
    );

  /*
   * Count Important Notifications
   */
  const dangerCount =
    notifications.filter(
      (item) =>
        item.type === "danger"
    ).length;

  const warningCount =
    notifications.filter(
      (item) =>
        item.type === "warning"
    ).length;

  return (
    <section
      className="
        mt-8
        rounded-3xl
        border
        border-slate-200
        bg-white/90
        p-6
        shadow-xl
        backdrop-blur-xl
        transition-all
        duration-300
        dark:border-slate-700
        dark:bg-[#111827]/90
        dark:shadow-2xl
      "
    >
      {/* Header */}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div
            className="
              rounded-2xl
              bg-yellow-100
              p-3
              dark:bg-yellow-500/20
            "
          >
            <Bell
              className="text-yellow-500 dark:text-yellow-400"
              size={26}
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Weather Notifications
            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Live weather updates for{" "}
              {weather.location.name}
            </p>
          </div>
        </div>

        {/* Notification Count */}

        <div className="flex flex-wrap items-center gap-2">
          {dangerCount > 0 && (
            <span
              className="
                rounded-full
                bg-red-100
                px-3
                py-1.5
                text-xs
                font-semibold
                text-red-600
                dark:bg-red-900/30
                dark:text-red-400
              "
            >
              {dangerCount}{" "}
              {dangerCount === 1
                ? "Critical"
                : "Critical"}
            </span>
          )}

          {warningCount > 0 && (
            <span
              className="
                rounded-full
                bg-yellow-100
                px-3
                py-1.5
                text-xs
                font-semibold
                text-yellow-700
                dark:bg-yellow-900/30
                dark:text-yellow-400
              "
            >
              {warningCount}{" "}
              {warningCount === 1
                ? "Warning"
                : "Warnings"}
            </span>
          )}

          <span
            className="
              rounded-full
              bg-blue-100
              px-3
              py-1.5
              text-sm
              font-semibold
              text-blue-600
              dark:bg-blue-900/30
              dark:text-blue-400
            "
            title="Total notifications"
          >
            {notifications.length}
          </span>
        </div>
      </div>

      {/* Notifications */}

      <div className="space-y-4">
        {notifications.map(
          (notification) => {
            /*
             * Notification Types
             */
            const isDanger =
              notification.type ===
              "danger";

            const isWarning =
              notification.type ===
              "warning";

            /*
             * Dynamic Icon
             */
            const Icon =
              isDanger
                ? ShieldAlert
                : isWarning
                  ? AlertTriangle
                  : Info;

            /*
             * Card Styling
             */
            const cardStyle =
              isDanger
                ? `
                  border-red-200
                  border-l-red-500
                  bg-red-50
                  dark:border-red-500/30
                  dark:border-l-red-500
                  dark:bg-red-900/10
                `
                : isWarning
                  ? `
                    border-yellow-200
                    border-l-yellow-500
                    bg-yellow-50
                    dark:border-yellow-500/30
                    dark:border-l-yellow-500
                    dark:bg-yellow-900/10
                  `
                  : `
                    border-blue-200
                    border-l-blue-500
                    bg-blue-50
                    dark:border-blue-500/30
                    dark:border-l-blue-500
                    dark:bg-blue-900/10
                  `;

            /*
             * Icon Styling
             */
            const iconStyle =
              isDanger
                ? `
                  bg-red-100
                  text-red-500
                  dark:bg-red-900/30
                  dark:text-red-400
                `
                : isWarning
                  ? `
                    bg-yellow-100
                    text-yellow-600
                    dark:bg-yellow-900/30
                    dark:text-yellow-400
                  `
                  : `
                    bg-blue-100
                    text-blue-500
                    dark:bg-blue-900/30
                    dark:text-blue-400
                  `;

            return (
              <article
                key={
                  notification.id
                }
                className={`
                  ${cardStyle}
                  rounded-2xl
                  border
                  border-l-4
                  p-5
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-lg
                `}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}

                  <div
                    className={`
                      ${iconStyle}
                      shrink-0
                      rounded-xl
                      p-3
                    `}
                  >
                    <Icon
                      size={24}
                    />
                  </div>

                  {/* Content */}

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        {
                          notification.title
                        }
                      </h3>

                      {/* Time */}

                      <div className="flex shrink-0 items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                        <Clock
                          size={14}
                        />

                        Now
                      </div>
                    </div>

                    {/* Message */}

                    <p className="mt-2 leading-6 text-slate-600 dark:text-slate-300">
                      {
                        notification.message
                      }
                    </p>

                    {/* Notification Type */}

                    <div className="mt-4">
                      <span
                        className={`
                          inline-flex
                          rounded-full
                          px-2.5
                          py-1
                          text-xs
                          font-semibold
                          ${
                            isDanger
                              ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                              : isWarning
                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                          }
                        `}
                      >
                        {isDanger
                          ? "Critical"
                          : isWarning
                            ? "Warning"
                            : "Information"}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          }
        )}
      </div>
    </section>
  );
}