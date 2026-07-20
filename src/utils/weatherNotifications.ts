import { WeatherData } from "@/types/weather";

import {
  type TemperatureUnit,
  type WindUnit,
} from "@/store/settingsStore";

import {
  formatTemperature,
  formatWindSpeed,
} from "@/utils/weatherUnits";

export type NotificationType =
  | "danger"
  | "warning"
  | "info";

export interface WeatherNotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
}

export function getWeatherNotifications(
  weather: WeatherData,
  temperatureUnit: TemperatureUnit,
  windUnit: WindUnit
): WeatherNotification[] {
  const notifications: WeatherNotification[] =
    [];

  const current =
    weather.current;

  /*
   * Formatted Values
   *
   * WeatherAPI values remain in
   * Celsius and kph for alert logic.
   * Conversion is only for display.
   */

  const formattedTemperature =
    formatTemperature(
      current.temp_c,
      temperatureUnit
    );

  const formattedWind =
    formatWindSpeed(
      current.wind_kph,
      windUnit
    );

  const formattedGust =
    current.gust_kph !==
    undefined
      ? formatWindSpeed(
          current.gust_kph,
          windUnit
        )
      : null;

  /*
   * Official WeatherAPI Alerts
   */

  const officialAlerts =
    weather.alerts?.alert ?? [];

  officialAlerts.forEach(
    (alert, index) => {
      notifications.push({
        id: `official-alert-${index}`,

        title:
          alert.headline ||
          alert.event ||
          "Severe Weather Alert",

        message:
          alert.instruction ||
          alert.desc ||
          "A weather alert is active for your location.",

        type: "danger",
      });
    }
  );

  /*
   * Temperature Alerts
   *
   * Threshold calculations remain
   * in Celsius because WeatherAPI
   * provides temp_c.
   */

  if (
    current.temp_c >= 40
  ) {
    notifications.push({
      id: "extreme-heat",

      title:
        "Extreme Heat",

      message: `Temperature is currently ${formattedTemperature}. Avoid prolonged outdoor activity, stay hydrated, and seek shade when possible.`,

      type: "danger",
    });
  } else if (
    current.temp_c >= 35
  ) {
    notifications.push({
      id: "high-temperature",

      title:
        "High Temperature",

      message: `Temperature is currently ${formattedTemperature}. Stay hydrated and avoid prolonged exposure to direct sunlight.`,

      type: "warning",
    });
  } else if (
    current.temp_c <= 0
  ) {
    notifications.push({
      id:
        "freezing-temperature",

      title:
        "Freezing Temperature",

      message: `Temperature is currently ${formattedTemperature}. Be cautious of freezing conditions and wear appropriate warm clothing.`,

      type: "danger",
    });
  } else if (
    current.temp_c <= 10
  ) {
    notifications.push({
      id:
        "cold-temperature",

      title:
        "Cold Weather",

      message: `Temperature is currently ${formattedTemperature}. Consider wearing warm clothing when going outdoors.`,

      type: "info",
    });
  }

  /*
   * Rain Alerts
   */

  if (
    current.precip_mm >= 10
  ) {
    notifications.push({
      id: "heavy-rain",

      title:
        "Heavy Rain",

      message: `Current precipitation is ${current.precip_mm} mm. Avoid waterlogged areas and exercise extra caution while travelling.`,

      type: "danger",
    });
  } else if (
    current.precip_mm >=
    2.5
  ) {
    notifications.push({
      id:
        "moderate-rain",

      title:
        "Moderate Rain",

      message: `Current precipitation is ${current.precip_mm} mm. Carry an umbrella and drive carefully.`,

      type: "warning",
    });
  } else if (
    current.precip_mm > 0
  ) {
    notifications.push({
      id: "light-rain",

      title:
        "Light Rain",

      message: `Current precipitation is ${current.precip_mm} mm. You may want to carry an umbrella.`,

      type: "info",
    });
  }

  /*
   * Wind Alerts
   *
   * Threshold calculations remain
   * in kph.
   */

  if (
    current.wind_kph >= 60
  ) {
    notifications.push({
      id:
        "dangerous-wind",

      title:
        "Very Strong Wind",

      message: `Wind speed is currently ${formattedWind}. Avoid unnecessary outdoor activity and secure loose objects.`,

      type: "danger",
    });
  } else if (
    current.wind_kph >= 30
  ) {
    notifications.push({
      id:
        "strong-wind",

      title:
        "Strong Wind",

      message: `Wind speed is currently ${formattedWind}. Exercise caution while travelling and during outdoor activities.`,

      type: "warning",
    });
  }

  /*
   * Wind Gust Alerts
   */

  if (
    current.gust_kph !==
      undefined &&
    current.gust_kph >= 70
  ) {
    notifications.push({
      id:
        "severe-wind-gust",

      title:
        "Severe Wind Gusts",

      message: `Wind gusts are reaching ${formattedGust}. Stay away from unstable structures and secure loose outdoor objects.`,

      type: "danger",
    });
  } else if (
    current.gust_kph !==
      undefined &&
    current.gust_kph >= 45
  ) {
    notifications.push({
      id:
        "strong-wind-gust",

      title:
        "Strong Wind Gusts",

      message: `Wind gusts are reaching ${formattedGust}. Use caution during outdoor activities.`,

      type: "warning",
    });
  }

  /*
   * UV Alerts
   */

  if (
    current.uv >= 8
  ) {
    notifications.push({
      id:
        "very-high-uv",

      title:
        "Very High UV Index",

      message: `The current UV index is ${current.uv}. Limit direct sun exposure and use appropriate sun protection.`,

      type: "danger",
    });
  } else if (
    current.uv >= 6
  ) {
    notifications.push({
      id: "high-uv",

      title:
        "High UV Index",

      message: `The current UV index is ${current.uv}. Consider using sunscreen and sun protection when outdoors.`,

      type: "warning",
    });
  }

  /*
   * Air Quality Alerts
   *
   * WeatherAPI US EPA Index:
   *
   * 1 = Good
   * 2 = Moderate
   * 3 = Unhealthy for sensitive groups
   * 4 = Unhealthy
   * 5 = Very unhealthy
   * 6 = Hazardous
   */

  const epaIndex =
    current.air_quality?.[
      "us-epa-index"
    ];

  if (
    epaIndex !== undefined
  ) {
    if (
      epaIndex >= 5
    ) {
      notifications.push({
        id:
          "dangerous-air-quality",

        title:
          "Very Poor Air Quality",

        message:
          "Air quality is currently very unhealthy. Consider limiting prolonged outdoor activity.",

        type: "danger",
      });
    } else if (
      epaIndex >= 3
    ) {
      notifications.push({
        id:
          "poor-air-quality",

        title:
          "Poor Air Quality",

        message:
          "Air quality may be unhealthy for sensitive groups. Consider reducing prolonged outdoor activity.",

        type: "warning",
      });
    }
  }

  /*
   * Visibility Alerts
   */

  if (
    current.vis_km <= 1
  ) {
    notifications.push({
      id:
        "very-low-visibility",

      title:
        "Very Low Visibility",

      message: `Visibility is currently ${current.vis_km} km. Use extreme caution while driving.`,

      type: "danger",
    });
  } else if (
    current.vis_km <= 5
  ) {
    notifications.push({
      id:
        "low-visibility",

      title:
        "Reduced Visibility",

      message: `Visibility is currently ${current.vis_km} km. Drive carefully and maintain a safe distance.`,

      type: "warning",
    });
  }

  /*
   * Humidity Alerts
   */

  if (
    current.humidity >= 90
  ) {
    notifications.push({
      id:
        "very-high-humidity",

      title:
        "Very High Humidity",

      message: `Humidity is currently ${current.humidity}%. Outdoor conditions may feel uncomfortable and warmer than the actual temperature.`,

      type: "warning",
    });
  } else if (
    current.humidity <= 20
  ) {
    notifications.push({
      id:
        "very-low-humidity",

      title:
        "Very Low Humidity",

      message: `Humidity is currently ${current.humidity}%. Stay hydrated and be aware of dry conditions.`,

      type: "info",
    });
  }

  /*
   * Normal Weather
   */

  if (
    notifications.length === 0
  ) {
    notifications.push({
      id:
        "weather-normal",

      title:
        "Weather Conditions Normal",

      message: `No significant weather warnings are currently detected for ${weather.location.name}.`,

      type: "info",
    });
  }

  return notifications;
}