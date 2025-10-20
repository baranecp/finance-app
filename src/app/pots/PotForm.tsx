"use client";
import { usePotsStore } from "@/store/potsStore";
import { usePotModal } from "@/hooks/usePotModal";
import Modal from "@/components/Modal";
import { useModalStore } from "@/store/modalStore";
import { FaDollarSign } from "react-icons/fa6";
import ThemeSelect from "@/components/ThemeSelect";
import { useEffect } from "react";

export default function PotForm() {
  const { formData, setFormData, resetForm } = usePotsStore();
  const { createMutation, updateMutation, isEditing, selectedPot } =
    usePotModal();
  const { type, isOpen, close } = useModalStore();

  useEffect(() => {
    if (isEditing && selectedPot) {
      setFormData({
        name: selectedPot.name,
        target: selectedPot.target,
        theme: selectedPot.theme,
      });
    } else {
      resetForm();
    }
  }, [isEditing, selectedPot, setFormData, resetForm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && selectedPot) {
      updateMutation.mutate({ potId: selectedPot.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  if (!isOpen || (type !== "edit" && type !== "create")) return null;

  return (
    <Modal
      title={isEditing ? "Edit Pot" : "Add New Pot"}
      isOpen={isOpen}
      onClose={close}>
      <p className='text-grey-500 body-m max-w-[480px] mb-5'>
        Create a pot to set savings targets. These can help keep you on track as
        you save for special purchases.
      </p>
      <form onSubmit={handleSubmit}>
        <div className='w-full flex flex-col gap-9 mb-5 text-beige-500 body-m'>
          <div>
            <label className='body-m-bold text-grey-500 mb-1 block'>
              Pot Name
            </label>
            <input
              type='text'
              placeholder='e.g. Rainy Days'
              value={formData.name}
              onChange={(e) => setFormData({ name: e.target.value })}
              className='w-full border p-2 pl-6 rounded text-grey-900 body-m'
            />
          </div>

          <div>
            <label className='body-m-bold text-grey-500 mb-1 block'>
              Target
            </label>
            <div className='relative'>
              <FaDollarSign className='absolute top-1/2 left-1 -translate-y-1/2' />
              <input
                type='number'
                placeholder='Target amount'
                value={formData.target || ""}
                onChange={(e) => setFormData({ target: +e.target.value })}
                className='w-full border p-2 pl-6 rounded text-grey-900'
              />
            </div>
          </div>

          <div>
            <label className='body-m-bold text-grey-500 mb-1 block'>
              Theme
            </label>
            <ThemeSelect
              value={formData.theme}
              onChange={(value) => setFormData({ theme: value })}
            />
          </div>
        </div>

        <button
          type='submit'
          disabled={createMutation.isPending || updateMutation.isPending}
          className='mt-4 w-full py-4 rounded-lg body-m-bold text-white bg-grey-900 cursor-pointer'>
          {isEditing
            ? updateMutation.isPending
              ? "Editing..."
              : "Edit Pot"
            : createMutation.isPending
            ? "Creating..."
            : "Create Pot"}
        </button>
      </form>
    </Modal>
  );
}
