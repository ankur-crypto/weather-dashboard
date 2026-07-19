"use client";

import {
  Settings,
  Thermometer,
  Wind,
  RefreshCw,
} from "lucide-react";

import {
  useSettingsStore,
  type TemperatureUnit,
  type WindUnit,
} from "@/store/settingsStore";

export default function SettingsPanel() {
  /*
   * Settings Store
   */
  const {
    temperatureUnit,
    windUnit,
    autoRefresh,
    setTemperatureUnit,
    setWindUnit,
    toggleAutoRefresh,
  } = useSettingsStore();

  return (
    <section
      className="
        mt-8
        rounded-3xl
        border
        border-slate-200
        bg-white/90
        p-6
        shadow-xl
        backdrop-blur-xl
        transition-all
        duration-300
        dark:border-slate-700
        dark:bg-[#111827]/90
      "
    >
      {/* Header */}

      <div className="mb-8 flex items-center gap-4">
        <div
          className="
            rounded-2xl
            bg-cyan-100
            p-3
            dark:bg-cyan-900/30
          "
        >
          <Settings
            size={28}
            className="
              text-cyan-600
              dark:text-cyan-400
            "
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Settings
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Customize your weather
            dashboard
          </p>
        </div>
      </div>

      {/* Settings */}

      <div className="space-y-5">
        {/* Temperature Unit */}

        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-slate-50
            p-5
            dark:border-slate-700
            dark:bg-slate-800
          "
        >
          <div className="mb-4 flex items-center gap-3">
            <div
              className="
                rounded-xl
                bg-orange-100
                p-2.5
                dark:bg-orange-900/30
              "
            >
              <Thermometer
                size={20}
                className="
                  text-orange-600
                  dark:text-orange-400
                "
              />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Temperature Unit
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose how temperature
                values are displayed
              </p>
            </div>
          </div>

          <select
            value={temperatureUnit}
            onChange={(e) =>
              setTemperatureUnit(
                e.target
                  .value as TemperatureUnit
              )
            }
            className="
              w-full
              cursor-pointer
              rounded-xl
              border
              border-slate-300
              bg-white
              p-3
              text-slate-900
              outline-none
              transition-all
              focus:border-cyan-500
              focus:ring-4
              focus:ring-cyan-100
              dark:border-slate-600
              dark:bg-slate-900
              dark:text-white
              dark:focus:ring-cyan-900/30
            "
          >
            <option value="C">
              Celsius (°C)
            </option>

            <option value="F">
              Fahrenheit (°F)
            </option>
          </select>
        </div>

        {/* Wind Speed Unit */}

        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-slate-50
            p-5
            dark:border-slate-700
            dark:bg-slate-800
          "
        >
          <div className="mb-4 flex items-center gap-3">
            <div
              className="
                rounded-xl
                bg-blue-100
                p-2.5
                dark:bg-blue-900/30
              "
            >
              <Wind
                size={20}
                className="
                  text-blue-600
                  dark:text-blue-400
                "
              />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Wind Speed Unit
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose how wind speed is
                displayed
              </p>
            </div>
          </div>

          <select
            value={windUnit}
            onChange={(e) =>
              setWindUnit(
                e.target
                  .value as WindUnit
              )
            }
            className="
              w-full
              cursor-pointer
              rounded-xl
              border
              border-slate-300
              bg-white
              p-3
              text-slate-900
              outline-none
              transition-all
              focus:border-cyan-500
              focus:ring-4
              focus:ring-cyan-100
              dark:border-slate-600
              dark:bg-slate-900
              dark:text-white
              dark:focus:ring-cyan-900/30
            "
          >
            <option value="kph">
              Kilometers per hour (km/h)
            </option>

            <option value="mph">
              Miles per hour (mph)
            </option>
          </select>
        </div>

        {/* Auto Refresh */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-4
            rounded-2xl
            border
            border-slate-200
            bg-slate-50
            p-5
            dark:border-slate-700
            dark:bg-slate-800
          "
        >
          <div className="flex items-center gap-3">
            <div
              className={`
                rounded-xl
                p-2.5
                transition-colors
                ${
                  autoRefresh
                    ? "bg-green-100 dark:bg-green-900/30"
                    : "bg-slate-200 dark:bg-slate-700"
                }
              `}
            >
              <RefreshCw
                size={20}
                className={`
                  ${
                    autoRefresh
                      ? "text-green-600 dark:text-green-400"
                      : "text-slate-500 dark:text-slate-400"
                  }
                `}
              />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Auto Refresh
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                {autoRefresh
                  ? "Weather updates automatically every 10 minutes"
                  : "Automatic weather updates are disabled"}
              </p>
            </div>
          </div>

          {/* Toggle Switch */}

          <button
            type="button"
            role="switch"
            aria-checked={autoRefresh}
            aria-label="Toggle automatic weather refresh"
            onClick={toggleAutoRefresh}
            className={`
              relative
              h-7
              w-14
              shrink-0
              rounded-full
              transition-colors
              duration-300
              focus:outline-none
              focus:ring-4
              focus:ring-cyan-200
              dark:focus:ring-cyan-900/40
              ${
                autoRefresh
                  ? "bg-green-500"
                  : "bg-slate-400 dark:bg-slate-600"
              }
            `}
          >
            <span
              className={`
                absolute
                top-1
                h-5
                w-5
                rounded-full
                bg-white
                shadow-md
                transition-all
                duration-300
                ${
                  autoRefresh
                    ? "left-8"
                    : "left-1"
                }
              `}
            />
          </button>
        </div>
      </div>

      {/* Status */}

      <div
        className="
          mt-6
          rounded-2xl
          border
          border-cyan-200
          bg-cyan-50
          px-4
          py-3
          text-sm
          text-cyan-800
          dark:border-cyan-800/50
          dark:bg-cyan-900/10
          dark:text-cyan-300
        "
      >
        Your settings are saved
        automatically and will remain
        after refreshing the page.
      </div>
    </section>
  );
}