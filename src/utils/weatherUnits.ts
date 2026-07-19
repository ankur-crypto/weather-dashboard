import type {
  TemperatureUnit,
  WindUnit,
} from "@/store/settingsStore";

/*
 * Convert Celsius to the
 * selected temperature unit.
 */
export function convertTemperature(
  celsius: number,
  unit: TemperatureUnit
): number {
  if (unit === "F") {
    return (
      (celsius * 9) / 5 + 32
    );
  }

  return celsius;
}

/*
 * Format temperature for UI.
 *
 * Example:
 * 28°C
 * 82°F
 */
export function formatTemperature(
  celsius: number,
  unit: TemperatureUnit
): string {
  const value =
    convertTemperature(
      celsius,
      unit
    );

  return `${Math.round(
    value
  )}°${unit}`;
}

/*
 * Convert km/h to the
 * selected wind speed unit.
 */
export function convertWindSpeed(
  kph: number,
  unit: WindUnit
): number {
  if (unit === "mph") {
    return kph * 0.621371;
  }

  return kph;
}

/*
 * Format wind speed for UI.
 *
 * Example:
 * 15 km/h
 * 9 mph
 */
export function formatWindSpeed(
  kph: number,
  unit: WindUnit
): string {
  const value =
    convertWindSpeed(
      kph,
      unit
    );

  const label =
    unit === "kph"
      ? "km/h"
      : "mph";

  return `${Math.round(
    value
  )} ${label}`;
}