"use client";

import dynamic from "next/dynamic";

import WeatherAlerts from "../alerts/WeatherAlerts";

import { WeatherData } from "@/types/weather";

const WeatherMap = dynamic(
  () => import("../map/WeatherMap"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[500px] items-center justify-center rounded-3xl border border-slate-200 bg-white/90 text-slate-500 shadow-lg dark:border-slate-700 dark:bg-[#111827] dark:text-slate-400">
        Loading Map...
      </div>
    ),
  }
);

interface Props {
  weather: WeatherData;

  comparisonCities: string[];

  onCitySelect: (
    city: string
  ) => void;

  onLocationSelect: (
    lat: number,
    lon: number
  ) => void;

  onCurrentLocation: () =>
    Promise<void> | void;

  locationLoading?: boolean;
}

export default function DashboardMap({
  weather,
  comparisonCities,
  onCitySelect,
  onLocationSelect,
  onCurrentLocation,
  locationLoading = false,
}: Props) {
  return (
    <div className="mt-6 grid gap-6 xl:grid-cols-3">
      {/* Weather Map */}

      <div className="xl:col-span-2">
        <WeatherMap
          lat={weather.location.lat}
          lon={weather.location.lon}
          city={weather.location.name}
          country={weather.location.country}
          temperature={weather.current.temp_c}
          feelsLike={weather.current.feelslike_c}
          condition={weather.current.condition.text}
          icon={weather.current.condition.icon}
          humidity={weather.current.humidity}
          windSpeed={weather.current.wind_kph}
          comparisonCities={
            comparisonCities
          }
          onCitySelect={
            onCitySelect
          }
          onLocationSelect={
            onLocationSelect
          }
          onCurrentLocation={
            onCurrentLocation
          }
          locationLoading={
            locationLoading
          }
        />
      </div>

      {/* Weather Alerts */}

      <WeatherAlerts
        weather={weather}
      />
    </div>
  );
}