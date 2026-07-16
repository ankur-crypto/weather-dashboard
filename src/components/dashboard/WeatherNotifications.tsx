"use client";

import {
  Bell,
  AlertTriangle,
  ShieldAlert,
  Info,
  Clock,
} from "lucide-react";

import { WeatherData } from "@/types/weather";
import { getWeatherNotifications } from "@/utils/weatherNotifications";

interface Props {
  weather: WeatherData;
}

export default function WeatherNotifications({
  weather,
}: Props) {
  const notifications =
    getWeatherNotifications(weather);

  return (
    <div className="mt-8 rounded-3xl border border-slate-700 bg-[#111827]/90 p-6 shadow-2xl backdrop-blur-xl">
      {/* Header */}

      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell
            className="text-yellow-400"
            size={28}
          />

          <div>
            <h2 className="text-2xl font-bold text-white">
              Weather Notifications
            </h2>

            <p className="text-sm text-slate-400">
              Live weather alerts
            </p>
          </div>
        </div>

        <span className="rounded-full bg-blue-600 px-3 py-1 text-sm font-medium text-white">
          {notifications.length}
        </span>
      </div>

      <div className="space-y-5">
        {notifications.map(
          (notification) => {
            const color =
              notification.type ===
              "danger"
                ? "border-red-500 bg-red-500/10"
                : notification.type ===
                  "warning"
                ? "border-yellow-500 bg-yellow-500/10"
                : "border-blue-500 bg-blue-500/10";

            const Icon =
              notification.type ===
              "danger"
                ? ShieldAlert
                : notification.type ===
                  "warning"
                ? AlertTriangle
                : Info;

            return (
              <div
                key={notification.id}
                className={`rounded-2xl border p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${color}`}
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-slate-900 p-3">
                    <Icon
                      size={24}
                      className="text-white"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">
                        {notification.title}
                      </h3>

                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock size={14} />
                        Now
                      </div>
                    </div>

                    <p className="mt-2 leading-6 text-slate-300">
                      {notification.message}
                    </p>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}