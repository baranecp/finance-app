"use client";

import { GoTriangleRight } from "react-icons/go";
import { useRouter } from "next/navigation";
import Budget from "./Budget";
import DonutChart from "./DonutChart";
import { useQuery } from "@tanstack/react-query";
import { getBudgets } from "@/server/actions";

export default function Budgets() {
  const router = useRouter();
  const { data, isLoading, error } = useQuery({
    queryKey: ["budgets", 4],
    queryFn: getBudgets,
  });

  if (isLoading) return <p>Loading pots.</p>;
  if (error) return <p>Something went wrong.</p>;
  if (!data) return <p>No transactions found.</p>;

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
      <div className='flex flex-wrap gap-5 justify-center items-center'>
        {/* DonutChart */}
        <div className='flex-shrink-0 md:flex-1 min-w-[250px] max-w-[300px] flex justify-center'>
          <DonutChart />
        </div>

        {/* Budgets container with container query */}
        <div className='flex flex-wrap gap-5'>
          {data.data?.map((data) => (
            <Budget
              key={data.id}
              id={data.id}
              category={data.category}
              maximum={+data.maximum}
              theme={data.theme}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
