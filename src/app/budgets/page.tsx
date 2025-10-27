import BudgetSummary from "./BudgetsSummary";
import BudgetList from "./BudgetList";
import AddBudgetButton from "./AddBudgetButton";
import BudgetForm from "./BudgetForm";

export default function Page() {
  return (
    <div className='flex h-screen bg-beige-100'>
      <main className='md:px-10 md:mt-10 mt-6 px-4 pb-14 flex-1 overflow-y-auto'>
        <div className='flex justify-between mb-8'>
          <h1 className='heading-xl'>Budgets</h1>
          <AddBudgetButton />
        </div>
        <div className='lg:grid grid-cols-2 gap-x-10'>
          <BudgetSummary />
          <BudgetList />
          <BudgetForm />
        </div>
      </main>
    </div>
  );
}
