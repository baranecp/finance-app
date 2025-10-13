"use client";
import { useState } from "react";
import Modal from "@/components/Modal";

type Pot = {
  id: string;
  name: string;
  total: number;
  target: number;
};

export default function PotActionModal({
  pot,
  type,
  mutation,
  availableBalance = 4835,
  onClose,
}: {
  pot: Pot;
  type: "add" | "withdraw";
  mutation: {
    mutate: (variables: {
      id: string;
      amount: number;
      type: "add" | "withdraw";
    }) => void;
    isPending: boolean;
  };
  availableBalance?: number;
  onClose: () => void;
}) {
  const [amount, setAmount] = useState("");

  const handleConfirm = () => {
    if (!amount) return;
    mutation.mutate({ id: pot.id, amount: Number(amount), type });
  };

  const withdrawInvalid = type === "withdraw" && Number(amount) > pot.total;
  const addExceedsTarget =
    type === "add" && Number(amount) + pot.total > pot.target;
  const addExceedsBalance = type === "add" && Number(amount) > availableBalance;

  return (
    <Modal
      isOpen={!!pot}
      onClose={onClose}
      title={
        type === "add" ? `Add to '${pot.name}'` : `Withdraw from '${pot.name}'`
      }>
      <p>
        New Amount: $
        {type === "add"
          ? Number(pot.total.toFixed(2)) + Number(amount)
          : Number(pot.total.toFixed(2)) - Number(amount)}
      </p>
      <p>Target: ${pot.target.toFixed(2)}</p>

      <input
        type='number'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className='w-full border border-gray-300 rounded-lg p-2 mt-4'
        placeholder='Enter amount'
        min='0'
      />

      {withdrawInvalid && (
        <p className='text-red-600 mt-2'>
          Cannot withdraw more than current total!
        </p>
      )}
      {addExceedsTarget && (
        <p className='text-red-600 mt-2'>
          Cannot add more than pot target (${pot.target})
        </p>
      )}
      {addExceedsBalance && (
        <p className='text-red-600 mt-2'>
          Cannot add more than your balance (${availableBalance})
        </p>
      )}

      <button
        onClick={handleConfirm}
        disabled={
          mutation.isPending ||
          !amount ||
          withdrawInvalid ||
          addExceedsTarget ||
          addExceedsBalance
        }
        className='mt-4 w-full bg-blue-600 text-white py-2 rounded-lg'>
        {mutation.isPending ? "Processing..." : "Confirm"}
      </button>
    </Modal>
  );
}
