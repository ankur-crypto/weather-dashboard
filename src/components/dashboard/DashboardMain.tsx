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

  onLocationSelect: (
    lat: number,
    lon: number
  ) => void;

  onCurrentLocation: () =>
    Promise<void> | void;

  locationLoading?: boolean;
}

export default function DashboardMain({
  weather,
  favoriteCount,
  comparisonCities,
  addCity,
  removeCity,
  onCitySelect,
  onLocationSelect,
  onCurrentLocation,
  locationLoading = false,
}: Props) {
  return (
    <>
      {/* Dashboard Top */}

      <DashboardTop
        weather={weather}
        favoriteCount={favoriteCount}
        comparisonCities={comparisonCities}
        addCity={addCity}
        removeCity={removeCity}
        onCitySelect={onCitySelect}
      />

      {/* Dashboard Center */}

      <DashboardCenter
        weather={weather}
      />

      {/* Dashboard Bottom */}

      <DashboardBottom
        weather={weather}
        comparisonCities={comparisonCities}
        onCitySelect={onCitySelect}
        onLocationSelect={onLocationSelect}
        onCurrentLocation={onCurrentLocation}
        locationLoading={locationLoading}
      />
    </>
  );
}