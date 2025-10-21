"use client";

import type { Budget } from "@/types/finance";

export default function Budget({ id, category, maximum, theme }: Budget) {
  return (
    <div key={id} className='flex items-center'>
      <div
        style={{ backgroundColor: theme }}
        className='w-[4px] h-[45px] rounded-full shrink-0'></div>

      <div className='flex flex-col gap-1 pl-4'>
        <span className='body-s text-grey-500 truncate'>{category}</span>
        <span className='body-m-bold'>${maximum}</span>
      </div>
    </div>
  );
}
