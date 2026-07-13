"use client";

import TemperatureChart from "../charts/TemperatureChart";
import WeatherStats from "../charts/WeatherStats";

interface Props {
  weather: any;
}

export default function DashboardCharts({
  weather,
}: Props) {
  return (
    <>
      {/* Temperature Chart */}

      <div className="mt-6">

        <TemperatureChart
          weather={weather}
        />

      </div>

      {/* Weather Statistics */}

      <div className="mt-6">

        <WeatherStats
          weather={weather}
        />

      </div>
    </>
  );
}