import { getBudgets, getTransactions } from "@/server/actions";
import { useQuery } from "@tanstack/react-query";

export function useBudgetData() {
  const { data: budgets } = useQuery({
    queryKey: ["budgets"],
    queryFn: getBudgets,
  });

  const { data: transactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  const limit = budgets?.data?.reduce((acc, b) => acc + Number(b.maximum), 0);

  const spendingByCategory = transactions?.data?.reduce((acc, t) => {
    if (t.type === "expense") {
      const category = t.category;
      acc[category] = (acc[category] || 0) + Number(t.amount);
    }
    return acc;
  }, {} as Record<string, number>);

  const budgetSpendings = budgets?.data?.map((b) => ({
    ...b,
    spent: spendingByCategory?.[b.category] ?? 0,
  }));

  console.log(budgetSpendings);
  const total = budgetSpendings?.reduce((acc, b) => acc + b.spent, 0);

  return {
    budgets,
    transactions,
    limit,
    spendingByCategory,
    budgetSpendings,
    total,
  };
}
