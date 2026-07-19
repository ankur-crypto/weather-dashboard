import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface HistoryItem {
  city: string;
  temperature: number;
  condition: string;
  time: string;
}

interface HistoryStore {
  history: HistoryItem[];

  addHistory: (
    item: HistoryItem
  ) => void;

  clearHistory: () => void;
}

export const useHistoryStore =
  create<HistoryStore>()(
    persist(
      (set) => ({
        /*
         * Weather Search History
         */
        history: [],

        /*
         * Add New History Item
         */
        addHistory: (
          item: HistoryItem
        ) =>
          set((state) => {
            /*
             * Remove previous entry
             * for the same city.
             *
             * This prevents duplicate
             * city entries.
             */
            const filteredHistory =
              state.history.filter(
                (historyItem) =>
                  historyItem.city
                    .toLowerCase() !==
                  item.city.toLowerCase()
              );

            /*
             * Add latest search
             * at the beginning.
             *
             * Keep maximum 20 items.
             */
            return {
              history: [
                item,
                ...filteredHistory,
              ].slice(0, 20),
            };
          }),

        /*
         * Clear All History
         */
        clearHistory: () =>
          set({
            history: [],
          }),
      }),
      {
        /*
         * LocalStorage Key
         */
        name:
          "weather-search-history",
      }
    )
  );