import { WeatherData } from "@/types/weather";

interface Props {
  weather: WeatherData;
}

export default function HourlyForecast({ weather }: Props) {
  if (!weather?.forecast) {
    return (
      <div className="rounded-3xl border border-slate-700 bg-[#111827] p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-white">
          Hourly Forecast
        </h2>

        <div className="mt-6 flex h-64 items-center justify-center">
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  const hours = weather.forecast.forecastday[0].hour;

  return (
    <div className="rounded-3xl border border-slate-700 bg-[#111827] p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">
          Hourly Forecast
        </h2>

        <button className="text-sm text-blue-400 hover:text-blue-300">
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {hours.slice(9, 15).map((hour) => (
          <div
            key={hour.time_epoch}
            className="rounded-2xl bg-slate-800 p-4 text-center transition hover:bg-slate-700"
          >
            <p className="text-sm text-slate-300">
              {new Date(hour.time).toLocaleTimeString([], {
                hour: "numeric",
                hour12: true,
              })}
            </p>

            <img
              src={`https:${hour.condition.icon}`}
              alt={hour.condition.text}
              className="mx-auto my-4 h-12 w-12"
            />

            <h3 className="text-2xl font-bold text-white">
              {hour.temp_c}°
            </h3>

            <p className="mt-2 text-sm text-slate-300">
              {hour.condition.text}
            </p>

            <p className="mt-2 text-cyan-400">
              💧 {hour.chance_of_rain}%
            </p>

            <p className="mt-1 text-xs text-slate-500">
              🌬 {hour.wind_kph} km/h
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}