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
  return (
    <div
      key={id}
      className='flex justify-between items-center body-m-bold relative pb-[20px] mb-[20px] after:content-[""] after:absolute after:left-0 after:right-0 after:bottom-0  after:h-px after:bg-grey-100 last:after:hidden last:pb-0 last:mb-0'>
      <div className='flex items-center gap-2'>
        <Image
          src={avatar}
          alt={name}
          width={40}
          height={40}
          className='rounded-full object-cover'
        />
        <span>{name}</span>
      </div>
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
