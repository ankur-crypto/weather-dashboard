"use client";

import dynamic from "next/dynamic";

import WeatherAlerts from "../alerts/WeatherAlerts";

const WeatherMap = dynamic(
  () => import("../map/WeatherMap"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[420px] items-center justify-center rounded-3xl border border-slate-700 bg-[#111827] text-slate-400">
        Loading Map...
      </div>
    ),
  }
);

interface Props {
  weather: any;
}

export default function DashboardMap({
  weather,
}: Props) {
  return (
    <div className="mt-6 grid gap-6 xl:grid-cols-3">

      <div className="xl:col-span-2">

        <WeatherMap
          lat={weather.location.lat}
          lon={weather.location.lon}
          city={weather.location.name}
        />

      </div>

      <WeatherAlerts weather={weather} />

    </div>
  );
}