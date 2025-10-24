import { getBudgets } from "@/server/actions";
import ClientWrapper from "../ClientWrapper";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import BudgetSummary from "./BudgetsSummary";
import BudgetList from "./BudgetList";
import AddBudgetButton from "./AddBudgetButton";
import BudgetForm from "./BudgetForm";

export default async function Page() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["budgets"],
    queryFn: getBudgets,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className='flex h-screen bg-beige-100'>
        <ClientWrapper>
          <div className='flex justify-between mb-8'>
            <h1 className='heading-xl'>Budgets</h1>
            <AddBudgetButton />
          </div>
          <div className='lg:grid grid-cols-2 gap-x-10'>
            <BudgetSummary />
            <BudgetList />
            <BudgetForm />
          </div>
        </ClientWrapper>
      </div>
    </HydrationBoundary>
  );
}
