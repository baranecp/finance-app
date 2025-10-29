import { BudgetWithTransactions } from "@/types/finance";

export function calculateBudgetData(
  budgets: BudgetWithTransactions[],
  transactions: { amount: string; type: string; category: string }[]
) {
  const limit = budgets.reduce((acc, b) => acc + Number(b.maximum), 0);

  const spendingByCategory = transactions.reduce((acc, t) => {
    if (t.type === "expense") {
      acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
    }
    return acc;
  }, {} as Record<string, number>);

  const budgetSpendings = budgets.map((b) => ({
    ...b,
    spent: spendingByCategory[b.category] ?? 0,
    remaining: Number(b.maximum) - (spendingByCategory[b.category] ?? 0),
  }));

  const total = budgetSpendings.reduce((acc, b) => acc + b.spent, 0);

  return { limit, spendingByCategory, budgetSpendings, total };
}
