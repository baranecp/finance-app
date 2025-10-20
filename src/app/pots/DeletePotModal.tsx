"use client";

import Modal from "@/components/Modal";
import { useModalStore } from "@/store/modalStore";
import { usePotModal } from "@/hooks/usePotModal";
import { usePots } from "@/hooks/usePots";

export default function DeletePotModal() {
  const { isOpen, type, selectedPotId, close } = useModalStore();
  const { deleteMutation } = usePotModal();
  const { pots } = usePots();
  const pot = pots.find((p) => p.id === selectedPotId);

  if (!isOpen || type !== "delete" || !pot) return null;

  const handleDelete = () => {
    deleteMutation.mutate(selectedPotId!);
  };

  return (
    <Modal isOpen={isOpen} onClose={close} title={`Delete '${pot.name}'?`}>
      <p className='text-grey-500 body-m mb-4'>
        Are you sure you want to delete this pot? This action cannot be
        reversed, and all the data inside it will be removed forever.
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
