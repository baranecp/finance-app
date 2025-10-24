"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createPot,
  updatePot,
  updatePotTotal,
  deletePot,
} from "@/server/actions";
import { useModalStore, Pot } from "@/store/modalStore";

export type PotActionType = "add" | "withdraw";

export function usePotModal() {
  const queryClient = useQueryClient();
  const { type, close } = useModalStore();

  const isEditing = type === "editPot";

  // --- Action mutation (add/withdraw money) ---
  const actionMutation = useMutation({
    mutationFn: async ({
      pot,
      amount,
      type,
    }: {
      pot: Pot;
      amount: number;
      type: PotActionType;
    }) => updatePotTotal(pot.id, amount, type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pots"] });
      close();
    },
  });

  // --- Create mutation ---
  const createMutation = useMutation({
    mutationFn: async (data: {
      name: string;
      target: number;
      theme: string;
    }) => {
      await createPot(data.name, data.theme, data.target);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pots"] });
      close();
    },
  });

  // --- Update mutation ---
  const updateMutation = useMutation({
    mutationFn: async (payload: {
      pot: Pot;
      data: { name: string; target: number; theme: string };
    }) => {
      await updatePot(payload.pot.id, payload.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pots"] });
      close();
    },
  });

  // --- Delete mutation ---
  const deleteMutation = useMutation({
    mutationFn: async (pot: Pot) => deletePot(pot.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pots"] });
      close();
    },
  });

  return {
    type,
    isEditing,
    actionMutation,
    createMutation,
    updateMutation,
    deleteMutation,
    close,
  };
}
