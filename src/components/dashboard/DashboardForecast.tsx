"use client";

import WeeklyForecast from "../weather/WeeklyForecast";
import { WeatherData } from "@/types/weather";

interface Props {
  weather: WeatherData;
}

export default function DashboardForecast({
  weather,
}: Props) {
  return (
    <div className="mt-6">
      <WeeklyForecast weather={weather} />
    </div>
  );
}