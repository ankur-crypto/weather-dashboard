import { Bell, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between mb-8">

      {/* Left */}

      <div>
        <h1 className="text-4xl font-bold text-white">
          Good Morning, Ankur! 👋
        </h1>

        <p className="mt-2 text-slate-400">
          Here's the weather update for today.
        </p>
      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        <button className="rounded-xl bg-slate-800 p-3 hover:bg-slate-700 transition">
          <Search className="text-white" size={20} />
        </button>

        <button className="rounded-xl bg-slate-800 p-3 hover:bg-slate-700 transition">
          <Bell className="text-white" size={20} />
        </button>

        <img
          src="https://i.pravatar.cc/100"
          alt="profile"
          className="h-12 w-12 rounded-full border-2 border-blue-500"
        />

      </div>

    </header>
  );
}