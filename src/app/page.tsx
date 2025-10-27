import Overview from "@/components/Overview";
import Pots from "@/components/Pots";
import TransactionsOverview from "@/components/TransactionsOverview";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Budgets from "@/components/Budgets";
import { getBudgetsWithTransactions, getPots } from "@/server/actions";

export default async function Page() {
  const queryClient = new QueryClient();

  // Prefetch server data
  await queryClient.prefetchQuery({ queryKey: ["pots"], queryFn: getPots });
  await queryClient.prefetchQuery({
    queryKey: ["budgetsWithTransactions"],
    queryFn: async () => getBudgetsWithTransactions(),
  });

  return (
    <div className='flex h-screen bg-beige-100'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <main className='md:px-10 md:mt-10 mt-6 px-4 pb-14 flex-1 overflow-y-auto'>
          <Overview />
          <div
            className=' mt-6
             lg:grid
              lg:grid-cols-2
              gap-6
              w-full
            '>
            {/* LEFT SIDE */}
            <div className='lg:flex lg:flex-col lg:gap-6'>
              <Pots />
              <TransactionsOverview />
            </div>

            {/* RIGHT SIDE */}
            <div className='lg:flex lg:flex-col lg:gap-6'>
              <Budgets />
            </div>
          </div>
        </main>
      </HydrationBoundary>
    </div>
  );
}
