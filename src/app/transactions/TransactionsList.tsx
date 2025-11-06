"use client";
import useTransactions from "@/hooks/useTransactions";
import TransactionAll from "@/components/TransactionAll";
import Pagination from "@/components/Pagination";

interface TransactionsListProps {
  query?: string;
  sortBy?: string;
  category?: string;
  page: number;
  pageSize?: number;
}

export default function TransactionsList({
  query,
  sortBy,
  category,
  page,
  pageSize = 10,
}: TransactionsListProps) {
  const { data, isLoading } = useTransactions({
    query,
    sortBy,
    category,
    page,
    pageSize,
  });

  if (isLoading || !data) {
    return (
      <div className='flex justify-center py-20 h-screen'>
        <div className='w-8 h-8 border-4 border-beige-500 border-t-transparent rounded-full animate-spin' />
      </div>
    );
  }

  const transactionsWithFormattedDate =
    data?.data.map((t) => ({
      ...t,
      date: new Date(t.date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      avatar: t.avatar || "/default-avatar.png",
    })) || []; // <-- ensures this is always an array

  if (transactionsWithFormattedDate.length === 0) {
    return (
      <div className='flex justify-center py-10 text-muted-foreground'>
        No transactions found
      </div>
    );
  }
  return (
    <div>
      <TransactionAll transactions={transactionsWithFormattedDate} />
      {data?.totalPages && data.totalPages > 1 && (
        <Pagination totalPages={data.totalPages} currentPage={page} />
      )}
    </div>
  );
}
