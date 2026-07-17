"use client";

import {
  Clock3,
  Cloud,
  MapPin,
  Thermometer,
  Trash2,
} from "lucide-react";

import { useHistoryStore } from "@/store/historyStore";

export default function WeatherHistory() {
  const history = useHistoryStore(
    (state) => state.history
  );

  const clearHistory = useHistoryStore(
    (state) => state.clearHistory
  );

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

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-cyan-100 p-3 dark:bg-cyan-900/30">
            <Clock3
              size={28}
              className="text-cyan-600 dark:text-cyan-400"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Weather History
            </h2>

            <p className="text-slate-500 dark:text-slate-400">
              Your recent weather searches
            </p>
          </div>
        </div>

        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="
              inline-flex
              items-center
              gap-2
              rounded-2xl
              bg-red-500
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-red-600
              hover:shadow-lg
            "
          >
            <Trash2 size={16} />
            Clear History
          </button>
        )}
      </div>

      {/* Empty State */}

      {history.length === 0 ? (
        <div
          className="
            rounded-3xl
            border-2
            border-dashed
            border-slate-300
            py-16
            text-center
            dark:border-slate-700
          "
        >
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
            <Clock3
              size={38}
              className="text-slate-500"
            />
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            No Search History
          </h3>

          <p className="mt-3 text-slate-500 dark:text-slate-400">
            Search for a city to start building your
            weather history.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {history.map((item, index) => (
            <article
              key={`${item.city}-${item.time}-${index}`}
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
                hover:border-cyan-400
                hover:shadow-lg
                dark:border-slate-700
                dark:bg-slate-800
                dark:hover:border-cyan-500
              "
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
                    <MapPin
                      size={20}
                      className="text-cyan-500"
                    />
                    {item.city}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-6">
                    <div className="flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
                      <Thermometer size={16} />
                      {item.temperature}°C
                    </div>

                    <div className="flex items-center gap-2 rounded-full bg-sky-100 px-4 py-2 text-sm font-medium text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">
                      <Cloud size={16} />
                      {item.condition}
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                  {item.time}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
} 