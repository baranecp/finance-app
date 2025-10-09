import TransactionsList from "./TransactionsList";
import SearchInput from "@/components/SearchInput";
import FilterDropdown from "@/components/FilterDropdown";
import SortDropdown from "@/components/SortDropdown";
import ClientWrapper from "../ClientWrapper";
import { fetchTransactions } from "@/server/actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

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
  const query = searchParams.query || "";
  const sortBy = searchParams.sortBy || "latest";
  const category = searchParams.category || "all";
  const currentPage = Number(searchParams.page) || 1;

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
      {" "}
      <div className='flex h-screen bg-beige-100'>
        <ClientWrapper>
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
        </ClientWrapper>
      </div>
    </HydrationBoundary>
  );
}
