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

interface Props {
  weather: any;
}

export default function TemperatureChart({ weather }: Props) {
  if (!weather) return null;

  const chartData = weather.forecast.forecastday[0].hour.map(
    (hour: any) => ({
      time: new Date(hour.time).toLocaleTimeString([], {
        hour: "numeric",
      }),
      temp: hour.temp_c,
      rain: hour.chance_of_rain,
    })
  );

  return (
    <div className="rounded-3xl border border-slate-700 bg-[#111827]/90 backdrop-blur-md p-6 shadow-xl">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">
          24 Hour Temperature
        </h2>

        <span className="rounded-lg bg-blue-600 px-3 py-1 text-sm text-white">
          Today
        </span>
      </div>

      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
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
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="50%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#6366F1" />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#334155"
            />

            <XAxis
              dataKey="time"
              stroke="#94A3B8"
              tick={{ fill: "#CBD5E1", fontSize: 12 }}
            />

            <YAxis
              stroke="#94A3B8"
              tick={{ fill: "#CBD5E1", fontSize: 12 }}
              unit="°"
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#1E293B",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#fff",
              }}
              formatter={(value: number) => [`${value}°C`, "Temperature"]}
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
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}