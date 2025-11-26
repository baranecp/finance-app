"use client";
import { getTransactions } from "@/server/actions";
import { useQuery } from "@tanstack/react-query";
import { categorizeBills, Bill } from "@/util/bills";
import { useEffect, useMemo } from "react";
import BillCard from "./BillCard";
import ViewAllButton from "../ui/ViewAllButton";

export default function Bills() {
  const { data, isLoading, error, isFetched } = useQuery({
    queryKey: ["bills", "home"],
    queryFn: getTransactions,
  });

  const bills = data?.data?.filter((t: Bill) => t.recurring);
  const { totals } = useMemo(() => categorizeBills(bills || []), [bills]);

  useEffect(() => {
    if (isFetched) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).finishLoading?.();
    }
  }, [isFetched]);

  if (isLoading) return <p>Loading recurring bills.</p>;
  if (error) return <p>Something went wrong.</p>;
  if (!data) return <p>No recurring bills found.</p>;

  return (
    <section className='flex flex-col gap-5 w-full bg-white mt-8 px-5 py-6 rounded-[12px]'>
      {/* Header */}
      <div className='flex justify-between'>
        <h2 className='heading-l'>Recurring Bills</h2>
        <ViewAllButton href='/bills' label='See Details' />
      </div>
      <div className='flex flex-col gap-5 mt-5'>
        <BillCard
          name='Paid Bills'
          total={+totals.paidTotal.toFixed(2)}
          color='#277C78'
        />
        <BillCard
          name='Total Upcoming'
          total={totals.upcomingTotal.toFixed(2)}
          color='#F2CDAC'
        />
        <BillCard
          name='Due Soon'
          total={totals.dueTotal.toFixed(2)}
          color='#82C9D7'
        />
      </div>
    </section>
  );
}
