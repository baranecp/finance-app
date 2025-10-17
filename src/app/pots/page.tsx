import { getPots } from "@/server/actions";
import AddPotButton from "../pots/AddPotButton";
import ClientWrapper from "../ClientWrapper";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import PotsList from "./PotsList";
import PotForm from "./PotForm";

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
            <AddPotButton />
          </div>
          <PotForm />
          <PotsList />
        </ClientWrapper>
      </div>
    </HydrationBoundary>
  );
}
