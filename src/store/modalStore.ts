import { create } from "zustand";

type ModalType = "add" | "withdraw" | "create" | null;

type ModalState = {
  type: ModalType;
  selectedPotId: string | null;
  isOpen: boolean;
  open: (type: ModalType, potId?: string | null) => void;
  close: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  type: null,
  selectedPotId: null,
  isOpen: false,

  open: (type, potId = null) =>
    set({ type, selectedPotId: potId, isOpen: true }),

  close: () => set({ type: null, selectedPotId: null, isOpen: false }),
}));
