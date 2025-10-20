"use client";
import { useState } from "react";
import { useModalStore } from "@/store/modalStore";
import { SlOptions } from "react-icons/sl";

type Pot = {
  id: string;
  name: string;
  total: number;
  target: number;
  theme?: string;
  percentage?: number;
};

export default function PotDropdownButton({ pot }: { pot: Pot }) {
  const { open } = useModalStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (type: "edit" | "delete") => {
    open(type, {
      id: pot.id,
      name: pot.name,
      target: pot.target ?? 0,
      total: pot.total ?? 0,
      theme: pot.theme ?? "defaultTheme",
    });
    setIsOpen(false);
  };

  return (
    <div className='relative inline-block text-left'>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className='inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none  focus:ring-gray-50 cursor-pointer'
        type='button'>
        <SlOptions className='text-grey-300' />
      </button>
      {isOpen && (
        <div className='absolute right-0 mt-2 z-50 drop-shadow-xl bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-35'>
          <ul
            className='py-4 px-4 text-sm flex flex-col gap-2'
            aria-labelledby='dropdownMenuIconHorizontalButton'>
            <li>
              <button
                onClick={() => handleOpen("edit")}
                className='w-full text-left px-4 py-2 text-grey-900 cursor-pointer scale-100 active:scale-95 transition-transform duration-200 transform-gpu'>
                Edit Pot
              </button>
            </li>
            <li>
              <button
                onClick={() => handleOpen("delete")}
                className='w-full text-left px-4 py-2  text-[#C94736] cursor-pointer scale-100 active:scale-95 transition-transform duration-200 transform-gpu'>
                Delete Pot
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
