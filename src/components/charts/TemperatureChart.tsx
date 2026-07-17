"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { WeatherData } from "@/types/weather";

interface Props {
  weather: WeatherData;
}

export default function TemperatureChart({
  weather,
}: Props) {
  if (!weather) return null;

  const chartData =
    weather.forecast.forecastday[0].hour.map((hour) => ({
      time: new Date(hour.time).toLocaleTimeString([], {
        hour: "numeric",
      }),
      temp: hour.temp_c,
      rain: hour.chance_of_rain,
    }));

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

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          24 Hour Temperature
        </h2>

        <span className="rounded-lg bg-blue-600 px-3 py-1 text-sm font-medium text-white">
          Today
        </span>
      </div>

      <div className="h-[350px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 10,
            }}
          >
            <defs>
              <linearGradient
                id="tempGradient"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop
                  offset="0%"
                  stopColor="#38BDF8"
                />
                <stop
                  offset="50%"
                  stopColor="#3B82F6"
                />
                <stop
                  offset="100%"
                  stopColor="#6366F1"
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              stroke="currentColor"
              className="text-slate-300 dark:text-slate-700"
            />

            <XAxis
              dataKey="time"
              stroke="currentColor"
              className="text-slate-500 dark:text-slate-400"
              tick={{
                fill: "currentColor",
                fontSize: 12,
              }}
            />

            <YAxis
              unit="°"
              stroke="currentColor"
              className="text-slate-500 dark:text-slate-400"
              tick={{
                fill: "currentColor",
                fontSize: 12,
              }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "rgb(30 41 59)",
                border: "1px solid rgb(71 85 105)",
                borderRadius: "12px",
                color: "#ffffff",
              }}
              formatter={(value) => [
                `${Number(value ?? 0)}°C`,
                "Temperature",
              ]}
            />

            <Line
              type="monotone"
              dataKey="temp"
              stroke="url(#tempGradient)"
              strokeWidth={4}
              dot={{
                r: 4,
                fill: "#3B82F6",
              }}
              activeDot={{
                r: 7,
                fill: "#2563EB",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}