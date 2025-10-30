import { fetchBills, getTransactions } from "@/server/actions";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface UseBillsOptions {
  query?: string;
  sortBy?: string;
  page?: number;
  pageSize?: number;
}

export default function useReccuringBills(options: UseBillsOptions) {
  return useQuery({
    queryKey: ["bills", "reccuring", options],
    queryFn: () => fetchBills(options),
    placeholderData: keepPreviousData,
  });
}

export function useBills() {
  const { data } = useQuery({
    queryKey: ["bills", "all"],
    queryFn: getTransactions,
  });

  return { data };
}
