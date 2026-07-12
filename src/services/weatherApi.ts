const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

const BASE_URL = "https://api.weatherapi.com/v1";

/**
 * Get current weather + 7-day forecast
 */
export async function getCurrentWeather(query: string) {
  const response = await fetch(
    `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(
      query
    )}&days=7&aqi=yes&alerts=yes`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.error?.message || "Failed to fetch weather."
    );
  }

  return response.json();
}

/**
 * Search cities for autocomplete
 */
export async function searchCities(query: string) {
  if (!query.trim()) return [];

  const response = await fetch(
    `${BASE_URL}/search.json?key=${API_KEY}&q=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    return [];
  }

  return response.json();
}