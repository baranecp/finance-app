"use client";
import { FaDollarSign } from "react-icons/fa6";
import { useModalStore } from "@/store/modalStore";
import { usePotModal } from "@/hooks/usePotModal";
import Modal from "@/components/ui/Modal";
import type { Pot } from "@/store/modalStore";
import ProgressBar from "@/components/ui/ProgressBar";
import usePotAction from "@/hooks/usePotAction";

export default function PotActionModal() {
  const { isOpen, type, data, close } = useModalStore();
  const { actionMutation } = usePotModal();

  const pot = (data as Pot) ?? { name: "", total: 0, target: 1, theme: "" };

  const {
    amount,
    numericAmount,
    percentage,
    addPercentage,
    withdrawStart,
    newTotal,
    maxAmount,
    isDisabled,
    handleChange,
  } = usePotAction(pot, type ?? "");

  if (!isOpen || !type || !data) return null;

  const handleConfirm = () => {
    if (isDisabled || (type !== "add" && type !== "withdraw")) return;
    actionMutation.mutate({
      pot,
      amount: numericAmount,
      type: type as "add" | "withdraw",
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={close}
      title={
        type === "add" ? `Add to '${pot.name}'` : `Withdraw from '${pot.name}'`
      }>
      <p className='text-grey-500 body-m max-w-[480px] mb-5'>
        Manage your savings efficiently by adding or withdrawing funds.
      </p>

      {/* Summary */}
      <div className='flex justify-between items-center pb-4'>
        <p className='text-grey-500 body-m'>New Amount</p>
        <p className='text-grey-900 heading-xl'>${newTotal.toFixed(2)}</p>
      </div>

      {/* Progress */}
      <ProgressBar
        type={type}
        percentage={percentage}
        addPercentage={addPercentage}
        withdrawStart={withdrawStart}
      />

      {/* Info */}
      <div className='flex justify-between pt-4'>
        <p className={type === "add" ? "text-green-900" : "text-red-900"}>
          {newTotal > 0 && (newTotal / pot.target) * 100 <= 100
            ? ((newTotal / pot.target) * 100).toFixed(2)
            : 0}
          %
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

      {/* Confirm */}
      <button
        onClick={handleConfirm}
        disabled={actionMutation.isPending || isDisabled}
        className='mt-4 w-full py-4 rounded-lg body-m-bold text-white bg-grey-900 cursor-pointer disabled:text-grey-300 disabled:cursor-default'>
        {actionMutation.isPending
          ? "Processing..."
          : `Confirm ${type === "add" ? "Addition" : "Withdrawal"}`}
      </button>
    </Modal>
  );
}
