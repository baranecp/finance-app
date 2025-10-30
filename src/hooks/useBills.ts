import { getTransactions } from "@/server/actions";
import { useQuery } from "@tanstack/react-query";

export function useBills() {
  const { data } = useQuery({
    queryKey: ["bills"],
    queryFn: getTransactions,
  });

  return { data };
}
