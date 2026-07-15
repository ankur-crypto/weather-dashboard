"use client";

import DashboardTop from "./DashboardTop";
import DashboardCenter from "./DashboardCenter";
import DashboardBottom from "./DashboardBottom";

import { WeatherData } from "@/types/weather";

interface Props {
  weather: WeatherData;

  favoriteCount: number;

  comparisonCities: string[];

  addCity: (city: string) => void;

  removeCity: (city: string) => void;

  onCitySelect: (city: string) => void;
}

export default function DashboardMain({
  weather,
  favoriteCount,
  comparisonCities,
  addCity,
  removeCity,
  onCitySelect,
}: Props) {
  return (
    <>
      <DashboardTop
        weather={weather}
        favoriteCount={favoriteCount}
        comparisonCities={comparisonCities}
        addCity={addCity}
        removeCity={removeCity}
        onCitySelect={onCitySelect}
      />

      <DashboardCenter
        weather={weather}
      />

      <DashboardBottom
        weather={weather}
      />
    </>
  );
}