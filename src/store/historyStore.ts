import { create } from "zustand";

interface HistoryItem {
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
      set((state) => ({
        history: [
          item,
          ...state.history,
        ].slice(0, 20),
      })),

    clearHistory: () =>
      set({
        history: [],
      }),
  }));