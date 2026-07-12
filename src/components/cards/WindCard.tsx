import { Wind } from "lucide-react";
import { WeatherData } from "@/types/weather";

interface Props {
  weather: WeatherData;
}

export default function WindCard({ weather }: Props) {
  return (
    <div className="rounded-3xl border border-slate-700 bg-[#111827] p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Wind
      </h2>

      <div className="flex items-center justify-center">
        <div className="rounded-full border-4 border-cyan-400 p-8">
          <Wind size={60} className="text-cyan-400" />
        </div>
      </div>

      <div className="mt-8 space-y-3">
        <div className="flex justify-between">
          <span className="text-slate-400">Speed</span>
          <span className="font-semibold text-white">
            {weather.current.wind_kph} km/h
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-400">Direction</span>
          <span className="font-semibold text-white">
            {weather.current.wind_dir}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-400">Pressure</span>
          <span className="font-semibold text-white">
            {weather.current.pressure_mb} mb
          </span>
        </div>
      </div>
    </div>
  );
}