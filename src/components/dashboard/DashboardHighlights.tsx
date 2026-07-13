"use client";

interface Props {
  weather: any;
}

export default function DashboardHighlights({
  weather,
}: Props) {
  return (
    <section className="mt-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Today's Highlights
      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-3xl border border-slate-700 bg-[#111827]/80 p-6">
          <p className="text-sm text-slate-400">
            Feels Like
          </p>

          <h3 className="mt-3 text-4xl font-bold text-white">
            {weather.current.feelslike_c}°
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Apparent Temperature
          </p>
        </div>

        <div className="rounded-3xl border border-slate-700 bg-[#111827]/80 p-6">
          <p className="text-sm text-slate-400">
            Visibility
          </p>

          <h3 className="mt-3 text-4xl font-bold text-white">
            {weather.current.vis_km} km
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Current Visibility
          </p>
        </div>

        <div className="rounded-3xl border border-slate-700 bg-[#111827]/80 p-6">
          <p className="text-sm text-slate-400">
            Pressure
          </p>

          <h3 className="mt-3 text-4xl font-bold text-white">
            {weather.current.pressure_mb} mb
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Atmospheric Pressure
          </p>
        </div>

        <div className="rounded-3xl border border-slate-700 bg-[#111827]/80 p-6">
          <p className="text-sm text-slate-400">
            Weather
          </p>

          <h3 className="mt-3 text-2xl font-bold text-white">
            {weather.current.condition.text}
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Live Weather
          </p>
        </div>

      </div>
    </section>
  );
}