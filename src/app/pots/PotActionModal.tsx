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

  const handleConfirm = () => {
    if (!amount) return;
    if (type !== "add" && type !== "withdraw") return;
    actionMutation.mutate({ id: pot.id, amount: Number(amount), type });
  };

  const withdrawInvalid = type === "withdraw" && Number(amount) > pot.total;
  const addExceedsTarget =
    type === "add" && Number(amount) + pot.total > pot.target;
  const addExceedsBalance = type === "add" && Number(amount) > availableBalance;

  const percentage = Number(((pot.total / pot.target) * 100).toFixed(2));
  const addPercentage = Number(
    ((Number(amount) / pot.target) * 100).toFixed(2)
  );
  const formattedPercentage = percentage.toFixed(2);
  const formattedAddPercentage = addPercentage.toFixed(2);
  const withdrawStart = Math.max(percentage - addPercentage, 0);
  const formattedWithdrawStart = withdrawStart.toFixed(2);

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
        <p className='text-grey-900 heading-xl'>
          $
          {type === "add"
            ? Number(pot.total.toFixed(2)) + Number(amount)
            : Number(pot.total.toFixed(2)) - Number(amount)}
        </p>
      </div>

      <div className='w-full bg-gray-100 rounded-full h-2.5'>
        <div className='relative w-full h-2.5 rounded-full overflow-hidden'>
          <div
            className='absolute left-0 top-0 h-full bg-black rounded-full'
            style={{ width: `${formattedPercentage}%` }}
          />
          {type === "add" && addPercentage > 0 && (
            <div
              className='absolute top-0 h-full w-[2px] bg-white shadow-sm z-10'
              style={{ left: `${formattedPercentage}%` }}
            />
          )}
          {type === "withdraw" &&
            addPercentage > 0 &&
            +formattedWithdrawStart !== 0 &&
            +formattedWithdrawStart <= 1 && (
              <div
                className='absolute top-0 h-full w-[2px] bg-white shadow-sm z-10'
                style={{ left: `${formattedWithdrawStart}%` }}
              />
            )}
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
              className='absolute top-0 h-full bg-red-500 rounded-full transition-all duration-100'
              style={{
                left: `${formattedWithdrawStart}%`,
                width: `${formattedAddPercentage}%`,
              }}
            />
          )}
        </div>
      </div>
      <div className='flex justify-between pt-4'>
        <p className={type === "add" ? "text-green-900" : "text-red-900"}>
          {type === "add"
            ? (percentage + addPercentage).toFixed(2)
            : (percentage - addPercentage).toFixed(2)}
          %
        </p>

        <p className='text-grey-500'>Target: ${pot.target.toFixed(2)}</p>
      </div>

      <div className='w-full mt-4'>
        <label className='body-m-bold text-grey-500 mb-1 block'>
          Amount to {type === "add" ? "Add" : "Withdraw"}
        </label>
        <div className='relative'>
          <FaDollarSign className='absolute top-1/2 left-1 -translate-y-1/2 text-beige-500' />
          <input
            type='number'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className='w-full border border-gray-300 rounded-lg p-2 pl-6 text-grey-900 body-m'
            placeholder='Enter amount'
            min='0'
          />
        </div>
      </div>

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
