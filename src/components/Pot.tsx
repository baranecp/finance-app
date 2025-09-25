"use client";
import type { Pot } from "@/types/finance";

export default function Pot({ id, name, saved, color }: Pot) {
  return (
    <div key={id} className='flex overflow-hidden'>
      <div className={`w-[4px] h-full ${color} rounded-full`}></div>
      <div className='flex flex-col gap-2 pl-4'>
        <span className='body-s text-grey-500'>{name}</span>
        <span className='body-m-bold'>${saved}</span>
      </div>
    </div>
  );
}
