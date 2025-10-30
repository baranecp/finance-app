"use client";

import Image from "next/image";

interface RecurringBill {
  id: string;
  name: string;
  avatar: string;
  amount: string;
  date: Date;
}

interface RecurringBillsProps {
  bills: RecurringBill[];
}

export default function RecurringBills({ bills = [] }: RecurringBillsProps) {
  return (
    <div className='w-full'>
      {/* Header row */}
      <div className='hidden md:grid grid-cols-[3fr_1fr_1fr] items-center py-4 border-b border-grey-100 text-grey-500 body-s font-medium'>
        <span>Recipient / Sender</span>
        <span>Due Date</span>
        <span>Amount</span>
      </div>

      {/* Transactions */}
      {bills.map(({ id, name, avatar, amount, date }) => (
        <div
          key={id}
          className='grid grid-cols-[3fr_1fr_1fr] items-center py-6 border-b border-grey-100 last:border-none text-sm'>
          <div className='flex items-center gap-2'>
            <Image
              src={avatar || "/default-avatar.png"}
              alt={name}
              width={40}
              height={40}
              className='rounded-full object-cover'
            />
            <span className='body-m-bold'>{name}</span>
          </div>
          <span className='body-s text-grey-500'>
            {new Date(date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>

          <div className='body-m-bold flex'>
            <span>${amount}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
