import { CloudSun } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg">
        <CloudSun className="h-7 w-7 text-white" />
      </div>

      <div>
        <h1 className="text-lg font-bold text-white">
          Weather
        </h1>
        <p className="text-xs text-slate-400">
          Dashboard
        </p>
      </div>
    </div>
  );
}