"use client";

import PageContainer from "@/components/layout/PageContainer";

import HourlyForecast from "@/components/weather/HourlyForecast";
import WeeklyForecast from "@/components/weather/WeeklyForecast";
import TemperatureChart from "@/components/charts/TemperatureChart";
import WeatherStats from "@/components/charts/WeatherStats";

import { useWeather } from "@/hooks/useWeather";

export default function ForecastPage() {
  const { data, loading, error } = useWeather("Agartala");

  if (loading) {
    return (
      <PageContainer
        title="Forecast"
        subtitle="Hourly and Weekly Forecast"
      >
        <div className="text-white">
          Loading...
        </div>
      </PageContainer>
    );
  }

  if (error || !data) {
    return (
      <PageContainer
        title="Forecast"
        subtitle="Hourly and Weekly Forecast"
      >
        <div className="text-red-400">
          {error}
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title="Forecast"
      subtitle="Hourly and Weekly Forecast"
    >
      <div className="space-y-6">

        <HourlyForecast weather={data} />

        <WeeklyForecast weather={data} />

        <TemperatureChart weather={data} />

        <WeatherStats weather={data} />

      </div>
    </PageContainer>
  );
}