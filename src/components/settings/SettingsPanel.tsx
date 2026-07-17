"use client";

import { Settings } from "lucide-react";
import { useSettingsStore } from "@/store/settingsStore";

export default function SettingsPanel() {
  const {
    temperatureUnit,
    windUnit,
    autoRefresh,
    setTemperatureUnit,
    setWindUnit,
    toggleAutoRefresh,
  } = useSettingsStore();

  return (
    <div className="mt-8 rounded-3xl border border-slate-700 bg-[#111827]/90 p-6 shadow-xl backdrop-blur-xl">
      <div className="mb-6 flex items-center gap-3">
        <Settings
          size={28}
          className="text-cyan-400"
        />

        <div>
          <h2 className="text-2xl font-bold text-white">
            Settings
          </h2>

          <p className="text-slate-400">
            Customize your dashboard
          </p>
        </div>
      </div>

      <div className="space-y-6">

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Temperature Unit
          </label>

          <select
            value={temperatureUnit}
            onChange={(e) =>
              setTemperatureUnit(
                e.target.value as "C" | "F"
              )
            }
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
          >
            <option value="C">Celsius</option>
            <option value="F">Fahrenheit</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Wind Speed
          </label>

          <select
            value={windUnit}
            onChange={(e) =>
              setWindUnit(
                e.target.value as "kph" | "mph"
              )
            }
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
          >
            <option value="kph">km/h</option>
            <option value="mph">mph</option>
          </select>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-slate-800 p-4">
          <span className="text-white">
            Auto Refresh
          </span>

          <input
            type="checkbox"
            checked={autoRefresh}
            onChange={toggleAutoRefresh}
          />
        </div>

      </div>
    </div>
  );
}