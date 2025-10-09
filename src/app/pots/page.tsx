import { getPots } from "@/server/actions";
import ClientWrapper from "../ClientWrapper";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Pot from "./Pot";

export default async function Page() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["pots"],
    queryFn: getPots,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientWrapper>
        <Pot />
      </ClientWrapper>
    </HydrationBoundary>
  );
}
