import { WeatherData } from "@/types/weather";

import {
  type TemperatureUnit,
  type WindUnit,
} from "@/store/settingsStore";

import {
  formatTemperature,
  formatWindSpeed,
} from "@/utils/weatherUnits";

/*
 * Local Weather Assistant
 *
 * Generates weather-based responses
 * using live WeatherAPI data.
 */
export function askWeatherAssistant(
  question: string,
  weather: WeatherData,
  temperatureUnit: TemperatureUnit,
  windUnit: WindUnit
): string {
  /*
   * Normalize Question
   */
  const q =
    question
      .toLowerCase()
      .trim();

  /*
   * Current Weather
   */
  const current =
    weather.current;

  const location =
    weather.location;

  /*
   * Today's Forecast
   */
  const today =
    weather.forecast
      ?.forecastday?.[0];

  /*
   * Weather Values
   */
  const temperature =
    current.temp_c;

  const feelsLike =
    current.feelslike_c;

  const humidity =
    current.humidity;

  const windSpeed =
    current.wind_kph;

  const windDirection =
    current.wind_dir;

  const precipitation =
    current.precip_mm;

  const visibility =
    current.vis_km;

  const pressure =
    current.pressure_mb;

  const uv =
    current.uv;

  const condition =
    current.condition
      .text;

  const rainChance =
    today?.day
      ?.daily_chance_of_rain ??
    0;

  const sunrise =
    today?.astro
      ?.sunrise ??
    "Unavailable";

  const sunset =
    today?.astro
      ?.sunset ??
    "Unavailable";

  /*
   * Formatted Values
   *
   * These automatically follow
   * the user's Settings.
   */
  const formattedTemperature =
    formatTemperature(
      temperature,
      temperatureUnit
    );

  const formattedFeelsLike =
    formatTemperature(
      feelsLike,
      temperatureUnit
    );

  const formattedWind =
    formatWindSpeed(
      windSpeed,
      windUnit
    );

  /*
   * Air Quality
   */
  const airQuality =
    current.air_quality;

  const epaIndex =
    airQuality?.[
      "us-epa-index"
    ];

  /*
   * Get Air Quality Status
   */
  const getAirQualityStatus =
    () => {
      switch (epaIndex) {
        case 1:
          return "Good";

        case 2:
          return "Moderate";

        case 3:
          return "Unhealthy for sensitive groups";

        case 4:
          return "Unhealthy";

        case 5:
          return "Very unhealthy";

        case 6:
          return "Hazardous";

        default:
          return "Unavailable";
      }
    };

  const airQualityStatus =
    getAirQualityStatus();

  /*
   * Umbrella Advice
   */
  if (
    q.includes(
      "umbrella"
    ) ||
    q.includes(
      "rain"
    ) ||
    q.includes(
      "raining"
    )
  ) {
    if (
      rainChance >= 60 ||
      precipitation > 0 ||
      condition
        .toLowerCase()
        .includes("rain")
    ) {
      return `☔ Yes, carrying an umbrella is recommended in ${location.name}.

The current weather is ${condition}, with a ${rainChance}% chance of rain today.

Current precipitation is ${precipitation} mm.`;
    }

    if (
      rainChance >= 30
    ) {
      return `🌦️ You may want to carry a small umbrella in ${location.name}.

The chance of rain today is ${rainChance}%, so some rain is possible.

Current condition: ${condition}.`;
    }

    return `☀️ An umbrella probably isn't necessary right now in ${location.name}.

The current condition is ${condition}, and today's chance of rain is ${rainChance}%.

You can still check the forecast before going out for a long time.`;
  }

  /*
   * Temperature
   */
  if (
    q.includes(
      "temperature"
    ) ||
    q.includes(
      "temp"
    ) ||
    q.includes(
      "how hot"
    ) ||
    q.includes(
      "how cold"
    )
  ) {
    return `🌡️ The current temperature in ${location.name} is ${formattedTemperature}.

It feels like ${formattedFeelsLike}.

Current weather condition: ${condition}.`;
  }

  /*
   * Wind
   */
  if (
    q.includes(
      "wind"
    ) ||
    q.includes(
      "windy"
    )
  ) {
    let advice =
      "Wind conditions are currently manageable.";

    if (
      windSpeed >= 40
    ) {
      advice =
        "The wind is quite strong, so take extra care during outdoor activities.";
    } else if (
      windSpeed >= 25
    ) {
      advice =
        "It is moderately windy outside.";
    } else if (
      windSpeed <= 10
    ) {
      advice =
        "The wind is relatively light.";
    }

    return `💨 The current wind speed in ${location.name} is ${formattedWind}.

Direction: ${windDirection}.

${advice}`;
  }

  /*
   * Humidity
   */
  if (
    q.includes(
      "humidity"
    ) ||
    q.includes(
      "humid"
    )
  ) {
    let humidityAdvice =
      "The humidity level is comfortable.";

    if (
      humidity >= 80
    ) {
      humidityAdvice =
        "It is quite humid, so the weather may feel warmer and more uncomfortable.";
    } else if (
      humidity >= 60
    ) {
      humidityAdvice =
        "Humidity is moderately high.";
    } else if (
      humidity < 30
    ) {
      humidityAdvice =
        "The air is relatively dry.";
    }

    return `💧 The current humidity in ${location.name} is ${humidity}%.

${humidityAdvice}`;
  }

  /*
   * Jogging / Running
   */
  if (
    q.includes(
      "jog"
    ) ||
    q.includes(
      "jogging"
    ) ||
    q.includes(
      "running"
    ) ||
    q.includes(
      "run outside"
    )
  ) {
    if (
      rainChance >= 70 ||
      precipitation > 2
    ) {
      return `🏃 Outdoor jogging may not be ideal right now.

There is a ${rainChance}% chance of rain in ${location.name}, with current conditions of ${condition}.

Consider indoor exercise or wait for the weather to improve.`;
    }

    if (
      temperature >= 35
    ) {
      return `🏃 It is quite hot for outdoor jogging.

The temperature is ${formattedTemperature} and feels like ${formattedFeelsLike}.

If you go running, consider a cooler time of day and stay hydrated.`;
    }

    if (
      uv >= 8
    ) {
      return `🏃 You can jog outside, but the UV index is high at ${uv}.

The temperature is ${formattedTemperature}.

Consider sun protection and avoid prolonged exposure during peak sunlight.`;
    }

    return `🏃 Conditions look reasonable for jogging in ${location.name}.

Temperature: ${formattedTemperature}
Feels like: ${formattedFeelsLike}
Weather: ${condition}
Wind: ${formattedWind}
Rain chance: ${rainChance}%

Check local conditions before heading out.`;
  }

  /*
   * Cycling / Bike
   */
  if (
    q.includes(
      "bike"
    ) ||
    q.includes(
      "bicycle"
    ) ||
    q.includes(
      "cycling"
    ) ||
    q.includes(
      "cycle"
    )
  ) {
    if (
      rainChance >= 70 ||
      precipitation > 2
    ) {
      return `🚴 Cycling conditions may be poor right now.

The chance of rain is ${rainChance}%, and the current condition is ${condition}.

Wet roads may reduce traction and visibility.`;
    }

    if (
      windSpeed >= 40
    ) {
      return `🚴 Cycling may be difficult because of strong wind.

Current wind speed: ${formattedWind}
Direction: ${windDirection}

Consider waiting until wind conditions improve.`;
    }

    return `🚴 Cycling conditions currently look reasonable in ${location.name}.

Temperature: ${formattedTemperature}
Wind: ${formattedWind}
Rain chance: ${rainChance}%
Visibility: ${visibility} km

Stay aware of changing local weather and road conditions.`;
  }

  /*
   * Travel
   */
  if (
    q.includes(
      "travel"
    ) ||
    q.includes(
      "drive"
    ) ||
    q.includes(
      "driving"
    ) ||
    q.includes(
      "trip"
    )
  ) {
    if (
      visibility < 2
    ) {
      return `🚗 Travel conditions may be difficult because visibility is only ${visibility} km.

Current weather: ${condition}.

If driving, use extra caution and maintain a safe distance from other vehicles.`;
    }

    if (
      rainChance >= 70
    ) {
      return `🚗 Travel is possible, but rain may affect road conditions.

Chance of rain: ${rainChance}%
Visibility: ${visibility} km
Weather: ${condition}

Allow extra travel time and drive according to road conditions.`;
    }

    return `🚗 Current weather conditions look generally suitable for travel in ${location.name}.

Weather: ${condition}
Temperature: ${formattedTemperature}
Visibility: ${visibility} km
Wind: ${formattedWind}

Continue checking weather conditions if you're planning a longer journey.`;
  }

  /*
   * Clothing
   */
  if (
    q.includes(
      "wear"
    ) ||
    q.includes(
      "clothes"
    ) ||
    q.includes(
      "clothing"
    ) ||
    q.includes(
      "dress"
    )
  ) {
    let clothingAdvice =
      "Comfortable everyday clothing should be suitable.";

    if (
      temperature >= 30
    ) {
      clothingAdvice =
        "Lightweight, breathable clothing should be more comfortable in the warm weather.";
    } else if (
      temperature >= 20
    ) {
      clothingAdvice =
        "Light and comfortable clothing should work well.";
    } else if (
      temperature >= 10
    ) {
      clothingAdvice =
        "A light jacket or sweater may be useful.";
    } else {
      clothingAdvice =
        "Warm clothing and an outer layer are recommended.";
    }

    const rainAdvice =
      rainChance >= 50
        ? " You may also want to carry an umbrella or light rain jacket."
        : "";

    return `👕 ${clothingAdvice}${rainAdvice}

Current temperature: ${formattedTemperature}
Feels like: ${formattedFeelsLike}
Weather: ${condition}
Rain chance: ${rainChance}%`;
  }

  /*
   * Air Quality
   */
  if (
    q.includes(
      "air quality"
    ) ||
    q.includes(
      "aqi"
    ) ||
    q.includes(
      "pollution"
    )
  ) {
    return `🌿 The current air quality status in ${location.name} is ${airQualityStatus}.

US EPA Index: ${epaIndex ?? "Unavailable"}

People who are sensitive to air pollution should consider current local air-quality guidance before prolonged outdoor activity.`;
  }

  /*
   * UV Index
   */
  if (
    q.includes(
      "uv"
    ) ||
    q.includes(
      "sun"
    ) ||
    q.includes(
      "sunlight"
    )
  ) {
    let uvAdvice =
      "UV exposure is relatively low.";

    if (
      uv >= 11
    ) {
      uvAdvice =
        "The UV level is extreme. Strong sun protection is important.";
    } else if (
      uv >= 8
    ) {
      uvAdvice =
        "The UV level is very high. Consider limiting prolonged direct sun exposure.";
    } else if (
      uv >= 6
    ) {
      uvAdvice =
        "The UV level is high. Sun protection is recommended.";
    } else if (
      uv >= 3
    ) {
      uvAdvice =
        "The UV level is moderate.";
    }

    return `☀️ The current UV index in ${location.name} is ${uv}.

${uvAdvice}`;
  }

  /*
   * Sunrise
   */
  if (
    q.includes(
      "sunrise"
    )
  ) {
    return `🌅 Sunrise in ${location.name} is at ${sunrise}.`;
  }

  /*
   * Sunset
   */
  if (
    q.includes(
      "sunset"
    )
  ) {
    return `🌇 Sunset in ${location.name} is at ${sunset}.`;
  }

  /*
   * Visibility
   */
  if (
    q.includes(
      "visibility"
    )
  ) {
    return `👁️ Current visibility in ${location.name} is ${visibility} km.

The current weather condition is ${condition}.`;
  }

  /*
   * Pressure
   */
  if (
    q.includes(
      "pressure"
    )
  ) {
    return `📊 The current atmospheric pressure in ${location.name} is ${pressure} hPa.`;
  }

  /*
   * Current Weather
   */
  if (
    q.includes(
      "weather"
    ) ||
    q.includes(
      "condition"
    ) ||
    q.includes(
      "today"
    )
  ) {
    return `🌤️ Current weather in ${location.name}, ${location.country}:

Weather: ${condition}
Temperature: ${formattedTemperature}
Feels like: ${formattedFeelsLike}
Humidity: ${humidity}%
Wind: ${formattedWind}
Rain chance: ${rainChance}%
Visibility: ${visibility} km
UV index: ${uv}`;
  }

  /*
   * Default Response
   */
  return `🤖 I can help you understand the current weather in ${location.name}.

Try asking me:

• What is the temperature?
• Should I carry an umbrella?
• What should I wear?
• Can I go jogging?
• Can I ride my bike?
• Can I travel today?
• How strong is the wind?
• What is the humidity?
• Is the air quality good?
• What is the UV index?
• When is sunrise?
• When is sunset?`;
}