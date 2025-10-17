"use client";

import { useModalStore } from "@/store/modalStore";

export default function AddPotButton() {
  const { open } = useModalStore();

  return (
    <button
      onClick={() => open("create")}
      className='body-m-bold bg-grey-900 p-4 text-white border rounded-[8px] cursor-pointer'>
      + Add New Pot
    </button>
  );
}
