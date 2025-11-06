"use client";
import Modal from "@/components/ui/Modal";
import ThemeSelect from "@/components/ui/ThemeSelect";
import { useBudgetMutations } from "@/hooks/useBudgetMutation";
import { useModalStore, isBudget } from "@/store/modalStore";
import { useEffect, useState } from "react";
import { FaDollarSign } from "react-icons/fa6";
import CategorySelect from "@/components/ui/CategorySelect";
import { useBudgetData } from "@/hooks/useBudgetData";

export default function BudgetForm() {
  const { type, isOpen, close, data: budget } = useModalStore();
  const { createMutation, updateMutation } = useBudgetMutations();
  const { budgetsWithTx } = useBudgetData();
  const isCreating = type === "createBudget";
  const isEditing = type === "editBudget";

  const [formData, setFormData] = useState({
    category: "",
    maximum: 0,
    theme: "",
  });
  const [isReady, setIsReady] = useState(false);

  // --- prefill when editing ---
  useEffect(() => {
    if (!isOpen) {
      setIsReady(false);
      return;
    }

    if (isEditing && isBudget(budget)) {
      setFormData({
        category: budget.category ?? "",
        maximum: Number(budget.maximum ?? 0),
        theme: budget.theme ?? "",
      });
      setIsReady(true);
    } else if (isCreating) {
      setFormData({ category: "", maximum: 0, theme: "" });
      setIsReady(true);
    }
  }, [isOpen, isCreating, isEditing, budget]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && isBudget(budget)) {
      updateMutation.mutate({ budget, data: formData });
    } else if (isCreating) {
      createMutation.mutate(formData);
    }
  };

  const usedBudgetThemes = budgetsWithTx?.map((b) => b.theme) ?? [];

  if (!isOpen || (!isCreating && !isEditing) || !isReady) return null;
  const isFormInvalid =
    !formData.category.trim() ||
    formData.maximum <= 0 ||
    !formData.theme.trim();

  return (
    <Modal
      key={budget?.id || "createBudget"}
      title={isEditing ? "Edit Budget" : "Add New Budget"}
      isOpen={isOpen}
      onClose={close}>
      <p className='text-grey-500 body-m max-w-[480px] mb-5'>
        Create a pot to set savings targets. These can help keep you on track as
        you save for special purchases.
      </p>

      <form onSubmit={handleSubmit}>
        <div className='w-full flex flex-col gap-9 mb-5 text-beige-500 body-m'>
          {/* Budget category */}
          <div>
            <label className='body-m-bold text-grey-500 mb-1 block'>
              Category
            </label>
            <CategorySelect
              value={formData.category}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, category: value }))
              }
            />
          </div>

          {/* Maximum */}
          <div>
            <label className='body-m-bold text-grey-500 mb-1 block'>
              Target
            </label>
            <div className='relative'>
              <FaDollarSign className='absolute top-1/2 left-1 -translate-y-1/2' />
              <input
                type='number'
                placeholder='Target maximum'
                value={formData.maximum || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    maximum: +e.target.value,
                  }))
                }
                className='w-full border p-2 pl-6 rounded text-grey-900'
              />
            </div>
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
              disabled={usedBudgetThemes}
            />
          </div>
        </div>

        <button
          type='submit'
          disabled={
            createMutation.isPending ||
            updateMutation.isPending ||
            isFormInvalid
          }
          className={`mt-4 w-full py-4 rounded-lg body-m-bold text-white ${
            isFormInvalid
              ? "bg-grey-500 cursor-not-allowed"
              : "bg-grey-900 cursor-pointer"
          }`}>
          {isEditing
            ? updateMutation.isPending
              ? "Editting..."
              : "Edit Budget"
            : createMutation.isPending
            ? "Adding..."
            : "Add Budget"}
        </button>
      </form>
    </Modal>
  );
}
