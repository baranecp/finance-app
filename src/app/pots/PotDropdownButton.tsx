"use client";
import { useState } from "react";
import { useModalStore } from "@/store/modalStore";
import { SlOptions } from "react-icons/sl";

export default function PotDropdownButton({ potId }: { potId: string }) {
  const { open, setSelectedPotId } = useModalStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (type: "edit" | "delete") => {
    setSelectedPotId(potId);
    open(type, potId);
    setIsOpen(false);
  };

  return (
    <div className='relative inline-block text-left'>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className='inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
        type='button'>
        <SlOptions className='cursor-pointer text-grey-300' />
      </button>
      {isOpen && (
        <div className='absolute right-0 mt-2 z-50 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600'>
          <ul
            className='py-2 text-sm text-gray-700 dark:text-gray-200'
            aria-labelledby='dropdownMenuIconHorizontalButton'>
            <li>
              <button
                onClick={() => handleOpen("edit")}
                className='w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                Edit
              </button>
            </li>
            <li>
              <button
                onClick={() => handleOpen("delete")}
                className='w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                Delete
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
