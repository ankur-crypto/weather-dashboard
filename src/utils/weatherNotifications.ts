import { WeatherData } from "@/types/weather";

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: "info" | "warning" | "danger";
}

export function getWeatherNotifications(
  weather: WeatherData
): Notification[] {
  const notifications: Notification[] = [];

  const current = weather.current;

  if (current.precip_mm > 0) {
    notifications.push({
      id: 1,
      type: "warning",
      title: "Rain Alert",
      message:
        "Rain is expected today. Carry an umbrella.",
    });
  }

  if (current.uv >= 8) {
    notifications.push({
      id: 2,
      type: "danger",
      title: "High UV",
      message:
        "UV Index is very high. Wear sunscreen.",
    });
  }

  if (current.wind_kph > 35) {
    notifications.push({
      id: 3,
      type: "warning",
      title: "Strong Wind",
      message:
        "Avoid unnecessary outdoor travel.",
    });
  }

  if (
    current.air_quality["us-epa-index"] > 3
  ) {
    notifications.push({
      id: 4,
      type: "warning",
      title: "Poor Air Quality",
      message:
        "Sensitive groups should reduce outdoor activities.",
    });
  }

  if (current.temp_c >= 38) {
    notifications.push({
      id: 5,
      type: "danger",
      title: "Heat Wave",
      message:
        "Stay hydrated and avoid direct sunlight.",
    });
  }

  if (current.temp_c <= 8) {
    notifications.push({
      id: 6,
      type: "info",
      title: "Cold Weather",
      message:
        "Wear warm clothes before going outside.",
    });
  }

  if (notifications.length === 0) {
    notifications.push({
      id: 100,
      type: "info",
      title: "Weather Update",
      message:
        "No weather warnings for today. Enjoy your day!",
    });
  }

  return notifications;
}