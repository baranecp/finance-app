import DonutChart from "@/components/charts/DonutChart";
import BudgetSpendings from "./BudgetsSpendings";

export default function BudgetSummary() {
  return (
    <div>
      <div className='bg-white mt-8 px-5 py-6 rounded-[12px] flex flex-col gap-4 2xl:flex-row 2xl:items-center 2xl:justify-around '>
        <div className='flex-shrink-0 md:flex-1 min-w-[250px] max-w-[300px] flex justify-center self-center'>
          <DonutChart />
        </div>
        <BudgetSpendings />
      </div>
    </div>
  );
}
