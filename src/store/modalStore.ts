import { create } from "zustand";

export type ModalType =
  | "add"
  | "withdraw"
  | "create"
  | "edit"
  | "delete"
  | null;

export type Pot = {
  id: string;
  name: string;
  total: number;
  target: number;
  theme: string;
  percentage?: number;
};

type ModalState = {
  type: ModalType;
  selectedPot?: Pot | null;
  isOpen: boolean;
  open: (type: ModalType, pot?: Pot | null) => void;
  close: () => void;
  setSelectedPot: (pot: Pot | null) => void;
};

export const useModalStore = create<ModalState>((set) => ({
  type: null,
  selectedPot: null,
  isOpen: false,
  open: (type, pot) => set({ type, selectedPot: pot ?? null, isOpen: true }),
  close: () => set({ type: null, selectedPot: null, isOpen: false }),
  setSelectedPot: (pot) => set({ selectedPot: pot }),
}));
