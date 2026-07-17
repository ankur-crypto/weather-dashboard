"use client";

import {
  CalendarDays,
  ExternalLink,
  Newspaper,
  Tag,
} from "lucide-react";

interface Props {
  city: string;
}

const demoNews = [
  {
    id: 1,
    title: "Heavy rainfall expected over eastern regions",
    source: "Weather News",
    date: "Today",
    category: "Rain",
  },
  {
    id: 2,
    title: "Temperature likely to rise during the weekend",
    source: "Climate Report",
    date: "Today",
    category: "Temperature",
  },
  {
    id: 3,
    title: "Strong winds may affect transportation",
    source: "Meteorological Department",
    date: "Yesterday",
    category: "Wind",
  },
];

export default function WeatherNews({
  city,
}: Props) {
  return (
    <section
      className="
        mt-8
        rounded-3xl
        border
        border-slate-200
        bg-white/90
        p-6
        shadow-lg
        backdrop-blur-xl
        dark:border-slate-700
        dark:bg-[#111827]/90
      "
    >
      {/* Header */}

      <div className="mb-8 flex items-center gap-4">
        <div className="rounded-2xl bg-blue-100 p-3 dark:bg-blue-900/30">
          <Newspaper
            size={26}
            className="text-blue-600 dark:text-blue-400"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Weather News
          </h2>

          <p className="text-slate-500 dark:text-slate-400">
            Latest weather updates for{" "}
            <span className="font-semibold">
              {city}
            </span>
          </p>
        </div>
      </div>

      {/* News List */}

      <div className="space-y-5">
        {demoNews.map((news) => (
          <article
            key={news.id}
            className="
              group
              rounded-3xl
              border
              border-slate-200
              bg-slate-50
              p-5
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-blue-400
              hover:shadow-lg
              dark:border-slate-700
              dark:bg-slate-800
              dark:hover:border-blue-500
            "
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <span
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    bg-blue-100
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-blue-700
                    dark:bg-blue-900/30
                    dark:text-blue-300
                  "
                >
                  <Tag size={12} />
                  {news.category}
                </span>

                <h3 className="mt-4 text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                  {news.title}
                </h3>

                <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-slate-500 dark:text-slate-400">
                  <span>{news.source}</span>

                  <span className="flex items-center gap-1">
                    <CalendarDays size={15} />
                    {news.date}
                  </span>
                </div>
              </div>

              <button
                className="
                  rounded-2xl
                  bg-blue-600
                  p-3
                  text-white
                  transition-all
                  duration-300
                  hover:scale-105
                  hover:bg-blue-700
                "
                aria-label={`Open article: ${news.title}`}
              >
                <ExternalLink size={18} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}