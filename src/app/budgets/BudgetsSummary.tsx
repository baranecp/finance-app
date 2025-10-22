import DonutChart from "@/components/DonutChart";
import BudgetSpendings from "./BudgetsSpendings";

export default function BudgetSummary() {
  return (
    <div>
      <div className='max-w-[430px] bg-white mt-8 px-5 py-6 rounded-[12px] flex flex-col gap-4'>
        <div className='self-center my-10'>
          <DonutChart />
        </div>
        <BudgetSpendings />
      </div>
    </div>
  );
}
