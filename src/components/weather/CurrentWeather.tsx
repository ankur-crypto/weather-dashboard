"use client";

import {
  Wind,
  Droplets,
  Eye,
  Gauge,
  CloudRain,
  MapPin,
} from "lucide-react";

interface Props {
  weather: any;
}

export default function CurrentWeather({ weather }: Props) {
  if (!weather) return null;

  const current = weather.current;
  const location = weather.location;

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-slate-700 bg-cover bg-center p-8 text-white shadow-xl"
      style={{
        backgroundImage: `linear-gradient(rgba(8,15,30,.55), rgba(8,15,30,.75)), url("https:${current.condition.icon}")`,
      }}
    >
      {/* Top */}
      <div className="flex items-center justify-between">
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

        <img
          src={`https:${current.condition.icon}`}
          alt={current.condition.text}
          className="h-28 w-28"
        />
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

      {/* Bottom Stats */}
      <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-5">
        <div>
          <Wind className="mb-2 text-cyan-300" />
          <p className="text-sm text-slate-300">Wind</p>
          <h3 className="font-semibold">
            {current.wind_kph} km/h
          </h3>
        </div>

        <div>
          <Droplets className="mb-2 text-blue-300" />
          <p className="text-sm text-slate-300">Humidity</p>
          <h3 className="font-semibold">
            {current.humidity}%
          </h3>
        </div>

        <div>
          <CloudRain className="mb-2 text-sky-300" />
          <p className="text-sm text-slate-300">Rain</p>
          <h3 className="font-semibold">
            {current.precip_mm} mm
          </h3>
        </div>

        <div>
          <Eye className="mb-2 text-indigo-300" />
          <p className="text-sm text-slate-300">Visibility</p>
          <h3 className="font-semibold">
            {current.vis_km} km
          </h3>
        </div>

        <div>
          <Gauge className="mb-2 text-orange-300" />
          <p className="text-sm text-slate-300">Pressure</p>
          <h3 className="font-semibold">
            {current.pressure_mb} hPa
          </h3>
        </div>
      </div>
    </div>
  );
}