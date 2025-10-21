"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Dummy data and colors
const chartData = {
  labels: ["Dining Out", "Bills", "Entertainment", "Personal Care"],
  datasets: [
    {
      data: [75, 750, 50, 100],
      backgroundColor: ["#F2CDAC", "#82C9D7", "#277C78", "#626070"],
      borderColor: ["#F2CDAC", "#82C9D7", "#277C78", "#626070"],
      borderWidth: 0,
      borderRadius: 0, // rounds slice ends (Chart.js v3+)
    },
  ],
};

// Chart options: make it a donut and disable interactivity
const chartOptions = {
  cutout: "70%", // inner radius 70% of full radius
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
  },
  maintainAspectRatio: false, // allow custom sizing
};

export default function DonutChart() {
  return (
    <div className='relative w-64 h-64'>
      {/* The Doughnut chart itself */}
      <Doughnut data={chartData} options={chartOptions} />

      {/* Centered static text */}
      <div className='absolute inset-0 flex flex-col items-center justify-center pointer-events-none'>
        <span className='text-xl font-semibold'>$338</span>
        <span className='text-sm text-gray-500'>of $975 limit</span>
      </div>
    </div>
  );
}
