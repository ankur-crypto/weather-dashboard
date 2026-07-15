"use client";

import { useMemo } from "react";

import {
  CloudRain,
  Sun,
  Umbrella,
  Car,
  Shirt,
} from "lucide-react";

import { WeatherData } from "@/types/weather";

interface Props {
  weather: WeatherData;
}

export default function WeatherAssistant({
  weather,
}: Props) {
  const advice = useMemo(() => {
    const current = weather.current;

    if (current.precip_mm > 2) {
      return {
        icon: <Umbrella size={24} />,
        title: "Carry an Umbrella",
        description:
          "Rain is expected today. Don't forget your umbrella.",
      };
    }

    if (current.temp_c > 35) {
      return {
        icon: <Sun size={24} />,
        title: "Stay Hydrated",
        description:
          "High temperatures today. Drink plenty of water.",
      };
    }

    if (current.wind_kph > 35) {
      return {
        icon: <Car size={24} />,
        title: "Drive Carefully",
        description:
          "Strong winds may affect travel conditions.",
      };
    }

    return {
      icon: <Shirt size={24} />,
      title: "Great Weather",
      description:
        "Perfect day for outdoor activities.",
    };
  }, [weather]);

  return (
    <div className="mt-8 rounded-3xl border border-slate-700 bg-[#111827]/90 p-6 shadow-xl backdrop-blur-xl">

      <div className="mb-6 flex items-center gap-3">

        <CloudRain
          className="text-blue-400"
          size={28}
        />

        <h2 className="text-2xl font-bold text-white">
          AI Weather Assistant
        </h2>

      </div>

      <div className="rounded-2xl bg-slate-800 p-6">

        <div className="flex items-center gap-4">

          <div className="rounded-full bg-blue-600 p-4 text-white">

            {advice.icon}

          </div>

          <div>

            <h3 className="text-xl font-semibold text-white">

              {advice.title}

            </h3>

            <p className="mt-2 text-slate-400">

              {advice.description}

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}