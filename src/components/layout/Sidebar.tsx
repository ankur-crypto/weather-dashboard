"use client";

import Logo from "./Logo";
import SidebarItem from "./SidebarItem";

import {
  Home,
  CloudRain,
  Map,
  Wind,
  TriangleAlert,
  History,
  Settings,
  MapPin,
  Bell,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="hidden h-screen w-72 flex-col justify-between border-r border-slate-800 bg-[#0B1220] p-6 lg:flex">
      {/* Top Section */}
      <div>
        <Logo />

        <nav className="mt-10 space-y-2">
          <SidebarItem
            href="/dashboard"
            icon={Home}
            title="Overview"
          />

          <SidebarItem
            href="/forecast"
            icon={CloudRain}
            title="Forecast"
          />

          <SidebarItem
            href="/maps"
            icon={Map}
            title="Maps"
          />

          <SidebarItem
            href="/air-quality"
            icon={Wind}
            title="Air Quality"
          />

          <SidebarItem
            href="/alerts"
            icon={TriangleAlert}
            title="Alerts"
          />

          <SidebarItem
            href="/history"
            icon={History}
            title="History"
          />

          <SidebarItem
            href="/settings"
            icon={Settings}
            title="Settings"
          />
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="space-y-5">
        {/* Location Card */}
        <div className="rounded-2xl bg-slate-800 p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-blue-600 p-2">
              <MapPin
                className="text-white"
                size={18}
              />
            </div>

            <div>
              <p className="font-medium text-white">
                Agartala
              </p>

              <p className="text-xs text-slate-400">
                Tripura, India
              </p>
            </div>
          </div>
        </div>

        {/* Temperature Unit */}
        <div className="overflow-hidden rounded-xl border border-slate-700">
          <div className="flex">
            <button className="flex-1 bg-blue-600 py-2 font-medium text-white transition hover:bg-blue-500">
              °C
            </button>

            <button className="flex-1 bg-slate-800 py-2 font-medium text-slate-300 transition hover:bg-slate-700">
              °F
            </button>
          </div>
        </div>

        {/* Alerts */}
        <button className="w-full rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-500">
          <Bell
            size={18}
            className="mr-2 inline"
          />
          Enable Alerts
        </button>
      </div>
    </aside>
  );
}