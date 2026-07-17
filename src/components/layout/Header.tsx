"use client";

import { Bell, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      {/* Left */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
          Good Morning, Ankur! 👋
        </h1>

        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Here's the weather update for today.
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <button
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white/90
            p-3
            shadow-md
            backdrop-blur-xl
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:border-blue-400
            hover:shadow-lg
            dark:border-slate-700
            dark:bg-[#111827]/90
            dark:hover:border-blue-500
          "
        >
          <Search
            size={20}
            className="text-slate-700 dark:text-white"
          />
        </button>

        <button
          className="
            relative
            rounded-2xl
            border
            border-slate-200
            bg-white/90
            p-3
            shadow-md
            backdrop-blur-xl
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:border-blue-400
            hover:shadow-lg
            dark:border-slate-700
            dark:bg-[#111827]/90
            dark:hover:border-blue-500
          "
        >
          <Bell
            size={20}
            className="text-slate-700 dark:text-white"
          />

          {/* Notification Badge */}
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />
        </button>

        <div
          className="
            overflow-hidden
            rounded-full
            border-2
            border-blue-500
            shadow-lg
          "
        >
          <img
            src="https://i.pravatar.cc/100"
            alt="Profile"
            className="h-12 w-12 object-cover"
          />
        </div>
      </div>
    </header>
  );
}