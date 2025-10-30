import { fetchBills, getTransactions } from "@/server/actions";
import { useQuery } from "@tanstack/react-query";

interface UseBillsOptions {
  query?: string;
  sortBy?: string;
  page?: number;
  pageSize?: number;
}

export function useReccuringBills(options: UseBillsOptions) {
  return useQuery({
    queryKey: ["bills", options],
    queryFn: () => fetchBills(options),
  });
}

export function useBills() {
  const { data } = useQuery({
    queryKey: ["bills", "home"],
    queryFn: getTransactions,
  });

  return { data };
}
