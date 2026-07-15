"use client";

import DashboardOverview from "./DashboardOverview";
import AddComparisonCity from "./AddComparisonCity";
import CityComparison from "./CityComparison";

import { WeatherData } from "@/types/weather";

interface Props {
  weather: WeatherData;

  favoriteCount: number;

  comparisonCities: string[];

  addCity: (city: string) => void;

  removeCity: (city: string) => void;

  onCitySelect: (city: string) => void;
}

export default function DashboardTop({
  weather,
  favoriteCount,
  comparisonCities,
  addCity,
  removeCity,
  onCitySelect,
}: Props) {
  return (
    <>
      <DashboardOverview
        weather={weather}
        favoriteCount={favoriteCount}
      />

      <AddComparisonCity
        onAdd={addCity}
      />

      <CityComparison
        cities={comparisonCities}
        onSelect={onCitySelect}
        onRemove={removeCity}
      />
    </>
  );
}