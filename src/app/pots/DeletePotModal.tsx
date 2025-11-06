"use client";

import Modal from "@/components/ui/Modal";
import { isPot, useModalStore } from "@/store/modalStore";
import { usePotModal } from "@/hooks/usePotModal";

export default function DeletePotModal() {
  const { isOpen, type, data: pot, close } = useModalStore();
  const { deleteMutation } = usePotModal();

  if (!isOpen || type !== "deletePot" || !isPot(pot)) return null;

  const handleDelete = () => {
    deleteMutation.mutate(pot);
  };

  return (
    <Modal isOpen={isOpen} onClose={close} title={`Delete '${pot.name}'?`}>
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
