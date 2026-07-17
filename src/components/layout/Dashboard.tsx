"use client";

import Header from "./Header";

import DashboardSearch from "../dashboard/DashboardSearch";
import DashboardMain from "../dashboard/DashboardMain";
import DashboardFooter from "../dashboard/DashboardFooter";
import DashboardSkeleton from "../dashboard/DashboardSkeleton";

import WeatherEffects from "../effects/WeatherEffects";

import { useDashboard } from "@/hooks/useDashboard";
import { useWeather } from "@/hooks/useWeather";
import { useWeatherStore } from "@/store/weatherStore";
import { getWeatherTheme } from "@/utils/weatherTheme";

export default function Dashboard() {
  const setGlobalCity = useWeatherStore(
    (state) => state.setCity
  );

  const {
    city,
    setCity,

    coords,
    setCoords,

    favorites,
    recentSearches,

    addFavorite,
    removeFavorite,

    addRecentSearch,

    handleCurrentLocation,
    locationLoading,

    comparisonCities,
    addCity,
    removeCity,
  } = useDashboard();

  const {
    data,
    loading,
    error,
  } = useWeather(city, coords);

  if (loading) {
    return (
      <section className="flex-1 p-4 sm:p-6 lg:p-8">
        <DashboardSkeleton />
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex flex-1 items-center justify-center p-6">
        <div
          className="
            max-w-lg
            rounded-3xl
            border
            border-red-300
            bg-white/90
            p-8
            text-center
            shadow-xl
            backdrop-blur-xl
            dark:border-red-500/40
            dark:bg-[#111827]/90
          "
        >
          <div className="mb-4 text-5xl">⚠️</div>

          <h2 className="mb-2 text-2xl font-bold text-red-600 dark:text-red-400">
            Unable to load weather
          </h2>

          <p className="text-slate-600 dark:text-slate-400">
            {error}
          </p>
        </div>
      </section>
    );
  }

  if (!data) return null;

  const theme = getWeatherTheme(
    data.current.condition.text
  );

  const handleCitySelect = (
    selectedCity: string
  ) => {
    setCoords(null);
    setCity(selectedCity);
    setGlobalCity(selectedCity);
    addRecentSearch(selectedCity);
  };

  return (
    <section
      className={`
        relative
        flex-1
        overflow-y-auto
        bg-gradient-to-br
        ${theme}
        p-4
        transition-all
        duration-700
        sm:p-6
        lg:p-8
      `}
    >
      <WeatherEffects
        condition={data.current.condition.text}
      />

      <div className="relative z-10">
        <Header />

 <DashboardSearch
  favorites={favorites}
  recentSearches={recentSearches}
  onSearch={handleCitySelect}
  onFavoriteSelect={handleCitySelect}
  onRecentSelect={handleCitySelect}
  onCurrentLocation={handleCurrentLocation}
  locationLoading={locationLoading}
  onRemoveFavorite={removeFavorite}
/>

        <DashboardMain
          weather={data}
          favoriteCount={favorites.length}
          comparisonCities={comparisonCities}
          addCity={addCity}
          removeCity={removeCity}
          onCitySelect={handleCitySelect}
        />

        <DashboardFooter />
      </div>
    </section>
  );
}