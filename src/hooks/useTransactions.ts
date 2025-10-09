"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "@/server/actions";
import { keepPreviousData } from "@tanstack/react-query";

interface UseTransactionsOptions {
  query?: string;
  sortBy?: string;
  category?: string;
  page?: number;
  pageSize?: number;
}

export default function useTransactions(options: UseTransactionsOptions) {
  return useQuery({
    queryKey: ["transactions", options],
    queryFn: () => fetchTransactions(options),
    placeholderData: keepPreviousData, // keeps old data while loading new page
  });
}
