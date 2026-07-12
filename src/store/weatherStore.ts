import { create } from "zustand";
import { WeatherData } from "@/types/weather";

interface WeatherStore {
  city: string;
  weather: WeatherData | null;

  setCity: (city: string) => void;
  setWeather: (weather: WeatherData) => void;
}

export const useWeatherStore =
  create<WeatherStore>((set) => ({
    city: "Agartala",

    weather: null,

    setCity: (city) =>
      set({
        city,
      }),

    setWeather: (weather) =>
      set({
        weather,
      }),
  }));