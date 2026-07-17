import { create } from "zustand";

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
  create<HistoryStore>((set) => ({
    history: [],

    addHistory: (item) =>
      set((state) => {
        const exists =
          state.history.find(
            (h) =>
              h.city === item.city &&
              h.temperature ===
                item.temperature &&
              h.time === item.time
          );

        if (exists)
          return state;

        return {
          history: [
            item,
            ...state.history,
          ].slice(0, 20),
        };
      }),

    clearHistory: () =>
      set({
        history: [],
      }),
  }));