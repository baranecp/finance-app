import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchBills, getTransactions } from "@/server/actions";
import SearchInput from "@/components/SearchInput";
import SortDropdown from "@/components/SortDropdown";
import BillsList from "./BillsList";
import SummaryBills from "./SummaryBills";
import { Public_Sans } from "next/font/google";

const PublicSans = Public_Sans({ weight: ["400", "700"] });

type BillsPageProps = {
  searchParams: { query?: string; sortBy?: string; page?: string };
};

export default async function BillsPage({ searchParams }: BillsPageProps) {
  const params = await searchParams;
  const query = params.query || "";
  const sortBy = params.sortBy || "latest";
  const currentPage = Number(params.page || 1);

  const queryClient = new QueryClient();

  // prefetch paginated recurring bills
  await queryClient.prefetchQuery({
    queryKey: ["bills", { query, sortBy, page: currentPage, pageSize: 10 }],
    queryFn: () => fetchBills({ query, sortBy, page: currentPage }),
  });

  // prefetch all transactions used by summary
  await queryClient.prefetchQuery({
    queryKey: ["bills", "home"],
    queryFn: getTransactions,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className='flex h-screen bg-beige-100'>
        <main
          className={`md:px-10 md:mt-10 mt-6 px-4 pb-14 flex-1 overflow-y-auto ${PublicSans.className}`}>
          <h1 className='heading-xl mb-8'>Recurring Bills</h1>
          <div className='lg:grid grid-cols-2 gap-x-10'>
            <SummaryBills />
            <section className='bg-white p-8 rounded-xl'>
              <div className='flex flex-wrap gap-4 mb-6 items-center justify-between'>
                <div className='flex-1'>
                  <SearchInput />
                </div>
                <div className='flex gap-4 items-center'>
                  <SortDropdown />
                </div>
              </div>
              <BillsList
                query={query}
                sortBy={sortBy}
                page={currentPage}
                pageSize={10}
              />
            </section>
          </div>
        </main>
      </div>
    </HydrationBoundary>
  );
}
