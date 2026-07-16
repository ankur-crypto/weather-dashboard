"use client";

import { Newspaper, ExternalLink } from "lucide-react";

interface Props {
  city: string;
}

const demoNews = [
  {
    id: 1,
    title: "Heavy rainfall expected over eastern regions",
    source: "Weather News",
    date: "Today",
  },
  {
    id: 2,
    title: "Temperature likely to rise during the weekend",
    source: "Climate Report",
    date: "Today",
  },
  {
    id: 3,
    title: "Strong winds may affect transportation",
    source: "Meteorological Department",
    date: "Yesterday",
  },
];

export default function WeatherNews({
  city,
}: Props) {
  return (
    <div className="mt-8 rounded-3xl border border-slate-700 bg-[#111827]/90 p-6 shadow-xl backdrop-blur-xl">

      <div className="mb-6 flex items-center gap-3">

        <Newspaper
          size={28}
          className="text-blue-400"
        />

        <div>

          <h2 className="text-2xl font-bold text-white">
            Weather News
          </h2>

          <p className="text-slate-400">
            Latest updates for {city}
          </p>

        </div>

      </div>

      <div className="space-y-4">

        {demoNews.map((news) => (

          <div
            key={news.id}
            className="rounded-2xl border border-slate-700 bg-slate-800 p-5 transition hover:border-blue-500"
          >

            <div className="flex items-start justify-between gap-4">

              <div>

                <h3 className="text-lg font-semibold text-white">
                  {news.title}
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  {news.source} • {news.date}
                </p>

              </div>

              <button className="rounded-lg bg-blue-600 p-3 transition hover:bg-blue-700">
                <ExternalLink
                  size={18}
                  className="text-white"
                />
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}