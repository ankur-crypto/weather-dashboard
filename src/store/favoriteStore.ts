"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoriteStore {
  favorites: string[];

  addFavorite: (city: string) => void;
  removeFavorite: (city: string) => void;
  toggleFavorite: (city: string) => void;
  isFavorite: (city: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (city) =>
        set((state) => {
          const normalized = city.trim();

          if (
            state.favorites.some(
              (c) => c.toLowerCase() === normalized.toLowerCase()
            )
          ) {
            return state;
          }

          return {
            favorites: [...state.favorites, normalized],
          };
        }),

      removeFavorite: (city) =>
        set((state) => ({
          favorites: state.favorites.filter(
            (c) => c.toLowerCase() !== city.toLowerCase()
          ),
        })),

      toggleFavorite: (city) => {
        const exists = get().favorites.some(
          (c) => c.toLowerCase() === city.toLowerCase()
        );

        if (exists) {
          get().removeFavorite(city);
        } else {
          get().addFavorite(city);
        }
      },

      isFavorite: (city) =>
        get().favorites.some(
          (c) => c.toLowerCase() === city.toLowerCase()
        ),

      clearFavorites: () =>
        set({
          favorites: [],
        }),
    }),
    {
      name: "favorite-cities",
    }
  )
);