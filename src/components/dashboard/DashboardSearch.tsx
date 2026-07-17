"use client";

import FavoriteCities from "../search/FavoriteCities";
import RecentSearches from "../search/RecentSearches";
import SearchBar from "../search/SearchBar";

interface Props {
  favorites: string[];
  recentSearches: string[];

  onSearch: (city: string) => void;

  onFavoriteSelect: (city: string) => void;
  onRecentSelect: (city: string) => void;

  onCurrentLocation: () => Promise<void> | void;
  locationLoading?: boolean;

  onRemoveFavorite: (city: string) => void;
}

export default function DashboardSearch({
  favorites,
  recentSearches,

  onSearch,

  onFavoriteSelect,
  onRecentSelect,

  onCurrentLocation,
  locationLoading = false,

  onRemoveFavorite,
}: Props) {
  return (
    <div className="mb-8 space-y-6">
      <SearchBar
        onSearch={onSearch}
        onCurrentLocation={onCurrentLocation}
        locationLoading={locationLoading}
      />

      <RecentSearches
        searches={recentSearches}
        onSelect={onRecentSelect}
      />

      <FavoriteCities
        favorites={favorites}
        onSelect={onFavoriteSelect}
        onRemove={onRemoveFavorite}
      />
    </div>
  );
}