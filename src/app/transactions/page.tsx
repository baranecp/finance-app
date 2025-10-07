import ClientWrapper from "../ClientWrapper";
import SearchTransactions from "./SearchTransactions";
import TransactionsList from "./TransactionsList";

const Page = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    sort?: string;
    category?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const sortBy = searchParams?.sort || "latest";
  const category = searchParams?.category || "all";
  const currentPage =
    searchParams?.page && !isNaN(parseInt(searchParams.page))
      ? parseInt(searchParams.page)
      : 1;

  return (
    <div className='flex h-screen bg-beige-100'>
      <ClientWrapper>
        <h1 className='heading-xl mb-8'>Transactions</h1>
        <section className='bg-white p-8 rounded-xl'>
          <SearchTransactions />
          <TransactionsList
            query={query}
            currentPage={currentPage}
            sortBy={sortBy}
            category={currentPage}
          />
        </section>
      </ClientWrapper>
    </div>
  );
};

export default Page;
