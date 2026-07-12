"use client";

interface Props {
  weather: any;
}

export default function WeatherAlerts({ weather }: Props) {
  if (!weather) return null;

  const current = weather.current;

  const alerts = [];

  if (current.temp_c >= 35) {
    alerts.push({
      title: "Heat Advisory",
      message: "High temperatures expected today.",
      color: "border-red-500",
    });
  }

  if (current.wind_kph >= 30) {
    alerts.push({
      title: "Strong Wind",
      message: "Strong winds are expected.",
      color: "border-yellow-500",
    });
  }

  if (current.precip_mm > 0) {
    alerts.push({
      title: "Rain Alert",
      message: "Rain is currently occurring.",
      color: "border-blue-500",
    });
  }

  return (
    <div className="rounded-3xl border border-slate-700 bg-[#111827] p-6">
      <h2 className="mb-5 text-xl font-semibold text-white">
        Weather Alerts
      </h2>

      {alerts.length === 0 ? (
        <p className="text-slate-400">
          No active weather alerts.
        </p>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className={`rounded-xl border-l-4 ${alert.color} bg-slate-800 p-4`}
            >
              <h3 className="font-semibold text-white">
                {alert.title}
              </h3>

              <p className="mt-1 text-sm text-slate-300">
                {alert.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}