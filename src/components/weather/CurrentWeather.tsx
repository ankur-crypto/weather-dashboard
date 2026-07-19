"use client";

import {
  Wind,
  Droplets,
  Eye,
  Gauge,
  CloudRain,
  MapPin,
  Star,
} from "lucide-react";

import { WeatherData } from "@/types/weather";

import { useFavoriteStore } from "@/store/favoriteStore";
import { useSettingsStore } from "@/store/settingsStore";

import {
  formatTemperature,
  formatWindSpeed,
} from "@/utils/weatherUnits";

interface Props {
  weather: WeatherData;
}

export default function CurrentWeather({
  weather,
}: Props) {
  /*
   * Weather Data
   */
  const current = weather.current;
  const location = weather.location;

  /*
   * Favorite Store
   */
  const {
    addFavorite,
    removeFavorite,
    isFavorite,
  } = useFavoriteStore();

  /*
   * Settings Store
   */
  const {
    temperatureUnit,
    windUnit,
  } = useSettingsStore();

  /*
   * Check if current city
   * is already a favorite
   */
  const favorite =
    isFavorite(location.name);

  /*
   * Add / Remove Favorite
   */
  const handleFavorite = () => {
    if (favorite) {
      removeFavorite(
        location.name
      );
    } else {
      addFavorite(
        location.name
      );
    }
  };

  /*
   * WeatherAPI sometimes returns:
   *
   * //cdn.weatherapi.com/...
   *
   * Convert it to:
   *
   * https://cdn.weatherapi.com/...
   */
  const weatherIcon =
    current.condition.icon.startsWith(
      "//"
    )
      ? `https:${current.condition.icon}`
      : current.condition.icon;

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-700
        bg-cover
        bg-center
        p-8
        text-white
        shadow-xl
      "
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(8,15,30,.55),
            rgba(8,15,30,.75)
          ),
          url("${weatherIcon}")
        `,
      }}
    >
      {/* Header */}

      <div className="flex items-start justify-between gap-4">
        {/* Location */}

        <div>
          <div className="flex items-center gap-2 text-slate-200">
            <MapPin
              size={18}
            />

            <span>
              {location.name},{" "}
              {location.country}
            </span>
          </div>

          <p className="mt-2 text-sm text-slate-300">
            {location.localtime}
          </p>
        </div>

        {/* Favorite + Weather Icon */}

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={
              handleFavorite
            }
            className="
              flex
              items-center
              gap-2
              rounded-full
              bg-white/15
              px-4
              py-2
              backdrop-blur
              transition-all
              duration-300
              hover:scale-105
              hover:bg-white/25
            "
          >
            <Star
              size={20}
              className={`
                transition-all
                duration-300
                ${
                  favorite
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-white"
                }
              `}
            />

            <span className="text-sm font-medium">
              {favorite
                ? "Saved"
                : "Add Favorite"}
            </span>
          </button>

          <img
            src={weatherIcon}
            alt={
              current.condition
                .text
            }
            className="h-28 w-28"
          />
        </div>
      </div>

      {/* Temperature */}

      <div className="mt-10">
        <h1 className="text-7xl font-bold">
          {formatTemperature(
            current.temp_c,
            temperatureUnit
          )}
        </h1>

        <p className="mt-2 text-2xl">
          {
            current.condition
              .text
          }
        </p>

        <p className="mt-1 text-slate-300">
          Feels like{" "}
          {formatTemperature(
            current.feelslike_c,
            temperatureUnit
          )}
        </p>
      </div>

      {/* Weather Stats */}

      <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-5">
        {/* Wind */}

        <div>
          <Wind
            className="mb-2 text-cyan-300"
            size={22}
          />

          <p className="text-sm text-slate-300">
            Wind
          </p>

          <h3 className="font-semibold">
            {formatWindSpeed(
              current.wind_kph,
              windUnit
            )}
          </h3>
        </div>

        {/* Humidity */}

        <div>
          <Droplets
            className="mb-2 text-blue-300"
            size={22}
          />

          <p className="text-sm text-slate-300">
            Humidity
          </p>

          <h3 className="font-semibold">
            {current.humidity}%
          </h3>
        </div>

        {/* Rain */}

        <div>
          <CloudRain
            className="mb-2 text-sky-300"
            size={22}
          />

          <p className="text-sm text-slate-300">
            Rain
          </p>

          <h3 className="font-semibold">
            {current.precip_mm}{" "}
            mm
          </h3>
        </div>

        {/* Visibility */}

        <div>
          <Eye
            className="mb-2 text-indigo-300"
            size={22}
          />

          <p className="text-sm text-slate-300">
            Visibility
          </p>

          <h3 className="font-semibold">
            {current.vis_km}{" "}
            km
          </h3>
        </div>

        {/* Pressure */}

        <div>
          <Gauge
            className="mb-2 text-orange-300"
            size={22}
          />

          <p className="text-sm text-slate-300">
            Pressure
          </p>

          <h3 className="font-semibold">
            {
              current.pressure_mb
            }{" "}
            hPa
          </h3>
        </div>
      </div>
    </div>
  );
}