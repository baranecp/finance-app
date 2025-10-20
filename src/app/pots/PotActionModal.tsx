"use client";
import { FaDollarSign } from "react-icons/fa6";
import { useState } from "react";
import Modal from "@/components/Modal";
import { useModalStore } from "@/store/modalStore";
import { usePots } from "@/hooks/usePots";
import { usePotModal } from "@/hooks/usePotModal";

export default function PotActionModal() {
  const [amount, setAmount] = useState("");
  const { isOpen, type, selectedPotId, close } = useModalStore();
  const { pots } = usePots();
  const { actionMutation } = usePotModal();

  const pot = pots.find((p) => p.id === selectedPotId);
  const availableBalance = 4835;

  if (!isOpen || !pot || !type) return null;

  // --- Computed values ---
  const numericAmount = Number(amount);
  const percentage = Number(((pot.total / pot.target) * 100).toFixed(2));
  const addPercentage = Number(((numericAmount / pot.target) * 100).toFixed(2));
  const withdrawStart = Math.max(percentage - addPercentage, 0);

  const formattedPercentage = percentage.toFixed(2);
  const formattedAddPercentage = addPercentage.toFixed(2);
  const formattedWithdrawStart = withdrawStart.toFixed(2);

  const withdrawInvalid = type === "withdraw" && numericAmount > pot.total;
  const addExceedsTarget =
    type === "add" && numericAmount + pot.total > pot.target;
  const addExceedsBalance = type === "add" && numericAmount > availableBalance;

  const maxAmount =
    type === "withdraw"
      ? pot.total
      : type === "add"
      ? Math.min(pot.target - pot.total, availableBalance)
      : undefined;

  const newTotal =
    type === "add" ? pot.total + numericAmount : pot.total - numericAmount;

  // --- Handlers ---
  const handleConfirm = () => {
    if (!amount || withdrawInvalid || addExceedsTarget || addExceedsBalance)
      return;
    if (type !== "add" && type !== "withdraw") return;
    actionMutation.mutate({
      id: pot.id,
      amount: numericAmount,
      type: type as "add" | "withdraw",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = Number(e.target.value);
    if (val < 0) val = 0;
    if (maxAmount !== undefined && val > maxAmount) val = maxAmount;
    setAmount(val.toString());
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={close}
      title={
        type === "add" ? `Add to '${pot.name}'` : `Withdraw from '${pot.name}'`
      }>
      <p className='text-grey-500 body-m max-w-[480px] mb-5'>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus
        hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet.
      </p>

      <div className='flex justify-between items-center pb-4'>
        <p className='text-grey-500 body-m'>New Amount</p>
        <p className='text-grey-900 heading-xl'>${newTotal.toFixed(2)}</p>
      </div>

      {/* Progress Bar */}
      <div className='w-full bg-gray-100 rounded-full h-2.5'>
        <div className='relative w-full h-2.5 rounded-full overflow-hidden'>
          <div
            className='absolute left-0 top-0 h-full bg-black rounded-left-full'
            style={{ width: `${formattedPercentage}%` }}
          />
          {type === "add" && (
            <div
              className='absolute top-0 h-full bg-green-600 rounded-r-full transition-all duration-100'
              style={{
                left: `${formattedPercentage}%`,
                width: `${formattedAddPercentage}%`,
              }}
            />
          )}
          {type === "withdraw" && (
            <div
              className='absolute top-0 h-full bg-red-500 rounded-left-full transition-all duration-100'
              style={{
                left: `${formattedWithdrawStart}%`,
                width: `${formattedAddPercentage}%`,
              }}
            />
          )}
        </div>
      </div>

      {/* Progress Info */}
      <div className='flex justify-between pt-4'>
        <p className={type === "add" ? "text-green-900" : "text-red-900"}>
          {newTotal > 0 ? ((newTotal / pot.target) * 100).toFixed(2) : 0}%
        </p>
        <p className='text-grey-500'>Target: ${pot.target.toFixed(2)}</p>
      </div>

      {/* Input */}
      <div className='w-full mt-4'>
        <label className='body-m-bold text-grey-500 mb-1 block'>
          Amount to {type === "add" ? "Add" : "Withdraw"}
        </label>
        <div className='relative'>
          <FaDollarSign className='absolute top-1/2 left-1 -translate-y-1/2 text-beige-500' />
          <input
            type='number'
            value={amount}
            min={0}
            max={maxAmount}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded-lg p-2 pl-6 text-grey-900 body-m'
            placeholder={`Enter amount (max $${maxAmount})`}
          />
        </div>
      </div>

      {/* Confirm Button */}
      <button
        onClick={handleConfirm}
        disabled={
          actionMutation.isPending ||
          !amount ||
          withdrawInvalid ||
          addExceedsTarget ||
          addExceedsBalance
        }
        className='mt-4 w-full py-4 rounded-lg body-m-bold text-white bg-grey-900'>
        {actionMutation.isPending
          ? "Processing..."
          : `Confirm ${type === "add" ? "Addition" : "Withdrawal"}`}
      </button>
    </Modal>
  );
}
