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
    <section className="mt-6">
      {/* Section Header */}

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Weather Insights
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Detailed atmospheric and environmental conditions
        </p>
      </div>

      {/* Weather Cards Grid */}

      <div
        className="
          grid
          items-stretch
          gap-6
          md:grid-cols-2
          xl:grid-cols-4
        "
      >
        {/* Air Quality Card */}

        <div className="h-full">
          <AQICard weather={weather} />
        </div>

        {/* Wind Card */}

        <div className="h-full">
          <WindCard weather={weather} />
        </div>

        {/* Sunrise & Sunset Card */}

        <div className="h-full">
          <SunriseCard weather={weather} />
        </div>

        {/* UV Index Card */}

        <div className="h-full">
          <UVCard weather={weather} />
        </div>
      </div>
    </section>
  );
}