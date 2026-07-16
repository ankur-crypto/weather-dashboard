import { create } from "zustand";

type Unit = "C" | "F";

interface SettingsState {
  unit: Unit;

  setUnit: (unit: Unit) => void;

  toggleUnit: () => void;
}

export const useSettingsStore =
  create<SettingsState>((set) => ({
    unit: "C",

    setUnit: (unit) =>
      set({ unit }),

    toggleUnit: () =>
      set((state) => ({
        unit:
          state.unit === "C"
            ? "F"
            : "C",
      })),
  }));