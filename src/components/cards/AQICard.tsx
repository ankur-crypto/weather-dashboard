import { Wind } from "lucide-react";
import { WeatherData } from "@/types/weather";

interface Props {
  weather: WeatherData;
}

export default function AQICard({ weather }: Props) {
  const aqi = weather.current.air_quality["us-epa-index"];

  const getAQI = () => {
    switch (aqi) {
      case 1:
        return { text: "Good", color: "text-green-400" };
      case 2:
        return { text: "Moderate", color: "text-yellow-400" };
      case 3:
        return { text: "Unhealthy (Sensitive)", color: "text-orange-400" };
      case 4:
        return { text: "Unhealthy", color: "text-red-400" };
      case 5:
        return { text: "Very Unhealthy", color: "text-purple-400" };
      case 6:
        return { text: "Hazardous", color: "text-red-600" };
      default:
        return { text: "Unknown", color: "text-slate-400" };
    }
  };

  const status = getAQI();

  return (
    <div className="rounded-3xl bg-[#111827] border border-slate-700 p-6">
      <h2 className="text-xl font-semibold text-white">
        Air Quality
      </h2>

      <div className="flex justify-center py-6">
        <div className="h-36 w-36 rounded-full border-[12px] border-green-400 flex items-center justify-center">
          <div className="text-center">
            <Wind className="mx-auto text-green-400" />
            <h1 className="text-4xl font-bold text-white">
              {aqi}
            </h1>
            <p className={status.color}>
              {status.text}
            </p>
          </div>
        </div>
      </div>

      <p className="text-center text-slate-400">
        Air quality is satisfactory.
      </p>
    </div>
  );
}