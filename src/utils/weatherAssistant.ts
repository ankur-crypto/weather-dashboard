import { WeatherData } from "@/types/weather";

export function askWeatherAssistant(
  question: string,
  weather: WeatherData
): string {
  const q = question.toLowerCase();

  const current = weather.current;
  const today = weather.forecast.forecastday[0];

  // Umbrella / Rain

  if (
    q.includes("umbrella") ||
    q.includes("rain")
  ) {
    if (
      current.precip_mm > 0 ||
      today.day.condition.text
        .toLowerCase()
        .includes("rain")
    ) {
      return "🌧 Yes, carrying an umbrella is a good idea. Rain is expected today.";
    }

    return "☀ No umbrella is needed. The weather looks clear.";
  }

  // Travel

  if (
    q.includes("travel") ||
    q.includes("drive")
  ) {
    if (
      current.wind_kph > 40 ||
      current.precip_mm > 5
    ) {
      return "⚠ Travel is possible, but be careful because of strong wind or rain.";
    }

    return "🚗 The weather is suitable for travelling today.";
  }

  // Exercise

  if (
    q.includes("jog") ||
    q.includes("run") ||
    q.includes("exercise")
  ) {
    if (
      current.temp_c > 35 ||
      current.precip_mm > 2
    ) {
      return "🏠 Outdoor exercise isn't recommended now because of the weather.";
    }

    return "🏃 Great weather for jogging or outdoor exercise.";
  }

  // Cycling

  if (
    q.includes("bike") ||
    q.includes("ride") ||
    q.includes("cycling")
  ) {
    if (
      current.wind_kph > 35 ||
      current.precip_mm > 1
    ) {
      return "🚴 It's better to avoid cycling right now because of the weather.";
    }

    return "🚴 Excellent weather for cycling.";
  }

  // Clothing

  if (
    q.includes("wear") ||
    q.includes("dress") ||
    q.includes("jacket")
  ) {
    if (current.temp_c < 15) {
      return "🧥 Wear a warm jacket today.";
    }

    if (current.temp_c < 22) {
      return "👕 A light jacket would be comfortable.";
    }

    if (current.temp_c > 32) {
      return "🩳 Wear light cotton clothes and stay hydrated.";
    }

    return "🙂 Comfortable casual clothing is perfect today.";
  }

  // Air Quality

  if (
    q.includes("air") ||
    q.includes("pollution")
  ) {
    if (
      current.air_quality["us-epa-index"] > 3
    ) {
      return "😷 Air quality isn't very good today. Sensitive people should limit outdoor activities.";
    }

    return "🌿 Air quality is good today.";
  }

  // UV

  if (
    q.includes("uv") ||
    q.includes("sun")
  ) {
    if (current.uv >= 8) {
      return "☀ UV levels are very high. Use sunscreen and avoid prolonged sun exposure.";
    }

    return "😎 UV levels are moderate today.";
  }

  // Humidity

  if (
    q.includes("humidity")
  ) {
    return `💧 Current humidity is ${current.humidity}%.`;
  }

  // Temperature

  if (
    q.includes("temperature") ||
    q.includes("hot") ||
    q.includes("cold")
  ) {
    return `🌡 The current temperature is ${current.temp_c}°C and it feels like ${current.feelslike_c}°C.`;
  }

  // Wind

  if (
    q.includes("wind")
  ) {
    return `💨 Wind speed is ${current.wind_kph} km/h towards ${current.wind_dir}.`;
  }

  // Sunrise

  if (
    q.includes("sunrise")
  ) {
    return `🌅 Sunrise today is at ${today.astro.sunrise}.`;
  }

  // Sunset

  if (
    q.includes("sunset")
  ) {
    return `🌇 Sunset today is at ${today.astro.sunset}.`;
  }

  // Default

  return `
🤖 I can help you with:

🌧 Rain
☂ Umbrella
🚗 Travel
🏃 Exercise
🚴 Cycling
👕 Clothing
🌡 Temperature
💨 Wind
💧 Humidity
🌿 Air Quality
☀ UV Index
🌅 Sunrise
🌇 Sunset
`;
}