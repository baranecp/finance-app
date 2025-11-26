"use client";

import { useQuery } from "@tanstack/react-query";
import type { Transactions } from "@/types/finance";
import Transaction from "./Transaction";
import { fetchLatestTransactions } from "@/server/actions";
import ViewAllButton from "../ui/ViewAllButton";

export default function TransactionsOverview() {
  const { data, isLoading, error } = useQuery<Transactions[]>({
    queryKey: ["latest-transactions"],
    queryFn: fetchLatestTransactions,
  });

  if (isLoading) return <p>Loading transactions...</p>;
  if (error) return <p>Something went wrong.</p>;
  if (!data || data.length === 0) return <p>No transactions found.</p>;
  return (
    <section className='flex flex-col gap-5 w-full bg-white mt-8 px-5 py-6 rounded-[12px]'>
      <div className='flex justify-between'>
        <h2 className='heading-l'>Transactions</h2>
        <ViewAllButton href='/transactions' />
      </div>
      <div>
        {data.map((t) => {
          const formattedDate = new Date(t.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
          return (
            <Transaction
              key={t.id}
              id={t.id}
              avatar={t.avatar}
              name={t.name}
              type={t.type}
              amount={t.amount}
              date={formattedDate}
            />
          );
        })}
      </div>
    </section>
  );
}
