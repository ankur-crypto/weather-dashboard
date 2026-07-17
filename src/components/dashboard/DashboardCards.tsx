"use client";

import AQICard from "../cards/AQICard";
import WindCard from "../cards/WindCard";
import SunriseCard from "../cards/SunriseCard";
import UVCard from "../cards/UVCard";

import { WeatherData } from "@/types/weather";

interface Props {
  weather: WeatherData;
}

export default function DashboardCards({
  weather,
}: Props) {
  return (
    <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <AQICard weather={weather} />

      <WindCard weather={weather} />

      <SunriseCard weather={weather} />

      <UVCard weather={weather} />
    </div>
  );
}