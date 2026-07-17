"use client";

import WeatherDetails from "../weather/WeatherDetails";
import { WeatherData } from "@/types/weather";

interface Props {
  weather: WeatherData;
}

export default function DashboardDetails({
  weather,
}: Props) {
  return (
    <div className="mt-6">
      <WeatherDetails weather={weather} />
    </div>
  );
}