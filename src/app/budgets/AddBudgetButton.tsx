"use client";

import { useModalStore } from "@/store/modalStore";

export default function AddBudgetButton() {
  const { open } = useModalStore();

  return (
    <button
      onClick={() => open("createBudget")}
      className='body-m-bold bg-grey-900 p-4 text-white border rounded-[8px] cursor-pointer'>
      + Add New Budget
    </button>
  );
}
