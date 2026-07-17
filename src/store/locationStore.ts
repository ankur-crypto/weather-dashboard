import { create } from "zustand";

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface LocationState {
  coordinates: Coordinates | null;

  loading: boolean;

  error: string | null;

  setCoordinates: (
    coordinates: Coordinates
  ) => void;

  setLoading: (
    loading: boolean
  ) => void;

  setError: (
    error: string | null
  ) => void;

  clearLocation: () => void;
}

export const useLocationStore =
  create<LocationState>((set) => ({
    coordinates: null,

    loading: false,

    error: null,

    setCoordinates: (
      coordinates
    ) =>
      set({
        coordinates,
        error: null,
      }),

    setLoading: (
      loading
    ) =>
      set({
        loading,
      }),

    setError: (
      error
    ) =>
      set({
        error,
      }),

    clearLocation: () =>
      set({
        coordinates: null,
        loading: false,
        error: null,
      }),
  }));