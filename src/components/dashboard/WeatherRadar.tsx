"use client";

import dynamic from "next/dynamic";

const RadarMap = dynamic(
  () => import("./RadarMap"),
  {
    ssr: false,
  }
);

export default function WeatherRadar() {
  return (
    <div className="mt-8 rounded-3xl border border-slate-700 bg-[#111827]/90 p-6 shadow-xl backdrop-blur-xl">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">
            🌧 Live Weather Radar
          </h2>

          <p className="mt-1 text-slate-400">
            Rain • Clouds • Wind
          </p>

        </div>

        <div className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
          LIVE
        </div>

      </div>

      <div className="overflow-hidden rounded-2xl">
        <RadarMap />
      </div>

    </div>
  );
}