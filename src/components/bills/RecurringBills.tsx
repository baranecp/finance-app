"use client";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleExclamation } from "react-icons/fa6";
import Image from "next/image";
import { categorizeBills } from "@/util/bills";

interface RecurringBill {
  id: string;
  name: string;
  avatar: string | null;
  amount: string | number;
  date: Date;
  daysLeft?: number;
  category: string;
  type: "income" | "expense";
  recurring: boolean;
}

interface RecurringBillsProps {
  bills: RecurringBill[];
}

export default function RecurringBills({ bills = [] }: RecurringBillsProps) {
  const { due, upcoming, paid } = categorizeBills(bills);

  const allBills = bills.map((b) => {
    let status: "Due" | "Upcoming" | "Paid" = "Upcoming";
    if (due.some((d) => d.id === b.id)) status = "Due";
    else if (upcoming.some((u) => u.id === b.id)) status = "Upcoming";
    else if (paid.some((p) => p.id === b.id)) status = "Paid";

    return { ...b, status };
  });

  function getOrdinalDay(day: number): string {
    if (day >= 11 && day <= 13) return `${day}th`;
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  }
  return (
    <div className='w-full'>
      {/* Header row */}
      <div className='hidden md:grid grid-cols-[3fr_1fr_1fr] items-center py-4 border-b border-grey-100 text-grey-500 body-s font-medium'>
        <span>Recipient / Sender</span>
        <span>Due Date</span>
        <span className='flex justify-end'>Amount</span>
      </div>

      {/* Transactions */}
      {allBills.map(({ id, name, avatar, amount, date, status }) => {
        const billDate = new Date(date).getDate();
        const billDateLabel = `Monthly-${getOrdinalDay(billDate)}`;

        const statusIcon =
          status === "Paid" ? (
            <FaCheckCircle className='text-green-900' />
          ) : status === "Due" ? (
            <FaCircleExclamation className='text-red-500' />
          ) : undefined;

        return (
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

            <span
              className={`body-s ${
                status === "Paid" ? "text-green-900" : "text-grey-500"
              } flex gap-2 items-center`}>
              {billDateLabel}
              {statusIcon}
            </span>

            <div className='body-m-bold flex justify-end'>
              <span className={`${status === "Due" ? "text-red-500" : ""}`}>
                ${amount}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
