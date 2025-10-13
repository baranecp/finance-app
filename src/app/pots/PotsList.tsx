"use client";
import Pot from "./Pot";
import { getPots } from "@/server/actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Modal from "./Modal";
import { usePotsStore } from "@/store/potsStore";
import { useModalStore } from "@/store/modalStore";
import { useEffect, useState } from "react";
import { updatePotTotal } from "@/server/actions";

export default function PotsList() {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ["pots"],
    queryFn: getPots,
  });

  const { pots, setPots } = usePotsStore();
  const { type, selectedPotId, open, close } = useModalStore();
  const [amount, setAmount] = useState("");

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
      setAmount("");
      close();
    },
  });

  useEffect(() => {
    if (data?.data) {
      const formatted = data.data.map((pot) => ({
        ...pot,
        total: Number(pot.total),
        target: Number(pot.target),
        percentage:
          Math.floor((Number(pot.total) / Number(pot.target)) * 10000) / 100,
      }));
      setPots(formatted);
    }
  }, [data, setPots]);

  const selectedPot = pots.find((p) => p.id === selectedPotId);

  const handleConfirm = () => {
    if (!selectedPot || !amount) return;

    const value = Number(amount);

    mutation.mutate({
      id: selectedPot.id,
      amount: value,
      type: type as "add" | "withdraw",
    });
  };

  if (error) <h2>{error.message}</h2>;
  if (isLoading) <h2>Fetching data...</h2>;
  if (data)
    return (
      <div className='grid lg:grid-cols-2 gap-6 grid-cols-1'>
        {pots.map((pot) => {
          return (
            <Pot
              key={pot.id}
              {...pot}
              onAddMoney={() => open("add", pot.id)}
              onWithdraw={() => open("withdraw", pot.id)}
            />
          );
        })}

        {selectedPot && type && (
          <Modal
            isOpen={true}
            onClose={close}
            title={
              type === "add"
                ? `Add to '${selectedPot.name}'`
                : `Withdraw from '${selectedPot.name}'`
            }>
            <p>
              Current Amount: $
              {type === "add"
                ? Number(selectedPot.total) + Number(amount)
                : Number(selectedPot.total) - Number(amount)}
            </p>
            <p>Target: ${selectedPot.target}</p>
            <input
              type='number'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className='w-full border border-gray-300 rounded-lg p-2 mt-4'
              placeholder='Enter amount'
            />
            <button
              disabled={
                mutation.isPending ||
                !amount ||
                (type === "withdraw" && Number(amount) > selectedPot.total)
              }
              onClick={handleConfirm}
              className='mt-4 w-full bg-blue-600 text-white py-2 rounded-lg'>
              {mutation.isPending ? "Processing..." : "Confirm"}
            </button>
          </Modal>
        )}
      </div>
    );
}
