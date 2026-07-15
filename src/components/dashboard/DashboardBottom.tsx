"use client";

import DashboardCharts from "./DashboardCharts";
import DashboardDetails from "./DashboardDetails";
import DashboardHighlights from "./DashboardHighlights";
import DashboardMap from "./DashboardMap";

import { WeatherData } from "@/types/weather";

interface Props {
  weather: WeatherData;
}

export default function DashboardBottom({
  weather,
}: Props) {
  return (
    <>
      {/* Charts */}

      <DashboardCharts
        weather={weather}
      />

      {/* Details */}

      <DashboardDetails
        weather={weather}
      />

      {/* Highlights */}

      <DashboardHighlights
        weather={weather}
      />

      {/* Map */}

      <DashboardMap
        weather={weather}
      />
    </>
  );
}