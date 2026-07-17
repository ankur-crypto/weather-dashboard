"use client";

import {
  CloudSun,
  Palette,
  Code2,
  Heart,
} from "lucide-react";

export default function DashboardFooter() {
  return (
    <footer
      className="
        mt-10
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white/90
        p-8
        shadow-xl
        backdrop-blur-xl
        transition-all
        duration-300
        dark:border-slate-700
        dark:bg-[#111827]/90
      "
    >
      {/* Top */}

      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}

        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-blue-100 p-3 dark:bg-blue-900/30">
              <CloudSun
                size={28}
                className="text-blue-600 dark:text-blue-400"
              />
            </div>

            <div>
              <h2 className="bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-500 bg-clip-text text-3xl font-bold text-transparent">
                Weather Dashboard
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Modern Weather Monitoring Platform
              </p>
            </div>
          </div>

          <p className="mt-6 leading-7 text-slate-600 dark:text-slate-400">
            A modern weather dashboard built using
            <span className="font-semibold text-slate-900 dark:text-white">
              {" "}
              Next.js, React, TypeScript, Tailwind CSS,
              Zustand, WeatherAPI, Leaflet
            </span>{" "}
            and{" "}
            <span className="font-semibold text-slate-900 dark:text-white">
              Recharts
            </span>
            .
          </p>
        </div>

        {/* Right */}

        <div className="grid grid-cols-2 gap-4">
          <div
            className="
              rounded-2xl
              border
              border-slate-200
              bg-slate-100
              p-5
              text-center
              dark:border-slate-700
              dark:bg-slate-800
            "
          >
            <Code2
              size={22}
              className="mx-auto mb-2 text-blue-500"
            />

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Version
            </p>

            <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
              2.2.0
            </h3>
          </div>

          <div
            className="
              rounded-2xl
              border
              border-slate-200
              bg-slate-100
              p-5
              text-center
              dark:border-slate-700
              dark:bg-slate-800
            "
          >
            <Palette
              size={22}
              className="mx-auto mb-2 text-violet-500"
            />

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Theme
            </p>

            <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
              Dynamic
            </h3>
          </div>
        </div>
      </div>

      {/* Divider */}

      <div className="my-8 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-700" />

      {/* Bottom */}

      <div className="flex flex-col gap-4 text-sm md:flex-row md:items-center md:justify-between">
        <p className="text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} Weather Dashboard.
          All rights reserved.
        </p>

        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
          <span>Built with</span>

          <Heart
            size={16}
            className="fill-red-500 text-red-500"
          />

          <span>
            using Next.js, React & WeatherAPI
          </span>
        </div>
      </div>
    </footer>
  );
}