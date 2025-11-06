"use client";
import { getBudgetsWithTransactions } from "@/server/actions";
import { BudgetWithTransactions } from "@/types/finance";
import { useQuery } from "@tanstack/react-query";
import BudgetDropdownButton from "./BudgetDropdownButton";
import Transaction from "@/components/transactions/Transaction";
import ProgressBarBudget from "@/components/budgets/ProgressBarBudget";
import { useBudgetData } from "@/hooks/useBudgetData";
import ModalManager from "@/util/ModalManager";
import ViewAllButton from "@/components/ui/ViewAllButton";

export default function BudgetList() {
  const {
    data: budgetsWithTx,
    isLoading,
    error,
  } = useQuery<BudgetWithTransactions[]>({
    queryKey: ["budgetsWithTransactions"],
    queryFn: async () => getBudgetsWithTransactions(),
  });

  const { spendingByCategory } = useBudgetData();

  const budgetSpendings = budgetsWithTx?.map((b) => ({
    ...b,
    spent: spendingByCategory?.[b.category] ?? 0,
    remaining: (+b.maximum - (spendingByCategory?.[b.category] ?? 0)).toFixed(
      2
    ),
  }));

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading budgets.</p>;

  return (
    <div className='flex flex-col gap-6 mt-8'>
      {budgetSpendings?.map((budget) => (
        <div
          key={budget.id}
          className='bg-white rounded-[12px] py-6 px-5 flex flex-col gap-5'>
          <div className='flex justify-between items-center'>
            <h1
              className={`relative heading-l inline-flex items-center gap-4 before:content-[''] before:bg-[color:var(--theme)] before:w-5 before:h-5 before:rounded-full`}
              style={{ "--theme": budget.theme } as React.CSSProperties}>
              {budget.category}
            </h1>
            <BudgetDropdownButton budget={budget} />
          </div>
          <div>
            <p className='body-m text-grey-500 mb-4'>
              Maximum of ${budget.maximum.toFixed(2)}
            </p>
            <ProgressBarBudget
              percentage={(budget.spent / budget.maximum) * 100}
              theme={budget.theme}
            />
            <div className='flex flex-wrap gap-4 relative overflow-hidden items-center max-w-[65%] justify-between pb-4 mt-4  after:content-[""] after:absolute after:left-0 after:right-0 after:bottom-0  after:h-px after:bg-grey-100 last:after:hidden last:pb-0 last:mb-0'>
              <div className='flex items-center gap-4'>
                <div
                  style={{ backgroundColor: budget.theme }}
                  className={`w-[4px] h-[45px] rounded-full shrink-0`}></div>
                <div className='flex flex-col gap-2'>
                  <span className='body-m text-grey-500'>Spent</span>
                  <span>${budget.spent}</span>
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <div
                  className={`w-[4px] h-[45px] rounded-full shrink-0 bg-beige-100`}></div>
                <div className='flex flex-col gap-2'>
                  <span className='body-m text-grey-500'>Remaining</span>
                  <span
                    className={
                      budget.maximum < +budget.spent ? "text-red-500" : ""
                    }>
                    {budget.maximum < +budget.spent
                      ? `${budget.remaining}$`
                      : `$${budget.remaining}`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <section className='flex flex-col gap-5 w-full bg-beige-100 mt-8 px-5 py-6 rounded-[12px]'>
            <div className='flex justify-between gap-1'>
              <h2 className='heading-l'>Latest Spendings</h2>
              <ViewAllButton
                href={`/transactions?category=${budget.category}`}
              />
            </div>

            {budget.transactions.map((t) => {
              const formattedDate = new Date(t.date).toLocaleDateString(
                "en-GB",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }
              );

              return (
                <Transaction
                  key={t.id}
                  id={t.id}
                  avatar={t.avatar}
                  name={t.name}
                  type={t.type}
                  amount={`${t.amount}`}
                  date={formattedDate}
                />
              );
            })}
          </section>
        </div>
      ))}
      <ModalManager />
    </div>
  );
}
