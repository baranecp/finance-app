"use client";
import Budget from "./Budget";
import DonutChart from "../charts/DonutChart";
import { useQuery } from "@tanstack/react-query";
import { getBudgetsWithTransactions } from "@/server/actions";
import { BudgetWithTransactions } from "@/types/finance";
import ViewAllButton from "../ui/ViewAllButton";

export default function Budgets() {
  const {
    data: budgetsWithTx,
    isLoading,
    error,
  } = useQuery<BudgetWithTransactions[]>({
    queryKey: ["budgetsWithTransactions", "home"],
    queryFn: async () => getBudgetsWithTransactions(),
  });

  if (isLoading) return <p>Loading pots.</p>;
  if (error) return <p>Something went wrong.</p>;
  if (!budgetsWithTx) return <p>No transactions found.</p>;

  const latestBudgets = budgetsWithTx
    ?.sort((a, b) => a.category.localeCompare(b.category))
    .slice(0, 4);

  return (
    <section className='w-full bg-white mt-8 px-5 py-6 rounded-[12px]'>
      {/* Header */}
      <div className='flex justify-between mb-5'>
        <h2 className='heading-l'>Budgets</h2>
        <ViewAllButton href='/budgets' label='See Details' />
      </div>

      {/* Chart + Budgets container */}
      <div className='flex flex-wrap gap-5 justify-center items-center'>
        {/* DonutChart */}
        <div className='flex-shrink-0 md:flex-1 min-w-[250px] max-w-[300px] flex justify-center'>
          <DonutChart />
        </div>

        {/* Budgets container with container query */}
        <div className='flex flex-wrap gap-5'>
          {latestBudgets.map((data) => (
            <Budget
              key={data.id}
              id={data.id}
              category={data.category}
              maximum={+data.maximum}
              theme={data.theme}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
