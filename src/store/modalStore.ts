import { create } from "zustand";

export type ModalType =
  | "add"
  | "withdraw"
  | "create"
  | "editPot"
  | "deletePot"
  | null;

export type Pot = {
  id: string;
  name: string;
  total: number;
  target: number;
  theme: string;
};

type ModalData = Pot | null;

type ModalState = {
  type: ModalType;
  data: ModalData;
  isOpen: boolean;
  open: (type: ModalType, data?: ModalData) => void;
  close: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  type: null,
  data: null,
  isOpen: false,

  open: (type, data = null) => set({ isOpen: true, type, data }),
  close: () => set({ isOpen: false, type: null, data: null }),
}));
