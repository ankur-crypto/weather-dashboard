"use client";

import DashboardCurrent from "./DashboardCurrent";
import WeatherTimeline from "./WeatherTimeline";
import DashboardCards from "./DashboardCards";
import DashboardForecast from "./DashboardForecast";

import { WeatherData } from "@/types/weather";

interface Props {
  weather: WeatherData;
}

export default function DashboardCenter({
  weather,
}: Props) {
  return (
    <>
      {/* Current Weather */}

      <DashboardCurrent
        weather={weather}
      />

      {/* Timeline */}

      <WeatherTimeline
        weather={weather}
      />

      {/* Cards */}

      <DashboardCards
        weather={weather}
      />

      {/* Weekly Forecast */}

      <DashboardForecast
        weather={weather}
      />
    </>
  );
}