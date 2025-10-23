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

export type Budget = {
  id: string;
  category: string;
  maximum: number;
  theme: string;
};

export type ModalData = Pot | Budget | null;

export function isPot(data: ModalData): data is Pot {
  return data !== null && "total" in data && "target" in data && "name" in data;
}

export function isBudget(data: ModalData): data is Budget {
  return data !== null && "maximum" in data && "category" in data;
}

type ModalState = {
  type: ModalType;
  data: ModalData;
  isOpen: boolean;
  open: (type: ModalType, data?: ModalData) => void;
  close: () => void;
  setData: (data: ModalData) => void;
};

export const useModalStore = create<ModalState>((set) => ({
  type: null,
  data: null,
  isOpen: false,
  open: (type, data) => set({ type, data: data ?? null, isOpen: true }),
  close: () => set({ type: null, data: null, isOpen: false }),
  setData: (data) => set({ data }),
}));
