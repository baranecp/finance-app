"use client";

import { GoTriangleRight } from "react-icons/go";
import { useRouter } from "next/navigation";
import Budget from "./Budget";
import DonutChart from "./DonutChart";

export default function Budgets() {
  const data = [
    { id: "1", category: "Dining Out", maximum: 75, theme: "#F2CDAC" },
    { id: "2", category: "Bills", maximum: 750, theme: "#82C9D7" },
    { id: "3", category: "Entertainment", maximum: 50, theme: "#277C78" },
    { id: "4", category: "Personal Care", maximum: 100, theme: "#626070" },
  ];

  const router = useRouter();

  return (
    <section className='w-full bg-white mt-8 px-5 py-6 rounded-[12px]'>
      {/* Header */}
      <div className='flex justify-between mb-5'>
        <h2 className='heading-l'>Budgets</h2>
        <button
          className='body-m text-grey-500 flex items-center gap-2 cursor-pointer'
          onClick={() => router.push("/budgets")}>
          See Details <GoTriangleRight />
        </button>
      </div>

      {/* Chart + Budgets container */}
      <div className='flex flex-wrap gap-5 justify-center items-start'>
        {/* DonutChart */}
        <div className='flex-shrink-0 md:flex-1 min-w-[250px] max-w-[300px] flex justify-center'>
          <DonutChart />
        </div>

        {/* Budgets container with container query */}
        <div className='flex-1 min-w-[250px] flex flex-col gap-5'>
          {data.map((budget) => (
            <Budget
              key={budget.id}
              id={budget.id}
              category={budget.category}
              maximum={budget.maximum}
              theme={budget.theme}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
