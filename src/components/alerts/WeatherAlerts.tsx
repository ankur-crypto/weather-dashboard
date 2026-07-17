"use client";

import {
  AlertTriangle,
  Thermometer,
  Wind,
  CloudRain,
  CheckCircle2,
} from "lucide-react";

import { WeatherData } from "@/types/weather";

interface Props {
  weather: WeatherData;
}

export default function WeatherAlerts({ weather }: Props) {
  if (!weather) return null;

  const current = weather.current;

  const alerts: {
    title: string;
    message: string;
    color: string;
    icon: React.ElementType;
  }[] = [];

  if (current.temp_c >= 35) {
    alerts.push({
      title: "Heat Advisory",
      message:
        "High temperatures are expected today. Stay hydrated and avoid prolonged exposure to direct sunlight.",
      color: "border-red-500",
      icon: Thermometer,
    });
  }

  if (current.wind_kph >= 30) {
    alerts.push({
      title: "Strong Wind",
      message:
        "Strong winds are expected. Secure loose objects and exercise caution while travelling.",
      color: "border-yellow-500",
      icon: Wind,
    });
  }

  if (current.precip_mm > 0) {
    alerts.push({
      title: "Rain Alert",
      message:
        "Rain is currently occurring. Carry an umbrella and drive carefully.",
      color: "border-blue-500",
      icon: CloudRain,
    });
  }

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
      <div className="mb-6 flex items-center gap-3">
        <AlertTriangle className="text-amber-500" size={28} />

        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Weather Alerts
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Current warnings based on live weather conditions
          </p>
        </div>
      </div>

      {alerts.length === 0 ? (
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
            className="text-green-500"
            size={30}
          />

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">
              All Clear
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-400">
              No active weather alerts for your current location.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert, index) => {
            const Icon = alert.icon;

            return (
              <div
                key={index}
                className={`
                  ${alert.color}
                  rounded-2xl
                  border-l-4
                  border
                  border-slate-200
                  bg-slate-100
                  p-5
                  transition-all
                  duration-300
                  hover:shadow-lg
                  dark:border-slate-700
                  dark:bg-slate-800
                `}
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-slate-200 p-3 dark:bg-slate-700">
                    <Icon
                      size={24}
                      className="text-orange-500"
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
          })}
        </div>
      )}
    </div>
  );
}