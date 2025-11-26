import { create } from "zustand";

type SplashStore = {
  loadingCount: number;
  increment: () => void;
  decrement: () => void;
};

export const useSplashStore = create<SplashStore>((set) => ({
  loadingCount: 0,
  increment: () => set((s) => ({ loadingCount: s.loadingCount + 1 })),
  decrement: () =>
    set((s) => ({ loadingCount: Math.max(0, s.loadingCount - 1) })),
}));
