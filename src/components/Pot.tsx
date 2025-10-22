"use client";
import type { PotType } from "@/types/finance";

export default function Pot({ id, name, total, theme }: PotType) {
  return (
    <div key={id} className='flex overflow-hidden'>
      <div
        style={{ backgroundColor: theme }}
        className={`w-[4px] h-[45px] rounded-full shrink-0`}></div>
      <div className='flex flex-col gap-2 pl-4'>
        <span className='body-s text-grey-500'>{name}</span>
        <span className='body-m-bold'>${total}</span>
      </div>
    </div>
  );
}
