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

import { useSettingsStore } from "@/store/settingsStore";

import {
  convertTemperature,
} from "@/utils/weatherUnits";

interface Props {
  weather: WeatherData;
}

export default function TemperatureChart({
  weather,
}: Props) {
  /*
   * Global Settings
   */
  const temperatureUnit =
    useSettingsStore(
      (state) =>
        state.temperatureUnit
    );

  /*
   * Today's Hourly Forecast
   */
  const hours =
    weather.forecast
      ?.forecastday?.[0]
      ?.hour ?? [];

  /*
   * Don't render chart if
   * hourly data is unavailable.
   */
  if (hours.length === 0) {
    return null;
  }

  /*
   * Prepare Chart Data
   *
   * WeatherAPI provides Celsius.
   * Convert temperature according
   * to the selected global setting.
   */
  const chartData =
    hours.map(
      (hour) => ({
        time: new Date(
          hour.time
        ).toLocaleTimeString(
          [],
          {
            hour:
              "numeric",
          }
        ),

        temp: Number(
          convertTemperature(
            hour.temp_c,
            temperatureUnit
          ).toFixed(1)
        ),

        rain:
          hour.chance_of_rain,
      })
    );

  return (
    <section
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

      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            24 Hour Temperature
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Hourly temperature forecast
            in °{temperatureUnit}
          </p>
        </div>

        <span
          className="
            shrink-0
            rounded-lg
            bg-blue-600
            px-3
            py-1
            text-sm
            font-medium
            text-white
          "
        >
          Today
        </span>
      </div>

      {/* Temperature Chart */}

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
            {/* Gradient */}

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

            {/* Grid */}

            <CartesianGrid
              strokeDasharray="4 4"
              stroke="currentColor"
              className="text-slate-300 dark:text-slate-700"
            />

            {/* X Axis */}

            <XAxis
              dataKey="time"
              stroke="currentColor"
              className="text-slate-500 dark:text-slate-400"
              tick={{
                fill:
                  "currentColor",
                fontSize: 12,
              }}
            />

            {/* Y Axis */}

            <YAxis
              unit={`°${temperatureUnit}`}
              stroke="currentColor"
              className="text-slate-500 dark:text-slate-400"
              tick={{
                fill:
                  "currentColor",
                fontSize: 12,
              }}
              width={60}
            />

            {/* Tooltip */}

            <Tooltip
              contentStyle={{
                backgroundColor:
                  "rgb(30 41 59)",
                border:
                  "1px solid rgb(71 85 105)",
                borderRadius:
                  "12px",
                color:
                  "#ffffff",
              }}
              formatter={(
                value
              ) => [
                `${Number(
                  value ?? 0
                ).toFixed(
                  1
                )}°${temperatureUnit}`,
                "Temperature",
              ]}
            />

            {/* Temperature Line */}

            <Line
              type="monotone"
              dataKey="temp"
              stroke="url(#tempGradient)"
              strokeWidth={4}
              dot={{
                r: 4,
                fill:
                  "#3B82F6",
              }}
              activeDot={{
                r: 7,
                fill:
                  "#2563EB",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}