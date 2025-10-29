"use client";
import { getTransactions } from "@/server/actions";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { GoTriangleRight } from "react-icons/go";
import { categorizeBills, Bill } from "@/util/bills";
import { useMemo } from "react";
import BillCard from "./BillCard";

export default function Bills() {
  const router = useRouter();
  const { data, isLoading, error } = useQuery({
    queryKey: ["bills", "home"],
    queryFn: getTransactions,
  });

  const bills = data?.data?.filter((t: Bill) => t.recurring);
  const { totals } = useMemo(() => categorizeBills(bills || []), [bills]);

  if (isLoading) return <p>Loading recurring bills.</p>;
  if (error) return <p>Something went wrong.</p>;
  if (!data) return <p>No recurring bills found.</p>;

  return (
    <section className='flex flex-col gap-5 w-full bg-white mt-8 px-5 py-6 rounded-[12px]'>
      {/* Header */}
      <div className='flex justify-between'>
        <h2 className='heading-l'>Recurring Bills</h2>
        <button
          className='body-m text-grey-500 flex items-center gap-2 cursor-pointer'
          onClick={() => router.push("/pots")}>
          See Details <GoTriangleRight />
        </button>
      </div>
      <div className='flex flex-col gap-5 mt-5'>
        <BillCard
          name='Paid Bills'
          total={+totals.paidTotal.toFixed(2)}
          color='#277C78'
        />
        <BillCard
          name='Total Upcoming'
          total={+totals.upcomingTotal.toFixed(2)}
          color='#F2CDAC'
        />
        <BillCard
          name='Due Soon'
          total={+totals.dueTotal.toFixed(2)}
          color='#82C9D7'
        />
      </div>
    </section>
  );
}
