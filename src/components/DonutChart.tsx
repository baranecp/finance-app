"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import { getTransactions, getBudgets } from "@/server/actions";

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function DonutChart() {
  const { data: budgets } = useQuery({
    queryKey: ["budgets"],
    queryFn: getBudgets,
  });

  const { data: transactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  const chartData = budgets
    ? {
        labels: budgets.data?.map((b) => b.category),
        datasets: [
          {
            data: budgets.data?.map((b) => b.maximum),
            backgroundColor: budgets.data?.map((b) => b.theme),
            borderColor: budgets.data?.map((b) => b.theme),
            borderWidth: 0,
            borderRadius: 0, // rounds slice ends (Chart.js v3+)
          },
        ],
      }
    : { labels: [], datasets: [] };

  const chartOptions = {
    cutout: "70%", // inner radius 70% of full radius
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    maintainAspectRatio: false, // allow custom sizing
  };

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

  const total = budgetSpendings?.reduce((acc, b) => acc + b.spent, 0);

  return (
    <div className='relative w-64 h-64'>
      {/* The Doughnut chart itself */}
      <Doughnut data={chartData} options={chartOptions} />

      {/* Centered static text */}
      <div className='absolute inset-0 flex flex-col items-center justify-center pointer-events-none'>
        <span className='text-xl font-semibold'>${total}</span>
        <span className='text-sm text-gray-500'>of ${limit} limit</span>
      </div>
    </div>
  );
}
