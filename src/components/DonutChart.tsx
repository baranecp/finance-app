"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useBudgetData } from "@/hooks/useBudgetData";
import { Doughnut } from "react-chartjs-2";

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function DonutChart() {
  const { budgets, total, limit } = useBudgetData();
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
