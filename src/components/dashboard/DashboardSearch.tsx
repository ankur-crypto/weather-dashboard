"use client";

import SearchBar from "../search/SearchBar";
import FavoriteCities from "../search/FavoriteCities";
import RecentSearches from "../search/RecentSearches";
import VoiceSearch from "../search/VoiceSearch";

interface Props {
  favorites: string[];
  recentSearches: string[];

  onSearch: (city: string) => void;

  onCurrentLocation: () => void;

  onFavoriteSelect: (city: string) => void;

  onRecentSelect: (city: string) => void;

  onAddFavorite: () => void;

  onRemoveFavorite: (city: string) => void;
}

export default function DashboardSearch({
  favorites,
  recentSearches,
  onSearch,
  onCurrentLocation,
  onFavoriteSelect,
  onRecentSelect,
  onAddFavorite,
  onRemoveFavorite,
}: Props) {
  return (
    <>
      {/* Search */}

      <div className="mb-6">

<div className="flex flex-col gap-4 md:flex-row md:items-center">
  <div className="flex-1">
    <SearchBar
      onSearch={onSearch}
      onCurrentLocation={onCurrentLocation}
    />
  </div>

  <VoiceSearch
    onResult={onSearch}
  />
</div>

        <div className="mt-5">

          <RecentSearches
            searches={recentSearches}
            onSelect={onRecentSelect}
          />

        </div>

        <div className="mt-5">

          <button
            onClick={onAddFavorite}
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
          onSelect={onFavoriteSelect}
          onRemove={onRemoveFavorite}
        />

      </div>
    </>
  );
}