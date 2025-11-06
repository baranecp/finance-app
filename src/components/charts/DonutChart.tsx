"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useBudgetData } from "@/hooks/useBudgetData";
import { Doughnut } from "react-chartjs-2";

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function DonutChart() {
  const { budgetsWithTx, total, limit } = useBudgetData();
  const hasBudgets = budgetsWithTx && budgetsWithTx.length > 0;

  const chartData = hasBudgets
    ? {
        labels: budgetsWithTx?.map((b) => b.category),
        datasets: [
          {
            data: budgetsWithTx?.map((b) => b.maximum),
            backgroundColor: budgetsWithTx?.map((b) => b.theme),
            borderColor: budgetsWithTx?.map((b) => b.theme),
            borderWidth: 0,
            borderRadius: 0,
          },
        ],
      }
    : {
        labels: ["No Budgets"],
        datasets: [
          {
            data: [1],
            backgroundColor: ["#E5E7EB"],
            borderColor: ["#D1D5DB"],
            borderWidth: 2,
          },
        ],
      };

  const chartOptions = {
    cutout: "70%",
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className='relative w-64 h-64'>
      {/* The Doughnut chart itself */}
      <Doughnut data={chartData} options={chartOptions} />

      {/* Centered static text */}
      <div className='absolute inset-0 flex flex-col items-center justify-center pointer-events-none'>
        <span className='heading-xl'>${total}</span>
        <span className='body-s text-gray-500'>of ${limit} limit</span>
      </div>
    </div>
  );
}
