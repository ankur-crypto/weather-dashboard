"use client";

import WeeklyForecast from "../weather/WeeklyForecast";

interface Props {
  weather: any;
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