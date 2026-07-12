import { WeatherData } from "@/types/weather";

interface Props {
  weather: WeatherData;
}

export default function WeeklyForecast({ weather }: Props) {
  if (!weather?.forecast) return null;

  const days = weather.forecast.forecastday;

  return (
    <div className="rounded-3xl border border-slate-700 bg-[#111827]/90 p-6 backdrop-blur-md shadow-xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            7-Day Forecast
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Weather outlook for the next 7 days
          </p>
        </div>

        <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white">
          Weekly
        </span>
      </div>

      <div className="space-y-4">
        {days.map((day, index) => (
          <div
            key={day.date}
            className="flex items-center justify-between rounded-3xl border border-slate-700 bg-slate-800/70 p-5 transition-all duration-300 hover:scale-[1.02] hover:border-blue-500 hover:bg-slate-700"
          >
            {/* Day */}
            <div className="w-28">
              <h3 className="text-lg font-semibold text-white">
                {index === 0
                  ? "Today"
                  : new Date(day.date).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                      }
                    )}
              </h3>

              <p className="text-sm text-slate-400">
                {new Date(day.date).toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "numeric",
                  }
                )}
              </p>
            </div>

            {/* Weather */}
            <div className="flex items-center gap-4">
              <img
                src={`https:${day.day.condition.icon}`}
                alt={day.day.condition.text}
                className="h-14 w-14"
              />

              <div>
                <p className="font-medium text-white">
                  {day.day.condition.text}
                </p>

                <p className="text-sm text-slate-400">
                  Expected conditions
                </p>
              </div>
            </div>

            {/* Temperature */}
            <div className="flex gap-3">
              <span className="rounded-full bg-red-500/20 px-4 py-2 font-semibold text-red-300">
                {day.day.maxtemp_c}°
              </span>

              <span className="rounded-full bg-cyan-500/20 px-4 py-2 font-semibold text-cyan-300">
                {day.day.mintemp_c}°
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}