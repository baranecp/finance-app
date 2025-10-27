"use client";

import { createBudget, deleteBudget, updateBudget } from "@/server/actions";
import { useModalStore } from "@/store/modalStore";
import { Budget, BudgetWithTransactions } from "@/types/finance";
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
      const created = await createBudget(
        data.category,
        data.theme,
        data.maximum
      );
      return { ...created, transactions: [] }; // temporary empty transactions
    },
    onSuccess: (newBudget) => {
      // Show budget immediately at top
      queryClient.setQueryData<BudgetWithTransactions[]>(
        ["budgetsWithTransactions"],
        (old) => [newBudget, ...(old || [])]
      );

      // Refetch full budgetsWithTransactions to populate latest spendings
      queryClient.invalidateQueries({ queryKey: ["budgetsWithTransactions"] });

      close();
    },
  });

  //-- Update mutation ---
  const updateMutation = useMutation({
    mutationFn: async (data: {
      budget: Budget;
      data: { category: string; maximum: number; theme: string };
    }) => {
      await updateBudget(data.budget.id, data.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgetsWithTransactions"] });
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
    updateMutation,
    deleteMutation,
    close,
  };
}
