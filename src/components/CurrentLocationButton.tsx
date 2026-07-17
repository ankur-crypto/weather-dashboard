"use client";

import { LocateFixed, Loader2 } from "lucide-react";

import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { WeatherData } from "@/types/weather";

interface Props {
  onWeatherLoaded: (weather: WeatherData) => void;
}

export default function CurrentLocationButton({
  onWeatherLoaded,
}: Props) {
  const {
    loading,
    getLocationWeather,
  } = useCurrentLocation();

  const handleClick = async () => {
    const weather =
      await getLocationWeather();

    if (weather) {
      onWeatherLoaded(weather);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-2xl
        border
        border-blue-500
        bg-blue-600
        px-5
        py-3
        font-medium
        text-white
        shadow-lg
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:bg-blue-700
        hover:shadow-xl
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
    >
      {loading ? (
        <Loader2
          size={18}
          className="animate-spin"
        />
      ) : (
        <LocateFixed size={18} />
      )}

      <span className="hidden sm:inline">
        {loading
          ? "Detecting..."
          : "Current Location"}
      </span>
    </button>
  );
}