"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { Transactions } from "@/types/finance";
import Transaction from "./Transaction";
import { GoTriangleRight } from "react-icons/go";

export default function TransactionsOverview() {
  const router = useRouter();
  const { data, isLoading, error } = useQuery<Transactions[]>({
    queryKey: ["transactions"],
    queryFn: async () => {
      const res = await fetch("/api/transactions");
      if (!res.ok) throw new Error("Failed to fetch transactions");
      return res.json();
    },
  });

  if (isLoading) return <p>Loading transactions...</p>;
  if (error) return <p>Something went wrong.</p>;
  if (!data || data.length === 0) return <p>No transactions found.</p>;

  return (
    <section className='flex flex-col gap-5 w-full lg:max-w-[700px] bg-white mt-8 px-5 py-6 rounded-[12px]'>
      <div className='flex justify-between'>
        <h2 className='heading-l'>Transactions</h2>
        <button
          className='body-m text-grey-500 flex items-center gap-2 cursor-pointer'
          onClick={() => router.push("/transactions")}>
          View All <GoTriangleRight />
        </button>
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
