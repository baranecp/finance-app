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

  if (isLoading) return <p>Loading...</p>;

  const transactionsWithFormattedDate =
    data?.data.map((t) => ({
      ...t,
      date: new Date(t.date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      avatar: t.avatar || "/default-avatar.png", // fallback
    })) || []; // <-- ensures this is always an array

  return (
    <div>
      {transactionsWithFormattedDate.length === 0 ? (
        <p>No transactions found</p>
      ) : (
        <TransactionAll transactions={transactionsWithFormattedDate} />
      )}
      {data?.totalPages && data.totalPages > 1 && (
        <Pagination totalPages={data.totalPages} currentPage={page} />
      )}
    </div>
  );
}
