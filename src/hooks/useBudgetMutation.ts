"use client";

import { createBudget } from "@/server/actions";
import { useModalStore } from "@/store/modalStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useBudgetMutations() {
  const queryClient = useQueryClient();
  const { close } = useModalStore();

  const createMutation = useMutation({
    mutationFn: async (data: {
      category: string;
      theme: string;
      maximum: number;
    }) => {
      await createBudget(data.category, data.theme, data.maximum);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      close();
    },
  });

  return {
    createMutation,
    close,
  };
}
