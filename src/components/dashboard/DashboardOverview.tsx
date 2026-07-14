"use client";

import {
  Star,
  Thermometer,
  Droplets,
  Wind,
} from "lucide-react";

import { WeatherData } from "@/types/weather";

interface Props {
  weather: WeatherData;
  favoriteCount: number;
}

export default function DashboardOverview({
  weather,
  favoriteCount,
}: Props) {
  const cards = [
    {
      title: "Favorites",
      value: favoriteCount,
      icon: <Star className="text-yellow-400" size={26} />,
    },
    {
      title: "Temperature",
      value: `${weather.current.temp_c}°C`,
      icon: (
        <Thermometer
          className="text-red-400"
          size={26}
        />
      ),
    },
    {
      title: "Humidity",
      value: `${weather.current.humidity}%`,
      icon: (
        <Droplets
          className="text-blue-400"
          size={26}
        />
      ),
    },
    {
      title: "Wind",
      value: `${weather.current.wind_kph} km/h`,
      icon: (
        <Wind
          className="text-cyan-400"
          size={26}
        />
      ),
    },
  ];

  return (
    <div className="mb-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

      {cards.map((card) => (

        <div
          key={card.title}
          className="rounded-3xl border border-slate-700 bg-[#111827]/80 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-500"
        >
          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-400">
                {card.title}
              </p>

              <h2 className="mt-3 text-3xl font-bold text-white">
                {card.value}
              </h2>

            </div>

            {card.icon}

          </div>

        </div>

      ))}

    </div>
  );
}