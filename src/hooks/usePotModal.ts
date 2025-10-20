"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePotTotal, createPot, updatePot } from "@/server/actions";
import { useModalStore } from "@/store/modalStore";
import { usePotsStore } from "@/store/potsStore";
import { usePots } from "@/hooks/usePots";

type PotActionType = "add" | "withdraw";

export function usePotModal() {
  const queryClient = useQueryClient();
  const { type, selectedPotId, close } = useModalStore();
  const { formData, resetForm } = usePotsStore();
  const { pots } = usePots();
  const selectedPot = pots.find((p) => p.id === selectedPotId);

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

  // Update mutation
  const isEditing = type === "edit";

  const updateMutation = useMutation({
    mutationFn: async (payload: { potId: string; data: typeof formData }) => {
      const { potId, data } = payload;
      await updatePot(potId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pots"] });
      resetForm();
      close();
    },
  });

  return {
    type,
    isEditing,
    selectedPot,
    updateMutation,
    selectedPotId,
    close,
    actionMutation,
    createMutation,
  };
}
