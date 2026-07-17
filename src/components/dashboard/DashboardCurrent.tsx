"use client";

import CurrentWeather from "../weather/CurrentWeather";
import HourlyForecast from "../weather/HourlyForecast";

import { WeatherData } from "@/types/weather";

interface Props {
  weather: WeatherData;
}

export default function DashboardCurrent({
  weather,
}: Props) {
  return (
    <div className="grid gap-6 xl:grid-cols-3">
      {/* Current Weather */}

      <div className="xl:col-span-2">
        <CurrentWeather weather={weather} />
      </div>

      {/* Hourly Forecast */}

      <div className="xl:col-span-1">
        <HourlyForecast weather={weather} />
      </div>
    </div>
  );
}