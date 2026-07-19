"use client";

import DashboardCharts from "./DashboardCharts";
import DashboardDetails from "./DashboardDetails";
import DashboardHighlights from "./DashboardHighlights";
import DashboardMap from "./DashboardMap";
import WeatherAssistant from "./WeatherAssistant";
import WeatherNotifications from "./WeatherNotifications";

import WeatherNews from "../news/WeatherNews";
import WeatherHistory from "../history/WeatherHistory";
import SettingsPanel from "../settings/SettingsPanel";

import { WeatherData } from "@/types/weather";

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

export default function DashboardBottom({
  weather,
  comparisonCities,
  onCitySelect,
  onLocationSelect,
  onCurrentLocation,
  locationLoading = false,
}: Props) {
  return (
    <>
      {/* Weather Charts */}

      <DashboardCharts
        weather={weather}
      />

      {/* Weather Details */}

      <DashboardDetails
        weather={weather}
      />

      {/* Today's Highlights */}

      <DashboardHighlights
        weather={weather}
      />

      {/* Weather Map */}

      <DashboardMap
        weather={weather}
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

      {/* AI Assistant & Notifications */}

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <WeatherAssistant
          weather={weather}
        />

        <WeatherNotifications
          weather={weather}
        />
      </div>

      {/* Weather News */}

      <WeatherNews
        city={weather.location.name}
      />

      {/* Weather History */}

      <WeatherHistory
  onCitySelect={onCitySelect}
/>

      {/* Settings */}

      <SettingsPanel />
    </>
  );
}