import DonutChart from "@/components/DonutChart";
import BudgetSpendings from "./BudgetsSpendings";

export default function BudgetSummary() {
  return (
    <div>
      <div className='bg-white mt-8 px-5 py-6 rounded-[12px] flex flex-col gap-4 2xl:flex-row 2xl:items-center 2xl:justify-around '>
        <div className='self-center my-10'>
          <DonutChart />
        </div>
        <BudgetSpendings />
      </div>
    </div>
  );
}
