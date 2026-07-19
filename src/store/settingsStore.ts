import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TemperatureUnit =
  | "C"
  | "F";

export type WindUnit =
  | "kph"
  | "mph";

interface SettingsState {
  /*
   * Temperature display unit
   */
  temperatureUnit:
    TemperatureUnit;

  /*
   * Wind speed display unit
   */
  windUnit: WindUnit;

  /*
   * Automatically refresh
   * weather data
   */
  autoRefresh: boolean;

  /*
   * Update temperature unit
   */
  setTemperatureUnit: (
    unit: TemperatureUnit
  ) => void;

  /*
   * Update wind unit
   */
  setWindUnit: (
    unit: WindUnit
  ) => void;

  /*
   * Toggle auto refresh
   */
  toggleAutoRefresh:
    () => void;

  /*
   * Directly set
   * auto refresh value
   */
  setAutoRefresh: (
    enabled: boolean
  ) => void;
}

export const useSettingsStore =
  create<SettingsState>()(
    persist(
      (set) => ({
        /*
         * Default Settings
         */

        temperatureUnit:
          "C",

        windUnit:
          "kph",

        autoRefresh:
          true,

        /*
         * Temperature Unit
         */

        setTemperatureUnit: (
          temperatureUnit
        ) =>
          set({
            temperatureUnit,
          }),

        /*
         * Wind Unit
         */

        setWindUnit: (
          windUnit
        ) =>
          set({
            windUnit,
          }),

        /*
         * Toggle Auto Refresh
         */

        toggleAutoRefresh:
          () =>
            set(
              (state) => ({
                autoRefresh:
                  !state.autoRefresh,
              })
            ),

        /*
         * Set Auto Refresh
         */

        setAutoRefresh: (
          autoRefresh
        ) =>
          set({
            autoRefresh,
          }),
      }),

      {
        /*
         * localStorage key
         */
        name:
          "weather-dashboard-settings",
      }
    )
  );