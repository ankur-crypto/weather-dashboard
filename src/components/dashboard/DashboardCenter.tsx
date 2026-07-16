"use client";

import DashboardCurrent from "./DashboardCurrent";
import WeatherTimeline from "./WeatherTimeline";
import DashboardCards from "./DashboardCards";
import DashboardForecast from "./DashboardForecast";
import WeatherAnalytics from "./WeatherAnalytics";

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

      {/* Hourly Timeline */}

      <WeatherTimeline
        weather={weather}
      />

      {/* Weather Statistics */}

      <DashboardCards
        weather={weather}
      />

      {/* Weekly Forecast */}

      <DashboardForecast
        weather={weather}
      />

      {/* Weather Analytics */}

      <WeatherAnalytics
        weather={weather}
      />
    </>
  );
}