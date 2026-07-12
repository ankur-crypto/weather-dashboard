import { Sun } from "lucide-react";
import { WeatherData } from "@/types/weather";

interface Props {
  weather: WeatherData;
}

export default function UVCard({ weather }: Props) {
  const uv = weather.current.uv;

  const getUVStatus = () => {
    if (uv <= 2)
      return {
        text: "Low",
        color: "text-green-400",
      };

    if (uv <= 5)
      return {
        text: "Moderate",
        color: "text-yellow-400",
      };

    if (uv <= 7)
      return {
        text: "High",
        color: "text-orange-400",
      };

    if (uv <= 10)
      return {
        text: "Very High",
        color: "text-red-400",
      };

    return {
      text: "Extreme",
      color: "text-purple-400",
    };
  };

  const status = getUVStatus();

  return (
    <div className="rounded-3xl border border-slate-700 bg-[#111827] p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        UV Index
      </h2>

      <div className="flex justify-center">
        <Sun
          size={80}
          className="text-yellow-400"
        />
      </div>

      <h1 className="mt-6 text-center text-5xl font-bold text-white">
        {uv}
      </h1>

      <p
        className={`mt-3 text-center text-lg font-semibold ${status.color}`}
      >
        {status.text}
      </p>

      <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-700">
        <div
          className="h-full rounded-full bg-yellow-400"
          style={{
            width: `${Math.min((uv / 11) * 100, 100)}%`,
          }}
        />
      </div>
    </div>
  );
}