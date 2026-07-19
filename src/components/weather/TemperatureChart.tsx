"use client";

import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { WeatherData } from "@/types/weather";
import { useSettingsStore } from "@/store/settingsStore";
import { convertTemperature } from "@/utils/weatherUnits";

interface Props {
  weather: WeatherData;
}

export default function TemperatureChart({
  weather,
}: Props) {
  const { temperatureUnit } =
    useSettingsStore();

  /*
   * Get today's hourly forecast.
   */
  const hours =
    weather.forecast
      .forecastday[0]?.hour ?? [];

  /*
   * Convert WeatherAPI temperature
   * based on the selected unit.
   */
  const chartData = hours.map(
    (hour) => ({
      time: new Date(
        hour.time
      ).toLocaleTimeString(
        [],
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      ),

      temperature: Number(
        convertTemperature(
          hour.temp_c,
          temperatureUnit
        ).toFixed(1)
      ),
    })
  );

  if (chartData.length === 0) {
    return null;
  }

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
        dark:border-slate-700
        dark:bg-[#111827]/90
      "
    >
      {/* Header */}

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Temperature Trend
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Hourly temperature forecast
          for today in °{temperatureUnit}
        </p>
      </div>

      {/* Chart */}

      <div className="h-[320px] w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart
            data={chartData}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 10,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              opacity={0.2}
            />

            <XAxis
              dataKey="time"
              tick={{
                fontSize: 12,
              }}
              interval={2}
            />

            <YAxis
              tick={{
                fontSize: 12,
              }}
              unit={`°${temperatureUnit}`}
              width={55}
            />

            <Tooltip
              formatter={(
                value
              ) => [
                `${value}°${temperatureUnit}`,
                "Temperature",
              ]}
            />

            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{
                r: 3,
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}