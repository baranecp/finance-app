"use client";

import { getBudgetsWithTransactions } from "@/server/actions";
import { BudgetWithTransactions } from "@/types/finance";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function BudgetList() {
  const {
    data: budgetsWithTx,
    isLoading,
    error,
  } = useQuery<BudgetWithTransactions[]>({
    queryKey: ["budgetsWithTransactions"],
    queryFn: () => getBudgetsWithTransactions(3),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading budgets.</p>;

  return (
    <div className='flex flex-col gap-6'>
      {budgetsWithTx?.map((budget) => (
        <div key={budget.id} className='p-4 border rounded-lg'>
          <h3 className='font-semibold'>{budget.category}</h3>
          <p>Limit: ${budget.maximum}</p>

          <div className='mt-2'>
            <h4 className='font-medium'>Latest Transactions:</h4>
            {budget.transactions.length ? (
              budget.transactions.map((t) => (
                <div key={t.id} className='flex justify-between'>
                  <span>{t.name}</span>
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={40}
                    height={40}
                    className='rounded-full object-cover'
                  />
                  <span
                    className={
                      t.type === "income" ? "text-green-500" : "text-red-500"
                    }>
                    {t.type === "income" ? "+" : "-"}${t.amount}
                  </span>
                </div>
              ))
            ) : (
              <p className='text-gray-400'>No transactions yet</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
