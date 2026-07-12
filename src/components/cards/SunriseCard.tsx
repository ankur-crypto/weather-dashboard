import { Sunrise, Sunset } from "lucide-react";
import { WeatherData } from "@/types/weather";

interface Props {
  weather: WeatherData;
}

export default function SunriseCard({ weather }: Props) {
  const astro = weather.forecast.forecastday[0].astro;

  return (
    <div className="rounded-3xl border border-slate-700 bg-[#111827] p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Sunrise & Sunset
      </h2>

      <div className="space-y-6">
        {/* Sunrise */}
        <div className="flex items-center justify-between rounded-xl bg-slate-800 p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-yellow-500/20 p-3">
              <Sunrise className="text-yellow-400" size={26} />
            </div>

            <div>
              <p className="text-sm text-slate-400">Sunrise</p>
              <h3 className="text-lg font-semibold text-white">
                {astro.sunrise}
              </h3>
            </div>
          </div>
        </div>

        {/* Sunset */}
        <div className="flex items-center justify-between rounded-xl bg-slate-800 p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-orange-500/20 p-3">
              <Sunset className="text-orange-400" size={26} />
            </div>

            <div>
              <p className="text-sm text-slate-400">Sunset</p>
              <h3 className="text-lg font-semibold text-white">
                {astro.sunset}
              </h3>
            </div>
          </div>
        </div>

        {/* Decorative Daylight Bar */}
        <div>
          <div className="mb-2 flex justify-between text-xs text-slate-400">
            <span>Daylight</span>
            <span>Sun Cycle</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-700">
            <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
}