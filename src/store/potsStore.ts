import { create } from "zustand";

export type Pot = {
  id: string;
  name: string;
  total: number;
  target: number;
  theme: string;
};

type PotsState = {
  pots: Pot[];
  setPots: (pots: Pot[]) => void;
  updatePotTotal: (id: string, newTotal: number) => void;
};

export const usePotsStore = create<PotsState>((set) => ({
  pots: [],
  setPots: (pots) => set({ pots }),
  updatePotTotal: (id, newTotal) =>
    set((state) => ({
      pots: state.pots.map((pot) =>
        pot.id === id ? { ...pot, total: newTotal } : pot
      ),
    })),
}));
