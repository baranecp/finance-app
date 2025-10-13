import { getPots } from "@/server/actions";
import ClientWrapper from "../ClientWrapper";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import PotsList from "./PotsList";

export default async function Page() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["pots"],
    queryFn: getPots,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className='flex h-screen bg-beige-100'>
        <ClientWrapper>
          <div className='flex justify-between mb-8'>
            <h1 className='heading-xl'>Pots</h1>
            <button className='body-m-bold bg-grey-900 p-4 text-white border rounded-[8px] cursor-pointer'>
              + Add New Pot
            </button>
          </div>
          <PotsList />
        </ClientWrapper>
      </div>
    </HydrationBoundary>
  );
}
