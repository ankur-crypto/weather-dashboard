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

interface Props {
  weather: WeatherData;
}

export default function CurrentWeather({
  weather,
}: Props) {
  if (!weather) return null;

  const current = weather.current;
  const location = weather.location;

  const {
    addFavorite,
    removeFavorite,
    isFavorite,
  } = useFavoriteStore();

  const favorite = isFavorite(location.name);

  const handleFavorite = () => {
    if (favorite) {
      removeFavorite(location.name);
    } else {
      addFavorite(location.name);
    }
  };

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
          url("https:${current.condition.icon}")
        `,
      }}
    >
      {/* Header */}

      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-200">
            <MapPin size={18} />

            <span>
              {location.name}, {location.country}
            </span>
          </div>

          <p className="mt-2 text-sm text-slate-300">
            {location.localtime}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleFavorite}
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
              className={`transition-all duration-300 ${
                favorite
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-white"
              }`}
            />

            <span className="text-sm font-medium">
              {favorite
                ? "Saved"
                : "Add Favorite"}
            </span>
          </button>

          <img
            src={`https:${current.condition.icon}`}
            alt={current.condition.text}
            className="h-28 w-28"
          />
        </div>
      </div>

      {/* Temperature */}

      <div className="mt-10">
        <h1 className="text-7xl font-bold">
          {current.temp_c}°
        </h1>

        <p className="mt-2 text-2xl">
          {current.condition.text}
        </p>

        <p className="mt-1 text-slate-300">
          Feels like {current.feelslike_c}°
        </p>
      </div>

      {/* Weather Stats */}

      <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-5">
        <div>
          <Wind
            className="mb-2 text-cyan-300"
            size={22}
          />

          <p className="text-sm text-slate-300">
            Wind
          </p>

          <h3 className="font-semibold">
            {current.wind_kph} km/h
          </h3>
        </div>

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

        <div>
          <CloudRain
            className="mb-2 text-sky-300"
            size={22}
          />

          <p className="text-sm text-slate-300">
            Rain
          </p>

          <h3 className="font-semibold">
            {current.precip_mm} mm
          </h3>
        </div>

        <div>
          <Eye
            className="mb-2 text-indigo-300"
            size={22}
          />

          <p className="text-sm text-slate-300">
            Visibility
          </p>

          <h3 className="font-semibold">
            {current.vis_km} km
          </h3>
        </div>

        <div>
          <Gauge
            className="mb-2 text-orange-300"
            size={22}
          />

          <p className="text-sm text-slate-300">
            Pressure
          </p>

          <h3 className="font-semibold">
            {current.pressure_mb} hPa
          </h3>
        </div>
      </div>
    </div>
  );
}