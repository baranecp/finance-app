"use client";

import { useReccuringBills } from "@/hooks/useBills";
import RecurringBills from "@/components/bills/RecurringBills";
import Pagination from "@/components/ui/Pagination";

interface BillsListProps {
  query?: string;
  sortBy?: string;
  page: number;
  pageSize?: number;
}

export default function BillsList({
  query,
  sortBy,
  page,
  pageSize = 10,
}: BillsListProps) {
  const { data, isLoading } = useReccuringBills({
    query,
    sortBy,
    page,
    pageSize,
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      {data?.data.length === 0 ? (
        <p>No recurring bills found</p>
      ) : (
        <RecurringBills bills={data?.data || []} />
      )}
      {data?.totalPages && data.totalPages > 1 && (
        <Pagination totalPages={data.totalPages} currentPage={page} />
      )}
    </div>
  );
}
