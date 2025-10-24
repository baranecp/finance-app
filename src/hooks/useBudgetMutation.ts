"use client";

import { createBudget, deleteBudget } from "@/server/actions";
import { useModalStore } from "@/store/modalStore";
import { BudgetWithTransactions } from "@/types/finance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useBudgetMutations() {
  const queryClient = useQueryClient();
  const { close } = useModalStore();

  // --- Create mutation ---
  const createMutation = useMutation({
    mutationFn: async (data: {
      category: string;
      theme: string;
      maximum: number;
    }) => {
      return await createBudget(data.category, data.theme, data.maximum);
    },
    onSuccess: (newBudget) => {
      queryClient.setQueryData<BudgetWithTransactions[]>(
        ["budgetsWithTransactions"],
        (old) => {
          const oldData = old || [];
          return [...oldData, newBudget];
        }
      );
      close();
    },
  });

  // --- Delete mutation ---
  const deleteMutation = useMutation({
    mutationFn: async (budget: BudgetWithTransactions) => {
      await deleteBudget(budget.id);
      return budget.id;
    },
    onSuccess: (id: string) => {
      queryClient.setQueryData<BudgetWithTransactions[]>(
        ["budgetsWithTransactions"],
        (old) => {
          if (!old) return [];
          return old.filter((b) => b.id !== id);
        }
      );
      close();
    },
  });

  return {
    createMutation,
    deleteMutation,
    close,
  };
}
