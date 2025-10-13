"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePotTotal } from "@/server/actions";
import { useModalStore } from "@/store/modalStore";

export function usePotModal() {
  const queryClient = useQueryClient();
  const { type, selectedPotId, close } = useModalStore();

  const mutation = useMutation({
    mutationFn: async ({
      id,
      amount,
      type,
    }: {
      id: string;
      amount: number;
      type: "add" | "withdraw";
    }) => updatePotTotal(id, amount, type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pots"] });
      close();
    },
  });

  return { type, selectedPotId, mutation, close };
}
