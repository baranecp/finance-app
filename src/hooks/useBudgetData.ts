import { getBudgetsWithTransactions, getTransactions } from "@/server/actions";
import { BudgetWithTransactions } from "@/types/finance";
import { useQuery } from "@tanstack/react-query";

export function useBudgetData() {
  const { data: budgetsWithTx } = useQuery<BudgetWithTransactions[]>({
    queryKey: ["budgetsWithTransactions"],
    queryFn: async () => getBudgetsWithTransactions(),
  });

  const { data: transactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  const limit =
    budgetsWithTx?.reduce((acc, b) => acc + Number(b.maximum), 0) ?? 0;

  const spendingByCategory = transactions?.data?.reduce((acc, t) => {
    if (t.type === "expense") {
      const category = t.category;
      acc[category] = (acc[category] || 0) + Number(t.amount);
    }
    return acc;
  }, {} as Record<string, number>);

  const budgetSpendings = budgetsWithTx?.map((b) => ({
    ...b,
    spent: spendingByCategory?.[b.category] ?? 0,
    remaining: +b.maximum - (spendingByCategory?.[b.category] ?? 0),
  }));

  const total = budgetSpendings?.reduce((acc, b) => acc + b.spent, 0);

  return {
    budgetsWithTx,
    transactions,
    limit,
    spendingByCategory,
    budgetSpendings,
    total,
  };
}
