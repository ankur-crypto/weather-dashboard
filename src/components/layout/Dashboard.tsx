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
      <section className="flex-1 p-8">
        <DashboardSkeleton />
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
        onSearch={handleCitySelect}
        onFavoriteSelect={handleCitySelect}
        onRecentSelect={handleCitySelect}
        onCurrentLocation={handleCurrentLocation}
        onAddFavorite={addFavorite}
        onRemoveFavorite={removeFavorite}
      />

      {/* Dashboard */}

      <DashboardMain
        weather={data}
        favoriteCount={favorites.length}
        comparisonCities={comparisonCities}
        addCity={addCity}
        removeCity={removeCity}
        onCitySelect={handleCitySelect}
      />

      {/* Footer */}

      <DashboardFooter />
    </section>
  );
}