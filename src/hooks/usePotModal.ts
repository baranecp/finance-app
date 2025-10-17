"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePotTotal, createPot } from "@/server/actions";
import { useModalStore } from "@/store/modalStore";
import { usePotsStore } from "@/store/potsStore";

type PotActionType = "add" | "withdraw";

export function usePotModal() {
  const queryClient = useQueryClient();
  const { type, selectedPotId, close } = useModalStore();
  const { formData, resetForm } = usePotsStore();

  // Action mutation (add/withdraw)
  const actionMutation = useMutation({
    mutationFn: async ({
      id,
      amount,
      type,
    }: {
      id: string;
      amount: number;
      type: PotActionType;
    }) => updatePotTotal(id, amount, type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pots"] });
      close();
    },
  });

  // Create mutation (create new pot)
  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      await createPot(data.name, data.theme, data.target);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pots"] });
      resetForm();
      close();
    },
  });

  return {
    type,
    selectedPotId,
    close,
    actionMutation,
    createMutation,
  };
}
