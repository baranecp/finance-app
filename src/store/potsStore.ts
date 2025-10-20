import { create } from "zustand";

export type Pot = {
  id: string;
  name: string;
  total: number;
  target: number;
  theme: string;
};

export type PotFormData = {
  id?: number;
  name: string;
  target: number;
  theme: string;
};

type PotsState = {
  pots: Pot[];
  formData: PotFormData;
  setPots: (pots: Pot[]) => void;
  updatePotTotal: (id: string, newTotal: number) => void;
  updatePot: (
    id: string,
    newName: string,
    newTarget: number,
    newTheme: string
  ) => void;
  setFormData: (data: Partial<PotFormData>) => void;
  resetForm: () => void;
};

export const usePotsStore = create<PotsState>((set) => ({
  pots: [],
  setPots: (pots) => set({ pots }),
  updatePotTotal: (id, newTotal) => {
    set((state) => ({
      pots: state.pots.map((pot) =>
        pot.id === id ? { ...pot, total: newTotal } : pot
      ),
    }));
  },
  updatePot: (id, newName, newTarget, newTheme) => {
    set((state) => ({
      pots: state.pots.map((pot) =>
        pot.id === id
          ? { ...pot, name: newName, target: newTarget, theme: newTheme }
          : pot
      ),
    }));
  },
  formData: { name: "", theme: "", target: 0 },
  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  resetForm: () => set({ formData: { name: "", theme: "", target: 0 } }),
}));
