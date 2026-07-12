// 
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import Header from "./Header";
import SearchBar from "../search/SearchBar";

import CurrentWeather from "../weather/CurrentWeather";
import HourlyForecast from "../weather/HourlyForecast";
import WeeklyForecast from "../weather/WeeklyForecast";

import TemperatureChart from "../charts/TemperatureChart";
import WeatherStats from "../charts/WeatherStats";

import AQICard from "../cards/AQICard";
import WindCard from "../cards/WindCard";
import SunriseCard from "../cards/SunriseCard";
import UVCard from "../cards/UVCard";

import WeatherAlerts from "../alerts/WeatherAlerts";
import FavoriteCities from "../search/FavoriteCities";

import { useWeather } from "@/hooks/useWeather";
import { getWeatherTheme } from "@/utils/weatherTheme";
import WeatherEffects from "../effects/WeatherEffects";
import WeatherDetails from "../weather/WeatherDetails";
import { useWeatherStore } from "@/store/weatherStore";

const WeatherMap = dynamic(
  () => import("../map/WeatherMap"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[420px] items-center justify-center rounded-3xl border border-slate-700 bg-[#111827] text-slate-400">
        Loading Map...
      </div>
    ),
  }
);

export default function Dashboard() {
  const [city, setCity] = useState("Agartala");
  const setGlobalCity = useWeatherStore(
  (state) => state.setCity
);

  const [coords, setCoords] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const [favorites, setFavorites] = useState<string[]>([]);
    useEffect(() => {
    const saved = localStorage.getItem("favoriteCities");

    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const addFavorite = () => {
    if (!city) return;

    if (favorites.includes(city)) return;

    const updated = [...favorites, city];

    setFavorites(updated);

    localStorage.setItem(
      "favoriteCities",
      JSON.stringify(updated)
    );
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });

        setCity("");
      },
      (error) => {
        console.error(error);

        alert("Unable to access your location.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const { data, loading, error } = useWeather(
    city,
    coords
  );

  if (loading) {
    return (
      <section className="flex flex-1 items-center justify-center">
        <div className="text-xl text-white">
          Loading weather...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex flex-1 items-center justify-center">
        <div className="rounded-xl bg-red-500/20 p-6 text-red-400">
          {error}
        </div>
      </section>
    );
  }

  if (!data) return null;

  const theme = getWeatherTheme(
    data.current.condition.text
  );
    return (
<section
  className={`relative flex-1 overflow-y-auto bg-gradient-to-br ${theme} p-8 transition-all duration-700`}
>
  <WeatherEffects
  condition={data.current.condition.text}
/>
      {/* Header */}
      <Header />

      {/* Search */}
      <div className="mb-6">
        <SearchBar
          onSearch={(selectedCity) => {
            setCoords(null);
            setCity(selectedCity);
setGlobalCity(selectedCity);
          }}
          onCurrentLocation={handleCurrentLocation}
        />

        <div className="mt-4">
          <button
            onClick={addFavorite}
            className="rounded-xl bg-yellow-500 px-5 py-2 font-semibold text-black transition hover:bg-yellow-400"
          >
            ⭐ Add to Favorites
          </button>
        </div>
      </div>

      {/* Favorite Cities */}
      <div className="mb-6">
        <FavoriteCities
          favorites={favorites}
          onSelect={(selectedCity) => {
            setCoords(null);
            setCity(selectedCity);
setGlobalCity(selectedCity);
          }}
        />
      </div>

      {/* Current Weather + Hourly Forecast */}
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <CurrentWeather weather={data} />
        </div>

        <HourlyForecast weather={data} />
      </div>

      {/* Weather Cards */}
      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <AQICard weather={data} />
        <WindCard weather={data} />
        <SunriseCard weather={data} />
        <UVCard weather={data} />
      </div>

      {/* Weekly Forecast */}
      <div className="mt-6">
        <WeeklyForecast weather={data} />
      </div>

      {/* Temperature Chart */}
      <div className="mt-6">
        <TemperatureChart weather={data} />
      </div>

      {/* Weather Statistics */}
      <div className="mt-6">
        <WeatherStats weather={data} />
      </div>

      <div className="mt-6">
  <WeatherDetails weather={data} />
</div>

      {/* Map + Alerts */}
      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <WeatherMap
            lat={data.location.lat}
            lon={data.location.lon}
            city={data.location.name}
          />
        </div>

        <WeatherAlerts weather={data} />
      </div>
    </section>
  );
}