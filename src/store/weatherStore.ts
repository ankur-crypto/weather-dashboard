import { create } from "zustand";

import { WeatherData } from "@/types/weather";

interface WeatherStore {
  city: string;

  weather: WeatherData | null;

  weatherCache: Record<string, WeatherData>;

  setCity: (city: string) => void;

  setWeather: (weather: WeatherData) => void;

  cacheWeather: (
    city: string,
    weather: WeatherData
  ) => void;
}

export const useWeatherStore =
  create<WeatherStore>((set) => ({

    city: "Agartala",

    weather: null,

    weatherCache: {},

    setCity: (city) =>
      set({
        city,
      }),

    setWeather: (weather) =>
      set({
        weather,
      }),

    cacheWeather: (
      city,
      weather
    ) =>
      set((state) => ({
        weatherCache: {
          ...state.weatherCache,
          [city]: weather,
        },
      })),
  }));