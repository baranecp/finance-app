"use client";
import BudgetSpending from "./BudgetSpending";
import { useBudgetData } from "@/hooks/useBudgetData";

export default function BudgetSpendings() {
  const { budgetSpendings } = useBudgetData();

  return (
    <div>
      <h2 className='mb-4 text-grey-900 heading-l'>Spending Summary</h2>
      <div className='flex flex-col gap-4'>
        {budgetSpendings?.map((b) => (
          <BudgetSpending
            key={b.id}
            maximum={Number(b.maximum)}
            theme={b.theme}
            category={b.category}
            spent={b.spent}
          />
        ))}
      </div>
    </div>
  );
}
