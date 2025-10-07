import ClientWrapper from "../ClientWrapper";
import TransactionsControls from "./TransactionsControls";
import TransactionsList from "./TransactionsList";

const PAGE_SIZE = 10;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    query?: string;
    sort?: string;
    category?: string;
  }>;
}) {
  const { page, query, sort, category } = await searchParams;

  const currentPage = page ? parseInt(page, 10) : 1;
  const searchQuery = query || "";
  const sortBy = sort || "latest";
  const filterCategory = category || "all";

  return (
    <div className='flex h-screen bg-beige-100'>
      <ClientWrapper>
        <h1 className='heading-xl mb-8'>Transactions</h1>
        <section className='bg-white p-8 rounded-xl'>
          <TransactionsControls />
          <TransactionsList
            query={searchQuery}
            currentPage={currentPage}
            sortBy={sortBy}
            category={filterCategory}
            pageSize={PAGE_SIZE}
          />
        </section>
      </ClientWrapper>
    </div>
  );
}
