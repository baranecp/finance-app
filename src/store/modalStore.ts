import { BudgetWithTransactions } from "@/types/finance";
import { create } from "zustand";

export type ModalType =
  | "add"
  | "withdraw"
  | "create"
  | "editPot"
  | "deletePot"
  | "createBudget"
  | "editBudget"
  | "deleteBudget"
  | null;

export type Pot = {
  id: string;
  name: string;
  total: number;
  target: number;
  theme: string;
};

type ModalData = Pot | BudgetWithTransactions | null;

type ModalState = {
  type: ModalType;
  data: ModalData;
  isOpen: boolean;
  open: (type: ModalType, data?: ModalData) => void;
  close: () => void;
};

export function isPot(data: Pot | BudgetWithTransactions | null): data is Pot {
  return !!data && "name" in data && "total" in data;
}

export function isBudget(
  data: Pot | BudgetWithTransactions | null
): data is BudgetWithTransactions {
  return !!data && "category" in data;
}

export const useModalStore = create<ModalState>((set) => ({
  type: null,
  data: null,
  isOpen: false,

  open: (type, data = null) => set({ isOpen: true, type, data }),
  close: () => set({ isOpen: false, type: null, data: null }),
}));
