"use client";

import { useEffect, useState } from "react";

import Header from "./Header";

import DashboardSearch from "../dashboard/DashboardSearch";
import DashboardCurrent from "../dashboard/DashboardCurrent";
import DashboardCards from "../dashboard/DashboardCards";
import DashboardForecast from "../dashboard/DashboardForecast";
import DashboardCharts from "../dashboard/DashboardCharts";
import DashboardDetails from "../dashboard/DashboardDetails";
import DashboardHighlights from "../dashboard/DashboardHighlights";
import DashboardMap from "../dashboard/DashboardMap";

import WeatherEffects from "../effects/WeatherEffects";

import { useWeather } from "@/hooks/useWeather";
import { useWeatherStore } from "@/store/weatherStore";
import { getWeatherTheme } from "@/utils/weatherTheme";

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

  const [recentSearches, setRecentSearches] =
    useState<string[]>([]);

  useEffect(() => {
    const savedFavorites =
      localStorage.getItem("favoriteCities");

    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    const savedRecent =
      localStorage.getItem("recentSearches");

    if (savedRecent) {
      setRecentSearches(JSON.parse(savedRecent));
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

  const addRecentSearch = (
    searchedCity: string
  ) => {
    const updated = [
      searchedCity,
      ...recentSearches.filter(
        (item) => item !== searchedCity
      ),
    ].slice(0, 10);

    setRecentSearches(updated);

    localStorage.setItem(
      "recentSearches",
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

  const { data, loading, error } =
    useWeather(city, coords);
      if (loading) {
    return (
      <section className="flex flex-1 items-center justify-center">
        <div className="text-xl font-semibold text-white">
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
      {/* Weather Effects */}

      <WeatherEffects
        condition={data.current.condition.text}
      />

      {/* Header */}

      <Header />

      {/* Search */}

      <DashboardSearch
        favorites={favorites}
        recentSearches={recentSearches}
        onSearch={(selectedCity) => {
          setCoords(null);
          setCity(selectedCity);
          setGlobalCity(selectedCity);
          addRecentSearch(selectedCity);
        }}
        onCurrentLocation={handleCurrentLocation}
        onFavoriteSelect={(selectedCity) => {
          setCoords(null);
          setCity(selectedCity);
          setGlobalCity(selectedCity);
          addRecentSearch(selectedCity);
        }}
        onRecentSelect={(selectedCity) => {
          setCoords(null);
          setCity(selectedCity);
          setGlobalCity(selectedCity);
          addRecentSearch(selectedCity);
        }}
        onAddFavorite={addFavorite}
      />

      {/* Current Weather */}

      <DashboardCurrent
        weather={data}
      />

      {/* Weather Cards */}

      <DashboardCards
        weather={data}
      />

      {/* Weekly Forecast */}

      <DashboardForecast
        weather={data}
      />

      {/* Charts */}

      <DashboardCharts
        weather={data}
      />

      {/* Weather Details */}

      <DashboardDetails
        weather={data}
      />

      {/* Highlights */}

      <DashboardHighlights
        weather={data}
      />

      {/* Map */}

      <DashboardMap
        weather={data}
      />
            {/* Footer */}

      <footer className="mt-10 overflow-hidden rounded-3xl border border-slate-700 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 shadow-2xl">

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          {/* Left */}

          <div>

            <h2 className="text-3xl font-bold text-white">
              🌤 Weather Dashboard
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-slate-400">

              A modern weather dashboard built using
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
                2.0.0
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
            Designed & Developed using
            Next.js • React • Tailwind CSS
          </p>

        </div>

      </footer>
          </section>
  );
}