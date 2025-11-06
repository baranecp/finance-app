"use client";
import type { Transactions } from "@/types/finance";
import Image from "next/image";

export default function Transaction({
  id,
  name,
  type,
  avatar,
  amount,
  date,
}: Transactions) {
  const isExpense = type === "expense";
  return (
    <div
      key={id}
      className='relative pb-[20px] mb-[20px] after:content-[""] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-grey-100 last:after:hidden last:pb-0 last:mb-0'>
      {/* Desktop layout */}
      <div className='hidden sm:flex justify-between items-center body-m-bold'>
        <div className='flex items-center gap-3'>
          <Image
            src={avatar}
            alt={name}
            width={40}
            height={40}
            className='rounded-full object-cover'
          />
          <span>{name}</span>
        </div>

        <div className='flex flex-col gap-1 text-right'>
          <span className={`${isExpense ? "text-black" : "text-green-900"}`}>
            {isExpense ? "-" : "+"}${amount}
          </span>
          <span className='body-s text-grey-500'>{date}</span>
        </div>
      </div>

      {/* Mobile layout */}
      <div className='flex flex-col sm:hidden gap-3'>
        <div className='flex items-center gap-3'>
          <Image
            src={avatar}
            alt={name}
            width={40}
            height={40}
            className='rounded-full object-cover'
          />
          <span className='body-m-bold'>{name}</span>
          <span
            className={`ml-auto body-m-bold ${
              isExpense ? "text-black" : "text-green-900"
            }`}>
            {isExpense ? "-" : "+"}${amount}
          </span>
        </div>
      </div>
    </div>
  );
}
