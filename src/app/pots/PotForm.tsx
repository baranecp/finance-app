"use client";

import { useState, useEffect } from "react";
import { isPot, useModalStore } from "@/store/modalStore";
import { usePotModal } from "@/hooks/usePotModal";
import Modal from "@/components/Modal";
import { FaDollarSign } from "react-icons/fa6";
import ThemeSelect from "@/components/ThemeSelect";
import { usePots } from "@/hooks/usePots";

export default function PotForm() {
  const { type, isOpen, data: pot, close } = useModalStore();
  const { createMutation, updateMutation } = usePotModal();
  const { pots } = usePots();
  const isEditing = type === "editPot";
  const isCreating = type === "create";

  const [formData, setFormData] = useState({
    name: "",
    target: 0,
    theme: "#000000",
  });
  const [error, setError] = useState<string | null>(null);

  // --- prefill when editing ---
  useEffect(() => {
    if (isEditing && isPot(pot)) {
      setFormData({
        name: pot.name,
        target: pot.target,
        theme: pot.theme,
      });
    } else if (isCreating) {
      setFormData({ name: "", target: 0, theme: "#000000" });
    }
  }, [isEditing, isCreating, pot]);

  // --- validate target against current total ---
  useEffect(() => {
    if (isEditing && isPot(pot) && formData.target < pot.total) {
      setError(
        `Target cannot be lower than current total ($${pot.total.toFixed(2)})`
      );
    } else {
      setError(null);
    }
  }, [formData.target, isEditing, pot]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (error) return;
    if (isEditing && isPot(pot)) {
      updateMutation.mutate({ pot, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };
  const usedPotThemes = pots.map((pot) => pot.theme);

  if (!isOpen || (!isEditing && !isCreating)) return null;

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
          {/* Pot name */}
          <div>
            <label className='body-m-bold text-grey-500 mb-1 block'>
              Pot Name
            </label>
            <input
              type='text'
              placeholder='e.g. Rainy Days'
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className='w-full border p-2 pl-6 rounded text-grey-900 body-m'
            />
          </div>

          {/* Target */}
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
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    target: +e.target.value,
                  }))
                }
                className='w-full border p-2 pl-6 rounded text-grey-900'
              />
            </div>
            {error && <p className='text-red-600 mt-1 text-sm'>{error}</p>}
          </div>

          {/* Theme */}
          <div>
            <label className='body-m-bold text-grey-500 mb-1 block'>
              Theme
            </label>
            <ThemeSelect
              value={formData.theme}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, theme: value }))
              }
              disabled={usedPotThemes}
            />
          </div>
        </div>

        <button
          type='submit'
          disabled={
            !!error || createMutation.isPending || updateMutation.isPending
          }
          className='mt-4 w-full py-4 rounded-lg body-m-bold text-white bg-grey-900 cursor-pointer disabled:text-grey-500 disabled:cursor-default'>
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
