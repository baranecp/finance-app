"use client";
import Modal from "@/components/Modal";
import ThemeSelect from "@/components/ThemeSelect";
import { useBudgetMutations } from "@/hooks/useBudgetMutation";
import { useModalStore } from "@/store/modalStore";
import { useState } from "react";
import { FaDollarSign } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { getBudgets } from "@/server/actions";
import CategorySelect from "@/components/CategorySelect";

export default function BudgetForm() {
  const { type, isOpen, close } = useModalStore();
  const { createMutation } = useBudgetMutations();

  const categories = [
    { value: "General", label: "General" },
    { value: "Dining Out", label: "Dining Out" },
    { value: "Groceries", label: "Groceries" },
    { value: "Entertainment", label: "Entertainment" },
    { value: "Transportation", label: "Transportation" },
    { value: "Lifestyle", label: "Lifestyle" },
    { value: "Personal Care", label: "Personal Care" },
    { value: "Education", label: "Education" },
    { value: "Bills", label: "Bills" },
    { value: "Shopping", label: "Shopping" },
  ];

  const { data: budgets } = useQuery({
    queryKey: ["budgets"],
    queryFn: getBudgets,
  });

  const category = budgets?.data?.map((b) => b.category);

  const isCreating = type === "createBudget";

  const [formData, setFormData] = useState({
    category: "",
    maximum: 0,
    theme: "#000000",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  if (!isOpen || !isCreating) return null;

  return (
    <Modal
      title={isCreating ? "Add New Budget" : ""}
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
            <label className='body-m text-grey-500'>Category</label>
            <CategorySelect
              value={formData.category}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, category: value }))
              }
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
            />
          </div>
        </div>

        <button
          type='submit'
          disabled={createMutation.isPending}
          className='mt-4 w-full py-4 rounded-lg body-m-bold text-white bg-grey-900 cursor-pointer'>
          {createMutation.isPending ? "Adding..." : "Add Budget"}
        </button>
      </form>
    </Modal>
  );
}
