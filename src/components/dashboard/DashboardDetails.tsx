"use client";

import WeatherDetails from "../weather/WeatherDetails";

interface Props {
  weather: any;
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