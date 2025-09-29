"use client";
import type { Transactions } from "@/types/finance";

export default function Transaction({
  id,
  category,
  type,
  amount,
  date,
}: Transactions) {
  return (
    <div
      key={id}
      className='flex justify-between items-center body-m-bold relative pb-[20px] mb-[20px] after:content-[""] after:absolute after:left-0 after:right-0 after:bottom-0  after:h-px after:bg-grey-100 last:after:hidden last:pb-0 last:mb-0'>
      <span>{category}</span>
      <div className='flex flex-col gap-2'>
        <span
          className={`self-end ${
            type === "expense" ? "text-black" : "text-green-900"
          }`}>
          {type === "expense" ? "-" : "+"}${amount}
        </span>
        <span className='body-s text-grey-500'>{date}</span>
      </div>
    </div>
  );
}
