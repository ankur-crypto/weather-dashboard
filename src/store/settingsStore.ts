import { create } from "zustand";

interface SettingsState {
  temperatureUnit: "C" | "F";
  windUnit: "kph" | "mph";
  autoRefresh: boolean;

  setTemperatureUnit: (
    unit: "C" | "F"
  ) => void;

  setWindUnit: (
    unit: "kph" | "mph"
  ) => void;

  toggleAutoRefresh: () => void;
}

export const useSettingsStore =
  create<SettingsState>((set) => ({
    temperatureUnit: "C",
    windUnit: "kph",
    autoRefresh: true,

    setTemperatureUnit: (
      temperatureUnit
    ) =>
      set({
        temperatureUnit,
      }),

    setWindUnit: (windUnit) =>
      set({
        windUnit,
      }),

    toggleAutoRefresh: () =>
      set((state) => ({
        autoRefresh:
          !state.autoRefresh,
      })),
  }));