import TransactionsList from "./TransactionsList";
import SearchInput from "@/components/SearchInput";
import FilterDropdown from "@/components/FilterDropdown";
import SortDropdown from "@/components/SortDropdown";
import { fetchTransactions } from "@/server/actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Public_Sans } from "next/font/google";
const PublicSans = Public_Sans({
  weight: ["400", "700"],
});

type TransactionsPageProps = {
  searchParams: {
    query?: string;
    sortBy?: string;
    category?: string;
    page?: string;
  };
};

export default async function TransactionsPage({
  searchParams,
}: TransactionsPageProps) {
  const params = await searchParams;

  const query = params.query || "";
  const sortBy = params.sortBy || "latest";
  const category = params.category || "all";
  const currentPage = Number(params.page) || 1;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["transactions", { query, sortBy, category, page: currentPage }],
    queryFn: () =>
      fetchTransactions({
        query,
        sortBy,
        category,
        page: currentPage,
        pageSize: 10,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className='flex h-screen bg-beige-100'>
        <main
          className={`md:px-10 md:mt-10 mt-6 px-4 pb-14 flex-1 overflow-y-auto ${PublicSans.className}`}>
          <h1 className='heading-xl mb-8'>Transactions</h1>
          <section className='bg-white p-8 rounded-xl'>
            <div className='flex flex-wrap gap-4 mb-6 items-center justify-between'>
              <SearchInput />
              <div className='flex gap-4 items-center'>
                <FilterDropdown />
                <SortDropdown />
              </div>
            </div>
            <TransactionsList
              query={query}
              sortBy={sortBy}
              category={category}
              page={currentPage}
              pageSize={10}
            />
          </section>
        </main>
      </div>
    </HydrationBoundary>
  );
}
