"use client";

import {
  Wind,
  Leaf,
  Sun,
  Activity,
  AlertTriangle,
} from "lucide-react";

import { WeatherData } from "@/types/weather";

interface Props {
  weather: WeatherData;
}

function getAQIInfo(index: number) {
  switch (index) {
    case 1:
      return {
        label: "Good",
        color: "text-green-500",
        bg: "bg-green-100 dark:bg-green-900/20",
        message: "Air quality is excellent for outdoor activities.",
      };

    case 2:
      return {
        label: "Moderate",
        color: "text-yellow-500",
        bg: "bg-yellow-100 dark:bg-yellow-900/20",
        message: "Generally acceptable for most people.",
      };

    case 3:
      return {
        label: "Unhealthy for Sensitive Groups",
        color: "text-orange-500",
        bg: "bg-orange-100 dark:bg-orange-900/20",
        message: "Sensitive people should reduce prolonged outdoor activity.",
      };

    case 4:
      return {
        label: "Unhealthy",
        color: "text-red-500",
        bg: "bg-red-100 dark:bg-red-900/20",
        message: "Limit outdoor activity.",
      };

    case 5:
      return {
        label: "Very Unhealthy",
        color: "text-purple-500",
        bg: "bg-purple-100 dark:bg-purple-900/20",
        message: "Avoid prolonged outdoor exposure.",
      };

    default:
      return {
        label: "Hazardous",
        color: "text-rose-600",
        bg: "bg-rose-100 dark:bg-rose-900/20",
        message: "Stay indoors if possible.",
      };
  }
}

export default function AirQualityCard({
  weather,
}: Props) {
  const aq = weather.current.air_quality;

  const info = getAQIInfo(
    aq["us-epa-index"]
  );

  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-lg
        dark:border-slate-700
        dark:bg-slate-900
      "
    >
      <div className="flex items-center gap-3">
        <Leaf className="text-green-500" />

        <div>
          <h2 className="text-xl font-bold">
            Air Quality
          </h2>

          <p className="text-sm text-slate-500">
            EPA Air Quality Index
          </p>
        </div>
      </div>

      <div
        className={`mt-6 rounded-2xl p-5 ${info.bg}`}
      >
        <p className="text-sm text-slate-500">
          Current Status
        </p>

        <h3
          className={`mt-2 text-3xl font-bold ${info.color}`}
        >
          {info.label}
        </h3>

        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
          {info.message}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <Stat
          icon={<Activity size={18} />}
          label="PM2.5"
          value={`${aq.pm2_5.toFixed(1)} µg/m³`}
        />

        <Stat
          icon={<Wind size={18} />}
          label="PM10"
          value={`${aq.pm10.toFixed(1)} µg/m³`}
        />

        <Stat
          icon={<AlertTriangle size={18} />}
          label="CO"
          value={aq.co.toFixed(2)}
        />

        <Stat
          icon={<AlertTriangle size={18} />}
          label="NO₂"
          value={aq.no2.toFixed(2)}
        />

        <Stat
          icon={<Sun size={18} />}
          label="O₃"
          value={aq.o3.toFixed(2)}
        />

        <Stat
          icon={<Sun size={18} />}
          label="UV Index"
          value={weather.current.uv.toString()}
        />
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">
      <div className="mb-2 flex items-center gap-2 text-slate-500">
        {icon}
        <span>{label}</span>
      </div>

      <p className="text-lg font-bold">
        {value}
      </p>
    </div>
  );
}