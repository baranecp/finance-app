import Overview from "@/components/Overview";
import Pots from "@/components/Pots";
import TransactionsOverview from "@/components/TransactionsOverview";
import ClientWrapper from "./ClientWrapper";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default function Page() {
  const queryClient = new QueryClient();
  return (
    <div className='flex h-screen bg-beige-100'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ClientWrapper>
          <Overview />
          <Pots />
          <TransactionsOverview />
        </ClientWrapper>
      </HydrationBoundary>
    </div>
  );
}
