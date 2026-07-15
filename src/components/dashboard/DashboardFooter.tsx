"use client";

export default function DashboardFooter() {
  return (
    <footer className="mt-10 overflow-hidden rounded-3xl border border-slate-700 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 shadow-2xl">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}

        <div>
          <h2 className="text-3xl font-bold text-white">
            🌤 Weather Dashboard
          </h2>

          <p className="mt-4 max-w-2xl leading-7 text-slate-400">
            A professional weather dashboard built using
            Next.js, React, TypeScript,
            Tailwind CSS, Zustand,
            WeatherAPI, Leaflet and Recharts.
          </p>
        </div>

        {/* Right */}

        <div className="grid grid-cols-2 gap-8 text-center">
          <div>
            <p className="text-sm text-slate-500">
              Version
            </p>

            <h3 className="mt-2 text-2xl font-bold text-white">
              2.2.0
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Theme
            </p>

            <h3 className="mt-2 text-2xl font-bold text-white">
              Dynamic
            </h3>
          </div>
        </div>
      </div>

      <div className="my-8 h-px bg-slate-700" />

      <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-500 md:flex-row">
        <p>
          © {new Date().getFullYear()} Weather Dashboard
        </p>

        <p>
          Built with ❤️ using Next.js, React,
          Tailwind CSS & WeatherAPI
        </p>
      </div>
    </footer>
  );
}