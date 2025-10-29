import { getBudgetsWithTransactions, getTransactions } from "@/server/actions";
import { BudgetWithTransactions } from "@/types/finance";
import { calculateBudgetData } from "@/util/budgets";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export function useBudgetData() {
  const { data: budgetsWithTx } = useQuery<BudgetWithTransactions[]>({
    queryKey: ["budgetsWithTransactions"],
    queryFn: async () => getBudgetsWithTransactions(),
  });

  const { data: transactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  const result = useMemo(() => {
    if (!budgetsWithTx || !transactions?.data) return undefined;
    return calculateBudgetData(budgetsWithTx, transactions.data);
  }, [budgetsWithTx, transactions]);

  return {
    budgetsWithTx,
    transactions,
    ...result,
  };
}
