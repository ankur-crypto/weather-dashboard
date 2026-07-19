import { WeatherData } from "@/types/weather";

export function askWeatherAssistant(
  question: string,
  weather: WeatherData
): string {
  const q = question
    .toLowerCase()
    .trim();

  const current = weather.current;

  const today =
    weather.forecast.forecastday[0];

  const officialAlerts =
    weather.alerts?.alert ?? [];

  const epaIndex =
    current.air_quality?.[
      "us-epa-index"
    ];

  const rainChance =
    today?.day
      ?.daily_chance_of_rain ?? 0;

  /*
   * Severe Weather / Alerts
   */
  if (
    q.includes("alert") ||
    q.includes("warning") ||
    q.includes("danger") ||
    q.includes("safe")
  ) {
    if (
      officialAlerts.length > 0
    ) {
      const alert =
        officialAlerts[0];

      return `⚠️ Weather Alert

${alert.headline || alert.event || "A weather warning is active."}

${
  alert.instruction ||
  alert.desc ||
  "Please monitor local weather conditions and take appropriate precautions."
}`;
    }

    if (
      current.wind_kph >= 50 ||
      current.precip_mm >= 10
    ) {
      return `⚠️ Current weather conditions may require extra caution.

💨 Wind: ${current.wind_kph} km/h
🌧 Precipitation: ${current.precip_mm} mm

Consider limiting unnecessary outdoor activities.`;
    }

    return `✅ There are no major weather warnings detected for ${weather.location.name} right now.`;
  }

  /*
   * Umbrella / Rain
   */
  if (
    q.includes("umbrella") ||
    q.includes("rain")
  ) {
    if (
      current.precip_mm > 0
    ) {
      return `🌧️ Yes, carry an umbrella.

It is currently raining in ${weather.location.name} with ${current.precip_mm} mm of precipitation.`;
    }

    if (rainChance >= 50) {
      return `☔ Carrying an umbrella is a good idea.

Today's chance of rain is ${rainChance}%.`;
    }

    if (rainChance >= 20) {
      return `🌦️ There is a ${rainChance}% chance of rain today. You may want to carry a small umbrella just in case.`;
    }

    return `☀️ An umbrella probably isn't necessary right now. Today's rain chance is only ${rainChance}%.`;
  }

  /*
   * Travel / Driving
   */
  if (
    q.includes("travel") ||
    q.includes("drive") ||
    q.includes("driving")
  ) {
    if (
      officialAlerts.length > 0
    ) {
      return `⚠️ There is an active weather alert for ${weather.location.name}. Check the Weather Alerts section before travelling.`;
    }

    if (
      current.vis_km <= 1
    ) {
      return `🚗 Travel requires extra caution.

Visibility is only ${current.vis_km} km. If driving, reduce speed and maintain a safe distance.`;
    }

    if (
      current.wind_kph >= 50
    ) {
      return `💨 Strong winds of ${current.wind_kph} km/h may make travel difficult. Consider delaying unnecessary travel if conditions worsen.`;
    }

    if (
      current.precip_mm >= 5
    ) {
      return `🌧️ Heavy rain may affect travel conditions. Drive carefully and watch for waterlogged roads.`;
    }

    return `🚗 Current weather conditions appear generally suitable for travelling in ${weather.location.name}.

Visibility: ${current.vis_km} km
Wind: ${current.wind_kph} km/h`;
  }

  /*
   * Jogging / Running / Exercise
   */
  if (
    q.includes("jog") ||
    q.includes("run") ||
    q.includes("running") ||
    q.includes("exercise") ||
    q.includes("workout")
  ) {
    if (
      officialAlerts.length > 0
    ) {
      return "⚠️ Outdoor exercise is not recommended while a significant weather alert is active.";
    }

    if (
      current.temp_c >= 35
    ) {
      return `🌡️ It's quite hot at ${current.temp_c}°C. Consider exercising indoors or waiting for a cooler time of day.`;
    }

    if (
      current.precip_mm > 2
    ) {
      return "🌧️ Outdoor exercise may be uncomfortable because of the current rain. Indoor exercise may be a better option.";
    }

    if (
      current.wind_kph >= 40
    ) {
      return `💨 Wind speed is ${current.wind_kph} km/h, which may make outdoor exercise uncomfortable.`;
    }

    if (
      current.uv >= 8
    ) {
      return `☀️ The UV index is ${current.uv}, which is very high. If you exercise outdoors, consider an early-morning or evening session and use sun protection.`;
    }

    if (
      epaIndex !== undefined &&
      epaIndex >= 4
    ) {
      return "😷 Air quality is currently unhealthy. Consider exercising indoors.";
    }

    return `🏃 Current conditions look reasonable for outdoor exercise.

🌡️ ${current.temp_c}°C
💨 Wind ${current.wind_kph} km/h
☀️ UV ${current.uv}`;
  }

  /*
   * Bike / Cycling
   */
  if (
    q.includes("bike") ||
    q.includes("ride") ||
    q.includes("cycling") ||
    q.includes("cycle")
  ) {
    if (
      officialAlerts.length > 0
    ) {
      return "⚠️ There is an active weather alert. Check conditions carefully before riding.";
    }

    if (
      current.precip_mm > 1
    ) {
      return "🚴🌧️ Roads may be wet because of rain. Consider postponing your ride or ride carefully.";
    }

    if (
      current.wind_kph >= 35
    ) {
      return `🚴💨 Wind speed is ${current.wind_kph} km/h. Strong winds may make cycling difficult or less safe.`;
    }

    if (
      current.vis_km <= 3
    ) {
      return `🚴 Visibility is only ${current.vis_km} km. Cycling may be less safe in these conditions.`;
    }

    return `🚴 Conditions look generally suitable for cycling.

🌡️ Temperature: ${current.temp_c}°C
💨 Wind: ${current.wind_kph} km/h
👁️ Visibility: ${current.vis_km} km`;
  }

  /*
   * Clothing
   */
  if (
    q.includes("wear") ||
    q.includes("dress") ||
    q.includes("clothes") ||
    q.includes("clothing") ||
    q.includes("jacket")
  ) {
    if (
      current.temp_c < 10
    ) {
      return `🧥 It's cold at ${current.temp_c}°C. Wear warm layered clothing and a jacket.`;
    }

    if (
      current.temp_c < 18
    ) {
      return `🧥 The temperature is ${current.temp_c}°C. A light jacket or sweater should be comfortable.`;
    }

    if (
      current.temp_c >= 32
    ) {
      return `👕 It's warm at ${current.temp_c}°C. Light, breathable clothing is a good choice. Stay hydrated.`;
    }

    if (
      current.precip_mm > 0 ||
      rainChance >= 50
    ) {
      return `🌧️ Comfortable casual clothing should be fine, but consider carrying rain protection. Today's rain chance is ${rainChance}%.`;
    }

    return `👕 Comfortable casual clothing should be suitable. The current temperature is ${current.temp_c}°C.`;
  }

  /*
   * Air Quality
   */
  if (
    q.includes("air") ||
    q.includes("pollution") ||
    q.includes("aqi")
  ) {
    if (
      epaIndex === undefined
    ) {
      return "🌿 Air-quality information is currently unavailable.";
    }

    if (epaIndex >= 6) {
      return "🚨 Air quality is hazardous. Avoid prolonged outdoor activity if possible.";
    }

    if (epaIndex === 5) {
      return "😷 Air quality is very unhealthy. Consider limiting outdoor activity.";
    }

    if (epaIndex === 4) {
      return "😷 Air quality is unhealthy. Sensitive individuals should take extra precautions outdoors.";
    }

    if (epaIndex === 3) {
      return "🌫️ Air quality may be unhealthy for sensitive groups.";
    }

    if (epaIndex === 2) {
      return "🌿 Air quality is moderate. Most people can continue normal outdoor activities.";
    }

    return "🌿 Air quality is currently good.";
  }

  /*
   * UV / Sun
   */
  if (
    q.includes("uv") ||
    q.includes("sun") ||
    q.includes("sunscreen")
  ) {
    if (current.uv >= 8) {
      return `☀️ UV index is ${current.uv}, which is very high. Consider limiting prolonged direct sun exposure and use appropriate sun protection.`;
    }

    if (current.uv >= 6) {
      return `☀️ UV index is ${current.uv}, which is high. Sun protection is recommended for extended outdoor activity.`;
    }

    if (current.uv >= 3) {
      return `😎 UV index is ${current.uv}, which is moderate. Consider sun protection during longer outdoor activities.`;
    }

    return `🌤️ UV index is currently ${current.uv}, which is relatively low.`;
  }

  /*
   * Visibility
   */
  if (
    q.includes("visibility") ||
    q.includes("fog")
  ) {
    if (
      current.vis_km <= 1
    ) {
      return `🌫️ Visibility is very low at ${current.vis_km} km. Take extra care while travelling.`;
    }

    if (
      current.vis_km <= 5
    ) {
      return `🌫️ Visibility is reduced to ${current.vis_km} km. Exercise caution while driving.`;
    }

    return `👁️ Current visibility is ${current.vis_km} km.`;
  }

  /*
   * Humidity
   */
  if (
    q.includes("humidity")
  ) {
    return `💧 Current humidity in ${weather.location.name} is ${current.humidity}%.`;
  }

  /*
   * Temperature
   */
  if (
    q.includes("temperature") ||
    q.includes("hot") ||
    q.includes("cold")
  ) {
    return `🌡️ The current temperature in ${weather.location.name} is ${current.temp_c}°C.

It feels like ${current.feelslike_c}°C.

Today's forecast:
⬆️ High: ${today.day.maxtemp_c}°C
⬇️ Low: ${today.day.mintemp_c}°C`;
  }

  /*
   * Wind
   */
  if (
    q.includes("wind")
  ) {
    return `💨 Current wind speed is ${current.wind_kph} km/h from ${current.wind_dir}.

Today's maximum forecast wind speed is ${today.day.maxwind_kph} km/h.`;
  }

  /*
   * Sunrise
   */
  if (
    q.includes("sunrise")
  ) {
    return `🌅 Sunrise in ${weather.location.name} today is at ${today.astro.sunrise}.`;
  }

  /*
   * Sunset
   */
  if (
    q.includes("sunset")
  ) {
    return `🌇 Sunset in ${weather.location.name} today is at ${today.astro.sunset}.`;
  }

  /*
   * General Weather
   */
  if (
    q.includes("weather") ||
    q.includes("today") ||
    q.includes("condition")
  ) {
    return `🌦️ Current weather in ${weather.location.name}:

🌡️ Temperature: ${current.temp_c}°C
🤗 Feels like: ${current.feelslike_c}°C
🌤️ Condition: ${current.condition.text}
💧 Humidity: ${current.humidity}%
💨 Wind: ${current.wind_kph} km/h
🌧️ Rain chance today: ${rainChance}%
☀️ UV Index: ${current.uv}`;
  }

  /*
   * Default
   */
  return `🤖 I can answer questions about the current weather in ${weather.location.name}.

Try asking:

☔ Should I carry an umbrella?
🏃 Can I go jogging?
🚴 Can I ride my bike?
🚗 Can I travel today?
👕 What should I wear?
🌿 Is the air quality good?
☀️ Is the UV level high?
🌫️ How is the visibility?
⚠️ Are there any weather alerts?
🌡️ What is the temperature?
💨 How strong is the wind?
🌅 What time is sunrise?
🌇 What time is sunset?`;
}