import { create } from "zustand";

type ModalType = "add" | "withdraw" | "create" | "edit" | "delete" | null;

type ModalState = {
  type: ModalType;
  selectedPotId?: string | null;
  isOpen: boolean;
  open: (type: ModalType, potId?: string | null) => void;
  close: () => void;
  setSelectedPotId: (id: string) => void;
};

export const useModalStore = create<ModalState>((set) => ({
  type: null,
  selectedPotId: undefined,
  isOpen: false,
  open: (type, id) => set({ type, selectedPotId: id, isOpen: true }),
  close: () => set({ type: null, selectedPotId: undefined, isOpen: false }),
  setSelectedPotId: (id) => set({ selectedPotId: id }),
}));
