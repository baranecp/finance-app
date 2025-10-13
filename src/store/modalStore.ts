import { create } from "zustand";

type ModalState = {
  selectedPotId: string | null;
  type: "add" | "withdraw" | null;
  open: (type: "add" | "withdraw" | null, potId: string) => void;
  close: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  selectedPotId: null,
  type: null,
  open: (type, potId) => set({ type, selectedPotId: potId }),
  close: () => set({ type: null, selectedPotId: null }),
}));
