export interface Condition {
  text: string;
  icon: string;
}

export interface AirQuality {
  "us-epa-index": number;
  co: number;
  no2: number;
  o3: number;
  pm2_5: number;
  pm10: number;
}

export interface Current {
  temp_c: number;
  feelslike_c: number;
  humidity: number;
  wind_kph: number;
  wind_dir: string;
  pressure_mb: number;
  vis_km: number;
  uv: number;
  precip_mm: number;

  condition: Condition;
  air_quality: AirQuality;
}

export interface Day {
  maxtemp_c: number;
  mintemp_c: number;

  condition: Condition;
}

export interface Astro {
  sunrise: string;
  sunset: string;
}

export interface Hour {
  time_epoch: number;
  time: string;
  temp_c: number;
  chance_of_rain: number;
  wind_kph: number;

  condition: Condition;
}

export interface ForecastDay {
  date: string;
  day: Day;
  astro: Astro;
  hour: Hour[];
}

export interface Forecast {
  forecastday: ForecastDay[];
}

export interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  localtime: string;
}

export interface WeatherData {
  location: Location;
  current: Current;
  forecast: Forecast;
}