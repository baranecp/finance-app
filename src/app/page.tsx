import Overview from "@/components/Overview";
import Pots from "@/components/Pots";
import TransactionsOverview from "@/components/TransactionsOverview";
import ClientWrapper from "./ClientWrapper";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Budgets from "@/components/Budgets";

export default function Page() {
  const queryClient = new QueryClient();
  return (
    <div className='flex h-screen bg-beige-100'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ClientWrapper>
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
        </ClientWrapper>
      </HydrationBoundary>
    </div>
  );
}
