"use client";
import type { Transactions } from "@/types/finance";
import Image from "next/image";

export default function TransactionAllList({
  transactions,
}: {
  transactions: Transactions[];
}) {
  return (
    <div className='w-full h-screen'>
      {/* Header row */}
      <div className='hidden md:grid grid-cols-[1.5fr_1fr_1fr_1fr] items-center py-4 border-b border-grey-100 text-grey-500 body-s font-medium'>
        <span>Recipient / Sender</span>
        <span>Category</span>
        <span>Transaction Date</span>
        <span className='text-right'>Amount</span>
      </div>

      {/* Transactions */}
      {transactions.map(
        ({ id, name, type, avatar, amount, date, category }) => (
          <div
            key={id}
            className='grid grid-cols-[1.5fr_1fr_1fr_1fr] items-center py-6 border-b border-grey-100 last:border-none text-sm'>
            <div className='flex items-center gap-2'>
              <Image
                src={avatar}
                alt={name}
                width={40}
                height={40}
                className='rounded-full object-cover'
              />
              <span className='body-m-bold'>{name}</span>
            </div>
            <span className='body-s text-grey-500'>{category}</span>
            <span className='body-s text-grey-500'>{date}</span>
            <div className='body-m-bold flex justify-end'>
              <span
                className={`${
                  type === "expense" ? "text-grey-900" : "text-[#277C78]"
                }`}>
                {type === "expense" ? "-" : "+"}${amount}
              </span>
            </div>
          </div>
        )
      )}
    </div>
  );
}
