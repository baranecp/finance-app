"use client";

import Modal from "@/components/Modal";
import { useBudgetMutations } from "@/hooks/useBudgetMutation";
import { isBudget, useModalStore } from "@/store/modalStore";

export default function DeleteBudgetModal() {
  const { isOpen, type, data: budget, close } = useModalStore();
  const { deleteMutation } = useBudgetMutations();

  if (!isOpen || type !== "deleteBudget" || !isBudget(budget)) return null;

  const handleDelete = () => {
    deleteMutation.mutate(budget);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={close}
      title={`Delete '${budget.category}'?`}>
      <p className='text-grey-500 body-m mb-4'>
        Are you sure you want to delete this pot? This action cannot be undone.
      </p>
      <div className='flex flex-col gap-4'>
        <button
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
          className='flex-1 py-3 rounded-lg bg-[#C94736] text-white body-m-bold cursor-pointer'>
          {deleteMutation.isPending ? "Deleting..." : "Yes, Confirm Deletion"}
        </button>
        <button
          onClick={close}
          className='flex-1 py-3 text-grey-500 body-m cursor-pointer'>
          No, Go Back
        </button>
      </div>
    </Modal>
  );
}
