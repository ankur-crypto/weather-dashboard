export function getWeatherTheme(condition: string) {
  const text = condition.toLowerCase();

  if (text.includes("sun"))
    return "from-yellow-400 via-orange-500 to-red-500";

  if (text.includes("clear"))
    return "from-sky-400 via-blue-500 to-indigo-700";

  if (text.includes("cloud"))
    return "from-slate-500 via-slate-700 to-slate-900";

  if (text.includes("rain"))
    return "from-blue-700 via-slate-800 to-black";

  if (text.includes("drizzle"))
    return "from-blue-600 via-slate-700 to-slate-900";

  if (text.includes("snow"))
    return "from-cyan-200 via-sky-300 to-slate-500";

  if (text.includes("thunder"))
    return "from-purple-900 via-slate-900 to-black";

  if (text.includes("mist"))
    return "from-slate-400 via-slate-600 to-slate-800";

  if (text.includes("fog"))
    return "from-slate-500 via-slate-700 to-slate-900";

  return "from-sky-500 via-blue-700 to-slate-900";
}